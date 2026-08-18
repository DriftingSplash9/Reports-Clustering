# G.27.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — read first-hand this session (re-read in
full before extraction, per G.20 finding 1's standing correction). Research.2.md
and Research.EU.md were **not** re-opened this session; their last first-hand
read was G.24 (finding 3), now four sessions back. Flagging per G.23 correction
5's own warning rather than repeating the silent-reliance failure.
Predecessor: G.26.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — the standing brief. Evidence standard,
   Part A record format, slice schema, the two traps, and **the only copy of the
   §9 node-id list**.
2. **This file**, in full.
3. **The four imported EU slices**, in `src/data/research/` — these are no longer
   proposals, they are in the graph: `eu-draft-budget.json`, `esa-2010.json`,
   `de-destatis-national-accounts.json`. Read the last one first; it is the
   pattern that works. **Unchanged this session** — nothing new was imported.
4. **`EU/AnnexB_assessment_2026-08-05.md`** — the branch's central negative
   result, and half of finding 1.
5. **`EU/slices/README.md`** — folder layout, plus the route that got past the
   cadence blocker. **Unchanged this session.**
6. **This session's new Part A record**: `EU/SEC01-SEC02_PartA_2026-08-05.md`,
   8 records across both sections, plus a register of what was searched and
   not found. Read it before proposing anything about Parliament or Council.
7. The other Part A records in `EU/`: `SEC05_PartA_2026-08-04.md` (19, the
   format exemplar) · `SEC06-SEC07_PartA_2026-08-05.md` (9) ·
   `AnnexXI_PartA_2026-08-05.md` (12) · `SEC250_PartA_2026-08-05.md` (3).

