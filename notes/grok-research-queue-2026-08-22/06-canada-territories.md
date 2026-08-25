# Prompt for Grok — Canada: Yukon, Northwest Territories, Nunavut (all new)

**Standing rules:** see `GROKREADME.md` — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `federal-canada.json`, `equalization-named-products.json` (all under `src/data/research/`) — these carry the existing Alberta/federal pattern this new research should follow, plus the federal transfer-program nodes (equalization, territorial formula financing, health/social transfers) new provincial/municipal nodes will likely connect to.

Paste everything below the line.

---

All three territories have **zero** nodes. Unlike the provinces, territorial funding runs overwhelmingly through Territorial Formula Financing (`territorial-formula-financing`, already in our corpus) rather than provincial-style own-source revenue — so this is likely to produce fewer, more concentrated edges rather than a wide node count, and that's fine.

**The template that's worked so far** (Alberta + Grande Prairie, Calgary): a province gets its own budget/fiscal-plan/economic-outlook nodes, a property-assessment and equalized-assessment framework, and a municipal financial-information-return system feeding a provincial compilation; a municipality gets its own assessment roll, budget, audited financial statements, tax-rate bylaw, and (where it exists) a municipal census. Follow that shape where the real thing exists — don't force a fit where the jurisdiction organizes things differently.

Don't force the province/municipality template here — territorial government finance genuinely works differently (much higher federal transfer dependency, much smaller population/tax bases, and in Nunavut's case a very recent and still-developing statistical apparatus).

**Priority order:** (1) each territory's own budget/main-estimates documents (Yukon's Department of Finance, NWT's Department of Finance, Nunavut's Department of Finance); (2) whether each territory's budget document explicitly states its Territorial Formula Financing entitlement as a share of total revenue — this is likely the single most findable, well-documented dependency edge available for any of the three; (3) Statistics Bureau of each territory if one publishes population/economic statistics distinct from StatCan's own territorial estimates.

**Existing ids you may target from Ottawa/StatCan/federal Canada (do not re-propose these):**

`fiscal-equalization-program`, `territorial-formula-financing`, `canada-health-transfer`, `canada-social-transfer`, `statcan-cpi`, `statcan-national-accounts`, `statcan-provincial-economic-accounts`, `statcan-government-finance-statistics`, `statcan-census-population`, `statcan-population-estimates`, `cmhc-rental-market-survey`, `cmhc-mortgage-loan-insurance`, `psab-psas` (Public Sector Accounting Standards), `statcan-business-register`.

## Reply note

An honest "found the budget documents but the Territorial Formula Financing dependency isn't stated as cleanly as hoped" is a fine outcome — territorial fiscal documents vary a lot in how explicitly they break this out.
