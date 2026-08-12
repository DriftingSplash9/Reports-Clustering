import type { Domain, Graph, ScoredReport } from './types'
import { isOfficial } from './graph'
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

/** The primitive. Everything in this file composes this. */
export type NodePredicate = (report: ScoredReport) => boolean

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
  // The evidence axis (showDocumented / showImplied) lived here until
  // 2026-08-12, when the implied-edge layer was retired outright (Thomas,
  // round-3 Q12). With every edge documented by rule, "show documented edges"
  // is just "show edges", which the View panel's Edges toggle already says.
  /**
   * Subject matter. Null for all.
   *
   * Unparked 2026-08-10 (Thomas, Q12) after being deferred twice. The field has
   * been on every node since the seed set and was read by nothing, which is the
   * exact condition that let `country` be silently wrong on nine nodes for five
   * sessions — an attribute nothing renders is an attribute nobody checks.
   *
   * **A node matches if it carries *any* selected domain, not all of them.**
   * `domains` is a list and most nodes carry two or three; requiring all would
   * make selecting two domains almost always return nothing, and the question
   * people actually ask is "show me inflation and labour", not "show me things
   * that are simultaneously both".
   *
   * Kept as its own axis rather than folded into `scopes` because they compose:
   * Canadian federal *and* inflation is a question this graph should be able to
   * answer, and one combined list could not express it.
   */
  domains: readonly Domain[] | null
}

export const NO_FILTER: FilterState = {
  showCommercial: true,
  scopes: null,
  domains: null,
}

/** True when the state would hide anything, so callers can skip the work. */
export function isFiltering(state: FilterState): boolean {
  return !state.showCommercial || state.scopes !== null || state.domains !== null
}

/** Compile the node half of the state down to a single predicate. */
export function compile(state: FilterState): NodePredicate {
  const scopes = state.scopes && new Set<string>(state.scopes)
  const domains = state.domains && new Set<string>(state.domains)

  return (r) => {
    if (!state.showCommercial && !isOfficial(r)) return false
    if (scopes && !scopes.has(scopeOf(r))) return false
    // Any, not all — see `domains` on FilterState.
    if (domains && !(r.domains ?? []).some((d) => domains.has(d))) return false
    return true
  }
}

export interface VisibleSet {
  nodes: Set<string>
  /** Keyed by edgeKey, in the data model's direction. */
  edges: Set<string>
  hiddenNodes: number
  hiddenEdges: number
}

/**
 * Resolve the predicate against the graph.
 *
 * An edge survives only if **both** endpoints do. Any other rule leaves a line
 * running off to nothing, which reads as a bug in the data rather than as a
 * filter doing its job — and the user cannot tell the difference by looking.
 * (An edge predicate used to exist here too, for the evidence axis; it retired
 * with the implied layer on 2026-08-12.)
 *
 * Nodes are *not* dropped for losing all their edges. A filter is a view, and a
 * view that silently removed a report because you hid the one edge kind that
 * reached it would be answering a question nobody asked.
 */
export function applyFilter(graph: Graph, predicate: NodePredicate): VisibleSet {
  const nodes = new Set<string>()
  for (const n of graph.nodes) if (predicate(n)) nodes.add(n.id)

  const edges = new Set<string>()
  for (const e of graph.edges) {
    if (nodes.has(e.source_report_id) && nodes.has(e.target_report_id)) {
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
