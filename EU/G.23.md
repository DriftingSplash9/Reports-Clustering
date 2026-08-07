# G.23.md — EU galaxy hand-off

Date: 2026-08-05
Governing briefs: Research.1.md v1.0 (fixed) — relied on directly, read in full
2026-08-04. Research.2.md v2.1 and Research.EU.md v0.1 **still not opened**;
G.20 finding 1's account of them is now used at one remove for the third
consecutive session. See correction 5.
Predecessor: G.22.md (2026-08-05).

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
3. **The four Part A records**, which are the branch's actual research output:
   - `EU/SEC05_PartA_2026-08-04.md` — Section V, 19 records. The format exemplar.
   - `EU/SEC06-SEC07_PartA_2026-08-05.md` — Sections VI and VII, 9 records.
   - `EU/AnnexXI_PartA_2026-08-05.md` — the salary-update chain, 12 records.
   - `EU/SEC250_PartA_2026-08-05.md` — MFF heading 7 and the nomenclature, 3.
4. **`EU/slices/README.md`** — folder layout for EU data. Its schema blocker is
   resolved; the section is kept with the original text in a `<details>` block.
5. `REPORTS.md` (project root) only if the *direction* is in question.

Then say what the branch is doing and what is next. The answer to "what is next"
lives in *Thomas's stated priority for the remaining work*, below.

**Corrections to how this file has been read, all still live.** (1) The branch is
not two unrelated bodies of work; G.20 finding 3 showed both strands are
instruction-following. **Before concluding something here is stray, check whether
a brief asked for it.** (2) The `.docx` files are all machine-readable and always
were. (3) All eleven `SEC*.pdf` are present and directly extractable with
`pypdf`.

**Where things are, as of 2026-08-05 (second session of the day):**

- `EU/` — this branch. `SEC00.pdf`–`SEC10.pdf`, the `G.*` logs and their `.json`
  sidecars, the governing briefs as `.docx`, `Soft Connections.docx`,
  `EU Meta jsons.docx`, `PartB_soft_connections_2026-08-04.md`, and the four
  Part A records above (one new this session).
- `EU/slices/` — **still nothing verified or imported.** The branch's oldest
  unmoved fact, and the reason is now a single external blocker (priority A8).
- Project root — `REPORTS.md`, `START-HERE.md`, `BACKLOG.md`, `EXPANSION-V1.md`,
  `Research.1.md`, `README.md`.
- `TODO LISTS/rolling-todo.md` — cross-session working queue.

**Network access works, with one exception that now shapes the priorities.**
`curl` and `WebFetch` reach `commission.europa.eu`, `parlament.gv.at` and
ordinary hosts. **`eur-lex.europa.eu` is anti-bot gated to every client here** —
HTTP 202 with a zero-byte body, on both the `legal-content` and `budget/data`
paths, for `curl` (browser user-agent) and `WebFetch` alike. A 202-empty is
**not** a 404 and proves nothing about content. National parliament document
registers are official mirrors and do work.

**Encoding note for anyone scripting over the extracted text.** `pypdf` renders
em-dashes and some minus signs as a replacement character, and the Windows
console is cp1252 — printing extracted text raises `UnicodeEncodeError` unless
you set `PYTHONIOENCODING=utf-8`. Cost this session two failed commands.

## Session conditions — read this first

Session type: **extraction.** Priority A2, which had not moved in two sessions.

What was read, and how much: **`SEC06.pdf` (39 pp) and `SEC07.pdf` (35 pp), both
read in full.** `G.21.md` and `G.22.md` read in full. Figures cross-checked
against `SEC05.pdf`, already extracted in G.21.

What was **not** done:

- **No external retrieval was attempted.** The session worked entirely from
  disk. The EUR-Lex gate (above) is unchanged and untested this session.
- **Priority A8 did not move** and cannot move from here — it needs a browser.
- **No node was proposed and no edge was verified.** Nine new Part A records;
  no slice written, nothing imported. Corpus unchanged at 133 reports /
  213 dependencies; `npm run check` and `npm run validate` both clean.
- **The blob was not touched**, fourth session running.
- **The D-item merge was not performed**, fourth session running, and correction
  5 raises what that now costs.
- **SEC01, SEC02, SEC08, SEC09, SEC10 were not extracted.** Searched only.

## Headline result

**The two committees share their services and only one of them says so — and
that turned out to be the smaller pattern inside a larger one.**

