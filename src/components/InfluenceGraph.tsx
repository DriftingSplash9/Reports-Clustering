import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import ThreeForceGraph from 'three-forcegraph'
import { forceCollide } from 'd3-force-3d'
import type { Graph, JurisdictionLevel, ScoredReport } from '../lib/types'
import { RELATIONSHIP_WEIGHT, isDocumented, radiusFor } from '../lib/graph'
import { rimColourFor, colourForReport } from '../lib/palette'
import {
  isStandingInstrument,
  nodeMaterial,
  setNodeRim,
  type NodeMaterial,
} from './nodeVisuals'
import { edgeKey, type Focus } from '../lib/selection'
import type { VisibleSet } from '../lib/filter'
import { countryAffinityForce } from '../lib/geoAffinity'
import {
  DIM_NODE_EMISSIVE,
  DIM_NODE_OPACITY,
  SCENE_BACKGROUND,
  type ViewSettings,
} from '../lib/view'
import {
  gradientLinkMaterial,
  pulseMaterial,
  setLinkFocus,
  setLinkFog,
  teardropGeometry,
  type GradientLinkMaterial,
} from './linkVisuals'
import { frameGeometry } from './SpaceFrame'

/**
 * The 3D force graph.
 *
 * three-forcegraph owns the physics and the scene objects; React owns nothing
 * inside it. We build the object once, hand it the data, and tick it each
 * frame. That boundary is deliberate — mixing React state into a force
 * simulation that mutates positions 60 times a second goes badly.
 *
 * Nodes carry no labels. Apparent size is the authority signal and text was
 * competing with it; identity is available on hover instead.
 */

interface LinkDatum {
  /** Rendering source — the report being depended upon. See note below. */
  source: string
  /** Rendering target — the report that depends on it. */
  target: string
  weight: number
  /** Releases per year of the upstream report. Drives pulse rate. */
  upstreamCadence: number
  /** Colour of the report being depended upon — where the line and pulse start. */
  colour: string
  /** Colour of the dependent report — where the line ends. */
  endColour: string
  /** Drawn dashed, and never pulsed. See EvidenceKind in types.ts. */
  implied: boolean
  /**
   * Extra rest length for links touching high-degree nodes, precomputed at
   * build time (the d3 distance accessor sees mutated link objects, so
   * anything derived from the raw edge list has to be carried on the datum).
   * sqrt-scaled so the CPI's forty edges fan out without exiling its leaves.
   */
  hubRoom: number
  /**
   * Key in the *data model's* direction, not the rendered one.
   *
   * Links are rendered reversed (see below), so this cannot be derived from
   * `source` and `target` at lookup time without flipping them again — which
   * is exactly the kind of double negative that produces a focus set that
   * lights the right nodes and the wrong lines. Computed once, here.
   */
  key: string
}

interface PositionedNode extends ScoredReport {
  x: number
  y: number
  z: number
  /**
   * d3-force's pinning fields. Set on isolated nodes only — see `shelveIsolated`.
   * Optional because nothing else in this graph is ever pinned: every connected
   * node's position is decided by its edges and nothing else, which is the
   * position rule.
   */
  fx?: number
  fy?: number
  fz?: number
}

/**
 * Field of view.
 *
 * The most important number in the file. At a wide angle, apparent size is
 * dominated by distance from the camera, so a peripheral leaf near the lens
 * outdraws the foundational report behind it — inverting the one rule the
 * graph exists to express. A long lens compresses depth so a node reads as
 * large because it *is* large.
 */
export const FOV = 24

const WARMUP_TICKS = 400

/**
 * Node size, as a fraction of the cloud it sits in.
 *
 * `radiusFor` returns 2.2 to 8 world units, and those numbers were chosen at
 * roughly 120 nodes. Measured on 2026-08-10 at 555: the connected cloud has a
 * radius near 1,400 units and the fit camera sits about 8,000 back, which puts
 * one screen pixel at 4.2 world units — so the smallest node was **1.0 pixel
 * across** and the largest 3.8. The graph was invisible until you zoomed, and
 * nothing was broken; the constants had simply been outgrown.
 *
 * A fixed radius cannot survive a growing corpus, because the cloud radius
 * grows with node count and the node radius does not. So the *ratio* is the
 * constant instead: the largest node is held at this fraction of the cloud
 * radius, whatever the corpus size, and the whole 2.2-to-8 range scales with it
 * so the authority encoding is untouched.
 *
 * 1.65% puts the largest node near 11 screen pixels and the smallest near 3 at
 * the opening fit — legible without turning the cloud into a bag of marbles.
 *
 * **The collision radius is deliberately left alone** (Thomas, Q1). It also
 * reads `radiusFor`, so scaling it too would push nodes apart, which grows the
 * cloud, which grows the scale — the layout chasing its own tail. Visual size
 * scales; spacing does not. The cost is that nodes may overlap more at high
 * scale factors, which is a thing to look at rather than reason about.
 */
const TARGET_LARGEST_FRACTION = 0.0165
const MAX_BASE_RADIUS = 8

