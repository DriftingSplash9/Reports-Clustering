# Prompt for Grok — domestic wiring — Uruguay, Paraguay, Guyana, Suriname

**Standing rules:** see `../GROKREADME.md` — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `uy-uruguay-grok-2026-08.json`, `py-paraguay-grok-2026-08.json`, `gy-guyana-grok-2026-08.json`, `sr-suriname-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

**Uruguay 25/48 (52%), Paraguay 19/46 (41%), Guyana 27/36 (75%), Suriname 32/39 (82%) unlinked.** Uruguay and Paraguay both have large MERCOSUR-related agreement bundles; Guyana's corpus is largely the ExxonMobil production-sharing agreement and CARICOM membership; Suriname's is thin generally and includes an IMF stabilisation programme (`sr-imf`).

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "Uruguay / Paraguay / Guyana / Suriname" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of GROKREADME.md's standard international ids, OR — if the dependency genuinely involves something not on either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't on one of those lists; that has broken every round so far.

## The ask

Find real, citable **domestic** (within-country) dependency edges among the nodes listed below — which report's figures feed which, which report's methodology is governed by which standard, which trade/legal instrument a statistics release cites as its basis. Every one of these nodes currently has **zero edges** in our graph (or is directly relevant context for one that does) — they were minted as candidates but never wired to anything.

Likely angles: do Uruguay's or Paraguay's INE/BCP statistical releases cite MERCOSUR (`uy-mercosur`, `py-mercosur`) or its various sub-agreements (`uy-mercosur-ue`, `uy-mercosur-singapur`, `uy-mercosur-efta`, `py-mercosur-ue`, `py-ace-chile`, `py-aladi-ace`) as the customs/tariff basis for trade statistics? Does Guyana's statistics bureau cite the ExxonMobil PSA (`gy-psa-exxon`) as a data source for oil-revenue figures, or CARICOM (`gy-caricom`) for regional harmonisation? Does Suriname's stabilisation programme (`sr-imf`) impose a specific data-standard commitment worth an edge to its own statistics office's releases?

## Node lists

<details>
<summary>Uruguay — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
uy-agro | Sector agropecuario / Agricultural & livestock statistics
uy-artigas | Departamento de Artigas — high-poverty border contrast
uy-asignaciones | Asignaciones familiares y transferencias (BPS)
uy-asse | ASSE — Administración de los Servicios de Salud del Estado
uy-bop | Balanza de Pagos / Balance of Payments
uy-bps | Banco de Previsión Social (BPS) — social-security coverage and finances
uy-canelones | Departamento de Canelones — core metropolitan periphery
uy-carne | Exportaciones de carne / Beef & meat exports
uy-celulosa | Celulosa y forestal / Pulp & forestry exports
uy-censo | Censo de Población y Vivienda / Population and Housing Census
uy-cerro-largo | Departamento de Cerro Largo — high-poverty border contrast
uy-colonia | Departamento de Colonia — low-poverty contrast
uy-comercio-exterior | Estadísticas de Comercio Exterior / Merchandise Trade
uy-construccion | Actividad de la construcción / Construction activity
uy-cotizantes | Cotizantes BPS / Formal employment contributors
uy-cuentas-nacionales | Cuentas Nacionales / National Accounts of Uruguay
uy-deuda-publica | Deuda pública / Public debt statistics
uy-dgi | Dirección General Impositiva (DGI) — tax collection
uy-eaae | Encuesta Anual de Actividad Económica (EAAE)
uy-ech | Encuesta Continua de Hogares (ECH) / Continuous Household Survey
uy-educacion-salud | Gasto público en educación y salud
uy-empleo | Indicadores de empleo y desempleo (ECH)
uy-flores | Departamento de Flores — low-poverty interior contrast
uy-fonasa | FONASA / Seguro Nacional de Salud
uy-gini | Coeficiente de Gini / Income inequality
uy-inale | Instituto Nacional de la Leche (INALE)
uy-ipc | Índice de Precios al Consumo (IPC) / Consumer Price Index
uy-ipm | Índice de Pobreza Multidimensional (IPM)
uy-ipom | Informe de Política Monetaria (IPoM)
uy-ivfim | Índice de Volumen Físico de la Industria Manufacturera (IVFIM)
uy-jubilaciones | Jubilaciones y pensiones (BPS)
uy-lacteos | Lácteos — producción y exportaciones
uy-lineas-pobreza | Líneas de pobreza e indigencia
uy-maldonado | Departamento de Maldonado — low-poverty southern contrast
uy-meta-inflacion | Marco de metas de inflación — BCU
uy-montevideo | Montevideo — capital statistical identity
uy-pobreza | Pobreza por el método del ingreso / Income poverty
uy-pobreza-departamental | Pobreza por departamento (INE)
uy-presupuesto | Presupuesto Nacional / National Budget
uy-promocion-inversiones | Ley de Promoción de Inversiones / COMAP regime
uy-reservas | Activos de reserva / International reserves
uy-rivera | Departamento de Rivera — high-poverty border contrast
uy-salto | Departamento de Salto — northern interior
uy-soja | Soja y granos — producción y exportaciones
uy-tpm | Tasa de Política Monetaria (TPM) / Policy interest rate
uy-turismo | Turismo y hotelería / Tourism & hospitality
uy-uruguay-xxi | Uruguay XXI — investment & export promotion agency
uy-zonas-francas | Régimen de Zonas Francas
```
</details>