**Where things are, as of 2026-08-05 (end of day, seventh working session in
this file's numbering):**

- **The graph is unchanged.** Still 137 reports, 215 dependencies, 154 dropped
  notes. This session extracted; it did not slice or import. Nothing in
  `EU/slices/` moved.
- **Priority A2 is closed.** SEC01 (Parliament, 53 pp) and SEC02 (Council,
  38 pp) are both extracted in full, matching `G.23.md`'s stated page counts.
- `TODO LISTS/rolling-todo.md` — updated this session with a Merged entry, and
  still more current than any `G.*` file for day-to-day mechanics.

**Retrieval, unchanged from G.26:**

- **`eur-lex.europa.eu` is anti-bot gated** to every client here — HTTP 202
  with a zero-byte body. A human browser gets through.
- **`destatis.de` is fully reachable**, and so is `commission.europa.eu`
  (rate-limited — 429 on a second request within seconds).
- National parliament document registers are official mirrors and work.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.

## Session conditions — read this first

**One extraction session, filesystem access, no browser used.** SEC01.pdf and
SEC02.pdf were already on disk (per G.21's correction that all eleven sections
are present). Text extracted with `pypdf` 6.14.2, both documents read in full
— 53 and 38 pages, page counts verified against `pypdf`'s own count before
reading, matching `G.23.md`'s stated figures exactly. No PDF was fetched from
the network this session; both retrieval URLs in the new Part A file are
**constructed by pattern**, same unverified status as SEC01/SEC02 carried into
this session (only SEC05 is hash-verified, per G.24 finding 1).

What was read first-hand: `Research.1.md` in full (re-read, not assumed);
`SEC01.pdf` and `SEC02.pdf` in full, both institutional-section budgets;
`G.23.md`'s finding 2 and priority-A entry for context on what the headcount
and money comparisons were expected to show; `EU/slices/README.md`'s folder
rule (not changed, read for orientation only).

What was **not** done:

- **No new PDF was fetched from the network.** Cheap checks 1 (SEC06 hash), 5
  (Annex XI Article 1(4)) and 7 (Eurostat Report of 31 October) all need a
  browser and none advanced.
- **No slice was written to `EU/slices/`.** This session's eight new Part A
  records are almost entirely `AGENCY ONLY` or termini — see "What this record
  does not do" in the Part A file itself — so there is very little Part B
  material to draft. This is the same ratio SEC05/SEC06/SEC07 produced.
- **`Research.2.md` and `Research.EU.md` were not re-opened.** Last first-hand
  read: G.24. Now four sessions removed. Flagged, not assumed clean.
- **The blob was not sliced.** Still 960 staged records, unworked.
- **The D-item merge was not performed**, seventh session running.
- **SEC08, SEC09, SEC10 remain untouched beyond searching.**

## Headline result

**Priority A2 closes with a comparative result, not just two more extractions.**
Tested against each other, SEC01 and SEC02 give opposite answers to the same
two questions G.18 and G.23 raised: does an institution's narrative total match
its own expenditure table, and does a narrative staffing request show up in the
establishment plan table.

**Parliament (SEC01) is clean on both.** Its stated 2027 total (EUR
2,656,435,753, "+1.98%") reproduces exactly from the expenditure table's own
figures, to two decimal places, and its stated headcount freeze ("no
additional permanent or temporary posts are requested") matches a Grand Total
that is identically 6,823 in 2027 and 2026.

**Council (SEC02) diverges on both, and the divergences are the kind G.18
predicted.** Its narrative total (EUR 755.0 million) sits EUR 2,225,335 above
its own expenditure table (EUR 752,774,665), and the advertised growth rate
(2.1%) is a third larger than the table's own arithmetic (1.78%) — the same
mechanism as `G.23.md` finding 2 (SEC05: 0.24 pp gap; SEC06: 2.52 pp gap; now
SEC02: 0.32 pp gap, squarely between the two). Its headcount narrative
describes a specific, prospective, unmet request — "five additional AD posts
… to be recruited in the course of 2027" — against a Grand Total flat at 3,030
in both years, which is exactly the SEC07 shape G.18 filed as a benign
timing/inclusion gap rather than an error, now confirmed at a second
institution with the mechanism stated in the document's own words.

**So cheap check 6 (G.26) is answered: money-total gaps now stand at 3 of 4
sections tested (SEC05, SEC06, SEC02), headcount gaps at 2 of 3 testable
sections (SEC07, SEC02) with SEC01 the first clean case on either count.**
"Two sections is a pattern; four would be a rule" — it is closer to a rule
than not, with one clean counter-example that the document explains from
inside (a stated staffing freeze) rather than a case that simply happened not
to diverge.

**Secondarily:** the branch's central absence — no named statistical release,
no `Eurostat`, no `HICP`, no standalone `index` — now holds across five
sections including the two largest by appropriation in the whole Draft Budget
(SEC01 alone is EUR 2.66 billion). Two new strings worth adding to future
registers: `GNI`, named once as a deflator variable with no publication
attached (S01-02), and `index-linking`, a property/construction-cost analogue
of the salary-indexation absence, found on the buildings side of a budget for
the first time (S01-03).

## Findings

### 1. The money-total gap, now measured at three institutions out of four

**Discharges half of cheap check 6.** `G.23.md` finding 2 established the
gap between an institution's narrative "increase" figure and its own
expenditure table at SEC05 (206,168,000 vs 205,670,000; +2.98% vs +2.74%,
0.24 pp) and SEC06 (187,651,416 vs 183,122,221; +4.47% vs +1.95%, 2.52 pp).
This session adds a third and a control:

| Section | Narrative total | Table total | Gap | Advertised % | Table % | Gap (pp) |
|---|---|---|---|---|---|---|
| SEC05 (ECA) | 206,168,000 | 205,670,000 | 498,000 | +2.98% | +2.74% | 0.24 |
| SEC06 (EESC) | 187,651,416 | 183,122,221 | 4,529,195 | +4.47% | +1.95% | 2.52 |
| SEC02 (Council) | 755,000,000 | 752,774,665 | 2,225,335 | +2.1% | +1.78% | 0.32 |
| SEC01 (Parliament) | 2,656,435,753 | 2,656,435,753 | **0** | +1.98% | +1.98% | **0** |

Computed from each document's own figures (`EU/SEC01-SEC02_PartA_2026-08-05.md`
records S01-04 and S02-02). **Three of four diverge; one — the largest section
by appropriation in the whole Draft Budget — matches exactly.** SEC07 remains
untested on this axis (`G.23.md`: "states no narrative total in the same
form"). The boilerplate every section carries at its head explains the
mechanism without naming a specific figure: *"the Commission has exceptionally
adjusted the estimates of all Institutions… figures… may be different"*
(quoted in full at S05-01, silently present in all four sections examined so
far and not re-quoted here per that record's own note). **What this rests
on:** arithmetic performed on quotes in `EU/SEC01-SEC02_PartA_2026-08-05.md`,
both first-hand this session.

### 2. The headcount gap, confirmed at a second institution in the shape G.18 named in advance

**Discharges the other half of cheap check 6.** `G.18.md` found SEC07's
narrative claiming "498 posts (1 new specialised cybersecurity post)" against
a table showing 497 in both years, and filed it as a benign timing/inclusion
difference rather than an error, contrasting it with SEC05 where narrative and
table agreed (881 both places). `G.23.md` then flagged SEC02 as the section to
test this against, "with SEC07's narrative-vs-table mismatch (498/497) in
hand as a worked example of a benign cause."

**It reproduces.** SEC02's narrative: *"the GSC maintains its limited request
for five additional AD posts for qualified cybersecurity experts, to be
recruited in the course of 2027."* SEC02's own STAFF table: Grand Total 3,030
in both 2027 and 2026 — flat, exactly as SEC07's was near-flat (497→497 with
one post described but not yet tabulated). The document supplies its own
explanation in the same sentence — the request is prospective ("to be
recruited in the course of") — which is the timing mechanism G.18 proposed
rather than a documented error. Record S02-03.

**SEC01 is the clean control on this axis too.** Its narrative states "No
additional permanent or temporary posts are requested for 2027," and its
Grand Total is identically 6,823 in both years. Record S01-04. So of three
sections where a headcount claim and a staff table both exist and can be
compared (SEC05, SEC07, SEC02 test positive-shaped claims; SEC01 tests a
negative-shaped one and passes it cleanly), the pattern holds wherever an
active change is claimed and holds trivially wherever no change is claimed.

**What this rests on.** The AD/AST sub-grade breakdown in SEC02's staff table
was **not** adjudicated — extracted text did not preserve the column
structure cleanly enough to say with confidence what a ten-post shift between
function groups represents, and this is flagged rather than guessed at in
S02-03's own notes.

### 3. A weaker naming of the same instrument, five pages apart, at two institutions

Record S02-03's own aside, not a separate cheap check. SEC02 names *"the
Cybersecurity Regulation"* with no instrument number, year or OJ reference,
in the same passage that describes the five-post cybersecurity request.
`G.23.md`'s S06-01 (EESC) names *"the Cybersecurity Regulation (EU, Euratom)
2023/2841"* with a quantified 10% ICT-budget target and the institution's own
measured shortfall against it (3.95%). Same regulation, two institutions,
citation practice ranging from a full number-and-target statement to a bare
generic noun phrase — the kind of variance `Research.1.md` §7 calls the normal
case rather than the disappointing one.

### 4. `GNI` and `index-linking`: two new strings for the absence register, both AGENCY ONLY

SEC01 names GNI explicitly as one of two variables driving an annual
appropriation increase — *"increased every year using a deflator that takes
into account movements in GNI and prices"* (Item 3244, record S01-02) — the
first appearance of that string across five sections now searched. No
publication, publisher or index title accompanies it. Separately, three
provisions across two buildings-related articles reference "index-linking" as
an operative contract term for rent and maintenance contracts (record S01-03)
without naming which index. Both are `AGENCY ONLY` in substance, same as
every salary-indexation reference found before them, but neither string was
on the prior watchlist (`Eurostat`, `HICP`, `consumer price`, standalone
`index`) — worth carrying into future registers as their own line items
rather than folding into "index" generically, since neither matched that
search.

### 5. A self-reported breach of the Commission's own spending ceiling

SEC02 states its own guidance in one place — *"aim at limiting the increase
for all non-salary related expenditure to a maximum of 2% compared to the
2026 level"* (record S02-01) — and in another admits going over it: *"This
amount takes the draft estimates beyond the Commission's guidance"* (record
S02-06), attributing EUR 1.5 million to an additional external cost-efficiency
study for the Justus Lipsius renovation. Not a dependency record — no
publication is named on either side of the guidance relationship — but kept
because it is the only place in either section where an institution flags its
own deviation from a stated ceiling before any external adjustment happens to
its figures, in contrast to the Commission-adjustment boilerplate every
section carries, which describes adjustment happening *to* an institution
rather than being reported *by* one.

## Secondary observations (logged, low priority)

- **SEC01 and SEC02 both carry the S05-01 boilerplate paragraph**
  byte-for-byte at their heads. `S05-01`'s own note already listed SEC04,
  SEC06, SEC09 and SEC10 as carrying it; this extends the list to at least six
  of eleven sections. Not re-quoted in the new Part A file per that record's
  own convention.
- **SEC01 has no Article-41-Financial-Regulation staff-policy annex and no
  "upgrades of posts" provision**, unlike SEC05's Annex II and point 2.1.3
  (S05-04, S05-10). Confirmed by string search, zero hits for "upgrad" and
  "Article 41" outside unrelated context. Institutions do not all carry the
  same annex set, worth remembering before assuming a provision found in one
  section generalises to the rest.
- **`scripts/eu-schema-smoke.ts` remains deletable** and still not deleted.
  Eighth session carrying it.

## Corrections to prior sessions

**None.** No finding from G.15–G.26 was checked against new evidence this
session, and none should be treated as revisited. The comparisons run here
(money-total gap, headcount gap) extend `G.18.md` and `G.23.md` findings with
new sections rather than correcting them — both predictions held.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10).**

1. ~~SEC05~~ (G.21) · ~~SEC06, SEC07~~ (G.23) · ~~SEC00 key~~ (G.22) ·
   ~~A8 retrieval URL~~ (G.24) · ~~first import~~ (G.26) ·
   ~~SEC01, SEC02~~ (**this file**) — closed.
2. **SEC08 (Ombudsman, 29 pp), SEC09 (EDPS, 31 pp), SEC10 (EEAS, 38 pp)** —
   now the recommended next extraction targets, all on disk, never opened.
   SEC10 first per G.23's own note: only section using the literal `X`
   numeral and the only `PPPA` code. Approach all three with the money- and
   headcount-gap comparisons in hand — three data points is a stronger base
   than two for either pattern, and neither comparison costs anything beyond
   the extraction already required.
3. **Part B** — `sc-51`…`sc-73` (existing). `sc-47`…`sc-50` remain
   **reserved**. Still outstanding: recovering those, and SEC04's addendum.
   **Nothing has been added for SEC01/SEC02**, since this session's records
   are almost entirely `AGENCY ONLY`/termini with no new soft-connection
   candidates distinct from what Part A already states plainly — the Part B
   Output Rule's spirit (a savable connection list) is arguably satisfied by
   the Part A file's own Register and "what this record does not do"
   sections, but if the next session disagrees, add `sc-79` onward.
4. **SEC06_batch.md** — still wanted once, format check only.

**B — SEC03 meta backlog, after A.** Unchanged. SEC03 (1,114 pp) is its own
corpus; SEC(2026) 250 (539 pp, retrievable, 533 unread) belongs here.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged in ranking.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, seventh session running.** Both briefs were last read first-hand at
G.24 — now four sessions removed, flagged in Session conditions above rather
than silently relied on.

**E — Everything the blob split created.**

1. ~~Schema decision.~~ DONE — G.20.
2. **Verify and slice the staged Eurostat strand — 960 records, not 814.**
   Start with `list-main-stats-2025-na` split into its nine products.
3. **The prose section** — `_staging/20-prose-sections.txt`, its own session.
4. **Reconcile the duplicates — ~150, not 49, and key on quote not id.**
   Prerequisite; mechanism known. Finding 4, `G.26.md`.
5. **Reconcile the two priority queues.** Fold into the D merge.

**F — The German sub-graph.** Unchanged. Both leads documented and named in
`de-destatis-national-accounts.json`'s `_dropped`, neither needing new
research to find: Deutsche Bundesbank financial accounts by sector; the
German source statistics named by title and EVAS register number.

## Cheap checks still outstanding

**Done since G.26: cheap check 6** ("Check whether SEC01/SEC02 show the
request-vs-table gap") — see findings 1 and 2 above. Both halves answered:
money gap yes (a third of four sections), headcount gap yes (a second of
three testable sections), SEC01 the clean control on both.

Remaining, by value per unit effort:

1. **Fetch `SEC06.pdf`** and hash it against `EU/SEC06.pdf`. Converts 28
   records from inferred provenance to verified. Needs a browser.
2. **Split `list-main-stats-2025-na` into nine records.** Mechanical; unlocks
   the best remaining staging material.
3. **Re-measure E4 keying on quote, not id**, and reconcile.
4. **Delete `scripts/eu-schema-smoke.ts`** — its stated condition has lapsed.
5. **Retrieve Annex XI Article 1(4)** — closes finding 1's open limb
   (`G.26.md`). EUR-Lex is gated; a parliament register is how `COM(2025) 736`
   was obtained.
6. **Retrieve the Eurostat Report of 31 October** and establish its URL.
7. **Read EBS Regulation 2019/2152** as a third test of the asymmetry, from
   the EU side.
8. **Pull the `[NA-Pen] / Table 29` thread** — the only table-to-publication
   tie in the corpus.
9. **NEW, cheap: fetch `SEC01.pdf` and `SEC02.pdf` from the pattern URL and
   hash both against the local files.** Same mechanism as cheap check 1, now
   with two more candidates queued behind SEC06. Needs a browser.
10. **NEW, cheap: search the corpus (or Eurostat's own site) for a titled GNI
    deflator publication**, following S01-02's lead — SEC01 names the
    variable, not the source.
11. **Check whether sc-47–sc-50 exist anywhere**; **characterise the 155
    non-`S` loose records**; **match the 8 record-less batch headers**;
    **enumerate the `9`-series tags** beyond `SPEC`/`DAG`/`PPPA`.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this file.**

1. **This file (`G.27.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9 id
   list.
3. **`EU/SEC01-SEC02_PartA_2026-08-05.md`** — this session's extraction, and
   the register that extends the absence findings to five sections.
4. **`EU/SEC06-SEC07_PartA_2026-08-05.md`** — for the money/headcount gap
   comparisons this file builds on.
5. **`src/data/research/de-destatis-national-accounts.json`** — the pattern
   that works for import, unchanged this session.
6. **The next target PDFs** — `SEC08.pdf`, `SEC09.pdf`, `SEC10.pdf`. Already
   in `EU/`.
7. **A browser**, for cheap checks 1, 5, 6 and 9 (new).

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
