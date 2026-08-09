# G.6.md — New Zealand/SAO galaxy hand-off

Date: 2026-08-08
Governing briefs: `Research.1.md` — read in relevant part this turn (§2
git prohibition, §3 extract-don't-adjudicate, §4 sweep scoping); read in
full earlier in this same session, before a context compaction, along with
`src/lib/types.ts` and `src/data/index.ts`. `EU/G.56.md` read in full this
turn as the current hand-off template (the EU spec is adopted wholesale for
this branch, `Research.1.md`, decided 2026-08-07). `NZ/G.5.json` (sidecar)
read this turn for continuity; `NZ/G.5.md` itself not re-read in full.
`planning/OPEN-THREADS_2026-08-08.md` read in full this turn — thread 2.1
carries the fuller day-by-day narrative this file summarises into NZ-branch
form.
Predecessor: `G.5.md` (2026-08-07).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. Ask
   Thomas if you need git state.
2. **Read `planning/OPEN-THREADS_2026-08-08.md` first**, thread 2.1. This
   file is one branch's slice of three sweep sessions run today (EU:
   `EU/G.57.md`; AU: `AU/G.4.md`; plus a Canada/federal pair —
   `equalization-named-products.json` / `equalization-payroll-base.json` —
   that has **no branch folder** and is tracked only in
   `OPEN-THREADS`/`MISSION-TODO-2.md`. Whether that should change is now
   `Open-Questions-2026-08-08-sweep.docx` question 4).
3. **`G.5.md` and earlier are still the substantive predecessors for
   everything else in this branch** — the Public Finance Act 1989 mint,
   the Auckland exemplar-council pass, the push-access problem (still
   unresolved as of `G.5.md`; not re-checked this session). This file adds
   two isolated nodes and touches nothing else.
4. **This branch's priority list is plain-numbered, not lettered** — the
   EU's A–G convention is EU's own history and does not carry here
   (`Research.1.md`, decided 2026-08-07).
5. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`,
   never sweep Thomas's personal files. Standing rule, unchanged.

## Session conditions — read this first

**A `_dropped`-sweep session, corpus-wide thread 2.1, NZ's file paired with
AU's in the suggested execution order**
(`planning/dropped-sweep-scoping_2026-08-08.md`). One file touched:
`nz-government-finance.json` — two new isolated nodes, two `_dropped`
entries updated in place, one genuine node-mint decision surfaced but not
acted on. **The primary-source verification behind the two mints** (both
OAG long-term-plan observations editions confirmed live at their current
domain, Watercare's own "Reports and publications" listing) **was done
earlier in this same session, before a context compaction. This file itself
was written in the turn after that compaction**, from the already-edited
and already-committed JSON rather than from a fresh primary-source pass —
quotes below are reproduced from what is now on disk, not re-fetched this
turn.

**Not read this turn**: the rest of `nz-government-finance.json`'s 26
reports and 31 dependencies, `REPORTS.md`, `BACKLOG.md`, any other NZ file,
`research-input/Grok-Research-Brief-XI.md`. `AU/G.4.md`'s companion session
covered `au-government-finance.json` separately; see that file, not this
one, for AU content.

## Headline result

**Two mints closed the access half of a long-standing lead, but both stay
isolated — the harder half (the target, not the source, still not being a
node) is unchanged.** `G.5.md` priority 7 named the Auditor-General's
long-term-plan observations report and Watercare's own annual report as
open leads; this session confirmed both are real, titled, recurring
publications and minted them. Neither collects an edge yet, because the
document that would name them as an *input* — councils' long-term plans in
one case, Auckland Council's own annual report possibly consolidating
Watercare's figures in the other — still isn't a node. **A third item in the
same cluster, the Local Government Act 2002 itself, was deliberately not
minted** despite sitting directly under both new nodes' natural home; the
file's own text already frames it as the same shape of decision the Public
Finance Act 1989 was before `G.5.md` minted that one, and it is now
surfaced for Thomas rather than decided.

## Findings

### 1. The OAG's long-term-plan observations report is minted, and the access block from an earlier session is resolved as a side effect

*What this rests on*: `ao.parliament.nz`, both the 2025 and 2022 editions,
confirmed live earlier in this session before compaction; reproduced here
from the committed JSON.

Minted `nz-oag-ltp-observations` ("Auditor-General's Observations on
Councils' Long-Term Plans", releases_per_year 0.33 — once per statutory
three-year LTP cycle). Title varies release to release: "Matters arising
from our audits of the 2021-31 long-term plans" (2022) versus "Observations
from our audits of councils' 2024-34 long-term plans" (2025), the latter
stating "This report describes the audit results and trends from the 58
long-term plans that councils adopted between June and October 2024." Both
independently fetched and live. **A prior session's HTTP 403 against
`oag.parliament.nz` is now explained rather than just retried past**:
`oag.parliament.nz` redirects (302) to `ao.parliament.nz`, and the earlier
block was against the retired domain, not a live restriction. **Isolated**:
the `_dropped` entry naming this lead is updated in place ("REPORT MINTED
2026-08-08, edge still not buildable") rather than closed, because the
edge's target — councils' long-term plans as a node class — still doesn't
exist. Original entry text preserved below the correction.

### 2. Watercare's annual report is minted; the LGACA 2009 edge that motivated it turned out not to be quotable as originally framed

*What this rests on*: `watercare.co.nz`'s own "Reports and publications"
page, confirmed earlier this session, listing titled editions 2010 through
2025.

Minted `nz-watercare-annual-report` ("Watercare Annual Report",
releases_per_year 1, jurisdiction_level `municipal`, region "Auckland, New
Zealand"). The originating lead (`G.5.md` Finding 2 / priority 6) framed
this as `nz-lgaca-2009 -> Watercare's annual report`, on the strength of
LGACA 2009 ss 4(1), 56A and 57A establishing Watercare as an entity and
setting the terms of its 2025 financial separation from Auckland Council.
**On a closer read this session, none of that text names Watercare's
*annual report* as an input** — it establishes the entity and the
financial relationship, not a citation to a document. Left unwired rather
than forced. The `_dropped` entry records the more likely real edge instead:
Auckland Council's own annual report (already a node) possibly consolidating
or citing Watercare's figures by name in Volume 3 — **not checked this
session**, and the natural next step if this lead is picked up again.

