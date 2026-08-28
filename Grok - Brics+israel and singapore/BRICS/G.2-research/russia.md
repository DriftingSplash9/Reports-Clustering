# BRICS Round 2 (BRICS/G.2) — RUSSIA

Research date: 2026-08-13. Agent: research agent, Reports Clustering project.

---

## 0. HEADLINE METHODOLOGICAL FINDING — ROUND 1'S "ROSSTAT IS BLOCKED" WAS A MISDIAGNOSIS

**Rosstat is fully reachable. It always was.** The round-1 "TLS reset" was not egress filtering, a WAF,
or a geo-block. It was a **trust-store gap**: since 2022 Russian government sites are issued
certificates by Russia's own national CA (Минцифры / "Russian Trusted Root CA"), which is in **no**
standard Mozilla/Debian/curl CA bundle. Every tool in this environment therefore failed cert
verification and reported it as a connection failure.

Root cause chain, all verified:

1. `curl -kv https://rosstat.gov.ru/` shows the server certificate is **genuine Rosstat**:
   - `subject: CN=*.rosstat.gov.ru; O=Федеральная служба государственной статистики; C=RU; ST=77 г.Москва; L=г. Москва; street=ул. Мясницкая 39, строение 1; 1.2.643.100.4=7708234640; OGRN=1047708023483`
   - `issuer: C=RU; O=The Ministry of Digital Development and Communications; CN=Russian Trusted Sub CA`
   - `start date: Dec  8 13:11:54 2025 GMT` / `expire date: Dec  8 13:11:54 2026 GMT`
   - INN 7708234640 and OGRN 1047708023483 are Rosstat's real registration numbers, and Мясницкая 39с1 is Rosstat's real address.
2. The server sends **only the leaf** (chain depth 1, confirmed via a Python TLS probe) — no intermediate. So even installing the root alone is insufficient.
3. The leaf's AIA extension names its own issuer CDP:
   `Authority Information Access: CA Issuers - URI:http://nuc-cdp.digital.gov.ru/cdp/subca_ssl_rsa2024.crt`
   Both CDP hosts (`nuc-cdp.digital.gov.ru`, `nuc-cdp.voskhod.ru`) return a **JS captcha interstitial**, not the cert.
4. The correct intermediate is published by Gosuslugi at
   `https://gu-st.ru/content/lending/russian_trusted_sub_ca_2024_pem.crt` — its
   `Subject Key Identifier: 77:3D:D9:39:AF:42:BD:DC:5B:CA:76:EA:EE:FD:CE:3E:61:29:30:5F`
   **exactly matches** the leaf's `Authority Key Identifier`. (Note: the *older*, widely-cited
   `russian_trusted_sub_ca_pem.crt` has SKI `D1:E1:71:0D:...` and does **not** match — this is the trap.)
5. With root + 2024 sub-CA appended to the bundle, **`verify=0` (full TLS verification passes)**.

**Reusable fix for the whole project (any Russian .gov.ru host):**

```bash
curl -sSL -o root.crt 'https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt'
curl -sSL -o sub24.crt 'https://gu-st.ru/content/lending/russian_trusted_sub_ca_2024_pem.crt'
{ cat /root/.ccr/ca-bundle.crt; echo; cat root.crt; echo; cat sub24.crt; } > ru-bundle.crt
curl -sS --cacert ru-bundle.crt -L 'https://rosstat.gov.ru/statistics/price'
```

All Rosstat results below are therefore **TIER A with genuine TLS verification** — no `-k`, no
`--insecure`, no rendering proxy. `r.jina.ai` was never needed and was not used anywhere in this round.

---

# HALF 1 — OPEN LEADS

## ITEM 1 — ROSSTAT CPI (ИПЦ) — **VERIFIED**

Verification tier: **A** (plain `curl -sL`, HTTP 200, real bytes, `ssl_verify_result=0`)

### 1a. Tool-by-tool table (as requested)

All probes run 2026-08-13 from this container. `verify=` is curl's `%{ssl_verify_result}`
(0 = OK, 20 = unable to get local issuer certificate, 1 = other/unspecified).

| # | Method | Command | Result |
|---|--------|---------|--------|
| a1 | plain curl, root | `curl -sSL https://rosstat.gov.ru/` | `curl: (60) SSL certificate problem: unable to get local issuer certificate` → `000 0 verify=20` |
| a2 | plain curl, price page | `curl -sSL https://rosstat.gov.ru/statistics/price` | `curl: (60) SSL certificate problem` → `000 0 verify=20` |
| b1 | `--insecure` | `curl -kL https://rosstat.gov.ru/` | **`200 827278 verify=20`** ← the tell: content was always there |
| b2 | `--tlsv1.2` | `curl --tlsv1.2 -L https://rosstat.gov.ru/` | `curl: (60)` → `000 0 verify=20` (TLS version irrelevant) |
| b3 | browser User-Agent | `curl -L -A 'Mozilla/5.0 ... Chrome/126' https://rosstat.gov.ru/statistics/price` | `curl: (60)` → `000 0 verify=20` (UA irrelevant) |
| b4 | `--http1.1` | `curl --http1.1 -L https://rosstat.gov.ru/` | `curl: (60)` → `000 0 verify=20` (HTTP version irrelevant) |
| c | r.jina.ai proxy | not required — never used | n/a (TIER A obtained directly) |
| d | www variant | `curl -sSL https://www.rosstat.gov.ru/` | `curl: (60)` → `000 0 verify=20` |
| e1 | `showdata.gks.ru` | `curl -sSL https://showdata.gks.ru/` | `curl: (60)` → `000 0 verify=20`; **still `000 verify=20` even with the RU bundle** — different/unknown issuer. UNREACHABLE. |
| e2 | `eng.rosstat.gov.ru` | `curl -sSL https://eng.rosstat.gov.ru/` | `000 verify=20` plain; **`000 verify=1` with RU bundle** — UNREACHABLE (separate cert problem, not fixed by the national CA). |
| e3 | `gks.ru` | `curl -sSL https://gks.ru/` | `curl: (35) Recv failure: Connection reset by peer` → `000 0`. **Genuine TCP/TLS reset**, distinct from the cert failure. UNREACHABLE. |
| e4 | `fedstat.ru` | `curl -sSL https://fedstat.ru/` | `403 80 verify=0` — TLS fine (public CA), **application-level 403**, i.e. a real WAF/bot block. UNREACHABLE. |
| **f1** | **RU bundle, root** | `curl --cacert ru-bundle.crt -L https://rosstat.gov.ru/` | **`HTTP 200 bytes 820014 verify=0`** ✅ |
| **f2** | **RU bundle, price page** | `curl --cacert ru-bundle.crt -L https://rosstat.gov.ru/statistics/price` | **`HTTP 200 bytes 880537 verify=0`** ✅ |
| f3 | RU bundle, storage PDF | `curl --cacert ru-bundle.crt -L https://rosstat.gov.ru/storage/mediabank/Opredeleniya_IPC.pdf` | **`HTTP 200 bytes 316641 ct=application/pdf`** ✅ |
| f4 | RU bundle, XLSX | `.../storage/mediabank/ipc_mes_07-2026.xlsx` | **`HTTP 200 bytes 37871 ct=...spreadsheetml.sheet`** ✅ |

Summary: **rosstat.gov.ru = fully open (TIER A). gks.ru / fedstat.ru / showdata.gks.ru / eng.rosstat.gov.ru = genuinely unreachable**, each for a *different* reason (TCP reset / WAF 403 / cert mismatch).
Note `rosstat.gov.ru/storage/...` intermittently returns `curl: (35) Recv failure: Connection reset by peer`
under rapid sequential requests — this is **rate limiting**; a 6-second backoff and up to 4 retries
succeeded every time.

### 1b. The CPI node — VERIFIED

URL (product page): `https://rosstat.gov.ru/statistics/price`
URL (definitions/periodicity PDF): `https://rosstat.gov.ru/storage/mediabank/Opredeleniya_IPC.pdf`

HTTP check:
```
curl -sS --cacert ru-bundle.crt -o /dev/null -w '%{http_code} %{size_download} verify=%{ssl_verify_result}\n' -L 'https://rosstat.gov.ru/statistics/price'
200 880537 verify=0
curl -sS --cacert ru-bundle.crt -o Opredeleniya_IPC.pdf -w '%{http_code} %{size_download} %{content_type}\n' -L 'https://rosstat.gov.ru/storage/mediabank/Opredeleniya_IPC.pdf'
200 316641 application/pdf
```
(`file` → `PDF document, version 1.5, 2 page(s)`; text extracted with `pdftotext -layout`.)

Title (Russian, as published): **«Индекс потребительских цен, Инфляция»** (PDF heading);
section page title **«Цены, инфляция» → «Потребительские цены» → «Индексы потребительских цен»**
English gloss: "Consumer Price Index, Inflation"; section "Prices, inflation → Consumer prices → Consumer price indices".

Publisher: Федеральная служба государственной статистики (Росстат) / Federal State Statistics Service.

Periodicity (VERBATIM, from `Opredeleniya_IPC.pdf`):
> «Периодичность    Недельная, Месячная, Квартальная, Годовая»

