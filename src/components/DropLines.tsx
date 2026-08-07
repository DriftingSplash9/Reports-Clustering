import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type ThreeForceGraph from 'three-forcegraph'

/**
 * A vertical stem from each node down to the floor.
 *
 * This is the cue that makes the scene actually read as three-dimensional.
 * A glowing sphere against black has no position — it could be small and near
 * or large and far. Give it a stem landing on a floor and the ambiguity
 * collapses: the landing point fixes it in the plane, and the stem's length
 * gives it height. Architectural drawings have used the trick forever.
 *
 * Positions are rewritten each frame because the force simulation keeps
 * moving. One buffer, two vertices per node, no allocation in the loop.
 */
export default function DropLines({
  forceGraph,
  floorY,
  visible,
}: {
  forceGraph: ThreeForceGraph
  floorY: number
  visible: boolean
}) {
  const lines = useRef<THREE.LineSegments>(null)

  const { geometry, material } = useMemo(() => {
    const nodes = (forceGraph.graphData().nodes ?? []) as unknown[]
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(nodes.length * 6), 3),
    )
    const material = new THREE.LineBasicMaterial({
      color: '#5f83bd',
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      // Same reasoning as the room: these stems are the depth cue, so fogging
      // them out with distance defeats their purpose.
      fog: false,
    })
    return { geometry, material }
  }, [forceGraph])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame(() => {
    if (!visible || !lines.current) return
    const nodes = (forceGraph.graphData().nodes ?? []) as {
      x?: number
      y?: number
      z?: number
    }[]
    const attr = geometry.getAttribute('position') as THREE.BufferAttribute
    const array = attr.array as Float32Array

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]
      const x = n.x ?? 0
      const y = n.y ?? 0
      const z = n.z ?? 0
      const o = i * 6
      array[o] = x
      array[o + 1] = y
      array[o + 2] = z
      array[o + 3] = x
      array[o + 4] = floorY
      array[o + 5] = z
    }
    attr.needsUpdate = true
    geometry.computeBoundingSphere()
  })

  return (
    <lineSegments
      ref={lines}
      geometry={geometry}
      material={material}
      visible={visible}
    />
  )
}
