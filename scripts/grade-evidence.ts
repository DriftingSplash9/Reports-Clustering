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
 *   npx tsx scripts/grade-evidence.ts --edges "Claude outputs/grade-batch2-debt-2026-09-03.json#browser_pass"
 *                                     — RE-grade exactly these (source, target) pairs. This is the
 *                                       selector for a re-grade; --skip-graded is the selector for a
 *                                       forward pass and would select nothing here.
 *   npx tsx scripts/grade-evidence.ts --find-quotes --feeding sna-2008
 *                                     — propose `evidence_quote` sentences for edges whose
 *                                       basis has no quoted span. Writes a review file, never
 *                                       the corpus (see runFindQuotes for why).
 *   flags: --write (write grades back into the slice JSONs; OFF by default),
 *          --offline (grade from the cache only, no network),
 *          --json <out>, --limit <n>, --concurrency <n> (default 6),
 *          --skip-graded (ignore edges that already carry an `evidence_grade` —
 *                         use it when batching by slice file after an earlier batch),
 *          --refetch (ignore the .evidence-fulltext/ scratch store and fetch again;
 *                     REQUIRED after any change to how a document is fetched, or the
 *                     cached failure is what gets re-graded),
 *          --no-snapshot (disable the archived-snapshot fetch strategy — the
 *                         measurement flag for "what this machine can read on its own"),
 *          --cache-dir <path> (default evidence-cache/), --selftest
 *
 * Two stores, one committed: `evidence-cache/` is the permanent evidence
 * record (header + the verbatim passage each edge's quote was found in) and
 * belongs in git; `.evidence-fulltext/` is local scratch holding whole
 * documents so re-runs do not re-fetch, and is gitignored. See the comment on
 * FULLTEXT_DIR for why it is split that way and what it costs.
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

/**
 * The second PDF text extractor, run out of process. Written for the transport
 * round and proven there to reproduce a Chrome in-page pdf.js capture byte for
 * byte (BPS Energy Balances, 89,289 characters, sha256 `6b2db200…`, both
 * sides). See the PDF branch in `fetchRaw` for why a PDF gets read twice.
 */
const PDFJS_EXTRACTOR = join(HERE, 'capture', 'extract-pdfjs.cjs')

/** A PDF that has not yielded text in three minutes is not going to. */
const PDF_EXTRACT_TIMEOUT_MS = 180_000
const CONNECT_TIMEOUT_S = 15

/**
 * Extraction cap for the LOCAL full-text scratch store. Beyond this the first
 * 4 MB is kept plus a hash of the whole extracted text, so a re-check can
 * still tell whether the document changed.
 *
 * **Raised from 250 KB on 2026-09-04, because the grader matches quotes against
 * the CAPPED text and a quote past the cap is unmatchable.** An edge in that
 * state grades `quote-not-in-document`, which is indistinguishable in a report
 * from a citation that does not say what it claims — the failure mode this cap
 * quietly caused for `sd-cbos-statistical-review-q4-2024 -> sd-cbs-cpi`, whose
 * quoted line ("'Source: Central Bureau of Statistics.") is the LAST line of a
 * 278,363-byte extract, 22 KB past the old cap.
 *
 * Raising it costs almost nothing: this cap governs ONLY `.evidence-fulltext/`,
 * which is disposable gitignored scratch (see FULLTEXT_DIR). The committed
 * `evidence-cache/` record stores matched WINDOWS, not full text, so Thomas's
 * 2026-09-03 repo-size ruling is untouched. Stored text is gzipped; the largest
 * document met so far (minfin's KOSGU workbook, 3,817,390 characters) fits
 * inside 4 MB. The cap still exists so a runaway extraction cannot fill the
 * disk, and `truncated` plus the whole-text sha256 behave exactly as before for
 * anything past it.
 */
const TEXT_CAP_BYTES = 4 * 1024 * 1024

/** The cache separator. Header above, windows below. */
const CACHE_SEP = '\n---\n'

/**
 * **Two stores, and only one of them is committed** (Thomas's ruling,
 * 2026-09-03, on the first dry run's projected 24 MB of committed cache).
 *
 * 1. `evidence-cache/<sha256(url)>.txt.gz` — **the committed evidence
 *    record.** Header (url, when fetched, status, final URL, content type,
 *    extractor, block, full-text length and sha256) plus the matched WINDOW
 *    for each edge that cited this URL: the sentence the quote was found in
 *    with a sentence either side, verbatim. That is the thing worth keeping
 *    forever — it is what a reader needs to see that the citation held on the
 *    day it was graded, and it survives the page changing under it. ~1-3 KB
 *    per document instead of ~17 KB.
 * 2. `.evidence-fulltext/<sha256(url)>.txt.gz` — **local scratch, gitignored.**
 *    The whole extracted text, so re-grading a slice does not re-fetch anyone's
 *    server. Disposable: delete it and the next run refetches.
 *
 * The cost of the ruling, stated plainly: the committed record can no longer
 * answer a question nobody asked at grading time. Re-grading an edge against a
 * DIFFERENT quote needs the page again (or the scratch store), and a URL whose
 * every edge graded C keeps only its header. That is the trade Thomas took to
 * keep the repo small.
 */
const FULLTEXT_DIR = '.evidence-fulltext'

/** Sentences either side of the matched one kept in a window. */
const WINDOW_RADIUS = 1
/** Hard cap per window, so one unpunctuated PDF page cannot become the record. */
const WINDOW_CAP_CHARS = 1200
/** Windows kept per URL. A URL cited by 40 edges records the first 8. */
const MAX_WINDOWS_PER_URL = 8

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

/**
 * Every span this edge can be checked against, best-first-agnostic.
 *
 * `evidence_quote` IS a span — types.ts calls it "the quoted span from the
 * cited document that the grade rests on", and `writeGrades` fills it with a
 * bare matched span, no quotation marks. Running it through
 * `extractQuotedSpans` therefore threw it away unless the researcher had ALSO
 * wrapped it in quotes: 102 quotes accepted in the 2026-09-03 backfill review
 * graded `no-quoted-span`, and the grader could not read back its own output.
 * So the field is taken whole here, with any outer quotation marks stripped,
 * and quoted spans INSIDE it are still harvested for the pre-existing edges
 * whose quote field quotes inline.
 *
 * Adding a span can only raise coverage (the caller keeps the best hit), so
 * this never downgrades an edge that was already matching on its `basis`.
 */
export function spansForEdge(evidenceQuote: string | undefined, basis: string): string[] {
  const out: string[] = []
  const whole = (evidenceQuote ?? '').trim().replace(/^["\u201c\u201e\u00ab]|["\u201d\u00bb]$/g, '').trim()
  if (whole.length >= 24) out.push(whole)
  for (const span of extractQuotedSpans(evidenceQuote, basis)) if (!out.includes(span)) out.push(span)
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
  // Second pass, computed once and only if the spaced compare misses: the
  // whole haystack with every space removed. See the block below.
  let haySquashed: string | null = null
  // squashed-index -> index in `hay`, built with it. Without this the second
  // pass has no honest position to report, and `index` is not cosmetic: the A
  // bar re-runs `namesTarget` on a +/-400 character window around it, so a
  // wrong index silently demotes an A to `artefact-named-elsewhere-in-document`
  // (measured: it did exactly that to `fiscal-equalization-program ->
  // statcan-seph` and `kw-csb -> imf-e-gdds` before this map existed).
  let squashedAt: Int32Array | null = null
  for (const frag of fragments) {
    let whole = hay.indexOf(frag)
    if (whole < 0) {
      // WHITESPACE-INSENSITIVE SECOND PASS. `normalizeForMatch` folds every
      // run of whitespace to ONE SPACE, which is right for a Latin-script
      // document and wrong twice over:
      //   1. A PDF that stores a combining accent as `ponde` + U+0301 + SPACE
      //      + `rations` becomes "ponde rations" — a space inside a word.
      //   2. Chinese and Japanese have no word spaces at all, so EVERY line
      //      break in a CJK PDF becomes a false space: the NHC yearbook's
      //      `国际疾病分类统计\n标准` reads as `统计 标准` and a correctly
      //      copied quote scores 0.75 instead of 1.0.
      // Comparing with all spaces removed from BOTH sides fixes both. It runs
      // ONLY after the spaced compare has already failed, so it can never
      // lower a score — which is why it was measured before it was adopted
      // (2026-09-04, 943 quote-carrying edges with a readable document): 35
      // edges gain coverage, 26 change verdict, 16 of those from 0.00 to 1.00
      // and 14 of THOSE are the Japanese edges that Round B was going to
      // build an n-gram matcher for. False-positive check on 3,000
      // deliberately mismatched (quote, document) pairs from different hosts:
      // one pair moved partial->yes, and it is a Eurostat boilerplate sentence
      // that genuinely appears in both documents.
      if (haySquashed === null) {
        const kept = new Int32Array(hay.length)
        let out = ''
        let n = 0
        for (let i = 0; i < hay.length; i++) {
          if (hay[i] === ' ') continue
          kept[n++] = i
          out += hay[i]
        }
        haySquashed = out
        squashedAt = kept
      }
      const sq = haySquashed.indexOf(frag.replace(/ /g, ''))
      if (sq >= 0) whole = (squashedAt as Int32Array)[sq]
    }
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
  target: Pick<Report, 'title' | 'publisher' | 'url' | 'title_aliases'>,
): { artefact: boolean; agency: boolean; how: string } {
  const hay = normalizeForMatch(body)
  let artefact = false
  let how = ''

  // Title FIRST, then each alias in order, so `how` names the English title
  // whenever the English title is what matched and a reader can tell the two
  // apart in the ledger. See `Report.title_aliases` for why aliases exist and
  // what may go in one.
  const names = [target.title, ...(target.title_aliases ?? [])]
  for (let i = 0; i < names.length && !artefact; i++) {
    const noParens = names[i].replace(/\([^)]*\)/g, ' ')
    const words = tokenise(noParens)
    const tag = i === 0 ? '' : `alias${i}:`
    if (words.length) {
      const run = longestRun(words, hay)
      if (run >= 2 && run / words.length >= 0.6) {
        artefact = true
        how = `${tag}title-run:${run}/${words.length}`
        break
      }
    }
    // A title's leading phrase, for the very long "Title — subtitle (gloss)"
    // shapes: the first clause before an em dash, comma or slash, matched
    // whole. Never fewer than 3 words, so it cannot become a generic phrase.
    const lead = tokenise(noParens.split(/[—–\-,;:\/|]/)[0] ?? '')
    if (lead.length >= 3 && hay.includes(lead.join(' '))) {
      artefact = true
      how = `${tag}title-lead`
      break
    }
  }
  // **WHITESPACE-INSENSITIVE SECOND PASS** (Thomas, 2026-09-04, ruling on the
  // transport round's finding 1). `locateQuote` has had one since round 5 and
  // `namesTarget` did not, so a document whose quote matched at coverage 1.00
  // could still grade `agency-not-artefact` for the same defect in the same
  // PDF. `ci-anstat-ihpc -> ci-anstat-ehcvm` is the measured case: the ANStat
  // PDF renders "Enquete Harmonisee sur les Conditions de Vie des Menages" as
  // `Enque` + combining acute + ` te Harmonise e sur lesConditions`, so
  // `tokenise` sees `enque`, `te`, `harmonise`, `e`, `lesconditions` and the
  // run rule can never fire, though the document names the survey in full,
  // twice.
  //
  // It runs ONLY after the spaced pass above has failed outright, so it can
  // never lower a score or change a `how` that already matched — and it is
  // computed lazily for the same reason: squashing a 4 MB document is not free
  // and most documents never need it.
  if (!artefact) {
    const squashed = hay.replace(/ /g, '')
    const MIN_SQUASHED = 12
    for (let i = 0; i < names.length && !artefact; i++) {
      const noParens = names[i].replace(/\([^)]*\)/g, ' ')
      const words = tokenise(noParens)
      const tag = i === 0 ? '' : `alias${i}:`
      if (words.length) {
        const run = longestRun(words, squashed, '', MIN_SQUASHED)
        if (run >= 2 && run / words.length >= 0.6) {
          artefact = true
          how = `${tag}title-run-nospace:${run}/${words.length}`
          break
        }
      }
      const lead = tokenise(noParens.split(/[\u2014\u2013\-,;:\/|]/)[0] ?? '')
      const leadSquashed = lead.join('')
      if (lead.length >= 3 && leadSquashed.length >= MIN_SQUASHED && squashed.includes(leadSquashed)) {
        artefact = true
        how = `${tag}title-lead-nospace`
        break
      }
    }
  }

  // **ONE INTERPOLATED WORD** (Thomas, 2026-09-04, ruling on round 5's
  // measured gap). `mx-oaxaca-de-juarez -> mx-censo-poblacion` has coverage
  // 1.0 on a verbatim quote and graded B `target-not-named` because the
  // municipality writes "Censo **Nacional** de Poblacion y Vivienda" and
  // INEGI's own name for the artefact — which is what the node carries, per
  // the publisher's-own-title ruling — has no "Nacional". Both doors failed
  // on one inserted word: the run rule because `Nacional` breaks `censo` off
  // the front (4 of the 6 needed), the title-lead because `hay.includes()` is
  // a whole-phrase test. Not the same defect as the whitespace one above and
  // not fixable by retitling the node.
  //
  // ONE token, never two, and only inside a phrase of three words or more:
  // the tolerance has to stay narrow enough that it cannot assemble a title
  // out of scattered words. Runs here need >= 3 title words rather than the
  // spaced pass's 2, for the same reason.
  //
  // **The tolerance applies to a WHOLE name or a whole title-lead, never to a
  // partial run** — and that restriction is not caution, it is measured. The
  // first cut allowed a gap inside any run clearing the 60% bar, and the
  // corpus-wide pass turned up three false A grades against one true one:
  //   * `nz-statsnz-aes -> anzsic` anchored on "New Zealand Standard
  //     Industrial **Output** Classification (NZSIOC)" — a DIFFERENT
  //     classification, 5 of the 7 words of ANZSIC's title with one inserted;
  //   * `vqc-reglement-taxation -> vqc-budget-fonctionnement` on "de la Ville
  //     de Québec", 5 of 8 — the city, not its operating budget;
  //   * `ng-lagos-mtef -> ng-nbs-cpi-rebasing` on "rebasing of the Consumer
  //     Price Index (CPI)", 4 of 6 — the ACT of rebasing, not NBS's release
  //     titled "Highlights of Consumer Price Index (CPI) Rebasing". PLAYBOOK
  //     §7's naming-the-agency shape, arriving through a new door.
  // A partial run plus an interpolation is two liberties at once, and the
  // second pays for the first. Whole-name-bar-one-word keeps the two cases the
  // ruling was made for — INEGI's census with `Nacional` inserted, and the CPI
  // Manual written "Consumer Price Index **(CPI)** Manual" — and refuses all
  // three of those.
  if (!artefact) {
    for (let i = 0; i < names.length && !artefact; i++) {
      const noParens = names[i].replace(/\([^)]*\)/g, ' ')
      const words = tokenise(noParens)
      const tag = i === 0 ? '' : `alias${i}:`
      if (words.length >= 3 && phraseWithOneGap(words, hay)) {
        artefact = true
        how = `${tag}title-whole-gap:${words.length}`
        break
      }
      const lead = tokenise(noParens.split(/[—–\-,;:\/|]/)[0] ?? '')
      if (lead.length >= 3 && lead.length < words.length && phraseWithOneGap(lead, hay)) {
        artefact = true
        how = `${tag}title-lead-gap:${lead.length}`
        break
      }
    }
  }

  // **The single-token path reads the aliases too, and Hangul is in the
  // character class** (Thomas, 2026-09-04, ruling on the Basel round's
  // finding 3). The path exists because a Japanese or Chinese title fragment
  // is one token with no spaces, so the run rule cannot see it — and that
  // reasoning applies to Korean word for word. It had two limits that both
  // bit `kr-financial-stability -> basel-iii`: it iterated `target.title`
  // only, so the attested alias `바젤Ⅲ` could never be reached, and its
  // class held Hiragana, Katakana and CJK Unified Ideographs but not Hangul
  // (U+AC00-U+D7AF) at all. Korean was outside the naming test entirely, by
  // both doors. `normalizeForMatch` folds `Ⅲ` to `iii` under NFKD, so the
  // token this now matches is `바젤iii` — 5 characters and highly specific.
  if (!artefact) {
    for (let i = 0; i < names.length && !artefact; i++) {
      const tag = i === 0 ? '' : `alias${i}:`
      for (const tok of tokenise(names[i].replace(/\([^)]*\)/g, ' '))) {
        if (tok.length >= 3 && /[぀-ヿ㐀-鿿가-힯]/.test(tok) && hay.includes(tok)) {
          artefact = true
          how = `${tag}cjk:${tok}`
          break
        }
      }
    }
  }
  if (!artefact) {
    // **A parenthetical acronym from the target's OWN title, four characters
    // or more** (Thomas, 2026-09-04). The doc comment above still stands for
    // the general case and the reason is in it: `(EDP)` and `(NSW)` matched
    // documents that named neither artefact. Both are THREE characters, and
    // both are a procedure or a jurisdiction rather than an artefact name —
    // which is what the length floor is for. It is not elegant, it is
    // measured: at >= 4 the rule fires on COICOP, HICP, SDDS, BPM6, GFSM,
    // ESA 2010's `esa` never (three), and the corpus-wide sweep that adopted
    // it is in `notes/`. Anything shorter stays agency-level at most, as
    // before.
    //
    // The acronym must be word-bounded in the body, or `IHPC` matches inside
    // `IHPCX` and every three-letter run in a table of codes becomes a hit.
    const MIN_ACRONYM = 4
    for (const m of target.title.matchAll(/\(([^)]{2,40})\)/g)) {
      const acr = m[1].trim()
      if (acr.length < MIN_ACRONYM) continue
      // **The acronym must gloss the WHOLE title, not a component of it.**
      // Caught the first time this rule ran: `pspp-cola-methodology` is
      // "Public Service Pension Plan (PSPP) Cost-of-Living Adjustment (COLA)
      // Methodology", and an Ontario news release that names the PSPP names
      // the PLAN, not the COLA methodology — which is the audit's F-05 shape
      // exactly, arriving through the door this rule opens. So the acronym
      // only counts when nothing follows its closing bracket, or what follows
      // is an alternative rendering of the same title (`/ 企業向けサービス価格指数`
      // after `Services Producer Price Index (SPPI)`).
      const after = target.title.slice((m.index ?? 0) + m[0].length).trim()
      if (after && !/^[\/|—–]/.test(after)) continue
      if (!/^[\p{Lu}\p{N}][\p{Lu}\p{N}.\- ]*$/u.test(acr)) continue
      const n = normalizeForMatch(acr)
      if (!n) continue
      const re = new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRe(n)}([^\\p{L}\\p{N}]|$)`, 'u')
      if (re.test(hay)) {
        artefact = true
        how = `acronym:${acr}`
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
function longestRun(words: string[], hay: string, joiner = ' ', minChars = 0): number {
  let best = 0
  for (let i = 0; i < words.length; i++) {
    for (let j = words.length; j > i + best; j--) {
      const phrase = words.slice(i, j).join(joiner)
      // Only the squashed caller passes a floor. A joined-with-nothing run of
      // short words ("de la" -> "dela") matches inside unrelated words, which
      // is the one way the second pass could invent a match rather than
      // recover one; 12 characters is `locateQuote`'s own fragment floor.
      if (phrase.length < minChars) continue
      if (hay.includes(phrase)) {
        best = j - i
        break
      }
    }
  }
  return best
}

/**
 * Does the word sequence appear in `hay` in order, with at most ONE
 * interpolated token inside it? Written for the publisher who renders the
 * artefact's name with one extra word in the middle — "Censo *Nacional* de
 * Poblacion y Vivienda" for a census INEGI itself calls "Censo de Poblacion
 * y Vivienda".
 *
 * Deliberately NOT a regex over the whole document: a `RegExp` with an
 * optional token at every position would scan a 4 MB haystack once per
 * candidate window, and the run search below has O(n^2) of those. This walks
 * occurrences of the prefix with `indexOf` — native, and it stops at the
 * first occurrence whose tail matches — then checks a short slice. The
 * occurrence cap is a guard for the pathological case where the prefix is one
 * very common short word; a title whose first words are that generic is not
 * one this rule should be rescuing anyway.
 */
function phraseWithOneGap(words: string[], hay: string): boolean {
  if (words.length < 3) return false
  const MAX_OCCURRENCES = 2000
  for (let g = 0; g < words.length - 1; g++) {
    const prefix = words.slice(0, g + 1).join(' ')
    const suffix = words.slice(g + 1).join(' ')
    if (!prefix || !suffix) continue
    let from = 0
    for (let seen = 0; seen < MAX_OCCURRENCES; seen++) {
      const at = hay.indexOf(prefix, from)
      if (at < 0) break
      const after = at + prefix.length
      const rest = hay.slice(after, after + 26 + suffix.length)
      const gap = /^ [^ ]{1,24} /.exec(rest)
      if (gap && rest.slice(gap[0].length).startsWith(suffix)) return true
      from = at + 1
    }
  }
  return false
}

const PUBLISHER_STOPWORDS = new Set(['the', 'and', 'for', 'of', 'de', 'la', 'le', 'les', 'des', 'du', 'da', 'do', 'und', 'der', 'die'])


/**
 * The document as sentences, each kept BOTH ways: `raw` verbatim for the
 * evidence record, `norm` folded for matching. Splitting this way is what
 * lets a window be quoted verbatim without mapping normalised offsets back
 * through five regex passes.
 *
 * Split on sentence punctuation (Latin and CJK) or a blank line, then any run
 * longer than the window cap is chopped — `pdftotext -layout` output of a
 * table has no sentence punctuation at all for pages at a time.
 */
export interface Sentence {
  raw: string
  norm: string
}

export function splitSentences(text: string): Sentence[] {
  const out: Sentence[] = []
  for (const part of text.split(/(?<=[.!?。！？])\s+|\n{2,}/)) {
    const piece = part.trim()
    if (!piece) continue
    for (let i = 0; i < piece.length; i += WINDOW_CAP_CHARS) {
      const raw = piece.slice(i, i + WINDOW_CAP_CHARS)
      out.push({ raw, norm: normalizeForMatch(raw) })
    }
  }
  return out
}

/**
 * The verbatim passage a matched fragment sits in, plus a sentence either
 * side. Returns null when the fragment is nowhere — which is itself worth
 * recording, and the caller writes a header-only record in that case.
 */
export function windowAround(sentences: Sentence[], fragment: string): string | null {
  const needle = normalizeForMatch(fragment)
  if (!needle) return null
  let hit = sentences.findIndex((s) => s.norm.includes(needle))
  if (hit < 0) {
    // The fragment straddles a sentence break (or the extractor broke a line
    // mid-phrase): fall back to its first 4-gram.
    const grams = shingles(needle, 4)
    for (const g of grams) {
      hit = sentences.findIndex((s) => s.norm.includes(g))
      if (hit >= 0) break
    }
  }
  if (hit < 0) return null
  const from = Math.max(0, hit - WINDOW_RADIUS)
  const to = Math.min(sentences.length, hit + WINDOW_RADIUS + 1)
  return sentences
    .slice(from, to)
    .map((s) => s.raw)
    .join(' ')
    .slice(0, WINDOW_CAP_CHARS * 3)
}

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
  extractor: 'pdftotext' | 'html' | 'docx' | 'xlsx' | 'text' | 'none'
  block: Block
  blockLabel: string
  text: string
  textChars: number
  truncated: boolean
  textSha: string
  /**
   * **A SECOND faithful rendering of the same bytes** (Thomas, 2026-09-05).
   * Only PDFs have one: `text` is `pdftotext -layout`, `altText` is pdf.js
   * reading order, and `gradeEdge` grades against both and keeps the better
   * result.
   *
   * Why both rather than the better one. `-layout` reconstructs the page's
   * visual columns, and on a bilingual two-column PDF it interleaves the two
   * languages word by word, so a correctly copied sentence exists in no
   * extraction of the document (measured on BPS: 17 probe spans, `-layout` 6,
   * pdf.js 17). But swapping to pdf.js alone was measured too, over 658 PDFs
   * and 1,060 edges, and it is a WASH — 34 edges up and **32 down**, the
   * regressions almost all `A -> B partial-quote`. The cause is not a defect in
   * either extractor: **a large share of this corpus's PDF quotes were written
   * and verified against `-layout` output**, so changing the rendering unmatches
   * them. Both renderings are faithful to the same bytes, so a quote found in
   * either really is in the document — and reading both restores the property
   * this whole script rests on, that a matcher change can only ever ADD
   * matches. Measured: 306/602/152 on `-layout`, 311/592/157 on pdf.js,
   * **334 A · 584 B · 142 C on both**.
   *
   * Empty for every non-PDF, and for a PDF whose pdf.js read failed.
   */
  altExtractor: 'pdfjs' | 'none'
  altText: string
  fromCache: boolean
  /**
   * Empty when the text came from the cited URL itself. Otherwise the name of
   * the fetch strategy that got it and where from — currently only
   * `wayback <timestamp>`. It is written into the committed evidence record's
   * header, because a reader has to be able to tell "this quote was in the
   * document" from "this quote was in an archived copy of the document taken
   * on 2026-03-10".
   */
  via: string
}

function urlKey(url: string): string {
  return createHash('sha256').update(url).digest('hex')
}

function headerLines(f: Fetched): string {
  return [
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
    // Emitted only when a second rendering exists, for the same reason `via`
    // is: every record written before 2026-09-05 stays byte-identical when it
    // is re-recorded.
    ...(f.altText ? [`alt-extractor: ${f.altExtractor}`, `alt-text-chars: ${f.altText.length}`] : []),
    // Omitted entirely on a direct read, so the 1,670 records written before
    // fetch strategies existed stay byte-identical when they are re-recorded.
    ...(f.via ? [`via: ${f.via}`] : []),
  ].join('\n')
}

function parseHeader(raw: string): Map<string, string> {
  const head = new Map<string, string>()
  for (const line of raw.split('\n')) {
    const i = line.indexOf(': ')
    if (i > 0) head.set(line.slice(0, i), line.slice(i + 2))
  }
  return head
}

/** Local scratch: the whole extracted text, gitignored, disposable. */
function writeFullText(root: string, f: Fetched): void {
  const dir = join(root, FULLTEXT_DIR)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${urlKey(f.url)}.txt.gz`), gzipSync(Buffer.from(headerLines(f) + CACHE_SEP + f.text, 'utf8')))
  // The second rendering lives in its OWN file rather than after a second
  // separator in the first: a sentinel inside the record could occur in a
  // document's own text, and a store written before 2026-09-05 then reads back
  // exactly as it did, with no alt file and no alt text.
  const altPath = join(dir, `${urlKey(f.url)}.alt.txt.gz`)
  if (f.altText) writeFileSync(altPath, gzipSync(Buffer.from(f.altText, 'utf8')))
}

