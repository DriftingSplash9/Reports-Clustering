# G.28.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-read in full this session. Research.2.md
and Research.EU.md were **not** re-opened; last first-hand read remains G.24,
now five sessions back.
Predecessor: G.27.md (2026-08-05).

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
   pattern that works. **Unchanged this session.**
4. **`EU/AnnexB_assessment_2026-08-05.md`** — the branch's central negative
   result, and half of finding 1 in `G.26.md`.
5. **`EU/slices/README.md`** — folder layout and the cadence-blocker route.
   **Unchanged this session.**
6. **This session's new Part A record**:
   `EU/SEC08-SEC09-SEC10_PartA_2026-08-05.md`, 8 records across all three
   sections, plus a register that extends the absence findings to all eight
   sections examined so far.
7. **`EU/SEC01-SEC02_PartA_2026-08-05.md`** — the predecessor extraction this
   session's money/headcount comparisons build directly on.
8. The other Part A records in `EU/`: `SEC05_PartA_2026-08-04.md` (19, the
   format exemplar) · `SEC06-SEC07_PartA_2026-08-05.md` (9) ·
   `AnnexXI_PartA_2026-08-05.md` (12) · `SEC250_PartA_2026-08-05.md` (3).

**Where things are, as of 2026-08-05 (end of day, eighth working session in
this file's numbering):**

- **The graph is unchanged.** Still 137 reports, 215 dependencies, 154 dropped
  notes. This session extracted; it did not slice or import.
- **Priority A is now fully closed for the eight sections it names.** SEC08
  (Ombudsman, 29 pp), SEC09 (EDPS/EDPB, 31 pp) and SEC10 (EEAS, 38 pp) are all
  extracted in full. All eight sections G.20's priority list ever named
  (SEC05, SEC06, SEC07, SEC01, SEC02, SEC08, SEC09, SEC10) now have a Part A
  record. **SEC00 has only a targeted key search, not a full extraction; SEC03
  (1,114 pp) and SEC04's addendum remain entirely unextracted** — these were
  always filed separately (SEC00 under A4, closed negative; SEC03/SEC04 under
  priority B).
- `TODO LISTS/rolling-todo.md` — updated this session with a Merged entry.

**Retrieval, unchanged from G.26/G.27:**

- **`eur-lex.europa.eu` is anti-bot gated** to every client here. A human
  browser gets through.
- **`destatis.de` is fully reachable**, and so is `commission.europa.eu`
  (rate-limited).
- National parliament document registers are official mirrors and work.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.

## Session conditions — read this first

**One extraction session, filesystem access, no browser used.** All three
PDFs were already on disk. Text extracted with `pypdf` 6.14.2, all three
documents read in full — 29, 31 and 38 pages, matching `G.23.md`'s stated
counts exactly. No PDF was fetched from the network this session; all three
retrieval URLs in the new Part A file are **constructed by pattern**,
unverified.

What was read first-hand: `Research.1.md` in full (re-read); `SEC08.pdf`,
`SEC09.pdf` and `SEC10.pdf` in full, all three institutional-section budgets;
`EU/SEC01-SEC02_PartA_2026-08-05.md` and `G.27.md`, for the comparison
baseline this session extends.

What was **not** done:

- **No new PDF was fetched from the network.** Cheap checks 1 (SEC06 hash), 5
  (Annex XI Article 1(4)) and 7 (Eurostat Report of 31 October) all need a
  browser and none advanced. Two more candidates now queue behind them:
  SEC08/09/10 could each be hash-verified the same way SEC05 was.
- **No slice was written to `EU/slices/`.** Same ratio as every institutional
  section so far — the new records are `AGENCY ONLY`, termini, internal
  conflicts, or methodological cautions, none proposing a node or edge.
- **`Research.2.md` and `Research.EU.md` were not re-opened.** Last first-hand
  read: G.24. Now five sessions removed.
- **The blob was not sliced.** Still 960 staged records, unworked.
- **The D-item merge was not performed**, eighth session running.
- **SEC00 was not re-opened for a full extraction pass** — its own key search
  is closed negative (G.22), but nobody has read it end to end for Part A
  purposes.

## Headline result

**The money-total gap is now the rule, not the exception, and its size varies
by an order of magnitude with no visible relationship to institution size.**
Eight sections now carry a comparable narrative-total-vs-table-total check.
Seven diverge; one — Parliament, the largest section in the whole Draft
Budget — matches its own table exactly to two decimal places.

| Section | Institution | Narrative total (EUR) | Table total (EUR) | Gap (EUR) | Narrative % | Table % | Gap (pp) |
|---|---|---|---|---|---|---|---|
| SEC01 | Parliament | 2,656,435,753 | 2,656,435,753 | 0 | +1.98% | +1.98% | 0.00 |
| SEC05 | Court of Auditors | 206,168,000 | 205,670,000 | 498,000 | +2.98% | +2.74% | 0.24 |
| SEC02 | Council | 755,000,000 | 752,774,665 | 2,225,335 | +2.1% | +1.78% | 0.32 |
| SEC08 | Ombudsman | 17,006,600 | 16,783,612 | 222,988 | +1.95% | +0.62% | 1.33 |
| SEC06 | EESC | 187,651,416 | 183,122,221 | 4,529,195 | +4.47% | +1.95% | 2.52 |
| SEC10 | EEAS | 992,700,000 | 965,443,055 | 27,256,945 | +4.7% | +1.87% | 2.83 |
| SEC09 | EDPS/EDPB | 32,535,000 | 30,262,189 | 2,272,811 | +5.65% | **−1.73%** | 7.38* |

*SEC09's own sub-titles diverge even more sharply — Title 2 advertised as
"decreases by 5.02%" against a table decrease of 16.43%, more than three times
the stated rate. See finding 1.

SEC07 remains untested on this axis (`G.23.md`: no comparable narrative total
in its own text).

**The headcount comparison, run at nine testable body/section pairs now,
shows three distinct outcomes rather than one rule:**

1. **Clean — no change claimed, table flat.** SEC01 (Parliament), SEC09/EDPS,
   SEC09/EDPB. Three of nine.
2. **A specific request against a flat table, explained by timing.** SEC02
   ("to be recruited in the course of 2027"), SEC07 (G.18's 498/497, the
   original worked example), and — weaker, no timing language in the document
   itself — SEC08 ("has decided to request two additional posts"). Five of
   nine counting the two ECA/EESC/CoR-family precedents already on record.
3. **A specific request against a flat table, explained by category, not
   timing — new this session.** SEC10: the "15 additional posts" the
   narrative announces are 10 Seconded National Experts and 5 contract
   agents, neither of which belongs to the establishment-plan staff category
   the STAFF table counts at all. The table was never going to move.

**So a flat establishment-plan table is not, by itself, evidence that a
stated headcount change did not happen.** It can mean the change hadn't been
processed yet (category 2) or that it was never going to appear in that table
in the first place (category 3). Finding 2.

**Secondarily:** the absence register now covers all eight extracted sections
without exception for `Eurostat`, `HICP`, `consumer price` and standalone
`index`. SEC10 confirms `G.23.md`'s advance prediction about DISC-07-03 — it
is the only section using the literal letter `X` as its MFF section digit and
the only one carrying the `PPPA` tag.

## Findings

### 1. The money gap, sections five through eight — and one sign flip

Discussed in the headline table above. The single most important addition is
**SEC09's total-level divergence changes sign**: the narrative states a
5.65% *increase* to €32,535,000; the section's own expenditure table shows a
**1.73% decrease**, to €30,262,189, a full EUR 2,272,811 below the narrative
figure. This is not a rounding difference or a boilerplate-explained
adjustment of the kind SEC05/SEC06 carry (`G.23.md` finding 2's mechanism,
quoted at S05-01) — it is the first case in the branch where the two figures
disagree about the direction the budget is moving, and it holds at every
sub-title level checked (Title 1: narrative +2.18% vs table −0.63%; Title 2:
narrative "decreases by 5.02%" vs table −16.43%, more than three times the
stated rate; Title 3: narrative +17.25% vs table +3.92%). Records S09-01,
S08-01, S10-01. **What this rests on**: arithmetic performed on quotes in
`EU/SEC08-SEC09-SEC10_PartA_2026-08-05.md`, all first-hand this session.
Neither this file nor its predecessors offer a mechanism for SEC09's
divergence — flagged as unexplained, per `Research.1.md` §3, rather than
guessed at.

### 2. The headcount gap has (at least) two distinct causes, and only one was previously identified

`G.18.md` and `G.27.md` established the timing/inclusion cause: a narrative
request that has not yet been processed into the establishment-plan table.
**SEC10 shows a second, structurally different cause.** The STAFF table
(`EU/SEC08-SEC09-SEC10_PartA_2026-08-05.md` record S10-02) only ever counts
"Permanent posts" and "Temporary posts" under the establishment plan; SEC10's
own Title 1.2 shows Seconded National Experts and contract agents are
budgeted as "external staff", a separate chapter entirely. So the "15
additional posts" the EEAS narrative announces for its Security and Defence
package **cannot appear** in the table being compared against them, on any
timeline — not a processing lag, a categorical mismatch. **This matters for
how the whole comparative series should be read**: a flat table is evidence
of *something*, but which of (at least) two different things requires
checking what kind of post the narrative is describing, not just whether the
Grand Total moved. **What this rests on**: SEC10's own Title 1.2 heading and
the STAFF table's own column headers, both quoted in S10-02, first-hand.

### 3. DISC-07-03's predicted outlier, confirmed exactly

`G.23.md`'s priority note named SEC10 in advance as the section that would
break the `7.2.<section-digit>` pattern and carry the branch's only `PPPA`
tag. Both hold without exception: every MFF code in SEC10 uses the literal
letter `X` (`7.2.X11`, `7.2.X12`, `7.2.X31`…) where every other section uses
its own numeral, and the only `PPPA`-tagged line in the corpus is SEC10's
pilot project "Towards the creation of a European Diplomatic Academy" — a
`p.m.` line with no other data attached. Record S10-03. **What this rests
on**: a direct string comparison between SEC10's codes and the equivalent
codes already recorded for SEC01 (`G.27.md`) and SEC05 (`G.21.md`), first-hand
this session for SEC10's side.

### 4. A second internal abatement-rate conflict, same shape as S05-14/S02-05 but now contradictory rather than merely unpublished

SEC08 states its own vacancy abatement two ways in the same document: the
narrative gives "An abatement rate (3%)"; the largest single appropriation
item in the section (Remuneration and allowances, EUR 11,811,716) states "A
standard abatement of 2%". Record S08-03. Unlike the ECA's and Council's
abatement figures (S05-14, S02-05), which were internally consistent but
simply unpublished as to their source, **this is the first case where an
institution's own two statements of the same figure disagree with each
other**, in the shape of S05-19's Luxembourg housing-allowance conflict
(SEC04 vs SEC05) but now *within* one section rather than between two.
Neither number is picked, per §3.

## Secondary observations (logged, low priority)

- **SEC09's narrative names a specific CJEU ruling** (Case C-97/23 P,
  decision of 10 February 2026) as the reason the EDPB needs more litigation
  capacity, and a specific forthcoming instrument (Regulation 2025/2518,
  applicable from 2 April 2027) as the reason the EDPB's IT sector needs more
  resources. Neither is a report/statistic dependency in `Research.1.md` §4's
  sense — they are policy drivers, not data inputs — so neither became a
  full Part A record, but both are unusually well-cited compared to most
  narrative-section prose in this corpus and worth remembering if the branch
  ever extends to legal-instrument-to-budget-line chains more broadly.
