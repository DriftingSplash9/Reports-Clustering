# Eurostat Remuneration Report — Part A extraction record

Date: 2026-08-05
Read first-hand this session, via browser: Eurostat's own "Civil servants
remuneration" web section (`ec.europa.eu/eurostat/web/civil-servants-remuneration/`),
specifically the Publications, Overview and Quality sub-pages.

Task: closes the modelling gap `G.33.md`/`G.34.md` flagged as priority item
0.2 — whether to model the EU staff salary/pension update mechanism as a
node. **This record shows the question was already effectively answered by
a predecessor session**: `EU/AnnexXI_PartA_2026-08-05.md`, record C736-03,
already established the report's recurring title from a footnote in
COM(2025) 736 and proposed the id `eurostat-remuneration-update-report`,
withholding only because "the publication's own URL is not given here and
has not been retrieved." This session retrieves it.

---

### ERR-01 — the recurring series, its cadence, and 22 years of confirmed publication

```
URL:       https://ec.europa.eu/eurostat/web/civil-servants-remuneration/publications
LOCATION:  "Annual reports" section
QUOTE:     "This page presents annual and intermediate reports on adjustment
           of remuneration and pensions of EU officials." ... "Reports are
           sorted in descending order by publication date. Reports are
           typically released in late October, with reference date July."
NAMES:     Eurostat annual reports on adjustment of remuneration and
           pensions of EU officials
TENSE:     PRESENT
NOTES:     Confirms cadence (annual, "late October") directly from Eurostat's
           own publications page. **The page lists one linked report per
           year, unbroken, from 2004 to 2025** (2015 has two: "(a)" and
           "(b)"; 2010 has two, "(a)" and "(b)") — 22 years of confirmed
           recurring publication, which is stronger evidence for cadence
           than a cadence statement alone. This matches, and strengthens,
           Annex XI Article 1(1)'s own cadence statement (AXI-01,
           `EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`): Eurostat
           "shall draw up every year before the end of October a report."
```

### ERR-02 — the title, confirmed present-tense and recurring, cross-checked against the prior session's footnote reading

```
URL:       https://ec.europa.eu/eurostat/web/civil-servants-remuneration/publications
LOCATION:  "Annual reports" list, entry links (e.g. "2025 main report")
QUOTE:     Link text: "2025 main report". Underlying filename (from the
           link's href, retrieved via the page's own DOM): "Ares_2025_9371644
           +Eurostat+Remuneration+Report+2025+v7+complete+A64+and+A65+_cln.pdf".
NAMES:     Eurostat Remuneration Report [year]
TENSE:     PRESENT
NOTES:     The landing page's own link text ("[year] main report") is
           informal; the operative title is the one already extracted at
           **C736-03** (`EU/AnnexXI_PartA_2026-08-05.md`), quoted there from
           COM(2025) 736's footnote 3: "Eurostat Report of 31 October 2025 on
           the 2025 annual update of remuneration and pensions of EU
           officials in accordance with Articles 64 and 65 and Annexes XI to
           the Staff Regulations..." That record flagged the title as
           established but the URL as missing. This record supplies the URL
           and confirms, independently, that the underlying document series
           is titled "Eurostat Remuneration Report [year]" in its own file
           metadata — two independent namings of the same recurring series,
           one from the operative Commission report, one from Eurostat's own
           site.
```

### ERR-03 — the Overview page's own description, tying the series to the Joint Index and to Belgium/Luxembourg prices

```
URL:       https://ec.europa.eu/eurostat/web/civil-servants-remuneration/overview
LOCATION:  "Which information can I find here?"
QUOTE:     "Remuneration statistics for administrative purposes are a set of
           indicators used to monitor the evolution of national and EU
           average civil servant remuneration[,] the evolution of consumer
           price levels relative to Brussels for intra-EU and Extra-EU
           capital cities (and selected other duty stations)[, and] the
           evolution of consumer prices in Brussels and Luxembourg[.]"
NAMES:     AGENCY ONLY (describes the indicator set, not further-named
           releases)
TENSE:     PRESENT
NOTES:     "The evolution of consumer prices in Brussels and Luxembourg" is
           Eurostat's own plain-language gloss on the Joint Index (AXI-02),
           confirming the section this report series belongs to is the one
           Annex XI Article 1(2) creates.
```

