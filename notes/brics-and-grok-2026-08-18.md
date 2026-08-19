# BRICS and Grok — what the archive became

A record of the 2026-08-18 session that turned a week of Grok output into a
staged, schema-clean corpus. Two halves: **what was done**, and **what was
decided but not yet done**. Nothing here was minted into the graph.

The working state lives in `Grok - Brics+israel and singapore/consolidated/`;
`HANDOFF.md` is the operational document for whoever picks this up next. This
file is the account of how it got there and why.

---

# Part 1 — What was done

## The starting position

293 batch files from Grok, spread across four zips, a `grok-batches/raw/` folder,
and forty loose JSONs at the top of the archive folder. Three overlapping copies
of the same material. No single view of what was in there.

## Consolidation — 293 files to 37

One JSON per country. **1,999 reports, 983 dependencies, 357 dropped notes.**

The first thing the merge found was that **136 of the 219 files in
`grok-batches/raw/` were not valid JSON.** All 136 failed identically:
`"releases_per_year": continuous",` — the opening quote missing. Repaired by
re-quoting the value verbatim; no number was invented anywhere.

The second was that the archive is three different qualities of data, and the
split matters more than the alphabet:

| Tier | Countries | State |
|---|---|---|
| `v2` | Brazil, China, Egypt, Ethiopia, India, Russia, Israel, Singapore, BRICS-international | Correct container, real edges with basis and evidence URL |
| `legacy+edges` | The ten Latin American countries | Old container, real sourced edges, converted |
| `candidates-only` | Afghanistan, Indonesia, Iran, Iraq, Japan, Myanmar, Philippines, Saudi Arabia, South Korea, Syria, Taiwan, Thailand, Türkiye, Vietnam, Yemen | Nodes only — **722 nodes and zero edges between them** |

## Schema alignment

Every mechanical violation of `src/lib/types.ts` fixed, with the original value
preserved on the record under an underscore-prefixed key and every change counted
in each file's `_normalisation` block.

| Problem | Scale |
|---|---|
| `relationship_type` outside the four valid values | **285 edges** |
| `jurisdiction_level` outside the six-value union | 1,236 nodes |
| `last_updated` absent (a required field) | 2,218 nodes |
| `domains` outside the approved list | 5,770 uses, 985 distinct tags |
| `source_kind` outside `official \| commercial` | 284 nodes |
| `region` null or missing | 187 nodes |
| Text sitting in the numeric cadence field | 719 nodes |

The edge types were the dangerous one. `part_of` (167), `produced_by` (49),
`related_to` (34), `complements` (26) and `contains` (8) are all off-union, and an
off-union value makes the edge weight `NaN` — which spreads through the PageRank
iteration to **every score in the graph**. Containment moved onto the child node
where it belongs; `produced_by` edges were dropped, since a publisher is a string
on the report and never a node of its own.

## URL research — 709 gaps, 373 closed

Every node without a link was researched, one country at a time, under one rule:
a URL goes in only if the page was actually retrieved and its content confirms the
publication. Homepages, Wikipedia, news, aggregators and mirrors were rejected.
Each accepted URL carries the confirming observation in `_url_evidence`.

304 in the first pass, 68 on a retry, 1 from Grok. **Coverage went 69% → 99%.**

The retry's yield came almost entirely from **successor domains** rather than
persistence — ministries reorganise and their statistics move. `fia.mpi.gov.vn`
became `fia.mof.gov.vn`; `ipb.moea.gov.tw` is alive as `land.bip.gov.tw`;
`stat.gov.tw` serves the census PDFs that `dgbas.gov.tw` refuses. Sitemaps cracked
the JavaScript-only sites; where a ministry was blocked, the national statistics
office had often published the same series anyway.

## The finding underneath the URLs — 309 nodes were not publications

Confirmed by going and looking, not inferred. Synthesised `<cc>-batchN-meta` nodes
whose own descriptions say they "bind" the batch together — roughly one per batch
across the whole archive — plus framing nodes, geographic areas, industries,
projects and institutions. Every category is banned by the data spec.

Stripped into `consolidated/_archive/`, in full, nothing lost. Cost: **4
dependency edges.** That tier had almost no edges to lose.

## Grok's second opinion

75 items were handed back to Grok: 34 with no URL, 41 carrying a series-level URL
rather than their own. Grok found **one** new URL — Afghanistan's MAIL report
index, which was re-fetched and confirmed.

One of 34 sounds like a failure. It was the opposite. **All 41 series-level URLs
came back byte-identical**, and **33 of 34 dead ends came back dead for the same
reasons.** Two systems on different network paths converging turns "we could not
find it" into "it is not findable", which is a claim you can act on. Grok also made
six eligibility calls that were applied — `ve-humvenezuela` has a civil-society
publisher, not an official body; five others have no discrete published product.

