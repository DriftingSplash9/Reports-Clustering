# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep the mutable part (§1–§3) under ~7k characters** — §4 is fixed and
verbatim. State only, no changelog, no round narrative.

Last updated: 2026-09-05 ~18:45 UTC (photon+link instancing MEASURED by Thomas 33.4→25.0 ms; node instancing landed, unseen; kind class fix; cn LFS at A)

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
| renderer draw path / instancers | memory `node_instancing_2026-09-05`, `link_batching_2026-09-05`, then `renderer_perf_measured_2026-09-04` |
| camera / fit · flicker | `notes/camera-fit-measurement-2026-08-19.md` · `notes/flicker-tests-2026-08-19.md` |
| "why is country X empty" | `notes/cross-border-gaps-2026-08-20.md` |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Then project memory, newest first. Git status: never state it (rule 1).

---

## 2. Current state

Corpus **3,345 reports / 2,818 dependencies**. **813 A · 1,381 B · 624 C**,
A-share 28.9%. `npm run validate` exits 0, 123/123 logic tests, grader selftest
**61/61**, `tsc --noEmit` clean, `vite build` ok, `public/corpus-data.json`
regenerated. **Grade counts come from `validate` only.** `kind`: 2,442
publication · 33 standard · 870 instrument (40 title-matched "National
accounts (ESA 2010)" series retyped publication 2026-09-05 — the 09-03
migration regex matched titles).

**Direction (Thomas, 2026-09-05): "tip-top shape with what we have before
looking for more data."** No A-share or size target. Grok retired. START-HERE
now says so (line ~208) — **wording not yet approved by Thomas**.

**Quote guard is live**; corpus scan clean; the name-match A bar cannot read
meaning. **Grader gap found 2026-09-05: `MIN_SPAN = 24` chars is Latin-tuned**
— a 19-character Chinese sentence grades B `no-quoted-span`; work around by
quoting two contiguous sentences. **`npm run gen` before grading a freshly
minted edge** — the grader reads `corpus-data.json`, not the slices.

**DSBB 750 `no-source-node` leads — PARKED.** Publisher-cluster: LatAm + China
done; remaining `_dropped` leads are no-URL / dead-host — research, not
re-grade.

**Renderer — all three instancers live (`photon`/`link`/`nodeInstancing.ts`),
mirror shape: the library's meshes are state + picking only, hidden each
frame; the batches are the only draw path.** Photon+link **measured by Thomas
2026-09-05: median 33.40 → 25.00 ms, p95 41.7 → 33.4 (one 120 Hz interval),
no visual defects.** Node instancing landed the same evening, **UNSEEN by
Thomas**: headless Everything **2,401 → ~85 draw calls a frame** (46 node
batches + 15 photon + 1 link + 7 sprites + 17 composer), sphere triangles
identical, tier-2 plain/trace screenshots indistinguishable (`Claude
outputs/node-instancing-2026-09-05/`). Rim uniforms moved to `userData` at
construction (PLAYBOOK §6 trap). Known technical difference: dimmed spheres no
longer depth-sort individually. Revert = delete the `nodeInstancer.sync` line
at the end of `useFrame`. Otherwise as before: grade-driven opacity, A-only
ranking cut, `rankByLegalBasis`, `INT_LINK_STIFFNESS = 0`, `CORE_PERCENTILE`
0.8. **`view.minGrade` stays default `C`**. Headless tools: `scripts/renderer/`.
Shelved ISOLATED: `sc-oag-annual-reports-2022-2024`,
`so-fgs-financial-governance-reports`, `brics-johannesburg-ii-declaration-2023`,
`tz-dar-es-salaam-city-council-budget-2026`.

**Research debt**: 0 no-URL, 0 dead-URL, 5 bare-homepage edges. Browser pass
CLOSED. 2026-08-31 audit: all findings closed.

**Uncommitted since Thomas's 2026-09-05 commit**: kind-fix edit script + 5
slices, `publisher-cluster-cn-2026-09-05.json` (+node +edge), `cn-china-grok`
`_dropped` why, 1 evidence-cache record, `corpus-data.json`, START-HERE,
PLAYBOOK §6, Revamp §9, `scripts/renderer/`, `Claude outputs/node-instancing-
2026-09-05/`, one `_to_delete/` zip; **renderer:** `nodeInstancing.ts` (new),
`nodeVisuals.ts`, `InfluenceGraph.tsx`. `package-lock.json` is out of sync
(`npm ci` fails, `npm install` works) — one `npm install` + commit fixes it.

**Known node defects**: 9 fractional-cadence `standard` nodes need a ruling
(GNI/QNA inventories 0.2–0.25, `eu-manual-mgdd`, `eu-manual-rd-esa2010`,
`naics`, `icd-10-ca`, `icls-work-statistics-resolution`, `rw-nisr-nsdp`).
Egypt IPI compiler (MoP vs CAPMAS) unverified.

---

## 3. Todo (live items only)

### [Agent] — in this order

1. **INT-core / country-shell layout** (Thomas's direction from the Everything
   screenshots): at tier 4 the INT nodes are springless and pushed to the edge,
   so every country cluster sits on one side. Generalise `intAnchor` to pull
   the INT family centroid to the global centroid at every tier + a radial
   shell force on country-cluster centroids (direction free). New
   `measure-forces` metric: mean resultant length of cluster-centroid unit
   vectors around the core. Fold in "default view at scale": edges dimmed,
   pulses off at Everything, both on in trace. Bends the "position encodes
   only edges" doctrine (Q16) — the tier-2 orb already does. Only after
   Thomas has looked at node instancing (his item 1) — a layout round on an
   unverified draw path muddles both.
2. Cluster-repulsion measured sub-round only if 1 leaves clusters overlapping.
3. **Grader: CJK-aware span floor** — `MIN_SPAN` 24 → e.g. 10 when the span is
   ≥50% CJK; read `notes/grader-rulings-round-2026-09-05.md` first; re-grade
   the `no-quoted-span` B's on CJK hosts afterwards (`--edges`, no fetch).
4. Parked design questions: mutual-pair rank leakage; layout re-run on data
   add; cadence in layout.
5. Small corpus items when convenient: ESMS scripted pass (Eurostat
   `_esmshi4_<cc>.htm`); the 9 `kind` rulings once Thomas gives them.
6. Stale comment: `InfluenceGraph.tsx` near `.linkWidth` still says "The
   pulses. NOT instanced". Fix when next in that file.

### [Thomas] — only you can

1. **Look at node instancing** (§2): Everything tier, a trace (dimmed spheres
   are the new code path), hover a node (grow + glow), orbs breathing at
   tier 2, a hollow instrument's ring, the Groups lens recolour, tier flip.
   Then the same 15 s rAF run as before (3 s lead-in, discard a run with
   `hidden` > 0 or a 4-second worst): baseline now **25.00 / 33.4**; a real
   win reads 16.67. Revert is one line if anything's wrong.
2. **Approve or edit the START-HERE wording** (line ~208, renders under Help).
3. **Rule on the 9 fractional-cadence `standard` nodes** (§2 known defects):
   inventories and manuals — standard or publication?
4. **Commit** the §2 list. `npm install` once to resync `package-lock.json`.
   `_to_delete/` has one new staging zip.

Settled 2026-09-05: CO reversals confirmed, no vetoes; photon+link instancing
accepted on measurement.

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
