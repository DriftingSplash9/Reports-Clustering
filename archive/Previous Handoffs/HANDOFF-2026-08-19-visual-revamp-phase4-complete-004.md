# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the
top level.** When it is superseded, the new session moves this file into
`Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes a fresh
`HANDOFF.md` in its place. Thomas periodically sweeps `Previous Handoffs/` into
`archive/handoffs/`. Never leave two handoffs at the top level.

Last written: **2026-08-19, end of day** (revised same day: git-status correction, lighting closed, camera-density item added) — the close of a five-session day that
audited the project, built visual-revamp Phases 2 and 3.5, and landed most of
Phase 4. Written deliberately for a FRESH agent with no memory of any of it.
Supersedes `Previous Handoffs/HANDOFF-2026-08-19-audit-phase2-35-4.md` (the
running log of this day, kept for its per-item detail) and, behind that,
`Previous Handoffs/HANDOFF-2026-08-18c-grok-consolidation-final.md` (still the
authoritative Lane A / Grok-archive reference).

---

## 1. Read these first

**In this order. Do not skip step 1.**

| # | Document | Why |
|---|---|---|
| 1 | **`REPORTS.md`** — start at *"🛑 Agent: read this before doing any work"* | The standing rules. The two most violated: never run git, and every edge needs a document. |
| 2 | **This file, all of it** | Current state, the prioritized todo, the traps. |
| 3 | `START-HERE.md` | Plain-language orientation, if the project is new to you. |

Then one of these, depending on the task:

| Task | Read |
|---|---|
| Anything visual | §4 and §6 below first; then `notes/visual-revamp-2026-08-18/visual-revamp-review.md` (rev 4) for the measured design, and `Previous Handoffs/handoff-summary.md` for Phases 0–1 in plain language |
| Phase 4 UI work | `notes/phase-4-brief-2026-08-19.md` — items 1, 2, 3, 4.1, 4.2 and 5 are BUILT; §6 (menu bar) and §7.1 (saved views) are not |
| Minting / the staged archive | `Previous Handoffs/HANDOFF-2026-08-18c-grok-consolidation-final.md` §6–§8, then `Grok - Brics+israel and singapore/consolidated/CONSOLIDATION-REPORT.md` and `_STATUS.md` |
| BRICS research | `BRICS/G.3.md` |
| Schema | `src/lib/types.ts` — mostly documented reasoning, not types |

**House habit: the code is the design doc.** `palette.ts`, `nodeVisuals.ts`,
`linkVisuals.ts`, `view.ts`, `modes.ts` and `InfluenceGraph.tsx` carry long
comments explaining why each constant is what it is, usually with the date and
Thomas's words. Read the comment before changing the number. Several say "do
not raise this" and mean it.

---

## 2. Standing rules

Full text in `REPORTS.md`. The short list, because these are the ones that
break:

1. **Never run git in this repo from an agent session** — not even read-only.
   It leaves a stale lock. Ask Thomas, or check via GitHub Desktop.
2. **If no document says a dependency exists, it does not go in the graph.**
3. **A pointer is not a source.** WebFetch can fabricate content for a dead
   URL; raw-verify before trusting a quote.
4. **`npm run validate` before and after any data change** (44 checks). It
   cannot run through the device bridge (`node_modules` carries the Windows
   esbuild). The working recipe: tar `src/ scripts/ package.json
   tsconfig.json` on-device, stage the tarball, extract + `npm install` in a
   Linux workspace, run there. `index.html` + `vite.config.ts` are also needed
   if you want `npm run build` or a headless render.
5. **`src/data/slices.generated.ts` is generated. Never hand-edit it.**
6. Agents cannot delete device files — `mv` into `_to_delete/`, log the reason
   in `_to_delete/README.md`, tell Thomas.
7. **Headless verification works and is expected**: build, `vite preview`,
   Playwright + the preinstalled Chromium with
   `--use-angle=swiftshader --enable-unsafe-swiftshader`. Geometry and colour
   are exact; **bloom/glow is NOT trustworthy** in software rendering, and CSS
   transitions can wedge under load (see traps, §7).

---

## 3. Where the project is (verified 2026-08-19)

**Live corpus:** 1,250 reports · 1,079 dependencies. `npm run validate` exits
0 (all 44 checks; warnings only — the 7 single-use `proposed:` tags and the
known isolated-report list). `npx tsc --noEmit --skipLibCheck` clean.
`npm run build` clean. All re-verified after the last code change of the day.

**Staged corpus:** `Grok - Brics+israel and singapore/consolidated/` — 37
country files, 1,999 reports. Mint is decided YES but deferred and LAST on the
priority list. Since 2026-08-19: the 35 `_cadence_resolution:
"continuous-database"` records carry nominal `releases_per_year` (31×250
business-day, 4×365 all-days monitors), so `undefined` now means one-off
instrument ONLY, corpus-wide. Also in `consolidated/`:
**`_EDGES-jp-kr-tw-2026-08-19.json`** — an additive edge file from another
session's research round on Japan/Korea/Taiwan (the three largest zero-edge
countries). It is DATA, not bookkeeping; merge per its own `_rule`; do not
sweep it.

**Git: agents cannot see it, so agents must not assert it.** Thomas confirmed
on 2026-08-19 with a GitHub Desktop screenshot — branch `main`, **0 changed
files**, "Fetch origin, last fetched just now". The repo is fully committed and
pushed, and had been all along. Every handoff since 2026-08-13 opened with a
growing "nothing committed, three weeks of work on one disk" emergency; that
claim was never verified by anyone, was copied forward each session with that
session's work appended to the list, and was false. Standing rule 1 bars agents
from running git, which is exactly why the claim was unfalsifiable and grew.
**No session may state git status in any document — not "committed", not "not
committed", not a backlog count.** Ask Thomas, or read a GitHub Desktop
screenshot. Delete any such claim you find rather than carrying it forward;
dated "NOT git-committed" lines in older memory entries are point-in-time notes
that were never verified either.

**Project memory is INTERMITTENT** — it accepted writes early on 2026-08-19
and refused them a few hours later ("not available in this session"). Written
successfully: the git-status corollary on `git-no-touch`, a corrected
visual-revamp index entry, and `camera-fit-density-risk-2026-08-19`.

⚠️ **`camera-fit-density-risk-2026-08-19` in project memory is WRONG and could
not be corrected — memory went down before the rewrite landed.** It states the
camera sits at ~2.8 × p95 (it is **5.675 ×**) and predicts a diffuse halo of
edgeless nodes after the mint (impossible — the shelf already excludes them
from the fit). **`notes/camera-fit-measurement-2026-08-19.md` and §5 item 5
below supersede it.** First session with working memory: overwrite that entry
from the notes file, then delete this warning.

STILL OWED to memory: entries for the audit, Phases 2/3.5/4, and the cadence
fix.

**File locations that moved on 2026-08-19** (audit reorg + Thomas's own
tidying): `Previous Handoffs/` now holds `handoff-summary.md` (Phases 0–1
plain-language account) and `grok-import-progress.md`; superseded handoffs are
there too pending Thomas's sweep to `archive/handoffs/`. `GROK-PIPELINE.md` →
`archive/planning/`. `brics-and-grok.md` → `notes/brics-and-grok-2026-08-18.md`.
`notes/node-surface-encoding-2026-08-19.md` is the solid/blurred/bordered node
idea. `diary.csv` at the top level is Thomas's personal cross-project diary —
not the project's; leave it alone.

---

## 4. What the app is now — one day changed most of the renderer

A fresh agent should assume ALL of the following exists and works; each landed
2026-08-19 and each carries a dated comment at the site:

- **Lenses (Phase 2).** `src/lib/modes.ts`: STANDARD / GROUP_COMPARISON (US
  red, BRICS yellow, EU green, INT white, rest grey) / WORLD_OVERVIEW
  (seven-way continental roll-up). BRICS membership lives ONLY in
  `geoAffinity.ts`'s `COUNTRY_BLOCS`. Lens = recolour pass via ref + mutation
  effect; **never a forceGraph memo dep**. Rim uniforms are live-mutable
  (`userData.uRimColour`) so hollow nodes follow the lens.
- **The constellation look (Phase 3.5).** Near-black background (`#010204`),
  dim at 0.045/0.012 (nearly invisible by Thomas's direct call — the traced
  chain carries orientation now), link rest lengths ×2 (rest length ONLY —
  scale-invariance eats a uniform doubling), flat crisp panels (no glow, no
  blur, blue keyline), bigger masthead with a 28s rotating gradient, tier bar
  bottom-left, unlinked shelf bottom-right, country selector as a
  collapsed-by-default drop-up (All / None / any combo, scrolls).
