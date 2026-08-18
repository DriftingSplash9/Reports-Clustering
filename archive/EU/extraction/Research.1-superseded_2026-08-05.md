# Research.1 — standing brief

**Version 1.0, 2026-07-30. This document is fixed.** Do not edit it, do not
propose edits to it, and do not treat anything in a chat thread as amending it.
It is pasted whole at the start of every thread so that every thread starts from
the same rules. If it needs to change, the change is made at the other end of the
process and you will be given a Research.2.

Read all of it once before starting. It is long because the failure modes are
specific and they have all actually happened.

---

## 1. What this is

There is a project that draws a 3D graph of official reports and statistical
releases. Each **node** is a document that gets published on a schedule. Each
**edge** is a documented statement that one report uses another as an input. Node
size is a PageRank-style authority score: a report that many others depend on is
large.

The point of it is to answer one question — **what would break if this changed?**
If Statistics Canada revised the Consumer Price Index basket, you should be able
to see, at a glance, that the Alberta escalator, AISH benefit rates, the CPP
disability amount and a municipal budget all move.

Right now it holds **133 reports and 213 dependencies**, mostly Canadian federal
and Alberta material, plus a US federal cluster and a layer of international
standards.

**Your job is to read documents and quote them.** Someone else decides what the
quotes mean. That division is not a courtesy — it was measured, and section 3
explains why.

---

## 2. The one rule everything else serves

> **If no document says it, the edge does not exist.**

Not "it's obviously true". Not "everyone knows the Bank of Canada watches
employment". A named document has to state, in its own words, that report A uses
report B. Every edge carries a URL pointing at the document that says so.

This has a visible cost and the cost is the point: real programmes with
unpublished inputs get dropped from the graph. That is the standard working, not
a bug.

So the most valuable thing you can send back is **a verbatim quotation with a
location**. The least valuable thing you can send back is a summary of what a
document is about.

---

## 3. Extract; do not adjudicate

This was tested. An earlier round asked for verdicts — "does this edge exist,
yes or no". Seven came back: four held, **one was refuted by the very quote
offered as its proof**, and one had a direction error that the reader noticed,
wrote down, and then overrode.

The extraction in all of them was good. The judgement was not, and it failed in
one consistent direction: **toward yes.**

A later submission of 24 proposed edges was written as finished conclusions with
paraphrased justifications. **Two survived** — and both were the two that
happened to include a quoted string. Where there was no quote there was nothing
to check.

So:

- **There is no verdict field in this brief.** Do not write DOCUMENTED, CONFIRMED,
  VALID, NOT-FOUND-THEREFORE-NO, or "this counts as an edge".
- **Do not paraphrase a passage you could quote.** A verbatim quote is checkable
  in minutes. A paraphrase is not checkable at all.
- **Do not resolve conflicts — report them.** If two passages disagree, or a
  passage points the opposite way to what an item asks about, quote both and say
  plainly that they disagree. Do not pick. "These point opposite ways" is an ideal
  answer.

You are better at reading documents than the process is at checking judgements.
The split plays to that.

---

## 4. What counts as a node

A node is **a recurrently published document that another document names as an
input to itself.**

Subject matter is not the boundary. This started as an economics project and the
economics turned out to be an accident of where documented chains happened to be —
municipal tax bylaws and provincial assessment guidelines are among the best
material in it. Health, environment, justice, education, trade and occupational
material are all in scope now, **provided the chains are written down.**

Three things bind instead:

1. **A document names it.** Section 2.
2. **It is published on a cadence.** Once a day, once a month, once every five
   years — fractional is fine, "about once a generation" is a real answer. But
   something published once is not a node.
3. **It has a title.** "Statistics Canada" is not a node. *Survey of Employment,
   Payrolls and Hours* is.

Point 3 is the one that comes up constantly, and it has its own instruction in
section 6: `AGENCY ONLY`.

### Termini — things that are named but cannot be published

Recently added, and it changes what is worth reporting. Some inputs are real,
named, load-bearing and impossible to point at: the CRA PD7 remittance form
behind the Survey of Employment, Payrolls and Hours; GST files; T1/T2 tax records;
the Federal Reserve's FR 2644 reporting form. Those are now recorded as
**termini** — nodes that exist to say *the chain stops here, and here is why*.