- **The Commission-to-EEAS staff contribution is a large, named, structured
  revenue flow** — Article 3 3 2, "estimated at EUR 237,882,000" — the
  largest single assigned-revenue figure found in any of the eleven sections.
  Not itself a report dependency (it is an inter-institutional payment, not a
  publication), but worth flagging as the kind of number that would matter if
  a future session builds an inter-institutional funding-flow layer distinct
  from the report-dependency graph.
- **SEC10 is the only section whose expenditure table splits Commitments and
  Payments as separate columns at every row.** They are equal throughout
  (non-differentiated appropriations), so it changes nothing about how the
  section reads, but it is a structural difference from the other seven
  sections' single-column tables worth remembering if a script ever parses
  these tables programmatically.

## Corrections to prior sessions

**None.** No finding from G.15–G.27 was checked against new evidence and
found wrong this session. This session's finding 2 refines rather than
corrects `G.18.md`'s headcount-gap finding: it does not overturn the
timing/inclusion explanation, it adds a second, distinct cause the prior
finding did not anticipate because only one section (SEC07) had been tested
at the time.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10). Section-by-section work is now
complete for the eight sections this priority ever named.**

1. ~~SEC05~~ (G.21) · ~~SEC06, SEC07~~ (G.23) · ~~SEC00 key~~ (G.22) ·
   ~~A8 retrieval URL~~ (G.24) · ~~first import~~ (G.26) ·
   ~~SEC01, SEC02~~ (G.27) · ~~SEC08, SEC09, SEC10~~ (**this file**) —
   closed.
