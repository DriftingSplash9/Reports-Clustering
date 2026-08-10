import type {
  Country,
  JurisdictionLevel,
  Report,
  SourceKind,
} from './types'

/**
 * Node colour is keyed to **publisher scope**, where scope is the pair
 * (country, jurisdiction level) rather than the level alone.
 *
 * The level-only version was wrong at this size in a way that only showed once
 * the graph was mostly federal. 62 of 121 nodes were "federal / national" and
 * all of them were the same blue — so the largest single group on screen
 * silently merged Statistics Canada with the Bureau of Labor Statistics, which
 * are the two systems the graph most exists to tell apart. Country was carried
 * only by a rim, and a rim cannot separate sixty dots at fit zoom.
 *
 * So: **hue family says which country, position within the family says which
 * level.** Warm is Canada, cool is the United States, violet is international.
 * The families are far enough apart to read in peripheral vision, and the
 * shades inside each are close enough to still read as one family — which is
 * the point, because "all the Canadian ones" is a question people ask and "all
 * the provincial ones across both countries" mostly is not.
 *
 * Every combination that exists in the data gets an entry. `US:provincial` is
 * here with no nodes behind it yet, because US state-level releases are the
 * obvious next expansion and the colour should not be chosen in a hurry then.
 */
/**
 * **Colour is keyed to a hue *family*, not to a country** — added 2026-08-04,
 * when `Country` opened up to arbitrary ISO codes.
 *
 * Before the EU branch these were the same thing: three countries, three
 * families. They cannot stay the same thing, because 27 member states cannot
 * have 27 hue families — the palette's whole argument is that families must be
 * separated by 40°-ish gaps to read in peripheral vision, and 27 of them would
 * leave 13° each. So Germany, France and Italy are all drawn from the EU family,
 * and the question "which member state" is answered by the label, the flag and
 * the region filter rather than by hue.
 *
 * This is a deliberate loss of one discrimination and it should be revisited if
 * the member-state layer ever gets deep enough to need it. As of 2026-08-04 the
 * corpus has exactly one member state with extracted records (Destatis), so the
 * distinction has nothing to discriminate yet.
 *
 * Keeping `Scope` keyed to the family rather than to `Country` is also what
 * stops the type collapsing to `string`: `Country` now includes `(string & {})`,
 * so a template literal over it is no longer a bounded union, and the legend and
 * filter would silently lose their exhaustiveness checks.
 */
/**
 * **Continent redesign, 2026-08-05, Thomas's call.** Same day XEU was minted as
 * tan-brown, he asked for the whole scheme to be reassessed: Canada was "hogging
 * too much spectrum", and the palette should reserve a slice per continent —
 * North America browns, Europe greens, Asia yellow/orange, South Asia +
 * Oceania red/purple, Africa blues, South America grays — ahead of the
 * countries arriving to fill them (Mexico named explicitly; the rest unstaffed
 * as of this edit).
 *
 * **`CA` and `US` stay separate families rather than merging into one `NA`.**
 * Merging them would mean `scopeOf({country:'CA', level:'federal'})` and
 * `scopeOf({country:'US', level:'federal'})` both resolve to the same string
 * and therefore the same colour — Statistics Canada and the Bureau of Labor
 * Statistics would render identically, which is the exact confusion this
 * whole hue-by-family design exists to prevent (see the note above this one).
 * So "North America" is not a fifth `ColourFamily` — it is `CA` and `US`
 * *pulled into the same hue neighbourhood* (0-45°, both browns) and kept apart
 * from each other by hue split plus saturation, the identical mechanism
 * already used for `EU` vs `XEU`. The same logic applies to `SAO`: it reads
 * as one instruction from Thomas ("India/Pakistan & Australia/NZ") but is one
 * hue *family* with room for the same split once those countries have nodes.
 *
 * **This freed US's old cyan-blue territory for Africa** (`AFR`, 195-235°) and
 * turned `XEU`'s tan-brown — built for a request one turn before this one, now
 * superseded — into a low-saturation green sitting on `EU`'s own hue ramp,
 * the member/non-member split now expressed the same way CA/US and
 * (eventually) SAO's two halves are: saturation, not a different hue.
 *
 * `ASIA` and `SA` (South America) are new, unstaffed families reserving their
 * slice of the wheel now rather than being colour-designed in a hurry once
 * the first Asian or South American node lands — the same reasoning the file
 * already gives for `US:provincial` existing with no data behind it.
 */
