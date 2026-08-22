# Prompt for Grok — domestic wiring — Taiwan

**Attach:** `tw-taiwan-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

Taiwan is our second-biggest unlinked problem: **91 of 108 nodes (84%) have zero edges.** A huge share of Taiwan's corpus is US–Taiwan and cross-strait trade/security instruments (ECFA, TIFA, the AIT–TECRO agreements, US arms sales, SIPRI data) that never got wired to Taiwan's own statistical releases (DGBAS national accounts, customs statistics, etc.) or to each other.

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "Taiwan" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of the existing international/standard ids listed further down, OR — if the dependency genuinely involves something not in either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't in these lists; that has broken every round so far.

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

Likely angles: does DGBAS's own CPI or national-accounts methodology name an SNA edition or COICOP version? Do Taiwan's trade statistics releases cite ECFA or the various FTA/ECA instruments (`tw-ecfa`, `tw-ecfa-legal`, `tw-anztec`, `tw-astep`, `tw-fta-network`) as the tariff/customs regime in force? The US arms-sales and SIPRI nodes (`tw-us-arms-sales-fms`, `tw-sipri-arms-transfers`) may simply be standalone context with no real statistical dependency — an honest "no edge" there is fine.

**Honesty permission, as always: if you search and find nothing solid connecting two nodes, say so and move on — an explicit "no real dependency found between X and Y" is a correct and useful answer.** We would rather have 10 solid edges than 40 shaky ones. Primary documents only — the agency's own methodology notes, the treaty/agreement text itself, an IMF Article IV statistical annex, a national statistics office's own publication. No third-party scorecards (ODIN etc.) as citations — they're leads to chase, not sources to cite.

## How to reply

One JSON object: `dependencies` array, each entry `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }` — `evidence_quote` must name the specific country/agency and state the specific claim the edge makes (not a generic sentence that could apply to five other countries). Proposed new nodes (if any) go in a separate `proposed_reports` array with `proposed_id` (a sensible new id, not colliding with anything on the lists below), `kind` (domestic/international), `title`, `publisher`, `url`, `description`, `publication_cadence`. We raw-verify every quote before anything is minted, same as always.

## Node lists

<details>
<summary>Taiwan — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
tw-agriculture-statistics | Agriculture, forestry and fishery statistics
tw-ai-demand-concentration | AI / HPC demand concentration on Taiwan manufacturing
tw-ai-demand-impact | AI-related demand impact on Taiwan semiconductor production and export statistics
tw-air-quality | Air quality and air-pollution statistics (AQI, PM2.5, pollutant concentrations)
tw-asymmetric-force-budget | Special budgets for asymmetric force and defence resilience
tw-banking-statistics | Banking sector statistics (loans, deposits, soundness)
tw-bop | Balance of Payments
tw-business-demography | Business demography / establishment and enterprise statistics
tw-cbc | Central Bank of the Republic of China (Taiwan) — institutional role and statistical publications
tw-child-family-policy-response | Family / child policy responses linked to fiscal capacity from high-tech growth
tw-civil-defense-personnel | Civil defense personnel registration and training statistics
tw-climate-change-act | Climate Change Response Act
tw-computers-optical-production | Computers, Electronic & Optical Products Industry production statistics
tw-construction-housing | Construction and housing statistics
tw-cpi | Consumer Price Index (CPI)
tw-cross-strait-finance | Cross-strait financial and banking linkages (where statistically tracked)
tw-cross-strait-stats | Cross-Strait Economic Relations Statistics (Mainland Affairs Council)
tw-cross-strait-trade-share | Cross-strait trade share of Taiwan’s total trade (exports and imports)
tw-cultural-institutions | Cultural and language institutional statistics (Hakka Affairs Council, Council of Indigenous Peoples, cultural budgets)
tw-cybersecurity-c4isr | Cybersecurity, information resilience and C4ISR statistics / programmes
tw-defense-budget | National Defense Budget (Ministry of National Defense)
tw-defense-industry-stats | Domestic defence-industry and military-investment statistics
tw-dgbas | Directorate-General of Budget, Accounting and Statistics (DGBAS) / National Statistics system
tw-digital-ict-stats | Digital / ICT industry and computer & information services statistics
tw-earnings-structure | Earnings structure / salary statistics (share below average, industry differentials)
tw-ecfa-early-harvest | ECFA Early Harvest List execution statistics (goods and services)
tw-education-statistics | Education statistics (enrolment, schools, attainment)
tw-electronics-components-production | Electronic Components Industry — Production, Sales and Inventory statistics
tw-energy-statistics | Energy Statistics Handbook / Energy balance and electricity generation mix
tw-environment-broader | Broader environmental statistics (air, water, waste, protected areas)
tw-environmental-quality-local | Local environmental quality variation (air, water, waste) by region
tw-export-controls-alignment | Export-control and technology-security alignment with the United States
tw-export-orders | Export Orders statistics
tw-external-debt | External debt statistics
tw-financial-stability | Financial Stability Report / banking and systemic-risk statistics
tw-fiscal-semiconductor | Fiscal and tax revenue links to semiconductor / electronics sector
tw-foreign-residents-local | Foreign residents by region / nationality statistics
tw-foreign-workers | Foreign / migrant worker statistics
tw-fx-reserves | Foreign Exchange Reserves
tw-ghg-inventory | National Greenhouse Gas Inventory Report
tw-hakka-status | Hakka language and Hakka Affairs Council framework
tw-health-statistics | Health and medical statistics (beyond long-term care)
tw-household-income-expenditure | Family Income and Expenditure Survey / Household income statistics
tw-hsinchu-science-park | Hsinchu Science Park detailed statistics
tw-indigenous-geography | Indigenous population by county / city (Hualien, Taoyuan, Taitung concentrations)
tw-indigenous-naval-shipbuilding | Indigenous naval shipbuilding statistics and programmes (Tuo Chiang-class corvettes, Indigenous Defense Submarine, light frigates)
tw-indigenous-population | Indigenous peoples population statistics
tw-industrial-innovation-act | Act for Industrial Innovation (產業創新條例) — including ‘Taiwan Chip Act’ provisions (Art. 10-2 etc.)
tw-industrial-production | Industrial Production Index
tw-industrial-water-semiconductor | Industrial water demand and semiconductor-related water constraint indicators
tw-input-output | Input-Output Tables / Inter-industry relations
tw-insurance-statistics | Insurance sector statistics (life and non-life)
tw-investment-commission | Outbound and inbound investment statistics (Investment Commission)
tw-investment-geography-china | Geographic distribution of Taiwanese investment in Mainland China
tw-inward-investment-china | Mainland Chinese investment in Taiwan — approved cases and amounts
tw-justice-crime | Crime and justice statistics
tw-labor-insurance-pension | Labor Insurance and Labor Pension statistics
tw-labor-shortage-projections | Labour-shortage and skill-mismatch projections (NDC / Ministry of Labor)
tw-labour-force | Manpower Survey / Labour Force statistics
tw-labour-productivity | Labour productivity and unit labour cost statistics
tw-land-use-industrial | Industrial and science-park land-use / land-availability statistics
tw-language-use | Language-use statistics (Mandarin, Hoklo/Taiwanese, Hakka, Indigenous languages)
tw-lng-energy-security | LNG imports, natural-gas supply and energy-security statistics
tw-local-government-finance | Local government finance and special-account / fund statistics
tw-local-income-rankings | County and city household disposable-income rankings
tw-local-taxable-income | County and city consolidated taxable income / tax statistics
tw-long-term-care | Long-Term Care services and statistics (Long-Term Care Services Act framework)
tw-mac-cross-strait-monthly | Cross-Strait Economic Statistics Monthly / MAC compilation
tw-military-personnel | Military personnel and manpower statistics
tw-minimum-wage | Minimum wage / basic wage framework and adjustments
tw-monetary-aggregates | Monetary Aggregates (M1B, M2) and Financial Conditions
tw-national-accounts | National Accounts (System of National Accounts)
tw-national-defense-report | National Defense Report (國防報告書)
tw-national-health-insurance | National Health Insurance statistics
tw-national-languages | National languages legal and policy framework (Mandarin, Hoklo, Hakka, Indigenous)
tw-national-statistics-portal | National Statistics portal / statistical dissemination system
tw-new-southbound-tech | New Southbound Policy — technology and semiconductor diplomacy components
tw-nuclear-status | Nuclear power status and phase-out / life-extension policy statistics
tw-outbound-investment-china | Taiwan outbound investment to Mainland China — flow and stock statistics
tw-people-exchanges | Cross-strait people-exchange and visitor statistics
tw-plains-indigenous-status | Plains Indigenous (Pingpu) status recognition and registration framework
tw-population-census | Population and Housing Census / Population statistics
tw-population-migration | Internal migration and household registration statistics
tw-population-projections | Population Projections
tw-ppi-wpi | Producer Price Index / Wholesale Price Index
tw-price-detail | Detailed price statistics (CPI components, housing-related prices)
tw-protected-areas | Protected areas / biodiversity conservation statistics
tw-rd-statistics | National R&D Expenditure and Personnel Statistics
tw-reservoir-drought | Reservoir storage, drought and water-rationing statistics
tw-science-park-geography | Science-park geographic system (Hsinchu, Central, Southern and related sites)
tw-science-parks | Science Park / Hsinchu and related high-tech cluster statistics
tw-science-parks-revenue | Science Parks aggregate revenue, employment and firm statistics (Hsinchu, Central, Southern)
tw-science-tech-policy | Science and technology policy white papers / National Science and Technology Council strategic documents
tw-securities-statistics | Securities and capital-market statistics
tw-semiconductor-employment | Semiconductor / electronics employment and wage statistics
tw-semiconductor-industry-stats | Semiconductor / IC industry production and structure statistics
tw-semiconductor-trade | Semiconductor and electronic-components trade statistics (exports / imports by detailed HS)
tw-sme-statistics | SME / Small and Medium Enterprise statistics
tw-southern-science-park | Southern Taiwan Science Park statistics and semiconductor expansion
tw-statistics-act | Statistics Act (統計法)
tw-strategic-material-reserves | Strategic material and food-reserve statistics
tw-super-aged | Super-aged society indicators (65+ share ≥ 20 %)
tw-tourism-statistics | Tourism statistics (inbound / outbound)
tw-trade-statistics | Trade Statistics (Customs-based merchandise trade)
tw-vital-statistics-fertility | Vital Statistics — births, total fertility rate, crude birth rate
tw-wage-structure | Wage and salary statistics / Earnings survey
tw-water-resources | Water resources and water-use statistics (domestic, industrial, agricultural)
tw-whole-of-society-resilience | Whole-of-Society Defense Resilience Committee / All-Out Defense Mobilization statistics
```
</details>
