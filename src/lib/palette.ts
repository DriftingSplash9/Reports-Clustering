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

  // United Arab Emirates — added 2026-08-15, first Gulf/Middle East country,
  // same session as `src/data/research/ae-national-core.json`. Filed to
  // `ASIA`, the same reserved catch-all family RU uses above, for the same
  // reason: no dedicated Middle East family exists yet, and `ASIA` is the
  // unstaffed bucket built to absorb exactly this case rather than force a
  // false fit into `AFR`, `EU`/`XEU`, or a reserved-for-someone-else code.
  AE: 'ASIA',

  // Israel and Singapore — added 2026-08-18 with the Grok archive
  // consolidation (`Grok - Brics+israel and singapore/consolidated/`). Both
  // filed to `ASIA` for the same reason RU and AE are: it is the reserved
  // catch-all family, and there is still no dedicated Middle East family for
  // Israel nor an East/Southeast Asia one for Singapore. Thomas is revamping
  // the palette next, so these are placeholders that render rather than
  // classifications to defend.
  IL: 'ASIA',
  SG: 'ASIA',

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

  // Argentina — processed 2026-08-15, `src/data/research/ar-national-core.json`.
  // Filed to `SA` alongside Brazil, the family reserved for this continent.
  // Backfilled 2026-08-16: this entry was missed when the Argentina slice
  // originally went live, so its nodes were rendering flat grey until now.
  AR: 'SA',

  // Bolivia — processed 2026-08-16, `src/data/research/bo-national-core.json`,
  // via the raw-Grok-batch conversion pipeline. Filed to `SA` alongside
  // Brazil and Argentina.
  BO: 'SA',

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
 * `INT`'s colour: `colourForReport` and `inkFor` both test membership
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
 * **Palette v3, 2026-08-19.** Hue is the family; chroma is the jurisdiction
 * ladder; luminance is held flat. Read this table with `FAMILY_INK` and
 * `glowInk` below — the three of them are one system and tuning one alone
 * will undo the others.
 *
 * **What v2 got wrong, measured rather than argued.** The v2 ramps ran
 * DARK → LIGHT down the ladder, which spread the palette across a **13.1×**
 * relative-luminance range (0.054 to 0.703). Two consequences followed, and
 * both had been treated as separate problems for months:
 *
 * 1. **The darkest nodes read as holes in the sky.** A national-level EU node
 *    at Y = 0.054 against a Y = 0.003 background is a smudge. Rims were added
 *    to rescue exactly those nodes — the rims were never the design, they were
 *    a patch on this table. Flattening the ramp is what makes it possible to
 *    take them off.
 * 2. **The authority glow ran backwards.** `emissive` is the fill colour and
 *    `emissiveIntensity` is authority, so emitted light is the product of the
 *    two. Across a 13× fill range that product is dominated by the fill: a
 *    worthless institutional node emitted roughly 3–4× a top-authority
 *    national one. Bloom was picking out the *least* important nodes in the
 *    graph, and had been since it was first tuned. See `glowInk`.
 *
 * **The v3 assignment.** Hues are spaced by how much of the corpus each family
 * actually is — AFR 32.2%, EU 15.7%, US 11.4%, CA 10.2%, SA 9.3%, INT 6.1%,
 * then ASIA 4.0%, NZ 3.8%, XEU 2.8%, AU 1.9%, IN 1.6%, CN 1.0%. Five families
 * are 79% of the graph; the other seven are 15% between them. Big families get
 * wide moats, small ones sit in the shoulders:
 *
 * | Family | Hue | Share | National |
 * |---|---|---|---|
 * | US | 0° | 11.4% | `#ff0000` — pure, with a 335°–25° moat |
 * | *(BRICS ink)* | *48°* | — | reserved, belongs to no family |
 * | SA | 88° | 9.3% | `#518e0c` |
 * | AU | 118° | 1.9% | `#059500` |
 * | EU | 150° | 15.7% | `#0c924f` |
 * | XEU | 172° | 2.8% | `#00907c` |
 * | INT | — | 6.1% | `#ecf0f7` — achromatic |
 * | CA | 200° | 10.2% | `#1086c2` |
 * | CN | 224° | 1.0% | `#4375ff` |
 * | ASIA | 248° | 4.0% | `#7c67ff` |
 * | NZ | 270° | 3.8% | `#a850ff` |
 * | AFR | 296° | 32.2% | `#ca44d3` |
 * | IN | 322° | 1.6% | `#f2009a` |
 *
 * **Measured on the values below**: the eleven hued families' national steps
 * span Y 0.211–0.215, a **1.02×** range, against v2's 13.1×. Across the whole
 * ladder (national through institutional) the span is 0.211–0.333, 1.58× — and
 * that residual is chroma falling away toward the neutral, not brightness
 * being added.
 *
 * **Chroma is damped in proportion to how often a family appears.** A colour
 * seen 397 times has to be calmer than one seen 12 times or the largest family
 * shouts the graph down. AFR runs at 62% chroma, the 8–15% families at 85%,
 * the small ones at full. That damping is why Africa reads as a field rather
 * than as a wall.
 *
 * **These shares are an input, and they will move.** They were counted at
 * 1 250 nodes. The staged Grok archive is another 1 999 and is heavily Latin
 * America and Asia — importing it roughly doubles SA and ASIA and materially
 * changes AFR's share. Thomas chose to build this now and re-damp afterwards,
 * with eyes open; when the import lands, re-count and re-damp rather than
 * assuming these numbers still hold.
 *
 * **The v2 docstring that used to sit here** described the v1 continent scheme
 * that v2 itself had already replaced, and had been stale for a full palette
 * generation. It is not carried forward a second time; its one durable idea —
 * that families sharing a continent are told apart within a hue neighbourhood
 * rather than by separate hues — is now expressed directly by EU/XEU sitting
 * 22° apart and by CA taking the US antipode.
 */
