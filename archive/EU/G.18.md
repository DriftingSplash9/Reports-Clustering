# G.18.md — EU galaxy hand-off

Date: 2026-08-04
Governing briefs: Research.EU.md v0.1 (fixed) + Research.2.md v2.1 (fixed) — **still not seen**.
Predecessor: G.17.md (2026-08-04).

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

**What changed on 2026-08-04, after this session was written:**

- The folder was reorganised. Session logs for the Canada/US branch moved to
  `sessions/`; raw external research to `research-input/`; scratch to `notes/`.
  **`EU/` itself was deliberately left flat** — the `SEC*.pdf` files and `G.*`
  logs are where this note says they are.
- **`EU Meta jsons.docx` has been mechanically pre-split** into
  `EU/slices/_staging/`. The process note at the foot of this file speculates
  that scripted extraction "would lift that ceiling substantially" if the
  sandbox came back — it did, and it has. The blob is untouched and remains the
  archive of record. Staging now holds a lossless text extraction, a manifest
  indexing **73 batches / 659 Part A records**, 301 loose records, and the one
  ~399k-char ECB/Eurosystem batch that arrived as prose rather than JSON.
  `split_blob.py` sits alongside so it is reproducible.
- A cross-session working queue now exists at `TODO LISTS/rolling-todo.md`.
  Add to it rather than letting a thread die with a loose end in it.

**Filesystem access matters.** This note and its predecessors were written in
chat threads where documents had to be pasted or attached. If you can read the
folder directly, ignore every instruction below about what to attach — fetch it
yourself. If you cannot, the *What to pass at the start of next thread* section
is your packing list.

## Session conditions — read this first

Session type: **cross-section verification, not extraction**. Thomas's call, taken against the alternative of a full SEC05 extraction. No batch file was produced this session; the output is this note.

Three conditions constrained the work:

1. **The Linux sandbox failed to start** (`HYPERVISOR_VIRT_DISABLED`). No Python, no shell, no scripted extraction, no programmatic JSON validation. All reading was done through the file tool, which returns the full text layer of a PDF in one call. That worked well — text extraction quality is high and tables come through intact — but it is expensive in context, which caps a session at roughly four full sections.
2. **The governing briefs still did not arrive.** `Research_2_md.docx` and `Research_eu.docx` were not pasted. The field-set question from G.17 session-conditions remains open, and the D-item merge still cannot be done. Third session running.
3. **All eleven section PDFs arrived and are readable.** This is new and it is what made the session worth spending on checks. SEC00–SEC10 and `Soft Connections.docx` are all in the folder.

Part B was left untouched this session, per Thomas's instruction. `Soft Connections.docx` was not opened. The SEC04 addendum debt from G.17 still stands.

**Sections read in full this session: SEC05, SEC06, SEC07.** Everything below rests on direct reading of those three plus G.17's report of SEC04. Where a claim depends on G.17's SEC04 figures rather than on my own reading, it is marked *(SEC04 per G.17)*.

## Headline result

**DISC-07-03 is no longer an inference. It is established, and in a much stronger form than G.17 stated.**

G.17's formulation was "the code encodes a cost category with the section digit prefixed", supported by the leading digit agreeing across four sections. That formulation is correct but understates what is there. The full rule is:

> MFF code = `7.2.<section digit><category><subcategory>`, where `<category><subcategory>` is a **fixed two-digit cost taxonomy shared verbatim across all sections**.

Reading SEC05, SEC06 and SEC07 side by side, the trailing two digits align exactly, category for category, with no exceptions:

