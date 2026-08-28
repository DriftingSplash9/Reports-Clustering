# BRICS/G.2 — Combined lead-chase and breadth round: Brazil, Russia, China, India, 2026-08-13

## Orientation

Direct continuation of `BRICS/G.1.md`, which closed by explicitly refusing to assume what should happen next: "Whether to run that second round immediately or check with Thomas first on the shape/priority of the new branch is an open call — flagged above, not assumed." Thomas was asked directly, with four options, and chose **two of them together — the lead-chase AND the breadth pass**. This round therefore runs both halves for every country: each of the four research agents was tasked with (a) chasing that country's specific open items from G.1's "Cheap checks still outstanding" list, and (b) finding a genuine second layer of building blocks beyond the opening CPI-plus-transfer-mechanism pair every branch in this corpus opens with.

That combination turned out to matter more than it looked. The lead-chase half is what forced each agent to re-test G.1's recorded access failures rather than inherit them — and **three of the four countries' headline "permanent blocks" from G.1 turned out to be misdiagnoses**. The breadth half is what gave China and India their first edges. Neither half alone would have produced this round's result.

Method was the same four-agents-then-synthesis pattern G.1 established, with one deliberate change: the repository was tarred and staged into the cloud sandbox **before** synthesis rather than after, so that synthesis wrote directly into a working checkout and `npm run validate` could be run continuously rather than once at the end. That change is recommended for future rounds; see Secondary observations.

## Session conditions

Same evidence-strict standing rule as every other branch: verbatim quote plus exact URL from a primary, government/agency-authored document for every claim; `NOT FOUND` is a legitimate, valuable outcome recorded honestly in `_dropped` rather than left unmentioned; an edge requires the dependent document's own text to name its input.

Every research agent was briefed on the WebFetch-fabrication lesson carried forward from `AF/G.24.md`, and on a sharper version of it developed during this round: **a status code alone is not a verification**. Agents were required to raw-verify with `curl` and to distinguish, by inspection of the response body, between a genuine block, a JS-rendering failure, a bot-challenge page served with HTTP 200, and a real document served alongside an error status. Every agent did this, and three of them found something G.1 had missed as a direct result.

Two environment conditions differed from G.1 and are recorded because they change what a future round can rely on:

- **`r.jina.ai` — this project's standing TIER B rendering-proxy fallback — was unavailable all round.** It is now behind a Cloudflare challenge and returned HTTP 403 on every attempt, for China, India and Brazil alike. G.1 leaned on it heavily for Brazil (IBGE, TCU, BCB). It cannot be assumed available.
- **A subagent hit a weekly usage limit mid-round**, terminating the Russia synthesis agent before it wrote anything and the China/India synthesis agents before they were dispatched. Russia, China and India were therefore synthesised directly in the main session rather than by parallel agents. The raw research findings were pushed to the device *before* synthesis resumed, as insurance; see Secondary observations.

## Headline result

**36 new report nodes, 37 new dependency edges, 45 new `_dropped` entries across 4 new files**, plus substantive rewrites of all four G.1 files' `_dropped` arrays.

| Country | New file | Nodes | Edges | Dropped |
|---|---|---|---|---|
| Brazil | `br-g2-pnadc-siconfi-scn.json` | 9 | 15 | 10 |
| Russia | `ru-g2-rosstat-equalization.json` | 8 | 4 | 14 |
| China | `cn-g2-budget-law-equalization.json` | 9 | 6 | 13 |
| India | `in-g2-finance-commission-chain.json` | 10 | 12 | 8 |

**China and India both went from ZERO edges to a connected chain** — the single clearest advance of the round, and the thing G.1's own Secondary observations predicted would come with depth rather than with more opening nodes.

`npm run validate` and `npm run build` both pass clean: **1114 reports, 1006 dependencies, all 44 logic checks pass, 225 slices, 0 unwired**, `tsc --noEmit && vite build` succeeds. Baseline at the start of this round was 1078 reports / 969 dependencies / 221 slices.