export type ColourFamily = 'CA' | 'US' | 'INT' | 'EU' | 'XEU' | 'AFR' | 'ASIA' | 'SAO' | 'SA'

export type Scope = `${ColourFamily}:${JurisdictionLevel}`

/**
 * Which hue family a country's nodes are drawn from.
 *
 * The 27 member states are listed explicitly rather than defaulted, so that
 * adding a country is a visible act. `validate-data` errors on any country in
 * the data that is missing here — that check replaces the compiler exhaustiveness
 * the closed union used to give, and it is the reason an unmapped country can
 * never reach the renderer.
 */
export const COUNTRY_FAMILY: Record<string, ColourFamily> = {
  CA: 'CA',
  US: 'US',
  INT: 'INT',
  EU: 'EU',

  // The 27 member states, all drawn from the EU family.
  AT: 'EU', BE: 'EU', BG: 'EU', CY: 'EU', CZ: 'EU', DE: 'EU', DK: 'EU',
  EE: 'EU', ES: 'EU', FI: 'EU', FR: 'EU', GR: 'EU', HR: 'EU', HU: 'EU',
  IE: 'EU', IT: 'EU', LT: 'EU', LU: 'EU', LV: 'EU', MT: 'EU', NL: 'EU',
  PL: 'EU', PT: 'EU', RO: 'EU', SE: 'EU', SI: 'EU', SK: 'EU',

  // Non-EU European sovereign statistics offices — EEA/EFTA (NO, IS, LI, CH), the
  // former member (GB), and the accession belt (RS, ME, MK, AL, BA, TR, UA, MD,
  // XK). Their own `XEU` family, decided 2026-08-05, parallel to how `EU` itself
  // was split out from `INT` on 2026-08-04: these are real national systems, not
  // stateless bodies, and colouring Norway the same as the IMF would repeat the
  // exact error that split fixed. Coloured as a low-saturation variant of `EU`'s
  // own green, not the tan-brown this comment originally described — see the
  // continent-redesign note on `ColourFamily` and `SCOPE_COLOUR` for the hue.
  NO: 'XEU', IS: 'XEU', LI: 'XEU', CH: 'XEU', GB: 'XEU',
  RS: 'XEU', ME: 'XEU', MK: 'XEU', AL: 'XEU', BA: 'XEU',
  TR: 'XEU', UA: 'XEU', MD: 'XEU', XK: 'XEU',

  // First country in `SAO` ("South Asia + Oceania") — reserved 2026-08-05,
  // staffed 2026-08-05 (same day). Australia: federal -> 6 states + 2
  // territories -> local government, researched as this branch's first
  // non-Europe/non-Canada/US country. See `src/data/research/au-*.json`.
  AU: 'SAO',

  // Second country in `SAO`, added 2026-08-06 immediately after Australia, at
  // Thomas's direction. New Zealand shares the family for the same reason the
  // 27 member states share `EU`: the question "which of the two" is answered by
  // the label and the region filter, not by hue. The `SAO` family does have
  // room for a saturation split (see the continent-redesign note below) — the
  // natural line, when it is needed, is South Asia against Oceania rather than
  // AU against NZ.
  NZ: 'SAO',

  // The rest of the Realm of New Zealand, added 2026-08-06 in the same session
  // as NZ itself. The Cook Islands and Niue are self-governing in free
  // association with New Zealand; Tokelau is a non-self-governing territory.
  // All three publish their own budgets and accounts, and all three use the
  // New Zealand dollar.
  //
  // **They are filed as their own countries, not as regions of NZ**, and that
  // is the whole point of the entry. The research found that the Cook Islands
  // reports on IPSAS, Niue names no external standard at all, and Tokelau
  // requires an undefined "generally accepted accounting practice" — three
  // different answers inside one Realm. Collapsing them into `NZ` would make
  // `scopeOf` resolve all four to the same string and erase exactly the
  // distinction the slice exists to record, which is the same argument that
  // keeps `CA` and `US` apart at the top of this map.
  CK: 'SAO', NU: 'SAO', TK: 'SAO',

  // The three Compact of Free Association states, added 2026-08-06. Sovereign
  // Pacific nations — the FSM statements call the FSM "an independent sovereign
  // nation" in their own words — that report under US GAAP with GASB as
  // standard-setter and use the US dollar. They are `SAO` on geography, not
  // `US` on method: the whole point of the slice they arrive in is that the
  // method is imported and the sovereignty is not.
  FM: 'SAO', MH: 'SAO', PW: 'SAO',

  // Greenland. An arguable call, recorded as one. `XEU` is this palette's
  // non-EU-European bucket, and Greenland is constitutionally European (part
  // of the Danish Realm) while sitting outside the EU since 1985 — which is
  // exactly the membership shape `XEU` was built for. The alternative reading
  // is geographic (North America), but there is no `NA` family, and filing it
  // with `CA` or `US` would put a Danish-Realm jurisdiction in a hue
  // neighbourhood reserved for two national statistical systems it has nothing
  // to do with. Revisit if the Arctic ever gets its own slice.
  GL: 'XEU',

  // Puerto Rico. Filed to the `US` family rather than given its own, because
  // unlike the Compact states it genuinely is a US subsystem: a US territory,
  // US dollar, US GAAP, and a fiscal plan certified by a federally appointed
  // oversight board under a US statute. The CA/US separation argument at the
  // top of this map is about not merging two distinct national systems; this
  // is one system, and the label and region filter carry the distinction.
  PR: 'US',

  // **`AFR` staffed for the first time, 2026-08-10.** Reserved since the
  // continent redesign, unstaffed until South Africa arrived through the
  // "africa file" (`country afrikans.docx`) -- CPI, social grants, and the
  // statutory bodies administering them. See `src/data/research/za-*.json`.
  ZA: 'AFR',

  // **Egypt, Kenya, Ethiopia and Ghana added in the same import pass,
  // 2026-08-10** (AF branch hand-offs G.2-G.4), alongside South Africa's
  // follow-up slices -- pension/CPI law (Egypt), a disability cash transfer
  // and the EAC's binding regional CPI regulation (Kenya), PSNP5's wage-CPI
  // mechanism and a second, currently-suspended CPI covenant (Ethiopia), and
  // the LEAP indexation formula plus SSNIT pensions (Ghana). See
  // `src/data/research/eg-*.json`, `ke-*.json`, `et-*.json`, `gh-*.json`.
  EG: 'AFR',
  KE: 'AFR',
  ET: 'AFR',
  GH: 'AFR',

  // **Nigeria added 2026-08-10** (AF branch G.5, same session as Ghana) --
  // the 2025 CPI rebasing (COICOP 2018, Jevons over Dutot, confirmed
  // verbatim from NBS's own methodology document), the PenCom constitutional
  // pension-review chain, and World Bank shock-responsive safety-net
  // financing. See `src/data/research/ng-*.json`.
  NG: 'AFR',

  // **Tanzania added 2026-08-10** (AF branch G.6, following the G.5 hand-off's
  // priority 1) -- the last of the seven countries in `country afrikans.docx`
  // to be researched. Its NCPI methodology (geometric mean / Lowe index,
  // COICOP 2018) and Data Quality Assessment (confirming the EAC's binding
  // regional HCPI Regulations, IMF's CPI Manual 2020, SNA 2008, IMF SDDS and
  // DQAF), plus the National Social Protection Policy 2023's own admission
  // that no benefit-adjustment mechanism exists and the Public Service Social
  // Security Fund Act's confirmed absence of a CPI-linked provision. See
  // `src/data/research/tz-*.json`.
  TZ: 'AFR',

  // **Botswana added 2026-08-10** (AF branch, first country beyond `country
  // afrikans.docx`'s original seven -- opening the Southern Africa expansion) --
  // Statistics Botswana's CPI (December 2018 rebasing: 2015/16 BMTHS weights,
  // COICOP, Jevons geometric mean at the elementary level) and the government's
  // own 2020 National Social Protection Recovery Plan, whose recommendation to
  // "automatically adjust" the Old Age Pension each year is itself the evidence
  // no such mechanism currently exists. See `src/data/research/bw-*.json`.
  BW: 'AFR',

  // **Namibia added 2026-08-10** (AF branch, same session as Botswana, second
  // Southern Africa country) -- the National Pensions Act, 1992's own s.16
  // assigns old-age pension amounts to ministerial regulation rather than any
  // price index (the branch's clearest *statutory*, not just policy-level,
  // confirmation of discretionary benefit-setting), and the Social Protection
  // Policy 2021-2030's implementation plan sets fixed nominal targets while
  // committing only the Child Grant, not the old-age pension, to inflation-loss
  // language. See `src/data/research/na-*.json`.
  NA: 'AFR',

  // **`SA` staffed for the first time, 2026-08-06.** South America was given a
  // slice of the wheel in the continent redesign and then left empty for a
  // day short of a year's worth of sessions. Brazil is its first country,
  // arriving through the Fundo de Participação dos Municípios — a
  // constitutional transfer to roughly five and a half thousand municipalities
  // decided on one IBGE population figure. The rest of the continent is
  // scouted and unbuilt; see `research-input/Grok-Research-Brief-XI.md`.
  BR: 'SA',
}