| Trailing | Cost category | SEC05 | SEC06 | SEC07 |
|---|---|---|---|---|
| x11 | Remuneration & allowances (1200/1202/129) | 7.2.511 | 7.2.611 | 7.2.711 |
| x12 | Other staff, traineeships (1400/1404/149) | 7.2.512 | 7.2.612 | 7.2.712 |
| x2_ | Members band (Chapter 1 0) | 7.2.521/522/523 | 7.2.623 | 7.2.723 |
| x31 | Entitlements & recruitment (1204/1408/1610) | 7.2.531 | 7.2.631 | 7.2.731 |
| x32 | Early termination (1220/1222) | 7.2.532 | 7.2.632 | 7.2.732 |
| x33 | Further training (1612) | 7.2.533 | 7.2.633 | 7.2.733 |
| x34 | Social, medical, canteens, nurseries | 7.2.534 | 7.2.634 | 7.2.734 |
| x41 | Data processing (2100/2102/2103) | 7.2.541 | 7.2.641 | 7.2.741 |
| x51 | Rent, lease, property (2000–2009) | 7.2.551 | 7.2.651 | 7.2.751 |
| x52 | Fitting-out, maintenance, energy, insurance | 7.2.552 | 7.2.652 | 7.2.752 |
| x53 | Security & surveillance (2026) | 7.2.553 | 7.2.653 | 7.2.753 |
| x61 | Missions, representation (162, 2546) | 7.2.561 | 7.2.661 | 7.2.761 |
| x62 | Meetings, events, expert assistance | 7.2.562 | 7.2.662 | 7.2.762 |
| x71 | Official Journal (2604) | — | 7.2.671 | 7.2.771 |
| x72 | Publishing, digital content | 7.2.572 | 7.2.672 | 7.2.772 |
| x73 | Documentation, library, archiving | 7.2.573 | 7.2.673 | 7.2.773 |
| x74 | Studies, consultations, foresight | 7.2.574 | 7.2.674 | 7.2.774 |
| x81 | Furniture, technical equipment, vehicles | 7.2.581 | 7.2.681 | 7.2.781 |
| x82 | Translation & interpreting | 7.2.582 | 7.2.682 | 7.2.782 |
| x83 | Current administrative expenditure | 7.2.583 | 7.2.683 | 7.2.783 |
| x9SPEC | Section-specific special lines | — | — | 7.2.79SPEC |

Two independent confirmations sit on top of the alignment:

**The `9SPEC` prediction landed.** G.17 called this "the cheapest high-value check available" and it paid. SEC04 carries `7.2.49SPEC` at item 3 7 1 0 *(per G.17)*. **SEC07 carries `7.2.79SPEC` at four separate lines** — items 2 5 4 1 (Third parties), 2 5 4 4 (Support to networks and fora), 2 6 0 3 (EU Councillors), and Article 2 6 4 (Communication activities of the political groups). An alphanumeric suffix recurring across two independently drafted sections with only the section digit changed is not a coincidence a reasonable reading can sustain. Note that `9SPEC` is **not** universal: SEC05 and SEC06 have none. It appears where a section has lines that fall outside the shared taxonomy, and SEC07 — with its political groups and its networks — has four of them.

**The code follows content, not line number.** SEC06's item 1 4 0 8 carries 7.2.631 (entitlements band); SEC07's item 1 4 0 8 carries 7.2.783 (admin band). The reason is visible in the headings: SEC07 has broadened that line to "…and other expenditure for services to staff during their career". Same item number, different content, different code. This is direct evidence for the "cost category" reading over any "line-number lookup" reading, and it also means the codes cannot be used to match lines across sections without checking the heading.

G.17's three specific refinements all hold: codes are not chapter- or Title-scoped (7.2.552 spans Articles 2 0 0 and 2 0 2 in SEC05; 7.2.734 spans items 1630–1638 in SEC07), the section digit is prefixed, and one code is alphanumeric.