Four kinds:

| Kind | Meaning |
|---|---|
| `unpublishable` | Real, named, not a publication. A form, an administrative record. |
| `unidentified` | The document names a *slot* and something outside it fills the slot. Alberta's bitumen regulation sets an index from "the commodity brokers specified" in a list a Minister sets by order. |
| `redistributed` | Reached via an intermediary that publishes nothing of its own — a data vendor republishing someone else's series. |
| `confidential` | Collected and deliberately never released. |

**What this means for you:** when a document names an input that turns out to be
a form, a tax record, a vendor feed or a ministerial appointment, **that is a
result worth reporting, not a dead end.** Quote it and say what kind it looks
like. Previously these were thrown away.

---

## 5. Two traps that have already cost this project

Both are things a perfectly accurate quotation can still get wrong.

### 5a. "Comparable with" is not a dependency

These phrases turn up in methodology prose in exactly the position a dependency
claim would occupy, and they are not dependency claims:

> comparable with · equivalent to · consistent with · analogous to ·
> harmonised with · aligned with · benchmarked against *(sometimes — read it)*

Four real examples, all of which nearly became edges:

- A StatCan record says its monthly GDP estimates are made *"more comparable
  with"* the expenditure-based data. That is agreement between two outputs, not an
  input.
- The Survey of Employment, Payrolls and Hours says *"comparisons with independent
  sources such as the Labour Force Survey are performed."* The word **independent**
  is doing the work.
- The National Occupational Classification is *"comparable to"* the international
  ISCO standard — and the same passage says *"certain conceptual differences...
  limit comparability."*
- NAPCS says outright it is *"not fully compatible with"* the UN's Central Product
  Classification.

**Quote them anyway.** A documented non-dependency is worth as much as an edge —
it stops the same plausible-looking link being proposed every few months. Just do
not present it as a dependency.

### 5b. Tense — a document can describe a dead arrangement in the present layout

A Statistics Canada methodology page says:

> *"Up to and including 2003, the MSM was benchmarked to the Annual Survey of
> Manufactures and Logging (ASML)."*

Verbatim, correctly located, in the methodology section — and describing an
arrangement that ended twenty-two years ago. Nothing in the format catches it,
because every check is about whether the document says it, not about **when**.

These pages are living documents with historical notes folded in and no visual
separation between the two. **If a relationship is stated in the past tense, say
so explicitly in your entry**, and if you can, find the live statement from the
other document. In the case above, the annual survey's own page says in the
present tense that its data *"are used by"* the monthly survey — which is what
made the edge real.

---

## 6. Output format

Two parts. **Part A is what matters. Part B is a convenience and is never
authoritative.**

### Part A — the extraction record

For **every** item, one entry per provision, per footnote, per table row. Never
bundle. A previous round returned fourteen good quotes under one heading marked
"illustrative cluster"; none carried its own section number, so none could be
cited, so **all fourteen were discarded.** Good research, unusable packaging.

Each entry has exactly these fields:

```
URL:       the document you actually opened. If redirected, the final URL.
LOCATION:  section, subsection and paragraph — "s. 6(1)(a)", not "s. 6".
           Or footnote number, table number, or heading.
           If there is no citable location, write NO CITABLE LOCATION and
           give the nearest heading.
QUOTE:     verbatim, copy-pasted, in quotation marks. No tidying, no
           ellipsis inside the operative clause. If the sentence is long,
           quote all of it.
NAMES:     the actual publications, series or survey titles the quote names,
           one per line. A release is a thing with a title, published on a
           cadence.
TENSE:     PRESENT or PAST. Only when the quote describes a relationship.
NOTES:     anything odd. Conflicts, hedges, the phrases in 5a, whether an
           input looks like a terminus and which kind.
```

Two special values, both of which are **results and not failures**:

