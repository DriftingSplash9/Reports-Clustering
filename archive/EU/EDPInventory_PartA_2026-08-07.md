# EDP Inventory chain — Part A extraction record

**Date:** 2026-08-07. **Slice S1**, built from staging batches 3, 4, 64 (batch 67
assessed and deferred — see §F). Governing brief: `Research.1.md` §§2, 4, 5a, 5b, 6, 7.

**Every quote below was re-fetched and re-read from its primary source this
session**, per the discipline `G.50.md` established. It paid: **five staged
records do not match their sources**, and one of the mismatches sits under a
prior session's headline conclusion. Discrepancies are in §E.

**What was read in full:** Council Regulation (EC) No 479/2009, consolidated text
of 01/09/2014, via EUR-Lex HTML (33,639 chars after tag-stripping); Eurostat's
EDP inventories page via `curl` (6,182 chars after tag-stripping); the German EDP
inventory PDF, 170 pages, via `pypdf` (455,697 chars).

**What was not read:** the Annex I unit lists attached to each inventory; the 26
non-German inventories; Commission Implementing Regulation (EU) 2016/2304
(staging batch 67 — assessed, not extracted, see §F); the Report on the Quality
of Fiscal Data Reported by EU Member States, which is already a node
(`eurostat-edp-gfs-quality-report`) and whose own text would settle one edge
left in `_dropped`.

**Transcription conventions used, so nobody greps for a string that is not
there:**

- The EUR-Lex consolidated text carries in-line amendment markers — `►M2 … ◄`
  around text inserted by amendment, `▼M1` / `▼B` as block markers. **These are
  stripped from the quotes below**, which is how the staged records also
  rendered them. No words changed. The unstripped form of A1 reads
  `►M2 For the purposes of the Protocol … ◄`.
- The German inventory PDF has broken intra-word spacing from its typesetting
  (`"deta iled"`, `"quart erly"`, `"Financ e"`). Quotes from it are
  **whitespace-normalised**. No words changed. Same treatment `G.50.md` recorded
  for the QAF v2.0 PDF.
- The PDF renders `ä` as `ae` in one place (`Glaeubigerklassen`). Quoted as
  printed; the staged record had silently corrected it to `Gläubigerklassen`.

---

## A. Council Regulation (EC) No 479/2009

All nine records share:

```
URL:  https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02009R0479-20140901
```

**Retrieval note, and it scores a logged prediction.** `G.50.md` Finding 4
recorded, on 2026-08-07, that EUR-Lex served nothing to either `curl` or a real
browser — HTTP 202 with a zero-byte body for every legal-content and ELI form.
**Retried this session, same day, and it works**: HTTP 200, 317,081 bytes for
the legal-content form and HTTP 200, 348,210 bytes for the ELI form
(`https://eur-lex.europa.eu/eli/reg/2009/479/oj/eng`). The outage was
transient. `G.50.md` Cheap check 3 is discharged. Its instruction —
*"Worth one retry per session before assuming it is permanent"* — was correct
and should stay in the hand-off.

EUR-Lex's own header for this document: *"Council Regulation (EC) No 479/2009 of
25 May 2009 on the application of the Protocol on the excessive deficit procedure
annexed to the Treaty establishing the European Community (Codified version)"*,
with the consolidated-versions list showing exactly two — **19/08/2010** and
**01/09/2014** — and 01/09/2014 flagged as the current version.

---

```
ID:       A1
LOCATION: Article 1(1)
QUOTE:    "For the purposes of the Protocol on the excessive deficit procedure
          and of this Regulation, the terms in paragraphs 2 to 6 are defined
          according to Regulation (EU) No 549/2013 of the European Parliament
          and the Council of 21 May 2013 on the European system of national and
          regional accounts in the European Union (hereinafter referred to as
          ESA 2010). The codes in brackets refer to ESA 2010."
NAMES:    Regulation (EU) No 549/2013
          European system of national and regional accounts (ESA 2010)
TENSE:    PRESENT
NOTES:    "are defined according to" is derivation language, not 5a agreement
          language. This is one Regulation taking its operative definitions from
          another. Whole clause is amendment-inserted (M2, 2013) — the original
          2009 text referred to ESA 95.
```

