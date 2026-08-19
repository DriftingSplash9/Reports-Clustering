import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { HORIZON_COLOUR, type ViewSettings } from '../lib/view'

/**
 * Scenery — now just the optional horizon.
 *
 * The infinite ground grid lived here until 2026-08-12 and was deleted on
 * Thomas's instruction ("delete the grid", "don't keep the code"), following
 * the platform slab, the drop lines and the bounding box out of the scene.
 * The pattern across all four is the same: scenery earns its place only while
 * it reads as reference, and each of these had started reading as furniture.
 * With the grid gone the scene has no floor and needs none — the graph is the
 * subject, and "down" was never an encoding (see the position rule).
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
          horizon: { value: new THREE.Color(HORIZON_COLOUR) },
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

export default function Environment({ view }: { view: ViewSettings }) {
  return <>{view.showHorizon && <Sky />}</>
}
