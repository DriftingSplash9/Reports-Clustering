# Prompt for Grok — domestic wiring — Ecuador, Peru, Venezuela, Bolivia, Colombia

**Attach:** `ec-ecuador-grok-2026-08.json`, `pe-peru-grok-2026-08.json`, `ve-venezuela-grok-2026-08.json`, `bo-bolivia-grok-2026-08.json`, `bo-national-core.json`, `co-colombia-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

Five Andean/northern South American countries, same pattern: **Ecuador 26/45 (58%), Peru 17/35 (49%), Venezuela 16/26 (62%), Bolivia 15/52 (29%), Colombia 14/35 (40%) unlinked.** All five share Andean Community (CAN) and Pacific Alliance membership nodes; Venezuela's corpus is mostly OFAC sanctions/oil-major nodes that may have no real statistical dependency at all.

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "Ecuador / Peru / Venezuela / Bolivia / Colombia" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of the existing international/standard ids listed further down, OR — if the dependency genuinely involves something not in either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't in these lists; that has broken every round so far.

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

Likely angles: does each country's INE/DANE-equivalent cite CAN (`ec-can`, `pe`... check for a Peru CAN node, `co-can`, `bo-mercosur-can`) or the Pacific Alliance (`ec-acuerdo-ue`, `co-alianza-pacifico`, `pe-alianza-pacifico`) in its trade-statistics methodology? Bolivia's lithium-contract nodes (`bo-contrato-litio-cbc`, `bo-contrato-litio-uranium-one`) and Venezuela's OFAC/oil-major nodes (`ve-ofac-sanciones`, `ve-chevron`, `ve-majors-licenciados`, etc.) are commercial/political context, not statistical inputs — treat "no dependency edge, this is standalone context" as the expected, correct answer for most of these rather than straining for a connection.

**Honesty permission, as always: if you search and find nothing solid connecting two nodes, say so and move on — an explicit "no real dependency found between X and Y" is a correct and useful answer.** We would rather have 10 solid edges than 40 shaky ones. Primary documents only — the agency's own methodology notes, the treaty/agreement text itself, an IMF Article IV statistical annex, a national statistics office's own publication. No third-party scorecards (ODIN etc.) as citations — they're leads to chase, not sources to cite.

## How to reply

One JSON object: `dependencies` array, each entry `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }` — `evidence_quote` must name the specific country/agency and state the specific claim the edge makes (not a generic sentence that could apply to five other countries). Proposed new nodes (if any) go in a separate `proposed_reports` array with `proposed_id` (a sensible new id, not colliding with anything on the lists below), `kind` (domestic/international), `title`, `publisher`, `url`, `description`, `publication_cadence`. We raw-verify every quote before anything is minted, same as always.

## Node lists

<details>
<summary>Ecuador — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
ec-acuacultura | Sector acuícola / Aquaculture statistics
ec-banano | Banano y plátano — producción y exportaciones
ec-bop | Balanza de Pagos / Balance of Payments
ec-cacao | Cacao y elaborados — producción y exportaciones
ec-camaron | Camarón — producción y exportaciones
ec-camaron-cacao-banano | Camarón, cacao y banano — leading non-oil export products
ec-canasta-basica | Canasta Familiar Básica y Canasta Familiar Vital
ec-censo | Censo de Población y Vivienda / Population and Housing Census
ec-comercio-exterior | Estadísticas de Comercio Exterior / Merchandise Trade
ec-cse | Cuentas Satélite de Educación (CSE)
ec-cuentas-nacionales | Cuentas Nacionales / National Accounts of Ecuador
ec-deuda-publica | Deuda pública / Public debt statistics
ec-dolarizacion | Régimen de dolarización oficial (desde 2000)
ec-el-oro | Provincia de El Oro — shrimp and coastal production
ec-empleo-adecuado | Empleo adecuado / pleno empleo (ENEMDU)
ec-endi | Encuesta Nacional sobre Desnutrición Infantil (ENDI)
ec-enemdu | Encuesta Nacional de Empleo, Desempleo y Subempleo (ENEMDU)
ec-enighur | Encuesta Nacional de Ingresos y Gastos de los Hogares (ENIGHUR)
ec-esmeraldas | Provincia de Esmeraldas — northern coastal contrast
ec-gasto-educacion | Gasto público en educación
ec-gasto-salud | Gasto público en salud y seguridad social
ec-gini | Coeficiente de Gini / Income inequality
ec-guayaquil | Guayaquil / Área metropolitana de Guayaquil — coastal statistical identity
ec-guayas | Provincia del Guayas — core coastal statistical identity
ec-iess | Instituto Ecuatoriano de Seguridad Social (IESS) — coverage and finances
ec-inpp | Índice Nacional de Precios al Productor (INPP)
ec-ipc | Índice de Precios al Consumidor (IPC) / Consumer Price Index
ec-iva | Impuesto al Valor Agregado (IVA) / Value-added tax
ec-lineas-pobreza | Líneas de pobreza y pobreza extrema
ec-manabi | Provincia de Manabí — large coastal province
ec-morona-santiago | Provincia de Morona Santiago — highest-poverty Amazon contrast
ec-nbi | Pobreza por Necesidades Básicas Insatisfechas (NBI)
ec-no-petroleras | Exportaciones no petroleras (camarón, cacao, banano, minería)
ec-orellana | Provincia de Orellana — high-poverty Amazon contrast
ec-petroleo | Exportaciones e ingresos petroleros / Oil exports & fiscal contribution
ec-pichincha | Provincia de Pichincha — low-poverty contrast
ec-pobreza | Pobreza por ingresos y pobreza extrema / Income poverty
ec-pobreza-provincial | Pobreza por ingresos por provincia (INEC)
ec-presupuesto | Presupuesto General del Estado / National Budget
ec-quito | Quito / Distrito Metropolitano de Quito — capital statistical identity
ec-remesas | Remesas de trabajadores / Secondary income (remittances)
ec-reservas | Reservas Internacionales del Banco Central del Ecuador
ec-salud-publica | Sistema de salud pública / Ministry of Health statistics
ec-sri | Servicio de Rentas Internas (SRI) — tax collection
ec-tungurahua | Provincia de Tungurahua — low-poverty highland contrast
```
</details>