```
ID:       A2
LOCATION: Article 8(1)
QUOTE:    "The Commission (Eurostat) shall regularly assess the quality both of
          actual data reported by Member States and of the underlying government
          sector accounts compiled according to ESA 2010 (hereinafter referred to
          as government accounts). Quality of actual data means compliance with
          accounting rules, completeness, reliability, timeliness, and
          consistency of the statistical data. The assessment will focus on areas
          specified in the inventories of Member States such as the delimitation
          of the government sector, the classification of government transactions
          and liabilities, and the time of recording."
NAMES:    ESA 2010
          inventories of Member States
TENSE:    PRESENT
NOTES:    "The assessment will focus on areas specified in the inventories" —
          Eurostat's quality work consuming the national inventories. This is the
          upward leg. AGENCY ONLY as to which inventory: the Regulation names the
          class, never an instance.
```

```
ID:       A3
LOCATION: Article 8(2)
QUOTE:    "Member States shall provide the Commission (Eurostat), as promptly as
          possible, with the relevant statistical information requested for the
          needs of the data quality assessment, without prejudice to the
          provisions of Regulation (EC) No 223/2009 of the European Parliament
          and of the Council of 11 March 2009 on European statistics relating to
          statistical confidentiality. The statistical information referred to in
          the first subparagraph shall be limited to the information strictly
          necessary to check the compliance with ESA rules. In particular,
          'statistical information' means: (a) data from national accounts;
          (b) inventories; (c) EDP notification tables; (d) additional
          questionnaires and clarification related to the notifications. The
          format of the questionnaires shall be defined by the Commission
          (Eurostat) after consultation of the Committee on Monetary, Financial
          and Balance of Payments Statistics (hereinafter referred to as CMFB)."
NAMES:    Regulation (EC) No 223/2009
          inventories
          EDP notification tables
          Committee on Monetary, Financial and Balance of Payments Statistics
TENSE:    PRESENT
NOTES:    QUOTED IN FULL. The staged record put an ellipsis where the second
          sentence is — see E4. "EDP notification tables" is an existing node,
          `eurostat-edp-notification-tables`. "additional questionnaires" is a
          terminus candidate, kind `unpublishable`: named, real, load-bearing,
          and the Regulation says the Commission defines its format rather than
          publishes it.
```

```
ID:       A4
LOCATION: Article 8(3)
QUOTE:    "The Commission (Eurostat) shall report regularly to the European
          Parliament and to the Council on the quality of the actual data
          reported by Member States. The report shall address the overall
          assessment of the actual data reported by Member States as regards to
          the compliance with accounting rules, completeness, reliability,
          timeliness, and consistency of the data."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    This creates the report already in the corpus as
          `eurostat-edp-gfs-quality-report` ("Report on the Quality of Fiscal
          Data Reported by EU Member States") — but the Regulation does not
          NAME it. AGENCY ONLY at the point where a title would settle it, which
          is why the edge is `_dropped` rather than minted. "regularly" is the
          only cadence word; no interval.
```

```
ID:       A5
LOCATION: Article 9(1)
QUOTE:    "Member States shall provide the Commission (Eurostat) with a detailed
          inventory of the methods, procedures and sources used to compile actual
          deficit and debt data and the underlying government accounts."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    THE CORE PROVISION. Note what it does that ESA 2010's Annex B does not:
          it obliges a DOCUMENT into existence, not a data transmission. Annex B
          obliges tables — "a programme setting out the time limits by which
          Member States shall transmit the accounts and tables" (Art. 1(2) of
          Reg. 549/2013, quoted in EU/AnnexB_assessment_2026-08-05.md). This
          obliges an inventory. Still AGENCY ONLY as to title: the Regulation
          names no member state's inventory.
```

```
ID:       A6
LOCATION: Article 9(2)
QUOTE:    "The inventories shall be prepared in accordance with guidelines
          adopted by the Commission (Eurostat) after consultation of CMFB."
NAMES:    CMFB
TENSE:    PRESENT
NOTES:    "guidelines adopted by the Commission (Eurostat)" — an unnamed
          instrument that determines the content of all 27 inventories. Terminus
          candidate, kind `unidentified`: the provision names a slot and
          something outside it fills the slot, the same shape as Alberta's
          "commodity brokers specified" case in Research.1.md §4. C3 below dates
          the endorsement to June 2012 but still gives the guidelines no title.
```

