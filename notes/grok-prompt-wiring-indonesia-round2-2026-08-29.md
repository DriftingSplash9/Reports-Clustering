# Prompt for Grok — domestic wiring — Indonesia, round 2

**Standing rules:** see `GROKREADME.md` (in `notes/grok-research-queue-2026-08-22/`) — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `id-indonesia-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

This is round 2 on Indonesia. Round 1 (2026-08-28) closed 18 edges across a handful of angles — mainly Susenas/Sakernas/Podes/the population census feeding BPS's welfare, education, crime and health products (`uses_data_from`), a few SDDS citations (`id-fx-reserves`, `id-external-debt`, `id-monetary-aggregates` → `imf-sdds`), and some methodology bridges (`id-government-accounts` → `sna-2008`, `id-manufacturing-ipi` → `isic`, `id-ojk` → `bis-basel-framework`, `id-environmental-stats` → a newly-minted `un-fdes-2013` node). **Don't re-propose any of those — they're already live.** Two leads from round 1 are still open and worth another attempt, listed first below.

**Current state, freshly measured, not the stale figure from the original queue prompt: 98 of Indonesia's 126 corpus nodes (78%) still have zero edges.** (The original prompt said "113 of 118" — both numbers are out of date; the corpus has grown since. Use the list below, not either old figure.)

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of GROKREADME.md's standard international ids, OR — if the dependency genuinely involves something not on either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't on one of those lists.

## Two reopened leads from round 1 — try these first

1. **`id-gini-inequality` → `id-susenas`** (expected `uses_data_from`). Almost certainly true — BPS's other welfare products (welfare indicators, education stats, crime stats, health profile) all confirmed Susenas as their source this same round — but BPS's own methodology/concept pages for the Gini ratio specifically (sirusa metadata, indicator concept pages, press releases) are JS-rendered and returned nothing fetchable last round. Find a working copy — a press release methodology footnote, a PDF version of the sirusa page, BPS's Statistical Yearbook glossary — that states Susenas as the Gini ratio's source, and quote it verbatim with a URL.
2. **`id-labour-productivity` → `icls-work-statistics-resolution`** (expected `methodology_depends_on` or `cites`). A third-party source says Sakernas has followed ICLS-13/ICLS-19 concepts since 2016, and one BPS press release references an "ILO standard" generically, but no BPS-primary sentence naming the ICLS resolution specifically turned up last round. Find that BPS-primary statement (a Sakernas methodology note, technical annex, or metadata page) and quote it verbatim with a URL — or report the same dead end again if it's genuinely not there.

## The ask, for the other 96 nodes

Same method as round 1: find real, citable **domestic** (within-country) dependency edges among the nodes listed below — which report's figures feed which, which report's methodology is governed by which standard, which trade/legal instrument a statistics release cites as its basis. Likely angles not yet tried: the FTZ/SEZ nodes (`id-ftz`, `id-sez`) against BPS or investment-board (BKPM) releases that cite them as the legal basis for zone-specific statistics; the disaster cluster (`id-bnpb`, `id-disaster-occurrence`, `id-disaster-risk-index`, `id-volcano-earthquake`) against each other or against BNPB's own risk-index methodology; the trade-agreement cluster (`id-ijepa`, `id-aanzfta`, `id-iacepa`, `id-ieu-cepa`, `id-asean`, `id-rcep`, `id-bit-network`, `id-fta-network`) against BPS trade-by-partner releases (`id-export-partners`, `id-commodity-partner-matrix`) that might name them as context; the four Java-province/municipal nodes (`id-java-west`, `id-java-central`, `id-java-east`, `id-java-municipal`, plus `id-magelang`/`id-malang`) against each other or against national population/GDP series; the energy cluster (`id-oil-production`, `id-gas-production`, `id-coal`, `id-nickel`, `id-palm-oil`, `id-mining-stats`, `id-electricity-mix`, `id-geothermal`, `id-energy-balances`, `id-energy-balance-detail`) against BPS foreign-trade or national-accounts releases that use them as commodity-specific inputs; the climate cluster (`id-forest-cover`, `id-deforestation`, `id-reforestation`, `id-land-use-change`, `id-ghg-inventory`, `id-ndc-climate`) against each other and against UNFCCC/IPCC standards already in the corpus. Don't force a connection that isn't real — a genuinely standalone node with no statistical report to attach to is a fine "no edge found" answer.

## Node list — 98 currently unlinked Indonesia nodes

```
id-bank-indonesia | Bank Indonesia – central bank statistical and policy publications
id-economic-report-indonesia | Economic Report on Indonesia (Laporan Perekonomian Indonesia – LPI)
id-sski | Indonesia Financial System Statistics (SSKI)
id-interprovincial-trade | Inter-provincial / inter-regional trade statistics (Perdagangan Antar Wilayah)
id-interisland-trade | Inter-island trade volume and value (selected commodity series)
id-sez | Special Economic Zones (KEK) statistics and regulatory framework
id-ftz | Free Trade and Free Port Zones (KPBPB / FTZ) — Batam, Bintan, Karimun, Sabang
id-defence-budget | Defence budget and military expenditure statistics
id-defence-posture | Defence and security policy framing (archipelagic posture)
id-tertiary-ger | Gross Enrolment Ratio in tertiary education by province
id-construction | Construction in Figures / construction sector statistics
id-rice-paddy | Paddy and rice production statistics by province
id-sea-transport | Sea Transportation Statistics
id-transport-multimodal | Domestic multimodal transport statistics (sea, air, rail, river/ferry)
id-gender-stats | Women and Men in Indonesia
id-cpi-provincial | Consumer Price Index of 38 Provinces
id-electricity-mix | Electricity generation by source / power-plant type
id-energy-balance-detail | Energy Balance of Indonesia (detailed production–consumption)
id-oil-production | Crude oil and condensate production statistics
id-gas-production | Natural gas production statistics
id-religion-composition | Religious composition statistics (Islam, Christianity, Hinduism, Buddhism, etc.)
id-geothermal | Geothermal power and renewable generation statistics
id-tanjung-priok | Tanjung Priok Port operational statistics
id-tanjung-perak | Tanjung Perak Port operational statistics
id-major-ports | Major Indonesian ports system (Belawan, Makassar, and others)
id-ethnic-groups | Profile of Ethnic Groups (Long Form Population Census 2020)
id-regional-languages | Regional language diversity statistics (Long Form SP2020)
id-bnpb | BNPB – National Disaster Management Authority
id-disaster-occurrence | Disaster occurrence and impact statistics (by type and year)
id-disaster-risk-index | Indonesian Disaster Risk Index (IRBI)
id-volcano-earthquake | Volcanic and earthquake / tsunami hazard and event statistics
id-ijepa | Indonesia–Japan Economic Partnership Agreement (IJEPA)
id-aanzfta | ASEAN–Australia–New Zealand Free Trade Agreement (AANZFTA)
id-iacepa | Indonesia–Australia Comprehensive Economic Partnership Agreement (IA-CEPA)
id-ieu-cepa | Indonesia–EU Comprehensive Economic Partnership Agreement (IEU-CEPA)
id-bit-network | Bilateral Investment Treaty (BIT) network
id-fta-network | Overall FTA / CEPA network overview
id-democracy-index | Indonesia Democracy Index (IDI)
id-anticorruption | National Strategy for Corruption Prevention (Stranas PK) and integrity framework
id-asset-declaration | Asset-declaration and conflict-of-interest regulatory regime
id-local-government-finance | District/City Government Finance Statistics (Statistik Keuangan Pemerintah Kabupaten/Kota)
id-dau-dak | Fiscal equalisation transfers (DAU, DAK, DBH)
id-own-source-revenue | Subnational own-source revenue (PAD) statistics and capacity
id-water-supply | Water Supply Statistics
id-water-resources | Water resources and irrigation / agricultural water indicators
id-manufacturing-directory | Directory of Manufacturing Industry (Direktori Industri Manufaktur)
id-energy-balances | Energy Balances of Indonesia
id-producer-prices | Producer Price Index / Wholesale Price statistics
id-agriculture-stats | Agricultural statistics (production, food crops, estate crops)
id-health-stats | Health and vital statistics (beyond census)
id-gini-inequality | Inequality statistics (Gini ratio and related)
id-financial-stability-review | Financial Stability Review (Bank Indonesia)
id-palm-oil | Palm-oil production and estate-crop statistics
id-nickel | Nickel and downstream mineral statistics
id-coal | Coal production and export statistics
id-mining-stats | Mining and quarrying statistics (broader)
id-jakarta | DKI Jakarta – capital special region
id-internal-migration | Internal migration and urbanisation statistics
id-bpjs-kesehatan | BPJS Kesehatan / Jaminan Kesehatan Nasional (JKN) coverage statistics
id-social-protection | Social-protection programme statistics (PKH, food assistance, and related)
id-islamic-finance | Islamic / Sharia finance statistics (banking, capital market, non-bank)
id-asean | ASEAN economic cooperation framework (Indonesia as member)
id-rcep | Regional Comprehensive Economic Partnership (RCEP) — Indonesia participation
id-rpjmn | National Medium-Term Development Plan (RPJMN) — statistical targets and monitoring
id-forest-cover | Forest cover and land-cover statistics
id-deforestation | Deforestation rate statistics (gross and net)
id-ghg-inventory | Greenhouse-gas inventory and physical supply-use for emissions
id-ndc-climate | Nationally Determined Contribution (NDC) and climate-policy framework
id-ecommerce | E-Commerce Statistics
id-digital-economy | Digital-economy and ICT indicators (broader)
id-land-use-change | Land-use and land-cover change statistics linked to agriculture and estates
id-reforestation | Reforestation / forest and land rehabilitation statistics
id-provinces-structure | Provincial administrative structure (38 provinces) and island counts
id-tourism-domestic | Domestic Tourism Statistics (Wisatawan Nusantara)
id-tourism-attractions | Tourism attraction / object statistics
id-fdi-realization | Foreign Direct Investment realization statistics
id-domestic-investment | Domestic investment realization statistics
id-msme-manufacturing | Micro and small manufacturing industry statistics
id-msme-broader | Broader MSME / micro-enterprise statistics and policy framing
id-ikn-population | Nusantara Capital City (IKN) population enumeration statistics
id-ikn-framework | Nusantara Capital City (IKN) legal and planning framework
id-labour-productivity | Labour productivity and related indicators
id-financial-inclusion | Financial-inclusion statistics
id-marine-coastal | Statistics of Marine and Coastal Resources
id-fishing-ports | Statistics of Fishing Ports
id-fisheries-production | Fisheries production statistics (capture and aquaculture)
id-magelang | Kota Magelang / Kabupaten Magelang local statistics (Dalam Angka)
id-malang | Kota Malang / Kabupaten Malang local statistics (Dalam Angka)
id-java-municipal | Selected Java municipal statistical system (Dalam Angka series)
id-apbn | State Budget (APBN) realization and fiscal statistics
id-health-facilities | Health facilities statistics (hospitals, puskesmas by province)
id-tax-revenues | Tax revenue structure and actual government revenues
id-tax-ratio | Tax-to-GDP ratio and fiscal capacity indicators
id-export-partners | Export statistics by country of destination (major partners)
id-commodity-partner-matrix | Commodity × destination trade patterns (palm oil, coal, nickel, manufactures)
id-java-west | West Java (Jawa Barat) provincial and major municipal statistical profile
id-java-central | Central Java (Jawa Tengah) provincial and Magelang-context profile
id-java-east | East Java (Jawa Timur) provincial and Malang-context profile
```
