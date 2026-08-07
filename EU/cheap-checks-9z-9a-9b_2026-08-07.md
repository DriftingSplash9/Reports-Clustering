# Cheap checks 9z, 9a, 9b — findings record

**Date:** 2026-08-07. Three independent backlog items, picked up after a prior
attempt (unlogged, uncommitted) apparently stalled on 9a. Per the project's
one rule, every claim below was read from the document itself this session —
titles, dates and quoted text are transcribed from what was actually opened,
not inferred from filenames or search snippets. Where a search snippet alone
was the only thing seen, that is stated explicitly and no claim is built on
it. **This is a findings-only record: nothing here has been minted into
`src/data/research/*.json` or `EU/slices/*.json`, and `planning/MISSION-TODO-2.md`
was not touched.**

---

## 9z — Do any EU member states' NSIs publish their own ESA 2010 national-accounts quality report?

**Summary: yes. Germany (Destatis) and Ireland (CSO) both publish their own
national-accounts quality report, each on a stated/observed annual-ish
cadence with multiple dated editions. Luxembourg (STATEC) and the Netherlands
(CBS) looked like hits at first but turned out to be the same document —
they host Eurostat's own "Quality report on national and regional accounts"
(the report already in the corpus as
`eurostat-national-accounts-quality-report`) rather than a report of their
own. France (INSEE) has no equivalent found.**

### Method

Checked, in the order the brief specified: Destatis (DE), CBS (NL), STATEC
(LU), INSEE (FR); then followed a search hit to CSO (Ireland) as a fifth.
Each PDF that looked like a hit was downloaded and opened directly
(`curl` + `pypdf`), not taken on the strength of a search snippet or a
WebFetch summary alone — WebFetch summaries are noted as such below where
they were the only look taken.

### Confirmed hit 1 — Germany, Destatis

**URL (HTML landing page):**
`https://www.destatis.de/EN/Methods/Quality/QualityReports/National-Accounts-Domestic-Product/national-accounts.html`
**URL (PDF, opened directly):**
`https://www.destatis.de/EN/Methods/Quality/QualityReports/National-Accounts-Domestic-Product/national-accounts.pdf?__blob=publicationFile`

Opened with `pypdf`. Title page and summary, quoted from the extracted text:

```
Quality Report
National accounts
10/2024-09/2025
Periodicity: annual
Published: 24/10/2025
```
```
Publisher: Statistisches Bundesamt (Destatis)
```
```
1 General information on the statistics                              Page 5
• Scope of the statistics: national accounts of the Federation (EVAS No 81)
• Statistical units: persons and institutions, grouped into industries and
  institutional sectors
• Legal bases: Regulation (EC) No 549/2013, European System of National and
  Regional Accounts (ESA) 2010, and supplementary and amending regulations
• Periodicity: quarterly, annual
```

This is Destatis's own document, self-published, structured on the SIMS-style
template (General information / Content / Methodology / Accuracy / Timeliness
/ Comparability / Coherence / Dissemination / Comment — the same nine-section
shape as the ESS SIMS standard already a node in the corpus, `ess-sims`), and
it names its own legal basis as ESA 2010 (Regulation (EC) No 549/2013)
directly, not as a EUROSTAT product. **Recurrence check:** the current
download link carries `v=11` (at least eleven revisions of this file at this
URL), and the Wayback Machine holds distinct-digest snapshots of the same PDF
URL from 2022-01-19, 2022-09-01 and 2025-03-14 — i.e. the document existed in
some form at least back to January 2022 and has changed content multiple
times since, consistent with the "Periodicity: annual" the document states of
itself.

### Confirmed hit 2 — Ireland, CSO (found via search, not the original four)

**URL (2020 edition, opened directly):**
`https://www.cso.ie/en/media/csoie/methods/nationalincomeandexpenditureannualresults/National_Accounts_Standard_Report_on_Quality_July_2020.pdf`

Opened with `pypdf`. Title page:

```
Standard Report on
Methods and Quality
for
NATIONAL ACCOUNTS RESULTS COMPILATION

This documentation applies to the reporting period:
2019

July 2020
CENTRAL STATISTICS OFFICE
Skehard Road, Cork
```

