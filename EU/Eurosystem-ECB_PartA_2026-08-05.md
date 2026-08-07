# Eurosystem/ECB — Part A extraction record

Date: 2026-08-05
Task: opens priority item C, "Independent ECB/Eurosystem threads" — unchanged
in ranking across nineteen hand-offs (`G.20.md` through `G.38.md`), on
Thomas's own direction this session ("redirect to the eurosystem/ecb").

**Two sources of material converge here.** `EU/slices/_staging/10-batch-with-records.ndjson`
carries a staged batch (index 68) already in `Research.1.md` Part A shape —
url/location/quote/names/tense/notes — produced by an earlier session's
research pass and never verified or promoted. Per `EU/slices/README.md`'s own
workflow ("write here → validate structurally → **check against Part A
quotes** → move to `src/data/research/`"), this session's job on that
material is verification, not fresh extraction. **Every quote below marked
"(staged, verified this session)" was cross-checked against the live primary
source this session**, via browser for the EUR-Lex Guideline and one ECB
page, via a saved-PDF read for the MIP quality report. Nothing is promoted
on the strength of the staging file alone.

---

## Thread 1 — the Eurosystem's own recurring balance-sheet publications

### ECB-01 — the governing legal instrument, and the two publication formats it establishes

```
URL:       https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024O2941
LOCATION:  Title; Article 26 "Reporting formats"
QUOTE:     "GUIDELINE (EU) 2024/2941 OF THE EUROPEAN CENTRAL BANK of
           14 November 2024 on the legal framework for accounting and
           financial reporting in the European System of Central Banks
           (ECB/2024/31) (recast)" ... "3. The formats of the different
           published financial statements shall comply with all of the
           following Annexes: (a) Annex V: the published consolidated
           weekly financial statement of the Eurosystem after quarter end;
           (b) Annex VI: the published consolidated weekly financial
           statement of the Eurosystem during the quarter; (c) Annex VII:
           the consolidated annual balance sheet of the Eurosystem."
NAMES:     Guideline (EU) 2024/2941 (ECB/2024/31)
           consolidated weekly financial statement of the Eurosystem
           consolidated annual balance sheet of the Eurosystem
TENSE:     PRESENT
NOTES:     **(staged, verified this session)** — re-fetched from EUR-Lex via
           browser, Article 26's text confirmed word-for-word against the
           staged batch's quote. One instrument, two distinct recurring
           publications, each with its own Annex governing format. A third,
           Article 28 ("General consolidation rules"), was also
           spot-checked and matched verbatim — not separately quoted here,
           it is the netting/consolidation methodology behind both series
           ("Eurosystem consolidated balance sheets shall comprise all the
           items in the ECB's and the NCBs' balance sheets... Intra-
           Eurosystem balances shall be presented... in accordance with
           Annex IV").
```

### ECB-02 — the annual balance sheet, confirmed live with 27 years of unbroken publication

```
URL:       https://www.ecb.europa.eu/press/annual-reports-financial-statements/annual/balance/html/all_balance_sheets.en.html
LOCATION:  Landing page, full list
QUOTE:     "Annual consolidated balance sheet of the Eurosystem" ...
           "26 February 2026 — Consolidated balance sheet of the Eurosystem
           as at 31 December 2025" [followed by one dated entry per year,
           unbroken, back to] "12 April 2000 — Consolidated balance sheet
           of the Eurosystem as at 31 December 1999"
NAMES:     Annual consolidated balance sheet of the Eurosystem
TENSE:     PRESENT
NOTES:     Read first-hand this session, via browser. **27 consecutive
           years of linked publication (1999–2025), each dated in
           February** for the preceding year-end — even stronger cadence
           evidence than the count alone: `Research.1.md` §4 asks for "a
           document that names its own inputs" style evidence, and here
           the publication history itself is the evidence, read directly
           from the ECB's own official page rather than inferred. Mintable
           on this alone; ECB-01's Article 26/Annex VII supplies the legal
           basis and formal title.
```

### ECB-03 — the weekly financial statement, cadence stated explicitly

```
URL:       https://www.ecb.europa.eu/press/annual-reports-financial-statements/wfs/html/index.en.html
LOCATION:  "Weekly financial statements" landing page
QUOTE:     "The weekly financial statements of the Eurosystem are published
           on a Tuesday, and they relate to the preceding Friday."
           "The publication day for the first financial statement of each
           quarter will normally be a Wednesday (instead of Tuesday) in
           order to allow more time to complete the quarterly revaluation
           of assets and liabilities, which is reflected in these
           statements."
NAMES:     Weekly financial statements [of the Eurosystem]
TENSE:     PRESENT
NOTES:     Read first-hand this session, via browser. Cadence stated
           directly by the ECB, not inferred: weekly, `releases_per_year`
           52, with a documented exception (first-of-quarter publishes
           Wednesday, not Tuesday) worth carrying in `cadence_note` rather
           than smoothed away. This is the fastest-cadence node this
           branch has found anywhere in the EU galaxy, faster than
           `eurostat-hicp`'s monthly cadence.
```

### ECB-04 — a soft link into MFI statistics, not yet a mintable edge

```
URL:       https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024O2941
LOCATION:  Annex-level note (staged batch cites "Annex I or related notes
           on monthly/quarterly financial information" — location
           **not independently re-verified to the specific Annex number
           this session**, flagged rather than asserted)
QUOTE:     "The monthly data feed into the published aggregated statistical
           data required from monetary financial institutions (MFIs) in
           the Union. Moreover, as MFIs, the central banks also have to
           provide, on a quarterly basis, more detailed information than
           is provided in the monthly data."
NAMES:     monetary financial institutions (MFIs)
           published aggregated statistical data required from MFIs
TENSE:     PRESENT
NOTES:     **(staged, NOT independently re-verified this session — the
           exact Annex location is uncertain, per the original record's own
           hedge).** Names a real, plausible input relationship — the
           Eurosystem's own accounting data feeds the ECB's MFI balance-
           sheet-item (BSI) statistics — but no MFI statistics node exists
           yet in this corpus, so this cannot be minted as an edge even if
           the location were confirmed. Recorded as `_dropped`,
           `no-node-yet`.
```

---

## Thread 2 — the joint ESS-ESCB quality report on MIP statistics

### ECB-05 — the report itself: title, edition count, and joint authorship

```
URL:       https://www.ecb.europa.eu/pub/pdf/other/ESCB-ESS_quality_assessment_report_on_statistics_underlying_the_MIP_June_2026.en.pdf
LOCATION:  Cover page; Executive summary, p. 3
QUOTE:     "ESS-ESCB QUALITY ASSESSMENT REPORT ON STATISTICS UNDERLYING THE
           MACROECONOMIC IMBALANCE PROCEDURE — 26 June 2026" ...
           "The European Statistical System (ESS), composed of Eurostat
           and the national statistical institutes (NSIs) and other
           national authorities (ONAs), as well as the European System of
           Central Banks (ESCB), composed of the European Central Bank
           (ECB) and the national central banks (NCBs), contribute within
           their respective spheres of competence to the harmonised
           production of data used in the context of the MIP... This 12th
           joint annual quality report presents a transparent description
           and assessment of the quality of the statistics underlying the
           MIP indicators."
NAMES:     ESS-ESCB Quality Assessment Report on Statistics Underlying the
           Macroeconomic Imbalance Procedure
           European Statistical System (ESS)
           European System of Central Banks (ESCB)
TENSE:     PRESENT
NOTES:     **Fetched and read first-hand this session** — WebFetch's own
           text-mode summariser could not parse the PDF; the saved binary
           was read directly, all 38 pages available. **This corrects the
           staged batch's own title ordering** ("ESCB-ESS" in staging vs.
           the document's own "ESS-ESCB" on its cover) — a small but real
           discrepancy, worth recording rather than silently harmonising.
           "12th joint annual quality report" is a direct, stated edition
           count — cadence is annual, confirmed by the document's own
           self-description rather than a publication-list count (the
           first evidentiary shape this branch has used for an EU node,
           distinct from ECB-02/ECB-03's list-counting and
           `eurostat-hicp`'s metadata-page statement).
```

### ECB-06 — the legal/institutional basis, two instruments

```
URL:       https://www.ecb.europa.eu/pub/pdf/other/ESCB-ESS_quality_assessment_report_on_statistics_underlying_the_MIP_June_2026.en.pdf
LOCATION:  Executive summary, pp. 3–5
QUOTE:     "Close cooperation on quality assurance of statistics underlying
           the MIP is ensured via the implementation of the Memorandum of
           Understanding (MoU) signed between Eurostat and the ECB DG
           Statistics in November 2016." ... "the Commission Implementing
           Regulation (EU) 2019/2180 specifies the detailed arrangements
           and content for the quality reports pursuant to Regulation (EU)
           2019/1700."
NAMES:     Memorandum of Understanding between Eurostat and the ECB DG
           Statistics (November 2016)
           Commission Implementing Regulation (EU) 2019/2180
           Regulation (EU) 2019/1700
TENSE:     PRESENT
NOTES:     A statutory basis distinct from a Regulation alone — an MoU
           between two EU-level bodies, plus an Implementing Regulation
           that "specifies the detailed arrangements and content for the
           quality reports." This is the strongest "why does this report
           exist and recur" evidence read this session — a document naming
           its own obligation to be produced, the same shape as Annex XI
           Article 1(1)'s "Eurostat shall draw up every year" (AXI-01).
```

### ECB-07 — a second joint ECB-Eurostat report, named but not followed

```
URL:       https://www.ecb.europa.eu/pub/pdf/other/ESCB-ESS_quality_assessment_report_on_statistics_underlying_the_MIP_June_2026.en.pdf
LOCATION:  p. 4
QUOTE:     "Eurostat and the ECB regularly present joint reports on the
           consistency of the two datasets to the CMFB. The most recent
           joint ECB-Eurostat 'BOP-NA ROW consistency report' was presented
           to the CMFB plenary in January 2026 and published on the CMFB
           website in February 2026."
NAMES:     BOP-NA ROW consistency report (joint ECB-Eurostat)
           Committee for Monetary, Financial and Balance of Payments
           statistics (CMFB)
TENSE:     PRESENT
NOTES:     "Regularly present" plus a specific January/February 2026
           dating is real cadence evidence, but this session does not
           chase it further — per `Research.1.md` §8's one-item-at-a-time
           discipline. Flagged as the single best next lead in this
           thread, ahead of the MFI/BSI soft link (ECB-04) since it names
           a title directly rather than a category of data.
```

---

## What this record does not do

- **It does not mint an edge from either ECB-02 or ECB-03 to any existing
  corpus node.** No document read this session states that the balance
  sheet or weekly statement *uses* another corpus node's figures as an
  input in the `RelationshipType` sense — they are accounting statements of
  the Eurosystem's own assets and liabilities, not calculations built on
  named external statistics.
- **It does not mint an edge from ECB-05 (the MIP quality report) to
  `esa-2010`, `eurostat-hicp`, or any other existing node**, even though
  the report *assesses* GDP, EDP debt and financial-accounts statistics in
  depth. Assessing the quality of other statistics is not the same
  relationship as depending on them for one's own content, and none of
  `RelationshipType`'s four values (`calculated_from`, `uses_data_from`,
  `methodology_depends_on`, `cites`) cleanly fits "audits the quality of."
  Left as a scoping question rather than forced into the nearest available
  value.
- **It does not verify ECB-04's Annex citation** — flagged, not corrected.
- **It does not chase ECB-07 (the BOP-NA ROW consistency report)**, nor
  the MIP scoreboard's 13 headline indicators (only the 23 auxiliary ones
  were in the staged batch), nor the other Eurosystem-heavy staging
  batches this session surveyed but did not open in full: batches 47,
  51–56 (dense ECB/Eurosystem accounting content, meta fields empty —
  unclear provenance, worth a closer read before trusting) and 69–72
  (collateral/valuation-haircut/margin operational rules — legal mechanism
  descriptions, not obviously node-shaped on a first pass).
- **It does not touch `_staging/20-prose-sections.txt`** (~399k chars,
  delivered as unstructured prose, flagged in every hand-off since `G.20.md`
  as needing a dedicated pass no script can automate).
