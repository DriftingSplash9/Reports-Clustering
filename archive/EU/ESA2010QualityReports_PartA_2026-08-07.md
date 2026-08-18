# ESA 2010 quality reporting — Part A extraction record

**Date:** 2026-08-07. **Slice S2**, from staging batch 67, following S1
(`EU/EDPInventory_PartA_2026-08-07.md`). Governing brief: `Research.1.md`
§§2, 3, 4, 5a, 6, 7.

**Everything below was read from source this session.** Batch 67's five staged
records all matched (unlike batch 64 — see S1 §E), but the batch turned out to
be a fragment of the chain rather than the chain: five records covering one
Implementing Regulation, and the actual publication it governs is not in
staging at all.

**What was read in full:** Commission Implementing Regulation (EU) 2016/2304,
ELI form, complete including the Annex (24,942 chars after tag-stripping);
Regulation (EU) No 549/2013 consolidated text, Article 4 (the full document is
1.95M chars; Article 4 read in place); Regulation (EC) No 223/2009 consolidated
text of 26/12/2024, Articles 11 and 12 (75,650 chars); the *Quality report on
national and regional accounts — 2024 data transmissions — 2025 edition*, 121
pages, `pypdf` (238,398 chars); the European Statistics Code of Practice 2017,
11 pages, `pypdf` (26,033 chars).

**What was not read:** the earlier seven editions of the Eurostat quality
report; any national quality report (none is published — see §A9); Chapters 4–10
of the 2025 edition, which are the country-by-country analysis.

**Transcription convention:** EUR-Lex consolidated texts carry in-line amendment
markers (`►M1 … ◄`, `▼B`) which are stripped below; no words changed. The
Eurostat PDF has line-break hyphenation ("submit-ted", "perio-dicity") which is
rejoined; the CoP PDF loses inter-word spacing in `pypdf` and is quoted
whitespace-normalised.

---

## A. Commission Implementing Regulation (EU) 2016/2304

All records share:

```
URL:  https://eur-lex.europa.eu/eli/reg_impl/2016/2304/oj/eng
```

Full title, from the document: *"Commission Implementing Regulation (EU)
2016/2304 of 19 December 2016 on the modalities, structure, periodicity and
assessment indicators of the quality reports on data transmitted pursuant to
Regulation (EU) No 549/2013 of the European Parliament and of the Council"*,
signed *"Done at Brussels, 19 December 2016. For the Commission, The President,
Jean-Claude JUNCKER"*.

```
ID:       A1
LOCATION: Article 1
QUOTE:    "The quality report on national and regional accounts referred to in
          Article 4(2) of Regulation (EU) No 549/2013 shall cover the data sent
          by Member States in accordance with the ESA 2010 transmission
          programme as laid down in Annex B to Regulation (EU) No 549/2013 in
          the year preceding the report. Member States shall provide the quality
          report on an annual basis."
NAMES:    Regulation (EU) No 549/2013 (ESA 2010)
          ESA 2010 transmission programme (Annex B)
TENSE:    PRESENT
NOTES:    THE STATED INTERVAL — "on an annual basis" — which is exactly what the
          EDP inventory chain in S1 lacked. Matches the staged record
          `impl-reg-2016-2304-art1` verbatim.
```

```
ID:       A2
LOCATION: Article 2
QUOTE:    "The modalities, structure and assessment indicators of the quality
          reports on national and regional accounts referred to in Article 1
          shall be those set out in the Annex."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    Matches the staged record verbatim.
```

```
ID:       A3
LOCATION: Annex — 1. Introduction
QUOTE:    "The quality report on national and regional accounts shall contain
          both quantitative indicators and qualitative descriptions of the
          quality of the data sent the previous year. The Commission (Eurostat)
          shall provide to Member States the results of the quantitative
          indicators, calculated on the basis of the data provided. Member States
          shall interpret and comment on them, in accordance with their
          compilation methodology and statistical production process."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    Matches the staged record verbatim. Note the two-way flow: Eurostat
          computes the indicators, the Member State interprets them.
```

```
ID:       A4
LOCATION: Annex — 2. Modalities
QUOTE:    "Before 15 February 2017 and every year thereafter, the Commission
          (Eurostat) shall supply the Member States with draft documents for
          quality reports partially pre-filled with all the quantitative
          assessment indicators specified in Section 4. Every year, not later
          than 31 May, Member States shall provide the Commission (Eurostat)
          with the completed quality report."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    Matches the staged record verbatim. Two dated annual deadlines and no
          publication step between them — see A9.
```

