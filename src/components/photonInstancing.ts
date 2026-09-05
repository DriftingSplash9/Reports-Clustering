import * as THREE from 'three'

/**
 * Photon instancing — Revamp §9 step 6, first third (2026-09-05).
 *
 * The 2026-09-04 census (memory `renderer_perf_measured_2026-09-04`): the
 * Everything tier is draw-call bound at 6,942 calls a frame, one per
 * drawable, and the ~2,000 photon teardrops are the cheap third of that —
 * they already share only ~15 materials (one `pulseMaterial` per ink ×
 * steady/blink) and a handful of bucketed `teardropGeometry` instances, so
 * they collapse onto one `InstancedMesh` per (geometry, material) pair with
 * no material work at all.
 *
 * **How, without forking three-forcegraph.** The library owns the photons:
 * it builds one `Mesh` per photon under `link.__photonsObj`, and every
 * `tickFrame()` advances `__progressRatio`, calls `lookAt` and writes
 * `position` on each (its `updatePhotons`). All of that stays. What changes
 * is that those meshes are never DRAWN: `sync()` runs right after
 * `tickFrame()` each frame, flips each photon `visible = false` (a mesh the
 * digest created this very frame is hidden here before the renderer sees
 * it), and copies its position + orientation into an instance slot of the
 * batch keyed by its geometry and material. The library's photon logic —
 * counts from `linkDirectionalParticles`, speed, the geometry swap on
 * scale change, blink materials animated by `tickPulseBlink` — is therefore
 * untouched, and a batch's material IS the shared `pulseMaterial`, so the
 * blink still happens per ink, once per frame, exactly as before.
 *
 * Cost of the mirror: one `Matrix4.compose` per photon per frame, no
 * allocation in the steady state (per-key photon lists are reused).
 *
 * A batch never shrinks (its buffer is the high-water mark for that key,
 * grown ×1.5 on overflow) and an idle batch just draws `count = 0`.
 * `frustumCulled` is off because the instances span the whole cloud and the
 * `InstancedMesh` bounding sphere is computed from the geometry alone; the
 * raycast is a no-op because photons were never pickable (the picker only
 * ever wanted nodes, and an instanced raycast over 2,000 teardrops on every
 * mouse move would be the one way to make this slower than before).
 *
 * The batches live inside the ForceGraph object itself, the same parent the
 * library gives `__photonsObj`, so instance matrices are in the same local
 * space as the photon positions being copied — the graph group's own
 * transform (if it ever gets one) applies to both equally.
 */

type PhotonLink = { __photonsObj?: THREE.Group }
type GraphLike = THREE.Object3D & { graphData(): { links: object[] } }

interface Batch {
  mesh: THREE.InstancedMesh
  capacity: number
}

const IDENTITY_SCALE = new THREE.Vector3(1, 1, 1)

interface KeyCache {
  __bg?: THREE.BufferGeometry
  __bm?: THREE.Material | null
  __bs?: string
  __bk?: string
}

/**
 * The batch key of a mirrored mesh, cached on its `userData` and rebuilt
 * only when its geometry, material or extra suffix changes — building a
 * string per object per frame was a measurable share of `sync()`.
 */
export function batchKey(
  obj: THREE.Object3D,
  geometry: THREE.BufferGeometry,
  /** Null when the batch is not split by material (links: every link owns
   * its own material, and the batch shader reads it as attributes). */
  material: THREE.Material | null,
  suffix: string,
): string {
  const c = obj.userData as KeyCache
  if (c.__bg !== geometry || c.__bm !== material || c.__bs !== suffix || c.__bk === undefined) {
    c.__bg = geometry
    c.__bm = material
    c.__bs = suffix
    c.__bk = `${geometry.uuid}|${material?.uuid ?? '-'}|${suffix}`
  }
  return c.__bk
}

export class PhotonInstancer {
  private graph: GraphLike | null = null
  private batches = new Map<string, Batch>()
  /** Per-key photon lists, reused across frames to avoid per-frame garbage. */
  private buckets = new Map<string, THREE.Mesh[]>()
  private readonly tmp = new THREE.Matrix4()
  /** Wall-clock cost of the last `sync()`, ms — read through `__rig.photons()`. */
  private lastSyncMs = 0

  /** Mirror this frame's photons into the instanced batches. Call once per
   * frame, immediately after `graph.tickFrame()`. */
  sync(graph: GraphLike) {
    const t0 = performance.now()
    if (graph !== this.graph) {
      this.dispose()
      this.graph = graph
    }

    // Gather. Buckets keep their arrays; only the lengths reset.
    for (const list of this.buckets.values()) list.length = 0
    const links = graph.graphData().links as PhotonLink[]
    for (const link of links) {
      const obj = link.__photonsObj
      if (!obj || obj.children.length === 0) continue
      for (const child of obj.children) {
        const photon = child as THREE.Mesh
        if (photon.visible) photon.visible = false
        const key = batchKey(photon, photon.geometry, photon.material as THREE.Material, '')
        let list = this.buckets.get(key)
        if (!list) {
          list = []
          this.buckets.set(key, list)
        }
        list.push(photon)
      }
    }

    // Write. A key with photons gets (or grows) a batch; every other batch
    // draws nothing this frame.
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
          batch.mesh.dispose()
        }
        const capacity = Math.ceil(Math.max(list.length, 16) * 1.5)
        const mesh = new THREE.InstancedMesh(
          first.geometry,
          first.material as THREE.Material,
          capacity,
        )
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
        mesh.frustumCulled = false
        mesh.raycast = () => {}
        mesh.name = 'photon-batch'
        // Same draw ordering the individual photons had: they were ordinary
        // transparent meshes in the graph group, drawn after the opaque nodes.
        mesh.renderOrder = first.renderOrder
        graph.add(mesh)
        batch = { mesh, capacity }
        this.batches.set(key, batch)
      }
      const { mesh } = batch
      for (let i = 0; i < list.length; i++) {
        const photon = list[i]
        this.tmp.compose(photon.position, photon.quaternion, IDENTITY_SCALE)
        mesh.setMatrixAt(i, this.tmp)
      }
      mesh.count = list.length
      mesh.instanceMatrix.needsUpdate = true
    }
    this.lastSyncMs = performance.now() - t0
  }

  /** Total photons mirrored last frame and the number of batch draws. */
  stats(): { photons: number; batches: number; lastSyncMs: number } {
    let photons = 0
    let batches = 0
    for (const b of this.batches.values()) {
      if (b.mesh.count > 0) {
        photons += b.mesh.count
        batches++
      }
    }
    return { photons, batches, lastSyncMs: this.lastSyncMs }
  }

  /** Remove every batch from its graph. Geometry and material are the
   * library's / the caches' — not disposed here. */
  dispose() {
    for (const batch of this.batches.values()) {
      batch.mesh.parent?.remove(batch.mesh)
      batch.mesh.dispose()
    }
    this.batches.clear()
    this.buckets.clear()
    this.graph = null
  }
}