<details>
<summary>Paraguay — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
py-alto-parana | Departamento de Alto Paraná — industrial & border hub
py-asistencia-escolar | Tasa de asistencia escolar (EPHC)
py-asuncion | Asunción — capital statistical identity
py-bop | Balanza de Pagos / Balance of Payments
py-caaguazu | Departamento de Caaguazú — central interior
py-caazapa | Departamento de Caazapá — high-poverty contrast
py-carne | Carne bovina — producción y exportaciones
py-censo | Censo Nacional de Población y Viviendas / Population and Housing Census
py-central | Departamento Central — core metropolitan periphery
py-cnime | Consejo Nacional de Industrias Maquiladoras de Exportación (CNIME)
py-cnzf | Consejo Nacional de Zonas Francas (CNZF)
py-cobertura-salud | Cobertura de seguro médico / Health-insurance coverage
py-comercio-exterior | Reporte de Comercio Exterior / Merchandise Trade
py-concepcion | Departamento de Concepción — highest-poverty contrast
py-cuentas-nacionales | Cuentas Nacionales / National Accounts of Paraguay
py-cuentas-salud | Cuentas de Salud / National Health Accounts
py-deuda-publica | Deuda pública / Public debt statistics
py-educacion-salud | Gasto público en educación y salud
py-energia | Exportaciones de energía eléctrica (Itaipú / Yacyretá)
py-ephc | Encuesta Permanente de Hogares Continua (EPHC)
py-fonae | Fondo Nacional de Alimentación Escolar (FONAE)
py-gini | Coeficiente de Gini / Income inequality
py-ied | Inversión Extranjera Directa / FDI statistics
py-ingresos-fiscales | Ingresos fiscales del Estado / Consolidated fiscal revenues
py-ipc | Índice de Precios al Consumidor (IPC) / Consumer Price Index
py-ipm | Índice de Pobreza Multidimensional (IPM)
py-ipom | Informe de Política Monetaria (IPoM)
py-ips | Instituto de Previsión Social (IPS) — social-security coverage
py-itapua | Departamento de Itapúa — southern agricultural hub
py-ley-60-90 | Ley 60/90 — Régimen de promoción de inversiones
py-ley-7548 | Ley 7548/2025 — Nuevo régimen de incentivos fiscales para la inversión
py-ley-invariabilidad | Ley 5542/2015 — Invariabilidad de la tasa impositiva
py-lineas-pobreza | Líneas de pobreza total y extrema
py-mec | Ministerio de Educación y Ciencias (MEC) — education statistics and budget
py-meta-inflacion | Marco de metas de inflación — BCP
py-pobreza | Pobreza monetaria / Monetary poverty
py-pobreza-departamental | Pobreza monetaria por departamento (INE)
py-politica-automotor | Política Automotriz / ACE 13 sector automotor
py-presupuesto | Presupuesto General de la Nación / National Budget
py-rediex | REDIEX — Red de Inversiones y Exportaciones
py-reservas | Reservas Internacionales / International reserves
py-royalties-itaipu | Royalties y compensación por cesión de energía (Itaipú)
py-san-pedro | Departamento de San Pedro — high-poverty contrast
py-set | Subsecretaría de Estado de Tributación (SET) — tax collection
py-soja | Soja y derivados — producción y exportaciones
py-tpm | Tasa de Política Monetaria (TPM) / Policy interest rate
```
</details>

<details>
<summary>Guyana — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
gy-agua | Water and sanitation access
gy-amaila | Amaila Falls hydropower (project)
gy-amerindian | Amerindian / Indigenous population and villages
gy-arroz-azucar | Rice and sugar — traditional agriculture
gy-bauxita | Bauxite production
gy-because-we-care | Because We Care cash grant
gy-bop | Balance of Payments / External accounts
gy-cash-transfers | Cash transfers and social grants
gy-census | Population and Housing Census
gy-deuda-publica | Public debt
gy-educacion | Education system — coverage, grants and feeding
gy-eiti | EITI / extractive-sector transparency
gy-fdi | Foreign direct investment statistics
gy-fpso | FPSO fleet (Liza Destiny, Liza Unity, Prosperity, ONE Guyana)
gy-gas-to-energy | Gas-to-Energy project (Wales)
gy-georgetown | Georgetown / Region Four (Demerara-Mahaica)
gy-gpl | Guyana Power and Light (GPL)
gy-hinterland | Hinterland regions (1, 7, 8, 9)
gy-infraestructura | Roads, bridges and transport infrastructure
gy-inversion-publica | Public investment programme
gy-ipc | Consumer Price Index / Inflation
gy-lfs | Labour Force Survey
gy-local-content | Local Content Act / local-content regime
gy-nrf | Natural Resource Fund (NRF)
gy-nrf-flujos | NRF inflows and withdrawals
gy-oro | Gold production and exports
gy-petroleo | Oil production (Stabroek / Liza and subsequent FPSOs)
gy-pib | National Accounts / GDP
gy-pib-no-petrolero | Non-oil GDP
gy-pobreza | Poverty measurement (historical and residual)
gy-presupuesto | National Budget
gy-region-10 | Region 10 (Upper Demerara-Berbice) — Linden industrial/mining
gy-region-4 | Region 4 (Demerara-Mahaica) — coastal demographic core
gy-salud | Health system — access and hinterland gaps
gy-school-feeding | National School Feeding Programme
gy-vivienda | Housing programme / housing development
```
</details>

