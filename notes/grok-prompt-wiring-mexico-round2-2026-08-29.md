# Prompt for Grok — domestic wiring — Mexico, round 2

**Standing rules:** see `GROKREADME.md` (in `notes/grok-research-queue-2026-08-22/`) — attach/paste it alongside this file every time.

**Attach:** `GROKREADME.md`, `mx-mexico-grok-2026-08.json` (both under `src/data/research/`). Full id/title list also pasted below.

Paste everything below the line.

---

This is round 2 on Mexico. Round 1 (2026-08-28, plus a same-day Grok follow-up) closed 23 edges. Mexico's unlinked tail is shaped differently from other countries in this project — mostly municipal/state statistical profiles (CDMX alcaldías, Jalisco, Chiapas) sitting on strong national infrastructure (INEGI, IMSS, Banxico) that they cite directly by name. Three of the four CDMX alcaldías already checked this way (Cuauhtémoc, Tláhuac, Gustavo A. Madero) confirmed citing INEGI's Censo de Población y Vivienda, Censos Económicos and/or DENUE via a shared "Panorama Geográfico y Estadístico" PDF template (`ipdp.cdmx.gob.mx/storage/app/uploads/public/.../<hash>.pdf`).

**One lead is parked, not a research gap — don't spend time on it**: `mx-alcaldia-benito-juarez` (the fourth alcaldía). You already found its specific PDF and its exact footnotes last round (quoted verbatim in `mx-unlinked-wiring-2026-08-28.json`'s `_dropped`) — the problem is purely that `ipdp.cdmx.gob.mx` refuses every fetch attempt from this session's tools (connection resets, robots.txt timeouts, even via Wayback Machine). If you happen to load that exact URL fine, great — report it — but don't burn time re-searching for it.

**Current state, freshly measured 2026-08-29: 33 of Mexico's 102 corpus nodes (32%) still have zero edges** (matches the last-stated figure almost exactly — Mexico's count didn't drift the way several other countries' did).

**Ids — use ONLY ids from the list below, or propose a new node.** Copy ids character-for-character. Use GROKREADME.md's standard international ids where relevant, or propose a new node (title, publisher, exact URL, description, cadence) in `proposed_reports` if the dependency needs something not on either list. Never invent an id.

## The ask

