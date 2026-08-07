# G.21.md — EU galaxy hand-off

Date: 2026-08-04
Governing briefs: Research.1.md v1.0 (fixed) — **read in full this session.**
Research.2.md v2.1 and Research.EU.md v0.1 not re-opened; G.20 finding 1 records
what they say and that record was relied on rather than re-verified.
Predecessor: G.20.md (2026-08-04).

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
3. **`EU/SEC05_PartA_2026-08-04.md`** — new this session. The branch's **first
   Part A extraction record in the Research.1.md §6 format**, and therefore the
   worked example of what extraction output is supposed to look like here.
4. **`EU/slices/README.md`** — folder layout for EU data. Its schema blocker is
   resolved; the section is kept with the original text in a `<details>` block.
5. `REPORTS.md` (project root) only if the *direction* is in question, not for
   routine work.

Then say what the branch is doing and what is next. The answer to "what is next"
lives in *Thomas's stated priority for the remaining work*, below.

**Two corrections to how this file has been read, both still live.** (1) Three
predecessors described the branch as two unrelated bodies of work sharing a
file; G.20 finding 3 showed both are instruction-following. **Before concluding
that something in this branch is stray, check whether a brief asked for it.**
(2) The `.docx` files are all machine-readable and always were.

**Where things are, as of 2026-08-04 (second session of the day):**

- `EU/` — this branch. `SEC00.pdf`–`SEC10.pdf` (the institutional budget
  sections), the `G.*` hand-off logs and their `.json` sidecars, the governing
  briefs as `.docx`, `Soft Connections.docx`, `EU Meta jsons.docx`, and
  `PartB_soft_connections_2026-08-04.md`. New this session:
  **`SEC05_PartA_2026-08-04.md`**.
- `EU/slices/` — where verified EU graph data lands. `eu-level/`,
  `member-states/`, `cross-layer/`, `_staging/`. **Still nothing verified or
  imported**, and that is now the branch's oldest unmoved fact.
- Project root — `REPORTS.md`, `START-HERE.md`, `BACKLOG.md`, `EXPANSION-V1.md`,
  `Research.1.md`, `README.md`. Canada/US session logs in `sessions/`; raw
  external research in `research-input/`; scratch in `notes/`.
- `TODO LISTS/rolling-todo.md` — cross-session working queue.

**Filesystem access matters.** Older hand-offs are written for a chat workflow
where documents had to be attached. If you can read the folder directly, ignore
every instruction about what to attach — fetch it yourself.

**The PDFs are directly extractable.** `pypdf` reads all eleven `SEC*.pdf` files
cleanly, including the budget tables. A whole section is ~40 pages and takes
seconds. Three sessions treated these as expensive; they are not. Note that
extracted text renders the em-dash and some minus signs as `�`, which
matters if you grep for punctuation.

## Session conditions — read this first

Session type: **extraction, and the first one in this branch.** Every previous
`G.*` session was planning, measurement, schema or triage. This one read a source
document for evidence and produced Part A records in the `Research.1.md` §6
format.

What was available and used: full filesystem access, working Python with `pypdf`
and `python-docx`, and a working npm toolchain.

What **was** read in full: **`SEC05.pdf` (40 pages, every page)** and
`Research.1.md`. Read in part, by targeted search over fully extracted text:
`SEC00`–`SEC04` and `SEC06`–`SEC10` (all extracted to text in full; searched, not
read). `G.20.md` and `EU/slices/README.md` read in full.

What was **not** done, stated plainly because everything downstream inherits it:

- **`Research.2.md` and `Research.EU.md` were not re-opened.** G.20 finding 1's
  account of them is relied on second-hand. Marked *(per G.20)* wherever used.
- **Nothing was verified against a URL.** `SEC05.pdf` carries no OJ number, no
  COM/SEC number and no ELI of its own, and **no retrieval URL for it is recorded
  anywhere in this branch**. Every record in the new Part A file therefore
  carries a local path where `Research.1.md` §6 wants a URL. **This blocks
  import**, and it is a new blocker, not an inherited one — see finding 5.
- **No node was proposed and no edge was verified.** Nineteen Part A records, no
  Part B claims beyond the two soft connections added below.
- **The blob was not touched.** The 814 staged Eurostat records, the 82 Annex B
  hits, the prose section and the Destatis material are all exactly as G.20 left
  them.