function nodeScaleFor(cloudRadius: number): number {
  const wanted = (cloudRadius * TARGET_LARGEST_FRACTION) / MAX_BASE_RADIUS
  // Never below 1: at small corpus sizes the original constants are already
  // right, and shrinking them would undo a legibility fix in the other
  // direction. Capped so a single far-flung cluster cannot inflate everything.
  return Math.min(6, Math.max(1, wanted))
}

/**
 * Pulse speed, as a fraction of link length per frame.
 *
 * Anchored so an annual release crawls and a daily one streams. Logarithmic,
 * because the cadence range spans 1 to ~250 releases a year and a linear map
 * would make everything below monthly indistinguishable from stationary.
 */
function pulseSpeed(releasesPerYear: number): number {
  return 0.0016 + Math.log10(Math.max(1, releasesPerYear)) * 0.0042
}

/** How many pulses ride a given edge at once. Frequent releases feel busier. */
function pulseCount(releasesPerYear: number): number {
  if (releasesPerYear >= 100) return 4
  if (releasesPerYear >= 12) return 3
  if (releasesPerYear >= 4) return 2
  return 1
}

export interface GraphBounds {
  centre: THREE.Vector3
  radius: number
  /** Only the levels actually present in the data. */
  levels: JurisdictionLevel[]
  /** Camera distance chosen by the auto-fit. The zoom slider works off this. */
  fitDistance: number
  /** Height of the floor plane, so drop lines know where to land. */
  floorY: number
  /** Vertical extent of the node cloud, which the room is built around. */
  minY: number
  maxY: number
  /**
   * Bounding radius of the node cloud. The room is sized from this so it hugs
   * the network rather than inheriting empty space around it.
   */
  nodeRadius: number
}

/**
 * A request to move the camera to a node.
 *
 * The nonce is what makes searching for the same report twice work. Without it
 * the prop would be unchanged on the second search and nothing would happen,
 * which reads as the feature being broken rather than as already-there.
 */
export interface FlyTo {
  id: string
  nonce: number
}

/** How long the camera takes to arrive, in seconds. */
const FLIGHT_SECONDS = 0.75

