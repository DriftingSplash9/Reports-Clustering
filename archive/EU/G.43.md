# G.43.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: `Research.1.md` v3.0 — **amended by this session** (§9
only, four new EU ids appended; see Findings). Read in full for §§2, 4, 6
before extracting; not re-read cover to cover otherwise.
Predecessor: G.42.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — v3.0. §9 now lists 21 EU-branch ids
   (17 from `G.41.md`/`G.42.md`, 4 new this session).
2. **This file**, in full.
3. **`EU/ECB-Staging-Batches_PartA_2026-08-05.md`** — this session's
   extraction record: what was read, what was live-verified, what was minted,
   and — just as importantly — what was read in full and correctly yielded
   zero nodes.
4. **`src/data/research/eurostat-edp-gfs-ecb-statistics.json`** — the new
   slice: 4 reports, 2 dependencies, 9 `_dropped` leads.
5. **Everything else unchanged from `G.42.md`'s list.**

**Where things are, as of 2026-08-05 (end of day, twenty-seventh working
session in this file's numbering, ninth in today's continuation):**

- **The corpus grew for the first time since `G.39.md`.** 150 → **154
  reports**, 220 → **222 dependencies**. `npm run validate` and `npm run
  check` both exit 0.
- **Priority C (ECB/Eurosystem staging batches) is meaningfully advanced,
  not closed.** 12 of the flagged batches (47, 51–56 counting the 53/54
  duplicate as one, 61, 62) were read and partially verified; four more (69–72,
  the collateral/margin material) were read in full and correctly yielded no
  new nodes — a real result, not unfinished work.
- **A genuine live contradiction was found and left unresolved, as the house
  rule requires**: the ECB's own Consolidated Banking Data methodology page
  states its own publication frequency two different ways in the same
  document. See Findings 2.
- **A prior session's `_dropped` "no-node-yet" entry is half-resolved**: the
  target node it was waiting for (`ecb-mfi-balance-sheet-items`) now exists.
  The edge itself is deliberately still not wired — see Findings 3.

## Session conditions — read this first

**Ninth part of today's continuation**, on Thomas's direct instruction to
pick up priority C, specifically the ECB staging batches flagged since
`G.39.md`/`G.41.md` (indices 47, 51–56, 61–62, 69–72 of
`EU/slices/_staging/10-batch-with-records.ndjson`). Read all 13 flagged
indices in full (98 `part_a_records` before the duplicate is accounted for).
Live-verified six of the strongest claims against primary sources — the
Regulation text on EUR-Lex, three Eurostat pages, two ECB methodology pages —
rather than promoting all 98 records on staging's word alone; the rest were
read and cross-checked for internal consistency but not independently
re-fetched. One EUR-Lex PDF fetch (the current Consolidated Banking Data
Guideline, needed to resolve the frequency contradiction) triggered the
same file-download failure mode logged since `G.31.md`/`G.38.md` for other
EU-agency hosts, and was not chased further via `WebFetch`+`pypdf` this
session.

## Headline result

**Four new nodes minted from material that had been sitting staged and
unverified since 2026-08-03, following the same pattern `G.39.md` used for
index 68: verify a representative sample live, promote what holds, flag what
doesn't.** The more consequential finding is methodological rather than a
node count: a live re-fetch of the ECB's own Consolidated Banking Data page
turned up a real, current, self-contradictory cadence statement — not a
staging transcription error, not a stale-vs-current split, but the ECB's own
document disagreeing with itself today. Recorded as found, not adjudicated,
per `Research.1.md` §3. Separately, four batches on Eurosystem collateral
operational rules (margin calls, haircuts, fixed-term deposits) were read in
full and correctly produced zero nodes — legal/operational detail, not
recurrently published reports, the same category the branch's own "legal
spine" material already falls into.

## Findings

### 1. Two new nodes chain cleanly off Regulation (EC) 479/2009, including the first EU-to-EU edge into `esa-2010`

`eurostat-edp-notification-tables` (biannual) and `eurostat-edp-gfs-quality-report`
(annual) — full detail in `EU/ECB-Staging-Batches_PartA_2026-08-05.md`.
**What this rests on**: Articles 3(1) and 8(2)-(3) of Council Regulation (EC)
No 479/2009, live-fetched from EUR-Lex, plus two Eurostat webpages, also
live-fetched, both matching the staged quotes verbatim. The
`eurostat-edp-notification-tables -> esa-2010` edge is worth flagging on its
own: `esa-2010.json`'s own headline finding is that disclosure in this branch
runs upward (national documents name the EU instrument, not the reverse) —
this new edge is EU-level naming EU-level, a structurally different kind of
edge than either of `esa-2010`'s two existing incoming edges (both from
national statistical offices). Not a refutation of the asymmetry finding,
but a new data point someone revisiting `esa-2010.json`'s wording should
account for.

