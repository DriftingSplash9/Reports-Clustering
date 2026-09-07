# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-03 03:05 UTC (2026-09-02 evening, Edmonton)

---

## 1. Read next

`PLAYBOOK.md` → `notes/Midvamp - Revamp.md` (the plan of record) →
`REPORTS.md` (design doc) → project memory
`audit-2026-09-02-independent-technical` → the audit itself,
`Claude outputs/AUDIT-2026-09-02-independent-technical-audit.md` (+ 4
ledgers beside it). Git status: never state it (PLAYBOOK rule 1).

---

## 2. Current state

**3,351 reports · 2,748 dependencies · 979 isolated.** `npm run validate`
(0 errors), `npm run gen` (347 slices), `tsx scripts/test-logic.ts`
(123/123), `tsc --noEmit`, `npm run build` all clean in a cloud sandbox,
confirmed 2026-09-02 evening. `public/corpus-data.json` is current.

**Programme: the Midvamp evidence-grade revamp — plan v2 decided
2026-09-02 after a 22-question round (answered docx at repo root), nothing
built yet.** Binding rulings, all in `notes/Midvamp - Revamp.md`:
- Nothing archived or deleted. `evidence_grade` A/B/C on every edge
  (absent = C); **all existing edges are C until graded**, lead-type
  `_dropped` included. Publisher-supplied third-party metadata (DSBB,
  ESMS) counts as A. C hidden by default; B faint; A as today. Ranking
  from A only; self-citation discount ON.
- New `kind` on Report: publication / standard / instrument. New edge
  type `legal_basis` (no pulses, own hue) — **counts toward node size**
  (Thomas's call) with a "rank by legal basis" toggle. Editions fold into
  the series node; versions of standards stay separate.
- Round 0 first (view changes + renderer bugs), then schema. Evidence
  cache committed to git. Browser pass: yes, one host family per session.
- Cluster repulsion is a **force** problem (Thomas): measured sub-round.

**Audit findings that the programme's first rounds must absorb** (details
and file:line in the report):
- Evidence sample (56 edges, raw-fetched): PASS 50 % / WEAK 25 % /
  FAIL-CONTENT 14 % / FAIL-URL 11 %. Grok-derived slices are the failures.
- 5 direction-reversed live edges (`jp-japan-grok`: FIES→CPI, RPS→CPI,
  Census→LFS; `kr-south-korea-grok`: HIES→CPI, Census→EAPS) + 2 BR
  "complementary" `cites` edges (`br-bcb-nota-fiscal-abaixo-linha` ⇄
  `br-stn-resultado-tesouro-nacional`). Fix in round 1.
- Duplicate pair the validator can't see: `et-cpi` vs `et-ess-cpi`.
  BRICS JSP family is 5 nodes for one publication line.
