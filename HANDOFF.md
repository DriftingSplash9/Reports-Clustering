# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Finished-round narrative:
project memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog — see §4 rule 2.

Last updated: 2026-08-30

---

## 1. Read next

`PLAYBOOK.md` → `REPORTS.md` (design doc) → project memory for what prior
rounds found. Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**3,427 reports · 3,205 dependencies · 793 isolated.** `npm run validate`
(0 errors), `npm run gen` (336 slices, 0 unwired), `tsx
scripts/test-logic.ts` (120/120), `tsc --noEmit`, `npm run build`
(1,513.05 kB) all clean in a cloud sandbox, confirmed 2026-08-30.
`public/corpus-data.json` was regenerated and committed back — it is
current.

**Round 8 (South America wiring + TW/ID two-edge resolution) landed 151
edges + 5 new nodes** (`un-irip-2010`, `uy-inac`, `co-fnc`,
`tw-central-government-budget`, `id-sbh-2022`) across 13 research files,
11 countries. Isolated fell 945 → 793. One validator error surfaced on
first pass: 4 new nodes used `jurisdiction_level: "national"`, which
isn't in the closed union — the corpus convention for national-level is
`"federal"`. Fixed and reconfirmed clean. Full method, dedup catches, and
traps: project memory `sa_wiring_round_2026-08-30`.

**Round 7 (browser/curl unblock) landed 22 edges, 0 new nodes.** Its main
finding is that most of the "access-blocked" backlog was never blocked: a
`ROBOTS_DISALLOWED` verdict describes WebFetch obeying robots.txt, not the
site, and `mnd.gov.tw` was wide open to plain curl the whole time. Three
more fetch-layer traps came out of it (gob.mx attachment PDFs; a walled
site's unwalled sibling download host; parsing a Cloudflare-403 PDF
same-origin in the browser with pdf.js). All four are now PLAYBOOK §6.

**Then two structural changes, both Thomas's call, both landed the same
day.** The two confirmed Mexican duplicate pairs were merged
(`mx-chiapas-tuxtla-detail` → `mx-tuxtla`, `mx-guerrero-acapulco-detail`
→ `mx-acapulco-metro`); the survivors carry the repointed edges, and where
the two census edges collided their bases were folded into one rather than
one being discarded. And **72 treaty/agreement nodes were retired** —
trade and economic-partnership agreements, investment-treaty and FTA
network framings, multilateral environmental conventions, and
bloc-membership framings. A treaty is not a publication with a methodology
dependency, so no research round could ever have wired them. All 72 were
orphans; no edge broke. INT orphans fell 112 → 41. A third, much smaller pass then retired 5
analytical meta-nodes (comparison frameworks and policy postures with no
publication behind them). Standing decisions and their boundaries are in
PLAYBOOK §7; all 79 removed node records are archived verbatim in
`notes/retired-nodes-2026-08-29.json`, so every change is reversible.

**Unlinked-node counts — measured 2026-08-29 from
`public/corpus-data.json`** (orphans/total): ID 75/120, TW 49/109, INT
41/240, EU 35/75, IR 32/34, SR 30/39, AR 29/62, VN 29/48, CL 28/53, GY
27/36, CA 25/270, UY 25/48, EC 24/45, AE 20/34, TH 19/25, BR 18/98, PY
18/46, IN 16/97, KR 16/52, VE 16/26, IQ 15/22, JP 15/63, BO 14/52, YE
14/15, CO 13/35, PE 13/35, MM 12/17, SY 12/13, TR 11/34, MX 9/104, PH
9/77, SA 3/16. **Measure, don't inherit** — the counts this file carried
before round 7 were wrong for VN, KR, JP, TR and PH.

**Cluster-repulsion range: 0–15** (`ViewControls.tsx` / `view.ts`) —
Thomas's call, live. Not yet tested at the new ceiling.

**Renderer perf items** from 2026-08-29 are closed (sphere-geometry
caching was already done; node materials now toggle `transparent`
conditionally — measured, no shader recompile). Not independently
confirmed: an actual FPS win. The sandbox's swiftshader rasterizer runs
~1.5-2 fps for this scene regardless, which swamps the signal. Wants a
real-GPU spot-check. See memory `renderer_transparent_toggle_2026-08-29`.

**Auto-unfold** still dense — accepted, not being chased further.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. Watch for the render-consistency symptom in ordinary use; flag here if
   it recurs. `notes/render-consistency-repro-2026-08-25.md`.
2. Try dragging cluster repulsion past the old 10 mark now that it's 0–15.
   If still weak at 15, it's not the force — check camera auto-fit or node
   density instead. Detail: `renderer_forces_2026-08-28` memory §3.
3. Watch for any node-rendering oddity (flicker, wrong z-order) after
   2026-08-29's transparent-material change. Visual parity was checked in
   software rendering only; flag here if real hardware differs.
4. **The meta-node sweep found far less than expected and stopped at 5** —
   `jp-prefectural-contrast-summary`, `kr-regional-contrast-extended`,
   `vn-defence-policy`, `id-defence-posture`, `tw-new-southbound-tech`.
   Nothing further should be swept by keyword: "framing" is a Grok verbal
   tic that appears in real statistics nodes, and the "— high/low-poverty
   contrast" nodes are subnational JURISDICTIONS, not framings — they are
   most of the South America seam. PLAYBOOK §7 has the detail.
5. Three node-scope rulings, evidence already verified and quoted in each
   `_dropped` entry: (a) `ph-pdp -> ph-basic-ed` — the PDP names EBEIS, an
   information *system*, not a named publication; (b)
   `tw-national-defense-report -> tw-sipri-arms-transfers` — the NDR cites
   SIPRI's Arms Transfers Database, but for PRC *exports* while the node
   is scoped to Taiwan *imports*; (c) `mx-alcaldia-benito-juarez ->
   mx-censos-economicos` — sourced in a chart caption, not body text.

### [Agent] — next build rounds

1. **A triage pass is now worth more than another wiring round in the
   worked countries.** 793 isolated is not a to-do list: a
   large share is structurally unwireable, and round 7 confirmed several
   of those on real bytes. Separate "not yet researched" from
   "researched, nothing to find" before anyone scopes another pass at
   ID/TW/IR/EU.
2. **Corpus wiring** — 77 countries at zero domestic edges. Cheap
   retries: Iraq's GDP/National Income metadata doc (cosit.gov.iq),
   Vietnam's VSIC 2018 decision, Iraq's wage-bill clause (Budget Law
   13/2023). NESDC Thailand — closed negative, don't retry. Then the 31
   single-node stubs: AG AL BA BZ CH CU FM HT KG KI LC LI MD ME MK NI NR
   PG PW RS SB TJ TM TO TV UA UZ VU WS XK.
3. **Cheap browser retries, now known-reachable**: Afghanistan's
   `af-education` and `af-border-mobility` (both render in Chrome, both
   Cloudflare-403 to curl); Indonesia's remaining energy/GHG leads via the
   BPS signed-link technique.
4. **Genuinely still blocked, needing a different network route rather
   than a different tool**: the whole `*.cdmx.gob.mx` family (four
   distinct failure modes), `issste.gob.mx`, `datos.imss.gob.mx` (Imperva
   WAF), `webapps.peza.gov.ph`, `legacy.doe.gov.ph` and `aodm.mnd.gov.tw`
   (both egress policy), `ws.dgbas.gov.tw` (TLS chain), and `psa.gov.ph`
   (Cloudflare JS on every host — WebFetch reaches it but caps quotes at
   125 chars, so it cannot yield mintable verbatim).

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
