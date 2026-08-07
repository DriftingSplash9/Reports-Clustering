# SEC03 — Part A extraction record (Title 05, Regional Development and Cohesion, complete)

**Section III — Commission**, Draft Budget 2027. Title 05 is the second-largest
Title in the Draft Budget by commitment appropriations — EUR 44.0bn CA,
behind only Title 08 (Agriculture, EUR 54.98bn CA, `SEC03_Title08_PartA_2026-08-05.md`).
Flagged as the branch's B-priority backlog item across six consecutive
hand-offs (`G.30.md` through `G.37.md`).

**Source.** `EU/SEC03.pdf`, printed pp. 202–222 (Title 05 in full, all five
chapters: 05 01, 05 02, 05 03, 05 04, 05 20). Read in full from disk,
first-hand this session. Text extracted with `pypdf`; PDF-kerning artefacts
silently closed up.

**Retrieval URL constructed by pattern**, unfetched, same status as every
SEC03 record so far:

```
https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
```

No verdicts below. Where two things point opposite ways they are both quoted
and neither is picked, per `Research.1.md` §3.

---

## Part A records

### S03-17 — Title 05 master structure: five chapters, two large funds, no reserve

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Title 05 figures table, printed p. 202.
QUOTE:     "05 01 Support administrative expenditure of the 'Regional
           Development and Cohesion' cluster 17 500 649 [...] 05 02
           European Regional Development Fund (ERDF) 35 803 870 961 [...]
           05 03 Cohesion Fund (CF) 8 152 305 630 [...] 05 04 Support to the
           Turkish Cypriot community 33 966 207 [...] 05 20 Pilot projects,
           preparatory actions, prerogatives and other actions p.m. [...]
           Title 05 — Total 44 007 643 447 48 303 081 811 42 122 831 012
           46 827 681 069 48 157 793 424,45 27 750 812 443,88"
NAMES:     NO PUBLICATION NAMED
TENSE:     N/A
NOTES:     Confirms the EUR 44.0bn figure already carried in the branch's
           own backlog notes (`G.15.md` onward) at the exact chapter-table
           level: 44,007,643,447 CA. **ERDF alone (Chapter 05 02, EUR
           35.80bn CA) is 4.4× the Cohesion Fund (Chapter 05 03, EUR
           8.15bn CA)** — the two funds together are 99.9% of the Title.
           **Unlike Title 08, no chapter in Title 05 carries a `30 02 02`
           reserve sub-row** — searched across the full chapter set, zero
           hits for `Reserve` or `30 02 02`. A documented contrast worth
           recording rather than assuming the pattern is universal.
```

### S03-18 — ERDF's regional classification: a three-tier GDP-per-capita threshold, `AGENCY ONLY`

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Article 05 02 01, "ERDF — Investment for jobs and growth" and
           Article 05 02 02, "ERDF — Operational technical assistance",
           Remarks, printed pp. 207, 213.
QUOTE:     "ERDF support under the Investment for jobs and growth goal and
           for the European territorial cooperation goal (Interreg) in the
           2021-2027 and preceding programming periods. It will cover the
           following three categories of regions: — less developed
           regions, with a GDP per capita less than 75 % of the average
           GDP of the Union, — transition regions, with a GDP per capita
           between 75 % and 100 % of the average GDP of the Union, — more
           developed regions, with a GDP per capita above 100 % of the
           average GDP of the Union."
NAMES:     AGENCY ONLY — "GDP per capita" and "average GDP of the Union"
           are named as quantities, with no publication, agency or release
           title given
TENSE:     PRESENT
NOTES:     **The identical three-tier threshold recurs verbatim at both
           Article 05 02 01 and 05 02 02**, and a third time at Article 05
           02 03 (not separately quoted — same text). This is the closest
           Title 05 comes to a statistics-input claim, and it stops short
           of naming a source: no "Eurostat," no "regional accounts," no
           NUTS classification regulation, anywhere in the budget
           document's own text (searched: `Eurostat` 0 hits, `NUTS` 0
           hits, `European System of Accounts` 0 hits, `ESA 2010` 0 hits,
           across the whole of Title 05). This is the same shape the
           branch has found everywhere except Title 08's FSDN exception —
           an eligibility formula stated as a bare percentage-of-average
           rule, with the underlying data source left to a regulation one
           level removed (Regulation (EU) 2021/1058, cited in the Legal
           basis block but not opened this session — see *What this
           record does not do*).
```

