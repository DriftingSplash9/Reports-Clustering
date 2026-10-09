# Node granularity — Uruguay, 2026-10-05 (WRITTEN the same day)

**STATUS: WRITTEN 2026-10-05 on Thomas's approval** (*"write Uruguay, retire the China node too"*). Answers: (1) yes;
(3) yes — `uy-china-relacion` retired as a bilateral-relationship framing, its one edge
(`-> uy-comercio-exterior`, C) removed with it; (2), (4), (5) not answered, so `uy-presupuesto`/`uy-educacion-salud`
and `uy-ipc`'s title are untouched and the three annual reports got the verified 2025 EDITION pages, `uy-censo` the
programme page `censosphv`. Collision guard (every new url against every live node, seed files included): 0 hits.
Retired records verbatim: `notes/retired-nodes-2026-10-05-uy.json`; `meta.merged` and `meta.retired` in the slice;
the 6 re-pointed edges carry `_repointed_from`; pre-change slices in `_to_delete/`. `validate` after: exit 0,
128/128, **3,679 / 3,458, 1,413 A · 1,434 B · 611 C, 964 zero-edge**; rule-14 hand check 0 hits; Uruguay url
collisions 27 nodes → 15 (the 10 INE-homepage nodes left are the 9 jurisdictions and `uy-construccion`; the 5 MEF
ones are the CHECKs and regimes), corpus-wide 113 groups / 310 nodes. **Re-grade:** all 11 live edges on the moved
edges' two evidence urls, every host 200, **no grade changed** — the 5 department edges stay B `no-quoted-span`
(the grader now matches 6/8 of `uy-pobreza`'s title; their `basis` holds a verbatim sentence from the report but no
`evidence_quote`, so a reader-accepted quote backfill is the route to A), and the 6 edges citing INE's homepage stay
C `index-page`. Nothing written by the re-grade. The dry-run account follows, unchanged.

Second country under ruling (a), one node per document (Thomas, 2026-10-05). Method, instruments and
the Brazil write: `notes/granularity-pilot-br-2026-10-05.md`. Artefacts:
`Claude outputs/granularity-uy-2026-10-05/`. **No data file was changed.**

## Headline: Uruguay is mostly NOT a granularity problem

