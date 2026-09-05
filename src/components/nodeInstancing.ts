import * as THREE from 'three'
import { batchKey } from './photonInstancing'
import { rimFragmentTail, SOFT_POWER, type NodeMaterial } from './nodeVisuals'

/**
 * Node instancing — Revamp §9 step 6, the last third (2026-09-05).
 *
 * Same mirror shape as `photonInstancing.ts` and `linkInstancing.ts`, and
 * read those two comments first. three-forcegraph keeps building one sphere
 * `Mesh` per node (`node.__threeObj`, from our `nodeThreeObject`) and keeps
 * positioning it every `tickFrame()`; the app keeps mutating that mesh's
 * `NodeMaterial` in place (`applyFocus`: opacity, `transparent`, emissive,
 * rim, `raycast`; the `useFrame` breath: emissive + scale on orbs and soft
 * nodes; the hover grow; the lens recolour: `color`, `emissive`,
 * `uRimColour`). None of that moves. `sync()` hides the mesh each frame and
 * copies its transform and its material's state into an instance of a batch
 * keyed by (sphere geometry bucket, `transparent`, `depthWrite`) — the two
 * material flags that cannot be per-instance, because they decide which
 * render pass and depth behaviour the draw gets.
 *
 * Everything else that used to be a per-material uniform rides as a
 * per-instance attribute: fill colour, emitted light (colour × intensity,
 * premultiplied on the CPU), opacity, rim intensity, rim exponent, rim alpha
 * top-up, rim colour, and the soft flag. The batch material is a real
 * `MeshStandardMaterial` — same lighting, same env, same tone mapping as the
 * per-node one — with `onBeforeCompile` swapping the `diffuse`/`opacity`/
 * `emissive` uniforms for the varyings and appending the SAME rim/soft tail
 * (`rimFragmentTail` in nodeVisuals.ts is the single source for both).
 *
 * Picking is untouched: three's `Raycaster` ignores `visible`, so the hidden
 * spheres still answer `reportIdAt(e.object)` on hover and click, and
 * `applyFocus`'s `raycast` no-op on dimmed nodes still applies to them. The
 * batches have `raycast = () => {}`. `meshes.current`, the halo, the labels
 * and the fit all read the hidden meshes' positions and are unaffected.
 *
 * What changes visibly: nothing intended. What changes technically: dimmed
 * (transparent) nodes used to sort among themselves by distance in the
 * transparent pass and now draw in instance order within one batch. At
 * `DIM_NODE_OPACITY` alphas and with `depthWrite` still on for solid nodes,
 * that is not a visible difference — but it is the first place to look if
 * ghosted spheres ever look wrong in a trace.
 *
 * Revert: delete the `sync` call in `useFrame`. The library's spheres are
 * still there, hidden.
 */

type NodeDatum = { __threeObj?: THREE.Object3D }
type GraphLike = THREE.Object3D & { graphData(): { nodes: object[] } }

interface Batch {
  mesh: THREE.InstancedMesh
  capacity: number
  colour: THREE.InstancedBufferAttribute
  emissive: THREE.InstancedBufferAttribute
  params: THREE.InstancedBufferAttribute
  rimColour: THREE.InstancedBufferAttribute
}

/** The three (transparent, depthWrite) classes a node material can be in. */
type ClassKey = 'ow' | 'tw' | 'tn'

function classOf(m: THREE.Material): ClassKey {
  if (!m.transparent) return 'ow'
  return m.depthWrite ? 'tw' : 'tn'
}

function batchMaterial(cls: ClassKey): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    roughness: 0.4,
    metalness: 0.05,
    transparent: cls !== 'ow',
    depthWrite: cls !== 'tn',
  })
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uSoftPower = { value: SOFT_POWER }
    shader.vertexShader = shader.vertexShader
      .replace(
        'void main() {',
        `attribute vec3 aColour;
         attribute vec3 aEmissive;
         attribute vec4 aParams;
         attribute vec4 aRimColour;
         varying vec3 vIColour;
         varying vec3 vIEmissive;
         varying vec4 vIParams;
         varying vec4 vIRimColour;
         void main() {
           vIColour = aColour;
           vIEmissive = aEmissive;
           vIParams = aParams;
           vIRimColour = aRimColour;`,
      )
    shader.fragmentShader = shader.fragmentShader
      .replace(
        'void main() {',
        `uniform float uSoftPower;
         varying vec3 vIColour;
         varying vec3 vIEmissive;
         varying vec4 vIParams;
         varying vec4 vIRimColour;
         void main() {`,
      )
      // The per-material uniforms become the per-instance values. Both
      // strings are verbatim from three's meshphysical fragment (r185); if
      // an upgrade renames them the replace is a silent no-op and every
      // node draws white — the headless census will catch that immediately.
      .replace('vec4 diffuseColor = vec4( diffuse, opacity );', 'vec4 diffuseColor = vec4( vIColour, vIParams.x );')
      .replace('vec3 totalEmissiveRadiance = emissive;', 'vec3 totalEmissiveRadiance = vIEmissive;')
      .replace(
        '#include <dithering_fragment>',
        '#include <dithering_fragment>' +
          rimFragmentTail('vIRimColour.rgb', 'vIParams.z', 'vIParams.y', 'vIParams.w', 'vIRimColour.a', 'uSoftPower'),
      )
  }
  // One program for all three classes — the shader text is identical and
  // only the blend/depth state differs.
  material.customProgramCacheKey = () => 'node-instanced-v1'
  return material
}