function readFullText(root: string, url: string): Fetched | null {
  const p = join(root, FULLTEXT_DIR, `${urlKey(url)}.txt.gz`)
  if (!existsSync(p)) return null
  const raw = gunzipSync(readFileSync(p)).toString('utf8')
  const at = raw.indexOf(CACHE_SEP)
  if (at < 0) return null
  const head = parseHeader(raw.slice(0, at))
  const blockRaw = head.get('block') ?? 'none'
  const text = raw.slice(at + CACHE_SEP.length)
  const altPath = join(root, FULLTEXT_DIR, `${urlKey(url)}.alt.txt.gz`)
  const altText = existsSync(altPath) ? gunzipSync(readFileSync(altPath)).toString('utf8') : ''
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
    altExtractor: (altText ? (head.get('alt-extractor') ?? 'pdfjs') : 'none') as Fetched['altExtractor'],
    altText,
    fromCache: true,
    via: head.get('via') ?? '',
  }
}

/**
 * The committed record: header + one window per edge that cited this URL.
 * Written once per URL at the end of a run, never concurrently, so several
 * edges sharing a document merge into one file instead of racing.
 */
function writeEvidenceRecord(
  cacheDir: string,
  f: Fetched,
  windows: Array<{ edge: string; grade: string; reason: string; text: string }>,
): void {
  mkdirSync(cacheDir, { recursive: true })
  const body = windows
    .slice(0, MAX_WINDOWS_PER_URL)
    .map((w) => `--- ${w.edge} [${w.grade} ${w.reason}]\n${w.text}`)
    .join('\n\n')
  const header = `${headerLines(f)}\nwindows: ${Math.min(windows.length, MAX_WINDOWS_PER_URL)}${
    windows.length > MAX_WINDOWS_PER_URL ? ` (of ${windows.length} edges)` : ''
  }`
  writeFileSync(join(cacheDir, `${urlKey(f.url)}.txt.gz`), gzipSync(Buffer.from(header + CACHE_SEP + body, 'utf8')))
}