```
ID:       A7
LOCATION: Article 9(3)
QUOTE:    "The inventories shall be updated following revisions in the methods,
          procedures and sources adopted by Member States to compile their
          statistical data."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    THE CADENCE PROBLEM, in the Regulation's own words. This is an
          event-triggered update obligation, not an interval. §4.2 wants a
          cadence and this provision structurally cannot supply one. See C1/C3
          and the `_open_questions` in the slice.
```

```
ID:       A8
LOCATION: Article 9(4)
QUOTE:    "Member States shall make their inventories public."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    THE SECOND HALF OF WHAT MAKES THIS DIFFERENT FROM ANNEX B. Nine words,
          and they are what turns a reporting obligation into a published
          document class — §4's precondition for a node. Annex B has no
          equivalent provision.
```

```
ID:       A9
LOCATION: Article 7
QUOTE:    "Member States shall make public the actual deficit and debt data and
          other data for past years reported to the Commission (Eurostat) in
          accordance with Articles 3 to 6."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    Recorded because it is the same drafting move applied to DATA rather
          than to a document, in the same instrument — which is what makes
          Art. 9(4) legible as deliberate. Not an edge; no publication named.
```

---

## B. Eurostat — EDP inventories page

All four records share:

```
URL:  https://ec.europa.eu/eurostat/web/government-finance-statistics/excessive-deficit-procedure/edp-inventories
```

```
ID:       B1
LOCATION: Main introductory text, first paragraph
QUOTE:    "The availability of detailed and comprehensive inventories for the
          excessive deficit procedure (EDP) is critical for the quality
          assessment of EDP statistics and government finance statistics (GFS)
          and for identifying possible risks that might impact the reliability of
          the data."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    Matches the staged record `edp-inv-purpose` exactly.
```

```
ID:       B2
LOCATION: Main introductory text, second paragraph
QUOTE:    "The ESA 2010-based EDP inventories contain information on the methods,
          procedures, and sources used to compile the actual deficit and debt
          data and the underlying government accounts."
NAMES:    ESA 2010
TENSE:    PRESENT
NOTES:    Matches the staged record `edp-inv-content` exactly.
```

```
ID:       B3
LOCATION: Main introductory text, third paragraph
QUOTE:    "Pursuant to Article 9 of Council regulation 479/2009 (as amended), all
          EU Member States are required to prepare and publish an EDP inventory.
          Each EDP inventory includes a list of general government units as an
          annex."
NAMES:    Council regulation 479/2009 (as amended)
TENSE:    PRESENT
NOTES:    Matches the staged record `edp-inv-legal` exactly. Eurostat's own
          confirmation that the class exists, is published, and is universal
          across member states. Note lower-case "regulation" is as printed.
```

```
ID:       B4
LOCATION: "EU countries" table, whole table
QUOTE:    "EU countries | Belgium | Inventory | Annex I | Bulgaria | Inventory |
          Annex I | Czechia | Inventory | Annex I | Denmark | Inventory | Annex I
          | Germany | Inventory | Annex I | Estonia | Inventory | Annex I |
          Ireland | Inventory | Annex I | Greece | Inventory | Annex I | Spain |
          Inventory | Annex I | France | Inventory | Annex I | Croatia |
          Inventory | Annex I | Italy | Inventory | Annex I | Cyprus | Inventory |
          Annex I | Latvia | Inventory | Annex I | Lithuania | Inventory | Annex I
          | Luxembourg | Inventory | Annex I | Hungary | Inventory | Annex I |
          Malta | Inventory | Annex I | Netherlands | Inventory | Annex I |
          Austria | Inventory | Annex I | Poland | Inventory | Annex I |
          Portugal | Inventory | Annex I […]"
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    NOT IN THE STAGED RECORDS — found by re-fetching. Every EU member state
          has a live "Inventory" link on Eurostat's own page. This is the direct
          evidence that the document class is real and complete, rather than an
          obligation that might be honoured patchily. Quoted with an ellipsis
          because the table continues past Portugal; the operative fact is the
          repetition, and no single clause is broken by the cut. The row labels
          are link text, not publication titles — the page names no inventory by
          its own title, so this is AGENCY ONLY at scale, exactly as
          Research.1.md §6 predicts for this branch.
```

---

