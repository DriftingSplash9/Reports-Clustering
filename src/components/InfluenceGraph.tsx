import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import ThreeForceGraph from 'three-forcegraph'
import { forceCollide } from 'd3-force-3d'
import type { Graph, JurisdictionLevel, ScoredReport } from '../lib/types'
import { RELATIONSHIP_WEIGHT, isDocumented, radiusFor } from '../lib/graph'
import { rimColourFor, colourForReport, familyOf } from '../lib/palette'
import { isOrbId, orbId, type OrbNode } from '../lib/hierarchy'
import {
  isStandingInstrument,
  nodeGeometry,
  nodeMaterial,
  setNodeRim,
  type NodeMaterial,
} from './nodeVisuals'
import { edgeKey, type Focus } from '../lib/selection'
import type { VisibleSet } from '../lib/filter'
import { countryAffinityForce } from '../lib/geoAffinity'
import {
  DIM_NODE_EMISSIVE,
  DIM_NODE_OPACITY,
  SCENE_BACKGROUND,
  type ViewSettings,
} from '../lib/view'
import {
  gradientLinkMaterial,
  pulseMaterial,
  setLinkFocus,
  setLinkFog,
  teardropGeometry,
  type GradientLinkMaterial,
} from './linkVisuals'
import { frameGeometry } from './SpaceFrame'

/**
 * The 3D force graph.
 *
 * three-forcegraph owns the physics and the scene objects; React owns nothing
 * inside it. We build the object once, hand it the data, and tick it each
 * frame. That boundary is deliberate — mixing React state into a force
 * simulation that mutates positions 60 times a second goes badly.
 *
 * Nodes carry no labels. Apparent size is the authority signal and text was
 * competing with it; identity is available on hover instead.
 */

interface LinkDatum {
  /** Rendering source — the report being depended upon. See note below. */
  source: string
  /** Rendering target — the report that depends on it. */
  target: string
  weight: number
  /** Releases per year of the upstream report. Drives pulse rate. */
  upstreamCadence: number
  /** Colour of the report being depended upon — where the line and pulse start. */
  colour: string
  /** Colour of the dependent report — where the line ends. */
  endColour: string
  /** Drawn dashed, and never pulsed. See EvidenceKind in types.ts. */
  implied: boolean
  /**
   * Extra rest length for links touching high-degree nodes, precomputed at
   * build time (the d3 distance accessor sees mutated link objects, so
   * anything derived from the raw edge list has to be carried on the datum).
   * sqrt-scaled so the CPI's forty edges fan out without exiling its leaves.
   */
  hubRoom: number
  /**
   * Key in the *data model's* direction, not the rendered one.
   *
   * Links are rendered reversed (see below), so this cannot be derived from
   * `source` and `target` at lookup time without flipping them again — which
   * is exactly the kind of double negative that produces a focus set that
   * lights the right nodes and the wrong lines. Computed once, here.
   */
  key: string
}

interface PositionedNode extends ScoredReport {
  x: number
  y: number
  z: number
}

/**
 * Field of view.
 *
 * The most important number in the file. At a wide angle, apparent size is
 * dominated by distance from the camera, so a peripheral leaf near the lens
 * outdraws the foundational report behind it — inverting the one rule the
 * graph exists to express. A long lens compresses depth so a node reads as
 * large because it *is* large.
 */
export const FOV = 24

/**
 * How many ticks to let the layout run, un-rendered, before the very first
 * paint — replacing the old `WARMUP_TICKS = 400`, which ran all 400
 * synchronously in one blocking loop before anything mounted. Measured
 * 2026-08-11 at ~770 nodes: that loop cost tens of seconds on a slow CPU,
 * during which the UI shell had already mounted and the graph simply had
 * not — "menus first, graph a minute later."
 *
 * This is not a replacement warmup of the same kind, just a small floor:
 * three-forcegraph initialises every node close to the origin, so fitting
 * a camera to tick 0's positions would frame a near-zero-radius point and
 * put the camera inside it for a frame. A few dozen ticks is enough for
 * the cloud to leave that degenerate state without meaningfully changing
 * time-to-first-paint. The real settling — and the real fit — happens
 * live, after this: see `runFit`'s two call sites below.
 */
const MIN_TICKS_BEFORE_FIRST_PAINT = 30

/**
 * How often, and for how long after a rebuild, the camera re-fits while a
 * layout is still actively settling — on top of the original rough-then-
 * precise pair below.
 *
 * That pair was tuned for a layout that starts near the origin and expands
 * outward gradually — one early fit to mount the scene, one final fit once
 * `onEngineStop` says it has stopped moving, nothing in between needed. A
 * drilldown toggle breaks that assumption: newly-revealed siblings all start
 * seeded at (roughly) their family orb's last position — see the jitter note
 * on `lastPositions` above — and separate under repulsion much faster and
 * further than a from-the-origin warmup ever moved. Worse, `onEngineStop`
 * fires on alpha decay, not on visual stillness — measured 2026-08-12: it
 * fired while the cloud was still visibly travelling several seconds before
 * it actually stopped, so gating periodic refits on "not yet settled" left
 * them without a real window to run in.
 *
 * Timed in wall-clock seconds (via `useFrame`'s `delta`), not a tick count.
 * A tick is not a fixed amount of real time — it is whatever one frame's
 * `tickFrame()` call advances, which on a slow machine or a heavy scene can
 * take many times longer than on a fast one. A tick-counted window is
 * generous on a fast machine and too short on a slow one, exactly backwards
 * from what is needed: the slower the machine, the longer the settle
 * actually takes and the longer the camera needs to keep tracking it. Timing
 * this in seconds instead bounds the worst case the same way regardless of
 * hardware — the camera is never more than `REFIT_INTERVAL_SECONDS` of real
 * time behind the cloud's actual extent, for up to `REFIT_WINDOW_SECONDS`
 * after every rebuild. Past the window a user's own camera drag is left
 * alone, same as before.
 */
const REFIT_INTERVAL_SECONDS = 0.2
const REFIT_WINDOW_SECONDS = 12

/**
 * The orb "click me" breath.
 *
 * Thomas, 2026-08-12: *"maybe when we are viewing the top level the orbs that
 * are paths to lower levels can slow blink or pulse saying 'click me', then
 * when we are viewing the second from the top level (the nations) with edges
 * going to the states and provinces can pulse."*
 *
 * Both halves of that describe the same set, which is why this is one rule and
 * not two: **an orb is pulsed, a real node never is.** At every depth the orbs
 * are exactly the things that still hold something and exactly the things a
 * double-click opens, so "what leads deeper" and "what is an orb" are the same
 * question. Pulsing real nodes would actively mislead — double-clicking a real
 * node *folds*, it does not open (see `toggleDrilldown`), so a pulsing national
 * node would be advertising the opposite of what it does.
 *
 * It also needs no upkeep as the walk proceeds. At full depth there are no orbs
 * left, so the pulse stops on its own with nothing to switch off.
 *
 * The swing is mostly *downward* from the node's normal brightness rather than
 * up from it. Emissive intensity is capped below 1 everywhere else in this file
 * because bloom clips above that and the node stops reading as its true size —
 * a pulse that brightened past the cap would make every orb flash to the same
 * white blob at the top of each cycle, destroying the size and colour channels
 * once per period. Dimming and recovering reads as breathing and costs nothing.
 */
const ORB_PULSE_PERIOD_SECONDS = 2.6
/** Emissive floor as a fraction of the orb's normal brightness. */
const ORB_PULSE_FLOOR = 0.42
/** How much the orb physically swells at the top of the breath. */
const ORB_PULSE_SCALE = 0.07

/**
 * Node size, as a fraction of the cloud it sits in.
 *
 * `radiusFor` returns 2.2 to 8 world units, and those numbers were chosen at
 * roughly 120 nodes. Measured on 2026-08-10 at 555: the connected cloud has a
 * radius near 1,400 units and the fit camera sits about 8,000 back, which puts
 * one screen pixel at 4.2 world units — so the smallest node was **1.0 pixel
 * across** and the largest 3.8. The graph was invisible until you zoomed, and
 * nothing was broken; the constants had simply been outgrown.
 *
 * A fixed radius cannot survive a growing corpus, because the cloud radius
 * grows with node count and the node radius does not. So the *ratio* is the
 * constant instead: the largest node is held at this fraction of the cloud
 * radius, whatever the corpus size, and the whole 2.2-to-8 range scales with it
 * so the authority encoding is untouched.
 *
 * 1.65% puts the largest node near 11 screen pixels and the smallest near 3 at
 * the opening fit — legible without turning the cloud into a bag of marbles.
 *
 * **The collision radius is deliberately left alone** (Thomas, Q1). It also
 * reads `radiusFor`, so scaling it too would push nodes apart, which grows the
 * cloud, which grows the scale — the layout chasing its own tail. Visual size
 * scales; spacing does not. The cost is that nodes may overlap more at high
 * scale factors, which is a thing to look at rather than reason about.
 */
