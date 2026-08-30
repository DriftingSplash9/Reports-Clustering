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

**3,427 reports · 3,309 dependencies · 708 isolated.** `npm run validate`
(0 errors), `npm run gen` (346 slices, 0 unwired), `tsx
scripts/test-logic.ts` (120/120), `tsc --noEmit`, `npm run build`
(1,499.57 kB) all clean in a cloud sandbox, confirmed 2026-08-30.
`public/corpus-data.json` is current.

**2026-08-30 research rounds, all validated clean — full detail in
project memory, not repeated here:** 5 duplicate-node merges + 2 edges
minted + 2 declined, all logged in `PLAYBOOK.md` §7 — don't re-raise
(memory `duplicate_merges_and_scope_rulings_2026-08-30`) · BR/IN/CA
wiring, 19 edges (memory `br_in_ca_wiring_round_2026-08-30`) · EU branch
effectively closed, 3 documented-negative isolated nodes left (memory
`eu_unlinked_wiring_round_2026-08-30`) · AE round 11, 17 edges + 2 nodes
(memory `ae_wiring_round11_2026-08-30`) · Indonesia round 10, 53 edges +
9 nodes (memory `id_wiring_round10_2026-08-30`).

**Unlinked-node counts are stale here on purpose except BR/IN/CA and EU,
just recomputed above.** Recount from `public/corpus-data.json` before
trusting any other number in this file.

**Repo hygiene pass, 2026-08-30 (docs, not corpus data).** README.md and
START-HERE.md both described the old per-branch `G.*.md` hand-off regime
as current practice — it isn't, `HANDOFF.md` alone is, and both are now
fixed. README's file map was wrong too (listed `AF/EU/NZ/AU/CA/US/BRICS`
as live top-level folders; none exist — BRICS's real, live one is `Grok -
Brics+israel and singapore/BRICS/`, the rest are archived). Cut two
duplicate copies of the file map/run-instructions out of START-HERE.md —
one source of truth (README) beats two that drift. `Research.1.md` (dead:
described the old per-branch research-thread protocol, unreferenced by
anything since roughly `G.76`) moved to
`archive/Research.1-superseded_2026-08-30.md`. `url-check-results.json`
moved from root into `notes/`, beside its write-up
(`stale-urls-2026-08-20.md`). **Flagged, not done — Thomas's call**:
`PLAYBOOK.md` §7 has been accumulating one-off single-node/single-edge
rulings written up as reusable "don't re-raise" rules; most won't
recur in that exact form, and the volume only grows as remaining wiring
gets more long-tail. On the table: stop writing narrative for one-off
calls (the `_dropped` reason field is the record), keep §7 for rules that
actually generalize.

**`grok-research-queue-2026-08-22` checked against the live corpus,
2026-08-30:** prompt 18 (Uruguay/Paraguay/Guyana/Suriname wiring) is
fully landed already — 56/54/37/40 nodes, 114 domestic edges between
them. Treat as closed; the queue's own README calling it outstanding is
stale. **Tiers 30-37 ("new countries") are genuinely still owed** —
confirmed against corpus counts, matches Todo item 5's stub list. Their
raw, never-verified Grok replies are sitting unconsumed in `notes/grok-
research-queue-2026-08-22/Grok results/` — a verify-and-mint job on
existing leads, not fresh research. See Todo item 5 for the details.

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
and run `npm install` fresh in the sandbox; ~5MB, fast.

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
4. Rule on `PLAYBOOK.md` §7's one-off-ruling bloat (see Current state) —
   trim it down to generalizable rules, or leave it as is.

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
5. **Corpus wiring — new-countries tier is ready to verify+mint, not
   research from scratch.** 8 regions' raw, never-verified Grok replies
   are sitting in `notes/grok-research-queue-2026-08-22/Grok results/`
   (file manifest and region breakdown in that folder's own
   `00-README.md`) — real content (e.g. the Central Asia batch alone has
   15 proposed reports/11 dependencies), just never raw-checked or
   minted. Gulf/Levant has a duplicate-prompt overlap (`gulf-levant-*`
   vs `me-gulf-levant-*`) needing the same dedup-before-verify pass the
   Andean round got (memory `grok_wiring_round_2026-08-25`). Same
   discipline as every round before this: every quote/URL raw-verified
   independently before minting, nothing taken on Grok's word. Covers 20
   of the single-node stubs below (`AG BZ CU FM HT KG KI LC NI NR PG PW
   SB TJ TM TO TV UZ VU WS`) — the rest (`AL BA CH LI MD ME MK RS UA XK`,
   mostly the Balkans) have no raw material and are genuinely from
   scratch. Prompt 18 from the same queue (Uruguay/Paraguay/Guyana/
   Suriname) is already fully landed in the corpus — don't re-run it.
   Separately, cheap retries: Iraq's GDP/National Income metadata doc
   (cosit.gov.iq), Vietnam's VSIC 2018 decision, Iraq's wage-bill clause
   (Budget Law 13/2023). NESDC Thailand — closed negative, don't retry.
   77 countries at zero domestic edges overall (uncounted this round,
   recount before trusting).
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
