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
import { Flag } from './components/Flag'
import {
  BLOOM_THRESHOLD_MAX,
  BLOOM_THRESHOLD_MIN,
  DEFAULT_VIEW,
  PAPER_BACKGROUND,
  SCENE_BACKGROUND,
  ZOOM_MAX,
  ZOOM_MIN,
  type ViewSettings,
} from './lib/view'
import { dependencies, droppedNotes, loadIssues, reports } from './data'
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
} from './lib/graph'
import { buildFocusIndex, computeFocus } from './lib/selection'
import {
  DEFAULT_DRILLDOWN,
  TIER_DESCRIPTION,
  TIER_LABEL,
  buildDisclosedGraph,
  isOrbId,
  resolveId,
  toggleDrilldown,
  type Drilldown,
} from './lib/hierarchy'
import {
  NO_FILTER,
  applyFilter,
  compile,
  isFiltering,
  isolateFirstToggle,
  type FilterState,
} from './lib/filter'
import {
  ALL_SCOPES,
  COMMERCIAL_COLOUR,
  COUNTRY_RIM,
  focusPalette,
  SCOPE_COLOUR,
  SCOPE_GROUPS,
  SCOPE_LABEL,
  colourForReport,
  scopeOf,
  type ColourFamily,
  type Scope,
} from './lib/palette'
import { DOMAINS, type Domain } from './lib/types'
import type {
  ReferencePeriod,
  ScoredReport,
  TerminalReason,
} from './lib/types'

