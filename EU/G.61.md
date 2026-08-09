# G.61.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` read in full at the start of this overall
working session; §2 (git prohibition), §3 (extract-don't-adjudicate), §4
(node rule and sweep scoping), §6 (output format), §7 (classification-hub
counter-intuitive rule) all applied this session.
`planning/OPEN-THREADS_2026-08-08.md` and `planning/dropped-sweep-scoping_2026-08-08.md`
both read in full earlier this session. `G.60.md` is the hand-off template
followed here.
Predecessor: `G.60.md` (2026-08-09).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. Ask
   Thomas if you need git state.
2. **Read `planning/OPEN-THREADS_2026-08-08.md` first**, thread 2.1 for the
   sweep narrative, and `planning/dropped-sweep-scoping_2026-08-08.md` for
   scope. This file is the sweep's Tier-3, file #18 in that document's
   ranking (`esa2010-quality-reporting.json`). Tier-1 and Tier-2 are
   entirely closed as of this overall session (see `CA/G.2.md`'s Thomas
   priority section); Tier-3 is now in progress, worked file-by-file rather
   than as a single block.
3. **This file made no new mints.** All eight `_dropped` entries in
   `esa2010-quality-reporting.json` were re-read; seven were already
   correctly settled (one resolved 2026-08-08, before this session), and
   the eighth was advanced with a real candidate document but not minted.
4. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`,
   never sweep Thomas's personal files. Unchanged.

## Session conditions — read this first

**A `_dropped`-sweep session, corpus-wide thread 2.1, Tier-3 (file #18 by
the scoping document's ranking).** One file touched:
`esa2010-quality-reporting.json` — zero nodes minted, zero edges wired,
one entry advanced with new evidence that still fell short of the mint
bar.

**Read in full this session**: the current `esa2010-quality-reporting.json`
(before and after editing). **Not read this session**: `REPORTS.md`,
`BACKLOG.md`, `EU/ESA2010QualityReports_PartA_2026-08-07.md` (this file's
own cited Part A record), any other `EU/` research JSON.

## Headline result

**A file that was already almost entirely correct going in.** Unlike every
other file this sweep session touched, this one produced no stale
cross-file targets and no clean mints — six of eight entries were confirmed
negatives or settled scope decisions from earlier sessions, one had already
been resolved the day before this sweep even started, and the last (the
file's own self-described "best lead either slice produced") was chased
down to a real, named candidate document that ultimately didn't clear the
cadence bar this project requires.

## Findings

### 1. The Annex 4.2 national-publications lead — a real candidate found, cadence still unconfirmed

*What this rests on*: Destatis's (German Federal Statistical Office) own
website, `destatis.de/EN/Methods/Quality/QualityReports/`.

The entry's own reasoning was sound and worth restating: Commission
Implementing Regulation 2016/2304 compels all 27 Member States to supply,
annually, a 'List of national publications on the data sources used and
methodology applied' — precisely the naming every EU-level instrument in
this branch declines to do itself — so a Member State's own voluntarily-
published national quality report would be a genuine data-sources table,
per document, per country. This session found one: Destatis publishes a
'Quality Report - National Accounts'. But the document's own page states
only a single publication date ('29 October 2025'), with no reference
period or 'annual' language. The only signals suggesting recurrence are
circumstantial — the PDF's own URL carries a version parameter (`v=11`),
and one search result surfaces the same document under a different label,
'National Accounts - 10/2024 - 09/2025', suggesting a rolling reference
window. Neither is a stated cadence in the document's own text, so
**not minted**. Recorded in the entry's own `why` as the next cheap step:
open the PDF's own body text (this session read only page metadata) for an
explicit frequency statement, or check whether `v=1` through `v=10` are
still resolvable as dated prior editions — the version count itself would
settle the cadence question if the dates are recoverable.

## Secondary observations (logged, low priority)

- The other seven entries were re-read in full and found already correct:
  one `note` resolved 2026-08-08 (`eu-reg-2016-2304` minted, before this
  sweep session began), two `denied` §5a-family refusals restated and
  reconfirmed, one `no-document` confirmed-negative on publication
  (the 27 national quality reports are compelled but never required to be
  published — searched exhaustively for 'publish'/'public' across the full
  Regulation text), one `no-document` confirmed-negative on the SIMS
  citation (searched for 'SIMS', 'ESMS', 'ESQRS', 'handbook' — none found
  in the Regulation), and one `no-node-yet` (the NACE/CPA/COICOP/COFOG/NUTS
  classification gap) correctly left unbuilt per `Research.1.md` §7's own
  instruction not to build a classification hub from a list naming it
  rather than from the programmes coded to it — already logged in
  `planning/rolling-todo.md` as its own future work, not attempted here.
- This is the first sweep file this overall session where the "read the
  whole array" method produced a clean bill of health rather than a
  correction — worth recording as a data point that the method doesn't
  always find something, which is itself informative about how carefully
  this particular file was researched originally.

## Corrections to prior sessions

**None.** Every claim in this file's prior sessions (2026-08-07 original
research, 2026-08-08 `eu-reg-2016-2304` mint) was found correct on
re-reading. This session's one substantive addition (Finding 1) is new
evidence gathering that fell short of a mint, not a correction to anything
already recorded.

## Thomas's stated priority for the remaining work

Unchanged from `G.60.md`'s lettered blocks; this session's work is entirely
inside **B — the corpus-wide `_dropped` sweep**, now in Tier-3. No new
decision is waiting on Thomas from this session.

**Blocks A, C, D, E, F, G untouched this session** — see `G.56.md`–`G.60.md`
for their current state.

## Cheap checks still outstanding

Carried from `G.60.md`, plus:

1–9. All items from `G.60.md`'s list, unchanged — not attempted this
   session (out of this file's scope).
10. **New, this session**: open the Destatis National Accounts quality
    report PDF's own body text (not just its page metadata) for a stated
    update frequency, or check whether `v=1` through `v=10` of the same
    URL resolve to dated prior editions — either would settle Finding 1's
    open cadence question cheaply.

## What to pass at the start of next thread

1. **`planning/OPEN-THREADS_2026-08-08.md`** — read first, thread 2.1. Like
   this overall session's other 2026-08-09 hand-offs, this file's session
   has not yet been folded into OPEN-THREADS.
2. **This file**, then `G.60.md`, `G.59.md`, `G.58.md`, `G.57.md`, `G.56.md`
   for everything else in the branch.
3. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (node
   rule and sweep scoping), §7 (classification-hub rule).
4. **`src/data/research/esa2010-quality-reporting.json`** — the one entry
   this session touched carries its advance inline, original text preserved
   below it.
5. **`planning/dropped-sweep-scoping_2026-08-08.md`** — Tier-3's remaining
   files: `ess-quality-framework.json` (#16, note its catalogue lead is
   superseded by `EU/CatalogueOfESSStandards_scoping_2026-08-08.md`),
   `credit-and-mortgages.json` and `international-frameworks.json` (#19,
   both reviewed this same overall session and found to have no actionable
   entries — every one is a confirmed negative or settled scope decision),
   then the long tail (~39 files with fewer than 5 priority entries each).

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
