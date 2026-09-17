# Uzbekistan — first round, 2026-09-16

Companion to `src/data/research/uz-uzbekistan-2026-09-16.json`. The route and the seam; the
rulings are in the slice's own `_dropped` entries.

## 1. THE SEAM — stat.uz publishes ~198 ESMS-shaped metadata sheets

`https://stat.uz/en/official-statistics/metadata` links roughly **198 English-language PDF metadata
sheets, one per indicator**. Each is 14-17 pages with the same structure: a common governance
preamble (legal framework, ethics, access) and then numbered indicator-specific sections —
**2.1.1 Concepts and definitions**, **2.2.1 Scope of the data**, **2.3.1
Classification/sectorization**, **4.2 Comparability**. The indicator-specific half is where the
dependencies are.

**This is the same shape as Eurostat's national reference metadata and it pays the same way.** Eight
sheets were read this round and every one named at least one methodological parent.

**Take the quote from the indicator-specific half, never the preamble.** The preamble describes the
agency, not the statistic — the distinction Thomas ruled on 2026-09-10 (a bureau reporting its
legal-publicity work does not name a basis).

**URL shapes are inconsistent** and there is no pattern to guess: `/img/Docs/…`, `/images/Docs/…`,
`/images/uploads/docs/…`, `/img/news/…`, `/img/gks/…`, some with a `_pNNNNN` suffix. **Scrape the
hrefs off the metadata page; do not construct them.**

**What the eight sheets named:** SNA 2008 (national accounts, GDP deflator), the CPI Manual (CPI),
NACE rev. 2 via the national OKED classifier (employment, wages, GDP deflator, PPI), the Harmonized
System (export/import price indices), ILO (employment, unemployment, wages), COICOP Rep. of Uzb.
2018 (GDP by expenditure), and the UN *Principles and Recommendations for Vital Statistics*
(population). **Four of those have no node yet** — see §4.

## 2. ROUTE

`stat.uz` answers a **plain** fetch, no `-k` needed; the sheets are ordinary PDFs and
`pdftotext -layout` reads them cleanly. `cbu.uz` (Central Bank) and `lex.uz` also answer plainly.

**`lex.uz` is unusable from here** — it returns 200 but renders search by JavaScript, and its API
rejects a direct query. That is what blocks every Uzbek legal instrument, of which the sheets name
many. **A browser session on lex.uz is the single highest-value follow-up for this country.**

**`classifier.stat.uz` does not resolve.** stat.uz's own "Statistical classifications" link goes to
`/en/interactive-services/classification-of-commodities`, which is a commodity service and carries
no OKED content. Two guessed classifier paths 404'd.

## 3. A PDFTOTEXT ARTEFACT WORTH KNOWING

These sheets render an en dash as **`¬–`** — a soft hyphen followed by the dash. Nothing in the
grader's normalisation folds `¬` away, so **any quote spanning that character loses coverage**: the
PPI edge graded B `partial-quote` at 0.93 until the span was moved past it. If a quote from a
stat.uz sheet comes back just under 1.0, look for `¬` before assuming a bad read.

## 4. WHAT IS ONE FETCH AWAY

- **OKED's own page.** The classifier is minted with **no `url`** — deliberately, see its `_dropped`
  note. Four sheets name it and two state its NACE derivation; nothing publishes it. lex.uz almost
  certainly has it.
- **The Law "On Official Statistics" (11 August 2021)**, named in the preamble of every sheet. A
  node for it would take an in-edge from every Uzbek publication — but only off a sentence that
  makes the statistic the subject, not the agency.
- **COICOP Rep. of Uzb. 2018** — a national COICOP, named by the GDP-by-expenditure sheet, with
  `un-coicop-2018` and `eu-ecoicop` already in the corpus as plausible parents. Same shape as OKED
  to NACE, and the cleanest remaining edge in the country.
- **The Household Income and Expenditure Survey and the 2010 Microcensus**, both named by the CPI
  sheet as the weight source and its sampling frame. That is the same frame-chain seam the India
  round found on 2026-09-16.
- **190 more sheets.** Prices, industry, agriculture, demography, living standards, digital economy.

## 5. THE NODE THAT WAS ALREADY THERE, AND IS WRONG

`uz-ssc` — the country's only pre-existing node — is titled with its own publisher's name and
carries `kind: "instrument"`. It is the statistical office, not an instrument. The August 2026
import's mint note says institution-as-a-node scaffolding was stripped; this one survived it.
**Left alone on purpose**: it has a live A-graded edge to `imf-e-gdds`, and retiring or retyping a
node is a ruling for Thomas rather than a research decision. Flagged so the next round does not
build on it by accident.

---

# Second pass, same day — the classification layer

`src/data/research/uz-classifications-2026-09-16.json`: 1 node (`uz-coicop`), 5 dependencies, 3
dropped notes. It took §4's first two items off this note's own list.

## lex.uz — the named top follow-up, and it came back NEGATIVE

Searched in Thomas's Chrome, where lex.uz's JavaScript search actually runs:

- **`ОКЭД`** → 91 documents, every one an act that *mentions* the classifier. No classifier document.
- **`КИПЦ РУ 2018`** → *«По Вашему запросу ничего не найдено»*. Nothing at all.

**lex.uz was the wrong place and this note said the right thing for the wrong reason.** Uzbek
national classifiers are almost certainly **O'z DSt standards registered by the Uzstandard Agency**,
not legal acts — lex.uz carries acts. **The lead is `standart.uz`, not lex.uz.** Do not repeat the
lex.uz search.

So `uz-coicop` joins `uz-oked` with an empty `url`, and at two nodes it stops being an accident:
**Uzbekistan's statistical classifiers are named by every metadata sheet and published nowhere
reachable.** That is a fact about the country, recorded as one.

## What the second pass wired

The first pass attached Uzbekistan to **NACE** via `uz-oked`. This one attaches it to the **UN
consumption classification** via `uz-coicop`, on a sentence that states the derivation outright:
*"COICOP RU 2018 ... which is based on the UN international standard"*. Both use the same two-step
shape on purpose — the statistic depends on the NATIONAL classifier, and the national classifier is
what derives from the international one. **Nothing is wired straight from a statistic to a UN or EU
standard**, because no document states that.

`uz-national-accounts` took three edges from sheets already in hand (national COICOP, COFOG,
`uz-oked`), which makes **`uz-oked` a three-statistic hub**.

## Refused

`uz-cpi -> the HIES`. The CPI sheet says the HIES frame rests on the 2010 Microcensus, and
separately that CPI weights come from consumption expenditure data. **It never joins them.** That
join is the reader's. A household-budget-survey sheet or a weights note closes it in one fetch, and
unlike the classifiers the survey is a product the Committee plausibly has a page for.

## Two grader results, one of each kind

- **The abbreviation trap bit twice more** — `uz-oked -> nace-rev2` and, more usefully,
  `uz-national-accounts -> uz-coicop`, where the failing match was a **`title_aliases` entry**
  (`COICOP Rep. of Uzb. 2018`) rather than the title-lead. Aliases go through the same `tokenise`,
  so they are exactly as vulnerable. `PLAYBOOK-CORPUS.md` §6 has been widened from "`Rev.`/`No.`/
  `Vol.`" to any abbreviation.
- **One prediction went the other way.** `uz-national-accounts -> un-cofog-1999` was hand-graded B
  on the theory that a DROPPED word would break the run below 60%. It graded **A**. The run rule
  tolerates a dropped word better than assumed — check `namesTarget` rather than guessing.