```
ID:       A5
LOCATION: Annex — 3. Structure
QUOTE:    "Each Member State shall submit a single quality report covering all
          the tables of the ESA 2010 transmission programme as set out in Annex B
          to Regulation (EU) No 549/2013. The quality reports shall include
          information on all the quality criteria laid down in Article 12(1) of
          Regulation (EC) No 223/2009. The information shall be presented
          according to the following structure: Relevance; Accuracy and
          reliability; Timeliness and punctuality; Accessibility and clarity;
          Coherence and comparability. Information about the ESA 2010
          implementation already provided by Member States shall be reused by the
          Commission and shall not be requested in the quality reports."
NAMES:    Regulation (EC) No 223/2009 Article 12(1)
          ESA 2010 transmission programme (Annex B)
TENSE:    PRESENT
NOTES:    Matches the staged record verbatim.
```

```
ID:       A6
LOCATION: Annex — 4.2 Qualitative information, indicator 2
          ("Documentation on methodology")
QUOTE:    "List of national publications on the data sources used and methodology
          applied containing the titles of these publications and links to them,
          if available"
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    **THE FIND OF THIS SLICE, AND IT IS NOT AN EDGE.** Every EU instrument
          this branch has followed to the national boundary has stopped at
          AGENCY ONLY — Annex XI, ESA 2010's Annex B, and (in S1) Article 9 of
          Regulation 479/2009. This provision does something none of them does:
          it **requires the Member States to name their own publications by
          title, with links, annually, all 27**. The EU still names nothing
          itself — the Regulation is AGENCY ONLY on its own face, as always —
          but it compels the naming. Read against `EU/slices/README.md`'s
          disclosure-runs-upward finding, this is the mechanism by which the
          upward disclosure exists at all: it is not voluntary candour at the
          national end, it is a reporting requirement drafted at the
          supranational end. The catch is A9: nothing requires the resulting
          lists to be published, and they are not.
          "if available" is doing visible work on the links and not on the
          titles — the titles are required unconditionally.
```

```
ID:       A7
LOCATION: Annex — 4.2 Qualitative information, indicators 1 and 3
QUOTE:    "1. Data revision policy — Metadata on national data revision policy
          containing: links to existing metadata published nationally; brief
          information about benchmark revisions and/or major routine revisions
          and their impacts on gross domestic product. […] 3. Length of
          comparable time series over time — Metadata on the length of comparable
          time series over time containing: links to existing metadata published
          nationally; brief information about the length of comparable time
          series, breaks in the time series and explanations for the breaks."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    Recorded separately from A6 because they are separate numbered
          indicators and §6 forbids bundling. Same shape, weaker: these compel
          links to *metadata*, not titles of *publications*. The ellipsis falls
          between two numbered rows, not inside either.
```

```
ID:       A8
LOCATION: Recital (5)
QUOTE:    "As the information in the quality reports on national and regional
          accounts should be based on the European Statistical System standards
          on quality reporting published by the Commission (Eurostat), the Annex
          to this Regulation should be drawn up in line with those standards.
          Information about the ESA 2010 implementation already provided by
          Member States should be reused by the Commission and should not be
          requested in the quality reports."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    **AGENCY ONLY WHERE A STANDARD WOULD BE NAMED, AND THE STANDARD IS A
          NODE.** "The European Statistical System standards on quality reporting
          published by the Commission (Eurostat)" is SIMS —
          `ess-sims`, minted by `G.50.md` on Eurostat's own present-tense
          statement that "The ESS quality reporting standard is the Single
          Integrated Metadata Structure (SIMS)". The Regulation declines to say
          so. Searched the whole instrument for the standard by name: **NOT
          FOUND** (strings searched: "SIMS", "Single Integrated", "ESMS",
          "ESQRS", "handbook", "Handbook" — zero hits for each across all 24,942
          characters). So the tempting edge 2016/2304 -> ess-sims is not
          mintable, and the reason is `Research.1.md` §6's AGENCY ONLY rather
          than absence. Compare D2, where the report produced under this
          Regulation names SIMS outright.
          Note also "should be drawn up in line with" — recital language, and
          "in line with" is §5a family. Two independent reasons not to mint.
```

