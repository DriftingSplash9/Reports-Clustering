# PLAYBOOK.md — standing rules, traps, architecture

**Reference material, not state.** How the repo works and what bites
people. Edit only for a genuinely new SYSTEMIC rule — something that will
recur across many countries/rounds or corrupt the corpus if missed. A
one-off single-site quirk goes in that round's own notes file, not here.
Current corpus numbers and the live todo list belong in `HANDOFF.md`.

---

## 1. Read these, routed by task

| Always | `REPORTS.md` from "🛑 Agent: read this" onward, then `HANDOFF.md`, then this file. |
|---|---|
| Orientation | `START-HERE.md` — rendered verbatim in-app as Help ▸ What this is. Editing it edits the product. |
| Visual/layout work | §3/§4 below, then `notes/visual-revamp-2026-08-18/visual-revamp-review.md` |
| Camera/fit/layout | `notes/camera-fit-measurement-2026-08-19.md` |
| Flicker | `notes/flicker-tests-2026-08-19.md` |
| "Why is country X empty" | `notes/cross-border-gaps-2026-08-20.md` |
| Cross-border research thread | `notes/crossborder-verification-2026-08-22.md` |
| Any Grok prompt | `notes/grok-diary.md` FIRST (§5 below) |
| Regions/blocs/publishers | `src/lib/regions.ts` file comment |
| Compare/path | `Compare.tsx` file comment |
| Schema | `src/lib/types.ts` |

**House habit: the code is the design doc.** `palette.ts`, `nodeVisuals.ts`,
`linkVisuals.ts`, `view.ts`, `modes.ts`, `savedViews.ts`, `hierarchy.ts`,
`InfluenceGraph.tsx` carry dated comments explaining every constant. Read
the comment before changing the number — several say "do not raise this"
and mean it.

---

## 2. Standing rules

1. **Never run git from an agent session — not even read-only.** Never
   state git status in any doc; ask Thomas or read a screenshot, and
   delete any git-status claim you find.
2. **No document, no edge.** If nothing published says the dependency
   exists, it doesn't go in the graph.
3. **A pointer is not a source.** WebFetch can fabricate content for a
   dead URL — raw-verify before trusting any quote. Applies to Grok output
   too, including node descriptions: a description naming a standard is a
   lead to verify, not a citable basis.