/**
 * The entity table, shared by `stripHtml` and the spreadsheet reader. The
 * ORDER is load-bearing and is the order `stripHtml` has always used: `&amp;`
 * before the numeric forms, so `&amp;lt;` decodes to the literal `&lt;` and
 * not to `<`.
 */
function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
}

function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(script|style|noscript|svg)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<br\s*\/?>|<\/(p|div|li|tr|h[1-6])>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/[ \t ]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Every `<t>` inside one `<si>` (shared string) or `<is>` (inline string),
 * concatenated with NOTHING between the runs — that is Excel's own rule, and
 * it is why this cannot go through `stripHtml`, which puts a space where each
 * tag was and would turn the rich-text cell `Incidencia de pobreza (FGT` + `0`
 * + `)` into `... (FGT 0 )`, breaking any quote lifted from the real sheet.
 */
function ooxmlRuns(fragment: string): string {
  return decodeEntities(
    (fragment.match(/<t[^>]*>[\s\S]*?<\/t>/g) ?? [])
      .map((t) => t.replace(/^<t[^>]*>/, '').replace(/<\/t>$/, ''))
      .join(''),
  )
}

/**
 * An OOXML spreadsheet as text: every non-empty row on its own line, cells
 * tab-separated, sheets in file order. Kept pure and separate from the unzip
 * so the selftest can exercise it on literal XML.
 *
 * Deliberately reads `<v>` and not the displayed value: `xl/styles.xml` is
 * where the number formats live (3.2 MB of it in the Bolivian anuario alone)
 * and applying them would mean reimplementing Excel's formatter. `<v>` is the
 * stored double, so a cell shown as `633,364.2` reads here as
 * `633364.19999999995` — which is exactly what a reader copying a figure out
 * of the sheet in a browser also gets, so quotes match. The cost is that date
 * cells read as serial numbers.
 */
function xlsxText(sharedStringsXml: string | null, sheetXmls: string[]): string {
  const shared = sharedStringsXml
    ? (sharedStringsXml.match(/<si>[\s\S]*?<\/si>|<si\s*\/>/g) ?? []).map(ooxmlRuns)
    : []
  const lines: string[] = []
  for (const xml of sheetXmls) {
    for (const row of xml.match(/<row[^>]*>[\s\S]*?<\/row>/g) ?? []) {
      const cells: string[] = []
      // The self-closing alternative MUST come first. `<c[^>]*>` happily
      // matches `<c r="B1" s="2"/>` as an opening tag, and the paired branch
      // would then run `[\s\S]*?` on to the NEXT `</c>` and swallow the
      // following cell whole.
      for (const c of row.match(/<c[^>]*\/>|<c[^>]*>[\s\S]*?<\/c>/g) ?? []) {
        const type = /\st="([^"]+)"/.exec(c)?.[1]
        if (type === 'inlineStr') {
          const inline = ooxmlRuns(c)
          if (inline) cells.push(inline)
          continue
        }
        const v = /<v[^>]*>([\s\S]*?)<\/v>/.exec(c)?.[1]
        if (v === undefined) continue
        cells.push(type === 's' ? (shared[Number(v)] ?? '') : decodeEntities(v))
      }
      const line = cells.join('\t').trim()
      if (line) lines.push(line)
    }
  }
  return lines.join('\n')
}

