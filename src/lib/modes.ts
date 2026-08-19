import { COUNTRY_BLOCS } from './geoAffinity'
import {
  BRICS_INK,
  FAMILY_INK,
  familyOf,
  isKnownCountry,
  type ColourFamily,
} from './palette'
import type { Country } from './types'

/**
 * Lens modes — Phase 2 of the visual revamp, built 2026-08-19.
 *
 * The graph normally answers exactly one question at all times: *which country
 * published this?* A lens re-asks the colour question without touching
 * anything else — no new geometry, no re-layout, no camera move. Each mode is
 * nothing but a country → fill-colour function, applied by the same
 * mutate-don't-rebuild recolour pass `levelColours` already uses in
 * `InfluenceGraph.tsx`.
 *
 * **The one hard rule, from the review (§2) and proven by the blueprint
 * precedent: the lens must NEVER appear in the `forceGraph` memo's dependency
 * array.** Every memo change resets `fitted`, `userOwnsCamera` and
 * `settledOnce` and re-warms the layout — five modes as memo deps would mean a
 * camera reset and a physics re-warm on every lens change. The lens travels
 * through a ref plus a mutation effect, mirroring `levelColoursRef`.
 *
 * Precedence, where lenses meet the older single-family recolour
 * (`focusPalette`): the lens wins. `focusPalette` is effectively a
 * country-detail lens that engages itself when the filter narrows to one
 * family; an explicit lens choice is the stronger statement of intent. Clear
 * the lens and the narrowed view comes back.
 *
 * Blueprint suspends lenses entirely, the same way it suspends the
 * single-family recolour: on paper the fill is not a channel (every node is
 * the same pale disc), so there is nothing for a lens to recolour. The
 * controls say so rather than silently doing nothing.
 *
 * What a lens does NOT recolour, v1, deliberate: edges, pulses and orbs keep
 * their family ink. Fill is "very nearly the only channel that has to be
 * mode-switchable" (review §2) — ship the fill pass, look at it, and only then
 * decide whether the ink system should follow the lens. Orbs are skipped for
 * the same reason the level recolour skips them: they are aggregates, and the
 * recolour effect already excludes them by id.
 */
export type LensMode = 'STANDARD' | 'GROUP_COMPARISON' | 'WORLD_OVERVIEW'

/**
 * The five inks of GROUP_COMPARISON. This is the one panel the review
 * rendered that "works, unambiguously" at any node size (§3.4, panel D):
 * red / yellow / green / white / grey is instantly separable at 6px.
 */
export type ComparisonGroup = 'US' | 'BRICS' | 'EU' | 'INT' | 'OTHER'

/**
 * Which comparison group a country belongs to.
 *
 * BRICS membership is read off `COUNTRY_BLOCS` in `geoAffinity.ts` — the
 * bloc table is the single home of "who is in what", added there rather than
 * here precisely so the layout force and the lens can never disagree about
 * membership. Checked before family: South Africa is AFR by palette and BRICS
 * by treaty, and in this lens the treaty is the question being asked. The
 * same goes for Egypt and Ethiopia (AFR) and the UAE (ASIA).
 *
 * EU means the EU family — the 27, plus the EU's own bodies. XEU (the non-EU
 * European offices: GB, NO, CH, the accession belt) is deliberately OTHER
 * here: this lens compares blocs, and "European but not EU" is exactly the
 * distinction the XEU split exists to preserve.
 *
 * An unmapped country is OTHER, not INT — `familyOf` falls back to INT for
 * unknowns, which is right for the palette (a stateless body's grey-white)
 * and wrong here (an unknown country is not a stateless body).
 */
export function groupOf(country: Country): ComparisonGroup {
  if (!isKnownCountry(country)) return 'OTHER'
  if (COUNTRY_BLOCS[country]?.includes('BRICS')) return 'BRICS'
  const family = familyOf(country)
  if (family === 'US') return 'US'
  if (family === 'EU') return 'EU'
  if (family === 'INT') return 'INT'
  return 'OTHER'
}

/**
 * "Everything else" grey. Same value as `COMMERCIAL_COLOUR`, by choice rather
 * than by accident: both mean "outside the axis this view is comparing", and
 * inside this lens the eight commercial nodes are outside the bloc question
 * too, so one grey telling one story is the honest render. A separate
 * constant so the meanings stay separately tunable if that ever stops being
 * true.
 */
export const GROUP_OTHER_INK = '#5a616e'

export const GROUP_INK: Record<ComparisonGroup, string> = {
  US: FAMILY_INK.US, // pure red — reserved to the US alone, moat and all
  BRICS: BRICS_INK, // the group yellow that belongs to no single family
  EU: FAMILY_INK.EU,
  INT: FAMILY_INK.INT, // achromatic near-white: stateless
  OTHER: GROUP_OTHER_INK,
}

/**
 * Asia-Pacific in WORLD_OVERVIEW — `#6c6cff` from the review's panel E,
 * absorbing ASIA, CN, IN, AU and NZ. Not any one member's family ink,
 * deliberately: if the roll-up wore CN's blue, China would read as "the
 * continent" the same way it must not read as "the BRICS one".
 */
export const ASIA_PACIFIC_INK = '#6c6cff'

/**
 * WORLD_OVERVIEW — the seven-way continental roll-up.
 *
 * Twelve families as flat fills was measured and does not work at small node
 * sizes: eleven hues around a circle is ~25° apart, below discrimination
 * threshold (review §3.4, panel B — "no hue assignment fixes it. I tried
 * three."). Panel E's seven — minimum separation ~40° — reads cleanly. The
 * full twelve still appear everywhere you have narrowed: under a filter,
 * where `focusPalette()` spreads one family's ladder across the wheel. Note
 * the roll-up was re-measured at the Phase 0 sizes (12px+) and twelve became
 * viable — but seven remains the choice for THIS lens, because overview is
 * the one view where separability beats specificity.
 */
export const WORLD_INK: Record<ColourFamily, string> = {
  US: FAMILY_INK.US,
  CA: FAMILY_INK.CA, // cyan at the US antipode — the pair that must never merge
  EU: FAMILY_INK.EU,
  XEU: FAMILY_INK.EU, // Europe folds together at this distance
  AFR: FAMILY_INK.AFR,
  SA: FAMILY_INK.SA,
  ASIA: ASIA_PACIFIC_INK,
  CN: ASIA_PACIFIC_INK,
  IN: ASIA_PACIFIC_INK,
  AU: ASIA_PACIFIC_INK,
  NZ: ASIA_PACIFIC_INK,
  INT: FAMILY_INK.INT,
}

/**
 * The lens's fill for a country, or null where the lens has nothing to say —
 * STANDARD always, and any country the palette cannot place (those fall
 * through to `colourForReport`, whose `UNCLASSIFIED_COLOUR` is the honest
 * mark for them in every mode).
 */
export function lensColourFor(country: Country, lens: LensMode): string | null {
  if (lens === 'GROUP_COMPARISON') return GROUP_INK[groupOf(country)]
  if (lens === 'WORLD_OVERVIEW') {
    if (!isKnownCountry(country)) return null
    return WORLD_INK[familyOf(country)]
  }
  return null
}
