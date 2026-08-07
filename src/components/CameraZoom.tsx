import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

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
  useFrame(() => {
    if (!fitDistance) return
    const orbit = controls as unknown as { target: THREE.Vector3 } | undefined
    const target = orbit?.target ?? new THREE.Vector3()
    const actual = camera.position.distanceTo(target) / fitDistance
    if (Math.abs(actual - applied.current) > 0.01) {
      applied.current = actual
      onZoomChange(actual)
    }
  })

  return null
}
