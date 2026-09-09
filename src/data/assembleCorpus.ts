import type { Dependency, DroppedNote, Relation, Report } from '../lib/types'

/**
 * The shape of one research slice — the unit `scripts/gen-slices.ts` reads
 * off disk, one JSON file per slice. Shared between the two places a slice
 * gets turned into JS values: `nodeCorpus` reads them off disk directly
 * (Node scripts, no bundler involved) and `browserCorpus` fetches the same
 * bytes the build wrote to `public/corpus-data.json`. Neither parses this
 * shape differently — both hand the array straight to `assembleCorpus`
 * below, which is the ONLY place slices turn into a graph.
 */
/**
 * A `_dropped` note as it may actually appear on disk, before normalisation.
 *
 * `DroppedNote` is the shape the corpus is *supposed* to use and the only shape
 * anything downstream sees. This is what slices have really written, and it has
 * three variants (`PLAYBOOK-CORPUS.md` §6 records the first two):
 *
 *  - `edge` / `source` / `target` — the intended shape, 2,966 of them;
 *  - `report_id` / `candidate_target` — endpoint-free by design, 27 of them;
 *    these have no edge to name and normalise to null endpoints, which is
 *    correct and is why they must stay `reason: "note"`;
 *  - **`source_report_id` / `target_report_id` — 17 of them, first written
 *    2026-09-07 and copied by every CN round since.** This one is why this
 *    function exists.
 */
interface RawDroppedNote extends Omit<DroppedNote, 'edge' | 'source' | 'target'> {
  edge?: string
  source?: string | null
  target?: string | null
  source_report_id?: string | null
  target_report_id?: string | null
}

/**
 * Read a `_dropped` note's endpoints whichever field they were written in.
 *
 * **Why this is at the loader and not in the two checks that noticed it.**
 * Round 37 wrote a `resolved` note in the `source_report_id` shape. Round 38
 * found `npm run validate` exiting 1 on it — `danglingCaveats` reads `n.source`,
 * got `undefined`, matched no live edge and reported `undefined -> undefined`,
 * while the note itself was perfectly correct. Thomas ruled: teach the
 * validator. Fixing the two checks would have left the SAME blind spot in
 * `disclosureByReport` (`src/lib/graph.ts`), which the app calls on every
 * render and which skips a note whose `source` it cannot read — so 15 notes
 * were missing from the disclosure counts of the reports they are about, in the
 * UI, silently. One normalisation at the loader fixes the validator, the panel,
 * and whatever reads `droppedNotes` next.
 *
 * `?? null` rather than bare `??` is load-bearing: `null ?? undefined` is
 * `undefined`, and a caveat with a deliberately null endpoint must keep failing
 * the `n.source === null` test in `validate-data.ts` that exists to catch it.
 * Note the intended field WINS — the two notes carrying both shapes agree, and
 * if one ever disagreed the documented field is the one to trust.
 */
function normalizeDroppedNote(n: RawDroppedNote): DroppedNote {
  const source = n.source ?? n.source_report_id ?? null
  const target = n.target ?? n.target_report_id ?? null
  return {
    ...n,
    source,
    target,
    // The third shape carries no `edge` either, and `edge` is what the
    // unknown-reason report prints — it was printing `undefined` for these.
    edge: n.edge ?? `${source ?? '(none)'} -> ${target ?? '(none)'}`,
  }
}

export interface ResearchSlice {
  reports: Report[]
  dependencies: Dependency[]
  /**
   * Dependencies that were looked for and are not here, with the reasoning.
   * Optional because the seed set has none and a slice may legitimately drop
   * nothing. Read rather than ignored as of V0.8 — see `DroppedNote`.
   */
  _dropped?: RawDroppedNote[]
  /**
   * Documented relationships that are not dependencies — see `Relation`.
   *
   * Optional, and most slices will never have any. Deliberately a separate key
   * from `dependencies` rather than a discriminated member of it, so that no
   * future refactor can accidentally hand one to `buildGraph`.
   */
  relations?: Relation[]
}

