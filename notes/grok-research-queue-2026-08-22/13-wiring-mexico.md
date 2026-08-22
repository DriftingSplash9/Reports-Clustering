# Prompt for Grok — domestic wiring — Mexico

**Attach:** `mx-mexico-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

**56 of Mexico's 101 nodes (55%) are unlinked.** INEGI (national accounts, CPI, censuses) and Banco de México releases exist as candidates alongside T-MEC/USMCA (`mx-tmec`) and Maya crude pricing (`argus-mexico-maya-spot`) — plausible real dependencies that were never drawn.

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "Mexico" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of the existing international/standard ids listed further down, OR — if the dependency genuinely involves something not in either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't in these lists; that has broken every round so far.

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

Likely angles: INEGI's own national-accounts or CPI methodology naming SNA/COICOP editions; whether a Banco de México or INEGI trade-statistics release cites T-MEC/USMCA as its tariff/customs basis; whether `argus-mexico-maya-spot` genuinely feeds any Mexican government release (it may not — Argus is a commercial price reporting agency, and "no real dependency" is a fine answer if INEGI/Pemex doesn't cite it as an input).

**Honesty permission, as always: if you search and find nothing solid connecting two nodes, say so and move on — an explicit "no real dependency found between X and Y" is a correct and useful answer.** We would rather have 10 solid edges than 40 shaky ones. Primary documents only — the agency's own methodology notes, the treaty/agreement text itself, an IMF Article IV statistical annex, a national statistics office's own publication. No third-party scorecards (ODIN etc.) as citations — they're leads to chase, not sources to cite.

## How to reply

One JSON object: `dependencies` array, each entry `{ source_report_id, target_report_id, relationship_type, basis, evidence_url, evidence_quote }` — `evidence_quote` must name the specific country/agency and state the specific claim the edge makes (not a generic sentence that could apply to five other countries). Proposed new nodes (if any) go in a separate `proposed_reports` array with `proposed_id` (a sensible new id, not colliding with anything on the lists below), `kind` (domestic/international), `title`, `publisher`, `url`, `description`, `publication_cadence`. We raw-verify every quote before anything is minted, same as always.

## Node lists

<details>
<summary>Mexico — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
mx-acapulco-metro | Acapulco de Juárez — municipal / nominal metro profile (Guerrero)
mx-alcaldia-benito-juarez | Alcaldía Benito Juárez — statistical and administrative profile
mx-alcaldia-cuauhtemoc | Alcaldía Cuauhtémoc — statistical and administrative profile
mx-alcaldia-gustavo-a-madero | Alcaldía Gustavo A. Madero — statistical and administrative profile
mx-alcaldia-iztapalapa | Alcaldía Iztapalapa — statistical and administrative profile
mx-alcaldia-tlahuac | Alcaldía Tláhuac — statistical and administrative profile
mx-anuario-estadistico-entidad | Anuario Estadístico y Geográfico por Entidad Federativa / Statistical and Geographic Yearbook by Federal Entity
mx-balanza-comercial | Balanza Comercial de Mercancías de México / Merchandise Trade Balance
mx-banxico-agregados | Agregados monetarios y base monetaria / Monetary aggregates and monetary base
mx-banxico-bop | Balanza de Pagos / Balance of Payments
mx-banxico-informe-trimestral | Informe Trimestral / Quarterly Report (Banco de México)
mx-banxico-reservas | Reservas Internacionales Netas / Net International Reserves
mx-banxico-tasa-objetivo | Objetivo para la Tasa de Interés Interbancaria a un día (Tasa Objetivo) / Overnight Interbank Funding Rate Target
mx-banxico-tasas-interes | Tasas de interés de mercado (Cetes, TIIE, etc.) / Market interest rates
mx-banxico-tipo-cambio | Tipo de cambio peso-dólar (fixación Banxico) / Peso-dollar exchange rate (Banxico fix)
mx-cdmx-cngmd-alcaldias | CNGMD — Demarcaciones territoriales (alcaldías) de la Ciudad de México
mx-cdmx-evalúa | Evalúa CDMX — evaluaciones y mediciones de política social
mx-cdmx-ipdp-indicadores | Sistema de Indicadores de la Ciudad de México (SI CDMX) / IPDP indicator system
mx-cdmx-pj-anuario | Anuario Estadístico e Indicadores de Derechos Humanos del Poder Judicial de la Ciudad de México
mx-ceem | Cuentas Económicas y Ecológicas de México (CEEM) / Economic and Ecological Accounts of Mexico
mx-cemabe | Censo de Escuelas, Maestros y Alumnos de Educación Básica y Especial (CEMABE) / Census of Schools, Teachers and Students of Basic and Special Education
mx-censo-agropecuario | Censo Agropecuario / Agricultural Census
mx-censo-economico-municipal | Censos Económicos — resultados municipales (producción y unidades económicas)
mx-censo-poblacion | Censo de Población y Vivienda / Population and Housing Census
mx-censos-economicos | Censos Económicos / Economic Censuses
mx-chiapas-ceieg | Comité Estatal de Información Estadística y Geográfica de Chiapas (CEIEG) / state statistical coordination
mx-chiapas-pobreza-report | Chiapas poverty and social-lag reports (CEIEG / Bienestar compilations)
mx-chiapas-tuxtla-detail | Tuxtla Gutiérrez — extended capital / municipal profile
mx-cngmd | Censo Nacional de Gobiernos Municipales y Demarcaciones Territoriales de la Ciudad de México (CNGMD)
mx-cnije | Censo Nacional de Impartición de Justicia Estatal (CNIJE) / National Census of State Justice Administration
mx-cnijf | Censo Nacional de Impartición de Justicia Federal (CNIJF) / National Census of Federal Justice Administration
mx-cnpje | Censo Nacional de Procuración de Justicia Estatal (CNPJE) / National Census of State Prosecution
mx-cnpjf | Censo Nacional de Procuración de Justicia Federal (CNPJF) / National Census of Federal Prosecution
mx-cnple | Censo Nacional de Poderes Legislativos Estatales (CNPLE)
mx-cscm | Cuenta Satélite de la Cultura de México (CSCM) / Satellite Account of Culture of Mexico
mx-csssm | Cuenta Satélite del Sector Salud de México (CSSSM) / Satellite Account of the Health Sector of Mexico
mx-cstm | Cuenta Satélite del Turismo de México (CSTM) / Satellite Account of Tourism of Mexico
mx-cstnrhm | Cuenta Satélite del Trabajo No Remunerado de los Hogares de México (CSTNRHM) / Satellite Account of Unpaid Household Work
mx-cuenta-isfl | Cuenta Satélite de las Instituciones sin Fines de Lucro / Satellite Account of Non-Profit Institutions
mx-denue | Directorio Estadístico Nacional de Unidades Económicas (DENUE) / National Statistical Directory of Economic Units
mx-edos-defunciones | Estadísticas de Defunciones Registradas (EDR) / Registered Death Statistics
mx-edos-nacimientos | Estadísticas de Nacimientos / Birth Statistics
mx-efipem | Estadística de Finanzas Públicas Estatales y Municipales (EFIPEM) / State and Municipal Public Finances Statistics
mx-emec | Encuesta Mensual sobre Empresas Comerciales (EMEC) / Monthly Survey of Commercial Enterprises
mx-emim | Encuesta Mensual de la Industria Manufacturera (EMIM) / Monthly Survey of the Manufacturing Industry
mx-emoe | Encuesta Mensual de Opinión Empresarial (EMOE) / Monthly Business Opinion Survey
mx-ems | Encuesta Mensual de Servicios (EMS) / Monthly Survey of Services
mx-ena | Encuesta Nacional Agropecuaria (ENA) / National Agricultural Survey
mx-enadid | Encuesta Nacional de la Dinámica Demográfica (ENADID) / National Survey of Demographic Dynamics
mx-encig | Encuesta Nacional de Calidad e Impacto Gubernamental (ENCIG) / National Survey of Governmental Quality and Impact
mx-endutih | Encuesta Nacional sobre Disponibilidad y Uso de Tecnologías de la Información en los Hogares (ENDUTIH)
mx-enec | Encuesta Nacional de Empresas Constructoras (ENEC) / National Survey of Construction Companies
mx-enh | Encuesta Nacional de Vivienda (ENH) / National Housing Survey (or related continuous housing modules)
mx-enigh | Encuesta Nacional de Ingresos y Gastos de los Hogares (ENIGH) / National Survey of Household Income and Expenditure
mx-enigh-salud | ENIGH — Gasto de los hogares en cuidados de la salud / Household health expenditure (from ENIGH)
mx-enigh-transferencias | ENIGH — Ingresos por transferencias / Transfer income (from ENIGH)
mx-enoe | Encuesta Nacional de Ocupación y Empleo (ENOE) / National Survey of Occupation and Employment
mx-enoe-informalidad | ENOE — Tasa de informalidad laboral / Labour informality rate (from ENOE)
mx-ensanut | Encuesta Nacional de Salud y Nutrición (ENSANUT / Ensanut Continua) / National Health and Nutrition Survey
mx-ensu | Encuesta Nacional de Seguridad Pública Urbana (ENSU) / National Survey of Urban Public Security
mx-envipe | Encuesta Nacional de Victimización y Percepción sobre Seguridad Pública (ENVIPE)
mx-etef | Exportaciones Trimestrales por Entidad Federativa (ETEF) / Quarterly Exports by Federal Entity
mx-guerrero-acapulco-detail | Acapulco de Juárez — extended municipal profile (tourism, insecurity, recovery)
mx-guerrero-judicial | Poder Judicial / Fiscalía del Estado de Guerrero — statistical presence
mx-igae | Indicador Global de la Actividad Económica (IGAE) / Global Indicator of Economic Activity
mx-igae-actividades | IGAE por actividad económica / Global Indicator of Economic Activity by activity
mx-iieg-jalisco | Instituto de Información Estadística y Geográfica del Estado de Jalisco (IIEG) — institutional statistical products
mx-imai | Indicador Mensual de la Actividad Industrial (IMAI) / Monthly Industrial Activity Indicator
mx-imaief | Indicador Mensual de la Actividad Industrial por Entidad Federativa (IMAIEF)
mx-imss-puestos | Puestos de trabajo afiliados al IMSS / IMSS-affiliated employment posts
mx-infonavit-estadisticas | Estadísticas de crédito y vivienda Infonavit / Infonavit housing-credit statistics
mx-inpc | Índice Nacional de Precios al Consumidor (INPC) / Consumer Price Index
mx-inpp | Índice Nacional de Precios Productor (INPP) / Producer Price Index
mx-issste-anuarios | Anuario Estadístico del ISSSTE / ISSSTE Statistical Yearbook
mx-itaee | Indicador Trimestral de la Actividad Económica Estatal (ITAEE) / Quarterly Indicator of State Economic Activity
mx-jalisco-finanzas-municipales | Finanzas públicas municipales de Jalisco (ingresos y egresos)
mx-jalisco-imss-municipal | IMSS formal employment by municipality (Jalisco / Guadalajara metro)
mx-jalisco-pj | Poder Judicial del Estado de Jalisco — statistical reporting
mx-lineas-pobreza | Líneas de Pobreza por Ingresos (LPI / LPEI) / Income Poverty Lines
mx-lsnieg | Ley del Sistema Nacional de Información Estadística y Geográfica (LSNIEG)
mx-mip | Matriz de Insumo-Producto (MIP) / Input-Output Matrix
mx-municipio-guadalajara | Municipio de Guadalajara — statistical and administrative profile
mx-municipio-monterrey | Municipio de Monterrey — statistical and administrative profile
mx-municipio-zapopan | Municipio de Zapopan — statistical and administrative profile
mx-nuevo-leon-imss-municipal | IMSS formal employment by municipality (Nuevo León / Monterrey metro)
mx-nuevo-leon-pj | Poder Judicial del Estado de Nuevo León — statistical reporting
mx-oaxaca-de-juarez | Oaxaca de Juárez — capital municipal profile
mx-oaxaca-judicial | Poder Judicial / Fiscalía del Estado de Oaxaca — statistical presence
mx-oaxaca-pobreza | Oaxaca poverty and social-lag profile (INEGI / Bienestar compilations)
mx-pension-bienestar-adultos | Pensión para el Bienestar de las Personas Adultas Mayores
mx-pension-bienestar-mujeres | Pensión Mujeres Bienestar
mx-pension-discapacidad | Pensión para el Bienestar de las Personas con Discapacidad
mx-pobreza-multidimensional | Medición Multidimensional de la Pobreza / Multidimensional Poverty Measurement
mx-remesas | Ingresos por remesas familiares / Family remittance income
mx-scnm | Sistema de Cuentas Nacionales de México (SCNM) / System of National Accounts of Mexico
mx-scnm-cou | Cuadros de Oferta y Utilización (COU) / Supply and Use Tables
mx-scnm-pib-trimestral | Producto Interno Bruto Trimestral / Quarterly GDP
mx-scnm-sectores-institucionales | Cuentas por Sectores Institucionales (SCNM) / Institutional Sector Accounts
mx-sep-estadistica-educativa | Estadística Educativa del Sistema Educativo Nacional (Formato 911 / SIGED) / National Education Statistics
mx-shcp-finanzas-publicas | Estadísticas de finanzas públicas federales (SHCP) / Federal public-finance statistics
mx-tuxtla | Tuxtla Gutiérrez — capital municipal profile (Chiapas)
```
</details>