const TARGET_LARGEST_FRACTION = 0.0165
const MAX_BASE_RADIUS = 8

function nodeScaleFor(cloudRadius: number): number {
  const wanted = (cloudRadius * TARGET_LARGEST_FRACTION) / MAX_BASE_RADIUS
  // Never below 1: at small corpus sizes the original constants are already
  // right, and shrinking them would undo a legibility fix in the other
  // direction. Capped so a single far-flung cluster cannot inflate everything.
  return Math.min(6, Math.max(1, wanted))
}

/**
 * Pulse speed, as a fraction of link length per frame.
 *
 * Anchored so an annual release crawls and a daily one streams. Logarithmic,
 * because the cadence range spans 1 to ~250 releases a year and a linear map
 * would make everything below monthly indistinguishable from stationary.
 */
function pulseSpeed(releasesPerYear: number): number {
  return 0.0016 + Math.log10(Math.max(1, releasesPerYear)) * 0.0042
}

/** How many pulses ride a given edge at once. Frequent releases feel busier. */
function pulseCount(releasesPerYear: number): number {
  if (releasesPerYear >= 100) return 4
  if (releasesPerYear >= 12) return 3
  if (releasesPerYear >= 4) return 2
  return 1
}

/**
 * A synchronous side-channel between `runFit` and CameraZoom.
 *
 * These two have to agree *within a single frame* and React props cannot carry
 * that: `runFit` moves the camera during `useFrame`, and the `fitDistance` prop
 * describing where it moved it to does not reach CameraZoom until the next
 * render. In between, CameraZoom's `cameraDistance / fitDistance` inference
 * divides the new distance by the old one and reports the ratio as a zoom the
 * user never asked for — which then pushes the camera to `newFitDistance ×
 * thatRatio` and throws the graph off screen. Measured 2026-08-12: a spurious
 * zoom of 2.85 on opening the national tier, camera at 22,587 against a fit
 * distance of 7,935, tracking then permanently disabled because
 * `cameraMovedOffFit` correctly concluded someone had grabbed the camera.
 *
 * Routing it through App state does not help, and was tried: CameraZoom's
 * `useFrame` runs *after* InfluenceGraph's in the same frame, so its bad value
 * is simply the last write to land in the batch.
 *
 * Module scope rather than context because there is exactly one scene, one
 * camera and one zoom slider in this app, and because the whole point is to be
 * readable synchronously from a frame callback — which is the one thing React
 * state cannot be.
 */
export const fitSync = {
  /** Distance the last camera-moving fit placed the camera at. 0 before any. */
  distance: 0,
  /** Bumped on every camera-moving fit, so CameraZoom can notice one happened. */
  stamp: 0,
}

export interface GraphBounds {
  centre: THREE.Vector3
  radius: number
  /** Only the levels actually present in the data. */
  levels: JurisdictionLevel[]
  /** Camera distance chosen by the auto-fit. The zoom slider works off this. */
  fitDistance: number
  /**
   * Whether this fit actually moved the camera, as opposed to only measuring.
   *
   * The zoom slider needs to know, and cannot work it out. CameraZoom infers
   * the current zoom as `cameraDistance / fitDistance`, which is only sound
   * while nothing but the wheel moves the camera — and a tracking re-fit moves
   * it constantly. Worse, it sees the two halves a render apart: `runFit`
   * places the camera at the *new* fit distance, but the `fitDistance` prop is
   * still the old one for one frame, so the inferred zoom spikes to the ratio
   * between them. Measured 2026-08-12 opening the national tier: an inferred
   * zoom of 2.5, which then pushed the camera out to 22,853 units from a fit
   * distance of 9,156 — after which `cameraMovedOffFit` quite correctly read
   * that as the user taking the camera and shut tracking off for good, with
   * every node off screen. That is the "black screen after changing a setting".
   *
   * A fit that moves the camera puts it exactly at the fit distance, so the
   * honest zoom immediately afterwards is 1 by construction. Saying so is what
   * breaks the loop.
   */
  movedCamera: boolean
  /** Height of the floor plane, so drop lines know where to land. */
  floorY: number
  /** Vertical extent of the node cloud, which the room is built around. */
  minY: number
  maxY: number
  /**
   * Bounding radius of the node cloud. The room is sized from this so it hugs
   * the network rather than inheriting empty space around it.
   */
  nodeRadius: number
}

/**
 * A request to move the camera to a node.
 *
 * The nonce is what makes searching for the same report twice work. Without it
 * the prop would be unchanged on the second search and nothing would happen,
 * which reads as the feature being broken rather than as already-there.
 */
export interface FlyTo {
  id: string
  nonce: number
}

/** How long the camera takes to arrive, in seconds. */
const FLIGHT_SECONDS = 0.75