export default function App() {
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
    for (const i of issues) {
      if (i.severity === 'error') console.error('[graph]', i.message)
      else console.warn('[graph]', i.message)
    }
    return buildGraph(reports, dependencies)
  }, [])

  /**
   * Disclosure, computed once for the whole corpus rather than per hover.
   *
   * It walks every dropped note in the corpus, which is not something to do on
   * a pointer move — and the result is a pure function of data that never
   * changes during a session.
   */
  const disclosure = useMemo(
    () => disclosureByReport(reports, dependencies, droppedNotes),
    [],
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
  const [drilldown, setDrilldown] = useState<Drilldown>(DEFAULT_DRILLDOWN)

  const [hovered, setHovered] = useState<ScoredReport | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [bounds, setBounds] = useState<GraphBounds | null>(null)
  const [view, setView] = useState<ViewSettings>(DEFAULT_VIEW)
  const [filter, setFilter] = useState<FilterState>(NO_FILTER)
  const [flyTo, setFlyTo] = useState<FlyTo | null>(null)
  /**
   * Incremented to ask the scene for the opening camera back. A counter rather
   * than a boolean because the same request has to be answerable twice in a
   * row, and a boolean would need clearing afterwards.
   */
  const [resetSignal, setResetSignal] = useState(0)
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
    () => buildDisclosedGraph(graph, drilldown),
    [graph, drilldown],
  )

  /**
   * What is drawn. Null when nothing is filtered, so the common case does no
   * set lookups at all — and so the renderer can tell "everything" apart from
   * "everything happens to pass", which are the same picture but not the same
   * amount of work.
   */
  const predicate = useMemo(() => compile(filter), [filter])
  const visible = useMemo(
    () => (isFiltering(filter) ? applyFilter(disclosedGraph, predicate) : null),
    [disclosedGraph, filter, predicate],
  )

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
    () =>
      selectedId
        ? computeFocus(focusIndex, selectedId, {
            builtFrom: view.focusBuiltFrom,
            feedsInto: view.focusFeedsInto,
          })
        : null,
    [focusIndex, selectedId, view.focusBuiltFrom, view.focusFeedsInto],
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

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
  const handleChoose = useCallback(
    (report: ScoredReport) => {
      const id = resolveId(drilldown, report)
      setSelectedId(id)
      setFlyTo((f) => ({ id, nonce: (f?.nonce ?? 0) + 1 }))
    },
    [drilldown],
  )

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
    setSelectedId((cur) => (cur === id ? null : id))
  }, [])

  /**
   * Double-click on the scene: an orb steps up a tier, a real node does
   * nothing. See `toggleDrilldown` in hierarchy.ts for why a real node no
   * longer folds the view back.
   */
  const handleToggleNode = useCallback((id: string) => {
    setDrilldown((d) => toggleDrilldown(d, id))
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
    setFlyTo(null)
    setView((v) => ({ ...v, zoom: 1 }))
    setResetSignal((n) => n + 1)
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
    if (clearFilter) setFilter(NO_FILTER)
  }, [])

  // All three filter axes speak Thomas's isolate-first click language now —
  // see isolateFirstToggle in filter.ts for the rules and his words.
  const toggleDomain = useCallback((domain: Domain) => {
    setFilter((f) => ({ ...f, domains: isolateFirstToggle(f.domains, DOMAINS, [domain]) }))
  }, [])

  /** A family chip: isolate on first click, combo on the next, off on repeat. */
  const toggleFamily = useCallback((family: ColourFamily) => {
    const group = SCOPE_GROUPS.find((g) => g.country === family)
    if (!group) return
    setFilter((f) => ({
      ...f,
      scopes: isolateFirstToggle(f.scopes, ALL_SCOPES, group.scopes),
    }))
  }, [])

  /** A level row in a chip's flyout — "Canada's municipal level" in two clicks. */
  const toggleScope = useCallback((scope: Scope) => {
    setFilter((f) => ({ ...f, scopes: isolateFirstToggle(f.scopes, ALL_SCOPES, [scope]) }))
  }, [])

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

  // Counted over the whole graph, not the filtered view: a chip showing "0"
  // because you switched it off tells you nothing, while one showing how many
  // you are hiding tells you what the switch is worth.
  const scopeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const n of graph.nodes) {
      const s = scopeOf(n)
      counts[s] = (counts[s] ?? 0) + 1
    }
    return counts
  }, [graph])

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

  return (
    <div style={{ width: '100%', height: '100%' }} onPointerMove={trackPointer}>
      <Canvas
        camera={{ position: [0, 0, 700], fov: FOV, near: 1, far: 12000 }}
        gl={{ antialias: true }}
        // The background is CSS on the canvas element, not a scene colour —
        // the GL buffer is transparent, so this one style IS the theme switch
        // for the ground everything sits on.
        style={{
          background: view.blueprint ? PAPER_BACKGROUND : SCENE_BACKGROUND,
          cursor: hovered ? 'pointer' : 'default',
        }}
        // Fires when a click hits nothing in the scene. Clearing here rather
        // than on the canvas element means orbiting over empty space, which
        // also ends in a click, is handled by R3F's own drag threshold.
        onPointerMissed={() => setSelectedId(null)}
      >
        {/*
          Blueprint lifts the ambient and drops the cool fill light: paper is
          lit flat and even (a strong point light on white discs reads as
          plastic), and the blue fill that gives the dark scene its depth
          would tint every disc toward the sky it no longer sits in. The main
          key light stays — a little shading is what keeps the discs reading
          as spheres at all.
        */}
        {/*
          The blueprint ambient looks absurdly high because two pipeline
          factors both eat it, measured off screenshots rather than assumed:
          physically-correct lighting divides Lambertian diffuse by π (so
          ambient 1.15 delivers only ~0.37 to a white disc — the first two
          cuts rendered concrete-grey discs at 0.85 and 1.15), and ACES tone
          mapping then compresses what is left. 2.6/π ≈ 0.83, plus the
          emissive floor in nodeVisuals, lands the discs at pale-paper after
          the curve — visibly below the hollow nodes' white, above the
          background. Tune against pixels, not against what the number
          "should" be.
        */}
        <ambientLight intensity={view.blueprint ? 2.6 : 0.5} />
        <pointLight position={[300, 300, 400]} intensity={view.blueprint ? 0.5 : 1.1} />
        {!view.blueprint && (
          <pointLight position={[-300, -200, -300]} intensity={0.4} color="#4a6fb5" />
        )}

        {/*
          SpaceFrame (the wireframe bounding box) and the ground grid were
          deleted 2026-08-12 — Thomas: "don't keep the code". Environment now
          carries only the optional horizon, which needs nothing measured, so
          it no longer waits on `bounds` — and sits out blueprint entirely,
          where a night-sky gradient behind paper would be a hole in the page.
        */}
        {!view.blueprint && <Environment view={view} />}

        <InfluenceGraph
          graph={disclosedGraph}
          view={view}
          resetSignal={resetSignal}
          focus={focus}
          visible={visible}
          flyTo={flyTo}
          levelColours={levelColours}
          onHover={setHovered}
          onSelect={setSelectedId}
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
          Bloom gives the dark background a sense of space. It has to be kept
          on a short leash: it adds apparent size, and apparent size is the
          authority encoding. Too much and every node blows out into an equal
          white blob, destroying the exact signal the graph exists to show.
          High threshold so only the brightest cores bleed, low intensity so
          the halo stays a suggestion.
        */}
        {/*
          The composer stays mounted whether or not glow is on, and the toggle
          only changes bloom intensity.

          Mounting and unmounting it instead re-routes the whole render: with a
          composer the scene goes through an offscreen buffer with its own
          colour handling, without one it draws straight to the canvas. The
          difference shifts the background tint of the entire scene, so the
          Glow switch appeared to be doing the horizon's job as well as its
          own. Keeping the pipeline fixed makes the toggle mean one thing.
        */}
        {/*
          Threshold slides down as the slider goes up, rather than intensity
          sliding up. Intensity alone would brighten the same handful of nodes;
          threshold decides *how many* nodes glow at all, which is the knob that
          actually corresponds to what someone means by "more glow".

          The range stops at 0.26 deliberately. Below roughly 0.15 most of the
          graph blooms, halo adds apparent size uniformly, and the size-equals-
          authority encoding stops working — which is exactly what happened the
          first time bloom was tuned, and why it was then set so conservatively
          that it did nothing at all for five sessions.
        */}
        {/*
          Blueprint zeroes the intensity rather than unmounting the composer —
          same reasoning as the Glow toggle above: the composer's presence
          changes the whole pipeline's colour handling, so it stays mounted
          and only the effect goes quiet. Glow has no meaning on paper anyway;
          bloom is additive light, and paper does not emit.
        */}
        <EffectComposer>
          <Bloom
            intensity={
              view.blueprint || view.glow <= 0.005 ? 0 : 0.45 + view.glow * 0.5
            }
            luminanceThreshold={
              BLOOM_THRESHOLD_MAX -
              view.glow * (BLOOM_THRESHOLD_MAX - BLOOM_THRESHOLD_MIN)
            }
            luminanceSmoothing={0.35}
            radius={0.62}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>

      <PanelShell side="right" label="View" width={190}>
        <ViewControls
          view={view}
          onChange={setView}
          hasSelection={!!selected}
          onReset={handleReset}
        />
      </PanelShell>

      <SearchPanel graph={graph} within={predicate} onChoose={handleChoose} />

      <ChipBar
        scopeCounts={scopeCounts}
        filter={filter}
        levelColours={levelColours}
        onFamily={toggleFamily}
        onScope={toggleScope}
      />

      <TierBar
        tier={drilldown}
        onTier={handleTier}
        inTier={tierCounts.inTier}
        visibleCount={tierCounts.visible}
        total={graph.nodes.length}
      />

      <Onboarding />

      <IsolatedShelf
        reports={isolated}
        onHover={setHovered}
        selectedId={selectedId}
        onSelect={handleSelectIsolated}
      />

      {/*
        Bottom edge, and collapsed by default. It answers a question nobody has
        while first looking at the graph — the shape comes first and the timing
        second — so it costs one click to open and nothing at all to ignore.
      */}
      <CalendarPanel
        graph={graph}
        dependencies={dependencies}
        within={predicate}
        onChoose={handleChoose}
      />

      <PanelShell side="left" label="Reports" width={320}>
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
        />
      </PanelShell>

      <div ref={tooltipRef} style={{ ...tooltip, opacity: hovered ? 1 : 0 }}>
        {hovered && (
          <Detail report={hovered} graph={disclosedGraph} disclosure={disclosure} />
        )}
      </div>
    </div>
  )
}

