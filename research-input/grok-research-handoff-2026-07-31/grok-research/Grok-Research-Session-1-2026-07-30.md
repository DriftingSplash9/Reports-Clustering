# Grok Research Session 1 — 2026-07-30

**Project:** Documented dependencies between official reports and statistical releases (Research.1.md protocol)  
**Focus:** Interprovincial income-tax indexation, disability benefit rate-setting, CPI sources, and related residual income-testing rules  
**Status:** First full extraction + dependency observation set complete  
**Workspace:** `/home/workdir/artifacts/grok-research/`  
**Note:** Research.1.md and V0.12.md remain untouched.

---

## 1. Scope Completed

### Item 1a — Personal Income Tax Indexation
Full statutory extraction completed for all 13 provinces and territories, including:
- Exact statutory language naming the price index
- Reference window (almost always 12 months ending 30 September; Nova Scotia uses 31 August)
- Any statutory caps or special rules
- 2026 numerical indexation factors

### Item 1b — Disability & Income-Support Programs
Rate-setting and income-testing rules extracted for:
- Alberta (AISH / ADAP)
- Ontario (ODSP)
- British Columbia (Disability Assistance)
- Saskatchewan (SAID)
- Quebec (Social Solidarity / Basic Income)
- High-level patterns for Atlantic provinces and territories

Key findings recorded on treatment of CPP-D and the Canada Disability Benefit (CDB).

### Supporting Material
- Statistics Canada as the universal ultimate publisher of the CPI series used in statutes
- Bank of Canada core inflation measures (CPI-trim, CPI-median, CPI-common) and their construction from the 55-component CPI
- Residual monthly income-testing logic across disability programs
- Official 2026–2027 Statistics Canada major economic release calendar (CPI, LFS, etc.)

---

## 2. Part B — Dependency Observations

Clean, Claude-ready records of documented relationships only.

**DO-001**  
Source: Provincial/territorial Income Tax Acts (collective)  
Relationship: Calculated from / adjusted by reference to  
Target: Consumer Price Index (All-items), Statistics Canada (national or provincial series)  
Notes: 12-month window ending 30 September is dominant. Nova Scotia uses 31 August. Several jurisdictions adopt the federal factor via s. 117.1 of the federal Income Tax Act.

**DO-002**  
Source: Alberta Personal Income Tax Act, s. 44.2  
Relationship: Defines and uses (with statutory ceiling)  
Target: Alberta Consumer Price Index (Statistics Canada)  
Notes: “Alberta escalator” = lesser of 2 % or Alberta CPI change. Same escalator now applied to AISH/ADAP living allowances (2026 onward).

**DO-003**  
Source: Ontario Disability Support Program Regulation (O. Reg. 222/98), s. 29.1  
Relationship: Adjusted by  
Target: Consumer Price Index for Ontario (All-items), Statistics Canada  
Notes: Annual adjustment effective 1 July using the 12 months ending 30 September of the previous year. Ontario Works remains unindexed.

**DO-004**  
Source: Employment Insurance Act, s. 4  
Relationship: Calculated from  
Target: Average Weekly Earnings of the Industrial Aggregate, Statistics Canada  
Notes: Not CPI-based. Uses 12-month period ending 30 April. Determines maximum yearly insurable earnings and maximum weekly benefit.

**DO-005**  
Source: Quebec Taxation Act and related social-assistance provisions  
Relationship: Uses (with statutory basket modification)  
Target: Québec Consumer Price Index excluding alcoholic beverages, tobacco products and recreational cannabis  
Notes: Only jurisdiction that writes a basket exclusion directly into the indexation formula.

**DO-006**  
Source: Provincial/territorial disability and income-assistance legislation (collective)  
Relationship: Residual payment depends on  
Target: Household income (applicant + spouse/partner), including the recipient’s Canada Pension Plan Disability benefits  
Notes: Recipient’s own CPP-D is non-exempt in every jurisdiction examined. Canada Disability Benefit is non-exempt only in Alberta; declared exempt by every other province/territory that has issued a statement.

**DO-007**  
Source: Bank of Canada preferred measures of core inflation + Statistics Canada methodology documents  
Relationship: Constructed from  
Target: 55-component disaggregation of the Consumer Price Index (tax-adjusted), Statistics Canada  
Notes:  
- CPI-trim excludes 20 % of weighted price changes from each tail.  
- CPI-median is the 50th percentile of the weighted distribution.  
- CPI-common uses the first principal component; removed from preferred set in 2022 due to large historical revisions.

**DO-008**  
Source: All provincial/territorial indexation statutes examined  
Relationship: Ultimate publisher of the price index  
Target: Statistics Canada under the authority of the Statistics Act (Canada)  
Notes: No provincial statistical agency is named in the statutes as the primary publisher. Provincial agencies republish or analyse the Statistics Canada series.

**DO-009**  
Source: Nova Scotia Personal Income Tax Indexation Regulations  
Relationship: Uses (with non-standard reference window)  
Target: All-items Consumer Price Index, not seasonally adjusted, Statistics Canada  
Notes: 12-month period ending 31 August. Governor in Council may prescribe a different amount.

