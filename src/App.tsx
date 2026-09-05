import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import type { EffectComposer as EffectComposerImpl } from 'postprocessing'
import { PngExport } from './components/PngExport'
import InfluenceGraph, {
  FOV,
  type FlyTo,
  type GraphBounds,
} from './components/InfluenceGraph'
import Environment from './components/Environment'
import ViewControls from './components/ViewControls'
import SearchPanel from './components/SearchPanel'
import Onboarding from './components/Onboarding'
import CalendarPanel from './components/CalendarPanel'
import { describeWindow, nextRelease } from './lib/schedule'
import CameraZoom from './components/CameraZoom'
import { PanelShell } from './components/PanelShell'
import { MenuBar, PANELS_HIDDEN, PANELS_DEFAULT, COMPACT_OPEN_NONE, type CompactPanelKey, type PanelKey, type PanelVisibility } from './components/MenuBar'
import { useCompactLayout } from './lib/useCompactLayout'
import { HelpCard } from './components/HelpCard'
import { LoadingCurtain } from './components/LoadingCurtain'
import {
  loadViews,
  persistViews,
  newViewId,
  type SavedView,
  type SavedViewStore,
} from './lib/savedViews'

/**
 * Versioned like the onboarding key: if the panel set ever changes shape in a
 * way the merge in `useState` cannot absorb, bump the suffix rather than
 * writing migration code for a preference worth two clicks to restore.
 */
const PANELS_KEY = 'rig.panels.v1'

/**
 * The starred view, read ONCE at module load.
 *
 * Module scope rather than a hook, because every `useState` initialiser below
 * needs it and hooks run in order — a `useMemo` inside the component would be
 * evaluated after the state it has to seed. Reading it here means the starred
 * view is the graph's FIRST state, so the expensive thing on this page (a
 * 400-tick force warmup over 1,250 nodes) happens once, for the right graph,
 * instead of once for the default and again for the saved one.
 *
 * A module-level read also means starring a view mid-session does not
 * teleport you into it: this value is fixed until the next reload, which is
 * exactly what "open on load" means.
 */
const STARTUP_VIEW = (() => {
  const s = loadViews()
  return s.openOnLoad ? (s.views.find((v) => v.id === s.openOnLoad) ?? null) : null
})()

/**
 * Item 13, 2026-08-20 — a deep link, if the page was opened with one
 * (`?rig=...`). Same module-scope-read reasoning as `STARTUP_VIEW` just
 * above — every `useState` initialiser below needs it before the first
 * render. Read separately from `STARTUP_VIEW` rather than merged into it at
 * this point, because the two are different shapes (a link carries
 * `selectedGroupId`, which a saved view does not yet) and different
 * questions ("what did this URL ask for" vs "what do I usually open to") —
 * each initialiser below decides for itself which one wins, but in every
 * case it is the link: opening someone else's link is a more specific,
 * more recent intent than a standing "always open to X" preference.
 */
const DEEP_LINK = readDeepLink()
import { Flag } from './components/Flag'
import {
  DEFAULT_VIEW,
  SCENE_BACKGROUND,
  ZOOM_MAX,
  ZOOM_MIN,
  type ViewSettings,
} from './lib/view'
import { loadCorpusData, type AssembledCorpus } from './data/browserCorpus'
import {
  buildGraph,
  contains,
  dependents,
  dependsOn,
  describeRate,
  disclosureByReport,
  isOfficial,
  rolledUpAuthority,
  validate,
  type Disclosure,
  type ValidationIssue,
} from './lib/graph'
import {
  buildFocusIndex,
  computeFocus,
  computeGroupFocus,
  computeNeighbourhoodFocus,
  edgeKey,
} from './lib/selection'
import {
  REGION_GROUPS,
  COUNTRY_GROUPS,
  reportIdsForGroup,
  matchesRegionGroup,
  continentOf,
  type RegionGroup,
  type Continent,
} from './lib/regions'
import { GroupsPanel } from './components/GroupsPanel'
import { Legend } from './components/Legend'
import { OpenedCountriesPanel } from './components/OpenedCountriesPanel'
/**
 * Every `RegionGroup` there is — continents/blocs/orgs/publishers plus every
 * individual country — combined once at module scope for `SearchPanel`
 * (2026-08-22, HANDOFF §5 item 4). `REGION_GROUPS` and `COUNTRY_GROUPS` are
 * still two separate arrays because `GroupsPanel` renders them as two
 * visually distinct sections; the search bar has no such split, so it
 * searches the union. A module constant, not a `useMemo` — both source
 * arrays are themselves module constants built once in `regions.ts`, so
 * there is nothing here that could ever change between renders.
 */
const SEARCHABLE_GROUPS: RegionGroup[] = [...REGION_GROUPS, ...COUNTRY_GROUPS]

/**
 * Round 0 (2026-09-03, Q15): the Focus panel's "Built from"/"Feeds into"
 * checkboxes are gone from `ViewControls.tsx` — click-to-trace, the group
 * isolate, and the neighbourhood walk all now always trace both directions,
 * unconditionally, the same shape `DEFAULT_VIEW` always defaulted to. A
 * shared constant rather than three inline object literals so the one
 * behaviour is visibly one decision, not three that happen to agree today.
 */
const TRACE_BOTH_DIRECTIONS = { builtFrom: true, feedsInto: true } as const
import { Compare } from './components/Compare'
import { buildDeepLink, clearDeepLinkFromAddressBar, readDeepLink } from './lib/deepLink'
import {
  DEFAULT_DRILLDOWN,
  TIER_COUNT,
  TIER_DESCRIPTION,
  TIER_LABEL,
  buildDisclosedGraph,
  countryFromOrbId,
  countryOrbId,
  standingLabels,
  foldCountry,
  isCountryOrbId,
  isOrbId,
  resolveId,
  toggleCountryOpen,
  toggleDrilldown,
  type DisclosedDependency,
  type Drilldown,
} from './lib/hierarchy'
import { AUTO_UNFOLD_STEP_MS, nextAutoUnfoldBatch } from './lib/autoUnfold'
import {
  NO_FILTER,
  applyFilter,
  compile,
  isFiltering,
  isolateFirstToggle,
  type FilterState,
} from './lib/filter'
import {
  COMMERCIAL_COLOUR,
  focusPalette,
  SCOPE_GROUPS,
  colourForReport,
} from './lib/palette'
import { THEME_CSS, HUD_TOP } from './lib/uiTheme'
import { DOMAINS, EVIDENCE_GRADES, type Domain } from './lib/types'
import type {
  Country,
  ReferencePeriod,
  ScoredReport,
  TerminalReason,
} from './lib/types'

/**
 * The empty corpus rendered while `loadCorpusData()` (`browserCorpus.ts`) is
 * still in flight, or forever if it fails. `buildGraph([], [])` and
 * `disclosureByReport([], [], [])` are both exercised paths already — an
 * empty/near-empty graph is exactly what Isolate on a country with no
 * cross-border edges produces (`notes/cross-border-gaps-2026-08-20.md`), so
 * this is not a new edge case, just a very early frame of one that already
 * has to render correctly. `LoadingCurtain` stays up the whole time regardless
 * (nothing settles with zero nodes... actually it settles instantly, which is
 * fine — the curtain's own 25s safety timeout is what stops it trapping
 * anyone if the fetch itself never resolves).
 */
const EMPTY_CORPUS: AssembledCorpus = {
  reports: [],
  dependencies: [],
  relations: [],
  loadIssues: {
    dangling: [],
    duplicateIds: [],
    duplicateEdges: [],
    orphans: [],
    danglingRelations: [],
    duplicateRelations: [],
  },
  droppedNotes: [],
}

/**
 * Groups `validate()`'s issues into one console line per repeated pattern
 * instead of one line per issue.
 *
 * 2026-08-21 (§6 item 4 of the full review) — the live corpus currently
 * carries roughly 2,600 `proposed:`-domain warnings (one per un-approved
 * domain tag; see graph.ts's `proposed:` note), and the old code called
 * `console.warn` once per issue: thousands of synchronous console writes
 * before first paint, seconds of it with DevTools open.
 *
 * Grouping key: every quoted value blanked out, and every report-id-shaped
 * token (hyphenated letters/digits, Unicode-aware since report ids include
 * accented and non-Latin titles — `ae-labour`, `boc-mpr`, `mx-cdmx-evalúa`,
 * an `a -> b` edge key) replaced with `<id>`, wherever in the
 * sentence it falls — report ids show up mid-sentence as often as they lead
 * it ("Report ae-monetary-statistics has no edges in either direction" is
 * the single largest non-`proposed:` bucket in the live corpus, and its id
 * is not a prefix). So e.g. every `xx-report: domain "proposed:y" is
 * proposed…` message collapses into one bucket regardless of which report or
 * which tag — the *kind* of issue is what deserves a summary line, not each
 * occurrence of it. Nothing is dropped: every bucket still states its true
 * count, and a bucket with more than one message logs a few verbatim
 * samples alongside the count, so the detail survives, just not repeated
 * once per occurrence.
 */
function logGroupedIssues(log: (...args: unknown[]) => void, issues: ValidationIssue[]) {
  if (!issues.length) return
  const buckets = new Map<string, string[]>()
  for (const issue of issues) {
    const key = issue.message
      .replace(/"[^"]*"/g, '"…"')
      .replace(/\b[\p{L}][\p{L}0-9]*(?:-[\p{L}0-9]+)+\b/gu, '<id>')
    const bucket = buckets.get(key)
    if (bucket) bucket.push(issue.message)
    else buckets.set(key, [issue.message])
  }
  for (const [key, messages] of buckets) {
    if (messages.length === 1) {
      log('[graph]', messages[0])
    } else {
      log(`[graph] ${messages.length}× ${key}`, { sample: messages.slice(0, 3) })
    }
  }
}

