# Ten-vs-eleven Member States discrepancy — resolved

Date: 2026-08-05
Read first-hand this session, via browser/WebFetch: COM(2022) 180 final,
*Report from the Commission to the European Parliament and the Council on
the application of Annex XI to the Staff Regulations and Article 66a
thereof*, 26.4.2022.

Task: cheap check, open since `G.32.md` finding 2 — why the consolidated
Staff Regulations text (Annex XI, Article 1(4)) names **eleven** Member
States including the United Kingdom, while COM(2025) 736 and Eurostat's own
Quality page both operate on a sample of **ten**.

---

### TEN-01 — the resolving passage, in full

```
URL:       https://u4unity.eu/document/COM(2022)180_Method.pdf (fetched via
           WebFetch; also found independently via EUR-Lex citation from
           this document's own footnotes)
LOCATION:  s. 3.2.1 "Calculation of the Global Specific Indicator as
           defined in the 2013 Method"
QUOTE:     "Under the Method adopted in 2013, the GSI was computed as of 1
           July 2015, using a sample of eleven reference Member States
           (weighted by GDP): Belgium, Germany, Spain, France, Italy,
           Luxembourg, Netherlands, Austria, Poland, Sweden and the United
           Kingdom. As of 1 January 2021 the United Kingdom is no longer
           considered an EU Member State and therefore since that date it
           is not included in the sample for the calculation of the GSI.
           Annex 6 shows that following the United Kingdom's withdrawal
           from the European Union, the sample still meets the 75%
           threshold laid down in Article 1(4) of Annex XI to the SR and
           thus does not need to be amended. In implementation of the
           agreed inter-institutional approach concerning references to
           the United Kingdom in the EU legislation, for the purposes of
           Article 1(4) of Annex XI, Eurostat now uses a sample consisting
           of the 10 remaining Member States aforementioned."
NAMES:     Global Specific Indicator (GSI)
           Article 1(4) of Annex XI to the Staff Regulations
TENSE:     PRESENT (with an explicit past-tense turning point, "As of 1
           January 2021" — the §5b tense trap does not apply here because
           the document itself narrates the change rather than describing
           a dead arrangement as live)
NOTES:     **Fully resolves the discrepancy.** It is not that the
           consolidated EUR-Lex text is stale or in error, and it is not
           that Eurostat's "ten" is an undocumented simplification — both
           readings are correct simultaneously, by design. Article 1(4)'s
           own text (confirmed independently this session — see TEN-02)
           names eleven states **as the base list**, but also gives the
           European Parliament and the Council a standing power to "adopt
           a new sample which represents at least 75% of the Union gross
           domestic product," with no requirement that the base list
           itself be struck. The United Kingdom's exit did the necessary
           work automatically — it simply stopped being "a Member State,"
           which excludes it from any Member-State sample by definition,
           without needing the text amended — and because the remaining
           ten still clear the 75% GDP bar on their own, no replacement
           sample needed to be legislated. The eleven-name list on EUR-Lex
           is not wrong; it is the base list, which nothing has yet
           required amending.
```

### TEN-02 — the base list and the 75%-GDP escape valve, confirmed at the primary source

```
URL:       https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:01962R0031-20240101
LOCATION:  Annex XI, Article 1(4)(a)
QUOTE:     "To establish the gross and net indicators for the European
           Union total, Eurostat shall use a sample composed of the
           following Member States: Belgium, Germany, Spain, France,
           Italy, Luxembourg, Netherlands, Austria, Poland, Sweden and
           United Kingdom. The European Parliament and the Council, acting
           on a Commission proposal under Article 336 of the Treaty on the
           Functioning of the European Union, may adopt a new sample which
           represents at least 75 % of the Union gross domestic product
           (GDP) and which will apply from the year following its
           adoption."
NAMES:     (as AXI-04, already recorded — this re-confirms the same
           passage, this time read for its second sentence rather than its
           first)
TENSE:     PRESENT
NOTES:     Fetched directly from EUR-Lex this session via the browser
           (same reachable-via-browser technique established in prior
           sessions), not merely inferred from COM(2022) 180's summary.
           The "at least 75%" clause is the mechanism TEN-01 invokes. This
           is the same paragraph AXI-04 already quoted
           (`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`) — that
           record's own truncation point was just before this sentence,
           which is why the discrepancy stayed open until this session.
```

### TEN-03 — a second, independent corroboration of the AXI-02 Joint Index finding

```
URL:       https://u4unity.eu/document/COM(2022)180_Method.pdf
LOCATION:  s. 3.3 "The Joint Index"
QUOTE:     "The Joint Index measures changes in the cost of living in
           Belgium and Luxembourg for EU staff according to the
           distribution of staff serving in these two Member States, based
           on the Harmonised Indices of Consumer Prices (HICP) in the case
           of Belgium and the Consumer Prices Index (CPI) in the case of
           Luxembourg, in accordance with Article 1 of Annex XI to the
           SR."
NAMES:     Harmonised Indices of Consumer Prices (HICP) — Belgium
           Consumer Prices Index (CPI) — Luxembourg
TENSE:     PRESENT
NOTES:     Word-for-word the same HICP/CPI split AXI-02 found in Annex XI
           itself, this time from a second, independent document (a
           Commission report, not the Regulation). **Does not further
           identify Luxembourg's "CPI"** — still just "CPI," not "IPCN" or
           "IPCH" by name — so the open `_dropped` entry in
           `eurostat-remuneration-update-report.json` stays open. Recorded
           here because a second independent naming is itself evidence
           that strengthens AXI-02, even though it adds nothing new to the
           Luxembourg-identification question specifically.
```

---

## Resolution

**`G.32.md` finding 2 is resolved, not merely borne out.** The ten-vs-eleven
discrepancy is neither a stale consolidation nor an undocumented Eurostat
practice — it is the intended operation of Article 1(4)(a)'s own two-sentence
structure, and COM(2022) 180 states this explicitly and narrates the exact
mechanism (Brexit's automatic effect on Member State status, plus the
surviving ten still clearing the 75% GDP threshold, meaning no Article 336
TFEU replacement-sample regulation was ever needed).

## Secondary observation, not chased further this session

COM(2022) 180 is itself the product of a **statutory periodic reporting
requirement** — Article 15(2) of Annex XI required "before 31 March 2022"
this exact report, and the document's own footnote 3 names a predecessor,
COM(2018) 830, "the Commission's interim report on the implementation of
Annex XI." Whether this is a third recurring Eurostat/Commission series
(distinct from `eurostat-remuneration-update-report`, which is annual) is
not established here — Article 15(2)/15(3)'s own cadence is unclear from
what was read (tied to a review cycle, not obviously annual), and this was
not researched further, per `Research.1.md` §8's one-item-at-a-time
discipline. Flagged as a lead, not pursued.