```
ID:       A9
LOCATION: whole instrument
RESULT:   NOT FOUND — no publication requirement
NOTES:    **THE DECISIVE ABSENCE, and the reason no national node comes out of
          this slice.** Regulation 479/2009 Article 9(4) says "Member States
          shall make their inventories public" (S1, record A8). Nothing in
          2016/2304 says anything equivalent. Article 1 and Annex §2 require
          Member States to "provide the Commission (Eurostat) with the completed
          quality report" and stop there.
          STRINGS SEARCHED, across the full text: "shall be made public",
          "publish", "publication", "public". "publish" occurs once (recital 5,
          quoted at A8, describing standards published by Eurostat) and
          "publication" once (Article 3, the Regulation's own entry into force
          on publication in the Official Journal). Neither concerns the reports.
          SO THE TWO INSTRUMENTS ARE COMPLEMENTARY FAILURES: 479/2009 compels a
          published national document but states no interval; 2016/2304 states
          the interval — "on an annual basis" — and compels no publication.
          Each supplies exactly what the other lacks and neither supplies both,
          so neither produces a mintable member-state node. That symmetry is
          the result; it is not an artefact of how hard I looked.
```

---

## B. Regulation (EU) No 549/2013 (ESA 2010) — Article 4

```
URL:      https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02013R0549-20150824
```

```
ID:       B1
LOCATION: Article 4 ("Quality assessment"), paragraphs 1–3
QUOTE:    "1. For the purpose of this Regulation, the quality criteria set out in
          Article 12(1) of Regulation (EC) No 223/2009 shall apply to the data to
          be transmitted in accordance with Article 3 of this Regulation.
          2. Member States shall provide the Commission (Eurostat) with a report
          on the quality of the data to be transmitted in accordance with
          Article 3. 3. In applying the quality criteria referred to in
          paragraph 1 to the data covered by this Regulation, the modalities,
          structure, periodicity and assessment indicators of the quality reports
          shall be defined by the Commission by means of implementing acts."
NAMES:    Regulation (EC) No 223/2009
TENSE:    PRESENT
NOTES:    The parent obligation. Paragraph 1 is a dependency of ESA 2010 itself
          on Regulation 223/2009 — "the quality criteria set out in Article 12(1)
          of Regulation (EC) No 223/2009 **shall apply**". That is application,
          not comparability: §5a does not reach it. `esa-2010` currently has
          **zero** outgoing dependencies in the corpus; this is one.
          NOT IN THE STAGED RECORDS — batch 67 carried the implementing act and
          not its parent.
RETRIEVAL: The URL above is the 24/08/2015 consolidated version. EUR-Lex's own
          version list shows four consolidations — 16/07/2013, 24/08/2015,
          01/09/2024 and 01/09/2025 — with **01/09/2025 flagged as current**.
          Article 4 was read in the 2015 text. Flagged rather than resolved: the
          `esa-2010` node's `releases_per_year` of 0.05 is a claim about the
          generation of the standard, and four consolidations in twelve years is
          a different quantity pointing at roughly 0.33. `esa-2010.json`'s own
          `_open_questions` already raises this; this is a second datum for it,
          not a new answer.
```

---

## C. Regulation (EC) No 223/2009 on European statistics

```
URL:      https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02009R0223-20241226
```

**Retrieval note.** `G.50.md` Cheap check 3 asked for one retry of EUR-Lex,
saying that if it served, "the Regulation node and the CoP → Regulation edge are
ready to mint from quotes already staged and re-checkable in minutes." **It
served.** Both quotes re-checked below in minutes, as predicted. The node is
minted; the edge is not, and §E is why.

```
ID:       C1
LOCATION: Title block and consolidated-versions list
QUOTE:    "REGULATION (EC) No 223/2009 OF THE EUROPEAN PARLIAMENT AND OF THE
          COUNCIL of 11 March 2009 on European statistics and repealing
          Regulation (EC, Euratom) No 1101/2008 of the European Parliament and of
          the Council on the transmission of data subject to statistical
          confidentiality to the Statistical Office of the European Communities,
          Council Regulation (EC) No 322/97 on Community Statistics, and Council
          Decision 89/382/EEC, Euratom establishing a Committee on the
          Statistical Programmes of the European Communities"
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    EUR-Lex's version list shows the current consolidated version as
          26/12/2024, with one earlier consolidation at 08/06/2015 — two across
          the 17 years since adoption, the same observed shape as
          Regulation 479/2009 in S1, and the cadence is derived the same way.
```