G.18 flagged an asymmetry in SEC07's Title 2 and it is confirmed: the Committee
of the Regions prints the joint-services split **for both committees**, and the
EESC prints nothing at all. SEC06 has zero occurrences of "joint service(s)" in
39 pages. The same asymmetry repeats on cybersecurity, where SEC06 describes a
joint approach with the CoR and cites Regulation (EU, Euratom) 2023/2841 four
times, and **SEC07 never mentions that regulation at all.**

But the more useful finding is arithmetic. **Every institution's headline
"increase" is a number the Draft Budget does not grant.** SEC06 advertises a
total increase of **4,47 %**; its own expenditure table shows **1,95 %**. SEC05
advertises 2,98 % against 2,74 %. Both documents print both figures, and the
boilerplate paragraph at the head of every section — which S05-01 recorded in
G.21 with no numbers behind it — is the only thing that explains why. This is
`sc-46`'s non-reconciliation shape, occurring **inside a single document**, twice
out of two sections checked.

And the running negative held: **`Eurostat` and `HICP` return zero hits in SEC06
and SEC07**, as in SEC05. Three institutional sections out of three name no
statistical release of any kind.

## Findings

### 1. The joint-services asymmetry is confirmed, and it is not a one-off

`EU/SEC06-SEC07_PartA_2026-08-05.md`, record S67-01. Discharges `G.22.md` cheap
check 4 and confirms G.18 finding 4.

SEC07 (CoR), Title 2, in the Remarks block following the total:

> "In 2026, the initial appropriations for the two committees' joint services,
> under Title 2, amounted to EUR 35 942 482 for the European Economic and Social
> Committee and EUR 26 257 635 for the European Committee of the Regions."

SEC06 (EESC) at the corresponding position has **no Remarks block**. Verified
mechanically rather than by eye: in SEC06 the string "Title 2 — Total" is
followed by "CHAPTER"; in SEC07 it is followed by "Remarks".

`NOT FOUND` in SEC06, strings searched over its full text: "joint service" **0**,
"joint services" **0**, "sharing key" 1, "joint credits" 1, "in common with" 1.
The three non-zero hits are all in the **narrative introduction**, never against
a budget line.

**It repeats on a second subject.** SEC06 cites the Cybersecurity Regulation
(EU, Euratom) 2023/2841 four times, describes the remedy as necessarily joint
("both Committees need to work together"), and prices the EESC's share at
EUR 108 580 via "the sharing key". **SEC07 contains zero occurrences of
"Cybersecurity Regulation" or "2023/2841"** — despite being the other party.

So the asymmetry is not a drafting accident in one Remarks block. Which direction
it runs, though, **flips by subject**: on Title 2 the CoR discloses and the EESC
does not; on cybersecurity the EESC discloses and the CoR does not. Neither
institution is systematically the discloser. **Not adjudicated** — G.18's
framing, that the CoR discloses more, holds for Title 2 and does not generalise.

**Two things this does not establish.** The note is **past tense** and gives 2026
figures; **no 2027 joint-services split is stated in either section.** And "the
sharing key" is named with the definite article but defined nowhere in either
document — a terminus candidate, kind `unidentified` (S06-03).

### 2. The advertised increase is not the granted increase, and the gap is large

Record S67-02. This is the finding most likely to be quoted wrongly downstream,
so it is stated with the arithmetic.

Every section opens with identical boilerplate saying the Commission "has
exceptionally adjusted the estimates of all Institutions" and that introduction
figures may differ from "those integrated into the Draft Budget". G.21 recorded
that paragraph (S05-01) and noted it had no example behind it. It has two now:

| Section | Narrative request | Draft Budget table | Gap |
|---|---|---|---|
| SEC05 (ECA) | 206 168 000 | 205 670 000 | 498 000 |
| SEC06 (EESC) | 187 651 416 | 183 122 221 | **4 529 195** |

**The headline growth rates diverge much more than the totals**, because they are
ratios of a reduced numerator against an unchanged base. Computed against the
sections' own 2026 figures, which are identical in both places in both documents:

- **SEC06: the narrative says "A total increase of 4.47% compared to the year
  2026". The expenditure table gives +1,95 %.** Less than half the advertised
  increase survives.
- **SEC05: narrative +2,98 %; table +2,74 %.**

**No verdict**, per §3 — the document states both numbers and its own boilerplate
explains the mechanism. What it never does is reconcile them at the point of use,
and the narrative figure is the one in bold type on page 2. Anyone citing an
institution's "2027 increase" has to say which of the two they mean.

