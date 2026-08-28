# HANDOFF — working document

**This is the current handoff. There is exactly one, at the top level.**
This file holds *state only* — what's landed, what's live, what's next.
Standing rules, known traps, and architecture now live in `PLAYBOOK.md`
(that file rarely changes; this one does, every turn).

Last updated: **2026-08-28**

---

## 1. Read next

`PLAYBOOK.md` (rules/traps/architecture), then task-specific notes it
routes you to. `REPORTS.md` for the design doc. `git` status: unknown to
agents by design — see PLAYBOOK.md rule 1, don't state it.

---

## 2. Current state

**Live corpus: 3,465 reports · 2,735 dependencies** (+82 / +140 across
FOUR data rounds today — EU national chains, candidates-tier wiring, EU
government finance, and targeted retries). `npm run validate` clean
(120/120), `tsc --noEmit` clean, `npm run build` clean (1,498.64 kB) —
verified in a fresh sandbox after each round. Zero-domestic-edge countries
**102 → 77** over the day.

**EU government finance + candidates-tier retries (rounds 3 and 4).**
`src/data/research/eu-government-finance-2026-08-28.json` — 12 nodes, 36
edges, 15 `_dropped`. `src/data/research/candidates-tier-retries-2026-08-28
.json` — 4 edges, 7 `_dropped`. The first closes the gap round 1 left: every
EU country except Germany had an `*-edp-inventory` node wired to Regulation
479/2009 and ESA 2010 but to **no national data at all**. Eleven countries
now have their own deficit/debt release wired in on the German template
(AT gets two — deficit and debt are separate releases on different
cadences): **AT BE IE FI SE LV PL HU SK HR GR**.

**Nine EU countries did NOT land, and four of those were rejected by me on
evidence quality rather than lost to unreachable sites** — worth knowing
because the retries are cheap. Bulgaria and Malta rested on a page *title*
and a *homepage listing* (PLAYBOOK rule 16); Lithuania's page carried no
EDP, ESA or Regulation language at all; Spain's rested on an INE catalogue
record for a Banco de España series plus an inference. **Estonia is the one
to note**: the agent proposed the edge on the release's use of "Maastricht
debt", I re-fetched the page, and it contains no EDP, Eurostat or ESA 2010
sentence whatever — the single Maastricht reference is a glossary line.
Malta and Bulgaria are the cheapest retries in the file (one fetch each).
Unreachable rather than unproven: PT (ine.pt, third failure today), RO
(insse.ro), SI (stat.si), CY (nothing on CyStat at all — try the finance
ministry).

**Poland went the other way and is a reminder to re-fetch**: the agent
reported a summarised paraphrase; the page actually says "Prezes GUS
przesłał do Komisji Europejskiej (Eurostat) dane... (tzw. notyfikacja
fiskalna)" and names both Regulation 479/2009 and ESA 2010 in full.

**Retries: Iraq's oil-fiscal chain is now on the primary law.** Budget Law
No. 13 of 2023 was found at moj.gov.iq, and both edges rejected in round 2
are minted on its Article 1 with the Arabic quoted verbatim; the two round-2
`_dropped` entries are marked `resolved`. A third Iraqi edge came off
COSIT's own GDP report and is a genuine surprise: **Iraq's national accounts
are classified on ISIC Revision 2** — a 1968 classification, superseded
three times. Not a transcription error; the report says Revision 2
explicitly. Iraq's SNA vintage is still unknown because the one document
that would settle it is a `.docx` the fetch proxy refuses (PLAYBOOK 19).

**Thailand's GPP question is now closed negative — stop retrying it.**
Eleven off-domain routes were tried for NESDC's Gross Provincial Product
methodology; it appears to exist only on nesdc.go.th, which is entirely
unfetchable. The five GPP edges are unavailable without a different access
route. The consolation: ASEANstats DID supply Thailand's SNA 2008 basis
off-domain, which closes the corroboration caveat round 2 left on that
already-live edge (now PLAYBOOK 18 — ASEANstats and ilo.org are the two
reliable workarounds for blocked national statistical offices).

**Candidates-tier wiring, first pass (2026-08-28, second round of the day).**
`src/data/research/candidates-tier-wiring-2026-08-28.json` — 1 node, 16
edges, 24 `_dropped`. Target was the seven countries carrying the most
completely unwired nodes: Vietnam (48 nodes, 0 edges), Iran (34), Thailand
(25), Iraq (22), Myanmar (16), Yemen (15), Syria (13). Result by country:
**Thailand 6, Vietnam 5, Iraq 2, Myanmar 2, Iran 1, Yemen 0, Syria 0.**
Zero-domestic-edge countries **81 → 78**; countries with no edge of any kind
are now down to nine (CU ER LR NI NR SC TJ TM TV).

