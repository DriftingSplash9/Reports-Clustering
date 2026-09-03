# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-03 (round 0 build session, Edmonton)

---

## 1. Read next

`PLAYBOOK.md` → `notes/Midvamp - Revamp.md` (the plan of record) →
`REPORTS.md` (design doc) → project memory `midvamp-round-0-view-renderer`
(this round's story) → for the pre-round-0 audit findings, project memory
`audit-2026-09-02-independent-technical` → the audit itself, `Claude
outputs/AUDIT-2026-09-02-independent-technical-audit.md` (+ 4 ledgers
beside it). Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**Round 0 (view changes + renderer bugs) is built and verified, not yet
committed by Thomas.** Files touched: `src/lib/view.ts`,
`src/App.tsx`, `src/components/ViewControls.tsx`,
`src/components/InfluenceGraph.tsx`. Verification: `tsc --noEmit`,
`npm run gen` (347 slices, corpus unchanged), `tsx scripts/test-logic.ts`
(123/123), `npm run validate` (0 errors, 3,351/2,748 unchanged),
`npm run build`, headless Playwright (swiftshader) across cold-load,
country-isolate, and view-panel scenarios — zero console errors. Full
story, including the two judgment calls below, in project memory
`midvamp-round-0-view-renderer`.

**What changed:** Focus panel (Built from / Feeds into / Isolate)
removed from `ViewControls`; click-to-trace now always traces both
directions (`TRACE_BOTH_DIRECTIONS` const in `App.tsx`), Groups-panel
isolate is untouched. `view.focusBuiltFrom`/`focusFeedsInto`/
`isolateFocus` are now optional fields (kept for one release per Q15,
silently ignored). `NEIGHBOURHOOD_HOPS_MAX` 5 → 8 (default unchanged).
Cluster spread range 200–10000 % → 50–1200 %, default 200 % → 100 %;
`nodeScaleFor`'s cap re-derived by real headless measurement (wanted ≈
21.6 at spread=12/Everything tier/cold start/geoAffinity=0) and set to
50 (≈2.3× margin), replacing the old 2000. Per-galaxy camera fit: a
country isolate (Groups panel) now fits the camera to that country's own
node cluster (`isolatedCountry` prop, `InfluenceGraph.tsx`
`measureFit`), so INT standards can sit off-screen on long spokes instead
of shrinking the whole view. `INT_LINK_STIFFNESS` was deliberately left
at 0 (Q16 makes the spring restore conditional on Thomas seeing the fit
live first — see Todo item 1 below). Cluster-repulsion force tuning
(Q17) was not touched — it's its own measured sub-round.

**Renderer bugs fixed (all in `InfluenceGraph.tsx`):** `nearestLinkAt`'s
dead `Map.get(id)` lookup now handles d3-force-3d's runtime mutation of
link endpoints from string ids to node objects. Superseded
`ThreeForceGraph` instances are now disposed on rebuild
(`disposeForceGraphResources`, geometry/materials/textures) — fixes the
per-rebuild GPU leak. `runFit`'s link-mesh rescale now requires both
>1 % drift and a 500 ms floor (`LINK_RESCALE_MIN_INTERVAL_MS`), instead
of rebuilding the whole link mesh up to 5×/s during layout settle.

**Two judgment calls needing Thomas's confirmation (Todo below):** (1)
kept the Search panel's "outside isolate" tag, which Q15(a) said to
remove — the code ties it to `groupFocus` (the surviving Groups-panel
isolate), not the removed single-node `isolateFocus`, so removing it
would reintroduce a documented regression; flagging the docx/code
mismatch rather than silently overriding Q15(a). (2) `INT_LINK_STIFFNESS`
left at 0 per Q16's explicit "b first" ordering.

**Everything else from the pre-round-0 audit is unchanged and still
open** (schema/kind/legal_basis, grader, evidence cache, browser pass,
coverage bias, dead/WAF URLs, repo hygiene, Grok folder) — see project
memory `audit-2026-09-02-independent-technical` and Todo below.
`INT_LINK_STIFFNESS = 0`, INT anchor folding, `CORE_PERCENTILE` 0.8,
drift watchdog + `__meshes` (2026-09-01) are all otherwise unchanged.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. Round 0 review: confirm the per-galaxy fit looks right, then say
   whether `INT_LINK_STIFFNESS` still needs 0 → 0.15 (Q16) — deferred
   deliberately, not forgotten. Confirm the Search "outside isolate" tag
   should stay (judgment call above) or actually go per Q15(a).
