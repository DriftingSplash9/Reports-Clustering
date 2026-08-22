# Prompt for Grok — domestic wiring — Indonesia

**Attach:** `id-indonesia-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

Indonesia is our single biggest unlinked-node problem: **113 of its 118 nodes (96%) have zero edges.** The 2026-08-20 mint gave Indonesia a lot of real candidate reports — BPS (Badan Pusat Statistik) releases, Bank Indonesia balance-of-payments and monetary data, trade agreements (IJEPA, IA-CEPA, IEU-CEPA, RCEP, AANZFTA, the BIT network) — but almost none of them were ever connected to each other or to an international standard.

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "Indonesia" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of the existing international/standard ids listed further down, OR — if the dependency genuinely involves something not in either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't in these lists; that has broken every round so far.

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

Likely angles: BPS's CPI/national-accounts releases naming an SNA edition or COICOP version; Bank Indonesia's BOP data citing BPM6; the FTA/CEPA nodes (`id-ijepa`, `id-aanzfta`, `id-iacepa`, `id-ieu-cepa`, `id-rcep`, `id-asean`, `id-bit-network`, `id-fta-network`) likely relate to Indonesia's trade-statistics releases as the legal/institutional basis being cited — check whether any BPS trade release names these agreements. Don't force a connection that isn't real; a genuinely standalone trade-agreement node with no statistical report to attach to is a fine "no edge found" answer.

**Honesty permission, as always: if you search and find nothing solid connecting two nodes, say so and move on — an explicit "no real dependency found between X and Y" is a correct and useful answer.** We would rather have 10 solid edges than 40 shaky ones. Primary documents only — the agency's own methodology notes, the treaty/agreement text itself, an IMF Article IV statistical annex, a national statistics office's own publication. No third-party scorecards (ODIN etc.) as citations — they're leads to chase, not sources to cite.

## How to reply

One JSON object: `dependencies` array, each entry `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }` — `evidence_quote` must name the specific country/agency and state the specific claim the edge makes (not a generic sentence that could apply to five other countries). Proposed new nodes (if any) go in a separate `proposed_reports` array with `proposed_id` (a sensible new id, not colliding with anything on the lists below), `kind` (domestic/international), `title`, `publisher`, `url`, `description`, `publication_cadence`. We raw-verify every quote before anything is minted, same as always.

## Node lists

<details>
<summary>Indonesia — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
id-agriculture-stats | Agricultural statistics (production, food crops, estate crops)
id-anticorruption | National Strategy for Corruption Prevention (Stranas PK) and integrity framework
id-apbn | State Budget (APBN) realization and fiscal statistics
id-asset-declaration | Asset-declaration and conflict-of-interest regulatory regime
id-bank-indonesia | Bank Indonesia – central bank statistical and policy publications
id-bnpb | BNPB – National Disaster Management Authority
id-bop | Balance of Payments and International Investment Position
id-bpjs-kesehatan | BPJS Kesehatan / Jaminan Kesehatan Nasional (JKN) coverage statistics
id-bps | BPS – Statistics Indonesia (Badan Pusat Statistik)
id-coal | Coal production and export statistics
id-commodity-partner-matrix | Commodity × destination trade patterns (palm oil, coal, nickel, manufactures)
id-construction | Construction in Figures / construction sector statistics
id-cpi | Consumer Price Index (Indeks Harga Konsumen – IHK)
id-cpi-provincial | Consumer Price Index of 38 Provinces
id-crime-stats | Crime Statistics (Statistik Kriminal)
id-customs-tariff | Customs, tariff and trade-facilitation regime
id-dau-dak | Fiscal equalisation transfers (DAU, DAK, DBH)
id-defence-budget | Defence budget and military expenditure statistics
id-defence-posture | Defence and security policy framing (archipelagic posture)
id-deforestation | Deforestation rate statistics (gross and net)
id-democracy-index | Indonesia Democracy Index (IDI)
id-digital-economy | Digital-economy and ICT indicators (broader)
id-disaster-occurrence | Disaster occurrence and impact statistics (by type and year)
id-disaster-risk-index | Indonesian Disaster Risk Index (IRBI)
id-domestic-investment | Domestic investment realization statistics
id-ecommerce | E-Commerce Statistics
id-economic-report-indonesia | Economic Report on Indonesia (Laporan Perekonomian Indonesia – LPI)
id-education-stats | Statistics of Education
id-electricity-mix | Electricity generation by source / power-plant type
id-energy-balance-detail | Energy Balance of Indonesia (detailed production–consumption)
id-energy-balances | Energy Balances of Indonesia
id-environmental-stats | Broader environmental statistics (water, waste, air — where published by BPS or ministries)
id-ethnic-groups | Profile of Ethnic Groups (Long Form Population Census 2020)
id-export-partners | Export statistics by country of destination (major partners)
id-external-debt | External debt statistics
id-fdi-realization | Foreign Direct Investment realization statistics
id-financial-inclusion | Financial-inclusion statistics
id-financial-stability-review | Financial Stability Review (Bank Indonesia)
id-fisheries-production | Fisheries production statistics (capture and aquaculture)
id-fishing-ports | Statistics of Fishing Ports
id-foreign-trade-exports | Indonesia Foreign Trade Statistics – Exports
id-foreign-trade-imports | Indonesia Foreign Trade Statistics – Imports
id-forest-cover | Forest cover and land-cover statistics
id-ftz | Free Trade and Free Port Zones (KPBPB / FTZ) — Batam, Bintan, Karimun, Sabang
id-fx-reserves | Foreign-exchange reserves statistics
id-gas-production | Natural gas production statistics
id-gender-stats | Women and Men in Indonesia
id-geothermal | Geothermal power and renewable generation statistics
id-ghg-inventory | Greenhouse-gas inventory and physical supply-use for emissions
id-gini-inequality | Inequality statistics (Gini ratio and related)
id-government-accounts | General Government Accounts of Indonesia
id-health-facilities | Health facilities statistics (hospitals, puskesmas by province)
id-health-profile | Health Statistics Profile
id-health-stats | Health and vital statistics (beyond census)
id-ikn-framework | Nusantara Capital City (IKN) legal and planning framework
id-ikn-population | Nusantara Capital City (IKN) population enumeration statistics
id-informal-employment | Informal employment proportion statistics (by province)
id-interisland-trade | Inter-island trade volume and value (selected commodity series)
id-internal-migration | Internal migration and urbanisation statistics
id-interprovincial-trade | Inter-provincial / inter-regional trade statistics (Perdagangan Antar Wilayah)
id-islamic-finance | Islamic / Sharia finance statistics (banking, capital market, non-bank)
id-jakarta | DKI Jakarta – capital special region
id-java-central | Central Java (Jawa Tengah) provincial and Magelang-context profile
id-java-east | East Java (Jawa Timur) provincial and Malang-context profile
id-java-municipal | Selected Java municipal statistical system (Dalam Angka series)
id-java-west | West Java (Jawa Barat) provincial and major municipal statistical profile
id-labour-productivity | Labour productivity and related indicators
id-land-use-change | Land-use and land-cover change statistics linked to agriculture and estates
id-local-government-finance | District/City Government Finance Statistics (Statistik Keuangan Pemerintah Kabupaten/Kota)
id-magelang | Kota Magelang / Kabupaten Magelang local statistics (Dalam Angka)
id-major-ports | Major Indonesian ports system (Belawan, Makassar, and others)
id-malang | Kota Malang / Kabupaten Malang local statistics (Dalam Angka)
id-manufacturing-directory | Directory of Manufacturing Industry (Direktori Industri Manufaktur)
id-manufacturing-ipi | Monthly Production Index of Large and Medium Manufacturing
id-marine-coastal | Statistics of Marine and Coastal Resources
id-mining-stats | Mining and quarrying statistics (broader)
id-monetary-aggregates | Monetary aggregates and banking statistics (Bank Indonesia)
id-msme-broader | Broader MSME / micro-enterprise statistics and policy framing
id-msme-manufacturing | Micro and small manufacturing industry statistics
id-national-accounts | National Accounts / GDP statistics (PDB)
id-ndc-climate | Nationally Determined Contribution (NDC) and climate-policy framework
id-nickel | Nickel and downstream mineral statistics
id-oil-production | Crude oil and condensate production statistics
id-ojk | OJK – Financial Services Authority institutional and statistical role
id-own-source-revenue | Subnational own-source revenue (PAD) statistics and capacity
id-palm-oil | Palm-oil production and estate-crop statistics
id-pdrb | Provincial GDP (PDRB – Produk Domestik Regional Bruto)
id-podes | Village Potential Statistics (Podes)
id-population-census | Population Census (Sensus Penduduk) and Long Form results
id-population-projections | Population projections (Indonesia 2020–2050 and related)
id-poverty | Poverty statistics (official poverty line and incidence)
id-producer-prices | Producer Price Index / Wholesale Price statistics
id-provinces-structure | Provincial administrative structure (38 provinces) and island counts
id-reforestation | Reforestation / forest and land rehabilitation statistics
id-regional-languages | Regional language diversity statistics (Long Form SP2020)
id-religion-composition | Religious composition statistics (Islam, Christianity, Hinduism, Buddhism, etc.)
id-rice-paddy | Paddy and rice production statistics by province
id-rpjmn | National Medium-Term Development Plan (RPJMN) — statistical targets and monitoring
id-sakernas | National Labour Force Survey (Sakernas)
id-sea-transport | Sea Transportation Statistics
id-sez | Special Economic Zones (KEK) statistics and regulatory framework
id-social-protection | Social-protection programme statistics (PKH, food assistance, and related)
id-sski | Indonesia Financial System Statistics (SSKI)
id-statistical-yearbook | Statistical Yearbook of Indonesia (Statistik Indonesia)
id-susenas | National Socio-Economic Survey (Susenas)
id-tanjung-perak | Tanjung Perak Port operational statistics
id-tanjung-priok | Tanjung Priok Port operational statistics
id-tax-ratio | Tax-to-GDP ratio and fiscal capacity indicators
id-tax-revenues | Tax revenue structure and actual government revenues
id-tertiary-ger | Gross Enrolment Ratio in tertiary education by province
id-tourism-attractions | Tourism attraction / object statistics
id-tourism-domestic | Domestic Tourism Statistics (Wisatawan Nusantara)
id-transport-multimodal | Domestic multimodal transport statistics (sea, air, rail, river/ferry)
id-victimisation | Crime victimisation and reporting-rate statistics
id-volcano-earthquake | Volcanic and earthquake / tsunami hazard and event statistics
id-water-resources | Water resources and irrigation / agricultural water indicators
id-water-supply | Water Supply Statistics
id-welfare-indicators | Welfare Indicators (Indikator Kesejahteraan Rakyat)
```
</details>