export default function App() {
  /**
   * The assembled corpus, fetched once at startup — see `browserCorpus.ts`
   * for why this is a fetch rather than a static import as of 2026-08-21.
   * `null` until the fetch resolves; `EMPTY_CORPUS` (not `null`) is what the
   * rest of this component actually reads, so every hook below can stay
   * unconditional (React's rules of hooks) instead of branching on whether
   * data has arrived yet.
   */
  const [corpus, setCorpus] = useState<AssembledCorpus | null>(null)
  const [corpusError, setCorpusError] = useState<string | null>(null)
  // Declared here rather than beside `filter`/`selectedId` below (its
  // original spot until 2026-09-03) because the `graph` memo a few lines
  // down now reads `view.minGrade`/`view.rankByLegalBasis` — see that
  // memo's own comment.
  const [view, setView] = useState<ViewSettings>(DEEP_LINK?.view ?? STARTUP_VIEW?.view ?? DEFAULT_VIEW)

  useEffect(() => {
    let cancelled = false
    loadCorpusData()
      .then((data) => {
        if (!cancelled) setCorpus(data)
      })
      .catch((err) => {
        if (!cancelled) setCorpusError(err instanceof Error ? err.message : String(err))
      })
    return () => {
      cancelled = true
    }
  }, [])

  const { reports, dependencies, loadIssues, droppedNotes } = corpus ?? EMPTY_CORPUS

  const graph = useMemo(() => {
    // Fail loudly in the console rather than silently rendering bad sizes.
    if (loadIssues.dangling.length) {
      console.warn('[data] dropped unresolved edges:', loadIssues.dangling)
    }
    // No longer dropped — kept and shelved beside the graph since V0.12. Logged
    // rather than silent because the count is worth watching: a sweep that adds
    // fifty islands has added territory in the most literal sense.
    if (loadIssues.orphans.length) {
      console.info('[data] isolated reports, kept and shelved:', loadIssues.orphans)
    }
    if (loadIssues.duplicateEdges.length) {
      console.warn('[data] edges defined twice, last kept:', loadIssues.duplicateEdges)
    }
    if (loadIssues.duplicateIds.length) {
      console.warn('[data] report ids defined twice, first kept:', loadIssues.duplicateIds)
    }
    const issues = validate(reports, dependencies)
    logGroupedIssues(console.error, issues.filter((i) => i.severity === 'error'))
    logGroupedIssues(console.warn, issues.filter((i) => i.severity === 'warning'))
    // minGrade/rankByLegalBasis are the two Midvamp-round-2 ranking options
    // (see buildGraph's own doc comment in lib/graph.ts) — they can move
    // size_score itself, which nothing in this renderer resizes outside of
    // a rebuild, so they are deliberately memo deps here rather than read
    // live off a ref the way an ordinary view toggle is. This is the SAME
    // exception `spreadApplied` already is for `view.spread` (see
    // InfluenceGraph.tsx), not a new violation of "no view setting is a
    // forceGraph memo dep" — that rule is about the memo in
    // InfluenceGraph.tsx not depending on `view` directly, and it still
    // doesn't; it depends on `graph`, which legitimately depends on these.
    return buildGraph(reports, dependencies, {
      minGrade: view.minGrade,
      rankByLegalBasis: view.rankByLegalBasis,
    })
  }, [corpus, view.minGrade, view.rankByLegalBasis])

  /** Standing labels for the standards — on the base graph, see `standingLabels`. */
  const labelled = useMemo(() => standingLabels(graph), [graph])

  /**
   * Disclosure, computed once per corpus rather than per hover.
   *
   * It walks every dropped note in the corpus, which is not something to do on
   * a pointer move — and the result is a pure function of data that only
   * changes once, when the fetch resolves.
   */
  const disclosure = useMemo(
    () => disclosureByReport(reports, dependencies, droppedNotes),
    [corpus],
  )

  /**
   * How many rungs of the global tier ladder are open — one number for the
   * whole world, not one per country. `DEFAULT_DRILLDOWN` opens on the
   * international and supranational tiers, with everything below folded into
   * one orb per family. See hierarchy.ts for the model and for why this is
   * global rather than per-family.
   *
   * Named `drilldown` rather than `disclosure`, even though "how much of the
   * hierarchy is shown" is a natural fit for that word: `disclosure` already
   * means something else and unrelated in this file — see `disclosureByReport`
   * a few lines up — and reusing it here would collide two different meanings
   * of "how much is currently visible" under one name.
   */
  const [drilldown, setDrilldown] = useState<Drilldown>(
    DEEP_LINK?.drilldown ?? STARTUP_VIEW?.drilldown ?? DEFAULT_DRILLDOWN,
  )

  /**
   * Which countries have been individually expanded past their per-country
   * fold — see hierarchy.ts's 2026-08-20 note on `resolveId`. Independent of
   * `drilldown`: depth still answers "how far down, globally"; this answers
   * "which of the countries current depth reveals do I actually want to see
   * as individual reports, rather than as one folded orb". Reset to empty on
   * a full Reset, same as `drilldown`; left untouched by a tier button press,
   * same as the filter — advancing depth is additive, not a fresh start.
   */
  const [openedCountries, setOpenedCountries] = useState<ReadonlySet<Country>>(
    () => new Set(DEEP_LINK?.openedCountries ?? STARTUP_VIEW?.openedCountries ?? []),
  )

  /**
   * Auto-unfold, 2026-08-22 — whether the tier ladder and the country orbs
   * are currently being opened on a timer instead of by hand. See
   * `lib/autoUnfold.ts` for what "next" means; the effect below is just the
   * clock that keeps asking it and applying the answer. Never persisted
   * (deep link, saved view) — it is a one-shot action in progress, not a
   * state of the view the way `drilldown` and `openedCountries` are.
   */
  const [autoUnfoldActive, setAutoUnfoldActive] = useState(false)

  const [hovered, setHovered] = useState<ScoredReport | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(
    DEEP_LINK?.selectedId ?? STARTUP_VIEW?.selectedId ?? null,
  )
  /**
   * A region/bloc/publisher picked from `GroupsPanel`, mutually exclusive
   * with `selectedId` (2026-08-20, Thomas: "we should have a menu with north
   * america, south america... IMF, eu, brics... when we open a nation or
   * region we should see how it ties to the international level and the
   * connections within it"). Still not persisted in saved views (`panels`
   * and friends in `savedViews.ts`'s `SavedView` — a limitation of that
   * feature, unrelated to this one) — but item 13's deep links DO carry it
   * (`lib/deepLink.ts`'s `DeepLinkState`), postdating `SavedView` by less
   * than a day and free to include from the start, so a shared "look at
   * this region" link reproduces the sender's actual selection rather than
   * silently downgrading to nothing selected.
   */
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(
    DEEP_LINK?.selectedGroupId ?? null,
  )
  const [bounds, setBounds] = useState<GraphBounds | null>(null)
  const [filter, setFilter] = useState<FilterState>(
    DEEP_LINK?.filter ?? STARTUP_VIEW?.filter ?? NO_FILTER,
  )

  // Once the deep link above has done its one job — seeding the initial
  // state, several lines up — the `?rig=...` param is scrubbed from the
  // address bar. See `clearDeepLinkFromAddressBar`'s own comment for why:
  // a URL that keeps advertising the moment the link was opened is exactly
  // the thing someone re-shares by accident once the view has moved on.
  // Runs once — `DEEP_LINK` is a module constant, fixed for the session.
  useEffect(() => {
    if (DEEP_LINK) clearDeepLinkFromAddressBar()
  }, [])

  const [flyTo, setFlyTo] = useState<FlyTo | null>(null)
  /**
   * Incremented to ask the scene for the opening camera back. A counter rather
   * than a boolean because the same request has to be answerable twice in a
   * row, and a boolean would need clearing afterwards.
   */
  const [resetSignal, setResetSignal] = useState(0)
  /**
   * Item 12, 2026-08-20 — export a PNG at 2x with no HUD. Same "counter,
   * zero is not a request" pattern as `resetSignal` just above, consumed by
   * `PngExport.tsx`. `composerRef` is the postprocessing `EffectComposer`
   * INSTANCE (via that component's own forwarded ref, not a React ref to the
   * JSX element) — `PngExport` needs to resize it manually to keep bloom in
   * sync with the temporarily-doubled pixel ratio; see that file's top
   * comment for exactly why `useThree()` alone is not enough for that.
   */
  const [exportRequest, setExportRequest] = useState(0)
  const composerRef = useRef<EffectComposerImpl | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  /**
   * Last pointer position, held in a ref rather than state so that placing the
   * card costs no render — and so the card can be re-placed after its content
   * changes, which is when its height is finally known. See `place`.
   */
  const pointer = useRef({ x: 0, y: 0 })

  /**
   * The graph as currently drawn — real reports where a family's ladder has
   * been opened that far, one orb per family everywhere it has not.
   *
   * Everything that decides *what is rendered and selectable* reads this
   * rather than `graph` from here down: the scene itself, the visible set a
   * filter computes, the focus adjacency a selection walks. Everything that
   * reads as a fact about the *corpus* rather than the current view — the
   * legend's per-scope counts, the domain panel, search, the calendar —
   * deliberately keeps reading `graph`, the same way those already read the
   * unfiltered graph rather than the filtered one (see the comments on
   * `scopeCounts` and friends below). Collapsing is a second, independent
   * axis of "what's on screen" alongside filtering, not a replacement for it.
   */
  const disclosedGraph = useMemo(
    () => buildDisclosedGraph(graph, drilldown, openedCountries),
    [graph, drilldown, openedCountries],
  )

  /**
   * The auto-unfold clock. Re-armed every time `disclosedGraph` (or
   * `drilldown`, for the "no orbs left, just advance the tier" case) changes
   * while `autoUnfoldActive` is on — which includes every change this same
   * effect itself causes, so it naturally chains: apply one step, the
   * resulting rebuild reschedules the next.
   *
   * `nextAutoUnfoldBatch` is asked fresh each tick rather than a plan being
   * computed once up front, because the answer depends on state this effect
   * is itself mutating (which countries are still folded) — precomputing a
   * plan would either go stale the moment the user also clicks something by
   * hand, or have to duplicate `buildDisclosedGraph`'s own resolution logic
   * just to stay in sync with it.
   *
   * Cleanup cancels a still-pending timer whenever the dependencies change
   * before it fires — the ordinary case (this effect's own previous step
   * completing) as well as the user interrupting by hand (Reset, a manual
   * double-click, a tier button press) mid-wait.
   */
  useEffect(() => {
    if (!autoUnfoldActive) return
    const timer = setTimeout(() => {
      const batch = nextAutoUnfoldBatch(disclosedGraph)
      if (batch) {
        setOpenedCountries((prev) => {
          const next = new Set(prev)
          for (const c of batch.countries) next.add(c)
          return next
        })
        return
      }
      if (drilldown < TIER_COUNT) {
        setDrilldown((d) => Math.min(d + 1, TIER_COUNT))
        return
      }
      // Nothing left folded and the ladder is fully open — done.
      setAutoUnfoldActive(false)
    }, AUTO_UNFOLD_STEP_MS)
    return () => clearTimeout(timer)
  }, [autoUnfoldActive, disclosedGraph, drilldown])

  /**
   * Whether there is nothing left for auto-unfold to do — the ladder is
   * already at Everything and every country orb is already open. Used to
   * grey out the button rather than let it be pressed for no effect.
   */
  const autoUnfoldDone = useMemo(
    () => drilldown >= TIER_COUNT && !nextAutoUnfoldBatch(disclosedGraph),
    [drilldown, disclosedGraph],
  )

  /**
   * What is drawn. Null when nothing is filtered, so the common case does no
   * set lookups at all — and so the renderer can tell "everything" apart from
   * "everything happens to pass", which are the same picture but not the same
   * amount of work.
   */
  const predicate = useMemo(() => compile(filter), [filter])

  /**
   * Isolate mode's own adjacency — 2026-08-20, Thomas: *"if i want to show
   * just Israel and international connections to and from it I have no way
   * to do so."* Built over the UNFILTERED disclosed graph (`visible: null`)
   * deliberately, not the scope-filtered one `focusIndex` below uses: the
   * whole point is a chain that reaches whatever it actually connects to —
   * Israel's real edges run to a Paraguay-tagged MERCOSUR–Israel agreement
   * and to assorted international standards, and a scope filter isolated to
   * one colour family would silently prune exactly the cross-border
   * connections this is for. Kept as its own memo rather than reusing
   * `focusIndex` for that reason: the two answer different questions ("what
   * does this rest on among what I've chosen to see" vs "what does this
   * actually rest on, full stop") and must not collapse into one.
   */
  const unfilteredFocusIndex = useMemo(
    () => buildFocusIndex(disclosedGraph, null),
    [disclosedGraph],
  )

  /**
   * The selected group (a continent, bloc, or publisher), resolved from
   * `selectedGroupId` — `REGION_GROUPS` and `COUNTRY_GROUPS` are two arrays
   * for two panels, but one id namespace (`continent:`/`bloc:`/`publisher:`
   * vs `country:`), so a single lookup across both is correct rather than
   * something the caller has to know to route.
   */
  const selectedGroup: RegionGroup | null = useMemo(() => {
    if (!selectedGroupId) return null
    return (
      REGION_GROUPS.find((g) => g.id === selectedGroupId) ??
      COUNTRY_GROUPS.find((g) => g.id === selectedGroupId) ??
      null
    )
  }, [selectedGroupId])

  /**
   * Isolate by GROUP (continent/bloc/publisher/country) — `computeGroupFocus`
   * over the unfiltered index, seeded from every disclosed node
   * `matchesRegionGroup` accepts rather than one selection. A group
   * selection always isolates unconditionally — a region/bloc/publisher has
   * no other useful "selected but not isolated" state; the whole point of
   * picking one from `GroupsPanel` is to see it and its ties, nothing else.
   *
   * **The single-node Isolate toggle that used to live beside this one is
   * gone (round 0, 2026-09-03, Q15/HANDOFF "Focus panel removed").** This
   * mechanism — the Groups panel's own isolate — is the SEPARATE one HANDOFF
   * says stays, unaffected: still HIDE, not dim, still built on the
   * unfiltered index so cross-border edges survive.
   */
  const groupFocus = useMemo(
    () =>
      selectedGroup
        ? computeGroupFocus(
            unfilteredFocusIndex,
            reportIdsForGroup(disclosedGraph.nodes, selectedGroup),
            TRACE_BOTH_DIRECTIONS,
          )
        : null,
    [unfilteredFocusIndex, disclosedGraph, selectedGroup],
  )

  /**
   * The single country currently isolated via the Groups panel, if any —
   * feeds `InfluenceGraph`'s per-galaxy camera fit (round 0, Q16 "b" — "in
   * a country isolate, fit the camera to that country's cluster and let
   * INT nodes sit off-screen"). Only `kind === 'country'` qualifies: a
   * continent/bloc/publisher isolate has no single "home" cluster to zoom
   * to, so those keep fitting the whole visible set exactly as before.
   */
  const isolatedCountry = useMemo(
    () => (groupFocus && selectedGroup?.kind === 'country' ? (selectedGroup?.country ?? null) : null),
    [groupFocus, selectedGroup],
  )

  /**
   * Item 8 — "show this node and everything within N hops," 2026-08-20.
   * Same unfiltered index (deliberately: a bounded chain across a
   * family/country a scope filter would otherwise cut is exactly as real a
   * chain as an unbounded one) and same HIDE-not-dim shape group isolate
   * uses above, but walked with `neighbourhoodHops` as the depth limit. Its
   * single-node sibling — unbounded HIDE, no depth limit — was the Focus
   * panel's "Isolate" checkbox, removed in round 0 (2026-09-03, Q15); this
   * one is the survivor, a HANDOFF-named exception, and still wins over
   * `groupFocus` when both apply — see `visible` below.
   */
  const neighbourhoodFocus = useMemo(
    () =>
      view.neighbourhoodHops > 0 && selectedId
        ? computeNeighbourhoodFocus(
            unfilteredFocusIndex,
            selectedId,
            view.neighbourhoodHops,
            TRACE_BOTH_DIRECTIONS,
          )
        : null,
    [unfilteredFocusIndex, selectedId, view.neighbourhoodHops],
  )

  const visible = useMemo(() => {
    // Group isolate wins over everything else — it is the most specific,
    // most recently expressed intent ("show me exactly this region").
    if (groupFocus) {
      return {
        nodes: groupFocus.nodes,
        edges: groupFocus.edges,
        hiddenNodes: disclosedGraph.nodes.length - groupFocus.nodes.size,
        hiddenEdges: disclosedGraph.edges.length - groupFocus.edges.size,
      }
    }
    // Neighbourhood (bounded) wins over plain Isolate (unbounded) — see the
    // memo comment above.
    if (neighbourhoodFocus) {
      return {
        nodes: neighbourhoodFocus.nodes,
        edges: neighbourhoodFocus.edges,
        hiddenNodes: disclosedGraph.nodes.length - neighbourhoodFocus.nodes.size,
        hiddenEdges: disclosedGraph.edges.length - neighbourhoodFocus.edges.size,
      }
    }
    // The single-node Isolate branch that used to sit here (HIDE outright,
    // winning over the scope/domain filter) is gone with the rest of the
    // Focus panel — round 0, 2026-09-03, Q15. Group isolate (above) and
    // Neighbourhood (above that) still win over the filter the same way.
    return isFiltering(filter) ? applyFilter(disclosedGraph, predicate) : null
  }, [groupFocus, neighbourhoodFocus, disclosedGraph, filter, predicate])

  /**
   * What the tier bar reports: **real reports, orbs excluded, after the
   * filter.**
   *
   * Both exclusions matter. Counting orbs would inflate the number by one per
   * folded family and make "reports shown" untrue by up to eight. Ignoring the
   * filter is the mistake the readout this replaced actually made — it claimed
   * 527 of 728 were shown while an EU-only filter left about ten on screen.
   * `visible` is null when nothing is filtered, which is not the same as an
   * empty set, so it falls back to the disclosed count rather than to zero.
   */
  const tierCounts = useMemo(() => {
    const real = disclosedGraph.nodes.filter((n) => !isOrbId(n.id))
    return {
      inTier: real.length,
      visible: visible ? real.filter((n) => visible.nodes.has(n.id)).length : real.length,
    }
  }, [disclosedGraph, visible])

  // Adjacency, rebuilt only when the disclosed graph or the filter changes.
  // Selection changes then cost a walk, not a rebuild.
  const focusIndex = useMemo(
    () => buildFocusIndex(disclosedGraph, visible),
    [disclosedGraph, visible],
  )

  // A selection that has just been filtered out would leave the panel tracing
  // a report that is no longer on screen.
  useEffect(() => {
    if (selectedId && visible && !visible.nodes.has(selectedId)) setSelectedId(null)
  }, [selectedId, visible])

  const focus = useMemo(
    () => (selectedId ? computeFocus(focusIndex, selectedId, TRACE_BOTH_DIRECTIONS) : null),
    [focusIndex, selectedId],
  )

  // `disclosedGraph` first, not `graph` alone — `selectedId` may name an
  // orb, which only exists in the disclosed view. Falls back to `graph` for
  // an id `disclosedGraph` does not currently have: an isolated report
  // selected from `IsolatedShelf` is always a valid id, but if its family's
  // ladder has not been opened that far it is still folded into an orb in
  // the disclosed view and has no entry of its own there — the fallback is
  // what lets the Reports panel still show it was selected.
  const selected = selectedId
    ? (disclosedGraph.byId.get(selectedId) ?? graph.byId.get(selectedId) ?? null)
    : null

  /**
   * What the selection card is showing — the last non-null selection, kept
   * through the slide-out so the card exits with its content intact rather
   * than collapsing to an empty panel mid-animation.
   */
  const [cardReport, setCardReport] = useState<ScoredReport | null>(null)
  useEffect(() => {
    if (selected) setCardReport(selected)
  }, [selected])

  /**
   * The selected EDGE — a drawn line's key, set by clicking the line, its
   * arrowhead or one of its pulses. Drives the evidence card on the LEFT
   * (Phase 4 §5): right = what a node is, left = why an edge exists. The two
   * selections are deliberately independent — with a node traced, the lit
   * edges are exactly the ones worth interrogating, so opening evidence must
   * not tear the trace down.
   */
  const [selectedEdgeKey, setSelectedEdgeKey] = useState<string | null>(null)

  /**
   * The real Dependency records behind the selected line — resolved on
   * demand by filtering the disclosed edges back to the same key the
   * renderer's trunk merge grouped them under, so no back-reference is ever
   * stored on the link datum (the brief's memory worry, answered by not
   * holding anything at all). Up to 57 records for a tier-1 trunk.
   */
  const selectedEdgeDeps = useMemo(() => {
    if (!selectedEdgeKey) return []
    return disclosedGraph.edges.filter(
      (e) => edgeKey(e.source_report_id, e.target_report_id) === selectedEdgeKey,
    ) as DisclosedDependency[]
  }, [selectedEdgeKey, disclosedGraph])

  /** The screen-space edge picker, registered by InfluenceGraph — see
   * `registerEdgePicker` there and `onPointerMissed` on the Canvas. */
  const edgePicker = useRef<((x: number, y: number) => string | null) | null>(null)

  /** Keep-last for the slide-out, same pattern as `cardReport`. */
  const [edgeCard, setEdgeCard] = useState<{
    key: string
    deps: DisclosedDependency[]
  } | null>(null)
  useEffect(() => {
    if (selectedEdgeKey && selectedEdgeDeps.length) {
      setEdgeCard({ key: selectedEdgeKey, deps: selectedEdgeDeps })
    } else if (selectedEdgeKey && selectedEdgeDeps.length === 0) {
      // A tier or drilldown change re-keyed the lines out from under the
      // selection — the line this card described no longer exists. Close
      // rather than show evidence for a line that is not on screen.
      setSelectedEdgeKey(null)
    }
  }, [selectedEdgeKey, selectedEdgeDeps])

  /**
   * Escape, with a priority stack (2026-08-21, full-review item 3). One
   * press used to clear selection + group isolate + edge card
   * UNCONDITIONALLY, in parallel with whichever open panel's own Escape
   * listener also fired — so closing an expanded Legend silently destroyed
   * an active isolate the user had just built. Now every panel's own Escape
   * handler marks the event consumed with `e.preventDefault()` when it
   * actually closes something (GroupsPanel, Legend, MenuBar, HelpCard,
   * Onboarding — the search box stops propagation outright, so its Escapes
   * never even arrive here), and THIS handler defers its read to the end of
   * the dispatch (`setTimeout 0`) — listener order on `window` depends on
   * mount order, which panel toggling reshuffles, so "check the flag after
   * every listener has run" is the only order-independent way to know
   * whether anyone consumed the press. Only an unconsumed Escape clears
   * anything, and then only ONE level, topmost first: the edge-evidence
   * card, then the node selection, then the group isolate. Backing all the
   * way out still works — one press per level.
   */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      window.setTimeout(() => {
        if (e.defaultPrevented) return
        if (selectedEdgeKey) setSelectedEdgeKey(null)
        else if (selectedId) setSelectedId(null)
        else if (selectedGroupId) setSelectedGroupId(null)
      }, 0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedEdgeKey, selectedId, selectedGroupId])

  /**
   * Place the hover card at the last known pointer position, on screen.
   *
   * Flip to the other side of the cursor when the card would run off an edge,
   * then **clamp**, which is the part that was missing. Flipping alone was the
   * whole positioning rule and it produced coordinates outside the window on
   * tall cards: the CPI's card is 552px tall, so `clientY - pad - h` from
   * mid-screen lands at −96, and the title — the one thing a card must show —
   * was the part cut off.
   */
  const place = useCallback(() => {
    const el = tooltipRef.current
    if (!el) return
    const { x: px, y: py } = pointer.current
    const pad = 18
    const w = el.offsetWidth
    const h = el.offsetHeight

    const fit = (v: number, size: number, limit: number) =>
      Math.max(pad, Math.min(v, limit - size - pad))

    const x = fit(
      px + pad + w > window.innerWidth ? px - pad - w : px + pad,
      w,
      window.innerWidth,
    )
    const y = fit(
      py + pad + h > window.innerHeight ? py - pad - h : py + pad,
      h,
      window.innerHeight,
    )
    el.style.transform = `translate(${x}px, ${y}px)`
  }, [])

  // The card follows the cursor by writing style directly. Putting pointer
  // coordinates in React state would re-render the tree on every mouse move.
  const trackPointer = useCallback(
    (e: React.PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY }
      place()
    },
    [place],
  )

  /**
   * Place again once the card's *content* has rendered.
   *
   * This is the actual bug behind "the card is cut off", and clamping alone did
   * not fix it. `place` measures `offsetHeight`, but the card's content comes
   * from React state: on the pointermove that first hovers a node, the card is
   * still showing the previous report — or nothing at all — so the height being
   * clamped against is the wrong one. React then renders the real content and no
   * further pointermove arrives, because the cursor is sitting still on the
   * node. So the card was positioned for a short card and then grew.
   *
   * Measured before and after: hovering the CPI put the card at top 440 with a
   * height of 552 in a 900px window — 92px off the bottom — with the clamp
   * already in place and working correctly on a stale number.
   *
   * `useLayoutEffect`, not `useEffect`, and the difference is visible rather
   * than theoretical. `useEffect` fires after the browser has painted, so the
   * card would be drawn once in the wrong place and then moved — a flinch on
   * every hover. The first attempt at this fix used `useEffect` and the
   * screenshot still showed the card 92px off the bottom, because the deferred
   * callback had not run yet.
   */
  useLayoutEffect(place, [hovered, place])

  /**
   * New scene bounds from a fit.
   *
   * When the fit moved the camera it placed it exactly at the fit distance, so
   * the zoom is 1 whether the slider currently agrees or not — see
   * `movedCamera` on GraphBounds for the loop this closes. Declaring it here
   * rather than letting CameraZoom infer it is the difference between the
   * slider following the camera and the two of them chasing each other.
   *
   * This cannot fight a user who deliberately zoomed: the wheel sets
   * `userOwnsCamera` in the scene, camera-moving fits stop immediately after
   * that, and so do these resets.
   */
  const handleBounds = useCallback((b: GraphBounds) => {
    setBounds(b)
    if (b.movedCamera) setView((v) => (v.zoom === 1 ? v : { ...v, zoom: 1 }))
  }, [])

  /**
   * Zoom reported back from the camera — clamped to the slider's own range.
   *
   * A backstop, not the fix. The zoom slider and the auto-fit form a loop
   * (camera → inferred zoom → camera), and a loop whose gain is even slightly
   * above one walks its value outwards until something stops it. The
   * gain-above-one bug found this session was `fitSync.distance` and
   * `bounds.fitDistance` disagreeing about what "zoom 1" means, and that is
   * fixed at source in `runFit`. But Thomas has seen the camera *"zoom out
   * forever"* in a state that could not be reproduced here, so what the loop
   * can reach is now bounded by construction rather than by argument.
   *
   * `ZOOM_MIN`/`ZOOM_MAX` are the slider's own limits, so nothing this clamp
   * allows is anywhere the user could not have dragged to by hand. The worst
   * case becomes "further out than I wanted, drag it back" rather than a camera
   * receding without limit.
   */
  const handleZoomChange = useCallback((zoom: number) => {
    const clamped = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoom))
    setView((v) => (v.zoom === clamped ? v : { ...v, zoom: clamped }))
  }, [])

  /**
   * Search or the calendar picked a report: select it, and go there.
   *
   * Both panels list real reports regardless of drilldown state (see the note
   * on `disclosedGraph`), so the id they hand back may currently be folded
   * into an orb rather than on screen itself. `resolveId` finds whichever id
   * — the report's own, or its family's orb — is actually visible right now,
   * so choosing a collapsed report selects and flies to the group it is
   * currently part of instead of silently doing nothing.
   */
  /**
   * A search result was chosen (2026-08-21, full-review item 3). This used
   * to `setSelectedGroupId(null)` unconditionally — with UAE isolated, one
   * Enter in the find bar silently threw the whole isolate away. Now a
   * result INSIDE the active isolate keeps the isolate and just selects and
   * flies (selection and group isolate are allowed to coexist on this path;
   * `visible` is unaffected because `groupFocus` still wins there, and the
   * effect that clears an off-screen selection never fires for a node the
   * isolate shows). A result OUTSIDE the isolate does still clear it — but
   * that is now an informed exit, not a silent one: `SearchPanel` labels
   * those rows "outside isolate" (see `searchOutsideIsolate` below), so
   * choosing one is the user deciding to leave the isolate for that report,
   * not the app discarding their view as a side effect. Without clearing,
   * the off-screen-selection guard would immediately null the selection and
   * the choose would read as "search is broken".
   */
  const handleChoose = useCallback(
    (report: ScoredReport) => {
      const id = resolveId(drilldown, report, openedCountries)
      if (groupFocus && !groupFocus.nodes.has(id)) setSelectedGroupId(null)
      // Mirrors the isolate branch immediately above (2026-08-21, review
      // §3.5(b)/(c)) — search now runs over the whole corpus and tags a
      // filtered-out row "outside filter" instead of hiding it (see
      // `searchOutsideFilter` and `SearchPanel`'s `outsideFilter` prop), so
      // choosing one has to actually clear the filter or the report would
      // vanish again the instant it were selected — the same "reads as
      // broken" failure the isolate case already fixed one round earlier.
      if (isFiltering(filter) && !predicate(report)) setFilter(NO_FILTER)
      setSelectedId(id)
      setFlyTo((f) => ({ id, nonce: (f?.nonce ?? 0) + 1 }))
    },
    [drilldown, openedCountries, groupFocus, filter, predicate],
  )

  /**
   * True for a report the ACTIVE group isolate currently hides — the search
   * panel tags these rows so "why did my isolate vanish" (choosing one) and
   * "why does search list things I cannot see" (before choosing) both have
   * their answer on the row itself. Null when no isolate is active, so the
   * panel skips the check entirely in the common case.
   */
  const searchOutsideIsolate = useMemo(() => {
    if (!groupFocus) return null
    const nodes = groupFocus.nodes
    return (report: ScoredReport) => !nodes.has(resolveId(drilldown, report, openedCountries))
  }, [groupFocus, drilldown, openedCountries])

  /**
   * True for a report the active Countries/Domains scope filter currently
   * hides — same shape as `searchOutsideIsolate` immediately above, added
   * 2026-08-21 (review §3.5(b)/(c)) when `SearchPanel` stopped narrowing its
   * own results by `predicate` and started tagging them instead. Null when no
   * filter is active, so the panel skips the check in the common case, same
   * convention as the isolate version.
   */
  const searchOutsideFilter = useMemo(() => {
    if (!isFiltering(filter)) return null
    return (report: ScoredReport) => !predicate(report)
  }, [filter, predicate])

  /**
   * A region, bloc or publisher was picked from `GroupsPanel` — see the
   * `selectedGroup`/`groupFocus` memos above. No `flyTo`: a group has no
   * single point for the camera to fly to, and `visible` narrowing to the
   * group's nodes is what makes the whole thing visible on screen already
   * (the camera refits on every filter change regardless — see the note on
   * that in `InfluenceGraph.tsx`). Picking the SAME group again turns it back
   * off, matching every other isolate-first control in this app.
   */
  const handleChooseGroup = useCallback((groupId: string) => {
    setSelectedId(null)
    setSelectedEdgeKey(null)
    setSelectedGroupId((cur) => (cur === groupId ? null : groupId))
  }, [])

  /**
   * A dot in `IsolatedShelf` was clicked.
   *
   * No `flyTo` — an isolated report is never in the 3D scene (see the note
   * on `isolated`), so there is nowhere for the camera to go. Selecting it
   * still works: `selected` below reads off `disclosedGraph.byId`, which
   * carries every report regardless of whether InfluenceGraph chose to draw
   * it, so the Reports panel's "Tracing" block still shows it correctly.
   * Toggles off on a second click of the same dot, matching a click on a
   * node in the scene.
   */
  const handleSelectIsolated = useCallback((id: string) => {
    setSelectedGroupId(null)
    setSelectedId((cur) => (cur === id ? null : id))
  }, [])

  /**
   * Double-click on the scene: a family orb steps up a tier, a country orb
   * expands just that country, a real node does nothing. See
   * `toggleDrilldown` and `toggleCountryOpen` in hierarchy.ts.
   *
   * Checked as `isCountryOrbId` first, deliberately not folded into
   * `toggleDrilldown` itself — a country orb's id also satisfies the broader
   * `isOrbId`, so if this checked family-vs-not it would advance the global
   * tier on a country double-click too, dumping every OTHER unopened
   * country's next tier onto the screen as a side effect of opening one.
   */
  const handleToggleNode = useCallback((id: string) => {
    if (isCountryOrbId(id)) {
      setOpenedCountries((prev) => toggleCountryOpen(prev, id))
      return
    }
    // **A double-click on an international node folds the international
    // layer back into its orb** (Thomas, 2026-09-05: "double clicking an int
    // node could toggle between the open view of all the nodes and a view
    // with the single int node"). This is the one deliberate exception to
    // the "a graph gesture only ever adds detail" rule in hierarchy.ts —
    // for INT only, because INT is one group with a two-state control of
    // its own (`ViewControls` → International layer), so the gesture
    // mirrors a switch the user can see, rather than silently removing a
    // country the way the old real-node-folds-the-view design did.
    if (graph.byId.get(id)?.country === 'INT') {
      setOpenedCountries((prev) => foldCountry(prev, 'INT'))
      return
    }
    setDrilldown((d) => toggleDrilldown(d, id))
  }, [graph])

  /**
   * The International-layer row in the View panel (2026-09-05). Condensed
   * = `'INT'` not in `openedCountries`; Open = in it. Same state the
   * country fold and the double-click gesture read, so all three agree.
   */
  const intCondensed = !openedCountries.has('INT')
  const handleCondenseInt = useCallback((condensed: boolean) => {
    setOpenedCountries((prev) => (condensed ? foldCountry(prev, 'INT') : toggleCountryOpen(prev, countryOrbId('INT'))))
  }, [])

  /**
   * The opened-countries pill's per-row "Fold" and "Fold all" (HANDOFF item
   * 8, 2026-08-25) — the explicit UI counterpart to `toggleCountryOpen`
   * above, see `foldCountry`'s comment in hierarchy.ts for why an explicit
   * button is safe where a graph gesture wasn't. Narrower than
   * `handleReset` on purpose: only `openedCountries` changes, camera/
   * selection/filter/drilldown are untouched.
   */
  const handleFoldCountry = useCallback((country: Country) => {
    setOpenedCountries((prev) => foldCountry(prev, country))
  }, [])

  const handleFoldAllCountries = useCallback(() => {
    setOpenedCountries((prev) => (prev.size === 0 ? prev : new Set()))
  }, [])

  /**
   * A tier button was pressed.
   *
   * Puts the zoom slider back to 1 as well as changing the tier. Pressing a
   * tier button is a request for a *view*, not just for more nodes, and the
   * camera has to answer it — the rebuild this triggers already re-frames the
   * scene (see `userOwnsCamera` in InfluenceGraph.tsx, which resets on every
   * rebuild), but a zoom the user left at 4x would survive that and leave them
   * staring into the middle of a cloud that just changed size by a factor of
   * three. This is the same reasoning as Reset, for the same reason.
   */
  const handleTier = useCallback((tier: number) => {
    setDrilldown(tier)
    setView((v) => (v.zoom === 1 ? v : { ...v, zoom: 1 }))
    // A manual tier press is the user taking the wheel — let the clock stop
    // rather than have it fight (or redundantly repeat) what was just asked
    // for by hand.
    setAutoUnfoldActive(false)
  }, [])

  /**
   * The auto-unfold button. Starting is just flipping the flag on — the
   * effect above does the rest on its own clock. Stopping mid-sequence
   * leaves the ladder and whatever countries are already open exactly where
   * they are; there is deliberately no "undo the steps taken so far", same
   * asymmetry as `toggleCountryOpen` itself (see hierarchy.ts).
   */
  const handleToggleAutoUnfold = useCallback(() => {
    setAutoUnfoldActive((a) => !a)
  }, [])

  /**
   * Back to the opening view. See the Reset button in ViewControls for why the
   * filter is only cleared on a shift-click.
   *
   * The zoom slider is put back to 1 as well as the camera being moved, or the
   * two would disagree — CameraZoom reconciles them from the camera side on the
   * next frame, and letting it do that instead would animate a slider nobody
   * touched.
   */
  const handleReset = useCallback((clearFilter: boolean) => {
    setSelectedId(null)
    setSelectedGroupId(null)
    setFlyTo(null)
    setView((v) => ({ ...v, zoom: 1 }))
    setResetSignal((n) => n + 1)
    // Reset means "the opening view" — a mid-flight auto-unfold going on to
    // reopen everything it had already opened the instant Reset finishes
    // would make the button look broken.
    setAutoUnfoldActive(false)
    // Back to the opening depth, unconditionally — not gated behind
    // `clearFilter`. Drilldown is navigation state like the camera and the
    // selection, not a filter: "reset" meaning "the opening view" should
    // mean the opening *topology* too, every time, the same way it always
    // puts the camera back regardless of whether the filter is kept.
    //
    // Now that this is a number rather than an object, a reset that changes
    // nothing is automatically referentially stable — `disclosedGraph` is keyed
    // on this value, and setting a number to the number it already holds does
    // not re-render at all. The old code had to hand back the *same* `{}` by
    // hand to avoid rebuilding the whole force graph the same moment
    // `resetSignal` bumps the camera, which is exactly the two-things-at-once
    // that surfaced the tickFrame race `useLayoutEffect` closes.
    setDrilldown(DEFAULT_DRILLDOWN)
    // Same reasoning, same unconditional-of-clearFilter treatment, as
    // `drilldown` two lines up — country expansion is navigation state, not
    // a filter. Referentially stable when already empty, for the same reason
    // the drilldown reset is: no need to force `disclosedGraph` to rebuild
    // over a no-op.
    setOpenedCountries((prev) => (prev.size === 0 ? prev : new Set()))
    if (clearFilter) setFilter(NO_FILTER)
  }, [])

  // All three filter axes speak Thomas's isolate-first click language now —
  // see isolateFirstToggle in filter.ts for the rules and his words.
  const toggleDomain = useCallback((domain: Domain) => {
    setFilter((f) => ({ ...f, domains: isolateFirstToggle(f.domains, DOMAINS, [domain]) }))
  }, [])

  // `toggleFamily`/`toggleScope` (the ChipBar family/level chip handlers) were
  // deleted with ChipBar itself, 2026-08-20 — see the tombstone comment where
  // the component used to be defined, below.

  const top = useMemo(
    () => [...graph.nodes].sort((a, b) => b.authority - a.authority).slice(0, 3),
    [graph],
  )

  /**
   * Reports with no edges in either direction — never placed in the 3D
   * scene at all (see the filter on `nodes` in `InfluenceGraph`'s
   * `forceGraph` memo) and shown here instead, in `IsolatedShelf`.
   *
   * Read off `graph`, the whole corpus, not `disclosedGraph` — deliberately,
   * and for the same reason the legend counts below read `graph` rather than
   * the filtered view. Isolation is orthogonal to the drilldown hierarchy: an
   * isolated report has no edges to fold along in the first place, so there
   * is no meaningful "collapsed" state for it to disappear into the way a
   * connected report does when its family's orb closes over it. It is either
   * in this list or it is not, and that fact does not change as families
   * open and close — so the list does not either.
   */
  const isolated = useMemo(
    () => graph.nodes.filter((n) => n.in_degree === 0 && n.out_degree === 0),
    [graph],
  )

  /**
   * "Why so few?" — HANDOFF item 7, 2026-08-26: a group isolate on a
   * sparsely-connected region (e.g. Middle East) can leave only a handful of
   * real reports on screen, and with nothing on screen explaining it, that
   * reads as a bug. Two distinct, entirely legitimate reasons it can happen,
   * both computed here so `GroupsPanel` can name whichever applies:
   *
   * `foldedCountries` — this group's own countries that are STILL a
   * `corb:` (country-fold) orb rather than opened. `groupFocus`'s seed walk
   * (`reportIdsForGroup` over `disclosedGraph.nodes`) picks up such an orb as
   * a match (any-member semantics, same as `matchesRegionGroup`'s own
   * comment) but `tierCounts` excludes every orb from "real reports shown" —
   * so a folded country counts toward neither number the user sees, only
   * toward the sphere they can already see sitting there unopened.
   *
   * `shelved` — real reports of this group with no edges in either
   * direction, i.e. members of `isolated` above. These are seeded into
   * `groupFocus.nodes` same as any other real report (seeds are added
   * unconditionally — see `computeGroupFocus`), so they DO count toward
   * "shown" here even though `InfluenceGraph`'s `forceGraph` memo never
   * draws them (its own separate degree filter, orthogonal to this one) —
   * the corpus genuinely has little to no documented cross-border data for
   * them yet, not a rendering bug.
   *
   * Both read `disclosedGraph`/`isolated`, not `groupFocus`, because the
   * question is about the group's OWN membership, independent of whatever
   * else the walk happens to have reached (an international body the group
   * connects to, say) — that part already has no "why so few" to answer.
   */
  const groupWhySoFew = useMemo(() => {
    if (!selectedGroup) return null
    const foldedCountries =
      selectedGroup.kind === 'publisher'
        ? 0
        : disclosedGraph.nodes.filter(
            (n) =>
              isCountryOrbId(n.id) &&
              matchesRegionGroup(
                { id: n.id, country: countryFromOrbId(n.id), publisher: '' },
                selectedGroup,
              ),
          ).length
    const shelved = isolated.filter((n) => matchesRegionGroup(n, selectedGroup)).length
    return { foldedCountries, shelved }
  }, [selectedGroup, disclosedGraph, isolated])

  // `scopeCounts` (ChipBar's per-family/level counts) went with it too.

  /**
   * The one family the filter is narrowed to, if it is narrowed to exactly
   * one — the trigger for the level recolour. Lived inside the Hud while the
   * recolour was sidebar-only; lifted to App now that the 3D scene recolours
   * too (Q8, built with the chip bar): the spheres and the flyout legend have
   * to read the same mapping or the legend is a lie.
   */
  const focusedFamily = useMemo(() => {
    if (!filter.scopes || filter.scopes.length === 0) return null
    const families = new Set(
      filter.scopes.map(
        (s) => SCOPE_GROUPS.find((g) => g.scopes.includes(s))?.country,
      ),
    )
    return families.size === 1 ? ([...families][0] ?? null) : null
  }, [filter.scopes])

  /**
   * Scope → loud distinct colour, for the single-family view. Null whenever
   * more than one family is on screen, which is what keeps a colour from ever
   * meaning two things at once: the spread palette only exists while there is
   * no other family left to clash with.
   */
  const levelColours = useMemo(() => {
    if (!focusedFamily) return null
    const group = SCOPE_GROUPS.find((g) => g.country === focusedFamily)
    return group ? focusPalette(group.scopes) : null
  }, [focusedFamily])

  const commercialCount = useMemo(
    () => graph.nodes.filter((n) => !isOfficial(n)).length,
    [graph],
  )

  // Counted over the whole graph, like scopeCounts, so a domain's number does
  // not collapse to zero the moment you filter by it.
  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const n of graph.nodes) {
      for (const d of n.domains ?? []) counts[d] = (counts[d] ?? 0) + 1
    }
    return counts
  }, [graph])

  /**
   * Which HUD panels are showing — the menu bar's model (Phase 4 §6).
   *
   * **Superseded 2026-08-22 (item 5z).** All eight used to start hidden; now
   * all eight start ON but each opens in its own collapsed/minimized inner
   * state (see `PANELS_DEFAULT`'s own comment in `MenuBar.tsx` for the full
   * story and Thomas's screenshot that prompted it). The tier bar is still
   * not in here on purpose — it is primary navigation, not a panel, and its
   * status line is the only signal that a filter is on. See `MenuBar.tsx`
   * for that argument in full.
   *
   * Persisted, because the alternative is re-opening the same panels every
   * single load, and `Onboarding` already establishes localStorage as the
   * place this app remembers a preference. A parse failure or disabled
   * storage falls back to `PANELS_DEFAULT` (not `PANELS_HIDDEN`, 2026-08-22)
   * — a first-time visitor and a visitor whose storage just broke should see
   * the same thing, the ordinary fresh-load experience, not a bare canvas
   * with only the menu bar to explain it.
   */
  /**
   * Compact layout (2026-08-31, second audit F-12 — `lib/useCompactLayout.ts`
   * has the why). Below the breakpoint the four top-row panels lose their
   * tabs/pills and are opened from Panels ▾ submenus, one at a time: opening
   * one closes the others, because at ≤1024px two of them cannot share the
   * row without the exact overlap the dev tripwire below exists to catch.
   * Not persisted — it is a property of the window, not a preference.
   */
  const compact = useCompactLayout()
  const [compactOpen, setCompactOpen] = useState(COMPACT_OPEN_NONE)
  const setCompactPanel = useCallback((key: CompactPanelKey, open: boolean) => {
    setCompactOpen((prev) =>
      open ? { ...COMPACT_OPEN_NONE, [key]: true } : { ...prev, [key]: false },
    )
  }, [])

  const [panels, setPanels] = useState<PanelVisibility>(() => {
    try {
      // A starred view carries its own panel set and outranks the standalone
      // key — otherwise loading "my working setup" would restore its sliders
      // and filters but leave whatever panels happened to be open last time.
      if (STARTUP_VIEW) return STARTUP_VIEW.panels
      const raw = window.localStorage.getItem(PANELS_KEY)
      if (!raw) return PANELS_DEFAULT
      const saved = JSON.parse(raw) as Partial<PanelVisibility>
      // Merged over PANELS_HIDDEN, not PANELS_DEFAULT, so a key added to
      // PanelVisibility AFTER someone already saved a preference stays off
      // for them rather than suddenly appearing unasked — only a session
      // with NO stored preference at all (the branch above) gets the new
      // all-on default.
      return { ...PANELS_HIDDEN, ...saved }
    } catch {
      return PANELS_DEFAULT
    }
  })
  useEffect(() => {
    try {
      window.localStorage.setItem(PANELS_KEY, JSON.stringify(panels))
    } catch {
      // Nothing to do; the panels simply start hidden again next load.
    }
  }, [panels])
  // 2026-08-21, full-review item 5: toggling ANY panel by hand — including
  // Reports itself — always lands on the normal Reports body, never
  // mid-list. Only `openUnlinkedList` below (the shelf pill, or a future
  // deep link) opens straight into the Unlinked list; a manual toggle is a
  // request for "the panel", not "whatever it last showed".
  const togglePanel = (key: PanelKey) => {
    setPanels((p) => ({ ...p, [key]: !p[key] }))
    if (key === 'reports') setUnlinkedOpen(false)
  }

  /**
   * The Unlinked shelf's own open/closed state (2026-08-21, full-review item
   * 5). Lives here, not inside `Hud` or `IsolatedShelf`, because the pill
   * that opens it (bottom dock) and the list that shows it (Reports panel)
   * are siblings, not parent/child — see the dock's render site and Hud's
   * `unlinkedOpen` prop below.
   */
  const [unlinkedOpen, setUnlinkedOpen] = useState(false)

  /**
   * The compact shelf pill was clicked. Opens the Reports panel if it was
   * closed (the list lives inside it — see the review's own framing, "opens
   * a searchable list in the Reports panel") and switches that panel to the
   * Unlinked list. `setPanels` only writes when Reports was actually closed,
   * so this never fights the persisted-panels effect on the common case
   * where Reports is already open.
   */
  const openUnlinkedList = useCallback(() => {
    setPanels((p) => (p.reports ? p : { ...p, reports: true }))
    setUnlinkedOpen(true)
  }, [])

  /**
   * DEV-ONLY overlap tripwire (2026-08-21, full-review item 2). §7's "no
   * reserved coordinates" trap bullet collected four real overlap bugs as
   * prose; this turns it into a runtime check. Every few seconds in dev,
   * walk the `position: fixed` elements and warn when two of them
   * intersect. Skips: anything inside the bottom dock (grid cells cannot
   * overlap — and the dock wrapper itself IS fixed, so it would intersect
   * everything), dialogs/overlays that legitimately cover the screen
   * (role="dialog", or >60% of the viewport, e.g. the loading curtain), and
   * invisible/zero-size elements. Compiled out of production builds
   * entirely by the `import.meta.env.DEV` guard.
   */
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const check = () => {
      const fixed = [...document.querySelectorAll<HTMLElement>('body *')].filter((el) => {
        const cs = getComputedStyle(el)
        if (cs.position !== 'fixed' || cs.visibility === 'hidden' || cs.display === 'none') return false
        if (cs.pointerEvents === 'none') return false
        if (el.closest('[data-bottom-dock]')) return false
        if (el.closest('[role="dialog"]')) return false
        const r = el.getBoundingClientRect()
        if (r.width < 2 || r.height < 2) return false
        if (r.width * r.height > window.innerWidth * window.innerHeight * 0.6) return false
        return true
      })
      for (let i = 0; i < fixed.length; i++) {
        for (let j = i + 1; j < fixed.length; j++) {
          if (fixed[i].contains(fixed[j]) || fixed[j].contains(fixed[i])) continue
          const a = fixed[i].getBoundingClientRect()
          const b = fixed[j].getBoundingClientRect()
          const overlap = a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom
          if (overlap) {
            console.warn(
              '[layout] two fixed panels overlap — the §7 trap, live:',
              fixed[i], `[${Math.round(a.left)},${Math.round(a.top)} ${Math.round(a.width)}×${Math.round(a.height)}]`,
              fixed[j], `[${Math.round(b.left)},${Math.round(b.top)} ${Math.round(b.width)}×${Math.round(b.height)}]`,
            )
          }
        }
      }
    }
    const id = window.setInterval(check, 4000)
    return () => window.clearInterval(id)
  }, [])

  /**
   * Saved views — Phase 4 §7.1.
   *
   * Read once, lazily, so the startup view is applied in the SAME render that
   * mounts the graph. Applying it in an effect instead would lay the default
   * graph out first and then rebuild it, which is both a wasted warmup and a
   * visible lurch — and at 1,250 nodes the warmup is the expensive thing on
   * the whole page. See `savedViews.ts` for why `openOnLoad` is the point of
   * the feature rather than a garnish.
   */
  const [viewStore, setViewStore] = useState<SavedViewStore>(() => loadViews())
  const applyView = (v: SavedView) => {
    setDrilldown(v.drilldown)
    setOpenedCountries(new Set(v.openedCountries ?? []))
    setView(v.view)
    setFilter(v.filter)
    setSelectedId(v.selectedId)
    setPanels(v.panels)
    // Not `setResetSignal` — that snaps the camera to the reset pose, and a
    // saved view already implies a refit through the tier/spread path. Firing
    // both would fight.
  }

  const saveCurrentView = (name: string) => {
    const v: SavedView = {
      id: newViewId(),
      name,
      savedAt: new Date().toISOString().slice(0, 10),
      openedCountries: [...openedCountries],
      drilldown,
      view,
      filter,
      selectedId,
      panels,
    }
    setViewStore((s) => {
      const next = { ...s, views: [...s.views, v] }
      persistViews(next)
      return next
    })
  }

  const deleteView = (id: string) => {
    setViewStore((s) => {
      const next = {
        ...s,
        views: s.views.filter((v) => v.id !== id),
        openOnLoad: s.openOnLoad === id ? null : s.openOnLoad,
      }
      persistViews(next)
      return next
    })
  }

  const setOpenOnLoad = (id: string | null) => {
    setViewStore((s) => {
      const next = { ...s, openOnLoad: id }
      persistViews(next)
      return next
    })
  }

  /**
   * Lifted once the renderer says the layout has stopped moving and been
   * framed. `LoadingCurtain` owns the safety timeout, so a signal that never
   * arrives cannot trap anyone behind it.
   */
  const [graphReady, setGraphReady] = useState(false)

  /** Bumped by Help ▸ How to use; `Onboarding` watches it. See that file. */
  const [howToRequest, setHowToRequest] = useState(0)
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onPointerMove={trackPointer}
      // The theme attribute the UI chrome hangs off — see lib/uiTheme.ts.
      // Only 'dark' exists since blueprint's deletion (2026-08-19); the
      // attribute stays because every panel styles itself through the
      // variables it selects.
      data-theme="dark"
    >
      <style>{THEME_CSS}</style>
      <Canvas
        camera={{ position: [0, 0, 700], fov: FOV, near: 1, far: 12000 }}
        gl={{ antialias: true }}
        // The background is CSS on the canvas element, not a scene colour —
        // the GL buffer is transparent, so this one style IS the theme switch
        // for the ground everything sits on.
        style={{
          background: SCENE_BACKGROUND,
          cursor: hovered ? 'pointer' : 'default',
        }}
        // Fires when a click hits nothing in the scene. Clearing here rather
        // than on the canvas element means orbiting over empty space, which
        // also ends in a click, is handled by R3F's own drag threshold.
        // A click that hit no geometry first asks the edge picker whether a
        // line runs within a few pixels — a 1.6px cylinder is not a target
        // anyone hits by raycast (see registerEdgePicker in InfluenceGraph).
        // Only a genuinely empty click clears the selections.
        //
        // No longer clears `selectedGroupId` here (2026-08-21 — Thomas: "I
        // pick a region from GroupsPanel, click the graph to get the menu
        // out of the way, and it goes back to the reset view"). `GroupsPanel`
        // closes itself on any outside `pointerdown` (its own window
        // listener), and that same physical click almost always lands on
        // the canvas underneath — so an isolate built one click ago was
        // being destroyed by the very click meant only to dismiss the menu.
        // A group isolate is a deliberate, named state: it exits on the
        // panel's own "Clear" button,
        // re-picking the same group (the existing toggle-off), or Escape's
        // priority stack (still last in line, see that effect's comment) —
        // never as a side effect of clicking around the scene.
        onPointerMissed={(e) => {
          const key = edgePicker.current?.(e.clientX, e.clientY) ?? null
          if (key) {
            // Always OPEN, never toggle: this handler can fire more than
            // once for a single click, and a toggle self-cancels — the card
            // opened and closed in the same frame, which read as a dead
            // click. Closing is Esc or a click in genuinely empty space;
            // the direct-raycast path (pulses, trunks) keeps its toggle in
            // onSelectEdge, which fires exactly once.
            setSelectedEdgeKey(key)
            return
          }
          setSelectedId(null)
          setSelectedEdgeKey(null)
        }}
      >
        {/*
          The lighting rig, rebuilt 2026-08-19 (Phase 4 §2.1 — the mechanical
          half of "cartoony, flat, no style").

          The old rig was two POINT lights placed when the scene held ~120
          nodes: the key sat ~590 units from the origin inside a cloud that
          now measures ~3,000, with default inverse-square decay. Result: no
          consistent light direction anywhere (near-side nodes lit one way,
          far-side the opposite, centre from within), and the far half of the
          graph received ~1/80th of the key — lit by ambient alone, which is
          directionless, so those nodes were flat discs literally. Same class
          of bug as the 0.08px edges: a constant outgrown by the corpus.

          DIRECTIONAL lights fix both by construction — one direction for the
          whole scene, no falloff — and are scale-invariant, so the corpus
          cannot outgrow them again. A directional light's `position` is just
          the direction it shines FROM (toward the origin); magnitude is
          meaningless. Ambient drops 0.5 → 0.28 because its job (filling the
          falloff hole) no longer exists; what remains only keeps the dark
          side of each sphere off pure black. Numbers seeded from the brief's
          own reverted experiment — judged there only in a 4× software crop,
          so tune on real hardware by eye, not here by arithmetic.
        */}
        <ambientLight intensity={0.28} />
        <directionalLight position={[0.6, 0.8, 1]} intensity={2.2} />
        {/* Cool fill from behind-below, opposing the key so the terminator
            stays readable during a full orbit rather than only from the
            opening angle. */}
        <directionalLight position={[-0.5, -0.3, -1]} intensity={0.7} color="#4a6fb5" />

        {/*
          SpaceFrame (the wireframe bounding box) and the ground grid were
          deleted 2026-08-12 — Thomas: "don't keep the code". Environment now
          carries only the optional horizon, which needs nothing measured, so
          it no longer waits on `bounds`.
        */}
        <Environment view={view} />

        <InfluenceGraph
          graph={disclosedGraph}
          labelled={labelled}
          view={view}
          resetSignal={resetSignal}
          focus={focus}
          visible={visible}
          isolatedCountry={isolatedCountry}
          flyTo={flyTo}
          levelColours={levelColours}
          onHover={setHovered}
          onSelect={(id) => {
            // Same fix as `onPointerMissed` just above, same day: a node
            // click used to nuke an active group isolate unconditionally,
            // even though `visible` already restricts clickable nodes to
            // `groupFocus` while one is active — so in practice every node
            // reachable by this click already lives inside the isolate, and
            // there was never a real "selected something outside it" case
            // to guard against. Mirrors `handleChoose`'s search-panel fix
            // from the same review round: selection and group isolate are
            // allowed to coexist, and only an id genuinely outside the
            // current group clears it — which a raycast hit off the visible
            // set cannot produce today, but the check costs nothing and
            // keeps this correct if that ever changes.
            if (groupFocus && id !== null && !groupFocus.nodes.has(id)) setSelectedGroupId(null)
            setSelectedId(id)
          }}
          onSelectEdge={(key) =>
            setSelectedEdgeKey((current) => (current === key ? null : key))
          }
          registerEdgePicker={(pick) => {
            edgePicker.current = pick
          }}
          onReady={() => setGraphReady(true)}
          onBounds={handleBounds}
          onToggleNode={handleToggleNode}
        />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          autoRotate={view.autoRotate}
          autoRotateSpeed={0.45}
        />

        <CameraZoom
          zoom={view.zoom}
          fitDistance={bounds?.fitDistance ?? 0}
          onZoomChange={handleZoomChange}
        />

        {/*
          Glow (bloom) was a slider here through 2026-08-25, when Thomas had
          it removed outright as pointless: "the glow slider works but I
          think the glow is pointless and should be taken off." Intensity is
          now hardcoded to 0 — permanently off, not just defaulted off.

          The `<EffectComposer>` stays mounted anyway, for `PngExport.tsx`'s
          sake: unmounting it re-routes the whole render (with a composer the
          scene goes through an offscreen buffer with its own colour
          handling; without one it draws straight to the canvas), which
          shifts the background tint of the entire scene. Keeping the
          pipeline fixed, with bloom simply inert, avoids that.
        */}
        <EffectComposer ref={composerRef}>
          <Bloom
            intensity={0}
            luminanceThreshold={1}
            luminanceSmoothing={0.35}
            radius={0.62}
            mipmapBlur
          />
        </EffectComposer>

        {/*
          Item 12, 2026-08-20 — export a PNG at 2x with no HUD. Needs the
          composer's own ref (just above) to keep bloom's buffers in sync
          with the temporarily-doubled pixel ratio — see PngExport.tsx's
          file-level comment for exactly why. No visible output of its own;
          it only acts when `exportRequest` is bumped.
        */}
        <PngExport request={exportRequest} composerRef={composerRef} />
      </Canvas>

      {/*
        The menu bar (Phase 4 §6). Rendered before every panel it governs so it
        reads first in the DOM as well as on screen — a screen reader arriving
        at a graph with all six panels hidden should meet the control that
        brings them back, not the canvas.
      */}
      <MenuBar
        panels={panels}
        onToggle={togglePanel}
        // Was a hand-written all-true literal; now just `PANELS_DEFAULT`
        // (2026-08-22) — the exact same state a fresh session starts from,
        // so there is one all-on literal in the codebase, not two that could
        // quietly drift apart the next time a panel key is added.
        onShowAll={() => setPanels(PANELS_DEFAULT)}
        onHideAll={() => {
          setPanels(PANELS_HIDDEN)
          setUnlinkedOpen(false)
        }}
        onHowTo={() => setHowToRequest((n) => n + 1)}
        onHelp={() => setHelpOpen(true)}
        views={viewStore.views}
        openOnLoad={viewStore.openOnLoad}
        onSaveView={saveCurrentView}
        onApplyView={(id) => {
          const v = viewStore.views.find((x) => x.id === id)
          if (v) applyView(v)
        }}
        onDeleteView={deleteView}
        onSetOpenOnLoad={setOpenOnLoad}
        compact={compact}
        compactOpen={compactOpen}
        onCompactOpen={setCompactPanel}
        onCopyLink={() =>
          buildDeepLink({
            drilldown,
            openedCountries: [...openedCountries],
            view,
            filter,
            selectedId,
            selectedGroupId,
          })
        }
      />

      {/* defaultCollapsed (2026-08-22, item 5z): the panel now mounts as soon
          as panels.view is true (the fresh-session default), so it needs its
          own collapsed-tab starting state — the outer `panels.view` boolean
          only controls whether this exists at all, not whether it opens wide
          or as a tab. */}
      {panels.view && (
      <PanelShell
        side="right"
        label="View"
        width={190}
        defaultCollapsed
        hideTab={compact}
        collapsed={compact ? !compactOpen.view : undefined}
        onCollapsedChange={compact ? (c) => setCompactPanel('view', !c) : undefined}
      >
        <ViewControls
          view={view}
          onChange={setView}
          hasSelection={!!selected}
          onReset={handleReset}
          onExportPng={() => setExportRequest((n) => n + 1)}
          tier={drilldown}
          intCondensed={intCondensed}
          onCondenseInt={handleCondenseInt}
        />
      </PanelShell>
      )}

      {panels.find && (
        <SearchPanel
          graph={graph}
          onChoose={handleChoose}
          onChooseGroup={handleChooseGroup}
          groups={SEARCHABLE_GROUPS}
          selectedGroupId={selectedGroupId}
          outsideIsolate={searchOutsideIsolate}
          outsideFilter={searchOutsideFilter}
          compact={compact}
          minimized={compact ? !compactOpen.find : undefined}
          onMinimizedChange={compact ? (m) => setCompactPanel('find', !m) : undefined}
        />
      )}

      {/*
        THE BOTTOM DOCK (2026-08-21, full-review item 2). One fixed, full-width
        container now owns the entire bottom edge; every bottom panel is a
        child of one of its three cells instead of planting its own
        `position: fixed` coordinates. Before this, five hand-placed panels
        shared the edge by eye, and the §7 "no reserved coordinates" trap
        collected four real casualties (Compare/tier-bar pre-ship, Reports/
        tier-bar 5i, and the review's Compare-pill-unclickable and
        Legend-covers-shelf overlaps at ≤1400px widths). A grid row cannot
        overlap its own cells, at any window width, so that whole bug class
        dies here rather than being patched pair by pair.

        Grid `1fr minmax(0, auto) 1fr`: tier bar left, the three pills
        dead-centre (exact centring regardless of the side cells' widths —
        flex `space-between` would drift off-centre because the tier bar and
        shelf are different widths), shelf right. `alignItems: 'end'` bottoms
        every cell on the same line, so an expanded panel grows UPWARD from
        the shared baseline, pushing nothing. The centre cell wraps its pills
        when a squeezed window leaves too little room (`minmax(0, auto)` is
        what lets the track actually compress). The dock itself is
        `pointerEvents: 'none'` so the empty strip between panels stays
        drag-through to the canvas; each panel wrap re-enables its own events.
      */}
      <div style={bottomDock} data-bottom-dock>
        <div style={bottomDockLeft}>
          <TierBar
            tier={drilldown}
            onTier={handleTier}
            inTier={tierCounts.inTier}
            visibleCount={tierCounts.visible}
            total={graph.nodes.length}
            autoUnfoldActive={autoUnfoldActive}
            onToggleAutoUnfold={handleToggleAutoUnfold}
            autoUnfoldDone={autoUnfoldDone}
          />
        </div>
        <div style={bottomDockCentre}>
          {panels.compare && (
            <Compare
              graph={graph}
              disclosedGraph={disclosedGraph}
              drilldown={drilldown}
              openedCountries={openedCountries}
              focusIndex={unfilteredFocusIndex}
            />
          )}
          {panels.groups && (
            <GroupsPanel
              selectedGroupId={selectedGroupId}
              onChoose={handleChooseGroup}
              shownCount={groupFocus ? tierCounts.visible : null}
              foldedCountries={groupWhySoFew?.foldedCountries ?? 0}
              shelvedCount={groupWhySoFew?.shelved ?? 0}
            />
          )}
          {panels.legend && <Legend />}
          <OpenedCountriesPanel
            openedCountries={openedCountries}
            onFold={handleFoldCountry}
            onFoldAll={handleFoldAllCountries}
          />
        </div>
        <div style={bottomDockRight}>
          {panels.unlinked && (
            <IsolatedShelf reports={isolated} onOpen={openUnlinkedList} />
          )}
        </div>
      </div>

      <Onboarding openRequest={howToRequest} tier={drilldown} />
      {helpOpen && <HelpCard onClose={() => setHelpOpen(false)} />}

      {/*
        Bottom edge, and collapsed by default. It answers a question nobody has
        while first looking at the graph — the shape comes first and the timing
        second — so it costs one click to open and nothing at all to ignore.
      */}
      {panels.calendar && (
        <CalendarPanel
          graph={graph}
          dependencies={dependencies}
          within={predicate}
          onChoose={handleChoose}
          compact={compact}
          collapsed={compact ? !compactOpen.calendar : undefined}
          onCollapsedChange={compact ? (c) => setCompactPanel('calendar', !c) : undefined}
        />
      )}

      {/* defaultCollapsed — see the same note on the View PanelShell above. */}
      {panels.reports && (
      <PanelShell
        side="left"
        label="Reports"
        width={320}
        defaultCollapsed
        hideTab={compact}
        collapsed={compact ? !compactOpen.reports : undefined}
        onCollapsedChange={compact ? (c) => setCompactPanel('reports', !c) : undefined}
      >
        <Hud
          nodeCount={graph.nodes.length}
          edgeCount={graph.edges.length}
          visibleNodeCount={visible ? visible.nodes.size : graph.nodes.length}
          visibleEdgeCount={visible ? visible.edges.size : graph.edges.length}
          top={top}
          domainCounts={domainCounts}
          onToggleDomain={toggleDomain}
          commercialCount={commercialCount}
          filter={filter}
          onToggleCommercial={() =>
            setFilter((f) => ({ ...f, showCommercial: !f.showCommercial }))
          }
          onClearFilter={() => setFilter(NO_FILTER)}
          selected={selected}
          builtFromCount={focus?.builtFrom.size ?? 0}
          feedsIntoCount={focus?.feedsInto.size ?? 0}
          isolated={isolated}
          unlinkedOpen={unlinkedOpen}
          onOpenUnlinked={() => setUnlinkedOpen(true)}
          onCloseUnlinked={() => setUnlinkedOpen(false)}
          onSelectIsolated={handleSelectIsolated}
          onHoverIsolated={setHovered}
          selectedId={selectedId}
        />
      </PanelShell>
      )}

      {/*
        Hover shows an identity CHIP; the full card moved to the click (Phase
        4 §4.2, 2026-08-19). Showing the whole Detail in both places was the
        kind of duplicate encoding this project already deleted twice (the
        arrowheads, the jurisdiction glyphs) — and the full card following the
        cursor was most of why hovering felt heavier than clicking.
      */}
      <div ref={tooltipRef} style={{ ...tooltip, opacity: hovered ? 1 : 0 }}>
        {hovered && <HoverChip report={hovered} />}
      </div>

      {/*
        The selection card — slides in from the right on click, out on clear
        (Esc / empty space / clicking the selection again). `cardReport` holds
        the LAST selected report so the card keeps its content while sliding
        away, instead of blanking mid-exit. Sits left of the View panel's
        column, above the shelf.
      */}
      <div style={{ ...selectionCard, transform: selected ? 'translateX(0)' : 'translateX(620px)' }}>
        {cardReport && (
          <Detail report={cardReport} graph={disclosedGraph} disclosure={disclosure} />
        )}
      </div>

      {/*
        The edge evidence card — the graph finally showing its working (Phase
        4 §5). Every dependency carries a basis (usually a verbatim quote), an
        evidence URL, a relationship type and a reference period, and until
        now NONE of it reached the renderer: the material the whole evidence
        rule is built on was loaded, used to build the graph, and thrown away
        before drawing. Slides from the LEFT: right is what a node is, left is
        why an edge exists.
      */}
      <div
        style={{
          ...edgeCardFrame,
          transform: selectedEdgeKey ? 'translateX(0)' : 'translateX(-780px)',
        }}
      >
        {edgeCard && (
          <EdgeEvidence deps={edgeCard.deps} graph={graph} disclosed={disclosedGraph} />
        )}
      </div>

      {/*
        The page frame (round 10): a crisp 1px glassy line at the viewport
        edge, with #0066CC fading inward to the background over ~38px — the
        "frosted" edge. Pure paint: pointer-transparent, so it costs nothing
        to interaction, and inset shadows fade to transparent, so the same
        two variables read correctly over the dark scene.
        Above every panel (they run zIndex 5–30) so the frost washes over
        whatever reaches the edge; below the onboarding dialog at 40.
      */}
      {/*
        The loading curtain. Rendered above every panel but BELOW the onboarding
        dialog's 40 — no: above it, at 45. The onboarding card explains a graph;
        showing it over a blank settling scene teaches nothing, so the curtain
        covers it and the card is there when the curtain lifts.
      */}
      <LoadingCurtain ready={graphReady} reportCount={graph.nodes.length} error={corpusError} />

      <div aria-hidden style={pageFrame} />
    </div>
  )
}