`measure-url-collisions.ts`: **2 url groups, 27 nodes**, and both urls are **agency homepages with
a path** — `https://www.gub.uy/instituto-nacional-estadistica` (21 nodes) and
`https://www.gub.uy/ministerio-economia-finanzas` (6). `isBareHost` reads a path as not-bare, so these
sit in the collision count rather than the 1,014 bare-homepage count; they are the same defect. Of 27
nodes **one is a merge**. Hosts: `www.gub.uy` and `www5.ine.gub.uy` answered curl 200 from this
machine (a first "000" was this session's own bad output path, not the host); INE's site SEARCH only
renders in a browser, so it was driven in the built-in browser pane.

| class | nodes | action proposed |
|---|---|---|
| **MERGE** | `uy-pobreza-departamental` → `uy-pobreza` | INE's annual *Estimación de la pobreza por el método del ingreso* carries the departmental results as its own section (*Distribución territorial de la pobreza*, Mapa 1, naming Cerro Largo, Rivera, Artigas … Colonia, Flores — read in the 2025 report). Five of the six edges into the retired node already cite the 2024 edition of that report |
| **URL REPAIR — distinct INE document** | `uy-ech`, `uy-censo`, `uy-eaae`, `uy-ivfim`, `uy-ipc`, `uy-ipm`, `uy-gini`, `uy-pobreza` | each has its own INE page, verified 200 with matching `<title>` (table below) |
| **URL REPAIR — needs a series url** | `uy-empleo`, `uy-lineas-pobreza` | real recurring products (monthly *Actividad, empleo y desempleo*; the poverty/indigency line series) whose pages are dated releases; the series pages below are the stable candidates |
| **JURISDICTION — leave alone** | `uy-montevideo`, `uy-artigas`, `uy-rivera`, `uy-cerro-largo`, `uy-colonia`, `uy-maldonado`, `uy-canelones`, `uy-flores`, `uy-salto` | the "high/low-poverty contrast" set `playbook/corpus-nodes.md` §7c says never to sweep; not documents, so ruling (a) does not reach them. Their INE-homepage url is wrong for a jurisdiction but they need no document url |
| **CHECK** | `uy-construccion` | zero edges; described as activity/employment/permits, which is not INE's one construction product (the ICCV, a cost index) |
| **CHECK — MEF** | `uy-presupuesto`, `uy-educacion-salud` | `uy-presupuesto` mixes the five-year *Presupuesto Nacional* law and the annual *Rendición de Cuentas*, two documents; `uy-educacion-salud` is a topic whose one edge cites the *Rendición de Cuentas 2023* exposición de motivos. If `uy-presupuesto` is ruled to BE the Rendición de Cuentas, the topic merges into it (variant below) |
| **URL REPAIR — MEF, no candidate yet** | `uy-deuda-publica` | the MEF search did not surface the debt unit's reports |
| **INSTRUMENT, zero edges** | `uy-zonas-francas`, `uy-promocion-inversiones` | legal regimes (MEF pages: `/zonas-francas-pais`, `/Comap`); legitimate only if a release names one as its basis (§7c) — not a granularity question |
| **RETIRED CLASS? — for Thomas** | `uy-china-relacion` (`kind: instrument`, 1 C edge on the MEF homepage) | *"Relación comercial y estratégica con China"* is a bilateral-relationship framing — the class retired 2026-08-29/31 (`playbook/corpus-nodes.md` §7c). Not retired here: that ruling applies by name, not by this pass |

### Candidate urls, all 200 with matching `<title>` on 2026-10-05 (base `https://www.gub.uy/instituto-nacional-estadistica/`)

| node | path | INE's title |
|---|---|---|
| `uy-ech` | `encuesta-continua-hogares` | Encuesta Continua de Hogares (ECH) |
| `uy-censo` | `censosphv` (programme) or `censos2023pvh` (2023 edition) | Censos de Población, Hogares y Viviendas / Censo 2023 |
| `uy-eaae` | `Encuesta-Anual-Actividad-Econ%C3%B3mica` | Encuesta Anual de Actividad Económica (EAAE) |
| `uy-ivfim` | `indice-volumen-fisico-industria-manufacturera` | Índice de Volumen Físico de la Industria Manufacturera (IVFIM) |
| `uy-ipc` | `indice-precios-consumo` | Índice de Precios **del** Consumo (IPC) |
| `uy-pobreza` | `comunicacion/publicaciones/estimacion-pobreza-metodo-del-ingreso-ano-2025` | Estimación de la pobreza por el método del ingreso. Año 2025 |
| `uy-gini` | `comunicacion/publicaciones/indicadores-distribucion-del-ingreso-ano-2025` | Indicadores de la distribución del ingreso. Año 2025 |
| `uy-ipm` | `comunicacion/publicaciones/pobreza-multidimensional-2025` | Pobreza Multidimensional 2025 |
| `uy-empleo` | `datos-y-estadisticas/estadisticas/series-historicas-actividad-empleo-desempleo` | Series históricas de actividad, empleo y desempleo |
| `uy-lineas-pobreza` | `datos-y-estadisticas/estadisticas/pobreza` | Pobreza |

**Two things these urls expose.** (1) **`uy-gini` is its own document**: INE publishes income
distribution (*Indicadores de la distribución del ingreso*) separately from the poverty report, and the
2025 poverty report contains no "Gini" — so Gini is not a merge into `uy-pobreza`. (2) **`uy-ipc`'s title
is not INE's**: the node says *"Índice de Precios al Consumo"*, INE's page *"Índice de Precios del
Consumo"*. A node carries the publisher's title (§7a), and titles are grader inputs, so changing it can
move the grades of its 3 in-edges — a fix to make deliberately, with a re-grade, not inside a url pass.
(3) The annual-report urls are EDITION pages; whether a recurring node points at its latest edition or
a series page has no recorded house rule.

## What the merge does

`simulate-merge.ts` against `uy-plan.json` (one merge): **6 live edges re-point**, all
`<department> -> uy-pobreza` (5 B, 1 C); **none dropped**; **no `_dropped` note names the retired id**;
reports 3,681 → 3,680, edges unchanged at 3,459.

| | before | after |
|---|---|---|
| `uy-pobreza` | rank 2,280, authority 0.01391 | **rank 55, 0.07561** |
| `uy-lineas-pobreza` | rank 543 | rank 133 |
| `uy-ech` | rank 285 | rank 148 |
| `uy-ipc` | rank 248 | rank 155 |

The retired node had held all six in-edges while the document itself held none — so the poverty
report ranked 2,280th and a section of it ranked 123rd. Same direction as Brazil, starker.

**Variant** (`uy-plan-variant.json`, adds `uy-educacion-salud` → `uy-presupuesto`): one more edge
re-points (`uy-presupuesto -> uy-cuentas-nacionales`, C); `uy-presupuesto` 2,292 → 344. Only if
`uy-presupuesto` is ruled to be the Rendición de Cuentas.

## Proposed write, once approved

1. Merge `uy-pobreza-departamental` → `uy-pobreza` (as Brazil: `meta.merged`, retired record in
   `notes/retired-nodes-<date>.json`, `_repointed_from` on each edge), then re-grade the 6 edges.
2. URL repairs for the 10 nodes in the table above, plus `uy-pobreza-departamental`'s survivor.
3. Leave the jurisdiction set, `uy-construccion`, the MEF CHECKs, the two regimes and `uy-china-relacion`.

## Questions for Thomas

1. **Write the merge and the 10 url repairs?**
2. **`uy-presupuesto`**: the five-year budget law, the annual Rendición de Cuentas, or split? Decides the variant.
3. **`uy-china-relacion`**: retire under the 2026-08-29/31 treaty-and-relationship ruling?
4. **Recurring nodes**: latest edition page or series page as the url? No house rule exists.
5. **`uy-ipc`'s title** → INE's *"Índice de Precios del Consumo"*, with a re-grade of its 3 in-edges?


**Edition pages, 2026-10-06** (Thomas: *"fix the Uruguay edition pages"*): the two nodes written on series pages before the
edition rule existed now follow it. `uy-empleo` → *"Actividad, Empleo y Desempleo (ECH) Agosto 2026"*
(`…/comunicacion/publicaciones/actividad-empleo-desempleo-ech-agosto-2026`, 200, title confirmed). `uy-lineas-pobreza` →
INE's poverty-and-indigence-line file *"Líneas de Pobreza e Indigencia per cápita, para Montevideo e Interior"*, the
2017-methodology one (`www5.ine.gub.uy/…/Pobreza/CBA_LP_LI%20M2017.xls`, a 206 with an Excel signature) — a file INE
updates in place, so it IS the current edition; the node's own description ("differentiated for Montevideo and the
Interior and updated with price information") matches it, and the 2006-methodology file beside it was not used. Guard 0
hits; backup `_to_delete/uy-uruguay-2026-08.pre-edition-urls-2026-10-06.json`; `validate` exit 0, counts unchanged,
NODE URLS index-page 97 → 96. `www.gub.uy` answered curl 000 once and 200 seconds later — transient.
