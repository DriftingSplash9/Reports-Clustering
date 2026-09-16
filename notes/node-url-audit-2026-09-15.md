# The orphan backlog is half a research problem and half a missing URL — 2026-09-15

**Written before any round was run, because it changes which round is worth running.**
`HANDOFF.md` §2's coverage read ranks countries by zero-edge node count and calls that class
*"the highest yield per hour in the corpus because minting is already done"*. That premise was
tested rather than believed, and it does not hold.

## What was measured

Every zero-edge node's own `url` in the fifteen largest gap countries was fetched from the cloud
container — **393 URLs** — and the body was judged on its EXTRACTED TEXT, not its status code or
byte count. Then the same two tests `validate` already runs on an edge's `evidence_url`
(`isBareHost`, `isIndexPage`) were run over every report's `url` corpus-wide.

## The headline

**1,041 of 3,684 reports carry their publisher's BARE HOMEPAGE as their own url.** A further 126
carry an index or listing page, and 20 carry none. That is **1,187 nodes — 32% of the corpus —
whose `url` does not point at a document.**

**459 of those bare-homepage nodes are among the 970 zero-edge nodes.** So roughly half the
"unwired depth" backlog is not waiting for research. It is waiting for somebody to record which
document the node stands for.

| country | zero-edge nodes | of those, url is a bare homepage | share |
|---|---|---|---|
| INT | 53 | 17 | 32% |
| EG | 51 | 43 | 84% |
| TW | 50 | 30 | 60% |
| RU | 38 | 18 | 47% |
| ID | 37 | 22 | 59% |
| IN | 37 | 28 | 76% |
| **EU** | **35** | **0** | **0%** |
| SG | 30 | 11 | 37% |
| IR | 28 | 12 | 43% |
| BO | 25 | 25 | **100%** |
| CN | 25 | 17 | 68% |
| VN | 25 | 10 | 40% |
| CL | 23 | 19 | 83% |
| PY | 23 | 23 | **100%** |
| ET | 21 | 14 | 67% |
| AR | 19 | 16 | 84% |
| EC | 19 | 19 | **100%** |
| VE | 18 | 17 | 94% |
| CO | 12 | 12 | **100%** |
| **JP** | **14** | **0** | **0%** |
| **CA** | **12** | **0** | **0%** |

**The zeros are the tell.** EU, Japan and Canada have real orphans and not one bare-homepage url
between them — those were hand-researched. Bolivia, Paraguay, Ecuador and Colombia are at 100%.
The split falls exactly on provenance: every high-share country's orphans come from the
**August 2026 bulk import** (`eg-egypt-2026-08.json`, `py-paraguay-2026-08.json`,
`bo-national-core.json`, and their siblings). `PLAYBOOK-CORPUS.md` §6 already says those imports
"carry import habits worth knowing — grep before trusting". This is one of the habits.

Single URLs doing duty as a document for many nodes at once:

```
 61  https://www.bps.go.id/          39  https://www.capmas.gov.eg/
 36  https://www.ine.gob.bo/         33  https://www.indec.gob.ar/
 25  https://www.dane.gov.co/        24  https://www.ine.gob.cl/
 24  https://www.ecuadorencifras.gob.ec/   24  https://www.inei.gob.pe/
```

## Why the workbook's ranking inverts

Ranked by *readable* stock rather than node count, the coverage workbook's top targets are its
worst. Of 393 orphan urls fetched, only **102** returned a readable document, and collapsing
near-identical bodies leaves well under a hundred distinct ones.

- **Iran** — `HANDOFF.md` calls it *"the extreme case … the most unwired country in the corpus and
  never given a round"*. **1 readable document of 24.**
- **Egypt**, the largest stock at 51 — **9 readable**. 38 nodes share the CAPMAS homepage, which is
  a **React SPA** (`<div id="root"></div>`, "You need to enable JavaScript to run this app") and
  cannot be read by curl at all, at any path.
- **India** 4 of 37, **Indonesia** 2 of 37, **Russia** 4 of 38, **Venezuela** 1 of 15.
- **Argentina looked perfect and is worthless**: 19 of 19 answered HTTP 200 — every one of them
  the same 37,443-byte INDEC navigation shell, 2,022 characters of menu and no document.
- **Taiwan** has the largest genuinely readable stock, **16 documents across 13 hosts** — one fetch
  per node, which is the grind Thomas ruled against in round 42.

**Two instrument lessons, both of which nearly produced a wasted round.** A status code is not a
liveness test: singstat.gov.sg serves a **165 KB styled 404**. And a byte count is not either:
seventeen Argentine nodes were scored "live" on an identical body size, which is the
*uniform body across a batch* shape `PLAYBOOK-CORPUS.md` §6 already names. Judge the extracted
TEXT.

## What changed in the repo today

`scripts/validate-data.ts` gained a **NODE URLS** block running `isBareHost` / `isIndexPage` over
`Report.url`, the way the EVIDENCE block already runs them over `Dependency.evidence_url`. Nothing
had ever read a report's own url, which is why this sat unseen since August. It **warns, never
errors** — a thousand errors would turn `validate` red for weeks and this project's own history
says a check nobody can get to zero stops being read. The number is the thing to watch: a round
that RAISES it has recorded a homepage as a document.

## What this does NOT say

- **It does not say the nodes are wrong.** INDEC, CAPMAS and BPS all publish real documents; the
  node just does not say which one. The stock is recoverable.
- **It does not say the August import was bad work.** It minted thousands of real nodes. It
  recorded a section landing page where a document belonged, systematically, and nothing in the
  toolchain was looking.
- **It does not settle the A-or-B question** — it dissolves it. Class A is not one job, it is two
  with very different costs, and the workbook does not separate them.

## The options, costed

1. **Per-host URL repair.** The defect is concentrated: 8 hosts carry 266 of the bare urls. One
   publisher's catalogue or sitemap is a handful of fetches and can re-point many nodes at once —
   the per-fetch shape that has worked every time here (China's yearbook layers, Poland's general
   notes, the EU round's metadata pages). **Blocked on a ruling: this rewrites the `url` field on
   up to ~1,000 nodes, which is a bulk change Thomas reviews before it happens.**
2. **Go where the documents are already recorded.** EU (35 orphans, 0 bare), Japan (14, 0), Canada
   (12, 0) are hand-researched stock with real urls. Smaller, but nothing is blocked.
3. **Re-rank the coverage workbook by readable stock** and let the next several rounds pick from
   that instead of node count. Cheap; the measurement is already done and is in this file.

**Recommendation: 1 for the biggest clusters, 2 while that ruling is pending.** Option 1 is where
the corpus-scale gain is; option 2 is the part that needs nobody's permission.

## Addendum 2026-09-15 — a shape neither instrument in this file can see

The ECOICOP target audit turned up **five nodes whose own `url` is a Eurostat ESMS metadata page** (`ee-stat-hicp`, `hr-dzs-hicp`, `is-hagstofa-hicp`, `lt-vda-hicp`, `sk-susr-cpi`), each published by a national statistical institute. **`isBareHost` and `isIndexPage` both pass**, correctly — an ESMS page is neither bare nor an index, it is a real document about the right series. It is just published by the wrong body, so the node points at somebody else's description of what it stands for rather than at itself. **That is a third defect class alongside the bare host and the index page, and this file's per-node counts do not include it.** No instrument is proposed here: the population is not known and inventing a `isForeignPublisherPage` check off five cases would be the kind of guess §2 of this file warns about. What IS known is that the five are cheap to repair — each names its own NSI page inside the document it already cites. Full account: `notes/ecoicop-target-audit-2026-09-15.md`.
