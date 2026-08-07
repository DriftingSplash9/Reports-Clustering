# G.20.md — EU galaxy hand-off

Date: 2026-08-04
Governing briefs: Research.EU.md v0.1 (fixed) + Research.2.md v2.1 (fixed) — **read in full this session. Four-session blocker closed.**
Predecessor: G.19.md (2026-08-04).

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
3. **`EU/slices/README.md`** — folder layout for EU data. The schema blocker it
   carried is **resolved**; the section is kept with the original text in a
   `<details>` block so the reasoning survives.
4. `REPORTS.md` (project root) only if the *direction* is in question, not for
   routine work. Note that it now carries the schema decision under *Decisions*.

Then say what the branch is doing and what is next. The answer to "what is next"
lives in *Thomas's stated priority for the remaining work*, below.

**A correction to how this file has been read.** Three predecessors described the
branch as two unrelated bodies of work that happened to share a file. That is
wrong, and finding 3 sets it out: the Eurostat material is `Research.EU.md` §10
being carried out in order, and it looks orphaned only because the governing
briefs went unread for four sessions and nothing was left pointing at the
instruction. **Before concluding that something in this branch is stray, check
whether a brief asked for it.**

**Where things are, as of 2026-08-04:**

- `EU/` — this branch. `SEC00.pdf`–`SEC10.pdf` (the institutional budget
  sections), the `G.*` hand-off logs and their `.json` sidecars, the governing
  briefs as `.docx`, `Soft Connections.docx`, and `EU Meta jsons.docx`. New this
  session: `PartB_soft_connections_2026-08-04.md` and its `.json` twin.
- `EU/slices/` — where verified EU graph data lands. `eu-level/`,
  `member-states/`, `cross-layer/`, and `_staging/`. **Nothing here is verified
  or imported yet** — but it is no longer *blocked* from import.
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

**`.docx` is not a wall.** Three sessions treated the governing briefs as
unavailable while they sat readable on disk. `python-docx` is installed and
works; converting a brief takes seconds. See finding 1.

## Session conditions — read this first

Session type: **infrastructure and schema, not research.** This session read no
source document for evidence, extracted no Part A record, verified no edge and
proposed no node. Treat the corpus as unchanged since G.18 in every respect the
evidence standard cares about.

What was available and used: **full filesystem access, working Python with
`python-docx`, and a working npm toolchain** (`npm run check`, `npm run
validate`). The second session in the branch's history with a filesystem, and the
first able to run the app's own tooling.

What **was** read in full, stated plainly because the positive claims depend on
it: `Research.2.md.docx`, `Research.eu.docx`, `Soft Connections.docx`,
`EU/slices/README.md`, `Research.1.md`, `G.19.md`, and the parts of `src/` that
the schema change touched.

What was **not** done, stated plainly because everything downstream inherits it:

- **No `SEC*.pdf` was opened.** The six cheap checks G.18 left outstanding are
  all still outstanding, unchanged, now three sessions old.
- **No content of the blob was judged.** The 82 `Annex B` hits in finding 6 were
  counted and their surrounding records read *as text*; no record was assessed
  for meaning, no id minted, nothing mapped to the graph schema.
- **No Part B entry was verified against Part A.** The list produced this session
  is a faithful transcription of what `Soft Connections.docx` already claimed,
  and nothing more. Its `evidence` column is a pointer, not a quote.
- **The D-item merge was not performed.** The briefs were *read*; merging them
  into one governing document is still to do.

## Headline result

**The branch had no orphans. It had an unread instruction.**

G.19's headline was that `EU Meta jsons.docx` is "two research strands
accumulating in the same file", only one of which the `G.*` chain discusses. The
measurement was right and the framing was wrong. Both bodies of work are
instruction-following: the institutional strand executes Thomas's A-list, and the
Eurostat strand executes `Research.EU.md` §10 **in order, including its
instruction to stop** — one high-authority NSI and no second one. `Soft
Connections.docx` turns out to be a single list spanning both, not the
institutional-only list three hand-offs describe.

Nothing was accumulating by accident. What was lost was provenance, and it was
lost for one reason: **the governing briefs went unread for four sessions while
sitting readable on disk.** Every "surprise" in G.19 dissolves on reading them.

