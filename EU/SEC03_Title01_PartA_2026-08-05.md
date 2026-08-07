# SEC03 — Part A extraction record (Master summary + Title 01, complete)

**Section III — Commission**, Draft Budget 2027. SEC03 is the Commission's
own section and, unlike every other section in this corpus, is **its own
1,114-page corpus** — `G.21.md`'s own secondary observation says so, and
priority B has filed it separately from priority A's SEC00–SEC10 pass since
`G.15.md`. This record closes the first bounded piece of it: the 20-Title
expenditure master summary, and Title 01 (Research and Innovation, EUR
13.8bn CA) in full, all four of its chapters.

**Provenance is mixed, and each record says which kind it is.** A prior
chat-era session (2026-08-03, batch IDs `SEC03-EXP-2026-08-03-A1`/`-A2`,
preserved in `EU/EU Meta jsons.docx` lines ~9860–10047) had already extracted
the master summary table and Chapter 01 01 (Support administrative
expenditure) in full, plus Chapter 01 02's figures table, before stopping at
printed p. 90. That material was **buried in a 12,447-paragraph docx never
converted to the current Part A file convention** — this record ports it,
after independently re-extracting the master summary table from the live PDF
this session and confirming every figure matches exactly. **Chapter 01 01's
narrative/legal-basis content is ported and not independently re-verified
line by line this session** — flagged in its own record. Everything from
Chapter 01 02's item-level remarks onward (printed p. 91 through the end of
Chapter 01 20, printed p. 116) is **first-hand this session**, read directly
from `SEC03.pdf`.

**Source.** `EU/SEC03.pdf`, 1,114 pages verified against `pypdf`. This record
covers printed pp. 72–116 (the expenditure master summary and all of Title
01). The remaining ~1,000 pages (Titles 02–30 expenditure, Titles 2–6
revenue, the Annexes) are **untouched** — see "What this record does not do."
Text extracted with `pypdf`; PDF-kerning artefacts silently closed up.

**Retrieval URL constructed by pattern**, same status as every section besides SEC05:

```
https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
```

**Not fetched or hashed.** Verify before importing anything built on this.

No verdicts below. Where two things point opposite ways they are both quoted
and neither is picked, per `Research.1.md` §3.

---

## Part A records

### S03-01 — the 20-Title expenditure master summary

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Expenditure master summary table, printed pp. 72–73.
QUOTE:     "01 Research and Innovation 13 806 032 501 15 158 619 728
           [...] 30 Reserves 2 097 495 080 1 971 439 302 2 546 262 731
           1 955 725 949 0,— 0,— [...] Total 194 400 750 140 206 470 345 348
           187 802 728 855 192 686 212 967 190 892 143 280,35
           152 985 334 307,32 [...] Of which Reserves 290 321 227 200 118 227
           775 504 052 220 117 052" [2027 Commitments/Payments, 2026
           Commitments/Payments, 2025 out-turn Commitments/Payments; 19 Title
           rows plus 10 reserve sub-rows, full table]
NAMES:     NO PUBLICATION NAMED — internal figures table
TENSE:     N/A
NOTES:     **Re-extracted independently from the live PDF this session and
           checked against the 2026-08-03 chat-era batch: every figure
           matches exactly**, including the arithmetic checks the earlier
           session performed (19 Title rows sum to exactly 194,400,750,140
           CA and 206,470,345,348 PA with zero residual; the ten reserve
           sub-rows sum to exactly 290,321,227 CA with zero residual).
           **Title 16 is the only Title heading naming an external
           instrument** — "Expenditure outside the annual ceilings set out
           in the Multiannual Financial Framework" — and does so to define
           itself by exclusion, not as a data input.
           **Two unresolved figures, flagged rather than adjudicated, both
           inherited from the chat-era batch and re-confirmed this session:**
           (1) the Title 30 "Reserves" row (2,097,495,080 CA) is not the same
           figure as the "Of which Reserves" row at the foot of the table
           (290,321,227 CA) even though both concern reserves — a difference
           of 1,807,173,853 in CA that neither location explains. (2) This
           section's own total (194,400,750,140 CA) is smaller than the
           EUR 199,905.1 million all-sections total published in SEC(2026)
           250's policy highlights — different scopes (Section III alone vs.
           all sections plus special instruments), and neither document
           states the reconciliation at either location.