> «Сроки обновления на сайте
> Недельная – еженедельно по средам
> Месячная - на 6-10-й рабочий день месяца, следующего за отчетным
> Квартальная - на 6-10-й рабочий день месяца, следующего за отчетным кварталом
> Годовая - на 6-10-й рабочий день месяца, следующего за отчетным годом»

Gloss: "Periodicity: Weekly, Monthly, Quarterly, Annual. Site update deadlines: Weekly – every Wednesday;
Monthly – on the 6th–10th working day of the month following the reporting month; Quarterly – on the
6th–10th working day of the month following the reporting quarter; Annual – on the 6th–10th working day
of the month following the reporting year."

Further verbatim (same PDF) — **this is the key sentence for the whole corpus**:
> «Индекс потребительских цен (ИПЦ) является одним из важнейших показателей, характеризующих
> фактически сложившийся уровень инфляции, и используется для целей государственной финансовой
> и денежно-кредитной политики, анализа и прогноза ценовых процессов в экономике, изучения динамики
> социально-экономических явлений, **пересмотра минимальных социальных гарантий**, решения правовых
> споров, а также при пересчете макроэкономических показателей из текущих цен в сопоставимые цены.»

Gloss: "The CPI is one of the most important indicators characterising the actual level of inflation, and is
used for the purposes of state financial and monetary policy, analysis and forecasting of price processes in
the economy, study of the dynamics of socio-economic phenomena, **revision of minimum social guarantees**,
resolution of legal disputes, and also for recalculating macroeconomic indicators from current to comparable prices."

> «Источник — Регистрация цен непосредственно с прилавков организаций; данные онлайн–агрегаторов
> (авиа и железнодорожных по продаже билетов, туроператоров и других) и маркетплейсов.»

Gloss: "Source — Price registration directly from organisations' counters; data from online aggregators
(air and rail ticket sales, tour operators and others) and marketplaces."

**Note on tense/direction:** the "используется для… пересмотра минимальных социальных гарантий" sentence is
Rosstat describing *downstream* uses of its own output. It is **NOT** a dependency edge in this corpus's
direction (it is the *source* naming its consumers, not a dependent naming its input). Flagged as
suggestive-but-not-edge-qualifying. See Item 7 for what the benefit-indexation chain **actually** depends on.

Live data files confirmed on the page (all dated **12.08.2026**, i.e. the day before this research):
- `https://rosstat.gov.ru/storage/mediabank/Nedel_ipc.xlsx` — «Еженедельные индексы потребительских цен (тарифов) на отдельные товары и услуги по Российской Федерации», 164.25 Кб, 12.08.2026
- `https://rosstat.gov.ru/storage/mediabank/ipc_mes_07-2026.xlsx` — «Индексы потребительских цен на товары и услуги по Российской Федерации, месяцы (с 1991 г.)», 36.98 Кб, 12.08.2026 (HTTP 200, 37871 bytes, valid xlsx)
- `https://rosstat.gov.ru/storage/mediabank/ipc_RF_fo_sub_07-2026.xlsx` — by federal district and subject (с 2022 г.), 419.63 Кб, 12.08.2026
- `https://rosstat.gov.ru/storage/mediabank/ipc_kv2_2005-2026.xlsx` — quarterly

Proposed node? **YES** — `ru-rosstat-cpi`. Recurrently published (weekly/monthly/quarterly/annual),
government-authored, with an explicit verbatim periodicity statement. This is the node round 1 could not
mint and for which `ru-cbr-monetary-policy-guidelines` was standing in. **The stand-in is no longer necessary.**

### 1c. The CPI standing methodology instrument — VERIFIED

Verification tier: **A**
URL: `https://rosstat.gov.ru/storage/mediabank/Prikaz_915_15122021.pdf`
(listed under `https://rosstat.gov.ru/statistics/price/methodology`, HTTP 200 804357)

HTTP check:
```
curl --cacert ru-bundle.crt -o Prikaz_915_15122021.pdf -w '%{http_code} %{size_download}' .../Prikaz_915_15122021.pdf
200 1199801
```
(first attempt returned `curl: (35) Recv failure: Connection reset by peer` — rate limit; succeeded on retry after 6s backoff)

Title: **Приказ Росстата от 15 декабря 2021 г. № 915 «Об утверждении Официальной статистической методологии
наблюдения за потребительскими ценами на товары и услуги и расчета индексов потребительских цен»**
Gloss: "Rosstat Order of 15 December 2021 No. 915 'On approval of the Official Statistical Methodology for
observing consumer prices for goods and services and calculating consumer price indices'."

Verbatim (enabling clause — establishes it as a standing instrument):
> «В соответствии с подпунктом 5.2 Положения о Федеральной службе государственной статистики,
> утвержденного постановлением Правительства Российской Федерации от 2 июня 2008 г. № 420, п р и к а з ы в а ю:
> 1. Утвердить Официальную статистическую методологию наблюдения за потребительскими ценами на товары
> и услуги и расчета индексов потребительских цен (далее – Методология) (приложение № 1).»

Verbatim (periodicity of observation, §5.2 «Периодичность и масштаб наблюдения», п.15):
> «Регистрация цен и тарифов осуществляется: по полному перечню товаров (услуг)-представителей,
> утвержденному соответствующим приказом Росстата, для расчета индекса потребительских цен – **ежемесячно**
> по состоянию на конец месяца (по установленному графику)… по сокращенному перечню товаров
> (услуг)-представителей, определенному соответствующим приказом Росстата – **еженедельно** по состоянию на пятницу.»

Verbatim (the formula):
> «Расчет ИПЦ к предыдущему месяцу осуществляется в соответствии с модифицированной формулой Ласпейреса»
Gloss: "The CPI relative to the previous month is calculated in accordance with the modified Laspeyres formula."

Verbatim (the weights source — an internal dependency):
> «Для формирования Набора анализируются итоги **выборочного обследования бюджетов домашних хозяйств**,
> проводимого на территории всех субъектов Российской Федерации, в группировке Классификатора
> индивидуального потребления домашних хозяйств по целям (далее – КИПЦ-ДХ).»
> «веса – мера относительной значимости товаров (услуг) в рамках сводного индекса цен, определяемая
> на основе потребительских расходов домашних хозяйств»

Proposed node? **YES** — `ru-rosstat-cpi-methodology-915` (standing instrument defining a method; qualifies
under the "standing statutes/instruments defining a method" rule).

Proposed EDGE: `ru-rosstat-cpi` -> `ru-rosstat-cpi-methodology-915`, `governed_by` /
`ru-rosstat-cpi-methodology-915` -> `ru-rosstat-household-budget-survey`, `uses_data_from`, citation:
«Для формирования Набора анализируются итоги выборочного обследования бюджетов домашних хозяйств…»
(NB: the household budget survey itself was not separately verified this round — flagged as a `no-node-yet` drop.)

---

## ITEM 2 — ПОСТАНОВЛЕНИЕ ПРАВИТЕЛЬСТВА РФ N 670: OPERATIVE FORMULA — **VERIFIED**

Verification tier: **A** — and, decisively, **on minfin.gov.ru**, a government host. Round 1's paywall problem
is fully resolved. It was **not** necessary to use ConsultantPlus, Garant, or docs.cntd.ru.

**How it was found (worth recording):** the consolidated methodology text is not published as a standalone
page. It is bundled *inside the ZIP archive* that Minfin publishes as the equalization input data (Item 5).
`Dotatsii_na_vyravnivanie.zip` contains 85 per-region `.xls` files **plus**
`Методика распределения дотаций на выравнивание.pdf` (866,913 bytes).

URL (container): `https://minfin.gov.ru/common/upload/library/2025/06/main/Dotatsii_na_vyravnivanie.zip`

HTTP check:
```
curl -sS --cacert ru-bundle.crt -o dotatsii.zip -w '%{http_code} %{size_download} %{content_type}\n' -L 'https://minfin.gov.ru/common/upload/library/2025/06/main/Dotatsii_na_vyravnivanie.zip'
200 1963545 application/zip
```
(`file` → `Zip archive data`; PDF extracted with python `zipfile`, text with `pdftotext -layout`, 192,076 chars.)

Title: **Постановление Правительства Российской Федерации от 22 ноября 2004 г. № 670
«О распределении дотаций на выравнивание бюджетной обеспеченности субъектов Российской Федерации»**,
+ приложенная **«МЕТОДИКА РАСПРЕДЕЛЕНИЯ ДОТАЦИЙ НА ВЫРАВНИВАНИЕ БЮДЖЕТНОЙ ОБЕСПЕЧЕННОСТИ СУБЪЕКТОВ РОССИЙСКОЙ ФЕДЕРАЦИИ»**

Publisher of this text: Министерство финансов Российской Федерации (hosting the consolidated methodology).

### The operative text — VERBATIM

