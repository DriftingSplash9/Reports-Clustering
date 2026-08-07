import { useMemo } from 'react'
import * as THREE from 'three'
import type { ViewSettings } from '../lib/view'

/**
 * The wireframe box marking the extent of the network.
 *
 * Its parallel edges converge under perspective, so it reports the depth of the
 * scene before a single node is drawn. Off by default; it answers a specific
 * question about the layout and is noise when that question is not being asked.
 *
 * **The platform slab used to live here and has been deleted.** It was sized to
 * the data and grew with it, and by 121 nodes it had become a wall: from most
 * viewing angles it either occluded the lower half of the network or forced the
 * camera into a downward look to clear it. Worse, the camera auto-fit measured
 * the slab rather than the nodes, which is why the graph opened small and far
 * away above a large empty floor.
 *
 * The infinite ground grid in Environment.tsx does the same job better. Its
 * cells are a fixed size, so it reports scale by how many the graph spans
 * rather than by how big it is, and it is never between you and a node.
 *
 * Note what is *not* here: nothing in this room encodes anything about the
 * reports. It is scale reference and depth cue only. An earlier version drew
 * horizontal bands at fixed heights for each jurisdiction level, which implied
 * a vertical ordering that does not exist — see the note on JurisdictionLevel
 * in types.ts. The room describes the space; the graph describes the data.
 */

/**
 * Clearance between the node cloud and the floor or ceiling, as a fraction of
 * the cloud's own radius.
 *
 * This was a fixed 55 units, chosen when the graph was 30 nodes. The layout has
 * since roughly doubled in extent, and a constant gap under a slab that keeps
 * growing does not read as a constant gap — it reads as the platform drifting
 * away from the network. Proportional keeps the room the same shape at any
 * size, which is the whole point of having a room.
 */
const MARGIN_RATIO = 0.16

/** Floor for very small graphs, where a proportional margin would vanish. */
const MIN_MARGIN = 40

export function frameGeometry(radius: number, minY: number, maxY: number) {
  const margin = Math.max(MIN_MARGIN, radius * MARGIN_RATIO)
  return {
    top: maxY + margin,
    bottom: minY - margin,
    extent: Math.max(radius * 1.12, 120),
  }
}

/**
 * The room must not be fogged.
 *
 * Fog is keyed to the node cloud, but the floor and box extend well past it in
 * depth, so scene fog fades exactly the parts furthest away — which are the
 * parts carrying the perspective information the room exists to provide.
 */
function roomMaterial<T extends THREE.Material>(material: T): T {
  // `fog` exists on every built-in material but is not on the base type.
  ;(material as THREE.Material & { fog?: boolean }).fog = false
  material.depthWrite = false
  material.transparent = true
  return material
}

export default function SpaceFrame({
  centre,
  radius,
  minY,
  maxY,
  view,
}: {
  centre: THREE.Vector3
  radius: number
  minY: number
  maxY: number
  view: ViewSettings
}) {
  const { top, bottom, extent } = useMemo(
    () => frameGeometry(radius, minY, maxY),
    [radius, minY, maxY],
  )

  const cube = useMemo(() => {
    const box = new THREE.BoxGeometry(extent * 2, top - bottom, extent * 2)
    const lines = new THREE.LineSegments(
      new THREE.EdgesGeometry(box),
      roomMaterial(
        new THREE.LineBasicMaterial({ color: '#7ea0d8', opacity: 0.42 }),
      ),
    )
    lines.position.set(centre.x, (top + bottom) / 2, centre.z)
    return lines
  }, [centre, extent, top, bottom])

  return <group>{view.showCube && <primitive object={cube} />}</group>
}
