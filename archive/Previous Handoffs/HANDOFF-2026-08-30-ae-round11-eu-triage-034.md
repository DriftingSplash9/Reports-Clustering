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

**3,448 reports · 3,287 dependencies · 738 isolated.** `npm run validate`
(0 errors), `npm run gen` (344 slices, 0 unwired), `tsx
scripts/test-logic.ts` (120/120), `tsc --noEmit`, `npm run build`
(1,499.57 kB) all clean in a cloud sandbox, confirmed 2026-08-30.
`public/corpus-data.json` was regenerated and committed back — it is
current.

**Round 11 (AE/UAE, first-ever wiring round) landed 17 edges + 2 new
nodes, closing AE's isolated count 20 → 8.** AE was fully virgin going in —
never in any prior round's scope. 3 parallel research subagents (one per
theme), every proposed edge and new-node citation independently re-fetched
and verified before minting. New nodes: `us-fed-iorb` (explicit named
anchor for CBUAE's Base Rate) and `int-irena-renewable-capacity-statistics`.
Also wired a previously-unused existing node, `imf-e-gdds`, once research
confirmed the UAE uses e-GDDS not SDDS/SDDS Plus. Patched `ae-construction`'s
placeholder publisher/url (was `null`/generic) once ISIC-classification
evidence resolved its real FCSC source. Full method and all 17 genuine
non-findings: project memory `ae_wiring_round11_2026-08-30`.

**Two items flagged, not resolved — both need Thomas's ruling:**
`ae-oil-production` looks like a duplicate of `ae-oil`, and
`ae-labour-force` looks like a duplicate of `ae-labour`. Unlike Indonesia's
`id-energy-balance-detail` case, **both sides of each AE pair were orphans
going in** — the better-evidenced node was wired this round, the weaker
stub left deliberately unwired. Detail and evidence: project memory
`ae_wiring_round11_2026-08-30`.

**New schema lesson**: `reference_period` on a Dependency is a *structured*
object (`{readings_per_year, window_months, ends: "MM-DD"|null}`), not a
free-text string — 11 AE edges initially failed validation
(`"ends must be MM-DD or null, got undefined"`) from putting descriptive
text there. Fix: omit the field entirely unless you have real calendar-
anchor evidence: the field is optional.

**Round 10 (Indonesia full-orphan sweep)** landed 53 edges + 9 new nodes,
74 → 39 isolated. One Thomas ruling: `id-energy-balance-detail` looks like
a duplicate of `id-energy-balances` — merge, or a real second BPS document?
Full method: memory `id_wiring_round10_2026-08-30`.

**Round 9 (triage + quick-win leads)** landed 12 edges + 10 new nodes
(Congo x4, Guinea-Bissau x2, Uganda, Myanmar, CalSTRS, Russia). One Thomas
ruling carried over: Vietnam's generic-MFSM question — quoted in full in
memory `quickwin_leads_2026-08-30`.

**Unlinked-node counts are now stale here on purpose** — recount from
`public/corpus-data.json` rather than trusting any number in this file.
Post-round-11, the largest remaining untouched pool is **EU (32, coverage
built but unwired)**, then **BR (17) / IN (14) / CA (13)**. AE's remaining
8 are 2 deliberate duplicate-flags (above) + 6 genuine research gaps
(population, education, health, banking-credit, ports-jebel-ali,
dmcc-trade) that resisted this round's method — would need a different
data source, not a retry. Indonesia's remaining 39 are mostly either
genuine `no-document` closes (don't retry with the same method) or
BPS-fetch-blocked (`id-water-resources`, `id-marine-coastal`,
`id-fishing-ports`, `id-provinces-structure`, `id-producer-prices`,
`id-health-facilities`, `id-ecommerce`, and the four Java-province "Dalam
Angka" nodes — all worth a browser-tool retry, not dead ends). Detail and
per-node reasons: project memory `id_wiring_round10_2026-08-30`.

**Cluster-repulsion range: 0–15** (`ViewControls.tsx` / `view.ts`) —
Thomas's call, live. Not yet tested at the new ceiling.

**Renderer perf items** from 2026-08-29 are closed (sphere-geometry
caching was already done; node materials now toggle `transparent`
conditionally — measured, no shader recompile). Not independently
confirmed: an actual FPS win. The sandbox's swiftshader rasterizer runs
~1.5-2 fps for this scene regardless, which swamps the signal. Wants a
real-GPU spot-check. See memory `renderer_transparent_toggle_2026-08-29`.

**Auto-unfold** still dense — accepted, not being chased further.

**Device-bridge trap (repeats)**: repo-staging zips for the cloud sandbox
must be written **inside** the mounted folder before `device_stage_files`
can see them — `/tmp` on the device VM is invisible to the staging tool.
Also: `zip -qr out.zip <paths>` fails with "Operation not permitted... was
replacing the original zip file" on this mount, even targeting a
brand-new filename — stream to stdout instead: `zip -qr - <paths> >
out.zip`.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Rule on `id-energy-balance-detail`**: likely duplicate of
   `id-energy-balances` (see Current State above) — merge, or point at a
   genuinely separate BPS document if one exists.
2. **Rule on `ae-oil-production` vs `ae-oil`**: likely duplicate — merge,
   or point at a genuinely separate ADNOC document if one exists. See
   Current State above / memory `ae_wiring_round11_2026-08-30`.
3. **Rule on `ae-labour-force` vs `ae-labour`**: likely duplicate — merge,
   or is the SDMX Data Explorer breakdown genuinely a separate product?
   Same memory entry.
4. Watch for the render-consistency symptom in ordinary use; flag here if
   it recurs. `notes/render-consistency-repro-2026-08-25.md`.
5. Try dragging cluster repulsion past the old 10 mark now that it's 0–15.
   If still weak at 15, it's not the force — check camera auto-fit or node
   density instead. Detail: `renderer_forces_2026-08-28` memory §3.
6. Watch for any node-rendering oddity (flicker, wrong z-order) after
   2026-08-29's transparent-material change. Visual parity was checked in
   software rendering only; flag here if real hardware differs.
7. Three node-scope rulings, evidence already verified and quoted in each
   `_dropped` entry: (a) `ph-pdp -> ph-basic-ed` — the PDP names EBEIS, an
   information *system*, not a named publication; (b)
   `tw-national-defense-report -> tw-sipri-arms-transfers` — the NDR cites
   SIPRI's Arms Transfers Database, but for PRC *exports* while the node
   is scoped to Taiwan *imports*; (c) `mx-alcaldia-benito-juarez ->
   mx-censos-economicos` — sourced in a chart caption, not body text.
8. **Vietnam's generic-MFSM question** (carried from round 9): does
   `vn-monetary-indicators`'s plain "MFSM" citation (paired with "1993
   SNA") wire to `imf-mfsmcg-2016`, get its own plain `imf-mfsm` (2000)
   node, or stay unwired? Full quote in memory `quickwin_leads_2026-08-30`.

### [Agent] — next build rounds

1. **Next wiring round: EU (32, coverage built, never wired)** — zero
   country-level "this is thin" verdict working against it. BR (17) / IN
   (14) / CA (13) are solid second-tier candidates. **Do not** re-sweep
   IR/YE/SY/MM/IQ/TH/VN — the 2026-08-28 candidates-tier round already
   found domestic chains don't work there.
2. **Indonesia browser-retry list** (round 10 left these `unreadable-source`,
   not dead ends — worth a Claude-in-Chrome pass reading the signed BPS
   download link, same technique that unblocked the Energy Balance PDFs):
   `id-water-resources`, `id-marine-coastal`, `id-fishing-ports`,
   `id-provinces-structure`, `id-producer-prices`, `id-health-facilities`,
   `id-ecommerce`, `id-jakarta`, `id-java-west`, `id-java-central`,
   `id-java-east` (all PDF-truncation, not access-blocked — need a
   deeper-page-targeted fetch, not a different route).
3. **AE remaining gaps** (round 11 left these `no-document`, worth a
   different data source rather than a same-method retry):
   `ae-population`, `ae-education`, `ae-health` (try Ministry of
   Health/Education-specific portals, not just FCSC/uaestat), `ae-banking-
   credit` (no distinguishing edge beyond sharing a CBUAE bulletin with
   `ae-monetary-statistics`), `ae-ports-jebel-ali`, `ae-dmcc-trade`.
   `ae-dld-realestate -> ae-construction` specifically is `deferred` (JS
   PDF viewer resisted extraction) — worth a browser-tool retry.
4. **Corpus wiring** — 77 countries at zero domestic edges. Cheap
   retries: Iraq's GDP/National Income metadata doc (cosit.gov.iq),
   Vietnam's VSIC 2018 decision, Iraq's wage-bill clause (Budget Law
   13/2023). NESDC Thailand — closed negative, don't retry. Then the 31
   single-node stubs: AG AL BA BZ CH CU FM HT KG KI LC LI MD ME MK NI NR
   PG PW RS SB TJ TM TO TV UA UZ VU WS XK.
5. **Cheap browser retries, now known-reachable**: Afghanistan's
   `af-education` and `af-border-mobility` (both render in Chrome, both
   Cloudflare-403 to curl).
6. **Genuinely still blocked, needing a different network route rather
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
