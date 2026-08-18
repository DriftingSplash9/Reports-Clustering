# G.59.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` read in full at the start of this overall
working session (before `G.58.md` was written); not re-read in full for this
file specifically, but §2 (git prohibition), §3 (extract-don't-adjudicate),
§4 (node rule and sweep scoping), §6 (output format) were all applied.
`planning/OPEN-THREADS_2026-08-08.md` and `planning/dropped-sweep-scoping_2026-08-08.md`
both read in full earlier this session, and are the source of this file's
place in the sweep order. `src/lib/types.ts` read in full earlier this
session. `G.58.md` is the hand-off template followed here.
Predecessor: `G.58.md` (2026-08-09).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. See `G.54.md` / `Research.1.md` §2. If you need
   to know what is committed or pushed, ask Thomas.
2. **Read `planning/OPEN-THREADS_2026-08-08.md` first**, specifically thread
   2.1 (the corpus-wide `_dropped` sweep) and `planning/dropped-sweep-scoping_2026-08-08.md`'s
   suggested execution order. This file is the sweep's Tier-2 item #9 —
   the file was already fully edited and committed to the device before this
   hand-off was written (a process gap this file exists to close: the JSON
   correction and the hand-off documenting it landed in two different work
   sessions). **Next in the suggested order after this file**:
   `federal-canada.json` (Tier-2 #11, done — see `notes/` / OPEN-THREADS for
   that non-branch file's status), then `manufacturing-and-classifications.json`
   (#12), `nl-municipal-finance.json` (#13, EU-branch), `statcan-ippi.json`
   (#14), `statcan-macro-accounts.json` (#15, CA-branch).
3. **`G.56.md`/`G.57.md`/`G.58.md` are still the substantive predecessors for
   everything else in this branch** — the id registry, the ESS quality
   slice, housecleaning status. This file covers exactly one file:
   `eurostat-edp-gfs-ecb-statistics.json`.
4. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`,
   never sweep Thomas's personal files. Unchanged.

## Session conditions — read this first

**A `_dropped`-sweep session, corpus-wide thread 2.1, EU's fourth file in the
suggested execution order (Tier-2 item #9)**
(`planning/dropped-sweep-scoping_2026-08-08.md`). One file touched:
`eurostat-edp-gfs-ecb-statistics.json` — no new nodes minted, no new edges
wired; all nine `_dropped` entries were already correctly resolved as of
2026-08-08 except two, both of which were advanced this session without
becoming mintable.

**Read in full this session**: the current `eurostat-edp-gfs-ecb-statistics.json`
(before and after editing). **Not read this session**: `REPORTS.md`,
`BACKLOG.md`, any other `EU/` research JSON, `EU/ECB-Staging-Batches_PartA_2026-08-05.md`
(the file this slice's own `_note` cites as the full record — worth reading
before touching the MIP-scoreboard lead again, per Cheap check 1 below).

**Primary-source retrieval this session was done via `WebFetch` against a
live EUR-Lex mirror hosted by Narodowy Bank Polski (nbp.pl)**, not
eur-lex.europa.eu directly — that page did not return full text to this
session's fetch tool, a different failure mode than `G.57.md`'s note that
EUR-Lex is "now reliable via plain curl" (this was a `WebFetch` call, not a
raw `curl`). Flagged because the mirror is a secondary reproduction of a
primary legal instrument, not the instrument's own canonical host, even
though its text is authoritative EU law.

**Process note, not a research finding**: this session made one drafting
error correcting the JSON — an `Edit` call's `old_string` did not include a
trailing `},` that appeared immediately after the matched text, and the
`new_string` added its own, producing a duplicated `},\n    },\n    {`
sequence that broke JSON parsing. Caught immediately by validating with
`python3 -c "import json; json.load(...)"` after every edit (now standing
practice, not just for this file), fixed with a second corrective `Edit`
against the exact surrounding lines, and re-validated clean. No content was
lost; noted here because the failure mode is specific to editing near
array-of-objects boundaries in this schema and is worth watching for in
every subsequent sweep file.

## Headline result

**Two of this file's own already-partially-resolved leads were advanced
with new primary-source detail, and both turned up a sharper reason for
staying unwired rather than clearing the bar — a different shape of result
than `G.56.md`/`G.57.md`/`G.58.md`'s stale-cross-file-target catches, but
the same discipline: closer reading narrowed the finding without forcing an
edge.** The MFI-balance-sheet-items citation was re-verified directly
against the governing Guideline (via a mirror, since EUR-Lex itself did not
return full text) and checks out word-for-word — but the cited passage
describes "monthly and quarterly" Eurosystem financial information, which
matches neither of this file's two candidate targets (a weekly statement
and an annual balance sheet), so wiring either would misstate which
publication is meant. The MIP-scoreboard/Alert Mechanism Report lead's
cadence objection was fully cleared — the European Commission's own AMR
page gives explicit, dated, multi-year recurrence — but the entry still has
no proposed edge context, so it stays unminted on Research.1.md §4's
"no ungrounded isolated addition" caution rather than the original,
now-obsolete "not itself a cadence statement" objection.

## Findings

### 1. `ecb-mfi-balance-sheet-items` citation re-verified; still not wired, on a sharper and more specific mismatch

*What this rests on*: a `WebFetch` retrieval of Guideline (EU) 2024/2941 via
a mirror hosted by Narodowy Bank Polski (nbp.pl), since eur-lex.europa.eu's
own page did not return full text to this session's fetch tool.

This entry (originally logged in `eurosystem-ecb.json` as ECB-04, `G.39.md`,
and carried here as a `deferred` `_dropped` entry once this slice minted the
target node) was blocked on one stated condition: the specific Annex
citation behind "The monthly data feed into the published aggregated
statistical data required from monetary financial institutions (MFIs) in
the Union" had never been independently re-verified in either session. This
session verified it directly: Annex I, item 5 of the Guideline, "Monthly
and quarterly financial information of the Eurosystem," carries that exact
footnote. **The citation checks out.** But the edge stays unwired, on a
problem the original entry could not have seen, because the citation itself
had not yet been read: the text is about "monthly and quarterly" Eurosystem
financial information, and this file's two candidate targets are the
*weekly* financial statement and the *annual* balance sheet. Neither cadence
matches. Forcing the edge onto either misstates which Eurosystem
publication the quote describes. Flagged for whoever next touches this
(recorded in the entry's own `why`, not decided here): either the corpus is
missing a monthly/quarterly Eurosystem financial-reporting node, or the
existing weekly/annual nodes need checking for whether either is, in
substance, the same series under a different cadence label.

### 2. MIP scoreboard / Alert Mechanism Report — cadence objection cleared, still not minted, for a reason the original entry never stated

*What this rests on*: the European Commission's own Alert Mechanism Report
page at `economy-finance.ec.europa.eu`.

The original `no-document` entry withheld this lead because a news item
evidencing recurrence "is not itself a cadence statement." The Commission's
own page settles that on its own terms: it describes the AMR as "a document
issued by the European Commission towards the end of the calendar year, in
conjunction with the annual growth survey," calling it "the starting point
of the annual cycle of the Macroeconomic Imbalance Procedure," with dated
editions listed back to 2012 and three recent ones independently confirmed
(November 2025, December 2024, November 2023). Research.1.md §4's cadence
condition is squarely met. **Still not minted**, because neither this
session nor the entry's original author ever identified what edge the
AMR/MIP scoreboard would serve — no document read so far names it as an
input to, or output of, anything else in this file's material. Minting a
node with no proposed edge risks exactly the kind of ungrounded isolated
addition Research.1.md §4 warns against (as distinct from a documented
`fed-h15`-style isolated mint, where the node itself is independently
well-evidenced as a real, useful addition even absent an edge — this entry
has evidence for cadence but none yet for relevance to this graph). Flagged
in the entry's own `why` for whoever has the original staged-batch material
(`EU/ECB-Staging-Batches_PartA_2026-08-05.md`) to check what prompted the
original researcher to flag this lead in an ECB/EDP-GFS file at all, before
minting.

## Secondary observations (logged, low priority)

- The other seven `_dropped` entries in this file were re-read this session
  and found already correctly resolved as of `G.58.md`'s predecessor
  sessions (2026-08-08): the SUP/IVF/ICO/ICB cadence leads all minted, the
  EBA-ITS-framework and Eurosystem-collateral-framework and
  institutional-cooperation entries all correctly filed as no-node
  categories, and the monetary-aggregates entry correctly treated as a
  derived series rather than a second node. No changes made to any of the
  seven; not separately marked with a "READ" tag this session, unlike
  `G.58.md`'s convention for its own file's unpublishable-source entries,
  because none of the seven had open questions to close.
- Corpus-count estimate not attempted this session, same reasoning as
  `G.58.md`: no new reports or dependencies were added, so there is nothing
  to compound into a running total, and Thomas's next `npm run validate`
  run remains the source of truth.

## Corrections to prior sessions

1. **No claim in `G.56.md`, `G.57.md` or `G.58.md` is disputed.** This
   session did not re-touch any of their files.
2. **No claim in this file's own prior sessions (2026-08-05, 2026-08-08) is
   overturned.** Both findings above are advances on open leads, not
   corrections to settled ones — the 2026-08-08 session's resolutions of the
   SUP/IVF/ICO/ICB cadence leads stand unchanged.

## Thomas's stated priority for the remaining work

Unchanged from `G.58.md`'s lettered blocks; this session's work is entirely
inside **B — the corpus-wide `_dropped` sweep**, Tier-2 item #9 in
`planning/dropped-sweep-scoping_2026-08-08.md`'s suggested order. One
decision is waiting on Thomas from this session:

1. **Whether the corpus is missing a monthly/quarterly Eurosystem
   financial-reporting node**, or whether the existing weekly/annual
   Eurosystem nodes should be checked for a substance-match to the
   "monthly and quarterly financial information" Guideline (EU) 2024/2941
   actually names (Finding 1) — a modelling question, not a research one.

**Blocks A, C, D, E, F, G untouched this session** — see `G.56.md`/`G.57.md`/`G.58.md`
for their current state.

## Cheap checks still outstanding

Carried from `G.58.md`, unchanged except where noted:

1. Inbound edges for the four isolated ECB series `G.53.md` minted. Not
   attempted this session.
2. A present-tense source for `ess-sims -> eu-reg-223-2009`. Not attempted.
3. Find a citable publication page for the German EDP inventory document
   itself. Not attempted this session (out of this file's scope).
4. `eca-annual-work-programme` and `eca-strategy-2026-2030` isolated except
   for the edge between them — worth a look for any document naming either
   as an input to something else. Not attempted this session.
5. `intosai-issai-300`/`400`'s cadence estimate rests on a
   `WebFetch`-intermediated read, not a direct render. Not attempted this
   session.
6. **New, this session**: before minting the MIP scoreboard / Alert
   Mechanism Report node, read `EU/ECB-Staging-Batches_PartA_2026-08-05.md`
   to recover what edge context (if any) the original staged-batch material
   proposed for it — cheaper than re-researching from nothing, and the
   entry's own `why` now says explicitly that this was never checked.
7. **New, this session**: the MFI-balance-sheet-items citation was read via
   an nbp.pl mirror, not eur-lex.europa.eu directly. If this citation is
   ever load-bearing for more than the still-unwired edge it currently
   supports, worth a second confirmation against EUR-Lex's own canonical
   text once/if its page starts returning full text to this session's
   tooling again.

## What to pass at the start of next thread

1. **`planning/OPEN-THREADS_2026-08-08.md`** — read first, thread 2.1, for
   the fuller day-by-day sweep narrative this file's single-file slice
   summarises from (note: like `G.58.md`, this file's session happened
   2026-08-09 and has not itself been folded into OPEN-THREADS yet).
2. **This file**, then `G.58.md`, `G.57.md`, `G.56.md` for everything else
   in the branch.
3. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (node
   rule and sweep scoping), §6 (output format).
4. **`src/data/research/eurostat-edp-gfs-ecb-statistics.json`** — both
   `_dropped` entries this session touched carry their correction inline,
   original text preserved below each one.
5. **`planning/dropped-sweep-scoping_2026-08-08.md`** — for the remaining
   Tier-2 files in the suggested order (`manufacturing-and-classifications.json`,
   `nl-municipal-finance.json`, `statcan-ippi.json`, `statcan-macro-accounts.json`).

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
