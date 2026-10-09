# Node granularity — Russia, 2026-10-06 (WRITTEN)

**STATUS, 2026-10-06** — Thomas: *"1 write, 2 leave, 3 yes"*.
- **(1) Six merges WRITTEN** in `ru-russia-2026-08.json` (backup `_to_delete/ru-russia-2026-08.pre-merge-2026-10-06.json`;
  records `notes/retired-nodes-2026-10-06-ru.json`). **6** live edges re-pointed, not the 5 the dry run below says — the
  write script's count check caught it before writing. 5 self-loops dropped as `note`s (containment); 3 `_dropped` notes
  re-pointed; `ru-cbr-statistical-bulletin` moved to its latest issue, **No. 8 of 2026** (`…/62377/bbe2608e.pdf`, title page
  read). `ru-rosstat-transport-russia` is now zero-edge — its only support was its own appendix. **Re-grade:** all 28 live
  edges on the 6 moved edges' urls, every host 200; 25 unchanged, **3 C → B written** (improvements only), 0 down. **Trap
  found:** `grade-evidence.ts --write` always writes a slice at indent 2 (line 3600), so on this indent-1 slice it reformatted
  the whole file; restored to indent 1 with content verified identical.
- **(2) The four CBR function nodes LEFT** as they are.
- **(3) Url repairs, host by host.** The dry run's host split below is wrong — counted from `ru-classification.json`
  it is **Bank of Russia 16**, Rosstat regional 18, Rosstat federal 6, MinFin 3, government 2, the 177-FZ law 1.
  **Bank of Russia DONE: 10 of 16 written** (backup `_to_delete/ru-russia-2026-08.pre-cbr-urls-2026-10-06.json`; log
  `Claude outputs/granularity-ru-2026-10-06/ru-urls-batch1-cbr.json`; collision guard 0 hits; every url 200 with a matching
  `<title>` or, for the PDFs, title page). Edition choices: Financial Stability Review → its 2025 Q4–2026 Q1 issue page;
  Financial Market Risks Review → **the Russian monthly PDF, February 2026** (`ORFR_2026-2.pdf`), the newest on its Russian
  page — the English series stops at 2017 Q4, and pdftotext could not read the Russian PDF's text, so the match rests on the
  page listing; monetary base → the narrow-definition page (the node covers both definitions); the two survey nodes → their
  `.xlsx` tables (the possible central-bank-survey / depository-corporations merge is NOT one: three separate tables).
  **6 had no first-party page to find** and are unchanged: `ru-cbr-collective-investment-uif`, `-insurers-key-indicators`,
  `-npf-key-indicators` (the English site carries only press releases about these reviews; the Russian site search did not
  surface them), `-list-financial-corporations`, `-loans-statistics`, `-banking-sector-statistics`.
- **Rosstat regional DONE: 13 of 18 written** (backup `_to_delete/ru-russia-2026-08.pre-regional-urls-2026-10-06.json`; log
  `Claude outputs/granularity-ru-2026-10-06/ru-urls-batch2-rosstat-regional.json`; collision guard 0 hits). Each office's
  publications folder read with `curl -k` and each item's title paired with its own download link; every url is the
  LATEST edition listed, percent-encoded, and answered a ranged GET with 206 and the right file signature (RAR / ZIP /
  PDF). The edition, by its listing title: Samara yearbook and *Самарская область в цифрах* (titles undated on the listing);
  Irkutsk yearbook *за 2024 г.*, *в цифрах 2025*, socio-economic report *январь-август 2026*; Krasnoyarsk and Tyva
  yearbooks 2025 and *в цифрах 2025*; *Москва в цифрах 2025* (from Mosstat's live Moscow folder `65045` — the shared
  `65047` is 404); *Московская область в цифрах 2025*; Saint Petersburg yearbook **2022** and *в цифрах* **2019** — the newest
  Petrostat lists in that folder. **5 have no edition on their office's site:** `ru-samarastat-socio-economic-situation`,
  `ru-mosstat-moscow-statistical-yearbook`, `ru-mosstat-moscow-administrative-okrugs`,
  `ru-mosstat-moscow-oblast-statistical-yearbook`, `ru-petrostat-spb-districts`. Mosstat lists its paid editions in a
  *"Каталог платных статистических изданий"* for 2026 (Moscow, Moscow Oblast); both catalogue PDFs answered curl 000 from
  this machine, raw and percent-encoded, so **whether those yearbooks are paid-only is not verified**. The two Moscow nodes
  still carry the dead `65047` url.
