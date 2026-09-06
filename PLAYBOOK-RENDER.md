# PLAYBOOK-RENDER.md — the renderer lane

**Read this with `PLAYBOOK.md`, never instead of it.** The rules that bind
every task whatever it is — git, validate, the generated corpus file, no
deletes, measure before believing — are there, with the test for where a new
paragraph goes. This file is for the visuals, the layout forces, the camera,
the panels and the draw path; everything about evidence, quotes, grading and
schema is in `PLAYBOOK-CORPUS.md`.

**Rule numbers are global** (`PLAYBOOK.md` §1): this file holds 7 and 18, and
the gaps are rules that live in one of the other two.

**Reviewed 2026-09-06** against `PLAYBOOK.md` §1's two tests, the first pass
since the three-way split. Three traps were misfiled here and moved to the
lane that needs them; three facts had gone stale and are corrected in place
with the old wording shown, because a doc that quietly changes its mind is
harder to trust than one that says what it got wrong.

**House habit, restated because it bites hardest here: the code is the design
doc.** Read the dated comment at the constant before changing the number.
Several say "do not raise this" and mean it.

---

## 2. Standing rules — renderer lane

**7. Headless verification is expected**: build + `vite preview` +
Playwright on the preinstalled Chromium with `--use-angle=swiftshader
--enable-unsafe-swiftshader`. Geometry/colour/pixel counts are exact;
bloom/glow is untrustworthy in software rendering; CSS transitions can
wedge under load.

**18. A new slider-driven force needs TWO effects or it's inert the
moment the graph settles** — every d3 force here is alpha-scaled, and
alpha has decayed to ~0 by the time anyone touches a slider post-fit.
Wire both (copy `view.geoAffinity` in `InfluenceGraph.tsx`): a reheat
effect (`d3ReheatSimulation()` on the value changing) and a
300ms-debounced `requestRefit()` on the same dependency, because
reheat moves the cloud and nothing else re-fits. **Shipped broken
three times this way already** (geoAffinity, galaxy,
clusterRepulsion) — each time the force itself was correct and
measured, and each time the slider did nothing until this pattern was
applied. Add both effects in the same commit as the force; verify by
dragging the slider, not by measuring the force in a script.

---

## 3. What the app is now

Assume all of this exists and works; each has a dated comment at the site.

- **Lenses** (`modes.ts`): STANDARD / GROUP_COMPARISON / WORLD_OVERVIEW —
  recolour via ref + mutation effect, never a `forceGraph` memo dep.
  GROUPS/WORLD are disabled at tier 1.
- **Constellation look**: near-black bg, flat panels. The whole bottom edge
  is one dock (`bottomDock`, App.tsx): tier bar left, Compare + GroupsPanel
  + Legend centre, Unlinked pill right, empty fourth track reserving the
  View panel's column. No bottom panel carries fixed coordinates. Top row
  (search bar, calendar tab) is still hand-anchored.
- **Reports/View panels** stop their scroll above the tier bar
  (`REPORTS_PANEL_BOTTOM_CLEARANCE` / `VIEW_PANEL_BOTTOM_CLEARANCE`).
- **Hover** = identity chip; **click** = Detail card from the right (host
  link); **edge click** = evidence card from the left (endpoints, type,
  period, verbatim basis, evidence_url). Camera refits unconditionally on
  every filter change (deliberate).
- **Edges/pulses have SET SIZES** (`baseLinkWidth()` = 1); weight lives in
  rest length + opacity. Never reintroduce additive/white pulse cores or
  faceted node geometry (fresnel rims). **Continuous-database nodes/edges**
  (the `Report.continuous` set) draw with a soft boundary-fading sphere
  (alpha only, no colour) and an animated beam flow instead of teardrop
  particles.
- **No distance fog/haze** — removed outright (too hard on the eyes): no
  `ViewSettings.fog`, no slider, no `scene.fog`. `showHorizon` (sky
  gradient) is untouched.
- **No glow/bloom** — removed (was masking, not fixing, dark-node issues).
  Don't reintroduce it to "fix" a dark node — that loop produced the
  inverted authority encoding in the first place.
- **No force-centre** — `forceCenter` strength is 0; it's a runaway
  translation, not inter-cluster separation. Use `charge`'s
  strength/distanceMax, or `clusterRepulsion`, instead.
- **Rims are off in the dark scene** — a rim is a silhouette tool, valid
  only where the interior is empty; hollow one-off instruments keep
  theirs, nothing else does. Blueprint mode (the other empty-interior
  case) was deleted.
