# The per-host URL repair, proved on bps.go.id — 2026-09-15

**BPS IS CLOSED. 27 of its 61 bare-homepage nodes were repaired and written; the other 34 are
not url problems and no further fetching will make them one.** Run first as the one-host proof
that `HANDOFF.md` §3 item 1 asked for (nothing written), then written in two passes once Thomas
chose option (a). Per-node verdicts: `Claude outputs/bps-url-repair-2026-09-15/candidates.json`,
61 rows.

`bps.go.id` was chosen over Egypt because CAPMAS is a React SPA curl cannot read at any path,
and BPS is the largest single cluster (61 of the 1,041 bare-homepage urls).

## The route

**The cloud container cannot read this host.** `www.bps.go.id` and every provincial
`<prov>.bps.go.id` answer **HTTP 403 with a Cloudflare interstitial** (`Just a moment...`,
~5.3 KB) to curl, on every path including `/robots.txt`'s neighbours. `sensus.bps.go.id`
answers 200. This is a statement about the container, not the site — Thomas's Chrome clears
the challenge in about six seconds and reads everything.

**BPS publishes no sitemap** (`/sitemap.xml` and `/sitemap_index.xml` both 404 into the SPA
shell; `robots.txt` carries no `Sitemap:` line), so the catalogue cannot be harvested whole.

**The publication list and its search are rendered by a Next.js server-action POST**, not by
a URL. `/id/publication?page=2`, `?keyword=`, `?search=` and `?filter-keyword=` all return 200
and ~70 KB of shell with **zero** publication anchors, whether fetched by curl or by an
in-page `fetch()` — the rows arrive only after hydration. `?keyword=X&sort=latest` appears in
the address bar after a search but does not reproduce that search when navigated to.

**What works: drive the site's own search form in the page and read the rendered anchors.**
Set `input[name="filter-keyword"]` through the native value setter, dispatch `input`,
`form.requestSubmit()`, then wait for the result rows. 49 queries ran this way in about four
minutes.

**Two things that cost time and are worth carrying.** A `setTimeout` poll loop is throttled to
roughly 1/sec once the tab is backgrounded, which turned a 10-second wait into minutes and
looked exactly like a hung job — **a `MutationObserver` is not throttled** and cut the per-query
cost from ~10 s to ~3.3 s. And a long tool call against this page dies at the CDP 45-second
ceiling, so the loop is started as `window.__job = (async()=>{...})()` and polled, never awaited.

## What the proof found, and it is not what the pass assumed

The pass was proposed on the premise that one publisher's catalogue can re-point many nodes at
once. **It can — the mechanics work.** 35 of 49 queries returned a BPS publication whose own
title prefix-matches the node, and three candidate urls were fetched and confirmed to carry the
expected `<title>`. But the premise underneath it, that these nodes are documents missing a url,
does not survive contact:

| verdict | n | what it means |
|---|---|---|
| CLEAN — **written** | 27 | BPS's own title matches the node's artefact; url verified by `<title>` |
| NOT_A_DOCUMENT | 18 | a topic, a series, an agency or an instrument — **no url can be correct** |
| COLLISION | 9 | the document is **already another live node's url** |
| CHECK | 5 | a real publication, but narrower or broader than the node claims |
| NO_CANDIDATE | 2 | nothing in the catalogue matches |

**27 of 61 — 44% — and that is the ceiling for this host.** The first pass found 22 on a single
mechanical title-prefix match; a second pass over the 14 unresolved and the 6 CHECK rows found 5
more and **reclassified 13 downward**, which is the more useful result: six "ambiguous" nodes
turned out to be topics BPS splits across several volumes (`id-national-accounts` and `id-pdrb`
each span a *Menurut Pengeluaran* and a *Menurut Lapangan Usaha* edition; `id-producer-prices`
exists only as three subsector volumes; `id-transport-multimodal` as one volume per mode), and
three more joined the collisions.

**The second pass is where the honest number came from.** Searching harder converted 5 nodes and
disqualified 13 — so the yield curve on a host turns negative fast, and a repair pass that keeps
fetching until every node has a url is manufacturing wrong answers.