- `validate` after the regional batch: exit 0, 128/128, **3,668 / 3,451, 1,413 A · 1,435 B · 603 C, 963 zero-edge**; NODE URLS index-page
  115 → 102; corpus-wide url collisions 93 groups / 241 nodes.
- **Rosstat federal DONE: 5 of 6 written** (backup `_to_delete/ru-russia-2026-08.pre-federal-urls-2026-10-06.json`; log
  `Claude outputs/granularity-ru-2026-10-06/ru-urls-batch3-rosstat-federal.json`; guard 0 hits; each a ranged GET 206 with
  the right signature). `rosstat.gov.ru` answered curl 000 on the first try and 200 seconds later — transient, not a wall;
  the batch ran with `--retry 3`. Agriculture → `met317-30062025.pdf` (*"…выпуска продукции сельского хозяйства"*); GRP →
  `met496-17092025.pdf` (*"Валовой региональный продукт … в текущих и постоянных ценах"*, matching the node's "current and
  constant prices"); census methodology → Rosstat order No. 549 of 9 September 2021 (*"Об утверждении Основных
  методологических и организационных положений…"*). **The two health nodes got their LEAD table, which is partial:**
  `ru-rosstat-medical-organisations-series` → `Zdr1-1_2024.xlsx` (*Медицинские организации*; beds and staff are separate
  tables on the same page) and `ru-rosstat-morbidity-series` → `Zdr2-1_2024.xlsx` (*…по основным классам болезней*; socially
  significant diseases is `Zdr2-2`). **`ru-rosstat-pharma-production` NOT changed** — its own edge's basis says it is
  "published as part of the industrial production statistical system", i.e. a topic inside *Промышленное производство в
  России*, which is a merge question (it would drop its one edge as a self-loop), not a url fix. Open for Thomas.
- `validate` after the federal batch: exit 0, 128/128, counts and grades unchanged; NODE URLS index-page 102 → 100;
  corpus-wide url collisions 90 groups / 235 nodes.
- **`ru-rosstat-pharma-production` MERGED** into `ru-rosstat-industrial-production-russia` (Thomas: *"merge pharma"*; backup
  `_to_delete/ru-russia-2026-08.pre-pharma-merge-2026-10-06.json`). Its only edge, to the handbook, became a self-loop and
  went to `_dropped` as a containment `note`; added to `meta.merged` (now 7) and to `notes/retired-nodes-2026-10-06-ru.json`.
  No other edge moved, so no re-grade. `validate`: exit 0, **3,667 / 3,450, 1,413 A · 1,435 B · 602 C**.
- **MinFin DONE: 3 of 3 written** (backup `_to_delete/ru-russia-2026-08.pre-minfin-urls-2026-10-06.json`; log
  `Claude outputs/granularity-ru-2026-10-06/ru-urls-batch4-minfin.json`; guard 0 hits; every page 200 with a matching
  `<title>`). MinFin publishes each budget series as monthly, quarterly and annual "brief information" documents updated in
  place; the two budget nodes describe all three and got the MONTHLY one, the most frequent (`id_4=119253`, federal;
  `id_4=119260`, consolidated incl. extra-budgetary funds). **`ru-minfin-public-debt` got its lead document, which is
  partial:** *"Public domestic debt of the Russian Federation"* (`id_4=104307`); the node also covers external debt (an
  anchor on MinFin's debt page with no document link found) and sub-sovereign and municipal debt (three separate documents).
  `minfin.gov.ru` answered curl 000 once and 200 on retry — transient. `validate`: exit 0, counts and grades unchanged; NODE
  URLS index-page 100 → 97; corpus-wide url collisions 88 groups / 230 nodes.
- **Government and the 177-FZ law DONE: 2 of 3 written** (backup `_to_delete/ru-russia-2026-08.pre-law-urls-2026-10-06.json`;
  log `Claude outputs/granularity-ru-2026-10-06/ru-urls-batch5-laws.json`; guard 0 hits). **The shared url
  `http://special.government.ru/en/news/56304` is DEAD** — it now redirects to the Government's homepage (same 63,221-byte
  page, title *"Правительство России официальный сайт"*). `ru-federal-budget-law-annual` → Federal Law **No. 426-ФЗ of 28
  November 2025**, *"О федеральном бюджете на 2026 год и на плановый период 2027 и 2028 годов"*, the latest annual budget
  law (`http://www.kremlin.ru/acts/bank/52657`, heading confirmed). `ru-177-fz-2003-deposit-insurance` → the law's own record
  on kremlin.ru, `http://www.kremlin.ru/acts/bank/20359` (heading *"Федеральный закон от 23.12.2003 г. № 177-ФЗ"*) —
  replacing the third-party `cis-legislation.com`; kremlin.ru carries a SECOND record with the same heading
  (`/acts/bank/49056`), the earlier id was used. kremlin.ru answered https with curl 000 and http with 200 from this
  machine, so the urls are http. **`ru-med-socio-economic-development-forecast` NOT changed**: the forecast is the Economy
  Ministry's document and `economy.gov.ru` was unreachable from this machine on 2026-10-06 — curl exit 6 then exit 28
  (timeout), including with the resolved IP pinned, and the built-in browser pane could not load it either. That is a
  statement about this machine's route, not the site; it still carries the dead government url. `ru-dia-deposit-insurance-
  agency` (left as an institution) still carries the third-party `cis-legislation.com` law page; an institution's url is
  its own homepage. `validate`: exit 0, counts and grades unchanged; corpus-wide url collisions **86 groups / 226 nodes**.

**Russia's url pass is finished.** Its 6 remaining url groups are all by design: the 7 Rosstat English topic nodes and the
4 CBR function nodes (both LEFT by ruling) and the nodes with no first-party page found (CBR ×6, Mosstat ×2 on the dead
`65047` folder).

The dry-run account follows, unchanged.

Sixth and last country in the queue under ruling (a), one node per document (Thomas, 2026-10-05). Method and instruments:
`notes/granularity-pilot-br-2026-10-05.md`. Artefacts: `Claude outputs/granularity-ru-2026-10-06/` — the per-node
classification is `ru-classification.json` (72 rows; the counts below are `node` over that file, not a tally by eye).
**No data file was changed.**

## Headline

**25 url groups, 72 nodes.** Classified:

| class | n | what |
|---|---|---|
| MERGE | 6 | four Rosstat *"Appendix by Subjects"* nodes into their handbook; two payment-system table nodes into the Statistical Bulletin |
| MERGE — variant | 4 | four Bank of Russia FUNCTIONS whose every out-edge cites the Annual Report — for a ruling |
| URL REPAIR | 46 | distinct documents carrying another document's url or an index page — **candidate urls NOT yet found** (below) |
| CORRECT | 8 | the url is this node's own document |
| TOPIC — leave | 7 | Rosstat English "indicator" topics, the class the BPS probe left |
| INSTITUTION — leave | 1 | `ru-dia-deposit-insurance-agency` |

**Host behaviour, 2026-10-06, this machine.** `rosstat.gov.ru` and every `NN.rosstat.gov.ru` failed curl with exit 60
(certificate) and once exit 6 (name resolution, not reproduced); **with `-k` all answered 200** — a certificate chain,
not a wall (`PLAYBOOK-CORPUS.md` §6). `www.cbr.ru`, `minfin.gov.ru`, `special.government.ru`, `cis-legislation.com`
answered 200 without it. **One shared url is dead:** `https://77.rosstat.gov.ru/folder/65047` (Mosstat's Moscow
publications folder) answers 404.

