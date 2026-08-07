# G.31.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-read in full this session. Research.2.md
and Research.EU.md were **not** re-opened; last first-hand read remains G.24,
now eight sessions back.
Predecessor: G.30.md (2026-08-05).

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
2. **This file**, in full. **The headline result is the most important thing
   this branch has found since the German cross-layer edge — read it before
   anything else.**
3. **`EU/FSDN_FSS_PartA_2026-08-05.md`** — this session's browser-sourced
   extraction. **`eurostat-farm-structure-survey` is now a ready-to-mint node
   candidate** — named, cadenced, titled, all from Eurostat's own metadata
   page, plus a documented methodological dependency (FSS → FADN
   extrapolation) that is the closest thing to a genuine EU-internal
   statistics-to-statistics edge this branch has found.
4. **The four imported EU slices**, in `src/data/research/` —
   `eu-draft-budget.json`, `esa-2010.json`, `de-destatis-national-accounts.json`.
   **Unchanged this session** — the FSS lead was extracted but not yet
   minted into a slice.
5. **`EU/AnnexB_assessment_2026-08-05.md`** and **`EU/slices/README.md`** —
   the branch's central asymmetry finding, still standing for administrative
   budget material; this session's find sits alongside it as a different
   kind of edge (EU-internal statistics dependency), not a contradiction.
6. **`EU/SEC03_Title08_PartA_2026-08-05.md`**, record S03-12 — the SEC03
   budget item that pointed here in the first place.
7. The other Part A records in `EU/`: `SEC03_Title01_PartA_2026-08-05.md`,
   `SEC01-SEC02_PartA_2026-08-05.md`,
   `SEC08-SEC09-SEC10_PartA_2026-08-05.md`, `SEC05_PartA_2026-08-04.md` (the
   format exemplar), `SEC06-SEC07_PartA_2026-08-05.md`,
   `AnnexXI_PartA_2026-08-05.md`, `SEC250_PartA_2026-08-05.md`.

**Where things are, as of 2026-08-05 (end of day, eleventh working session in
this file's numbering):**

- **The graph is unchanged.** Still 137 reports, 215 dependencies, 154
  dropped notes. This session did browser research and extraction; it did
  not slice or import.
- **`eur-lex.europa.eu` is reachable through the Browser tool.** This is a
  change worth flagging clearly: every prior session described EUR-Lex as
  "anti-bot gated to every client here" based on programmatic HTTP fetches
  returning HTTP 202 with an empty body. **A browser-driven fetch (the
  `Claude_Browser` tool) loaded EUR-Lex pages normally, with full text,
  every time this session** — three separate CELEX documents, no gating
  encountered. The gate appears to target non-browser HTTP clients
  specifically, not browsers in general. **This may unblock every
  EUR-Lex-dependent cheap check that has been queued since G.21** (Annex XI
  Article 1(4), the Eurostat Report of 31 October, EBS Regulation
  2019/2152), not just this session's FSDN lead.
- **Two DG AGRI domains were unreachable** this session:
  `agridata.ec.europa.eu` and `agriculture.ec.europa.eu`, both denied by the
  browser tool. Cause not established — could be a domain allowlist
  specific to this session's tool rather than a site-side gate. `ec.europa.eu`
  and `commission.europa.eu` both worked normally.
- `TODO LISTS/rolling-todo.md` — updated this session with a Merged entry.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
`python-docx` needed for `.docx` files.

## Session conditions — read this first

**One browser-research session, no PDF extraction.** Fetched and read four
documents in full through the `Claude_Browser` tool: Regulation (EU)
2018/1091 (integrated farm statistics), Council Regulation (EC) No 1217/2009
(the original 2009 Farm Accountancy Data Network regulation), Regulation
(EU) 2023/2674 (the 2023 FSDN conversion), and Eurostat's own "Farm
structure (ef)" metadata page. All read directly, first-hand, via
`get_page_text` and targeted `javascript_tool` string searches against the
full page text (not just the visible viewport — page lengths of 41,000–
72,000 characters were returned in full each time).

What was read first-hand: all four documents above, in full or to the
extent their length required targeted search (`Regulation (EU) 2023/2674` at
64,939 characters was searched rather than read start-to-end, but every
section quoted was located and read in context).

What was **not** done:

- **FADN's own dedicated site (distinct from Eurostat's FSS pages) was not
  reached.** `agridata.ec.europa.eu` and `agriculture.ec.europa.eu` were both
  denied. FADN's own title/cadence/URL from an authoritative primary source
  remains unestablished — everything known about FADN's current public-facing
  cadence comes from the legal instruments (EUR-Lex) and Eurostat's
  cross-reference, not from FADN's own metadata.
- **No slice was drafted or written.** `eurostat-farm-structure-survey` is
  assessed as ready-to-mint but minting was deliberately left to a dedicated
  pass — see priority section.
- **The other EUR-Lex-gated cheap checks were not attempted this session**
  despite the gate apparently not applying to browser fetches — Annex XI
  Article 1(4), the Eurostat Report of 31 October, and EBS Regulation
  2019/2152 are all now candidates for the same technique, untried.
