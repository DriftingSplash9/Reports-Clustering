import type { Graph } from './types'
import type { VisibleSet } from './filter'

/**
 * Click-to-focus: which nodes and edges stay lit when a report is selected.
 *
 * Two cones, computed independently so they can be shown separately:
 *
 *   built from  — everything the selected report ultimately rests on, walking
 *                 the data edges forwards (source depends on target).
 *   feeds into  — everything ultimately built on it, walking them backwards.
 *
 * Both are transitive, not one hop. The question worth asking is "what does
 * this rest on, all the way down" — one hop answers a shallower question, and
 * as the graph grows the full cone becomes a smaller fraction of it, not a
 * larger one. Looking at a municipality in a graph of a thousand nodes should
 * light a readable handful.
 *
 * Cycle-safe: the data is close to acyclic but nothing enforces that, and a
 * mutual-reference pair would otherwise hang the walk. A node reached in both
 * directions appears in both sets, which is correct — it is genuinely both.
 */

/** Stable key for an edge, matching the data model's direction. */
export function edgeKey(sourceId: string, targetId: string): string {
  return `${sourceId}->${targetId}`
}

/** Adjacency built once per graph, so selection changes stay cheap. */
export interface FocusIndex {
  /** id → ids it depends on (the reports it is built from). */
  builtFrom: Map<string, string[]>
  /** id → ids that depend on it. */
  feedsInto: Map<string, string[]>
}

/**
 * Adjacency for the graph as currently filtered.
 *
 * `visible` being null means no filter and the whole graph. When there is one,
 * the walk runs over the visible subgraph only — a cone has to answer the
 * question the user is actually looking at. With commercial sources hidden,
 * "what does this rest on" must mean "among official releases"; a cone that
 * quietly routed through a node that is not on screen would report a chain the
 * picture contradicts, and the user would have no way to see the discrepancy.
 *
 * Cheap enough to rebuild whenever the filter changes at this scale.
 */
export function buildFocusIndex(
  graph: Graph,
  visible: VisibleSet | null = null,
): FocusIndex {
  const builtFrom = new Map<string, string[]>()
  const feedsInto = new Map<string, string[]>()
  for (const n of graph.nodes) {
    if (visible && !visible.nodes.has(n.id)) continue
    builtFrom.set(n.id, [])
    feedsInto.set(n.id, [])
  }
  for (const e of graph.edges) {
    if (visible && !visible.edges.has(edgeKey(e.source_report_id, e.target_report_id))) {
      continue
    }
    builtFrom.get(e.source_report_id)?.push(e.target_report_id)
    feedsInto.get(e.target_report_id)?.push(e.source_report_id)
  }
  return { builtFrom, feedsInto }
}

export interface Focus {
  selectedId: string
  /** Everything the selection rests on, transitively. Excludes the selection. */
  builtFrom: Set<string>
  /** Everything resting on the selection, transitively. Excludes the selection. */
  feedsInto: Set<string>
  /** Selection plus whichever cones are switched on. What stays lit. */
  nodes: Set<string>
  /** Edges walked while building `nodes`, keyed by `edgeKey`. */
  edges: Set<string>
}

/**
 * Walk one direction from one or more starting ids, collecting nodes and the
 * edges used to reach them.
 *
 * `orient` maps a step to the edge's direction *in the data model*, which is
 * always dependent → depended-upon regardless of which way we are walking.
 * Getting this backwards would light the right nodes and the wrong edges.
 *
 * Multi-source generalisation (2026-08-20, for `computeGroupFocus` below):
 * seeding `seen` with every start id up front, before the walk begins, means
 * an edge directly between two seeds still gets collected — `seen.has(next)`
 * only skips re-queuing an already-visited node, never the `edges.add` call
 * above it — so "isolate this whole region" naturally includes the edges
 * *within* the region as well as the ones reaching out of it, with no special
 * case. A single-id walk is just this with one seed, which is exactly why
 * `computeFocus` below still reads as unchanged.
 */
/**
 * `maxHops` (2026-08-20, for `computeNeighbourhoodFocus` below): when set,
 * a node discovered at exactly `maxHops` steps from a seed is still added to
 * `nodes` (and the edge that reached it is still added to `edges`) — it is
 * IN the neighbourhood — but its own outgoing edges are never walked, so
 * nothing at `maxHops + 1` is reached. `undefined` (the default, what
 * `computeFocus`/`computeGroupFocus` both still pass) means no limit at all,
 * the original unbounded transitive walk. A lateral edge directly between
 * two nodes that both happen to sit exactly at the depth limit is not
 * collected, since neither end is ever expanded — an accepted gap, not an
 * oversight: catching it would mean walking one hop past the stated limit
 * just to look for edges back inside it, and "within N hops" is already a
 * looser promise than "every edge among what's on screen" (that promise is
 * what `applyFilter`'s both-endpoints-visible rule is for, elsewhere).
 */
