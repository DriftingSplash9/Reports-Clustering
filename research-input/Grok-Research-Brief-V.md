# Research Brief V — extraction only

Same rules as Brief IV. **You are reading documents and quoting them. You are
not deciding anything.** There is no verdict field in this brief. Do not write
DOCUMENTED, CONFIRMED, NOT-FOUND-therefore-no, or tell me whether something
"counts". You extract, I adjudicate.

Brief IV's format worked and nothing about it changes. What changes is the
subject: Briefs I–IV went deep into fiscal instruments. **This one goes wide**,
and it goes wide through *classification standards and statistical programme
methodology pages*, because those are the documents that name their inputs in a
table instead of burying them in prose.

---

## What to return, for every item

1. **URL** — the document you actually opened. If redirected, the final URL.
2. **LOCATION** — section, provision, footnote, table or heading number. If the
   passage carries none, write `NO CITABLE LOCATION` and give the nearest
   heading.
3. **QUOTE** — verbatim, copy-pasted, in quotation marks. No paraphrase, no
   tidying, no ellipsis inside the operative clause.
4. **RELEASES NAMED IN THE QUOTE** — the actual publications, series or survey
   titles, one per line. A release is a thing with a title published on a
   cadence.
5. **`AGENCY ONLY`** — in place of the release list, whenever the quote names an
   institution and no publication. "Sources: Statistics Canada", "as determined
   by the Chief Statistician". This is **not a failure state**, I need the count,
   and you must not go hunting for a better quote instead of reporting it.
6. **NOT FOUND** — if you searched and it is not there, say so and list the
   strings you searched. Say it even if a whole item comes back empty. A
   confirmed absence is a result I record and use.

### One provision per entry

Brief III lost fourteen good quotes to a single bundled entry because none
carried its own section number. **One entry per provision, per footnote, per
table row.** Fifteen entries with fifteen locations is right. One entry with
fifteen quotes is unusable.

### Do not resolve conflicts, report them

If two passages disagree, or a passage points the opposite way to what the item
asks, quote both and say plainly that they disagree. Do not pick.

### Write as you go

Return each item as you finish it. Do not assemble everything and send at the
end. A previous batch on this project lost roughly 900,000 tokens of finished
work to a session limit that hit before the single write step.

---

## Item 1 — Statistics Canada IMDB "Data sources" sweep

**Highest volume item in this brief, and the reason it exists.**

Every Statistics Canada programme has an IMDB record at
`https://www23.statcan.gc.ca/imdb/p2SV.pl?Function=getSurvey&SDDS=NNNN`, and
most carry a **"Data sources and methodology"** block containing a *Data
sources* subsection. That subsection is where one programme names another by
title. Four such records have already produced edges for me and the pattern is
reliable.

For **each** record below, return separate entries for:

- **1a.** The **exact published title** of the programme, and its **frequency**,
  each quoted.
- **1b.** The **"Data sources"** passage, quoted in full. List every release it
  names. `AGENCY ONLY` for anything attributed to Statistics Canada generally.
- **1c.** Any passage naming a **classification or standard** the programme uses
  — NAICS, NAPCS, NOC, ICD-10-CA, the Standard Geographical Classification, SNA
  2008. Quote each separately. **This is the part I care about most.**
- **1d.** Any passage stating the programme is **benchmarked, anchored,
  calibrated or weighted to** another named programme. Quote each separately.

The records, in priority order:

| Record | Programme |
|---|---|
| **2612** | Survey of Employment, Payrolls and Hours |
| **3701** | Labour Force Survey |
| **2101** | Monthly Survey of Manufacturing |
| **2103** | Annual Survey of Manufacturing and Logging Industries |
| **1301** | Monthly gross domestic product by industry |
| **3226** | Canadian International Merchandise Trade |
| **3604** | Demographic Estimates (population estimates) |
| **3901** | Vital Statistics — Death Database |
| **3233** | Canadian Community Health Survey |
| **3302** | Uniform Crime Reporting Survey |

Where a record does not exist at that number, or the number turns out to belong
to a different programme, **say so and give the title you actually found.** Do
not substitute. Statistics Canada documents are known to miscite their own
record numbers — a methodology table of theirs cites "Labour Force Survey,
Record no. 3401", and 3401 is the Field Crop Reporting Series.

