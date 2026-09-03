/**
 * Evidence grader — the 2026-09-02 audit's raw-fetch spot-check, productionised.
 * Midvamp §4, round 3. Written 2026-09-03.
 *
 * **What it is.** For each edge it takes the citation the edge ALREADY carries
 * (`evidence_url` + the quoted spans inside `basis`/`evidence_quote`), fetches
 * that URL with real curl (never WebFetch — PLAYBOOK rule 3: a fetching tool
 * that can invent content cannot be the thing that verifies it), extracts the
 * document text, caches it, looks for the quote in the body, and writes down an
 * `EvidenceGrade`. That is the whole job.
 *
 * **What it is not.** Grading is not research (Midvamp §4, last line). This
 * script never looks for a BETTER document for a weak edge, never follows a
 * lead, never mints anything. A `B` here means "the citation on this edge
 * supports it loosely", not "this dependency is only loosely true".
 *
 * **Why the grade is deliberately pessimistic.** Three of the audit's four
 * grading criteria are mechanical (does the URL resolve; is the quote in the
 * body; is the input artefact named). The fourth — "the document states the
 * direction claimed" — is a reading, and a regex that pretended to do it would
 * be exactly the kind of plausible-but-unchecked claim this whole programme
 * exists to remove. So the script grades on the three it can check and REFUSES
 * to invent the fourth: it can only ever move an edge DOWN from what a human
 * grader would give it, never up. Every `A` it hands out is therefore a
 * proposal a reviewer can spot-check, and every disagreement with the audit
 * sample in the `--sample` run below is expected to point the same way
 * (script stricter). A disagreement pointing the OTHER way — script `A`, audit
 * WEAK/FAIL — is a bug in this file, and the dry-run report treats it as one.
 *
 * Usage:
 *   npx tsx scripts/grade-evidence.ts --sample "Claude outputs/audit-2026-09-02-evidence-sample-56.json"
 *                                     — dry run: grade the audit's 56 and print the confusion matrix
 *   npx tsx scripts/grade-evidence.ts --feeding sna-2008,esa-2010
 *                                     — grade every live edge whose target is one of these
 *   npx tsx scripts/grade-evidence.ts --slice af-cemac.json --slice af-sadc-hub.json
 *   npx tsx scripts/grade-evidence.ts --all              — the whole live corpus (hours)
 *   flags: --write (write grades back into the slice JSONs; OFF by default),
 *          --offline (grade from the cache only, no network),
 *          --json <out>, --limit <n>, --concurrency <n> (default 6),
 *          --cache-dir <path> (default evidence-cache/), --selftest
 *
 * Exit code is 0 unless something is actually broken (bad flags, selftest
 * failure). A corpus full of `C` grades is a finding, not an error.
 */
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { gunzipSync, gzipSync } from 'node:zlib'
import { isBareHost, isIndexPage } from '../src/lib/graph'
import type { Dependency, EvidenceGrade, Report } from '../src/lib/types'

const execFileAsync = promisify(execFile)
const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..')
const RESEARCH_DIR = join(ROOT, 'src', 'data', 'research')

/* ------------------------------------------------------------------ *
 * Constants. Each one has a reason; read it before changing it.
 * ------------------------------------------------------------------ */

/**
 * A real browser UA. Not a courtesy — several statistics hosts serve a 403 to
 * anything that looks scripted and the full document to this exact shape, and
 * PLAYBOOK §6 records a whole cluster (mnd.gov.tw) written off as
 * "robots-blocked" that was in fact wide open to curl with this header.
 */
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

/** Per-URL ceiling. Government statistics sites are often slow, not dead. */
const TIMEOUT_S = 45
const CONNECT_TIMEOUT_S = 15

/**
 * Cached text cap, per Midvamp §4 step 2 (Q11). Beyond this we keep the first
 * 250 KB plus a hash of the whole extracted text, so a later re-check can still
 * tell whether the document changed even though we did not keep all of it.
 */
const TEXT_CAP_BYTES = 250 * 1024

/** The cache separator. Header above, extracted text below. */
const CACHE_SEP = '\n---\n'

/**
 * Bodies that are a wall, not a document. Detected by BODY, never by status
 * code — the audit's own method line, and the reason `OK-TINY-BODY` and
 * `BLOCKED-202` both exist in its url-check output. Every marker here is a
 * string that only appears in a challenge/denial shell.
 */
const WALL_MARKERS: ReadonlyArray<{ marker: string; label: string }> = [
  { marker: 'cf-browser-verification', label: 'cloudflare-challenge' },
  { marker: 'just a moment...', label: 'cloudflare-challenge' },
  { marker: 'enable javascript and cookies to continue', label: 'cloudflare-challenge' },
  { marker: 'attention required! | cloudflare', label: 'cloudflare-block' },
  { marker: '_incapsula_', label: 'incapsula' },
  { marker: 'incident id:', label: 'incapsula' },
  { marker: 'access denied', label: 'akamai-deny' },
  { marker: 'you don’t have permission to access', label: 'waf-deny' },
  { marker: 'captcha-delivery.com', label: 'datadome' },
  { marker: 'perfdrive.com', label: 'radware' },
  { marker: 'request unsuccessful. incapsula', label: 'incapsula' },
  { marker: 'checking your browser before accessing', label: 'cloudflare-challenge' },
]

/**
 * Hosts whose metadata IS the publisher's own statement about a series, so a
 * quote found here clears the "third-party source" downgrade even though the
 * host is not the publisher (Midvamp §2.2, Q7). It does NOT waive the quote
 * requirement — it waives only the artefact-naming one, because these pages
 * are structured metadata about one series and name it by field, not by
 * sentence.
 */
const METADATA_HOSTS: readonly string[] = [
  'dsbb.imf.org',
  'ec.europa.eu/eurostat/cache/metadata',
  'registry.sdmx.org',
  'sdmx.org',
]

/**
 * Phrases in the edge's OWN basis that cap it at B by themselves, whatever the
 * document says. These are the shapes PLAYBOOK §7 already rules against —
 * "consistent with" is a claim about numbers, not a citation (2026-08-31
 * ruling), and a basis that says the link is inferred is telling you it is a
 * lead. Matched on the basis prose, not on the document.
 */
