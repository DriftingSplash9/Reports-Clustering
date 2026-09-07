# HANDOFF — working document

**This is the current handoff. There is exactly one, and it lives here at the
top level.** When it is superseded, the new session moves this file into
`archive/Previous Handoffs/` renamed `HANDOFF-YYYY-MM-DD-<topic>.md` and writes
a fresh `HANDOFF.md` in its place. Never leave two handoffs at the top level.

Last written: **2026-08-20 (updated a fourth time the same day)** — the mint
(item 5) shipped, Thomas ran the built app and reported the tier system
unusable at the new corpus size ("95% of nodes crowded in there... a literal
cluster fuck"), a same-day fix (item 5b, the per-country fold) shipped for
that, THEN Thomas asked for real "galaxies" (item 5c) — countries clustering
visibly inside their own colour family's region of space — which also
shipped the same evening, and THEN Thomas came back with three more things in
one message (item 5d): the galaxy effect felt sparse, no way to isolate one
country plus its international ties, and search for "Israel" returning
nothing. All three answered; the Isolate feature shipped; the country-isolate
investigation surfaced a real, verified data gap (19 countries with zero
cross-border edges) written up in
`notes/cross-border-gaps-2026-08-20.md`. Earlier in the day: corrected a
long-running false claim about git, measured three things the project had
only argued about, finished Phase 4 of the visual revamp, and fixed two
rendering bugs. Written for a FRESH agent with no memory of any of it.
Supersedes
`archive/Previous Handoffs/HANDOFF-2026-08-19-visual-revamp-phase4-complete.md`,
kept for its per-item detail.

---

## 1. Read these first

**In this order. Do not skip step 1.**

| # | Document | Why |
|---|---|---|
| 1 | **`REPORTS.md`** — start at *"🛑 Agent: read this before doing any work"* | The standing rules. The two most violated: never run git, and every edge needs a document. |
| 2 | **This file, all of it** | Current state, the todo list, the traps. |
| 3 | `START-HERE.md` | Plain-language orientation. Also now rendered verbatim inside the app as Help ▸ What this is — so an edit here is an edit to the product. |

Then one of these, depending on the task:

| Task | Read |
|---|---|
| Anything visual | §4 and §7 below; then `notes/visual-revamp-2026-08-18/visual-revamp-review.md` (rev 4) for the measured design |
| Camera, fit or layout | `notes/camera-fit-measurement-2026-08-19.md` — the numbers, and the harness recipe |
| The flicker | `notes/flicker-tests-2026-08-19.md` — three of four suspects cleared, one open |
| Isolate, or "why does country X show empty" | `notes/cross-border-gaps-2026-08-20.md` — 19 countries with zero cross-border edges, by design not bug |
| Minting / the staged archive | `Grok - Brics+israel and singapore/consolidated/CONSOLIDATION-REPORT.md` and `_STATUS.md` |
| BRICS research | `BRICS/G.3.md` |
| Schema | `src/lib/types.ts` — mostly documented reasoning, not types |

**House habit: the code is the design doc.** `palette.ts`, `nodeVisuals.ts`,
`linkVisuals.ts`, `view.ts`, `modes.ts`, `savedViews.ts` and
`InfluenceGraph.tsx` carry long comments explaining why each constant is what
it is, usually with the date and Thomas's words. Read the comment before
changing the number. Several say "do not raise this" and mean it.

---

## 2. Standing rules

Full text in `REPORTS.md`. The short list, because these are the ones that
break:

1. **Never run git in this repo from an agent session** — not even read-only.
   It leaves a stale lock. **And never STATE git status either** — see §3.
2. **If no document says a dependency exists, it does not go in the graph.**
3. **A pointer is not a source.** WebFetch can fabricate content for a dead
   URL; raw-verify before trusting a quote.
4. **`npm run validate` before and after any data change** (44 checks). It
   cannot run through the device bridge (`node_modules` carries the Windows
   esbuild). Working recipe: tar `src/ scripts/ package.json tsconfig.json
   index.html vite.config.ts START-HERE.md` on-device into `_to_delete/`,
   stage the tarball, extract + `npm install` in a Linux workspace, run there.
   **`START-HERE.md` is now required for the build** — Help imports it.
5. **`src/data/slices.generated.ts` is generated. Never hand-edit it.**
6. Agents cannot delete device files — `mv` into `_to_delete/`, log the reason
   in `_to_delete/README.md`, tell Thomas.
7. **Headless verification works and is expected**: build, `vite preview`,
   Playwright + the preinstalled Chromium with
   `--use-angle=swiftshader --enable-unsafe-swiftshader`. Geometry, colour and
   pixel counts are exact; **bloom/glow is NOT trustworthy** in software
   rendering, and CSS transitions can wedge under load (see §7).
8. **Measure before believing.** This session killed four confident, specific,
   wrong claims — three of them written by an agent earlier the same day. If a
   statement has a number in it and nobody ran anything, it is a guess.

---

## 3. Where the project is (verified 2026-08-20)

**Live corpus:** 3,091 reports · 2,070 dependencies, after item 5's mint
(these numbers were 1,250 · 1,079 for the whole first half of 2026-08-20 — if
you're reading an older copy of this file, or a comment elsewhere still says
1,250, that's the pre-mint figure, not a live discrepancy to chase down).
`npm run validate` exits 0 (61 logic checks as of item 5d, up from 59 after
5c and 54 after 5b, all invariant checks; warnings only — single-use
`proposed:` tags and the known isolated-report list). `npx tsc --noEmit`
clean. `npm run build` clean. All re-verified on the actual device tree after
the last commit of the day.

**Git: agents cannot see it, so agents must not assert it.** Thomas confirmed
on 2026-08-19 with a GitHub Desktop screenshot — branch `main`, **0 changed
files**, "Fetch origin, last fetched just now". The repo was fully committed and
pushed, and had been all along. Every handoff from 2026-08-13 to 2026-08-19
opened with a growing "nothing committed, three weeks of work on one disk"
emergency. That claim was never verified by anyone, was copied forward each
session with that session's work appended to the list, and was false. Rule 1
bars agents from running git, which is exactly why the claim was unfalsifiable
and grew. **No session may state git status in any document — not "committed",
not "not committed", not a backlog count.** Ask Thomas, or read a GitHub
Desktop screenshot. Delete any such claim you find rather than carrying it
forward.

**Staged corpus:** `Grok - Brics+israel and singapore/consolidated/` — 37
country files, **1,999 reports, 982 internal edges; 844 connected, 1,155
edgeless (58%)**. Mint is decided YES but deferred. Also in `consolidated/`:
`_EDGES-jp-kr-tw-2026-08-19.json`, an additive edge file from a Japan/Korea/
Taiwan research round. It is DATA, not bookkeeping; merge per its own `_rule`.

**Project memory is DOWN again** — `project_memory_write` accepted writes early
on 2026-08-19 and refused them for the rest of that day and all of 2026-08-20
("not available in this session"). **Re-confirmed still down twice more,
later on 2026-08-20**: `project_memory_read` on a specific file returned
"Project memory is not available in this session" both times, once right
before the path-dependence fix and once right after (the index shown at
session start is a cached snapshot, not a live read — don't mistake it for
memory being back). Two consequences:
- The memory entry this session owes is parked at
  **`notes/memory-pending-2026-08-20.md`**, which now also carries a second
  and third addendum (the flicker-check result, and the path-dependence fix
  + its verified measurements) — a session with working memory should paste
  all of it in and delete the file.
- ⚠️ The existing memory entry `camera-fit-density-risk-2026-08-19` is **WRONG**
  and could not be corrected: it says the camera sits at ~2.8 × p95 (it is
  **5.675 ×**) and predicts a halo of edgeless nodes after the mint
  (impossible — the shelf excludes them from the fit).
  `notes/camera-fit-measurement-2026-08-19.md` supersedes it.

---

## 4. What the app is now

Assume all of this exists and works. Each carries a dated comment at the site.

- **Lenses.** `src/lib/modes.ts`: STANDARD / GROUP_COMPARISON / WORLD_OVERVIEW.
  A recolour pass via ref + mutation effect; **never a `forceGraph` memo dep**.
- **The constellation look.** Near-black background (`#010204`), flat crisp
  panels, rotating masthead gradient, tier bar bottom-left, unlinked shelf
  bottom-right, country drop-up bottom-centre.
- **Lighting.** Two directional lights + ambient 0.28, emissive floor 0.12,
  bloom 0.14/0.26. **Closed** — Thomas, 2026-08-19: *"the lighting is okay"*.
- **Blueprint is DELETED.** No view setting is a memo dep any more. Rims
  survive only on hollow one-off instruments. Every remaining `blueprint`
  mention in `src/` is a deliberate dated tombstone; the docs are clean.
- **Hover and selection.** Hover = identity chip; click = full `Detail` card
  from the RIGHT, now including the report's `url` as a host link. Camera
  refits UNCONDITIONALLY on every filter change (third rewrite — the
  conditional version read as a glitch).
- **The edge evidence card.** Click a line, arrowhead, pulse, or within 9px of
  a line, and a card slides from the LEFT with every Dependency behind that
  drawn line: real endpoints, relationship type, period, the verbatim `basis`
  quote, and `evidence_url`.
- **Edges and pulses have SET SIZES and split shades.** `baseLinkWidth()`
  returns 1. Weight survives in rest lengths and line opacity. **Never
  reintroduce additive/white pulse cores** — one session, reverted, snowstorm.
- **Menu bar** (`MenuBar.tsx`). `Panels ▾` hides/shows six HUD blocks (hidden
  by default, persisted at `rig.panels.v1`); `Views ▾` is saved views;
  `Help ▾` is How-to and What-this-is. **The tier bar and its status line are
  deliberately NOT in the menu** — primary navigation, and the only signal a
  filter is on. If that ever changes, the status line needs its own strip.
- **Help renders `START-HERE.md` imported raw** (`?raw`), cut at
  `## Running it`. Editing the markdown edits the product. **How-to re-opens
  the real onboarding card** via an `openRequest` counter prop — never a second
  copy.
- **Saved views** (`src/lib/savedViews.ts`). Tier + **opened countries** +
  view settings + filters + selection + panels, `schema: 1` at `rig.views.v1`,
  restored by MERGING into today's defaults (an old save with no
  `openedCountries` field defaults to `[]`, correctly — nothing was
  individually opened before the field existed). The **★ (`openOnLoad`)** is
  the point of the feature and is read at MODULE scope so the starred state
  is the graph's first state.
- **The disclosure hierarchy now folds TWICE, not once (2026-08-20, item
  5b).** `src/lib/hierarchy.ts`. The tier ladder (`resolveId`,
  `buildDisclosedGraph`) still folds a report into its family orb
  (`orb:${family}`) when its own tier isn't globally open yet — unchanged,
  still global, still Thomas's "depth is a property of the view" call from
  2026-08-12. NEW: once a tier IS open (tier 2+), a report additionally folds
  into a per-country orb (`corb:${country}`) until that specific country is
  individually expanded (double-click) — `toggleCountryOpen` in
  hierarchy.ts, mirroring `toggleDrilldown`'s "only ever adds detail, never
  folds back" contract. `App.tsx` holds this as `openedCountries`
  (`ReadonlySet<Country>`), reset to empty on a full Reset, left alone by a
  tier button press (additive, like the filter). Why: at 139 countries, a
  single global "Nations" rung dumped 2,071 real reports on screen at once
  regardless of country; the fold is per-country because Thomas explicitly
  asked for it at this scale, after having explicitly declined the same idea
  at ~10 countries per family on 2026-08-12 — both calls were right for the
  corpus size they were made against. See the long comment on `resolveId` for
  the full reasoning and the measured before/after node counts.
- **Galaxy clustering (2026-08-20, item 5c).** `src/lib/galaxyForce.ts`, new.
  A hierarchical d3-force-3d force pulling every node toward its own colour
  family's centroid (gentle) and its own country's centroid (stronger,
  tighter) — countries visibly clump inside their family's region of space,
  Thomas's own "galaxy" image. New `view.galaxy` slider (`view.ts`,
  `ViewControls.tsx`), 0–3, defaults to 1 (ON). **Read the file-level comment
  before touching this or `geoAffinity.ts`** — the two forces look similar
  but answer different questions (own-group gravity vs bilateral bloc pull)
  and the comment explains why this one does not repeat the "continent is
  not a relationship" mistake geoAffinity was built to avoid. Provinces and
  municipalities are NOT a third level — `Report.region` is free prose for
  79% of the 606 provincial/municipal reports, not a clean field to cluster
  by; that needs its own data pass before this mechanism can extend to it.