**DO-010**  
Source: Federal Income Tax Act, s. 117.1  
Relationship: Defines the indexation factor adopted by reference  
Target: Consumer Price Index for Canada, Statistics Canada  
Notes: Adopted by reference in Saskatchewan, New Brunswick, and the three territories.

**DO-011**  
Source: Alberta AISH/ADAP policy and regulation  
Relationship: Treats as non-exempt income  
Target: Canada Disability Benefit  
Notes: Only jurisdiction that reduces the provincial disability payment dollar-for-dollar by the amount of the federal CDB.

**DO-012**  
Source: Residual disability programs (collective)  
Relationship: Monthly (or previous-period) recalculation depends on  
Target: Client-reported income + federal administrative data feeds (especially CPP) + periodic tax-return verification  
Notes: Benefits are recalculated when income changes; they are not static annual amounts.

---

## 3. 2026 Indexation Factors (confirmed)

| Jurisdiction              | 2026 Factor | Notes                                      |
|---------------------------|-------------|--------------------------------------------|
| Federal                   | 2.0 %       |                                            |
| Alberta                   | 2.0 %       | Capped (Alberta escalator)                 |
| British Columbia          | 2.2 %       |                                            |
| Manitoba                  | 0 %         | Frozen for brackets & basic personal amount|
| Ontario                   | 1.9 %       |                                            |
| Quebec                    | 2.05 %      | Modified CPI basket                        |
| Saskatchewan              | 2.0 %       | Adopts federal factor                      |
| New Brunswick             | 2.0 %       | Adopts federal factor                      |
| Newfoundland & Labrador   | 1.1 %       | Provincial CPI                             |
| Nova Scotia               | 1.6 %       | August window                              |
| Prince Edward Island      | 0 % auto    | Discretionary legislative increases only   |
| Northwest Territories     | 2.0 %       | Adopts federal factor                      |
| Nunavut                   | 2.0 %       | Adopts federal factor                      |
| Yukon                     | 2.0 %       | Adopts federal factor                      |

---

## 4. Monitoring Reference — Statistics Canada Major Releases 2026-2027

**Source:** Statistics Canada, “2026-2027 release dates – Major economic releases”  
PDF: https://www150.statcan.gc.ca/release-diffusion/2026-eng.pdf  
**Caveat:** Dates may be modified in exceptional circumstances.

### Consumer Price Index
- 19 Jan 2026 (Dec 2025)
- 17 Feb 2026 (Jan 2026)
- 16 Mar 2026 (Feb 2026)
- 20 Apr 2026 (Mar 2026)
- 19 May 2026 (Apr 2026)
- 22 Jun 2026 (May 2026)
- 20 Jul 2026 (Jun 2026)
- 17 Aug 2026 (Jul 2026)
- 14 Sep 2026 (Aug 2026)
- 19 Oct 2026 (Sep 2026) ← closes standard tax-indexation window
- 16 Nov 2026 (Oct 2026)
- 14 Dec 2026 (Nov 2026)
- 18 Jan 2027 (Dec 2026)
- 16 Feb 2027 (Jan 2027)
- 15 Mar 2027 (Feb 2027)

### Labour Force Survey
- 9 Jan 2026 (Dec 2025)
- 6 Feb 2026 (Jan 2026)
- 13 Mar 2026 (Feb 2026)
- 10 Apr 2026 (Mar 2026)
- 8 May 2026 (Apr 2026)
- 5 Jun 2026 (May 2026)
- 10 Jul 2026 (Jun 2026)
- 7 Aug 2026 (Jul 2026)
- 4 Sep 2026 (Aug 2026)
- 9 Oct 2026 (Sep 2026)
- 6 Nov 2026 (Oct 2026)
- 4 Dec 2026 (Nov 2026)
- 8 Jan 2027 (Dec 2026)
- 5 Feb 2027 (Jan 2027)
- 12 Mar 2027 (Feb 2027)

Other high-value series (Building permits, Wholesale trade, Monthly Survey of Manufacturing, merchandise trade, quarterly GDP) follow regular mid-month or end-of-quarter patterns detailed in the source PDF.

---

## 5. Key Structural Patterns Observed

1. **Tax indexation** almost universally depends on a Statistics Canada CPI series (provincial or national).  
2. **Alberta** is the only jurisdiction with an explicit statutory percentage ceiling (2 %) on its escalator.  
3. **Quebec** is the only jurisdiction that modifies the CPI basket by statute.  
4. **Nova Scotia** is the only jurisdiction that uses an August rather than September reference window.  
5. **Disability benefits** across Canada are residual and income-tested monthly (or on the previous period). The recipient’s own CPP-D reduces the provincial payment in every program examined.  
6. **Canada Disability Benefit** is clawed back only in Alberta; all other responding jurisdictions treat it as exempt.  
7. **Employment Insurance** maximums are driven by Average Weekly Earnings, not CPI.

