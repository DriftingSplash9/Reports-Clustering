# G.46.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: `Research.1.md` v3.0 — amended by this session (§9 only,
new DE ids). Not reopened cover to cover otherwise.
Predecessor: G.45.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — v3.0. §9 now lists 33 EU/DE/INT ids.
2. **This file**, in full.
3. **`EU/Destatis-Source-Surveys_PartA_2026-08-05.md`** — this session's
   work: the first cut at sc-75, the German EVAS source-survey sub-graph.
4. **`src/data/research/de-destatis-source-surveys.json`** — the new slice.
   **Its own `_dropped` array carries the complete, verbatim Chapter 10
   table** (46 Destatis surveys + 16 other official sources + 7
   non-government sources, all by EVAS register number) from the German GNI
   inventory PDF — a future session can continue this thread directly from
   that array without re-downloading or re-parsing the 4.4MB source PDF.
5. **Everything else unchanged from `G.45.md`'s list.**

**Where things are, as of 2026-08-05 (end of day, thirtieth working session
in this file's numbering, twelfth and last in today's continuation):**

- **The corpus grew again**: 162 → **165 reports** (three new), 228 →
  **231 dependencies** (three new). `npm run validate` and `npm run check`
  both exit 0.
- **sc-75 (the German EVAS sub-graph) is opened, not closed** — three of
  46+16+7 candidate rows minted, the rest transcribed and staged for a
  future session. This was the single largest well-evidenced piece of
  unstarted work flagged at the end of `G.45.md`, and it is now started on
  a solid, structured footing rather than left as a vague "whole
  sub-graph" note.
- **German CPI is now a node.** Worth flagging on its own: one of the
  world's most-referenced consumer price indices was absent from this
  corpus until today, despite `statcan-cpi`, `bls-cpi`, `lu-statec-ipch`
  and `eurostat-hicp` all already being present.

## Session conditions — read this first

**Twelfth and final part of today's continuation**, directly continuing
`G.45.md`'s own top recommendation on Thomas's "keep going then." Single
focus: sc-75. Downloaded the German GNI inventory PDF directly (`curl`,
4.4MB, 372 pages) rather than using `WebFetch`'s summariser, because the
target material — Chapter 10's structured data-sources table — needed exact
transcription, not summarization. Read the full extracted text via `pypdf`
to locate and transcribe Chapter 10 in full, then live-verified the
strongest cadence candidate (German CPI) on `destatis.de` directly.

## Headline result

**A twenty-session-old vague lead ("a whole sub-graph, not one edge") is now
a precise, structured, 69-row inventory, three rows of it minted and the
rest staged for direct continuation.** The German GNI inventory's own
Chapter 10 turned out to be exactly the kind of table `Research.1.md` §7
calls the strongest evidence class — a document naming its own inputs, by
register number, organized by which part of the calculation each one feeds
— and nobody had opened the underlying PDF to find it, despite
`de-destatis-national-accounts.json`'s own `_dropped` array already quoting
from the same document twice without anyone downloading it directly.

## Findings

### 1. Chapter 10 of the German GNI inventory is a complete, three-tier, EVAS-numbered source table

**What this rests on**: `curl`-downloaded and `pypdf`-extracted the full 372
pages of "ESA 2010 methods and sources for the German GNI and its
components, Edition 2025" (destatis.de), located Chapter 10 ("Main data
sources used") at the document's own page 367, and transcribed all three
tiers in full. 65 distinct EVAS register numbers appear across the document
overall; the table itself lists 46 Destatis surveys, 16 other official
sources, and 7 non-government sources, each tagged against the
Production/Expenditure/Income approach(es) it feeds.

### 2. German CPI, the Labour Cost Survey, and the Quarterly Production Survey are minted with directly document-stated cadences

**What this rests on**: German CPI (`de-destatis-cpi`) live-verified on
`destatis.de`'s own consumer-price-index page — a monthly, two-stage
release (flash then confirmed), matching `eurostat-hicp`'s own pattern. The
Labour Cost Survey's quadrennial cadence ("takes place every 4 years (also
2020)") and the Quarterly Production Survey's cadence (stated in its own
title) both come directly from the GNI inventory's own text, not a separate
live check — the inventory is itself a Destatis publication and a valid
primary source for a fact about a sibling Destatis survey.