- **The D-item merge was not performed**, for the second session running.

## Headline result

**Priority A1 is discharged — SEC05 is extracted — and the section's most
interesting property is a negative one: it names no statistical release at
all.** `Eurostat`, `HICP`, `consumer price` and `index` as a standalone word
return **zero hits across all 40 pages**, while `indexation` returns ten, every
one of them unqualified. An institutional budget section indexes several million
euros to something it never names. Ten of the nineteen records are `AGENCY ONLY`
or terminus candidates, which per `Research.1.md` §6 is the measurement, not the
disappointment.

Secondarily, and more usefully to the graph: **DISC-07-03 moved from a
one-section inference to a ten-section documented pattern.** The MFF code
taxonomy now has verbatim confirmation in seven sections for the European Schools
rule, an independent second confirmation in a completely different code series,
and a newly discovered sub-rule for special lines. It is still not printed in any
document — that narrow respect is unchanged — but the evidence base is an order
of magnitude larger.

## Findings

### 1. SEC05 extracted — nineteen Part A records, and a document that names no publication

`EU/SEC05_PartA_2026-08-04.md`. Nineteen records in the `Research.1.md` §6
format, each with URL, LOCATION, verbatim QUOTE, NAMES, TENSE and NOTES.

The shape of the result:

| Class | Count | Examples |
|---|---|---|
| Names a publication with a title | **3** | ISSAI 300 / ISSAI 400 (S05-08), ECA work programme + 2026-2030 Strategy (S05-06, S05-07) |
| `AGENCY ONLY` | **8** | S05-02, -03, -09, -13, -14, -15, -17, -19 |
| Terminus candidates | **2** more | "the working documents attached" (S05-05), "its multi-annual work programming exercise" (S05-06) |
| Legal instruments (probably not nodes) | 8 distinct | Staff Regulations, Reg. 2290/77, 2016/300, 2024/2509, … (S05-16) |
| Documented conflicts, not adjudicated | **2** | S05-12, S05-19 |

The three best records, in order of value to the graph:

- **S05-08** is the only place in the section where an external standard gets a
  title, a publisher *and* a page number: *"See 'ISSAI 300, Fundamental
  Principles of Performance Auditing', INTOSAI, page 41, and 'ISSAI 400,
  Fundamental Principles of Compliance Auditing', INTOSAI, page 28."* Same shape
  as the corpus's existing `sna-2008` / `imf-bpm6` / `ipsas` nodes. **Cadence is
  not stated**, so §4.2 is unmet from this source and neither is a node yet.
- **S05-07 → S05-06** is a clean internal chain: the ECA 2026-2030 Strategy
  directs the annual work programme, and the mission appropriation *"estimates
  its needs based on the results of its multi-annual work programming exercise,
  carried out in October of year n-2"*. A stated lag of two years, which is rare
  in this corpus. Note the trap avoided: the same sentence opens with *"coincides
  with"*, which is §5a language doing no dependency work — the dependency is in
  the *"which calls for us to … We will therefore"* clause.
- **S05-11** is the highest-value lead in the section and is deliberately
  incomplete. Articles 1 2 9 and 1 4 9 cite *"Staff Regulations of Officials of
  the European Union, and in particular Articles 65 and 65a thereof and Annex XI
  thereto."* **Annex XI is the salary-update method** — the instrument that
  produces the "+ 2,2 % / + 2,3 %" this budget is built on. SEC05 names it by
  reference and stops. See finding 6.

**What this rests on:** SEC05 was read page by page in full, and every quote was
copy-pasted from `pypdf`-extracted text rather than retyped. The search counts
were re-run and **three of them were wrong on the first pass** (`work programme`,
`indexation`, and the legal-basis instrument counts, which double-counted
citations appearing in ELI URLs). The published numbers are the corrected ones.

### 2. DISC-07-03 — the MFF taxonomy is now documented in ten sections, and has a new sub-rule

G.18 established the MFF code taxonomy as *"very well evidenced, and still an
inference in the one narrow respect that no document states the rule"*. G.20
carried it forward untouched and listed the `7.1.2<section>` form as *"the only
remaining test"*, testable only in SEC00/09/10.

All eleven sections were extracted to text and searched. Three results.

**(a) `7.1.2<section>` is confirmed, and every single hit is a European Schools
line.** Seven sections carry the code; three do not; SEC00 has no codes at all.

