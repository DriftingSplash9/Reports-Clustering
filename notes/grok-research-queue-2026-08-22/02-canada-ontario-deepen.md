# Prompt for Grok — Canada: Ontario — deepen (currently just 6 thin nodes for Canada's largest economy)

**Attach:** `ontario-ompf-mpac.json`, `alberta-provincial.json`, `federal-canada.json` (all under `src/data/research/`) — these carry the existing Alberta/federal pattern this new research should follow, plus the federal transfer-program nodes (equalization, territorial formula financing, health/social transfers) new provincial/municipal nodes will likely connect to.

Paste everything below the line.

---

Ontario has only 6 nodes — MPAC's assessment system, the Ontario Municipal Partnership Fund, a portable housing benefit, a homelessness-prevention program, and two municipal-finance/tax tools (FIR, OPTA). For Canada's largest province and economy, that's thin. No Toronto- or Ottawa-specific node exists at all.

**The template that's worked so far** (Alberta + Grande Prairie, Calgary): a province gets its own budget/fiscal-plan/economic-outlook nodes, a property-assessment and equalized-assessment framework, and a municipal financial-information-return system feeding a provincial compilation; a municipality gets its own assessment roll, budget, audited financial statements, tax-rate bylaw, and (where it exists) a municipal census. Follow that shape where the real thing exists — don't force a fit where the jurisdiction organizes things differently.

Ontario already has the province-wide assessment authority (MPAC) and the provincial equalization-style transfer (OMPF) — the analogue of Alberta's equalized-assessment + LGFF pair already exists, just not deepened. What's missing: the Ontario provincial budget/fiscal-plan documents themselves (Ministry of Finance), and any municipal layer at all — City of Toronto and City of Ottawa budgets, audited financial statements, and property tax bylaws.

**Priority order:** (1) Ontario's own budget/fiscal-plan/economic-outlook documents (the provincial-level node this file is missing entirely); (2) City of Toronto's budget, financial statements, tax rate bylaw — Canada's largest city has no municipal node at all right now; (3) City of Ottawa, same set, as the federal capital. Real dependency edges: does Toronto's or Ottawa's FIR feed into `on-municipal-fir` the way it's structured provincially? Does MPAC's assessment output feed municipal tax-rate bylaws the way Alberta's equalized assessment does?

**Existing ids you may target from Ottawa/StatCan/federal Canada (do not re-propose these):**

`fiscal-equalization-program`, `territorial-formula-financing`, `canada-health-transfer`, `canada-social-transfer`, `statcan-cpi`, `statcan-national-accounts`, `statcan-provincial-economic-accounts`, `statcan-government-finance-statistics`, `statcan-census-population`, `statcan-population-estimates`, `cmhc-rental-market-survey`, `cmhc-mortgage-loan-insurance`, `psab-psas` (Public Sector Accounting Standards), `statcan-business-register`. Also: `mpac-assessment`, `on-municipal-fir`, `on-ompf`, `on-opta`, `on-portable-housing-benefit`, `on-hpp`.

**Relationship types — closed set of exactly four values:**

- `methodology_depends_on` — an international/national standard or framework governs how the report is compiled (PSAS, an SNA edition, a named provincial regulation setting the methodology for an index).
- `uses_data_from` — the target's figures are a direct input to the source (e.g. a municipal FIR feeds a provincial financial/statistical compilation; a rent-benefit program's rates are set relative to CMHC's Rental Market Survey).
- `calculated_from` — the source is mechanically derived from the target (e.g. an equalization/transfer amount calculated from a province's fiscal capacity data).
- `cites` — referenced as context (a municipal budget citing the province's fiscal framework as its funding basis).

No other values are legal.

**Honesty permission: an explicit "found nothing solid for X" is a correct and useful answer.** Primary documents only — the government's own budget/financial-statement/regulation pages, not aggregator or news-summary sites. One quote per edge that names the specific jurisdiction and states the specific claim being made.

## How to reply

One JSON object: `proposed_reports` array for every new report node you find — `{ proposed_id, title, publisher, region, jurisdiction_level (federal/provincial/municipal/institutional), url, description, publication_cadence }` — plus a `dependencies` array for edges you can support with a primary source, `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }`. Tell us plainly if Toronto or Ottawa publish these documents under names that don't map cleanly to the FIR/assessment-roll/tax-bylaw template — Ontario's municipal-finance vocabulary sometimes differs from Alberta's and we'd rather have the real name than a forced label. We raw-verify every quote before anything is minted, same as always.
