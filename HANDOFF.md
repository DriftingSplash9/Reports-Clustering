# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Finished-round narrative:
project memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog — see §4 rule 2.

Last updated: 2026-08-31

---

## 1. Read next

`PLAYBOOK.md` → `REPORTS.md` (design doc) → project memory for what prior
rounds found. Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**3,351 reports · 2,748 dependencies · 979 isolated.** `npm run validate`
(0 errors), `npm run gen` (347 slices, 0 unwired), `tsx
scripts/test-logic.ts` (123/123), `tsc --noEmit`, `npm run build` all
clean in a cloud sandbox, confirmed 2026-08-31 late evening.
`public/corpus-data.json` is current.

**Second independent audit, 2026-08-31 evening — all rulings applied the
same night (memory `audit_2026-08-31_second_independent` has the full
record; report + 68-edge ledger were delivered in chat, not the repo).**
Verdict HOLD WITH CAVEATS. Data: 23 edges citing the BRICS JSP publications
index → `_dropped` `no-document` (`brics-jsp` fell from #3 out of the top
10); 38 "consistent with" bases (28 Russian) → `deferred` leads (both
Rosstat regional series out of the top 10); 6 agency-named-not-artefact
edges → `no-document`; the 3 duplicate pairs merged (D6 closed; losers
retired into `br-ibge-ipca`, `br-ibge-censo-demografico`,
`ru-rosstat-russian-statistical-yearbook`, merge notes in the losers'
files). Code: `isIndexPage()` warning + "URLs behind 10+ edges" list in the
validator; rank-disagreement list gated to authority ≥ 0.05; compact layout
below 1024px (`lib/useCompactLayout.ts` — top-row tabs fold into Panels ▾
submenus). Docs: README, REPORTS.md, START-HERE, ViewControls comment,
PLAYBOOK §7 (three new rulings). CIRCABC `…/details` URLs open in a real
browser (fetch-hostile, not rotted). Commercial nodes stay. Weighted and
raw rankings now agree on the top 4 exactly.

**First audit's rulings applied 2026-08-31 (Thomas: 1-A, 2-A, 3-A) — memory
`audit_rulings_applied_2026-08-31` has the full record** (463 assertion-only
edges → `_dropped`; 32 treaty + 62 derivation-note nodes retired,
`notes/retired-nodes-2026-08-31.json`; 166 publishers rewritten). Validator
prints PUBLISHERS (0) beside EVIDENCE (162 no-URL-with-quote, 5
bare-homepage, 45 index-page — the whole remaining debt) and
DUPLICATE-SHAPED (0). **Promotion gate: when EVIDENCE reads 0/0/0, flip
graph.ts's three warnings to errors.**

**First real-GPU number (Radeon RX 580, 120 Hz monitor), folded
Everything tier, 415 nodes:** 8.3 ms median → 120 fps, vsync-capped,
GPU 35%, same with a node selected. Not the ceiling — the unfolded
~2,500-node view is still unmeasured; snippet (with the
`info.autoReset` fix) is in the artifact.

**Unlinked-node counts are stale here on purpose.** Recount from
`public/corpus-data.json` before trusting any per-country number. Balkans
(AL BA CH LI MD ME MK RS UA XK) are 1 node/1 edge each; 75 countries sit at
zero domestic edges (memory `new_countries_tier_audit_2026-08-30`).

**Layout: INT↔country link springs are OFF since 2026-08-31**
(`INT_LINK_STIFFNESS = 0`; memory `layout_blob_diagnosis_2026-08-31`,
`int_layer_treatment_2026-08-31`): INT tethers rest at
`INT_TETHER_OPACITY` 0.16 and carry the beam (`INT_TETHER_BEAM_LIFT` 0.45);
the international layer folds into one `corb:INT` orb from tier 2, placed
at the cloud centroid by `lib/intAnchor.ts` (springless, on purpose); 16
≥10-country standards carry standing labels (`standingLabels`). Headless-
checked only; real-hardware look is Thomas's. **Cluster-repulsion 0–15**
is weak for two stacked reasons — camera fit renormalises most of it, and
`FAMILY_REPULSION`/`COUNTRY_REPULSION` aren't scaled by spread — re-measured
2026-08-31 (2 seeds: raw separation doubles, on-screen +2–15%). Don't raise
the ceiling; the INT-spring change is the lever that moved.

