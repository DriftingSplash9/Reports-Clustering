# sc-75 — the German EVAS source-survey sub-graph, first cut, Part A record

Governing brief: `Research.1.md` v3.0. Scope: `PartB_soft_connections_2026-08-04.md`'s
sc-75, flagged since `G.26.md` as "a whole sub-graph, not one edge" and
never started.

## What this session did

Downloaded and read in full the document `de-destatis-national-accounts.json`'s
`_dropped` array had already quoted from but never opened directly: **"ESA
2010 methods and sources for the German GNI and its components", Edition
2025** (destatis.de, 372 pages, 4.4MB, fetched via `curl` + `pypdf` since
`WebFetch`'s summariser would lose the table structure). 245 mentions of
`EVAS` across the document; 65 distinct EVAS register numbers.

## The document's own Chapter 10

Found and transcribed **Chapter 10, "Main data sources used"** — the GNI
inventory's own structured, numbered, three-tier table naming every source
statistic feeding the German GNI calculation:

- **10.1 Main surveys from Destatis** — 46 rows, each with an EVAS register
  number, a title, and which of the Production/Expenditure/Income approaches
  it feeds.
- **10.2 Main other official data sources** — 16 rows, mostly named by
  institution (Bundesbank, BaFin, Kraftfahrt-Bundesamt, etc.) rather than by
  a titled publication.
- **10.3 Other data sources** — 7 rows, non-government (Stifterverband,
  Deutsche Börse, etc.).

**This is `Research.1.md` §7's strongest evidence class, at scale**: a
document naming its own inputs in a table. The full table is transcribed
verbatim into `src/data/research/de-destatis-source-surveys.json`'s
`_dropped` array so a future session does not have to re-download and
re-parse a 4.4MB PDF to continue this thread.

## Nodes minted (3 of 46+)

Deliberately a first cut, not an attempt to clear the whole table in one
pass — three candidates chosen for the clearest, most immediately verifiable
cadence evidence:

- **`de-destatis-cpi`** — Consumer Price Index for Germany (EVAS 61111).
  **Live-verified** on `destatis.de/EN/Themes/Economy/Prices/Consumer-Price-Index` —
  monthly, two-stage (flash then confirmed), same shape as `eurostat-hicp`.
  Worth flagging on its own: **German CPI was not a node in this corpus
  until this session**, despite `statcan-cpi`, `bls-cpi`, `lu-statec-ipch`
  and `eurostat-hicp` all already being present — an odd gap for the branch
  to have carried.
- **`de-destatis-labour-cost-survey`** — Labour Cost Survey (EVAS 62411).
  Cadence stated directly in the GNI inventory's own text: *"takes place
  every 4 years (also 2020)."* Not independently re-verified on a separate
  Destatis page — the GNI inventory is itself the primary source for this
  fact, same standard as any other document-stated cadence in this corpus.
- **`de-destatis-quarterly-production-survey`** — Quarterly Production
  Survey in Manufacturing, Mining and Quarrying (EVAS 42131). Cadence from
  the survey's own title in the Chapter 10 table.

## Edges added (3)

All three: `de-destatis-national-accounts -> [survey]` (`uses_data_from`),
direction taken directly from Chapter 10's own table, which marks each row
against the specific approach(es) of the GNI calculation it feeds.

## Not minted, and why — the remaining 43+16+7 rows

**Deliberately left as a structured backlog, not chased further this
session.** Notable candidates for a future pass, in rough priority order:

- **EVAS 73311/73321** (VAT/turnover-tax statistics, advance returns and
  assessment) — the single most-cited source statistic in the whole
  document (35 mentions for 73311 alone), but administrative rather than
  survey-based; cadence not established this session.
- **EVAS 47410** (Structural survey in the trade and service sector,
  current since 2021, successor to the now-superseded EVAS 47415) — heavily
  used across the document's production-approach calculations.
- **EVAS 31211** (Census of buildings and housing) and **EVAS 12111**
  (Population census) — both plausible generational-cadence nodes on the
  `sna-2008`/`esa-2010` pattern (Germany's most recent census, `Zensus
  2022`, is well known but its stated cadence was not independently
  verified this session).
- **The Bundesbank's Monthly Report and Annual Report** (Chapter 10.2) —
  particularly promising given `de-bundesbank-financial-accounts` already
  exists in this corpus from earlier in this session; these would be
  additional, distinct Bundesbank products, not duplicates of it.

## Corpus impact

**162 → 165 reports** (three new), **228 → 231 dependencies** (three new).
`npm run validate` and `npm run check` both exit 0.
