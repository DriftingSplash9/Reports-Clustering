# Prompt for Grok — domestic wiring — Iran, Iraq, Türkiye, Syria

**Attach:** `ir-iran-grok-2026-08.json`, `iq-iraq-grok-2026-08.json`, `tr-turkey-grok-2026-08.json`, `sy-syria-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

**Iran 33/34 (97%), Iraq 21/22 (95%), Türkiye 33/34 (97%), Syria 12/13 (92%) unlinked** — among the thinnest countries in the whole corpus by percentage. Note: these four countries also have a separate cross-border research round in flight (the SD/SL/IQ/IR/AF/YE/SY prompt, notes/grok-prompt-cross-border-round3-2026-08-22.md) — that round is about edges reaching OUT to international standards bodies; this prompt is about wiring the domestic nodes these countries already have TO EACH OTHER within-country. The two won't collide, but mention to Grok that a companion cross-border round exists so it doesn't try to re-answer that one here.

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "Iran / Iraq / Türkiye / Syria" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of the existing international/standard ids listed further down, OR — if the dependency genuinely involves something not in either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't in these lists; that has broken every round so far.

**Relationship types — closed set of exactly four values, nothing else is legal:**

- `methodology_depends_on` — an international standard, classification, or framework governs how the report is compiled or disseminated (SNA edition, COICOP, BPM6, HS, ISIC, SDMX, an IMF data-standard tier).
- `uses_data_from` — the target's figures are a direct input to the source (e.g. a CPI report uses a household expenditure survey; a trade-statistics release uses a customs declaration dataset; a GDP report uses a labour-force survey).
- `calculated_from` — the source is mechanically derived from the target (e.g. a real-GDP series calculated from the nominal series and a deflator; a regional index calculated from national sub-components).
- `cites` — referenced as context, including institutional/treaty membership (a country's statistics office citing its membership in a regional statistical body; a report citing a trade agreement as the legal basis for a tariff/customs regime it reports on).

Do not invent any other value (`participates_in`, `disseminated_under`, `member_of`, `references`, etc. are all illegal and will NaN our PageRank calculation if they slip through).

**Existing international/standard ids to reuse as targets (do not re-propose these):**

- `sna-2008`, `sna-1993`, `sna-1968`, `sna-2025` — System of National Accounts editions
- `imf-bpm6` — Balance of Payments Manual 6th edition
- `imf-e-gdds`, `imf-sdds`, `imf-sdds-plus` — IMF data-dissemination standard tiers
- `un-coicop-2018`, `un-coicop-hbs-1999` — Classification of Individual Consumption by Purpose
- `imf-dqaf` — Data Quality Assessment Framework
- `imf-weo`, `imf-fiscal-monitor`, `imf-gfsr`, `imf-gfsm` — recurring IMF flagship publications
- `isic`, `hs`, `naics`, `anzsic` — industry/product classification standards
- `sdmx-standard`, `sdmx-glossary` — statistical data exchange standard
- `cpi-manual` — Consumer Price Index Manual: Concepts and Methods
- `ipsas` — International Public Sector Accounting Standards
- `un-census-principles` — Principles and Recommendations for Population and Housing Censuses
- `icls-work-statistics-resolution` — ICLS labour-statistics resolution

Reuse these rather than proposing a duplicate international node. Propose a new international node only for a body/standard genuinely not on this list (name it explicitly and we'll check before minting).

## The ask

Find real, citable **domestic** (within-country) dependency edges among the nodes listed below — which report's figures feed which, which report's methodology is governed by which standard, which trade/legal instrument a statistics release cites as its basis. Every one of these nodes currently has **zero edges** in our graph (or is directly relevant context for one that does) — they were minted as candidates but never wired to anything.

Likely angles: Türkiye's EU Customs Union (`tr-eu-customs-union`) as the cited tariff regime for its own trade statistics; Türkiye's FTA network nodes (`tr-uk-fta`, `tr-korea-fta`, `tr-efta`) similarly; Syria–Türkiye trade statistics (`sy-turkey-trade`) as a real cross-border figure Syria's own (pre-2011 or CBS) trade releases might cite as a data source. For Iran and Iraq, the honest answer may well be "very little to wire domestically" given how thin their base corpus is — a short, mostly-null reply for those two is fine and expected; don't strain to manufacture edges.

**Honesty permission, as always: if you search and find nothing solid connecting two nodes, say so and move on — an explicit "no real dependency found between X and Y" is a correct and useful answer.** We would rather have 10 solid edges than 40 shaky ones. Primary documents only — the agency's own methodology notes, the treaty/agreement text itself, an IMF Article IV statistical annex, a national statistics office's own publication. No third-party scorecards (ODIN etc.) as citations — they're leads to chase, not sources to cite.

## How to reply

One JSON object: `dependencies` array, each entry `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }` — `evidence_quote` must name the specific country/agency and state the specific claim the edge makes (not a generic sentence that could apply to five other countries). Proposed new nodes (if any) go in a separate `proposed_reports` array with `proposed_id` (a sensible new id, not colliding with anything on the lists below), `kind` (domestic/international), `title`, `publisher`, `url`, `description`, `publication_cadence`. We raw-verify every quote before anything is minted, same as always.

## Node lists

<details>
<summary>Iran — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
ir-agriculture | Agriculture production statistics
ir-banking-system | Banking system structure and credit statistics
ir-bop | Balance of Payments and external accounts
ir-cbi | Central Bank of the Islamic Republic of Iran institutional and reporting core
ir-cpi | Consumer Price Index and inflation statistics
ir-education | Education enrolment and literacy statistics
ir-exchange-rate | Exchange-rate regime and parallel-market statistics
ir-gas | Natural gas production and domestic consumption statistics
ir-grdp-bushehr | Bushehr province Gross Regional Domestic Product
ir-grdp-fars | Fars province Gross Regional Domestic Product
ir-grdp-isfahan | Isfahan province Gross Regional Domestic Product
ir-grdp-khuzestan | Khuzestan province Gross Regional Domestic Product
ir-grdp-tehran | Tehran province Gross Regional Domestic Product
ir-health | Health and vital statistics (life expectancy, mortality)
ir-housing | Housing and construction permit statistics
ir-industry | Industrial production and manufacturing statistics
ir-labour | Labour force and unemployment statistics
ir-mining | Mining and mineral production statistics
ir-national-accounts | National Accounts of Iran (GDP)
ir-non-oil-exports | Non-oil export statistics
ir-nuclear-power | Nuclear power generation statistics (Bushehr)
ir-oil-exports | Oil and petroleum product export statistics
ir-oil-production | Crude oil and condensate production statistics
ir-petrochemicals | Petrochemical production and export statistics
ir-population | Population census and estimates
ir-poverty | Poverty and living-standards statistics
ir-power | Electricity generation and installed capacity statistics
ir-sci | Statistical Centre of Iran (SCI) institutional core
ir-social-protection | Social protection and cash-transfer statistics
ir-state-budget | State budget revenue and expenditure statistics
ir-tourism | International visitor arrivals and tourism statistics
ir-water-stress | Water resources and water-stress statistics
ir-wheat | Wheat production statistics
ir-youth-labour | Youth unemployment and youth labour-force statistics
```
</details>