const pageFrame: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 38,
  boxShadow:
    'inset 0 0 0 1px var(--frame-line), inset 0 0 38px 8px var(--frame-glow)',
}

/** Human labels for the four relationship types. Display-only — the union in
 * types.ts stays the identifier vocabulary. */
const REL_LABEL: Record<string, string> = {
  calculated_from: 'calculated from',
  uses_data_from: 'uses data from',
  methodology_depends_on: 'methodology depends on',
  cites: 'cites',
}

/**
 * The evidence behind one drawn line.
 *
 * One line can stand for up to 57 documented dependencies (a tier-1 trunk),
 * so this is a LIST by construction. Each row is one Dependency: which real
 * report rests on which (the pre-disclosure endpoints — the drawn line may
 * end at an orb, the evidence never does), the relationship type, the
 * reference period where one is stated, the basis — usually a verbatim quote
 * from the source document — and the primary-source link it was read from.
 */
function EdgeEvidence({
  deps,
  graph,
  disclosed,
}: {
  deps: DisclosedDependency[]
  /** The FULL corpus graph — original endpoint ids resolve here even when the
   * drawn line ends at an orb that folded them away. */
  graph: ReturnType<typeof buildGraph>
  disclosed: ReturnType<typeof buildGraph>
}) {
  const head = deps[0]
  if (!head) return null
  const visualFrom =
    disclosed.byId.get(head.source_report_id) ?? graph.byId.get(head.source_report_id)
  const visualTo =
    disclosed.byId.get(head.target_report_id) ?? graph.byId.get(head.target_report_id)

  return (
    <>
      <div style={edgeCardHeading}>Why this line exists</div>
      <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>
        <span style={{ color: visualFrom ? colourForReport(visualFrom) : 'var(--ink-body)' }}>
          {visualFrom?.title ?? head.source_report_id}
        </span>
        <span style={{ color: 'var(--ink-dim)', fontWeight: 400 }}> rests on </span>
        <span style={{ color: visualTo ? colourForReport(visualTo) : 'var(--ink-body)' }}>
          {visualTo?.title ?? head.target_report_id}
        </span>
      </div>
      {deps.length > 1 && (
        <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', marginTop: 4 }}>
          One drawn line standing for {deps.length} documented dependencies.
        </div>
      )}
      {deps.map((d, i) => {
        const from = graph.byId.get(d.original_source_id ?? d.source_report_id)
        const to = graph.byId.get(d.original_target_id ?? d.target_report_id)
        const period = describePeriod(d.reference_period)
        return (
          <div key={i} style={evidenceRow}>
            {deps.length > 1 && (
              <div style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.35 }}>
                <span style={{ color: from ? colourForReport(from) : 'var(--ink-body)' }}>
                  {from?.title ?? d.original_source_id}
                </span>
                <span style={{ color: 'var(--ink-dim)', fontWeight: 400 }}> rests on </span>
                <span style={{ color: to ? colourForReport(to) : 'var(--ink-body)' }}>
                  {to?.title ?? d.original_target_id}
                </span>
              </div>
            )}
            <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', marginTop: 2 }}>
              {REL_LABEL[d.relationship_type] ?? d.relationship_type}
              {period && <span style={{ color: 'var(--ink-gold)' }}> · reads {period}</span>}
            </div>
            {/* The basis — the reason this edge is believed to exist, in the
                source's own words wherever the researcher could quote them.
                This is the field the standing rule is made of. */}
            <div style={basisQuote}>“{d.basis}”</div>
            {d.evidence_url && (
              <a
                href={d.evidence_url}
                target="_blank"
                rel="noreferrer"
                style={evidenceLink}
                title={d.evidence_url}
              >
                primary source ↗
              </a>
            )}
          </div>
        )
      })}
      <div style={{ fontSize: 10, color: 'var(--ink-faint)', marginTop: 10, lineHeight: 1.5 }}>
        Every edge in this graph carries a document. This card is that rule,
        visible.
      </div>
    </>
  )
}