- **Isolate (2026-08-20, item 5d).** New `view.isolateFocus` toggle
  (`ViewControls.tsx`, Focus section). With a node or country orb selected
  and this ON, everything outside the traced chain is HIDDEN, not dimmed —
  answers Thomas's "show just Israel and its international connections"
  request. Deliberately built on `buildFocusIndex(disclosedGraph, null)` —
  the UNFILTERED index — rather than extending the Countries/Domains scope
  filter, specifically so a cross-border edge survives even when the other
  endpoint is in a different family. A naive per-country filter entry would
  have failed this: `applyFilter` only keeps an edge when BOTH endpoints are
  visible, so scoping to one family drops any edge reaching outside it. See
  `App.tsx`'s `unfilteredFocusIndex`/`isolateFocus` memos (that local name
  shadows the `view.isolateFocus` boolean — they are different things, a
  `Focus | null` and a toggle) and the pinned regression test in
  `scripts/test-logic.ts` (the Israel/MERCOSUR case) that exists specifically
  so nobody "simplifies" Isolate back onto the filtered index.
- **Loading curtain** (`LoadingCurtain.tsx`). Opaque until the renderer reports
  `settledOnce && fitted`, first load only. **The 25s safety timeout is the
  load-bearing part** — a curtain that never lifts is worse than none.
