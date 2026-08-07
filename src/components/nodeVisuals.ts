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