Enabling clause (this is an **edge**, in the dependent document's own voice):
> «**В целях реализации статьи 131 Бюджетного кодекса Российской Федерации** Правительство Российской
> Федерации постановляет: 1. Утвердить прилагаемую методику распределения дотаций на выравнивание
> бюджетной обеспеченности субъектов Российской Федерации.»

Gloss: "**For the purpose of implementing Article 131 of the Budget Code of the Russian Federation**, the
Government of the Russian Federation resolves: 1. To approve the attached methodology for distributing
equalization dotations…"

**The Rosstat/FNS data-supply clause — the single strongest dependency statement in this branch:**
> «2. **Федеральной службе государственной статистики и Федеральной налоговой службе** обеспечивать
> **ежегодно, до 1 августа**, представление в Министерство финансов Российской Федерации информации,
> необходимой для осуществления расчетов в соответствии с методикой, утвержденной настоящим Постановлением.»

Gloss: "2. **The Federal State Statistics Service (Rosstat) and the Federal Tax Service** shall ensure the
**annual submission, by 1 August**, to the Ministry of Finance of the Russian Federation of the information
necessary for performing the calculations in accordance with the methodology approved by this Resolution."

**The core formula (§2):**
> «2. Уровень расчетной бюджетной обеспеченности субъектов Российской Федерации до распределения дотаций
> определяется по формуле:
>
>                              **БОi = ИНПi / ИБРi**,
>
> где:
> БОi - уровень расчетной бюджетной обеспеченности субъекта Российской Федерации до распределения дотаций;
> ИНПi - индекс налогового потенциала субъекта Российской Федерации;
> ИБРi - индекс бюджетных расходов субъекта Российской Федерации.»

**«налоговый потенциал» / индекс налогового потенциала — definition (§3), verbatim:**
> «3. Индекс налогового потенциала - относительная (по сравнению со средним по Российской Федерации уровнем)
> оценка налоговых доходов консолидированного бюджета субъекта Российской Федерации, определяемая с учетом
> уровня развития и структуры налоговой базы субъекта Российской Федерации.
> Индекс налогового потенциала применяется для сопоставления уровней расчетной бюджетной обеспеченности
> субъектов Российской Федерации и не является прогнозируемой оценкой налоговых доходов субъектов
> Российской Федерации в расчете на душу населения или в абсолютном размере.
> Индекс налогового потенциала рассчитывается согласно Приложению № 1.»

Приложение № 1 «РАСЧЕТ ИНДЕКСА НАЛОГОВОГО ПОТЕНЦИАЛА», verbatim:
> «1. Индекс налогового потенциала субъекта Российской Федерации рассчитывается по формуле:
>     **ИНП i = (НП i /Н i )/(SUM НП i /SUM Н i )**,
> где НПi - налоговый потенциал субъекта Российской Федерации; …
> 2. Налоговый потенциал субъекта Российской Федерации рассчитывается по формуле:
>     **НП i = НП iНП + НП iНДФЛ + НП iНИО + НПiАкц + НПiНДПИ + НПiпроч - НД iИП**,
> где: НП iНП - налоговый потенциал субъекта Российской Федерации по налогу на прибыль организаций;
> НП iНДФЛ - … по налогу на доходы физических лиц; НП iНИО - … по налогу на имущество организаций…»

**«индекс бюджетных расходов» — definition (§4), verbatim:**
> «4. Индекс бюджетных расходов - относительная (по сравнению со средним по Российской Федерации уровнем)
> оценка расходов консолидированного бюджета субъекта Российской Федерации по предоставлению одинакового
> объема бюджетных услуг в расчете на душу населения, определяемая с учетом объективных региональных
> факторов и условий. … Индекс бюджетных расходов рассчитывается согласно Приложению № 2.»

Приложение № 2 «РАСЧЕТ ИНДЕКСА БЮДЖЕТНЫХ РАСХОДОВ», verbatim:
> «1. Индекс бюджетных расходов субъекта Российской Федерации рассчитывается по формуле:
>     **ИБРi = У ЗП × К iЗП + У ЖКУ × К iЖКУ + У Ц × К iЦ + У СН × К iСН**,
> где: УЗП - расчетный удельный вес расходов на оплату труда … принимается равным **0,5**;
> к iЗП - коэффициент дифференциации заработной платы …;
> УЖКУ - … жилищно-коммунальное хозяйство … принимается равным **0,10**;
> Уц - расчетный удельный вес прочих расходов … принимается равным **0,35**;
> к iц - **коэффициент уровня цен** в субъекте Российской Федерации;
> УСН - … уровень социальной нагрузки … принимается равным **0,05**.»

**The CPI-family linkage (§6 of Приложение № 2) — verbatim, this is the edge to Rosstat price statistics:**
> «6. Коэффициент уровня цен в субъекте Российской Федерации рассчитывается по формуле:
>     к iц = (Б i / Б) × (1 + к iтд × А i / А) × к iр / к ц,
> где:
> **Бi - стоимость фиксированного набора потребительских товаров и услуг в субъекте Российской Федерации;**
> **Б - расчетная стоимость фиксированного набора потребительских товаров и услуг в среднем по субъектам Российской Федерации;**»

Gloss: "Бi – the cost of the **fixed basket of consumer goods and services** in the subject of the Russian
Federation; Б – the calculated cost of the fixed basket of consumer goods and services averaged across subjects."

**The named-provider table** — «ПЕРЕЧЕНЬ ПОКАЗАТЕЛЕЙ ДЛЯ ОПРЕДЕЛЕНИЯ РАСЧЕТНОГО ОБЪЕМА РАСХОДНЫХ ОБЯЗАТЕЛЬСТВ
СУБЪЕКТА РОССИЙСКОЙ ФЕДЕРАЦИИ И МУНИЦИПАЛЬНЫХ ОБРАЗОВАНИЙ» (Приложение № 1 к Правилам). Column header, verbatim:
> «Наименование показателя (единица измерения) | **Федеральный орган исполнительной власти, представляющий
> в Минфин России информацию о значениях показателей**»

Rows (verbatim, provider column value shown in bold):
> «1. Численность постоянного населения субъекта Российской Федерации на конец года (тыс. человек) — **Росстат**»
> «37. Стоимость фиксированного набора потребительских товаров и услуг по субъектам Российской Федерации (рублей) — **Росстат**»
> «38. Величина прожиточного минимума по субъектам Российской Федерации (рублей) — **Росстат**»
> «39. Доля населения с денежными доходами ниже границы бедности в общей численности населения в субъекте Российской Федерации (процентов) — **Росстат**»
> «41. Среднемесячная начисленная заработная плата наемных работников в организациях, у индивидуальных предпринимателей и физических лиц … (рублей) — **Росстат**»
> «40. Площадь территории субъекта Российской Федерации … (тыс. кв. километров) — **Росреестр**»

Also verbatim (a further Rosstat instrument dependency, footnote to Приложение № 2):
> «<*> Показатель формируется на основании **формы федерального статистического наблюдения, утверждаемой
> Федеральной службой государственной статистики**.»

Proposed node? **YES** — this confirms and upgrades the existing `ru-resolution-670-equalization-methodology`
from "operative text unverified/paywalled" to **fully verified TIER A on a government host**.

Proposed EDGEs (all with the dependent document's own text naming the input):
- `ru-resolution-670-equalization-methodology` -> `ru-budget-code-art131`, `implements`/`cites` —
  «В целях реализации статьи 131 Бюджетного кодекса Российской Федерации…»
- `ru-resolution-670-equalization-methodology` -> `ru-rosstat-cpi` (price statistics family), `uses_data_from` —
  «Бi - стоимость фиксированного набора потребительских товаров и услуг в субъекте Российской Федерации»
  + «37. Стоимость фиксированного набора потребительских товаров и услуг по субъектам Российской Федерации (рублей) — Росстат»
  *(edge target confirmed live on the Rosstat price page: «ЕМИСС / 1.29.6 / Стоимость фиксированного набора
  потребительских товаров и услуг для межрегиональных сопоставлений покупательной способности населения» and
  «Витрина данных / Стоимость фиксированного набора потребительских товаров и услуг» — both listed at
  `https://rosstat.gov.ru/statistics/price`.)*
- `ru-resolution-670-equalization-methodology` -> `ru-rosstat` (agency, data supply), `uses_data_from` —
  «Федеральной службе государственной статистики и Федеральной налоговой службе обеспечивать ежегодно,
  до 1 августа, представление в Министерство финансов Российской Федерации информации…»
  **Tense note:** this clause is *imperative/directive* («обеспечивать» — shall ensure), addressed by the
  Government to Rosstat and FNS. It is a standing obligation, not a past-tense acknowledgement. It is
  nevertheless the dependent instrument's own text naming its input agencies, so it qualifies.
- `ru-resolution-670-equalization-methodology` -> `ru-fns` (Федеральная налоговая служба), `uses_data_from` — same citation.

**Caveat, recorded honestly:** this consolidated text was published by Minfin on **10.06.2025** and therefore
reflects amendments **up to and including Постановление № 1792 от 16.12.2024**. It does **not** incorporate
Постановление № 2038 от 15.12.2025 (see below). Amendment footnotes visible in the text confirm the lineage,
e.g. «<*> Сноска исключена. - Постановление Правительства РФ от 02.11.2009 № 885.» and
«<*> Сноска исключена. - Постановление Правительства РФ от 27.12.2019 № 1903.» and
«(п. 59 введен Постановлением Правительства РФ от 29.12.2022 № 2513)».

### ITEM 2b — ПОСТАНОВЛЕНИЕ N 2038 ОТ 15.12.2025 — **VERIFIED on pravo.gov.ru (TIER A, not C)**

Verification tier: **A** — `publication.pravo.gov.ru` is the **official** government publication portal.
Note: it serves over **HTTP** (`https://pravo.gov.ru/` fails; `http://publication.pravo.gov.ru/` returns 200).

URL (record): `http://publication.pravo.gov.ru/document/0001202512160022`
URL (official PDF): `http://publication.pravo.gov.ru/file/pdf?eoNumber=0001202512160022`

HTTP check:
```
curl -sS -o /dev/null -w 'HTTP %{http_code} %{size_download} verify=%{ssl_verify_result}\n' -L 'http://publication.pravo.gov.ru/'
200 27939 verify=0
# located via date-filtered listing:
http://publication.pravo.gov.ru/documents/block/government?pageSize=100&index=1&DocumentDateFrom=15.12.2025&DocumentDateTo=17.12.2025  -> 200 162795
curl -o p2038.pdf -w 'HTTP %{http_code} %{size_download}\n' 'http://publication.pravo.gov.ru/file/pdf?eoNumber=0001202512160022'
200 2132570
```
`file` → `PDF document, version 1.5, 10 page(s)`. **The PDF is a scan with no text layer** (`pdftotext` yielded
10 bytes), so it was OCR'd: `pdftoppm -r 200 -gray -png` + `tesseract -l rus --psm 6`.
Russian tessdata was not installed in this image; obtained from
`https://raw.githubusercontent.com/tesseract-ocr/tessdata_fast/main/rus.traineddata` (HTTP 200, 3,861,738 bytes).
*(Note: the `github.com/.../raw/main/...` form returns 403 through this proxy; `raw.githubusercontent.com` works.)*
**All quotes below are OCR output and should be treated as ~99% but not byte-exact.**

Title: **Постановление Правительства Российской Федерации от 15.12.2025 № 2038
«О внесении изменений в некоторые акты Правительства Российской Федерации»**

Verbatim (OCR) — confirms it amends 670 and gives the **full official amendment history**:
> «1. Утвердить прилагаемые изменения, которые вносятся в методику распределения дотаций на выравнивание
> бюджетной обеспеченности субъектов Российской Федерации, утвержденную постановлением Правительства
> Российской Федерации от 22 ноября 2004 г. № 670 "О распределении дотаций на выравнивание бюджетной
> обеспеченности субъектов Российской Федерации" (Собрание законодательства Российской Федерации,
> 2004, № 48, ст. 4797; 2006, № 39, ст. 4088; 2007, № 46, ст. 5584; 2009, № 45, ст. 5358; 2010, № 49, ст. 6514;
> 2012, № 1, ст. 103; 2013, № 50, ст. 6597; 2014, № 50, ст. 7082; 2015, № 18, ст. 2703; 2017, № 1, ст. 223;
> 2018, № 4, ст. 622; 2019, № 1, ст. 75; 2020, № 1, ст. 89; 2021, № 1, ст. 128; 2022, № 1, ст. 144;
> 2023, № 1, ст. 313; 2024, № 1, ст. 200; № 52, ст. 8333).»

**Verbatim (OCR) — an inflation-indexation floor. This is a live CPI/inflation edge:**
> «2. Установить, что: а) объем дотации на выравнивание бюджетной обеспеченности субъекта Российской
> Федерации на 2026 год не может быть менее утвержденного на 2025 год объема такой дотации бюджетам
> субъектов Российской Федерации, **увеличенного на прогнозируемый уровень инфляции на конец 2026 года,
> учтенный при формировании федерального бюджета на 2026 год и плановый период 2027 и 2028 годов**,
> для субъектов Российской Федерации, в которых реализуется программа комплексного восстановления
> и развития пострадавших территорий;»

