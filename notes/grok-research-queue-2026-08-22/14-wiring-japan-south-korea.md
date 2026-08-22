# Prompt for Grok — domestic wiring — Japan and South Korea

**Standing rules:** see `../GROKREADME.md` — attach/paste it alongside this file every time. It has the id-integrity rule, the relationship-type enum, the honesty permission, the coverage-is-data-driven principle, and the reply schema. This file has only the region-specific research question below.

**Attach:** `GROKREADME.md`, `jp-japan-grok-2026-08.json`, `kr-south-korea-grok-2026-08.json` (all under `src/data/research/`). The full id/title list for every node this prompt covers is also pasted below, so even if an attachment doesn't come through, the ids you need are right here in the text.

Paste everything below the line.

---

**Japan 31/63 (49%) and South Korea 34/52 (65%) unlinked.** Korea in particular has an unusually large bundle of standalone treaty/convention nodes (FTAs, environmental conventions, digital-trade agreements) that were minted but never connected to any Korean statistical release or to each other.

**Ids — use ONLY ids from the list below, or propose a new node.** Every `source_report_id` and `target_report_id` in your reply must be one of the exact ids listed in "Japan / South Korea" below (copy them character-for-character — do not paraphrase, re-hyphenate, or guess a variant), OR one of GROKREADME.md's standard international ids, OR — if the dependency genuinely involves something not on either list — a **proposed new node** (title, publisher, exact URL, description, publication cadence) in a separate `proposed_reports` array. Never invent an id that looks plausible but isn't on one of those lists; that has broken every round so far.

## The ask

Find real, citable **domestic** (within-country) dependency edges among the nodes listed below — which report's figures feed which, which report's methodology is governed by which standard, which trade/legal instrument a statistics release cites as its basis. Every one of these nodes currently has **zero edges** in our graph (or is directly relevant context for one that does) — they were minted as candidates but never wired to anything.

Likely angles: does Statistics Korea (KOSTAT) or the Bank of Japan/Cabinet Office cite an SNA edition or COICOP version in their own methodology notes? Do Japan's or Korea's trade-statistics releases cite any of the many FTA nodes (`jp-japan-eu-epa`, `jp-usjta`, `kr-korus-fta`, `kr-korea-eu-fta`, `kr-rcep`, `kr-china-fta`, `kr-asean-fta`, etc.) as the customs/tariff regime in force for the periods they report? The environmental-convention nodes for Korea (`kr-montreal-protocol`, `kr-basel-convention`, `kr-cites-ramsar`, `kr-stockholm-rotterdam`, `kr-unccd`) most likely have NO real statistical dependency in this corpus's sense — an honest "no edge, these are standalone treaty-membership context" is the expected and correct answer for most of them.

## Node lists