**No `palette.ts` edit was needed this round** — `BR`, `RU`, `CN` and `IN` all received their `COUNTRY_FAMILY` entries at G.1, and no new country was added. **Nothing from this round is git-committed**, per the project's standing rule; all eight changed corpus files were pushed to the device via `SendUserFile` + `device_commit_files`.

## Findings

### 1. Access diagnosis — three of G.1's four "permanent blocks" were misdiagnoses, each a different failure

This is the most reusable result of the round and is stated first because it explains most of what follows. G.1 recorded four hard access walls in good faith. Three were not walls.

**Russia — Rosstat was never blocked.** G.1 recorded `rosstat.gov.ru` as a TLS connection reset and, having no Rosstat-hosted document, sourced Russia's CPI building block indirectly via the Bank of Russia. The real cause is a **trust-store gap**: since 2022 Russian government sites are served under Russia's own national CA ("Russian Trusted Root CA", Минцифры), present in no standard bundle, and the server sends only its leaf certificate. Full diagnosis chain, every step verified: `curl -k` returned HTTP 200 / 827KB; the certificate is genuinely Rosstat's (`CN=*.rosstat.gov.ru`, `OGRN=1047708023483`); the leaf's AIA points at CDP hosts that serve a captcha; the correct intermediate is at `gu-st.ru/.../russian_trusted_sub_ca_2024_pem.crt`, whose SKI `77:3D:D9:39...` matches the leaf's AKI. **The trap: the older, far more commonly cited Russian sub-CA (SKI `D1:E1:71...`) does NOT match and will not validate** — a session that grabs the first Russian sub-CA it finds will wrongly re-confirm the block.

**India — same class of failure, found independently.** `censusindia.gov.in`, `dea.gov.in` and `egazette.gov.in` all failed with `unable to get local issuer certificate`; `curl -k` returned 200 for all three. Two distinct causes: `censusindia.gov.in` serves an **incomplete chain** (missing the eMudhra emSign intermediate), while `dea.gov.in` and `egazette.gov.in` use **Let's Encrypt YR1/YR2** intermediates newer than the container's bundle. A diagnostic trap worth recording: running `openssl s_client` *directly* is misleading, showing the egress gateway's own certificate and verifying cleanly; running it *through the proxy* (`-proxy`), which is what curl actually does, reveals the real upstream certificate. Also: `egazette.nic.in` has **no DNS record at all** and simply does not exist — a different failure previously conflated with the `.gov.in` host. And contrary to G.1's note, **egazette.gov.in's landing page has no CAPTCHA**; the real blocker is a stateful ASP.NET `__VIEWSTATE` postback search.

**China — a 502 that wasn't, and a document hidden in plain sight.** `yss.mof.gov.cn` returning 502 is a **per-path CDN failure, and the root page serves a real 19KB document body alongside the 502 status** — a status-code-only check reports the host dead when it is not. More importantly, G.1 could not find the equalization formula for a reason nobody would guess: **the State Council notice page's HTML body contains only the covering letter, and the 办法 itself, with every formula in it, is an unlinked-from-text `.docx` attachment.** It was retrieved by fetching the attachment URL directly and extracting `word/document.xml` with python's `zipfile`. Separately, `npc.gov.cn` fails TLS (`sslv3 alert handshake failure`) but **works fine over plain HTTP** — and this is *not* a trust-store gap, `openssl s_client` shows a valid chain, so it is a ClientHello rejection: a third distinct failure mode. Finally, the official government search API at `sousuo.www.gov.cn` returns HTTP 200 with populated results **whose ranking ignores the query**, making it useless for discovery in a way its 200 status conceals.

**The one that held: Brazil's STF.** Eight URLs across four STF hosts all returned `000` — bare-socket failures including on domain roots, which is a genuine egress block — and `r.jina.ai` got a real 403 from STF's WAF. This one is real. It also stopped mattering, for a better reason: see Finding 2.

### 2. Brazil — INPC's statutory chain found, the rdpc gap hardened rather than closed, and ADI 875 closed on scope

