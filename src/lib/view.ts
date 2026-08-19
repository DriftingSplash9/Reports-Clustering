import type { LensMode } from './modes'

/**
 * Everything the viewer can turn on and off.
 *
 * Kept as plain data in one place so the controls panel and the scene never
 * disagree about what is showing, and so adding a toggle is a one-line change
 * in three known spots rather than a hunt through the render tree.
 */
export interface ViewSettings {
  /** Travelling pulses along the edges. */
  showPulses: boolean
  /** The edges themselves. */
  showEdges: boolean
  /** Sky gradient on the horizon. */
  showHorizon: boolean
  /**
   * Blueprint mode — the light theme, and deliberately not an inversion.
   * Paper background, every node a pale disc, and the whole picture drawn in
   * each family's dark ink: rims, edges and pulses alike, like a technical
   * drawing. No glow (bloom dies on white anyway) and no haze. Same layout,
   * same physics — toggling rebuilds materials, and position continuity is
   * carried by the same `lastPositions` seeding a drilldown uses, so the
   * graph does not re-scatter when the lights come on.
   */
  blueprint: boolean
  /**
   * Distance haze, 0 to 1.
   *
   * A slider rather than a switch because the right answer was never "on" or
   * "off". Fog was originally disabled on the grounds that it fights the 24°
   * lens — correct at 33 nodes, where nothing occluded anything. At 121 the
   * lens suppresses parallax by design and fog is the only depth cue left, so
   * the question became how much, and a boolean could not express it.
   */
  fog: number
  /**
   * Glow strength, 0 to 1.
   *
   * Also a slider, and also because the boolean was hiding the real problem:
   * the bloom threshold sat above the brightest node in the graph, so the
   * switch had never done anything at all. Glow now tracks authority — only the
   * most depended-upon reports bleed light — which makes it a second reading of
   * the same encoding rather than a uniform halo competing with it.
   */
  glow: number
  /** Slow automatic orbit. */
  autoRotate: boolean
  /**
   * With a node selected, keep everything it rests on lit.
   * Both focus toggles off leaves the selected node alone in the light, which
   * is a legitimate way to find one report in a crowd.
   */
  focusBuiltFrom: boolean
  /** With a node selected, keep everything built on it lit. */
  focusFeedsInto: boolean
  /**
   * Camera distance as a multiple of the auto-fit distance.
   * 1 is the framing chosen on load; below 1 moves in, above 1 moves out.
   */
  zoom: number
  /**
   * Layout spread — the multiplier applied to the whole layout scale, 0.5 to
   * 2.5, shown to the viewer as 50%–250%.
   *
   * A slider for the same reason haze and glow are: the right amount depends
   * on the corpus. At 124 nodes the tight layout read as one constellation;
   * at 335 it read as a nest. 1 is the baseline tuned 2026-08-07; below it
   * approaches the old dense physics, above it goes airy. Moving it rebuilds
   * the layout (charge, repulsion cap, link rest lengths all scale together,
   * and links touching hubs get extra room), so the change costs a beat
   * before the camera refits.
   */
  spread: number
  /**
   * Bilateral geo-affinity, 0 to 1. Off by default.
   *
   * A soft, ablatable force nudging a country's nodes toward countries it
   * shares a trade/political bloc with and away from the short, explicit
   * list of countries it is in a real dispute with — see
   * `lib/geoAffinity.ts` for the model and why it replaces the
   * "continental repulsion" the original plan proposed. Read live by the
   * force each tick, so unlike `spread` this never triggers a re-warmup —
   * moving the slider re-tunes the pull without re-laying out the graph.
   */
  geoAffinity: number
  /**
   * The lens — which question the node fills answer. STANDARD is the
   * country palette; GROUP_COMPARISON is five inks (US red, BRICS yellow, EU
   * green, international white, everything else grey); WORLD_OVERVIEW is the
   * seven-way continental roll-up. A recolour pass only — layout, camera and
   * every other channel are untouched, and it must stay out of the
   * `forceGraph` memo deps (see `lib/modes.ts` for the model and the rule).
   * Inert in blueprint, where fill is not a channel.
   */
  lens: LensMode
}

/**
 * What the graph looks like on load.
 *
 * Chosen by looking, and revised in V0.7 after looking again at four times the
 * node count. The ground grid gives the network a floor and a sense of scale;
 * past that, each additional element competes with the nodes for attention.
 *
 * The platform slab is gone entirely, not merely defaulted off. Sized to the
 * data, it grew with the graph until it was a wall — from most angles it either
 * occluded the lower half of the network or forced the camera to look down at
 * it. The infinite grid does the same job, reports scale better because its
 * cells never change size, and is never in the way.
 *
 * Haze defaults low rather than off. It works against the long lens, which is
 * the whole objection to it — but at 121 nodes the alternative is a scene with
 * no depth cue whatsoever, and a little of the wrong cue beats none.
 */