Two sections out of two checked. SEC07 states no narrative total in the same
form, so it could not be tested the same way.

### 3. A quantified obligation — the best instrument-to-budget-line link yet found

Record S06-01. SEC06 p. 4:

> "The Cybersecurity Regulation (EU, Euratom) 2023/2841 sets clear expectations
> for the budget to be allocated to cybersecurity across the EU institutions.
> Each EU entity must allocate a sufficient portion of its ICT budget to
> cybersecurity, with a long-term indicative target of at least 10% of the total
> ICT budget. Despite the repeated requests and the support from the rapporteur
> of the European Parliament, only 3.95% of the DIIT budget was allocated by the
> budgetary authority to cybersecurity in 2025."

A named act, a **quantified target**, and the institution's **measured shortfall
against it**, in one provision. Nothing in SEC05 comes close.

`relationship_type` is **not picked**: the regulation supplies no data, so
`uses_data_from` is wrong; "long-term indicative target" is weaker than a method;
`methodology_depends_on` is the closest fit. Flagged per §6 rather than chosen.

### 4. The EU layer has a documented *absence* of a formula

Record S06-02. SEC06 p. 4 on members' allowances:

> "This allowance was updated by the Council on 21 June 2024 with Decision (EU)
> 2024/1809, the first adjustment in 11 years. This represents a 26.55% increase
> in the daily allowance compared to 2013"

EUR 367 per meeting day, set under Article 301 TFEU, **frozen for eleven years,
then adjusted once by a dated decision, with no index named anywhere in the
section.**

`Research.1.md` §8 item 1b says explicitly that a provision showing there is *no*
formula is a finding, and asks for it to be quoted. This is that, at the EU
layer, and it pairs with `sc-62` from G.22 (the Annex XI ±2 % cap vs Alberta's
2 % cap). The branch now has two EU indexation data points of opposite kinds —
one formulaic and capped, one discretionary and frozen — which is exactly the
comparative material §8 item 1a says the corpus lacks.

### 5. A comparative claim that does not reproduce

Record S07-02. SEC07 p. 1:

> "Compounding this, the CoR operates with 36% less budget than the European
> Economic and Social Committee (EESC) under the current MFF, despite having the
> exact same number of Members."

Computed from the two sections' own 2027 expenditure totals — CoR 138 750 785,
EESC 183 122 221 — the CoR is **24,23 % less**, or 26,06 % less than the EESC's
*request*.

**This is not a contradiction and is not reported as one.** The claim says "under
the current MFF", i.e. the 2021-2027 period as a whole, and only 2027 figures are
in hand. It is a claim whose basis is unstated and uncheckable from these
documents. Per §3 both numbers go in and neither is picked. The "exact same
number of Members" limb *is* checkable and consistent — SEC07 states the CoR
comprises "329 elected representatives and 329 alternates".

Flagged because a comparative percentage with no stated basis is precisely the
kind of figure that gets repeated downstream as though it were measured.

### 6. Three sections, three times no statistical release

`Eurostat` **0**, `HICP` **0**, `consumer price` **0**, `index` as a standalone
word **0** — in SEC06 and SEC07, exactly as in SEC05. `indexation` returns 3 in
each, every hit unqualified.

G.21 reported this as SEC05's most interesting property and left open whether it
was a feature of the Court of Auditors. **It is not.** Three institutional
sections out of three examined in detail name no statistical release, no price
index and no Eurostat product, while budgeting explicitly for indexation.

This is the institutional-budget counterpart to G.22 finding 1: the EU layer's
administrative machinery is documented in detail and its statistical inputs are
not named anywhere in it.

## Secondary observations (logged, low priority)

- **Boilerplate density varies wildly between sections of the same size.** The
  assigned-revenue sentence appears **56 times in SEC06 and 13 times in SEC07**,
  for documents of 39 and 35 pages. A drafting-style difference, not a
  substantive one — and a further reason never to rank instruments by mention
  count (G.21 secondary observations, on the same trap in SEC05).
- **SEC06 and SEC07 have 19 and 20 "Legal basis" blocks**, against SEC05's 22.
  The three sections are comparable in structure despite very different content.
