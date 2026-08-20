import type { Country } from './types'
import { COUNTRY_BLOCS, type GeoBloc } from './geoAffinity'
import { COUNTRY_LABEL, countryLabelFor, isKnownCountry } from './palette'

/**
 * Regions, blocs and organisations as first-class, selectable, ISOLATABLE
 * things — 2026-08-20, Thomas's follow-up to the Isolate feature:
 * *"if I select countries from the panel it brings up 12 mixed nations and
 * organizations/regions... we should have a menu with north america, south
 * america, asia, europe, middle east, pacific islands, IMF, eu, brics,
 * etc. The other panel can simply be a directory of nations. when we open a
 * nation or region we should see how it ties to the international level and
 * the connections within it."*
 *
 * The existing "Countries" chip bar (`SCOPE_GROUPS` in palette.ts, rendered
 * by `ChipBar` in App.tsx) is a **filter**: it hides nodes outside the chosen
 * colour family, and `applyFilter`'s both-endpoints-visible rule means an
 * edge to anything outside the family is silently dropped — exactly the
 * behaviour the Isolate feature (2026-08-20, earlier the same day) was built
 * to avoid. `SCOPE_GROUPS` is also keyed to `ColourFamily`, a palette
 * concept — twelve hue buckets, six of which happen to be single countries
 * (CA, US, AU, NZ, CN, IN) and the rest whole continents (EU, XEU, ASIA,
 * AFR, SA) or the stateless bucket (INT). That is "12 mixed nations and
 * organizations" exactly as reported.
 *
 * This file is a SEPARATE, parallel concept, deliberately not a rename of
 * the above: a `RegionGroup` is a named set of countries (a continent, a
 * treaty bloc) or a named set of reports (a publisher, for stateless bodies
 * with no country at all — the IMF has none). Selecting one computes a seed
 * set and hands it to `computeGroupFocus` (selection.ts) over the UNFILTERED
 * focus index, the same Isolate mechanism a single node uses — so "open
 * Asia" shows every Asian report, every edge between them, AND every edge
 * either end has to an international body, because that walk simply follows
 * real edges wherever they lead. It never touches `FilterState`/`scopes`.
 *
 * Continent and bloc membership is read from the SAME single sources of
 * truth the rest of the app already uses — `CONTINENT_OF` below is new (nothing
 * else needed a continent), but bloc membership reuses `COUNTRY_BLOCS` from
 * `geoAffinity.ts` outright rather than re-deriving it, so this can never
 * disagree with the galaxy/geo-affinity layout about who is in NATO or BRICS.
 */

/**
 * Coarse continents — NOT the same partition as `ColourFamily`. Deliberately
 * pulls Middle East out of Asia/Africa (Thomas asked for it by name) and
 * folds Russia into Asia and Greenland into Europe, matching the calls
 * `palette.ts` already made for `COUNTRY_FAMILY`/`COUNTRY_LABEL` (Russia was
 * filed under the `ASIA` family 2026-08-13; Greenland under `XEU` — "no `NA`
 * family... constitutionally European" — 2026-08-06) rather than re-litigate
 * either. `International` is its own bucket for `INT` and any code this
 * table has no opinion about, so nothing silently falls off the map.
 */
export type Continent =
  | 'North America'
  | 'South America'
  | 'Europe'
  | 'Middle East'
  | 'Africa'
  | 'Asia'
  | 'Oceania & Pacific'
  | 'International'

/**
 * Every one of the 142 country codes present in the corpus at time of
 * writing (2026-08-20, post-mint), verified by a direct script cross-check
 * against `src/data/research/*.json` — zero missing, zero stray entries. A
 * code the corpus later gains that is missing here falls back to
 * `'International'` (see `continentOf`) rather than throwing: visible, just
 * unclassified, the same principle `familyOf`'s `?? 'INT'` fallback uses.
 */