## Cadences

Every node with a vague text cadence and a working URL had that URL fetched and the
release frequency read off the publisher's own page. **292 resolved to real numbers**
with the evidence stored alongside.

Two things fell out that matter more than the numbers. **22 nodes are one-off
instruments misfiled as recurring series** — Indonesia's RPJMN is Perpres 12/2025,
the Philippines' "defence budget" node is Republic Act 12314, Vietnam's digital
strategy is Decision 749/QĐ-TTg signed once in 2020. They had invented cadences
attached. And **a dozen series are dormant**: Myanmar's monthly CPI stops at
December 2020, Afghanistan's DAB inflation reports at July 2021, Syria's CPI at
August 2020. Each records the cadence it had while running, with the halt noted.

## The held-back edges — 60 examined, 14 survived

Each had arrived typed `related_to` or `complements` with a basis asserting a theme
rather than citing a document. Re-checked one at a time against primary sources:
**10 accepted, 4 reversed, 46 rejected.** Rejection was the expected outcome.

The four reversals were real dependencies pointing the wrong way. BCRA's own note
says the balance of payments consumes the exchange-market data, not the reverse.
DANE's EMMET was redesigned *from* the EAM frame. Ecuador's ENDI draws its sample
from INEC's master frame, and the health ministry is a listed *user* of it.

Two rejections found the node wrong rather than the edge: `sr-deuda` cites the
central bank, which does not publish public debt at all, and `sr-bosbouw`'s series
is published by SBB, not the page it names.

## The validator was red, and had been for days

`npm run validate` failed with **155 errors** before this session touched anything.
152 were domain tags carrying the `proposed:` prefix.

That prefix is not a mistake — it is what the data spec tells researchers to use for
genuinely new vocabulary, so a tag enters visibly and gets reviewed. But `validate()`
in `graph.ts` rejected any tag outside `DOMAINS` outright. **The honest move failed
the build and the dishonest one passed it**: announce new vocabulary, go red; quietly
reuse whichever approved tag was closest, go green.

Nobody took the dishonest option. At the moment it was fixed the corpus held 152
prefixed tags and **not one bare unknown tag**. Everyone had followed the convention
and the validator had simply been red long enough to stop being read.

Fixed by teaching the rule the prefix — bare unknown is still an error, prefixed is a
warning plus an inventory of which proposed tags are used enough to promote. Then:

- **18 domains promoted** into `Domain` and `DOMAINS`: trade, living-standards,
  public-finance, industry, energy, external-sector, poverty, development-finance,
  investment, environment, governance, services, statistical-system, infrastructure,
  mining, housing, tourism, general-statistics.
- Synonyms merged (`prices`→`inflation`, `employment`→`labour`, `demography`/`census`→
  `population`, `gdp`/`grdp`/`regional-accounts`→`national-accounts`).
- **542 pseudo-tags dropped.** `regional`, `provincial`, `urban`, `municipal` duplicate
  `region` and `jurisdiction_level`; `comprehensive`, `meta`, `indicators` describe the
  batch, not the report. Off-approved uses fell **5,770 → 1,444**.
- The same merge applied to live data for consistency; live `proposed:` tags went
  **90 → 7**, each now used once.
- **3 genuine data errors fixed**: `ae-gcc-customs-union`, `ar-mercosur` and
  `ar-fmi-eff-2025` were filed under a country code while published by the GCC,
  Mercosur and the IMF. Refiled to `INT`.
- 7 reports carrying no domain tag at all, and so unreachable by the filter, tagged.

**`npm run validate` now exits 0.**

## Tooling and housekeeping

- **`scripts/check-urls.ts`** (`npm run check-urls`) — HEADs every URL, exits 1 if any
  is dead, `--dir` to sweep a staged import. It exists because a pointer is not a
  source: content-matching catches a *wrong* page well and a *fabricated* one badly.
- `IL` and `SG` added to `palette.ts`, both to `ASIA`, pending the palette revamp.
- Afghanistan refiled `afg-` → `af-`. The old collision warning was wrong: no live
  node id starts with `af-`; the Africa branch uses it only in *filenames*.
- `grok-import-progress.md` rewritten — it had listed 27 countries as `queued` against
  the raw batches, which would have made a future session redo all of this.
- Redundant copies staged in `_to_delete/`: 40 loose batch JSONs (each verified
  byte-identical to its twin), `candidates (1).zip`, eight superseded passes, scratch.

---

# Part 2 — What we decided to do next

## 1. Mint the archive — decided yes, deferred, needs its own agent

Thomas wants this minted. It is not a side task: 1,999 reports would roughly **2.6×**
the corpus, and it is currently **last** on the priority list. It needs a dedicated
session, and it is coupled to the palette (see 6).

