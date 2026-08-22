# Prompt for Grok — Canada: Saskatchewan (new), Manitoba (deepen from 1 node), plus Edmonton, Winnipeg, Regina/Saskatoon municipal

**Attach:** `alberta-provincial.json`, `alberta-municipal.json`, `grande-prairie.json`, `federal-canada.json` (all under `src/data/research/`) — these carry the existing Alberta/federal pattern this new research should follow, plus the federal transfer-program nodes (equalization, territorial formula financing, health/social transfers) new provincial/municipal nodes will likely connect to.

Paste everything below the line.

---

Saskatchewan has **zero** nodes. Manitoba has exactly one (a rent-benefit program). And — worth noting plainly — even Edmonton, Alberta's own capital, has no municipal node despite Alberta being our deepest province; only Calgary and Grande Prairie do. This prompt covers all of that gap at once: Saskatchewan from scratch, Manitoba deepened, and the three missing Prairie capitals' municipal layer (Edmonton, Winnipeg, Regina or Saskatoon).

**The template that's worked so far** (Alberta + Grande Prairie, Calgary): a province gets its own budget/fiscal-plan/economic-outlook nodes, a property-assessment and equalized-assessment framework, and a municipal financial-information-return system feeding a provincial compilation; a municipality gets its own assessment roll, budget, audited financial statements, tax-rate bylaw, and (where it exists) a municipal census. Follow that shape where the real thing exists — don't force a fit where the jurisdiction organizes things differently.

Follow the Alberta template (province: budget/fiscal-plan, property assessment framework, municipal financial-return system; municipality: assessment roll, budget, audited financial statements, tax-rate bylaw, municipal census where one exists) for Saskatchewan and Manitoba, adjusting for each province's own actual institutions rather than assuming they mirror Alberta's exactly.

**Priority order:** (1) Edmonton's budget, financial statements, tax rate bylaw — the most glaring single gap, since we have the whole Alberta provincial framework already and Edmonton is Alberta's capital and second-largest city; (2) Saskatchewan's provincial budget/fiscal-plan and its property-assessment authority (SAMA — Saskatchewan Assessment Management Agency); (3) Manitoba's provincial budget/fiscal-plan and its property assessment system; (4) Winnipeg and Regina or Saskatoon municipal budget/financial-statements/tax-bylaw.

**Existing ids you may target from Ottawa/StatCan/federal Canada (do not re-propose these):**

`fiscal-equalization-program`, `territorial-formula-financing`, `canada-health-transfer`, `canada-social-transfer`, `statcan-cpi`, `statcan-national-accounts`, `statcan-provincial-economic-accounts`, `statcan-government-finance-statistics`, `statcan-census-population`, `statcan-population-estimates`, `cmhc-rental-market-survey`, `cmhc-mortgage-loan-insurance`, `psab-psas` (Public Sector Accounting Standards), `statcan-business-register`. Also Alberta's municipal template: `calgary-budget`, `calgary-financial-statements`, `calgary-tax-rate-bylaw`, `calgary-assessment-roll`, `ab-municipalaffairs-fir`, `ab-municipalaffairs-equalized-assessment`, `mb-rent-assist`.

**Relationship types — closed set of exactly four values:**

- `methodology_depends_on` — an international/national standard or framework governs how the report is compiled (PSAS, an SNA edition, a named provincial regulation setting the methodology for an index).
- `uses_data_from` — the target's figures are a direct input to the source (e.g. a municipal FIR feeds a provincial financial/statistical compilation; a rent-benefit program's rates are set relative to CMHC's Rental Market Survey).
- `calculated_from` — the source is mechanically derived from the target (e.g. an equalization/transfer amount calculated from a province's fiscal capacity data).
- `cites` — referenced as context (a municipal budget citing the province's fiscal framework as its funding basis).

No other values are legal.

**Honesty permission: an explicit "found nothing solid for X" is a correct and useful answer.** Primary documents only — the government's own budget/financial-statement/regulation pages, not aggregator or news-summary sites. One quote per edge that names the specific jurisdiction and states the specific claim being made.

## How to reply

One JSON object: `proposed_reports` array for every new report node you find — `{ proposed_id, title, publisher, region, jurisdiction_level (federal/provincial/municipal/institutional), url, description, publication_cadence }` — plus a `dependencies` array for edges you can support with a primary source, `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }`. If Edmonton or a Prairie city's finance department bundles what Calgary reports separately (e.g. one combined annual report rather than four documents), say so rather than inventing four nodes to match the Alberta shape. We raw-verify every quote before anything is minted, same as always.
