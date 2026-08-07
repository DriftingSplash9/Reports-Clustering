# G.41.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: `Research.1.md` v3.0 — **this session's own action put it into
force**; see Headline result. Not independently re-read cover to cover this
session beyond the sections touched.
Predecessor: G.40.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — **v3.0, adopted this session.** This is
   now the merged brief that `G.40.md` drafted — do not read the old v1.0 or the
   draft file, both superseded. The only copy of the §9 node-id list lives here,
   and as of this session that list is **known incomplete for the EU galaxy**
   (see Findings 2).
2. **This file**, in full.
3. **Everything else unchanged from `G.40.md`'s list** — no new JSON, no new
   research this session either.

**Where things are, as of 2026-08-05 (end of day, twenty-fifth working session
in this file's numbering, seventh in today's continuation):**

- **Priority D is now fully closed**, not just drafted. `Research.1.md` v3.0 is
  at the project root. The superseded v1.0 is archived at
  `EU/Research.1-superseded_2026-08-05.md`. The draft file
  (`EU/Research.2-merged-DRAFT_2026-08-05.md`) still exists on disk but is now a
  dead duplicate — nothing points to it as authoritative.
- **The one flagged rule question from `G.40.md` is decided.** Thomas confirmed
  the draft's own proposed middle position: §2 reads "a URL, or an Official
  Journal reference paired with its ELI URL" — OJ citations remain acceptable,
  never as a substitute for a live URL.
- **A new gap was found and deliberately not fixed silently**: §9's node-id
  list has never, at any point in the branch's history, included a single
  EU-branch id (`eurostat-*`, `ecb-*`, `de-destatis-*`, `lu-statec-*`,
  `ecfin-*`, `ess-escb-*`) despite the corpus holding 150 EU reports as of
  `G.39.md`. It predates the EU branch and nobody backfilled it when the
  branch opened. Now on the backlog explicitly (Findings 2, priority E below).

## Session conditions — read this first

**Seventh and final part of today's continuation**, on Thomas's direct
instructions given in chat, not as research: (1) adopt `G.40.md`'s merged draft
as the governing brief and move it to the project root, (2) decide the §2
URL/OJ rule question the draft had flagged for him, (3) add the §9 EU-id gap to
the branch backlog. No document was read first-hand this session beyond the
three files already in hand from `G.39.md`/`G.40.md`; this was an editorial and
bookkeeping session, not a research one.

## Headline result

**Priority D — the branch's longest-standing open item, roughly twenty
sessions unresolved — is closed as of this session, not merely drafted.**
`Research.1.md` v3.0 is live at the project root. In the course of adopting it,
a second, smaller housekeeping gap surfaced: §9's node-id list has silently
never covered the EU galaxy, which is exactly the kind of thing this branch's
own convention says to flag rather than quietly patch. It is now recorded as a
backlog item rather than fixed by hand-copying ids under time pressure.

## Findings

### 1. The §2 URL/OJ rule is settled

**What this rests on**: Thomas's direct answer in chat, choosing the `G.40.md`
draft's own proposed reading over the two alternatives offered (strict
URL-only; bare-OJ-allowed per `Research.eu.docx`'s original wording). §2 of
`Research.1.md` v3.0 now reads "a URL, or an Official Journal reference paired
with its ELI URL" as the permanent rule, not a flagged draft position.

### 2. §9's node-id list has never included any EU-branch id

**What this rests on**: a direct grep of the superseded v1.0 brief's §9
codeblock, run this session — zero matches for `eurostat`, `ecb-`,
`de-destatis`, `lu-statec`, `ecfin-`, `ess-escb`, `eu-draft-budget`. Every prior
hand-off's Orientation section pointed at "`Research.1.md` §9" as "the only
authoritative copy" without anyone checking whether it actually enumerated the
EU corpus. It does not. **Not backfilled this session** — hand-transcribing
30+ ids from `src/data/research/*.json` under this session's narrow scope
risks exactly the transcription drift §9 itself warns against (`statcan-cpi`
vs `statcan-consumer-price-index`, "has happened twice"). Filed as a backlog
item instead (priority E, cheap checks 1).

