# SEC03 — Part A extraction record (Title 08, Agriculture and Maritime Policy, complete)

**Section III — Commission**, Draft Budget 2027. Title 08 is the largest
Title in the entire Draft Budget by commitment appropriations — EUR 54.98bn
CA including reserves, larger than every other Title and larger than every
institutional section extracted so far *combined*, several times over.
Flagged as the top-priority remaining SEC03 target in `G.29.md`.

**Source.** `EU/SEC03.pdf`, printed pp. 299–331 (Title 08 in full, all seven
chapters: 08 01, 08 02, 08 03, 08 04, 08 05, 08 10, 08 20). Read in full from
disk, first-hand this session. Text extracted with `pypdf`; PDF-kerning
artefacts silently closed up.

**Retrieval URL constructed by pattern**, unfetched, same status as every
SEC03 record so far:

```
https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
```

No verdicts below. Where two things point opposite ways they are both quoted
and neither is picked, per `Research.1.md` §3.

---

## Part A records

### S03-11 — Title 08 master structure: seven chapters, one CAP, one fisheries policy

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Title 08 figures table, printed pp. 299.
QUOTE:     "08 01 Support administrative expenditure of the 'Agriculture and
           Maritime Policy' cluster 11 584 648 [...] 08 02 European
           Agricultural Guarantee Fund (EAGF) 40 554 063 856 [...] 08 03
           European Agricultural Fund for Rural Development (EAFRD)
           13 408 270 921 [...] 08 04 European Maritime, Fisheries and
           Aquaculture Fund (EMFAF) 804 028 249 [...] 08 05 Sustainable
           Fisheries Partnership Agreements (SFPAs) and Regional Fisheries
           Management Organisations (RFMOs) 44 626 857 [...] 08 10
           Decentralised agencies 32 282 647 [...] 08 20 Pilot projects,
           preparatory actions, prerogatives and other actions p.m.
           6 518 501 [...] Title 08 — Total 54 981 207 178 57 637 146 130
           54 779 138 341 53 042 334 888"
NAMES:     NO PUBLICATION NAMED
TENSE:     N/A
NOTES:     Matches the master 20-Title summary already recorded in
           `SEC03_Title01_PartA_2026-08-05.md` (S03-01) exactly — the same
           figure, 54,981,207,178 CA, re-confirmed at chapter-table level.
           **EAGF alone (Chapter 08 02, EUR 40.55bn CA) is larger than the
           entire budget of every institutional section this branch has
           extracted combined**, by roughly an order of magnitude. Two Titles
           within Title 08 carry a `30 02 02` reserve sub-row, both already
           recorded at the master-summary level (S03-01): the largest single
           reserve in the whole Draft Budget (EUR 126,350,000 CA) sits on
           Article 08 05 01 — see S03-15.
```

### S03-12 — the EAGF's legal basis, and one lead worth its own priority: Farm Sustainability Data Network / integrated farm statistics

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Item 08 02 06 03, "European Agricultural Guarantee Fund (EAGF) —
           Operational technical assistance", Remarks and Legal basis,
           printed pp. 314–315.
QUOTE:     "the financing of the standard fees and the development of
           facilities, including a one-off financial support to Member
           States to upgrade to the Farm Sustainability Data Network, for
           the collection, processing, analysis, publication and
           dissemination of farm accountancy and sustainability data and
           analysis of results,
           — contributions to financing statistical surveys needed to
           monitor structures in the Union, including the Eurofarm database,
           — expenditure on the improvement of systems of agricultural
           statistics in the Union,"
           Legal basis: "Council Regulation (EC) No 1217/2009 of
           30 November 2009 setting up the Farm Sustainability Data Network
           [...] Regulation (EU) 2018/1091 of the European Parliament and of
           the Council of 18 July 2018 on integrated farm statistics and
           repealing Regulations (EC) No 1166/2008 and (EU) No 1337/2011
           [...] Regulation (EU) 2023/2674 of the European Parliament and of
           the Council of 22 November 2023 amending Council Regulation (EC)
           No 1217/2009 as regards conversion of the Farm Accountancy Data
           Network into a Farm Sustainability Data Network."
NAMES:     Farm Sustainability Data Network (formerly Farm Accountancy Data
           Network)
           Eurofarm database
           integrated farm statistics (Regulation (EU) 2018/1091)
TENSE:     PRESENT
NOTES:     **The strongest statistics-funding lead found anywhere in this
           branch, and worth prioritising above everything else this record
           contains.** Every other institutional-budget provision examined
           since G.21 has been `AGENCY ONLY` for statistical inputs — no
           title, no publisher, no citable location. Here, by contrast, a
           named EU fund explicitly finances **the collection, processing,
           analysis, publication and dissemination** of a named data
           network, cites its founding Regulation with a full OJ/ELI
           reference, and separately cites the Regulation establishing
           "integrated farm statistics." This clears more of `Research.1.md`
           §4's three conditions from one location than any prior EU-branch
           find: it is named (twice — "Farm Sustainability Data Network" and
           "Eurofarm database"), it has legal-basis-conferred statutory
           status, and the phrase "for the collection, processing, analysis,
           publication and dissemination of farm accountancy and
           sustainability data" is an operative publication claim, not a
           vague reference to "statistics" in the abstract.
           **Not minted as a node this session** — this document funds the
           network and cites its founding law; it does not itself state a
           publication title, cadence, or URL for what the FSDN/Eurofarm
           actually releases. That is the natural next lookup: Regulation
           (EC) No 1217/2009 (as converted by Regulation (EU) 2023/2674) and
           Regulation (EU) 2018/1091 are both retrievable EUR-Lex
           instruments and the FSDN almost certainly publishes recurring
           reports or datasets under a stable title — this is the closest
           this branch has come to a genuine EU statistical-release node
           with documented funding, and it deserves its own cheap check
           ahead of everything else queued. See priority section below.
```