```
ID:       C2
LOCATION: Article 11(1)
QUOTE:    "The Code of Practice shall aim at ensuring public trust in European
          statistics by establishing how European statistics are to be developed,
          produced and disseminated in conformity with the statistical principles
          as set out in Article 2(1) and best international statistical
          practice."
NAMES:    Code of Practice
TENSE:    PRESENT
NOTES:    Matches the staged record `reg-223-article11-1` verbatim.
```

```
ID:       C3
LOCATION: Article 11(2)
QUOTE:    "The Code of Practice shall be reviewed and updated as necessary by the
          ESS Committee. The Commission shall publish amendments thereto."
NAMES:    Code of Practice
TENSE:    PRESENT
NOTES:    Matches the staged record `reg-223-article11-2` verbatim. Read with
          §E: the Regulation asserts authority over the Code of Practice, and
          the Code of Practice describes itself as complementing rather than
          deriving from the Regulation. Both quoted; neither adjudicated.
```

```
ID:       C4
LOCATION: Article 12(1)
QUOTE:    "To guarantee the quality of results, European statistics shall be
          developed, produced and disseminated on the basis of uniform standards
          and of harmonised methods. In this respect, the following quality
          criteria shall apply: (a) 'relevance' […] (b) 'accuracy' […] (c)
          'timeliness' […] (d) 'punctuality' […] (e) 'accessibility' and
          'clarity' […] (f) 'comparability' […] (g) 'coherence' […]"
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    The seven criteria that ESA 2010 Article 4(1) applies and that
          2016/2304's Annex §3 structures the national reports around. Quoted
          with the seven definitions elided — each is a lettered sub-paragraph
          and the operative clause ("the following quality criteria shall
          apply") is intact. "harmonised methods" appears here in a §5a-adjacent
          position; it describes what European statistics must be, not a
          relationship between two publications, so §5a does not bite.
```

---

## D. Quality report on national and regional accounts (Eurostat)

```
URL:      https://ec.europa.eu/eurostat/en/web/products-statistical-reports/w/ks-01-25-052
PDF:      https://ec.europa.eu/eurostat/documents/7870049/22537893/KS-01-25-052-EN-N.pdf
```

```
ID:       D1
LOCATION: Product page and cover
QUOTE:    "Quality report on national and regional accounts – 2024 data
          transmissions – 2025 edition". Publisher: Eurostat. Publication date:
          12 November 2025. Product code KS-01-25-052. ISBN 978-92-68-33178-1,
          ISSN 2529-3222, DOI 10.2785/2799955.
NAMES:    Quality report on national and regional accounts
TENSE:    PRESENT
NOTES:    **NOT IN THE STAGED RECORDS AT ALL.** Batch 67 carried the Regulation
          that governs this publication and nothing about the publication. It
          was found by searching for what 2016/2304 produces.
          An ISSN is present, which is a series identifier — direct evidence
          this is a recurrent publication rather than a one-off.
          Observed editions, from Eurostat's own product listings: KS-FT-18-004
          (2016 data, 17 May 2018), KS-FT-19-009 (2018 data), KS-FT-20-007
          (2019 data), KS-FT-21-009 (2020 data), KS-FT-22-008 (2021 data),
          KS-FT-23-002 (2022 data), KS-01-24-023 (2023 data), KS-01-25-052
          (2024 data) — eight editions across 2018–2025, annual.
          Title convention: the corpus records 72 of 74 annual reports with no
          year in the title, so the node title drops "2024 data transmissions –
          2025 edition".
```