### ERR-04 — the "sample of 10" in Eurostat's own current terminology, bearing on the ten-vs-eleven discrepancy

```
URL:       https://ec.europa.eu/eurostat/web/civil-servants-remuneration/quality
LOCATION:  "Country assessments"
QUOTE:     "To date, A65 assessments have been prepared for 13 countries: 8
           EU countries in the sample of 10 (not for Luxembourg and Sweden)
           and 4 of the remaining 17 EU countries – Bulgaria, Denmark,
           Cyprus, Lithuania – as well as the United Kingdom."
NAMES:     AGENCY ONLY
TENSE:     PRESENT
NOTES:     **Bears on `G.32.md` finding 2 (the ten-vs-eleven Member States
           discrepancy), though it does not fully close it.** Eurostat's own
           current operational language is "the sample of 10" — matching
           COM(2025) 736's "ten Member States" (C736-07) — and this quote
           lists the United Kingdom separately, under "the remaining 17 EU
           countries" and "as well as", i.e. explicitly **outside** the EU
           sample. This is consistent with the reading that the consolidated
           Annex XI text's eleven-country list (AXI-04, still including the
           UK) is stale relative to Eurostat's actual post-Brexit practice,
           rather than the reverse. **Not a full resolution** — this quote
           describes assessment coverage, not the Article 1(4) sample
           definition itself, and does not state that the Staff Regulations
           text has or has not been amended.
```

---

## Addendum — same-day continuation session, minting the other series

Read first-hand this session, via browser: the Publications page's full
accordion (all six categories, expanded, with link `href`s extracted via the
page's own DOM) and the Methodology page (Correction coefficients / Joint
Belgium-Luxembourg index / Estate agency rent surveys sub-sections,
expanded).

### ERR-05 — Intra-EU intermediate report, a distinct annual series from the main report

```
URL:       https://ec.europa.eu/eurostat/web/civil-servants-remuneration/publications
LOCATION:  "Intermediate reports: Intra-EU time series" section
QUOTE:     "Reports are sorted in descending order by publication date.
           Reports are typically released in May with reference date
           January."
NAMES:     Eurostat Intermediate Report [year] (from linked file names,
           e.g. "Ares%282025%294560836+Eurostat_Intermediate_Report_2025
           +v8+cln.pdf", "...Eurostat_Intermediate_Report_2024...")
TENSE:     PRESENT
NOTES:     A genuinely separate series from the Annual report — different
           reference date (January vs. July), different release month (May
           vs. late October), 14 linked years (2013–2026). Titled by its own
           file metadata, same evidentiary shape ERR-02 already used for the
           main report. No specific data-input quote found this session
           naming a further dependency — left isolated on import, same
           pattern every EU node has shipped with at least once.
```

### ERR-06 — Extra-EU intermediate report, corroborating C736-04 with confirmed filenames and 15 years of publication

```
URL:       https://ec.europa.eu/eurostat/web/civil-servants-remuneration/publications
LOCATION:  "Intermediate reports: Extra-EU time series" section
QUOTE:     "Reports are sorted in descending order by publication date.
           Reports are typically released in May with reference date
           January, and in October with reference date July."
NAMES:     Eurostat Report(s) on the interim update of weightings (correction
           coefficients) applicable to the remuneration of officials,
           temporary staff and contract staff of the European Union serving
           in Extra-EU Delegations (title from C736-04,
           `EU/AnnexXI_PartA_2026-08-05.md`, footnote 3 item 2 of COM(2025)
           736)
TENSE:     PRESENT
NOTES:     C736-04 already extracted the operative title and dated two 2025
           editions ("3 June 2025 and 31 October 2025"); this session's
           cadence quote confirms the pattern generalises ("in May... and in
           October") and the Publications page shows 15 years of paired
           releases (2011–2026, one per half-year — "Report 01/[year]" and
           "Report 06/[year]"). Twice-yearly, `releases_per_year`: 2.
```