**Merge policy is settled: live wins.** Four ids exist in both corpora —
`in-mospi-cpi`, `in-rbi-balance-of-payments`, `ru-rosstat-cpi`,
`ru-cbr-monetary-policy-guidelines`. Compared field by field: same concept, same
publisher, same cadence — the same report described twice. The live record is better
in every case, and the staged one is weaker where it matters (staged `in-mospi-cpi`
points at a bare `mospi.gov.in/` homepage). Drop the staged duplicates, keep live, and
graft one thing across: the staged RBI node's `external-sector` tag beats live `banking`.

**Before minting:** run `npm run check-urls -- --dir "Grok - Brics+israel and
singapore/consolidated"`. The 1,972 URLs are verified by content, not by HTTP status.

## 2. Beam edges, and the `releases_per_year` overload behind them

Thomas's idea: for continuously-updated databases, stop drawing discrete teardrops and
render the edge itself as a lit beam — pulse and edge as one object.

Worth doing, for reasons beyond the look. A solid stream is honestly what infinite
frequency looks like at the limit; it is *cheaper* than particles; and Phase 0 of the
visual revamp already has to rebuild `teardropGeometry`.

But it surfaced a bug bigger than the question. **`releases_per_year: undefined` is
doing two contradictory jobs.** `isStandingInstrument()` reads absence as *one-off
instrument* and draws the node **hollow**; `InfluenceGraph.tsx` separately falls back
to `?? 1` and pulses the edge **once a year**. For a treaty both are right. For the 35
live databases both are wrong in opposite directions — they would render as hollow
standing instruments trickling annually when they are the fastest things in the corpus.
types.ts already warns about this exact confusion one field over.

Two decisions to take together:

- **Direction.** A travelling teardrop shows which way influence flows; a lit line does
  not. The beam needs an animated gradient or scrolling UV offset, or the graph loses
  its only directional cue on the edges that matter most.
- **The node, not the edge.** Cheapest honest fix is to give those 35 a real number —
  250 for business-daily, 365 for genuinely continuous, matching what the corpus already
  does for daily FX. That keeps `undefined` meaning *only* "one-off instrument", fixes
  the hollow-node bug for free, makes the beam simply what a very high cadence looks
  like, and needs no schema change.

## 3. The real remaining work — 722 nodes with no edges

The `candidates-only` tier: 15 countries, real linked dated nodes, and **essentially no
dependency edges at all**. Nothing to verify; every edge has to be researched from
nothing against the evidence standard. Indonesia 126 nodes, Taiwan 122, Philippines 75,
South Korea 72, Vietnam 67, Japan 65, then nine smaller. This is several sessions.

## 4. 170 research leads already sitting in the data

`_dropped` entries tagged `no-node-yet` or `deferred` — each already names what to look
for, so they are cheaper than cold research. Singapore 19, Suriname 16, Brazil 15,
Russia 15, China 14.

## 5. Smaller open items

- **169 cadences** — 134 where the publisher states nothing countable, 35 continuous
  databases (which item 2 resolves).
- **A geography-as-a-node sweep for Mexico and Argentina.** `mx-chiapas-entity`,
  `mx-guerrero-entity`, `mx-acapulco`, `mx-tuxtla-gutierrez`, and live `ar-caba`,
  `ar-cordoba-entity`, `ar-santa-fe-entity` — all titled "statistical identity" or
  "statistical profile", the same shape as the 309 already stripped. Neither country was
  in that sweep.
- **7 `proposed:` tags left in the live corpus**, each used once — the long tail the
  mechanism exists for. Promote or replace when one earns it.
- **Delete `_to_delete/`.** An agent session cannot delete; Thomas finishes it off. Keep
  `grok-batches/` and the three BRICS/Israel/Singapore zips — they are the only raw
  provenance for that material.

## 6. The cross-lane dependency

**Do not finalise the palette until the import decision lands.** `palette-proposal.json`
damps each family's chroma by its share of the corpus, measured at 1,250 nodes. The
staged import is heavily Latin America and Asia, moves `SA` from 9% to a major family,
and adds `IL`/`SG` outright. Those shares are an input to the palette, so importing after
tuning means re-tuning. The Phase 0 sizing work is distribution-independent and safe now.

## 7. One practical constraint worth remembering

**`npm run validate` cannot be run through the device bridge.** The bridge shell is a
Linux VM and the repo's `node_modules` carries the Windows esbuild binary, so `tsx` dies
on startup. To run it from an agent session, copy `src/`, `scripts/`, `package.json` and
`tsconfig.json` into a Linux workspace and `npm install` there. Otherwise the standing
rule to validate before and after every data change is quietly unenforceable.