Nine nodes in `br-g2-pnadc-siconfi-scn.json`, 15 edges — the largest edge count of the round, because Brazil's existing three-file foothold gave the new material something to attach to.

**All three G.1 Brazil leads resolved, two of them not as expected.** (1) INPC's statutory downstream use is found and is bigger than G.1 guessed: **Lei 8.213/1991 art. 41-A** names INPC and IBGE for annual RGPS benefit readjustment, and **Lei 14.663/2023 art. 3º §1º** uses INPC in the permanent minimum-wage valorisation formula. A real modelling subtlety was caught and respected: the annual instrument that actually pays the readjustment (Portaria Interministerial MPS/MF) contains **zero occurrences of "INPC"** — the naming is one hop upstream — so no direct Portaria→INPC edge was drawn. G.1's FGTS hypothesis is simply **false**: FGTS uses TR + 3%. (2) **Resolução CMN 2.615/1999** — the number G.1 declined to assert is correct, and its Art. 1º does name IPCA — **but it is revoked**, verified independently from Resolução 4.367/2014's own Art. 1º. Under the no-discontinued rule it is *not* minted; the correct outcome was to mint nothing. (3) **ADI 875 is closed on SCOPE grounds, not access grounds** — an ADI is a one-off adjudication, not a recurring release or a method-defining instrument, so even a successful fetch would not have produced a node. That closes the lead permanently rather than deferring it a third time.

**The breadth half's best result is a negative.** PNAD Contínua was minted and then the hoped-for edge — PNADC as the source of TCU's "renda domiciliar per capita" column in the FPE calculation — was **rejected on three independent grounds**: TCU still names only the agency; LC 62/1989 §3º does not even name IBGE ("entidade federal competente"); and **decisively, the numbers do not match** — PNADC's published 2023 headline is R$ 1 848 against TCU's R$ 1.892,75. The likely mechanism is an unpublished IBGE→TCU data supply, meaning **there may be no document node behind that column at all**. That is a structural finding about the corpus's limits, not a failed search.

Also minted: **SICONFI/FINBRA** with edges into the existing `br-rreo`/`br-rgf`/`br-lc-101-2000` cluster, plus a bonus node — the **Manual de Demonstrativos Fiscais**, which turns out to be the methodological parent of both existing report nodes. And the **Sistema de Contas Nacionais** and **Contas Nacionais Trimestrais**, both with verbatim `sna-2008` edges.

### 3. Russia — the CPI stand-in retired, and the "paywalled" formula found inside Minfin's own ZIP

Eight nodes in `ru-g2-rosstat-equalization.json`, 4 edges. Both of G.1's headline Russian gaps are closed.

**`ru-rosstat-cpi` finally exists**, from Rosstat's own host, with verbatim four-cadence periodicity («Периодичность Недельная, Месячная, Квартальная, Годовая»), live data files dated 12.08.2026, and the standing methodology order behind it (**Приказ Росстата № 915**, giving the modified Laspeyres formula and the household-budget-survey weights basis). `ru-cbr-monetary-policy-guidelines` no longer needs to stand in for it.

**Постановление 670's operative formula was never paywalled.** G.1 recorded it as locked behind ConsultantPlus's limited free-access window. Minfin publishes the consolidated methodology itself — **bundled inside the ZIP archive it issues as the equalization input data**, alongside 84 per-region `.xls` workbooks. That bundling is exactly why G.1 could not find it: it is not published as a standalone page anywhere. The formula is `БОi = ИНПi / ИБРi`, with both indices defined and worked through in annexes, plus the decisive standing obligation: «Федеральной службе государственной статистики и Федеральной налоговой службе обеспечивать **ежегодно, до 1 августа**, представление в Министерство финансов… информации». That also closes G.1's `no-node-yet` drop, since the input-data publication is now minted.