### ERR-07 — Estate agency rent surveys (EARS), named by acronym, annual, and a documented input to the main report's correction-coefficient calculation

```
URL:       https://ec.europa.eu/eurostat/web/civil-servants-remuneration/methodology
LOCATION:  "Estate agency rent surveys" section
QUOTE:     "Estate agency rent surveys (EARS) are done in the context of the
           wider work done to compare the relative cost of living of
           international civil servants between their place of employment
           and that of Brussels, the reference city. Because of the
           importance of housing costs in the overall expenditure of a
           household, specific rent surveys are carried out annually
           through estate agencies."
NAMES:     Estate agency rent surveys (EARS)
TENSE:     PRESENT
NOTES:     Named, with its own acronym, and cadence stated directly
           ("annually"). Publications page confirms 23 linked years
           (2003–2025), file titles "Booklet_[year+1]_rents_[year]_e_Final".
           **A second quote, same page, "Correction coefficients" section,
           supports an edge to the main report**: "For housing, which is the
           largest single item of expenditure for many people, a specific
           methodology has been set up... Rent parities are based on market
           rents obtained from special surveys of estate agencies." "Based
           on" is a direct input statement, not a Research.1 §5a
           "comparable with" trap. Minted as
           `eurostat-remuneration-update-report → eurostat-remuneration-rent-survey`
           (`uses_data_from`).
```

### ERR-08 — A64/A65 "detailed reports" are appendices of the main report, not a separate series (a documented non-node, recorded per Research.1 §4)

```
URL:       https://ec.europa.eu/eurostat/web/civil-servants-remuneration/publications
LOCATION:  "Detailed reports: A64 Annex 3 analytical category reports" and
           "Detailed reports: A65 Annex 2 country-by-country reports"
           sections
QUOTE:     File names, retrieved via the page's own DOM: A64 —
           "Eurostat+Remuneration+Report+2025+Appendix+3_v5+cln.pdf",
           "Ares%282024%297909435+Eurostat+Remuneration+Report+2024
           +Appendix+v3.3...pdf". A65 —
           "EurostatReport2025_Appendix_2_SUMMARY_EU27...pdf",
           "EurostatReport2025_Appendix_2a+BEtoLV...pdf".
NAMES:     Eurostat Remuneration Report [year], Appendix 2 / Appendix 3
TENSE:     PRESENT
NOTES:     **Not minted as separate nodes.** Both series' own file names
           identify them as "Appendix 2" / "Appendix 3" *of* "Eurostat
           Remuneration Report [year]" — the same document family, same
           publisher, same annual cadence, published alongside "[year] main
           report" and "[year] Appendix 1abc" under the single "Annual
           reports" heading on this page (not under their own heading by
           accident — Eurostat groups them there itself). This is exactly
           the shape `src/lib/types.ts`'s `Report.part_of` field was built
           for, and that field's own documentation records a measured
           result: splitting a release from its parent **understates** the
           parent's authority (STATCAN HFCE/National Accounts case, a 55%
           understatement) rather than adding real information. Treated as
           components of the already-minted `eurostat-remuneration-update-report`
           rather than as new nodes. Recorded as a finding, per
           `Research.1.md` §5's instruction that a documented non-edge is
           worth reporting — this is the node-conditions equivalent.
```

### ERR-09 — Belgium's HICP is qualified "(national concept)"; Luxembourg's CPI is qualified "(domestic concept)" — bears on, but does not close, the open Luxembourg identification question

