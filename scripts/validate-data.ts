/**
 * Data integrity check. Run with `npm run validate`.
 *
 * Prints structural problems, then both authority rankings side by side.
 * The two rankings disagreeing sharply is usually a sign of bad edge data,
 * not of the weighting being clever — that comparison is the point of this.
 */
import { dependencies, droppedNotes, loadIssues, relations, reports } from '../src/data'
import {
  DOMAINS,
  DROPPED_LEAD_REASONS,
  DROPPED_REASONS,
  RELATION_TYPES,
} from '../src/lib/types'

// Invariant (✗) failures below print AND fail the run. Before 2026-08-07 they
// printed but exited 0, which let a red validator pass unnoticed for three
// sessions (see NZ/G.4.md, Secondary observations).
let invariantFailures = 0
import {
  buildGraph,
  contains,
  isBareHost,
  isIndexPage,
  isDocumented,
  isOfficial,
  isRanked,
  isTerminus,
  RELATIONSHIP_WEIGHT,
  RETAINED_FRACTION,
  rolledUpAuthority,
  validate,
} from '../src/lib/graph'

if (loadIssues.dangling.length) {
  console.log('\nDROPPED — edges pointing at reports not yet researched')
  for (const d of loadIssues.dangling) console.log(`  · ${d}`)
}
if (loadIssues.orphans.length) {
  // No longer dropped, as of V0.12 — they are kept and shelved in a margin. The
  // count is still printed because it is worth watching: a sweep that adds fifty
  // islands has added territory in the most literal sense.
  console.log('\nISOLATED — reports with no surviving edge, kept and shelved')
  for (const o of loadIssues.orphans) console.log(`  · ${o}`)
}
if (loadIssues.duplicateIds.length) {
  console.log('\nDUPLICATE IDS — report defined in more than one slice (first wins, later copy dropped)')
  for (const d of loadIssues.duplicateIds) console.log(`  · ${d}`)
  invariantFailures++
}
// Now fails the run, decided 2026-08-09 (EU/G.74.md, was G.73.md cheap check
// 10, Thomas's standing "decide and document"). It used to print and exit 0,
// which is how it scrolled past unremarked through G.72.md's account of its own
// validator run.
//
// It is worse than DUPLICATE IDS, not better. A duplicate id loses a record you
// could recover from the surviving copy; a superseded edge loses *evidence* for
// a claim that stays in the graph looking fully cited. G.73.md's Finding 5 is
// the worked case: `fiscal-equalization-program -> statcan-system-macroeconomic-
// accounts` was defined three times, each copy citing a different provision of
// SOR/2007-303, and two of the three verbatim statutory quotations were being
// discarded on every build while the edge rendered as normal.
//
// The argument against, which is real and is being overruled rather than
// ignored: a deliberate override — a slice intentionally restating an edge to
// supersede an earlier one — is a legitimate pattern, and this rule forbids it
// outright. It is overruled because there are currently zero superseded edges,
// so the rule can be tightened at no cost today, and because the pattern has
// never actually been used that way in this corpus: all three known instances
// were accidents that lost data. If a future session finds a genuine need to
// override, the honest fix is an explicit field saying so, not silence. Merge
// the copies instead — keep every distinct basis and evidence_url, labelled,
// under a dated merge note, which is what Finding 5 did.
if (loadIssues.duplicateEdges.length) {
  console.log(
    '\nSUPERSEDED — edges defined twice (last wins; the earlier copy was dropped)',
  )
  for (const d of loadIssues.duplicateEdges) console.log(`  ✗ ${d}`)
  console.log(
    '  ✗ merge these into one object, preserving every distinct basis and evidence_url',
  )
  invariantFailures++
}

const issues = validate(reports, dependencies)
const errors = issues.filter((i) => i.severity === 'error')
const warnings = issues.filter((i) => i.severity === 'warning')

console.log(`\n${reports.length} reports, ${dependencies.length} dependencies\n`)

if (errors.length) {
  console.log('ERRORS')
  for (const e of errors) console.log(`  ✗ ${e.message}`)
  console.log()
}
if (warnings.length) {
  console.log('WARNINGS')
  for (const w of warnings) console.log(`  ! ${w.message}`)
  console.log()
}
if (!issues.length) console.log('No structural issues.\n')

const graph = buildGraph(reports, dependencies)

