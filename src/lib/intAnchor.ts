import { countryOrbId } from './hierarchy'

/**
 * Holds the folded "International" orb at the centroid of everything else
 * — a one-way pull, so it sits in the middle of what it touches without
 * dragging any of it toward itself.
 *
 * Why a force of its own (2026-08-31). The international layer folds into
 * one orb from tier 2 (see `resolveId`), and that orb's ~140 tethers to the
 * country orbs carry no spring (`INT_LINK_STIFFNESS = 0` in
 * InfluenceGraph.tsx — the springs were what averaged every country toward
 * the standards). Springless, a single node with nothing holding it is
 * pushed by `charge` to the edge of the room, and the picture at tier 2
 * became a fan of 140 trunks converging on a point off-screen. Giving the
 * orb its springs back would not do either: d3's link force moves the
 * lower-degree end most, so a 700-degree orb tethered to 10-degree country
 * orbs pulls the countries in, not itself — the choke again, one tier up.
 *
 * So: the orb is placed, not sprung. Every tick it is pulled toward the
 * mean position of every *other* node with a spring constant of
 * `galaxyForce.ts`'s `COUNTRY_PULL` order, and nothing is pulled back.
 * Position still encodes only edges for every real report; the orb is a
 * stand-in for 200 of them and is drawn where a reader would look for it.
 *
 * Inert whenever no `corb:INT` node is in the simulation — tier 1 (where
 * the international reports are individual), or INT opened. Same contract
 * as the other custom forces: soft (scaled by alpha), added to velocity,
 * skips pinned nodes, `.initialize` receives the live node array.
 */
interface AnchorNode {
  id: string
  x: number
  y: number
  z: number
  vx?: number
  vy?: number
  vz?: number
  fx?: number
}

const ANCHOR_PULL = 0.08
const INT_ORB_ID = countryOrbId('INT')

export function intAnchorForce() {
  let nodes: AnchorNode[] = []
  let orb: AnchorNode | undefined

  function force(alpha: number) {
    if (!orb || orb.fx !== undefined || nodes.length < 3) return
    let sx = 0
    let sy = 0
    let sz = 0
    let n = 0
    for (const node of nodes) {
      if (node === orb || !Number.isFinite(node.x)) continue
      sx += node.x
      sy += node.y
      sz += node.z
      n++
    }
    if (!n) return
    orb.vx = (orb.vx ?? 0) + (sx / n - orb.x) * ANCHOR_PULL * alpha
    orb.vy = (orb.vy ?? 0) + (sy / n - orb.y) * ANCHOR_PULL * alpha
    orb.vz = (orb.vz ?? 0) + (sz / n - orb.z) * ANCHOR_PULL * alpha
  }

  force.initialize = (ns: unknown[]) => {
    nodes = ns as AnchorNode[]
    orb = nodes.find((node) => node.id === INT_ORB_ID)
  }

  return force
}
