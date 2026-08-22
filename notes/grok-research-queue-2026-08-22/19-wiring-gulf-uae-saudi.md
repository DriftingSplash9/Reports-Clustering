# Prompt for Grok — domestic wiring — United Arab Emirates and Saudi Arabia

**Attach:** `ae-national-core.json`, `ae-united-arab-emirates-grok-2026-08.json`, `sa-saudi-arabia-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

**UAE 24/35 (69%) and Saudi Arabia 14/16 (88%) unlinked.** The UAE has GCC customs-union and IMF Article IV nodes (`ae-gcc-customs-union`, `ae-imf-article-iv`) alongside OPEC/OPEC+ nodes (`int-opec-momr`, `int-opec-plus-doc`) that plausibly relate to both countries' own statistical releases.

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "United Arab Emirates / Saudi Arabia" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of the existing international/standard ids listed further down, OR — if the dependency genuinely involves something not in either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't in these lists; that has broken every round so far.

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

Likely angles: do UAE or Saudi statistics authorities (FCSC / GASTAT) cite the GCC customs union or GCC-Stat as the basis for trade/customs statistics? Does either country's oil-production or export data release cite OPEC's MOMR or the OPEC+ Declaration of Cooperation (`int-opec-momr`, `int-opec-plus-doc`) as a data source or reporting commitment? Does the UAE's IMF Article IV (`ae-imf-article-iv`) name a specific SNA/COICOP edition worth an edge?

**Honesty permission, as always: if you search and find nothing solid connecting two nodes, say so and move on — an explicit "no real dependency found between X and Y" is a correct and useful answer.** We would rather have 10 solid edges than 40 shaky ones. Primary documents only — the agency's own methodology notes, the treaty/agreement text itself, an IMF Article IV statistical annex, a national statistics office's own publication. No third-party scorecards (ODIN etc.) as citations — they're leads to chase, not sources to cite.

## How to reply

One JSON object: `dependencies` array, each entry `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }` — `evidence_quote` must name the specific country/agency and state the specific claim the edge makes (not a generic sentence that could apply to five other countries). Proposed new nodes (if any) go in a separate `proposed_reports` array with `proposed_id` (a sensible new id, not colliding with anything on the lists below), `kind` (domestic/international), `title`, `publisher`, `url`, `description`, `publication_cadence`. We raw-verify every quote before anything is minted, same as always.

## Node lists

<details>
<summary>United Arab Emirates — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
ae-adgm | Abu Dhabi Global Market (ADGM) — active licences and performance
ae-adia | Abu Dhabi Investment Authority (ADIA) assets under management
ae-banking-credit | Banking sector total assets, deposits and gross credit
ae-base-rate | CBUAE Base Rate decisions (Overnight Deposit Facility)
ae-bop | Balance of Payments
ae-cbuae | Central Bank of the UAE (CBUAE) institutional and reporting core
ae-cepa-program | Comprehensive Economic Partnership Agreements (CEPA) programme
ae-climate-reporting | Biennial Transparency Report / NDC progress reporting
ae-construction | Construction sector output and contract awards framing
ae-cpi | Consumer Price Index (CPI)
ae-difc | Dubai International Financial Centre (DIFC) — registered firms and performance
ae-dld-realestate | Dubai Land Department real estate transaction statistics
ae-dmcc-trade | DMCC commodity trade statistics (diamonds, precious metals)
ae-dxb-traffic | Dubai International Airport (DXB) passenger traffic
ae-education | Education statistics (general and higher education)
ae-fcsc | Federal Competitiveness and Statistics Centre (FCSC) institutional core
ae-fdi | UAE Foreign Direct Investment (FDI) inflows
ae-fta | Federal Tax Authority — VAT and Corporate Tax revenue statistics
ae-gcc-trade | UAE–GCC merchandise trade statistics
ae-gfs | Government Finance Statistics (GFS) — revenues, expenditures, assets and liabilities
ae-health | Health services statistics
ae-labour | Labour force and expatriate employment statistics
ae-labour-force | Labour Force statistics (employed population and labour force by citizenship, gender, age, activity)
ae-monetary-statistics | Monthly Statistical Bulletin — Banking & Monetary Statistics
ae-mubadala | Mubadala Investment Company assets under management and performance
ae-national-accounts | National Accounts (GDP)
ae-oil | Crude oil production and export statistics
ae-oil-production | Crude oil and condensate production and export statistics
ae-opec-exit | UAE exit from OPEC (effective 1 May 2026)
ae-population | Population estimates
ae-ports-jebel-ali | Jebel Ali and UAE ports container throughput
ae-renewables | Renewable energy capacity statistics
ae-tourism | Tourism and visitor-arrival statistics
ae-tourism-dubai | Dubai overnight visitor arrivals and tourism performance
ae-trade-partners | Major merchandise trade partners statistics
```
</details>

<details>
<summary>Saudi Arabia — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
sa-banking | Banking system credit and asset-quality statistics
sa-bop | Balance of Payments and external accounts
sa-cpi | Consumer Price Index and inflation statistics
sa-education | Education enrolment and literacy statistics
sa-gastat | General Authority for Statistics (GASTAT) institutional core
sa-ghg | Greenhouse gas emissions statistics
sa-health | Life expectancy and health outcome statistics
sa-labour | Labour force and Saudization statistics
sa-national-accounts | National Accounts of Saudi Arabia (GDP)
sa-oil-exports | Crude oil export statistics
sa-oil-production | Crude oil production statistics
sa-oil-revenue | Oil revenue and fiscal dependence statistics
sa-pif | Public Investment Fund assets and investment framing
sa-population | Population census and estimates
sa-trade-partners | Major merchandise trade partners statistics
sa-vision-2030 | Vision 2030 non-oil GDP and diversification framing
```
</details>
