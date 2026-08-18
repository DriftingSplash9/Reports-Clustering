# AF/G.13 — First municipal-level batch: Lagos, Nairobi, Cairo, Johannesburg

## Orientation

This is the AF (Africa) branch's first municipal-level batch. G.1 through G.12 worked exclusively at the federal/national level (statistics offices, national pension law, regional CPI blocs). This session pivots one level down: the city/state/governorate government itself, in four countries already covered federally.

Read `Research.1.md` first if this is your first AF session. The one rule that governs everything below: if no document says it, the edge does not exist.

## Session conditions

Thomas asked to "explore more on the municipal level" after G.12. This was genuinely ambiguous (Africa specifically, vs. some other continent's municipal layer), so I asked before starting rather than guessing at that scale of effort. Thomas confirmed: Africa, municipal level. I picked four major cities in countries the AF branch had already researched federally — Lagos (Nigeria), Nairobi (Kenya), Cairo (Egypt), Johannesburg (South Africa) — on the reasoning that these are the largest, most-documented economic hubs in their countries and therefore the most likely to have retrievable primary municipal documents. No scope confirmation was sought for the specific city list; if that choice should have gone differently, say so and the next batch can correct it.

## Headline result

South Africa's municipal system is a genuine, strong positive finding, standing apart from the other three cities in both evidentiary density and substance. The City of Johannesburg's own 2026/27–2028/29 MTREF budget book states outright that it is "projecting CPI at 3.4 per cent for the 2026/27 financial year... CPI averaged 3.2 per cent in 2025 (StatsSA)," ties property-rates revenue and "minor service" tariff growth to that same figure, and pegs collective-bargained wage increases to "the average CPI for the period... The source of CPI data is StatsSA" (with an explicit 4–7% collar). This is not a coincidence of phrasing: independently located National Treasury MFMA budget circulars mandate the CPI benchmark, and Johannesburg's own "required to justify... all increases more than CPI" language is close to verbatim from the circular's own text. This is the first genuinely CPI-indexed municipal finance system found anywhere in the AF branch, at any level.

The other three cities are, by contrast, honest negative or mixed findings — worth reporting as clearly as the positive one. Cairo Governorate's finances run entirely top-down (central ministries prepare, allocate and approve; the governorate's own Executive Council prepares proposals and executes) and no document ties any Cairo-level fiscal instrument to CAPMAS's CPI — recorded as three isolated, honestly-researched nodes with zero dependencies rather than stretched into a network that doesn't exist. Lagos has one real but discretionary inflation clause (its Land Use Charge Law lets the Commissioner raise valuations "in line with the rate of inflation," naming no source). Nairobi has a genuine "inflation adjustment" mechanism in its water utility's WASREB-approved tariff, but the document never names CPI or KNBS as the index — a real, preserved gap between "inflation-aware" and "CPI-linked."

## Findings

### 1. Lagos, Nigeria — `ng-lagos-luc-law-2018`, `ng-lagos-mtef-2026-2028`, `ng-lagos-citizens-budget-y2026`

The Land Use Charge Law, 2018, Section 10(2), lets valuation rates "be set to rise in line with the rate of inflation as may be determined by the Commissioner" between mandatory five-year reviews — real, but discretionary and unsourced, so no edge to a CPI report was drawn. Lagos's own MTEF and Citizens' Budget are genuine, fetchable primary documents at lagosmepb.org; the MTEF names NBS's January 2025 CPI rebasing in its forecasting narrative (`cites` edge to `ng-nbs-cpi-rebasing`), though its own quantitative inflation table is separately sourced to the Lagos Bureau of Statistics, whose report could not be located this session. Both budget documents show clear dependence on FAAC/Federation Account transfers, evidenced via NBS's own monthly FAAC Disbursement Report (which names Lagos specifically) rather than the enabling Allocation of Revenue Act (searched in full for "Lagos" — zero matches; it names no state individually).

