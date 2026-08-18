# G.24.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0, **Research.2.md v2.1 and Research.EU.md
v0.1 — all three read in full this session, first-hand.** The three-session
second-hand chain flagged at G.23 correction 5 is closed.
Predecessor: G.23.md (2026-08-05).

## Orientation — if you are a new agent, start here

**You are picking up the EU branch of the Economic Report Influence Graph.** The
project draws a 3D graph in which every node is a recurrently published official
report and every edge is a *documented* statement that one report uses another as
an input. The whole thing rests on one rule: **if no document says it, the edge
does not exist.**

Read, in this order, before doing anything:

1. **`Research.1.md`** (project root) — the standing research brief. Evidence
   standard, Part A record format, slice JSON schema, the two traps, and the
   node-id list. Not negotiable, and **still the only carrier of the §9 id
   list** — see finding 3.
2. **This file**, in full — the current state of the EU branch.
3. **The five research records**, which are the branch's actual output:
   - `EU/SEC05_PartA_2026-08-04.md` — Section V, 19 records. Format exemplar.
   - `EU/SEC06-SEC07_PartA_2026-08-05.md` — Sections VI and VII, 9 records.
   - `EU/AnnexXI_PartA_2026-08-05.md` — the salary-update chain, 12 records.
   - `EU/SEC250_PartA_2026-08-05.md` — MFF heading 7, 3 records.
   - `EU/AnnexB_assessment_2026-08-05.md` — **new**, and the one to read if you
     only read one. Scores the branch's central prediction.
4. **`EU/slices/README.md`** — folder layout. Its schema blocker is resolved.
5. `REPORTS.md` (project root) only if the *direction* is in question.

Then say what the branch is doing and what is next.

**Where things are, as of 2026-08-05 (third session of the day):**

- `EU/` — `SEC00.pdf`–`SEC10.pdf`, the `G.*` logs and `.json` sidecars, the
  governing briefs as `.docx`, `Soft Connections.docx`, `EU Meta jsons.docx`,
  `PartB_soft_connections_2026-08-04.md`, and the five records above.
- **The governing briefs are at `EU/Research.2.md.docx` and
  `EU/Research.eu.docx`.** They have been asked for by name more than once; that
  is where they live, and `python-docx` reads both in seconds.
- `EU/slices/` — **still nothing verified or imported, and as of this session
  nothing external blocks it.** See finding 1.
- `TODO LISTS/rolling-todo.md` — cross-session working queue.

**Retrieval, updated.** `eur-lex.europa.eu` remains anti-bot gated to every
client available here — HTTP 202 with a zero-byte body, which is **not** a 404
and proves nothing about content. **A human browser gets through**, and that is
how finding 1 was closed. National parliament document registers are official
mirrors and work from here.

**Encoding note.** `pypdf` renders em-dashes as a replacement character and the
Windows console is cp1252 — set `PYTHONIOENCODING=utf-8` before printing
extracted text or you get `UnicodeEncodeError`.

## Session conditions — read this first

Session type: **verification and assessment.** No new source document was
extracted.