/**
 * The hover identity chip — just enough to know what you are pointing at and
 * that clicking does something: flag, title, publisher · region, and the
 * affordance line. Everything else lives in the click card (`Detail`).
 */
function HoverChip({ report }: { report: ScoredReport }) {
  const colour = colourForReport(report)
  return (
    <>
      <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
        <Flag country={report.country} />
        <div
          style={{ fontSize: 13, fontWeight: 600, color: colour, lineHeight: 1.3, flex: 1 }}
        >
          {report.title}
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 3 }}>
        {report.publisher} · {report.region}
      </div>
      <div style={{ fontSize: 10, color: 'var(--ink-faint)', marginTop: 5 }}>
        Click to trace its chain and open the full card.
      </div>
    </>
  )
}

/** The full report card — slides in from the right on selection (Phase 4
 * §4.2). Was the hover card until 2026-08-19; hover now shows `HoverChip`. */
/**
 * The display form of a report's URL: its host, without `www.`.
 *
 * Falls back to the raw string if the URL will not parse — better a long ugly
 * link than a card that renders nothing where a link should be.
 */
function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return url
  }
}

function Detail({
  report,
  graph,
  disclosure,
}: {
  report: ScoredReport
  graph: ReturnType<typeof buildGraph>
  /** Corpus-wide disclosure counts, keyed by report id. See `Disclosure`. */
  disclosure: Map<string, Disclosure>
}) {
  const colour = colourForReport(report)
  const official = isOfficial(report)
  const feeds = dependents(graph, report.id)
  const built = dependsOn(graph, report.id)

  // Absent releases_per_year is the one-off-foundational-instrument shape
  // (Research.1.md §4, 2026-08-08) — a treaty, a trade deal, a piece of
  // government policy or regulation with no next edition. describeRate takes
  // a rate to describe; there isn't one here, so this is not delegated to it.
  const cadence =
    report.releases_per_year !== undefined
      ? describeRate(report.releases_per_year)
      : 'once, as a standing instrument'
  // Shown only when it differs. For most releases the number moves whenever the
  // document appears, and saying so twice would be noise; the prime rate, which
  // is published weekly and changes eight times a year, is the case worth the
  // extra line.
  const changes =
    report.changes_per_year !== undefined &&
    report.releases_per_year !== undefined &&
    report.changes_per_year !== report.releases_per_year
      ? describeRate(report.changes_per_year)
      : null

  // Reference periods live on the edge, so they are read from the graph rather
  // than the node — the same release is read by its dependents on different
  // rhythms, which is the whole reason the field sits where it does.
  const builtFromEdges = graph.edges.filter((e) => e.source_report_id === report.id)

  // Containment. Rendered because `part_of` would otherwise be a field nothing
  // draws, and this project has already paid for one of those — `country` was
  // wrong on nine nodes for five sessions because nothing showed it.
  //
  // The reason it earns space rather than sitting in the data is that the split
  // is large and invisible: measured on this one pair, the containing release
  // reads 0.46 where the merged programme reads 0.84. A reader who cannot see
  // that two spheres are one masthead reads the lower number as the programme's
  // weight and is wrong by nearly half.
  const next = nextRelease(report)

  const parent = report.part_of ? graph.byId.get(report.part_of) : undefined
  const parts = contains(graph, report.id)
  const rolledUp = parts.length > 0 ? rolledUpAuthority(graph, report.id) : null

  return (
    <>
      {/*
        The flag carries `country`, which is the one attribute in this model with
        a documented history of being silently wrong: it was typed 'CA' | 'US'
        with no value for "neither", so every international body was recorded as
        Canadian for five sessions, undetected because nothing drew it. Putting it
        at the top of the card is the cheapest available guard against a repeat.
      */}
      <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
        <Flag country={report.country} />
        <div
          style={{ fontSize: 14, fontWeight: 600, color: colour, lineHeight: 1.3, flex: 1 }}
        >
          {report.title}
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 3 }}>
        {report.publisher} · {report.region} · published {cadence}
        {changes && <span style={{ color: 'var(--ink-gold)' }}> · changes {changes}</span>}
      </div>
      {/*
        The report's own URL (Thomas, 2026-08-19). Every node in this corpus is
        a real published document and every one of them carries the address it
        was verified at — the field was loaded, validated by `check-urls`, and
        then never drawn, which is the same "a field nothing draws is a field
        nobody checks" argument that put `part_of` and `terminal_reason` on this
        card. The card's job is to answer "what is this?", and "go and read it"
        is the end of that answer.

        The host is shown rather than the full address: a UN or EUR-Lex URL runs
        past 120 characters and would wrap to three lines above the authority
        figure, and the title directly above already says which document this
        is. `new URL()` is in a try because a malformed entry in a 1,250-node
        corpus should cost this one line, not the whole card.
      */}
      {report.url && (
        <div style={{ fontSize: 11, marginTop: 4 }}>
          <a
            href={report.url}
            target="_blank"
            rel="noreferrer"
            title={report.url}
            style={{ color: 'var(--ink-gold)', textDecoration: 'none' }}
          >
            {hostOf(report.url)} ↗
          </a>
        </div>
      )}
      {/*
        Phase, where it is known. A rate says how often and never says when, and
        "next 17 August" is the thing anyone reading a cadence actually wanted.
        Absent on most nodes for now, and silent when absent rather than saying
        "unknown" on four hundred cards.
      */}
      {next && (
        <div style={{ fontSize: 11, color: 'var(--ink-label)', marginTop: 3 }}>
          next {describeWindow(next.from, next.to, next.precision)}
          {next.evidence === 'implied' && (
            <span style={{ color: '#8a7ab5' }}> · inferred, not published</span>
          )}
        </div>
      )}
      {parent && (
        <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', marginTop: 5, lineHeight: 1.5 }}>
          A series published inside{' '}
          <span style={{ color: colourForReport(parent) }}>{parent.title}</span>. Its
          authority below is its own, not the release's — the two are separate
          spheres for one programme.
        </div>
      )}
      {rolledUp !== null && (
        <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', marginTop: 5, lineHeight: 1.5 }}>
          Also publishes{' '}
          {parts.map((p, i) => (
            <span key={p.id}>
              {i > 0 && ', '}
              <span style={{ color: colourForReport(p) }}>{p.title}</span>
            </span>
          ))}
          , held separately. Everything under this masthead comes to{' '}
          <span style={{ color: 'var(--ink-gold)' }}>{rolledUp.toFixed(2)}</span>.
        </div>
      )}
      {report.cadence_note && (
        <div style={{ fontSize: 10.5, color: 'var(--ink-dim)', marginTop: 5, lineHeight: 1.5 }}>
          {report.cadence_note}
        </div>
      )}

      {!official && (
        <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', marginTop: 6, lineHeight: 1.5 }}>
          Commercial source. Published, paywalled, and named by the documents
          that use it — but outside the authority ranking, so it accrues no
          size from what depends on it.
        </div>
      )}

      {/*
        Termini are rendered for the same reason `part_of` is: the field exists to
        make something visible, and a field nothing draws is a field nobody
        checks. The sentence is specific to the kind, because "this chain stops"
        is not the finding — *why* it stops is.
      */}
      {report.terminal_reason && (
        <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', marginTop: 6, lineHeight: 1.5 }}>
          {TERMINUS_NOTE[report.terminal_reason]} The chain ends here, so this
          node is outside the authority ranking and accrues no size from what
          depends on it.
        </div>
      )}

      <div style={{ fontSize: 12, color: 'var(--ink-mid)', marginTop: 10, lineHeight: 1.5 }}>
        {report.description}
      </div>

      <div style={statRow}>
        <Stat
          label="Authority"
          // Not "0.00" — that reads as a measured result rather than a question
          // the graph declines to ask of commercial sources. in_degree, next to
          // it, is where their real weight shows.
          value={official ? report.authority.toFixed(2) : '—'}
        />
        <Stat label="Depended on by" value={String(report.in_degree)} />
        <Stat label="Built from" value={String(report.out_degree)} />
      </div>

      {/*
        Per-grade edge counts — Midvamp round 2 (plan §3: "The node card
        always shows the per-grade edge counts ('A 3 · B 1 · C 7')").
        Counted over this report's OWN outgoing claims (`builtFromEdges`,
        already computed above for the "Built from" list below) rather than
        every edge touching the node either direction — this line answers
        "how well is what THIS report says it depends on actually checked",
        which is the question `evidence_grade` was added to answer. Absent
        `evidence_grade` reads as 'C' here, unlike the renderer's line
        styling (see EvidenceGrade in types.ts and `grade` in
        InfluenceGraph.tsx for why those two deliberately disagree) — this
        count is answering the schema's own question, not deciding what to
        draw, so it uses the schema's own "absent means C" convention.
      */}
      {builtFromEdges.length > 0 && (
        <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', marginTop: 6 }}>
          Evidence:{' '}
          {EVIDENCE_GRADES.map((g, i) => {
            const count = builtFromEdges.filter((e) => (e.evidence_grade ?? 'C') === g).length
            return (
              <span key={g}>
                {i > 0 && ' · '}
                {g} {count}
              </span>
            )
          })}
        </div>
      )}

      <DisclosureBlock disclosure={disclosure.get(report.id)} />

      {feeds.length > 0 && (
        <ListBlock title="Feeds into" items={feeds.map((r) => ({ text: r.title }))} />
      )}
      {built.length > 0 && (
        <ListBlock
          title="Built from"
          items={built.map((r) => {
            const edge = builtFromEdges.find((e) => e.target_report_id === r.id)
            return {
              text: r.title,
              aside: describePeriod(edge?.reference_period),
            }
          })}
        />
      )}
      {feeds.length === 0 && (
        <div style={{ fontSize: 11, color: 'var(--ink-dim)', marginTop: 10, fontStyle: 'italic' }}>
          Nothing in this graph depends on it — a terminal output.
        </div>
      )}
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 15, color: 'var(--ink-strong)' }}>{value}</div>
      <div
        style={{
          fontSize: 9.5,
          color: 'var(--ink-dim)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </div>
    </div>
  )
}

