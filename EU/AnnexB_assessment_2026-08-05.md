# ESA 2010 Annex B — assessment record

**Cheap check 1, carried unchanged since `G.20.md`.** Discharged 2026-08-05.
Scores the prediction logged at G.19 finding 6 and restated at G.20 finding 5.

**The question, in `G.20.md`'s own words:** *"whether Annex B's tables satisfy
`Research.1.md` §4's third binding condition — it has a title"*, and whether the
programme *"names obligations and table numbers but no publications"*, in which
case *"that is `AGENCY ONLY` at scale and the prediction fails."*

**Answer: it names obligations, table numbers, subjects and deadlines. It names
no publications. The prediction fails, in exactly the manner G.20 anticipated.**

---

## What this is, and what it is not

**This is an assessment of staged records, not a new extraction.** The 43 records
below were extracted from the source documents by an earlier session and sit in
`EU/slices/_staging/`. I read the **records**, not the sources. The quotes carry
their own URLs and are verbatim as staged, but **I did not open a single source
document to verify them.** Anything downstream inherits that.

That is the right level for this check — the question was always "what do these
records say", and `Research.1.md` §3 puts adjudication at the other end of the
process anyway. But it means a quote that was mis-transcribed upstream would pass
through here unnoticed.

**Method.** All 960 Part A records in `10-batch-with-records.ndjson` and
`10-loose-record.ndjson` were parsed; **43** match `Annex B` /
`transmission programme` / `transmission program`, spanning **22 distinct record
ids — and 14 of the 43 carry no `id` at all.** Twelve were read in full for
meaning, chosen to cover the instrument itself, the programme document, the table
overview, and the national end. **31 were not read**, and nothing here speaks for
them.

**Two corpus defects surfaced in passing, both feeding priority E4.**

- **A confirmed duplicate.** `esa-reg-article1` and `esa2010-art1-2` carry
  **byte-identical quotes at the same location** (Article 1(2)) under two
  different id conventions; the same holds for `esa-reg-article3` /
  `esa2010-art3-1`. E4 ("reconcile the 49 duplicate … records") now has a worked
  example, and the cause is visible: **two id-naming schemes were used for the
  same instrument** — `esa-reg-*` and `esa2010-*`. That is the exact failure
  `Research.1.md` §9 warns about, one level up from node ids.
- **14 of 43 matched records have no id**, so they cannot be cited and would be
  discarded under §6. That is a third of this subset, against the 77 id-less
  records E4 records corpus-wide.

---

## The records that settle it

### 1. Annex B's own self-description: time limits, accounts and tables

```
ID:        esa-reg-article1
URL:       https://eur-lex.europa.eu/eli/reg/2013/549
LOCATION:  Article 1(2)
QUOTE:     "The ESA 2010 provides for: (a) a methodology (Annex A) on common
           standards, definitions, classifications and accounting rules that
           shall be used for compiling accounts and tables on comparable bases
           for the purposes of the Union, together with results as required under
           Article 3; (b) a programme (Annex B) setting out the time limits by
           which Member States shall transmit to the Commission (Eurostat) the
           accounts and tables to be compiled in accordance with the methodology
           referred to in point (a)."
```

The Regulation defines Annex B as **"a programme … setting out the time limits"**.
Not a list of publications. This is the instrument describing itself, and it is
the single most decisive quote in the set.

Note also that **Annex A is on the §5a watchlist**: "compiling accounts and tables
on **comparable bases**". That is comparability language in the operative
provision of the governing regulation, and it is not a dependency claim.

### 2. The obligation runs to tables, and the deadlines are per-table

```
ID:        esa-reg-article3
LOCATION:  Article 3(1)
QUOTE:     "The Member States shall transmit to the Commission (Eurostat) the
           accounts and tables set out in Annex B within the time limits
           specified therein for each table."
```

**"The Member States shall transmit"** — the obligated party is a Member State,
not a named publication. This is `AGENCY ONLY` in the §6 sense, written into the
operative provision of a Regulation.