/** What the loader had to discard while assembling. Never fails silently. */
export interface LoadIssues {
  dangling: string[]
  duplicateIds: string[]
  /**
   * Edges defined more than once. Not an error — the later definition wins and
   * is normally the better-evidenced one — but worth seeing, because a pair that
   * disagrees on `relationship_type` is changing authority and not just prose.
   */
  duplicateEdges: string[]
  orphans: string[]
  /**
   * Relations dropped because one end is not a node. Watch this number: unlike
   * `dangling`, a non-zero value here is not necessarily a typo. The corpus has
   * more documented `audits` instances than it has auditor nodes, and this is
   * where an over-eager conversion of a `_dropped` note would show up.
   */
  danglingRelations: string[]
  /** Exact `source-[type]->target` repeats. Reported, not tolerated silently. */
  duplicateRelations: string[]
  /**
   * Dependencies missing an endpoint FIELD — not naming a report that does not
   * exist, but carrying no `source_report_id` / `target_report_id` at all.
   *
   * **This is an error and `validate-data.ts` fails on it.** It is separate
   * from `dangling` because the two look identical once dropped and mean
   * opposite things: a dangling edge is research ahead of its node and is
   * normal, while this is a malformed edge that will never resolve. Found
   * 2026-09-09 (round 39), when five real edges were written with the
   * `_dropped` note's key names (`source`/`target`) instead of the
   * `Dependency` ones, were reported as five lines of `undefined->undefined`
   * under "edges pointing at reports not yet researched", and **`validate`
   * exited 0 having silently discarded all five.**
   */
  malformedEdges: string[]
  /**
   * `_dropped` notes whose endpoints arrived as `source_report_id` /
   * `target_report_id` instead of `source` / `target`, and were normalised on
   * the way in — one `"slice: a -> b"` string each.
   *
   * NOT an error, and not something to fix in the data. It is reported because
   * a silent repair would hide a habit that has already cost something (see
   * `normalizeDroppedNote` below), and because the count going UP is the signal
   * that a round is still writing the old shape.
   */
  renamedDroppedEndpoints: string[]
}

/** The fully assembled corpus — what both loaders below hand their caller. */
export interface AssembledCorpus {
  reports: Report[]
  dependencies: Dependency[]
  /**
   * Documented relationships that are not dependencies — see `Relation`.
   *
   * Never merge this into `dependencies`. Anything that consumes it must not
   * feed it to `buildGraph`; there is nothing to stop you except that the
   * signature does not accept it, which is the point.
   */
  relations: Relation[]
  loadIssues: LoadIssues
  /**
   * Every `_dropped` note across every slice, flattened.
   *
   * Exported so the reasoning stops being write-only. Two documents recommended
   * work that was already done because nothing read this block, and one note
   * contradicted a live edge for several sessions without anything noticing.
   */
  droppedNotes: DroppedNote[]
}

/**
 * Assembles the graph data from the hand-written seed set plus every research
 * slice.
 *
 * Extracted 2026-08-21 (§6 item 4) from what used to be `src/data/index.ts`'s
 * module-scope `assemble()` — this is now the ONE place the merge rules live,
 * called from two different loaders that get the raw slices two different
 * ways: `nodeCorpus.ts` reads `public/corpus-data.json` off disk (Node
 * scripts under tsx have no bundler and no browser to fetch from), and
 * `browserCorpus.ts` fetches the same file at runtime instead of importing
 * all 200+ research JSON files as ES modules — the old mechanism compiled the
 * whole 8.2MB corpus into the JS bundle as executable code, parsed on the
 * main thread at every load and re-minified by every `vite build`. See the
 * comment atop `browserCorpus.ts` for the rest of that reasoning. Nothing
 * about the merge rules below changed in this move — only where the raw
 * slices come from before they reach this function.
 *
 * Research arrives incrementally, one JSON file per slice, and slices
 * legitimately reference reports owned by slices that do not exist yet — a
 * municipal budget points at a provincial grant programme researched later.
 * So this loader tolerates dangling edges by dropping them and logging what it
 * dropped, rather than letting one unresolved reference break the render.
 */