| Section | Code | Verbatim heading of the line carrying it |
|---|---|---|
| SEC01 (Parliament) | `7.1.21` | "European Parliament contribution for accredited Type II European Schools" (item 1 6 5 5) |
| SEC02 (Council) | `7.1.22` | "Schooling fees for Type II European Schools" (item 1 3 4 1) |
| SEC03 (Commission) | `7.1.23` | "Union contribution to the Type 1 European Schools" (chapter 21 02), one code per school |
| SEC04 (CJEU) | `7.1.24` | "European Schools" (item 1 6 5 6) |
| SEC05 (ECA) | — | **no European Schools line** |
| SEC06 (EESC) | `7.1.26` | "Contribution to accredited Type II European Schools" (item 1 6 4 0) |
| SEC07 (CoR) | — | **no European Schools line** |
| SEC08 (Ombudsman) | `7.1.28` | "European Schools" (item 1 6 5 0) |
| SEC09 (EDPS) | — | **no European Schools line** |
| SEC10 (EEAS) | `7.1.2X` | "Contribution to accredited Type II European Schools" (item 1 5 0 4) |

The final character is the section's own numeral, and **Section X uses the
literal letter `X`** — the code is keyed to the roman numeral, not to a decimal
index. G.20's prediction that SEC05 and SEC07 have no European Schools line is
**confirmed**, and SEC09 joins them.

**(b) An independent second confirmation, in a different series.** SEC03 carries
a pension series nobody has looked at, and it obeys the same last-digit rule:

`7.1.121` Pensions of former Members of the European Parliament · `7.1.122`
former Presidents of the European Council and Secretaries-General of the Council
· `7.1.123` former Members of the Commission · `7.1.124` former Members of the
Court of Justice · `7.1.125` former Members of the Court of Auditors · `7.1.128`
former European Ombudsmen · `7.1.129` former European Data Protection
Supervisors.

That is 1=EP, 2=Council, 3=Commission, 4=CJEU, 5=ECA, 8=Ombudsman, 9=EDPS —
seven institutions, in section order, in a series with **no connection to the
European Schools material**. 6 (EESC) and 7 (CoR) are absent, consistent with
their members not drawing EU pensions, though no document here says so.

**(c) New — a special-line sub-rule, `7.2.<section>9<TAG>`.** Five sections carry
codes where the series digit is `9` followed by letters:

| Code | Section | What it marks |
|---|---|---|
| `7.2.19SPEC` | SEC01 | Political groups, European political parties and foundations, visitor centres, Euroscola, liaison offices — 14 lines |
| `7.2.39DAG` | SEC03 | Decentralised agencies (`DAG`) |
| `7.2.49SPEC` | SEC04 | "Court's expenses" (item 3 7 1 0) |
| `7.2.79SPEC` | SEC07 | Third parties, EU Councillors, political groups of the CoR |
| `7.2.X9PPPA` | SEC10 | "Pilot project — Towards the creation of a European Diplomatic Academy" (`PPPA` = pilot projects and preparatory actions) |

So series `9` marks a line outside the standard administrative nomenclature, and
the alphabetic tag names the kind. This is new; no `G.*` log records it.

**What this rests on, and the limit that has not moved:** all of the above is
observed regularity across ten documents with verbatim headings, and **no
document states the rule**. `nomenclature` and `sub-heading` return zero hits in
SEC05; the column header "MFF" is never even expanded. DISC-07-03 is now
extremely well evidenced and **still an inference in exactly the respect G.18
named**. The one thing that would change that is a printed key, and finding 3
says where it is not.

### 3. SEC00 carries no MFF codes at all — cheap check 1's premise was wrong

G.20 cheap check 1 asked to confirm `7.2.0xx` in SEC00 and named SEC00 as *"the
single highest-value item in this list"* for a printed nomenclature key.

**SEC00 contains zero MFF codes.** One apparent hit is a false positive from a
date string (`OJ L 65, 7.3.2006`). It is 136 pages, it has no `SECTION N —`
header, and it is the **general introduction to the Draft Budget**, not a budget
section with line tables. There is no `7.2.0xx` family because there is no
Section 0.

This does not refute the taxonomy — it refutes the question. The check should be
re-aimed: if a printed key exists it is most likely in SEC00's prose (not
searched for that purpose this session, only for codes) or in the Financial
Regulation itself.