- **Lighting (Phase 4 §2).** Two DIRECTIONAL lights (key [0.6,0.8,1] @ 2.2,
  cool fill from behind @ 0.7) + ambient 0.28; emissive floor 0.12; bloom
  thresholds 0.14/0.26 (rescaled analytically, NOT by eye). Every sphere has a
  consistent terminator now. **Thomas's last words on it: "one thing seemingly
  off is the lighting" — tuning it by eye on his GPU is an open [Us] item; all
  five numbers are starting points.**
- **Blueprint is DELETED** (Phase 4 §1) — the whole paper theme, ~130
  references. No view setting is a memo dep any more. Rims survive in exactly
  one place: hollow one-off instruments. `START-HERE.md`/`REPORTS.md`/
  onboarding prose may still mention Blueprint — sweep when touching docs.
- **Hover and selection (Phase 4 §4).** Hover: eased grow to 1.15×, emissive
  lift, small halo — all in refs + useFrame. Click: full `Detail` card slides
  in from the RIGHT; hover shows only an identity chip. Camera refits
  UNCONDITIONALLY on every filter change (third rewrite; the conditional
  heuristic read as a glitch — history in `requestRefit`).
- **The edge evidence card (Phase 4 §5).** Click any line/arrowhead/pulse —
  or within 9px of a line (screen-space picker; a 1.6px line is unhittable by
  raycast, measured) — and a card slides from the LEFT listing every
  Dependency behind that drawn line: real endpoints ("X rests on Y", via
  `original_source_id`/`original_target_id` preserved by disclosure),
  relationship type, reference period, the verbatim `basis` quote, and
  `evidence_url` as a primary-source link. Right = what a node is, left = why
  an edge exists; the two coexist. No back-reference is stored — App
  re-filters disclosed edges by `edgeKey` on demand.
