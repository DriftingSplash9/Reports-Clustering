import * as THREE from 'three'
import type { GradientLinkMaterial } from './linkVisuals'
import { batchKey } from './photonInstancing'

/**
 * Link instancing — Revamp §9 step 6, second third (2026-09-05).
 *
 * Same mirror shape as `photonInstancing.ts`, and read that file's comment
 * first: three-forcegraph keeps building one cylinder `Mesh` per link
 * (`link.__lineObj`) and keeps positioning it every `tickFrame()`
 * (position at the source, `scale.z` = length, `lookAt` the target — its
 * `updateLinks`); `sync()` then hides that mesh and copies its transform
 * into an instance of a batch. What is different from the photons is the
 * MATERIAL: every link owns its own `GradientLinkMaterial`, and that
 * material is where the app keeps the link's state — from/to colour,
 * opacity (grade, trunk, tether, focus dim, trace lift), the beam flag, the
 * hover flag, `depthTest` (off for a lit link inside a trace so the chain
 * draws through the spheres), and `visible` (the Edges toggle hides lines
 * through their material so the pulses survive). None of that is re-homed.
 * The per-link material stays the source of truth that `setLinkFocus`,
 * `setLinkHover`, `setLinkFlow` and the Edges effect keep writing to; the
 * mirror reads those uniforms each frame and packs them into per-instance
 * attributes (`aFrom`, `aTo`, `aParams` = opacity/flow/hover), and ONE
 * instanced shader — the same fragment logic as `linkVisuals.ts`'s
 * `FRAGMENT`, fed by varyings instead of uniforms — draws the batch. The
 * two material-level states that cannot be per-instance split the batches:
 * `depthTest` (a lit-in-trace link is in the no-depth-test batch), and the
 * geometry (the library shares one `CylinderGeometry` per width bucket, so
 * a `linkWidth` re-assignment during `runFit` simply moves links between
 * keys). A link whose material is `visible = false` is skipped, which is
 * exactly what the Edges toggle asks for.
 *
 * `uFlowTime` is the one global: it is the same clock for every beam, so it
 * is a uniform on the batch material, written by `tickFlow()` from the same
 * `useFrame` that calls `tickLinkFlow` — the per-link materials still get it
 * too, harmlessly, since nothing draws them.
 *
 * Nothing here is pickable: the link hover picker (`nearestLinkAt`) works
 * in screen space off the graph data, never a raycast, so `raycast` is a
 * no-op and `frustumCulled` is off for the same reason as the photons.
 *
 * `renderOrder` 10 matches what the library sets on its link objects
 * ("render them last" — the comment in three-forcegraph's own source);
 * the transparent sort now sees one object per batch instead of 2,800, so
 * links no longer sort among themselves by distance. They never wrote
 * depth (see `depthWrite: false` in `gradientLinkMaterial`), so the only
 * thing that changes is the blend order of overlapping translucent lines,
 * which at LINK_OPACITY-level alphas is not a visible difference.
 */

type LineLink = { __lineObj?: THREE.Mesh }
type GraphLike = THREE.Object3D & { graphData(): { links: object[] } }

