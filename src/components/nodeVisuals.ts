import * as THREE from 'three'
import type { JurisdictionLevel } from '../lib/types'
import type { RimWeight } from '../lib/palette'

/**
 * The node material: a standard lit sphere with a country-coloured rim.
 *
 * A sphere in a rotating 3D scene has no border. The equivalent is a **fresnel
 * rim** — brightness that rises where the surface turns away from the camera,
 * which is what an edge-lit object looks like and what the eye already reads as
 * an outline. It follows the silhouette from every angle for free, which a
 * drawn border could not do.
 *
 * Built with `onBeforeCompile` rather than as a custom ShaderMaterial, so the
 * material stays a real MeshStandardMaterial. Everything else in the renderer
 * mutates `opacity` and `emissiveIntensity` on these in place, and a hand-
 * written replacement would have meant re-implementing the lighting to keep
 * that working.
 */

export interface NodeMaterial extends THREE.MeshStandardMaterial {
  userData: {
    /** Rim intensity, dimmed along with the node when out of focus. */
    rim: { value: number }
    /**
     * The rim intensity this material is allowed to reach — 0 for a family
     * with no rim (Africa), 1 for everyone else. `setNodeRim` scales against
     * this instead of writing absolute values, or the focus pass would
     * quietly switch Africa's ring back on with every trace.
     */
    rimMax: number
    /**
     * The material's opacity when it *is* in focus.
     *
     * Not always 1: a hollow node is deliberately barely-there even when lit,
     * and the focus pass has to restore it to that value rather than to full.
     * Before this existed, lighting a hollow node filled it in solid, which
     * meant the one-off instruments changed shape whenever they were traced.
     */
    litOpacity: number
  }
}

/**
 * Fill opacity of a hollow node. Low enough to read as empty, high enough that
 * the sphere still occludes what is directly behind it — at zero the rim reads
 * as a ring floating in front of the graph rather than as a surface.
 */
const HOLLOW_FILL_OPACITY = 0.1

/**
 * Rim sharpness scales with the node's radius.
 *
 * A fresnel band occupies a fixed *fraction* of a sphere's silhouette, so at a
 * constant exponent the rim on a radius-2.2 node is a quarter the width of the
 * one on a radius-8 node — thinnest exactly where the fill is smallest and the
 * country cue is most needed. Raising the exponent with radius holds the band
 * closer to a constant width on screen, so a small peripheral node still
 * declares which system it belongs to.
 */
function rimPower(radius: number): number {
  return Math.min(5, Math.max(1.3, radius * 0.6))
}

