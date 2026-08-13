# Calgary slice — merge report (2026-08-07)

Source: `research-input/grok-research-handoff-2026-07-31/grok-research/calgary-municipal-template.json` (6 reports, 5 deps).
Output: `merge-work/calgary.slice.json` (5 reports, 8 deps, 3 substantive dropped notes).

## Documents actually fetched

| Document | URL | Method |
|---|---|---|
| Bylaw 9M2026 full text | https://municipalaffairs.gov.ab.ca/cfml/FinancialTaxRateSearch/pdf/tr_bylaws/2026_Bylaw_CALGARY_0046.pdf | curl, pdftotext (Municipal Affairs tax-rate-bylaw archive — the same host pattern works for any Alberta municipality/year, useful for the other ~330 replications) |
| Council report C2026-0172 "2026 Property Tax Bylaws" | https://pub-calgary.escribemeetings.com/filestream.ashx?DocumentId=354907 | curl (WebFetch gets 403 from this host; curl succeeds) |
| 2025 Annual Financial Report | https://www.calgary.ca/content/dam/www/cfod/finance/documents/2025-Annual-Financial-Report.pdf | curl, full-text search |
| 2026 Budget (as approved Dec 3 2025) | https://www.calgary.ca/.../2026-budget-as-approved-dec-3-2025.pdf | curl, full-text search |

## Per-edge verdicts

| # | Original claim | Verdict |
|---|---|---|
| 1 | tax-rate-bylaw -> assessment-roll (calculated_from) | **VERIFIED.** Bylaw 9M2026: "impose the following rates of taxation on the assessed value of all taxable property as shown on the 2026 assessment roll of the City", with the roll tabulated by class in the recitals ($450.8B total). |
| 2 | tax-rate-bylaw -> budget (calculated_from) | **VERIFIED.** Bylaw recital: "the excess of the estimated expenses for municipal purposes, over the estimated probable revenue ... for the year 2026 will be: $2,520,865,034"; council report C2026-0172: "The funding of $2,520.9 million generated through the Property Tax Bylaw will meet the 2026 operating budget requirements contained in the approved 2026 Budget Adjustments to the 2023-2026 Business Plans and Budgets (C2025-0901)." |
| 3 | tax-rate-bylaw -> ab-dip-requisition (uses_data_from) | **VERIFIED + REMAPPED** to the existing live node `ab-dip-requisition` (handoff re-minted it; duplicate report not emitted). Bylaw s. 5: "the Municipal Assessor is hereby authorized to impose the tax rate set by the Minister in accordance with section 359.3 of the Act on the assessed value of all taxable designated industrial property shown on the 2026 assessment roll." |
| 4 | financial-statements -> tax-rate-bylaw (uses_data_from) | **DROPPED (no-document).** Full-text search of the 2025 AFR: the bylaw is never named; the statements cite MGA s. 353 for the provincial collection obligation but reference no bylaw. Same situation as Grande Prairie, where the twin edge was later promoted to `evidence: "implied"` in V0.7 — integrator's call whether to mirror; this pass follows the guide and drops. |
| 5 | budget -> municipal-census (uses_data_from) | **DROPPED (wrong-target) and REPLACED.** Calgary's civic census was discontinued (last run 2019); the handoff's census URL 404s. The budget's verbatim source is "Population from Calgary and Region Population Projections 2025-2030, January 2025 Update ... City of Calgary, Corporate Economics". New node `calgary-economic-outlook` minted (Corporate Economics, semi-annual, landing page verified 200) and the edge re-pointed there, VERIFIED. |

## Edges added beyond the handoff (all verbatim-documented, wiring into existing nodes per instructions)

| Edge | Evidence |
|---|---|
| tax-rate-bylaw -> ab-education-property-tax-requisition (uses_data_from) | Bylaw levies $1,235,731,200 "required to be raised for education purposes under the Education Act" for the "Alberta School Foundation Fund and The Board of Trustees of Calgary Roman Catholic Separate School Division". Mirrors the GP edge. |
| financial-statements -> budget (uses_data_from) | AFR Note 17: "Budget data presented in these consolidated financial statements are based upon the 2025 operating and capital budgets as approved by Council" plus full reconciliation table. Mirrors GP. |
| financial-statements -> psab-psas (methodology_depends_on) | AFR Note 1: "prepared by Administration in accordance with Canadian Public Sector Accounting Standards (PSAS)". Mirrors GP. |
| budget -> ab-tbf-fiscal-plan (cites) | Budget chart source: "Alberta Expenditure Growth: Government of Alberta Fiscal Plan (25-28) Schedule 25 Historical Fiscal Summary". |

Also recorded in `_dropped` (no-node-yet): budget cites "Statistics Canada 2024 population estimates for census subdivisions" — the live `statcan-population-estimates` node is scoped to the quarterly provincial series, so the subprovincial release has no node; not force-mapped.

## Report-level changes from the handoff

- `ab-dip-requisition` report dropped (duplicate of live node; its invalid domain `provincial-requisition` discarded with it).
- `calgary-municipal-census` report dropped (discontinued program, dead URL, no surviving edge).
- `calgary-economic-outlook` minted in its place.
- Nonschema fields `bylaw` and `open_data` removed; the open-data roll is mentioned in the assessment-roll description instead. Bylaw title generalized from "Property Tax Bylaw 9M2026" to the recurring title with the 2026 instance noted in the description (nodes are recurring documents, not one-off instances).
- All five kept report URLs verified resolving (200) on 2026-08-07.

## For the next session

- The Municipal Affairs bylaw archive URL pattern (`municipalaffairs.gov.ab.ca/cfml/FinancialTaxRateSearch/pdf/tr_bylaws/<year>_Bylaw_<NAME>_<code>.pdf`) serves every Alberta municipality's tax rate bylaw as filed — this makes the remaining ~330 replications largely mechanical. Calgary is code 0046; 2024/2025/2026 all resolve.
- Candidate symmetric edges not built (provincial side): `ab-municipalaffairs-equalized-assessment -> calgary-assessment-roll` and `ab-municipalaffairs-fir -> calgary-financial-statements`. The GP evidence documents (equalized assessment manual, alberta.ca FIR page) speak generically of every municipality, so these would verify with the same evidence URLs; left out because the handoff didn't propose them and per-slice scope discipline, but they are one-line additions if you want the provincial fan-in symmetric.
- The financial-statements -> tax-rate-bylaw implied question should be decided once for both cities.