<details>
<summary>Peru — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
pe-agroexportaciones | Agroexportaciones / Non-traditional agricultural exports
pe-bop | Balanza de Pagos / Balance of Payments
pe-cafe | Café — producción y exportaciones
pe-cajamarca | Departamento de Cajamarca — highest-poverty contrast
pe-canon-minero | Canon minero y regalías mineras
pe-censo | Censos Nacionales de Población y Vivienda / National Population and Housing Census
pe-comercio-exterior | Estadísticas de Comercio Exterior / Merchandise Trade
pe-condiciones-vida | Condiciones de Vida en el Perú (quarterly technical report)
pe-costa | Costa — natural-region statistical domain
pe-cuentas-nacionales | Cuentas Nacionales / National Accounts of Peru
pe-educacion | Estadísticas de educación / Education statistics & budget
pe-enaho | Encuesta Nacional de Hogares (ENAHO) / National Household Survey
pe-epen | Encuesta Permanente de Empleo Nacional (EPEN) / Permanent National Employment Survey
pe-ica | Departamento de Ica — low-poverty contrast
pe-ipc | Índice de Precios al Consumidor (IPC) / Consumer Price Index
pe-lima-metropolitana | Lima Metropolitana — capital statistical identity
pe-lineas-pobreza | Líneas de pobreza total y extrema
pe-loreto | Departamento de Loreto — high-poverty Selva contrast
pe-manufactura | PBI Manufactura / Manufacturing production
pe-mef-presupuesto | Presupuesto del Sector Público / National Budget (MEF)
pe-meta-inflacion | Marco de metas de inflación (1–3%) — BCR
pe-mineria | Producción y exportaciones mineras / Mining production & exports
pe-moquegua | Departamento de Moquegua — low-poverty mining contrast
pe-pbi-mensual | Producción Nacional / Monthly GDP (PBI)
pe-pesca | Producción y exportaciones pesqueras / Fishing & fishmeal
pe-pobreza-departamental | Pobreza monetaria por departamento (INEI)
pe-pobreza-monetaria | Pobreza monetaria / Monetary poverty
pe-puno | Departamento de Puno — high-poverty Sierra contrast
pe-reporte-inflacion | Reporte de Inflación (BCR)
pe-reservas | Reservas Internacionales Netas (RIN)
pe-salud | Estadísticas de salud / Health coverage & expenditure
pe-san-martin | Departamento de San Martín — coffee-producing Andean–Amazon transition
pe-selva | Selva — natural-region statistical domain
pe-sierra | Sierra — natural-region statistical domain
pe-tasa-referencia | Tasa de interés de referencia / Policy interest rate
```
</details>

<details>
<summary>Venezuela — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
ve-anzoategui | Estado Anzoátegui — eastern oil and industrial
ve-bolivar | Estado Bolívar — southern mining and industrial
ve-bonos | Bonos y transferencias monetarias del Estado
ve-bop | Balanza de Pagos / Balance of Payments
ve-carabobo | Estado Carabobo — central industrial corridor
ve-caracas | Distrito Capital / Caracas — metropolitan core
ve-clap | CLAP — Comité Local de Abastecimiento y Producción (food boxes)
ve-educacion | Cobertura y asistencia escolar (ENCOVI)
ve-empleo | Empleo y ocupación (ENCOVI)
ve-encovi | Encuesta Nacional de Condiciones de Vida (ENCOVI) — UCAB
ve-faja-orinoco | Faja Petrolífera del Orinoco — resource base
ve-ine | Instituto Nacional de Estadística (INE) — institutional statistical identity
ve-ingresos-petroleros | Ingresos petroleros del Estado
ve-ipc | Índice de Precios al Consumidor / Inflation statistics
ve-migracion | Migración y población residual
ve-miranda | Estado Miranda — capital-region periphery
ve-petroleo | Producción petrolera / Oil production
ve-pobreza-ingresos | Pobreza de ingresos (ENCOVI)
ve-pobreza-multidimensional | Pobreza multidimensional (ENCOVI)
ve-remesas | Remesas / Family remittances
ve-reservas | Reservas internacionales / International reserves
ve-salud | Sistema de salud — acceso y deficiencias
ve-seniat | SENIAT — tax administration
ve-servicios-publicos | Acceso a servicios públicos (electricidad, agua)
ve-tipo-cambio | Tipo de cambio / Exchange rate
ve-zulia | Estado Zulia — western oil and population pole
```
</details>

