# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Finished-round narrative:
project memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog — see §4 rule 2.

Last updated: 2026-08-29

---

## 1. Read next

`PLAYBOOK.md` → `REPORTS.md` (design doc) → project memory for what prior
rounds found. Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**3,501 reports · 3,055 dependencies.** `npm run validate` (0 errors),
`npm run gen` (323 slices, 0 unwired), `tsx scripts/test-logic.ts`
(120/120), `tsc --noEmit`, `npm run build` (1,513.05 kB) all clean in a
cloud sandbox, reconfirmed 2026-08-29 after round 7 landed 22 edges.
`public/corpus-data.json` was regenerated and committed back to the
device — it is current.

**Round 7 was the browser/curl unblock round**, and its main finding is
that most of the "access-blocked" backlog was never blocked. A
`ROBOTS_DISALLOWED` verdict describes WebFetch obeying robots.txt, not
the site: `mnd.gov.tw` was wide open to plain curl the whole time.
`gob.mx` serves its attachment PDFs to curl while challenging its HTML.
BPS Indonesia's signed download host isn't walled even though every
`*.bps.go.id` page is. A Cloudflare-403 PDF can be fetched same-origin
inside a real browser and parsed there with pdf.js. All four are now
PLAYBOOK §6 traps. 22 edges minted, 0 new nodes, 16 nodes de-orphaned.

**Unlinked-node counts — measured 2026-08-29 after round 7** (orphans /
total, from `public/corpus-data.json`): INT 112/311, ID 75/120, TW
49/109, EU 35/75, IR 32/34, SR 30/39, AR 29/62, VN 29/48, CL 28/53, GY
27/36, CA 25/270, UY 25/48, EC 24/45, AE 21/35, TH 19/25, BR 18/98, PY
18/46, IN 16/97, KR 16/52, VE 16/26, IQ 15/22, JP 15/63, BO 14/52, YE
14/15, CO 13/35, PE 13/35, MM 12/17, SY 12/13, TR 11/34, MX 9/104, PH
9/77, SA 3/16. **1,022 isolated of 3,483.**

**The previous HANDOFF's per-country counts were wrong** and are
replaced above — it claimed VN 50/67, KR 36/72, JP 17/65, TR 18/41, PH
10/77. Rule 8: measure before believing.

**Cluster-repulsion range: 0–15** (`ViewControls.tsx` / `view.ts`) —
Thomas's call, live. Not yet tested at the new ceiling.

**Renderer perf items** from 2026-08-29 are closed (sphere-geometry
caching was already done; node materials now toggle `transparent`
conditionally — measured, no shader recompile). The one thing not
independently confirmed is an actual FPS win: the sandbox's swiftshader
rasterizer runs ~1.5-2 fps for this scene regardless, which swamps the
signal. Wants a real-GPU spot-check. See project memory
`renderer_transparent_toggle_2026-08-29`.

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
4. **Two confirmed duplicate-node pairs need a merge decision**, both from
   overlapping batch12 passes, both confirmed on a field-by-field diff:
   `mx-tuxtla` ≈ `mx-chiapas-tuxtla-detail`, and `mx-acapulco-metro` ≈
   `mx-guerrero-acapulco-detail`. Round 7 deliberately minted one edge per
   node so nothing is double-counted, and the edges survive a merge
   intact. Detail in `mx-browser-unblock-2026-08-29.json`.
5. **Is a treaty a report?** 112 of the 1,022 isolated nodes are `INT`,
   and most are Grok-imported trade agreements and conventions (KORUS,
   RCEP, Basel, Ramsar, Montreal, Paris, BIT networks). They are not
   statistical publications with methodology dependencies, so no wiring
   round can fix them — it is a modelling call about what belongs in a
   *report* influence graph. Biggest single bucket in the corpus.
6. Three node-scope rulings, each with the evidence already verified and
   quoted in its `_dropped` entry: (a) `ph-pdp -> ph-basic-ed` — the PDP
   names EBEIS, an information *system*, not a named publication; (b)
   `tw-national-defense-report -> tw-sipri-arms-transfers` — the NDR
   genuinely cites SIPRI's Arms Transfers Database, but for PRC *exports*
   while the node is scoped to Taiwan *imports*; (c)
   `mx-alcaldia-benito-juarez -> mx-censos-economicos` — sourced in a
   chart caption rather than body text.

### [Agent] — next build rounds

1. **South America is the biggest unworked seam and has never been
   researched**: SR 30, AR 29, CL 28, GY 27, UY 25, EC 24, PY 18, VE 16,
   BO 14, CO 13, PE 13 — about 237 orphans across eleven countries. This
   is the obvious next round and is fresh ground, unlike the countries
   the last six rounds keep revisiting.
2. **Two fully-evidenced edges are waiting on a node that doesn't exist.**
   Mint the node and the edge lands verbatim-quotable: (a) Taiwan's
   Central Government General Budget (中央政府總預算) — MND statistics
   table 11 (`https://www.mnd.gov.tw/File/57520`) names it as its
   statistical universe; (b) Indonesia's Survei Biaya Hidup 2022 (SBH
   2022) — the provincial CPI publication states the index's weights and
   base-year consumption values come from it. Both quoted in their
   `_dropped` entries.
3. **Corpus wiring** — 77 countries at zero domestic edges. Cheap
   retries: Iraq's GDP/National Income metadata doc (cosit.gov.iq),
   Vietnam's VSIC 2018 decision, Iraq's wage-bill clause (Budget Law
   13/2023). NESDC Thailand — closed negative, don't retry. Then the 31
   single-node stubs: AG AL BA BZ CH CU FM HT KG KI LC LI MD ME MK NI NR
   PG PW RS SB TJ TM TO TV UA UZ VU WS XK.
4. **Afghanistan's two 403s are now known-reachable in a real browser**
   (`dtm.iom.int` and `unicef.org` both render fine in Chrome, both are
   Cloudflare-403 to curl) — `af-education` and `af-border-mobility` are
   a cheap retry, not a dead end.
5. **Genuinely still blocked, all confirmed this round, all needing a
   different network route rather than a different tool**: the entire
   `*.cdmx.gob.mx` family (four distinct failure modes),
   `issste.gob.mx`, `datos.imss.gob.mx` (Imperva WAF),
   `webapps.peza.gov.ph`, `legacy.doe.gov.ph` (egress policy),
   `aodm.mnd.gov.tw` (egress policy), `ws.dgbas.gov.tw` (TLS chain), and
   `psa.gov.ph` (Cloudflare JS on every host — WebFetch reaches it but
   caps quotes at 125 chars, so it cannot yield mintable verbatim).
   Indonesia's remaining BPS leads (`id-energy-balances`,
   `id-ghg-inventory` → a proposed `id-esdm-energy-statistics` node, and
   the IPCC guidelines target) are NOT in this list — the BPS technique
   above works, they simply weren't reached this round.

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
