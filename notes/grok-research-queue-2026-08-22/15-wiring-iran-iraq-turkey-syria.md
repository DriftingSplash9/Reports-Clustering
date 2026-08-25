# Prompt for Grok — domestic wiring — Iran, Iraq, Türkiye, Syria

**Standing rules:** see `GROKREADME.md` — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `ir-iran-grok-2026-08.json`, `iq-iraq-grok-2026-08.json`, `tr-turkey-grok-2026-08.json`, `sy-syria-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

**Iran 33/34 (97%), Iraq 21/22 (95%), Türkiye 33/34 (97%), Syria 12/13 (92%) unlinked** — among the thinnest countries in the whole corpus by percentage. Note: these four countries also have a separate cross-border research round in flight (the SD/SL/IQ/IR/AF/YE/SY prompt, notes/grok-prompt-cross-border-round3-2026-08-22.md) — that round is about edges reaching OUT to international standards bodies; this prompt is about wiring the domestic nodes these countries already have TO EACH OTHER within-country. The two won't collide, but mention to Grok that a companion cross-border round exists so it doesn't try to re-answer that one here.

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "Iran / Iraq / Türkiye / Syria" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of GROKREADME.md's standard international ids, OR — if the dependency genuinely involves something not on either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't on one of those lists; that has broken every round so far.

## The ask

Find real, citable **domestic** (within-country) dependency edges among the nodes listed below — which report's figures feed which, which report's methodology is governed by which standard, which trade/legal instrument a statistics release cites as its basis. Every one of these nodes currently has **zero edges** in our graph (or is directly relevant context for one that does) — they were minted as candidates but never wired to anything.

Likely angles: Türkiye's EU Customs Union (`tr-eu-customs-union`) as the cited tariff regime for its own trade statistics; Türkiye's FTA network nodes (`tr-uk-fta`, `tr-korea-fta`, `tr-efta`) similarly; Syria–Türkiye trade statistics (`sy-turkey-trade`) as a real cross-border figure Syria's own (pre-2011 or CBS) trade releases might cite as a data source. For Iran and Iraq, the honest answer may well be "very little to wire domestically" given how thin their base corpus is — a short, mostly-null reply for those two is fine and expected; don't strain to manufacture edges.

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