Gloss: "…the volume of the equalization dotation for 2026 may not be less than the volume approved for 2025,
**increased by the forecast level of inflation at end-2026 as taken into account in the formation of the federal
budget for 2026 and the planning period 2027 and 2028**…"

> «г) прирост объема дотации на выравнивание бюджетной обеспеченности субъекта Российской Федерации
> в 2026 году не может превышать 10 процентов по отношению к 2025 году;»

> «4. Пункт 3 постановления Правительства Российской Федерации от 16 декабря 2024 г. № 1792
> "О внесении изменений в постановление Правительства Российской Федерации от 22 ноября 2004 г. № 670"
> (Собрание законодательства Российской Федерации, 2024, № 52, ст. 8333) … признать утратившим силу.»

Proposed node? Amending instrument — better modelled as an **amendment/edge** than a standalone node.

Proposed EDGE: `ru-resolution-2038-2025` -> `ru-resolution-670-equalization-methodology`, `amends`, citation above.
Proposed EDGE: `ru-resolution-2038-2025` -> `ru-federal-budget-law-2026`, `uses_data_from` —
«…увеличенного на прогнозируемый уровень инфляции на конец 2026 года, **учтенный при формировании
федерального бюджета на 2026 год и плановый период 2027 и 2028 годов**». The referenced inflation figure is
**verbatim recoverable** from the budget law itself (Item 4): «уровня инфляции, не превышающего 4,0 процента
(декабрь 2026 года к декабрю 2025 года)». This closes a complete, fully-evidenced chain.

---

## ITEM 3 — BUDGET CODE ART. 131 ON A GOVERNMENT HOST — **PARTIAL**

Verification tier: **A for the host and the document; the specific article text was NOT retrievable.**

**Good news:** the official consolidated Budget Code **is** on a government host and **is** reachable.
`pravo.gov.ru`'s ИПС «Законодательство России» serves it.

URL (redaction list): `http://pravo.gov.ru/proxy/ips/?docbody=&nd=102054721`
URL (consolidated text): `http://pravo.gov.ru/proxy/ips/?doc_itself=&nd=102054721&rdk=249`

HTTP check:
```
https://pravo.gov.ru/                                        -> 000 0 verify=1        (HTTPS fails)
http://pravo.gov.ru/                                         -> 200 89237 verify=0    (HTTP works)
http://pravo.gov.ru/proxy/ips/?docbody=&nd=102054721         -> 200 67186
http://pravo.gov.ru/proxy/ips/?doc_itself=&nd=102054721&rdk=249 -> 200 673972
```
Encoding is **windows-1251** (must decode as cp1251, not utf-8 — otherwise it looks like mojibake and can be
mistaken for a failed fetch).

Confirmed retrieved, verbatim:
> «Бюджетный кодекс Российской Федерации … РОССИЙСКАЯ ФЕДЕРАЦИЯ … Принят Государственной Думой 17 июля 1998 года
> Одобрен Советом Федерации 17 июля 1998 года»

The redaction list is fully populated and current — latest entries verbatim:
> «240 - от 28.11.2025 № 431-ФЗ (изм.) 241 - от 28.11.2025 № 432-ФЗ (изм.) … 247 - от 28.12.2025 № 502-ФЗ (изм.)
> 248 - от 31.03.2026 № 19-П (изм.) 249 - от 25.05.2026 № 143-ФЗ (изм.)»

**Why it is only PARTIAL:** the ИПС viewer **hard-truncates the response body at exactly 673,972 bytes**, which
ends mid-sentence inside **Article 63**. Article 131 is beyond the cut. Every pagination parameter I could
think of is silently ignored — the response is byte-identical every time:

| param tried | result |
|---|---|
| `&page=1..8` | `673972` bytes each, identical, last article = 63 |
| `&start=2` | `673972`, identical |
| `&razdel=2` | `673972`, identical |
| `&pos=2` | `673972`, identical |
| `&nh=2` | `673972`, identical |
| `&frag=2` | `673972`, identical |
| `&part=2` | `673972`, identical |
| `&sect=2` | `673972`, identical |
| `&page=2&nh=1` | `673972`, identical |

Other routes tried and their exact results:
- `http://actual.pravo.gov.ru/` → **200 9764**, but it is a JS SPA whose backing API is
  `http://actual.pravo.gov.ru:8000/api/ebpi/` (read from `config.js`). **Port 8000 is not reachable through
  this environment's proxy** — every endpoint (`/`, `/codex`, `/codexes`, `/documents`, `/search`) hung until
  the 120s command timeout. UNREACHABLE.
- `http://ips.pravo.gov.ru/` → 200 2380 (stub/redirect page only).
- `https://duma.gov.ru/` → `000 verify=1` — **still fails even with the Russian national CA bundle** (different,
  unidentified issuer). UNREACHABLE.
- `https://sozd.duma.gov.ru/` → `000 verify=1`. UNREACHABLE.
- `https://government.ru/` → `000 verify=1`. UNREACHABLE.
- `https://docs.cntd.ru/` → `000 verify=1`. UNREACHABLE.
- Sequential doc IDs `nd=102054722/3/4` are **different documents** (Налоговый кодекс ч.1, etc.), not
  continuation parts of the Budget Code — checked and ruled out.