```
ID:       D2
LOCATION: Executive summary, page 5
QUOTE:    "This document presents Eurostat's assessment of the quality of
          national and regional accounts data submitted by the EU Member States,
          as well as Iceland, Norway and Switzerland, in 2024. It also includes
          information on the quality of key European aggregates published by
          Eurostat. The assessment in this quality report is based on the
          national quality reports exercise for data transmissions during 2024.
          It is the eighth such report since the European System of Accounts 2010
          (ESA 2010) was introduced in September 2014. The quality assessment was
          carried out in accordance with Article 4 of the ESA 2010 Regulation
          (Regulation (EU) No 549/2013). This requires the quality of national and
          regional accounts data sent to Eurostat to be assessed against the
          quality criteria set out in the Regulation on European statistics
          (Regulation (EC) No 223/2009). Commission Implementing Regulation (EU)
          2016/2304 sets out the modalities, structure, periodicity and
          indicators of the assessment process. The quality report covers a
          number of quality indicators (completeness, revision policy and
          practice, punctuality, coherence and documentation on methodology),
          adhering to the requirements for the Single Integrated Metadata
          Structure, which were endorsed by the European Statistical System
          Committee in November 2015."
NAMES:    Regulation (EU) No 549/2013 (ESA 2010)
          Regulation (EC) No 223/2009
          Commission Implementing Regulation (EU) 2016/2304
          Single Integrated Metadata Structure
          national quality reports
TENSE:    PRESENT
NOTES:    **FOUR EDGE-BEARING CLAUSES IN ONE PARAGRAPH**, all in the dependent
          document's own words about itself, which is the strongest shape this
          project recognises. Three are minted; the fourth is not, because the
          national quality reports are not nodes (A9).
          **THE STRUCTURAL POINT: this report names the standard that the
          Regulation governing it would not name.** 2016/2304 recital (5) says
          only "the European Statistical System standards on quality reporting
          published by the Commission (Eurostat)" (A8). This report says "the
          Single Integrated Metadata Structure". Same standard, and only the
          non-legislative document will say its name. That is `G.50.md`'s
          two-layer finding — the legislative layer names nobody, the
          self-regulatory layer names its sources freely — reproduced inside a
          single chain, with the boundary falling exactly between an instrument
          and the report published under it.
          "adhering to the requirements for" is obligation language and is not
          on §5a's watchlist. "in accordance with" likewise.
          "It is the eighth such report since… September 2014" is the cadence
          statement, and it is the publication's own count.
```

```
ID:       D3
LOCATION: §3.2 "Classifications used in ESA 2010"
QUOTE:    "Classifications used in ESA 2010 • Classification of institutional
          sectors • Statistical Classification of Economic Activities in the
          European Community (NACE), Rev. 2 (2008) • Statistical Classification
          of Products by Activity, Version 2.1 (CPA) • Classification of
          Individual Consumption by Purpose (COICOP), COICOP 2018 • Classifications
          of functions of government (COFOG) • Nomenclature of territorial units
          for statistics (NUTS), 2024 version"
NAMES:    NACE Rev. 2 (2008)
          Classification of Products by Activity (CPA), Version 2.1
          COICOP 2018
          COFOG
          NUTS 2024
TENSE:    PRESENT
NOTES:    EVIDENCE FOR A CANDIDATE CATEGORY, NOT AN EDGE HERE. "Classifications
          used in ESA 2010" is a use claim, from Eurostat, about the corpus's own
          `esa-2010` node — and not one of these five classifications is a node.
          `naics`, `isic` and `anzsic` all are. This is the single strongest
          statement I have found for the NACE/CPA gap logged in
          `planning/rolling-todo.md`. Not minted here because the targets do not
          exist and because a node should be built from the programmes that use
          it (§7's counter-intuitive rule) rather than bolted on as a list item.
          The section is a heading followed by bullets with no numbering, so each
          classification has no citable location of its own — which is why this
          is one record naming five things rather than five records, and why it
          is a lead rather than evidence for five edges.
```

```
ID:       D4
LOCATION: §3.3 "Manuals and guidelines", closing sentences
QUOTE:    "ESA 2010 is broadly aligned with SNA 2008 to make comparable analysis
          with non-EU economies possible. The ESS has put together several manuals
          and guidelines to facilitate the implementation of the ESA 2010 in
          Member States."
NAMES:    SNA 2008
TENSE:    PRESENT
NOTES:    A FOURTH INDEPENDENT §5a INSTANCE ON THE SAME PROPOSED EDGE.
          `esa-2010.json` records three statements refusing `esa-2010 ->
          sna-2008` — "is consistent with", "is fully consistent with", "fully
          consistent with" — and notes the edge "was re-proposed this session"
          and will be again. Here is a fourth, in different words: "broadly
          aligned with", plus "comparable analysis" in the same sentence. Two
          watchlist phrases in fourteen words. Recorded so the count keeps
          rising and the edge keeps not being minted.
          The same section lists seven manuals and guidelines by name — including
          "Practical guidelines for revising ESA 2010 data" and "Consistency of
          ESA 2010 based national accounts", both of which are in staging batch 0
          — which is further evidence for the EU-methodological-manuals candidate
          category.
```

---

## E. The Code of Practice refuses the edge G.50 expected

