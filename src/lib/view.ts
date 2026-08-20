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
  // Blueprint mode (the paper/light theme) lived here from 2026-08-12 to
  // 2026-08-19, when Thomas deleted it outright (Phase 4 item 1: "Delete
  // Blueprint outright... subtractive and makes everything after it
  // cheaper"). The ten-minute diagnosis before deletion: on paper, large
  // nodes rendered as fuzzy soft blobs (the emissive floor fighting ACES
  // tone mapping on a white ground) — a paper-pipeline fault the dark scene
  // does not share, so nothing needed porting. Deleting it removed the one
  // view setting that was a forceGraph MEMO DEP, so no toggle rebuilds the
  // scene's materials any more. The code is in git history if a light theme
  // ever returns; per the house rule, it is not kept commented out.
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
   * With a node selected, HIDE everything outside the traced chain instead
   * of merely dimming it. Off by default — dimming is the ordinary way to
   * trace a chain in context; this is for the narrower question "just this
   * one thing and what actually touches it, nothing else on screen at all."
   *
   * Added 2026-08-20 (Thomas: *"if i want to show just Israel and
   * international connections to and from it I have no way to do so"*).
   * Deliberately NOT a per-country entry in the scope filter — a country
   * isolated via `FilterState.scopes` would drop any edge to a DIFFERENT
   * country by the filter's own "both endpoints visible" rule (see
   * `filter.ts`), which is exactly the cross-border connections a country
   * isolate is for. This reuses the existing focus/trace walk instead
   * (`computeFocus` in `lib/selection.ts`) and turns its result into the
   * visible set rather than a dim/lit split — select Israel's node or
   * orb, flip this on, and the chain IS the whole scene. See the
   * `isolateFocus` memo in App.tsx for how this composes with (and
   * deliberately overrides, rather than intersects with) the scope filter.
   */
  isolateFocus: boolean
  /**
   * Item 8 of the 2026-08-20 todo list: "show this node and everything
   * within N hops." **0 means off** — the ordinary unbounded
   * `focusBuiltFrom`/`focusFeedsInto` cones, unchanged. Any other value
   * (1 through `NEIGHBOURHOOD_HOPS_MAX`) switches the selection to a
   * bounded, HIDING isolate the same way `isolateFocus` does — see the
   * `neighbourhoodFocus` memo in `App.tsx` for exactly how the two compose
   * (this one wins when it is on; a selection cannot be both "everything it
   * rests on" and "only N hops of it" at once, so they are not additive).
   *
   * A separate field from `isolateFocus` rather than reusing that boolean
   * plus this as a modifier, on purpose: `isolateFocus` is "show me the
   * WHOLE chain and nothing else", which is a real, complete answer someone
   * may want with the slider left at 0. Folding them into one control would
   * make "the whole chain" reachable only by cranking the hop slider high
   * enough to exceed the graph's diameter, which is not the same thing and
   * would not read as the same thing.
   *
   * Thomas's own framing for why this earns its place ahead of fancier
   * navigation ideas: "Filters today are by country and subject only. This
   * attacks the density problem directly and is far cheaper than
   * fly-through navigation."
   */
  neighbourhoodHops: number
  /**
   * Camera distance as a multiple of the auto-fit distance.
   * 1 is the framing chosen on load; below 1 moves in, above 1 moves out.
   */
  zoom: number
  /**
   * Layout spread — the multiplier applied to the whole layout scale, **2 to
   * 10**, shown to the viewer as 200%–1000%. Default 2.
   *
   * A slider for the same reason haze and glow are: the right amount depends
   * on the corpus. At 124 nodes the tight layout read as one constellation;
   * at 335 it read as a nest. Moving it rebuilds the layout (charge,
   * repulsion cap, link rest lengths all scale together, and links touching
   * hubs get extra room), so the change costs a beat before the camera
   * refits.
   *
   * **Rebased 2026-08-19 (Thomas: "the cluster spread is far too dense at
   * 100%... it would be best to start at the current 200%. It should be from
   * there as a minimum up to a 1000x max").** The old baseline of 1 — tuned
   * 2026-08-07 at a fraction of today's node count — is now BELOW the floor
   * and unreachable, deliberately: at 1,250 reports it is the density he is
   * complaining about, so the range no longer offers it. Old range was
   * 0.25–3.75 with a default of 1. If the corpus ever shrinks again this is
   * the first number to revisit, because the floor is a judgement about
   * THIS corpus size, not a property of the layout.
   */
  spread: number
  /**
   * Bilateral geo-affinity, **0 to 5**. Defaults to 1.5 — on, not off.
   *
   * A soft, ablatable force nudging a country's nodes toward countries it
   * shares a trade/political bloc with and away from the short, explicit
   * list of countries it is in a real dispute with — see
   * `lib/geoAffinity.ts` for the model and why it replaces the
   * "continental repulsion" the original plan proposed. Read live by the
   * force each tick, so unlike `spread` this never triggers a re-warmup —
   * moving the slider re-tunes the pull without re-laying out the graph.
   *
   * **Ceiling 1.5 → 5 and default 0 → 1.5 on 2026-08-19 (Thomas: "turn geo
   * affinity up to 500%").** He had been running pinned at the old ceiling of
   * 1.5, which is why that value becomes the new default rather than 0: it is
   * where he actually works, not a guess. Note the force adds velocity
   * directly (`v += pull * strength * alpha`) with no distance term, so
   * strength scales the injection linearly and d3's `velocityDecay` is the
   * only thing damping it — the model was written for 0–1 and 5 is well past
   * where it was tuned. Settling was verified at 5 before shipping this
   * range; if a future change to `BLOC_WEIGHT`, `MAX_BLOC_ATTRACTION` or
   * `CONFLICT_REPULSION` raises the pull magnitudes, re-check that the
   * layout still comes to rest at the top of the slider.
   */
  geoAffinity: number
  /**
   * Galaxy clustering, **0 to 3**. Defaults to 1 — on, not off.
   *
   * A soft, ablatable force pulling every node toward its OWN family's
   * centroid and its OWN country's centroid — see `lib/galaxyForce.ts` for
   * the model, and for why this is a deliberate reversal of `geoAffinity`'s
   * "continent is not a relationship" objection rather than a contradiction
   * of it: that objection was about pulling COUNTRY A toward COUNTRY B
   * because they share a colour bucket, which this force never does.
   *
   * Added 2026-08-20, same evening as the per-country fold, after Thomas
   * saw the just-shipped mint's tier crowding and asked for "each continent
   * is its own cluster... like the milkyway and andromeda" as one of four
   * options — this is the cheap-to-try one, built inside the existing
   * single scene rather than as a multi-scene rewrite. Read live by the
   * force each tick, so — like `geoAffinity` — moving the slider re-tunes
   * the pull without a layout rebuild.
   *
   * Range picked conservatively pending Thomas actually seeing it live: the
   * force's own constants (`FAMILY_PULL`/`COUNTRY_PULL` in galaxyForce.ts)
   * are spring constants multiplied by raw distance, not a normalised
   * direction like geoAffinity's — verified settling at the ceiling (3)
   * with a real headless-browser run before shipping this range, the same
   * way geoAffinity's 5 was verified. If Thomas wants it pulled harder than
   * 300%, raise this ceiling and re-verify settling exactly as that note
   * describes, rather than assuming the same headroom applies.
   */
  galaxy: number
  /**
   * The lens — which question the node fills answer. STANDARD is the
   * country palette; GROUP_COMPARISON is five inks (US red, BRICS yellow, EU
   * green, international white, everything else grey); WORLD_OVERVIEW is the
   * seven-way continental roll-up. A recolour pass only — layout, camera and
   * every other channel are untouched, and it must stay out of the
   * `forceGraph` memo deps (see `lib/modes.ts` for the model and the rule).
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
  fog: 0.35,
  glow: 0.55,
  autoRotate: false,
  focusBuiltFrom: true,
  focusFeedsInto: true,
  isolateFocus: false,
  neighbourhoodHops: 0,
  zoom: 1,
  spread: 2,
  geoAffinity: 1.5,
  galaxy: 1,
  lens: 'STANDARD',
}

/** Scene background. Fog resolves to this, so the two must agree.
 *
 * Dropped `#05070d` → `#010204` on 2026-08-19 (Thomas, Phase 3.5: "can you
 * make the background completely black or very close? I think it is too
 * bright"). Not the full `#000000`: one step of blue-black keeps the haze
 * resolving into night air rather than into a dead matte, and the difference
 * from true black is below anything a calibrated monitor shows on its own —
 * but it keeps every mix() in the fog chain from collapsing to pure grey.
 * The palette's luminance floor was picked against HORIZON_COLOUR (the
 * brightest ground a node can sit on), so nothing needs re-tuning here —
 * contrast only improved. */