/** `xlsxText` over a real workbook on disk, via `unzip` like the docx branch. */
async function extractXlsx(bodyPath: string): Promise<string> {
  const listed = await execFileAsync('unzip', ['-Z1', bodyPath], { maxBuffer: 8 << 20 })
  const names = listed.stdout.split('\n').map((n) => n.trim()).filter(Boolean)
  const read = async (name: string) =>
    (await execFileAsync('unzip', ['-p', bodyPath, name], { maxBuffer: 64 << 20 })).stdout
  const sharedXml = names.includes('xl/sharedStrings.xml') ? await read('xl/sharedStrings.xml') : null
  const sheetNames = names
    .filter((n) => /^xl\/worksheets\/sheet\d+\.xml$/.test(n))
    .sort((a, b) => Number(/\d+/.exec(a)?.[0] ?? 0) - Number(/\d+/.exec(b)?.[0] ?? 0))
  const sheets: string[] = []
  for (const n of sheetNames) sheets.push(await read(n))
  return xlsxText(sharedXml, sheets)
}

/**
 * Percent-encode a URL for curl.
 *
 * curl rejects a URL carrying raw spaces or non-ASCII bytes with exit code 3
 * ("URL using bad/illegal format"), which the fetcher then records as
 * `network:curl-3` — indistinguishable in a debt list from a host that is
 * genuinely gone. Sudan's central bank serves its quarterly review under an
 * Arabic filename with spaces in it; encoded, the same URL is a 200.
 *
 * Escapes ONLY what curl refuses — the space and anything outside printable
 * ASCII — and passes `%` through untouched, so an already-encoded URL is a
 * no-op. `encodeURI` cannot be used for this: it escapes `%` too, turning
 * `a%20b` into `a%2520b`. The cache key is still computed from the CORPUS url,
 * so nothing already stored is orphaned by this.
 */
export function encodeForCurl(url: string): string {
  let out = ''
  for (const ch of url) {
    const code = ch.codePointAt(0) ?? 0
    if (code > 0x20 && code < 0x7f) {
      out += ch
      continue
    }
    for (const byte of new TextEncoder().encode(ch)) {
      out += `%${byte.toString(16).toUpperCase().padStart(2, '0')}`
    }
  }
  return out
}

/**
 * Raw fetch with curl. Deliberately curl and not `fetch()`: this needs a
 * self-signed-cert retry (`-k`, which is how the audit read leganet.cd), a
 * body on disk for `pdftotext`, and the ability to say "the transport failed"
 * with a code rather than an exception string.
 */