```

### S03-02 — Chapter 01 01, Support administrative expenditure of the Research and Innovation cluster (ported)

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Chapter 01 01, printed pp. 73–90.
QUOTE:     Chapter total: "01 01 Support administrative expenditure of the
           'Research and Innovation' cluster 983 521 963 983 521 963
           958 604 669 958 604 669 916 161 097,39 916 161 097,39"
           Legal basis cross-reference: "Legal basis / See Chapter 01 02."
           Item 01 01 01 01 Remarks: "This appropriation is intended to
           cover expenditure relating to officials and temporary staff
           implementing the specific research and innovation programme —
           Horizon Europe and occupying posts on the authorised
           establishment plans engaged in indirect research actions,
           including officials and temporary staff posted in Union
           delegations."
NAMES:     Horizon Europe
TENSE:     PRESENT
NOTES:     **Ported from the 2026-08-03 chat-era batch
           (`SEC03-EXP-2026-08-03-A1`/`-A2`), which claims this chapter
           complete — all figures-table rows, all article/item Remarks, all
           Assigned revenue blocks, all Legal basis and Reference acts
           blocks.** CA = PA throughout (non-differentiated appropriations),
           matching the master summary's Title 01/Chapter 01 01 row exactly.
           **The chapter states no legal basis of its own and cross-refers
           to Chapter 01 02** — a documented internal cross-reference, the
           inverse shape of most sections' pattern where an administrative
           chapter has its own citation. Every item row carries an MFF
           sub-heading code (e.g. `1.0.11`), a column present at
           article/item level but absent from Title- or Chapter-level
           summaries — the same DISC-07-03 mechanical link already
           documented for the SEC01–SEC10 institutional sections.
           **Not independently re-verified line by line this session.**
           Spot-checked structurally against the freshly-extracted master
           summary (S03-01) and against this session's own reading of
           Chapters 01 02–01 20, which match the same conventions
           (Remarks / Assigned revenue / Legal basis block order, the "This
           appropriation is intended to..." opening formula) exactly. Treat
           any individual figure from this chapter as ported, not verified,
           until re-read from the live PDF.
```

### S03-03 — Chapter 01 02, Horizon Europe: the figures table and the chapter-level legal basis

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Chapter 01 02 figures table, printed pp. 88–90. Chapter-level
           Remarks and Legal basis, printed pp. 90–91.
QUOTE:     Chapter total: "Chapter 01 02 — Total 11 977 271 331
           13 346 918 953 12 155 627 413 13 012 519 874 11 955 664 876,96
           10 314 416 742,50"
           "In addition, and in accordance with Regulation (EU) 2020/2094,
           external assigned revenue resulting from proceeds of the European
           Union Recovery Instrument entered in the statement of revenue
           give rise to the provision of appropriations for this programme
           under this title for a total amount of EUR 5 412 000 000 in
           commitments."
NAMES:     Council Regulation (EU) 2020/2094
           Regulation (EU) 2021/695
           Council Decision (EU) 2021/764
           Regulation (EU) 2021/947
           Regulation (EU) 2021/2115
TENSE:     PRESENT
NOTES:     Five named acts form the chapter-level legal basis, headed by
           Regulation (EU) 2021/695 (the Horizon Europe framework
           regulation itself). **Two of the five are odd, flagged not
           resolved, per the 2026-08-03 batch's own note, confirmed this
           session**: Regulation (EU) 2021/947 (the Neighbourhood,
           Development and International Cooperation Instrument — "Global
           Europe") and Regulation (EU) 2021/2115 (the CAP Strategic Plans
           regulation) are both cited as legal basis for a research chapter
           with no explanation in the Remarks of the link. 2021/947 also
           governs Title 14 (External Action) elsewhere in this document —
           whether this is a genuine cross-programme basis or an artefact of
           third-country association provisions is not stated at this
           location. Cross-document note: SEC(2026) 250 reports Horizon
           Europe's 2027 CA as EUR 12,838.5 million against this chapter's
           EUR 11,977,271,331 — SEC(2026) 250 states the difference includes
           an MFFR Article 5 reinforcement (EUR 816.9m) and an FR Article
           15(3) decommitment re-use (EUR 31.7m); this chapter does not
           state what it includes. Not reconciled at either location.