### 4. Cheap checks 3, 4 and 5 — all three answered, and two came back against their own framing

**Check 4 — the housing allowance. A real conflict, not a placement
convention.** Both institutions sit in Luxembourg, budgeting the same allowance
in the same year, and they contradict each other:

> **SEC05** (p. 2): "The Draft budget 2027 includes in its Chapter 12 and Chapter
> 14 the necessary appropriations for the payment of the temporary Housing
> allowance for staff in the lower grades of the salary grid residing in
> Luxembourg, to compensate for the high cost of living there."

> **SEC04** (p. 36, Chapter 10 0): "The appropriations entered in this chapter
> are purely provisional and may be used only after the legal basis for payment
> of a 'housing allowance for staff in Luxembourg' has been adopted and they
> have been transferred to other budget lines in accordance with the Financial
> Regulation."

SEC05 books it as a present entitlement; **SEC04 states its legal basis has not
been adopted.** Verified rather than assumed: SEC05's Chapters 1 2 and 1 4 carry
no dedicated housing line (items are 1 2 0 0 / 1 2 0 2 / 1 2 0 4 / 1 2 2 0 /
1 2 2 2 / 1 2 9 and 1 4 0 0 / 1 4 0 4 / 1 4 0 5 / 1 4 0 6 / 1 4 9), so it is
folded into general remuneration and cannot be sized. SEC05's own Chapter 10 0 is
`p.m.` with **no remark at all**. Per `Research.1.md` §3, both are quoted and
neither is picked.

**Check 3 — item 3 0 1 1. The answer is no.** The check asked whether the
SEC05/SEC06 legal-basis form is the majority. Surveyed across all ten sections
that have the line:

| Form | Sections |
|---|---|
| "Article 4, Article 11(2) and (3) and Article 48 of Annex VIII thereto" | SEC01, **SEC05**, **SEC06** |
| same + "thereof" | SEC09 |
| "Articles 4 and 11 thereof and Article 48 of Annex VIII" | SEC10 |
| "Article 11(2) and Article 48 of Annex VIII" | SEC04 |
| "Article 4 and Article 11(2) of Annex VIII" — **drops Article 48** | SEC02 |
| "Article 11(2) and Articles 17 and 48 of Annex VIII" — **adds Article 17** | SEC07 |
| "Staff Regulations of Officials of the European Union." — nothing further | SEC08 |
| No citation at all; a substantive Remarks paragraph instead | SEC03 |

The SEC05/SEC06 form is the **plurality at 3 of 10 (4 counting SEC09), not a
majority**. Eight distinct forms for one identical budget line is the actual
finding: there is no house style. The heading label diverges too — "Legal basis"
in seven sections, "**Remarks**" in SEC02, SEC03 and SEC04.

**Check 5 — SEC04 item 1 6 5 6 vs SEC06 item 1 6 4 0.** Both are European
Schools lines and both carry the `7.1.2<section>` code, so they are the **same
instrument class**. The headings differ in scope and the difference is not
cosmetic: SEC04's is the unqualified **"European Schools"** (€55 000, MFF
`7.1.24`), SEC06's is **"Contribution to accredited Type II European Schools"**
(`p.m.`, MFF `7.1.26`). SEC01's and SEC10's headings also specify "accredited
Type II"; SEC08's, like SEC04's, does not. Whether the unqualified form covers
Type 1 as well is not stated anywhere and is **not adjudicated here**.

### 5. New blocker — no SEC*.pdf has a recorded retrieval URL

`Research.1.md` §6 requires `URL: the document you actually opened`, and §2
requires every edge to carry a URL pointing at the document that says so. **No
retrieval URL for any `SEC*.pdf` is recorded in `EU/`, in any `G.*` log, or in
`_staging/01-manifest.json`.** `SEC05.pdf` internally carries no OJ number, no
COM/SEC number and no ELI of its own.

Every one of the nineteen new Part A records therefore carries a local path where
the standard wants a URL. **They cannot be imported until this is fixed**, and
the same will be true of SEC06, SEC07 and everything else in priority A.

This is cheap to fix and nobody has had to fix it before, because this is the
branch's first extraction. It needs Thomas or one web fetch, not a session.

### 6. Annex XI to the Staff Regulations is a second candidate cross-layer instrument