async function fetchRaw(url: string): Promise<Fetched> {
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
    const { stdout } = await execFileAsync('curl', [...base, ...extra, encodeForCurl(url)], { maxBuffer: 8 << 20 })
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
  let altExtractor: Fetched['altExtractor'] = 'none'
  let altText = ''
  const isPdf = body.subarray(0, 5).toString('latin1') === '%PDF-' || /pdf/i.test(meta.ctype)
  const isZip = body.subarray(0, 2).toString('latin1') === 'PK'
  try {
    if (isPdf && body.length) {
      // **A PDF is read TWICE** (Thomas, 2026-09-05) — see `Fetched.altText`
      // for the measurement that decided it. `-layout` stays PRIMARY so that
      // `text`, `textSha`, `extractor` and every already-committed
      // `evidence-cache/` header keep meaning exactly what they meant before;
      // pdf.js reading order is the addition. The second read runs out of
      // process because a 365-page PDF is not something to hold in the
      // grader's own heap ten at a time, and because a malformed or encrypted
      // file then takes the child down rather than the run.
      const { stdout } = await execFileAsync('pdftotext', ['-layout', '-q', bodyPath, '-'], {
        maxBuffer: 64 << 20,
      })
      text = stdout
      extractor = 'pdftotext'
      const pdfOut = join(dir, 'pdfjs.txt')
      try {
        await execFileAsync(process.execPath, [PDFJS_EXTRACTOR, bodyPath, pdfOut], {
          maxBuffer: 64 << 20,
          timeout: PDF_EXTRACT_TIMEOUT_MS,
        })
        const alt = existsSync(pdfOut) ? readFileSync(pdfOut, 'utf8') : ''
        // Identical output is not worth storing or grading twice, and on a
        // plain single-column PDF the two agree often enough to matter.
        if (alt.trim() && alt !== text) {
          altText = alt
          altExtractor = 'pdfjs'
        }
      } catch {
        /* pdf.js is the second opinion, never the one the run depends on */
      }
    } else if (isZip && (/spreadsheetml/i.test(meta.ctype) || /\.xls[xm](\?|#|$)/i.test(url))) {
      // Ahead of the docx branch on purpose. An xlsx content-type is
      // `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,
      // which contains `officedocument`, so the broader test below used to
      // claim every spreadsheet, fail on `word/document.xml`, and record
      // `empty:no-extractor` — the eight browser-pass edges this branch is for.
      text = await extractXlsx(bodyPath)
      extractor = 'xlsx'
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
  // Judged on the LONGER of the two renderings: a PDF whose `-layout` pass
  // yields nothing while pdf.js yields a document is not an empty body.
  if (
    block === 'none' &&
    meta.code >= 200 &&
    meta.code < 300 &&
    text.trim().length < 200 &&
    altText.trim().length < 200
  ) {
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
    altExtractor,
    altText: Buffer.byteLength(altText, 'utf8') > TEXT_CAP_BYTES
      ? Buffer.from(altText, 'utf8').subarray(0, TEXT_CAP_BYTES).toString('utf8')
      : altText,
    fromCache: false,
    via: '',
  }
}

/* ------------------------------------------------------------------ *
 * Fetch strategies
 * ------------------------------------------------------------------ */

/**
 * **What a fetch strategy is, and the one rule it must not break.** A strategy
 * is a SECOND route to the document the edge already cites — never a different
 * document. Swapping in another source for a weak edge is research, and this
 * script does not do research (file header). So a strategy may change where the
 * bytes come from; it may not change what the edge is graded against, and the
 * `via` field records the substitution in the committed evidence record.
 *
 * **What was measured, 2026-09-03, before writing any of this.** The round's
 * brief was to wire PLAYBOOK §6's three documented workarounds for the biggest
 * unreadable hosts into this function. All three were tested with curl from
 * both the cloud sandbox and the bridge VM, and **none of them is scriptable
 * as documented**:
 *
 * - `bps.go.id` → `web-api.bps.go.id`. The sibling host is real and unwalled
 *   (`/download.php` answers with a PHP error rather than a challenge), but it
 *   serves files only against a signed `download.php?f=<token>` whose token is
 *   read out of the publication page's DOM — and the publication page is the
 *   Cloudflare-challenged thing. The workaround was written for a human with a
 *   browser and it still needs one. Indonesia's BPS also has no Wayback
 *   snapshots at all, so the snapshot strategy below cannot reach it either.
 * - `ibge.gov.br` → `ftp.`/`biblioteca.`/`concla.`. `ftp.ibge.gov.br` is wide
 *   open, but it carries DOCUMENTS, and every ibge.gov.br URL the corpus cites
 *   is a `/estatisticas/...` landing page with no file behind it. `biblioteca.`
 *   and `concla.` are now Cloudflare-challenged themselves — §6 has gone stale.
 * - `imf.org` → the Google-viewer route. `docs.google.com/viewer?url=…` returns
 *   a 4.6 KB JavaScript shell to curl; the viewer is a browser instrument.
 *   §6's premise is also backwards today: imf.org's `/-/media/…` PDFs read
 *   fine with plain curl from an ordinary network, and it is the `/en/News/…`
 *   press releases that Akamai denies.
 *
 * So this table holds one strategy, and it is the one that measured well.
 */

/** Availability API. `archive.org` answers it; `web.archive.org` serves the bytes. */
const WAYBACK_AVAILABLE = 'https://archive.org/wayback/available?url='

/**
 * A block a snapshot is allowed to rescue. **`dead` is deliberately absent.**
 * A 404 means the citation has rotted, and that is exactly what the dead-URL
 * debt list measures; letting an archived copy quietly grade it A would hide
 * the rot behind a good grade. A wall, a transport failure or a JavaScript
 * shell say nothing about whether the citation is still valid — only that this
 * machine could not read it — so those may be rescued.
 */
export function snapshotRescuable(block: Block): boolean {
  return block === 'wall' || block === 'network' || block === 'empty'
}

/**
 * **Which routes weaken the claim, and which do not** (Thomas, 2026-09-04,
 * ruling on the Claude-in-Chrome browser pass; OCR cap added 2026-09-04,
 * same session, HANDOFF item 4).
 *
 * An archived snapshot says "this quote was in this document on <timestamp>" —
 * a copy, on some past date — so it caps at B. A read taken in Thomas's own
 * Chrome is a different thing: it is the CITED url, fetched live over his home
 * network, and the only reason the grader could not take it itself is that the
 * host answers a JavaScript challenge that curl cannot. That is a statement
 * about the fetcher, not about the document, so a Chrome read grades as the
 * direct read it is.
 *
 * An OCR read is the opposite case, and caps for the same reason a wayback
 * read does rather than the reason it doesn't: tesseract output is not the
 * document's own text layer, it's a statistical reconstruction of it, and the
 * three edges graded A this way (Benin, Angola, Gambia; browser pass round 2)
 * carried visible OCR damage. `via: ocr ...` is written for every OCR-sourced
 * fulltext (PLAYBOOK: "record the route as `via: ocr tesseract <date>`"), so
 * capping on the `ocr` prefix catches all of them the same way `wayback` does.
 *
 * `via` is still recorded either way, and the committed evidence record carries
 * it, because a reader must always be able to see where the bytes came from.
 */
export function routeCapsGrade(via: string): boolean {
  return via.startsWith('wayback') || via.startsWith('ocr') || via.startsWith('token-pdf')
}

/**
 * `via: token-pdf <date>` — **the cited page is the publication's stable
 * landing page and the quoted sentence is inside the PDF that page serves,
 * which has no stable URL of its own** (Thomas, 2026-09-04, ruling on the
 * 17 deferred BPS edges).
 *
 * The shape, and it is not unique to BPS: an agency publishes a landing page
 * with a title and an abstract, and the publication itself only through a
 * signed `download.php` token generated by that page's own JavaScript and
 * expiring within hours. Citing the token is citing a URL that is dead by
 * tomorrow; citing the landing page and quoting the PDF puts the citation and
 * the quote one step apart, which §6 otherwise forbids. Neither is honest on
 * its own. Naming the route is what makes the pair honest — the record says
 * openly that the quote came from the publication behind this page rather
 * than from the page — and capping at B is the same treatment `wayback`
 * already gets for the same reason: a reader has to be able to tell
 * "this quote is in this document" from "this quote is in a document this
 * page hands you".
 *
 * The five BPS publications this was ruled for are listed in
 * `Claude outputs/browser-pass-bps-psa-2026-09-04.json` under `refused`.
 */
export const TOKEN_PDF_ROUTE = 'token-pdf'

/**
 * The `id_` suffix is load-bearing: it asks the Wayback Machine for the
 * ORIGINAL bytes, without its own injected toolbar and rewritten links. Without
 * it every archived HTML page arrives carrying a few kilobytes of archive.org
 * chrome, which is text the grader would then be matching quotes against.
 */
export function waybackFetchUrl(timestamp: string, url: string): string {
  return `https://web.archive.org/web/${timestamp}id_/${url}`
}

/** Pure half of the availability lookup, so `--selftest` can assert on it. */
export function parseWaybackAvailable(raw: string): string | null {
  try {
    const j = JSON.parse(raw) as { archived_snapshots?: { closest?: { timestamp?: string; status?: string; available?: boolean } } }
    const c = j.archived_snapshots?.closest
    if (!c || c.available === false) return null
    if (c.status && c.status !== '200') return null
    return /^\d{14}$/.test(c.timestamp ?? '') ? (c.timestamp as string) : null
  } catch {
    return null
  }
}

/**
 * **archive.org answers 429 long before this script would think to slow down.**
 * A 300-URL pass at concurrency 6 exhausts the availability API's budget in
 * under a minute, and a 429 is indistinguishable from "no snapshot exists"
 * unless you look — which is how a rescue pass silently turns into a no-op.
 * So every availability lookup goes through one global gate spaced by
 * WAYBACK_MIN_GAP_MS regardless of pool width, retries a 429 with growing
 * backoff, and the ANSWER (including "no snapshot") is cached on disk so a
 * re-run costs archive.org nothing. The snapshot download itself is not gated:
 * web.archive.org served four concurrent readers all round without complaint.
 */
const WAYBACK_MIN_GAP_MS = 1200
const WAYBACK_RETRIES = 3
let waybackGate: Promise<unknown> = Promise.resolve()

function throttleWayback<T>(fn: () => Promise<T>): Promise<T> {
  const next = waybackGate.then(async () => {
    const r = await fn()
    await new Promise((res) => setTimeout(res, WAYBACK_MIN_GAP_MS))
    return r
  })
  // The gate must not break on one failed lookup, so the chain swallows.
  waybackGate = next.catch(() => undefined)
  return next
}

/**
 * Split `body` from the trailing `-w '\n%{http_code}'` status curl appends.
 *
 * Trivial, and it gets its own exported helper because getting it wrong is
 * silent and total. The first version of this searched for the two-character
 * sequence `\n` instead of a newline; `lastIndexOf` returned -1, the status
 * parsed as NaN, NaN matched neither the 429 branch nor the failure branch, so
 * every lookup was treated as a CONCLUSIVE answer, the truncated body failed to
 * parse, and the whole snapshot strategy cached "no snapshot exists" for every
 * URL it was asked about — while reporting nothing at all. A rescue pass that
 * rescues nothing looks exactly like a host that cannot be rescued.
 */
export function splitCurlWrite(stdout: string): { code: number; body: string } {
  const at = stdout.lastIndexOf('\n')
  if (at < 0) return { code: 0, body: stdout }
  const code = Number(stdout.slice(at + 1).trim())
  return { code: Number.isFinite(code) ? code : 0, body: stdout.slice(0, at) }
}

/** Cached availability answers. `""` is a real answer: no usable snapshot. */
function snapshotCachePath(url: string): string {
  return join(ROOT, FULLTEXT_DIR, 'wayback', `${urlKey(url)}.txt`)
}

async function findSnapshot(url: string): Promise<string | null> {
  const cached = snapshotCachePath(url)
  if (existsSync(cached)) {
    const v = readFileSync(cached, 'utf8').trim()
    return v || null
  }
  let answer: string | null = null
  let conclusive = false
  for (let attempt = 0; attempt < WAYBACK_RETRIES; attempt++) {
    const got = await throttleWayback(async () => {
      try {
        const { stdout } = await execFileAsync(
          'curl',
          ['-sS', '-A', UA, '--max-time', '30', '--connect-timeout', String(CONNECT_TIMEOUT_S),
           '-w', '\n%{http_code}', `${WAYBACK_AVAILABLE}${encodeURIComponent(url)}`],
          { maxBuffer: 1 << 20 },
        )
        return splitCurlWrite(stdout)
      } catch {
        return { code: 0, body: '' }
      }
    })
    if (got.code === 429 || got.code === 0) {
      await new Promise((res) => setTimeout(res, WAYBACK_MIN_GAP_MS * (attempt + 2)))
      continue
    }
    answer = parseWaybackAvailable(got.body)
    conclusive = true
    break
  }
  // Only a conclusive answer is cached. A run that ran out of budget must not
  // bake "no snapshot" into the store for every URL it never got to ask about.
  if (conclusive) {
    mkdirSync(dirname(cached), { recursive: true })
    writeFileSync(cached, answer ?? '')
  }
  return answer
}

/**
 * One direct attempt, then the strategies. A strategy only ever runs after the
 * direct read has failed in a way `snapshotRescuable` allows, and only its own
 * clean result is returned — a snapshot that is itself walled, empty or gone
 * leaves the ORIGINAL failure standing, so the browser-pass list keeps naming
 * the real host and the real reason rather than "web.archive.org 404".
 */
async function fetchOne(url: string, args: Args): Promise<Fetched> {
  const first = await fetchRaw(url)
  if (args.noSnapshot || !snapshotRescuable(first.block)) return first
  const ts = await findSnapshot(url)
  if (!ts) return first
  const snap = await fetchRaw(waybackFetchUrl(ts, url))
  if (snap.block !== 'none' || !snap.text.trim()) return first
  // Keyed and reported under the CITED url — the snapshot is a route to it,
  // not a replacement for it. `final-url` and `via` carry where it came from.
  return { ...snap, url, via: `wayback ${ts}` }
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
    altExtractor: 'none',
    altText: '',
    fromCache: false,
    via: '',
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
  targetReport?: Pick<Report, 'title' | 'publisher' | 'url' | 'title_aliases'>
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
  /** Empty on a direct read; otherwise the strategy that got the document. */
  via: string
  /**
   * The verbatim passage the quote was found in, a sentence either side. This
   * is what goes into the committed evidence record; empty when nothing
   * matched or the document was never read.
   */
  window: string
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
  const spans = spansForEdge(input.evidenceQuote, input.basis)
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
    via: fetched?.via ?? '',
    quote: 'no' as QuoteVerdict,
    coverage: 0,
    bestSpan: '',
    naming: 'n-a',
    window: '',
  }
  const C = (reason: string): GradeResult => ({ ...base, grade: 'C', reason })

  if (!input.evidenceUrl) return C('no-url')
  if (isBareHost(input.evidenceUrl)) return C('bare-homepage')
  if (isIndexPage(input.evidenceUrl)) return C('index-page')
  if (!fetched) return C('not-fetched')
  if (fetched.block !== 'none') return C(`${fetched.block}:${fetched.blockLabel}`)
  if (!fetched.text.trim() && !fetched.altText.trim()) return C('no-text')
  // Narrowed by the guard above; a property narrowing does not survive into a
  // closure, so it is captured here rather than re-asserted inside one.
  const evidenceUrl = input.evidenceUrl


  // **A document can have TWO faithful renderings, and the edge is graded
  // against both** (Thomas, 2026-09-05). See `Fetched.altText` for the
  // measurement. Everything below runs once per rendering and the better
  // result is returned, so adding the second rendering can only ever ADD
  // matches — the property the whole script rests on, and the property a
  // straight extractor swap would have broken.
  const gradeAgainst = (docText: string, extractorUsed: string): GradeResult => {
    // Quote location. **Every span is located, not only the winner** — the A
    // bar below asks whether the artefact is named beside a matched span, and
    // until 2026-09-04 it could only ever ask about the highest-scoring one.
    const hits = spans.map((span) => ({ span, ...locateQuote(span, docText) }))
    let coverage = 0
    let bestSpan = ''
    for (const h of hits) {
      if (h.coverage > coverage) {
        coverage = h.coverage
        bestSpan = h.span
      }
    }
    const quote = spans.length ? verdictFor(coverage) : 'no'
    const naming = input.targetReport
      ? namesTarget(docText, input.targetReport)
      : { artefact: false, agency: false, how: 'no-target-node' }
    const metadataWaiver = isMetadataHost(evidenceUrl)

    // **The A bar tests the window around ANY fully-matched span, not only the
    // highest-scoring one** (Thomas, 2026-09-04, ruling on the Basel round's
    // finding 1). The artefact still has to be named IN the passage the quote
    // came from — that requirement is the whole point of the bar and is
    // unchanged. What changed is which passage gets asked about.
    //
    // The defect: a great many bases in this corpus open by naming the source
    // document ("The official press release for 'X' states: …") and then quote
    // the substantive sentence. Both spans match at coverage 1.00, the tie broke
    // to whichever came first, and `bestSpan` became the headline — whose ±400
    // characters are page navigation chrome where the artefact name of course
    // never appears. `frb-regulation-q -> basel-iii` graded B
    // `artefact-named-elsewhere-in-document` on coverage 1.00 with naming true,
    // on an arbitrary tie-break between two equally perfect quotes.
    //
    // Only spans that are themselves `yes` may anchor (>= 0.95 coverage). A
    // partial span must not be able to hand an A to an edge whose substantive
    // sentence is only half present, and restricting candidates this way is also
    // what keeps `quote` — computed above from the best coverage — consistent
    // with the span finally recorded.
    //
    // The anchoring span then BECOMES `bestSpan`, so the window in the evidence
    // record is the passage the grade actually rests on, and `writeGrades` fills
    // `evidence_quote` from it rather than from a press release's headline.
    const QUOTE_WINDOW = 400
    const hayNorm = normalizeForMatch(docText)
    const namesArtefactNear = (index: number, span: string): boolean => {
      if (index < 0 || !input.targetReport) return false
      const from = Math.max(0, index - QUOTE_WINDOW)
      const around = hayNorm.slice(from, index + normalizeForMatch(span).length + QUOTE_WINDOW)
      return namesTarget(around, input.targetReport).artefact
    }
    let nearQuote = metadataWaiver
    if (!nearQuote && naming.artefact) {
      const anchors = hits.filter(
        (h) => h.index >= 0 && verdictFor(h.coverage) === 'yes' && namesArtefactNear(h.index, h.span),
      )
      if (anchors.length) {
        nearQuote = true
        const anchor = anchors.reduce((a, b) => (b.coverage > a.coverage ? b : a))
        coverage = anchor.coverage
        bestSpan = anchor.span
      }
    }

    const sentences = splitSentences(docText)
    const window = bestSpan ? (windowAround(sentences, bestSpan) ?? '') : ''

    const out: GradeResult = {
      ...base,
      extractor: extractorUsed,
      quote,
      coverage: Math.round(coverage * 100) / 100,
      bestSpan: bestSpan.slice(0, 300),
      naming: naming.how,
      window,
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
    // Statistics, Australia"). `nearQuote` is decided above, where the anchoring
    // span is picked; the window is that span plus 400 characters either side,
    // which is a long paragraph.
    if (quote === 'yes' && naming.artefact && nearQuote && !weakFlags.length) {
      // **A document read by a fetch strategy caps at B** (Thomas, 2026-09-03,
      // ruling on round 3d). An archived snapshot says "this quote was in this
      // document on <timestamp>", which is a weaker claim than "this quote is in
      // this document" — and the difference is invisible on screen once the grade
      // is written. Rather than let one A mean two things, the snapshot-read case
      // takes the grade below the line and keeps its own reason string, so the
      // class stays greppable if the live host ever becomes readable again.
      //
      // Deliberately placed AFTER the A bar rather than inside it: the bar itself
      // is unchanged, and an edge landing here has cleared every evidence test an
      // A clears. The only thing against it is where the bytes came from.
      if (fetched.via && routeCapsGrade(fetched.via)) {
        // **The reason names the ROUTE, not "snapshot" for all three** (fixed
        // 2026-09-04, Thomas's ruling on the transport round's finding 2). Every
        // capped route reported `…-via-snapshot`, which is false for `token-pdf`
        // (a live read of the PDF the cited page hands you, capped because the
        // quote sits one step from the citation) and false for `ocr` (a live read
        // of a scanned page). PLAYBOOK §6 condemns exactly this shape — one label
        // for two routes reads as a lie in the round's own output. `wayback`
        // keeps the original string so §7's greppable class survives untouched.
        const route = fetched.via.split(' ')[0]
        const label = route === 'wayback' ? 'snapshot' : route
        return { ...out, grade: 'B', reason: `quote-found-artefact-named-via-${label}` }
      }
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

  const primary = gradeAgainst(fetched.text, fetched.extractor)
  if (!fetched.altText.trim() || fetched.altText === fetched.text) return primary
  const alternate = gradeAgainst(fetched.altText, fetched.altExtractor)
  // Better grade wins; on a tie the better coverage does; on a tie there, the
  // primary rendering, so a document whose two readings agree records the same
  // extractor it always did.
  const rank = (g: EvidenceGrade): number => (g === 'A' ? 0 : g === 'B' ? 1 : 2)
  if (rank(alternate.grade) < rank(primary.grade)) return alternate
  if (rank(alternate.grade) === rank(primary.grade) && alternate.coverage > primary.coverage) return alternate
  return primary
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
  findQuotes: boolean
  skipGraded: boolean
  /** `--edges <path[#key]>` — the exact (source, target) pairs to grade. */
  edgeKeys?: Set<string>
  edgesSpec?: string
  noSnapshot: boolean
  refetch: boolean
}

/**
 * `--edges <path[#key]>` — **select on the work, not on the container.**
 * PLAYBOOK §6 already records why batching by SLICE FILE is unsafe: the file is
 * not the unit of work, so a re-run re-selects edges an earlier batch graded
 * and a host that is merely down today rewrites yesterday's A as a C.
 * `--skip-graded` answers that for a FORWARD pass, but it is exactly wrong for
 * a re-grade, where every edge you want is already graded by construction.
 *
 * So a re-grade names its edges. The file may be a bare array of
 * `{source, target}`, or an object with the array under a key —
 * `--edges "Claude outputs/grade-batch2-debt-2026-09-03.json#browser_pass"` is
 * the shape this was written for. Pairs the corpus no longer carries are
 * reported, not silently dropped.
 */
function loadEdgeSelection(spec: string): Set<string> {
  const hash = spec.lastIndexOf('#')
  const path = hash > 0 ? spec.slice(0, hash) : spec
  const key = hash > 0 ? spec.slice(hash + 1) : ''
  const raw: unknown = JSON.parse(readFileSync(path, 'utf8'))
  let rows: unknown[]
  if (Array.isArray(raw)) rows = raw
  else if (key) rows = ((raw as Record<string, unknown>)[key] as unknown[]) ?? []
  else rows = Object.values(raw as Record<string, unknown>).filter(Array.isArray).flat()
  const out = new Set<string>()
  for (const r of rows) {
    const o = r as { source?: unknown; target?: unknown }
    if (typeof o.source === 'string' && typeof o.target === 'string') out.add(edgeKey(o.source, o.target))
  }
  if (!out.size) {
    console.error(`--edges ${spec}: no {source, target} pairs found`)
    process.exit(2)
  }
  return out
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
    findQuotes: false,
    skipGraded: false,
    noSnapshot: false,
    refetch: false,
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
      case '--find-quotes': a.findQuotes = true; break
      case '--skip-graded': a.skipGraded = true; break
      case '--edges': a.edgesSpec = v; a.edgeKeys = loadEdgeSelection(v); i++; break
      case '--no-snapshot': a.noSnapshot = true; break
      case '--refetch': a.refetch = true; break
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
  // `--refetch`: a FAILED fetch is cached like any other, so the obvious way to
  // re-grade an edge after teaching the fetcher a new route — just run it
  // again — is a cache hit on the old failure and a silent no-op. Anything that
  // changes how getDoc reads a document has to be paired with this flag or with
  // an emptied .evidence-fulltext/.
  const cached = args.refetch ? null : readFullText(ROOT, url)
  if (cached) return cached
  if (args.offline) return null
  const f = await fetchOne(url, args)
  writeFullText(ROOT, f)
  return f
}

/**
 * Write the committed evidence record for every URL a run touched: header
 * plus the verbatim window each edge's quote was found in. Done after the
 * pool, one file per URL, so edges sharing a document merge rather than race.
 * Skipped in `--offline` runs only when the document was never available.
 */
function recordEvidence(results: GradeResult[], args: Args): number {
  const byUrl = new Map<string, GradeResult[]>()
  for (const r of results) {
    if (!r.evidenceUrl) continue
    const list = byUrl.get(r.evidenceUrl) ?? []
    list.push(r)
    byUrl.set(r.evidenceUrl, list)
  }
  let written = 0
  for (const [url, rows] of byUrl) {
    const doc = readFullText(ROOT, url)
    if (!doc) continue
    writeEvidenceRecord(
      args.cacheDir,
      doc,
      rows.map((r) => ({
        edge: `${r.source} -> ${r.target}`,
        grade: r.grade,
        reason: r.reason,
        text: r.window || '(no passage matched)',
      })),
    )
    written++
  }
  return written
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
  t('evidence_quote is taken whole, without quotation marks of its own',
    spansForEdge('The basket weights were derived from the 2025 HFCE series.', 'no span here')
      .includes('The basket weights were derived from the 2025 HFCE series.'))
  t('a short evidence_quote is still dropped', spansForEdge('CPI weights', 'no span here').length === 0)
  // The whitespace-insensitive second pass (2026-09-04). Four assertions,
  // because the change has four ways to go wrong: it can fail to fire, it can
  // fire with the wrong position, it can invent a match, or it can lower a
  // score it should have left alone.
  t('a line break inside a CJK word no longer defeats an exact quote',
    locateQuote(
      '2002\u5E74\u8D77\uFF0C\u91C7\u7528ICD-10\u56FD\u9645\u75BE\u75C5\u5206\u7C7B\u7EDF\u8BA1\u6807\u51C6\u3002',
      'a table caption\n2002 \u5E74\u8D77\uFF0C\u91C7\u7528 ICD-10 \u56FD\u9645\u75BE\u75C5\u5206\u7C7B\u7EDF\u8BA1\n\u6807\u51C6\u3002\nmore text',
    ).coverage === 1)
  t('a combining accent split by a space no longer defeats an exact quote',
    locateQuote('la qualite des ponderations de l IPCH',
      'normes minimales pour la qualite des ponde\u0301 rations de l IPCH').coverage === 1)
  t('the second pass reports the position of the match, not zero',
    locateQuote('lesponderationsdelIPCH',
      'x'.repeat(500) + ' les ponderations de l IPCH').index > 400)
  t('a landing page whose quote came from the PDF behind it caps at B',
    routeCapsGrade('token-pdf 2026-09-04') && !routeCapsGrade('chrome 2026-09-04'))
  t('a parenthetical acronym glossing the whole title names the artefact',
    namesTarget('deaths are coded to ICD-10 throughout',
      { title: 'International Statistical Classification of Diseases (ICD-10)', publisher: 'WHO', url: '' }).artefact)
  t('a parenthetical acronym glossing only a COMPONENT of the title does not',
    !namesTarget('members would join the Public Service Pension Plan (PSPP) on the same terms',
      { title: 'Public Service Pension Plan (PSPP) Cost-of-Living Adjustment (COLA) Methodology', publisher: 'x', url: '' }).artefact)
  t('a three-letter parenthetical acronym still does not name the artefact',
    !namesTarget('the EDP notification tables were transmitted in April',
      { title: 'Hellenic fiscal reporting (EDP) tables', publisher: 'x', url: '' }).artefact)
  t('the second pass does not invent a match that is not there',
    locateQuote('the weights come from the household budget survey',
      'this document is about something else entirely and says nothing of the kind').coverage < 0.55)
  t('quoted spans inside an evidence_quote are kept as well',
    spansForEdge('the report says "the index is compiled under Regulation 03/21" here', '').length === 2)
  t('xlsx resolves a shared-string cell and keeps a numeric cell verbatim',
    xlsxText(
      '<sst><si><t>Poblacion total</t></si></sst>',
      ['<row><c r="A1" t="s"><v>0</v></c><c r="B1"><v>633364.19999999995</v></c></row>'],
    ) === 'Poblacion total\t633364.19999999995')
  t('xlsx joins rich-text runs with nothing between them',
    xlsxText(
      '<sst><si><r><t>Incidencia de pobreza (FGT</t></r><r><t>0</t></r><r><t>)</t></r></si></sst>',
      ['<row><c r="A1" t="s"><v>0</v></c></row>'],
    ) === 'Incidencia de pobreza (FGT0)')
  t('xlsx drops empty rows and does not let a self-closing cell swallow the next one',
    xlsxText(
      '<sst><si><t>kept</t></si></sst>',
      ['<row><c r="A1" s="2"/><c r="B1" s="2"/></row><row><c r="A2" s="2"/><c r="B2" t="s"><v>0</v></c></row>'],
    ) === 'kept')
  t('xlsx reads an inline string and concatenates sheets in order',
    xlsxText(null, [
      '<row><c r="A1" t="inlineStr"><is><t>one</t></is></c></row>',
      '<row><c r="A1" t="inlineStr"><is><t>two</t></is></c></row>',
    ]) === 'one\ntwo')
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
    truncated: false, textSha: '', altExtractor: 'none', altText: '', fromCache: false, via: '',
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
  const sents = splitSentences('The index is compiled monthly. It uses the Retail Price Survey.\n\nUnrelated table row.')
  t('splits sentences', sents.length === 3 && sents[1].raw.startsWith('It uses'))
  const win = windowAround(sents, 'it uses the retail price survey')
  t('window quotes verbatim, with a neighbour', !!win && win.includes('The index is compiled monthly.') && win.includes('Retail Price Survey'))
  t('window returns null when the fragment is absent', windowAround(sents, 'fisheries landings rose by four percent') === null)
  const graded = gradeEdge(
    { source: 's', target: 't', file: 'f.json', basis: 'It states "the Consumer Price Index is compiled monthly".', evidenceUrl: 'https://x.test/doc.pdf', targetReport: target },
    fetched,
  )
  t('an A carries its verbatim window', graded.grade === 'A' && graded.window.includes('Consumer Price Index'))
  t('a wall/network/empty block may be rescued by a snapshot',
    snapshotRescuable('wall') && snapshotRescuable('network') && snapshotRescuable('empty'))
  t('a dead (404) citation may NOT be rescued by a snapshot',
    !snapshotRescuable('dead') && !snapshotRescuable('none'))
  t('wayback fetch url asks for the original bytes',
    waybackFetchUrl('20260310034653', 'https://x.test/a.pdf') ===
      'https://web.archive.org/web/20260310034653id_/https://x.test/a.pdf')
  t('wayback availability parses a live snapshot',
    parseWaybackAvailable('{"archived_snapshots":{"closest":{"status":"200","available":true,"timestamp":"20250531002924"}}}') === '20250531002924')
  t('wayback availability rejects an empty answer, a non-200 snapshot and junk',
    parseWaybackAvailable('{"archived_snapshots":{}}') === null &&
      parseWaybackAvailable('{"archived_snapshots":{"closest":{"status":"404","timestamp":"20250531002924"}}}') === null &&
      parseWaybackAvailable('<html>nope') === null)
  const viaFetched: Fetched = { ...fetched, via: 'wayback 20250908003713' }
  const viaGraded = gradeEdge(
    { source: 's', target: 't', file: 'f.json', basis: 'It states "the Consumer Price Index is compiled monthly".', evidenceUrl: 'https://x.test/doc.pdf', targetReport: target },
    viaFetched,
  )
  t('an otherwise-A document read via a snapshot caps at B',
    viaGraded.grade === 'B' && viaGraded.reason === 'quote-found-artefact-named-via-snapshot')
  t('the snapshot cap does not touch a directly-read A', graded.grade === 'A')
  const chromeFetched: Fetched = { ...fetched, via: 'chrome 2026-09-04' }
  const chromeGraded = gradeEdge(
    { source: 's', target: 't', file: 'f.json', basis: 'It states "the Consumer Price Index is compiled monthly".', evidenceUrl: 'https://x.test/doc.pdf', targetReport: target },
    chromeFetched,
  )
  t('a document read in a real browser grades as the direct read it is',
    chromeGraded.grade === 'A' && chromeGraded.reason === 'quote-found-artefact-named')
  const tokenFetched: Fetched = { ...fetched, via: 'token-pdf 2026-09-04' }
  const tokenGraded = gradeEdge(
    { source: 's', target: 't', file: 'f.json', basis: 'It states "the Consumer Price Index is compiled monthly".', evidenceUrl: 'https://x.test/doc.pdf', targetReport: target },
    tokenFetched,
  )
  t('a token-pdf read caps at B and its reason names the route, not a snapshot',
    tokenGraded.grade === 'B' && tokenGraded.reason === 'quote-found-artefact-named-via-token-pdf')
  t('wayback keeps the reason string PLAYBOOK §7 names, so the class stays greppable',
    viaGraded.reason === 'quote-found-artefact-named-via-snapshot')
  t('a wayback or OCR route caps the grade; a Chrome or direct read does not',
    routeCapsGrade('wayback 20250908003713') && routeCapsGrade('ocr tesseract 2026-09-04') &&
    !routeCapsGrade('chrome 2026-09-04') && !routeCapsGrade(''))
  // Grading against both renderings (2026-09-05). Three ways it can go wrong:
  // it can fail to use the second rendering at all, it can let the second
  // rendering LOWER a grade the first one earned, or it can report the wrong
  // extractor for the reading the grade actually rests on.
  const bothInput = {
    source: 's', target: 't', file: 'f.json',
    basis: 'It states "the Consumer Price Index is compiled monthly".',
    evidenceUrl: 'https://x.test/doc.pdf', targetReport: target,
  }
  const onlyAltHasIt: Fetched = {
    ...fetched, extractor: 'pdftotext',
    text: 'The Consumer P r i c e I n d e x is compiled under interleaved column junk.',
    altExtractor: 'pdfjs', altText: 'The Consumer Price Index is compiled monthly under the Statistics Act.',
  }
  const bothGraded = gradeEdge(bothInput, onlyAltHasIt)
  t('a quote only the second rendering contains still grades A, and names its extractor',
    bothGraded.grade === 'A' && bothGraded.extractor === 'pdfjs')
  const altIsWorse: Fetched = {
    ...fetched, extractor: 'pdftotext', altExtractor: 'pdfjs',
    altText: 'This rendering lost the sentence entirely and says nothing of the kind.',
  }
  t('a second rendering can never LOWER the grade the first one earned',
    gradeEdge(bothInput, altIsWorse).grade === 'A' &&
    gradeEdge(bothInput, altIsWorse).extractor === 'pdftotext')
  t('a url with spaces and non-ascii is percent-encoded for curl',
    encodeForCurl('https://cbos.gov.sd/files/\u0627\u0644\u0639\u0631\u0636 2024 .pdf') ===
      'https://cbos.gov.sd/files/%D8%A7%D9%84%D8%B9%D8%B1%D8%B6%202024%20.pdf')
  t('an already-encoded url is not double-encoded, and delimiters survive',
    encodeForCurl('https://x.test/a%20b.pdf?q=1&r=2#f') === 'https://x.test/a%20b.pdf?q=1&r=2#f')
  t('curl -w status is split off the body, not left in it',
    splitCurlWrite('{"a":1}\n429').code === 429 && splitCurlWrite('{"a":1}\n429').body === '{"a":1}')
  t('a body with no trailing status is never read as a conclusive status',
    splitCurlWrite('{"a":1}').code === 0 && splitCurlWrite('nonsense\nxx').code === 0)
  t('an availability answer survives the split intact',
    parseWaybackAvailable(splitCurlWrite('{"archived_snapshots":{"closest":{"status":"200","available":true,"timestamp":"20250531002924"}}}\n200').body) === '20250531002924')
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

  const recorded = recordEvidence(results, args)
  console.log(`\nEVIDENCE RECORD — ${recorded} document(s) written to ${args.cacheDir.replace(ROOT + '/', '')}/ (header + matched windows).`)
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
  // Only edges whose DOCUMENT could not be read. An edge with no URL at all,
  // or one ruled out by the index-page rule before any fetch, is a research
  // problem and would otherwise pad this list with a blank host — 40 of the
  // 304 edges in the first batch were exactly that.
  const NOT_A_FETCH_PROBLEM = new Set(['no-url', 'bare-homepage', 'index-page', 'not-fetched'])
  const blocked = results.filter(
    (r) =>
      !NOT_A_FETCH_PROBLEM.has(r.reason) &&
      // `empty` belongs here and was missing until 2026-09-03: a 200 that
      // extracts to nothing is a JavaScript shell, which is a fetch problem in
      // exactly the same sense as a challenge page — and the browser is exactly
      // what fixes it. Leaving it out made this list 62 edges shorter than the
      // debt list built from the same run.
      (r.block === 'wall' || r.block === 'network' || r.block === 'empty' || (r.block === 'dead' && r.status !== 404)),
  )
  if (blocked.length) {
    const byHost = new Map<string, number>()
    for (const r of blocked) byHost.set(r.host, (byHost.get(r.host) ?? 0) + 1)
    console.log(`\nBROWSER PASS — ${blocked.length} edge(s) unreadable from here, by host:`)
    for (const [h, n] of [...byHost].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${h}`)
  }
  // Bucketed by ROUTE, not lumped together: since 2026-09-04 a `via` can be a
  // browser read as well as a snapshot, and only one of the two caps the grade
  // (routeCapsGrade). One label for both read as a lie in the round's own output.
  const viaRows = results.filter((r) => r.via)
  if (viaRows.length) {
    const byRoute = new Map<string, Map<string, number>>()
    for (const r of viaRows) {
      const route = r.via.split(' ')[0]
      const hosts = byRoute.get(route) ?? new Map<string, number>()
      hosts.set(r.host, (hosts.get(r.host) ?? 0) + 1)
      byRoute.set(route, hosts)
    }
    for (const [route, hosts] of byRoute) {
      const n = [...hosts.values()].reduce((a, b) => a + b, 0)
      // Three cases, not two. Until 2026-09-04 anything that was not
      // `wayback` was reported as "a direct read of the cited URL", which
      // described `token-pdf` and `ocr` — both capped at B precisely because
      // they are NOT that — as if they were unrestricted live reads.
      const label =
        route === 'wayback'
          ? `READ VIA AN ARCHIVED SNAPSHOT — ${n} edge(s), capped at B; the live host refused this machine:`
          : routeCapsGrade(route)
            ? `READ VIA ${route.toUpperCase()} — ${n} edge(s), capped at B; the bytes did not come from the cited URL itself:`
            : `READ VIA ${route.toUpperCase()} — ${n} edge(s); graded as a direct read of the cited URL:`
      console.log(`\n${label}`)
      for (const [h, c] of [...hosts].sort((a, b) => b[1] - a[1])) console.log(`  ${String(c).padStart(4)}  ${h}`)
    }
  }
  const dead = results.filter((r) => r.block === 'dead' && r.status === 404)
  if (dead.length) console.log(`\n  ${dead.length} edge(s) cite a URL that is genuinely gone (404/410) — a research problem, not a browser one.`)
  const noUrl = results.filter((r) => r.reason === 'no-url')
  if (noUrl.length) console.log(`  ${noUrl.length} edge(s) cite no URL at all — the standing evidence debt, also research.`)
}

function selectEdges(
  slices: SliceFile[],
  reportById: Map<string, Report>,
  args: Args,
): GradeInput[] {
  const wanted: GradeInput[] = []
  for (const s of slices) {
    if (args.slices.length && !args.slices.includes(s.file)) continue
    for (const d of s.json.dependencies ?? []) {
      if (args.feeding.length && !args.feeding.includes(d.target_report_id)) continue
      // `--skip-graded`: batching by SLICE FILE re-selects every edge in the
      // file, including ones an earlier batch already graded and wrote. Those
      // re-grades are not free and not safe: a host that is merely down today
      // would rewrite yesterday's A as a C with no way to tell a real
      // regression from a flaky fetch. Selection only — the grade table,
      // matching and naming helpers are untouched by this flag.
      if (args.skipGraded && d.evidence_grade) continue
      if (args.edgeKeys && !args.edgeKeys.has(edgeKey(d.source_report_id, d.target_report_id))) continue
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
  return wanted
}

/**
 * Phrases that make a sentence a statement about where a figure came from,
 * rather than a sentence that merely mentions the target. Multilingual because
 * the corpus is: French, Spanish, Portuguese, German, Russian, Japanese and
 * Chinese slices all carry their evidence in their own language. Deliberately
 * broad — a candidate still has to name the artefact, and a human still has to
 * accept it.
 */
const DEPENDENCY_PHRASES: readonly RegExp[] = [
  /\b(?:based (?:on|upon)|derived from|compiled (?:from|using)|calculated (?:from|using)|estimated from|drawn from|taken from|obtained from|sourced from|uses? data|using data|draws? on|relies on|in accordance with|pursuant to|as defined in|as prescribed|prescribed by|set out in|published under|required by|source[s]?\s*:)/i,
  /\b(?:à partir des|sur la base de|conformément à|issues? de|selon la|source\s*:)/i,
  /\b(?:con base en|a partir de|de acuerdo con|conforme a|según (?:el|la|los)|fuente\s*:)/i,
  /\b(?:com base (?:em|no|na)|a partir dos|de acordo com|conforme (?:o|a)|fonte\s*:)/i,
  /\b(?:auf (?:der )?(?:grundlage|basis)|gemäß|nach maßgabe|quelle\s*:)/i,
  /(?:на основе|в соответствии с|согласно|источник\s*:)/i,
  /(?:に基づ|により作成|を用いて|資料[：:])/,
  /(?:依据|根据|来源[：:]|资料来源)/,
]

/**
 * All-caps designators from a title's parentheses — "SNA 2008", "ESA 2010",
 * "SDDS", "e-GDDS". Used ONLY by the quote harvester, never by the grader:
 * an acronym is too weak to justify a grade on its own (it produced two of
 * the first dry run's false A grades), but it is exactly how a document
 * usually names a standard in a sentence, and a harvested candidate is
 * proposed to a reader rather than believed.
 */
function titleAcronyms(title: string): string[] {
  const out: string[] = []
  for (const m of title.matchAll(/\(([^)]{2,20})\)/g)) {
    const raw = m[1].trim()
    if (!/[A-Za-z]/.test(raw)) continue
    if (raw.replace(/[^A-Za-z]/g, '').length > 8) continue
    if (!/^[A-Za-z][A-Za-z0-9 .&-]*$/.test(raw)) continue
    if (raw.toLowerCase() === raw) continue
    out.push(normalizeForMatch(raw))
    // Documents flip the year to the front as often as not: "the 2008 SNA".
    const swap = /^([a-z.&-]+)\s+((?:19|20)\d{2})$/i.exec(raw)
    if (swap) out.push(normalizeForMatch(`${swap[2]} ${swap[1]}`))
  }
  return out
}

function hasDependencyPhrase(text: string): boolean {
  return DEPENDENCY_PHRASES.some((re) => re.test(text))
}

/**
 * **The quote backfill** (Thomas's ruling, 2026-09-03: "get the quotes").
 *
 * The single biggest class in the first dry run was `no-quoted-span`: the
 * edge's `basis` contains no quoted sentence, so there is nothing to check the
 * cited document against and the edge is capped at B however good the citation
 * is. This mode reads the document the edge ALREADY cites and proposes the
 * sentences that could serve as its `evidence_quote`.
 *
 * **It proposes; it does not decide, and it never writes to the corpus.** The
 * reason is a circularity that would otherwise be invisible: if the grader
 * both picks the quote and then grades the edge on finding that quote, an `A`
 * means only "this script found a sentence it liked twice". The gate has to be
 * a reader — an agent or Thomas — accepting the sentence as what the edge
 * actually rests on. Once accepted into `evidence_quote` by hand or by a
 * reviewed generator pass, the next grading run picks it up like any other
 * quote and the edge can reach A honestly.
 *
 * A candidate must name the target artefact (the same `namesTarget` test the
 * grader uses) and carry a dependency phrase. It is scored, not ranked by
 * position, and the top three per edge are emitted.
 */
async function runFindQuotes(args: Args): Promise<void> {
  const slices = loadSlices()
  const reportById = new Map<string, Report>()
  for (const s of slices) for (const r of s.json.reports ?? []) reportById.set(r.id, r)
  const seed = (await import('../src/data/reports')) as { reports: Report[] }
  for (const r of seed.reports) if (!reportById.has(r.id)) reportById.set(r.id, r)

  const all = selectEdges(slices, reportById, args)
  const needy = all.filter((e) => e.evidenceUrl && !extractQuotedSpans(e.evidenceQuote, e.basis).length)
  const todo = needy.slice(0, args.limit === Infinity ? needy.length : args.limit)
  console.log(
    `QUOTE BACKFILL — ${all.length} edge(s) selected, ${needy.length} carry no quoted span` +
      `${todo.length !== needy.length ? `, taking ${todo.length}` : ''}.\n`,
  )

  let done = 0
  const rows = await pool(todo, args.concurrency, async (edge) => {
    const doc = await getDoc(edge.evidenceUrl, args)
    done++
    if (done % 25 === 0) console.log(`  … ${done}/${todo.length}`)
    if (!doc || doc.block !== 'none' || !doc.text.trim()) {
      return { edge, blocked: `${doc?.block ?? 'not-fetched'}${doc?.blockLabel ? `:${doc.blockLabel}` : ''}`, candidates: [] }
    }
    const target = edge.targetReport
    const candidates: Array<{ sentence: string; score: number; why: string }> = []
    if (target) {
      const acronyms = titleAcronyms(target.title)
      for (const sent of splitSentences(doc.text)) {
        const raw = sent.raw.trim()
        if (raw.length < 40 || raw.length > 700) continue
        const naming = namesTarget(raw, target)
        const acronym = acronyms.find((a) =>
          new RegExp(`(^|[^a-z0-9])${escapeRe(a)}([^a-z0-9]|$)`).test(sent.norm),
        )
        if (!naming.artefact && !acronym) continue
        const phrase = hasDependencyPhrase(raw)
        if (!phrase) continue
        let score = naming.artefact ? 3 : 2
        const why: string[] = [
          naming.artefact ? `names artefact (${naming.how})` : `names the designator "${acronym}" only`,
          'dependency phrase',
        ]
        if (/\b(?:19|20)\d{2}\b/.test(raw)) {
          score += 1
          why.push('carries a year')
        }
        candidates.push({ sentence: raw.replace(/\s+/g, ' '), score, why: why.join(' · ') })
      }
    }
    candidates.sort((a, b) => b.score - a.score || a.sentence.length - b.sentence.length)
    return { edge, blocked: '', candidates: candidates.slice(0, 3) }
  })

  const withCandidates = rows.filter((r) => r.candidates.length)
  const blocked = rows.filter((r) => r.blocked)
  console.log(`\n  ${withCandidates.length} edge(s) have at least one candidate sentence`)
  console.log(`  ${rows.length - withCandidates.length - blocked.length} readable but nothing qualified`)
  console.log(`  ${blocked.length} unreadable (blocked, dead or not fetched)`)
  console.log(
    '\nNOTHING WAS WRITTEN. A candidate becomes evidence only when a reader accepts it into\n' +
      '`evidence_quote` — see the comment on runFindQuotes for why the grader must not close\n' +
      'that loop itself.',
  )
  for (const r of withCandidates.slice(0, 10)) {
    console.log(`\n  ${r.edge.source} -> ${r.edge.target}  (${r.edge.file})`)
    console.log(`    ${r.candidates[0].sentence.slice(0, 220)}`)
    console.log(`    [${r.candidates[0].why}]`)
  }
  if (withCandidates.length > 10) console.log(`\n  … and ${withCandidates.length - 10} more in the JSON.`)

  const out =
    args.json ?? join(ROOT, 'Claude outputs', `quote-backfill-${new Date().toISOString().slice(0, 10)}.json`)
  writeFileSync(
    out,
    JSON.stringify(
      {
        generated: new Date().toISOString(),
        selected: all.length,
        noQuotedSpan: needy.length,
        examined: todo.length,
        rows: rows.map((r) => ({
          source: r.edge.source,
          target: r.edge.target,
          file: r.edge.file,
          evidence_url: r.edge.evidenceUrl,
          target_title: r.edge.targetReport?.title ?? null,
          basis: r.edge.basis,
          blocked: r.blocked || undefined,
          candidates: r.candidates,
        })),
      },
      null,
      2,
    ),
  )
  console.log(`\nProposals written to ${out.replace(ROOT + '/', '')}`)
}

/** Grade a selection of live corpus edges. */
async function runCorpus(args: Args): Promise<void> {
  const slices = loadSlices()
  const reportById = new Map<string, Report>()
  for (const s of slices) for (const r of s.json.reports ?? []) reportById.set(r.id, r)
  const seed = (await import('../src/data/reports')) as { reports: Report[] }
  for (const r of seed.reports) if (!reportById.has(r.id)) reportById.set(r.id, r)

  const wanted = selectEdges(slices, reportById, args)
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
  const recorded = recordEvidence(results, args)
  console.log(`\nEVIDENCE RECORD — ${recorded} document(s) written to ${args.cacheDir.replace(ROOT + '/', '')}/ (header + matched windows).`)
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
      // Only an A writes the quote back, and since 2026-09-03 a snapshot-read
      // edge is never an A — so a machine-written `evidence_quote` always means
      // "found in the live document", never "found in an archived copy".
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
} else if (args.findQuotes) {
  await runFindQuotes(args)
} else if (args.sample) {
  await runSample(args)
} else if (args.all || args.feeding.length || args.slices.length || args.edgeKeys) {
  await runCorpus(args)
} else {
  console.error('nothing selected — pass --sample <file>, --feeding <ids>, --slice <file>, --all or --selftest')
  process.exit(2)
}
