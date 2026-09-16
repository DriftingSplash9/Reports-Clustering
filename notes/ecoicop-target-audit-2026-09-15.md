# ECOICOP target audit — 2026-09-15

**The question, from `HANDOFF.md` §3 [Agent] item 1:** the 2026-09-14 round wired 31 national
nodes to `eu-ecoicop` off Eurostat's national HICP reference metadata — pages that describe the
HARMONISED index. Romania's showed that a node can be the NATIONAL CPI while the page describes a
separately published harmonised series, which is the mismatch that made the 2026-09-15 round
refuse to wire `de-destatis-cpi` and `tr-cpi`. **How many of the 31 have it?**

**ANSWER: ONE. Romania.** A second, Switzerland, is the same family and a weaker case. The other
29 are sound. All 31 ESMS pages were re-fetched and read for this; the method and the full table
are below so the answer is checkable rather than asserted.

## Method

Two facts per country, one from the corpus and one from the document:

1. **What the node is**, from its own title and description — the harmonised index, the national
   index, or a release that carries both.
2. **How the NSI publishes the harmonised index**, from §10.1 *Dissemination format - News
   release* and §10.2 *Publications* of that country's ESMS page. Those two fields say outright
   whether the HICP has a release of its own, rides inside the national CPI release, or is only a
   database series.

**A mismatch is a node that is the national index alone while the NSI publishes the harmonised
index as its own series.** A node that carries BOTH indices is not a mismatch — the harmonised
series is inside it — and a node that is the harmonised index alone is not one either.

## Result

| node scope | count | mismatch? |
|---|---|---|
| carries both the national and the harmonised index | 22 | no — the ECOICOP edge lands on a node that contains the harmonised series |
| the harmonised index alone (AT, DE, EL, HR, IS, LT, LU, SE) | 8 | no — the node IS what the page describes |
| **the national index alone (RO)** | **1** | **YES** |

### The one: Romania

`ro-ins-ipc` is titled *Indicele Prețurilor de Consum (IPC) — Consumer Price Index*, its
description is entirely about the IPC and its Household Budget Survey weights, and its url is
INS's IPC methodological notes. Romania's ESMS §10.1: *"The press release is referring to the
monthly, annual and the 12 month average rate of HICP and is available simultaneously to all users
when the CPI press release is published."* **A distinct HICP release exists**, which is what
`eu-national-chains-2026-08-28.json` already said from the other direction — the IAPC is *"a
distinct series from the national IPC and is what Eurostat aggregates."* So `ro-ins-ipc ->
eu-ecoicop` and `ro-ins-ipc -> eu-reg-2016-792` both name a classification and a legal basis that
belong to the IAPC. **Not corrected here** — rule 13 says caveat and defer, and the correction
needs the `ro-ins-iapc` node, which is still blocked on finding INS's own IAPC page. Route:
`notes/eu-statutes-2026-09-15.md` §5.

### The second, and why it is weaker: Switzerland

`ch-bfs-lik`'s TITLE claims both indices, so by the test above it is not a mismatch. But every
quoted word of evidence in its description is about the LIK, its url is an FSO explainer on the
LIK, and Switzerland's ESMS §10.2 names a distinct FSO product with its own pages in three
languages: *"The HICP is published on the website of the Federal Statistical Office: English site:
Harmonised Consumer Prices | Federal Statistical Office"*. The headline Swiss HICP rides in the CPI
press release; the detailed series does not. **The node's claim to carry the harmonised index rests
on our own title rather than on anything quoted**, which is the shape worth recording even though
it fails the mismatch test.

## What the audit turned up that was not the question

**Five of the 31 nodes carry a Eurostat metadata page as their OWN `url`** — the publisher is a
national statistical institute and the url points at Eurostat's description of the series:

| node | publisher | the NSI page its own ESMS page names |
|---|---|---|
| `ee-stat-hicp` | Statistics Estonia | §10.3 — *"IA023: HARMONIZED INDEX OF CONSUMER PRICES, 2005 = 100 (MONTHS)"* in the Statistics Estonia database |
| `hr-dzs-hicp` | Croatian Bureau of Statistics | §10.1 — *"First release – Consumer price index"* on the CBS website |
| `is-hagstofa-hicp` | Statistics Iceland | §10.3 — *"HICP - Statistics Iceland"*; §10.2 confirms data are updated on `statice.is` |
| `lt-vda-hicp` | State Data Agency | §10.1 — HICP and flash-estimate press releases, online |
| `sk-susr-cpi` | Statistical Office of the Slovak Republic | §10.1 — informative report |

This is the **node-url defect from `notes/node-url-audit-2026-09-15.md` in a form that file's
instruments do not catch**: `isBareHost` and `isIndexPage` both pass, because a Eurostat ESMS page
is neither bare nor an index — it is a real document about the right series, published by the wrong
body. **This was repaired the same day and TWO OF THE FIVE LANDED** — I predicted five reads with
the answers already in hand, and the prediction was wrong in the same direction the BPS pass was
wrong: naming a page is not the same as having a usable one.

| node | verdict | now |
|---|---|---|
| `ee-stat-hicp` | **repaired** | `www.stat.ee/en/metadata/20407` — Statistics Estonia's own page, opening *"The Consumer Price Index (CPI), the Harmonised Index of Consumer Prices (HICP) and the Harmonized Index of Consumer Prices with Constant Taxes (HICP-CT)"*, which is exactly this combined node's scope |
| `is-hagstofa-hicp` | **repaired** | `statice.is/statistics/economy/prices/hicp/` — page title *"HICP - Statistics Iceland"* |
| `hr-dzs-hicp` | refused | **no such page exists.** Croatia's §10.1: the HICP *"is published together with the CPI in the form of the first release"*. The DZS prices page fetched 200 at 1.35 MB and carries **no link whose url or text matches `harmoni` anywhere** — a section listing in substance, though `isIndexPage` does not flag it |
| `lt-vda-hicp` | refused | the one link naming the artefact answers **403** to this container, and Chrome was not connected this session. Candidate recorded; one Chrome fetch closes it |
| `sk-susr-cpi` | refused | the only first-party candidate is a DataCube `#!` route, which the repo's **own `isBareHost` reads as BARE** — repairing to it would ADD one to the 1,014 while looking like a fix |