Logged as a prediction so it can be scored, in the house style.

`EU/slices/README.md` says the cross-layer folder exists for documented
obligations running from the supranational layer to national ones, and names ESA
2010's Annex B as the candidate. **Annex XI to the Staff Regulations is a second
one, of a different kind**, and it is reachable from material already in hand.

The chain SEC05 establishes and then drops: the ECA's three largest chapters are
built on a salary adjustment of "+ 2,2 % / + 2,3 %" (S05-03); those figures come
from "the guidelines issued by the Commission" (`AGENCY ONLY`); and the
provisional appropriations that absorb the update cite "Annex XI" to the Staff
Regulations as their legal basis (S05-11). SEC05 stops there.

**The prediction:** Annex XI's own text names its inputs — national price and pay
indices, and a joint index compiled by Eurostat — and does so by title, because
it is a method annex and method annexes have to. If so it is a supranational
instrument naming member-state statistical releases as inputs, which is the exact
edge shape the Canada/US pair was measured to lack.

**The cheap test:** open Annex XI and grep for `Eurostat`, `joint index`, `index`
and the names of member-state statistical offices. One lookup.

**Both ways are worth as much.** If Annex XI names only "the indices" with no
titles, it is `AGENCY ONLY` at the top of a chain carrying most of the EU
administrative budget — which would be a strong result in its own right and
directly comparable to the Bank of Canada finding in `Research.1.md` §8 item 2b.

## Secondary observations (logged, low priority)

- **The boilerplate ratio in these documents is extreme, and it will skew any
  frequency measure.** In SEC05 the short title "Financial Regulation" appears
  **56 times, of which 51 are a single formatting sentence** ("Amount of assigned
  revenue in accordance with Article 21(3) of the Financial Regulation: p.m.").
  Anyone ranking instruments by mention count would rank it first on an artefact.
- **The introductory paragraph of every section is byte-identical** (S05-01). It
  is one provision appearing ten times, not ten provisions, and it should be
  recorded once.
- **`Research.1.md` §7's "consolidated statute pages truncate" has an analogue
  here:** `pypdf` renders em-dashes and some minus signs as `�`. Greps for
  punctuation will silently miss. Text-string greps are unaffected.
- **SEC03 is not one more section and should not be scoped as one.** Page counts
  for the set: SEC00 **136**, SEC01 53, SEC02 38, **SEC03 1 114**, SEC04 37,
  SEC05 40, SEC06 39, SEC07 35, SEC08 29, SEC09 31, SEC10 38. SEC03 is larger
  than the other ten combined by a factor of nine, carries 291 MFF-code matches
  against SEC05's 55, and holds whole code families (`7.1.11`, `7.1.12x`,
  `7.2.39DAG`) that appear in no other section. The 1 114 figure matches the
  "1,114-page document" already referenced at sc-43 and sc-46, so this is a
  confirmation rather than a new measurement. When priority B is reached SEC03
  should be treated as its own corpus.
- **`scripts/eu-schema-smoke.ts` is still disposable**, per G.20, and still
  cannot be deleted because no EU slice has been imported.

## Corrections to prior sessions

1. **G.20 cheap check 1 — premise refuted in part.** "SEC00, SEC09, SEC10 MFF
   codes — confirm `7.2.0xx` / `7.2.9xx` / `7.2.Xxx`" is right for SEC09 and
   SEC10 and **wrong for SEC00, which carries no MFF codes at all** because it
   is the general introduction rather than a budget section. Finding 3.

2. **G.20 cheap check 1 — scarcity overstated.** It called SEC00/09/10 "the only
   remaining test of `7.1.2<section>`, since SEC05 and SEC07 have no European
   Schools line". The test was in fact available in **eight** sections and had
   never been run in any of them. It is now run in all ten. Finding 2(a).

3. **G.20 cheap check 3 — question answered, framing refuted.** "Settles whether
   the SEC05/SEC06 form is the majority." It is not: 3 of 10 exactly, 4 counting
   SEC09's near-identical variant, against eight distinct forms. Finding 4.