export class NodeInstancer {
  private graph: GraphLike | null = null
  private batches = new Map<string, Batch>()
  private buckets = new Map<string, THREE.Mesh[]>()
  private readonly tmp = new THREE.Matrix4()
  private readonly materials: Record<ClassKey, THREE.MeshStandardMaterial> = {
    ow: batchMaterial('ow'),
    tw: batchMaterial('tw'),
    tn: batchMaterial('tn'),
  }
  private lastSyncMs = 0

  sync(graph: GraphLike) {
    const t0 = performance.now()
    if (graph !== this.graph) {
      this.dispose()
      this.graph = graph
    }

    for (const list of this.buckets.values()) list.length = 0
    const nodes = graph.graphData().nodes as NodeDatum[]
    for (const node of nodes) {
      const obj = node.__threeObj as THREE.Mesh | undefined
      if (!obj || !obj.isMesh) continue
      if (obj.visible) obj.visible = false
      const material = obj.material as NodeMaterial
      if (!material.userData || !material.userData.rim) continue
      const key = batchKey(obj, obj.geometry, null, classOf(material))
      let list = this.buckets.get(key)
      if (!list) {
        list = []
        this.buckets.set(key, list)
      }
      list.push(obj)
    }

    for (const [key, batch] of this.batches) {
      const list = this.buckets.get(key)
      if (!list || list.length === 0) batch.mesh.count = 0
    }
    for (const [key, list] of this.buckets) {
      if (list.length === 0) continue
      const first = list[0]
      let batch = this.batches.get(key)
      if (!batch || batch.capacity < list.length) {
        if (batch) {
          graph.remove(batch.mesh)
          batch.mesh.geometry.dispose()
          batch.mesh.dispose()
        }
        const capacity = Math.ceil(Math.max(list.length, 16) * 1.5)
        // A clone, so the instanced attributes never land on the shared
        // `sphereCache` geometry the library's meshes still reference.
        const geometry = first.geometry.clone()
        const attr = (n: number) => {
          const a = new THREE.InstancedBufferAttribute(new Float32Array(capacity * n), n)
          a.setUsage(THREE.DynamicDrawUsage)
          return a
        }
        const colour = attr(3)
        const emissive = attr(3)
        const params = attr(4)
        const rimColour = attr(4)
        geometry.setAttribute('aColour', colour)
        geometry.setAttribute('aEmissive', emissive)
        geometry.setAttribute('aParams', params)
        geometry.setAttribute('aRimColour', rimColour)
        const mesh = new THREE.InstancedMesh(geometry, this.materials[classOf(first.material as THREE.Material)], capacity)
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
        mesh.frustumCulled = false
        mesh.raycast = () => {}
        mesh.name = 'node-batch'
        mesh.renderOrder = first.renderOrder
        graph.add(mesh)
        batch = { mesh, capacity, colour, emissive, params, rimColour }
        this.batches.set(key, batch)
      }
      const { mesh, colour, emissive, params, rimColour } = batch
      const cArr = colour.array as Float32Array
      const eArr = emissive.array as Float32Array
      const pArr = params.array as Float32Array
      const rArr = rimColour.array as Float32Array
      for (let i = 0; i < list.length; i++) {
        const obj = list[i]
        this.tmp.compose(obj.position, obj.quaternion, obj.scale)
        mesh.setMatrixAt(i, this.tmp)
        const m = obj.material as NodeMaterial
        const ud = m.userData
        const o3 = i * 3
        const o4 = i * 4
        cArr[o3] = m.color.r
        cArr[o3 + 1] = m.color.g
        cArr[o3 + 2] = m.color.b
        // The renderer folds `emissiveIntensity` into the `emissive` uniform
        // before upload; do the same here so the shader tail is one term.
        const k = m.emissiveIntensity
        eArr[o3] = m.emissive.r * k
        eArr[o3 + 1] = m.emissive.g * k
        eArr[o3 + 2] = m.emissive.b * k
        pArr[o4] = m.opacity
        pArr[o4 + 1] = ud.rim.value
        pArr[o4 + 2] = ud.rimPower
        pArr[o4 + 3] = ud.rimAlpha
        const rc = ud.uRimColour.value
        rArr[o4] = rc.r
        rArr[o4 + 1] = rc.g
        rArr[o4 + 2] = rc.b
        rArr[o4 + 3] = ud.soft
      }
      mesh.count = list.length
      mesh.instanceMatrix.needsUpdate = true
      colour.needsUpdate = true
      emissive.needsUpdate = true
      params.needsUpdate = true
      rimColour.needsUpdate = true
    }
    this.lastSyncMs = performance.now() - t0
  }

  stats(): { nodes: number; batches: number; lastSyncMs: number } {
    let nodes = 0
    let batches = 0
    for (const b of this.batches.values()) {
      if (b.mesh.count > 0) {
        nodes += b.mesh.count
        batches++
      }
    }
    return { nodes, batches, lastSyncMs: this.lastSyncMs }
  }

  dispose() {
    for (const batch of this.batches.values()) {
      batch.mesh.parent?.remove(batch.mesh)
      batch.mesh.geometry.dispose()
      batch.mesh.dispose()
    }
    this.batches.clear()
    this.buckets.clear()
    this.graph = null
  }
}
