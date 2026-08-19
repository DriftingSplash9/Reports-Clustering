# Grok import — progress log

**Rewritten 2026-08-18. Read this before touching anything in the Grok archive.**

## The queue in this file is gone, and so is the pipeline it described

This file used to list 27 countries as `queued` against the raw batches in
`Grok - Brics+israel and singapore/grok-batches/raw/`, to be picked off one per
hourly run by the scheduled task described in `archive/planning/GROK-PIPELINE.md`. Both are
superseded:

- **The scheduled task never worked** and is disabled. Triggered sessions do not
  get the device-bridge pairing at all, so every fire failed to reach the disk.
- **All 293 raw batch files have now been consolidated**, schema-aligned and
  researched into 37 country files under
  `Grok - Brics+israel and singapore/consolidated/`. Working from
  `grok-batches/raw/` again would redo that work and lose it.

**The source of truth is `consolidated/`.** Read
`consolidated/CONSOLIDATION-REPORT.md` for what was done and why, and
`consolidated/_STATUS.md` for the per-country board. Each country file carries
its own `_normalisation` (what was changed) and `_gaps` (what is still missing
and why).

## What state the data is in

1,999 reports, 969 dependencies, 357 dropped notes. 1,972 nodes (99%) carry a
URL that was retrieved and confirmed against the page's content. 1,508 carry a
release cadence read off the publisher's own page. 309 nodes that turned out not
to be publications at all were stripped into `consolidated/_archive/`.

Nothing here has been minted into the graph. `src/data/research/` is untouched by
this work except for `palette.ts` and `types.ts` (see below).

## Per-country state

`tier` is the shape the source batches arrived in, and it predicts the remaining
work far better than the alphabet does:

- **`v2`** — correct container, real edges with a basis and an evidence URL. Ready to verify against sources.
- **`legacy+edges`** — old `candidates`/`proposed_edges` container, real sourced edges, already converted.
- **`candidates-only`** — nodes and nothing else. **Zero dependency edges.** Every edge has to be researched from nothing. This is the bulk of the remaining job.

| Country | Code | File | Reports | Deps | Tier | Note |
|---|---|---|---|---|---|---|
| Afghanistan | AF | `af-afghanistan.json` | 14 | 0 | candidates-only |  |
| Argentina | AR | `ar-argentina.json` | 61 | 16 | legacy+edges | **Superseded** — already live in `ar-national-core.json`, do not reprocess. |
| BRICS international layer | INT | `int-brics-international-layer.json` | 77 | 79 | v2 |  |
| Bolivia | BO | `bo-bolivia.json` | 60 | 23 | legacy+edges | **Superseded** — already live in `bo-national-core.json`, do not reprocess. |
| Brazil | BR | `br-brazil.json` | 74 | 82 | v2 |  |
| Chile | CL | `cl-chile.json` | 60 | 20 | legacy+edges |  |
| China | CN | `cn-china.json` | 53 | 119 | v2 |  |
| Colombia | CO | `co-colombia.json` | 40 | 15 | legacy+edges |  |
| Ecuador | EC | `ec-ecuador.json` | 50 | 15 | legacy+edges |  |
| Egypt | EG | `eg-egypt.json` | 47 | 94 | v2 |  |
| Ethiopia | ET | `et-ethiopia.json` | 29 | 67 | v2 |  |
| Guyana | GY | `gy-guyana.json` | 40 | 6 | legacy+edges |  |
| India | IN | `in-india.json` | 81 | 70 | v2 |  |
| Indonesia | ID | `id-indonesia.json` | 126 | 0 | candidates-only |  |
| Iran | IR | `ir-iran.json` | 35 | 0 | candidates-only |  |
| Iraq | IQ | `iq-iraq.json` | 21 | 0 | candidates-only |  |
| Israel | IL | `il-israel.json` | 29 | 26 | v2 |  |
| Japan | JP | `jp-japan.json` | 65 | 0 | candidates-only |  |
| Mexico | MX | `mx-mexico.json` | 121 | 43 | legacy+edges |  |
| Myanmar | MM | `mm-myanmar.json` | 17 | 0 | candidates-only |  |
| Paraguay | PY | `py-paraguay.json` | 60 | 26 | legacy+edges |  |
| Peru | PE | `pe-peru.json` | 40 | 15 | legacy+edges |  |
| Philippines | PH | `ph-philippines.json` | 75 | 0 | candidates-only |  |
| Russia | RU | `ru-russia.json` | 152 | 190 | v2 |  |
| Saudi Arabia | SA | `sa-saudi-arabia.json` | 16 | 0 | candidates-only |  |
| Singapore | SG | `sg-singapore.json` | 37 | 27 | v2 |  |
| South Korea | KR | `kr-south-korea.json` | 72 | 0 | candidates-only |  |
| Suriname | SR | `sr-suriname.json` | 43 | 3 | legacy+edges |  |
| Syria | SY | `sy-syria.json` | 13 | 0 | candidates-only |  |
| Taiwan | TW | `tw-taiwan.json` | 122 | 0 | candidates-only |  |
| Thailand | TH | `th-thailand.json` | 25 | 0 | candidates-only |  |
| Turkey | TR | `tr-turkey.json` | 40 | 0 | candidates-only |  |
| United Arab Emirates | AE | `ae-united-arab-emirates.json` | 26 | 0 | v2 | **Superseded** — already live in `ae-national-core.json`, do not reprocess. |
| Uruguay | UY | `uy-uruguay.json` | 60 | 21 | legacy+edges |  |
| Venezuela | VE | `ve-venezuela.json` | 37 | 12 | legacy+edges |  |
| Vietnam | VN | `vn-vietnam.json` | 67 | 0 | candidates-only |  |
| Yemen | YE | `ye-yemen.json` | 14 | 0 | candidates-only |  |

