import * as THREE from 'three'
import {
  DIM_LINK_COLOUR,
  DIM_LINK_OPACITY,
  LINK_OPACITY,
} from '../lib/view'

/**
 * Custom geometry and materials for the edges and their pulses.
 *
 * Both hook into three-forcegraph rather than replacing it, which matters —
 * the library keeps ownership of positioning, and positioning is the part that
 * has to stay correct as the simulation moves nodes 60 times a second.
 *
 *   `linkMaterial`                     — our shader, their cylinder.
 *   `linkDirectionalParticleThreeObject` — our geometry, their travel maths.
 */

/**
 * A link's cylinder is built as radius r, length 1 along +Z, then positioned at
 * the source and scaled to reach the target. Scaling happens in the model
 * matrix, so the raw `position.z` a vertex shader sees still runs 0 → 1 from
 * source to target regardless of how long the link is.
 *
 * That is the whole trick: local z *is* the interpolation factor, free of
 * charge, with no per-frame work and no attribute to keep in sync.
 */
const VERTEX = /* glsl */ `
  varying float vT;
  void main() {
    vT = clamp(position.z, 0.0, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAGMENT = /* glsl */ `
  uniform vec3 uFrom;
  uniform vec3 uTo;
  uniform float uOpacity;
  uniform float uDashed;
  uniform float uFlow;
  uniform float uFlowTime;
  uniform float uHover;
  varying float vT;
  void main() {
    // Implied edges are dashed. Discarding on the same 0→1 interpolant the
    // gradient already uses costs nothing and needs no extra geometry. Dash
    // count is fixed rather than proportional to length, so "dashed" reads the
    // same on a short link and a long one — the message is about the evidence,
    // not about the distance.
    if (uDashed > 0.5 && fract(vT * 16.0) > 0.55) discard;

    vec3 colour = mix(uFrom, uTo, smoothstep(0.0, 1.0, vT));

    // The beam treatment. Several soft bands sweep the whole length at once
    // (phase multiplier 5.0) rather than one dot travelling it, which is the
    // whole point: a moving OBJECT reads as an event (that is what a pulse
    // already says), a moving WAVE reads as a medium already in motion.
    // uFlow is 0/1 per material, set once at creation from LinkDatum's
    // continuousSource and never toggled per frame — only uFlowTime
    // advances, from linkVisuals.ts's tickLinkFlow. pow(band, 4.0) narrows
    // each band from a full sine lobe to a slim bright crest so the "flow"
    // reads as light riding the line, not the line's own base colour
    // breathing; 0.6 caps how far toward white a crest can push so it still
    // sits under the pulse system's own PULSE_BRIGHTEN peak brightness.
    if (uFlow > 0.5) {
      float phase = vT * 5.0 - uFlowTime * 0.6;
      float band = 0.5 + 0.5 * sin(6.28318530718 * phase);
      float brightness = pow(band, 4.0) * 0.6;
      colour = mix(colour, vec3(1.0), brightness);
    }

    // Hover highlight. Independent of uFrom/uTo/uOpacity (the focus/dim
    // system above) so pointing at an edge reads the same whether or not a
    // trace is active — a dimmed link sitting at 0.02 opacity still needs to
    // resolve clearly on hover, which a multiply on uOpacity could never do.
    // The whiten is stronger than a pulse's PULSE_BRIGHTEN (0.35): a pulse
    // rides a line and only needs to read as "different from its edge," a
    // hover needs to read as "different from every other edge in a rats-nest
    // of them," including ones carrying a brighter pulse of their own.
    colour = mix(colour, vec3(1.0), uHover * 0.55);
    float opacity = mix(uOpacity, max(uOpacity, 0.75), uHover);

    gl_FragColor = vec4(colour, opacity);
  }
