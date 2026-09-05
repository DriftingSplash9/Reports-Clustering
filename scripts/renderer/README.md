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
