# G.45.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: `Research.1.md` v3.0 — amended by this session (§9 only,
new EU/DE ids). Not reopened cover to cover otherwise.
Predecessor: G.44.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — v3.0. §9 now lists 29 EU/DE/INT ids
   backfilled from the EU branch (up from 21 at `G.44.md`).
2. **This file**, in full.
3. **`EU/EU-Meta-Docx-Batches_PartA_2026-08-05.md`** — this session's
   largest single piece of work: seven previously-unread staged batches from
   `EU/EU Meta jsons.docx`.
4. **`EU/SEC09-SEC10-Reconciliation_PartA_2026-08-05.md`** — closes the
   branch's oldest backlog item (16 sessions, since `G.29.md`).
5. **`src/data/research/eu-meta-docx-batches.json`** and
   **`de-bundesbank-financial-accounts.json`** — the two new slices.
6. **Everything else unchanged from `G.44.md`'s list.**

**Where things are, as of 2026-08-05 (end of day, twenty-ninth working
session in this file's numbering, eleventh in today's continuation):**

- **The corpus grew substantially**: 154 → **162 reports** (8 new), 222 →
  **228 dependencies** (6 new). `npm run validate` and `npm run check` both
  exit 0.
- **This session started from a direct question**: Thomas asked whether
  everything useful in `EU Meta jsons.docx` and `Soft Connections.docx` had
  actually been added, suspecting it had not. It had not — see Headline
  result.
- **Two multi-session-old backlog items are closed**: the SEC09/SEC10
  reconciliation (16 sessions old, since `G.29.md`) and sc-74, the Bundesbank
  node (flagged since `G.26.md`).
- **One large backlog item remains, explicitly not started**: sc-75, the
  German EVAS-numbered source-statistics sub-graph. Flagged since `G.26.md`
  as "a whole sub-graph, not one edge" — correctly not attempted in the same
  pass as everything else this session; see Cheap checks below.

## Session conditions — read this first

**Eleventh part of today's continuation**, opened by Thomas's own audit
question rather than a specific instruction, then continued on his "start
work on this" once the audit's findings were reported back. Four
sub-phases: (1) diagnostic read of both docx files against the `G.*` chain
to confirm what had and had not been processed; (2) extraction and live
verification of `EU/EU Meta jsons.docx`'s seven never-touched batches; (3)
reconciliation of the docx's SEC09/SEC10 material against the corpus's own
SEC09/SEC10 Part A record; (4) the Bundesbank node from
`PartB_soft_connections_2026-08-04.md`'s sc-74. Read `EU Meta jsons.docx` in
full via `python-docx` (1.25M characters, 12,447 paragraphs) to map every
staged batch inside it against the staging ndjson pipeline used by prior
sessions.

## Headline result

**Both documents had real, identified, multi-session-old backlog, and the
branch's own hand-off chain had been carrying the debt forward without
anyone opening either file to check what it actually contained.** `EU Meta
jsons.docx` held seven complete staged batches that were never copied into
the ndjson pipeline prior sessions worked from and so were never read by any
`G.*` session — one of them, ESGAB's annual report, is now the cleanest
cadence evidence any EU-branch node has (a live, unbroken, dated 17-year
release list). The docx's SEC09/SEC10 material, flagged unreconciled since
`G.29.md`, turned out to be roughly 15× richer than the corpus's own
independent re-extraction of the same two sections, and one of its more
striking claims (a translation-agreement citation tension in SEC09)
independently verified against the live PDF. `Soft Connections.docx`'s
own catalogue (`PartB_soft_connections_2026-08-04.md`) similarly held a
well-evidenced lead — the Bundesbank as Germany's second node — sitting
unminted for roughly twenty sessions despite already being called "the
obvious second German node" the first time anyone wrote it down.

## Findings

### 1. Seven staged batches inside `EU Meta jsons.docx` were never read by any prior session

