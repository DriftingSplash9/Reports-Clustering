import type { Country, Dependency, Graph, JurisdictionLevel, ScoredReport } from './types'
import { isDocumented } from './graph'
import { type ColourFamily, SCOPE_GROUPS, countryLabelFor, familyOf } from './palette'

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

/**
 * The longer form, for the orb caption, the tier-button tooltip and the
 * onboarding card.
 *
 * Tier 4 used to read "the whole corpus". It is not: a tier is one of two
 * orthogonal disclosure levels, and with no countries opened tier 4 shows
 * ~12% of the reports while the counter beside it says so ("419 of 3448
 * reports shown"). A caption promising everything over a counter saying
 * one-eighth is the kind of mismatch the evidence standard exists to
 * avoid, applied to the UI (audit 2026-08-30, L6). "Every level of
 * government" is what tier 4 actually guarantees.
 */
export const TIER_DESCRIPTION: readonly string[] = [
  'International, supranational and commercial',
  'plus every national report',
  'plus states and provinces',
  'plus municipalities — every level of government',
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

/** True only for a *family* orb — the tier-not-open-at-all fold. */
export function isFamilyOrbId(id: string): boolean {
  return id.startsWith('orb:')
}

/**
 * Stable id for one country's "tier is open, but this country hasn't been
 * individually expanded" orb — see the note on `COUNTRY_FOLD_FROM_TIER`
 * below for why this exists and what it does and doesn't fold.
 */
export function countryOrbId(country: Country): string {
  return `corb:${country}`
}

/** True only for a *country* orb. */
export function isCountryOrbId(id: string): boolean {
  return id.startsWith('corb:')
}

/**
 * True for either kind of orb — the "this is a folded stand-in, not a real
 * report" check every renderer/counter actually wants. Kept as the name every
 * existing caller already used: none of them cared *which* rung folded a
 * report, only that one did.
 */
export function isOrbId(id: string): boolean {
  return isFamilyOrbId(id) || isCountryOrbId(id)
}

/** Inverse of `orbId`. Only meaningful when `isFamilyOrbId(id)` is true. */
export function familyFromOrbId(id: string): ColourFamily {
  return id.slice(4) as ColourFamily
}

/** Inverse of `countryOrbId`. Only meaningful when `isCountryOrbId(id)` is true. */
export function countryFromOrbId(id: string): Country {
  return id.slice(5) as Country
}

/**
 * Below this tier, reports never fold by country — see the note on
 * `resolveId`. Tier 1 (Global) is ~400 reports total across every family and
 * stays exactly as it always has: opened, flat, one screen's worth. It is
 * tier 2 and deeper where a single rung turns out to hold the vast majority
 * of the corpus (2,071 of 3,073 reports at tier 2 alone, spread across 139
 * countries — see the 2026-08-20 note on `resolveId`), so that is where a
 * second fold axis earns its keep.
 */
const COUNTRY_FOLD_FROM_TIER = 2

/**
 * Where a real report currently resolves to, checked in order:
 *
 * 1. Its own tier is deeper than the global drilldown — folds into its
 *    family's orb, same as always. This rung is unaffected by anything below.
 * 2. Its tier IS open (tier 2+) but its country has not been individually
 *    expanded — folds into that one country's orb.
 * 3. Otherwise: itself.
 *
 * **Added 2026-08-20, after the BRICS+/Israel/Singapore mint.** The tier
 * ladder was built and tuned against a ~728-report corpus where "Nations"
 * meant a few hundred nodes from a couple dozen countries — dense but
 * navigable. The mint took the corpus to 3,073 reports across 139 countries,
 * and "Nations" now means 2,071 individual reports appearing on screen
 * simultaneously the instant that tier opens — Thomas's "95% of nodes
 * crowded in there... a literal cluster fuck," measured and confirmed
 * against the actual corpus rather than assumed.
 *
 * This is deliberately per-*country*, not per-family: a family orb already
 * answered "how far down, globally" (Thomas, 2026-08-12: depth is a property
 * of the view, not of a country) and that reasoning still holds — nobody
 * asked to open only Alberta's municipalities while every other province
 * stays shut. But "which of the 139 countries currently in this tier do I
 * want expanded" is a different question, one the 2026-08-12 corpus never
 * posed because no family held more than a handful of countries. ASIA alone
 * now holds 14. Per-country folding is the direct fix for that, revisiting
 * (not overriding) the "no per-branch drilldown" call from that date — it
 * was correct for the corpus it was made against.
 *
 * Same asymmetry as `toggleDrilldown`: opening a country is the only thing a
 * double-click on its orb can do. There is deliberately no gesture that
 * re-folds one country back down short of a full Reset — see
 * `toggleCountryOpen`.
 */
export function resolveId(
  drilldown: Drilldown,
  report: { id: string; country: Country; jurisdiction_level: JurisdictionLevel },
  openedCountries: ReadonlySet<Country> = EMPTY_COUNTRIES,
): string {
  const tier = tierOf(report.jurisdiction_level)
  if (tier > drilldown) return orbId(familyOf(report.country))
  if (tier >= COUNTRY_FOLD_FROM_TIER && !openedCountries.has(report.country)) {
    return countryOrbId(report.country)
  }
  // **The international layer folds too, once nations are open (2026-08-31,
  // Thomas: "the international nodes choke everything to the centre and
  // they are indistinguishable").** Tier 1 is the opening view and the 200
  // INT reports ARE its content, so they stay individual there. From tier 2
  // on they are one more group among ~140 country groups, and 200 identical
  // white spheres in a knot — with ~700 spokes to every country — said
  // nothing a single "International — 200 folded reports" orb does not say
  // better. Same fold, same orb machinery, same double-click to open, same
  // Reset to re-fold; `openedCountries` carries 'INT' like any other code.
  if (report.country === 'INT' && drilldown >= COUNTRY_FOLD_FROM_TIER && !openedCountries.has('INT')) {
    return countryOrbId('INT')
  }
  return report.id
}

/** Shared empty default so callers that don't yet track per-country state (there are none left, but the signature stays optional) get today's "nothing individually opened" behaviour for free. */
const EMPTY_COUNTRIES: ReadonlySet<Country> = new Set()

/**
 * A synthetic node standing in for every currently-collapsed report in one
 * family. Extends `ScoredReport` rather than replacing it so every existing
 * consumer — `compile`/`applyFilter`, `buildFocusIndex`/`computeFocus`,
 * `colourForReport`/`inkFor`, the hover card — needs zero
 * special-casing; only code that specifically wants the membership list
 * needs to know `OrbNode` exists at all.
 */
/**
 * A Dependency as it leaves disclosure: endpoints remapped to whatever is
 * actually drawn (possibly an orb), with the real pre-disclosure endpoints
 * preserved. Declared here rather than widening `Dependency` in types.ts —
 * that interface is the DATA schema, and these two fields are renderer
 * bookkeeping that no validator should ever see.
 */
export interface DisclosedDependency extends Dependency {
  original_source_id?: string
  original_target_id?: string
}

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
  // "keyed to a hue family, not to a country" note.
  //
  // ⚠️ STALE-COMMENT SCAR, 2026-08-21: this note used to end "so this only
  // affects the flag and the rim helper's exact shade" — true when written,
  // then three later features started reading `country` off orbs (the
  // galaxy/geo-affinity layout forces, and `matchesRegionGroup` in
  // regions.ts), and trusting the old sentence is how the black-scene
  // isolate bug shipped: a membership test read the MODAL country as if it
  // were the whole orb's. If you add another reader of an orb's `country`,
  // remember it is a display-grade summary, not membership — membership
  // lives in `.members`, which `matchesRegionGroup` now checks.
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
 * A country's "tier is open, but this country hasn't been individually
 * expanded" orb — see `resolveId`'s 2026-08-20 note for why this exists.
 *
 * Simpler than `buildOrbNode` in one respect: every member shares exactly one
 * `country` by construction (that's the grouping key), so there is no mode to
 * compute. Its label is not "what the next tier would reveal" the way a
 * family orb's is — a country orb doesn't gate a tier, it gates *this
 * country's slice of whichever tiers are already open* — so the caption
 * names the current tier instead of the next one, and double-clicking it
 * always reveals everything the global drilldown already permits for this
 * country in one step, not one rung at a time.
 */
function buildCountryOrbNode(country: Country, members: ScoredReport[], drilldown: Drilldown): OrbNode {
  const name = countryLabelFor(country)
  const currentTierLabel = TIER_LABEL[Math.min(Math.max(drilldown, 1), TIER_COUNT) - 1] ?? 'More'

  // Nominal level: the shallowest tier this orb currently holds, same
  // reasoning as buildOrbNode's — it is what the colour ramp and the legend
  // filter should read this orb as.
  let shallowestTier = TIER_COUNT
  for (const m of members) shallowestTier = Math.min(shallowestTier, tierOf(m.jurisdiction_level))
  const nominalLevel: JurisdictionLevel = TIERS[Math.max(shallowestTier, 1) - 1][0]

  const domains = [...new Set(members.flatMap((m) => m.domains ?? []))]
  const authority = members.reduce((max, m) => Math.max(max, m.authority), 0)
  const size_score = members.reduce((max, m) => Math.max(max, m.size_score), 0)

  return {
    id: countryOrbId(country),
    title: `${name} — ${members.length} folded report${members.length === 1 ? '' : 's'}`,
    publisher: `${members.length} folded report${members.length === 1 ? '' : 's'}`,
    country,
    jurisdiction_level: nominalLevel,
    region: name,
    description: `Folded. Double-click to open ${name}'s own reports at the ${currentTierLabel.toLowerCase()} tier and below.`,
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
export function buildDisclosedGraph(
  graph: Graph,
  drilldown: Drilldown,
  openedCountries: ReadonlySet<Country> = EMPTY_COUNTRIES,
): Graph {
  const resolve = new Map<string, string>()
  for (const n of graph.nodes) resolve.set(n.id, resolveId(drilldown, n, openedCountries))

  const membersByFamily = new Map<ColourFamily, ScoredReport[]>()
  const membersByCountry = new Map<Country, ScoredReport[]>()
  for (const n of graph.nodes) {
    const resolved = resolve.get(n.id)!
    if (isFamilyOrbId(resolved)) {
      const family = familyFromOrbId(resolved)
      const list = membersByFamily.get(family)
      if (list) list.push(n)
      else membersByFamily.set(family, [n])
    } else if (isCountryOrbId(resolved)) {
      const country = countryFromOrbId(resolved)
      const list = membersByCountry.get(country)
      if (list) list.push(n)
      else membersByCountry.set(country, [n])
    }
  }

  const orbNodes: ScoredReport[] = [
    ...[...membersByFamily.entries()].map(([family, members]) =>
      buildOrbNode(family, members, drilldown),
    ),
    ...[...membersByCountry.entries()].map(([country, members]) =>
      buildCountryOrbNode(country, members, drilldown),
    ),
  ]
  const realNodes = graph.nodes.filter((n) => !isOrbId(resolve.get(n.id)!))
  const nodes: ScoredReport[] = [...realNodes, ...orbNodes]

  const edges: Dependency[] = graph.edges
    .map((d): DisclosedDependency => {
      const carried = d as DisclosedDependency
      return {
        ...d,
        source_report_id: resolve.get(d.source_report_id) ?? d.source_report_id,
        target_report_id: resolve.get(d.target_report_id) ?? d.target_report_id,
        // The pre-disclosure endpoints, kept for the edge evidence card
        // (Phase 4 §5, 2026-08-19): a trunk line between an orb and a node
        // stands for up to 57 real dependencies, and its card has to say
        // which actual report rests on which — the resolved ids above only
        // name the orb. The `?? d.*_report_id` fallback covers the normal
        // case (this map runs on the BASE graph, whose edges carry no
        // originals); the `carried` read keeps the true originals if
        // disclosure is ever applied to an already-disclosed graph.
        original_source_id: carried.original_source_id ?? d.source_report_id,
        original_target_id: carried.original_target_id ?? d.target_report_id,
      }
    })
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
 * **A family orb steps up a tier. Anything else does nothing.** That
 * asymmetry is the fix for the single most confusing thing about the
 * previous version, which made a real node *fold* the view back — so
 * double-clicking a national report hoping to see more inside it instead
 * deleted every national report from the scene. Thomas hit this repeatedly
 * and reported the feature as *"behaving irregularly"*, which it was: the
 * same gesture meant "more" or "much less" depending on what happened to be
 * under the cursor, and nothing on screen distinguished the two cases.
 *
 * Going *back* is now the tier buttons' job, and only theirs. A control that
 * can only ever add detail cannot surprise anyone by removing it.
 *
 * **Only a family orb, not a country orb, since 2026-08-20.** A country
 * orb's double-click means something different — see `toggleCountryOpen` —
 * and must not also advance the global tier, or opening one country would
 * silently dump every OTHER country's next tier onto the screen too.
 */
export function toggleDrilldown(current: Drilldown, id: string): Drilldown {
  return isFamilyOrbId(id) ? Math.min(current + 1, TIER_COUNT) : current
}

/**
 * Double-click on `id`, for the per-country fold. Returns the next set of
 * opened countries; does not mutate. Companion to `toggleDrilldown`, same
 * contract: a country orb reveals that one country's currently-permitted
 * reports, anything else does nothing, and there is no GESTURE on the graph
 * itself that folds a country back — only a full Reset did, until
 * `foldCountry` below (2026-08-25, HANDOFF item 8).
 */
export function toggleCountryOpen(
  current: ReadonlySet<Country>,
  id: string,
): ReadonlySet<Country> {
  if (!isCountryOrbId(id)) return current
  const country = countryFromOrbId(id)
  if (current.has(country)) return current
  const next = new Set(current)
  next.add(country)
  return next
}

/**
 * Fold ONE country back — the opened-countries pill's per-row action
 * (2026-08-25, HANDOFF item 8: "currently only a full Reset re-folds an
 * opened country"). Returns the next set; does not mutate.
 *
 * Deliberately NOT wired to any double-click/raycast gesture — the comment
 * on `toggleDrilldown` and `toggleCountryOpen` above still holds for the
 * graph itself: a gesture that can only ever add detail cannot surprise
 * anyone by removing it, which is exactly the bug ("behaving irregularly")
 * that killed the old real-node-folds-the-view design. A named row in a
 * list the user opened on purpose, next to an explicit "Fold" button, is a
 * different kind of control — nothing on the CANVAS changes meaning, so
 * this doesn't reintroduce that ambiguity. Reset's unconditional full-clear
 * behaviour (`App.tsx`'s `handleReset`) is unchanged; this just adds a
 * narrower option next to it.
 */
export function foldCountry(
  current: ReadonlySet<Country>,
  country: Country,
): ReadonlySet<Country> {
  if (!current.has(country)) return current
  const next = new Set(current)
  next.delete(country)
  return next
}

/**
 * Which nodes carry a standing label in the 3D scene, keyed to a priority
 * (2026-08-31 — see LABEL_SPAN_GATE in InfluenceGraph.tsx for the why). A
 * node's edges reaching `gate` or more DIFFERENT countries is what makes it
 * a standard rather than somebody's release. Computed on the BASE graph,
 * never a disclosed one: folding replaces a hundred countries with a
 * handful of orbs and would shrink every span to the number of families.
 * The priority is the span itself, so the renderer's overlap pass can keep
 * SNA 2008 over a regional bulletin when two names collide on screen.
 */
export function standingLabels(graph: Graph, gate = 10): Map<string, number> {
  const span = new Map<string, Set<Country>>()
  for (const e of graph.edges) {
    for (const [self, other] of [
      [e.source_report_id, e.target_report_id],
      [e.target_report_id, e.source_report_id],
    ] as const) {
      const c = graph.byId.get(other)?.country
      if (!c) continue
      const seen = span.get(self)
      if (seen) seen.add(c)
      else span.set(self, new Set([c]))
    }
  }
  const out = new Map<string, number>()
  for (const [id, s] of span) if (s.size >= gate) out.set(id, s.size)
  return out
}