## Secondary observations (logged, low priority)

- **EVAS 73311 (VAT/turnover-tax advance returns) is the single most-cited
  source statistic in the entire GNI inventory** (35 mentions) — heavily
  used across almost every industry-output calculation in the document, but
  administrative rather than survey-based and not chased to a cadence this
  session. Likely the next candidate if someone continues this thread.
- **The Bundesbank's own Monthly Report and Annual Report** appear in
  Chapter 10.2 as named, titled sources distinct from
  `de-bundesbank-financial-accounts` (minted earlier this session) —
  plausible near-term candidates for a small follow-up.

## Corrections to prior sessions

**None new this session.**

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged from `G.45.md`.

**C — Independent ECB/Eurosystem threads.** Unchanged from `G.45.md`.

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`. Closed**,
per `G.41.md`.

**E — Everything the blob split created.** Unchanged from `G.45.md`.

**F — The German sub-graph. Opened, not closed.** `de-bundesbank-financial-accounts`
(`G.45.md`) plus three EVAS-numbered surveys (this session) are minted.
**43 of the remaining 46 Destatis-survey rows, all 16 other-official-source
rows, and all 7 non-government rows are staged, not chased** — see
`de-destatis-source-surveys.json`'s `_dropped` array for the complete
verbatim list. This is now a *tractable* backlog item (the research is
already done; what remains is verification and minting) rather than a vague
one.

## Cheap checks still outstanding

**Done since `G.45.md`: sc-75 opened, three EVAS surveys minted.** Ranked
first, the direct continuations of this session's own work:

1. **Continue sc-75** from `de-destatis-source-surveys.json`'s `_dropped`
   array — no PDF re-download needed. Suggested next: EVAS 73311/73321
   (VAT statistics, most-cited in the source document), EVAS 47410
   (current structural trade/services survey), the Bundesbank Monthly
   Report and Annual Report (Chapter 10.2).
2. **Resolve `oecd-icio`'s cadence** (`G.45.md`).
3. **Check cadence for WIOD, EXIOBASE, EORA, GTAP-MRIO, OECD TiVA**
   (`G.45.md`).
4. **Investigate Annex I row 4** of Guideline (EU) 2024/2941 (`G.44.md`).
5. Fetch Guideline ECB/2021/14's own frequency article (`G.43.md`).
6. Check cadence for Supervisory Banking Statistics, Investment Funds
   statistics, Insurance Corporations statistics (`G.43.md`).
7. Open the Alert Mechanism Report's own governing instrument.
8. Verify and mint Eurobarometer (S03-23).
9. The second joint ECB-Eurostat report (ECB-07).
10. Read EBS Regulation 2019/2152.
11. Regulation (EU) 2021/1058 / 2021/1060 (Title 05 GDP/GNI lead).
12. FSDN founding instruments (S03-12).
13. Sweep the full `_staging/` directory beyond indices already processed.
14. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies.
15. Split `list-main-stats-2025-na` into nine records (sc-71, since G.24).
16. Pull the `[NA-Pen] / Table 29` thread (sc-73, since G.24).
17. Check ISSAI 300/400 cadence from INTOSAI (sc-53, since G.21).
18. Read Art. 11 of the loi modifiée du 22 juin 1963.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.46.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — v3.0, §9 now 33 EU/DE/INT ids.
3. **`src/data/research/de-destatis-source-surveys.json`** — its
   `_dropped` array is the direct continuation point for sc-75.
4. **A browser**, for cheap checks 2–12.
5. **`destatis.de`**, fully reachable — for continuing sc-75.
6. **The next target**: continuing sc-75 (cheap check 1) is the highest
   value-per-effort item — the research is done, only verification and
   minting remain for ~66 more candidate rows. Otherwise the smaller
   cadence-check items are quick, independent continuations.

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
