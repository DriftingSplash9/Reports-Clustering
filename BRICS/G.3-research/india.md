# BRICS/G.3 — INDIA: documented dependencies on international standards

Research date: 2026-08-17. Evidence standard: verbatim quote + exact URL from a
primary Indian government/agency-authored document; the *Indian* document's own
text must name the international standard, **with its edition/year**.

---

## in-mospi-nas -> sna-2008 — VERIFIED (edition named)

**Evidence document:** *Report of the Sub-Committee for Incorporation of New Data
Sources, Rates and Ratios — For base year revision of GDP (2011-12 to 2022-23)*,
constituted under the Advisory Committee on National Accounts Statistics (ACNAS).
Title page attribution: "NATIONAL ACCOUNTS DIVISION / NATIONAL STATISTICS OFFICE /
MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION / GOVERNMENT OF INDIA".
Published on mospi.gov.in 2026-02-24. 118 pages. **No OBSOLETE watermark** (checked).

URL: https://www.mospi.gov.in/uploads/publications_reports/publications_reports1771937193643_89330e05-7e38-45f1-88f7-04ac65bd26ae_report.pdf
HTTP check: `curl -sS --max-time 180 -o report.pdf -w '%{http_code} %{size_download}\n'`
→ `200 32314500`  (re-verified with range request: `206 1001`)

Verbatim (p.10, opening sentence of Chapter 2):
> "As per recommendations of System of National Accounts (SNA)-2008, NAD industry-wise
> estimates of GDP are compiled using institutional sector approach. All resident
> institutional units are allocated to one and only one of the following five
> institutional sectors: i. The non-financial corporation sector; ii. The financial
> corporation sector; iii. The general government sector; ..."

("NAD" = National Accounts Division, MoSPI — i.e. the compiler of `in-mospi-nas`.)

Edition named? **YES — "System of National Accounts (SNA)-2008"**, explicit.

Proposed relationship_type: `methodology_depends_on` — the sentence states that the
compilation method actually used for India's industry-wise GDP estimates is adopted
"as per recommendations of" SNA-2008. This is a methodological dependency, not a
mere citation.

Confidence: **STRONG**, with one stated weakness: the quote is from a *companion
methodology report* of the National Accounts Division, not from the body text of the
"National Accounts Statistics" publication itself. The NAS publication's own press
release (see EDITION-UNNAMED entry below) still says only "SNA" unversioned. If the
graph requires the quote to come from the exact node document, this should instead be
minted as a **new node** (see "Candidate new Indian source nodes" at the end) with the
edge `in-mospi-gdp-base-revision-subcommittee-2026 -> sna-2008`, plus an
`in-mospi-nas -> in-mospi-gdp-base-revision-subcommittee-2026` internal link.

### Secondary corroboration (same document, unversioned — does NOT itself support an edge)
Same PDF, p.7 §1.1: "...the adoption of revised concepts, classifications, and
compilation practices consistent with the System of National Accounts (SNA)
guidelines." — no year, so on its own this sentence would be EDITION-UNNAMED.

### Forward-looking signal for `sna-2025` (NOT yet an edge)
Same PDF, p.8 §1.6, listing the five sub-committees constituted for the base revision:
> "v. Sub-Committee for SNA 2025 Update"

Edition named? YES ("SNA 2025"). But this names an *internal committee*, not a
statement that any published Indian statistic is currently compiled per SNA 2025.
**Do not create `in-mospi-nas -> sna-2025` on this basis.** Recorded as a watch item:
when that sub-committee's report is published, the edge may become real.

---

## in-mospi-nas -> sna-2008 — EDITION-UNNAMED (the NAS publication's own release text)

Recorded because the project wants refused citations logged.

URL: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2129126
HTTP check: `curl -sS -L -A 'Mozilla/5.0' ... -w '%{http_code} %{size_download}\n'` → `200 270303`
(PIB Delhi, Ministry of Statistics & Programme Implementation, 16 MAY 2025)

Verbatim:
> "The publication provides detailed estimates of Gross Domestic Product (GDP), Gross
> Value Added (GVA), consumption, savings, capital formation, and related macroeconomic
> indicators. These estimates are presented at current and constant (2011-12) prices and
> are based on the methodologies in alignment with the United Nations System of National
> Accounts (SNA)."

Edition named? **NO** — "System of National Accounts (SNA)", no year.
Verdict: correctly refused as an edge on its own. The VERIFIED entry above supplies the
edition from a different, current MoSPI document.

---

## in-mospi-cpi -> un-coicop-2018 — VERIFIED (edition named)

**Evidence document:** *Expert Group Report on Comprehensive Updation of Consumer Price
Index*, January 2026. Title-page attribution: "Price Statistics Division / National
Statistics Office / Ministry of Statistics & Programme Implementation / Government of
India". 258 pages.

URL: https://www.mospi.gov.in/uploads/publications_reports/publications_reports1770882766151_a8816cb4-929f-416b-94f9-c1884cbc64f7_Expert_Group_Report_CPI.pdf
HTTP check: `curl -sS --max-time 180 -o cpi_expert_group_2026.pdf -w '%{http_code} %{size_download}\n'` → `200 5168687`

Verbatim (PDF p.19 = printed "Page | 13", §3.3, Summary of Key Recommendations):
> "To enhance credibility and to ensure global comparability of Indian CPI, the latest
> structure of Classification of Individual Consumption According to Purpose (COICOP)
> 2018 will be adopted in the CPI 2024 series."

