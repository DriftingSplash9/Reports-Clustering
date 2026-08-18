# G.52.md — EU galaxy hand-off

Date: 2026-08-08
Governing brief: `Research.1.md` — **amended this session**, §4 rewritten.
Predecessor: G.51.md (2026-08-07).

## Orientation — if you are a new agent, start here

1. **Read `Research.1.md` §4 in full before anything else.** It changed
   today. A node is now one of two shapes: a recurring publication
   (cadenced, unchanged from before) or a **one-off foundational
   instrument** (treaty, trade deal, government policy/regulation, adopted
   once) which needs no cadence. Recasts and legislative successor
   instruments are explicitly the *recurring* shape, not the one-off shape,
   even when the current edition has never itself been amended — this
   reopens prior exclusions across the corpus. Also read the "Cadence, for
   the recurring shape" subsection: **cadence is preferred, not required**.
   If a publication is irregular, use the latest observed interval between
   editions as its `releases_per_year` rather than leaving it blocked.
2. **Code already updated to match, already committed to `main`, already
   pushed** (confirmed — `main` is 0 commits ahead of `origin/main` as of
   this session). `src/lib/types.ts`: `Report.releases_per_year` is now
   `number | undefined`. `src/lib/graph.ts` `validate()`: absent is valid;
   present-but-non-positive is an error; `changes_per_year` set with
   `releases_per_year` absent is an error (a rate can't move relative to a
   publication rate that doesn't exist). `src/App.tsx` `Detail`: shows
   "once, as a standing instrument" when `releases_per_year` is absent.
   Verified with `tsc --noEmit` (zero errors). `npm run validate` could not
   be run cleanly from the device-bridge shell this session (esbuild
   native-binary platform mismatch, environment issue not a code issue) —
   **worth Thomas running it once locally to confirm the data files still
   pass**, since no agent session has gotten a clean run of it since the
   schema change.
3. **Three proposal files are sitting in `/tmp/eu-proposal/` on the prior
   session's sandbox, delivered to Thomas via SendUserFile, not yet
   reviewed, not yet imported.** None are registered in
   `src/data/index.ts`. Full detail in "Open proposals" below. If you are a
   fresh agent and Thomas hands you a marked-up version of the questions
   doc (`EU-open-questions_2026-08-08.docx`, also delivered this session),
   his answers there are the review — treat them as instructions, don't
   re-derive the calls yourself.
4. Everything else unchanged from G.51.md's orientation list — this
   session did not touch the 73-batch backlog, the ESS quality framework
   slice, or the German sub-graph beyond what's in the two proposal files
   below.

## Session conditions — read this first

This was a **rule-change-plus-drafting** session, not a research session.
No new primary sources were read first-hand by this session's own agent
except EUR-Lex EDP-inventory review already on file from prior sessions.
The bulk of new factual material (EU legal-instrument predecessor chains)
came from **Grok**, an external researcher with live web access, briefed
via two written prompts (`GROK-PROMPT-9...md`, `GROK-PROMPT-10...md`,
both in `/tmp/eu-proposal/` and worth moving into `EU/prompts/` if kept).
Grok's material is explicitly **not** independently re-verified the way
this project's own direct-read slices are — every proposal file sourced
from Grok says so in its own `_status` field. Treat it as a well-sourced
draft awaiting a verification pass, not a finished mint.

**One rule change, three proposal files, zero imports.** The corpus itself
is unchanged — nothing from this session is in `src/data/index.ts`.

## What changed in the rule

Thomas's ruling, recorded in `Research.1.md` §4 under "Recast
2026-08-08, Thomas's ruling":

> it almost makes sense to have the top level allow for nodes that are
> published once such as trade deals, government policy/regulation,
> treaties, etc. otherwise we should keep the cadence requirement. I
> realize this opens a backlog, but there are not many countries we looked
> at so far. Allow the recasts of a predecessor, it makes logical sense.

And separately, on irregular publications (folded into the same section):

> cadence is greatly appreciated but it isn't a must, if there is a
> cadence it must be used. Not all reports cited have periodicity. If a
> publication is irregular use the latest interval for the cadence.

Two consequences worth a new agent internalizing, not just the code:

- **This reopens prior exclusions.** Several `_dropped` entries across the
  existing corpus were excluded specifically for lacking a cadence — some
  of those are now legally mintable. This session found and used three:
  the German EDP inventory, the German GNI inventory, and CSO Ireland's
  national-accounts quality report. There are almost certainly more sitting
  in other files' `_dropped` arrays that nobody has gone back to check
  against the new rule yet — **that's a good next task if nothing else is
  queued**.
- **Recasts are recurring, not one-off**, even in isolation. A single
  Regulation with one consolidated version looks like a one-off instrument
  read alone; read as part of its lineage (predecessor named by an
  explicit repeal clause, predecessor's predecessor named the same way) it
  is a recurring document class, and the cadence rule applies to the
  *lineage's* interval, not to the current edition's amendment history.
  This is the reasoning behind all `releases_per_year` values in the third
  proposal file below.

## Open proposals — none imported, all awaiting review

All three files are in `/tmp/eu-proposal/` (that sandbox's `/tmp`, not this
repo — they'll need to be re-delivered or re-created by whichever agent
picks this up next, since `/tmp` doesn't persist across sessions). Thomas
has copies via SendUserFile from this session and the questions doc lists
file_uuids are not durable either — ask him to re-attach if picking this up
in a new session.

### 1. `de-edp-inventory-and-debt-statistics.json`

4 report nodes, 5 dependencies, 3 `_dropped`. Mints the German EDP
inventory (both a 2015 and 2025 edition now on record, cadence ≈0.1/yr)
and the German GNI inventory (2021→2025 edition, cadence 0.25/yr, despite
its own colophon saying "Periodicity: non-recurring" — the same document
names a predecessor edition, which the new rule reads as the disqualifying
label being a per-edition metadata quirk, not a true one-off claim). Also
mints Germany's quarterly and annual public-debt statistics as two
dependency targets. Two open modelling questions inside the file itself
(single node with both editions noted vs. two dated nodes; the persistent
"ESA 95" vs. "ESA 2010" wording inconsistency inside the source document,
recorded not adjudicated).

### 2. `de-ie-national-accounts-quality-reports.json`

2 report nodes, 2 dependencies, 3 `_dropped`. Mints Germany's (Destatis)
and Ireland's (CSO) own national-accounts quality reports — voluntary
documents; nothing in EU regulation compels a member state to publish one
(established by `esa2010-quality-reporting.json`'s pre-existing
`_second_finding`). Luxembourg and Netherlands were investigated and
explicitly **not** minted — both "hits" turned out to be the member state
hosting a copy of Eurostat's own report, not writing their own (colophon
check: `Publications Office of the European Union` / `ISBN 978-92-`
prefix — worth remembering as a standing check for future NSI-quality-report
searches). France was a clean miss, searched and logged.

### 3. `eu-legal-instrument-lineages.json`

16 report nodes, 0 dependencies, 10 `relations` (all `supersedes`), 3
`_dropped`. **First real use of the `supersedes` relation type for an EU
legislative lineage** (previously only `gb-ukspf-succession.json` had
used it, for a UK domestic case). Five chains: the Financial Regulation
(3 generations), the Horizon Europe framework Regulation (3 generations)
and its Specific Programme (2 generations, separate chain), CAP Strategic
Plans (1 generation back, to two sibling 2013 Regulations), and
NDICI-Global Europe (1 generation back, to three named predecessor
instruments). A sixth candidate, the EU Recovery Instrument (2020/2094),
was confirmed as a genuine one-off — Grok searched for a predecessor and
found none, quoted in full in the file. **This file rests entirely on
Grok's round-9/round-10 research, none of it independently re-fetched this
session** — flagged throughout, and the weakest single node
(`eu-reg-2017-1601`, title supplied from general knowledge rather than
anything Grok quoted) is called out by name in the file's own
`_open_questions`.

## Questions Thomas is reviewing before any of this moves

Delivered separately as `EU-open-questions_2026-08-08.docx` (SendUserFile,
this session). Do not re-decide these — his answers in that document, once
he sends it back, are the actual review. Topics covered: the three
proposal files' own open questions (verbatim, listed above); whether the
newly-introduced domain tags (`research-innovation`, `agriculture`,
`external-action`) should be added as-is or renamed to match existing
naming conventions; whether the CAP node's two-target `supersedes` (one
Regulation naming two predecessors) is the right shape or should be split;
whether to go back through the rest of the corpus's `_dropped` arrays now
that the cadence rule loosened; and the discussed-but-not-started UI/filter
additions (domain filter, a `supersedes`/`audits` render path in
`InfluenceGraph.tsx` — currently has none — evergreen-node visual
treatment, relationship-type/cadence-range filters) which remain
conversational only, not committed to as a task.

## What this session did NOT touch

The 73-batch backlog. The ESS quality framework slice. The German
sub-graph beyond the two files above. `InfluenceGraph.tsx` (read for the
UI conversation, not edited — confirmed no rendering path exists for
`Relation`/`supersedes` anywhere in it, a real gap, not yet fixed).
`src/lib/filter.ts` / `ViewControls.tsx` (read, confirmed `domains` is
completely unfiltered/unused in the UI — also a real gap, not yet fixed).

## Repo state as of this session's end

`main` even with `origin/main` (0 ahead, 0 behind) — Thomas has already
pushed the two rule-change commits (`8295de1`, `b41bee9`). A stale
`.git/index.lock` was present at session start from a prior interrupted
device-bridge operation; if a future agent hits an "unable to unlink
index.lock" error, `mv` it aside (device_bash cannot delete files) before
retrying — this has been a recurring, expected friction point across
sessions, not a real problem. An untracked `notes/country.docx` exists in
the working tree (Thomas's own file, unrelated to this session's work —
left alone).