const VERTEX = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec3 aParams;
  varying float vT;
  varying vec3 vFrom;
  varying vec3 vTo;
  varying vec3 vParams;
  void main() {
    vT = clamp(position.z, 0.0, 1.0);
    vFrom = aFrom;
    vTo = aTo;
    vParams = aParams;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`

// Mirror of linkVisuals.ts FRAGMENT with the per-link uniforms replaced by
// varyings. Keep the two in step — the comments explaining each term live
// on the original.
const FRAGMENT = /* glsl */ `
  uniform float uFlowTime;
  varying float vT;
  varying vec3 vFrom;
  varying vec3 vTo;
  varying vec3 vParams;
  void main() {
    float uOpacity = vParams.x;
    float uFlow = vParams.y;
    float uHover = vParams.z;

    vec3 colour = mix(vFrom, vTo, smoothstep(0.0, 1.0, vT));

    if (uFlow > 0.5) {
      float phase = vT * 5.0 - uFlowTime * 0.6;
      float band = 0.5 + 0.5 * sin(6.28318530718 * phase);
      float brightness = pow(band, 4.0) * 0.6;
      colour = mix(colour, vec3(1.0), brightness);
    }

    colour = mix(colour, vec3(1.0), uHover * 0.55);
    float opacity = mix(uOpacity, max(uOpacity, 0.75), uHover);

    gl_FragColor = vec4(colour, opacity);
  }
`

interface Batch {
  mesh: THREE.InstancedMesh
  capacity: number
  from: THREE.InstancedBufferAttribute
  to: THREE.InstancedBufferAttribute
  params: THREE.InstancedBufferAttribute
}

export class LinkInstancer {
  private graph: GraphLike | null = null
  private batches = new Map<string, Batch>()
  private buckets = new Map<string, THREE.Mesh[]>()
  private readonly tmp = new THREE.Matrix4()
  private readonly materials: { depth: THREE.ShaderMaterial; noDepth: THREE.ShaderMaterial }
  private lastSyncMs = 0

  constructor() {
    const make = (depthTest: boolean) =>
      new THREE.ShaderMaterial({
        uniforms: { uFlowTime: { value: 0 } },
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        depthTest,
      })
    this.materials = { depth: make(true), noDepth: make(false) }
  }

  /** The beam clock — same value `tickLinkFlow` writes per material. */
  tickFlow(seconds: number) {
    this.materials.depth.uniforms.uFlowTime.value = seconds
    this.materials.noDepth.uniforms.uFlowTime.value = seconds
  }

  sync(graph: GraphLike) {
    const t0 = performance.now()
    if (graph !== this.graph) {
      this.dispose()
      this.graph = graph
    }

    for (const list of this.buckets.values()) list.length = 0
    const links = graph.graphData().links as LineLink[]
    for (const link of links) {
      const line = link.__lineObj
      if (!line || !line.isMesh) continue
      if (line.visible) line.visible = false
      const material = line.material as GradientLinkMaterial
      // The Edges toggle hides through the material; a hidden line draws
      // nowhere, same as before.
      if (!material.visible || !material.uniforms) continue
      const key = batchKey(line, line.geometry, null, material.depthTest ? 'd' : 'n')
      let list = this.buckets.get(key)
      if (!list) {
        list = []
        this.buckets.set(key, list)
      }
      list.push(line)
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
        // A clone, so the instanced attributes never land on the library's
        // shared cylinder geometry.
        const geometry = first.geometry.clone()
        const from = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3)
        const to = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3)
        const params = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3)
        from.setUsage(THREE.DynamicDrawUsage)
        to.setUsage(THREE.DynamicDrawUsage)
        params.setUsage(THREE.DynamicDrawUsage)
        geometry.setAttribute('aFrom', from)
        geometry.setAttribute('aTo', to)
        geometry.setAttribute('aParams', params)
        const depthTest = (first.material as THREE.Material).depthTest
        const mesh = new THREE.InstancedMesh(
          geometry,
          depthTest ? this.materials.depth : this.materials.noDepth,
          capacity,
        )
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
        mesh.frustumCulled = false
        mesh.raycast = () => {}
        mesh.name = 'link-batch'
        mesh.renderOrder = first.renderOrder
        graph.add(mesh)
        batch = { mesh, capacity, from, to, params }
        this.batches.set(key, batch)
      }
      const { mesh, from, to, params } = batch
      const fromArr = from.array as Float32Array
      const toArr = to.array as Float32Array
      const paramArr = params.array as Float32Array
      for (let i = 0; i < list.length; i++) {
        const line = list[i]
        this.tmp.compose(line.position, line.quaternion, line.scale)
        mesh.setMatrixAt(i, this.tmp)
        const u = (line.material as GradientLinkMaterial).uniforms
        const f = u.uFrom.value as THREE.Color
        const t = u.uTo.value as THREE.Color
        const o = i * 3
        fromArr[o] = f.r
        fromArr[o + 1] = f.g
        fromArr[o + 2] = f.b
        toArr[o] = t.r
        toArr[o + 1] = t.g
        toArr[o + 2] = t.b
        paramArr[o] = u.uOpacity.value as number
        paramArr[o + 1] = u.uFlow.value as number
        paramArr[o + 2] = u.uHover.value as number
      }
      mesh.count = list.length
      mesh.instanceMatrix.needsUpdate = true
      from.needsUpdate = true
      to.needsUpdate = true
      params.needsUpdate = true
    }
    this.lastSyncMs = performance.now() - t0
  }

  stats(): { links: number; batches: number; lastSyncMs: number } {
    let links = 0
    let batches = 0
    for (const b of this.batches.values()) {
      if (b.mesh.count > 0) {
        links += b.mesh.count
        batches++
      }
    }
    return { links, batches, lastSyncMs: this.lastSyncMs }
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