A second, earlier edition exists at the same publisher, confirming a
recurring series rather than a one-off (found via search, title as given by
the search result, not independently re-opened this session):
`https://www.cso.ie/en/media/csoie/methods/nationalincomeandexpenditureannualresults/National_Accounts_Standard_Report_on_Quality_July_2018.pdf`
— "Standard Report On Methods and Quality For NATIONAL ACCOUNTS RESULTS". Two
years apart (July 2018, July 2020) is enough to establish a cadence, even
without opening the 2018 copy directly.

### Near-misses — Luxembourg (STATEC) and Netherlands (CBS)

Both looked like exactly what 9z is searching for from their landing pages,
and both turned out on inspection to be **mirrors of Eurostat's report, not a
national one.**

**STATEC** lists, on its quality-reports index page
(`https://statistiques.public.lu/en/statistique-publique/statec/qualite/rapports-qualite.html`),
an item titled "Quality report on National and Regional Accounts - 2019 data
(2020 edition)" linking to
`https://statistiques.public.lu/dam-assets/en/public-statistics/statec/policies/05-MAC1-Quality-report-on-National-and-Regional-Accounts-2019-data-2020-ed-.pdf`.
Opened directly (`pypdf`, 116 pages). Page 3 (copyright/colophon page):

```
Manuscript completed in December 2020
The Commission is not liable for any consequence stemming from the reuse of
this publication.
Luxembourg: Publications Office of the European Union, 2020
© European Union, 2020
...
PDF: ISBN 978-92-76-27369-1 ISSN 2529-3222 doi: 10.2785/533837 KS-FT-20-007-EN-N
```
Page 6 (Executive summary): *"This document presents Eurostat's assessment of
the quality of the national and regional accounts data submitted by the EU
Member States, Iceland, Norway and Switzerland in 2019."* Product code
KS-FT-20-007 matches the Eurostat report series already documented in this
corpus (`EU/ESA2010QualityReports_PartA_2026-08-05.md` §D1's edition list).
**STATEC is hosting a copy of the EU-wide report, not writing its own.**

**CBS Netherlands** has a page literally titled "Kwaliteitsrapportage
nationale rekeningen" (Quality reporting on national accounts) —
`https://www.cbs.nl/nl-nl/onze-diensten/methoden/onderzoeksomschrijvingen/aanvullende-onderzoeksomschrijvingen/kwaliteitsrapportage-nationale-rekeningen`
— whose own description reads (fetched with `curl`, tag-stripped): *"Over de
cijfers van de nationale rekeningen die naar Eurostat worden verzonden, worden
bijbehorende kwaliteitsrapporten samengesteld."* ("For the national accounts
figures sent to Eurostat, corresponding quality reports are compiled.") It
links to
`https://www.cbs.nl/-/media/_pdf/2018/38/quality-report-on-national-and-regional-accounts-2016-data.pdf`.
Opened directly (`pypdf`, 82 pages). Page 1: *"Quality report on National and
Regional Accounts, 2016 DATA, 2018 edition."* Page 3 (colophon): *"Printed in
Luxembourg by the Publication Office... Luxembourg: Publications Office of
the European Union, 2018... ISBN 978-92-79-85786-7 ... KS-FT-18-004-EN-N."*
**Same pattern: CBS's "own" quality-reports page hosts Eurostat's report, not
CBS's.** CBS does separately publish a "GNI Quality Report" (Gross National
Income inventory, e.g. `gni_quality_report_2018_nl.pdf`), but that is a
different, narrower document tied to the GNI-for-own-resources regime, not
the ESA 2010 Article 4 national-accounts quality report — noted so nobody
mistakes it for a hit later.

### Not found — France (INSEE)

No INSEE-published document matching "quality report on national accounts" /
"rapport de qualité, comptes nationaux" was found. INSEE's site has
per-survey "Gestion de la qualité" metadata pages (one per statistical
operation, e.g. for the Enquête emploi, Enquête sectorielle annuelle, etc.)
but no comprehensive national-accounts-wide quality report analogous to
Destatis's or CSO's. Searched: `"rapport de qualité" OR "quality report"
comptes nationaux méthodologie`, `"Bilan qualité" OR "rapport qualité"
comptabilité nationale insee.fr`, and the metadata pages under
`insee.fr/fr/metadonnees/source/serie/s1030` (Comptes nationaux annuels, base
2014) directly — that series has "Présentation statistique", "Documentation
sur la méthodologie" and "Cohérence et comparabilité" pages but nothing
titled as a quality report. **Recorded as a clean miss, not chased further
given two genuine hits already in hand.**

