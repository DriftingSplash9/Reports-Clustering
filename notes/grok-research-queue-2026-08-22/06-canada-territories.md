# Prompt for Grok — Canada: Yukon, Northwest Territories, Nunavut (all new)

**Attach:** `federal-canada.json`, `equalization-named-products.json` (all under `src/data/research/`) — these carry the existing Alberta/federal pattern this new research should follow, plus the federal transfer-program nodes (equalization, territorial formula financing, health/social transfers) new provincial/municipal nodes will likely connect to.

Paste everything below the line.

---

All three territories have **zero** nodes. Unlike the provinces, territorial funding runs overwhelmingly through Territorial Formula Financing (`territorial-formula-financing`, already in our corpus) rather than provincial-style own-source revenue — so this is likely to produce fewer, more concentrated edges rather than a wide node count, and that's fine.

**The template that's worked so far** (Alberta + Grande Prairie, Calgary): a province gets its own budget/fiscal-plan/economic-outlook nodes, a property-assessment and equalized-assessment framework, and a municipal financial-information-return system feeding a provincial compilation; a municipality gets its own assessment roll, budget, audited financial statements, tax-rate bylaw, and (where it exists) a municipal census. Follow that shape where the real thing exists — don't force a fit where the jurisdiction organizes things differently.

Don't force the province/municipality template here — territorial government finance genuinely works differently (much higher federal transfer dependency, much smaller population/tax bases, and in Nunavut's case a very recent and still-developing statistical apparatus).

**Priority order:** (1) each territory's own budget/main-estimates documents (Yukon's Department of Finance, NWT's Department of Finance, Nunavut's Department of Finance); (2) whether each territory's budget document explicitly states its Territorial Formula Financing entitlement as a share of total revenue — this is likely the single most findable, well-documented dependency edge available for any of the three; (3) Statistics Bureau of each territory if one publishes population/economic statistics distinct from StatCan's own territorial estimates.

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

One JSON object: `proposed_reports` array for every new report node you find — `{ proposed_id, title, publisher, region, jurisdiction_level (federal/provincial/municipal/institutional), url, description, publication_cadence }` — plus a `dependencies` array for edges you can support with a primary source, `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }`. An honest "found the budget documents but the Territorial Formula Financing dependency isn't stated as cleanly as hoped" is a fine outcome — territorial fiscal documents vary a lot in how explicitly they break this out. We raw-verify every quote before anything is minted, same as always.
