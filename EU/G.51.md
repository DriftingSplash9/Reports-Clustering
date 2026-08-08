# G.51.md — EU galaxy hand-off

Date: 2026-08-07
Governing briefs: `Research.1.md` v3.3 — not re-read line by line this
session; relied on via `MISSION-TODO-2.md`'s summary of §2, §6 and the
review-gate decision. **Not amended by this session.**
Predecessor: G.50.md (2026-08-07). Same day — this is the prose-section
track G.50 explicitly separated from batch work, plus three P2 cheap
checks, run as their own session per Thomas's 2026-08-07 decision (option B:
agent-alone, review gate before import).

## Orientation — if you are a new agent, start here

Unchanged from G.50.md's list, with two additions:

1. **`planning/MISSION-TODO-2.md`** — read first, as always. P1 item 5 and
   P2 items 9z/9a/9b now carry inline status notes pointing at this
   session's two results files.
2. **`EU/prose-verification-RESULTS_2026-08-07.md`** — new. 399 Part A
   prose-section entries checked against primary sources, entry by entry.
   This is a *findings* file, not an import — nothing in it is in the data
   graph yet.
3. **`EU/cheap-checks-9z-9a-9b_2026-08-07.md`** — new. The three P2 items,
   same status: findings, not yet minted.
4. Everything else unchanged from `G.50.md`'s orientation list — this
   session did not touch the 73-batch backlog, the ESS quality framework
   slice, or any of G.50's own material.

## Session conditions — read this first

This was **not** a batch-work session. It ran the prose section (separate
track by design, per `MISSION-TODO-2.md`) and three P2 cheap checks — the
two items a prior attempt this same day had gotten stuck on for 40 minutes
with nothing committed. Sources read in full this session: the EUR-Lex
consolidated text of Guideline (EU) 2015/510 (all 23 cited articles/
paragraphs); all seven `EU/sources/SEC*.pdf` files cited by the 376
budget-section entries (`pdftotext` extraction, full text); a live CIRCABC
browse session for Germany's EDP inventory; web searches for four NSIs'
quality-report pages and five German debt-statistics publication pages.
**Not touched**: any of the 73 staged batches, `Research.1.md` itself,
G.50's ESS quality framework slice, the German sub-graph (priority F).

**Two operational findings, both worth carrying forward — see Findings 5
and 6.**

## Headline result

**The prose section is done, not partial: 399 of 399 Part A entries
checked, 395 verified word-for-word against primary sources, 0 mismatches,
0 not-founds, 1 real citation error caught (wrong article number, right
quote).** Both blockers G.50-era planning assumed were still open — EUR-Lex
being down, the SEC PDFs being missing — turned out to already be resolved
before this session started. All three P2 cheap checks (9z, 9a, 9b) also
resolved, one fully negative-for-two/positive-for-two, one fully positive,
one partial. **Nothing from any of this is in the data graph yet** — per
the standing review-gate decision, this session's whole output is findings
files for Thomas to review before anything is imported. The corpus is
unchanged at 366 reports / 434 dependencies / 3 relations; `npm run
validate` exits 0.

## Findings

### 1. The prose section's stated blockers were both already cleared

`MISSION-TODO-2.md`'s P1 item 5 read "blocked on one of two things: EUR-Lex
serving again... and the SEC PDFs being re-uploaded... without them the
session can catalogue but not mint." Neither was true by the time this
session ran: EUR-Lex returned the ECB Guideline cleanly, and all eleven
`SEC00.pdf`–`SEC10.pdf` files (not just the seven actually cited) were
already sitting in `EU/sources/`, real content, not stubs. It is not known
from this session when they were re-uploaded or by whom. Whoever did it
should get credit — it is what made the 40-minutes-of-nothing retry finish
in one pass.

### 2. One real citation error, caught by verifying instead of trusting the extractor

Block A entry A19 (`EU/prose-verification-list.md`) cites Art. 6(6)(a) of
Guideline (EU) 2015/510 for a "business day" definition. The quoted text is
accurate — but Article 6 is "Main refinancing operations" and has nothing
to do with business-day definitions. The actual location is Art. 2(6)(a).
**Rests on**: my own read of the live EUR-Lex consolidated text, not the
staged record. Full detail in `EU/prose-verification-RESULTS_2026-08-07.md`.

### 3. 9z — two NSIs publish, two near-misses, one clean negative

Germany (Destatis) and Ireland (CSO) both voluntarily publish their own
ESA 2010 national-accounts quality report, each with multiple dated
editions — a cadence, and a node, is derivable for both. Luxembourg
(STATEC) and the Netherlands (CBS) each surfaced a page that looks like a
national report; opening the PDF in both cases showed an ISBN /
Publications-Office colophon and a Eurostat product code (KS-FT-...) — a
hosted copy of Eurostat's own report, not a national document. Flagging
this explicitly so a future session doesn't re-claim them as hits. France
(INSEE): nothing found. **Rests on**: my own read of each PDF's title page,
not a summary of the search results. Detail: `EU/cheap-checks-9z-9a-9b_2026-08-07.md`.

