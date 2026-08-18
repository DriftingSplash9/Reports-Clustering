# G.29.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — re-read in full this session. Research.2.md
and Research.EU.md were **not** re-opened; last first-hand read remains G.24,
now six sessions back.
Predecessor: G.28.md (2026-08-05).

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
   result.
5. **`EU/slices/README.md`** — folder layout and the cadence-blocker route.
   **Unchanged this session.**
6. **This session's new Part A record**:
   `EU/SEC03_Title01_PartA_2026-08-05.md` — the branch's **first entry into
   SEC03**, the Commission's own 1,114-page section, its own corpus. Covers
   the 20-Title expenditure master summary and Title 01 (Research and
   Innovation, EUR 13.8bn) in full.
7. **`EU/EU Meta jsons.docx`** — a large (12,447-paragraph, 1.26M-character)
   archive from an earlier chat-based workflow, **newly rediscovered this
   session**. It contains a complete, high-quality SEC03 extraction for the
   master summary and Chapter 01 01 (Support administrative expenditure),
   dated 2026-08-03, never before ported into the current file-based Part A
   convention. It also appears to contain complete SEC09 and SEC10
   extractions predating this branch's fresh SEC09/SEC10 work in `G.28.md` —
   **not reconciled or compared this session**, flagged below.
8. The other Part A records in `EU/`: `SEC01-SEC02_PartA_2026-08-05.md`,
   `SEC08-SEC09-SEC10_PartA_2026-08-05.md`, `SEC05_PartA_2026-08-04.md` (the
   format exemplar), `SEC06-SEC07_PartA_2026-08-05.md`,
   `AnnexXI_PartA_2026-08-05.md`, `SEC250_PartA_2026-08-05.md`.

