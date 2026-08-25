# Prompt for Grok — domestic wiring — Afghanistan, Yemen, Sudan, Somalia (small, very thin)

**Standing rules:** see `GROKREADME.md` — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `af-afghanistan-grok-2026-08.json`, `ye-yemen-grok-2026-08.json`, `af-sudan.json`, `sd-g22-audit-chamber-fiscal.json`, `sd-leadchase-nac-audits.json`, `af-somalia-deepen.json`, `so-g22-puntland-benadir-mof.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

Four small, fragile-state corpora with the highest unlinked *percentages* in the graph: **Afghanistan 14/15 (93%), Yemen 14/15 (93%), Sudan 6/9 (67%), Somalia 5/7 (71%).** These four also have a cross-border research round already in flight (notes/grok-prompt-cross-border-round3-2026-08-22.md) — this prompt is domestic wiring only, a different question, and the two won't conflict, but say so to Grok so it doesn't duplicate.

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "Afghanistan / Yemen / Sudan / Somalia" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of GROKREADME.md's standard international ids, OR — if the dependency genuinely involves something not on either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't on one of those lists; that has broken every round so far.

## The ask

Find real, citable **domestic** (within-country) dependency edges among the nodes listed below — which report's figures feed which, which report's methodology is governed by which standard, which trade/legal instrument a statistics release cites as its basis. Every one of these nodes currently has **zero edges** in our graph (or is directly relevant context for one that does) — they were minted as candidates but never wired to anything.

These node pools are small — realistically there may be only one or two genuine domestic edges to find per country, given how collapsed these countries' statistical systems are (Yemen's SNA hasn't been compiled since 2014; Somalia's federal/regional split fragments its statistics entirely). A mostly-null, honest reply here ("checked all pairs, found one real edge for Sudan, none for the rest") is a completely acceptable and expected outcome — don't manufacture connections to look productive.

## Node lists

<details>
<summary>Afghanistan — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
af-agriculture | Agriculture production statistics
af-bop | Balance of Payments and external accounts
af-border-mobility | Border mobility and returnee statistics
af-cpi | Consumer Price Index and inflation statistics
af-dab | Da Afghanistan Bank institutional and reporting core
af-drought | Drought and water-stress statistics
af-education | Education enrolment and girls’ secondary exclusion statistics
af-exchange-rate | Exchange-rate and afghani statistics
af-health | Life expectancy and health outcome statistics
af-humanitarian | Humanitarian needs and acute food insecurity statistics
af-national-accounts | National Accounts of Afghanistan (GDP)
af-nsia | National Statistics and Information Authority (NSIA, Afghanistan)
af-population | Population census and estimates
af-trade | Merchandise trade statistics
af-wheat | Wheat production and food-gap statistics
```
</details>

<details>
<summary>Yemen — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
ye-agriculture | Agriculture production statistics
ye-bop | Balance of Payments and external accounts
ye-cpi | Consumer Price Index and inflation statistics
ye-cso | Central Statistical Organization (Yemen)
ye-displacement | Internal displacement statistics
ye-education | Education disruption and out-of-school statistics
ye-exchange-rate | Dual exchange-rate and rial statistics
ye-fiscal | Fiscal balance and revenue statistics
ye-health | Health access and nutrition statistics
ye-humanitarian | Humanitarian needs and food insecurity statistics
ye-national-accounts | National Accounts of Yemen (GDP)
ye-oil | Oil production and export statistics
ye-population | Population estimates
ye-remittances | Remittance inflows statistics and framing
ye-trade-partners | Major merchandise trade partners statistics
```
</details>

<details>
<summary>Sudan — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
sd-budget-2021-transfers | Sudan National Budget 2021 (Ministry of Finance and Economic Planning)
sd-cbos-statistical-review-q4-2024 | Economic and Financial Statistical Review, Issue 1/2024 (October–December 2024)
sd-cbs | Central Bureau of Statistics (Sudan)
sd-cbs-cpi | Sudan Consumer Price Indices
sd-inc-2005-revenue-sharing | Interim National Constitution of the Republic of the Sudan (2005) — Part Nine, State Revenue and Fiscal Allocation Provisions
sd-mofep-budget-2026 | FY2026 Emergency Budget Guidelines — Council of Ministers Approval
sd-nac-secrp-audit-2021 | Audit Finding Report — Sudan Education Covid-19 Response Project (SECRP), Grant Agreement No. TF0B3339, For the Year Ended December 31, 2021
sd-nac-sldp-audit-2021 | Audit Opinion — Sustainable Livelihood for Displaced & Vulnerable Communities in Eastern Sudan Project (SLDP), Agreement No. TFOAO3002, Financial Statements as at April 30, 2021
sd-nac-ssnp-audit-2020 | Audit Opinion — Social Safety Net Project (SSNP), Grant Agreement No. 0A0362, Project ID P148349, Financial Statements as at December 31, 2020
```
</details>

<details>
<summary>Somalia — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
so-fgs-budget-framework-paper-fy2025 | Federal Government of Somalia — Budget Framework Paper for FY 2025 (revised v15)
so-fgs-financial-governance-reports | Financial Governance Reports — Inter-Governmental Fiscal Relations (FGS & FMS)
so-nsds-ii-2024-2029 | National Strategy for the Development of Statistics (NSDS II) 2024–2029
so-pl-mof-budget-archive | Puntland Ministry of Finance — Budget Archive (Enacted Budgets, Appropriation Acts, Budget Framework & Outlook Papers)
so-provisional-constitution-2012 | Provisional Constitution of the Federal Republic of Somalia (2012)
so-slmof-portal | Ministry of Finance & Economic Development — Official Portal (Republic of Somaliland)
so-snbs-cpi | Somalia Consumer Price Index (CPI)
```
</details>
