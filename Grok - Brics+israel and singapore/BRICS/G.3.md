# BRICS/G.3 — International-standards bridge round: Russia and India, 2026-08-17

## Orientation

Direct continuation of `BRICS/G.2.md`, opened by Thomas's instruction "want to wire what you discovered with brics into the graph please?"

That instruction was ambiguous in a way worth recording, because the ambiguity is itself a finding. "Wired" has a specific meaning in this repo — `gen-slices` reports "N slices (0 unwired by rule)" — and by that meaning the BRICS material was already wired: the auto-loader had picked up every G.1 and G.2 file, and validate reported 0 unwired. So the question was measured before it was answered. The measurement showed something worse than an unwired slice:

**All of BRICS connected to the rest of the corpus through exactly 4 edges, reaching only 2 international nodes. Russia and India had ZERO. Thirteen BRICS nodes had no edges at all.** The largest BRICS island was India's 11 nodes; the main corpus component was 393. Two rounds of well-evidenced research were sitting almost entirely outside the graph.

Thomas was shown that measurement with four options and chose **the international-standards bridge** — research each BRICS country's documented adherence to the international instruments the corpus already holds. That is the only route that could connect Russia and India at all, and it is squarely REPORTS.md's own stated secondary objective: mapping *which supranational bodies issue a standard that a national statistic is documented as legally or methodologically dependent on*.

**This round covers Russia and India only.** Brazil and China were not researched — see Session conditions.

## Session conditions

Same evidence-strict standing rule as every branch. One constraint was elevated to the top of every dispatch brief this round and did most of the work:

**THE EDITION RULE.** The corpus holds specific editions as separate nodes — `sna-2008` vs `sna-2025`, `un-coicop-2018` vs `un-coicop-hbs-1999`. An unversioned citation therefore cannot become an edge, because pointing at one edition would assert something the source does not say. Agents were told their highest-value task was to find the documents that *do* name the edition, and to record refusals as fully as successes. Both did. The refusals in `_dropped` are among the most useful content this round produced.

Two environment conditions shaped the round:

