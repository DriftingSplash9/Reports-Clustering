import * as THREE from 'three'
import {
  DIM_LINK_COLOUR,
  DIM_LINK_OPACITY,
  LINK_OPACITY,
  PAPER_DIM_LINK,
  PAPER_DIM_LINK_OPACITY,
  SCENE_BACKGROUND,
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
  varying float vDepth;
  void main() {
    vT = clamp(position.z, 0.0, 1.0);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    // Distance from the camera, for the hand-rolled fog in the fragment shader.
    vDepth = -viewPosition.z;
    gl_Position = projectionMatrix * viewPosition;
  }
`

const FRAGMENT = /* glsl */ `
  uniform vec3 uFrom;
  uniform vec3 uTo;
  uniform float uOpacity;
  uniform float uDashed;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform vec3 uFogColour;
  varying float vT;
  varying float vDepth;
  void main() {
    // Implied edges are dashed. Discarding on the same 0→1 interpolant the
    // gradient already uses costs nothing and needs no extra geometry. Dash
    // count is fixed rather than proportional to length, so "dashed" reads the
    // same on a short link and a long one — the message is about the evidence,
    // not about the distance.
    if (uDashed > 0.5 && fract(vT * 16.0) > 0.55) discard;

    vec3 colour = mix(uFrom, uTo, smoothstep(0.0, 1.0, vT));

    // Fog, applied by hand. A custom shader gets none of three.js's automatic
    // fog chunks, which is why the lines used to stay perfectly crisp while
    // every node behind them faded — the one part of the scene that most needed
    // a depth cue was the only part not receiving it.
    float fog = smoothstep(uFogNear, uFogFar, vDepth);
    gl_FragColor = vec4(mix(colour, uFogColour, fog), uOpacity * (1.0 - fog));
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
  }
}

/**
 * A link coloured from its upstream node to its downstream node.
 *
 * Edges previously took the upstream node's colour along their whole length,
 * which said "this line belongs to that report" — true, but it left the other
 * end unattributed. A gradient states both ends: what this is, and what it
 * reaches.
 */
export function gradientLinkMaterial(
  from: string,
  to: string,
  dashed = false,
  litOpacity = LINK_OPACITY,
): GradientLinkMaterial {
  const fromColour = new THREE.Color(from)
  const toColour = new THREE.Color(to)

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uFrom: { value: fromColour.clone() },
      uTo: { value: toColour.clone() },
      uOpacity: { value: litOpacity },
      uDashed: { value: dashed ? 1 : 0 },
      // Pushed far enough out to be inert until the fog is switched on.
      uFogNear: { value: 1e9 },
      uFogFar: { value: 1e9 + 1 },
      uFogColour: { value: new THREE.Color(SCENE_BACKGROUND) },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    // Links cross constantly in 3D. Writing depth makes whichever happened to
    // be drawn first punch a hole in the ones behind it.
    depthWrite: false,
  }) as GradientLinkMaterial

  material.userData = { from: fromColour, to: toColour, litOpacity }
  return material
}

/**
 * The out-of-focus treatment, themable because "receded" is drawn with
 * opposite moves on the two grounds: near-invisible dark blue on the dark
 * scene, faint-but-present warm grey on blueprint paper (see the note on
 * `PAPER_DIM_LINK_OPACITY`). Module state rather than a per-material uniform
 * because every link recedes the same way at any given moment — there is one
 * theme, exactly as there is one `dimColour` before this change.
 *
 * `setLinkDimTheme` is called from the top of InfluenceGraph's `forceGraph`
 * memo — the one place that knows the theme is changing — *before* any
 * material is built or focused for the new theme, and a theme flip rebuilds
 * every material after it anyway, so no stale-colour window exists.
 */
const dim = {
  colour: new THREE.Color(DIM_LINK_COLOUR),
  opacity: DIM_LINK_OPACITY,
}