`

export interface GradientLinkMaterial extends THREE.ShaderMaterial {
  userData: {
    /** Colour at the upstream end, kept so focus changes can restore it. */
    from: THREE.Color
    /** Colour at the downstream end. */
    to: THREE.Color
    /**
     * The opacity this line returns to when lit — LINK_OPACITY for an
     * ordinary edge, higher for a trunk carrying many stacked edges. Same
     * role litOpacity plays on NodeMaterial: focus restores to this, not to
     * a global constant, or every trace would flatten the trunks.
     */
    litOpacity: number
    /**
     * The opacity a trace restores instead of `litOpacity`, where the two
     * differ — set on `intTether` links (InfluenceGraph.tsx), which rest
     * faded and only read at full strength as part of a traced chain.
     * Absent on every other link, meaning "same as litOpacity".
     */
    focusOpacity?: number
  }
}

/**
 * Materials carrying the beam treatment, registered so one `tickLinkFlow`
 * call a frame advances all of them — same shape as `blinkingPulseMaterials`
 * below, and for the same reason: a `Set` costs one write per REGISTERED
 * material per frame, not a walk over every link in the graph to find the
 * ~dozens that qualify.
 */
const flowMaterials = new Set<GradientLinkMaterial>()

/**
 * A link coloured from its upstream node to its downstream node.
 *
 * Edges previously took the upstream node's colour along their whole length,
 * which said "this line belongs to that report" — true, but it left the other
 * end unattributed. A gradient states both ends: what this is, and what it
 * reaches.
 *
 * `beam` marks a continuous database's outgoing edge (`LinkDatum.
 * continuousSource` — see `types.ts`'s `Report.continuous`) and is set once
 * at construction, never toggled later: a link's continuity is a fact about
 * its upstream node, not a view state. What DOES toggle per frame is the
 * flowing highlight itself, via `uFlowTime` from `tickLinkFlow`, and per the
 * Pulses view setting via `setLinkFlow` — the beam is this edge's only
 * direction cue, the same role pulses play everywhere else, so it obeys the
 * same toggle.
 */
export function gradientLinkMaterial(
  from: string,
  to: string,
  dashed = false,
  litOpacity = LINK_OPACITY,
  beam = false,
  /** Crest alpha lift for a beam on a faint line — see `uFlowLift` in FRAGMENT. */
  flowLift = 0,
): GradientLinkMaterial {
  const fromColour = new THREE.Color(from)
  const toColour = new THREE.Color(to)

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uFrom: { value: fromColour.clone() },
      uTo: { value: toColour.clone() },
      uOpacity: { value: litOpacity },
      uDashed: { value: dashed ? 1 : 0 },
      // Starts OFF even when `beam` is true — registration in
      // `flowMaterials` (below) is what makes the material animate-able;
      // whether the animation is currently VISIBLE is `view.showPulses`,
      // synced by the caller (`InfluenceGraph.tsx`'s `setLinkFlow` effect)
      // once it knows that setting. Two different questions, like `dashed`
      // vs `uOpacity` elsewhere in this file.
      uFlow: { value: 0 },
      uFlowTime: { value: 0 },
      uFlowLift: { value: flowLift },
      uHover: { value: 0 },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    // Links cross constantly in 3D. Writing depth makes whichever happened to
    // be drawn first punch a hole in the ones behind it.
    depthWrite: false,
  }) as GradientLinkMaterial

  material.userData = { from: fromColour, to: toColour, litOpacity }
  if (beam) flowMaterials.add(material)
  return material
}

/**
 * Drop every registered beam material.
 *
 * Unlike `pulseMaterial`'s cache (keyed by colour, so it is correctly
 * shared and correctly permanent) `gradientLinkMaterial` builds one instance
 * PER LINK, never shared — so `flowMaterials`, which registers by instance,
 * would otherwise keep every beam material alive forever across every
 * `forceGraph` rebuild (a tier flip, a filter change) with nothing left
 * pointing at the discarded links that used to own them. Call this once at
 * the top of a rebuild, the same moment `linkMaterials.current.clear()`
 * already runs in `InfluenceGraph.tsx` — same leak class, same fix shape.
 */
export function resetLinkFlow() {
  flowMaterials.clear()
}

/**
 * Show or hide the beam's flowing highlight without touching the material's
 * registration.
 *
 * A continuous edge's beam is its ONLY direction cue — there are no discrete
 * pulses to fall back on (`InfluenceGraph.tsx` never builds them for a
 * `continuousSource` link) — so it obeys the same `view.showPulses` toggle
 * every other direction cue does, rather than always drawing regardless of
 * that setting. Registration in `flowMaterials` (via the `beam` flag at
 * construction) is permanent for the material's life; only whether the
 * animation is currently VISIBLE toggles here.
 */
export function setLinkFlow(material: GradientLinkMaterial, active: boolean) {
  material.uniforms.uFlow.value = active ? 1 : 0
}

/**
 * Advance every registered beam's flow phase — called once per frame from
 * InfluenceGraph's `useFrame`, same free-running clock `tickPulseBlink`
 * already reads. A no-op when nothing on screen is continuous.
 */
export function tickLinkFlow(seconds: number) {
  if (flowMaterials.size === 0) return
  for (const material of flowMaterials) material.uniforms.uFlowTime.value = seconds
}

/**
 * The out-of-focus treatment. Was themable (`setLinkDimTheme`) while
 * blueprint's paper ground needed the opposite move — that went with
 * blueprint on 2026-08-19, and the dark scene's constants are now simply
 * module state.
 */
const dim = {
  colour: new THREE.Color(DIM_LINK_COLOUR),
  opacity: DIM_LINK_OPACITY,
}

/**
 * Fade a link out of focus, or restore it, without rebuilding anything.
 *
 * `tracing` marks that a chain is actively selected, and it changes what
 * "lit" means (round 8, from Thomas's read of the built-from view: "these
 * pulses and edges are lost by the size and proximity of the nodes"). A lit
 * link during a trace gets a strong opacity lift AND stops depth-testing —
 * it draws straight through any sphere in front of it, so the chain stays a
 * visible thread even where it threads between fat nodes at close zoom. With
 * no trace active, links depth-test normally; lines through nodes are only
 * wanted when the lines ARE the answer.
 */
export function setLinkFocus(
  material: GradientLinkMaterial,
  lit: boolean,
  tracing = false,
) {
  const { from, to, litOpacity, focusOpacity } = material.userData
  material.uniforms.uFrom.value.copy(lit ? from : dim.colour)
  material.uniforms.uTo.value.copy(lit ? to : dim.colour)
  material.uniforms.uOpacity.value = lit
    ? tracing
      ? Math.min(0.68, (focusOpacity ?? litOpacity) * 2.2)
      : litOpacity
    : dim.opacity
  material.depthTest = !(lit && tracing)
}

/**
 * The pointer is over this link (or its screen-space tolerance band — see
 * InfluenceGraph.tsx's nearest-link picker), so light it up regardless of
 * focus/dim state.
 *
 * Deliberately its own uniform rather than folded into setLinkFocus: focus
 * marks membership in a trace, hover marks where the pointer is, and 2026-08
 * 22's bug report (Thomas: mousing over an edge gave no cue it was
 * selectable) is about the second thing happening with zero code path for it
 * at all — not about the two systems conflicting. Keeping them orthogonal
 * means a hovered edge outside any trace still highlights, and a hovered
 * edge inside a dimmed trace highlights on top of the dim rather than
 * fighting it for one shared knob.
 */
export function setLinkHover(material: GradientLinkMaterial, hovered: boolean) {
  material.uniforms.uHover.value = hovered ? 1 : 0
}

/**
 * Teardrop pulse, pointing along -Z.
 *
 * three-forcegraph orients any particle whose geometry is not a SphereGeometry
 * by calling the particle's own `lookAt(nextPosition)` every frame (confirmed
 * by reading `three-forcegraph/dist/three-forcegraph.js` directly, the
 * `photon.lookAt(pos.x, pos.y, pos.z)` call, made *before* the particle's
 * position is advanced to `pos` — so it is genuinely looking toward where it
 * is about to go). `THREE.Object3D.lookAt` follows the same convention as
 * every camera in three.js: it points the object's local **-Z** axis at the
 * target, not +Z — the opposite of what an earlier version of this comment
 * assumed, which is exactly why the pulses flew tail-first (2026-08-10,
 * Thomas). A profile built around -Z is what arrives pointing the way it
 * travels, with no orientation code of our own.
 *
 * Round end leading, taper trailing — the shape of something moving through
 * something else, and the reading a falling drop gives. The direction of
 * influence was already carried by the arrowheads; this puts it on the moving
 * element too, which is the one the eye actually tracks.
 */
const teardropCache = new Map<number, THREE.LatheGeometry>()

export function teardropGeometry(width: number): THREE.LatheGeometry {
  // Bucketed, because a distinct geometry per link would be dozens of nearly
  // identical objects for a difference no one can see.
  const key = Math.round(width * 4) / 4
  const cached = teardropCache.get(key)
  if (cached) return cached

  const s = key / 2

  // Profile in (radius, axis). Lathe spins this around Y, so it is written
  // along Y and rotated into Z afterwards.
  const profile = [
    new THREE.Vector2(0, -2.1 * s), // tail point, trailing
    new THREE.Vector2(0.16 * s, -1.35 * s),
    new THREE.Vector2(0.42 * s, -0.7 * s),
    new THREE.Vector2(0.72 * s, -0.18 * s),
    new THREE.Vector2(0.86 * s, 0.16 * s),
    new THREE.Vector2(0.74 * s, 0.5 * s),
    new THREE.Vector2(0.42 * s, 0.72 * s),
    new THREE.Vector2(0, 0.8 * s), // rounded head, leading
  ]

  const geometry = new THREE.LatheGeometry(profile, 10)
  // +Y becomes -Z (not +Z — see the block comment above), so the rounded
  // head now leads along the axis `lookAt` actually aims: -Z, toward the
  // next position, not away from it.
  geometry.rotateX(-Math.PI / 2)

  teardropCache.set(key, geometry)
  return geometry
}

const pulseMaterials = new Map<string, THREE.MeshBasicMaterial>()

/**
 * The shade split between a line and the pulse riding it — Thomas,
 * 2026-08-19, third pass on this relationship: "I want the pulses to be a
 * different shade than the edges too, the pulses can be brighter and the
 * edges lighter shades."
 *
 * Same hue on both (one colour per family stays the ink system's premise);
 * what differs is where each sits on that hue's ladder. The EDGE softens
 * toward white a little and keeps its low opacity — a pale thread. The PULSE
 * brightens further and rides at near-full opacity — a hot bead on that
 * thread. This is deliberately HALF of what the failed whitened-additive
 * version did: 0.35 toward white with normal blending keeps the hue legible
 * on a single pulse, and thousands of them don't sum into a snowstorm
 * because nothing is additive.
 */
export const EDGE_SOFTEN = 0.22
const PULSE_BRIGHTEN = 0.35

/** An edge's drawn shade: the family ink, softened. Exported for the one
 * call site building gradient materials, so the edge and its pulse derive
 * from the SAME ink and can never drift onto different hues. */
export function edgeShade(ink: string): string {
  return `#${new THREE.Color(ink).lerp(new THREE.Color('#ffffff'), EDGE_SOFTEN).getHexString()}`
}