**Three refusals, three different reasons, and only one is a retrieval problem.** Estonia needed a
second choice too: the `andmed.stat.ee` table its §10.3 names answered HTTP 500, so the metadata
page named alongside it was used. Per-node verdicts:
`Claude outputs/eurostat-url-repair-2026-09-15/verdicts.json`.

**EVERY NODE URLS FIGURE IS IDENTICAL BEFORE AND AFTER** — 1,014 bare, 126 index, 20 missing, 451
zero-edge-and-bare. That is the finding rather than a disappointment: a foreign-publisher document
is invisible to both checks, which is exactly why this class had never been counted. **A repair
that moves no number is the signature of a defect no instrument watches.**

**Three countries publish no HICP news release at all** — Estonia (*"Released by Eurostat"*),
Iceland (*"None."*) and Latvia (*"No news release is issued for the HICP."*). **None of the three
is a Türkiye case**, and the distinction is the one that ruling turned on: all three publish the
series in their own national database (§10.2/§10.3 above), where Türkiye's §10.1 says the data go
*"directly to Eurostat, which disseminates the figures"* and TurkStat publishes nothing. **A
missing press release is not a missing publication.** Luxembourg is the cleanest proof: §10.1 says
*"No news release is published for the HICP"* and §10.2 names the publication anyway —
*"Indicateurs à court terme - Série A1 bis : Indice des prix à la consommation harmonisé (IPCH)"*,
which is a better url for `lu-statec-ipch` than the dossier page it carries.

## For anyone re-running this

The discriminator is **§10.1 plus §10.2 together, never §10.1 alone** — §10.1 answers "is there a
press release", which is not the question. The pages are one `curl` each at
`ec.europa.eu/eurostat/cache/metadata/EN/prc_hicp_esms<hi3|hi4>_<cc>.htm`; the current split is in
`notes/eu-classification-statute-2026-09-14.md` §2 and Greece is `_el`. All 31 answered 200 on
2026-09-15.