export function assembleCorpus(
  seedReports: Report[],
  seedDependencies: Dependency[],
  slices: ResearchSlice[],
): AssembledCorpus {
  const reportById = new Map<string, Report>()
  const duplicateIds: string[] = []

  for (const r of seedReports) reportById.set(r.id, r)

  for (const slice of slices) {
    for (const r of slice.reports) {
      if (reportById.has(r.id)) {
        duplicateIds.push(r.id)
        continue // First definition wins; the seed set is authoritative.
      }
      reportById.set(r.id, r)
    }
  }

  const seen = new Set<string>()
  const dependencies: Dependency[] = []
  const dangling: string[] = []
  const malformedEdges: string[] = []
  const duplicateEdges: string[] = []

  // **Later definition wins for edges — the opposite of the rule for reports.**
  //
  // Decided in V0.8 after measuring it. The rule used to be first-wins here too,
  // by analogy with reports, and the analogy was wrong. For reports "first wins,
  // the seed set is authoritative" is a deliberate choice about curation. For
  // edges it was an accident with the wrong sign: the seed edges were written
  // first and are uniformly worse evidenced, so first-wins systematically
  // discarded the better copy.
  //
  // All six duplicates in the corpus resolved the same way — in every one, the
  // losing research copy carried an `evidence_url` and the winning seed copy did
  // not, and three of the seed copies therefore should not have existed at all by
  // this project's own evidence standard. One pair also disagreed on
  // `relationship_type` (`bea-pce -> bls-cpi`, `uses_data_from` in the seed and
  // `calculated_from` in research), so the rule was affecting authority and not
  // only metadata.
  //
  // Reversing it is close to free, which is the argument for doing it rather
  // than deferring it again: it moves 3 of 117 rank positions and leaves the top
  // four untouched. What it buys is structural — under documented-plus-
  // evidence_url only, the graph goes from three components to two and from six
  // orphaned nodes to two.
  //
  // Iterating in reverse and keeping the first hit seen is what makes the last
  // definition win, while `duplicateEdges` still reports the key exactly once
  // per superseded copy.
  const allDependencies = [...seedDependencies, ...slices.flatMap((s) => s.dependencies)]
  for (let i = allDependencies.length - 1; i >= 0; i--) {
    const d = allDependencies[i]
    const key = `${d.source_report_id}->${d.target_report_id}`
    if (seen.has(key)) {
      duplicateEdges.push(key)
      continue
    }
    // A missing endpoint FIELD is a different failure from an endpoint that
    // names a report we do not have, and lumping them together hid five real
    // edges for a whole round (round 39). Checked first because an edge with no
    // endpoints cannot be dangling — there is nothing for it to dangle from.
    if (!d.source_report_id || !d.target_report_id) {
      malformedEdges.push(
        `${d.source_report_id ?? '(missing source_report_id)'} -> ${d.target_report_id ?? '(missing target_report_id)'}`,
      )
      continue
    }
    if (!reportById.has(d.source_report_id) || !reportById.has(d.target_report_id)) {
      dangling.push(key)
      continue
    }
    seen.add(key)
    dependencies.push(d)
  }
  // Restore declaration order so the edge list does not depend on how it was
  // deduplicated. Nothing downstream should care, but a stable order keeps
  // diffs readable and keeps any future ordering bug from being ours.
  dependencies.reverse()

  // **Isolated reports are kept, as of V0.12.** They used to be dropped here,
  // on the reasoning that "a disconnected node carries no information in a
  // dependency graph and only adds clutter". That was wrong, and the cost of it
  // was specific: `fed-h15` is one of the most thoroughly researched nodes in
  // the corpus — every source it names is a reporting form, private transaction
  // data, unnamed banks or a bare agency — and V2.10 calls it the worked example
  // the whole disclosure decision was waiting for. It has never once appeared on
  // screen. Three logs described dropping it as "the evidence standard working".
  // The evidence standard working would be showing it and showing why it is
  // alone.
  //
  // An isolated node is not an absence of information. It is the statement *this
  // programme exists and nothing published names its inputs*, which is exactly
  // the kind of fact this project exists to make visible.
  //
  // Note what did NOT change: dangling edges are still dropped, above. An edge
  // pointing at an id that does not exist is a data error, not an island, and
  // tolerating those is what lets research slices arrive in any order.
  //
  // `isolated` is still reported, because it is a number worth watching — a
  // sweep that adds fifty islands has added territory in the most literal sense.
  const connected = new Set<string>()
  for (const d of dependencies) {
    connected.add(d.source_report_id)
    connected.add(d.target_report_id)
  }
  const orphans: string[] = []
  const reports: Report[] = []
  for (const r of reportById.values()) {
    reports.push(r)
    if (!connected.has(r.id)) orphans.push(r.id)
  }

  // **Relations — non-dependency relationships. See `Relation` in types.ts.**
  //
  // Assembled here rather than in `buildGraph` on purpose: `buildGraph` takes
  // `(reports, dependencies)` and relations are never passed to it, so there is
  // no path from this array to `authority`, `size_score`, degree counts or
  // position. That structural isolation is the whole reason this is a separate
  // list rather than a fifth `RelationshipType`.
  //
  // Same dangling rule as dependencies, and for the same reason: a relation
  // pointing at an id that does not exist is a data error, not an island. It is
  // a strict rule here and it bites — most of the documented `audits` instances
  // in the corpus name an auditor that has no node, and they stay in `_dropped`
  // as `no-node-yet` leads until one is researched.
  //
  // No dedup by `source->target`, unlike dependencies. A pair can legitimately
  // hold both a dependency and a relation — the Niue case is exactly that, where
  // the Auditor-General's report both *uses data from* and *audits* the same
  // financial statements — and two relations of different `relation_type` over
  // the same pair would also be meaningful. Exact duplicates are reported rather
  // than silently dropped.
  const relations: Relation[] = []
  const danglingRelations: string[] = []
  const duplicateRelations: string[] = []
  const seenRelations = new Set<string>()
  for (const slice of slices) {
    for (const rel of slice.relations ?? []) {
      const key = `${rel.source_report_id}-[${rel.relation_type}]->${rel.target_report_id}`
      if (
        !reportById.has(rel.source_report_id) ||
        !reportById.has(rel.target_report_id)
      ) {
        danglingRelations.push(key)
        continue
      }
      if (seenRelations.has(key)) {
        duplicateRelations.push(key)
        continue
      }
      seenRelations.add(key)
      relations.push(rel)
    }
  }

  // `_dropped` endpoints are normalised here and nowhere else, so every
  // consumer — the validator, the app's disclosure panel, anything added later
  // — reads one shape. See `normalizeDroppedNote` for why it is at this layer.
  const renamedDroppedEndpoints: string[] = []
  const droppedNotes: DroppedNote[] = []
  for (const s of slices) {
    for (const raw of s._dropped ?? []) {
      const n = normalizeDroppedNote(raw)
      if (raw.source === undefined && raw.source_report_id !== undefined) {
        renamedDroppedEndpoints.push(n.edge)
      } else if (raw.target === undefined && raw.target_report_id !== undefined) {
        renamedDroppedEndpoints.push(n.edge)
      }
      droppedNotes.push(n)
    }
  }

  return {
    reports,
    dependencies,
    relations,
    loadIssues: {
      dangling,
      duplicateIds,
      duplicateEdges,
      orphans,
      danglingRelations,
      duplicateRelations,
      renamedDroppedEndpoints,
      malformedEdges,
    },
    droppedNotes,
  }
}
