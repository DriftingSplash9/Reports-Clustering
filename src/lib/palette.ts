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
/**
 * **Palette v2, 2026-08-12 — Thomas's redesign, worked through two rounds of
 * swatch review (round-3 Q9 and its revisions).** The headline changes from
 * the continent scheme this replaces:
 *
 * - **Ramps run dark→light down the ladder now, not light→dark**: the national
 *   level is each family's darkest shade, institutional its lightest ("the
 *   spectrums should go in reverse order. National level being darkest").
 * - **Rims carry family weight**, not just hue — see `RIM_WEIGHT`. The US
 *   wears a bold red rim on a vivid blue fill ("Make USA 255 blue and give it
 *   a bold red border"), INT a bold white rim, NZ a bold white rim on brown,
 *   the EU a thick lime rim, and Africa NO rim at all ("Africa can be violet
 *   with no rim color").
 * - **SAO is gone**, split into `AU` (orange) and `NZ` (brown — carrying the
 *   Realm and the Pacific compact states with it). `CN` (yellow), `ASIA`
 *   (teal) and `IN` (magenta) are reserved, unstaffed, named ahead of the
 *   RU/CN branch the roadmap already promises.
 * - Known tight spots, accepted with eyes open: US ultramarine vs XEU
 *   slate-blue (told apart by bold-red vs green rims), and AFR's deep violet
 *   vs INT's lighter violet (no rim vs bold white rim). The rims are the
 *   family channel in those neighbourhoods — which is exactly the job Thomas
 *   gave them.
 */