---

## 6. Open / Next Possible Work

- Deeper statutory quotations for any remaining thin Atlantic or territorial disability regulations if required.
- Extraction from Statistics Canada methodology documents on the precise construction of the provincial CPI series.
- Formal mapping of the Bank of Canada core-measure methodology documents into additional dependency observations.
- Monitoring protocol using the release calendar above (especially the October CPI print that feeds most 2027 tax factors).

---

*End of tidy Session 1 record.*  
*All major extractions and dependency observations completed on 2026-07-30.*

---

## Phase 2 — Statistical Source Methodology & Additional Dependency Observations

### Key Methodology Extracts

**Statistics Canada — Canadian Consumer Price Index Reference Paper (Catalogue 62-553-X, 2023)**

- The CPI measures pure price change by comparing the cost of a fixed basket of goods and services of constant or equivalent quantity and quality.
- Basket weights are derived primarily from Household Final Consumption Expenditure (HFCE) series, supplemented by the Survey of Household Spending (SHS).
- Weights are updated annually (since the 2021 basket update).
- The eight major components are: Food; Shelter; Household operations, furnishings and equipment; Clothing and footwear; Transportation; Health and personal care; Recreation, education and reading; Alcoholic beverages, tobacco products and recreational cannabis.
- Upper-level aggregation uses a fixed-basket Lowe formula.
- Current index base period is 2002 = 100.
- Provincial and territorial series (plus Whitehorse, Yellowknife, Iqaluit) are produced as part of the same program.

**Statistics Canada — Preferred Measures of Core Inflation Methodology Document**

- CPI-trim, CPI-median and CPI-common are all constructed by Statistics Canada from a 55-component disaggregation of the CPI basket (exhaustive and mutually exclusive, summing to 100 % of the basket).
- The 55 component indexes are first adjusted to remove the effect of changes in indirect taxes.
- CPI-trim: excludes components whose monthly rates of change fall in the tails of the distribution (20 % of basket weight from each tail).
- CPI-median: the price change at the 50th percentile of the weighted distribution of the 55 components.
- CPI-common: based on a factor model / principal-component extraction of common variation across the 55 series, then scaled to the tax-adjusted All-items CPI.
- CPI-common was dropped from the Bank of Canada’s preferred set in 2022 because of large historical revisions.

---

### Additional Dependency Observations

**DO-013**  
Source: Statistics Canada, Canadian Consumer Price Index Reference Paper (62-553-X)  
Relationship: Defines construction of  
Target: All-items Consumer Price Index and its provincial/territorial series  
Notes: Fixed-basket index. Weights from HFCE + SHS, updated annually. Eight major components. Base period 2002 = 100. This is the ultimate methodological source for every CPI series named in the tax and benefit statutes already extracted.

**DO-014**  
Source: Statistics Canada methodology document on Bank of Canada preferred measures of core inflation  
Relationship: Constructs from  
Target: 55-component tax-adjusted CPI disaggregation  
Notes: Explicit that CPI-trim, CPI-median and CPI-common are computed by Statistics Canada from the CPI Survey data. The 55 components account for 100 % of the CPI basket.

**DO-015**  
Source: Bank of Canada communications and methodology materials  
Relationship: Uses as preferred measures of core / underlying inflation  
Target: CPI-trim and CPI-median (CPI-common formerly preferred)  
Notes: Adopted as preferred set in 2016. CPI-common removed from the preferred set in 2022 due to revision issues. These measures are the operational gauges the Bank uses when looking through transitory movements in total CPI.

**DO-016**  
Source: Statistics Canada CPI program + all provincial tax indexation statutes  
Relationship: Basket weights and product classification determine  
Target: Relative importance of price changes that feed into the All-items and provincial CPI series used for statutory indexation  
Notes: Because the statutes simply name “the Consumer Price Index \ldots as published by Statistics Canada,” any change in basket weights, product classification, or quality-adjustment methods by Statistics Canada flows through into the statutory indexation factors without further legislative action.

---

*Phase 2 methodology extracts and dependency observations DO-013 to DO-016 recorded.*

---

## Provincial Deep Dive — Additional Extractions (Atlantic + Manitoba)

### Newfoundland and Labrador — Income Support + Disability Benefit

**Key official statements (2025–2026):**
- Effective July 2025, the Newfoundland and Labrador Disability Benefit ($400/month) and the Canada Disability Benefit ($200/month) are both treated as **exempt income** for Income Support purposes.
- Qualifying persons with disabilities who hold the Disability Tax Credit can receive up to $600/month from these two benefits **in addition to** full Income Support entitlements.
- Income Support itself remains residual and income-tested. CPP Disability benefits are generally included in the assessment of available resources (with some children’s benefits exempt).
- Recent structural changes (2025) simplified the benefit structure so that each eligible adult receives the same individual amount regardless of living arrangements.

**Documentation strength:** Explicit policy manual language and government news releases.

### New Brunswick — Social Assistance / Disability Supports

