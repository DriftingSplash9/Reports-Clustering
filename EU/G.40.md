# G.40.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 — still the document actually in force;
this session drafts a replacement candidate but does not adopt it (see
Findings 1). Research.2.md.docx and Research.eu.docx — read in full in the
predecessor session (`G.39.md`) and merged into a draft in this one.
Predecessor: G.39.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — **the standing brief still in
   force.** Evidence standard, Part A record format, slice schema, the two
   traps, and **the only copy of the §9 node-id list**.
2. **This file**, in full.
3. **`EU/Research.2-merged-DRAFT_2026-08-05.md`** — **a draft merge of
   `Research.2.md.docx` and `Research.eu.docx`, produced this session, not
   yet adopted.** `Research.1.md` itself reserves the decision to issue a
   replacement to "the other end of the process" — this session treats that
   as meaning Thomas, not a research session, and has not switched the
   branch onto the draft. **Read the draft's own opening section
   ("What changed from Research.1.md, and why") before using it for
   anything** — it explains exactly what it resolves and flags one rule
   question explicitly for Thomas's sign-off rather than deciding it
   silently.
4. **The corpus is unchanged from `G.39.md`**: 150 reports, 220
   dependencies, 165 dropped notes. This session added no JSON.
5. Everything else unchanged from `G.39.md`'s list.

**Where things are, as of 2026-08-05 (end of day, twenty-fourth working
session in this file's numbering, and the sixth and last in today's
same-day continuation):**

- **The graph did not grow this session** — pure housekeeping, following
  directly from Thomas's own three-part direction ("sample sec03 more,
  then redirect to the eurosystem/ecb, then... the merge") reaching its
  third part.
- **The branch's longest-standing open item is closed as an editorial
  task**, though not yet activated. `Research.2.md`/`Research.EU.md` have
  been flagged unchanged as priority D since at least `G.19.md`-era
  hand-offs — on the order of twenty sessions.
- `TODO LISTS/rolling-todo.md` — updated this session with one Merged
  entry.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.
`python-docx` needed for `.docx` files.

## Session conditions — read this first

**Sixth and final part of a same-day continuation**, completing Thomas's
own three-part direction from earlier in the day. The predecessor session
(`G.39.md`) located and read both source documents but did not write the
merge itself; this session's entire scope is that write.

What was read first-hand: `EU/Research.2.md.docx` and `EU/Research.eu.docx`
in full — both already read in `G.39.md`, re-read this session in the
course of drafting the merge, not re-fetched from any external source.

What was **not** done, and is a deliberate scope boundary, not an omission:

- **The draft was not adopted as the governing brief.** `Research.1.md`
  remains in force. Whether and how to promote the draft is explicitly
  left to Thomas.
- **The URL-vs-OJ-reference rule question was not decided** — the draft
  narrows Research.eu.docx's relaxation to match observed practice, but
  flags this as exactly the kind of standing-rule change `Research.1.md`
  itself says belongs to "the other end of the process."
- **No new research was performed this session.** Priority C
  (ECB/Eurosystem) and the SEC03 backlog remain exactly where `G.39.md`
  left them.

## Headline result

**The merge that roughly twenty consecutive hand-offs described as blocked
on content questions was actually blocked on a wrong file path the whole
time — and once that was fixed last session, the actual editorial work
took one session, not the many it had been estimated to cost.** All three
substantive differences between `Research.2.md.docx` and `Research.1.md`
are resolved in the draft: the missing §8 priority list, the missing §9 id
codeblock, and the new Part B Output Rule. Research.eu.docx's EU-specific
content (topology, priority queue, legal spine) is folded in rather than
left as a second file a future session has to read in sequence. One
genuine rule question — the URL-vs-Official-Journal-reference relaxation —
is flagged for Thomas rather than settled unilaterally, consistent with
`Research.1.md`'s own statement that changes to the standing brief are not
a session's call to make.

## Findings

### 1. The draft resolves every one of the "five known inputs" prior hand-offs listed, condensed to three real decisions plus one flagged question

`EU/Research.2-merged-DRAFT_2026-08-05.md`, "What changed from
Research.1.md, and why" section. **What this rests on**: direct comparison
of the three documents (`Research.1.md`, `Research.2.md.docx`,
`Research.eu.docx`), all read in full across this session and its
predecessor. The five inputs collapse into three real edits (§8, §9, the
Part B rule) plus one flagged-not-decided rule question (URL/OJ
relaxation) — "the E5 priority-queue reconciliation," cited unchanged
since `G.21.md` without ever being spelled out, turns out to mean folding
Research.1's §8 and Research.EU's §10 into one two-galaxy priority list,
which the draft's own §8 now is.

### 2. `Research.1.md` remains the operative brief; this session did not activate the draft

**What this rests on**: `Research.1.md`'s own text — "This document is
fixed... If it needs to change, the change is made at the other end of the
process and you will be given a Research.2." A session producing that
Research.2 itself, and then switching to using it, would be exactly the
kind of unilateral self-authorisation that sentence is written to
prevent. The draft is a deliverable for Thomas's review, not a
fait accompli.

## Secondary observations (logged, low priority)

- **The draft folds in several EU-branch-specific conventions that neither
  source document had** — the `ecb-*`, `ess-escb-*` and `ecfin-*` id-prefix
  conventions this session's own work established, and a fifth §5a "not a
  dependency" example drawn from `lu-statec-ipcn`'s treatment. These are
  additions beyond a strict merge of the two source documents, flagged as
  such in the draft's own text rather than presented as if they were
  already in either source.

## Corrections to prior sessions

**None new this session.** `G.39.md`'s correction (the file-location error
carried since `G.19.md`-era hand-offs) stands as recorded there.

## Thomas's stated priority for the remaining work

**A — Institutional sections. Closed** since `G.28.md`.

**B — SEC03 meta backlog.** Unchanged from `G.39.md`.

**C — Independent ECB/Eurosystem threads.** Unchanged from `G.39.md` — opened,
not closed.

**D — Housekeeping: merge `Research.2.md` and `Research.EU.md`.** **Draft
complete.** What remains is Thomas's own decision, not further session
work: whether to adopt `EU/Research.2-merged-DRAFT_2026-08-05.md` as the
new governing brief (in which case it should presumably be renamed and
moved to the project root, replacing or supplementing `Research.1.md`,
per his own call), request changes, or leave `Research.1.md` in force
indefinitely. **A future session should not treat the draft as adopted
without an explicit instruction to do so.**

**E — Everything the blob split created.** Unchanged from `G.39.md`.

**F — The German sub-graph.** Unchanged.

## Cheap checks still outstanding

**Unchanged from `G.39.md`** — this session did no research, only
housekeeping. Full list, by value per unit effort:

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

1. **This file (`G.40.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — **still the operative governing brief.** Pass this,
   not the draft, unless Thomas has explicitly said to switch.
3. **`EU/Research.2-merged-DRAFT_2026-08-05.md`** — flag its existence to
   Thomas if he has not seen it; do not silently start using it as
   authoritative.
4. **No new JSON slice this session.**
5. **A browser** (the `Claude_Browser` tool) — for the cheap checks list
   above, all unchanged from `G.39.md`.
6. **The next target**: **ask Thomas whether to adopt the draft** before
   anything else, since every subsequent session's Orientation section
   depends on which brief is actually in force. Absent that, resume
   priority C (ECB/Eurosystem staging batches) or Eurobarometer (cheap
   check 1) as the next research thread.

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
