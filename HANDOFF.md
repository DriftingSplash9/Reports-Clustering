# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep the mutable part (§1–§3) under ~7k characters** — §4 is fixed and
verbatim. State only, no changelog, no round narrative.

Last updated: 2026-09-05 ~17:10 UTC (photon + link instancing landed, unseen; CO reversals confirmed, no vetoes; DSBB 750 parked)

---

## 1. Read next

`PLAYBOOK.md` §2, §6, §7 at minimum. Then, **routed by what you are doing** —
this is the only routing table; PLAYBOOK §1 points here:

| doing | read |
|---|---|
| anything | `PLAYBOOK.md` §2 rules, §6 traps, §7 standing decisions |
| fetching / capturing / extracting | `notes/techniques-2026-09-04.md` |
| "can I reach host X?" | `notes/routing-snapshot-2026-09-04.md` — **re-probe, don't believe it** |
| **anything touching the grader** | `notes/grader-rulings-round-2026-09-05.md`, then memory `quote_guard_round_2026-09-05` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme | `notes/Midvamp - Revamp.md` (plan of record) |
| a `*-grok-2026-08.json` slice's `meta.note` | `notes/mint-2026-08-20.md` |
| visual / layout work | `PLAYBOOK.md` §3–§4, then `notes/visual-revamp-2026-08-18/visual-revamp-review.md`; memory `regroup_rulings_2026-09-05` (core/shell layout) |
| renderer performance | memory `renderer_perf_measured_2026-09-04` |
| camera / fit · flicker | `notes/camera-fit-measurement-2026-08-19.md` · `notes/flicker-tests-2026-08-19.md` |
| "why is country X empty" | `notes/cross-border-gaps-2026-08-20.md` |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Then project memory, newest first. Git status: never state it (rule 1).
Round notes from 09-03/04 now live in `archive/notes/` (story is in memory).

---

## 2. Current state

Corpus **3,344 reports / 2,817 dependencies**. **812 A · 1,381 B · 624 C**,
A-share 28.8%. `npm run validate` exits 0, 123/123 logic tests, grader selftest
**61/61**, `tsc --noEmit` clean, `public/corpus-data.json` regenerated.
**Grade counts come from `validate` only.**

**Direction (Thomas, 2026-09-05): "tip-top shape with what we have before
looking for more data."** No A-share or size target. Grok retired.

**Quote guard is live**: `NEGATED_QUOTE_PATTERNS` in `grade-evidence.ts` caps
an edge at B when its own quote denies / diverges / defers / hedges the
dependency; `--scan-quotes` (no network) lists hits. Corpus scan is clean.
**The name-match A bar cannot read meaning** — every A rests on the guard now.

**DSBB 750 `no-source-node` leads — PARKED** (684 leaf nodes across 180
countries; matcher misses ≈ 0). Lead file `Claude outputs/dsbb-som-import-2026-09-05-review.json`,
harvest cache on the VM. ESMS: Eurostat `_esmshi4_<cc>.htm` pages are the
machine-readable route if ever wanted (wires existing EU nodes).

**Publisher-cluster lead research**: LatAm + China done (2 slices, 32 edges;
memory `publisher_cluster_latam_2026-09-05`). Remaining `_dropped` leads are
the no-URL / dead-host classes — research, not re-grade.

**Uncommitted backlog** (never read from git): everything since the 07:35
handoff — `scripts/grade-evidence.ts` (guard, `--scan-quotes`), 4
`edit_scripts/*-2026-09-05*.py`, 2 new slices, ~12 rewritten slices, ~24
`evidence-cache/` records, `public/corpus-data.json`, `Claude outputs/`
(review + research files), 12 notes moved to `archive/notes/`, 3 files to
`_to_delete/`, `notes/Midvamp - Revamp.md` path fixes; **renderer:**
`InfluenceGraph.tsx`, 2 new `src/components/*Instancing.ts`, `scripts/renderer/`,
`Claude outputs/link-batching-2026-09-05/`.

**Renderer — photon + link instancing landed 2026-09-05, UNSEEN by Thomas**
(`src/components/photonInstancing.ts`, `linkInstancing.ts`, wired in
`InfluenceGraph.tsx`'s `useFrame` after `tickFrame()`; `__rig.photons()` /
`__rig.links()` report batch counts + sync ms). Headless Everything tier:
**7,371 → 2,401 draw calls**, triangles identical; the 2,366 node spheres are
the remainder. Real-hardware frame time NOT yet measured. Otherwise as
before: grade-driven opacity, A-only ranking cut, `rankByLegalBasis`,
`INT_LINK_STIFFNESS = 0`, `CORE_PERCENTILE` 0.8, drift watchdog + `__meshes`.
**`view.minGrade` stays default `C`**. Pre-instancing baseline 28 fps /
33.4 ms median on Thomas's machine. Headless tools: `scripts/renderer/`.
Shelved ISOLATED:
`sc-oag-annual-reports-2022-2024`, `so-fgs-financial-governance-reports`,
`brics-johannesburg-ii-declaration-2023`, `tz-dar-es-salaam-city-council-budget-2026`.