Find real, citable **domestic** dependency edges among the nodes below. Untried angles worth checking first:
- **Other municipal/state profiles, same pattern as the CDMX alcaldías**: `mx-guerrero-acapulco-detail`/`mx-acapulco-metro`, `mx-chiapas-tuxtla-detail`/`mx-tuxtla`, `mx-oaxaca-de-juarez` — these read like the same "capital/major-municipality profile citing INEGI's census/economic-census/DENUE" shape already confirmed for CDMX. Check each one's own methodology or source footnotes directly rather than assuming.
- **State judicial/fiscalía statistical presence** (`mx-guerrero-judicial`, `mx-oaxaca-judicial`) — likely cite a national justice-statistics source (INEGI's Censo Nacional de Impartición de Justicia or similar — `mx-cnpje`/`mx-cnijf`/`mx-cnple` are already live in the corpus citing `mx-lsnieg`) or state-level annual reports.
- **IMSS municipal-employment pair** (`mx-jalisco-imss-municipal`, `mx-nuevo-leon-imss-municipal`) against `mx-imss-puestos` (IMSS's own national formal-employment product, already wired to SNA 2008/ICLS this corpus) — check whether IMSS's own methodology says the municipal breakdown is compiled from the same underlying registry.
- **Banxico cluster** (`mx-banxico-reservas`, `mx-banxico-tipo-cambio`, `mx-banxico-tasas-interes`) against `mx-banxico-agregados` (already wired to `imf-mfsmcg-2016`) or Banxico's own institutional statistics page — do these share the same methodology citation, or are they genuinely uncited operational series?
- **INEGI continuous-survey cluster** (`mx-ensanut`, `mx-enigh-salud`, `mx-encig`, `mx-envipe`, `mx-ensu`, `mx-enoe-informalidad`, `mx-ena`, `mx-enadid`, `mx-endutih`, `mx-enh`, `mx-enigh-transferencias`, `mx-emoe`, `mx-igae-actividades`, `mx-scnm-sectores-institucionales`) — each is a named INEGI survey/product; check for cross-citation among them (e.g. a derived indicator citing its parent survey by name) rather than assuming they're all standalone.
- **Pensions/benefits cluster** (`mx-pension-bienestar-mujeres`, `mx-pension-discapacidad`, `mx-issste-anuarios`, `mx-infonavit-estadisticas`) against each other or against a Ministry of Welfare framework document.
- **`mx-cdmx-ipdp-indicadores`** (Mexico City's own city-wide indicator system) — check whether it cites the same alcaldía-level "Panorama" documents already confirmed for 3 of 4 alcaldías, or a different aggregation source.

Don't force a connection that isn't real — a standalone node with no statistical report to attach to is a fine "no edge found" answer.

## Node list — 33 currently unlinked Mexico nodes

```
mx-jalisco-imss-municipal | IMSS formal employment by municipality (Jalisco / Guadalajara metro)
mx-nuevo-leon-imss-municipal | IMSS formal employment by municipality (Nuevo León / Monterrey metro)
mx-alcaldia-benito-juarez | Alcaldía Benito Juárez — statistical and administrative profile
mx-guerrero-judicial | Poder Judicial / Fiscalía del Estado de Guerrero — statistical presence
mx-guerrero-acapulco-detail | Acapulco de Juárez — extended municipal profile (tourism, insecurity, recovery)
mx-chiapas-tuxtla-detail | Tuxtla Gutiérrez — extended capital / municipal profile
mx-oaxaca-de-juarez | Oaxaca de Juárez — capital municipal profile
mx-oaxaca-judicial | Poder Judicial / Fiscalía del Estado de Oaxaca — statistical presence
mx-tuxtla | Tuxtla Gutiérrez — capital municipal profile (Chiapas)
mx-acapulco-metro | Acapulco de Juárez — municipal / nominal metro profile (Guerrero)
mx-ensanut | Encuesta Nacional de Salud y Nutrición (ENSANUT / Ensanut Continua) / National Health and Nutrition Survey
mx-enigh-salud | ENIGH — Gasto de los hogares en cuidados de la salud / Household health expenditure (from ENIGH)
mx-encig | Encuesta Nacional de Calidad e Impacto Gubernamental (ENCIG) / National Survey of Governmental Quality and Impact
mx-envipe | Encuesta Nacional de Victimización y Percepción sobre Seguridad Pública (ENVIPE)
mx-ensu | Encuesta Nacional de Seguridad Pública Urbana (ENSU) / National Survey of Urban Public Security
mx-issste-anuarios | Anuario Estadístico del ISSSTE / ISSSTE Statistical Yearbook
mx-pension-bienestar-mujeres | Pensión Mujeres Bienestar
mx-pension-discapacidad | Pensión para el Bienestar de las Personas con Discapacidad
mx-enoe-informalidad | ENOE — Tasa de informalidad laboral / Labour informality rate (from ENOE)
mx-scnm-sectores-institucionales | Cuentas por Sectores Institucionales (SCNM) / Institutional Sector Accounts
mx-ena | Encuesta Nacional Agropecuaria (ENA) / National Agricultural Survey
mx-enadid | Encuesta Nacional de la Dinámica Demográfica (ENADID) / National Survey of Demographic Dynamics
mx-endutih | Encuesta Nacional sobre Disponibilidad y Uso de Tecnologías de la Información en los Hogares (ENDUTIH)
mx-banxico-reservas | Reservas Internacionales Netas / Net International Reserves
mx-banxico-tipo-cambio | Tipo de cambio peso-dólar (fijación Banxico) / Peso-dollar exchange rate (Banxico fix)
mx-enh | Encuesta Nacional de Vivienda (ENH) / National Housing Survey (or related continuous housing modules)
mx-enigh-transferencias | ENIGH — Ingresos por transferencias / Transfer income (from ENIGH)
mx-banxico-tasas-interes | Tasas de interés de mercado (Cetes, TIIE, etc.) / Market interest rates
mx-infonavit-estadisticas | Estadísticas de crédito y vivienda Infonavit / Infonavit housing-credit statistics
mx-edos-nacimientos | Estadísticas de Nacimientos / Birth Statistics
mx-emoe | Encuesta Mensual de Opinión Empresarial (EMOE) / Monthly Business Opinion Survey
mx-igae-actividades | IGAE por actividad económica / Global Indicator of Economic Activity by activity
mx-cdmx-ipdp-indicadores | Sistema de Indicadores de la Ciudad de México (SI CDMX) / IPDP indicator system
```
