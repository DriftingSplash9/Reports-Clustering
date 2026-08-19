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
  const rim = { value: (lit ? 1 : 0.07) * rimMax }
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
/**
 * Cached by rounded radius.
 *
 * This used to allocate a fresh `SphereGeometry` per node — 1 250 of them at
 * the Everything tier, each with 24×16 segments, every one a separate GPU
 * buffer upload, and all of them differing only in a radius that is a
 * continuous function of `size_score` and therefore almost never repeated
 * exactly. Bucketing to a tenth of a world unit collapses that to a few dozen
 * distinct geometries, because `radiusFor` spans 3.4 to 8.
 *
 * A tenth of a unit is far below one screen pixel at any framing this scene
 * uses, so nothing is visibly quantised. Note the meshes are scaled at
 * runtime by `nodeScale` anyway, which is a transform and costs nothing —
 * the geometry only carries the base radius.
 *
 * Nothing in this project disposes node geometry (three-forcegraph owns the
 * meshes and can recreate them without warning), so sharing is strictly safer
 * than allocating: a shared geometry cannot be disposed out from under a mesh
 * that is still using it.
 */
const sphereCache = new Map<number, THREE.SphereGeometry>()

export function nodeGeometry(
  _level: JurisdictionLevel,
  radius: number,
  _orb: boolean,
): THREE.BufferGeometry {
  const key = Math.round(radius * 10) / 10
  const cached = sphereCache.get(key)
  if (cached) return cached
  const geometry = new THREE.SphereGeometry(key, 24, 16)
  sphereCache.set(key, geometry)
  return geometry
}

/** Match the rim to the node's focus state — scaled by the family's rimMax,
 * so a no-rim family (Africa) stays rimless through every focus change.
 *
 * The dim factor fell 0.25 → 0.07 in round 8: with the bold-rim system, 0.25
 * of a bold ring was still a clearly visible ring, and several hundred
 * clearly visible rings is why tracing a chain stopped reading as a chain.
 * Out-of-focus nodes keep a ghost of a silhouette; they no longer keep a
 * ring.
 *
 * `dimFactor` is a parameter since round 9 because blueprint mode needs the
 * OLD number back on purpose: on paper the dimmed fill is invisible by
 * construction (white on near-white), so the rim is the whole ghost, and a
 * quarter-strength dark-ink ring on paper is the pencil underdrawing — not
 * the wall of rings it was on the dark scene. Same number, opposite meaning,
 * because the ground flipped. */
export function setNodeRim(material: NodeMaterial, lit: boolean, dimFactor = 0.07) {
  material.userData.rim.value = (lit ? 1 : dimFactor) * material.userData.rimMax
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

/**
 * The selection halo — one screen-space sprite, not a per-node treatment.
 *
 * **Why this exists rather than more bloom.** Selection glow was
 * `emissiveIntensity + 0.25`, and the visible halo came entirely from the
 * `<Bloom>` pass. Bloom is screen-space and energy-proportional: a node six
 * pixels across contributes almost no bright pixels, so its halo is a couple
 * of pixels, which is why selection only read once you had zoomed in. That is
 * not tunable — turning bloom up blows out the *large* nodes long before it
 * does anything for a small one, and apparent size is the authority encoding
 * the whole project rests on. Below about a 0.15 threshold most of the graph
 * blooms and that encoding stops working.
 *
 * So the halo becomes its own element: one camera-facing sprite, additive,
 * radial falloff, rescaled every frame to hold a **constant pixel radius** at
 * any zoom. One object in the scene regardless of corpus size, no per-node
 * cost, and — because it owes nothing to the post-processing stack — it works
 * in blueprint mode too, where bloom is zeroed and selection currently has no
 * glow at all.
 *
 * `depthTest` is off on purpose. A selected node on the far side of the cloud
 * would otherwise have its halo eaten by everything in front of it, and
 * "where did my selection go" is precisely the question this is here to
 * answer. The cost is that the halo draws over occluders; at a soft radial
 * falloff and additive blending that reads as a glow through the graph rather
 * than as a sticker on top of it.
 */
const HALO_TEXTURE_SIZE = 128

function haloTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = HALO_TEXTURE_SIZE
  canvas.height = HALO_TEXTURE_SIZE
  const ctx = canvas.getContext('2d')!
  const half = HALO_TEXTURE_SIZE / 2
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half)
  // Hollow in the middle: the node itself is already there and the point is to
  // ring it, not to paint over it. The stops are a soft shoulder rather than a
  // hard ring so it reads as light coming off the node.
  gradient.addColorStop(0.0, 'rgba(255,255,255,0.00)')
  gradient.addColorStop(0.42, 'rgba(255,255,255,0.10)')
  gradient.addColorStop(0.62, 'rgba(255,255,255,0.55)')
  gradient.addColorStop(0.78, 'rgba(255,255,255,0.22)')
  gradient.addColorStop(1.0, 'rgba(255,255,255,0.00)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, HALO_TEXTURE_SIZE, HALO_TEXTURE_SIZE)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function selectionHalo(): THREE.Sprite {
  const material = new THREE.SpriteMaterial({
    map: haloTexture(),
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const sprite = new THREE.Sprite(material)
  sprite.visible = false
  // Above everything, including the transparent node pass.
  sprite.renderOrder = 999
  // Never a hover or click target — it sits in front of the node it is
  // advertising, and transparency does not stop a raycast.
  sprite.raycast = () => {}
  return sprite
}

/**
 * Point the halo at a node, at a size measured in screen pixels rather than
 * world units.
 *
 * A sprite of scale `s` at distance `d` covers `s · canvasHeight /
 * (2 · d · tan(halfFov))` pixels, so holding the pixel size constant means
 * solving that for `s` every frame. Doing it any other way — a fixed world
 * size, a size derived from the node's radius — gives a halo that vanishes
 * when you zoom out, which is exactly when you need it.
 */
export function placeSelectionHalo(
  sprite: THREE.Sprite,
  worldPosition: THREE.Vector3,
  cameraPosition: THREE.Vector3,
  halfFovRadians: number,
  canvasHeight: number,
  diameterInPixels: number,
) {
  sprite.position.copy(worldPosition)
  const distance = cameraPosition.distanceTo(worldPosition)
  const scale = (diameterInPixels * 2 * distance * Math.tan(halfFovRadians)) / canvasHeight
  sprite.scale.set(scale, scale, 1)
}

/**
 * Blueprint has no light to add to — additive blending against paper is
 * invisible by construction. There the halo becomes a soft normal-blended
 * smudge in the family's own ink, which is what a draughtsman circling
 * something actually looks like.
 */
export function setHaloTheme(sprite: THREE.Sprite, colour: string, blueprint: boolean) {
  const material = sprite.material as THREE.SpriteMaterial
  material.color.set(colour)
  material.blending = blueprint ? THREE.NormalBlending : THREE.AdditiveBlending
  material.opacity = blueprint ? 0.5 : 1
  material.needsUpdate = true
}
