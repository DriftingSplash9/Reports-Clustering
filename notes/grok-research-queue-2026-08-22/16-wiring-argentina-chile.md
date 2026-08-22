# Prompt for Grok — domestic wiring — Argentina and Chile

**Standing rules:** see `../GROKREADME.md` — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `ar-argentina-grok-2026-08.json`, `ar-national-core.json`, `cl-chile-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

**Argentina 30/62 (48%) and Chile 31/53 (58%) unlinked.** Both have a dense set of trade-agreement nodes (Chile especially: CPTPP, US FTA, China FTA, EU agreement, Pacific Alliance) that plausibly relate to their own customs/trade-statistics releases, and Argentina has its 2025 IMF EFF program (`ar-fmi-eff-2025`) which likely governs current data-reporting commitments.

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "Argentina / Chile" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of GROKREADME.md's standard international ids, OR — if the dependency genuinely involves something not on either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't on one of those lists; that has broken every round so far.

## The ask

Find real, citable **domestic** (within-country) dependency edges among the nodes listed below — which report's figures feed which, which report's methodology is governed by which standard, which trade/legal instrument a statistics release cites as its basis. Every one of these nodes currently has **zero edges** in our graph (or is directly relevant context for one that does) — they were minted as candidates but never wired to anything.

Likely angles: does INDEC (Argentina) or INE (Chile) cite MERCOSUR (`ar-mercosur`) or the Pacific Alliance/CPTPP/bilateral FTAs (`cl-cptpp`, `cl-tlc-eeuu`, `cl-tlc-china`, `cl-acuerdo-ue`, `cl-alianza-pacifico`) as the basis for trade-statistics releases? Does Argentina's 2025 IMF EFF program (`ar-fmi-eff-2025`) impose specific statistical reporting requirements (e.g. an e-GDDS/SDDS commitment) worth an edge to INDEC's own releases?

## Node lists

<details>
<summary>Argentina — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
ar-afip-recaudacion | Recaudación Tributaria Mensual (AFIP/ARCA)
ar-anses-auh | Asignación Universal por Hijo (AUH) — boletín estadístico
ar-bcra-base-monetaria | Base monetaria y agregados monetarios / Monetary base and monetary aggregates
ar-bcra-bop | Balanza de Pagos / Balance of Payments (BCRA)
ar-bcra-informe-monetario | Informe Monetario Mensual (BCRA)
ar-bcra-mercado-cambios | Informe de Evolución del Mercado de Cambios y Balance Cambiario
ar-bcra-reservas | Reservas Internacionales del BCRA / International Reserves
ar-caba | Ciudad Autónoma de Buenos Aires (CABA) — statistical and administrative profile
ar-caba-anuario | Anuario Estadístico de la Ciudad de Buenos Aires (IDECBA)
ar-cba-cbt | Canasta Básica Alimentaria (CBA) y Canasta Básica Total (CBT) / Basic Food Basket and Total Basic Basket
ar-censo-agropecuario | Censo Nacional Agropecuario / National Agricultural Census
ar-censo-poblacion | Censo Nacional de Población, Hogares y Viviendas / National Population, Household and Housing Census
ar-chaco-entity | Provincia del Chaco — core statistical identity (northern/NEA contrast)
ar-comercio-exterior | Estadísticas de Comercio Exterior / Merchandise Trade Statistics
ar-complejos-exportadores | Complejos exportadores / Export complexes ranking
ar-conurbano-pobreza | Pobreza e indigencia en Partidos del GBA / Conurbano (EPH cut)
ar-cordoba-entity | Provincia de Córdoba — core statistical identity
ar-csc | Cuenta Satélite de Cultura (CSC) / Culture Satellite Account
ar-cst | Cuenta Satélite de Turismo de la Argentina (CST-A) / Tourism Satellite Account
ar-deuda-publica | Boletín Fiscal / Datos de la Deuda Pública
ar-dgec-cordoba | Dirección General de Estadística y Censos de la Provincia de Córdoba
ar-dpe-buenos-aires | Dirección Provincial de Estadística de la Provincia de Buenos Aires
ar-dpe-chaco | Dirección de Estadística y Censos de la Provincia del Chaco
ar-emae | Estimador Mensual de Actividad Económica (EMAE) / Monthly Estimator of Economic Activity
ar-empleo-publico | Estadísticas de empleo en el sector público / Public-sector employment
ar-energia-export | Exportaciones de combustibles y energía / complejo petrolero-petroquímico
ar-eph | Encuesta Permanente de Hogares (EPH) / Permanent Household Survey
ar-eph-gba | EPH — resultados para Gran Buenos Aires / CABA / Partidos del GBA
ar-estimaciones-agricolas | Estimaciones agrícolas / Agricultural production estimates
ar-formosa-entity | Provincia de Formosa — core statistical identity (northern/NEA contrast)
ar-gba | Gran Buenos Aires (GBA) / Aglomerado Gran Buenos Aires — metropolitan statistical region
ar-generacion-ingreso | Cuenta de generación del ingreso e insumo de mano de obra
ar-gobierno-general | Cuentas del sector gobierno general / General government accounts
ar-gran-resistencia | Gran Resistencia — municipal / agglomeration statistical profile
ar-icc | Índice del Costo de la Construcción (ICC)
ar-indec-informa | INDEC Informa (revista mensual de indicadores de coyuntura)
ar-indice-salarios | Índice de Salarios (IS)
ar-indices-precios-cantidades-comercio | Índices de precios y cantidades del comercio exterior
ar-ipc | Índice de Precios al Consumidor (IPC) / Consumer Price Index
ar-ipc-gba | IPC — serie regional Gran Buenos Aires
ar-ipec-santa-fe | Instituto Provincial de Estadística y Censos de Santa Fe (IPEC)
ar-ipi | Índice de Producción Industrial Manufacturero (IPI manufacturero)
ar-ipi-minero | Índice de Producción Industrial Minero (IPI minero)
ar-isac | Indicador Sintético de la Actividad de la Construcción (ISAC)
ar-ley-17622 | Ley Nº 17.622 — Creación del Instituto Nacional de Estadística y Censos (INDEC) y del Sistema Estadístico Nacional
ar-ley-23548-coparticipacion | Ley 23.548 — Régimen Transitorio de Distribución de Recursos Fiscales entre la Nación y las Provincias (Coparticipación Federal)
ar-litio | Producción de litio / carbonato de litio (estadísticas mineras)
ar-moa-moi | Manufacturas de Origen Agropecuario (MOA) y Manufacturas de Origen Industrial (MOI)
ar-noreste-region | Región Noreste (NEA) — statistical region in EPH / IPC
ar-origen-provincial-exportaciones | Origen provincial de las exportaciones (OPEX)
ar-partidos-gba | Partidos del Gran Buenos Aires (Conurbano) — statistical aggregate
ar-pobreza-indigencia | Incidencia de la pobreza y la indigencia (líneas CBA / CBT)
ar-rmba | Región Metropolitana Buenos Aires (RMBA) — expanded metropolitan delineation
ar-santa-fe-entity | Provincia de Santa Fe — core statistical identity
ar-scn | Sistema de Cuentas Nacionales (SCN) / National Accounts of Argentina
ar-seguridad-publica | Estadísticas de seguridad pública y población en centros de detención
ar-sen | Sistema Estadístico Nacional (SEN) / National Statistical System of Argentina
ar-servicios-publicos | Indicador Sintético de Servicios Públicos
ar-sipm | Sistema de Índices de Precios Mayoristas (SIPM) — IPIM, IPIB, IPP
ar-tucuman-dpe | Dirección de Estadística de la Provincia de Tucumán
ar-ucii | Utilización de la Capacidad Instalada en la Industria (UCII)
ar-vaca-muerta | Vaca Muerta / producción de hidrocarburos no convencionales (Neuquén)
```
</details>

