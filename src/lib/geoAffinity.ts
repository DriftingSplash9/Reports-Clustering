import type { Country } from './types'

/**
 * Bilateral force layer for Phase 2 of the usability plan — redesigned
 * 2026-08-12 per Thomas's direction, replacing the "continental repulsion"
 * Grok's plan originally proposed.
 *
 * The rejected version pushed nodes apart purely for sitting on different
 * continents, which is exactly the "position asserts a claim the edges do
 * not make" failure `InfluenceGraph.tsx`'s position-rule comment warns
 * about — continent is not a relationship. This version instead nudges a
 * country's nodes toward or away from another country's nodes based on
 * real ties: shared trade/political blocs attract, a short list of active
 * disputes repels. Thomas's own framing: Canada should end up near the US
 * (and near China, whenever China has nodes at all — it has none today),
 * while Mexico could plausibly sit further out than the Netherlands.
 * Continent stops being the variable; the relationship is.
 *
 * **This is a v1, coarse pass — not a trade-volume dataset.** Bloc
 * membership is public, stable, and fast to get right from general
 * knowledge, which is what "found out easily" bought here. Priced bilateral
 * trade, tariff schedules and a fuller dispute list were not attempted in
 * this pass. Treat `COUNTRY_BLOCS` / `CONFLICT_PAIRS` the way early
 * `release_schedule` coverage was treated: a defensible first pass, meant
 * to be extended in place rather than rearchitected.
 *
 * **Guardrails carried over from the handoff's own conditions for
 * re-approving Phase 2**: soft (scaled by alpha like every other d3 force,
 * never overriding it), ablatable (gated behind `view.geoAffinity`,
 * defaulting to 0 — off until Thomas turns it on), never overriding a
 * documented edge (this force never touches link distance/strength, only
 * adds a node-level nudge alongside the existing forces), never touching
 * authority (does not read or write `size_score`).
 */

export type GeoBloc =
  | 'EU'
  | 'EEA'
  | 'NATO'
  | 'OECD'
  | 'G7'
  | 'COMMONWEALTH'
  | 'USMCA'
  | 'ANZUS'
  | 'COFA'
  | 'WAEMU'
  | 'CEMAC'
  | 'EAC'
  | 'SADC'
  | 'ECOWAS'
  | 'ARAB_LEAGUE'
  | 'AFRICAN_UNION'
  | 'MERCOSUR'

/**
 * Which blocs a country belongs to, for countries actually present in the
 * corpus (mirrors `COUNTRY_FAMILY` in `palette.ts`). A country missing here
 * contributes and receives no bloc-based pull — visible, just ungrouped,
 * the same principle `isKnownCountry` uses for colour.
 *
 * `PR` (Puerto Rico) is deliberately absent, same reasoning `palette.ts`
 * gives for filing it under the `US` family rather than its own: it is a US
 * subsystem, not a separate country to have bilateral relations with.
 */