- **Both research agents were terminated mid-run by a usage limit** (the account's monthly cap, not a Claude-side fault). Because the briefs required incremental writing to disk rather than batching output, **1,301 lines of findings survived** — Russia 593, India 708, the latter effectively complete. Nothing was lost, and the raw files were pushed to the device before synthesis began. This is the second consecutive round where that habit saved the work; see Secondary observations.
- **Brazil and China were never dispatched.** They were the lower priority by design — Brazil already had 3 bridges and China 1, while Russia and India had none — but the round is a half-round and should be read as one.

`r.jina.ai` remains Cloudflare-403, so no TIER B rendering fallback exists for any branch.

## Headline result

**11 new report nodes, 15 new dependency edges, 22 new `_dropped` entries across 2 new files**, plus one G.2 `_dropped` entry rewritten.

| Country | New file | Nodes | Edges | Dropped |
|---|---|---|---|---|
| Russia | `ru-g3-international-standards.json` | 6 | 7 | 10 |
| India | `in-g3-international-standards.json` | 5 | 8 | 12 |

**The structural result, which is the point of the round:**

| Measure | Before G.3 | After G.3 |
|---|---|---|
| BRICS → non-BRICS bridges | **4** | **19** |
| Distinct international nodes reached | 2 | 8 |
| Main component size | 393 | **419** |
| India nodes in main component | **0 / 15** | **18 / 20** |
| Russia nodes in main component | **0 / 12** | **8 / 18** |

India's entire Finance Commission cluster — Constitution, both Commission reports, both Explanatory Memoranda, the constituting Order, Census 2011, the Union Budget documents, RBI State Finances, the CAG audit report — is now inside the main corpus component, where before it was a closed island.

`npm run validate` and `npm run build` both pass clean: **1125 reports, 1021 dependencies, all 44 logic checks pass**, `tsc --noEmit && vite build` succeeds. No `palette.ts` edit needed. **Nothing is git-committed.**

## Findings

### 1. The cheapest edge in the round required no research at all

`in-mospi-cpi`'s own release document — the July 2026 CPI press release, which is that node's `url` — states verbatim: *"The CPI (Base: 2024=100) series is aligned with the United Nations' Classification of Individual Consumption According to Purpose (COICOP) 2018, comprising 12 Divisions, 43 Groups, 92 Classes and 162 Subclasses."*

Classification, issuing body, **and edition**, in the dependent document's own text. It satisfies the edition rule outright. **That sentence has been quoted inside the `in-mospi-cpi` node description since BRICS/G.1.** What was missing was never the evidence; it was the edge.

This is worth more than one edge. It says the corpus may contain other already-quoted, already-verified dependencies that were never minted because each round was looking outward for new documents rather than inward at the ones it had. A cheap sweep — grep existing node descriptions for the names of international nodes — would likely find more, and is now the top recommendation for a future round.

### 2. Russia — seven bridges, four institutions, every edition named

Six new nodes and seven edges, spanning Rosstat, the Bank of Russia, Minfin, and (through Minfin's order) the Federal Treasury.

**The most valuable edge needed no new node**: `ru-rosstat-cpi-methodology-915 → cpi-manual`. Приказ Росстата № 915 — already in the corpus from G.2 — states «Методология подготовлена с учетом международных рекомендаций, изложенных в … «Руководстве по индексу потребительских цен: Концепции и Методы»¹», and **footnote 1 pins the edition in English inside the Russian original**: *"Consumer price index manual: Concepts and Methods / 2020 / International Labour Organization/International Monetary Fund/…"* with the IMF-hosted URL. The `cpi-manual` node was checked before minting and is the 2020 edition; had it been the 2004 predecessor the edge would have had to be refused. Weakness recorded: «с учетом» is "taking into account", softer than "in accordance with".

**SNA 2008 is named 44 times** in Rosstat's household-sector national-accounts methodology (Приказ № 233), with a full bibliographic footnote and a note that the Russian 2012 UN edition's terminology was used. Five *further* Rosstat orders make the same citation, three with the stronger verb «в соответствии с требованиями» — all six URLs verified and listed in `_dropped` so a future round can broaden coverage without re-researching.

**BPM6** is as explicit as this corpus gets: the Bank of Russia's balance-of-payments commentary opens «Концептуальной и методологической основой является шестое издание Руководства по платежному балансу…(РПБ6)», corroborated by two CBR SDDS metadata sheets that also name BPM6's publication year.

**The SDDS reaches all three Russian producers.** Rosstat's GDP procedure states its release dates are «определенным Специальным стандартом распространения данных МВФ»; the Bank of Russia's SDDS page says the same requirements cover «Данные Росстат, Данные Минфина России»; and Minfin's Приказ 128н recites the SDDS accession resolution **in its enabling preamble** — the standard as part of the legal authority for the order, which is structurally the strongest dependency in the branch. That last edge is nonetheless typed `cites`, not `methodology_depends_on`, because the order supplies authority and a transmission obligation while describing its compilation *method* only by unversioned plural reference.

**GFSM 2014** is named in the title of Minfin's annual KOSGU correspondence table («СГФ - 2014»), and deliberately not drawn from Приказ 128н, whose operative text names only unversioned «руководствами».

### 3. India — eight bridges, and the whole Finance Commission cluster comes inside

Five new nodes and eight edges. Beyond the COICOP edge in Finding 1:

**The structurally decisive edge is the weakest one.** `in-fc15-report → imf-weo`, typed `uses_data_from`, rests on two footnotes — *"1 World Economic Outlook, October 2020"*. It matters out of all proportion because FC15 sits *inside* India's main eleven-node component, so that single footnote is what pulls the entire Finance Commission cluster into the corpus graph. A round optimising for edge strength would have skipped it.

It also forced a corpus-level ruling, recorded in the edge's basis: **`imf-weo` should NOT be edition-split.** The WEO is a *recurring publication*, not a standard with successor editions held apart — citing its October 2020 issue is like citing one month of a monthly index, and points at the series node correctly. That is a different situation from SNA 2008 vs SNA 2025.

**SNA 2008 is finally named in current Indian text.** G.2 had to refuse `in-mospi-nas → sna-2008` because the NAS release says only "System of National Accounts (SNA)" and the only "SNA 2008" strings sat in a FAQ and an OBSOLETE-watermarked volume. The National Accounts Division's Feb 2026 GDP base-revision report opens Chapter 2: *"As per recommendations of System of National Accounts (SNA)-2008, NAD industry-wise estimates of GDP are compiled using institutional sector approach."* No watermark. Minted as its own node — **not** attached to `in-mospi-nas`, because that node's own document still doesn't say it.

Also minted: **NIC 2025 → ISIC** (*"Based on ISIC Rev. 5: NIC-2025 is aligned with the latest international standard"*, with the sixty-year lineage back to SIC 1962 documented in the same table); the **Ministry of Finance external-debt report → SDDS**; and the **RBI's balance of payments → BPM6** (*"BoP data are presented in the revised format as per BPM6"*, with a tense caveat stated in full — the verified article is the 2011 transition issue, minted only because two independent present-tense confirmations exist).

### 4. The refusals, which are the round's other product

Twenty-two `_dropped` entries. Three deserve reading:

**Every Rosstat COICOP citation is unversioned — and the dating argues against the edge.** Приказ 915 discusses COICOP substantively; a full-text search of all 96 pages returned **zero** occurrences of `2018` or `1999`. The strongest derivation wording found anywhere — «Классификация КИПЦ разработана на основе функциональной классификации … (COICOP)» — is still unusable, because the year in that sentence attaches to СНС, not COICOP. **Decisively:** a sibling instrument dates Russia's КИПЦ-ДХ classifier to Rosstat order № 304 of **2 August 2013**, which *predates COICOP 2018* — so an edge to `un-coicop-2018` would be not merely unsupported but affirmatively likely to be **wrong**.

**A verified-looking IPSAS edge was refused for lack of raw verification.** GASAB's IGFRS 1 reportedly contains a residual normative dependency — *"the Government entity shall follow relevant International Public Sector Accounting Standards (IPSAS), till an appropriate IGFRS is formulated"* — which would be the strongest possible form. But `gasab.gov.in` returns `curl: (35) Recv failure` on both the document and the site root, verified twice this session. The agent reached it only through WebFetch, on a different egress. Since AF/G.24 established that WebFetch has fabricated content for unreachable URLs, **no edge, no node**. The quotes read entirely plausibly — which is exactly why the rule exists.

**"Russia follows IPSAS" is not supported by primary Minfin text.** Four Minfin documents were fetched and searched, three OCR'd: the ФСБУ ГФ programme order and the Концептуальные основы standard both return **zero** occurrences of «МСФО» or «международн» and cite only domestic law. Minfin *does* publish the official Russian translation of IPSAS — but hosting and translating a standard is not a statement of dependency on it.

## Secondary observations

- **Incremental writing saved the round, again.** Both agents died mid-run on a usage limit; both had been instructed to write findings to disk after every item rather than batching. 1,301 lines survived, India's file effectively complete. This is now two consecutive rounds where the `AF/G.20` "save raw findings immediately" lesson has paid, and it should be standing dispatch policy rather than a per-round instruction.
- **Measure before you answer an ambiguous instruction.** "Wire it into the graph" had a benign reading (already true) and a serious one (four bridges holding up two rounds of work). Ten minutes of component analysis distinguished them and turned a vague request into a scoped round with a numeric success criterion. The component map is cheap and should be re-run at the end of any branch round.
- **Structural value and evidential strength are different axes.** The strongest edges this round (BPM6, SNA 2008 — explicit, edition-named, first-person) connected *new* nodes. The edge that actually pulled India's main cluster into the corpus was a **footnote**. A round that ranked leads purely by evidential strength would have deprioritised the one that mattered most topologically. Worth ranking leads on both axes in future.
- **The edition rule is doing real work, in both directions.** It refused four edges this round and permitted eleven, and in the Russian COICOP case it prevented an edge that positive evidence suggests would have been factually wrong. It also needed one clarification: it applies to *standards with successor editions held as separate nodes*, not to *recurring publications*, which the corpus deliberately models as one node per series. `imf-weo` is the latter; `isic` and `ipsas` are deliberately unversioned family nodes and raise no edition question at all.
- **Check the target node's identity before minting.** `cpi-manual` had to be confirmed as the 2020 rather than 2004 edition before two edges could be drawn; `isic` had to be confirmed as an unversioned family node before the ISIC Rev. 5 citation could point at it; and `icls-work-statistics-resolution` had to be confirmed as the *19th ICLS on work statistics* to establish that Rosstat's citation of the *17th ICLS on consumer price indices* must **not** be pointed at it. Three near-misses, all caught by reading the target node first.

## Corrections to prior sessions

**None to any prior hand-off's factual claims.** BRICS/G.2's four corrections to G.1 stand unaltered, and nothing in G.1 or G.2 was found to be wrong this round.

One thing is *superseded in part* rather than corrected: G.2's `_dropped` entry refusing `in-mospi-nas → sna-2008` remains correct at that node, but India's national accounts are now attached to SNA 2008 elsewhere in the corpus via `in-mospi-gdp-base-revision-2026`. That entry was rewritten in place to say so, preserving its original reasoning, so a future session does not read the new edge and conclude the old refusal was an oversight.

Two small corrections to G.2's own *access notes*, recorded because they will waste a future session's time otherwise: the Russian root CA is at `russian_trusted_root_ca_pem.crt` (the `root_ca_ssl_rsa2022.crt` path recorded at G.2 now 404s), and the Bank of Russia has **moved** its balance-of-payments section from `cbr.ru/statistics/macro_itm/svs/` (now 404) to `cbr.ru/statistics/macro_itm/external_sector/pb/`. Also new since G.2: `minfin.gov.ru` now returns 503 to a bare curl on any sub-path and needs a cookie-plus-User-Agent handshake.

## Thomas's stated priority for the remaining work

Thomas asked for the BRICS material to be wired into the graph, and chose the international-standards bridge from four options. That is done for **Russia and India**, which were the two countries with zero bridges and therefore the whole point of the exercise.

Explicitly outstanding from his own earlier choices:

- **Brazil and China bridge research** — not dispatched this round. China is now the least-connected BRICS country at 1/12 nodes in the main component, and has a known unresolved COICOP-edition question from G.2 plus a China Statistical Yearbook gap. Brazil sits at 3/24 with its remaining nodes in separate domestic clusters.
- **The de-orphan pass** — the second option he was offered and did not pick. Thirteen BRICS nodes had no edges at all before this round; the bridge work reduced that but did not target it.
- **The branch shape review** — offered at G.2, still not done.
- **The git-commit backlog** — now **six** bodies of uncommitted work (AF/G.23, AF/G.24, the singleton fix, BRICS/G.1, G.2, G.3).

## Cheap checks still outstanding

1. **Grep existing node descriptions for international-node names.** Finding 1 showed one fully-evidenced, edition-named edge sitting unminted inside a node description for two rounds. This is a near-zero-cost sweep across the whole corpus, not just BRICS, and is the single highest-value item on this list.
2. **Brazil and China bridge rounds** — the unfinished half of this round.
3. **GASAB IGFRS 1 → IPSAS (India)** — one successful fetch from a network that can reach `gasab.gov.in` mints a node and an edge, and connects India's public-sector accounting to the same `ipsas` node Brazil's `br-mcasp` already reaches.
4. **ILO 17th ICLS Resolution concerning consumer price indices (2003)** — a new international node; Rosstat cites it by conference number, so the edge is immediate. Must **not** be pointed at `icls-work-statistics-resolution`.
5. **IMF Quarterly National Accounts Manual (2001)** — new international node; Rosstat's GDP procedure cites it with the year. Likely to serve other branches too.
6. **IMF External Debt Statistics Guide (2013, and 2003)** — new international node; India's external-debt report cites both editions for different purposes.
7. **Five further Rosstat SNA-2008 orders** — all six URLs verified and listed in `ru-g3-international-standards.json`'s `_dropped`; three use a stronger conformance verb than the minted node and one may deserve promotion.
8. **ОКВЭД → ISIC (Russia)** — Приказ 915 invokes ОКВЭД 2 without stating its NACE/ISIC derivation; the derivation is documented somewhere in Rosstat's classifier material.
9. **Census of India 2011 → UN census principles** — a genuine surprise as a NOT FOUND; likely a search limitation rather than an absence.
10. **CAG Auditing Standards 2017 → INTOSAI ISSAIs (India)** — cites the ISSAI framework but not the two ISSAIs the corpus holds; mint the standards plus whichever ISSAIs it names.
11. **RBI Working Group on BoP Manual (2010)** — a cleaner source node for the BPM6 edge than the transition-quarter bulletin article minted here.
12. **A current RBI quarterly BoP press release** — would remove the tense caveat on the BPM6 edge; blocked by the `rbidocs.rbi.org.in/rdocs/PressRelease/PDFs/` bot-wall.
13. **PEFA Framework (2016)** — cited with a full methodological description in FC15; the corpus already holds one PEFA-derived African document, so the node would serve more than one branch.
14. **ПП РФ № 1226/1997** — the Russian SDDS accession instrument; would make the Minfin→SDDS chain structurally faithful.
15. **FC16 Volume II** — not scanned for international standards; Volume II carried FC16's richest data-source citations at G.2, so the "FC16 names no international standard" negative is not yet settled.

## What to pass at the start of next thread

Point the next BRICS session at **this file**. It supersedes `BRICS/G.2.md` for current numbers, component structure and open leads; G.2 remains the record of the fiscal-chain build and of four access conclusions it corrected in G.1.

The branch is no longer a set of islands. Russia and India are attached to the international layer through 15 documented, edition-named dependencies, and India's main cluster is inside the corpus's largest component. **Brazil and China are the unfinished half** — China especially, at 1/12 nodes connected.

Start with item 1 on the list above. It costs almost nothing and the one instance already found suggests there are more.

Three process notes carry forward. **Require incremental writing in every research dispatch** — it has now saved two consecutive rounds from usage-limit terminations. **Re-run the component measurement at the end of every branch round**, because "is it in the graph" turned out to be a different question from "does it validate". And **read the target node before minting an edge at it** — three near-miss wrong-target errors were caught that way this round.

## How to write the next hand-off

*(Copied verbatim per project convention, same spec block used by every branch in this corpus.)*

Required sections, in this order: Orientation, Session conditions, Headline result, Findings (numbered `###` subsections, one per country/topic), Secondary observations, Corrections to prior sessions (never omit this section — even "none this session" is itself a claim, state it explicitly), Thomas's stated priority for the remaining work, Cheap checks still outstanding, What to pass at the start of next thread, and this spec block itself, copied verbatim into every hand-off.

Never edit a predecessor file. Corrections to earlier sessions go in the new file's Corrections section, dated and attributable to this session.

Every claim needs a document behind it — a URL/location and, wherever practical, a verbatim quote. "Comparable with"-type language is not a dependency. Tense matters: a PAST-tense arrangement is not a live dependency; flag it if a source's tense is ambiguous. AGENCY ONLY and NOT FOUND are legitimate research outcomes, not failures — record them in `_dropped` with an honest reason, don't leave the question unanswered and don't force an edge that isn't there.