**The yield being this uneven IS the finding, and it should change how the
rest of this tier gets scoped.** The edge class that survives evidence here
is the international-standards bridge — SNA, BPM6, MFSMCG, ISIC, ICLS,
e-GDDS, SDDS — because these countries' sites are thin on compilation
methodology but do state which manual they follow. The obvious *domestic*
chains (national accounts using industrial/agricultural/oil output, deficit
from budget execution, NPLs from banking-system reporting, public debt from
the budget) were hunted in all seven countries and are essentially
undocumented on the publishers' own sites. Don't scope the next pass around
them. The one systematic exception is central-bank metadata: Thailand's BOT
metadata tables are excellent and produced six of the sixteen edges,
including two real domestic data chains (BOP ← Public Debt Management
Office, BOP ← Ministry of Tourism and Sport).

**Eight proposed edges were rejected at mint time and this is where the
value is.** Vietnam's VSIC→ISIC link had only third-party evidence
(classification.codes). Iraq's oil-revenue chain — the defining structure of
that economy — rested on a secondary analyst PDF citing Budget Law 13 of
2023 by article; fetch the law and it becomes mintable. Two edges duplicated
ones already live (`vn-gso -> imf-e-gdds`, `th-bop -> imf-sdds`), now
recorded as independent corroborations. And six Iran edges are **held
pending a ruling from you** — see below.

**Two things need your decision.** (1) **Iran's SNA vintage.** The corpus has
`ir-national-accounts -> sna-2008` live. SCI's own current page says
"Theoretically, regional accounts, just like national accounts, follow the
latest revision of the system of national accounts SNA 93", and the UN
Statistics Division's Iran record says 1993 SNA too. Per rule 13 nothing was
overridden: the live edge is caveated, and six SNA-93 edges (national
accounts plus all five provincial GRDP nodes) are held. (2) **Generic
COICOP.** Iran and Iraq both name "COICOP" in their own documents without
naming a revision, and the corpus has only `un-coicop-2018` and
`un-coicop-hbs-1999`. Two edges are held rather than guess an edition. The
fix is a modelling choice — mint a revision-neutral `un-coicop` parent, or
accept that generic citations can't be wired.

**Yemen and Syria returned zero edges, and that is a real result, not a
failed search.** Yemen: the only substantive document reachable is the UN
Statistics Division record, which says Yemen is on the **1968 SNA**, base
year 1990, last submission 2008 — so it rules out the SNA-93/2008 edges
rather than supporting them, and `sna-1968` exists as a node if a
Yemeni-side source can be found. Syria: `cbssyr.sy` does not respond at all,
and the CBS itself no longer exists — merged and renamed the **Syrian
Planning and Statistics Commission** under Decree No. 27 of 2025. Both
countries turned up **repurposed NSO domains that rank as the real thing**
(`cso-yemen.org`, `cbssyr.org`) — now PLAYBOOK rule 15, do not cite either.

**Three new PLAYBOOK rules came out of this round** (14-17): the mirror image
of rule 10 (check new edges against other slices' `_dropped` notes — the
validator caught `mm-national-accounts -> sna-1993` this way, and the older
note turned out to hold the better evidence), the hijacked domains, "a page
title is not evidence", and the Eurostat metadata URL patterns.