Secondarily, and more concretely: **the schema blocker is resolved and EU slices
are no longer blocked from import.** Thomas took the decision this session; it is
implemented, tested and recorded.

## Findings

### 1. The governing briefs, read at last — and one of them carries a rule nobody has followed

`Research_2_md.docx` and `Research_eu.docx` were converted with `python-docx` and
read in full. They were never unavailable; from G.16 onward they were on disk.

**`Research.2.md` v2.1 is `Research.1.md` with two sections removed and one rule
added.** §§1–7 and §10 are substantively identical. Removed: **§8** (the entire
Canada/US work queue, Items 1–4) and **§9's node-id list** — the heading and its
warning survive:

> Use these exact strings when a document names something already here. Do not
> invent variants … This has happened twice.

with **no list under it**. An agent handed only `Research.2.md` therefore gets the
duplicate-id warning and nothing to check against, which is the exact failure mode
the warning describes. `Research.1.md` remains the only carrier of the id list.

**Added, and new — the Part B Output Rule (2026-08-02):**

> Whenever a research batch or session window is closed, or whenever a G.*.md
> handover note is requested, the agent **must** also produce a standalone,
> savable list of all current Part B soft connections and provisional
> observations.

It specifies id / from / to / nature / strength / evidence pointer / notes, and a
filename shape (`PartB_soft_connections_YYYY-MM-DD.md`). **No `G.*` log mentions
it and no session has produced one.** It went unmet because it sits *after* §10's
"eight things that matter" summary — past the point where the brief reads as
finished — and because nobody opened the file for four sessions. Honoured this
session; see finding 4.

**`Research.EU.md` v0.1** is short (45 lines) and is the origin of finding 3. Its
closing line, written 2026-08-02, is now stale: *"No extraction has been
performed. Future agents start here."*

### 2. The schema blocker is resolved, implemented and tested

G.19 finding 5 recorded that `src/lib/types.ts` could not express an EU node and
that the decision was Thomas's. **He took it this session:** `country` becomes an
open ISO-3166 alpha-2 code, plus a new `supranational` jurisdiction level.

What shipped, all in `src/`:

- `Country` is now `'CA' | 'US' | 'INT' | 'EU' | (string & {})` — the literals
  survive as an autocomplete hint list, the open arm accepts `'DE'`, `'FR'`,
  `'IT'` and the rest. **Adding a member state is a data change, not a schema
  change**, which the planned China galaxy will need too.
- `JurisdictionLevel` gained `supranational`, and it is **not** a synonym for
  `international`. The difference is legal force: an international body publishes
  a standard adopted by choice; a supranational body legislates. Filing the EU as
  `international` would erase precisely the property the Canada/US pair was
  measured to lack.
- **Colour is keyed to a hue *family*, not a country.** 27 families cannot be
  told apart at fit zoom, so all member states draw from one green EU family
  (100°–158°, the only free arc wide enough for five steps). Which member state
  is carried by the label, the flag and the region filter. **This is a deliberate
  loss of one discrimination** and should be revisited if the member-state layer
  ever gets deep enough to need it.
- **The compiler check it cost was replaced, not dropped.** A closed union used
  to guarantee every country had a colour. `validate` now errors on any country
  with no `COUNTRY_FAMILY` entry, and both fill and rim fall to a flat
  unclassified grey rather than into a family — so an unmapped country is visible
  rather than absorbed. Absorbing unknowns into a bucket is how nine
  international bodies were recorded as Canadian for five sessions.

**Verified, not assumed:** `npm run check` passes; `npm run validate` passes with
the corpus unchanged at 133 reports / 213 dependencies. Because the corpus
contains no EU node, none of the new paths are exercised by real data, so
`scripts/eu-schema-smoke.ts` fires them against doctored data — 20 checks, all
passing, including both new validator guards. That follows the house precedent
set by the terminus rules, which were also fired against doctored data before
being trusted.

Recorded in `REPORTS.md` under *Decisions*; `EU/slices/README.md`'s blocker
marked resolved with the original kept in a `<details>` block.