**Key official statements:**
- Applicants and clients must apply for all available resources, including Canada Pension Plan benefits.
- Canada Disability Benefit is explicitly **exempt** when calculating eligibility and monthly benefit amounts for social assistance, the Disability Support Program, Family Supports for Children with Disabilities, and Long Term Care.
- CPP/QPP income has a partial exemption: the first $200 of combined CPP/QPP income (excluding certain child benefits) is exempt for clients (not applicants). Child disability and orphan benefits under CPP/QPP are fully exempt.
- All other income is normally calculated at gross amount (with limited netting for the first month of certain deductions).

**Documentation strength:** Explicit in Department of Social Development policy and official announcements.

### Manitoba — Manitoba Supports for Persons with Disabilities (MSPD) / EIA

**Key features:**
- Manitoba Supports for Persons with Disabilities is a separate program from Employment and Income Assistance (EIA) for people with severe and prolonged disabilities.
- Shelter benefits (Rent Assist) are indexed to a percentage of median market rent (currently 77 %).
- Basic needs amounts for eligible adults in MSPD are adjusted (July cycle referenced in circulars).
- Standard residual income-testing applies. Certain earnings are partially exempt; ongoing cash contributions from family/friends up to $500/month are exempt.
- CPP Disability is treated as income that affects benefits (standard residual treatment).

**Documentation strength:** Program descriptions, Disability Support Act framework, and EIA circulars.

### Updated Cross-Provincial CDB Pattern (confirmed)

| Jurisdiction              | Treatment of Canada Disability Benefit          |
|---------------------------|-------------------------------------------------|
| Alberta                   | Non-exempt (dollar-for-dollar clawback)         |
| All other provinces + territories that have spoken | Exempt                                          |

Newfoundland & Labrador, New Brunswick, and Manitoba join the “exempt” column with explicit statements.

---

*Additional provincial extractions recorded. Atlantic and Manitoba coverage now substantially strengthened.*

---

## Phase 3 — Cross-Layer Link Tightening (Soft ↔ Financing)

**Date:** 2026-07-30  
**Action:** Confirmed and documented the shared organisation nodes between soft-power-and-isolated-orgs.json and financing-international-orgs.json.

### Changes made

Both files received an explicit `_cross_layer_links` object:

- companion_file reference
- linked_org_nodes: ["org-imf", "org-oecd", "org-wef"]
- clarifying note that financing edges point to the soft-layer organisation identifiers and that no soft edge is promoted into the main documented graph

Status fields in both files updated to record the confirmation date.

World Bank Group remains a financing-only placeholder (`org-wbg-approx`). No corresponding soft-power organisation node was created; this is intentional and recorded in both `_next_possible_additions` lists.

### Design integrity preserved

- Soft edges stay interpretive / ritual / mutual-consideration only.
- Financing edges answer “who pays?” and remain higher-confidence.
- Neither layer feeds main-graph authority rankings (PageRank-style scores on statistical reports or statutory formulas).
- Isolated / sparse nodes continue to be allowed.

### Next open items (unchanged priority)

1. Canadian-specific Article IV Consultation and OECD Economic Survey nodes (titles + dates).
2. Ontario / Quebec municipal data sets used for seniors, disability, homelessness, legal aid.
3. Exact year-by-year IDA and OECD figures from the full International Assistance statistical annexes (if higher precision required).
4. Optional UN assessed contributions or FSB / UNCTAD nodes.

*Cross-layer tightening complete. No main-graph edges altered.*

---

## Phase 4 — Canada-Specific Surveillance Nodes (Item 1 of open threads)

**Date:** 2026-07-30  
**Action:** Added Canada-specific instances of IMF Article IV and OECD Economic Survey to the soft-power layer.

### New nodes

**imf-article-iv-canada-2025**  
Title: Canada: 2025 Article IV Consultation—Press Release and Staff Report  
Publisher: IMF  
Cadence note: Board consideration 16 January 2026; published 21 January 2026  
Type: surveillance  
Parent: org-imf  
Notes: IMF Country Report No. 26/12 (2026/012). Staff report completed 18 December 2025 after discussions ending 4 December 2025. Soft-layer Canada-specific instance.

**oecd-economic-survey-canada-2025**  
Title: OECD Economic Surveys: Canada 2025  
Publisher: OECD  
Cadence note: This edition May 2025; Volume 2025/12  
Type: surveillance  
Parent: org-oecd  
Notes: DOI https://doi.org/10.1787/28f9e02c-en. Draft discussed by Economic and Development Review Committee 21 January 2025; data cut-off 16 May 2025.

### Edges added

- org-imf → imf-article-iv-canada-2025 (publishes, documented)
- org-oecd → oecd-economic-survey-canada-2025 (publishes, documented)

These remain strictly in the soft / interpretive layer. No promotion to the main documented statistical graph. Titles and dates confirmed from official IMF and OECD publication pages and the Country Report itself.

*Item 1 (Canada-specific Article IV / OECD Survey nodes) complete.*