---

## Item 2 — the classification standards, as publications

These are the hubs I want to attach new material to, so I need publication facts
first and dependencies second. **Four separate documents, each its own set of
entries.**

For each: **exact published title**, **publisher**, **how often it is revised**
(quoted — some are decennial, some continuous), the **current version
designation**, and any passage naming what the classification is **derived from
or aligned with**.

**2a. National Occupational Classification (NOC).** Employment and Social
Development Canada / Statistics Canada. I specifically want any passage stating
alignment with the **International Standard Classification of Occupations
(ISCO)**, and any passage stating which programmes *use* NOC.

**2b. NAPCS Canada** — the North American Product Classification System. I want
any passage relating it to **NAICS** and to the **Central Product
Classification (CPC)**, and any passage stating that the Supply and Use Tables
are structured on it.

**2c. ICD-10-CA / CCI**, published by the Canadian Institute for Health
Information. Any passage naming the **WHO ICD-10** as its base, and any passage
naming the CIHI databases or releases that are coded with it.

**2d. Standard Geographical Classification (SGC).** Any passage stating which
Census or survey products are published on it.

For each of these four, also return: **which documents already in my node list
name it.** Do not guess — only report where you have a quote.

---

## Item 3 — the emissions chain

One clean question, ★★★ if it holds.

**3a.** Canada's **National Inventory Report** submitted to the UNFCCC, and/or
the Greenhouse Gas Reporting Program methodology. I need any passage stating
that the inventory is prepared **in accordance with the IPCC Guidelines for
National Greenhouse Gas Inventories**, quoted verbatim with its location, and
naming the guideline edition (1996, 2006, or the 2019 Refinement).

**3b.** The **IPCC Guidelines** themselves as a publication: exact title,
publisher, edition, and revision history. Quote the title page or equivalent.

**3c.** Alberta's **TIER Regulation** (Technology Innovation and Emissions
Reduction) — any provision naming an external published price, index or
inventory as an input to a benchmark, credit price or fund price. Section number
required. If it names nothing external, say so and list what you searched.

Why: this would be an international-standard-to-national-release edge of exactly
the shape `sna-2008` already has, and it is currently the best-evidenced entry
point into environmental material.

---

## Item 4 — the eight edges in my graph with no document behind them

These are seed edges written early, and **none has ever been researched.** They
are not "searched and not found" — nobody has looked. I need to know for each
whether a document says it, in the source's own words.

Four Bank of Canada, four Federal Reserve:

1. Does any Bank of Canada document state that the **policy interest rate
   decision** uses **Labour Force Survey** data? Quote it.
2. Does any Bank of Canada document state that the policy rate decision uses the
   **National Economic Accounts / quarterly GDP**? Quote it.
3. Does the **Monetary Policy Report** state that it reports on or is built from
   the **policy interest rate**? Quote it.
4. Does the Monetary Policy Report reference the **FOMC statement** or US
   monetary policy decisions as an input? Quote it.
5. Does the **FOMC statement** (or the Statement on Longer-Run Goals) name the
   **Employment Situation** release? Quote it.
6. Does the FOMC statement name **BEA GDP**? Quote it.
7. Does the **Summary of Economic Projections** name the Employment Situation?
8. Does the Summary of Economic Projections name BEA GDP?

**For every one of these, `AGENCY ONLY` and NOT FOUND are the answers I most
expect and they are worth as much to me as a hit.** A central bank naming "labour
market conditions" without naming a release is `AGENCY ONLY` and I will record
it as exactly that. Do not stretch.

Start each search at:
<https://www.bankofcanada.ca/publications/mpr/> and
<https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm>

---

## Node ids

Use these exact strings for anything already in my graph. Do not invent variants.
If a document names something not on this list, that is useful — give the name
exactly as the document words it.