- **SEC07 uses "nomenclature" once**, at item 2 6 0 1, and it refers to the
  budget-line nomenclature ("This nomenclature responds to new realities of
  organising events after the COVID-19 pandemic"). It adds nothing to DISC-07-03
  and should not be mistaken for doing so.
- **`scripts/eu-schema-smoke.ts` is still disposable** and still cannot be
  deleted, because no EU slice has been imported. Fourth session running.

## Corrections to prior sessions

1. **G.18 finding 4 — confirmed, and its generalisation narrowed.** The Title 2
   asymmetry is real and is now verified mechanically. But the direction of
   disclosure **flips by subject** — the EESC is the discloser on cybersecurity
   and the CoR on Title 2 — so "the CoR discloses more" holds for Title 2 and
   does not generalise. Finding 1.

2. **G.22 cheap check 4 — discharged.** "SEC06 Title 2 re-read for a reciprocal
   joint-services note." There is none, and the absence is now a measured one.

3. **G.21 record S05-01 — completed rather than corrected.** It recorded the
   Commission-adjustment boilerplate and noted the two-sentence
   non-reconciliation with no numbers behind it. The numbers exist and are
   larger than the boilerplate's mild phrasing suggests. Finding 2.

4. **G.21 and G.22 priority A5 — closed.** "G.18's two new candidates (the SEC07
   Title 2 joint-services note, the SEC07 item 2 6 0 3 three-institution remark)
   still have no sc-numbers." They now do: `sc-64` and `sc-63`. Outstanding since
   G.18.

5. **G.20 finding 1 is now three sessions deep at one remove, and that is too
   many.** `Research.2.md` and `Research.EU.md` have not been opened since
   2026-08-04. G.21 relied on G.20's account, G.22 relied on it, and this file
   relies on it. **The next session should open both files before relying on any
   claim about them**, regardless of what else it does. This is a process defect,
   not a finding, and it is exactly the failure mode G.20's own headline
   described.

6. **No finding in G.15–G.19 was checked this session** beyond G.18 finding 4,
   and none should be treated as revisited.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10), finish first.**

1. ~~**SEC05 (Court of Auditors)**~~ — **DONE**, G.21.
2. ~~**SEC06, SEC07**~~ — **DONE this session.**
   `EU/SEC06-SEC07_PartA_2026-08-05.md`, 9 records.
3. **SEC01 (Parliament), SEC02 (Council)** — **now the recommended next
   extraction targets.** SEC01 (53 pp) is the outlier of the whole set: 14
   `7.2.19SPEC` lines covering political groups, European political parties and
   foundations, visitor centres and liaison offices, none of which has an
   analogue in any other section. SEC02 (38 pp) carries the headcount gap G.18
   flagged; approach it with SEC07's narrative-vs-table mismatch (498/497) in
   hand as a worked example of a benign cause, and now also with finding 2's
   request-vs-table gap, which is a *different* mismatch and should not be
   confused with it.
4. ~~**SEC00 for a printed MFF nomenclature key**~~ — **CLOSED**, G.22
   corrections 2 and 3. Do not re-open without new evidence.
5. **SEC08 (Ombudsman, 29 pp), SEC09 (EDPS, 31 pp), SEC10 (EEAS, 38 pp)** —
   **NEW as an explicit item.** All three are on disk, extracted to text and
   never opened for extraction. They are the smallest sections in the set and
   would complete block A apart from SEC00 and SEC03. SEC10 is the one to do
   first: it is the only section using the literal `X` numeral and the only one
   with a `PPPA` pilot-project code.
6. **Soft_Connections.docx (Part B)** — `sc-51`…`sc-57` (G.21), `sc-58`…`sc-62`
   (G.22), **`sc-63`…`sc-68` this session**. `sc-47`…`sc-50` remain **reserved**
   for G.16's missing entries. Still outstanding: recovering those, and SEC04's
   addendum.
7. **SEC06_batch.md** — still wanted once, format check only. **SEC07_batch.md**
   no longer needed, per G.18.
8. **Establish the retrieval URL for the `SEC*.pdf` set — pattern found, needs
   one browser fetch.** `eur-lex.europa.eu/budget/data/DB/<year>/en/SEC<nn>.pdf`,
   G.22 finding 3. **This still gates import of everything in priority A**, which
   is now **43 Part A records across four files**. Unchanged and unmovable from
   inside this environment. Cheapest high-value item in this file.

**B — SEC03 meta backlog, after A.** Unchanged — see G.15 items 6–12. SEC03
(1 114 pp) should be scoped as its own corpus, and **SEC(2026) 250 (539 pp, now
retrievable, 533 pages unread) belongs in this block** (G.22).