/** Hover card. Replaces the always-on labels, which were unreadable in bulk. */
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
      <div style={{ fontSize: 11, color: '#7d8ea8', marginTop: 3 }}>
        {report.publisher} · {report.region} · published {cadence}
        {changes && <span style={{ color: '#c2a86e' }}> · changes {changes}</span>}
      </div>
      {/*
        Phase, where it is known. A rate says how often and never says when, and
        "next 17 August" is the thing anyone reading a cadence actually wanted.
        Absent on most nodes for now, and silent when absent rather than saying
        "unknown" on four hundred cards.
      */}
      {next && (
        <div style={{ fontSize: 11, color: '#8fa4c4', marginTop: 3 }}>
          next {describeWindow(next.from, next.to, next.precision)}
          {next.evidence === 'implied' && (
            <span style={{ color: '#8a7ab5' }}> · inferred, not published</span>
          )}
        </div>
      )}
      {parent && (
        <div style={{ fontSize: 10.5, color: '#7d8ea8', marginTop: 5, lineHeight: 1.5 }}>
          A series published inside{' '}
          <span style={{ color: colourForReport(parent) }}>{parent.title}</span>. Its
          authority below is its own, not the release's — the two are separate
          spheres for one programme.
        </div>
      )}
      {rolledUp !== null && (
        <div style={{ fontSize: 10.5, color: '#7d8ea8', marginTop: 5, lineHeight: 1.5 }}>
          Also publishes{' '}
          {parts.map((p, i) => (
            <span key={p.id}>
              {i > 0 && ', '}
              <span style={{ color: colourForReport(p) }}>{p.title}</span>
            </span>
          ))}
          , held separately. Everything under this masthead comes to{' '}
          <span style={{ color: '#c2a86e' }}>{rolledUp.toFixed(2)}</span>.
        </div>
      )}
      {report.cadence_note && (
        <div style={{ fontSize: 10.5, color: '#5e6f8a', marginTop: 5, lineHeight: 1.5 }}>
          {report.cadence_note}
        </div>
      )}

      {!official && (
        <div style={{ fontSize: 10.5, color: '#8b93a4', marginTop: 6, lineHeight: 1.5 }}>
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
        <div style={{ fontSize: 10.5, color: '#8b93a4', marginTop: 6, lineHeight: 1.5 }}>
          {TERMINUS_NOTE[report.terminal_reason]} The chain ends here, so this
          node is outside the authority ranking and accrues no size from what
          depends on it.
        </div>
      )}

      <div style={{ fontSize: 12, color: '#aab8cf', marginTop: 10, lineHeight: 1.5 }}>
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
        <div style={{ fontSize: 11, color: '#5e6f8a', marginTop: 10, fontStyle: 'italic' }}>
          Nothing in this graph depends on it — a terminal output.
        </div>
      )}
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 15, color: '#dde5f2' }}>{value}</div>
      <div
        style={{
          fontSize: 9.5,
          color: '#5e6f8a',
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
        <div style={{ width: `${ratio * 100}%`, background: '#c2a86e' }} />
      </div>
      <div style={{ fontSize: 11.5, color: '#9fb0c9', lineHeight: 1.55 }}>
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
        <div style={{ fontSize: 11, color: '#5e6f8a', lineHeight: 1.5, marginTop: 2 }}>
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
              color: '#5e6f8a',
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
                  ? 'rgba(110, 168, 255, 0.4)'
                  : 'rgba(90, 115, 160, 0.18)',
                background: on(d) ? 'rgba(110, 168, 255, 0.12)' : 'transparent',
                color: on(d) ? '#cfe0f8' : '#5e6f8a',
                // Chips rather than rows: 24 rows is a scroll, 24 chips is a
                // paragraph, and the eye reads a paragraph in one pass.
                whiteSpace: 'nowrap',
              }}
            >
              {d.replace(/-/g, ' ')}
              <span style={{ color: '#5e6f8a', marginLeft: 4 }}>{counts[d]}</span>
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
        <div key={i} style={{ fontSize: 11.5, color: '#9fb0c9', lineHeight: 1.55 }}>
          {item.text}
          {item.aside && (
            // The transmission rate, where a document states one. This is the
            // answer to "when would a change here actually reach that", which
            // a list of titles alone cannot give.
            <span style={{ color: '#c2a86e' }}> — {item.aside}</span>
          )}
        </div>
      ))}
      {items.length > shown.length && (
        <div style={{ fontSize: 11, color: '#5e6f8a', marginTop: 2 }}>
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
/**
 * The chip bar — the legend and the filter, one row, one surface.
 *
 * Round-7 replacement for the sidebar's nine-family legend tree (Thomas,
 * round-5 Q18: "yes to all"). Each chip wears its family's INK — the same
 * colour its rims and edges wear in the scene, which is what makes the chips
 * a legend and not just buttons. Clicks speak isolate-first (see
 * `isolateFirstToggle`): from everything-on, one click on Canada means "show
 * me Canada", further clicks build combos, clicking the last selected chip
 * returns to everything.
 *
 * The ▾ on each chip opens a level flyout: click a level to isolate it (or
 * toggle it within a combo) — "Canada's municipal level" is chip-chevron +
 * one tick, exactly the two clicks promised. While the filter is narrowed to
 * exactly one family, the flyout's swatches switch from the family shades to
 * the spread recolour palette — the same colours the spheres themselves take
 * (see `levelColours` in App), so the flyout doubles as the recolour legend.
 *
 * Unstaffed families (China, Asia, India — reserved palette slices with zero
 * reports) render no chip: a filter for nothing is noise.
 */
function ChipBar({
  scopeCounts,
  filter,
  levelColours,
  onFamily,
  onScope,
}: {
  scopeCounts: Record<string, number>
  filter: FilterState
  levelColours: Record<string, string> | null
  onFamily: (family: ColourFamily) => void
  onScope: (scope: Scope) => void
}) {
  const [openFamily, setOpenFamily] = useState<ColourFamily | null>(null)
  /**
   * The tray minimize (round 9, Thomas: "The regions need a way to have their
   * tray minimized"). Collapsed, the whole row folds into one small pill that
   * still reports whether a region filter is active — state must stay legible
   * while its controls are put away, or a puzzling half-empty graph is one
   * forgotten click from looking like a bug. The filter itself is untouched
   * by collapsing; this hides controls, never changes what they did.
   */
  const [collapsed, setCollapsed] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  // The flyout closes on a click anywhere outside the bar, and on Escape —
  // added round 8 after Thomas reported it "stuck... I cannot change it or
  // get rid of it". Two failures stacked: the ▾ hit target was a few pixels
  // wide (a miss landed on the chip label and toggled the family instead,
  // leaving the flyout exactly where it was), and nothing but that sliver
  // could ever close it. The chevron is a real button now, and the rest of
  // the screen is an exit.
  useEffect(() => {
    if (!openFamily) return
    const onDown = (e: PointerEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenFamily(null)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenFamily(null)
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [openFamily])

  const anyFilter = filter.scopes !== null
  const groups = SCOPE_GROUPS.filter(
    (g) => g.scopes.reduce((n, s) => n + (scopeCounts[s] ?? 0), 0) > 0,
  )
  const litCount = anyFilter
    ? groups.filter((g) => g.scopes.some((s) => filter.scopes!.includes(s))).length
    : 0

  if (collapsed) {
    return (
      <div ref={barRef} style={chipBarWrap}>
        <div
          onClick={() => setCollapsed(false)}
          title="Show the region chips"
          style={{ ...chip, cursor: 'pointer', color: '#8fa3c0' }}
        >
          <span style={{ whiteSpace: 'nowrap' }}>
            Regions{anyFilter ? ` · ${litCount} on` : ''}
          </span>
          <span style={{ color: '#54637d' }}>▴</span>
        </div>
      </div>
    )
  }

  return (
    <div ref={barRef} style={chipBarWrap}>
      {groups.map((group) => {
        const total = group.scopes.reduce((n, s) => n + (scopeCounts[s] ?? 0), 0)
        const on =
          !anyFilter || group.scopes.some((s) => filter.scopes!.includes(s))
        const lit = anyFilter && on
        const ink = COUNTRY_RIM[group.country] ?? '#8fa3c0'
        const open = openFamily === group.country
        const present = group.scopes.filter((s) => (scopeCounts[s] ?? 0) > 0)
        return (
          <div key={group.country} style={{ position: 'relative' }}>
            {open && (
              <div style={flyout}>
                {present.map((s) => {
                  const sOn = !filter.scopes || filter.scopes.includes(s)
                  const swatch = levelColours?.[s] ?? SCOPE_COLOUR[s]
                  return (
                    <div
                      key={s}
                      onClick={() => onScope(s)}
                      style={{ ...flyoutRow, opacity: sOn ? 1 : 0.45 }}
                    >
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 10,
                          background: swatch,
                          border: `1px solid ${ink}`,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ flex: 1, color: sOn ? '#c9d4e8' : '#5e6f8a' }}>
                        {SCOPE_LABEL[s] ?? s}
                      </span>
                      <span style={{ color: '#5e6f8a' }}>{scopeCounts[s] ?? 0}</span>
                    </div>
                  )
                })}
                {levelColours && (
                  <div style={{ fontSize: 9, color: '#54637d', marginTop: 4, lineHeight: 1.4 }}>
                    Spread colours — the spheres wear these while only this
                    family is shown.
                  </div>
                )}
              </div>
            )}
            <div
              style={{
                ...chip,
                borderColor: lit ? ink : on ? 'rgba(90, 115, 160, 0.35)' : 'rgba(90, 115, 160, 0.18)',
                boxShadow: lit ? `0 0 8px ${ink}55, inset 0 0 6px ${ink}22` : 'none',
                opacity: on ? 1 : 0.42,
              }}
            >
              <span
                onClick={() => onFamily(group.country)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 9,
                    background: 'transparent',
                    border: `2px solid ${ink}`,
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: on ? '#dde5f2' : '#5e6f8a', whiteSpace: 'nowrap' }}>
                  {group.label}
                </span>
                <span style={{ color: '#54637d' }}>{total}</span>
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenFamily(open ? null : group.country)
                }}
                title={`${group.label} by level`}
                style={{
                  cursor: 'pointer',
                  color: open ? '#cfe0f8' : '#54637d',
                  // A real hit target — the old 2px sliver is what made the
                  // flyout feel stuck (see the outside-click note above).
                  padding: '6px 8px',
                  margin: '-6px -6px -6px -2px',
                  transform: open ? 'rotate(180deg)' : 'none',
                  transition: 'transform 140ms ease',
                }}
              >
                ▾
              </span>
            </div>
          </div>
        )
      })}
      {/* The tuck-away. ▾ pointing off the bottom edge = put the tray there;
          the collapsed pill's ▴ = bring it back. Closes any open flyout on
          the way down so nothing floats over a bar that has left. */}
      <div
        onClick={() => {
          setOpenFamily(null)
          setCollapsed(true)
        }}
        title="Minimize the region chips"
        style={{ ...chip, cursor: 'pointer', padding: '5px 9px' }}
      >
        <span style={{ color: '#54637d' }}>▾</span>
      </div>
    </div>
  )
}