### 3. The Eurostat strand is `Research.EU.md` §10 being executed, not an orphan

G.19 described the statistical strand as "an entirely separate Eurostat programme
that no `G.*` log discusses at all". True as stated — and it reads as accidental
accumulation, which it is not.

`Research.EU.md` §10 is a four-item priority queue. Every item is in the blob:

| §10 item | What is in the blob |
|---|---|
| 1. Statistical Requirements Compendium (latest) | SRC 2026 — 47 records, the largest single batch |
| 2. ESA 2010 transmission programme + national quality reports | The ESA 2010 / Annex B material, finding 6 |
| 3. One high-authority NSI methodology page | Destatis GNI and QNA inventories |
| 4. **"Stop and report before expanding to a second member state"** | See the counts below |

The fourth is the one that settles it. Raw string counts over
`_staging/00-blob-fulltext.txt`:

| Agency | Mentions |
|---|---|
| Destatis | **159** |
| INSEE | 8 |
| Statistics Austria | 4 |
| ISTAT | 3 |
| Statistics Finland | 3 |
| Statistics Netherlands | 3 |
| Statistics Poland | 1 |
| Statistics Sweden | 0 |

One member state worked, the rest incidental mentions. `Research.EU.md` §9 names
Germany, France and Italy as the first three NSIs and §10 says stop after one.
**That is a completed, instruction-following work programme**, not an orphan.

**What this rests on:** the counts are raw string matches, not records read for
meaning, and I did not open the Destatis records to confirm they are extraction
rather than discussion. The claim is about provenance, not quality.

### 4. `Soft Connections.docx` is one list across both strands, and it is 46 entries with no gaps

G.18 and G.19 both describe Part B as institutional material "stuck at sc-46".
The number is right; the description is not. Measured this session:

- **46 distinct ids, sc-1 … sc-46, no missing numbers in the range.**
- **56 entries in 8 top-level blocks** — sc-01…sc-10 appear twice.
- The split between strands is sharp: **sc-1…sc-35 are the statistical /
  Eurostat strand** (SIMS, ESA 2010, Destatis, SRC 2026, DGINS, the quality
  framework) and **sc-36…sc-46 are the institutional budget strand** (Section
  III, Horizon Europe, MFF codes, SEC03). So Part B is *mostly* the strand the
  `G.*` chain does not discuss.
- `_staging/10-part-b-soft-connections.ndjson` is a **subset duplicate** of
  sc-01…sc-10, not new material.
- Three ids differ between their two copies (sc-06, sc-07, sc-09) and all three
  differences are cosmetic — an abbreviation expanded, a regulation number
  written out. **No substantive conflict.** The richer copy is kept.
- **One block is not valid JSON**: sc-03's `notes` string is unterminated. Every
  record in it survives in a clean duplicate, so nothing was lost, but the docx
  cannot be machine-read as-is without recovery.

Written out to `EU/PartB_soft_connections_2026-08-04.md` (+ `.json`), which
discharges the Part B Output Rule for the first time. **It is a transcription,
not a verification** — no entry was checked against a Part A quote.

### 5. Cheap check #9 — the Annex B material is real; the prediction is not yet scored

G.19's finding 6 predicted that ESA 2010's Annex B transmission programme would
supply the documented supranational-to-national edge shape the Canada/US pair
lacks, and listed a grep as the cheap test. Run: **82 hits** for
`Annex B` / `transmission programme` in `_staging/00-blob-fulltext.txt`.

The material behind them is the operative provision itself, quoted verbatim in
the blob's own Part A records:

> "The Member States shall transmit to the Commission (Eurostat) the accounts and
> tables set out in Annex B within the time limits specified therein for each
> table."