### S03-19 — the Cohesion Fund's GNI threshold: a dated reference period and a named unit, still `AGENCY ONLY`

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Article 05 03 01, "CF — Investment for jobs and growth", Remarks,
           printed p. 215.
QUOTE:     "CF support under the Investment for jobs and growth goal in the
           2021-2027 and preceding programming periods. The CF will
           support Member States whose gross national income (GNI) per
           capita, measured in Purchasing Power Standards (PPS) and
           calculated on the basis of Union figures for the period
           2014-2016, is less than 90 % of the average GNI per capita of
           the EU-27 for the same reference period."
NAMES:     AGENCY ONLY — "Union figures" names no agency or publication;
           "Purchasing Power Standards (PPS)" names a defined statistical
           unit without naming the body that defines or measures it
TENSE:     PRESENT
NOTES:     **Stronger than S03-18 in one respect and no stronger in the
           respect that matters.** This passage gives an explicit
           **reference period** ("the period 2014-2016") for the GNI
           figures underlying Member State eligibility — the kind of
           detail `Research.1.md` §8 item 1a flags as worth its own line —
           and names "Purchasing Power Standards (PPS)," which is a
           Eurostat-defined unit (the same unit named, without attribution
           either, in this session's other Eurostat civil-servants-
           remuneration research, `EU/EurostatRemunerationReport_PartA_2026-08-05.md`).
           **Still `AGENCY ONLY`**: "Union figures" is not a title, and no
           document opened this session states that Eurostat itself
           publishes the GNI-per-capita series used here. Recurs
           identically at Article 05 03 02 (not separately quoted).
```

### S03-20 — a legal-basis stack as dense as Title 08's, confirming the pattern generalises

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Chapter 05 02 (ERDF) Legal basis block, printed pp. 209–211.
QUOTE:     "Council Regulation (EC) No 1260/1999 of 21 June 1999 laying
           down general provisions on the Structural Funds [...] Regulation
           (EC) No 1783/1999 [...] Regulation (EC) No 1080/2006 [...]
           Council Regulation (EC) No 1083/2006 [...] Regulation (EU) No
           1299/2013 [...] Regulation (EU) No 1301/2013 [...] Regulation
           (EU) No 1303/2013 [...] Regulation (EU) 2021/1056 of the
           European Parliament and of the Council of 24 June 2021
           establishing the Just Transition Fund [...] Regulation (EU)
           2021/1058 of the European Parliament and of the Council of 24
           June 2021 on the European Regional Development Fund and on the
           Cohesion Fund [...] Regulation (EU) 2021/1059 [...] on specific
           provisions for the European territorial cooperation goal
           (Interreg) [...]"
NAMES:     Eleven-plus instruments spanning 1999–2021, headed operationally
           by Regulation (EU) 2021/1058 (the current ERDF/CF Regulation)
           and Regulation (EU) 2021/1059 (the Interreg Regulation)
TENSE:     PRESENT
NOTES:     Same shape as S03-05 (Title 08's "densest legal-basis block")
           — a full legacy stack from the 1999 Structural Funds regulation
           forward, kept live because legacy programmes are still being
           closed out. Confirms this is a corpus-wide pattern of EU
           multi-annual budget law, not a Title 08 peculiarity. **No
           statistical-classification regulation appears anywhere in this
           stack** — the searched absence at S03-18 is not an oversight of
           a shorter citation list; the full eleven-instrument chain simply
           does not include one.
```

### S03-21 — the inter-fund transfer mechanism recurs, confirming a corpus-wide structural pattern

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Articles 05 02 06 through 05 02 08, printed p. 212.
QUOTE:     "05 02 06 InvestEU Fund — Contribution from the ERDF [...]
           14 016 419 [...] 05 02 07 Border Management and Visa Instrument
           (BMVI) — Contribution from the ERDF [...] 52 844 749 [...] 05 02
           08 European Maritime, Fisheries and Aquaculture Fund (EMFAF) —
           Contribution from the ERDF [...]"
