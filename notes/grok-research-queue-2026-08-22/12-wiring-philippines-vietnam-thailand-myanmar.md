# Prompt for Grok — domestic wiring — Philippines, Vietnam, Thailand, Myanmar

**Standing rules:** see `../GROKREADME.md` — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `ph-philippines-grok-2026-08.json`, `vn-vietnam-grok-2026-08.json`, `th-thailand-grok-2026-08.json`, `mm-myanmar-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

Four Southeast Asian countries with the same pattern: real candidate nodes, almost no wiring. **Philippines 65/68 (96%), Vietnam 46/48 (96%), Thailand 22/25 (88%), Myanmar 14/16 (88%) are unlinked.** Vietnam in particular has a dense set of bilateral trade/FDI nodes (China, Korea, Japan, the US, the EU, the UK) that likely relate to its own trade-statistics releases.

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "Philippines / Vietnam / Thailand / Myanmar" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of GROKREADME.md's standard international ids, OR — if the dependency genuinely involves something not on either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't on one of those lists; that has broken every round so far.

## The ask

Find real, citable **domestic** (within-country) dependency edges among the nodes listed below — which report's figures feed which, which report's methodology is governed by which standard, which trade/legal instrument a statistics release cites as its basis. Every one of these nodes currently has **zero edges** in our graph (or is directly relevant context for one that does) — they were minted as candidates but never wired to anything.

Likely angles: PSA (Philippines), GSO (Vietnam), NSO (Thailand), CSO (Myanmar) national-accounts or CPI methodology naming an SNA/COICOP edition; Vietnam's many bilateral trade nodes (`vn-usa-trade`, `vn-china-trade`, `vn-korea-trade-fdi`, `vn-japan-trade-fdi`, etc.) as the cited basis for GSO's own trade-statistics releases; the RCEP/ASEAN/CPTPP membership nodes across all four countries as `cites` edges from each country's trade or customs statistics. Treat each country separately — don't force a Philippines node to link to a Vietnam node; these are domestic edges only (cross-border edges between these countries are a separate, later ask).

## Node lists

<details>
<summary>Philippines — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
ph-4ps | Pantawid Pamilyang Pilipino Program (4Ps) statistics
ph-agriculture | Agriculture and fisheries production statistics
ph-barmm | BARMM (Bangsamoro Autonomous Region in Muslim Mindanao) economic and statistical profile
ph-basic-ed | Basic education statistics (DepEd)
ph-bop | Balance of Payments and International Investment Position
ph-bsp | Bangko Sentral ng Pilipinas (BSP) institutional and reporting core
ph-bsp-mpr | BSP Monetary Policy Report
ph-construction | Construction statistics and GVA
ph-cpi | Consumer Price Index and inflation statistics
ph-cpi-detail | CPI by major commodity group and regional inflation
ph-crime | Crime statistics (focus crimes and crime rate)
ph-defence-budget | Department of National Defense / AFP budget statistics
ph-digital-economy | Philippine Digital Economy Satellite Account (PDESA)
ph-disaster-impact | Natural hazard occurrence and impact statistics (typhoons, earthquakes, etc.)
ph-dmw | Department of Migrant Workers institutional role and deployment statistics
ph-ecommerce | E-commerce component of the digital economy
ph-electronics-trade | Electronics and semiconductor trade statistics
ph-energy-mix | Electricity generation and capacity mix by technology
ph-external-debt | External debt statistics
ph-fies | Family Income and Expenditure Survey (FIES)
ph-financial-system | Philippine financial system resources and structure
ph-fiscal-ops | National Government fiscal operations and budget statistics
ph-fisheries | Fisheries and aquaculture production statistics
ph-forest | Forest cover and forestry sector statistics
ph-gender | Women and Men in the Philippines / Core GAD indicators
ph-geothermal | Geothermal power capacity and generation statistics
ph-gfcf | Gross Fixed Capital Formation statistics
ph-ghg | Greenhouse gas inventory and emissions statistics
ph-gov-debt | National Government outstanding debt statistics
ph-grdp-calabarzon | CALABARZON Gross Regional Domestic Product
ph-grdp-ncr | National Capital Region (NCR) Gross Regional Domestic Product
ph-health-indicators | Key health and nutrition indicators
ph-higher-ed | Higher education statistics (enrolment, institutions, graduates)
ph-housing | Housing and household characteristics statistics
ph-iip | International Investment Position
ph-irrigation | Irrigation development and status statistics
ph-itbpm | IT-BPM / BPO industry statistics and performance
ph-lfs | Labor Force Survey (LFS)
ph-manufacturing-aspbi | Annual Survey of Philippine Business and Industry – Manufacturing
ph-mining | Mining and quarrying production statistics
ph-monetary-aggregates | Monetary aggregates and banking statistics
ph-msme | MSME establishment and structure statistics
ph-national-accounts | National Accounts of the Philippines (GDP / GRDP)
ph-ndc | Nationally Determined Contribution (NDC) and climate-policy framework
ph-nickel | Nickel production and export statistics
ph-nta | National Tax Allotment (NTA, formerly IRA) local government finance statistics
ph-ofw-stock | Overseas Filipino Workers stock and Survey on Overseas Filipinos
ph-pagasa | PAGASA tropical cyclone and weather monitoring products
ph-pdp | Philippine Development Plan (PDP) and NEDA planning framework
ph-peza | PEZA ecozone and investment statistics
ph-philhealth | PhilHealth coverage and claims statistics
ph-pop-projections | Population projections
ph-population-census | Census of Population (and related mid-year estimates)
ph-port-cebu | Port of Cebu operational statistics
ph-port-manila | Port of Manila operational statistics
ph-ports | Port and shipping statistics (cargo, containers, passengers)
ph-poverty | Official poverty statistics (and related thresholds)
ph-power-stats | Philippine Power Statistics (generation, capacity, consumption)
ph-psa | Philippine Statistics Authority (PSA) institutional core
ph-rd-statistics | Science, technology and R&D statistics
ph-remittances | Overseas Filipino cash remittances (total and by country)
ph-renewables | Renewable energy project and capacity statistics (RE Act framework)
ph-reserves | Gross International Reserves
ph-rice | Rice / palay production statistics
ph-tourism | Tourism statistics (arrivals, receipts, TDGVA)
ph-trade-partners | Merchandise trade by major partner country
ph-underemployment | Underemployment and quality-of-employment indicators (LFS)
ph-vital-stats | Vital statistics (births, deaths, marriages)
```
</details>