/**
 * Family for a country code, for grouping and filtering.
 *
 * An unmapped code falls to `INT` **structurally only** — it has to return one
 * of the four so the legend has somewhere to put it, and `INT` is the least
 * wrong bucket for "belongs to no system I know about". It does **not** get
 * `INT`'s colour: `colourForReport` and `rimColourFor` both test membership
 * directly and return `UNCLASSIFIED_COLOUR`, precisely so an unmapped country is
 * visible rather than absorbed. Silently absorbing unknowns into a bucket is how
 * nine international bodies were Canadian for five sessions.
 */
export function familyOf(country: Country): ColourFamily {
  return COUNTRY_FAMILY[country] ?? 'INT'
}

/** True when the country carries a hand-written palette entry. */
export function isKnownCountry(country: Country): boolean {
  return country in COUNTRY_FAMILY
}

export function scopeOf(report: {
  country: Country
  jurisdiction_level: JurisdictionLevel
}): Scope {
  return `${familyOf(report.country)}:${report.jurisdiction_level}`
}

/**
 * **Continent redesign, 2026-08-05.** The single-country-per-hue-family scheme
 * (V0.12, revised again 2026-08-04 for the EU branch) hit its own limit the
 * moment a sixth political bloc showed up: nine families now share the wheel,
 * and nine cannot each get their own 40°+ gap the way three or four could.
 * Thomas's fix — one slice of the wheel **per continent**, political blocs
 * within a continent told apart by saturation rather than by a wholly separate
 * hue — is the same escape hatch this file already used once, for EU vs XEU,
 * generalised on purpose rather than special-cased a second time.
 *
 * **Each family spans two or three hues internally**, same as before (V0.12's
 * lesson: a single 20°-wide gradient reads as one indistinguishable smear at
 * fit zoom). What changed is which political blocs share a family:
 *
 * | Family | Continent | Hue centre | Blocs inside it |
 * |---|---|---|---|
 * | `CA` | North America | 340°→355° (red-brown) | Canada |
 * | `US` | North America | 24°→42° (tan/ochre) | United States (Mexico: reserved, unstaffed) |
 * | `EU` | Europe | 100°→158° (green→teal) | EU member states, full saturation |
 * | `XEU` | Europe | 114°→158° (same ramp, muted) | Non-EU Europe, low saturation |
 * | `ASIA` | Asia | 38°→54° (yellow-orange) | unstaffed — reserved |
 * | `SAO` | South Asia + Oceania | 275°→305° (red-violet) | unstaffed — reserved |
 * | `AFR` | Africa | 198°→234° (blue) | unstaffed — reserved, US's old territory |
 * | `SA` | South America | 90° (low-sat olive-grey) | unstaffed — reserved |
 * | `INT` | — stateless bodies, no continent | 264°→290° (violet) | IMF, OECD, NATO, BIS, UN, WTO… |
 *
 * **`CA` and `US` are the worked example for every future within-continent
 * split**, including `ASIA`, `SAO` and eventually `SA`: same hue *neighbourhood*
 * (0°–45°, "North America" reads as one warm brown band from a distance), two
 * distinct sub-ranges within it (CA red-leaning, US yellow-leaning) plus a
 * saturation gap (CA 58–70%, US 42–54%) so the two don't collapse into one
 * indistinguishable brown up close. `EU`/`XEU` is the same mechanism applied
 * to a single hue rather than a split range: identical ramp, `XEU` held at
 * roughly half `EU`'s saturation throughout.
 *
 * **The tightest gaps, stated so a future edit does not quietly close them:**
 * `US:institutional` (24°) to `ASIA:institutional` (38°) is 14° apart in hue
 * and held by a 32-point saturation gap (US ~48%, ASIA ~80%) — do not raise
 * `US`'s saturation or lower `ASIA`'s. `SAO:federal` (305°) to
 * `INT:institutional` (290°) is 15° and holds on saturation the same way
 * (SAO ≤64%, INT ≥73%). Do not let either creep toward the other's number.
 *
 * **`SA` sits at 90°, not in the cool grey `COMMERCIAL_COLOUR`/`UNCLASSIFIED_COLOUR`
 * occupy (≈220°).** It was drafted there first and nearly collided with both —
 * `COMMERCIAL_COLOUR` is `#8b93a4` (h=221°, s=12%, l=59%) and the first `SA`
 * draft was `#8a99a8` (h=210°, s=15%, l=60%), close enough to be the same grey
 * on a real display. 90° is the genuine free gap between `ASIA`'s warm end and
 * `EU`'s green start, and low saturation there reads as a warm sage-grey
 * rather than the cool slate `COMMERCIAL`/`UNCLASSIFIED` already own.
 */
