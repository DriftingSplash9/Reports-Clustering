# Prompt for Grok — Canada: Quebec — deepen (currently 5 nodes, no Montreal or Quebec City)

**Attach:** `alberta-provincial.json`, `federal-canada.json` (all under `src/data/research/`) — these carry the existing Alberta/federal pattern this new research should follow, plus the federal transfer-program nodes (equalization, territorial formula financing, health/social transfers) new provincial/municipal nodes will likely connect to.

Paste everything below the line.

---

Quebec has 5 nodes, all regulatory/program-specific (low-rent housing conditions, TVQ revenue-sharing, the equalization regulation, the PSLQ rent supplement, and an economic-vitality index). No Quebec provincial budget node, and no Montreal or Quebec City municipal node at all.

**The template that's worked so far** (Alberta + Grande Prairie, Calgary): a province gets its own budget/fiscal-plan/economic-outlook nodes, a property-assessment and equalized-assessment framework, and a municipal financial-information-return system feeding a provincial compilation; a municipality gets its own assessment roll, budget, audited financial statements, tax-rate bylaw, and (where it exists) a municipal census. Follow that shape where the real thing exists — don't force a fit where the jurisdiction organizes things differently.

Quebec's institutional layer is genuinely different from Alberta's (Institut de la statistique du Québec / ISQ runs its own statistical program in French; municipal finance runs through the Ministère des Affaires municipales). Research this on its own terms rather than forcing the Alberta shape.

**Priority order:** (1) Quebec's own budget/fiscal-plan documents (Ministère des Finances du Québec — "Budget du Québec" / "Plan budgétaire"); (2) ISQ's population/economic statistics program generally, since `isq-vitalite-economique` already exists as one ISQ product but the parent institution isn't represented; (3) Ville de Montréal's budget, audited financial statements ("états financiers"), and property tax bylaw ("règlement sur la taxation"); (4) Ville de Québec, same set. Real dependency edges: does `qc-perequation` (currently our one unlinked Quebec node) calculate from a specific province-wide fiscal-capacity dataset that should be its own node? Does `qc-partage-croissance-tvq`'s municipal revenue-sharing use ISQ population data as an input?

**Existing ids you may target from Ottawa/StatCan/federal Canada (do not re-propose these):**

`fiscal-equalization-program`, `territorial-formula-financing`, `canada-health-transfer`, `canada-social-transfer`, `statcan-cpi`, `statcan-national-accounts`, `statcan-provincial-economic-accounts`, `statcan-government-finance-statistics`, `statcan-census-population`, `statcan-population-estimates`, `cmhc-rental-market-survey`, `cmhc-mortgage-loan-insurance`, `psab-psas` (Public Sector Accounting Standards), `statcan-business-register`. Also: `qc-perequation`, `qc-partage-croissance-tvq`, `qc-loyer-modique-regulation`, `qc-pslq`, `isq-vitalite-economique`.

**Relationship types — closed set of exactly four values:**

- `methodology_depends_on` — an international/national standard or framework governs how the report is compiled (PSAS, an SNA edition, a named provincial regulation setting the methodology for an index).
- `uses_data_from` — the target's figures are a direct input to the source (e.g. a municipal FIR feeds a provincial financial/statistical compilation; a rent-benefit program's rates are set relative to CMHC's Rental Market Survey).
- `calculated_from` — the source is mechanically derived from the target (e.g. an equalization/transfer amount calculated from a province's fiscal capacity data).
- `cites` — referenced as context (a municipal budget citing the province's fiscal framework as its funding basis).

No other values are legal.

**Honesty permission: an explicit "found nothing solid for X" is a correct and useful answer.** Primary documents only — the government's own budget/financial-statement/regulation pages, not aggregator or news-summary sites. One quote per edge that names the specific jurisdiction and states the specific claim being made.

## How to reply

One JSON object: `proposed_reports` array for every new report node you find — `{ proposed_id, title, publisher, region, jurisdiction_level (federal/provincial/municipal/institutional), url, description, publication_cadence }` — plus a `dependencies` array for edges you can support with a primary source, `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }`. French-language primary sources are expected and fine — just give the exact publisher name and URL so we can verify. We raw-verify every quote before anything is minted, same as always.
