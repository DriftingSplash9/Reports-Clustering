# EU prose-section — external verification list

Generated 2026-08-07 from `EU/slices/_staging/20-prose-sections.txt` (the part of
`EU Meta jsons.docx` that no script could parse). **399 Part A entries** were
recovered from it. This file lists everything in them that an outside reader can
check, and states plainly what cannot be checked that way.

## What I need back, and the one rule that makes it useful

For each numbered item below: **open the URL, find the cited location, and return
the surrounding text verbatim** — roughly 40 words either side of the quoted
passage. Then say whether the quote as given appears in it, word for word.

Three things that make an answer worthless, so please avoid them:

- **Do not reconstruct the quote from memory or from a summary of the document.**
  This project has already caught a research assistant assembling a plausible
  citation out of individually-true parts. A quote whose components all check out
  is not a quote that checks out.
- **Do not tidy.** If the source says "Article 17(1)" where the item below says
  "Art. 17(1)", report the difference rather than matching them up.
- **NOT FOUND is a good answer** — it is used, and it is recorded. If the article
  number has moved, been renumbered by a later amendment, or the passage is not
  there, say so and say what *is* at that location.

If the consolidated text is unreachable, say which URL failed and how (status
code, redirect target) rather than substituting a different version — the
consolidated version in force on 16 June 2025 is the one these entries were taken
from, and an earlier or later consolidation is a different document.

---

## Block A — ECB General Documentation Guideline (23 entries, all one document)

**Document**: Guideline (EU) 2015/510 of the European Central Bank of 19 December
2014 on the implementation of the Eurosystem monetary policy framework (General
Documentation Guideline) (ECB/2014/60) (recast) — **consolidated text, version in
force 16.06.2025**, CELEX 02014O0060-20250616.

**URL**: <https://eur-lex.europa.eu/eli/guideline/2015/510/2025-06-16/eng>

Every one of the 23 entries below cites this single URL. That is the whole of the
URL problem in this file — see Block C for why the rest cannot be done this way.

**A1. Art. 3(1)(b)**

> "The tools used by the Eurosystem in the implementation of monetary policy shall consist of: ... (b) standing facilities;"

*Names given*: AGENCY ONLY (names the tool category, not a titled publication)
*Tense recorded*: PRESENT
*Extractor's note*: Standing facilities named as one of three monetary-policy tools alongside open market operations (a) and minimum reserve requirements (c) — see entry 9.

**A2. Art. 17(1)-(2)**

> "The NCBs shall grant access to the standing facilities offered by the Eurosystem at their counterparties' initiative." / "Standing facilities shall consist of the following categories: (a) the marginal lending facility; (b) the deposit facility."

*Names given*: AGENCY ONLY
*Tense recorded*: PRESENT
*Extractor's note*: Structural definition, not a dependency claim.

**A3. Art. 17(6)**

> "The ECB's Governing Council shall decide on the interest rates for the standing facilities on a regular basis. The revised interest rates shall become effective from the beginning of the new reserve maintenance period, as defined in Article 8 of Regulation (EU) 2021/378 (ECB/2021/1)."

*Names given*: Regulation (EU) 2021/378 (ECB/2021/1) — cited for the "reserve maintenance period" definition
*Tense recorded*: PRESENT
*Extractor's note*: A cross-reference to Regulation 2021/378 as a named source of a definition ("reserve maintenance period"). This is a methodology cross-reference, not a data-dependency; flagged for Part B as a candidate `cites` edge if Regulation 2021/378 is/becomes a node. 2. Marginal lending facility (Title II, Chapter 1)

**A4. Art. 18(1)-(4)**

> "Counterparties may use the marginal lending facility to obtain overnight liquidity from the Eurosystem through a reverse transaction with their home NCB at a pre-specified interest rate using eligible assets as collateral." ... "There shall be no limit on the amount of liquidity that may be provided under the marginal lending facility, subject to the requirement to provide adequate collateral under paragraph 4."

*Names given*: AGENCY ONLY
*Tense recorded*: PRESENT
*Extractor's note*: Core characteristics article.

**A5. Art. 19(1)-(2)**