- **`Research.2.md` and `Research.EU.md` were not re-opened.** Last
  first-hand read: G.24, eight sessions back.
- **The blob was not sliced.** Still 960 staged records, unworked.
- **No further SEC03 Titles were extracted.**

## Headline result

**The Farm Structure Survey (FSS) is a ready-to-mint node, and its own
metadata states a documented dependency on it from the Farm Accountancy Data
Network (FADN) — the closest thing to a genuine EU-internal
statistics-to-statistics edge this branch has found in eleven sessions.**

Eurostat's own metadata page for "Farm structure (ef)" states plainly: *"The
data describe the structure of agricultural holdings [...] The aggregated
results are disseminated through statistical tables,"* with an explicit
cadence — *"Results are disseminated 2 years after the reference year"* —
and a stated pattern of roughly 2–3 years between surveys on a 10-year
census cycle, tied by name to Regulation (EU) 2018/1091. That clears all
three of `Research.1.md` §4's node conditions (named, cadenced, titled) from
a single, authoritative, official source — the strongest node candidate
this branch has produced, and the first time a full cadence statement this
explicit has been found anywhere in the EU sub-branch.

The same page states: *"Both the censuses and the sample surveys [of the
FSS] are aimed at producing a variety of information on specific CAP
targets, as well as providing a basis for extrapolating Farm Accountancy
Data Network (FADN) data."* That is Eurostat itself documenting that one
named EU statistical product supplies the extrapolation framework for
another — a real, citable `methodology_depends_on`-shaped relationship,
internal to the EU statistical system rather than running to a member state.

**Secondarily, and possibly more consequential for the branch's unfinished
work than the FSS finding itself: `eur-lex.europa.eu` loaded normally
through a browser this session, three separate times, with no anti-bot
gating encountered.** Every prior session's characterisation of EUR-Lex as
"anti-bot gated to every client here" was based on non-browser HTTP fetches.
This changes the cost-benefit of several queued cheap checks that were
filed as "needs a browser" — they may simply need *this* browser tool,
untried until now.

## Findings

### 1. The Farm Structure Survey clears all three node conditions

Discussed in full above, records FSS-01 and FSS-02 in
`EU/FSDN_FSS_PartA_2026-08-05.md`. **What this rests on**: Eurostat's own
"Farm structure (ef)" metadata page, read first-hand this session, same
evidence class as the Destatis quality reports that produced the branch's
existing German cross-layer edge.

### 2. The FSDN's annual-report duty to Parliament and Council was replaced, not extended, in 2023

Council Regulation (EC) No 1217/2009's original Article 1(3) required the
Commission to submit reports on the situation of agriculture and farm
incomes *"annually to the European Parliament and the Council."* Regulation
(EU) 2023/2674 replaced Article 1 wholesale; the replacement text (read in
full) contains no equivalent annual-report-to-the-institutions clause, only
a duty to make analysis results "publicly available" with no stated
cadence. **Flagged as a documented change, not adjudicated** — whether the
annual-report duty survives elsewhere in the current consolidated text of
Regulation (EC) No 1217/2009 was not checked; only the amending regulation's
own replacement text was read. Records FSDN-01, FSDN-02. **What this rests
on**: direct reading of both the 2009 codified text and the 2023 amending
regulation's Article 1 replacement, both first-hand this session.

### 3. EUR-Lex's anti-bot gate does not appear to block browser-driven fetches