Corroborating verbatim (PDF p.15 = printed "Page | 9", §2.3):
> "CPI 2024 – The latest classification framework is COICOP 2018. The CPI 2024 series is
> mostly aligned with COICOP 2018 with 12 Divisions, 43 Groups, 92 Classes and 162
> Sub-classes."

And PDF p.24 (printed "Page | 18", §4.1.5):
> "...EG recommended for mapping HCES items as per COICOP 2018 in CPI 2024."

Edition named? **YES — "COICOP 2018"**, repeatedly and unambiguously, and tied by name
to the CPI 2024 series (which is exactly the corpus node `in-mospi-cpi`, CPI base
2024=100).

Proposed relationship_type: `methodology_depends_on` — COICOP 2018 supplies the item
classification structure of the index itself (Divisions/Groups/Classes/Subclasses), not
merely a referenced concept.

Confidence: **STRONG**. Stated weakness: the report says the series is "mostly aligned"
with COICOP 2018 (India's 12 Divisions vs COICOP 2018's 15; §4.1.6 documents mapping
compromises where HCES items could not be mapped unambiguously). The dependency is
real and named; the *conformance* is partial. If the graph has an "adapts/partially
conforms" nuance, use it.

---

## in-mospi-cpi -> cpi-manual — VERIFIED (edition named: 2020)

Same evidence document as above (Expert Group Report on Comprehensive Updation of CPI,
Jan 2026, MoSPI Price Statistics Division).
URL: https://www.mospi.gov.in/uploads/publications_reports/publications_reports1770882766151_a8816cb4-929f-416b-94f9-c1884cbc64f7_Expert_Group_Report_CPI.pdf
HTTP check: `200 5168687` (as above)

Verbatim (PDF p.65 = printed "Page | 59", §4.6.5 on chain-base index compilation):
> "The procedure is fully consistent with the principles of the IMF CPI Manual (2020)
> and supports a smooth, stable, and operationally feasible implementation of the
> chain-base CPI."

Verbatim (PDF p.122 = printed "Page | 116", §5.3.2 and §5.3.4 — the manual is used
normatively to pick a method):
> "This is one of the three methods prescribed in the Consumer Price Index Manual:
> Concepts and Methods 2020 (page 35) in case, if the price of social security transfers
> decreases from some positive amount to zero."
> "The following three methods prescribed in the Consumer Price Index Manual: Concepts
> and Methods 2020 (page 35) to deal with the cases where price of social security
> transfers decreases from some positive amount to zero -
>  Method 1: To use a zero price and adjust the weight during next update. (Proposed for
>  new series of CPI) ..."

Verbatim (PDF p.122-123, §5.4.2, quoting the manual directly):
> "In this regard, the IMF's CPI Manual Concepts and Methods 2020 para 2.60 may be seen
> below: 'The expenditure on social transfers in kind is incurred by the governments or
> nonprofit institutions that pay for them, and not by the households that consume
> them....'"

Edition named? **YES** — the exact title *Consumer Price Index Manual: Concepts and
Methods* plus year **2020**, with page and paragraph references (p.35, paras 2.60, 2.72).

Proposed relationship_type: `methodology_depends_on` — the manual is applied normatively:
it supplies the menu of three methods, and MoSPI's chosen treatment ("Method 1") for free
PDS items in CPI 2024 is taken from it.

Confidence: **STRONG**. Weakness: none material. The one caveat is node identity — check
that the corpus `cpi-manual` node is the 2020 edition; the Indian document names 2020
specifically, so if `cpi-manual` is the 2004 ILO/IMF edition the edition rule bites and a
`cpi-manual-2020` node is required instead.

### Related finding, NOT an edge: COICOP 1999 for the *predecessor* CPI series
Same PDF, p.23 (printed "Page | 17", §4.1.1):
> "In India, in the CPI (2012=100) series COICOP 1999 was adopted with some deviations to
> classify the items into different groups, subgroups and sections."
And p.14 (printed "Page | 8", §2.3): "The series was partially aligned with UNSD endorsed
classification system i.e. Classification of Individual Consumption According to Purpose
(COICOP) 1999."
Edition named? YES ("COICOP 1999"). **But the dependent is CPI 2012=100, a series the
corpus does not hold as a node** — `in-mospi-cpi` is the 2024=100 series. Do **not**
attach this to `un-coicop-hbs-1999` from `in-mospi-cpi`. Two further cautions: (a) the
Indian text says plain "COICOP 1999" (UNSD), whereas the node id `un-coicop-hbs-1999`
reads as the *Household Budget Surveys* variant — these may be different publications;
(b) it is described as superseded. If the corpus wants a CPI-2012 node, this is a ready
edge.

---

## [NEW SOURCE NODE NEEDED] NIC 2025 -> isic — VERIFIED (edition named: ISIC Rev. 5; also documents NIC 2008 -> ISIC Rev. 4)

**Evidence document:** *National Industrial Classification 2025 (NIC-2025)*, MoSPI,
published on mospi.gov.in 2025-11-18. 322 pages.
URL: https://www.mospi.gov.in/uploads/publications_reports/publications_reports1763457214315_c3e5d4f3-8e25-4775-85e3-ad42d571652f_NIC_2025_Final.pdf
HTTP check: `curl -sS --max-time 180 -o nic_2025.pdf -w '%{http_code} %{size_download}\n'` → `200 5143225`