---

## Phase 5 — UN Assessed Contribution (Item 4)

**Date:** 2026-07-30  
**Action:** Added Canada’s assessed contribution to the United Nations regular budget to the financing layer.

### New node

**fin-un-regular-budget**  
Title: Canada assessed contribution to the United Nations regular budget  
Type: assessed_contribution  
Amount note: Scale of assessment 2.543 % for 2025–2027 (A/RES/79/249). Recent annual net contribution approximately USD 86–87 million (2025). Working Capital Fund advance for 2026: USD 6,357,500 (ST/ADM/SER.B/1096).  
Source: GA resolution 79/249; ST/ADM/SER.B/1096; UN Committee on Contributions.

### Edges

- canada-federal-budget-or-estimates → fin-un-regular-budget (funds, documented)
- fin-un-regular-budget → org-un-approx (supports_membership, documented)

Placeholder org-un-approx added. Confidence ranking updated to place UN assessed contribution in the highest tier alongside IMF quota, OECD assessed and IDA. No soft-power organisation node created yet (isolated / sparse nodes remain intentional).

*Item 4 (UN assessed) complete. Proceeding next to Item 3 (year-by-year IDA / OECD figures).*

---

## Phase 6 — Year-by-Year Figures for IDA and OECD (Item 3)

**Date:** 2026-07-30  
**Action:** Updated amount notes on existing financing nodes with official multi-year figures.

### IDA (fin-wbg-ida)

- 2022–23: CAD 911.44 million  
- 2023–24: CAD 486.92 million  
- 2024–25: CAD 486.92 million  
(Source: Statistical Report on International Assistance 2024–2025, Department of Finance Canada multilateral programming tables)  
- IDA21 pledge: C$1.6 billion announced.

### OECD assessed (fin-oecd-assessed)

- Public Accounts of Canada 2025 (Global Affairs transfer payments): Organisation for Economic Cooperation and Development (12,580,328 Euro) — allotment CAD 18,330,168; expenditures CAD 17,804,695.  
- Prior periods consistently in the CAD 17–19 million range.

Sources are the official Statistical Report and Public Accounts tables. No new nodes required; existing nodes now carry the year-specific detail requested. Confidence remains in the highest tier for both.

*Item 3 complete. Next: Item 2 (Ontario / Quebec municipal data sets).*

---

## Phase 7 — Municipal Layer Draft Slice (Item 2)

**Date:** 2026-07-30  
**Action:** Compact draft JSON produced for Ontario and Quebec municipal funding formulas.

File: `municipal-ontario-quebec-slice.json`

### Nodes
- on-ompf (existing id reused)
- mpac-assessment (existing)
- qc-perequation (new)
- isq-vitalite-economique (new — Institut de la statistique du Québec economic vitality index)

### Dependencies (all backed by Part A quotes)
1. on-ompf → mpac-assessment (uses_data_from) — OMPF Appendix F Weighted Assessment, Households, Farm Land Area
2. on-ompf → statcan-census-population (uses_data_from) — multiple 2021 Statistics Canada series listed in Appendix F
3. qc-perequation → (assessment roll / decree population) — F-2.1 r. 11 ss. 8–9, 15
4. qc-perequation → isq-vitalite-economique (uses_data_from) — M-22.1 r. 1.2 s. 3(2°)

Part B is strictly limited to material already quoted in Part A. No soft or financing edges. Ready for adjudication / merge.

*Item 2 first-pass complete.*

---

## Phase 8 — Ontario Homelessness Prevention Program & Legal Aid Ontario refinements

**Date:** 2026-07-30

### Homelessness Prevention Program (HPP)

**Entry 18**  
URL: https://www.auditor.on.ca/en/content/annualreports/arreports/en23/1-07FU_homelessness_en23.pdf  
LOCATION: Recommendation 2 follow-up  
QUOTE: “Changes included replacing the outdated historical spending with measures of homelessness and supportive housing from Ontario Works and Ontario Disability Support Program caseload data, measures of supportive housing units using a survey administered to municipalities, and updated Statistics Canada data. \ldots The updated funding model used four socioeconomic indicators (deep core housing need, low-income measure, Indigenous population, youth population), which accounted for half of the allocation calculation. \ldots use the latest census data from Statistics Canada to recalculate the current funding allocation under the Community Homelessness Prevention Initiative.”  
NAMES:  
- Ontario Works caseload data  
- Ontario Disability Support Program caseload data  
- Statistics Canada (Census / deep core housing need / low-income measure / Indigenous population / youth population)  
TENSE: PRESENT (model implemented 2023/24 onward)  
NOTES: Confirms the post-2023 HPP allocation formula explicitly consumes Statistics Canada socioeconomic indicators and residual provincial benefit caseloads. Complements the earlier OMPF low-income and housing-need edges.

### Legal Aid Ontario financial eligibility

