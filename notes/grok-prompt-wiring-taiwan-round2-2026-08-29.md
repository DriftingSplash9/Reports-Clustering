# Prompt for Grok — domestic wiring — Taiwan, round 2

**Standing rules:** see `GROKREADME.md` (in `notes/grok-research-queue-2026-08-22/`) — attach/paste it alongside this file every time.

**Attach:** `GROKREADME.md`, `tw-taiwan-grok-2026-08.json` (both under `src/data/research/`). Full id/title list also pasted below.

Paste everything below the line.

---

This is round 2 on Taiwan. Round 1 (2026-08-28, plus a same-day Grok follow-up) closed 10 edges: MAC's Cross-Strait Economic Statistics compilation citing Trade Statistics and the Investment Commission by name (`uses_data_from`), tourism citing tourism statistics, and a handful of international-standard bridges (`imf-sdds`, `who-icd-10`, `isic`, `un-coicop-2018`). **Two leads are confirmed dead ends — don't re-raise them**: `tw-price-detail -> un-coicop-2018` (DGBAS's own CPI metadata still describes the traditional 7-category basket, not COICOP) and `tw-fx-reserves -> imf-bpm6` (CBC's own SDDS page states outright "Documentation on the methodology is not available").

**Current state, freshly measured 2026-08-29: 91 of Taiwan's 122 corpus nodes (75%) still have zero edges** (the last-stated "80/108" was stale — several 08-29 rounds elsewhere added nodes faster than they wired them; this is the real current number).

**Ids — use ONLY ids from the list below, or propose a new node.** Copy ids character-for-character. Use GROKREADME.md's standard international ids where relevant, or propose a new node (title, publisher, exact URL, description, cadence) in `proposed_reports` if the dependency needs something not on either list. Never invent an id.

## The ask

Find real, citable **domestic** dependency edges among the nodes below. Untried angles worth checking first:
- **Cross-strait/China cluster** (`tw-ecfa`, `tw-ecfa-early-harvest`, `tw-ecfa-legal`, `tw-outbound-investment-china`, `tw-investment-geography-china`, `tw-inward-investment-china`, `tw-cross-strait-trade-share`, `tw-cross-strait-finance`, `tw-fta-network`, `tw-anztec`, `tw-astep`, `tw-eu-tid`, `tw-us-taiwan-21st-century`, `tw-tifa`, `tw-taiwan-relations-act-context`, `tw-export-controls-alignment`, `tw-new-southbound-tech`) — MAC (the Mainland Affairs Council) is the obvious institutional home for the cross-strait investment/trade series specifically; check whether its Cross-Strait Economic Statistics (already the source for two live edges) or a dedicated MAC investment-statistics page names any of these.
- **Semiconductor/science-park cluster** (`tw-ai-demand-concentration`, `tw-fiscal-semiconductor`, `tw-semiconductor-industry-stats`, `tw-industrial-water-semiconductor`, `tw-science-park-geography`, `tw-science-parks`, `tw-science-parks-revenue`, `tw-hsinchu-science-park`, `tw-southern-science-park`, `tw-industrial-innovation-act`, `tw-semiconductor-trade`, `tw-semiconductor-employment`, `tw-electronics-components-production`, `tw-computers-optical-production`, `tw-ai-demand-impact`, `tw-land-use-industrial`) — DGBAS's industrial-production or the Science Parks Administration's own statistics likely feed several of these.
- **Defence/security cluster** (`tw-whole-of-society-resilience`, `tw-civil-defense-personnel`, `tw-defense-budget`, `tw-national-defense-report`, `tw-indigenous-naval-shipbuilding`, `tw-us-arms-sales-fms`, `tw-defense-industry-stats`, `tw-asymmetric-force-budget`, `tw-military-personnel`, `tw-sipri-arms-transfers`, `tw-cybersecurity-c4isr`, `tw-strategic-material-reserves`, `tw-lng-energy-security`) — the National Defense Report is the obvious aggregator; check whether it or the Ministry of National Defense's budget documents cite the others.
- **Indigenous/language cluster** (`tw-indigenous-population`, `tw-indigenous-geography`, `tw-plains-indigenous-status`, `tw-hakka-status`, `tw-national-languages`, `tw-language-use`, `tw-cultural-institutions`) — likely all draw on census/household-registration data already in the corpus.
- **Water/environment cluster** (`tw-water-resources`, `tw-industrial-water-semiconductor`, `tw-reservoir-drought`, `tw-air-quality`, `tw-environmental-quality-local`, `tw-protected-areas`) — check for cross-citation among these and against the semiconductor cluster (water demand is a named constraint on fab expansion).