- **Sliders, current ranges:** Cluster spread **200%–10000%, opens at 200%**;
  Geo-affinity **0–500%, opens at 150%**; zoom 0.25–2.6 of fit distance.

---

## 5. THE TODO LIST

Sorted by owner, ordered by priority within each.

### [Thomas] — only you can

1. **DONE (tentatively) 2026-08-20 — the bloom flicker check.** Thomas dragged
   the glow slider to 0 while the flicker was happening: *"i think the flicker
   is gone."* Read as a soft confirmation, not a hard one — he did not say
   "definitely" and the test was not repeated. Treat bloom as the leading
   cause and try the bloom-pass fix (raise the threshold, drop `mipmapBlur`,
   or pin the bloom buffer to a fixed resolution) next; **if the fix doesn't
   actually kill the flicker, re-open this** rather than assume the diagnosis
   was solid — this project has a standing scar from carrying forward
   claims nobody re-checked (§3).
2. **Tried 2026-08-20 — right-drag panning and the low end of the zoom
   slider.** Thomas tried it (no complaint reported), so treat as probably
   working, but this wasn't an explicit yes/no confirmation — worth a quick
   "does this feel like navigation" check before building the fly-through
   feature (item 9) on top of it.
3. **Empty the recycle bins.** `_to_delete/` at the root now also holds four
   `_verify*-src.tgz` / `_fitmeasure-*.tgz` transport tarballs from this
   session's headless verification; all are throwaway and logged in
   `_to_delete/README.md`. Also `Grok - Brics+israel and singapore/_to_delete/`.
   Keep `grok-batches/` and the three BRICS/Israel/Singapore zips — sole raw
   provenance.

