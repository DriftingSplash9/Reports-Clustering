# Prompt for Grok — domestic wiring — Philippines, round 2

**Standing rules:** see `GROKREADME.md` (in `notes/grok-research-queue-2026-08-22/`) — attach/paste it alongside this file every time.

**Attach:** `GROKREADME.md`, `ph-philippines-grok-2026-08.json` (both under `src/data/research/`). Full id/title list also pasted below.

Paste everything below the line.

---

This is round 2 on the Philippines. Round 1 (2026-08-28, plus a same-day Grok follow-up) closed 20 edges and minted 2 new classification nodes (`ph-psic`, `ph-pscc`) — PSA's technical-notes pages were unusually forthcoming (PSIC/ISIC, PSCC/HS, PCOICOP/COICOP, SNA 2008), and BSP's own primer PDFs supplied BPM6/SDDS/WEO/MFSMCG-2016 bridges. **One lead is a confirmed dead end — don't re-raise it**: `ph-underemployment -> icls-work-statistics-resolution` (PSA's own LFS Technical Notes cite a domestic NSCB Resolution instead, explicitly not ICLS). **One lead is genuinely open**: `ph-rd-statistics` — a secondary academic-journal source (The Philippine Statistician) says DOST's R&D survey follows "guidelines indicated in the Frascati Manual (OECD, 2015)," but neither DOST's nor PSA's own site states this, and no Frascati Manual node exists in the corpus yet. If you find DOST's or PSA's own primary statement of this, propose the Frascati Manual as a new node alongside the edge.

**Current state, freshly measured 2026-08-29: 50 of the Philippines' 77 corpus nodes (65%) still have zero edges** (the last-stated "43/70" was stale — several 08-29 rounds elsewhere added nodes faster than they wired them; this is the real current number).

**Ids — use ONLY ids from the list below, or propose a new node.** Copy ids character-for-character. Use GROKREADME.md's standard international ids where relevant, or propose a new node (title, publisher, exact URL, description, cadence) in `proposed_reports` if the dependency needs something not on either list. Never invent an id.

## The ask

Find real, citable **domestic** dependency edges among the nodes below. Untried angles worth checking first:
- **FTA/trade-agreement cluster** (`ph-pjepa`, `ph-korea-fta`, `ph-efta`, `ph-asean`, `ph-rcep`) against PSA's trade-by-partner or DTI releases that might cite them as legal/institutional context — same pattern as the corpus's other FTA clusters (check whether it holds here or is a genuine dead end).
- **Migration/OFW cluster** (`ph-ofw-stock`, `ph-remittances-canada`, `ph-dmw`, `ph-canada-labour`) against each other and against BSP's remittance statistics (already wired to SDDS/BPM6 this round) or the PSA Survey on Overseas Filipinos.
- **Disaster/ports/energy clusters** — `ph-disaster-impact` vs `ph-pagasa` (the obvious hazard-monitoring source); `ph-ports`/`ph-port-manila`/`ph-port-cebu` against PPA or PSA transport statistics; `ph-geothermal`/`ph-renewables`/`ph-power-stats`/`ph-energy-mix` against DOE or each other.
- **Fiscal cluster** (`ph-nta`, `ph-fiscal-ops`, `ph-gov-debt`) against DBM/BTr releases or against each other.
- **BARMM** (`ph-barmm`) — check whether PSA or NEDA publishes a BARMM-specific statistical profile citing national survey infrastructure (population census, LFS, FIES) the way the corpus's other regional-profile nodes do.
- **Digital economy** (`ph-digital-economy`, `ph-ecommerce`) against PSA's Digital Economy Satellite Account methodology or `ph-itbpm`.

Don't force a connection that isn't real — a standalone node with no statistical report to attach to is a fine "no edge found" answer.

## Node list — 50 currently unlinked Philippines nodes

```
ph-bsp | Bangko Sentral ng Pilipinas (BSP) institutional and reporting core
ph-mining | Mining and quarrying production statistics
ph-nickel | Nickel production and export statistics
ph-fisheries | Fisheries and aquaculture production statistics
ph-ports | Port and shipping statistics (cargo, containers, passengers)
ph-gender | Women and Men in the Philippines / Core GAD indicators
ph-housing | Housing and household characteristics statistics
ph-defence-budget | Department of National Defense / AFP budget statistics
ph-irrigation | Irrigation development and status statistics
ph-rd-statistics | Science, technology and R&D statistics
ph-nta | National Tax Allotment (NTA, formerly IRA) local government finance statistics
ph-geothermal | Geothermal power capacity and generation statistics
ph-renewables | Renewable energy project and capacity statistics (RE Act framework)
ph-pdp | Philippine Development Plan (PDP) and NEDA planning framework
ph-crime | Crime statistics (focus crimes and crime rate)
ph-port-manila | Port of Manila operational statistics
ph-port-cebu | Port of Cebu operational statistics
ph-vital-stats | Vital statistics (births, deaths, marriages)
ph-ofw-stock | Overseas Filipino Workers stock and Survey on Overseas Filipinos
ph-remittances-canada | Cash remittances from Canada
ph-dmw | Department of Migrant Workers institutional role and deployment statistics
ph-canada-labour | Philippines–Canada labour and migration cooperation framework
ph-underemployment | Underemployment and quality-of-employment indicators (LFS)
ph-itbpm | IT-BPM / BPO industry statistics and performance
ph-agriculture | Agriculture and fisheries production statistics
ph-rice | Rice / palay production statistics
ph-disaster-impact | Natural hazard occurrence and impact statistics (typhoons, earthquakes, etc.)
ph-pagasa | PAGASA tropical cyclone and weather monitoring products
ph-peza | PEZA ecozone and investment statistics
ph-power-stats | Philippine Power Statistics (generation, capacity, consumption)
ph-energy-mix | Electricity generation and capacity mix by technology
ph-4ps | Pantawid Pamilyang Pilipino Program (4Ps) statistics
ph-asean | ASEAN economic cooperation framework (Philippine participation)
ph-rcep | Regional Comprehensive Economic Partnership (RCEP) participation
ph-higher-ed | Higher education statistics (enrolment, institutions, graduates)
ph-basic-ed | Basic education statistics (DepEd)
ph-philhealth | PhilHealth coverage and claims statistics
ph-barmm | BARMM (Bangsamoro Autonomous Region in Muslim Mindanao) economic and statistical profile
ph-fiscal-ops | National Government fiscal operations and budget statistics
ph-gov-debt | National Government outstanding debt statistics
ph-construction | Construction statistics and GVA
ph-digital-economy | Philippine Digital Economy Satellite Account (PDESA)
ph-ecommerce | E-commerce component of the digital economy
ph-monetary-aggregates | Monetary aggregates and banking statistics
ph-ndc | Nationally Determined Contribution (NDC) and climate-policy framework
ph-ghg | Greenhouse gas inventory and emissions statistics
ph-forest | Forest cover and forestry sector statistics
ph-pjepa | Philippines–Japan Economic Partnership Agreement (PJEPA)
ph-korea-fta | Philippines–Korea Free Trade Agreement (PH-ROK FTA)
ph-efta | Philippines–EFTA Free Trade Agreement
```