export const COUNTRY_BLOCS: Partial<Record<string, GeoBloc[]>> = {
  // North America
  CA: ['NATO', 'OECD', 'G7', 'COMMONWEALTH', 'USMCA'],
  US: ['NATO', 'OECD', 'G7', 'USMCA'],

  // EU-27 — all in EU; NATO/OECD set per country rather than assumed,
  // because AT/CY/IE/MT are militarily non-aligned and BG/HR/CY/MT/RO are
  // not OECD members.
  AT: ['EU'],
  BE: ['EU', 'NATO', 'OECD'],
  BG: ['EU', 'NATO'],
  CY: ['EU'],
  CZ: ['EU', 'NATO', 'OECD'],
  DE: ['EU', 'NATO', 'OECD', 'G7'],
  DK: ['EU', 'NATO', 'OECD'],
  EE: ['EU', 'NATO', 'OECD'],
  ES: ['EU', 'NATO', 'OECD'],
  FI: ['EU', 'NATO', 'OECD'],
  FR: ['EU', 'NATO', 'OECD', 'G7'],
  GR: ['EU', 'NATO', 'OECD'],
  HR: ['EU', 'NATO'],
  HU: ['EU', 'NATO', 'OECD'],
  IE: ['EU', 'OECD'],
  IT: ['EU', 'NATO', 'OECD', 'G7'],
  LT: ['EU', 'NATO', 'OECD'],
  LU: ['EU', 'NATO', 'OECD'],
  LV: ['EU', 'NATO', 'OECD'],
  MT: ['EU'],
  NL: ['EU', 'NATO', 'OECD'],
  PL: ['EU', 'NATO', 'OECD'],
  PT: ['EU', 'NATO', 'OECD'],
  RO: ['EU', 'NATO'],
  SE: ['EU', 'NATO', 'OECD'],
  SI: ['EU', 'NATO', 'OECD'],
  SK: ['EU', 'NATO', 'OECD'],

  // Non-EU Europe
  NO: ['EEA', 'NATO', 'OECD'],
  IS: ['EEA', 'NATO', 'OECD'],
  LI: ['EEA'],
  CH: ['EEA', 'OECD'],
  GB: ['NATO', 'OECD', 'G7', 'COMMONWEALTH'],
  AL: ['NATO'],
  ME: ['NATO'],
  MK: ['NATO'],
  RS: [],
  BA: [],
  TR: ['NATO', 'OECD'],
  UA: [],
  MD: [],
  XK: [],
  GL: ['NATO'],

  // South Asia & Oceania
  AU: ['ANZUS', 'OECD', 'COMMONWEALTH'],
  NZ: ['ANZUS', 'OECD', 'COMMONWEALTH'],
  CK: ['COMMONWEALTH'],
  NU: ['COMMONWEALTH'],
  TK: [],
  FM: ['COFA'],
  MH: ['COFA'],
  PW: ['COFA'],

  // Africa — African Union first (near-universal on this continent, and the
  // whole reason "AFRISTAT + Charter hub nodes" is on the priority menu:
  // continental structure is real here), then the sub-regional bloc, then
  // Commonwealth/Arab League where it applies.
  ZA: ['AFRICAN_UNION', 'SADC', 'COMMONWEALTH'],
  EG: ['AFRICAN_UNION', 'ARAB_LEAGUE'],
  KE: ['AFRICAN_UNION', 'EAC', 'COMMONWEALTH'],
  ET: ['AFRICAN_UNION'],
  GH: ['AFRICAN_UNION', 'ECOWAS', 'COMMONWEALTH'],
  NG: ['AFRICAN_UNION', 'ECOWAS', 'COMMONWEALTH'],
  TZ: ['AFRICAN_UNION', 'EAC', 'COMMONWEALTH'],
  BW: ['AFRICAN_UNION', 'SADC', 'COMMONWEALTH'],
  NA: ['AFRICAN_UNION', 'SADC', 'COMMONWEALTH'],
  LS: ['AFRICAN_UNION', 'SADC', 'COMMONWEALTH'],
  SZ: ['AFRICAN_UNION', 'SADC', 'COMMONWEALTH'],
  ZM: ['AFRICAN_UNION', 'SADC', 'COMMONWEALTH'],
  MW: ['AFRICAN_UNION', 'SADC', 'COMMONWEALTH'],
  ZW: ['AFRICAN_UNION', 'SADC', 'COMMONWEALTH'],
  UG: ['AFRICAN_UNION', 'EAC', 'COMMONWEALTH'],
  RW: ['AFRICAN_UNION', 'EAC', 'COMMONWEALTH'],
  DZ: ['AFRICAN_UNION', 'ARAB_LEAGUE'],
  MA: ['AFRICAN_UNION', 'ARAB_LEAGUE'],
  TN: ['AFRICAN_UNION', 'ARAB_LEAGUE'],
  LY: ['AFRICAN_UNION', 'ARAB_LEAGUE'],
  SN: ['AFRICAN_UNION', 'WAEMU', 'ECOWAS'],
  CI: ['AFRICAN_UNION', 'WAEMU', 'ECOWAS'],
  CM: ['AFRICAN_UNION', 'CEMAC'],
  ML: ['AFRICAN_UNION', 'WAEMU', 'ECOWAS'],
  BF: ['AFRICAN_UNION', 'WAEMU', 'ECOWAS'],
  TG: ['AFRICAN_UNION', 'WAEMU', 'ECOWAS'],
  GA: ['AFRICAN_UNION', 'CEMAC'],
  TD: ['AFRICAN_UNION', 'CEMAC'],

  // South America
  BR: ['MERCOSUR'],
}

/**
 * Countries actively working against each other, as a citable present-day
 * fact rather than assembled history. Deliberately short — a long list
 * built from general knowledge with no sourcing would be exactly the
 * unevidenced-claim problem the evidence rule exists to keep out of the
 * corpus itself. Everything else that should read as distant does so for
 * free, by sharing no bloc with anyone it is far from — repulsion by
 * absence of attraction, not by assertion.
 */
export const CONFLICT_PAIRS: [string, string][] = [
  // Morocco and Algeria: land border closed since 1994, diplomatic relations
  // severed by Algeria in 2021, over Western Sahara.
  ['MA', 'DZ'],
]