### [Us] — your eyes, agent's hands

4. **Pulse size/shape redesign + the beam.** Burner by your instruction. The
   set-sizes pass fixed the noise; the beam idea (continuous databases render
   their edge as a lit stream with a direction cue) replaces pulse geometry on
   the fastest edges, so shape and beam are ONE design round. Pairs with the
   soft-edge node idea (`notes/node-surface-encoding-2026-08-19.md`) — the 35
   continuous databases have the data to support all of it.
5. **Mint the staged archive — DONE 2026-08-20.** Corpus went from 1 250 to
   **3 091 reports, 1 079 to 2 070 dependencies**. `npm run validate` and
   `npm run build` both exit 0 on the merged corpus — worth re-running on your
   machine once to confirm the same, since this was built and shipped from a
   sandbox copy, not committed there directly (standing rule: agents never run
   git in this repo).
   - `check-urls` ran on your machine: 1 972 checked, 832 flagged "dead" but
     most were false positives (403/timeout from the checker's plain HTTP
     client tripping bot-walls — spot-checked several through a real
     browser-fetch and they load fine). Only 37 were genuine 404s (18 of
     those one problem — singstat.gov.sg restructured its URLs). Your call:
     keep the report, flag the URL as stale rather than drop anything — not
     yet written back as an explicit flag anywhere (no schema field for it;
     needs its own small tracking note next session, e.g.
     `notes/stale-urls-2026-08-20.md`).
   - Merged `_EDGES-jp-kr-tw-2026-08-19.json` (63 edges, all landed).
   - The geography-as-a-node problem turned out to be **two** problems, not
     one: MX/AR had ~25 places (a state, a city) modeled as fake report nodes
     ("Chiapas — core statistical identity"); 12 OTHER country files had the
     same trick played with institutions instead (central banks, stats
     offices) — mostly already flagged in each file's own
     `_gaps.institution_node_candidates`, which is how they were caught. All
     ~53 excluded from the mint rather than shipped as fake nodes. One of
     them (`bo-ypfb`) was already independently flagged in the LIVE corpus's
     own dropped-notes, which is also how a second thing got caught: one new
     edge (`bo-alfabetismo → bo-educacion`) was a near-repeat of a claim
     already rejected once for weak evidence — dropped rather than let it
     quietly reappear.
   - Live-wins applied uniformly (not just the 4 named duplicate ids — every
     id collision resolved the same way); RBI `external-sector` tag grafted
     onto the live `in-rbi-balance-of-payments` per this note.
   - Also fixed along the way, none of it anticipated going in: 132 reports
     had `jurisdiction_level: international` but kept a specific country code
     instead of `INT` (existing validator rule, not a new one); 21 dependency
     edges were containment mis-modeled as dependency (dropped — the
     containment is already expressed via `part_of`); 40 edges carried a
     free-text `reference_period` ("continuous") where the schema wants a
     structured object (stripped the field rather than invent numbers from
     prose).
   - **Palette re-damped, same session** (Thomas: do it now). Shares
     inverted — ASIA 4.0%→28.5% (now largest), SA 9.3%→21.9%, AFR
     32.2%→15.3% (was largest), EU/US/CA all fell to 4–6%. New chroma tiers:
     ASIA/SA (≥20%) 55%, AFR (15.3%) 75%, EU/US/CA/IN (3–7%) 90%, everything
     under 3% stays full. Applied as a straight per-family chroma multiplier
     in OKLCH space (hue and L untouched) — see `palette.ts`'s v4 note.
   - **Camera-fit re-measured, same recipe as the path-dependence fix**: 1 806
     framed nodes now (up from 958), furthest/p95 ratio **1.38×** — well
     inside the 5.675× failure line, actually a better margin than pre-mint
     despite nearly double the nodes. See the updated comment in
     `InfluenceGraph.tsx`'s `measureFit`.
   - **Not done yet**: the stale-url tracking note above (now written —
     `notes/stale-urls-2026-08-20.md`), and the pulse/beam item (4) which was
     already next in line.