**Research debt**: 0 no-URL, 0 dead-URL, 5 bare-homepage edges; 1,126 nodes
carry a bare-homepage `url` (class, not debt). Browser pass CLOSED.
**2026-08-31 audit: all findings closed** (F-14 was already implemented —
floor 0.05, 97 listed / 3,201 suppressed).

**Known node defects**: `pl-gus-national-accounts`, `ch-bfs-national-accounts`
carry `kind: standard` (they are publications). Egypt IPI compiler (MoP vs
CAPMAS) unverified.

---

## 3. Todo (live items only)

### [Agent] — in this order

1. **Node instancing** — the last third of Revamp §9 step 6, only after
   Thomas has looked at the photon/link result and measured it (median/p95,
   not fps). Harder than the first two: per-node `NodeMaterial` state (rim,
   hollow, emissive breath, litOpacity, `transparent` toggle) and the
   raycast picker (`reportIdAt(e.object)`) both have to survive. Same mirror
   shape (hide the library's mesh, copy into a batch) is the safe route;
   picking can keep raycasting the hidden spheres — three's Raycaster ignores
   `visible`, which is also why link/pulse clicks still work today.
2. **INT-core / country-shell layout** (Thomas's direction from the Everything
   screenshots): at tier 4 the INT nodes are springless and pushed to the edge,
   so every country cluster sits on one side. Generalise `intAnchor` to pull
   the INT family centroid to the global centroid at every tier + a radial
   shell force on country-cluster centroids (direction free). New
   `measure-forces` metric: mean resultant length of cluster-centroid unit
   vectors around the core. Fold in "default view at scale": edges dimmed,
   pulses off at Everything, both on in trace. Note this bends the "position
   encodes only edges" doctrine (Q16) — the tier-2 orb already does.
3. Cluster-repulsion measured sub-round only if 2 leaves clusters overlapping.
4. Parked design questions: mutual-pair rank leakage; layout re-run on data
   add; cadence in layout. START-HERE "obvious next thing: more data" vs
   programme — Thomas's call.
5. Small corpus items when convenient: `kind` fix on the two NA nodes; a
   Labour Force Survey node for China (NBS says the surveyed unemployment rate
   comes from it); ESMS scripted pass.

### [Thomas] — only you can

1. **Look at the instanced renderer** (§2): Everything tier, a trace, hover
   an edge, Edges/Pulses toggles, a tier flip. Then the 15 s frame-time run
   from memory `renderer_perf_measured_2026-09-04` for median/p95 against
   33.4 ms. If anything is wrong the revert is two lines in `useFrame`
   (the `sync` calls) — the library's own meshes are still there, hidden.
2. **Commit the backlog** (§2). Housekeeping: `_to_delete/` (README lists
   it) — all junk, plus today's staging zip.

Settled 2026-09-05: CO reversals confirmed (entries in
`andean-wiring-grok-2026-08.json`), no vetoes — hedge caps and `ar-eph` A stand.

---

## 4. How to hand off

**Thomas asks for a handoff; the agent does all of this, in this order:**

1. Read this file first — it carries these instructions, and the state
   it describes is what you are superseding.
2. Copy it, unchanged, to `archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-
   HHMM-<topic>.md` (UTC date and time in the title, topic = what the
   superseded state was about). Verify the copy (`sha256sum` both).
   **Archive first, then rewrite** — there is no git safety net (PLAYBOOK
   rule 1); an un-archived overwrite destroys the previous state.
3. Write the new `HANDOFF.md` at the top level, same name, overwriting.
   Edit **Current state** and **Todo** directly — overwrite, don't
   append. State only, present tense, no changelog, no "DONE" entries.
   Keep this §4 verbatim so the next agent knows the procedure.
4. A finished round's story goes to **project memory** (write it as you
   go; if memory is down, park a note in `notes/` and say so here). A new
   standing rule or trap goes to `PLAYBOOK.md`. A design change goes to
   `notes/Midvamp - Revamp.md` (or `REPORTS.md` if it changes direction).
5. If §1–§3 are over ~7k characters, trim before adding to them.
6. Never state git status here. Never delete anything — `_to_delete/`.

Only one `HANDOFF.md` at the top level, ever.
