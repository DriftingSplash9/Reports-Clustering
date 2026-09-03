# Independent Technical Audit — Economic Report Influence Graph

You are being engaged as an outside senior engineer/data-quality auditor. You have no
prior involvement in this project and no loyalty to any decision already made in it.
Your job is to find what is wrong, quantify how wrong, and tell the owner (Thomas)
what it will cost him if he ignores it. Do not soften findings to be encouraging. Do
not pad the report with things that are fine. If something is fine, say so in one
line and move on.

This is at least the fourth audit this repo has had in about a week (2026-08-29
through 2026-08-31, three of them independent). Prior audits found real, material
defects each time — hundreds of unsupported edges, dozens of nodes that shouldn't
have existed, a validator that was silently passing bad states, renderer bugs that
only appeared on real hardware. Assume the same base rate going in: this is a fast,
AI-driven, single-human-reviewer project, and "it validated clean" has repeatedly
turned out to mean "the checks that exist passed," not "the thing is correct."

## 0. What this project is

A TypeScript/Vite web app (`react-three-fiber` / `three.js` / `d3-force-3d`) that
renders a 3D force-directed graph of official economic and statistical publications
(census releases, CPI series, national accounts, audit reports) from governments and
international bodies. Nodes are reports; edges are dependency relations (report A's
methodology or data feeds report B); node size encodes how much of the corpus
depends on that report; color encodes region/country family. It has focus/drilldown
modes for tracing a single dependency chain.

Two halves of the work, and they should be audited differently:

- **The corpus** — ~3,350 report nodes and ~2,750 dependency edges as of the last
  handoff (2026-08-31), hand-researched country/region branch by branch, with a
  homegrown 44-check validator (`scripts/validate-data.ts`) enforcing schema and
  evidence rules. Nothing is supposed to enter the graph without a primary source
  document; unverifiable leads get logged in a `_dropped` array with a reason
  instead of being silently discarded.
- **The renderer** — the Three.js/React visualization layer: camera fitting, force
  layout, palettes, node/link visuals, legibility at scale.

## 1. Rules you must not break

These exist because they have already caused real damage in this repo. Breaking any
of them invalidates your audit and may cost Thomas actual lost work.

1. **Do not run any `git` command, including read-only ones (`git status`, `git
   log`, `git diff`).** If you have shell/device access to this repo, it is almost
   certainly through a bridge that can move files but not delete them; a stray git
   command leaves `.git/index.lock`, which will block Thomas's own commits in
   GitHub Desktop until he manually removes it. If you need git history or the diff
   of uncommitted changes, **ask Thomas directly** or ask him for a screenshot of
   GitHub Desktop's changed-files list. Do not guess at git state from file mtimes
   and present it as fact — say what you inferred and flag it as inferred.
2. **Do not delete files.** If your environment can move files but not delete them,
   put anything you want removed into `_to_delete/` (already git-ignored) and tell
   Thomas what's in it and why. Do not `rm` anything.
3. **`npm run validate` (gen + logic tests + 44 data checks) cannot be trusted to
   run over a Windows-host device bridge** — a Windows-built esbuild binary in
   `node_modules` breaks `tsx` on a Linux bridge VM. If your access to this repo is
   through such a bridge, stage the repo into an isolated Linux sandbox (with its
   own `npm install`) and run `npm run validate` there. If you cannot get a clean
   Linux run, say explicitly that you could not execute the validator and did a
   static read of `scripts/validate-data.ts` instead — do not imply you ran it.
4. **`src/data/slices.generated.ts` and `public/corpus-data.json` are generated**
   (`npm run gen`, from `src/data/research/*.json`). Never hand-edit either; if
   either looks wrong, the bug is upstream in the generator or the source JSON.
5. **This is an audit, not a fix-it round.** Do not edit corpus data, renderer code,
   or config to "correct" what you find. Produce findings and, where useful, a
   proposed fix — but leave the decision and the edit to Thomas or a follow-up
   agent round he explicitly authorizes. The one exception: if he separately asks
   you to also apply fixes, treat that as a distinct, later task with its own
   validate-before/after discipline.