const chipBarWrap: React.CSSProperties = {
  position: 'fixed',
  bottom: 96,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: 6,
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxWidth: 'min(1100px, calc(100vw - 460px))',
  zIndex: 6,
}

const chip: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '5px 8px 5px 10px',
  fontSize: 10.5,
  letterSpacing: '0.04em',
  background: 'rgba(10, 14, 24, 0.82)',
  border: '1px solid',
  borderRadius: 15,
  backdropFilter: 'blur(8px)',
  userSelect: 'none',
}

const flyout: React.CSSProperties = {
  position: 'absolute',
  bottom: 'calc(100% + 6px)',
  left: '50%',
  transform: 'translateX(-50%)',
  minWidth: 178,
  padding: '8px 10px',
  background: 'rgba(8, 12, 21, 0.95)',
  border: '1px solid rgba(90, 115, 160, 0.3)',
  borderRadius: 8,
  backdropFilter: 'blur(10px)',
  zIndex: 7,
}

const flyoutRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 7,
  fontSize: 11,
  lineHeight: 1.9,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}

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
}: {
  tier: number
  onTier: (tier: number) => void
  /** Nodes this tier discloses, before any filter. */
  inTier: number
  /** Nodes actually drawn, after the filter. */
  visibleCount: number
  total: number
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
                color: active ? '#e6eefc' : '#7c8ca7',
                background: active ? 'rgba(70, 115, 190, 0.30)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active ? 'rgba(130, 170, 230, 0.55)' : 'rgba(90, 115, 160, 0.22)'}`,
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
      <div style={{ fontSize: 10, color: '#54637d', marginTop: 7, textAlign: 'center' }}>
        {filtered
          ? `${visibleCount} shown · ${inTier} in this tier · filter hiding ${inTier - visibleCount}`
          : `${visibleCount} of ${total} reports shown`}
      </div>
    </div>
  )
}