- Amending law **432-ФЗ от 28.11.2025 «О внесении изменений в Бюджетный кодекс Российской Федерации…»**
  retrieved TIER A (`http://publication.pravo.gov.ru/file/pdf?eoNumber=0001202511280094`, HTTP 200,
  2,313,919 bytes, 46 pages, OCR'd) — but it contains **no** amendment to Article 131, so it does not restate it.

**What IS now verified TIER A about Article 131**, from other government-hosted documents' own text:
- Resolution 670 (minfin.gov.ru): «**В целях реализации статьи 131 Бюджетного кодекса Российской Федерации**…»
  — TIER A confirmation that Art. 131 is the enabling provision for the equalization methodology.
- Federal budget law 426-ФЗ (pravo.gov.ru): cites the Budget Code repeatedly, e.g.
  «В соответствии с пунктом 2 статьи 184-1 Бюджетного кодекса Российской Федерации…»

Recommendation: keep `ru-budget-code-art131` as a node, upgrade its *existence and role* evidence to TIER A
via the two citations above, but **leave the article's own operative text flagged TIER C** (round-1 mirror)
until a non-truncating government route is found. Do **not** claim TIER A for the article text.

---

# HALF 2 — BREADTH

## ITEM 4 — ФЕДЕРАЛЬНЫЙ ЗАКОН О ФЕДЕРАЛЬНОМ БЮДЖЕТЕ НА 2026 ГОД — **VERIFIED**

Verification tier: **A** (official publication portal)

URL (record): `http://publication.pravo.gov.ru/document/0001202511280088`
URL (official PDF): `http://publication.pravo.gov.ru/file/pdf?eoNumber=0001202511280088`

HTTP check:
```
http://publication.pravo.gov.ru/documents/block/president?pageSize=100&index=1&DocumentDateFrom=28.11.2025&DocumentDateTo=28.11.2025 -> 200 91699
http://publication.pravo.gov.ru/document/0001202511280088   -> 200 20775
curl -r 0-200 ... 'http://publication.pravo.gov.ru/file/pdf?eoNumber=0001202511280088' -> 200 (full length 195811243)
curl -o fz426.pdf ... -> HTTP 200 bytes 195811243 time 14.67s
file fz426.pdf -> PDF document, version 1.3, 5381 page(s)
```
Note: `HEAD` returns **405** on this portal; use a range request to size a file.
**The PDF is image-only** (`pdftotext -f 1 -l 30` → 30 bytes). OCR'd via `pdftoppm -r 200 -gray -png` +
`tesseract -l rus --psm 6`. **Quotes below are OCR output — ~99%, not byte-exact.** (Visible OCR artefacts
noted inline, e.g. "2085" for 2025, "Статья 19" for "Статья 10".)

Title: **Федеральный закон от 28.11.2025 № 426-ФЗ «О федеральном бюджете на 2026 год и на плановый период
2027 и 2028 годов»**
Gloss: "Federal Law of 28.11.2025 No. 426-FZ 'On the federal budget for 2026 and for the planning period 2027 and 2028'."

Publisher: Российская Федерация / published on the Official Internet Portal of Legal Information.
Публикация: «Номер опубликования: 0001202511280088. Дата опубликования: 28.11.2025».

Periodicity: **annual** (a new federal budget law each year, three-year rolling horizon). Established by the
title pattern itself and by Art. 1's construction; no single verbatim "periodicity" sentence exists in the law.
Flagged: periodicity is **inferred from the instrument type and title series**, not quoted.

Verbatim (OCR) — Article 1, containing the **inflation forecast** that Resolution 2038 points back to:
> «Статья 1. Основные характеристики федерального бюджета на 2026 год и на плановый период 2027 и 2028 годов
> 1. Утвердить основные характеристики федерального бюджета на 2026 год, определенные исходя из
> прогнозируемого объема валового внутреннего продукта в размере 235 067 млрд. рублей и **уровня инфляции,
> не превышающего 4,0 процента (декабрь 2026 года к декабрю 2025 года)**:
> 1) прогнозируемый общий объем доходов федерального бюджета в сумме 40 283 269 170,5 тыс. рублей;
> 2) общий объем расходов федерального бюджета в сумме 44 069 704 164,5 тыс. рублей; …
> 5) дефицит федерального бюджета в сумме 3 786 434 994,0 тыс. рублей.»

Verbatim (OCR) — **the Budget Code citation in the law's own text (edge)**:
> «Статья 2. Нормативы распределения доходов между бюджетами бюджетной системы Российской Федерации на
> 2026 год и на плановый период 2027 и 2028 годов
> 1. **В соответствии с пунктом 2 статьи 184-1 Бюджетного кодекса Российской Федерации** утвердить нормативы
> распределения доходов между бюджетами бюджетной системы Российской Федерации на 2026 год и на плановый
> период 2027 и 2028 годов согласно приложению 1 к настоящему Федеральному закону.»

Additional Budget Code citations in the law's own text (all OCR, all verbatim):
> «Доходы от операций по управлению остатками средств на едином казначейском счете, **в соответствии со
> статьей 242-3 Бюджетного кодекса Российской Федерации** распределенные в федеральный бюджет…»
> «Установить, что **в соответствии со статьей 242-7 Бюджетного кодекса Российской Федерации** казначейскому
> сопровождению подлежат следующие целевые средства…»
> «…бюджетные инвестиции юридическим лицам, предоставляемые **в соответствии со статьей 80 Бюджетного
> кодекса Российской Федерации**…»

Verbatim (OCR) — **the выравнивание article** (OCR renders the number as "Статья 19"; from the sequence
Статья 9 → … → Статья 11 it is unambiguously **Статья 10**):
> «Статья 10. Межбюджетные трансферты бюджетам субъектов Российской Федерации и бюджету города Байконура
> 1. Утвердить бюджетные ассигнования на предоставление межбюджетных трансфертов бюджетам субъектов
> Российской Федерации и бюджету города Байконура на 2026 год и на плановый период 2027 и 2028 годов
> **согласно приложению 28** к настоящему Федеральному закону.
> 2. Утвердить перечень субсидий бюджетам субъектов Российской Федерации… **согласно приложению 29**…
> 3. Утвердить распределение межбюджетных трансфертов бюджетам субъектов Российской Федерации и бюджету
> города Байконура на 2026 год и на плановый период 2027 и 2028 годов **согласно приложению 30**…
> 4. **Дотации на выравнивание бюджетной обеспеченности субъектов Российской Федерации** рассчитываются
> раздельно для бюджетов Архангельской области (без автономного округа), Ненецкого автономного округа,
> Тюменской области (без автономных округов), Ханты-Мансийского автономного округа - Югры,
> Ямало-Ненецкого автономного округа.»

Proposed node? **YES** — `ru-federal-budget-law-2026`. Recurrently published (annual), government-authored,
TIER A.