export default function InfluenceGraph({
  graph,
  view,
  focus,
  visible,
  flyTo,
  resetSignal,
  onHover,
  onSelect,
  onBounds,
  onToggleNode,
}: {
  graph: Graph
  view: ViewSettings
  /**
   * Bumped by the Reset control. Restores the opening camera from the values
   * the fit already measured, rather than re-running the fit — a second fit
   * would mean re-settling the whole layout, which would come to rest
   * somewhere slightly different, so "reset the view" would silently move
   * the graph.
   */
  resetSignal: number
  /** Null when nothing is selected, which means everything renders at full strength. */
  focus: Focus | null
  /**
   * Which nodes and edges are drawn. Null means everything.
   *
   * Applied through the library's visibility accessors, which filter only the
   * WebGL digest — the force simulation still runs over the full node list, so
   * hiding a node freezes the rest of the graph exactly where it is. Rebuilding
   * `graphData` instead would re-run the layout and scatter everything the user
   * was looking at, which is the one thing a filter must never do.
   */
  visible: VisibleSet | null
  /** Set by search. Null while no flight has been requested. */
  flyTo: FlyTo | null
  onHover: (report: ScoredReport | null) => void
  onSelect: (id: string | null) => void
  onBounds: (bounds: GraphBounds) => void
  /**
   * Double-click on a node or an orb. App.tsx owns the drilldown state and
   * decides what a double-click on this particular id means (open an orb,
   * fold a real node's rung back in) — this component only reports which id
   * was hit, the same division of labour `onSelect` already has.
   */
  onToggleNode: (id: string) => void
}) {
  const ref = useRef<ThreeForceGraph | null>(null)
  const fogRef = useRef(new THREE.Fog(SCENE_BACKGROUND, 1e9, 1e9 + 1))
  /** Centre and radius of the node cloud, measured once the layout settles. */
  const cloud = useRef<{ centre: THREE.Vector3; radius: number } | null>(null)
  /**
   * Last known position of every id seen so far, real report or orb alike —
   * updated every frame in `useFrame`, read once per `forceGraph` rebuild to
   * seed new nodes.
   *
   * A drilldown toggle changes `graph`'s identity (App.tsx builds a fresh
   * `disclosedGraph` object every time), which rebuilds `forceGraph` from
   * scratch below — a new `ThreeForceGraph`, a fresh simulation, everything
   * starting near the origin the way d3-force-3d always initialises an
   * unpositioned node. Without this, "double-click to open" would mean every
   * node in the graph re-scatters from a point, which is a re-layout wearing
   * a drilldown's clothes. Seeding continuity here is what makes it read as
   * unfolding *from* the orb that was clicked instead.
   *
   * Kept for every id ever seen, not cleared on rebuild, because an orb's id
   * is stable across depth changes (`orb:${family}`, see hierarchy.ts) and a
   * real node's id is stable across the whole session — so a position learned
   * three drilldown toggles ago is still the right thing to seed from if that
   * exact id reappears.
   */
  const lastPositions = useRef(new Map<string, { x: number; y: number; z: number }>())
  /**
   * Whether the scene has had its first (rough) fit and is mounted.
   * Renamed nothing, changed meaning: this used to flip true only after a
   * blocking 400-tick warmup, so "mounted" and "settled" were the same
   * moment. They are different moments now — see `settledOnce` below.
   */
  const fitted = useRef(false)
  /** Ticks applied since this `forceGraph` was (re)built — gates the first fit. */
  const tickCount = useRef(0)
  /**
   * Whether any fit has ever run this session. Unlike `fitted` this is never
   * reset on rebuild — it distinguishes "the fit that mounts the scene", which
   * must always move the camera, from every rebuild's first fit after it,
   * which must not fight a camera the user is holding. See the `mountFit` note
   * in `useFrame`.
   */
  const everFitted = useRef(false)
  /**
   * Whether the authoritative, post-convergence fit has run. Guards
   * `onEngineStop` so it re-fits exactly once per `forceGraph` — not on
   * every subsequent reheat (the geo-affinity slider, for one, reheats the
   * simulation on every change without wanting a camera snap each time).
   */
  const settledOnce = useRef(false)
  /**
   * Wall-clock seconds elapsed since this `forceGraph` was (re)built, and
   * since the last periodic re-fit — see `REFIT_INTERVAL_SECONDS`. Two
   * separate accumulators because they reset on different events: the first
   * only on rebuild, the second every time a periodic fit actually runs.
   */
  const settleClock = useRef(0)
  const sinceRefit = useRef(0)
  /** Wall-clock seconds, free-running, driving the orb breath. Never reset. */
  const pulseClock = useRef(0)
  /**
   * Whether the user has taken the camera since this `forceGraph` was built.
   *
   * The tracking re-fit above exists to keep a newly-exploded cloud in frame,
   * and it does that by *setting* the camera — position, target and all. That
   * is fine against a layout nobody is touching and actively hostile against
   * one they are: for up to `REFIT_WINDOW_SECONDS` after every rebuild, any
   * drag or scroll was being overwritten on the next re-fit. Measured
   * 2026-08-12 against `npm run dev`: with the window open, a drag-orbit
   * reached 0.8° off-axis before being flattened back and the wheel could not
   * move the camera distance off the fit value at all. Reported by Thomas as
   * "sometimes when i move the camera it snaps back, when i scroll to zoom it
   * snaps back to fit", which is exactly what it is — the tracking fit was
   * winning every fifth of a second, and someone exploring the graph is
   * essentially always inside that window, because exploring is what opens it.
   *
   * So the fit yields. Once this is true the camera is left alone until the
   * next rebuild, and a rebuild is always something the user just did (a
   * drilldown toggle, a filter, the spread slider), so "you moved it, you keep
   * it, until you ask for a new view" is the whole rule.
   *
   * **It only yields the camera, not the measurement** — see `runFit`'s
   * `moveCamera` parameter. Everything else that pass computes (node scale,
   * the fog cloud, the scene bounds, and `fitState`, which is where Reset
   * flies back to) keeps updating on the same 0.2s cadence. Skipping the fit
   * wholesale would have left `fitState` describing the cloud as it was
   * *before* the level opened, so Reset — the one escape hatch from a camera
   * pointed at nothing — would have framed the wrong thing and stranded them.
   */
  const userOwnsCamera = useRef(false)
  /** Whether a pointer/wheel/touch gesture on OrbitControls is in progress. */
  const gestureActive = useRef(false)
  /**
   * Set while `runFit` is writing the camera, so the `change` event that our
   * own `orbit.update()` emits is not mistaken for the user's input. Without
   * it, holding the mouse down on a node — a plain select, no drag — would
   * open a gesture, catch our own re-fit's change event, and stop tracking.
   */
  const applyingFit = useRef(false)
  /**
   * The target and distance `runFit` last set, so a camera change *nobody*
   * made through OrbitControls is still detectable — the zoom slider writes
   * `camera.position` directly (see CameraZoom.tsx) and the search fly-to
   * writes both, and neither raises a gesture. Deliberately compares distance
   * and target rather than raw position: auto-orbit changes position every
   * frame while holding both of these exactly constant, so this stays quiet
   * for it, and pure orbit-dragging — which also holds both constant — is
   * what the gesture listener above is for. The two together cover the ways
   * the camera can move; neither does alone.
   */
  const fitPose = useRef<{ target: THREE.Vector3; distance: number } | null>(null)
  /**
   * Visual scale for every node mesh, set once the fit has measured the cloud.
   * Held in a ref rather than state because it is read inside
   * `nodeThreeObject`, which the library calls at times React does not drive —
   * a node rebuilt by a filter change has to be born at the current scale or it
   * appears at the wrong size for a frame.
   */
  const nodeScale = useRef(1)
  /** Where the fit put the camera, so Reset can go back without re-laying out. */
  const fitState = useRef<{ centre: THREE.Vector3; distance: number } | null>(null)
  /** Camera distance chosen by the auto-fit, kept for the search flight. */
  const fitDistance = useRef(0)
  const { camera, controls, scene } = useThree()

  /**
   * The spread slider rebuilds the whole layout (forces, warmup, camera
   * refit), which costs a visible beat at 335 nodes. Debounced so a drag
   * costs one rebuild at the end, not one per pixel of travel.
   */
  const [spreadApplied, setSpreadApplied] = useState(view.spread)
  useEffect(() => {
    const t = setTimeout(() => setSpreadApplied(view.spread), 300)
    return () => clearTimeout(t)
  }, [view.spread])

  /**
   * Node meshes by report id, so focus changes can mutate materials in place.
   *
   * The alternative — re-calling `nodeThreeObject` — rebuilds every sphere and
   * its geometry on every click. Fine at 33 nodes, wasteful at the 300 this is
   * aimed at, and it discards the meshes mid-simulation for no gain.
   */
  const meshes = useRef(new Map<string, THREE.Mesh>())

  /** One gradient material per edge, keyed the same way the focus set is. */
  const linkMaterials = useRef(new Map<string, GradientLinkMaterial>())

  /**
   * How many meshes were present when focus was last applied.
   *
   * three-forcegraph may rebuild its node objects, and a rebuilt sphere is born
   * at full brightness. Watching the map size catches that and re-applies —
   * cheaply, and without polling materials every frame.
   */
  const appliedMeshCount = useRef(-1)

  /**
   * The current focus, readable from inside three-forcegraph's accessors.
   *
   * Those accessors are plain callbacks held by an object built once, so they
   * close over the first render's props forever. A ref is the only way they
   * see anything current.
   */
  const focusRef = useRef<Focus | null>(null)
  focusRef.current = focus

  /** Same closure problem as `focusRef`, same solution. */
  const visibleRef = useRef<VisibleSet | null>(null)
  visibleRef.current = visible

  /**
   * Same closure problem again, but for a force rather than an accessor —
   * `countryAffinityForce` reads this every tick so the slider can retune
   * the pull live, without the 400-tick re-warmup `spread` pays on every
   * change. See `lib/geoAffinity.ts`.
   */
  const geoAffinityStrength = useRef(0)
  geoAffinityStrength.current = view.geoAffinity

  const litLink = (l: LinkDatum) => !focusRef.current || focusRef.current.edges.has(l.key)

  const shownNode = (id: string) => !visibleRef.current || visibleRef.current.nodes.has(id)
  const shownLink = (l: LinkDatum) =>
    !visibleRef.current || visibleRef.current.edges.has(l.key)

  const forceGraph = useMemo(() => {
    // Meshes from a previous graph are about to be replaced; holding them would
    // leak and, worse, let focus updates write to spheres no longer in a scene.
    meshes.current.clear()

    // Seed positions for continuity across a drilldown toggle — see the note
    // on `lastPositions`. Three cases, checked in order:
    //  1. This exact id was on screen before (an orb that just changed which
    //     rung it aggregates, or a real node that was already expanded) —
    //     reuse its last known spot outright.
    //  2. A freshly-created orb — start at the centroid of whichever of its
    //     own members last had a known position, so it appears where the
    //     mass it now stands for actually was, not at a fresh random point.
    //  3. A freshly-revealed real node (its orb just opened) — start at that
    //     orb's last known position, so it visibly emerges from the sphere
    //     that used to represent it. `orbId` is stable per family regardless
    //     of depth, so the orb's last position is there even though the orb
    //     object itself has just been replaced or removed this same rebuild.
    // Anything none of the three can place (first load) is left unpositioned
    // and d3-force-3d randomises it near the origin, exactly as before.
    //
    // Isolated real reports (no edges in either direction) are left out of
    // the 3D scene entirely — see `IsolatedShelf` in App.tsx, which renders
    // them instead as a fixed panel in screen space. They used to be placed
    // here too, pinned in a world-space column beside the cloud, but a
    // world-space position — pinned or not — still turns with the camera:
    // dragging or auto-orbiting swings that column around the graph exactly
    // like everything else in the scene, which is not what "set aside from
    // the graph" was supposed to look like, and read as distracting rather
    // than as the deliberate exception it was meant to be.
    const nodes = graph.nodes
      .filter((n) => isOrbId(n.id) || n.in_degree > 0 || n.out_degree > 0)
      .map((n) => {
        const seed = lastPositions.current.get(n.id)
        if (seed) return { ...n, x: seed.x, y: seed.y, z: seed.z }

        if (isOrbId(n.id)) {
          const points = (n as OrbNode).members
            .map((m) => lastPositions.current.get(m.id))
            .filter((p): p is { x: number; y: number; z: number } => !!p)
          if (points.length) {
            const x = points.reduce((s, p) => s + p.x, 0) / points.length
            const y = points.reduce((s, p) => s + p.y, 0) / points.length
            const z = points.reduce((s, p) => s + p.z, 0) / points.length
            return { ...n, x, y, z }
          }
          return { ...n }
        }

        // A freshly-revealed real node starts at its family orb's last
        // position — but every sibling revealed by the same toggle reads the
        // *same* orb position, so an orb with dozens of members hands out
        // dozens of exactly-coincident starting points. Charge repulsion
        // between nodes at zero distance is degenerate (d3-force-3d falls
        // back to jittering them apart itself, violently, over the following
        // several seconds) and was the actual cause of a reported bug:
        // opening a large family (EU's 73 supranational reports, say) sent
        // the whole cloud flying far outside the frame for 5-10+ seconds
        // before the post-settle fit caught up and recentred the camera —
        // reading, to someone watching it happen, as the graph having
        // crashed rather than unfolded. A small random offset per node
        // breaks the exact coincidence up front, so the siblings separate
        // gently under the same forces instead of exploding apart from a
        // single point — the "unfolding" the feature was meant to look like.
        const parent = lastPositions.current.get(orbId(familyOf(n.country)))
        if (!parent) return { ...n }
        const SEED_JITTER = 14
        const jitter = () => (Math.random() - 0.5) * SEED_JITTER
        return {
          ...n,
          x: parent.x + jitter(),
          y: parent.y + jitter(),
          z: parent.z + jitter(),
        }
      })

    // Links are rendered REVERSED relative to the data model.
    //
    // In the data, an edge runs from the dependent report to the one it is
    // built from. But influence travels the other way: when the CPI updates,
    // the effect propagates outward to everything indexed to it. Arrows and
    // pulses both need to show that direction, so rendering flips the edge.
    // The data model is untouched — only what you see is reversed.
    // Node degree, for link rest lengths: a hub's neighbourhood needs more
    // room than a chain's, and at 335 nodes the difference is the difference
    // between a readable cluster and a hairball.
    const degree = new Map<string, number>()
    for (const e of graph.edges) {
      degree.set(e.source_report_id, (degree.get(e.source_report_id) ?? 0) + 1)
      degree.set(e.target_report_id, (degree.get(e.target_report_id) ?? 0) + 1)
    }

    const links: LinkDatum[] = graph.edges.map((e) => {
      const upstream = graph.byId.get(e.target_report_id)
      const downstream = graph.byId.get(e.source_report_id)
      return {
        source: e.target_report_id,
        target: e.source_report_id,
        weight: e.strength ?? RELATIONSHIP_WEIGHT[e.relationship_type],
        upstreamCadence: upstream?.releases_per_year ?? 1,
        colour: upstream ? colourForReport(upstream) : '#7f9ad0',
        endColour: downstream ? colourForReport(downstream) : '#7f9ad0',
        implied: !isDocumented(e),
        hubRoom:
          3.5 *
          (Math.sqrt(degree.get(e.source_report_id) ?? 1) +
            Math.sqrt(degree.get(e.target_report_id) ?? 1)),
        key: edgeKey(e.source_report_id, e.target_report_id),
      }
    })

    // One material per link, held so focus changes are a uniform write rather
    // than a rebuild, and so the library's repeated `obj.material = ...` on
    // every digest keeps assigning the same object instead of churning.
    linkMaterials.current.clear()
    for (const l of links) {
      linkMaterials.current.set(
        l.key,
        gradientLinkMaterial(l.colour, l.endColour, l.implied),
      )
    }

    // Geometry and material for a link's pulses. three-forcegraph reads only
    // these two fields off the object it is handed, and reuses them across all
    // the photons on that link.
    const particleObjects = new Map<string, THREE.Mesh>()
    for (const l of links) {
      particleObjects.set(
        l.key,
        new THREE.Mesh(
          // Sized up twice on 2026-08-10, both times on Thomas looking at it:
          // 1.6-3.5 read as near-invisible specks, 2.4-5.3 was still short, and
          // this is 3.2-7.0. Worth noting the moving target underneath — nodes
          // themselves grew that day too (see TARGET_LARGEST_FRACTION), so a
          // pulse that was legible against the old node size no longer was.
          teardropGeometry(3.2 + l.weight * 3.8),
          pulseMaterial(l.colour),
        ),
      )
    }
    // The accessor's type will not accept null, and a link with no entry would
    // be a bug rather than a case to handle, so this is a visible fallback
    // rather than a silent one.
    const fallbackParticle = new THREE.Mesh(
      teardropGeometry(4),
      pulseMaterial('#7f9ad0'),
    )

    const fg = new ThreeForceGraph()
      .graphData({ nodes, links })
      .numDimensions(3)
      .nodeId('id')
      .nodeVisibility((node: object) => shownNode((node as ScoredReport).id))
      // Filtering a link hides its line, its arrowhead and its pulses together,
      // because all three digest off the visible-link list. That is the right
      // coupling *here* and the wrong one for the Edges toggle, which hides
      // lines while deliberately keeping the pulses — hence that one works
      // through the material instead. Two different questions, two mechanisms.
      .linkVisibility((l: object) => shownLink(l as LinkDatum))
      .nodeThreeObject((node: object) => {
        const n = node as ScoredReport
        const colour = colourForReport(n)
        const radius = radiusFor(n.size_score)

        // No disposal of a superseded mesh here: three-forcegraph deallocates
        // objects it removes from its digest, so a node hidden by a filter is
        // already cleaned up by the time this runs again for it. Disposing a
        // second time would be redundant, and reads as though something were
        // being managed here that is not.

        // Bloom keys off luminance, so this doubles as the glow control:
        // authoritative nodes bleed light, peripheral ones stay contained.
        // Capped below 1 — past that the bloom pass clips everything to
        // white and the colour and size channels both stop working.
        const emissive = 0.3 + n.size_score * 0.62

        // Born already dimmed if it is outside the current focus. The library
        // can rebuild these objects at times we do not control, and a sphere
        // that ignores the focus for a frame or two reads as a flicker.
        const lit = !focusRef.current || focusRef.current.nodes.has(n.id)

        // A one-off instrument is drawn hollow — same sphere, emptied fill, and
        // a border in its own scope colour rather than the country rim every
        // other node carries. See `isStandingInstrument`.
        //
        // The border colour is `colour`, not `rimColourFor(n.country)`, and
        // that is deliberate: on a hollow node the rim is the only colour
        // there is, so it has to be the one the legend explains. A hollow
        // node's ring is exactly the colour a solid node's fill would be.
        //
        // An orb is checked first and excludes `hollow` outright. Every orb
        // is built with `releases_per_year` absent by construction (it
        // stands for a group, not a cadence — see hierarchy.ts), which is
        // exactly `isStandingInstrument`'s test; without this guard every
        // collapsed group would render as a one-off instrument by accident.
        const orb = isOrbId(n.id)
        const hollow = !orb && isStandingInstrument(n)
        // Shape carries the jurisdiction tier — see `nodeGeometry`. Colour is
        // still the country family; these are two channels for two facts, which
        // is the whole fix for "the shades of red don't help humans
        // differentiate nodes".
        const mesh = new THREE.Mesh(
          nodeGeometry(n.jurisdiction_level, radius, orb),
          nodeMaterial({
            colour,
            rimColour: hollow ? colour : rimColourFor(n.country),
            radius,
            emissive,
            lit,
            dimOpacity: DIM_NODE_OPACITY,
            dimEmissive: DIM_NODE_EMISSIVE,
            hollow,
            orb,
          }),
        )
        mesh.scale.setScalar(nodeScale.current)
        mesh.userData.reportId = n.id
        mesh.userData.baseEmissive = emissive
        // Marks this mesh for the breathing pulse in `useFrame` — see
        // `ORB_PULSE_PERIOD_SECONDS`. Stored on the mesh rather than recomputed
        // from the id each frame so the pulse loop stays a flat walk over
        // `meshes` with no string work in it.
        mesh.userData.orb = orb
        meshes.current.set(n.id, mesh)
        return mesh
      })
      // Our shader, their cylinder. Colour and focus now live in uniforms, so
      // linkColor and linkOpacity no longer apply to the lines themselves.
      .linkMaterial((l: object) => linkMaterials.current.get((l as LinkDatum).key) ?? null)
      // Widened 2026-08-10 (Thomas) — roughly 1.7x the old 0.3-1.0 range.
      .linkWidth((l: object) => 0.5 + (l as LinkDatum).weight * 1.2)
      // No arrowheads. They were drawn at 94% along a link, and links run
      // centre to centre, so on a typical 40-unit link the head sat about 2.4
      // units from the target's centre — inside a sphere whose radius is
      // between 2.2 and 8. They had been invisible inside the nodes for five
      // sessions. Rather than move them out, they are gone: the pulses already
      // carry direction, on teardrops that point the way they travel, and they
      // carry it on the element the eye is actually following.
      //
      // The cost is that with Pulses off there is no direction cue at all.
      // That is a real loss and it is accepted — a second encoding of the same
      // fact, permanently hidden inside the nodes, was not paying for itself.
      //
      // The pulses. One instanced particle system across all edges, so this
      // stays cheap at several hundred links.
      //
      // Suppressed entirely outside the focus, rather than dimmed. Motion is
      // the strongest signal on screen — a dim moving dot still pulls the eye
      // harder than a bright stationary one.
      // An implied edge never pulses. A pulse asserts that influence actually
      // propagates along this line, and an implied edge is precisely the case
      // where no document says it does. Dashing it and then animating it would
      // take the claim back with one hand and make it with the other.
      .linkDirectionalParticles((l: object) =>
        litLink(l as LinkDatum) && !(l as LinkDatum).implied
          ? pulseCount((l as LinkDatum).upstreamCadence)
          : 0,
      )
      .linkDirectionalParticleSpeed((l: object) =>
        pulseSpeed((l as LinkDatum).upstreamCadence),
      )
      // Teardrops rather than spheres. The library orients any non-spherical
      // particle along its direction of travel, so the shape carries direction
      // on the one element the eye is already following.
      //
      // Supplying this makes linkDirectionalParticleWidth and
      // ParticleColor inert — both are baked into the geometry and material.
      .linkDirectionalParticleThreeObject(
        (l: object) => particleObjects.get((l as LinkDatum).key) ?? fallbackParticle,
      )

    // three-forcegraph's own default is 0, which — since alpha only counts
    // down, never up past a floor of zero — means the alpha-based stop
    // condition (`alpha() < d3AlphaMin`) is never true, so without this the
    // simulation would run until `cooldownTime` (15s, also a library
    // default) regardless of whether it had already settled. Setting a
    // small positive floor lets `onEngineStop` below fire as soon as the
    // layout is actually still, on any graph size, with the 15s ceiling
    // remaining as the backstop for one that never quite settles.
    fg.d3AlphaMin(0.005)

    // d3Force() is typed loosely upstream, hence the casts.
    //
    // Retuned 2026-08-07 at 335 nodes (was -230 / 260 / 38-68, chosen at 124).
    // The old cap meant clusters more than 260 units apart felt no repulsion
    // at all while the centering force kept pulling them in — so every galaxy
    // piled into the middle. `spread` IS the layout multiplier (0.5–2.5,
    // default 1); the baseline below is where 335 nodes read as clusters.
    const m = spreadApplied
    const charge = fg.d3Force('charge') as unknown as
      | { strength(s: number): void; distanceMax(d: number): void }
      | undefined
    charge?.strength(-300 * m)
    // Without a cap, repulsion never falls off and linear chains get flung
    // out — but the cap has to grow with the layout or it recreates the pile.
    charge?.distanceMax(420 * m)

    const linkForce = fg.d3Force('link') as unknown as
      | { distance(fn: (l: LinkDatum) => number): void }
      | undefined
    linkForce?.distance((l) => (40 + (1 - l.weight) * 28 + l.hubRoom) * m)

    // Nothing in the default force set stops two spheres occupying the same
    // point, and overlapping nodes read as one node of the wrong size.
    fg.d3Force(
      'collide',
      forceCollide((node: unknown) => radiusFor((node as ScoredReport).size_score) + 3 + 3 * m)
        .strength(0.85)
        .iterations(2) as unknown as never,
    )

    // No vertical sorting force. Height is not an encoding — see the note on
    // JurisdictionLevel in types.ts. Where a node ends up is decided entirely
    // by what it depends on and what depends on it.

    // Geo-affinity — off at strength 0 (the default), and cheap to check for
    // that every tick even when off. See `lib/geoAffinity.ts` for the model
    // and why this is layered alongside the forces above rather than
    // replacing any of them: it never touches link distance, so a
    // documented edge's rest length is exactly what it was regardless of
    // this slider.
    fg.d3Force('geoAffinity', countryAffinityForce(geoAffinityStrength) as unknown as never)

    return fg
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, spreadApplied])

  /**
   * `useLayoutEffect`, not `useEffect` — deliberately, and this one bug for
   * bug matches the reasoning already given for `useLayoutEffect` on `place`
   * elsewhere in this file: the difference is a crash here, not a flinch.
   *
   * `graph` (and therefore `forceGraph`, memoised on it) can now change
   * identity mid-session — a drilldown toggle rebuilds it, where previously
   * only the corpus-constant `graph` from App.tsx ever fed this memo and it
   * never changed after mount. `useFrame`'s render-loop callback keeps
   * calling `ref.current?.tickFrame()` every frame regardless of React's
   * commit/effect timing, and a plain `useEffect` is deferred until after
   * paint — which left a real window, hit in testing, where a frame could
   * fire between the new `forceGraph` committing and this effect actually
   * reassigning `ref.current`, ticking a graph object neither fully wired up
   * yet nor the one on screen. `useLayoutEffect` closes that window by
   * reassigning `ref.current` synchronously in the same commit.
   */
  useLayoutEffect(() => {
    ref.current = forceGraph
    fitted.current = false
    tickCount.current = 0
    settledOnce.current = false
    settleClock.current = 0
    sinceRefit.current = 0
    // A rebuild is always something the user just asked for, and framing the
    // result is the point of asking — so each one hands the camera back to the
    // tracking fit, which then holds it only until they touch it again.
    userOwnsCamera.current = false
    fitPose.current = null

    // The authoritative fit — precise cloud radius, camera framing and node
    // scale, all read off a layout that has actually stopped moving.
    // three-forcegraph calls this once when its own engine decides the
    // simulation is done (`d3AlphaMin` above, or the 15s `cooldownTime`
    // ceiling if it never quite gets there) — and again after every
    // `d3ReheatSimulation()`, which is why this is guarded by
    // `settledOnce`: only the first convergence gets the camera-snapping
    // fit. Later ones (from the geo-affinity slider, say) are left to
    // resettle in view, under whatever camera the user has by then.
    forceGraph.onEngineStop(() => {
      if (settledOnce.current) return
      settledOnce.current = true
      // Same yield as the periodic fit: convergence is not a licence to grab a
      // camera the user is already holding.
      runFit(!userOwnsCamera.current)
    })
  }, [forceGraph])

  /**
   * Notice when the user takes the camera — see `userOwnsCamera`.
   *
   * OrbitControls is an EventDispatcher and brackets every gesture it handles
   * (drag, wheel, pan, touch) in `start`/`end`, firing `change` in between
   * only when the camera actually moved. That bracketing is what makes this
   * reliable where a plain position diff is not: `change` also fires for our
   * own re-fit and for auto-orbit, and only the ones landing inside a live
   * gesture — and not while we are mid-fit ourselves — are the user's.
   */
  useEffect(() => {
    const orbit = controls as unknown as
      | {
          addEventListener(type: string, fn: () => void): void
          removeEventListener(type: string, fn: () => void): void
        }
      | undefined
    if (!orbit?.addEventListener) return

    const onStart = () => {
      gestureActive.current = true
    }
    const onEnd = () => {
      gestureActive.current = false
    }
    const onChange = () => {
      if (gestureActive.current && !applyingFit.current) userOwnsCamera.current = true
    }

    orbit.addEventListener('start', onStart)
    orbit.addEventListener('end', onEnd)
    orbit.addEventListener('change', onChange)
    return () => {
      orbit.removeEventListener('start', onStart)
      orbit.removeEventListener('end', onEnd)
      orbit.removeEventListener('change', onChange)
    }
  }, [controls])

  useEffect(() => {
    // Zero is the initial value, not a request; resetting on mount would fight
    // the fit that is about to run.
    if (!resetSignal) return
    const f = fitState.current
    if (!f) return
    flight.current = null
    camera.position.set(f.centre.x, f.centre.y, f.centre.z + f.distance)
    camera.lookAt(f.centre)
    const orbit = controls as unknown as
      | { target: THREE.Vector3; update(): void }
      | undefined
    orbit?.target.copy(f.centre)
    orbit?.update()

    // Reset is the user asking for the fitted view back, so it hands the
    // camera back to the tracking fit rather than counting as taking it — and
    // re-records the pose, or the drift check below would read the move Reset
    // just made as the user's own and stop tracking immediately.
    userOwnsCamera.current = false
    fitPose.current = { target: f.centre.clone(), distance: f.distance }
  }, [resetSignal, camera, controls])

  /**
   * Measure the current layout and publish the scene bounds — called from
   * two different moments, not one.
   *
   * This deliberately does NOT run in an effect. three-forcegraph builds its
   * objects and starts its simulation asynchronously after `graphData()` is
   * set, so at effect time every node still has `x === undefined`. The fit
   * bailed on that check and `onBounds` was never called — which left the
   * entire room (platform, ground grid, bounding box, horizon)
   * permanently unmounted, since App gates all of it on `bounds`. The
   * scenery was never invisible; it was never mounted.
   *
   * **Called twice per graph build, on purpose.** First from `useFrame`,
   * `MIN_TICKS_BEFORE_FIRST_PAINT` ticks in — a rough fit, off a layout that
   * has barely started spreading, whose only job is to mount the scene so
   * there is something on screen while the simulation keeps running.
   * Second from `onEngineStop`, once the layout has actually stopped moving
   * — the precise fit, which corrects whatever the rough one got wrong
   * (cloud radius and node scale both move during that gap). Between those
   * two calls the graph is visibly settling into place rather than sitting
   * behind a blank screen — that gap used to be a single synchronous
   * 400-tick loop with nothing rendered until it finished. Returns whether
   * it actually ran, so the first call site knows whether to stop asking.
   *
   * Isolated reports (no edges in either direction) used to be placed here
   * too — pinned in a world-space column beside the connected cloud. They
   * are excluded from the 3D scene entirely now (see the filter on `nodes`
   * in the `forceGraph` memo above) and rendered instead by `IsolatedShelf`
   * in App.tsx, a fixed panel in screen space rather than a world-space
   * position — see that component for why.
   */

  /**
   * `moveCamera: false` measures everything and moves nothing — see
   * `userOwnsCamera` for why that split exists. Node scale, the fog cloud,
   * `fitState` and `onBounds` are all still brought up to date; only the
   * `camera.position` / `orbit.target` writes are skipped.
   */
  function runFit(moveCamera = true): boolean {
    const fg = ref.current
    if (!fg) return false

    const all = (fg.graphData().nodes ?? []) as PositionedNode[]
    if (!all.length || !all.every((n) => Number.isFinite(n.x))) return false

    // **Frame what is on screen, not what exists.**
    //
    // This used to fit every node in the disclosed graph, filtered or not, and
    // that is most of why Thomas kept landing on a black screen: a scope filter
    // hiding three quarters of the corpus left the camera framing the box the
    // *whole* corpus occupies, with the surviving quarter as a small clump
    // somewhere off to one side of an otherwise empty frame. Reported as *"I
    // see a black screen and have to play with the settings to find the
    // nodes"*, and the screenshots show exactly that — 329 of 728 shown, the
    // survivors in a knot in one corner.
    //
    // Hiding a node is a statement about what the view is *for*. The camera has
    // to answer it the same way it answers the shelf being excluded below.
    const positioned = all.filter((n) => shownNode(n.id))
    if (!positioned.length) return false

    // **Frame the connected graph, not the shelf.**
    //
    // This is the "fit to the subject, not the scenery" rule arriving a third
    // time, and it was caught by looking rather than by reasoning. V0.5 found the
    // camera fitting the platform's diagonal; V0.7 fixed it by deleting the
    // platform; and shelving isolated nodes in V0.12 reintroduced it instantly —
    // including the shelf in the fit box moved the centre sideways and shrank the
    // graph to roughly half the frame.
    //
    // The connected graph is what the user came to see. The shelf is an
    // annotation beside it, placed close enough to stay in view at fit zoom
    // without being allowed to define the view.
    const framed = positioned.filter((n) => n.in_degree > 0 || n.out_degree > 0)
    const subject = framed.length ? framed : positioned

    const box = new THREE.Box3()
    for (const n of subject) {
      box.expandByPoint(new THREE.Vector3(n.x, n.y, n.z))
    }
    const centre = box.getCenter(new THREE.Vector3())

    // True bounding-sphere radius, not half the box diagonal — the diagonal
    // overestimates for anything non-cubic and leaves the graph adrift in
    // empty space.
    let nodeRadius = 1
    for (const n of subject) {
      nodeRadius = Math.max(
        nodeRadius,
        centre.distanceTo(new THREE.Vector3(n.x, n.y, n.z)),
      )
    }

    const levels = [
      ...new Set(positioned.map((n) => n.jurisdiction_level)),
    ] as JurisdictionLevel[]

    // Fit to the node cloud, not the room.
    //
    // This used to fit `max(nodeRadius, frame.extent * 1.42)` — the bounding
    // box's diagonal — on the reasoning that the room's far corners would
    // otherwise be cropped. At 33 nodes the room and the cloud were comparable
    // and the difference did not show. At 121 the cloud is compact inside a
    // much larger room, so the camera was framing scenery: the graph opened
    // occupying about a fifth of the frame with empty floor beneath it.
    //
    // The nodes are the subject. If the optional bounding box gets clipped at
    // its corners, that is the correct trade.
    const frame = frameGeometry(nodeRadius, box.min.y, box.max.y)
    const distance = (nodeRadius / Math.sin((FOV * Math.PI) / 360)) * 1.18
    const radius = nodeRadius

    if (moveCamera) {
      // `applyingFit` brackets every camera write this function makes, because
      // `orbit.update()` dispatches OrbitControls' `change` event synchronously
      // and the listener above must not read our own move as the user's.
      applyingFit.current = true
      camera.position.set(centre.x, centre.y, centre.z + distance)
      camera.lookAt(centre)
      camera.updateProjectionMatrix()

      // Orbit has to pivot around the graph, not the world origin, or dragging
      // swings the whole scene off screen.
      const orbit = controls as unknown as
        | { target: THREE.Vector3; update(): void }
        | undefined
      if (orbit?.target) {
        orbit.target.copy(centre)
        orbit.update()
      }
      applyingFit.current = false

      fitPose.current = { target: centre.clone(), distance }
      // Tell the zoom slider, synchronously, before it can guess wrong.
      fitSync.distance = distance
      fitSync.stamp += 1
    }

    // Where the node cloud is, so the fog can be recomputed against it every
    // frame rather than baked once from the opening camera position.
    cloud.current = { centre: centre.clone(), radius: nodeRadius }

    // Now that the cloud has been measured, the nodes can be sized against it.
    // This is why the scale is applied here and not in `nodeThreeObject`: the
    // meshes are built before the layout has settled, so at construction time
    // there is nothing yet to be a fraction of.
    nodeScale.current = nodeScaleFor(nodeRadius)
    for (const m of meshes.current.values()) m.scale.setScalar(nodeScale.current)

    fitState.current = { centre: centre.clone(), distance }

    fitDistance.current = distance
    onBounds({
      centre,
      radius,
      levels,
      fitDistance: distance,
      movedCamera: moveCamera,
      floorY: frame.bottom,
      nodeRadius,
      minY: box.min.y,
      maxY: box.max.y,
    })

    return true
  }

  /**
   * Has the camera moved away from what `runFit` last set, by something other
   * than a gesture? The zoom slider and the search fly-to both write the
   * camera directly and raise no OrbitControls gesture, so the listener above
   * cannot see them; both change the distance from the target, or the target
   * itself, which auto-orbit never does. Tolerance is half a percent of the
   * fit distance — auto-orbit holds the radius bit-exact, so this only has to
   * clear floating-point noise, not a real drift budget.
   */
  function cameraMovedOffFit(): boolean {
    const pose = fitPose.current
    if (!pose) return false
    const orbit = controls as unknown as { target: THREE.Vector3 } | undefined
    const target = orbit?.target ?? pose.target
    const tolerance = Math.max(1, pose.distance * 0.005)
    if (Math.abs(camera.position.distanceTo(target) - pose.distance) > tolerance) return true
    return target.distanceTo(pose.target) > tolerance
  }

  /**
   * Re-frame the scene, now, because what it should be showing just changed.
   *
   * Hands the camera back (a change to *what is displayed* overrides a camera
   * the user had claimed — they asked for a new view, so they get one) and
   * re-opens the tracking window so the fit keeps following for the next few
   * seconds while the layout settles into its new shape.
   *
   * The immediate `runFit` on top of that is not redundant: without it the
   * first tracking fit is up to `REFIT_INTERVAL_SECONDS` away, and on a heavy
   * scene one frame can be much longer than that, which is long enough to read
   * as a blink of nothing before the camera catches up. Guarded on `fitted`
   * because before the very first fit there are no positions to measure and
   * `runFit` would only bail anyway.
   */
  function requestRefit() {
    userOwnsCamera.current = false
    fitPose.current = null
    settleClock.current = 0
    sinceRefit.current = 0
    if (fitted.current) runFit(true)
  }

  // Toggles that have to reach inside the force-graph object, which was built
  // once and is not rebuilt when view settings change.
  //
  // Pulse count and link colour are deliberately NOT set here — the focus
  // effect below owns them. Two effects writing the same accessor would race,
  // and whichever ran last would win, so toggling Edges could quietly undo the
  // focus dimming.
  //
  // Links stay *visible* to the library at all times. `linkVisibility(false)`
  // looks like the obvious way to hide the lines, but the particle digest runs
  // over `visibleLinks`, so it takes the pulses with it — and pulses without
  // lines is a view worth having. It reduces an edge to the one thing that is
  // actually moving, which is the signal, and leaves the room uncluttered.
  // Hiding the line through its own material keeps the two independent.
  useEffect(() => {
    for (const material of linkMaterials.current.values()) {
      material.visible = view.showEdges
    }
  }, [view.showEdges, forceGraph])

  /**
   * Reheat when geo-affinity changes.
   *
   * `geoAffinityStrength` (above) is what the force itself reads, so this
   * effect changes nothing about the force's behaviour — it exists because
   * three-forcegraph's alpha has already decayed to ~0 by the time anyone
   * touches this slider post-fit, and every d3 force is scaled by alpha.
   * Without this, turning the slider on would silently do nothing until
   * the next full rebuild. `d3ReheatSimulation` just resets alpha and lets
   * `tickFrame` (already running every frame) carry the layout to its new
   * rest position smoothly — not the synchronous 400-tick warmup `runFit`
   * pays once at load, so this stays cheap on every drag.
   */
  useEffect(() => {
    forceGraph.d3ReheatSimulation()
  }, [view.geoAffinity, forceGraph])


  /**
   * Re-run the visibility digest when the filter changes.
   *
   * The accessors read `visibleRef`, so their *behaviour* is already current —
   * but the library only re-digests when it sees a prop assigned, and handing
   * back an identical closure would not count as a change. Reassigning is what
   * makes it look again.
   *
   * Meshes for nodes that just disappeared are dropped from the map so it does
   * not accumulate references to spheres the library has already deallocated.
   * Then the applied count is invalidated outright rather than compared: a
   * filter change that hides three nodes and reveals three others leaves the
   * count where it started, and the count-watching guard would sit there
   * satisfied while three freshly built spheres ignored the current selection.
   */
  useEffect(() => {
    forceGraph
      .nodeVisibility((node: object) => shownNode((node as ScoredReport).id))
      .linkVisibility((l: object) => shownLink(l as LinkDatum))

    if (visible) {
      for (const id of [...meshes.current.keys()]) {
        if (!visible.nodes.has(id)) meshes.current.delete(id)
      }
    }
    appliedMeshCount.current = -1

    // **A filter change has to move the camera.**
    //
    // Unlike a tier change, changing the filter does *not* rebuild `forceGraph`
    // — the accessors above hide nodes in place, and the memo's deps
    // (`[graph, spreadApplied]`) never see it. So none of the machinery that
    // normally re-frames the scene ran: `fitted` stayed true, the tracking
    // window stayed expired, and `userOwnsCamera` stayed set from whenever the
    // user last touched the camera. The camera simply kept pointing wherever it
    // already was while three quarters of the graph vanished from in front of
    // it. That is the black screen.
    //
    // Toggling a filter is an explicit request for a different view, exactly
    // like pressing a tier button, so it gets the same treatment: hand the
    // camera back and re-open the tracking window. `runFit` now frames only
    // visible nodes, so the fit this triggers is a fit to what survived.
    requestRefit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceGraph, visible])

  /**
   * Apply the focus to everything that is already in the scene.
   *
   * Nodes and link materials are mutated in place. Particle counts cannot be —
   * how many photons ride an edge is decided during a digest, so the accessor
   * has to be handed back to make the library recount. Arrow colours are the
   * same. Both read `focusRef`, which is current before this runs.
   */
  /**
   * The emissive intensity a node should sit at for a given focus, before the
   * orb breath scales it.
   *
   * Shared by `applyFocus` and the pulse loop in `useFrame` rather than
   * duplicated into both. The pulse rewrites `emissiveIntensity` every frame,
   * so it has to be able to reproduce exactly what the focus pass would have
   * set — otherwise an orb that is dimmed, or selected, would snap to the plain
   * value on the next frame and quietly undo the focus.
   */
  function focusEmissive(id: string, mesh: THREE.Mesh, f: Focus | null): number {
    const base = (mesh.userData.baseEmissive as number) ?? 0.5
    if (f && !f.nodes.has(id)) return DIM_NODE_EMISSIVE
    // A small lift on the selection itself, so it is findable inside its own
    // cone. Still capped below 1 — bloom clips above that and the node stops
    // reading as its true size.
    return f?.selectedId === id ? Math.min(0.95, base + 0.25) : base
  }

  function applyFocus() {
    for (const [id, mesh] of meshes.current) {
      const material = mesh.material as NodeMaterial
      const lit = !focus || focus.nodes.has(id)

      setNodeRim(material, lit)
      // `litOpacity` rather than 1 — a hollow node stays hollow when traced.
      const litOpacity = material.userData.litOpacity ?? 1
      material.opacity = lit ? litOpacity : Math.min(DIM_NODE_OPACITY, litOpacity)
      material.emissiveIntensity = focusEmissive(id, mesh, focus)
    }

    for (const [key, material] of linkMaterials.current) {
      setLinkFocus(material, !focus || focus.edges.has(key))
    }

    appliedMeshCount.current = meshes.current.size
  }

  useEffect(() => {
    applyFocus()

    forceGraph.linkDirectionalParticles((l: object) =>
      view.showPulses && litLink(l as LinkDatum) && !(l as LinkDatum).implied
        ? pulseCount((l as LinkDatum).upstreamCadence)
        : 0,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceGraph, focus, view.showPulses])

  /**
   * Fog, recomputed every frame against where the camera actually is.
   *
   * The planes are placed relative to the *node cloud* seen from the current
   * camera position, not at fixed world distances. Fog is a statement about how
   * far through the graph you are looking, and that changes every time you zoom
   * or orbit — the previous version computed it once at load and so switched
   * itself off the moment anyone moved.
   *
   * `amount` slides the near plane forward through the cloud and tightens the
   * span behind it. At 0.1 only the very back of the graph greys out; at 1 the
   * near face is clear and the far face is gone. The whole range stays keyed to
   * the cloud radius, so it means the same thing at 30 nodes and at 300.
   */
  function updateFog(amount: number) {
    const c = cloud.current
    if (!c) return

    if (amount <= 0.005) {
      scene.fog = null
      for (const m of linkMaterials.current.values()) setLinkFog(m, 1e9, 1e9 + 1)
      return
    }

    const distance = camera.position.distanceTo(c.centre)
    const near = distance + c.radius * (1 - 2 * amount)
    const far = near + c.radius * (3.5 - 2 * amount)

    fogRef.current.near = near
    fogRef.current.far = far
    scene.fog = fogRef.current

    // The lines need telling separately: a custom shader receives none of
    // three.js's automatic fog uniforms.
    for (const m of linkMaterials.current.values()) setLinkFog(m, near, far)
  }

  /**
   * The camera flight, started by search.
   *
   * Lighting a node the user cannot see does not solve the navigation problem —
   * at 118 nodes the report you searched for is as likely to be behind the
   * camera as in front of it. Selecting has to be accompanied by arriving.
   *
   * Animated rather than cut. A cut leaves no way to tell whether the camera
   * moved or the graph changed, and after one the user has lost track of where
   * they were; watching the scene swing carries that information for free.
   */
  const flight = useRef<{
    fromEye: THREE.Vector3
    toEye: THREE.Vector3
    fromTarget: THREE.Vector3
    toTarget: THREE.Vector3
    elapsed: number
  } | null>(null)

  useEffect(() => {
    if (!flyTo || !fitted.current) return
    const fg = ref.current
    if (!fg) return

    const nodes = (fg.graphData().nodes ?? []) as PositionedNode[]
    const node = nodes.find((n) => n.id === flyTo.id)
    if (!node || !Number.isFinite(node.x)) return

    const orbit = controls as unknown as { target: THREE.Vector3 } | undefined
    const fromTarget = (orbit?.target ?? new THREE.Vector3()).clone()
    const toTarget = new THREE.Vector3(node.x, node.y, node.z)

    // Approach along the direction the user is already looking from. Choosing
    // a new angle would be the renderer deciding there is a right way round to
    // view the graph, which is the same mistake as sorting nodes by height.
    const direction = camera.position.clone().sub(fromTarget)
    const current = direction.length()
    if (current < 1e-6) return

    // Close enough to read the node's neighbourhood, but never further out
    // than where the user already was — being thrown backwards after asking to
    // go somewhere is worse than arriving too close.
    const distance = Math.min(current, fitDistance.current * 0.42)

    flight.current = {
      fromEye: camera.position.clone(),
      toEye: toTarget.clone().add(direction.setLength(distance)),
      fromTarget,
      toTarget,
      elapsed: 0,
    }
  }, [flyTo, camera, controls])

  function advanceFlight(delta: number) {
    const f = flight.current
    if (!f) return

    f.elapsed += delta
    const linear = Math.min(1, f.elapsed / FLIGHT_SECONDS)
    // Smoothstep: no jolt at either end, which matters more than the curve in
    // between when the whole move lasts under a second.
    const t = linear * linear * (3 - 2 * linear)

    const orbit = controls as unknown as
      | { target: THREE.Vector3; update(): void }
      | undefined

    camera.position.lerpVectors(f.fromEye, f.toEye, t)
    if (orbit?.target) {
      orbit.target.lerpVectors(f.fromTarget, f.toTarget, t)
      orbit.update()
    }

    if (linear >= 1) flight.current = null
  }

  useFrame((_, delta) => {
    // three-forcegraph is a Kapsule component: chained setters in the
    // `forceGraph` useMemo above (`.graphData(...).numDimensions(3)...`) are
    // batched into one internal digest that builds the underlying d3
    // simulation, and that digest runs asynchronously relative to
    // construction rather than synchronously inside the chain. A drilldown
    // toggle rebuilds `forceGraph` from scratch (unlike every other prop
    // here, `graph`'s identity now changes mid-session — see the note on
    // `lastPositions`), and `ref.current` can start pointing at that brand
    // new instance, via the `useLayoutEffect` below, before its digest has
    // actually run. `tickFrame()` on an instance in that gap throws inside
    // the library reading a property off its own not-yet-built simulation —
    // caught here and skipped for one frame rather than crashing the scene,
    // since the very next frame's digest will have completed by then.
    try {
      ref.current?.tickFrame()
    } catch {
      return
    }

    // Record positions for the next drilldown rebuild — see `lastPositions`.
    const currentNodes = (ref.current?.graphData().nodes ?? []) as PositionedNode[]
    for (const n of currentNodes) {
      if (Number.isFinite(n.x)) lastPositions.current.set(n.id, { x: n.x, y: n.y, z: n.z })
    }

    tickCount.current += 1
    settleClock.current += delta
    sinceRefit.current += delta
    if (!fitted.current) {
      // The rough fit — see the note on `runFit`. Only mounts the scene;
      // periodic tracking fits (below) and `onEngineStop`'s precise one
      // refine it from here.
      //
      // The very first fit of the session always moves the camera, even if a
      // gesture has already been noticed: it is the one that puts the graph in
      // front of the viewer, and there is no earlier view worth preserving
      // over it. Every *later* rebuild's first fit yields like the rest — that
      // is the ~half-second after a drilldown toggle in which someone who
      // double-clicks and immediately starts looking around would otherwise
      // still get yanked, since this branch, not the periodic one, is what
      // runs during it.
      const mountFit = !everFitted.current
      // **The tick gate applies only to the session's very first fit.**
      //
      // `MIN_TICKS_BEFORE_FIRST_PAINT` exists because three-forcegraph starts
      // every node near the origin, so fitting at tick 0 would frame a
      // near-zero-radius point and put the camera inside it. That reasoning
      // holds exactly once. Every *later* rebuild seeds its nodes from the
      // previous layout (see `lastPositions`), so positions are already
      // meaningful on the first tick and there is nothing to wait for. Waiting
      // anyway left the camera framing the old view while the new one was
      // already on screen — half a second on real hardware, measured at 16
      // seconds in the software-rendered sandbox, which is what made it visible
      // enough to catch. Either way it is time spent showing the wrong thing,
      // and it is a large part of what Thomas experiences as a black screen
      // after changing a setting.
      const ticksNeeded = mountFit ? MIN_TICKS_BEFORE_FIRST_PAINT : 1
      if (
        tickCount.current >= ticksNeeded &&
        runFit(mountFit || !userOwnsCamera.current)
      ) {
        fitted.current = true
        everFitted.current = true
      }
    } else if (
      // Track for `REFIT_WINDOW_SECONDS`, **or until the layout actually stops
      // moving, whichever is later.**
      //
      // The window alone was a guess at how long a settle takes, and it is only
      // ever right for one machine. Opening the national tier reveals 403 nodes
      // all seeded on top of their orb, and the cloud then expands by more than
      // an order of magnitude as repulsion separates them — a fit taken early
      // in that frames a cloud that no longer exists seconds later. On a fast
      // machine 12 seconds comfortably covers it; in the software-rendered
      // sandbox the expansion was still going long after the window shut, and
      // the camera was left framing the pre-explosion knot with every node
      // spilled off screen. Measured: 0% of nodes on screen after opening
      // Nations, with the camera perfectly centred on where they used to be.
      //
      // `settledOnce` is set by `onEngineStop`, which three-forcegraph fires on
      // alpha decay or at its own 15s `cooldownTime` ceiling — so this cannot
      // track forever, and on a fast machine it fires well inside the window
      // and changes nothing. `userOwnsCamera` still overrides all of it.
      (settleClock.current <= REFIT_WINDOW_SECONDS || !settledOnce.current) &&
      sinceRefit.current >= REFIT_INTERVAL_SECONDS
    ) {
      sinceRefit.current = 0
      // Still measures every time; only stops steering once the camera is the
      // user's — see `userOwnsCamera`.
      if (!userOwnsCamera.current && cameraMovedOffFit()) userOwnsCamera.current = true
      runFit(!userOwnsCamera.current)
    }
    advanceFlight(delta)
    updateFog(view.fog)

    // The orb breath — see `ORB_PULSE_PERIOD_SECONDS`. Driven off wall-clock
    // `delta`, not the tick count, for the same reason the re-fit window is:
    // a tick is not a fixed amount of real time, so a tick-driven pulse would
    // breathe at a different rate on every machine and would visibly slow down
    // exactly when the scene gets heavy.
    pulseClock.current += delta
    const breath =
      0.5 - 0.5 * Math.cos((2 * Math.PI * pulseClock.current) / ORB_PULSE_PERIOD_SECONDS)
    for (const [id, mesh] of meshes.current) {
      if (!mesh.userData.orb) continue
      const material = mesh.material as NodeMaterial
      material.emissiveIntensity =
        focusEmissive(id, mesh, focusRef.current) *
        (ORB_PULSE_FLOOR + (1 - ORB_PULSE_FLOOR) * breath)
      mesh.scale.setScalar(nodeScale.current * (1 + ORB_PULSE_SCALE * breath))
    }

    // Node meshes are created lazily by the library, and can be recreated
    // without warning. A size change means the set we last styled is not the
    // set now on screen, so the focus has to be laid on again.
    if (meshes.current.size !== appliedMeshCount.current) applyFocus()
  })

  /** Walk up to whichever ancestor carries the report id. */
  function reportIdAt(object: THREE.Object3D): string | undefined {
    let obj: THREE.Object3D | null = object
    while (obj && !obj.userData?.reportId) obj = obj.parent
    return obj?.userData?.reportId as string | undefined
  }

  function handlePointerMove(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation()
    const id = reportIdAt(e.object)
    onHover(id ? (graph.byId.get(id) ?? null) : null)
  }

  /**
   * Select on click, and toggle off when the selection is clicked again.
   *
   * Orbiting is a drag, and a drag ends in a click event, so a click that moved
   * the camera must not also change the selection — otherwise every attempt to
   * look around the cone destroys it.
   */
  const dragOrigin = useRef<{ x: number; y: number } | null>(null)
  const DRAG_SLOP = 4

  function handlePointerDown(e: ThreeEvent<PointerEvent>) {
    dragOrigin.current = { x: e.clientX, y: e.clientY }
  }

  function handleClick(e: ThreeEvent<MouseEvent>) {
    const origin = dragOrigin.current
    dragOrigin.current = null
    if (
      origin &&
      Math.hypot(e.clientX - origin.x, e.clientY - origin.y) > DRAG_SLOP
    ) {
      return
    }

    e.stopPropagation()
    const id = reportIdAt(e.object)
    if (!id) return
    onSelect(focus?.selectedId === id ? null : id)
  }

  /** Double-click to open an orb, or fold a real node's own rung back in. */
  function handleDoubleClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation()
    const id = reportIdAt(e.object)
    if (!id) return
    onToggleNode(id)
  }

  return (
    <>
      <primitive
        object={forceGraph}
        onPointerMove={handlePointerMove}
        onPointerOut={() => onHover(null)}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      />
    </>
  )
}