**Renderer perf items** from 2026-08-29 are closed; the ceiling on real
hardware is per-object overhead (one material per link — 3,173 draw calls
= 60 fps with one country open), not geometry. Unfolded FPS still owed.
The `[layout] two fixed panels overlap` tripwire no longer fires below
1024px (compact layout, F-12); it still guards the desktop row.

**Auto-unfold** still dense — accepted, not being chased further.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. Watch for the render-consistency symptom in ordinary use; flag here if
   it recurs. `notes/render-consistency-repro-2026-08-25.md`.
2. **Look at tier 2 (one International orb, faded spokes) and tier 4
   with INT + your countries opened (labelled standards, faded
   spokes).** Tunables if it's not right: `INT_TETHER_OPACITY` (0.16),
   `INT_TETHER_BEAM_LIFT` (0.45), `LABEL_PIXELS` (13), the ≥10-country label gate (`standingLabels`),
   `ANCHOR_PULL` (intAnchor.ts). Next lever after that: per-galaxy
   camera fit (fit to the cluster you clicked, not the world). Then the
   perf job: batch links into one material (draw calls are the ceiling —
   3,173 calls = 60 fps with ONE country open).
3. Watch for flicker / wrong z-order on real hardware. 2026-08-31's
   `depthWrite: false` on hollow/soft nodes is the one mechanism found for
   it; if it survives only in the *dimmed* state, `applyFocus` is next.
4. **Real-GPU number** (audit P3): `npm run dev` in a Windows terminal,
   Everything tier, read `renderer.info` + a frame-time sample. Nothing
   perf-related can be judged until this exists.
5. **D2 promotion**: 162 no-URL edges *with* a quote + 5 bare-homepage
   + 45 index-page edges are the whole remaining evidence debt. Once
   re-cited, flip the three warnings in graph.ts to errors.