```
URL:       https://ec.europa.eu/eurostat/web/civil-servants-remuneration/methodology
LOCATION:  "Correction coefficients and joint Belgium-Luxembourg index" →
           "Joint Belgium-Luxembourg index" section
QUOTE:     "A specific measure of consumer price inflation relevant for EU
           officials is calculated. ... The starting point for the
           calculation is the Belgium HICP (national concept) and the
           Luxembourg CPI (domestic concept). The evolution is weighted to
           reflect the numbers of EU staff based in Brussels and in
           Luxembourg (approximately 80% : 20%)."
NAMES:     Belgium HICP (national concept)
           Luxembourg CPI (domestic concept)
TENSE:     PRESENT
NOTES:     **Bears favourably on the open `_dropped` entry in
           `eurostat-remuneration-update-report.json`, but does not close
           it.** Eurostat's own methodology page deliberately uses different
           qualifiers for the two countries' price series — "(national
           concept)" for Belgium's HICP, "(domestic concept)" for
           Luxembourg's CPI, rather than calling both "harmonised" or both
           "national". "Domestic concept" reads as consistent with
           STATEC's own description of the IPCN (STATEC-01,
           `EU/STATEC-CPI_PartA_2026-08-05.md`): "la couverture géographique
           de l'IPCN se limite à la seule population résidante" [the IPCN's
           geographic coverage is limited to the resident population only]
           — a domestic-population-only concept, distinct from the IPCH's
           harmonised, EU-wide-comparable one. **Still not a documented
           identification** — no document read anywhere in this branch
           writes "IPCN" and "Luxembourg CPI (domestic concept)" as the same
           thing. The `_dropped` entry's `why` field is updated to note this
           corroboration; the entry itself stays `no-document`, not
           resolved.
```

---

## What this closes