### S03-13 — the EAGF chapter total and its instrument set

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Chapter 08 02 figures table and Legal basis block, printed
           pp. 303–305.
QUOTE:     "Chapter 08 02 — Total 40 554 063 856 40 630 706 136
           40 449 300 940 40 396 108 274 39 756 548 321,85 39 785 378 046,19"
NAMES:     Regulation (EU) No 1306/2013
           Regulation (EU) No 1307/2013
           Regulation (EU) No 1308/2013
           Regulation (EU) No 1310/2013
           Council Regulation (EU) No 1370/2013
           Regulation (EU) 2020/2220
           Regulation (EU) 2021/2115
           Regulation (EU) 2021/2116
           Regulation (EU) 2021/2117
           Regulation (EU) 2025/2649
           Regulation (EU) 2026/471
TENSE:     PRESENT
NOTES:     Eleven instruments at chapter level alone, headed by Regulation
           (EU) 2021/2115 (CAP Strategic Plans) and Regulation (EU)
           2021/2116 (financing/management/monitoring). **Two amending
           regulations dated within the current financial year itself** —
           Regulation (EU) 2025/2649 (19 December 2025) and Regulation (EU)
           2026/471 (24 February 2026) — show the CAP's legal basis is still
           being actively amended mid-implementation, a live-instrument
           pattern not seen at this frequency in any institutional section.
           Chapter 08 02's own article structure (08 02 01 Agricultural
           reserve; 08 02 02 sectoral interventions; 08 02 03 market-related
           expenditure; 08 02 04 direct-payment interventions, EUR 36.7bn,
           the single largest article in the whole document; 08 02 05
           legacy direct payments; 08 02 06 policy/audit; 08 02 99
           completion) was read in full — **no article names a price index,
           reference price or market-price statistic anywhere**, despite
           several items (fruit and vegetables, wine, olive oil sectors)
           being exactly the kind of market-intervention provision where a
           reference price might be expected. Confirms the corpus-wide
           absence extends even to commodity-market administration.
```

### S03-14 — EAFRD and EMFAF: two more large funds, same shape

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Chapter 08 03 (EAFRD) total, printed p. 316. Chapter 08 04
           (EMFAF) total, printed p. 322.
QUOTE:     "Chapter 08 03 — Total 13 408 270 921 15 774 692 061
           13 329 580 754 11 535 438 204 13 223 936 655,18 14 405 235 486,90"
           "Chapter 08 04 — Total 804 028 249 1 005 810 280 794 658 872
           926 849 985 937 431 820,— 660 173 684,73"
NAMES:     Regulation (EU) No 1305/2013
           Regulation (EU) 2020/2220
           Regulation (EU) 2021/2115
           Regulation (EU) No 508/2014
           Regulation (EU) 2021/1060
           Regulation (EU) 2021/1139
TENSE:     PRESENT
NOTES:     Both chapters read in full at item level. **A recurring transfer
           mechanism found in both, and in Chapter 08 02**: dedicated
           articles allowing Member States to reallocate a fixed percentage
           of a fund's national allocation to InvestEU (up to 3% from EAFRD,
           up to 5% from EMFAF), the Border Management and Visa Instrument,
           the Recovery and Resilience Facility, or the Asylum, Migration
           and Integration Fund — each its own budget article, each
           currently `p.m.`. Not a statistical dependency, but a documented
           inter-fund financial-flow structure distinct from anything found
           in the institutional sections. EAFRD's EUR 8,070,486,840 in
           NextGenerationEU/EURI commitments (2021–2022, stated in the
           chapter Remarks) is the largest single EURI figure found in this
           branch so far.
```

### S03-15 — the largest reserve in the Draft Budget, and a structured table of bilateral fisheries agreements

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Chapter 08 05, Article 08 05 01, printed pp. 326–327.
QUOTE:     "Line 37 861 857 43 536 857 [...] Reserve (30 02 02) 126 350 000
           125 250 000 [...] Total 164 211 857 168 786 857 [...]"
           "Status (as of December 2026) Country Legal basis Date Official
           Journal Duration [...] Cabo Verde Decision (EU) 2024/2152
           15 July 2024 L, 2024/2152, 21.8.2024 23.7.2024 to 22.7.2029 [...]"
           [table of 17 countries, each with its own Council Decision,
           date, OJ reference and agreement duration, split into two groups:
           "in provisional application or in force" and "to be renegotiated"]
