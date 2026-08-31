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

**3,354 reports · 2,815 dependencies · 963 isolated.** `npm run validate`
(0 errors), `npm run gen` (347 slices, 0 unwired), `tsx
scripts/test-logic.ts` (123/123), `tsc --noEmit`, `npm run build` all
clean in a cloud sandbox, confirmed 2026-08-31 evening.
`public/corpus-data.json` is current.

**Audit rulings applied 2026-08-31 (Thomas: 1-A, 2-A, 3-A) — memory
`audit_rulings_applied_2026-08-31` has the full record; "Rulings Owed"
artifact has the numbers they were decided on.** The corpus is now
smaller and honest: **D1** — all 463 assertion-only edges (bare homepage
or no URL, no quote) moved to `_dropped` `no-document` across 28 slices,
originals preserved in `why`; 42 caveat/resolved notes on those edges
became `deferred` leads. Egypt went 52 → 6 connected reports, China
59 → 32, Bolivia 47 → 21 — that is the rule, not a regression. **D4** —
32 trade-agreement nodes retired (the 31 wired FTA-family survivors of
the 08-29 sweep + `ar-mercosur`), records in
`notes/retired-nodes-2026-08-31.json`. **D7** — 62 derivation-note
"publisher" nodes retired (same file), 166 lazy "X / related" publisher
strings rewritten (`notes/publisher-cleanup-2026-08-31.json`); 5
real releases with hedged publishers kept and renamed (af/sy/ye
population, ye national accounts, ye BOP). Validator now prints
PUBLISHERS (0 today) beside EVIDENCE (162 no-URL-with-quote, 5
bare-homepage-with-quote — the whole remaining debt) and
DUPLICATE-SHAPED (3 groups). **Promotion gate: when EVIDENCE reads 0/0,
flip graph.ts's two warnings to errors.**

**Morning fixes, same day (memory `audit_response_2026-08-31`):** D2
evidence rule in `validate()`; D3 18 self-flagged AR edges quarantined;
`scripts/measure-forces.ts` committed and the 08-28 cluster-repulsion
sweep shown not to reproduce; stale comments, START-HERE, onboarding
tier, tier-4 caption, `depthWrite` on hollow/soft nodes; dev-only
`window.__rig` renderer hook.

**First real-GPU number (Radeon RX 580, 120 Hz monitor), folded
Everything tier, 415 nodes:** 8.3 ms median → 120 fps, vsync-capped,
GPU 35%, same with a node selected. Not the ceiling — the unfolded
~2,500-node view is still unmeasured; snippet (with the
`info.autoReset` fix) is in the artifact.

**2026-08-30 research rounds, all validated clean — detail in project
memory, not here:** 5 duplicate merges + rulings (`PLAYBOOK.md` §7,
memory `duplicate_merges_and_scope_rulings_2026-08-30`) · BR/IN/CA wiring
rounds 1–2 (`br_in_ca_wiring_round_2026-08-30`, `…round2…`) · EU branch
closed (`eu_unlinked_wiring_round_2026-08-30`) · AE round 11
(`ae_wiring_round11_2026-08-30`) · Indonesia round 10
(`id_wiring_round10_2026-08-30`).

**Unlinked-node counts are stale here on purpose except BR/IN/CA and EU,
just recomputed above.** Recount from `public/corpus-data.json` before
trusting any other number in this file.

**Repo hygiene pass, 2026-08-30** — README/START-HERE/PLAYBOOK §7 trimmed,
`Research.1.md` archived (memory `repo_hygiene_and_grok_queue_2026-08-30`).
Wayback trick for blocked `.gov.in`/`.gov.br` domains is now PLAYBOOK §6.

**`grok-research-queue-2026-08-22` fully closed** (memory
`new_countries_tier_audit_2026-08-30`): prompt 18 and tiers 30-37 both
minted and already in the counts above — don't re-run. Balkans (AL BA CH LI
MD ME MK RS UA XK) are 1 node/1 edge each. 75 countries at zero domestic
edges.

