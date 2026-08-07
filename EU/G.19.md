# G.19.md — EU galaxy hand-off

Date: 2026-08-04
Governing briefs: Research.EU.md v0.1 (fixed) + Research.2.md v2.1 (fixed) — **still not seen. Fourth session.**
Predecessor: G.18.md (2026-08-04).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order, before doing anything:

1. **`Research.1.md`** (project root) — the standing research brief. Evidence
   standard, Part A record format, slice JSON schema, the two traps
   ("comparable with" is not a dependency; a past-tense clause can describe a
   dead arrangement), and the existing node-id list. Not negotiable, and not
   summarised accurately anywhere else.
2. **This file**, in full — the current state of the EU branch.
3. **`EU/slices/README.md`** — folder layout for EU data, and a **blocker** on
   `src/lib/types.ts` that stops any EU slice being imported until Thomas takes
   a decision.
4. `REPORTS.md` (project root) only if the *direction* is in question, not for
   routine work.

Then say what the branch is doing and what is next. The answer to "what is next"
lives in *Thomas's stated priority for the remaining work*, below.

**Where things are, as of 2026-08-04:**

- `EU/` — this branch. `SEC00.pdf`–`SEC10.pdf` (the institutional budget
  sections), the `G.*` hand-off logs and their `.json` sidecars, the governing
  briefs as `.docx`, `Soft Connections.docx`, and `EU Meta jsons.docx`.
- `EU/slices/` — where verified EU graph data lands. `eu-level/`,
  `member-states/`, `cross-layer/`, and `_staging/`. **Nothing here is verified
  or imported yet.**
- `EU/slices/_staging/` — the mechanical pre-split of the blob, plus
  `PROMPT-for-splitting-agent.md`.
- Project root — `REPORTS.md`, `START-HERE.md`, `BACKLOG.md`, `EXPANSION-V1.md`,
  `Research.1.md`, `README.md`. Canada/US session logs are in `sessions/`; raw
  external research in `research-input/`; scratch in `notes/`.
- `TODO LISTS/rolling-todo.md` — cross-session working queue. Add to it rather
  than letting a thread die with a loose end in it.

**Filesystem access matters.** This branch used to run in chat threads where
documents had to be pasted or attached, and the older hand-offs are written for
that world. If you can read the folder directly, ignore every instruction about
what to attach — fetch it yourself. If you cannot, *What to pass at the start of
next thread* is your packing list, and say so in *Session conditions*.

## Session conditions — read this first

Session type: **infrastructure, not research.** This session read no source
document, extracted no record, verified no edge and proposed no node. Everything
below is about the material that already existed and the shape it is now in.
Treat the corpus as unchanged since G.18 in every respect that the evidence
standard cares about.

What was available and used: **full filesystem access and working Python.** This
is the first session in the branch's history with either. It is why the work
below was possible in one pass, and it invalidates a planning assumption three
sessions old — see *Corrections*, item 1.

What was **not** done, stated plainly because everything downstream inherits it:

- No `SEC*.pdf` was opened. The six cheap checks G.18 left outstanding are all
  still outstanding, unchanged.
- `Soft Connections.docx` was not opened. Part B is untouched, still stuck at
  sc-46 per G.18.
- **The governing briefs still did not arrive.** `Research_2_md.docx` and
  `Research_eu.docx` sit in `EU/` as `.docx` and were not read this session. The
  D-item merge is now four sessions outstanding. Note that this blocker is now
  self-inflicted rather than external: the files are on disk and readable, and
  nothing but the absence of an instruction stopped them being opened.
- No content of the blob was judged. The split was mechanical and deliberately
  so; no record was read for meaning, no id was minted, nothing was mapped to
  the graph schema.

## Headline result

**`EU Meta jsons.docx` is not one corpus. It is two research strands that were
accumulating in the same file, and only one of them is what the branch has been
talking about.**

The split makes the composition legible for the first time:

| Strand | Shape in the blob | Volume |
|---|---|---|
| **Statistical / Eurostat** — SRC, ESA 2010, Code of Practice, ESGAB, EDP, CPA/NACE, Destatis, ECB/Eurosystem | 73 batch objects with `part_a_records` arrays, ids like `src-2026-*`, `esa-*`, `destatis-*` | **659 record entries**, 563 with unique ids |
| **Institutional budget** — the SEC00–SEC10 work every `G.*` log has been about | Loose records, **not** inside any batch, ids `S04-001`…, matching the `S04-143` / `S07-045` citations in G.16–G.18 | **146 records, all SEC04** |

Neither strand knew about the other. The `S`-numbered records are the extraction
record behind G.18's findings, and they have been sitting in the same file as an
entirely separate Eurostat programme that no `G.*` log discusses at all.