```

### S03-04 — the Joint Undertaking pattern: twelve bodies, one shared founding regulation, three exceptions

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Chapter 01 02, Article 01 02 02 (Pillar II clusters), items
           01 02 02 11 through 01 02 02 61, printed pp. 93–100.
QUOTE:     Representative (Item 01 02 02 12, Global Health EDCTP3 Joint
           Undertaking): "Council Regulation (EU) 2021/2085 of 19 November
           2021 establishing the Joint Undertakings under Horizon Europe and
           repealing Regulations (EC) No 219/2007, (EU) No 557/2014, (EU)
           No 558/2014, (EU) No 559/2014, (EU) No 560/2014, (EU) No 561/2014
           and (EU) No 642/2014."
NAMES:     Innovative Health Initiative Joint Undertaking
           Global Health EDCTP3 Joint Undertaking
           European High-Performance Computing Joint Undertaking (EuroHPC)
           Chips Joint Undertaking
           Smart Networks and Services Joint Undertaking
           Single European Sky ATM Research 3 Joint Undertaking
           Clean Aviation Joint Undertaking
           Europe's Rail Joint Undertaking
           Clean Hydrogen Joint Undertaking
           Circular Bio-based Europe Joint Undertaking
           European Cybersecurity Industrial, Technology and Research
           Competence Centre
TENSE:     PRESENT
NOTES:     Reported as one record with the full list of locations, per
           S05-15's practice — the finding is the count and the pattern, not
           any one citation. **Nine of eleven Joint Undertaking-type bodies
           cite Council Regulation (EU) 2021/2085 as their founding
           instrument**, verbatim identical citation text at every one of
           the nine locations (items 01 02 02 12, 51, 52, 53, 54, 61, and
           three more not separately quoted here). **Three exceptions, each
           flagged in its own item's Legal basis block:** EuroHPC (item
           01 02 02 41) cites its own amending regulation, Council Regulation
           (EU) 2026/150, alongside the establishing Regulation (EU)
           2021/1173 (not itself quoted in the extracted range); the Chips
           Joint Undertaking (item 01 02 02 42) additionally cites Regulation
           (EU) 2023/1781 (the Chips Act) and Council Regulation (EU)
           2023/1782; the European Cybersecurity Industrial, Technology and
           Research Competence Centre (item 01 02 02 31, itself a `p.m.`
           line with no appropriation) cites a wholly separate instrument,
           Regulation (EU) 2021/887, alongside the Digital Europe Programme
           regulation and Horizon Europe's own. None of the twelve items'
           Remarks or Legal basis blocks name a statistical release,
           Eurostat product or price index — every one is a programmatic
           founding-instrument citation, consistent with the corpus-wide
           absence documented at S03-10 below.
```

### S03-05 — the densest legal-basis block found anywhere in the corpus

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Item 01 02 99 01, "Completion of previous research programmes
           (prior to 2021)", Legal basis block, printed pp. 105–107.
QUOTE:     "Decision No 456/2005/EC [...] Decision No 1639/2006/EC [...]
           Regulation (EC) No 1906/2006 [...] Council Decision 2006/971/EC
           [...] Council Decision 2006/972/EC [...] Council Decision
           2006/973/EC [...] Council Decision 2006/974/EC [...] Council
           Decision 2006/975/EC [...] Council Regulation (EC) No 219/2007
           [...] Council Regulation (EC) No 71/2008 [...] Council Regulation
           (EC) No 72/2008 [...] Council Regulation (EC) No 73/2008 [...]
           Council Regulation (EC) No 74/2008 [...] Regulation (EC)
           No 294/2008 [...] Council Regulation (EC) No 521/2008 [...]
           Council Regulation (EC) No 1361/2008 [...] Council Decision
           2013/743/EU [...] Regulation (EU) No 1290/2013 [...] Regulation
           (EU) No 1291/2013 [...] Council Regulation (EU) No 557/2014
           [...] Council Regulation (EU) No 558/2014 [...] Council
           Regulation (EU) No 559/2014 [...] Council Regulation (EU)
           No 560/2014 [...] Council Regulation (EU) No 561/2014 [...]
           Council Regulation (EU) No 642/2014 [...] Council Regulation (EU)
           No 721/2014 [...] Regulation (EU) 2015/1017 [...] Council
           Regulation (EU) 2018/1488" [25 distinct instruments, full OJ/ELI
           citation each in the source, condensed here to short titles]