- **`AGENCY ONLY`** — write this in place of NAMES whenever a quote names an
  institution and no publication. *"Sources: Statistics Canada"*, *"as determined
  by the Chief Statistician"*, *"data provided by the Bureau of Economic
  Analysis"*. Expect this often. **Do not go looking for a better quote instead of
  reporting it** — the frequency of `AGENCY ONLY` is itself a measurement, and one
  provincial funding formula was found to attribute six of twelve inputs this way,
  which turned out to be the most interesting thing about it.
- **`NOT FOUND`** — you searched and it is not there. **Say which strings you
  searched.** Say it even if a whole item comes back empty. A confirmed absence
  gets recorded and used; several are already load-bearing in this corpus.

### Part B — draft JSON (optional, and never trusted on its own)

If you have capacity, follow Part A with a draft JSON slice in the schema below.
It saves transcription time.

**The rule that makes this safe: any claim in Part B that is not backed by a
quote in Part A is deleted without being read.** Part B cannot introduce a node,
an edge, or a fact. It can only re-arrange what Part A already proved. Do not
"fill in" a missing publisher, invent a URL, or guess a cadence to make the JSON
validate — leave the field out and note it in Part A.

```jsonc
{
  "reports": [
    {
      "id": "statcan-lowercase-hyphenated",     // stable, guessable, no spaces
      "title": "Exact Published Title",
      "publisher": "Publishing body",
      "country": "CA",                          // "CA" | "US" | "INT"
      "jurisdiction_level": "federal",          // federal | provincial |
                                                // municipal | institutional |
                                                // international
      "region": "Canada",                       // or "Alberta", "Ontario", ...
      "description": "What it is and why it matters here. Quote the document.",
      "releases_per_year": 12,                  // 12 monthly, 4 quarterly,
                                                // 1 annual, 0.2 every 5 years
      "changes_per_year": 0.1,                  // optional; NEVER larger than
                                                // releases_per_year
      "cadence_note": "Quote the frequency statement.",
      "last_updated": null,                     // always null
      "url": "https://...",
      "domains": ["labour"],
      "terminal_reason": "unpublishable"        // ONLY for termini, see §4
    }
  ],
  "dependencies": [
    {
      "source_report_id": "the-one-that-depends",
      "target_report_id": "the-one-depended-on",
      "relationship_type": "uses_data_from",
      "basis": "The verbatim quote, plus which document and where.",
      "evidence_url": "https://..."             // required in practice
    }
  ],
  "_dropped": [
    {
      "edge": "human-readable description",
      "source": "node-id or null",
      "target": "node-id or null",
      "reason": "denied",
      "why": "The quote that refuses it, and where it is."
    }
  ]
}
```

**Edge direction is the single easiest thing to get backwards.** Read it as:
`source_report_id` **depends on** `target_report_id`. The dependent is the
source. Authority accrues at the target. If the CPI is used by the Alberta
escalator, then source = the escalator, target = the CPI.

**`relationship_type`**, strongest to weakest:

| Value | Use when |
|---|---|
| `calculated_from` | The output is mechanically derived. Arithmetic. |
| `uses_data_from` | The target's figures are a direct input. |
| `methodology_depends_on` | The target defines a method, deflator or classification the source relies on. |
| `cites` | Referenced as context, not as a computational input. |

Choosing between them is a judgement about what the document actually says — the
Bank Rate is `calculated_from` the policy rate because it is arithmetic, while the
prime rate is only `uses_data_from` it because the Bank's own word is "affects".
**If you are unsure, say so in Part A rather than picking in Part B.**