export const SCOPE_COLOUR: Record<string, string> = {
  // Canada — North America, red-leaning half. Higher saturation than US:
  // it is this corpus's largest, oldest dataset and gets first claim on
  // legibility within the shared "North America" neighbourhood.
  'CA:federal': '#d44955',
  'CA:provincial': '#c32847',
  'CA:municipal': '#9c1c46',
  'CA:institutional': '#691c40',

  // United States — North America, yellow/tan-leaning half. Lower saturation
  // than CA is the whole separation at this hue distance; do not raise it.
  // `provincial` still means "state", unchanged from before the redesign.
  'US:federal': '#d0b880',
  'US:provincial': '#c4954f',
  'US:municipal': '#a56b31',
  'US:institutional': '#714528',

  // Belonging to no continent — stateless bodies (IMF, OECD, NATO, BIS, UN,
  // WTO…). Unchanged from before the redesign; violet was never contested.
  'INT:international': '#af7aff',
  'INT:institutional': '#d269e8',
  'INT:federal': '#af7aff',
  'INT:provincial': '#af7aff',
  'INT:municipal': '#af7aff',

  // European Union — Europe, full-saturation half. Unchanged from
  // 2026-08-04; this ramp was already the model the redesign generalised.
  'EU:supranational': '#96de73',
  'EU:federal': '#53ce46',
  'EU:provincial': '#2cba3f',
  'EU:municipal': '#209d50',
  'EU:institutional': '#167e58',
  'EU:international': '#af7aff',

  // Non-EU Europe — same green ramp as EU, held to roughly half its
  // saturation. Replaces the tan-brown built one turn earlier in this same
  // session, superseded by the continent redesign the very next turn: browns
  // now belong to North America, and Europe — EU member or not — is green.
  'XEU:federal': '#6caf64',
  'XEU:provincial': '#4c9a56',
  'XEU:municipal': '#3c8056',
  'XEU:institutional': '#2e6651',
  'XEU:supranational': '#6caf64',
  'XEU:international': '#af7aff',

  // Africa — took over US's old cyan-blue territory once US moved into the
  // North America brown band. No African country has a node yet; reserved
  // the same way `US:provincial` was reserved before state-level releases
  // existed, so the colour is not chosen in a hurry once the first one lands.
  'AFR:federal': '#40b5e7',
  'AFR:provincial': '#2c83e8',
  'AFR:municipal': '#2050d5',
  'AFR:institutional': '#273191',
  'AFR:supranational': '#40b5e7',
  'AFR:international': '#af7aff',

  // Asia — vivid yellow-orange, kept apart from North America's muted browns
  // at a similar hue mainly by saturation (Asia ~80-92%, US ~42-54%).
  // Unstaffed; reserved.
  'ASIA:federal': '#f3e13f',
  'ASIA:provincial': '#f4cb2a',
  'ASIA:municipal': '#f5b20a',
  'ASIA:institutional': '#b87c14',
  'ASIA:supranational': '#f3e13f',
  'ASIA:international': '#af7aff',

  // South Asia + Oceania — India/Pakistan and Australia/NZ share one family
  // per Thomas's own pairing; the CA/US split mechanism (sub-range + a
  // saturation gap) is what separates them once either has a node. Held clear
  // of INT's violet by a 15° gap plus saturation, per the note above.
  // Unstaffed; reserved.
  'SAO:federal': '#d864cf',
  'SAO:provincial': '#c73ad4',
  'SAO:municipal': '#9430b5',
  'SAO:institutional': '#612d86',
  'SAO:supranational': '#d864cf',
  'SAO:international': '#af7aff',

  // South America — warm sage-grey at 90°, deliberately not the cool slate
  // `COMMERCIAL_COLOUR`/`UNCLASSIFIED_COLOUR` occupy near 220°. See the note
  // above on why the first draft (at 210°) had to move. Unstaffed; reserved.
  'SA:federal': '#adb5a6',
  'SA:provincial': '#8f9a84',
  'SA:municipal': '#707d64',
  'SA:institutional': '#4c5643',
  'SA:supranational': '#adb5a6',
  'SA:international': '#af7aff',
}

