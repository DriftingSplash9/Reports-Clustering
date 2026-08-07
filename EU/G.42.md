# G.42.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: `Research.1.md` v3.0 — **amended by this session** (§9 only;
see Findings 1). No other section touched or re-read cover to cover.
Predecessor: G.41.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — **v3.0, §9 now complete.** The
   node-id list covers both galaxies: the Canada/US list carried forward from
   v1.0, plus, new this session, **17 EU-branch ids** (`EU`/`DE`/`LU`
   countries). No more caveats needed when citing §9 as authoritative.
2. **This file**, in full.
3. **Everything else unchanged from `G.41.md`'s list.**

**Where things are, as of 2026-08-05 (end of day, twenty-sixth working session
in this file's numbering, eighth in today's continuation):**

- **`G.41.md`'s cheap check 1 (the §9 EU-id backfill) is done**, same day it
  was filed. `Research.1.md` §9 now lists all 17 EU-branch node ids
  (`de-destatis-national-accounts`, `ec-statement-of-estimates`,
  `ecb-eurosystem-annual-balance-sheet`,
  `ecb-eurosystem-weekly-financial-statement`,
  `ecfin-business-consumer-surveys`, `esa-2010`,
  `ess-escb-mip-quality-report`, `eu-draft-budget`,
  `eurostat-farm-structure-survey`, `eurostat-hicp`, three
  `eurostat-remuneration-*-interim-report`/`-rent-survey` ids,
  `eurostat-remuneration-mission-expenses-report`,
  `eurostat-remuneration-update-report`, `lu-statec-ipch`, `lu-statec-ipcn`).
- **The gap was smaller than estimated.** `G.41.md` guessed "30+ ids" pending
  transcription; the actual, exhaustively-extracted count is **17** — see
  Findings 1 for why the earlier estimate was too high.

## Session conditions — read this first

**Eighth part of today's continuation**, directly on Thomas's instruction to
do the §9 backfill flagged in `G.41.md`. No document was read first-hand;
this was a data-extraction session against the corpus's own JSON, not
research.

## Headline result

**The §9 gap flagged in `G.41.md` is closed the same day it was found.** The
extraction was mechanical and exhaustive rather than a hand-copy: every report
object across all 36 files in `src/data/research/` was parsed by its `country`
field, not grepped by filename, so member-state nodes whose filename doesn't
self-announce a country (none turned up, but the method would have caught one)
would not have been missed. `Research.1.md` §9 is now a complete two-galaxy
list for the first time in the branch's history.

## Findings

### 1. The EU-branch id count is 17, not the "30+" `G.41.md` estimated

**What this rests on**: a Python pass over every `src/data/research/*.json`
file's `reports[].id`, filtered on `reports[].country` in `{EU, DE, LU}`
(country, not filename or id prefix, so nothing with an EU-branch id but a
mismatched filename would slip through). Cross-checked two ways: (a) against
`src/data/index.ts`'s import list, confirming all 12 EU-related files are
actually registered, not just present on disk; (b) a full country-code
tally across every research file (`CA 87, US 17, INT 11, EU 14, DE 1, LU 2`
— 132 total, consistent with `G.39.md`'s "150 reports" once the seed set in
`src/data/reports.ts` — confirmed `CA`/`US` only, no EU-branch nodes hiding
there — is added). **`G.41.md`'s "30+" figure was an unverified guess made
without running the extraction**; the real number is under a third of that.
One filename/id mismatch was caught in passing: `eu-draft-budget.json` also
contains a second report, `ec-statement-of-estimates`, not visible from the
filename alone — exactly the kind of thing a filename-based backfill would
have missed and the country-field method did not.

## Secondary observations (logged, low priority)

- **None this session** beyond Finding 1's own detail.

## Corrections to prior sessions

1. **`G.41.md`'s estimate of "30+" EU-branch ids needing backfill is
   overstated.** The actual count, exhaustively extracted, is 17. Not a
   content error — `G.41.md` explicitly declined to guess-transcribe rather
   than risk drift — but the stated figure was an unverified guess and is
   corrected here.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged from `G.41.md`.

**C — Independent ECB/Eurosystem threads.** Unchanged from `G.41.md` —
opened, not closed.

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`. Closed**,
per `G.41.md`.

**E — Everything the blob split created.** **The §9 backfill item is done and
removed from this list.** Staging batches 47, 51–56, 61–62, 69–72 remain.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Done since `G.41.md`: the §9 EU-id backfill** (Findings 1). Remaining,
unchanged, by value per unit effort:

1. Verify and mint Eurobarometer (S03-23, `SEC03_Title06-07_PartA_2026-08-05.md`).
2. The second joint ECB-Eurostat report (ECB-07, "BOP-NA ROW consistency
   report").
3. Read EBS Regulation 2019/2152.
4. Regulation (EU) 2021/1058 / 2021/1060 — Title 05's GDP/GNI
   classification lead.
5. Regulation (EC) No 1217/2009 / (EU) 2023/2674 / (EU) 2018/1091 — the
   Farm Sustainability Data Network's founding instruments (S03-12).
6. Staging batches 47, 51–56, 61–62, 69–72.
7. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies.
8. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
   metadata.
9. Split `list-main-stats-2025-na` into nine records.
10. Re-measure E4 keying on quote, not id, and reconcile.
11. Delete `scripts/eu-schema-smoke.ts`.
12. Pull the `[NA-Pen] / Table 29` thread.
13. Check whether SEC09's total-level sign flip has a stated explanation
    elsewhere (`G.28.md` finding 1).
14. Search for a titled GNI deflator publication, following SEC01's S01-02
    lead.
15. Reconcile `EU Meta jsons.docx`'s SEC09/SEC10 batches.
16. Read Art. 11 of the loi modifiée du 22 juin 1963.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.42.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — **v3.0, §9 now complete for both galaxies.** Cite it
   without caveat.
3. **No new JSON slice this session.**
4. **A browser** (the `Claude_Browser` tool) — for the cheap checks list
   above, unchanged from `G.41.md`.
5. **The next target**: no housekeeping items remain open. Resume priority C
   (ECB/Eurosystem staging batches) or Eurobarometer (cheap check 1) as the
   next research thread.

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