Three separate CELEX documents (32018R1091, 32009R1217, 32023R2674) all
loaded with full text through the `Claude_Browser` tool on the first
attempt, no HTTP 202/empty-body pattern encountered at any point. **What
this rests on**: direct observation this session, contrasted against every
prior session's characterisation of the same domain (G.20 onward) based on
non-browser fetch attempts. Not yet re-tested against a member-state or
international-body PDF (this session only fetched EUR-Lex regulation text,
not a large binary like `SEC06.pdf`'s equivalent) — worth confirming the
technique generalises before assuming every browser-EUR-Lex fetch will
succeed.

## Secondary observations (logged, low priority)

- **`agridata.ec.europa.eu` and `agriculture.ec.europa.eu` were both denied**
  by the browser tool this session, while `ec.europa.eu` and
  `commission.europa.eu` worked normally. Cause not established — worth
  retrying in a future session in case it was a transient or
  session-specific restriction rather than a standing one.
- **Regulation (EU) 2018/1091's own preamble traces the Farm Structure
  Survey's lineage to 1966** ("The programme of European surveys on the
  structure of agricultural holdings, which has been carried out in the
  Union since 1966") — a longer continuous run than any other recurring
  series so far documented in this branch, EU or Canada/US side.
- **FADN's sample is capped by regulation at a specific number**: "The
  maximum number of returning holdings shall be 105 000 for the Community"
  (Council Regulation (EC) No 1217/2009, Article 5(3)) — a citable,
  numeric operational parameter, not itself a dependency but the kind of
  concrete detail `Research.1.md` §8 values.

## Corrections to prior sessions

**None.** No finding from G.15–G.30 was checked against new evidence and
found wrong this session. Finding 1 extends `G.30.md`'s lead to a
ready-to-mint conclusion rather than correcting anything; finding 3
corrects no specific prior *finding* but does correct a standing
*operational assumption* ("EUR-Lex needs a human browser, not an agent
here") that shaped priority scoping since G.20 — flagged as a process note,
not a finding correction, since no G file asserted EUR-Lex was
unreachable *in principle* by an agent, only that the fetch methods tried
so far had failed.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog. Underway**, unchanged from `G.30.md` except:

1. **The FSDN/FSS lead (G.30's top item) is now resolved to the point of a
   ready-to-mint node** — see new item 0 below, which now outranks it.
2. Titles 02–07, 09–16, 20, 21, 30 — still open. Title 05 (Regional
   Development and Cohesion, EUR 44.0bn CA) is the largest remaining Title.
3. Annex "Staff", Annexed Offices, Revenue Titles 3/4/6 — still open.

**NEW, item 0, ahead of everything in B: mint `eurostat-farm-structure-survey`
as a node in a Part B slice, and record the FSS→FADN `methodology_depends_on`
lead as `no-node-yet` in `_dropped` until FADN itself clears §4.** This is a
dedicated, bounded task: draft `EU/slices/eu-level/eurostat-farm-structure-survey.json`
following the `eu-draft-budget.json`/`esa-2010.json` pattern, validate
against the schema (country `EU`, jurisdiction_level `supranational`,
domain — note `Research.1.md` §6's domain list has no clean `agriculture`
value, same gap class as the `fiscal-transfers`-as-least-wrong precedent),
check id collision against the full corpus id list, then move to
`src/data/research/` and register in `src/data/index.ts` per the proven
workflow.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, eleventh session running.** Still carrying the SEC09/SEC10
`EU Meta jsons.docx` reconciliation from `G.29.md`.

**E — Everything the blob split created.** Unchanged.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since G.30: the FSDN/FSS lead (item 1) is resolved** to a ready-to-
mint conclusion — see priority item 0 above for the remaining mechanical
step (drafting and validating the slice).

Remaining, reordered given finding 3 (EUR-Lex is browser-reachable):

1. **NEW, now cheap given finding 3: retrieve Annex XI Article 1(4)** via
   the `Claude_Browser` tool at its EUR-Lex CELEX URL. Closes `G.26.md`
   finding 1's open limb. Try the same technique that worked this session.
2. **NEW, now cheap: retrieve the Eurostat Report of 31 October** and
   establish its URL, same technique.
3. **NEW, now cheap: read EBS Regulation 2019/2152** as a third test of the
   asymmetry, same technique.
4. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies — these
   are large PDF binaries, not EUR-Lex HTML pages, so confirm the browser
   technique extends to PDF downloads before assuming it will work the same
   way.
5. Split `list-main-stats-2025-na` into nine records.
6. Re-measure E4 keying on quote, not id, and reconcile.
7. Delete `scripts/eu-schema-smoke.ts` — its stated condition has lapsed.
8. Pull the `[NA-Pen] / Table 29` thread.
9. Check whether SEC09's total-level sign flip has a stated explanation
   elsewhere (`G.28.md` finding 1).
10. Search for a titled GNI deflator publication, following SEC01's S01-02
    lead.
11. Reconcile `EU Meta jsons.docx`'s SEC09/SEC10 batches against
    `SEC08-SEC09-SEC10_PartA_2026-08-05.md`.
12. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
    metadata, in case this session's denial was transient.
13. Check whether sc-47–sc-50 exist anywhere; characterise the 155 non-`S`
    loose records; match the 8 record-less batch headers; enumerate the
    `9`-series tags beyond `SPEC`/`DAG`/`PPPA`/`OTH`.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.31.md`)** — paste as text, do not attach. **Read the
   Headline result first.**
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9
   id list.
3. **`EU/FSDN_FSS_PartA_2026-08-05.md`** — this session's extraction, the
   reason to prioritise minting `eurostat-farm-structure-survey` next.
4. **`EU/SEC03_Title08_PartA_2026-08-05.md`**, record S03-12 — the original
   lead this session followed.
5. **`src/data/research/de-destatis-national-accounts.json`** and
   **`esa-2010.json`** — the import pattern to copy for the FSS slice.
6. **A browser** (the `Claude_Browser` tool specifically, per finding 3) —
   for minting-adjacent verification and for the newly-cheap EUR-Lex checks
   (Annex XI, Eurostat Report of 31 October, EBS Regulation).
7. **The next target if a browser session**: draft and validate the FSS
   slice (priority item 0), then retry Annex XI Article 1(4) with the same
   technique. **If no browser**: SEC03 Title 05 (Regional Development, the
   largest remaining Title) is the fallback extraction target.

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