### 3. The Local Government Act 2002 mint decision is surfaced, not made

*What this rests on*: the `_dropped` entry `nz-lgaca-2009.json` already
carried, quoting LGACA 2009 s 3(b) and noting 128 occurrences of "Local
Government Act 2002" inside LGACA 2009 alone. Not independently re-verified
this session; reproduced from the file as edited by `G.5.md`.

LGA 2002 is cited constantly across this slice — s 111, s 106(2C), s 98,
Schedule 10 — and has never itself been a node; every existing edge cites a
specific section as the basis for some *other* node's dependency. The
file's own text draws the parallel explicitly: this is the same shape of
decision the Public Finance Act 1989 was before `G.5.md` minted it with no
cap on same-session edges, except LGA 2002 "would sit under a very large
fraction of the New Zealand slice at once" — every territorial-authority
node in this corpus, at minimum. **Not minted.** Per `Research.1.md` §3
(extract, don't adjudicate), this is reported as a live decision point, not
resolved by inference from the PFA 1989 precedent. Now
`Open-Questions-2026-08-08-sweep.docx` question 3.

## Secondary observations (logged, low priority)

- Corpus-count estimate after this session's three sweep pairs (this file,
  `EU/G.57.md`, `AU/G.4.md`, plus the earlier Canada/federal pair): **380
  reports / 445 dependencies / 3 relations**, against `EU/G.56.md`'s
  validator-confirmed 372/436/3. Agent arithmetic, **not a validator run**
  — needs confirming on Windows before it's trusted downstream.
- `nz-government-finance.json`'s `_dropped` array is now, per `G.5.md`'s own
  prediction, "the richest part of this slice" — worth reading in full
  before picking this file up again rather than skimming for keywords.

## Corrections to prior sessions

**None.** Nothing in `G.5.md` or earlier was found wrong this session — the
two leads acted on here were exactly as `G.5.md` framed them, and the one
place this session's reading differed (the LGACA-2009-to-Watercare edge not
being quotable as originally proposed) is a refinement of an *open* lead,
not a correction of a claimed fact.

## Thomas's stated priority for the remaining work

Carried from `G.5.md`, updated for what moved this session:

1. ~~A Stats NZ national-accounts pass~~ — done before `G.5.md`.
2. ~~A second exemplar council~~ — done, `G.5.md` (Auckland).
3. `Grok-Research-Brief-XI.md` item 25c, Chile's SII avalúo fiscal —
   unchanged, still not attempted by this branch.
4. Item 27, the nineteen unscouted jurisdictions, Crown Dependencies first
   — unchanged, still not attempted.
5. ~~Decide the Public Finance Act 1989~~ — done, `G.5.md`.
6. **Mint Watercare Services Limited as a node** — **done this session**,
   see Finding 2. Edge to LGACA 2009 not wired; likely real edge is from
   `nz-auckland-annual-report`, not checked.
7. **Decide the Local Government Act 2002** — **still open, surfaced for
   Thomas this session**, see Finding 3 and
   `Open-Questions-2026-08-08-sweep.docx` question 3.
8. **New, this session**: the Auditor-General's long-term-plan observations
   report is minted (Finding 1) but the harder half of that lead —
   councils' long-term plans as a node class — is still open. Whoever picks
   this up needs to decide whether LTPs are worth their own node class or
   whether the observations report should just stay isolated.

## Cheap checks still outstanding

Carried from `G.5.md`, unchanged except where noted:

