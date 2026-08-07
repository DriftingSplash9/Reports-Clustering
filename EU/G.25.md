# G.25.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0, Research.2.md v2.1, Research.EU.md v0.1 —
all three read first-hand, G.24 finding 3. Nothing in this file rests on a
second-hand account of any of them.
Predecessor: G.24.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order:

1. **`Research.1.md`** (project root) — the standing brief. Evidence standard,
   Part A record format, slice schema, the two traps, and **the only copy of the
   §9 node-id list**.
2. **This file**, in full.
3. **`EU/slices/eu-level/eu-draft-budget.json`** — the branch's first slice.
   Read it before writing a second one; it is the pattern.
4. **The five research records**, in `EU/`:
   `SEC05_PartA_2026-08-04.md` (19 records, the format exemplar) ·
   `SEC06-SEC07_PartA_2026-08-05.md` (9) · `AnnexXI_PartA_2026-08-05.md` (12) ·
   `SEC250_PartA_2026-08-05.md` (3) · `AnnexB_assessment_2026-08-05.md`
   (**the branch's central result**).
5. **`EU/slices/README.md`** — layout, current contents, and why `cross-layer/`
   is still empty.

**Where things are, as of 2026-08-05 (fourth session of the day):**

- `EU/` — `SEC00.pdf`–`SEC10.pdf`, the `G.*` logs and `.json` sidecars, the
  governing briefs (`Research.2.md.docx`, `Research.eu.docx`),
  `Soft Connections.docx`, `EU Meta jsons.docx`,
  `PartB_soft_connections_2026-08-04.md`, and the five records above.
- `EU/slices/eu-level/` — **`eu-draft-budget.json`, staged, not imported.**
- `EU/slices/member-states/`, `cross-layer/` — empty. `cross-layer/` is empty for
  a documented reason; see the README.
- `TODO LISTS/rolling-todo.md` — cross-session working queue.

**Retrieval.** `eur-lex.europa.eu` is anti-bot gated to every client here —
HTTP 202 with a zero-byte body, which is **not** a 404 and proves nothing about
content. A human browser gets through. National parliament registers work.
`commission.europa.eu` works but rate-limits (429 on a second request within
seconds) — use distinct output filenames or you overwrite a good download with an
error page.

**Encoding.** Set `PYTHONIOENCODING=utf-8` before printing `pypdf` output.

## Session conditions — read this first

Session type: **plumbing.** No new source document was read and no new research
was done. Two mechanical jobs, both consequences of G.24 finding 1.

What was done: URLs backfilled across 28 Part A records in two files; the first
slice written and structurally validated; `EU/slices/README.md` brought up to
date.

What was **not** done:

- **Nothing was imported.** The slice is staged in `EU/slices/eu-level/` per the
  README's own workflow. It is **not** registered in `src/data/index.ts`, so
  `npm run validate` does not see it. Corpus unchanged at 133 reports /
  213 dependencies; `npm run check` clean.
- **Only `SEC05.pdf` has a hash-verified URL.** The other ten are constructed by
  pattern. See finding 2 — this is the one thing that could still be wrong.
- **No source document was opened**, and no Part A record was re-verified against
  its source.
- **SEC01, SEC02, SEC08, SEC09, SEC10 remain unextracted.**

## Headline result

**The branch has its first slice.** `EU/slices/eu-level/eu-draft-budget.json` —
two nodes, one edge, eleven `_dropped` entries. After twenty-five hand-offs and
no imported data, there is now a file in the corpus schema whose every field
traces to a verbatim quote.

**It is deliberately tiny, and the `_dropped` list is five times longer than the
slice.** That ratio is the honest result of applying `Research.1.md` §4 to the
institutional strand: of everything read across four sessions, exactly two things
clear all three conditions *and* have a retrievable URL. Ten relationships were
looked for and not taken, each with the quote that refuses it — including both
central negative results, which now live in the graph's own dropped-edge record
rather than only in prose.

## Findings

### 1. The first slice — two nodes, one edge, eleven dropped

`EU/slices/eu-level/eu-draft-budget.json`.

**Nodes.** `eu-draft-budget` (Draft general budget of the European Union) and
`ec-statement-of-estimates` (Statement of Estimates of the European Commission,
SEC(2026) 250). Both `country: EU`, `jurisdiction_level: supranational` — the
first use of the level added in G.20.

**The edge**, and it is the only one the institutional strand supports:

> `eu-draft-budget` **uses_data_from** `ec-statement-of-estimates`

on Article 314(1) TFEU as quoted at the head of every budget section — *"each
Institution shall […] draw up estimates of its expenditure for the following
financial year. The Commission shall consolidate these estimates in a draft
budget"*. Direction checked against §6: the Draft Budget is the dependent,
authority accrues at the estimates.

**Why only one.** Everything else fails a condition and the failures are
recorded, not hidden. Four kinds:

| Reason | Count | Example |
|---|---|---|
| `no-document` | 3 | Both central negatives, plus the EESC allowance with no index |
| `unpublishable-source` | 3 | The vacancy rate behind the 2,4 % abatement; the Commission's untitled guidelines |
| `deferred` (leads) | 3 | Eurostat's 31 October report — clears §4 but has no retrieved URL |
| `no-node-yet` / `note` | 2 | Cybersecurity Regulation; the three-sections-no-statistical-release observation |

**Validated, not assumed.** Schema conformance, `supranational ⇒ EU`, palette
membership, domain and relationship-type unions, `_dropped` reason union, and
**id collisions against all 133 existing corpus ids** (18 seed + 115 slice) —
zero collisions, zero dangling references, zero errors. `Research.1.md` §9 says
duplicate ids "has happened twice"; it did not happen here, and it was checked
rather than hoped.

**Three things block import**, all recorded in the slice's own
`_open_questions` field and all needing Thomas rather than an agent:

1. **There is no domain for this material.** `Research.1.md` §6's `Domain` union
   has no `public-finance` or `budget` value. Both nodes carry `fiscal-transfers`
   as least-wrong, and the EU budget is not a fiscal transfer programme. §6 says
   the list "can be extended, but only at the other end". **This is the one that
   matters** — every future EU institutional node hits it.
2. **URL granularity.** `eu-draft-budget`'s URL points at Section V — the
   document actually opened, per §6 — not at the whole Draft Budget.
3. **Series vs edition.** Both nodes are modelled as the recurring series with
   the 2027 edition in the description. `sna-2008` in the existing corpus is
   modelled the other way.

### 2. URLs backfilled across 28 records — and what is still unverified

Every `URL:` field in `SEC05_PartA_2026-08-04.md` (19 records) and
`SEC06-SEC07_PartA_2026-08-05.md` (9 records) now carries a real retrieval URL
instead of a local path. Zero local paths remain in either file.

**Verification status is uneven and both files now say so in their Source
blocks:**

- **`SEC05.pdf` — hash-verified.** `sha256 585c28fc…`, 894 024 bytes,
  byte-identical to the file at
  `https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC05.pdf`.
- **`SEC04`, `SEC06`, `SEC07` — constructed by pattern, not fetched.** The
  pattern reproduced SEC05 byte-for-byte and the 2026 siblings are indexed under
  the same scheme, so it is well evidenced. It is still an inference.
- **`SEC(2026) 250` — verified independently** (G.24), retrieved and opened here.

**This is the live risk in the branch.** Twenty-eight records now assert URLs,
one of which has been checked. Ten fetches close it and they cannot be done from
here.

## Secondary observations (logged, low priority)

- **The `_dropped` list is doing real work now.** `validate` already reports on
  the corpus's 134 dropped notes and flags which are leads (`no-node-yet`,
  `deferred`). The three `deferred` entries in this slice will surface there as
  research leads once it is imported, which is the right place for them.
