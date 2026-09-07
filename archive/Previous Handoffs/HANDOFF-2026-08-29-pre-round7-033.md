<!-- ARCHIVED 2026-08-30. This is the HANDOFF.md that stood at the start of the
round-7 session (browser/curl unblock + the treaty/meta-node retirement), captured
retrospectively — it should have been copied here before that session overwrote
HANDOFF.md wholesale, and was not. Preserved verbatim as it was read at session
start. NOTE for anyone reading it: its per-country unlinked counts are WRONG and
were corrected by measurement in round 7 (it claims VN 50/67, KR 36/72, JP 17/65,
TR 18/41, PH 10/77; the true figures at that moment were VN 31/48, KR 16/52,
JP 15/63, TR 11/34, and PH was not in the top 30). -->

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

**3,501 reports · 3,033 dependencies.** `npm run validate` (0 errors),
`npm run gen` (318 slices, 0 unwired), `tsx scripts/test-logic.ts`
(120/120), `tsc --noEmit` all clean in a cloud sandbox, reconfirmed
2026-08-29 after fixing the 2 domain-tag errors
(`mx-programa-sectorial-bienestar-2025-2030`, `ph-ndrrmc-sitrep` — now
`proposed:` prefixed), the 3 caveat/resolved notes with no matching live
edge (`ph-renewables -> ph-power-stats` reclassified `no-document`;
`ph-fiscal-ops -> ph-btr-cash-operations` reclassified `note`;
`tw-cross-strait-trade-share -> tw-mof-trade-statistics` retargeted to
the real id `tw-trade-statistics`, which the edge genuinely matches —
all three pre-existing from round 6, none caused by this session), the
stale-URL remainder (16 of 19 replaced, 3 had already gone live on their
own — see `notes/stale-urls-2026-08-20.md`, all 37 originally-flagged
stale URLs now closed), and the EU government finance remainder (5 of 7
bare `*-edp-inventory` nodes wired — CZ/NL/FR/DK/IT each got a real
`xx-govfin` node with quote-verified edges; UK declined as a deliberate
modelling call, its live EDP obligation ended with Brexit; LU declined
as a genuine research gap, no qualifying document found — see project
memory `eu_government_finance_round3_2026-08-29`). `npm run build`
re-run this session (renderer code touched, see below): clean, bundle
1,499.57 kB (unchanged from round 6's 1,498.64/1,499.49 kB baseline).

**Cluster-repulsion range: 0–15** (raised from 0–10, `ViewControls.tsx` /
`view.ts`) — Thomas's call, live. Not yet tested at the new ceiling.

**Renderer perf items closed 2026-08-29.** Both of the "two named wins"
from the prior Todo: (a) `nodeGeometry()`'s `SphereGeometry` was already
cached by rounded radius (`sphereCache` in `nodeVisuals.ts`) going into
this session — turned out done in an earlier round, HANDOFF just hadn't
been corrected (rule 8). (b) node materials now start `transparent:
false` unless hollow, soft, or currently dimmed (`alwaysTransparent` in
`nodeVisuals.ts`; `applyFocus` in `InfluenceGraph.tsx` toggles it
alongside opacity) instead of `transparent: true` unconditionally. The
prior comment warning that toggling `transparent` forces a shader
recompile was measured and disproved: an isolated harness toggled it 5x
on a live `MeshStandardMaterial` with the same `onBeforeCompile` shape
and `onBeforeCompile` fired exactly once (the first compile), each
toggle under 0.3ms. `tsc`/`npm run validate`/`npm run build` all clean
in the cloud sandbox; on-device files sha256-verified identical to the
sandbox-tested copies. Visual parity confirmed via headless Playwright
screenshots (default view and a focus/trace state) — dimming and rim
behaviour read the same. **Not independently confirmed:** an actual FPS
win. The sandbox's swiftshader software rasterizer runs at ~1.5-2 fps
regardless (500-600ms/frame) for this scene, which swamps whatever the
CPU-side transparent-sort saves — no reliable signal at that frame
rate. The win is real by construction (most nodes are hollow/soft only
a fraction of the time — solid nodes now skip the sorted pass whenever
nothing is focused) but wants a real-GPU spot-check, not another
software-rendered measurement. See project memory
`renderer_transparent_toggle_2026-08-29`.

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
3. Watch for any node-rendering oddity (flicker, wrong z-order) after
   2026-08-29's transparent-material change — see Current State. Visual
   parity was checked in software rendering only; flag here if real
   hardware shows anything different.

### [Agent] — next build rounds

1. **Corpus wiring** — 77 countries at zero domestic edges. Cheap retries:
   Iraq's GDP/National Income metadata doc (cosit.gov.iq), Vietnam's VSIC
   2018 decision, Iraq's wage-bill clause (Budget Law 13/2023). NESDC
   Thailand — closed negative, don't retry without a new access route.
   Then the 31 single-node stubs: AG AL BA BZ CH CU FM HT KG KI LC LI MD
   ME MK NI NR PG PW RS SB TJ TM TO TV UA UZ VU WS XK.
2. **New research round** — the 2026-08-22 Grok queue is fully worked; the
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