<details>
<summary>Japan — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
jp-ageing-society-white-paper | Annual Report on the Ageing Society / White Paper on the Ageing Society (高齢社会白書)
jp-balance-of-payments | Balance of Payments and International Investment Position (BPM6) / 国際収支統計・対外資産負債残高
jp-basic-act-disaster-management | Basic Act on Disaster Management (災害対策基本法) and related institutional framework
jp-basic-act-energy-policy | Basic Act on Energy Policy (エネルギー政策基本法) and the Strategic Energy Plan process
jp-basic-act-gender-equal-society | Basic Act for Gender Equal Society (男女共同参画社会基本法)
jp-basic-survey-foreign-residents | Basic Survey on Foreign Residents (在留外国人に関する基礎調査)
jp-boj-corporate-goods-services-prices | Corporate Goods Price Index (CGPI) and Services Producer Price Index (SPPI) — reinforced producer-price cluster
jp-boj-flow-of-funds | Flow of Funds Accounts (FFA) / 資金循環統計
jp-boj-monetary-base | Monetary Base Statistics / マネタリーベース
jp-boj-outlook | Outlook for Economic Activity and Prices (展望レポート) — BOJ Policy Board forecasts
jp-census-manufactures | Census of Manufactures (工業統計調査) / Economic Census for Business Activity (manufacturing component)
jp-cgpi | Corporate Goods Price Index (CGPI) / 企業物価指数
jp-comprehensive-survey-living-conditions | Comprehensive Survey of Living Conditions (国民生活基礎調査)
jp-cpi | Consumer Price Index (CPI) / 消費者物価指数
jp-current-survey-production | Current Survey of Production (生産動態統計調査) — reinforced notes
jp-economic-census | Economic Census (経済センサス) — Business Frame and Business Activity
jp-elderly-household-structure | Elderly household structure and living arrangements (from Ageing Society White Paper / Comprehensive Survey of Living Conditions / Census)
jp-electricity-generation-nuclear | Electricity Generation Mix — Nuclear Share (General Energy Statistics / METI)
jp-employment-status-survey | Employment Status Survey (就業構造基本調査 / Shūgyō Kōzō Kihon Chōsa)
jp-estat | e-Stat — Portal Site of Official Statistics of Japan
jp-family-income-expenditure | Family Income and Expenditure Survey (家計調査 / Kakei Chōsa)
jp-financial-statements-corporations | Financial Statements Statistics of Corporations by Industry (法人企業統計調査)
jp-foreign-residents-statistics | Statistics on Foreign Residents in Japan (在留外国人統計) — formerly Registered Foreign Residents
jp-fukushima-daiichi-decommissioning | Fukushima Daiichi Nuclear Power Station Decommissioning Progress & Related Statistics
jp-gender-equality-white-paper | White Paper on Gender Equality (男女共同参画白書)
jp-housing-land-survey | Housing and Land Survey (住宅・土地統計調査)
jp-immigration-residence-management-statistics | Immigration and Residence Management Statistics (出入国管理統計・在留管理)
jp-income-redistribution-survey | Survey on the Redistribution of Income / Income redistribution statistics (所得再分配調査)
jp-indices-tertiary | Indices of Tertiary Industry Activity — reinforced
jp-input-output-tables | Input-Output Tables for Japan (産業連関表)
jp-jaif-nuclear-status | Japan Atomic Industrial Forum (JAIF) — Current Status of Nuclear Power Plants in Japan & Monthly Operating Performance
jp-labour-force-survey | Labour Force Survey (労働力調査)
jp-long-term-care-insurance | Long-Term Care Insurance (介護保険) statistics and system performance
jp-machinery-orders | Machinery Orders (機械受注統計調査)
jp-master-plan-official-statistics | Master Plan Concerning the Development of Official Statistics (公的統計の整備に関する基本的な計画)
jp-mext-statistical-abstract | Statistical Abstract of Education, Science and Culture / 文部科学統計要覧
jp-monthly-labour-survey | Monthly Labour Survey (毎月勤労統計調査 / Maitsuki Kinrō Tōkei Chōsa)
jp-national-accounts | Japanese System of National Accounts (JSNA) / 国民経済計算 — Annual Report and Quarterly Estimates
jp-national-health-nutrition-survey | National Health and Nutrition Survey (国民健康・栄養調査)
jp-nra | Nuclear Regulation Authority (NRA) — Institutional Framework and Post-Fukushima Regulatory Regime
jp-nra-reactor-status | Nuclear Regulation Authority — Present States of Operation / Reactor Status
jp-nsficw | National Survey of Family Income, Consumption and Wealth (全国家計構造調査)
jp-okinawa-statistical-yearbook | Okinawa Prefectural Statistical Yearbook (沖縄県統計年鑑)
jp-petroleum-statistics | Petroleum Statistics / Energy-related Current Statistics (石油統計等)
jp-population-census | Population Census of Japan (国勢調査 / Kokusei Chōsa)
jp-prefectural-accounts | Prefectural Accounts (県民経済計算) / Annual Report on Prefectural Accounts
jp-prefectural-contrast-summary | Prefectural statistical contrast framework (Tokyo vs Okinawa / peripheral)
jp-reconstruction-agency | Reconstruction Agency — Institutional Framework and Progress Monitoring for Post-2011 Recovery
jp-reconstruction-agency-progress | Reconstruction Agency Progress Reports and Statistics on the Great East Japan Earthquake / 復興の進捗状況
jp-retail-price-survey | Retail Price Survey (小売物価統計調査) — Trend Survey and Structure Survey
jp-sbj | Statistics Bureau of Japan (SBJ) / 総務省統計局 — Ministry of Internal Affairs and Communications
jp-school-basic-survey | School Basic Survey (学校基本調査)
jp-services-producer-price-index | Services Producer Price Index (SPPI) / 企業向けサービス価格指数
jp-spent-fuel-storage | Spent Nuclear Fuel Storage and Intermediate Storage Capacity / Utilisation
jp-statistics-act-2007 | Statistics Act (Act No. 53 of 2007) — 統計法
jp-strategic-energy-plan-7th | Seventh Strategic Energy Plan (第7次エネルギー基本計画) — February 2025 Cabinet Decision
jp-survey-household-economy | Survey of Household Economy (家計消費状況調査)
jp-tankan | Tankan (Short-Term Economic Survey of Enterprises in Japan) / 全国企業短期経済観測調査
jp-time-use-survey | Survey on Time Use and Leisure Activities (社会生活基本調査)
jp-trade-statistics-detail | Trade Statistics of Japan — detailed commodity and partner matrices
jp-vital-statistics | Vital Statistics (人口動態統計)
jp-vital-statistics-detailed | Vital Statistics — detailed cause-of-death and fertility series (within MHLW Vital Statistics)
jp-white-paper-disaster-management | White Paper on Disaster Management (防災白書)
```
</details>

<details>
<summary>South Korea — existing node ids (click to expand if your interface hides it; otherwise just read past it)</summary>

```
kr-agriculture-fishery | Agriculture, forestry and fishery statistics
kr-balance-of-payments | Balance of Payments and International Investment Position
kr-bok | Bank of Korea (한국은행) — statistical function
kr-construction-statistics | Construction statistics / Construction orders and permits
kr-cpi | Consumer Price Index (소비자물가지수)
kr-eaps | Economically Active Population Survey (경제활동인구조사)
kr-education-statistics | Education statistics (schools, enrolment, advancement) — Korean Educational Development Institute / KOSTAT / Ministry of Education
kr-elderly-employment | Elderly / older-worker employment statistics
kr-energy-balance | Energy balance / Primary energy supply statistics
kr-external-debt-reserves | External debt and foreign-reserve statistics
kr-financial-stability | Financial Stability Report and related BOK financial-system statistics
kr-financial-statement-analysis | Financial Statement Analysis (기업경영분석) — Bank of Korea
kr-flow-of-funds | Flow of Funds Accounts / Financial Accounts
kr-foreign-residents | Foreign Residents / Migrant population statistics and Multicultural Family / Marriage statistics
kr-gender-statistics | Gender equality / women’s economic activity statistics and related white papers
kr-ghg-inventory | National Greenhouse Gas Inventory (국가 온실가스 인벤토리)
kr-grdp-regional-accounts | Gross Regional Domestic Product (GRDP) / Regional Accounts
kr-health-statistics | Health and medical statistics (beyond long-term care)
kr-household-finance-welfare | Survey of Household Finances and Living Conditions (가계금융복지조사)
kr-household-income-expenditure | Household Income and Expenditure Survey (가계동향조사 / related household income surveys)
kr-housing-statistics | Housing statistics and House Price / Transaction indices
kr-ict-digital | ICT / Digital economy statistics
kr-industrial-production-detail | Index of Industrial Production and related short-term industrial indicators (detailed)
kr-input-output | Input-Output Tables / Inter-industry relations tables
kr-justice-crime | Crime and justice statistics
kr-kosis | KOSIS — Korean Statistical Information Service (국가통계포털)
kr-kostat | Statistics Korea (KOSTAT) — national statistical office
kr-long-term-care-insurance | Long-Term Care Insurance (노인장기요양보험) statistics and system performance
kr-mining-manufacturing-survey | Monthly Survey of Mining and Manufacturing (광업제조업동향조사) / Industrial Production Index
kr-monetary-aggregates | Monetary and Liquidity Aggregates (M1, M2, Lf, L)
kr-national-accounts-bok | Korean System of National Accounts / GDP and related aggregates (국민계정)
kr-national-business-survey | National Business Survey / Census of Establishments (전국사업체조사)
kr-national-pension | National Pension Service statistics / National Pension coverage and finances
kr-north-korea-statistics | Statistical Indicators of North Korea (북한의 주요통계지표) — KOSTAT / Ministry of Data and Statistics compilation
kr-nuclear-energy | Nuclear power generation and electricity generation mix statistics
kr-population-census | Population and Housing Census (인구주택총조사)
kr-population-projections | Population Projections (장래인구추계)
kr-poverty-inequality | Relative poverty rate and income inequality statistics (Gini, etc.)
kr-ppi | Producer Price Index (생산자물가지수)
kr-rd-innovation | R&D and innovation statistics
kr-regional-contrast-extended | Extended regional contrast (Seoul Capital Area vs non-capital provinces / GRDP + demographic differentials)
kr-seoul-capital-area | Seoul Capital Area / Regional accounts and statistical contrast (preliminary)
kr-service-industry-survey | Service Industry Survey / Monthly Service Industry Survey
kr-sme-statistics | SME / Small and Medium Enterprise statistics
kr-statistics-act | Statistics Act (통계법)
kr-super-aged-status | Super-aged society indicators and elderly population statistics
kr-survey-business-activities | Survey of Business Activities (기업활동조사)
kr-tourism-culture | Tourism and culture statistics
kr-trade-by-enterprise | Trade by Enterprise Characteristics
kr-trade-statistics | Trade Statistics (수출입무역통계) — Korea Customs Service / MOTIR
kr-vital-statistics | Vital Statistics — Births, Deaths, Marriages, Divorces (인구동향조사 / 출생·사망통계)
kr-wage-structure | Wage Structure Survey / Labour cost statistics
```
</details>