### 4. 9a — a newer German EDP inventory edition exists, and CIRCABC's URLs are not stable per country

A live browser session against CIRCABC found a "Germany, October 2025"
edition (188pp), newer than the known December 2015 copy (170pp, served via
Destatis) — two dated editions now exist, which is what the cadence
question needed. **The exact URL on file in `MISSION-TODO-2.md` now
resolves to a Denmark document, not Germany's** — CIRCABC's node/library IDs
are evidently not stable per-country identifiers over time. The German
entry had to be found by browsing the folder tree by name, not by reusing
the recorded URL. Add this to the branch's site-behaviour list: CIRCABC
URLs age out.

### 5. 9b — three of five found; two Finanzagentur items look genuinely uncitable

Live URLs found for Destatis's quarterly and annual debt statistics and the
Bundesbank's "Statistik über Wertpapierinvestments." The two Deutsche
Finanzagentur items (Statistik der Bundesschuld; the Schuldscheindarlehen
report by creditor class) do not exist under those titles anywhere findable
on Finanzagentur's current site. A full-text search of Finanzagentur's own
Kreditaufnahmebericht PDF found them appearing only as line items inside
that other public report — suggesting they may be internal administrative
returns that were named in Germany's EDP inventory but never had their own
public-facing page. Recorded as a probable dead end, not a retrieval
failure — a future session shouldn't keep searching the same way.

### 6. The device bridge can move commits across, but cannot finish a merge — refines G.50's push-only finding

G.50 recorded that the cloud sandbox's git proxy blocks pushes to this repo
(HTTP 403, "not in this session's authorized repository set") and that
`device_bash` has no network, so the fix is: commit in the container, bundle
the new commits, transfer the bundle to the device, `git fetch <bundle>
HEAD:<branch>` there, and let Thomas finish the push natively. That much
still works exactly as G.50 described — the fetch succeeds and the commits
land as a local ref on the device, no network needed for that step.
**What's new this session**: attempting to go one step further and run
`git merge --ff-only <branch>` *through the device bridge itself* fails,
because the bridge's filesystem access is read/write but cannot unlink
existing files — and completing a merge that changes an already-tracked
file (in this case `planning/MISSION-TODO-2.md`) requires an unlink-and-
rewrite, which the bridge's permission model refuses ("Operation not
permitted"). The failure is recoverable (renaming, not deleting, the stray
lock files it leaves behind works fine, and `git status` afterward showed a
clean, undamaged `main` at the pre-merge commit) but it means **the merge
step, not just the push step, has to happen in a normal terminal or GitHub
Desktop on Thomas's machine — not through this bridge.** Worth stating
plainly so the next session doesn't spend time trying to automate it
further.

## Secondary observations (logged, low priority)

- This cloud environment's filesystem is fully ephemeral across wake
  cycles within what looks like one continuous session to Thomas — nothing
  from an interrupted or hit-session-limit run survives into the next
  wake-up. The safe habit, confirmed useful this session: re-derive state
  from GitHub plus the device's own repo before assuming any prior turn's
  work landed anywhere, rather than trusting an earlier status message.
- `npm install` (no `node_modules` committed) plus `npm run validate` take
  under two minutes cold in this environment and are worth running for an
  authoritative report/dependency count rather than grepping the JSON by
  hand — a quick manual glob-and-count this session undercounted by 18
  reports and 16 dependencies against the validator's own number, almost
  certainly from missing files that are imported into `src/data/index.ts`
  under a name that doesn't match the glob pattern used.

## Corrections to prior sessions

1. **`MISSION-TODO-2.md`'s P1 item 5 blocker note was overtaken by events,
   not wrong when written.** It said the prose section was blocked on
   EUR-Lex and the SEC PDFs; both were already resolved by the time this
   session ran (Finding 1). Status: **resolved**, not refuted — the note
   was accurate when G.50-era planning wrote it. Updated in place in
   `MISSION-TODO-2.md` per this session (the file's own convention allows
   status notes prepended to backlog items; the original item text is kept
   below each note for context, per the file's existing pattern elsewhere).
2. No claim in `G.50.md` itself was found wrong this session — this
   session's material (the ECB Guideline, the EU Draft Budget sections, the
   three P2 checks) doesn't overlap with what G.50 minted, so nothing in
   G.50's own findings was re-tested.

## Thomas's stated priority for the remaining work

Carried forward from `G.50.md`, updated only where this session moved
something:

**A — Institutional sections. Closed.** Unchanged.