6. **Read before you opine.** Before writing a single finding, read, in this order:
   `PLAYBOOK.md` (rules and traps), `README.md`, `START-HERE.md`, `REPORTS.md`
   (design doc — it's ~75KB, at least read the "read before doing any work" header
   section and the schema/evidence sections), the current `HANDOFF.md`, and as much
   of project memory as your tooling exposes (look specifically for files with
   "audit" in the name — there are at least four prior ones; do not repeat findings
   they already made and Thomas already ruled on, cite them instead). If something
   in this prompt conflicts with what you read there, the repo's own files win —
   this prompt was written from a snapshot on 2026-09-02 and may already be stale.

## 2. Known facts as of 2026-09-02 (verify, don't just trust)

Use these as a starting map, not as conclusions. Confirm or correct every one.

- Corpus per the last handoff (2026-08-31): 3,351 reports, 2,748 dependencies, 979
  isolated (no-edge) nodes. `public/corpus-data.json` (the generated research-slices
  array) has an mtime of 2026-09-01 — one day after that handoff.
- `src/App.tsx` is 3,494 lines / 146 KB. `src/components/InfluenceGraph.tsx` is
  ~180 KB and was modified 2026-09-02 (today, relative to this prompt) —
  **after** `HANDOFF.md`'s last update (2026-08-31) and after `App.tsx`'s own last
  edit (2026-09-01). That gap is itself worth investigating: what changed in
  `InfluenceGraph.tsx` since the handoff was written, and is it reflected anywhere
  (HANDOFF, memory, or nowhere)? The project's own standing instructions describe
  "an uncommitted backlog of six bodies of work" — treat that as a hypothesis to
  confirm, not confirmed fact, and do not try to reconstruct it via git (rule 1.1).
- Other outsized files: `src/lib/palette.ts` (72 KB), `src/lib/types.ts` (56 KB),
  `src/lib/graph.ts` (56 KB), `src/lib/hierarchy.ts` (26 KB), `src/components/
  nodeVisuals.ts` (32 KB), `src/components/MenuBar.tsx` (27 KB), `src/lib/
  view.ts` (26 KB).
- No ESLint, Prettier, or any lint config exists anywhere in the repo or its
  dependency tree (checked `package.json` and `package-lock.json` directly — zero
  hits for "eslint"). No `.github/` directory — no CI of any kind. The only
  automated gates are `tsc --noEmit`, a hand-rolled `scripts/test-logic.ts`
  (reported 123/123 passing as of 2026-08-31), and `scripts/validate-data.ts`'s 44
  checks — all three run manually, by whoever remembers to.
- The validator has known UX defects the project's own protocol notes document:
  a `DroppedReason` other than `caveat`/`resolved` whose (source, target) matches a
  live edge fails validation with **no visible "ERRORS" section** — the only
  symptom is a buried one-line count. This has already cost real time at least
  once. Treat "npm run validate passed" as weaker evidence than it sounds.
- Evidence debt that is currently a *warning*, not a build-breaking error: 162
  edges with no evidence URL (but a quote), 5 with only a bare homepage URL, 45
  citing an index/listing page. That's ~212 edges — roughly 7-8% of all edges —
  currently in the graph on weaker sourcing than the project's own stated
  standard, by the project's own accounting.
- Renderer performance is sparsely measured: one real-GPU reading exists (Radeon
  RX 580, 415-node "folded" tier: 120 fps; same scene with one country opened,
  3,173 draw calls: 60 fps, and the repo's own notes attribute this to one-material-
  per-link object overhead, i.e. main-thread/draw-call bound, not GPU-bound). The
  "everything unfolded" case (~2,500+ nodes, presumably far more draw calls) has
  never been measured on real hardware. The proposed fix (batch links into one
  material) is identified but not implemented.