### 2. The ECB's own Consolidated Banking Data page contradicts itself on live re-fetch

**What this rests on**: `data.ecb.europa.eu/methodology/consolidated-banking-data`,
fetched in full this session. Near the top: "Data are published four times a
year." Further down the same page: "The data are semi-annual, except for
certain detailed breakdowns which are collected only annually." Both
sentences are present today, not a staging artifact. `ecb-consolidated-banking-data`
is minted with `releases_per_year: 4` (the figure stated first) and a
`cadence_note` that states the conflict explicitly rather than picking a
winner, per `Research.1.md` §3's instruction not to adjudicate. The one
document that would likely resolve this — Guideline ECB/2021/14's own
frequency article — could not be fetched this session (file-download
failure); flagged as a cheap check below.

### 3. `ecb-mfi-balance-sheet-items` resolves half of a standing `_dropped` entry from `G.39.md`, deliberately not the other half

**What this rests on**: `eurosystem-ecb.json`'s existing `_dropped` array
already contained a "no-node-yet" entry (ECB-04) quoting Guideline (EU)
2024/2941: "The monthly data feed into the published aggregated statistical
data required from monetary financial institutions (MFIs) in the Union...
no MFI statistics node exists yet in this corpus." That target node now
exists, minted this session from independent evidence (the ECB's own BSI
methodology page, live-verified, monthly cadence). **The edge itself is
deliberately not added** — `eurosystem-ecb.json`'s own note flags that the
specific Annex citation for that quote was never independently re-verified,
and this session did not re-verify it either. Wiring the edge on an
unverified citation would just relocate the same hedge. Recorded as the
single cheapest, highest-value follow-up (cheap check 1, below).

### 4. Four fully-read batches on Eurosystem collateral operations correctly yield zero nodes

Indices 69–72 (margin calls, the 2026 haircut amendment, NCB implementation
duty, fixed-term deposits) — all well-sourced to Guideline (EU) 2015/510 and
its amendments, internally consistent, correctly extracted. **What this
rests on**: a full read of all four batches, cross-checked against each
other (the cross-references between them — e.g. Article 136's citation of
Article 11 of Guideline (EU) 2024/3129 — are internally consistent). None of
the four describes a recurrently published, titled report; they describe
operational law governing how the Eurosystem manages collateral day to day.
Fails `Research.1.md` §4's node test on the same grounds the rest of the
branch's "legal spine" material (EBS Regulation 2019/2152, Regulation
223/2009) already fails it. **Zero nodes from four fully-read batches is the
result, not a shortfall** — `G.41.md`'s own suspicion about this material
("collateral/valuation/margin operational rules... no meta provenance") is
now settled rather than merely surveyed.

## Secondary observations (logged, low priority)

- **Staging indices 53 and 54 are byte-for-byte identical** (`python3`
  comparison, `lines[53] == lines[54]` returns `True`) — the same
  `NONBANK-EBA-SUP-2026-08-03-A1` batch duplicated in the staging file, not
  two distinct batches. Treated as one for this pass. The staging file
  itself was left as found; this is a data-quality note about the pipeline
  that produced it, not something corrected in place.
- **Three real, named ECB datasets were found and not minted for want of a
  cadence statement**, not for want of evidence otherwise: Supervisory
  Banking Statistics (SUP), Investment Funds statistics (IVF), Insurance
  Corporations statistics (ICB/ICO). Each has a stated legal basis
  (respectively: EBA FINREP/COREP; Regulation ECB/2013/38 + Guideline
  ECB/2021/12; Regulation ECB/2014/50) but no record in hand states how
  often any of the three is published. Filed as `_dropped` leads in the new
  slice, not chased further.
- **The MIP scoreboard / Alert Mechanism Report thread reappears** (first
  seen `G.39.md`, findings on the MIP quality report) — a news item confirms
  the statistical annex is a recurring product but doesn't itself state a
  cadence, and the AMR's own governing instrument (part of the European
  Semester framework) was not opened this session.

## Corrections to prior sessions