<details>
<summary>Bolivia — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
bo-alfabetismo | Tasa de alfabetismo / Literacy rate
bo-autoidentificacion | Autoidentificación indígena originaria campesina (Censo)
bo-beni | Departamento del Beni — northern lowland
bo-bop | Balanza de Pagos / Balance of Payments
bo-censo | Censo de Población y Vivienda / Population and Housing Census
bo-chuquisaca | Departamento de Chuquisaca — high-poverty contrast
bo-cochabamba | Departamento de Cochabamba — central valley hub
bo-comercio-exterior | Estadísticas de Comercio Exterior / Merchandise Trade
bo-cuentas-nacionales | Cuentas Nacionales / National Accounts of Bolivia
bo-deuda-publica | Deuda pública / Public debt statistics
bo-educacion | Sistema educativo — cobertura y gasto
bo-eh | Encuesta de Hogares (EH) / Household Survey
bo-eje-central | Eje central (La Paz – Cochabamba – Santa Cruz)
bo-empleo-formal | Empleo formal / Formal employment
bo-empresas-publicas | Empresas públicas — performance and fiscal exposure
bo-gas | Gas natural — producción y exportaciones
bo-gini | Índice de Gini / Income inequality
bo-idh | Impuesto Directo a los Hidrocarburos (IDH)
bo-idioma | Idiomas hablados / Language statistics
bo-ied | Inversión Extranjera Directa / FDI statistics
bo-informalidad | Informalidad laboral / Labour informality
bo-inseguridad-alimentaria | Inseguridad alimentaria / Food insecurity (ELCSA scale)
bo-ipc | Índice de Precios al Consumidor (IPC) / Consumer Price Index
bo-juana-azurduy | Bono Juana Azurduy — maternal and early-childhood transfer
bo-juancito-pinto | Bono Juancito Pinto — school attendance cash transfer
bo-la-paz | Departamento de La Paz — capital region
bo-la-paz-metro | La Paz / El Alto — dual-city metropolitan complex
bo-lineas-pobreza | Líneas de pobreza y pobreza extrema
bo-manufactura | Industria manufacturera — producción y exportaciones
bo-minerales | Minerales — oro, plata, zinc, estaño
bo-mortalidad-infantil | Mortalidad infantil y neonatal
bo-nbi | Necesidades Básicas Insatisfechas (NBI) / Unsatisfied Basic Needs
bo-oruro | Departamento de Oruro — highland mining
bo-pando | Departamento de Pando — northern Amazonian extreme
bo-poblacion-65 | Población de 65 años y más / Population ageing
bo-pobreza | Pobreza monetaria / Monetary poverty
bo-pobreza-departamental | Pobreza monetaria por departamento (INE)
bo-potosi | Departamento de Potosí — high-poverty highland contrast
bo-presupuesto | Presupuesto General del Estado / National Budget
bo-programa-monetario | Programa Monetario del BCB
bo-quechua-aymara | Naciones Quechua y Aymara — demographic weight
bo-recaudacion | Recaudación tributaria y aduanera
bo-remesas | Remesas familiares / Family remittances
bo-renta-dignidad | Renta Dignidad — universal old-age pension
bo-salar-uyuni | Salar de Uyuni — lithium resource base
bo-salud | Sistema de salud — cobertura y gasto
bo-santa-cruz | Departamento de Santa Cruz — low-poverty economic hub
bo-soya | Soya y derivados — producción y exportaciones
bo-tarija | Departamento de Tarija — southern gas and agricultural zone
bo-tioc | Territorios Indígena Originario Campesinos (TIOC)
bo-vivienda | Condiciones de vivienda y servicios básicos
bo-ylb | Yacimientos de Litio Bolivianos (YLB) — state lithium company
```
</details>

<details>
<summary>Colombia — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
co-13-ciudades | 13 ciudades y áreas metropolitanas — statistical domain
co-antioquia | Departamento de Antioquia — core statistical identity
co-bogota | Bogotá D.C. — capital statistical identity
co-bop | Balanza de Pagos y Posición de Inversión Internacional
co-cafe | Café — producción y exportaciones
co-censo | Censo Nacional de Población y Vivienda / National Population and Housing Census
co-choco | Departamento del Chocó — highest-poverty contrast
co-comercio-exterior | Estadísticas de Comercio Exterior / Merchandise Trade
co-cuentas-nacionales | Cuentas Nacionales / National Accounts of Colombia
co-cundinamarca | Departamento de Cundinamarca — low-poverty contrast
co-dian | DIAN — recaudo tributario y aduanero
co-eam | Encuesta Anual Manufacturera (EAM)
co-ecv | Encuesta Nacional de Calidad de Vida (ECV)
co-emmet | Encuesta Mensual Manufacturera con Enfoque Territorial (EMMET)
co-geih | Gran Encuesta Integrada de Hogares (GEIH) / Great Integrated Household Survey
co-gini | Coeficiente de Gini / Income inequality
co-guajira | Departamento de La Guajira — high-poverty Caribbean contrast
co-informe-congreso | Informe de la Junta Directiva al Congreso de la República
co-ipc | Índice de Precios al Consumidor (IPC) / Consumer Price Index
co-ipi | Índice de Producción Industrial (IPI) / Industrial Production Index
co-ipi-detail | Índice de Producción Industrial (IPI) — sector detail
co-ipom | Informe de Política Monetaria (Banrep)
co-lineas-pobreza | Líneas de pobreza monetaria y pobreza extrema
co-medellin-am | Medellín Área Metropolitana — statistical profile
co-meta-inflacion | Marco de metas de inflación (3%) — Banco de la República
co-petroleo | Producción y exportaciones de petróleo / Mining-energy exports
co-pobreza-departamental | Pobreza monetaria por departamento (DANE)
co-pobreza-monetaria | Pobreza monetaria y pobreza monetaria extrema / Monetary poverty
co-presupuesto-general | Presupuesto General de la Nación / National Budget
co-regalias | Sistema General de Regalías / Royalties from hydrocarbons and mining
co-reservas | Reservas Internacionales del Banco de la República
co-saber-icfes | Pruebas Saber / ICFES learning assessments
co-sucre | Departamento de Sucre — secondary high-poverty node
co-tasa-intervencion | Tasa de interés de intervención / Policy interest rate
co-valle | Departamento del Valle del Cauca — core statistical identity
```
</details>