- `sna-2008` (#2) has 40/100 in-edges with no URL. `brics-ndb-agreement-
  2014` is #3 with 45/49 dependents NDB/summit documents (self-citation).
- `isIndexPage()` misses ~50 more index edges (`stats.gov.cn/sj/ndsj/` 14,
  `/english/PressRelease/` 4, `/StatisticalCommuniqu…` 8, `ndb.int/
  governance/transparency-reporting/` 6, `gub.uy/instituto-nacional-
  estadistica/` 6, `ess.gov.et/<topic>/` 8, `eac.int/overview-of-eac` 3,
  `oversightboard.pr.gov/fiscal-plans/` 3, `inegi.org.mx/programas/<x>/` 3).
- URL check of all 1,677 evidence URLs: 37 edges plainly dead (singstat
  15, gccstat 4 …; ledger `audit-2026-09-02-url-check-1677.json`), 56 on
  s-circabc (404 to fetchers, browser-only per earlier ruling, unverified),
  ~500 edges (19 %) behind WAF/egress — browser pass needed.
- `check-urls.ts` checks node `url` only, never `evidence_url`; ran once
  (2026-08-20, Grok staging dir).
- Coverage bias quantified: CA 272 nodes vs DE 13 / FR 6 / IT 7 / GB 13 /
  CH 1; no DE/FR/GB/IT node in the top-40 ranking.

**Renderer (audit, verified line-by-line):** (1) `nearestLinkAt`
(`InfluenceGraph.tsx` ~3388) is dead — d3 replaces `link.source` with the
node object, `positionedById.get()` always misses; missed-click/hover edge
pick has never fired. (2) Superseded `ThreeForceGraph` instances never
disposed — GPU leak per rebuild. (3) `runFit` re-assigns `linkWidth` on
>1 % drift → three-forcegraph recreates every link mesh, up to 5×/s during
settle. Also: `linkMaterials`/`flowMaterials`/`linkDataRef`/
`prevGraphForLayout` share the `__meshes` hazard pattern (works only
because both StrictMode runs refill identically). Draw calls ≈ N + 2.1 L
(~8,200 at Everything); merged link geometry is required before 2×.
Real-GPU numbers: still only the one RX 580 reading (folded, 120 fps).

**Layout:** INT springs OFF (`INT_LINK_STIFFNESS = 0`), INT folds to one
`corb:INT` orb from tier 2 (`lib/intAnchor.ts`), `CORE_PERCENTILE` 0.8
(2026-09-01). Cluster-repulsion 0–15 is weak by design — don't raise the
ceiling. Drift watchdog + `__meshes` live since 2026-09-01 (`__rig.fit()`).

**Repo hygiene (audit):** `Grok - Brics+israel and singapore/` is fully
superseded (0 unexplained reports/edges); `notes/mint-2026-08-20.md` (37
slices point at it) and `notes/grok-diary.md` (PLAYBOOK §1/§5) don't
exist. Doc errors to fix in one pass: README:130 (no `slices` array — gen
auto-discovers), REPORTS:9–32 (`Previous Handoffs/`, `BRICS/`,
`planning/`, `sessions/` don't exist at root), PLAYBOOK:18–20 paths,
START-HERE:31 (`BRICS/`) and :37 ("mid-revamp" — phases 0–2 shipped
08-19..21, phase 3 never built). `_to_delete/` (24 MB) and two 31 MB
tarballs in `archive/` await Thomas's delete.

**Memory split:** the 08-30/31 memory entries earlier handoffs cited
(`audit_2026-08-31_second_independent` etc.) are not in this folder's
project memory (newest before 09-02: 08-27) — see Thomas item 1 / Q19.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. Still open: audit ruling **7** (37 dead-URL edges now or in the
   grader), **13** (empty `_to_delete/`, move the two `archive/*.tar.gz`);
   question-round **Q18** (Grok folder: delete+commit if tracked, else
   archive) and **Q19** (the 08-30/31 memory entries are in a different
   Cowork project memory — which folder was open? paste the two audit
   reports into `archive/audits/`). Handoff was committed 2026-09-02
   (Q20); `InfluenceGraph.tsx` gets committed with round 0.
2. Delete `_to_delete/audit-staging-2026-09-02.tar.gz` with the rest.
3. Browser pass on the WAF/egress evidence list — only your Chrome can
   read imf.org, legislation.govt.nz, canada.ca, boi.org.il, `.gov.in`,
   `.gov.br`, s-circabc. Wait for round 3's grader to produce the list.
4. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

0. **Round 0 — view + renderer bugs (NEXT).** Remove the Focus panel
   (Built from / Feeds into / Isolate; click-to-trace and the Groups
   isolate stay; drop Search's "outside isolate" tag; old saved-view
   fields ignored silently). `NEIGHBOURHOOD_HOPS_MAX` 5 → 8, default 5.
   Cluster spread 50–1200 % (min 0.5, max 12), default 100 % — **re-derive
   `nodeScaleFor`'s cap at 12 first** (ViewControls.tsx note). Per-galaxy
   camera fit in a country isolate (fit to the cluster, INT nodes may sit
   off-screen); if standards still fly, `INT_LINK_STIFFNESS` 0 → 0.15.
   Fix the three renderer bugs (state above). tsc/test/build + headless
   verify, then Thomas looks. Cluster-repulsion force work is a separate
   measured sub-round (`measure-forces.ts`, 2+ seeds, `onscreen`): scale
   `FAMILY_REPULSION`/`COUNTRY_REPULSION` by spread, couple galaxy pull.
1. **Schema + validator.** `kind` on Report with cadence rules;
   `evidence_grade`, `evidence_quote` (required for A); `legal_basis`
   type; `mutual` flag + bidirectional-pair error; three evidence warnings
   → errors for A; self-citation flag. Move the 5 reversed JP/KR edges to
   `_dropped` `wrong-direction`, the 2 BR edges to `deferred`. Merge
   `et-cpi` → `et-ess-cpi`; fold JSP family + per-year AG reports. Widen
   `isIndexPage()` (per-host list above). Retype methodology→instrument
   edges to `legal_basis` by generator. Validate: count −7, all edges C.
2. **Renderer grade pass.** Intensities (A as today, B ~0.35 + pulses,
   C hidden / ~0.08 no pulses when shown), A-only ranking + self-citation
   discount, `view.minGrade` (default C) with reheat + refit (PLAYBOOK
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
7. Housekeeping when convenient: doc fixes under hygiene; write
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
5. If this file is over ~10k characters, trim it before adding to it.
6. Never state git status here. Never delete anything — `_to_delete/`.

Only one `HANDOFF.md` at the top level, ever.