function IsolatedShelf({
  reports,
  onHover,
  selectedId,
  onSelect,
}: {
  reports: ScoredReport[]
  onHover: (report: ScoredReport | null) => void
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  if (reports.length === 0) return null

  return (
    <div style={isolatedShelfWrap}>
      <div style={{ ...section, marginBottom: 8 }}>Unlinked — {reports.length}</div>
      <div style={isolatedShelfGrid}>
        {reports.map((r) => (
          <div
            key={r.id}
            onMouseEnter={() => onHover(r)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(r.id)}
            title={`${r.title} — ${r.publisher}`}
            style={{
              // Must match `isolatedShelfGrid`'s track size, or `auto-fill`
              // computes a column count the dots do not actually fit into.
              width: 6,
              height: 6,
              borderRadius: 6,
              cursor: 'pointer',
              background: colourForReport(r),
              opacity: selectedId === r.id ? 1 : 0.72,
              boxShadow:
                selectedId === r.id ? '0 0 0 2px rgba(230, 237, 250, 0.6)' : 'none',
              pointerEvents: 'auto',
            }}
          />
        ))}
      </div>
    </div>
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
}) {
  const filtered = visibleNodeCount !== nodeCount


  return (
    <div style={panel}>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#e6edfa' }}>
        Economic Report Influence Graph
      </div>
      <div style={{ fontSize: 12, color: '#6f829e', marginTop: 2 }}>
        {filtered ? (
          <>
            <span style={{ color: '#9fb0c9' }}>
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
          <div style={{ fontSize: 11.5, color: '#8fa3c0', marginTop: 6, lineHeight: 1.6 }}>
            Rests on <strong style={{ color: '#dde5f2' }}>{builtFromCount}</strong>{' '}
            {builtFromCount === 1 ? 'report' : 'reports'} · feeds{' '}
            <strong style={{ color: '#dde5f2' }}>{feedsIntoCount}</strong>{' '}
            {feedsIntoCount === 1 ? 'report' : 'reports'}
          </div>
          <div style={{ fontSize: 10.5, color: '#4d5c74', marginTop: 5 }}>
            Counted through the whole chain, not one step.
          </div>
        </div>
      )}

      <div style={{ ...section, marginTop: 14 }}>Most depended upon</div>
      {top.map((n, i) => (
        <div key={n.id} style={row}>
          <span style={{ color: '#556785', width: 14 }}>{i + 1}</span>
          <span style={{ flex: 1, color: '#c9d4e8' }}>{n.title}</span>
          <span style={{ color: '#6f829e' }}>{n.authority.toFixed(2)}</span>
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
            color: '#6ea8ff',
            marginTop: 8,
            cursor: 'pointer',
            pointerEvents: 'auto',
            display: 'inline-block',
          }}
        >
          Show everything
        </div>
      )}

      <div style={{ fontSize: 11, color: '#4d5c74', marginTop: 14, lineHeight: 1.5 }}>
        Pulses travel outward from a report to everything built on it, at that
        report's publication rate. Hover for detail, click to trace a chain,
        Esc to clear. Drag to orbit, scroll to zoom. Press / to find a report by
        name.
      </div>

      {!filter.showCommercial && (
        <div style={{ fontSize: 10.5, color: '#4d5c74', marginTop: 8, lineHeight: 1.5 }}>
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
      <span style={{ flex: 1, color: on || partial ? '#a8b7cd' : '#4d5c74' }}>
        {label}
      </span>
      <span style={{ color: on || partial ? '#5e6f8a' : '#3d4a5e' }}>{count}</span>
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
const panel: React.CSSProperties = {
  padding: '16px 18px',
  background: 'rgba(10, 14, 24, 0.72)',
  border: '1px solid rgba(90, 115, 160, 0.22)',
  borderRadius: 10,
  backdropFilter: 'blur(8px)',
  // 'auto' + a viewport cap + a scrollbar, replacing 'none' + unbounded height.
  // With several groups expanded the legend ran past the bottom of the screen
  // and everything below the fold was unreachable — Thomas, 2026-08-12: "the
  // left sidebar is a pissoff that I cannot scroll and stuff gets trapped
  // where I can't get to." The old 'none' existed so the panel never ate an
  // orbit drag; the price was a panel that could strand its own controls,
  // which is worse. Orbiting from the far-left strip is the rarer gesture.
  pointerEvents: 'auto',
  maxHeight: 'calc(100vh - 40px)',
  overflowY: 'auto',
}

const selectionBlock: React.CSSProperties = {
  marginTop: 14,
  paddingTop: 12,
  paddingBottom: 2,
  borderTop: '1px solid rgba(90, 115, 160, 0.18)',
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
const tierBarWrap: React.CSSProperties = {
  position: 'fixed',
  bottom: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '10px 14px',
  background: 'rgba(10, 14, 24, 0.82)',
  border: '1px solid rgba(90, 115, 160, 0.22)',
  borderRadius: 10,
  backdropFilter: 'blur(8px)',
  zIndex: 6,
}

/**
 * **Wide and short, not narrow and tall.**
 *
 * Thomas, 2026-08-12: *"see how the unlinked nodes look large and out of place?
 * they should be fitted horizontally instead of vertically."* Four dots across
 * turned 85 unlinked reports into a column running most of the height of the
 * window, which read as a major panel — a third sidebar — for what is a
 * footnote: the reports with no edges in either direction, the least
 * structurally important part of the corpus. Size on screen was inversely
 * proportional to importance, which is the same mistake the flag glyphs made
 * (see `isStandingInstrument` in nodeVisuals.ts).
 *
 * Laid out on a fixed width with `auto-fill` rather than a fixed column count,
 * so the block stays wide-and-short as the isolated set grows instead of
 * growing back down the screen. `maxHeight` is now a low cap for the same
 * reason — if this ever needs to scroll, that is the correct outcome, not a
 * signal to let it get taller.
 */
const isolatedShelfWrap: React.CSSProperties = {
  position: 'fixed',
  top: 20,
  right: 214,
  width: 232,
  padding: '9px 11px',
  background: 'rgba(10, 14, 24, 0.72)',
  border: '1px solid rgba(90, 115, 160, 0.22)',
  borderRadius: 10,
  backdropFilter: 'blur(8px)',
  // 'auto', not 'none' — the shelf scrolls once the isolated set outgrows
  // `maxHeight`, and a scrollbar inside a pointer-transparent panel cannot be
  // grabbed (Thomas, 2026-08-12: "give it a scroll bar and allow the pointer
  // to grab it"). The cost is a small dead rectangle for orbit-drags, in a
  // corner nobody orbits from.
  pointerEvents: 'auto',
  maxHeight: 148,
  overflowY: 'auto',
  zIndex: 5,
}

const isolatedShelfGrid: React.CSSProperties = {
  display: 'grid',
  // 12px dots on a 316px-wide panel gives 18 per row — 85 reports land in five
  // rows rather than twenty-two. Dots shrunk from 14px too: they are a
  // secondary reference, and at 14 they were competing with the graph's own
  // nodes for attention despite being the least connected fifth of the corpus.
  // 6px dots — half the previous 12. Thomas asked for them halved again after
  // the horizontal pass: these are the least connected fifth of the corpus and
  // the panel should read as a footnote, not as a third sidebar. 85 of them now
  // land in four rows about 220px wide.
  gridTemplateColumns: 'repeat(auto-fill, 6px)',
  gap: 4,
}

const tooltip: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: 300,
  padding: '14px 16px',
  background: 'rgba(8, 12, 21, 0.93)',
  border: '1px solid rgba(90, 115, 160, 0.3)',
  borderRadius: 10,
  backdropFilter: 'blur(10px)',
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
  color: '#556785',
  marginBottom: 6,
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
  borderTop: '1px solid rgba(90, 115, 160, 0.18)',
}