## Decisions still open (Thomas)

- **60 edges are held in `_dropped` as `deferred`** because they arrived typed
  `related_to` or `complements` and their basis describes a thematic association
  rather than a documented dependency. They keep their original basis and URL, so
  they are recoverable if re-typed against real evidence.
- **170 `_dropped` entries are research leads** (`no-node-yet` / `deferred`), not
  failures. Singapore, Suriname, Brazil, Russia and China carry the most.
- **20 nodes had a duplicate id with conflicting content** across batches. First
  occurrence won; the losing values are preserved on the node under `_variants`.
  Most are in the three superseded files, but `in-mospi-asi`,
  `jp-national-health-nutrition-survey`, `mx-lsnieg` and `id-education-stats` are
  in live ones.
- **169 cadences are still open** — 134 where the publisher states nothing
  countable, and 35 that are live databases with no discrete release. That second
  group is a modelling question: a continuously-updated dashboard is neither of
  the schema's two node shapes.
- **39 regional statistical yearbooks carry `proposed:general-statistics`**, a tag
  invented in this pass. They are genuine multi-domain compendia and their only
  original tag was a pseudo-tag; asserting the individual domains they cover would
  be inventing them. Promote the tag or replace it.
- **27 nodes still have no URL** — 21 whose publisher domain is dead or
  unreachable, 6 where no such published series exists. Both findings were
  independently confirmed by Grok, so treat them as settled rather than pending.

## Schema changes made alongside this work

- `src/lib/types.ts` — 17 domains added to `Domain` and `DOMAINS` (trade,
  living-standards, public-finance, industry, energy, external-sector, poverty,
  development-finance, investment, environment, governance, services,
  statistical-system, infrastructure, mining, housing, tourism), each with a dated
  comment. `npx tsc --noEmit --skipLibCheck` passes.
- `src/lib/palette.ts` — `IL` and `SG` added to `COUNTRY_FAMILY` and
  `COUNTRY_LABEL`, both filed to `ASIA`, the reserved catch-all family, pending
  the palette revamp.

## Two corrections to things this file used to say

- **Afghanistan uses `af-`, not `afg-`.** The old warning about colliding with the
  Africa branch was wrong: no live node id starts with `af-`. Africa uses `af-`
  only in *filenames*; its nodes are ISO-prefixed (`ao-`, `dz-`, `ng-`). The file
  is `af-afghanistan.json` and its ids need no re-prefixing.
- **Singapore is in this archive now.** It was previously excluded as being worked
  live with Grok; its batches were in `singapore-batches.zip` and are consolidated
  into `sg-singapore.json`.

## Redundant copies still on disk, not deleted

`candidates (1).zip` is a third copy of `grok-batches/raw/`, and the ~40 loose
`2026-08-13_*` / `2026-08-15_*` JSONs at the top of the Grok folder are a fourth
partial copy. Superseded output from earlier passes is in `_to_delete/`. None of
it was deleted — that is your call.