## C. Destatis — the German EDP inventory

All records share:

```
URL:  https://www.destatis.de/DE/Themen/Wirtschaft/Volkswirtschaftliche-Gesamtrechnungen-Inlandsprodukt/Tabellen/eu-stabilitaetspakt-eurostat-edp-info.pdf?__blob=publicationFile&v=3
```

```
ID:       C1
LOCATION: Title page
QUOTE:    "Inventory of the methods, procedures and sources used for the
          compilation of deficit and debt data and the underlying government
          sector accounts according to ESA2010. Germany. December 2015"
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    THE TITLE, and the date. Fetched live on 2026-08-07 and still
          December 2015 — an eleven-year-old document is what Destatis serves
          today as Germany's EDP inventory. That is evidence about the real
          cadence of this document class, and it cuts against minting on any
          assumed interval. Note "ESA2010" unspaced, as printed on the title
          page; the body of the document spaces it "ESA 2010".
```

```
ID:       C2
LOCATION: Background (p. 2)
QUOTE:    "Compilation and publishing of the Inventory of the methods, procedures
          and sources used to compile actual deficit and debt data is foreseen by
          Council Regulation 479/2009, as amended. According to Article 8.1: 'The
          Commission (Eurostat) shall regularly assess the quality both of actual
          data reported by Member States and of the underlying government sector
          accounts compiled according to ESA 95.... Quality of actual data means
          compliance with accounting rules, completeness, reliability,
          timeliness, and consistency of the statistical data. The assessment
          will focus on areas specified in the inventories of Member States such
          as the delimitation of the government sector, the classification of
          government transactions and liabilities, and the time of recording.' In
          line with the provisions of the Regulation set up in Article 9, 'Member
          States shall provide the Commission (Eurostat) with a detailed
          inventory of the methods, procedures and sources used to compile actual
          deficit and debt data and the underlying government accounts. The
          inventories shall be prepared in accordance with guidelines adopted by
          the Commission (Eurostat) after consultation of CMFB. The inventories
          shall be updated following revisions in the methods, procedures and
          sources adopted by Member States to compile their statistical data'."
NAMES:    Council Regulation 479/2009
          ESA 95
          CMFB
TENSE:    PRESENT
NOTES:    THE EDGE-BEARING QUOTE, and it carries a contradiction the staged
          record dropped. A document TITLED "according to ESA2010" quotes
          Article 8.1 of the Regulation in the SUPERSEDED "ESA 95" wording — and
          the ellipsis ("ESA 95....") is in the original, not mine. The live
          consolidated Regulation reads "ESA 2010" at that point (see A2). So the
          German inventory quotes a version of Article 8.1 that the consolidated
          text no longer carries. REPORTED, NOT ADJUDICATED, per §3. The two
          readings I can see — that the December 2015 draft was built on the
          pre-M2 text and this line was missed in the ESA 2010 update, or that
          Destatis quoted the original 2009 wording deliberately — are both
          guesses and neither is stated anywhere in the document.
          Separately: this is the only place in the corpus where a member-state
          document quotes Regulation 479/2009's operative text verbatim, which
          matters because it means the obligation is documented from the national
          end as well as the EU end.
```

```
ID:       C3
LOCATION: Background (p. 2), immediately following C2
QUOTE:    "The content of the Inventory and the related guideline have been
          endorsed by the Committee on Monetary, Financial and Balance of
          Payments statistics in June 2012 and are followed by all EU Member
          States. This version introduces references to the ESA 2010 as well as
          some updates of the relevant topics mirroring the changes introduced by
          the ESA 2010."
NAMES:    Committee on Monetary, Financial and Balance of Payments statistics
TENSE:    PRESENT
NOTES:    NOT IN THE STAGED RECORDS. Two things here. First, it dates the
          Article 9(2) guidelines to June 2012 and still gives them no title —
          the `unidentified` terminus from A6, confirmed from the national end.
          Second, "This version introduces references to the ESA 2010" is the
          document saying it is a revision of a predecessor, which is the only
          cadence evidence in the whole chain and is qualitative. Read with A7:
          the inventory is revised on events, and the last event was the ESA 2010
          changeover.
```