4. **G.18 / G.20 on DISC-07-03 — confirmed and extended, not corrected.** G.18's
   careful formulation ("very well evidenced, and still an inference in the one
   narrow respect that no document states the rule") survives intact and is now
   backed by ten sections instead of one. The inference caveat is **unchanged**
   and should not be dropped. Finding 2.

5. **G.20's *Thomas's stated priority* A1 — discharged.** "SEC05 (Court of
   Auditors) — read in full in G.18 for checks, **not extracted**. Still the
   recommended next extraction target." It is now extracted. G.18's
   characterisation of the section's content was accurate as far as this session
   could check it.

6. **G.20's *Thomas's stated priority* A1, second clause — refuted.** "**SEC08
   (Ombudsman)** — still not held." It is held: `EU/SEC08.pdf` is on disk
   (704 kB, 29 pages), and it was extracted to text and searched this session.
   The claim was inherited from a chat-era hand-off written when the file
   genuinely had not arrived, and nobody re-checked the folder after filesystem
   access appeared. **All eleven sections SEC00–SEC10 are present and
   readable.**

7. **No finding in G.15, G.16, G.17, G.18 or G.19 was checked this session**, and
   none should be treated as revisited. G.20's findings 1, 3, 4 and 5 were relied
   on but **not re-verified** — in particular the account of `Research.2.md` and
   `Research.EU.md` in G.20 finding 1 is used second-hand throughout this file.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10), finish first.** A1 moved this
session, for the first time in four sessions.

1. ~~**SEC05 (Court of Auditors)**~~ — **DONE.** Extracted;
   `EU/SEC05_PartA_2026-08-04.md`, nineteen Part A records. **SEC08
   (Ombudsman)** — G.20 recorded it as "still not held"; it **is** in `EU/` and
   was extracted to text this session. That entry can be closed.
2. **SEC06, SEC07** — now the recommended next extraction targets, and both are
   cheaper than SEC05 was: read and characterised in G.18, PDFs directly
   readable, and both already extracted to text. **Follow the format of
   `SEC05_PartA_2026-08-04.md`.** SEC07 additionally owes the two G.18 candidates
   an sc-number (see A5).
3. **SEC01 (Parliament), SEC02 (Council)** — headline level only. SEC01 is the
   outlier of the set: 14 `7.2.19SPEC` lines covering political groups, parties,
   foundations and visitor centres, none of which has an analogue elsewhere.
   Approach SEC02's headcount gap with SEC07's narrative-vs-table mismatch
   (498/497) in hand as a worked example of a benign cause.
4. **SEC00** — **re-aim this one.** It is the general introduction, 136 pages,
   with no budget lines and no MFF codes (finding 3). It remains the likeliest
   place for a printed MFF nomenclature key **in prose**, which is the one thing
   that would convert DISC-07-03 from inference to documented rule — but the
   code-pattern half of the old item is void.
5. **Soft_Connections.docx (Part B)** — **seven entries added this session,
   `sc-51`…`sc-57`**, in `PartB_soft_connections_2026-08-04.md`. These are the
   first Part B entries in the branch whose `evidence` column is a **Part A
   record id rather than a document pointer**, which is what §6 actually wants.
   **Numbering deliberately starts at 51**: `sc-47`…`sc-50` are reserved for
   G.16's missing entries so the two sets cannot collide. Still outstanding:
   recovering the G.16 numbers (cheap check 6), SEC04's addendum, and
   sc-numbers for G.18's two SEC07 candidates.
6. **SEC07_batch.md** — **no longer needed**, per G.18. Unchanged.
7. **SEC06_batch.md** — still wanted once, format check only.
8. **NEW — establish the retrieval URL for the SEC*.pdf set.** Finding 5.
   **This gates import of everything in priority A**, including work already
   done. One web fetch or one answer from Thomas. Cheapest high-value item in
   this whole file.

**B — SEC03 meta backlog, after A.** Unchanged — see G.15 items 6–12. Note the
secondary observation above: SEC03 should be scoped as its own corpus.

**C — Independent ECB/Eurosystem threads, after B.** Unchanged in ranking. A
substantial ECB/Eurosystem batch sits in `_staging/20-prose-sections.txt` (~399k
chars, prose, no script can index it) and the Eurosystem consolidated balance
sheet batch is in the JSON staging.

**D — Housekeeping, whenever convenient.** Merge `Research.2.md` and
`Research.EU.md` into a single governing brief. Unchanged and **not started**,
second session running. Three known inputs: restore §9's id list (or point
explicitly at `Research.1.md`), carry the Part B Output Rule forward somewhere it
will be seen, and drop `Research.EU.md`'s stale closing line. A fourth: fold in
the priority-queue reconciliation at E5.