/**
 * A country in the data with no entry in `COUNTRY_FAMILY`.
 *
 * Should be unreachable — `npm run validate` errors on it — and is drawn in a
 * flat mid-grey if it ever is, so it reads as "unclassified" rather than
 * quietly joining a family. Distinct from `COMMERCIAL_COLOUR`, which is a
 * *decision*; this one is the absence of one.
 */
export const UNCLASSIFIED_COLOUR = '#6b7280'

export const SCOPE_LABEL: Record<string, string> = {
  'CA:federal': 'Federal',
  'CA:provincial': 'Provincial',
  'CA:municipal': 'Municipal',
  'CA:institutional': 'Institutional',
  'US:federal': 'Federal',
  'US:provincial': 'State',
  'US:municipal': 'Municipal',
  'US:institutional': 'Institutional',
  'INT:international': 'International bodies',
  'INT:institutional': 'Commercial / other',
  'INT:federal': 'Other',
  'INT:provincial': 'Other',
  'INT:municipal': 'Other',
  'CA:international': 'International',
  'US:international': 'International',

  // The EU family. `EU:federal` is a member state's own national level — a
  // German or French NSI release — which is `federal` in its own system and
  // sits under the EU layer in a way no Canadian federal body sits under
  // anything. `EU:provincial` is the Länder / régions tier.
  'EU:supranational': 'EU institutions',
  'EU:federal': 'Member state — national',
  'EU:provincial': 'Member state — regional',
  'EU:municipal': 'Member state — municipal',
  'EU:institutional': 'Member state — institutional',
  'EU:international': 'International',
  'CA:supranational': 'Supranational',
  'US:supranational': 'Supranational',
  'INT:supranational': 'Supranational',

  // Non-EU Europe. `XEU:federal` covers EEA/EFTA states, the former member (the
  // UK) and the accession-belt candidates alike — the family is "in Europe, not
  // in the EU", not a claim about any one of those relationships being the same
  // kind of tie.
  'XEU:federal': 'National',
  'XEU:provincial': 'Regional',
  'XEU:municipal': 'Municipal',
  'XEU:institutional': 'Institutional',
  'XEU:supranational': 'Supranational',
  'XEU:international': 'International',

  // Reserved continent families, unstaffed as of the 2026-08-05 redesign.
  'AFR:federal': 'National', 'AFR:provincial': 'Regional',
  'AFR:municipal': 'Municipal', 'AFR:institutional': 'Institutional',
  'AFR:supranational': 'Supranational', 'AFR:international': 'International',
  'ASIA:federal': 'National', 'ASIA:provincial': 'Regional',
  'ASIA:municipal': 'Municipal', 'ASIA:institutional': 'Institutional',
  'ASIA:supranational': 'Supranational', 'ASIA:international': 'International',
  'SAO:federal': 'National', 'SAO:provincial': 'Regional',
  'SAO:municipal': 'Municipal', 'SAO:institutional': 'Institutional',
  'SAO:supranational': 'Supranational', 'SAO:international': 'International',
  'SA:federal': 'National', 'SA:provincial': 'Regional',
  'SA:municipal': 'Municipal', 'SA:institutional': 'Institutional',
  'SA:supranational': 'Supranational', 'SA:international': 'International',
}