**C — Independent ECB/Eurosystem threads, after B.** Unchanged in ranking. A
substantial ECB/Eurosystem batch sits in `_staging/20-prose-sections.txt` (~399k
chars, prose, no script can index it) and the Eurosystem consolidated balance
sheet batch is in the JSON staging.

**D — Housekeeping, whenever convenient.** Merge `Research.2.md` and
`Research.EU.md`. **Not started, fourth session running.** Correction 5 makes
this more urgent than "whenever convenient" now reads: three consecutive
hand-offs have relied on a second-hand account of both files. Four known inputs:
restore §9's id list (or point at `Research.1.md`), carry the Part B Output Rule
somewhere it will be seen, drop `Research.EU.md`'s stale closing line, fold in
the priority-queue reconciliation at E5.

**E — Everything the blob split created.** E1 done; E2–E5 unchanged and untouched
this session.

1. ~~**The `Country` / `JurisdictionLevel` schema decision.**~~ **DONE** — G.20.
2. **Verify and slice the staged Eurostat strand** — 814 distinct Part A records.
   Suggested first slice: the ESA 2010 transmission-programme material.
   **Still the largest body of unworked material in the branch, and nothing
   blocks it.** Fifth session running with that sentence in the hand-off.
3. **The prose section** — `_staging/20-prose-sections.txt`, its own session.
4. **Reconcile the 49 duplicate and 77 id-less records.**
5. **Reconcile the two priority queues.** Best folded into the D merge.

## Cheap checks still outstanding

Done this session — **G.22's 4**, written up as finding 1. Remaining, ordered by
value per unit effort:

1. **Read ten of the ESA 2010 / Annex B records for meaning** and settle whether
   Annex B names *publications* or only tables and deadlines. Carried unchanged
   since G.20, and now the top of the list for the second session running.
   **G.22 finding 1 makes it the decisive test**: one chain has already come back
   `AGENCY ONLY` at the national boundary, and Annex B is the better instrument.
   Two data points either agree or they do not, and either is publishable.
2. **Open `Research.2.md` and `Research.EU.md`.** Not a research check — a
   process repair. Correction 5.
3. **Retrieve Annex XI Article 1(4)** and check whether the ten Member States'
   sources are named by title. Closes G.22 finding 1's open limb. EUR-Lex is
   gated; a national parliament register is how `COM(2025) 736` was obtained.
4. **Retrieve the Eurostat Report of 31 October** and establish its URL and
   whether the title recurs annually. Converts C736-03 into a mintable node.
5. **Confirm the Destatis records are extraction rather than discussion.**
   G.20 finding 3 rests on string counts; one pass upgrades it to substance.
6. **Check whether sc-47–sc-50 exist anywhere.** Grep `00-blob-fulltext.txt` and
   the `G.*` sidecars. The four numbers stay reserved until this is run.
7. **Check whether SEC01/SEC02 show the same request-vs-table gap** as finding 2.
   Two sections is a pattern, four would be a rule. One lookup per section, and
   it comes free with the priority A3 extraction.
8. **Characterise the 155 non-`S` loose records.** One pass over
   `10-loose-record.ndjson`.
9. **Match the 8 record-less batch headers to their records** by session window.
10. **Enumerate the `9`-series tags** beyond `SPEC`, `DAG` and `PPPA`.
    SEC(2026) 250 holds all 232 distinct codes in one file and is the cheapest
    place to do it.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this file.**
Everything below is the packing list for a chat thread that cannot.

1. **This file (`G.23.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief. Non-negotiable, and the only carrier
   of the §9 node-id list.
3. **`EU/SEC05_PartA_2026-08-04.md`** — the format exemplar to imitate.
4. **The next target PDFs** — `SEC01.pdf` and `SEC02.pdf` per priority A3.
   Already in `EU/`.
5. **`PartB_soft_connections_2026-08-04.md`** — the current Part B list, in place
   of `Soft Connections.docx`, which is larger, duplicated and not valid JSON.
6. **`EU/slices/README.md`** — layout. The blocker in it is resolved.
7. **`Research_2_md.docx` and `Research_eu.docx`** — per correction 5, these
   should actually be opened next session rather than carried.
8. **A browser, or someone with one**, for priority A8 and cheap checks 3 and 4.
   EUR-Lex is gated to this environment.

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