NAMES:     InvestEU Fund
           Border Management and Visa Instrument (BMVI)
           European Maritime, Fisheries and Aquaculture Fund (EMFAF)
TENSE:     N/A
NOTES:     The same reallocation-to-other-instruments structure S03-14
           found in EAFRD and EMFAF (Title 08) — here running the other
           direction, ERDF funding out to InvestEU, BMVI and EMFAF, with
           real (non-`p.m.`) figures rather than placeholder rows. **Not a
           statistical dependency** — a documented inter-fund financial-flow
           structure, now confirmed in two Titles, which strengthens the
           case that this is a genuine corpus-wide budget-mechanics pattern
           worth its own note in a future cross-Title synthesis rather than
           a one-off. The `PPPA` MFF tag (`2.1.1PPPA`) recurs a fourth time
           at Chapter 05 20, its own code-position variant, extending
           S03-08/S03-16's catalogue.
```

---

## Register of what was searched and not found

Per `Research.1.md` §6, absences are results. Strings searched over the full
extracted text of Title 05 (printed pp. 202–222), whole chapter set, no
truncation:

| String | Hits | What it means |
|---|---|---|
| `Eurostat` | 0 | No EU statistical release named in Title 05's own text |
| `HICP` | 0 | ditto |
| `consumer price` | 0 | ditto |
| `reference price` | 0 | ditto — not applicable to this Title's subject matter, included for consistency with Title 08's registry |
| `NUTS` | 0 | The regional-classification system underlying "regions" in S03-18 is not named, despite the entire Title being organised around regional categories |
| `European System of Accounts` / `ESA 2010` | 0 | No citation of the corpus's existing `esa-2010` node, unlike AXI-04's citation of it for EU staff GDP weighting |
| `national accounts` | 0 | ditto |
| `GDP` | 12 | All at S03-18 — the three-tier regional classification, repeated across three near-identical ERDF articles |
| `GNI` | 4 | All at S03-19 — the Cohesion Fund threshold, repeated across two near-identical CF articles |
| `Purchasing Power Standard` | 2 | Both at S03-19 |
| `Reserve` / `30 02 02` | 0 | Unlike Title 08, no chapter in Title 05 carries a reserve — see S03-17 |
| `Interreg` | 7 | Named as a goal/programme throughout, never as a statistical input |
| `InvestEU` | 11 | The inter-fund transfer mechanism, S03-21 |

**Title 05 is the eleventh section/Title of this corpus tested this way**
(after SEC05, SEC06, SEC07, SEC01, SEC02, SEC08, SEC09, SEC10, SEC03 Title
01, SEC03 Title 08) — and, unlike Title 08, **it returns no genuine hit** on
the statistics watchlist. Every GDP/GNI mention is `AGENCY ONLY`, and the
underlying regional-classification and national-accounts machinery that
would name a source (NUTS, ESA 2010) is entirely absent from the budget
document's own text. This restores the corpus-wide pattern Title 08 was the
single exception to.

---

## What this record does not do

- **It does not open Regulation (EU) 2021/1058 or Regulation (EU) 2021/1060**,
  either of which is the natural next lookup if the GDP/GNI classification
  lead is worth following — the Common Provisions Regulation (2021/1060) in
  particular is likely to name Eurostat and the NUTS classification
  regulation directly, the way Title 08's S03-12 found Regulation (EC) No
  1217/2009 cited but not opened. **Flagged as a lead, not the branch's
  strongest one** — S03-12's FSDN lead remains ahead of it, since that one
  already has a named data network and named founding regulation, where
  this one has only a bare percentage-threshold formula.
- **It does not cover Titles 02–04, 06–07, 09–16, 20, 21, 30**, nor the
  revenue side, nor the Annexes. SEC03's largest two Titles (08 and 05) are
  now both extracted; roughly 890 of SEC03's 1,114 pages remain untouched.
- **It does not propose any node or edge.** Every record is a figures-table
  quote, a legal-basis citation, or a structural observation.
- **It does not supply a hash-verified retrieval URL.**
