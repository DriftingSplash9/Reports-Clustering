# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules/traps/architecture: `PLAYBOOK.md`. Design of the current
programme: `notes/Midvamp - Revamp.md`. Finished-round narrative: project
memory (`project_memory_read`) and `archive/Previous Handoffs/`.

**Keep under ~10k characters.** State only, no changelog.

Last updated: 2026-09-03 (round 2, renderer grade pass, built + verified)

---

## 1. Read next

`PLAYBOOK.md` → `notes/Midvamp - Revamp.md` (the plan of record) →
project memory `renderer_grade_round2_2026-09-03` (this round's story,
incl. the two findings flagged below) → project memory
`schema_validator_round_2026-09-03` (previous round). Git status: never
state it (PLAYBOOK rule 1).

---

## 2. Current state

**Round 1 (schema + validator) AND round 2 (renderer grade pass) are
both built and verified, not yet committed by Thomas.** Corpus unchanged
by round 2: **3,341 reports / 2,736 dependencies**. `tsc --noEmit` clean,
`vite build` clean, `tsx scripts/test-logic.ts` 123/123. `npm run
validate` exits 1 — **not** a round-2 regression, see finding (b) below.
Verified in a sandbox built from a fresh zip of the live device files,
plus a headless Playwright pass (0 console errors across page load,
onboarding dismiss, the View panel, all 3 Evidence buttons, the
`rankByLegalBasis` checkbox). Full story in project memory
`renderer_grade_round2_2026-09-03`.

**What round 2 shipped**: grade-driven link opacity (A as today/0.13, B
**louder** at 0.35 — deliberate, Thomas signed off this exact number, a
weak lead is meant to flag itself; C dimmed to 0.08, no pulses); A-only
ranking cut (fires only at `minGrade === 'A'` exactly, not at B) +
unconditional `isSelfCitation()` PageRank discount; `view.minGrade`
(default `'C'`, most permissive — every edge is still ungraded, round 3's
job) and `view.rankByLegalBasis` (default on, Thomas's Q4 call) — both
rebuild `graph` rather than live-ref, and get reheat+refit for free from
the existing `onEngineStop` pipeline, so PLAYBOOK rule 18's ref+dual-
effect pattern does not apply here (documented in code, not an
oversight); legal-basis hue tint (`--ink-gold`) on link ink; per-grade
edge counts (A/B/C) on the node detail card. **Ungraded edges are
unaffected by all of this by design** — absence of `evidence_grade` is
NOT treated as an implicit C for rendering or ranking (only the node-card
count display uses that convention) — so the graph is not yet visually
different from today, exactly as the plan's round-2 acceptance bar says
it should be.

**Two findings for Thomas, not fixed this round (out of scope, nothing
committed without review):**

**(a) Self-citation discount is much bigger than the plan's own example.**
The plan's named example (`brics-ndb-agreement-2014` dropping from the
top 10) does NOT happen — its citing documents are published by "New
Development Bank," not an exact string match to the node's own multi-
government publisher line, so round 1's strict self-citation matcher
(documented limitation, not changed this round) doesn't catch it. The
REAL effect is much larger elsewhere: `eu-reg-223-2009` #9→#1905, `cpa`
#10→#2399, `ru-rosstat-industrial-production-russia` #57→#2949,
`ru-rosstat-grp-series` #16→#1832, plus ~a dozen more former top-60 nodes
collapsing toward zero authority. Correct per spec, but a much bigger
default-on ranking change than the plan implies, and currently no toggle
to disable it. Needs Thomas's eyes before this reaches production
ranking.

**(b) Pre-existing JP data regression from round 1's own migration**
(this is why `npm run validate` exits 1 — 0 formal errors, 123/123 logic
tests, purely `validate-data.ts`'s separate `danglingCaveats` check).
`src/data/research/jp-kr-wiring-grok-2026-08.json` has three `reason:
"caveat"` dropped-notes (`jp-population-census`→`jp-labour-force-survey`
×2, `jp-retail-price-survey`→`jp-cpi` ×1) asserting those edges already
exist live — but round 1's migration reversed those exact pairs into
`_dropped`/`wrong-direction` in a different file
(`jp-japan-grok-2026-08.json`), leaving the caveats stale. Needs a data
round, not a renderer fix.

**Everything else unchanged**: `INT_LINK_STIFFNESS = 0`, INT anchor
folding, `CORE_PERCENTILE` 0.8, drift watchdog + `__meshes`, round 0's
view/renderer changes.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. Commit rounds 0, 1, AND 2 (never git-stated by an agent — PLAYBOOK
   rule 1). Round 2 touches: `src/lib/view.ts`, `src/lib/graph.ts`,
   `src/App.tsx`, `src/components/linkVisuals.ts`,
   `src/components/InfluenceGraph.tsx`, `src/components/ViewControls.tsx`.
   Round 1's file list is unchanged from the previous handoff (see
   archive).
2. **New**: rule on finding (a) above — self-citation discount's real
   magnitude — before it ships live (no toggle currently exists to turn
   it off short of `rankByLegalBasis`, which is a different switch).
3. **New**: the JP dangling-caveat data bug, finding (b) above — either a
   quick data fix (drop or re-point the 3 stale caveat notes) or leave
   for a dedicated data-hygiene round; your call on priority.
4. Still open from the audit: ruling **7** (37 dead-URL edges now or in
   the grader), **13** (empty `_to_delete/`, move the two
   `archive/*.tar.gz`); **Q18** (Grok folder: delete+commit if tracked,
   else archive) and **Q19** (paste the two 08-30/31 audit reports into
   `archive/audits/` — different Cowork project memory than this one).
5. Empty `_to_delete/` when convenient — accumulated several sessions'
   zip artifacts (listed in `_to_delete/README.md`), none needed once
   these rounds are confirmed committed.
6. Browser pass on the WAF/egress evidence list (imf.org,
   legislation.govt.nz, canada.ca, boi.org.il, `.gov.in`, `.gov.br`,
   s-circabc) — wait for round 3's grader to produce the list.
7. Real-GPU number for the unfolded Everything tier (still owed).

### [Agent] — next build rounds, in this order (plan §9)

1. **Grader (NEXT).** `scripts/grade-evidence.ts` + committed
   `evidence-cache/` (gz, 250 KB cap). Dry-run on `Claude outputs/audit-
   2026-09-02-evidence-sample-56.json` — must reproduce the audit's
   grades. Batch 1: slices feeding `sna-2008`, `esa-2010`, `imf-e-gdds`,
   `imf-sdds`. Emit the browser-pass list. Consider the JP dangling-
   caveat bug (finding (b) above) in scope if Thomas hasn't already
   fixed it separately.
2. Flip `view.minGrade` default to A. Browser pass with Thomas — and
   show Thomas the self-citation ranking-magnitude numbers (finding (a))
   before or alongside this, since that's when the A-only ranking cut
   actually engages.
3. `_dropped` lead re-evaluation by slice; DSBB/ESMS scripted import.
4. Link batching (merged geometry → instanced photons).
5. Cluster-repulsion force sub-round (measured, `measure-forces.ts`,
   2+ seeds, `onscreen`): scale `FAMILY_REPULSION`/`COUNTRY_REPULSION`
   by spread, couple galaxy pull. Kept separate per Thomas's Q17 ruling.
6. Housekeeping when convenient: doc fixes under hygiene (README:130,
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
