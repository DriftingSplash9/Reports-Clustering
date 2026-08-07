import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import * as THREE from 'three'
import type { ViewSettings } from '../lib/view'

/**
 * The world the platform sits in.
 *
 * A bounded floor alone tells you the network has an extent, but not whether
 * that extent is large or small — there is nothing to compare it against. Two
 * additions fix that:
 *
 *   - an **infinite ground grid** whose cells are a fixed size, so the number
 *     of cells the platform spans is a direct readout of scale. Add fifty
 *     nodes and the platform grows to cover more cells; the grid itself never
 *     changes, so growth is visible rather than merely implied.
 *   - a **horizon**, where ground meets sky. This is what makes the grid read
 *     as receding into distance instead of as a flat texture, and it gives the
 *     eye an absolute up.
 *
 * Both are scenery: unlit, unfogged, and dim enough never to compete with the
 * data.
 */

/** Sky dome radius. Must stay inside the camera far plane. */
const SKY_RADIUS = 4200

const skyVertex = /* glsl */ `
  varying vec3 vLocal;
  void main() {
    vLocal = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const skyFragment = /* glsl */ `
  varying vec3 vLocal;
  uniform vec3 zenith;
  uniform vec3 horizon;
  uniform vec3 ground;

  void main() {
    // -1 straight down, 0 at the horizon, 1 straight up.
    float h = normalize(vLocal).y;

    // Tight falloff near h = 0 so there is a readable band where sky meets
    // ground, rather than a wash that could be mistaken for a flat background.
    vec3 colour = h > 0.0
      ? mix(horizon, zenith, pow(clamp(h, 0.0, 1.0), 0.34))
      : mix(horizon, ground, pow(clamp(-h, 0.0, 1.0), 0.28));
    gl_FragColor = vec4(colour, 1.0);
  }
`

function Sky() {
  const mesh = useRef<THREE.Mesh>(null)

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: skyVertex,
        fragmentShader: skyFragment,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          zenith: { value: new THREE.Color('#03050b') },
          horizon: { value: new THREE.Color('#28486e') },
          ground: { value: new THREE.Color('#05080f') },
        },
      }),
    [],
  )

  // Ride along with the camera so you can never fly out through the sky.
  useFrame(({ camera }) => {
    mesh.current?.position.copy(camera.position)
  })

  return (
    <mesh ref={mesh} material={material} renderOrder={-1000}>
      <sphereGeometry args={[SKY_RADIUS, 32, 24]} />
    </mesh>
  )
}

export default function Environment({
  floorY,
  view,
}: {
  floorY: number
  view: ViewSettings
}) {
  return (
    <>
      {view.showHorizon && <Sky />}
      {view.showGroundGrid && (
        <Grid
          // Clear of the platform slab, which is 4 units thick and hangs below
          // the floor line — otherwise the grid renders inside it.
          position={[0, floorY - 9, 0]}
          args={[10, 10]}
          // Fixed-size cells. This is the whole point: the platform's growth
          // is measured against a grid that never changes.
          cellSize={25}
          cellThickness={0.5}
          cellColor="#243a5e"
          sectionSize={125}
          sectionThickness={1}
          sectionColor="#3a5c92"
          fadeDistance={2600}
          fadeStrength={1.2}
          infiniteGrid
          side={THREE.DoubleSide}
        />
      )}
    </>
  )
}