const BLOC_WEIGHT = 0.16
const MAX_BLOC_ATTRACTION = 0.6
const CONFLICT_REPULSION = -0.55

const CONFLICT_KEYS = new Set(CONFLICT_PAIRS.map(([a, b]) => [a, b].sort().join('|')))

/**
 * -1 (repel) to +1 (attract), 0 for unrelated or unknown. Symmetric.
 *
 * Deliberately returns 0 for `INT` and any country missing from
 * `COUNTRY_BLOCS` — a stateless body (the IMF, the UN) or an unmapped code
 * has no bilateral relationship to encode, and forcing one on it would
 * repeat the mistake `shelveIsolated`'s comment in `InfluenceGraph.tsx`
 * warns against for isolated nodes: asserting a claim the data does not
 * contain.
 */
export function affinityScore(a: Country, b: Country): number {
  if (a === b || a === 'INT' || b === 'INT') return 0

  if (CONFLICT_KEYS.has([a, b].sort().join('|'))) return CONFLICT_REPULSION

  const blocsA = COUNTRY_BLOCS[a]
  const blocsB = COUNTRY_BLOCS[b]
  if (!blocsA || !blocsB) return 0

  const shared = blocsA.filter((bloc) => blocsB.includes(bloc)).length
  return Math.min(MAX_BLOC_ATTRACTION, shared * BLOC_WEIGHT)
}

/** The minimum a d3-force-3d node needs to carry for this force to act on it. */
export interface GeoNode {
  x: number
  y: number
  z: number
  vx?: number
  vy?: number
  vz?: number
  /** Set only on the isolated shelf (see `shelveIsolated`) — never nudged. */
  fx?: number
  country: string
}

/**
 * A custom d3-force-3d force, built the way the library's own forces are:
 * a callable that mutates node velocities each tick, plus `.initialize` so
 * the library can hand it the live node array when the graph is (re)built.
 *
 * Reads `strengthRef.current` on every call rather than closing over a
 * fixed number, so the View panel's slider can retune this live — the way
 * `focusRef`/`visibleRef` let other settings update without rebuilding
 * `forceGraph`. That matters here specifically: `spread` already costs a
 * full 400-tick re-warmup on every change (see the handoff on `runFit`),
 * and this force must not add a second slider with the same cost.
 *
 * O(countries²) once per tick to resolve each country's pull direction,
 * then O(nodes) to apply it — not O(nodes²). At ~90 countries and ~800
 * nodes that is a few thousand operations a tick, not a few hundred
 * thousand.
 */
export function countryAffinityForce(strengthRef: { current: number }) {
  let nodes: GeoNode[] = []

  function force(alpha: number) {
    const strength = strengthRef.current
    if (!strength || !nodes.length) return

    const sums = new Map<string, [number, number, number, number]>()
    for (const n of nodes) {
      if (!Number.isFinite(n.x) || n.country === 'INT') continue
      const entry = sums.get(n.country)
      if (entry) {
        entry[0] += n.x
        entry[1] += n.y
        entry[2] += n.z
        entry[3] += 1
      } else {
        sums.set(n.country, [n.x, n.y, n.z, 1])
      }
    }
    if (sums.size < 2) return

    const centroid = new Map<string, [number, number, number]>()
    for (const [country, [sx, sy, sz, count]] of sums) {
      centroid.set(country, [sx / count, sy / count, sz / count])
    }

    const countries = [...centroid.keys()]
    const pull = new Map<string, [number, number, number]>()
    for (const a of countries) {
      const [ax, ay, az] = centroid.get(a)!
      let px = 0
      let py = 0
      let pz = 0
      for (const b of countries) {
        if (a === b) continue
        const score = affinityScore(a as Country, b as Country)
        if (!score) continue
        const [bx, by, bz] = centroid.get(b)!
        const dx = bx - ax
        const dy = by - ay
        const dz = bz - az
        const dist = Math.hypot(dx, dy, dz) || 1
        px += (dx / dist) * score
        py += (dy / dist) * score
        pz += (dz / dist) * score
      }
      pull.set(a, [px, py, pz])
    }

    for (const n of nodes) {
      if (n.fx !== undefined || n.country === 'INT') continue
      const p = pull.get(n.country)
      if (!p) continue
      n.vx = (n.vx ?? 0) + p[0] * strength * alpha
      n.vy = (n.vy ?? 0) + p[1] * strength * alpha
      n.vz = (n.vz ?? 0) + p[2] * strength * alpha
    }
  }

  force.initialize = (ns: unknown[]) => {
    nodes = ns as GeoNode[]
  }

  return force
}
