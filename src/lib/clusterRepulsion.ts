import type { Country } from './types'
import { familyOf } from './palette'

/**
 * "Cluster vs cluster repulsion" — the direct mirror of `galaxyForce.ts`,
 * built 2026-08-27 on Thomas's call to try "option (c)" from the
 * 2026-08-26 design discussion on "the clusters cluster too much to the
 * centre" (see HANDOFF.md, both that discussion and the same-day
 * force-centre/charge tuning that came first as the cheap pass).
 *
 * That discussion named three mechanical causes of the pile-up: (1)
 * `galaxyForce` only ever pulls a node toward its OWN family/country
 * centroid — nothing pushes DIFFERENT clusters apart from each other; (2)
 * generic `charge` repulsion is the only force separating clusters at
 * all, and it has a hard `distanceMax` cutoff (420 × spread) past which
 * two nodes stop repelling entirely, so two clusters whose member nodes
 * have already drifted further apart than that stop feeling each other —
 * repulsion cannot even hold a separation it already found, let alone grow
 * it; (3) high-fan-in hub nodes shared by dozens of countries get dragged
 * toward the geometric middle by ordinary link springs and drag their
 * surrounding clusters in after them. This force answers (1) and (2)
 * directly; (3) is a link-force property this file does not touch.
 *
 * **The mechanism**: instead of a node-pair repulsion with a hard cutoff,
 * this is a CLUSTER-pair repulsion — computed once per pair of DIFFERENT
 * clusters' centroids (O(clusters²), the same cheap trade
 * `countryAffinityForce` in `geoAffinity.ts` already makes: ~90 countries
 * is a few thousand pair-ops a tick, not the few hundred thousand a
 * node-pair force would cost), then applied identically to every member
 * of that cluster (O(nodes)). Same two levels as `galaxyForce` — family
 * ("galaxy") and country ("star cluster") — and the same asymmetry:
 * country repulsion is the stronger, tighter one, family repulsion just
 * keeps whole families' regions of space from overlapping.
 *
 * **Inverse-square falloff, not `galaxyForce`'s linear spring.** A literal
 * mirror of the ATTRACTION math (force growing WITH distance from a
 * target) would, applied as repulsion, grow stronger the further two
 * clusters get from each other — a positive-feedback runaway, not a
 * separation force. Repulsion needs the opposite: strong when two
 * clusters overlap, fading out as they separate, the way `charge`'s
 * manybody physics already works for individual nodes. This force keeps
 * that shape but drops `charge`'s hard `distanceMax` wall — since it is
 * cheap at cluster granularity, it can afford to just let 1/d carry every
 * pair down toward (never exactly to) zero instead of clipping distant
 * pairs to exactly zero. **1/d, not 1/d² — measured, not the first guess.**
 * An inverse-SQUARE version was tried first and calibrated against a buggy
 * version of `scripts/measure-cluster-repulsion.ts` that (bug, caught
 * before shipping) let simulation state leak between successive sweep
 * runs, making a genuinely negligible effect look like a real one — a
 * clean re-run (fresh initial positions every time) showed 1/d² needs a
 * dynamic range from a ~24-unit floor to ~2,000-unit real separations
 * (~6,400× in force terms) to do anything, which means a constant strong
 * enough to matter at real cluster separations is already explosive at
 * the floor. 1/d has a much gentler ~80× range across that same span, so
 * one constant can be both felt at real distances and safe at the floor —
 * confirmed below. A `DISTANCE_FLOOR` still keeps the 1/d term from
 * spiking as two centroids approach the same point.
 *
 * Same contract as `galaxyForce`/`countryAffinityForce`: soft (scaled by
 * alpha, added to velocity, never overrides another force), ablatable
 * (gated behind `view.clusterRepulsion`, reads live off a ref so the
 * slider never triggers a rebuild), ignores pinned nodes (`fx` set — the
 * isolated shelf).
 */

export interface ClusterRepulsionNode {
  x: number
  y: number
  z: number
  vx?: number
  vy?: number
  vz?: number
  /** Set only on the isolated shelf — never nudged, same guard as galaxyForce. */
  fx?: number
  country: string
}

/**
 * **Superseded calibration note, kept for the record — read the 2026-08-31
 * paragraph in `view.ts`'s `clusterRepulsion` comment first.** The numbers
 * below were measured on an isolated rig (galaxy/geo/cluster only, no
 * charge or link), then contradicted by a full-system sweep on 2026-08-28
 * that raised the ceiling to 10 — and *that* sweep was itself found not to
 * reproduce on 2026-08-31 (`scripts/measure-forces.ts`, now committed:
 * baseline ratio ~7, not 4.29; off→10 gain 1.4×, not 3.5×). The "shipped
 * ceiling" named here is 3; the shipped ceiling today is 15
 * (`ViewControls.tsx`). Also since 2026-08-31 it is known that these two
 * constants are the only force magnitudes NOT multiplied by the spread
 * multiplier `m`, which is why the slider goes inert at high spread —
 * scaling them by `m` is the one-character fix, but it changes the meaning
 * of every strength value, so the range must be re-derived with the script
 * afterward, not carried over.
 *
 * Original note follows.
 *
 * Relative push strength at each level, calibrated 2026-08-27 against the
 * real corpus with `scripts/measure-cluster-repulsion.ts` (throwaway,
 * deleted after use — not part of the shipped app, see the file-level note
 * on the 1/d² false start). Same metric `galaxyForce.ts`'s range was
 * measured with: the ratio of "how far apart different countries' own
 * centroids settle" to "how tight each country's own members settle
 * around their own centroid", each run from IDENTICAL fresh random
 * initial positions so runs are comparable (the ratio itself varies a few
 * tenths run to run — random init, not a bug — the direction and rough
 * size of the effect below is what to trust, not the exact digits). At
 * strength 1 (these constants, the shipped default): baseline (repulsion
 * off) ~4.1-4.2× → ~4.8-5.2×, own-cluster spread essentially unchanged
 * (424 → 432 units in the confirming run) — the force visibly separates
 * clusters without loosening any cluster's own cohesion. At strength 3
 * (the shipped ceiling): ~4.1-4.2× → ~5.9-6.3×, own-cluster spread up
 * ~15-17% — still no NaN, no runaway across 400 ticks in any run tried.
 * See `view.ts`'s `clusterRepulsion` doc comment for the range decision.
 */