Still an inference in one narrow respect: **no document in any of the four sections states the rule.** The codes appear only as an unexplained "MFF" column. That gap is now the only thing standing between this and a documented fact, and it is worth one targeted look in SEC00 (which, as the Commission's own section, is the likeliest place for a nomenclature key to be printed).

## Findings

### 1. G.16 finding 5 — G.17's correction is confirmed, and the two code families behave differently

G.17 proposed `7.1.2<section>` against G.16's "shared code" hypothesis. Confirmed on the SEC04/SEC06 pair: SEC04's European Schools line carries `7.1.24` *(per G.17)*, SEC06's item 1 6 4 0 carries `7.1.26`. Directly read in SEC06.

The structural point G.17 did not draw out: **the 7.1 family puts the section digit last, the 7.2 family puts it first.** `7.1.2<section>` versus `7.2.<section>xx`. This is consistent with 7.1 being the Pensions-and-European-Schools sub-ceiling, where the category (`2` = European Schools) is fixed and only the contributing institution varies, so the section digit has nowhere to go but the end. It is a coherent scheme rather than an inconsistency, but anyone matching codes mechanically will get it wrong.

Prediction still open: `7.1.25` in SEC05, `7.1.27` in SEC07, `7.1.29` in SEC09, `7.1.2X` in SEC10. **Note that SEC05 and SEC07 have no European Schools line at all** — I checked both Chapter 1 6 tables in full. So the prediction can only be tested on SEC09 and SEC10, and the absence in SEC05/SEC07 is itself worth recording: the contribution is not universal across institutions.

**G.17's transcription-slip suspicion is wrong, and the divergence is real.** SEC06 carries the line at item **1 6 4 0**, headed "Contribution to accredited Type II European Schools", under Article 1 6 4 "Contribution to accredited European Schools". G.16 recorded it correctly. SEC04 carries its European Schools service agreement at item **1 6 5 6** *(per G.17)*. These are different item numbers for related but not necessarily identical things — SEC06's is a contribution to accredited Type II schools, SEC04's is described as a service agreement. Before treating this as a numbering divergence, confirm SEC04's item 1 6 5 6 heading verbatim; it may be a different instrument rather than a different number for the same one.

Supporting datum: SEC05's Chapter 1 6 uses an Article **1 6 5** band ("Activities relating to all persons working with the institution") containing items 1 6 5 0 / 1 6 5 2 / 1 6 5 4, where SEC06 and SEC07 use Article **1 6 3** for the same content. So the 1 6 5x range is genuinely in live use in the Luxembourg sections and genuinely absent from the Brussels ones. That makes SEC04's 1 6 5 6 much more plausible as a real item number than as a slip.

### 2. Item 3 0 1 1 — divergence confirmed, but it is not five-way and the template hypothesis fails

Four verbatim strings, all read directly except SEC04:

| Section | Citation at item 3 0 1 1 | Heading |
|---|---|---|
| SEC04 *(per G.17)* | "Article 11(2) and Article 48 of Annex VIII" | **Remarks** |
| SEC05 | "Article 4, Article 11(2) and (3) and Article 48 of Annex VIII" | Legal basis |
| SEC06 | "Article 4, Article 11(2) and (3) and Article 48 of Annex VIII" | Legal basis |
| SEC07 | "Article 11(2) and Articles 17 and 48 of Annex VIII" | Legal basis |

**SEC05 and SEC06 are character-identical.** That kills the "every section differs" framing. What exists is a majority form shared by at least two sections, with two outliers: SEC04 (shortest, drops Article 4 and the (3)) and SEC07 (unique — introduces Article 17, which appears in no other section). SEC09 and SEC10 remain unchecked and would settle whether the majority form is the norm.

**The heading anomaly is SEC04-only.** G.17 raised the possibility that a recurring Remarks/Legal basis mismatch at this item would point to a shared defective template, which "changes what the finding means". It does not recur. SEC05, SEC06 and SEC07 all use *Legal basis*, consistently with items 3 0 1 0 and 3 0 1 2 around them. The shared-defective-template hypothesis is refuted on three sections. SEC04's heading is a one-off and should be treated as a SEC04 defect.

Adjacent divergence worth logging, found incidentally: **item 3 0 1 2 is treated three different ways.** SEC05 gives a generic legal basis (Staff Regulations + CEOS, no article cited); SEC06 gives **none at all**; SEC07 gives a specific one (Article 40(3) and Article 83(2); CEOS Articles 41 and 43). Same p.m. line, same heading, three treatments. This is a cleaner example of the same phenomenon than 3 0 1 1 and may be the better line to build the divergence family around.

### 3. The unreconciled-total pattern is one phenomenon, it is documented, and G.16's characterisation of SEC06 is wrong

This is the finding that changes most.

G.17 asked to separate (a) narrative-vs-nomenclature gaps, which the preamble explains, from (b) headline-vs-own-sum gaps inside a single table, which it does not — and noted that G.16 described SEC06's gap as type (b). **I checked every total in all three sections by hand. There are no type (b) gaps anywhere.**

| Section | Narrative total | Nomenclature total | Gap | Titles sum to their own total? |
|---|---|---|---|---|
| SEC05 | 206 168 000 | 205 670 000 | 498 000 | Yes, exactly |
| SEC06 | 187 651 416 | 183 122 221 | 4 529 195 | Yes, exactly |
| SEC07 | 142 600 414 | 138 750 785 | 3 849 629 | Yes, exactly |

Every Title total equals the sum of its chapters; every grand total equals the sum of its Titles. Worked for all three. **G.16's report that SEC06's gap is a headline-vs-own-sum gap does not survive contact with the document.** SEC06's Title 1 (135 083 155) is exactly 25 327 493 + 101 268 000 + 6 349 973 + 2 137 689; Title 2 (48 039 066) is exactly its five chapters; the total (183 122 221) is exactly Title 1 + Title 2. Recommend G.16 finding on SEC06 be marked corrected.

**SEC05 supplies the decisive evidence that the remaining gap is the documented mechanism and not an error.** SEC05 prints its 2026 and 2027 columns side by side in the introduction table on page 2. The **2026 figures match the nomenclature exactly** (200 193 000 = 200 193 000). Only the **2027 column diverges** (206 168 000 vs 205 670 000). That is precisely the signature the preamble predicts: 2026 is already adopted and therefore fixed, 2027 is the estimate the Commission "exceptionally adjusted". G.17 records the same signature in SEC04 — the gap sits in the 2027 figures at item 1 4 0 0 while "the 2026 column agrees".

**The preamble is shared boilerplate, confirmed verbatim in SEC05, SEC06 and SEC07** (identical wording, identical box, immediately under the INTRODUCTION heading). It is not a SEC04 peculiarity.

Conclusion: there is one phenomenon, not two, and it is documented on the face of every section. This should stop being treated as a discrepancy family. What remains interesting is the *size* of the adjustment, which varies enormously — 0.24% for SEC05, 2.4% for SEC06, 2.7% for SEC07 — and that variation is a live question about how the Commission treated each institution.

### 4. S07-045 — closed. Found, and it is asymmetric

SEC07, page 21, as a **Remarks note under the Title 2 figures table** (not a budget line):

> "In 2026, the initial appropriations for the two committees' joint services, under Title 2, amounted to EUR 35 942 482 for the European Economic and Social Committee and EUR 26 257 635 for the European Committee of the Regions."

That is the cross-institutional Title 2 sub-allocation. Counterparties: EESC (Section VI) and CoR (Section VII), bilaterally. SEC04's negative result *(S04-143)* is correct and was always expected — the Court of Justice is not party to this arrangement.

**The asymmetry is the valuable part.** SEC07 states a specific euro figure *for the EESC*. **SEC06 carries no reciprocal note.** I read SEC06's Title 2 in full: the figures table on page 27 has no Remarks note of this kind, and the joint-services relationship appears in SEC06 only in the narrative introduction, in prose, without figures ("joint credits (in common with the CoR)", "joint IT services with the Committee of the Regions", "the sharing key, which corresponds to EUR 108 580 for the EESC"). One institution puts the other's number in its nomenclature; the other does not reciprocate.

This is a strong Part A candidate and arguably a better one than the SEC04 item 1 6 5 4 line G.17 nominated, because the figure is exact, the counterparty is named, both counterparties are inside SEC00–SEC10, and the attribution runs one way only.

Second, weaker candidate from the same section: SEC07 item 2 6 0 3 (EU Councillors) describes a network "created at the end of 2024 through the merger of the 'Building Europe with Local Entities (BELE)' pilot project run by the European Commission and the Committee's network", notes it "is featured in the mission letters of all the European Commissioners", and records that "This initiative has its origins in a European Parliament pilot project and the European Parliament will continue to be represented in the Steering Committee." Three institutions named in one budget-line remark. No shared figure, so it is a soft rather than hard edge — but it is Part B material if anything is.

### 5. The Luxembourg seat discriminator works, with a caveat that matters

SEC05 introduction, page 2, unnumbered:

> "The Draft budget 2027 includes in its **Chapter 12 and Chapter 14** the necessary appropriations for the payment of the temporary Housing allowance for staff in the lower grades of the salary grid residing in Luxembourg, to compensate for the high cost of living there."

Present in SEC05 (Luxembourg). **Absent from SEC06 and SEC07** (both Brussels) — I checked Chapter 10 0 and the staff chapters in both; neither mentions a housing allowance anywhere. The discriminator holds.

**But the two Luxembourg sections place and characterise it differently.** SEC04 carries it in **Chapter 10 0**, as a legal basis "that does not yet exist… awaiting adoption" *(per G.17)*. SEC05 carries it in **Chapters 12 and 14**, as live appropriations, with no "awaiting adoption" language at all. Either the instrument was adopted between the two sections' drafting, or the two institutions are treating the same pending instrument differently — one provisioning for it, one flagging it. Worth resolving directly against SEC04's Chapter 10 0 text; it bears on whether the "unadopted legal basis" or the "housing allowance" is the discriminator, and they are not the same test.

SEC05 is otherwise dense with seat-dependent material, more than G.17 anticipated: "indexation and inflation in Luxembourg" as the stated reason for breaching the Commission's 2% cap; the "'Brussels' effect — the cheaper living costs and perceived better lifestyle available for young staff in Brussels compared to Luxembourg" named as a recruitment problem; item 1 6 3 3 funding "the Court of Auditors' contribution to interinstitutional actions to improve Luxembourg's attractiveness as a workplace"; item 1 6 5 4 "the Early Childhood Centre and study centre in Luxembourg"; item 2 0 0 0 "expenditure on rents in Luxembourg"; item 2 0 0 3 the Kirchberg extension. If the seat-dependency question is worth pursuing, SEC05 is the richest source in the set.

### 6. Article 21 citation variants — split cleanly, and the split is informative

SEC04 stated the formula three ways: 21(3) throughout, 21(2) at article 3 3 1 only, bare 21 at article 3 3 8 only *(per G.17)*.

| Article | SEC04 | SEC05 | SEC06 | SEC07 |
|---|---|---|---|---|
| 3 3 1 | 21(2) | 21(2) | 21(2) | 21(2) |
| 3 3 8 | bare 21 | 21(3) | 21(3) | 21(3) |

**The 21(2) at article 3 3 1 is systematic — four sections out of four.** It is deliberate drafting, not error, and it makes sense: 3 3 1 is revenue from foundations, subsidies, gifts and bequests, which is the Article 21(2) category rather than the general 21(3) assigned-revenue rule. This should be removed from the anomaly list entirely.

**The bare "21" at SEC04's article 3 3 8 is a SEC04-only defect** — three sections against it. Almost certainly a typo. Also removable, once recorded.

This closes G.17's secondary observation cleanly in both directions, which is the useful outcome: one variant was meaningful and is now explained, the other was noise and is now isolated.

## Secondary observations (logged, low priority)

* **Assigned-revenue boilerplate has three section-specific variants**, each internally consistent, none previously noted. SEC05: "*on* the lines which bore the initial expenditure" + "Amount of assigned revenue in accordance with Article 21(3) of the Financial Regulation: p.m." (colon form, always p.m.). SEC06: "*in* the lines which bore…" + "The amount … is estimated at EUR 1 000". SEC07: "*in* the headings which bore…". Preposition and sentence form both vary by section and never within one. This is a cheap and reliable section fingerprint, and it is the kind of thing that will otherwise generate false divergence findings.
* **SEC07 has a headcount discrepancy of exactly the SEC02 family shape.** The narrative on page 3 states "**498 posts** in the establishment plan (1 new specialised cybersecurity post)"; the staff table on page 35 gives Grand Total **497** for both 2027 and 2026. The narrative appears to be counting the requested new post while the table does not yet reflect it. **SEC05 does not have this problem** — narrative says 881, table says 881. So the mismatch is not universal, and G.17's suggestion that headcount gaps may be treatment differences rather than errors is supported: here it is a timing/inclusion difference with a visible cause. Worth carrying to the SEC02 work in priority A2.
* **SEC05 confirms the Part A candidate at item 1 6 5 4 recurs.** G.17 nominated SEC04's item 1 6 5 4 (Interinstitutional Children's Centre share) whose Annex I reason reads "Estimates provided by the Commission and the European Parliament." SEC05's Annex III gives item **1 6 5 4** (Early Childhood Centre) the reason "**Interinstitutional estimates**". Same item number, same reason-type, vaguer wording — SEC05 does not name which institutions. The edge shape recurs but degrades. SEC04 remains the better instance of the two.
* **The Financial Regulation identification pattern does not hold as G.17 described it.** G.17 records SEC04 identifying Regulation (EU, Euratom) 2024/2509 at exactly three articles (1 0 9 / 1 2 9 / 1 4 9). SEC06 identifies it at two entirely different places (article 4 1 9, and the Chapter 2 0 legal basis, Article 157) and gives articles 1 2 9 and 1 4 9 **no legal basis at all**. SEC07 identifies it at article 4 1 9 only. SEC05 identifies it at articles 1 0 9, 1 2 9 and 1 4 9 — matching SEC04's pattern. So the pattern is real but is a **Luxembourg/Court pair** rather than a general rule. The "Part A edge rests on those three lines" claim needs restating: it rests on SEC04 and SEC05.
* **SEC05 has no Chapter 2 6 and no Official Journal line.** Its information chapter is **2 7** (Information: acquisition, archiving, production and distribution), where SEC06 and SEC07 use 2 6. This is why SEC05 has no `x71` code. Chapter numbering is not stable across sections and should not be assumed when matching.
* **Standard abatement rates differ sharply**: SEC05 2.4%, SEC06 4.5%, SEC07 6.0%. SEC05 documents its derivation ("corresponds to 21,14 vacant posts"); SEC06 and SEC07 state the rate only. If abatement is ever used as a comparator, SEC05 is the only section that shows its working.
* SEC07 states it "operates with 36% less budget than the European Economic and Social Committee (EESC) under the current MFF, despite having the exact same number of Members" — a cross-institutional comparative claim in the narrative, checkable against SEC06's own figures. SEC06 total 183 122 221 vs SEC07 total 138 750 785 gives 24% less, not 36%. The claim is presumably about a different base (Title 2 joint services, or the MFF period rather than the year). **Not resolved** — flagged because it is a numeric claim by one institution about another, which is exactly the project's target shape, and it does not obviously reconcile.