export const SCOPE_COLOUR: Record<string, string> = {
  // Stateless bodies — ACHROMATIC, and off the colour wheel entirely.
  //
  // Three reasons, and it solves a problem nobody asked it to. It is
  // semantically exact: the palette's axis is *which country*, and a stateless
  // body has no position on that axis, so the absence of hue is the honest
  // mark. It is continuous with what was already approved — INT's family cue
  // was a bold white rim, and with rims gone the rim simply becomes the fill.
  // And it resolves the AFR/INT collision for free: those two have been a
  // "known tight spot, accepted with eyes open" (deep violet against lighter
  // violet, told apart by the rim) since palette v2, and the tiebreak was
  // about to disappear. INT vacating the purple region is what lets Africa
  // keep its hue.
  //
  // It also returns a full 60° of wheel to the eleven hued families, which at
  // roughly 25° apart they need.
  'INT:international': '#ecf0f7',
  'INT:supranational': '#d3d8e2',
  'INT:federal': '#d3d8e2',
  'INT:provincial': '#bac0cd',
  'INT:municipal': '#bac0cd',
  'INT:institutional': '#a1a8b8',

  // United States — pure red, and only the United States.
  // `#ff0000` exactly, with a moat: no other family sits in hues 335°–25°.
  // That is what costs the palette its whole warm quarter, and it is why CA,
  // AU, NZ, CN and IN all had to move. `provincial` still means "state".
  'US:federal': '#ff0000',
  'US:provincial': '#d16a6a',
  'US:municipal': '#b98585',
  'US:institutional': '#aa9797',
  'US:supranational': '#ff0000',
  'US:international': '#ecf0f7',

  // Canada — cyan, at 200°, a full 160° from the US and the largest
  // separation the wheel can give. Losing red is the biggest identity change
  // in this palette and it is unavoidable: CA/US is the one pair this file
  // exists to keep apart ("Statistics Canada and the Bureau of Labor
  // Statistics would render identically"), so rather than crowd Canada up
  // against the moat it gets the antipode.
  'CA:federal': '#1086c2',
  'CA:provincial': '#3b91bd',
  'CA:municipal': '#7099ad',
  'CA:institutional': '#909ea4',
  'CA:supranational': '#1086c2',
  'CA:international': '#ecf0f7',

  // European Union — green at 150°, essentially where it already was.
  // Five levels rather than four, so the ramp is sampled at five points.
  'EU:supranational': '#0c924f',
  'EU:federal': '#279860',
  'EU:provincial': '#469d72',
  'EU:municipal': '#68a084',
  'EU:institutional': '#8ba096',
  'EU:international': '#ecf0f7',

  // Europe (non-EU) — teal at 172°, riding alongside EU's green:
  // "European, but not the EU" said as a neighbouring hue rather than as a
  // separate idea. Replaces the old saturation-split, which needed the rims
  // to be readable and therefore cannot survive them.
  'XEU:federal': '#00907c',
  'XEU:provincial': '#24998a',
  'XEU:municipal': '#52a095',
  'XEU:institutional': '#87a09d',
  'XEU:supranational': '#00907c',
  'XEU:international': '#ecf0f7',

  // Africa — violet at 296°, near-unchanged, and it keeps its hue only
  // because INT vacated the purple region (see below). At 32.2% of the corpus
  // this is the family whose chroma damping matters most: undamped, a third of
  // the graph shouts.
  'AFR:federal': '#ca44d3',
  'AFR:provincial': '#b96dbe',
  'AFR:municipal': '#ac87ae',
  'AFR:institutional': '#a598a6',
  'AFR:supranational': '#ca44d3',
  'AFR:international': '#ecf0f7',

  // South America — olive-lime at 88°. The old sage was the same hue at
  // almost no chroma; this is that hue given a voice, which it has earned at
  // 9.3% of the corpus.
  'SA:federal': '#518e0c',
  'SA:provincial': '#66972f',
  'SA:municipal': '#7d9d5a',
  'SA:institutional': '#959f8a',
  'SA:supranational': '#518e0c',
  'SA:international': '#ecf0f7',

  // Australia — green at 118°. Orange is inside the US moat.
  'AU:federal': '#059500',
  'AU:provincial': '#299d25',
  'AU:municipal': '#57a454',
  'AU:institutional': '#89a289',
  'AU:supranational': '#059500',
  'AU:international': '#ecf0f7',

  // New Zealand + Realm + Compact states — violet-blue at 270°.
  // Brown cannot survive a luminance floor: darkened it is mud, lightened it
  // is tan, and neither is a hue.
  'NZ:federal': '#a850ff',
  'NZ:provincial': '#a670dd',
  'NZ:municipal': '#a486c1',
  'NZ:institutional': '#a398ae',
  'NZ:supranational': '#a850ff',
  'NZ:international': '#ecf0f7',

  // China — blue at 224°, NOT yellow. Yellow is the BRICS group ink and
  // belongs to no family; if China kept it, China would look like "the BRICS
  // one" in every mode while the other four members did not.
  'CN:federal': '#4375ff',
  'CN:provincial': '#6686db',
  'CN:municipal': '#8192be',
  'CN:institutional': '#959bac',
  'CN:supranational': '#4375ff',
  'CN:international': '#ecf0f7',

  // Asia (rest) — indigo at 248°. RU, AE, IL, SG.
  'ASIA:federal': '#7c67ff',
  'ASIA:provincial': '#897be0',
  'ASIA:municipal': '#938cc4',
  'ASIA:institutional': '#9c9aaf',
  'ASIA:supranational': '#7c67ff',
  'ASIA:international': '#ecf0f7',

  // India — magenta at 322°, near-unchanged.
  'IN:federal': '#f2009a',
  'IN:provincial': '#d85baa',
  'IN:municipal': '#bd7fa7',
  'IN:institutional': '#ac96a4',
  'IN:supranational': '#f2009a',
  'IN:international': '#ecf0f7',

}

