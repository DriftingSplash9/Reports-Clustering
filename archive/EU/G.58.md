# G.58.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` read in relevant part this session (§2 git
prohibition, §3 extract-don't-adjudicate, §4 node rule and sweep scoping,
§6 output format) — not re-read in full this session; the version read at
the start of this overall working session (before this file was written)
covered it in full, along with `planning/OPEN-THREADS_2026-08-08.md` in
full, `planning/dropped-sweep-scoping_2026-08-08.md` in full, `START-HERE.md`
in full, and `EU/G.57.md`, `NZ/G.6.md`, `AU/G.4.md`, `CA/G.1.md` in full (the
four most recent branch hand-offs at the time, one per branch touched
2026-08-08). `src/lib/types.ts` read in full this session for the current
schema. `G.57.md` is the hand-off template followed here.
Predecessor: `G.57.md` (2026-08-08).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. See `G.54.md` / `Research.1.md` §2. If you need
   to know what is committed or pushed, ask Thomas.
2. **Read `planning/OPEN-THREADS_2026-08-08.md` first**, specifically thread
   2.1 (the corpus-wide `_dropped` sweep) and `planning/dropped-sweep-scoping_2026-08-08.md`'s
   suggested execution order. This file is the sweep's Tier-1 item #6 —
   the next one after the equalization pair, the EDP-inventory/esa-2010
   pair, and the nz/au government-finance pair, all done 2026-08-08 (see
   `G.57.md`, `NZ/G.6.md`, `AU/G.4.md`, `CA/G.1.md`). **Next in the
   suggested order after this file**: `ontario-ompf-mpac.json` (Tier-1 #7,
   Canada/US galaxy, no branch folder), then `realm-government-finance.json`
   (Tier-1 #8).
3. **`G.56.md`/`G.57.md` are still the substantive predecessors for
   everything else in this branch** — the id registry, the ESS quality
   slice, housecleaning status. This file covers exactly one file:
   `eu-draft-budget.json`.
4. **New finding worth carrying forward as orientation, not just as a
   correction below**: the ten SEC-numbered sections of the Draft Budget map
   to Institutions in a fixed order — I Parliament, II European
   Council/Council, III Commission, IV Court of Justice, **V Court of
   Auditors**, VI EESC, VII Committee of the Regions, VIII Ombudsman, IX
   EDPS, X EEAS. `eu-draft-budget`'s own `url` field points at SEC05, i.e.
   the **ECA's** section — which is why ECA-sourced `_dropped` entries in
   that file legitimately use `source: "eu-draft-budget"` while EESC
   (SEC06)-sourced entries correctly do not. No prior EU hand-off wrote this
   mapping down; worth knowing before touching `eu-draft-budget.json` again
   or before modelling SEC06/SEC07 as their own nodes.
5. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`,
   never sweep Thomas's personal files. Unchanged.

## Session conditions — read this first

**A `_dropped`-sweep session, corpus-wide thread 2.1, EU's third file in the
suggested execution order (Tier-1 item #6)**
(`planning/dropped-sweep-scoping_2026-08-08.md`). One file touched:
`eu-draft-budget.json` — five nodes minted, three new edges wired, six
`_dropped` entries corrected in place (two fully resolved, one target
identified but edge deliberately left unwired, two partially resolved and
left unwired on remaining grounds, one given a corrective nuance without
changing its reason code), three entries read and reconfirmed unchanged.

**Read in full this session**: the current `eu-draft-budget.json` (before
and after editing), `src/lib/types.ts`, `src/data/index.ts` (grep only, to
confirm `eurostat-remuneration-update-report` is actually registered),
`eurostat-remuneration-update-report.json`, `eurostat-remuneration-satellite-series.json`,
`eurostat-hicp.json`. **Not read this session**: `REPORTS.md`, `BACKLOG.md`,
any other `EU/` research JSON, the staging blob, `SEC05.pdf`/`SEC06.pdf`
themselves (the primary-source verification below was done live against
the web, not against the local PDFs — see Corrections item 3 for why that
matters).

**All primary-source retrieval this session was done via `WebFetch`/`WebSearch`
against live EU/INTOSAI sites, not via direct document parsing.** `WebFetch`
processes fetched content through a small intermediary model before
returning it, which is a materially different evidentiary posture than the
direct-extraction standard `AU/G.3.md` established this project prefers
(that session caught the intermediary model fabricating a plausible
citation). Every quote below is reported as returned by that tool, in
quotation marks, and cross-checked once against a second independent
fetch where the finding was consequential (the ISSAI 300/400 cadence, the
Article 9(2) HICP text); none was checked against a raw PDF/HTML render.
Flagged plainly, per the branch's own convention, because everything
downstream inherits this limit.

## Headline result

**A stale cross-file target, the same failure shape `G.56.md`/`G.57.md`/`NZ/G.6.md`
have each now caught once, showed up a fourth time — and a live re-check of
a primary legal instrument (rather than the budget document that merely
summarises it) surfaced a real, if narrow, correction to a confirmed
negative.** The branch's own file already contained a fully-minted node for
the "best lead in the branch" (`eurostat-remuneration-update-report`,
minted 2026-08-05 in a sibling file) that `eu-draft-budget.json`'s own
`_dropped` block never updated to point at — but unlike the three prior
staleness catches, resolving the target did **not** make the edge
mintable, because the actual blocker was never the missing URL; it is that
SEC05 itself never names the Eurostat report, only an unpublished
guidelines letter. Separately, reading Council Decision (EU) 2024/1809
directly (rather than through SEC06's summary of it) found that Article
9(2) does name a price index — Eurostat's HICP — as a discretionary review
trigger, which the original "no-document" entry's SEC06-only search could
not have found. Three nodes were also minted on genuinely new ground: two
INTOSAI auditing-principles documents (ISSAI 300/400) once a live cadence
check unblocked them, and the ECA's own annual Work Programme, wired to its
2026-2030 Strategy on a quote independently corroborated against the
Work Programme's own text.

## Findings

### 1. `eurostat-remuneration-update-report` already existed; the deferred edge stays unwired for a sharper reason than the one originally given

*What this rests on*: `eurostat-remuneration-update-report.json` (sibling
EU-branch file, `_researched: 2026-08-05`), grep-confirmed against
`src/data/index.ts` line 36 (imported), and a live retrieval of the 2025
edition's own PDF this session.

The `_dropped` entry "eu-draft-budget -> Eurostat Report of 31 October..."
called this "the best lead in the branch," blocked only on "no URL for the
Eurostat report has been retrieved." That premise was already false when
this session started: the report has had a minted, registered node —
`eurostat-remuneration-update-report`, url
`https://ec.europa.eu/eurostat/web/civil-servants-remuneration/publications`
— since 2026-08-05, four days before this session, in a file this branch's
own `eu-draft-budget.json` never cross-referenced. **Corrected the entry's
`target` field from `null` to `eurostat-remuneration-update-report`.**
**The edge itself is still not minted**, and re-reading SEC05's own text
shows why the original "clears all three conditions from the quote alone"
framing overstated what SEC05 actually says: SEC05 attributes its
+2.2%/+2.3% salary-adjustment assumptions to "the guidelines issued by the
Commission" — a letter of 18 December 2025, unpublishable, already
correctly recorded elsewhere in this same file's `_dropped` block — and
never mentions the Eurostat report by name. The chain from that letter back
to Annex XI's Eurostat mechanism is almost certainly real in substance, but
no single document states it; it is an inference bridging SEC05 and
COM(2025) 736, not a quotable link. Flagged for Thomas rather than decided:
whether this project's evidence bar tolerates that kind of bridged
inference (some multi-hop chains elsewhere in the corpus are accepted on
weaker single documents) or requires SEC05 itself to name the report.

### 2. Council Decision (EU) 2024/1809, read directly, narrows the EESC-allowance "no-document" finding without overturning it

*What this rests on*: a live `WebFetch` retrieval of
`eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401809`, cross-checked
against a second fetch of the same instrument's PDF rendering.

The original entry's search was confined to SEC06, which states only the
outcome of the 2024 adjustment (a 26.55% increase after eleven years frozen)
and names no index. Reading the Decision itself finds Article 9(2): "the
Council may also consider an adjustment of the amounts ... when the
accumulated yearly inflation has exceeded 6 % according to Eurostat's
Harmonised Index of Consumer Prices (HICP) for the EU27 since the last
adjustment agreed by the Council." **This is a real correction to the
search's exhaustiveness, not to its conclusion**: a price index
(`eurostat-hicp`, already a corpus node) is named in the primary
instrument, but only as a discretionary review trigger — the Council "may
consider" a review past a 6% threshold, not an automatic recalculation —
which is a different thing from the indexed formula Research.1.md §8 item
1b was originally asking whether this corpus had an EU counterpart to.
**Reason code left as `no-document`** (a corrected nuance, not a reversed
finding) and the edge stays unwired, on the same SEC06-modelling gap as
Finding 3.

### 3. Two nodes minted on `eu-draft-budget`'s own citation, once a live cadence check unblocked them

*What this rests on*: `issai.org`'s own pronouncement pages for ISSAI 300
and ISSAI 400, each fetched once and cross-checked once against a related
INTOSAI page (`ISSAI-100-EN-rev.pdf`) that corroborates the same
2001/2013/2019 revision pattern for the wider Fundamental Principles set.

SEC05 footnote 4 names both standards with page numbers — already flagged
in the prior entry as "the only place in the section where an external
standard is fully cited" — but was withheld for want of a stated cadence.
issai.org's own history for ISSAI 300 ("Endorsed as Field standards in
government auditing... 2001"; "reformulated and endorsed as Fundamental
Principles of Financial Performance Auditing" 2013; "renamed as Performance
Audit Principles with editorial changes" 2019) and the parallel history for
ISSAI 400 give a latest observed interval of six years (2013→2019),
estimated `releases_per_year: 0.17` per Research.1.md §4's convention for
irregular recurring documents. Minted `intosai-issai-300` and
`intosai-issai-400`, wired `eu-draft-budget -> {both}`, `cites` (a footnote
citation to a named standard, not a claim that either supplies a figure in
the section).

### 4. `eca-annual-work-programme` and `eca-strategy-2026-2030` minted and wired to each other, independently corroborated

*What this rests on*: live retrieval of `WP-2026_EN.pdf` and
`STRATEGY2026-2030_EN.pdf` from `eca.europa.eu`, plus a search confirming
`WP-2024`/`WP-2025`/`WP-2026` as three consecutive annual editions.

SEC05 quotes the ECA's own Work Programme: "Our 2026+ work programme
coincides with the first year of the new ECA 2026-2030 Strategy, which
calls for us to Target our audits where we add most value. We will
therefore focus our work on what we consider to be four strategic areas."
The original entry flagged both endpoints as unretrieved. This session
retrieved both directly and, going further than the original entry, also
retrieved the Work Programme's *own* text independently: "This year the
publication of our 2026 Work Programme coincides with the publication of
the new ECA 2026-2030 Strategy, which calls for us to 'Target our audits
where we add most value'" — an independent corroboration, not a
re-quotation of SEC05. Minted both as nodes (`eca-annual-work-programme`
recurring, `releases_per_year: 1`; `eca-strategy-2026-2030` as a one-off
foundational instrument under the 2026-08-08 recast — checked directly for
a stated predecessor and found none, so not modelled as the recast/recurring
shape). Wired `eca-annual-work-programme -> eca-strategy-2026-2030`,
`methodology_depends_on`, noting and setting aside the Research.1.md §5a
"coincides with" trap (the operative clause is "which calls for us to ...
We will therefore," not "coincides with").

### 5. `eu-reg-2023-2841` minted in isolation; its edge stays exactly as unresolved as the original entry left it, plus a newly-identified second reason

*What this rests on*: `eur-lex.europa.eu`'s own page for CELEX:32023R2841,
confirming the Regulation's existence, title and date.

The original entry withheld this mint on two grounds: cadence (a
Regulation "published once and amended" failed the pre-2026-08-08 node
rule) and an unclear `relationship_type`. The cadence ground is gone —
Research.1.md §4's 2026-08-08 recast makes a one-off foundational
instrument eligible without a stated cadence, and this Regulation reads as
squarely in scope (named, titled, cited with a quantified target).
**Minted `eu-reg-2023-2841` in isolation, fed-h15-style — the edge is
deliberately not drawn.** The `relationship_type` problem is exactly as
open as before. A second problem, not previously written down: `eu-draft-
budget`'s own `url` field points at SEC05 (the ECA's section, see
Orientation item 4), and this entry's source material is SEC06 (the
EESC's), so there is no node yet that a SEC06-sourced edge can legitimately
use as `source`. Both reasons are named in the corrected `_dropped` entry.

## Secondary observations (logged, low priority)

- The three `unpublishable-source` entries and the one corpus-level `note`
  entry in this file were re-read this session and found unchanged; each
  now carries a one-line "READ 2026-08-09" marker rather than being
  silently skipped, per the branch's habit of saying what was and was not
  touched.
- Corpus-count estimate is not attempted this session. `G.57.md`,
  `NZ/G.6.md`, `AU/G.4.md` and `CA/G.1.md` all flagged their own running
  totals as agent arithmetic, not a validator run, and each one compounds
  the last. This file adds five reports and four dependencies to whatever
  base figure is current, and defers to Thomas's next `npm run validate`
  run rather than adding a fifth compounding estimate.

## Corrections to prior sessions

1. **`eu-draft-budget.json`'s "eu-draft-budget -> Eurostat Report of 31
   October" entry — target field CORRECTED**, from `null` to
   `eurostat-remuneration-update-report`. Not a claim that any prior
   session was wrong about the edge (it wasn't mintable then and still
   isn't now) — the correction is narrowly that the entry's own stated
   blocker (no URL, no node) stopped being true on 2026-08-05, four days
   before anyone updated this file to say so. See Finding 1.
2. **No claim in `G.57.md`, `NZ/G.6.md`, `AU/G.4.md` or `CA/G.1.md` is
   disputed.** This session did not re-touch any of their files.

## Thomas's stated priority for the remaining work

Unchanged from `G.57.md`'s lettered blocks A–G; this session's work is
entirely inside **B — the corpus-wide `_dropped` sweep**, Tier-1 item #6 in
`planning/dropped-sweep-scoping_2026-08-08.md`'s suggested order. **Next in
that order**: `ontario-ompf-mpac.json` (Tier-1 #7) and
`realm-government-finance.json` (Tier-1 #8) — both outside this branch's
own folder (Canada/US and Cook-Islands/Niue/Tokelau respectively), so
whoever picks them up next may not write an `EU/G.*.md` file at all. Two
decisions are now waiting on Thomas from this session specifically:

1. **The Eurostat-report bridged-inference question** (Finding 1) — does a
   chain that spans SEC05's own unpublished guidelines letter and a
   separate document's (COM(2025) 736's) description of the general Annex
   XI mechanism clear this project's evidence bar, or does it need SEC05
   itself to name the Eurostat report?
2. **Whether SEC06 (and by extension SEC07-SEC10) should be modelled as
   their own report nodes**, distinct from `eu-draft-budget`/SEC05 — this
   is now blocking two separate `_dropped` entries (the Cybersecurity
   Regulation edge and the EESC-allowance edge), not just one, and is a
   modelling decision rather than a research one.

**Blocks A, C, D, E, F, G untouched this session** — see `G.56.md`/`G.57.md`
for their current state.

## Cheap checks still outstanding

Carried from `G.57.md`, unchanged except where noted:

1. Inbound edges for the four isolated ECB series `G.53.md` minted. Not
   attempted this session.
2. A present-tense source for `ess-sims -> eu-reg-223-2009`. Not attempted.
3. ~~One EUR-Lex fetch to settle a correction~~ — closed since `G.56.md`.
4. Find a citable publication page for the German EDP inventory document
   itself. Not attempted this session (out of this file's scope).
5. **New, this session**: `eca-annual-work-programme` and
   `eca-strategy-2026-2030` are isolated except for the one edge between
   them, `fed-h15`-style — worth a look for any document naming either as
   an input to something else in the graph, the way `G.53.md`'s isolated
   ECB series still need inbound edges (cheap check 1 above).
6. **New, this session**: `intosai-issai-300`/`400`'s cadence estimate
   rests on a `WebFetch`-intermediated read of issai.org, not a direct
   render — worth a direct confirmation if this cadence is ever
   load-bearing for more than an isolated `cites` edge (see each node's own
   `cadence_note`).

## What to pass at the start of next thread

1. **`planning/OPEN-THREADS_2026-08-08.md`** — read first, thread 2.1, for
   the fuller day-by-day sweep narrative this file's single-branch slice
   summarises from (note: this file's own session happened 2026-08-09,
   the day after OPEN-THREADS' filename date — it has not been updated to
   reflect this session; whoever next touches OPEN-THREADS should fold
   this file's headline result in).
2. **This file**, then `G.57.md`, `G.56.md` for everything else in the
   branch.
3. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (node
   rule and sweep scoping), §6 (output format, esp. `relationship_type`).
4. **`src/data/research/eu-draft-budget.json`** — every `_dropped` entry
   this session touched carries its correction inline, original text
   preserved below each one.
5. **`planning/dropped-sweep-scoping_2026-08-08.md`** — for the next two
   files in the suggested order (`ontario-ompf-mpac.json`,
   `realm-government-finance.json`).

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