Verbatim (PDF p.19, Introduction):
> "The classification aligns with the International Standard Industrial Classification
> (ISIC Rev. 5) while addressing specific features of the Indian economy such as the
> informal sector, agriculture, renewable energy, and the growing digital economy."

Verbatim (PDF p.31, "Salient Features of NIC 2025"):
> "Based on ISIC Rev. 5: NIC-2025 is aligned with the latest international standard,
> ISIC Revision 5, ensuring structural and conceptual comparability up to the 4-digit
> class level."

Verbatim (PDF p.23, table of national vs international versions):
> "NIC 2008 | ISIC Rev 4 (2008) | Sections 21, Divisions 88, Groups 238, Classes 403,
> Sub-Classes 1304"
(and p.22: "SIC 1962 | ISIC Rev 1 (1958) ... The Indian Standard Industrial Classification
(SIC) fully adopted ISIC Rev.1 at the division level...")

Edition named? **YES — "ISIC Rev. 5" / "ISIC Revision 5"**, and separately "ISIC Rev 4
(2008)" for NIC 2008.

Proposed relationship_type: `methodology_depends_on` — the national classification's
structure *is* the international one down to 4 digits.

Confidence: **STRONG for the citation; BLOCKED on node identity.** Two problems the
graph owner must resolve: (1) **no existing Indian corpus node is NIC** — this needs a
new node `in-mospi-nic-2025` (and optionally `in-mospi-nic-2008`); (2) the target node id
on the approved list is bare `isic` with **no revision**, whereas the Indian document
names Rev. 5 and Rev. 4 as *different* targets. If `isic` is to be edition-split the way
SNA and COICOP are, this needs `isic-rev4` and `isic-rev5` nodes and the edge should not
be forced onto bare `isic`.

---

## [NEW SOURCE NODE NEEDED] TAC-IIP base-year-revision report -> isic — VERIFIED (edition named)

**Evidence document:** *Report of the Technical Advisory Committee on Base Year Revision
of the All-India Index of Industrial Production (TAC-IIP) from 2011-12 to 2022-23*,
MoSPI, published 2026-05-25. 125 pages.
URL: https://www.mospi.gov.in/uploads/publications_reports/publications_reports1779716417577_37f022e4-11c0-4ba5-a83f-7beafcb857bd_1779702577643-Report_of_TAC_IIP_Final.pdf
HTTP check: `curl -sS --max-time 180 -o tac_iip_2026.pdf -w '%{http_code} %{size_download}\n'` → `200 1950652`

Verbatim (PDF p.30, §3.4):
> "International Recommendations for Industrial Statistics (IRIS) 2008. IRIS defines
> industry as including sections B (Mining and quarrying), C (Manufacturing), D
> (Electricity, gas, steam and air conditioning supply) and E (Water supply; sewerage,
> waste management and remediation activities) of ISIC rev.4."

Verbatim (PDF p.33, §3.22):
> "As per the recommendations of IRIIP 2010, the scope of the Index of Industrial
> Production (IIP) extends to Section D of ISIC Revision 4, which encompasses not only
> the generation, transmission, and distribution of electricity, but also the manufacture
> and distribution of gaseous fuels, as well as steam and air conditioning supply."

Its formal reference list (PDF p.92) names, with editions:
> "4. System of National Accounts 2025 (2025 SNA). 5. International Recommendations for
> Industrial Statistics 2008 (IRIS 2008). 6. International Recommendations for the Index
> of Industrial Production 2010 (IRIIP 2010). ... 8. International Standard Industrial
> Classification of All Economic Activities Rev.4 (ISIC Rev. 4). 9. International
> Standard Industrial Classification of All Economic Activities Rev.5 (ISIC Rev. 5)."

Edition named? **YES** (ISIC Rev.4 and Rev.5; IRIS 2008; IRIIP 2010; 2025 SNA).

Proposed relationship_type: `methodology_depends_on` (scope and weighting structure of
the IIP are defined in terms of ISIC sections/classes).

Confidence: **MEDIUM-STRONG.** Weaknesses: (a) no IIP node exists in the corpus — needs
`in-mospi-iip-base-revision-2026`; (b) same bare-`isic` edition problem as above;
(c) the "2025 SNA" appearance is only in a bibliography list, which is a `cites`, not a
`methodology_depends_on`, and is therefore **not** proposed as an `sna-2025` edge.

### Candidate NEW international target nodes surfaced here (not on the approved list)
- **International Recommendations for Industrial Statistics 2008 (IRIS 2008)** — UNSD,
  https://unstats.un.org/unsd/publication/seriesm/seriesm_90e.pdf
- **International Recommendations for the Index of Industrial Production 2010 (IRIIP 2010)**
  — UNSD, https://unstats.un.org/unsd/publication/seriesf/seriesf_107e.pdf
- **Central Product Classification (CPC)** — named in the same report alongside ISIC.

---

## in-cag-state-finances-audit-report -> ipsas — NOT FOUND
## in-cag-state-finances-audit-report -> intosai-issai-300 / intosai-issai-400 — NOT FOUND

**Document checked:** *Report No. 2 of 2024 — State Finances Audit Report of the
Comptroller and Auditor General of India for the year ended 31 March 2023, Government of
Andhra Pradesh* (a representative instance of the SFAR series).
URL: https://cag.gov.in/webroot/uploads/download_audit_report/2024/Report-2-of-2024---The-State-Finances-Audit-Report-of-the-Comptroller-and-Auditor-General-of-India-for-the-year-ended-31-March-2023-pertaining-to-Government-of-Andhra-Pradesh-0673fda58d17fd9.47184075.pdf
HTTP check: `curl -sSL --max-time 180 -o sfar_ap_2024.pdf -w '%{http_code} %{size_download}\n'` → `200 3484715` (238 pages)

Full-text regex sweep of all 238 pages for `ISSAI|INTOSAI`, `IPSAS`,
`GFSM|Government Finance Statistics`: **zero hits.** The only standards-conformance
statement is domestic:

Verbatim (PDF p.9, Preface):
> "The Audit has been conducted in conformity with the Auditing Standards issued by the
> Comptroller and Auditor General of India."

and the accounting-standards chapter is likewise domestic (PDF p.149, §4.10):
> "Compliance to Indian Government Accounting Standards — As per Article 150 of the
> Constitution of India, the President of India may, on the advice of the Comptroller and
> Auditor General of India, prescribe the form of accounts of the Union and of the States."

Edition named? N/A — the international standard is not named at all.
Verdict: **NOT FOUND.** No direct edge from this node to any international standard.
The dependency exists only at **two hops**: SFAR → *CAG's Auditing Standards 2017* →
ISSAI, and SFAR → *IGAS/IGFRS (GASAB)* → IPSAS. See the two entries below for the
intermediate documents. Weakness of this NOT FOUND: only one state's SFAR was
full-text-scanned; the preface wording is boilerplate across states, but a different
state/year has not been checked.

---

## [NEW SOURCE NODE NEEDED] CAG's Auditing Standards 2017 -> INTOSAI ISSAIs — VERIFIED (but NOT to `intosai-issai-300` / `intosai-issai-400`)

**Evidence document:** *CAG's Auditing Standards 2017* (third edition, foreword signed
"March 2017, Shashi Kant Sharma, Comptroller and Auditor General of India"), published as
full text on the CAG's own site.
URL: https://cag.gov.in/en/page-cag-s-auditing-standards-2017
HTTP check: `curl -sSL --max-time 60 -o cag_as.html -w '%{http_code} %{size_download}\n' -A 'Mozilla/5.0'` → `200 199593`