```
ID:       C4
LOCATION: "Legal basis for the compilation of GFS and EDP data" (p. 13)
QUOTE:    "In Germany, the Law on the Statistics of Public Finance and Public
          Service Personnel ('Finanz- und Personalstatistikgesetz' – FPStatG)
          regulates the statistical collection and compilation of national fiscal
          data, which are the main data source for the general government sector
          in national accounts. The national responsibility for the provision of
          government finance statistics (GFS) data according to ESA 2010 is set
          out in the Federal Statistics Law ('Gesetz über die Statistik für
          Bundeszwecke' – BStatG). According to §3(1) No. 7 BStatG it is the duty
          of the Federal Statistical Office to compile and to publish national
          accounts data for national purposes. According to §19 BStatG the
          Federal Statistical Office has to compile national accounts data for
          purposes of the European Union and of international organisations and
          to transmit these data to the European Union."
NAMES:    Finanz- und Personalstatistikgesetz (FPStatG)
          Gesetz über die Statistik für Bundeszwecke (BStatG)
          ESA 2010
TENSE:    PRESENT
NOTES:    QUOTED IN FULL AND UNBUNDLED — the staged record welded the first
          sentence of this passage to a sentence from §2.1, about 6,000
          characters away in a different section, into one QUOTE with no
          ellipsis. See E2. BStatG is entirely absent from the staged records and
          is the stronger of the two statutes for this project's purposes: §19
          is a national statute obliging transmission to the EU, which is the
          national mirror of ESA 2010 Article 3(1). Both statutes are terminus
          candidates, kind `unpublishable` — laws, not publications on a cadence.
```

```
ID:       C5
LOCATION: §2.1 (p. 17), staff duties
QUOTE:    "For the compilation of GFS data, the public finance statistics as
          unique data source is not sufficient. To provide the relevant
          information, numerous different data sources have to be integrated for
          the compilation process based on different accounting systems. Examples
          are data directly provided by the Ministry of Finance, annual and
          quarterly business reports, balance of payments data, reports from the
          budget committee, direct information from certain units, Working Party
          on Tax Revenue Estimates, 'Zentrale Datenstelle der
          Landesfinanzminister' (ZDL) etc."
NAMES:    public finance statistics
          Working Party on Tax Revenue Estimates
          Zentrale Datenstelle der Landesfinanzminister (ZDL)
TENSE:    PRESENT
NOTES:    ITS OWN RECORD, per §6 — this is the second half of what the staged
          record bundled with C4. Every named item here is AGENCY ONLY or a
          terminus: the Working Party is a body, ZDL is a data-collection office
          (terminus candidate, kind `redistributed` — an intermediary that
          publishes nothing of its own), "reports from the budget committee" and
          "direct information from certain units" name no publication at all.
          "etc." at the end of a source list is worth noting on its own: the
          document does not claim the list is complete.
```

```
ID:       C6
LOCATION: §2.1.1 "Existence of an EDP unit/department" (p. 16)
QUOTE:    "The official names of the German institutions involved are • NSI:
          Statistisches Bundesamt (Destatis) – English: Federal Statistical
          Office (FSO), • MOF: Bundesministerium der Finanzen (BMF) – English:
          Federal Ministry of Finance, • NCB: Deutsche Bundesbank – English:
          Deutsche Bundesbank. In Germany, the section D 203 'General Government
          Sector, EU Stability Pact' of the Federal Statistical Office is
          responsible for the EDP notification of government deficit and
          government non-financial transactions."
NAMES:    AGENCY ONLY
TENSE:    PRESENT
NOTES:    AGENCY ONLY, textbook. Three institutions, one internal section number,
          zero publications. Recorded because §6 says the frequency of AGENCY
          ONLY is itself a measurement, and because the staged record presented
          the same passage in a different sentence order (see E5).
```