**EU-27 national chains landed (Thomas, 2026-08-28: "so what are all the
countries left to research?" → "go ahead where you think best to look").**
The answer to the question was that coverage is near-total (185 of 193 UN
members have at least one node; only Andorra, Dominica, El Salvador,
Grenada, Monaco, San Marino, St Kitts & Nevis and St Vincent are untouched,
and North Korea was researched in the 2026-08-22 queue and correctly
returned nothing) — what is missing is WIRING, not countries. 102 countries
had zero country-internal dependency edges. The largest single shape in that
102 was 21 EU/EEA states that each had exactly three nodes — EDP inventory,
ESS peer review report, national accounts — hanging off the Eurostat/ESA
hubs and nothing else. This round wired all 21: `src/data/research/eu-
national-chains-2026-08-28.json`, 69 nodes and 84 edges, one price index +
household budget survey + labour force survey per country plus the three
documented dependencies between them (CPI/HICP weights from national-
accounts household final consumption expenditure, CPI/HICP weights from the
HBS, national-accounts employment from the LFS). Zero-domestic-edge
countries: **102 → 81**. It also resolves the granularity question left open
in `eurostat-hicp.json`'s `_open_questions` since 2026-08-05 — `eurostat-
hicp` now has 21 incoming `uses_data_from` edges from the national HICPs it
aggregates, rather than being split into per-country nodes.

Method: 21 parallel subagents, one per country, the pattern recorded in
project memory. Four load-bearing quotes (PL, IE, AT, GR) were independently
re-fetched and confirmed verbatim by the orchestrating session before
minting. **The reusable find is two Eurostat URL patterns** —
`prc_hicp_esmshi4_<cc>.htm` (states exactly where each country's HICP
weights come from, and that data are transmitted to Eurostat) and
`employ_simslfs_<cc>.htm` (states as an explicit Y/N field whether the LFS
is the national-accounts employment source). The HICP filename is versioned
per country and NOT uniform: `hi4` for PL/EL/ES/HU/HR/BG/LT, `hi3` for
SK/SI/EE/LV/MT/CY/IS, 404 for FI. Try hi4, fall back to hi3.

Negative findings in this round are data, not gaps: Cyprus and Slovenia are
documented as NOT using the LFS for national accounts, so they correctly
have no such edge; Sweden's CPI weights come from national accounts and NOT
from its HBS, against the EU pattern. Six countries' `part_of`-style
"expected" edges were dropped with quotes explaining why — see `_dropped` in
the slice.

**Hub-drag damping — the Auto-unfold pile-up, partly fixed (Thomas,
2026-08-28: "it doesn't change from 473 until I click Auto unfold and when I
do that I get a dense messy cluster").** This is cause (3) from
`clusterRepulsion.ts`'s own design note, the one that force explicitly does
NOT address. The mechanism: d3's default link strength is `1 / min(deg(source),
deg(target))`, and the `min` is the trap — a leaf attached to `sna-2008` gets
`1/1`, a MAXIMALLY stiff spring. `sna-2008` touches 57 different countries and
`esa-2010` 42, so those two sat at the mass centre with ~90 rigid springs each
and every country they touch was nailed to the middle through them. `hubRoom`
had given those links extra rest LENGTH since August; nothing had ever touched
their stiffness.

Fixed by precomputing `LinkDatum.stiffness` and calling `linkForce.strength()`.
**Damped by COUNTRY SPAN, not degree** — the first pass damped on degree alone,
which touched 44% of all links and loosened hubs that should hold a cluster
together (`ru-rosstat-regions-russia-socio-economic` has 30 edges spanning ONE
country; likewise `cn-provincial-gdp` 23 and `in-state-gsdp-series` 22 — those
are a country's internal spine). Gating on "how many different countries does
the busier end touch" isolates the 15 nodes that actually tether unrelated
clusters — the international standards layer — and gets the same result while
touching 19% of links instead of 44%.

Swept from identical fresh random starts on the real corpus
(`scripts/measure-hub-drag.ts`, throwaway, sandbox only — not committed):
inter-country centroid separation ÷ intra-country spread **8.05-8.20 → 9.30
-9.69**, and mean distance of hub-attached nodes from the global centroid
**0.561-0.565 → 0.690-0.713** of the cloud's 92nd-percentile radius. No NaN, no
runaway, both seeds agreed. Shipped at `HUB_SPAN_GATE = 10`, `HUB_LINK_KNEE = 4`.
`tsc --noEmit` clean (run on Thomas's machine — cloud staging was down).

**Verified live, and the honest verdict is "clearly better, not solved."** The
FOLDED view is a step change: distinct green EU, white, and violet clusters
where it had been one undifferentiated ball. Unfolded to all 3,465 it is
visibly regionalised — colour territories are now legible — but still dense in
the middle. Two things are still in play that this change does not touch:
3,465 nodes in one frame is inherently crowded, and **1,251 of them (36%) have
no edges at all**, so nothing but charge/collide/galaxy organises them.

**KNOWN SUBTLETY, not yet resolved.** `stiffness` derives from the `degree` map
built off `graph.edges` (pre-trunk-collapse), matching what `hubRoom` already
does. d3's own default derives from the collapsed link array. So in the folded
view, where 57 member edges collapse into one EU-orb→`esa-2010` trunk, ordinary
links are slightly SOFTER than d3's default would make them. Defensible (a
trunk standing for 57 edges should not be 57× stiff) and consistent with
`hubRoom`, but it is a deliberate difference from stock d3 and someone should
decide it on purpose rather than inherit it from this note.

**Cluster repulsion's slider was dead, and is now fixed (Thomas,
2026-08-28: "can you check out the cluster repulsion? I don't see any effect
from it").** He was right, and the force was never the problem. `view.
clusterRepulsion` had NO `d3ReheatSimulation` effect and NO refit effect,
where `view.geoAffinity` and `view.galaxy` each have both. Every d3 force
here is scaled by alpha, and alpha has decayed to ~0 by the time anyone
touches a slider post-fit — so the force was computing a correct push every
tick and multiplying it by nothing. Fixed by copying the existing pair;
`tsc`, `validate` (120/120) and `build` all clean, and verified live in
Thomas's browser: at 0% the cloud is a homogeneous blob, at 300% distinct
lobes separate (the green EU cluster pulls clear at top-left). **This is the
THIRD time this exact omission has shipped** — geoAffinity, then galaxy
("the galaxy pull doesn't appear to have an effect", 2026-08-20), now this.
All three forces were correct and measured; all three sliders were inert.
Now PLAYBOOK rule 20, with the instruction to verify by dragging the slider
rather than by measuring the force in a script — script measurement passed
all three times. **Thomas's Todo #2 is answered**: the force does work, he
had simply never been able to see it. Whether the separation is now ENOUGH
is a fresh judgement, and the slider finally makes it askable.

**Cluster vs cluster repulsion shipped, first pass (Thomas, 2026-08-27:
"let's try the proposed fix — cluster vs cluster repulsion").** Built the
"option (c)" force from the 2026-08-26 design discussion below: new
`src/lib/clusterRepulsion.ts`, the direct mirror of `galaxyForce.ts` — that
force only ever pulls a node toward its OWN family/country centroid; this
one pushes DIFFERENT clusters' centroids apart, computed once per pair of
centroids (O(clusters²), cheap enough that it can skip `charge`'s hard
`distanceMax` cutoff — the diagnosed reason two already-separated clusters
stop repelling each other at all). New `view.clusterRepulsion` slider (0–3,
default 1 — on, same reasoning as `galaxy`) in `ViewControls.tsx`, wired
the same way `galaxy`/`geoAffinity` are (a ref, read live, no rebuild).
**A real false start, caught before shipping**: the first version used
1/d² falloff, calibrated against a throwaway measurement script
(`scripts/measure-cluster-repulsion.ts`, deleted after use) that had a bug
letting simulation state leak between successive sweep runs — made a
genuinely negligible effect look real. A clean re-run (fresh random
initial positions every time) showed 1/d² needs too wide a dynamic range
(a 24-unit floor to ~2,000-unit real separations) to be both felt and
safe; switched to 1/d, which worked. At the shipped default (strength 1):
the ratio of "how far apart different countries' centroids sit" to "how
tight each country's own members sit around their own centroid" moved
~4.1–4.2× → ~4.8–5.2×, own-cluster spread essentially unchanged. At the
ceiling (strength 3): ~4.1–4.2× → ~5.9–6.3×, own-cluster spread up
~15–17%. Zero NaN positions, no runaway growth across 400 ticks at any
setting tried. Verified in a fresh sandbox: `tsc`/`npm run
validate`(120/120)/`npm run build` clean (1,498.64 kB), headless
Playwright at the Everything tier confirms zero console/page errors and
the new slider renders at 100% by default; screenshot shows the settled
scene with visibly distinct clusters, no exploded/NaN layout. **Not yet
seen by Thomas in the live app** — first pass, same as the
charge-strength tuning below; expect a follow-up tuning call once he has.

**Glow is gone (Thomas, 2026-08-25: "the glow slider works but I think the
glow is pointless and should be taken off").** Not just defaulted off —
removed. Bloom is hardcoded to `intensity={0}` in `App.tsx`; the `Glow`
slider is gone from `ViewControls.tsx` and the "View controls" panel hint in
`MenuBar.tsx`; `glow` is gone from `ViewSettings`/`DEFAULT_VIEW` in
`view.ts`; `BLOOM_THRESHOLD_MIN`/`MAX` deleted (nothing reads a threshold
any more). The `<EffectComposer>` stays mounted — `PngExport.tsx` needs the
pipeline shape unchanged, see the comment at its call site — it just never
bleeds light now. `glowInk`/`GLOW_REFERENCE_Y` in `palette.ts` are
unrelated (authority-linked self-lit fill, not this halo) and are untouched.

The Grok research queue (`notes/grok-research-queue-2026-08-22/`) is fully
worked — nothing queued there. Next research work needs a new Grok round
scoped from scratch.

Two candidate fixes for the render-consistency/camera-fit bug are shipped in
`InfluenceGraph.tsx` (premature-stop reheat gate, frame-delta clamp +
visibilitychange refit). Thomas tried to force-trigger either failure mode
on his own machine and couldn't — same as this session's sandbox couldn't
(see Pass 4, `notes/render-consistency-repro-2026-08-25.md`). Since forcing
it doesn't look achievable by anyone, this is no longer a "confirm by
reproducing" item — see Todo #1.

18 of the 37 stale URLs in `notes/stale-urls-2026-08-20.md` (the Singapore
batch — singstat.gov.sg's site restructuring) are fixed this session,
raw-verified per page, applied to `sg-singapore-grok-2026-08.json`'s `url`
fields. Japan (7), Mexico (5), and 6 one-offs are still open.

**Re-fold affordance shipped (old Todo item 8).** An opened country could
only be folded back by a full Reset — now the dock shows an "Opened — N"
pill (bottom-centre, next to Legend) whenever `openedCountries` is
non-empty; it expands into a list with a per-country "Fold" button plus a
"Fold all" footer action. New `foldCountry` in `hierarchy.ts` (removes one
country; `toggleCountryOpen`'s own double-click gesture is untouched and
still only ever adds — see both functions' comments for why an explicit
named-row button doesn't reintroduce the "same gesture, different meaning"
bug that killed the old design). New `src/components/OpenedCountriesPanel.tsx`,
same collapsed-pill/outside-click/Escape pattern as `Legend`/`GroupsPanel`.
Verified: `tsc`/`npm run validate`(120/120)/`npm run build` clean (bundle
1,496.9 kB, +3.4 kB for the new component); a headless Playwright pass
against `vite preview` opened a real country by double-clicking its orb,
confirmed the pill and its list render, clicked "Fold", and confirmed the
country actually re-folded (node count back to 473, pill gone).

**"Why so few?" affordance shipped (old Todo item 7).** A group isolate on a
sparsely-connected region — Middle East, or any thin single country — could
leave only a handful of real reports on screen with nothing on screen saying
why, which reads as a bug even when it's correct. `GroupsPanel`'s collapsed
pill now names the count (`Isolated: Middle East — 25 shown`) and, once
opened, a "Why so few?" note explains the two real causes: some of the
group's own countries are still a folded country-orb (`corb:`) rather than
opened, and/or some of its real reports have no documented cross-border ties
at all and sit in the Isolated shelf. New `groupWhySoFew` memo in `App.tsx`
(reads `disclosedGraph`/`isolated`, not `groupFocus`, since the question is
about the group's own membership); `GroupsPanel.tsx` takes three new optional
props (`shownCount`/`foldedCountries`/`shelvedCount`) so it still works
unchanged for any future caller that doesn't pass them. Verified: `tsc`/
`npm run validate`(120/120)/`npm run build` clean (bundle 1,498.00 kB, +1.14 kB);
a headless Playwright pass isolated Middle East (13 folded countries, 115
shelved reports — both numbers cross-checked against a standalone script over
the live corpus) and separately Bhutan (single-country phrasing: "Bhutan's
own reports are still folded... 2 reports here have no documented
cross-border ties"), confirming both the pill text and the note render
correctly and match the corpus.

**Two of Thomas's six 2026-08-26 data calls executed (items 2 and 6);
three surfaced back to him with new findings (items 3, 4, 5 — see Todo).**

*Item 2 — `br-scn`/`br-ibge-sistema-contas-nacionais` merged, per Thomas's
call to keep `br-ibge-sistema-contas-nacionais` canonical.* `br-scn`'s two
edges (`-> sna-2008`, and `br-cnt`'s inbound edge) retargeted onto
`br-ibge-sistema-contas-nacionais`; that node's description/url/cadence_note
upgraded with `br-scn`'s TIER-A-verified content (it was the thinner Grok
paraphrase, `br-scn` the raw-verified one); `br-scn` removed. Kept the more
heavily-wired id (19 edges vs. 2) as the survivor, so the merge also fixes
which node is actually the corpus's hub for this fact. Both `_dropped` flags
(`brics-g4-partial-2026-08-22.json`, `br-g2-pnadc-siconfi-scn.json`)
annotated RESOLVED rather than deleted.

*Item 6 — `bo-bop -> imf-bpm6` minted, per Thomas's explicit override
("assume it aught to say bpm6").* BCB's own methodology PDF names BPM5, not
BPM6, verbatim, and no `imf-bpm5` node exists to redirect to — this edge is
a directed assumption overriding the literal source text, not a raw-verified
citation, and the `basis` field says so plainly along with pointing at the
overridden quote in `andean-wiring-grok-2026-08.json`'s `_dropped` array.
Worth someone re-checking BCB's current manual edition someday.

*Items 3, 4, 5 — Thomas's stated calls turned out to rest on incomplete
framings once checked, so nothing was executed; see Todo for the surfaced
findings and the decisions actually needed now.* Item 3 in particular: his
"keep `cn-stats-law-impl-regs`" call was based on this session's own earlier
"same shape as item 2" framing, which turned out to be wrong —
`cn-stats-law-impl-regs` is a different document (2017 implementing
regulations), not a duplicate. Flagging that rather than executing it
blind seemed like the right call given what retiring the base law would
have meant.

Sandbox cycle: `npm run gen` (296 slices) → `npm run validate` (0 dangling
notes, clean) → `tsc --noEmit` clean → `npm run build` clean. Pushed to
device via an idempotent Python script (same one run in both places);
sha256 of all five touched files confirmed byte-identical
(`br-brazil-grok-2026-08.json`, `brics-g4-partial-2026-08-22.json`,
`br-g2-pnadc-siconfi-scn.json`, `bo-national-core.json`,
`andean-wiring-grok-2026-08.json`) — one mismatch found and fixed along the
way (a stray `why`/`note` key-name inconsistency introduced by a manual
sandbox patch, harmless to validate but worth keeping the two copies
identical anyway).

Four more of Thomas's 2026-08-26 data/design calls executed (Todo items
2-5 as they stood after the first batch): all four verified end-to-end in a
fresh sandbox (`npm run gen`/`validate`(120/120)/`tsc --noEmit`/`npm run
build` all clean, bundle 1,498.04 kB) and sha256-confirmed byte-identical
against the device copies they were made on directly.

*Item 2 - `cn-stats-law` retired, `cn-stats-law-impl-regs` kept separate.*
Thomas: keep `cn-stats-law-impl-regs` too, reaffirming his original call now
that the base-law/regulations distinction is on the table. `cn-stats-law`
removed from `cn-china-grok-2026-08.json` as a duplicate of the
already-verified `cn-statistics-law` (no edges to retarget - both nodes
were fully isolated). `cn-stats-law-impl-regs` untouched. Flag in
`brics-g4-2026-08-22.json`'s `_dropped` marked RESOLVED.

*Item 3 - `qc-perequation -> isq-vitalite-economique` held, not minted.*
Thomas: don't mint. `_dropped` entry in `qc-quebec-grok-2026-08.json`
changed from `deferred` to `note`, RESOLVED text prepended; the underlying
evidentiary gap (s.5.1 names the index, not ISQ by name) is unchanged, just
no longer being minted over.

*Item 4 - three Andean direction conflicts tossed.* Thomas: toss - kept
each existing corpus edge (`co-comercio-exterior -> co-bop`, `co-emmet ->
co-ipi`, `ec-comercio-exterior -> ec-bop`) as the live direction, rejected
the reversed challenger from `andean-domestic-wiring-batch2.json` in each
pair. In `andean-wiring-grok-2026-08.json`: the three existing-edge
`_dropped` entries flip `caveat` -> `resolved` (also corrects a
copy-paste error in their own original text, which wrongly claimed the
opposite direction "is independently verified... and minted instead" -
it never was, per the corresponding entries below); the three reversed-claim
entries flip `deferred` -> `wrong-direction`.

*Item 5 - "clusters pile toward the centre": force-centre killed, charge
repulsion boosted 33%.* Thomas: set force-centre to 0, and turn up the
inter-cluster push - first pass +10%, then a follow-up call to make it
+33% instead. In `InfluenceGraph.tsx`: `fg.d3Force('center')`
(three-forcegraph's default `d3-force-3d` forceCenter, strength 1,
previously never touched) now has its strength set to 0 - confirmed via
source (`d3-force-3d/src/center.js`) that this force does NOT pull
individual nodes toward the middle; each tick it rigidly translates EVERY
node by the same vector to keep the cloud's own mean position pinned at the
origin, so strength 0 makes that shift an exact no-op. Also answered
Thomas's question in code: a NEGATIVE strength here would not separate
clusters the way `charge` does - because the shift is referenced to the
cloud's own mean, going negative just runs the same uniform whole-graph
translation in reverse, and since a bigger shift makes the next tick's mean
even further off-target, it's an unstable runaway drift, not inter-cluster
repulsion. Left as a comment at the call site so the question doesn't need
re-asking. Separately, `charge` strength (the one force that actually does
separate different clusters - see 2026-08-26's design-discussion findings
below) went `-300 -> -330` (+10%), then on Thomas's follow-up `-330 ->
-399` (+33% over the original -300 baseline, not stacked on top of the
+10%). Both passes verified in a fresh sandbox (`tsc`/`npm run build`
clean each time, sha256-identical to device) with a headless Playwright
screenshot at the Everything tier: scene settles cleanly both times, no
console/page errors, no NaN/exploded layout, and the +33% pass reads
visibly more separated between sub-clusters than the +10% one did. The
centre is still visibly the densest area at +33% (expected: the
shared-hub-node mechanism `galaxyForce`/link-force pulling shared hubs
like sna-2008/imf-bpm6 toward the middle is untouched by a charge tune).
If it's still not enough in ordinary use, the bigger mirrored
inter-cluster force (option (c) below) is still on the table.

**Layout/clustering design discussion opened, nothing built yet
(2026-08-26).** Thomas: "the clusters cluster too much to the centre... it
gets everything jumbled," proposed an invisible keep-out sphere at the
origin (grows with node count, nodes excluded, edges may cross) and asked
separately whether the graph should just "lower the pull to the centre in
general." Grounded the discussion by reading `galaxyForce.ts` and the force
block in `InfluenceGraph.tsx` rather than guessing. Findings: (1)
`galaxyForce` only ever pulls a node toward its OWN family/country
centroid — there is no complementary force pushing DIFFERENT
clusters apart from each other; (2) generic `charge` repulsion is the only
thing separating clusters at all, and it has a hard `distanceMax` cutoff
(420 × spread) beyond which two nodes stop repelling entirely; (3) a
number of high-fan-in hub nodes (sna-2008, imf-bpm6, and the other
international standards) are linked from dozens of countries at once, so
ordinary link-force springs pull them toward the geometric middle and drag
their surrounding clusters in after them — this is the best-supported
mechanical explanation for "jumbled at the centre," not a single monolithic
pull. Separately confirmed `three-forcegraph`'s default `forceCenter()` is
unmodified and still registered — a real "pull toward the centre," but one
that recentres the whole cloud's average position rather than compressing
it, so probably a minor contributor at most. Assessed both of Thomas's
ideas against this and proposed a third: an inter-cluster repulsion force,
the direct mirror of what `galaxyForce` already does, as the most targeted
fix — see Todo for the open decision. No code changed this round; purely a
design conversation per Thomas's own framing ("let's consider... I would
like to hear them too").

**Distance haze/fog is gone (Thomas, 2026-08-26: "too hard on the eyes and
brain"), same treatment as glow — removed outright, not defaulted off.**
No `ViewSettings.fog`, no "Distance haze" slider in `ViewControls.tsx`, no
`scene.fog`/`fogRef`, no hand-rolled fog chunk in the link shader
(`linkVisuals.ts` — dropped `uFogNear`/`uFogFar`/`uFogColour`, the `vDepth`
varying, and the exported `setLinkFog`). The `cloud` ref in
`InfluenceGraph.tsx` existed only to feed fog's near/far planes and is gone
with it. `showHorizon` (the sky gradient) is untouched — Thomas explicitly
kept it ("the horizon is ok though").

**Continuous-database nodes now get the soft-edge treatment; the beam edge
turned out to already exist (old Todo item 3, `notes/node-surface-encoding-
2026-08-19.md`).** Thomas: "give the continuous nodes the beam and soft
edges, forget the bicolor and border treatments." Checking the beam side
first found it was already fully wired — `linkVisuals.ts`'s
`gradientLinkMaterial`/`tickLinkFlow` and `LinkDatum.continuousSource` in
`InfluenceGraph.tsx` were built and live from an earlier session, nothing
to do there. Soft edge was the real gap: `nodeVisuals.ts`'s `nodeMaterial()`
takes a new `soft` option — a second, independent fresnel term (fixed power
1.1, not radius-scaled like the rim's) that fades alpha toward 0 at the
silhouette instead of holding a hard edge, so a continuous source reads as
boundary-less rather than as a report with a border. Wired in
`InfluenceGraph.tsx` off `n.continuous === true`, same `!orb` guard as
`hollow` (and mutually exclusive with it by construction, not a runtime
guard: the validator requires `releases_per_year` on every continuous
report, so `isStandingInstrument` is never true for one). Bordered and
banded stay dropped, per Thomas's explicit call, not parked pending data.
Verified in a fresh sandbox: `tsc`/`npm run validate`(120/120)/`npm run
build` clean (1,497.15 kB — down from 1,498.00 kB, net of removed fog code
against the small soft-edge addition). All edits were made directly
on-device; the sandbox was a disposable build/test copy, not a push-back —
see `_to_delete/README.md`. Headless Playwright confirmed: zero console/page
errors across the run, the View controls panel shows Cluster spread/
Geo-affinity/Galaxy pull/Pulse rate/Horizon with no "Distance haze" entry,
and the scene renders and interacts cleanly (search, tier switching, node
selection, zoom) at multiple zoom levels with no fog-related artifacts. Did
**not** get a pixel-level close-up of one continuous leaf node's soft
silhouette specifically — opening a folded country via a blind 3D
double-click proved too unreliable to land in headless automation after
several tries (a general 3D-picking limitation, not something specific to
this change); the shader logic itself is a minimal, direct variant of the
already-proven rim fresnel technique in the same file, gated by a uniform
that's 0 (no-op) on every node except the ~35-39 continuous ones. Worth
Thomas eyeballing live since it's a subtle effect by design — flag here if
it should read stronger or weaker.

Full narrative for anything above (BRICS G.1–G.4, Canada tier, wiring tier,
prompt 18, new-countries tier) is in `archive/Previous Handoffs/` — this
section only needs to say where things stand now, not how they got here.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Watch for the render-consistency symptom during ordinary use; flag it
   here if it recurs.** Downgraded from "reproduce and confirm" — neither
   you nor this session could force-trigger either failure mode on demand,
   so that was never going to be a clearable bar. The fix is shipped and
   reasoned through against the traced library source; this is now a
   "does it actually recur" watch, not a pending confirmation. Details:
   `notes/render-consistency-repro-2026-08-25.md`.
2. **Now that the cluster-repulsion slider actually works (see Current
   State — it was inert until 2026-08-28), is the separation enough?**
   Original question: did killing force-centre + the charge nudge + the
   new cluster-repulsion force help the "piles up at the centre"
   complaint? Shipped 2026-08-26 as a cheap first pass (see Current
   State) — force-centre off, charge repulsion +33% (after an initial
   +10% pass, per Thomas's follow-up). The scene still visibly clustered
   at the middle in a headless check after that pass (expected: the
   shared-hub-node mechanism is untouched). 2026-08-27: built the bigger
   inter-cluster repulsion force too (mirroring `galaxyForce.ts`,
   previously "option (c)") — see Current State for the model and the
   measured numbers. Open the View panel and try the new "Cluster
   repulsion" slider live; it defaults to 100% on. Flag here if it's
   still not enough, or if it should be pushed further than the 0–3 range
   currently offers.
3. **Look at the soft-edge treatment on a continuous node live and say if
   it reads right.** Shipped 2026-08-26 (see Current State) but not
   pixel-verified against a specific node — headless automation couldn't
   reliably open a folded country to get a close-up. The fresnel power is
   fixed at 1.1; flag here if it should fade harder or softer.

### [Agent] — next build rounds

3. **EU follow-ups** (from the 2026-08-28 rounds, in priority order).
    (a) **Nine countries still have no government-finance node** — see
    Current State. Malta and Bulgaria are one fetch each; Lithuania and
    Spain need a better page; PT/RO/SI/CY are blocked or empty. (b) **Portugal and Romania are the two thin countries** —
    ine.pt and insse.ro both returned ROBOTS_DISALLOWED / robots.txt
    ConnectTimeout on most fetches (reproduced independently, so it reads
    as an intermittent fault rather than a real disallow). Portugal has no
    LFS node at all and `pt-ine-idef`'s url points at the IPC release that
    evidences it rather than its own page; Romania has no IAPC node and so
    no edge into `eurostat-hicp`. Both are worth one retry. (c) Three
    national-accounts←LFS edges are deferred on evidence rather than
    substance — Poland, Greece and Iceland; Iceland is the only country
    with no `employ_simslfs_is.htm` page at all.
4. **Remaining zero-domestic-edge countries: 77.** The candidates tier has
    had its first pass (see Current State); the highest-value single retries
    left in it are **NESDC Thailand** (the whole nesdc.go.th domain is
    unfetchable, which alone costs the SNA basis edge plus all five Gross
    Provincial Product edges — one working document yields six edges),
    **Iraq's Budget Law 13 of 2023** (two edges), **Iraq's GDP/National
    Income metadata document** on cosit.gov.iq (named, never opened, one
    fetch away), and **Vietnam's VSIC 2018 promulgating decision**. Beyond
    that the concentration is **31 single-node stubs** (`AG AL BA BZ CH CU FM HT
    KG KI LC LI MD ME MK NI NR PG PW RS SB TJ TM TO TV UA UZ VU WS XK`),
    leftovers of the "new countries" seeding rounds. Ukraine, Switzerland,
    Serbia, Uzbekistan and the whole Western Balkans sitting at one node
    each is the most conspicuous under-coverage left in the corpus; Cuba,
    Tajikistan, Turkmenistan, Nicaragua, Nauru and Tuvalu have a node with
    no edge at all and are invisible in the graph.
5. **New Grok research round** — the 2026-08-22 queue is fully worked;
    next round needs scoping from scratch. The 2026-08-28 EU round was done
    without Grok, by parallel subagents, at Thomas's request.
4. **Stale-URL research remainder** — 19 of the original 37 in
    `notes/stale-urls-2026-08-20.md` are still open: Japan (7 reports,
    several ministries — one duplicate URL worth checking whether
    `jp-vital-statistics`/`jp-vital-statistics-detailed` should even be two
    reports), Mexico (5 reports, 3 of which point at one generic landing
    page — worth finding the specific programme pages), and 6 one-offs.
    (The file's own header says "37... genuine 404s" but the itemized list
    only ever summed to 36 even before Singapore's 18 were fixed — flagging
    the count mismatch, not resolved.) `notes/_all-corpus-ids-*.txt`/
    `_all-corpus-edges-*.txt` are id/edge cross-check lists — regenerate
    fresh before the next mint, don't reuse. The two housekeeping items
    previously listed here (tombstoned `src/data/slices.generated.ts`,
    orphaned `.rig-sweep` CSS rule) turned out to already be gone — checked
    this session, nothing left to do on either.

---

## 4. How to hand off

1. Edit **Current state** and **Todo** above directly — overwrite, don't
   append. This file describes the present, not history.
2. Delete finished items from Todo; don't leave them as "DONE" entries —
   that's what `archive/Previous Handoffs/` is for.
3. New standing rule or trap discovered? Add it to `PLAYBOOK.md`, not here.
4. Only copy this file to `archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-
   <topic>.md` before a structural rewrite — not on routine turns, since
   there's no more narrative here to lose.
5. Write the project-memory entry; if memory is down, park it in `notes/`
   and say so here.

Only one `HANDOFF.md` at the top level, ever.