/**
 * The order the legend lists them in.
 *
 * International first — upstream of every continent, belonging to none.
 * Then a walk around the hue wheel in the same order `SCOPE_COLOUR`'s own
 * table states it (North America → Europe → Asia → South Asia/Oceania →
 * Africa → South America), so the legend's top-to-bottom order matches the
 * colour wheel's actual layout rather than an arbitrary population ranking.
 *
 * **Four groups here are unstaffed as of 2026-08-05** — `ASIA`, `SAO`, `AFR`,
 * `SA` — reserving their place in the legend the same way `US:provincial`
 * reserved a scope before state-level releases existed. Remove a group only
 * once you are sure no data will ever want it; leaving it empty costs nothing
 * and signals the graph's intended scope honestly.
 */
export const SCOPE_GROUPS: {
  country: ColourFamily
  label: string
  scopes: Scope[]
}[] = [
  {
    country: 'INT',
    label: 'International',
    scopes: ['INT:international', 'INT:institutional'],
  },
  {
    country: 'CA',
    label: 'Canada',
    scopes: ['CA:federal', 'CA:provincial', 'CA:municipal', 'CA:institutional'],
  },
  {
    country: 'US',
    label: 'United States',
    scopes: ['US:federal', 'US:provincial', 'US:institutional'],
  },
  // The EU sits after the two national systems rather than beside International,
  // even though its apex is supranational. The legend is read top-to-bottom as
  // "the shared standards, then each system" — and the EU is a system, not a
  // standards body. Its own internal order is apex-first, matching the others'
  // broadest-to-most-local.
  {
    country: 'EU',
    label: 'European Union',
    scopes: [
      'EU:supranational',
      'EU:federal',
      'EU:provincial',
      'EU:municipal',
      'EU:institutional',
    ],
  },
  // XEU right after EU — same continent, same hue ramp, told apart by
  // saturation rather than a different place in the wheel.
  {
    country: 'XEU',
    label: 'Europe (non-EU)',
    scopes: ['XEU:federal', 'XEU:provincial', 'XEU:municipal', 'XEU:institutional'],
  },
  // Everything past this point is reserved and unstaffed — see the docstring.
  {
    country: 'ASIA',
    label: 'Asia',
    scopes: ['ASIA:federal', 'ASIA:provincial', 'ASIA:municipal', 'ASIA:institutional'],
  },
  {
    country: 'SAO',
    label: 'South Asia & Oceania',
    scopes: ['SAO:federal', 'SAO:provincial', 'SAO:municipal', 'SAO:institutional'],
  },
  {
    country: 'AFR',
    label: 'Africa',
    scopes: ['AFR:federal', 'AFR:provincial', 'AFR:municipal', 'AFR:institutional'],
  },
  {
    country: 'SA',
    label: 'South America',
    scopes: ['SA:federal', 'SA:provincial', 'SA:municipal', 'SA:institutional'],
  },
]

