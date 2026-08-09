# G.4.md — Australia/SAO galaxy hand-off

Date: 2026-08-08
Governing briefs: `Research.1.md` — read in relevant part this turn (§2
git prohibition, §3 extract-don't-adjudicate, §4 sweep scoping); read in
full earlier in this same session, before a context compaction, along with
`src/lib/types.ts` and `src/data/index.ts`. `EU/G.56.md` read in full this
turn as the current hand-off template (the EU spec is adopted wholesale for
this branch, `Research.1.md`, decided 2026-08-07). `AU/G.3.json` (sidecar)
read this turn for continuity; `AU/G.3.md` itself not re-read in full.
`planning/OPEN-THREADS_2026-08-08.md` read in full this turn — thread 2.1
carries the fuller day-by-day narrative this file summarises into AU-branch
form.
Predecessor: `G.3.md` (2026-08-07).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. Ask
   Thomas if you need git state.
2. **Read `planning/OPEN-THREADS_2026-08-08.md` first**, thread 2.1. This
   file is one branch's slice of three sweep sessions run today (EU:
   `EU/G.57.md`; NZ: `NZ/G.6.md`; plus a Canada/federal pair —
   `equalization-named-products.json` / `equalization-payroll-base.json` —
   that has **no branch folder** and is tracked only in
   `OPEN-THREADS`/`MISSION-TODO-2.md`. Whether that should change is now
   `Open-Questions-2026-08-08-sweep.docx` question 4).
3. **`G.3.md` and earlier are still the substantive predecessors for
   everything else in this branch** — the Victoria state pass, the
   statutory-spine mints, the direct-extraction-over-summarising-reader
   caution (`G.3.md` caught an AI reader fabricating a citation). This file
   corrects nothing structural; it updates two `_dropped` entries and mints
   nothing.
4. **This branch's priority list is plain-numbered**, not the EU's lettered
   A–G convention (`Research.1.md`, decided 2026-08-07).
5. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`,
   never sweep Thomas's personal files. Standing rule, unchanged.

## Session conditions — read this first

**A `_dropped`-sweep session, corpus-wide thread 2.1, AU's file paired with
NZ's in the suggested execution order**
(`planning/dropped-sweep-scoping_2026-08-08.md`). One file touched:
`au-government-finance.json` — no new nodes, two `_dropped` entries
checked and updated in place, one of them catching a lead that had gone
stale in a way that would have produced a wrong node if acted on blind.
**The live verification behind both updates** (Austrade's own account of
the National Visitor Survey's retirement, a re-check of the ARIA+ landing
page) **was done earlier in this same session, before a context
compaction. This file itself was written in the turn after that
compaction**, from the already-edited and already-committed JSON rather
than from a fresh check — quotes below are reproduced from what is now on
disk, not re-verified this turn.

**Not read this turn**: the rest of `au-government-finance.json`'s 20
reports and 17 dependencies, `REPORTS.md`, `BACKLOG.md`, any other AU file.
`NZ/G.6.md`'s companion session covered `nz-government-finance.json`
separately; see that file, not this one, for NZ content.

## Headline result

**One lead in this file's `_dropped` array was stale in the dangerous
direction — not "already resolved," which is harmless, but "the thing it
describes no longer exists as described," which would have produced a
wrong node if a future session had acted on the original framing without
checking.** The entry for Tourism Research Australia's visitor-survey data
called the National Visitor Survey "mintable by a future session" as a
live, ongoing release. It was retired at the end of 2024, replaced by TRA's
Domestic Tourism Statistics (DoTS) collection. Caught this session before
it became a node, not after. Nothing else moved: no new mints, and the
second checked entry (ARIA+) stayed open with a slightly worse finding
(the specific landing page found this session is now dead too) rather than
a resolution.

## Findings

### 1. The National Visitor Survey lead was stale in a way the file's own framing didn't anticipate

*What this rests on*: Austrade's own public account of the TRA collection
change, checked earlier this session before compaction; reproduced here
from the committed JSON.

The `_dropped` entry's original text calls the appendix citation — "Tourism
Research Australia, 2018-19 Visitor Survey (for International Visitors,
Overnight Visitors and Daytrips), 4 year averages (2015-16 to 2018-19), by
Local Government Area, (unpublished data) September 2019" — a citation of a
"real recurrently-published release... mintable by a future session." That
was true when written; it stopped being true when TRA retired the National
Visitor Survey at the end of 2024. Austrade's account: TRA replaced it with
the Domestic Tourism Statistics (DoTS) collection, which "combines online
and face-to-face surveys with mobility data (aggregated, anonymised data
from mobile phones)," citing declining response to unsolicited phone calls
as the reason for the change. **Not minted.** A live-but-wrong node would
be worse than an open lead. The entry is now prefixed "CHECKED 2026-08-08
AND THE FRAMING BELOW IS NOW STALE, NOT JUST UNMINTED," with the original
text preserved below and an explicit instruction for whoever picks this up
next: mint DoTS if a citable landing page exists, and check the
International Visitor Survey's current status independently rather than
assuming it alongside the NVS the way the original entry did — **that
status was not checked this session either.**

### 2. ARIA+ stays open; the specific route found this session is dead too

*What this rests on*: a University of Adelaide housing-research page,
checked earlier this session before compaction; reproduced here.

The landing page found this session (the Hugo Centre's own housing-research
ARIA data gateway) 302-redirects to a generic Australian Centre for Housing
Research page with no ARIA+-specific content. This reinforces rather than
resolves the original question — whether ARIA+ itself, as opposed to the
ABS's own Remoteness Areas structure built on it (which does have a clean
citable home, periodically revised on its own schedule), has a stable
citable page of its own. **Not minted, not worth a third pass without a
different search angle.** Entry prefixed "CHECKED 2026-08-08, STILL OPEN,"
original text preserved below.

## Secondary observations (logged, low priority)

- Corpus-count estimate after this session's three sweep pairs (this file,
  `EU/G.57.md`, `NZ/G.6.md`, plus the earlier Canada/federal pair): **380
  reports / 445 dependencies / 3 relations**, against `EU/G.56.md`'s
  validator-confirmed 372/436/3. Agent arithmetic, **not a validator run**
  — needs confirming on Windows before it's trusted downstream. This
  branch's own file contributed zero to that delta this session (no mints).
- The NVS-retirement catch is the same shape of finding `G.3.md` logged
  for the fabricated CGC citation (Corrections 2 of that file) — a case
  for preferring live verification over trusting a document's own framing,
  even when the framing isn't malicious, just dated. Worth keeping in mind
  for every `_dropped` entry that cites a specific survey edition by year.

## Corrections to prior sessions

**None to `G.3.md` or earlier.** The stale NVS framing corrected in Finding
1 belongs to the `_dropped` entry itself, not to any prior hand-off's
claim — no `G.<n>.md` asserted the NVS was still live; the entry was
written that way originally and the world changed under it. Logged as a
data-staleness catch, not a predecessor correction.

## Thomas's stated priority for the remaining work

Carried from `G.3.md`, unchanged by this session (no items closed or
opened):

1. ~~A second Australian state~~ — done, `G.3.md` (Victoria).
2. A second Australian council — unchanged, still the four 403'd NSW
   Revenue Policy PDFs (Tamworth, Yass Valley, Federation, Wollongong);
   retry with the DOCX-swap trick or the in-browser extraction route.
3. The Victorian valuation chain — unchanged: Valuation of Land Act 1960
   (Vic) + Valuer-General Victoria's annual general valuation, to match
   NSW hop-for-hop.
4. Whether to mint an `au-federal-budget` node — Thomas's call, unchanged
   from `G.3.md`.
5. Carried from `G.1.md`/`G.2.md`: the NSW Grants Commission methodology
   manual search (not confirmed exhaustive), and the `au-abs-gfs`
   node-split question.

## Cheap checks still outstanding

Carried from `G.3.md`, updated for this session's two items:

1. Re-anchor `au-abs-seifa -> au-abs-census` to ABS's own SEIFA methodology
   page. Not attempted this session.
2. **Tourism Research Australia** — was "mint if a clean cadence exists";
   now **mint DoTS, not NVS**, per Finding 1. NVS is retired.
3. **ARIA+** — checked again this session, still open; the specific URL
   found is now dead too. See Finding 2.
4. The 2026-27 VLGGC edition (expected September 2026) — check whether the
   Vicmap road-data transition happened. Not yet due.
5. A Tasmania methodology → `au-lgfa-act-1995` edge — one targeted quote.
   Not attempted.
6. `au-abs-gfs` split — carried, not attempted.

## What to pass at the start of next thread

1. **`planning/OPEN-THREADS_2026-08-08.md`** — read first, thread 2.1 for
   the full day's sweep narrative across all three branch pairs plus the
   Canada/federal pair this file doesn't cover.
2. **This file**, then `G.3.md`, `G.2.md`, `G.1.md` in reverse order.
3. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (sweep
   scoping).
4. **`src/data/research/au-government-finance.json`** — the two entries
   Findings 1–2 touch carry the 2026-08-08 findings inline, original text
   preserved below each correction.
5. **The standing caution from `G.3.md`, still live**: prefer direct
   extraction over AI-summarising readers — this branch caught one
   fabricating a plausible citation from true parts, which no
   component-level spot-check would have caught.
6. `Open-Questions-2026-08-08-sweep.docx` has no AU-specific question this
   round, but question 4 (Canada/federal branch structure) sets a
   precedent worth knowing about if this branch ever wants its own
   sub-structure for a large sub-thread.

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
  `G.*` file in `AU/`. **Take the highest number, not the count.**
- **Write it as `.md`**, plain text, in `AU/`.
- **Then write the JSON sidecar.** Every hand-off has a machine-readable twin at
  `AU/G.<n>.json`. Do not hand-write it — run:

  ```
  python3 scripts/handoff-to-json.py AU/G.<n>.md
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
# G.<n>.md — Australia/SAO galaxy hand-off

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