## Corrections to prior sessions

1. **G.16 finding 5** — wrong, as G.17 suspected. Confirmed corrected: `7.1.24` (SEC04) ≠ `7.1.26` (SEC06).
2. **G.16 on SEC06's unreconciled total** — wrong. SEC06 has no headline-vs-own-sum gap; all its internal sums are exact. Its only gap is narrative-vs-nomenclature.
3. **G.17's transcription-slip suspicion on item 1 6 4 0** — wrong. G.16 recorded SEC06's item number correctly.
4. **G.17 finding 4's "five-way divergence"** — overstated. SEC05 and SEC06 are identical at item 3 0 1 1.
5. **G.17 finding 4's heading-anomaly / defective-template hypothesis** — refuted on three sections. SEC04-only.
6. **G.17 finding 3's two-phenomena hypothesis** — resolved to one phenomenon, documented.
7. **G.17's Article 21 secondary observation** — resolved; one variant systematic, one a SEC04 typo.
8. **G.17's "three lines" claim on the Financial Regulation** — holds for SEC04 and SEC05 only, not generally.

## Thomas's stated priority for the remaining work

**A — Institutional sections (SEC00–SEC10), finish first**

1. **SEC05 (Court of Auditors)** — read in full this session for checks, **not extracted**. It is a 40-page section and now well understood; extraction should be fast and can reuse everything above. Recommended next target. **SEC08 (Ombudsman)** — still not held, still needed.
2. **SEC06, SEC07** — both read in full this session for checks, neither extracted. Same position as SEC05. Between them, SEC05/06/07 are three sections that are one session each away from being done and whose content is now characterised.
3. **SEC01 (Parliament), SEC02 (Council)** — headline level only, need full treatment. The SEC02 headcount gap should be approached with SEC07's narrative-vs-table mismatch (498/497) in hand as a worked example of a benign cause.
4. **SEC00** — headline level only. **Additional reason to prioritise it:** it is the likeliest place for an MFF nomenclature key to be printed, which is the one thing that would convert DISC-07-03 from a very well-evidenced inference into a documented rule.
5. **Soft_Connections.docx (Part B)** — untouched this session by instruction. Still stuck at sc-46 on Thomas's end; missing sc-47–sc-50 from G.16; SEC04 still owes an addendum. This session generated at least two new candidates worth sc-numbers (the SEC07 Title 2 joint-services note, the SEC07 item 2 6 0 3 three-institution remark) once the Part B Output Rule's text is available.
6. **SEC07_batch.md** — **no longer needed.** Its two purposes (closing S07-045, and the item 3 0 1 1 string comparison) are both discharged above from the source PDF. Remove from the list.
7. **SEC06_batch.md** — still wanted once, but only for the format check now. The item 1 6 4 0 question in G.17 finding 2 is settled.