**None new this session.** `G.42.md`'s correction (the "30+" EU-id estimate)
stands as recorded there; nothing this session's extraction touched
contradicts anything in `G.39.md` through `G.42.md`.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`. This session's idx
55 survey (IAG, SDMX, Eurostat-OECD Technical Arrangement, ESS-ESCB MoU)
confirms nothing there reopens it — same category, correctly excluded.

**B — SEC03 meta backlog.** Unchanged from `G.42.md`.

**C — Independent ECB/Eurosystem threads. Advanced, not closed.** 12 of the
flagged staging batches processed this session (4 minted, 4 correctly
yielded nothing, the rest deferred as `no-node-yet` leads). Remaining
staging batches not in this session's flagged list may still exist — this
session covered exactly 47, 51–56, 61–62, 69–72, not a full sweep of
`_staging/`. Also open: the `ecb-mfi-balance-sheet-items` edge (Findings 3),
the CBD cadence resolution (Findings 2), and the three `no-document` ECB
dataset leads (Secondary observations).

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`. Closed**,
per `G.41.md`.

**E — Everything the blob split created.** §9 backfill closed per `G.42.md`.
This session's own `no-node-yet`/`no-document` leads (9 of them, in
`eurostat-edp-gfs-ecb-statistics.json`'s `_dropped`) join this letter's
backlog.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since `G.42.md`: 12 of the flagged ECB/Eurosystem staging batches**
(Findings 1–4). New items from this session, ranked first:

1. **Re-verify the Annex citation in `eurosystem-ecb.json`'s ECB-04
   `_dropped` entry, then wire `ecb-mfi-balance-sheet-items -> [Eurosystem
   weekly/annual statement]`.** The cheapest possible edge in the branch
   right now — the node exists, the quote exists, only the specific Annex
   number needs confirming. See Findings 3.
2. **Fetch Guideline ECB/2021/14's own frequency article** to resolve the
   Consolidated Banking Data cadence conflict (Findings 2). The direct
   EUR-Lex PDF URL triggers a file-download response; try `WebFetch` +
   `pypdf` per the pattern already established for `ecb.europa.eu` PDF hosts
   (`G.38.md` onward).
3. **Check cadence for Supervisory Banking Statistics, Investment Funds
   statistics, and Insurance Corporations statistics** — all three have a
   stated legal basis and no stated publication frequency in hand. Three
   quick lookups, each a likely new node.
4. **Open the Alert Mechanism Report's own governing instrument** to confirm
   the MIP scoreboard's annual cadence from the primary source rather than a
   news item.