**Where things are, as of 2026-08-05 (end of day, ninth working session in
this file's numbering):**

- **The graph is unchanged.** Still 137 reports, 215 dependencies, 154 dropped
  notes. This session extracted; it did not slice or import.
- **SEC03 is opened for the first time in the current file-based workflow.**
  Master summary (all 20 Titles) plus Title 01 in full (all four chapters:
  01 01, 01 02, 01 03, 01 04, 01 20) are now in a proper Part A record.
  **~1,000 of SEC03's 1,114 pages remain untouched** — Titles 02–30
  expenditure, all revenue Titles, and the Annexes.
- **`EU/EU Meta jsons.docx` is a real asset that had gone unread for a long
  time.** It predates the current filesystem-access workflow (references
  "Research.3.md," a struck governing brief per `G.15.md`'s own correction)
  and needs `python-docx` to open — worth remembering, since it is easy to
  assume a `.docx` in this folder is inert archive material the way
  `Research.2.md.docx` and `Research.eu.docx` are treated once converted.
  This one was never converted and still holds live, unported extraction
  work.
- `TODO LISTS/rolling-todo.md` — updated this session with a Merged entry.

**Retrieval, unchanged from G.26–G.28:**

- **`eur-lex.europa.eu` is anti-bot gated** to every client here. A human
  browser gets through.
- **`destatis.de` is fully reachable**, and so is `commission.europa.eu`
  (rate-limited).

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
**`python-docx` is required to read `.docx` files in this environment and was
not pre-installed** — `python3 -m pip install python-docx` (note: two Python
installs exist on this machine, `python3` resolves to a 3.12 one distinct
from the one `pip` defaults to; install against whichever interpreter your
`python3`/`pypdf` calls actually use, or the import will silently target the
wrong site-packages).

## Session conditions — read this first

**One extraction session, filesystem access, no browser used.** Read
`SEC03.pdf` pages 70–116 in full (the expenditure master summary plus all of
Title 01) via `pypdf`, cross-checked against `EU/EU Meta jsons.docx`'s
existing 2026-08-03 batch for the portion that batch already covered. No PDF
was fetched from the network.

What was read first-hand: `Research.1.md` in full (re-read); `SEC03.pdf`
printed pp. 72–116 (the master summary table, and Chapters 01 02's remainder
from p. 91 onward, 01 03, 01 04, 01 20 in full); `EU/EU Meta jsons.docx`,
searched and read in the relevant sections (not read end to end — it is
1.26M characters).

What was **not** done:

- **Chapter 01 01 was not independently re-verified from the PDF.** Ported
  from the chat-era batch, spot-checked for structural consistency against
  everything read first-hand this session, but not re-read line by line —
  flagged explicitly in record S03-02.
- **No new PDF was fetched from the network.** The hash-verification queue
  (SEC01/02/06/07/08/09/10, now also SEC03) is unchanged.
- **No slice was written to `EU/slices/`.** Same reasoning as every session
  since G.26 — the records found are legal-basis citations and figures-table
  quotes, none proposing a node or edge (Joint Undertaking founding
  regulations are statutes, not the kind of recurrently-published document
  `Research.1.md` §4 defines as a node).
- **The apparent duplication between this branch's fresh SEC09/SEC10 work
  (`G.28.md`) and the pre-existing SEC09/SEC10 batches inside `EU Meta
  jsons.docx` was not investigated or reconciled.** Both exist now; whether
  they agree, conflict, or one supersedes the other is unknown.
- **`Research.2.md` and `Research.EU.md` were not re-opened.** Last
  first-hand read: G.24, six sessions back.
- **The blob was not sliced.** Still 960 staged records, unworked.
- **The D-item merge was not performed**, ninth session running.
- **Titles 02–30 of SEC03's expenditure side, and all of its revenue side,
  remain entirely unextracted** — see priority B below.

## Headline result

**SEC03 — the Commission's own section, and by size roughly ten times the
combined length of every other section this branch has extracted — is open,
and the pattern holds exactly where it has held everywhere else.** Title 01
(Research and Innovation) spans four chapters, dozens of named legal
instruments going back to 1983, and EUR 13.8 billion in 2027 commitment
appropriations, and not one of its provisions names a Eurostat product, an
HICP figure, or any other statistical release. The ninth section now tested
this way, and the first drawn from operational/programmatic material rather
than administrative-budget material — the same absence that has held for
staff salaries and building rents also holds for research-programme funding.

**Secondarily, and arguably the more consequential finding for how this
branch's own history should be read: a substantial body of already-completed
SEC03 extraction work (and apparently complete SEC09/SEC10 extractions) was
sitting unused inside `EU/EU Meta jsons.docx`, a 12,447-paragraph archive
file from before this branch's current workflow, because nobody had opened
it with the right tool.** The file itself was listed in every session's
folder inventory since `G.15.md`, but its *contents* — genuine, well-formed
Part A material — had not been read since the chat-based sessions that
produced them. This session ported the portion relevant to Title 01
(`S03-02`); the SEC09/SEC10 material was found but not compared against this
branch's own fresh extraction of those same sections.

## Findings

### 1. The absence extends to operational/programmatic budget material, not just administrative

Every section extracted so far (SEC05, SEC06, SEC07, SEC01, SEC02, SEC08,
SEC09, SEC10) was an institution's own administrative budget — salaries,
buildings, IT, meetings. SEC03 Title 01 is the first extraction from the
Commission's *operational* spending — the money that actually funds Horizon
Europe, Euratom research, ITER and dozens of Joint Undertakings. **The same
absence holds.** Records S03-02 through S03-08. `Eurostat`, `HICP`, `consumer
price`, `indexation` and `index-linking` all return zero across the whole of
Title 01's extracted text. **What this rests on**: string search over
printed pp. 72–116, first-hand this session (S03-01 through S03-09's own
Register section).

### 2. A large body of prior SEC03 extraction work existed, unused, in an unconverted archive file

`EU/EU Meta jsons.docx` carries two complete batches
(`SEC03-EXP-2026-08-03-A1`, `-A2`) covering the expenditure master summary
and Chapter 01 01 in full, dated 2026-08-03 — nine sessions before this one
in the `G.*` numbering, and predating the transition to the current
file-based Part A convention that began around `G.19.md`. **Every figure in
the master summary table was independently re-extracted from the live PDF
this session and matches the archived batch exactly**, which is real
evidence the archived material is trustworthy, not merely evidence it
exists. Record S03-02 ports Chapter 01 01's narrative content on that
strength, flagged as not independently re-verified. **What this rests on**:
direct comparison between this session's fresh `pypdf` extraction and the
docx archive's own quoted figures, both read first-hand.

### 3. A fourth non-standard MFF tag, in a different code position than the other three

`OTH` appears at five items in Chapter 01 20 (`1.0.1OTH`), alongside `PPPA`
at two others (`1.0.1PPPA`) in the same chapter. `G.21.md` catalogued
`SPEC`, `DAG` and `PPPA` as the known non-standard tags, all in the
`7.2.<section>9<TAG>` position. `OTH` sits in a structurally different
position (`1.0.1OTH`, no `9` marker) — flagged as possibly a distinct
convention rather than a fourth member of the same family, per record S03-08.
**What this rests on**: direct reading of Chapter 01 20's MFF column,
first-hand this session, compared against the tag positions already
documented for SEC01 and SEC10 in `G.27.md` and `G.28.md`.

## Secondary observations (logged, low priority)

- **The Euratom Research and Training Programme's own founding regulation
  was repealed and replaced mid-MFF period** (2021–2025 regulation replaced
  by a 2026–2027 regulation dated 23 June 2025), unlike Horizon Europe's
  single framework regulation running the whole 2021–2027 period. Not seen
  elsewhere in this branch's institutional material. Record S03-06.
- **The corpus's earliest-dated legal citation so far**: Council Decision
  84/1/Euratom, EEC of 22 December 1983, cited in Chapter 01 20's
  completion-item legal basis. Predates every other instrument seen in this
  branch by over two decades. Record S03-08.
- **An intra-document expenditure-to-revenue cross-reference structure**
  (every assigned-revenue line names the exact revenue article or item that
  feeds it, e.g. `6 6 0 0` for EFTA-EEA contributions) is confirmed across
  every item in Chapters 01 02–01 20, not just Chapter 01 01 as the original
  batch found. Whether intra-document line references count as edges is
  flagged as an open scoping question, not resolved. Record S03-09.
- **Two unreconciled figures inherited from the chat-era batch, both
  re-confirmed rather than newly found**: the Title 30 "Reserves" row vs. the
  "Of which Reserves" summary row (a EUR 1.8bn gap), and SEC03's own total
  vs. SEC(2026) 250's published all-sections total. Both quoted, neither
  adjudicated, per record S03-01.

## Corrections to prior sessions

**None.** No finding from G.15–G.28 was checked against new evidence and
found wrong this session. This session's finding 2 (the unused archive
material) is a process observation about how the branch's own history should
be read, not a correction to any specific prior finding — nothing in
`EU Meta jsons.docx`'s SEC03 batches contradicts anything already recorded in
the `G.*` chain; it was simply unread.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10). Closed** since `G.28.md`. No
further work here unless a session wants to pursue the hash-verification
queue (see cheap checks).

