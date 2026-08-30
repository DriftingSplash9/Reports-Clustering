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

**3,432 reports · 3,307 dependencies · 715 isolated.** `npm run validate`
(0 errors), `npm run gen` (346 slices, 0 unwired), `tsx
scripts/test-logic.ts` (120/120), `tsc --noEmit`, `npm run build`
(1,499.57 kB) all clean in a cloud sandbox, confirmed 2026-08-30.
`public/corpus-data.json` was regenerated and committed back — it is
current.

**BR/IN/CA isolated-node wiring round (2026-08-30) landed 19 edges, 0 new
nodes**, in `src/data/research/br-in-ca-wiring-round-2026-08-30.json`.
Measured before this round: BR 18 isolated / 98 total, IN 16 / 97, CA 25 /
270. Method: 8 parallel research subagents (one per country/theme), every
proposed quote independently re-fetched by the orchestrating session
before minting. **BR (6 edges)**: the municipal-GDP chain — 6 state
statistics institutes wired to their own city's IBGE Contas Regionais
figure (`br-mg-fjp-pib`→bh, `br-df-ipedf-pib`→brasília, `br-ce-ipece-pib`→
fortaleza, `br-sc-seplan-pib`→florianópolis, `br-rj-ceperj-anuario`→rio,
`br-pr-ipardes-pib`→curitiba — the last two sourced from IBGE's own
technical-note collaborator list after CEPERJ's/IPARDES's own sites proved
unreachable). `br-pe-condepe-fidem`→recife stayed unwired: IBGE's own
technical note names a *different* Pernambuco agency as its real partner —
flagged, not wired. **IN (4 edges)**: 2 state handbooks → `in-census-
india`; `in-mohfw-national-health-profile` → `in-census-india` and →
`in-mospi-srs` (direction corrected — the health profile cites
Census/SRS, not the reverse). **CA (9 edges)**: 4 city budgets →
`mpac-assessment`, `hrm-budget-business-plan` → `ns-pvsc-assessment-roll`,
`nl-maa-annual-report` → `nl-maa-assessment` (self-citation),
`winnipeg-budget` → `winnipeg-assessment-roll`, `on-mcu-tuition-framework`
→ `on-mcu-operating-grants` → `statcan-census-population`. 2 prior stale
`_dropped` `no-document` entries (Halifax/PVSC, Ottawa/MPAC) superseded by
fresher sourcing, marked `resolved`. **Caught before shipping**: 4 BR
education nodes had solid evidence of the expected module/summary
relationship but already carry a `part_of` pointing at that same target —
the validator rejects a dependency edge onto a report's own `part_of`
container (`graph.ts:536`). Logged as `_dropped` notes, not minted;
**worth a standing check before any future round proposes an edge that
mirrors an existing `part_of`**. Full detail: memory
`br_in_ca_wiring_round_2026-08-30`.

