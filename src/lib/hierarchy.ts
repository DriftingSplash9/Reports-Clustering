import type { Country, Dependency, Graph, JurisdictionLevel, ScoredReport } from './types'
import { isDocumented } from './graph'
import { type ColourFamily, SCOPE_GROUPS, familyOf } from './palette'

/**
 * Collapsible-orb drilldown.
 *
 * Thomas's brief, restated 2026-08-12 after the first build got it wrong:
 * as the corpus grows past the 1000-1200 node range, the answer is not
 * clustering — it is collapsing by the hierarchy the data already has, and
 * unfolding it **one global tier at a time**.
 *
 * **The model, one number for the whole world.** `Drilldown` is how many rungs
 * of the global ladder below are currently drawn as real, individual nodes.
 * Everything at a shallower tier is drawn as itself; everything at that tier or
 * deeper is folded into one orb per colour family. A double-click on any orb
 * peels off the next tier **everywhere at once** — every country, every family
 * — and a double-click on a real node folds its own tier, and everything
 * narrower, back in.
 *
 * **This is the correction that mattered.** The first version kept one depth
 * *per family*, so opening Canada opened only Canada and the EU stayed shut.
 * Thomas, seeing it live: *"when it initializes I double click the eu and only
 * the eu open up. I want to have double clicking the eu to open all national
 * level nodes... then if i double click the nation then ALL provinces and
 * states appear in the mix."* The tiers are a property of the view, not of a
 * country — depth is global, and the orbs are just the click targets that
 * happen to hold the collapsed remainder of each family.
 *
 * Per-*branch* drilldown — open Alberta's municipalities while other provinces
 * stay shut — was offered and explicitly declined the same day. Slicing by
 * anything other than depth is the left sidebar's job: *"the left side bar can
 * be used to toggle combinations of whatever a user likes... if i want to cut
 * the municipal noise out across the world I would be able to."* Depth answers
 * "how far down"; the filter answers "which of it". Keep them separate.
 *
 * **This does not touch the position rule.** `jurisdiction_level` still drives
 * nothing about where a node sits — see the comment on `JurisdictionLevel` in
 * types.ts. The ladder decides *what exists as a node*, and the existing
 * edge-only force layout decides where it goes once it does. It does now drive
 * node *shape* — see `TIER_GEOMETRY` in nodeVisuals.ts — which is a different
 * claim: what a node is, not where it belongs.
 */
export type Drilldown = number

/**
 * The four tiers, broadest first. **Cumulative** — tier N shows everything in
 * tiers 1..N.
 *
 * Thomas specified these directly on 2026-08-12, after the gesture-driven
 * five-rung version proved unworkable in practice: *"Combine - International
 * and commercial/industrial into 1 tier, in the next have all of the tier one
 * plus all nations in the data set. Tier 3 is tier 2 plus all the provinces and
 * states. Tier 4 is everything."*
 *
 * `supranational` rides in tier 1 alongside `international` and
 * `institutional`. He named the other two explicitly and did not mention it,
 * and tier 1 is the only place it can go: tiers 2, 3 and 4 are spoken for by
 * nations, states and municipalities, so anything above the nation state has to
 * be in the opening view or it would never appear at all. It also matches how
 * he described the opening screen earlier the same day — *"our first view of
 * the supranationals"*.
 *
 * Sizes as of 2026-08-12: tier 1 is 151 reports (41 international + 76
 * supranational + 34 institutional), tier 2 adds 403 nations for 554, tier 3
 * adds 110 states and provinces for 664, tier 4 adds the last 64
 * municipalities for the full 728.
 */
export const TIERS: readonly (readonly JurisdictionLevel[])[] = [
  ['international', 'supranational', 'institutional'],
  ['federal'],
  ['provincial'],
  ['municipal'],
]

/** Button captions, in tier order. */
export const TIER_LABEL: readonly string[] = [
  'Global',
  'Nations',
  'States',
  'Everything',
]

/** The longer form, for the orb caption and the onboarding card. */
export const TIER_DESCRIPTION: readonly string[] = [
  'International, supranational and commercial',
  'plus every national report',
  'plus states and provinces',
  'plus municipalities — the whole corpus',
]

export const TIER_COUNT = TIERS.length

