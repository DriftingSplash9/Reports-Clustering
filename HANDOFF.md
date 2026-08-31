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

**3,448 reports · 3,307 dependencies · 710 isolated.** `npm run validate`
(0 errors), `npm run gen` (347 slices, 0 unwired), `tsx
scripts/test-logic.ts` (123/123), `tsc --noEmit`, `npm run build` all
clean in a cloud sandbox, confirmed 2026-08-31. `public/corpus-data.json`
is current. (The 08-30 line here said 3,430 · 3,317 — 18 nodes and 8 edges
low even before the 08-31 quarantine; recounted from a clean validate.)

**Independent audit, 2026-08-30 — what was fixed 2026-08-31, what is
open.** Full report is Thomas's; memory `audit_response_2026-08-31` has the
agent-side record. Headline: the evidence rule was enforced in code for
relations only; ~20% of edges (all from the August Grok/wiring rounds)
cite a bare homepage or nothing; the CA/US/EU/AF spine sampled clean, zero
refuted quotes anywhere. Done: **D2** — `validate()` now warns on a
documented dependency with no `evidence_url` and on a bare-homepage
`evidence_url` (`isBareHost`, graph.ts), with an EVIDENCE count block in
`validate-data.ts` (176 no-URL, 164 of them with a quote; 457 bare
homepage) — *promote both to errors when the counts read 0*. **D3** — the 18
self-flagged `[NOT YET VERIFIED …]` edges in `ar-national-core.json` moved
to `_dropped` (`no-document`, basis preserved); the audit's 21 was 3 false
regex hits on real Russian/Ethiopian edges. 4 of the 18 have a verbatim
INDEC quote waiting in `ar-cl-wiring-grok-2026-08.json` (`caveat` →
`deferred`) — cheapest re-mints in the corpus. **D6** — validator now
prints DUPLICATE-SHAPED NODES (6 groups). **L1/L7** —
`scripts/measure-forces.ts` committed; it reproduces the audit
(spread 200%, seed 1: ratio 7.05/7.65/8.48/9.30/10.05 at cr 0/1/3/6/10 —
the repo's recorded 4.29→15.08 does not occur). **L4** — stale range
comments fixed (`view.ts` spread 2–100, clusterRepulsion 0–15,
`clusterRepulsion.ts` calibration block marked superseded). **L5** —
START-HERE "Not working well" rewritten (was describing the 08-19 fix as
open). **L6** — onboarding card reads the live tier; tier-4 caption no
longer says "the whole corpus". **P2** — hollow/soft node materials now
`depthWrite: false`.

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

**Cluster-repulsion range: 0–15** (`ViewControls.tsx` / `view.ts`) —
Thomas's call, live. **Measured 2026-08-31: the slider is weak for two
stacked reasons, neither the force** — the camera fit renormalises most of
it away (on-screen inter/p95 moves ~17% mean across 0→15, less than
seed-to-seed variance), and `FAMILY_REPULSION`/`COUNTRY_REPULSION` are the
only magnitudes not scaled by spread, so at 1000% the whole range moves
~6%. Don't raise the ceiling again. Decision owed — see Todo.

**Renderer perf items** from 2026-08-29 are closed (sphere caching,
conditional `transparent`). Not independently confirmed: an actual FPS
win — swiftshader swamps the signal. Wants a real-GPU spot-check. Audit
measured the structure: 2,245 draw calls / 498k triangles / 1,362
materials for 419 visible nodes at Everything tier — the ceiling is
per-object overhead (one material per link), not geometry.

**Auto-unfold** still dense — accepted, not being chased further.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. Watch for the render-consistency symptom in ordinary use; flag here if
   it recurs. `notes/render-consistency-repro-2026-08-25.md`.
2. **Cluster repulsion — decide what it's for** (audit L2/L3). Three
   options: normalise the force against the current cloud radius so it
   changes the ratio, not the scale; exclude something from the camera
   fit so it stops chasing; or accept it as a world-space control. Plus
   the one-character fix (scale the two constants by `spreadApplied`,
   `clusterRepulsion.ts:97-98`) — do it, but the 0–15 range must then be
   re-derived with `npx tsx scripts/measure-forces.ts`, not carried over.
3. Watch for flicker / wrong z-order on real hardware. 2026-08-31's
   `depthWrite: false` on hollow/soft nodes is the one mechanism found for
   it; if it survives only in the *dimmed* state, `applyFocus` is next.
4. **Real-GPU number** (audit P3): `npm run dev` in a Windows terminal,
   Everything tier, read `renderer.info` + a frame-time sample. Nothing
   perf-related can be judged until this exists.
5. **Rulings owed on the evidence findings** — none of these were acted on,
   all need you:
   - **D1: 457 bare-homepage / assertion-only edges** (list:
     `unevidencededges.csv` from the audit; the validator's EVIDENCE block
     recounts live). Audit recommends quarantining to `_dropped`
     (`no-document`, basis kept), expecting isolates 710 → ~1,000 and
     `in-state-gsdp-series` #4 → #51. Whole slices are 100% affected
     (mexico-, andean-, ae-sa-, ar-cl-, ir-iq-tr-sy-, jp-kr-, taiwan-,
     indonesia-wiring, ve-venezuela; eg-egypt-grok 93/94).
   - **D4: 18 FTA-family nodes with edges** (cl-tlc-*, pe-tlc-*,
     co-tlc-eeuu, *-alianza-pacifico, *-mercosur*, ec-acuerdo-ue,
     ec-tlc-china, py-ace-chile, py-taiwan, mx-tmec, gy-psa-exxon)
     survived the 08-29 treaty sweep because that sweep removed orphans
     only. All their edges are bare-homepage `methodology_depends_on`;
     16 point agreement→statistics, 2 the reverse. Retire per §7, or
     rule that a wired treaty stays. `ar-mercosur` is now an isolate
     after the D3 quarantine.
   - **D7: 224 nodes whose `publisher` is a derivation note** ("Derived
     from UNICEF…", "WHO / national sources"); 76 carry edges. Real
     publisher, terminus, or out — scope call.
   - **D6: duplicate pairs** — now 6 groups printed by the validator. New
     since your last look: `br-ibge-ipca`/`br-ipca` (3/3 edges) and the
     two Rosstat yearbooks (4/2). Brazil census pair is 9/2, not 7/2.
   - **D2 promotion**: the 164 no-URL edges *with* a quote are the cheap
     recoveries (research done, citation dropped); after those, flip the
     two warnings to errors.

### [Agent] — next build rounds

0. **Before any new import: the evidence rule is now checked in code.**
   A new edge with no `evidence_url` or a homepage URL warns in
   `npm run validate` (EVIDENCE block). Don't add to the count. **D9
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
