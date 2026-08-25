# Prompt for Grok — Canada: New Brunswick, PEI, Newfoundland and Labrador (all new), Nova Scotia deepen (1 node), Halifax municipal

**Standing rules:** see `GROKREADME.md` — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `alberta-provincial.json`, `federal-canada.json`, `equalization-named-products.json` (all under `src/data/research/`) — these carry the existing Alberta/federal pattern this new research should follow, plus the federal transfer-program nodes (equalization, territorial formula financing, health/social transfers) new provincial/municipal nodes will likely connect to.

Paste everything below the line.

---

Atlantic Canada has almost nothing: Nova Scotia has one node (a federal-provincial rent benefit), and New Brunswick, PEI, and Newfoundland and Labrador have zero. These four provinces are also where federal equalization payments matter most in practice (they're the biggest recipients) — a real angle for finding genuine dependency edges to the existing `fiscal-equalization-program` node.

**The template that's worked so far** (Alberta + Grande Prairie, Calgary): a province gets its own budget/fiscal-plan/economic-outlook nodes, a property-assessment and equalized-assessment framework, and a municipal financial-information-return system feeding a provincial compilation; a municipality gets its own assessment roll, budget, audited financial statements, tax-rate bylaw, and (where it exists) a municipal census. Follow that shape where the real thing exists — don't force a fit where the jurisdiction organizes things differently.

Same province/municipality template as elsewhere, adapted to each province's real institutions. Halifax Regional Municipality is the one clear "major city" target in this region; the other three provincial capitals (Fredericton, Charlottetown, St. John's) are smaller and may or may not publish a comparable municipal-finance document — check rather than assume.

**Priority order:** (1) each of the four provinces' own budget/fiscal-plan/estimates documents; (2) each province's property-assessment authority (Property Valuation Services Corporation for NB, PEI's provincial assessment, Newfoundland's Municipal Assessment Agency, Nova Scotia's Property Valuation Services Corporation); (3) Halifax Regional Municipality's budget, financial statements, tax rate; (4) real dependency edges from any of these four provinces' fiscal documents to `fiscal-equalization-program` — Atlantic Canada is the best place in the whole corpus to find a genuine, well-documented equalization dependency, since these are consistently among the largest per-capita recipients and their own budget documents typically say so explicitly.

**Existing ids you may target from Ottawa/StatCan/federal Canada (do not re-propose these):**

`fiscal-equalization-program`, `territorial-formula-financing`, `canada-health-transfer`, `canada-social-transfer`, `statcan-cpi`, `statcan-national-accounts`, `statcan-provincial-economic-accounts`, `statcan-government-finance-statistics`, `statcan-census-population`, `statcan-population-estimates`, `cmhc-rental-market-survey`, `cmhc-mortgage-loan-insurance`, `psab-psas` (Public Sector Accounting Standards), `statcan-business-register`. Also: `ns-cns-thb`.

## Reply note

The equalization-dependency edges are the most valuable single thing this prompt can return — prioritize finding one province's budget document that explicitly states its equalization entitlement as a share of revenue, with the exact figure and fiscal year, over broader coverage.