<details>
<summary>Suriname — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
sr-agricultura | Agriculture, forestry and fisheries
sr-arroz | Rice production and exports
sr-bop | Balance of Payments / External accounts
sr-bosbouw | Forestry and timber
sr-brokopondo | District Brokopondo — interior hydro and Maroon
sr-censo | Population and Housing Census
sr-comercio-exterior | Merchandise trade statistics
sr-commewijne | District Commewijne — eastern coastal
sr-deuda | Public debt and IMF programme context
sr-ebs | Energiebedrijven Suriname (EBS) — national power utility
sr-educacion | Education system — coverage and interior gaps
sr-electricidad | Electricity access and generation
sr-empleo | Labour force and employment
sr-financiamiento-staatsolie | Staatsolie financing for Block 58 equity
sr-goud | Gold production and exports
sr-indigenous | Indigenous population and communities
sr-informalidad | Labour informality
sr-ingresos-petroleros | Oil and mining fiscal revenues
sr-interior | Interior districts (Sipaliwini, Brokopondo, Para)
sr-ipc | Consumer Price Index / Inflation
sr-maroon | Maroon population and communities
sr-marowijne | District Marowijne — eastern border
sr-mtff | Medium-term fiscal framework (MTFF) / multi-year fiscal plan
sr-nickerie | District Nickerie — western agricultural
sr-paramaribo | Paramaribo — capital metropolitan core
sr-pfm-rules | Public Financial Management Law 2024 — fiscal rules
sr-pib | National Accounts / GDP
sr-pib-no-mineria | Non-mining / non-natural-resource GDP
sr-pobreza | Poverty measurement
sr-psc-fiscal | Offshore PSC fiscal terms (royalty, profit oil, tax)
sr-reservas | International reserves
sr-salario-minimo | Minimum wage
sr-salud | Health system — access and outcomes
sr-sipaliwini | District Sipaliwini — largest interior district
sr-spcs-afobaka | SPCS / Afobaka hydropower and thermal
sr-ssfs | Savings and Stabilization Fund Suriname (SSFS)
sr-staatsolie-contribucion | Staatsolie contributions to the State
sr-tipo-cambio | Exchange rate / monetary conditions
sr-wanica | District Wanica — coastal peri-urban
```
</details>
