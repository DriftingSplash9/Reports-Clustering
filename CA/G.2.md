# G.2.md — Canada/federal galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` read in full at the start of this overall
working session; §2 (git prohibition), §3 (extract-don't-adjudicate), §4
(node rule and sweep scoping), §6 (output format) applied this session.
`planning/OPEN-THREADS_2026-08-08.md` and `planning/dropped-sweep-scoping_2026-08-08.md`
both read in full earlier this session. `CA/G.1.md` is the hand-off template
followed here.
Predecessor: `G.1.md` (2026-08-08).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. Ask
   Thomas if you need git state.
2. **Branch scope, unchanged from `G.1.md`**: `CA/` covers the
   Canada/federal fiscal-transfer research thread — Equalization,
   Territorial Formula Financing, and the StatCan macro-accounts chains
   behind both. `federal-canada.json` (CPI/SEPH-driven federal benefit
   programmes) remains a separate, older slice not folded into this branch —
   swept this same overall session (Tier-2 item #11, see
   `planning/OPEN-THREADS_2026-08-08.md` thread 2.1) but tracked as
   non-branch, per `G.1.md`'s own Orientation item 2, still undecided.
3. **This file covers exactly one file**: `statcan-macro-accounts.json`,
   already explicitly within this branch's scope per `G.1.md`'s own
   Orientation item 2 ("the StatCan macro-accounts chains") but not
   otherwise touched by any branch hand-off until now — its 2026-08-08 edit
   (the `statcan-system-macroeconomic-accounts` mint) was reported in `G.1.md`
   itself, before this file's own further `_dropped` entries were worked.
4. **This branch's priority list is plain-numbered**, matching AU/NZ, not
   the EU's lettered A–G convention.
5. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`,
   never sweep Thomas's personal files. Standing rule, unchanged.

## Session conditions — read this first

**A `_dropped`-sweep session, corpus-wide thread 2.1, Tier-2 item #15 — the
last file in `planning/dropped-sweep-scoping_2026-08-08.md`'s numbered
Tier-2 list.** One file touched: `statcan-macro-accounts.json` — two nodes
minted, four new edges wired, three of the file's eight `_dropped` entries
resolved.

**Read in full this session**: the current `statcan-macro-accounts.json`
(before and after editing), `manufacturing-and-classifications.json` (from
this same overall session's Tier-2 item #12 work, to confirm `statcan-msm`'s
existing id and edges). **Not read this session**: `equalization-payroll-base.json`,
`equalization-named-products.json`, `grok-h1-equalization-named-products.json` —
this branch's other three files, untouched this session.

## Headline result

**A third stale-cross-file-target catch inside this single overall working
session** — `statcan-msm` (minted one file earlier in the same session's own
sweep pass, `manufacturing-and-classifications.json`) had an edge from this
file's own `statcan-national-accounts` sitting in `_dropped` as
`no-node-yet`, unresolved for the length of exactly one file. Two further
entries were resolved by direct research rather than staleness: the
Quarterly Survey of Financial Statements and the Retail Commodity Survey
were both minted on their own IMDB publication facts, the second of which
surfaced a live name discrepancy between the corpus's citing documents and
the survey's current title.

## Findings

### 1. `statcan-national-accounts -> statcan-msm` — resolved on a same-session staleness, the fastest catch of this kind so far

*What this rests on*: `manufacturing-and-classifications.json`'s own
`statcan-msm` node (minted Tier-2 item #12, earlier in this same overall
session) and record 1901's already-quoted `_dropped` text.

Record 1901's 'Estimation' section names the Monthly Survey of
Manufacturing as a sub-annual movement source; the entry was filed
`no-node-yet` because no `statcan-msm` node existed anywhere in the corpus
at the time it was written. It existed by the time this file was reopened —
minted in the very same sweep session, one file earlier. **Wired
`statcan-national-accounts -> statcan-msm`, `uses_data_from`**, on the
entry's own already-verified quote. Distinct from `G.56.md`'s,
`G.57.md`'s, `G.58.md`'s, `NZ/G.6.md`'s and `EU/G.59.md`'s staleness
catches only in how little time elapsed between mint and catch — this is
the same file-ordering effect `statcan-ippi.json`'s own sweep (Tier-2 item
#14, immediately prior to this file) hit three times over in one file.

### 2. `statcan-qsfs` minted; two edges wired on publication facts the corpus already had a record number for but no node

*What this rests on*: Statistics Canada's own IMDB record 2501.

Record 1901 names the Quarterly Survey of Financial Statements twice (Data
sources, Estimation) and the monthly GDP by industry source table names it
a third time by record number. The entry was withheld only for want of the
survey's own publication facts. Retrieved directly: 'Frequency: Quarterly',
collection roughly 30 days after quarter-end. **Minted `statcan-qsfs`**,
wired `statcan-national-accounts -> statcan-qsfs` and
`statcan-gdp-monthly -> statcan-qsfs`, both `uses_data_from`, closing both
edges the original entry predicted in one pass.

### 3. `statcan-rcs` minted under its current title; a name discrepancy surfaced and flagged, not resolved

*What this rests on*: Statistics Canada's own IMDB record 2008.

Record 1901 and the monthly GDP source table both cite this input as the
'Quarterly Retail Commodity Survey'. Record 2008's own current page names
it the 'Retail Commodity Survey (RCS)', monthly, with quarterly
commodity-level detail as a secondary tier. **Neither name is invented —
both are drawn from real documents** — so this is recorded as a live
discrepancy rather than adjudicated: older Daily articles (1999–2012) do
use the 'Quarterly' name, so this may be a historical rename the citing
documents never caught up to, or the citing documents may simply be using
an informal name for the survey's quarterly detail specifically. **Minted
`statcan-rcs` under the record's current title**, wired
`statcan-national-accounts -> statcan-rcs` and
`statcan-gdp-monthly -> statcan-rcs`, both `uses_data_from`. The
discrepancy is recorded in the node's own description, per `Research.1.md`
§3's "report conflicts, don't resolve them."

## Secondary observations (logged, low priority)

- The other five `_dropped` entries in this file were re-read this session
  and found already correctly settled: the `statcan-national-accounts ->
  statcan-gdp-monthly` entry (deleted, `no-document`, refuting an external
  assistant's inverted-direction claim), the SUT/record-1401 entry (already
  marked resolved within the same 2026-08-08 session that created it), the
  `statcan-gdp-monthly -> statcan-lfs` entry (searched and confirmed
  absent), the `statcan-hfce`/`statcan-national-accounts` duplicate-IMDB-record
  curation problem (a modelling decision for Thomas, not research), and the
  `statcan-national-accounts -> statcan-cpi` implied-edge note (informational,
  the edge is already live). None changed.
- Corpus-count estimate not attempted this session, same reasoning as this
  overall session's EU hand-offs (`G.58.md`/`G.59.md`/`G.60.md`): three new
  reports and four new dependencies add to whatever base figure is current,
  and Thomas's next `npm run validate` run is the source of truth, not
  compounding agent arithmetic.

## Corrections to prior sessions

1. **No claim in `G.1.md` is disputed.** This session extends `G.1.md`'s
   own file (`statcan-macro-accounts.json`) with new nodes and edges; it
   does not revisit the `statcan-system-macroeconomic-accounts` mint or the
   two SOR/2007-303 edge repointings `G.1.md` reported.

## Thomas's stated priority for the remaining work

Carried from `G.1.md`, updated:

1. **Corpus-wide sweep for other framework/legislation citations that
   should become nodes** under the Q1 precedent (`G.1.md` Finding 2) —
   still real, unstarted work; not touched this session.
2. **Decide whether `federal-canada.json` folds into this branch** or
   stays a separate, older slice — still undecided; that file was swept
   this same overall session (Tier-2 item #11) as a non-branch file, which
   does not answer the question either way.
3. ~~`equalization-named-products.json`'s System of Macroeconomic Accounts
   entry~~ — done, `G.1.md` Finding 3.
4. **The rest of the corpus-wide `_dropped` sweep** — as of this file,
   `planning/dropped-sweep-scoping_2026-08-08.md`'s entire numbered Tier-1
   and Tier-2 list is closed. **Next scoped work per that document**:
   `grok-h1-international-reports.json`'s 57 unexamined `note` entries, then
   Tier 3 and the long tail.

## Cheap checks still outstanding

Carried from `G.1.md`, plus:

1. Confirm no other file in the corpus already has an edge targeting
   `statcan-national-accounts` that was actually chasing the *framework*
   rather than the specific release. Not attempted this session.
2. **New, this session**: resolve the `statcan-rcs` name discrepancy
   (Finding 3) — was the 'Quarterly Retail Commodity Survey' a historical
   name for what is now IMDB record 2008's monthly RCS, or are the citing
   documents (record 1901, the 1301 source table) referring informally to
   the quarterly commodity-level detail specifically? A single archived
   IMDB page (pre-rename, if one exists) would settle it.
3. **New, this session**: `statcan-qsfs` and `statcan-rcs` are both now
   two-edge nodes into `statcan-national-accounts` and `statcan-gdp-monthly`
   only — worth checking whether either is named as an input anywhere else
   in the corpus (e.g. sector-specific accounts, financial-statistics
   slices) now that both exist as nodes.

## What to pass at the start of next thread

1. **`planning/OPEN-THREADS_2026-08-08.md`** — read first, thread 2.1. Like
   this overall session's EU hand-offs, this file's session (2026-08-09) has
   not yet been folded into OPEN-THREADS.
2. **This file**, then `G.1.md` for the branch's founding session.
3. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (node
   rule and sweep scoping), §6 (output format).
4. **`src/data/research/statcan-macro-accounts.json`** — every `_dropped`
   entry this session touched carries its resolution inline, original text
   preserved below each one.
5. **`planning/dropped-sweep-scoping_2026-08-08.md`** — confirms this file
   closes the numbered Tier-1/Tier-2 list; the next scoped work is
   `grok-h1-international-reports.json`'s note entries, then Tier 3.

---

# How to write the next hand-off

**Added 2026-08-04 in `EU/`; adopted wholesale for this branch 2026-08-08
(Thomas, via `Open-Questions-2026-08-08-sweep.docx` Q4, extending the
2026-08-07 decision that already covered AU and NZ) — copy this whole
section verbatim into every successor**, so the chain never depends on one
file surviving. It is the spec, not an example.

When Thomas says *"write the next handoff"*, *"write the next G file"*, *"wrap
this thread up"* or anything close, this is what he is asking for. Do not ask
which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the highest-numbered
  `G.*` file in `CA/`. **Take the highest number, not the count.**
- **Write it as `.md`**, plain text, in `CA/`.
- **Then write the JSON sidecar.** Every hand-off has a machine-readable twin at
  `CA/G.<n>.json`. Do not hand-write it — run:

  ```
  python3 scripts/handoff-to-json.py CA/G.<n>.md
  ```

  The Markdown stays the document of record; the JSON is a structured index of
  it (date, predecessor, findings, corrections, priorities, cheap checks, and
  which required sections are missing). `python3 scripts/handoff-to-json.py`
  with no arguments rebuilds every sidecar across all four branches;
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
# G.<n>.md — Canada/federal galaxy hand-off

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