### 2. Nairobi, Kenya — `ke-nairobi-cfsp`, `ke-nairobi-finance-act-2023`, `ke-nairobi-water-tariff-2026`

Nairobi City County runs on well-documented recurring instruments: an annual Fiscal Strategy Paper (required under PFM Act 2012 s.117), an annual Finance Act, and the national County Allocation of Revenue Act (which names "Nairobi City" with a specific equitable-share figure). None tie property rates or the transfer formula to KNBS's CPI — the CFSP's own inflation chart cites KNBS's *Economic Survey*, a different publication from the CPI report already in the corpus, kept as a distinct non-match rather than loosely linked. The one live "inflation adjustment" mechanism found is in WASREB's approval of Nairobi Water's tariff structure (effective July 2027), which names the mechanism but not its index source.

### 3. Cairo, Egypt — `eg-cairo-citizen-budget-2024-2025`, `eg-local-administration-law-43-1979`, `eg-real-estate-tax-law-196-2008`

A clean negative result, reported honestly rather than stretched. Egypt's 2014 Constitution nominally grants local units "independent financial budgets," but Law 43/1979 assigns budget *preparation* to each governorate's Executive Council while vesting *control and evaluation* in the central Cabinet — and news reporting (not primary-source, since no primary Cairo budget document was reachable) confirms Cairo's own operating budget is approved by Parliament's Plan and Budget Committee, not an elected local body. The Real Estate Tax Law's Article 28 earmarks 25% of tax collected within a governorate's jurisdiction for that governorate — the strongest documented fiscal link found — but no Cairo-specific financial document exists to complete the other end of that edge, and valuations/exemption thresholds move only by discretionary Cabinet action, never by CPI. All three reports are correspondingly isolated in the graph; per this project's V0.12 convention, that is itself the finding, not a gap to paper over.

### 4. Johannesburg, South Africa — `za-joburg-mtref-budget`, `za-joburg-property-rates-policy`, `za-mfma-act`, `za-nt-mfma-circular-cpi-guidance`, `za-mpra-act`

See Headline result above. One genuine gap within an otherwise strong slice: the City's own Property Rates Policy document, searched in full, contains no CPI clause — the annual percentage increase is set separately each year in the budget book/Council resolution, not in the Policy itself. City Power's own site (citypower.co.za) could not be reached (persistent SSL/robots errors across every fetch attempt), so its tariff document's CPI basis is unverified rather than denied — the 8.63% FY2026/27 electricity figure used here is corroborated only via the City's own budget book and tariff infographic.

## Secondary observations

