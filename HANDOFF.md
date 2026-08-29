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

**3,496 reports · 3,017 dependencies.** `npm run validate` (0 errors),
`npm run gen`, `tsx scripts/test-logic.ts` (120/120), `tsc --noEmit` all
clean in a cloud sandbox — reconfirmed 2026-08-29 after fixing the 2
domain-tag errors (`mx-programa-sectorial-bienestar-2025-2030`,
`ph-ndrrmc-sitrep` — now `proposed:` prefixed) and the 3 caveat/resolved
notes with no matching live edge (`ph-renewables -> ph-power-stats`
reclassified `no-document`; `ph-fiscal-ops -> ph-btr-cash-operations`
reclassified `note`; `tw-cross-strait-trade-share -> tw-mof-trade-
statistics` retargeted to the real id `tw-trade-statistics`, which the
edge genuinely matches) — all pre-existing from round 6, none caused by
this session. (`npm run build`/bundle-size not re-run since round 6 —
only data files changed, no renderer code touched.)

**Cluster-repulsion range: 0–15** (raised from 0–10, `ViewControls.tsx` /
`view.ts`) — Thomas's call, live. Not yet tested at the new ceiling.

**Unlinked-node counts** (1,038 of 3,487 nodes isolated overall) —
freshly measured 2026-08-29 after round 6 via `loadIssues.orphans`
(canonical, matches `assembleCorpus.ts`): ID 77/120, VN 50/67, KR 36/72,
IR 33/35, TR 18/41, JP 17/65, MX 15/104, TW 54/109, PH 10/77, AF 5/15,
SA 3/16. (Prior "TW 91/122" etc. line was stale/uncorrected — rule 8,
measure before believing.)

**Auto-unfold** still dense — accepted, not being chased further.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. Watch for the render-consistency symptom in ordinary use; flag here if
   it recurs. `notes/render-consistency-repro-2026-08-25.md`.
2. Try dragging cluster repulsion past the old 10 mark now that it's 0–15.
   If still weak at 15, it's not the force — check camera auto-fit or node
   density instead. Detail: `renderer_forces_2026-08-28` memory §3.

### [Agent] — next build rounds

1. **EU government finance, remainder** — 7 `*-edp-inventory` nodes still
   bare (never actually in scope of either finished round): Czechia, UK,
   Netherlands, Luxembourg, France, Denmark, Italy. FR/IT/NL/DK should be
   easy fetches (large well-resourced NSIs/finance ministries). UK is a
   modelling question first (should a non-EU country even carry this node
   post-Brexit?) before spending a fetch on it. See project memory
   `eu_government_finance_round2_2026-08-29`.
2. **Corpus wiring** — 77 countries at zero domestic edges. Cheap retries:
   Iraq's GDP/National Income metadata doc (cosit.gov.iq), Vietnam's VSIC
   2018 decision, Iraq's wage-bill clause (Budget Law 13/2023). NESDC
   Thailand — closed negative, don't retry without a new access route.
   Then the 31 single-node stubs: AG AL BA BZ CH CU FM HT KG KI LC LI MD
   ME MK NI NR PG PW RS SB TJ TM TO TV UA UZ VU WS XK.
3. **Renderer, two named wins.** (a) `nodeGeometry()` allocates a
   `SphereGeometry` per node, uncached — 3,465 of them; bucketing by
   rounded radius (as `teardropGeometry` does) gives ~20. (b) every node
   material is `transparent: true` unconditionally, forcing the whole
   graph through the sorted transparent pass — likely cause of node
   glitches. Caveat: toggling `transparent` on a live material forces a
   shader recompile.
4. **Stale-URL remainder** — 19 of the original 37 in
   `notes/stale-urls-2026-08-20.md` (Japan 7, Mexico 5, 6 one-offs).
   Regenerate `notes/_all-corpus-ids-*.txt` before any mint.
5. **New research round** — the 2026-08-22 Grok queue is fully worked; the
   next round needs scoping from scratch. Unlinked-node wiring candidates:
   `sa-pif → sa-national-accounts` (blocked twice), Indonesia's 6
   BPS-access-blocked deferred leads from round 5, Afghanistan's
   af-education/af-border-mobility (403, un-Grok'd), or a handful of
   round-6 leads that failed only on access (mnd.gov.tw cluster for
   Taiwan, 7 gov.mx/imss/cdmx candidates for Mexico) — all need a real
   browser tool, not another Grok prompt. Vietnam's 3-node `part_of`
   cleanup is done (2026-08-29): `vn-fdi-partners → vn-fdi` resolved with
   real evidence (the source page is literally listed inside vn-fdi's own
   listing page). `vn-port-haiphong`/`vn-port-hcmc-caimep` → 
   `vn-seaport-throughput` stay open — this round fetched VIMAWA's actual
   monthly cargo-throughput data file (it's `.xlsx`, not the `.docx` the
   prior round couldn't render) and confirmed it breaks down by cargo type
   only, no per-port split. Genuinely no document states the containment;
   don't retry without a different source. See project memory
   `unlinked_nodes_cleared` for detail.

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