### 3. The table overview — what Annex B actually contains

```
ID:        esa-tp-tables-overview
URL:       https://ec.europa.eu/eurostat/documents/3859598/5936561/
           KS-01-13-429-3A-C-EN.PDF.pdf/...
LOCATION:  Overview of the tables
QUOTE:     "Table No | Subject of the tables | Deadline t + months (days where
           specified) | Period covered
           1 | Main aggregates — quarterly | 2 | 1995Q1 onwards
           1 | Main aggregates — annual | 2/9 | 1995 onwards
           2 | Main aggregates of general government — annual | 3/9 | 1995 onwards
           3 | Tables by industry — annual | 9/21 | 1995 onwards
           […] 801 | Non-financial accounts by sector — quarterly | 85 days |
           1999Q1 onwards […]"
```

**Four columns: number, subject, deadline, period.** There is no column for a
publication, a publisher, or a title. "Main aggregates — quarterly" is a
**data-delivery slot**, not the name of anything anyone publishes.

This is the record that answers the check. `Research.1.md` §4.3 is explicit:
*"'Statistics Canada' is not a node. Survey of Employment, Payrolls and Hours
is."* Annex B is the first kind of thing all the way down.

### 4. The national end names table numbers, not national publications

```
ID:        destatis-edp-inv-2015-esa-tables-link
URL:       https://www.destatis.de/DE/Themen/Wirtschaft/...eu-stabilitaetspakt-
           eurostat-edp-info.pdf
LOCATION:  Transmission of national accounts data for general government
QUOTE:     "National accounts data for general government are transmitted to
           Eurostat via the following tables (see the related EU legislation):
           Table 2 Main aggregates of general government (annual data); Table 6
           Financial accounts by sector (annual data); […] Table 28 Quarterly
           Government Debt (Maastricht Debt) for General Government."
NAMES:     ESA 2010 Table 2, Table 6, Table 7, Table 801, Table 9, Table 11,
           Table 25, Table 26, Table 27, Table 28
```

**This is the strongest test and it fails cleanly.** A national statistical
office, describing its own transmission, names **ten items — and every one is an
ESA table number.** Not one German publication is named. If the member-state end
were ever going to name its own releases, this is the record where it would have
happened.

### 5. The German QNA record — closest to a hit, still not one

```
ID:        destatis-qna-transmission
LOCATION:  transmission to Eurostat
QUOTE:     "The German QNA are transmitted to Eurostat in accordance with the
           mandatory ESA transmission program. Additionally, there are
           supplementary agreements between Eurostat and the member states for
           the early submission of national GDP results 30 days after the end of
           the reporting quarter (t+30). Quarterly sector accounts and quarterly
           government accounts are delivered to Eurostat in accordance with
           European regulations no later than 85 days after the end of the
           reporting period."
NAMES:     ESA transmission programme, t+30 GDP flash, t+85 sector/government
           accounts
```

"The German QNA" is the nearest thing to a named national release in the whole
set — and it is a **category** (quarterly national accounts), staged with `NAMES`
that are arrangements and deadlines rather than titles.

Worth flagging separately: **"supplementary agreements between Eurostat and the
member states"** are named as a source of obligation and are not identified,
dated or cited. Terminus candidate, kind `unidentified`.

---

## The counterweight — report both sides, per §3

One record cuts the other way and it should not be buried.

```
ID:        list-main-stats-2025-na
URL:       https://ec.europa.eu/eurostat/documents/13019146/21116264/
           list-main-statistics-2025.pdf/...
LOCATION:  National accounts / government / BOP cluster
QUOTE:     "[NAMA] Annual national accounts … Gross Domestic Product (GDP). …
           Highest frequency: Annual. Specific legal basis: (EU) [549/2013
           implied]. [NAMQ] Quarterly national accounts … Highest frequency:
           Quarterly. Specific legal basis: (EU) 549/2013. […] [NA-Pen] Pension
           entitlements in social insurance … according to Table 29 of the ESA
           2010 Transmission Programme. Specific legal basis: Regulation (EU)
           No 549/2013. […] [MUFA] Quarterly Financial Accounts … collected and
           re-transmitted by the ECB. Highest frequency: Quarterly."
```