## The merges

**Rosstat handbook + "Appendix by Subjects" (4).** Read on each handbook's own Rosstat page
(`rosstat.gov.ru/folder/210/document/13225`, `13227`, `13229`, `13218`): the latest edition is listed with, beside it,
*"Приложение к сборнику (информация в разрезе субъектов Российской Федерации)"* — an appendix **to the handbook**, same
year. So `ru-rosstat-{industrial-production,construction,transport,healthcare}-subjects-appendix` merge into
`ru-rosstat-{…}-russia`.

**Bank of Russia Statistical Bulletin (2).** `ru-cbr-payment-system-indicators` and `ru-cbr-brps-payment-system` share
`…/file/62069/bbe2605e.pdf`, whose first page reads *"BANK OF RUSSIA STATISTICAL BULLETIN … 2026"* (No. 5) — the same
title as `ru-cbr-statistical-bulletin`'s own url (`…/57263/bbs2508e.pdf`, No. 8, 2025). Both are tables in it; they merge
into `ru-cbr-statistical-bulletin`, which under the edition rule moves to the newer issue.

`simulate-merge.ts` (`ru-plan.json`): reports 3,674 → 3,668, edges 3,456 → 3,451; 17 nodes change authority by more than
1%.

| | before | after | why |
|---|---|---|---|
| `ru-cbr-statistical-bulletin` | rank 2,021 | **rank 349** (+74%) | the two table nodes' edges land on the document |
| `ru-rosstat-healthcare-russia` | rank 115 | rank 103 | |
| `ru-rosstat-industrial-production-russia` | rank 76 | rank 79 | |
| `ru-rosstat-construction-russia` | rank 182 | **rank 346** (−30%) | see below |
| `ru-rosstat-transport-russia` | rank 2,003 | **rank 3,364** (−42%) | see below |