/**
 * The blinking pulse materials, registered so one `tickPulseBlink` call a
 * frame animates them all. A Set of materials rather than per-link state
 * because the cache below already shares one material across every link of a
 * given colour — all cross-border pulses of one ink therefore blink in
 * phase, which reads as a system-wide signal rather than N separate alarms,
 * and costs one opacity write per COLOUR per frame, not per pulse.
 */
const blinkingPulseMaterials = new Set<THREE.MeshBasicMaterial>()

/** Full blink cycle, seconds. Fast enough to read as blinking, slow enough
 * not to strobe — and deliberately out of step with the 2.6s orb breath so
 * the two rhythms never look like one broken animation. */
const BLINK_PERIOD_SECONDS = 1.3

/**
 * Drive the blink — called once per frame from InfluenceGraph's `useFrame`
 * with its free-running pulse clock. The wave is squared so the pulse snaps
 * bright and decays — a blink, which is what was asked for (round 10:
 * "make... the pulses along it pulse/blink"), not a gentle fade that would
 * disappear among everything else that already fades.
 */
export function tickPulseBlink(seconds: number) {
  if (blinkingPulseMaterials.size === 0) return
  const wave =
    0.5 + 0.5 * Math.sin((2 * Math.PI * seconds) / BLINK_PERIOD_SECONDS)
  const opacity = 0.2 + 0.8 * wave * wave
  for (const material of blinkingPulseMaterials) material.opacity = opacity
}

