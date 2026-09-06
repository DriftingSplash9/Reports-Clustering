# renderer/ — headless renderer measurement (2026-09-05)

Both need `npm run dev` on :5173 (they read `window.__rig`, DEV-only) and
`playwright` installed OUTSIDE package.json (`npm i --no-save playwright`;
the Chromium is the sandbox's preinstalled one at `/opt/pw-browsers/chromium`).
Draw-call and object counts are resolution-independent (PLAYBOOK rule 7);
frame TIMES from swiftshader are not — judge speed on Thomas's machine.

- `census.mjs` — Everything tier, every country unfolded (deep link built
  from `public/corpus-data.json`). Wraps `gl.render` so each invocation is
  attributed to a rAF tick (the 2026-09-04 census method), prints calls and
  triangles per tick, the visible-drawable census by geometry, the instanced
  batch counts, and the per-frame cost of the two instancers' `sync()`.
- `shot.mjs <out.png> [tier] [settle ms]` — screenshot after the fit and the
  loading curtain; `SELECT=<report id>` opens a trace. Onboarding is
  pre-dismissed via localStorage.

Baseline before link batching (2026-09-05, 2,366 nodes / 2,817 links):
7,371 calls per frame. After photon + link instancing: 2,401 (2,366 of them
node spheres), triangles identical (2,070,501). After node instancing (same
day, 2,367 / 2,818): **~85 calls per frame** — 46 node batches, 15 photon,
1 link, 7 sprites, 17 composer passes. Triangles read 2,071,661–2,075,983
either way; the spread is photon churn (140 tris a teardrop), not spheres.
`census.mjs` now also prints `nodesInst` and folds the node `sync()` into
`syncMs`.

- `shot-all.mjs <out.png> [settle budget ms]` — the same, at Everything with
  every country unfolded (2,385 nodes). Waits for `fit().settledOnce` rather
  than a fixed timer; budget 600000 is about right under swiftshader. This is
  the shot to take before and after a force change — `shot.mjs`'s tier-4 view
  opens no countries and shows 289 nodes.

- `fit-probe.mjs [spread] [tier] [all]` — the fit percentile's cost curve at
  one spread: fit radius, camera distance and off-frame share for P from 0.95
  down to 0.30, computed from live settled positions. This is what
  `fitPercentileFor` was calibrated on.

- `settle.mjs [tier] [runs]` — ms, rAF frames and physics ticks from the
  first tick to `settledOnce`. Added 2026-09-05 for the tick burst
  (`TICK_BURST_MAX` in InfluenceGraph.tsx): at tier 2 (299 nodes) a
  `tickFrame()` costs 10–12 ms under swiftshader, over the 8 ms budget, so
  the burst does nothing HERE (ticks == frames, 53/57); with the budget
  raised to 40 ms for the check it ran 4 ticks a frame (212 ticks in 54
  frames). Whether it fires on real hardware depends on the tick cost there —
  `window.__rig.tickMs()` reads it live.
