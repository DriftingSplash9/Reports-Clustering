import * as THREE from 'three'
import {
  DIM_LINK_COLOUR,
  DIM_LINK_OPACITY,
  LINK_OPACITY,
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

const dimColour = new THREE.Color(DIM_LINK_COLOUR)

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
  material.uniforms.uFrom.value.copy(lit ? from : dimColour)
  material.uniforms.uTo.value.copy(lit ? to : dimColour)
  material.uniforms.uOpacity.value = lit
    ? tracing
      ? Math.min(0.68, litOpacity * 2.2)
      : litOpacity
    : DIM_LINK_OPACITY
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
) {
  material.uniforms.uFogNear.value = near
  material.uniforms.uFogFar.value = far
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
 * Pulse material — unlit on purpose.
 *
 * A pulse is meant to read as a signal travelling, not as a small object being
 * lit. Lambert would let it darken on the side facing away from the lights,
 * which makes the same pulse mean different things at different points in an
 * orbit.
 */
export function pulseMaterial(colour: string): THREE.MeshBasicMaterial {
  const cached = pulseMaterials.get(colour)
  if (cached) return cached

  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(colour),
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
  })
  pulseMaterials.set(colour, material)
  return material
}