/**
 * A country in the data with no entry in `COUNTRY_FAMILY`.
 *
 * Should be unreachable — `npm run validate` errors on it — and is drawn in a
 * flat grey if it ever is, so it reads as "unclassified" rather than quietly
 * joining a family. Distinct from `COMMERCIAL_COLOUR`, which is a *decision*;
 * this one is the absence of one.
 *
 * **Pushed below the band in v3** (was `#6b7280`, Y = 0.167). INT is
 * achromatic now, so the palette has three neutrals in play and they can no
 * longer be told apart by hue — only by lightness. The ladder, top to bottom:
 * INT national Y = 0.869, INT institutional Y = 0.390, `COMMERCIAL_COLOUR`
 * Y = 0.118, this Y = 0.056. **Bright neutral means stateless body; dim
 * neutral means outside the classification.** Keep that ordering intact.
 *
 * The floor is set against the horizon band (`HORIZON_COLOUR`, Y = 0.017),
 * not against `SCENE_BACKGROUND` (Y = 0.003) — with the sky on, part of the
 * background a node can sit against is far brighter than space, and a floor
 * picked against space vanishes into the sky instead.
 */
export const UNCLASSIFIED_COLOUR = '#3f434d'

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
 *
 * **Pushed below the band in v3** (was `#8b93a4`, Y = 0.290), for the reason
 * spelled out on `UNCLASSIFIED_COLOUR`: with INT achromatic, this grey used to
 * sit *between* INT's institutional step (0.390) and its national one (0.869)
 * and would have read as a mid-weight stateless body. It now sits below both,
 * and above `UNCLASSIFIED_COLOUR` — a decision is dimmer than a stateless
 * body and brighter than the absence of a decision.
 */