**`reason`** for `_dropped`: `denied` (a document says it does not hold),
`no-document` (searched, nothing states it), `wrong-target`, `wrong-direction`,
`unpublishable-source`, `unreadable-source`, `no-node-yet` (documented but one end
isn't a node yet), `deferred`, `note`.

`domains`: `inflation`, `labour`, `monetary-policy`, `national-accounts`,
`benefits`, `interest-rates`, `municipal-finance`, `education`, `post-secondary`,
`health`, `fiscal-transfers`, `population`, `taxation`, `assessment`,
`energy-royalties`, `banking`, `financial-regulation`. If nothing fits, say so in
Part A — the list can be extended, but only at the other end.

---

## 7. How to find the good documents

Bought expensively. Follow these before general searching.

- **Statutes and regulations beat webpages, and are usually available.** The
  strongest material in this corpus is regulations quoting their inputs by name. A
  webpage saying two things are related is usually not enough; a regulation naming
  a series is.
- **Look for a "Data sources" section or a data-sources appendix.** Statistics
  Canada's IMDB records have one. Ontario's municipal grant technical guide has an
  Appendix F listing every data element the formula consumes and where each comes
  from. **A document that names its own inputs in a table is the strongest
  evidence class there is**, and it is rare outside statute. When scoping a funding
  programme, read the technical guide's appendices before the prose.
- **Municipal tax rate bylaws are keystones.** By statute a bylaw must state the
  assessment it levies against and every requisition it collects for another body.
  Six edges out of one PDF, twice.
- **When a document turns out to name one source, sweep it for all of them.** One
  source table named an index in 64 separate rows and nobody had noticed, because
  nobody had searched for that index specifically. Grep the whole document.
- **Expect disclosure to stop one level short of a title.** *Who produced it* is
  usually given; *what it is called* is often not. Budget for that as the normal
  case rather than the disappointing one, and report it as `AGENCY ONLY`.
- **Consolidated statute pages truncate.** Long instruments on laws-lois and
  similar sites cut off well before the end. A whole-page search returning zero
  hits proves nothing about absence if the retrieval was truncated — use
  section-by-section URLs where they exist, and **say so if you could not retrieve
  the whole thing.**
- **Retired numbering systems.** Older regulations cite CANSIM table numbers;
  current ones cite product identifiers. Matching one to the other is a judgement,
  so quote what the document says and flag it rather than translating.
- **Some public documents are unreadable.** Reports published only through
  page-flipping viewers with no extractable text. That is a finding — report it as
  `unreadable-source` and move on.

### One thing that is counter-intuitive

**Do not research a classification standard by reading the classification.** This
was tried and it failed. Classification documents describe alignment,
comparability and concordance — not derivation. Reading NAICS's own documentation
produces almost nothing.

**Read the programmes that are coded to it instead.** Every edge into NAICS in
this corpus came from a survey's methodology page saying it classifies its
respondents by NAICS. The standard is a hub because other documents name it, not
because it names things.

---

## 8. What to work on

**In this order.** Each item is self-contained; finish one before starting the
next, and return work as you finish each item rather than assembling everything
at the end. *(A previous batch lost roughly 900,000 tokens of finished work to a
session limit that hit before a single write step at the end. Write as you go.)*

### Item 1 — Interprovincial. The priority, and by some distance.

The graph currently goes four levels deep — international standard → national
statistic → provincial formula → municipal bylaw — **in one province.** It proves
the premise and cannot answer a single comparative question. *Is Alberta unusual?
Does BC index differently? What does Ontario's escalator look like?* All
unanswerable.

Adding a second and third province changes what the thing is for.

**1a. Income tax indexation, every province and territory.** Alberta's escalator
is in the graph and it is capped at 2%. Several provinces are uncapped, some have
been frozen. For each of the 13:

- The provision that sets the indexation factor — statute or regulation, with
  section number.
- The **exact price index it names** and the **reference period** — which twelve
  months, ending on which date. Alberta, the CRA, the Canada Child Benefit, AISH
  and Income Support all read a twelve-month window ending **September 30**, and
  that is the kind of detail worth its own line.
- Whether a cap or floor applies, quoted.

This is a clean set of ★★★ edges all landing on a node already in the graph, and
it makes thirteen jurisdictions comparable in one pass. **Start here.**

**1b. Provincial disability and income support rates.** Alberta's AISH is in the
graph. The counterparts — Ontario's ODSP, BC's disability assistance, and each
other province's equivalent — plus whatever regulation states how the rates move.
Many will be discretionary rather than indexed, and **that is a finding**: quote
the provision that shows there is no formula.

**1c. Provincial statistical agencies.** Quebec's Institut de la statistique du
Québec is the significant one — Quebec runs its own pension plan, its own income
tax system and its own family allowance, so its chains do not simply parallel the
others. BC Stats and Ontario's equivalents too. What do they publish on a cadence,
and what do provincial formulas name?

**1d. Property assessment across provinces.** BC Assessment and Ontario's MPAC
(already a node) are the two big ones. What is the valuation date, what statute
sets it, and what does the assessment feed?

**1e. Federal transfer machinery beyond Equalization.** Territorial Formula
Financing, Fiscal Stabilization, the Canada Community-Building Fund. Each names
allocation bases — usually population or labour force data — in a regulation.

### Item 2 — Business, banking and industry

Do this second. It is the natural extension of the manufacturing material already
in the graph, and it is where the corpus is thinnest relative to how well
documented it is.

**2a. Statistics Canada business programmes.** Each has an IMDB record at
`https://www23.statcan.gc.ca/imdb/p2SV.pl?Function=getSurvey&SDDS=NNNN` with a
"Data sources and methodology" block. For each: exact title, frequency, the Data
sources passage quoted in full, any classification it names, and any statement
that it is benchmarked or weighted to another named programme. Start with the
Business Register, the Annual Survey of Service Industries, Quarterly Financial
Statistics for Enterprises, and Canadian International Merchandise Trade.
**Report the record number you actually found**, because these are known to be
miscited — one table cites "Labour Force Survey, Record no. 3401" and 3401 is the
Field Crop Reporting Series.

**2b. Bank of Canada and OSFI.** Several edges in the graph assert that the policy
rate decision uses labour force and national accounts data, and **not one of them
has a document behind it.** Does any Bank of Canada publication name a specific
release as an input? `AGENCY ONLY` and `NOT FOUND` are the expected answers here
and they are worth as much as a hit. Do not stretch — "labour market conditions"
without a release title is `AGENCY ONLY`.

**2c. Banking supervision returns.** OSFI's capital and liquidity guidelines, the
regulatory returns behind them, and what those returns are built from. Expect
several termini.

### Item 3 — International standards, entered correctly

Read section 7's warning first: do not research these by reading the standard.

**3a. The emissions chain.** Canada's National Inventory Report submitted to the
UNFCCC — find the passage stating it is prepared *in accordance with* the IPCC
Guidelines for National Greenhouse Gas Inventories, quoted, with the guideline
edition named. Then the IPCC Guidelines as a publication: title, publisher,
edition, revision history. This would be an international-standard-to-national-
release edge of exactly the shape the graph already has for the System of National
Accounts, and it is the best-evidenced entry point into environmental material.

**3b. Health classifications, from the programmes.** ICD-10-CA and the Canadian
Classification of Interventions are maintained by the Canadian Institute for
Health Information. Do not read the classification — read the CIHI databases and
find the passage saying they are coded with it.

**3c. Occupational and trade classifications, from the programmes.** Same
approach for the National Occupational Classification and the Harmonized System.
Which surveys and which customs instruments name them?

### Item 4 — United States, beyond statistics

Lowest priority of the four, and the reason is measurable: **the number of
documented direct dependencies running between the Canadian and US systems is
one.** They connect almost entirely through shared international standards. More
American material adds territory without adding structure.

Worth doing anyway if you get here: the Federal Reserve's H.15 footnotes quoted
individually with their footnote numbers, and the US Treasury daily par yield
curve as a publication — exact title, publication frequency, how the rates are
derived, and whether Treasury names any source.

---

## 9. Node IDs already in use

Use these exact strings when a document names something already here. Do not
invent variants — `statcan-cpi` is the CPI and `statcan-consumer-price-index` is a
duplicate that has to be found and merged by hand. This has happened twice.

If a document names something **not** on this list, that is useful and wanted —
just give the name exactly as the document words it, and propose an id in the same
style.

```
ab-aadl-cost-share, ab-adult-health-benefit-income-levels,
ab-aish-benefit-rates, ab-bvm-components, ab-child-family-benefit,
ab-continuing-care-accommodation-charges, ab-dip-requisition,
ab-education-funding-manual, ab-education-property-tax-requisition,
ab-education-student-enrolment, ab-gas-reference-price,
ab-income-support-rates, ab-mrf-guidelines,
ab-municipalaffairs-equalized-assessment,
ab-municipalaffairs-financial-statistical-data, ab-municipalaffairs-fir,
ab-municipalaffairs-lgff-capital, ab-municipalaffairs-lgff-operating,
ab-municipalaffairs-population-list, ab-oil-par-prices,
ab-oilsands-royalty-rates, ab-regulated-property-guidelines,
ab-seniors-benefit-rates, ab-tbf-alberta-escalator,
ab-tbf-economic-outlook, ab-tbf-fiscal-plan, ab-tbf-fiscal-update,
ab-tbf-population-estimates, aer-general-well-data, ahs-business-plan,
ahs-financial-statements, argus-mexico-maya-spot, bea-gdp, bea-pce,
bis-basel-framework, bls-c-cpi-u, bls-cex, bls-cpi,
bls-employment-situation, bls-qcew, boc-bank-rate, boc-corra,
boc-daily-exchange-rates, boc-mortgage-qualifying-rate, boc-mpr,
boc-policy-rate, boc-posted-chartered-bank-rates, boc-prime-rate,
canada-child-benefit, canada-health-transfer, canada-social-transfer,
cdic-differential-premiums-manual, cgp-assessment-roll, cgp-budget,
cgp-financial-statements, cgp-municipal-census, cgp-tax-rate-bylaw,
cihi-nhex, cmhc-mortgage-loan-insurance,
cmhc-residential-mortgage-industry-report, cpi-manual,
cpp-disability-amount, cpp-pension-index, cpp-ympe,
cps-current-population-survey, cra-gst-files, cra-ibsp-tax-data,
cra-indexation-adjustment, cra-pd7-accounts,
dof-insured-mortgage-qualifying-rules, ei-actuarial-report-premium-rate,
ei-maximum-insurable-earnings, ei-premium-rate,
ei-regional-unemployment-rates, ei-regular-benefit-rate,
esdc-oas-indexation, fed-fomc-statement, fed-h15, fed-h8, fed-sep, fed-z1,
ffiec-call-report, fiscal-equalization-program, gp-assessment-roll,
gp-budget, gp-financial-statements, gp-municipal-census, gp-tax-rate-bylaw,
gppsd-budget, gppsd-financial-statements, grande-spirit-requisition,
hhs-poverty-guidelines, ice-brent-futures-settlement,
icls-work-statistics-resolution, imf-bpm6, imf-gfsm, ipsas,
irs-annual-inflation-adjustments, jd-power-valuation-services,
mpac-assessment, naics, napcs, noc, nymex-wti-settlement-prices, on-ompf,
osfi-b20, osfi-car-guideline, osfi-mqr-uninsured, psab-psas, sna-2008,
ssa-cola, ssa-contribution-benefit-base, ssa-national-average-wage-index,
ssa-pia-formula, statcan-asml, statcan-census-population, statcan-cpi,
statcan-cpi-basket-update, statcan-gdp-monthly, statcan-hfce, statcan-ippi,
statcan-lfs, statcan-msm, statcan-national-accounts,
statcan-population-estimates, statcan-seph, statcan-shs, statcan-sut,
term-corra, un-census-principles, uscensus-decennial,
uscensus-population-estimates, uscensus-poverty-thresholds
```

---

## 10. Summary — the eight things that matter

1. **Quote verbatim, with a location.** A paraphrase cannot be checked.
2. **One provision per entry.** Bundled quotes get discarded whole.
3. **No verdicts.** You extract; someone else adjudicates.
4. **`AGENCY ONLY` and `NOT FOUND` are results.** Report them, count them, do not
   go hunting for something better instead.
5. **"Comparable with" is not a dependency** — but quote it anyway.
6. **Check the tense.** A dead arrangement reads exactly like a live one.
7. **Write as you go**, item by item. Never assemble everything for the end.
8. **Part B never introduces anything Part A did not prove.**

If you are unsure whether something is worth sending: send it with a quote. The
expensive failure in this project has never been too much raw material. It has
always been a confident answer that turned out to rest on nothing.