with the transmission programme's own presentation document, a full overview
table of it, and a dated first-application clause ("to be transmitted from 1
September 2014"). Records naming Tables 1–29 are present.

**Explicitly not scored, in either direction.** Whether Annex B's *tables* satisfy
`Research.1.md` §4's third binding condition — it has a title — is a judgement
about the records, and this session read none of them for meaning. If the
programme names obligations and table numbers but no *publications*, that is
`AGENCY ONLY` at scale and the prediction fails. **Per `Research.1.md` §3 that
adjudication is not the research role**, so it is left standing as G.19 framed it:
a logged prediction with confirmed material behind it, awaiting a session that
reads the records.

## Secondary observations (logged, low priority)

- **The two priority queues disagree and have been running in parallel.**
  `Research.EU.md` §10 orders the work Eurostat-first; Thomas's A-list orders it
  institutional-first. Neither document references the other. The A-list is
  Thomas's and stated most recently, so it wins — but the queues should be
  reconciled explicitly rather than left to coexist, because the other one has
  already been executed once without anyone noticing.
- **`strength` in Part B has no defined meaning.** The values (`Strong` /
  `Moderate`) are the source author's own labels; `Research.1.md` defines no such
  grade. Do not read them as an evidence tier.
- **`Research.EU.md`'s closing line is stale** — "No extraction has been
  performed. Future agents start here." Written 2026-08-02, before the strand it
  describes was extracted. Fold this into the D-item merge.
- **The `.docx` files are all machine-readable** and none needed to be attached.
  Three sessions' worth of "did not arrive" was a workflow assumption, not a
  constraint.
- **`scripts/eu-schema-smoke.ts` is disposable.** It exists only because no EU
  node exists yet to exercise the new schema paths. Once a real EU slice is
  imported and validating, it can be deleted.

## Corrections to prior sessions

1. **G.19's headline framing — overstated.** "It is two research strands that
   were accumulating in the same file" is accurate as measurement and misleading
   as description: both strands are instruction-following, and the Eurostat one
   executes `Research.EU.md` §10 in order. The *"Neither strand knew about the
   other"* line should be read as a fact about the hand-off chain, not about the
   work. See finding 3.

2. **G.19's account of Part B — refuted in substance, confirmed in number.**
   "Part B is untouched, still stuck at sc-46" gives the right count and the
   wrong content: `Soft Connections.docx` is one list across both strands, and
   sc-1…sc-35 are the *statistical* strand, not the institutional one. See
   finding 4.

3. **G.19 finding 5 — resolved.** The `Country` / `JurisdictionLevel` schema
   blocker is decided, implemented, tested and recorded. `EU/slices/README.md`'s
   ⚠ Blocker section no longer applies and is marked so.

4. **G.19's *Session conditions* — closed.** "The governing briefs still did not
   arrive … four sessions outstanding" is discharged. G.19 was already explicit
   that the blocker was self-inflicted rather than external; that judgement is
   confirmed. Nothing prevented any of the previous four sessions from opening
   them.

5. **G.19's *What to pass* item 4 — closed.** "Fourth time of asking" is
   answered; the briefs are read and this file records what they say.

6. **No substantive finding in G.16, G.17 or G.18 was checked this session**, and
   none should be treated as revisited. In particular DISC-07-03, the MFF code
   taxonomy, stands exactly as G.18 left it: very well evidenced, and still an
   inference in the one narrow respect that no document states the rule.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10), finish first.** Carried forward from
G.19 unchanged in substance; nothing in A moved this session, for the third
session running.

1. **SEC05 (Court of Auditors)** — read in full in G.18 for checks, **not
   extracted**. Still the recommended next extraction target, and still cheap:
   the PDF is directly readable and its content is characterised in G.18's
   findings 1–6. **SEC08 (Ombudsman)** — still not held.
2. **SEC06, SEC07** — same position as SEC05. Read, characterised, not extracted.
3. **SEC01 (Parliament), SEC02 (Council)** — headline level only. Approach SEC02's
   headcount gap with SEC07's narrative-vs-table mismatch (498/497) in hand as a
   worked example of a benign cause.
4. **SEC00** — headline level only, and still the likeliest place for a printed
   MFF nomenclature key, which is the one thing that would convert DISC-07-03 from
   inference to documented rule.
5. **Soft_Connections.docx (Part B)** — **transcribed but not advanced.** Now
   written out to `PartB_soft_connections_2026-08-04.md`. Still missing
   sc-47–sc-50 from G.16; SEC04 still owes an addendum; G.18's two new candidates
   (the SEC07 Title 2 joint-services note, the SEC07 item 2 6 0 3
   three-institution remark) still have no sc-numbers.