/**
 * When this report reads that one, in a few words.
 *
 * Returns null when no document states it, and the row then shows nothing at
 * all rather than "unknown" — an absent reference period is the ordinary case,
 * not a defect, and labelling five sixths of the list would drown the sixth
 * that carries real information.
 */
function describePeriod(period: ReferencePeriod | undefined): string | null {
  if (!period) return null

  const when = period.ends
    ? (() => {
        const [m, d] = period.ends!.split('-').map(Number)
        const month = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ][m - 1]
        return `${month} ${d}`
      })()
    : null

  if (period.window_months === 0) {
    return when ? `read at ${when}` : `read ${describeRate(period.readings_per_year)}`
  }
  const window =
    period.window_months === 1 ? '1 month' : `${period.window_months} months`
  return when ? `${window} to ${when}` : `${window}, rolling`
}

/**
 * How much of what this report is built from it is willing to name.
 *
 * `disclosureByReport` has existed in graph.ts since V0.11 and was imported by
 * nothing until now. Shipped 2026-08-10 (Thomas, Q14) ahead of the next
 * high-volume sweep, deliberately: the ratio is only meaningful where somebody
 * has already searched and come up short, so arriving after a sweep would mean
 * arriving into a graph where it is null nearly everywhere and reads as broken.
 *
 * **Silent when the ratio is null, which is most nodes.** Null does not mean
 * "fully disclosed" — it means nothing was searched for and not found, so
 * nobody has asked. Rendering a null as 100% would invert the reading and make
 * an unexamined report present as the most transparent thing on screen; that
 * distinction is the whole subtlety of the field and it dies here if the card
 * flattens it. So the block simply does not appear.
 *
 * `denied` and `leads` are shown even though neither is in the ratio, and they
 * are shown as different kinds of thing. A denial is a finding — a document
 * saying "this is not an input" is among the most valuable facts in the corpus.
 * A lead is our own backlog and says nothing about the publisher at all.
 */