<details>
<summary>Chile — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
cl-agregados-monetarios | Base monetaria y agregados monetarios
cl-antofagasta-entity | Región de Antofagasta — core statistical identity (northern mining)
cl-araucania-entity | Región de La Araucanía — core statistical identity (highest-poverty contrast)
cl-biobio-entity | Región del Biobío — core statistical identity
cl-bop | Balanza de Pagos y Posición de Inversión Internacional
cl-casen | Encuesta de Caracterización Socioeconómica Nacional (CASEN)
cl-casen-regiones | CASEN — pobreza por región (income and multidimensional)
cl-casen-rm | CASEN — resultados Región Metropolitana de Santiago
cl-censo | Censo de Población y Vivienda / Population and Housing Census
cl-censo-2024-rm | Censo 2024 — resultados Región Metropolitana
cl-cobre | Producción y exportaciones de cobre / Copper statistics
cl-cochilco | Comisión Chilena del Cobre (Cochilco) — statistical publications
cl-codelco | Codelco — producción y aporte fiscal
cl-comercio-exterior | Estadísticas de Comercio Exterior / Merchandise Trade
cl-cuentas-nacionales | Cuentas Nacionales / National Accounts of Chile
cl-dipres-funcional | Clasificación funcional del gasto público (DIPRES)
cl-ene | Encuesta Nacional de Empleo (ENE) / National Employment Survey
cl-ene-antofagasta | ENE — resultados Región de Antofagasta
cl-ene-araucania | ENE — resultados Región de La Araucanía
cl-ene-rm | ENE — resultados Región Metropolitana de Santiago
cl-ens | Encuesta Nacional de Salud (ENS) / National Health Survey
cl-epf | Encuesta de Presupuestos Familiares (EPF) / Family Budget Survey
cl-escolaridad | Años de escolaridad promedio / educational attainment indicators
cl-finanzas-publicas | Estadísticas de finanzas públicas / Dirección de Presupuestos
cl-fonasa | Fondo Nacional de Salud (FONASA) — coverage and expenditure statistics
cl-gasto-educacion | Gasto público en educación (DIPRES functional classification)
cl-gasto-salud | Gasto público en salud (DIPRES functional classification)
cl-gran-santiago | Gran Santiago / continuous urban agglomeration
cl-iac | Índice de Actividad del Comercio (IAC)
cl-imacec | IMACEC — Indicador Mensual de Actividad Económica
cl-inacer | Indicador de Actividad Económica Regional (INACER)
cl-inacer-regiones | INACER — Indicador de Actividad Económica Regional (multi-region)
cl-ipc | Índice de Precios al Consumidor (IPC) / Consumer Price Index
cl-ipega | Índice de Producción de Electricidad, Gas y Agua (IPEGA)
cl-ipi | Índice de Producción Industrial (IPI) / Industrial Production Index
cl-ipman | Índice de Producción Manufacturera (IPMan)
cl-ipmin | Índice de Producción Minera (IPMin)
cl-ipom | Informe de Política Monetaria (IPoM)
cl-isapres | Isapres — private health-insurance system statistics
cl-litio | Producción de litio / carbonato de litio (Chile)
cl-loc-bcch | Ley Orgánica Constitucional del Banco Central de Chile (Ley 18.840)
cl-magallanes-entity | Región de Magallanes y de la Antártica Chilena — low-poverty contrast
cl-maule-entity | Región del Maule — secondary high-poverty node
cl-meta-inflacion | Marco de metas de inflación (3%) y régimen de tipo de cambio flexible
cl-mineduc-matricula | Estadísticas de matrícula del sistema escolar (MINEDUC)
cl-pobreza | Medición de la pobreza por ingresos / Income poverty measurement
cl-presupuesto-nacional | Ley de Presupuestos / National Budget execution statistics
cl-remuneraciones | Índices Nominales de Remuneraciones y de Costos Laborales
cl-reservas-bcch | Reservas Internacionales del Banco Central de Chile
cl-rm-santiago | Región Metropolitana de Santiago (RMS) — core statistical region
cl-simce | Sistema de Medición de la Calidad de la Educación (SIMCE)
cl-uf-utm | Unidad de Fomento (UF) y Unidad Tributaria Mensual (UTM)
cl-valparaiso-entity | Región de Valparaíso — core statistical identity
```
</details>
