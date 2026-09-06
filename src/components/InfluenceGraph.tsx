import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import ThreeForceGraph from 'three-forcegraph'
import { forceCollide } from 'd3-force-3d'
import type { Country, EvidenceGrade, Graph, JurisdictionLevel, ScoredReport } from '../lib/types'
import { RELATIONSHIP_WEIGHT, orbSizeFactor, radiusFor } from '../lib/graph'
import {
  glowInk,
  inkFor,
  rimWeightFor,
  colourForReport,
  familyOf,
  scopeOf,
} from '../lib/palette'
import { countryOrbId, isOrbId, orbId, type OrbNode } from '../lib/hierarchy'
import {
  isStandingInstrument,
  nodeGeometry,
  nodeMaterial,
  placeSelectionHalo,
  selectionHalo,
  setHaloTheme,
  setNodeRim,
  type NodeMaterial,
  labelSprite,
  labelTextFor,
  placeLabel,
} from './nodeVisuals'
import { edgeKey, type Focus } from '../lib/selection'
import type { VisibleSet } from '../lib/filter'
import { countryAffinityForce } from '../lib/geoAffinity'
import { galaxyForce } from '../lib/galaxyForce'
import { clusterRepulsionForce } from '../lib/clusterRepulsion'
import { intAnchorForce } from '../lib/intAnchor'
import { lensColourFor } from '../lib/modes'
import {
  DIM_NODE_EMISSIVE,
  DIM_NODE_OPACITY,
  EVIDENCE_GRADE_LINK_OPACITY,
  EVIDENCE_GRADE_RANK,
  LINK_OPACITY,
  ZOOM_MAX,
  type ViewSettings,
} from '../lib/view'
import {
  edgeShade,
  gradientLinkMaterial,
  legalBasisTint,
  pulseMaterial,
  resetLinkFlow,
  setLinkFlow,
  setLinkFocus,
  setLinkHover,
  teardropGeometry,
  tickLinkFlow,
  tickPulseBlink,
  type GradientLinkMaterial,
} from './linkVisuals'
import { PhotonInstancer } from './photonInstancing'
import { LinkInstancer } from './linkInstancing'
import { NodeInstancer } from './nodeInstancing'

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
   * The upstream report is a continuously-updated database with no discrete
   * editions (`Report.continuous`, see its doc comment for how that's
   * decided). This edge gets the beam treatment instead of teardrop pulses:
   * zero photons (built nowhere — see the `particleObjects` loop) and a
   * flowing highlight on the LINE material itself (`gradientLinkMaterial`'s
   * `beam` argument, `linkVisuals.ts`'s `uFlow`/`uFlowTime`).
   *
   * OR-merged on trunk collapse the same way `cross` is, for the same
   * reason — one continuous member makes the trunk read as a stream — though
   * in practice a trunk's members share one upstream after disclosure
   * folding, so this is rarely a real merge of two different answers.
   */
  continuousSource: boolean
  /**
   * The evidence grade this line renders at — Midvamp round 2, see
   * EvidenceGrade in types.ts and EVIDENCE_GRADE_LINK_OPACITY in
   * lib/view.ts. Copied straight off the underlying edge's own
   * `evidence_grade` for an ordinary (non-trunk) link; for a trunk that
   * collapses several parallel member edges (see `count`), merged by
   * `betterGrade` below — **`undefined` if EITHER the edge itself is
   * ungraded OR any trunk member is**, never defaulted to 'C'.
   *
   * `undefined` renders exactly as an 'A' edge always has: full opacity,
   * normal pulses, always visible regardless of `view.minGrade`. This is
   * deliberate, not a placeholder — see `minGrade`'s own doc comment in
   * view.ts for why an edge nobody has graded yet is not silently treated
   * as a lead. Only a line carrying an EXPLICIT grade is subject to the
   * B/C intensity, hiding, and no-pulse rules.
   */
  grade?: EvidenceGrade
  /**
   * Every member this line stands for is a `legal_basis` edge (AND-merged
   * across a trunk, the same direction `cross`/`continuousSource` merge
   * with OR — a MIXED trunk falls back to the ordinary data-edge treatment
   * rather than claiming a uniform legal-basis look it doesn't have).
   * Drawn with the amber `legalBasisTint` (linkVisuals.ts) and zero
   * teardrop pulses — "nothing flows along a legal basis at a cadence"
   * (plan §2.2, Q3).
   */
  legalBasis: boolean
  /**
   * Whether `view.minGrade` (as of this build — see minGrade's own doc
   * comment for why this is baked in at build time rather than read live)
   * allows this line to draw at all. Computed once, right after `links` is
   * assembled below, from `grade` and `EVIDENCE_GRADE_RANK` — kept as a
   * plain field rather than a helper call at every read site because
   * `shownLink` runs on every digest and a hidden 'C' lead should cost the
   * same one property read as everything else it already checks.
   * `undefined`-grade links are always `true` here — see `grade`'s own
   * comment.
   */
  gradeVisible: boolean
  /**
   * Extra rest length for links touching high-degree nodes, precomputed at
   * build time (the d3 distance accessor sees mutated link objects, so
   * anything derived from the raw edge list has to be carried on the datum).
   * sqrt-scaled so the CPI's forty edges fan out without exiling its leaves.
   */
  hubRoom: number
  /**
   * Exactly one end is an international node — a national report (or a
   * country orb) tethered to a standard like `sna-2008`. Since 2026-08-31
   * these links carry no spring (`INT_LINK_STIFFNESS`) and draw faded
   * (`INT_TETHER_OPACITY`) unless traced or hovered: with ~700 of them and
   * the springs off, they became long spokes fanning across the whole scene
   * — the picture's loudest element, saying only "this country follows
   * SNA". Still real edges: still in the focus set, still pulse when
   * traced, still picked by the edge picker.
   */
  intTether: boolean
  /**
   * Link spring STIFFNESS, precomputed at build time for the same reason
   * `hubRoom` is — and the lever that was missing when the unfolded view
   * collapsed into a hairball (Thomas, 2026-08-28: "when I do that I get a
   * dense messy cluster").
   *
   * d3's default is `1 / min(deg(source), deg(target))`, and the `min` is
   * the trap. For a leaf attached to `sna-2008` that is `1/1` — a MAXIMALLY
   * stiff spring. `sna-2008` touches 57 different countries and `esa-2010`
   * 42, so those two nodes sit at the mass centre of nearly the whole
   * corpus with ~90 rigid springs each, and every country they touch is
   * nailed to that centre through them. `hubRoom` already gave those links
   * extra rest LENGTH; nothing had ever touched their stiffness.
   *
   * **Damped by country span, not by degree alone — measured, not assumed.**
   * A first pass damped every link whose busier end had a high degree, and
   * that touched 44% of all links and loosened hubs that SHOULD hold a
   * cluster together: `ru-rosstat-regions-russia-socio-economic` has 30
   * edges but spans ONE country, as do `cn-provincial-gdp` (23) and
   * `in-state-gsdp-series` (22). Those are a country's own internal spine.
   * Gating on "how many different countries does the busier end touch"
   * isolates the 15 nodes that actually tether unrelated clusters together
   * — the international standards layer — and gets the same result while
   * touching 19% of links instead of 44%.
   */
  stiffness: number
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
 * The hover treatment — Phase 4 §4.1 (Thomas: "a lift and grow and glow/shadow
 * to signify we can click it"). Hover used to be entirely 2D: a tooltip div
 * appeared and the node itself did not change, which is exactly why nothing
 * read as clickable.
 *
 * Grow eases the hovered mesh toward 1.15× over 0.15s (smoothstepped — a snap
 * reads as a glitch, and this scene has a suspected flicker bug people will
 * blame it for). The "lift" is emissive: hover brightens the node toward the
 * selection ceiling. The "glow" is a second, smaller, fainter instance of the
 * Phase 0b selection halo. All three run in `useFrame` off a ref — hover
 * NEVER touches React state the renderer reads, and never goes near the
 * forceGraph memo deps.
 */
const HOVER_GROW = 0.15
const HOVER_EASE_SECONDS = 0.15
const HOVER_EMISSIVE_LIFT = 0.3
const HOVER_HALO_PIXELS = 48
const HOVER_HALO_OPACITY = 0.45
/**
 * Standing labels (2026-08-31). A node whose edges reach ten or more
 * different countries gets its name drawn permanently — the same gate
 * `HUB_SPAN_GATE` uses to recognise a cross-cluster tether, and for the
 * same reason: reaching ten countries is what makes a node a *standard*
 * rather than somebody's release. Membership comes from `standingLabels`
 * (hierarchy.ts) on the base graph — 16 nodes on the 2026-08-31 corpus:
 * SNA 2008, e-GDDS, ESA 2010, BPM6, COICOP 2018, Reg 479/2009, the ES Code
 * of Practice, the ESS peer review, SDDS, the EDP tables, HICP, the CPI
 * manual, ISIC, GFSM, ACSS and HS — exactly the set Thomas could not tell
 * apart in the white knot. Orbs never get one (their caption is the hover
 * card's job), and a folded node has no position to label.
 */
const LABEL_PIXELS = 13
const LABEL_DIM_OPACITY = 0.3
/**
 * Screen-space tolerance, in pixels, for "the pointer is over this edge" —
 * shared by the missed-click picker (registerEdgePicker) and pointer-move
 * hover (handlePointerMove). One constant because they are the same
 * question asked at two different moments; a click that would have hit
 * should hover first, not hit a line the pointer never lit up.
 */
const EDGE_PICK_TOLERANCE_PX = 9

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
 * Cap on how many times `onEngineStop` is allowed to reheat the
 * simulation instead of trusting it — see the reheat check in the
 * `onEngineStop` callback below. A defensive backstop, not a tuned
 * number: a graph that genuinely cannot drive `MIN_TICKS_BEFORE_FIRST_PAINT`
 * real ticks inside a handful of reheats has a different problem, and
 * looping forever on it would be worse than accepting an early stop.
 */
const MAX_PREMATURE_REHEATS = 5

/**
 * Tick burst (2026-09-05, Thomas: "the time it takes to settle is a little
 * annoying"). three-forcegraph runs exactly ONE physics tick per rendered
 * frame, so settling takes ~230 ticks × frame time whatever the tick itself
 * costs — at the Nations tier a tick is a couple of milliseconds and the
 * layout still needs ~6 s at 25 ms frames, all of it spent waiting for the
 * renderer. When a tick is cheap, `useFrame` runs up to `TICK_BURST_MAX`
 * ticks in one frame, stopping as soon as the ticks already run this frame
 * have cost `TICK_BURST_MAX_MS` in total.
 *
 * The final layout is IDENTICAL: the same ticks run in the same order with
 * the same alphas; only how many land in one frame changes. Measured per-tick
 * cost of the production force set in the sandbox (`scripts/measure-forces.ts`
 * instrumented, 2026-09-05): ~7.5 ms at 320 nodes, ~34 ms at 1,000, ~100 ms
 * at 2,505 — so at the Everything tier the first tick alone blows the budget
 * and nothing changes there; the burst is a small-tier feature by
 * construction, and the budget is what keeps a mid-size tier from turning
 * a 25 ms frame into a 60 ms one. Cosmetic side effect while settling: each
 * `tickFrame()` also advances the pulses, so they travel faster for those
 * few seconds. `TICK_BURST_MAX = 1` disables the whole thing.
 */
const TICK_BURST_MAX = 4
const TICK_BURST_MAX_MS = 8

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
/**
 * Real-time floor between `linkWidth`/pulse-geometry rescales — see the
 * guard in `runFit`. Caps the expensive re-digest at ~2/s during a settle
 * (`REFIT_INTERVAL_SECONDS` alone would allow up to 5/s); a residual few
 * percent of stale width between rescales is imperceptible at these widths
 * (1.6px ordinary edge — see `LINK_WIDTH_SCALE`'s comment), same reasoning
 * as the 1% drift threshold it sits beside.
 */
const LINK_RESCALE_MIN_INTERVAL_MS = 500
/** See `lastFitRadius`. */
const DRIFT_CHECK_SECONDS = 2
const DRIFT_RATIO = 1.4
const REFIT_WINDOW_SECONDS = 12

/**
 * Ceiling on the `delta` fed into `settleClock`/`sinceRefit` each frame.
 * `useFrame`'s `delta` is real wall-clock time since the last frame, and
 * `requestAnimationFrame` — so every `useFrame` call — simply does not
 * fire while the tab is backgrounded or hidden. Coming back after a
 * minute away would otherwise hand the very next frame a delta of
 * ~60 seconds, which blows straight through `REFIT_WINDOW_SECONDS` in one
 * frame and ends tracking at exactly the moment it is needed most — right
 * after a gap where nothing could have corrected the camera. Clamped only
 * for the tracking clocks; nothing else here reads a clamped delta.
 */
const MAX_FRAME_DELTA_SECONDS = 0.5

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
 * Same breath, extended to individual continuous-source leaf nodes
 * (`Report.continuous`, `soft` in nodeVisuals.ts) — added 2026-08-28 after
 * Thomas found the static soft-edge fade alone unfindable, even isolated
 * against pure black ("what is the difference between a soft edge and a
 * normal edge?" — he genuinely couldn't tell). Motion reads in peripheral
 * vision the way a static alpha gradient never will, in a scene this busy.
 *
 * Milder floor than an orb's (0.55, not 0.42) and — critically — NO scale
 * term: an orb's `ORB_PULSE_SCALE` swells the whole mesh, but scale is the
 * authority/size channel for every ordinary node, and 39 of them wobbling
 * in size would corrupt that channel for the one visual property this app
 * cares about getting right. Emissive-only, same period, same shape.
 */
const CONTINUOUS_PULSE_FLOOR = 0.55

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

/**
 * The percentile of the node-distance distribution the camera frames, as a
 * function of the layout `spread` (2026-09-06, Thomas). Flat at 0.8 up to
 * spread 1 — the default framing is untouched — then falling with log2 of the
 * spread to a floor of 0.4. The reasoning, the measured off-frame cost and the
 * measured size of the effect are all at the `CORE_PERCENTILE` use site in
 * `measureFit`; read that before changing either constant.
 *
 *   spread   0.5   1     2     3     6     12
 *   P        0.80  0.80  0.69  0.63  0.52  0.41
 */
export function fitPercentileFor(spread: number): number {
  if (!Number.isFinite(spread) || spread <= 1) return FIT_PERCENTILE_MAX
  const p = FIT_PERCENTILE_MAX - FIT_PERCENTILE_SLOPE * Math.log2(spread)
  return Math.max(FIT_PERCENTILE_MIN, Math.min(FIT_PERCENTILE_MAX, p))
}
/** The framing Thomas approved 2026-09-01; the curve above never exceeds it. */
export const FIT_PERCENTILE_MAX = 0.8
/** Floor, reached at the top of the spread slider. See the cost table at the use site. */
export const FIT_PERCENTILE_MIN = 0.4
/** Percentile lost per doubling of `spread`. 0.11 puts the floor at spread ~12, the slider's ceiling. */
export const FIT_PERCENTILE_SLOPE = 0.11

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
  // something absurd, not a number that binds in the ordinary case.
  //
  // **Raised 20 → 200 on 2026-08-20, and the same mistake had been made
  // twice.** 20 was "roughly twice what the corpus asks for today" — true on
  // 2026-08-19, when Cluster spread topped out at 375% and Geo-affinity at
  // 150%. Both ceilings moved that evening (spread to 1000%, geo to 500%,
  // geo now on by default), and the cap became binding again immediately.
  // Thomas reported it the next morning as *"the nodes and edges are nearly
  // invisible"*, with Geo-affinity off and Cluster spread at 1000%.
  //
  // Measured at those settings, Everything tier: the core radius reaches
  // 28,558 and this function is asked for a scale of **92.8**. It returned
  // 20. Nodes were drawn at just under a fifth of the size the fit had
  // decided on, which at that camera distance is sub-pixel dust — and
  // because `baseLinkWidth` is a MULTIPLE of this number, every edge was
  // four-fifths too thin at the same time. That is why the edges went first.
  // Fixing it took the count of bright pixels in the frame from 4,284 to
  // 21,248 at identical settings: a 5.0× recovery against a predicted 4.6×.
  //
  // Geo-affinity was hiding it: the bloc pull holds the cloud to a core
  // radius of about 5,900 (scale 19.2, just under the old cap), so with geo
  // at its 150% default nothing looked wrong. Turning geo OFF lets the same
  // corpus relax to nearly five times that radius.
  //
  // **Re-derived to 2000 the same day, when the spread ceiling went to
  // 10000%.** 200 was right for a 1000% ceiling and would have re-broken the
  // graph at 10000% — the rule below was written an hour earlier and then
  // immediately earned its keep, so it is worth restating: when a slider
  // ceiling moves, recompute this. `cloudRadius × TARGET_LARGEST_FRACTION /
  // MAX_BASE_RADIUS` at the new extreme, then double it.
  //
  // Measured cold-start at spread 10000% with geo off, which is the most
  // expansive configuration reachable: core radius 240,508 at the Everything
  // tier (asks for 781.7), 283,666 at States (asks for **921.9**). 2000 is
  // 2.2× the worst of those.
  //
  // **Cold start and ramped-up used to not be the same layout — fixed
  // 2026-08-20.** Loading straight into 10000% gave a core radius of
  // 240,508; dragging the slider up to 10000% from 1000% in a live session
  // settled at 17,217 — a factor of fourteen for identical settings. That
  // path-dependence was almost certainly what Thomas meant by "sometimes the
  // cluster is a ball, sometimes it is oblong". The cause: the `forceGraph`
  // memo's node-seeding block (see `spreadOnlyChanged` in that memo, below)
  // reused every node's last position on ANY rebuild, including a pure spread
  // change — so a ramped change only ever nudged an already-relaxed cloud
  // instead of re-relaxing one from scratch the way a cold load does.
  // Skipping the seed step when `graph` itself hasn't changed makes a spread
  // change re-run the same near-origin randomisation a fresh load gets.
  // **Re-measured after the fix, 2026-08-20**, with a temporary headless
  // Playwright harness (sandbox copy only — never merged, same recipe as the
  // 2026-08-19 fit-measurement notes): at the Everything tier, 958 framed
  // nodes, cold-starting at spread 10000% now settles to a core radius of
  // ~113,650; ramping the same slider up to 10000% from 1000% in a live
  // session settles to ~113,307 — a ratio of 1.003, against 5.67 measured the
  // same way on the unfixed code (that run's own cold figure, ~113,651, is
  // the same order as the 240,508 recorded above under different settle
  // timing and tier state — the QUALITATIVE bug, not this exact number, is
  // what carried over). Effectively no path-dependence left. If the two paths
  // ever disagree by more than noise again, look at `spreadOnlyChanged` in
  // the `forceGraph` memo first, not this cap.
  //
  // **Re-derived 2000 -> 50, 2026-09-03, round 0 (Q13's spread re-cut,
  // 100 -> 12).** Measured cold-start with a temporary headless Playwright
  // harness (sandbox copy only, same recipe as the notes above): Everything
  // tier, all 191 countries opened (the true worst case — nothing folded
  // left to expand further), spread at the new ceiling (12, 1200%), geo off.
  // Core radius settled at 6,644, asking `nodeScaleFor` for a scale of
  // **21.6**. 50 is 2.3x that — the same "double the worst measured ask"
  // margin every prior derivation here used (2.2x for the 2000 cap, 2.7x for
  // the 200 cap before it). Leaving the old 2000 cap in place would not have
  // been WRONG — a lower spread ceiling can only ask for a smaller scale, so
  // 2000 was never at risk of binding — but it would have been exactly the
  // kind of stale, unmeasured number rule 8 (PLAYBOOK) warns against: a
  // cap sized for a spread range 8x wider than the one that now exists.
  // Zero console errors in the same run. **Never move the spread ceiling in
  // `ViewControls.tsx`/`lib/view.ts` without re-deriving this cap again.**
  return Math.min(50, Math.max(1, wanted))
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

/**
 * The un-scaled width of a link — ONE constant, since 2026-08-19.
 *
 * This function used to encode three things in geometry: edge weight
 * (0.5 + weight × 1.2), trunk stacking (+45% per doubling of count) and the
 * cross-border boost (×1.6). Thomas, looking at the result at corpus scale:
 * "it is too noisy trying to equate the thicknesses of the edges and sizes
 * of the pulses. these need to be cleaner so lets go with set sizes and
 * keep it simpler." He is right about what the encoding was worth: at 1–2px
 * the differences read as inconsistency, not information. Every line is now
 * the same width and every pulse the same size; what survives of those three
 * facts lives where it always read better — trunk stacking and the border
 * boost in the line's OPACITY (see the gradientLinkMaterial call), the
 * border crossing additionally in its blinking pulse, and weight in the
 * layout's rest lengths. The `l` parameter stays so the accessors don't
 * change shape if a width encoding ever earns its way back.
 */
function baseLinkWidth(_l: LinkDatum): number {
  return 1
}

/**
 * Merge two edges' grades onto one trunk line — see LinkDatum.grade's doc
 * comment for why `undefined` (ungraded) dominates rather than being
 * treated as the worst grade: a trunk with even one unchecked member has
 * not earned a demotion on the strength of its OTHER members. When both
 * sides carry an explicit grade, the better one wins — the trunk shows
 * whichever member has the strongest evidence, the same "an ANY question,
 * not an average" logic `cross`/`continuousSource` already use on this
 * datum.
 */
function betterGrade(
  a: EvidenceGrade | undefined,
  b: EvidenceGrade | undefined,
): EvidenceGrade | undefined {
  if (a === undefined || b === undefined) return undefined
  return EVIDENCE_GRADE_RANK[a] <= EVIDENCE_GRADE_RANK[b] ? a : b
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
  /**
   * Whether the user currently holds the camera — the same `userOwnsCamera`
   * ref `runFit` itself reads to decide `moveCamera`, mirrored here so
   * CameraZoom can read it too. Added 2026-08-21 (review §2, "zoom slider
   * drifts on its own during settle") — `runFit` keeps publishing `distance`
   * on every tracking pass even while the user owns the camera (deliberately,
   * see `distance`'s own history), and CameraZoom needs to know when to stop
   * treating that live number as "zoom 1" and freeze its own snapshot
   * instead (see `currentBase` in CameraZoom.tsx). Written from `runFit`
   * itself — `!moveCamera` at every call site already equals
   * `userOwnsCamera.current` at the moment of that call, so this needs no
   * extra ref-mutation sites of its own, just one line where `distance` is
   * already published below.
   */
  userOwnsCamera: false,
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

/**
 * Frees every GPU resource anywhere in `fg`'s subtree — node spheres, link
 * lines, pulse teardrops, and three-forcegraph's own internal meshes alike —
 * by traversing and disposing geometry, material(s), and any texture a
 * material holds.
 *
 * **The GPU leak this exists to fix (audit 2026-09-02, HANDOFF renderer bug
 * 2).** The `forceGraph` memo below builds a brand new `ThreeForceGraph`
 * (new meshes, new geometries, new materials) every time `graph` or
 * `spreadApplied` changes — a drilldown toggle, a tier change, a filter
 * narrowing the corpus, dragging the spread slider. `<primitive object={...}>`
 * unmounts the OLD instance's subtree from the scene graph when the prop
 * identity changes, but unmounting a `<primitive>` only removes objects from
 * the scene — it never calls `.dispose()` on anything they own, so every
 * rebuild leaked the previous instance's buffers to the GPU with nothing
 * ever freeing them. See the cleanup effect right after the `forceGraph`
 * memo for where this is actually called.
 */
function disposeForceGraphResources(fg: ThreeForceGraph): void {
  ;(fg as unknown as THREE.Object3D).traverse((obj) => {
    const mesh = obj as unknown as {
      geometry?: THREE.BufferGeometry
      material?: THREE.Material | THREE.Material[]
    }
    mesh.geometry?.dispose()
    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : mesh.material
        ? [mesh.material]
        : []
    for (const material of materials) {
      // A material can hold several textures under different property
      // names (map, alphaMap, emissiveMap...) — this file's own materials
      // are simple (colour uniforms, no texture maps) but three-forcegraph's
      // own internal meshes and any future material are not guaranteed to
      // be, so free whatever is actually a texture rather than naming maps
      // by hand.
      const withMaps = material as THREE.Material & Record<string, unknown>
      for (const key of Object.keys(withMaps)) {
        const value = withMaps[key]
        if (value && typeof value === 'object' && (value as { isTexture?: boolean }).isTexture) {
          ;(value as THREE.Texture).dispose()
        }
      }
      material.dispose()
    }
  })
}

export default function InfluenceGraph({
  graph,
  labelled,
  view,
  focus,
  visible,
  isolatedCountry,
  flyTo,
  resetSignal,
  levelColours,
  onHover,
  onSelect,
  onSelectEdge,
  registerEdgePicker,
  onBounds,
  onReady,
  onToggleNode,
}: {
  graph: Graph
  /** Ids that carry a standing label, with their priority — `standingLabels` in hierarchy.ts. */
  labelled: ReadonlyMap<string, number>
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
  /**
   * The single country isolated via the Groups panel right now, or null —
   * round 0 (2026-09-03, Q16 "b"). Narrows what `measureFit` frames the
   * camera to; does not touch what is DRAWN (`visible` alone decides that,
   * unchanged) — a country isolate still renders the INT standards it
   * connects to, it just stops letting them drag the camera out to include
   * them. See the per-galaxy fit note inside `measureFit` below.
   */
  isolatedCountry: Country | null
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
  /**
   * Click landed on an edge — a line, its arrowhead, or a travelling pulse —
   * rather than a node. Reports the edgeKey; App owns what selecting an edge
   * means (the evidence card) and the toggle semantics, mirroring `onSelect`.
   */
  onSelectEdge: (key: string) => void
  /**
   * Hands App a screen-space edge picker for clicks that hit NOTHING.
   *
   * A drawn line is ~1.6px wide — as a raycast target it is a precision
   * instrument nobody can reliably hit (measured: a 40px-grid sweep of ~330
   * synthetic clicks over the Everything tier landed zero). So the direct
   * raycast handles the generous targets (pulses, trunks, arrowheads), and
   * this picker gives ordinary lines a tolerance: on a missed click, App asks
   * for the nearest visible link within a few pixels of the cursor. It lives
   * behind a registration callback because only this component holds the
   * camera, the live link list and the layout positions — and `onPointerMissed`
   * only exists on the Canvas, which App owns.
   */
  registerEdgePicker: (pick: (clientX: number, clientY: number) => string | null) => void
  onBounds: (bounds: GraphBounds) => void
  /**
   * Fired once, the first time the layout has stopped moving AND been framed.
   * App uses it to lift the loading curtain. See the call site in `useFrame`.
   */
  onReady?: () => void
  /**
   * Double-click on a node or an orb. App.tsx owns the drilldown state and
   * decides what a double-click on this particular id means (open an orb,
   * fold a real node's rung back in) — this component only reports which id
   * was hit, the same division of labour `onSelect` already has.
   */
  onToggleNode: (id: string) => void
}) {
  const ref = useRef<ThreeForceGraph | null>(null)
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
   * The `graph` reference the layout memo last ran with — so it can tell "a
   * real graph change (drilldown, tier, filter)" apart from "only
   * `spreadApplied` changed". See the seeding block in the memo below for why
   * that distinction is the fix for the reported path-dependence bug
   * ("sometimes the cluster is a ball, sometimes it is oblong" — also
   * recorded in `nodeScaleFor`'s comment, which this fixes rather than merely
   * compensates for).
   */
  const prevGraphForLayout = useRef<typeof graph | null>(null)
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
   * Whether three-forcegraph's layout engine is currently ticking — true from
   * a rebuild or any `d3ReheatSimulation()` until the next `onEngineStop`.
   * The library keeps this in private state and exposes no getter, so it is
   * mirrored here from the only three places it can change. Read by the tick
   * burst in `useFrame`: once the engine has stopped, `tickFrame()` only
   * moves photons, and calling it more than once a frame would just run the
   * pulses faster forever. See `TICK_BURST_MAX_MS`.
   */
  const engineRunning = useRef(true)
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
   * How many times `onEngineStop` has reheated the simulation instead of
   * trusting a stop that arrived suspiciously early — see the check in the
   * `onEngineStop` callback below, and `MAX_PREMATURE_REHEATS`.
   */
  const reheatAttempts = useRef(0)
  /** One-shot latch for `onReady` — see where it is fired, in `useFrame`. */
  const readyReported = useRef(false)
  /**
   * Wall-clock seconds elapsed since this `forceGraph` was (re)built, and
   * since the last periodic re-fit — see `REFIT_INTERVAL_SECONDS`. Two
   * separate accumulators because they reset on different events: the first
   * only on rebuild, the second every time a periodic fit actually runs.
   */
  const settleClock = useRef(0)
  /**
   * Drift watchdog (2026-09-01). The cloud radius the camera was last fitted
   * to, and a clock for re-checking it. `onEngineStop` can fire on
   * three-forcegraph's 45s wall-clock cooldown while the tab is hidden or
   * the main thread is busy — before a single real tick — and the guard
   * above it gives up after `MAX_PREMATURE_REHEATS`. When that happens the
   * "settled" fit frames the near-origin seed ball and the layout then
   * expands 30× around a camera nobody re-fits. Seen live 2026-09-01:
   * cloud p95 2,112 with the camera 700 from its centre. So after settle,
   * every `DRIFT_CHECK_SECONDS` the cloud is re-measured and, if it has
   * grown or shrunk past `DRIFT_RATIO` relative to the fitted radius and the
   * user has not taken the camera, it is re-fitted.
   */
  const lastFitRadius = useRef(0)
  const driftClock = useRef(0)
  const sinceRefit = useRef(0)
  /** Wall-clock seconds, free-running, driving the orb breath. Never reset. */
  const pulseClock = useRef(0)
  /** Photon batches — one `InstancedMesh` per (teardrop bucket, pulse
   * material) instead of one draw per photon. Fed every frame in `useFrame`
   * right after `tickFrame()`; rebinds itself when `forceGraph` is rebuilt. */
  const photonInstancer = useRef(new PhotonInstancer())
  /** Link batches — same mirror, for the cylinders; see linkInstancing.ts. */
  const linkInstancer = useRef(new LinkInstancer())
  /** Node batches — the last third; see nodeInstancing.ts. */
  const nodeInstancer = useRef(new NodeInstancer())
  useEffect(() => {
    const photons = photonInstancer.current
    const lines = linkInstancer.current
    const spheres = nodeInstancer.current
    return () => {
      photons.dispose()
      lines.dispose()
      spheres.dispose()
    }
  }, [])
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
   * the scene bounds, and `fitState`, which is where Reset flies back to)
   * keeps updating on the same 0.2s cadence. Skipping the fit
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
  /**
   * Real wall-clock time (`performance.now()`) the link/pulse rescale below
   * was last actually applied — the second half of the round-0 fix for
   * renderer bug 3 (linkWidth thrash). See that guard's own comment.
   */
  const lastLinkRescaleAt = useRef(0)
  /**
   * A link rescale that the rate limiter in `runFit` refused, parked until
   * the interval has passed (2026-09-05, Thomas's "occasionally the edges go
   * real faint" screenshots). `runFit` runs on a timer during the settle and
   * once more from `onEngineStop`; when that LAST call landed inside
   * `LINK_RESCALE_MIN_INTERVAL_MS` of the previous rescale it was simply
   * skipped, and nothing ever came back for it — the spheres had their final
   * scale (applied unconditionally a few lines up) while every line kept the
   * width of a cloud a few hundred units smaller, i.e. thin to the point of
   * vanishing at the Everything tier. A spread change rebuilds everything
   * and so "fixed" it, which is what Thomas saw. The timer below makes the
   * refused rescale happen after the interval instead of never.
   */
  const pendingLinkRescale = useRef<ReturnType<typeof setTimeout> | null>(null)
  /** Where the fit put the camera, so Reset can go back without re-laying out. */
  const fitState = useRef<{ centre: THREE.Vector3; distance: number } | null>(null)
  /** Camera distance chosen by the auto-fit, kept for the search flight. */
  const fitDistance = useRef(0)
  const { camera, controls, size, gl, scene } = useThree()
  /**
   * Dev-only: expose the renderer so a real-GPU measurement can be taken from
   * the browser console (audit finding P3, 2026-08-30 — no frame-time number
   * exists for this app on real hardware; swiftshader in the sandbox reads
   * ~1 fps and says nothing). `window.__rig.gl.info.render.calls` etc. Never
   * set in a production build.
   */
  useEffect(() => {
    if (!import.meta.env.DEV) return
    // `scene` and `graph` added 2026-09-01 so a live session can measure the
    // cloud (bounding radius, p95, node count) from the console — the fit
    // bug hunt below needed it, and `renderer.info` alone can't say where
    // the nodes are.
    ;(window as unknown as { __rig?: unknown }).__rig = {
      gl,
      camera,
      scene,
      graph: () => ref.current?.graphData(),
      photons: () => photonInstancer.current.stats(),
      links: () => linkInstancer.current.stats(),
      nodes: () => nodeInstancer.current.stats(),
      // Cost of one `tickFrame()` right now, ms — drives one extra tick.
      tickMs: () => { const t = performance.now(); ref.current?.tickFrame(); return performance.now() - t },
      // Fit-loop state, read live — for diagnosing "camera inside the cloud".
      fit: () => ({
        tickCount: tickCount.current,
        engineRunning: engineRunning.current,
        reheatAttempts: reheatAttempts.current,
        settledOnce: settledOnce.current,
        fitted: fitted.current,
        everFitted: everFitted.current,
        userOwnsCamera: userOwnsCamera.current,
        settleClock: settleClock.current,
        fitDistance: fitDistance.current,
        fitPose: fitPose.current,
        nodeScale: nodeScale.current,
        measured: measureFit(),
      }),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, camera, scene])

  /**
   * One sprite for the whole scene, built once. Its position, scale, colour
   * and visibility are all written from `useFrame` below — nothing about it is
   * React state, because it has to track the camera every frame.
   */
  const halo = useMemo(() => selectionHalo(), [])
  /** The hover glow — same sprite machinery, smaller and fainter. */
  const hoverHalo = useMemo(() => selectionHalo(), [])
  /**
   * Standing labels for the standards — see LABEL_SPAN_GATE and
   * `standingLabels` in hierarchy.ts. Rebuilt with the disclosed graph,
   * since which labelled nodes are real (not folded) is a fact about the
   * current view; the membership itself comes from the base graph.
   */
  const labelSprites = useMemo(() => {
    const out = new Map<string, THREE.Sprite>()
    for (const n of graph.nodes) {
      if (isOrbId(n.id) || !labelled.has(n.id)) continue
      const sprite = labelSprite(labelTextFor(n.title))
      sprite.userData.priority = labelled.get(n.id) ?? 0
      out.set(n.id, sprite)
    }
    return out
  }, [graph, labelled])
  useEffect(
    () => () => {
      for (const sprite of labelSprites.values()) {
        ;(sprite.material as THREE.SpriteMaterial).map?.dispose()
        sprite.material.dispose()
      }
    },
    [labelSprites],
  )
  /**
   * Which node the pointer is over, for the 3D hover feedback. A ref, not
   * state: `useFrame` reads it every frame, and the 2D tooltip already gets
   * its own copy through `onHover` — two consumers, two channels, neither
   * re-rendering the tree on mouse move.
   */
  const hoveredIdRef = useRef<string | null>(null)
  /** The eased hover animation: which mesh is growing, and how far along. */
  const hoverAnim = useRef<{ id: string | null; t: number }>({ id: null, t: 0 })
  /** Scratch vector for the halo's world position — allocated once, not per frame. */
  const haloWorldPosition = useRef(new THREE.Vector3())
  /** Scratch for the label overlap pass — one projection per labelled node per frame. */
  const labelScreen = useRef(new THREE.Vector3())
  /**
   * Which edge the pointer is over, so setLinkHover can be told when that
   * changes — 2026-08-22, Thomas: hovering a line gave no cue it was
   * selectable at all. A ref, not state, for the same reason hoveredIdRef
   * is: this is written every pointermove and read by nothing that should
   * re-render the tree.
   */
  const hoveredLinkKeyRef = useRef<string | null>(null)
  /** Scratch vector for nearestLinkAt's screen-space projection — allocated once, not per call. */
  const linkProjectScratch = useRef(new THREE.Vector3())

  /**
   * The live layout data, by report id.
   *
   * These are the very objects d3-force mutates each tick, so reading `x`/`y`/
   * `z` off one is reading where the node actually is — which `meshes` cannot
   * be trusted for (see the halo block in `useFrame`).
   */
  const positionedById = useRef(new Map<string, PositionedNode>())
  /** The current LinkDatum list, for the screen-space edge picker. */
  const linkDataRef = useRef<LinkDatum[]>([])

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

  /** Same pattern, for `galaxyForce`. See `lib/galaxyForce.ts` and `view.galaxy`. */
  const galaxyStrength = useRef(0)
  galaxyStrength.current = view.galaxy

  /**
   * Same pattern, for `clusterRepulsionForce`. See `lib/clusterRepulsion.ts`
   * and `view.clusterRepulsion`.
   */
  const clusterRepulsionStrength = useRef(0)
  clusterRepulsionStrength.current = view.clusterRepulsion

  /**
   * Same pattern again, for `view.pulseRate` — read live wherever something
   * animates on its own clock: the `linkDirectionalParticleSpeed` accessor
   * below (three-forcegraph calls it fresh every frame, so a ref is all this
   * needs, no re-digest) and the `pulseClock` accumulation in `useFrame`.
   */
  const pulseRateRef = useRef(1)
  pulseRateRef.current = view.pulseRate

  const litLink = (l: LinkDatum) => !focusRef.current || focusRef.current.edges.has(l.key)

  const shownNode = (id: string) => !visibleRef.current || visibleRef.current.nodes.has(id)
  const shownLink = (l: LinkDatum) =>
    (!visibleRef.current || visibleRef.current.edges.has(l.key)) && l.gradeVisible

  const forceGraph = useMemo(() => {
    // Since blueprint's deletion (2026-08-19) NO view setting is a memo dep —
    // every toggle mutates live materials, because a rebuild re-runs layout
    // for a paint job. Blueprint was the one deliberate exception (a
    // different set of materials, not a paint job); it went with the mode.
    // **Per-instance mesh registry (2026-09-01).** This used to be
    // `meshes.current.clear()` followed by `nodeThreeObject` registering
    // straight into the shared ref. Under React StrictMode (dev) this factory
    // runs TWICE per rebuild and both `ThreeForceGraph` instances run their
    // debounced digest — the orphan's last — so the shared map ended up
    // holding spheres that were never in the scene, and every "mutate the
    // live material" effect (lens, level recolour, focus dim, `nodeScale`)
    // painted the orphans while the mounted spheres sat at scale 1 in their
    // birth colours. Seen live 2026-09-01: every scene sphere at scale 1.00,
    // lens buttons "doing nothing until cluster spread". Each instance now
    // owns its map; the effect after this memo points `meshes` at the map of
    // whichever instance React actually kept.
    const localMeshes = new Map<string, THREE.Mesh>()

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
    // **None of the three apply when only `spreadApplied` changed.** This memo
    // has two triggers — `graph` changing (a drilldown toggle, a tier change,
    // a filter narrowing the corpus) and `spreadApplied` changing (the
    // slider) — and before this fix, a spread change fell through the exact
    // same seeding as a drilldown toggle: every node resumed from wherever it
    // had settled under the OLD spread, so the new force parameters only ever
    // got to nudge an already-relaxed cloud rather than re-relax one from
    // scratch. That is the fourteen-fold "sometimes the cluster is a ball,
    // sometimes it is oblong" bug measured in `nodeScaleFor`'s comment below:
    // cold-starting at spread 10000% settles to a core radius of 240,508;
    // ramping the same slider up to 10000% in a live session settled at
    // 17,217 for identical final settings, because the ramped run never got
    // the from-scratch relaxation a cold load gets. Skipping every seed below
    // when the graph itself hasn't changed makes a spread change behave
    // exactly like a fresh load at that spread — the fix `nodeScaleFor`
    // flagged as a candidate without yet making.
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
    const spreadOnlyChanged = prevGraphForLayout.current === graph
    prevGraphForLayout.current = graph

    const nodes = graph.nodes
      .filter((n) => isOrbId(n.id) || n.in_degree > 0 || n.out_degree > 0)
      .map((n) => {
        if (spreadOnlyChanged) return { ...n }

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

        // A freshly-revealed real node starts at its parent orb's last
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
        //
        // **Country orb checked first, 2026-08-20.** Since the per-country
        // fold, the overwhelmingly common way a real node gets revealed is a
        // double-click on ITS country's orb, not a global tier change — so
        // its last known position is under `corb:${country}`, not
        // `orb:${family}`. The family lookup stays as a fallback for the
        // rarer case a tier button reveals a country that's already marked
        // opened before that country ever had its own orb on screen.
        const parent =
          lastPositions.current.get(countryOrbId(n.country)) ??
          lastPositions.current.get(orbId(familyOf(n.country)))
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

    // How many DIFFERENT countries each node's edges reach — the gate on the
    // stiffness damping below. See `LinkDatum.stiffness` for why degree alone
    // was the wrong test. Built from the same pass, one Set per linked node.
    const countrySpan = new Map<string, Set<string>>()
    for (const e of graph.edges) {
      for (const [self, other] of [
        [e.source_report_id, e.target_report_id],
        [e.target_report_id, e.source_report_id],
      ] as const) {
        const country = graph.byId.get(other)?.country
        if (!country) continue
        const seen = countrySpan.get(self)
        if (seen) seen.add(country)
        else countrySpan.set(self, new Set([country]))
      }
    }
    /**
     * A node has to reach this many different countries before its links are
     * treated as cross-cluster tethers rather than a country's own spine.
     * 15 nodes clear it on the 2026-08-28 corpus, all of them international
     * standards (`sna-2008`, `esa-2010`, `imf-e-gdds`, `imf-bpm6`, ...).
     */
    const HUB_SPAN_GATE = 10
    /**
     * Above this degree a gated hub's links start softening, as `KNEE / deg`.
     * Swept 2026-08-28 against the real corpus from identical fresh random
     * starts (`scripts/measure-hub-drag.ts`, throwaway — not committed):
     * ratio of inter-country centroid separation to intra-country spread
     * 8.05-8.20 ungated → 9.30-9.69 here, and the mean distance of
     * hub-attached nodes from the global centroid rose 0.561-0.565 → 0.690
     * -0.713 of the cloud's 92nd-percentile radius. No NaN, no runaway, both
     * seeds agreed on direction and rough size. Lower knees kept helping but
     * with diminishing returns and a hub drifting off its own centre.
     */
    const HUB_LINK_KNEE = 4
    /**
     * Stiffness multiplier on every link with an international node at
     * exactly one end — a national/subnational report (or a country orb)
     * tethered to a standard like `sna-2008`, `imf-bpm6`, `un-coicop-2018`.
     * **0 since 2026-08-31 (Thomas: "set the int <> country link to 0").**
     * The edge still draws, still carries pulses, still counts for focus and
     * authority; it just stops pulling.
     *
     * Why: measured on the real corpus (`scripts/measure-forces.ts` with a
     * position dump, memory `layout_blob_diagnosis_2026-08-31`), twelve
     * international standards each spring-link 10–55 countries, and those
     * ~760 springs have one equilibrium — the standard in the exact middle
     * and every conforming country averaged toward it. INT nodes sat at a
     * median 0.15 of the cloud radius (sna-2008 at 0.04) and were 174 of
     * the 637 nodes in the inner quarter; a country's nearest neighbouring
     * cluster sat 1.5 cluster-widths away — the "blob of nodes" Thomas
     * complained of. With this at 0: nearest-neighbour gap 3.2 widths,
     * inter/intra ratio 10 → 28, INT nodes migrate to their own peripheral
     * galaxy (galaxyForce still holds them together), zero INT nodes left
     * in the inner quarter. The whole 0–15 cluster-repulsion range, for
     * comparison, buys 7 → 10.7. At 0.1 you keep about two thirds of the
     * opening with the standards still gently gravitating.
     *
     * Position still encodes only edges — this decides which edges get to
     * pull, not where anything goes. INT↔INT links keep full stiffness so
     * the standards cluster with each other; the HUB gate above still
     * applies to the domestic mega-hubs (`esa-2010` is EU, not INT).
     * `scripts/measure-forces.ts` mirrors this constant — change both.
     */
    const INT_LINK_STIFFNESS = 0
    /**
     * Opacity multiplier on an `intTether` link while nothing is traced or
     * hovered (2026-08-31, Thomas, after seeing the springs-off layout: the
     * fan of INT spokes was the new blob). Restored to full inside a trace
     * (`setLinkFocus` reads `focusOpacity`) and lifted by hover as usual.
     * Pulses on tethers are suppressed outside a trace for the same reason
     * — the "flickers of the pulses" he complained about were mostly these.
     */
    const INT_TETHER_OPACITY = 0.16
    /**
     * The tether's direction cue is a beam, not teardrops (2026-08-31,
     * Thomas: "the int pulses are gone and I miss them… make them beams
     * along the edge!"). Same sweeping-band shader the continuous
     * databases use, with `uFlowLift` letting each crest raise the faint
     * line's alpha to this value as it passes — so the spoke itself stays
     * at INT_TETHER_OPACITY and only the moving bands glow. Shipped at
     * 0.45; raised to 0.68 the same evening (Thomas: "raise the crest
     * brightness by 50%") — which also happens to match the 0.68 opacity
     * ceiling a traced link gets in setLinkFocus, so a crest never
     * outshines an actual trace. Obeys the
     * Pulses toggle like every other direction cue. Teardrops never ride
     * a tether now, traced or not: the beam IS its pulse.
     */
    const INT_TETHER_BEAM_LIFT = 0.68

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
      // See LinkDatum.continuousSource. `=== true` rather than a bare
      // truthiness check for the same reason the field is optional and not
      // defaulted: undefined (ordinary) is a different claim from a future
      // explicit `false`, even though both render identically today.
      const continuousSource = upstream?.continuous === true
      // See INT_LINK_STIFFNESS / LinkDatum.intTether: exactly one INT end.
      const intTether =
        (upstream?.country === 'INT' ? 1 : 0) + (downstream?.country === 'INT' ? 1 : 0) === 1
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
        existing.continuousSource = existing.continuousSource || continuousSource
        existing.grade = betterGrade(existing.grade, e.evidence_grade)
        existing.legalBasis = existing.legalBasis && e.relationship_type === 'legal_basis'
        continue
      }
      // Family ink, not fill — see the note on LinkDatum.colour.
      const linkInk = inkFor
      const fallbackInk = '#7f9ad0'
      linkMap.set(key, {
        source: e.target_report_id,
        target: e.source_report_id,
        weight,
        upstreamCadence: upstream?.releases_per_year ?? 1,
        colour: upstream ? linkInk(upstream.country) : fallbackInk,
        endColour: downstream ? linkInk(downstream.country) : fallbackInk,
        cross,
        continuousSource,
        grade: e.evidence_grade,
        legalBasis: e.relationship_type === 'legal_basis',
        // Filled in below, once `links` is final — see LinkDatum.gradeVisible.
        gradeVisible: true,
        intTether,
        count: 1,
        hubRoom:
          3.5 *
          (Math.sqrt(degree.get(e.source_report_id) ?? 1) +
            Math.sqrt(degree.get(e.target_report_id) ?? 1)),
        stiffness: (() => {
          const ds = degree.get(e.source_report_id) ?? 1
          const dt = degree.get(e.target_report_id) ?? 1
          // d3's own default, reproduced rather than inherited — overriding
          // `strength` replaces it wholesale, so the ordinary case has to be
          // restated here or every link in the graph changes.
          const base = 1 / Math.max(1, Math.min(ds, dt))
          const busier = ds >= dt ? e.source_report_id : e.target_report_id
          const span = countrySpan.get(busier)?.size ?? 0
          const gated = span < HUB_SPAN_GATE ? base : base * Math.min(1, HUB_LINK_KNEE / Math.max(ds, dt))
          // See INT_LINK_STIFFNESS. An INT↔INT link is the standards holding
          // each other, and keeps its spring. The folded International ORB's
          // tethers are springless like any other — it is *placed* instead,
          // by `intAnchorForce` (lib/intAnchor.ts), because springs on a
          // 700-degree orb move the countries, not the orb.
          return intTether ? gated * INT_LINK_STIFFNESS : gated
        })(),
        key,
      })
    }
    const links: LinkDatum[] = [...linkMap.values()]
    // Bake in grade-visibility now that every trunk's final (merged) grade
    // is known — see LinkDatum.gradeVisible's own comment for why this is a
    // build-time field rather than a live read. `view.minGrade` is safe to
    // read directly here (rather than off a ref) because a minGrade change
    // is itself what makes this memo re-run — see minGrade's doc comment in
    // view.ts and the `graph` memo in App.tsx.
    for (const l of links) {
      l.gradeVisible = l.grade === undefined || EVIDENCE_GRADE_RANK[l.grade] <= EVIDENCE_GRADE_RANK[view.minGrade]
    }
    // For the screen-space edge picker — see registerEdgePicker on the props.
    linkDataRef.current = links

    // One material per link, held so focus changes are a uniform write rather
    // than a rebuild, and so the library's repeated `obj.material = ...` on
    // every digest keeps assigning the same object instead of churning.
    linkMaterials.current.clear()
    // Same reset, for the same reason — see resetLinkFlow's own comment: a
    // beam material is one instance per link, never shared, so the module's
    // animation registry has to be cleared here or it leaks one entry per
    // continuous edge on every rebuild.
    resetLinkFlow()
    // The old hovered key's material no longer exists past this point — drop
    // it rather than leave a stale key that setHoveredLink would silently no-op
    // against forever (harmless, but the pointer may genuinely still be over
    // the same edge after a filter change, and this lets it re-highlight on
    // the next pointermove instead of staying dark).
    hoveredLinkKeyRef.current = null
    for (const l of links) {
      // The third (dashed) argument retired with the implied-edge layer,
      // 2026-08-12. The shader machinery behind it survives in linkVisuals for
      // the relations rendering to reuse as a *dotted* style — a different
      // pattern for a different claim. The fourth is the trunk brightness:
      // log-scaled with the stacked count so 57 edges read as unmistakably
      // heavier, not 57× louder.
      // A cross-border edge starts 1.3× brighter still (round 10): brightness
      // and the width boost below are the "bolder" half of the treatment, the
      // blinking pulse is the other.
      // Grade sets the base the cross-border/trunk multipliers scale from —
      // see EVIDENCE_GRADE_LINK_OPACITY's own comment for why B is LOUDER
      // than LINK_OPACITY, not dimmer. Ungraded (the ordinary case until
      // round 3's grader runs) uses LINK_OPACITY directly, same as always.
      const gradeOpacity = l.grade !== undefined ? EVIDENCE_GRADE_LINK_OPACITY[l.grade] : LINK_OPACITY
      const baseOpacity = gradeOpacity * (l.cross ? 1.3 : 1)
      const fullOpacity = Math.min(0.55, baseOpacity * (1 + 0.35 * Math.log2(l.count)))
      // legal_basis gets the amber tint before it goes through edgeShade —
      // see legalBasisTint's own comment for why the order matters.
      const fromInk = l.legalBasis ? legalBasisTint(l.colour) : l.colour
      const toInk = l.legalBasis ? legalBasisTint(l.endColour) : l.endColour
      const material = gradientLinkMaterial(
        // The LINE draws in a softened shade of the ink; the pulse riding
        // it draws brighter (see edgeShade/PULSE_BRIGHTEN in linkVisuals) —
        // the datum keeps the PURE ink so pulses derive from the true hue.
        edgeShade(fromInk),
        edgeShade(toInk),
        false,
        // A tether rests faded (see INT_TETHER_OPACITY) …
        l.intTether ? fullOpacity * INT_TETHER_OPACITY : fullOpacity,
        // The beam flag — see LinkDatum.continuousSource and
        // gradientLinkMaterial's own doc comment. A tether carries the
        // beam too (INT_TETHER_BEAM_LIFT), as its only direction cue.
        l.continuousSource || l.intTether,
        l.intTether ? INT_TETHER_BEAM_LIFT : 0,
      )
      // … and comes back to full inside a trace — see setLinkFocus.
      material.userData.focusOpacity = fullOpacity
      linkMaterials.current.set(l.key, material)
    }

    // Geometry and material for a link's pulses. three-forcegraph reads only
    // these two fields off the object it is handed, and reuses them across all
    // the photons on that link.
    //
    // A continuous edge gets no entry here at all — it never asks for one,
    // since `linkDirectionalParticles` always returns 0 for it below, and
    // building a teardrop it will never use would be exactly the draw-call
    // cost the beam treatment exists to remove (the review's own §4.3: up to
    // 4 photon meshes per fast edge, and continuous edges are the fastest by
    // construction — see `Report.continuous`'s nominal 250/365 rate).
    const particleObjects = new Map<string, THREE.Mesh>()
    for (const l of links) {
      if (l.continuousSource) continue
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
        // so no single level colour is true of it.
        // Lens first, then the single-family level recolour, then the plain
        // palette — the same precedence the recolour effect below applies, and
        // the two MUST agree or a mesh rebuilt mid-lens flickers to the wrong
        // colour until the next effect pass.
        const colour =
          (!orbNode &&
            (lensColourFor(n.country, lensRef.current) ??
              levelColoursRef.current?.[scopeOf(n)])) ||
          colourForReport(n)
        // Orbs grow with what they hold — see `orbSizeFactor`.
        const radius =
          radiusFor(n.size_score) *
          (orbNode ? orbSizeFactor((n as OrbNode).members?.length ?? 1) : 1)

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
        // **Floor dropped 0.3 → 0.12 on 2026-08-19 (Phase 4 §2.2).** At 0.3
        // the self-illumination term rivalled everything the lights
        // contributed, so the shading gradient was a small ripple on a large
        // flat value — the mechanical meaning of "the nodes are flat". The
        // 0.3 was chosen when it was the only thing keeping v2's dark fills
        // off the background; v3's palette floors fill luminance at Y ≈ 0.21,
        // which removed that reason. The directional rig in App.tsx (same
        // change) supplies the shading this floor used to drown. The
        // authority SLOPE (0.62) is untouched — glow still ranks nodes the
        // same way, from a lower base. BLOOM_THRESHOLD_MIN/MAX in view.ts
        // were rescaled to the new emitted range in the same edit.
        const emissive = 0.12 + n.size_score * 0.62

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
        // A continuously-updated database (`Report.continuous`, 35 nodes) has
        // no discrete edition — see `nodeVisuals.ts`'s "Soft edge" paragraph
        // for why that becomes a fading silhouette instead of a hard border.
        // Same orb guard as `hollow`: an orb stands for a group, not one
        // report's own cadence, and is never itself a continuous source.
        const soft = !orb && n.continuous === true
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
            emissiveColour: glowInk(colour),
            // Lens-aware for the same reason `colour` is: a hollow node's
            // ring is its whole body, and a mesh rebuilt mid-lens must be
            // born wearing the lens ink, not the family ink under it.
            rimColour:
              lensColourFor(n.country, lensRef.current) ?? inkFor(n.country),
            // **Rims exist only where there is no coloured fill to read.**
            // A hollow one-off instrument has an emptied fill; everything
            // else carries its family in the fill itself, at a flat
            // luminance, and the ring is redundant. An orb is deliberately
            // NOT in this list — it used to wear a wide bright band, and it
            // already has the breath (`ORB_PULSE_PERIOD_SECONDS`) saying the
            // same thing with motion instead of ink.
            drawRim: hollow,
            radius,
            emissive,
            lit,
            dimOpacity: DIM_NODE_OPACITY,
            dimEmissive: DIM_NODE_EMISSIVE,
            // How heavily to draw it, in the two cases where it is drawn at
            // all — see `RIM_WEIGHT`.
            rimWeight: rimWeightFor(n.country),
            hollow,
            orb,
            soft,
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
        // Marks this mesh for the milder continuous-node breath in
        // `useFrame` — see `CONTINUOUS_PULSE_FLOOR`. Same reasoning as
        // `mesh.userData.orb` just above: flat walk over `meshes`, no
        // string work in the per-frame loop.
        mesh.userData.soft = soft
        localMeshes.set(n.id, mesh)
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
      // The pulses. three-forcegraph itself builds one small mesh per photon
      // (confirmed in its source, 2026-08-12) and those meshes are still the
      // library's state — but since 2026-09-05 they are hidden every frame
      // and drawn by `photonInstancing.ts` as one InstancedMesh per
      // (geometry, material) pair (mirror, not replacement — see that
      // file's header). Measured by
      // Thomas the same day, with link instancing: median 33.4 → 25.0 ms.
      // The teardrop geometry and per-colour material caches in
      // linkVisuals.ts are what the instancer batches on.
      //
      // Suppressed entirely outside the focus, rather than dimmed. Motion is
      // the strongest signal on screen — a dim moving dot still pulls the eye
      // harder than a bright stationary one. (Implied edges never pulsed;
      // since 2026-08-12 there are none to suppress — every edge is
      // documented by validator rule.)
      // A continuous edge is 0 unconditionally, never `pulseCount` — it has
      // the beam instead (see LinkDatum.continuousSource), not the beam IN
      // ADDITION to pulses.
      .linkDirectionalParticles((l: object) => {
        const link = l as LinkDatum
        // A 'C'-grade lead never pulses, shown or not (plan §3) — the same
        // "no teardrops" treatment legal_basis edges get, for a different
        // reason (this is about confidence, that is about what a citation
        // of law even means). Both suppress independently of litLink/focus.
        if (link.continuousSource || link.legalBasis || link.grade === 'C') return 0
        return litLink(link) ? pulseCount(link.upstreamCadence) : 0
      })
      .linkDirectionalParticleSpeed((l: object) =>
        pulseSpeed((l as LinkDatum).upstreamCadence) * pulseRateRef.current,
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
    // simulation would run until `cooldownTime` regardless of whether it had
    // already settled. Setting a small positive floor lets `onEngineStop`
    // below fire as soon as the layout is actually still, on any graph size,
    // with `cooldownTime` remaining as the backstop for one that never quite
    // settles.
    fg.d3AlphaMin(0.005)

    // `cooldownTime` raised from the library's 15s default, 2026-08-21 —
    // Thomas: the flicker/inconsistent render is still happening, and this
    // time it reproduced live (in a browser tab this session drove directly),
    // cold-loaded, with no camera interaction at all: the SAME Global tier
    // (396 shown) came out fit-to-frame on some reloads and, on others, stuck
    // either far too close (spheres overlapping, filling the screen) or far
    // too far (a handful of pale dots on a mostly empty screen) — and stayed
    // that way; switching to Everything and back did not reliably fix it
    // either, it just produced a THIRD wrong distance in one live test.
    // Root cause traced to the interaction between the alpha-based stop
    // condition above and this wall-clock ceiling: `alpha()` decays by a
    // fixed fraction PER TICK, not per second, so how many ticks land inside
    // the settle window depends on real frame rate — and a cold load
    // (parsing the corpus, compiling 3,091 meshes, JIT warmup) is exactly
    // when frame rate is lowest. On a slow-enough frame rate, the old 15s
    // wall-clock cap could fire before enough ticks had run for `alpha()` to
    // actually reach `d3AlphaMin`, so `onEngineStop` — and the camera-fit
    // measurement `runFit` takes from it — locked in early, against a layout
    // still under repulsion and cluster forces (`galaxyForce`, `geoAffinity`
    // — both added well after this 15s default was ever tuned) that had not
    // finished moving. Raising the ceiling does not slow down a machine that
    // already converges well inside it — this only changes the runs that
    // were hitting the cap. Tracking's own window (`REFIT_WINDOW_SECONDS`
    // below) already extends past 12s whenever `settledOnce` hasn't fired
    // yet, so this cap is the one number that actually governs how long a
    // slow load gets before being forced to stop. Not yet re-measured under
    // real repeated cold-load reloads on Thomas's own machine — flagged for
    // him to confirm live, the same "does this actually fix it" check the
    // 2026-08-19 bloom-slider theory got and never passed.
    fg.cooldownTime(45000)

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
    // Bumped -300 -> -399 2026-08-26 (Thomas, HANDOFF item 5 — first tried
    // +10%/-330, Thomas asked for +33% instead): a bigger increase to the
    // one force that actually separates DIFFERENT clusters from each other
    // (galaxyForce only ever pulls a node toward its OWN cluster's
    // centroid — see the comment on `fg.d3Force('galaxy', ...)` below).
    // Still the existing force tuned up, not the larger mirrored-force
    // build Thomas didn't ask for this round.
    charge?.strength(-399 * m)
    // Without a cap, repulsion never falls off and linear chains get flung
    // out — but the cap has to grow with the layout or it recreates the pile.
    charge?.distanceMax(420 * m)

    // Force-centre (three-forcegraph's default, unmodified since the app's
    // first commit): `d3-force-3d`'s forceCenter does NOT pull individual
    // nodes toward the middle. Each tick it computes the mean position of
    // ALL nodes and rigidly translates EVERY node by (mean - target) *
    // strength — a uniform shift of the whole cloud as one rigid body, not
    // a per-node attraction. Traced 2026-08-26 (HANDOFF item 5 design
    // discussion) as a real, probably-minor contributor to "clusters pile
    // toward the centre" (`galaxyForce` and unbounded `charge` repulsion
    // are the bigger mechanical causes). Thomas's call: kill it outright.
    // Strength 0 makes the shift exactly zero every tick, i.e. a true
    // no-op — not "kill it" in gross approximation.
    //
    // A NEGATIVE strength here would NOT push clusters apart from each
    // other the way `charge` above does. Because the shift is referenced
    // to the cloud's own mean position, a negative value still moves every
    // node by the SAME vector each tick (just away from the target instead
    // of toward it) — the whole graph drifts as one block, and since a
    // bigger drift makes next tick's mean even further from the target,
    // it is an unstable runaway translation, not inter-cluster repulsion.
    // Don't reach for a negative number here for that effect; `charge`'s
    // `distanceMax`/`strength` above are the actual levers for that.
    const center = fg.d3Force('center') as unknown as
      | { strength(s: number): void }
      | undefined
    center?.strength(0)

    const linkForce = fg.d3Force('link') as unknown as
      | {
          distance(fn: (l: LinkDatum) => number): void
          strength(fn: (l: LinkDatum) => number): void
        }
      | undefined
    // ×2 on the REST LENGTH ONLY — the Phase-4 brief's "double the edge
    // lengths", pulled forward into Phase 3.5 (Thomas, 2026-08-19: "these
    // nodes are just too crowded... more of a constellation"). Deliberately
    // NOT applied to charge or collision: double every length and the layout's
    // scale-invariance (see the collision note below) hands back a
    // pixel-identical picture after the fit renormalises. Doubling just this
    // term changes the RATIO of chain length to cluster size, which is the
    // thing that actually draws chains out and gives pulses room. It is also
    // why node sizes "stay constant" whatever this number does — the fit
    // holds the largest node at a fixed fraction of the frame by design, so
    // spacing changes show up as room between stars, not as bigger stars.
    // Related: Cluster spread multiplies a force strength and two lengths by
    // one number, which is why it never delivered this on its own at 375%.
    const LINK_LENGTH_SCALE = 2
    linkForce?.distance(
      (l) => (40 + (1 - l.weight) * 28 + l.hubRoom) * m * LINK_LENGTH_SCALE,
    )
    // Stiffness, precomputed per link — see `LinkDatum.stiffness` for the
    // mechanism and the measurement. This is what stops the international
    // standards layer nailing every country it touches to the middle.
    linkForce?.strength((l) => l.stiffness)

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
        (node: unknown) => {
          const n = node as ScoredReport
          const orb = isOrbId(n.id) ? orbSizeFactor((n as OrbNode).members?.length ?? 1) : 1
          return radiusFor(n.size_score) * orb * 1.5 + 4 + 4 * m
        },
      )
        .strength(0.85)
        // Iterations 2 -> 1, 2026-09-05. `scripts/measure-forces.ts` at the
        // production force set, 3,363 nodes, spread 2, seeds 1-3: every
        // reported metric (onscreen, ratio, inter, intra, p95, wantedScale)
        // is identical to 3-4 significant figures at 1 and at 2, and node
        // positions move a median 1.6-2.3 units in a cloud whose p95 radius
        // is 7,000-9,700 (worst single node 175, ~1.8% of that radius). The
        // tick gets ~17% cheaper (123.9 -> 102.8 ms/tick, minimum of four
        // interleaved runs on the sandbox CPU), which is settle time: the
        // simulation runs one tick per rendered frame. Collide's second
        // iteration is a relaxation pass that this graph does not need
        // because the layout is decided by charge and the link springs, not
        // by contact resolution. Raise it back to 2 if nodes start visibly
        // overlapping after a spread or node-size change.
        .iterations(1) as unknown as never,
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

    // Galaxy clustering — off would mean 0 at strength 0, but the default is
    // 1 (on), unlike geoAffinity's original 0 default: Thomas asked for this
    // shape directly rather than discovering it as an option, so it opens
    // already doing its job. See `lib/galaxyForce.ts` for the model and the
    // note on why this does not repeat the "continent is not a relationship"
    // mistake geoAffinity was built to avoid.
    //
    // **Measured, not assumed, before shipping the 0–3 range**: a headless
    // run against the real corpus (Everything tier, nothing filtered),
    // comparing each country's own settled spread against the spread
    // between different countries' centroids. At 100% (the default):
    // countries sit **1.92×** further from each other than their own
    // members sit from their own centroid. At the 300% ceiling: **3.49×**
    // — clearly tighter, separation scales with the slider as it should,
    // and zero NaN positions at either setting (the force does not blow up
    // at the top of its range). Off (0%) settles fine too, just slower to
    // converge in a cold headless run — not a sign of anything wrong.
    fg.d3Force('galaxy', galaxyForce(galaxyStrength) as unknown as never)

    // Cluster vs cluster repulsion — the direct mirror of `galaxyForce`
    // above: that force only ever pulls a node toward its OWN
    // family/country centroid, nothing pushes DIFFERENT clusters apart.
    // "Option (c)" from the 2026-08-26 design discussion on "the clusters
    // cluster too much to the centre" (HANDOFF.md), built 2026-08-27 on
    // Thomas's call to try it. Defaults to 1 (on), same reasoning as
    // galaxy: asked for directly rather than discovered. See
    // `lib/clusterRepulsion.ts` for the model — cluster-pair, not
    // node-pair, so it is cheap enough to skip `charge`'s hard
    // `distanceMax` cutoff (the diagnosed reason two clusters that have
    // already drifted apart stop repelling each other at all) — and for
    // the measured before/after numbers behind the 0–3 range.
    fg.d3Force(
      'clusterRepulsion',
      clusterRepulsionForce(clusterRepulsionStrength) as unknown as never,
    )

    // The folded International orb is placed at the centroid of everything
    // else rather than sprung to it — see `lib/intAnchor.ts` for why neither
    // "springless" nor "springs back on" gave an honest tier-2 picture.
    fg.d3Force('intAnchor', intAnchorForce() as unknown as never)

    ;(fg as unknown as { __meshes?: Map<string, THREE.Mesh> }).__meshes = localMeshes
    return fg
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, spreadApplied])

  /**
   * Point the shared `meshes` ref at the mounted instance's own registry —
   * see the per-instance note at the top of the memo. Declared immediately
   * after the memo so it runs before every later effect that iterates
   * `meshes.current` in the same commit.
   */
  useEffect(() => {
    const own = (forceGraph as unknown as { __meshes?: Map<string, THREE.Mesh> }).__meshes
    if (own) meshes.current = own
  }, [forceGraph])

  /**
   * Dispose the SUPERSEDED `forceGraph` instance's GPU resources — see
   * `disposeForceGraphResources`'s own comment for the leak this closes.
   * An effect cleanup keyed on `[forceGraph]`, not a call inside the memo
   * itself: the cleanup captures exactly the instance THIS effect's commit
   * was for, and React runs it right before the next commit's effect (i.e.
   * exactly when `forceGraph` is about to be replaced) or on final unmount —
   * never on the instance that is about to become current.
   */
  useEffect(() => {
    return () => disposeForceGraphResources(forceGraph)
  }, [forceGraph])

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
    engineRunning.current = true
    settledOnce.current = false
    reheatAttempts.current = 0
    settleClock.current = 0
    sinceRefit.current = 0
    if (pendingLinkRescale.current) {
      clearTimeout(pendingLinkRescale.current)
      pendingLinkRescale.current = null
    }

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
      // Before the early return: the engine has stopped whether or not this
      // is the first convergence, and the tick burst must know either way.
      engineRunning.current = false
      if (settledOnce.current) return

      // `onEngineStop` fires whenever three-forcegraph's own tick loop
      // decides to stop — and "stop" is not only "alpha decayed, the layout
      // is at rest". Its cooldown also has a wall-clock ceiling
      // (`cooldownTime`, set below), checked against real elapsed time
      // regardless of how many ticks actually ran. On a slow cold load
      // (parsing the corpus, compiling thousands of meshes) or after the
      // tab was backgrounded for a while (rAF — and therefore every
      // `tickFrame()` call — stops dead while hidden, see the visibility
      // listener below), that ceiling can trip before this build ever drove
      // a single real external tick, freezing the layout at its near-origin
      // seed position and reporting "stopped" for a cloud that never got a
      // chance to unfold. Trusting that blindly is Finding 1 of
      // archive/notes/render-consistency-repro-2026-08-25.md: a captured
      // `nodeRadius: 67` (real settled clouds run to the thousands) at
      // `tick: 0`.
      //
      // If we haven't driven at least `MIN_TICKS_BEFORE_FIRST_PAINT` real
      // ticks ourselves, this is the ceiling talking, not convergence —
      // reheat instead of snapping the camera to a cloud that hasn't had a
      // chance to expand. `d3ReheatSimulation()` resets alpha to 1 and
      // restarts the library's own countdown, so the next real ticks get a
      // fresh, full run at actually converging.
      if (
        tickCount.current < MIN_TICKS_BEFORE_FIRST_PAINT &&
        reheatAttempts.current < MAX_PREMATURE_REHEATS
      ) {
        reheatAttempts.current += 1
        engineRunning.current = true
        forceGraph.d3ReheatSimulation()
        return
      }

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

  /**
   * Finding 2 of archive/notes/render-consistency-repro-2026-08-25.md: the entire
   * tick-loop-driven fit/tracking system runs on `useFrame`, i.e. on `rAF`,
   * and Chrome suspends `requestAnimationFrame` outright for a backgrounded
   * tab — confirmed live, zero ticks in 30+ seconds while
   * `document.visibilityState === "hidden"`. Tabbing away is an entirely
   * ordinary thing to do while a multi-thousand-node cloud spends up to
   * 10-30+ seconds settling, so coming back mid-settle with nothing having
   * tracked in the meantime is not an edge case.
   *
   * On return, ask for one fresh measurement — but only if the layout
   * hasn't already settled AND the user hasn't since taken the camera for
   * themselves. `requestRefit()` unconditionally hands the camera back to
   * tracking, and doing that to someone who deliberately framed a view,
   * then merely alt-tabbed and came back, would be a worse bug than the one
   * this fixes.
   */
  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState !== 'visible') return
      // Was gated on `!settledOnce` — but the premature-settle case (see
      // `lastFitRadius`) is exactly a settle that happened while hidden, so
      // the gate hid the one return that most needed a fresh measurement.
      // A refit on a genuinely settled, unchanged cloud is a no-op pose.
      if (!userOwnsCamera.current) requestRefit()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

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
   * Split out on 2026-08-19 so a caller can measure without moving the camera
   * — see `requestRefit`. It has to be a
   * genuine split rather than an early return inside `runFit`, because
   * `runFit` does not only move the camera: it also sets `nodeScale`, the link
   * and pulse widths derived from it, and the published bounds.
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
    let subject = framed.length ? framed : positioned

    // **Per-galaxy camera fit** (round 0, 2026-09-03, Q16 "b"). In a
    // single-country isolate, fit to that country's OWN cluster and let
    // whatever it connects to across the isolate — mostly the INT standards
    // it cites, flung outward by `clusterRepulsion` with `INT_LINK_STIFFNESS`
    // at 0 since 2026-08-31 — sit off-screen or at the frame's edge, rather
    // than pulling the whole fit box (and therefore the camera distance and
    // `nodeScale`) out to include them. This is what Thomas's Canada
    // screenshot was actually complaining about: the fit was framing the
    // full isolate, standards included, so Canada itself read small on the
    // right. Falls back to the ordinary whole-`subject` fit if the country
    // has nothing on screen — should not happen, since a group isolate's own
    // seed IS that country's reports, but a fit must never go empty.
    //
    // Deliberately does not touch the FORCES at all — position still encodes
    // only the edges, nothing here fakes where a node sits (Q16's own
    // rejection of option (c)). If standards still read as flying once this
    // is live, the next lever is `INT_LINK_STIFFNESS` 0 -> 0.15 (option (a),
    // `intAnchor.ts`), a physics change deliberately deferred pending seeing
    // this fit first.
    if (isolatedCountry) {
      const ownCountry = subject.filter((n) => n.country === isolatedCountry)
      if (ownCountry.length) subject = ownCountry
    }

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
    // **Re-measured 2026-08-20** after the BRICS+/Israel/Singapore Grok archive
    // mint (1 250 → 3 091 reports): 1 806 framed nodes at Everything tier
    // (up from 958), furthest node 4 318, p95 3 134, ratio of the two 1.38× —
    // comfortably inside the 5.675× that would put the camera inside the
    // cluster (see the fit-distance derivation below), and actually a better
    // margin than pre-mint despite nearly double the framed nodes. The
    // dominant-family concentration the mint caused (see `palette.ts`'s v4
    // re-damp note) is a colour problem, not a geometry one — it does not
    // touch this ratio.
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

    // 0.95 → 0.8, decided 2026-09-01 (audit F-11; Thomas, after seeing both
    // live at Everything tier fully unfolded: "that is better imo"). What
    // the change buys and costs, measured: the fit radius drops to the live
    // p80 (3,068 vs a p95 of 4,051 on the run it was judged on), the
    // galaxies take roughly a quarter more of the frame, and the price is
    // an occasional straggler cluster nicked by the top/bottom frame edge
    // at fit zoom — ~35 of 154 country centroids sit outside the VERTICAL
    // frame in the harness probe, though the ~1.78× wider horizontal field
    // keeps ~99% of connected nodes on a 16:9 window. The p95 rationale
    // below (two-estimator agreement) described the old value; it is kept
    // because the measurement method is the part worth rereading.
    //
    // **Since 2026-09-06 the percentile falls as `spread` rises**
    // (Thomas: "I wonder if we should decrease the p95 as we increase the
    // cluster spread? it would enhance the effect").
    //
    // Why it works, and why it is the RIGHT lever rather than just zooming:
    // both the camera distance and `nodeScaleFor` read this same
    // `nodeRadius`, and both are proportional to it — so apparent node size
    // (`radiusFor × nodeScale / distance`) is invariant under a change of
    // percentile, while apparent SEPARATION is not. Lowering the percentile
    // therefore buys air between nodes at constant node size, which is
    // exactly what the spread slider is asking for. `view.zoom` cannot do
    // that: it moves the camera without touching `nodeScale`, so it
    // magnifies the blobs along with the gaps.
    //
    // Why it is needed at all: raising `spread` is close to a uniform
    // rescale of the layout, and a fit that renormalises by a percentile of
    // that same layout undoes it. Measured over 2 seeds at 3,363 nodes
    // (`scripts/measure-forces.ts`, SPREAD 0.5 → 12): `ratio` (inter-cluster
    // distance over intra-cluster spread) climbs 18.0 → 36.0, so the slider
    // is doing real work — but `onscreen` (inter / p95) FALLS 0.777 → 0.717,
    // and intra-cluster spread as a share of the framed radius halves
    // (0.043 → 0.020). On screen the clusters tighten into smaller knots
    // instead of the graph opening out. This curve spends some of that
    // tightening on magnification instead.
    //
    // The cost, measured with the fit's own arithmetic on live positions at
    // 1280×800 (`scripts/renderer/fit-probe.mjs`) — share of rendered nodes
    // falling outside the frame:
    //
    //            Everything, all unfolded      Nations
    //   P        spread 1     spread 12        spread 1   spread 12
    //   0.80        0.3%          0.1%            0%         0.7%
    //   0.60        1.3%          0.4%          1.3%         1.7%
    //   0.50        2.2%          0.8%          5.7%         3.0%
    //   0.40        3.5%          1.7%         11.4%         4.3%
    //   0.30        6.3%          4.0%         23.7%        11.4%
    //
    // So the floor is 0.4 and it is only reached at the top of the slider,
    // where the cloud is flattest and the cost is smallest. `spread` ≤ 1
    // keeps 0.8 exactly, so the default framing Thomas signed off on
    // 2026-09-01 is untouched; the whole curve is a no-op until the slider
    // is moved above 100%. What it buys at the top: the camera comes in 22%
    // at spread 12 (38,297 → 29,810 units at Everything), i.e. ~28% more
    // apparent separation at unchanged apparent node size. That is the
    // honest size of the effect — a fifth to a quarter, not a doubling.
    //
    // **What it costs conceptually**: the fit stops meaning "the frame
    // always contains the graph" and starts meaning "the frame contains the
    // core, and how much core depends on the spread slider". Two screenshots
    // at different spreads are no longer framed by the same rule. If that
    // turns out to matter more than the effect, delete `fitPercentileFor`
    // and put 0.8 back — nothing else reads it.
    const CORE_PERCENTILE = fitPercentileFor(spreadApplied)

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
   * width, `fitState` and `onBounds` are all still brought up to date; only
   * the `camera.position` / `orbit.target` writes are skipped.
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
      lastFitRadius.current = nodeRadius
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
    // See `fitSync.userOwnsCamera`'s own doc comment: `moveCamera` at every
    // call site already IS `!userOwnsCamera.current` (or a forced fit, which
    // means "no, tracking has the camera again"), so this is just publishing
    // that same fact CameraZoom cannot otherwise see.
    fitSync.userOwnsCamera = !moveCamera

    // Now that the cloud has been measured, the nodes can be sized against it.
    // This is why the scale is applied here and not in `nodeThreeObject`: the
    // meshes are built before the layout has settled, so at construction time
    // there is nothing yet to be a fraction of.
    nodeScale.current = nodeScaleFor(nodeRadius)
    for (const m of meshes.current.values()) m.scale.setScalar(nodeScale.current)

    // Lines and pulses follow the same scale — but only when it has actually
    // moved AND enough real time has passed. Re-assigning `linkWidth` makes
    // three-forcegraph re-digest every line, and this function runs on a
    // timer (`REFIT_INTERVAL_SECONDS`, up to 5×/s) for up to
    // `REFIT_WINDOW_SECONDS` after every rebuild — an unguarded re-assign
    // would rebuild 1 079+ lines that often to write a number they already
    // had. 1% is well below anything visible at these widths and well above
    // float noise.
    //
    // **The 1% drift guard alone does not fix renderer bug 3 (audit
    // 2026-09-02, HANDOFF).** It was already here and the bug still shipped:
    // during a real settle — a large family unfolding, `nodeScaleFor`'s own
    // comment measures a cloud radius climbing 240,508 in one pass — `nodeScale`
    // can easily drift more than 1% every single 200ms tick, so the percent
    // guard was true (and the expensive rebuild fired) up to 5×/s exactly in
    // the highest-load moment: right as thousands of meshes are still being
    // compiled. A uniform-based fix (scale in the shader, never touch
    // `linkWidth`) is the real cure, but `GradientLinkMaterial` has no width
    // uniform — width is baked into the geometry three-forcegraph itself
    // builds from the `linkWidth` accessor, not something a shader term can
    // scale — so that fix waits for the link-batching round (merged
    // geometry, `notes/Midvamp - Revamp.md` §7/§9 item 6) rather than being
    // improvised here. For round 0: add a real-time floor alongside the
    // percentage, so a fast-drifting settle rebuilds at most a few times a
    // second instead of up to five, without changing what a settled,
    // slow-drifting graph does (the 1% check still gates those).
    const scaleDrifted =
      Math.abs(nodeScale.current - appliedLinkScale.current) > appliedLinkScale.current * 0.01
    const now = performance.now()
    const dueForRescale =
      scaleDrifted && now - lastLinkRescaleAt.current >= LINK_RESCALE_MIN_INTERVAL_MS
    if (dueForRescale) {
      lastLinkRescaleAt.current = now
      appliedLinkScale.current = nodeScale.current
      LINK_SCALE_APPLIERS.get(fg)?.(nodeScale.current)
      if (pendingLinkRescale.current) {
        clearTimeout(pendingLinkRescale.current)
        pendingLinkRescale.current = null
      }
    } else if (scaleDrifted && !pendingLinkRescale.current) {
      // Refused by the rate limiter — see `pendingLinkRescale`. Apply what
      // `nodeScale` says WHEN the timer fires (not the value captured now):
      // the cloud may still be moving, and the spheres already carry the
      // latest scale.
      const wait = Math.max(0, LINK_RESCALE_MIN_INTERVAL_MS - (now - lastLinkRescaleAt.current))
      pendingLinkRescale.current = setTimeout(() => {
        pendingLinkRescale.current = null
        const live = ref.current
        if (!live) return
        const drifted =
          Math.abs(nodeScale.current - appliedLinkScale.current) > appliedLinkScale.current * 0.01
        if (!drifted) return
        lastLinkRescaleAt.current = performance.now()
        appliedLinkScale.current = nodeScale.current
        LINK_SCALE_APPLIERS.get(live)?.(nodeScale.current)
      }, wait + 1)
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

    // **Unconditional again, as of 2026-08-19 — the conditional version read
    // as a glitch.** This function has now been written three ways, and the
    // history is the argument:
    //
    // 1. Always refit — fixed the black screen (329 of 728 shown, survivors
    //    knotted in one corner), because the refit is the only thing that
    //    answers "where did everything go".
    // 2. Refit only when the survivors weren't "usably framed" (a
    //    centre-in-view + 30%–140% subtense test), built for Thomas's "stop
    //    moving the camera when I change a filter".
    // 3. This: always refit again — Thomas, watching version 2 live: "some
    //    [times] the camera stays put, other times it goes to the reset
    //    distance", filed as a GLITCH. The heuristic was doing exactly what
    //    it was told and the result was unpredictable from the outside, which
    //    is worse than either consistent behaviour. A filter change is an
    //    explicit request for a different view; it now always gets one, the
    //    same way a tier button does.
    //
    // If the constant reframing grates while composing a multi-country
    // filter, the fix is to make the move a FLIGHT (advanceFlight already
    // exists for search) rather than to bring the heuristic back.
    userOwnsCamera.current = false
    fitPose.current = null
    settleClock.current = 0
    sinceRefit.current = 0
    runFit(true)
  }

  // `framedUsably` — the "is what survived already framed well enough?"
  // heuristic — lived here from 2026-08-19 morning to 2026-08-19 evening.
  // Deleted with the conditional-refit experiment it served (see the history
  // in `requestRefit`); the code is in git and in
  // `Previous Handoffs/HANDOFF-2026-08-18c-*` §8 if the idea ever returns.

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
    engineRunning.current = true
    forceGraph.d3ReheatSimulation()
  }, [view.geoAffinity, forceGraph])

  /**
   * ...and then re-frame what the reheat rearranged (2026-08-20).
   *
   * The reheat above lets the layout walk to its new rest position. Nothing
   * re-ran the fit afterwards, so `nodeScale`, the link widths and the camera
   * distance all stayed tuned to the cloud as it was BEFORE the slider moved.
   * That is not a cosmetic lag: geo-affinity changes the core radius by nearly
   * a factor of five between 0% and 150% on this corpus, and node size is
   * derived from that radius — so turning the pull off left every node and
   * every edge sized for a cloud a fifth the size of the one now on screen.
   * Found while reproducing Thomas's "nearly invisible" report; it is the
   * second half of that bug, the first being the `nodeScaleFor` cap.
   *
   * Debounced on the same 300ms as `spreadApplied`, and for the same reason:
   * a range input fires on every pixel of a drag, and refitting per pixel
   * would be a strobe. One refit after the drag stops.
   *
   * `requestRefit` rather than `runFit` so this behaves exactly like a filter
   * or tier change — it hands the camera back and re-opens the settling
   * window, which matters here because the layout is still moving when the
   * refit lands and a single static fit would frame a cloud mid-expansion.
   */
  useEffect(() => {
    if (!fitted.current) return
    const t = setTimeout(() => requestRefit(), 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.geoAffinity])

  /**
   * Reheat when galaxy pull changes — same bug, same fix, as the
   * geo-affinity reheat pair just above. `galaxyStrength` (the ref
   * `galaxyForce` actually reads) is already current the instant the slider
   * moves; what silenced it was three-forcegraph's alpha having decayed to
   * ~0 by the time anyone touches ANY slider post-fit, and `galaxyForce`'s
   * force, like every d3 force here, is scaled by alpha. Without this,
   * dragging "Galaxy pull" did nothing until the next full rebuild (a tier
   * or filter change) happened to reheat the sim as a side effect — which
   * is exactly the "the galaxy pull doesn't appear to have an effect" report
   * (2026-08-20). This was simply never wired when `view.galaxy` shipped;
   * `geoAffinity`'s reheat was already there to copy.
   */
  useEffect(() => {
    engineRunning.current = true
    forceGraph.d3ReheatSimulation()
  }, [view.galaxy, forceGraph])

  /**
   * ...and re-frame what the reheat rearranged, same reasoning as
   * geo-affinity's refit pair above: nothing re-runs the fit after a reheat,
   * so camera distance and node scale stay tuned to the cloud as it was
   * before the slider moved. Same 300ms debounce, same `requestRefit` (not
   * `runFit`) so this behaves like any other filter/tier change.
   */
  useEffect(() => {
    if (!fitted.current) return
    const t = setTimeout(() => requestRefit(), 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.galaxy])

  /**
   * Reheat when cluster repulsion changes — the SAME bug as the geo-affinity
   * and galaxy pairs above, shipped a third time (2026-08-28).
   *
   * `clusterRepulsionStrength` (the ref `clusterRepulsionForce` reads) is
   * already current the instant the slider moves, and the force is registered
   * on the simulation — but every d3 force here is scaled by alpha, and
   * three-forcegraph's alpha has decayed to ~0 by the time anyone touches a
   * slider post-fit. So the force was computing a correct push every tick and
   * multiplying it by nothing.
   *
   * Thomas, 2026-08-28: *"can you check out the cluster repulsion? I don't see
   * any effect from it."* That is verbatim the `view.galaxy` report from
   * 2026-08-20 ("the galaxy pull doesn't appear to have an effect"), whose fix
   * is the effect directly above this one — and whose comment already said the
   * omission was simply never wired when the slider shipped. It was not wired
   * for `view.clusterRepulsion` either.
   *
   * **This is now a three-time pattern, so state the rule rather than the
   * instance: a new force that reads its strength from a ref needs BOTH of
   * these effects, or it is inert after the first settle.** The ref keeps the
   * slider from triggering a rebuild; the reheat is what makes the slider do
   * anything at all. `PLAYBOOK.md` carries this as a standing rule now.
   */
  useEffect(() => {
    engineRunning.current = true
    forceGraph.d3ReheatSimulation()
  }, [view.clusterRepulsion, forceGraph])

  /**
   * ...and re-frame what the reheat rearranged, same reasoning and same
   * 300ms debounce as the two refit effects above. This one matters more than
   * most: cluster repulsion changes the separation between cluster centroids,
   * which is precisely the quantity `runFit`'s percentile core radius measures
   * — so without a refit the camera stays framed for the cloud as it was
   * before the slider moved, and a force that HAS separated the clusters can
   * still look like it did nothing.
   */
  useEffect(() => {
    if (!fitted.current) return
    const t = setTimeout(() => requestRefit(), 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.clusterRepulsion])

  // The scene-background effect (opaque paper vs transparent-over-CSS) went
  // with blueprint, 2026-08-19 — the dark theme's compositing was always the
  // transparent framebuffer over the page's CSS colour, and now that is the
  // only path.


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
      // the glow channel means. (BRICS yellow and INT white still bloom
      // harder than the rest under GROUP_COMPARISON — that is their fill
      // luminance, accepted in the review, not this channel.)
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
  }, [levelColours, view.lens, forceGraph])

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
    const dimOpacity = DIM_NODE_OPACITY
    const dimRim = undefined

    for (const [id, mesh] of meshes.current) {
      const material = mesh.material as NodeMaterial
      const lit = !focus || focus.nodes.has(id)

      setNodeRim(material, lit, dimRim)
      // `litOpacity` rather than 1 — a hollow node stays hollow when traced.
      const litOpacity = material.userData.litOpacity ?? 1
      material.opacity = lit ? litOpacity : Math.min(dimOpacity, litOpacity)
      // An ordinary solid node is opaque while lit and only needs the
      // sorted transparent pass while dimmed — see `alwaysTransparent` in
      // nodeVisuals.ts for why toggling this here is safe (measured: no
      // recompile). Hollow/soft materials are born `alwaysTransparent` and
      // this is a no-op for them.
      material.transparent = (material.userData.alwaysTransparent ?? true) || !lit
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

    forceGraph.linkDirectionalParticles((l: object) => {
      const link = l as LinkDatum
      return view.showPulses &&
        !link.continuousSource &&
        litLink(link) &&
        // A tether's direction cue is its beam — never teardrops. See
        // INT_TETHER_BEAM_LIFT.
        !link.intTether &&
        // See the initial registration above (fg construction) for why
        // legal_basis and grade 'C' also suppress pulses outright.
        !link.legalBasis &&
        link.grade !== 'C'
        ? pulseCount(link.upstreamCadence)
        : 0
    })
    // The beam is a continuous edge's ONLY direction cue (see
    // LinkDatum.continuousSource) — it obeys the same Pulses toggle the
    // teardrops do, rather than always drawing regardless of that setting.
    // Also where the beam's animation is switched on in the first place:
    // `gradientLinkMaterial` always constructs with `uFlow` off (see its own
    // comment) so this effect, which fires on mount, is what turns it on.
    for (const l of linkDataRef.current) {
      if (!l.continuousSource && !l.intTether) continue
      const material = linkMaterials.current.get(l.key)
      if (material) setLinkFlow(material, view.showPulses)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceGraph, focus, view.showPulses])

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
    let extraTicks = 0
    try {
      const t0 = performance.now()
      ref.current?.tickFrame()
      // The burst — see TICK_BURST_MAX. Budget is cumulative over the frame,
      // measured, never assumed: a tier flip can take a tick from 2 ms to
      // 100 ms between one frame and the next.
      while (
        engineRunning.current &&
        extraTicks < TICK_BURST_MAX - 1 &&
        performance.now() - t0 < TICK_BURST_MAX_MS
      ) {
        ref.current?.tickFrame()
        extraTicks += 1
      }
    } catch {
      return
    }
    // The library has just moved every photon; mirror them onto the
    // instanced batches before the renderer sees this frame — see
    // photonInstancing.ts for why this is a mirror and not a replacement.
    if (ref.current) {
      photonInstancer.current.sync(ref.current)
      linkInstancer.current.sync(ref.current)
    }
    // Nodes are mirrored at the END of this callback, after the breath, the
    // hover grow and any re-applied focus have written this frame's state.

    // Record positions for the next drilldown rebuild — see `lastPositions`.
    const currentNodes = (ref.current?.graphData().nodes ?? []) as PositionedNode[]
    for (const n of currentNodes) {
      if (Number.isFinite(n.x)) lastPositions.current.set(n.id, { x: n.x, y: n.y, z: n.z })
    }

    tickCount.current += 1 + extraTicks
    // See `MAX_FRAME_DELTA_SECONDS` — a raw `delta` after a backgrounded-tab
    // gap would otherwise end tracking on the very frame it resumes.
    const trackingDelta = Math.min(delta, MAX_FRAME_DELTA_SECONDS)
    settleClock.current += trackingDelta
    sinceRefit.current += trackingDelta
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
    } else if (settledOnce.current && !userOwnsCamera.current) {
      // Drift watchdog — see `lastFitRadius`. Cheap: one percentile pass
      // every couple of seconds, and only while tracking still owns the
      // camera.
      driftClock.current += trackingDelta
      if (driftClock.current >= DRIFT_CHECK_SECONDS) {
        driftClock.current = 0
        const m = measureFit()
        const fittedTo = lastFitRadius.current
        if (m && fittedTo > 0) {
          const ratio = m.nodeRadius / fittedTo
          if (ratio > DRIFT_RATIO || ratio < 1 / DRIFT_RATIO) runFit(true)
        }
      }
    }
    /**
     * Tell App the graph is worth looking at (2026-08-20, Thomas: *"can we
     * have a basic loading screen so the graph has time to settle and come to
     * rest before being visible?"*).
     *
     * The two conditions are the two different things "ready" means here, and
     * one without the other is a lie:
     *  - `settledOnce` — the simulation has actually stopped moving. Set by
     *    `onEngineStop`, which three-forcegraph fires on alpha decay or at its
     *    own 15s cooldown ceiling, so it cannot hang forever.
     *  - `fitted` — a fit has run, so the camera is pointed at the result
     *    rather than at wherever it started.
     *
     * Fired ONCE, on first load only. A tier or spread change rebuilds the
     * graph and resets `settledOnce`, but throwing a full-screen curtain over
     * every tier click would be far worse than watching a graph you can
     * already see rearrange itself. The wait is only unbearable when there is
     * nothing on screen yet.
     */
    if (!readyReported.current && fitted.current && settledOnce.current) {
      readyReported.current = true
      onReady?.()
    }

    advanceFlight(delta)

    // The orb breath — see `ORB_PULSE_PERIOD_SECONDS`. Driven off wall-clock
    // `delta`, not the tick count, for the same reason the re-fit window is:
    // a tick is not a fixed amount of real time, so a tick-driven pulse would
    // breathe at a different rate on every machine and would visibly slow down
    // exactly when the scene gets heavy.
    // `pulseRateRef` — see `view.pulseRate` — scales this clock directly, so
    // it, `tickPulseBlink` and `tickLinkFlow` (all three driven off it) speed
    // up, slow down, or freeze (0) together with the particle speed above.
    pulseClock.current += delta * pulseRateRef.current
    // The cross-border pulse blink — one call animates every registered blink
    // material; a no-op when the current graph has no cross-border edges.
    tickPulseBlink(pulseClock.current)
    // The beam flow — same free-running clock, same shape, a no-op when
    // nothing on screen is continuous.
    tickLinkFlow(pulseClock.current)
    linkInstancer.current.tickFlow(pulseClock.current)
    const breath =
      0.5 - 0.5 * Math.cos((2 * Math.PI * pulseClock.current) / ORB_PULSE_PERIOD_SECONDS)
    for (const [id, mesh] of meshes.current) {
      if (mesh.userData.orb) {
        const material = mesh.material as NodeMaterial
        material.emissiveIntensity =
          focusEmissive(id, mesh, focusRef.current) *
          (ORB_PULSE_FLOOR + (1 - ORB_PULSE_FLOOR) * breath)
        mesh.scale.setScalar(nodeScale.current * (1 + ORB_PULSE_SCALE * breath))
      } else if (mesh.userData.soft) {
        // See `CONTINUOUS_PULSE_FLOOR` — same breath curve, milder floor,
        // emissive only. No `mesh.scale` write: authority/size stays exactly
        // what `nodeScale` already says, every frame.
        const material = mesh.material as NodeMaterial
        material.emissiveIntensity =
          focusEmissive(id, mesh, focusRef.current) *
          (CONTINUOUS_PULSE_FLOOR + (1 - CONTINUOUS_PULSE_FLOOR) * breath)
      }
    }

    // The hover feedback — grow, lift, glow (see the HOVER_* constants).
    // Orbs are excluded from the grow/lift: the breath already owns their
    // scale and emissive every frame, and two writers on one channel is how
    // values snap. Restoration on un-hover is explicit (scale back to
    // nodeScale, emissive back to what the focus pass would set) rather than
    // left to the next applyFocus, which may be many frames away.
    {
      const anim = hoverAnim.current
      const targetId = hoveredIdRef.current
      if (anim.id !== targetId) {
        if (anim.id) {
          const prev = meshes.current.get(anim.id)
          if (prev && !prev.userData.orb) {
            prev.scale.setScalar(nodeScale.current)
            const mat = prev.material as NodeMaterial
            mat.emissiveIntensity = focusEmissive(anim.id, prev, focusRef.current)
          }
        }
        anim.id = targetId
        anim.t = 0
      }
      if (anim.id) {
        const mesh = meshes.current.get(anim.id)
        if (mesh && !mesh.userData.orb) {
          anim.t = Math.min(1, anim.t + delta / HOVER_EASE_SECONDS)
          const s = anim.t * anim.t * (3 - 2 * anim.t)
          mesh.scale.setScalar(nodeScale.current * (1 + HOVER_GROW * s))
          const mat = mesh.material as NodeMaterial
          // Capped where the selection lift caps — past ~0.95 bloom clips to
          // white and the node stops reading as its true size.
          mat.emissiveIntensity = Math.min(
            0.95,
            focusEmissive(anim.id, mesh, focusRef.current) + HOVER_EMISSIVE_LIFT * s,
          )
        }
      }
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

    // The hover glow — the smaller halo, faded and scaled in with the same
    // ease as the grow, and suppressed on the selected node (the selection
    // halo is already there; two rings on one node reads as an error).
    // Position from `positionedById`, never `meshes.current` — the (0,0,0)
    // trap documented on the selection halo above applies here identically.
    const hoverId = hoverAnim.current.id
    const hoveredNode =
      hoverId && hoverId !== selectedId ? positionedById.current.get(hoverId) : undefined
    if (hoveredNode && Number.isFinite(hoveredNode.x) && shownNode(hoveredNode.id)) {
      const t = hoverAnim.current.t
      const s = t * t * (3 - 2 * t)
      const mesh = meshes.current.get(hoveredNode.id)
      const material = mesh?.material as NodeMaterial | undefined
      setHaloTheme(
        hoverHalo,
        material ? `#${material.color.getHexString()}` : colourForReport(hoveredNode),
      )
      ;(hoverHalo.material as THREE.SpriteMaterial).opacity = HOVER_HALO_OPACITY * s
      haloWorldPosition.current.set(hoveredNode.x, hoveredNode.y, hoveredNode.z)
      placeSelectionHalo(
        hoverHalo,
        haloWorldPosition.current,
        camera.position,
        (FOV * Math.PI) / 360,
        size.height,
        HOVER_HALO_PIXELS * Math.max(0.001, s),
      )
      hoverHalo.visible = true
    } else {
      hoverHalo.visible = false
    }

    // Standing labels — placed from `positionedById` for the same (0,0,0)
    // reason as the halos, held at LABEL_PIXELS tall, dimmed with their node
    // when a trace excludes it.
    // Two labels on top of each other read as neither, and the EU
    // standards sit in one tight knot — so higher-priority names win and
    // the loser hides until the view separates them. Greedy over a dozen
    // rectangles; nothing here scales with the corpus.
    const placed: { x: number; y: number; w: number; h: number }[] = []
    for (const [id, sprite] of [...labelSprites].sort(
      (a, b) => (b[1].userData.priority as number) - (a[1].userData.priority as number),
    )) {
      const node = positionedById.current.get(id)
      if (!node || !Number.isFinite(node.x) || !shownNode(id)) {
        sprite.visible = false
        continue
      }
      haloWorldPosition.current.set(node.x, node.y, node.z)
      labelScreen.current.copy(haloWorldPosition.current).project(camera)
      if (labelScreen.current.z > 1) {
        sprite.visible = false
        continue
      }
      const w = LABEL_PIXELS * ((sprite.userData.aspect as number) || 4)
      const rect = {
        x: ((labelScreen.current.x + 1) / 2) * size.width,
        y: ((1 - labelScreen.current.y) / 2) * size.height - LABEL_PIXELS * 1.25,
        w,
        h: LABEL_PIXELS,
      }
      const collides = placed.some(
        (p) => Math.abs(p.x - rect.x) < (p.w + rect.w) / 2 && Math.abs(p.y - rect.y) < (p.h + rect.h),
      )
      if (collides) {
        sprite.visible = false
        continue
      }
      placed.push(rect)
      const lit = !focusRef.current || focusRef.current.nodes.has(id)
      ;(sprite.material as THREE.SpriteMaterial).opacity = lit ? 1 : LABEL_DIM_OPACITY
      placeLabel(
        sprite,
        haloWorldPosition.current,
        camera.position,
        (FOV * Math.PI) / 360,
        size.height,
        LABEL_PIXELS,
      )
      sprite.visible = true
    }

    // Node meshes are created lazily by the library, and can be recreated
    // without warning. A size change means the set we last styled is not the
    // set now on screen, so the focus has to be laid on again.
    if (meshes.current.size !== appliedMeshCount.current) applyFocus()

    // Mirror the spheres onto the instanced batches LAST, once every writer
    // in this callback (breath, hover, and the re-applied focus just above)
    // has had its say — see nodeInstancing.ts for why this is a mirror and
    // not a replacement.
    if (ref.current) nodeInstancer.current.sync(ref.current)
  })

  /**
   * The screen-space edge picker — the tolerance that makes a 1.6px line a
   * real target. Projects every VISIBLE link's endpoints (layout data,
   * never the mesh map) into canvas pixels and returns the nearest line
   * within `tolerancePx`. O(links) per call — ~1,100 projections,
   * microseconds — cheap enough to run on every pointermove (see
   * handlePointerMove), not only the missed clicks it was built for
   * (registerEdgePicker below).
   */
  function nearestLinkAt(
    clientX: number,
    clientY: number,
    tolerancePx: number,
  ): string | null {
    const rect = gl.domElement.getBoundingClientRect()
    const px = clientX - rect.left
    const py = clientY - rect.top
    const v = linkProjectScratch.current
    // `LinkDatum.source`/`.target` are declared `string`, which is what
    // three-forcegraph is HANDED — but d3-force-3d's own link force resolves
    // and replaces them with the actual node object, in place, on this same
    // array, once the simulation has run a tick. By the time this function
    // is called (pointermove, well after layout has started), `l.source` is
    // already an object, not a string, and `positionedById.get(l.source)`
    // was silently missing every time — a Map keyed by string id never
    // matches an object reference. Key on whichever shape it actually is.
    const project = (endpoint: string | { id: string }): { x: number; y: number } | null => {
      const id = typeof endpoint === 'string' ? endpoint : endpoint.id
      const n = positionedById.current.get(id)
      if (!n || !Number.isFinite(n.x)) return null
      v.set(n.x, n.y, n.z).project(camera)
      // Behind the camera or past the far plane — not a clickable pixel.
      if (v.z < -1 || v.z > 1) return null
      return { x: ((v.x + 1) / 2) * rect.width, y: ((1 - v.y) / 2) * rect.height }
    }
    let best: string | null = null
    let bestDistance = tolerancePx
    for (const l of linkDataRef.current) {
      if (!shownLink(l)) continue
      const a = project(l.source)
      const b = project(l.target)
      if (!a || !b) continue
      // Point-to-segment distance, 2D.
      const abx = b.x - a.x
      const aby = b.y - a.y
      const lengthSq = abx * abx + aby * aby
      const t = lengthSq
        ? Math.max(0, Math.min(1, ((px - a.x) * abx + (py - a.y) * aby) / lengthSq))
        : 0
      const dx = px - (a.x + t * abx)
      const dy = py - (a.y + t * aby)
      const distance = Math.hypot(dx, dy)
      if (distance < bestDistance) {
        bestDistance = distance
        best = l.key
      }
    }
    return best
  }

  /** Hand the picker up to App, for missed clicks. */
  useEffect(() => {
    registerEdgePicker((clientX, clientY) =>
      nearestLinkAt(clientX, clientY, EDGE_PICK_TOLERANCE_PX),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerEdgePicker, camera, gl])

  /** Walk up to whichever ancestor carries the report id. */
  function reportIdAt(object: THREE.Object3D): string | undefined {
    let obj: THREE.Object3D | null = object
    while (obj && !obj.userData?.reportId) obj = obj.parent
    return obj?.userData?.reportId as string | undefined
  }

  /**
   * Walk up to whichever ancestor carries a LINK datum, and return its key.
   *
   * three-forcegraph's digest stamps `__data` (the datum) on every object it
   * creates — the line cylinders, the arrow cones, AND the per-link photon
   * groups the travelling pulses live under. So a click on a fat teardrop
   * resolves to its edge exactly like a click on the line itself, which
   * matters: at 1.6px the line is a precision target, the pulse is not.
   * A LinkDatum is recognised by its `key`; node datums carry `id` and no
   * `key`, so the two walkers can never claim each other's objects.
   */
  function linkKeyAt(object: THREE.Object3D): string | undefined {
    let obj: THREE.Object3D | null = object
    while (obj) {
      const data = (obj as unknown as { __data?: { key?: unknown } }).__data
      if (data && typeof data.key === 'string') return data.key
      obj = obj.parent
    }
    return undefined
  }

  /**
   * Apply (or clear) the hover highlight on whichever edge was hovered last
   * frame, if it's different from the one hovered now — the same
   * old-then-new shape applyFocus already uses for nodes, so a link never
   * gets stuck lit after the pointer has moved off it.
   */
  function setHoveredLink(key: string | null) {
    if (key === hoveredLinkKeyRef.current) return
    if (hoveredLinkKeyRef.current) {
      const prev = linkMaterials.current.get(hoveredLinkKeyRef.current)
      if (prev) setLinkHover(prev, false)
    }
    if (key) {
      const next = linkMaterials.current.get(key)
      if (next) setLinkHover(next, true)
    }
    hoveredLinkKeyRef.current = key
  }

  function handlePointerMove(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation()
    const id = reportIdAt(e.object)
    hoveredIdRef.current = id ?? null
    onHover(id ? (graph.byId.get(id) ?? null) : null)

    // A node under the pointer wins outright — never highlight an edge
    // that happens to pass behind the sphere you're actually pointing at.
    // Otherwise: a raycast hit resolves fat targets (pulses, arrowheads,
    // the trunk itself) exactly like a click does (see linkKeyAt); a miss
    // falls through to the same screen-space tolerance scan that rescues
    // missed clicks on a 1.6px line, because a hover cue on a line this
    // thin needs the same rescue a click does, not a stricter one.
    const linkKey = id
      ? null
      : (linkKeyAt(e.object) ?? nearestLinkAt(e.clientX, e.clientY, EDGE_PICK_TOLERANCE_PX))
    setHoveredLink(linkKey)
    gl.domElement.style.cursor = id || linkKey ? 'pointer' : 'auto'
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
    if (id) {
      onSelect(focus?.selectedId === id ? null : id)
      return
    }
    // Not a node — an edge, then, if anything. Lines, arrowheads and pulses
    // all resolve here (see linkKeyAt), and App owns the toggle semantics
    // the same way it owns the node selection's.
    const linkKey = linkKeyAt(e.object)
    if (linkKey) onSelectEdge(linkKey)
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
      <primitive object={hoverHalo} />
      {[...labelSprites].map(([id, sprite]) => (
        <primitive key={id} object={sprite} />
      ))}
      <primitive
        object={forceGraph}
        onPointerMove={handlePointerMove}
        onPointerOut={() => {
          hoveredIdRef.current = null
          onHover(null)
          setHoveredLink(null)
          gl.domElement.style.cursor = 'auto'
        }}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      />
    </>
  )
}
