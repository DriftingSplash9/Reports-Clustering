import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { fitSync } from './InfluenceGraph'

/**
 * Keeps the zoom slider and the camera in agreement, in both directions.
 *
 * Moving the slider pushes the camera along its current view direction, so
 * zooming never changes the angle you were looking from. Scrolling the mouse
 * wheel pushes the slider back the other way, so the two controls can't drift
 * apart and start fighting each other.
 */
export default function CameraZoom({
  zoom,
  fitDistance,
  onZoomChange,
}: {
  zoom: number
  fitDistance: number
  onZoomChange: (zoom: number) => void
}) {
  const { camera, controls } = useThree()
  const applied = useRef(zoom)

  // Slider → camera.
  useEffect(() => {
    if (!fitDistance) return
    if (Math.abs(applied.current - zoom) < 0.0005) return
    applied.current = zoom

    const orbit = controls as unknown as { target: THREE.Vector3; update(): void }
    const target = orbit?.target ?? new THREE.Vector3()
    const direction = camera.position.clone().sub(target)
    const current = direction.length()
    if (current < 1e-6) return

    direction.multiplyScalar((fitDistance * zoom) / current)
    camera.position.copy(target).add(direction)
    orbit?.update?.()
  }, [zoom, fitDistance, camera, controls])

  // Camera → slider, for wheel zoom.
  //
  // Reads `fitSync`, not the `fitDistance` prop, and that difference is the
  // whole correctness of this direction — see the note on `fitSync` in
  // InfluenceGraph.tsx. The prop is a render behind the camera whenever the
  // scene re-fits, and dividing the new camera distance by the old fit distance
  // produces a large phantom zoom which this then feeds straight back into the
  // camera, throwing the graph off screen.
  const seenStamp = useRef(fitSync.stamp)
  useFrame(() => {
    // A fit just placed the camera at exactly the fit distance, so the zoom is
    // 1 by construction. Re-baseline and skip the frame rather than inferring
    // anything from a camera this component did not move.
    if (fitSync.stamp !== seenStamp.current) {
      seenStamp.current = fitSync.stamp
      applied.current = 1
      if (Math.abs(zoom - 1) > 0.0005) onZoomChange(1)
      return
    }
    const base = fitSync.distance || fitDistance
    if (!base) return
    const orbit = controls as unknown as { target: THREE.Vector3 } | undefined
    const target = orbit?.target ?? new THREE.Vector3()
    const actual = camera.position.distanceTo(target) / base
    if (Math.abs(actual - applied.current) > 0.01) {
      applied.current = actual
      onZoomChange(actual)
    }
  })

  return null
}