5. Verify and mint Eurobarometer (S03-23, `SEC03_Title06-07_PartA_2026-08-05.md`).
6. The second joint ECB-Eurostat report (ECB-07, "BOP-NA ROW consistency
   report").
7. Read EBS Regulation 2019/2152.
8. Regulation (EU) 2021/1058 / 2021/1060 — Title 05's GDP/GNI
   classification lead.
9. Regulation (EC) No 1217/2009 / (EU) 2023/2674 / (EU) 2018/1091 — the
   Farm Sustainability Data Network's founding instruments (S03-12).
10. Any staging batches not among 47, 51–56, 61–62, 69–72 — this session did
    not sweep the full `_staging/` directory, only the flagged indices.
11. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies.
12. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
    metadata.
13. Split `list-main-stats-2025-na` into nine records.
14. Re-measure E4 keying on quote, not id, and reconcile.
15. Delete `scripts/eu-schema-smoke.ts`.
16. Pull the `[NA-Pen] / Table 29` thread.
17. Check whether SEC09's total-level sign flip has a stated explanation
    elsewhere (`G.28.md` finding 1).
18. Search for a titled GNI deflator publication, following SEC01's S01-02
    lead.
19. Reconcile `EU Meta jsons.docx`'s SEC09/SEC10 batches.
20. Read Art. 11 of the loi modifiée du 22 juin 1963.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.43.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — v3.0, §9 now 21 EU-branch ids.
3. **`EU/ECB-Staging-Batches_PartA_2026-08-05.md`** — this session's full
   extraction record.
4. **`src/data/research/eurostat-edp-gfs-ecb-statistics.json`** — the new
   slice.
5. **A browser** (the `Claude_Browser` tool) — for cheap checks 1–4
   especially, all direct continuations of this session's own leads.
6. **The next target**: cheap check 1 (wire the `ecb-mfi-balance-sheet-items`
   edge) is a five-minute job with the highest value-per-effort in the
   branch right now. After that, checks 2–4 continue priority C directly, or
   resume Eurobarometer (check 5) as a separate thread.

---

# How to write the next hand-off

**Added 2026-08-04. Copy this whole section verbatim into every successor**, so
the chain never depends on one file surviving. It is the spec, not an example —
the file you are reading is the worked example.

When Thomas says *"write the next handoff"*, *"write the next G file"*, *"wrap
this thread up"* or anything close, this is what he is asking for. Do not ask
which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the highest-numbered
  `G.*` file in `EU/`. Check the folder — the sequence has gaps (there is no
  G.01, G.06, G.10, G.12, G.14, G.16, G.17 as `.md`) and some predecessors are
  `.docx`. **Take the highest number, not the count.**
- **Write it as `.md`**, plain text, in `EU/`. Earlier files are `.docx`; that
  was the chat workflow's doing, not a preference.
- **Then write the JSON sidecar.** Every hand-off has a machine-readable twin at
  `EU/G.<n>.json`. Do not hand-write it — run:

  ```
  python3 scripts/handoff-to-json.py EU/G.<n>.md
  ```

  The Markdown stays the document of record; the JSON is a structured index of
  it (date, predecessor, findings, corrections, priorities, cheap checks, and
  which required sections are missing). It exists so branch state can be read
  without parsing prose, and so a future session can diff two hand-offs.
  `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar;
  `--check` reports which are stale without writing. **If you are ever unsure
  whether the sidecar is current, just re-run it — it is idempotent.**
- **Never edit a predecessor.** Corrections to earlier sessions go in this
  file's *Corrections* section, where they are dated and attributable. The one
  exception is this spec block, which is copied forward unchanged.

## Required structure, in this order

```
# G.<n>.md — EU galaxy hand-off

Date: YYYY-MM-DD
Governing briefs: <which, and whether you actually saw them>
Predecessor: G.<n-1>.md (date)

## Orientation — if you are a new agent, start here
## Session conditions — read this first
## Headline result
## Findings
## Secondary observations (logged, low priority)
## Corrections to prior sessions
## Thomas's stated priority for the remaining work
## Cheap checks still outstanding
## What to pass at the start of next thread

# How to write the next hand-off        ← this spec, copied verbatim
```

Drop a section only if it would be empty, and say so in one line rather than
leaving a heading with nothing under it. *Corrections* and *Thomas's stated
priority* are **never** dropped: an empty Corrections section is itself a claim
(nothing earlier was found wrong) and should say that explicitly.

## What each section is for

**Orientation** — carried forward and updated, not rewritten each time. A new
agent must be able to read this section alone and know what to read next. If
the folder layout or the tooling changed, that goes here.

**Session conditions** — what constrained the work. Session type (extraction vs
verification vs planning), what tooling was available, what did not arrive, what
was left untouched by instruction. This is where "the sandbox failed" and "the
governing briefs still did not arrive" belong. **State plainly which sources you
read in full**, because everything downstream inherits that limit.

**Headline result** — the single most important thing established, and how
strongly. If the session established nothing, say that; a session that only
refutes is still a result.

**Findings** — numbered `###` subsections, one per finding. Each states what was
checked, what was found, and **what it rests on**. Mark any claim that depends on
a predecessor's reading rather than your own — the house convention is
*(SEC04 per G.17)*. Quote verbatim; `Research.1.md` §2 applies here exactly as
it does to research output.

**Secondary observations** — real but low-priority. Section fingerprints, oddities
worth not rediscovering. Keep them short.

**Corrections to prior sessions** — numbered, each naming the file and the claim
being corrected, and whether it is *confirmed*, *refuted*, *overstated* or
*resolved*. This section is the reason the chain is trustworthy. A session that
finds a predecessor wrong and does not record it here has actively damaged the
corpus.

**Thomas's stated priority for the remaining work** — lettered blocks (A, B, C,
D) carried forward from the predecessor, edited to reflect what moved. Mark items
**no longer needed** explicitly and say why, rather than deleting them silently.
This section is what a new agent reads to answer "what is next".

**Cheap checks still outstanding** — ordered by value per unit effort, each one a
single lookup. This is the list that gets raided when a session has capacity left.

**What to pass at the start of next thread** — the packing list, for the case
where the next agent has no filesystem access. If it does have access, say so and
keep the list anyway; it doubles as an index of what matters.

## Conventions that make these files worth reading

- **Say what you did not do.** Every one of these files carries an explicit
  not-read / not-verified statement. That is what makes the positive claims
  usable.
- **Predictions are logged and then scored.** G.17 predicted a code pattern;
  G.18 recorded that it "landed". Make falsifiable calls and settle them.
- **Distinguish inference from documented fact,** and say which narrow respect is
  still inference. G.18's headline rule is very well evidenced and still not
  printed in any document — it says so.
- **A refuted hypothesis is a good outcome.** Report both sides of a conflict and
  pick neither; `Research.1.md` §3 is explicit that adjudication is not the
  research role.
- **Do not pad.** These files are dense because every line earns its place.