// The ground grid and the wireframe bounding box are GONE — deleted outright,
// not defaulted off (Thomas, 2026-08-12: "don't keep the code" / "delete the
// bounding box"). They joined the platform slab and the drop lines: scenery
// that competed with the data. The scene's scale cues are now the nodes
// themselves and the optional horizon.
export const DEFAULT_VIEW: ViewSettings = {
  showPulses: true,
  showEdges: true,
  showHorizon: false,
  blueprint: false,
  fog: 0.35,
  glow: 0.55,
  autoRotate: false,
  focusBuiltFrom: true,
  focusFeedsInto: true,
  zoom: 1,
  spread: 1,
  geoAffinity: 0,
  lens: 'STANDARD',
}

/** Scene background. Fog resolves to this, so the two must agree. */
export const SCENE_BACKGROUND = '#05070d'

/**
 * The horizon band of the optional sky dome.
 *
 * Was `#28486e`, which is an enormous jump from `SCENE_BACKGROUND` — a bright
 * slate-blue band across a scene that is otherwise within a few steps of
 * black. Dropped to `#12233a` on 2026-08-19: still unmistakably a horizon,
 * no longer a light source competing with the graph.
 *
 * **It lives here rather than in `Environment.tsx` because two things need
 * it.** The link shader's `uFogColour` used to be hard-wired to
 * `SCENE_BACKGROUND`, so with the horizon on, a distant edge faded toward
 * near-black while the background actually behind it was blue — lines
 * dissolving into a colour that is not there. `updateFog` now resolves both
 * three.js's fog and the link uniform to this value whenever the horizon is
 * showing, and to `SCENE_BACKGROUND` when it is not.
 *
 * One constraint this puts on the palette: a node's luminance floor has to
 * clear the *brightest* background it can sit against, which is this, not
 * `SCENE_BACKGROUND`. Pick the floor against the sky band or dark nodes will
 * be invisible against the horizon instead of against space.
 */
export const HORIZON_COLOUR = '#12233a'

/** Blueprint mode's paper, node disc, and dimmed-line colours. */
export const PAPER_BACKGROUND = '#f2efe7'
/**
 * Pure white, not near-paper white — the difference IS the encoding. A solid
 * disc renders as a slightly luminous white circle against the warmer paper
 * (the emissive floor in InfluenceGraph pushes it just over the background),
 * while a hollow one-off instrument keeps its emptied fill and reads as an
 * open ring. With a near-paper fill those two collapsed into the same
 * outline circle and the substance channel silently vanished in blueprint.
 */
export const PAPER_NODE_FILL = '#ffffff'
export const PAPER_DIM_LINK = '#cdc6b6'
/** Line opacity on paper — dark ink needs more body than glow-lines do.
 * 0.42 measured near-invisible once compositing was fixed (the EU trunk came
 * out 1 RGB step off the paper); 0.62 draws a confident pen line. */
export const PAPER_LINK_OPACITY = 0.62
/**
 * Out-of-focus line opacity on paper. Far higher than the dark theme's
 * `DIM_LINK_OPACITY` (0.07) because the roles of the two numbers differ with
 * the ground they sit on: on near-black, a dim line only has to avoid adding
 * light; on paper, `PAPER_DIM_LINK` is already within a few RGB steps of the
 * background, so the *colour* carries the recession and the opacity has to
 * keep the line from vanishing outright — faint pencil under the inked chain,
 * not empty paper.
 */
export const PAPER_DIM_LINK_OPACITY = 0.45

/**
 * The dimmed-node treatment on paper — same shift of burden. A dimmed dark-
 * theme node survives as a ghost of alpha; a paper disc's fill is within a
 * few steps of the background, so alpha alone erases it. The ghost has to be
 * the RIM: fill mostly gone, ring held at a quarter strength of its dark ink
 * — a field of faint pencil circles under the traced chain, which is what a
 * draughtsman's underdrawing actually looks like.
 */
export const PAPER_DIM_NODE_OPACITY = 0.35
export const PAPER_DIM_RIM_FACTOR = 0.25

/**
 * Bloom threshold at full glow.
 *
 * The old value was 0.5, against a brightest node of 0.36 — so bloom lit
 * nothing, on any graph, ever, and nobody noticed for five sessions. The
 * replacement is chosen so roughly the top ten nodes bleed and the rest stay
 * contained: glow becomes a second reading of authority instead of atmosphere.
 * Below about 0.15 most of the graph blooms, apparent size flattens out, and
 * the encoding the whole project rests on stops working.
 *
 * **Lowered 0.26/0.44 → 0.17/0.32 in v3, 2026-08-19, and it had to be.** The
 * 0.26 was tuned against v2's emissive channel, where emitted light was the
 * fill colour times authority and fills ran up to Y = 0.703. v3 normalises
 * every node's emissive to Y = 0.213 (`glowInk`), which is what makes glow a
 * reading of authority at all — but it also cuts the brightest emission in the
 * scene by roughly a third. Left at 0.26 the old threshold would have sat
 * above the new ceiling and bloom would have gone dark again, which is exactly
 * the five-session bug described above, arrived at from the opposite
 * direction. The pair keeps its old span; only the range moved.
 *
 * **The one node class this does not govern is INT.** Its fill is near-white
 * by design (achromatic = stateless, see `SCOPE_COLOUR`), so it is bright
 * before any emission is added and blooms on lit luminance rather than on
 * authority. That is a known, deliberate exception in the same family as
 * BRICS yellow — not a tuning failure, and not fixable from this constant.
 */