- **`ec-` is a new id prefix** in the corpus, alongside `boc-`, `bls-`, `ab-`.
  If a convention is wanted for EU bodies before the branch grows — `eurostat-`,
  `ecb-`, `eca-` are all coming — now is the cheap moment to set it.
- **The seed set is in `src/data/reports.ts`, not JSON** (18 of the 133 ids). Any
  future id-collision check has to read the `.ts` file too; globbing
  `src/data/**/*.json` alone finds only 115 and will miss a clash.
- **`scripts/eu-schema-smoke.ts` can be deleted once this slice imports.** It
  exists only because no EU node existed to exercise the schema paths added in
  G.20. That condition ends at import, not before — sixth session of carrying it.

## Corrections to prior sessions

1. **G.24 priority A2 — half discharged.** "Backfill the URLs and import." The
   backfill is done and the slice is written; **import has not happened** and is
   blocked on the three open questions in finding 1, not on effort.

2. **`EU/slices/README.md` — corrected.** It stated "Nothing anywhere here is
   wired into `src/data/index.ts` yet", which remains true, but it also read as
   though the folders were empty. It now carries a current-contents table and a
   section explaining why `cross-layer/` is empty.

3. **G.20-G.23's suggested first slice — superseded, and this file supersedes
   its own predecessor's replacement.** G.20-G.23 suggested the ESA
   transmission-programme material; G.24 replaced that with
   `list-main-stats-2025-na` split into nine. Neither was used: the first slice
   came from the institutional strand instead, because that is where the
   retrievable URLs are. **`list-main-stats-2025-na` remains the right *second*
   slice** and the split is still to do.

4. **No finding in G.15-G.19 was checked this session**, and none should be
   treated as revisited. No research was done at all.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10).**

1. ~~SEC05~~ (G.21) · ~~SEC06, SEC07~~ (G.23) · ~~SEC00 nomenclature key~~ (G.22)
   · ~~A8 retrieval URL~~ (G.24) — all closed.