### What this settles

- The brief's four names (Destatis, CBS, STATEC, INSEE) were checked in
  order; one of the four (Destatis) is a genuine hit and the search stopped
  there per the brief's own rule ("if none of those four turn anything up,
  try 2-3 more") — a fifth (CSO Ireland) was picked up incidentally via
  search noise and is a second genuine hit, not chased for further ones.
- **Two independent NSIs (Germany, Ireland) do exactly what Task 9z asked
  about**: publish their own dated, recurring, ESA-2010-cited quality report
  on national accounts, voluntarily, with no regulation requiring the
  document itself to be public.
- **The Luxembourg/Netherlands near-misses are worth carrying forward as a
  standing caution**: a national statistics office's own "quality reports"
  page is not proof the linked document is that office's own writing — check
  the colophon page for "Publications Office of the European Union" /
  ISBN prefix `978-92-` before treating a hit as national rather than
  Eurostat.

---

## 9a — Germany's EDP inventory on CIRCABC: is there an edition newer than December 2015?

**Summary: yes, and by a wide margin. CIRCABC does render for a real browser
(the prior session's 404-via-`curl` finding is confirmed correct, but the
site is not actually dead — a browser gets in as a guest). The specific URL
given in the task turned out to be misidentified: it currently resolves to
Denmark's document, not Germany's. Browsing the folder tree directly found
Germany's real entry: "DE - EDP Inventory (2025.10).pdf", opened and read —
title page reads "Germany. October 2025", 188 pages (vs. 170 for the December
2015 copy already in the corpus). This gives the chain its second dated
edition and, for the first time, an actual interval: December 2015 to October
2025.**

### What happened, in order

1. **WebFetch** on the exact URL given in the task
   (`https://s-circabc.europa.eu/ui/group/ca7c9cc4-b473-4abc-8e95-263dcd57d79d/library/413ddad4-653f-4632-99d8-35475ddb23f8/details`)
   — returned a 404 client error. Matches the prior session's finding in
   `EU/EDPInventory_PartA_2026-08-07.md` §D1 exactly (same URL, same failure
   mode).
2. **Chrome browser tool** (one connected browser, `Browser 1`/Windows,
   selected without further prompting since there was no ambiguity — a
   single connected device and a read-only navigation task). Navigated to
   the same URL. **It rendered** — title bar became "Circabc", and
   `get_page_text` returned an actual document details panel:

   ```
   DETAILS OF THE DOCUMENT
   DK - EDP INVENTORY - ANNEX (2021).XLSX (Version 1.0)
   ...
   Author: sodeira
   Created: 2024 Jul 10, 8:26
   ```

   **This is Denmark's Annex I spreadsheet, not Germany's inventory.** The
   task's given URL, and the identical URL the prior EDPInventory_PartA
   session recorded as "Germany's EDP inventory ... Annex", currently
   resolves to a Denmark document. **Worth flagging plainly: CIRCABC
   document/folder IDs are not stable per-country identifiers — the same ID
   can point to a different country's file at a later date** (whether
   because CIRCABC recycles IDs on document replacement, or the original
   session mis-paired two hrefs with the wrong country when scraping the
   Eurostat table — either way, don't trust an old CIRCABC ID for a specific
   country without re-browsing).