const FAMILY_REPULSION = 120
const COUNTRY_REPULSION = 300

/** A centroid's a running sum, same shape as `galaxyForce.ts`'s `Sum`. */
type Sum = [number, number, number, number]

function addSum(map: Map<string, Sum>, key: string, n: ClusterRepulsionNode) {
  const entry = map.get(key)
  if (entry) {
    entry[0] += n.x
    entry[1] += n.y
    entry[2] += n.z
    entry[3] += 1
  } else {
    map.set(key, [n.x, n.y, n.z, 1])
  }
}

function centroidsOf(sums: Map<string, Sum>): Map<string, [number, number, number]> {
  const out = new Map<string, [number, number, number]>()
  for (const [key, [sx, sy, sz, count]] of sums) out.set(key, [sx / count, sy / count, sz / count])
  return out
}

/** Below this separation, the 1/d term is clamped rather than spiking. */
const DISTANCE_FLOOR = 24

/**
 * Net repulsion vector on every cluster from every OTHER cluster at this
 * level, keyed by cluster id. O(clusters²) once, reused for every member
 * node — the whole reason this is affordable where a node-pair force
 * would not be.
 */
function repulsionOf(
  centroid: Map<string, [number, number, number]>,
  weight: number,
): Map<string, [number, number, number]> {
  const keys = [...centroid.keys()]
  const push = new Map<string, [number, number, number]>()
  for (const a of keys) {
    const [ax, ay, az] = centroid.get(a)!
    let px = 0
    let py = 0
    let pz = 0
    for (const b of keys) {
      if (a === b) continue
      const [bx, by, bz] = centroid.get(b)!
      const dx = ax - bx
      const dy = ay - by
      const dz = az - bz
      const dist = Math.max(Math.hypot(dx, dy, dz), DISTANCE_FLOOR)
      const mag = weight / dist
      px += (dx / dist) * mag
      py += (dy / dist) * mag
      pz += (dz / dist) * mag
    }
    push.set(a, [px, py, pz])
  }
  return push
}

/**
 * A custom d3-force-3d force, same shape as `galaxyForce`/
 * `countryAffinityForce`: a callable that mutates node velocities each
 * tick, plus `.initialize` so the library hands it the live node array
 * when the graph is (re)built.
 *
 * `familyWeight`/`countryWeight` default to the calibrated constants
 * above; the two optional params exist only so
 * a measurement script (`scripts/measure-forces.ts` today;
 * `measure-cluster-repulsion.ts`, since deleted, originally) can sweep them
 * without editing this file — production call sites should never pass them.
 */
export function clusterRepulsionForce(
  strengthRef: { current: number },
  familyWeight = FAMILY_REPULSION,
  countryWeight = COUNTRY_REPULSION,
) {
  let nodes: ClusterRepulsionNode[] = []

  function force(alpha: number) {
    const strength = strengthRef.current
    if (!strength || nodes.length < 2) return

    const familySums = new Map<string, Sum>()
    const countrySums = new Map<string, Sum>()

    for (const n of nodes) {
      if (!Number.isFinite(n.x)) continue
      addSum(familySums, familyOf(n.country as Country), n)
      addSum(countrySums, n.country, n)
    }

    const familyCentroid = centroidsOf(familySums)
    const countryCentroid = centroidsOf(countrySums)
    const familyPush = familySums.size > 1 ? repulsionOf(familyCentroid, familyWeight) : null
    const countryPush = countrySums.size > 1 ? repulsionOf(countryCentroid, countryWeight) : null

    for (const n of nodes) {
      if (n.fx !== undefined || !Number.isFinite(n.x)) continue

      const fp = familyPush?.get(familyOf(n.country as Country))
      if (fp) {
        n.vx = (n.vx ?? 0) + fp[0] * strength * alpha
        n.vy = (n.vy ?? 0) + fp[1] * strength * alpha
        n.vz = (n.vz ?? 0) + fp[2] * strength * alpha
      }

      const cp = countryPush?.get(n.country)
      if (cp) {
        n.vx = (n.vx ?? 0) + cp[0] * strength * alpha
        n.vy = (n.vy ?? 0) + cp[1] * strength * alpha
        n.vz = (n.vz ?? 0) + cp[2] * strength * alpha
      }
    }
  }

  force.initialize = (ns: unknown[]) => {
    nodes = ns as ClusterRepulsionNode[]
  }

  return force
}