export type ColourFamily =
  | 'CA' | 'US' | 'AU' | 'NZ' | 'INT' | 'EU' | 'XEU' | 'AFR'
  | 'CN' | 'ASIA' | 'IN' | 'SA'

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

  // Australia — its own family since palette v2 (2026-08-12): SAO split in
  // two on Thomas's colour assignments (AU orange, NZ brown), which is the
  // CA/US precedent finally applied to Oceania.
  AU: 'AU',

  // New Zealand — its own family since palette v2, and the family the small
  // Pacific jurisdictions ride with (below).
  NZ: 'NZ',

  // The rest of the Realm of New Zealand, added 2026-08-06 in the same session
  // as NZ itself. The Cook Islands and Niue are self-governing in free
  // association with New Zealand; Tokelau is a non-self-governing territory.
  // All three publish their own budgets and accounts, and all three use the
  // New Zealand dollar.
  //
  // They remain their own *countries* (their own labels, flags-to-be and
  // filter rows — the three-different-accounting-answers finding survives
  // untouched); since palette v2 they draw from the NZ colour family, the
  // same way 27 member states draw from EU.
  CK: 'NZ', NU: 'NZ', TK: 'NZ',

  // The three Compact of Free Association states, added 2026-08-06. Sovereign
  // Pacific nations that report under US GAAP and use the US dollar. Grouped
  // with the NZ family on geography since palette v2 — the whole point of
  // their slice is that the method is imported and the sovereignty is not, so
  // colouring them `US` was never on the table.
  FM: 'NZ', MH: 'NZ', PW: 'NZ',

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

  // Russia — the branch's first country, opened 2026-08-13
  // (`src/data/research/ru-cpi-equalization.json`). Filed to `ASIA`, the
  // reserved-unstaffed catch-all family, rather than to `CN` — `CN` is
  // literally China's own code, reserved for China itself, and doubling
  // Russia up under it would repeat the exact CA/US-merge mistake this
  // palette's own comments warn against. The Bank of Russia's monetary-policy
  // guidelines (naming Rosstat's ИПЦ as the inflation-target measure) and the
  // statutory/data chain behind the дотации на выравнивание бюджетной
  // обеспеченности (regional fiscal-equalization grants) are the opening
  // nodes; Rosstat's own domains were unreachable this round, so no
  // Rosstat-hosted node exists yet.
  RU: 'ASIA',

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

  // **Lesotho, Eswatini, Zambia, Malawi and Zimbabwe added 2026-08-10** (AF
  // branch G.8, same session as G.7 -- closes out the docx's own Southern
  // Africa list: South Africa, Botswana, Namibia, Lesotho, Eswatini, Zambia,
  // Malawi, Zimbabwe, all eight now researched). Lesotho's Old Age Pensions
  // Act, 2005 and Eswatini's CPI (June 2020 rebasing, 2016/17 HIES weights,
  // two-stage geometric-Lowe formula) sit alongside the batch's two most
  // explicit denials: the World Bank's own account of Eswatini's Old Age
  // Grant ("not indexed to price inflation") and Malawi's own Social Cash
  // Transfer Strategic Plan ("no systematic arrangement for adjusting the
  // level of transfers for inflation... adjusted only three times" in 14
  // years). Zambia's CPI and Social Cash Transfer factsheet, and Zimbabwe's
  // CPI (notable for publishing three parallel indices -- ZiG, USD and
  // Blended -- since the 2024 currency reform) round out the batch. See
  // `src/data/research/ls-*.json`, `sz-*.json`, `zm-*.json`, `mw-*.json`,
  // `zw-*.json`.
  LS: 'AFR',
  SZ: 'AFR',
  ZM: 'AFR',
  MW: 'AFR',
  ZW: 'AFR',

  // **Uganda and Rwanda added 2026-08-10** (AF branch G.9) -- the East
  // Africa remainder, the last of the docx-era regional groupings offered
  // to Thomas across G.7/G.8, and the first two AF countries with no docx
  // entry to anchor either of them at all. Uganda's own CPI documents are
  // silent on every external framework this branch expects (no EAC, IMF or
  // SNA citation anywhere), unlike Kenya's and Tanzania's; its Senior
  // Citizens Grant went a decade with no nominal adjustment at all (World
  // Bank, "has not been adjusted since the scheme started in 2010"), then
  // rose on no documented formula. Rwanda's CPI is running on stale inputs
  // by its own donor's account -- a 2025 rebasing onto COICOP 2018 that a
  // World Bank supervision mission said was "expected" but had not
  // happened by the June 2026 release -- and produced this branch's first
  // documented bidirectional survey/CPI relationship (EICV4 feeds the
  // CPI's weights; EICV7 in turn uses the CPI's own price collection to
  // deflate its own consumption aggregates). See
  // `src/data/research/ug-*.json`, `rw-*.json`.
  UG: 'AFR',
  RW: 'AFR',

  // **Algeria, Morocco, Tunisia and Libya added 2026-08-10** (AF branch
  // G.10) -- North Africa, the last country list any prior session had
  // actually offered by name, and the first AF batch of four in one
  // sitting. Algeria's and Tunisia's own CPI documents both name a
  // classification standard other than COICOP 2018 -- Algeria still ties
  // to "le système de comptabilité nationale de 1970" even after its
  // national accounts (a separate product) were rebased to the 2008 SNA;
  // Tunisia names COICOP without a version, structured like the pre-2018
  // vintage. Morocco is the one country in the batch whose own CPI
  // document names an IMF manual directly (for missing-price imputation)
  // and states its release calendar follows the SDDS by name. All three
  // Maghreb countries' pension systems turned out to have real, statutory,
  // non-CPI adjustment mechanisms -- civil-service salary scales (Morocco's
  // CMR, Tunisia's CNRPS) or wage-level gaps and the minimum wage
  // (Morocco's CNSS, Tunisia's CNSS, Algeria's CNR) -- the same shape
  // already found for Rwanda and Uganda. Libya, flagged by G.7 as "likely
  // too thin/unstable to source" and never actually attempted, turned out
  // to be the batch's genuine surprise: a functioning, IMF-corroborated
  // monthly CPI relaunched on a new 2024 base with technical assistance
  // from the IMF's METAC, rated "broadly adequate" by the IMF even as
  // Libya's other statistical domains are rated inadequate. See
  // `src/data/research/dz-*.json`, `ma-*.json`, `tn-*.json`, `ly-*.json`.
  DZ: 'AFR',
  MA: 'AFR',
  TN: 'AFR',
  LY: 'AFR',
  // 2026-08-10 (AF/G.11): a first push into WAEMU/CEMAC/Sahel territory the
  // source docx had only ever described in undifferentiated bloc-level
  // prose ("Francophone (WAEMU)... automatic indexation is rare"; "Central
  // Africa & Sahel: very limited national systems"), never by country name.
  // Senegal, Cote d'Ivoire and Mali (WAEMU) plus Cameroon (CEMAC) all
  // turned out to have real, functioning, well-documented CPI programmes --
  // the "very limited" framing describes social-protection indexation, not
  // the underlying statistics. The batch's standout finding: Senegal's own
  // IMF SDDS metadata names AFRISTAT directly, twice, and names a WAEMU
  // Commission methodological guide by exact title -- the strongest
  // AFRISTAT citation found anywhere in this branch, stronger than the
  // ECOWAS HCPI guide citation that has failed independent verification
  // three times in the West Africa work. Cameroon's own CPI methodology
  // names both AFRISTAT and a specific numbered CEMAC regulation directly.
  // Mali, AFRISTAT's own headquarters city (Bamako), independently
  // corroborates the institutional relationship via two workshop records
  // with INSTAT Mali's own Director General presiding. This session also
  // produced the branch's first genuinely bloc-level document actually
  // opened and quoted rather than only cited: the UEMOA Commission's own
  // note on the Union-wide Harmonised CPI (`uemoa-ihpc-note-2023`), shared
  // across the Mali and Cote d'Ivoire slices. All four countries show the
  // same non-CPI pension pattern as the rest of AFR -- Senegal's IPRES/FNR
  // and Cote d'Ivoire's CNPS both revalue on points/wages/decree rather
  // than CPI, Cameroon's INS states directly that wages are NOT indexed to
  // prices, and Mali's flagship cash-transfer programme (Jigisemejiri)
  // closed in 2023 after one ad hoc, non-formulaic inflation-linked
  // increase in 2018. See `src/data/research/sn-*.json`, `ci-*.json`,
  // `cm-*.json`, `ml-*.json`.
  SN: 'AFR',
  CI: 'AFR',
  CM: 'AFR',
  ML: 'AFR',

  // 2026-08-10 (AF/G.12): second WAEMU/CEMAC batch, same day as G.11 --
  // Burkina Faso, Togo (WAEMU) plus Gabon, Chad (CEMAC), rounding out CEMAC's
  // representation in the corpus to three of six member states. The
  // standout finding resolves a question G.11 left open across three
  // countries: Togo's own regulator never names the base-2023 WAEMU CPI
  // regulation, but UEMOA's own official gazette (Bulletin Officiel de
  // l'Union N°123) does -- OCR'd directly from the scanned original --
  // giving the branch its first fully independent capture of
  // Reglement N deg 05/2024/CM/UEMOA, effective 1 January 2025 and
  // abrogating the base-2014 regulation Mali's G.11 session could only cite
  // secondhand (`uemoa-reg-2024-base2023`). Burkina Faso's own session
  // independently reopened the same AFRISTAT guide URL Mali flagged in
  // G.11 as "~2008 vintage, likely superseded" and found PDF metadata dating
  // it to 2014-04-16 -- a refinement, not a contradiction, logged in
  // G.12's Corrections section rather than edited into G.11. Gabon and Chad
  // both name CEMAC's shared methodology in prose without citing the
  // underlying regulation by number, matching Cameroon's pattern from G.11;
  // the regulation itself stays un-minted branch-wide pending a country
  // that opens it directly. All four continue the branch's non-CPI pension
  // pattern: Gabon's public pension is wage-scale indexed per the IMF's own
  // Article IV text, and Chad's CNPS exhaustive 12-text legal list contains
  // zero CPI-indexation provisions. See `src/data/research/bf-*.json`,
  // `tg-*.json`, `ga-*.json`, `td-*.json`.
  BF: 'AFR',
  TG: 'AFR',
  GA: 'AFR',
  TD: 'AFR',

  // 2026-08-12 (AF/G.15 -- continental/regional hub-building session, plus
  // AF/G.16's Grok-verified follow-up): eleven countries that arrived not
  // through a country-by-country docx list but through *following the
  // regional blocs themselves* -- WAEMU, CEMAC, EAC and UMA hub documents
  // each named member states this branch hadn't researched yet, and each
  // one turned out to have a real, citable national CPI once actually
  // looked for. Benin and Niger (WAEMU) both wired to the founding 16
  // December 1997 WAEMU regulation; Niger's own bulletin separately names
  // the IMF CPI Manual 2020 directly. Mauritania (UMA) is the one country
  // in this batch with a documented AFRISTAT technical-assistance
  // relationship despite not being a UEMOA member itself. Central African
  // Republic and Congo-Brazzaville (CEMAC) were minted from scratch in
  // G.15; Equatorial Guinea (also CEMAC) needed two sessions to resolve
  // cleanly -- G.15 could only find its annual yearbook, G.16 located the
  // separate monthly IPC bulletin Grok was asked to find. Guinea-Bissau
  // (WAEMU) and Burundi, South Sudan and Somalia (all three EAC members
  // with a binding Harmonised CPI obligation but zero prior AF-branch
  // presence) were all resolved in G.16 via Grok's own follow-up research,
  // independently re-verified rather than taken on trust per Thomas's
  // explicit instruction that round ("things change fast so double check
  // you have the recent data") -- Somalia's framing was specifically
  // softened from Grok's "historic first" language after re-fetching would
  // not support the stronger claim. DR Congo (CD) is this batch's one
  // genuinely new country rather than a resolved gap: G.15 had flagged
  // "DR Congo CPI -- no document" and G.16 closed it, plus independently
  // quoted Article 175 of DRC's own constitution (a flat 40%-of-revenue
  // provincial retention rule) and Kinshasa province's own ~US$1.1 billion
  // 2026 budget. See `src/data/research/af-waemu-remainder.json`,
  // `af-mauritania.json`, `af-cemac.json`, `af-grok-synthesis.json`,
  // `cd-provinces-fiscal.json`, and `AF/G.15.md` / `AF/G.16.md`.
  BJ: 'AFR',
  NE: 'AFR',
  MR: 'AFR',
  CF: 'AFR',
  CG: 'AFR',
  GQ: 'AFR',
  GW: 'AFR',
  BI: 'AFR',
  SS: 'AFR',
  SO: 'AFR',
  CD: 'AFR',

  // 2026-08-13 (AF/G.17 -- 30-round population-priority push): the five
  // highest-population African countries with zero prior corpus presence,
  // researched via dispatched agents rather than sequential fetches --
  // Sudan, Angola, Mozambique, Madagascar, Guinea. See
  // `src/data/research/af-sudan.json`, `af-angola.json`, `af-mozambique.json`,
  // `af-madagascar.json`, `af-guinea.json`, and `AF/G.17.md`.
  SD: 'AFR',
  AO: 'AFR',
  MZ: 'AFR',
  MG: 'AFR',
  GN: 'AFR',

  // 2026-08-13 (AF/G.17, wave 2): next five by population -- Sierra Leone,
  // Liberia, Eritrea, The Gambia, Mauritius. See `af-sierra-leone.json`,
  // `af-liberia.json`, `af-eritrea.json`, `af-gambia.json`, `af-mauritius.json`.
  SL: 'AFR',
  LR: 'AFR',
  ER: 'AFR',
  GM: 'AFR',
  MU: 'AFR',

  // 2026-08-13 (AF/G.17, wave 3 -- final 5 of the 15-country population-
  // priority roster, all small/island states): Djibouti, Comoros, Cabo
  // Verde, Sao Tome and Principe, Seychelles. All 54 sovereign African
  // states now have at least one corpus node. See `af-djibouti.json`,
  // `af-comoros.json`, `af-cabo-verde.json`, `af-sao-tome-principe.json`,
  // `af-seychelles.json`.
  DJ: 'AFR',
  KM: 'AFR',
  CV: 'AFR',
  ST: 'AFR',
  SC: 'AFR',

  // **`SA` staffed for the first time, 2026-08-06.** South America was given a
  // slice of the wheel in the continent redesign and then left empty for a
  // day short of a year's worth of sessions. Brazil is its first country,
  // arriving through the Fundo de Participação dos Municípios — a
  // constitutional transfer to roughly five and a half thousand municipalities
  // decided on one IBGE population figure. The rest of the continent is
  // scouted and unbuilt; see `research-input/Grok-Research-Brief-XI.md`.
  BR: 'SA',

  // **`CN` staffed for the first time, 2026-08-13.** Reserved and unstaffed
  // since the continent redesign, opened by the CPI/fiscal-transfers slice:
  // the NBS's monthly CPI release, the 2026 Government Work Report's CPI
  // target, and the annual Budget Report's central-to-local transfer-payment
  // figures. See `src/data/research/cn-cpi-transfers.json`.
  CN: 'CN',

  // **`IN` staffed for the first time, 2026-08-13.** Reserved and unstaffed
  // since the continent redesign, opened by the CPI/Finance Commission
  // slice: MoSPI/NSO's Consumer Price Index (Base 2024=100), the RBI Act
  // 1934's Section 45ZA inflation-targeting mechanism, Article 280 of the
  // Constitution, and the Sixteenth and Fifteenth Finance Commissions'
  // vertical- and horizontal-devolution formulas. See
  // `src/data/research/in-cpi-finance-commission.json`.
  IN: 'IN',
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
 * **SUPERSEDED 2026-08-12 by palette v2** — the table below describes the v1
 * continent scheme this file no longer implements (tan US, azure Africa, SAO
 * family, light→dark ramps). Kept because its *reasoning* about hue gaps and
 * saturation splits still explains why the wheel is arranged the way it is;
 * for what is actually drawn, read `SCOPE_COLOUR` and `RIM_WEIGHT` below.
 *
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
  // Every family ramp runs DARK → LIGHT down the ladder (palette v2): the
  // national level is the darkest shade, institutional the lightest — Thomas's
  // order, kept. The FLOORS were lifted in round 5 (his screenshots, his
  // verdict): the original darkest steps sat within a whisker of the #05070d
  // background, so the most foundational nodes in the graph read as holes in
  // the sky. Same order, same hues, floor raised far enough that a national
  // node is unmistakably a node.

  // Canada — reds, unchanged hue, reversed ramp.
  'CA:federal': '#963050',
  'CA:provincial': '#b53f63',
  'CA:municipal': '#d0607e',
  'CA:institutional': '#e896ab',

  // United States — "255 blue" with a bold red rim (Thomas). The old tan band
  // is gone; the US now wears its own flag: vivid ultramarine fill, red ring.
  // `provincial` still means "state".
  'US:federal': '#1330e0',
  'US:provincial': '#2f55ee',
  'US:municipal': '#5a80f4',
  'US:institutional': '#8fabf8',

  // Australia — orange, its own family since the SAO split.
  'AU:federal': '#b05a10',
  'AU:provincial': '#cf7318',
  'AU:municipal': '#eb9026',
  'AU:institutional': '#f7b45f',

  // New Zealand + Realm + Compact states — brown, bold white rim.
  'NZ:federal': '#6b4630',
  'NZ:provincial': '#85583d',
  'NZ:municipal': '#a1724f',
  'NZ:institutional': '#c09873',

  // Stateless bodies — violet, now with a BOLD WHITE rim as the family cue.
  // Distinguished from AFR's violet by register (INT lighter, red-leaning)
  // and above all by the rim: bold white here, none at all there.
  'INT:international': '#8a4fe8',
  'INT:supranational': '#a35fee',
  'INT:institutional': '#c47ff0',
  'INT:federal': '#8a4fe8',
  'INT:provincial': '#8a4fe8',
  'INT:municipal': '#8a4fe8',

  // European Union — greens, reversed ramp, THICK LIME rim.
  'EU:supranational': '#10603c',
  'EU:federal': '#177a4a',
  'EU:provincial': '#1f9c55',
  'EU:municipal': '#3fc06a',
  'EU:institutional': '#8fe9a2',
  'EU:international': '#8a4fe8',

  // Non-EU Europe — slate/steel blue fill, GREEN rim (the EU family's own rim
  // colour, so "European" stays readable on the ring — Thomas's design).
  // Deliberately muted against the US's vivid ultramarine; the rims (green vs
  // bold red) are the tiebreak where the hues near each other.
  'XEU:federal': '#3a4d85',
  'XEU:provincial': '#4c63a8',
  'XEU:municipal': '#6a83c9',
  'XEU:institutional': '#93a8dd',
  'XEU:supranational': '#3a4d85',
  'XEU:international': '#8a4fe8',

  // Africa — deep violet, NO rim (Thomas: "Africa can be violet with no rim
  // color, I think that would do"). Darker and bluer than INT's violet; the
  // absence of any rim is itself the family cue.
  'AFR:federal': '#4d2a94',
  'AFR:provincial': '#6a3fbd',
  'AFR:municipal': '#8a5cd9',
  'AFR:institutional': '#ab84ea',
  'AFR:supranational': '#4d2a94',
  'AFR:international': '#8a4fe8',

  // China — yellow, reserved unstaffed for the RU/CN branch.
  'CN:federal': '#9a7a08',
  'CN:provincial': '#c39c10',
  'CN:municipal': '#e3bc17',
  'CN:institutional': '#f5da5c',
  'CN:supranational': '#9a7a08',
  'CN:international': '#8a4fe8',

  // Asia (rest) — teal, reserved unstaffed.
  'ASIA:federal': '#14706a',
  'ASIA:provincial': '#1b938a',
  'ASIA:municipal': '#2bb5a8',
  'ASIA:institutional': '#6cd9cd',
  'ASIA:supranational': '#14706a',
  'ASIA:international': '#8a4fe8',

  // India — magenta, reserved unstaffed (the slice the SAO split freed).
  'IN:federal': '#8c2a60',
  'IN:provincial': '#ab3577',
  'IN:municipal': '#ca5595',
  'IN:institutional': '#e491bf',
  'IN:supranational': '#8c2a60',
  'IN:international': '#8a4fe8',

  // South America — sage, reversed ramp.
  'SA:federal': '#59654e',
  'SA:provincial': '#75826a',
  'SA:municipal': '#94a188',
  'SA:institutional': '#b5c1ab',
  'SA:supranational': '#59654e',
  'SA:international': '#8a4fe8',
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
  'AU:federal': 'Federal', 'AU:provincial': 'State', 'AU:municipal': 'Municipal',
  'AU:institutional': 'Institutional', 'AU:supranational': 'Supranational',
  'AU:international': 'International',
  'NZ:federal': 'Central government', 'NZ:provincial': 'Regional',
  'NZ:municipal': 'Territorial', 'NZ:institutional': 'Institutional',
  'NZ:supranational': 'Supranational', 'NZ:international': 'International',
  'CN:federal': 'National', 'CN:provincial': 'Regional', 'CN:municipal': 'Municipal',
  'CN:institutional': 'Institutional', 'CN:supranational': 'Supranational',
  'CN:international': 'International',
  'IN:federal': 'National', 'IN:provincial': 'Regional', 'IN:municipal': 'Municipal',
  'IN:institutional': 'Institutional', 'IN:supranational': 'Supranational',
  'IN:international': 'International',
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
    // `supranational` (a regional bloc with no family of its own — the EAC's
    // binding HCPI regulation is the corpus's example, see `graph.ts`'s
    // validate() comment on it) sits between `international` (fully global —
    // IMF, UN, WTO) and `institutional` (narrowest — "commercial / other").
    // Found missing 2026-08-11 while building the collapsible-orb drilldown
    // (hierarchy.ts): `SCOPE_COLOUR` and `SCOPE_LABEL` both already carried an
    // `INT:supranational` entry, but it had never been added here, so the
    // three reports at that scope were invisible to both this legend's filter
    // and — the bug that actually surfaced it — the drilldown's ladder, which
    // reads this array to decide what can collapse.
    scopes: ['INT:international', 'INT:supranational', 'INT:institutional'],
  },
  {
    country: 'CA',
    label: 'Canada',
    scopes: ['CA:federal', 'CA:provincial', 'CA:municipal', 'CA:institutional'],
  },
  {
    country: 'US',
    label: 'United States',
    // `municipal` was missing here the same way `INT:supranational` was —
    // found 2026-08-11 alongside it. `SCOPE_COLOUR` and `SCOPE_LABEL` already
    // had entries; the 33 US municipal reports (LA County, Houston, HCAD and
    // others) were simply never reachable through this legend's filter.
    scopes: ['US:federal', 'US:provincial', 'US:municipal', 'US:institutional'],
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
    country: 'AU',
    label: 'Australia',
    scopes: ['AU:federal', 'AU:provincial', 'AU:municipal', 'AU:institutional'],
  },
  {
    country: 'NZ',
    label: 'New Zealand & Pacific',
    scopes: ['NZ:federal', 'NZ:provincial', 'NZ:municipal', 'NZ:institutional'],
  },
  {
    country: 'CN',
    label: 'China',
    scopes: ['CN:federal', 'CN:provincial', 'CN:municipal', 'CN:institutional'],
  },
  {
    country: 'IN',
    label: 'India',
    scopes: ['IN:federal', 'IN:provincial', 'IN:municipal', 'IN:institutional'],
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
  CA: '#f0a8b4',
  // Bold red on blue — the US flag on every US node (Thomas's design).
  US: '#e03131',
  AU: '#ffc98f',
  // Bold white — "NZ needs a bolder rim too".
  NZ: '#ffffff',
  // Bold white on violet, the stateless-bodies cue.
  INT: '#ffffff',
  // Thick lime — "The eu needs a thicker rim if you can, use lime green".
  EU: '#b6f542',
  // The EU family's *old* soft green: still green (European on the ring, per
  // Thomas's XEU spec) but visibly not the EU's own lime.
  XEU: '#aff4af',
  // Africa's ring is BACK (round 5). The rimless experiment was Thomas's own
  // spec and his own screenshots ended it: violet fills with no ring on a
  // near-black sky simply vanish — and once edges draw in rim ink, a rimless
  // family would have invisible edges too. Pale lavender, same contrast job
  // as every other family's ring.
  AFR: '#cbb2f5',
  CN: '#ffec9e',
  ASIA: '#a8ece2',
  IN: '#ffb3dc',
  SA: '#d1d7cc',
}