> "Institutions fulfilling the eligibility criteria under Article 55 and which have access to an account with the NCB where the transaction can be settled, notably in TARGET, may access the marginal lending facility." / "Access to the marginal lending facility shall be granted only on TARGET business days with the exclusion of the days on which TARGET is not available at the end of the day due to a 'prolonged TARGET disruption over several business days' as referred to in Article 187a."

*Names given*: TARGET (defined Art. 2(91), see entry 15); Article 187a (Part Seven A — special TARGET-disruption provisions)
*Tense recorded*: PRESENT
*Extractor's note*: Direct dependency-style reference from Art. 19 to TARGET operability and to Art. 187a. Both are internal cross-references within the same instrument, not an inter-document edge.

**A6. Art. 19(5)**

> "Counterparties may access the marginal lending facility after making a request to their home NCB at the latest by 18:15 Central European Time (CET), the cut-off time for the use of standing facilities, pursuant to Appendix V to Annex I to Guideline (EU) 2022/912 (ECB/2022/8)."

*Names given*: Guideline (EU) 2022/912 (ECB/2022/8) — Appendix V to Annex I (TARGET Guideline)
*Tense recorded*: PRESENT
*Extractor's note*: Named cross-reference to a different ECB Guideline (the TARGET Guideline, 2022/912) for the operative cut-off time. Candidate edge if 2022/912 is opened as a node: 2015/510 methodology `cites`/`methodology_depends_on` 2022/912 Appendix V — not adjudicated here.

**A7. Art. 19(6)**

> "If at the end of a business day, the total balance on a counterparty's TARGET accounts with its home NCB after finalisation of the end-of-day control procedures is negative, this negative balance shall automatically be considered as a request for recourse ('automatic request') to the marginal lending facility."

*Names given*: AGENCY ONLY
*Tense recorded*: PRESENT

**A8. Art. 20(1)-(3)**

> "The maturity of credit extended under the marginal lending facility shall be overnight. The credit shall be repaid on the next day on which TARGET is open." / "The interest rate remunerating the marginal lending facility shall be announced in advance by the Eurosystem and shall be calculated as a simple interest rate based on the actual/360 day-count convention."

*Names given*: TARGET
*Tense recorded*: PRESENT 3. Deposit facility (Title II, Chapter 2)

**A9. Art. 21(1)-(4)**

> "Counterparties may use the deposit facility to make overnight deposits with the Eurosystem through the home NCB, to which a pre-specified interest rate shall be applied." ... "There shall be no limit on the amount a counterparty may deposit under the deposit facility."

*Names given*: AGENCY ONLY
*Tense recorded*: PRESENT

**A10. Art. 22(1)**

> "Institutions fulfilling the eligibility criteria under Article 55 and which have access to an account with the NCB where the transaction can be settled, notably in TARGET, may access the deposit facility. Access to the deposit facility shall be granted only on TARGET business days with the exclusion of the days on which TARGET is not available at the end of the day due to a prolonged TARGET disruption over several business days as referred to in Article 187a."

*Names given*: TARGET; Article 187a
*Tense recorded*: PRESENT

**A11. Art. 22(2)**

> "Counterparties may access the deposit facility after making a request to their home NCB at the latest by 18:15 Central European Time (CET), the cut-off time for the use of standing facilities, pursuant to Appendix V to Annex I to Guideline (EU) 2022/912 (ECB/2022/8)."

*Names given*: Guideline (EU) 2022/912 (ECB/2022/8) — Appendix V to Annex I
*Tense recorded*: PRESENT
*Extractor's note*: Same cross-reference pattern as Art. 19(5); same candidate-edge treatment applies.

**A12. Art. 23(1)-(3)**

> "The maturity of deposits under the deposit facility shall be overnight. Deposits held under the deposit facility shall mature on the next day on which TARGET is operational, at the time at which this system opens."

*Names given*: TARGET
*Tense recorded*: PRESENT 4. Minimum-reserve framework

**A13. Art. 3(2)**

> "The minimum reserve requirements are specified in Regulation (EC) No 2531/98 and Regulation (EU) 2021/378 (ECB/2021/1). Certain features of the minimum reserve requirements are illustrated in Annex I for information purposes."