2. **No new institutional extraction target remains in priority A.** The
   next work in this vein is either (a) hash-verifying the seven
   pattern-constructed URLs against a real fetch — cheap, needs a browser,
   ten candidates now queued (SEC01/02/06/07/08/09/10) — or (b) opening
   priority B's SEC03/SEC04, a different scale of document entirely
   (SEC03 alone is 1,114 pp).
3. **Part B** — `sc-51`…`sc-73` (existing), unchanged. `sc-47`…`sc-50`
   remain **reserved**. **Nothing has been added for SEC08/09/10**, same
   reasoning as G.27's SEC01/SEC02 note: the records are almost entirely
   `AGENCY ONLY`/termini/conflicts, and the Part A file's own Register and
   "what this record does not do" sections arguably satisfy the Output
   Rule's spirit. Add `sc-79` onward if the next session disagrees.
4. **SEC06_batch.md** — still wanted once, format check only.

**B — SEC03 meta backlog. Now the natural next body of extraction work**,
priority A having closed. SEC03 (1,114 pp) is its own corpus; SEC(2026) 250
(539 pp, retrievable, 533 unread) belongs here too.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged in ranking.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, eighth session running.** Both last read first-hand at G.24 — five
sessions removed, flagged rather than silently relied on.

**E — Everything the blob split created.**

