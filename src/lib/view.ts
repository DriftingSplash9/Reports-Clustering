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
   *
   * 2026-08-10: default off; the intensity/threshold mapping was widened so
   * low and high settings are visibly different when the slider is used.
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
}

/**
 * What the graph looks like on load.
 *
 * Defaults revised 2026-08-10 to match the view Thomas was actually using:
 * bounding box on, auto-orbit on, haze and glow off, cluster spread at 50%.
 * Both side panels start collapsed (see App.tsx PanelShell props).
 */
export const DEFAULT_VIEW: ViewSettings = {
  showPulses: true,
  showEdges: true,
  showCube: true,
  showGroundGrid: true,
  showHorizon: false,
  fog: 0,
  glow: 0,
  autoRotate: true,
  focusBuiltFrom: true,
  focusFeedsInto: true,
  zoom: 1,
  spread: 0.5,
}

/** Scene background. Fog resolves to this, so the two must agree. */
export const SCENE_BACKGROUND = '#05070d'

/**
 * Bloom threshold range across the glow slider.
 *
 * Widened 2026-08-10 so low and high settings are visibly different:
 * - at low glow the threshold stays high → almost nothing blooms
 * - at full glow the threshold drops → more nodes bleed, and intensity is higher
 *
 * The old 0.26–0.44 band was too tight for the slider to feel useful.
 * Floor is still above the "everything turns into white blobs" regime.
 */
export const BLOOM_THRESHOLD_MIN = 0.14
export const BLOOM_THRESHOLD_MAX = 0.55

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
export const DIM_NODE_OPACITY = 0.15
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
export const LINK_OPACITY = 0.22
export const DIM_LINK_OPACITY = 0.07

export const ZOOM_MIN = 0.25
export const ZOOM_MAX = 2.6
