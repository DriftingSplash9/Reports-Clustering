# G.57.md — EU galaxy hand-off

Date: 2026-08-08
Governing briefs: `Research.1.md` — read in relevant part this turn (§2 git
prohibition, §3 extract-don't-adjudicate, §4 sweep scoping, the hand-off
spec at the end of `G.56.md`); read in full earlier in this same session,
before a context compaction, along with `src/lib/types.ts` and
`src/data/index.ts`. `G.56.md` read in full this turn as the hand-off
template. `planning/OPEN-THREADS_2026-08-08.md` read in full this turn —
thread 2.1 carries the fuller day-by-day narrative this file summarises
into EU-branch form.
Predecessor: `G.56.md` (2026-08-08, earlier the same day).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. See `G.54.md` / `Research.1.md` §2. If you need
   to know what is committed or pushed, ask Thomas.
2. **Read `planning/OPEN-THREADS_2026-08-08.md` first**, specifically
   thread 2.1. It is the corpus-wide `_dropped` sweep, and this file is one
   branch's slice of three sweep sessions run today. The other two touched
   `nz-government-finance.json` (see `NZ/G.6.md`) and
   `au-government-finance.json` (see `AU/G.4.md`), plus a Canada/federal
   pair — `equalization-named-products.json` and
   `equalization-payroll-base.json` — that has **no branch folder of its
   own** and is tracked only in `OPEN-THREADS`/`MISSION-TODO-2.md`. Whether
   that should change is now `Open-Questions-2026-08-08-sweep.docx`
   question 4.
3. **`G.56.md` is still the substantive predecessor for everything else in
   this branch** — the id registry, the ESS quality slice, the Catalogue of
   ESS standards scoping, housecleaning status. This file adds nothing to
   any of that; it covers exactly two files touched today.
4. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`,
   never sweep Thomas's personal files. Unchanged from `G.56.md`.

## Session conditions — read this first

**A `_dropped`-sweep session, corpus-wide thread 2.1, EU's second file pair
in the suggested execution order** (`planning/dropped-sweep-scoping_2026-08-08.md`).
Two files touched: `esa-2010.json` (one stale note fixed, nothing minted)
and `edp-inventory-regulation-479-2009.json` (two new nodes, still
unwired). Both edits, and the primary-source verification behind them
(Destatis's own "Statistische Berichte" listing, live press-release dating,
the Finanzagentur's English "Outstanding Volumes" page, Bundesbank's
banking-statistics page), were done earlier in this same session, before a
context compaction. **This file itself was written in the turn after that
compaction**, from the already-edited and already-committed JSON files
rather than from a fresh primary-source pass — the quotes below are
reproduced from what is now on disk in `src/data/research/`, not re-fetched
this turn. Flagged plainly because it is a different evidentiary posture
than a same-turn extraction, even though the extraction itself was
first-hand.

**Not read this turn**: `REPORTS.md`, `BACKLOG.md`, any `EU/` file other
than `G.56.md`, the staging blob, the prose-verification results file, any
NZ or AU research JSON in full (only the two nodes/edges relevant to their
own hand-offs, via targeted `grep`/`python3 -c` extraction against the
staged copies).

## Headline result

**The cross-file staleness pattern `G.56.md` never named — a `_dropped`
entry going stale because a *sibling* file resolved the same fact under a
different id — showed up a third time, this time inside a single branch
rather than across the Canada/federal pair.** `esa-2010.json` carried a
`deferred` entry for "German quarterly national accounts release →
esa-2010" that `de-destatis-national-accounts.json` had already resolved,
same day, 2026-08-05, as a live `methodology_depends_on` edge under the id
`de-destatis-national-accounts` — `esa-2010.json`'s own `_dropped` block
just never said so. Corrected here, not by luck: the validator's stale-note
check can't catch this class, because it only fires when a note's endpoints
already resolve to real ids, and this entry's `target` was `esa-2010`
(real) but its `source` was `null` (by design, since the release itself had
no id yet in this file's frame of reference). Set against that: the EDP
inventory's "five named German statistics" lead, open since it was first
logged, closed two of five with clean mints and reported concrete findings
on the other three — not a rediscovery, real progress on a
long-standing item.

## Findings

### 1. `esa-2010.json`'s German-QNA-release entry was stale, not deferred

The entry's `reason` was `deferred`, its `source` was `null`. The document
it was chasing — "First quarterly results of GDP without particular
breakdown are published as press release 30 days after the end of a
reporting quarter... the more detailed figures... around 55 days" — is the
same t+30/t+55 timetable `de-destatis-national-accounts.json` already used
to build `de-destatis-national-accounts` (releases_per_year 4) and wire it
to `esa-2010` with a `methodology_depends_on` edge, on 2026-08-05, the same
date this entry itself was written. **Changed `reason` from `deferred` to
`note`**, prefixed "RESOLVED 2026-08-05, same day as this entry, by a
sibling file — caught stale 2026-08-08", original text preserved below the
correction per the never-edit-a-predecessor convention (this is a
same-branch file, not a predecessor hand-off, but the retain-don't-delete
habit applies to `_dropped` entries generally). The two adjacent GNI/QNA
methods-inventory entries were left alone except for one-line "SUPERSEDED
AS A ROUTE" pointer notes explaining that the release-level edge now
exists even though the inventory document itself still doesn't — **the
substantive conflict in the GNI inventory entry (colophon says
"Periodicity: non-recurring"; the same document names a 2021 predecessor
edition, four years before the 2025 one in hand) is untouched and still
open.** That conflict is now `Open-Questions-2026-08-08-sweep.docx`
question 2.

### 2. Two of the EDP inventory's five named German statistics are now nodes; the other three resolved to three different kinds of "no"

*What this rests on*: Destatis's own "Statistische Berichte" theme listing
(annual and quarterly public-sector debt series, both titled and
catalogued); a chain of dated quarterly press releases confirming the
roughly t+3-to-4-month lag against the inventory's stated "about two and a
half months"; the Finanzagentur's own English "Outstanding Volumes" page;
Bundesbank's English banking-statistics page for the securities-holdings
series. All read earlier in this session, before compaction; reproduced
here from the committed JSON.

Minted `de-destatis-debt-annual` ("Debt of the Public Sector Overall
Budget", releases_per_year 1) and `de-destatis-debt-quarterly` ("Quarterly
Debt of the Public Sector Overall Budget", releases_per_year 4). Both
**isolated for now, `fed-h15`-style** — the edge either belongs on runs
from the German EDP inventory *document itself*, and that document still
isn't a node (blocked on the same cadence question as the GNI/QNA
inventories, unchanged). A new `deferred` entry records this explicitly so
the two new nodes aren't mistaken for finished work.

The other three, checked and **not** minted, for three different reasons —
worth keeping distinct because they read alike at a glance:

- **Statistic of Federal Government Debt (SFGD)** — a genuine three-way
  discrepancy, not a missing lookup. The inventory says "at least on a
  quarterly basis with a time-lag of about one month"; the Finanzagentur's
  own English page says federal debt statistics "are published in the
  Bundesanzeiger in German language semi-annually"; there is also a
  separately-updated online dataset ("Schulden des Bundes") at monthly
  granularity with no stated publication cadence. Three sources, three
  rhythms, reported per §3 and not adjudicated.
- **Securities holdings statistics** (formerly *Depotstatistik*) —
  reclassified, not just unminted. Bundesbank's own English page files it
  under "reporting-systems/banking-statistics" and describes bank-to-
  Bundesbank submission deadlines (6th/8th working day after month-end) —
  shape of a regulatory collection system feeding Bundesbank's internal
  statistics, not a public release with its own schedule. Not filed as a
  terminus outright; the distinction between "the Department S
  publication" and "the reporting system that feeds it" wasn't run to
  ground.
- **Report on Loan Notes by Creditors of Central Government** — searched
  under German and English phrasing, no public Finanzagentur page found.
  Plain `NOT FOUND`, plausibly an internal return rather than a released
  publication (inference, not confirmed).

## Secondary observations (logged, low priority)

- Corpus-count estimate after this session's three sweep pairs (this file,
  `NZ/G.6.md`, `AU/G.4.md`, plus the earlier Canada/federal pair): **380
  reports / 445 dependencies / 3 relations**, against `G.56.md`'s validator-
  confirmed 372/436/3. This is an agent's arithmetic on the edited files,
  **not a validator run** — Thomas still needs to run `npm run validate` on
  Windows before this number is trusted for anything downstream.
- The EDP inventory's own text notes the relationship between SFGD and the
  Loan Notes report as "is consistent with SFGD" — §5a agreement language,
  which would not support an edge between them even once both existed as
  nodes. Worth remembering if a future session is tempted to wire them to
  each other once the Loan Notes report is found.

## Corrections to prior sessions

1. **`esa-2010.json`'s own `_dropped` entry for the German QNA release —
   STALE, now corrected.** See Finding 1. Not a predecessor hand-off
   correction (no `G.<n>.md` claimed this), but logged here per the
   project's general staleness-catching habit, and because it's the same
   failure mode `G.56.md` documented for other files.

## Thomas's stated priority for the remaining work

Unchanged from `G.56.md`'s lettered blocks A–G; this session's work is
entirely inside **B — the corpus-wide `_dropped` sweep**, specifically this
branch's second pair in the suggested order
(`planning/dropped-sweep-scoping_2026-08-08.md`). Next in that order after
this pair: `nz-government-finance.json` + `au-government-finance.json`
(done, see `NZ/G.6.md` / `AU/G.4.md`), then the rest of Tier 1–2, then
`grok-h1-international-reports.json`'s 57 unexamined `note` entries, then
Tier 3/the long tail. **Blocks A, C, D, E, F, G untouched this session** —
see `G.56.md` for their current state.

## Cheap checks still outstanding

Carried from `G.56.md`, unchanged by this session except where noted:

1. Inbound edges for the four isolated ECB series `G.53.md` minted.
2. A present-tense source for `ess-sims -> eu-reg-223-2009`.
3. One EUR-Lex fetch to settle a correction — **closed since `G.56.md`**,
   per `planning/OPEN-THREADS_2026-08-08.md` 1.3: EUR-Lex works, confirmed
   by plain `curl`.
4. **New, this session**: find a citable publication page for the German
   EDP inventory document itself (Chapter/edition, dated) — the one lookup
   that would let `de-destatis-debt-annual` and `de-destatis-debt-quarterly`
   get wired to something.

## What to pass at the start of next thread

1. **`planning/OPEN-THREADS_2026-08-08.md`** — read first, thread 2.1
   specifically for the full day's sweep narrative across all three branch
   pairs plus the Canada/federal pair this file doesn't cover.
2. **This file**, then `G.56.md` for everything else in the branch.
3. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (sweep
   scoping).
4. **`src/data/research/esa-2010.json`** and
   **`edp-inventory-regulation-479-2009.json`** — both `_dropped` arrays now
   carry the 2026-08-08 findings inline, original entries preserved below
   each correction.
5. **`Open-Questions-2026-08-08-sweep.docx`** — four decisions waiting on
   Thomas, two of which touch this branch (questions 2 and 4).

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