export function nodeMaterial({
  colour,
  rimColour,
  radius,
  emissive,
  lit,
  dimOpacity,
  dimEmissive,
  rimWeight = 'normal',
  hollow = false,
  orb = false,
}: {
  colour: string
  rimColour: string
  radius: number
  emissive: number
  lit: boolean
  dimOpacity: number
  dimEmissive: number
  /**
   * Palette v2's family channel — how heavily the ring is drawn. 'bold' is
   * the US red / INT+NZ white treatment, 'thick' the EU lime, 'none' turns
   * the ring off entirely (Africa). A hollow node overrides 'none' upward:
   * its rim is the whole node, and a family styling choice must not make a
   * fifth of a family's one-off instruments invisible.
   */
  rimWeight?: RimWeight
  /**
   * Draw the node as an outline rather than a solid — the treatment for a
   * one-off instrument. See `isStandingInstrument`.
   *
   * Implemented by emptying the fill and thickening the existing fresnel rim
   * rather than by swapping in ring geometry, which matters in a scene you can
   * orbit: a torus or a disc vanishes edge-on, and a fifth of the nodes
   * disappearing at certain angles would be worse than the problem being fixed.
   * A fresnel rim follows the silhouette from every direction by construction,
   * so a hollow sphere reads as a circle with a border no matter where the
   * camera is.
   */
  hollow?: boolean
  /**
   * Draw the node as a collapsed group — a solid sphere (unlike `hollow`,
   * this is real aggregated substance, not the absence of cadence) with a
   * wider, brighter rim than an ordinary node gets, so an orb reads as "a
   * group, double-click to open" at a glance rather than as one more report.
   * Mutually exclusive with `hollow` in practice — see `isOrbId` guard at the
   * call site — but not enforced here, since a material has no way to know
   * which of two boolean options its caller meant to be authoritative.
   */
  orb?: boolean
}): NodeMaterial {
  const material = new THREE.MeshStandardMaterial({
    color: colour,
    emissive: colour,
    emissiveIntensity: lit ? emissive : dimEmissive,
    roughness: 0.4,
    metalness: 0.05,
    // Enabled up front. Switching `transparent` on a live material forces a
    // shader recompile, which stutters at the exact moment the user clicks.
    transparent: true,
    opacity: lit ? (hollow ? HOLLOW_FILL_OPACITY : 1) : Math.min(dimOpacity, hollow ? HOLLOW_FILL_OPACITY : 1),
  }) as NodeMaterial

  // A hollow node's rim IS the node, so a family's 'none' is promoted to
  // 'normal' there rather than letting a styling rule erase the geometry.
  const weight: RimWeight = hollow && rimWeight === 'none' ? 'normal' : rimWeight
  const rimMax = weight === 'none' ? 0 : 1
  const rim = { value: (lit ? 1 : 0.25) * rimMax }
  material.userData = { rim, rimMax, litOpacity: hollow ? HOLLOW_FILL_OPACITY : 1 }

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uRimColour = { value: new THREE.Color(rimColour) }
    // A hollow node's band is held wide and shallow on purpose. `rimPower`
    // exists to keep a *thin* highlight constant across node sizes; here the
    // rim is not a highlight, it is the whole node, so the exponent is pinned
    // low to give a border with visible thickness instead of a hairline. An
    // orb keeps its fill but borrows the same wide band, pinned less low than
    // hollow's — enough to read as a distinct, thicker ring than an ordinary
    // node's thin fresnel highlight without swallowing the fill entirely.
    //
    // Palette v2 adds the family weights on top: 'bold' pulls the exponent
    // down harder than 'thick', which pulls harder than 'normal' — a lower
    // exponent is a wider band. Alpha rises with the same ladder so a bold
    // ring also holds the silhouette more firmly.
    const base = rimPower(radius)
    const weighted =
      weight === 'bold'
        ? Math.max(1.05, base * 0.4)
        : weight === 'thick'
          ? Math.max(1.2, base * 0.55)
          : base
    shader.uniforms.uRimPower = { value: hollow ? 1.5 : orb ? 2.2 : weighted }
    shader.uniforms.uRim = rim
    // How much the rim contributes to alpha. On a solid node this is a small
    // top-up that keeps the silhouette from fading out when dimmed. On a hollow
    // one it is doing all the work, because the fill has been emptied. An orb
    // sits between the two: a stronger top-up than an ordinary node, short of
    // hollow's full weight, because the fill is still doing real work here.
    shader.uniforms.uRimAlpha = {
      value: hollow ? 0.95 : orb ? 0.75 : weight === 'bold' ? 0.75 : weight === 'thick' ? 0.6 : 0.45,
    }

    shader.fragmentShader = shader.fragmentShader
      .replace(
        'void main() {',
        `uniform vec3 uRimColour;
         uniform float uRimPower;
         uniform float uRim;
         uniform float uRimAlpha;
         void main() {`,
      )
      // Added after the lighting has resolved, so the rim is a light on top of
      // the node rather than a change to its colour — the fill still reads as
      // the fill. `dithering_fragment` is the last chunk in the chain and is
      // present in every three.js version this project has run against, unlike
      // output_fragment, which was renamed.
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
         float facing = abs(dot(normalize(vNormal), normalize(vViewPosition)));
         float fresnel = pow(1.0 - facing, uRimPower);
         // Mixed toward the rim colour, not added to it.
         //
         // Adding was the first attempt and it failed for the same reason flag
         // colours would have: amber light on top of a blue fill resolves to
         // near-white at the silhouette, so all three countries converged on
         // the same pale edge — and bloom then amplified it. Mixing replaces
         // the colour instead of brightening it, so the rim keeps its hue, and
         // because it adds no luminance the glow pass leaves it alone.
         gl_FragColor.rgb = mix(gl_FragColor.rgb, uRimColour, fresnel * uRim);
         // Keep the silhouette from fading out with a dimmed node, or the rim
         // disappears exactly when the fill is hardest to read.
         gl_FragColor.a = clamp(gl_FragColor.a + fresnel * uRim * uRimAlpha, 0.0, 1.0);`,
      )
  }

  return material
}

/**
 * Every node is a sphere. Full stop — since 2026-08-12, Thomas's round-5 Q14.
 *
 * The tier-shape system (icosahedron/cube/octahedron/tetrahedron/capsule,
 * 2026-08-12 morning) lasted one day, and the thing that killed it is physics,
 * not taste: the fresnel rim brightens where the surface curves away from the
 * camera, which on a smooth sphere traces a clean ring — and on a flat-faceted
 * solid, where each face has a single normal, lights whole faces at once as
 * they tilt. "The way the rim works on the shapes is rediculous" (Thomas,
 * looking at it live) is that fact observed from the outside. With palette v2
 * making rims the family channel AND the edge ink, the rim had to win.
 *
 * **Never reintroduce faceted node geometry while fresnel rims exist.**
 *
 * What carries the level now: the fill ramp (dark→light down the ladder), the
 * single-country recolour, the by-level filter, and the hover card — level is
 * an on-demand channel, identity (family) is the always-on one. The per-tier
 * size multipliers the shapes needed are gone with them; a sphere of radius r
 * is a sphere of radius r, and size means authority again with no correction
 * table.
 *
 * `level` stays in the signature so call sites don't churn if a future
 * treatment wants it; it is deliberately unread.
 */
export function nodeGeometry(
  _level: JurisdictionLevel,
  radius: number,
  _orb: boolean,
): THREE.BufferGeometry {
  return new THREE.SphereGeometry(radius, 24, 16)
}

/** Match the rim to the node's focus state — scaled by the family's rimMax,
 * so a no-rim family (Africa) stays rimless through every focus change. */
export function setNodeRim(material: NodeMaterial, lit: boolean) {
  material.userData.rim.value = (lit ? 1 : 0.25) * material.userData.rimMax
}

/**
 * A one-off instrument is drawn **hollow** — see the `hollow` option on
 * `nodeMaterial`.
 *
 * This replaced a flag glyph on 2026-08-10, same day, on Thomas's second look:
 * "I don't like how the flags stick out so much." He was right, and the reason
 * is worth writing down rather than just deleting the code. A flag is a *loud*
 * silhouette — it has a mast, an asymmetric banner and a preferred orientation,
 * so at a fifth of the nodes it read as a field of markers planted in the
 * graph, and it pulled attention in exact proportion to how little these nodes
 * matter structurally. They are the least connected fifth of the corpus.
 *
 * A hollow sphere is the opposite kind of distinction: it is quieter than a
 * solid one, not louder, which matches what the thing actually is — a document
 * that will never be published again and cannot therefore be a source of new
 * influence. Absence of fill for absence of cadence.
 */
export function isStandingInstrument(report: { releases_per_year?: number }): boolean {
  return report.releases_per_year === undefined
}