/**
 * The commercial-source invariant.
 *
 * The whole case for offering a toggle that hides commercial sources is that
 * hiding them cannot reshuffle the graph — no size changes, no rank changes, no
 * re-layout — so the two views differ only in which nodes are drawn. That rests
 * on commercial nodes being outside the authority calculation, which is easy to
 * state and easy to break later: one outgoing edge from a commercial node, or
 * one caller reaching past `isOfficial`, and the property quietly dies.
 *
 * So it is checked rather than asserted. Build the graph again with the
 * commercial nodes and their edges removed entirely, and every official score
 * must come back identical.
 */
const commercial = reports.filter((r) => !isOfficial(r))

if (commercial.length) {
  const officialOnly = reports.filter(isOfficial)
  const officialIds = new Set(officialOnly.map((r) => r.id))
  const withoutCommercial = buildGraph(
    officialOnly,
    dependencies.filter(
      (d) =>
        officialIds.has(d.source_report_id) && officialIds.has(d.target_report_id),
    ),
  )

  let worst = 0
  let worstId = ''
  for (const n of withoutCommercial.nodes) {
    const drift = Math.abs(n.authority - (graph.byId.get(n.id)?.authority ?? 0))
    if (drift > worst) {
      worst = drift
      worstId = n.id
    }
  }

  // Commercial nodes that depend on something would transfer rank if anyone
  // ever put them back in the calculation, so flag the shape, not just the sum.
  const notSinks = commercial.filter(
    (r) => (graph.byId.get(r.id)?.out_degree ?? 0) > 0,
  )

  console.log(
    `COMMERCIAL SOURCES — ${commercial.length} node${commercial.length === 1 ? '' : 's'}, outside the authority calculation`,
  )
  for (const r of commercial) {
    const n = graph.byId.get(r.id)
    console.log(`  · ${r.title} — ${n?.in_degree ?? 0} depend on it`)
  }
  console.log(
    worst < 1e-12
      ? '  ✓ official scores identical with and without them — the toggle reshuffles nothing'
      : `  ✗ official scores DRIFT by up to ${worst.toExponential(2)} (worst: ${worstId})`,
  )
  if (!(worst < 1e-12)) invariantFailures++
  if (notSinks.length) {
    console.log(
      `  ! not a sink: ${notSinks.map((r) => r.id).join(', ')} — check the exclusion still holds`,
    )
  }
  console.log()
}

/**
 * The terminus invariant.
 *
 * Identical in shape to the commercial one and asserted for the same reason: a
 * terminus is a sink by construction — nothing published sits behind it — and a
 * sink accruing rank is the sink-leak bug. If this ever drifts, the ranking has
 * started to depend on how many unpublishable inputs we happened to write down,
 * which is a fact about our reading and not about the world.
 *
 * Printed even when it holds, because a property nothing checks is a property
 * that quietly stops being true.
 */
const termini = reports.filter(isTerminus)

if (termini.length) {
  const ranked = reports.filter(isRanked)
  const rankedIds = new Set(ranked.map((r) => r.id))
  const withoutTermini = buildGraph(
    ranked,
    dependencies.filter(
      (d) => rankedIds.has(d.source_report_id) && rankedIds.has(d.target_report_id),
    ),
  )

  let worst = 0
  let worstId = ''
  for (const n of withoutTermini.nodes) {
    const drift = Math.abs(n.authority - (graph.byId.get(n.id)?.authority ?? 0))
    if (drift > worst) {
      worst = drift
      worstId = n.id
    }
  }

  const byReason = new Map<string, number>()
  for (const r of termini) {
    const k = r.terminal_reason ?? '?'
    byReason.set(k, (byReason.get(k) ?? 0) + 1)
  }

  console.log(
    `TERMINI — ${termini.length} node${termini.length === 1 ? '' : 's'} where a documented chain stops, outside the authority calculation`,
  )
  for (const r of termini) {
    const n = graph.byId.get(r.id)
    console.log(
      `  · ${r.title} — ${r.terminal_reason}, ${n?.in_degree ?? 0} depend on it`,
    )
  }
  console.log(
    `  ${[...byReason].map(([k, v]) => `${v} ${k}`).join(', ')}`,
  )
  console.log(
    worst < 1e-12
      ? '  ✓ ranked scores identical with and without them — a terminus accrues no rank'
      : `  ✗ ranked scores DRIFT by up to ${worst.toExponential(2)} (worst: ${worstId})`,
  )
  if (!(worst < 1e-12)) invariantFailures++
  console.log()
}