export const COMMERCIAL_COLOUR = '#5a616e'

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
 * **`FAMILY_INK` — one colour per family, and the single source of ink.**
 *
 * This is v3's extraction of what v2 called `COUNTRY_RIM`, and the rename is
 * the point. That table was doing three unrelated jobs under a name that
 * described only the first: it coloured the fresnel rim, it coloured every
 * edge and pulse in the graph, and it coloured the legend chips in the
 * sidebar. Rims are now gone from the dark scene (see `nodeMaterial`) — and
 * had the edges still been reading their colour out of a table called
 * `COUNTRY_RIM`, deleting rims would have taken the edges with them.
 *
 * So: this is the family's ink, full stop. Edges are drawn in it, pulses are
 * drawn in it, legend chips are drawn in it, and the two places a rim still
 * survives — hollow one-off instruments, where the rim IS the node, and
 * (and, until 2026-08-19, blueprint) — draw in it too.
 *
 * The values are each family's **national step** from `SCOPE_COLOUR`, not a
 * separate set of hand-picked light tints the way v2's rims were. An edge
 * between two EU reports is now EU green rather than a lime that appears
 * nowhere else on screen. v2 needed the tints because a rim is a few pixels of
 * silhouette and had to shout; an edge at 1.6px does not (see
 * `LINK_WIDTH_SCALE` — edges used to be drawn 0.08px wide, which is most of
 * why they needed such bright ink).
 *
 * Y = 0.211–0.215 across the eleven hued families, so no family's edges are
 * brighter than another's. INT is the deliberate exception at Y = 0.869: a
 * stateless body's ink is near-white because its fill is.
 */
export const FAMILY_INK: Record<ColourFamily, string> = {
  CA: '#1086c2',
  US: '#ff0000',
  AU: '#059500',
  NZ: '#a850ff',
  INT: '#ecf0f7',
  EU: '#0c924f',
  XEU: '#00907c',
  AFR: '#ca44d3',
  CN: '#4375ff',
  ASIA: '#7c67ff',
  IN: '#f2009a',
  SA: '#518e0c',
}

/**
 * The BRICS group yellow — the 48° slot the v3 wheel reserves and assigns to
 * no family (see the assignment table above: if China kept yellow, China
 * would read as "the BRICS one" in every mode while the other members
 * didn't). Worn only by the GROUP_COMPARISON lens in `lib/modes.ts`.
 *
 * Deliberately a luminance exception, measured in the review (§3.2): yellow
 * inside the Y band is a dark olive (`#cea400`) that renders brown-gold and
 * loses to the neutral grey. Bright `#ffd600` is clearly right; the accepted
 * cost is that BRICS nodes bloom a little harder than the other four groups
 * while that lens is on — the same knowingly-open exception as INT's
 * near-white (see BLOOM_THRESHOLD_MIN in view.ts).
 */
export const BRICS_INK = '#ffd600'

/**
 * The family ink for a country, total by construction.
 *
 * Member states take the EU family ink rather than one each — see the note on
 * `ColourFamily`. A country with no family at all gets `UNCLASSIFIED_COLOUR`
 * instead of being absorbed, which is the whole reason this is a function and
 * not a `Record<Country, string>`: an open country set cannot be a total
 * record, and the old type only looked total because the union was closed.
 */
export function inkFor(country: Country): string {
  if (!isKnownCountry(country)) return UNCLASSIFIED_COLOUR
  return FAMILY_INK[familyOf(country)] ?? UNCLASSIFIED_COLOUR
}

/**
 * The luminance every node's *emissive* channel is held at, whatever its hue.
 *
 * **This is the fix for the inverted authority glow.** A node's emitted light
 * is `emissive colour × emissiveIntensity`, intensity is
 * `0.3 + size_score × 0.62`, and emissive was simply the fill. Under v2's 13×
 * fill range that product was dominated by the fill, so bloom lit whichever
 * nodes happened to be painted brightest — which, because the ramp ran
 * dark-at-the-top, meant the *least* authoritative ones. ESA 2010, the single
 * most-depended-upon report in the corpus, was painted `#10603c` at Y = 0.054
 * and emitted less light than an institutional node nobody cites.
 *
 * Normalising the emissive colour to a constant luminance makes the product
 * proportional to intensity alone, so **glow becomes a pure second reading of
 * authority** — which is what `view.ts` has claimed it was for five sessions.
 *
 * **0.213 is not a free choice: it is pure red's ceiling.** `#ff0000` has a
 * relative luminance of 0.2126 and cannot be scaled above it, and the US is
 * pure red by decision. A higher reference would leave every US node emitting
 * short of every other family at the same authority — the inversion back
 * again, in miniature. So the reference is set at what the least luminous hue
 * in the palette can actually carry, and every other family is scaled down to
 * meet it.
 *
 * Consequence to expect: total emitted light across the scene is lower than
 * v2's, so the bloom threshold had to come down with it — see
 * `BLOOM_THRESHOLD_MIN` in view.ts. Do not raise this to recover brightness;
 * lower the threshold instead, or red silently falls out of the encoding.
 */
