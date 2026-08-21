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
  /**
   * The base "zoom 1" distance snapshotted at the moment the user took the
   * camera, or `null` when nothing is frozen (tracking owns the camera, or a
   * fresh fit just ran). See `currentBase` below — added 2026-08-21 (review
   * §2, "zoom slider drifts on its own during settle").
   */
  const frozenBase = useRef<number | null>(null)

  /**
   * **Freezes the base while `userOwnsCamera` is true, 2026-08-21 (review §2,
   * "zoom slider drifts on its own during settle").** `runFit` republishes
   * `fitSync.distance` on every tracking pass — deliberately, per that
   * function's own comment, because the *measurement* is meaningful whether
   * or not the camera moved. But while the user holds the camera and the
   * cloud is still expanding under a still-running tracking window, that
   * measurement keeps changing under a camera that has not moved at all,
   * which both directions below were dividing/multiplying against live —
   * so the inferred zoom (camera distance ÷ base) drifted purely because the
   * denominator moved, the slider visibly crept, and if the drift crossed
   * `ZOOM_MIN`/`ZOOM_MAX` the clamp fed a new value back into the slider →
   * camera direction and the camera physically moved with nobody touching
   * it — the most plausible residue of the old "zooms out forever" report.
   *
   * This does NOT freeze camera reads — wheel-zoom (which also sets
   * `userOwnsCamera`, via OrbitControls' own gesture bracketing) still moves
   * `camera.position` every frame it is active, and that still divides
   * cleanly against a stable base. Only the base itself — the thing that
   * should mean "zoom 1" — stops moving under a camera the tracking loop is
   * not touching. Un-freezes the moment tracking takes the camera back
   * (`userOwnsCamera` false) or a fresh authoritative fit lands (the stamp
   * branches below already reset to zoom 1 in that case).
   */
  function currentBase(): number {
    if (fitSync.userOwnsCamera) {
      if (frozenBase.current === null) frozenBase.current = fitSync.distance || fitDistance
      return frozenBase.current
    }
    frozenBase.current = null
    return fitSync.distance || fitDistance
  }

  // Slider → camera.
  //
  // The `fitDistance` prop is kept in the dependency list purely as a *trigger*
  // — it is the thing that changes when a fit happens — but the arithmetic uses
  // the same base the camera→slider direction below reads (`currentBase()`,
  // frozen while the user owns the camera — see its doc comment). The two
  // directions have to agree on what "zoom 1" means down to the number; when
  // they did not, a round trip through the pair returned slightly more than it
  // was given and the zoom ratcheted outwards on its own.
  useEffect(() => {
    const base = currentBase()
    if (!base) return
    if (Math.abs(applied.current - zoom) < 0.0005) return
    applied.current = zoom

    const orbit = controls as unknown as { target: THREE.Vector3; update(): void }
    const target = orbit?.target ?? new THREE.Vector3()
    const direction = camera.position.clone().sub(target)
    const current = direction.length()
    if (current < 1e-6) return

    direction.multiplyScalar((base * zoom) / current)
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
      frozenBase.current = null
      if (Math.abs(zoom - 1) > 0.0005) onZoomChange(1)
      return
    }
    const base = currentBase()
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