**Three deliberate negatives, each more interesting than a positive would have been.** (a) The Bank of Russia's key-rate releases **never name Rosstat** — 0 hits for `Росстат`/`статистик` across the full release text. (b) The **Доклад о денежно-кредитной политике was discontinued in February 2024**, verbatim on cbr.ru; not minted, and `ru-cbr-key-rate-decision` minted as the live successor. (c) **Russia's subsistence minimum and minimum wage are NOT CPI-indexed** — since 2021 they are fixed shares of Rosstat's *median income* (44.2%) and *median wage* (42%). This directly contradicts the CPI→benefits pattern this corpus documents across the AF branch, and is recorded with `reason: 'denied'` rather than `no-document`, because a document positively states the mechanism to be something else. A near-miss was explicitly refused: the 2026 budget law sets an indexation coefficient of `1,04` for certain court-ordered payments, numerically equal to its own `4,0 процента` inflation forecast — but the law never connects them, so no edge.

One edge was deliberately **not** minted and recorded as a `caveat` instead: 670's enabling clause («В целях реализации статьи 131 Бюджетного кодекса») states the converse of the `ru-budget-code-art131 -> ru-resolution-670` edge minted at G.1. That is one relationship documented from two sides, not two dependencies, and minting both would put a two-node cycle into a directional-influence graph.

### 4. China — from zero edges to a central-to-provincial chain, hung on the Budget Law

Nine nodes in `cn-g2-budget-law-equalization.json`, 6 edges.

**The hub is 中华人民共和国预算法**, promoted from G.1's `deferred` note to a node because **four separate corpus documents cite it by name in operative voice**: the MOF equalization measures, the annual Budget Report, the annual central final accounts, and a provincial instrument. G.1's finding that the Budget Report "cites nothing by name" is therefore **partly wrong** — it cites 预算法 four times, decisively at 「**根据预算法规定**，预算年度开始后，在全国人民代表大会批准本预算草案前，可安排下列支出…」, which is the legal authority for spending before the NPC approves the budget, not decorative compliance language.

**The 均衡性转移支付办法 formula is recovered in full** — 「某地区均衡性转移支付=(该地区标准财政支出-该地区标准财政收入)×该地区转移支付系数+增幅控制调整+省对下均等化努力程度奖励资金」 — with the definitions of both standard-revenue and standard-expenditure terms, the difficulty coefficient, and an unusually granular cost-difference coefficient weighting population scale 0.85 / area 0.15 and adjusting for altitude, temperature, road conditions and ethnic-minority status.

**The best single find is a provincial instrument.** Ningxia's own equalization measures cite **both** the Budget Law **and** the central 办法 by exact bracketed title in one sentence (第一条), and then replicate the central formula. That is precisely the provincial-cites-central shape G.1's hand-off hoped a later round would find, and it gives the branch its first cross-tier edge.

**国发〔1993〕85号 needed no OCR** — a clean full-text version exists, superseding G.1's scanned-PDF-only conclusion — with the VAT 75/25 split and the 1:0.3 tax-rebate escalator both verbatim. But a caveat is recorded rather than glossed: the only reachable text is on a **provincial `.gov.cn` republication**, not a State-Council-operated host. And **no edge into it was found in either direction**: the 2022 办法 operates its 税收返还 mechanism by name without ever naming the document. No edge may be drawn on mechanism-name overlap.

**China's supranational link is minted**: 中国国民经济核算体系（2016）states in its own text that it was revised to align with 《国民账户体系2008》, giving a documented edge into the existing `sna-2008` node.

**The most-hoped-for edge does not exist.** The PBoC's Monetary Policy Report was scanned two ways across all 55 pages: **0 hits for 统计局**, and all 17 「数据来源」 captions resolve to 中国人民银行 or 中国货币网. It uses CPI nine times, unattributed. Same for the Government Work Report (0 hits for 国家统计局) and the Budget Report (0 hits for 统计). No edges asserted.

### 5. India — the G.1 rejection reinstated on evidence, and the richest chain of the round

Ten nodes in `in-g2-finance-commission-chain.json`, 12 edges — and the round's most satisfying single result.

