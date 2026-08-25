# Prompt for Grok — Canada: Quebec — deepen (currently 5 nodes, no Montreal or Quebec City)

**Standing rules:** see `GROKREADME.md` — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `alberta-provincial.json`, `federal-canada.json` (all under `src/data/research/`) — these carry the existing Alberta/federal pattern this new research should follow, plus the federal transfer-program nodes (equalization, territorial formula financing, health/social transfers) new provincial/municipal nodes will likely connect to.

Paste everything below the line.

---

Quebec has 5 nodes, all regulatory/program-specific (low-rent housing conditions, TVQ revenue-sharing, the equalization regulation, the PSLQ rent supplement, and an economic-vitality index). No Quebec provincial budget node, and no Montreal or Quebec City municipal node at all.

**The template that's worked so far** (Alberta + Grande Prairie, Calgary): a province gets its own budget/fiscal-plan/economic-outlook nodes, a property-assessment and equalized-assessment framework, and a municipal financial-information-return system feeding a provincial compilation; a municipality gets its own assessment roll, budget, audited financial statements, tax-rate bylaw, and (where it exists) a municipal census. Follow that shape where the real thing exists — don't force a fit where the jurisdiction organizes things differently.

Quebec's institutional layer is genuinely different from Alberta's (Institut de la statistique du Québec / ISQ runs its own statistical program in French; municipal finance runs through the Ministère des Affaires municipales). Research this on its own terms rather than forcing the Alberta shape.

**Priority order:** (1) Quebec's own budget/fiscal-plan documents (Ministère des Finances du Québec — "Budget du Québec" / "Plan budgétaire"); (2) ISQ's population/economic statistics program generally, since `isq-vitalite-economique` already exists as one ISQ product but the parent institution isn't represented; (3) Ville de Montréal's budget, audited financial statements ("états financiers"), and property tax bylaw ("règlement sur la taxation"); (4) Ville de Québec, same set. Real dependency edges: does `qc-perequation` (currently our one unlinked Quebec node) calculate from a specific province-wide fiscal-capacity dataset that should be its own node? Does `qc-partage-croissance-tvq`'s municipal revenue-sharing use ISQ population data as an input?

**Existing ids you may target from Ottawa/StatCan/federal Canada (do not re-propose these):**

`fiscal-equalization-program`, `territorial-formula-financing`, `canada-health-transfer`, `canada-social-transfer`, `statcan-cpi`, `statcan-national-accounts`, `statcan-provincial-economic-accounts`, `statcan-government-finance-statistics`, `statcan-census-population`, `statcan-population-estimates`, `cmhc-rental-market-survey`, `cmhc-mortgage-loan-insurance`, `psab-psas` (Public Sector Accounting Standards), `statcan-business-register`. Also: `qc-perequation`, `qc-partage-croissance-tvq`, `qc-loyer-modique-regulation`, `qc-pslq`, `isq-vitalite-economique`.

## Reply note

French-language primary sources are expected and fine — just give the exact publisher name and URL so we can verify.