**B — SEC03 meta backlog. Now underway, not closed.** Per `G.15.md` items
6–12, edited to reflect this session's progress:

1. ~~Chapter 01 02 article/item detail~~ — **DONE this session** (was
   G.15's item 6, "Chapter 01 02 article/item detail from printed p. 91 —
   nine Joint Undertakings" — closed, twelve found, not nine; see S03-04).
2. ~~Chapters 01 03, 01 04, 01 20~~ — **DONE this session** (was item 7).
3. **Titles 02–16, expenditure.** Still fully open (item 8). **Title 08
   (Agriculture and Maritime Policy, EUR 54.9bn CA, the largest Title in
   the whole document) and Title 05 (Regional Development and Cohesion,
   EUR 44.0bn CA, the second largest) are the two highest-value remaining
   targets by size**, unchanged assessment from `G.15.md`.
4. **Titles 20, 21, 30.** Still fully open (item 9). Titles 20/21 are the
   Commission's own administrative expenditure and European Schools/Pensions
   — likely to follow the same shape as SEC01–SEC10's institutional
   material rather than Title 01's programmatic shape.
5. **Annex "Staff" to Section III.** Still open (item 10), named at five
   locations in the chat-era batch, not yet located or scoped.
6. **Annexed Offices** (Publications Office, EPSO, PMO, OIB and others).
   Still open (item 11). SEC07's S07-041 names EPSO's two founding decisions
   in full, with OJ/ELI — a usable entry point per `G.15.md`'s own note.
7. **Revenue Titles 3, 4, 6.** Still open (item 12). Title 5 (code 5 0 4 0,
   "Proceeds from EURI") is implicated by six Chapter 01 01 expenditure
   items per the original note — not checked this session.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged in ranking.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not
started, ninth session running.** Both last read first-hand at G.24 — six
sessions removed. **New item for this section: reconcile `EU Meta
jsons.docx`'s SEC09/SEC10 batches against this branch's fresh SEC09/SEC10
extraction in `SEC08-SEC09-SEC10_PartA_2026-08-05.md`.** Not urgent — both
exist and neither is known to be wrong — but worth doing before either is
treated as the sole record.

**E — Everything the blob split created.** Unchanged.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since G.28: none new** — this was an extraction session, and finding
3 (the `OTH` tag) partially discharges a standing cheap check rather than
being one itself.

Remaining, by value per unit effort:

1. **Fetch and hash any of SEC01/02/03/06/07/08/09/10 against local copies.**
   Eight candidates now queued behind SEC05. Needs a browser.
2. **Split `list-main-stats-2025-na` into nine records.** Mechanical.
3. **Re-measure E4 keying on quote, not id**, and reconcile.
4. **Delete `scripts/eu-schema-smoke.ts`** — its stated condition has lapsed.
5. **Retrieve Annex XI Article 1(4).** EUR-Lex is gated; a parliament
   register is how `COM(2025) 736` was obtained.
6. **Retrieve the Eurostat Report of 31 October** and establish its URL.
7. **Read EBS Regulation 2019/2152** as a third test of the asymmetry.
8. **Pull the `[NA-Pen] / Table 29` thread**.
9. **Check whether SEC09's total-level sign flip has a stated explanation
   elsewhere** (`G.28.md` finding 1).
10. **Search for a titled GNI deflator publication**, following SEC01's
    S01-02 lead.
11. **NEW, cheap: reconcile `EU Meta jsons.docx`'s SEC09/SEC10 batches
    against `SEC08-SEC09-SEC10_PartA_2026-08-05.md`.** One diff pass, no new
    research — see priority D above.
12. **Check whether sc-47–sc-50 exist anywhere**; **characterise the 155
    non-`S` loose records**; **match the 8 record-less batch headers**;
    **enumerate the `9`-series tags** beyond `SPEC`/`DAG`/`PPPA` — partially
    discharged by S03-08's `OTH` finding, but that tag's different code
    position means the original question is not fully closed.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.29.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9
   id list.
3. **`EU/SEC03_Title01_PartA_2026-08-05.md`** — this session's SEC03
   extraction, the branch's first.
4. **`EU/EU Meta jsons.docx`** — needs `python-docx` to read. Contains
   unported SEC03 batches beyond Title 01 (search for "Titles 02" and
   similar) — **check whether it covers more of SEC03 than this session
   used** before re-extracting from the raw PDF; some of Titles 02–16 may
   already be sitting there unread, the same way Title 01 was.
5. **`src/data/research/de-destatis-national-accounts.json`** — the pattern
   that works for import, unchanged this session.
6. **The next target: SEC03 Title 08 or Title 05** (the two largest
   remaining), or a browser for the hash-verification queue.
7. **A browser**, for cheap checks 1, 5, 6, 9 and the hash-verification
   queue.

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