What was read in full: **`Research.2.md` and `Research.EU.md`** (converted from
`.docx`, first-hand, first time in the branch's history at first hand); twelve
staged Part A records on ESA 2010 Annex B; `G.23.md`.

What was **not** done, stated plainly:

- **No source document was opened for the Annex B check.** Finding 2 is an
  assessment of **staged records**, not an extraction. The quotes carry URLs and
  are verbatim as staged, but a mis-transcription upstream would pass through
  unnoticed. 31 of the 43 matched records were not read.
- **Annex B itself was not read as enacted.** The table overview quoted is the
  programme's own presentation document (KS-01-13-429). Tables 11-29 are
  referenced but only 1-10 are quoted in the staged overview.
- **No slice was written and nothing was imported.** Corpus unchanged at 133
  reports / 213 dependencies; `npm run check` and `npm run validate` clean.
- **No node was proposed**, including from the `list-main-stats-2025` record,
  which must be split first (finding 2).
- **SEC01, SEC02, SEC08, SEC09, SEC10 remain unextracted.**

## Headline result

**Two independent binding EU instruments have now been followed to their national
boundary, and both stop at `AGENCY ONLY`.**

`EU/slices/README.md` set this branch up as the test of whether the Canada/US
finding — zero standard-compliant direct official cross-border edges — is a fact
about those two countries or about national statistical systems generally. ESA
2010's Annex B was the best candidate for the opposite case: a *Regulation*, not
a standard countries opt into, with a binding transmission programme.

**It names table numbers, subjects and deadlines. It names no publications.** The
Regulation describes Annex B in its own words as *"a programme (Annex B) setting
out the time limits by which Member States shall transmit…"*, and the programme's
table overview has four columns — number, subject, deadline, period — with no
column for a publication or a publisher. At the national end, Destatis describes
its own transmission by naming **ten ESA table numbers and not one German
publication.**

That is the second chain to fail this way, after the Annex XI salary chain
(G.22 finding 1). Two instruments, chosen independently, both binding, both
`AGENCY ONLY` at the boundary.

**Secondarily but concretely: the import blocker is gone.** Priority A8 is closed
— the `SEC*.pdf` URL pattern is confirmed by SHA-256 match. All 43 institutional
Part A records are now importable.

## Findings

### 1. Priority A8 is closed — the URL pattern is confirmed by hash

G.21 finding 5 raised it, G.22 finding 3 identified the pattern and could not
verify it, G.23 carried it as the one item an agent here could not do. **Thomas
fetched it.**

```
https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC05.pdf
```

The downloaded file and `EU/SEC05.pdf` are **byte-identical**:
`sha256 = 585c28fc682c0ed99e9feb65d65c7f74276c1ee2b8e8d6920feb566f789ad874`,
894 024 bytes both. Not a size match or a spot-check — the same file.

So the pattern `eur-lex.europa.eu/budget/data/DB/<year>/en/SEC<nn>.pdf` is
established for the whole set, `SEC00`–`SEC10`, and the 2026 siblings that
surfaced in search are the same scheme a year back.

**What this unblocks:** every Part A record in `SEC05_PartA_2026-08-04.md` (19)
and `SEC06-SEC07_PartA_2026-08-05.md` (9) can have its `URL:` field filled with a
real retrieval URL, and `Research.1.md` §2's requirement that every edge carry a
URL can be met for the institutional strand. **43 records across four files stop
being un-importable.**

**One caveat, and it is worth a line.** Only `SEC05` was hash-verified. The other
ten URLs are constructed by pattern. Verifying them is ten fetches and should be
done before import, not assumed — this branch has been wrong about a filename
convention before.

### 2. Cheap check 1 — Annex B names tables, not publications. The prediction fails.

`EU/AnnexB_assessment_2026-08-05.md`. Carried unchanged since G.20; top of the
list for two sessions.

The decisive quote is the Regulation describing its own annex:

> "The ESA 2010 provides for: […] (b) a programme (Annex B) setting out the time
> limits by which Member States shall transmit to the Commission (Eurostat) the
> accounts and tables to be compiled in accordance with the methodology referred
> to in point (a)."  — Regulation (EU) No 549/2013, Article 1(2)

And the programme's own table overview, whose four columns are the whole answer:

> "Table No | Subject of the tables | Deadline t + months (days where specified)
> | Period covered
> 1 | Main aggregates — quarterly | 2 | 1995Q1 onwards […]"

No column for a publication, a publisher or a title. **"Main aggregates —
quarterly" is a data-delivery slot, not the name of anything anyone publishes.**
`Research.1.md` §4.3 is explicit that *"'Statistics Canada' is not a node"* — and
Annex B is the first kind of thing all the way down.

**The strongest test is the national end, and it fails cleanest.** Destatis,
describing its own transmission of government accounts, names **ten items, every
one an ESA table number** (`Table 2`, `Table 6`, `Table 7`, `Table 801`, …), and
not one German publication. If a member state were ever going to name its own
releases, that is the record where it would have happened.

**Scored against G.19 finding 6:**

| Limb | Outcome |
|---|---|
| Annex B exists, binding, creates an obligation | **Confirmed** |
| The material is in the corpus | **Confirmed** — 43 records, 22 ids |
| Annex B names **publications** | **Refuted** |
| Member-state records name their **own releases** | **Refuted** |
| A supranational→named-national-release edge | **Not produced** |

**The counterweight, reported per §3 because it cuts the other way.** The
*2025 List of main statistics produced and disseminated by Eurostat* names
products with stable codes (NAMA, NAMQ, NASA, NASQ, GovQ, GovD&D, NA-Pen, BoP,
MUFA), each with a stated cadence and a named legal basis. That is genuinely
node-shaped — three of §4's conditions in one table. **But they are Eurostat's
own dissemination products, not member-state releases**, so it points the same
way as G.22 finding 1 rather than rescuing the prediction.

**What this licenses.** Two chains now point at "the Canada/US result is a fact
about national statistical systems generally". That is the branch's most
substantive result and it is no longer a single data point. **It is still not
proof:** both chains were assessed at one remove — Annex XI was never retrieved,
and Annex B was read as staged records plus a presentation document, not as
enacted. A third instrument of a different kind (EBS Regulation 2019/2152, named
in `Research.EU.md` §1, untouched) is the natural check.

**And there is a real edge here, pointing inward.** Eurostat's own products cite
Regulation 549/2013 as their legal basis. The EU graph's first importable edges
are likelier to run *inside* the EU layer than across it.

### 3. Both governing briefs read first-hand — G.20's account confirmed exactly

G.23 correction 5 flagged that three consecutive hand-offs had relied on G.20
finding 1's second-hand account. Both files converted and read.

**G.20 finding 1 is confirmed in every particular:**

- **§8 is gone.** The heading sequence in `Research.2.md` runs
  `…7 → 9 → 10`. The entire Canada/US work queue is absent.
- **§9's heading survives with no list under it.** The warning is there verbatim —
  *"Use these exact strings when a document names something already here. Do not
  invent variants … This has happened twice."* — followed immediately by `---`
  and `## 10`. An agent handed only `Research.2.md` gets the duplicate-id warning
  and nothing to check against. **`Research.1.md` remains the sole carrier.**
- **The Part B Output Rule is real and sits after §10**, as a `###` subsection
  under the closing summary — past the point where the brief reads as finished,
  which is G.20's explanation for four sessions of non-compliance.

**Two details no `G.*` log has recorded**, both from first-hand reading:

- The rule's closing line is **"Thomas should include the part b with the initial
  files so awareness can be brought to it."** That makes the Part B list a
  *packing-list* item by instruction, not by convention. G.21-G.23 already do
  this at item 5 of *What to pass*, so practice matches — but nobody knew it was
  required.
- The rule also says **"The Part B list should be updated incrementally as new
  soft connections become visible from Part A records."** Incremental append to
  one file is therefore correct, and the current practice of adding `sc-51`…
  onward to a single dated file is what the rule asks for.

**One correction to G.20's own summary of `Research.EU.md` §10** — see correction
2.

### 4. Two corpus defects, both feeding priority E4

Surfaced while counting for finding 2, and both are actionable.

**A confirmed duplicate, with a visible cause.** `esa-reg-article1` and
`esa2010-art1-2` carry **byte-identical quotes at the same location**
(Article 1(2)) under two different ids; same for `esa-reg-article3` /
`esa2010-art3-1`. The cause is legible: **two id-naming schemes for the same
instrument**, `esa-reg-*` and `esa2010-*`. E4 ("reconcile the 49 duplicate and 77
id-less records") now has a worked example and a probable mechanism — this is
`Research.1.md` §9's duplicate-id failure occurring one level up, on record ids
rather than node ids.

**14 of the 43 matched records carry no `id` at all** — a third of the subset,
against 77 id-less records corpus-wide. Under §6 they cannot be cited and would
be discarded whole.

**And the single most valuable record in the Eurostat staging area is bundled.**
`list-main-stats-2025-na` puts **nine products under one heading**, which is
exactly the failure §6 describes: *"fourteen good quotes under one heading marked
'illustrative cluster'; none carried its own section number, so none could be
cited, so all fourteen were discarded."* **It should be split into nine before
anything is built on it.**

## Secondary observations (logged, low priority)

- **`Research.EU.md` §2 relaxes the URL rule** in a way `Research.1.md` does not:
  *"Every edge carries a URL (or Official Journal reference)"*. For EU material
  an OJ reference or ELI may substitute for a retrieval URL. That matters for
  import and no `G.*` log has noted it.
- **`[MUFA] … collected and re-transmitted by the ECB`** is a textbook
  `redistributed` terminus in §4's sense — reached via an intermediary that
  publishes nothing of its own. First clean instance of that kind in the branch.
- **`[NA-Pen] … according to Table 29 of the ESA 2010 Transmission Programme`**
  is the one place in the corpus where a *named product* is tied to a *specific
  Annex B table*. If a table-to-publication mapping exists anywhere, that record
  is the thread to pull.
- **"Supplementary agreements between Eurostat and the member states"** (Destatis
  QNA record) are named as a source of obligation and never identified or dated.
  Terminus candidate, kind `unidentified`.
- **`Research.EU.md` §9 names "Principal European Economic Indicators"** as an
  Eurostat apex publication. It is a title, and nothing in the branch has looked
  at it.
- **`scripts/eu-schema-smoke.ts` is still disposable**, fifth session running.

## Corrections to prior sessions

1. **G.19 finding 6 — refuted.** "ESA 2010's Annex B will supply the documented
   supranational-to-national edge shape the Canada/US pair lacks." It does not.
   G.20 finding 5 predicted precisely this failure mode (*"if the programme names
   obligations and table numbers but no publications, that is `AGENCY ONLY` at
   scale and the prediction fails"*) and was right. Finding 2.

2. **G.20 finding 3's table — one item understated.** It renders
   `Research.EU.md` §10 item 1 as "Statistical Requirements Compendium
   (latest)". The brief actually says **"Eurostat Statistical Requirements
   Compendium (latest) *and the list of main statistics*"**. The omitted half
   turns out to be the most node-shaped material found this session
   (`list-main-stats-2025-na`), so the omission mattered. G.20's wider claim —
   that the Eurostat strand is §10 executed in order — is **confirmed**, and this
   makes it slightly stronger, since item 1 was executed in both halves.

3. **G.23 correction 5 — discharged.** Both briefs read first-hand; G.20 finding
   1 confirmed in every particular. Finding 3.

4. **G.21 finding 5 / G.22 finding 3 / G.23 priority A8 — closed.** The
   `SEC*.pdf` retrieval URL is established and hash-verified. Finding 1.

5. **No finding in G.15-G.18 was checked this session**, and none should be
   treated as revisited.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10).**

1. ~~**SEC05**~~ DONE (G.21). ~~**SEC06, SEC07**~~ DONE (G.23).
   ~~**SEC00 nomenclature key**~~ CLOSED (G.22). ~~**A8, retrieval URL**~~
   **CLOSED this session** — finding 1.
2. **NEW, and it is now the cheapest high-value item in the branch: backfill the
   URLs and import.** 43 Part A records across four files are ready, the pattern
   is confirmed, and nothing blocks it. Verify the other ten URLs by fetch first
   (finding 1's caveat), then write the first `EU/slices/eu-level/` slice.
   **This would be the branch's first imported data in its entire history.**
3. **SEC01 (Parliament), SEC02 (Council)** — next extraction targets. SEC01
   (53 pp) is the outlier: 14 `7.2.19SPEC` lines with no analogue elsewhere.
   SEC02 (38 pp) carries the G.18 headcount gap. Both come with cheap check 5
   for free.
4. **SEC08 (29 pp), SEC09 (31 pp), SEC10 (38 pp)** — the three smallest, all on
   disk, never opened for extraction. SEC10 first: only section using the literal
   `X` numeral and the only `PPPA` code.
5. **Part B** — `sc-51`…`sc-57` (G.21), `sc-58`…`sc-62` (G.22), `sc-63`…`sc-68`
   (G.23), **`sc-69`…`sc-73` this session**. `sc-47`…`sc-50` remain **reserved**.
   Still outstanding: recovering those, and SEC04's addendum.
6. **SEC06_batch.md** — still wanted once, format check only.

**B — SEC03 meta backlog, after A.** Unchanged — G.15 items 6–12. SEC03
(1 114 pp) is its own corpus; SEC(2026) 250 (539 pp, retrievable, 533 unread)
belongs here too.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged in ranking.
`_staging/20-prose-sections.txt` (~399k chars, prose) plus the Eurosystem
consolidated balance sheet batch in JSON staging.

**D — Housekeeping.** Merge `Research.2.md` and `Research.EU.md`. **Now cheaper
and better specified than it has ever been**, because both are read and finding 3
records what they say. Five known inputs: restore §9's id list (or point
explicitly at `Research.1.md`); carry the Part B Output Rule somewhere it will be
seen; drop `Research.EU.md`'s stale closing line ("No extraction has been
performed"); fold in the priority-queue reconciliation at E5; and **decide whether
`Research.EU.md` §2's "or Official Journal reference" relaxation of the URL rule
survives the merge** (secondary observations).

**E — Everything the blob split created.**

1. ~~**Schema decision.**~~ DONE — G.20.
2. **Verify and slice the staged Eurostat strand** — 814 records. **The suggested
   first slice has changed.** G.20-G.23 suggested the ESA 2010
   transmission-programme material because it was the test of finding 6. That
   test is now run and the answer is negative, so the TP material is *less*
   attractive as a first slice. **Start instead with `list-main-stats-2025-na`
   split into its nine products** — it is the most node-shaped material in the
   staging area (codes, cadences, legal bases) and it is where the branch's first
   real edges are.
3. **The prose section** — `_staging/20-prose-sections.txt`, its own session.
4. **Reconcile the 49 duplicate and 77 id-less records.** **Upgraded from
   housekeeping to a prerequisite**, and it now has a worked example and a
   probable mechanism — two id-naming schemes for the same instrument. Finding 4.
5. **Reconcile the two priority queues.** Fold into the D merge.

## Cheap checks still outstanding

Done this session — **G.23's 1 and 2**, written up as findings 2 and 3.
Remaining, ordered by value per unit effort:

1. **Verify the other ten `SEC*.pdf` URLs by fetch.** Ten requests, gates
   priority A2. The pattern is confirmed for SEC05 only.
2. **Split `list-main-stats-2025-na` into nine records.** Mechanical, and it
   converts the branch's best staged material from discardable to importable.
3. **Retrieve Annex XI Article 1(4)** and check whether the ten Member States'
   sources are named by title. Closes G.22 finding 1's open limb, and now also
   tests whether the two-chain convergence holds at the annex level.
4. **Retrieve the Eurostat Report of 31 October** and establish its URL and
   whether the title recurs annually. Converts C736-03 into a mintable node.
5. **Pull the `[NA-Pen] / Table 29` thread** — the only table-to-publication tie
   in the corpus (secondary observations).
6. **Read the EBS Regulation 2019/2152** as the third independent test of the
   two-chain convergence. Named in `Research.EU.md` §1, never touched.
7. **Confirm the Destatis records are extraction rather than discussion.**
   G.20 finding 3 rests on string counts.
8. **Check whether sc-47–sc-50 exist anywhere.** The four numbers stay reserved
   until this is run.
9. **Check whether SEC01/SEC02 show the request-vs-table gap** (G.23 finding 2).
   Two sections is a pattern; four would be a rule. Free with priority A3.
10. **Characterise the 155 non-`S` loose records**; **match the 8 record-less
    batch headers**; **enumerate the `9`-series tags** beyond `SPEC`/`DAG`/`PPPA`.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this file.**

1. **This file (`G.24.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief, and **the only carrier of the §9
   node-id list** (finding 3).
3. **`EU/AnnexB_assessment_2026-08-05.md`** — the branch's central result.
4. **`EU/SEC05_PartA_2026-08-04.md`** — the format exemplar.
5. **`PartB_soft_connections_2026-08-04.md`** — required by the Part B Output
   Rule's own closing line, not merely conventional (finding 3).
6. **`EU/slices/README.md`** — layout; blocker resolved.
7. **The next target PDFs** — `SEC01.pdf`, `SEC02.pdf`. Already in `EU/`.
8. `Research_2_md.docx` / `Research_eu.docx` — **only if doing the D merge.**
   Read and summarised in finding 3; no longer needed for routine work.

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
