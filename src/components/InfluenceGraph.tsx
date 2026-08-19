import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import ThreeForceGraph from 'three-forcegraph'
import { forceCollide } from 'd3-force-3d'
import type { Graph, JurisdictionLevel, ScoredReport } from '../lib/types'
import { RELATIONSHIP_WEIGHT, radiusFor } from '../lib/graph'
import {
  blueprintInkFor,
  glowInk,
  inkFor,
  rimWeightFor,
  colourForReport,
  familyOf,
  scopeOf,
} from '../lib/palette'
import { isOrbId, orbId, type OrbNode } from '../lib/hierarchy'
import {
  isStandingInstrument,
  nodeGeometry,
  nodeMaterial,
  placeSelectionHalo,
  selectionHalo,
  setHaloTheme,
  setNodeRim,
  type NodeMaterial,
} from './nodeVisuals'
import { edgeKey, type Focus } from '../lib/selection'
import type { VisibleSet } from '../lib/filter'
import { countryAffinityForce } from '../lib/geoAffinity'
import { lensColourFor } from '../lib/modes'
import {
  DIM_NODE_EMISSIVE,
  DIM_NODE_OPACITY,
  LINK_OPACITY,
  PAPER_BACKGROUND,
  PAPER_DIM_NODE_OPACITY,
  PAPER_DIM_RIM_FACTOR,
  PAPER_LINK_OPACITY,
  PAPER_NODE_FILL,
  SCENE_BACKGROUND,
  HORIZON_COLOUR,
  ZOOM_MAX,
  type ViewSettings,
} from '../lib/view'
import {
  gradientLinkMaterial,
  pulseMaterial,
  setLinkDimTheme,
  setLinkFocus,
  setLinkFog,
  teardropGeometry,
  tickPulseBlink,
  type GradientLinkMaterial,
} from './linkVisuals'

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
  /**
   * FAMILY INK at the upstream end — the rim colour, not the fill (round 5,
   * Thomas: "line color should equal the rim color"). Within a family the
   * gradient collapses to one clean ink; across families it becomes a
   * two-tone rim→rim blend, which makes the cross-border edges — the whole
   * point of the graph — the loudest lines on screen with no tuning at all.
   * Pulses ride in this same ink.
   */
  colour: string
  /** Family ink at the downstream end. */
  endColour: string
  /**
   * How many real data edges this one drawn line stands for — 1 for an
   * ordinary edge, up to 57 (EU orb → ESA 2010 at tier 1) where the disclosed
   * view collapses a family's member edges onto one orb pair. Width and
   * opacity scale with log2 of this ("we may need a logarithmic equation to
   * quell the effect" — Thomas, and he was right: linear would make the EU
   * trunk a glowing pipe). Merging parallels into one datum also deletes up
   * to 56 overlapping draw calls per pair, which is why tier 1 gets cheaper
   * as well as cleaner.
   */
  count: number
  /**
   * A cross-border dependency — the two endpoints belong to different colour
   * families, neither of them INT. Round 10, Thomas: "there are some
   * connections, such as between canada and usa. These types of cross border
   * arrangements are special cases and I would like them to stand out."
   *
   * These edges draw bolder (width and brightness multipliers below) and
   * their pulses BLINK (see `pulseMaterial`'s blink variant) — NYMEX WTI
   * feeding Alberta's royalty regulation is exactly the kind of line this
   * exists to surface.
   *
   * INT is excluded by definition, not oversight: the international bodies
   * consume everyone's numbers, so nearly every INT edge crosses a border —
   * flagging them would make the special case the wallpaper. An
   * international body's edge is doing what international bodies do; a
   * *country's* number resting on another country's is the arrangement worth
   * a blink.
   */
  cross: boolean
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
 * Diameter of the selection halo, in screen pixels, held constant at every
 * zoom — see `selectionHalo`. Sized against the largest node (~19px at the
 * opening fit), so the ring sits clearly outside the sphere it marks without
 * becoming scenery of its own.
 */