function walk(
  startIds: Iterable<string>,
  adjacency: Map<string, string[]>,
  orient: (from: string, to: string) => string,
  maxHops?: number,
): { nodes: Set<string>; edges: Set<string> } {
  const nodes = new Set<string>()
  const edges = new Set<string>()
  const queue: Array<[string, number]> = [...startIds].map((id) => [id, 0])
  const seen = new Set<string>(queue.map(([id]) => id))

  while (queue.length) {
    const [current, depth] = queue.shift() as [string, number]
    if (maxHops !== undefined && depth >= maxHops) continue
    for (const next of adjacency.get(current) ?? []) {
      edges.add(orient(current, next))
      if (seen.has(next)) continue
      seen.add(next)
      nodes.add(next)
      queue.push([next, depth + 1])
    }
  }

  return { nodes, edges }
}

/**
 * Compute the focus for a selection.
 *
 * With both cones off, only the selected node stays lit — deliberately kept as
 * a usable state rather than treated as an error. It answers "where is this
 * one thing" in a crowded scene.
 */
export function computeFocus(
  index: FocusIndex,
  selectedId: string,
  show: { builtFrom: boolean; feedsInto: boolean },
): Focus {
  const up = walk([selectedId], index.builtFrom, (from, to) => edgeKey(from, to))
  const down = walk([selectedId], index.feedsInto, (from, to) => edgeKey(to, from))

  const nodes = new Set<string>([selectedId])
  const edges = new Set<string>()

  if (show.builtFrom) {
    for (const id of up.nodes) nodes.add(id)
    for (const k of up.edges) edges.add(k)
  }
  if (show.feedsInto) {
    for (const id of down.nodes) nodes.add(id)
    for (const k of down.edges) edges.add(k)
  }

  return {
    selectedId,
    builtFrom: up.nodes,
    feedsInto: down.nodes,
    nodes,
    edges,
  }
}

/**
 * Item 8 of the 2026-08-20 todo list — "show this node and everything
 * within N hops." Thomas's own framing: filters today are by country and
 * subject only, and this attacks the density problem more directly and
 * more cheaply than fly-through navigation would.
 *
 * Same shape as `computeFocus`, and reuses the same `Focus` interface
 * outright rather than a bespoke one — a bounded cone answers the same
 * "what does this rest on / what rests on this" question, just with a
 * nearer horizon, so the two are interchangeable everywhere a `Focus` is
 * consumed (`App.tsx`'s `visible` memo, `InfluenceGraph`'s `applyFocus`).
 * `hops = 0` means "just the selection, nothing else" — a real, useful
 * answer to "where is this one thing", not an error case, matching the
 * existing "both cones off" behaviour of `computeFocus` at hops = Infinity.
 */
export function computeNeighbourhoodFocus(
  index: FocusIndex,
  selectedId: string,
  hops: number,
  show: { builtFrom: boolean; feedsInto: boolean },
): Focus {
  const up = walk([selectedId], index.builtFrom, (from, to) => edgeKey(from, to), hops)
  const down = walk([selectedId], index.feedsInto, (from, to) => edgeKey(to, from), hops)

  const nodes = new Set<string>([selectedId])
  const edges = new Set<string>()

  if (show.builtFrom) {
    for (const id of up.nodes) nodes.add(id)
    for (const k of up.edges) edges.add(k)
  }
  if (show.feedsInto) {
    for (const id of down.nodes) nodes.add(id)
    for (const k of down.edges) edges.add(k)
  }

  return {
    selectedId,
    builtFrom: up.nodes,
    feedsInto: down.nodes,
    nodes,
    edges,
  }
}

/**
 * The same computation as `computeFocus`, seeded from an entire GROUP of ids
 * at once rather than one selection — "isolate this region/bloc/publisher",
 * not "isolate this report". See `regions.ts` for what supplies `seedIds`
 * (a continent, a treaty bloc, or a stateless publisher's reports) and the
 * file-level comment on `walk` above for why edges *within* the group are
 * collected for free rather than needing their own pass.
 *
 * No `selectedId` field — a group has no single "the" selection — so this is
 * a distinct, smaller interface rather than a `Focus` with a fudged field.
 */
export interface GroupFocus {
  seedIds: Set<string>
  nodes: Set<string>
  edges: Set<string>
}

export function computeGroupFocus(
  index: FocusIndex,
  seedIds: Iterable<string>,
  show: { builtFrom: boolean; feedsInto: boolean },
): GroupFocus {
  const seeds = new Set(seedIds)
  const nodes = new Set(seeds)
  const edges = new Set<string>()

  if (show.builtFrom) {
    const up = walk(seeds, index.builtFrom, (from, to) => edgeKey(from, to))
    for (const id of up.nodes) nodes.add(id)
    for (const k of up.edges) edges.add(k)
  }
  if (show.feedsInto) {
    const down = walk(seeds, index.feedsInto, (from, to) => edgeKey(to, from))
    for (const id of down.nodes) nodes.add(id)
    for (const k of down.edges) edges.add(k)
  }

  return { seedIds: seeds, nodes, edges }
}