/** Every scope the legend can show, flattened. */
export const ALL_SCOPES: Scope[] = SCOPE_GROUPS.flatMap((g) => g.scopes)

/**
 * Recoloured levels for a single focused country/group — 2026-08-10
 * (Thomas), used only in the sidebar, and only while the scope filter is
 * narrowed to exactly one group's own scopes.
 *
 * `SCOPE_COLOUR`'s within-family bands are deliberately narrow (see the
 * "continent redesign" note above `SCOPE_COLOUR` itself) because every
 * family has to leave eight others room on the same wheel, all the time.
 * That constraint is exactly what stops mattering the instant a filter
 * hides every other country: at that point there is nothing left to keep
 * clear of, so this spreads the *focused* group's own levels across a much
 * wider band instead of reusing the tight one. Deliberately not touching
 * `SCOPE_COLOUR` itself — every one of its gaps has a documented reason and
 * a "do not raise/lower this" warning attached; this is a second, temporary
 * palette layered on top for one view, not a replacement for the first.
 */
export function focusPalette(scopes: Scope[]): Record<string, string> {
  const n = scopes.length
  const result: Record<string, string> = {}
  scopes.forEach((s, i) => {
    // Spread across 300 of the 360 degrees available, not the full circle —
    // wrapping all the way round would put the first and last levels right
    // back next to each other, which is the exact problem this exists to
    // fix. A single-level group (nothing to contrast) gets one fixed hue
    // rather than a division by zero.
    const hue = n <= 1 ? 210 : (i / (n - 1)) * 300
    result[s] = `hsl(${hue.toFixed(0)}, 72%, 58%)`
  })
  return result
}

/**
 * Commercial sources are drawn off the palette entirely.
 *
 * Deliberately a neutral grey rather than a hue of its own. Scope colours
 * encode who publishes and where they sit; a commercial provider does not sit
 * anywhere on that axis, and grey says "outside this classification", which is
 * exactly what it is. It also matches the fact that these nodes are outside the
 * authority calculation.
 */
export const COMMERCIAL_COLOUR = '#8b93a4'