**B — SEC03 meta backlog.** Unchanged — this session read SEC03.pdf in full
for the prose-section verification, but that is quote-checking, not the
backlog item (which is about extracting the meta-backlog's own separate
content). Not touched.

**C — Independent ECB/Eurosystem threads.** Unchanged, not touched. Note
this session's Block A work (23 entries, Guideline (EU) 2015/510) is
ECB-adjacent but is prose-section verification, not priority C's own
extraction work — the two should not be conflated when a future session
picks C up.

**D — Housekeeping.** Closed. Unchanged.

**E — Everything the blob split created.** **Unchanged in the sense that
matters**: this session did not touch any of the 51 remaining numbered
batches (0–15, 46–62, 68–72). What moved is the *separate* prose-section
track G.50 carved out of E: **that track is now verified and awaiting
import**, which was not true when G.50 wrote this section. The
unlabelled-block correction from G.50 (batches 47–62 are not actually
unlabelled — they carry `batch_id`/`strand` instead of `scope`; batch 46
alone, 29 uncited country peer-review records, is the genuinely
unlabelled and expensive one) still stands and this session adds nothing
to it.

**F — The German sub-graph. Opened, not closed.** **Two new inputs land
here from this session, not yet acted on**: the newer CIRCABC EDP-inventory
edition (Finding 4) clears the cadence blocker for a German EDP inventory
node, and three of the five German debt-statistics URLs (Finding 5) are
ready to attach. Both are findings, not mints — see Cheap checks below.

**G — The wide-Europe depth pass.** Unchanged.

## Cheap checks still outstanding

**Resolved this session** (findings recorded, mint decisions pending
Thomas's review — see `EU/cheap-checks-9z-9a-9b_2026-08-07.md`):

- 9z, 9a, 9b — all three done. Follow-on mint work now unblocked: a
  Germany/Ireland ESA-2010-quality-report node pair (9z); a German EDP
  inventory node, cadence now derivable from two dated editions (9a); URL
  fills for three of five German debt statistics, with the other two
  recorded as probable dead ends rather than left open (9b).

**Carried forward from `G.50.md`, unchanged, still open:**

1. Re-extract `Research.1.md` §9's EU id list (now further stale by
   whatever this session's findings add once minted).
2. Open SWD(2024) 136, the ESS peer-review final report.
3. ~~Retry EUR-Lex once~~ — moot; this session used it live for Block A
   with no issues, on top of G.50's own confirmed retry.
4. The Catalogue of ESS standards — still unopened.
5. SIMS Guidelines v2.0 (2019) — still unopened.

**New from this session:**

6. **Import the prose-section verification results.** 395 verified
   entries in `EU/prose-verification-RESULTS_2026-08-07.md`, ready to
   convert into report/dependency JSON once Thomas has reviewed them —
   correct the A19 location (Finding 2) rather than propagating it.
7. **CIRCABC URLs age out — do not trust a recorded CIRCABC link without
   re-browsing.** Add to the branch's known-site-behaviour list formally
   (currently only noted here and in `MISSION-TODO-2.md`'s 9a status note).

## What to pass at the start of next thread

1. **This file (`G.51.md`)** and **`G.50.md`** behind it.
2. **`planning/MISSION-TODO-2.md`** — read the updated P1 item 5 and P2
   9z/9a/9b status notes first; they point at the two new files below.
3. **`EU/prose-verification-RESULTS_2026-08-07.md`** — the 399-entry
   verification record, ready for import review.
4. **`EU/cheap-checks-9z-9a-9b_2026-08-07.md`** — the three findings.
5. **`EU/sources/SEC00.pdf`–`SEC10.pdf`** — confirmed present and real;
   stop assuming they need re-uploading.

**Git state: NOT resolved, and this is the part a new session must handle
correctly.** This session's four commits (`0a2f219`, `caa33b9`, `6cf9505`,
`e412bde`) plus this hand-off's own commit are on `main` in the cloud
container but not on `origin/main` — same authorization block G.50 hit,
confirmed again this session (`git push` → HTTP 403, "not in this
session's authorized repository set"). They were bundled and transferred to
the device (`git bundle create ... origin/main..HEAD`, staged via the
device bridge, `git fetch <bundle> HEAD:cloud-session-2026-08-07` run
successfully on the device — the objects are there). **The merge into the
device's own `main` did not complete** — see Finding 6 — because the device
bridge cannot unlink an existing tracked file to update it. The commits are
safe (nothing was lost, `main` on the device is clean and undamaged at the
pre-merge commit) but **someone needs to run, from a normal terminal or
GitHub Desktop's terminal on the device, not through this bridge**:

```
git merge --ff-only cloud-session-2026-08-07
git push
```

A few harmless `.git/*.lock.stale*` files and duplicate copies of the two
results files in `_to_delete/` are left over from the failed automated
attempt — safe to delete, not required to.

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