- **Link springs are damped on cross-cluster hubs** (`LinkDatum.stiffness`)
  — d3's default `1/min(deg)` makes a leaf-to-hub spring maximally stiff,
  nailing every country touching `sna-2008`/`esa-2010` to the middle.
  Damping is gated on how many DIFFERENT countries the busier end touches,
  so a country's own internal spine is left alone. Don't re-gate this on
  degree.
- **Menu bar**: Panels ▾ (fresh sessions default all 8 ON-and-minimized),
  Views ▾ (saved views, ★ open-on-load, deep links via `?rig=`), Help ▾
  (renders START-HERE.md raw). Tier bar + status line are deliberately NOT
  in the menu.
- **Disclosure folds TWICE** (`hierarchy.ts`): tier ladder → family orbs
  (`orb:`) → per-country orbs (`corb:`) until a country is double-clicked
  open. Orb `country` is the MODAL member (display-grade) — membership
  checks always read `.members`. No UI to re-fold one country short of
  Reset (known gap).
- **Galaxy clustering** (`galaxyForce.ts`, `view.galaxy`) pulls nodes
  toward their own family/country centroid — read its file comment and
  `geoAffinity.ts`'s before touching either, similar-looking but different
  questions. Provinces aren't a third level (most `region` values are free
  prose).
- **Isolate** (`view.isolateFocus`) hides everything off the traced chain,
  built on the unfiltered index so cross-border edges survive. **Groups
  panel** isolates continents/blocs/publishers/countries the same way via
  multi-seed `computeGroupFocus`; neighbourhood slider bounds the walk by
  hops. Search runs over the full corpus and tags results "outside
  filter"/"outside isolate."
- **Unlinked shelf** = a one-line summary pill → searchable list inside
  the Reports panel.
- **Escape** clears one level, topmost first (edge card → selection →
  group isolate); panels consume their own Escape. "/" ignored while any
  input has focus.
- **PNG export**: 2× DPR, no HUD, re-entry-guarded, 8192px capture clamp.
  Zoom baseline freezes while the user owns the camera (`frozenBase`).
- **Loading curtain**: opaque until settled+fitted; 25s safety timeout is
  load-bearing; a corpus-fetch failure pins it with an error instead of an
  empty scene.
- **The three mirror instancers are the only draw path** (`photon`,
  `link`, `nodeInstancing.ts`); the library's own meshes are state and
  picking only. Landed 2026-09-05, headless 7,371 → ~85 draw calls.
- **INT is condensed and tier 1 honours the toggle**, so the DEFAULT opening
  frame is folded; orbs scale with member count (`orbSizeFactor`); every lens
  is live at every tier (the `tier` prop was deleted, not left unused).
- **Physics levers shipped 2026-09-05/06**: collide `iterations` 1, charge
  `theta` 1.5 (together 123.9 → 65.9 ms/tick), a geoAffinity position cache,
  and `TICK_BURST_MAX` 4 / 8 ms. `THETA=0.9` restores the old layout.
  **Node instancing and the tick burst are still unmeasured on Thomas's
  hardware** — that is a `HANDOFF.md` item, not a fact about the app.
- **`mutual: true` edges are excluded from `rankedEdges`** — still drawn, but
  not feeding PageRank, so they do not inflate node size.
- **Sliders**: cluster spread 50%–1200%, geo-affinity 0–500%, zoom 0.25–2.6
  of fit. The bounds live in `ViewControls.tsx` and `view.ts` and have moved
  three times — read them there, never from here. *(This line said
  200%–10000% until 2026-09-06; both bounds were wrong.)*


---

## 4. Architecture crib — where things live

- **`src/App.tsx`** — state owner (filter, drilldown, selection + group
  selection, view, lens, panels, saved views, curtain latch), the HUD, both
  cards, lighting, Canvas + bloom, the bottom dock. `STARTUP_VIEW`/`DEEP_LINK`
  read at module scope — cannot be hooks.
- **`src/components/InfluenceGraph.tsx`** — imperative renderer. One
  `forceGraph` memo, deps `[graph, spreadApplied]` ONLY. Everything else
  flows through refs + mutation effects. `runFit`/`measureFit` own camera +
  node scale; `applyFocus` owns dim/raycast; `useFrame` runs pulses, orb
  breath, flow animation, fog, flight, `onReady`.