**The practical consequence: the branch has substantially more finished
extraction than any document claims.** 814 distinct Part A records, against a
`G.*` narrative that describes one section extracted and three read. The
Eurostat strand is the surprise, and it is the larger of the two.

## Findings

### 1. What the blob actually contains, measured

Text layer: **1,290,691 characters**, 12,503 lines. Of that:

- **67.4%** parses as valid JSON — 383 top-level objects.
- **30.5%** (393,571 chars) is a single prose section, split out to
  `20-prose-sections.txt`.
- The remaining ~2% is array-separator noise between records.

So essentially nothing is unaccounted for. Object census:

| Shape | Count |
|---|---|
| batch with `part_a_records` | 73 |
| loose record (`id`/`url`/`location`/`quote`/`names`/`tense`/`notes`) | 301 |
| batch header (scope/session metadata, no records) | 8 |
| `part_b_soft_connections` | 1 |

Batch sizes run 3–47 records, median around 8. **54 distinct scope labels**
across the 73 batches, and 182 records sit in batches carrying no scope
statement at all — those will need grouping by content rather than by metadata.

### 2. The loose records are not noise, and 251 of them are new

This was checked rather than assumed, because the answer changes the corpus size:

- 300 unique loose ids.
- **49 also appear inside a batch** — genuine duplicates, and the later-wins rule
  in `src/data/index.ts` does not apply here because these are Part A records,
  not edges. Which copy is authoritative is unresolved.
- **251 appear nowhere else.**

Distinct Part A records overall: **814**. The in-batch arrays hold 659 entries of
which only 582 carry an `id` at all — so 77 entries are id-less and need a look
before they can be cited. Under this project's own packaging rule (`Research.1.md`
§6: an entry without a citable location is discarded), an id-less record is at
risk, and 77 is too many to lose without checking why.

### 3. The Eurostat strand's natural slice boundaries are already visible

From the scope labels, without reading any record for meaning. Offered as a
starting grouping, not a decision:

- **Statistical Requirements Compendium 2026** (47 records) — the largest single
  batch, and the legal-basis index for everything else.
- **ESA 2010 / Regulation 549/2013** — Articles 1/3, Annex A sector
  classification, the 50% market/non-market threshold, the Annex B transmission
  programme.
- **Statistical governance** — Code of Practice 2017 (17 + 10), ESGAB annual
  reports (12 + 9), peer review compliance (9), ESSC legal basis and rules of
  procedure (9 + 9), Regulation 223/2009 (13).
- **EDP / fiscal surveillance** — Council Reg 479/2009 (10), quarterly
  non-financial accounts for general government (11), MGDD.
- **Classifications** — CPA / Reg 451/2008 (8), CPA↔NACE correspondence (5).
- **Supply-use and input-output** — Eurostat SUT manual (18).
- **Metadata standards** — SIMS (9), Commission Recommendation 2023/397 (27).
- **A member state** — Destatis GNI and QNA inventories.
- **ECB / Eurosystem** — consolidated balance sheet legal framework (9), plus
  the whole prose section.
- **SWD(2024) 136** — third-round peer review final report (44 records).

That last one is worth noting: 44 records on a peer-review report is the
second-largest concentration in the blob, and no `G.*` log mentions it.

### 4. The prose section is one ECB/Eurosystem batch, and it is the only part no script can take

393,571 characters, opening:

> "Part A — Extraction Record
> Batch date: 2026-08-03 Source document opened: Guideline (EU) 2015/510 of the
> European Central Bank of 19 December 2014 on the implementation of the
> Eurosystem monetary policy framework (General Documentation Guideline)
> (ECB/2014/60) (recast) — consolidated text…"

It is Part A in the correct *content* shape — URL, location, quote, names — but
delivered as prose rather than JSON, so nothing can index it mechanically. It is
roughly 30% of the blob by volume and should be its own session.

### 5. `src/lib/types.ts` cannot express an EU node, and the type says so itself

The most consequential thing found this session, and it is not in the blob.

```ts
export type Country = 'CA' | 'US' | 'INT'
```

Its own comment:

> `INT` means "neither Canadian nor American", which covers two different things
> on purpose: multilateral bodies that belong to no country (the IMF, the BIS,
> the ILO), and third-country publishers that feed the two national systems from
> outside them … **If the corpus ever grows a real third national system, split
> this then.**

The EU branch is that moment, and it is two new axes rather than one:

1. **A supranational layer.** The EU is not a country, and it is not `INT` in the
   sense the comment means — the IMF does not legislate for its members. ESA 2010
   is a Regulation.
2. **27 national systems beneath it**, each with its own NSI.

