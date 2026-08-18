# G.1.md — Canada/federal galaxy hand-off

Date: 2026-08-08
Governing briefs: `Research.1.md` — read in relevant part this turn (§2 git
prohibition, §3 extract-don't-adjudicate, §4 sweep scoping); read in full
earlier in this same session, before a context compaction, along with
`src/lib/types.ts` and `src/data/index.ts`. `EU/G.56.md` and `EU/G.57.md`
read in full as the current hand-off template (the EU spec is adopted
wholesale for AU, NZ and any future branch, `Research.1.md`, decided
2026-08-07 — this branch is that "any future branch").
`planning/OPEN-THREADS_2026-08-08.md` read in full this turn — thread 2.1
carries the day-by-day narrative this file draws its "prior history"
section from.
Predecessor: none — this is the first hand-off in a new branch.

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. Ask
   Thomas if you need git state.
2. **This branch exists because Thomas said so, today** — see
   `Open-Questions-2026-08-08-sweep.docx` Q4: "start a branch — e.g. a
   folder with its own G.1.md, parallel to EU/AU/NZ." **Scope, stated
   plainly so it isn't over-claimed**: `CA/` covers the Canada/federal
   fiscal-transfer research thread — Equalization, Territorial Formula
   Financing, and the StatCan macro-accounts chains behind both. It does
   **not** retroactively claim every `country: "CA"` node in the corpus.
   `federal-canada.json` (CPI/SEPH-driven federal benefit programmes) is a
   separate, older slice that predates this branch and is not folded in
   here — whether it should be is an open question for whoever next has
   reason to touch it, not decided by this file.
3. **This is not a normal "first session" hand-off.** The files this
   branch covers were built across several earlier sessions, before the
   branch itself existed, so most of what's in the "Prior history" section
   below is reconstructed from what's already on disk (`_scope`/`_note`/
   `_status` fields in each file), not independently re-verified by this
   session. Flagged plainly at each claim.
4. **This branch's priority list is plain-numbered**, matching AU/NZ, not
   the EU's lettered A–G convention (`Research.1.md`, decided 2026-08-07).
5. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`,
   never sweep Thomas's personal files. Standing rule, unchanged.

## Session conditions — read this first

**Two things happened in this file's history, not one.** First, the
Canada/federal fiscal-transfer sweep work itself — done earlier in the same
overall session, before a context compaction, and covered in full in
`planning/OPEN-THREADS_2026-08-08.md` thread 2.1's first session account.
Second, this turn's own work: executing all four of Thomas's answers on
`Open-Questions-2026-08-08-sweep.docx`, of which Q1 (the
`statcan-system-macroeconomic-accounts` framework mint) and Q4 (this
branch's own creation) are Canada/federal. Q2 (German inventories) and Q3
(NZ Local Government Act 2002) are **not** this branch's — see `EU/G.57.md`
and `NZ/G.6.md`/a future NZ hand-off for those.

**Read in full this turn**: `equalization-payroll-base.json`,
`statcan-macro-accounts.json`, `equalization-named-products.json` (all
three as edited). `grok-h1-equalization-named-products.json`'s `_scope`
field only, not its full content. **Not independently re-verified this
turn**: the primary-
source statutory research behind the original equalization/Territorial
Formula Financing mints (SOR/2007-303 citations) — that verification was
done earlier in this session and is reproduced from the committed JSON, not
re-checked against laws-lois.justice.gc.ca a second time.

## Headline result

**The branch's founding act is also its first real edit**: the System of
Macroeconomic Accounts, the framework two separate federal transfer
regulations cite by name rather than by any specific release, is now a
node — closing a question this corpus has carried, unresolved, since at
least the equalization-payroll-base.json session that first flagged it as
"a judgement, not a quotation." Drafting this file's own Orientation then
surfaced a second, genuinely open lead the same ruling closes — see
Finding 3. Set against that: this branch's actual research substance from
earlier in the day — the Territorial Formula Financing mint, the four new
StatCan nodes, the correction of eight stale `no-node-yet` entries — all
predates this file and is not repeated here; read `EU/G.57.md`'s sibling
narrative in `OPEN-THREADS` thread 2.1 for that.

## Findings

### 1. `statcan-system-macroeconomic-accounts` minted; two edges repointed from inference to verbatim match

*What this rests on*: Thomas's Q1 answer, `Open-Questions-2026-08-08-sweep.docx`
("these situations call for a node... it's sole role is broadcasting and
that needs represented... doesn't need cadence"). Applied earlier this
turn, before this hand-off was written; reproduced here from the committed
JSON.

Minted in `statcan-macro-accounts.json` as an evergreen node — no
`releases_per_year`, matching the treatment Thomas specified for
frameworks and the legislative instruments a regulation is built on. Two
dependencies in `equalization-payroll-base.json`
(`fiscal-equalization-program -> statcan-system-macroeconomic-accounts`,
`territorial-formula-financing -> statcan-system-macroeconomic-accounts`)
were repointed from the inferred target `statcan-national-accounts` — a
judgement call the file's own text had flagged as an inference, not a
quotation — to the new node, which now matches SOR/2007-303's own wording
verbatim: "as determined by Statistics Canada for the purpose of its
System of Macroeconomic Accounts." **This is a strict improvement in
evidentiary strength, not new evidence**: the statutory quote was already
in hand; only the target changed.

### 2. Thomas's Q1 answer generalises past this one node, and that generalisation is not executed here

*What this rests on*: the answer's own text, quoted in Finding 1.

Thomas's ruling reads as a standing principle, not a one-off: "A piece of
legislation that a regulation is built on is not going to have cadence but
it is worth showing as a node." That would apply to other framework/
legislation citations across the corpus that were previously left as
inference-only edges or `no-node-yet` leads for exactly this reason (the
ESA 2010 quality-reporting framework was named in Q1's own context as the
same shape of question from an earlier EU session). **Not swept for this
session** — Q1 was answered and executed for the one node it was asked
about; a corpus-wide pass looking for other framework citations that
should now become nodes under this same ruling is real, unstarted work,
not assumed done by this file.

### 3. `equalization-named-products.json`'s own System of Macroeconomic Accounts lead resolved in the same pass

*What this rests on*: the entry's own already-extracted quotes, from an
earlier session; reproduced and acted on this turn.

Drafting this hand-off's Orientation surfaced a `_dropped` entry this
branch's own file had been carrying: `fiscal-equalization-program` names
the framework four further times beyond the two edges in Finding 1 — three
times in SOR/2007-303 s. 3.1 for capital-formation aggregates
(intellectual property products, machinery and equipment, non-residential
structures, each phrased identically: "as determined by Statistics Canada
on the basis of data for or from its System of Macroeconomic Accounts")
and once more in s. 5(b)(i) for the corporate-profits revenue-base term.
Built as two edges, not four: the three s. 3.1 terms are the same statutory
sentence repeated for three aggregates, not three distinct dependencies, so
they collapse into one; the s. 5(b)(i) term is independent and gets its
own edge. **This is real, unplanned research completed while writing this
hand-off, not carried-over cheap-check work.**

## Secondary observations (logged, low priority)

- The arrow-toggle UI idea in the same Q1 answer is logged in
  `planning/OPEN-THREADS_2026-08-08.md` §4.8, not built. See that entry;
  not repeated here since it's a UI/code thread, not a Canada/federal
  research one.
- Corpus-count estimate after all four sessions run in this overall
  session (equalization pair, EDP inventory + esa-2010, nz/au government
  finance, and this turn's four decisions plus Finding 3's extra two
  edges): roughly 384 reports / 453 dependencies against `EU/G.56.md`'s
  validator-confirmed 372/436. Agent arithmetic across multiple files and
  multiple turns, compounding whatever rounding error already existed in
  the 380/445 estimate `EU/G.57.md` gave — **treat this as a rough order
  of magnitude, not a number to cite**, until Thomas runs
  `npm run validate` on Windows.

## Corrections to prior sessions

**None.** This is the first hand-off in the branch; there is no
predecessor to correct. Nothing in the pre-branch research (the
equalization/Territorial Formula Financing work, the original
`statcan-macro-accounts.json` build) was found wrong by this session --
the one thing that changed, the SMA edge targets, changed by a decision,
not by finding an error.

## Thomas's stated priority for the remaining work

New branch, so this list is scoped from what's visibly still open in the
files this branch owns, not carried from a predecessor:

1. **Corpus-wide sweep for other framework/legislation citations that
   should become nodes** under the Q1 precedent (Finding 2) — real,
   unstarted work.
2. **Decide whether `federal-canada.json` folds into this branch** or
   stays a separate, older slice. Not decided by this file (Orientation
   item 2).
3. ~~`equalization-named-products.json`'s System of Macroeconomic Accounts
   entry~~ — **done this session**, see Finding 3.
4. **The rest of the corpus-wide `_dropped` sweep** — this branch's two
   files (`equalization-named-products.json`, `equalization-payroll-base.json`)
   were the sweep's first pair, done and reported in `OPEN-THREADS` thread 2.1's
   first session account. The sweep itself continues corpus-wide, not
   branch-by-branch; see `planning/dropped-sweep-scoping_2026-08-08.md` for
   the suggested order of what's left.

## Cheap checks still outstanding

1. Confirm no other file in the corpus already has an edge targeting
   `statcan-national-accounts` that was actually chasing the *framework*
   rather than the specific release — a quick corpus grep for "System of
   Macroeconomic Accounts" outside this branch's own files.

## What to pass at the start of next thread

1. **`planning/OPEN-THREADS_2026-08-08.md`** — read first, thread 2.1 for
   the fiscal-transfer sweep narrative, and the fourth-session account for
   how this branch's own founding decisions were executed.
2. **This file** — the only hand-off in the branch so far.
3. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (sweep
   scoping).
4. **`src/data/research/statcan-macro-accounts.json`,
   `equalization-payroll-base.json`, `equalization-named-products.json`,
   `grok-h1-equalization-named-products.json`** — this branch's four
   files. Read `_scope`/`_note` fields first; they carry the session
   history each file has accumulated.
5. **`Open-Questions-2026-08-08-sweep.docx`** — Q1 and Q4 are this
   branch's; both are answered and executed as of this file.

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