Don't force a connection that isn't real — a standalone node with no statistical report to attach to is a fine "no edge found" answer.

## Node list — 91 currently unlinked Taiwan nodes

```
tw-ecfa-early-harvest | ECFA Early Harvest List execution statistics (goods and services)
tw-ecfa-legal | Cross-Strait Economic Cooperation Framework Agreement (ECFA) — legal instrument
tw-outbound-investment-china | Taiwan outbound investment to Mainland China — flow and stock statistics
tw-investment-geography-china | Geographic distribution of Taiwanese investment in Mainland China
tw-inward-investment-china | Mainland Chinese investment in Taiwan — approved cases and amounts
tw-cross-strait-trade-share | Cross-strait trade share of Taiwan's total trade (exports and imports)
tw-cross-strait-finance | Cross-strait financial and banking linkages (where statistically tracked)
tw-ai-demand-concentration | AI / HPC demand concentration on Taiwan manufacturing
tw-whole-of-society-resilience | Whole-of-Society Defense Resilience Committee / All-Out Defense Mobilization statistics
tw-civil-defense-personnel | Civil defense personnel registration and training statistics
tw-lng-energy-security | LNG imports, natural-gas supply and energy-security statistics
tw-fiscal-semiconductor | Fiscal and tax revenue links to semiconductor / electronics sector
tw-cybersecurity-c4isr | Cybersecurity, information resilience and C4ISR statistics / programmes
tw-strategic-material-reserves | Strategic material and food-reserve statistics
tw-eu-tid | EU–Taiwan Trade and Investment Dialogue (TID)
tw-labor-shortage-projections | Labour-shortage and skill-mismatch projections (NDC / Ministry of Labor)
tw-child-family-policy-response | Family / child policy responses linked to fiscal capacity from high-tech growth
tw-local-income-rankings | County and city household disposable-income rankings
tw-science-park-geography | Science-park geographic system (Hsinchu, Central, Southern and related sites)
tw-indigenous-population | Indigenous peoples population statistics
tw-indigenous-geography | Indigenous population by county / city (Hualien, Taoyuan, Taitung concentrations)
tw-plains-indigenous-status | Plains Indigenous (Pingpu) status recognition and registration framework
tw-foreign-residents-local | Foreign residents by region / nationality statistics
tw-water-resources | Water resources and water-use statistics (domestic, industrial, agricultural)
tw-industrial-water-semiconductor | Industrial water demand and semiconductor-related water constraint indicators
tw-reservoir-drought | Reservoir storage, drought and water-rationing statistics
tw-land-use-industrial | Industrial and science-park land-use / land-availability statistics
tw-air-quality | Air quality and air-pollution statistics (AQI, PM2.5, pollutant concentrations)
tw-language-use | Language-use statistics (Mandarin, Hoklo/Taiwanese, Hakka, Indigenous languages)
tw-hakka-status | Hakka language and Hakka Affairs Council framework
tw-national-languages | National languages legal and policy framework (Mandarin, Hoklo, Hakka, Indigenous)
tw-local-taxable-income | County and city consolidated taxable income / tax statistics
tw-local-government-finance | Local government finance and special-account / fund statistics
tw-environmental-quality-local | Local environmental quality variation (air, water, waste) by region
tw-cultural-institutions | Cultural and language institutional statistics (Hakka Affairs Council, Council of Indigenous Peoples, cultural budgets)
tw-semiconductor-industry-stats | Semiconductor / IC industry production and structure statistics
tw-vital-statistics-fertility | Vital Statistics — births, total fertility rate, crude birth rate
tw-super-aged | Super-aged society indicators (65+ share ≥ 20%)
tw-ecfa | Cross-Strait Economic Cooperation Framework Agreement (ECFA)
tw-anztec | Agreement between New Zealand and the Separate Customs Territory of Taiwan, Penghu, Kinmen and Matsu on Economic Cooperation (ANZTEC)
tw-astep | Agreement between Singapore and the Separate Customs Territory of Taiwan, Penghu, Kinmen and Matsu on Economic Partnership (ASTEP)
tw-fta-network | Taiwan's FTA / ECA network overview
tw-population-projections | Population Projections
tw-export-orders | Export Orders statistics
tw-science-parks | Science Park / Hsinchu and related high-tech cluster statistics
tw-fx-reserves | Foreign Exchange Reserves
tw-long-term-care | Long-Term Care services and statistics (Long-Term Care Services Act framework)
tw-energy-statistics | Energy Statistics Handbook / Energy balance and electricity generation mix
tw-nuclear-status | Nuclear power status and phase-out / life-extension policy statistics
tw-construction-housing | Construction and housing statistics
tw-education-statistics | Education statistics (enrolment, schools, attainment)
tw-rd-statistics | National R&D Expenditure and Personnel Statistics
tw-sme-statistics | SME / Small and Medium Enterprise statistics
tw-health-statistics | Health and medical statistics (beyond long-term care)
tw-agriculture-statistics | Agriculture, forestry and fishery statistics
tw-banking-statistics | Banking sector statistics (loans, deposits, soundness)
tw-insurance-statistics | Insurance sector statistics (life and non-life)
tw-securities-statistics | Securities and capital-market statistics
tw-justice-crime | Crime and justice statistics
tw-environment-broader | Broader environmental statistics (air, water, waste, protected areas)
tw-population-migration | Internal migration and household registration statistics
tw-external-debt | External debt statistics
tw-digital-ict-stats | Digital / ICT industry and computer & information services statistics
tw-earnings-structure | Earnings structure / salary statistics (share below average, industry differentials)
tw-protected-areas | Protected areas / biodiversity conservation statistics
tw-foreign-workers | Foreign / migrant worker statistics
tw-labor-insurance-pension | Labor Insurance and Labor Pension statistics
tw-science-tech-policy | Science and technology policy white papers / National Science and Technology Council strategic documents
tw-price-detail | Detailed price statistics (CPI components, housing-related prices)
tw-electronics-components-production | Electronic Components Industry — Production, Sales and Inventory statistics
tw-computers-optical-production | Computers, Electronic & Optical Products Industry production statistics
tw-science-parks-revenue | Science Parks aggregate revenue, employment and firm statistics (Hsinchu, Central, Southern)
tw-hsinchu-science-park | Hsinchu Science Park detailed statistics
tw-southern-science-park | Southern Taiwan Science Park statistics and semiconductor expansion
tw-industrial-innovation-act | Act for Industrial Innovation (產業創新條例) — including 'Taiwan Chip Act' provisions (Art. 10-2 etc.)
tw-semiconductor-trade | Semiconductor and electronic-components trade statistics (exports / imports by detailed HS)
tw-semiconductor-employment | Semiconductor / electronics employment and wage statistics
tw-us-taiwan-21st-century | United States–Taiwan Initiative on 21st-Century Trade (first agreement)
tw-tifa | US–Taiwan Trade and Investment Framework Agreement (TIFA) Council
tw-taiwan-relations-act-context | Taiwan Relations Act (US) — economic and security context for AIT–TECRO framework
tw-ai-demand-impact | AI-related demand impact on Taiwan semiconductor production and export statistics
tw-export-controls-alignment | Export-control and technology-security alignment with the United States
tw-new-southbound-tech | New Southbound Policy — technology and semiconductor diplomacy components
tw-defense-budget | National Defense Budget (Ministry of National Defense)
tw-national-defense-report | National Defense Report (國防報告書)
tw-indigenous-naval-shipbuilding | Indigenous naval shipbuilding statistics and programmes (Tuo Chiang-class corvettes, Indigenous Defense Submarine, light frigates)
tw-us-arms-sales-fms | US Foreign Military Sales / arms-sale notifications and backlog to Taiwan
tw-defense-industry-stats | Domestic defence-industry and military-investment statistics
tw-asymmetric-force-budget | Special budgets for asymmetric force and defence resilience
tw-military-personnel | Military personnel and manpower statistics
tw-sipri-arms-transfers | SIPRI arms-transfer statistics for Taiwan (imports)
```