4. **`npm run validate` before and after any data change** (120+ checks);
   it can't run through the device bridge. Recipe: stage `src/ scripts/
   package.json tsconfig.json index.html vite.config.ts START-HERE.md`
   (full `src/data/research/` corpus included) into a Linux sandbox,
   `npm install`, `npm run gen`, then tsc/validate/build. Fastest way to
   move 270+ research JSONs across the bridge: zip `src/data/research/`
   on-device into `_to_delete/`, stage that one file, unzip in the
   sandbox. Reuse a live sandbox with `node_modules` already installed
   across rounds in the same session. Any `tsx`/`vite`-driven script fails
   via `device_bash` (Windows `node_modules` vs. the bridge's Linux shell
   needing `@esbuild/linux-x64`) — same recipe fixes it. Plain
   `tsc --noEmit` is unaffected and runs fine directly via `device_bash`.
5. **`public/corpus-data.json` is generated** (`npm run gen` /
   `scripts/gen-slices.ts`) — never hand-edit it. Fresh sandbox → run
   `npm run gen` first.
6. **Agents cannot delete device files** — `mv` into `_to_delete/`, log it
   in `_to_delete/README.md`. Emptying it is Thomas's job.
7. **Headless verification is expected**: build + `vite preview` +
   Playwright on the preinstalled Chromium with `--use-angle=swiftshader
   --enable-unsafe-swiftshader`. Geometry/colour/pixel counts are exact;
   bloom/glow is untrustworthy in software rendering; CSS transitions can
   wedge under load.
8. **Measure before believing.** A number nobody ran anything to get is a
   guess. For the layout forces the instrument is committed:
   `npx tsx scripts/measure-forces.ts` (sandbox, ~1.5 min per run; `SPREAD=`,
   `SEEDS=`, `CRS=` env vars). Every earlier force calibration used a
   throwaway script that was deleted, and one of them (the 2026-08-28
   cluster-repulsion sweep) turned out not to reproduce — read `onscreen`,
   run more than one seed, never let simulation state leak between runs.
9. **Any prompt relayed to a third party (Grok etc.) needs its
   attachment/action list told to Thomas separately, in plain chat text**
   — he skims or skips the prompt block itself.
10. **A `_dropped` entry describing an edge that DOES exist live must use
    `reason: "caveat"` (or `"resolved"`), never any other reason** —
    applies to every `DroppedReason`. Before finalizing any `_dropped`
    entry, check its exact (source, target) against the WHOLE corpus's
    live edges, not just this round's proposals.
11. **Build the id-collision and edge-collision checks from the whole
    corpus, not just `src/data/research/*.json`** — some ids/edges live
    only in the hand-written seed files (`src/data/reports.ts`,
    `src/data/dependencies.ts`).
12. **A dependency edge between a node and its `part_of` container is a
    validator ERROR.** Before minting, cross-check every new edge's
    (source, target) against the corpus-wide `part_of` map in both
    directions; drop matches as a `note`.
13. **A fresh, well-verified finding that contradicts an already-live edge
    isn't automatically right.** Caveat the existing edge, defer the new
    claim — don't silently override.
14. **Rule 10's mirror image is the one that bites: also check this
    round's new EDGES against every OTHER slice's existing `_dropped`
    notes.** Minting an edge some earlier round recorded as `no-document`
    makes that note a lie, and validate fails on it. Read the older note
    before assuming your new edge wins — it may have the better evidence.
15. **A page title is not evidence.** Read the body, not just the
    title/heading.
16. **Eurostat's national reference metadata is the highest-yield source
    for "which standard / which source" questions on an EU/EEA country.**
    Filename is versioned per country: `prc_hicp_esmshi4_<cc>.htm` for
    PL/EL/ES/HU/HR/BG/LT, `prc_hicp_esmshi3_<cc>.htm` for
    SK/SI/EE/LV/MT/CY/IS, 404 for FI (try hi4, fall back to hi3; Greece is
    `_el` not `_gr`). `employ_simslfs_<cc>.htm` answers "is LFS the
    national-accounts employment source" as an explicit Y/N field (no such
    page for Iceland). No government-finance equivalent exists
    (`gov_10dd_*_esms_<cc>.htm` 404s everywhere tried) — for deficit/debt
    go to the NSI's own EDP release page instead.
17. **ASEANstats (`cdn.aseanstats.org/public/...`) is the reliable
    workaround for an unreachable ASEAN NSO** — supplied Myanmar's BPM6
    basis and Thailand's SNA 2008 basis when their own domains were dead.
    **ilo.org itself** hosts labour-force-survey reports stating ICLS
    compliance when an NSO's own pages are blocked (supplied Iraq's and
    Vietnam's ICLS edges). The old ILO microdata catalogue
    (`webapps.ilo.org/surveyLib`) is retired.
18. **A new slider-driven force needs TWO effects or it's inert the
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

**Process rule.** `HANDOFF.md` stays short — edit its Current State/Todo
directly (overwrite, don't append) each turn; copy to
`archive/Previous Handoffs/` only before a structural rewrite. **A wholesale
rewrite of the file counts as structural even when the section headings are
unchanged** — the test is whether the prose you are replacing would be
unrecoverable afterwards, not whether §1-§4 still exist. There is no git
safety net here (rule 1), so an un-archived overwrite destroys the previous
state permanently. Missed on 2026-08-29/30: HANDOFF.md was overwritten three
times in one session and archived only retrospectively, from a copy that
happened to still be in the session's context. Archive first, then rewrite. A new
standing rule or trap goes here, not `HANDOFF.md`. Hand off rather than
push on when you re-derive something already settled, contradict an
earlier answer, retry a tool past its documented once-only policy, or the
session has been through a compaction. Project memory: write entries as
you go; if it refuses, park a note in `notes/` and flag it in
`HANDOFF.md`.

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
  (`Report.continuous`, 35 nodes) draw with a soft boundary-fading sphere
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
- **Sliders**: cluster spread 200%–10000% (opens 200%), geo-affinity
  0–500% (opens 150%), zoom 0.25–2.6 of fit.

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
  `scripts/validate-data.ts` + `scripts/test-logic.ts` (120+ checks).
  id-collision and edge-collision checks must include `src/data/reports.ts`
  and `src/data/dependencies.ts`, and edges must also be checked against the
  `part_of` containment map (rules 10-12 above).

---

## 5. Grok pipeline — diary and prompt queue

**Before writing ANY prompt for Grok, read `notes/grok-diary.md`** — the
standing playbook of what works and Grok's dated failure modes. Append a
dated lesson to the diary after processing every Grok reply.

Prompts live beside the diary as `notes/grok-prompt-*.md`; the diary's
"Round log" section is the queue state. Larger batches get their own dated
folder under `notes/` with a `00-README.md` index (e.g.
`notes/grok-research-queue-2026-08-22/`).

---

## 6. Known traps

Systemic bugs and gotchas — things that will bite again on a DIFFERENT
country/file/round, not a single site's own one-off quirk.

- **`RelationshipType` is a closed 4-value union** (`calculated_from` /
  `uses_data_from` / `methodology_depends_on` / `cites`). An off-union value
  → NaN edge weight → NaN PageRank corpus-wide, silent and total. `Relation`
  is only `audits`/`supersedes`. Grok output routinely invents types — map
  them, never pass them through. Same for `Domain` and every closed union:
  cast, not parsed — check `types.ts` before inventing a value.
- **`jurisdiction_level` has no "national" value.** The closed union is
  `international, supranational, federal, provincial, municipal,
  institutional` — a unitary country's own national-level publisher is
  `"federal"` despite the name. Writing `"national"` by hand for a new
  node passes JSON parsing and only fails at `npm run validate`. Hit 4/4
  times on the first pass of the 2026-08-30 South America round.
- **`PanelShell` supports one panel per edge; the bottom edge belongs to the
  dock.** A new bottom panel is a one-line dock-cell addition, not a
  coordinate hunt. Reserve dock space with an empty grid TRACK, never an
  item margin.
- **Never put a mode, tab, hover, or view setting in the `forceGraph` memo
  deps** — every change there resets the camera and re-warms physics.
- **A cap that silently binds costs twice** (node size AND edge width) —
  whenever a slider ceiling moves, recompute `nodeScaleFor`'s cap.
- **Camera can't end up inside the cluster by raising spread** (fit = 5.675
  × p95; measured ratios ≤ ~2). Spread saturates past ~1000%.
- **`meshes.current` cannot be trusted for POSITIONS** — read
  `positionedById` or `graphData().nodes`.
- **Transparency does not stop a raycast** — ghosted elements need
  `raycast = () => {}`. `onPointerMissed` can fire twice per click — the
  edge-pick path always OPENS, never toggles.
- **Menus close on `pointerdown`, not `click`**; synthetic drags do NOT
  reach OrbitControls (use `autoRotate` in harnesses); CSS transitions
  wedge under software rendering (curtain unmounts on a timer for this
  reason).
- **Grok's JSON is not reliably JSON** — parse-check first. Its ids and
  enum values are inventions until grepped against the FULL corpus
  (research files AND seed files). Never hand-edit JSON insertions —
  generate them. Its `files_received` confirmations are not reliable
  either. Its imported node DESCRIPTIONS are also not a citable basis by
  themselves — a description naming a standard is a lead, not a quote;
  always raw-verify against a live primary source before minting off it. A
  single region's own verification pass can't see cross-region problems —
  duplicate/contradictory edges from a different slice only show up on a
  corpus-wide second pass. Grok can run the same region under multiple
  prompt names across sessions, producing overlapping or conflicting
  proposals — dedupe and diff for conflicts BEFORE verifying, not after.
- **The IMF DSBB tables are JS-walled at the page level** (use a real
  browser, not WebFetch; its PDF observance reports parse fine headless).
  Workaround: DSBB's Angular SPA calls a plain JSON API at
  `dsbb.imf.org/api/report/getBaseSummaryofMethodologies?countryCode=X&categoryCode=Y`
  — hitting that directly returns the real narrative text.
- **imf.org is walled the OTHER way round from what this entry used to say**
  (re-measured 2026-09-03, round 3d). Its `/-/media/files/...` **PDFs read
  cleanly with plain curl** from an ordinary network — all 11 the corpus cites
  did; it is the `/en/News/Articles/...` **press releases** that Akamai denies,
  from every route tried. The old Google-viewer fix is **not scriptable**:
  `docs.google.com/viewer?url=...&embedded=true` returns a 4.6 KB JavaScript
  shell to curl, so it needs a real browser or nothing.
  Use `find` (natural-language search), not `get_page_text`, to check
  whether a phrase exists in a long lazy-loaded document — `get_page_text`
  truncates at a byte cap.
- **Some government portal landing pages are JS-rendered and return
  nothing useful to WebFetch** — search for the underlying document/
  sub-page instead of the portal shell. **`.docx` evidence URLs aren't
  renderable by WebFetch at all** — download and extract
  `word/document.xml` directly.
- **A WAF/Incapsula/Cloudflare block can look identical to real content at
  a glance** (HTTP 200 with a JS-challenge shell) — confirm via `file` on
  the downloaded body, not just the status code, and cross-check with an
  independent source before trusting a quote.
- **ibge.gov.br** (Brazil — active BRICS work) sits behind a Cloudflare JS
  challenge that silently 403s WebFetch — use a real browser session, or
  fetch documents directly from `ftp.ibge.gov.br` (still wide open 2026-09-03,
  as is the `servicodados.ibge.gov.br` JSON API). **`biblioteca.` and `concla.`
  are Cloudflare-challenged themselves now** — that half of this entry is dead.
  And the ftp route only helps for DOCUMENTS: every ibge.gov.br URL the corpus
  cites is an `/estatisticas/...` landing page with no file behind it, so for
  those the answer is an archived snapshot or a browser.
- **`mnr.gov.cn`** (China — active BRICS work) is entirely unreachable from
  the sandbox (DNS/proxy failure, both WebFetch and curl) — worked around
  via mirrors (creva.org.cn, MOFCOM's fdi.mofcom.gov.cn) and gov.cn's own
  announcements.
- **`mhlw.go.jp` and `mofa.go.jp`** (Japan) are comprehensively bot-walled
  from this environment — even their own homepages return 403/404 to curl
  with a browser UA (MOFA's is an explicit Akamai "Access Denied" edge
  page, unambiguous). WebFetch reads real, current content behind both.
  Prefer `e-stat.go.jp` (Japan's official statistics portal, curl-clean)
  as an alternative primary source when one exists for the same series —
  keeps the citation independently re-verifiable without relying on
  WebFetch every time.
- **archive.org/Wayback playback can be genuinely flaky, not just slow** —
  one snapshot 503'd or timed out on ~half of 8 repeat attempts over
  several minutes, despite being the exact right content when it did load.
  Don't cite a flaky Wayback URL as a source even when it's the best
  content match — prefer a reliably-live secondary source, and log the
  Wayback URL as a note for later if the primary text matters enough.
- **Grok will reuse one jurisdiction's exact quote/URL as "evidence" for a
  different jurisdiction's claim** when the document shapes are similar.
  The tell for illegitimate reuse is the quote naming a specific *other*
  place.
- **Batching a corpus-wide script by SLICE FILE re-selects work an earlier
  batch already did** — and re-doing it is not neutral. `grade-evidence.ts
  --slice <f>` takes every edge in the file, including ones a previous batch
  graded and wrote; a host that is merely down today then rewrites yesterday's
  `A` as a `C`, and nothing in the output distinguishes a real regression from
  a flaky fetch. Hence `--skip-graded`. Any future by-file batch runner needs
  the same guard: **select on the work, not on the container.**
- **An `--offline` re-run of the grader is stricter than the online pass, not
  identical to it** — by design, but it means the two disagree. A URL whose
  fetch FAILED leaves no document in the scratch store, so the offline pass
  grades it on the recorded failure rather than on the body the online pass
  happened to get. Five edges moved on the 2026-09-03 batch-2 round, all on
  the B/C line, all intermittent hosts. **The corpus carries the offline
  grades** (writing the stricter of two readings is the point); the per-edge
  JSON in `Claude outputs/` carries the online ones. Don't diff them and call
  it a bug.
- **`du -sh` overstates `evidence-cache/` by ~9×** — it reported 6.8 MB for
  773 KB of actual bytes across 1,670 files, all of it 4 KB block rounding on
  a directory of very small gzips. Measure it with
  `find evidence-cache -type f -printf "%s\n" | awk '{s+=$1}END{print s}'`.
  The same trap applies to any check on whether a many-small-files directory
  is safe to commit.
- **`zip` writing directly into a mounted device folder can fail**
  (temp-file-then-atomic-rename doesn't survive the mount) — either `zip`
  to a path under `$HOME` (outside `mnt/`) and `cp` the finished zip in,
  or stream it: `zip -qr - <paths> > tmp_work/<new-name>.zip` works
  in-place. The mount also can't overwrite a same-named file — give each
  re-run's zip a fresh name, `mv` the stale one to `_to_delete/`. **Coming back
  the other way, `unzip -o` into the repo fails the moment it has to replace
  an existing file** ("cannot delete old ...: Operation not permitted" — rule
  6 again): unzip to a scratch dir under `$HOME`, outside `mnt/`, and `cp` the
  files over, which truncates in place and is allowed. **And the staging zip
  carries no dotfiles** — `.gitignore` is not in the recipe above, so a
  sandbox `>>` to one writes a NEW file that then overwrites the real one on
  the way back. Stage a dotfile explicitly before editing it, or edit it on
  the device. Zip only
  `src/ public/ scripts/ package.json package-lock.json tsconfig.json
  index.html START-HERE.md` (+ the .md docs if editing them) — including
  `archive/`, `node_modules/` or `.git` times the call out at 408MB; the
  useful set is ~5MB and `npm install` in the sandbox is fast.
- **Wayback Machine proxies several network-blocked `.gov` domains**
  (`.gov.in`, `.gov.br` — blocked from the sandbox, the bridge VM *and*
  Thomas's own Chrome, so genuinely blocked, not a sandbox artefact):
  `archive.org/wayback/available?url=...`, and for no exact-URL snapshot,
  CDX search `web.archive.org/cdx/search/cdx?url=<domain>*&filter=urlkey:.*\.pdf`.
  Resolved Assam's handbook 2026-08-30. Rate-limited — space out queries.
  Try it before writing any blocked domain off.
- **`device_stage_files` can fail with `session_stale_relogin`** mid-
  session, with no warning beforehand. Fix requires Thomas to re-sign-in
  in the desktop app. Workaround when it strikes right after an edit you
  need to verify: `sha256sum` the device file against the already-
  verified sandbox copy — a hash match is sufficient proof only when the
  agent wrote BOTH copies itself (not a substitute for staging when you
  need genuinely fresh device-side content, e.g. a file Thomas edited
  locally).
- **A "ROBOTS_DISALLOWED" / "robots-blocked" verdict is a statement about
  the FETCH TOOL, not about the site.** WebFetch obeys robots.txt; plain
  `curl` with a browser UA does not, and neither does a real browser.
  Round 6 wrote off Taiwan's entire MND cluster as "robots.txt-blocked on
  every path/subdomain tried, no Wayback snapshot exists" — `mnd.gov.tw`
  was in fact wide open to curl the whole time, including every
  `File/<id>` PDF download. **Before recording `unreadable-source` or a
  robots block, retry with `curl -sL -A "<browser UA>"`.** The same
  applies to a bot-UA 403. Treat every historical "robots" note in the
  corpus as untested.
- **A Cloudflare/WAF 403 on a DOCUMENT is beatable from inside the page
  when the site itself loads in a real browser.** `fetch()` the PDF
  same-origin in the page context (it inherits the browser's cookies and
  TLS fingerprint), stash the ArrayBuffer on `window`, inject `pdf.js`
  from cdnjs, and extract the text there. This read PIF's 80-page annual
  report, which 403s to curl on every route, and gives page-indexed text
  you can grep in-page. No download to disk, no device round-trip.
- **A walled site often has an unwalled sibling host for its files.**
  Every `*.bps.go.id` page (Indonesia) is Cloudflare-403 to curl, but
  `web-api.bps.go.id` — the host BPS's own download buttons point at — is
  not: open the page in a browser, read the signed
  `download.php?f=<token>` href out of the DOM, then curl that. Same
  shape at `gob.mx` (Mexico), which Akamai-challenges its HTML pages but
  serves `/cms/uploads/attachment/file/...` PDFs to plain curl — worth
  re-testing every historical "gob.mx 403". And when a national host is
  unreachable, try its PROVINCIAL subdomains: `gso.gov.vn`/`nso.gov.vn`
  (Vietnam) die at the TLS handshake from every route, but
  `thongkecaobang.gso.gov.vn` serves 200 and republishes head-office
  content. Always cite the stable page, never the signed/expiring link.
- **WebFetch cannot produce evidence-grade verbatim** — it caps quotes at
  ~125 characters and refuses full reproduction. Where it is the ONLY
  route to a document (e.g. `psa.gov.ph` is Cloudflare-JS-walled on every
  host and path, from cloud and device alike), it can establish a
  negative or locate text, but a mintable quote needs a real browser
  session or a non-PSA host carrying the same document — a PSA deck
  hosted at `unsiap.or.jp` is how the 2025-SNA question got settled.
- **"The sandbox can't read it" and "the site is walled" are different
  claims, and this repo has been conflating them.** The cloud sandbox routes
  every request through an MITM egress proxy (`127.0.0.1:45017`, its own CA), so
  what a site fingerprints and rate-limits is the PROXY, not curl. Measured
  2026-09-03 over the same 300 URLs from both environments: the **bridge VM on
  Thomas's machine read 18 URLs / 20 edges the sandbox could not**, imf.org's
  PDFs among them, and **`web.archive.org` is blocked outright from the sandbox**
  ("Blocked by egress policy" over http, connection reset over https) while
  plain `archive.org` is allowed. Two workarounds that do NOT survive the proxy,
  so don't retry them: `curl_cffi` with Chrome TLS impersonation is reset on
  every host, and **headless Chromium cannot connect through it at all**, with
  or without `--proxy-server` and `--ignore-certificate-errors`. **There is no
  browser in the cloud sandbox** — a "browser pass" means Claude-in-Chrome or
  the bridge VM. Before recording a host as walled, say which network you were
  on.
- **The whole toolchain runs natively in the bridge VM, and that is usually the
  better place to run it than a staged cloud sandbox** (2026-09-03). Rule 4's
  problem is the repo's WINDOWS `node_modules`, not the bridge shell: copy the
  repo (minus `node_modules/`, `.git/`, `archive/`) to a scratch dir under
  `$HOME` **outside `mnt/`**, `npm install` there (the VM has node 22, npm,
  `pdftotext` and `unzip`), and `npm run validate`, `tsc --noEmit`, `npx tsx`
  and the grader all work. Then **symlink `src/data/research/` and
  `evidence-cache/` from the scratch copy back into the real repo** so `--write`
  lands in the corpus with no copy-back and no sha dance. No zip, none of §6's
  zip traps, and the VM's network is a home connection rather than the proxy.
  **Do NOT symlink `scripts/` as well**: the script resolves its own ROOT
  through `realpath`, so a symlinked script puts `.evidence-fulltext/` inside
  the mounted repo, where rule 6 then forbids deleting it. Copy `scripts/` and
  copy it back.
- **A long run cannot be backgrounded through the bridge.** `nohup setsid … &`
  survives the call that launched it by about two minutes and is then killed
  with the call's sandbox; the log simply stops. Anything over ~170 s has to be
  made RESUMABLE and run as repeated foreground calls — for the grader that is
  free, because `.evidence-fulltext/` makes an already-fetched URL instant, so
  the same command re-run just advances until one call finishes inside the
  window.
- **A FAILED fetch is cached exactly like a successful one.** So the obvious way
  to re-grade an edge after teaching the fetcher a new route — run it again — is
  a cache hit on the old failure and a silent no-op that looks like "the new
  route didn't help". Any change to how `getDoc` reads a document has to be
  paired with `--refetch` or an emptied `.evidence-fulltext/`.
- **`curl -w` output must be split off the body on a real newline, and getting
  it wrong is silent and total.** Written 2026-09-03 as `'\\n%{http_code}'` in a
  TypeScript string literal, the separator became the two characters `\` and
  `n`; `lastIndexOf` returned -1, the status parsed as `NaN`, `NaN` matched
  neither the retry branch nor the failure branch, so **every lookup was treated
  as a conclusive answer, every body failed to parse, and an entire fetch
  strategy cached "nothing found" for every URL it was asked about — while
  reporting nothing at all.** A rescue pass that rescues nothing is
  indistinguishable from a host that cannot be rescued. Split it in an exported
  pure helper with a selftest (`splitCurlWrite`), never inline.
- **archive.org's availability API 429s within a minute of a corpus-scale pass**
  and a 429 body is indistinguishable from "no snapshot exists" unless you check
  the status. Gate every availability lookup through one global throttle
  (~1.2 s) regardless of pool width, retry a 429 with backoff, **cache the
  ANSWER on disk including the negative ones**, and never cache an inconclusive
  result — a run that ran out of budget must not bake "no snapshot" into the
  store for every URL it never got to ask about. The snapshot DOWNLOAD from
  `web.archive.org` is a separate service and tolerates 4 concurrent readers
  fine. Fetch snapshots with the `id_` suffix
  (`web/<ts>id_/<url>`) or the archive's own toolbar becomes text you are
  matching quotes against.
- **An archived snapshot may rescue a WALL; it must never rescue a 404.** A
  wall, a transport failure or a JavaScript shell say nothing about whether a
  citation is still valid — only that this machine could not read it. A 404 says
  the citation has rotted, and that is exactly what the dead-URL debt list
  measures, so grading it off an archived copy hides link rot behind a good
  grade. Whatever reads a document by a second route must also record WHICH
  route in the committed evidence record (`via:` in the cache header) — an A
  read from a 2026-03-10 snapshot is a different claim from an A read from the
  live page, and a reader has to be able to tell.
- **A `report_id`/`candidate_target`-shaped `_dropped` entry (the
  duplicate-node-flag family) has no `source`/`target` fields at all** —
  rule 10 above only applies to `edge`-shaped entries. Tagging the former
  `"resolved"` makes `validate-data.ts` read `source`/`target` as
  `undefined`, which fails as a dangling reference ("undefined ->
  undefined"). These entries stay `reason: "note"` permanently, resolved
  or not — prepend "RESOLVED ..." to the existing `note` field instead
  (see e.g. eurosystem-ecb.json).

---

## 7. Standing decisions — do not re-raise

**Bar for adding to this section: a rule that will change how a FUTURE
round decides something, not a record of one specific edge's fate — the
data's own `_dropped`/live entry is that record.** A one-off single-
node/single-edge call belongs there, not here as its own paragraph.

Geo-exploration: dropped entirely. Right-drag panning + low-end zoom:
confirmed solid. Arrow-key fly navigation: offered, declined. Parked: 134
uncountable cadences; 7 single-use `proposed:` tags; `diary.csv` is Thomas's
personal file — leave it alone.

**Treaty and agreement nodes: retired, do not re-import** (Thomas,
2026-08-29). 72 nodes removed — bilateral/plurilateral trade agreements,
investment-treaty and bloc-membership framings, multilateral conventions.
Full record and examples: `notes/retired-nodes-2026-08-29.json`. **The
reason is structural, not evidential**: a treaty isn't a publication with
a methodology dependency, no research round could ever wire one — they
were 7% of the corpus and 11% of its isolated nodes, all orphans, no edge
broken. **Closed 2026-08-31 (Thomas, ruling 2-A after the audit's D4):
that sweep removed orphans only, so 31 FTA-family nodes that had edges
survived it — retired the same day with `ar-mercosur`, records in
`notes/retired-nodes-2026-08-31.json`.** The class is now retired in
practice as well as principle. Still nothing in the validator stops a
new one — a title regex is too contaminated to trust (see the meta-node
paragraph below); the guard is this paragraph and the reviewer.

**A node's `publisher` is a body, not a derivation note** (Thomas,
2026-08-31, ruling 3-A after the audit's D7). "Derived from UNICEF and
education monitoring sources", "WHO / national sources", "Derived from
international compilations" name a topic with a figure attached, not a
recurring official release, and no document can ever name a topic as an
input — 62 such nodes retired (`notes/retired-nodes-2026-08-31.json`).
A lazy "X / related" or "X / Y related" string on a real release is a
field to fix, not a node to drop — 166 rewritten to the first-named body
(`notes/publisher-cleanup-2026-08-31.json`). The validator's PUBLISHERS
block prints any new one. Don't mint a node whose publisher you can't
name.

**Assertion-only edges are `_dropped`, never live** (Thomas, 2026-08-31,
ruling 1-A after the audit's D1). An edge whose evidence is a publisher
homepage or nothing, and whose basis quotes no document, is a belief —
463 of them went to `_dropped` `no-document` that day with their
original basis preserved, and the validator's EVIDENCE block counts any
new one. "Probably true" is the reason they were dangerous, not a
defence: on screen they were indistinguishable from verified edges. Three nodes look treaty-shaped but deliberately survived:
`ve-ofac-sanciones` (a `part_of` container — removing it orphans two
other nodes), `tr-eu-trade` (named like a treaty, actually merchandise
trade statistics), `sdmx-standard`/`sna-2025` (statistical standards, not
agreements).

**Naming the agency is not naming the artefact** (Thomas, 2026-08-31,
ruling on the second audit's F-05). A document that says the figure comes
from "the Department of Commerce", "ISQ", "FCSC" or "the central bank" —
without naming the release — does not clear the evidence bar for an edge to
that agency's *specific* publication. It is a lead: the release still has
to be found by title. Six such edges went to `_dropped` `no-document` that
day (`hhs-fmap-notice -> bea-state-personal-income`, `qc-decret-population
-> isq-bilan-demographique`, `gcc-stat -> ae-labour`, `dk-edp-inventory ->
dk-govfin`, `br-ibge-pim-pf -> br-ibge-sistema-contas-nacionais`,
`ndb-evaluation-policy -> brics-ndb-agreement-2014`), and REPORTS.md's own
"disclosure stops one level short of a title" note is the reason this is
the normal case, not the rare one. Nothing in the validator can catch it —
the guard is this paragraph and the reviewer.

**"Consistent with" is a claim about numbers, not a citation** (Thomas,
2026-08-31, ruling on the second audit's F-03). A basis that says two series
are consistent, aligned or comparable — and quotes no passage — describes
agreement between figures, not a document naming one as the other's input.
38 such edges (28 of them in the Russian regional slices) were moved to
`_dropped` `deferred` as leads, originals preserved in `why`. The shape to
watch for in Grok output: "X data in national compilations are consistent
with the Y yearbook" — that is the tell.

**An index page is a bare homepage with a path** (Thomas, 2026-08-31,
ruling on the second audit's F-01/F-02). `brics.ibge.gov.br/publicacao.html`
stood behind 23 edges and names no data source; `inegi.org.mx/temas/...`,
Rosstat `folder/<n>` listings are the same class. All 23 went to `_dropped`
`no-document`; `isIndexPage()` in graph.ts now warns on the class (45 more
edges on the day it landed, listed in the validator's EVIDENCE block beside
the bare-homepage count, plus an informational "URLs behind 10+ edges" list —
one URL rubber-stamping dozens of edges is the tell). Same promotion gate as
the other two evidence warnings.

**A legal instrument stays a legitimate node when a statistical release
names it as its own legal/methodological basis** — Japan's Statistics
Act, Brazil's Lei 8.213, the EAEU statistical protocol, national social-
protection acts, the EDP inventories: whole rounds are built on that
family, untouched by the sweep above. The cut is "instrument nobody's
statistics depend on," not "instrument."

**Analytical meta-nodes: 5 retired, sweep deliberately stopped there**
(Thomas, 2026-08-29) — comparison-device/policy-frame nodes with no
publication behind them. **Do not extend this by keyword search: both
obvious signals are contaminated.** "framing" is a Grok verbal tic that
also appears in real statistics-node titles ("Statistics and framing of
remittance inflows"). The corpus's own "meta-node" `_notes` phrasing
describes a node's ROLE IN THE GRAPH, not its nature — it lands on the
Okinawa Statistical Yearbook and Taiwan's Energy Statistics Handbook,
both genuine. A title-regex sweep caught 36 candidates, only 5 were real.

**Above all, never sweep the "— high/low-poverty contrast" nodes.** They
read like analytical framings and aren't — they're real subnational
jurisdictions (Ecuadorian/Peruvian/Uruguayan/Paraguayan/Bolivian/Chilean)
that Grok titled as a poverty-contrast set. They're the bulk of the
unresearched South America seam; deleting them destroys the next round
before it starts.

**Chart/figure-caption sourcing clears the evidence bar** (Thomas,
2026-08-30) — a figure-source line under a chart is a citation, same
standing as body-text prose. General ruling for every future round, not
just the edge that prompted it.

**One-off scope calls, already decided — don't re-raise. Reasoning for
each lives in its own `_dropped`/live edge entry, not repeated here:**
- Iran's SNA vintage (`ir-national-accounts` chain) — disregarded, live
  as is (2026-08-29).
- Generic COICOP citations (Iran, Iraq) — no revision-neutral parent
  node minted (2026-08-29).
- Generic MFSM citation (Vietnam) — reversed the next day from a
  COICOP-style decline to wired, since Grok's target was a specific
  versioned node, not a proposed generic one (2026-08-29 → 2026-08-30).
- PH EBEIS node-scope — an information system isn't the statistics it
  produces, declined (2026-08-30).
- TW SIPRI arms-transfers direction — scope mismatch (exports source
  cited for an imports-scoped report), declined (2026-08-30).
- NACE Rev.2 (Türkiye) — same generic-citation shape as COICOP, no
  `nace-rev2` node minted (2026-08-29).