*Names given*: Regulation (EC) No 2531/98; Regulation (EU) 2021/378 (ECB/2021/1); Annex I to this Guideline ("Minimum reserves")
*Tense recorded*: PRESENT
*Extractor's note*: This is the single clearest named-dependency statement for the minimum-reserve framework inside 2015/510: it explicitly points to two external Council/ECB legal instruments as the actual source of the requirement, and marks its own Annex I as "for information purposes" only (i.e., Annex I is not itself the authoritative source — a possible `redistributed`/documentary-only classification, not a fresh node). Annex I full text was NOT retrieved in this session (page content truncated before the Annexes) — see rolling edge-case list, item (a).

**A14. Art. 54(1)**

> "Pursuant to Article 3(1)(b) and (c) of Regulation (EU) 2021/378 (ECB/2021/1), a counterparty's settlement accounts with an NCB may be used as reserve accounts." ... "For the purposes of this Article, 'reserve accounts' shall have the same meaning as that in Regulation (EU) 2021/378 (ECB/2021/1)."

*Names given*: Regulation (EU) 2021/378 (ECB/2021/1)
*Tense recorded*: PRESENT

**A15. Art. 54(2)**

> "Reserve holdings that comply with minimum reserve requirements pursuant to Regulation (EC) No 2531/98 and Regulation (EU) 2021/378 (ECB/2021/1) shall be remunerated in accordance with Regulation (EU) 2021/378 (ECB/2021/1)."

*Names given*: Regulation (EC) No 2531/98; Regulation (EU) 2021/378 (ECB/2021/1)
*Tense recorded*: PRESENT

**A16. Art. 54(3)**

> "Reserve holdings that exceed the minimum reserves referred to in paragraph 2 shall be remunerated in accordance with Decision (EU) 2019/1743 of the European Central Bank (ECB/2019/31)."

*Names given*: Decision (EU) 2019/1743 (ECB/2019/31)
*Tense recorded*: PRESENT
*Extractor's note*: Named instrument for excess-reserve remuneration, distinct from the minimum-reserve remuneration regime in paragraph 2. New name not previously carried in this batch's node list.

**A17. Art. 55(a)**

> "they shall be subject to the Eurosystem's minimum reserve system pursuant to Article 19.1 of the Statute of the ESCB and shall not have been granted an exemption from their obligations under the Eurosystem's minimum reserve system pursuant to Regulation (EC) No 2531/98 and Regulation (EU) 2021/378 (ECB/2021/1);"

*Names given*: Statute of the ESCB (Art. 19.1); Regulation (EC) No 2531/98; Regulation (EU) 2021/378 (ECB/2021/1)
*Tense recorded*: PRESENT
*Extractor's note*: Counterparty-eligibility criterion tying monetary-policy-operation access to minimum-reserve-system membership. 5. TARGET / settlement provisions already referenced in opened Guidelines

**A18. Art. 2(91)**

> "'TARGET' means the new-generation Trans-European Automated Real-time Gross Settlement Express Transfer system, regulated under Guideline (EU) 2022/912 (ECB/2022/8);"

*Names given*: Guideline (EU) 2022/912 (ECB/2022/8)
*Tense recorded*: PRESENT
*Extractor's note*: This is the definitional anchor for every other TARGET cross-reference in this batch. Guideline 2022/912 is named repeatedly (Art. 2(91), 2(91a), 19(5), 22(2), 46) but has not itself been opened as a node under the current stop conditions — flagged in edge-case list.

**A19. Art. 6(6)(a)**

> "'business day' means: (a) in relation to an obligation to make a payment, any day on which TARGET is operational to effect such a payment;"

*Names given*: TARGET
*Tense recorded*: PRESENT

**A20. Art. 49(1)-(2)**

> "Payment orders relating to the participation in open market operations or use of the standing facilities shall be settled on the counterparties' accounts with an NCB or on the accounts of another credit institution participating in TARGET." / "Payment orders relating to the participation in open market liquidity-providing operations or use of the marginal lending facility shall only be settled after the final transfer of the eligible assets as collateral to the operation."

*Names given*: TARGET
*Tense recorded*: PRESENT

**A21. Art. 50(1)**

> "The Eurosystem shall endeavour to settle transactions related to its open market operations at the same time in all Member States whose currency is the euro with all counterparties that have provided sufficient eligible assets as collateral in accordance with the settlement procedures specified in Article 9 of Guideline (EU) 2024/3129 (ECB/2024/22)."

