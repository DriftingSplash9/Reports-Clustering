import type { Country, Dependency, Graph, JurisdictionLevel, ScoredReport } from './types'
import { isDocumented } from './graph'
import { type ColourFamily, type Scope, SCOPE_GROUPS, SCOPE_LABEL, familyOf, scopeOf } from './palette'

/**
 * Collapsible-orb drilldown.
 *
 * Thomas's brief (2026-08-11): as the corpus grows past the 1000-1200 node
 * range he'd already flagged as the point community detection becomes worth
 * asking about again, the answer he wants is not clustering — it is
 * collapsing by the hierarchy the data already has. `SCOPE_GROUPS` in
 * palette.ts already encodes exactly that ladder for every colour family
 * (Canada: federal → provincial → municipal → institutional; the EU:
 * supranational → federal → provincial → municipal → institutional), built
 * for the legend and reused here rather than inventing a second hierarchy.
 *
 * **The model, one number per family.** `Drilldown[family]` is how many
 * rungs of that family's own ladder have been peeled off into real,
 * individual nodes. Everything at a shallower rung is drawn as itself;
 * everything at that rung or deeper is folded into one orb per family — not
 * one orb per level, one orb *total* per family, because only one "next"
 * level is ever waiting to be opened at a time. A double-click on that orb
 * peels off the next rung; a double-click on any real node folds its own
 * rung (and anything deeper) back into the orb. Absent means 0, which is
 * "everything collapsed" — the fully-collapsed default Thomas asked for.
 *
 * **This does not touch the position rule.** `jurisdiction_level` still
 * drives nothing about where a node sits — see the comment on
 * `JurisdictionLevel` in types.ts, and the "protein unfolding" framing this
 * feature was pitched under is exactly why: the ladder decides *what exists
 * as a node*, and the existing edge-only force layout decides where it goes
 * once it does. An orb is positioned by its own edges like anything else.
 */
export type Drilldown = Partial<Record<ColourFamily, number>>

/** The ladder for a family, broadest rung first. Empty for an unstaffed one. */
export function ladderFor(family: ColourFamily): Scope[] {
  return SCOPE_GROUPS.find((g) => g.country === family)?.scopes ?? []
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
 * Where a real report currently resolves to: itself, if its own rung has
 * been peeled off, or its family's orb otherwise.
 *
 * A report whose scope is not on its family's ladder at all (should not
 * happen for a report the corpus actually validates, but the ladder is a
 * second, hand-maintained list — see `ladderFor`) resolves to itself always,
 * on the same reasoning as `familyOf`'s own unmapped-country fallback:
 * losing a node from view because a lookup missed is worse than showing it
 * somewhere it was not asked to collapse.
 */
export function resolveId(
  drilldown: Drilldown,
  report: { id: string; country: Country; jurisdiction_level: JurisdictionLevel },
): string {
  const family = familyOf(report.country)
  const ladder = ladderFor(family)
  const idx = ladder.indexOf(scopeOf(report))
  const depth = drilldown[family] ?? 0
  return idx === -1 || idx < depth ? report.id : orbId(family)
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
  const ladder = ladderFor(family)
  const level = ladder[Math.min(depth, ladder.length - 1)]
  const nominalLevel = (level?.split(':')[1] ?? 'institutional') as JurisdictionLevel
  const group = SCOPE_GROUPS.find((g) => g.country === family)
  const levelLabel = (level && SCOPE_LABEL[level]) ?? nominalLevel

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
    title: `${group?.label ?? family} — ${levelLabel} (${members.length})`,
    publisher: `${members.length} collapsed report${members.length === 1 ? '' : 's'}`,
    country,
    jurisdiction_level: nominalLevel,
    region: group?.label ?? family,
    description: `Double-click to open the next level out of this group.`,
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
    buildOrbNode(family, members, drilldown[family] ?? 0),
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
 * Double-click on `id`. Returns the next drilldown state; does not mutate.
 *
 * An orb always *opens* — its family's depth increases by one rung. A real
 * node always *folds* — its own family's depth drops to that node's own rung
 * index, collapsing it and everything narrower back into the orb. Folding
 * from a broader already-open rung jumps back further than one step, which
 * matches clicking an ancestor in an ordinary expand/collapse tree: it closes
 * the whole branch under it, not just its own leaf.
 */
export function toggleDrilldown(current: Drilldown, id: string, report?: ScoredReport): Drilldown {
  if (isOrbId(id)) {
    const family = familyFromOrbId(id)
    const ladder = ladderFor(family)
    const depth = current[family] ?? 0
    return { ...current, [family]: Math.min(depth + 1, ladder.length) }
  }
  if (!report) return current
  const family = familyOf(report.country)
  const ladder = ladderFor(family)
  const idx = ladder.indexOf(scopeOf(report))
  if (idx === -1) return current
  return { ...current, [family]: idx }
}