```
ID:       C7
LOCATION: §2.1 "Institutional responsibilities…" (pp. 13–14)
QUOTE:    "National accounts data for general government are transmitted to
          Eurostat via the following tables (see the related EU legislation):
          Table 2 – Main aggregates of general government (annual data) Table 6 –
          Financial accounts by sector (annual data) Table 7 – Balance Sheets for
          financial assets and liabilities (annual data) Table 801 –
          Non-financial accounts by sector (quarterly) Table 9 – Detailed Tax and
          Social Contribution Receipts by Type of Tax or Social Contribution and
          Receiving Sub-sector (annual data) Table 11 – Expenditure of General
          Government by function (annual data) Table 25 - Quarterly Non-financial
          Accounts of General Government Table 26 – Balance sheets for
          non-financial assets (annual data) Table 27 – Quarterly Financial
          Accounts of General Government Table 28 – Quarterly Government Debt
          (Maastricht Debt) for General Government. Data on government deficits
          and debt levels are reported to Eurostat twice a year (in April and
          October) in EDP notification tables."
NAMES:    ESA 2010 Tables 2, 6, 7, 801, 9, 11, 25, 26, 27, 28
          EDP notification tables
TENSE:    PRESENT
NOTES:    THIS IS THE RECORD EU/AnnexB_assessment_2026-08-05.md §4 CALLED
          DECISIVE, and its reading of it is correct as far as this passage goes:
          ten items named, every one an ESA table number, no German publication.
          But the staged record STOPPED ONE SENTENCE SHORT (see E3). The
          continuation names a cadence — "twice a year (in April and October)" —
          and an existing corpus node, `eurostat-edp-notification-tables`. The
          footnote on "the related EU legislation" resolves to
          `eur-lex.europa.eu/LexUriServ/…OJ:L:2013:174:0001:0727:EN:PDF`, which
          is OJ L 174 of 2013 — the ESA 2010 Regulation. So the tables are tied
          to ESA 2010 by the document's own citation, not by inference.
          DIRECTION IS AMBIGUOUS and is NOT resolved here: Germany feeding the
          notification tables makes Germany the input and the tables the output,
          which would be `eurostat-edp-notification-tables -> [German data]` —
          but "German data" is not a titled release, so the edge has no source.
          Flagged in the slice, not minted.
```

```
ID:       C8
LOCATION: §3.1.1.2 "Data sources used for the compilation of Maastricht debt",
          April EDP notification (p. 32)
QUOTE:    "For central government the main data source is the so-called 'Statistic
          of Federal Government Debt' (SFGD; Statistik der Bundesschuld). This
          source covers data on both, securities and loans. The statistic is
          provided by the German finance agency (Bundesrepublik Deutschland
          Finanzagentur GmbH) at least on a quarterly basis with a time-lag of
          about one month. Another statistic, which covers overall central
          government loans (excluding cash advances) and is consistent with SFGD,
          is the 'Report on Loan Notes by Creditors of Central Government'
          (Meldung zu Schuldscheindarlehen nach Glaeubigerklassen). This
          statistic is also provided by the German finance agency on a quarterly
          basis with a time-lag of about one month."
NAMES:    Statistic of Federal Government Debt (SFGD; Statistik der Bundesschuld)
          Report on Loan Notes by Creditors of Central Government (Meldung zu
            Schuldscheindarlehen nach Glaeubigerklassen)
          Bundesrepublik Deutschland Finanzagentur GmbH
TENSE:    PRESENT
NOTES:    THE FINDING. Two German statistics named by title in both languages,
          each with a stated publisher and a stated cadence ("at least on a
          quarterly basis", "on a quarterly basis"). Three of §4's conditions in
          one passage, inside a document class the EU compels into existence.
          NEITHER IS MINTED — no URL, and §6 forbids inventing one; both are
          recorded `no-node-yet` in the slice with this quote attached.
          Note "is consistent with SFGD" describing the relationship BETWEEN the
          two statistics: that is §5a language and would not support an edge
          between them even if both were nodes.
```

```
ID:       C9
LOCATION: §3.1.1.2 "General remark / terminology" and the state-government
          passage (pp. 32–33)
QUOTE:    "The annual debt statistics (ADS) are one of the main underlying
          statistical sources for government debt. The ADS distinguish between
          liabilities to non-public creditors and liabilities to public
          creditors. […] Main data sources for short- and long-term securities as
          well as loans of state governments are the so-called SFK4-report and
          the (preliminary) quarterly debt statistics (QDS). The SFK4-report is
          provided by the MoF on a quarterly basis with a time-lag of about two
          months. The QDS are compiled by Destatis on a quarterly basis with a
          time-lag of about two and a half months."
NAMES:    annual debt statistics (ADS)
          SFK4-report
          quarterly debt statistics (QDS)
TENSE:    PRESENT
NOTES:    THE STAGED VERSION OF THIS QUOTE IS WRONG IN TWO PLACES — see E1. The
          ellipsis marks a genuine cut between two separated passages and falls
          between sentences, not inside an operative clause.
          Terminus assessment, offered as observation not verdict: SFK4-report
          reads `unpublishable` — "provided by the MoF", a return rather than a
          release. QDS reads like a real publication — "compiled by Destatis on a
          quarterly basis" — and is the best node candidate of the four. ADS is
          ambiguous from this quote alone.
```