/**
 * How heavily each family's rim is drawn — palette v2's second channel.
 *
 * 'bold' is a wide, strong ring (US red, INT and NZ white), 'thick' a widened
 * one (EU lime), 'none' switches the ring off entirely (Africa — the absence
 * IS the cue), 'normal' is the classic thin fresnel highlight. Consumed by
 * `nodeMaterial` via `rimWeightFor`; hollow one-off nodes override 'none'
 * upward because their rim is the whole node.
 */
export type RimWeight = 'none' | 'normal' | 'thick' | 'bold'

export const RIM_WEIGHT: Record<ColourFamily, RimWeight> = {
  CA: 'normal',
  US: 'bold',
  AU: 'normal',
  NZ: 'bold',
  INT: 'bold',
  EU: 'thick',
  XEU: 'normal',
  AFR: 'normal',
  CN: 'normal',
  ASIA: 'normal',
  IN: 'normal',
  SA: 'normal',
}

/** Rim weight for a country, total by construction like `rimColourFor`. */
export function rimWeightFor(country: Country): RimWeight {
  return RIM_WEIGHT[familyOf(country)] ?? 'normal'
}

/**
 * The family inks for Blueprint mode — the same one-ink-per-family idea, in
 * dark, because the night palette's light rims vanish on paper. Approved
 * round 5 ("Blueprint mode" over a naive invert), built round 9. Each ink is
 * the family's rim pulled down to drawing-ink darkness; NZ's and INT's whites
 * become their fills' own dark registers, since white-on-paper is nothing.
 */