5b. **Per-country fold — DONE 2026-08-20, later the same day.** Thomas ran the
    just-shipped mint himself and reported every tier but Global unusable:
    *"we need a cap at a certain number of nodes... when we had 1250 nodes it
    was already too dense... in hindsight I should have known this would
    happen at 3000."* Measured before fixing, not assumed: opening "Nations"
    put **2,467 of 3,073** reports on screen at once (tier 2 cumulative,
    counted straight from the corpus), because 2,071 of those are
    jurisdiction_level `federal` spread across **139 countries**, and the
    tier ladder (built 2026-08-12 against a ~728-report, few-dozen-country
    corpus) had no fold axis narrower than "the whole family". "States" was
    2,873; "Everything" 3,073 — i.e. every tier past Global showed nearly the
    whole corpus regardless of which button was pressed.
    - Fix: a second, independent fold axis in `src/lib/hierarchy.ts` — a
      report whose tier is open but whose COUNTRY hasn't been individually
      expanded now folds into that one country's orb instead of drawing as
      itself. Full model in §4's new bullet above and in the comment on
      `resolveId`.
    - This deliberately **revisits** (does not overturn) the "no per-branch
      drilldown" call from 2026-08-12 (*"I want double clicking the EU to
      open all national level nodes"*) — that was the right call for a corpus
      where no family held more than a handful of countries; ASIA alone now
      holds 14, and the country-branch axis Thomas declined at that scale is
      the one he asked for at this one.
    - Presented as one of four options (country-fold; a blunt authority-based
      node cap; full per-continent "galaxy" scenes, Thomas's own
      Milky-Way/Andromeda framing; a lighter galaxies-via-layout middle path)
      before building — Thomas picked this one as the first move regardless
      of which direction he ends up taking longer-term.
    - Verified three ways, not just by tsc passing: (1) `npm run validate` —
      54 logic checks including new ones for `countryOrbId`/`toggleCountryOpen`
      round-trips and the fold/unfold cases, all pass, `npm run build` clean;
      (2) a real headless-Chromium measurement (same recipe as the
      camera-fit work) against the actual built app reading the on-screen
      "N of 3,091 reports shown" readout, not a simulated count — confirmed
      Global/Nations/States/Everything ALL now show 396 real nodes by
      default (down from 396/2,467/2,873/3,073), and that opening Canada
      specifically at the Nations tier adds exactly Canada's own reports
      (467) while every other country stays folded; (3) no console/page
      errors in that same run.
    - Shipped: `src/lib/hierarchy.ts`, `src/App.tsx`, `src/lib/savedViews.ts`,
      `src/components/InfluenceGraph.tsx` (the position-seeding-on-reveal
      logic now seeds from a country orb's last position first, family orb
      as fallback), `scripts/test-logic.ts`.
    - **Not done yet, and worth flagging explicitly**: there is no UI
      affordance to re-fold a single country short of a full Reset (same
      asymmetry as `toggleDrilldown` — deliberate, not an oversight, but
      worth Thomas seeing it live before deciding whether it needs one). No
      "N countries opened" readout exists anywhere.

5c. **Galaxy clustering (Phase 1) — DONE 2026-08-20, same evening again.**
    Thomas looked at the shipped per-country fold, asked what the still-hiding
    387 nodes in his "4 of 12" screenshot were (answer: the pre-existing
    `Countries` scope/family FILTER chip at bottom-centre — unrelated to the
    country-open state above, isolated to 1 of 12 colour families; click it
    and hit "All" or shift-click Reset to clear it, plain Reset alone does not
    since the filter is deliberately excluded from that gesture), then decided
    on option 3 from 5b's conversation: real "galaxies" — *"if I look at
    canada the provinces are not random, they would be separate clusters just
    like the continents."* Explicitly chose Phase 1 (the cheap-to-try
    single-scene version) over the full multi-scene rewrite as the first move.
    - **New file `src/lib/galaxyForce.ts`**: a d3-force-3d custom force, same
      shape as `geoAffinity.ts`'s `countryAffinityForce` (ref-read strength so
      the slider never rebuilds the layout, `.initialize`/callable contract).
      Pulls every node toward its own colour-FAMILY's centroid (gentle,
      `FAMILY_PULL = 0.028`) and its own COUNTRY's centroid (stronger,
      `COUNTRY_PULL = 0.07`) every tick — the country pull is the tight,
      visible "cluster" shape; the family pull just keeps a family's
      countries from drifting into another family's territory.
    - **Deliberately not a contradiction of `geoAffinity.ts`'s "continent is
      not a relationship" objection** — read the long note atop
      `galaxyForce.ts` before touching either force. That objection was about
      pulling country A toward UNRELATED country B because they share a
      colour bucket; this force never does that — it only pulls a node
      toward its OWN group's centroid, the standard d3 cluster-force pattern.
      Thomas asked for the shape geoAffinity was built to avoid producing
      *by accident*; here it's deliberate, by name, with a stated mental
      model (Milky Way / Andromeda).
    - **Provinces/municipalities are NOT a third level yet — checked, not
      guessed.** Counted the real corpus before answering Thomas: of 606
      provincial/municipal reports, only 130 (21%) have a `region` field
      that splits cleanly into "Country — Province"; the other 79% are free
      prose ("Yaoundé, Cameroon", "All 77 communes of Bénin...") with no
      reliable delimiter, some describing several sub-units in one blob with
      nothing to extract at all. Clustering by a field wrong 4 times out of
      5 would read as broken. This is a DATA gap, not a rendering one — the
      mechanism is identical once a clean sub-national field exists (country
      already proves the pattern is safe); it needs its own data pass
      first, not a text-parsing hack today.
    - New `ViewSettings.galaxy` (0–3, default 1 — ON, not opt-in, since
      Thomas asked for this directly rather than discovering it) in
      `src/lib/view.ts`; new "Galaxy pull" slider in `ViewControls.tsx`;
      wired into `InfluenceGraph.tsx`'s `forceGraph` memo alongside
      `geoAffinity`.
    - **Verified, not assumed**: `npm run validate` (59 logic checks, up from
      54 — new `galaxyForce` tests cover no-NaN-after-200-ticks, two same-
      family countries drawing closer without merging, strength-0 being a
      true no-op, and a pinned/isolated-shelf node never being nudged) and
      `npm run build` both exit 0. Separately, a real headless-Chromium run
      against the full merged corpus (Everything tier, temporary debug hook,
      stripped before shipping) measured actual settled positions: at the
      100% default, countries sit 1.92× further from each other than their
      own members sit from their own centroid; at the 300% ceiling, 3.49× —
      separation scales with the slider as it should, zero NaN positions at
      either setting.
    - **Not done**: options 2 (blunt node cap) and 4 (galaxies via layout
      only, no new force) from 5b's conversation were superseded by Thomas
      picking 3 directly rather than trying them first — fine, his call, but
      don't assume they were tried and rejected. No visual/camera check has
      been done on an actual screen (only measured via harness) — worth
      Thomas looking at it live before calling this finished. The "actual
      separate scenes, camera flies between galaxies" heavier version of
      option 3 was NOT built — this is the single-scene, one-force version,
      deliberately the cheaper thing to try first.