NAMES:     17 named third countries and regional fisheries organisations,
           each with its own bilateral fisheries agreement Decision
TENSE:     PRESENT
NOTES:     **The largest reserve sub-row anywhere in the Draft Budget**
           (EUR 126,350,000 CA, already flagged at the master-summary level
           as S03-01's "largest reserves sub-row" note — this record supplies
           the article it actually sits on). The "Conditions for releasing
           the reserve" clause states plainly why it is held back: "may only
           be used when the related basic act is adopted pursuant to
           Article 294 TFEU" — several of the agreements listed as "to be
           renegotiated" (Gabon, Gambia, Guinea, Liberia, Mauritania,
           Mauritius, Morocco, Senegal, Seychelles) are marked "Expired" in
           the table's own Duration column. **A structurally distinct
           record shape**, not seen elsewhere in this branch: a full table
           of named bilateral international agreements with individual
           legal citations, functioning as a single budget line's legal
           basis. Article 08 05 02's own list of fifteen international
           fisheries bodies the Union pays compulsory contributions to
           (ICCAT, NAFO, IOTC, GFCM and eleven others) is the same shape at
           smaller scale — both are AGENCY-ONLY-adjacent in the sense that
           no publication is named, only the international bodies and the
           agreements establishing membership.
```

### S03-16 — Decentralised agency and pilot-project tags, confirming DISC-07-03's Title-08 family

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Chapter 08 10, Article 08 10 01 (MFF column), printed p. 329.
           Chapter 08 20, Article 08 20 01 (MFF column), printed p. 330.
QUOTE:     "08 10 01 European Fisheries Control Agency 3.2.1DAG 32 282 647
           [...]"
           "08 20 01 Pilot projects 3.2.1PPPA p.m. 6 518 501 [...]"
NAMES:     European Fisheries Control Agency
TENSE:     N/A
NOTES:     Both non-standard tags G.21 catalogued (`DAG` for decentralised
           agencies, `PPPA` for pilot projects/preparatory actions) recur
           here in Title 08's own MFF numbering family (`3.2.1<TAG>`,
           distinct from Title 01's `1.0.1<TAG>` and the institutional
           sections' `7.2.<n>9<TAG>`) — a third code-position variant of the
           same two tags, extending the pattern already noted at S03-08 for
           `PPPA`. The European Fisheries Control Agency's own item carries
           an unusual reconciliation block not seen elsewhere: "Total Union
           contribution 32,334,037 / of which amount coming from the
           recovery of surplus (revenue Article 6 6 2) 51,390 / Amount
           entered in the budget 32,282,647" — a documented, arithmetic
           expenditure-minus-recovered-surplus calculation, the clearest
           `calculated_from`-shaped internal relationship found in SEC03 so
           far (Total Union contribution − recovered surplus = amount
           entered: 32,334,037 − 51,390 = 32,282,647, checked and exact).
```

---

## Register of what was searched and not found

Per `Research.1.md` §6, absences are results. Strings searched over the full
extracted text of Title 08 (printed pp. 299–331), whole chapter set, no
truncation:

| String | Hits | What it means |
|---|---|---|
| `Eurostat` | 0 | No EU statistical release named in Title 08's own text |
| `HICP` | 0 | ditto |
| `consumer price` | 0 | ditto |
| `reference price` | 0 | Notable given the commodity-market subject matter — market-intervention articles (fruit and vegetables, wine, olive oil) name no reference price |
| `market price` | 0 | ditto |
| `index` (standalone) | 0 | ditto |
| `GNI` | 0* | *2 raw substring hits, both false positives ("recognizing", "significant") |
| `statistic`/`statistics` | 3 | All three at S03-12 — the Farm Sustainability Data Network / integrated farm statistics find, the one genuine exception in the whole Title |

**Title 08 is the tenth section/Title of this corpus tested this way** (after
SEC05, SEC06, SEC07, SEC01, SEC02, SEC08, SEC09, SEC10, SEC03 Title 01) —
and the **first to return a real hit** on the statistics watchlist. Every
prior absence stands; this one location breaks it.

---

## What this record does not do

- **It does not follow the Farm Sustainability Data Network / integrated
  farm statistics lead to a source.** S03-12 names the funding mechanism and
  the founding legal instruments; it does not retrieve Regulation (EC)
  No 1217/2009, Regulation (EU) 2023/2674 or Regulation (EU) 2018/1091, and
  it does not establish what the FSDN or Eurofarm actually publish, under
  what title, or on what cadence. **This is now the single highest-value
  cheap check in the branch** — see priority section of the accompanying
  hand-off.
- **It does not cover Titles 02–07, 09–16, 20, 21, 30**, nor the revenue
  side, nor the Annexes. ~950 of SEC03's 1,114 pages remain untouched.
- **It does not propose any node or edge.** Every record is a figures-table
  quote, a legal-basis citation, or a structural observation — S03-12 is a
  strong lead, not a minted node, per its own note.
- **It does not supply a hash-verified retrieval URL.**