### The finding that changes the shape of the job

**The August 2026 import minted TOPIC nodes, several per document, and gave the url to one of
them.** Six of the BPS candidates resolve to a document another node already points at:

```
id-crime-stats            -> Statistik Kriminal 2024/2025        held by id-victimisation
id-interprovincial-trade  -> Perdagangan Antar Wilayah 2024      held by id-interisland-trade
id-local-government-finance -> Stat. Keuangan Pem. Kab/Kota 2024 held by id-own-source-revenue
id-sea-transport          -> Statistik Transportasi Laut 2024    held by id-major-ports
id-water-supply           -> Statistik Air Bersih 2020-2024      held by id-water-resources
id-mining-stats           -> Stat. Pertambangan Non Migas        id-coal holds the EN edition
```

`id-victimisation` is *"Crime victimisation and reporting-rate statistics"* and `id-crime-stats`
is *"Crime Statistics (Statistik Kriminal)"*. They are two nodes for one annual publication.

**The second pass took the count from six to nine, and found the shape in its purest form.**
`id-ethnic-groups` (*"Profile of Ethnic Groups (Long Form Population Census 2020)"*) and
`id-regional-languages` (*"Regional language diversity statistics (Long Form SP2020)"*) both
resolve to the same document — *Profil Suku dan Keragaman Bahasa Daerah Hasil Long Form Sensus
Penduduk 2020* — which covers both subjects in one volume. Neither was repaired.
`id-health-facilities` collides with `id-health-profile`, which this round had already repaired.

**This is corpus-wide and already measurable in the part of the corpus that is NOT bare.**
Counting distinct non-bare urls across `src/data/research/*.json`: **114 urls are held by 2 or
more nodes, covering 335 nodes.** The files they sit in are the August import, every one —
`ru-russia-2026-08.json` 72, `uy-uruguay-2026-08.json` 27, `br-brazil-2026-08.json` 17,
`mx-mexico-2026-08.json` 15. The worst single url carries 21 nodes
(`gub.uy/instituto-nacional-estadistica/`).

**Repointing the 1,041 bare urls the obvious way would push that 335 substantially higher**,
because a topic node repaired against its parent publication becomes a duplicate of whichever
sibling already holds it. The url field is the symptom; the node granularity is the defect.

### Two smaller corrections to the audit's framing

- **41 of the 61 BPS bare-url nodes already carry edges**; only 20 are zero-edge. Repairing the
  wired 41 fixes provenance, it does not unlock research. The unlock at this host is 20 nodes.
- **A bare homepage is the CORRECT url for an institution node.** `id-bps` is the agency itself.
  Corpus-wide this caveat is small and does not rescue the number: of the 1,030 bare-url reports
  in the research files, **26 carry `continuous: true` and 63 carry `_shape: "recurring-citation"`**,
  so roughly 6% at the outside.

## What this says about the other seven hosts

The method transfers wherever the publisher has a searchable catalogue, and the per-node cost is
a few seconds once the search is driven rather than fetched. What does not transfer is the
assumption that a found url is a repair. **Any host-by-host plan needs a collision check against
every live node's url before it writes**, and needs a ruling on what happens to a node that turns
out to be a topic rather than a document.


## Closing BPS: what the second pass added to the method

- **Search the English subtitle when the Indonesian title is too generic to rank.**
  `Statistik Indonesia` is the yearbook AND a prefix of several hundred other titles, so the
  yearbook never surfaced; `Statistical Yearbook of Indonesia` returned it first. The search
  reads the abstract, not just the title, and the `only-title` checkbox did not change the
  ranking when driven programmatically.
- **A search that returns several sibling volumes is telling you the node is a topic**, not that
  you picked bad keywords. Three of this round's reclassifications were exactly that signal read
  correctly on the second look.
- **Run the collision guard as code before every write, not as a review step.** Both passes ran
  every candidate url against every live node's url corpus-wide; it caught nothing in the write
  set precisely because the rows it would have caught had already been held back.

**What is left at this host needs a node decision, not a fetch**: 9 collisions and 18 topic nodes.
Both are the same underlying job — the August 2026 import's granularity — and it is unscoped.
