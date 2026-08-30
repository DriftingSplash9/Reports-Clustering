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

**3,430 reports · 3,317 dependencies · 700 isolated.** `npm run validate`
(0 errors), `npm run gen` (347 slices, 0 unwired), `tsx
scripts/test-logic.ts` (120/120), `tsc --noEmit`, `npm run build`
(1,498.13 kB) all clean in a cloud sandbox, confirmed 2026-08-30.
`public/corpus-data.json` is current.

**2026-08-30 research rounds, all validated clean — full detail in
project memory, not repeated here:** 5 duplicate-node merges + 2 edges
minted + 2 declined, all logged in `PLAYBOOK.md` §7 — don't re-raise
(memory `duplicate_merges_and_scope_rulings_2026-08-30`) · BR/IN/CA
wiring round 1, 19 edges (memory `br_in_ca_wiring_round_2026-08-30`) ·
BR/IN/CA wiring round 2, 8 edges + 3 nodes, closing most of round 1's
no-node-yet leads (memory `br_in_ca_wiring_round2_2026-08-30`) · EU
branch effectively closed, 3 documented-negative isolated nodes left
(memory `eu_unlinked_wiring_round_2026-08-30`) · AE round 11, 17 edges +
2 nodes (memory `ae_wiring_round11_2026-08-30`) · Indonesia round 10, 53
edges + 9 nodes (memory `id_wiring_round10_2026-08-30`).

**Unlinked-node counts are stale here on purpose except BR/IN/CA and EU,
just recomputed above.** Recount from `public/corpus-data.json` before
trusting any other number in this file.

**Repo hygiene pass, 2026-08-30 (docs, not corpus data).** README/
START-HERE fixed (both described the old per-branch hand-off regime as
current). `PLAYBOOK.md` §7 trimmed 527→489 lines (Thomas signed off).
`Research.1.md` archived. `url-check-results.json` moved into `notes/`.

**A working technique found this round, worth trying before writing off
any blocked `.gov` domain**: the Wayback Machine
(`archive.org/wayback/available?url=...`, and CDX search
`web.archive.org/cdx/search/cdx?url=<domain>*&filter=urlkey:.*\.pdf` for
no exact-URL snapshot) proxies several `.gov.in`/`.gov.br` domains that
fail from this sandbox, the device-bridge network, *and* a real Chrome
browser on Thomas's machine — genuinely network-blocked, not a sandbox
artifact. Resolved Assam's handbook this round. Rate-limited under heavy
use — space out queries.

**`grok-research-queue-2026-08-22` fully closed, checked against the
live corpus 2026-08-30 (was wrongly flagged as partly open by earlier
same-day notes — see memory `new_countries_tier_audit_2026-08-30`).**
Prompt 18 (Uruguay/Paraguay/Guyana/Suriname) landed — 56/54/37/40 nodes,
114 domestic edges. Tiers 30-37 ("new countries") also already minted —
all 8 regional files live in `src/data/research/`, already inside this
file's own report/dependency counts above. Don't re-run either. Balkans
(AL BA CH LI MD ME MK RS UA XK) each have 1 node/1 edge (not untouched,
not deep) if anyone wants to deepen them. 75 countries at zero domestic
edges (recounted; was stated as 77).

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
out.zip`. Zipping `archive/`/`node_modules/`/`.git` too can time out
(408MB, 120s) — zip only `src/ public/ scripts/ package.json
package-lock.json tsconfig.json index.html` + `START-HERE.md` (imported
via `?raw` by `HelpCard.tsx`, needed for `npm run build` specifically)
and run `npm install` fresh in the sandbox; ~5MB, fast. This mount also
can't overwrite/delete a same-named file (`Operation not permitted`) —
give a re-run's zip a new filename, move the stale one to `_to_delete/`.

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
4. **Three duplicate-node pairs now flagged, need a ruling**: this round
   found a third — `br-censo-demografico` (2 edges) vs
   `br-ibge-censo-demografico` (7 edges) — identical title "Censo
   Demográfico", same publisher IBGE. Same "flag, don't silently merge"
   pattern as the 5 already ruled on in `PLAYBOOK.md` §7. Detail: memory
   `br_in_ca_wiring_round2_2026-08-30`.

### [Agent] — next build rounds

1. **BR/IN/CA is now mostly settled negatives, not a retry target.**
   Round 2 closed most of round 1's `no-node-yet` leads (BEN, PEI real
   property tax regs, federal OAS/GIS, MOSPI Statistical Year Book — see
   memory `br_in_ca_wiring_round2_2026-08-30`). What's left across the
   three (29 isolated, recount before trusting) is mostly confirmed
   clean/structural negatives or `part_of`-modeled already — don't
   re-chase. Still worth something: 4 India state handbooks
   (Chhattisgarh, Karnataka, Maharashtra, Odisha) stay network-blocked
   even via the Wayback trick — try CDX-search-by-filename-pattern for
   Odisha, it's narrowed not solved. Bihar-at-a-Glance was *found* via
   Wayback but is a scanned-image PDF, no text layer — needs OCR
   tooling, not another network route. `br-poa-anuario-estatistico`
   (Porto Alegre) is a confirmed dead end (Power BI dashboard, no static
   text) — don't re-chase. IEA lead for `br-epe-anuario-energia-eletrica`
   still open, no specific document identified.
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
   (§2 above) on these before writing them off further.

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
