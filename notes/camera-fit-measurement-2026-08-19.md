# Camera fit vs. corpus growth — measured, 2026-08-19

Thomas: *"my concern is more when we add more modes and edges that it would
end up inside the cluster again."*

Measured rather than argued. Headless harness (`vite preview` + Playwright +
preinstalled Chromium, `--use-angle=swiftshader --enable-unsafe-swiftshader`),
1600×900, Everything tier, layout given 45 s to cool and then forced to refit
against the settled positions. **n = 3 runs per configuration**, mean [min–max].

## The threshold

`measureFit` frames the 95th percentile of node distance from centre, then sets

    distance = p95 / sin(FOV/2) × 1.18        FOV = 24°

so the camera always sits at exactly **5.675 × p95** from the centre. That
constant is the whole answer: a node only ends up behind the camera when its
radius exceeds 5.675 × p95, i.e. when **max / p95 > 5.675**. The instrument
reproduced 5.6755 on every single fit, which is the cross-check that it is
measuring the same geometry the renderer uses.

## Result

| | live corpus (1,250 reports) | + staged mint simulated (~3,120) |
|---|---|---|
| framed nodes | 958 | 1,758 |
| p50 radius | 744 [731–761] | 852 [817–893] |
| **p95 radius (what the fit uses)** | **2,709 [2,622–2,851]** | **3,138 [3,034–3,239]** |
| p99 radius | 3,919 [3,804–4,143] | 4,801 [4,726–4,838] |
| max radius | 4,706 [4,478–4,890] | 5,689 [5,549–5,945] |
| camera distance | 15,376 | 17,808 |
| **max / p95 (danger at 5.675)** | **1.74 [1.57–1.87]** | **1.81 [1.71–1.89]** |
| p99 / p95 | 1.449 | 1.531 |
| nearest node / camera distance | 0.794 [0.780–0.821] | 0.771 [0.763–0.780] |
| nodes behind the camera | 0, 0, 0 | 0, 0, 0 |

**Framed nodes +84%; max/p95 +4%.** The margin to the failure threshold is
1.81 against 5.675 — the tail would have to more than triple its shape, not
its size, before the camera reaches the cluster.

## Why growth is not the risk

The layout is scale-free: adding nodes expands the whole cloud roughly
proportionally, so p95 and max grow *together* and their ratio barely moves.
The fit reads a percentile, not an absolute, so it rides that expansion. Core
compactness is likewise flat (p50/p95 = 0.275 → 0.271).

Two prior predictions were wrong and are corrected here:

1. **"The camera sits at ~2.8 × p95."** No — 5.675 ×. The earlier figure
   assumed a ~50° FOV; the app uses 24°. The real margin is twice what was
   claimed.
2. **"The mint adds mostly edgeless nodes, which will form a diffuse outer
   halo and blow up the tail."** The staged corpus is 1,999 reports with 982
   internal edges — 844 connected, **1,155 edgeless (58%)**. But `measureFit`
   already excludes edgeless nodes from the fit (`framed = positioned.filter(
   in_degree > 0 || out_degree > 0)` — the "frame the graph, not the shelf"
   rule). Every one of those 1,155 lands on the shelf and never enters the
   measurement. The halo scenario is structurally impossible as the code
   stands.

## What actually could break it

Not node count, and not edges. Only something that changes the *shape* of the
radial distribution:

- **A mode that repositions nodes.** GEO_EXPLORATION is the one on the
  roadmap. Packing nodes onto a globe or a plane replaces a scale-free cloud
  with a bounded surface, and every number in this table stops applying. If
  that mode is built, re-run this measurement — and note that it also stops
  being a pure recolour pass, so it can no longer stay out of the `forceGraph`
  memo deps the way lenses do.
- **Few-node views**, already handled by `SINGLETON_PADDING` (2026-08-13).
- Lenses/recolour modes cannot affect it at all, by construction.

## Method notes for whoever re-runs this

- **Settle time is not optional.** An early run at 16 s of cooling gave
  max/p95 = 1.69; the same build at 45 s gave 1.74–1.87. The layout is still
  expanding when the first fit lands, so short waits *understate* the tail.
  Cool, then force a refit (click tier 3, then tier 4) and read that fit.
- **`max` is a single-node statistic and is noisy** — ±8% run to run. Report
  replicates and ranges; `p99/p95` and `nearest/distance` are steadier.
- The tier buttons are unreliable targets for Playwright's role selector under
  software rendering; match `button` textContent starting with `"4."` and call
  `.click()` in-page instead.
- The instrument was a temporary block in `measureFit` in a **sandbox copy
  only**. Nothing was written to `src/` on the device.