**G.1 drafted an FC16→Article 280 edge and discarded it** for want of a verbatim in-text citation, preferring an honest `deferred` note. That was the right call on the evidence then available. **The citation exists**, and it is the opening substantive sentence of the report — FC16 Volume I, para 1.2: *"In pursuance of clause (1) of Article 280 of the Constitution of India and the provisions of the Finance Commission (Miscellaneous Provisions) Act, 1951 (Act No. 33 of 1951), the President of India constituted the FC-16 vide Notification S.O. 5533(E) dated 31 December 2023."* The edge is reinstated on evidence, not by relaxing the rule. The same round also found **the constituting Presidential Order itself** (Gazette S.O. 5533(E)), which carries the identical Article 280 citation — so the relationship is now evidenced twice from two separate documents.

**Both Explanatory Memoranda were found** (FC16 on indiabudget.gov.in, FC15 on fincomindia), closing G.1's Article 281 lead — the egazette CAPTCHA was never the obstacle, since they are published as ordinary PDFs. **Census of India 2011 is minted** and FC16's dependency on it is verbatim at para 8.85 and inside the Technical Note's formula.

**The strongest breadth edge**: the Receipts Budget ANNEX-4 footnote — *"As per accepted recommendations of the Sixteenth Finance Commission, the States' share has been fixed at 41% of the net proceeds of shareable Central Taxes"* — annotating a column that reproduces FC16 Table 8.9 **digit for digit**. The dependent document names the source *and* republishes its numbers. That is the edge that makes the Indian chain load-bearing rather than merely documentary: it connects a recommendation to money actually appropriated.

**Discipline held where evidence was thin.** Statement 18, Budget at a Glance and the FRBM statements were all minted or noted as good nodes but given **no** edge to the Commission, because their only reference is the budget-head *label* "Finance Commission Grants" — a head named after an institution is not a citation of a document. The **"(Combined)"** qualifier on India's inflation target is **not asserted anywhere**: no reachable primary source contains that string. And the `in-mospi-nas -> sna-2008` edge was **dropped**, because the NAS release says only "United Nations System of National Accounts (SNA)" without an edition — deliberately consistent with the parallel COICOP decision for China, where the Chinese instrument *does* name the 2008 edition and therefore *does* get its edge.

**One negative settled that G.1 left open**: FC16's Volumes I and II were read in full, including the Technical Note, and FC16 **never names a titled MoSPI GSDP publication** behind its 42.5% Per Capita GSDP Distance criterion. The corpus's largest Indian dependency by economic weight has no documentary target — the same shape as Brazil's rdpc gap, in the same place in the same kind of formula, in two different federations.

## Secondary observations

