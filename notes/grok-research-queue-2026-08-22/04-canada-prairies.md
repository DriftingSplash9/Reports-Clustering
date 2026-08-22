# Prompt for Grok — Canada: Saskatchewan (new), Manitoba (deepen from 1 node), plus Edmonton, Winnipeg, Regina/Saskatoon municipal

**Standing rules:** see `../GROKREADME.md` — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `alberta-provincial.json`, `alberta-municipal.json`, `grande-prairie.json`, `federal-canada.json` (all under `src/data/research/`) — these carry the existing Alberta/federal pattern this new research should follow, plus the federal transfer-program nodes (equalization, territorial formula financing, health/social transfers) new provincial/municipal nodes will likely connect to.

Paste everything below the line.

---

Saskatchewan has **zero** nodes. Manitoba has exactly one (a rent-benefit program). And — worth noting plainly — even Edmonton, Alberta's own capital, has no municipal node despite Alberta being our deepest province; only Calgary and Grande Prairie do. This prompt covers all of that gap at once: Saskatchewan from scratch, Manitoba deepened, and the three missing Prairie capitals' municipal layer (Edmonton, Winnipeg, Regina or Saskatoon).

**The template that's worked so far** (Alberta + Grande Prairie, Calgary): a province gets its own budget/fiscal-plan/economic-outlook nodes, a property-assessment and equalized-assessment framework, and a municipal financial-information-return system feeding a provincial compilation; a municipality gets its own assessment roll, budget, audited financial statements, tax-rate bylaw, and (where it exists) a municipal census. Follow that shape where the real thing exists — don't force a fit where the jurisdiction organizes things differently.

Follow the Alberta template (province: budget/fiscal-plan, property assessment framework, municipal financial-return system; municipality: assessment roll, budget, audited financial statements, tax-rate bylaw, municipal census where one exists) for Saskatchewan and Manitoba, adjusting for each province's own actual institutions rather than assuming they mirror Alberta's exactly.

**Priority order:** (1) Edmonton's budget, financial statements, tax rate bylaw — the most glaring single gap, since we have the whole Alberta provincial framework already and Edmonton is Alberta's capital and second-largest city; (2) Saskatchewan's provincial budget/fiscal-plan and its property-assessment authority (SAMA — Saskatchewan Assessment Management Agency); (3) Manitoba's provincial budget/fiscal-plan and its property assessment system; (4) Winnipeg and Regina or Saskatoon municipal budget/financial-statements/tax-bylaw.

**Existing ids you may target from Ottawa/StatCan/federal Canada (do not re-propose these):**

`fiscal-equalization-program`, `territorial-formula-financing`, `canada-health-transfer`, `canada-social-transfer`, `statcan-cpi`, `statcan-national-accounts`, `statcan-provincial-economic-accounts`, `statcan-government-finance-statistics`, `statcan-census-population`, `statcan-population-estimates`, `cmhc-rental-market-survey`, `cmhc-mortgage-loan-insurance`, `psab-psas` (Public Sector Accounting Standards), `statcan-business-register`. Also Alberta's municipal template: `calgary-budget`, `calgary-financial-statements`, `calgary-tax-rate-bylaw`, `calgary-assessment-roll`, `ab-municipalaffairs-fir`, `ab-municipalaffairs-equalized-assessment`, `mb-rent-assist`.

## Reply note

If Edmonton or a Prairie city's finance department bundles what Calgary reports separately (e.g. one combined annual report rather than four documents), say so rather than inventing four nodes to match the Alberta shape.