const SELECTION_HALO_PIXELS = 76

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
 * `radiusFor` returns 3.4 to 8 world units, and those numbers were chosen at
 * roughly 120 nodes. Measured on 2026-08-10 at 555: the connected cloud has a
 * radius near 1,400 units and the fit camera sits about 8,000 back, which puts
 * one screen pixel at 4.2 world units — so the smallest node was **1.0 pixel
 * across** and the largest 3.8. The graph was invisible until you zoomed, and
 * nothing was broken; the constants had simply been outgrown.
 *
 * A fixed radius cannot survive a growing corpus, because the cloud radius
 * grows with node count and the node radius does not. So the *ratio* is the
 * constant instead: the largest node is held at this fraction of the cloud
 * radius, whatever the corpus size, and the whole 3.4-to-8 range scales with it
 * so the authority encoding is untouched.
 *
 * **Work the fit arithmetic through and the cloud radius cancels out
 * completely**, which is the property this constant exists to buy:
 *
 * ```
 * largest node on screen (px) = TARGET_LARGEST_FRACTION × canvasHeight
 *                               × cos(FOV/2) / FIT_MARGIN
 * ```
 *
 * Corpus size does not enter, and neither does what `runFit` decides the cloud
 * radius *is*. Anything that changes the framing — the percentile core radius
 * below, a filter, a tier — moves the camera and the node scale by the same
 * factor and leaves apparent node size untouched. **The only two ways to make
 * a node bigger on screen are this number and the cap below.**
 *
 * Raised 0.0165 → 0.026 on 2026-08-19 (Thomas: "everything is too small in
 * pixels", and he was right). At 890px of canvas the old value promised a
 * 12.2px largest node and delivered 7.0px, because the cap was binding — see
 * below. 0.026 promises 19.2px, and with the cap lifted it delivers it. The
 * smallest node goes from 1.9px to 8.2px, which is the number that actually
 * mattered: at 1.9px there was no size channel, only a colour channel with
 * noise in it.
 *
 * **The collision radius no longer follows this number, and must not.** The
 * original note here (Thomas, Q1) was right that scaling collision off the
 * cloud radius makes the layout chase its own tail — collision grows the
 * cloud, the cloud grows the scale, the scale grows collision. Scaling it off
 * `nodeScale` instead does not break that loop, because `nodeScale` *is* a
 * function of the cloud radius; it only hides it. The loop is broken by
 * keeping collision in **fixed world units** and tuning it against the link
 * rest length, which is also fixed — see the `collide` force below. What
 * matters for crowding is the ratio of the two, and both being constants makes
 * that ratio a constant too.
 */
const TARGET_LARGEST_FRACTION = 0.026
const MAX_BASE_RADIUS = 8

function nodeScaleFor(cloudRadius: number): number {
  const wanted = (cloudRadius * TARGET_LARGEST_FRACTION) / MAX_BASE_RADIUS
  // Never below 1: at small corpus sizes the original constants are already
  // right, and shrinking them would undo a legibility fix in the other
  // direction.
  //
  // **The cap was the whole bug.** It was 6, and the comment justifying it
  // said it stopped "a single far-flung cluster" inflating everything. It did
  // — by treating the symptom. Measured 2026-08-19 on the full corpus at the
  // Everything tier: 958 framed nodes, the fit wanted a scale of 9.75 and this
  // function handed back 6, so 38% of node size was being lost to a guard
  // rail, every session, silently. The straggler problem it was guarding
  // against is now fixed at source in `runFit` (the percentile core radius),
  // so the cap goes back to being what a cap should be — a backstop against
  // something absurd, not a number that binds in the ordinary case. 20 is
  // roughly twice what the corpus asks for today.
  return Math.min(20, Math.max(1, wanted))
}

/**
 * Line width, as a multiple of the node scale.
 *
 * **Edges and pulses never got the memo.** `mesh.scale.setScalar(nodeScale)`
 * grew every node with the cloud from the day `TARGET_LARGEST_FRACTION` was
 * introduced; `linkWidth` and the pulse geometry were left in fixed world
 * units and therefore grew by exactly nothing while the corpus went from 120
 * nodes to 1 250 and the nodes grew six-fold. That is an omission, not a
 * tuning choice, and it is the entire explanation for the **87 : 1**
 * node-to-edge width ratio Thomas reported as "edges are razor thin": an
 * ordinary edge was being drawn **0.08 px** wide and was visible only because
 * of antialiasing.
 *
 * Multiplying by `nodeScale` restores the coupling; the 1.2 on top is the part
 * that is a judgement rather than a bug fix, and it lands an ordinary edge near
 * 1.6 px and the 57-edge EU→ESA trunk near 8 px, for a ratio of about 12 : 1.
 *
 * If edges now read too loud, **lower `LINK_OPACITY` before lowering this.**
 * A 0.08 px line needed all the opacity it could get just to exist; a 1.6 px
 * line does not, and the two numbers were never tuned against each other at a
 * width anyone could see.
 */
const LINK_WIDTH_SCALE = 1.2

/**
 * Pulse width, as a multiple of the width of the link it rides.
 *
 * Tied to the link rather than set independently because that is the
 * relationship the eye is actually judging — Thomas's note was "pulses need
 * adjusted with the size of edges so they don't blur", which is a statement
 * about a ratio. Independent constants are what let the two drift apart in the
 * first place.
 *
 * **Pulses cannot be resized by transform.** three-forcegraph reads `.geometry`
 * and `.material` off the object handed to `linkDirectionalParticleThreeObject`
 * and builds its own mesh per photon, so `particle.scale` is ignored entirely.
 * Resizing a pulse means rebuilding its `teardropGeometry` at the new width and
 * re-assigning the accessor — which is what `LINK_SCALE_APPLIERS` below exists
 * to do.
 */
const PULSE_WIDTH_FACTOR = 2.4

/** The un-scaled part of a link's width — weight, trunk stacking, border. */
function baseLinkWidth(l: LinkDatum): number {
  // Widened 2026-08-10 (Thomas) — roughly 1.7x the old 0.3-1.0 range.
  // Trunk term added round 5: each doubling of stacked edges adds ~45% of
  // the base width, so the EU→ESA 57-trunk lands near 3.6× an ordinary
  // line — a trunk among threads, not a pipe among threads. Cross-border
  // edges take a further 1.6× (round 10) so a border crossing reads
  // bolder than its neighbours at the same trunk count.
  return (0.5 + l.weight * 1.2) * (1 + 0.45 * Math.log2(l.count)) * (l.cross ? 1.6 : 1)
}

/**
 * How to re-size a built graph's lines and pulses when the node scale moves.
 *
 * Keyed off the graph object rather than held in a ref because the closure it
 * needs — the per-link particle meshes and the link list — only exists inside
 * the `forceGraph` memo, while the only caller (`runFit`) lives outside it. A
 * WeakMap keeps the association without giving the component another piece of
 * mutable state to keep in step, and drops it on its own when the graph is
 * rebuilt.
 */
const LINK_SCALE_APPLIERS = new WeakMap<ThreeForceGraph, (scale: number) => void>()

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
  levelColours,
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
  /**
   * Scope → spread colour while the filter is narrowed to exactly ONE family,
   * null otherwise — see `levelColours` in App. Applied by mutating the
   * existing meshes' materials in place (a filter change hides nodes without
   * rebuilding them, so there is no rebuild to hook), and read through a ref
   * inside `nodeThreeObject` so a mesh the library builds mid-recolour is
   * born already wearing it.
   */
  levelColours: Record<string, string> | null
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
  /** The node scale the link widths and pulse geometries were last built at. */
  const appliedLinkScale = useRef(1)
  /** Where the fit put the camera, so Reset can go back without re-laying out. */
  const fitState = useRef<{ centre: THREE.Vector3; distance: number } | null>(null)
  /** Camera distance chosen by the auto-fit, kept for the search flight. */
  const fitDistance = useRef(0)
  const { camera, controls, scene, size } = useThree()

  /**
   * One sprite for the whole scene, built once. Its position, scale, colour
   * and visibility are all written from `useFrame` below — nothing about it is
   * React state, because it has to track the camera every frame.
   */
  const halo = useMemo(() => selectionHalo(), [])
  /** Scratch vector for the halo's world position — allocated once, not per frame. */
  const haloWorldPosition = useRef(new THREE.Vector3())

  /**
   * The live layout data, by report id.
   *
   * These are the very objects d3-force mutates each tick, so reading `x`/`y`/
   * `z` off one is reading where the node actually is — which `meshes` cannot
   * be trusted for (see the halo block in `useFrame`).
   */
  const positionedById = useRef(new Map<string, PositionedNode>())

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

  /** Same closure problem, for the single-family level recolour. */
  const levelColoursRef = useRef<Record<string, string> | null>(null)
  levelColoursRef.current = levelColours

  /**
   * Same closure problem, for the lens. A ref rather than a memo dep is the
   * load-bearing choice, not a convenience: putting the lens in the
   * `forceGraph` memo would reset the camera and re-warm the layout on every
   * lens change (see `lib/modes.ts` — the one hard rule of the mode system).
   * A mesh the library rebuilds mid-lens is born already wearing the lens
   * colour, exactly as `levelColoursRef` guarantees for the level recolour.
   */
  const lensRef = useRef(view.lens)
  lensRef.current = view.lens

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
    // Blueprint mode is a MEMO DEP, deliberately — the one view setting that
    // is. Every other toggle mutates live materials because a rebuild would
    // re-run layout for a paint job; blueprint changes the colour of every
    // fill, rim, line and pulse at once, which is not a mutation pass, it is
    // a different set of materials. The rebuild is cheap to the eye because
    // `lastPositions` seeds every node exactly where it was (the same
    // continuity a drilldown rides), so flipping the switch repaints the
    // scene without moving it.
    const bp = view.blueprint
    // Theme the shared out-of-focus treatment BEFORE any material for this
    // theme is built or focused — see the note in linkVisuals.
    setLinkDimTheme(bp)
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

    // Parallel edges between the same pair — overwhelmingly the disclosed
    // view's orb collapses (57 member edges share the EU-orb → esa-2010 pair
    // at tier 1) — merge into ONE datum carrying a count, instead of N
    // identical lines drawn on top of each other. The trunk treatment below
    // turns that count into width and brightness; the focus set is unaffected
    // because parallels always shared one edgeKey anyway.
    const linkMap = new Map<string, LinkDatum>()
    for (const e of graph.edges) {
      const key = edgeKey(e.source_report_id, e.target_report_id)
      const weight = e.strength ?? RELATIONSHIP_WEIGHT[e.relationship_type]
      const upstream = graph.byId.get(e.target_report_id)
      const downstream = graph.byId.get(e.source_report_id)
      // Cross-border test — see the note on LinkDatum.cross. Orbs carry a
      // representative country like every node, so the test holds at every
      // tier: the collapsed Canada↔US trunk at tier 1 is a border crossing
      // for the same reason each of its member edges is.
      const famUp = upstream ? familyOf(upstream.country) : null
      const famDown = downstream ? familyOf(downstream.country) : null
      const cross =
        famUp !== null &&
        famDown !== null &&
        famUp !== famDown &&
        famUp !== 'INT' &&
        famDown !== 'INT'
      const existing = linkMap.get(key)
      if (existing) {
        existing.count += 1
        // A trunk inherits its strongest member's weight and its busiest
        // member's cadence — the line stands for all of them, and "how strong"
        // / "how alive" are max questions, not averages. Cross-border is an
        // ANY question by the same logic: one border-crossing member makes
        // the trunk a border crossing.
        existing.weight = Math.max(existing.weight, weight)
        existing.upstreamCadence = Math.max(
          existing.upstreamCadence,
          upstream?.releases_per_year ?? 1,
        )
        existing.cross = existing.cross || cross
        continue
      }
      // Family ink, not fill — see the note on LinkDatum.colour. In blueprint
      // the same system, darker: each family's ink swaps to its printable
      // variant (blueprintInkFor), and because pulses inherit LinkDatum.colour
      // through the material cache, the teardrops arrive in dark ink with no
      // separate wiring.
      const linkInk = bp ? blueprintInkFor : inkFor
      const fallbackInk = bp ? '#5a6478' : '#7f9ad0'
      linkMap.set(key, {
        source: e.target_report_id,
        target: e.source_report_id,
        weight,
        upstreamCadence: upstream?.releases_per_year ?? 1,
        colour: upstream ? linkInk(upstream.country) : fallbackInk,
        endColour: downstream ? linkInk(downstream.country) : fallbackInk,
        cross,
        count: 1,
        hubRoom:
          3.5 *
          (Math.sqrt(degree.get(e.source_report_id) ?? 1) +
            Math.sqrt(degree.get(e.target_report_id) ?? 1)),
        key,
      })
    }
    const links: LinkDatum[] = [...linkMap.values()]

    // One material per link, held so focus changes are a uniform write rather
    // than a rebuild, and so the library's repeated `obj.material = ...` on
    // every digest keeps assigning the same object instead of churning.
    linkMaterials.current.clear()
    for (const l of links) {
      // The third (dashed) argument retired with the implied-edge layer,
      // 2026-08-12. The shader machinery behind it survives in linkVisuals for
      // the relations rendering to reuse as a *dotted* style — a different
      // pattern for a different claim. The fourth is the trunk brightness:
      // log-scaled with the stacked count so 57 edges read as unmistakably
      // heavier, not 57× louder. Blueprint runs the same formula from a higher
      // base — dark ink on paper needs body where glow-lines need restraint —
      // with the cap lifted in proportion so trunks keep their full headroom.
      // A cross-border edge starts 1.3× brighter still (round 10): brightness
      // and the width boost below are the "bolder" half of the treatment, the
      // blinking pulse is the other.
      const baseOpacity =
        (bp ? PAPER_LINK_OPACITY : LINK_OPACITY) * (l.cross ? 1.3 : 1)
      linkMaterials.current.set(
        l.key,
        gradientLinkMaterial(
          l.colour,
          l.endColour,
          false,
          Math.min(bp ? 0.82 : 0.55, baseOpacity * (1 + 0.35 * Math.log2(l.count))),
        ),
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
          // Sized up FOUR times now, every time on Thomas looking at it:
          // 1.6-3.5 read as specks, 2.4-5.3 short, 3.2-7.0 lasted until the
          // round-7 review ("they are small and could use a boost"), and
          // ×1.5 on top of that lasted until 2026-08-19 — at which point it
          // turned out none of those four numbers had ever been multiplied by
          // `nodeScale`, so the pulse was 0.56 px however often it was
          // "sized up". It is now a multiple of the width of the line it rides
          // (`PULSE_WIDTH_FACTOR`), which is the ratio the eye actually reads,
          // and it is re-derived on every scale change by the applier below.
          // The value here is only the scale-1 starting point; `runFit`
          // overwrites it before the first frame anyone sees.
          teardropGeometry(baseLinkWidth(l) * PULSE_WIDTH_FACTOR),
          // The blink variant for a cross-border edge — a separate material
          // instance per ink, animated by tickPulseBlink in useFrame below.
          pulseMaterial(l.colour, l.cross),
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
        const orbNode = isOrbId(n.id)
        // Orbs keep the family colour even mid-recolour: an orb spans levels,
        // so no single level colour is true of it. Blueprint overrides both:
        // every node is the same pale paper disc, because on paper the fill
        // stops being a channel at all — family moves entirely to the ink
        // (rim + edges), and level to the flyout/hover, which is the whole
        // "technical drawing" premise. The single-family recolour is likewise
        // suspended here and in the recolour effect below.
        // Lens first, then the single-family level recolour, then the plain
        // palette — the same precedence the recolour effect below applies, and
        // the two MUST agree or a mesh rebuilt mid-lens flickers to the wrong
        // colour until the next effect pass.
        const colour = bp
          ? PAPER_NODE_FILL
          : (!orbNode &&
              (lensColourFor(n.country, lensRef.current) ??
                levelColoursRef.current?.[scopeOf(n)])) ||
            colourForReport(n)
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
        //
        // Blueprint pins it low and flat: paper discs are lit by the lights,
        // not from within (a self-luminous disc reads as a screen, not
        // paper), and bloom is off in this mode so the authority-glow
        // reading is suspended anyway. The floor is not decorative — ACES
        // tone mapping compresses a lit white hard enough that ambient alone
        // leaves the discs concrete-grey (measured on the first cut at
        // 0.12/0.85 ambient); this floor against the raised blueprint
        // ambient is what pushes a solid disc's white just past the paper
        // tone, so solid reads brighter-than-page and hollow reads as an
        // open ring (see PAPER_NODE_FILL).
        const emissive = bp ? 0.32 : 0.3 + n.size_score * 0.62

        // Born already dimmed if it is outside the current focus. The library
        // can rebuild these objects at times we do not control, and a sphere
        // that ignores the focus for a frame or two reads as a flicker.
        const lit = !focusRef.current || focusRef.current.nodes.has(n.id)

        // A one-off instrument is drawn hollow — same sphere, emptied fill.
        // Its ring is the FAMILY ink like every other node's, since round-5:
        // the ink system's whole premise is one colour per family across
        // rims, edges and pulses, and a hollow node wearing its fill colour
        // as a ring would be the one place on screen where a ring means
        // something different. (Pre-ink, the ring deliberately wore the scope
        // colour "because that is what the legend explains" — the legend
        // explains the inks now.)
        //
        // An orb is checked first and excludes `hollow` outright. Every orb
        // is built with `releases_per_year` absent by construction (it
        // stands for a group, not a cadence — see hierarchy.ts), which is
        // exactly `isStandingInstrument`'s test; without this guard every
        // collapsed group would render as a one-off instrument by accident.
        const orb = orbNode
        const hollow = !orb && isStandingInstrument(n)
        // Shape carries the jurisdiction tier — see `nodeGeometry`. Colour is
        // still the country family; these are two channels for two facts, which
        // is the whole fix for "the shades of red don't help humans
        // differentiate nodes".
        const mesh = new THREE.Mesh(
          nodeGeometry(n.jurisdiction_level, radius, orb),
          nodeMaterial({
            colour,
            // The ink channel — dark printable inks on paper, the glow inks
            // on the dark scene. Family weights (US bold, EU thick…) apply
            // in both themes; they are statements about the family, not
            // about the lighting.
            // Glow tracks authority, not fill brightness — see `glowInk`.
            // Blueprint keeps the fill as its own emissive: bloom is off
            // there, and the floor is what lifts a solid white disc past the
            // paper tone (see PAPER_NODE_FILL).
            emissiveColour: bp ? colour : glowInk(colour),
            // Lens-aware for the same reason `colour` is: a hollow node's
            // ring is its whole body, and a mesh rebuilt mid-lens must be
            // born wearing the lens ink, not the family ink under it.
            rimColour: bp
              ? blueprintInkFor(n.country)
              : (lensColourFor(n.country, lensRef.current) ?? inkFor(n.country)),
            // **Rims exist only where there is no coloured fill to read.**
            // Blueprint is ink on paper and a hollow one-off instrument has
            // an emptied fill; everything else in the dark scene now carries
            // its family in the fill itself, at a flat luminance, and the
            // ring is redundant. An orb is deliberately NOT in this list —
            // it used to wear a wide bright band, and it already has the
            // breath (`ORB_PULSE_PERIOD_SECONDS`) saying the same thing with
            // motion instead of ink.
            drawRim: bp || hollow,
            radius,
            emissive,
            lit,
            // Themed: on paper the dim fill mostly vanishes into the
            // background whatever the number, so it is allowed to sit much
            // higher — the ghost is carried by the rim instead (see
            // PAPER_DIM_NODE_OPACITY / applyFocus).
            dimOpacity: bp ? PAPER_DIM_NODE_OPACITY : DIM_NODE_OPACITY,
            dimEmissive: DIM_NODE_EMISSIVE,
            // How heavily to draw it, in the two cases where it is drawn at
            // all — see `RIM_WEIGHT`.
            rimWeight: rimWeightFor(n.country),
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
      // Scaled with the nodes — see `LINK_WIDTH_SCALE` and `baseLinkWidth`.
      // The scale-1 value here is a starting point only; `runFit` re-assigns
      // this accessor through `LINK_SCALE_APPLIERS` as soon as it has measured
      // the cloud, and `linkWidth` is in three-forcegraph's prop-flush list so
      // re-assigning it re-digests the lines.
      .linkWidth((l: object) => baseLinkWidth(l as LinkDatum) * LINK_WIDTH_SCALE)
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
      // The pulses. NOT instanced — three-forcegraph builds one small mesh per
      // photon (confirmed in its source, 2026-08-12; an earlier version of
      // this comment claimed an instanced system it does not have). What IS
      // shared is the teardrop geometry and the per-colour material, via the
      // caches in linkVisuals.ts — so the cost that scales with link count is
      // draw calls, not geometry memory. Worth knowing before any future
      // performance hunt starts from a false premise.
      //
      // Suppressed entirely outside the focus, rather than dimmed. Motion is
      // the strongest signal on screen — a dim moving dot still pulls the eye
      // harder than a bright stationary one. (Implied edges never pulsed;
      // since 2026-08-12 there are none to suppress — every edge is
      // documented by validator rule.)
      .linkDirectionalParticles((l: object) =>
        litLink(l as LinkDatum) ? pulseCount((l as LinkDatum).upstreamCadence) : 0,
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

    // How `runFit` re-sizes lines and pulses once it knows the node scale.
    // Both accessors have to be *re-assigned*, not merely re-evaluated: the
    // library only re-digests a prop it sees assigned, and for the pulses the
    // geometry object itself has to be swapped, because a photon mesh is built
    // from `.geometry` and ignores the source object's transform entirely.
    //
    // `teardropGeometry` buckets to the nearest quarter unit and caches, so
    // re-deriving all of them is a map lookup per link in the steady state.
    LINK_SCALE_APPLIERS.set(fg, (scale: number) => {
      for (const l of links) {
        const particle = particleObjects.get(l.key)
        if (particle) {
          particle.geometry = teardropGeometry(
            baseLinkWidth(l) * LINK_WIDTH_SCALE * scale * PULSE_WIDTH_FACTOR,
          )
        }
      }
      fg.linkWidth((l: object) => baseLinkWidth(l as LinkDatum) * LINK_WIDTH_SCALE * scale)
      fg.linkDirectionalParticleThreeObject(
        (l: object) => particleObjects.get((l as LinkDatum).key) ?? fallbackParticle,
      )
    })

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
    //
    // **Opened up 2026-08-19, and deliberately still in fixed world units.**
    // Nodes now take 1.58× more of the frame than they did (see
    // `TARGET_LARGEST_FRACTION`), so at the old spacing they crowd by the same
    // factor — which is what Thomas was compensating for by hand with Cluster
    // spread at 375%.
    //
    // The tempting fix is to scale this by `nodeScale`, and it is wrong. The
    // layout is scale-invariant: multiply *every* force's length by k and the
    // cloud grows by k, the camera backs off by k, the node scale rises by k,
    // and the picture is pixel-identical. Nothing is gained, and because
    // `nodeScale` is itself derived from the cloud radius, tying collision to
    // it closes a positive feedback loop — collision grows the cloud, the
    // cloud grows the scale, the scale grows collision.
    //
    // What actually decides crowding is this radius **relative to the link
    // rest length above**, which is a fixed 40–68 units. So the honest lever
    // is that ratio, and the way to move it is to raise this while leaving the
    // link distance alone. At the old numbers an ordinary node's collision
    // radius was about 20% of a link's rest length; at these it is about 33%,
    // which is the 1.6× the node-size change asks for. Both terms stay
    // constants, so the ratio stays a constant, and the fit renormalises the
    // result exactly once instead of chasing it.
    fg.d3Force(
      'collide',
      forceCollide(
        (node: unknown) => radiusFor((node as ScoredReport).size_score) * 1.5 + 4 + 4 * m,
      )
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
  }, [graph, spreadApplied, view.blueprint])

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

    // Index the live layout data. Rebuilt with the graph, because these are
    // the objects the simulation owns and a new graph means a new set of them.
    positionedById.current = new Map(
      ((forceGraph.graphData().nodes ?? []) as PositionedNode[]).map((n) => [n.id, n]),
    )
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
   * Everything `runFit` needs to know, and nothing it does.
   *
   * Split out on 2026-08-19 so a caller can ask *whether* to move the camera
   * before moving it — see `framedUsably` and `requestRefit`. It has to be a
   * genuine split rather than an early return inside `runFit`, because
   * `runFit` does not only move the camera: it also sets `nodeScale`, the link
   * and pulse widths derived from it, the fog cloud and the published bounds.
   * A naive "if it looks fine, return early" would have frozen node sizes at
   * whatever the last camera-moving fit happened to leave them.
   */
  function measureFit(): {
    centre: THREE.Vector3
    nodeRadius: number
    distance: number
    levels: JurisdictionLevel[]
  } | null {
    const fg = ref.current
    if (!fg) return null

    const all = (fg.graphData().nodes ?? []) as PositionedNode[]
    if (!all.length || !all.every((n) => Number.isFinite(n.x))) return null

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
    if (!positioned.length) return null

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
    let centre = box.getCenter(new THREE.Vector3())

    // **Frame the core, not the last speck.** Third and final application of
    // the "fit to the subject, not the scenery" rule in this function, and the
    // one that was costing the most.
    //
    // This used to be the true bounding-sphere radius — the distance to the
    // furthest node, max over `subject`. Correct as a statement about extent,
    // and useless as a statement about where the graph *is*, because a single
    // two-node island flung to the edge of the room counts exactly as much as
    // the 426-node European cluster. Measured 2026-08-19 on the full corpus,
    // Everything tier, 958 framed nodes:
    //
    // | statistic | radius |
    // |---|---|
    // | furthest node (what this used to use) | 5 270 |
    // | 99th percentile | 4 277 |
    // | **95th percentile** | **3 072** |
    // | 92nd percentile | 2 650 |
    // | median | 1 053 |
    //
    // Half the graph sits inside a fifth of the radius the camera was fitting.
    // On a 1600×900 canvas that put the whole visible network in the middle
    // eighth of the frame with empty space all around it — the screenshot that
    // started this change.
    //
    // **Why the 95th and not the largest connected component**, which was the
    // other candidate: the component split was measured too, and it does not
    // work on this corpus. Among the 958 connected nodes there are 123
    // components, and the largest is 426 — **44.5%**. Fitting it would crop
    // more than half the graph, including the entire 153-node second cluster.
    // What makes P95 defensible is that the two independent estimators agree:
    // the radius spanned by the two big components alone is 3 077, and the
    // 95th percentile of all 958 is 3 072. Five units apart. P95 is finding
    // the same boundary the topology does, without needing the topology.
    //
    // The 5% left outside is not as lossy as it sounds. The fit below takes
    // the *narrower* of the two fields of view, which on any window wider than
    // it is tall is the vertical one — so the horizontal frame still reaches
    // out to ~5 230 units here, i.e. essentially the full extent. On a 16:9
    // window nothing is actually lost; on a tall narrow one the outermost
    // stragglers go off-frame, which is the trade being made deliberately.
    const distanceFrom = (c: THREE.Vector3) =>
      subject
        .map((n) => c.distanceTo(new THREE.Vector3(n.x, n.y, n.z)))
        .sort((a, b) => a - b)
    const percentile = (sorted: number[], f: number) =>
      sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor(f * (sorted.length - 1))))]

    const CORE_PERCENTILE = 0.95

    // One refinement pass: the box centre is itself pulled off the bulk by the
    // same stragglers, so re-centre on the mean of whatever fell inside the
    // first estimate and measure again. Once is enough — a second pass moved
    // the centre by less than a node radius when tried.
    {
      const first = percentile(distanceFrom(centre), CORE_PERCENTILE)
      const inner = subject.filter(
        (n) => centre.distanceTo(new THREE.Vector3(n.x, n.y, n.z)) <= first,
      )
      if (inner.length) {
        const mean = new THREE.Vector3()
        for (const n of inner) mean.add(new THREE.Vector3(n.x, n.y, n.z))
        centre = mean.divideScalar(inner.length)
      }
    }

    let nodeRadius = Math.max(1, percentile(distanceFrom(centre), CORE_PERCENTILE))

    // **Floor `nodeRadius` at a padded multiple of the largest sphere it has
    // to contain, not just at the spread between node *centres*.**
    //
    // Every measurement above is about where things sit, never how big they
    // are — fine at corpus scale, where the cloud runs to hundreds or
    // thousands of world units and a single node's 2.2-to-8-unit mesh is
    // noise beside it. It stops being fine the moment a filter (a country
    // chip, a tier collapse, "trace its chain" on an isolated report) leaves
    // one node on screen, or a few sitting on top of each other: the
    // position spread collapses toward zero, `nodeRadius` hits its floor of
    // 1, and the fit distance that produces (`nodeRadius / sin(halfFov) *
    // 1.18`, ~5.7 units at this file's FOV) can land *inside* a
    // high-authority node's own sphere — `radiusFor` alone already reaches 8
    // units, before `nodeScaleFor` below even applies. The camera opens
    // inside the mesh, lit from within by its own bloom: the "one giant
    // supersized sphere filling the screen, doesn't shrink on zoom-out" bug.
    // Zooming out doesn't fix it because `ZOOM_MAX` only pulls the camera
    // back to a fixed multiple of a fit distance that was already too small
    // — it scales the mistake, not away from it.
    //
    // Flooring at exactly `radiusFor(...)` (no padding) stops the camera
    // landing inside the mesh, but reintroduces the same complaint one step
    // out: with only 18% margin (the `* 1.18` below), the sphere still fills
    // ~85% of the frame's half-height — "supersized", just no longer
    // clipping. In the many-node case that 18% margin is fine because the
    // position spread is already dozens of units bigger than any one mesh,
    // so the mesh itself only ever reads as a small fraction of the frame;
    // it's that spread-vs-mesh gap that reads as "room to breathe", and a
    // singleton has none of it. `SINGLETON_PADDING` manufactures the same
    // breathing room deliberately for the singleton case instead of relying
    // on spread that isn't there.
    //
    // `nodeScaleFor` is deliberately NOT applied here even though it reads
    // this same `nodeRadius` a few lines down (`nodeScale.current =
    // nodeScaleFor(nodeRadius)`): the floor only has to clear the scale-1
    // case, because `nodeScaleFor` never returns below 1, so the true
    // on-screen radius (`radiusFor(...) * nodeScale`) is never smaller than
    // `radiusFor(...)` alone. At corpus scale this floor sits far below the
    // position-spread radius and never engages — it exists for exactly the
    // small-or-singleton view this comment describes.
    const SINGLETON_PADDING = 4
    for (const n of subject) {
      nodeRadius = Math.max(nodeRadius, radiusFor(n.size_score) * SINGLETON_PADDING)
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
    // The nodes are the subject.
    //
    // Fit against BOTH the vertical and the horizontal field of view, via
    // whichever is narrower. This used to fit the vertical FOV alone, which is
    // exactly right on a wide window and wrong on a narrow one: a browser
    // snapped to half a screen has a horizontal FOV tighter than the vertical,
    // so the cloud fitted for height ran off the left and right edges at the
    // supposedly-fitted view (flagged in the 08-13 polish handoff, greenlit by
    // Thomas 2026-08-12). The camera's `aspect` is kept current by R3F on
    // every resize, and the tracking refit window means a mid-session resize
    // is picked up by the next fit that runs.
    const vHalf = (FOV * Math.PI) / 360
    const aspectRatio = (camera as THREE.PerspectiveCamera).isPerspectiveCamera
      ? (camera as THREE.PerspectiveCamera).aspect
      : 1
    const hHalf = Math.atan(Math.tan(vHalf) * aspectRatio)
    const distance = (nodeRadius / Math.sin(Math.min(vHalf, hHalf))) * 1.18

    return { centre, nodeRadius, distance, levels }
  }

  /**
   * `moveCamera: false` measures everything and moves nothing — see
   * `userOwnsCamera` for why that split exists. Node scale, link and pulse
   * width, the fog cloud, `fitState` and `onBounds` are all still brought up
   * to date; only the `camera.position` / `orbit.target` writes are skipped.
   */
  function runFit(moveCamera = true): boolean {
    const fg = ref.current
    if (!fg) return false
    const measured = measureFit()
    if (!measured) return false
    const { centre, nodeRadius, distance, levels } = measured
    const radius = nodeRadius

    // **Keep the far plane behind the graph.**
    //
    // `far` is set once on the Canvas (12,000) and was fine while the whole
    // corpus fitted inside it. It stopped being fine once the tiers arrived: at
    // the States tier the fit puts the camera 11,539 units from a cloud of
    // radius 2,033, so the graph's far side sits at 13,572 — past the far
    // plane, clipped away by the projection, and the screen goes black.
    //
    // Measured 2026-08-12, and worth recording because the symptom points
    // somewhere else entirely: 4 of 588 nodes survived the clip, while the fit
    // itself was provably correct — camera exactly at the fit distance, orbit
    // target dead on the centroid, and the radius implied by that distance
    // matching the measured cloud radius to the unit. Nothing was mis-framed.
    // The camera was aimed correctly and the depth clip threw the result away.
    // It presents as "the auto-fit is broken", and it is not.
    //
    // It is also why the fault looked intermittent rather than absolute: 13,572
    // against 12,000 is a near miss, so whether a given tier blanks depends on
    // where that run's layout happened to settle.
    //
    // Sized for the furthest the camera can legitimately get — the zoom slider
    // pulls back to `ZOOM_MAX` times the fit distance, and the cloud's far side
    // is another radius beyond that. Grown, never shrunk: a tighter far plane
    // buys nothing at this depth range, and re-deriving it downwards would
    // rebuild the projection matrix on every tracking fit for no gain.
    const neededFar = (distance * ZOOM_MAX + nodeRadius) * 1.15
    const lens = camera as THREE.PerspectiveCamera
    if (lens.isPerspectiveCamera && lens.far < neededFar) {
      lens.far = neededFar
      lens.updateProjectionMatrix()
    }

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
      // Only a fit that *moved* the camera resets the zoom baseline to 1 — see
      // `stamp` on `fitSync`.
      fitSync.stamp += 1
    }

    // **The measured distance is published whether or not the camera moved.**
    //
    // It is a measurement, not a camera action: "how far back you would have to
    // stand to see all of this" is true regardless of where the camera actually
    // is. Publishing it only on camera-moving fits was a bug. While the user
    // owned the camera, tracking kept calling `runFit(false)`, which updated
    // `bounds.fitDistance` (the prop) but left `fitSync.distance` frozen at the
    // last camera-moving fit — so the zoom slider held two different ideas of
    // what "zoom 1" means, multiplying by the prop in one direction and
    // dividing by `fitSync` in the other. With the cloud grown in between, a
    // round trip through the pair returns a slightly larger number than it was
    // handed. That is a ratchet, and it walks the zoom outwards until ZOOM_MAX
    // clamps it, which from the outside looks like the camera zooming out on
    // its own and never coming back.
    //
    // Both directions now read this one number. If they are ever keyed off
    // different bases again, the ratchet returns.
    fitSync.distance = distance

    // Where the node cloud is, so the fog can be recomputed against it every
    // frame rather than baked once from the opening camera position.
    cloud.current = { centre: centre.clone(), radius: nodeRadius }

    // Now that the cloud has been measured, the nodes can be sized against it.
    // This is why the scale is applied here and not in `nodeThreeObject`: the
    // meshes are built before the layout has settled, so at construction time
    // there is nothing yet to be a fraction of.
    nodeScale.current = nodeScaleFor(nodeRadius)
    for (const m of meshes.current.values()) m.scale.setScalar(nodeScale.current)

    // Lines and pulses follow the same scale — but only when it has actually
    // moved. Re-assigning `linkWidth` makes three-forcegraph re-digest every
    // line, and this function runs on a timer while the tracking window is
    // open, so an unguarded re-assign would rebuild 1 079 lines every couple
    // of seconds to write the number they already had. 1% is well below
    // anything visible at these widths and well above float noise.
    if (Math.abs(nodeScale.current - appliedLinkScale.current) > appliedLinkScale.current * 0.01) {
      appliedLinkScale.current = nodeScale.current
      LINK_SCALE_APPLIERS.get(fg)?.(nodeScale.current)
    }

    fitState.current = { centre: centre.clone(), distance }

    fitDistance.current = distance
    onBounds({
      centre,
      radius,
      levels,
      fitDistance: distance,
      movedCamera: moveCamera,
      nodeRadius,
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
    // Nothing has been laid out yet, so there is nothing to judge and nothing
    // to frame. Hand the camera back and let the first fit do its job.
    if (!fitted.current) {
      userOwnsCamera.current = false
      fitPose.current = null
      settleClock.current = 0
      sinceRefit.current = 0
      return
    }

    // **Only move the camera if the survivors are not usably framed.**
    //
    // Thomas's ask was "stop moving the camera when I change a filter", and
    // taken literally it reintroduces a bug he reported himself: an
    // unconditional refit is what fixed the black screen (329 of 728 shown,
    // the survivors knotted in one corner of an otherwise empty frame — see
    // the long note in the filter effect). The camera move is not gratuitous;
    // it is the only thing that answers "where did everything go".
    //
    // So the rule is conditional rather than absent. Measure first — which
    // costs nothing the fit was not going to pay anyway — and ask whether what
    // survived is actually on screen at a sensible size. If it is, keep the
    // camera exactly where the user put it and run the measurement-only fit,
    // which still updates node scale, link widths, the fog cloud and the
    // published bounds. If it is not, this is the black-screen case and the
    // camera is handed back as before.
    const measured = measureFit()
    if (measured && framedUsably(measured)) {
      runFit(false)
      return
    }

    userOwnsCamera.current = false
    fitPose.current = null
    settleClock.current = 0
    sinceRefit.current = 0
    runFit(true)
  }

  /**
   * Is what is currently visible already framed well enough to leave alone?
   *
   * Three questions, all asked against the core sphere `measureFit` just
   * measured, and all of them have to answer yes:
   *
   * 1. **Is it in front of the camera at all?** The angle from the camera's
   *    forward axis to the cloud centre has to be inside the vertical half-FOV
   *    — the narrower of the two on any landscape window, so this is the
   *    conservative test. This is the one that catches the black screen: a
   *    filter that leaves a knot off to one side fails here.
   * 2. **Is it big enough to see?** The core has to subtend at least 30% of
   *    the frame. Below that the survivors are a clump in the middle of a
   *    mostly empty view, which is the same complaint in a milder form.
   * 3. **Is it small enough to see all of?** No more than 1.4× the frame. Some
   *    overflow is fine and normal — the fit itself leaves 5% of nodes outside
   *    by design — but a filter that reveals a much larger set should re-frame.
   *
   * The bounds are deliberately loose. A tight test would refit on almost
   * every filter change and this would be an elaborate way of writing the old
   * unconditional behaviour.
   */
  function framedUsably(measured: { centre: THREE.Vector3; nodeRadius: number }): boolean {
    const toCentre = measured.centre.clone().sub(camera.position)
    const distance = toCentre.length()
    if (!(distance > 0)) return false

    const vHalf = (FOV * Math.PI) / 360
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
    if (forward.angleTo(toCentre) > vHalf) return false

    const subtended = Math.atan(measured.nodeRadius / distance)
    return subtended > vHalf * 0.3 && subtended < vHalf * 1.4
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
   * Blueprint gives the SCENE an opaque paper background; the dark theme
   * keeps the canvas transparent over the page's CSS colour. Not styling —
   * compositing correctness, diagnosed off pixel measurements: semi-
   * transparent shader elements (dim links at 0.45, dim discs) blend into
   * the transparent framebuffer, and the browser then composites those
   * alpha-weighted values through a linear→sRGB conversion that lifts them
   * nonlinearly — near-paper tones blow out to white, which is exactly what
   * the first blueprint screenshots showed: "dim" lines glowing BRIGHTER
   * than the paper. An opaque background moves the blend inside the GL
   * buffer, in linear space, where it is right. The dark theme never showed
   * the fault only because everything there is brighter than its
   * background; it keeps its tuned-by-eye CSS compositing untouched.
   */
  useEffect(() => {
    scene.background = view.blueprint ? new THREE.Color(PAPER_BACKGROUND) : null
    return () => {
      scene.background = null
    }
  }, [view.blueprint, scene])


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
   * The single-family level recolour, applied to meshes already in the scene.
   *
   * Mutates `color` and `emissive` in place — the same
   * mutate-don't-rebuild contract the focus pass uses, and for the same
   * reason: these meshes live inside a running simulation, and rebuilding
   * them to change a colour would re-run layout for a paint job. Restoring is
   * just computing the ordinary colour again; nothing is stashed.
   */
  useEffect(() => {
    // Suspended on paper — blueprint discs have no fill channel to recolour
    // (see nodeThreeObject), and this effect also fires on every rebuild, so
    // without the guard it would repaint the paper discs in scene colours the
    // moment blueprint switched on with a single-family filter active.
    if (view.blueprint) return
    for (const [id, mesh] of meshes.current) {
      const r = graph.byId.get(id)
      if (!r || isOrbId(id)) continue
      const material = mesh.material as NodeMaterial
      // Lens wins over the level recolour — `focusPalette` is effectively a
      // country-detail lens that engages itself when the filter narrows to
      // one family, and an explicit lens choice is the stronger statement of
      // intent. Same chain as nodeThreeObject; keep them identical.
      const next =
        lensColourFor(r.country, view.lens) ??
        levelColours?.[scopeOf(r)] ??
        colourForReport(r)
      material.color.set(next)
      // Normalised, for the same reason the constructor normalises — this
      // effect is a paint job, and a paint job must not silently rewrite what
      // the glow channel means. Safe to call unconditionally: the effect
      // returns early in blueprint (see above), so this only ever runs on the
      // dark scene. (BRICS yellow and INT white still bloom harder than the
      // rest under GROUP_COMPARISON — that is their fill luminance, accepted
      // in the review, not this channel.)
      material.emissive.set(glowInk(next))
      // The rim too — a hollow node's ring IS its body, and a family-violet
      // ring over a lens-grey scene would be the one place on screen where
      // colour still answered the old question. The uniform handle exists
      // only after first compile (see nodeVisuals), hence the guard; the
      // level recolour never touched rims, so outside a lens this restores
      // the family ink, which is what it always was.
      const rimUniform = material.userData.uRimColour as
        | { value: THREE.Color }
        | undefined
      rimUniform?.value.set(
        lensColourFor(r.country, view.lens) ?? inkFor(r.country),
      )
    }
    // `view.lens` in the deps of a MUTATION effect, never the forceGraph
    // memo's — that distinction is the whole mode system. See lib/modes.ts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelColours, view.lens, forceGraph, view.blueprint])

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
    // The dim treatment is themed — see the PAPER_DIM_* notes in view.ts.
    const bp = view.blueprint
    const dimOpacity = bp ? PAPER_DIM_NODE_OPACITY : DIM_NODE_OPACITY
    const dimRim = bp ? PAPER_DIM_RIM_FACTOR : undefined

    for (const [id, mesh] of meshes.current) {
      const material = mesh.material as NodeMaterial
      const lit = !focus || focus.nodes.has(id)

      setNodeRim(material, lit, dimRim)
      // `litOpacity` rather than 1 — a hollow node stays hollow when traced.
      const litOpacity = material.userData.litOpacity ?? 1
      material.opacity = lit ? litOpacity : Math.min(dimOpacity, litOpacity)
      material.emissiveIntensity = focusEmissive(id, mesh, focus)
      // **Transparency does not stop a raycast.** A ghosted node is still
      // solid geometry as far as the picker is concerned, so a barely-visible
      // sphere in front of the chain you are tracing silently eats the hover
      // and the click meant for the node behind it — and `reportIdAt` then
      // reports whichever mesh the raycaster returned nearest-first, which is
      // the ghost. Dropping `raycast` to a no-op is the cheap correct fix, and
      // it belongs here rather than in `nodeMaterial` because it is a
      // statement about focus, not about the material.
      mesh.raycast = lit ? THREE.Mesh.prototype.raycast : () => {}
    }

    for (const [key, material] of linkMaterials.current) {
      setLinkFocus(material, !focus || focus.edges.has(key), focus !== null)
    }

    appliedMeshCount.current = meshes.current.size
  }

  useEffect(() => {
    applyFocus()

    forceGraph.linkDirectionalParticles((l: object) =>
      view.showPulses && litLink(l as LinkDatum)
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

    // **Fog has to resolve into whatever is actually behind the graph.** With
    // the horizon off that is `SCENE_BACKGROUND`; with it on, the part of the
    // frame the graph sits against is the sky's horizon band, which is far
    // brighter. Fading toward the wrong one is why distant edges looked like
    // they were dissolving rather than receding (§8 of the visual review).
    const resolveTo = view.showHorizon ? HORIZON_COLOUR : SCENE_BACKGROUND

    if (amount <= 0.005) {
      scene.fog = null
      for (const m of linkMaterials.current.values()) setLinkFog(m, 1e9, 1e9 + 1, resolveTo)
      return
    }

    const distance = camera.position.distanceTo(c.centre)
    const near = distance + c.radius * (1 - 2 * amount)
    const far = near + c.radius * (3.5 - 2 * amount)

    fogRef.current.near = near
    fogRef.current.far = far
    fogRef.current.color.set(resolveTo)
    scene.fog = fogRef.current

    // The lines need telling separately: a custom shader receives none of
    // three.js's automatic fog uniforms.
    for (const m of linkMaterials.current.values()) setLinkFog(m, near, far, resolveTo)
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
    // No haze on paper — fog resolves toward SCENE_BACKGROUND (near-black),
    // which on the paper theme would read as smoke rolling in rather than
    // distance. Depth cues in blueprint are the drawing's own: occlusion and
    // line convergence, like any technical drawing. The slider keeps its
    // value; it simply resumes when the lights go back off.
    updateFog(view.blueprint ? 0 : view.fog)

    // The orb breath — see `ORB_PULSE_PERIOD_SECONDS`. Driven off wall-clock
    // `delta`, not the tick count, for the same reason the re-fit window is:
    // a tick is not a fixed amount of real time, so a tick-driven pulse would
    // breathe at a different rate on every machine and would visibly slow down
    // exactly when the scene gets heavy.
    pulseClock.current += delta
    // The cross-border pulse blink — one call animates every registered blink
    // material; a no-op when the current graph has no cross-border edges.
    tickPulseBlink(pulseClock.current)
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

    // The selection halo. Rewritten every frame rather than on selection
    // change, because holding a constant pixel size is a function of the
    // camera distance, and the camera moves continuously — under the zoom
    // slider, the search flight, auto-orbit and the user's own drag.
    // **Position comes from the layout datum, not from the mesh.**
    //
    // The obvious implementation — `meshes.current.get(id).getWorldPosition()`
    // — renders a halo in the wrong place, and the reason is worth recording
    // because it is a trap for anything else that reaches into that map for
    // geometry. `meshes` is populated from inside `nodeThreeObject`, and
    // three-forcegraph is free to rebuild its node objects; when it does, the
    // map can end up holding a mesh the library never adopted, still sitting
    // at its construction position. Measured 2026-08-19: with ESA 2010
    // selected and plainly drawn near the left of the frame, the mesh this map
    // returned for it reported a world position of exactly (0, 0, 0), and the
    // halo dutifully drew a ring around the middle of the graph.
    //
    // The node datum is what the library itself reads to place everything —
    // d3-force mutates `x`/`y`/`z` on these objects in place every tick — so
    // it cannot disagree with what is on screen. The mesh is still consulted
    // for the *colour*, where a stale copy is harmless: it carries the same
    // family ink whichever generation it belongs to.
    const selectedId = focusRef.current?.selectedId
    const selectedNode = selectedId ? positionedById.current.get(selectedId) : undefined
    if (selectedNode && Number.isFinite(selectedNode.x) && shownNode(selectedNode.id)) {
      const mesh = meshes.current.get(selectedNode.id)
      const material = mesh?.material as NodeMaterial | undefined
      setHaloTheme(
        halo,
        material ? `#${material.color.getHexString()}` : colourForReport(selectedNode),
        view.blueprint,
      )
      haloWorldPosition.current.set(selectedNode.x, selectedNode.y, selectedNode.z)
      placeSelectionHalo(
        halo,
        haloWorldPosition.current,
        camera.position,
        (FOV * Math.PI) / 360,
        size.height,
        SELECTION_HALO_PIXELS,
      )
      halo.visible = true
    } else {
      halo.visible = false
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
      <primitive object={halo} />
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