**Entry 19**  
URL: https://www.legalaid.on.ca/wp-content/uploads/2023-24-Annual-Report_EN.pdf (and subsequent 2024-25 report)  
LOCATION: Clients at a glance / financial eligibility discussion  
QUOTE: “LAO’s current financial eligibility thresholds are aligned with the 2011 Low Income Measure (LIM). \ldots The Low Income Measure threshold developed by Statistics Canada is defined as households with an annual income that is less than 50% of the average income of Canadian households.”  
NAMES:  
- Statistics Canada Low Income Measure (LIM)  
TENSE: PRESENT (historical alignment still referenced; thresholds later expanded in 2025 but the LIM reference remains the documented baseline)  
NOTES: Documents that LAO’s FET was constructed by reference to the Statistics Canada LIM. Later 2025 expansions raised absolute dollar thresholds but did not replace the LIM conceptual anchor in the published reports.

These two entries extend the municipal/social-support data-source chain. Ready for incorporation into the draft municipal JSON if desired.

---

## Phase 9 — Statutory / regulatory references for HPP and Legal Aid formulas

**Date:** 2026-07-30

### Homelessness Prevention Program
The allocation methodology is not set out in a regulation that itself names the statistical inputs.  
Governing framework: *Housing Services Act, 2011* and O. Reg. 367/11 (General).  
Operational detail (including the post-2023 data-driven allocation model) lives in the HPP Program Guidelines and Transfer Payment Agreements issued by the Ministry of Municipal Affairs and Housing.  
The only public document that explicitly records the data sources used in the model remains the Auditor General of Ontario follow-up report (already quoted in Entry 18).  
**Finding:** The edge to Statistics Canada / OW / ODSP is documented, but the documentation is secondary (Auditor General) rather than primary statutory text. Recorded as such.

### Legal Aid Ontario
Primary instrument: *Legal Aid Services Act, 2020* and the Legal Aid Services Rules made under it.  
Financial eligibility tables are set in section 12 of the Rules (amended by Rule 2025/1, made 24 January 2025, published 28 January 2025).  
The Rules themselves prescribe the dollar thresholds; they do not contain the phrase “Low Income Measure” or “Statistics Canada”.  
The documented conceptual alignment with the Statistics Canada LIM appears only in Legal Aid Ontario’s own annual reports (Entry 19).  
**Finding:** The methodology_depends_on edge to the LIM is supported by LAO’s published statement, not by the text of the Rules.

These distinctions are now noted so that adjudication can weigh the evidence class correctly (primary statute vs. program guidelines / annual report).

---

## Phase 11 — Housing Portable Benefits Main-Graph Slice + Consolidation

**Date:** 2026-07-31  

**Action:** Created dedicated main-documented layer slice consolidating all provincial residual / portable housing benefit extractions performed in this session.

**File:** `housing-portable-benefits-slice.json`

### Contents
- 10 report nodes (CMHC Rental Market Survey + 9 provincial programs)
- 8 dependencies, all backed by prior Part A quotes
- Explicit edges only where statute or official program text names CMHC AMR/MMR or a residual income percentage
- Alberta RAB note records the October 2025 inclusion of AISH in the 30% residual (links back to earlier disability work)
- Quebec 25% residual and Manitoba MMR vs Ontario AMR distinction preserved

### Status of highest-value moves
1. Housing material incorporated into clean main-graph JSON — **done**.
2. Remaining Research.1 priority gaps (classification hubs, further Alberta flows) — still open; ready for next focused extraction if requested.
3. International layer tightening — deferred (housing consolidation took priority).

The municipal-ontario-quebec-slice.json remains as the earlier municipal funding focused file; the new housing slice is the proper home for the residual rent / portable benefit material.

*Ready for adjudication or further expansion.*

---

## Phase 12 — Classification Hubs Slice Complete

**Date:** 2026-07-31  

**Action:** All four remaining Research.1 classification-hub starters extracted and consolidated.

**File:** `classification-hubs-slice.json`

### Nodes & Edges
- Business Register → NAICS
- Annual Survey of Service Industries → NAICS
- Quarterly Survey of Financial Statements → NAICS
- Canadian International Merchandise Trade → Harmonized System (HS)
- Discharge Abstract Database (CIHI) → ICD-10-CA / CCI
- Labour Force Survey → NOC 2021 (and NAICS 2022)

All edges follow the standing brief’s instruction: programmes name the classifications; the classification documents themselves were not used as the source of the edge.

Research.1 classification-hub priority for the named starter programmes is now complete.

---

## Phase 13 — Equalization Named-Product Leads Closed

**Date:** 2026-07-31  

**Action:** Closed the highest-value named-product leads from SOR/2007-303 (Equalization and Territorial Formula Financing).

**File:** `equalization-named-products-closed.json`

