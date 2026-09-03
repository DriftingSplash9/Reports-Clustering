# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-03 02:20 UTC (2026-09-02 evening, Edmonton)

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

**Programme: the Midvamp evidence-grade revamp — decided 2026-09-02,
nothing built yet.** Thomas's rulings, all binding:
- Nothing is archived or deleted. Every edge gets `evidence_grade`
  (A/B/C, absent = C). **All existing edges are C until graded** — live,
  and the lead-type `_dropped` entries too.
- Three edge intensities from grade (A near-solid, B faint, C
  near-invisible). Node size / ranking from A only, `view.minGrade`
  toggle (default C until the first grading batch lands, then A).
- `_dropped` lead-type reasons (`no-document`, `deferred`, `no-node-yet`,
  `unreadable-source`, lead `note`s) are re-read by the grader; settled
  negatives (`denied`, `wrong-direction`, `wrong-target`,
  `unpublishable-source`) are not.
- Node definition unchanged; edge field names unchanged (rename deferred);
  a bidirectional-pair validator error replaces the rename.
Full design and order of work: `notes/Midvamp - Revamp.md` §8.

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
superseded (0 unexplained reports/edges) — archive it after writing
`notes/mint-2026-08-20.md` (37 slices point at it; it doesn't exist).
`notes/grok-diary.md` (PLAYBOOK §1/§5) doesn't exist either. Doc errors to
fix in one pass: README:130 (no `slices` array — gen auto-discovers),
REPORTS:9–32 (`Previous Handoffs/`, `BRICS/`, `planning/`, `sessions/`
don't exist at root), PLAYBOOK:18–20 paths, START-HERE:31 (`BRICS/`) and
:37 ("mid-revamp" — phases 0–2 shipped 08-19..21, phase 3 never built).
`_to_delete/` (23 MB + 1 MB nested) and two 31 MB tarballs in `archive/`
await Thomas's delete. Uncommitted set inferred from mtimes (never git):
at most `HANDOFF.md` + `InfluenceGraph.tsx` — Thomas to confirm by
GitHub Desktop screenshot.

**Memory split:** entries HANDOFF used to cite (`audit_2026-08-31_second_
independent`, `audit_rulings_applied_2026-08-31`, `layout_blob_diagnosis_
2026-08-31`, `new_countries_tier_audit_2026-08-30`, `br_in_ca_wiring_
round2_2026-08-30`, `af_ae_browser_recheck_2026-08-30`) are NOT in the
project memory Cowork sessions read (newest there before 09-02 was
08-27). The two earlier audit reports exist only in chat. Thomas to say
where they live or paste them into `archive/audits/`.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. Open rulings from the audit not yet decided: **5** (NDB #3: accept /
   self-citation discount / re-mint — the plan assumes the discount), **7**
   (fix the 37 dead-URL edges now or in the grading pass), **9** (GitHub
   Desktop screenshot; commit `InfluenceGraph.tsx` if dirty), **12** (where
   the 08-30/31 audit records live), **13** (empty `_to_delete/`, move the
   two `archive/*.tar.gz`).
2. Delete `_to_delete/audit-staging-2026-09-02.tar.gz` with the rest.
3. Browser pass on the WAF/egress evidence list — only your Chrome can
   read imf.org, legislation.govt.nz, canada.ca, boi.org.il, `.gov.in`,
   `.gov.br`, s-circabc. Wait for round 3's grader to produce the list.
4. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §8)

1. **Schema + validator round.** `evidence_grade` on `Dependency`
   (absent = C), `evidence_quote` required for A, the three evidence
   warnings → errors when grade is A, bidirectional-pair error with
   `mutual: true` escape, self-citation flag on edges. Move the 5 reversed
   JP/KR edges to `_dropped` `wrong-direction` and the 2 BR edges to
   `deferred`. Merge `et-cpi` → `et-ess-cpi`. Widen `isIndexPage()` with
   the per-host list above. Validate before/after; expect the count to
   drop by 7 and every existing edge to read C.
2. **Renderer round.** Three intensities from grade in `linkVisuals.ts`
   (an opacity/width multiplier per grade — SET SIZES rule still holds,
   weight lives in opacity), A-only authority in `graph.ts` + self-
   citation discount, `view.minGrade` (default C for now) with the reheat
   + refit pair (PLAYBOOK rule 18). Headless verify, then Thomas looks.
3. **Grader round.** `scripts/grade-evidence.ts` + `evidence-cache/`
   (gitignored or not — Thomas's call; ~1,700 text files). Dry-run on
   `Claude outputs/audit-2026-09-02-evidence-sample-56.json` — must
   reproduce the audit's grades. Then batch 1: slices feeding `sna-2008`,
   `esa-2010`, `imf-e-gdds`, `imf-sdds`. Emit the WAF/egress list for
   Thomas's browser pass.
4. Flip `view.minGrade` default to A once batch 1 is in.
5. Renderer bugs 1–3 (state above) — separate small round, can run
   alongside 3–4.
6. `_dropped` lead re-evaluation by slice; DSBB/ESMS scripted import
   (plan §5).
7. Housekeeping when convenient: doc fixes listed under hygiene; archive
   the Grok folder; extend `check-urls.ts` to `evidence_url` with a
   timestamped output.

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
