# GROKREADME — standing rules for every research prompt in this project

Attach or paste this file alongside whichever numbered regional prompt you're
working from, every single time. It carries every rule that stays the same
no matter which country, province, or region the regional prompt covers. The
regional file itself only contains the specific research question, the
specific attachments, and any ids specific to that jurisdiction.

(Standing rules — last revised 2026-08-22)

## What this project is

A graph of official reports, statistical releases, and the institutions
that publish them. Nodes are real, individually citable documents or
institutions; edges are dependency relationships between them (one report's
methodology depends on a standard, one report's figures feed another, one
report is calculated from another, one report cites another) that can be
evidenced from a primary source. The graph drives a PageRank-style analysis,
so an invented node, an invented edge, or an invented id corrupts the whole
thing — not just one entry.

## Coverage is data-driven, not density-driven

This graph represents the actual network of official reports and the
dependencies that can be evidenced from primary documents — not a target
headcount. When you research any country, province, or region: stop when
additional searching stops turning up new, real, verifiable nodes or edges.
Do not judge your own output by comparing it to how dense another
jurisdiction's layer looks in this project, and do not treat matching
another jurisdiction's node count as a goal. A jurisdiction with genuinely
less to find — a smaller economy, a less-developed statistical system, a
country in crisis — should come back thinner than a large, well-resourced
one, and that's a correct result, not an incomplete one. If more searching
isn't turning up more real material, say so and stop. Don't pad a reply to
make it look more complete than what you actually found.

## Ids — use only what's given, or propose a new node

Every `source_report_id` and `target_report_id` in your reply must be
either: (a) an id explicitly listed in the regional prompt you're working
from — copied character-for-character, no paraphrasing, no re-hyphenating,
no guessing a variant — (b) one of the standard international ids listed
below, or (c) if the dependency genuinely involves something not on either
list, a full **proposed new node** (title, publisher, exact URL,
description, publication cadence) in its own `proposed_reports` array.
Never invent an id that merely looks plausible — that has broken every
round that skipped this rule.

**Standard international/standard-body ids already in the corpus — reuse
these as targets, don't re-propose them:**

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
- `asean-acss`, `apec-stats`, `comesa-stats` — regional statistical bodies already in the corpus (ASEAN, APEC, COMESA)

Propose a new international or regional-body node only for one genuinely
not on this list (name it explicitly; we'll check before minting). A
regional prompt may separately list *domestic* ids specific to its own
jurisdiction (e.g. Canada's federal transfer-program ids, or a country's
own existing node ids for a domestic-wiring pass) — those stay in the
regional file since they don't apply everywhere.

## Relationship types — closed set of exactly four values, nothing else is legal

- `methodology_depends_on` — an international or national standard,
  classification, or framework governs how the report is compiled or
  disseminated (an SNA edition, COICOP, BPM6, HS, ISIC, SDMX, an IMF
  data-standard tier, PSAS, or a named domestic regulation setting an
  index's methodology).
- `uses_data_from` — the target's figures are a direct input to the source
  (e.g. a CPI report uses a household expenditure survey; a
  trade-statistics release uses a customs declaration dataset; a municipal
  financial return feeds a provincial compilation; a rent-benefit
  program's rate is set relative to a national rental-market survey).
- `calculated_from` — the source is mechanically derived from the target
  (e.g. a real-GDP series calculated from the nominal series and a
  deflator; an equalization/transfer amount calculated from a
  jurisdiction's fiscal-capacity data; a regional index calculated from
  national sub-components).
- `cites` — referenced as context, including institutional or treaty
  membership (a statistics office citing membership in a regional
  statistical body; a report citing a trade agreement as the legal basis
  for the regime it reports on; a municipal budget citing the
  provincial/national fiscal framework as its funding basis).

Do not invent any other value (`participates_in`, `disseminated_under`,
`member_of`, `references`, etc. are all illegal and will NaN our PageRank
calculation if they slip through).

## Honesty permission

An explicit "found nothing solid for X" — for a country, a province, or a
specific claim — is a correct and useful answer, every time. We would
rather have a handful of solid, verifiable results than many shaky ones.
Say so and move on rather than straining to manufacture a connection or a
claim.

## Source-quality rules

Primary documents only — the government's or agency's own
budget/financial-statement/regulation/methodology pages, the treaty or
agreement text itself, an IMF Article IV or DSBB/e-GDDS metadata page, a
national statistics office's own publication. No third-party scorecards,
aggregators, or news-summary sites as citations (ODIN and similar are leads
to chase, never sources to cite). Every `evidence_quote` must name the
specific country, province, or agency and state the specific claim the
edge makes — not a generic sentence that could apply to five other
jurisdictions.

## How to reply

One JSON object with two arrays:

- `proposed_reports` — one entry per new report or institution node you
  find: `{ proposed_id, kind (domestic/international), title, publisher,
  country (ISO-3166 alpha-2, or omit for a sub-national/institutional
  node), region, jurisdiction_level (federal/provincial/municipal/
  institutional — for within-country layers, omit otherwise), url,
  description, publication_cadence }`.
- `dependencies` — one entry per edge you can support with a primary
  source: `{ source_report_id, target_report_id, relationship_type, basis,
  evidence_url, evidence_quote }`.

Start your reply by confirming which of the files listed in the regional
prompt's "Attach" line you actually received, and which countries or
jurisdictions in the prompt you found real, current, citable material for
versus thin or nothing. We raw-verify every quote before anything is
minted, same as always.