/**
 * Pulse material — unlit on purpose.
 *
 * A pulse is meant to read as a signal travelling, not as a small object being
 * lit. Lambert would let it darken on the side facing away from the lights,
 * which makes the same pulse mean different things at different points in an
 * orbit.
 *
 * `blink` marks a cross-border pulse (see `LinkDatum.cross`): a separate
 * cache entry per colour, because the ordinary material is shared by every
 * same-ink link and animating it would blink the whole family.
 *
 * The whitened-additive core (PULSE_CORE_MIX 0.66) lived exactly one session
 * — built for Phase 3.5's "pulses of light between the stars" and reverted
 * the same day on Thomas seeing it at corpus scale: "TBH I am not liking
 * these white pulses... they dominate too much visual bandwidth and their
 * colors need reinstated." He was right for a reason the close-up renders
 * hid: at 1,250 nodes there are thousands of photons in frame, and an
 * additive white core times thousands is a snowstorm — the treatment scaled
 * with the corpus in exactly the way the ink does not. Family ink restored
 * verbatim. The other half of his note — "the size/shape need addressed" —
 * is on the burner in HANDOFF.md, deliberately together with the beam-edge
 * idea, because pulse geometry is the thing the beam replaces on the
 * fastest edges. (A `paper` variant also briefly existed; it went with
 * blueprint mode, 2026-08-19.)
 */
export function pulseMaterial(colour: string, blink = false): THREE.MeshBasicMaterial {
  const key = `${colour}|${blink ? 'blink' : 'steady'}`
  const cached = pulseMaterials.get(key)
  if (cached) return cached

  const material = new THREE.MeshBasicMaterial({
    // Brighter than its line by construction — see PULSE_BRIGHTEN.
    color: new THREE.Color(colour).lerp(new THREE.Color('#ffffff'), PULSE_BRIGHTEN),
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
  })
  if (blink) blinkingPulseMaterials.add(material)
  pulseMaterials.set(key, material)
  return material
}