<details>
<summary>Vietnam — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
vn-agriculture | Agriculture, forestry and fishery production statistics
vn-aquaculture | Aquaculture and fisheries production statistics
vn-banking-system | Structure and total assets of credit institutions
vn-bop | Balance of Payments and external accounts
vn-budget-deficit | State budget deficit statistics
vn-cpi | Consumer Price Index and inflation statistics
vn-credit-growth | Credit growth and outstanding loans statistics
vn-defence-policy | National defence policy framing
vn-digital-economy | Digital economy value-added and share of GDP
vn-digital-strategy | National Digital Transformation Strategy framing
vn-ecommerce | E-commerce and digital trade component of the digital economy
vn-education-enrolment | Education enrolment and completion statistics
vn-electronics-trade | Electronics, computers and components trade statistics
vn-energy-mix | Electricity generation and energy mix statistics
vn-ethnic-minorities | Ethnic minority population and composition statistics
vn-ethnic-poverty | Ethnic minority poverty and living-standards statistics
vn-fdi | Foreign Direct Investment statistics (registered and disbursed)
vn-fdi-partners | FDI by major partner country / territory
vn-ghg | Greenhouse gas emissions inventory and statistics
vn-grdp-cantho | Can Tho Gross Regional Domestic Product
vn-grdp-danang | Da Nang Gross Regional Domestic Product
vn-grdp-hanoi | Hanoi Gross Regional Domestic Product
vn-grdp-hcmc | Ho Chi Minh City Gross Regional Domestic Product
vn-gso | General Statistics Office of Viet Nam (GSO) institutional core
vn-health-insurance | Health insurance coverage statistics
vn-higher-education | Higher education and technical qualifications statistics
vn-iip | Index of Industrial Production (IIP)
vn-labour | Labour force and employment statistics
vn-literacy-education-stock | Literacy and educational attainment of the population
vn-logistics-framing | National logistics and multimodal connectivity framing
vn-monetary-indicators | Monetary aggregates and key SBV monetary indicators
vn-national-accounts | National Accounts of Viet Nam (GDP)
vn-ndc | Nationally Determined Contribution (NDC) and climate-policy framework
vn-npl | Non-performing loans and asset-quality statistics
vn-pdp8 | National Power Development Plan (PDP) framework
vn-policy-banks | Policy and development banking institutions (VBSP and related)
vn-population | Population and housing census / mid-year population estimates
vn-port-haiphong | Hai Phong port operational statistics
vn-port-hcmc-caimep | Ho Chi Minh City / Cai Mep port complex operational statistics
vn-poverty | Poverty and living standards survey statistics
vn-public-debt | Public debt and government debt statistics
vn-rice | Rice production statistics
vn-sbv | State Bank of Vietnam (SBV) institutional and reporting core
vn-seaport-throughput | National seaport cargo and container throughput statistics
vn-social-insurance | Social insurance and unemployment insurance coverage
vn-state-budget | State budget revenue and expenditure statistics
vn-state-owned-banks | State-owned commercial banks (SOCBs) statistics
vn-tourism | International visitor arrivals and tourism statistics
```
</details>

<details>
<summary>Thailand — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
th-agriculture | Agriculture production statistics
th-asean-trade | ASEAN merchandise trade statistics
th-banking-system | Banking system structure and credit statistics
th-bop | Balance of Payments and external accounts
th-bot | Bank of Thailand (BOT) institutional and reporting core
th-cpi | Consumer Price Index and inflation statistics
th-education | Education enrolment and attainment statistics
th-grdp-bangkok | Bangkok Gross Regional / Provincial Product
th-grdp-chiangmai | Chiang Mai Gross Provincial Product
th-grdp-chonburi | Chonburi Gross Provincial Product
th-grdp-phuket | Phuket Gross Provincial Product
th-grdp-rayong | Rayong Gross Provincial Product
th-health | Life expectancy and vital statistics
th-industrial-production | Industrial production and manufacturing statistics
th-labour | Labour force and unemployment statistics
th-national-accounts | National Accounts of Thailand (GDP)
th-npl | Non-performing loans and banking asset-quality statistics
th-nso | National Statistical Office of Thailand (NSO) institutional core
th-population | Population census and estimates
th-poverty | Poverty and living standards statistics
th-power | Electricity generation and capacity statistics
th-public-debt | Public debt statistics
th-rice | Rice production and export statistics
th-rubber | Natural rubber production and export statistics
th-tourism | Tourism arrivals and tourism revenue statistics
```
</details>

<details>
<summary>Myanmar — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
mm-agriculture | Agriculture production statistics
mm-bop | Balance of Payments and external accounts
mm-border-trade | Border trade statistics and framing
mm-cpi | Consumer Price Index and inflation statistics
mm-cso | Central Statistical Organization (CSO) institutional core
mm-displacement | Internal displacement and humanitarian needs statistics
mm-education | Education and learning outcomes framing
mm-exchange-rate | Exchange-rate regime and parallel-market statistics
mm-fiscal | Fiscal balance and budget deficit statistics
mm-gas | Natural gas production and export statistics
mm-labour | Labour force and employment statistics
mm-national-accounts | National Accounts of Myanmar (GDP)
mm-population | Population census and estimates
mm-poverty | Poverty and living standards statistics
mm-rare-earths | Rare earths and critical minerals production framing
mm-rice | Rice production and area statistics
```
</details>
