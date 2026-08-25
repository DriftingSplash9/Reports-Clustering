# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives at the top
level.** When superseded, the new session copies this file into
`archive/Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and
writes the replacement here. Never two handoffs at the top level.

Last written: **2026-08-22 (item 6b — §5 item 9, BRICS G.4 FULL DISPATCH:
Brazil + China, 8 new international-standard nodes, 26 new edges, 26
`_dropped` entries.** Thomas said "read the handoff, do BRICS/G.4" — this is
the systematic dispatch item 6a explicitly left open ("the already-quoted
low-hanging fruit" only). First re-measured the actual current state, since
the 2026-08-20 Grok archive mint had grown Brazil to 99 nodes and China to 66
in the meantime (item 6a's "19 unwired"/"7 unwired" counts were stale): 86 of
Brazil's 99 nodes and 48 of China's 66 had no edge to any international-
standard node. Dispatched 8 parallel research agents (4 per country, by
theme — industrial/business, household/social, agriculture/environment/
tourism, fiscal/monetary for Brazil; fiscal law, labour/R&D/education/
health, environment/resources, national-accounts/CPI/monetary for China),
each required to raw-verify every claim against a LIVE primary source (not
trust any existing node description, including this corpus's own) and to
report honest drops rather than force edges. Every agent independently
caught and discarded at least one WebFetch fabrication this round — verified
instead via direct `curl`+`pdftotext` or, where a portal was Cloudflare/JS-
walled (ibge.gov.br's main site, confirmed this round to sit behind a
Cloudflare JS challenge that silently 403s WebFetch), a real browser
session. **Headline results**: Brazil's whole industrial/business-survey
family (PIM-PF, PIA-Empresa, PIA-Produto, PAS, PAC, PAIC, PMC, PIMES,
PINTEC) connects to `isic` via IBGE/Concla's own CNAE-to-ISIC concordance
documentation (PIMES uniquely on ISIC Rev. 3, having been discontinued in
2016 before CNAE's Rev.-4 migration; everything else Rev. 4); PINTEC
additionally connects to a newly-minted Oslo Manual node (3rd ed., 2005,
`methodology_depends_on`) and cites Frascati Manual 2015. Brazil's Censo
Demográfico names the UN's population-census principles by exact edition
(Rev. 3, 2017); its population projections name four distinct UN Population
Division methods; its Censo Agropecuário names FAO's World Programme for
the Census of Agriculture; its environmental-economic accounts
independently re-confirm the UN SEEA dependency the corpus's own (Grok-
imported, unverified) description had only pointed at. On the fiscal side,
`br-bcb-nota-fiscal-abaixo-linha` → GFSM 2014 is the single strongest
citation of the round (BCB devotes a whole manual chapter to it), and a
genuine structural finding surfaced: Brazil runs two non-interoperable
fiscal tracks, a domestic LRF/PCASP track (LC 101/2000 → MDF → RREO/RGF,
and STN's legacy RTN, which its own manual admits still runs on the
superseded MEFP 1986) with no GFSM citation, versus a separate GFSM-2014-
aligned track (BCB's "abaixo da linha" manual, this round's mint) that
cites it explicitly. Two IBGE health surveys connect to narrow WHO
instruments (PNS → the Rose Angina Questionnaire; PeNSE → the Global
School-based Student Health Survey). China, true to the G.1-G.3 pattern of
being the least internationally-connected BRICS country, mints only 4 edges
against 24 researched candidates, but each is exact and edition-named: 19th-
ICLS unemployment-statistics resolution, Frascati Manual (7th ed.) for R&D
expenditure, WHO ICD-10 for the Health Statistical Yearbook (with its own
ICD-9→ICD-10 2002 switchover date), and — closing a gap earlier rounds left
open — NBS's CPI methodology naming COICOP 2018 explicitly on a dedicated
indicator-explanation page distinct from the monthly release itself. Two
DENIALS were documented and correctly NOT minted as edges: Brazil's own
COICOP concordance page states POF/SNIPC expenditure classifications are
"ainda não harmonizadas" (not yet harmonized) with COICOP; China's own
Mineral Resources Report affirmatively cites domestic GB/T standards, not
UNFC. **A second duplicate-node pair was found** (same shape as item 6a's
br-ibge-sistema-contas-nacionais/br-scn): `cn-stats-law` and
`cn-stats-law-impl-regs` (Grok-imported, isolated) appear to duplicate the
already-researched, still-isolated `cn-statistics-law` — flagged for
Thomas, nothing wired pending his call. **Structural result**: main
component 978 → **1154** nodes; Brazil in main component 58/99 → **73/99**,
wired-to-international 13/99 → **33/99**; China in main component 54/66 →
**55/66**, wired-to-international 18/66 → **22/66**, fully-isolated 7 → 6.
New slice `src/data/research/brics-g4-2026-08-22.json` (8 nodes, 26 edges,
26 `_dropped`). Sandbox-verified: `npm run validate` 120/120 exit 0
(**3,110 reports, 2,150 dependencies** — up from 3,102/2,124), `tsc --noEmit`
clean, `npm run build` clean at 1,488 kB (unchanged). Leads carried
forward, not closed this round: China's UNFC-mineral-classification
bridging document (real, UNECE-confirmed, but its PDF 403'd this session);
a CAEP GEP-accounting guideline that DOES cite SEEA-EEA 2012 (a different
document from the candidate Eco-Environment Yearbook, needs its own node);
`br-mtur-anuario-turismo`'s sibling product "Economia do Turismo" which DOES
cite UNWTO/OMT definitions (a different statistical product than the
Anuário candidate); `cn-budget-law`'s SDDS relationship (real at the
country level per an IMF Article IV report, but not stated in the Budget
Law's own text — the actual source is China's dsbb.imf.org NSDP page,
confirmed JS-walled again this round); and `mnr.gov.cn` being entirely
unreachable from this sandbox (DNS/proxy failure, a NEW access note
distinct from the DSBB JS-wall — worked around via mirrors this round, but
worth a real-browser check in a future session). File committed to
`src/data/research/`; §3, §5 item 9 and §7 updated below. **Project memory
was down this session** (both read and write failed) — the memory entry is
parked at `notes/memory-pending-2026-08-22-brics-g4.md` per the standing
process rule; a future session with working memory should write it
properly and then delete the parked copy.)** Earlier item
6a — §5 item 9, BRICS G.4 partial: Brazil +
China grep-first pass, 4 edges minted, one duplicate node flagged, one hit
the DSBB JS-wall.** Thomas said "let's do 9" (the research-backlog todo:
722 candidates-only nodes, 170 `_dropped` leads, BRICS G.4 for Brazil/China
never dispatched, with the specific method note "grep node descriptions for
international-node names first, it found a fully-evidenced edge last time").
Scoped this round to the concrete, method-specified slice: applied the G.3
grep technique to Brazil's 19 and China's 7 unwired candidate nodes (both
Grok-imported, `_batch`-tagged, un-verified-for-edges). Cross-referencing
node descriptions against the corpus's known international-standards nodes
(`sna-2008`, `imf-bpm6`, `imf-gfsm`, `imf-sdds`/`imf-sdds-plus`,
`imf-e-gdds`, `ipsas`, `isic`, `un-coicop-2018`, `oecd-frascati-manual`,
`oecd-icio`, `sdmx-standard`, `bis-basel-framework`) surfaced 6 hits; 2 were
false-positive substring matches (`br-finbra`/`br-scn` both matched "ICIO"
inside Portuguese words like "início"/"ofício", not the OECD ICIO tables —
discarded on inspection, not minted). **Important correction to the G.3
lesson**: unlike `in-mospi-cpi` at G.3, these Grok-imported node
descriptions are SUMMARIES, not raw-verified quotes with a fetch record —
so the grep only located WHERE to look, not a citable basis by itself. Each
of the remaining 4 candidates was then independently fetched from a live
primary source and raw-verified before minting:
`br-ibge-contas-regionais → sna-2008` (IBGE's municipal-GDP page, verbatim
conformity sentence), `br-bcb-balanco-pagamentos → imf-bpm6` (found via
search since the BCB portal page is JS-rendered — a BCB methodological-note
PDF states the BPM6 adoption verbatim), `cn-bop → imf-bpm6` (SAFE's own
quarterly release: "The table is compiled according to BPM6."),
`cn-gdp-national-accounts → sna-2008` (NBS's own official Q&A on the 2016
CSNA revision, verbatim Chinese: "2016年核算体系采用了与2008年SNA基本一致的核算方法").
**Held out, not minted**: `br-ibge-sistema-contas-nacionais` turned out to
be a near-duplicate of the already-wired `br-scn` (identical title family,
same publisher, same 2026-08-17 Grok batch) — flagged in `_dropped` for
Thomas to merge/retire rather than silently doubling the edge;
`cn-mof-fiscal-statistics → imf-sdds` hit the known DSBB JS-wall trap
(REPORTS.md §7) — WebFetch returned only the DSBB shell, not China's actual
GGO00 row — needs a real-browser fetch, left as an open lead. New slice
`src/data/research/brics-g4-partial-2026-08-22.json` (0 new nodes, 4 new
edges). Sandbox-verified: `npm run validate` 120/120 exit 0
(**3,102 reports, 2,124 dependencies** — up from 2,120), `tsc --noEmit`
clean, `npm run build` clean at 1,488 kB (unchanged). This is explicitly a
HALF round — Brazil's unwired-candidate count went 19→18 net (`br-scn`
itself was already wired before this session touched anything), China's
went 7→5; the 722-candidate and 170-`_dropped` backlogs are otherwise
untouched, and full BRICS G.4 (systematic dispatch, not just the
already-quoted low-hanging fruit) is still open. File committed to
`src/data/research/`; §3 and §5 item 9 updated below.)** Earlier item 5z —
panels default to ON-and-minimized, not hidden.** Thomas sent a screenshot
of his own working layout — all eight `PanelKey`s present as collapsed
pills/tabs (Reports and View as edge tabs; Find, Calendar, Compare, Regions
& Countries, Legend as bottom/top pills; Unlinked always a pill) — and
asked why a fresh load doesn't look like that instead of hiding everything
behind the Panels ▾ menu. It was two separate defaults, both now flipped:
(1) `MenuBar.tsx` gained `PANELS_DEFAULT` (all eight `true`), which now
seeds a session with no saved `rig.panels.v1` instead of `PANELS_HIDDEN`
(all `false`) — `PANELS_HIDDEN` itself is untouched, still used by "Hide
all" and the corrupted-storage fallback, just no longer the fresh-load
default; "Show all" now reuses `PANELS_DEFAULT` instead of its own
hand-written all-true literal. (2) Each panel's OWN inner
collapsed/minimized state, independent of the outer `panels.x` boolean —
`GroupsPanel`, `Legend`, `Compare`, `CalendarPanel` were already
`useState(true)` and needed nothing; `SearchPanel`'s `minimized` flipped
`false`→`true`, and both `PanelShell` call sites (Reports, View) gained a
`defaultCollapsed` prop they never had (silently defaulting to `false`,
i.e. wide open, before this). Without step (2), step (1) alone would have
popped every panel open across the whole screen on first load — the
opposite of what was asked. Verified: sandbox `npm run validate` 120/120
exit 0 (3,102/2,120, data untouched), `tsc --noEmit` clean, `npm run build`
clean at 1,488 kB (unchanged). Live Playwright screenshot of a brand-new
session (fresh browser context, no localStorage) matches Thomas's own
screenshot exactly — "Panels 8" badge, all eight present as pills/tabs,
nothing expanded, nothing absent.)** Earlier item 5y — §5 item 4 SHIPPED:
main search bar now finds/isolates regions, blocs/orgs, publishers, and
countries, not just report nodes.** `lib/search.ts` gained `searchGroups`
(same normalise + word-boundary scoring shape as report search, over
`RegionGroup` from `regions.ts` — a group's label, plus a country's own
2-letter code scored lower); `SearchPanel.tsx` now merges `search()` and
`searchGroups()` into one ranked, keyboard-navigable list (both scorers
share a 0-300ish scale, so a whole-label match like "Asia" or "Japan"
naturally outranks partial report matches) and renders group rows with an
"isolate" hint instead of a fly-to; choosing one calls the SAME
`onChooseGroup`/`handleChooseGroup` handler `GroupsPanel` rows already
used, so isolating from the search bar and from the Regions panel are one
action reached two ways, not two behaviours that could drift. `App.tsx`
gained one new module constant (`SEARCHABLE_GROUPS = [...REGION_GROUPS,
...COUNTRY_GROUPS]`) and passes it plus `onChooseGroup`/`selectedGroupId`
into `SearchPanel`. Live Playwright-verified: typing "asia"/"japan" ranks
the group first, Enter isolates it exactly like `GroupsPanel`, toggles
off correctly, plain report queries unaffected. Earlier items 5a-5x: full
narrative in `archive/Previous Handoffs/` (most recently
`HANDOFF-2026-08-22-5z.md`, which itself points back further) and in
project memory.)**

---

## 1. Read these first, in this order

| # | Document | Why |
|---|---|---|
| 1 | **`REPORTS.md`** — start at "🛑 Agent: read this before doing any work" | The standing rules. Most violated: never run git; every edge needs a document. |
| 2 | **This file, all of it** | Current state, todos, traps. |
| 3 | `START-HERE.md` | Orientation. Rendered verbatim in-app as Help ▸ What this is — editing it edits the product. |

Then by task: anything visual → §5/§6 here, then
`notes/visual-revamp-2026-08-18/visual-revamp-review.md`; camera/fit/layout →
`notes/camera-fit-measurement-2026-08-19.md`; the flicker →
`notes/flicker-tests-2026-08-19.md`; isolate / "why is country X empty" →
`notes/cross-border-gaps-2026-08-20.md`; the cross-border research thread
→ `notes/crossborder-verification-2026-08-22.md`; **any Grok prompt →
`notes/grok-diary.md` FIRST (§8) — including its new §0 on relaying
attachment lists to Thomas separately**; regions/blocs/publishers →
`src/lib/regions.ts` file comment; compare/path → `Compare.tsx` file comment;
schema → `src/lib/types.ts`.

**House habit: the code is the design doc.** `palette.ts`, `nodeVisuals.ts`,
`linkVisuals.ts`, `view.ts`, `modes.ts`, `savedViews.ts`, `hierarchy.ts` and
`InfluenceGraph.tsx` carry dated comments explaining every constant. Read the
comment before changing the number. Several say "do not raise this" and mean it.

---

## 2. Standing rules (the ones that actually break)

Full text in `REPORTS.md`.

1. **Never run git here from an agent session** — not even read-only (stale
   lock). **Never STATE git status in any doc either** — a false "uncommitted
   backlog" claim survived unverified for weeks once. Ask Thomas or read a
   GitHub Desktop screenshot; delete any git-status claim you find.
2. **No document, no edge.** If nothing published says the dependency exists,
   it does not go in the graph.
3. **A pointer is not a source.** WebFetch can fabricate content for a dead
   URL; raw-verify before trusting any quote. Applies doubly to Grok output —
   **and applies to Grok-imported node DESCRIPTIONS too, not just its
   dependency claims** (item 6a, 2026-08-22): a summary description that
   names a standard is a lead to go verify, not a citable basis on its own.
4. **`npm run validate` before and after any data change** (120 checks as of
   item 5o). It cannot run through the device bridge. Recipe: stage
   `src/ scripts/ package.json tsconfig.json index.html vite.config.ts
   START-HERE.md` (the full `src/data/research/` corpus included) into a
   Linux sandbox, `npm install`, `npm run gen`, then tsc/validate/build.
5. **`public/corpus-data.json` is generated** (`npm run gen` /
   `scripts/gen-slices.ts`). Never hand-edit it; it must exist before
   tsc/validate/the app resolve data. Fresh sandbox → run `npm run gen` first.
6. Agents cannot delete device files — `mv` into `_to_delete/`, log it in
   `_to_delete/README.md`. Emptying `_to_delete/` is Thomas's own job.
7. **Headless verification is expected**: build + `vite preview` + Playwright
   on the preinstalled Chromium with
   `--use-angle=swiftshader --enable-unsafe-swiftshader`. Geometry/colour/
   pixel counts exact; **bloom/glow untrustworthy** in software rendering;
   CSS transitions can wedge under load.
8. **Measure before believing.** If a statement has a number in it and nobody
   ran anything, it is a guess.
9. **Any prompt a Thomas-in-the-loop human relays to a third party (Grok,
   etc.) needs its attachment/action list told to him separately, in plain
   chat text, not just inside the pasteable block** — he skims or skips the
   prompt itself. See `notes/grok-diary.md` §0 for the case that established
   this (round 3, 2026-08-22).

**Process rules (Thomas, 2026-08-20).** Update this file every work turn, not
just at milestones: copy the current file to `archive/Previous Handoffs/`
first, then append a dated section — additive, not a rewrite (a full rewrite
is reserved for when the file goes unwieldy; that's what happened 2026-08-22).
Hand off rather than push on when: you re-derive something already settled,
contradict an earlier answer, retry a tool past the documented once-only
policy, or the session has been through a compaction. Say "this is a good
point to hand off," write this file, stop. Project memory: write entries as
you go; if it refuses, park in `notes/memory-pending-<date>.md` and say so
here.

---

## 3. Where the project is (2026-08-22)

**Live corpus: 3,110 reports · 2,150 dependencies** (after the item 6b
BRICS G.4 full dispatch mint, below — 8 new nodes and 26 new edges over the
item-6a baseline). `npm run validate` **120/120 logic checks, exits 0**,
`tsc --noEmit` clean. The 2026-08-20 mint (1,250 → 3,091), the per-country
fold, the full-review punch list, and the pulse/beam round are all DONE —
details in memory and the archived handoffs. **Worth re-running
`npm run validate` on Thomas's machine once** — every mint including this
one was built and verified from a sandbox copy, never on-device.

**BRICS G.4 full dispatch (item 6b) — LANDED 2026-08-22.** New slice
`src/data/research/brics-g4-2026-08-22.json`, 8 nodes / 26 edges. Full
narrative is in the "Last written" block above; summary here for quick
reference. New international-standard nodes: `oecd-oslo-manual` (Oslo
Manual, 3rd ed. 2005), `who-rose-angina-questionnaire`, `who-gshs` (Global
School-based Student Health Survey), `un-wpp-methodology` (World Population
Prospects methodology), `fao-world-programme-census-agriculture`, `un-seea`
(System of Environmental-Economic Accounting), `imf-mfsmcg-2016` (Monetary
and Financial Statistics Manual and Compilation Guide), `who-icd-10`.
Brazil: 22 new edges (9 industrial/business surveys → `isic`, plus PINTEC →
Oslo Manual and → Frascati Manual; PNS → Rose Angina Questionnaire; PeNSE →
GSHS; Censo Demográfico → UN census principles; population projections →
WPP methodology; Censo Agropecuário → FAO WCA; environmental-economic
accounts → SEEA; three BCB/fiscal edges — monetary statistics → MFSM 2016,
international reserves → BPM6, below-the-line fiscal result → GFSM 2014;
IPCA and INPC → CPI Manual, `cites`). China: 4 new edges (surveyed
unemployment → 19th-ICLS resolution; R&D expenditure → Frascati Manual;
Health Statistical Yearbook → ICD-10; CPI → COICOP 2018, closing a gap
earlier rounds left open since the monthly release itself never names
COICOP — the citation lives on a separate NBS methodology page). Two
documented denials, correctly not minted: Brazil's POF/SNIPC vs COICOP
("ainda não harmonizadas"), China's Mineral Resources Report vs UNFC
(affirms domestic GB/T standards instead). **New duplicate-node flag**:
`cn-stats-law`/`cn-stats-law-impl-regs` (Grok-imported, isolated) likely
duplicate the already-researched `cn-statistics-law` (also isolated) — see
§5 item 3c below, needs Thomas's call, same shape as item 6a's
br-ibge-sistema-contas-nacionais/br-scn flag. Structural result: main
component 978 → 1154 nodes; Brazil in main component 58/99 → 73/99; China
54/66 → 55/66. `npm run validate` 120/120 exit 0, `tsc --noEmit` clean,
`npm run build` clean at 1,488 kB.

**BRICS G.4 partial (item 6a) — LANDED 2026-08-22.** New slice
`src/data/research/brics-g4-partial-2026-08-22.json`, 0 nodes / 4 edges,
all `methodology_depends_on`:
- `br-ibge-contas-regionais → sna-2008` — IBGE's municipal/regional-GDP
  page states verbatim: "estando em conformidade, portanto, com o manual
  System of national accounts 2008, SNA 2008..."
- `br-bcb-balanco-pagamentos → imf-bpm6` — a BCB methodological-note PDF
  (found via search; the bcb.gov.br portal page itself is JS-rendered and
  returns nothing to WebFetch) states verbatim: "...em conformidade com a
  sexta edição do Manual de Balanço de Pagamentos e Posição Internacional
  de Investimento (BPM6), do Fundo Monetário Internacional (FMI)".
- `cn-bop → imf-bpm6` — SAFE's own quarterly BOP release states verbatim:
  "The table is compiled according to BPM6."
- `cn-gdp-national-accounts → sna-2008` — NBS's own official Q&A on the
  State Council's 2016 CSNA revision states verbatim: "2016年核算体系采用了
  与2008年SNA基本一致的核算方法" ("the 2016 accounting system adopted
  accounting methods essentially consistent with the 2008 SNA").
- **Held out**: `br-ibge-sistema-contas-nacionais` (near-duplicate of the
  already-wired `br-scn` — see §5 item 9 below, needs Thomas's call before
  anything is wired to it) and `cn-mof-fiscal-statistics → imf-sdds` (DSBB
  JS-wall, needs a real-browser fetch).
- Method: grepped every Brazil/China unwired node's description for the
  corpus's own known international-standards node names (the G.3
  technique), which surfaced 6 candidates (2 discarded as substring false
  positives on "ICIO"), then independently raw-verified each surviving
  candidate against a LIVE primary source before minting — the node
  descriptions themselves, being unverified Grok-batch summaries, were only
  a pointer to where to look, per the corrected §2 rule 3 above.

**Round 3 (5w) — LANDED 2026-08-22.** New slice
`src/data/research/crossborder-round3-2026-08-22.json`:
- New node `mu-national-accounts` (Statistics Mauritius quarterly national
  accounts, ESI Issue 1937). Edge `mu-national-accounts → sna-2008`
  (SNA 2008 quote raw-verified — the edge round 1/2 had to hold out for
  lack of both a node and a current quote).
- Mauritius SDDS Plus: Thomas's merge call — kept the existing
  institutional `mu-statsmauritius → imf-sdds-plus` edge AND added two new
  series-level edges (`mu-national-accounts`, `mu-statsmauritius-cpi` →
  `imf-sdds-plus`), all three citing the same NSDP/PR 26/077 sources.
- Three new standards facts, none previously wired: `af-bop → imf-e-gdds`
  (DAB's own site titles its BOP file "Balance of Payments Transactions
  (BPM6)"), `iq-bop → imf-e-gdds` (DSBB BOP DQAF, BPM6 classification
  language), `ir-national-accounts → imf-e-gdds` (DSBB NA DQAF, honest
  SNA-1968/1993 vintage disclosure).
- **Held out again: Afghanistan CR 06/251.** Grok's redo re-cited the same
  two GDDS quotes from IMF Country Report 06/251 as round 1/2 (which also
  couldn't verify them). Two rounds in a row now; tell Grok to drop this
  specific claim rather than re-attempt it. Recorded as a `caveat`
  dropped-note on the existing `af-nsia → imf-e-gdds` edge.

**The cross-border mint (5s) — LANDED 2026-08-22.** One new slice,
`src/data/research/crossborder-standards-2026-08-22.json`: 10 nodes, 44
edges, every `basis` carrying its raw-verified quote. **Every one of the 19
zero-cross-border-edge countries now has at least one cross-border edge**.
Full account: `notes/crossborder-verification-2026-08-22.md` and
`archive/Previous Handoffs/HANDOFF-2026-08-22-5z.md` §3.

**Git:** unknown to agents by design — see rule 1.

---

## 4. What the app is now

Assume all of this exists and works; each has a dated comment at the site.

- **Lenses** (`modes.ts`): STANDARD / GROUP_COMPARISON / WORLD_OVERVIEW —
  recolour via ref + mutation effect, never a `forceGraph` memo dep.
  GROUPS/WORLD are disabled at tier 1 (mostly no-ops there).
- **Constellation look**: near-black bg, flat panels. **The whole bottom edge
  is one dock** (`bottomDock`, App.tsx): tier bar left, Compare + GroupsPanel
  + Legend centre, Unlinked pill right, empty fourth track reserving the View
  panel's column. No bottom panel carries fixed coordinates. Top row (search
  bar left-of-centre, calendar tab right of it) is still hand-anchored.
- **Reports/View panels** stop their scroll above the tier bar
  (`REPORTS_PANEL_BOTTOM_CLEARANCE` / `VIEW_PANEL_BOTTOM_CLEARANCE`).
- **Hover** = identity chip; **click** = Detail card from the right (with
  host link); **edge click** = evidence card from the left (endpoints, type,
  period, verbatim basis, evidence_url). Camera refits unconditionally on
  every filter change (deliberate — third rewrite).
- **Edges/pulses have SET SIZES** (`baseLinkWidth()` = 1); weight lives in
  rest length + opacity. Never reintroduce additive/white pulse cores.
  **Continuous-database edges** (`Report.continuous`, 35 nodes) draw as an
  animated flow in the edge shader, zero teardrop particles.
- **Menu bar**: Panels ▾ (fresh sessions default all 8 ON-and-minimized as
  of item 5z, `rig.panels.v1`), Views ▾ (saved views, ★ open-on-load, deep
  links via `?rig=`), Help ▾ (renders START-HERE.md raw). Tier bar + status
  line deliberately NOT in the menu — primary navigation.
- **Disclosure folds TWICE** (`hierarchy.ts`): tier ladder folds into family
  orbs (`orb:`), then per-country orbs (`corb:`) until a country is
  double-clicked open (`openedCountries`). Orb `country` is the MODAL member
  — display-grade, NEVER membership; membership checks read `.members`.
  No UI to re-fold one country short of Reset (known gap).
- **Galaxy clustering** (`galaxyForce.ts`, `view.galaxy` slider): pulls nodes
  toward their OWN family/country centroid. Read its file comment and
  `geoAffinity.ts`'s before touching either — similar-looking, different
  questions. Provinces are NOT a third level (79% of `region` values are
  free prose — needs a data pass first).
- **Isolate** (`view.isolateFocus`) hides everything off the traced chain,
  built on the UNFILTERED index so cross-border edges survive (pinned
  Israel/MERCOSUR test). **Groups panel** ("Regions & Countries",
  bottom-centre) isolates continents/blocs/publishers/single countries the
  same way via multi-seed `computeGroupFocus`. Neighbourhood slider bounds
  the walk by hops. Search runs over the FULL corpus (report AND group
  results, as of item 5y) and tags results "outside filter"/"outside
  isolate"; choosing an outside result is an informed exit.
- **Unlinked shelf** = a one-line summary pill → searchable list inside the
  Reports panel (`unlinkedOpen`).
- **Escape** clears one level, topmost first (edge card → selection → group
  isolate); panels consume their own Escape. "/" ignored while any input has
  focus.
- **PNG export**: 2× DPR, no HUD, re-entry-guarded, 8192px capture clamp.
  **Zoom baseline freezes** while the user owns the camera (`frozenBase`).
- **Loading curtain**: opaque until settled+fitted, 25s safety timeout is
  load-bearing; corpus-fetch failure pins it with an error instead of an
  empty scene.
- **Sliders**: cluster spread 200%–10000% (opens 200%), geo-affinity 0–500%
  (opens 150%), zoom 0.25–2.6 of fit.

---

## 5. THE TODO LIST (live items only)

### In flight
1. **Grok round 3 — DONE, minted as 5w.** Nothing further needed here.
2. **Grok research queue (item 5v) — 24 prompts queued, replies not in yet.**
   `notes/grok-research-queue-2026-08-22/00-README.md` is the index —
   priority order, attachment manifest, and the "just collect replies,
   don't try to mint them yourself" instruction for Thomas. When a Claude
   session picks this back up: read that README, then work through
   whichever `*-REPLY.*` files exist next to their prompts, same
   parse-check → raw-verify → mint pipeline as every round before this.

### [Thomas] — only you can
2. **Render-consistency / camera-fit bug — DEFERRED by your own call** (deal
   with it after the research round). One cause fixed (`cooldownTime`
   15s→45s); the open suspect is `runFit`'s tracking pass false-tripping
   `userOwnsCamera` via `cameraMovedOffFit` under OrbitControls damping —
   needs live instrumentation BEFORE touching it. Details: 5p section of
   `archive/Previous Handoffs/HANDOFF-2026-08-22-5r-full-pre-slim.md`.
3. **Glow-slider check, one minute, only if** you ever see brightness-only
   flicker at a STABLE camera distance (`notes/flicker-tests-2026-08-19.md`,
   Suspect 3, still untested).
3b. **`br-ibge-sistema-contas-nacionais` vs `br-scn` — duplicate-node call
   needed (item 6a, 2026-08-22).** Both are titled "Sistema de Contas
   Nacionais" / "...Brasil (SCN)", same publisher IBGE, but different ids
   from different research rounds (`br-scn` from the earlier G.2 hand
   round, already wired; `br-ibge-sistema-contas-nacionais` from the
   2026-08-17 Grok domestic batch, unwired). Either merge/retire the Grok
   one, or confirm they're genuinely distinct (different vintage/scope)
   before an agent wires anything to it. Full note in the `_dropped` block
   of `brics-g4-partial-2026-08-22.json`.
3c. **`cn-stats-law` / `cn-stats-law-impl-regs` vs `cn-statistics-law` —
   duplicate-node call needed (item 6b, 2026-08-22).** Same shape as 3b
   above, found this round: `cn-stats-law` and `cn-stats-law-impl-regs`
   (both from the 2026-08-17 Grok import, `cn-china-grok-2026-08.json`,
   both fully isolated, 0 edges) look like duplicates of the already
   hand-researched, richly-quoted `cn-statistics-law` (from
   `cn-g2-budget-law-equalization.json` — ALSO currently isolated with 0
   edges, despite the quality of its research). Either the base
   Statistics Law and its 2017 implementing regulations are genuinely two
   documents (in which case `cn-stats-law-impl-regs` is NOT a duplicate of
   the other two and should stay separate) or `cn-stats-law` duplicates
   `cn-statistics-law` outright — needs Thomas's read of the three
   descriptions side by side. Full note in the `_dropped` block of
   `brics-g4-2026-08-22.json`. Nothing wired to any of the three pending
   his call.

### [Agent] — next build rounds
4. **DONE, item 5y (2026-08-22).** Search bar now finds/isolates a region,
   bloc, publisher, or country, not just report nodes.
5. **"Why so few?" affordance** on group isolates — "Middle East → 6 shown"
   is correct (cross-border gaps) but reads as a bug with no explanation on
   screen. More useful as the gap list shrinks.
6. **Re-fold / "N countries opened" affordance** — currently only a full
   Reset re-folds an opened country; no readout of how many are open.
7. **Typed edges** — what a trunk's "type" means when one line stands for 57
   mixed relationships. Not started; needs a design conversation first.
8. **Soft-edge node idea** — `notes/node-surface-encoding-2026-08-19.md`.
9. **Research backlog — BRICS slice CLOSED for this pass, item 6b
   (2026-08-22); wider backlog still open.** Original scope: 722
   candidates-only nodes (no edges) corpus-wide, 170 `_dropped` leads,
   BRICS G.4 (Brazil/China never systematically dispatched). Item 6a did a
   grep-first low-hanging-fruit pass (4 edges); item 6b then re-measured
   from scratch (the 2026-08-20 Grok archive mint had grown Brazil to 99
   nodes and China to 66, making the old "19 unwired"/"7 unwired"/
   "722 candidates" counts stale) and ran a genuine 8-agent systematic
   dispatch covering every Brazil/China node with no edge to any
   international-standard node (86 of 99 Brazil nodes, 48 of 66 China
   nodes at the start of this round) — see §3 item 6b above for the full
   result (8 new nodes, 26 new edges, 26 `_dropped`). Brazil: 33/99 nodes
   now wired to an international standard (was 13/99), 73/99 in the main
   component (was 58/99). China: 22/66 wired (was 18/66), 55/66 in the
   main component (was 54/66). **Still open**: the wider corpus-wide
   candidates-only/`_dropped` backlog outside BRICS (this and the prior
   round only ever looked at BR/CN); the specific China leads carried
   forward this round (`cn-budget-law` → `imf-sdds`, real at the country
   level per an IMF Article IV report but blocked on the dsbb.imf.org
   JS-wall for a Budget-Law-specific citation; a CAEP GEP-accounting
   guideline that cites SEEA-EEA 2012 but needs its own node, separate
   from the Eco-Environment Yearbook candidate that doesn't cite it; the
   MNR-UNECE UNFC bridging document, real per UNECE's own site but 403'd
   this session); Brazil's `br-mtur-anuario-turismo` sibling product
   "Economia do Turismo" (does cite UNWTO/OMT definitions, unlike the
   Anuário candidate); and item 3c's new `cn-stats-law` family duplicate
   flag. **Correction to the standing "grep node descriptions" advice
   from G.3**, reconfirmed this round: for Grok-batch-imported nodes
   specifically, the description is a summary the grep locates, not a
   citable quote by itself — still raw-verify against a live source
   before minting (see §2 rule 3).
10. **Housekeeping** (needs shell): actually delete the tombstoned
    `src/data/slices.generated.ts` and the orphaned `.rig-sweep` CSS rule in
    `uiTheme.ts` (both → `_to_delete/`). `notes/stale-urls-2026-08-20.md`
    exists for the 37 real 404s from the mint's URL check.

### Standing decisions — do not re-raise
Geo-exploration: dropped entirely. Right-drag panning + low-end zoom:
confirmed solid. Arrow-key fly navigation: offered, declined. Parked: 134
uncountable cadences; 7 single-use `proposed:` tags; `diary.csv` is Thomas's
personal file — leave it alone.

---

## 6. Architecture crib — where things live

- **`src/App.tsx`** — state owner (filter, drilldown, selection + group
  selection, view, lens, panels, saved views, curtain latch), the HUD, both
  cards, lighting, Canvas + bloom, the bottom dock. `STARTUP_VIEW`/`DEEP_LINK`
  read at module scope — cannot be hooks.
- **`src/components/InfluenceGraph.tsx`** — imperative renderer. One
  `forceGraph` memo, deps `[graph, spreadApplied]` ONLY. Everything else
  flows through refs + mutation effects. `runFit`/`measureFit` own camera +
  node scale; `applyFocus` owns dim/raycast; `useFrame` runs pulses, orb
  breath, flow animation, fog, flight, `onReady`.
- **`src/lib/`** — `palette.ts` (colour, `COUNTRY_FAMILY`/`COUNTRY_LABEL`),
  `modes.ts` (lenses), `view.ts` (tuned constants), `savedViews.ts`,
  `deepLink.ts`, `uiTheme.ts` (`HUD_TOP` etc.), `hierarchy.ts` (orbs/folds),
  `regions.ts` (continents/blocs/publishers/directory), `selection.ts`
  (`computeFocus`/`computeGroupFocus`/`computeNeighbourhoodFocus`,
  `shortestPath`), `graph.ts` (build + validate), `galaxyForce.ts`,
  `geoAffinity.ts`, `schedule.ts` (calendar), `search.ts`, `types.ts`.
- **`src/components/`** — `linkVisuals.ts` (edge shader/beam),
  `nodeVisuals.ts` (materials/rims), `MenuBar`, `HelpCard`, `LoadingCurtain`,
  `PanelShell`, `GroupsPanel`, `Legend`, `Compare`, `PngExport`,
  `SearchPanel`, `CalendarPanel`, `ViewControls`, `CameraZoom`.
- **Data**: `src/data/research/*.json` → `scripts/gen-slices.ts` →
  `public/corpus-data.json` (generated). Browser loads it via
  `browserCorpus.ts`; Node scripts via `src/data/index.ts` (never import
  from browser code); both share `assembleCorpus.ts`. Validation:
  `scripts/validate-data.ts` + `scripts/test-logic.ts` (120 checks).

---

## 7. Known traps — the ones that actually bite

- **`RelationshipType` is a closed 4-value union** (`calculated_from` /
  `uses_data_from` / `methodology_depends_on` / `cites`). An off-union value
  → NaN edge weight → NaN PageRank corpus-wide, silent and total. `Relation`
  is only `audits`/`supersedes`. Grok output routinely invents types — map
  them, never pass them through. Same for `Domain` and every closed union:
  cast, not parsed — check `types.ts` before inventing a value.
- **`PanelShell` supports one panel per edge; the bottom edge belongs to the
  dock.** A new bottom panel is a one-line dock-cell addition, not a
  coordinate hunt. Reserve dock space with an empty grid TRACK, never an
  item margin. A DEV-only tripwire in `App.tsx` warns on intersecting fixed
  panels.
- **Never put a mode, tab, hover, or view setting in the `forceGraph` memo
  deps** — every change there resets the camera and re-warms physics.
- **A force reading alpha-scaled strength needs its own reheat-then-refit
  pair** or its slider silently does nothing after settle (search
  `view.galaxy` in InfluenceGraph.tsx for the template).
- **A cap that silently binds costs twice** (node size AND edge width) —
  whenever a slider ceiling moves, recompute `nodeScaleFor`'s cap.
- **Camera can't end up inside the cluster by raising spread** (fit = 5.675 ×
  p95; measured ratios ≤ ~2). Spread saturates past ~1000%.
- **`meshes.current` cannot be trusted for POSITIONS** — read
  `positionedById` or `graphData().nodes`.
- **Transparency does not stop a raycast** — ghosted elements need
  `raycast = () => {}`. Rim-colour uniform exists only after first shader
  compile. `onPointerMissed` can fire twice per click — the edge-pick path
  always OPENS, never toggles.
- **Menus close on `pointerdown`, not `click`**; synthetic drags do NOT reach
  OrbitControls (use `autoRotate` in harnesses); CSS transitions wedge under
  software rendering (curtain unmounts on a timer for this reason).
- **Orb `country` is modal, not membership** — anything deciding membership
  must read `.members`.
- **Grok's JSON is not reliably JSON** — parse-check first. Its ids and
  enum values are inventions until grepped against the corpus. Never
  hand-edit JSON insertions — generate them. Its stated `files_received`
  confirmations are not reliable either — verify by checking content
  plausibly reflects attached files. **Its imported node DESCRIPTIONS are
  also not a citable basis by themselves (item 6a, 2026-08-22)** — a
  Grok-batch description naming a standard is a lead, not a quote; always
  raw-verify against a live primary source before minting off it.
- **Never reintroduce faceted node geometry** (fresnel rims) or
  additive/white pulse cores.
- **The IMF DSBB tables are JS-walled** (use a real browser, not WebFetch —
  reconfirmed item 6a, 2026-08-22 on China's GGO00 row); its PDF observance
  reports parse fine headless. imf.org press releases and elibrary.imf.org
  403 headless fetchers but load in a browser.
- **imf.org PDF *documents* (not press releases) 403 everything** —
  WebFetch, curl (even with a browser UA), Wayback Machine proxying, all
  403. **Fix: navigate Chrome to
  `https://docs.google.com/viewer?url=<url-encoded-pdf-url>&embedded=true`
  instead** — renders as a normal page. Use `find` (natural-language
  search), not `get_page_text`, to check whether a phrase exists anywhere
  in a long lazy-loaded document — `get_page_text` truncates at a byte cap.
- **Some government portal landing pages are JS-rendered and return
  nothing useful to WebFetch** (bcb.gov.br/estatisticas/setor-externo,
  item 6a, 2026-08-22; also bcb.gov.br/estatisticas/panoramabc, item 6b) —
  search for the underlying methodological-note PDF or a specific sub-page
  instead of fetching the portal shell.
- **ibge.gov.br's main site sits behind a Cloudflare JS challenge that
  silently 403s WebFetch** (item 6b, 2026-08-22, confirmed by direct curl) —
  WebFetch was caught fabricating plausible content for a 403'd IBGE URL
  this round. Use a real browser session for ibge.gov.br pages, or fetch
  documents directly from `ftp.ibge.gov.br` / `biblioteca.ibge.gov.br` /
  `concla.ibge.gov.br`, none of which sit behind the same challenge.
- **`mnr.gov.cn` (China's Ministry of Natural Resources) was entirely
  unreachable from this sandbox** (item 6b, 2026-08-22 — DNS/proxy failure
  on every attempt, both WebFetch and direct curl; a different failure
  shape from the DSBB JS-wall). Worked around this round via mirrors
  (creva.org.cn, MOFCOM's fdi.mofcom.gov.cn) and gov.cn's own
  announcements; a future session with different egress may reach it
  directly.
- **dsbb.imf.org confirmed JS-walled again (item 6b, 2026-08-22)** — every
  path tried served an identical byte-for-byte shell. China's SDDS/NSDP
  metadata (needed to source a `cn-budget-law`/`imf-sdds`-style edge
  properly) sits behind this wall; a real-browser fetch is the only known
  fix, same as the DQAF/GGO00 case at item 6a.

---

## 8. Grok pipeline — diary and prompt queue

**Before writing ANY prompt for Grok, read `notes/grok-diary.md`** — the
standing playbook of what works and Grok's dated failure modes. Append a
dated lesson to the diary after processing every Grok reply. Every handoff
carries this pointer (Thomas's standing instruction, 2026-08-22).

Prompts live beside the diary as `notes/grok-prompt-*.md`; the diary's
"Round log" section is the queue state. Nothing currently in flight —
round 3 landed as 5w; the 24-prompt research queue (item 5v) is waiting on
Thomas + Grok to fill in replies.

---

## 9. How to hand off

1. `cp HANDOFF.md "archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md"`.
2. Append a dated section to this file (or rewrite only if it has gone
   unwieldy again). §1 stays first.
3. Carry forward what is live; delete what is finished. A handoff that
   accumulates is a handoff nobody reads.
4. Write the project-memory entry; if memory is down, park it in `notes/`
   and say so here.

Only one `HANDOFF.md` at the top level, ever.
