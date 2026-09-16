# EU statute layer, second round — 2026-09-15

Companion to `src/data/research/eu-statutes-and-de-hicp-2026-09-15.json`. Nothing here is a
rule; the one rule this round produced is in `PLAYBOOK-CORPUS.md` §6 with its reasoning in
`playbook/corpus-evidence.md`. What is here is the route, which rots, and the two negative
results a later round would otherwise re-derive.

## 1. CELLAR — the four acts, resolved

`notes/eu-classification-statute-2026-09-14.md` §1 has the recipe and it still works unchanged.
These are the resolutions captured 2026-09-15, so a later round does not repeat the negotiation.
**Cite the resolved `DOC_1` URL, never the `celex/` one** — a plain GET reads it with no header.

| act | CELEX | resolved DOC_1 |
|---|---|---|
| ESA 2010 (549/2013) | `32013R0549` | `…/cellar/41239b25-9bba-4c36-9b25-926d90511bb3.0007.02/DOC_1` |
| CPA (451/2008) | `32008R0451` | `…/cellar/0beeb2b1-a35d-4764-9a93-4f0a9ed54488.0006.02/DOC_1` |
| NACE Rev. 2 (1893/2006) | `32006R1893` | `…/cellar/361cc2e8-c462-4088-8e87-ba6c99b84588.0005.03/DOC_1` |
| EBS (2019/2152) | `32019R2152` | `…/cellar/fcfa2418-209c-11ea-95ab-01aa75ed71a1.0006.03/DOC_1` |
| European statistics (223/2009) | `32009R0223` | `…/cellar/d3a247f3-7458-4c24-a96a-7b5670defd10.0006.03/DOC_1` |

Prefix every one with `http://publications.europa.eu/resource`. All five answered 200 to a plain
GET. **549/2013 is 15.7 MB of XHTML — the full Annex A, not the articles alone**, which is why it
paid for three separate questions this round and will pay again.

**Every act references its own number exactly ONCE**, in its OJ title block, thousands of
characters above Article 1. That is why an act cited as the legal basis OF its own classification
grades B `artefact-named-elsewhere-in-document` — the `eu-ecoicop -> eu-reg-2016-792` precedent —
and it is a property of the document class, not of any one act. Do not go looking for a better
span; there is not one.

## 2. Why no statute node was minted, and when the ECOICOP precedent transfers

The full account is the first `_dropped` entry in the round's slice. In one line:
**`esa-2010`, `cpa` and `nace-rev2` ARE those acts already** — each node's `url` is that act and
each description quotes its Article 1 — so a statute node beside them is a second node for one
document. The test that separates this from ECOICOP: **is the classification one annex of an act
that does substantial other work, or is the act essentially the classification's enactment?**
Regulation (EU) 2016/792 is the whole HICP framework and 34 nodes cite it without citing ECOICOP.
Regulation (EU) No 549/2013 is the ESA and nothing else.

## 3. The national HICP layer — what the four remaining countries actually need

The 2026-09-14 round left Germany and Türkiye unwired and called them the same shape. They are
not, and two more countries were found in the same sweep:

- **Germany — MINTED.** `de-destatis-hvpi`. Destatis gave the German HVPI **its own topic page on
  10 September 2026** (`destatis.de/EN/Themes/Economy/Prices/HICP/_node.html`, German at
  `…/DE/Themen/Wirtschaft/Preise/HVPI/_inhalt.html`); before that the HICP content sat under the
  CPI page, which is why the corpus held only `de-destatis-cpi`.
- **Türkiye — REFUSED, and not for want of evidence.** Eurostat's Turkish metadata §10.1:
  *"no separate news release is published for the HICP. HICP data are transmitted directly to
  Eurostat."* TurkStat publishes no Turkish HICP, so no node can carry a publisher's own title
  for it. `unpublishable-source`. **Do not re-open this without a TurkStat release to point at.**
- **Czechia and Albania.** Both ESMS pages read in full: **neither carries a country-specific
  transmission sentence**, only the all-NSI dissemination boilerplate that is on all 32 pages.
  Their `eurostat-hicp` feed edge needs the NSI's own page, the way Sweden's was taken off SCB's.
- **Romania — the interesting one.** See §5.

**A correction to carry forward.** `notes/eu-classification-statute-2026-09-14.md` §2 says
Türkiye's §6.1 "does NOT carry the 2016/792 sentence". **The page carries the regulation; it does
not carry the template WORDING** — it is written fresh, and adds a national paragraph on
Statistical Law No. 5429. A check searching for the template span reports it missing. An ESMS
field can be present and invisible to a span search at the same time.

## 4. Where the ESMS transmission sentence lives, when it exists

Rule 16 sends you to Eurostat's national metadata for "which standard". For **"does this country
feed the aggregate"** the sentence, where a country has one, is in the sub-index coverage field
rather than anywhere named for transmission — DE and FR both phrase it as *"sub-indices with a
weight accounting for more than one part of a thousand … are transmitted to Eurostat"*, RO as
*"The indices are transmitted to Eurostat and published each month"*. Grep the page for
`transmitted to Eurostat` and read what surrounds it; a hit in a price-collection paragraph is
about the collector sending prices to head office, not about Eurostat.

## 5. insse.ro — the blocked-verdict decay, and which machine

`eu-national-chains-2026-08-28.json` recorded insse.ro as `ROBOTS_DISALLOWED / ConnectTimeout` on
8 of 14 attempts and advised a retry. Re-probed 2026-09-15 **from two machines, and they disagree**:

- **The cloud container cannot reach it at all.** Every attempt dies as `curl` exit 35, the agent
  proxy closing the tunnel mid-exchange. That is this container, not the site.
- **Thomas's Chrome reaches it and renders it.** `insse.ro/cms/ro/content/ipc-serii-de-date`
  returned its real article text first try. §7b: a read in Thomas's own Chrome is a DIRECT read.

Two guessed paths for the IAPC's own page 404'd, so **the node still needs someone to find the
right page — but the host is no longer the obstacle and the browser is the route.**

**And the reason it matters beyond one edge.** The 2026-08-28 note says Romania's IAPC is a series
*distinct from* the national IPC and is what Eurostat aggregates. If that holds, then
`ro-ins-ipc -> eu-ecoicop` and `ro-ins-ipc -> eu-reg-2016-792`, both minted 2026-09-14 off a
metadata page describing the HARMONISED index, sit on the wrong node — the same mismatch that made
this round refuse to wire `de-destatis-cpi` and `tr-cpi`. Rule 13 says caveat and defer, so
neither edge was touched. **The open question is how many of the 31 national ECOICOP edges point
at a national CPI node whose harmonised index is a separately published series.** That is a
measurement over 31 pages, not a research round, and it is in `HANDOFF.md` §3.