**Two new duplicate-node flags, need Thomas's ruling** (same pattern as
the AE/Indonesia flags below — not merged or silently wired):
`br-pnad-continua` (isolated) vs `br-ibge-pnad-continua` (well-wired, 5
edges) — identical title, "Pesquisa Nacional por Amostra de Domicílios
Contínua (PNAD Contínua)". `in-mospi-nas` (isolated) vs `in-mospi-
national-accounts-statistics` (well-wired, 12 incoming edges) — identical
title, "National Accounts Statistics".

**EU branch effectively closed** (round 2026-08-30): 3 isolated nodes
left (`at-statistik-austria-mikrozensus-ake`, `si-surs-lfs`,
`cy-cystat-lfs`), all documented negatives — do not "fix" by minting.
Detail: memory `eu_unlinked_wiring_round_2026-08-30`.

**Round 11 (AE/UAE) landed 17 edges + 2 new nodes, 20 → 8 isolated.**
Two duplicate flags open — see Todo §3.1/3.2. Memory
`ae_wiring_round11_2026-08-30`.

**Round 10 (Indonesia)** landed 53 edges + 9 new nodes, 74 → 39 isolated.
One duplicate flag open — see Todo §3.3. Memory
`id_wiring_round10_2026-08-30`.

**Unlinked-node counts are stale here on purpose except BR/IN/CA and EU,
just recomputed above.** Recount from `public/corpus-data.json` before
trusting any other number in this file.

**Cluster-repulsion range: 0–15** (`ViewControls.tsx` / `view.ts`) —
Thomas's call, live. Not yet tested at the new ceiling.

**Renderer perf items** from 2026-08-29 are closed (sphere caching,
conditional `transparent`). Not independently confirmed: an actual FPS
win — swiftshader swamps the signal. Wants a real-GPU spot-check.

**Auto-unfold** still dense — accepted, not being chased further.

**Device-bridge trap (repeats)**: repo-staging zips for the cloud sandbox
must be written **inside** the mounted folder before `device_stage_files`
can see them; `zip -qr out.zip <paths>` fails with "Operation not
permitted" on this mount — stream to stdout instead: `zip -qr - <paths> >
out.zip`. **New this round**: zipping `archive/`/`node_modules/`/`.git`
too can time out (408MB, 120s) — zip only `src/ public/ scripts/
package.json package-lock.json tsconfig.json index.html` + `START-HERE.md`
(imported via `?raw` by `HelpCard.tsx`, needed for `npm run build`
specifically) and run `npm install` fresh in the sandbox; ~5MB, fast.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Rule on `br-pnad-continua` vs `br-ibge-pnad-continua`**: identical
   title, likely duplicate — merge, or point the isolated one at a
   genuinely separate document if one exists.
2. **Rule on `in-mospi-nas` vs `in-mospi-national-accounts-statistics`**:
   identical title, likely duplicate — same call.
3. **Rule on `id-energy-balance-detail`**: likely duplicate of
   `id-energy-balances` — merge, or point at a genuinely separate BPS
   document if one exists.
4. **Rule on `ae-oil-production` vs `ae-oil`**: likely duplicate — merge,
   or point at a genuinely separate ADNOC document if one exists. See
   memory `ae_wiring_round11_2026-08-30`.
5. **Rule on `ae-labour-force` vs `ae-labour`**: likely duplicate — merge,
   or is the SDMX Data Explorer breakdown genuinely a separate product?
   Same memory entry.
6. Watch for the render-consistency symptom in ordinary use; flag here if
   it recurs. `notes/render-consistency-repro-2026-08-25.md`.
7. Try dragging cluster repulsion past the old 10 mark now that it's 0–15.
   If still weak at 15, it's not the force — check camera auto-fit or node
   density instead. Detail: `renderer_forces_2026-08-28` memory §3.
8. Watch for any node-rendering oddity (flicker, wrong z-order) after
   2026-08-29's transparent-material change. Visual parity was checked in
   software rendering only; flag here if real hardware differs.
9. Three node-scope rulings, evidence already verified and quoted in each
   `_dropped` entry: (a) `ph-pdp -> ph-basic-ed` — the PDP names EBEIS, an
   information *system*, not a named publication; (b)
   `tw-national-defense-report -> tw-sipri-arms-transfers` — SIPRI's Arms
   Transfers Database cited, but for PRC *exports* while the node is
   scoped to Taiwan *imports*; (c) `mx-alcaldia-benito-juarez ->
   mx-censos-economicos` — sourced in a chart caption, not body text.
10. **Vietnam's generic-MFSM question** (carried from round 9): does
    `vn-monetary-indicators`'s plain "MFSM" citation wire to
    `imf-mfsmcg-2016`, get its own plain `imf-mfsm` (2000) node, or stay
    unwired? Full quote in memory `quickwin_leads_2026-08-30`.

### [Agent] — next build rounds

1. **BR/IN/CA remainder** (39 nodes still isolated across the three —
   recount before starting). Worth a retry, not dead ends: 6 India state
   handbooks blocked by unreachable `.gov.in` domains this round (Assam,
   Bihar-at-a-Glance, Chhattisgarh, Karnataka, Maharashtra-district-series,
   Odisha); BR Amazonas/Bahia yearbooks (large-PDF tooling limit); BR
   Porto Alegre (moved to a Power BI dashboard, no static text — needs a
   different tool, not a different search). `no-node-yet` leads (real
   citation, no matching corpus node): BR EPE→BEN/IEA, IN
   `in-ncrb-crime-in-india`→MOSPI Statistical Year Book, CA
   `gains-benefit-rates`→federal OAS/GIS, CA `pei-taxation-property-
   assessment`→PEI Real Property Tax Act Regulations. Structural
   negatives, don't re-chase: BR Recife (institutional mismatch), CA
   SAMA/Regina, Hamilton/Regina/St.John's/CSF/BC-year-end-roll, the 4
   BR `part_of` nodes above. Full list with evidence: memory
   `br_in_ca_wiring_round_2026-08-30`.
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
   worth a browser-tool retry.
5. **Corpus wiring** — 77 countries at zero domestic edges (uncounted this
   round). Cheap retries: Iraq's GDP/National Income metadata doc
   (cosit.gov.iq), Vietnam's VSIC 2018 decision, Iraq's wage-bill clause
   (Budget Law 13/2023). NESDC Thailand — closed negative, don't retry.
   Then the 31 single-node stubs: AG AL BA BZ CH CU FM HT KG KI LC LI MD
   ME MK NI NR PG PW RS SB TJ TM TO TV UA UZ VU WS XK.
6. **Cheap browser retries, now known-reachable**: Afghanistan's
   `af-education` and `af-border-mobility` (both render in Chrome, both
   Cloudflare-403 to curl).
7. **Genuinely still blocked, needing a different network route**: the
   whole `*.cdmx.gob.mx` family, `issste.gob.mx`, `datos.imss.gob.mx`
   (Imperva WAF), `webapps.peza.gov.ph`, `legacy.doe.gov.ph` and
   `aodm.mnd.gov.tw` (egress policy), `ws.dgbas.gov.tw` (TLS chain), and
   `psa.gov.ph` (Cloudflare JS everywhere — WebFetch reaches it but caps
   quotes at 125 chars, not mintable).

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