2. **Import `eu-draft-budget.json`.** Blocked on **three decisions that are
   Thomas's, not an agent's** — the missing domain above all (finding 1). Once
   settled: move the file to `src/data/research/`, import it in
   `src/data/index.ts`, run `npm run validate`. **This would be the branch's
   first imported data.**
3. **Verify the other ten `SEC*.pdf` URLs by fetch.** Ten requests in a browser.
   Gates the trustworthiness of 28 records (finding 2).
4. **SEC01 (Parliament, 53 pp), SEC02 (Council, 38 pp)** — next extraction
   targets. SEC01 is the outlier: 14 `7.2.19SPEC` lines with no analogue
   elsewhere. Both come with cheap check 6 free.
5. **SEC08 (29 pp), SEC09 (31 pp), SEC10 (38 pp)** — the three smallest, on disk,
   never opened. SEC10 first: only section using the literal `X` numeral and the
   only `PPPA` code.
6. **Part B** — `sc-51`…`sc-73` across G.21-G.24. `sc-47`…`sc-50` remain
   **reserved** for G.16's missing entries. Still outstanding: recovering those,
   and SEC04's addendum.
7. **SEC06_batch.md** — still wanted once, format check only.

**B — SEC03 meta backlog, after A.** Unchanged — G.15 items 6–12. SEC03
(1 114 pp) is its own corpus; SEC(2026) 250 (539 pp, retrievable, 533 unread)
belongs here.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged in ranking.
`_staging/20-prose-sections.txt` (~399k chars, prose) plus the Eurosystem
consolidated balance sheet batch in JSON staging.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Not started,
fifth session running**, but no longer risky — both are read and G.24 finding 3
records what they say. Five known inputs: restore §9's id list (or point at
`Research.1.md`); carry the Part B Output Rule somewhere it will be seen; drop
`Research.EU.md`'s stale closing line; fold in the priority-queue reconciliation
at E5; decide whether `Research.EU.md` §2's "or Official Journal reference"
relaxation of the URL rule survives. **Add a sixth: the domain gap** (finding 1),
which is a `Research.1.md` §6 change and belongs in the same conversation.

**E — Everything the blob split created.**

1. ~~Schema decision.~~ DONE — G.20.
2. **Verify and slice the staged Eurostat strand** — 814 records. **Second slice
   should be `list-main-stats-2025-na` split into its nine products** (G.24) —
   the most node-shaped material in staging, and the first EU material likely to
   produce more than one edge.
3. **The prose section** — `_staging/20-prose-sections.txt`, its own session.
4. **Reconcile the 49 duplicate and 77 id-less records.** A prerequisite, not
   housekeeping, and it has a worked example and a probable mechanism — two
   id-naming schemes for one instrument (G.24 finding 4).
5. **Reconcile the two priority queues.** Fold into the D merge.

## Cheap checks still outstanding

Nothing was closed this session — no research was done. Unchanged from G.24,
reordered only where finding 1 changed the value:

1. **Verify the other ten `SEC*.pdf` URLs by fetch.** Now the highest-value item
   in the branch: 28 records assert URLs and one is checked.
2. **Split `list-main-stats-2025-na` into nine records.** Mechanical, and it
   unlocks the second slice.
3. **Retrieve Annex XI Article 1(4)** — closes G.22 finding 1's open limb.
4. **Retrieve the Eurostat Report of 31 October** and establish its URL. It is
   the one `deferred` entry in the new slice that clears §4 on every count except
   a URL — one fetch converts a dropped lead into a node.
5. **Read the EBS Regulation 2019/2152** as the third independent test of the
   two-chain `AGENCY ONLY` convergence. Named in `Research.EU.md` §1, untouched.
6. **Check whether SEC01/SEC02 show the request-vs-table gap** (G.23 finding 2).
   Two sections is a pattern; four would be a rule. Free with priority A4.
7. **Pull the `[NA-Pen] / Table 29` thread** — the only table-to-publication tie
   in the corpus.
8. **Confirm the Destatis records are extraction rather than discussion.**
9. **Check whether sc-47–sc-50 exist anywhere.** The four stay reserved until
   this is run.
10. **Characterise the 155 non-`S` loose records**; **match the 8 record-less
    batch headers**; **enumerate the `9`-series tags** beyond `SPEC`/`DAG`/`PPPA`.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this file.**

1. **This file (`G.25.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and the only carrier of the §9 id
   list.
3. **`EU/slices/eu-level/eu-draft-budget.json`** — the pattern for slice two.
4. **`EU/AnnexB_assessment_2026-08-05.md`** — the branch's central result.
5. **`EU/SEC05_PartA_2026-08-04.md`** — the Part A format exemplar.
6. **`PartB_soft_connections_2026-08-04.md`** — required by the Part B Output
   Rule's own closing line, not merely conventional (G.24 finding 3).
7. **The next target PDFs** — `SEC01.pdf`, `SEC02.pdf`. Already in `EU/`.
8. **A browser, or someone with one**, for cheap checks 1, 3, 4 and 5.

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