export const BLUEPRINT_INK: Record<ColourFamily, string> = {
  CA: '#a82446',
  US: '#c22525',
  AU: '#b25a08',
  NZ: '#6b4a33',
  INT: '#7a3fe0',
  EU: '#3f8a14',
  XEU: '#3a5290',
  AFR: '#6a3fbd',
  CN: '#a5820a',
  ASIA: '#12756c',
  IN: '#b03078',
  SA: '#697a58',
}

/** Blueprint ink for a country — total, like `rimColourFor`. */
export function blueprintInkFor(country: Country): string {
  if (!isKnownCountry(country)) return '#5a6478'
  return BLUEPRINT_INK[familyOf(country)] ?? '#5a6478'
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

  // Backfilled 2026-08-12 (Thomas: "fill in please"). The rule above — "add a
  // name when that country gets its first node" — had quietly stopped being
  // followed the day the corpus outran Europe: 35 countries with live nodes
  // had no entry, so a third of the world fell back to bare ISO codes. The
  // Flag component now reads this for its fallback label, which is the
  // consumer this table was missing.
  AU: 'Australia', NZ: 'New Zealand', BR: 'Brazil', GL: 'Greenland',
  PR: 'Puerto Rico',

  // The Realm of New Zealand and the Compact states.
  CK: 'Cook Islands', NU: 'Niue', TK: 'Tokelau',
  FM: 'Micronesia', MH: 'Marshall Islands', PW: 'Palau',

  // Africa — every AFR country with nodes as of 2026-08-12.
  ZA: 'South Africa', EG: 'Egypt', KE: 'Kenya', ET: 'Ethiopia', GH: 'Ghana',
  NG: 'Nigeria', TZ: 'Tanzania', BW: 'Botswana', NA: 'Namibia', LS: 'Lesotho',
  SZ: 'Eswatini', ZM: 'Zambia', MW: 'Malawi', ZW: 'Zimbabwe', UG: 'Uganda',
  RW: 'Rwanda', DZ: 'Algeria', MA: 'Morocco', TN: 'Tunisia', LY: 'Libya',
  SN: 'Senegal', CI: "Côte d'Ivoire", CM: 'Cameroon', ML: 'Mali',
  // The G.11/G.12 WAEMU/CEMAC batch — slices researched but not yet wired
  // (see UNWIRED in scripts/gen-slices.ts). Named ahead of wiring so the day
  // they load, nothing shows a bare code.
  BF: 'Burkina Faso', TG: 'Togo', GA: 'Gabon', TD: 'Chad',

  // Russia, added 2026-08-13 alongside its first COUNTRY_FAMILY entry.
  RU: 'Russia',
}

export function countryLabelFor(country: Country): string {
  return COUNTRY_LABEL[country] ?? country
}

// `colourFor(level)` used to sit here "so callers that only have a level still
// resolve to something sane" — no caller ever existed. Deleted 2026-08-12 with
// the other dead exports (countryLabelFor gained its first real consumer the
// same day instead: Flag.tsx's fallback).

export type { Report }