Proposed EDGEs:
- `ru-federal-budget-law-2026` -> `ru-budget-code-art131` / `ru-budget-code`, `cites` —
  «В соответствии с пунктом 2 статьи 184-1 Бюджетного кодекса Российской Федерации…» *(note: the law cites
  arts. 184-1, 242-3, 242-7 and 80 — **not** art. 131 explicitly in the articles I OCR'd. The edge to the
  Budget Code as an instrument is solid; an edge specifically to **art. 131** is **NOT** evidenced by the
  law's own text and should not be asserted.)*
- `ru-resolution-2038-2025` -> `ru-federal-budget-law-2026`, `uses_data_from` (inflation forecast) — see Item 2b.

**PARTIAL — the total дотации amount was NOT extracted.** It sits in Приложения 28/30, somewhere within a
5,381-page image-only PDF with no text layer and no in-document index. Locating it would require OCR'ing a
large fraction of ~196 MB of scans. Recorded honestly as not retrieved. The **per-region** distribution is
available TIER A from Minfin (round 1's `ru-minfin-2026-equalization`, plus Item 5 below).

---

## ITEM 5 — MINFIN «ИСХОДНЫЕ ДАННЫЕ ДЛЯ ПРОВЕДЕНИЯ РАСЧЕТОВ РАСПРЕДЕЛЕНИЯ ДОТАЦИЙ» — **VERIFIED**

Verification tier: **A**

This resolves round 1's `no-node-yet` drop. It exists, it is published, and it is the literal input to the
equalization calculation.

URL (record page):
`https://minfin.gov.ru/ru/perfomance/regions/mb/mb2026_2028?id_38=312807-iskhodnye_dannye_dlya_provedeniya_raschetov_raspredeleniya_dotatsii_na_vyravnivanie_byudzhetnoi_obespechennosti_subektov_rossiiskoi_federatsii`
URL (payload): `https://minfin.gov.ru/common/upload/library/2025/06/main/Dotatsii_na_vyravnivanie.zip`

HTTP check:
```
https://minfin.gov.ru/ru/                                          -> 200 99611 verify=0
https://minfin.gov.ru/ru/perfomance/regions/mb/mb2026_2028/        -> 200 51290
.../mb2026_2028/?page_38=2 -> 200 53085 ; ?page_38=3 -> 200 43231 ; ?page_38=4 -> 200 40096
record page (id_38=312807)                                         -> 200 35029
.../Dotatsii_na_vyravnivanie.zip                                   -> 200 1963545 application/zip
```

Title: **«Исходные данные для проведения расчетов распределения дотаций на выравнивание бюджетной
обеспеченности субъектов Российской Федерации»**
Gloss: "Input data for performing the calculations of the distribution of equalization dotations for the
budgetary capacity of the subjects of the Russian Federation."

Publisher: Министерство финансов Российской Федерации (Minfin of Russia).

Periodicity (verbatim from the record page):
> «Опубликован в разделе: **2026-2028 годы** … Опубликовано: **10.06.2025** Изменено: 10.06.2025»

Gloss: "Published in section: 2026-2028 years … Published: 10.06.2025, Modified: 10.06.2025."
Periodicity: **annual**, keyed to the three-year budget cycle — evidenced by the parallel sections
`mb2020_2022`, `mb2026_2028` etc., and consistent with Resolution 670's «ежегодно, до 1 августа» data-supply
deadline (publication on 10.06.2025 precedes the 01.08.2025 deadline for the 2026 cycle).
Flagged: the record page states a **publication date**, not a periodicity sentence. Periodicity is inferred
from the section series + Resolution 670's annual deadline, not directly quoted.

Contents (verified by unzipping): **85 files** — 84 per-region `.xls` workbooks (64,512 bytes each:
`altayskiy_kray.xls`, `respublika_dagestan.xls`, `g_moskva.xls`, `yamalo_nenetskiy_avtonomnyy_okrug.xls`, …)
**plus** `Методика распределения дотаций на выравнивание.pdf` (866,913 bytes) — the consolidated Resolution 670
methodology quoted in full under Item 2.

Proposed node? **YES** — `ru-minfin-equalization-input-data`. Recurrently published, government-authored,
TIER A, and it is the explicit statutory input-data publication.

Proposed EDGEs:
- `ru-minfin-2026-equalization` -> `ru-minfin-equalization-input-data`, `uses_data_from` — the input data is
  by construction the input to the per-region «уровень расчетной бюджетной обеспеченности» table.
  **Tense/evidence caveat:** I did **not** find a sentence in the *distribution* table's own text naming the
  input-data publication. The relationship is established by Resolution 670's methodology (which defines the
  calculation and its inputs) and by both being published in the same Minfin `mb2026_2028` section — it is
  **structural, not textually self-declared**. Flag as PLAUSIBLE rather than CONFIRMED.
- `ru-minfin-equalization-input-data` -> `ru-rosstat`, `uses_data_from` — CONFIRMED, because the methodology
  bundled inside this very archive contains the provider table naming **Росстат** for indicators 1, 37, 38, 39, 41
  (quoted verbatim under Item 2).

Related sibling publications found on the same Minfin section (all TIER A, candidate nodes):
- «Дополнительные данные для проведения расчетов распределения дотаций на выравнивание бюджетной обеспеченности субъектов Российской Федерации» — `?id_38=313269-...`
- «Распределение дотаций на выравнивание бюджетной обеспеченности субъектов Российской Федерации на 2026 год и плановый период 2027 и 2028 годов» — `?id_57=314937-...`
- «Уровень расчетной бюджетной обеспеченности субъектов Российской Федерации после распределения дотаций… и индекс бюджетных расходов субъектов Российской Федерации на 2026 год» — `?id_57=314935-...` (this is round 1's `ru-minfin-2026-equalization`)
- «Исходные данные по единой субвенции на 2026 год и на плановый период 2027 и 2028 годов» — `?id_38=312773-...`
- «Исходные данные для проведения расчетов распределения дотаций на частичную компенсацию дополнительных расходов на повышение оплаты труда работников бюджетной сферы и иные цели» — `?id_38=312811-...`

---

## ITEM 6 — BANK OF RUSSIA KEY RATE / MONETARY POLICY — **VERIFIED (with an important negative)**

Verification tier: **A**

### 6a. **«Доклад о денежно-кредитной политике» IS DISCONTINUED — do not mint it as a live node**

URL: `https://www.cbr.ru/about_br/publ/ddkp/` — HTTP check: `200 95934 verify=0`

Verbatim, from the Bank of Russia's own page:
> «С февраля 2024 года публикация Доклада о денежно-кредитной политике прекращена. Вместо данного материала
> после каждого решения по ключевой ставке публикуется **Резюме обсуждения ключевой ставки**, дополнительно
> по итогам опорных раундов — **Комментарий к среднесрочному прогнозу Банка России**. Среднесрочный прогноз
> Банка России публикуется в составе **Материалов по итогам заседаний Совета директоров Банка России по
> ключевой ставке**.»

Gloss: "Since February 2024, publication of the Monetary Policy Report has been discontinued. Instead, after
each key rate decision, a **Summary of the key rate discussion** is published; additionally, following core
rounds, a **Commentary on the Bank of Russia's medium-term forecast**. The Bank of Russia's medium-term
forecast is published as part of the **Materials following meetings of the Bank of Russia Board of Directors
on the key rate**."

The archive confirms the last issues: 2023 «Выпуск № 4 (44) • Ноябрь», and a final
«Среднесрочный прогноз Банка России 16.02.2024».

### 6b. The **live** recurring series — VERIFIED

URL (series index): `https://www.cbr.ru/dkp/mp_dec/` — HTTP check: `200 61440 verify=0`
URL (calendar): `https://www.cbr.ru/dkp/cal_mp/` — HTTP check: `200 159163 verify=0`
URL (press release index): `https://www.cbr.ru/press/keypr/` — HTTP check: `200 39773 verify=0`

Title: **«Пресс-релиз по ключевой ставке»** (the recurring series) within
**«Решения по денежно-кредитной политике» → «Материалы по итогам заседаний Совета директоров Банка России
по ключевой ставке»**; companion series **«Резюме обсуждения ключевой ставки»** and
**«Комментарий к среднесрочному прогнозу»**.

Publisher: Центральный банк Российской Федерации (Банк России) / Bank of Russia.

Periodicity (verbatim, from the calendar page — this is a genuine periodicity statement):
> «Предполагаемое время публикации пресс-релиза — 13:30 по московскому времени
> Предполагаемое время начала пресс-конференции — 15:00 по московскому времени»
> «13 февраля 2026 года Заседание Совета директоров Банка России по ключевой ставке / Пресс-релиз по
> ключевой ставке / Среднесрочный прогноз / Пресс-конференция Председателя Банка России
> 26 февраля 2026 года Резюме обсуждения ключевой ставки / Комментарий к среднесрочному прогнозу
> 20 марта 2026 года Заседание Совета директоров Банка России по ключевой ставке / Пресс-релиз по ключевой ставке …
> 1 апреля 2026 года Резюме обсуждения ключевой ставки
> 24 апреля 2026 года Заседание Совета директоров Банка России по ключевой ставке / Пресс-релиз по ключевой ставке / Среднесрочный прогноз …
> 7 мая 2026 года Резюме обсуждения ключевой ставки»

⇒ **8 scheduled Board meetings per year**, each producing a press release at 13:30 Moscow time, with the
"Резюме обсуждения ключевой ставки" published ~2 weeks later. Calendar archive runs 2014–2026.

Verbatim (the 2026 decision series, from `https://www.cbr.ru/dkp/mp_dec/`):
> «24 июля 2026 г. 13:30 Банк России принял решение снизить ключевую ставку на 25 б.п., до 14,00% годовых
> 19 июня 2026 г. 13:30 … до 14,25% годовых
> 24 апреля 2026 г. 13:30 … на 50 б.п., до 14,50% годовых
> 20 марта 2026 г. 13:30 … до 15,00% годовых
> 13 февраля 2026 г. 13:30 … до 15,50% годовых
> 19 декабря 2025 г. 13:30 … до 16,00% годовых
> 24 октября 2025 г. 13:30 … до 16,50% годовых»

Verbatim (latest release body):
> «Совет директоров Банка России 24 июля 2026 года принял решение снизить ключевую ставку на 25 б.п.,
> до 14,00% годовых. Экономика в целом в 2к26 росла умеренными темпами. Существенный рост цен и повышение
> инфляционных ожиданий в летние месяцы во многом были связаны с разовыми факторами. Оценка показателей
> устойчивой инфляции остается в диапазоне 4–5% в пересчете на год…»
> «Следующее заседание Совета директоров Банка России, на котором будет рассматриваться вопрос об уровне
> ключевой ставки, запланировано на 11 сентября 2026 года. Время публикации пресс-релиза о решении Совета
> директоров Банка России – 13:30 по московскому времени.»

**Does its own text name Rosstat's CPI as an input? — NO. Verified negative.**
I searched the full extracted text of the 24.07.2026 press release for `Росстат`, `росстат`, and `статистик`:
**0 hits for each.** The release discusses inflation and «показателей устойчивой инфляции» but **never names
Rosstat or the ИПЦ as a source**. Recorded honestly: **no edge** from the key-rate press release to the CPI
node on the strength of this document. Do not assert one.

Proposed node? **YES** — `ru-cbr-key-rate-decision` (recurring, 8×/year, TIER A, with a published calendar).
Also candidate: `ru-cbr-key-rate-discussion-summary` («Резюме обсуждения ключевой ставки»).
**Do NOT mint** `ru-cbr-monetary-policy-report` / ДКП as a current node — discontinued Feb 2024 (quote above).
If minted at all, mark it terminated with that verbatim.

---

## ITEM 7 — ПРОЖИТОЧНЫЙ МИНИМУМ / МРОТ — **VERIFIED** (and a major corpus-level finding)

Verification tier: **A** (official publication portal + official budget law)

### 7a. **THE HEADLINE: Russia's benefit-indexation chain does NOT run through the CPI.**

Since 2021 both the subsistence minimum and the minimum wage are set as **fixed shares of Rosstat's median
income / median wage**, not by CPI indexation. This is a genuine structural contrast with the CPI-indexation
chains this corpus documents for other countries, and it should be recorded as such.

URL (record): `http://publication.pravo.gov.ru/document/0001202012290119`
URL (official PDF): `http://publication.pravo.gov.ru/file/pdf?eoNumber=0001202012290119`

HTTP check:
```
http://publication.pravo.gov.ru/documents/block/president?pageSize=100&index=1&DocumentDateFrom=29.12.2020&DocumentDateTo=29.12.2020 -> 200 67871 (19 docs)
curl -o fz473.pdf 'http://publication.pravo.gov.ru/file/pdf?eoNumber=0001202012290119' -> HTTP 200 bytes 533835
pdfinfo -> Creator: ABBYY FineReader Engine 11 ; 11 pages
```
Image-only; OCR'd with `tesseract -l rus --psm 6`. **Quotes are OCR output.**

Title: **Федеральный закон от 29.12.2020 № 473-ФЗ «О внесении изменений в отдельные законодательные акты
Российской Федерации»** — this is the law that rewrote Art. 4 of **Федеральный закон № 134-ФЗ
«О прожиточном минимуме в Российской Федерации»**.

Verbatim (OCR) — the **new definition of median income, with Rosstat named periphrastically**:
> «в) дополнить новым абзацем четвертым следующего содержания: «**медианный среднедушевой доход** - величина
> денежного дохода, относительно которой половина населения в целом по Российской Федерации имеет значение
> среднедушевого дохода ниже данной величины, другая половина - выше данной величины и которая **ежегодно
> исчисляется федеральным органом исполнительной власти, осуществляющим функции по формированию официальной
> статистической информации о социальных, экономических, демографических, экологических и других
> общественных процессах в Российской Федерации**;»»

Verbatim (OCR) — **the new Article 4, i.e. the indexation formula**:
> «4) статью 4 изложить в следующей редакции: «**Статья 4. Величина прожиточного минимума, периодичность
> ее исчисления и порядок установления**
> 1. Величина прожиточного минимума на душу населения в целом по Российской Федерации на очередной год
> устанавливается **до 1 июля текущего года** Правительством Российской Федерации с учетом мнения Российской
> трехсторонней комиссии по регулированию социально-трудовых отношений и **исчисляется исходя из величины
> медианного среднедушевого дохода за предыдущий год**. **Соотношение величины прожиточного минимума на душу
> населения в целом по Российской Федерации и величины медианного среднедушевого дохода за предыдущий год
> с 2021 года устанавливается в размере 44,2 процента.** Указанное … соотношение пересматривается не реже
> одного раза в пять лет … величина прожиточного минимума на душу населения в целом по Российской Федерации
> на очередной год **не может быть установлена ниже** величины прожиточного минимума … установленной на текущий год.
> **Исчисление медианного среднедушевого дохода осуществляется на основании методики, определяемой федеральным
> органом исполнительной власти, осуществляющим функции по формированию официальной статистической информации…**»»