<details>
<summary>Iraq — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
iq-agriculture | Agriculture production statistics
iq-banking-system | Banking system structure and credit statistics
iq-bop | Balance of Payments and external accounts
iq-cpi | Consumer Price Index and inflation statistics
iq-cso | Central Statistical Organization / Authority of Statistics and GIS (Iraq)
iq-education | Education enrolment and completion statistics
iq-exchange-rate | Exchange-rate and dinar statistics
iq-federal-budget | Federal budget revenue and expenditure statistics
iq-ghg | Greenhouse gas emissions statistics
iq-health | Life expectancy and health outcome statistics
iq-labour | Labour force and unemployment statistics
iq-national-accounts | National Accounts of Iraq (GDP)
iq-npl | Non-performing loans and banking asset-quality statistics
iq-oil-exports | Crude oil export statistics
iq-oil-production | Crude oil production statistics
iq-oil-revenue | Oil revenue and fiscal dependence statistics
iq-population | Population census and estimates
iq-poverty | Poverty and living standards statistics
iq-power | Electricity generation and capacity statistics
iq-wage-bill | Public-sector wage bill and employment statistics
iq-water | Water storage and Tigris-Euphrates basin statistics
iq-wheat | Wheat production statistics
```
</details>

<details>
<summary>Türkiye — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
tr-agriculture | Agriculture and crop production statistics
tr-banking-system | Banking system structure and credit statistics
tr-bop | Balance of Payments and external accounts
tr-cbrt | Central Bank of the Republic of Türkiye (CBRT) institutional and reporting core
tr-cpi | Consumer Price Index and inflation statistics
tr-defence-budget | Defence and security expenditure statistics
tr-ecommerce | E-commerce volume and digital trade statistics
tr-education | Education enrolment, literacy and attainment statistics
tr-exchange-rate | Exchange-rate and lira statistics
tr-ghg | Greenhouse gas inventory statistics
tr-grdp-ankara | Ankara Gross Regional Domestic Product
tr-grdp-antalya | Antalya Gross Regional Domestic Product
tr-grdp-bursa | Bursa Gross Regional Domestic Product
tr-grdp-gaziantep | Gaziantep Gross Regional Domestic Product
tr-grdp-istanbul | Istanbul Gross Regional Domestic Product
tr-grdp-izmir | Izmir Gross Regional Domestic Product
tr-grdp-kocaeli | Kocaeli Gross Regional Domestic Product
tr-grdp-sanliurfa | Şanlıurfa province Gross Regional Domestic Product
tr-grdp-van | Van province Gross Regional Domestic Product
tr-health | Life expectancy and vital statistics
tr-industrial-production | Industrial production and manufacturing statistics
tr-labour | Labour force and unemployment statistics
tr-monetary-policy | CBRT monetary policy and policy-rate statistics
tr-national-accounts | National Accounts of Turkey (GDP)
tr-ndc | Nationally Determined Contribution (NDC) climate framing
tr-npl | Non-performing loans and banking asset-quality statistics
tr-population | Population census and estimates
tr-poverty | Poverty and living conditions statistics
tr-power | Electricity generation and installed capacity statistics
tr-public-debt | Public debt and debt management statistics
tr-state-budget | Central government budget revenue and expenditure statistics
tr-tourism | Tourism arrivals and tourism revenue statistics
tr-turkstat | Turkish Statistical Institute (TurkStat) institutional core
tr-turkstat-national-accounts | National Accounts (ESA 2010 / SNA 2008)
```
</details>

<details>
<summary>Syria — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
sy-bop | Balance of Payments and external accounts
sy-cbs | Central Bureau of Statistics (Syria)
sy-cpi | Consumer Price Index and inflation statistics
sy-displacement | Internal displacement and return statistics
sy-drought | Drought and agricultural water-stress statistics
sy-education | Education disruption and out-of-school statistics
sy-exchange-rate | Exchange-rate and Syrian pound statistics
sy-fiscal | Fiscal balance and revenue statistics
sy-health | Health access and nutrition statistics
sy-national-accounts | National Accounts of Syria (GDP)
sy-population | Population estimates
sy-power | Electricity generation and capacity statistics
sy-wheat | Wheat production and food-security statistics
```
</details>