/** Colour for a report. The single source of truth for node fill. */
export function colourForReport(report: {
  country: Country
  jurisdiction_level: JurisdictionLevel
  source_kind?: SourceKind
}): string {
  if ((report.source_kind ?? 'official') !== 'official') return COMMERCIAL_COLOUR
  // Checked before the scope lookup, not after: an unmapped country resolves to
  // the INT family structurally, so the lookup would succeed and paint it violet
  // rather than showing that nobody has classified it.
  if (!isKnownCountry(report.country)) return UNCLASSIFIED_COLOUR
  return SCOPE_COLOUR[scopeOf(report)] ?? '#8fa3c0'
}

/**
 * Rim colour, still keyed to country alone.
 *
 * Redundant with the fill now that hue carries country, and kept for exactly
 * that reason: a second cue on the silhouette makes the family readable at
 * distances where the fill is three pixels across, and redundant encoding is
 * the cheapest discriminability there is. Pulled from the fill's own family so
 * it reinforces rather than introducing a third thing to learn.
 */
export const COUNTRY_RIM: Record<string, string> = {
  // CA and US both moved into the North America brown band in the 2026-08-05
  // continent redesign — their rims moved with them, same hue split as the fill.
  CA: '#f0a8b4',
  US: '#ead6b8',
  INT: '#e0c4ff',
  EU: '#aff4af',
  // XEU moved from tan-brown to a light version of EU's own green.
  XEU: '#b7dbb3',
  // Reserved continent families, unstaffed as of this edit.
  AFR: '#a6d4f2',
  ASIA: '#f4e6af',
  SAO: '#e6b0e8',
  SA: '#d1d7cc',
}

/**
 * Rim colour for a country, total by construction.
 *
 * Member states take the EU family rim rather than one each — see the note on
 * `ColourFamily`. A country with no family at all gets `UNCLASSIFIED_COLOUR`
 * instead of being absorbed, which is the whole reason this is a function now
 * and not a `Record<Country, string>`: an open country set cannot be a total
 * record, and the old type only looked total because the union was closed.
 */
export function rimColourFor(country: Country): string {
  const own = COUNTRY_RIM[country]
  if (own) return own
  if (!isKnownCountry(country)) return UNCLASSIFIED_COLOUR
  return COUNTRY_RIM[familyOf(country)] ?? UNCLASSIFIED_COLOUR
}

/**
 * Display name for a country code.
 *
 * Only the codes that actually carry nodes are spelled out. An unlisted member
 * state falls back to its bare ISO code, which is honest and readable — "PT" in
 * a hover card is not confusing — rather than a lookup table of 27 names most of
 * which would never render. Add a name here when that country gets its first
 * node.
 */
export const COUNTRY_LABEL: Record<string, string> = {
  CA: 'Canada',
  US: 'United States',
  INT: 'International',
  EU: 'European Union',
  DE: 'Germany',
  FR: 'France',
  IT: 'Italy',

  // The rest of EU-27, all with nodes as of the 2026-08-05 consolidation.
  AT: 'Austria', BE: 'Belgium', BG: 'Bulgaria', CY: 'Cyprus', CZ: 'Czechia',
  DK: 'Denmark', EE: 'Estonia', ES: 'Spain', FI: 'Finland', GR: 'Greece',
  HR: 'Croatia', HU: 'Hungary', IE: 'Ireland', LT: 'Lithuania', LU: 'Luxembourg',
  LV: 'Latvia', MT: 'Malta', NL: 'Netherlands', PL: 'Poland', PT: 'Portugal',
  RO: 'Romania', SE: 'Sweden', SI: 'Slovenia', SK: 'Slovakia',

  // Non-EU Europe (the XEU family) — EEA/EFTA, the former member, accession belt.
  NO: 'Norway', IS: 'Iceland', LI: 'Liechtenstein', CH: 'Switzerland',
  GB: 'United Kingdom', RS: 'Serbia', ME: 'Montenegro', MK: 'North Macedonia',
  AL: 'Albania', BA: 'Bosnia and Herzegovina', TR: 'Türkiye', UA: 'Ukraine',
  MD: 'Moldova', XK: 'Kosovo',
}

export function countryLabelFor(country: Country): string {
  return COUNTRY_LABEL[country] ?? country
}

/** Kept so callers that only have a level still resolve to something sane. */
export function colourFor(level: JurisdictionLevel): string {
  return SCOPE_COLOUR[`CA:${level}`] ?? '#8fa3c0'
}

export type { Report }