/**
 * The implied-edge layer is RETIRED (2026-08-12, Thomas, round-3 review Q12).
 *
 * The invariant that used to be asserted here — scores identical with and
 * without implied edges — is now vacuous by construction: `validate()` errors
 * on any dependency carrying `evidence: 'implied'`, so none can exist past a
 * green validator. The fourteen that existed at retirement are preserved as
 * `_dropped` notes in `research/retired-implied-edges.json`, each with its
 * full original basis. A belief that finds its document gets minted as an
 * ordinary edge; a belief that does not stays a note.
 */
const implied = dependencies.filter((d) => !isDocumented(d))
if (implied.length) {
  // validate() has already reported each of these as an error above; this is
  // just the section headline so the count cannot pass unnoticed.
  console.log(`IMPLIED EDGES — ${implied.length} present despite the 2026-08-12 retirement (errors above)`)
  console.log()
}

/**
 * The `_dropped` block, read rather than written.
 *
 * Three things this catches, all of which had already happened:
 *   - a note whose edge now exists, which is how BACKLOG.md and V0.7 came to
 *     recommend researching the Survey of Household Spending edge twice after it
 *     had been built;
 *   - a note asserting an edge is unsupportable while that edge sits in the graph
 *     marked documented, which the corpus asserted both ways for three sessions;
 *   - research leads filed indistinguishably from settled negatives.
 */
const droppedByReason = new Map<string, number>()
for (const n of droppedNotes) {
  droppedByReason.set(n.reason, (droppedByReason.get(n.reason) ?? 0) + 1)
}
const leads = droppedNotes.filter((n) => DROPPED_LEAD_REASONS.includes(n.reason))
// A reason outside the union is not a category, it is a typo that this script
// was until 2026-08-09 (EU/G.73.md) happy to tally and print as though it were.
const unknownReasons = droppedNotes.filter((n) => !DROPPED_REASONS.includes(n.reason))
// `resolved` joins `caveat` here for the same reason (added 2026-08-09,
// EU/G.73.md): both name an edge that is *supposed* to be in the graph, so the
// live edge is the point, not a contradiction. See DroppedReason in types.ts.
const EDGE_ANNOTATING_REASONS = ['caveat', 'resolved']
const contradictions = droppedNotes.filter(
  (n) =>
    !EDGE_ANNOTATING_REASONS.includes(n.reason) &&
    n.source !== null &&
    n.target !== null &&
    dependencies.some(
      (d) => d.source_report_id === n.source && d.target_report_id === n.target,
    ),
)

// The mirror-image rule for caveats: a caveat annotates a minted edge, so the
// edge it names must exist (and the endpoints must not be null — that was the
// pre-2026-08-07 workaround this reason exists to retire). `resolved` carries
// the identical obligation: it claims an edge was wired, and an unwired claim
// is a false one.
const danglingCaveats = droppedNotes.filter(
  (n) =>
    EDGE_ANNOTATING_REASONS.includes(n.reason) &&
    (n.source === null ||
      n.target === null ||
      !dependencies.some(
        (d) => d.source_report_id === n.source && d.target_report_id === n.target,
      )),
)