function DisclosureBlock({ disclosure }: { disclosure: Disclosure | undefined }) {
  if (!disclosure || disclosure.ratio === null) return null
  const { documented, undisclosed, unpublishable, denied, leads, ratio } = disclosure
  const known = documented + undisclosed + unpublishable

  return (
    <div style={{ marginTop: 10 }}>
      <div style={section}>Disclosure</div>
      {/*
        A bar, because the number is a proportion and a proportion is the one
        thing a bar says faster than text. Amber for what is named, flat grey
        for what is not — deliberately not red: a publisher declining to name a
        source is a fact about the source, not a fault to be scored.
      */}
      <div
        style={{
          display: 'flex',
          height: 4,
          borderRadius: 2,
          overflow: 'hidden',
          background: '#232a38',
          margin: '3px 0 5px',
        }}
      >
        <div style={{ width: `${ratio * 100}%`, background: 'var(--ink-gold)' }} />
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--ink-mid)', lineHeight: 1.55 }}>
        Names {documented} of {known} inputs known to exist
        {undisclosed > 0 && `, ${undisclosed} stated by no document`}
        {unpublishable > 0 && `, ${unpublishable} that cannot be a node`}.
      </div>
      {denied > 0 && (
        <div style={{ fontSize: 11, color: '#7fa88b', lineHeight: 1.5, marginTop: 2 }}>
          {denied} relationship{denied === 1 ? '' : 's'} a document explicitly
          denies — a finding, not a gap.
        </div>
      )}
      {leads > 0 && (
        <div style={{ fontSize: 11, color: 'var(--ink-dim)', lineHeight: 1.5, marginTop: 2 }}>
          {leads} lead{leads === 1 ? '' : 's'} not yet researched — ours, not theirs.
        </div>
      )}
    </div>
  )
}

/**
 * Subject-matter filter.
 *
 * Unparked 2026-08-10 (Thomas, Q12), having been deferred on 8 and 9 August.
 * The brief was explicit that 24 domains is not 24 checkboxes, and that sorting
 * was wanted as much as filtering.
 *
 * **Collapsed to a single line until opened**, because this is a second filter
 * axis on a panel that already carries one, and the publisher scope is the axis
 * people reach for first. Domains that no node carries are not listed at all —
 * the union is open and half of it is unstaffed, so showing empty rows would
 * make the list twice as long and tell you nothing.
 *
 * The sort is the part worth arguing about. By count answers "what is this
 * corpus actually about", and the answer changes as it grows — it is a readout
 * on the shape of the research, not just an ordering. Alphabetical answers "is
 * the thing I want in here", which is the question you have when you already
 * know what you are looking for. Both are wanted, neither is the obvious
 * default, so it is a toggle and it defaults to count: the first time anyone
 * opens this, they do not yet know what is in it.
 */