**E — Everything the blob split created.** E1 done; E2–E5 unchanged and
untouched this session.

1. ~~**The `Country` / `JurisdictionLevel` schema decision.**~~ **DONE** — G.20
   finding 2.
2. **Verify and slice the staged Eurostat strand** — 814 distinct Part A records.
   One slice at a time, per `EU/slices/_staging/PROMPT-for-splitting-agent.md`.
   Suggested first slice: the ESA 2010 transmission-programme material.
   **Still the largest body of unworked material in the branch, and nothing
   blocks it.** Third session running with that sentence in the hand-off.
3. **The prose section** — `_staging/20-prose-sections.txt`, its own session.
4. **Reconcile the 49 duplicate and 77 id-less records** before anything is built
   on them.
5. **Reconcile the two priority queues.** See G.20's secondary observations. A
   one-paragraph decision, best folded into the D merge.

## Cheap checks still outstanding

Done this session — **1 (partly), 3, 4 and 5**, all four written up in findings
2, 3 and 4. Remaining, ordered by value per unit effort:

1. **NEW — open Annex XI to the Staff Regulations and grep for `Eurostat`,
   `joint index`, `index` and member-state statistical office names.** Finding 6.
   Scores a logged prediction either way, and it is the only item in this list
   that could produce a cross-layer edge. **Highest value in this list.**
2. **Read ten of the ESA 2010 / Annex B records for meaning** and settle whether
   Annex B names *publications* or only tables and deadlines. Carried from G.20
   unchanged; scores G.19's finding 6 either way. Now the second-highest.
3. **SEC00's prose, searched for a printed MFF nomenclature key.** Re-aimed per
   finding 3 — search the prose, not the code column. Strings: `nomenclature`,
   `sub-heading`, `heading 7`, `7.2.`, `classification of expenditure`.
4. **SEC06 Title 2 re-read for a reciprocal joint-services note** — underpins the
   asymmetry claim in G.18 finding 4. Carried from G.20 unchanged. Cheaper now:
   SEC06 is already extracted to text.
5. **Confirm the Destatis records are extraction rather than discussion.**
   Carried from G.20. G.20 finding 3 rests on string counts; one pass over the
   Destatis records upgrades it from provenance to substance.
6. **Check whether sc-47–sc-50 exist anywhere** — G.16 generated them and they
   are not in `Soft Connections.docx`. Grep `00-blob-fulltext.txt` and the `G.*`
   sidecars before assuming they were lost. **Those four numbers are now
   reserved** — this session started at sc-51 precisely so the question stays
   answerable — so nothing breaks if the check is deferred, but the four slots
   stay empty until it is run.
7. **Characterise the 155 non-`S` loose records.** 49 are known duplicates of
   batch content; the rest are unclassified. One pass over
   `10-loose-record.ndjson`.
8. **Match the 8 record-less batch headers to their records** by session window,
   and establish whether the 251 loose-only records are their missing bodies.
9. **Check whether the `9`-series sub-rule has more tags** than `SPEC`, `DAG` and
   `PPPA`. Finding 2(c) found three across ten sections; SEC03 alone has 291
   codes and was searched only for the `9` pattern, not enumerated.

## What to pass at the start of next thread

**If the next agent can read the folder, pass nothing — point it at this file.**
Everything below is the packing list for a chat thread that cannot.

1. **This file (`G.21.md`)** — paste as text, do not attach.
2. **`Research.1.md`** — the standing brief. Non-negotiable, and no summary
   substitutes for it. It is the only carrier of the §9 node-id list;
   `Research.2.md` dropped it.
3. **`EU/SEC05_PartA_2026-08-04.md`** — the worked example of Part A output in
   this branch. New, and the thing to imitate for SEC06 and SEC07.
4. **The next target PDF** — `SEC06.pdf` per priority A2. Already in `EU/`.
5. **`PartB_soft_connections_2026-08-04.md`** — the current Part B list, in place
   of `Soft Connections.docx`, which is larger, duplicated and not valid JSON.
6. **`EU/slices/README.md`** — layout. The blocker in it is resolved.
7. **The retrieval URL for the `SEC*.pdf` set**, if Thomas has it. Priority A8,
   and it gates import of everything already extracted.

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
