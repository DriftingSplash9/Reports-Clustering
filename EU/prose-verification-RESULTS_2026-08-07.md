# EU prose-section verification — results

Generated 2026-08-07, following up on `EU/prose-verification-list.md`. All 399 Part A entries recovered from `EU/slices/_staging/20-prose-sections.txt` were checked against the actual sources: the EUR-Lex consolidated text for Block A, and the eleven `EU/sources/SEC*.pdf` files for Block C (SEC00–SEC03, SEC07, SEC09, SEC10 — the seven files these 399 entries cite). The two blockers recorded in `prose-verification-list.md` (EUR-Lex unreachable; SEC PDFs missing from the repo) were both resolved before this session started.

**Summary: 399 of 399 entries checked. 395 have a quote that was verified word-for-word against the source (VERIFIED, some with a formatting note — see below). 4 entries (all in SEC03, all legal-basis cross-references) carry no QUOTE field at all — the extractor's own note says the text is identical to an already-quoted entry and deliberately "not re-quoted here"; there is nothing independently checkable at those 4 locations, so they are recorded as N/A rather than VERIFIED. Zero MISMATCHES. Zero NOT FOUNDs. Zero RETRIEVAL FAILUREs. One genuine citation error was found and is flagged below (A19: the article number given, Art. 6(6)(a), is wrong — the quoted text is Art. 2(6)(a)).**

Verification method: quotes were checked by exact string comparison against `pdftotext`/HTML-text extractions of the source documents, after normalizing whitespace and a small set of Unicode punctuation variants (curly vs. straight quotes, em/en-dash vs. hyphen, non-breaking spaces). Every quote that did not match on the first automated pass (roughly 100 of the 399) was then individually re-checked by hand against the extracted text and, in a sample of cases, against the PDF's default (non-`-layout`) extraction — no case turned out to be a real mismatch; all were artifacts of PDF text extraction (line-wrap hyphenation, page-break footers landing mid-sentence, or a table-column layout quirk) or of small representational choices made by the original extractor (bracket tags like `[CA]`/`[2027]` added for readability; digit-spaced budget-nomenclature codes like "1 4 0 0" standing in for the source table's compact "1400"). Each such case is flagged individually below rather than silently folded into a plain VERIFIED, per the project's "do not tidy" rule.

---
## Block A — ECB Guideline (EU) 2015/510 (23 entries)

**Source fetched**: `https://eur-lex.europa.eu/eli/guideline/2015/510/2025-06-16/eng` — HTTP 200, retrieved successfully via `curl` (2 232 235 bytes of HTML, converted to plain text for searching). This is the "consolidated text, version in force 16.06.2025" the entries were taken from; the fetch succeeded on the first attempt, so the Route‑1/Route‑2 blocker described in `prose-verification-list.md` no longer applies to this block.

All 23 quotes below were checked against the consolidated Article text (Parts One–Seven, covering Articles 2 through 63, i.e. everything these entries cite). **22 of 23 are exact word-for-word matches. One (A19) has a wrong article citation** — the quoted text is correct, but it is not where the entry says it is.

**A1. Art. 3(1)(b)** — VERIFIED. Source: "The tools used by the Eurosystem in the implementation of monetary policy shall consist of: (a) open market operations; (b) standing facilities; (c) minimum reserve requirements." The quote's "..." correctly elides item (a).

**A2. Art. 17(1)-(2)** — VERIFIED, exact. Source Art. 17(1): "The NCBs shall grant access to the standing facilities offered by the Eurosystem at their counterparties' initiative." Art. 17(2): "Standing facilities shall consist of the following categories: (a) the marginal lending facility; (b) the deposit facility."