6. **SEC07_batch.md** — **no longer needed**, per G.18. Unchanged.
7. **SEC06_batch.md** — still wanted once, format check only.

**B — SEC03 meta backlog, after A.** Unchanged — see G.15 items 6–12.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged in ranking. The
material remains better resourced than when it was ranked: a substantial
ECB/Eurosystem batch sits in `_staging/20-prose-sections.txt` (~399k chars,
delivered as prose, no script can index it) and the Eurosystem consolidated
balance sheet batch is in the JSON staging.

**D — Housekeeping, whenever convenient.** Merge `Research.2.md` and
`Research.EU.md` into a single governing brief. **No longer blocked, and no
longer four sessions outstanding on the read** — both are read and summarised in
finding 1. The merge itself is still to do, and it now has three known inputs:
restore §9's id list (or point explicitly at `Research.1.md` for it), carry the
Part B Output Rule forward somewhere it will actually be seen, and drop
`Research.EU.md`'s stale closing line.

**E — Everything the blob split created.** E1 is done; the rest is unchanged in
substance and now unblocked.

1. ~~**The `Country` / `JurisdictionLevel` schema decision.**~~ **DONE** —
   finding 2. No longer gates anything.
2. **Verify and slice the staged Eurostat strand** — 814 distinct Part A records.
   One slice at a time, per `EU/slices/_staging/PROMPT-for-splitting-agent.md`.
   Suggested first slice: the ESA 2010 transmission-programme material, because
   it is the test of finding 5 and the material is confirmed present. **This is
   now the largest body of unworked material in the branch and nothing blocks
   it.**
3. **The prose section** — `_staging/20-prose-sections.txt`, its own session.
4. **Reconcile the 49 duplicate and 77 id-less records** before anything is built
   on them.
5. **NEW — reconcile the two priority queues.** See *Secondary observations*.
   A one-paragraph decision, best folded into the D merge.

## Cheap checks still outstanding

G.19's first six carry forward **unchanged and unattempted**, all still cheaper
than when written because `SEC00.pdf`–`SEC10.pdf` can be opened directly:

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

Carried from G.19, still outstanding:

7. **Characterise the 155 non-`S` loose records.** 49 are known duplicates of
   batch content; the rest are unclassified. One pass over
   `10-loose-record.ndjson`.
8. **Match the 8 record-less batch headers to their records** by session window,
   and establish whether the 251 loose-only records are their missing bodies.

Done this session:

9. ~~**Grep `00-blob-fulltext.txt` for `Annex B` and `transmission programme`.**~~
   **DONE** — 82 hits, material confirmed present. See finding 5.

Added this session:

10. **Read ten of the ESA 2010 / Annex B records for meaning** and settle whether
    Annex B names *publications* or only tables and deadlines. This scores
    G.19's finding 6 either way, and a refutation is worth as much as a
    confirmation. Highest value per unit effort in this list.
11. **Confirm the Destatis records are extraction rather than discussion.**
    Finding 3 rests on string counts; one pass over the Destatis records
    upgrades it from provenance to substance.
12. **Check whether sc-47–sc-50 exist anywhere** — G.16 generated them and they
    are not in `Soft Connections.docx`. Grep `00-blob-fulltext.txt` and the
    `G.*` sidecars before assuming they were lost.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this file.**
Everything below is the packing list for a chat thread that cannot.

1. **This file (`G.20.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief. Non-negotiable, and no summary
   substitutes for it. **Note it is now the only carrier of the §9 node-id
   list**; `Research.2.md` dropped it.
3. **`EU/slices/README.md`** — layout. The blocker in it is resolved.
4. **The next target PDF** — `SEC05.pdf` per priority A1. Already in `EU/`.
5. **`PartB_soft_connections_2026-08-04.md`** — the current Part B list, in place
   of `Soft Connections.docx`, which is larger, duplicated and not valid JSON.
6. ~~`Research_2_md.docx` and `Research_eu.docx`~~ — **no longer needed.** Read
   this session; finding 1 records what they say. Pass them only if the D-item
   merge is the work being done.

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
