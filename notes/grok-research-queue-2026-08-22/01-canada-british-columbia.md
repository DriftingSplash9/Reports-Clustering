# Prompt for Grok — Canada: British Columbia (new — zero nodes today)

**Attach:** `alberta-provincial.json`, `alberta-municipal.json`, `federal-canada.json`, `equalization-named-products.json` (all under `src/data/research/`) — these carry the existing Alberta/federal pattern this new research should follow, plus the federal transfer-program nodes (equalization, territorial formula financing, health/social transfers) new provincial/municipal nodes will likely connect to.

Paste everything below the line.

---

British Columbia currently has **zero nodes** in our graph — Canada's third-largest province and it's not represented at all. This is a from-scratch research pass, using Alberta's existing coverage as the shape to follow.

**The template that's worked so far** (Alberta + Grande Prairie, Calgary): a province gets its own budget/fiscal-plan/economic-outlook nodes, a property-assessment and equalized-assessment framework, and a municipal financial-information-return system feeding a provincial compilation; a municipality gets its own assessment roll, budget, audited financial statements, tax-rate bylaw, and (where it exists) a municipal census. Follow that shape where the real thing exists — don't force a fit where the jurisdiction organizes things differently.

BC-specific things to look for: BC Assessment (the province-wide property assessment authority, distinct from Alberta's municipal-level model — BC assesses everything provincially, which is a genuinely different structure worth describing accurately rather than forcing Alberta's shape onto it), the BC budget/fiscal-plan documents from the Ministry of Finance, BC Housing / the BC rent-bank or rental-assistance program (parallel to Ontario's portable housing benefit and Nova Scotia's targeted housing benefit already in the corpus), and the Vancouver and Victoria municipal layer (property tax bylaw, annual financial report, budget).

**Priority order:** (1) BC Assessment's own methodology and its province-wide role — this is the single most important BC-specific institution to get right; (2) the BC provincial budget/fiscal-plan documents; (3) Metro Vancouver / City of Vancouver's budget, financial statements, property tax bylaw; (4) City of Victoria if a clean parallel exists. Real dependency edges: does BC Assessment's output feed municipal tax-rate setting the way Alberta's equalized-assessment report does? Does a BC housing-benefit program set its rate relative to CMHC's Rental Market Survey the way Ontario's and Nova Scotia's do?

**Existing ids you may target from Ottawa/StatCan/federal Canada (do not re-propose these):**

`fiscal-equalization-program`, `territorial-formula-financing`, `canada-health-transfer`, `canada-social-transfer`, `statcan-cpi`, `statcan-national-accounts`, `statcan-provincial-economic-accounts`, `statcan-government-finance-statistics`, `statcan-census-population`, `statcan-population-estimates`, `cmhc-rental-market-survey`, `cmhc-mortgage-loan-insurance`, `psab-psas` (Public Sector Accounting Standards), `statcan-business-register`.

**Relationship types — closed set of exactly four values:**

- `methodology_depends_on` — an international/national standard or framework governs how the report is compiled (PSAS, an SNA edition, a named provincial regulation setting the methodology for an index).
- `uses_data_from` — the target's figures are a direct input to the source (e.g. a municipal FIR feeds a provincial financial/statistical compilation; a rent-benefit program's rates are set relative to CMHC's Rental Market Survey).
- `calculated_from` — the source is mechanically derived from the target (e.g. an equalization/transfer amount calculated from a province's fiscal capacity data).
- `cites` — referenced as context (a municipal budget citing the province's fiscal framework as its funding basis).

No other values are legal.

**Honesty permission: an explicit "found nothing solid for X" is a correct and useful answer.** Primary documents only — the government's own budget/financial-statement/regulation pages, not aggregator or news-summary sites. One quote per edge that names the specific jurisdiction and states the specific claim being made.

## How to reply

One JSON object: `proposed_reports` array for every new report node you find — `{ proposed_id, title, publisher, region, jurisdiction_level (federal/provincial/municipal/institutional), url, description, publication_cadence }` — plus a `dependencies` array for edges you can support with a primary source, `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }`. Note explicitly which of these BC institutions you found primary documents for and which you could not (e.g. if Vancouver publishes an FIR-equivalent under a different name, tell us the actual name rather than forcing our FIR label onto it). We raw-verify every quote before anything is minted, same as always.