5d. **Isolate feature + three-issue follow-up — DONE 2026-08-20, same
    evening again.** Thomas's message after 5c raised three things at once:
    (1) the galaxy effect "felt like a lot was missing... expected several
    clusters"; (2) no way to show just Israel plus its international ties,
    with the Countries filter's 12 options too coarse; (3) searching
    "Israel" in the find bar returned nothing.
    - **(2), built**: the Isolate toggle described in §4 above. Reuses the
      existing focus/trace walk (`selection.ts`'s `buildFocusIndex`/
      `computeFocus`), unchanged, just pointed at an unfiltered index instead
      of the visible one. `view.ts` (+`isolateFocus: boolean`),
      `ViewControls.tsx` (+Focus-section checkbox), `App.tsx` (the two new
      memos), `scripts/test-logic.ts` (+ the Israel/MERCOSUR pinning test).
      `npm run validate` 61/61, `tsc --noEmit` clean, `npm run build` clean.
    - **(2), investigated live and found a real data gap, not a bug**:
      selecting Israel's country orb with Isolate on shows Israel alone, 0
      others. Traced directly against the corpus (not the UI): all 29 of
      Israel's reports are `federal`, and all 26 dependency edges touching
      any of them are Israel-to-Israel — zero cross-border edges recorded at
      all. The same check across every country with 5+ reports found 18 more
      in the same state (Indonesia, Taiwan, Philippines, Japan, South Korea,
      Vietnam, Singapore, Iran, Thailand, Iraq, Myanmar, Saudi Arabia,
      Afghanistan, Yemen, Syria, Sudan, Mauritius, Sierra Leone — mostly from
      the item-5 mint). Full list and counts in
      `notes/cross-border-gaps-2026-08-20.md`, framed as a research queue
      item — **no edges were invented to paper over this**, per rule 2.
    - **(3), diagnosed, not yet independently reproduced against Thomas's
      exact live session state**: search obeys the same scope filter as
      everything else (`SearchPanel` is passed `within={predicate}`), by
      design, so it never suggests flying to a currently-hidden node. His
      screenshot showed the Countries filter at "1 of 12" at the time. A
      direct unfiltered test of the search function itself for "israel"
      returned 10 correct results, so the search algorithm is not the
      suspect — clearing the Countries filter and re-searching is the
      likely fix. Flagged to Thomas as "most likely," not confirmed against
      his actual session.
    - **(1), explained, not yet resolved**: a real tension between 5b and 5c.
      The per-country fold (5b) reduces most countries to a single-point orb
      by default; the galaxy force (5c) needs several visible points per
      country to read as a cluster rather than a dot. Out of the box, most
      of the "galaxy" is single stars, not clusters — which is exactly what
      Thomas reported. Flagged to him with the suggestion to open a handful
      of countries manually and look again before deciding whether defaults
      (e.g. `COUNTRY_FOLD_FROM_TIER`, or which countries start pre-opened)
      should change.

### [Agent] — next build rounds, in order