```
ab-aadl-cost-share, ab-adult-health-benefit-income-levels,
ab-aish-benefit-rates, ab-bvm-components, ab-child-family-benefit,
ab-continuing-care-accommodation-charges, ab-dip-requisition,
ab-education-funding-manual, ab-education-property-tax-requisition,
ab-education-student-enrolment, ab-gas-reference-price,
ab-income-support-rates, ab-mrf-guidelines,
ab-municipalaffairs-equalized-assessment,
ab-municipalaffairs-financial-statistical-data, ab-municipalaffairs-fir,
ab-municipalaffairs-lgff-capital, ab-municipalaffairs-population-list,
ab-oil-par-prices, ab-oilsands-royalty-rates,
ab-regulated-property-guidelines, ab-seniors-benefit-rates,
ab-tbf-alberta-escalator, ab-tbf-economic-outlook, ab-tbf-fiscal-plan,
ab-tbf-fiscal-update, ab-tbf-population-estimates, aer-general-well-data,
ahs-business-plan, ahs-financial-statements, argus-mexico-maya-spot, bea-gdp,
bea-pce, bis-basel-framework, bls-c-cpi-u, bls-cex, bls-cpi,
bls-employment-situation, bls-qcew, boc-bank-rate, boc-corra,
boc-daily-exchange-rates, boc-mortgage-qualifying-rate, boc-mpr,
boc-policy-rate, boc-posted-chartered-bank-rates, boc-prime-rate,
canada-child-benefit, canada-health-transfer, canada-social-transfer,
cdic-differential-premiums-manual, cgp-assessment-roll, cgp-budget,
cgp-financial-statements, cgp-municipal-census, cgp-tax-rate-bylaw,
cihi-nhex, cmhc-mortgage-loan-insurance,
cmhc-residential-mortgage-industry-report, cpi-manual, cpp-disability-amount,
cpp-pension-index, cpp-ympe, cps-current-population-survey,
cra-indexation-adjustment, dof-insured-mortgage-qualifying-rules,
ei-actuarial-report-premium-rate, ei-maximum-insurable-earnings,
ei-premium-rate, ei-regional-unemployment-rates, ei-regular-benefit-rate,
esdc-oas-indexation, fed-fomc-statement, fed-h8, fed-sep, fed-z1,
ffiec-call-report, fiscal-equalization-program, gp-assessment-roll,
gp-budget, gp-financial-statements, gp-municipal-census, gp-tax-rate-bylaw,
gppsd-budget, gppsd-financial-statements, grande-spirit-requisition,
hhs-poverty-guidelines, ice-brent-futures-settlement,
icls-work-statistics-resolution, imf-bpm6, imf-gfsm, ipsas,
irs-annual-inflation-adjustments, jd-power-valuation-services,
mpac-assessment, naics, nymex-wti-settlement-prices, on-ompf, osfi-b20,
osfi-car-guideline, osfi-mqr-uninsured, psab-psas, sna-2008, ssa-cola,
ssa-contribution-benefit-base, ssa-national-average-wage-index,
ssa-pia-formula, statcan-census-population, statcan-cpi,
statcan-cpi-basket-update, statcan-gdp-monthly, statcan-hfce, statcan-ippi,
statcan-lfs, statcan-national-accounts, statcan-population-estimates,
statcan-seph, statcan-shs, statcan-sut, term-corra, un-census-principles,
uscensus-decennial, uscensus-population-estimates,
uscensus-poverty-thresholds
```

`fed-h15` and one Alberta grant programme are absent from that list on purpose:
they exist as research but have no documented edge, so every build drops them.

---

## One thing that would be new and is worth flagging if you see it

Several instruments I have read contain a clause telling you what to do **when
the input stops existing** — the CPP Act's splice clause, Alberta's Oil Sands
Royalty Regulation providing for the day the Bank of Canada stops publishing an
exchange rate, Ontario's Assessment Act s. 19.2(5) letting the Minister
prescribe a different valuation date. If you come across one while reading
anything in this brief, quote it as its own entry and mark it
`CONTINGENCY CLAUSE`. I am collecting them and I do not yet have a way to
represent them.

---

## Order, if you run short

Item 1 (records 2612, 3701, 2101 first), then Item 2a and 2b, then Item 3, then
Item 4, then the rest of Item 1. Item 4 closes either way and is the least
likely to produce anything, so it goes late — but I do want it done, because
"nobody has looked" is currently true of it and that is worse than a no.