/**
 * The tier shown on load. Tier 1 — the smallest, ~151 reports.
 *
 * `Drilldown` is now a tier *number* from 1 to `TIER_COUNT`, not a count of
 * opened rungs, so it reads the same way as the buttons the user actually
 * clicks: `drilldown === 2` means "tier 2 is showing".
 */
export const DEFAULT_DRILLDOWN: Drilldown = 1

/**
 * Which rung a level sits on. An unrecognised level resolves to the deepest
 * rung rather than throwing, on the same reasoning as `familyOf`'s unmapped-
 * country fallback: showing a node somewhere defensible beats losing it.
 */
export function tierOf(level: JurisdictionLevel): number {
  const i = TIERS.findIndex((t) => t.includes(level))
  return i === -1 ? TIERS.length : i + 1
}

/** Stable id for a family's "everything not yet peeled off" orb. */
export function orbId(family: ColourFamily): string {
  return `orb:${family}`
}

export function isOrbId(id: string): boolean {
  return id.startsWith('orb:')
}

/** Inverse of `orbId`. Only meaningful when `isOrbId(id)` is true. */
export function familyFromOrbId(id: string): ColourFamily {
  return id.slice(4) as ColourFamily
}

/**
 * Where a real report currently resolves to: itself, if its tier is open, or
 * its family's orb otherwise.
 */
export function resolveId(
  drilldown: Drilldown,
  report: { id: string; country: Country; jurisdiction_level: JurisdictionLevel },
): string {
  return tierOf(report.jurisdiction_level) <= drilldown
    ? report.id
    : orbId(familyOf(report.country))
}

/**
 * A synthetic node standing in for every currently-collapsed report in one
 * family. Extends `ScoredReport` rather than replacing it so every existing
 * consumer — `compile`/`applyFilter`, `buildFocusIndex`/`computeFocus`,
 * `colourForReport`/`rimColourFor`, the hover card — needs zero
 * special-casing; only code that specifically wants the membership list
 * needs to know `OrbNode` exists at all.
 */
export interface OrbNode extends ScoredReport {
  /** The real, currently-collapsed reports this orb stands in for. */
  members: ScoredReport[]
}

function buildOrbNode(family: ColourFamily, members: ScoredReport[], depth: number): OrbNode {
  const group = SCOPE_GROUPS.find((g) => g.country === family)
  // The tier this orb would reveal next, as a 0-based index into TIERS.
  const nextTier = Math.min(depth, TIER_COUNT - 1)
  const levelLabel = TIER_LABEL[nextTier] ?? 'More'

  // The orb's nominal level is the shallowest one it still holds — what the
  // next tier up would reveal — not the deepest. It is what the caption
  // promises and what the legend filter will match it on.
  const nominalLevel: JurisdictionLevel = TIERS[nextTier][0]

  // The literal country members disagree on has to resolve to one value for
  // `country`, since that field is singular. The mode, not the first member,
  // so an orb dominated by German nodes with one stray Portuguese one still
  // reads (and, via the flag, looks) German rather than whichever happened
  // to load first. Colour itself does not depend on this — see palette.ts's
  // "keyed to a hue family, not to a country" note — so this only affects
  // the flag and the rim helper's exact shade within the family.
  const counts = new Map<string, number>()
  for (const m of members) counts.set(m.country, (counts.get(m.country) ?? 0) + 1)
  let country: Country = members[0]?.country ?? 'INT'
  let bestCount = 0
  for (const [c, n] of counts) {
    if (n > bestCount) {
      bestCount = n
      country = c
    }
  }

  const domains = [...new Set(members.flatMap((m) => m.domains ?? []))]
  const authority = members.reduce((max, m) => Math.max(max, m.authority), 0)
  const size_score = members.reduce((max, m) => Math.max(max, m.size_score), 0)

  return {
    id: orbId(family),
    title: `${group?.label ?? family} — ${levelLabel} and below (${members.length})`,
    publisher: `${members.length} folded report${members.length === 1 ? '' : 's'}`,
    country,
    jurisdiction_level: nominalLevel,
    region: group?.label ?? family,
    description: `Folded. Use the tier buttons below, or double-click here, to bring in ${levelLabel.toLowerCase()}.`,
    last_updated: null,
    url: '',
    domains,
    in_degree: 0,
    out_degree: 0,
    authority,
    size_score,
    members,
  }
}