const CONTINENT_OF: Partial<Record<string, Continent>> = {
  // North America
  CA: 'North America', US: 'North America', MX: 'North America', PR: 'North America',

  // South America
  AR: 'South America', BO: 'South America', BR: 'South America', CL: 'South America',
  CO: 'South America', EC: 'South America', GY: 'South America', PE: 'South America',
  PY: 'South America', SR: 'South America', UY: 'South America', VE: 'South America',

  // Europe — the EU-27, non-EU Europe (XEU family), and Greenland, matching
  // `COUNTRY_FAMILY`'s own placement of GL. `EU` itself (the bloc's own
  // reports) reads as Europe here; it is ALSO its own `RegionGroup` below.
  AT: 'Europe', BE: 'Europe', BG: 'Europe', CH: 'Europe', CY: 'Europe', CZ: 'Europe',
  DE: 'Europe', DK: 'Europe', EE: 'Europe', ES: 'Europe', FI: 'Europe', FR: 'Europe',
  GB: 'Europe', GR: 'Europe', HR: 'Europe', HU: 'Europe', IE: 'Europe', IS: 'Europe',
  IT: 'Europe', LI: 'Europe', LT: 'Europe', LU: 'Europe', LV: 'Europe', MD: 'Europe',
  ME: 'Europe', MK: 'Europe', MT: 'Europe', NL: 'Europe', NO: 'Europe', PL: 'Europe',
  PT: 'Europe', RO: 'Europe', RS: 'Europe', SE: 'Europe', SI: 'Europe', SK: 'Europe',
  TR: 'Europe', UA: 'Europe', XK: 'Europe', AL: 'Europe', BA: 'Europe', EU: 'Europe',
  GL: 'Europe',

  // Middle East — split out of Asia/Africa on request. Egypt, Algeria,
  // Morocco, Tunisia, Libya stay under Africa (matching their AFR family and
  // African Union membership already recorded in COUNTRY_BLOCS) despite
  // Arab League overlap — a country counts once here, and its continent is
  // its geography, not its treaty memberships (those are the bloc groups).
  AE: 'Middle East', IL: 'Middle East', IQ: 'Middle East', IR: 'Middle East',
  SA: 'Middle East', SY: 'Middle East', YE: 'Middle East',

  // Africa
  AO: 'Africa', BF: 'Africa', BI: 'Africa', BJ: 'Africa', BW: 'Africa', CD: 'Africa',
  CF: 'Africa', CG: 'Africa', CI: 'Africa', CM: 'Africa', CV: 'Africa', DJ: 'Africa',
  DZ: 'Africa', EG: 'Africa', ER: 'Africa', ET: 'Africa', GA: 'Africa', GH: 'Africa',
  GM: 'Africa', GN: 'Africa', GQ: 'Africa', GW: 'Africa', KE: 'Africa', KM: 'Africa',
  LR: 'Africa', LS: 'Africa', LY: 'Africa', MA: 'Africa', MG: 'Africa', ML: 'Africa',
  MR: 'Africa', MU: 'Africa', MW: 'Africa', MZ: 'Africa', NA: 'Africa', NE: 'Africa',
  NG: 'Africa', RW: 'Africa', SC: 'Africa', SD: 'Africa', SL: 'Africa', SN: 'Africa',
  SO: 'Africa', SS: 'Africa', ST: 'Africa', SZ: 'Africa', TD: 'Africa', TG: 'Africa',
  TN: 'Africa', TZ: 'Africa', UG: 'Africa', ZA: 'Africa', ZM: 'Africa', ZW: 'Africa',

  // Asia — including Russia, matching its existing `ASIA` ColourFamily entry.
  AF: 'Asia', CN: 'Asia', ID: 'Asia', IN: 'Asia', JP: 'Asia', KR: 'Asia', MM: 'Asia',
  PH: 'Asia', SG: 'Asia', TH: 'Asia', TW: 'Asia', VN: 'Asia', RU: 'Asia',

  // Oceania & Pacific — Australia, New Zealand, and the Realm/Compact states
  // that already share NZ's colour family.
  AU: 'Oceania & Pacific', CK: 'Oceania & Pacific', FM: 'Oceania & Pacific',
  MH: 'Oceania & Pacific', NU: 'Oceania & Pacific', NZ: 'Oceania & Pacific',
  PW: 'Oceania & Pacific', TK: 'Oceania & Pacific',

  INT: 'International',
}

export function continentOf(country: Country): Continent {
  return CONTINENT_OF[country] ?? 'International'
}

/** All eight continents, in the order the panel lists them. */
export const CONTINENTS: Continent[] = [
  'International',
  'North America',
  'South America',
  'Europe',
  'Middle East',
  'Africa',
  'Asia',
  'Oceania & Pacific',
]

/**
 * Blocs surfaced as their own selectable group, alongside continents.
 * Deliberately a SUBSET of `GeoBloc` — every bloc `COUNTRY_BLOCS` already
 * tracks is technically selectable by adding it here, but a menu with EEA,
 * COFA and WAEMU in it is not what "IMF, EU, BRICS, etc." asked for. These
 * are the blocs Thomas is likely to actually recognise and want; add more
 * from `GeoBloc` freely; the mechanism does not care which.
 */
const FEATURED_BLOCS: GeoBloc[] = [
  'EU', 'NATO', 'OECD', 'G7', 'BRICS', 'COMMONWEALTH', 'USMCA', 'MERCOSUR',
  'ARAB_LEAGUE', 'AFRICAN_UNION',
]

const BLOC_LABEL: Record<GeoBloc, string> = {
  EU: 'European Union',
  EEA: 'European Economic Area',
  NATO: 'NATO',
  OECD: 'OECD',
  G7: 'G7',
  COMMONWEALTH: 'Commonwealth',
  USMCA: 'USMCA',
  ANZUS: 'ANZUS',
  COFA: 'Compact of Free Association',
  WAEMU: 'WAEMU',
  CEMAC: 'CEMAC',
  EAC: 'East African Community',
  SADC: 'SADC',
  ECOWAS: 'ECOWAS',
  ARAB_LEAGUE: 'Arab League',
  AFRICAN_UNION: 'African Union',
  MERCOSUR: 'MERCOSUR',
  BRICS: 'BRICS',
}