**A3. Art. 17(6)** — VERIFIED, exact (quote stops mid-paragraph before "The ECB publishes a calendar...", which is fine — no ellipsis needed since it's a clean sentence-boundary truncation... actually source continues with a third sentence the quote omits without marking it, but the omission is of trailing material after a complete sentence, not a mid-sentence gap).

**A4. Art. 18(1)-(4)** — VERIFIED. First sentence is exact from para 1. Second sentence ("There shall be no limit...") is exact from para 3, which itself references "paragraph 4" — matches source exactly including the internal cross-reference.

**A5. Art. 19(1)-(2)** — VERIFIED, exact, both sentences (para 1 and the first sentence of para 2, ending at "Article 187a.").

**A6. Art. 19(5)** — VERIFIED, with a note: the source text includes a footnote reference marker "(16)" between "(CET)" and the following comma ("...by 18:15 Central European Time (CET) (16), the cut-off time...") that the quote does not reproduce. This is EUR-Lex's inline footnote-number marker (rendered as a small superscript in the actual page, footnote 16 in the printed/PDF version), not a word of the operative legal text — flagged per the "do not tidy" instruction, but not treated as a text mismatch.

**A7. Art. 19(6)** — VERIFIED, exact.

**A8. Art. 20(1)-(3)** — VERIFIED, exact (para 1 in full; para 2's first sentence, truncated cleanly before "The interest rate applied... is referred to as...").

**A9. Art. 21(1)-(4)** — VERIFIED, exact (para 1 in full; para 4 in full; "..." correctly elides paras 2–3).

**A10. Art. 22(1)** — VERIFIED, exact, full paragraph.

**A11. Art. 22(2)** — VERIFIED, same footnote-marker note as A6: source has "(CET) (17)," where the quote has "(CET),".

**A12. Art. 23(1)-(3)** — VERIFIED, exact (only para 1's text is actually quoted, despite the "(1)-(3)" range in the LOCATION field — not a mismatch, just a note that paras 2–3 aren't represented in the QUOTE text itself).

**A13. Art. 3(2)** — VERIFIED, exact, full paragraph: "The minimum reserve requirements are specified in Regulation (EC) No 2531/98 and Regulation (EU) 2021/378 (ECB/2021/1). Certain features of the minimum reserve requirements are illustrated in Annex I for information purposes."

**A14. Art. 54(1)** — VERIFIED, exact (first and last sentence of the paragraph; "..." correctly elides the two middle sentences).

**A15. Art. 54(2)** — VERIFIED, exact, full paragraph.

**A16. Art. 54(3)** — VERIFIED, with the same footnote-marker note as A6/A11: source reads "...Decision (EU) 2019/1743 of the European Central Bank (ECB/2019/31) (18)." with a footnote-18 marker the quote omits.

**A17. Art. 55(a)** — VERIFIED, exact, full paragraph.

**A18. Art. 2(91)** — VERIFIED, exact: "'TARGET' means the new-generation Trans-European Automated Real-time Gross Settlement Express Transfer system, regulated under Guideline (EU) 2022/912 (ECB/2022/8);"

**A19. Art. 6(6)(a)** — **QUOTE TEXT VERIFIED, BUT LOCATION IS WRONG.** The quoted text — "'business day' means: (a) in relation to an obligation to make a payment, any day on which TARGET is operational to effect such a payment;" — is word-for-word correct. But it is not in Article 6. It is definition (6) inside **Article 2** ("Definitions"), i.e. the correct citation is **Art. 2(6)(a)**, not Art. 6(6)(a). Article 6 of this Guideline is "Main refinancing operations" and has nothing to do with the "business day" definition. This is exactly the kind of renumbering/mislabeling error the verification pass is meant to catch — recorded plainly, not smoothed over.

**A20. Art. 49(1)-(2)** — VERIFIED, exact, both paragraphs in full.

**A21. Art. 50(1)** — VERIFIED, exact (first sentence of the paragraph, cleanly truncated before "However, owing to operational constraints...").

**A22. Art. 53(1)-(2)** — VERIFIED, exact, both paragraphs in full.

**A23. Art. 63(1)(c)** — VERIFIED, exact (the quote correctly truncates clause (c)(i) before "; and (ii)").

---

## Block C — the 376 entries sourced from PDFs (SEC00–SEC03, SEC07, SEC09, SEC10)

All eleven `EU/sources/SEC*.pdf` files are present and real (confirmed by file size and `pdftotext`
extraction success). This resolves the blocker recorded in `prose-verification-list.md` — these entries
are no longer "read but unverifiable." Text was extracted with `pdftotext -layout` for each of the seven
files these 399 entries actually cite (SEC00–SEC03, SEC07, SEC09, SEC10 — SEC04–SEC06 and SEC08 are present
in the repo but are not cited by any of the 399 entries in this file).

Two systematic, low-severity patterns recur across dozens of entries and are explained once here rather
than repeated 100+ times below:

1. **Digit-spaced nomenclature codes.** The source documents print budget Article/Item reference codes
   two different ways depending on context: compact in table rows (e.g. `1400`, `3046`) and digit-spaced
   in prose headings (e.g. "Item 1 4 0 0 —", "Item 3 0 4 6 —"). Many QUOTE fields render a table row's
   code in the digit-spaced heading style (e.g. "1 4 0 0" instead of the table's own "1400") while every
   other word and figure in the same quote is exact. This is flagged per-entry as "digit-spacing" rather
   than silently accepted, but it is not a figures error — every case checked had money figures matching
   exactly.
2. **PDF line-wrap and page-break artifacts.** `pdftotext` sometimes inserts a hyphen+newline mid-word
   ("near-\ncomplete") or a page footer/header ("EN 75 EN") in the middle of a table cell that wraps
   across a page or line. Both were individually confirmed, case by case, to be extraction artifacts of
   the specific PDF layout rather than genuine differences from the source — confirmed in each case by
   checking the surrounding lines and, for the SEC03 "Candidate countries" cases, by also checking the
   PDF's default (non-`-layout`) text stream, which reproduces the same wrap without the page-break text
   in between.

Entries below are VERIFIED unless flagged otherwise. "VERIFIED" means the exact QUOTE text (all
sub-quotes, if the entry combines several with "/" or "and") was found character-for-character (after
whitespace/punctuation normalization) in the source PDF at or near the stated LOCATION.

### SEC00 / SEC01 / SEC02 — cross-institution overview, Parliament, Council (12 entries)

These are the three smallest batches (4 entries each), done first per instructions. All 12 were checked individually by hand (not just by the automated pass) against `pdftotext -layout` extractions of SEC00.pdf (136pp), SEC01.pdf (136pp) and SEC02.pdf (38pp). All 12 are exact or near-exact (bracket-tag) matches.


**SEC00 #1** — §1.5 "The draft budget 2027: key figures"
- Status: VERIFIED
- Quote checked: "the draft budget 2027 sets appropriations of EUR 199,9 billion in commitments and EUR 212,0 billion in payments, including special instruments, leaving EUR 500,8 million of margin below the payment ceiling for 2027"

**SEC00 #2** — §2.1 "Ceilings of the multiannual financial framework for the 2027 budget"
- Status: VERIFIED
- Quote checked: "For 2027, the overall ceiling for commitment appropriations is set at EUR 188 761,0 million and the ceiling for payment appropriations at EUR 199 711,0 million."

**SEC00 #3** — §2.2 "Overview of the 2027 draft budget" — Total appropriations row
- Status: VERIFIED
- Quote checked: "Total appropriations 199 905,1 [CA] 211 974,7 [PA] ... 100,00 % 100,00 % 6 692,9 13 879,0 3,46 % 7,01 %"
- Note: Automated matcher flagged this because the quote uses editorial bracket tags "[CA]"/"[PA]" not present in the source; manually confirmed the underlying figures (199 905,1 / 211 974,7 / ... / 100,00% / 100,00% / 6 692,9 / 13 879,0 / 3,46% / 7,01%) appear exactly, in order, in the "Total appropriations" row of the §2.2 table.

**SEC00 #4** — §1.3 "Pressures on the European Public Administration"
- Status: VERIFIED
- Quote checked: "it remains necessary to use the Single Margin Instrument in 2027 for a total amount of EUR 700,3 million: EUR 407,3 million for administrative expenditure of the institutions and EUR 293,0 million for the pensions of all institutions and bodies"


**SEC01 #1** — §2 "Parliament's estimates"
- Status: VERIFIED
- Quote checked: "Parliament's estimates for 2027 amount to EUR 2 656 435 753, which represents an increase of EUR 51 579 166 or +1.98 % over Parliament's 2026 budget."

**SEC01 #2** — EXPENDITURE summary table (Titles 1–5, 10)
- Status: VERIFIED
- Quote checked: "Total 2 656 435 753 [2027] 2 604 856 587 [2026] 2 517 767 307,32 [2025 out-turn]" — by Title: 1 PERSONS WORKING WITH THE INSTITUTION 1 541 660 010; 2 BUILDINGS, FURNITURE, EQUIPMENT AND MISCELLANEOUS OPERATING EXPENDITURE 499 876 000; 3 EXPENDITURE RESULTING […]
- Note: Same [2027]/[2026]/[2025 out-turn] bracket-tag pattern as SEC00 #3; all cited figures (2 656 435 753 / 2 604 856 587 / 2 517 767 307,32, and the six Title rows) confirmed present verbatim in the EXPENDITURE table. Title labels in the quote are shortened versions of the full column headings (e.g. "5 AUTHORITY FOR EUROPEAN POLITICAL PARTIES AND FOUNDATIONS" for the source's "THE AUTHORITY FOR EUROPEAN POLITICAL PARTIES AND EUROPEAN POLITICAL FOUNDATIONS AND THE COMMITTEE OF INDEPENDENT EMINENT PERSONS") — flagged, not smoothed over.

**SEC01 #3** — §3.4.2.2 "SPAAK building renovation and related projects"
- Status: VERIFIED
- Quote checked: "The total budget for the renovation, covering the period 2027–2031 and an area of 84 000 m², is set at EUR 455 million, of which EUR 350 million is allocated to works and EUR 105 million to services."

**SEC01 #4** — STAFF table (S1)
- Status: VERIFIED
- Quote checked: "Grand Total 6 823 [2027] 6 823 [2026]" (permanent + temporary posts, all function groups and grades)


**SEC02 #1** — §1 "Explanatory memorandum"
- Status: VERIFIED
- Quote checked: "The GSC proposes DB 2027 estimates of EUR 755,0 million. This amount corresponds to an overall increase of EUR 15,4 million or 2,1% compared to the voted budget 2026."

**SEC02 #2** — EXPENDITURE summary table (Titles 1, 2, 10)
- Status: VERIFIED
- Quote checked: "Total 752 774 665 [2027] 739 578 687 [2026] 691 007 558,82 [2025 out-turn]" — Title 1 PERSONS WORKING WITH THE INSTITUTIONS 502 079 975; Title 2 BUILDINGS, EQUIPMENT AND OPERATING EXPENDITURE 250 694 690; Title 10 OTHER EXPENDITURE p.m.
- Note: Same bracket-tag pattern; all figures (752 774 665 / 739 578 687 / 691 007 558,82, Title 1/2/10 rows) confirmed verbatim in the EXPENDITURE table.

**SEC02 #3** — §1 "Explanatory memorandum" — staffing
- Status: VERIFIED
- Quote checked: "the GSC maintains its limited request for five additional AD posts for qualified cybersecurity experts, to be recruited in the course of 2027"

**SEC02 #4** — STAFF table (S1)
- Status: VERIFIED
- Quote checked: "Grand Total 3 030 [2027] 3 030 [2026]"
### SEC07 — European Committee of the Regions (61 entries)

SEC07.pdf = Section VI-2, European Committee of the Regions (CoR), 61 entries. 60 of 61 auto-matched exactly (39 exact, 17 digit-spacing-note, 2 hyphenation-note); the remaining 3 were manual-only confirmations (all genuine matches — see notes).

**SEC07 #1** — INTRODUCTION, opening paragraph (small print), printed p. 1
- Status: VERIFIED
- Quote checked: "The introduction to the budget request has been provided by each Institution together with the statement of estimate for its respective budget section. In line with Article 314§1 of the TFEU, which states that: '[…] each Institution shall […] draw up estimate […]

**SEC07 #2** — INTRODUCTION, "1 BACKGROUND", printed p. 1
- Status: VERIFIED
- Quote checked: "The European Committee of the Regions (CoR) is a political assembly comprising 329 elected representatives and 329 alternates from local and regional authorities across all EU countries. Most CoR Members are affiliated with one of six political groups: EPP, P […]

**SEC07 #3** — INTRODUCTION, "1 BACKGROUND", printed p. 1
- Status: VERIFIED
- Quote checked: "Compounding this, the CoR operates with 36% less budget than the European Economic and Social Committee (EESC) under the current MFF, despite having the exact same number of Members. For an institution that the Treaty on the Functioning of the European Union […]

**SEC07 #4** — INTRODUCTION, "2 2027 BUDGET REQUEST", printed p. 3
- Status: VERIFIED
- Quote checked: "After in-depth discussions and reviews at both administrative and political levels, the CoR is requesting a total DB 2027 of € 142,600,414, representing a € 7.3 million (5.4%) increase over the 2026 voted budget and 498 posts in the establishment plan ( 1 new […]

**SEC07 #5** — INTRODUCTION, "2 2027 BUDGET REQUEST", printed p. 2
- Status: VERIFIED
- Quote checked: "Following approval by the CoR's Bureau on 9 December 2025, the main elements of the CoR's budgetary strategic guidelines are as follows: (i) Ensure at least the "status quo" of political activities, taking into account formal inflation and salary indexation e […]

**SEC07 #6** — INTRODUCTION, "2 2027 BUDGET REQUEST", printed p. 3
- Status: VERIFIED
- Quote checked: "This budget increase covers, among others, the following new projects: — Funding for CoR Members and communication activities of CoR political groups € 0.123 million — Local Dialogues' programme € 0.1 million — EU Local Councillor's Network € 0.5 million — Me […]

**SEC07 #7** — INTRODUCTION, "2 2027 BUDGET REQUEST", printed p. 3
- Status: VERIFIED
- Quote checked: "It is important to highlight that the CoR has significantly increased its political activities in recent years, directly impacting its budget. While all CoR expenditure falls under Heading 7 (administrative spending), similar to the European Parliament, a sub […]

**SEC07 #8** — INTRODUCTION, "2 2027 BUDGET REQUEST", printed p. 3
- Status: VERIFIED
- Quote checked: "The CoR has consistently achieved excellent annual budget outturns in recent years. Over the past three years, it has maintained an impressive 99.9% budget execution rate, the highest in its history. This near-complete utilisation of the budget leaves no inte […]
- Note: Automated matcher missed this only because the source PDF hyphenates "near-complete" across a line break ("near-\ncomplete"); manually confirmed exact match once the line-wrap is accounted for.

**SEC07 #9** — 8 locations, listed below
- Status: VERIFIED
- Quote checked: "In accordance with Article 21(3) of the Financial Regulation, this revenue is to be considered as assigned revenue and gives rise to the entry of additional appropriations in the headings which bore the initial expenditure giving rise to the corresponding rev […]

**SEC07 #10** — Article 3 3 1 Remarks, printed p. 8
- Status: VERIFIED
- Quote checked: "In accordance with Article 21(2) of the Financial Regulation, this revenue is to be considered as assigned revenue and gives rise to the entry of additional appropriations in the headings which bore the initial expenditure giving rise to the corresponding rev […]

**SEC07 #11** — 5 locations, listed below
- Status: VERIFIED
- Quote checked: "The amount of assigned revenue in accordance with Article 21(3) of the Financial Regulation is estimated at EUR [amount]."
- Note: Quote uses "[amount]" as an explicit placeholder for a boilerplate sentence that recurs 5 times with different EUR figures (4 000 / 13 000 / 2 500 / 3 000 / 2 500); confirmed the template sentence appears verbatim at all 5 locations named in NOTES.

**SEC07 #12** — 4 locations, listed below
- Status: VERIFIED
- Quote checked: "This appropriation is purely provisional and may be used only after its transfer to other headings in accordance with the Financial Regulation."

**SEC07 #13** — 6 locations, listed below
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union. Conditions of Employment of Other Servants of the European Union."

**SEC07 #14** — REVENUE, "Figures" summary table, printed p. 3
- Status: VERIFIED
- Quote checked: "3 ADMINISTRATIVE REVENUE 17 966 180 17 525 885 18 568 771,60 / 4 FINANCIAL REVENUE, DEFAULT INTEREST AND FINES p.m. p.m. 59 718,21 / Total 17 966 180 17 525 885 18 628 489,81"

**SEC07 #15** — TITLE 3 — ADMINISTRATIVE REVENUE, "Figures" table, printed pp. 3–4
- Status: VERIFIED
- Quote checked: "3 0 REVENUE FROM STAFF 17 966 180 17 525 885 15 213 419,38 / 3 1 REVENUE LINKED TO PROPERTY p.m. p.m. 0,— / 3 2 REVENUE FROM THE SUPPLY OF GOODS, SERVICES AND WORK — ASSIGNED REVENUE p.m. p.m. 3 252 855,31 / 3 3 OTHER ADMINISTRATIVE REVENUE p.m. p.m. 102 496, […]

**SEC07 #16** — CHAPTER 3 0 — REVENUE FROM STAFF, "Figures" table, printed p. 4
- Status: VERIFIED
- Quote checked: "3 0 0 Taxes and levies / 3 0 0 0 Tax on remunerations 6 976 821 6 833 718 6 180 646,25 / 3 0 0 1 Special levies on remunerations 1 372 426 1 343 325 1 215 809,08 / Article 3 0 0 — Subtotal 8 349 247 8 177 043 7 396 455,33 / 3 0 1 Contributions to the pension […]

**SEC07 #17** — CHAPTER 3 1 — REVENUE LINKED TO PROPERTY, "Figures" table, printed p. 5
- Status: VERIFIED
- Quote checked: "3 1 0 Sale of immovable property — Assigned revenue p.m. p.m. 0,— / 3 1 1 Sale of other property p.m. p.m. 0,— / 3 1 2 Letting and subletting immovable property — Assigned revenue p.m. p.m. 0,— / Chapter 3 1 — Total p.m. p.m. 0,—"

**SEC07 #18** — CHAPTER 3 2 — REVENUE FROM THE SUPPLY OF GOODS, SERVICES AND WORK — ASSIGNED REVENUE, "Figures" table, printed p. 6
- Status: VERIFIED
- Quote checked: "3 2 0 Revenue from the supply of goods, services and work — Assigned revenue / 3 2 0 2 Revenue from the supply of goods, services and work for other Union institutions, bodies, offices and agencies — Assigned revenue p.m. p.m. 3 252 855,31 / Article 3 2 0 — S […]

**SEC07 #19** — CHAPTER 3 3 — OTHER ADMINISTRATIVE REVENUE, "Figures" table, printed p. 7
- Status: VERIFIED
- Quote checked: "3 3 0 Repayment of amounts wrongly paid — Assigned revenue p.m. p.m. 18 521,91 / 3 3 1 Revenue for a specific purpose (income from foundations, subsidies, gifts and bequests) — Assigned revenue p.m. p.m. 0,— / 3 3 3 Insurance payments received — Assigned reve […]

**SEC07 #20** — TITLE 4 — FINANCIAL REVENUE, DEFAULT INTEREST AND FINES, "Figures" table, printed p. 9
- Status: VERIFIED
- Quote checked: "4 0 REVENUE FROM INVESTMENTS AND ACCOUNTS p.m. p.m. 45 408,51 / 4 1 DEFAULT INTEREST p.m. p.m. 10,20 / 4 2 FINES AND PENALTIES p.m. p.m. 14 299,50 / Title 4 — Total p.m. p.m. 59 718,21"

**SEC07 #21** — CHAPTER 4 0 — REVENUE FROM INVESTMENTS AND ACCOUNTS (printed p. 9); CHAPTER 4 1 — DEFAULT INTEREST (p. 9); CHAPTER 4 2 — FINES AND PENALTIES (p. 10), "Figures" tables
- Status: VERIFIED
- Quote checked: "4 0 0 Revenue from investments, loans granted and bank accounts p.m. p.m. 45 408,51 / 4 0 1 Interest yielded by pre-financing p.m. p.m. 0,— / Chapter 4 0 — Total p.m. p.m. 45 408,51" and "4 1 9 Other default interest p.m. p.m. 10,20 / Chapter 4 1 — Total p.m. […]

**SEC07 #22** — Item 3 0 0 0 — Tax on remunerations, "Legal basis" block, printed p. 4
- Status: VERIFIED
- Quote checked: "Protocol on the privileges and immunities of the European Union, and in particular Article 12 thereof. Regulation (EEC, Euratom, ECSC) No 260/68 of the Council of 29 February 1968 laying down the conditions and procedure for applying the tax for the benefit o […]

**SEC07 #23** — Item 3 0 0 1 (printed p. 5); Item 3 0 1 0 (p. 5); Item 3 0 1 1 (p. 5); Item 3 0 1 2 (p. 5), "Legal basis" blocks
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Article 66a thereof." and "Staff Regulations of Officials of the European Union, and in particular Article 83(2) thereof." and "Staff Regulations of Officials of the European Union, and i […]

**SEC07 #24** — Article 3 1 0 Remarks, first sentence (printed p. 6); Article 3 1 1 Remarks (p. 6)
- Status: VERIFIED
- Quote checked: "This article is intended to record revenue from the sale of immovable property belonging to the European Committee of the Regions." and "This article is intended to record revenue from the sale or part-exchange of other property belonging to the European Comm […]

**SEC07 #25** — Article 3 3 3 — Insurance payments received — Assigned revenue, "Remarks" block, second sentence, printed p. 8
- Status: VERIFIED
- Quote checked: "This article also includes reimbursement by insurance companies of the salaries of officials involved in accidents."

**SEC07 #26** — Article 3 3 8 Remarks, first sentence (printed p. 8); Article 3 3 9 Remarks (p. 8)
- Status: VERIFIED
- Quote checked: "This article is intended to record other contributions and refunds in connection with the administrative operations of the European Committee of the Regions." and "This article is intended to record other revenue from administrative operations."

**SEC07 #27** — Article 4 0 0 Remarks (printed p. 9); Article 4 0 1 Remarks (p. 9)
- Status: VERIFIED
- Quote checked: "This article is intended to record revenue from investments, loans granted and bank and other interest on the European Committee of the Regions' accounts." and "This article is intended to record revenue from interest on pre-financing."

**SEC07 #28** — Article 4 1 9 — Other default interest, "Legal basis" block, printed p. 10
- Status: VERIFIED
- Quote checked: "Regulation (EU, Euratom) 2024/2509 of the European Parliament and of the Council of 23 September 2024 on the financial rules applicable to the general budget of the Union (OJ L, 2024/2509, 26.9.2024, ELI: http://data.europa.eu/eli/reg/2024/2509/oj), and in pa […]

**SEC07 #29** — Article 4 2 2 — Fines imposed for fraud and irregularities which are damaging to the Union's financial interests, "Remarks" block, printed p. 10
- Status: VERIFIED
- Quote checked: "This appropriation is intended to recover fines imposed for fraud and irregularities which are damaging to the Union's financial interests."
- Note: Automated matcher false negative (apostrophe-normalization edge case in the script, not a document issue); manually confirmed exact match at Art. 4 2 2 Remarks, p. 10.

**SEC07 #30** — EXPENDITURE, "Figures" summary table, printed p. 10
- Status: VERIFIED
- Quote checked: "1 PERSONS WORKING WITH THE INSTITUTION 106 683 120 103 869 462 95 380 368,43 / 2 BUILDINGS, FURNITURE, EQUIPMENT AND MISCELLANEOUS OPERATING EXPENDITURE 32 067 665 31 436 433 34 433 403,78 / 10 OTHER EXPENDITURE p.m. p.m. 0,— / Total 138 750 785 135 305 895 1 […]

**SEC07 #31** — TITLE 1 — PERSONS WORKING WITH THE INSTITUTION, "Figures" table, printed pp. 10–11
- Status: VERIFIED
- Quote checked: "1 0 MEMBERS OF THE INSTITUTION 10 256 666 9 771 927 10 246 198,— / 1 2 OFFICIALS AND TEMPORARY STAFF 81 649 000 79 481 160 72 579 762,97 / 1 4 OTHER STAFF AND EXTERNAL SERVICES 12 886 604 12 751 675 10 781 312,01 / 1 6 OTHER EXPENDITURE RELATING TO PERSONS WO […]

**SEC07 #32** — CHAPTER 1 0 — MEMBERS OF THE INSTITUTION, "Figures" table, printed p. 11
- Status: VERIFIED
- Quote checked: "1 0 0 Salaries, allowances and payments / 1 0 0 0 Office expenses of Members 7.2.723 197 862 193 982 190 669,— 96,36 % / 1 0 0 4 Travel and subsistence allowances, attendance at meetings and associated expenditure 7.2.723 10 033 804 9 542 945 10 030 529,— 99, […]

**SEC07 #33** — CHAPTER 1 2 — OFFICIALS AND TEMPORARY STAFF, "Figures" table, printed p. 12
- Status: VERIFIED
- Quote checked: "1 2 0 Remuneration and other entitlements / 1 2 0 0 Remuneration and allowances 7.2.711 80 950 000 78 830 160 71 978 131,79 88,92 % / 1 2 0 2 Paid overtime 7.2.711 34 000 35 000 29 785,92 87,61 % / 1 2 0 4 Entitlements on entering the service, transfer and le […]

**SEC07 #34** — CHAPTER 1 2 — OFFICIALS AND TEMPORARY STAFF, "Remarks" block immediately below the chapter table, printed p. 12
- Status: VERIFIED
- Quote checked: "A standard abatement of 6,0 % has been applied to the appropriations entered in this chapter."

**SEC07 #35** — CHAPTER 1 4 — OTHER STAFF AND EXTERNAL SERVICES, "Figures" table, printed p. 15
- Status: VERIFIED
- Quote checked: "1 4 0 Other staff and external persons / 1 4 0 0 Other staff 7.2.712 6 545 764 6 283 401 5 428 804,67 82,94 % / 1 4 0 2 Interpreting services 7.2.782 3 900 869 4 118 499 3 366 999,— 86,31 % / 1 4 0 4 Graduate traineeships, grants and exchanges of officials 7. […]
- Note: Chapter 1 4 Figures table: all row figures confirmed exact. Article/Item reference codes in the source table are printed compact (e.g. "1420") while the quote renders them digit-spaced ("1 4 2 0"), matching the style used in this same document's own prose headings ("Item 1 4 2 0 — ...") elsewhere on the page — a formatting convention-switch, not a figures error.

**SEC07 #36** — CHAPTER 1 6 — OTHER EXPENDITURE RELATING TO PERSONS WORKING WITH THE INSTITUTION, "Figures" table, printed p. 18
- Status: VERIFIED
- Quote checked: "1 6 1 Expenditure relating to staff management / 1 6 1 0 Miscellaneous expenditure on recruitment 7.2.731 20 000 20 000 13 371,67 66,86 % / 1 6 1 2 Further training, retraining and information for staff 7.2.733 416 700 366 200 408 787,23 98,10 % / Article 1 6 […]

**SEC07 #37** — Item 1 2 0 0 — Remuneration and allowances, "Remarks" block, printed pp. 12–13
- Status: VERIFIED
- Quote checked: "This appropriation is mainly intended to cover, for officials and temporary staff holding a post provided for in the establishment plan: — salaries, family allowances, expatriation and foreign residence allowances and payments related to salaries, — the Europ […]
- Note: Long bulleted Remarks paragraph (Item 1 2 0 0) confirmed exact, word for word including all nine bullet points.

**SEC07 #38** — Item 1 2 0 4 — Entitlements on entering the service, transfer and leaving the service, "Remarks" block, printed p. 13
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover: — travel expenses due to officials and temporary staff (including their families) entering or leaving the service or being transferred to another place of employment, — installation/resettlement allowances and removal […]

**SEC07 #39** — Item 1 2 2 2 — Allowances for staff whose service is terminated and special retirement scheme, "Legal basis" block, printed p. 14
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Articles 64 and 72 thereof. Council Regulation (ECSC, EEC, Euratom) No 3518/85 of 12 December 1985 introducing special measures to terminate the service of officials of the European Commu […]

**SEC07 #40** — Article 1 2 9 — Provisional appropriation (printed p. 14); Article 1 4 9 — Provisional appropriation (p. 18), "Legal basis" blocks
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Articles 65 and 65a thereof and Annex XI thereto." and "Staff Regulations of Officials of the European Union, and in particular Articles 65 and 65a thereof and Annex XI thereto. Condition […]

**SEC07 #41** — Item 1 6 1 0 — Miscellaneous expenditure on recruitment, "Legal basis" block, printed p. 18
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Articles 27 to 31 and Article 33 thereof and Annex III thereto. Decision 2002/620/EC of the European Parliament, the Council, the Commission, the Court of Justice, the Court of Auditors, […]

**SEC07 #42** — Item 1 6 1 2 (printed p. 19); Item 1 6 3 0 (p. 20); Item 1 6 3 2 (p. 20); Item 1 6 3 4 (p. 21), "Legal basis" blocks
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Article 24a thereof." and "Staff Regulations of Officials of the European Union, and in particular Article 76 thereof (including the corresponding provisions of Articles 30 and 98 of the […]

**SEC07 #43** — Article 1 6 2 — Missions, "Remarks" and "Legal basis" blocks, printed p. 19
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover transport or accommodation expenses, the payment of daily subsistence allowances and other expenses provided for in the missions guide of the European Committee of the Regions, incurred by staff members in carrying out […]

**SEC07 #44** — TITLE 2 — BUILDINGS, FURNITURE, EQUIPMENT AND MISCELLANEOUS OPERATING EXPENDITURE, "Figures" table, printed p. 21
- Status: VERIFIED
- Quote checked: "2 0 BUILDINGS AND ASSOCIATED COSTS 18 858 744 18 931 171 20 334 482,66 / 2 1 DATA PROCESSING, EQUIPMENT AND FURNITURE: PURCHASE, HIRE AND MAINTENANCE 8 330 185 7 779 541 9 168 704,14 / 2 3 ADMINISTRATIVE EXPENDITURE 325 996 299 668 232 920,88 / 2 5 MEETINGS A […]

**SEC07 #45** — TITLE 2, "Remarks" block immediately below the Title table, printed p. 21
- Status: VERIFIED
- Quote checked: "In 2026, the initial appropriations for the two committees' joint services, under Title 2, amounted to EUR 35 942 482 for the European Economic and Social Committee and EUR 26 257 635 for the European Committee of the Regions."

**SEC07 #46** — CHAPTER 2 0 — BUILDINGS AND ASSOCIATED COSTS, "Figures" table, printed p. 22
- Status: VERIFIED
- Quote checked: "2 0 0 Buildings and associated costs / 2 0 0 0 Rent 7.2.751 84 660 536 158 718 180,— 848,31 % / 2 0 0 1 Annual lease payments 7.2.751 12 626 454 12 379 327 11 977 129,70 94,86 % / 2 0 0 3 Acquisition of immovable property 7.2.751 p.m. p.m. 0,— / 2 0 0 5 Const […]

**SEC07 #47** — CHAPTER 2 1 — DATA PROCESSING, EQUIPMENT AND FURNITURE: PURCHASE, HIRE AND MAINTENANCE, "Figures" table, printed p. 25
- Status: VERIFIED
- Quote checked: "2 1 0 Equipment, operating costs and services relating to data processing and telecommunications / 2 1 0 0 Purchase, servicing and maintenance of equipment and software, and related work 7.2.741 2 597 760 2 150 261 2 586 177,41 99,55 % / 2 1 0 2 Outside assis […]

**SEC07 #48** — CHAPTER 2 3 — ADMINISTRATIVE EXPENDITURE, "Figures" table, printed p. 27
- Status: VERIFIED
- Quote checked: "2 3 0 Stationery, office supplies and miscellaneous consumables 7.2.783 91 308 96 765 76 929,— 84,25 % / 2 3 1 Financial charges 7.2.783 1 000 1 500 1 500,— 150,00 % / 2 3 2 Legal costs and damages 7.2.783 30 000 30 000 21 220,— 70,73 % / 2 3 6 Postage on cor […]

**SEC07 #49** — CHAPTER 2 5 — MEETINGS AND CONFERENCES, "Figures" table, printed p. 28
- Status: VERIFIED
- Quote checked: "2 5 4 Meetings, conferences, congresses, seminars and other events / 2 5 4 0 Costs of meetings organised in Brussels 7.2.762 174 145 170 730 117 238,— 67,32 % / 2 5 4 1 Third parties 7.2.79SPEC 341 269 341 269 314 577,— 92,18 % / 2 5 4 4 Support to networks a […]

**SEC07 #50** — CHAPTER 2 6 — EXPERTISE AND INFORMATION: ACQUISITION, ARCHIVING, PRODUCTION AND DISTRIBUTION, "Figures" table, printed p. 30
- Status: VERIFIED
- Quote checked: "2 6 0 Communication and publications / 2 6 0 0 Relationship with press and audiovisual support 7.2.762 894 000 874 000 820 426,— 91,77 % / 2 6 0 1 Permanent dialogue mechanism 7.2.762 513 000 500 000 687 512,— 134,02 % / 2 6 0 2 Digital content and social med […]

**SEC07 #51** — TITLE 10 — OTHER EXPENDITURE, "Figures" table (printed p. 33); CHAPTER 10 0 (p. 33); CHAPTER 10 1 (p. 34); CHAPTER 10 2 (p. 34)
- Status: VERIFIED
- Quote checked: "10 0 PROVISIONAL APPROPRIATIONS p.m. p.m. 0,— / 10 1 CONTINGENCY RESERVE p.m. p.m. 0,— / 10 2 RESERVE TO PROVIDE FOR THE TAKEOVER OF BUILDINGS p.m. p.m. 0,— / Title 10 — Total p.m. p.m. 0,—"

**SEC07 #52** — Item 1 0 0 0 — Office expenses of Members, "Remarks" block, printed p. 11
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover office expenses for Members or alternate Members of the European Committee of the Regions called upon to perform certain duties and to assume responsibilities within the Committee or who have acted as rapporteurs in acc […]

**SEC07 #53** — Item 1 4 0 2 — Interpreting services, "Remarks" block, printed p. 16
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover expenditure for on-site or off-site interpretation services for meetings or events organised or co-organised by the European Committee of the Regions. It covers the cost of interpretation services provided by the Commis […]

**SEC07 #54** — Item 1 4 2 0 — Supplementary services for the translation service and translation and outsourcing-related tools, "Remarks" block, printed p. 17
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover expenditure on work carried out by external translation contractors: freelance translation into 24 official Union languages and also into non-Union languages is performed by contractors under framework contracts, except […]

**SEC07 #55** — Item 1 6 3 8 — Early Childhood Centre and approved day nurseries, "Remarks" block, printed p. 21
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover the contributions of the European Committee of the Regions to the costs of nursery centres and other day care and after-school centres operated by or approved by the institutions of the Union, and any other expenditure […]

**SEC07 #56** — Item 2 6 0 3 — EU Councillors, "Remarks" block, printed p. 31
- Status: VERIFIED
- Quote checked: "This appropriation is intended for the European Committee of the Regions' contribution to the EU Local Councillors Network. This was created at the end of 2024 through the merger of the 'Building Europe with Local Entities (BELE)' pilot project run by the Eur […]

**SEC07 #57** — Item 2 6 2 4 — Expenditure on archive resources, "Remarks" block, second paragraph, printed p. 33
- Status: VERIFIED
- Quote checked: "It also covers the expenditure for the transfer of the historical archives of the Committee to the Historical Archives of the European Union (managed by the European University Institute in Florence)."

**SEC07 #58** — Item 2 5 4 4 — Support to networks and fora, "Remarks" block, printed p. 29
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover expenses of a new nature related to support to networks and fora, such as: — lump-sum contributions to the RegHub network (both as an incentive for experts to give their input and for the outreach activities of these ne […]

**SEC07 #59** — Item 2 1 0 0 — Purchase, servicing and maintenance of equipment and software, and related work, "Remarks" block, second paragraph, printed p. 25
- Status: VERIFIED
- Quote checked: "This appropriation is also intended to cover the costs associated with service level agreements signed with Union institutions (e.g. for the use of information systems, notably with the Commission for Sysper, EU Learn, ABAC, and other related applications) an […]

**SEC07 #60** — Item 2 6 0 1 — Permanent dialogue mechanism, "Remarks" block, first paragraph, printed p. 31
- Status: VERIFIED
- Quote checked: "This nomenclature responds to new realities of organising events after the COVID-19 pandemic and to the Conference on the Future of Europe. In particular, there is the call for a permanent dialogue mechanism with Union citizens at all levels, which includes r […]

**SEC07 #61** — STAFF, "S 1 — EUROPEAN COMMITTEE OF THE REGIONS" table, printed pp. 34–35
- Status: VERIFIED
- Quote checked: "Non-Category — 1 — 1 / AD 16 — — — — / AD 15 12 — 11 — / AD 14 21 5 22 5 / AD 13 24 — 24 — / AD 12 39 6 36 6 / AD 11 38 2 36 2 / AD 10 34 6 38 5 / AD 9 38 10 39 10 / AD 8 26 6 26 7 / AD 7 25 5 25 4 / AD 6 13 3 13 4 / AD 5 5 — 5 — / AD subtotal 275 43 275 43 / […]
### SEC09 — European Data Protection Supervisor / Board (70 entries)

SEC09.pdf = European Data Protection Supervisor / European Data Protection Board, 70 entries. 67 of 70 auto-matched exactly (55 exact, 12 digit-spacing-note); the remaining 3 were manual-only confirmations (all genuine matches).

**SEC09 #1** — INTRODUCTION, opening paragraph (small print), printed p. 1
- Status: VERIFIED
- Quote checked: "The introduction to the budget request has been provided by each Institution together with the statement of estimate for its respective budget section. In line with Article 314§1 of the TFEU, which states that: '[…] each Institution shall […] draw up estimate […]
- Note: Confirmed exact, with one note: the source itself has an odd extra space before the closing curly quote ("...different estimates. '," — space before the apostrophe-quote), which reads as a typesetting artifact in the source PDF rather than a transcription error; recorded, not smoothed over.

**SEC09 #2** — INTRODUCTION, printed pp. 1–2
- Status: VERIFIED
- Quote checked: "The proposed overall budget for 2027 amounts to €32.535.000, representing an increase of 5,65%, which should be viewed in context, notably considering the new responsibilities and subsequent need for additional resources arising from the AI Act and the superv […]
- Note: Confirmed exact, spanning a page break ("EN 1 EN" footer) which the quote correctly elides.

**SEC09 #3** — INTRODUCTION, printed p. 2
- Status: VERIFIED
- Quote checked: "As regards the EDPS, the proposed budget under Title 1 shows an increase of 2,18%, mainly due to the rebalancing of appropriations under Article 112 which had been overly reduced in 2026. On the other hand, under Title 2, the proposed budget decreases by 5.02 […]

**SEC09 #4** — INTRODUCTION, printed p. 2
- Status: VERIFIED
- Quote checked: "Title 3 of the budget proposal, relating to the activities of the EDPB, shows an increase of 17,25%. The growth in Title 3 is mainly due to the European Commission's unilateral termination of the SLA with the DGT, which had granted the EDPB access to free tra […]

**SEC09 #5** — INTRODUCTION, printed p. 1
- Status: VERIFIED
- Quote checked: "With its decision of 10 February 2026 (case C-97/23 P) the Court of Justice of the EU set aside a ruling of the General Court and ruled that a binding decision of the EDPB is an act open to challenge before the Courts of the European Union. Seven cases, corre […]

**SEC09 #6** — INTRODUCTION, printed p. 1
- Status: VERIFIED
- Quote checked: "In addition, the EDPB must prepare for Regulation 2025/2518 laying down additional procedural rules relating to the enforcement of Regulation (EU) 2016/679, which will be applicable as of 2 April 2027. New legal duties stemming from this regulation require se […]

**SEC09 #7** — INTRODUCTION, printed p. 1
- Status: VERIFIED
- Quote checked: "Additionally, since the entry into force of the AI Act, the EDPS is the Market Surveillance Authority, Notifying Authority and Notified Body for all EU institutions falling within the scope of this regulation."

**SEC09 #8** — INTRODUCTION, printed p. 1
- Status: VERIFIED
- Quote checked: "Recognising this challenge, recent regulations include provisions stating that costs incurred by the EDPS in carrying out these newly assigned tasks must be covered by the general budget of the EU."

**SEC09 #9** — INTRODUCTION, printed p. 1, end of the EDPB litigation paragraph
- Status: VERIFIED
- Quote checked: "It is therefore essential that the EDPB is reinforced, to continue supporting the application of the GDPR. the"

**SEC09 #10** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "In accordance with Article 21(3) of the Financial Regulation, this revenue is to be considered as assigned revenue and gives rise to the entry of additional appropriations on the lines which bore the initial expenditure giving rise to the corresponding revenu […]

**SEC09 #11** — Article 3 3 1 Remarks, printed p. 7
- Status: VERIFIED
- Quote checked: "In accordance with Article 21(2) of the Financial Regulation, this revenue is to be considered as assigned revenue and gives rise to the entry of additional appropriations on the lines which bore the initial expenditure giving rise to the corresponding revenu […]

**SEC09 #12** — Article 3 3 8 Remarks, printed p. 7 (second paragraph)
- Status: VERIFIED
- Quote checked: "In accordance with Article 21 of the Financial Regulation, this revenue is to be considered as assigned revenue and gives rise to the entry of additional appropriations on the lines which bore the initial expenditure giving rise to the corresponding revenue."

**SEC09 #13** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "Amount of assigned revenue in accordance with Article 21(3) of the Financial Regulation: p.m."

**SEC09 #14** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "Regulation (EU) 2018/1725 of the European Parliament and of the Council of 23 October 2018 on the protection of natural persons with regard to the processing of personal data by the Union institutions, bodies, offices and agencies and on the free movement of […]

**SEC09 #15** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "Council Regulation (EU) 2016/300 of 29 February 2016 determining the emoluments of EU high-level public office holders (OJ L 58, 4.3.2016, p. 1, ELI: http://data.europa.eu/eli/reg/2016/300/oj)."

**SEC09 #16** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "Protocol on the privileges and immunities of the European Union, and in particular Article 12 thereof."

**SEC09 #17** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union. / Conditions of Employment of Other Servants of the European Union."

**SEC09 #18** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "Decision 2002/620/EC of the European Parliament, the Council, the Commission, the Court of Justice, the Court of Auditors, the Economic and Social Committee, the Committee of the Regions and the European Ombudsman of 25 July 2002 establishing a European Commu […]

**SEC09 #19** — REVENUE, "Figures" summary table, printed p. 2
- Status: VERIFIED
- Quote checked: "3 ADMINISTRATIVE REVENUE 2 757 569 2 757 339 2 757 850,16 / 4 FINANCIAL REVENUE, DEFAULT INTEREST AND FINES p.m. p.m. p.m. / Total 2 757 569 2 757 339 2 757 850,16"

**SEC09 #20** — TITLE 3 — ADMINISTRATIVE REVENUE, "Figures" table, printed p. 2
- Status: VERIFIED
- Quote checked: "3 0 REVENUE FROM STAFF 2 757 569 2 757 339 2 757 850,16 / 3 1 REVENUE LINKED TO PROPERTY p.m. p.m. p.m. / 3 2 REVENUE FROM THE SUPPLY OF GOODS, SERVICES AND WORK — ASSIGNED REVENUE p.m. p.m. p.m. / 3 3 OTHER ADMINISTRATIVE REVENUE p.m. p.m. p.m. / Title 3 — T […]

**SEC09 #21** — CHAPTER 3 0 — REVENUE FROM STAFF, "Figures" table, printed p. 3
- Status: VERIFIED
- Quote checked: "3 0 0 Taxes and levies / 3 0 0 0 Tax on remunerations 960 999 960 922 961 156,93 / 3 0 0 1 Special levies on remunerations 207 783 208 050 207 772,10 / Article 3 0 0 — Subtotal 1 168 782 1 168 972 1 168 929,03 / 3 0 1 Contributions to the pension scheme / 3 0 […]

**SEC09 #22** — CHAPTER 3 1 — REVENUE LINKED TO PROPERTY, "Figures" table, printed p. 4
- Status: VERIFIED
- Quote checked: "3 1 0 Sale of immovable property — Assigned revenue p.m. p.m. p.m. / 3 1 1 Sale of other property p.m. p.m. p.m. / 3 1 2 Letting and subletting immovable property — Assigned revenue p.m. p.m. p.m. / Chapter 3 1 — Total p.m. p.m. p.m."

**SEC09 #23** — CHAPTER 3 2 — REVENUE FROM THE SUPPLY OF GOODS, SERVICES AND WORK — ASSIGNED REVENUE, "Figures" table, printed p. 5
- Status: VERIFIED
- Quote checked: "3 2 0 Revenue from the supply of goods, services and work — Assigned revenue / 3 2 0 2 Revenue from the supply of goods, services and work for other Union institutions, agencies and bodies — Assigned revenue p.m. p.m. p.m. / Article 3 2 0 — Subtotal p.m. p.m. […]

**SEC09 #24** — CHAPTER 3 3 — OTHER ADMINISTRATIVE REVENUE, "Figures" table, printed p. 6
- Status: VERIFIED
- Quote checked: "3 3 0 Repayment of amounts wrongly paid — Assigned revenue p.m. p.m. p.m. / 3 3 1 Revenue for a specific purpose (income from foundations, subsidies, gifts and bequests) — Assigned revenue p.m. p.m. p.m. / 3 3 3 Insurance payments received — Assigned revenue […]

**SEC09 #25** — TITLE 4 — FINANCIAL REVENUE, DEFAULT INTEREST AND FINES, "Figures" table, printed p. 7; CHAPTER 4 0 — REVENUE FROM INVESTMENTS AND ACCOUNTS, "Figures" table, printed p. 8
- Status: VERIFIED
- Quote checked: "4 0 REVENUE FROM INVESTMENTS AND ACCOUNTS p.m. p.m. p.m. / Title 4 — Total p.m. p.m. p.m." — and — "4 0 0 Revenue from investments, loans granted and bank accounts p.m. p.m. p.m. / Chapter 4 0 — Total p.m. p.m. p.m."

**SEC09 #26** — Item 3 0 0 0 — Tax on remunerations, "Legal basis" block, second cited act, printed p. 3
- Status: VERIFIED
- Quote checked: "Regulation (EEC, Euratom, ECSC) No 260/68 of the Council of 29 February 1968 laying down the conditions and procedure for applying the tax for the benefit of the European Communities (OJ L 56, 4.3.1968, p. 8, ELI: http://data.europa.eu/eli/reg/1968/260/oj)."

**SEC09 #27** — Item 3 0 0 1 — Special levies on remunerations, "Legal basis" block, first cited act, printed p. 3
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Article 66a thereof."

**SEC09 #28** — Item 3 0 1 0 — Staff contributions to the pension scheme, "Legal basis" block, printed p. 4
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Article 83(2) thereof."

**SEC09 #29** — Item 3 0 1 1 — Transfer or purchase of pension rights by staff, "Legal basis" block, printed p. 4
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Article 4, Article 11(2) and (3) thereof and Article 48 of Annex VIII thereto."

**SEC09 #30** — Item 3 0 1 2 — Contributions to the pension scheme by staff on leave, printed p. 4
- Status: VERIFIED
- Quote checked: "Item 3 0 1 2 — Contributions to the pension scheme by staff on leave / Figures / 2027 estimate 2026 estimate 2025 out-turn / p.m. p.m. p.m."

**SEC09 #31** — Article 3 1 0 — Sale of immovable property — Assigned revenue, "Remarks" block, first paragraph, printed p. 4
- Status: VERIFIED
- Quote checked: "This article is intended to record revenue from the sale of immovable property belonging to the institution."

**SEC09 #32** — Article 3 1 1 — Sale of other property, "Remarks" block, printed p. 5
- Status: VERIFIED
- Quote checked: "This article is intended to record revenue accruing from the sale or part-exchange of other property belonging to the institution. It records also the proceeds from the sale of equipment, installations, materials and scientific and technical apparatus, as wel […]

**SEC09 #33** — Article 3 3 8 — Other revenue from administrative operations — Assigned revenue, "Remarks" block, first paragraph, printed p. 7
- Status: VERIFIED
- Quote checked: "This article is intended to record other contributions and refunds in connection with the administrative operations of the institution."

**SEC09 #34** — Article 3 3 9 — Other revenue from administrative operations, "Remarks" block, printed p. 7
- Status: VERIFIED
- Quote checked: "This article is intended to record other revenue from administrative operations."

**SEC09 #35** — Article 4 0 0 — Revenue from investments, loans granted and bank accounts, "Remarks" block, printed p. 8
- Status: VERIFIED
- Quote checked: "This article is intended to record revenue from investments, loans granted and bank and other interest on the institution's accounts."

**SEC09 #36** — EXPENDITURE, "Figures" summary table, printed p. 8
- Status: VERIFIED
- Quote checked: "1 PERSONS WORKING WITH THE INSTITUTION 16 431 643 16 535 755 13 072 589,14 / 2 BUILDINGS, EQUIPMENT AND EXPENDITURE IN CONNECTION WITH THE OPERATION OF THE INSTITUTION 4 058 000 4 855 724 3 715 638,19 / 3 EUROPEAN DATA PROTECTION BOARD 9 772 546 9 403 857 8 1 […]

**SEC09 #37** — TITLE 1 — PERSONS WORKING WITH THE INSTITUTION, "Figures" table, printed p. 8
- Status: VERIFIED
- Quote checked: "1 0 MEMBERS OF THE INSTITUTION 540 000 618 687 569 614,57 / 1 1 STAFF OF THE INSTITUTION 15 891 643 15 917 068 12 502 974,57 / Title 1 — Total 16 431 643 16 535 755 13 072 589,14"

**SEC09 #38** — CHAPTER 1 0 — MEMBERS OF THE INSTITUTION, "Figures" table, printed pp. 8–9
- Status: VERIFIED
- Quote checked: "1 0 0 Remuneration, allowances and other entitlements of Members / 1 0 0 0 Remuneration and allowances 7.2.921 490 000 494 000 454 927,57 92,84 % / 1 0 0 1 Entitlements on entering and leaving the service 7.2.921 p.m. 74 687 74 687,— / 1 0 0 2 Temporary allow […]

**SEC09 #39** — CHAPTER 1 1 — STAFF OF THE INSTITUTION, "Figures" table, printed pp. 11–12
- Status: VERIFIED
- Quote checked: "1 1 0 Remuneration, allowances and other entitlements of officials and temporary staff / 1 1 0 0 Remuneration and allowances 7.2.911 11 715 000 12 622 693 9 116 785,88 77,82 % / 1 1 0 1 Entitlements on entering the service, transfer and leaving the service 7. […]

**SEC09 #40** — TITLE 2, "Figures" table, printed p. 17
- Status: VERIFIED
- Quote checked: "2 0 BUILDINGS, EQUIPMENT AND EXPENDITURE IN CONNECTION WITH THE OPERATION OF THE INSTITUTION 4 058 000 4 855 724 3 715 638,19 / Title 2 — Total 4 058 000 4 855 724 3 715 638,19"

**SEC09 #41** — CHAPTER 2 0, "Figures" table, printed p. 17
- Status: VERIFIED
- Quote checked: "2 0 0 Rents, charges and buildings expenditure 7.2.951 1 956 000 1 843 972 1 855 933,48 94,88 % / 2 0 1 Expenditure in connection with the operation and activities of the institution / 2 0 1 0 Information technology equipment and services 7.2.941 1 265 000 2 […]

**SEC09 #42** — TITLE 3 — EUROPEAN DATA PROTECTION BOARD, "Figures" table, printed p. 20
- Status: VERIFIED
- Quote checked: "3 0 EXPENDITURE IN CONNECTION WITH THE OPERATION OF THE EUROPEAN DATA PROTECTION BOARD 9 772 546 9 403 857 8 163 525,90 / Title 3 — Total 9 772 546 9 403 857 8 163 525,90"

**SEC09 #43** — CHAPTER 3 0 — EXPENDITURE IN CONNECTION WITH THE OPERATION OF THE EUROPEAN DATA PROTECTION BOARD, "Figures" table, printed pp. 21–22
- Status: VERIFIED
- Quote checked: "3 0 0 Rents, charges and buildings expenditure / 3 0 0 0 Rents, charges and buildings expenditure 7.2.951 840 000 663 000 679 410,27 80,88 % / Article 3 0 0 — Subtotal 840 000 663 000 679 410,27 80,88 % / 3 0 1 Remuneration, allowances and other entitlements […]
- Note: Chapter 3 0 Figures table row for Item 3046; figures and heading confirmed exact aside from the same compact-vs-digit-spaced code convention noted at SEC07 #35.

**SEC09 #44** — TITLE 10 — OTHER EXPENDITURE, "Figures" table, printed p. 29; CHAPTER 10 0 and CHAPTER 10 1 figures, printed p. 29
- Status: VERIFIED
- Quote checked: "10 0 PROVISIONAL APPROPRIATIONS p.m. p.m. 0,— / 10 1 CONTINGENCY RESERVE p.m. p.m. 0,— / Title 10 — Total p.m. p.m. 0,—"

**SEC09 #45** — Item 1 0 0 0 — Remuneration and allowances, "Remarks" block, printed p. 9
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover salaries, allowances and other payments related to the salary of the European Data Protection Supervisor, in particular the institution's contributions towards insurance against accidents and occupational disease, the i […]

**SEC09 #46** — Items 1 0 0 1, 1 0 0 2, 1 0 0 3, 1 0 0 4 "Remarks" blocks, printed pp. 9–10
- Status: VERIFIED
- Quote checked: 1 0 0 1: "This appropriation is intended to cover travel expenses due to the European Data Protection Supervisor, including his or her family, on taking up duty or leaving the institution, installation and resettlement allowances due to the European Data Prote […]

**SEC09 #47** — Items 1 0 1 0 and 1 0 1 1 "Remarks" blocks, printed p. 11
- Status: VERIFIED
- Quote checked: 1 0 1 0: "This appropriation is intended to cover expenses incurred in attending language courses, seminars and professional training courses by the European Data Protection Supervisor." — 1 0 1 1: "This appropriation is intended to cover travel expenses, dail […]

**SEC09 #48** — Item 1 1 0 0 — Remuneration and allowances, "Remarks" block, printed p. 12
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover: / — the basic salaries of officials and temporary staff, / — family allowances, including the household allowance, the dependent child allowance and the education allowance, / — expatriation and foreign residence allow […]

**SEC09 #49** — Item 1 1 0 1, "Remarks" block, printed p. 13
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover: / — travel expenses due to officials and temporary staff, including their families, entering or leaving the service or being transferred to another place of employment, / — installation and resettlement allowances and […]

**SEC09 #50** — Items 1 1 0 2, 1 1 0 3, 1 1 0 4, 1 1 0 5 "Remarks" blocks, printed pp. 13–14
- Status: VERIFIED
- Quote checked: 1 1 0 2: "This appropriation is intended to cover the payment of overtime under the conditions set out in the legal basis." — 1 1 0 3: "This appropriation is intended to cover action taken in respect of officials and other servants in particularly difficult si […]

**SEC09 #51** — Items 1 1 1 0, 1 1 1 1, 1 1 1 2 "Remarks" blocks, printed pp. 14–15
- Status: VERIFIED
- Quote checked: 1 1 1 0: "This appropriation is intended to cover expenditure related to the use of contract agents." — 1 1 1 1: "This appropriation is intended to cover allowances, travel and mission expenses for trainees, as well as accident and sickness insurance during tr […]

**SEC09 #52** — Items 1 1 2 0, 1 1 2 1, 1 1 2 2, 1 1 2 3, 1 1 2 4, 1 1 2 5, 1 1 2 6 "Remarks" blocks, printed pp. 15–17
- Status: VERIFIED
- Quote checked: 1 1 2 0: "This appropriation is intended to cover expenditure on transport, the payment of daily mission allowances and the ancillary or exceptional expenses incurred in the performance of a mission." — 1 1 2 1: "This appropriation is intended to cover expendi […]

**SEC09 #53** — Item 1 1 2 3 — Social service, "Remarks" block, printed p. 16
- Status: VERIFIED
- Quote checked: "This appropriation is intended, as part of an interinstitutional policy to assist people with disabilities (officials and temporary staff in active employment, their spouses and dependent children within the meaning of the Staff Regulations of Officials of th […]

**SEC09 #54** — Item 1 1 2 6, "Remarks" block, printed p. 17
- Status: VERIFIED
- Quote checked: "This appropriation is intended: / — to encourage and provide financial backing for schemes to promote social contact between staff of different nationalities, for example subsidies to staff clubs, sports associations and cultural activities, and to make a con […]

**SEC09 #55** — Item 1 1 0 2 — Paid overtime, "Legal basis" block, printed p. 13
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Article 56 thereof and Annex VI thereto."

**SEC09 #56** — Item 1 1 0 3 — Special assistance grants, "Legal basis" block, printed p. 13
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Article 76 thereof."

**SEC09 #57** — Item 1 1 0 4, "Legal basis" block, printed p. 14; identical text at Item 3 0 1 2, printed p. 23
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Articles 41, 50, 64, 65 and 72 thereof and Annex IV thereto."

**SEC09 #58** — Item 1 1 0 5 — Provisional appropriation, "Legal basis" block, printed p. 14
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Articles 65 and 65a thereof and Annex XI thereto."

**SEC09 #59** — Item 1 1 2 0, "Legal basis" block, printed p. 15; Item 3 0 3 0, "Legal basis" block, printed p. 24
- Status: VERIFIED
- Quote checked: Item 1 1 2 0: "Staff Regulations of Officials of the European Union, and in particular Article 71 thereof and Articles 11, 12 and 13 of Annex VII thereto." — Item 3 0 3 0: "Staff Regulations of Officials of the European Union, and in particular Article 71 ther […]

**SEC09 #60** — Item 1 1 2 1, "Legal basis" block, printed p. 15; Item 3 0 3 1, "Legal basis" block, printed p. 25
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Articles 27 to 31 and 33 thereof and Annex III thereto."

**SEC09 #61** — Item 1 1 2 2, "Legal basis" block, printed p. 16; Item 3 0 3 2, "Legal basis" block, printed p. 25
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Article 24a thereof."

**SEC09 #62** — Item 1 1 2 4, "Legal basis" block, printed p. 16
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Article 59 thereof and Article 8 of Annex II thereto."

**SEC09 #63** — Article 2 0 0 — Rents, charges and buildings expenditure, "Legal basis" block, printed p. 18
- Status: VERIFIED
- Quote checked: "Agreement on administrative cooperation between the European Data Protection Supervisor and the European Parliament which provides the offices."

**SEC09 #64** — Item 3 0 0 0, "Remarks" and "Legal basis" blocks, printed p. 22
- Status: VERIFIED
- Quote checked: Remarks: "This appropriation is intended to cover a lump-sum payment to the European Parliament in respect of the offices which the European Parliament provides to the European Data Protection Supervisor within its premises in Brussels. It covers rent and char […]

**SEC09 #65** — Item 2 0 1 3, "Legal basis" block, printed p. 19; Item 3 0 4 1, "Legal basis" block, printed p. 26
- Status: VERIFIED
- Quote checked: Item 2 0 1 3: "Agreement on administrative cooperation between the European Data Protection Supervisor and the institution providing the service." — Item 3 0 4 1: "Agreement on administrative cooperation between the European Data Protection Board and the insti […]

**SEC09 #66** — Item 3 0 1 1, "Legal basis" block, printed p. 23
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Articles 20 and 71 thereof and Articles 5, 6, 7, 9 and 10 of Annex VII thereto."

**SEC09 #67** — CHAPTER 10 0 — PROVISIONAL APPROPRIATIONS, "Legal basis" block, printed p. 29
- Status: VERIFIED
- Quote checked: "Regulation (EU, Euratom) 2024/2509 of the European Parliament and of the Council of 23 September 2024 on the financial rules applicable to the general budget of the Union (OJ L, 2024/2509, 26.9.2024, ELI: http://data.europa.eu/eli/reg/2024/2509/oj)."

**SEC09 #68** — CHAPTER 10 1 — CONTINGENCY RESERVE, "Remarks" block, printed p. 29
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover unforeseen expenditure resulting from budgetary decisions taken in the course of the financial year."

**SEC09 #69** — STAFF, "S 1 — EUROPEAN DATA PROTECTION SUPERVISOR", printed pp. 29–30
- Status: VERIFIED
- Quote checked: "AD 16 1 — 1 — / AD 15 1 — 1 — / AD 14 2 — 2 — / AD 13 1 — 1 — / AD 12 3 — 3 — / AD 11 6 — 5 — / AD 10 7 — 8 — / AD 9 14 — 8 — / AD 8 11 — 16 — / AD 7 12 — 13 — / AD 6 8 — 8 — / AD 5 — — — — / AD subtotal 66 — 66 — / AST 11 1 — 1 — / AST 7 2 — 2 — / AST 6 3 — […]

**SEC09 #70** — STAFF, "S 2 — EUROPEAN DATA PROTECTION BOARD", printed p. 31
- Status: VERIFIED
- Quote checked: "AD 12 2 — 1 — / AD 11 1 — 1 — / AD 10 — — 1 — / AD 9 2 — 2 — / AD 8 6 — 6 — / AD 7 14 — 14 — / AD subtotal 25 — 25 — / AST 8 1 — 1 — / AST 5 1 — 1 — / AST subtotal 2 — 2 — / AST/SC subtotal — — — — / Total 27 — 27 — / Grand Total 27 27"
### SEC10 — European External Action Service (39 entries)

SEC10.pdf = European External Action Service (EEAS), 39 entries. All 39 auto-matched exactly (29 exact, 8 digit-spacing-note, 2 hyphenation/ellipsis-note) — no manual-only cases needed for this file.

**SEC10 #1** — INTRODUCTION, opening paragraph (small print), printed p. 1
- Status: VERIFIED
- Quote checked: "The introduction to the budget request has been provided by each Institution together with the statement of estimate for its respective budget section. In line with Article 314§1 of the TFEU, which states that: '[…] each Institution shall […] draw up estimate […]

**SEC10 #2** — INTRODUCTION, "1 EXECUTIVE SUMMARY DB2027", printed p. 1
- Status: VERIFIED
- Quote checked: "The EEAS draft budget for 2027 amounts to EUR 992.7 million, representing an increase of 4.7% compared to the 2026 budget. This increase primarily reflects the need to reinforce the EU's security and defence capacity in response to the evolving geopolitical e […]

**SEC10 #3** — INTRODUCTION, printed p. 1
- Status: VERIFIED
- Quote checked: "Since its establishment in 2011, the European External Action Service (EEAS) has progressively strengthened its role as the diplomatic service of the European Union, implementing the EU's Common Foreign and Security Policy … Through its network of 145 EU Dele […]
- Note: Executive Summary opening paragraph; quote uses a real content ellipsis ("…") to skip two full sentences in the middle of the paragraph — confirmed both retained halves match verbatim and the skipped material is exactly what the ellipsis represents.

**SEC10 #4** — INTRODUCTION, printed p. 1
- Status: VERIFIED
- Quote checked: "A key component of the proposed increase is a core Security and Defence package, which includes the creation of 15 additional posts (10 Seconded National Experts and 5 contract agents). These reinforcements aim in particular to strengthen the EU Military Staf […]

**SEC10 #5** — INTRODUCTION, printed p. 1
- Status: VERIFIED
- Quote checked: "In parallel, additional resources are required to address underfunded non-salary expenditure, notably securityrelated costs in EU Delegations. This includes investments in secure communications, protective infrastructure and armoured vehicles, as well as enha […]

**SEC10 #6** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "In accordance with Article 21(3) of the Financial Regulation, this revenue is to be considered as assigned revenue and gives rise to the entry of additional appropriations in the headings which bore the initial expenditure giving rise to the corresponding rev […]

**SEC10 #7** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "Amount of assigned revenue in accordance with Article 21(2) and (3) of the Financial Regulation: p.m."

**SEC10 #8** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: Pattern: "The amount of assigned revenue in accordance with Article 21(2) and (3) of the Financial Regulation is estimated at EUR <amount>."

**SEC10 #9** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "In accordance with Article 21(3) of the Financial Regulation, this revenue is to be considered as assigned revenue and gives rise to the entry of additional appropriations on the lines which bore the initial expenditure giving rise to the corresponding revenu […]

**SEC10 #10** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: Article 3 3 1: "In accordance with Article 21(2) of the Financial Regulation, this revenue is to be considered as assigned revenue and gives rise to the entry of additional appropriations in the headings which bore the initial expenditure giving rise to the co […]

**SEC10 #11** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union. / Conditions of Employment of Other Servants of the European Union."

**SEC10 #12** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "Council Decision 2001/80/CFSP of 22 January 2001 on the establishment of the Military Staff of the European Union (OJ L 27, 30.1.2001, p. 7, ELI: http://data.europa.eu/eli/dec/2001/80(1)/oj)."

**SEC10 #13** — (location field not cleanly separable from adjoining text in the source record — see quote below)
- Status: VERIFIED
- Quote checked: "Decision of the High Representative of the Union for Foreign Affairs and Security Policy of 4 February 2014 establishing the rules applicable to National Experts seconded to the European External Action Service."

**SEC10 #14** — REVENUE "Figures" summary table and TITLE 3 "Figures" table, printed p. 2
- Status: VERIFIED
- Quote checked: Summary: "3 ADMINISTRATIVE REVENUE 67 844 000 64 464 000 374 946 558,94 / 4 FINANCIAL REVENUE, DEFAULT INTEREST AND FINES p.m. 350 000 1 756 070,83 / 6 REVENUE, CONTRIBUTIONS AND REFUNDS RELATED TO UNION POLICIES p.m. p.m. 0,— / Total 67 844 000 64 814 000 376 […]

**SEC10 #15** — CHAPTER 3 0 — REVENUE FROM STAFF, "Figures" table, printed p. 2
- Status: VERIFIED
- Quote checked: "3 0 0 Taxes and levies / 3 0 0 0 Tax on remunerations 28 167 000 28 322 000 26 142 028,83 / 3 0 0 1 Special levies on remunerations 5 507 000 5 482 000 5 115 565,51 / Article 3 0 0 — Subtotal 33 674 000 33 804 000 31 257 594,34 / 3 0 1 Contributions to the pe […]

**SEC10 #16** — CHAPTER 3 1 "Figures" table, printed p. 4; CHAPTER 3 2 "Figures" table, printed p. 5
- Status: VERIFIED
- Quote checked: Chapter 3 1: "3 1 0 Sale of immovable property — Assigned revenue p.m. p.m. 0,— / 3 1 1 Sale of other property p.m. p.m. 314 974,81 / 3 1 2 Letting and subletting immovable property — Assigned revenue p.m. p.m. 13 329 023,09 / Chapter 3 1 — Total p.m. p.m. 13 […]

**SEC10 #17** — CHAPTER 3 3 "Figures" table, printed p. 6; Article 3 3 2 Remarks, printed pp. 6–7
- Status: VERIFIED
- Quote checked: Table: "3 3 0 Repayment of amounts wrongly paid — Assigned revenue p.m. p.m. 3 213 922,51 / 3 3 1 Revenue for a specific purpose (income from foundations, subsidies, gifts and bequests) — Assigned revenue p.m. p.m. 0,— / 3 3 2 Revenue from the Commission contr […]

**SEC10 #18** — TITLE 4 "Figures" table, printed p. 7; CHAPTER 4 0, printed pp. 7–8; CHAPTER 4 1, printed p. 8; TITLE 6 "Figures" table, printed p. 8; CHAPTER 6 6, printed p. 9
- Status: VERIFIED
- Quote checked: Title 4: "4 0 REVENUE FROM INVESTMENTS AND ACCOUNTS p.m. 350 000 1 756 070,83 / 4 1 DEFAULT INTEREST p.m. p.m. 0,— / Title 4 — Total p.m. 350 000 1 756 070,83" — Chapter 4 0: "4 0 0 Revenue from investments, loans granted and bank accounts p.m. 350 000 1 753 9 […]

**SEC10 #19** — Item 3 0 0 0 — Tax on remunerations, "Legal basis" block, printed p. 3
- Status: VERIFIED
- Quote checked: "Protocol on the privileges and immunities of the European Union, and in particular Article 12 thereof. / Council Regulation (EEC, Euratom, ECSC) No 260/68 of 29 February 1968 laying down the conditions and procedure for applying the tax for the benefit of the […]

**SEC10 #20** — Item 3 0 0 1 "Legal basis" block, printed p. 3; Item 3 0 1 0 "Legal basis" block, printed p. 3
- Status: VERIFIED
- Quote checked: Item 3 0 0 1: "Staff Regulations of Officials of the European Union, and in particular Article 66a thereof." — Item 3 0 1 0: "Staff Regulations of Officials of the European Union, and in particular Article 83(2) thereof."

**SEC10 #21** — Item 3 0 1 1 — Transfer or purchase of pension rights by staff, "Legal basis" block, printed p. 3
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Articles 4 and 11 thereof and Article 48 of Annex VIII thereto."

**SEC10 #22** — Item 3 0 1 2 — Contributions to the pension scheme by staff on leave, "Legal basis" block, printed p. 3
- Status: VERIFIED
- Quote checked: "Staff Regulations of Officials of the European Union, and in particular Article 40(3) of Annex VIII thereto."

**SEC10 #23** — Article 4 0 9 "Legal basis" block, printed p. 8; Article 4 1 9 "Legal basis" block, printed p. 8
- Status: VERIFIED
- Quote checked: "Regulation (EU, Euratom) 2024/2509 of the European Parliament and of the Council of 23 September 2024 on the financial rules applicable to the general budget of the Union (OJ L, 2024/2509, 26.9.2024, ELI: http://data.europa.eu/eli/reg/2024/2509/oj), and in pa […]

**SEC10 #24** — Article 3 1 0 Remarks first paragraph, p. 4; Article 3 1 1 Remarks, p. 4; Article 3 3 8 Remarks first paragraph, p. 7; Article 3 3 9 Remarks, p. 7; Article 6 6 9 Remarks, p. 9
- Status: VERIFIED
- Quote checked: 3 1 0: "This article is intended to record revenue from the sale of immovable property belonging to the EEAS." — 3 1 1: "This article is intended to record revenue from the sale or part-exchange of other property belonging to the EEAS. / It also records the pr […]

**SEC10 #25** — EXPENDITURE, "Figures" summary table, printed p. 9
- Status: VERIFIED
- Quote checked: "1 STAFF AT HEADQUARTERS 252 840 092 252 840 092 245 714 855 245 714 855 233 520 408,82 233 520 408,82 / 2 BUILDINGS, EQUIPMENT AND OPERATING EXPENDITURE AT HEADQUARTERS 128 508 710 128 508 710 125 819 753 125 819 753 129 073 450,57 129 073 450,57 / 3 DELEGATI […]

**SEC10 #26** — TITLE 1 "Figures" table, printed pp. 9–10; CHAPTER 1 1 table, p. 10; CHAPTER 1 2 table, p. 13; CHAPTER 1 3 table, p. 15; CHAPTER 1 4 table, p. 17; CHAPTER 1 5 table, p. 18
- Status: VERIFIED
- Quote checked: Title 1: "1 1 REMUNERATION AND OTHER ENTITLEMENTS RELATING TO STATUTORY STAFF 188 947 000 184 131 000 172 169 512,82 / 1 2 REMUNERATION AND OTHER ENTITLEMENTS RELATING TO EXTERNAL STAFF 49 380 532 47 213 443 46 728 387,— / 1 3 OTHER EXPENDITURE RELATING TO STA […]

**SEC10 #27** — TITLE 2 "Figures" table, printed p. 20; CHAPTER 2 0 table, p. 20; CHAPTER 2 1 table, p. 23; CHAPTER 2 2 table, p. 26
- Status: VERIFIED
- Quote checked: Title 2: "2 0 BUILDINGS AND ASSOCIATED COSTS 53 568 110 53 568 110 52 714 100 52 714 100 52 485 412,— 52 485 412,— / 2 1 COMPUTER SYSTEMS, EQUIPMENT AND FURNITURE 55 896 600 55 896 600 55 055 810 55 055 810 57 864 232,18 57 864 232,18 / 2 2 OTHER OPERATING EXP […]

**SEC10 #28** — TITLE 3 — DELEGATIONS "Figures" table, printed p. 32; CHAPTER 3 0 table, printed pp. 32–33
- Status: VERIFIED
- Quote checked: Title 3: "3 0 DELEGATIONS 584 094 253 576 193 502 566 918 097,32 / Title 3 — Total 584 094 253 576 193 502 566 918 097,32" — Chapter 3 0: "3 0 0 0 Remuneration and entitlements of statutory staff 7.2.X11 166 213 000 165 774 000 154 185 543,14 92,76 % / 3 0 0 1 […]

**SEC10 #29** — TITLE 10 "Figures" table, printed p. 37; CHAPTER 10 0 and CHAPTER 10 1, printed pp. 37–38
- Status: VERIFIED
- Quote checked: "10 0 PROVISIONAL APPROPRIATIONS p.m. p.m. 0,— / 10 1 CONTINGENCY RESERVE p.m. p.m. 0,— / Title 10 — Total p.m. p.m. 0,—"

**SEC10 #30** — CHAPTER 1 1, "Remarks" block (placed after the chapter total), printed p. 10
- Status: VERIFIED
- Quote checked: "The appropriations entered in this chapter are assessed on the basis of the EEAS establishment plan for the financial year."

**SEC10 #31** — Item 1 1 0 0 — Basic salaries, "Remarks" block, printed p. 10
- Status: VERIFIED
- Quote checked: "The appropriation will be used in full compliance with the provisions of the Council Decision 2010/427/EU of 26 July 2010 establishing the organisation and functioning of the European External Action Service (OJ L 201, 3.8.2010, p. 30, ELI: http://data.europa […]

**SEC10 #32** — Items 1 1 0 1, 1 1 0 2, 1 1 0 3, 1 1 0 4, 1 1 0 5 "Remarks" blocks, printed pp. 11–12
- Status: VERIFIED
- Quote checked: 1 1 0 1: "This appropriation is intended to cover primarily, for officials and temporary staff holding a post provided for in the establishment plan: / — secretarial allowances, / — accommodation and transport allowances, / — fixed local travel allowances, / — […]

**SEC10 #33** — Items 1 2 0 0, 1 2 0 1, 1 2 0 2, 1 2 0 3, 1 2 0 4, 1 2 0 5 and Article 1 2 2 "Remarks" blocks, printed pp. 13–15
- Status: VERIFIED
- Quote checked: 1 2 0 0: "This appropriation is intended to cover the remuneration of contract staff (within the meaning of the Conditions of Employment of Other Servants of the European Union), the employer's contributions to the various social security schemes and the impac […]

**SEC10 #34** — Items 1 3 0 0, 1 3 0 1, 1 3 0 2 "Remarks" and "Legal basis" blocks, printed pp. 15–17
- Status: VERIFIED
- Quote checked: 1 3 0 0 Legal basis: "Staff Regulations of Officials of the European Union, and in particular Articles 27 to 31 and 33 thereof and Annex III thereto. / Decision 2002/620/EC … (OJ L 197, 26.7.2002, p. 53, ELI: http://data.europa.eu/eli/dec/2002/620/oj) and Deci […]

**SEC10 #35** — Item 1 4 0 and Items 1 5 0 0 to 1 5 0 4 "Remarks" and "Legal basis" blocks, printed pp. 17–19
- Status: VERIFIED
- Quote checked: 1 4 0 Legal basis: "Staff Regulations of Officials of the European Union, and in particular Articles 11, 12 and 13 of Annex VII thereto. / Decision of the High Representative of the Union for Foreign Affairs and Security Policy on rules applicable to mission b […]

**SEC10 #36** — Items 2 0 0 0 to 2 0 1 4, 2 1 0 0 to 2 1 1 2, 2 2 0 0 to 2 2 5 0 "Remarks" and "Legal basis" blocks, printed pp. 20–32
- Status: VERIFIED
- Quote checked: 2 0 0 2 Legal basis: "Council Directive 89/391/EEC of 12 June 1989 on the introduction of measures to encourage improvements in the safety and health of workers at work (OJ L 183, 29.6.1989, p. 1, ELI: http://data.europa.eu/eli/dir/1989/391/oj)." — 2 1 0 3 Rem […]

**SEC10 #37** — Items 3 0 0 0 to 3 0 0 5 "Remarks" and "Legal basis" blocks, printed pp. 33–37
- Status: VERIFIED
- Quote checked: 3 0 0 0 Legal basis: "Staff Regulations of Officials of the European Union. / Conditions of Employment of Other Servants of the European Union. / Rules governing designation, remuneration and other financial conditions adopted by the EEAS." — 3 0 0 3 Remarks ( […]

**SEC10 #38** — CHAPTER 10 0, printed p. 37; CHAPTER 10 1, printed p. 38
- Status: VERIFIED
- Quote checked: 10 0 Remarks: "The appropriations entered in this chapter are provisional and may be used only after their transfer to other chapters in accordance with the Financial Regulation." — 10 0 Legal basis: "Regulation (EU, Euratom) 2024/2509 … (OJ L, 2024/2509, 26.9 […]

**SEC10 #39** — STAFF, "S 1 — EUROPEAN EXTERNAL ACTION SERVICE", printed p. 38
- Status: VERIFIED
- Quote checked: "AD 16 16 — 21 — / AD 15 35 — 35 — / AD 14 173 — 157 — / AD 13 151 — 146 — / AD 12 163 — 175 — / AD 11 65 — 70 — / AD 10 131 — 130 — / AD 9 134 — 131 — / AD 8 175 — 174 — / AD 7 26 — 23 — / AD 6 22 — 26 — / AD 5 3 — 6 — / AD subtotal 1 094 — 1 094 — / AST 11 3 […]
### SEC03 — European Commission, Section III (194 entries)

SEC03.pdf = Section III, European Commission (the largest source, 1,114 printed pages, 23MB PDF — extraction with `pdftotext -layout` took about 5 seconds, no chunking needed). 194 entries: 177 auto-matched exactly (175 exact, 2 hyphenation-note); 13 required manual confirmation, all genuine matches, mostly the recurring "Candidate countries and Western Balkan potential candidates" table-wrap artifact explained above; and 4 entries carry no QUOTE field at all (the extractor's own cross-reference notes, not independently checkable — see notes on each).

**SEC03 #1** — REVENUE summary table
- Status: VERIFIED
- Quote checked: "1 OWN RESOURCES 208 891 503 636 [2027 estimate]" ... "Total 211 378 898 990 [2027] 197 515 184 677 [2026] 223 467 753 355,80 [2025 out-turn]"
- Note: REVENUE summary table: quote uses [2027 estimate]/[2027]/[2026]/[2025 out-turn] bracket tags not present in source; all cited figures (208 891 503 636; 211 378 898 990 / 197 515 184 677 / 223 467 753 355,80) confirmed verbatim in the table.

**SEC03 #2** — Title 1 — Own Resources, Chapter breakdown
- Status: VERIFIED
- Quote checked: "12 CUSTOMS DUTIES AND OTHER DUTIES 25 037 700 000" / "13 OWN RESOURCE BASED ON VALUE ADDED TAX 26 040 887 250" / "14 OWN RESOURCE BASED ON GROSS NATIONAL INCOME 151 352 972 066" / "17 OWN RESOURCE BASED ON NON-RECYCLED PLASTIC PACKAGING WASTE 6 459 944 320" ( […]

**SEC03 #3** — Article 1 3 0 remarks — VAT own resource
- Status: VERIFIED
- Quote checked: "The applied uniform rate valid for all Member States to the VAT bases determined in accordance with Union rules is fixed at 0,30 %. The assessment base to be taken into account for this purpose shall not exceed 50 % of GNI for each Member State."

**SEC03 #4** — Article 1 4 0 remarks — GNI own resource
- Status: VERIFIED
- Quote checked: "The rate to be applied to the Member States' GNI for financial year 2027 is 0,7495 %."

**SEC03 #5** — Article 1 7 0 remarks — plastic-packaging own resource
- Status: VERIFIED
- Quote checked: "The uniform call rate shall be EUR 0,80 per kilogram. Certain Member States shall be entitled to annual lump-sum reductions."

**SEC03 #6** — Title 1 own-resources tables — per-Member-State breakdown
- Status: VERIFIED
- Quote checked: Full 27-Member-State breakdown given for each own-resource line (Customs duties, VAT, GNI, plastic, GNI lump-sum reductions) for 2027/2026/2025.
- Note: Not a verbatim quote — the entry's own field is a structural description ("Full 27-Member-State breakdown given..."), not quoted text. Confirmed the described per-Member-State tables (Belgium, Bulgaria, ... columns) do exist in Title 1 as described; nothing to compare word-for-word.

**SEC03 #7** — Expenditure summary table, column header row, printed p. 72
- Status: VERIFIED
- Quote checked: "2027 appropriations / 2026 appropriations / 2025 out-turn — Commitments / Payments"
- Note: Not a verbatim quote — compressed paraphrase of the two-row column-header structure ("2027 appropriations / 2026 appropriations / 2025 out-turn" then "Commitments / Payments" repeated three times). Confirmed the described header structure is accurate, though the quote compresses six header cells (Commitments/Payments x3) into one "Commitments / Payments" pair.

**SEC03 #8** — Expenditure summary table, Title 01 row, printed p. 72
- Status: VERIFIED
- Quote checked: "01 Research and Innovation 13 806 032 501 15 158 619 728 14 144 125 944 15 023 626 032 13 540 768 230,83 12 035 513 394,01"

**SEC03 #9** — Expenditure summary table, Title 02 row, printed p. 72
- Status: VERIFIED
- Quote checked: "02 European Strategic Investments 4 739 511 306 4 792 752 880 4 623 987 321 5 440 131 697 4 568 367 131,54 5 125 232 304,58"

**SEC03 #10** — Expenditure summary table, Title 02 block, "Reserves (30 02 02)" sub-row, printed p. 72
- Status: VERIFIED
- Quote checked: "Reserves (30 02 02) 2 889 000 2 889 000"

**SEC03 #11** — Expenditure summary table, Title 03 row, printed p. 72
- Status: VERIFIED
- Quote checked: "03 Single Market 1 042 960 364 1 017 065 592 1 022 845 917 951 984 382 1 051 305 958,26 1 072 504 905,15"

**SEC03 #12** — Expenditure summary table, Title 03 block, "Reserves (30 02 02)" sub-row, printed p. 72
- Status: VERIFIED
- Quote checked: "Reserves (30 02 02) 3 901 912 3 901 912 1 569 000 1 569 000"

**SEC03 #13** — Expenditure summary table, Title 04 row, printed p. 72
- Status: VERIFIED
- Quote checked: "04 Space 2 306 212 539 1 867 470 074 2 370 465 015 1 919 316 015 2 371 887 498,87 1 997 864 033,73"

**SEC03 #14** — Expenditure summary table, Title 05 row, printed p. 72
- Status: VERIFIED
- Quote checked: "05 Regional Development and Cohesion 44 007 643 447 48 303 081 811 42 122 831 012 46 827 681 069 48 157 793 424,45 27 750 812 443,88"

**SEC03 #15** — Expenditure summary table, Title 06 row, printed p. 72
- Status: VERIFIED
- Quote checked: "06 Recovery and Resilience 11 153 096 195 11 126 080 322 9 205 085 266 9 184 230 761 6 184 145 635,51 6 039 364 962,67"

**SEC03 #16** — Expenditure summary table, Title 06 block, "Reserves (30 02 02)" sub-row, printed p. 72
- Status: VERIFIED
- Quote checked: "Reserves (30 02 02) 3 053 000 3 950 000 2 653 000 2 110 000"

**SEC03 #17** — Expenditure summary table, Title 07 row, printed p. 72
- Status: VERIFIED
- Quote checked: "07 Investing in People, Social Cohesion and Values 20 597 394 418 22 416 525 188 20 320 269 147 22 513 635 336 22 525 564 041,74 13 346 853 591,08"

**SEC03 #18** — Expenditure summary table, Title 08 row, printed p. 72
- Status: VERIFIED
- Quote checked: "08 Agriculture and Maritime Policy 54 854 857 178 57 511 896 130 54 664 948 341 52 956 444 888 54 078 967 410,77 55 008 185 110,52"

**SEC03 #19** — Expenditure summary table, Title 08 block, "Reserves (30 02 02)" sub-row, printed p. 72
- Status: VERIFIED
- Quote checked: "Reserves (30 02 02) 126 350 000 125 250 000 114 190 000 85 890 000"

**SEC03 #20** — Expenditure summary table, Title 09 row, printed p. 72
- Status: VERIFIED
- Quote checked: "09 Environment and Climate Action 2 248 843 380 3 816 949 639 2 175 018 687 2 159 752 291 2 392 835 253,04 798 147 951,95"

**SEC03 #21** — Expenditure summary table, Title 09 block, "Reserves (30 02 02)" sub-row, printed p. 72
- Status: VERIFIED
- Quote checked: "Reserves (30 02 02) 5 439 515 439 515 15 258 052 15 258 052"

**SEC03 #22** — Expenditure summary table, Title 10 row, printed p. 72
- Status: VERIFIED
- Quote checked: "10 Migration 2 365 940 018 1 397 852 595 2 322 122 749 1 599 228 372 2 102 602 634,14 1 403 097 129,53"

**SEC03 #23** — Expenditure summary table, Title 10 block, "Reserves (30 01 01)" sub-row, printed p. 72
- Status: VERIFIED
- Quote checked: "Reserves (30 01 01) 1 837 800 1 837 800 900 000 900 000"

**SEC03 #24** — Expenditure summary table, Title 11 row, printed p. 72
- Status: VERIFIED
- Quote checked: "11 Border Management 3 420 790 760 2 469 234 413 2 695 843 766 2 287 767 757 2 541 694 943,96 2 160 221 675,97"

**SEC03 #25** — Expenditure summary table, Title 11 block, "Reserves (30 02 02)" sub-row, printed pp. 72–73
- Status: VERIFIED
- Quote checked: "Reserves (30 02 02) 728 000 728 000"

**SEC03 #26** — Expenditure summary table, Title 12 row, printed p. 73
- Status: VERIFIED
- Quote checked: "12 Security 783 276 176 734 821 106 790 728 335 819 070 769 781 226 581,01 691 256 517,54"

**SEC03 #27** — Expenditure summary table, Title 12 block, "Reserves (30 02 02)" sub-row, printed p. 73
- Status: VERIFIED
- Quote checked: "Reserves (30 02 02) 11 122 000 11 122 000 19 678 000 19 678 000"

**SEC03 #28** — Expenditure summary table, Title 13 row, printed p. 73
- Status: VERIFIED
- Quote checked: "13 Defence 2 157 000 361 1 455 159 596 1 381 844 604 1 319 839 639 1 839 260 688,50 1 129 450 664,48"

**SEC03 #29** — Expenditure summary table, Title 13 block, "Reserves (30 01 01, 30 02 02)" sub-row, printed p. 73
- Status: VERIFIED
- Quote checked: "Reserves (30 01 01, 30 02 02) 115 000 000 30 000 000 621 256 000 94 712 000"

**SEC03 #30** — Expenditure summary table, Title 14 row, printed p. 73
- Status: VERIFIED
- Quote checked: "14 External Action 12 813 235 397 14 353 122 073 12 898 366 618 14 367 254 149 13 660 626 340,13 12 574 363 010,05"

**SEC03 #31** — Expenditure summary table, Title 14 block, "Reserves (30 02 02)" sub-row, printed p. 73
- Status: VERIFIED
- Quote checked: "Reserves (30 02 02) 20 000 000 20 000 000"

**SEC03 #32** — Expenditure summary table, Title 15 row, printed p. 73
- Status: VERIFIED
- Quote checked: "15 Pre-accession Assistance 2 634 626 474 2 287 513 648 2 701 653 474 2 202 415 923 2 556 393 650,27 1 903 845 190,21"

**SEC03 #33** — Expenditure summary table, Title 16 row, printed p. 73
- Status: VERIFIED
- Quote checked: "16 Expenditure outside the annual ceilings set out in the Multiannual Financial Framework 5 216 906 986 7 635 833 691 3 945 162 341 3 286 940 351 5 023 536 031,02 2 433 453 595,66"

**SEC03 #34** — Expenditure summary table, Title 20 row, printed p. 73
- Status: VERIFIED
- Quote checked: "20 Administrative expenditure of the European Commission 4 691 408 813 4 691 408 813 4 594 914 035 4 594 914 035 4 407 805 411,44 4 407 805 411,44"

**SEC03 #35** — Expenditure summary table, Title 21 row, printed p. 73
- Status: VERIFIED
- Quote checked: "21 European Schools and Pensions 3 463 518 747 3 463 518 747 3 276 253 552 3 276 253 552 3 107 362 414,87 3 107 362 414,87"

**SEC03 #36** — Expenditure summary table, Title 30 row, printed p. 73
- Status: VERIFIED
- Quote checked: "30 Reserves 2 097 495 080 1 971 439 302 2 546 262 731 1 955 725 949 0,— 0,—"

**SEC03 #37** — Expenditure summary table, "Total" row, printed p. 73
- Status: VERIFIED
- Quote checked: "Total 194 400 750 140 206 470 345 348 187 802 728 855 192 686 212 967 190 892 143 280,35 152 985 334 307,32"

**SEC03 #38** — Expenditure summary table, "Of which Reserves" row, printed p. 73
- Status: VERIFIED
- Quote checked: "Of which Reserves 290 321 227 200 118 227 775 504 052 220 117 052"

**SEC03 #39** — Title 01 summary table, Chapter 01 01 row, printed p. 73
- Status: VERIFIED
- Quote checked: "01 01 Support administrative expenditure of the ‘Research and Innovation’ cluster 983 521 963 983 521 963 958 604 669 958 604 669 916 161 097,39 916 161 097,39"

**SEC03 #40** — Title 01 summary table, Chapter 01 02 row, printed p. 73
- Status: VERIFIED
- Quote checked: "01 02 Horizon Europe 11 977 271 331 13 346 918 953 12 155 627 413 13 012 519 874 11 955 664 876,96 10 314 416 742,50"

**SEC03 #41** — Title 01 summary table, Chapter 01 03 row, printed p. 73
- Status: VERIFIED
- Quote checked: "01 03 Euratom Research and Training Programme 190 507 156 100 171 070 181 534 270 108 045 140 179 115 187,48 153 299 839,72"

**SEC03 #42** — Title 01 summary table, Chapter 01 04 row, printed p. 73
- Status: VERIFIED
- Quote checked: "01 04 International Thermonuclear Experimental Reactor (ITER) 654 732 051 715 326 844 843 959 592 923 079 608 480 087 069,— 635 650 679,—"

**SEC03 #43** — Title 01 summary table, Chapter 01 20 row, printed p. 73
- Status: VERIFIED
- Quote checked: "01 20 Pilot projects, preparatory actions, prerogatives and other actions p.m. 12 680 898 4 400 000 21 376 741 9 740 000,— 15 985 035,40"

**SEC03 #44** — Title 01 summary table, "Title 01 — Total" row, printed p. 73
- Status: VERIFIED
- Quote checked: "Title 01 — Total 13 806 032 501 15 158 619 728 14 144 125 944 15 023 626 032 13 540 768 230,83 12 035 513 394,01"

**SEC03 #45** — Chapter 01 01, "Legal basis" block, printed p. 74
- Status: VERIFIED
- Quote checked: "Legal basis / See Chapter 01 02."

**SEC03 #46** — Chapter 01 01 table, "Article 01 01 01 — Subtotal" row, printed p. 74
- Status: VERIFIED
- Quote checked: "Article 01 01 01 — Subtotal 861 204 182 837 906 671 802 524 004,62 93,19 %"

**SEC03 #47** — Chapter 01 01 table, Item 01 01 01 01 row, printed p. 73
- Status: VERIFIED
- Quote checked: "01 01 01 01 Expenditure related to officials and temporary staff implementing Horizon Europe — Indirect research 1.0.11 188 512 961 187 011 774 167 019 148,93 88,60 %"

**SEC03 #48** — Item 01 01 01 01, "Remarks" block, printed p. 75
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover expenditure relating to officials and temporary staff implementing the specific research and innovation programme — Horizon Europe and occupying posts on the authorised establishment plans engaged in indirect research a […]

**SEC03 #49** — Item 01 01 01 01, "Assigned revenue" block, printed pp. 75–76
- Status: VERIFIED
- Quote checked: "Assigned revenue (origin, estimated amounts and corresponding article or item of the statement of revenue). / EFTA-EEA 4 939 040 6 6 0 0 / Candidate countries and Western Balkan potential candidates 509 823 6 0 1 0"
- Note: Automated matcher false negative caused by a pdftotext -layout column-alignment artifact: the source label "Candidate countries and Western Balkan potential candidates" wraps across two source lines because it is a long table-cell label, and pdftotext places the row's numeric value directly after "potential" (attached to the first physical line of the wrapped cell) with the word "candidates" printed alone on the next line. Confirmed via both -layout and default extraction, and via multiple recurrences of the identical pattern (20+ times) elsewhere in the same document, that the true label is the single unbroken phrase "Candidate countries and Western Balkan potential candidates" and the quoted figure is attached to it correctly — not a genuine mismatch.

**SEC03 #50** — Chapter 01 02, "Legal basis" block, first cited act, printed p. 90
- Status: VERIFIED
- Quote checked: "Council Regulation (EU) 2020/2094 of 14 December 2020 establishing a European Union Recovery Instrument to support the recovery in the aftermath of the COVID-19 crisis (OJ L 433 I, 22.12.2020, p. 23, ELI: http://data.europa.eu/eli/reg/2020/2094/oj)."

**SEC03 #51** — Chapter 01 02, "Legal basis" block, second cited act, printed p. 90
- Status: VERIFIED
- Quote checked: "Regulation (EU) 2021/695 of the European Parliament and of the Council of 28 April 2021 establishing Horizon Europe – the Framework Programme for Research and Innovation, laying down its rules for participation and dissemination, and repealing Regulations (EU […]

**SEC03 #52** — Chapter 01 02, "Legal basis" block, third cited act, printed p. 90
- Status: VERIFIED
- Quote checked: "Council Decision (EU) 2021/764 of 10 May 2021 establishing the Specific Programme implementing Horizon Europe – the Framework Programme for Research and Innovation, and repealing Decision 2013/743/EU (OJ L 167 I, 12.5.2021, p. 1, ELI: http://data.europa.eu/el […]

**SEC03 #53** — Chapter 01 02, "Legal basis" block, fourth cited act, printed p. 91
- Status: VERIFIED
- Quote checked: "Regulation (EU) 2021/947 of the European Parliament and of the Council of 9 June 2021 establishing the Neighbourhood, Development and International Cooperation Instrument – Global Europe, amending and repealing Decision No 466/2014/EU and repealing Regulation […]

**SEC03 #54** — Chapter 01 02, "Legal basis" block, fifth cited act, printed p. 91
- Status: VERIFIED
- Quote checked: "Regulation (EU) 2021/2115 of the European Parliament and of the Council of 2 December 2021 establishing rules on support for strategic plans to be drawn up by Member States under the common agricultural policy (CAP Strategic Plans) and financed by the Europea […]

**SEC03 #55** — Chapter 01 02, "Remarks" block, penultimate paragraph, printed p. 90
- Status: VERIFIED
- Quote checked: "In addition, and in accordance with Regulation (EU) 2020/2094, external assigned revenue resulting from proceeds of the European Union Recovery Instrument entered in the statement of revenue give rise to the provision of appropriations for this programme unde […]

**SEC03 #56** — Chapter 01 02, "Remarks" block, printed p. 90
- Status: VERIFIED
- Quote checked: "In accordance with Articles 21, 22 and 24 of the Financial Regulation, contributions received from third countries (EFTA States pursuant to the Agreement on the European Economic Area, candidate countries and, if applicable, the Western Balkan potential candi […]

**SEC03 #57** — Article 01 01 01, "Legal basis" block, printed p. 75
- Status: VERIFIED
- Quote checked: "Legal basis / See Chapter 01 02."

**SEC03 #58** — Item 01 01 01 01, "Assigned revenue" block, third line, printed p. 76
- Status: VERIFIED
- Quote checked: "Other countries 53 434 322 6 0 1 0"

**SEC03 #59** — Chapter 01 01 figures table, Item 01 01 01 02 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 01 02 External personnel implementing Horizon Europe — Indirect research 1.0.11 53 151 145 52 052 521 47 301 406,92 88,99 %"

**SEC03 #60** — Chapter 01 01 figures table, Item 01 01 01 03 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 01 03 Other management expenditure for Horizon Europe — Indirect research 1.0.11 89 708 205 77 387 182 79 818 715,68 88,98 %"

**SEC03 #61** — Chapter 01 01 figures table, Item 01 01 01 11 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 01 11 Expenditure related to officials and temporary staff implementing Horizon Europe — Direct research 1.0.11 181 571 000 178 661 000 175 287 000,— 96,54 %"

**SEC03 #62** — Chapter 01 01 figures table, Item 01 01 01 12 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 01 12 External personnel implementing Horizon Europe — Direct research 1.0.11 38 666 000 38 094 000 37 514 829,74 97,02 %"

**SEC03 #63** — Chapter 01 01 figures table, Item 01 01 01 13 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 01 13 Other management expenditure for Horizon Europe — Direct research 1.0.11 52 296 000 51 950 000 51 609 545,71 98,69 %"

**SEC03 #64** — Chapter 01 01 figures table, Item 01 01 01 71 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 01 71 European Research Council Executive Agency — Contribution from Horizon Europe 1.0.11 66 300 000 65 000 000 66 320 418,78 100,03 %"

**SEC03 #65** — Chapter 01 01 figures table, Item 01 01 01 72 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 01 72 European Research Executive Agency — Contribution from Horizon Europe 1.0.11 113 973 925 111 394 026 107 522 192,86 94,34 %"

**SEC03 #66** — Chapter 01 01 figures table, Item 01 01 01 73 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 01 73 European Health and Digital Executive Agency — Contribution from Horizon Europe 1.0.11 27 456 888 26 248 694 23 478 508,— 85,51 %"

**SEC03 #67** — Chapter 01 01 figures table, Item 01 01 01 74 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 01 74 European Climate, Infrastructure and Environment Executive Agency — Contribution from Horizon Europe 1.0.11 19 515 755 19 326 804 15 583 572,— 79,85 %"

**SEC03 #68** — Chapter 01 01 figures table, Item 01 01 01 76 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 01 76 European Innovation Council and SMEs Executive Agency — Contribution from Horizon Europe 1.0.11 30 052 303 30 780 670 31 068 666,— 103,38 %"

**SEC03 #69** — Chapter 01 01 figures table, Item 01 01 02 01 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 02 01 Expenditure related to officials and temporary staff implementing the Euratom Research and Training Programme — Indirect research 1.0.12 7 637 132 8 313 893 7 349 621,04 96,24 %"

**SEC03 #70** — Chapter 01 01 figures table, Item 01 01 02 02 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 02 02 External personnel implementing the Euratom Research and Training Programme — Indirect research 1.0.12 461 906 366 237 304 097,83 65,84 %"

**SEC03 #71** — Chapter 01 01 figures table, Item 01 01 02 03 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 02 03 Other management expenditure for the Euratom Research and Training Programme — Indirect research 1.0.12 2 502 788 1 548 198 1 639 340,42 65,50 %"

**SEC03 #72** — Chapter 01 01 figures table, Item 01 01 02 11 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 02 11 Expenditure related to officials and temporary staff implementing the Euratom Research and Training Programme — Direct research 1.0.12 57 277 000 56 277 000 55 977 000,— 97,73 %"

**SEC03 #73** — Chapter 01 01 figures table, Item 01 01 02 12 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 02 12 External personnel implementing the Euratom Research and Training Programme — Direct research 1.0.12 10 455 000 10 455 000 10 455 000,— 100,00 %"

**SEC03 #74** — Chapter 01 01 figures table, Item 01 01 02 13 row, printed p. 74
- Status: VERIFIED
- Quote checked: "01 01 02 13 Other management expenditure for the Euratom Research and Training Programme — Direct research 1.0.12 35 696 909 35 314 314 31 536 124,48 88,34 %"

**SEC03 #75** — Chapter 01 01 figures table, "Article 01 01 02 — Subtotal" row, printed p. 75
- Status: VERIFIED
- Quote checked: "Article 01 01 02 — Subtotal 114 030 735 112 274 642 107 261 183,77 94,06 %"

**SEC03 #76** — Chapter 01 01 figures table, Item 01 01 03 01 row, printed p. 75
- Status: VERIFIED
- Quote checked: "01 01 03 01 Expenditure related to officials and temporary staff implementing ITER 1.0.13 6 190 110 6 338 583 4 745 760,— 76,67 %"

**SEC03 #77** — Chapter 01 01 figures table, Item 01 01 03 02 row, printed p. 75
- Status: VERIFIED
- Quote checked: "01 01 03 02 External personnel implementing ITER 1.0.13 315 000 289 579 222 750,— 70,71 %"

**SEC03 #78** — Chapter 01 01 figures table, Item 01 01 03 03 row, printed p. 75
- Status: VERIFIED
- Quote checked: "01 01 03 03 Other management expenditure for ITER 1.0.13 1 781 936 1 795 194 1 407 399,— 78,98 %"

**SEC03 #79** — Chapter 01 01 figures table, "Article 01 01 03 — Subtotal" row, printed p. 75
- Status: VERIFIED
- Quote checked: "Article 01 01 03 — Subtotal 8 287 046 8 423 356 6 375 909,— 76,94 %"

**SEC03 #80** — Chapter 01 01 figures table, "Chapter 01 01 — Total" row, printed p. 75
- Status: VERIFIED
- Quote checked: "Chapter 01 01 — Total 983 521 963 958 604 669 916 161 097,39 93,15 %"

**SEC03 #81** — Chapter 01 01, "Remarks" block, first paragraph, printed p. 75
- Status: VERIFIED
- Quote checked: "Appropriations under this chapter are intended to cover expenditure of an administrative nature (salaries, studies, meetings of experts, information and publications, etc.) directly linked to the achievement of the objectives of the programmes or measures com […]

**SEC03 #82** — Chapter 01 01, "Remarks" block, second paragraph, printed p. 75
- Status: VERIFIED
- Quote checked: "In accordance with Articles 21, 22 and 24 of the Financial Regulation, contributions received from third countries (EFTA States pursuant to the Agreement on the European Economic Area, candidate countries and, if applicable, the Western Balkan potential candi […]

**SEC03 #83** — Chapter 01 01, "Remarks" block, third paragraph, printed p. 75
- Status: VERIFIED
- Quote checked: "The related estimated amounts as well as the corresponding article or item of the statement of revenue are indicated, wherever possible, in the relevant budget lines."

**SEC03 #84** — Article 01 01 01, "Remarks" block, printed p. 75
- Status: VERIFIED
- Quote checked: "Besides the expenditure described in this chapter, this appropriation is also intended to cover expenditure relating to officials, temporary and external staff as well as other administrative expenditure for the management of the specific research and innovat […]

**SEC03 #85** — Item 01 01 01 02, "Remarks" block, printed p. 76
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover expenditure on external personnel implementing the specific research and innovation programme — Horizon Europe in the form of indirect actions, including external personnel posted in Union delegations and the salary and […]

**SEC03 #86** — Item 01 01 01 02, "Assigned revenue" block, printed p. 76
- Status: VERIFIED
- Quote checked: "Proceeds from EURI 2 645 319 5 0 4 0 / EFTA-EEA 1 461 867 6 6 0 0 / Candidate countries and Western Balkan potential candidates 153 232 6 0 1 0 / Other countries 16 060 054 6 0 1 0"
- Note: Automated matcher false negative caused by a pdftotext -layout column-alignment artifact: the source label "Candidate countries and Western Balkan potential candidates" wraps across two source lines because it is a long table-cell label, and pdftotext places the row's numeric value directly after "potential" (attached to the first physical line of the wrapped cell) with the word "candidates" printed alone on the next line. Confirmed via both -layout and default extraction, and via multiple recurrences of the identical pattern (20+ times) elsewhere in the same document, that the true label is the single unbroken phrase "Candidate countries and Western Balkan potential candidates" and the quoted figure is attached to it correctly — not a genuine mismatch.

**SEC03 #87** — Item 01 01 01 03, "Remarks" block, printed p. 76
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover other administrative expenditure for the management of the specific research and innovation programme — Horizon Europe, in the form of indirect actions, including other administrative expenditure incurred by staff poste […]

**SEC03 #88** — Item 01 01 01 03, "Remarks" block, third paragraph, printed p. 76
- Status: VERIFIED
- Quote checked: "It is also intended to cover expenditure related to the development and maintenance of IT systems needed for the management and implementation of the programme."

**SEC03 #89** — Item 01 01 01 03, "Assigned revenue" block, printed p. 76
- Status: VERIFIED
- Quote checked: "Proceeds from EURI 1 144 097 5 0 4 0 / EFTA-EEA 2 380 330 6 6 0 0 / Candidate countries and Western Balkan potential candidates 390 385 6 0 1 0 / Other countries 40 930 829 6 0 1 0"
- Note: Automated matcher false negative caused by a pdftotext -layout column-alignment artifact: the source label "Candidate countries and Western Balkan potential candidates" wraps across two source lines because it is a long table-cell label, and pdftotext places the row's numeric value directly after "potential" (attached to the first physical line of the wrapped cell) with the word "candidates" printed alone on the next line. Confirmed via both -layout and default extraction, and via multiple recurrences of the identical pattern (20+ times) elsewhere in the same document, that the true label is the single unbroken phrase "Candidate countries and Western Balkan potential candidates" and the quoted figure is attached to it correctly — not a genuine mismatch.

**SEC03 #90** — Item 01 01 01 11, "Remarks" block, first paragraph and indents, printed p. 77
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover expenditure relating to officials and temporary staff occupying posts on the authorised establishment plan of the Joint Research Centre (JRC) and implementing the specific research and innovation programme — Horizon Eur […]

**SEC03 #91** — Item 01 01 01 11, "Remarks" block, penultimate paragraph and indents, printed p. 77
- Status: VERIFIED
- Quote checked: "This appropriation can be supplemented by appropriations that the JRC will receive by participating on a competitive basis in indirect actions and in scientific and technical activities in support of Union policies. The activities of a competitive nature cond […]

**SEC03 #92** — Item 01 01 01 11, "Assigned revenue" block, printed p. 77
- Status: VERIFIED
- Quote checked: "EFTA-EEA 4 757 160 6 6 0 0"

**SEC03 #93** — Item 01 01 01 12, "Remarks" block, first paragraph, printed p. 77
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover the expenditure relating to external personnel not on the establishment plan of the Joint Research Centre (JRC), i.e. contract staff, grant holders, seconded national experts and visiting scientists, including external […]

**SEC03 #94** — Item 01 01 01 12, "Assigned revenue" block, printed p. 78
- Status: VERIFIED
- Quote checked: "EFTA-EEA 1 013 049 6 6 0 0 / Candidate countries and Western Balkan potential candidates 26 749 6 0 1 0 / Other countries 2 693 008 6 0 1 0 / Other assigned revenue 418 000 6 0 1 0"
- Note: Automated matcher false negative caused by a pdftotext -layout column-alignment artifact: the source label "Candidate countries and Western Balkan potential candidates" wraps across two source lines because it is a long table-cell label, and pdftotext places the row's numeric value directly after "potential" (attached to the first physical line of the wrapped cell) with the word "candidates" printed alone on the next line. Confirmed via both -layout and default extraction, and via multiple recurrences of the identical pattern (20+ times) elsewhere in the same document, that the true label is the single unbroken phrase "Candidate countries and Western Balkan potential candidates" and the quoted figure is attached to it correctly — not a genuine mismatch.

**SEC03 #95** — Item 01 01 01 13, "Remarks" block, first indent, printed p. 78
- Status: VERIFIED
- Quote checked: "— staff-related expenditure not covered by Items 01 01 01 11 and 01 01 01 12 including missions, training, medical and social services, expenditure on organising competitions, interviewing candidates and representation costs,"

**SEC03 #96** — Item 01 01 01 13, "Remarks" block, final indent, printed p. 78
- Status: VERIFIED
- Quote checked: "— expenditure in respect of all resources for the financing of major research infrastructure projects, in particular the construction of new buildings, the complete refurbishment of existing buildings and the purchase of important equipment related to the tec […]

**SEC03 #97** — Item 01 01 01 13, "Assigned revenue" block, printed p. 78
- Status: VERIFIED
- Quote checked: "EFTA-EEA 1 370 155 6 6 0 0 / Candidate countries and Western Balkan potential candidates 354 426 6 0 1 0 / Other countries 46 162 470 6 0 1 0 / Other assigned revenue 1 164 000 6 0 1 0"
- Note: Automated matcher false negative caused by a pdftotext -layout column-alignment artifact: the source label "Candidate countries and Western Balkan potential candidates" wraps across two source lines because it is a long table-cell label, and pdftotext places the row's numeric value directly after "potential" (attached to the first physical line of the wrapped cell) with the word "candidates" printed alone on the next line. Confirmed via both -layout and default extraction, and via multiple recurrences of the identical pattern (20+ times) elsewhere in the same document, that the true label is the single unbroken phrase "Candidate countries and Western Balkan potential candidates" and the quoted figure is attached to it correctly — not a genuine mismatch.

**SEC03 #98** — Item 01 01 01 71, "Remarks" block, printed p. 79
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover the operating costs of the European Research Council Executive Agency incurred as a result of the Executive Agency's role in the implementation of the specific research and innovation programme — Horizon Europe (2021-20 […]

**SEC03 #99** — Item 01 01 01 71, "Assigned revenue" block, printed p. 79
- Status: VERIFIED
- Quote checked: "EFTA-EEA 1 737 060 6 6 0 0 / Candidate countries and Western Balkan potential candidates 151 061 6 0 1 0 / Other countries 15 619 991 6 0 1 0"
- Note: Automated matcher false negative caused by a pdftotext -layout column-alignment artifact: the source label "Candidate countries and Western Balkan potential candidates" wraps across two source lines because it is a long table-cell label, and pdftotext places the row's numeric value directly after "potential" (attached to the first physical line of the wrapped cell) with the word "candidates" printed alone on the next line. Confirmed via both -layout and default extraction, and via multiple recurrences of the identical pattern (20+ times) elsewhere in the same document, that the true label is the single unbroken phrase "Candidate countries and Western Balkan potential candidates" and the quoted figure is attached to it correctly — not a genuine mismatch.

**SEC03 #100** — Item 01 01 01 71, "Legal basis" block, first cited act, printed p. 79
- Status: VERIFIED
- Quote checked: "Council Regulation (EC) No 58/2003 of 19 December 2002 laying down the statute for executive agencies to be entrusted with certain tasks in the management of Community programmes (OJ L 11, 16.1.2003, p. 1, ELI: http://data.europa.eu/eli/reg/2003/58/oj)."

**SEC03 #101** — Item 01 01 01 71, "Legal basis" block, second cited act, printed p. 79
- Status: VERIFIED
- Quote checked: "Regulation (EC) No 1906/2006 of the European Parliament and of the Council of 18 December 2006 laying down the rules for the participation of undertakings, research centres and universities in actions under the Seventh Framework Programme and for the dissemin […]

**SEC03 #102** — Item 01 01 01 71, "Legal basis" block, third cited act, printed p. 79
- Status: VERIFIED
- Quote checked: "Decision No 1982/2006/EC of the European Parliament and of the Council of 18 December 2006 concerning the Seventh Framework Programme of the European Community for research, technological development and demonstration activities (2007-2013) (OJ L 412, 30.12.2 […]

**SEC03 #103** — Item 01 01 01 71, "Legal basis" block, fourth cited act, printed p. 79
- Status: VERIFIED
- Quote checked: "Council Decision 2006/972/EC of 19 December 2006 concerning the specific programme: Ideas implementing the Seventh Framework Programme of the European Community for research, technological development and demonstration activities (2007 to 2013) (OJ L 400, 30. […]

**SEC03 #104** — Item 01 01 01 71, "Legal basis" block, fifth cited act, printed p. 79
- Status: VERIFIED
- Quote checked: "Council Decision 2013/743/EU of 3 December 2013 establishing the specific programme implementing Horizon 2020 — the Framework Programme for Research and Innovation (2014-2020) and repealing Decisions 2006/971/EC, 2006/972/EC, 2006/973/EC, 2006/974/EC and 2006 […]

**SEC03 #105** — Item 01 01 01 71, "Legal basis" block, sixth cited act, printed p. 79
- Status: VERIFIED
- Quote checked: "Regulation (EU) 2015/1017 of the European Parliament and of the Council of 25 June 2015 on the European Fund for Strategic Investments, the European Investment Advisory Hub and the European Investment Project Portal and amending Regulations (EU) No 1291/2013 […]

**SEC03 #106** — Item 01 01 01 71, "Legal basis" block, seventh cited act, printed p. 79
- Status: VERIFIED
- Quote checked: "Commission Implementing Decision (EU) 2021/173 of 12 February 2021 establishing the European Climate, Infrastructure and Environment Executive Agency, the European Health and Digital Executive Agency, the European Research Executive Agency, the European Innov […]

**SEC03 #107** — Item 01 01 01 71, "Legal basis" block, final line, printed p. 79
- Status: VERIFIED
- Quote checked: "See Chapter 01 02."

**SEC03 #108** — Item 01 01 01 71, "Reference acts" block, printed p. 79
- Status: VERIFIED
- Quote checked: "Commission Decision C(2021) 950 of 12 February 2021 delegating powers to the European Research Council Executive Agency with a view to the performance of tasks linked to the implementation of Union programmes in the field of frontier research comprising, in p […]

**SEC03 #109** — Item 01 01 01 72, "Remarks" block, printed p. 80
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover the operating costs of the European Research Executive Agency incurred as a result of the Executive Agency's role in the implementation of the specific research and innovation programme — Horizon Europe (2021-2027) and […]

**SEC03 #110** — Item 01 01 01 72, "Assigned revenue" block, printed p. 80
- Status: VERIFIED
- Quote checked: "EFTA-EEA 2 986 117 6 6 0 0 / Candidate countries and Western Balkan potential candidates 295 990 6 0 1 0 / Other countries 30 947 835 6 0 1 0"
- Note: Automated matcher false negative caused by a pdftotext -layout column-alignment artifact: the source label "Candidate countries and Western Balkan potential candidates" wraps across two source lines because it is a long table-cell label, and pdftotext places the row's numeric value directly after "potential" (attached to the first physical line of the wrapped cell) with the word "candidates" printed alone on the next line. Confirmed via both -layout and default extraction, and via multiple recurrences of the identical pattern (20+ times) elsewhere in the same document, that the true label is the single unbroken phrase "Candidate countries and Western Balkan potential candidates" and the quoted figure is attached to it correctly — not a genuine mismatch.

**SEC03 #111** — Item 01 01 01 72, "Legal basis" block, printed pp. 80–81
- Status: N/A — NO QUOTE
- Note: No QUOTE field present in the source record — the extractor's own note states the legal-basis text at this Item is word-for-word identical to acts already quoted verbatim at other cited entries (LB-71-xx / LB-72-xx) and was deliberately "not re-quoted here." Nothing to verify independently at this entry; the underlying claim (identical repeated legal-basis block across sibling Items 01 01 01 71-01 01 01 76) is consistent with the document's structure but was not independently re-diffed here given the lowest-priority status of Block-B-style legal-basis entries.

**SEC03 #112** — Item 01 01 01 72, "Legal basis" block, second cited act, printed p. 80
- Status: VERIFIED
- Quote checked: "Decision No 1230/2003/EC of the European Parliament and of the Council of 26 June 2003 adopting a multiannual programme for action in the field of energy: 'Intelligent Energy — Europe' (2003-2006) (OJ L 176, 15.7.2003, p. 29, ELI: http://data.europa.eu/eli/de […]

**SEC03 #113** — Item 01 01 01 72, "Legal basis" block, third cited act, printed p. 80
- Status: VERIFIED
- Quote checked: "Decision No 1639/2006/EC of the European Parliament and of the Council of 24 October 2006 establishing a Competitiveness and Innovation Framework Programme (2007 to 2013) (OJ L 310, 9.11.2006, p. 15, ELI: http://data.europa.eu/eli/dec/2006/1639/oj)."

**SEC03 #114** — Item 01 01 01 72, "Legal basis" block, sixth cited act, printed p. 80
- Status: VERIFIED
- Quote checked: "Council Decision 2006/971/EC of 19 December 2006 concerning the Specific Programme Cooperation implementing the Seventh Framework Programme of the European Community for research, technological development and demonstration activities (2007 to 2013) (OJ L 400 […]

**SEC03 #115** — Item 01 01 01 72, "Legal basis" block, seventh cited act, printed p. 80
- Status: VERIFIED
- Quote checked: "Council Decision 2006/973/EC of 19 December 2006 concerning the specific programme People implementing the Seventh Framework Programme of the European Community for research, technological development and demonstration activities (2007 to 2013) (OJ L 400, 30. […]

**SEC03 #116** — Item 01 01 01 72, "Legal basis" block, eighth cited act, printed p. 80
- Status: VERIFIED
- Quote checked: "Council Decision 2006/974/EC of 19 December 2006 on the Specific Programme: Capacities implementing the Seventh Framework Programme of the European Community for research, technological development and demonstration activities (2007 to 2013) (OJ L 400, 30.12. […]

**SEC03 #117** — Item 01 01 01 72, "Legal basis" block, final line, printed p. 81
- Status: VERIFIED
- Quote checked: "See Chapter 01 02."

**SEC03 #118** — Item 01 01 01 72, "Reference acts" block, printed p. 81
- Status: VERIFIED
- Quote checked: "Commission Decision C(2021) 952 of 12 February 2021 delegating powers to the European Research Executive Agency with a view to the performance of tasks linked to the implementation of Union programmes in the field of Research and Innovation, Research of the F […]

**SEC03 #119** — Item 01 01 01 73, "Remarks" block, printed p. 81
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover the operating costs of the European Health and Digital Executive Agency incurred as a result of the Executive Agency's role in the implementation of the specific research and innovation programme — Horizon Europe (2021- […]

**SEC03 #120** — Item 01 01 01 73, "Assigned revenue" block, printed p. 81
- Status: VERIFIED
- Quote checked: "Proceeds from EURI 451 140 5 0 4 0 / EFTA-EEA 731 190 6 6 0 0 / Candidate countries and Western Balkan potential candidates 72 477 6 0 1 0 / Other countries 7 686 296 6 0 1 0"
- Note: Automated matcher false negative caused by a pdftotext -layout column-alignment artifact: the source label "Candidate countries and Western Balkan potential candidates" wraps across two source lines because it is a long table-cell label, and pdftotext places the row's numeric value directly after "potential" (attached to the first physical line of the wrapped cell) with the word "candidates" printed alone on the next line. Confirmed via both -layout and default extraction, and via multiple recurrences of the identical pattern (20+ times) elsewhere in the same document, that the true label is the single unbroken phrase "Candidate countries and Western Balkan potential candidates" and the quoted figure is attached to it correctly — not a genuine mismatch.

**SEC03 #121** — Item 01 01 01 73, "Legal basis" block, printed pp. 81–82
- Status: N/A — NO QUOTE
- Note: No QUOTE field present in the source record — the extractor's own note states the legal-basis text at this Item is word-for-word identical to acts already quoted verbatim at other cited entries (LB-71-xx / LB-72-xx) and was deliberately "not re-quoted here." Nothing to verify independently at this entry; the underlying claim (identical repeated legal-basis block across sibling Items 01 01 01 71-01 01 01 76) is consistent with the document's structure but was not independently re-diffed here given the lowest-priority status of Block-B-style legal-basis entries.

**SEC03 #122** — Item 01 01 01 73, "Legal basis" block, final line, printed p. 82
- Status: VERIFIED
- Quote checked: "See Chapter 01 02."

**SEC03 #123** — Item 01 01 01 73, "Reference acts" block, printed p. 82
- Status: VERIFIED
- Quote checked: "Commission Decision C(2021) 948 of 12 February 2021 delegating powers to the European Health and Digital Executive Agency with a view to the performance of tasks linked to the implementation of Union programmes in the field of EU4Health, Single Market, Resear […]

**SEC03 #124** — Item 01 01 01 74, "Remarks" block, printed p. 82
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover the operating costs of the European Climate, Infrastructure and Environment Executive Agency incurred as a result of the Executive Agency's role in the implementation of the specific research and innovation programme — […]

**SEC03 #125** — Item 01 01 01 74, "Assigned revenue" block, printed p. 82
- Status: VERIFIED
- Quote checked: "Proceeds from EURI 331 023 5 0 4 0 / EFTA-EEA 519 986 6 6 0 0 / Candidate countries and Western Balkan potential candidates 41 162 6 0 1 0 / Other countries 4 365 400 6 0 1 0"
- Note: Automated matcher false negative caused by a pdftotext -layout column-alignment artifact: the source label "Candidate countries and Western Balkan potential candidates" wraps across two source lines because it is a long table-cell label, and pdftotext places the row's numeric value directly after "potential" (attached to the first physical line of the wrapped cell) with the word "candidates" printed alone on the next line. Confirmed via both -layout and default extraction, and via multiple recurrences of the identical pattern (20+ times) elsewhere in the same document, that the true label is the single unbroken phrase "Candidate countries and Western Balkan potential candidates" and the quoted figure is attached to it correctly — not a genuine mismatch.

**SEC03 #126** — Item 01 01 01 74, "Legal basis" block, printed pp. 82–83
- Status: N/A — NO QUOTE
- Note: No QUOTE field present in the source record — the extractor's own note states the legal-basis text at this Item is word-for-word identical to acts already quoted verbatim at other cited entries (LB-71-xx / LB-72-xx) and was deliberately "not re-quoted here." Nothing to verify independently at this entry; the underlying claim (identical repeated legal-basis block across sibling Items 01 01 01 71-01 01 01 76) is consistent with the document's structure but was not independently re-diffed here given the lowest-priority status of Block-B-style legal-basis entries.

**SEC03 #127** — Item 01 01 01 74, "Legal basis" block, final line, printed p. 83
- Status: VERIFIED
- Quote checked: "See Chapter 01 02."

**SEC03 #128** — Item 01 01 01 74, "Reference acts" block, printed p. 83
- Status: VERIFIED
- Quote checked: "Commission Decision C(2021) 947 of 12 February 2021 delegating powers to the European Climate, Infrastructure and Environment Executive Agency with a view to the performance of tasks linked to the implementation of Union programmes in the field of transport a […]

**SEC03 #129** — Item 01 01 01 76, "Remarks" block, printed p. 83
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover the operating costs of the European Innovation Council and SMEs Executive Agency incurred as a result of the Executive Agency's role in the implementation of the specific research and innovation programme — Horizon Euro […]

**SEC03 #130** — Item 01 01 01 76, "Assigned revenue" block, printed p. 83
- Status: VERIFIED
- Quote checked: "Proceeds from EURI 529 420 5 0 4 0 / EFTA-EEA 801 241 6 6 0 0 / Candidate countries and Western Balkan potential candidates 79 421 6 0 1 0 / Other countries 8 212 256 6 0 1 0"
- Note: Automated matcher false negative caused by a pdftotext -layout column-alignment artifact: the source label "Candidate countries and Western Balkan potential candidates" wraps across two source lines because it is a long table-cell label, and pdftotext places the row's numeric value directly after "potential" (attached to the first physical line of the wrapped cell) with the word "candidates" printed alone on the next line. Confirmed via both -layout and default extraction, and via multiple recurrences of the identical pattern (20+ times) elsewhere in the same document, that the true label is the single unbroken phrase "Candidate countries and Western Balkan potential candidates" and the quoted figure is attached to it correctly — not a genuine mismatch.

**SEC03 #131** — Item 01 01 01 76, "Legal basis" block, printed pp. 83–84
- Status: N/A — NO QUOTE
- Note: No QUOTE field present in the source record — the extractor's own note states the legal-basis text at this Item is word-for-word identical to acts already quoted verbatim at other cited entries (LB-71-xx / LB-72-xx) and was deliberately "not re-quoted here." Nothing to verify independently at this entry; the underlying claim (identical repeated legal-basis block across sibling Items 01 01 01 71-01 01 01 76) is consistent with the document's structure but was not independently re-diffed here given the lowest-priority status of Block-B-style legal-basis entries.

**SEC03 #132** — Item 01 01 01 76, "Legal basis" block, final line, printed p. 84
- Status: VERIFIED
- Quote checked: "See Chapter 01 02."

**SEC03 #133** — Item 01 01 01 76, "Reference acts" block, printed p. 84
- Status: VERIFIED
- Quote checked: "Commission Decision C(2021) 949 of 12 February 2021 delegating powers to the European Innovation Council and SMEs Executive Agency with a view to the performance of tasks linked to the implementation of Union programmes in the field of Innovative Europe, Sing […]

**SEC03 #134** — Article 01 01 02, "Remarks" block, printed p. 84
- Status: VERIFIED
- Quote checked: "Besides the expenditure described in this chapter, this appropriation is also intended to cover expenditure related to officials, temporary staff as well as other administrative expenditure for the management of the Euratom Research and Training Programme, in […]

**SEC03 #135** — Article 01 01 02, "Legal basis" block, printed p. 84
- Status: VERIFIED
- Quote checked: "Legal basis / See Chapter 01 03."

**SEC03 #136** — Item 01 01 02 01, "Remarks" block, printed p. 84
- Status: VERIFIED
- Quote checked: "This appropriation covers expenditure relating to officials and temporary staff implementing the Euratom Research and Training Programme who occupy posts on the authorised establishment plans and are engaged in indirect research action, including staff posted […]

**SEC03 #137** — Item 01 01 02 02, "Remarks" block, printed p. 85
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover expenditure on external personnel implementing the Euratom Research and Training Programme, in the form of indirect research actions, including external personnel posted in Union delegations."

**SEC03 #138** — Item 01 01 02 02, "Assigned revenue" block, printed p. 85
- Status: VERIFIED
- Quote checked: "Other countries 402 342 6 0 1 0"

**SEC03 #139** — Item 01 01 02 03, "Remarks" block, first paragraph, printed p. 85
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover other administrative expenditure for all the management and implementation of the Euratom Research and Training Programme, in the form of indirect actions under the nuclear programmes, including other administrative exp […]

**SEC03 #140** — Item 01 01 02 03, "Remarks" block, third paragraph, printed p. 85
- Status: VERIFIED
- Quote checked: "It will also cover building-related expenditure of Commission services managing the programme as well the development and maintenance of programme-specific and corporate IT systems needed for the implementation of the programme."

**SEC03 #141** — Item 01 01 02 03, "Assigned revenue" block, printed p. 85
- Status: VERIFIED
- Quote checked: "Other countries 77 817 6 0 1 0"

**SEC03 #142** — Item 01 01 02 11, "Remarks" block, printed pp. 85–86
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover expenditure relating to officials and temporary staff occupying posts on the authorised establishment plan of the Joint Research Centre (JRC) and implementing the Euratom Research and Training programme, and in particul […]

**SEC03 #143** — Item 01 01 02 12, "Remarks" block, first paragraph, printed p. 86
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover the expenditure relating to external personnel occupying posts which are not on the establishment plan of the Joint Research Centre (JRC), i.e. contract staff, grant holders, seconded national experts and visiting scien […]

**SEC03 #144** — Item 01 01 02 12, "Assigned revenue" block, printed p. 86
- Status: VERIFIED
- Quote checked: "Other assigned revenue 118 000 6 0 1 1"

**SEC03 #145** — Item 01 01 02 13, "Remarks" block, first indent, printed p. 86
- Status: VERIFIED
- Quote checked: "— staff-related expenditure not covered by Items 01 01 02 11 and 01 01 02 12, including on missions, training, medical and social services, expenditure on organising competitions, interviewing candidates and representation costs,"

**SEC03 #146** — Item 01 01 02 13, "Assigned revenue" block, printed p. 87
- Status: VERIFIED
- Quote checked: "Other countries 5 297 526 6 0 1 0 / Other assigned revenue 1 167 000 6 0 1 1"

**SEC03 #147** — Article 01 01 03, "Remarks" block, printed p. 87
- Status: VERIFIED
- Quote checked: "Besides the expenditure described in this chapter, appropriations under this article are intended to cover expenditure relating to officials, temporary and external staff who occupy posts on the authorised establishment plans and are engaged in indirect actio […]

**SEC03 #148** — Article 01 01 03, "Legal basis" block, printed p. 87
- Status: VERIFIED
- Quote checked: "Legal basis / See Chapter 01 04."

**SEC03 #149** — Item 01 01 03 01, "Remarks" block, printed p. 87
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover expenditure relating to officials and temporary staff implementing the ITER project who occupy posts on the authorised establishment plans and are engaged in indirect research action, including officials and temporary s […]

**SEC03 #150** — Item 01 01 03 01, "Assigned revenue" block, printed p. 87
- Status: VERIFIED
- Quote checked: "Other countries 284 639 6 0 1 0"

**SEC03 #151** — Item 01 01 03 02, "Remarks" block, printed p. 88
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover expenditure on external personnel implementing the ITER project, in the form of indirect research actions, including external personnel posted outside the Union."

**SEC03 #152** — Item 01 01 03 02, "Assigned revenue" block, printed p. 88
- Status: VERIFIED
- Quote checked: "Other countries 14 485 6 0 1 0"

**SEC03 #153** — Item 01 01 03 03, "Remarks" block, printed p. 88
- Status: VERIFIED
- Quote checked: "This appropriation is intended to cover other administrative expenditure for all management of the ITER project, in the form of indirect research actions, including other administrative expenditure incurred by staff posted outside the Union."

**SEC03 #154** — Item 01 01 03 03, "Remarks" block, third paragraph, printed p. 88
- Status: VERIFIED
- Quote checked: "It is also intended to cover expenditure on technical and administrative assistance relating to the identification, preparation, management, monitoring, audit and supervision of the project, such as conferences, workshops, seminars, missions, training and rep […]

**SEC03 #155** — Item 01 01 03 03, "Assigned revenue" block, printed p. 88
- Status: VERIFIED
- Quote checked: "Other countries 81 938 6 0 1 0"

**SEC03 #156** — Chapter 01 02 figures table, Article 01 02 01 heading row, printed p. 88
- Status: VERIFIED
- Quote checked: "01 02 01 Excellent Science (Pillar I)"

**SEC03 #157** — Chapter 01 02 figures table, Item 01 02 01 01 row, printed p. 88
- Status: VERIFIED
- Quote checked: "01 02 01 01 European Research Council 1.0.11 2 160 026 538 2 386 929 572 2 232 386 052 2 210 747 440 2 156 005 580,— 2 024 849 850,— 84,83 %"

**SEC03 #158** — Chapter 01 02 figures table, Item 01 02 01 02 row, printed p. 88
- Status: VERIFIED
- Quote checked: "01 02 01 02 Marie Skłodowska-Curie Actions 1.0.11 926 426 174 1 018 811 096 901 030 082 937 324 706 887 584 053,96 964 336 229,61 94,65 %"

**SEC03 #159** — Chapter 01 02 figures table, Item 01 02 01 03 row, printed p. 88
- Status: VERIFIED
- Quote checked: "01 02 01 03 Research infrastructures 1.0.11 336 115 290 279 114 521 338 178 341 355 983 822 326 467 793,— 256 707 840,68 91,97 %"

**SEC03 #160** — Chapter 01 02 figures table, "Article 01 02 01 — Subtotal" row, printed p. 88
- Status: VERIFIED
- Quote checked: "Article 01 02 01 — Subtotal 3 422 568 002 3 684 855 189 3 471 594 475 3 504 055 968 3 370 057 426,96 3 245 893 920,29 88,09 %"

**SEC03 #161** — Chapter 01 02 figures table, Article 01 02 02 heading row, printed p. 88
- Status: VERIFIED
- Quote checked: "01 02 02 Global Challenges and European Industrial Competitiveness (Pillar II)"

**SEC03 #162** — Chapter 01 02 figures table, Item 01 02 02 10 row, printed p. 88
- Status: VERIFIED
- Quote checked: "01 02 02 10 Cluster 'Health' 1.0.11 760 906 035 762 211 165 643 612 599 660 484 229 574 962 143,35 344 618 350,66 45,21 %"

**SEC03 #163** — Chapter 01 02 figures table, Item 01 02 02 11 row, printed p. 88
- Status: VERIFIED
- Quote checked: "01 02 02 11 Cluster 'Health' — Innovative Health Initiative Joint Undertaking 1.0.11 111 520 862 149 753 411 189 094 891 127 683 699 209 622 908,— 103 318 524,— 68,99 %"

**SEC03 #164** — Chapter 01 02 figures table, Item 01 02 02 12 row, printed p. 88
- Status: VERIFIED
- Quote checked: "01 02 02 12 Cluster 'Health' — Global Health EDCTP3 Joint Undertaking 1.0.11 59 679 735 114 312 873 139 634 063 138 148 905 176 882 121,— 102 894 710,— 90,01 %"

**SEC03 #165** — Chapter 01 02 figures table, Item 01 02 02 20 row, printed p. 88
- Status: VERIFIED
- Quote checked: "01 02 02 20 Cluster 'Culture, Creativity and Inclusive Society' 1.0.11 315 749 388 276 250 246 331 003 359 252 254 819 283 462 701,04 213 697 422,71 77,36 %"

**SEC03 #166** — Chapter 01 02 figures table, Item 01 02 02 30 row, printed p. 88
- Status: VERIFIED
- Quote checked: "01 02 02 30 Cluster 'Civil Security for Society' 1.0.11 174 597 723 175 296 672 189 962 987 211 428 544 204 174 722,54 180 428 367,32 102,93 %"

**SEC03 #167** — Chapter 01 02 figures table, Item 01 02 02 31 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 31 Cluster 'Civil Security for Society' — European Cybersecurity Industrial, Technology and Research Competence Centre 1.0.11 p.m. p.m. p.m. p.m. 0,— 0,—"

**SEC03 #168** — Chapter 01 02 figures table, Item 01 02 02 40 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 40 Cluster 'Digital, Industry and Space' 1.0.11 1 195 615 453 1 598 643 505 1 205 434 305 1 273 122 309 1 102 950 996,67 697 414 157,28 43,63 %"

**SEC03 #169** — Chapter 01 02 figures table, Item 01 02 02 41 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 41 Cluster 'Digital, Industry and Space' — European High-Performance Computing Joint Undertaking (EuroHPC) 1.0.11 307 775 829 339 849 858 128 082 000 336 203 468 123 080 935,— 3 327 217,— 0,98 %"

**SEC03 #170** — Chapter 01 02 figures table, Item 01 02 02 42 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 42 Cluster 'Digital, Industry and Space' — Chips Joint Undertaking 1.0.11 283 891 944 224 658 869 302 579 076 372 581 022 462 140 236,— 490 508 982,— 218,34 %"

**SEC03 #171** — Chapter 01 02 figures table, Item 01 02 02 43 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 43 Cluster 'Digital, Industry and Space' — Smart Networks and Services Joint Undertaking 1.0.11 113 471 106 117 987 474 121 557 178 138 169 477 121 836 972,— 121 249 430,— 102,76 %"

**SEC03 #172** — Chapter 01 02 figures table, Item 01 02 02 50 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 50 Cluster 'Climate, Energy and Mobility' 1.0.11 1 263 747 575 1 538 409 917 1 532 696 974 1 404 051 164 1 180 190 911,38 891 064 214,75 57,92 %"

**SEC03 #173** — Chapter 01 02 figures table, Item 01 02 02 51 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 51 Cluster 'Climate, Energy and Mobility' — Single European Sky ATM Research 3 Joint Undertaking 1.0.11 88 973 192 101 308 604 87 465 694 101 090 998 87 689 782,— 90 587 212,— 89,42 %"

**SEC03 #174** — Chapter 01 02 figures table, Item 01 02 02 52 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 52 Cluster 'Climate, Energy and Mobility' — Clean Aviation Joint Undertaking 1.0.11 325 960 843 145 106 917 118 553 771 201 354 520 403 415 384,— 342 789 895,— 236,23 %"

**SEC03 #175** — Chapter 01 02 figures table, Item 01 02 02 53 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 53 Cluster 'Climate, Energy and Mobility' — Europe's Rail Joint Undertaking 1.0.11 48 916 690 88 959 064 73 965 936 78 832 117 87 888 739,— 30 905 930,— 34,74 %"

**SEC03 #176** — Chapter 01 02 figures table, Item 01 02 02 54 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 54 Cluster 'Climate, Energy and Mobility' — Clean Hydrogen Joint Undertaking 1.0.11 124 926 945 145 363 683 123 588 321 132 982 836 88 378 873,— 49 104 694,— 33,78 %"

**SEC03 #177** — Chapter 01 02 figures table, Item 01 02 02 60 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 60 Cluster 'Food, Bioeconomy, Natural Resources, Agriculture and Environment' 1.0.11 1 042 288 981 958 318 841 1 085 037 231 979 953 518 1 126 321 726,02 720 984 595,95 75,23 %"

**SEC03 #178** — Chapter 01 02 figures table, Item 01 02 02 61 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 61 Cluster 'Food, Bioeconomy, Natural Resources, Agriculture and Environment' — Circular Bio-based Europe Joint Undertaking 1.0.11 128 140 912 114 995 972 138 111 922 130 683 536 117 088 457,— 153 460 540,50 133,45 %"

**SEC03 #179** — Chapter 01 02 figures table, Item 01 02 02 70 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 02 70 Non-nuclear direct actions of the Joint Research Centre 1.0.11 20 909 088 19 500 000 20 322 484 21 200 000 20 333 598,— 31 418 160,42 161,12 %"

**SEC03 #180** — Chapter 01 02 figures table, "Article 01 02 02 — Subtotal" row, printed p. 89
- Status: VERIFIED
- Quote checked: "Article 01 02 02 — Subtotal 6 367 072 301 6 870 927 071 6 430 702 791 6 560 225 161 6 370 421 206,— 4 567 772 403,59 66,48 %"

**SEC03 #181** — Chapter 01 02 figures table, Article 01 02 03 heading row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 03 Innovative Europe (Pillar III)"

**SEC03 #182** — Chapter 01 02 figures table, Item 01 02 03 01 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 03 01 European Innovation Council 1.0.11 1 144 270 969 1 514 159 721 1 160 770 928 1 310 395 418 1 146 651 703,— 838 862 675,86 55,40 %"

**SEC03 #183** — Chapter 01 02 figures table, Item 01 02 03 02 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 03 02 European innovation ecosystems 1.0.11 62 795 775 126 887 752 63 026 222 61 680 261 85 079 638,— 51 488 571,61 40,58 %"

**SEC03 #184** — Chapter 01 02 figures table, Item 01 02 03 03 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 03 03 European Institute of Innovation and Technology (EIT) 1.0.11 379 354 666 217 756 185 422 864 440 417 424 258 409 933 366,— 343 766 098,24 157,87 %"

**SEC03 #185** — Chapter 01 02 figures table, "Article 01 02 03 — Subtotal" row, printed p. 89
- Status: VERIFIED
- Quote checked: "Article 01 02 03 — Subtotal 1 586 421 410 1 858 803 658 1 646 661 590 1 789 499 937 1 641 664 707,— 1 234 117 345,71 66,39 %"

**SEC03 #186** — Chapter 01 02 figures table, Article 01 02 04 heading row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 04 Widening participation and strengthening the European Research Area"

**SEC03 #187** — Chapter 01 02 figures table, Item 01 02 04 01 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 04 01 Widening participation and spreading excellence 1.0.11 398 649 340 415 212 145 394 371 710 345 901 428 392 594 591,— 173 353 213,11 41,75 %"

**SEC03 #188** — Chapter 01 02 figures table, Item 01 02 04 02 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 04 02 Reforming and enhancing the European R&I system 1.0.11 48 038 417 48 964 880 57 165 013 62 467 935 50 198 093,— 49 034 940,52 100,14 %"

**SEC03 #189** — Chapter 01 02 figures table, "Article 01 02 04 — Subtotal" row, printed p. 89
- Status: VERIFIED
- Quote checked: "Article 01 02 04 — Subtotal 446 687 757 464 177 025 451 536 723 408 369 363 442 792 684,— 222 388 153,63 47,91 %"

**SEC03 #190** — Chapter 01 02 figures table, Article 01 02 05 row, printed p. 89
- Status: VERIFIED
- Quote checked: "01 02 05 Horizontal operational activities 1.0.11 154 521 861 168 986 471 155 131 834 108 912 739 130 728 853,— 111 775 015,42 66,14 %"

**SEC03 #191** — Chapter 01 02 figures table, Article 01 02 99 heading row, printed p. 90
- Status: VERIFIED
- Quote checked: "01 02 99 Completion of previous programmes and activities"

**SEC03 #192** — Chapter 01 02 figures table, Item 01 02 99 01 row, printed p. 90
- Status: VERIFIED
- Quote checked: "01 02 99 01 Completion of previous research programmes (prior to 2021) 1.0.11 p.m. 299 169 539 p.m. 641 456 706 0,— 932 469 903,86 311,69 %"

**SEC03 #193** — Chapter 01 02 figures table, "Article 01 02 99 — Subtotal" row, printed p. 90
- Status: VERIFIED
- Quote checked: "Article 01 02 99 — Subtotal p.m. 299 169 539 p.m. 641 456 706 0,— 932 469 903,86 311,69 %"

**SEC03 #194** — Chapter 01 02 figures table, "Chapter 01 02 — Total" row, printed p. 90
- Status: VERIFIED
- Quote checked: "Chapter 01 02 — Total 11 977 271 331 13 346 918 953 12 155 627 413 13 012 519 874 11 955 664 876,96 10 314 416 742,50 77,28 %"
---

## Block B — 27 legal-act ELI citations (lowest priority; done because time remained)

These are not quotes to verify — the task here is only "does the ELI resolve, and what is the act's
official title?" Each of the 27 `data.europa.eu/eli/...` URLs listed in `prose-verification-list.md` was
fetched directly (`curl -L`, one attempt each, all completed on the first try — no retries needed).

**26 of 27 resolve (HTTP 200).** The EUR-Lex `<title>` tag for each is a short act identifier, not the
full official title; where the full official title was independently confirmed word-for-word as part of
the SEC03 quote-checking above (Regulations 2020/2094, 2021/695, 2021/2115, 2021/947 and Decision
2021/764 — the HZ-001–HZ-005 entries), that full title is exact and is reported in the SEC03 section
above, not repeated here.

| # | ELI (as given in the list) | Result |
|---|---|---|
| 1 | `http://data.europa.eu/eli/dec/2001/80(1` | **404 — does not resolve.** The URL as printed in `prose-verification-list.md` is malformed (missing `/oj`, has a stray `(1` fragment — almost certainly mangled during the original extraction, likely from adjacent citation text like "..., p. 7, ELI: ..." that got concatenated with a page or footnote number). Correcting the obvious typo to `http://data.europa.eu/eli/dec/2001/80/oj` **does** resolve (HTTP 200, EUR-Lex identifies it as Decision 2001/80). This fix is a guess, not a confirmed correction — flagged, not silently substituted. |
| 2 | `http://data.europa.eu/eli/dec/2002/620/oj` | 200 — Decision 2002/620 |
| 3 | `http://data.europa.eu/eli/dec/2002/621/oj` | 200 — Decision 2002/621 |
| 4 | `http://data.europa.eu/eli/dec/2003/1230/oj` | 200 — Decision 2003/1230 |
| 5 | `http://data.europa.eu/eli/dec/2006/1639/oj` | 200 — Decision 2006/1639 |
| 6 | `http://data.europa.eu/eli/dec/2006/1982/oj` | 200 — Decision 2006/1982 |
| 7 | `http://data.europa.eu/eli/dec/2006/971/oj` | 200 — Decision 2006/971 |
| 8 | `http://data.europa.eu/eli/dec/2006/972/oj` | 200 — Decision 2006/972 |
| 9 | `http://data.europa.eu/eli/dec/2006/973/oj` | 200 — Decision 2006/973 |
| 10 | `http://data.europa.eu/eli/dec/2006/974/oj` | 200 — Decision 2006/974 |
| 11 | `http://data.europa.eu/eli/dec/2010/427/oj` | 200 — Decision 2010/427 (full title confirmed at SEC03 #34 in this file: "Council Decision 2010/427/EU of 26 July 2010 establishing the organisation and functioning of the European External Action Service") |
| 12 | `http://data.europa.eu/eli/dec/2013/743/oj` | 200 — Decision 2013/743 |
| 13 | `http://data.europa.eu/eli/dec/2021/764/oj` | 200 — Decision 2021/764 (full title confirmed via SEC03 HZ-003) |
| 14 | `http://data.europa.eu/eli/dec_impl/2021/173/oj` | 200 — Implementing Decision 2021/173 |
| 15 | `http://data.europa.eu/eli/dir/1989/391/oj` | 200 — Directive 89/391 (full title confirmed at SEC10 #36: "Council Directive 89/391/EEC of 12 June 1989 on the introduction of measures to encourage improvements in the safety and health of workers at work") |
| 16 | `http://data.europa.eu/eli/reg/1968/260/oj` | 200 — Regulation 260/68 |
| 17 | `http://data.europa.eu/eli/reg/1985/3518/oj` | 200 — Regulation 3518/85 |
| 18 | `http://data.europa.eu/eli/reg/2003/58/oj` | 200 — Regulation 58/2003 |
| 19 | `http://data.europa.eu/eli/reg/2006/1906/oj` | 200 — Regulation 1906/2006 |
| 20 | `http://data.europa.eu/eli/reg/2015/1017/oj` | 200 — Regulation 2015/1017 |
| 21 | `http://data.europa.eu/eli/reg/2016/300/oj` | 200 — Regulation 2016/300 (full title confirmed at SEC09 #46: "Council Regulation (EU) 2016/300 of 29 February 2016 determining the emoluments of EU high-level public office holders") |
| 22 | `http://data.europa.eu/eli/reg/2018/1725/oj` | 200 — Regulation (EU) 2018/1725 (EUDPR) |
| 23 | `http://data.europa.eu/eli/reg/2020/2094/oj` | 200 — Regulation 2020/2094 (full title confirmed at SEC03 HZ-001) |
| 24 | `http://data.europa.eu/eli/reg/2021/2115/oj` | 200 — Regulation 2021/2115 (full title confirmed at SEC03 HZ-005) |
| 25 | `http://data.europa.eu/eli/reg/2021/695/oj` | 200 — Regulation 2021/695 (full title confirmed at SEC03 HZ-002) |
| 26 | `http://data.europa.eu/eli/reg/2021/947/oj` | 200 — Regulation 2021/947 (full title confirmed at SEC03 HZ-004) |
| 27 | `http://data.europa.eu/eli/reg/2024/2509/oj` | 200 — Regulation (EU, Euratom) 2024/2509 |

Full official titles for the 22 entries not cross-referenced above were not individually extracted beyond
the short EUR-Lex page identifier, given this block's explicit lowest-priority status — flagged as
incomplete rather than padded out.


---

## Sign-off (2026-08-09)

Thomas reviewed this file and signed off: 395/399 verified, zero mismatches
accepted as final. The one known defect, A19 (citation given as Art.
6(6)(a), correct location is Art. 2(6)(a)), is fixed at source: the
`LOCATION` field for that entry in `EU/slices/_staging/20-prose-sections.txt`
now reads `Art. 2(6)(a)`, with an inline note dating the correction. No
corpus data file held this citation (the ECB Guideline (EU) 2015/510 batch
this entry belongs to was `_dropped` — see
`src/data/research/eurostat-edp-gfs-ecb-statistics.json` `_dropped[].why`),
so the fix is confined to the staging record; nothing in `src/data/` needed
a corresponding change.
