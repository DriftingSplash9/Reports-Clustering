# Part A — ESS quality-and-metadata framework (EU blob batches 16–26, 30–37, 44, 45, 66)

Date: 2026-08-07
Session: EU branch, MISSION-TODO 2.0 P1 item 5 (the blob's judgment half).
Method: staging records from `EU/slices/_staging/10-batch-with-records.ndjson`
were used **only to locate documents**. Every quote below was re-fetched and
re-read in this session by direct download plus own-eyes text extraction
(`curl` + `pypdf` for PDFs, `curl` + HTML tag-stripping for pages). Nothing here
is inherited on trust; where a source could not be re-fetched, that is recorded
as such and nothing was minted from it.

---

## A. European Statistics Code of Practice

**A1**

```
URL:       https://ec.europa.eu/eurostat/documents/4031688/8971242/KS-02-18-142-EN-N.pdf
LOCATION:  Title page
QUOTE:     "EUROPEAN STATISTICS CODE OF PRACTICE For the National Statistical
           Authorities and Eurostat (EU statistical authority) Adopted by the
           European Statistical System Committee 16th November 2017"
NAMES:     European Statistics Code of Practice
TENSE:     PRESENT
NOTES:     Re-extracted from the PDF this session (11 pages, pypdf). Colophon
           reads "Manuscript completed in November 2017".
```

**A2**

```
URL:       https://ec.europa.eu/eurostat/documents/4031688/8971242/KS-02-18-142-EN-N.pdf
LOCATION:  Introduction — "The common quality framework of the European Statistical System"
QUOTE:     "The common quality framework of the European Statistical System is
           composed of the European Statistics Code of Practice, the Quality
           Assurance Framework of the European Statistical System and the general
           quality management principles (such as continuous interaction with
           users, commitment of leadership, partnership, staff satisfaction,
           continuous improvement, integration and harmonisation). This
           self-regulatory common quality framework complements the extensive
           legal framework of the European Statistical System based on the
           Regulation (EC) No 223/2009 on European statistics which itself
           derives from the Treaty on the Functioning of the European Union."
NAMES:     European Statistics Code of Practice
           Quality Assurance Framework of the European Statistical System
           Regulation (EC) No 223/2009
TENSE:     PRESENT
NOTES:     "complements" is not a dependency claim (§5a family) — the Regulation
           leg is NOT built from this quote. It names the three-part composition
           of the framework, which is why the CoP and the QAF are treated as two
           nodes rather than one.
```

**A3**

```
URL:       https://ec.europa.eu/eurostat/documents/4031688/8971242/KS-02-18-142-EN-N.pdf
LOCATION:  Preamble
QUOTE:     "An independent Advisory Board, the European Statistical Governance
           Advisory Board (ESGAB, the Board) provides an overview of the European
           Statistical System as regards the implementation of the Code of
           Practice. The Board analyses the implementation of the Code of Practice
           by the European Union Statistical Authority (Eurostat) and the European
           Statistical System as a whole every year; and advises on appropriate
           measures to facilitate the implementation of the Code of Practice"
NAMES:     European Statistical Governance Advisory Board (ESGAB)
TENSE:     PRESENT
NOTES:     Names the Board and its annual analysis, not the annual report by
           title. The report-level evidence is A9 below, which is the ESGAB
           report's own title page and is what the edge is built on.
```

**A4**

```
URL:       https://ec.europa.eu/eurostat/web/quality/european-quality-standards/european-statistics-code-of-practice
LOCATION:  "History of the CoP" table
QUOTE:     "24 February 2005 Adoption of the CoP by the Statistical Programme
           Committee | September 2011 Revision of the CoP based on the results of
           the 1st round of ESS peer reviews | November 2017 Revision of the CoP
           based on the results of the 2nd round of ESS peer reviews"
NAMES:     European Statistics Code of Practice
           ESS peer reviews
TENSE:     PAST (the table records completed events)
NOTES:     Two separate things. (a) This is the cadence evidence for the CoP node:
           three editions, 2005 / 2011 / 2017. (b) It also documents a
           relationship running the OPPOSITE way to the one built below — each
           CoP revision is "based on the results of" a peer-review round. That is
           recorded as a `_dropped` note, not minted: the quote names the
           *results of a round*, not the titled final report that is the node.
           Both directions may well hold; this session does not adjudicate.
```

**A5**

```
URL:       https://ec.europa.eu/eurostat/web/quality/european-quality-standards/european-statistics-code-of-practice
LOCATION:  "Safeguarding quality with 16 key principles"
QUOTE:     "The European Statistics Code of Practice (CoP) is the cornerstone of
           the quality framework and sets the standards for developing, producing
           and disseminating European statistics. It defines 16 key principles for
           the institutional environment under which the EU and national
           statistical authorities operate, as well as for the statistical
           processes and output . It also includes a set of 84 indicators for the
           best practices and standards for each of the 16 principles."
NAMES:     European Statistics Code of Practice
TENSE:     PRESENT
NOTES:     Spacing before the full stop is in the source; quoted unmodified.
```

---

## B. Quality Assurance Framework of the ESS

**B1**

```
URL:       https://ec.europa.eu/eurostat/documents/64157/4392716/ESS-QAF-V2.0-final.pdf
LOCATION:  Introduction — "Common Quality Framework of the European Statistical System"
QUOTE:     "The 2019 edition (Version 2.0) of the Quality Assurance Framework of
           the European Statistical System (ESS QAF) follows and aligns with the
           2017 revision of the European Statistics Code of Practice (ES CoP).
           Together with the general quality management principles, the ES CoP and
           the ESS QAF constitute the common quality framework of the ESS, based on
           which high-quality European Statistics are developed, produced and
           disseminated."
NAMES:     Quality Assurance Framework of the European Statistical System
           European Statistics Code of Practice
TENSE:     PRESENT
NOTES:     "follows and aligns with" is squarely in the §5a family and this
           sentence is deliberately NOT used as the basis of the QAF→CoP edge.
           It is quoted here because it is the sentence a less careful pass would
           have built the edge from. The edge is built on B3 instead.
```

**B2**

```
URL:       https://ec.europa.eu/eurostat/documents/64157/4392716/ESS-QAF-V2.0-final.pdf
LOCATION:  Introduction
QUOTE:     "The current version 2.0 of the ESS QAF was prepared by the ESS Task
           Force QAF, a sub-group of the Working Group on Quality in Statistics,
           and Eurostat, and was approved by the European Statistical System
           Committee in May 2019. It was inspired by the revised ES Code of
           Practice, Regulation 223/2009 on European Statistics, the two rounds of
           ESS peer reviews, results and lessons learned from the ESS Vision
           Implementation Projects, current statistical practices of ESS members
           as well as other international initiatives and developments"
NAMES:     ES Code of Practice
           Regulation 223/2009
           ESS peer reviews
TENSE:     PRESENT/PAST (the approval is past; the list describes the edition)
NOTES:     "was inspired by" is too weak to carry an edge and is recorded as a
           documented non-dependency. Note it would otherwise have produced a
           second QAF→peer-review edge. Source PDF has broken intra-word spacing
           from the original typesetting ("Ma y 2019", "S tatistics"); the quote
           above is normalised for whitespace only, no words changed.
```

**B3**

```
URL:       https://ec.europa.eu/eurostat/web/quality/european-quality-standards/quality-assurance-framework
LOCATION:  "Aim and content"
QUOTE:     "The QAF serves as complementary guidance for how to implement the CoP.
           Like the CoP, it applies to the statistical authorities of the ESS,
           which comprises the European Union Statistical Authority (Eurostat), the
           National Statistical Institutes (NSIs), and Other National Authorities
           (ONAs). [...] The QAF represents a collection of methods, tools and good
           practices that are suggested for use or are already in use in some
           statistical authorities of the ESS. The aim of the QAF is to accompany
           the CoP by providing guidance and examples in the form of more detailed
           methods and tools."
NAMES:     Quality Assurance Framework (QAF)
           European Statistics Code of Practice (CoP)
TENSE:     PRESENT
NOTES:     This is the basis for the QAF→CoP edge: the QAF's own content is
           guidance on implementing the CoP, i.e. the CoP defines what the QAF
           elaborates. `methodology_depends_on`. The ellipsis marks omitted
           sentences between two operative statements, not a cut inside either.
```

**B4**

```
URL:       https://ec.europa.eu/eurostat/web/quality/european-quality-standards/quality-assurance-framework
LOCATION:  "Adoption"
QUOTE:     "In 2011, when the European Statistics Code of Practice (CoP) was
           revised for the first time, the European Statistical System Committee
           (ESSC) adopted the Quality Assurance Framework (QAF) of the European
           Statistical System (ESS). After the revision of the CoP in 2017, the QAF
           was substantially enhanced and a revised version was adopted by the ESSC
           in 2019."
NAMES:     Quality Assurance Framework (QAF)
TENSE:     PAST (an adoption history)
NOTES:     Cadence evidence for the QAF node: two versions, 2011 and 2019.
```

---

## C. ESS Handbook for Quality and Metadata Reports (EHQMR)

**C1**

```
URL:       https://ec.europa.eu/eurostat/documents/3859598/13925930/KS-GQ-21-021-EN-N.pdf
LOCATION:  Cover / colophon
QUOTE:     "European Statistical System handbook for quality and metadata reports
           2021 re-edition MANUALS AND GUIDELINES"
NAMES:     ESS Handbook for Quality and Metadata Reports
TENSE:     PRESENT
NOTES:     316 pages, re-extracted in full this session (pypdf). Catalogue number
           KS-GQ-21-021-EN-N, ISBN 978-92-76-44408-4.
```

**C2**

```
URL:       https://ec.europa.eu/eurostat/documents/3859598/13925930/KS-GQ-21-021-EN-N.pdf
LOCATION:  FOREWORD
QUOTE:     "The ESS Handbook for Quality and Metadata Reports (EHQMR) is recognised
           as an ESS standard. It is included in the Catalogue of ESS standards, the
           collection of non-legislative normative documents underpinning the ESS."
NAMES:     ESS Handbook for Quality and Metadata Reports (EHQMR)
           Catalogue of ESS standards
TENSE:     PRESENT
NOTES:     "Catalogue of ESS standards" is a named collection and a candidate node
           class in its own right — logged, not scoped.
```

**C3**

```
URL:       https://ec.europa.eu/eurostat/documents/3859598/13925930/KS-GQ-21-021-EN-N.pdf
LOCATION:  FOREWORD
QUOTE:     "The Handbook applies to Eurostat, national statistical institutes and
           other national authorities in their roles as producers, compilers and
           disseminators of European statistics. It supports compliance with the
           European Statistics Code of Practice by providing recommendations on how
           to prepare comprehensive quality reports for the full range of
           statistical processes and their outputs."
NAMES:     European Statistics Code of Practice
TENSE:     PRESENT
NOTES:     "supports compliance with" is a purpose statement about the Handbook's
           relation to the CoP. It is weaker than C4's incorporation language and
           is proposed as `cites`, not `methodology_depends_on` — flagged as a
           judgement call per §6 rather than resolved silently.
```

**C4**

```
URL:       https://ec.europa.eu/eurostat/documents/3859598/13925930/KS-GQ-21-021-EN-N.pdf
LOCATION:  FOREWORD
QUOTE:     "This 2020 edition of the ESS Handbook for Quality and Metadata Reports
           (EHQMR) fully incorporates SIMS 2.0 and the two standards – ESQRS and
           ESMS – which are unified in SIMS. The document provides guidelines for
           producer reports and user reports within the overarching SIMS framework."
NAMES:     SIMS 2.0
           ESQRS
           ESMS
TENSE:     PRESENT
NOTES:     Strongest edge in this batch. The Handbook is the operational guidance
           document *for* SIMS; SIMS defines the structure it documents.
           Note the edition mismatch inside one document: the cover says "2021
           re-edition" (C1), the foreword says "This 2020 edition". Both quoted;
           not adjudicated.
```

**C5**

```
URL:       https://ec.europa.eu/eurostat/documents/3859598/13925930/KS-GQ-21-021-EN-N.pdf
LOCATION:  FOREWORD
QUOTE:     "The first ESS quality guidelines for standard quality reports were
           adopted in 2003, accompanied by the first ESS Handbook on Quality Reports
           (EHQR), which was further extended in 2009 to cover all types of
           statistical processes and incorporate the standard ESS Quality and
           Performance Indicators. The ESS Standard for Quality Reports Structure
           (ESQRS), a more detailed quality reporting structure, was launched in
           2010. [...] In order to streamline and simplify quality reporting, the two
           standards – ESQRS and ESMS – were combined in the Single Integrated
           Metadata Structure (SIMS), which was published in 2013. Minor updates
           were made in 2015 and SIMS 2.0 was adopted by the European Statistical
           System Committee."
NAMES:     ESS Handbook on Quality Reports (EHQR)
           ESS Quality and Performance Indicators
           ESS Standard for Quality Reports Structure (ESQRS)
           Euro-SDMX Metadata Structure (ESMS)
           Single Integrated Metadata Structure (SIMS)
TENSE:     PAST (a lineage)
NOTES:     Cadence evidence for both the Handbook node (2003 → 2009 → 2020/2021)
           and the SIMS node (2013 → 2015 v2.0). Also the reason ESQRS and ESMS
           are NOT minted as separate nodes: they are unified inside SIMS, and
           minting them would double-count against SIMS (the `Report.part_of`
           finding in `src/lib/types.ts`).
```

---

## D. Single Integrated Metadata Structure (SIMS)

**D1**

```
URL:       https://ec.europa.eu/eurostat/documents/64157/4373903/SIMS-2-0-Revised-standards-November-2015-ESSC-final.pdf
LOCATION:  Cover page
QUOTE:     "SINGLE INTEGRATED METADATA STRUCTURE V 2.0 (SIMS V2.0) AND ITS
           UNDERLYING REPORTING STRUCTURES THE ESS QUALITY AND REFERENCE METADATA
           REPORTING STANDARDS ESMS 2.0 AND ESQRS 2.0. The revised 2.0 version of
           the Single Integrated Metadata Structure (SIMS 2.0) and its underlying
           reporting structures, the ESS quality and reference metadata reporting
           standards ESMS 2.0 and ESQRS 2.0 were endorsed by the ESSC in November
           2015. SIMS will be the standard for quality reporting according to
           Article 12 of Regulation 223/2009 on European statistics."
NAMES:     Single Integrated Metadata Structure (SIMS 2.0)
           ESMS 2.0
           ESQRS 2.0
           Regulation 223/2009
TENSE:     FUTURE — "SIMS **will be** the standard for quality reporting"
NOTES:     §5b, running forwards. In a 2015 document this is an announced future
           status, not a present-tense statement, and on this project's own rule
           it could not be minted from. The live present-tense confirmation is D2,
           fetched this session — which is exactly the "check whether the release
           states what the methodology document does not" route recorded in
           `EU/slices/README.md`.
```

**D2**

```
URL:       https://ec.europa.eu/eurostat/web/quality/quality-monitoring/quality-reporting
LOCATION:  Main text
QUOTE:     "In the European Statistical System (ESS), the quality of statistical
           processes and outputs is assessed and reported based on three aspects:
           standardised rules reporting structures using a common technical
           environment called the ESS Metadata Handler. The ESS quality reporting
           standard is the Single Integrated Metadata Structure (SIMS)."
NAMES:     Single Integrated Metadata Structure (SIMS)
           ESS Metadata Handler
TENSE:     PRESENT
NOTES:     The bullet structure of the source page flattens into the run-on
           "standardised rules reporting structures using a common technical
           environment" — that is an artefact of tag-stripping a three-item list,
           not a mis-transcription. "ESS Metadata Handler" is a technical
           environment, not a publication — a `redistributed`/infrastructure-shaped
           terminus at best; logged, not minted.
```

**D3**

```
URL:       https://ec.europa.eu/eurostat/web/metadata/reference-metadata-reporting-standards
LOCATION:  "Single integrated metadata structure" section
QUOTE:     "SIMS is the inventory and conceptual framework for all ESS quality and
           reference metadata concepts. The concepts defined in the SIMS standard
           are compatible with the common terminology established by the SDMX
           standard. The 19 high-level concepts are derived from the statistical
           data and metadata exchange (SDMX) cross-domain concepts published in the
           SDMX glossary . For more detailed information about the SIMS standard, we
           recommend reading the 2015 report Single integrated metadata structure
           and its underlying reporting structures ."
NAMES:     Single Integrated Metadata Structure (SIMS)
           SDMX cross-domain concepts
           SDMX glossary
TENSE:     PRESENT
NOTES:     Two adjacent sentences doing different jobs. "are compatible with the
           common terminology established by the SDMX standard" is the §5a trap in
           a metadata key and carries nothing. "The 19 high-level concepts are
           derived from" is the operative clause and is what the SIMS→SDMX Glossary
           edge is built on. Stray spaces before full stops are the source's own
           link markup; quoted unmodified.
```

**D4**

```
URL:       https://ec.europa.eu/eurostat/web/metadata/reference-metadata-reporting-standards
LOCATION:  "Derived structures"
QUOTE:     "Depending on the context, Eurostat may only collect and disseminate a
           subset of the reference metadata concepts defined in SIMS. In particular,
           the following derived structures exist: the Euro-SDMX metadata structure
           (ESMS): the ESMS is a subset of SIMS that focusses on general
           methodological and quality aspects of the statistical production process.
           [...] the ESS standard quality report structure (ESQRS): the ESQRS is a
           subset of SIMS focusing on detailed quality concepts."
NAMES:     Euro-SDMX metadata structure (ESMS)
           ESS standard quality report structure (ESQRS)
           Single Integrated Metadata Structure (SIMS)
TENSE:     PRESENT
NOTES:     Explicit subset language, in Eurostat's own words. Confirms C5's reason
           for not minting ESMS/ESQRS separately.
```

---

## E. SDMX Glossary / Content-Oriented Guidelines

**E1**

```
URL:       https://sdmx.org/wp-content/uploads/SDMx_COG_2016_Introduction.pdf
LOCATION:  Section 4.1 (SDMX Glossary — Introduction)
QUOTE:     "The SDMX Glossary is an SDMX guideline containing concepts and related
           definitions that are useful for building and understanding data and
           metadata exchange arrangements based on SDMX. [...] The Glossary is closely
           linked to the cross-domain concepts as it also contains all these
           concepts, stating their definitions and context descriptions."
NAMES:     SDMX Glossary
           SDMX cross-domain concepts
TENSE:     PRESENT
NOTES:     Confirms from the SDMX side that the cross-domain concepts Eurostat
           names in D3 are contained in the Glossary — i.e. that D3's edge target
           is this document and not some other one.
```

**E2**

```
URL:       https://sdmx.org/wp-content/uploads/SDMx_COG_2016_Introduction.pdf
LOCATION:  Section 4.1
QUOTE:     "The metadata concepts defined in the Glossary are also regularly
           discussed by international organisations within their respective
           constituencies; as a consequence, this list will grow and be updated as
           the SDMX guidelines are used in more and more statistical domains. The
           Glossary should thus be considered as a \"living\" document, open to
           contributions and improvement derived from the use of its concepts within
           SDMX and in national frameworks."
NAMES:     SDMX Glossary
TENSE:     PRESENT
NOTES:     The document's own statement that it is updated recurrently — but with
           no stated interval. This is the cadence evidence, and it is weak: the
           node's `cadence_note` says so and derives the rate from observed
           versions (E3) rather than from a stated commitment.
```

**E3**

```
URL:       https://sdmx.org/guidelines/
LOCATION:  "Glossary" section
QUOTE:     "The SDMx Glossary Version 2.1 (published in December 2020) contains
           concepts and related definitions used in structural and reference
           metadata of international organisations and national data-producing
           agencies."
NAMES:     SDMX Glossary Version 2.1
TENSE:     PRESENT
NOTES:     The site renders the final X of "SDMX" in a styled span, so plain-text
           extraction yields "SDMx" throughout this page. Quoted as extracted;
           the document's own PDFs (E1, E2) use "SDMX". Observed versions on this
           page: subject-matter domain classification "January 2009 version", COG
           Introduction "February 2016", Glossary "Version 2.1 … December 2020".
```

**E4**

```
URL:       https://sdmx.org/wp-content/uploads/SDMx_COG_2016_Introduction.pdf
LOCATION:  Section 1.4 "Maintenance of the Content-Oriented Guidelines"
QUOTE:     "The development and maintenance of the content-oriented guidelines is
           under the responsibility of the SDMX Statistical Working Group (SWG),
           which is made of 20 members from national and international organisations
           from the statistical and central banking worlds."
NAMES:     SDMX Statistical Working Group (SWG)
TENSE:     PRESENT
NOTES:     Publisher evidence for the SDMX Glossary node. The document names the
           SWG and, elsewhere, "the SDMX sponsoring institutions" as a group — it
           does NOT enumerate the seven sponsors anywhere read this session, so the
           node's publisher field does not enumerate them either.
```

---

## F. Edges into nodes that already exist

**F1**

```
URL:       https://ec.europa.eu/eurostat/documents/34693/14172844/2021+ESGAB+Annual+Report.pdf
LOCATION:  Title page
QUOTE:     "Thirteenth annual report by the European Statistical Governance
           Advisory Board to the European Parliament and the Council of the European
           Union on the implementation of the European Statistics Code of Practice
           by Eurostat and the European Statistical System as a whole"
NAMES:     European Statistics Code of Practice
TENSE:     PRESENT
NOTES:     The report naming, on its own cover, the document it assesses against.
           This is the basis for `esgab-annual-report → eu-statistics-code-of-practice`.
           A single edition (2021) was downloaded and read in full this session;
           the node's own cadence was established by a prior session from the
           annual-reports landing page.
```

**F2**

```
URL:       https://ec.europa.eu/eurostat/web/quality/peer-reviews/current-round-2021-2023
LOCATION:  Opening paragraph
QUOTE:     "Peer reviews form part of the European Statistical System (ESS) strategy
           to monitor the implementation of the European Statistics Code of Practice
           (CoP). Their objective is to review the compliance/alignment of the ESS
           with the CoP and help the statistical authorities to further improve and
           develop the national statistical systems."
NAMES:     European Statistics Code of Practice (CoP)
TENSE:     PRESENT
NOTES:     Describes the peer-review exercise, not the final report by title.
```

**F3**

```
URL:       https://ec.europa.eu/eurostat/web/quality/peer-reviews/current-round-2021-2023
LOCATION:  "Reports"
QUOTE:     "As in previous rounds, Eurostat prepared a final report on the third
           round of the European Statistical System peer reviews, which has been
           transmitted to the European Parliament and the Council. This report
           summarises the results of the peer reviews in all members of the ESS."
NAMES:     final report on the third round of the European Statistical System peer reviews
TENSE:     PRESENT/PAST
NOTES:     F2 + F3 together are the basis for
           `ess-peer-review-final-report → eu-statistics-code-of-practice`: F2 says
           the exercise measures compliance with the CoP, F3 says the report
           summarises the results of that exercise. **This is a two-sentence,
           same-page chain rather than one sentence in the report itself** — stated
           plainly because it is weaker than F1. SWD(2024) 136 itself was not
           opened this session; the transparency-register link is recorded as the
           obvious upgrade.
```

---

## G. NOT FOUND / could not be re-verified

**G1 — Regulation (EC) No 223/2009: not re-verifiable at source today.**

```
URL:       https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02009R0223-20241226
           https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A02009R0223-20241226
           https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32009R0223
           https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:02009R0223-20241226
           https://eur-lex.europa.eu/eli/reg/2009/223/2024-12-26
           http://publications.europa.eu/resource/celex/32009R0223
LOCATION:  Articles 2(1), 11(1), 11(2), 12 — wanted, not reached
QUOTE:     NOT FOUND
NAMES:     —
NOTES:     New site behaviour, worth recording. Direct `curl` returns HTTP 202 with
           a zero-byte body for every EUR-Lex URL above. In a real browser, all
           three legal-content forms silently redirect to
           `eur-lex.europa.eu/TodayOJ/index.html` — today's Official Journal — with
           the requested CELEX id preserved as a query parameter and ignored. The
           cellar endpoint returns HTTP 400. This is not the previously recorded
           "EUR-Lex gates non-browser HTTP but works in a real browser" behaviour;
           the browser fails too. Consequence: the staging records' Article 11(1)
           ("The Code of Practice shall aim at ensuring public trust…") and 11(2)
           ("The Code of Practice shall be reviewed and updated as necessary by the
           ESS Committee…") could NOT be re-read at source, so no
           `eu-regulation-223-2009` node and no CoP→Regulation edge were minted.
           Recorded as `_dropped` `deferred`.
```

**G2 — ESS Quality and Performance Indicators (2014): no cadence found.**

```
URL:       https://ec.europa.eu/eurostat/web/quality/quality-monitoring/quality-reporting
LOCATION:  "Tools and standards" list
QUOTE:     "ESS handbook for quality and metadata reports (re-edition 2021); Single
           Integrated Metadata Structure Guidelines v2.0 (2019); ESS Quality and
           Performance Indicators (2014); Single Integrated Metadata Structure v 2.0
           – ESMS 2.0 and ESQRS 2.0 (2015); ESS Quality Glossary; Checklist for
           Survey Managers (DESAP)."
NAMES:     ESS Quality and Performance Indicators (2014)
           ESS Quality Glossary
           Checklist for Survey Managers (DESAP)
TENSE:     PRESENT
NOTES:     Searched this page and the EHQMR's foreword for a second edition or a
           stated review interval for the QPIs: NOT FOUND (strings searched:
           "Quality and Performance Indicators", "QPI", "2014", "revised",
           "edition"). One dated publication with no cadence is not a node under
           §4(2) — recorded `no-node-yet`. Same treatment for the ESS Quality
           Glossary and DESAP.
```