/**
 * Stateless publishers with no country of their own — `INT` reports whose
 * `publisher` names a specific body. Matched by substring against the raw
 * publisher string, not an exact list of ids, because the same body appears
 * under slightly different names across reports ("World Bank" vs "World
 * Bank (IDA)"). Order matters only for the panel's listing.
 *
 * This is a first pass, not exhaustive — `src/data/research` carries 207
 * distinct INT publisher strings; these are the handful with enough reports
 * to be worth their own group. Extend freely.
 */
const PUBLISHER_ORGS: { id: string; label: string; match: string[] }[] = [
  { id: 'imf', label: 'IMF', match: ['International Monetary Fund'] },
  { id: 'world-bank', label: 'World Bank', match: ['World Bank'] },
  { id: 'un', label: 'United Nations', match: ['United Nations'] },
  { id: 'oecd-pub', label: 'OECD (as publisher)', match: ['OECD'] },
]

export type RegionGroupKind = 'continent' | 'bloc' | 'publisher' | 'country'

/**
 * One selectable unit for the Regions & Organizations panel or the Countries
 * directory. `match` is the seed predicate against a **disclosed** node —
 * `country` and `publisher` are read straight off `ScoredReport`/`OrbNode`
 * (both carry them; an orb's `publisher` is a synthetic "N folded reports"
 * string, so publisher-kind groups additionally check `members` when
 * present — see `reportIdsForGroup`).
 */
export interface RegionGroup {
  id: string
  kind: RegionGroupKind
  label: string
  /** Present for kind 'continent' | 'country'. */
  continent?: Continent
  country?: Country
  /** Present for kind 'bloc'. */
  bloc?: GeoBloc
  /** Present for kind 'publisher'. */
  publisherMatch?: string[]
}

/** Continents and blocs and publisher-orgs — the "Regions & Organizations" panel. */
export const REGION_GROUPS: RegionGroup[] = [
  ...CONTINENTS.map((continent) => ({
    id: `continent:${continent}`,
    kind: 'continent' as const,
    label: continent,
    continent,
  })),
  ...FEATURED_BLOCS.map((bloc) => ({
    id: `bloc:${bloc}`,
    kind: 'bloc' as const,
    label: BLOC_LABEL[bloc],
    bloc,
  })),
  ...PUBLISHER_ORGS.map((org) => ({
    id: `publisher:${org.id}`,
    kind: 'publisher' as const,
    label: org.label,
    publisherMatch: org.match,
  })),
]

/**
 * Every individual country the corpus knows a label for — the "Countries"
 * directory panel. Derived from `COUNTRY_LABEL` rather than hand-duplicated,
 * so a country added there (the normal path when a country's first node
 * lands) appears here automatically. Sorted by label, not code — a directory
 * is browsed by name.
 */
export const COUNTRY_GROUPS: RegionGroup[] = Object.keys(COUNTRY_LABEL)
  .filter((code) => code !== 'INT' && code !== 'EU' && isKnownCountry(code))
  .map((code) => ({
    id: `country:${code}`,
    kind: 'country' as const,
    label: countryLabelFor(code),
    country: code,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

/** The minimal shape `reportIdsForGroup` needs from a disclosed node. */
export interface GroupMatchable {
  id: string
  country: Country
  publisher: string
  /** Present on orb nodes only — the real reports folded into it. */
  members?: readonly { publisher: string }[]
}

function publisherMatches(publisher: string, needles: string[]): boolean {
  return needles.some((needle) => publisher.includes(needle))
}

/** True if this disclosed node — real report or orb, either — belongs to `group`. */
export function matchesRegionGroup(node: GroupMatchable, group: RegionGroup): boolean {
  switch (group.kind) {
    case 'continent':
      return continentOf(node.country) === group.continent
    case 'country':
      return node.country === group.country
    case 'bloc':
      return !!COUNTRY_BLOCS[node.country]?.includes(group.bloc as GeoBloc)
    case 'publisher': {
      const needles = group.publisherMatch ?? []
      if (publisherMatches(node.publisher, needles)) return true
      // An orb's own `publisher` field is a synthetic "N folded reports"
      // string — check the real reports folded into it instead, so a
      // country orb that happens to contain one IMF report is still found.
      return (node.members ?? []).some((m) => publisherMatches(m.publisher, needles))
    }
    default:
      return false
  }
}

/** Every disclosed node id belonging to `group` — the seed set for `computeGroupFocus`. */
export function reportIdsForGroup(
  nodes: readonly GroupMatchable[],
  group: RegionGroup,
): Set<string> {
  const ids = new Set<string>()
  for (const n of nodes) if (matchesRegionGroup(n, group)) ids.add(n.id)
  return ids
}