2. Commit round 0: `src/lib/view.ts`, `src/App.tsx`,
   `src/components/ViewControls.tsx`, `src/components/InfluenceGraph.tsx`
   (never git-stated by an agent — PLAYBOOK rule 1).
3. Still open from the audit: ruling **7** (37 dead-URL edges now or in
   the grader), **13** (empty `_to_delete/`, move the two
   `archive/*.tar.gz`); **Q18** (Grok folder: delete+commit if tracked,
   else archive) and **Q19** (paste the two 08-30/31 audit reports into
   `archive/audits/` — different Cowork project memory than this one).
4. Delete `_to_delete/audit-staging-2026-09-02.tar.gz` and this
   session's four zip artifacts logged in `_to_delete/README.md`.
5. Browser pass on the WAF/egress evidence list (imf.org,
   legislation.govt.nz, canada.ca, boi.org.il, `.gov.in`, `.gov.br`,
   s-circabc) — wait for round 3's grader to produce the list.
6. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

1. **Schema + validator (NEXT).** `kind` on Report with cadence rules;
   `evidence_grade`, `evidence_quote` (required for A); `legal_basis`
   type; `mutual` flag + bidirectional-pair error; three evidence
   warnings → errors for A; self-citation flag. Move the 5 reversed
   JP/KR edges to `_dropped` `wrong-direction`, the 2 BR edges to
   `deferred`. Merge `et-cpi` → `et-ess-cpi`; fold JSP family + per-year
   AG reports. Widen `isIndexPage()` (per-host list in audit memory).
   Retype methodology→instrument edges to `legal_basis` by generator.
   Validate: count −7, all edges C.
2. **Renderer grade pass.** Intensities (A as today, B ~0.35 + pulses,
   C hidden / ~0.08 no pulses when shown), A-only ranking + self-citation
   discount, `view.minGrade` (default C) with reheat + refit (PLAYBOOK,
   rule 18), legal-basis hue + "rank by legal basis" toggle, per-grade
   counts on the node card.
3. **Grader.** `scripts/grade-evidence.ts` + committed `evidence-cache/`
   (gz, 250 KB cap). Dry-run on `Claude outputs/audit-2026-09-02-
   evidence-sample-56.json` — must reproduce the audit's grades. Batch 1:
   slices feeding `sna-2008`, `esa-2010`, `imf-e-gdds`, `imf-sdds`. Emit
   the browser-pass list.
4. Flip `view.minGrade` default to A. Browser pass with Thomas.
5. `_dropped` lead re-evaluation by slice; DSBB/ESMS scripted import.
6. Link batching (merged geometry → instanced photons).
7. Cluster-repulsion force sub-round (measured, `measure-forces.ts`,
   2+ seeds, `onscreen`): scale `FAMILY_REPULSION`/`COUNTRY_REPULSION`
   by spread, couple galaxy pull. Kept separate per Thomas's Q17 ruling.
8. Housekeeping when convenient: doc fixes under hygiene (README:130,
   REPORTS:9–32, PLAYBOOK:18–20, START-HERE:31/37); write
   `notes/mint-2026-08-20.md` then Grok folder per Q18; `check-urls.ts`
   → `evidence_url` with a timestamp.

---

## 4. How to hand off

**Thomas asks for a handoff; the agent does all of this, in this order:**

1. Read this file first — it carries these instructions, and the state
   it describes is what you are superseding.
2. Copy it, unchanged, to `archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-
   HHMM-<topic>.md` (UTC date and time in the title, topic = what the
   superseded state was about). Verify the copy (`sha256sum` both).
   **Archive first, then rewrite** — there is no git safety net (PLAYBOOK,
   rule 1); an un-archived overwrite destroys the previous state.
3. Write the new `HANDOFF.md` at the top level, same name, overwriting.
   Edit **Current state** and **Todo** directly — overwrite, don't
   append. State only, present tense, no changelog, no "DONE" entries.
   Keep this §4 verbatim so the next agent knows the procedure.
4. A finished round's story goes to **project memory** (write it as you
   go; if memory is down, park a note in `notes/` and say so here). A new
   standing rule or trap goes to `PLAYBOOK.md`. A design change goes to
   `notes/Midvamp - Revamp.md` (or `REPORTS.md` if it changes direction).
5. If this file is over ~10k characters, trim it before adding to it.
6. Never state git status here. Never delete anything — `_to_delete/`.

Only one `HANDOFF.md` at the top level, ever.