```
ID:       E1
URL:      https://ec.europa.eu/eurostat/documents/4031688/8971242/KS-02-18-142-EN-N.pdf
LOCATION: "The common quality framework of the European Statistical System"
          (preamble section, page 4)
QUOTE:    "The common quality framework of the European Statistical System is
          composed of the European Statistics Code of Practice, the Quality
          Assurance Framework of the European Statistical System and the general
          quality management principles (such as continuous interaction with
          users, commitment of leadership, partnership, staff satisfaction,
          continuous improvement, integration and harmonisation). This
          self-regulatory common quality framework complements the extensive
          legal framework of the European Statistical System based on the
          Regulation (EC) No 223/2009 on European statistics which itself derives
          from the Treaty on the Functioning of the European Union."
NAMES:    European Statistics Code of Practice
          Quality Assurance Framework of the European Statistical System
          Regulation (EC) No 223/2009
TENSE:    PRESENT
NOTES:    **THIS SETTLES `G.50.md`'S DEFERRED ITEM, AND NOT THE WAY IT EXPECTED.**
          G.50 filed `eu-statistics-code-of-practice -> Regulation (EC) No
          223/2009` as `deferred` on the ground that EUR-Lex was unreachable and
          the Regulation's Article 11(1)/(2) "would support both a Regulation
          node and this edge". EUR-Lex is now reachable, both articles are
          verified (C2, C3) — and the edge still should not be minted, for a
          reason G.50 could not have seen from the Regulation's side.
          **The Code of Practice's own words are "complements".** That is §5a
          family — the same register as "consistent with" and "aligned with" —
          and it is not incidental phrasing: the sentence is explicitly drawing
          the line between a "self-regulatory" framework and a "legal framework",
          and putting the CoP on the self-regulatory side.
          So there are two documents pointing opposite ways. The Regulation says
          the Code of Practice's aim is set by the Regulation and that the ESS
          Committee reviews it under Article 11. The Code of Practice says it
          complements the legal framework based on the Regulation. **Both are
          quoted; neither is picked**, per §3, and the `_dropped` reason moves
          from `deferred` (a retrieval problem, now solved) to a documented
          conflict.
          Worth noting what this does for `G.50.md`'s headline. G.50 argued that
          the EU's legislative layer names nobody while its self-regulatory layer
          names its sources freely, and inferred the two-layer structure. **The
          Code of Practice states that structure in its own words** — "this
          self-regulatory common quality framework complements the extensive
          legal framework". A logged inference, confirmed verbatim by the
          document at its centre.
NOT FOUND: no citation of Regulation 223/2009 anywhere else in the CoP's 11
          pages, and no occurrence of "Article 11" (strings searched: "223/2009",
          "Regulation (EC) No 223/2009", "Article 11").
```

---

## F. What batch 67 turned out to be

Staging batch 67's five records all match their source, and all five are the
Implementing Regulation. **None of them is the publication.** The Eurostat
quality report — eight editions, an ISSN, a stated cadence and four documented
dependencies — is absent from the blob entirely, and was found only by asking
what the Regulation produces.

That is worth carrying forward as a method note, because it generalises: **the
staged batches are organised around instruments, and the instruments are usually
not the nodes.** S1 hit the same shape from the other side — batch 64 was a
national document whose named publications were not in staging either. In both
slices the mintable material was one search away from the staged material, and
in neither case would working the batch alone have found it.

---

## G. Part B — soft connections arising

Per `Research.1.md` §11. Provisional, non-authoritative.

| id | from | to | nature | strength | evidence | notes |
|---|---|---|---|---|---|---|
| sc-e6 | `eurostat-national-accounts-quality-report` | 27 national quality reports | assessment based on | Strong | D2, A1 | *"based on the national quality reports exercise"*. Blocked because the reports are unpublished (A9), not because the statement is weak. |
| sc-e7 | 27 national quality reports | national publications named in them | compelled disclosure | Strong | A6 | The lists exist by law, annually, for all 27. If any Member State publishes its quality report voluntarily, that one document is a data-sources table in §7's sense. **The cheapest test of the whole EU branch.** |
| sc-e8 | `esa-2010` | NACE, CPA, COICOP, COFOG, NUTS | classifications used | Strong | D3 | None of the five is a node. |
| sc-e9 | 2016/2304 | `ess-sims` | drawn up in line with | Weak | A8 | AGENCY ONLY plus §5a language. Recorded so it is not re-proposed. |
| sc-e10 | `eu-reg-479-2009` | `eu-reg-223-2009` | without prejudice to | Weak | S1 A3 | *"without prejudice to the provisions of Regulation (EC) No 223/2009 … relating to statistical confidentiality"* is a savings clause, not a dependency. Not minted. |