Verbatim (§1.2 Purpose and Authority of the Standards):
> "These standards incorporate the Prerequisites for the functioning of Supreme Audit
> Institutions and Fundamental Auditing Principles of the International Standards of
> Supreme Audit Institutions, which have been suitably adapted with due consideration of
> the audit mandate and rules applicable to SAI India."

Verbatim (§1.4.2.3):
> "The standards and methodologies adopted by SAI India shall be consistent with the
> fundamental auditing principles elaborated under the International Standards of Supreme
> Audit Institutions (ISSAIs) of International Organisation of Supreme Audit Institutions
> (INTOSAI)."

Verbatim (§1.4.3):
> "SAI India shall have a Code of Ethics that is aligned with the Code of Ethics (ISSAI 30)
> elaborated under the ISSAIs."

Edition named? The **only** numbered ISSAI in the whole document is **ISSAI 30**
(exhaustive regex over the full page text returned exactly `['ISSAI 30']`).
**ISSAI 300 and ISSAI 400 are never named.**

Verdict:
- `... -> intosai-issai-300` — **NOT FOUND**
- `... -> intosai-issai-400` — **NOT FOUND**
- `... -> ISSAI 30 (INTOSAI Code of Ethics)` — VERIFIED, but that is a **candidate new
  target node**, not on the approved list. (Caution: ISSAI 30 was renumbered by INTOSAI
  to INTOSAI-P 30 / ISSAI 130 in the 2019 IFPP restructure; the Indian document cites the
  pre-2019 number.)
- `... -> "the ISSAIs" as a framework` — named, but **unversioned and unnumbered**, so per
  the edition rule it cannot become an edge to any specific ISSAI node.

Proposed relationship_type (if an ISSAI-30 node is minted): `methodology_depends_on`.
Confidence: **MEDIUM.** Weaknesses: the source is not an existing corpus node; the target
that *is* named is not an approved node; and the two approved ISSAI nodes are not cited.

---

## [NEW SOURCE NODE NEEDED] IGFRS 1 (GASAB) -> ipsas — VERIFIED (unversioned IPSAS, but IPSAS 1 and IPSAS 2 named by number)

**Evidence document:** *IGFRS 1 – Presentation of Financial Statements*, Government
Accounting Standards Advisory Board (GASAB), constituted by the Comptroller and Auditor
General of India.
URL: https://gasab.gov.in/gasab/pdf/IGFRS-1.pdf

**HTTP check — HONEST STATEMENT OF LIMITATION:** direct `curl` from this container fails:
`curl -sS --max-time 45 -A 'Mozilla/5.0...' https://gasab.gov.in/gasab/pdf/IGFRS-1.pdf`
→ `curl: (35) Recv failure: Connection reset by peer` (000 0); over plain HTTP → `503 114`.
`https://gasab.gov.in/` also resets. The content below was retrieved via the WebFetch
tool (different egress), which **did** reach the primary document. This should be
re-verified from a network that can reach gasab.gov.in before the edge is committed.

Verbatim:
> "Where relevant IGFRSs on specific accounting transactions are not available, the
> Government entity shall follow relevant International Public Sector Accounting
> Standards (IPSAS), till an appropriate IGFRS is formulated."