- **"Permanent block" should be treated as a hypothesis, not a finding.** Three of four countries' G.1 walls fell this round, each to a *different* diagnosis: a national-CA trust gap (Russia), two different chain problems plus a nonexistent DNS host (India), and a per-path CDN 502 plus an unlinked attachment plus a ClientHello rejection (China). The generalisable rule is narrower than "retry harder": **a failure's SHAPE tells you which fix applies, and the shapes are not interchangeable.** `AF/G.24.md` already noted that characterising *why* an access failure happens beats re-confirming *that* it happens; this round is the strongest evidence yet for that note, and it should be promoted to standing dispatch guidance.
- **A status code is not a verification, in both directions.** This round found real documents served *with* error statuses (MOF's 502 with a 19KB body), and bot-challenge pages served *with* HTTP 200 (RBI's TSPD wall, TCU's challenge page). Both fool a status-only check, in opposite directions. Agents must inspect the body.
- **Two of this corpus's evidence rules paid off visibly and in opposite directions in the same round.** G.1's refusal of the FC16→Article 280 edge was vindicated *and* overturned — the standard held, and the edge was real; what changed was reading the dependent document more carefully. Conversely, Brazil's PNADC edge looked obvious and was killed by a numeric mismatch. The lesson is not "be stricter" or "be looser" but that the standard is doing real work in both directions.
- **Stage the repo BEFORE synthesis, not after.** G.1 synthesised first and validated at the end. This round tarred and staged the repository into the cloud sandbox first, so synthesis wrote directly into a working checkout and `npm run validate` ran after every country. Two errors were caught within seconds of being introduced (a `caveat` naming a non-existent edge; a `resolved` note needing real endpoints) that would otherwise have surfaced only at the end of the round. Recommended as the default for all future rounds; the `npm-validate-procedure` memory note has been updated in spirit by this round's practice.
- **The `resolved`/`caveat` endpoint rule bites during lead-chase rounds specifically.** Both reasons require naming an edge that *actually exists*. A round that resolves prior-round leads will trip this repeatedly, because the natural instinct is to describe the resolved lead rather than to name the edge that now embodies it. Budget for it.
- **Save research findings to the device before synthesis.** A subagent hit a weekly usage limit mid-round and terminated two synthesis agents. Because the four raw findings files (~2,900 lines total) had already been pushed to `BRICS/G.2-research/`, nothing was lost and synthesis simply continued in the main session. This is the cheap version of `AF/G.20.md`'s "save each agent's raw findings immediately on return" lesson, and it earned its keep within the hour.
- **A recurring BRICS pattern worth watching**: monetary and fiscal authorities in this branch use the national statistical office's output as ambient fact rather than as a cited source. The Bank of Russia's key-rate releases, the PBoC's Monetary Policy Report, China's Government Work Report and China's Budget Report **all** use CPI figures without naming the statistical agency. This is a real structural feature of the branch, not four coincidences, and a citation-based graph simply cannot represent it. Future rounds should expect central-bank→CPI edges to be *harder* in BRICS than in EU/AU/NZ, and should not read their absence as incomplete research.

## Corrections to prior sessions

Four corrections to `BRICS/G.1.md`, all dated 2026-08-13 and attributable to this session. Per project convention the predecessor file is **not** edited; the corrections live here and in the relevant `_dropped` entries, which were rewritten in place with `RESOLVED 2026-08-13 (BRICS/G.2):` prefixes that preserve each original blocker description.

1. **"Rosstat: completely unreachable by any method tried this round."** Incorrect as a diagnosis. Rosstat was reachable throughout; the failure was a client-side trust-store gap, not a block. G.1's *conduct* was sound — it recorded the failure honestly and substituted a legitimate document — but the conclusion that this was "a genuine, structural finding" about Rosstat's accessibility was wrong.
2. **"Resolution 670's operative formula text is paywalled (ConsultantPlus, evening/weekend-only free access window)."** Incorrect. The consolidated methodology is published by Minfin on its own host, inside the equalization input-data ZIP. No third-party mirror was needed.
3. **"The Budget Report's own text does not cite [the 1994 decision or the 办法] by name"** — this part is **confirmed correct**, but the surrounding claim that the report cites nothing by name is **wrong**: it cites 预算法 four times, operatively.
4. **"No verbatim passage in FC16's own text cites Article 280 by number."** Incorrect. FC16 Volume I para 1.2 does exactly that. G.1's *reasoning* was right and its refusal to mint on inference was right; the factual premise was wrong.

One correction to G.1's own framing rather than its facts: G.1's Secondary observations state that China and India drawing zero edges was "a legitimate branch-opening shape, not a research shortfall," and predicted edges would come with corpus depth. That prediction is now confirmed — but the mechanism was **not** mainly depth. Both countries' first edges came from *re-testing access assumptions* and from *reading documents already in hand more carefully*, not from having more nodes to connect to. A future branch-opening round should not wait for depth before re-reading its own sources.

No corrections to any AF, EU, US, AU, NZ or CA hand-off.

## Thomas's stated priority for the remaining work

Thomas was asked directly what to do next and selected **both** "BRICS round 2 (leads)" and "BRICS round 2 (breadth)" — this round is the execution of that instruction, and both halves are complete for all four countries.

He explicitly did **not** select the two other offered options, and both remain open and unaddressed:

- **"Review the branch first"** — a shape review of the BRICS subgraph (node/edge balance against other branches, where the formerly-zero-edge files now sit, what a multi-round BRICS plan should look like). Still not done. It is a more informed question now than it was before this round, since the branch has real topology to look at.
- **"Git commit backlog"** — declined for now, and now larger. See Cheap checks item 1.

There is still **no multi-round plan on file for BRICS**, and after two rounds that absence is starting to cost something: the leads below are concrete but unranked, and there is no stated view on whether BRICS means these four countries or eventually includes South Africa (already in the corpus via the AF branch as `ZA`) and the newer members. Worth putting to Thomas before a third round rather than assuming.

## Cheap checks still outstanding

1. **Nothing from this round is git-committed.** The uncommitted backlog now spans `AF/G.23`, `AF/G.24`, the singleton camera-fit bug fix, `BRICS/G.1` and `BRICS/G.2` — five bodies of work, all pushed to the device only. This is per the standing rule (committing is Thomas's own step), but the backlog is growing and is worth flagging as a risk in its own right.
2. **`ru-budget-code-art131` still rests on a third-party mirror for its ARTICLE TEXT.** Now precisely characterised rather than merely re-confirmed: pravo.gov.ru's ИПС serves the consolidated Budget Code at HTTP 200 but **hard-truncates at exactly 673,972 bytes, mid-Article 63** — short of Article 131. Nine pagination parameters returned byte-identical responses, so it is a fixed server-side cap, not a paging problem. `actual.pravo.gov.ru:8000` unreachable; duma.gov.ru, government.ru and docs.cntd.ru fail TLS even with the Russian national CA bundle. Note pravo.gov.ru is **HTTP-only** and **windows-1251 encoded** (decodes as mojibake if read as UTF-8 — easy to mistake for a failed fetch). The article's *role* is now TIER A-corroborated via Resolution 670's enabling clause, so only its text is affected.
3. **Rosstat's «Стоимость фиксированного набора потребительских товаров и услуг»** — the highest-value single lead in the Russian branch. Resolution 670's provider table names Rosstat for this exact indicator (row 37) and it feeds the price-level coefficient in the expenditure index. It is confirmed live on the Rosstat price page (EMISS 1.29.6 and Витрина данных entries). **One page fetch would mint the node and immediately close a CONFIRMED edge.** No edge was drawn to `ru-rosstat-cpi` because the fixed-basket *cost* is a different release from the price *index* — `wrong-target`, recorded as such.
4. **A whole-Budget-Code node for Russia.** The 2026 budget law cites the Budget Code four times by article (184-1, 242-3, 242-7, 80) but **never article 131**, so no edge could be drawn to the only existing Budget Code node. Minting a whole-Code node makes four evidenced citations available at once.
5. **A China Statistical Yearbook node.** The equalization measures cite 「统计年鉴等公开资料」 as their data source and name 国家统计局 for three specific series. This is currently the Chinese branch's main structural gap — the fiscal chain and the statistical chain are not connected to each other.
6. **《居民消费价格调查方案》 (China)** — named as the governing instrument for the CPI's scope and method, not retrievable; the related 流通消费价格调查制度 URL is a hard 404. Would give `cn-nbs-cpi` the governing-instrument edge that its bare 「按照统计制度安排」 cannot support.
7. **`in-constitution-art281`** — the cheapest high-value fix on this list. **Two fully evidenced edges are currently stranded** because both Explanatory Memoranda cite Article 281 verbatim and there is no node. Mint it from the same constitutional source `in-constitution-art280` came from.
8. **The Finance Commission (Miscellaneous Provisions) Act, 1951 (India)** — named alongside Article 280 in *both* FC16 para 1.2 and the constituting Order, so two more evidenced edges wait on one node. `indiacode.nic.in` is already proven reachable at TIER A.
9. **The literal India gazette notification (S.O. 2088(E))** — substance verified from two independent primary publishers, instrument not retrieved. Blocker is now precisely known: a stateful ASP.NET `__VIEWSTATE` postback search needing a real browser session. The **"(Combined)"** wording remains unevidenced and must not be asserted without it.
10. **China's 1993 tax-sharing decision on a State-Council-operated host** — full text obtained, but only from a provincial republication. `www.gov.cn/gongbao/` was never successfully searched, partly because the official search API is relevance-broken.
11. **《中华人民共和国2025年全国预算执行情况2026年全国预算（草案）》** — cited twice by exact title in China's Budget Report; the best-evidenced missing node in the Chinese corpus, but tabled at the NPC session with no standalone URL.
12. **India's Economic Survey** — FC16 cites it with table-level precision ("Table 1.6 of Economic Survey 2024-25"). A well-known annual publication; URL unverified this round. May also bear on the unresolved 42.5% GSDP-criterion question.
13. **The household-budget/consumption surveys behind both CPIs** — Rosstat's «обследование бюджетов домашних хозяйств» and NBS's 全国住户收支与生活状况调查 are each named verbatim as their CPI's weights source and neither has a node. Two countries, identical gap.
14. **A CAG-equivalent audit node for China** — 审计署 audits the central final accounts by the report's own admission («草案已经审计署审计»). It publishes a recurring annual audit report, which would give the Chinese branch the accountability tier AF, EU and India all have.
15. **`br-inpc` → FGTS is dead** — recorded so nobody re-chases it. FGTS uses TR + 3%, not INPC.

## What to pass at the start of next thread

Point the next BRICS session at **this file**. It supersedes `BRICS/G.1.md` for current numbers, current state and current open leads; G.1 remains the record of how the branch opened and of four access conclusions that this round corrected (see Corrections).

The branch now has genuine two-round depth in all four countries, with real topology: Brazil's chain is the densest (three files, 15 new edges), India's is the most structurally complete (Constitution → Commission → Budget → central bank → audit), China's is newly connected central-to-provincial, and Russia's is the most institutionally spread but the thinnest in edges. **Fifteen concrete, ready-to-chase leads are listed above**, and items 3, 7 and 8 are each a single fetch away from closing an already-evidenced edge — start there if the next round wants fast wins.

Three process notes carry forward. **Stage the repo into the sandbox before synthesis, not after** (Secondary observations) — it caught two errors in seconds this round. **`r.jina.ai` is currently Cloudflare-403 and cannot be assumed available** as TIER B; G.1 relied on it heavily for Brazil. And the **`palette.ts` sanctioned-edit pattern** remains the correct way to add any further country — none was needed this round, but South Africa/`ZA` already exists via the AF branch and any expansion of "BRICS" beyond the original four will need it.

Before running a third round, consider putting the two unselected options from this round's own question back to Thomas: **the branch shape review** and **the git-commit backlog** (now five bodies of uncommitted work). Neither has been declined outright — both were simply not chosen when the lead-chase and breadth halves were.

## How to write the next hand-off

*(Copied verbatim per project convention, same spec block used by every branch in this corpus.)*

Required sections, in this order: Orientation, Session conditions, Headline result, Findings (numbered `###` subsections, one per country/topic), Secondary observations, Corrections to prior sessions (never omit this section — even "none this session" is itself a claim, state it explicitly), Thomas's stated priority for the remaining work, Cheap checks still outstanding, What to pass at the start of next thread, and this spec block itself, copied verbatim into every hand-off.

Never edit a predecessor file. Corrections to earlier sessions go in the new file's Corrections section, dated and attributable to this session.

Every claim needs a document behind it — a URL/location and, wherever practical, a verbatim quote. "Comparable with"-type language is not a dependency. Tense matters: a PAST-tense arrangement is not a live dependency; flag it if a source's tense is ambiguous. AGENCY ONLY and NOT FOUND are legitimate research outcomes, not failures — record them in `_dropped` with an honest reason, don't leave the question unanswered and don't force an edge that isn't there.