- **`src/lib/`** — `palette.ts` (colour, `COUNTRY_FAMILY`/`COUNTRY_LABEL`),
  `modes.ts` (lenses), `view.ts` (tuned constants), `savedViews.ts`,
  `deepLink.ts`, `uiTheme.ts` (`HUD_TOP` etc.), `hierarchy.ts` (orbs/folds),
  `regions.ts` (continents/blocs/publishers/directory), `selection.ts`
  (`computeFocus`/`computeGroupFocus`/`computeNeighbourhoodFocus`,
  `shortestPath`), `graph.ts` (build + validate), `galaxyForce.ts`,
  `geoAffinity.ts`, `schedule.ts` (calendar), `search.ts`, `types.ts`.
- **`src/components/`** — `linkVisuals.ts` (edge shader/beam),
  `nodeVisuals.ts` (materials/rims), `MenuBar`, `HelpCard`, `LoadingCurtain`,
  `PanelShell`, `GroupsPanel`, `Legend`, `Compare`, `PngExport`,
  `SearchPanel`, `CalendarPanel`, `ViewControls`, `CameraZoom`.
- **Data**: `src/data/research/*.json` → `scripts/gen-slices.ts` →
  `public/corpus-data.json` (generated). Browser loads it via
  `browserCorpus.ts`; Node scripts via `src/data/index.ts` (never import
  from browser code); both share `assembleCorpus.ts`. Validation:
  `scripts/validate-data.ts` + `scripts/test-logic.ts` (live counts in
  `HANDOFF.md` §2). The collision and `part_of` rules that bind a data change
  are `PLAYBOOK-CORPUS.md` rules 10-12 — not "above", which is what this line
  said until 2026-09-06, a dangling reference left by the three-way split.

---

## 6. Known traps — renderer invariants

**Same admission bar as `PLAYBOOK-CORPUS.md` §6: a bullet belongs here only
if an agent who never reads it will make a WRONG DECISION.** A measurement
recipe goes to `notes/techniques-2026-09-04.md`; an unapplied finding stays
in `HANDOFF.md` until Thomas rules on it.

- **Never put a mode, tab, hover or view setting in the `forceGraph` memo
  deps** — every change there resets the camera and re-warms physics.
- **`meshes.current` cannot be trusted for POSITIONS** — read `positionedById`
  or `graphData().nodes`.
- **Transparency does not stop a raycast** — ghosted elements need
  `raycast = () => {}`. `onPointerMissed` can fire twice per click; the
  edge-pick path always OPENS, never toggles.
- **A cap that silently binds costs twice** (node size AND edge width) —
  whenever a slider ceiling moves, recompute `nodeScaleFor`'s cap.
- **The fit percentile is NOT fixed and this bullet used to say it was.**
  `fitPercentileFor(spread)` runs 0.80 (spread ≤ 1) down to a 0.40 floor at
  the slider's ceiling, −0.11 per doubling — so raising spread reframes the
  shot as well as moving the nodes. 5.675× is the ratio that WOULD put the
  camera inside the cloud; measured ratios stay comfortably under it. Read
  `fitPercentileFor` and the cost table at the `CORE_PERCENTILE` use site in
  `measureFit` before reasoning about framing. *(Corrected 2026-09-06: the
  percentile changed that morning and this file still said p95.)*
- **`PanelShell` supports one panel per edge; the bottom edge belongs to the
  dock.** A new bottom panel is a one-line dock-cell addition. Reserve dock
  space with an empty grid TRACK, never an item margin.
- **Menus close on `pointerdown`, not `click`**; synthetic drags do NOT reach
  OrbitControls (use `autoRotate` in harnesses); CSS transitions wedge under
  software rendering.
- **Any frame or draw-call number is wrong until measured the documented way** —
  see techniques §6. The two that have burned rounds: `renderer.info.render`
  reads `calls 1, triangles 1` from outside the render loop, and waiting two
  rAFs counts two frames.
- **`onBeforeCompile` never fires for a mesh that is hidden before its first
  render** (2026-09-05, node instancing). Every sphere is now `visible = false`
  from frame one, so anything a material used to create inside
  `onBeforeCompile` (the rim uniforms) does not exist — resolve it at
  construction and put it in `userData`, which is where the instancers read
  from. The three mirror instancers (`photon`/`link`/`nodeInstancing.ts`)
  are the only draw path; the library's meshes are state + picking only.

---

## 7. Standing decisions — do not re-raise

**Same bar as `PLAYBOOK-CORPUS.md` §7: a rule that will change how a FUTURE
round decides something, not a record of one change's fate.** The corpus
lane's ledger is much the longer of the two.

Geo-exploration: dropped entirely. Right-drag panning + low-end zoom:
confirmed solid. Arrow-key fly navigation: offered, declined.