console.log(`DROPPED — ${droppedNotes.length} dependencies looked for and not taken`)
for (const [reason, count] of [...droppedByReason].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(3)}  ${reason}`)
}
console.log(
  unknownReasons.length === 0
    ? '  ✓ every reason is a DroppedReason'
    : `  ✗ ${unknownReasons.length} note(s) carry a reason that is not a DroppedReason:`,
)
for (const u of unknownReasons) console.log(`      "${u.reason}" — ${u.edge}`)
if (unknownReasons.length) invariantFailures++
console.log(
  contradictions.length === 0
    ? '  ✓ no note describes an edge that now exists'
    : `  ✗ ${contradictions.length} note(s) describe an edge that IS in the graph — resolve or delete:`,
)
for (const c of contradictions) console.log(`      ${c.source} -> ${c.target} (${c.reason})`)
if (contradictions.length) invariantFailures++
console.log(
  danglingCaveats.length === 0
    ? '  ✓ every caveat and resolved note names an edge that exists'
    : `  ✗ ${danglingCaveats.length} caveat/resolved note(s) with null endpoints or naming a missing edge:`,
)
for (const c of danglingCaveats) console.log(`      ${c.source} -> ${c.target}`)
if (danglingCaveats.length) invariantFailures++
console.log(
  `  ${leads.length} are research leads rather than answers — evidence described as existing, node or pass missing`,
)
console.log()

/**
 * Relations — documented relationships that are not dependencies.
 *
 * The invariant worth asserting here is a negative one: relations must not be
 * able to move the ranking. That is guaranteed structurally rather than by
 * convention, because `buildGraph` takes `(reports, dependencies)` and there is
 * no overload that accepts relations. The check below is therefore a *type-level*
 * guarantee restated as prose, plus the two things that can actually go wrong in
 * the data — a relation missing its evidence, and a relation whose ends do not
 * both exist as nodes.
 */
console.log(`RELATIONS — ${relations.length} documented, non-dependency, unweighted`)
if (relations.length) {
  const byType = new Map<string, number>()
  for (const r of relations) {
    byType.set(r.relation_type, (byType.get(r.relation_type) ?? 0) + 1)
  }
  for (const [type, count] of [...byType].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(3)}  ${type}`)
  }
  for (const r of relations) {
    console.log(`      ${r.source_report_id} -[${r.relation_type}]-> ${r.target_report_id}`)
  }
}
// The sixth closed union, checked here rather than in validate() because
// relations never reach buildGraph and validate()'s signature is
// (reports, dependencies) — see RELATION_TYPES in types.ts. Added 2026-08-09
// (EU/G.74.md); scanned clean, guarded anyway.
const unknownRelationTypes = relations.filter(
  (r) => !RELATION_TYPES.includes(r.relation_type),
)
console.log(
  unknownRelationTypes.length === 0
    ? '  ✓ every relation_type is a RelationType'
    : `  ✗ ${unknownRelationTypes.length} relation(s) carry a relation_type that is not a RelationType:`,
)
for (const r of unknownRelationTypes) {
  console.log(`      "${r.relation_type}" — ${r.source_report_id} -> ${r.target_report_id}`)
}
if (unknownRelationTypes.length) invariantFailures++
const unevidencedRelations = relations.filter((r) => !r.evidence_url || !r.basis)
console.log(
  unevidencedRelations.length === 0
    ? '  ✓ every relation carries a basis and an evidence_url — required, unlike a dependency'
    : `  ✗ ${unevidencedRelations.length} relation(s) missing basis or evidence_url:`,
)
if (unevidencedRelations.length) invariantFailures++
for (const r of unevidencedRelations) {
  console.log(`      ${r.source_report_id} -[${r.relation_type}]-> ${r.target_report_id}`)
}
/**
 * DUPLICATE-SHAPED NODES — same title, same publisher, same country.
 *
 * Added 2026-08-31 (audit finding D6). PLAYBOOK §7's ruling is "flag, don't
 * silently merge", and until now the flagging was done by whichever agent
 * happened to notice — HANDOFF listed three pairs while two more identical
 * pairs (br-ibge-ipca / br-ipca, the two Rosstat yearbooks) sat unflagged.
 * Printed, never failed: a merge is Thomas's ruling, not the validator's.
 *
 * Unicode-aware on purpose: a naive `[^a-z0-9]` strip collapses every
 * Cyrillic title to the empty string and invents duplicates out of nothing.
 */
const normTitle = (t: string) =>
  [...t.normalize('NFKD')].filter((c) => /[\p{L}\p{N}]/u.test(c)).join('').toLowerCase()
const degreeById = new Map<string, number>()
for (const d of dependencies) {
  degreeById.set(d.source_report_id, (degreeById.get(d.source_report_id) ?? 0) + 1)
  degreeById.set(d.target_report_id, (degreeById.get(d.target_report_id) ?? 0) + 1)
}
const shapeGroups = new Map<string, typeof reports>()
for (const r of reports) {
  const key = `${normTitle(r.title)}|${normTitle(r.publisher ?? '')}|${r.country}`
  const g = shapeGroups.get(key)
  if (g) g.push(r)
  else shapeGroups.set(key, [r])
}
const duplicateShaped = [...shapeGroups.values()].filter((g) => g.length > 1)
console.log(`DUPLICATE-SHAPED NODES — ${duplicateShaped.length} group(s) share title, publisher and country`)
for (const g of duplicateShaped) {
  console.log(
    `  ? ${g.map((r) => `${r.id} (${degreeById.get(r.id) ?? 0} edges)`).join('  vs  ')} — "${g[0].title}"`,
  )
}
console.log(
  duplicateShaped.length === 0
    ? '  ✓ none'
    : '  (flagged for a ruling — PLAYBOOK §7 "flag, don\'t silently merge"; never auto-merged)',
)
console.log()

