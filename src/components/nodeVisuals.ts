import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

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
  }
}

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
}: {
  colour: string
  rimColour: string
  radius: number
  emissive: number
  lit: boolean
  dimOpacity: number
  dimEmissive: number
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
    opacity: lit ? 1 : dimOpacity,
  }) as NodeMaterial

  const rim = { value: lit ? 1 : 0.25 }
  material.userData = { rim }

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uRimColour = { value: new THREE.Color(rimColour) }
    shader.uniforms.uRimPower = { value: rimPower(radius) }
    shader.uniforms.uRim = rim

    shader.fragmentShader = shader.fragmentShader
      .replace(
        'void main() {',
        `uniform vec3 uRimColour;
         uniform float uRimPower;
         uniform float uRim;
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
         gl_FragColor.a = clamp(gl_FragColor.a + fresnel * uRim * 0.45, 0.0, 1.0);`,
      )
  }

  return material
}

/** Match the rim to the node's focus state. */
export function setNodeRim(material: NodeMaterial, lit: boolean) {
  material.userData.rim.value = lit ? 1 : 0.25
}

/**
 * A flag, for a one-off instrument that will never be published again.
 *
 * Thomas's idea, 2026-08-10 (Q5), and the measurement backs it: 108 of the 555
 * nodes are treaties, statutes and standing instruments with no publication
 * rate. Only two of them are in the top 50 by authority and the most
 * depended-upon of the entire set has three dependents. They are not hubs —
 * they are a fifth of the graph drawn as though it were the same kind of thing
 * as a monthly index, and they pile up.
 *
 * **Shape carries this, not colour** (Q6). Blue was the obvious candidate and
 * is already reserved: 198°-234° is the Africa family in `palette.ts`, and that
 * file protects gaps between nine families with explicit do-not-touch warnings.
 * Hue is nearly exhausted; shape is a completely free channel. So a flag keeps
 * its own country's colour and its own country rim, and only its silhouette
 * says "instrument, not publication".
 *
 * Built as one merged geometry rather than a group, because everything
 * downstream — focus dimming, the hover raycast, the mesh registry — is typed
 * to a single Mesh, and a Group would have meant touching all of it.
 *
 * The banner has real depth (0.16r rather than a plane) for a reason that only
 * shows up in 3D: a flat quad vanishes edge-on, and in an orbiting scene a
 * fifth of the nodes disappearing at certain angles is worse than the pile-up
 * this is meant to fix.
 */
export function flagGeometry(radius: number): THREE.BufferGeometry {
  // Sized to occupy roughly the visual weight of the sphere it replaces, so
  // authority still reads as size across both shapes.
  const r = radius * 1.15

  const pole = new THREE.CylinderGeometry(r * 0.11, r * 0.11, r * 2.9, 8)
  pole.translate(-r * 0.55, 0, 0)

  const banner = new THREE.BoxGeometry(r * 1.5, r * 0.95, r * 0.16)
  banner.translate(r * 0.2, r * 0.92, 0)

  const merged = mergeGeometries([pole, banner], false)
  pole.dispose()
  banner.dispose()

  // mergeGeometries returns null only on attribute mismatch, which cannot
  // happen for two of three.js's own primitives — but the type says it can.
  return merged ?? new THREE.SphereGeometry(radius, 16, 12)
}

/** A report with no next edition. See `flagGeometry` and `releases_per_year`. */
export function isStandingInstrument(report: { releases_per_year?: number }): boolean {
  return report.releases_per_year === undefined
}