**This is node-shaped material.** Named products with stable codes (NAMA, NAMQ,
NASA, NASQ, GovQ, GovD&D, NA-Pen, BoP, MUFA), a stated cadence for each
("Highest frequency: Annual/Quarterly/Monthly"), and a named legal basis. Three
of §4's conditions in one table.

**But they are Eurostat's own dissemination products, not member-state
releases.** So the counterweight does not rescue the prediction — it points the
same way as G.22 finding 1: *the EU layer names its own outputs precisely and its
national inputs by institution.*

Two things in that quote deserve their own follow-up. **`[MUFA] … collected and
re-transmitted by the ECB`** is a textbook `redistributed` terminus in
`Research.1.md` §4's sense — reached via an intermediary. And **`[NA-Pen] …
according to Table 29`** is the one place where a *named product* is tied to a
*specific Annex B table*, which is the closest the corpus comes to a
table-to-publication mapping.

**A defect in this record, flagged because it is actionable.** It bundles
**nine products under one heading**, which is precisely the failure `Research.1.md`
§6 describes: *"fourteen good quotes under one heading marked 'illustrative
cluster'; none carried its own section number, so none could be cited, so all
fourteen were discarded."* This record should be **split into nine** before
anything is built on it. It is currently the most valuable single record in the
Eurostat staging area and the most likely to be thrown away whole.

---

## Scoring the prediction

G.19 finding 6 predicted that ESA 2010's Annex B would supply the documented
supranational-to-national edge shape the Canada/US pair lacks.

| Limb | Outcome |
|---|---|
| Annex B exists, is a Regulation annex, and creates a binding obligation | **Confirmed** — Articles 1(2), 3(1), 5(1) |
| The material is present in the corpus | **Confirmed** — 43 records, 23 ids |
| Annex B names **publications** | **Refuted** — it names table numbers, subjects and deadlines |
| Member-state records name their **own releases** | **Refuted** — Destatis names ten ESA table numbers and no German publication |
| Therefore a supranational→named-national-release edge | **Not produced** |

**This is the second independent chain to fail the same way**, after the Annex XI
salary-update chain (`G.22.md` finding 1). Two instruments, chosen independently,
both binding, both landing `AGENCY ONLY` at the national boundary.

**What that does and does not license.** `EU/slices/README.md` set this up as the
test of whether the Canada/US result — zero standard-compliant direct official
cross-border edges — is a fact about those two countries or about national
statistical systems generally. Two chains now point at the second answer. That is
no longer a single data point, and it is the branch's most substantive result.

**It is still not proof.** Both chains were assessed from records or from an
operative document rather than from the annex text itself: Annex XI was never
retrieved (EUR-Lex gated), and Annex B's full table list here is a staged
overview, not the Annex read line by line. A third chain of a different kind —
the EBS Regulation 2019/2152, named in `Research.EU.md` §1 and untouched — would
be the natural check.

**And there is a real edge here, pointing the other way.** Eurostat's own
products (NAMA, NAMQ, …) are named, have cadences, and cite Regulation 549/2013
as their legal basis. That is a documented instrument→publication relationship at
the supranational layer, and it is importable once the records are split. The EU
graph's first real edges are more likely to run *inside* the EU layer than across
it.

---

## What this does not do

- **It opens no source document.** Assessment of staged records only.
- **It proposes no node and no edge**, including from the `list-main-stats-2025`
  record, which must be split first.
- **It does not read Annex B itself.** The table overview is the programme's own
  presentation document (KS-01-13-429), not the Annex as enacted. Tables 11–29
  are referred to but only 1–10 are quoted in the staged overview.
- **It does not check the 31 records not read for meaning**, of the 43 matched —
  including the 14 that carry no id.