6. **FIXED 2026-08-20 — the layout's path-dependence.** Was the top open bug:
   cold-starting at spread 10000% settled to a core radius of **240,508**;
   ramping the slider up to 10000% in a live session settled at **17,217** —
   factor of fourteen, identical settings. Thomas's *"sometimes the cluster is
   a ball, sometimes it is oblong"*.
   **Root cause**: the `forceGraph` memo (`InfluenceGraph.tsx`, deps
   `[graph, spreadApplied]`) seeded every node from `lastPositions` on ANY
   rebuild — including a pure spread change, where `graph` itself hadn't
   changed. That seeding is genuinely needed for drilldown continuity (a tier
   toggle should keep nodes where they were), but applying it to a spread-only
   change meant the new force parameters only ever nudged an already-relaxed
   cloud, never re-relaxed one from scratch the way a cold load does.
   **Fix**: a new `prevGraphForLayout` ref tracks the `graph` reference the
   memo last ran with; a pure spread change (`graph` unchanged) now skips
   every seed path and falls through to an unseeded node, exactly like first
   load. Drilldown/tier/filter changes are untouched — they still seed from
   `lastPositions` as before.
   **Verified**, not just built: a temporary headless Playwright harness
   (same recipe as `notes/camera-fit-measurement-2026-08-19.md`, sandbox copy
   only, never merged) reproduced the bug on the unfixed code first —
   cold 113,651 vs ramped 20,034, ratio 5.67 — then re-ran on the fixed code:
   cold 113,650 vs ramped 113,307, **ratio 1.003**. `npm run validate` (44/44,
   1250/1079) and `npm run build` (tsc + vite) both clean before and after.
   Full detail in `nodeScaleFor`'s comment in `InfluenceGraph.tsx` and the
   `forceGraph` memo's seeding block (search `spreadOnlyChanged`).
   **Not re-derived**: whether `nodeScaleFor`'s cap of 2000 can now come down,
   now that the worst-path cold-start number and the ramped number agree —
   worth a look next time that cap is touched, but not done here since it
   wasn't the thing that was broken.
7. **A legend.** Highest-value missing feature by a distance. There are **six**
   live encodings — colour = country family, fill darkness = government tier,
   hollow = one-off instrument, size = authority, line colour = the source's
   family, pulse rate = publication frequency — and the only place any of it is
   written down is an onboarding card most users dismiss once. Cheap, and it
   fixes a real comprehension gap.
8. **Neighbourhood focus.** "Show this node and everything within N hops."
   Filters today are by country and subject only. This attacks the density
   problem directly and is far cheaper than fly-through navigation. Do it
   before the mint, not after.
9. **Arrow-key / on-screen fly navigation.** Thomas's idea. drei's
   `OrbitControls` takes a `keyEvents` prop (default false) and three's
   controls already implement arrow-key panning at `keyPanSpeed = 7`, so the
   keys are nearly free — **but check `SearchPanel`'s own arrow handling
   first**, that is the one collision. On-screen direction arrows and a
   "you-are-here" cue are the real work. Note the measured fact this must be
   built around: **more spread will never put the camera inside the cluster**
   (§7), so navigation is the only way in.
10. **Phase 3**: GEO_EXPLORATION mode (geography takes the fill; needs a
    `REGION_OF` table) and typed edges — answer first what a trunk's "type"
    means when one line stands for 57 mixed edges; `methodology_depends_on` is
    the MOST common type (407). **GEO_EXPLORATION is the one mode that can
    break the camera fit**: a mode that repositions nodes swaps a scale-free
    cloud for a bounded surface and voids every number in §7, and it stops
    being a pure recolour pass so it cannot stay out of the memo deps the way
    lenses do. Re-run the fit measurement if it is built.
11. **Research backlog** (biggest total effort): the candidates-only tier — 722
    nodes with no edges; 170 `_dropped` research leads; BRICS G.4 (Brazil 3/24
    and China 1/12 never dispatched; open by grepping node descriptions for
    international-node names).

### Offered and not chosen — pick up any time

12. **Export a PNG** at 2× without the HUD. Thomas has been screenshotting with
    the Windows tool all session; a visualisation you cannot share is doing
    half its job.
13. **Deep links** — a URL encoding tier + filter + selection. Nearly the same
    serialisation `savedViews.ts` already does, but shareable, where saved
    views are local to one browser.
14. **Compare two nodes** — "what do these both rest on?". The data is there;
    nothing in the UI asks it.
15. **Path finder** — shortest documented path between two reports, highlighted.
    This is the question the corpus exists to answer and the UI never asks it.