`JurisdictionLevel` (`international | federal | provincial | municipal |
institutional`) has the matching problem: a member-state NSI is `federal` in its
own system but sits under the EU in a way no Canadian federal body sits under
anything.

**Defaulting member states to `INT` would repeat a bug this project has already
paid for.** Per the same comment: nine international bodies were recorded as `CA`
for five sessions, because the type had no room for them and nothing rendered the
field — "an attribute nothing reads is an attribute nobody checks." At 27 member
states it would also be wrong in the rim-colour channel, which is driven by
`country`.

Options are laid out in `EU/slices/README.md`. **This is a `REPORTS.md` direction
change and therefore Thomas's decision, not an agent's.** Until it is taken, EU
slices can be written and verified but not imported, and `npm run validate` would
correctly reject them.

### 6. The structural question this branch exists to answer, stated so it can be tested

Not a finding — a prediction, logged so a later session can score it.

The Canada/US corpus has one hard measured result: **zero standard-compliant
direct official CA↔US edges.** The two national systems touch only through shared
international standards and one commercial futures price. `BACKLOG.md` promoted
two whole clusters on the strength of it.

The EU should be the opposite case, and for a specific reason: ESA 2010 is a
**Regulation with a transmission programme in Annex B** — a documented, binding,
dated obligation running from the supranational layer to 27 national ones. If
that holds, the EU branch does not merely add territory; it supplies the edge
shape the Canada/US pair demonstrably lacks, and it makes "is the CA↔US gap a
fact about those two countries or about national statistical systems generally?"
an answerable question.

**Test it before building anything else.** The material is already in staging —
the ESA 2010 batches plus the Destatis inventories are both ends of the same
claim. If the transmission programme turns out to name obligations without naming
*publications*, that is `AGENCY ONLY` at scale and the prediction fails; report
that plainly, because a refuted prediction here is worth more than a slice.

## Secondary observations (logged, low priority)

- **The blob's own metadata is inconsistent across batches.** Three different
  header shapes: `meta` + `part_a_records`, `batch_id` + `strand` +
  `part_a_records`, and bare `governing_brief` / `scope_completed_this_batch`
  headers with no records attached. Any tooling over this has to tolerate all
  three; `split_blob.py` already does.
- **Eight batch headers have no records attached to them.** Either the records
  were pasted separately (which would explain part of the 251 loose-only) or the
  batch was abandoned. Cheap to resolve by matching session windows.
- **Every batch carries the same `project` and `session_window` string**
  (`EU galaxy — Research.EU.md Version 0.1`, `2026-08-02`), including batches
  whose content is clearly from later dates. The field is boilerplate, not a
  timestamp — do not use it to order anything.
- **`S04-001` uses `"url": "SEC04.pdf"`** — a filename, not a URL. Fine as an
  internal anchor, but it will fail the `evidence_url` requirement at slice time.
  Every S-record will need a real EUR-Lex or institutional URL before any edge
  built on it can be imported. This applies to all 146.
- **Only SEC04 has extraction records.** This is consistent with G.18's account
  (SEC05/06/07 "read in full this session for checks, neither extracted"), and
  it is the first independent confirmation of that claim from outside the `G.*`
  chain itself.

## Corrections to prior sessions

1. **G.18's process note — superseded, not wrong.** It concluded: *"plan on
   roughly one full section per session for extraction work, or three to four for
   targeted checks."* That was accurate for the environment it was written in, and
   it set the planning assumption for three sessions. It no longer holds: the
   whole ceiling was an artefact of the chat workflow (no filesystem, paste-or-
   attach delivery, no code execution, every page costing context). The note has
   been marked superseded in place in `G.18.md`, struck rather than deleted, per
   the house convention. **Do not carry the constraint forward**; if a future
   session is back in a paste-and-attach setting, say so in *Session conditions*
   rather than assuming it still applies.

2. **G.18's *What to pass at the start of next thread* is obsolete for a
   filesystem-enabled agent.** It is not wrong — it remains the correct packing
   list for a chat thread — but item 3 ("the next target PDF … already in the
   workspace folder") and item 5 (`Soft_Connections.docx`) are now simply files to
   open. Kept, with the conditional stated in *Orientation*.

3. **No substantive finding in G.16, G.17 or G.18 was checked this session**, and
   none should be treated as revisited. In particular DISC-07-03, the MFF code
   taxonomy, stands exactly as G.18 left it: very well evidenced, and still an
   inference in the one narrow respect that no document states the rule.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10), finish first.** Carried forward from
G.18 unchanged in substance; nothing in A moved this session.

1. **SEC05 (Court of Auditors)** — read in full in G.18 for checks, **not
   extracted**. Still the recommended next extraction target, and now cheaper:
   the PDF is directly readable, and its content is characterised in G.18's
   findings 1–6. **SEC08 (Ombudsman)** — still not held.