- Two report ids required a schema fix during synthesis: several Nairobi and Cairo reports (national-framework laws — Kenya's National Rating Act 2024, County Allocation of Revenue Act 2025, PFM Act 2012, the PBO's Fourth Basis review; Egypt's Local Administration Law and Real Estate Tax Law) were drafted by the research agents with `jurisdiction_level: "national"`, which is not a valid value in this project's schema (the closed union is international/supranational/federal/provincial/municipal/institutional). Corrected to `"federal"` per the branch's standing convention that "federal" means national/central level regardless of a country's own terminology, before import.
- Egypt and Kenya both required a genuine classification judgment call, made and stated rather than defaulted: Kenya's counties (Nairobi included) are the actual devolved government tier, so county-level documents are `"provincial"` in this schema, not `"municipal"` — only Nairobi's water utility (a distinct legal entity) was classified `"municipal"`. Egypt's governorates were kept `"provincial"` despite the centralization finding, since the administrative tier exists even though it lacks fiscal autonomy — the centralization itself is recorded in the description, not solved by reclassifying the tier out of existence.
- 20 new report nodes minted this batch, 11 new dependencies, 25 dropped-edge entries. No id collisions with the existing 711-report corpus (checked programmatically before import).

## Corrections to prior sessions

None. This is the first municipal-level batch in the AF branch; there is no prior municipal-level finding to correct or refine. (G.1–G.12 remain entirely federal-level and are unaffected by this batch.)

## Thomas's stated priority for the remaining work

No new priority statement was given beyond "explore more on the municipal level," confirmed as Africa-specific. Two natural continuations exist and neither was chosen for Thomas: (a) more municipal-level cities within the eight countries already covered federally by G.1–G.12 (e.g. Accra, Dakar, Addis Ababa, Kampala, Kigali, Casablanca, Tunis, Abidjan, Douala/Yaoundé), or (b) returning to the federal-level WAEMU/CEMAC push (Bénin, Guinée-Bissau, Niger, Central African Republic, Congo, Equatorial Guinea — six countries, flagged as the natural next federal-level batch at the end of G.12). Absent a redirect, the next session should ask which axis to continue on rather than default to one.

## Cheap checks still outstanding

1. `ng-lagos-lbs-cpi-report-not-located` — Lagos's own MTEF sources its inflation forecasts to the Lagos Bureau of Statistics (LBS), not NBS directly. No specific LBS CPI/inflation report was located or opened this session.
2. `ng-lagos-mtef-internal-inconsistency` — Lagos's MTEF contains two different, conflicting descriptions of the NBS CPI rebasing (January 2025/base 2024 vs. April 2025/base 2019) within the same document. Flagged, not resolved — an error in Lagos's own document.
3. `ke-cra-fourth-basis-primary-not-located` — Kenya's Commission on Revenue Allocation's own primary Fourth Basis formula document could not be located; only a Parliamentary Budget Office review of it was opened.
4. `ke-cara-2025-enacted-text-blocked` — new.kenyalaw.org returned HTTP 403 on every attempt to reach the enacted County Allocation of Revenue Act, 2025; the pre-enactment Bill was used instead.
5. `eg-cairo-general-diwan-budget-not-retrieved` — news reporting confirms a distinct Cairo Governorate operating budget exists (EGP 8bn FY2026/27), but no primary document (budget text, committee record, or financial statement) was reachable this session. Worth a dedicated attempt.
6. `eg-new-local-administration-law-draft` — a draft replacement Local Administration Law was reportedly under legislative discussion as of April 2026; the draft text could not be fetched (proxy-blocked).
7. `za-joburg-city-power-site-unreachable` — citypower.co.za returned SSL/robots errors on every fetch attempt across the session; City Power's own tariff/NERSA documents remain unverified for a CPI basis.
8. `za-joburg-idp-not-opened` — a candidate Integrated Development Plan document was located via search but not opened/verified; the MTREF budget book's own IDP-alignment section was used instead as the higher-priority source.

## What to pass at the start of next thread

Point the next session at this file (`AF/G.13.md`). Ask Thomas explicitly which axis to continue on: more African cities at the municipal level, or the remaining six WAEMU/CEMAC countries at the federal level (see G.12's "Thomas's stated priority" section) — do not default to one without asking, since this session's own scope (which four cities) was picked without that confirmation and a repeat guess compounds the drift.

---

## How to write the next hand-off

(Copied verbatim per branch convention.)

Required sections, in this order: Orientation, Session conditions, Headline result, Findings (numbered `###` subsections, one per country/topic), Secondary observations, Corrections to prior sessions (never omit this section — even "none this session" is itself a claim, state it explicitly), Thomas's stated priority for the remaining work, Cheap checks still outstanding, What to pass at the start of next thread, and this spec block itself, copied verbatim into every hand-off.

Never edit a predecessor file. Corrections to earlier sessions go in the new file's Corrections section, dated and attributable to this session.

Every claim needs a document behind it — a URL/location and, wherever practical, a verbatim quote. "Comparable with"-type language is not a dependency. Tense matters: a PAST-tense arrangement is not a live dependency; flag it if a source's tense is ambiguous. AGENCY ONLY and NOT FOUND are legitimate research outcomes, not failures — record them in `_dropped` with an honest reason, don't leave the question unanswered and don't force an edge that isn't there.