**B — SEC03 meta backlog, after A** (unchanged — see G.15 items 6–12)

**C — Independent ECB/Eurosystem threads, after B** (unchanged — see G.15 items 13–16)

**D — Housekeeping, whenever convenient**

* Merge Research.2.md and Research.EU.md into a single governing brief. Requested 2026-08-04, now outstanding three sessions, still blocked on the files being readable.

## Cheap checks still outstanding

Ordered by value per unit effort. All are single lookups in PDFs already in the folder.

1. **SEC00, SEC09, SEC10 MFF codes** — confirm `7.2.0xx` / `7.2.9xx` / `7.2.Xxx` and look for `9SPEC` variants. Also the only remaining test of `7.1.2<section>`, since SEC05 and SEC07 have no European Schools line.
2. **SEC00 for a printed nomenclature key.** The single highest-value item in the list if it exists.
3. **SEC09 and SEC10 item 3 0 1 1** — settles whether the SEC05/SEC06 form is the majority.
4. **SEC04 Chapter 10 0 verbatim** — resolve the housing-allowance placement divergence against SEC05's Chapters 12/14.
5. **SEC04 item 1 6 5 6 heading verbatim** — establish whether it is the same instrument as SEC06's 1 6 4 0.
6. **SEC06 Title 2 re-read for a reciprocal joint-services note** — I am confident there is none, but this underpins the asymmetry claim in finding 4 and deserves a second pass before it is relied on.