Verbatim (OCR) — **МРОТ**:
> «…минимальный размер оплаты труда на очередной год устанавливается федеральным законом в текущем году и
> **исчисляется исходя из величины медианной заработной платы, рассчитанной федеральным органом исполнительной
> власти, осуществляющим функции по формированию официальной статистической информации** … за предыдущий год.
> Проект федерального закона об установлении минимального размера оплаты труда на очередной год подлежит
> обсуждению с Российской трехсторонней комиссией по регулированию социально-трудовых отношений…
> **С 2021 года соотношение минимального размера оплаты труда и медианной заработной платы устанавливается
> в размере 42 процентов.** … Минимальный размер оплаты труда на очередной год устанавливается в размере
> **не ниже величины прожиточного минимума трудоспособного населения** в целом по Российской Федерации на
> очередной год и не ниже минимального размера оплаты труда, установленного на текущий год.»

**Identification note (important, and honest):** the law **never writes the word «Росстат»** — 0 hits for
`Росстат` and `статистик` as a standalone agency name in my search of the OCR text. It uses the periphrasis
«федеральный орган исполнительной власти, осуществляющий функции по формированию официальной статистической
информации о социальных, экономических, демографических, экологических и других общественных процессах в
Российской Федерации». That phrase is the statutory designation of **Rosstat**, defined by
**Постановление Правительства РФ от 2 июня 2008 г. № 420 «О Федеральной службе государственной статистики»** —
which is independently corroborated TIER A in this round, because Rosstat's own Приказ № 915 opens
«В соответствии с подпунктом 5.2 **Положения о Федеральной службе государственной статистики, утвержденного
постановлением Правительства Российской Федерации от 2 июня 2008 г. № 420**». The identification is therefore
sound but is an **inference across two documents**, not a literal naming. Flagged.

### 7b. The **annual** ПМ figure — VERIFIED, and it is set by the budget law itself

Verbatim (OCR, from 426-ФЗ Статья 8 ч.4 — see Item 4 for provenance):
> «4. Установить в 2026 году величину прожиточного минимума в целом по Российской Федерации на душу населения
> в размере **18 939 рублей**, для трудоспособного населения - **20 644 рублей**, пенсионеров - **16 288 рублей**,
> детей - **18 371 рубля**.»

Gloss: "4. To establish for 2026 the subsistence minimum for the Russian Federation as a whole: per capita
18,939 roubles; for the working-age population 20,644 roubles; pensioners 16,288 roubles; children 18,371 roubles."

Note the mechanism: Art. 4 of 134-ФЗ says the Government sets it by 1 July; in practice for 2026 the figure is
**also fixed in the federal budget law**. Both routes are TIER A here.

Also verbatim (OCR, 426-ФЗ Статья 8) — separate benefit indexation coefficients, **not** CPI-named:
> «2. Установить, что с 1 января 2026 года размер индексации сумм, выплачиваемых по денежному обязательству
> непосредственно на содержание гражданина в возмещение вреда, причиненного жизни или здоровью, на основании
> судебного акта … составляет **1,04**.»
> «3. Установить, что с 1 января 2026 года размер индексации пособий, предусмотренных Федеральным законом от
> 4 июня 2011 года № 128-ФЗ … »
(1,04 = 4%, matching the Art. 1 inflation forecast «не превышающего 4,0 процента», but the law does **not**
say so — do not assert a CPI edge from this. Flagged as suggestive only.)

Proposed nodes:
- `ru-subsistence-minimum-law-134fz` (standing statute defining the method) — **YES**
- `ru-federal-budget-law-2026` already covers the annual ПМ figure.

Proposed EDGEs:
- `ru-subsistence-minimum-law-134fz` -> `ru-rosstat-median-income`, `uses_data_from` —
  «исчисляется исходя из величины медианного среднедушевого дохода за предыдущий год … 44,2 процента»
  (+ the median income is «ежегодно исчисляется федеральным органом исполнительной власти, осуществляющим
  функции по формированию официальной статистической информации…»). **Rosstat identification is by periphrasis — flagged.**
- `ru-mrot-law` -> `ru-rosstat-median-wage`, `uses_data_from` — «исчисляется исходя из величины медианной
  заработной платы, рассчитанной федеральным органом исполнительной власти…  42 процентов».
- **NEGATIVE EDGE, recorded deliberately:** `ru-subsistence-minimum-law-134fz` -/-> `ru-rosstat-cpi`.
  The subsistence minimum is **NOT** CPI-indexed. Any assumption that Russia mirrors the CPI→benefits pattern
  of the other BRICS corpora is **contradicted by the primary text**.
- Note the cross-link back to Item 2: Resolution 670's provider table lists
  «38. Величина прожиточного минимума по субъектам Российской Федерации (рублей) — **Росстат**», so the
  subsistence minimum re-enters the equalization calculation as a Rosstat-supplied regional indicator.

---

## ITEM 8 — ФЕДЕРАЛЬНОЕ КАЗНАЧЕЙСТВО BUDGET EXECUTION REPORTS — **VERIFIED**

Verification tier: **A**

URL (section): `https://roskazna.gov.ru/ispolnenie-byudzhetov`
URL (federal budget): `https://roskazna.gov.ru/ispolnenie-byudzhetov/federalnyj-byudzhet`