/**
 * The graph as currently drawn, given a drilldown state.
 *
 * **Draws every edge, remapped, no merging** — Thomas's explicit answer when
 * asked how a collapsed group's edges should be shown. An edge between two
 * reports that have both collapsed into the same orb becomes a self-loop and
 * is dropped (nothing to draw); everything else survives, redirected to
 * whichever id — real or orb — its endpoint currently resolves to. Two
 * distinct real edges that both end up running orb-to-orb are kept as two
 * separate edges rather than combined into one thicker line, honestly, so
 * the corpus's actual density is what widens the visible bundle rather than
 * a summary statistic standing in for it.
 *
 * Degree is recomputed over *this* edge set, not carried over from the
 * un-collapsed graph, for the same reason `buildGraph` recomputes it rather
 * than trusting a cached count: an orb's in/out-degree is a fact about the
 * collapsed view, and summing its members' original degrees would double
 * count every edge that runs between two members of the same orb (already
 * dropped above) as well as miscount multi-edges to nodes now sharing an id.
 * `authority`/`size_score` are the one exception — those stay corpus facts
 * (see PageRank in graph.ts) and are never recomputed here; an orb's is the
 * max of its members', so a group's sphere is never smaller than the most
 * important single thing inside it.
 */
export function buildDisclosedGraph(graph: Graph, drilldown: Drilldown): Graph {
  const resolve = new Map<string, string>()
  for (const n of graph.nodes) resolve.set(n.id, resolveId(drilldown, n))

  const membersByFamily = new Map<ColourFamily, ScoredReport[]>()
  for (const n of graph.nodes) {
    const resolved = resolve.get(n.id)!
    if (!isOrbId(resolved)) continue
    const family = familyFromOrbId(resolved)
    const list = membersByFamily.get(family)
    if (list) list.push(n)
    else membersByFamily.set(family, [n])
  }

  const orbNodes: ScoredReport[] = [...membersByFamily.entries()].map(([family, members]) =>
    buildOrbNode(family, members, drilldown),
  )
  const realNodes = graph.nodes.filter((n) => !isOrbId(resolve.get(n.id)!))
  const nodes: ScoredReport[] = [...realNodes, ...orbNodes]

  const edges: Dependency[] = graph.edges
    .map((d) => ({
      ...d,
      source_report_id: resolve.get(d.source_report_id) ?? d.source_report_id,
      target_report_id: resolve.get(d.target_report_id) ?? d.target_report_id,
    }))
    .filter((d) => d.source_report_id !== d.target_report_id)

  const inDegree = new Map<string, number>()
  const outDegree = new Map<string, number>()
  for (const n of nodes) {
    inDegree.set(n.id, 0)
    outDegree.set(n.id, 0)
  }
  for (const d of edges) {
    if (!isDocumented(d)) continue
    inDegree.set(d.target_report_id, (inDegree.get(d.target_report_id) ?? 0) + 1)
    outDegree.set(d.source_report_id, (outDegree.get(d.source_report_id) ?? 0) + 1)
  }

  const finalNodes = nodes.map((n) => ({
    ...n,
    in_degree: inDegree.get(n.id) ?? 0,
    out_degree: outDegree.get(n.id) ?? 0,
  }))

  return {
    nodes: finalNodes,
    edges,
    byId: new Map(finalNodes.map((n) => [n.id, n])),
  }
}

/**
 * Double-click on `id`. Returns the next tier; does not mutate.
 *
 * **An orb steps up a tier. A real node does nothing.** That asymmetry is the
 * fix for the single most confusing thing about the previous version, which
 * made a real node *fold* the view back — so double-clicking a national report
 * hoping to see more inside it instead deleted every national report from the
 * scene. Thomas hit this repeatedly and reported the feature as *"behaving
 * irregularly"*, which it was: the same gesture meant "more" or "much less"
 * depending on what happened to be under the cursor, and nothing on screen
 * distinguished the two cases.
 *
 * Going *back* is now the tier buttons' job, and only theirs. A control that
 * can only ever add detail cannot surprise anyone by removing it.
 */
export function toggleDrilldown(current: Drilldown, id: string): Drilldown {
  return isOrbId(id) ? Math.min(current + 1, TIER_COUNT) : current
}