```
ID:       C10
LOCATION: state-government intra-subsectoral consolidation passage (p. 42)
QUOTE:    "From the Securities holdings statistics (Statistik über
          Wertpapierinvestments, formerly named Depotstatistik), which is
          provided by the 'Department S – Statistics' of Deutsche Bundesbank, the
          development of overall […]"
NAMES:    Securities holdings statistics (Statistik über Wertpapierinvestments,
            formerly named Depotstatistik)
          Deutsche Bundesbank
TENSE:    PRESENT
NOTES:    NOT IN THE STAGED RECORDS. A FIFTH named German statistic, with a
          publisher and a documented former title — and unlike the other four its
          publisher is the central bank, not Destatis or the finance agency.
          Quoted with a trailing ellipsis because the sentence runs long past the
          operative naming clause; the cut is after the publisher, so nothing
          operative is lost, but this record should be re-quoted in full before
          anything is built on it. No cadence stated in this sentence.
          `de-bundesbank-financial-accounts` is already a node and is NOT this.
```

---

## D. NOT FOUND / unreadable

```
ID:       D1
LOCATION: Eurostat EDP inventories page, "Germany | Inventory | Annex I" row
RESULT:   NOT RETRIEVED — unreadable-source
NOTES:    Eurostat's own links to the current inventories do not resolve to a
          non-browser client. Both hrefs behind the Germany row point at CIRCABC:
          `s-circabc.europa.eu/ui/group/ca7c9cc4-b473-4abc-8e95-263dcd57d79d/library/413ddad4-653f-4632-99d8-35475ddb23f8/details`
          and `…/a27220a8-9d17-46cc-b3da-2a39c178d408/details`. Both return
          HTTP 404 with a 49,532-byte HTML body — the single-page-app shell, not
          the document. The REST form
          `s-circabc.europa.eu/api/-default-/public/ccm/v1/nodes/413ddad4-…`
          returns an Alfresco "Web Script Status 404 - Not Found" page.
          STRINGS/URLS TRIED: the two `ui/group/…/library/…/details` forms and
          the one `api/-default-/public/ccm/v1/nodes/…` form, three in total.
          WHY THIS MATTERS AND IS NOT COSMETIC: it means I could not check
          whether Eurostat serves a German inventory NEWER than the December 2015
          one Destatis serves. If a newer edition exists, the cadence question
          in the slice is answerable and the node's edition is wrong. This is the
          single cheapest check that would improve this slice, and it needs a
          real browser. Add to the branch's site-behaviour list: CIRCABC joins
          Legilux and the Eurostat remuneration pages as a site that hides
          content from `curl`, but by a different mechanism — a 404 rather than
          an empty or truncated body, which is the failure mode most likely to be
          misread as "the document is gone."
```

---

## E. Discrepancies between the staged records and the sources

**`G.50.md` Correction 2 states: "The staging pipeline's extraction quality is
good… every quote re-read matched what the record carried."** That held for the
six ESS documents that session checked. **It does not hold for staging batch
64.** Five of its six records differ from the source. None of the differences
changes what the document means; all five would have put a non-verbatim string
into a `basis` field, which is the one thing §2 exists to prevent.

**E1 — `destatis-edp-inv-2015-annual-debt-statistics`. Two substantive
misquotes.**

| | Staged | Source |
|---|---|---|
| noun | "main underlying **data** sources" | "main underlying **statistical** sources" |
| order | "liabilities to **public** creditors and liabilities to **non-public** creditors" | "liabilities to **non-public** creditors and liabilities to **public** creditors" |