## What to pass at the start of next thread

Do not send `EU_Meta_jsons.docx`. This note plus the entry-ID watermarks carry state forward.

Send instead:

1. **This file (G.18.md)** — paste as text, don't attach.
2. **`Research_2_md.docx` and `Research_eu.docx`** — paste as text. Third time of asking; the D-item merge and the SEC04_batch.json field-set confirmation are both blocked on these and nothing else.
3. **The next target PDF** — `SEC05.pdf` per the priority above. **Already in the workspace folder**, along with all ten others, so nothing needs re-attaching unless the folder changes.
4. **`SEC06_batch.md`** — only if convenient, and now only for the format check.
5. **`Soft_Connections.docx`** — already in the folder; needed only once it is current past sc-46.

**One process note.** The upload-limit workaround from G.17 held: everything attached this session arrived. The binding constraint is no longer upload but **context** — reading three full sections consumed most of a session. If the sandbox comes back, scripted extraction would lift that ceiling substantially; if it does not, plan on roughly one full section per session for extraction work, or three to four for targeted checks.

> ⚠️ **Superseded 2026-08-04. Struck rather than deleted**, per the house
> convention, because it set the planning assumption for three sessions.
>
> The whole "one section per session" ceiling was an artefact of the **chat
> workflow** this branch used to run in: no filesystem, documents arriving by
> paste or attachment, no reliable code execution, and every page read costing
> context. None of those apply now that the branch runs somewhere with the
> folder mounted and scripting available. The blob that this note implies would
> take many sessions to work through was mechanically split in one pass.
>
> **Do not carry this constraint forward.** Plan against what the current
> environment can actually do, and if a future session is back in a
> paste-and-attach setting, say so in *Session conditions* rather than assuming
> the ceiling still holds.

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
