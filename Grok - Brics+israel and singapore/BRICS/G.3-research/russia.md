# BRICS/G.3 — RUSSIA: documented dependencies on international standards

Access method used (all `curl` calls): custom CA bundle =
`/root/.ccr/ca-bundle.crt` + Russian Trusted Root CA
(`https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt`, note: the
`root_ca_ssl_rsa2022.crt` path in the brief now 404s) + Russian Trusted Sub CA 2024
(`https://gu-st.ru/content/lending/russian_trusted_sub_ca_2024_pem.crt`,
SKI `77:3D:D9:39:AF:42:BD:DC:5B:CA:76:EA:EE:FD:CE:3E:61:29:30:5F` — confirmed).
Concatenate with explicit newlines between files or curl fails with error 77.

---

## ru-rosstat-cpi-methodology-915 -> cpi-manual — VERIFIED
URL: https://rosstat.gov.ru/storage/mediabank/Prikaz_915_15122021.pdf
HTTP check: `curl -sS --cacert /tmp/ru/full-bundle.crt -o p915.pdf -w '%{http_code} %{size_download} %{content_type}\n'` → `200 1199801 application/pdf` (96 pages, text-layer PDF, no OCR needed)
Location: Приложение № 1, п. 2 (body, p.2 of PDF) + footnote 1 (p.3 of PDF)

Verbatim (Russian), body:
«Методология подготовлена с учетом международных рекомендаций, изложенных
в «Резолюции об индексах потребительских цен», принятой 17-ой Международной
конференцией статистиков труда, и «Руководстве по индексу потребительских цен:
Концепции и Методы»¹, разработанном Межсекретариатской рабочей группой
по статистике цен (МРГСЦ), включая Евростат, Международной организацией труда
(МОТ), Международным валютным фондом (МВФ), Организацией экономического
сотрудничества и развития (ОЭСР), Европейской экономической комиссией
Организации Объединенных Наций (ЕЭК ООН) и Всемирным банком.»

Verbatim, footnote 1 (this is the edition-bearing part — printed in English in the original):
«¹ Consumer price index manual: Concepts and Methods / 2020 / International Labour
Organization/International Monetary Fund/Organisation for Economic Co-operation
and Development/Statistical Office of the European Union (Eurostat)/United Nations
Economic Commission for Europe/The World Bank.
https://www.imf.org/en/Data/Statistics/cpi-manual.»

English gloss: "The Methodology has been prepared taking into account the international
recommendations set out in the 'Resolution concerning consumer price indices' adopted by
the 17th International Conference of Labour Statisticians, and in the 'Consumer Price Index
Manual: Concepts and Methods'¹ developed by the Intersecretariat Working Group on Price
Statistics (IWGPS), including Eurostat, the ILO, the IMF, the OECD, the UNECE and the
World Bank." Footnote: "Consumer price index manual: Concepts and Methods / 2020 / ...
https://www.imf.org/en/Data/Statistics/cpi-manual."

Edition named? **YES** — "2020", and the footnote pins the exact IMF-hosted URL of the
manual. The dependent Russian document itself names the edition; no inference required.

Proposed relationship_type: `methodology_depends_on` — the clause is
«Методология подготовлена с учетом международных рекомендаций, изложенных в …»
("prepared taking into account the international recommendations set out in …"), i.e. the
Russian CPI methodology instrument states its own methodological derivation from the manual.
Note the hedge: «с учетом» = "taking into account", not "in accordance with" — a
methodological, not legally binding, dependency. That is exactly what
`methodology_depends_on` should carry.

Confidence: **STRONG**. Weakness to state: «с учетом» is softer than «в соответствии с»,
so this is an acknowledged-guidance dependency rather than a mandatory conformance claim.
Also: if the `cpi-manual` corpus node is the *2004* ILO/IMF/OECD edition rather than the
*2020* one, this edge must NOT be drawn — Rosstat names 2020 specifically. Confirm which
edition the node holds before merging.

---

## ru-rosstat-cpi-methodology-915 -> un-coicop-2018 — EDITION-UNNAMED (NO EDGE)
URL: https://rosstat.gov.ru/storage/mediabank/Prikaz_915_15122021.pdf
HTTP check: `200 1199801 application/pdf` (same fetch as above)
Location: Приложение № 1, section IV, п. 12.1 (p.13 of PDF); also пп. 21, 42, 43 (pp. 23, 63–68)

Verbatim (Russian):
«12.1 Классификация индивидуального потребления по целям (Classification Of Individual
Consumption By Purpose – COICOP) является одной из четырех функциональных
классификаций Системы национальных счетов для анализа потребления расходов
домашних хозяйств в соответствии с целями, для которых эти расходы осуществлялись.»
and, for the weights source:
«…анализируются итоги выборочного обследования бюджетов домашних хозяйств,
проводимого на территории всех субъектов Российской Федерации, в группировке
Классификатора индивидуального потребления домашних хозяйств по целям
(далее – КИПЦ-ДХ).»