1. ~~Schema decision.~~ DONE — G.20.
2. **Verify and slice the staged Eurostat strand — 960 records, not 814.**
   Start with `list-main-stats-2025-na` split into its nine products.
3. **The prose section** — `_staging/20-prose-sections.txt`, its own session.
4. **Reconcile the duplicates — ~150, not 49, and key on quote not id.**
   Prerequisite; mechanism known.
5. **Reconcile the two priority queues.** Fold into the D merge.

**F — The German sub-graph.** Unchanged. Both leads documented and named in
`de-destatis-national-accounts.json`'s `_dropped`.

## Cheap checks still outstanding

**Done since G.27: none new** — this was an extraction session, and its two
findings (the money-gap headline and the headcount-cause split) came from the
extraction itself rather than from a queued cheap check.

Remaining, by value per unit effort:

1. **Fetch and hash any of SEC01/02/06/07/08/09/10 against local copies.**
   Seven candidates now queued behind the one already done (SEC05). Each
   fetch converts a whole Part A file from inferred to verified provenance.
   Needs a browser.
2. **Split `list-main-stats-2025-na` into nine records.** Mechanical; unlocks
   the best remaining staging material.
3. **Re-measure E4 keying on quote, not id**, and reconcile.
4. **Delete `scripts/eu-schema-smoke.ts`** — its stated condition has lapsed.
5. **Retrieve Annex XI Article 1(4)** — closes `G.26.md` finding 1's open
   limb. EUR-Lex is gated; a parliament register is how `COM(2025) 736` was
   obtained.
6. **Retrieve the Eurostat Report of 31 October** and establish its URL.
7. **Read EBS Regulation 2019/2152** as a third test of the asymmetry.
8. **Pull the `[NA-Pen] / Table 29` thread** — the only table-to-publication
   tie in the corpus.
9. **NEW, cheap: check whether SEC09's total-level sign flip has a stated
   explanation elsewhere** (a different "2026" baseline, a corrigendum, a
   revised estimate) — one search of `commission.europa.eu` or the EDPS's own
   site, not the Draft Budget PDF itself, which does not explain it.
10. **Search for a titled GNI deflator publication**, following SEC01's S01-02
    lead — SEC01 names the variable, not the source.
11. **Check whether sc-47–sc-50 exist anywhere**; **characterise the 155
    non-`S` loose records**; **match the 8 record-less batch headers**;
    **enumerate the `9`-series tags** beyond `SPEC`/`DAG`/`PPPA`.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this file.**

1. **This file (`G.28.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9 id
   list.
3. **`EU/SEC08-SEC09-SEC10_PartA_2026-08-05.md`** — this session's
   extraction, and the register that now covers all eight examined sections.
4. **`EU/SEC01-SEC02_PartA_2026-08-05.md`** and **`EU/G.27.md`** — for the
   money/headcount comparison baseline this file extends.
5. **`src/data/research/de-destatis-national-accounts.json`** — the pattern
   that works for import, unchanged this session.
6. **The next target: `SEC03.pdf`** (1,114 pp) or a browser for the
   hash-verification queue — either is a legitimate next session, priority
   A having closed.
7. **A browser**, for cheap checks 1, 5, 6, 9 (new) and the new
   hash-verification queue.

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