**E2 — `destatis-edp-inv-2015-public-finance-sources`. Two passages welded into
one quote.** The FPStatG sentence is on p. 13 under "Legal basis for the
compilation of GFS and EDP data"; the "numerous different data sources" sentence
is on p. 17 under §2.1 staff duties, roughly 6,000 characters later. The staged
record presents them as continuous prose with no ellipsis and one LOCATION
("Section on main data sources / public finance statistics") that matches
neither. This is §6's "never bundle" failure, and it also swallowed the whole
BStatG passage that sits between them. Split here into C4 and C5.

**E3 — `destatis-edp-inv-2015-esa-tables-link`. Truncated one sentence early.**
The staged quote ends at "Table 28 Quarterly Government Debt (Maastricht Debt)
for General Government." The source continues: "Data on government deficits and
debt levels are reported to Eurostat twice a year (in April and October) in EDP
notification tables." The omitted sentence is the only cadence statement in the
passage and the only reference to an existing corpus node. The staged record also
renders the table separators as spaces where the source prints en-dashes
("Table 2 – Main aggregates"), and drops the two footnote references.

**E4 — `reg-479-2009-art8-2`. Ellipsis inside the provision.** The staged quote
reads "…relating to statistical confidentiality. … In particular, 'statistical
information' means:". The elided sentence is "The statistical information
referred to in the first subparagraph shall be limited to the information
strictly necessary to check the compliance with ESA rules" — which is the
limiting clause on the whole obligation. §6: "no ellipsis inside the operative
clause." Quoted in full at A3.

**E5 — `destatis-edp-inv-2015-institutional`. Sentence order reversed.** The
staged record opens with the section D 203 sentence and closes with the list of
institution names; the source prints the institution list first. No words
changed and no meaning lost, but it is a reconstruction rather than a
transcription, which is worth knowing about a pipeline whose output feeds
`basis` fields.

**What this does and does not license.** It does not impeach the staging
pipeline generally — G.50 checked six documents and found them clean, and the
three Regulation records and all three Eurostat records here matched exactly.
The failures cluster in one batch, on one PDF, and they are the kind produced by
transcribing from a badly-typeset source. **The operational conclusion is
narrower and firmer than "staging is unreliable": staged quotes from PDFs with
broken typesetting need re-reading, and the batches most at risk are the ones
whose source is a scanned or poorly-extracted document.**

---

## F. Batch 67 — assessed, not extracted

Commission Implementing Regulation (EU) 2016/2304 governs the annual quality
report Member States must submit on the ESA 2010 transmission programme data.
Its staged records carry EUR-Lex ELI URLs, which now work again (see §A), so it
is extractable — but it is a **different report** from the one already in the
corpus. `eurostat-edp-gfs-quality-report` is the Article 8(3) report Eurostat
writes about fiscal data; 2016/2304 governs a report each Member State writes
about national and regional accounts. **Deliberately held back** so that the
two are not conflated in one pass, and because it is a second document class
(27 national quality reports) that deserves its own slice rather than being
bolted onto this one. Its staged Article 1 quote — "Member States shall provide
the quality report on an annual basis" — supplies the stated cadence this
chain's inventory lacks, which makes it the stronger of the two candidates and a
good next slice.

---

## G. Part B — soft connections arising

Per `Research.1.md` §11. Provisional, non-authoritative.

| id | from | to | nature | strength | evidence | notes |
|---|---|---|---|---|---|---|
| sc-e1 | `eurostat-edp-gfs-quality-report` | German EDP inventory | assessment consumes | Strong | A2, A3(b) | Art. 8(1) "will focus on areas specified in the inventories"; Art. 8(2)(b) lists inventories as the statistical information for the assessment. Two steps from the report's own words, so not minted. Settling it needs the quality report's own text. |
| sc-e2 | `eurostat-edp-notification-tables` | German source data | aggregates | Medium | C7 | Direction runs the opposite way to the rest of this chain and has no titled source at the German end. |
| sc-e3 | 26 further national EDP inventories | `eu-reg-479-2009` | same obligation | Strong | A5, A8, B4 | The German edge, replicated 26 times. Each needs its own document. |
| sc-e4 | Member-state ESA 2010 quality reports (Reg. 2016/2304) | `esa-2010` | annual obligation | Strong | §F | Second compelled national document class; annual cadence stated. |
| sc-e5 | `de-destatis-edp-inventory` | Article 9(2) CMFB guidelines | content determined by | Medium | A6, C3 | The guidelines have no title in either document. Terminus, `unidentified`. |