English gloss: "12.1 The Classification of Individual Consumption By Purpose (COICOP) is one
of the four functional classifications of the System of National Accounts for analysing household
consumption expenditure according to the purposes for which that expenditure was made."
/ "…the results of the household budget survey conducted across all constituent entities of the
Russian Federation are analysed, grouped by the Classification of Individual Consumption by
Purpose of Households (hereinafter КИПЦ-ДХ)."

Edition named? **NO.** I searched the entire 96-page text layer: the strings `2018`, `1999`,
`COICOP 2018`, `КИПЦ 2018` appear **zero** times anywhere in the document (`2018` count = 0,
`1999` count = 0 across all pages). COICOP is named 1× in Latin script and «КИПЦ»/«КИПЦ-ДХ»
appears on pp. 13, 14, 23, 63, 64, 67, 68, always unversioned.

Proposed relationship_type: none — **NO EDGE PROPOSED.** Per the edition rule, choosing
between `un-coicop-2018` and `un-coicop-hbs-1999` would assert something Приказ 915 does not say.
Note the added hazard here: Rosstat uses **two** distinct things — «КИПЦ» (the CPI aggregation
classifier, §12.1) and «КИПЦ-ДХ» (the *household-budget-survey* classifier used to build the
weights, §§21, 42, 43). «КИПЦ-ДХ» is plausibly the lineal descendant of COICOP-HBS
(`un-coicop-hbs-1999`) and «КИПЦ» of the main COICOP — but the document never says so, and
guessing which maps to which would be exactly the fabricated-edge failure this round is
guarding against.

Confidence: n/a (refusal). Recorded as a found-and-correctly-refused unversioned citation.

---

## ru-rosstat-cpi-methodology-915 -> sna-2008 / sna-2025 — EDITION-UNNAMED (NO EDGE)
URL: https://rosstat.gov.ru/storage/mediabank/Prikaz_915_15122021.pdf
HTTP check: `200 1199801 application/pdf`
Location: п. 12.1 (p.13 of PDF)

Verbatim (Russian): «…является одной из четырех функциональных классификаций
Системы национальных счетов для анализа потребления расходов домашних хозяйств…»
English gloss: "…is one of the four functional classifications of the System of National Accounts
for analysing household consumption expenditure…"

Edition named? **NO.** «Система национальных счетов» appears without a year; the abbreviation
«СНС» does not appear in the document at all (count = 0). No `2008`/`1993`/`2025` anywhere.

Proposed relationship_type: none — **NO EDGE PROPOSED.** `sna-2008` and `sna-2025` are separate
nodes; an unversioned "System of National Accounts" cannot select between them. (It is also only
an incidental descriptive mention, not a dependency claim.)

Confidence: n/a (refusal).

---

## CANDIDATE NEW NODE — ICLS 17th Resolution concerning consumer price indices
Cited by `ru-rosstat-cpi-methodology-915` in the same sentence as the CPI Manual (p.2 of PDF):
«…международных рекомендаций, изложенных в «Резолюции об индексах потребительских
цен», принятой 17-ой Международной конференцией статистиков труда…»
English gloss: "…international recommendations set out in the 'Resolution concerning consumer
price indices' adopted by the 17th International Conference of Labour Statisticians…"

Title: *Resolution concerning consumer price indices*, adopted by the Seventeenth International
Conference of Labour Statisticians (ICLS), Geneva, 2003.
Publisher: International Labour Organization (ILO).
URL: https://www.ilo.org/resource/conference-paper/resolution-concerning-consumer-price-indices

**Do NOT force this onto `icls-work-statistics-resolution`.** That node is the ICLS resolution on
*work statistics* (19th ICLS, 2013). The 17th ICLS CPI resolution is a different instrument on a
different subject. If a node is minted, the Rosstat citation names the *conference number* (17th),
which pins the edition unambiguously — so this would be a `methodology_depends_on` edge with
STRONG confidence, from `ru-rosstat-cpi-methodology-915`.

---

## ru-rosstat-cpi-methodology-915 -> isic / hs / sdmx-standard / imf-sdds — NOT FOUND
URL: https://rosstat.gov.ru/storage/mediabank/Prikaz_915_15122021.pdf
HTTP check: `200 1199801 application/pdf`
Full-text search of the extracted 96-page text layer returned **zero** occurrences of:
`МСОК`, `ISIC`, `КДЕС`, `NACE`, `ОКПД`, `Гармонизированн`, `SDMX`, `СДМХ`, `SDDS`, `ОСРД`.
The document does invoke ОКВЭД 2 («Общероссийский классификатор видов экономической
деятельности ОКВЭД 2 (ОК 034-2014)», п.12.3) but says nothing about its NACE/ISIC derivation —
so no ISIC edge can be drawn from this document.
Two unattributed appeals to «международные стандарты» ("international standards") appear
(пп. 21 and the dissemination section, p.93) with no standard named — not usable.

---

## NEW-NODE `ru-rosstat-osm-233-household-accounts` -> sna-2008 — VERIFIED
(Rosstat Приказ № 233 от 18.05.2023, «Официальная статистическая методология построения
нефинансовых счетов сектора домашних хозяйств в Системе национальных счетов Российской
Федерации». This is a NEW Russian source node — no existing node in the corpus covers Rosstat
national accounts. Node URL below.)