2. **SEC06, SEC07** — same position as SEC05. Read, characterised, not extracted.
3. **SEC01 (Parliament), SEC02 (Council)** — headline level only. Approach SEC02's
   headcount gap with SEC07's narrative-vs-table mismatch (498/497) in hand as a
   worked example of a benign cause.
4. **SEC00** — headline level only, and still the likeliest place for a printed
   MFF nomenclature key, which is the one thing that would convert DISC-07-03 from
   inference to documented rule.
5. **Soft_Connections.docx (Part B)** — untouched. Still stuck at sc-46; missing
   sc-47–sc-50 from G.16; SEC04 still owes an addendum. G.18 generated two new
   candidates worth sc-numbers (the SEC07 Title 2 joint-services note, the SEC07
   item 2 6 0 3 three-institution remark).
6. **SEC07_batch.md** — no longer needed, per G.18. Unchanged.
7. **SEC06_batch.md** — still wanted once, format check only.

**B — SEC03 meta backlog, after A.** Unchanged — see G.15 items 6–12.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged in ranking, but
the material has moved: a substantial ECB/Eurosystem batch is now sitting in
`_staging/20-prose-sections.txt`, and the Eurosystem consolidated balance sheet
batch is in the JSON staging. C is better resourced than when it was ranked.

**D — Housekeeping, whenever convenient.** Merge `Research.2.md` and
`Research.EU.md` into a single governing brief. **Four sessions outstanding, and
no longer blocked by anything** — both files are in `EU/` and readable.

**E — NEW, and not yet ranked by Thomas.** Everything the split created. Placed
last deliberately: A–D are Thomas's stated order and this section must not quietly
reorder them. But note that E1 gates any import of E2, and E2 is now the largest
body of unworked material in the branch.

1. **The `Country` / `JurisdictionLevel` schema decision** (finding 5). Blocks all
   EU import. Thomas's call; belongs in `REPORTS.md`.
2. **Verify and slice the staged Eurostat strand** — 814 distinct Part A records.
   One slice at a time, per `EU/slices/_staging/PROMPT-for-splitting-agent.md`.
   Suggested first slice: the ESA 2010 transmission-programme material, because it
   is the test of finding 6.
3. **The prose section** — its own session.
4. **Reconcile the 49 duplicate and 77 id-less records** before anything is built
   on them.

## Cheap checks still outstanding

G.18's six carry forward **unchanged and unattempted**, and all six are now
cheaper than when they were written, because `SEC00.pdf`–`SEC10.pdf` can be
opened directly instead of attached:

1. **SEC00, SEC09, SEC10 MFF codes** — confirm `7.2.0xx` / `7.2.9xx` / `7.2.Xxx`
   and look for `9SPEC` variants. Also the only remaining test of
   `7.1.2<section>`, since SEC05 and SEC07 have no European Schools line.
2. **SEC00 for a printed nomenclature key.** Still the single highest-value item
   in this list if it exists.
3. **SEC09 and SEC10 item 3 0 1 1** — settles whether the SEC05/SEC06 form is the
   majority.
4. **SEC04 Chapter 10 0 verbatim** — resolve the housing-allowance placement
   divergence against SEC05's Chapters 12/14.
5. **SEC04 item 1 6 5 6 heading verbatim** — establish whether it is the same
   instrument as SEC06's item 1 6 4 0.
6. **SEC06 Title 2 re-read for a reciprocal joint-services note** — underpins the
   asymmetry claim in G.18 finding 4.

Added this session, all mechanical:

7. **Characterise the 155 non-`S` loose records.** 49 are known duplicates of
   batch content; the rest are unclassified. One pass over
   `10-loose-record.ndjson`.
8. **Match the 8 record-less batch headers to their records** by session window,
   and establish whether the 251 loose-only records are their missing bodies.
9. **Grep `00-blob-fulltext.txt` for `Annex B` and `transmission programme`**
   before starting E2 — it will show in minutes whether finding 6's prediction has
   material behind it.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this file.**
Everything below is the packing list for a chat thread that cannot.

1. **This file (`G.19.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief. Non-negotiable, and no summary
   substitutes for it.
3. **`EU/slices/README.md`** — layout and the schema blocker.
4. **`Research_2_md.docx` and `Research_eu.docx`** — fourth time of asking. The
   D-item merge and the SEC04 field-set confirmation are blocked on these and
   nothing else. **They are on disk in `EU/`** — a filesystem-enabled agent should
   simply open them and close this item.
5. **The next target PDF** — `SEC05.pdf` per priority A1. Already in `EU/`.
6. **`Soft_Connections.docx`** — only once it is current past sc-46.

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