- **Loading curtain, spread ceiling 10000%, and the cap re-derived
  (2026-08-20, later).** `src/components/LoadingCurtain.tsx` (new) + an
  `onReady` prop on `InfluenceGraph`.
  - **The curtain** holds an opaque #010204 screen over the scene until the
    renderer reports BOTH `settledOnce` (the engine actually stopped, via
    `onEngineStop`) AND `fitted` (a fit has run). Thomas asked for it because
    the warmup is visible thrashing — *"I think when we triple the size of
    this the settling will take even longer"*, which is correct. Fires once,
    on first load only: a curtain over every tier click would be worse than
    watching a graph you can already see rearrange. **The safety timeout
    (25s) is the load-bearing part** — if `onReady` never arrives, the
    curtain lifts anyway, because one that never lifts is a broken app.
    Measured lifting at 20–21s in the software-rendered sandbox, on the real
    signal rather than the timeout; a GPU converges far sooner.
  - **Spread ceiling 10 → 100 (10000%)**, Thomas's explicit choice after
    being shown that it saturates: 2.7× more core radius and 25% more air,
    not 10×.
  - **`nodeScaleFor`'s cap re-derived 200 → 2000.** The rule written into that
    comment an hour earlier ("if either slider ceiling moves again, recompute
    this") immediately earned its keep: cold-starting at 10000% with geo off
    asks for a node scale of **921.9** at States tier, 781.7 at Everything.
    A cap of 200 would have reproduced the morning's invisible-nodes bug at
    the new ceiling.
  - **NEW FINDING — the layout is path-dependent, and this is probably the
    "ball vs oblong" glitch.** Cold-starting at spread 10000% settles to a
    core radius of **240,508**; dragging the slider up to 10000% during a
    live session settles at **17,217**. Same settings, factor of fourteen.
    The simulation keeps the history of how it got there. Not fixed — the fix
    is a question about the simulation (re-seed positions on spread change?)
    rather than about any one constant — but every cap and threshold has to
    clear the worst path, which is why the cap is 2000 and not 40.
  - Verified on the device tree after committing: `tsc` clean, `npm run
    validate` 44 checks / 1250 / 1079, `npm run build` clean, curtain lifts
    at 21s with zero console errors.

- **Two rendering bugs found and fixed 2026-08-20**, both surfaced by Thomas's
  *"the nodes and edges are nearly invisible"* report (Geo-affinity off,
  Cluster spread 1000%, Nations tier).
  1. **`nodeScaleFor`'s cap was binding hard.** It was 20 — "roughly twice
     what the corpus asks for" as measured on 2026-08-19, before that
     evening's slider rebasing. At geo-off/spread-1000% the core radius
     reaches 28,558 and the fit asks for a scale of **92.8**; it got 20.
     Nodes were drawn at under a fifth of their intended size, and because
     `baseLinkWidth` is a MULTIPLE of node scale, every edge was four-fifths
     too thin at the same moment — which is why the edges vanished first.
     Raised to **200** (twice the most extreme reachable setting, computed
     not guessed). Bright pixels in the frame went 4,284 → 21,248 at
     identical settings, a 5.0× recovery against a predicted 4.6×.
     **Geo-affinity had been hiding it**: the bloc pull holds the cloud near
     5,900, just under the old cap, so at the 150% default nothing looked
     wrong. **If either slider ceiling moves again, recompute this cap.**
  2. **Changing geo-affinity reheated the layout but never re-fitted.** The
     effect called `d3ReheatSimulation()` and stopped there, so node scale,
     link widths and camera distance stayed tuned to the pre-change cloud —
     and geo changes the core radius by nearly 5× on this corpus. Now
     debounced 300ms (same as `spreadApplied`) and followed by
     `requestRefit()`. Found via a harness reading that looked stale and
     turned out to be the app, not the harness.

- **Spread saturates — measured 2026-08-20.** Thomas asked whether the
  ceiling should go to 10000%. Rendered it: p95 goes 6,429 → 17,217 (2.7×,
  not 10×) and median nearest-neighbour gap as a fraction of the two nodes'
  drawn radii goes **0.84 → 1.05**. Ten times the spread buys 25% more air.
  Cheap and safe to raise the ceiling, but it is not the lever it looks like.
  **The camera never ends up inside the cluster** whatever the spread — the
  fit is percentile-based, so it backs off proportionally (max/p95 stayed
  1.5–1.9 against a 5.675 threshold). Getting *inside* needs navigation, not
  spread. Two things already exist and are undocumented: **pan is already on**
  (`enablePan` defaults true — right-drag moves the target through the cloud),
  and **min zoom already puts the camera inside the outer shell** (ZOOM_MIN
  0.25 × a fit distance of 97,712 = 24,428, against a max node radius of
  ~26,000). Arrow-key flying is close to free: drei's `OrbitControls` takes a
  `keyEvents` prop (default false) and three's controls already implement
  arrow-key panning at `keyPanSpeed = 7`. **Check the SearchPanel's own arrow
  handling before enabling it** — that is the one collision.

- **Cluster spread and geo-affinity rebased (2026-08-19, late).** Spread now
  runs **200%–1000%, opening at 200%** (was 25%–375% opening at 100%); the old
  default is below the new floor and unreachable on purpose — Thomas: *"far too
  dense at 100%... best to start at the current 200%... from there as a minimum
  up to a 1000x max."* Geo-affinity ceiling **1.5 → 5** and its default **0 →
  1.5**, because he had been running pinned at the old ceiling. Constants in
  `lib/view.ts` (`DEFAULT_VIEW`) and `components/ViewControls.tsx` (`SLIDERS`),
  both with the reasoning at the site. Measured before shipping: spread really
  does decrowd at today's node count — median screen-space gap between nearest
  neighbours, as a fraction of the two nodes' drawn radii, goes **0.33 at 200%
  → 0.84 at 1000%** (2.6×) and overlapping nearest-neighbour pairs fall **86% →
  63%**, while drawn node radius holds at ~4.1px. So the in-code warning that
  spread "never delivered this on its own at 375%" no longer applies — it
  predates `LINK_LENGTH_SCALE = 2` and the node-size change. Camera stays safe
  across the whole range (max/p95 1.49–1.55 against a 5.675 threshold). Geo at
  5× settles with no NaN and no oscillation, and visibly segregates the
  continental inks. `tsc`, `npm run validate` (44 checks, 1250/1079) and
  `npm run build` all clean afterwards.

- **Edges and pulses have SET SIZES and split shades** (Thomas, end of day:
  "too noisy trying to equate the thicknesses... go with set sizes and keep it
  simpler"; "pulses can be brighter and the edges lighter shades").
  `baseLinkWidth()` returns 1 — every line one width, every pulse one size.
  Trunk stacking and the cross-border boost survive in line OPACITY (+ the
  blinking pulse); weight survives in rest lengths. Lines draw in
  `edgeShade(ink)` (ink lerped 0.22 to white, low opacity — pale threads);
  pulses draw at ink lerped 0.35 to white, opacity 0.92 — brighter beads on
  those threads, same hue, normal blending. **Pulse colour history matters:**
  a whitened-ADDITIVE version lived one session and was reverted — additive ×
  thousands of photons = snowstorm. Do not reintroduce additive pulses.

---

## 5. The prioritized todo list (2026-08-19, end of day)

Sorted by owner, ordered by priority within each.

### [Thomas] — only you can

1. **Empty the recycle bins**: `_to_delete/` at the root and
   `Grok - Brics+israel and singapore/_to_delete/`. Keep `grok-batches/` and
   the three BRICS/Israel/Singapore zips — sole raw provenance.
2. **Sweep `Previous Handoffs/` into `archive/handoffs/`** when convenient —
   five files are waiting, including two plain-language accounts worth keeping
   (`handoff-summary.md`, `HANDOFF-2026-08-19-audit-phase2-35-4.md`).

*(The "commit the backlog" item that led this list for weeks is deleted — it
was never real; see §3. The lighting question is answered: "the lighting is
okay", Thomas 2026-08-19.)*

### [Us] — your eyes, agent's hands

5. **Camera fit vs. cluster density — RAISED by Thomas 2026-08-19, then
   MEASURED the same day. Answer: not a risk from growth.** Full table in
   `notes/camera-fit-measurement-2026-08-19.md`. The camera always sits at
   exactly **5.675 × the p95 node radius** (that constant is `1.18 /
   sin(FOV/2)` at FOV 24°), so a node only gets behind the camera once
   **max / p95 > 5.675**. Measured on the Everything tier, n=3, settled
   layout: live corpus **1.74**, and with the staged mint simulated in
   (framed nodes 958 → 1,758, +84%) **1.81**. Doubling the graph cost 4% of
   the margin; zero nodes behind the camera in every run. The layout is
   scale-free, so p95 and max grow together and the fit rides the expansion.
   **Two things this corrected:** the camera is at 5.675 × p95, not the
   ~2.8 × an earlier note claimed (that assumed a ~50° FOV); and the feared
   "diffuse halo of edgeless staged nodes" cannot happen, because
   `measureFit` already drops edgeless nodes from the fit via the
   frame-the-graph-not-the-shelf rule — 1,155 of the 1,999 staged reports
   (58%) are edgeless and every one of them goes to the shelf.
   **The one live risk is GEO_EXPLORATION** (item 10): a mode that
   *repositions* nodes replaces a scale-free cloud with a bounded surface and
   invalidates every number above, and it also stops being a pure recolour
   pass, so it cannot stay out of the `forceGraph` memo deps the way lenses
   do. Re-run the measurement if it is built. **Lighting is CLOSED** — "the
   lighting is okay" (Thomas, same message); the five rig numbers stand as
   shipped.

6. **Pulse size/shape redesign + the beam.** Burner by your instruction. The
   set-sizes pass fixed the noise; the beam idea (continuous databases render
   their edge as a lit stream with a direction cue) replaces pulse geometry on
   the fastest edges, so shape and beam are ONE design round. Pairs with the
   soft-edge node idea (`notes/node-surface-encoding-2026-08-19.md`) — the 35
   continuous databases now have the data to support all of it.
7. **Mint the staged archive** — decided yes, LAST on your list, needs a
   dedicated session. Pre-mint gates in order: `npm run check-urls -- --dir
   "Grok - Brics+israel and singapore/consolidated"` (your machine — sandbox
   egress blocks some hosts); merge `_EDGES-jp-kr-tw-2026-08-19.json`; the
   Mexico/Argentina geography-as-a-node sweep; live-wins on the 4 duplicate
   ids (+ graft the staged RBI `external-sector` tag); **the fit measurement in item 5 is already
   done for the mint and came back clear (max/p95 1.74 → 1.81), so this is no
   longer a mint gate.** After minting: re-count
   the palette's chroma damping — corpus shares are an input to it.

### [Agent] — next build rounds, in order

8. **Menu bar + Help/How-to + the node card's URL link — DONE 2026-08-20.**
    `src/components/MenuBar.tsx` (new) and `HelpCard.tsx` (new); edits to
    `App.tsx`, `Onboarding.tsx`, `PanelShell.tsx`, `SearchPanel.tsx`,
    `CalendarPanel.tsx`, `lib/uiTheme.ts`.
    - **Six of the seven blocks hide by default** behind a `Panels ▾` menu
      (Reports / Find a report / Calendar / Countries / Unlinked reports / View
      controls), with Show all and Hide all. Choice persisted at
      `rig.panels.v1`, merged over the defaults on read so a key added later
      cannot arrive `undefined`.
    - **Both pieces of pushback honoured.** The tier bar is NOT in the menu —
      it is primary navigation — and its status line stays visible with it, so
      no separate always-on strip was needed. The argument is written at the
      top of `MenuBar.tsx`; if Thomas ever asks for the tier bar hidden too,
      the status line needs its own strip and that is the part not to forget.
    - **The bar toggles blocks where they live; it does not re-parent them.**
      A dropdown containing a panel would mean stripping fixed positioning out
      of six components whose screen edges are load-bearing. Word's View ▸ Ruler
      does not put the ruler inside the menu either.
    - **Help renders `START-HERE.md` imported raw at build time** (`?raw`), so
      the two can never drift — editing the markdown edits the card. Everything
      from `## Running it` onward is cut at render time (repo mechanics, not
      graph explanation); the cut is by heading name, so a rename degrades to
      "shows slightly too much" rather than to a stale copy. `HelpCard.tsx`
      carries a ~90-line markdown subset — headings, paragraphs, bullets,
      rules, bold/code/link/italic — deliberately not a dependency.
    - **How-to re-opens the existing onboarding card** via an `openRequest`
      counter prop (a counter, not a boolean, so asking twice works and there
      is no "set it back to false" step to forget). It does NOT clear the
      dismissed flag — asking to see it once is not asking to see it every load.
    - **The report's `url` is now on the selection card**, shown as its host
      (`statcan.gc.ca ↗`) because full URLs run past 120 characters and wrap.
    - **A shared `HUD_TOP` in `lib/uiTheme.ts`** replaces four hard-coded top
      offsets that a top bar collides with.
    - Verified on the device tree after committing: `tsc` clean, `npm run
      validate` 44 checks / 1250 / 1079, `npm run build` clean, and a headless
      pass that opens both menus, toggles all six panels, opens Help, re-opens
      the onboarding card, reloads to confirm persistence — zero console errors.
    - **Blueprint doc sweep: nothing to do.** No `blueprint` in any top-level
      `.md` or in `notes/`; every remaining mention in `src/` is a deliberate
      dated tombstone recording the deletion. Struck from the list.

9. **Saved views — DONE 2026-08-20.** `src/lib/savedViews.ts` (new), a third
    `Views ▾` menu in `MenuBar.tsx`, wiring in `App.tsx`. Phase 4 is now
    complete.
    - Saves **tier, every view setting, the filters, the traced node, and
      which panels are open**. Panels were added to the brief's four because
      "the way you like it" includes what is on screen.
    - **`openOnLoad` (the ★) is the actual feature.** Thomas's complaint was
      *"annoying to always open to the basic graph and then have to adjust all
      these settings"* — that is about OPENING, not switching. Starred views
      are read at MODULE scope, not in a hook, so the starred state is the
      graph's first state and the 400-tick warmup happens once for the right
      graph instead of once for the default and again for the saved one.
    - **Versioned from day one** (`schema: 1`, key `rig.views.v1`) and
      restored by MERGING into today's defaults, never replacing them — so a
      view saved before a future field exists degrades to that field's default
      instead of handing the app an object with a hole in it. A save from a
      FUTURE schema is ignored outright rather than guessed at.
    - Not tabs, deliberately: a live tab is a second canvas and a second
      simulation. One canvas, N states. Switching `view`/`filter` is instant;
      switching tier or spread costs the same beat the tier buttons already
      cost.
    - Inline name field rather than `window.prompt` — a native dialog blocks
      the render loop and wedges anything waiting on a frame.
    - Verified on the device tree: save → apply mid-session (tier 1 → 3) →
      star → reload restores tier 3, glow 0 and the panel set. `tsc`,
      validate (44 / 1250 / 1079) and build all clean, zero console errors.
      **Harness note:** the menus close on `pointerdown`, not `click`, so
      `document.body.click()` does not dismiss them — that cost one false
      "apply is broken" result.

10. **Phase 3** (after Phase 4, by Thomas's reorder): GEO_EXPLORATION mode
    (geography takes the fill; needs a `REGION_OF` table) and typed edges —
    answer first what a trunk's "type" means when one line stands for 57
    mixed edges; `methodology_depends_on` is the MOST common type (407).
11. **The four flicker tests are RUN (2026-08-19).** Full write-up in
    `notes/flicker-tests-2026-08-19.md`. Three of the four suspects from
    review §9 are cleared or unsupported by measurement:
    **(2) silent mesh recreation — CLEARED**, zero recreations across eight
    full tier rebuilds; **(4) orb breath intersecting neighbours — CLEARED**,
    zero overlapping pairs at full inhale (test at tier 2 — there are no orbs
    at the Everything tier); **(1) transparent-queue sort instability — NOT
    SUPPORTED**: the sort really is unstable (~750 contested pairs per frame,
    2–3 flipping order per frame under auto-rotate), but neither candidate fix
    moves a pixel beyond the scene's own drift — two bursts at the *same*
    setting ten seconds apart differ MORE than the two settings differ from
    each other. **(3) bloom shimmer is untestable headless (rule 7) and is now
    the leading candidate by elimination** — Thomas has a one-minute check:
    get the flicker going, drag the glow slider to 0.
    **Real side-finding worth acting on:** the comment in `nodeVisuals.ts`
    (~line 172) claiming that switching `transparent` on a live material forces
    a shader recompile is **FALSE** — 688 materials flipped, `renderer.info.
    programs` 9 → 9, cache keys identical. Correct the comment; moving opaque
    nodes out of the transparent queue is free, but it is a perf change, NOT a
    flicker fix, and must not be sold as one.

12. **Research backlog** (biggest total effort, schedule around the above):
    the candidates-only tier — 722 nodes with no edges (JP/KR/TW round has
    begun, see §3); 170 `_dropped` research leads; BRICS G.4 (Brazil 3/24 and
    China 1/12 never dispatched; open by grepping node descriptions for
    international-node names).

Parked deliberately: 134 cadences where the publisher states nothing
countable; the 7 single-use `proposed:` tags; `diary.csv` relocation.

---

## 6. Architecture crib — where things live

- **`src/App.tsx`** — state owner: filter, drilldown, selection (`selectedId`
  + `selectedEdgeKey`), view settings, lens; the HUD (Hud/ChipBar country
  selector/TierBar/IsolatedShelf/CalendarPanel/SearchPanel); the hover chip,
  the right-hand `Detail` card, the left-hand `EdgeEvidence` card; the
  lighting rig; Canvas + bloom. `describePeriod` lives here.
- **`src/components/InfluenceGraph.tsx`** — the imperative renderer. One
  `forceGraph` memo builds everything (deps: `[graph, spreadApplied]` ONLY —
  keep it that way); every view change flows through refs + mutation effects
  (`lensRef`, `levelColoursRef`, `focusRef`, `hoveredIdRef`, `visibleRef`).
  `runFit`/`measureFit` own camera + node scale; `applyFocus` owns
  dim/opacity/raycast; `useFrame` runs pulses, orb breath, hover ease, halos,
  fog, flight. The screen-space edge picker registers itself up to App.
- **`src/lib/palette.ts`** — colour system: `SCOPE_COLOUR` ladders,
  `FAMILY_INK` (single ink source), `BRICS_INK`, `glowInk` (authority glow
  normalisation), `rimWeightFor`. **`src/lib/modes.ts`** — lenses.
  **`src/lib/view.ts`** — every tuned scene constant, heavily documented.
  **`src/components/linkVisuals.ts`** — edge shader (gradient, fog, focus),
  `edgeShade`, `pulseMaterial`, teardrop geometry cache.
  **`src/components/nodeVisuals.ts`** — node material (fresnel rim machinery,
  hollow treatment), halo sprites. **`src/lib/hierarchy.ts`** — tier
  disclosure, orbs, `DisclosedDependency` (original endpoint ids).
- Data: `src/data/research/*.json` slices auto-load; `slices.generated.ts` is
  generated; `graph.ts` builds + validates (44 checks live in
  `scripts/validate-data.ts` + `test-logic.ts`).

---

## 7. Known traps — the ones that will actually bite

- **Never put a mode, tab, hover, or any view setting in the `forceGraph`
  memo deps.** Every change there resets the camera and re-warms physics.
  Blueprint was the last such dep and it is gone.
- **`meshes.current` cannot be trusted for POSITIONS** — the library rebuilds
  node objects and the map can hold one it never adopted, sitting at (0,0,0).
  Read `positionedById` (the layout data). Colour reads from the mesh are
  fine.
- **Transparency does not stop a raycast** — any ghosted element needs
  `raycast = () => {}` (the focus pass does this for dimmed nodes).
- **The rim-colour uniform exists only after first shader compile**
  (`userData.uRimColour` guard) — a never-rendered mesh keeps its born rim
  until the next recolour pass.
- **`onPointerMissed` can fire more than once per click** — the edge-pick
  path therefore always OPENS, never toggles (a toggle self-cancelled).
- **CSS transitions on the cards can wedge under SOFTWARE rendering** at full
  scene load (start value held indefinitely; transition:none snaps it). GPU
  compositing unaffected. Verify card behaviour with transitions disabled
  when testing headless.
- **Do not reintroduce additive/white pulse cores** — one session, reverted,
  snowstorm at corpus scale. The shade split (edgeShade 0.22 / pulse 0.35,
  normal blending) is the surviving design.
- **Closed unions are cast, not parsed** — an off-union `relationship_type`
  makes edge weight NaN and PageRank spreads it everywhere. Gate imports on
  this first (285 such edges arrived in the raw Grok batch).
- **Grok's JSON is not reliably JSON** — parse-check before reading.
- **Never reintroduce faceted node geometry** while fresnel rims exist
  (hollow nodes still carry them).
- **The IMF DSBB aggregator is useless to a non-JS fetcher**; national NSDP
  mirrors work.
- **The flicker is still undiagnosed, but no longer a blanket excuse** — the
  four tests are run (§5 item 11, `notes/flicker-tests-2026-08-19.md`); three
  mechanisms are measured and quiet, and only bloom shimmer is still open.

---

## 8. The one cross-lane dependency

**Do not finalise the palette until the mint lands.** `palette-proposal.json`
damps each family's chroma by its corpus share, measured at 1,250 nodes; the
staged import moves SA to a major family and adds IL/SG outright. Palette v3
took this debt knowingly — after minting, re-count and re-damp.

---

## 9. How to hand off

1. `mv HANDOFF.md "Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md"`
2. Write a fresh `HANDOFF.md` here — §1 "Read these first" always first.
3. Carry forward what is live; delete what is finished. A handoff that
   accumulates is a handoff nobody reads.
4. Write the project-memory entry if memory works; if not, say so here (it
   was broken all of 2026-08-19).

Only one `HANDOFF.md` at the top level, ever.