/**
 * PUBLISHERS — a node is a release, so its publisher is a body, not a
 * derivation note. Added 2026-08-31 (audit finding D7, ruling 3-A): 62
 * nodes whose publisher read "Derived from UNICEF and education monitoring
 * sources" / "WHO / national sources" were retired that day and 166 lazy
 * "X / related" strings rewritten; this keeps the class from growing back.
 * Printed, never failed — a hedged publisher on a real release is a field
 * to fix, not a build to break.
 */
const derivationPublisher = /^derived from|compilations|-aligned|\/ national sources|monitoring sources|\/ related|related$|related \//i
const derivedPublishers = reports.filter((r) => derivationPublisher.test(r.publisher ?? ''))
console.log(`PUBLISHERS — ${reports.length} nodes`)
console.log(
  derivedPublishers.length === 0
    ? '  ✓ no publisher reads as a derivation note ("Derived from …", "X / related")'
    : `  ! ${derivedPublishers.length} publisher(s) read as a derivation note, not a body — a topic is not a release (D7 ruling 3-A: retire or rename):`,
)
for (const r of derivedPublishers.slice(0, 20)) console.log(`      ${r.id} — "${r.publisher}"`)
console.log()

/**
 * EVIDENCE — the headline rule, counted.
 *
 * Added 2026-08-31 after an independent audit (finding D2) showed the
 * evidence standard was enforced in code for relations only. `validate()` now
 * warns per edge (see the D2 comment in graph.ts); this block is the number
 * to watch. Both counts are the promotion gate: when they read 0, flip the
 * two warnings in graph.ts to errors and delete this sentence.
 *
 * "quote in basis" is a cheap proxy for "the research was done and the
 * citation was lost in transcription" — those are the cheapest edges in the
 * corpus to repair, so they are counted separately.
 */