export const SCENE_BACKGROUND = '#010204'

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

// The PAPER_* constant family (background, node fill, dim link/node/rim
// treatments, line opacities) was deleted with blueprint mode, 2026-08-19.

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
// **Rescaled 0.17/0.32 → 0.14/0.26 on 2026-08-19, with the lighting fix.**
// The emissive floor dropped 0.3 → 0.12 (Phase 4 §2.2), which cuts the
// brightest node's emitted component ~20% — left alone, these thresholds
// would have drifted back toward the sat-above-everything dead zone this
// comment's history warns about twice. Scaled analytically by that same
// ratio, NOT verified by eye: bloom remains the least-trusted number in the
// codebase (every render this side of Thomas's GPU is software-rasterised).
// Judge it on hardware alongside the new directional shading.
export const BLOOM_THRESHOLD_MIN = 0.14
export const BLOOM_THRESHOLD_MAX = 0.26

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
// **Dropped again, 0.13 → 0.045, on 2026-08-19 — Thomas's direct call, and it
// overrides the "legible as structure" doctrine above.** Looking at a live
// trace: "the background nodes are quite visible? they need to be nearly
// invisible... I envision more of a constellation with pulses of light
// between the stars." The context argument was written when a dimmed graph
// was the only thing keeping the viewer oriented; with 19px nodes, 1.6px
// edges and the traced chain drawn straight through everything
// (depth-test off while tracing — see setLinkFocus), the orientation job is
// carried by the chain itself. What 0.13 was actually buying was the exact
// crowding he is objecting to: at Everything-tier density, hundreds of
// overlapping 0.13-alpha spheres STACK, and the pile reads far brighter than
// any single node's number suggests. The emissive floor falls with it
// (0.03 → 0.012) for the standing reason: bloom re-lights whatever the alpha
// takes out. Raycast on dimmed nodes is already disabled, so near-invisible
// does not mean click-eating.
export const DIM_NODE_OPACITY = 0.045
export const DIM_NODE_EMISSIVE = 0.012
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
// Dim edges follow the dim nodes down (0.045 → 0.02, 2026-08-19, same
// direction from Thomas): the out-of-focus web is atmosphere behind the
// constellation now, not a co-subject.
export const LINK_OPACITY = 0.13
export const DIM_LINK_OPACITY = 0.02

export const ZOOM_MIN = 0.25
export const ZOOM_MAX = 2.6

/**
 * Ceiling on `neighbourhoodHops`'s slider. 5 chosen as "clearly still a
 * neighbourhood, not the whole graph" without measuring a specific number —
 * unlike `spread`'s ceiling (§7's "never move a slider ceiling without
 * re-deriving the cap" rule), nothing downstream of this one scales
 * non-linearly with it, so there is no equivalent cap to keep in sync. Raise
 * it freely if 5 hops turns out to still be everything on a dense hub node.
 */
export const NEIGHBOURHOOD_HOPS_MAX = 5