export default function InfluenceGraph({
  graph,
  view,
  focus,
  visible,
  flyTo,
  resetSignal,
  onHover,
  onSelect,
  onBounds,
}: {
  graph: Graph
  view: ViewSettings
  /**
   * Bumped by the Reset control. Restores the opening camera from the values
   * the fit already measured, rather than re-running the fit — a second fit
   * would mean 400 more warmup ticks, and the layout would settle somewhere
   * slightly different, so "reset the view" would silently move the graph.
   */
  resetSignal: number
  /** Null when nothing is selected, which means everything renders at full strength. */
  focus: Focus | null
  /**
   * Which nodes and edges are drawn. Null means everything.
   *
   * Applied through the library's visibility accessors, which filter only the
   * WebGL digest — the force simulation still runs over the full node list, so
   * hiding a node freezes the rest of the graph exactly where it is. Rebuilding
   * `graphData` instead would re-run the layout and scatter everything the user
   * was looking at, which is the one thing a filter must never do.
   */
  visible: VisibleSet | null
  /** Set by search. Null while no flight has been requested. */
  flyTo: FlyTo | null
  onHover: (report: ScoredReport | null) => void
  onSelect: (id: string | null) => void
  onBounds: (bounds: GraphBounds) => void
}) {
  const ref = useRef<ThreeForceGraph | null>(null)
  const fogRef = useRef(new THREE.Fog(SCENE_BACKGROUND, 1e9, 1e9 + 1))
  /** Centre and radius of the node cloud, measured once the layout settles. */
  const cloud = useRef<{ centre: THREE.Vector3; radius: number } | null>(null)
  const fitted = useRef(false)
  /**
   * Visual scale for every node mesh, set once the fit has measured the cloud.
   * Held in a ref rather than state because it is read inside
   * `nodeThreeObject`, which the library calls at times React does not drive —
   * a node rebuilt by a filter change has to be born at the current scale or it
   * appears at the wrong size for a frame.
   */
  const nodeScale = useRef(1)
  /** Where the fit put the camera, so Reset can go back without re-laying out. */
  const fitState = useRef<{ centre: THREE.Vector3; distance: number } | null>(null)
  /** Camera distance chosen by the auto-fit, kept for the search flight. */
  const fitDistance = useRef(0)
  const { camera, controls, scene } = useThree()

  /**
   * The spread slider rebuilds the whole layout (forces, warmup, camera
   * refit), which costs a visible beat at 335 nodes. Debounced so a drag
   * costs one rebuild at the end, not one per pixel of travel.
   */
  const [spreadApplied, setSpreadApplied] = useState(view.spread)
  useEffect(() => {
    const t = setTimeout(() => setSpreadApplied(view.spread), 300)
    return () => clearTimeout(t)
  }, [view.spread])

  /**
   * Node meshes by report id, so focus changes can mutate materials in place.
   *
   * The alternative — re-calling `nodeThreeObject` — rebuilds every sphere and
   * its geometry on every click. Fine at 33 nodes, wasteful at the 300 this is
   * aimed at, and it discards the meshes mid-simulation for no gain.
   */
  const meshes = useRef(new Map<string, THREE.Mesh>())

  /** One gradient material per edge, keyed the same way the focus set is. */
  const linkMaterials = useRef(new Map<string, GradientLinkMaterial>())

  /**
   * How many meshes were present when focus was last applied.
   *
   * three-forcegraph may rebuild its node objects, and a rebuilt sphere is born
   * at full brightness. Watching the map size catches that and re-applies —
   * cheaply, and without polling materials every frame.
   */
  const appliedMeshCount = useRef(-1)

  /**
   * The current focus, readable from inside three-forcegraph's accessors.
   *
   * Those accessors are plain callbacks held by an object built once, so they
   * close over the first render's props forever. A ref is the only way they
   * see anything current.
   */
  const focusRef = useRef<Focus | null>(null)
  focusRef.current = focus

  /** Same closure problem as `focusRef`, same solution. */
  const visibleRef = useRef<VisibleSet | null>(null)
  visibleRef.current = visible

  /**
   * Same closure problem again, but for a force rather than an accessor —
   * `countryAffinityForce` reads this every tick so the slider can retune
   * the pull live, without the 400-tick re-warmup `spread` pays on every
   * change. See `lib/geoAffinity.ts`.
   */
  const geoAffinityStrength = useRef(0)
  geoAffinityStrength.current = view.geoAffinity

  const litLink = (l: LinkDatum) => !focusRef.current || focusRef.current.edges.has(l.key)

  const shownNode = (id: string) => !visibleRef.current || visibleRef.current.nodes.has(id)
  const shownLink = (l: LinkDatum) =>
    !visibleRef.current || visibleRef.current.edges.has(l.key)

  const forceGraph = useMemo(() => {
    // Meshes from a previous graph are about to be replaced; holding them would
    // leak and, worse, let focus updates write to spheres no longer in a scene.
    meshes.current.clear()

    const nodes = graph.nodes.map((n) => ({ ...n }))

    // Links are rendered REVERSED relative to the data model.
    //
    // In the data, an edge runs from the dependent report to the one it is
    // built from. But influence travels the other way: when the CPI updates,
    // the effect propagates outward to everything indexed to it. Arrows and
    // pulses both need to show that direction, so rendering flips the edge.
    // The data model is untouched — only what you see is reversed.
    // Node degree, for link rest lengths: a hub's neighbourhood needs more
    // room than a chain's, and at 335 nodes the difference is the difference
    // between a readable cluster and a hairball.
    const degree = new Map<string, number>()
    for (const e of graph.edges) {
      degree.set(e.source_report_id, (degree.get(e.source_report_id) ?? 0) + 1)
      degree.set(e.target_report_id, (degree.get(e.target_report_id) ?? 0) + 1)
    }

    const links: LinkDatum[] = graph.edges.map((e) => {
      const upstream = graph.byId.get(e.target_report_id)
      const downstream = graph.byId.get(e.source_report_id)
      return {
        source: e.target_report_id,
        target: e.source_report_id,
        weight: e.strength ?? RELATIONSHIP_WEIGHT[e.relationship_type],
        upstreamCadence: upstream?.releases_per_year ?? 1,
        colour: upstream ? colourForReport(upstream) : '#7f9ad0',
        endColour: downstream ? colourForReport(downstream) : '#7f9ad0',
        implied: !isDocumented(e),
        hubRoom:
          3.5 *
          (Math.sqrt(degree.get(e.source_report_id) ?? 1) +
            Math.sqrt(degree.get(e.target_report_id) ?? 1)),
        key: edgeKey(e.source_report_id, e.target_report_id),
      }
    })

    // One material per link, held so focus changes are a uniform write rather
    // than a rebuild, and so the library's repeated `obj.material = ...` on
    // every digest keeps assigning the same object instead of churning.
    linkMaterials.current.clear()
    for (const l of links) {
      linkMaterials.current.set(
        l.key,
        gradientLinkMaterial(l.colour, l.endColour, l.implied),
      )
    }

    // Geometry and material for a link's pulses. three-forcegraph reads only
    // these two fields off the object it is handed, and reuses them across all
    // the photons on that link.
    const particleObjects = new Map<string, THREE.Mesh>()
    for (const l of links) {
      particleObjects.set(
        l.key,
        new THREE.Mesh(
          // Sized up twice on 2026-08-10, both times on Thomas looking at it:
          // 1.6-3.5 read as near-invisible specks, 2.4-5.3 was still short, and
          // this is 3.2-7.0. Worth noting the moving target underneath — nodes
          // themselves grew that day too (see TARGET_LARGEST_FRACTION), so a
          // pulse that was legible against the old node size no longer was.
          teardropGeometry(3.2 + l.weight * 3.8),
          pulseMaterial(l.colour),
        ),
      )
    }
    // The accessor's type will not accept null, and a link with no entry would
    // be a bug rather than a case to handle, so this is a visible fallback
    // rather than a silent one.
    const fallbackParticle = new THREE.Mesh(
      teardropGeometry(4),
      pulseMaterial('#7f9ad0'),
    )

    const fg = new ThreeForceGraph()
      .graphData({ nodes, links })
      .numDimensions(3)
      .nodeId('id')
      .nodeVisibility((node: object) => shownNode((node as ScoredReport).id))
      // Filtering a link hides its line, its arrowhead and its pulses together,
      // because all three digest off the visible-link list. That is the right
      // coupling *here* and the wrong one for the Edges toggle, which hides
      // lines while deliberately keeping the pulses — hence that one works
      // through the material instead. Two different questions, two mechanisms.
      .linkVisibility((l: object) => shownLink(l as LinkDatum))
      .nodeThreeObject((node: object) => {
        const n = node as ScoredReport
        const colour = colourForReport(n)
        const radius = radiusFor(n.size_score)

        // No disposal of a superseded mesh here: three-forcegraph deallocates
        // objects it removes from its digest, so a node hidden by a filter is
        // already cleaned up by the time this runs again for it. Disposing a
        // second time would be redundant, and reads as though something were
        // being managed here that is not.

        // Bloom keys off luminance, so this doubles as the glow control:
        // authoritative nodes bleed light, peripheral ones stay contained.
        // Capped below 1 — past that the bloom pass clips everything to
        // white and the colour and size channels both stop working.
        const emissive = 0.3 + n.size_score * 0.62

        // Born already dimmed if it is outside the current focus. The library
        // can rebuild these objects at times we do not control, and a sphere
        // that ignores the focus for a frame or two reads as a flicker.
        const lit = !focusRef.current || focusRef.current.nodes.has(n.id)

        // A one-off instrument is drawn hollow — same sphere, emptied fill, and
        // a border in its own scope colour rather than the country rim every
        // other node carries. See `isStandingInstrument`.
        //
        // The border colour is `colour`, not `rimColourFor(n.country)`, and
        // that is deliberate: on a hollow node the rim is the only colour
        // there is, so it has to be the one the legend explains. A hollow
        // node's ring is exactly the colour a solid node's fill would be.
        const hollow = isStandingInstrument(n)
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(radius, 28, 20),
          nodeMaterial({
            colour,
            rimColour: hollow ? colour : rimColourFor(n.country),
            radius,
            emissive,
            lit,
            dimOpacity: DIM_NODE_OPACITY,
            dimEmissive: DIM_NODE_EMISSIVE,
            hollow,
          }),
        )
        mesh.scale.setScalar(nodeScale.current)
        mesh.userData.reportId = n.id
        mesh.userData.baseEmissive = emissive
        meshes.current.set(n.id, mesh)
        return mesh
      })
      // Our shader, their cylinder. Colour and focus now live in uniforms, so
      // linkColor and linkOpacity no longer apply to the lines themselves.
      .linkMaterial((l: object) => linkMaterials.current.get((l as LinkDatum).key) ?? null)
      // Widened 2026-08-10 (Thomas) — roughly 1.7x the old 0.3-1.0 range.
      .linkWidth((l: object) => 0.5 + (l as LinkDatum).weight * 1.2)
      // No arrowheads. They were drawn at 94% along a link, and links run
      // centre to centre, so on a typical 40-unit link the head sat about 2.4
      // units from the target's centre — inside a sphere whose radius is
      // between 2.2 and 8. They had been invisible inside the nodes for five
      // sessions. Rather than move them out, they are gone: the pulses already
      // carry direction, on teardrops that point the way they travel, and they
      // carry it on the element the eye is actually following.
      //
      // The cost is that with Pulses off there is no direction cue at all.
      // That is a real loss and it is accepted — a second encoding of the same
      // fact, permanently hidden inside the nodes, was not paying for itself.
      //
      // The pulses. One instanced particle system across all edges, so this
      // stays cheap at several hundred links.
      //
      // Suppressed entirely outside the focus, rather than dimmed. Motion is
      // the strongest signal on screen — a dim moving dot still pulls the eye
      // harder than a bright stationary one.
      // An implied edge never pulses. A pulse asserts that influence actually
      // propagates along this line, and an implied edge is precisely the case
      // where no document says it does. Dashing it and then animating it would
      // take the claim back with one hand and make it with the other.
      .linkDirectionalParticles((l: object) =>
        litLink(l as LinkDatum) && !(l as LinkDatum).implied
          ? pulseCount((l as LinkDatum).upstreamCadence)
          : 0,
      )
      .linkDirectionalParticleSpeed((l: object) =>
        pulseSpeed((l as LinkDatum).upstreamCadence),
      )
      // Teardrops rather than spheres. The library orients any non-spherical
      // particle along its direction of travel, so the shape carries direction
      // on the one element the eye is already following.
      //
      // Supplying this makes linkDirectionalParticleWidth and
      // ParticleColor inert — both are baked into the geometry and material.
      .linkDirectionalParticleThreeObject(
        (l: object) => particleObjects.get((l as LinkDatum).key) ?? fallbackParticle,
      )

    // d3Force() is typed loosely upstream, hence the casts.
    //
    // Retuned 2026-08-07 at 335 nodes (was -230 / 260 / 38-68, chosen at 124).
    // The old cap meant clusters more than 260 units apart felt no repulsion
    // at all while the centering force kept pulling them in — so every galaxy
    // piled into the middle. `spread` IS the layout multiplier (0.5–2.5,
    // default 1); the baseline below is where 335 nodes read as clusters.
    const m = spreadApplied
    const charge = fg.d3Force('charge') as unknown as
      | { strength(s: number): void; distanceMax(d: number): void }
      | undefined
    charge?.strength(-300 * m)
    // Without a cap, repulsion never falls off and linear chains get flung
    // out — but the cap has to grow with the layout or it recreates the pile.
    charge?.distanceMax(420 * m)

    const linkForce = fg.d3Force('link') as unknown as
      | { distance(fn: (l: LinkDatum) => number): void }
      | undefined
    linkForce?.distance((l) => (40 + (1 - l.weight) * 28 + l.hubRoom) * m)

    // Nothing in the default force set stops two spheres occupying the same
    // point, and overlapping nodes read as one node of the wrong size.
    fg.d3Force(
      'collide',
      forceCollide((node: unknown) => radiusFor((node as ScoredReport).size_score) + 3 + 3 * m)
        .strength(0.85)
        .iterations(2) as unknown as never,
    )

    // No vertical sorting force. Height is not an encoding — see the note on
    // JurisdictionLevel in types.ts. Where a node ends up is decided entirely
    // by what it depends on and what depends on it.

    // Geo-affinity — off at strength 0 (the default), and cheap to check for
    // that every tick even when off. See `lib/geoAffinity.ts` for the model
    // and why this is layered alongside the forces above rather than
    // replacing any of them: it never touches link distance, so a
    // documented edge's rest length is exactly what it was regardless of
    // this slider.
    fg.d3Force('geoAffinity', countryAffinityForce(geoAffinityStrength) as unknown as never)

    return fg
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, spreadApplied])

  useEffect(() => {
    ref.current = forceGraph
    fitted.current = false
  }, [forceGraph])

  useEffect(() => {
    // Zero is the initial value, not a request; resetting on mount would fight
    // the fit that is about to run.
    if (!resetSignal) return
    const f = fitState.current
    if (!f) return
    flight.current = null
    camera.position.set(f.centre.x, f.centre.y, f.centre.z + f.distance)
    camera.lookAt(f.centre)
    const orbit = controls as unknown as
      | { target: THREE.Vector3; update(): void }
      | undefined
    orbit?.target.copy(f.centre)
    orbit?.update()
  }, [resetSignal, camera, controls])

  /**
   * Fit the camera and publish the scene bounds — once, as soon as the layout
   * has actually produced coordinates.
   *
   * This deliberately does NOT run in an effect. three-forcegraph builds its
   * objects and starts its simulation asynchronously after `graphData()` is
   * set, so at effect time every node still has `x === undefined`. The fit
   * bailed on that check and `onBounds` was never called — which left the
   * entire room (platform, ground grid, bounding box, horizon)
   * permanently unmounted, since App gates all of it on `bounds`. The
   * scenery was never invisible; it was never mounted.
   */
  /**
   * Hold isolated reports in a deliberate margin beside the graph.
   *
   * Isolated nodes returned to the graph in V0.12, when the loader stopped
   * dropping them. They need somewhere to be, and the force simulation has no
   * opinion: with no links, a node is acted on only by charge repulsion, so it
   * drifts wherever the nearest cluster pushes it and the distance means
   * nothing. Left alone they read as ordinary peripheral nodes, which is the
   * opposite of true — a peripheral node is at the end of a chain, and these
   * are at the end of nothing.
   *
   * So they are placed, and the placement is the encoding: a column outside the
   * connected cloud, at a distance measured from that cloud rather than fixed,
   * so it stays outside as the graph grows.
   *
   * **This does not breach the position rule.** That rule forbids coordinates
   * asserting a hierarchy the dependency data does not contain. Isolation is not
   * a hierarchy and it is not asserted — it is read directly off the edge list,
   * in the same way that "position encodes only the edges" permits depth in the
   * dependency graph as a vertical axis. Having no edges is a fact about the
   * edges.
   *
   * They are pinned rather than nudged, because an unpinned node placed in the
   * margin would be pushed straight back toward the cloud by the same repulsion
   * that scattered it.
   */
  function shelveIsolated(positioned: PositionedNode[]) {
    const isolated = positioned.filter((n) => n.in_degree === 0 && n.out_degree === 0)
    if (!isolated.length) return

    const connected = positioned.filter((n) => n.in_degree > 0 || n.out_degree > 0)
    if (!connected.length) return

    const centre = new THREE.Vector3()
    for (const n of connected) centre.add(new THREE.Vector3(n.x, n.y, n.z))
    centre.divideScalar(connected.length)

    let cloudRadius = 1
    for (const n of connected) {
      cloudRadius = Math.max(
        cloudRadius,
        centre.distanceTo(new THREE.Vector3(n.x, n.y, n.z)),
      )
    }

    // A single column while there are few, wrapping into further columns as the
    // shelf fills. Sorted by title so the order is stable across reloads and a
    // node does not appear to move when nothing about it changed.
    // Kept close to the cloud on purpose. The first attempt put the shelf at
    // 1.3× the cloud radius plus 60 units, and looking at it showed the cost:
    // the shelf is far enough out that framing the whole scene shrinks the graph
    // to about half the frame and pushes it off-centre. Just outside the cloud
    // is enough to read as "outside", and it keeps the subject the subject.
    const GAP = 34
    const perColumn = Math.max(4, Math.ceil(Math.sqrt(isolated.length * 2)))
    const shelfX = centre.x + cloudRadius * 1.12 + 40
    const ordered = [...isolated].sort((a, b) => a.title.localeCompare(b.title))

    ordered.forEach((n, i) => {
      const column = Math.floor(i / perColumn)
      const row = i % perColumn
      n.fx = shelfX + column * GAP
      n.fy = centre.y + ((perColumn - 1) / 2 - row) * GAP
      n.fz = centre.z
      n.x = n.fx
      n.y = n.fy
      n.z = n.fz
    })
  }

  function runFit() {
    const fg = ref.current
    if (!fg) return

    const initial = (fg.graphData().nodes ?? []) as PositionedNode[]
    if (!initial.length || !initial.every((n) => Number.isFinite(n.x))) return

    // Settle before measuring, so the framing is not chosen from a tangle.
    for (let i = 0; i < WARMUP_TICKS; i++) fg.tickFrame()
    fitted.current = true

    const nodes = (fg.graphData().nodes ?? []) as PositionedNode[]
    const positioned = nodes.filter((n) => Number.isFinite(n.x))
    if (!positioned.length) return

    shelveIsolated(positioned)

    // **Frame the connected graph, not the shelf.**
    //
    // This is the "fit to the subject, not the scenery" rule arriving a third
    // time, and it was caught by looking rather than by reasoning. V0.5 found the
    // camera fitting the platform's diagonal; V0.7 fixed it by deleting the
    // platform; and shelving isolated nodes in V0.12 reintroduced it instantly —
    // including the shelf in the fit box moved the centre sideways and shrank the
    // graph to roughly half the frame.
    //
    // The connected graph is what the user came to see. The shelf is an
    // annotation beside it, placed close enough to stay in view at fit zoom
    // without being allowed to define the view.
    const framed = positioned.filter((n) => n.in_degree > 0 || n.out_degree > 0)
    const subject = framed.length ? framed : positioned

    const box = new THREE.Box3()
    for (const n of subject) {
      box.expandByPoint(new THREE.Vector3(n.x, n.y, n.z))
    }
    const centre = box.getCenter(new THREE.Vector3())

    // True bounding-sphere radius, not half the box diagonal — the diagonal
    // overestimates for anything non-cubic and leaves the graph adrift in
    // empty space.
    let nodeRadius = 1
    for (const n of subject) {
      nodeRadius = Math.max(
        nodeRadius,
        centre.distanceTo(new THREE.Vector3(n.x, n.y, n.z)),
      )
    }

    const levels = [
      ...new Set(positioned.map((n) => n.jurisdiction_level)),
    ] as JurisdictionLevel[]

    // Fit to the node cloud, not the room.
    //
    // This used to fit `max(nodeRadius, frame.extent * 1.42)` — the bounding
    // box's diagonal — on the reasoning that the room's far corners would
    // otherwise be cropped. At 33 nodes the room and the cloud were comparable
    // and the difference did not show. At 121 the cloud is compact inside a
    // much larger room, so the camera was framing scenery: the graph opened
    // occupying about a fifth of the frame with empty floor beneath it.
    //
    // The nodes are the subject. If the optional bounding box gets clipped at
    // its corners, that is the correct trade.
    const frame = frameGeometry(nodeRadius, box.min.y, box.max.y)
    const distance = (nodeRadius / Math.sin((FOV * Math.PI) / 360)) * 1.18
    const radius = nodeRadius

    camera.position.set(centre.x, centre.y, centre.z + distance)
    camera.lookAt(centre)
    camera.updateProjectionMatrix()

    // Orbit has to pivot around the graph, not the world origin, or dragging
    // swings the whole scene off screen.
    const orbit = controls as unknown as
      | { target: THREE.Vector3; update(): void }
      | undefined
    if (orbit?.target) {
      orbit.target.copy(centre)
      orbit.update()
    }

    // Where the node cloud is, so the fog can be recomputed against it every
    // frame rather than baked once from the opening camera position.
    cloud.current = { centre: centre.clone(), radius: nodeRadius }

    // Now that the cloud has been measured, the nodes can be sized against it.
    // This is why the scale is applied here and not in `nodeThreeObject`: the
    // meshes are built before the layout has settled, so at construction time
    // there is nothing yet to be a fraction of.
    nodeScale.current = nodeScaleFor(nodeRadius)
    for (const m of meshes.current.values()) m.scale.setScalar(nodeScale.current)

    fitState.current = { centre: centre.clone(), distance }

    fitDistance.current = distance
    onBounds({
      centre,
      radius,
      levels,
      fitDistance: distance,
      floorY: frame.bottom,
      nodeRadius,
      minY: box.min.y,
      maxY: box.max.y,
    })
  }

  // Toggles that have to reach inside the force-graph object, which was built
  // once and is not rebuilt when view settings change.
  //
  // Pulse count and link colour are deliberately NOT set here — the focus
  // effect below owns them. Two effects writing the same accessor would race,
  // and whichever ran last would win, so toggling Edges could quietly undo the
  // focus dimming.
  //
  // Links stay *visible* to the library at all times. `linkVisibility(false)`
  // looks like the obvious way to hide the lines, but the particle digest runs
  // over `visibleLinks`, so it takes the pulses with it — and pulses without
  // lines is a view worth having. It reduces an edge to the one thing that is
  // actually moving, which is the signal, and leaves the room uncluttered.
  // Hiding the line through its own material keeps the two independent.
  useEffect(() => {
    for (const material of linkMaterials.current.values()) {
      material.visible = view.showEdges
    }
  }, [view.showEdges, forceGraph])

  /**
   * Reheat when geo-affinity changes.
   *
   * `geoAffinityStrength` (above) is what the force itself reads, so this
   * effect changes nothing about the force's behaviour — it exists because
   * three-forcegraph's alpha has already decayed to ~0 by the time anyone
   * touches this slider post-fit, and every d3 force is scaled by alpha.
   * Without this, turning the slider on would silently do nothing until
   * the next full rebuild. `d3ReheatSimulation` just resets alpha and lets
   * `tickFrame` (already running every frame) carry the layout to its new
   * rest position smoothly — not the synchronous 400-tick warmup `runFit`
   * pays once at load, so this stays cheap on every drag.
   */
  useEffect(() => {
    forceGraph.d3ReheatSimulation()
  }, [view.geoAffinity, forceGraph])


  /**
   * Re-run the visibility digest when the filter changes.
   *
   * The accessors read `visibleRef`, so their *behaviour* is already current —
   * but the library only re-digests when it sees a prop assigned, and handing
   * back an identical closure would not count as a change. Reassigning is what
   * makes it look again.
   *
   * Meshes for nodes that just disappeared are dropped from the map so it does
   * not accumulate references to spheres the library has already deallocated.
   * Then the applied count is invalidated outright rather than compared: a
   * filter change that hides three nodes and reveals three others leaves the
   * count where it started, and the count-watching guard would sit there
   * satisfied while three freshly built spheres ignored the current selection.
   */
  useEffect(() => {
    forceGraph
      .nodeVisibility((node: object) => shownNode((node as ScoredReport).id))
      .linkVisibility((l: object) => shownLink(l as LinkDatum))

    if (visible) {
      for (const id of [...meshes.current.keys()]) {
        if (!visible.nodes.has(id)) meshes.current.delete(id)
      }
    }
    appliedMeshCount.current = -1
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceGraph, visible])

  /**
   * Apply the focus to everything that is already in the scene.
   *
   * Nodes and link materials are mutated in place. Particle counts cannot be —
   * how many photons ride an edge is decided during a digest, so the accessor
   * has to be handed back to make the library recount. Arrow colours are the
   * same. Both read `focusRef`, which is current before this runs.
   */
  function applyFocus() {
    for (const [id, mesh] of meshes.current) {
      const material = mesh.material as NodeMaterial
      const base = (mesh.userData.baseEmissive as number) ?? 0.5
      const lit = !focus || focus.nodes.has(id)

      setNodeRim(material, lit)
      // `litOpacity` rather than 1 — a hollow node stays hollow when traced.
      const litOpacity = material.userData.litOpacity ?? 1
      material.opacity = lit ? litOpacity : Math.min(DIM_NODE_OPACITY, litOpacity)
      material.emissiveIntensity = lit
        ? // A small lift on the selection itself, so it is findable inside its
          // own cone. Still capped below 1 — bloom clips above that and the
          // node stops reading as its true size.
          focus?.selectedId === id
          ? Math.min(0.95, base + 0.25)
          : base
        : DIM_NODE_EMISSIVE
    }

    for (const [key, material] of linkMaterials.current) {
      setLinkFocus(material, !focus || focus.edges.has(key))
    }

    appliedMeshCount.current = meshes.current.size
  }

  useEffect(() => {
    applyFocus()

    forceGraph.linkDirectionalParticles((l: object) =>
      view.showPulses && litLink(l as LinkDatum) && !(l as LinkDatum).implied
        ? pulseCount((l as LinkDatum).upstreamCadence)
        : 0,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceGraph, focus, view.showPulses])

  /**
   * Fog, recomputed every frame against where the camera actually is.
   *
   * The planes are placed relative to the *node cloud* seen from the current
   * camera position, not at fixed world distances. Fog is a statement about how
   * far through the graph you are looking, and that changes every time you zoom
   * or orbit — the previous version computed it once at load and so switched
   * itself off the moment anyone moved.
   *
   * `amount` slides the near plane forward through the cloud and tightens the
   * span behind it. At 0.1 only the very back of the graph greys out; at 1 the
   * near face is clear and the far face is gone. The whole range stays keyed to
   * the cloud radius, so it means the same thing at 30 nodes and at 300.
   */
  function updateFog(amount: number) {
    const c = cloud.current
    if (!c) return

    if (amount <= 0.005) {
      scene.fog = null
      for (const m of linkMaterials.current.values()) setLinkFog(m, 1e9, 1e9 + 1)
      return
    }

    const distance = camera.position.distanceTo(c.centre)
    const near = distance + c.radius * (1 - 2 * amount)
    const far = near + c.radius * (3.5 - 2 * amount)

    fogRef.current.near = near
    fogRef.current.far = far
    scene.fog = fogRef.current

    // The lines need telling separately: a custom shader receives none of
    // three.js's automatic fog uniforms.
    for (const m of linkMaterials.current.values()) setLinkFog(m, near, far)
  }

  /**
   * The camera flight, started by search.
   *
   * Lighting a node the user cannot see does not solve the navigation problem —
   * at 118 nodes the report you searched for is as likely to be behind the
   * camera as in front of it. Selecting has to be accompanied by arriving.
   *
   * Animated rather than cut. A cut leaves no way to tell whether the camera
   * moved or the graph changed, and after one the user has lost track of where
   * they were; watching the scene swing carries that information for free.
   */
  const flight = useRef<{
    fromEye: THREE.Vector3
    toEye: THREE.Vector3
    fromTarget: THREE.Vector3
    toTarget: THREE.Vector3
    elapsed: number
  } | null>(null)

  useEffect(() => {
    if (!flyTo || !fitted.current) return
    const fg = ref.current
    if (!fg) return

    const nodes = (fg.graphData().nodes ?? []) as PositionedNode[]
    const node = nodes.find((n) => n.id === flyTo.id)
    if (!node || !Number.isFinite(node.x)) return

    const orbit = controls as unknown as { target: THREE.Vector3 } | undefined
    const fromTarget = (orbit?.target ?? new THREE.Vector3()).clone()
    const toTarget = new THREE.Vector3(node.x, node.y, node.z)

    // Approach along the direction the user is already looking from. Choosing
    // a new angle would be the renderer deciding there is a right way round to
    // view the graph, which is the same mistake as sorting nodes by height.
    const direction = camera.position.clone().sub(fromTarget)
    const current = direction.length()
    if (current < 1e-6) return

    // Close enough to read the node's neighbourhood, but never further out
    // than where the user already was — being thrown backwards after asking to
    // go somewhere is worse than arriving too close.
    const distance = Math.min(current, fitDistance.current * 0.42)

    flight.current = {
      fromEye: camera.position.clone(),
      toEye: toTarget.clone().add(direction.setLength(distance)),
      fromTarget,
      toTarget,
      elapsed: 0,
    }
  }, [flyTo, camera, controls])

  function advanceFlight(delta: number) {
    const f = flight.current
    if (!f) return

    f.elapsed += delta
    const linear = Math.min(1, f.elapsed / FLIGHT_SECONDS)
    // Smoothstep: no jolt at either end, which matters more than the curve in
    // between when the whole move lasts under a second.
    const t = linear * linear * (3 - 2 * linear)

    const orbit = controls as unknown as
      | { target: THREE.Vector3; update(): void }
      | undefined

    camera.position.lerpVectors(f.fromEye, f.toEye, t)
    if (orbit?.target) {
      orbit.target.lerpVectors(f.fromTarget, f.toTarget, t)
      orbit.update()
    }

    if (linear >= 1) flight.current = null
  }

  useFrame((_, delta) => {
    ref.current?.tickFrame()
    if (!fitted.current) runFit()
    advanceFlight(delta)
    updateFog(view.fog)

    // Node meshes are created lazily by the library, and can be recreated
    // without warning. A size change means the set we last styled is not the
    // set now on screen, so the focus has to be laid on again.
    if (meshes.current.size !== appliedMeshCount.current) applyFocus()
  })

  /** Walk up to whichever ancestor carries the report id. */
  function reportIdAt(object: THREE.Object3D): string | undefined {
    let obj: THREE.Object3D | null = object
    while (obj && !obj.userData?.reportId) obj = obj.parent
    return obj?.userData?.reportId as string | undefined
  }

  function handlePointerMove(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation()
    const id = reportIdAt(e.object)
    onHover(id ? (graph.byId.get(id) ?? null) : null)
  }

  /**
   * Select on click, and toggle off when the selection is clicked again.
   *
   * Orbiting is a drag, and a drag ends in a click event, so a click that moved
   * the camera must not also change the selection — otherwise every attempt to
   * look around the cone destroys it.
   */
  const dragOrigin = useRef<{ x: number; y: number } | null>(null)
  const DRAG_SLOP = 4

  function handlePointerDown(e: ThreeEvent<PointerEvent>) {
    dragOrigin.current = { x: e.clientX, y: e.clientY }
  }

  function handleClick(e: ThreeEvent<MouseEvent>) {
    const origin = dragOrigin.current
    dragOrigin.current = null
    if (
      origin &&
      Math.hypot(e.clientX - origin.x, e.clientY - origin.y) > DRAG_SLOP
    ) {
      return
    }

    e.stopPropagation()
    const id = reportIdAt(e.object)
    if (!id) return
    onSelect(focus?.selectedId === id ? null : id)
  }

  return (
    <>
      <primitive
        object={forceGraph}
        onPointerMove={handlePointerMove}
        onPointerOut={() => onHover(null)}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
      />
    </>
  )
}