**Three handbooks FALL, and that is the correction working.** Each appendix node carried a C-graded
`uses_data_from` edge to its own handbook — containment recorded as a dependency. The merge makes those four edges
self-loops, which drop; the authority they were lending was circular. (`ru-rosstat-transport-russia`'s only support
was its own appendix.) Brazil and Uruguay rose because real citations concentrated; here a self-citation goes.

**Edges and notes the write must handle:** 4 self-loops dropped (appendix → own handbook, all C); 5 edges re-point
(two regional yearbooks → industrial production; Moscow yearbook → healthcare; healthcare → municipal database;
`ru-cbr-sbp-faster-payments` → bulletin; bulletin → 161-FZ) and 1 more self-loop (BRPS → payment indicators). **3
`_dropped` notes name an appendix** (`ru-russia-2026-08.json`: one `no-document`, two `deferred`) and re-point cleanly.
No note names the bulletin tables.

### Variant — four Bank of Russia functions into the Annual Report

`ru-cbr-banking-supervision-framework`, `ru-cbr-national-payment-system-oversight`, `ru-cbr-key-rate-corridor`,
`ru-cbr-dfa-market` describe what the Bank does, not a publication, and every one of their out-edges cites
`ar_2024_e.pdf` — the Annual Report, `ru-cbr-annual-report`'s own url. Ruling (a) says a topic's edges go to the
document their evidence names, which is the Annual Report. Simulated (`ru-plan-variant.json`): **3 of their edges are
duplicates** of the Report's own `-> ru-86-fz-2002-central-bank` and drop; 3 re-point; Report rank 128 → 133.
**The doubtful one:** `ru-cbr-digital-ruble-platform -> ru-cbr-national-payment-system-oversight` (B) cites a different
document (`rb_2024.pdf`), and would land on the Annual Report, which it does not cite. For a ruling, not assumed.

## The 46 url repairs — not yet located

Unlike the five earlier countries, **no replacement url was found or verified in this pass**; at 46 that is a
write-time job, host by host, each through the collision guard. By host: **Bank of Russia 18** (balance of payments,
banking-sector performance, collective investment, faster payments, Financial Stability Review, Financial Market Risks
Review, macroprudential approaches, monetary base, depository-corporations survey, central-bank survey, banking-sector
statistics, loans, mortgage market, insurers, pension funds, list of financial corporations — `www.cbr.ru` reads with
plain curl); **Rosstat regional 18** (Samara, Irkutsk, Moscow, Saint Petersburg ×3 each; Krasnoyarsk, Moscow Oblast, Tyva
×2 each — yearbook / *in figures* / socio-economic situation or districts, each a separate publication sharing its office's
publications folder); **Rosstat federal 6** (pharma production, medical organisations, morbidity, the two methodologies,
the census methodology order); **MinFin 3**; **government 2** (the forecast and the budget law share one news item).
`ru-177-fz-2003-deposit-insurance`'s url is a THIRD-PARTY host (`cis-legislation.com`); the law's own text is on an
official portal — a route note for whoever does it.

Two inside the 46 may yet merge when their pages are read: `ru-cbr-central-bank-survey` (*"Central Bank Survey and Other
Depository Corporations Survey"*) overlaps `ru-cbr-depository-corporations-survey`; and `ru-rosstat-morbidity-series` is
described as *"a core … component of the Healthcare in Russia collection"*.

## Questions for Thomas

1. **Write the six merges** (with the self-loop drops and the bulletin's move to its newer issue)?
2. **The four Bank of Russia functions**: fold into the Annual Report (and what to do with the digital-rouble edge), or
   leave them as they are, like the BPS topic nodes?
3. **The 46 url repairs**: run them host by host — Bank of Russia first (one host, plain curl), then the Rosstat regional
   offices?