- **Confirms all three `Research.1.md` §4 node conditions** for the report
  series COM(2025) 736 named at C736-03: named (by two independent
  documents), cadence (annual, late October, 22 consecutive years observed),
  titled ("Eurostat Remuneration Report [year]" / "Eurostat Report of
  [date]... on the annual update of remuneration and pensions of EU
  officials"). **Minted as `eurostat-remuneration-update-report`** in
  `EU/slices/eu-level/eurostat-remuneration-update-report.json`.
- **Resolves the `no-node-yet` lead in `eurostat-hicp.json`'s `_dropped`
  block**: the dependent end now exists, so `eurostat-remuneration-update-report
  → eurostat-hicp` is minted (`uses_data_from`, on AXI-02's own quote).
- **Adds a second, independent edge to `esa-2010`**, on AXI-04's quote about
  GDP-weighted Specific Indicator calculation — flagged by that record as "a
  second, independent citation of `esa-2010`" but not previously buildable
  for the same reason (no node for the citing report).

## What this does not close

- **The Luxembourg-side identification is still open.** Annex XI names "the
  Consumer Prices Index (CPI) in the case of Luxembourg" (AXI-02) but no
  document read anywhere in this branch states whether that is
  `lu-statec-ipcn` or `lu-statec-ipch` by name — see
  `EU/STATEC-CPI_PartA_2026-08-05.md`'s own caveat. Recorded as a fresh
  `_dropped` (`no-document`) entry in the new slice rather than guessed.
- **The Specific Indicator's national civil-service-pay inputs remain
  `AGENCY ONLY`** — "the ten Member States referred to in Article 1(4)"
  (C736-07) names no titled national release. Unchanged from prior sessions.
- **The ten-vs-eleven discrepancy is not fully resolved**, only bears on
  favourably (ERR-04). `G.32.md`'s cheap check stays open.
- **The Intermediate reports, Detailed reports (A64/A65), estate agency rent
  survey and mission-expenses series on the same Publications page were not
  separately modelled.** Each is a distinct titled, dated, recurring
  publication (C736-04 already flagged the Extra-EU intermediate series).
  Left for a future session — flagged, not researched further, per
  `Research.1.md` §8's one-item-at-a-time discipline.

## Addendum 2 — same-day continuation, the mission-expenses report

Read first-hand this session (re-used from the same Methodology-page fetch
the first addendum already made, not a fresh navigation): the "Mission
expenses" sub-section of the Methodology page, and the "Mission expenses
report" section of the Publications page (already expanded and captured in
the addendum 1 DOM query).

### ERR-10 — the mission-expenses report, titled and reviewed "regularly," but published on an irregular observed interval

```
URL:       https://ec.europa.eu/eurostat/web/civil-servants-remuneration/methodology
LOCATION:  "Mission expenses" section
QUOTE:     "In the EU context, with effect from 2014 the mission expense
           values for hotel ceilings and for daily subsistence allowances
           are regularly reviewed on the basis of a Eurostat report. A
           framework methodology was adopted in 2005, for details please
           consult SEC (2006) 397. This was re-examined and extended by the
           Article 64 and 65 expert Working Group during 2015. On this
           basis a detailed report was finalised by Eurostat in December
           2015."
NAMES:     Eurostat Report on Mission Expenses (titles vary slightly by
           year in the Publications page's own file names: "Eurostat Report
           on Mission Expenses" (2024), "Eurostat Mission Expenses Report
           2021" (2021), "eurostat_mission_expenses_report_2026" (2026,
           URL-slug case), "UpdateMissionExpenses" (2015) — same document
           family, informal naming variance, same pattern already seen with
           the annual report's "[year] main report" vs. its own file
           title)
TENSE:     PRESENT
NOTES:     **Cadence is the weak point, and is reported honestly rather
           than smoothed over.** "Regularly reviewed" is a standing,
           present-tense statement, but no specific periodicity is given —
           unlike every other node minted in this branch so far, where a
           number or an explicit interval was stated. The Publications
           page lists five linked reports across an eleven-year span (2015,
           2019, 2021, 2024, 2026), an irregular interval (4, 2, 3, 2
           years). `releases_per_year` recorded as an approximation from
           this observed record (5 ÷ 11 ≈ 0.45), flagged as an
           approximation in `cadence_note` rather than presented as a
           stated rate — consistent with Research.1.md §4's "fractional is
           fine... 'about once a generation' is a real answer," but this is
           the branch's first EU node where the cadence comes from counting
           publications rather than from a document stating a rate.
```

### ERR-11 — the mission-expenses methodology names HICP sub-indices as an input

```
URL:       https://ec.europa.eu/eurostat/web/civil-servants-remuneration/methodology
LOCATION:  "Mission expenses" section, second paragraph
QUOTE:     "Where possible the updating methodology uses information
           already established, including relevant sub indices of the
           harmonised index of consumer prices (to measure temporal
           evolution) and purchasing power parities (to measure spatial
           differences). For Extra-EU mission destinations, the
           calculation integrates information obtained from the United
           Nations International Civil Service Commission."
NAMES:     harmonised index of consumer prices (HICP)
           United Nations International Civil Service Commission (UN ICSC)
TENSE:     PRESENT
NOTES:     "Uses information already established, including... the
           harmonised index of consumer prices" is a direct input
           statement — the same shape as the rent survey's "based on"
           language (ERR-07), not a Research.1 §5a trap. Minted as
           `eurostat-remuneration-mission-expenses-report → eurostat-hicp`
           (`uses_data_from`). **The UN ICSC reference is `AGENCY ONLY`** —
           an international body named by function, no titled UN
           publication given — recorded as `_dropped`, `no-document`,
           consistent with how the branch has treated every other named
           international-organisation input so far.
```

---

**Addendum (same-day continuation session):** the Intermediate reports and
the rent survey are now minted (ERR-05, ERR-06, ERR-07) —
`eurostat-remuneration-intra-eu-interim-report`,
`eurostat-remuneration-extra-eu-interim-report`, and
`eurostat-remuneration-rent-survey`, the last carrying a documented edge
back to `eurostat-remuneration-update-report`. **The A64/A65 detailed
reports are found to be appendices of the main report, not a separate
series** (ERR-08) — a documented decision not to mint, not an omission.
**The mission-expenses report remains unresearched** — out of scope for
this continuation, not attempted.