3. Since the browser tool was working (not stuck, not blank, not a login
   wall), and finding the *real* answer required only browsing rather than
   retrying the same URL, the folder tree was walked from the group root:
   `Library` → `Excessive deficit procedure (EDP)` → `EDP inventories`,
   sorted alphabetically by name (`?sort=name_ASC`) to reach the "DE" rows.
   Found:

   ```
   DE-EDP-Annex-1-2025.xlsx           → library id a540f2df-e106-43c9-9c47-c4ee206f3c24
   DE - EDP Inventory (2025.10).pdf   → library id a27220a8-9d17-46cc-b3da-2a39c178d408
   ```

   The second of these — `a27220a8-9d17-46cc-b3da-2a39c178d408` — **is the
   second CIRCABC id the prior session's D1 record had already logged** for
   the German row ("Both hrefs behind the Germany row point at CIRCABC: ...
   and `…/a27220a8-9d17-46cc-b3da-2a39c178d408/details`"). So the correct
   Germany-inventory ID was already known; it was the *other* logged ID
   (413ddad4…) that was wrong, or has since been reassigned.

4. Details page for `a27220a8-…` (`get_page_text`):

   ```
   DE - EDP INVENTORY (2025.10).PDF (Version 1.0)
   Title: DE EDP Inventory 2025
   Size: 1.32 MB
   Content type: Adobe PDF Document
   Last modification: 2026 Jan 8, 4:24
   Author: Germany
   Status: DRAFT
   Created: 2026 Jan 8, 4:08
   Version: 1.0
   ```

5. Clicked "Preview" (an inline PDF viewer opens; the folder-tree route
   avoided the login wall the task worried about — this is guest access, no
   login performed). `get_page_text` on the loaded preview returned actual
   document text — read directly, not inferred from the filename:

   ```
   Inventory of the methods, procedures and sources
   used for the compilation of deficit and debt data and
   the underlying government sector accounts
   according to ESA 2010

   Germany

   October 2025
   ```
   (page 2 of 188; the viewer's own page counter read "of 188")

   ```
   Background

   Compilation and publishing of the Inventory of the methods, procedures
   and sources used to compile actual deficit and debt data is foreseen by
   Council Regulation 479/2009, as amended. According to Article 8.1:
   "The Commission (Eurostat) shall regularly assess the quality both
   of actual data reported by Member States and of the underlying government
   sector accounts compiled according to ESA 95.... Quality of actual data
   means compliance with accounting rules, completeness, reliability,
   timeliness, and consistency of the statistical data. The assessment will
   focus on areas specified in the inventories of Member States such as the
   delimitation of the government sector, the classification of government
   transactions and liabilities, and the time of recording."
   ...
   The content of the Inventory and the related guidelines have been
   endorsed by the Committee on Monetary, Financial and Balance of Payments
   statistics in June 2012 and are followed by all EU Member States. This
   version introduces references to the ESA 2010 and the updates mirroring
   the changes introduced by the ESA 2010. It also includes changes
   introduced by the MGDD 2022 version.
   ```

   Two things worth carrying forward from this passage. First, **the
   superseded "ESA 95" wording in the Article 8.1 quote — already flagged as
   an anomaly in the December 2015 copy (`EU/EDPInventory_PartA_2026-08-07.md`
   record C2) — is still there verbatim in the October 2025 copy, ellipsis
   and all.** Ten years and (at minimum) one more edition have not fixed it;
   this reads as inherited boilerplate carried forward edition to edition
   rather than a one-off typo. Second, **this edition explicitly names what
   changed since the last one**: "changes introduced by the MGDD 2022
   version" (the Manual on Government Deficit and Debt, 2022 edition) — a
   genuine content update, not just a re-upload of the December 2015 PDF
   under a new date.

### Answer to the question posed

**Yes.** A German EDP inventory edition newer than December 2015 exists and
is live on CIRCABC: "Germany. October 2025", 188 pages, uploaded to CIRCABC
2026-01-08. December 2015 → October 2025 is very close to ten years apart —
not itself proof of an annual or biennial cadence, but it is a second dated
point, which is what the December-2015-only copy could not supply. Article
9(3) of Regulation 479/2009 ("The inventories shall be updated following
revisions...") is event-triggered rather than interval-based (as the prior
session's record A7 already noted), and this new copy is consistent with
that reading: it names a specific triggering event (MGDD 2022) rather than a
routine schedule.

### URLs for the record

- Germany's inventory (PDF, current): `https://s-circabc.europa.eu/ui/group/ca7c9cc4-b473-4abc-8e95-263dcd57d79d/library/a27220a8-9d17-46cc-b3da-2a39c178d408/details`
- Germany's Annex I (xlsx, current): `https://s-circabc.europa.eu/ui/group/ca7c9cc4-b473-4abc-8e95-263dcd57d79d/library/a540f2df-e106-43c9-9c47-c4ee206f3c24/details`
- The EDP inventories folder (all 27 states, browsable): `https://s-circabc.europa.eu/ui/group/ca7c9cc4-b473-4abc-8e95-263dcd57d79d/library/07b0c02c-1b08-4ebb-8908-dd068b0dfcf2`

These are CIRCABC's internal Alfresco node IDs, not stable public URLs in any
normal sense — record the folder-tree route (Library → Excessive deficit
procedure (EDP) → EDP inventories → sort by name) as how to re-find any
country's current edition, rather than trusting a bookmarked node ID.

### For the site-behaviour list

**CIRCABC does render in a real (remote/extension) browser as a guest, no
login required**, contra how the prior 40-minute stalled attempt apparently
read it. `curl` and WebFetch both get a 404 shell; a real browser gets a
working single-page app once past the "You are accessing this Group as a
guest visitor" banner and an "S-CIRCABC is progressively transitioning to EU
institutional use" info modal (both dismissible, neither a hard wall). One
non-obvious operational note: `get_page_text` only returns the app's
top navigation chrome until the Angular router has actually mounted the
content for that route — several early `get_page_text` calls in this session
returned nothing past "Login / EN / GFS and EDP / Library / Help" even though
`navigate` had completed; `read_page` (accessibility tree, `filter:
interactive`) reliably found the actual links even when `get_page_text` did
not, and is the more dependable tool for this SPA. Screenshot calls twice
timed out (30s CDP timeout) while the page was mid-render; retrying after an
explicit wait worked.

---

## 9b — Live URLs for five German statistics named in the EDP inventory

**Summary: found live, verified publication pages for 3 of 5. The two
Destatis debt-statistics series (quarterly and annual) and the Bundesbank
securities-holdings statistics are all confirmed with their own page and
title. The two Deutsche Finanzagentur items named in the EDP inventory —
"Statistik der Bundesschuld" and the "Meldung zu Schuldscheindarlehen nach
Gläubigerklassen" — do not appear under those exact titles anywhere on
Finanzagentur's current website; the closest live equivalents are recorded
below, flagged as inexact matches, not claimed as the same publication.**

*(Confirmed unrelated to this task, per the brief: the 30MB
`germany-national-inventory-report-nir-2026` PDF in the source folder is a
UNFCCC greenhouse-gas National Inventory Report — not touched.)*

### 1. Quarterly debt statistics (Destatis) — FOUND

**URL:** `https://www.destatis.de/DE/Themen/Staat/Oeffentliche-Finanzen/Schulden-Finanzvermoegen/Publikationen/Downloads-Schulden/statistischer-bericht-vj-schulden-oeffentl-gesamthaushalt-2140520253215.html`

Title as stated on the page: *"Statistischer Bericht - Vierteljährliche
Schulden des Öffentlichen Gesamthaushalts - 1. Vierteljahr 2025"*. Series
number Fachserie 14 Reihe 5.2. Publication date 8 July 2025, covering Q1
2025. Matches the German EDP inventory's "quarterly debt statistics (QDS) ...
compiled by Destatis on a quarterly basis" (`EU/EDPInventory_PartA_2026-08-07.md`
record C9).

### 2. Statistic of Federal Government Debt / "Statistik der Bundesschuld" (Finanzagentur) — NOT FOUND under that title

Searched Finanzagentur's site directly (`site:deutsche-finanzagentur.de
Statistik Bundesschuld`) and browsed its "Schuldenstatistik" section
structure via WebFetch. The current site organizes this material as:

**Closest live equivalent:** `https://www.deutsche-finanzagentur.de/finanzierung-des-bundes/schuldenstatistik/schuldenstand`
("Schuldenstand" — debt level, monthly, part of the "Schuldenstatistik"
section alongside Bruttokreditaufnahme, Zinsen, Tilgungen, Umlaufvolumen).
Subject matter matches (federal securities and loans, Finanzagentur as
publisher), but the exact title "Statistik der Bundesschuld" / abbreviation
"SFGD" used in the EDP inventory quote (`EU/EDPInventory_PartA_2026-08-07.md`
record C8) does not appear anywhere on the current site. Reasonable reading:
"Statistik der Bundesschuld" may be this data series' internal/administrative
name (the one used in EDP reporting to Eurostat) while the public-facing name
today is "Schuldenstatistik"/"Schuldenstand" — but that is inference, not
something a document states, so **not treated as a confirmed match.**

### 3. Report on Loan Notes by Creditors of Central Government / "Meldung zu Schuldscheindarlehen nach Gläubigerklassen" (Finanzagentur) — NOT FOUND

No standalone public page or publication with this title was found anywhere
on `deutsche-finanzagentur.de`. Checked: the "Schuldenstatistik" section
listing (no such item), the "Gläubigerstruktur" creditor-structure page
(`https://www.deutsche-finanzagentur.de/finanzierung-des-bundes/der-bund-als-emittent/glaeubigerstruktur`
— confirmed by direct fetch to cover geography/investor-type breakdowns, not
Schuldscheindarlehen), and the annual "Kreditaufnahmebericht" (Report on the
Federal Government's Borrowing) PDF for 2024, opened directly with `pypdf`
and full-text-searched. "Schuldschein" appears 20 times in that PDF but only
as a line item within total federal debt composition (e.g. *"Schuldscheindarlehen
4.297 ... -167 4.130 ... -167"*, i.e. figures in a table), never as a
standalone report title; "Gläubigerklassen" does not appear in that PDF at
all (0 matches). **Reading offered, not adjudicated:** this looks like an
internal/administrative data return that feeds into Finanzagentur's public
aggregates (the Kreditaufnahmebericht, the Schuldenstand series) rather than
being published under its own title — consistent with how the EDP inventory
itself described it ("is provided by the German finance agency", return
language rather than release language), and with the corpus's own C8 note
flagging SFK4-report-family items as candidates for `unpublishable`.

### 4. Annual debt statistics (Destatis) — FOUND

**URL:** `https://www.destatis.de/DE/Themen/Staat/Oeffentliche-Finanzen/Schulden-Finanzvermoegen/Publikationen/Downloads-Schulden/statistischer-bericht-schulden-2140500247005.html`

Title as stated on the page: *"Statistischer Bericht - Schulden des
Öffentlichen Gesamthaushalts 2024"*. Series number Fachserie 14 Reihe 5.
Publication date 29 July 2025, reporting year 2024. The page's own text notes
this report "represents a renewal of this data series after discontinuation
of the regular publication cycle" (the series was last published for
reporting year 2021 before this one) — worth flagging: **the annual series
had a gap, so "annual" is the stated periodicity but not the observed
publication history for every year.** Matches the EDP inventory's "annual
debt statistics (ADS) are one of the main underlying statistical sources for
government debt" (`EU/EDPInventory_PartA_2026-08-07.md` record C9).

### 5. Bundesbank Securities holdings statistics / "Statistik über Wertpapierinvestments" (formerly "Depotstatistik") — FOUND

**URL:** `https://www.bundesbank.de/de/statistiken/geld-und-kapitalmaerkte/wertpapierbestaende/statistik-ueber-wertpapierinvestments-650748`

Confirmed live (HTTP 200, `curl`). Page title: *"Statistik über
Wertpapierinvestments | Deutsche Bundesbank"*. Breadcrumb read directly from
the fetched HTML: *"Startseite > Statistiken > Geld- und Kapitalmärkte >
Wertpapierbestände > Statistik über Wertpapierinvestments"* — i.e. it sits
under Bundesbank's own "Wertpapierbestände" (securities holdings) statistics
section, matching the EDP inventory's description of the publisher
("provided by the 'Department S – Statistics' of Deutsche Bundesbank",
`EU/EDPInventory_PartA_2026-08-07.md` record C10). **The page's substantive
body content is client-rendered** (a `curl` fetch returns only the
site-wide navigation chrome, no article text; a WebFetch pass returned the
same limited navigation-only extraction) **so the "formerly Depotstatistik"
claim and the periodicity are not independently re-confirmed from this page
this session** — that former-name fact is already sourced correctly
elsewhere, in the German EDP inventory PDF itself (record C10: *"Securities
holdings statistics (Statistik über Wertpapierinvestments, formerly named
Depotstatistik)"*), so it is not being asserted twice from two sources when
only one was actually read. A press release found via search
(`bundesbank.de/de/presse/pressenotizen/die-deutsche-bundesbank-erweitert-ihr-datenangebot-ueber-wertpapierinvestments-aus-der-deutschen-depotstatistik-668934`,
title alone naming both terms together) returned HTTP 404 when fetched
directly this session — **dead link, do not reuse**; the search snippet's
title is not treated as a confirmed quote.

### Site-behaviour notes for the list

- `deutsche-finanzagentur.de` renders its substantive page content to
  `curl`/WebFetch fine (unlike CIRCABC or Bundesbank's statistics pages) —
  no browser needed there.
- `bundesbank.de`'s statistics pages (at least this one) are client-rendered;
  a `curl`/WebFetch pass gets only navigation chrome. If a Bundesbank
  statistics page's body text is ever needed verbatim, use a real browser,
  not `curl`.
- `destatis.de` publication pages render fully to `curl`/WebFetch — no
  browser needed.