export const GLOW_REFERENCE_Y = 0.213

/**
 * A fill colour scaled to `GLOW_REFERENCE_Y`, for use as the emissive channel.
 *
 * Scaling happens in **linear** light, not on the sRGB bytes — the whole point
 * is to equalise perceived emission, and sRGB is not proportional to it.
 * Channels clamp at 1, which is why a hue already at or below the reference
 * (pure red, exactly) comes back unchanged rather than impossibly boosted.
 */
export function glowInk(colour: string): string {
  const hex = colour.replace('#', '')
  if (hex.length !== 6) return colour
  const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const toSrgb = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)
  const linear = [0, 2, 4].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255))
  const luminance = 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
  if (luminance <= 0) return colour
  const scale = GLOW_REFERENCE_Y / luminance
  return `#${linear
    .map((c) => Math.round(Math.min(1, Math.max(0, toSrgb(Math.min(1, c * scale)))) * 255)
      .toString(16)
      .padStart(2, '0'))
    .join('')}`
}

/**
 * The rim-weight vocabulary. See `RIM_WEIGHT` for where a rim still exists.
 */
export type RimWeight = 'none' | 'normal' | 'thick' | 'bold'

/**
 * How heavily a family's rim is drawn — **and where a rim still exists at
 * all.**
 *
 * In v2 this was one of two always-on family channels, applied to every node
 * in the scene. In v3 the fill carries the family on its own and rims are gone
 * from the dark scene entirely (see `nodeMaterial`), which leaves this table
 * governing exactly one survivor (blueprint, the other, was deleted
 * 2026-08-19):
 *
 * - **Hollow one-off instruments**, where the rim *is* the node — there is no
 *   fill to carry anything, so the ring has to.
 *
 * That is the rule: **a rim is
 * valid only where there is no coloured fill to read.** It is not a decorative
 * option to be switched back on.
 *
 * 'bold' is a wide, strong ring (US, INT, NZ), 'thick' a widened one (EU),
 * 'normal' the classic thin fresnel highlight. 'none' — Africa's, in v2 —
 * is no longer used by any family: with rims confined to hollow nodes, a
 * family-level 'none' would mean a fifth of African one-off instruments
 * rendering as nothing at all, and `nodeMaterial` already had to special-case
 * a promotion to work around exactly that. The special case is gone with the
 * value that needed it.
 */
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

/** Rim weight for a country, total by construction like `inkFor`. */
export function rimWeightFor(country: Country): RimWeight {
  return RIM_WEIGHT[familyOf(country)] ?? 'normal'
}

// `BLUEPRINT_INK` / `blueprintInkFor` — the dark-on-paper family inks —
// were deleted with blueprint mode on 2026-08-19 (Phase 4 item 1). The
// equal-luminance derivation (each FAMILY_INK scaled in linear light to
// Y = 0.085) is worth remembering if a print/light theme ever returns:
// hand-picked dark inks spanned a ten-fold luminance range and read as
// pencil-vs-marker.


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

  // South America — Argentina (2026-08-15, backfilled 2026-08-16 alongside
  // its missing COUNTRY_FAMILY entry above) and Bolivia (2026-08-16). Brazil's
  // own label entry already exists above (line ~1090).
  AR: 'Argentina', BO: 'Bolivia',

  // United Arab Emirates, added 2026-08-15 alongside its COUNTRY_FAMILY
  // entry — missed at the time, backfilled 2026-08-16.
  AE: 'United Arab Emirates',

  // Israel and Singapore, added 2026-08-18 alongside their COUNTRY_FAMILY
  // entries above.
  IL: 'Israel', SG: 'Singapore',
}

export function countryLabelFor(country: Country): string {
  return COUNTRY_LABEL[country] ?? country
}

// `colourFor(level)` used to sit here "so callers that only have a level still
// resolve to something sane" — no caller ever existed. Deleted 2026-08-12 with
// the other dead exports (countryLabelFor gained its first real consumer the
// same day instead: Flag.tsx's fallback).

export type { Report }
