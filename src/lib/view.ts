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
  /** Wireframe box marking the extent of the network. */
  showCube: boolean
  /** Infinite ground grid, giving the scene a floor and a sense of scale. */
  showGroundGrid: boolean
  /** Sky gradient, so the ground has something to meet. */
  showHorizon: boolean
  /** Vertical stems from each node down to the ground plane. */
  showDropLines: boolean
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
   * Layout spread, 0 to 1 — how much room the force layout gives clusters.
   *
   * A slider for the same reason haze and glow are: the right amount depends
   * on the corpus. At 124 nodes the tight layout read as one constellation;
   * at 335 it read as a nest. 0 is the old dense physics, 1 is fully airy;
   * moving it rebuilds the layout (charge, repulsion cap, link rest lengths
   * all scale together, and links touching hubs get extra room), so the
   * change costs a beat before the camera refits.
   */
  spread: number
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
export const DEFAULT_VIEW: ViewSettings = {
  showPulses: true,
  showEdges: true,
  showCube: false,
  showGroundGrid: true,
  showHorizon: false,
  showDropLines: false,
  fog: 0.35,
  glow: 0.55,
  autoRotate: false,
  focusBuiltFrom: true,
  focusFeedsInto: true,
  zoom: 1,
  spread: 1 / 3,
}

/** Scene background. Fog resolves to this, so the two must agree. */
export const SCENE_BACKGROUND = '#05070d'

/**
 * Bloom threshold at full glow.
 *
 * The old value was 0.5, against a brightest node of 0.36 — so bloom lit
 * nothing, on any graph, ever, and nobody noticed for five sessions. The
 * replacement is chosen so roughly the top ten nodes bleed and the rest stay
 * contained: glow becomes a second reading of authority instead of atmosphere.
 * Below about 0.15 most of the graph blooms, apparent size flattens out, and
 * the encoding the whole project rests on stops working.
 */
export const BLOOM_THRESHOLD_MIN = 0.26
export const BLOOM_THRESHOLD_MAX = 0.44

/**
 * Every constant governing how focus looks, in one place, because they are only
 * ever tuned against each other and against a screenshot.
 *
 * Dimmed, never hidden. The shape of the whole graph is the context that makes
 * a cone mean anything — remove it and you are looking at a small disconnected
 * diagram floating in a large empty room. The out-of-focus graph has to stay
 * legible as structure; it just must not compete.
 */
export const DIM_NODE_OPACITY = 0.34
export const DIM_NODE_EMISSIVE = 0.1
export const DIM_LINK_COLOUR = '#1b2437'

/**
 * Line opacity in and out of focus.
 *
 * Kept deliberately low. An edge is a relationship between two nodes, and the
 * nodes are the subject — a lit line that reads as a bright solid stroke turns
 * the cone into a diagram of pipes with beads on it. The contrast between these
 * two numbers is what marks the cone, not the absolute brightness of either.
 */
export const LINK_OPACITY = 0.22
export const DIM_LINK_OPACITY = 0.07

export const ZOOM_MIN = 0.25
export const ZOOM_MAX = 2.6