NAMES:     25 distinct legal instruments, 2005–2018, listed above
TENSE:     PRESENT
NOTES:     A `p.m.` (2027 commitments) line — no new appropriation, only
           residual payments settling prior commitments — carries the single
           densest legal-basis block found anywhere in this corpus, 25
           instruments spanning 13 years, tracing the lineage from the
           current Horizon Europe Joint Undertakings back through Horizon
           2020, the Seventh Framework Programme and the original 2005–2008
           founding regulations of SESAR, Clean Sky, ENIAC, the Innovative
           Medicines Initiative, ARTEMIS, the EIT and the Fuel Cells and
           Hydrogen Joint Undertaking. None names a statistical release.
           **This is a completion/wind-down provision, not a live programme**
           — worth remembering if the branch ever weighs legal-basis density
           as a signal of node importance, per the caution already recorded
           at S05-16 ("anyone counting mentions to rank instruments by
           importance would rank the Financial Regulation first on a
           formatting artefact").
```

### S03-06 — Chapter 01 03, Euratom Research and Training Programme (complete)

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Chapter 01 03, printed pp. 107–110.
QUOTE:     "Chapter 01 03 — Total 190 507 156 100 171 070 181 534 270
           108 045 140 179 115 187,48 153 299 839,72"
           Legal basis: "Council Regulation (Euratom) 2021/765 of 10 May
           2021 establishing the Research and Training Programme of the
           European Atomic Energy Community for the period 2021-2025 [...]
           Council Regulation (Euratom) 2025/1304 of 23 June 2025
           establishing the Research and Training Programme of the European
           Atomic Energy Community for the period 2026-2027 [...]
           complementing Horizon Europe [...] and repealing Regulation
           (Euratom) 2021/765."
NAMES:     Council Regulation (Euratom) 2021/765
           Council Regulation (Euratom) 2025/1304
TENSE:     PRESENT
NOTES:     First-hand this session. Three articles (Fusion research and
           development; Nuclear fission, safety and radiation protection;
           Nuclear direct actions of the Joint Research Centre) plus a
           completion article citing its own 13-instrument legal-basis chain
           back to 2006, same shape as S03-05 but shorter. **The programme's
           own two founding regulations show a mid-period repeal-and-replace
           not seen elsewhere in this corpus's institutional material**: the
           2021-2025 regulation was itself repealed and replaced by a
           2026-2027 regulation dated 23 June 2025, mid-MFF, rather than
           running the full 2021-2027 period the way Horizon Europe's own
           framework regulation does. No statistical release named anywhere
           in the chapter.
```

### S03-07 — Chapter 01 04, ITER (complete)

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Chapter 01 04, printed pp. 110–112.
QUOTE:     "Chapter 01 04 — Total 654 732 051 715 326 844 843 959 592
           923 079 608 480 087 069,— 635 650 679,—"
           "The European Joint Undertaking for ITER and the Development of
           Fusion for Energy has been established by Decision
           2007/198/Euratom."
NAMES:     Council Decision 2007/198/Euratom
TENSE:     PRESENT (chapter); PAST ("has been established")
NOTES:     First-hand this session. A single-article chapter (Construction,
           operation and exploitation of the ITER facilities), CA falling
           22.4% on 2026. The completion item's Legal basis block names the
           ITER International Fusion Energy Organisation's own founding
           international agreement alongside the usual Euratom-programme
           chain — the only place in Title 01 where an intergovernmental
           organisation's constituent agreement, rather than an EU
           regulation or decision, appears as a cited legal basis. No
           statistical release named.
```

### S03-08 — Chapter 01 20, Pilot projects etc.: a fourth non-standard MFF tag

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Chapter 01 20 figures table, printed pp. 112–113 (MFF column).
QUOTE:     "01 20 01 Pilot projects 1.0.1PPPA p.m. 5 061 921 [...]"
           "01 20 03 01 Research programme for steel 1.0.1OTH p.m. p.m.
           [...]"
NAMES:     NO PUBLICATION NAMED
TENSE:     N/A
NOTES:     **A fourth non-standard MFF sub-heading tag, `OTH`, not on the
           list `G.21.md` established (`SPEC`, `DAG`, `PPPA`).** Chapter
           01 20's `01 20 01`/`01 20 02` (Pilot projects, Preparatory
           actions) carry `1.0.1PPPA` — the same `PPPA` tag already
           documented at SEC01 (item 3244, `G.27.md`) and SEC10 (item 2250,
           `G.28.md` S10-03) — while `01 20 03`'s five items (Research
           programme for steel, Research programme for coal, JRC third-party
           work, JRC competitive scientific support, the HFR supplementary
           research programme) all carry `1.0.1OTH` instead. Discharges part
           of `G.26.md`'s outstanding cheap check "enumerate the `9`-series
           tags beyond `SPEC`/`DAG`/`PPPA`" — though note this tag sits in a
           different code position (`1.0.1OTH`, not a `7.2.<n>9<TAG>` form),
           so it may be a structurally distinct convention rather than a
           fourth member of the same family. Flagged, not resolved. The
           chapter is otherwise unremarkable: two `p.m.`-heavy articles and
           a wind-down completion item citing nine historical JRC
           supplementary-research-programme decisions back to 1983 — the
           corpus's earliest-dated legal citation found so far, predating
           every other instrument seen in this branch by over two decades.
```

### S03-09 — an internal revenue cross-reference structure (ported, low priority)

```
URL:       https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC03.pdf
LOCATION:  Every item-level "Assigned revenue" block in Chapter 01 01 and
           01 02, e.g. Item 01 02 01 01, printed pp. 75–76.
QUOTE:     "Assigned revenue (origin, estimated amounts and corresponding
           article or item of the statement of revenue). / EFTA-EEA
           4 939 040 6 6 0 0 / Candidate countries and Western Balkan
           potential candidates 509 823 6 0 1 0"
NAMES:     NO PUBLICATION NAMED — intra-document cross-reference
TENSE:     PRESENT
NOTES:     Ported from the 2026-08-03 batch's own observation, confirmed by
           this session's reading of every item in Chapters 01 02–01 20:
           **every expenditure item's assigned-revenue line names the exact
           revenue article or item that feeds it** (`6 6 0 0` for EFTA-EEA
           contributions, `6 0 1 0` for other third-country contributions,
           `6 0 1 4` for "other assigned revenue"). That is a stated,
           mechanical input relationship running expenditure ← revenue,
           entirely within this one document. Whether the project treats
           intra-document line cross-references as edges is a scoping
           question for the other end of the process, per the original
           note — recorded here so the option exists, not resolved.
```

---

## Register of what was searched and not found

Per `Research.1.md` §6, absences are results. Strings searched over the
**Title 01 portion of `SEC03.pdf` only (printed pp. 72–116, this session's
extracted range)** — not the full 1,114 pages, which remains unsearched:

| String | Hits | What it means |
|---|---|---|
| `Eurostat` | 0 | No EU statistical release named anywhere in Title 01 |
| `HICP` | 0 | ditto |
| `consumer price` | 0 | ditto |
| `indexation` | 0 | ditto |
| `index-linking` | 0 | ditto |
| `GNI` | 0* | *2 raw substring hits, both false positives inside "recognizing" and "significant" |
| `comparable`, `consistent with` | 0 each | §5a watchlist absent |
| `OTH` (MFF tag) | new this session | See S03-08 |

**The absence now extends to a ninth section of the corpus** (after SEC05,
SEC06, SEC07, SEC01, SEC02, SEC08, SEC09, SEC10) — but this is the first
time it is checked against operational/programmatic material rather than
administrative-budget material, and it holds the same way: EUR 13.8 billion
of research funding, dozens of named legal instruments, and not one
statistical release.

---

## What this record does not do

- **It does not cover the other 19 Titles of SEC03's expenditure side**
  (Titles 02–16, 20, 21, 30 — everything but Title 01), nor the revenue side
  (Titles 2–6), nor the Annexes (Staff, Annexed Offices, Pilot
  projects/preparatory actions detail). That is **~1,000 of SEC03's 1,114
  pages**, entirely untouched. `G.15.md`'s priority B items 7–12 already
  scope this work one Title/group at a time; Title 08 (Agriculture, EUR
  54.9bn CA, the largest Title in the whole document) and Title 05 (Regional
  Development and Cohesion, EUR 44.0bn CA, the second largest) are the two
  highest-value remaining targets by size.
- **It does not independently re-verify Chapter 01 01** (S03-02) — ported
  from a prior session's chat-era batch, structurally consistent with
  everything read first-hand this session, but not re-read from the PDF.
- **It does not resolve either of the two unreconciled-figure findings**
  (S03-01's Title 30/"Of which Reserves" gap, S03-03's Horizon Europe
  CA discrepancy against SEC(2026) 250) — both quoted and left open, per §3.
- **It does not propose any node or edge.** Every record is either a
  figures-table quote, a legal-basis citation (none naming a statistical
  release), or a structural/methodological observation.
- **It does not supply a hash-verified retrieval URL** — constructed by
  pattern, not fetched.
