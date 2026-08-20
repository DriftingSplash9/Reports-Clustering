import type { Country } from './types'
import { familyOf } from './palette'

/**
 * "Galaxies" — Thomas's own image, 2026-08-20, floated half-asleep the same
 * evening the per-country fold shipped: *"should I abandon the idea of
 * having the graph represent the world... make it so that each continent is
 * its own cluster — imagine each one is a galaxy of its own like the
 * milkyway and andromeda."* Presented as one of four options (alongside a
 * blunt node cap, full separate per-continent scenes, and a layout-only
 * middle path); he picked this — a hierarchical containment force inside
 * the EXISTING single scene — as the first move, explicitly cheaper than a
 * multi-scene rewrite and worth trying before committing to one.
 *
 * **This deliberately revisits, not reads as ignorant of, the
 * `countryAffinityForce` design note in `geoAffinity.ts`.** That force was
 * built 2026-08-12 specifically to REJECT pure continental/family grouping
 * — *"the rejected version pushed nodes apart purely for sitting on
 * different continents... continent is not a relationship."* That objection
 * was, and still is, correct for BILATERAL pull between two *different*
 * countries: which country you end up near should be a fact about real
 * ties, not membership in the same colour bucket. This force does not do
 * that. It never moves one country toward or away from another based on
 * what family either belongs to — it only pulls a node toward its OWN
 * family's centroid and its OWN country's centroid, the same "gravity
 * toward your own group" every d3 cluster-force pattern uses. The picture
 * this produces — countries visibly clumping inside their family's region
 * of space — is the same shape geoAffinity was built to avoid getting "for
 * free" as an accidental side effect of an unrelated force. Here it is not
 * an accident; Thomas asked for exactly this shape, by name, with a mental
 * model (Milky Way / Andromeda) that only makes sense if it's deliberate.
 * Both calls are right for what they were asked to do.
 *
 * **Two levels, one nested inside the other, same mechanism twice.** Every
 * node is pulled toward two centroids every tick: its family's (the
 * "galaxy") and its own country's (the "star cluster" inside that galaxy).
 * The country pull is the STRONGER, tighter one — Thomas's Canada example
 * was "the provinces are not random, they'd be separate clusters just like
 * the continents", i.e. the tight, well-defined shape should be the
 * INNERMOST group, with the outer level just keeping same-family clusters
 * from drifting into each other's territory. Countries within a family end
 * up as visibly distinct knots; the existing charge/collision forces (see
 * `InfluenceGraph.tsx`) keep those knots from collapsing into one point,
 * the same way they already keep individual nodes apart.
 *
 * **Provinces and municipalities are NOT a third level here, yet — checked,
 * not assumed.** A province/municipal report's only human-readable location
 * is `Report.region`, free text. Sampled the real corpus before writing
 * this: of 606 provincial/municipal reports, only 130 (21%) follow a
 * splittable "Country — Province" shape; the rest are prose ("Yaoundé,
 * Cameroon", "All 77 communes of Bénin, individually named by department")
 * with no single reliable delimiter, and a number describe several sub-units
 * in one blob with nothing to extract at all. Clustering by a field that
 * wrong 79% of the time would read as broken, not as structure. The country
 * level above is exactly this same idea already proven safe to build (every
 * report's `country` is a clean, validated field) — extending this force to
 * a third, sub-national level is mechanically identical once the schema
 * carries a clean field for it; it is a data task, not a rendering one, and
 * belongs in its own pass rather than being faked from prose today.
 *
 * **Same contract as `countryAffinityForce`**: soft (scaled by alpha, added
 * to velocity, never overriding another force), ablatable (gated behind
 * `view.galaxy`, reads live off a ref so the slider never triggers a
 * layout rebuild), ignores pinned nodes (`fx` set — the isolated shelf).
 * Cost is O(nodes) per tick to accumulate two sets of running sums, then
 * O(nodes) again to apply — no pairwise term at all, cheaper than the
 * O(countries²) bilateral force it sits alongside.
 */

export interface GalaxyNode {
  x: number
  y: number
  z: number
  vx?: number
  vy?: number
  vz?: number
  /** Set only on the isolated shelf — never nudged, same guard as geoAffinity. */
  fx?: number
  country: string
}

/**
 * Relative pull toward each level's centroid. Country is the stronger,
 * tighter pull (the visible "cluster" shape); family is the gentler one
 * that just keeps a family's countries from drifting apart — see the
 * file-level note for why the ordering is deliberate. Both are spring
 * constants in the standard d3 `forceX`/`forceY` sense (multiplied by raw
 * distance to the target, not a normalised direction), so they are an
 * order of magnitude smaller than `geoAffinity.ts`'s weights, which
 * multiply a unit vector instead — the two are not comparable numbers.
 */
const FAMILY_PULL = 0.028
const COUNTRY_PULL = 0.07

type Sum = [number, number, number, number]

function addSum(map: Map<string, Sum>, key: string, n: GalaxyNode) {
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

/**
 * A custom d3-force-3d force, same shape as `countryAffinityForce`: a
 * callable that mutates node velocities each tick, plus `.initialize` so
 * the library hands it the live node array when the graph is (re)built.
 * Reads `strengthRef.current` every tick rather than closing over a fixed
 * number, so `view.galaxy`'s slider retunes this live with no rebuild.
 */
export function galaxyForce(strengthRef: { current: number }) {
  let nodes: GalaxyNode[] = []

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

    for (const n of nodes) {
      if (n.fx !== undefined || !Number.isFinite(n.x)) continue

      const fc = familyCentroid.get(familyOf(n.country as Country))
      if (fc) {
        n.vx = (n.vx ?? 0) + (fc[0] - n.x) * FAMILY_PULL * strength * alpha
        n.vy = (n.vy ?? 0) + (fc[1] - n.y) * FAMILY_PULL * strength * alpha
        n.vz = (n.vz ?? 0) + (fc[2] - n.z) * FAMILY_PULL * strength * alpha
      }

      const cc = countryCentroid.get(n.country)
      if (cc) {
        n.vx = (n.vx ?? 0) + (cc[0] - n.x) * COUNTRY_PULL * strength * alpha
        n.vy = (n.vy ?? 0) + (cc[1] - n.y) * COUNTRY_PULL * strength * alpha
        n.vz = (n.vz ?? 0) + (cc[2] - n.z) * COUNTRY_PULL * strength * alpha
      }
    }
  }

  force.initialize = (ns: unknown[]) => {
    nodes = ns as GalaxyNode[]
  }

  return force
}