function DomainPanel({
  counts,
  selected,
  onToggle,
}: {
  counts: Record<string, number>
  selected: readonly Domain[] | null
  onToggle: (domain: Domain) => void
}) {
  // Open by default since round 9 (Thomas: "can we leave the subjects open to
  // see in the left sidebar? there's no need to hide them like that"). The
  // original close-by-default guess predated the sidebar scrolling — chips
  // hidden to protect a panel that could overflow, in a panel that no longer
  // can. The header still collapses it for anyone who wants the quiet.
  const [open, setOpen] = useState(true)
  const [sort, setSort] = useState<'count' | 'name'>('count')

  const present = useMemo(
    () =>
      DOMAINS.filter((d) => (counts[d] ?? 0) > 0).sort((a, b) =>
        sort === 'count' ? (counts[b] ?? 0) - (counts[a] ?? 0) : a.localeCompare(b),
      ),
    [counts, sort],
  )
  if (present.length === 0) return null

  const on = (d: Domain) => !selected || selected.includes(d)
  const chosen = selected ? selected.length : present.length

  return (
    <div style={{ marginTop: 12, pointerEvents: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <div
          onClick={() => setOpen((o) => !o)}
          style={{ ...section, cursor: 'pointer', marginBottom: 0 }}
        >
          {open ? '▾' : '▸'} Subject — {selected ? `${chosen} of ` : ''}
          {present.length}
        </div>
        {open && (
          <span
            onClick={() => setSort((x) => (x === 'count' ? 'name' : 'count'))}
            title="Sort by how many reports carry the domain, or alphabetically"
            style={{
              fontSize: 9.5,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-dim)',
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            {sort === 'count' ? 'by count' : 'a-z'}
          </span>
        )}
      </div>

      {open && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 5 }}>
          {present.map((d) => (
            <span
              key={d}
              onClick={() => onToggle(d)}
              title={`${counts[d]} report${counts[d] === 1 ? '' : 's'}`}
              style={{
                fontSize: 10.5,
                padding: '2px 6px',
                borderRadius: 4,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: on(d)
                  ? 'var(--accent-line)'
                  : 'var(--line-faint)',
                background: on(d) ? 'var(--accent-soft)' : 'transparent',
                color: on(d) ? 'var(--ink-strong)' : 'var(--ink-dim)',
                // Chips rather than rows: 24 rows is a scroll, 24 chips is a
                // paragraph, and the eye reads a paragraph in one pass.
                whiteSpace: 'nowrap',
              }}
            >
              {d.replace(/-/g, ' ')}
              <span style={{ color: 'var(--ink-dim)', marginLeft: 4 }}>{counts[d]}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function ListBlock({
  title,
  items,
}: {
  title: string
  items: { text: string; aside?: string | null }[]
}) {
  const shown = items.slice(0, 8)
  return (
    <div style={{ marginTop: 10 }}>
      <div style={section}>{title}</div>
      {shown.map((item, i) => (
        // Indexed, not keyed by title: `dependents`/`dependsOn` return one
        // entry per edge, not per neighbour, and an orb collapsing several
        // distinct real edges into one orb-to-orb pair (by design — see
        // hierarchy.ts's note on not merging edges) means the same title can
        // legitimately appear here more than once. A title key collided on
        // exactly that case (React logging "two children with the same
        // key"), harmlessly but constantly, every time an orb was hovered.
        <div key={i} style={{ fontSize: 11.5, color: 'var(--ink-mid)', lineHeight: 1.55 }}>
          {item.text}
          {item.aside && (
            // The transmission rate, where a document states one. This is the
            // answer to "when would a change here actually reach that", which
            // a list of titles alone cannot give.
            <span style={{ color: 'var(--ink-gold)' }}> — {item.aside}</span>
          )}
        </div>
      ))}
      {items.length > shown.length && (
        <div style={{ fontSize: 11, color: 'var(--ink-dim)', marginTop: 2 }}>
          and {items.length - shown.length} more
        </div>
      )}
    </div>
  )
}

/**
 * Reports with no edges at all, set aside from the 3D scene entirely.
 *
 * They used to be drawn as real (if pinned) nodes in a world-space column
 * beside the connected cloud — see the removed `shelveIsolated` in
 * InfluenceGraph.tsx. A world-space position, pinned or not, still turns
 * with the camera: dragging or auto-orbiting swings that whole column
 * around the graph the same as everything else in the scene, which reads as
 * the isolated set drifting and spinning rather than sitting quietly to one
 * side of it (Thomas, 2026-08-12). Screen space fixes that outright — this
 * panel does not move regardless of what the camera does, the same way the
 * View and search panels either side of it do not.
 *
 * Fixed between the View panel and the search bar, and laid out four dots
 * wide rather than in one row or one column, on the same request: wide
 * enough to read as a deliberate small block rather than a stray line of
 * dots, narrow enough to fit the gap between those two panels without
 * competing with either for space.
 */
// ChipBar (the old bottom-centre "Countries - All" filter pill) was
// DELETED 2026-08-20 -- Thomas: "lets put the new Regions/Countries front and
// centre bottom of the graph. Kill the old Countries that currently sits on
// the bottom in the centre." GroupsPanel now owns that slot (see its `wrap`
// style). This was a real deletion, not a hide: the family/level FILTER
// mechanism it drove (`FilterState.scopes`, `SCOPE_GROUPS`, `isolateFirstToggle`
// over scopes) is still intact in `lib/filter.ts` and `lib/palette.ts` --
// nothing there was touched -- there is simply no UI left that ever sets
// `filter.scopes` to anything but null, so it now always reads as "All".
// `levelColours`/`focusedFamily` above are the same story: still wired into
// InfluenceGraph's recolour effect, now permanently a no-op since nothing
// narrows `filter.scopes` to one family anymore. Recoverable from git
// history if a UI for the filter is wanted again -- see the archived
// HANDOFF for the full reasoning.

/**
 * The tier buttons.
 *
 * Thomas, 2026-08-12, after the gesture-only version: *"this is not working, we
 * need to simplify this. it is behaving irregularly. Can we just create buttons
 * across the bottom to select different levels?"* He was right to cut it. A
 * double-click is invisible, undiscoverable, meant two opposite things
 * depending on what was under the cursor, and gave no way to see where you were
 * or to jump straight to where you wanted. Four buttons are none of those
 * things: the current tier is always legible because it is the lit one, and any
 * tier is one click away in either direction.
 *
 * **The count says what is actually on screen, and that is the point.** The
 * readout this replaces showed the *disclosed* count — how far the hierarchy
 * was unfolded, ignoring the sidebar filter. With an EU-only filter active it
 * cheerfully said "527 of 728 shown" over a scene containing about ten dots,
 * which is its own small contribution to "behaving irregularly": the one number
 * on screen claiming to describe the view was describing something else. It now
 * reports the visible set, and names the filter as the reason whenever the two
 * disagree.
 */
function TierBar({
  tier,
  onTier,
  inTier,
  visibleCount,
  total,
  autoUnfoldActive,
  onToggleAutoUnfold,
  autoUnfoldDone,
}: {
  tier: number
  onTier: (tier: number) => void
  /** Nodes this tier discloses, before any filter. */
  inTier: number
  /** Nodes actually drawn, after the filter. */
  visibleCount: number
  total: number
  /** Whether the auto-unfold clock (lib/autoUnfold.ts) is currently running. */
  autoUnfoldActive: boolean
  onToggleAutoUnfold: () => void
  /** Nothing left folded — Everything is open and every country is expanded. */
  autoUnfoldDone: boolean
}) {
  const filtered = visibleCount < inTier

  return (
    <div style={tierBarWrap}>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {TIER_LABEL.map((label, i) => {
          const n = i + 1
          const active = tier === n
          return (
            <button
              key={label}
              type="button"
              onClick={() => onTier(n)}
              title={`Tier ${n} — ${TIER_DESCRIPTION[i]}`}
              aria-pressed={active}
              style={{
                padding: '6px 14px',
                fontFamily: 'inherit',
                fontSize: 10.5,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: active ? 'var(--ink-strong)' : 'var(--ink-mute)',
                background: active ? 'var(--accent-active)' : 'var(--btn-bg)',
                border: `1px solid ${active ? 'var(--line-strong)' : 'var(--line)'}`,
                borderRadius: 6,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {n}. {label}
            </button>
          )
        })}
      </div>
      <div style={{ fontSize: 10, color: 'var(--ink-faint)', marginTop: 7, textAlign: 'center' }}>
        {filtered
          ? `${visibleCount} shown · ${inTier} in this tier · filter hiding ${inTier - visibleCount}`
          : `${visibleCount} of ${total} reports shown`}
      </div>
      {/*
        Auto-unfold, 2026-08-22 — opens the tier ladder and every country
        orb on a timer, largest region first, instead of the instant tier-4
        jump. See lib/autoUnfold.ts for the ordering and App.tsx's effect on
        `autoUnfoldActive` for the clock itself. `disabled` covers both ends:
        nothing to do once everything is already open, and no reason to let
        a second run start on top of one already going.
      */}
      <button
        type="button"
        onClick={onToggleAutoUnfold}
        disabled={!autoUnfoldActive && autoUnfoldDone}
        title={
          autoUnfoldActive
            ? 'Stop — leaves whatever has opened so far as-is'
            : autoUnfoldDone
              ? 'Everything is already open'
              : 'Open the tier ladder and every country, largest region first, one batch at a time'
        }
        style={{
          marginTop: 6,
          width: '100%',
          padding: '5px 10px',
          fontFamily: 'inherit',
          fontSize: 10,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: autoUnfoldActive ? 'var(--ink-strong)' : 'var(--ink-mute)',
          background: autoUnfoldActive ? 'var(--accent-active)' : 'var(--btn-bg)',
          border: `1px solid ${autoUnfoldActive ? 'var(--line-strong)' : 'var(--line)'}`,
          borderRadius: 6,
          cursor: !autoUnfoldActive && autoUnfoldDone ? 'default' : 'pointer',
          opacity: !autoUnfoldActive && autoUnfoldDone ? 0.5 : 1,
          whiteSpace: 'nowrap',
        }}
      >
        {autoUnfoldActive ? '■ Stop unfolding' : '▶ Auto-unfold'}
      </button>
    </div>
  )
}

/**
 * Short display codes for the shelf pill's continent breakdown
 * (2026-08-21, full-review item 5). NOT the same vocabulary as
 * `ColourFamily` — three of these (`AFR`/`ASIA`/`SA`) happen to agree with
 * three of that scheme's twelve buckets, the rest don't, because a
 * continent (`regions.ts`) and a colour family (`palette.ts`) are different
 * partitions of the same countries. Local to this one summary line; nothing
 * else reads it.
 */
const CONTINENT_ABBR: Record<Continent, string> = {
  'North America': 'NA',
  'South America': 'SA',
  Europe: 'EUR',
  'Middle East': 'MENA',
  Africa: 'AFR',
  Asia: 'ASIA',
  'Oceania & Pacific': 'OCN',
  International: 'INTL',
}

/**
 * The Unlinked shelf (2026-08-21, full-review item 5 — see the review's
 * §3.6: "1,285 six-pixel dots with hover-only identity... the dots stop
 * earning their place above ~200 items"). This used to render every
 * isolated report as its own 6px dot in a scrolling grid; the staged mint
 * adds 722 more, which would have made it ~2,007 dots — below every hit-size
 * guideline, with no way to browse or filter what's there and no touch
 * story at all.
 *
 * Replaced with the review's own suggested shape: a compact one-line
 * summary — "Unlinked — 1,285 · AFR 412 · ASIA 371 …" — that opens a
 * searchable list in the Reports panel instead of trying to represent each
 * report as a pixel here. That is also the more honest UI for what this set
 * actually is: a research queue (reports with no recorded cross-border
 * dependency yet), not an annotation on the scene. The click target grows
 * from 6px to the whole pill; hover-identity and the row-level selection
 * ring both move to the list itself, where `title`+`publisher` are always
 * visible text instead of a tooltip on a dot nobody could reliably aim at.
 */
function IsolatedShelf({
  reports,
  onOpen,
}: {
  reports: ScoredReport[]
  onOpen: () => void
}) {
  if (reports.length === 0) return null

  const breakdown = useMemo(() => {
    const byContinent = new Map<Continent, number>()
    for (const r of reports) {
      const c = continentOf(r.country)
      byContinent.set(c, (byContinent.get(c) ?? 0) + 1)
    }
    return [...byContinent.entries()].sort((a, b) => b[1] - a[1])
  }, [reports])

  // Top three continents fit a one-line pill at any panel width this dock
  // track actually offers (measured live at 1280×720); a fourth+ collapses
  // to a trailing "…" rather than wrapping the pill onto a second line.
  const shown = breakdown.slice(0, 3)
  const summary = shown
    .map(([c, n]) => `${CONTINENT_ABBR[c]} ${n.toLocaleString()}`)
    .join(' · ')

  return (
    <button
      type="button"
      onClick={onOpen}
      title="Reports with no recorded cross-border dependency yet — click to browse"
      style={isolatedShelfPill}
    >
      Unlinked — {reports.length.toLocaleString()}
      {shown.length > 0 && <span style={{ color: 'var(--ink-faint)' }}> · {summary}</span>}
      {breakdown.length > shown.length && <span style={{ color: 'var(--ink-faint)' }}> …</span>}
    </button>
  )
}

function Hud({
  nodeCount,
  edgeCount,
  visibleNodeCount,
  visibleEdgeCount,
  top,
  domainCounts,
  onToggleDomain,
  commercialCount,
  filter,
  onToggleCommercial,
  onClearFilter,
  selected,
  builtFromCount,
  feedsIntoCount,
  isolated,
  unlinkedOpen,
  onOpenUnlinked,
  onCloseUnlinked,
  onSelectIsolated,
  onHoverIsolated,
  selectedId,
}: {
  nodeCount: number
  edgeCount: number
  visibleNodeCount: number
  visibleEdgeCount: number
  top: { id: string; title: string; authority: number }[]
  domainCounts: Record<string, number>
  onToggleDomain: (domain: Domain) => void
  commercialCount: number
  filter: FilterState
  onToggleCommercial: () => void
  onClearFilter: () => void
  selected: ScoredReport | null
  builtFromCount: number
  feedsIntoCount: number
  /** Reports with no edges in either direction — see `App`'s `isolated` memo. */
  isolated: ScoredReport[]
  /** True while this panel is showing the Unlinked list instead of its normal body (2026-08-21, full-review item 5). */
  unlinkedOpen: boolean
  onOpenUnlinked: () => void
  onCloseUnlinked: () => void
  onSelectIsolated: (id: string) => void
  onHoverIsolated: (report: ScoredReport | null) => void
  selectedId: string | null
}) {
  const filtered = visibleNodeCount !== nodeCount
  const [unlinkedQuery, setUnlinkedQuery] = useState('')

  // Case-insensitive substring over title + publisher, deliberately simple —
  // this is a browse/filter aid for a few thousand rows, not the full search
  // feature (§3.5's accent-folding/full-corpus pass is its own review item,
  // still open). Sorted by title so the list reads as a directory rather
  // than in whatever order `graph.nodes` happened to build it.
  const filteredUnlinked = useMemo(() => {
    const q = unlinkedQuery.trim().toLowerCase()
    const matches = q
      ? isolated.filter(
          (r) =>
            r.title.toLowerCase().includes(q) || r.publisher.toLowerCase().includes(q),
        )
      : isolated
    return [...matches].sort((a, b) => a.title.localeCompare(b.title))
  }, [isolated, unlinkedQuery])

  if (unlinkedOpen) {
    return (
      <div style={panel}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button type="button" onClick={onCloseUnlinked} style={unlinkedBackButton}>
            ← Back
          </button>
          <div style={{ ...masthead, fontSize: 17 }}>Unlinked</div>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 6, lineHeight: 1.5 }}>
          {isolated.length.toLocaleString()} reports with no recorded cross-border
          dependency yet — a research queue, not a bug. Never placed in the 3D
          scene (nothing to draw an edge to); browse or filter them here instead.
        </div>
        <input
          value={unlinkedQuery}
          onChange={(e) => setUnlinkedQuery(e.target.value)}
          placeholder="Filter by title or publisher…"
          spellCheck={false}
          style={unlinkedFilterInput}
        />
        <div style={{ marginTop: 10 }}>
          {filteredUnlinked.length === 0 ? (
            <div style={{ fontSize: 11, color: 'var(--ink-dim)', padding: '8px 2px' }}>
              Nothing matches "{unlinkedQuery}".
            </div>
          ) : (
            filteredUnlinked.map((r) => (
              <div
                key={r.id}
                onClick={() => onSelectIsolated(r.id)}
                onMouseEnter={() => onHoverIsolated(r)}
                onMouseLeave={() => onHoverIsolated(null)}
                style={{
                  ...unlinkedRow,
                  background: selectedId === r.id ? 'var(--accent-soft)' : 'transparent',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 7,
                    flexShrink: 0,
                    marginTop: 5,
                    background: colourForReport(r),
                  }}
                />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      display: 'block',
                      color: 'var(--ink-strong)',
                      fontSize: 12,
                      lineHeight: 1.32,
                    }}
                  >
                    {r.title}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      color: 'var(--ink-mute)',
                      fontSize: 10.5,
                      marginTop: 2,
                    }}
                  >
                    {r.publisher} · {CONTINENT_ABBR[continentOf(r.country)]}
                  </span>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={panel}>
      {/*
        The masthead (round 10: "more pronounced... a pleasant color and font
        so it has depth and personality"). A serif in a panel full of system
        sans is the personality; the gradient ink and drop shadow are the
        depth. Gradient text needs background-clip — and the depth has to be
        a `filter: drop-shadow`, not `textShadow`, because a text shadow
        paints THROUGH transparent glyphs and muddies the gradient it sits
        under. Both gradient and shadow are themed variables.
      */}
      <div style={masthead}>Economic Report Influence Graph</div>
      <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>
        {filtered ? (
          <>
            <span style={{ color: 'var(--ink-mid)' }}>
              {visibleNodeCount} of {nodeCount}
            </span>{' '}
            reports · {visibleEdgeCount} dependencies
          </>
        ) : (
          <>
            {nodeCount} reports · {edgeCount} dependencies · size = weighted
            authority
          </>
        )}
      </div>

      {/*
        The Unlinked list entry point (2026-08-21, full-review item 5),
        always available here regardless of whether the bottom-dock pill is
        showing — the dock's `Unlinked` panel toggle can be off while this
        panel is open, and the review's own framing put the searchable list
        IN the Reports panel, not gated behind a second panel's visibility.
      */}
      {isolated.length > 0 && (
        <div
          onClick={onOpenUnlinked}
          style={{
            fontSize: 11,
            color: 'var(--ink-dim)',
            marginTop: 6,
            cursor: 'pointer',
            pointerEvents: 'auto',
            display: 'inline-block',
          }}
        >
          {isolated.length.toLocaleString()} unlinked — browse →
        </div>
      )}

      {/*
        The counts are the point of the whole feature: the number of reports a
        release ultimately rests on, and the number ultimately resting on it,
        stated plainly. The cone in the scene shows where they are; this says
        how many.
      */}
      {selected && (
        <div style={selectionBlock}>
          <div style={section}>Tracing</div>
          <div
            style={{
              fontSize: 13,
              color: colourForReport(selected),
              lineHeight: 1.35,
            }}
          >
            {selected.title}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-label)', marginTop: 6, lineHeight: 1.6 }}>
            Rests on <strong style={{ color: 'var(--ink-strong)' }}>{builtFromCount}</strong>{' '}
            {builtFromCount === 1 ? 'report' : 'reports'} · feeds{' '}
            <strong style={{ color: 'var(--ink-strong)' }}>{feedsIntoCount}</strong>{' '}
            {feedsIntoCount === 1 ? 'report' : 'reports'}
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 5 }}>
            Counted through the whole chain, not one step.
          </div>
        </div>
      )}

      <div style={{ ...section, marginTop: 14 }}>Most depended upon</div>
      {top.map((n, i) => (
        <div key={n.id} style={row}>
          <span style={{ color: 'var(--ink-faint)', width: 14 }}>{i + 1}</span>
          <span style={{ flex: 1, color: 'var(--ink-body)' }}>{n.title}</span>
          <span style={{ color: 'var(--ink-mute)' }}>{n.authority.toFixed(2)}</span>
        </div>
      ))}

      {/*
        The publisher-scope legend tree lived here from V0.5 until 2026-08-12,
        when the chip bar replaced it (round-5 Q18, built round 7). Nine
        families × up to six levels was the panel's overflow monster, and the
        chips do the same job in one row where the legend IS the filter. This
        panel now informs; the bottom of the screen decides.
      */}

      <DomainPanel
        counts={domainCounts}
        selected={filter.domains}
        onToggle={onToggleDomain}
      />

      {/*
        Commercial sources belong in the legend on their own terms: grey is a
        colour the user will see and needs explained. That the same row is also
        the scope toggle from the V0.5 decision is a convenience, not a
        coincidence — both answer "what counts as a source here".
      */}
      {commercialCount > 0 && (
        <div style={{ marginTop: 7 }}>
          <LegendRow
            colour={COMMERCIAL_COLOUR}
            label="Commercial (unranked)"
            count={commercialCount}
            on={filter.showCommercial}
            onClick={onToggleCommercial}
          />
        </div>
      )}

      {filtered && (
        <div
          onClick={onClearFilter}
          style={{
            fontSize: 11,
            color: 'var(--accent)',
            marginTop: 8,
            cursor: 'pointer',
            pointerEvents: 'auto',
            display: 'inline-block',
          }}
        >
          Show everything
        </div>
      )}

      <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 14, lineHeight: 1.5 }}>
        Pulses travel outward from a report to everything built on it, at that
        report's publication rate. Hover for detail, click to trace a chain,
        Esc to clear. Drag to orbit, scroll to zoom. Press / to find a report by
        name.
      </div>

      {!filter.showCommercial && (
        <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 8, lineHeight: 1.5 }}>
          Commercial sources hidden. Nothing has moved or changed size — they
          sit outside the authority calculation, so this view only subtracts.
        </div>
      )}
    </div>
  )
}

/** One legend entry, which is also one filter switch. */
function LegendRow({
  colour,
  label,
  count,
  on,
  partial = false,
  onClick,
}: {
  colour: string
  label: string
  count: number
  on: boolean
  /** Some but not all of what this row stands for is showing. */
  partial?: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      // The panel scrolls as a whole now (see `panel`); rows keep their own
      // pointerEvents for the sake of anything still rendered outside it.
      style={{ ...row, alignItems: 'center', cursor: 'pointer', pointerEvents: 'auto' }}
    >
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: 12,
          display: 'inline-block',
          // Hollow when off. A greyed-out dot would collide with the grey that
          // already means "commercial". Half-filled for a partial selection,
          // which is the one state a checkbox cannot honestly show.
          background: on ? colour : 'transparent',
          borderLeft: partial ? `5px solid ${colour}` : undefined,
          border: partial ? undefined : `1.5px solid ${colour}`,
          boxShadow: partial ? `inset 4px 0 0 ${colour}` : undefined,
          opacity: on || partial ? 1 : 0.45,
        }}
      />
      <span style={{ flex: 1, color: on || partial ? 'var(--ink-mid)' : 'var(--ink-faint)' }}>
        {label}
      </span>
      <span style={{ color: on || partial ? 'var(--ink-dim)' : 'var(--ink-faintest)' }}>{count}</span>
    </div>
  )
}