- A dev-mode bug fixed 2026-09-01: React `StrictMode` double-invoking a memoized
  `forceGraph` construction caused two `ThreeForceGraph` instances to both run
  their digest, and the orphaned instance's mesh registry silently overwrote the
  shared one (a module/instance-scoped mutable map), causing visual features to
  silently no-op. The fix was a per-instance registry. This is a pattern bug
  (shared mutable state that isn't safe under double-invocation/HMR), not
  necessarily a one-off — it was only caught because its symptom was visible.
- A fully-designed visual revamp (`notes/visual-revamp-2026-08-18/`, including a
  reviewed palette proposal and a 46 KB review doc) has had **zero code written**
  against it as of this snapshot, roughly two weeks after being reviewed and
  approved. It is sitting in limbo, not formally shelved or scheduled.
- `_to_delete/` currently holds ~23 MB of never-actually-deleted material,
  including three near-identical `repo_staging*.zip` files (~5.3 MB each) and two
  audit-fix zips, dating back to 2026-08-30/31 — i.e. "delete this" has been true
  for days and hasn't happened, which is a process gap (rule 2 above exists
  precisely because this keeps recurring).
- A large, separate top-level directory, `Grok - Brics+israel and singapore/`,
  contains hundreds of raw and "consolidated" per-country Grok research JSON
  files, its own `_to_delete/` with more zips, batch logs, and status files — all
  outside `src/`, not obviously wired into the `npm run gen` pipeline, and not
  documented anywhere you've been told to read first. Establish what this
  directory actually is (active staging ground vs. dead archive vs. duplicate of
  what's already merged into `src/data/research/`), because right now it reads as
  ambiguous, and ambiguous multi-hundred-file directories in an active repo are a
  liability regardless of which one it turns out to be.

## 3. Part A — Corpus / data-quality audit

Do not just re-run the 44 existing checks and call it done — those are the checks
the project already trusts. Your value is in what they *don't* catch.

1. **Reproduce the numbers.** Get an actual, current node/edge/isolated count
   (from a clean `npm run gen` + inspection, in a sandbox per rule 1.3) and compare
   to HANDOFF's stated 3,351/2,748/979. If they differ, that alone is a finding —
   it means uncommitted or unrecorded changes exist.
2. **Evidence spot-check, not just schema-check.** Pull a random, seeded sample
   (at least 40, stratified across branches: AF/EU/US/CA/NZ/AU/BRICS) of edges that
   currently pass validation, and for each: open the cited `evidence_url` yourself,
   confirm it resolves (real HTTP status, not a WebFetch summary — the project's
   own protocol note #3 warns that a pointer is not a source and that WebFetch can
   fabricate content for a dead URL), and confirm the cited document actually
   supports the specific dependency claimed, not just that it mentions both
   reports. Report a hit rate, not just a list of failures.
3. **Re-litigate the "warning, not error" evidence debt.** Look hard at a sample of
   the ~212 edges sitting on no-URL/bare-homepage/index-page evidence. Is
   "warning" still the right severity, or has this become a queue nobody is
   working down? Give Thomas a real recommendation on when to flip it to a hard
   error (the project's own HANDOFF names this as an open promotion gate).
4. **Duplicate and near-duplicate detection beyond exact-match.** Prior audits
   found duplicate node pairs by name/id similarity. Go further: look for nodes
   that are the same underlying publication under different scope boundaries (a
   sub-report merged as if independent, or `part_of` containment relationships
   modeled as ordinary dependency edges — protocol rule #9 says this recurs
   constantly). Quantify how often it recurs, not just whether it exists.
5. **Directionality audit.** For a sample of edges, verify the dependency actually
   runs the direction claimed (A feeds B, not B feeds A). Protocol rule #10
   documents this as a recurring, not hypothetical, class of error.
6. **`_dropped` integrity.** Sample entries in `_dropped` arrays and confirm they
   are honest — i.e., they don't quietly describe a relationship that does, in
   fact, now exist as a live edge (which the validator is supposed to catch per
   rule #7, but the check has known edge cases) and that the stated reason matches
   what a fresh look at the source would conclude today.
7. **Coverage and structural bias.** With node size encoding how much of the
   corpus depends on a report and color encoding region, check whether the
   country-branch-by-branch build order (AF, EU, US, CA, NZ, AU, then BRICS) has
   produced a graph whose visual "importance" signal is actually an artifact of
   which regions got researched most deeply, rather than real-world influence.
   Quantify: e.g., are there large countries/economies still under-wired for
   reasons of research order rather than genuine data scarcity? (Cross-reference
   the "798/979 isolated nodes triaged" and per-country isolated-node breakdowns
   already in project memory before re-deriving this from scratch — build on it,
   don't duplicate it.)
8. **Link rot exposure.** `scripts/check-urls.ts` exists; is there any evidence it
   runs on a schedule, or only ad hoc during research rounds? Every edge's
   evidentiary value depends on a government/international-body URL staying live.
   Give Thomas a number: how many live edges' evidence URLs currently 404 or
   redirect somewhere unrelated, from a real check, not an assumption.

## 4. Part B — Renderer / codebase engineering audit

Treat this as a code review from an engineer who will inherit this codebase and has
to keep shipping features into it, not as a one-time bug hunt.

1. **File-size and decomposition audit.** `InfluenceGraph.tsx` (~180 KB),
   `App.tsx` (3,494 lines), `palette.ts` (72 KB), `types.ts` (56 KB), `graph.ts`
   (56 KB) are all large by any normal standard for a single module. For each of
   the top 5, say concretely: what responsibilities are mixed together in this
   file, what would a reasonable decomposition look like, and what breaks first if
   nobody splits it (onboarding cost, merge-conflict risk, cognitive load for
   debugging one of the many "do not raise this constant" comments the project
   says these files carry).
2. **Shared mutable state audit.** The 2026-09-01 fix (per-instance `__meshes`
   registry replacing a shared one) is evidence of at least one module/singleton-
   scoped mutable object that wasn't safe under React `StrictMode` double-
   invocation or Fast Refresh. Grep for other module-scope `let`/object literals
   used as caches or registries in `src/lib/` and `src/components/` (start with
   `graph.ts`, `view.ts`, `hierarchy.ts`, `clusterRepulsion.ts`, `search.ts`,
   `selection.ts`) and flag every one that could suffer the same class of bug, even
   if it hasn't visibly misbehaved yet. Silent-until-visible is exactly the failure
   mode already seen once.
3. **Performance claims, verified not trusted.** The only real-hardware
   measurement on record is one GPU, one scene tier, one draw-call count. If you
   have any way to get a second real (non-headless, non-SwiftShader) measurement —
   different node count, ideally the "everything unfolded" tier — get it. If you
   cannot get real hardware, say so plainly and do not substitute a headless/
   software-rendered number while implying it's representative (the project's own
   memory flags this exact substitution as a past mistake — "renderer_transparent_
   toggle" memory explicitly warns against "trusting a swiftshader-sandbox FPS
   number"). Independently assess whether "one material per link" is really the
   binding constraint claimed, or whether there's a second bottleneck being masked
   by it (e.g., per-frame force-simulation cost, GC pressure from allocations in
   the render loop, React re-render fan-out from context/state changes touching
   the graph).
4. **Scaling ceiling, first-principles.** The corpus is ~3,350 nodes today and
   still growing (BRICS branch incomplete; no stated end state). At today's size
   the renderer is already main-thread/draw-call bound with a single country
   opened. Give Thomas a real opinion: does the current architecture (one mesh per
   node, one material per link, force layout on the CPU via `d3-force-3d`) have
   headroom for 2x or 5x the current corpus, or is a structural change (instanced
   meshes, merged link geometry, GPU-side force computation, level-of-detail
   culling) required before the corpus grows much further? This should be a
   specific, falsifiable claim with your reasoning shown, not a hedge.
5. **Type-check and build cleanliness.** Run `tsc --noEmit` and `npm run build` in
   a clean sandbox. Report every error and warning verbatim, not summarized. If
   clean, say so in one line.
6. **Dependency and tooling health.** Check for outdated or unusually risky
   dependency versions (`react@19`, `three@0.185`, `@react-three/fiber@9`,
   `three-forcegraph@1.43` — these are all fairly recent majors; confirm there
   isn't a known incompatibility or deprecated API in use). Note the complete
   absence of lint tooling as a finding in its own right, with a concrete
   recommendation (what ruleset, what it would likely catch here given the file
   sizes above) rather than a generic "you should add ESLint."
7. **Test coverage, honestly assessed.** `scripts/test-logic.ts` is a hand-rolled
   48 KB script, not a real test framework (no Vitest/Jest, no coverage reporting).
   123/123 "tests" passing tells Thomas nothing about what fraction of the actual
   logic surface (force calculations, camera fit, filter/search, deep-linking,
   view save/restore) those 123 assertions touch. Estimate real coverage of the
   riskiest modules (`view.ts`'s camera fit, `filter.ts`, `deepLink.ts`,
   `savedViews.ts`) by reading the test file against the modules it claims to
   cover, and name the biggest gaps.

## 5. Part C — Repository hygiene and process audit

1. **Confirm or refute the "six uncommitted bodies of work" claim** using only
   file mtimes, `HANDOFF.md`'s own stated last-update date, and direct questions to
   Thomas — never `git`. Give him a concrete list of what looks uncommitted and how
   risky each looks to lose or to merge.
2. **`_to_delete/` audit.** List everything in both `_to_delete/` directories (top
   level and the one nested inside `Grok - Brics+israel and singapore/`), total
   size, and how long each item has been sitting there. Recommend what actually
   needs Thomas to click delete versus what turns out to still be needed (in which
   case it shouldn't be in `_to_delete/` at all).
3. **`Grok - Brics+israel and singapore/` disposition.** Determine, and state
   plainly, whether this multi-hundred-file directory is: (a) fully superseded by
   `src/data/research/` and safe to archive, (b) partially unmerged source
   material that BRICS rounds still depend on, or (c) genuinely unclear even after
   investigation — and if (c), say exactly what would resolve the ambiguity.
4. **Stale documentation.** Cross-check `README.md`, `START-HERE.md`, and
   `PLAYBOOK.md` against the actual current repo state (not against HANDOFF, which
   is meant to be ephemeral) — the project's own memory shows this has drifted
   out of sync at least once already ("both described the old per-branch regime as
   current"). Flag anything else that's now wrong.
5. **The stalled visual revamp.** Recommend explicitly: formally shelve it (move
   the notes to `archive/` with a one-line reason), schedule it, or flag that it
   needs a decision from Thomas before it rots further. Don't just note it exists.
6. **Audit fatigue check.** Four-plus audits in roughly a week, each finding
   material defects, is itself a signal. Give Thomas your honest read: is the
   defect rate falling round over round (process improving), flat (audits are
   catching the same class of thing because the root cause — e.g. AI research
   agents' verification standards, or the lack of CI — hasn't been fixed), or is
   each audit finding genuinely new categories of problem (scope was still
   incomplete)? Use the prior audit memory entries to answer this with evidence,
   not impression.

## 6. What "done" looks like

A written report, organized by the sections above, where every finding has: the
specific file/edge/id it's about, what you did to verify it (not just what you
read), a severity (this changes the graph's correctness / this will bite in 6
months / this is cosmetic), and — only where genuinely useful — a concrete next
step. End with:

- A short list of **rulings Thomas needs to make**, phrased the way this project's
  own past audits have phrased them (e.g. "1-A: flip the evidence warnings to
  errors now / 1-B: give the 212-edge backlog one more round first") — this
  project's owner has consistently worked this way and will act faster if you hand
  him decisions in that shape rather than open-ended recommendations.
- One paragraph, in plain language, answering the question that was actually
  asked of you: **given everything above, is this codebase and corpus in a state
  where continuing to build on it as-is is reasonable, or does something
  structural need to change first — and if so, what, specifically, before the next
  BRICS round or the next 1,000 nodes.**

Be blunt. This project's owner has explicitly said he wants direct, unpadded
technical assessments, not reassurance.