### Nodes created
1. Provincial and Territorial Economic Accounts (Record 1902)
2. Provincial Supply and Use Tables (Record 1401 / Table 36-10-0478-01)
3. Canadian Government Finance Statistics (Record 5218)
4. Annual Oil and Gas Extraction Survey (Record 2178)
5. Sales of fuel used for road motor vehicles (Table 23-10-0066-01)
6. Value of sales of alcoholic beverages (Table 10-10-0011-01)
7. Balance sheet of the agricultural sector (Table 32-10-0056-01)
8. Vehicle Registrations (legacy CANSIM 405-0004 / Survey 2747)
9. R.L. Polk & Co. Canadian and International Registration Manual (commercial source)

### Edges
Nine statutory `uses_data_from` edges, each citing the exact section of SOR/2007-303 and marked with DIVISION 1 / DIVISION 2 / TFF / general scope.

### Key observations
- DIVISION 1 definitions (all ten provinces) give the cleanest, highest-authority edges (Provincial and Territorial Economic Accounts + Provincial Supply and Use Tables).
- DIVISION 2 (Nova Scotia) retains several CANSIM-era table numbers; modern successors were matched but the succession itself is not treated as a new statutory edge.
- R.L. Polk is the third commercial source found inside a Canadian federal funding formula (after J.D. Power and ICE Brent).
- The Oil and Gas Extraction Survey edge strengthens the existing Alberta energy-royalty cluster.

Equalization / TFF named-product priority is now closed. Ready to move to municipal template replication (Calgary or Edmonton).

---

## Phase 14 — Calgary Municipal Template Replication

**Date:** 2026-07-31  

**Action:** Replicated the Grande Prairie municipal template on the City of Calgary.

**File:** `calgary-municipal-template.json`

### Nodes created
1. Property Tax Bylaw 9M2026 (keystone)
2. Property Assessment Roll ($457 billion 2026 total)
3. Service Plans and Budgets (2023-2026 cycle + 2026 adjustments)
4. Consolidated Audited Financial Statements (2025 Annual Financial Report)
5. Municipal Census / Official Population Estimate
6. Designated Industrial Property Requisition (shared provincial node)

### Edges
Five clean edges, all grounded in the Municipal Government Act s. 353 structure and the explicit content of Bylaw 9M2026 and the budget/financial documents.

### Observation
The six-document pattern is identical to Grande Prairie. Establishing the second large-city instance proves the template is portable across Alberta municipalities. The open-data assessment roll on data.calgary.ca adds a machine-readable edge not present at the same scale in the Grande Prairie instance.

Equalization named-product closure + Calgary municipal template are both complete. Next highest-value work would be either Edmonton replication (for a third Alberta city) or the remaining IBSP / manufacturing surveys that feed the Supply and Use Tables.

---

## Phase 15 — Multi-City Municipal Capitals Template

**Date:** 2026-07-31  

**Action:** Replicated the municipal template across all requested cities plus the remaining true provincial/territorial capitals.

**File:** `municipal-capitals-template.json`

### Coverage
Fully anchored with 2026 documents:
- Edmonton (Bylaw 21442)
- Calgary (already complete)
- Vancouver (2026 rates + Vancouver Charter)
- Regina (Bylaw 2026-25 + Education Bylaw)
- Winnipeg (2026 mill rates + portioning)
- Toronto (Bylaw law0133 + MPAC)
- Montreal (taxes municipales + rôle d’évaluation)

Template-ready (same statutory pattern confirmed):
- Victoria (true BC capital)
- Quebec City (true QC capital)
- Halifax
- Charlottetown
- St. John’s
- Fredericton
- Whitehorse, Yellowknife, Iqaluit

### Key structural observation
Assessment is frequently produced by a provincial agency (BC Assessment, MPAC, PVSC, Service New Brunswick, Municipal Assessment Agency NL) rather than the municipality. This creates a clean, recurring cross-layer bridge from municipal tax bylaws up to provincial assessment bodies — exactly the kind of high-value edge the graph is built to capture.

The six-document municipal pattern is now proven portable across every Canadian province.

---

## Phase 16 — Missing Capital Cities Expanded

**Date:** 2026-07-31  

**Action:** Expanded all remaining true provincial and territorial capitals into the municipal template.

**File:** `municipal-capitals-template.json` (updated)

### Newly fully documented 2026 keystone instruments
- **Victoria** — Bylaw No. 26-030 (Community Charter s. 197)
- **Quebec City** — R.V.Q. 3492 (four rate classes)
- **Fredericton** — Inside rate held at $1.3086 / $100 (Local Governance Act)
- **Halifax** — 2026/27 rates (Urban $0.687 etc.) + full budget document
- **Charlottetown** — 2026-27 budget, tax rate held unchanged
- **St. John's** — 2026 mill rates (residential 9.1 / commercial 29.5)

### Territorial capitals
Whitehorse, Yellowknife, Iqaluit marked template-ready under their respective territorial municipal statutes.

### Coverage now complete
All 10 provincial capitals + 3 territorial capitals + the two large non-capitals requested (Vancouver, Montreal) are present. Assessment-agency bridges (BC Assessment, MPAC, PVSC, Service NB, MAA-NL) are recorded as shared provincial nodes.

---

## Phase 17 — Alberta Expansion + Oddballs (first wave)