export function setLinkDimTheme(blueprint: boolean) {
  dim.colour.set(blueprint ? PAPER_DIM_LINK : DIM_LINK_COLOUR)
  dim.opacity = blueprint ? PAPER_DIM_LINK_OPACITY : DIM_LINK_OPACITY
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
  const { from, to, litOpacity } = material.userData
  material.uniforms.uFrom.value.copy(lit ? from : dim.colour)
  material.uniforms.uTo.value.copy(lit ? to : dim.colour)
  material.uniforms.uOpacity.value = lit
    ? tracing
      ? Math.min(0.68, litOpacity * 2.2)
      : litOpacity
    : dim.opacity
  material.depthTest = !(lit && tracing)
}

/**
 * Point the shader's fog at where the camera actually is.
 *
 * Called every frame rather than once at load. The previous version baked the
 * fog planes from the camera's initial distance and never touched them again,
 * so the first zoom put every node nearer than the near plane and the effect
 * silently switched itself off. Fog is a function of where you are standing;
 * it cannot be computed once.
 */
export function setLinkFog(
  material: GradientLinkMaterial,
  near: number,
  far: number,
  colour?: string,
) {
  material.uniforms.uFogNear.value = near
  material.uniforms.uFogFar.value = far
  // The colour a receding line resolves *into*. Left alone when not supplied,
  // because the constructor's `SCENE_BACKGROUND` default is right for every
  // caller that has no opinion. It stops being right the moment the horizon is
  // on: fading a line toward near-black in front of a blue sky band makes it
  // dissolve into a colour that is not behind it. See `HORIZON_COLOUR`.
  if (colour !== undefined) material.uniforms.uFogColour.value.set(colour)
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
 * How far a pulse's colour is pushed from its family ink toward white on the
 * dark scene.
 *
 * Phase 3.5 (Thomas, 2026-08-19): "the pulses are too similar to the edges
 * and they blur together... I envision more of a constellation with pulses of
 * light between the stars." The edge and its pulse used to be the SAME ink at
 * different opacities, so at 1.6px lines the moving element dissolved into
 * the line it rides. The fix keeps the hue (so a pulse still says which
 * family sent it — one colour per family is the ink system's whole premise)
 * but renders it as light: mixed two-thirds toward white and additively
 * blended, so it burns through whatever it crosses instead of alpha-blending
 * into it. Thomas floated literally INVERTING the edge colour instead; that
 * would put eleven complementary hues on screen that belong to no family —
 * magenta pulses on green EU edges reading as a twelfth family — so this is
 * the same separation bought without breaking the ink system. If it still
 * reads too edge-like on real hardware, raise the mix before reaching for
 * inversion.
 */
const PULSE_CORE_MIX = 0.66
const PULSE_OPACITY = 0.85

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
 * `paper` keeps the old solid-ink treatment for blueprint. The dark scene's
 * whitened additive core (see PULSE_CORE_MIX) is exactly wrong on paper:
 * additive blending over a white ground resolves to white-on-white and the
 * pulses vanish, while a solid dark ink drop is precisely what a technical
 * drawing wants. Part of the cache key, because a theme flip rebuilds the
 * graph's materials but this cache outlives the rebuild.
 */
export function pulseMaterial(
  colour: string,
  blink = false,
  paper = false,
): THREE.MeshBasicMaterial {
  const key = `${colour}|${blink ? 'blink' : 'steady'}|${paper ? 'paper' : 'dark'}`
  const cached = pulseMaterials.get(key)
  if (cached) return cached

  const material = paper
    ? new THREE.MeshBasicMaterial({
        color: new THREE.Color(colour),
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
      })
    : new THREE.MeshBasicMaterial({
        // The family ink pushed toward white: a hot core that still carries
        // its hue at the fringe. Semi-transparent AND additive — the alpha
        // keeps a lone pulse from reading as a solid bead, the blending makes
        // crossings brighten instead of muddying, which is what "light"
        // does and "paint" does not.
        color: new THREE.Color(colour).lerp(new THREE.Color('#ffffff'), PULSE_CORE_MIX),
        transparent: true,
        opacity: PULSE_OPACITY,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
  if (blink) blinkingPulseMaterials.add(material)
  pulseMaterials.set(key, material)
  return material
}
