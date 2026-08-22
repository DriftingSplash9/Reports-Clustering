# Prompt for Grok — Canada: British Columbia (new — zero nodes today)

**Standing rules:** see `../GROKREADME.md` — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `alberta-provincial.json`, `alberta-municipal.json`, `federal-canada.json`, `equalization-named-products.json` (all under `src/data/research/`) — these carry the existing Alberta/federal pattern this new research should follow, plus the federal transfer-program nodes (equalization, territorial formula financing, health/social transfers) new provincial/municipal nodes will likely connect to.

Paste everything below the line.

---

British Columbia currently has **zero nodes** in our graph — Canada's third-largest province and it's not represented at all. This is a from-scratch research pass, using Alberta's existing coverage as the shape to follow.

**The template that's worked so far** (Alberta + Grande Prairie, Calgary): a province gets its own budget/fiscal-plan/economic-outlook nodes, a property-assessment and equalized-assessment framework, and a municipal financial-information-return system feeding a provincial compilation; a municipality gets its own assessment roll, budget, audited financial statements, tax-rate bylaw, and (where it exists) a municipal census. Follow that shape where the real thing exists — don't force a fit where the jurisdiction organizes things differently.

BC-specific things to look for: BC Assessment (the province-wide property assessment authority, distinct from Alberta's municipal-level model — BC assesses everything provincially, which is a genuinely different structure worth describing accurately rather than forcing Alberta's shape onto it), the BC budget/fiscal-plan documents from the Ministry of Finance, BC Housing / the BC rent-bank or rental-assistance program (parallel to Ontario's portable housing benefit and Nova Scotia's targeted housing benefit already in the corpus), and the Vancouver and Victoria municipal layer (property tax bylaw, annual financial report, budget).

**Priority order:** (1) BC Assessment's own methodology and its province-wide role — this is the single most important BC-specific institution to get right; (2) the BC provincial budget/fiscal-plan documents; (3) Metro Vancouver / City of Vancouver's budget, financial statements, property tax bylaw; (4) City of Victoria if a clean parallel exists. Real dependency edges: does BC Assessment's output feed municipal tax-rate setting the way Alberta's equalized-assessment report does? Does a BC housing-benefit program set its rate relative to CMHC's Rental Market Survey the way Ontario's and Nova Scotia's do?

**Existing ids you may target from Ottawa/StatCan/federal Canada (do not re-propose these):**

`fiscal-equalization-program`, `territorial-formula-financing`, `canada-health-transfer`, `canada-social-transfer`, `statcan-cpi`, `statcan-national-accounts`, `statcan-provincial-economic-accounts`, `statcan-government-finance-statistics`, `statcan-census-population`, `statcan-population-estimates`, `cmhc-rental-market-survey`, `cmhc-mortgage-loan-insurance`, `psab-psas` (Public Sector Accounting Standards), `statcan-business-register`.

## Reply note

Note explicitly which of these BC institutions you found primary documents for and which you could not (e.g. if Vancouver publishes an FIR-equivalent under a different name, tell us the actual name rather than forcing our FIR label onto it).
