import * as THREE from 'three'

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
  hollow = false,
}: {
  colour: string
  rimColour: string
  radius: number
  emissive: number
  lit: boolean
  dimOpacity: number
  dimEmissive: number
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

  const rim = { value: lit ? 1 : 0.25 }
  material.userData = { rim, litOpacity: hollow ? HOLLOW_FILL_OPACITY : 1 }

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uRimColour = { value: new THREE.Color(rimColour) }
    // A hollow node's band is held wide and shallow on purpose. `rimPower`
    // exists to keep a *thin* highlight constant across node sizes; here the
    // rim is not a highlight, it is the whole node, so the exponent is pinned
    // low to give a border with visible thickness instead of a hairline.
    shader.uniforms.uRimPower = { value: hollow ? 1.5 : rimPower(radius) }
    shader.uniforms.uRim = rim
    // How much the rim contributes to alpha. On a solid node this is a small
    // top-up that keeps the silhouette from fading out when dimmed. On a hollow
    // one it is doing all the work, because the fill has been emptied.
    shader.uniforms.uRimAlpha = { value: hollow ? 0.95 : 0.45 }

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

/** Match the rim to the node's focus state. */
export function setNodeRim(material: NodeMaterial, lit: boolean) {
  material.userData.rim.value = lit ? 1 : 0.25
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
