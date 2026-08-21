import type { Graph, ScoredReport } from './types'
import type { NodePredicate } from './filter'

/**
 * Find a report by name.
 *
 * At 118 nodes this is the binding constraint on the whole project: click-to-
 * focus works, and selecting a node you cannot locate does not. Labels are not
 * the answer — they were tried and removed, because always-on text competes
 * with size for attention and size is the encoding the graph exists to show.
 * So identity stays on demand, and this is the on-demand route to it.
 *
 * Search **locates, it does not hide.** Typing three letters should not make a
 * hundred nodes vanish; the surrounding structure is the context that makes the
 * found node mean anything. Hiding is what filter.ts is for. The two share
 * NodePredicate and nothing else, which is the correct amount of sharing.
 */

/** Fields worth matching, weakest last. Order here sets the ranking. */
const FIELDS: { get: (r: ScoredReport) => string; score: number }[] = [
  { get: (r) => r.title, score: 100 },
  // The id is weighted level with the title, not below it. It is a curated
  // identifier rather than incidental text, and it carries the acronym the
  // title often spells out: StatCan's release is titled "Consumer Price Index"
  // and its id is `statcan-cpi`, so a search for "cpi" that only looked at
  // titles would rank the American CPI-U above the Canadian CPI that thirteen
  // other reports are built on. Scoring both fields the same lets the two tie
  // and the authority tiebreak settle it, which is the right answer for the
  // right reason.
  { get: (r) => r.id.replace(/-/g, ' '), score: 100 },
  { get: (r) => r.publisher, score: 40 },
  { get: (r) => r.region, score: 25 },
  { get: (r) => r.description, score: 8 },
]

/**
 * **Accent-folded and script-aware, 2026-08-21 (review §3.5(a)).** Before this,
 * punctuation was folded to spaces with `/[^a-z0-9]+/g` — an ASCII-only class,
 * so it did double duty as an accidental *script* filter: "Côte d'Ivoire" (the
 * `é`/apostrophe survive NFC as themselves) and "Türkiye" never matched their
 * unaccented spellings, and a Cyrillic title (`ё`, `ж`, …) was stripped down to
 * nothing at all — 139 countries' worth of non-ASCII titles quietly
 * unsearchable in exactly the corpus that most needs them searchable.
 *
 * Two independent fixes, in order:
 * 1. **NFD-decompose, then strip combining marks** (`\p{Mn}`) — turns "é" into
 *    "e" + a combining acute, then drops the mark, so "cote"/"turkiye" find
 *    the accented originals. This alone does nothing for genuinely non-Latin
 *    script — decomposition does not transliterate Cyrillic to Latin, it only
 *    separates a Latin letter from its diacritic.
 * 2. **The punctuation fold itself widened from `[^a-z0-9]` to `[^\p{L}\p{N}]`**
 *    (Unicode letter/number classes, `u` flag) — so a Cyrillic, Greek, CJK, or
 *    any other script's letters survive normalisation as themselves instead of
 *    being treated as punctuation and blanked. This is the actual fix for
 *    "anything Cyrillic": the review's own suggested fix (NFD + strip combining
 *    marks) only covers accented Latin, so it is extended here rather than
 *    left half-solved.
 */
function normalise(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Mn}/gu, '')
    .toLowerCase()
    // Fold punctuation to spaces so "J.D. Power" is found by "jd power", and
    // "CPI-W" by "cpi w" — but keep any script's letters/digits rather than
    // only a-z0-9 (see the function doc above).
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

/**
 * Per-report normalised field cache, keyed by object identity.
 *
 * **Added 2026-08-21 (review §3.5(d)): "re-normalises five fields × 3k nodes ×
 * every keystroke."** Before this, `scoreToken` called `normalise(get(report))`
 * fresh for every (token × field × report) combination on every render — the
 * same five strings recomputed from scratch on every single keystroke, for
 * every report in the corpus, whether or not that report's text ever changes.
 * A `WeakMap` keyed by the `ScoredReport` object itself needs no invalidation
 * logic: a graph rebuild (tier change, corpus reload) hands `search` an
 * entirely new array of report objects, the old ones become unreachable, and
 * their cache entries are collected for free — there is no `report.id` re-key
 * to get wrong and no explicit "clear the cache" call site to forget.
 */
const normalisedFieldsCache = new WeakMap<ScoredReport, string[]>()

function normalisedFields(report: ScoredReport): string[] {
  let cached = normalisedFieldsCache.get(report)
  if (!cached) {
    cached = FIELDS.map(({ get }) => normalise(get(report)))
    normalisedFieldsCache.set(report, cached)
  }
  return cached
}

/**
 * Score one report against one already-normalised token.
 *
 * A word-boundary hit beats a mid-word hit — "rate" should find the Bank Rate
 * before it finds "corporate". Zero means no match at all, and a token that
 * scores zero eliminates the report.
 */
function scoreToken(report: ScoredReport, token: string): number {
  let best = 0
  const fields = normalisedFields(report)
  for (let i = 0; i < FIELDS.length; i++) {
    const text = fields[i]
    const score = FIELDS[i].score
    const at = text.indexOf(token)
    if (at === -1) continue
    const atBoundary = at === 0 || text[at - 1] === ' '
    const whole = text === token
    const hit = score * (whole ? 3 : atBoundary ? 1.6 : 1)
    if (hit > best) best = hit
  }
  return best
}

export interface SearchResult {
  report: ScoredReport
  score: number
}

/**
 * Rank reports against a query. Every token must match something, so adding a
 * word narrows rather than widens — which is what typing more means.
 *
 * `within` is the current filter predicate. A search that returned nodes the
 * user has filtered out would offer to fly the camera to an empty patch of
 * space, so the two features have to agree on what exists.
 */
export function search(
  graph: Graph,
  query: string,
  within: NodePredicate,
  limit = 8,
): SearchResult[] {
  const tokens = normalise(query).split(' ').filter(Boolean)
  if (!tokens.length) return []

  const results: SearchResult[] = []
  for (const report of graph.nodes) {
    if (!within(report)) continue

    let total = 0
    let matchedAll = true
    for (const token of tokens) {
      const s = scoreToken(report, token)
      if (s === 0) {
        matchedAll = false
        break
      }
      total += s
    }
    if (matchedAll) results.push({ report, score: total })
  }

  return results
    .sort(
      (a, b) =>
        b.score - a.score ||
        // Ties broken by authority, so an ambiguous query surfaces the release
        // everything else is built on rather than an alphabetical accident.
        b.report.authority - a.report.authority ||
        a.report.title.localeCompare(b.report.title),
    )
    .slice(0, limit)
}