URL: https://rosstat.gov.ru/storage/mediabank/met233-18052023.pdf
(index page: https://rosstat.gov.ru/statistics/accounts/methodology → HTTP 200 793145)
HTTP check: `curl -sS --cacert /tmp/ru/full-bundle.crt -w '%{http_code} %{size_download}\n'` → `200 492883` (text-layer PDF)

Verbatim (Russian), п.1 «Общие положения»:
«Цель данной методологии – разработка алгоритма формирования показателей нефинансовых
счетов сектора домашних хозяйств в системе национальных счетов Российской Федерации
на основе Руководства «Система национальных счетов 2008»¹ (далее – СНС 2008).»
Footnote 1 (full bibliographic citation, i.e. the edition is pinned twice):
«¹ Система национальных счетов 2008: Пер. с англ. / Еврокомиссия, МВФ, ОЭСР, ООН,
Всемирный банк. – Нью-Йорк, 2012.»
And later: «При подготовке документа использована терминология, зафиксированная
в русскоязычном издании СНС 2008 года, опубликованном Секретариатом ООН в 2012 году.»

English gloss: "The purpose of this methodology is to develop the algorithm for compiling the
indicators of the non-financial accounts of the household sector in the system of national accounts
of the Russian Federation **on the basis of the Manual 'System of National Accounts 2008'**
(hereinafter SNA 2008)." Footnote: "System of National Accounts 2008: translated from English /
European Commission, IMF, OECD, UN, World Bank. – New York, 2012." / "In preparing this
document the terminology fixed in the Russian-language edition of SNA 2008 published by the
UN Secretariat in 2012 was used."

Edition named? **YES — «Система национальных счетов 2008» / «СНС 2008», stated 44 times in
this one document**, plus a full footnote citation naming the five sponsoring organisations and
the 2012 New York Russian edition. This is unambiguous: `sna-2008`, not `sna-2025`.

Proposed relationship_type: `methodology_depends_on` — «на основе Руководства …» ("on the basis
of the Manual …") is a derivation claim, not a mere mention, and the document is a legally
approved (утверждена приказом Росстата) official statistical methodology.

Confidence: **STRONG**. Weakness: it is a sectoral methodology (household non-financial accounts),
not the umbrella Russian national accounts standard — so the edge is narrower in scope than
"Russian national accounts depend on SNA 2008". See corroborating instruments below, which make
the pattern system-wide.

### Corroborating Rosstat instruments naming «СНС 2008» explicitly (same fetch method, all HTTP 200)
Any of these could equally be minted; all name the 2008 edition in their opening clause:
- **Приказ Росстата № 959 от 27.12.2021** (стоимостная оценка земли) —
  https://rosstat.gov.ru/storage/mediabank/met_959-27122021.pdf (200, 475848)
  «…в соответствии с требованиями Системы национальных счетов 2008 года (СНС 2008)¹»,
  footnote: «¹ Система национальных счетов 2008 года. Европейская комиссия, Международный
  валютный фонд, Организация экономического сотрудничества и развития, Организация
  Объединенных Наций, Всемирный банк. Нью-Йорк. 2012 URL (далее – СНС-2008).»
  Note this uses «в соответствии с требованиями» = "in accordance with the requirements of" —
  a *stronger* conformance verb than the № 233 wording.
- **Приказ Росстата № 216 от 16.04.2021** (текущая рыночная стоимость основных фондов) —
  https://rosstat.gov.ru/storage/mediabank/met_216-16042021.pdf (200, 909520)
  «…в соответствии с требованиями Системы национальных счетов 2008 года (СНС-2008)¹»
- **Приказ Росстата № 816 от 28.12.2019** (баланс активов и пассивов и счета накопления СНС) —
  https://rosstat.gov.ru/storage/mediabank/met_816-28122019.pdf (200, 745799)
  «…в соответствии с требованиями Системы национальных счетов 2008 года (далее – СНС 2008)¹»
- **Приказ Росстата № 471 от 10.09.2025, Приложения 5–6** (счёт образования доходов) —
  https://rosstat.gov.ru/storage/mediabank/met471-10092025_(pril_5_6).pdf (200, ~)
  «Методология базируется на методологических принципах **международного стандарта
  «Система национальных счетов» 2008 года** (далее - СНС-2008).»
  ("The Methodology is based on the methodological principles of the **international standard
  'System of National Accounts' 2008**") — note this one explicitly calls SNA 2008 an
  *international standard*, which is the cleanest phrasing for this project's purpose.
- **Приказ Росстата № 172 от 09.04.2026** (счёт производства, сектор «Финансовые корпорации») —
  https://rosstat.gov.ru/storage/mediabank/met170_09042026.pdf (200, ~)
  «Концептуальной основой Методологии являются положения Системы национальных счетов
  2008 года¹ (далее – СНС 2008) принятой Европейской комиссией (ЕК), Международным валютным
  фондом (МВФ), Организацией экономического сотрудничества и развития (ОЭСР), Организацией
  Объединенных Наций (ООН), Всемирным банком.»
  ("The conceptual basis of the Methodology is the provisions of the System of National Accounts
  2008, adopted by the EC, IMF, OECD, UN and World Bank.")
- **Приказ Росстата № 547 от 07.09.2018** (запасы потребительских товаров длит. пользования) —
  https://rosstat.gov.ru/storage/mediabank/met_547-07092018.pdf (200, 455535)
  «…в соответствии с принципами Системы национальных счетов 2008 года (далее СНС 2008).»

Note: many of these carry «(с изменениями, внесенными приказом Росстата от 26.08.2025 № 426)»,
i.e. they are live, amended-as-of-2025 instruments, not archival.

---

## NEW-NODE `ru-rosstat-gdp-dissemination-procedure` -> imf-sdds — VERIFIED
(«Порядок разработки и представления данных по валовому внутреннему продукту» — Rosstat's
own GDP release-calendar/dissemination procedure, published on the national accounts
methodology page. NEW Russian source node.)

URL: https://rosstat.gov.ru/storage/mediabank/poryadok-razrabotki.pdf
HTTP check: `curl -sS --cacert /tmp/ru/full-bundle.crt -w '%{http_code} %{size_download}\n'` → `200 6241`-char text layer, fetched 200
(linked from https://rosstat.gov.ru/statistics/accounts/methodology, HTTP 200 793145)

Verbatim (Russian), opening paragraph:
«Сроки представления данных по ВВП публикуются в «Федеральном плане статистических работ»
и соответствуют срокам публикации этого показателя, определенным **Специальным стандартом
распространения данных МВФ, к которому присоединилась Россия 31 января 2005 года**.»

English gloss: "The release dates for GDP data are published in the 'Federal Plan of Statistical
Works' and **correspond to the publication deadlines for this indicator established by the IMF's
Special Data Dissemination Standard, to which Russia acceded on 31 January 2005**."

Edition named? **N/A — and that is fine here.** The SDDS is a single named standard, not an
edition series; the corpus holds one `imf-sdds` node. The Russian document names it in full
(«Специальный стандарт распространения данных МВФ» = IMF Special Data Dissemination Standard)
and pins the accession date, so there is no ambiguity about which instrument is meant.

Proposed relationship_type: `methodology_depends_on` — «соответствуют срокам публикации …,
определенным Специальным стандартом распространения данных МВФ» is a direct statement that a
Russian statistical release timetable is *determined by* the SDDS. (If the schema distinguishes
timeliness/dissemination conformance from conceptual methodology, `cites` would be the safer
fallback; the dependency here is on the SDDS *timeliness* dimension specifically, not on GDP
concepts.)

Confidence: **STRONG**. Weakness: this document is undated on its face and carries no приказ
number, so it is a Rosstat web publication rather than a numbered legal instrument — slightly
weaker provenance than the приказы above, though it is Rosstat-authored and Rosstat-hosted. Also,
Russia's SDDS subscription status post-2022 is not addressed in the document; the claim is about
accession in 2005 and is stated in the present tense on a currently-published page.

---

## NEW-NODE `ru-rosstat-gdp-dissemination-procedure` -> sna-2008 — EDITION-UNNAMED (NO EDGE)
URL: https://rosstat.gov.ru/storage/mediabank/poryadok-razrabotki.pdf   HTTP check: `200`
Verbatim (Russian): «ВВП формируется в соответствии с методологическими положениями
по построению национальных счетов России, утвержденными Росстатом на основе концепций
системы национальных счетов, разработанных под эгидой ООН…»
English gloss: "GDP is compiled in accordance with the methodological provisions for constructing
Russia's national accounts, approved by Rosstat on the basis of the concepts of the system of
national accounts developed under the auspices of the UN…"
Edition named? **NO** — «системы национальных счетов … под эгидой ООН», no year.
Proposed relationship_type: none — **NO EDGE.** Cannot select between `sna-2008` and `sna-2025`.
(The SNA 2008 dependency is instead carried by the numbered приказы above, which do name the year.)

---

## CANDIDATE NEW NODE — IMF *Quarterly National Accounts Manual* (2001)
Cited by the same Rosstat GDP procedure document:
«Динамические ряды ВВП и его компонентов строятся на основе методов, изложенных
в «Руководстве по квартальным национальным счетам», разработанным под эгидой МВФ
в 2001 году¹⁾ и с учетом национальной практики.»
English gloss: "Time series of GDP and its components are constructed on the basis of the methods
set out in the 'Quarterly National Accounts Manual', developed under the auspices of the **IMF
in 2001**, and taking into account national practice."
Title: *Quarterly National Accounts Manual: Concepts, Data Sources, and Compilation* (2001 ed.).
Publisher: International Monetary Fund. URL: https://www.imf.org/external/pubs/ft/qna/2000/textbook/
Edition named? **YES — 2001.** Not on the valid-target list; reported as a candidate new node.
Would be `methodology_depends_on` from `ru-rosstat-gdp-dissemination-procedure`, STRONG.

---

## COICOP re-check against Rosstat national accounts — EDITION-UNNAMED (NO EDGE)
URL: https://rosstat.gov.ru/storage/mediabank/met233-18052023.pdf   HTTP check: `200 492883`
Verbatim (Russian), §3.6.22:
«…используется Классификатор индивидуального потребления домашних хозяйств по целям
(КИПЦ-ДХ), утвержденный приказом Росстата от 2 августа 2013 г. № 304. Классификация КИПЦ
разработана на основе функциональной классификации Classification Of Individual Consumption
By Purpose (COICOP) и соответствует СНС 2008.»
English gloss: "…the Classifier of Individual Consumption of Households by Purpose (КИПЦ-ДХ),
approved by Rosstat order No. 304 of 2 August 2013, is used. The КИПЦ classification **was
developed on the basis of the functional classification Classification Of Individual Consumption
By Purpose (COICOP)** and conforms to SNA 2008."
Edition named? **NO for COICOP** (bare "COICOP"; the "2008" in the sentence attaches to СНС, not
to COICOP). **YES for SNA** — this sentence independently corroborates the `sna-2008` edge.
Proposed relationship_type: none for COICOP — **NO EDGE.** This is the strongest *derivation*
wording found anywhere for COICOP («разработана на основе … COICOP» = "developed on the basis of
COICOP"), and it is still unusable: no edition. Note also that КИПЦ-ДХ was approved in **2013**,
which predates COICOP 2018 — so if anything it descends from the pre-2018 COICOP, making an
edge to `un-coicop-2018` affirmatively likely to be *wrong*, not merely unsupported.

---

## NEW-NODE `ru-cbr-bop-methodological-commentary` -> imf-bpm6 — VERIFIED
(Bank of Russia, «Методологический комментарий к платежному балансу Российской Федерации».
NEW Russian source node — no existing corpus node covers the Russian balance of payments.)

URL: https://www.cbr.ru/statistics/macro_itm/external_sector/pb/meth_com_bop/
HTTP check: `curl -sS --cacert /tmp/ru/full-bundle.crt -w '%{http_code} %{size_download} %{content_type}\n'` → `200 62703 text/html; charset=utf-8`
(Note: the `cbr.ru/statistics/macro_itm/svs/` path given in the brief now returns **404 11100** —
the balance-of-payments section has moved to `.../macro_itm/external_sector/pb/`.)

Verbatim (Russian), opening line of the commentary:
«Концептуальной и методологической основой является **шестое издание Руководства
по платежному балансу и международной инвестиционной позиции МВФ (РПБ6)**.»
and, in the presentation section:
«Основные агрегаты представляют собой набор главных компонентов платежного баланса,
рекомендованных в РПБ6…» / «Интерпретация знаков платежного баланса (согласно РПБ6)»

English gloss: "The conceptual and methodological basis is the **sixth edition of the IMF's
Balance of Payments and International Investment Position Manual (BPM6)**." / "The main
aggregates constitute the set of principal balance-of-payments components recommended in BPM6…"
/ "Interpretation of balance-of-payments signs (per BPM6)".

Edition named? **YES — «шестое издание» ("sixth edition") + the abbreviation РПБ6 (=BPM6)**,
stated in the very first sentence and used throughout. Unambiguous match to `imf-bpm6`.

Proposed relationship_type: `methodology_depends_on` — «Концептуальной и методологической
основой является …» ("the conceptual and methodological basis is …") is about as explicit a
methodological-dependency statement as exists.

Confidence: **STRONG**. Weakness: it is a web methodological commentary rather than a numbered
CBR normative act (указание/положение); provenance is nonetheless first-party CBR on cbr.ru.

### Corroborating, with the publication year of BPM6 also named
URL: https://www.cbr.ru/vfs/statistics/ssrd/meth/vd_m.pdf
HTTP check: → `200 543267 application/pdf` (CBR's IMF-SDDS metadata sheet for **external debt**)
Verbatim: «Методологической и концептуальной основой статистики внешнего долга является
**шестое издание «Руководства по платежному балансу и международной инвестиционной позиции»
(РПБ6) Международного Валютного Фонда, 2009** и «Статистика внешнего долга»: Руководство
для составителей и пользователей, 2013 (Руководство по внешнему долгу).»
English gloss: "The methodological and conceptual basis of external-debt statistics is the
**sixth edition of the 'Balance of Payments and International Investment Position Manual' (BPM6)
of the International Monetary Fund, 2009** and 'External Debt Statistics: Guide for Compilers and
Users', 2013." → edition AND year (2009) both named.

URL: https://www.cbr.ru/StaticHtml/File/105133/BOP_SM.pdf
HTTP check: → `200 183197 application/pdf` (CBR's IMF-SDDS metadata sheet for the **balance of payments**)
Verbatim: «I. Методологическая основа, концепции, определения и классификации •
Методологическая основа: Методологической и концептуальной основой статистики платежного
баланса является **шестое издание «Руководства по платежному балансу и международной
инвестиционной позиции» Международного Валютного Фонда (РПБ6)**.»

---

## NEW-NODE `ru-cbr-iip-methodological-commentary` -> imf-bpm6 — VERIFIED
URL: https://www.cbr.ru/statistics/macro_itm/external_sector/iip/meth_com_iip/
HTTP check: → `200 47941 text/html; charset=utf-8`
Verbatim (Russian): «Концептуальной и методологической основой является **шестое издание
Руководства по платежному балансу и международной инвестиционной позиции Международного
валютного фонда (РПБ6)**.»
English gloss: "The conceptual and methodological basis is the **sixth edition of the IMF's
Balance of Payments and International Investment Position Manual (BPM6)**."
Edition named? **YES** — «шестое издание» / РПБ6.
Proposed relationship_type: `methodology_depends_on`.
Confidence: **STRONG**. Same weakness as above (web commentary, not a numbered act).
(If only one CBR external-sector node is wanted, use the BoP one and treat this as corroboration.)

---

## NEW-NODE `ru-cbr-sdds-page` -> imf-sdds — VERIFIED
(Bank of Russia, «Специальный стандарт МВФ на распространение данных (ССРД МВФ)» — Russia's
CBR-hosted SDDS section, functionally the National Summary Data Page entry point.)

URL: https://www.cbr.ru/statistics/ssrd/
HTTP check: `curl -sS --cacert /tmp/ru/full-bundle.crt -w '%{http_code} %{size_download}\n'` → `200 31129`
(page footer: «Последнее обновление страницы: 27.09.2023»)

Verbatim (Russian):
«Специальный стандарт МВФ на распространение данных (ССРД МВФ) … Календарь предварительных
сроков публикации данных, распространяемых Банком России **в соответствии с требованиями
Специального стандарта Международного валютного фонда на распространение данных (ССРД МВФ)**.
Рубрика содержит данные, распространяемые Банком России в соответствии с требованиями ССРД МВФ.
Применительно к требованиям ССРД МВФ распространяются также: Данные Росстат, Данные Минфина
России, Доска объявлений ССРД МВФ, Информация о ССРД МВФ»

English gloss: "IMF Special Data Dissemination Standard (SDDS IMF) … Advance release calendar for
data disseminated by the Bank of Russia **in accordance with the requirements of the International
Monetary Fund's Special Data Dissemination Standard (SDDS IMF)**. This section contains data
disseminated by the Bank of Russia in accordance with the requirements of the IMF SDDS. Also
disseminated in relation to the IMF SDDS requirements: Rosstat data, Ministry of Finance of Russia
data, IMF SDDS Dissemination Standards Bulletin Board, Information on the IMF SDDS."

Edition named? **N/A** (single-instrument standard, no edition series). Named in full in Russian
and matched to `imf-sdds` without ambiguity.

Proposed relationship_type: `methodology_depends_on` — «в соответствии с требованиями» ("in
accordance with the requirements of") is a conformance claim about the release calendar and data
coverage. `cites` is the conservative fallback.

Confidence: **STRONG** on the citation itself. Weakness worth recording: the page was last updated
27.09.2023, and it makes no statement about Russia's SDDS subscription status after 2022 — the
edge asserts what the CBR page claims, not verified live SDDS participation. Also note this page
explicitly says the same SDDS requirements cover **Rosstat** and **Minfin** data, which is
independent Russian-side corroboration of the Rosstat GDP→SDDS edge recorded above.

---

## NEW-NODE `ru-minfin-prikaz-128n-gfs-procedure` -> imf-sdds — VERIFIED
(Приказ Минфина России от 09.09.2021 № 128н «Об утверждении Порядка формирования информации
по статистике государственных финансов…». A numbered, Minjust-registered normative act.
NEW Russian source node.)

URL (order + Порядок, PDF): https://minfin.gov.ru/common/upload/library/2021/12/main/Poryadok_128n.pdf
URL (appendices, .zip containing the native .doc/.docx of the order and the Порядок):
https://minfin.gov.ru/common/upload/library/2021/12/main/128n_reg.zip
Index page: https://minfin.gov.ru/ru/perfomance/budget/gosfin/fin_stats/
HTTP checks: `Poryadok_128n.pdf 200 864760`, `128n_reg.zip 200 79513`, index `200 53814`
**Access note:** minfin.gov.ru returns **503** ("Доступ к сайту временно ограничен владельцем
веб-ресурса") to a bare curl on any sub-path. Fix: fetch `https://minfin.gov.ru/ru/` first with a
real browser User-Agent, save cookies (`-c cj.txt`), then reuse them (`-b cj.txt`) with
`-H 'Referer: https://minfin.gov.ru/ru/'`. WebFetch fails on this host (robots.txt itself 503s).

Verbatim (Russian) — preamble of the order. Taken from the **native .doc** inside `128n_reg.zip`
(UTF-16LE text, NOT OCR); independently confirmed by tesseract `-l rus` OCR of page 1 of
`Poryadok_128n.pdf`, which is an image-only scan:
«В соответствии с абзацем двадцать четвертым статьи 165 и абзацем двадцать вторым пункта 1
статьи 166.1 Бюджетного кодекса Российской Федерации …, а также в рамках реализации
Федерального закона от 3 октября 2014 г. № 279-ФЗ "О ратификации Договора о Евразийском
экономическом союзе" …, постановления Верховного Совета Российской Федерации от 22 мая 1992 г.
№ 2815-1 "О вступлении Российской Федерации в Международный валютный фонд, Международный
банк реконструкции и развития и Международную ассоциацию развития" …, **постановления
Правительства Российской Федерации от 26 сентября 1997 г. № 1226 "О присоединении Российской
Федерации к Специальному стандарту распространения данных МВФ"** …, в целях совершенствования
методологии формирования информации по статистике государственных финансов п р и к а з ы в а ю:»

English gloss: "Pursuant to … the Budget Code of the Russian Federation …, and in implementation
of Federal Law No. 279-FZ of 3 October 2014 'On ratification of the Treaty on the Eurasian
Economic Union' …, Resolution of the Supreme Soviet of the Russian Federation No. 2815-1 of
22 May 1992 'On the accession of the Russian Federation to the International Monetary Fund, the
IBRD and the IDA' …, **Resolution of the Government of the Russian Federation No. 1226 of
26 September 1997 'On the accession of the Russian Federation to the IMF Special Data
Dissemination Standard'** …, and with a view to improving the methodology for compiling government
finance statistics, I ORDER:"

Edition named? **N/A** (SDDS has no edition series). The standard is named in full in Russian and
is the legal enabling basis recited in the order's preamble.

Proposed relationship_type: `methodology_depends_on` (or, if the schema has a legal-basis type,
that is more accurate) — this is the **strongest form of dependency found in this whole round**:
the SDDS is not merely referenced but recited as part of the *legal authority* under which the
Russian GFS compilation procedure is issued, via ПП РФ № 1226. The Порядок itself further states
(§2) that GFS information is compiled «с учетом соответствия показателей Информации по СГФ
Российской Федерации требованиям специальных стандартов по распространению данных
о государственных финансах в соответствии с международными договорами Российской Федерации»,
and (§22) that Federal Treasury transmits the data **«в Международный валютный фонд»** on a
fixed month/quarter/year timetable.

Confidence: **STRONG**. Weakness: the preamble names the 1997 Government Resolution, not the SDDS
document directly; the SDDS is named inside that resolution's title. If the project requires the
dependent document to name the standard *itself* (it does — and it does here: the standard's full
Russian name «Специальный стандарт распространения данных МВФ» appears verbatim in the приказ's
own text), this is satisfied.

### CANDIDATE NEW NODE — ПП РФ от 26.09.1997 № 1226
«О присоединении Российской Федерации к Специальному стандарту распространения данных МВФ»
(Government of the Russian Federation Resolution No. 1226, 26 Sept 1997, on Russia's accession to
the IMF SDDS). This is the Russian legal instrument of SDDS accession and would be the ideal
intermediate node: `ru-minfin-prikaz-128n` → ПП-1226 → `imf-sdds`. Published in СЗ РФ 1997, № 40,
ст. 4594. I did not retrieve its full text (see NOT-FOUND note on pravo.gov.ru below).
**Caveat worth recording:** ПП № 1226 is dated 1997, but the Rosstat GDP procedure says Russia
acceded to SDDS on **31 January 2005**. These are two different events (the 1997 resolution
authorises accession; 2005 is the actual subscription date). Do not treat them as contradictory.

---

## NEW-NODE `ru-minfin-gfs-kosgu-mapping-table` -> imf-gfsm — VERIFIED
(Minfin methodological material: «Таблица соответствия кодов классификации доходов и статей
(подстатей) КОСГУ кодам Классификации доходов, установленным Руководством по статистике
государственных финансов (СГФ - 2014)», применяемая с 1 января 2026 года.)

URL (file): https://minfin.gov.ru/common/upload/library/2026/07/main/KOSGU_20260722_2026.xlsx
Index page: https://minfin.gov.ru/ru/perfomance/budget/gosfin/fin_stats/method/
HTTP checks: file `200 967748`; index page `200 76786`

Verbatim (Russian) — the title cell inside the workbook itself (read from
`xl/sharedStrings.xml`; identical string also appears as the document title on the Minfin index page):
«Таблица соответствия кодов классификации доходов и статей (подстатей) КОСГУ кодам
Классификации доходов, установленным **Руководством по статистике государственных финансов
(СГФ - 2014)**, применяемая с 1 января 2026 года»

English gloss: "Correspondence table mapping revenue-classification codes and KOSGU items
(sub-items) to the revenue Classification codes **established by the Government Finance Statistics
Manual (GFSM 2014)**, applicable from 1 January 2026."

Edition named? **YES — «СГФ - 2014» = GFSM 2014**, which is exactly the `imf-gfsm` node
(*Government Finance Statistics Manual 2014*). Unambiguous.

Proposed relationship_type: `methodology_depends_on` — the Russian budget-revenue and KOSGU
classifications are mapped onto the classification «установленн[ую] Руководством по статистике
государственных финансов (СГФ - 2014)» ("established by GFSM 2014"), i.e. the Russian codes are
made to conform to the GFSM 2014 classification for reporting purposes.

Confidence: **MEDIUM-to-STRONG**. Weaknesses, stated plainly: (a) the citation is in the *title*
of a methodological correspondence table, not in the operative text of a numbered приказ —
I looked for GFSM 2014 in the operative text of Приказ 128н and its Порядок and did **not**
find it (the Порядок says only «руководствами по распространению (раскрытию) данных
о государственных финансах в соответствии с международными договорами Российской Федерации»,
unnamed and unversioned); (b) the file is republished annually, so the URL is year-stamped and
will move. The title text has been stable across the 2024/2025/2026 editions listed on the
index page, all of which say «(СГФ - 2014)».

---

## `ru-minfin-prikaz-128n` -> imf-gfsm — EDITION-UNNAMED in the operative text (NO EDGE from 128н itself)
URL: https://minfin.gov.ru/common/upload/library/2021/12/main/128n_reg.zip   HTTP check: `200 79513`
Verbatim (Russian), Порядок §2 and §19:
«…с учетом соответствия показателей Информации по СГФ Российской Федерации требованиям
специальных стандартов по распространению данных о государственных финансах в соответствии
с международными договорами Российской Федерации.»
«Формирование и обобщение Информации по СГФ осуществляется на основании методов формирования
статистических данных о государственных финансах, предусмотренных руководствами
по распространению (раскрытию) данных о государственных финансах в соответствии
с международными договорами Российской Федерации.»
English gloss: "…taking into account the conformity of the indicators of the Russian Federation's
GFS Information with the requirements of the special standards for the dissemination of government
finance data under the international treaties of the Russian Federation." / "The compilation and
consolidation of GFS Information is carried out on the basis of the methods for producing
government finance statistical data provided for by the **manuals** for the dissemination
(disclosure) of government finance data under the international treaties of the Russian Federation."
Edition named? **NO** — «руководствами» is plural, generic and unversioned; no "GFSM", no "2014".
Proposed relationship_type: none from this text — **NO EDGE.** The GFSM 2014 edge is carried by
the correspondence-table node above, which does name the edition.

---

## Minfin -> ipsas — NOT FOUND
Searched (all HTTP 200 via the cookie+UA method described above):
- `https://minfin.gov.ru/ru/perfomance/budget/gosfin/bu_gs/` (Бухгалтерский учёт госсектора hub) — `200 106743`
- **Приказ Минфина России от 25.04.2023 № 54н** «Об утверждении программы разработки федеральных
  стандартов бухгалтерского учета государственных финансов на 2023–2026 гг.» —
  https://minfin.gov.ru/common/upload/library/2023/07/main/54n.pdf — `200 500964`, 9 pages,
  image-only, OCR'd with tesseract `-l rus`. **Zero** occurrences of «МСФО», «общественного
  сектора», «международн». Its enabling clause cites only ФЗ № 402-ФЗ «О бухгалтерском учете»
  and ПП РФ № 329 — no international standard.
- **Приказ Минфина России от 31.12.2016 № 256н**, СГС «Концептуальные основы бухгалтерского учета
  и отчетности организаций государственного сектора» —
  https://minfin.gov.ru/common/upload/library/2017/05/main/prikaz_256n_31122016.pdf — `200 7669498`,
  image-only, OCR'd (pp. 1–5). **Zero** occurrences of «МСФО»/«общественного сектора»/«международ».
- **Письмо Минфина от 13.12.2017 № 02-07-07/83463** (methodological guidance on СГС «Аренда») —
  https://minfin.gov.ru/common/upload/library/2017/12/main/pismoMFRF_02-07-07_83463_ot_131217.pdf —
  `200 4536168`, image-only, OCR'd. The only relevant wording is the **unnamed**
  «…предусмотрено **с учетом международной практики** дополнительное раскрытие…»
  ("…additional disclosure is provided for, **taking into account international practice**…").
  No standard named, no IPSAS number, no edition. NOT usable.

**What Minfin does have, and why it is still not an edge:** Minfin publishes the official Russian
translation of IPSAS —
«Сборник "Международные стандарты финансовой отчетности общественного сектора". Официальный
перевод на русский язык», published 18.07.2012, ZIP 8.98 MB:
https://minfin.gov.ru/ru/document/?id_4=16828-sbornik_mezhdunarodnye_standarty_finansovoi_otchetnosti_obshchestvennogo_sektora (`200 34326`)
and the 2011 procurement record «Проведение работ по подготовке официального перевода на русский
язык и публикации Международных стандартов финансовой отчетности в общественном секторе
(МСФООС, **версия 2010 года**)»:
https://minfin.gov.ru/ru/perfomance/budget/archive/policy/reforma/int_exp (`200 35676`)
This is Minfin **hosting/translating** IPSAS, not a Russian instrument declaring that a Russian
standard is methodologically dependent on IPSAS. Per the brief's evidence standard ("the
dependent document's own text must name the international standard"), a translation programme is
not a dependency statement. **NO EDGE.** Recording this explicitly because the "Russia follows
IPSAS" claim is common in secondary literature and is *not* supported by primary Minfin text —
the ФСБУ ГФ programme order and the Концептуальные основы standard both cite only domestic law.