## Secondary observations (logged, low priority)

- **`EU/Research.2-merged-DRAFT_2026-08-05.md` is now a dead file.** Harmless,
  but a future session should not be confused by its continued presence — it
  is the same content as the root `Research.1.md`, just under its pre-adoption
  name.

## Corrections to prior sessions

**None new this session.** `G.39.md`'s file-location correction stands as
recorded there; nothing this session's narrow editorial scope touched
contradicts anything in `G.40.md`.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged from `G.40.md`.

**C — Independent ECB/Eurosystem threads.** Unchanged from `G.40.md` — opened,
not closed.

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`. Closed.**
Adopted and moved to root this session. **No further work needed on this
item** — it is done, not merely drafted. Any future reference to "priority D"
in older hand-offs (`G.20.md` through `G.40.md`) refers to work that is now
complete.

**E — Everything the blob split created.** Unchanged from `G.40.md`, **plus
one new item**: backfill `Research.1.md` §9 with the EU galaxy's node ids,
sourced from `src/data/research/*.json` filenames or `src/data/index.ts`
(current source of truth), reconciled properly rather than hand-copied under
time pressure. Staging batches 47, 51–56, 61–62, 69–72 remain here too.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**New this session:**

1. **Backfill `Research.1.md` §9 with the EU-branch node-id list.** Currently
   absent entirely (Findings 2). Source: `src/data/research/*.json` filenames,
   cross-checked against `src/data/index.ts`'s import list so nothing recently
   added is missed. Do this as its own careful pass, not a quick copy — the
   whole point of §9 is that its strings are exact and guessable, and a sloppy
   backfill would introduce the duplication problem it exists to prevent.

**Unchanged from `G.40.md`, by value per unit effort:**

2. Verify and mint Eurobarometer (S03-23, `SEC03_Title06-07_PartA_2026-08-05.md`).
3. The second joint ECB-Eurostat report (ECB-07, "BOP-NA ROW consistency
   report").
4. Read EBS Regulation 2019/2152.
5. Regulation (EU) 2021/1058 / 2021/1060 — Title 05's GDP/GNI
   classification lead.
6. Regulation (EC) No 1217/2009 / (EU) 2023/2674 / (EU) 2018/1091 — the
   Farm Sustainability Data Network's founding instruments (S03-12).
7. Staging batches 47, 51–56, 61–62, 69–72.
8. Fetch and hash SEC01/02/03/06/07/08/09/10 against local copies.
9. Retry `agridata.ec.europa.eu` / `agriculture.ec.europa.eu` for FADN's own
   metadata.
10. Split `list-main-stats-2025-na` into nine records.
11. Re-measure E4 keying on quote, not id, and reconcile.
12. Delete `scripts/eu-schema-smoke.ts`.
13. Pull the `[NA-Pen] / Table 29` thread.
14. Check whether SEC09's total-level sign flip has a stated explanation
    elsewhere (`G.28.md` finding 1).
15. Search for a titled GNI deflator publication, following SEC01's S01-02
    lead.
16. Reconcile `EU Meta jsons.docx`'s SEC09/SEC10 batches.
17. Read Art. 11 of the loi modifiée du 22 juin 1963.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this
file.**

1. **This file (`G.41.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — **v3.0, at the project root, fully adopted.** No
   longer a draft; no caveats needed when citing it.
3. **No new JSON slice this session.**
4. **A browser** (the `Claude_Browser` tool) — for the cheap checks list
   above, all unchanged from `G.40.md` except the new item 1.
5. **The next target**: cheap check 1 (the §9 EU-id backfill) is now the
   cheapest outstanding housekeeping item and a reasonable first pick: it is
   pure transcription against a known source, no research required. Otherwise
   resume priority C (ECB/Eurosystem staging batches) or Eurobarometer (cheap
   check 2) as the next research thread.

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