**Layout: INT↔country link springs are OFF since 2026-08-31**
(`INT_LINK_STIFFNESS = 0`, InfluenceGraph.tsx; mirrored in
`scripts/measure-forces.ts`, `INTSTIFF=1` reproduces the old layout).
Thomas's call after the measured diagnosis (memory
`layout_blob_diagnosis_2026-08-31`): 12 international standards spring-
linked to 10–55 countries each were what averaged every country to the
centre. Harness: cluster openness 1.5 → 3.2, inter/intra 10 → 28, INT
becomes its own peripheral galaxy. Thomas saw it 2026-08-31: clusters
open (Canada a clean separate galaxy), but the ~700 INT spokes became
the picture. **Same evening, on his "1 and 2":** (1) `intTether` links
rest at `INT_TETHER_OPACITY` 0.16 (`focusOpacity` in linkVisuals
restores them inside a trace; hover still lifts) and carry the **beam**
instead of teardrops — the continuous-database flow shader with a new
`uFlowLift` uniform (`INT_TETHER_BEAM_LIFT` 0.45) so each passing crest
raises the faint line's alpha locally: "faint beams along the edge",
Thomas's ask after missing the pulses; (2) the international layer folds into one `corb:INT` orb from
tier 2 (`resolveId`), double-click opens it like a country; the orb is
*placed* at the centroid of everything else by `lib/intAnchor.ts`
(springless — springs on a 700-degree orb move the countries, not the
orb; springless it was flung off-screen by charge); and the 16 nodes
whose edges reach ≥10 countries carry standing labels (`standingLabels`
in hierarchy.ts, sprites in nodeVisuals, greedy overlap pass so the EU
knot shows ESA 2010 + one more rather than six on top of each other).
Headless-checked at tiers 1/2/4 (unsettled layouts, but the treatment
renders and nothing errors); real-hardware look is Thomas's.
**Cluster-repulsion range 0–15**: measured weak for two stacked reasons
— camera fit renormalises most of it, and `FAMILY_REPULSION`/
`COUNTRY_REPULSION` aren't scaled by spread (inert at 1000%). Don't raise
the ceiling; the INT-spring change is the lever that actually moved.

**Renderer perf items** from 2026-08-29 are closed. Audit measured the
structure: 2,245 draw calls / 498k triangles / 1,362 materials for 419
visible nodes at Everything tier — the ceiling, if there is one on real
hardware, is per-object overhead (one material per link), not geometry.
Folded view measured at 120 fps (above); unfolded still owed.
**Console noise, real but minor:** the `[layout] two fixed panels
overlap` self-check (App.tsx ~1311) fires every 4 s below ~900 px
viewport width — with DevTools docked, the search bar (left 400, 380
wide), the View button and the Calendar button genuinely collide.

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
5. **Rulings owed on the evidence findings** — none of these were acted on,
   all need you:
   - **D6: duplicate pairs** — 3 groups left after the treaty retirement,
     printed by the validator: `br-ibge-ipca`/`br-ipca` (3/3 edges),
     `br-ibge-censo-demografico`/`br-censo-demografico` (7/2), the two
     Rosstat yearbooks (3/2). Merge or keep — nothing else is waiting on
     it.
   - **D2 promotion**: 162 no-URL edges *with* a quote + 5 bare-homepage
     edges with a quote are the whole remaining evidence debt (research
     done, citation dropped). Once re-cited, flip the two warnings in
     graph.ts to errors.

### [Agent] — next build rounds

0. **Before any new import: the evidence rule is now checked in code.**
   A new edge with no `evidence_url` or a homepage URL warns in
   `npm run validate` (EVIDENCE block). Don't add to the count. **The
   162+5 re-citation round is the obvious next agent job** — every one
   has its quote in `basis`; find the document, verify HTTP status, add
   the URL. Concentrated in ae-sa, andean, ir-iq-tr-sy, mexico and jp-kr
   wiring slices; many feed `sna-2008`. **D9
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