**Date:** 2026-07-31  

**Action:** Began full Alberta municipal expansion and deliberate fringe/oddball communities.

**File:** `alberta-municipal-expansion-and-oddballs.json`

### Extracted
- **Regional Municipality of Wood Buffalo** (Fort McMurray) — energy keystone
- **Lethbridge** — Bylaw 6516 (2026)
- **Red Deer** — 2026 Tax Rate Bylaw
- **Medicine Hat** — Bylaw 4878-2026 (utility-owning city)
- **Lloydminster** — border city under Lloydminster Charter (classic oddball)
- **Banff** — national-park town under federal lease (classic oddball)

### Still queued
Canmore, Crowsnest Pass, Special Areas, Peace River / High Level, Cold Lake, plus the non-Alberta list (Saskatoon, Ottawa, Surrey, Hamilton, etc.).

The pattern continues to hold: every Alberta municipality produces an annual MGA s. 353 tax-rate bylaw that names its assessment base and the provincial requisitions it collects.

---

## Phase 18 — Jasper + Alberta Fringe + First Non-Alberta Wave

**Date:** 2026-07-31  

**Action:** Added Jasper (so Banff/Jasper can be compared), Canmore, Crowsnest Pass, Saskatoon, and Ottawa.

**File:** `alberta-municipal-expansion-and-oddballs.json` (updated)

### New nodes
- **Jasper** — Bylaw #280 (2026). Wildfire assessment loss ~$2.25 M. Direct national-park comparison partner for Banff.
- **Canmore** — Bylaw 2026-08. Distinct Primary Residential vs Tourist Home rates + Livability Tax Program.
- **Crowsnest Pass** — Specialized municipality, 0.26% municipal increase.
- **Saskatoon** — Bylaw 10174 (2026). Completes the Saskatchewan pair.
- **Ottawa** — 2026 Budget / tax structure under MPAC + urban/rural/transit differentials. National-capital bridge.

### Still queued
Special Areas (true fringe), northern Alberta towns, Surrey, Hamilton, Mississauga, Kelowna, Laval, and further oddballs.

Banff ↔ Jasper national-park comparison is now possible.

---

## Phase 19 — Continued Grinding (Special Areas + Surrey + Hamilton + Kelowna + Laval)

**Date:** 2026-07-31  

**Action:** Added five more municipalities, including the purest fringe case in the corpus.

**File:** `alberta-municipal-expansion-and-oddballs.json` (now 16 cities)

### New nodes
- **Special Areas Board (Alberta)** — true fringe: no municipal council, provincial board administration, yet $12.85 M education property tax requisition in 2026.
- **Surrey** — 2026 full multi-authority rate schedule (BC’s second city).
- **Hamilton** — By-law 26-065 tax ratios + complex urban/rural fire & transit area rates (MPAC).
- **Kelowna** — 2026 Budget (4.40% increase); Interior BC test of BC Assessment pattern.
- **Laval** — 2026 residual residential rate 0.4973 (phased triennial roll); large Québec city.

### Still lightly queued
Northern Alberta towns (Peace River / High Level / Cold Lake) and a few more if desired.

The municipal template now covers a very wide structural range: energy specialized, national-park towns, border city, pure provincial-board fringe, large second cities, industrial Ontario, and multiple Québec municipalities under the rôle d’évaluation.

---

## Phase 20 — Final Pass + Hand-off Preparation

**Date:** 2026-07-31  

**Action:** Last extractions (Cold Lake, Peace River, Mississauga) and preparation of clean file inventory for the next agent / Claude.

**Final city count in expansion file:** 19

### All research files in `/home/workdir/artifacts/grok-research/`

| File | Purpose |
|------|---------|
| `Grok-Research-Session-1-2026-07-30.md` | Full research diary (Phases 1–20) |
| `V0.9.md` | Previous session hand-off |
| `equalization-named-products-closed.json` | Closed Equalization / TFF named-product leads |
| `calgary-municipal-template.json` | Calgary six-document municipal template |
| `municipal-capitals-template.json` | All provincial + territorial capitals + Vancouver/Montreal |
| `alberta-municipal-expansion-and-oddballs.json` | 19 Alberta + selected non-Alberta + fringe/oddball municipalities |
| `municipal-ontario-quebec-slice.json` | Earlier Ontario/Quebec municipal + housing |
| `housing-portable-benefits-slice.json` | Portable housing benefits / CMHC AMR-MMR |
| `classification-hubs-slice.json` | NAICS / HS / ICD-10-CA / NOC classification hubs |
| `financing-international-orgs.json` | Financing layer for major international organisations |
| `soft-power-and-isolated-orgs.json` | Soft-power / isolated-org layer |

**Standing rules still in force**
- Research.1.md is immutable
- Three clean layers (main graph / financing / soft)
- Soft edges never feed main-graph authority rankings
- Verbatim quotes only; AGENCY ONLY / NOT FOUND allowed
- Isolated nodes preferred over forced edges

This conversation is ready for clean hand-off.