6. **F-11 decision (camera fit percentile)** — measured 2026-08-31 with the
   force harness (2 seeds, ratios only, harness radii are not the app's):
   p90 ≈ 0.9× the p95 radius, nearly no change; **p80 ≈ 0.6–0.8× → core
   1.3–1.7× bigger on screen, 99% of connected nodes still inside the
   wide (16:9) frame, but ~35 of 154 country centroids leave the vertical
   frame; p70 ≈ 0.57× → core ~1.7×, 90–95% in frame horizontally, ~50–60
   country centroids out; p50 ≈ 0.4× → core ~2.5×, only half the nodes and
   a third to half of the countries in frame.** Node pixel size does not
   change with the percentile (nodeScale is derived from the fit radius) —
   only how much of the periphery is traded for core magnification.
   `CORE_PERCENTILE` is one constant in `measureFit`; p80 is the honest
   middle if you want it tighter, but per-galaxy fit (item 2) is the better
   lever because it magnifies the cluster you asked for instead of
   cropping everyone's periphery.
7. **Look at the compact layout** on a window under 1024px wide: Panels ▾ →
   Reports / Find / Calendar / View controls are submenus (Open/Close +
   Enabled). Known rough edge: the bottom dock's centre pills wrap over the
   tier bar at ~850px — the dock is a grid, so it can't overlap in the
   tripwire's sense, but it looks cramped; not touched.

### [Agent] — next build rounds

0. **Before any new import: the evidence rule is now checked in code.**
   A new edge with no `evidence_url`, a homepage URL, or an index/listing
   URL warns in `npm run validate` (EVIDENCE block, plus a "URLs behind
   10+ edges" list — one URL rubber-stamping dozens of edges is the tell).
   Don't add to the count. **The 162+5+45 re-citation round is the obvious
   next agent job** — the 162 have their quote in `basis`; the 45
   index-page edges (mostly `rosstat.gov.ru/folder/<n>` listings) need the
   actual document; find it, verify HTTP status, add the URL.
   Concentrated in ae-sa, andean, ir-iq-tr-sy, mexico, jp-kr and
   ru-russia slices; many feed `sna-2008`. Three PLAYBOOK §7 rulings from
   the second audit bind every future round: naming the agency ≠ naming
   the artefact; "consistent with" is a lead, not a citation; an index
   page is a homepage with a path. The 23 JSP-contribution and 38
   consistency leads sit in `_dropped` with their original bases —
   re-mint only against the JSP PDF's own source statements / the
   yearbooks' own source notes. **D9
   (isolate shelf)** is a UI task nobody owns yet: split the shelf's
   count into "answered" (`_dropped` with a real reason — 386), "leads
   only" (70) and "never looked at" (244); the `DroppedNote` disclosure
   ratio is the number. **D8**: 1,156 nodes share a homepage `url`
   (Indonesia 61 on bps.go.id, Egypt 39) — give them landing pages or say
   they have none.

1. **BR/IN/CA is mostly settled negatives, not a retry target** (memory
   `br_in_ca_wiring_round2_2026-08-30` has the per-lead status). Still
   open: 4 India state handbooks (Chhattisgarh, Karnataka, Maharashtra,
   Odisha) network-blocked even via Wayback — try CDX-by-filename for
   Odisha; Bihar-at-a-Glance found but scanned-image PDF, needs OCR;
   IEA lead for `br-epe-anuario-energia-eletrica` unresolved.
   `br-poa-anuario-estatistico` is a confirmed dead end.
2. **EU branch is effectively closed.** Only genuinely new leads would
   reopen it — don't re-sweep the 3 remaining isolated nodes.
3. **Indonesia browser-retry list** (round 10 left these
   `unreadable-source`, not dead ends): `id-water-resources`,
   `id-marine-coastal`, `id-fishing-ports`, `id-provinces-structure`,
   `id-producer-prices`, `id-health-facilities`, `id-ecommerce`,
   `id-jakarta`, `id-java-west`, `id-java-central`, `id-java-east` (all
   PDF-truncation, not access-blocked).
4. **AE remaining gaps** (round 11 left these `no-document`, worth a
   different data source): `ae-population`, `ae-education`, `ae-health`,
   `ae-banking-credit`, `ae-ports-jebel-ali`, `ae-dmcc-trade`.
   `ae-dld-realestate -> ae-construction` is `deferred` (JS PDF viewer) —
   tried via browser 2026-08-30, didn't relocate the actual Annual Report
   2024 PDF (dubailand.gov.ae's open-data section is a live transaction
   query tool, not it) — still open, memory `af_ae_browser_recheck_2026-08-30`.
5. **Cheap, still-untouched retries**: Iraq's GDP/National Income
   metadata doc (cosit.gov.iq), Vietnam's VSIC 2018 decision, Iraq's
   wage-bill clause (Budget Law 13/2023). NESDC Thailand — closed
   negative, don't retry.
6. **Genuinely still blocked, needing a different network route**: the
   whole `*.cdmx.gob.mx` family, `issste.gob.mx`, `datos.imss.gob.mx`
   (Imperva WAF), `webapps.peza.gov.ph`, `legacy.doe.gov.ph` and
   `aodm.mnd.gov.tw` (egress policy), `ws.dgbas.gov.tw` (TLS chain), and
   `psa.gov.ph` (Cloudflare JS everywhere — WebFetch reaches it but caps
   quotes at 125 chars, not mintable). Try the Wayback Machine trick
   (PLAYBOOK §6) on these before writing them off further.

---

## 4. How to hand off

1. Edit **Current state** and **Todo** above directly — overwrite, don't
   append. This file describes the present, not history.
2. Delete finished items; don't leave "DONE" entries. A finished round's
   story goes to **project memory**, not here.
3. New standing rule or trap? `PLAYBOOK.md`, not here.
4. Copy to `archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md` only
   before a structural rewrite, not on routine turns.
5. Write the project-memory entry as you go; if memory is down, park a
   note in `notes/` and say so here.
6. If this file is over ~10k characters, trim it before adding to it.

Only one `HANDOFF.md` at the top level, ever.