Parked deliberately: 134 cadences where the publisher states nothing countable;
the 7 single-use `proposed:` tags; `diary.csv` relocation (Thomas's personal
cross-project diary — not the project's, leave it alone).

---

## 6. Architecture crib — where things live

- **`src/App.tsx`** — state owner: filter, drilldown, selection (`selectedId` +
  `selectedEdgeKey`), view settings, lens, panel visibility, saved views, the
  loading-curtain latch; the HUD; the hover chip; the right-hand `Detail` card;
  the left-hand `EdgeEvidence` card; the lighting rig; Canvas + bloom.
  `describePeriod` and `hostOf` live here. `STARTUP_VIEW` is read at module
  scope — see the comment for why it cannot be a hook.
- **`src/components/InfluenceGraph.tsx`** — the imperative renderer. One
  `forceGraph` memo builds everything (deps: `[graph, spreadApplied]` ONLY —
  keep it that way); every view change flows through refs + mutation effects.
  `runFit`/`measureFit` own camera + node scale; `applyFocus` owns
  dim/opacity/raycast; `useFrame` runs pulses, orb breath, hover ease, halos,
  fog, flight, and fires `onReady` for the curtain.
- **`src/lib/palette.ts`** — colour system. **`modes.ts`** — lenses.
  **`view.ts`** — every tuned scene constant, heavily documented.
  **`savedViews.ts`** — the saved-view store and its versioning rules.
  **`uiTheme.ts`** — CSS custom properties + `MENU_BAR_HEIGHT` / `HUD_TOP`.
  **`components/linkVisuals.ts`** — edge shader, `edgeShade`, `pulseMaterial`.
  **`components/nodeVisuals.ts`** — node material, fresnel rims, halos.
  **`lib/hierarchy.ts`** — tier disclosure, orbs, `DisclosedDependency`.
- **`components/MenuBar.tsx`, `HelpCard.tsx`, `LoadingCurtain.tsx`,
  `PanelShell.tsx`** — the chrome.
- Data: `src/data/research/*.json` slices auto-load; `slices.generated.ts` is
  generated; `graph.ts` builds + validates (44 checks in
  `scripts/validate-data.ts` + `test-logic.ts`).

---

## 7. Known traps — the ones that will actually bite

- **A cap that silently binds costs two things at once.** `nodeScaleFor`'s cap
  was 20 while the fit was asking for 92.8: nodes rendered at a fifth of their
  size AND, because `baseLinkWidth` is a multiple of node scale, edges went
  four-fifths too thin. Neither failure names itself. **Whenever a slider
  ceiling moves, recompute the cap** — `cloudRadius ×
  TARGET_LARGEST_FRACTION / MAX_BASE_RADIUS` at the new extreme, then double
  it. That rule earned its keep within an hour of being written.
- **The camera can never end up inside the cluster by raising spread.** The fit
  frames p95 and sits at exactly **5.675 × p95** (`1.18 / sin(FOV/2)`, FOV 24°).
  Failure needs `max/p95 > 5.675`; measured 1.5–2.1 everywhere, including a
  simulated post-mint corpus. **Spread also saturates**: 1000% → 10000% buys
  2.7× radius and 25% more air, not 10×.
- **Never put a mode, tab, hover, or any view setting in the `forceGraph` memo
  deps.** Every change there resets the camera and re-warms physics.
- **`meshes.current` cannot be trusted for POSITIONS** — read `positionedById`
  or `graphData().nodes`. This trap was documented and still bit this session.
- **Transparency does not stop a raycast** — ghosted elements need
  `raycast = () => {}`.
- **The rim-colour uniform exists only after first shader compile**
  (`userData.uRimColour` guard).
- **`onPointerMissed` can fire more than once per click** — the edge-pick path
  always OPENS, never toggles.
- **CSS transitions on cards can wedge under SOFTWARE rendering** at full scene
  load. `LoadingCurtain` unmounts on a timer rather than on `transitionend` for
  exactly this reason.
- **Menus close on `pointerdown`, not `click`** — `document.body.click()` does
  not dismiss them. Cost one false "apply is broken" result.
- **Synthetic mouse drags do NOT reach OrbitControls.** Drive camera motion in
  a harness with the app's own `autoRotate`. A null result with
  `cameraMoved: 0` nearly shipped as a finding.
- **Closed unions are cast, not parsed** — an off-union `relationship_type`
  makes edge weight NaN and PageRank spreads it everywhere.
- **Grok's JSON is not reliably JSON** — parse-check before reading.
- **Never reintroduce faceted node geometry** while fresnel rims exist.
- **The IMF DSBB aggregator is useless to a non-JS fetcher**; national NSDP
  mirrors work.

---

## 8. The one cross-lane dependency

**Do not finalise the palette until the mint lands.** `palette-proposal.json`
damps each family's chroma by its corpus share, measured at 1,250 nodes; the
staged import moves SA to a major family and adds IL/SG outright. Palette v3
took this debt knowingly — after minting, re-count and re-damp.

---

## 9. How to hand off

1. `cp HANDOFF.md "archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-<topic>.md"`
   (agents cannot `mv`/delete on the device; Thomas removes the original, or
   the new file simply overwrites it).
2. Write a fresh `HANDOFF.md` here — §1 "Read these first" always first.
3. Carry forward what is live; delete what is finished. A handoff that
   accumulates is a handoff nobody reads.
4. Write the project-memory entry if memory works; if not, park it in `notes/`
   and say so here. It was down for all of 2026-08-20 — see
   `notes/memory-pending-2026-08-20.md`.

Only one `HANDOFF.md` at the top level, ever.