export const BLOOM_THRESHOLD_MIN = 0.17
export const BLOOM_THRESHOLD_MAX = 0.32

/**
 * Every constant governing how focus looks, in one place, because they are only
 * ever tuned against each other and against a screenshot.
 *
 * Dimmed, never hidden. The shape of the whole graph is the context that makes
 * a cone mean anything — remove it and you are looking at a small disconnected
 * diagram floating in a large empty room. The out-of-focus graph has to stay
 * legible as structure; it just must not compete.
 */
/**
 * Retuned 2026-08-10 (Thomas, Q2) from 0.34 / 0.1, and the emissive number is
 * the one that mattered.
 *
 * The complaint was that selecting a node visibly changed the edges and barely
 * touched the spheres. Opacity alone could never have fixed that: a dimmed node
 * was still emitting at 0.1, bloom keys off luminance, and the glow pass was
 * putting back at the silhouette what the alpha had just taken out of the fill.
 * So the two move together — 0.15 to thin the fill, 0.03 so the bloom stops
 * re-lighting it.
 *
 * Neither is zero, for the reason in the note above: the out-of-focus graph is
 * the context that makes a focused chain mean anything.
 */
// Deepened 0.15/0.03 → 0.09/0.012 in round 8, and **put back to 0.16/0.03 in
// v3, 2026-08-19** — because round 8's reason has been deleted.
//
// The history is worth keeping, because these numbers have now been wrong in
// both directions for the same underlying reason. The original measurement
// ("dimming is not the lever — there is nothing left to take away") was true
// of the old flat spheres. The bold-rim system quietly invalidated it: rims
// add alpha at the silhouette even on a dimmed node, so a "dimmed" graph still
// read as a wall of bright rings and tracing lost its contrast (Thomas: "the
// built from view... doesn't show much"). Round 8 answered that by taking the
// fill down to 0.09 — compensating in the fill channel for something the rim
// channel was doing.
//
// v3 removes rims from the dark scene outright, so that compensation is now a
// debt: at 0.09 with no rim there is nothing left at the silhouette either,
// and the out-of-focus graph stops being legible as structure — which is the
// thing the note above says it must never stop being. The shape of the whole
// graph is the context that makes a traced cone mean anything.
//
// **Landed at 0.13, not the 0.16 the reasoning above first suggested**, and
// the correction is the interesting part. Restoring the pre-rim 0.15 assumed
// the only thing that had changed was the missing rim. It was not: v3's fills
// are flat at Y ≈ 0.21 where v2's ran up to 0.70, so a *lit* node is now
// dimmer than it used to be at the same time as the dimmed one got brighter,
// and the contrast that tracing depends on is the ratio of the two. Rendered
// at 0.16 the traced chain stopped standing out from the graph at all; at 0.10
// it stood out and the rest of the graph stopped reading as structure. 0.13
// was picked off a three-way render of the same trace and is the one number
// here most worth moving by eye — a tenth either way is a legitimate taste
// difference, not a bug.
//
// Retune it against `DIM_LINK_OPACITY`, never alone. Most of what made 0.16
// look wrong the first time was actually the edges: they are twenty times
// wider than they were, so the dimmed *lines* were doing the crowding and the
// node number took the blame.
export const DIM_NODE_OPACITY = 0.13
export const DIM_NODE_EMISSIVE = 0.03
export const DIM_LINK_COLOUR = '#1b2437'

/**
 * Line opacity in and out of focus.
 *
 * Kept deliberately low. An edge is a relationship between two nodes, and the
 * nodes are the subject — a lit line that reads as a bright solid stroke turns
 * the cone into a diagram of pipes with beads on it. The contrast between these
 * two numbers is what marks the cone, not the absolute brightness of either.
 */
// Dropped 0.22 → 0.17 with the family-ink edges (round 5): rim colours are
// brighter than the fills the lines used to blend, so the same opacity read
// louder. Trunks (stacked parallel edges) get their own per-material lift on
// top of this — see litOpacity on GradientLinkMaterial.
//
// **Dropped again, 0.17 → 0.13, and the dim 0.07 → 0.03, in v3.** Both of
// those numbers were tuned against a line drawn **0.08 px** wide — a line that
// needed every scrap of opacity it could get merely to exist (see
// `LINK_WIDTH_SCALE` in InfluenceGraph for how that happened). At 1.6 px the
// same opacity is a solid stroke, and the note above about pipes-with-beads
// stops being a caution and becomes a description. The dim value falls
// proportionally further because it moved from invisible-by-accident to
// clearly drawn: at 0.07 and full width the out-of-focus graph competed with
// the traced chain instead of sitting behind it.
export const LINK_OPACITY = 0.13
export const DIM_LINK_OPACITY = 0.045

export const ZOOM_MIN = 0.25
export const ZOOM_MAX = 2.6