/**
 * What each kind of terminus means, in the reader's terms rather than the
 * model's. See TerminalReason in types.ts for the argument and the examples.
 */
const TERMINUS_NOTE: Record<TerminalReason, string> = {
  unpublishable:
    'Named as an input by a document, and not a publication — an administrative form or record, with no release and no cadence to point at.',
  unidentified:
    'The document names a slot rather than a source: something outside it decides what fills this, so there is no stable publication behind it.',
  redistributed:
    'Reached through an intermediary that republishes other people’s data on no cadence of its own.',
  confidential:
    'Collected and deliberately never released. It is named, it is real, and there is no public document behind it.',
}

// See ViewControls: PanelShell owns position and width.
//
// Bottom clearance for the scrollable panel below: the tier bar
// (`tierBarWrap`) is fixed at the same `left: 20` corner this panel slides
// from, `bottom: 20`, and sits at zIndex 6 — one above this panel's PanelShell
// wrapper (zIndex 5). Thomas, 2026-08-21, after scrolling Reports all the way
// down: "it is hiding content behind the panel I think needs moved to the
// top." Measured live: the tier bar's row is ~72px tall, so its top edge sits
// ~92px above the viewport bottom. Without a matching cap here, a long
// enough report list scrolls its last entries into that same 92px strip,
// and the tier bar — being on top — paints over them instead of just sitting
// beside them. 120px leaves the tier bar's full row plus a clear gap, so the
// panel's own scrollbar (not the tier bar) is what stops the content.
const REPORTS_PANEL_BOTTOM_CLEARANCE = 120
const panel: React.CSSProperties = {
  padding: '16px 18px',
  background: 'var(--panel-bg)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
  // 'auto' + a viewport cap + a scrollbar, replacing 'none' + unbounded height.
  // With several groups expanded the legend ran past the bottom of the screen
  // and everything below the fold was unreachable — Thomas, 2026-08-12: "the
  // left sidebar is a pissoff that I cannot scroll and stuff gets trapped
  // where I can't get to." The old 'none' existed so the panel never ate an
  // orbit drag; the price was a panel that could strand its own controls,
  // which is worse. Orbiting from the far-left strip is the rarer gesture.
  //
  // The cap is measured from HUD_TOP (where this panel actually starts, not
  // the top of the viewport) down to a clearance line above the tier bar —
  // see REPORTS_PANEL_BOTTOM_CLEARANCE above. The old `calc(100vh - 40px)`
  // assumed a 20px top offset that was never true (the panel starts at
  // HUD_TOP = 44) and ignored the tier bar entirely, so it both overshot the
  // bottom of the viewport by a few pixels AND let content scroll under the
  // tier bar.
  pointerEvents: 'auto',
  maxHeight: `calc(100vh - ${HUD_TOP}px - ${REPORTS_PANEL_BOTTOM_CLEARANCE}px)`,
  overflowY: 'auto',
}

const selectionBlock: React.CSSProperties = {
  marginTop: 14,
  paddingTop: 12,
  paddingBottom: 2,
  borderTop: '1px solid var(--line-faint)',
}

// The Unlinked list's own styles (2026-08-21, full-review item 5). Mirrors
// `SearchPanel.tsx`'s `input`/`resultRow` look-and-feel on purpose — same
// panel chrome, same row shape — rather than importing them, since that
// file's versions are `position: fixed`-anchored to the search bar and
// these are in-flow inside the Reports `PanelShell`.
const unlinkedBackButton: React.CSSProperties = {
  flexShrink: 0,
  fontFamily: 'inherit',
  fontSize: 11,
  color: 'var(--ink-dim)',
  background: 'var(--btn-bg)',
  border: '1px solid var(--line)',
  borderRadius: 6,
  padding: '4px 8px',
  cursor: 'pointer',
  pointerEvents: 'auto',
}

const unlinkedFilterInput: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  marginTop: 10,
  padding: '8px 10px',
  fontSize: 12,
  fontFamily: 'inherit',
  color: 'var(--ink-strong)',
  background: 'var(--btn-bg)',
  border: '1px solid var(--line)',
  borderRadius: 8,
  outline: 'none',
  pointerEvents: 'auto',
}

const unlinkedRow: React.CSSProperties = {
  display: 'flex',
  gap: 9,
  alignItems: 'flex-start',
  padding: '6px 4px',
  borderRadius: 6,
  cursor: 'pointer',
  pointerEvents: 'auto',
}

// Right edge sits 4px inside the View panel's own left edge (that panel is
// `right: 20, width: 190`, so its left edge is at `right: 210`) — close
// enough to read as paired with it, not so close the two visually merge.
/**
 * Bottom-centre, clear of both side panels and of the search bar at the top.
 *
 * Unlike the other floating panels this one does NOT set `pointerEvents:
 * none` — the buttons inside it have to be clickable. It is kept as narrow as
 * its contents so the dead area it steals from orbit-dragging is the strip the
 * buttons actually occupy and nothing more.
 */
// Bottom-LEFT corner as of Phase 3.5 (Thomas, 2026-08-19: "slide the
// global>nations>state>everything bar to the left bottom corner"), clearing
// the bottom-centre for the country selector's pill.
//
// 2026-08-21: no longer `position: fixed` at hand-picked coordinates — this
// is now a child of the bottom dock's LEFT cell (see the dock comment at the
// render site), which puts it in the same bottom-left spot without owning
// any coordinate another panel could collide with. `pointerEvents: 'auto'`
// because the dock container is 'none' (drag-through between panels).
const tierBarWrap: React.CSSProperties = {
  padding: '10px 14px',
  background: 'var(--panel-bg)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
  pointerEvents: 'auto',
}

/**
 * The bottom dock (2026-08-21, full-review item 2) — see the long comment at
 * its render site for the reasoning. `zIndex: 6` is the old shared level of
 * the tier bar and the centre pills; nothing inside the dock needs its own
 * z-index any more because grid cells cannot overlap each other.
 */
const bottomDock: React.CSSProperties = {
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  padding: '0 20px 20px',
  display: 'grid',
  // Four tracks, three children: tier bar / centre pills / shelf / EMPTY.
  // The empty fourth track is the View panel's column — it reserves
  // the screen edge the shelf's old `right: 214` used to stay clear of. A
  // fixed track rather than a `marginRight` on the shelf's cell because a
  // margin counts into the ITEM's outer size, not the track's, and the
  // first cut of this dock proved it the measured way: at 1280×720 with the
  // Legend expanded, the margin-carrying shelf overflowed its own track
  // leftward and sat back underneath the Legend — the exact overlap this
  // dock exists to make impossible. Items without margins cannot outgrow
  // `auto`-minimum tracks, and tracks cannot overlap, so the guarantee is
  // real again. (Squeezed hard enough — expanded panels at a narrow window
  // — the grid overflows RIGHT, past the empty track, which degrades to
  // "shelf temporarily further right", never to panels stacking.)
  // 182, not 194: the 12px `columnGap` before this track is part of the
  // reservation, so 20 (dock padding) + 182 + 12 lands the shelf's right
  // edge exactly 214 from the viewport edge — the same spot its old fixed
  // `right: 214` put it.
  gridTemplateColumns: '1fr minmax(0, auto) 1fr 182px',
  alignItems: 'end',
  columnGap: 12,
  pointerEvents: 'none',
  zIndex: 6,
}

const bottomDockLeft: React.CSSProperties = {
  justifySelf: 'start',
  minWidth: 0,
  pointerEvents: 'none',
}

const bottomDockCentre: React.CSSProperties = {
  justifySelf: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: 12,
  minWidth: 0,
  pointerEvents: 'none',
}

const bottomDockRight: React.CSSProperties = {
  // The shelf's right edge lands 214 from the viewport edge exactly as its
  // old fixed `right: 214` did — but via the dock's empty fourth track (see
  // `bottomDock`'s comment), NOT a margin here. A margin was the first cut
  // and it broke the no-overlap guarantee under a squeeze.
  justifySelf: 'end',
  minWidth: 0,
  pointerEvents: 'none',
}

/**
 * **Wide and short, not narrow and tall — and now one line, not a block.**
 *
 * Thomas, 2026-08-12: *"see how the unlinked nodes look large and out of place?
 * they should be fitted horizontally instead of vertically."* Four dots across
 * turned 85 unlinked reports into a column running most of the height of the
 * window, which read as a major panel — a third sidebar — for what is a
 * footnote: the reports with no edges in either direction, the least
 * structurally important part of the corpus. Size on screen was inversely
 * proportional to importance, which is the same mistake the flag glyphs made
 * (see `isStandingInstrument` in nodeVisuals.ts). The horizontal, then
 * halved-dot passes that followed (round 10, Phase 3.5) kept solving that
 * same problem one size cut at a time.
 *
 * **2026-08-21, full-review item 5 — the dot grid itself retired.** At 1,285
 * reports (1,285 → ~2,007 after the staged mint) no dot size fixes a grid
 * with no browse, no filter and a 6px hit target; see the file-level comment
 * on `IsolatedShelf` above. This is now a single-line button, sized to its
 * own text — no grid, no scroll, no per-dot geometry left to tune.
 */
// Tucked into the bottom-right as of Phase 3.5 (Thomas, 2026-08-19: "tuck
// those unlinked nodes neatly in the bottom right area") — a footnote's
// corner, out of the way of the search bar and the calendar along the top.
// Still left of the View panel's column, which owns the edge — the 214px
// offset lives on the dock's own empty fourth track (`bottomDock`'s
// comment), not on this style. `pointerEvents: 'auto'` because the dock
// container is 'none' (drag-through between panels).
const isolatedShelfPill: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 11,
  color: 'var(--ink-mute)',
  background: 'var(--panel-bg)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  padding: '9px 13px',
  cursor: 'pointer',
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
  pointerEvents: 'auto',
  whiteSpace: 'nowrap',
}

/**
 * The selection card's frame. Slides on `transform`, not on `right`/`left` —
 * transforms composite on the GPU and never reflow the panels around it. The
 * ease-out curve arrives quickly and settles softly ("smooth and interesting"
 * was the request; a linear slide reads as neither). Kept mounted at all
 * times so the exit animates; `pointerEvents` gates by openness via the
 * transform — offscreen it cannot be interacted with anyway.
 */
const selectionCard: React.CSSProperties = {
  position: 'fixed',
  top: 64,
  right: 214,
  width: 340,
  maxHeight: 'calc(100vh - 220px)',
  overflowY: 'auto',
  padding: '14px 16px',
  background: 'var(--panel-bg-solid)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  boxShadow: 'var(--panel-shadow)',
  transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
  willChange: 'transform',
  zIndex: 8,
}

/** The edge evidence card's frame — the left-hand mirror of `selectionCard`,
 * sitting right of the Reports panel's column. Same transform-composited
 * slide, opposite direction.
 *
 * The closed transforms on BOTH cards are plain pixel values (width + edge
 * offset + shadow headroom — move them if the card geometry changes).
 * A verification note worth keeping: under SOFTWARE rendering (SwiftShader,
 * headless) at the Everything tier, these transitions can wedge at their
 * start value indefinitely — the main thread never yields a frame for the
 * transition to tick. Isolated-page transitions work fine there, and GPU
 * compositing is unaffected; if a user on weak hardware ever reports "the
 * card doesn't open", it opened — it just never animated. The fallback
 * would be gating the transition on frame rate, not removing it. */
const edgeCardFrame: React.CSSProperties = {
  position: 'fixed',
  top: 64,
  left: 360,
  width: 360,
  maxHeight: 'calc(100vh - 220px)',
  overflowY: 'auto',
  padding: '14px 16px',
  background: 'var(--panel-bg-solid)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  boxShadow: 'var(--panel-shadow)',
  transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
  willChange: 'transform',
  zIndex: 8,
}

const edgeCardHeading: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--ink-faint)',
  marginBottom: 8,
}

const evidenceRow: React.CSSProperties = {
  marginTop: 10,
  paddingTop: 10,
  borderTop: '1px solid var(--line-faint)',
}

const basisQuote: React.CSSProperties = {
  fontSize: 11.5,
  lineHeight: 1.55,
  color: 'var(--ink-body)',
  fontStyle: 'italic',
  marginTop: 5,
}

const evidenceLink: React.CSSProperties = {
  display: 'inline-block',
  marginTop: 5,
  fontSize: 10.5,
  letterSpacing: '0.04em',
  color: 'var(--accent)',
  textDecoration: 'none',
  borderBottom: '1px solid var(--accent-line)',
}

const tooltip: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: 300,
  padding: '14px 16px',
  background: 'var(--panel-bg-solid)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
  pointerEvents: 'none',
  transition: 'opacity 120ms ease',
  willChange: 'transform',
  // Above the search panel, which sits at 20. Clamping the card into the
  // viewport put its top edge at y=18 on tall cards, directly underneath the
  // search box — so the fix for "cut off at the top" produced "hidden behind the
  // search box", which the screenshot caught and the arithmetic could not.
  //
  // Raising it above the search panel is safe rather than merely convenient: the
  // card is only visible while the pointer is over a node on the canvas, and the
  // pointer cannot be there and in the search field at the same time.
  zIndex: 30,
  // A card taller than the window cannot be clamped into it. Scope groups
  // collapse by default now (see Hud's `manuallyExpanded`), so this is a
  // safety net rather than the primary fix — but it used to clip silently
  // (`overflow: hidden`) whenever content ran past the window, which is worse
  // than a scrollbar: a clipped row isn't just off-screen, it's unreachable.
  // The card is still built title-first so the header survives regardless.
  maxHeight: 'calc(100vh - 36px)',
  overflowY: 'auto',
  overflowX: 'hidden',
}

const section: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--ink-faint)',
  marginBottom: 6,
}

// See the comment at the call site in Hud. Georgia-first because it ships on
// every Windows/mac machine this will realistically open on — a webfont for
// one line of text is a network dependency the project doesn't otherwise have.
// Enlarged 21 → 26 and given the slow gradient rotation on 2026-08-19
// (Thomas, Phase 3.5: "the Economic Report Influence Graph could be larger
// and make the gradient rotate constantly at a slow rate"). The rotation is
// the `rigTitle` animation in uiTheme.ts driving a registered @property
// angle — the gradient's ANGLE turns, the glyphs hold still, one full turn
// every 28 seconds. Slow enough to be alive without ever being motion.
const masthead: React.CSSProperties = {
  fontFamily: "Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Times New Roman', serif",
  fontSize: 26,
  fontWeight: 700,
  letterSpacing: '0.005em',
  lineHeight: 1.22,
  backgroundImage: 'var(--title-ink)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  filter: 'var(--title-depth)',
  paddingBottom: 1,
  animation: 'rigTitleTurn 28s linear infinite',
}

const row: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  fontSize: 12,
  lineHeight: 1.7,
}

const statRow: React.CSSProperties = {
  display: 'flex',
  gap: 22,
  marginTop: 12,
  paddingTop: 10,
  borderTop: '1px solid var(--line-faint)',
}