const documentedDeps = dependencies.filter(isDocumented)
const noUrl = documentedDeps.filter((d) => !d.evidence_url)
const bareUrl = documentedDeps.filter((d) => d.evidence_url && isBareHost(d.evidence_url))
const hasQuote = (b: string | undefined) => /["“”«»『「]/.test(b ?? '')
const noUrlWithQuote = noUrl.filter((d) => hasQuote(d.basis))
const bareUrlNoQuote = bareUrl.filter((d) => !hasQuote(d.basis))
const bareHosts = new Map<string, number>()
for (const d of bareUrl) {
  const h = d.evidence_url ?? ''
  bareHosts.set(h, (bareHosts.get(h) ?? 0) + 1)
}
console.log(`EVIDENCE — ${documentedDeps.length} documented dependencies, checked against the rule that made them`)
console.log(
  noUrl.length === 0
    ? '  ✓ every documented dependency cites an evidence_url'
    : `  ! ${noUrl.length} cite no evidence_url at all (${noUrlWithQuote.length} of them carry a quote in basis — citation lost, recoverable)`,
)
console.log(
  bareUrl.length === 0
    ? '  ✓ no dependency cites a bare homepage as its evidence'
    : `  ! ${bareUrl.length} cite a bare homepage (${bareUrlNoQuote.length} of them with no quote either — assertion only)`,
)
for (const [h, n] of [...bareHosts].sort((a, b) => b[1] - a[1]).slice(0, 8)) {
  console.log(`      ${String(n).padStart(3)}  ${h}`)
}
// Second audit, F-02 (2026-08-31): the path-bearing sibling of the bare
// homepage — publications indexes, topic shells, Rosstat folder listings.
// Same gate as the two counts above.
const indexUrl = documentedDeps.filter(
  (d) => d.evidence_url && !isBareHost(d.evidence_url) && isIndexPage(d.evidence_url),
)
const indexUrls = new Map<string, number>()
for (const d of indexUrl) {
  const h = d.evidence_url ?? ''
  indexUrls.set(h, (indexUrls.get(h) ?? 0) + 1)
}
console.log(
  indexUrl.length === 0
    ? '  ✓ no dependency cites an index/listing page as its evidence'
    : `  ! ${indexUrl.length} cite an index/listing page (a publications index, topic shell or folder listing — names both artefacts at best)`,
)
for (const [h, n] of [...indexUrls].sort((a, b) => b[1] - a[1]).slice(0, 8)) {
  console.log(`      ${String(n).padStart(3)}  ${h}`)
}
// Reuse is its own tell (F-02): one URL standing behind dozens of edges is
// either a regulation that genuinely names them all, or an index page being
// used as a rubber stamp. Informational — a reviewer decides which.
const urlReuse = new Map<string, number>()
for (const d of documentedDeps) {
  if (!d.evidence_url) continue
  urlReuse.set(d.evidence_url, (urlReuse.get(d.evidence_url) ?? 0) + 1)
}
const reused = [...urlReuse].filter(([, n]) => n >= 10).sort((a, b) => b[1] - a[1])
if (reused.length) {
  console.log(`  · ${reused.length} evidence URL(s) stand behind 10+ edges each — check each is a document that names them all, not an index:`)
  for (const [u, n] of reused.slice(0, 12)) console.log(`      ${String(n).padStart(3)}  ${u}`)
}
console.log(
  '  (warnings, not errors, until all three read 0 — then promote them in graph.ts validate())',
)
console.log()

if (loadIssues.danglingRelations.length) {
  // Not necessarily an error. The corpus has more documented `audits` instances
  // than auditor nodes, and this is where an over-eager conversion shows up.
  console.log('  ! relations dropped because one end is not a node:')
  for (const r of loadIssues.danglingRelations) console.log(`      ${r}`)
}
if (loadIssues.duplicateRelations.length) {
  console.log('  ! exact duplicate relations, dropped:')
  for (const r of loadIssues.duplicateRelations) console.log(`      ${r}`)
}
/**
 * Domains — the inventory, not the rule.
 *
 * The rule itself lives in `validate()` in graph.ts alongside the other closed
 * unions, where a bare unknown tag is an error and a `proposed:`-prefixed one is
 * a warning. What is missing there is *visibility*: a warning per node tells you
 * a hundred times that something is unapproved and never once tells you what the
 * vocabulary actually looks like. This block is that view — how many tags are
 * approved, how many are waiting, which are used enough to deserve promoting,
 * and which reports carry no tag at all and so cannot be reached by the domain
 * filter at all.
 *
 * Added 2026-08-18, when the Grok import promoted 18 tags in one pass and the
 * question "which of the 62 proposed ones have earned a slot" turned out to have
 * no answer anywhere in the tooling.
 */
const PROPOSED_PREFIX = 'proposed:'
const proposedDomains = new Map<string, number>()
for (const r of reports) {
  for (const d of r.domains ?? []) {
    if (String(d).startsWith(PROPOSED_PREFIX)) {
      proposedDomains.set(String(d), (proposedDomains.get(String(d)) ?? 0) + 1)
    }
  }
}
const untagged = reports.filter((r) => !r.domains || r.domains.length === 0)

console.log(`DOMAINS — ${DOMAINS.length} approved, ${proposedDomains.size} proposed`)
console.log(
  untagged.length === 0
    ? '  ✓ every report carries at least one domain tag'
    : `  ! ${untagged.length} report(s) carry no domain tag at all — unreachable by the domain filter:`,
)
for (const u of untagged) console.log(`      ${u.id}`)
if (proposedDomains.size) {
  console.log(`  ${proposedDomains.size} proposed tag(s) awaiting a decision, most-used first:`)
  for (const [tag, count] of [...proposedDomains].sort((a, b) => b[1] - a[1]).slice(0, 15)) {
    console.log(`      ${String(count).padStart(4)}  ${tag}`)
  }
  if (proposedDomains.size > 15) console.log(`      … and ${proposedDomains.size - 15} more`)
}
console.log()

const relationPairsAlsoEdges = relations.filter((r) =>
  dependencies.some(
    (d) =>
      d.source_report_id === r.source_report_id &&
      d.target_report_id === r.target_report_id,
  ),
)
console.log(
  `  ${relationPairsAlsoEdges.length} pair(s) carry both a dependency and a relation — legitimate, and worth seeing`,
)
for (const r of relationPairsAlsoEdges) {
  console.log(`      ${r.source_report_id} -> ${r.target_report_id}`)
}
console.log(
  '  ✓ relations never reach buildGraph — its signature is (reports, dependencies)',
)
console.log()

/**
 * The retention invariant.
 *
 * Retention became proportional to outgoing weight in V0.8, and the whole point
 * of that change is that **every report which discloses anything keeps the same
 * fraction of its own rank**, so disclosing more inputs no longer costs a report
 * authority and describing an input vaguely no longer earns any.
 *
 * Checked rather than trusted, because the property is invisible in the rendered
 * graph and the previous behaviour survived four sessions of review by looking
 * exactly like a reasonable constant. Under the old fixed retention this check
 * would have failed loudly: single-weak-edge nodes kept 66.7% while a node with
 * three documented inputs kept 30.3%.
 *
 * Recomputed here from the edge data rather than read back out of the graph, so
 * it is an independent statement about the maths and not a tautology.
 */
const outWeightById = new Map<string, number>()
for (const d of dependencies.filter(isDocumented)) {
  const src = graph.byId.get(d.source_report_id)
  const tgt = graph.byId.get(d.target_report_id)
  // Mirror the authority subgraph: commercial nodes and their edges sit outside
  // the calculation entirely, so they are outside this property too.
  if (!src || !tgt || !isOfficial(src) || !isOfficial(tgt)) continue
  const w = d.strength ?? RELATIONSHIP_WEIGHT[d.relationship_type]
  outWeightById.set(d.source_report_id, (outWeightById.get(d.source_report_id) ?? 0) + w)
}

// The property, tested behaviourally rather than re-derived: proportional
// retention means every node's retained share is independent of the absolute
// scale of its outgoing weights. So scaling each node's out-edges by an
// arbitrary per-node factor must leave every score untouched. Under the old
// fixed retention this fails immediately (the retained share depended on
// out-degree). The previous version of this check recomputed
// S*w/(S*w + w) from the edge data, which reduces algebraically to S/(S+1)
// for every w — a tautology that could never fail (found 2026-08-07).
const scaleFor = new Map<string, number>()
{
  let i = 0
  for (const r of reports) scaleFor.set(r.id, 1 + (i++ % 5))
}
const scaledDeps = dependencies.map((d) => ({
  ...d,
  strength:
    (d.strength ?? RELATIONSHIP_WEIGHT[d.relationship_type]) *
    (scaleFor.get(d.source_report_id) ?? 1),
}))
const scaledGraph = buildGraph(reports, scaledDeps)
let retainWorst = 0
let retainWorstId = ''
for (const nScaled of scaledGraph.nodes) {
  const drift = Math.abs(
    nScaled.authority - (graph.byId.get(nScaled.id)?.authority ?? 0),
  )
  if (drift > retainWorst) {
    retainWorst = drift
    retainWorstId = nScaled.id
  }
}
console.log(
  retainWorst < 1e-9
    ? `  \u2713 every one keeps exactly ${(RETAINED_FRACTION * 100).toFixed(1)}% of its own rank \u2014 scores invariant under per-node out-weight scaling (behavioural check)`
    : `  \u2717 retention is NOT proportional \u2014 per-node out-weight scaling moved scores by up to ${retainWorst.toExponential(2)} (worst: ${retainWorstId})`,
)
if (!(retainWorst < 1e-9)) invariantFailures++
console.log()

/**
 * Cadence coverage.
 *
 * The reference period is the transmission rate — when a dependent actually
 * reads its source — and it is what milestone 3's calendar will run on. Absent
 * means no document read so far states it, so this number is a research
 * backlog rather than a defect, and it is worth watching it climb.
 */
const withPeriod = dependencies.filter((d) => d.reference_period)
const changeRate = reports.filter((r) => r.changes_per_year !== undefined)

console.log('CADENCE')
console.log(
  `  transmission — ${withPeriod.length} of ${dependencies.length} edges state when the reading happens (${Math.round((withPeriod.length / dependencies.length) * 100)}%)`,
)
console.log(
  changeRate.length === 1
    ? '  change rate  — 1 node publishes more often than it moves'
    : `  change rate  — ${changeRate.length} nodes publish more often than they move`,
)

const anchors = new Map<string, number>()
for (const d of withPeriod) {
  const p = d.reference_period!
  const key =
    p.window_months === 0
      ? `point at ${p.ends ?? 'no fixed date'}`
      : `${p.window_months}mo to ${p.ends ?? 'rolling'}`
  anchors.set(key, (anchors.get(key) ?? 0) + 1)
}
console.log('  documented reference periods:')
for (const [k, n] of [...anchors].sort((a, b) => b[1] - a[1])) {
  console.log(`    ${String(n).padStart(3)}  ${k}`)
}
console.log()

// Containment. Printed rather than left in the data because the whole point of
// `part_of` is that the split it records is invisible in the ranking below —
// see the field comment in types.ts for the measurement that decided it.
const containers = [...new Set(reports.filter((r) => r.part_of).map((r) => r.part_of!))]
if (containers.length) {
  console.log('CONTAINMENT — one programme, more than one node')
  for (const id of containers) {
    const parent = graph.byId.get(id)
    if (!parent) continue
    const parts = contains(graph, id)
    const rolled = rolledUpAuthority(graph, id)
    console.log(`  ${parent.title} — ${parent.authority.toFixed(3)} on its own`)
    for (const p of parts) {
      console.log(`    contains  ${p.title} — ${p.authority.toFixed(3)}`)
    }
    console.log(`    under one masthead: ${rolled.toFixed(3)}`)
  }
  console.log(
    '  · a reading aid only — nothing here sizes a node or moves a rank\n' +
      '  · a true merge scores higher still, because rank compounds through the\n' +
      '    upstreams and a sum cannot: 0.841 merged against 0.731 summed',
  )
  console.log()
}

const byAuthority = [...graph.nodes].sort((a, b) => b.authority - a.authority)
const byInDegree = [...graph.nodes].sort((a, b) => b.in_degree - a.in_degree)

console.log('RANKING — weighted authority (drives node size) vs raw in-degree')
console.log(
  '  ' +
    'weighted'.padEnd(34) +
    'auth'.padStart(6) +
    '   ' +
    'raw in-degree'.padEnd(34) +
    'in',
)
console.log('  ' + '-'.repeat(83))
for (let i = 0; i < graph.nodes.length; i++) {
  const a = byAuthority[i]
  const b = byInDegree[i]
  console.log(
    '  ' +
      `${i + 1}. ${a.title}`.slice(0, 33).padEnd(34) +
      a.authority.toFixed(3).padStart(6) +
      '   ' +
      `${i + 1}. ${b.title}`.slice(0, 33).padEnd(34) +
      String(b.in_degree),
  )
}

// Gated to nodes above an authority floor since 2026-08-31 (second
// independent audit, F-14): at 3,300+ nodes the ungated list named ~3,300 of
// them, because thousands of near-zero authorities tie and their rank order
// is arbitrary — a check that flags everything flags nothing. The floor keeps
// the list to the nodes whose size a reader can actually see; the number
// suppressed is printed so the gate itself stays visible.
const DISAGREEMENT_AUTHORITY_FLOOR = 0.05
const wRankOf = new Map(byAuthority.map((x, i) => [x.id, i]))
const dRankOf = new Map(byInDegree.map((x, i) => [x.id, i]))
const disagreeingAll = graph.nodes.filter(
  (n) => Math.abs((wRankOf.get(n.id) ?? 0) - (dRankOf.get(n.id) ?? 0)) >= 4,
)
const disagreements = disagreeingAll.filter((n) => n.authority >= DISAGREEMENT_AUTHORITY_FLOOR)

console.log()
if (disagreements.length) {
  console.log(
    `Rank disagreements of 4+ places among nodes with authority ≥ ${DISAGREEMENT_AUTHORITY_FLOOR} (inspect these edges; ${disagreeingAll.length - disagreements.length} below the floor suppressed):`,
  )
  for (const d of disagreements) {
    console.log(
      `  ? ${d.title.slice(0, 60)}  weighted #${(wRankOf.get(d.id) ?? 0) + 1} vs raw #${(dRankOf.get(d.id) ?? 0) + 1}`,
    )
  }
} else {
  console.log(
    `No large rank disagreements between weighted and raw above authority ${DISAGREEMENT_AUTHORITY_FLOOR} (${disagreeingAll.length} below the floor suppressed).`,
  )
}
console.log()

process.exit(errors.length || invariantFailures ? 1 : 0)
