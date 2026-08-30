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

**3,437 reports · 3,217 dependencies · 785 isolated.** `npm run validate`
(0 errors), `npm run gen` (342 slices, 0 unwired), `tsx
scripts/test-logic.ts` (120/120), `tsc --noEmit`, `npm run build`
(1,513.05 kB) all clean in a cloud sandbox, confirmed 2026-08-30.
`public/corpus-data.json` was regenerated and committed back — it is
current.

**Round 9 (triage + quick-win leads) landed 12 edges + 10 new nodes**
across Congo (x4 nodes), Guinea-Bissau (x2), Uganda, Myanmar, CalSTRS and
Russia — 13 of the 15 leads a full measured triage of all 793 isolated
nodes turned up as "fully evidenced, just needs a node minted." Also
fixed one mislabeled `_dropped` reason tag and resolved one entry whose
`no-document` verdict a fresh fetch directly contradicted (the citation
was there, an earlier round just missed it — see PLAYBOOK rule 13/14).
One validator error on first pass: new legal-instrument nodes used
`releases_per_year: 0`, which fails "must be positive when present" —
fixed by omitting the field for one-off laws. Full method, what didn't
clear the evidence bar (Egypt, China, Philippines), and the one item
needing a Thomas ruling (Vietnam's generic-MFSM question): project memory
`quickwin_leads_2026-08-30`. **The full triage itself** — every isolated
node sorted into never-researched / hard-closed / soft-deferred, with a
per-country table and the caveat that IR/YE/SY/MM/IQ/TH/VN's high
never-researched counts are misleading (a country-level pass already
found those thin) — is project memory `triage_2026-08-30`; read it before
scoping the next wiring round rather than re-deriving country counts.

**Round 8 (South America wiring + TW/ID two-edge resolution) landed 151
edges + 5 new nodes** (`un-irip-2010`, `uy-inac`, `co-fnc`,
`tw-central-government-budget`, `id-sbh-2022`) across 13 research files,
11 countries. Full method, dedup catches, and traps: project memory
`sa_wiring_round_2026-08-30`.

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

**Unlinked-node counts are now stale here on purpose** — round 8 (South
America) and round 9 (10 new nodes across 6 countries) both changed
per-country orphan counts. The current, measured-2026-08-30 per-country
table lives in project memory `triage_2026-08-30`, not here — **measure,
don't inherit**: recount from `public/corpus-data.json` rather than
trusting any number in this file, including this one.

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

1. **Next wiring round: AE or ID.** Triage (`triage_2026-08-30`) and the
   13 quick-win leads it turned up (`quickwin_leads_2026-08-30`) are both
   done. Best next full round is **AE (20 orphans, never in ANY prior
   round's scope)** or **ID (71 orphans, the largest untouched pool after
   three partial rounds)** — neither has a country-level "this is thin"
   verdict working against it. EU (32) / BR (17) / IN (14) / CA (13) are
   solid second-tier candidates. **Do not** re-sweep IR/YE/SY/MM/IQ/TH/VN
   — their high never-researched counts are misleading; the 2026-08-28
   candidates-tier round already found domestic chains don't work there.
2. **One modelling ruling Thomas owes**: `vn-monetary-indicators` cites
   the plain, unversioned "MFSM" (paired with "1993 SNA" in the same
   sentence) — wiring it to the corpus's only monetary-manual node,
   `imf-mfsmcg-2016` (the materially-updated 2016 edition), would repeat
   the exact generic-citation-vs-versioned-node trap already ruled on for
   Iran's SNA-93 and the Iran/Iraq COICOP cases. Either mint a plain
   `imf-mfsm` (2000) node, or rule the aspirational "plans to adapt"
   language close enough to wire as-is. Quoted in full in
   `quickwin_leads_2026-08-30`.
3. **Corpus wiring** — 77 countries at zero domestic edges. Cheap
   retries: Iraq's GDP/National Income metadata doc (cosit.gov.iq),
   Vietnam's VSIC 2018 decision, Iraq's wage-bill clause (Budget Law
   13/2023). NESDC Thailand — closed negative, don't retry. Then the 31
   single-node stubs: AG AL BA BZ CH CU FM HT KG KI LC LI MD ME MK NI NR
   PG PW RS SB TJ TM TO TV UA UZ VU WS XK.
4. **Cheap browser retries, now known-reachable**: Afghanistan's
   `af-education` and `af-border-mobility` (both render in Chrome, both
   Cloudflare-403 to curl); Indonesia's remaining energy/GHG leads via the
   BPS signed-link technique.
5. **Genuinely still blocked, needing a different network route rather
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
