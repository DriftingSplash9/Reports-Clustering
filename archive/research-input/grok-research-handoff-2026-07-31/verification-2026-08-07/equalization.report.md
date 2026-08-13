# Merge report — equalization-named-products-closed

Slice source: `research-input/grok-research-handoff-2026-07-31/grok-research/equalization-named-products-closed.json`
Output: `merge-work/equalization.slice.json`
Verified 2026-08-07 against the consolidated regulation on laws-lois.justice.gc.ca (SOR/2007-303, Federal-Provincial Fiscal Arrangements Regulations, 2007 — fetched page by page; the FullText.html page truncates before s. 19, so evidence URLs point at the paginated views).

## Node mapping

| Handoff id | Disposition | Live id |
|---|---|---|
| fiscal-equalization-program (source) | EXISTS — reused | `fiscal-equalization-program` (health-funding.json) |
| statcan-provincial-territorial-economic-accounts | NEW (IMDB 1902 verified active, annual) | `statcan-provincial-economic-accounts` |
| statcan-provincial-supply-use-tables | REMAPPED — same programme (IMDB 1401) as existing node | `statcan-sut` (statcan-supply-use-tables.json) |
| statcan-canadian-government-finance-statistics | NEW (IMDB **5174**, not 5218 as handoff claimed; quarterly) | `statcan-government-finance-statistics` |
| statcan-oil-gas-extraction-survey | NEW (IMDB 2178 verified active) | `statcan-oil-gas-extraction` |
| statcan-fuel-sales-road-vehicles | NEW (table 23-10-0066-01 verified live; formerly CANSIM 405-0002; survey 2746) | `statcan-road-fuel-sales` |
| statcan-alcoholic-beverage-sales | NEW (table 10-10-0011-01 verified live; page confirms "formerly CANSIM 183-0024") | `statcan-alcohol-sales` |
| statcan-agricultural-balance-sheet | NEW (table 32-10-0056-01 verified live; "formerly CANSIM 002-0020"; survey record **5029**, not just a table) | `statcan-agriculture-balance-sheet` |
| statcan-vehicle-registrations | NEW (IMDB 2747 "Vehicle Registrations" verified active) | `statcan-vehicle-registrations` |
| rl-polk-canadian-international-registration-manual | NEW, commercial | `rl-polk-registration-manual` |

## Per-edge verdicts (all 9 handoff edges)

All edges retyped from the handoff's `uses_data_from` to `calculated_from`, matching the house treatment of statutory formula terms already used for `fiscal-equalization-program -> statcan-seph` in equalization-payroll-base.json.