**What this rests on**: parsing the docx's 16 `batch_id` markers and diffing
them against `EU/slices/_staging/10-batch-with-records.ndjson`'s own
markers. Nine overlap (already processed in `G.43.md`/`G.44.md`); seven do
not: `SUT-IOT`, `FIGARO`, `GLOBAL-IO`, `PEER-REVIEWS-3RD-ROUND`,
`REC-2023-397`, `ESGAB-ANNUAL-REPORTS`, `WP-SMP-ESAC`. All seven read in
full this session; six live-verified. Seven nodes minted (`eurostat-suiot`,
`eurostat-figaro`, `oecd-icio`, `eurostat-annual-work-programme`,
`esac-opinion-work-programme`, `ess-peer-review-final-report`,
`esgab-annual-report`), four edges added, one batch correctly yielded no
node. Full detail in `EU/EU-Meta-Docx-Batches_PartA_2026-08-05.md`.

### 2. `esa-2010` gains its first same-level EU-to-EU dependency chain of more than one edge

**What this rests on**: `eurostat-suiot -> esa-2010` and
`eurostat-figaro -> esa-2010` (both `methodology_depends_on`, both
live-verified against Eurostat's own metadata pages), plus
`eurostat-figaro -> eurostat-suiot`. Combined with `G.43.md`'s
`eurostat-edp-notification-tables -> esa-2010` edge, `esa-2010` now has four
incoming edges: two from national statistical offices (the original
asymmetry-finding pattern) and two from EU-level statistical products naming
it as their own methodology. Worth someone revisiting whether
`esa-2010.json`'s own asymmetry-finding language should be updated to note
this second pattern, not just the first.

### 3. The docx's SEC09/SEC10 material is roughly 15× richer than the corpus's own extraction, and does not contradict it

**What this rests on**: full read of both docx batches' close-summary
sections (SEC09: 13 findings + 7 structural observations; SEC10: 35 entries
covering the whole section) against `SEC08-SEC09-SEC10_PartA_2026-08-05.md`'s
5 total entries across both sections. One claim (the EDPB translation-SLA
citation tension, `S09-004`/`S09-060`) independently re-verified this
session by fetching `EU/SEC09.pdf` directly via `pypdf` — held up exactly as
described. No factual contradiction found between the two records; the
docx's material is additive, not corrective. Full detail and the complete
list of not-yet-incorporated findings in
`EU/SEC09-SEC10-Reconciliation_PartA_2026-08-05.md`.

### 4. Germany's second node closes a backlog item open since `G.26.md`

**What this rests on**: `bundesbank.de`'s own Financial Accounts page,
live-fetched — *"The Bundesbank compiles the financial accounts on a
quarterly basis... Their methodological basis is the latest version of the
European System of Accounts (ESA 2010)."* Minted as
`de-bundesbank-financial-accounts`, with a direct edge to `esa-2010` and an
edge from `de-destatis-national-accounts` (direction inferred from the
original "bridge to" quote, flagged as such rather than asserted with false
confidence).

## Secondary observations (logged, low priority)

- **`esac-opinion-work-programme -> eurostat-annual-work-programme` is
  recorded with `relationship_type: cites`, an imperfect fit** — ESAC's
  language is advisory commentary, not citation. The same gap already
  logged for `ess-escb-mip-quality-report` in `eurosystem-ecb.json`; now two
  instances of the same open modelling question.
- **`oecd-icio`'s cadence is not cleanly annual** — the only two data points
  in hand (a "2023 edition" and a "2025 edition") are two years apart.
  Minted with `releases_per_year: 0.5` and the uncertainty stated plainly in
  `_open_questions`, not silently resolved to "annual" by analogy with
  `eurostat-figaro`.
- **WIOD, EXIOBASE, EORA, GTAP-MRIO and OECD TiVA** were named as parallel
  global input-output databases in the same batch that yielded `oecd-icio`,
  none independently verified. WIOD's own cited update ("recently updated to
  2014", from a document written around 2019) reads as possibly
  discontinued. Filed as leads, not chased.

## Corrections to prior sessions

**None new this session.** The SEC09/SEC10 reconciliation (Findings 3)
found the docx additive, not contradictory, to `SEC08-SEC09-SEC10_PartA_2026-08-05.md`
— no correction needed there, and none of this session's other work touched
a prior finding.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged from `G.44.md`.

**C — Independent ECB/Eurosystem threads.** Unchanged from `G.44.md`.

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`. Closed**,
per `G.41.md`.

**E — Everything the blob split created.** **The `EU Meta jsons.docx`
never-read-batches item and the SEC09/SEC10 reconciliation are both closed
this session.** Remaining in this letter: sc-75 (below), and the smaller
leads logged in `eu-meta-docx-batches.json`'s `_dropped` array (WIOD family,
Supervisory Banking/Investment Funds/Insurance Corporations cadence checks
carried from `G.43.md`).

**F — The German sub-graph. Half-open, one node closed.** `de-bundesbank-financial-accounts`
is minted (Findings 4). **sc-75 — the EVAS-numbered German source-statistics
sub-graph — is not started**, and is explicitly a bigger unit of work than
anything else in this session: Destatis's own GNI and QNA inventories name
their inputs by title *and* German statistical register number (Microcensus,
Structural statistics in trade and services (EVAS 47410), Building and
housing census (EVAS 31211), Employment statistics (EVAS 13111), monthly
retail trade (EVAS 45212), ITGS, and administrative sources including VAT
statistics) — `Research.1.md` §7's strongest evidence class, applied to
perhaps a dozen candidate nodes at once. `destatis.de` is fully reachable.
This is now the single largest well-evidenced piece of unstarted work in the
branch.

## Cheap checks still outstanding

**Done since `G.44.md`: the seven `EU Meta jsons.docx` batches, the
SEC09/SEC10 reconciliation, sc-74 (Bundesbank).** New/promoted items:

1. **sc-75 — the German EVAS sub-graph** (priority F above). Not cheap in
   the usual sense — flagged as its own session's worth of work rather than
   squeezed in here.
2. **Resolve `oecd-icio`'s cadence** from a clearer OECD statement of its
   own release schedule.
3. **Check cadence for WIOD, EXIOBASE, EORA, GTAP-MRIO, OECD TiVA** —
   named, not verified.
4. **Investigate Annex I row 4** of Guideline (EU) 2024/2941, "Disaggregated
   monthly financial statement of the Eurosystem" — carried from `G.44.md`,
   unchanged.
5. Fetch Guideline ECB/2021/14's own frequency article to resolve the
   Consolidated Banking Data cadence conflict (`G.43.md`).
6. Check cadence for Supervisory Banking Statistics, Investment Funds
   statistics, and Insurance Corporations statistics (`G.43.md`).
7. Open the Alert Mechanism Report's own governing instrument.
8. Verify and mint Eurobarometer (S03-23).
9. The second joint ECB-Eurostat report (ECB-07, "BOP-NA ROW consistency
   report").
10. Read EBS Regulation 2019/2152.
11. Regulation (EU) 2021/1058 / 2021/1060 — Title 05's GDP/GNI
    classification lead.
12. Regulation (EC) No 1217/2009 / (EU) 2023/2674 / (EU) 2018/1091 — FSDN
    (S03-12).
13. Any staging batches not among 47, 51–56, 61–62, 69–72 (`G.43.md` did not
    sweep the full `_staging/` directory).
14. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies.
15. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN.
16. Split `list-main-stats-2025-na` into nine records — still open (sc-71,
    since `G.24.md`, 21 sessions).
17. Re-measure E4 keying on quote, not id.
18. Delete `scripts/eu-schema-smoke.ts`.
19. Pull the `[NA-Pen] / Table 29` thread (sc-73, since `G.24.md`).
20. Check SEC09's total-level sign flip (`G.28.md` finding 1).
21. Search for a titled GNI deflator publication (SEC01's S01-02 lead).
22. Read Art. 11 of the loi modifiée du 22 juin 1963.
23. Check ISSAI 300/400 cadence from INTOSAI (sc-53, since `G.21.md`).

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.45.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — v3.0, §9 now 29 EU/DE/INT ids.
3. **`EU/EU-Meta-Docx-Batches_PartA_2026-08-05.md`** and
   **`EU/SEC09-SEC10-Reconciliation_PartA_2026-08-05.md`** — this session's
   two extraction records.
4. **`src/data/research/eu-meta-docx-batches.json`** and
   **`de-bundesbank-financial-accounts.json`** — the two new slices.
5. **A browser**, for cheap checks 2–13.
6. **`destatis.de`**, fully reachable, for sc-75 — the next target, and the
   largest single piece of well-evidenced unstarted work in the branch.
7. **The next target**: **sc-75, the German EVAS sub-graph** (priority F),
   is the highest-value item — a whole cluster of nodes with register-number
   evidence, `Research.1.md` §7's strongest class. Otherwise the smaller
   cadence-check items (2–7) are quick continuations of this session's own
   leads.

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
