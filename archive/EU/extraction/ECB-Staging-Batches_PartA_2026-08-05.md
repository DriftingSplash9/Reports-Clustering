# ECB/Eurosystem staging batches — Part A extraction, 2026-08-05

Governing brief: `Research.1.md` v3.0. Scope: `G.41.md`/`G.42.md`'s cheap check
"staging batches 47, 51–56, 61–62, 69–72" (priority C), `EU/slices/_staging/10-batch-with-records.ndjson`
indices 47, 51, 52, 53, 54, 55, 56, 61, 62, 69, 70, 71, 72. These are staged
extractions from an earlier session (session_window 2026-08-03, governing
brief at the time `Research.2.md Version 2.1 (fixed)`), sitting unverified
since — the same situation `G.39.md` found and resolved for index 68.

## What this session did

Read all 13 flagged indices in full (98 part_a_records total across them,
before the duplicate below is accounted for). Live-verified a representative
sample of the strongest candidate quotes against primary sources — the
Regulation text, the Eurostat and ECB methodology pages themselves — rather
than promoting all 98 records on staging's word alone. Did not independently
re-verify every record; see "Not verified this session" below.

## Finding 0 — indices 53 and 54 are byte-for-byte identical

`python3` comparison of the two records (`lines[53] == lines[54]`) returns
`True`. Same `batch_id` (`NONBANK-EBA-SUP-2026-08-03-A1`), same eight
records, same characters throughout. Not two batches — one batch duplicated
in the staging file. Treated as a single batch for this pass. Flagged as a
data-quality issue in the staging pipeline itself, not corrected in place
(the staging file is left as found, per the branch's own "never edit a
predecessor" spirit extended to raw staging material).

## Live verification performed

Four checks, chosen for where a live re-fetch would most change what gets
minted:

1. **Council Regulation (EC) No 479/2009, Articles 3(1) and 8(3)**
   (`eur-lex.europa.eu/eli/reg/2009/479/oj/eng`) — fetched in full. Article
   3(1) matches the staged quote verbatim. Article 8(3) reads: *"The
   Commission (Eurostat) shall report regularly to the European Parliament
   and to the Council on the quality of the actual data reported by Member
   States. The report shall address the overall assessment of the actual
   data reported by Member States as regards to the compliance with
   accounting rules, completeness, reliability, timeliness, and consistency
   of the data."* **Note the precise wording**: the Regulation itself says
   "regularly," not "annually" — the annual characterization comes from
   Eurostat's own webpage (next item), not the statute. Also fetched Article
   8(2)(c), which explicitly lists **"EDP notification tables"** as one of
   the four categories of statistical information Eurostat draws on for the
   quality assessment — the direct textual basis for a new edge (below).
2. **Eurostat EDP notification tables page**
   (`ec.europa.eu/eurostat/web/government-finance-statistics/excessive-deficit-procedure/edp-notification-tables`)
   — matches the staged quote verbatim, and **the live page shows the actual
   dated release pattern**: "April 2026" and "October 2025" release blocks,
   confirming the biannual cadence in practice, not just in the statute.
3. **Eurostat GFS quality page**
   (`ec.europa.eu/eurostat/web/government-finance-statistics/quality`) —
   matches the staged quote verbatim, and gives the report its actual title:
   *"Staff working document reporting to the European Parliament and the
   Council on the quality of fiscal data reported by Member States (MS) in
   2025."*
4. **ECB Consolidated Banking Data methodology page**
   (`data.ecb.europa.eu/methodology/consolidated-banking-data`) — matches the
   staged quotes verbatim, **and confirms a real, live, unreconciled
   contradiction on the page itself**: near the top, "Data are published four
   times a year: there is a comprehensive set of end-year data and a smaller
   subset which is subject to more frequent reporting." Further down the same
   page: "The data are semi-annual, except for certain detailed breakdowns
   which are collected only annually." Both sentences are on the live page
   today, not a staging transcription error and not a stale-vs-current split
   — the ECB's own methodology page disagrees with itself. **Not resolved
   here** — reported as found, per `Research.1.md` §3's instruction not to
   adjudicate conflicting passages.
5. **Eurostat GFS "Information on data" page**
   (`ec.europa.eu/eurostat/web/government-finance-statistics/information-data`)
   — matches the staged quote verbatim: *"EDP statistics should be fully
   consistent with the GFS data supplied through the ESA 2010 transmission
   programme. GFS are part of national accounts."* The direct textual basis
   for the `eurostat-edp-notification-tables -> esa-2010` edge (below).
6. **ECB MFI aggregated balance sheet methodology page**
   (`data.ecb.europa.eu/methodology/mfi-aggregated-balance-sheet`) — matches
   the staged quote verbatim: *"Monetary financial institution (MFI) balance
   sheet items (BSI) statistics are compiled by the ECB and include monthly
   and quarterly data."* Confirms Regulation ECB/2021/2 and Guideline
   ECB/2021/11 as the governing instruments.

One EUR-Lex PDF fetch attempt failed the same way `G.38.md`/`G.41.md`
recorded for other EU-agency hosts: `CELEX:32021O0833` (the current
Consolidated Banking Data Guideline, ECB/2021/14) triggered a browser
file-download response rather than a page load. Not chased further via
`WebFetch`+`pypdf` this session — the live page contradiction (item 4 above)
is itself the finding; resolving it would need the Guideline's own frequency
article, which is exactly what this failed fetch would have supplied. Left
as a cheap check for a future session (see hand-off).

## Nodes minted (4)

### `eurostat-edp-notification-tables`
Biannual (April/October), Regulation (EC) 479/2009 Article 3(1) — Member
States report twice a year, before 1 April and before 1 October; Eurostat
publishes the tables in April and October. Live-confirmed both by the
statute and by the page's own current release listing.

### `eurostat-edp-gfs-quality-report`
Annual — Regulation 479/2009 Article 8(3) requires Eurostat to report
"regularly" on data quality; Eurostat's own page characterizes the resulting
reports as annual, and the current edition ("2025" data) is named and dated
live. **Edge**: `eurostat-edp-gfs-quality-report -> eurostat-edp-notification-tables`
(`uses_data_from`) — Article 8(2)(c) names EDP notification tables explicitly
as one of the inputs to the quality assessment.

### `ecb-mfi-balance-sheet-items`
Monthly (with quarterly breakdowns) — live-confirmed on the ECB's own
methodology page. Governed by Regulation ECB/2021/2 and Guideline ECB/2021/11.
**This resolves the target half of a `_dropped` "no-node-yet" entry already
sitting in `eurosystem-ecb.json`** (`G.39.md`'s ECB-04): "Guideline (EU)
2024/2941: 'The monthly data feed into the published aggregated statistical
data required from monetary financial institutions (MFIs) in the Union.'...
no MFI statistics node exists yet in this corpus." **A node now exists — the
edge itself is deliberately not added this session**, because
`eurosystem-ecb.json`'s own note flags that the exact Annex citation for that
quote was never independently re-verified, and I did not re-verify it this
session either. Wiring the edge without that check would just move the same
hedge one file over. Flagged as the single cheapest, highest-value follow-up
(see hand-off).

### `ecb-consolidated-banking-data`
Cadence **recorded as conflicting, not resolved** — see live verification
item 4. `releases_per_year: 4` is used for the graph (the figure stated first
and most prominently on the ECB's own page), but `cadence_note` states the
contradiction explicitly rather than hiding it. Governed by Guideline
ECB/2021/14; built from EBA Implementing Technical Standards (FINREP/COREP)
supervisory reporting, which is not itself a corpus node (institutional
source, `AGENCY ONLY`-equivalent) — no edge added for that.

## Not minted, and why (deferred, not dropped-as-denied)

- **Supervisory Banking Statistics (SUP)**, **Investment Funds statistics
  (IVF)**, **Insurance Corporations statistics (ICB/ICO)** (idx 53/54) —
  each is a real, named, ECB-published dataset with a stated legal basis
  (Regulation ECB/2013/38 + Guideline ECB/2021/12 for IVF; Regulation
  ECB/2014/50 for ICB), but **no record in the staged batches states a
  cadence for any of the three**, and none was independently checked live
  this session. `no-document` would be too strong — the cadence may simply
  not have been searched for yet. Filed as `no-node-yet`.
- **MIP scoreboard / Alert Mechanism Report statistical annex** (idx 61
  record 8) — a news item states "Eurostat published today the statistical
  annex to the alert mechanism report," which is evidence of a recurring
  product but not itself a cadence statement, and the AMR's own governing
  instrument (part of the European Semester regulations) was not opened this
  session. `no-node-yet`.
- **Euro area monetary aggregates (M1/M2/M3)** (idx 51, 56, 62) — well
  documented as `calculated_from` the consolidated MFI balance sheet
  (`data.ecb.europa.eu/methodology/monetary-aggregates`: "These are derived
  from the consolidated balance sheet of monetary financial institutions"),
  but no record names a specific titled, cadenced publication distinct from
  the BSI dataset itself (e.g. a monthly press release with its own title).
  Treated as a derived series inside `ecb-mfi-balance-sheet-items` rather
  than a second node, pending a document that names one.
- **Institutional cooperation material** (idx 55, all 8 records: IAG, SDMX,
  Eurostat-OECD Technical Arrangement, ESS-ESCB MoU, UK-Eurostat post-Brexit
  arrangement) — none of these are recurrently published, titled documents;
  they are standing cooperation agreements and coordinating bodies. Same
  category as the already-closed Priority A institutional material
  (`G.28.md`). No nodes.
- **Eurosystem collateral operational rules** (idx 69, 70, 71, 72: margin
  calls, valuation haircuts including the 2026 amendment, NCB implementation
  duty, fixed-term deposits) — correctly extracted, internally consistent,
  well-sourced (Guideline (EU) 2015/510 and its amendments), but this is
  **operational law governing how the Eurosystem manages collateral**, not a
  recurrently published titled report. Fails `Research.1.md` §4's node test
  on the same grounds `EBS Regulation 2019/2152` and the rest of the
  branch's "legal spine" fail it — instruments, not publications. No new
  document depends on these Guidelines as a *data input* in the way the
  corpus models edges; the closest candidate (Eurosystem accounting figures
  reflecting margin-adjusted collateral values) would be inference, not a
  documented statement, and is not asserted here. **Zero nodes, zero edges,
  from four fully-read batches** — a real result, not a gap in this pass.

## Not verified this session

- Every record in idx 47 (ESA 2010 transmission programme detail, 7
  records) and the remainder of idx 51/56/61/62 beyond the six items
  checked live above — these were read and cross-read for consistency
  against each other and against the already-imported `esa-2010.json`, but
  not independently re-fetched.
- The Guideline ECB/2021/14 frequency article (blocked by the file-download
  issue, above) — the one document that could resolve the CBD cadence
  conflict.
- idx 69–72's underlying Guidelines were read as staged, not re-fetched
  live — moot for this pass since they yielded no nodes, but worth noting
  for anyone revisiting this material later.

## Corpus impact

**150 → 154 reports** (four new nodes), **220 → 222 dependencies** (two new
edges: `eurostat-edp-notification-tables -> esa-2010`,
`eurostat-edp-gfs-quality-report -> eurostat-edp-notification-tables`).
`esa-2010` now has **three** incoming edges instead of two, and — worth
flagging on its own — **this is the first edge into `esa-2010` from another
EU-level document rather than a member-state one**. The branch's own
asymmetry finding (`EU/slices/README.md`, `esa-2010.json`'s own headline) is
about *national* documents naming the EU instrument while the EU instrument
names nothing back. This new edge doesn't touch that asymmetry — it's a
same-level EU-to-EU citation (the EDP Regulation naming ESA 2010's
definitions and transmission programme) — but it is a structurally different
kind of edge than anything currently in `esa-2010.json`, worth someone
checking whether it changes how the asymmetry finding should be worded.