| # | Claimed edge | Verdict | Evidence |
|---|---|---|---|
| 1 | -> Provincial and Territorial Economic Accounts (s. 3.1, DIV 1) | **VERIFIED** | page-2: "household final consumption expenditures as determined by Statistics Canada for the purpose of its Provincial and Territorial Economic Accounts"; same construction for residential renovations, residential housing transfers, housing expenditure categories; page-5 confirms s. 8(1)(z.2)–(z.4) use it too. |
| 2 | -> Provincial Supply and Use Tables (s. 3.1 + s. 8(1)(z)) | **VERIFIED, REMAPPED to `statcan-sut`** | page-2: "expenditures on intermediate inputs, as determined by Statistics Canada for the purpose of its Provincial Supply and Use Tables" (matrix-level wording preserved from the prior verified pass); page-5 confirms the s. 8(1)(z) mention. Both handoff node and live node are IMDB 1401. |
| 3 | -> Government Finance Statistics (s. 5(b)(ii) + s. 19(1)(b)(ii)) | **VERIFIED** | page-3: "the product, as determined on the basis of data prepared by Statistics Canada for the purpose of the Government Finance Statistics, of" (twice in s. 5(b)(ii)); page-9 confirms identical wording at s. 19(1)(b)(ii). |
| 4 | -> Oil and Gas Extraction survey (s. 8(1)(p) etc., DIV 2) | **VERIFIED** | page-5: "as determined by Statistics Canada on the basis of its survey Oil and Gas Extraction" confirmed across s. 8(1)(m)–(s) — seven paragraphs, as the prior pass counted. |
| 5 | -> table 23-10-0066-01 fuel sales (s. 1(1)) | **VERIFIED** | page-1: both the diesel and gasoline "adjusted number of litres … taxed at road-use rate" definitions read "as determined by Statistics Canada for the purpose of table 23-10-0066-01, Sales of fuel used for road motor vehicles, annual (× 1,000)". |
| 6 | -> table 10-10-0011-01 alcohol sales (s. 19(1)(f); CANSIM 183-0024 at s. 8(1)(j)) | **VERIFIED** | page-9: spirits/wine/beer each "as determined by Statistics Canada for the purpose of table 10-10-0011-01, Value of sales of alcoholic beverages…"; page-5 confirms s. 8(1)(j) cites "CANSIM table 183-0024"; StatCan table page confirms the succession. |
| 7 | -> CANSIM 002-0020 agricultural balance sheet (s. 8(1)(z), DIV 2) | **VERIFIED** | page-5: "as determined by Statistics Canada for the purpose of CANSIM table 002-0020"; page-9 confirms the TFF parallel at s. 19(1)(h) uses the Census of Agriculture instead, as the handoff noted. |
| 8 | -> CANSIM 405-0004 vehicle registrations (s. 8(1)(h),(i), DIV 2) | **VERIFIED** | page-5: "as determined by Statistics Canada for the purpose of CANSIM table 405-0004, Road motor vehicles, registrations"; Ministerial-fallback clause confirmed in the prior pass's verbatim quote of s. 8(1)(h). |
| 9 | -> R.L. Polk Canadian and International Registration Manual (s. 8(1)(i), DIV 2) | **VERIFIED** | page-5: "the R.L. Polk & Co. publication Canadian and International Registration Manual"; full sentence including "weighted average licence fee … as calculated on the basis of data respecting licence fees charged by each province" preserved verbatim in the prior pass (equalization-named-products.json). |

Edges verified: 9/9. Dropped: 0. One `_dropped` entry exists but records the SUT remap decision (reason `note`), not a lost edge.

## For the next session / integration

1. **This slice closes most of equalization-named-products.json.** Seven of its twelve `_dropped` entries (PTEA, Provincial SUT, GFS, OGEX, Polk, 405-0004, 002-0020, 23-10-0066-01 — the no-node-yet ones this handoff targeted) are now resolved. Still open in that file: the **System of Macroeconomic Accounts framework** question (three s. 3.1 capital-formation aggregates and the s. 5(b)(i) corporate-profits term are pinned to the CSMA, which is a framework, not a release — the "THREE THINGS BLOCKED ON ONE DECISION" note stands), and the Canadian Pari-Mutuel Agency entry (unpublishable-source, unchanged). Consider updating those `_dropped` entries to point here on integration.
2. **R.L. Polk node needs a decision.** The regulation names the manual verbatim (edge evidence is solid), but Polk was absorbed into IHS/S&P Global Mobility in 2013 and no live publisher landing page exists; the node URL is a Google Books bibliographic record and the cadence_note flags this. If the corpus requires a resolving official landing page, alternatives are marking it terminal or demoting the edge to `_dropped` `unreadable-source` — I kept it because jd-power-valuation-services sets the commercial precedent and the statute is the operative evidence.
3. **Handoff factual corrections** (already baked into the slice): GFS is IMDB 5174 (quarterly), not 5218; the fuel table's former CANSIM number is 405-0002 (the handoff was silent, don't confuse with the vehicle table's 405-0004); the agricultural balance sheet has its own survey record 5029.
4. **live-ids.txt is incomplete**: it lacks the ids defined in `src/data/reports.ts` (statcan-cpi, statcan-seph, statcan-gdp-monthly, statcan-national-accounts, statcan-lfs, …). All eight new ids in this slice were checked against both reports.ts and every research/*.json — no collisions — but the duplicate validator's input list should be regenerated to include reports.ts.
5. **Scope caveat worth keeping visible**: six of the nine edges rest wholly or partly on DIVISION 2 (the Nova Scotia additional-equalization calculation, which retains retired CANSIM citations) or on the TFF part; the DIVISION 1 all-provinces citations are edges 1–3 plus the s. 1(1) fuel definition. The per-edge `basis` texts record the division scope.
