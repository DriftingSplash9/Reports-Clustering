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
import SpaceFrame from './components/SpaceFrame'
import Environment from './components/Environment'
import ViewControls from './components/ViewControls'
import SearchPanel from './components/SearchPanel'
import CameraZoom from './components/CameraZoom'
import { PanelShell } from './components/PanelShell'
import { Flag } from './components/Flag'
import {
  BLOOM_THRESHOLD_MAX,
  BLOOM_THRESHOLD_MIN,
  DEFAULT_VIEW,
  type ViewSettings,
} from './lib/view'
import { dependencies, loadIssues, reports } from './data'
import {
  buildGraph,
  contains,
  dependents,
  dependsOn,
  describeRate,
  isDocumented,
  isOfficial,
  rolledUpAuthority,
  validate,
} from './lib/graph'
import { buildFocusIndex, computeFocus } from './lib/selection'
import {
  NO_FILTER,
  applyFilter,
  compile,
  compileEdges,
  isFiltering,
  toggleIn,
  type FilterState,
} from './lib/filter'
import {
  ALL_SCOPES,
  COMMERCIAL_COLOUR,
  rimColourFor,
  SCOPE_COLOUR,
  SCOPE_GROUPS,
  SCOPE_LABEL,
  colourForReport,
  scopeOf,
  type Scope,
} from './lib/palette'
import type {
  Country,
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
      console.warn('[data] edges defined twice, first kept:', loadIssues.duplicateEdges)
    }
    const issues = validate(reports, dependencies)
    for (const i of issues) {
      if (i.severity === 'error') console.error('[graph]', i.message)
      else console.warn('[graph]', i.message)
    }
    return buildGraph(reports, dependencies)
  }, [])

  const [hovered, setHovered] = useState<ScoredReport | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [bounds, setBounds] = useState<GraphBounds | null>(null)
  const [view, setView] = useState<ViewSettings>(DEFAULT_VIEW)
  const [filter, setFilter] = useState<FilterState>(NO_FILTER)
  const [flyTo, setFlyTo] = useState<FlyTo | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  /**
   * Last pointer position, held in a ref rather than state so that placing the
   * card costs no render — and so the card can be re-placed after its content
   * changes, which is when its height is finally known. See `place`.
   */
  const pointer = useRef({ x: 0, y: 0 })

  /**
   * What is drawn. Null when nothing is filtered, so the common case does no
   * set lookups at all — and so the renderer can tell "everything" apart from
   * "everything happens to pass", which are the same picture but not the same
   * amount of work.
   */
  const predicate = useMemo(() => compile(filter), [filter])
  const edgePredicate = useMemo(() => compileEdges(filter), [filter])
  const visible = useMemo(
    () =>
      isFiltering(filter) ? applyFilter(graph, predicate, edgePredicate) : null,
    [graph, filter, predicate, edgePredicate],
  )

  // Adjacency, rebuilt only when the graph or the filter changes. Selection
  // changes then cost a walk, not a rebuild.
  const focusIndex = useMemo(() => buildFocusIndex(graph, visible), [graph, visible])

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

  const selected = selectedId ? (graph.byId.get(selectedId) ?? null) : null

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

  const handleBounds = useCallback((b: GraphBounds) => setBounds(b), [])

  const handleZoomChange = useCallback(
    (zoom: number) => setView((v) => (v.zoom === zoom ? v : { ...v, zoom })),
    [],
  )

  /** Search picked a report: select it, and go there. */
  const handleChoose = useCallback((report: ScoredReport) => {
    setSelectedId(report.id)
    setFlyTo((f) => ({ id: report.id, nonce: (f?.nonce ?? 0) + 1 }))
  }, [])

  const toggleScope = useCallback((scope: Scope) => {
    setFilter((f) => ({ ...f, scopes: toggleIn(f.scopes, ALL_SCOPES, scope) }))
  }, [])

  // Null means no constraint, which is not the same as a list containing
  // everything — see filter.ts. An empty array is the honest representation of
  // "the user turned everything off", and an empty graph is the honest response.
  const toggleAllScopes = useCallback(() => {
    setFilter((f) => ({ ...f, scopes: f.scopes === null ? [] : null }))
  }, [])

  /**
   * A country header turns its whole group on or off.
   *
   * Off if any of the group is currently showing, on otherwise — so the first
   * click on a fully-lit group clears it, which is what clicking a lit thing
   * means. Doing it the other way round makes the header inert whenever the
   * group is partially selected.
   */
  const toggleGroup = useCallback((country: Country) => {
    const group = SCOPE_GROUPS.find((g) => g.country === country)
    if (!group) return
    setFilter((f) => {
      const current = new Set<string>(f.scopes ?? ALL_SCOPES)
      const anyOn = group.scopes.some((s) => current.has(s))
      for (const s of group.scopes) {
        if (anyOn) current.delete(s)
        else current.add(s)
      }
      const next = ALL_SCOPES.filter((s) => current.has(s))
      return { ...f, scopes: next.length === ALL_SCOPES.length ? null : next }
    })
  }, [])

  const top = useMemo(
    () => [...graph.nodes].sort((a, b) => b.authority - a.authority).slice(0, 3),
    [graph],
  )

  // Counted over the whole graph, not the filtered view: a legend row showing
  // "0" because you switched it off tells you nothing, while one showing how
  // many you are hiding tells you what the switch is worth.
  const scopeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const n of graph.nodes) {
      const s = scopeOf(n)
      counts[s] = (counts[s] ?? 0) + 1
    }
    return counts
  }, [graph])

  const commercialCount = useMemo(
    () => graph.nodes.filter((n) => !isOfficial(n)).length,
    [graph],
  )

  const impliedCount = useMemo(
    () => graph.edges.filter((e) => !isDocumented(e)).length,
    [graph],
  )

  const toggleEvidence = useCallback(
    (key: 'showDocumented' | 'showImplied') =>
      setFilter((f) => ({ ...f, [key]: !f[key] })),
    [],
  )

  return (
    <div style={{ width: '100%', height: '100%' }} onPointerMove={trackPointer}>
      <Canvas
        camera={{ position: [0, 0, 700], fov: FOV, near: 1, far: 12000 }}
        gl={{ antialias: true }}
        style={{ background: '#05070d', cursor: hovered ? 'pointer' : 'default' }}
        // Fires when a click hits nothing in the scene. Clearing here rather
        // than on the canvas element means orbiting over empty space, which
        // also ends in a click, is handled by R3F's own drag threshold.
        onPointerMissed={() => setSelectedId(null)}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[300, 300, 400]} intensity={1.1} />
        <pointLight position={[-300, -200, -300]} intensity={0.4} color="#4a6fb5" />

        {bounds && <Environment floorY={bounds.floorY} view={view} />}

        {bounds && (
          <SpaceFrame
            centre={bounds.centre}
            radius={bounds.nodeRadius}
            minY={bounds.minY}
            maxY={bounds.maxY}
            view={view}
          />
        )}

        <InfluenceGraph
          graph={graph}
          view={view}
          focus={focus}
          visible={visible}
          flyTo={flyTo}
          onHover={setHovered}
          onSelect={setSelectedId}
          onBounds={handleBounds}
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
        <EffectComposer>
          <Bloom
            intensity={view.glow <= 0.005 ? 0 : 0.45 + view.glow * 0.5}
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
          evidence={{
            showDocumented: filter.showDocumented,
            showImplied: filter.showImplied,
          }}
          onEvidenceChange={toggleEvidence}
          impliedCount={impliedCount}
          hasSelection={!!selected}
        />
      </PanelShell>

      <SearchPanel graph={graph} within={predicate} onChoose={handleChoose} />

      <PanelShell side="left" label="Reports" width={320}>
        <Hud
          nodeCount={graph.nodes.length}
          edgeCount={graph.edges.length}
          visibleNodeCount={visible ? visible.nodes.size : graph.nodes.length}
          visibleEdgeCount={visible ? visible.edges.size : graph.edges.length}
          top={top}
          scopeCounts={scopeCounts}
          commercialCount={commercialCount}
          filter={filter}
          onToggleScope={toggleScope}
          onToggleAllScopes={toggleAllScopes}
          onToggleGroup={toggleGroup}
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
        {hovered && <Detail report={hovered} graph={graph} />}
      </div>
    </div>
  )
}

