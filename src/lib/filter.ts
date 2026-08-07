import type { Dependency, Graph, ScoredReport } from './types'
import { isDocumented, isOfficial } from './graph'
import { scopeOf, type Scope } from './palette'
import { edgeKey } from './selection'

/**
 * Which nodes are drawn.
 *
 * This is a **view over the scored graph, and nothing more**. It does not
 * recompute authority, it does not re-run the layout, and it does not touch the
 * data. Turning a filter on subtracts spheres from the picture; every node that
 * remains is exactly the size and in exactly the place it was a moment ago.
 *
 * That constraint is not a convenience, it is the reason filtering is safe to
 * offer at all. A filter that reshuffled the graph would make every comparison
 * the user had just made silently wrong, and they would have no way to tell.
 *
 * The layer exists as its own file because several features need it and
 * REPORTS.md is explicit that they must share: the commercial-source toggle is
 * the first instance, and the jurisdiction (scope) filter is the second. The
 * alternative — a tenth boolean in the view panel, then an eleventh — is how
 * you end up with three subtly different notions of what "hidden" means.
 *
 * Search deliberately does *not* filter. Typing into a search box should not
 * make a hundred nodes vanish; search locates, filters hide. Both are built on
 * NodePredicate, and that shared primitive is the whole of what they have in
 * common. See search.ts.
 */

/** The primitives. Everything in this file composes these. */
export type NodePredicate = (report: ScoredReport) => boolean
export type EdgePredicate = (edge: Dependency) => boolean

/**
 * The user-facing filter state.
 *
 * Held separately from ViewSettings on purpose. View settings say how the scene
 * is drawn; this says what is in it. Merging them was the explicitly rejected
 * option.
 *
 * `null` means "no constraint on this axis", which is not the same as an empty
 * selection. An empty array means the user has deselected everything and the
 * honest response is an empty graph, not a silent reset to all.
 */
export interface FilterState {
  /**
   * Show published commercial sources. Default on — that view answers "what
   * does this rest on", and off answers "what does this rest on among official
   * releases". The difference between the two is the point: it makes a scope
   * decision inspectable instead of invisible.
   */
  showCommercial: boolean
  /**
   * Publisher scope — country and level together. Null for all.
   *
   * Was a list of levels alone, which could not express "Canadian federal but
   * not American federal" — and that turned out to be the distinction people
   * most want, because it is the one the graph exists to draw.
   */
  scopes: readonly Scope[] | null
  /**
   * Edges a document establishes. On by default — this is the graph as the
   * record supports it, and turning it off is the deliberately strange view
   * that shows only what is believed and unproven.
   */
  showDocumented: boolean
  /**
   * Edges believed on strong grounds that no document states. Off by default,
   * because the evidence standard is the project's central claim and the
   * default view has to be the one that honours it.
   *
   * Kept as a pair with `showDocumented` rather than a single three-way choice,
   * for the same reason the focus cones are a pair: two independent switches
   * give four states including both-off, and both-off is a legitimate view
   * rather than a degenerate one. It shows the nodes with no edges at all,
   * which is the fastest way to see how much of the graph is structure and how
   * much is furniture.
   */
  showImplied: boolean
}

export const NO_FILTER: FilterState = {
  showCommercial: true,
  scopes: null,
  showDocumented: true,
  showImplied: false,
}

/** True when the state would hide anything, so callers can skip the work. */
export function isFiltering(state: FilterState): boolean {
  return (
    !state.showCommercial ||
    state.scopes !== null ||
    !state.showDocumented ||
    state.showImplied
  )
}

/** Compile the node half of the state down to a single predicate. */
export function compile(state: FilterState): NodePredicate {
  const scopes = state.scopes && new Set<string>(state.scopes)

  return (r) => {
    if (!state.showCommercial && !isOfficial(r)) return false
    if (scopes && !scopes.has(scopeOf(r))) return false
    return true
  }
}

/** Compile the edge half. */
export function compileEdges(state: FilterState): EdgePredicate {
  return (e) => (isDocumented(e) ? state.showDocumented : state.showImplied)
}

export interface VisibleSet {
  nodes: Set<string>
  /** Keyed by edgeKey, in the data model's direction. */
  edges: Set<string>
  hiddenNodes: number
  hiddenEdges: number
}

/**
 * Resolve the predicates against the graph.
 *
 * An edge survives only if it passes the edge predicate **and both** endpoints
 * pass the node one. Any other rule leaves a line running off to nothing, which
 * reads as a bug in the data rather than as a filter doing its job — and the
 * user cannot tell the difference by looking.
 *
 * Nodes are *not* dropped for losing all their edges. A filter is a view, and a
 * view that silently removed a report because you hid the one edge kind that
 * reached it would be answering a question nobody asked.
 */
export function applyFilter(
  graph: Graph,
  predicate: NodePredicate,
  edgePredicate: EdgePredicate = () => true,
): VisibleSet {
  const nodes = new Set<string>()
  for (const n of graph.nodes) if (predicate(n)) nodes.add(n.id)

  const edges = new Set<string>()
  for (const e of graph.edges) {
    if (
      edgePredicate(e) &&
      nodes.has(e.source_report_id) &&
      nodes.has(e.target_report_id)
    ) {
      edges.add(edgeKey(e.source_report_id, e.target_report_id))
    }
  }

  return {
    nodes,
    edges,
    hiddenNodes: graph.nodes.length - nodes.size,
    hiddenEdges: graph.edges.length - edges.size,
  }
}

/** How many nodes each level has, for the legend. Counted before filtering. */
export function countBy<K extends string>(
  nodes: ScoredReport[],
  key: (r: ScoredReport) => K,
): Record<K, number> {
  const counts = {} as Record<K, number>
  for (const n of nodes) {
    const k = key(n)
    counts[k] = (counts[k] ?? 0) + 1
  }
  return counts
}

/**
 * Toggle one value in a nullable selection list.
 *
 * Null (no constraint) behaves as though everything were selected, so the first
 * click removes one rather than leaving one — which is what a user clicking a
 * lit legend row means by it.
 */
export function toggleIn<T>(
  current: readonly T[] | null,
  all: readonly T[],
  value: T,
): readonly T[] | null {
  const selected = current ?? all
  const next = selected.includes(value)
    ? selected.filter((v) => v !== value)
    : [...selected, value]
  // Back to "no constraint" rather than a list that happens to contain
  // everything, so isFiltering() stays honest and the toggle can reset itself.
  return next.length === all.length ? null : next
}