const WEAK_BASIS_PATTERNS: ReadonlyArray<{ re: RegExp; label: string }> = [
  { re: /\bconsistent with\b/i, label: 'consistent-with' },
  { re: /\bcomplementar/i, label: 'complementary' },
  { re: /\bcomparable (?:with|to)\b/i, label: 'comparable-with' },
  { re: /\baligned with\b/i, label: 'aligned-with' },
  { re: /\b(?:presumably|likely|appears to|seems to|suggests that|implies)\b/i, label: 'hedged' },
  { re: /\b(?:inferred|inference|by implication)\b/i, label: 'inferred' },
  { re: /\bparaphras/i, label: 'paraphrase' },
]

/* ------------------------------------------------------------------ *
 * Pure helpers. Exported so `--selftest` can assert on them, and so a
 * later round can reuse them without importing the whole script.
 * ------------------------------------------------------------------ */

/**
 * Normalise for matching. Everything here exists because a real document broke
 * a naive `includes()`: PDF text arrives with soft hyphens and ligatures, HTML
 * with curly quotes and non-breaking spaces, and `pdftotext -layout` puts a
 * newline wherever the column ended.
 */
export function normalizeForMatch(s: string): string {
  return s
    .normalize('NFKD')
    // Accents folded away: a Portuguese or French quote copied into a
    // `basis` by hand loses or gains them regularly ("indice" for
    // "índice"), and no pair of documents in this corpus is
    // distinguished only by a diacritic.
    .replace(/[\u0300-\u036f]/g, '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[­​-‍﻿]/g, '') // soft hyphen, zero-width junk
    .replace(/[‘’‚‛′]/g, "'")
    .replace(/[“”„‟″«»]/g, '"')
    .replace(/[‐-―−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * The quoted spans inside a free-text `basis`. The audit's closing observation
 * was that `evidence_quote` is empty on all 56 sampled edges, so every check
 * has to come from quotes embedded in prose — this is that extraction.
 *
 * Straight and curly double quotes and guillemets only. Single quotes are
 * deliberately NOT a delimiter: apostrophes in "the Commission's own note"
 * make them ambiguous, and every false span costs a real match. Spans shorter
 * than MIN_SPAN are dropped — a two-word quoted term ("CPI") matches
 * everywhere and proves nothing.
 */
export function extractQuotedSpans(...texts: (string | undefined)[]): string[] {
  const MIN_SPAN = 24
  const out: string[] = []
  const re = /["“„«]([^"“”„«»]{10,600})["”“»]/g
  for (const text of texts) {
    if (!text) continue
    for (const m of text.matchAll(re)) {
      const span = m[1].trim()
      if (span.length >= MIN_SPAN) out.push(span)
    }
  }
  return out
}

/** Word n-grams of the normalised text, for coverage scoring. */
function shingles(normalised: string, n: number): string[] {
  const words = normalised.split(' ').filter(Boolean)
  if (words.length < n) return words.length ? [words.join(' ')] : []
  const out: string[] = []
  for (let i = 0; i + n <= words.length; i++) out.push(words.slice(i, i + n).join(' '))
  return out
}

/**
 * How much of `needle` is present in `haystack`, 0..1. Exact substring is 1.
 * Otherwise the fraction of the needle's 4-word shingles found in the body —
 * which is what survives the two things that actually happen to a real quote:
 * an ellipsis in the middle of it, and a line break the extractor turned into
 * a space in a different place than the researcher did.
 *
 * A quote is split on ellipsis first and each fragment scored on its own,
 * because "…" in a `basis` means the researcher already cut the middle out.
 */
export interface QuoteHit {
  /** 0..1 — how much of the needle is present. */
  coverage: number
  /** Index in the NORMALISED body where the first matched fragment sits, or -1. */
  index: number
}

export function locateQuote(needle: string, haystack: string): QuoteHit {
  const hay = normalizeForMatch(haystack)
  const fragments = normalizeForMatch(needle)
    .split(/\s*(?:…|\.\.\.)\s*/)
    .map((f) => f.trim())
    .filter((f) => f.length >= 12)
  if (!fragments.length || !hay) return { coverage: 0, index: -1 }
  let total = 0
  let hit = 0
  let index = -1
  for (const frag of fragments) {
    const whole = hay.indexOf(frag)
    if (whole >= 0) {
      const grams = Math.max(1, shingles(frag, 4).length)
      total += grams
      hit += grams
      if (index < 0) index = whole
      continue
    }
    const grams = shingles(frag, 4)
    if (!grams.length) continue
    total += grams.length
    for (const g of grams) {
      const at = hay.indexOf(g)
      if (at >= 0) {
        hit++
        if (index < 0) index = at
      }
    }
  }
  return { coverage: total ? hit / total : 0, index }
}

export function quoteCoverage(needle: string, haystack: string): number {
  return locateQuote(needle, haystack).coverage
}

export type QuoteVerdict = 'yes' | 'partial' | 'no'

/** Coverage thresholds. 0.95 is "the sentence is there"; 0.55 is "most of it". */
export function verdictFor(coverage: number): QuoteVerdict {
  if (coverage >= 0.95) return 'yes'
  if (coverage >= 0.55) return 'partial'
  return 'no'
}

/**
 * Does the body name the target ARTEFACT, as opposed to the agency that
 * publishes it? This is the audit's central WEAK shape ("naming the
 * Valuer-General, not the Valuation of Land Act") and PLAYBOOK §7's "naming
 * the agency is not naming the artefact" ruling, mechanised as far as it can
 * honestly go. Four ways a document can name the target, in order of how
 * often they fire on this corpus:
 *
 *  1. **Title run** — a contiguous run of the target's own title words, ≥2
 *     words and ≥60% of the title. Contiguous and with the small words LEFT
 *     IN, because "european system of accounts" is how ESA 2010 is named in
 *     prose and a stopword-stripped bag ("european system accounts") matches
 *     nothing. Punctuation is spaced out first so "Statistics, Australia"
 *     does not hide behind its comma.
 *  2. **Legal designator** — for the instrument class, the document names the
 *     section/number, not the title: "sections 264 and 301 of the
 *     Constitution", "conforme estabelecido na Lei n.º 1/2008". A core word
 *     from the title (act/law/constitution/regulation/lei/loi/ley/…) within
 *     200 characters of the title's own number is the tell. This is what
 *     stops the whole `legal_basis` class from grading C by construction.
 *  3. **CJK title token** — a Japanese/Chinese title fragment (統計法) is one
 *     token with no spaces, so the run rule cannot see it.
 *  4. **Target's own URL** appearing in the body.
 *
 * A parenthetical acronym is deliberately NOT one of them: the audit's own
 * false positives came through exactly there — "(EDP)" in a Greek fiscal
 * title and "(NSW)" in an Act's title matched documents that named neither
 * artefact. An acronym alone now counts as agency-level naming at most.
 */
export function namesTarget(
  body: string,
  target: Pick<Report, 'title' | 'publisher' | 'url'>,
): { artefact: boolean; agency: boolean; how: string } {
  const hay = normalizeForMatch(body)
  const titleNoParens = target.title.replace(/\([^)]*\)/g, ' ')
  const titleWords = tokenise(titleNoParens)
  let artefact = false
  let how = ''

  if (titleWords.length) {
    const run = longestRun(titleWords, hay)
    if (run >= 2 && run / titleWords.length >= 0.6) {
      artefact = true
      how = `title-run:${run}/${titleWords.length}`
    }
  }
  if (!artefact) {
    // A title's leading phrase, for the very long "Title — subtitle (gloss)"
    // shapes: the first clause before an em dash, comma or slash, matched
    // whole. Never fewer than 3 words, so it cannot become a generic phrase.
    const lead = tokenise(titleNoParens.split(/[—–\-,;:\/|]/)[0] ?? '')
    if (lead.length >= 3 && hay.includes(lead.join(' '))) {
      artefact = true
      how = 'title-lead'
    }
  }
  if (!artefact) {
    for (const tok of titleWords) {
      if (tok.length >= 3 && /[぀-ヿ㐀-鿿]/.test(tok) && hay.includes(tok)) {
        artefact = true
        how = `cjk:${tok}`
        break
      }
    }
  }
  if (!artefact) {
    const designator = namesLegalDesignator(hay, target.title)
    if (designator) {
      artefact = true
      how = designator
    }
  }
  if (!artefact && target.url) {
    try {
      const u = new URL(target.url)
      const path = normalizeForMatch(u.pathname)
      if (path.length > 6 && hay.includes(normalizeForMatch(u.hostname + path))) {
        artefact = true
        how = 'target-url'
      }
    } catch {
      /* an unparsable node url is not a naming signal */
    }
  }

  // The publisher is matched on its OWN words: "Statistics", "Bureau" and
  // "Office" are noise in a title and are most of the name in a publisher
  // ("Ethiopian Statistics Services"). A parenthetical acronym counts here.
  const pubWords = tokenise(target.publisher.replace(/\([^)]*\)/g, ' ')).filter(
    (w) => !PUBLISHER_STOPWORDS.has(w),
  )
  const pubRun = pubWords.length ? longestRun(pubWords, hay) : 0
  let agency = pubRun >= 2 && pubRun / pubWords.length >= 0.6
  if (!agency) {
    for (const acr of `${target.publisher} ${target.title}`.matchAll(/\(([A-Z][A-Z0-9 .&-]{2,14})\)/g)) {
      const a = normalizeForMatch(acr[1]).trim()
      if (a.length >= 3 && new RegExp(`(^|[^a-z0-9])${escapeRe(a)}([^a-z0-9]|$)`).test(hay)) {
        agency = true
        break
      }
    }
  }
  return { artefact, agency, how: artefact ? how : agency ? 'agency-only' : 'neither' }
}

/** Words of a title/publisher, punctuation spaced out, articles kept. */
function tokenise(s: string): string[] {
  return normalizeForMatch(s.replace(/[^\p{L}\p{N}\/.º°-]+/gu, ' '))
    .split(' ')
    .map((w) => w.replace(/^[.\-\/]+|[.\-\/]+$/g, ''))
    .filter(Boolean)
}

/**
 * The instrument case: a document cites an Act by its section or number, not
 * by its title. Returns a `how` string when a core legal word from the title
 * and one of the title's own numbers sit within 200 characters of each other
 * in the body.
 */
function namesLegalDesignator(hay: string, title: string): string | null {
  const t = normalizeForMatch(title)
  const core = LEGAL_CORE_WORDS.find((w) => t.includes(w))
  if (!core) return null
  const numbers = new Set<string>()
  for (const m of t.matchAll(/\b(?:section|sections|article|articles|art|sec|s|no|n|nº|n°|lei|loi|ley|act|law)\.?\s*([0-9]{1,4}(?:[\/.-][0-9]{1,4})?)/g)) {
    numbers.add(m[1])
  }
  for (const m of t.matchAll(/\b([0-9]{1,4}\/[0-9]{2,4})\b/g)) numbers.add(m[1])
  if (!numbers.size) return null
  for (const n of numbers) {
    const nRe = new RegExp(`(^|[^0-9])${escapeRe(n)}([^0-9]|$)`, 'g')
    for (const m of hay.matchAll(nRe)) {
      const at = m.index ?? 0
      const window = hay.slice(Math.max(0, at - 200), at + 200)
      if (window.includes(core)) return `legal:${core} ${n}`
    }
  }
  return null
}

const LEGAL_CORE_WORDS = [
  'constitution', 'constituicao', 'constitucion', 'act', 'statute', 'law', 'lei', 'loi', 'ley',
  'regulation', 'reglement', 'regulamento', 'reglamento', 'decree', 'decreto', 'decret',
  'ordinance', 'ordonnance', 'directive', 'gesetz', 'verordnung',
]

/**
 * Length of the longest run of consecutive `words` appearing verbatim in
 * `hay`. Linear in the title's length, which is always short.
 */
function longestRun(words: string[], hay: string): number {
  let best = 0
  for (let i = 0; i < words.length; i++) {
    for (let j = words.length; j > i + best; j--) {
      if (hay.includes(words.slice(i, j).join(' '))) {
        best = j - i
        break
      }
    }
  }
  return best
}

const PUBLISHER_STOPWORDS = new Set(['the', 'and', 'for', 'of', 'de', 'la', 'le', 'les', 'des', 'du', 'da', 'do', 'und', 'der', 'die'])


function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/* ------------------------------------------------------------------ *
 * Fetch + extract + cache
 * ------------------------------------------------------------------ */

export type Block = 'none' | 'wall' | 'dead' | 'network' | 'empty'

export interface Fetched {
  url: string
  fetchedAt: string
  status: number
  finalUrl: string
  contentType: string
  bodyBytes: number
  extractor: 'pdftotext' | 'html' | 'docx' | 'text' | 'none'
  block: Block
  blockLabel: string
  text: string
  textChars: number
  truncated: boolean
  textSha: string
  fromCache: boolean
}

function cachePath(cacheDir: string, url: string): string {
  return join(cacheDir, `${createHash('sha256').update(url).digest('hex')}.txt.gz`)
}

function writeCache(cacheDir: string, f: Fetched): void {
  mkdirSync(cacheDir, { recursive: true })
  const header = [
    `url: ${f.url}`,
    `fetched-at: ${f.fetchedAt}`,
    `status: ${f.status}`,
    `final-url: ${f.finalUrl}`,
    `content-type: ${f.contentType}`,
    `body-bytes: ${f.bodyBytes}`,
    `extractor: ${f.extractor}`,
    `block: ${f.block}${f.blockLabel ? ` (${f.blockLabel})` : ''}`,
    `text-chars: ${f.textChars}`,
    `text-sha256: ${f.textSha}`,
    `truncated: ${f.truncated}`,
  ].join('\n')
  writeFileSync(cachePath(cacheDir, f.url), gzipSync(Buffer.from(header + CACHE_SEP + f.text, 'utf8')))
}

function readCache(cacheDir: string, url: string): Fetched | null {
  const p = cachePath(cacheDir, url)
  if (!existsSync(p)) return null
  const raw = gunzipSync(readFileSync(p)).toString('utf8')
  const at = raw.indexOf(CACHE_SEP)
  if (at < 0) return null
  const head = new Map<string, string>()
  for (const line of raw.slice(0, at).split('\n')) {
    const i = line.indexOf(': ')
    if (i > 0) head.set(line.slice(0, i), line.slice(i + 2))
  }
  const blockRaw = head.get('block') ?? 'none'
  const text = raw.slice(at + CACHE_SEP.length)
  return {
    url,
    fetchedAt: head.get('fetched-at') ?? '',
    status: Number(head.get('status') ?? 0),
    finalUrl: head.get('final-url') ?? url,
    contentType: head.get('content-type') ?? '',
    bodyBytes: Number(head.get('body-bytes') ?? 0),
    extractor: (head.get('extractor') ?? 'none') as Fetched['extractor'],
    block: blockRaw.split(' ')[0] as Block,
    blockLabel: /\((.*)\)/.exec(blockRaw)?.[1] ?? '',
    text,
    textChars: Number(head.get('text-chars') ?? text.length),
    textSha: head.get('text-sha256') ?? '',
    truncated: head.get('truncated') === 'true',
    fromCache: true,
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<br\s*\/?>|<\/(p|div|li|tr|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/[ \t ]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Raw fetch with curl. Deliberately curl and not `fetch()`: this needs a
 * self-signed-cert retry (`-k`, which is how the audit read leganet.cd), a
 * body on disk for `pdftotext`, and the ability to say "the transport failed"
 * with a code rather than an exception string.
 */
async function fetchOne(url: string): Promise<Fetched> {
  const dir = mkdtempSync(join(tmpdir(), 'grade-'))
  const bodyPath = join(dir, 'body.bin')
  const now = new Date().toISOString()
  const base = [
    '-sS', '-L', '--compressed',
    '-A', UA,
    '-H', 'Accept: text/html,application/xhtml+xml,application/pdf,*/*',
    '-H', 'Accept-Language: en,fr;q=0.8,es;q=0.6,pt;q=0.6',
    '--max-time', String(TIMEOUT_S),
    '--connect-timeout', String(CONNECT_TIMEOUT_S),
    '-o', bodyPath,
    '-w', '%{http_code}\t%{content_type}\t%{size_download}\t%{url_effective}',
  ]
  const run = async (extra: string[]) => {
    const { stdout } = await execFileAsync('curl', [...base, ...extra, url], { maxBuffer: 8 << 20 })
    const [code, ctype, size, finalUrl] = stdout.trim().split('\t')
    return { code: Number(code), ctype: ctype ?? '', size: Number(size ?? 0), finalUrl: finalUrl ?? url }
  }
  let meta: { code: number; ctype: string; size: number; finalUrl: string }
  try {
    meta = await run([])
  } catch {
    try {
      // Second and last attempt, with certificate checking off. A self-signed
      // or expired cert is a real property of several ministry hosts and is
      // not a reason to call a document unreachable; anything that fails here
      // too is recorded as a transport failure, not retried further.
      meta = await run(['-k'])
    } catch (e) {
      rmSync(dir, { recursive: true, force: true })
      // curl's own exit code is the useful part; its echoed command line is
      // 300 characters of UA string that would swamp every report.
      const msg = e instanceof Error ? e.message : String(e)
      const code = /Command failed[^]*?exit code (\d+)/.exec(msg)?.[1] ?? /\bcurl: \((\d+)\)/.exec(msg)?.[1]
      const tail = /curl: \(\d+\) (.*)/.exec(msg)?.[1] ?? ''
      return blank(url, now, { block: 'network', blockLabel: `curl-${code ?? '?'}${tail ? ` ${tail.slice(0, 60)}` : ''}` })
    }
  }
  const body = existsSync(bodyPath) ? readFileSync(bodyPath) : Buffer.alloc(0)
  let extractor: Fetched['extractor'] = 'none'
  let text = ''
  const isPdf = body.subarray(0, 5).toString('latin1') === '%PDF-' || /pdf/i.test(meta.ctype)
  const isZip = body.subarray(0, 2).toString('latin1') === 'PK'
  try {
    if (isPdf && body.length) {
      const { stdout } = await execFileAsync('pdftotext', ['-layout', '-q', bodyPath, '-'], {
        maxBuffer: 64 << 20,
      })
      text = stdout
      extractor = 'pdftotext'
    } else if (isZip && /officedocument|docx/i.test(meta.ctype + url)) {
      const { stdout } = await execFileAsync('unzip', ['-p', bodyPath, 'word/document.xml'], {
        maxBuffer: 64 << 20,
      })
      text = stripHtml(stdout)
      extractor = 'docx'
    } else if (body.length) {
      const asText = body.toString('utf8')
      if (/<[a-z!]/i.test(asText.slice(0, 2000))) {
        text = stripHtml(asText)
        extractor = 'html'
      } else {
        text = asText
        extractor = 'text'
      }
    }
  } catch {
    text = ''
    extractor = 'none'
  }
  rmSync(dir, { recursive: true, force: true })

  const lower = text.toLowerCase()
  let block: Block = 'none'
  let blockLabel = ''
  for (const w of WALL_MARKERS) {
    if (lower.includes(w.marker)) {
      block = 'wall'
      blockLabel = w.label
      break
    }
  }
  // A 200 with a few hundred characters of text is the other wall shape — the
  // audit's own OK-TINY-BODY class. Judged on extracted text, not body bytes,
  // because a JS shell is a large file containing nothing.
  if (block === 'none' && meta.code >= 200 && meta.code < 300 && text.trim().length < 200) {
    block = 'empty'
    blockLabel = extractor === 'none' ? 'no-extractor' : 'tiny-body'
  }
  if (block === 'none' && (meta.code >= 400 || meta.code === 0)) {
    block = 'dead'
    blockLabel = `http-${meta.code}`
  }
  const full = text
  const truncated = Buffer.byteLength(full, 'utf8') > TEXT_CAP_BYTES
  const kept = truncated ? Buffer.from(full, 'utf8').subarray(0, TEXT_CAP_BYTES).toString('utf8') : full
  return {
    url,
    fetchedAt: now,
    status: meta.code,
    finalUrl: meta.finalUrl,
    contentType: meta.ctype,
    bodyBytes: body.length,
    extractor,
    block,
    blockLabel,
    text: kept,
    textChars: full.length,
    truncated,
    textSha: createHash('sha256').update(full).digest('hex'),
    fromCache: false,
  }
}

function blank(url: string, now: string, over: Partial<Fetched>): Fetched {
  return {
    url,
    fetchedAt: now,
    status: 0,
    finalUrl: url,
    contentType: '',
    bodyBytes: 0,
    extractor: 'none',
    block: 'dead',
    blockLabel: '',
    text: '',
    textChars: 0,
    truncated: false,
    textSha: '',
    fromCache: false,
    ...over,
  }
}

/* ------------------------------------------------------------------ *
 * Grading
 * ------------------------------------------------------------------ */

export interface GradeInput {
  source: string
  target: string
  file: string
  basis: string
  evidenceUrl?: string
  evidenceQuote?: string
  targetReport?: Pick<Report, 'title' | 'publisher' | 'url'>
}

export interface GradeResult extends GradeInput {
  grade: EvidenceGrade
  reason: string
  quote: QuoteVerdict
  coverage: number
  bestSpan: string
  naming: string
  weakFlags: string[]
  status: number
  finalUrl: string
  block: Block
  blockLabel: string
  textChars: number
  extractor: string
  host: string
  /** Never checked mechanically — see the file header. Always 'unchecked'. */
  direction: 'unchecked'
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function isMetadataHost(url: string): boolean {
  const u = url.toLowerCase()
  return METADATA_HOSTS.some((h) => u.includes(h))
}

export function gradeEdge(input: GradeInput, fetched: Fetched | null): GradeResult {
  const weakFlags: string[] = []
  for (const p of WEAK_BASIS_PATTERNS) if (p.re.test(input.basis)) weakFlags.push(p.label)
  const spans = extractQuotedSpans(input.evidenceQuote, input.basis)
  if (!spans.length) weakFlags.push('no-quoted-span')

  const base = {
    ...input,
    weakFlags,
    direction: 'unchecked' as const,
    host: hostOf(input.evidenceUrl ?? ''),
    status: fetched?.status ?? 0,
    finalUrl: fetched?.finalUrl ?? '',
    block: fetched?.block ?? ('dead' as Block),
    blockLabel: fetched?.blockLabel ?? '',
    textChars: fetched?.textChars ?? 0,
    extractor: fetched?.extractor ?? 'none',
    quote: 'no' as QuoteVerdict,
    coverage: 0,
    bestSpan: '',
    naming: 'n-a',
  }
  const C = (reason: string): GradeResult => ({ ...base, grade: 'C', reason })

  if (!input.evidenceUrl) return C('no-url')
  if (isBareHost(input.evidenceUrl)) return C('bare-homepage')
  if (isIndexPage(input.evidenceUrl)) return C('index-page')
  if (!fetched) return C('not-fetched')
  if (fetched.block !== 'none') return C(`${fetched.block}:${fetched.blockLabel}`)
  if (!fetched.text.trim()) return C('no-text')

  // Quote location.
  let coverage = 0
  let at = -1
  let bestSpan = ''
  for (const span of spans) {
    const hit = locateQuote(span, fetched.text)
    if (hit.coverage > coverage) {
      coverage = hit.coverage
      at = hit.index
      bestSpan = span
    }
  }
  const quote = spans.length ? verdictFor(coverage) : 'no'
  const naming = input.targetReport
    ? namesTarget(fetched.text, input.targetReport)
    : { artefact: false, agency: false, how: 'no-target-node' }
  const metadataWaiver = isMetadataHost(input.evidenceUrl)

  const out: GradeResult = {
    ...base,
    quote,
    coverage: Math.round(coverage * 100) / 100,
    bestSpan: bestSpan.slice(0, 300),
    naming: naming.how,
    grade: 'C',
    reason: '',
  }

  // No quoted span anywhere in `basis` or `evidence_quote`. Nothing to check
  // the document against, so this can never be better than B — and is only B
  // at all when the document at least names the input artefact. The audit
  // graded several of these PASS on a reading of the page ("paraphrase only,
  // but the claim is directly supported"); this script does not read, so it
  // stops one grade short by design. Expect this to be the single largest
  // class in the corpus — `evidence_quote` was empty on all 56 sampled edges.
  if (!spans.length) {
    if (naming.artefact || metadataWaiver) return { ...out, grade: 'B', reason: 'no-quoted-span' }
    // Agency named, artefact not, nothing to check a quote against. The
    // schema's own B definition is "names the agency not the release", so
    // this is a B — the weakest one the vocabulary has.
    if (naming.agency) return { ...out, grade: 'B', reason: 'no-quoted-span-agency-only' }
    return { ...out, grade: 'C', reason: 'no-quoted-span-target-not-named' }
  }

  if (quote === 'no') {
    // The document resolves and says something, but not this. The audit's
    // FAIL-CONTENT class.
    return { ...out, grade: 'C', reason: 'quote-not-in-document' }
  }
  if (!naming.artefact && !naming.agency && !metadataWaiver) {
    // The quoted sentence IS in this document and the document names neither
    // the target artefact nor its publisher. That is the audit's WEAK shape
    // ("'based on the audited financial statements' with Kingston never
    // named"), not its FAIL shape — something was verified, just not the link
    // to this particular target. B, with its own reason string so the class
    // stays greppable for a research round.
    return { ...out, grade: 'B', reason: 'quote-found-target-not-named' }
  }

  // The A bar. The artefact must be named IN THE PASSAGE the quote came from,
  // not merely somewhere in a 200-page document: all three of the dry run's
  // first-pass false A grades were a verbatim quote about one artefact in a
  // document that mentions the target's name in an unrelated paragraph (or
  // not at all — "ABS GFS Manual" for the target release "Government Finance
  // Statistics, Australia"). Window is the matched span plus 400 characters
  // either side, which is a long paragraph.
  const QUOTE_WINDOW = 400
  let nearQuote = metadataWaiver
  if (!nearQuote && naming.artefact && at >= 0) {
    const hay = normalizeForMatch(fetched.text)
    const from = Math.max(0, at - QUOTE_WINDOW)
    const window = hay.slice(from, at + normalizeForMatch(bestSpan).length + QUOTE_WINDOW)
    nearQuote = namesTarget(window, input.targetReport as Pick<Report, 'title' | 'publisher' | 'url'>).artefact
  }
  if (quote === 'yes' && naming.artefact && nearQuote && !weakFlags.length) {
    return { ...out, grade: 'A', reason: 'quote-found-artefact-named' }
  }
  const why =
    quote === 'partial'
      ? 'partial-quote'
      : !naming.artefact
        ? 'agency-not-artefact'
        : !nearQuote
          ? 'artefact-named-elsewhere-in-document'
          : weakFlags.join('+')
  return { ...out, grade: 'B', reason: why }
}

/* ------------------------------------------------------------------ *
 * Corpus access
 * ------------------------------------------------------------------ */

interface SliceFile {
  file: string
  json: { reports?: Report[]; dependencies?: Dependency[]; _dropped?: unknown[] }
}

function loadSlices(): SliceFile[] {
  return readdirSync(RESEARCH_DIR)
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map((f) => ({ file: f, json: JSON.parse(readFileSync(join(RESEARCH_DIR, f), 'utf8')) }))
}

function edgeKey(s: string, t: string): string {
  return `${s} -> ${t}`
}

/* ------------------------------------------------------------------ *
 * Runner
 * ------------------------------------------------------------------ */

interface Args {
  sample?: string
  feeding: string[]
  slices: string[]
  all: boolean
  write: boolean
  offline: boolean
  json?: string
  limit: number
  concurrency: number
  cacheDir: string
  selftest: boolean
}

function parseArgs(argv: string[]): Args {
  const a: Args = {
    feeding: [],
    slices: [],
    all: false,
    write: false,
    offline: false,
    limit: Infinity,
    concurrency: 6,
    cacheDir: join(ROOT, 'evidence-cache'),
    selftest: false,
  }
  for (let i = 0; i < argv.length; i++) {
    const v = argv[i + 1]
    switch (argv[i]) {
      case '--sample': a.sample = v; i++; break
      case '--feeding': a.feeding.push(...(v ?? '').split(',').filter(Boolean)); i++; break
      case '--slice': a.slices.push(v); i++; break
      case '--all': a.all = true; break
      case '--write': a.write = true; break
      case '--offline': a.offline = true; break
      case '--json': a.json = v; i++; break
      case '--limit': a.limit = Number(v); i++; break
      case '--concurrency': a.concurrency = Number(v); i++; break
      case '--cache-dir': a.cacheDir = v; i++; break
      case '--selftest': a.selftest = true; break
      default:
        if (argv[i].startsWith('--')) {
          console.error(`unknown flag ${argv[i]}`)
          process.exit(2)
        }
    }
  }
  return a
}

async function pool<T, R>(items: T[], n: number, fn: (item: T, i: number) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let cursor = 0
  await Promise.all(
    Array.from({ length: Math.max(1, Math.min(n, items.length)) }, async () => {
      while (cursor < items.length) {
        const i = cursor++
        out[i] = await fn(items[i], i)
      }
    }),
  )
  return out
}

async function getDoc(url: string | undefined, args: Args): Promise<Fetched | null> {
  if (!url) return null
  const cached = readCache(args.cacheDir, url)
  if (cached) return cached
  if (args.offline) return null
  const f = await fetchOne(url)
  writeCache(args.cacheDir, f)
  return f
}

function selftest(): void {
  const checks: Array<[string, boolean]> = []
  const t = (name: string, ok: boolean) => checks.push([name, ok])
  t('normalise collapses whitespace and curly quotes',
    normalizeForMatch('  The “Index”  is\nhere ') === 'the "index" is here')
  t('extracts a long double-quoted span',
    extractQuotedSpans('The note says "the index is compiled under Regulation 03/21 of CEMAC" and so on')
      .length === 1)
  t('drops a short quoted span', extractQuotedSpans('it cites the "CPI" only').length === 0)
  t('does not treat apostrophes as quotes',
    extractQuotedSpans("the Commission's own note names it").length === 0)
  t('exact quote scores 1', quoteCoverage('the index is compiled monthly', 'X. The Index is compiled monthly. Y') === 1)
  t('ellipsis fragments both matched',
    quoteCoverage('the index is compiled … by the institute', 'the index is compiled every month by the institute') === 1)
  t('absent quote scores low', quoteCoverage('the index is compiled monthly', 'unrelated text about fisheries') < 0.2)
  t('verdicts', verdictFor(1) === 'yes' && verdictFor(0.7) === 'partial' && verdictFor(0.2) === 'no')
  const naming = namesTarget('This uses the Consumer Price Index published by ESS.', {
    title: 'Consumer Price Index (CPI) — Ethiopia',
    publisher: 'Ethiopian Statistics Services (ESS)',
    url: 'https://ess.gov.et/price/',
  })
  t('names artefact by title', naming.artefact)
  const agencyOnly = namesTarget('Figures come from the Ethiopian Statistics Services.', {
    title: 'Agricultural Sample Survey — Crop Production',
    publisher: 'Ethiopian Statistics Services (ESS)',
    url: 'https://ess.gov.et/agriculture/',
  })
  t('agency-only is not artefact naming', !agencyOnly.artefact && agencyOnly.agency)
  const fetched: Fetched = {
    url: 'https://x.test/doc.pdf', fetchedAt: '', status: 200, finalUrl: 'https://x.test/doc.pdf',
    contentType: 'application/pdf', bodyBytes: 10, extractor: 'pdftotext', block: 'none', blockLabel: '',
    text: 'The Consumer Price Index is compiled monthly under the Statistics Act.', textChars: 68,
    truncated: false, textSha: '', fromCache: false,
  }
  const target = { title: 'Consumer Price Index (CPI)', publisher: 'Stats Co', url: 'https://x.test/cpi' }
  const a = gradeEdge(
    { source: 's', target: 't', file: 'f.json', basis: 'It states "the Consumer Price Index is compiled monthly".', evidenceUrl: 'https://x.test/doc.pdf', targetReport: target },
    fetched,
  )
  t('clean quote + artefact = A', a.grade === 'A')
  const b = gradeEdge(
    { source: 's', target: 't', file: 'f.json', basis: 'Series are "consistent with" the index; it states "the Consumer Price Index is compiled monthly".', evidenceUrl: 'https://x.test/doc.pdf', targetReport: target },
    fetched,
  )
  t('weak-language basis caps at B', b.grade === 'B')
  const c = gradeEdge(
    { source: 's', target: 't', file: 'f.json', basis: 'It states "fisheries landings rose by four percent in the quarter".', evidenceUrl: 'https://x.test/doc.pdf', targetReport: target },
    fetched,
  )
  t('quote not in document = C', c.grade === 'C' && c.reason === 'quote-not-in-document')
  const d = gradeEdge({ source: 's', target: 't', file: 'f.json', basis: 'x', evidenceUrl: 'https://x.test/' }, fetched)
  t('bare homepage = C', d.grade === 'C' && d.reason === 'bare-homepage')
  const failed = checks.filter(([, ok]) => !ok)
  for (const [name, ok] of checks) console.log(`  ${ok ? '✓' : '✗'} ${name}`)
  console.log(`\nselftest: ${checks.length - failed.length}/${checks.length} pass`)
  process.exit(failed.length ? 1 : 0)
}

/**
 * Dry run against the audit's own 56-edge sample (Midvamp §4: "The grader must
 * reproduce the audit's 56-edge grades before it touches the corpus"). The
 * sample carries the audit's verdict per edge but not the `basis` prose, so
 * each row is joined back to the live corpus by (source, target) — an edge the
 * schema round has since moved to `_dropped` is reported as such rather than
 * silently skipped.
 */
async function runSample(args: Args): Promise<void> {
  const rows = JSON.parse(readFileSync(args.sample as string, 'utf8')) as Array<{
    source: string; target: string; file: string; evidence_url: string; grade: string; notes?: string
  }>
  const slices = loadSlices()
  const reportById = new Map<string, Report>()
  for (const s of slices) for (const r of s.json.reports ?? []) reportById.set(r.id, r)
  const seed = (await import('../src/data/reports')) as { reports: Report[] }
  for (const r of seed.reports) if (!reportById.has(r.id)) reportById.set(r.id, r)
  const liveEdges = new Map<string, { dep: Dependency; file: string }>()
  for (const s of slices) {
    for (const d of s.json.dependencies ?? []) {
      liveEdges.set(edgeKey(d.source_report_id, d.target_report_id), { dep: d, file: s.file })
    }
  }
  const seedDeps = (await import('../src/data/dependencies')) as { dependencies: Dependency[] }
  for (const d of seedDeps.dependencies) {
    const k = edgeKey(d.source_report_id, d.target_report_id)
    if (!liveEdges.has(k)) liveEdges.set(k, { dep: d, file: 'src/data/dependencies.ts' })
  }

  const inputs: Array<{ row: (typeof rows)[number]; input: GradeInput | null }> = rows.map((row) => {
    const live = liveEdges.get(edgeKey(row.source, row.target))
    if (!live) return { row, input: null }
    return {
      row,
      input: {
        source: row.source,
        target: row.target,
        file: live.file,
        basis: live.dep.basis,
        evidenceUrl: live.dep.evidence_url,
        evidenceQuote: live.dep.evidence_quote,
        targetReport: reportById.get(row.target),
      },
    }
  })

  const gone = inputs.filter((x) => !x.input)
  const todo = inputs.filter((x) => x.input) as Array<{ row: (typeof rows)[number]; input: GradeInput }>
  console.log(
    `DRY RUN — audit sample of ${rows.length}; ${todo.length} still live, ${gone.length} no longer a live edge.\n`,
  )

  let done = 0
  const results = await pool(todo, args.concurrency, async ({ row, input }) => {
    const doc = await getDoc(input.evidenceUrl, args)
    const res = gradeEdge(input, doc)
    done++
    if (done % 10 === 0) console.log(`  … ${done}/${todo.length}`)
    return { auditGrade: row.grade, auditNotes: row.notes ?? '', ...res }
  })

  const expected = (g: string): EvidenceGrade => (g === 'PASS' ? 'A' : g === 'WEAK' ? 'B' : 'C')
  const order: EvidenceGrade[] = ['A', 'B', 'C']
  const matrix = new Map<string, number>()
  for (const r of results) matrix.set(`${expected(r.auditGrade)}|${r.grade}`, (matrix.get(`${expected(r.auditGrade)}|${r.grade}`) ?? 0) + 1)

  console.log('\nCONFUSION — audit grade (rows) vs this script (columns)\n')
  console.log('           script A   script B   script C   |  n')
  for (const a of order) {
    const cells = order.map((s) => String(matrix.get(`${a}|${s}`) ?? 0).padStart(8))
    const n = order.reduce((acc, s) => acc + (matrix.get(`${a}|${s}`) ?? 0), 0)
    const label = a === 'A' ? 'PASS  → A' : a === 'B' ? 'WEAK  → B' : 'FAIL  → C'
    console.log(`  ${label} ${cells.join('   ')}   |${String(n).padStart(3)}`)
  }
  const agree = results.filter((r) => r.grade === expected(r.auditGrade)).length
  const stricter = results.filter((r) => order.indexOf(r.grade) > order.indexOf(expected(r.auditGrade))).length
  const looser = results.filter((r) => order.indexOf(r.grade) < order.indexOf(expected(r.auditGrade)))
  console.log(
    `\n  agree ${agree}/${results.length}` +
      `  ·  stricter than the audit ${stricter}` +
      `  ·  LOOSER than the audit ${looser.length}${looser.length ? '  ← each of these is a bug' : ''}`,
  )

  if (looser.length) {
    console.log('\nLOOSER THAN THE AUDIT — the script graded these higher than a human did:')
    for (const r of looser) {
      console.log(`  ${r.grade} vs ${r.auditGrade}  ${r.source} -> ${r.target}  [${r.reason}]`)
      console.log(`      audit: ${r.auditNotes.slice(0, 200)}`)
      console.log(`      span : ${r.bestSpan.slice(0, 140)}`)
    }
  }

  console.log('\nSTRICTER — script below the audit, with the mechanical reason:')
  for (const r of results) {
    if (order.indexOf(r.grade) <= order.indexOf(expected(r.auditGrade))) continue
    console.log(
      `  ${expected(r.auditGrade)}→${r.grade}  ${r.source} -> ${r.target}` +
        `  [${r.reason}; quote ${r.quote} ${r.coverage}; naming ${r.naming}; flags ${r.weakFlags.join(',') || 'none'}]`,
    )
  }

  if (gone.length) {
    console.log('\nNO LONGER A LIVE EDGE (schema round moved or merged these):')
    for (const g of gone) console.log(`  ${g.row.source} -> ${g.row.target}  (audit: ${g.row.grade})`)
  }

  summarise(results)
  if (args.json) {
    writeFileSync(args.json, JSON.stringify({ sample: args.sample, results, gone: gone.map((g) => g.row) }, null, 2))
    console.log(`\nFull results written to ${args.json}`)
  }
}

function summarise(results: GradeResult[]): void {
  const byGrade = new Map<string, number>()
  for (const r of results) byGrade.set(r.grade, (byGrade.get(r.grade) ?? 0) + 1)
  console.log('\nGRADES')
  for (const g of ['A', 'B', 'C']) console.log(`  ${g}  ${String(byGrade.get(g) ?? 0).padStart(4)}`)
  const reasons = new Map<string, number>()
  for (const r of results) reasons.set(r.reason, (reasons.get(r.reason) ?? 0) + 1)
  console.log('\nREASONS')
  for (const [k, v] of [...reasons].sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(4)}  ${k}`)

  // The browser-pass list (Midvamp §4 step 4): everything a headless raw fetch
  // could not read, grouped by host, so a Claude-in-Chrome session can take one
  // host family at a time.
  const blocked = results.filter((r) => r.block === 'wall' || r.block === 'network' || (r.block === 'dead' && r.status !== 404))
  if (blocked.length) {
    const byHost = new Map<string, number>()
    for (const r of blocked) byHost.set(r.host, (byHost.get(r.host) ?? 0) + 1)
    console.log(`\nBROWSER PASS — ${blocked.length} edge(s) unreadable from here, by host:`)
    for (const [h, n] of [...byHost].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${h}`)
  }
  const dead = results.filter((r) => r.block === 'dead' && r.status === 404)
  if (dead.length) console.log(`\n  ${dead.length} edge(s) cite a URL that is genuinely gone (404/410) — a research problem, not a browser one.`)
}

/** Grade a selection of live corpus edges. */
async function runCorpus(args: Args): Promise<void> {
  const slices = loadSlices()
  const reportById = new Map<string, Report>()
  for (const s of slices) for (const r of s.json.reports ?? []) reportById.set(r.id, r)
  const seed = (await import('../src/data/reports')) as { reports: Report[] }
  for (const r of seed.reports) if (!reportById.has(r.id)) reportById.set(r.id, r)

  const wanted: GradeInput[] = []
  for (const s of slices) {
    if (args.slices.length && !args.slices.includes(s.file)) continue
    for (const d of s.json.dependencies ?? []) {
      if (args.feeding.length && !args.feeding.includes(d.target_report_id)) continue
      wanted.push({
        source: d.source_report_id,
        target: d.target_report_id,
        file: s.file,
        basis: d.basis,
        evidenceUrl: d.evidence_url,
        evidenceQuote: d.evidence_quote,
        targetReport: reportById.get(d.target_report_id),
      })
    }
  }
  const todo = wanted.slice(0, args.limit === Infinity ? wanted.length : args.limit)
  console.log(`Grading ${todo.length} edge(s)${args.offline ? ' from cache only' : ''}, ${args.concurrency} at a time.\n`)
  let done = 0
  const results = await pool(todo, args.concurrency, async (input) => {
    const doc = await getDoc(input.evidenceUrl, args)
    const r = gradeEdge(input, doc)
    done++
    if (done % 25 === 0) console.log(`  … ${done}/${todo.length}`)
    return r
  })
  summarise(results)

  if (args.write) {
    writeGrades(results)
  } else {
    console.log('\n(no --write: nothing was written back to the corpus)')
  }
  if (args.json) {
    writeFileSync(args.json, JSON.stringify({ results }, null, 2))
    console.log(`\nFull results written to ${args.json}`)
  }
}

/**
 * Write `evidence_grade` (and `evidence_quote` where an A grade found the span)
 * back into the slice JSONs. Generated, never hand-edited — PLAYBOOK's rule for
 * every corpus mutation. Only the two fields are touched; key order and every
 * other field are preserved by mutating the parsed object in place.
 */
function writeGrades(results: GradeResult[]): void {
  const byFile = new Map<string, GradeResult[]>()
  for (const r of results) {
    if (!r.file.endsWith('.json')) continue // the hand-written seed set is not machine-written
    const list = byFile.get(r.file) ?? []
    list.push(r)
    byFile.set(r.file, list)
  }
  let touched = 0
  for (const [file, rows] of byFile) {
    const path = join(RESEARCH_DIR, file)
    const json = JSON.parse(readFileSync(path, 'utf8')) as { dependencies?: Dependency[] }
    const index = new Map<string, GradeResult>()
    for (const r of rows) index.set(edgeKey(r.source, r.target), r)
    let changed = false
    for (const d of json.dependencies ?? []) {
      const r = index.get(edgeKey(d.source_report_id, d.target_report_id))
      if (!r) continue
      if (d.evidence_grade !== r.grade) {
        d.evidence_grade = r.grade
        changed = true
        touched++
      }
      // An A grade asserts the quote was found in the body, and the schema
      // requires the quote to be ON the edge for that assertion to be
      // falsifiable (types.ts, `evidence_quote`). Fill it from the span that
      // actually matched, never from the basis wholesale.
      if (r.grade === 'A' && !d.evidence_quote && r.bestSpan && !r.bestSpan.startsWith('(no quoted span')) {
        d.evidence_quote = r.bestSpan
        changed = true
      }
    }
    if (changed) writeFileSync(path, `${JSON.stringify(json, null, 2)}\n`)
  }
  console.log(`\n--write: ${touched} edge grade(s) written across ${byFile.size} slice file(s).`)
  console.log('Run `npm run validate` now — a grade of A turns the three evidence warnings into errors.')
}

const args = parseArgs(process.argv.slice(2))
if (args.selftest) {
  selftest()
} else if (args.sample) {
  await runSample(args)
} else if (args.all || args.feeding.length || args.slices.length) {
  await runCorpus(args)
} else {
  console.error('nothing selected — pass --sample <file>, --feeding <ids>, --slice <file>, --all or --selftest')
  process.exit(2)
}