/** Hover card. Replaces the always-on labels, which were unreadable in bulk. */
function Detail({
  report,
  graph,
}: {
  report: ScoredReport
  graph: ReturnType<typeof buildGraph>
}) {
  const colour = colourForReport(report)
  const official = isOfficial(report)
  const feeds = dependents(graph, report.id)
  const built = dependsOn(graph, report.id)

  const cadence = describeRate(report.releases_per_year)
  // Shown only when it differs. For most releases the number moves whenever the
  // document appears, and saying so twice would be noise; the prime rate, which
  // is published weekly and changes eight times a year, is the case worth the
  // extra line.
  const changes =
    report.changes_per_year !== undefined &&
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
              // Marked here as well as drawn dashed, because the hover card is
              // where someone decides whether to believe a chain.
              implied: edge ? !isDocumented(edge) : false,
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

function ListBlock({
  title,
  items,
}: {
  title: string
  items: { text: string; aside?: string | null; implied?: boolean }[]
}) {
  const shown = items.slice(0, 8)
  return (
    <div style={{ marginTop: 10 }}>
      <div style={section}>{title}</div>
      {shown.map((item) => (
        <div key={item.text} style={{ fontSize: 11.5, color: '#9fb0c9', lineHeight: 1.55 }}>
          {item.implied && (
            <span style={{ color: '#8b93a4' }} title="No document states this dependency">
              ◌{' '}
            </span>
          )}
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

function Hud({
  nodeCount,
  edgeCount,
  visibleNodeCount,
  visibleEdgeCount,
  top,
  scopeCounts,
  commercialCount,
  filter,
  onToggleScope,
  onToggleAllScopes,
  onToggleGroup,
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
  scopeCounts: Record<string, number>
  commercialCount: number
  filter: FilterState
  onToggleScope: (scope: Scope) => void
  onToggleAllScopes: () => void
  onToggleGroup: (country: Country) => void
  onToggleCommercial: () => void
  onClearFilter: () => void
  selected: ScoredReport | null
  builtFromCount: number
  feedsIntoCount: number
}) {
  const filtered = visibleNodeCount !== nodeCount
  const scopeOn = (s: Scope) => !filter.scopes || filter.scopes.includes(s)
  const allScopesOn = filter.scopes === null
  const noScopesOn = filter.scopes !== null && filter.scopes.length === 0

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
        The legend and the filter are the same control.
        Keeping them separate would have meant printing every colour and count
        twice, and it would have hidden the more useful fact: the thing you can
        switch off is exactly the thing the colour names. Clicking a row drops
        that publisher scope out of the picture without moving or resizing
        anything that remains — see filter.ts.
      */}
      <div style={{ ...section, marginTop: 14 }}>Publisher scope — click to filter</div>

      {/*
        A master row above everything. Turning it all off and one group back on
        is the common move — it is how you look at a single system — and without
        this it costs eight clicks in the wrong direction first.

        Three-state in appearance rather than two: with a subset chosen it shows
        neither fully on nor fully off, because "some" is a real answer and a
        control that lies about it is worse than none.
      */}
      <LegendRow
        colour="#8fa3c0"
        label={allScopesOn ? 'Everything' : noScopesOn ? 'Nothing' : 'Some scopes'}
        count={nodeCount}
        on={allScopesOn}
        partial={!allScopesOn && !noScopesOn}
        onClick={onToggleAllScopes}
      />

      {/*
        Grouped by country, and the group header is itself a toggle. This is the
        shape the data actually has: "Canadian" is a question people ask, and
        before this the largest group on screen — 62 federal nodes in one blue —
        merged Statistics Canada with the Bureau of Labor Statistics.
      */}
      {SCOPE_GROUPS.map((group) => {
        const total = group.scopes.reduce((n, s) => n + (scopeCounts[s] ?? 0), 0)
        if (total === 0) return null
        const shown = group.scopes.filter((s) => scopeOn(s) && (scopeCounts[s] ?? 0) > 0)
        const present = group.scopes.filter((s) => (scopeCounts[s] ?? 0) > 0)
        return (
          <div key={group.country} style={{ marginTop: 7 }}>
            <div
              onClick={() => onToggleGroup(group.country)}
              style={{
                ...row,
                alignItems: 'center',
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  display: 'inline-block',
                  background:
                    shown.length === present.length
                      ? rimColourFor(group.country)
                      : 'transparent',
                  border: `1px solid ${rimColourFor(group.country)}`,
                  opacity: shown.length ? 1 : 0.45,
                }}
              />
              <span
                style={{
                  flex: 1,
                  color: shown.length ? '#c2cfe4' : '#4d5c74',
                  letterSpacing: '0.04em',
                }}
              >
                {group.label}
              </span>
              <span style={{ color: shown.length ? '#5e6f8a' : '#3d4a5e' }}>{total}</span>
            </div>
            {present.map((s) => (
              <div key={s} style={{ paddingLeft: 14 }}>
                <LegendRow
                  colour={SCOPE_COLOUR[s]}
                  label={SCOPE_LABEL[s]}
                  count={scopeCounts[s] ?? 0}
                  on={scopeOn(s)}
                  onClick={() => onToggleScope(s)}
                />
              </div>
            ))}
          </div>
        )
      })}

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
      // The panel as a whole is pointer-transparent so it never eats an orbit
      // drag. Only the rows that do something take the pointer back.
      style={{ ...row, alignItems: 'center', cursor: 'pointer', pointerEvents: 'auto' }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 8,
          display: 'inline-block',
          // Hollow when off. A greyed-out dot would collide with the grey that
          // already means "commercial". Half-filled for a partial selection,
          // which is the one state a checkbox cannot honestly show.
          background: on ? colour : 'transparent',
          borderLeft: partial ? `4px solid ${colour}` : undefined,
          border: partial ? undefined : `1px solid ${colour}`,
          boxShadow: partial ? `inset 3px 0 0 ${colour}` : undefined,
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
  pointerEvents: 'none',
}

const selectionBlock: React.CSSProperties = {
  marginTop: 14,
  paddingTop: 12,
  paddingBottom: 2,
  borderTop: '1px solid rgba(90, 115, 160, 0.18)',
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
  // A card taller than the window cannot be clamped into it, so the overflow
  // has to be cut somewhere. Cutting at the bottom loses the tail of a list;
  // cutting at the top lost the title. The card is built title-first for
  // exactly this reason.
  maxHeight: 'calc(100vh - 36px)',
  overflow: 'hidden',
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