Verbatim:
> "In furtherance of the above directives, the TBG studied, inter alia, the Government
> Accounting Rules, 1990 the General Financial Rules, 2005, the International Public
> Sector Accounting Standards (IPSAS) 1 and standards developed by the Accounting
> Standards Boards of other countries."

Verbatim:
> "IPSAS 2 (till relevant IGFRS is formulated), sets out requirements for the presentation
> for the cash flow statements and related disclosures."

Edition named? **No handbook year/edition** is given, but individual standards are named
by number (IPSAS 1, IPSAS 2). If the corpus node `ipsas` is the unversioned family node,
this is a clean edge; if `ipsas` is a specific handbook edition, the edition rule bites.

Proposed relationship_type: `methodology_depends_on` — this is a *residual/fallback*
normative dependency ("shall follow relevant IPSAS till an appropriate IGFRS is
formulated"), which is the strongest form of dependency: IPSAS is the operative rule where
no Indian standard exists.

Confidence: **MEDIUM.** Weaknesses: (1) the HTTP verification limitation stated above;
(2) no existing Indian corpus node is a GASAB standard — needs a new node
`in-gasab-igfrs-1`; (3) IGFRS 1 governs *accrual-basis* government financial statements,
which most Indian states have not adopted, so the standard's practical bite is limited —
though the documented dependency is unambiguous.

---

## [NEW SOURCE NODE NEEDED] India's External Debt: A Status Report 2024-25 (MoF/DEA) -> imf-sdds — VERIFIED

**Evidence document:** *INDIA'S EXTERNAL DEBT — A Status Report 2024-25*, "GOVERNMENT OF
INDIA / MINISTRY OF FINANCE / DEPARTMENT OF ECONOMIC AFFAIRS / ECONOMIC DIVISION /
EXTERNAL DEBT MANAGEMENT UNIT", September 2025. 114 pages.
URL: https://dea.gov.in/files/external_debt_documents/Ex%20Debt%20Report%202024-25_Final.pdf
HTTP check: `curl -sSL --cacert bundle_dea.pem --max-time 120 -o ext_debt_2425.pdf -w '%{http_code} %{size_download}\n'` → `200 2451023`
(Access note: dea.gov.in chains to Let's Encrypt intermediate **YR1**, absent from the
container trust store. Fetched http://yr1.i.lencr.org/ → `200 1247`, converted DER→PEM,
concatenated onto `/etc/ssl/certs/ca-certificates.crt` as `bundle_dea.pem`, then
`curl --cacert`. Verified cleanly, no `-k`.)

Verbatim (PDF p.77, Annex "II. Dissemination of External Debt Statistics in India", (i)-(ii)):
> "India has also been disseminating data on external debt under the IMF's Special Data
> Dissemination Standards (SDDS) and Quarterly External Debt Statistics (QEDS) database
> jointly developed by the World Bank and the International Monetary Fund."
> "The external debt statistics of India are disseminated with a lag of three months from
> the end of the reference quarter in both the country-specific and SDDS format and are
> accessible at www.finmin.nic.in and www.rbi.org.in."

Edition named? SDDS has no edition in the corpus target list (`imf-sdds` is unversioned),
and the Indian text names it by full title. **No edition problem.**

Proposed relationship_type: `methodology_depends_on` — SDDS dictates the dissemination
format and periodicity actually used ("disseminated with a lag of three months ... in ...
SDDS format").

Confidence: **STRONG for the citation.** Weakness: **no existing Indian corpus node** —
needs `in-mof-external-debt-status-report`. This is currently the best Indian-hosted,
Indian-authored primary text naming SDDS that I found (the RBI SDDS page below is a
weaker, page-level alternative).

---

## [NEW SOURCE NODE NEEDED] India's External Debt Status Report 2024-25 -> sna-2008 and -> imf-bpm6 — VERIFIED (both editions named, in one sentence)

Same document/URL/HTTP check as above.

Verbatim (PDF p.20, footnote 3, attached to "the new IMF format" used to classify India's
external debt in Chapter 2):
> "The concepts set out in the IMF's External Debt Statistics (EDS) Guide 2013 are
> harmonized with those of the System of National Accounts (SNA) 2008 and the sixth
> edition of the IMF's Balance of Payments and International Investment Position Manual
> (BPM6) published in 2009."

Verbatim (PDF p.26, §2.15 — the operative statement of what India actually does):
> "In this section, the data on India's external debt is presented according to the IMF
> format (as per the IMF's 2013 EDS Guide format), classified by debtor sectors."

Verbatim (PDF p.78, Annex (vi)):
> "The external debt statistics are compiled using the methodology and practices
> prescribed in the 'External Debt Statistics: Guide for Compilers and Users' brought out
> by the IMF."

Verbatim (PDF p.62, footnote 13):
> "In October 2014, the World Bank in collaboration with the International Monetary Fund
> (IMF), launched the new Quarterly External Debt Statistics (QEDS) SDDS and GDDS database
> in line with the classifications and definitions of the 2013 External Debt Statistics:
> Guide for Compilers and Users (2013 EDS Guide) and Sixth Edition of Balance of Payments
> and International Investment Position Manual (BPM6)."

Edition named? **YES — "System of National Accounts (SNA) 2008"** and **"BPM6 ... sixth
edition ... published in 2009"**, both explicit.

Proposed relationship_type: `methodology_depends_on` for the 2013 EDS Guide (a candidate
**new** target node); `cites` — **not** `methodology_depends_on` — for `sna-2008` and
`imf-bpm6`, because the p.20 sentence asserts that the *EDS Guide* is harmonized with
SNA 2008 and BPM6; India's dependency on SNA 2008/BPM6 here is **indirect, through the
EDS Guide**. Treat these as `cites` unless the graph is comfortable with transitive
methodology dependence.

Confidence: **MEDIUM.** Stated weaknesses: (a) no existing Indian corpus node;
(b) the SNA-2008/BPM6 naming is in a footnote *about the IMF guide*, not a first-person
statement that India's own statistics follow BPM6 — see the next entry for a first-person
RBI statement; (c) the p.78 statement that India's statistics are compiled per the EDS
Guide gives the *unversioned* title, so on its own it is EDITION-UNNAMED; the 2013 year
comes from p.26/p.62.

### Candidate NEW international target node
- **External Debt Statistics: Guide for Compilers and Users (2013)** — IMF et al.,
  https://www.imf.org/external/np/sta/ed/guide.htm — cited by year and used normatively.
  (Note the same Indian report also cites the **2003** edition on p.73 for the definition
  of external debt: "{External Debt Statistics - Guide for Compilers and Users,
  International Monetary Fund (IMF), 2003}" — two editions, cited for different purposes.)

---

## [NEW SOURCE NODE NEEDED] RBI, "Developments in India's Balance of Payments" -> imf-bpm6 — VERIFIED (first-person, edition named)

**Evidence document:** RBI Bulletin article *Developments in India's Balance of Payments
during Fourth Quarter (January-March) of 2010-11*, hosted on the RBI's own site.
URL: https://www.rbi.org.in/scripts/BS_ViewBulletin.aspx?Id=12430
HTTP check: `curl -sSL --max-time 40 -o rbi_bull.html -w '%{http_code} %{size_download}\n' -A 'Mozilla/5.0'` → `200 2518772`
(Plain HTML on www.rbi.org.in — the rbidocs.rbi.org.in TSPD bot-wall does not apply.)

Verbatim (opening paragraph):
> "The data on India's Balance of Payments (BoP) are compiled and published by the Reserve
> Bank on a quarterly basis with a lag of one quarter. The compilation of BoP data is based
> on the IMF guidelines set out in its Balance of Payments Manual (BPM) which is revised
> from time to time. IMF has recently brought out the Sixth Edition of BPM, i.e., BPM6
> which has suggested revised compilation procedure as well as new format of standard
> presentation of BoP statistics. ... Accordingly, from this quarter (Q4 of 2010-11), BoP
> data are presented in the revised format as per BPM6."

Verbatim (Annex 2, "Correspondence Between Old & New Formats of BOP"):
> "The Report of the Working Group on Balance of Payments Manual for India (Chairman: Shri
> Deepak Mohanty), released by the RBI on its website (www.rbi.org.in) on November 23,
> 2010, had recommended that the BoP data for India should be presented in the new format
> of standard presentation of BoP as suggested by the IMF's Balance of Payments Manual
> (Sixth Edition), i.e., BPM6. The time line set by the IMF for implementing the BPM6
> standards is the end of 2012. As a follow up of the implementation of the recommendations
> of the Working Group, the BoP data for the four quarters of 2010-11 have been presented
> in the new format to comply with the BPM6 standards."

The document's own statistical tables are headed:
> "Statement I: Standard Presentation of BoP as per BPM6 (US$ million)"
and a table note reads:
> "Changes in Reserve Assets are included under the Financial Account as recommended by
> the BPM 6."

Edition named? **YES — "BPM6" / "Balance of Payments Manual (Sixth Edition)"**, first
person ("BoP data for India ... presented ... as per BPM6").

Proposed relationship_type: `methodology_depends_on` — BPM6 supplies both the compilation
procedure and the presentation format of India's published BoP statistics.

Confidence: **MEDIUM-STRONG.** Stated weaknesses: (a) **no existing Indian corpus node** —
needs `in-rbi-balance-of-payments`; (b) the article is from 2011 (the transition quarter),
so it documents the *adoption* rather than confirming current practice — however every
later RBI BoP statement is still headed "as per BPM6", and India's external debt report
above (Sept 2025) independently confirms BPM6 is the live framework. A current RBI
quarterly BoP press release would strengthen this; those live at
`rbidocs.rbi.org.in/rdocs/PressRelease/PDFs/` which remains behind the TSPD bot-wall.

### Candidate NEW Indian source node also surfaced
- **Report of the Working Group on Balance of Payments Manual for India** (Chairman:
  Deepak Mohanty), RBI, released 23 November 2010 — this is the Indian instrument that
  *decided* the BPM6 adoption, and would be the cleanest possible source node for an
  `-> imf-bpm6` edge if it can be retrieved.

---

## [NEW SOURCE NODE NEEDED] RBI Special Data Dissemination Standards page -> imf-sdds — VERIFIED

URL: https://www.rbi.org.in/scripts/SDDSview.aspx
HTTP check: `curl -sSL --max-time 40 -o rbi_sdds.html -w '%{http_code} %{size_download}\n' -A 'Mozilla/5.0'` → `200 67700`

Verbatim:
> "Under the Special Data Dissemination Standards (SDDS) of the International Monetary Fund
> (IMF), central banks undertake the responsibility of disseminating information under
> certain data categories, such as, analytical accounts of the banking sector, analytical
> accounts of the central bank, balance of payments, international reserves and exchange
> rates. The IMF requires that these data should be available at regular intervals in
> public domain. The IMF as well as central banks also provides a National Summary Data
> Page (NSDP) on their websites... The Reserve Bank of India is one of the earliest central
> bank signatories of SDDS. This section provides the data released by the Reserve Bank of
> India under SDDS requirements."

Edition named? N/A (SDDS is unversioned in the target list).
Proposed relationship_type: `methodology_depends_on` (dissemination obligation).
Confidence: **MEDIUM.** Weakness: this is a website section page rather than a numbered
publication, so it is a thin thing to mint as a node; the MoF External Debt Status Report
entry above is the better SDDS evidence. RBI's NSDP itself is at
https://www.rbi.org.in/Scripts/NSDPDisplay.aspx (HTTP check: `200 53254`).

---

## in-union-receipts-budget -> imf-gfsm — NOT FOUND
## in-union-budget-expenditure-profile-stmt18 -> imf-gfsm / ipsas / sna-2008 — NOT FOUND

**Documents checked (Union Budget 2026-27, indiabudget.gov.in):**
- *Receipt Budget (Full)* — https://www.indiabudget.gov.in/doc/rec/allrec.pdf
  HTTP check: `200 7116276` (104 pages)
- *Expenditure Profile (Full)* — https://www.indiabudget.gov.in/doc/eb/vol1.pdf
  HTTP check: `200 13525814` (322 pages) — this volume contains Statement 18
- *Key to Budget Document, 2026* — https://www.indiabudget.gov.in/doc/Key_to_Budget_Document_2026.pdf
  HTTP check: `200 1834874` (10 pages)

Full-text regex sweep of all three for
`GFSM|Government Finance Statistics|IPSAS|System of National Accounts|IMF|International Monetary`:
the **only** hits are substantive references to the IMF as an *institution* (India's quota,
EFF charges, rent of the IMF Resident Office, receipts/repayments under Major Head 6001) —
**not a single reference to GFSM, GFSM 2014, IPSAS, or the SNA as a standard.**

Illustrative verbatim of the only kind of "IMF" hit present (Receipt Budget p.23):
> "6.6.01. International Monetary Fund :. India's quota in IMF is SDR 13,114.4 million with
> a shareholding of 2.75%. India ranks eighth in terms of quota holding at the IMF."

Edition named? N/A.
Verdict: **NOT FOUND.** India's Union Budget documents do not document any dependency on
an international fiscal-statistics standard. The Indian budget's classification authority
is domestic and constitutional (Article 150 → the CAG-advised form of accounts → the
List of Major and Minor Heads), not GFSM. This is a substantive, reportable negative:
the widely-repeated claim that Indian fiscal data are "GFSM-based" is **not documented in
the budget instruments themselves**.
Weakness of this NOT FOUND: only the 2026-27 budget round was scanned, and only the three
volumes listed; the Medium-Term Fiscal Policy Statement and the Indian Government
Accounting Standards notifications were not full-text-scanned.

---

## in-census-2011 -> un-census-principles — NOT FOUND (so far)

**Documents checked:**
- *Census of India 2011 — Instruction Manual for Houselisting and Housing Census (English)*
  URL: https://censusindia.gov.in/nada/index.php/catalog/43487/download/47193/IM_HL_English_2011.pdf
  HTTP check: `curl -sSL --cacert bundle_census.pem --max-time 120 -A 'Mozilla/5.0' -o im_hl_2011.pdf -w '%{http_code} %{size_download}\n'` → `200 4763787` (80 pages).
  Regex sweep for `United Nations`, `Principles and Recommendations`, `international`:
  **zero hits.**
- *O/o Registrar General and Census Commissioner, India — Organization, details, functions
  and duties* URL: https://censusindia.gov.in/census.website/sites/default/files/2022-05/4-1-b-i-organization_details_functions_and_duties_etc.pdf
  HTTP check: `200 470790` (11 pages). Regex sweep for `United Nations|Principles and
  Recommendations|UNSD`: **zero hits.**
- PIB backgrounder *Census 2027: India's First Digital Enumeration Exercise*
  URL: https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/apr/doc2026425856601.pdf
  HTTP check: `200 615786` (7 pages). Regex sweep for `United Nations|Principles and
  Recommendations|UNSD|international standard`: **zero hits.**

Verdict: **NOT FOUND.** No primary Indian census instrument examined names the UN
*Principles and Recommendations for Population and Housing Censuses* (any revision).
Weakness: the census corpus is large and I could not enumerate it — `censusindia.gov.in`'s
NADA catalog search returned no parseable result links from this container, and
`SSDIV-ENG.pdf` reset the connection. The Census 2011 *Metadata* volume and the
*Concepts and Definitions* volume were **not** located and remain the most likely place
for such a citation. Treat this as "not found in the documents reachable", not as proof
of absence.

**Access note (solved, for reuse):** `censusindia.gov.in` serves an incomplete chain
(missing eMudhra `emSign SSL CA - G1`). Retrieved the intermediate from the leaf's AIA
URI `http://repository.emsign.com/certs/emSignSSLCAG1.crt` (`200 1158`), converted
DER→PEM, appended to the system bundle as `bundle_census.pem`, and used `curl --cacert`.
Verifies cleanly; no `-k` used.

---

## in-fc15-report -> imf-weo — VERIFIED as a data citation (edition named: October 2020)

**Evidence document:** *Fifteenth Finance Commission — Report for 2021-26, Volume I: Main
Report* (digitised copy on the Commission's own site). 446 pages.
URL: https://fincomindia.nic.in/asset/doc/commission-reports/15th-FC/digitized/15th%20FC%20-%20Vol%20I%20-PDF.pdf
HTTP check: `curl -sSL --max-time 300 -A 'Mozilla/5.0' -o fc15_vol1.pdf -w '%{http_code} %{size_download}\n'` → `200 31057059`
(Note: the `...-Digitised.pdf` variant 404s; use the `-PDF.pdf` variant.)

Verbatim (PDF p.28, footnote 1, supporting the Commission's macroeconomic narrative):
> "1 World Economic Outlook, October 2020"

Verbatim (PDF p.72, footnote 4, supporting §3.11 on gross fixed capital formation):
> "4 World Economic Outlook October 2020, International Monetary Fund"

Verbatim (PDF p.52, figure source line for Figure 2.2 "G20: General Government Total Revenue"):
> "Sources: IMF, World Economic Outlook, and staff calculations."

Edition named? **YES — "October 2020"** in the two footnotes. (The figure source line on
p.52 is unversioned and would not qualify on its own.)

Proposed relationship_type: `uses_data_from` — the WEO supplies comparator data and
growth figures the Commission reasons from. It is **not** `methodology_depends_on`: the
WEO is not a standard the Commission's own methodology conforms to.

Confidence: **MEDIUM.** Stated weaknesses: (1) the `imf-weo` node is unversioned, but the
WEO is published **twice a year** — if the corpus edition-splits SNA and COICOP, it should
logically edition-split WEO too, and the Indian document names the *October 2020* issue
specifically; forcing this onto a bare `imf-weo` node is the same category of error the
edition rule is meant to prevent. Flagging rather than silently attaching. (2) It is a
citation in a footnote, the weakest form of dependency in this project's taxonomy.

### Candidate NEW international target node surfaced in the same report
**PEFA Framework for assessing public financial management (PEFA Secretariat, 2016)** —
FC-15 Vol I, PDF p.416, footnote 13, verbatim:
> "PEFA is a methodology for assessing public financial management performance. It
> identifies ninety-four characteristics (dimensions) across thirty-one key components of
> public financial management (indicators) in seven broad areas of activity (pillars). For
> details on methodology refer to PEFA Framework for assessing public financial management
> (PEFA Secretariat 2016). The RBI has recently assessed States' performance on select PEFA
> indicators..."
Edition named: **YES (2016)**. Publisher: PEFA Secretariat (World Bank-hosted).
URL: https://www.pefa.org/resources/pefa-2016-framework
This is a real, edition-named, methodologically-used international standard citation from
an existing Indian corpus node (`in-fc15-report`) — but the target is **not on the
approved list**. Recommend minting `pefa-framework-2016`; the edge
`in-fc15-report -> pefa-framework-2016` (`cites`, arguably `methodology_depends_on` for
the RBI assessment it endorses) would be a genuine second international link for India.

---

## in-fc16-report -> (any international standard) — NOT FOUND

**Document checked:** *Sixteenth Finance Commission — Report for 2026-31, Volume I: Main
Report*. 364 pages.
URL: https://fincomindia.nic.in/asset/doc/commission-reports/16th-FC/reports/Vol1-Main-Report.pdf
HTTP check: `curl -sSL --max-time 240 -A 'Mozilla/5.0' -o fc16_vol1.pdf -w '%{http_code} %{size_download}\n'` → `200 7429766`

Full-text regex sweep of all 364 pages for `World Economic Outlook`,
`GFSM|Government Finance Statistics`, `IPSAS`, `Basel`,
`ILO Convention|C102|social security ... minimum standards`: **zero hits.**
The only `SNA` regex matches were false positives on the word "snapshot".

Verdict: **NOT FOUND.** Notably, unlike its predecessor the 16th FC does not even cite the
IMF WEO. Weakness: only Volume I (Main Report) was scanned; Volume II (Annexures) was not.

---

## Existing Indian legal-instrument nodes — NOT FOUND (expected, recorded for completeness)

`in-constitution-art280`, `in-rbi-act-45za`, `in-gst-compensation-act-2017`,
`in-fc16-tor-order`, `in-fc16-explanatory-memorandum`, `in-fc15-explanatory-memorandum`.

These are constitutional/statutory/executive instruments. None of them names an
international standard; Indian primary legislation does not, as a drafting convention,
incorporate foreign or supranational statistical standards by reference. **NOT FOUND**, and
not worth further search effort. Weakness: asserted from document type plus the FC-16
sweep above rather than a full-text sweep of each instrument.

## in-rbi-state-finances -> imf-gfsm — NOT ESTABLISHED (could not retrieve the document)

The RBI publication landing page for *State Finances: A Study of Budgets* resolves
(https://www.rbi.org.in/scripts/PublicationsView.aspx?Id=22971 → HTTP `200 63845`,
foreword text confirmed present) but the report PDF links are injected client-side and
resolve to `rbidocs.rbi.org.in/rdocs/Publications/PDFs/...`, which I could not enumerate
from the returned HTML. The report is analytical rather than a compilation manual, so a
normative GFSM citation is a priori unlikely. Recorded as **unresolved**, not as NOT FOUND.