1. NZSIOC → `anzsic` mint, one page. Still outstanding.
2. Re-fetch the two inherited quotes flagged in `G.3.md` (Stats NZ
   DataInfo+ GFSM block, PBE IPSAS 1 "Comparison with IPSAS 1" appendix).
   Not attempted.
3. Puerto Rico: Census SLGF mint, Planning Board forecasts, June-2026
   revised fiscal plan. Out of branch scope proper, tracked in
   `MISSION-TODO-2.md` P2 item 13. Not attempted.
4. NZ s 106(2C) current-consolidation **content** check (existence
   confirmed, content still unread). Not attempted.
5. **Push access, or a plan for getting it** — `G.5.md` flagged this as the
   single most consequential unresolved item in that file. Not re-checked
   this session; carried forward unchanged as a standing infrastructure
   question, separate from the git-commands prohibition (`Research.1.md`
   §2), which is about diagnostic commands, not about push access itself.

## What to pass at the start of next thread

1. **`planning/OPEN-THREADS_2026-08-08.md`** — read first, thread 2.1 for
   the full day's sweep narrative across all three branch pairs plus the
   Canada/federal pair this file doesn't cover.
2. **This file**, then `G.5.md`, `G.4.md` and earlier for the rest of the
   branch's history.
3. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (sweep
   scoping).
4. **`src/data/research/nz-government-finance.json`** — the `_dropped`
   array is now the richest part of this slice; read it in full, not by
   keyword.
5. **`Open-Questions-2026-08-08-sweep.docx`** — four decisions waiting on
   Thomas; question 3 (LGA 2002) is this branch's.

---

# How to write the next hand-off

**Added 2026-08-04 in `EU/`; adopted wholesale for this branch 2026-08-07
(Thomas, via the decisions doc) — copy this whole section verbatim into
every successor**, so the chain never depends on one file surviving. It is
the spec, not an example.

When Thomas says *"write the next handoff"*, *"write the next G file"*, *"wrap
this thread up"* or anything close, this is what he is asking for. Do not ask
which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the highest-numbered
  `G.*` file in `NZ/`. **Take the highest number, not the count.**
- **Write it as `.md`**, plain text, in `NZ/`.
- **Then write the JSON sidecar.** Every hand-off has a machine-readable twin at
  `NZ/G.<n>.json`. Do not hand-write it — run:

  ```
  python3 scripts/handoff-to-json.py NZ/G.<n>.md
  ```

  The Markdown stays the document of record; the JSON is a structured index of
  it (date, predecessor, findings, corrections, priorities, cheap checks, and
  which required sections are missing). `python3 scripts/handoff-to-json.py`
  with no arguments rebuilds every sidecar across all three branches;
  `--check` reports which are stale without writing. **If you are ever unsure
  whether the sidecar is current, just re-run it — it is idempotent.**
- **Never edit a predecessor.** Corrections to earlier sessions go in this
  file's *Corrections* section, where they are dated and attributable. The one
  exception is this spec block, which is copied forward unchanged.
- **This branch's priority lists are plain-numbered**, not the EU's lettered
  A–G convention — that lettering is EU's own history and does not carry
  (`Research.1.md`, decided 2026-08-07). The sidecar script's priority parser
  falls back to numbered/bullet lists automatically when no lettered blocks
  are found.

## Required structure, in this order

```
# G.<n>.md — New Zealand/SAO galaxy hand-off

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
agent must be able to read this section alone and know what to read next.

**Session conditions** — what constrained the work: session type, what tooling
was available, what did not arrive, what was left untouched by instruction.
**State plainly which sources you read in full**, because everything
downstream inherits that limit.

**Headline result** — the single most important thing established, and how
strongly. If the session established nothing, say that; a session that only
refutes is still a result.

**Findings** — numbered `###` subsections, one per finding. Each states what was
checked, what was found, and **what it rests on**. Quote verbatim;
`Research.1.md` §2/§3 apply here exactly as they do to research output.

**Secondary observations** — real but low-priority. Keep them short.

**Corrections to prior sessions** — numbered, each naming the file and the claim
being corrected, and whether it is *confirmed*, *refuted*, *overstated* or
*resolved*. A session that finds a predecessor wrong and does not record it
here has actively damaged the corpus.

**Thomas's stated priority for the remaining work** — the numbered list carried
forward from the predecessor, edited to reflect what moved. Mark items **no
longer needed** explicitly and say why, rather than deleting them silently.

**Cheap checks still outstanding** — ordered by value per unit effort, each one
a single lookup.

**What to pass at the start of next thread** — the packing list. If the next
agent has filesystem access, say so and keep the list anyway; it doubles as an
index of what matters.

## Conventions that make these files worth reading

- **Say what you did not do.** Every one of these files carries an explicit
  not-read / not-verified statement.
- **Distinguish inference from documented fact,** and say which narrow respect
  is still inference.
- **A refuted hypothesis is a good outcome.** Report both sides of a conflict
  and pick neither; `Research.1.md` §3 is explicit that adjudication is not
  the research role.
- **Do not pad.** These files are dense because every line earns its place.