*Names given*: Guideline (EU) 2024/3129 (ECB/2024/22) — Art. 9
*Tense recorded*: PRESENT
*Extractor's note*: 2024/3129 is already an opened node per G.09 ("Full Part A extraction on ECB Guideline (EU) 2024/3129"). This is a direct, named methodology cross-reference from 2015/510 into 2024/3129 Art. 9 — candidate `methodology_depends_on` edge, source = 2015/510 settlement-procedure provisions, target = 2024/3129 Art. 9. Not adjudicated here per the one-rule/no-verdicts instruction.

**A22. Art. 53(1)-(2)**

> "Without prejudice to the requirements laid down in this Chapter and in Guideline (EU) 2024/3129 (ECB/2024/22), additional provisions relating to settlement may be laid down in the contractual or regulatory arrangements applied by the NCBs, or the ECB, for the specific monetary policy instrument." / "The end-of-day procedures are specified in the documentation relating to the TARGET framework and in Guideline (EU) 2024/3129 (ECB/2024/22)."

*Names given*: Guideline (EU) 2024/3129 (ECB/2024/22); "documentation relating to the TARGET framework" (unnamed — no specific title given)
*Tense recorded*: PRESENT
*Extractor's note*: "documentation relating to the TARGET framework" names an institution/body of documents but no specific titled publication — treat as AGENCY ONLY / unidentified-slot pending a more specific title (candidate terminus kind: `unidentified`). 6. Climate-factor provisions — candidate, flagged not confirmed

**A23. Art. 63(1)(c)**

> "multi-step or floating coupons with steps linked to SPTs, provided that: (i) the compliance with SPTs by the issuer, or any undertaking belonging to the same sustainability-linked bond issuer group, is subject to verification by an independent third party in accordance with the terms and conditions of the debt instrument;"

*Names given*: AGENCY ONLY (references "SPT" — sustainability performance target — defined at Art. 2(88a))
*Tense recorded*: PRESENT
*Extractor's note*: Art. 2(88a) defines SPT with reference to "Regulation (EU) 2020/852" (environmental objectives) and UN Sustainable Development Goals "relating to climate change or environmental degradation." This is an ELIGIBILITY provision for sustainability-linked bond coupon structures — NOT a haircut/risk-control climate-factor adjustment. The G.09 edge case "Climate-factor adjustments (referenced but not yet fully extracted)" most likely points to the haircut schedule in Guideline (EU) 2016/65 (already opened), not to 2015/510. Recommend the next agent verify against 2016/65's own text rather than treat this SPT provision as satisfying that edge case. NOT FOUND: no direct climate-related valuation-haircut adjustment provision within 2015/510 itself — searched strings "climate", "environmental", "sustainab*" within the fetched Parts One through Four (Title I) of the consolidated text. Stop point reached. No second Member-State NSI or municipal material was touched. Handing over per G.09 §5 (report and stop). Part A — EU General Budget 2027 (SEC00–SEC03) Batch date: 2026-08-03 Governing briefs: Research.EU.md v0.1 · Research.2.md v2.1 (fixed) · Research.3.md (financial-model goal) Source files: user-uploaded PDFs, not EUR-Lex fetches — SEC00.pdf (136pp, cross-institution "Statement of Estimates / Policy Highlights"), SEC01.pdf (136pp — Section I, European Parliament), SEC02.pdf (38pp — Section II, European Council and Council), SEC03.pdf (1,114pp — Section III, Commission) Extraction depth: headline/total figures only for all four files; SEC01 and SEC02 additionally cover full title/chapter breakdown (source text was pasted in full by the user); SEC03's 1,114 pages were only partially read — Title 1 (Own Resources) in full, everything else NOT YET EXTRACTED (see handoff note). 1. SEC00 — Cross-institution overview ("Statement of Estimates: Policy Highlights")

---

## Block B — legal acts cited inside the budget entries (27 distinct)

These are not quoted passages. They are Official Journal references named inside
the budget-section entries as the legal basis for a line or programme. For each,
I need only two things: **does the ELI resolve, and what is the act's full
official title?** No quote required.