HTTP check:
```
https://roskazna.gov.ru/                                            -> 200 236477 verify=0
https://roskazna.gov.ru/ispolnenie-byudzhetov                       -> 200 178554
https://roskazna.gov.ru/ispolnenie-byudzhetov/federalnyj-byudzhet   -> 200 166884  (after 1 retry; first attempt: curl: (35) Recv failure: Connection reset by peer — rate limiting)
```
**Note on wrong paths** (round-1-style traps): the trailing-slash / older forms 404:
```
https://roskazna.gov.ru/ispolnenie-byudzhetov/federalnyy-byudzhet/          -> 404 2622   ("federalnyy" with double-y)
https://roskazna.gov.ru/ispolnenie-byudzhetov/perechen-publikuemoy-informatsii/ -> 404 2622
```
The correct slug is **`federalnyj-byudzhet`** (single -j), no trailing slash.

Title: **«Отчет об исполнении федерального бюджета»**, within
**«Исполнение бюджетов» → «Федеральный бюджет»**
Page `<title>`: «Федеральный бюджет - Казначейство России»
Gloss: "Report on the execution of the federal budget", within "Budget execution → Federal budget".

Publisher: Федеральное казначейство (Казначейство России) / Federal Treasury of Russia.

Periodicity (verbatim, from the report-type selector on the page):
> «**Вид отчета** … Выберите из списка **годовой квартальный ежемесячный оперативный**»

Gloss: "Report type … Select from list: **annual, quarterly, monthly, operational**."

Year selector (verbatim), showing the depth of the recurring series:
> «Год Выберите год **2026 2025 2024 2023 2022 2021 2020 2019 2018 2017 2016 2015 2014 2013 2012 2011 2010
> 2009 2008 2007 2006 2005 2004 2003 2002 2001 2000 1999 1998 1997**»

Latest instances visible (verbatim), confirming the monthly cadence and publication lag:
> «на 1 июня 2026 zip 1 июля 2026 09:00»
> «на 1 апреля 2026 zip 9 июня 2026 09:00»

⇒ monthly report "as at the 1st of month M" published at the start of month M+1, 09:00.

Sibling recurring sections on the same host (all TIER A, candidate nodes):
- «Консолидированный бюджет РФ и бюджетов государственных внебюджетных фондов» — `https://roskazna.gov.ru/ispolnenie-byudzhetov/konsolidirovannyj-byudzhet-rf-i-byudzhetov-gosudarstve`
- «Консолидированные бюджеты субъектов РФ и бюджетов территориальных государственных внебюджетных фондов» — `https://roskazna.gov.ru/ispolnenie-byudzhetov/konsolidirovannye-byudzhety-subektov-rossijskoj-federa`
- «Иллюстрированное информационное издание "Исполнение федерального бюджета и бюджетов бюджетной системы РФ"» — `https://roskazna.gov.ru/ispolnenie-byudzhetov/illyustrirovannoe-informacionnoe-izdanie-ispolnenie-federal`
- «Показатели исполнения бюджетов и финансовой отчетности» — `https://datamarts.roskazna.ru/` (not verified this round)
- «Статистика государственных финансов РФ»

Proposed node? **YES** — `ru-treasury-federal-budget-execution-report`. Recurring
(monthly/quarterly/annual/operational, archive to 1997), government-authored, TIER A, with a verbatim
periodicity statement.

Proposed EDGE: `ru-treasury-federal-budget-execution-report` -> `ru-federal-budget-law-2026`, `reports_against`.
**Evidence caveat:** the section landing page does not itself contain a sentence naming the budget law. The
relationship is structural (an execution report of the budget the law approves), and the budget law's Art. 11
does name the Treasury: «Установить, что в 2026 - 2028 годах **Федеральное казначейство** в рамках
осуществления операций по управлению остатками средств на едином счете федерального бюджета вправе
предоставить бюджетам субъектов Российской Федерации бюджетные кредиты…» — but that is the *law* naming the
*Treasury*, i.e. the wrong direction for this edge. Flag as PLAUSIBLE, not CONFIRMED; the actual report ZIPs
were not opened this round.

---

# CONSOLIDATED PROPOSED GRAPH DELTA

## New nodes (all TIER A)
| id | title | periodicity | host |
|---|---|---|---|
| `ru-rosstat-cpi` | Индексы потребительских цен на товары и услуги | weekly / monthly / quarterly / annual (verbatim) | rosstat.gov.ru |
| `ru-rosstat-cpi-methodology-915` | Приказ Росстата № 915 от 15.12.2021 — Официальная статистическая методология … расчета ИПЦ | standing instrument | rosstat.gov.ru |
| `ru-federal-budget-law-2026` | ФЗ от 28.11.2025 № 426-ФЗ «О федеральном бюджете на 2026 год…» | annual (inferred) | publication.pravo.gov.ru |
| `ru-minfin-equalization-input-data` | Исходные данные для проведения расчетов распределения дотаций на выравнивание… | annual (inferred) | minfin.gov.ru |
| `ru-cbr-key-rate-decision` | Пресс-релиз по ключевой ставке / Решения по ДКП | 8× per year (verbatim calendar) | cbr.ru |
| `ru-subsistence-minimum-law-134fz` | ФЗ № 134-ФЗ «О прожиточном минимуме…», ст. 4 as amended by 473-ФЗ | standing instrument | publication.pravo.gov.ru |
| `ru-treasury-federal-budget-execution-report` | Отчет об исполнении федерального бюджета | monthly / quarterly / annual / operational (verbatim) | roskazna.gov.ru |

## New edges
| source | target | type | status |
|---|---|---|---|
| `ru-resolution-670-equalization-methodology` | `ru-budget-code-art131` | implements | **CONFIRMED** — «В целях реализации статьи 131 Бюджетного кодекса РФ» |
| `ru-resolution-670-equalization-methodology` | `ru-rosstat` / `ru-rosstat-cpi` | uses_data_from | **CONFIRMED** — provider table «…— Росстат» + «Бi - стоимость фиксированного набора потребительских товаров и услуг» |
| `ru-resolution-670-equalization-methodology` | `ru-fns` | uses_data_from | **CONFIRMED** — «Федеральной службе государственной статистики и Федеральной налоговой службе обеспечивать ежегодно, до 1 августа…» |
| `ru-resolution-2038-2025` | `ru-resolution-670-equalization-methodology` | amends | **CONFIRMED** (OCR) |
| `ru-resolution-2038-2025` | `ru-federal-budget-law-2026` | uses_data_from (inflation forecast) | **CONFIRMED** (OCR) |
| `ru-federal-budget-law-2026` | `ru-budget-code` | cites | **CONFIRMED** — «В соответствии с пунктом 2 статьи 184-1 Бюджетного кодекса РФ» (art. 131 specifically: NOT evidenced) |
| `ru-rosstat-cpi` | `ru-rosstat-cpi-methodology-915` | governed_by | **CONFIRMED** |
| `ru-subsistence-minimum-law-134fz` | `ru-rosstat` (median income) | uses_data_from | **CONFIRMED**, Rosstat named by periphrasis — flagged |
| `ru-minfin-equalization-input-data` | `ru-rosstat` | uses_data_from | **CONFIRMED** |
| `ru-minfin-2026-equalization` | `ru-minfin-equalization-input-data` | uses_data_from | **PLAUSIBLE** — structural, not self-declared |
| `ru-treasury-federal-budget-execution-report` | `ru-federal-budget-law-2026` | reports_against | **PLAUSIBLE** — structural |

## Explicit negatives (record these; they are findings)
- `ru-cbr-key-rate-decision` -/-> `ru-rosstat-cpi` — the press release text contains **0** occurrences of
  `Росстат` / `статистик`. No edge asserted.
- `ru-subsistence-minimum-law-134fz` -/-> `ru-rosstat-cpi` — ПМ/МРОТ are indexed to **median income / median
  wage**, not CPI. Contradicts the CPI→benefit pattern seen elsewhere in this corpus.
- `ru-cbr-monetary-policy-report` — **discontinued Feb 2024**; do not mint as live.

## Round-1 corrections
1. **Rosstat is NOT blocked.** Round 1's conclusion was a trust-store artefact. `ru-cbr-monetary-policy-guidelines`
   no longer needs to stand in for a CPI node.
2. **Resolution 670's operative formula is NOT paywalled.** It is TIER A on minfin.gov.ru, inside the
   equalization input-data ZIP. Upgrade from "formula unverified" to fully verified.
3. **`ru-budget-code-art131` remains TIER C for its article text** — but its *role* is now TIER A-corroborated
   by Resolution 670's enabling clause.

## Unresolved / honest gaps
- Budget Code **art. 131's own text** on a government host — blocked by a 673,972-byte hard truncation in the
  pravo.gov.ru ИПС viewer; `actual.pravo.gov.ru:8000` API unreachable; duma.gov.ru / government.ru /
  docs.cntd.ru all fail TLS even with the Russian national CA.
- **Total дотации на выравнивание amount** in 426-ФЗ Приложения 28/30 — inside a 5,381-page, 196 MB image-only
  PDF with no index. Not extracted.
- `gks.ru` (TCP reset), `fedstat.ru` (403 WAF), `showdata.gks.ru` and `eng.rosstat.gov.ru` (cert failures not
  fixed by the national CA) remain genuinely unreachable.
- The household budget survey (`обследование бюджетов домашних хозяйств`), named as the CPI weights source, was
  not separately located — `no-node-yet` drop.
- Roskazna report ZIPs themselves were not opened; only the section metadata was verified.