1. <http://data.europa.eu/eli/dec/2001/80(1>
   — named in context: “…7, ELI:”
2. <http://data.europa.eu/eli/dec/2002/620/oj>
   — named in context: “…53, ELI:”
3. <http://data.europa.eu/eli/dec/2002/621/oj>
   — named in context: “…56, ELI:”
4. <http://data.europa.eu/eli/dec/2003/1230/oj>
   — named in context: “…29, ELI:”
5. <http://data.europa.eu/eli/dec/2006/1639/oj>
   — named in context: “…15, ELI:”
6. <http://data.europa.eu/eli/dec/2006/1982/oj>
   — named in context: “…1, ELI:”
7. <http://data.europa.eu/eli/dec/2006/971/oj>
   — named in context: “…86, ELI:”
8. <http://data.europa.eu/eli/dec/2006/972/oj>
   — named in context: “…243, ELI:”
9. <http://data.europa.eu/eli/dec/2006/973/oj>
   — named in context: “…270, ELI:”
10. <http://data.europa.eu/eli/dec/2006/974/oj>
   — named in context: “…299, ELI:”
11. <http://data.europa.eu/eli/dec/2010/427/oj>
   — named in context: “…30, ELI:”
12. <http://data.europa.eu/eli/dec/2013/743/oj>
   — named in context: “…965, ELI:”
13. <http://data.europa.eu/eli/dec/2021/764/oj>
   — named in context: “…1, ELI:”
14. <http://data.europa.eu/eli/dec_impl/2021/173/oj>
   — named in context: “…9, ELI:”
15. <http://data.europa.eu/eli/dir/1989/391/oj>
   — named in context: “…1, ELI:”
16. <http://data.europa.eu/eli/reg/1968/260/oj>
   — named in context: “…8, ELI:”
17. <http://data.europa.eu/eli/reg/1985/3518/oj>
   — named in context: “…56, ELI:”
18. <http://data.europa.eu/eli/reg/2003/58/oj>
   — named in context: “…1, ELI:”
19. <http://data.europa.eu/eli/reg/2006/1906/oj>
   — named in context: “…1, ELI:”
20. <http://data.europa.eu/eli/reg/2015/1017/oj>
   — named in context: “…1, ELI:”
21. <http://data.europa.eu/eli/reg/2016/300/oj>
   — named in context: “…1, ELI:”
22. <http://data.europa.eu/eli/reg/2018/1725/oj>
   — named in context: “…39, ELI:”
23. <http://data.europa.eu/eli/reg/2020/2094/oj>
   — named in context: “…23, ELI:”
24. <http://data.europa.eu/eli/reg/2021/2115/oj>
   — named in context: “…1, ELI:”
25. <http://data.europa.eu/eli/reg/2021/695/oj>
   — named in context: “…1, ELI:”
26. <http://data.europa.eu/eli/reg/2021/947/oj>
   — named in context: “…1, ELI:”
27. <http://data.europa.eu/eli/reg/2024/2509/oj>
   — named in context: “…2024, ELI:”

---

## Block C — what cannot be verified externally, and why

**376 of the 399 entries carry no URL at all.** They carry a `FILE:`
field instead, naming a PDF that was uploaded into the original research session:

- `SEC03.pdf` — 194 entries
- `SEC09.pdf` — 70 entries
- `SEC07.pdf` — 61 entries
- `SEC10.pdf` — 39 entries
- `SEC00.pdf` — 4 entries
- `SEC01.pdf` — 4 entries
- `SEC02.pdf` — 4 entries

No outside reader can check these, because the file is the source. Two routes
exist and both need a decision rather than a request:

1. **Re-upload the PDFs.** They were in the original session and are not in the
   repo. If they still exist locally, the entries become checkable immediately.
2. **Substitute the published document.** These are sections of the EU Draft
   General Budget, which is published — but the published version is a different
   artefact from the PDF that was read, with different pagination and possibly a
   different draft stage. Quotes would have to be re-located, not merely
   confirmed, and any figure that changed between draft stages would look like a
   transcription error when it is really a version difference.

Route 1 is cheap and exact. Route 2 is a research task in its own right. Until
one of them happens, these 376 entries are **read but unverifiable**, which is a
state this corpus can record but cannot mint from.
