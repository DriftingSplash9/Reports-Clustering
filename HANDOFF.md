# HANDOFF — working document

**This is the current handoff. There is exactly one, at the top level.**
This file holds *state only* — what's landed, what's live, what's next.
Standing rules, known traps, and architecture now live in `PLAYBOOK.md`
(that file rarely changes; this one does, every turn).

Last updated: **2026-08-26**

---

## 1. Read next

`PLAYBOOK.md` (rules/traps/architecture), then task-specific notes it
routes you to. `REPORTS.md` for the design doc. `git` status: unknown to
agents by design — see PLAYBOOK.md rule 1, don't state it.

---

## 2. Current state

**Live corpus: 3,383 reports · 2,595 dependencies** (cn-stats-law retired this round, see below). `npm run validate`
clean (120/120), `tsc --noEmit` clean, `npm run build` clean (1,497.15 kB) —
re-verified in a fresh sandbox after this round's code changes (fog
removal, soft-edge nodes — see below; no data changes this round).

**Glow is gone (Thomas, 2026-08-25: "the glow slider works but I think the
glow is pointless and should be taken off").** Not just defaulted off —
removed. Bloom is hardcoded to `intensity={0}` in `App.tsx`; the `Glow`
slider is gone from `ViewControls.tsx` and the "View controls" panel hint in
`MenuBar.tsx`; `glow` is gone from `ViewSettings`/`DEFAULT_VIEW` in
`view.ts`; `BLOOM_THRESHOLD_MIN`/`MAX` deleted (nothing reads a threshold
any more). The `<EffectComposer>` stays mounted — `PngExport.tsx` needs the
pipeline shape unchanged, see the comment at its call site — it just never
bleeds light now. `glowInk`/`GLOW_REFERENCE_Y` in `palette.ts` are
unrelated (authority-linked self-lit fill, not this halo) and are untouched.

The Grok research queue (`notes/grok-research-queue-2026-08-22/`) is fully
worked — nothing queued there. Next research work needs a new Grok round
scoped from scratch.

Two candidate fixes for the render-consistency/camera-fit bug are shipped in
`InfluenceGraph.tsx` (premature-stop reheat gate, frame-delta clamp +
visibilitychange refit). Thomas tried to force-trigger either failure mode
on his own machine and couldn't — same as this session's sandbox couldn't
(see Pass 4, `notes/render-consistency-repro-2026-08-25.md`). Since forcing
it doesn't look achievable by anyone, this is no longer a "confirm by
reproducing" item — see Todo #1.

18 of the 37 stale URLs in `notes/stale-urls-2026-08-20.md` (the Singapore
batch — singstat.gov.sg's site restructuring) are fixed this session,
raw-verified per page, applied to `sg-singapore-grok-2026-08.json`'s `url`
fields. Japan (7), Mexico (5), and 6 one-offs are still open.

**Re-fold affordance shipped (old Todo item 8).** An opened country could
only be folded back by a full Reset — now the dock shows an "Opened — N"
pill (bottom-centre, next to Legend) whenever `openedCountries` is
non-empty; it expands into a list with a per-country "Fold" button plus a
"Fold all" footer action. New `foldCountry` in `hierarchy.ts` (removes one
country; `toggleCountryOpen`'s own double-click gesture is untouched and
still only ever adds — see both functions' comments for why an explicit
named-row button doesn't reintroduce the "same gesture, different meaning"
bug that killed the old design). New `src/components/OpenedCountriesPanel.tsx`,
same collapsed-pill/outside-click/Escape pattern as `Legend`/`GroupsPanel`.
Verified: `tsc`/`npm run validate`(120/120)/`npm run build` clean (bundle
1,496.9 kB, +3.4 kB for the new component); a headless Playwright pass
against `vite preview` opened a real country by double-clicking its orb,
confirmed the pill and its list render, clicked "Fold", and confirmed the
country actually re-folded (node count back to 473, pill gone).

**"Why so few?" affordance shipped (old Todo item 7).** A group isolate on a
sparsely-connected region — Middle East, or any thin single country — could
leave only a handful of real reports on screen with nothing on screen saying
why, which reads as a bug even when it's correct. `GroupsPanel`'s collapsed
pill now names the count (`Isolated: Middle East — 25 shown`) and, once
opened, a "Why so few?" note explains the two real causes: some of the
group's own countries are still a folded country-orb (`corb:`) rather than
opened, and/or some of its real reports have no documented cross-border ties
at all and sit in the Isolated shelf. New `groupWhySoFew` memo in `App.tsx`
(reads `disclosedGraph`/`isolated`, not `groupFocus`, since the question is
about the group's own membership); `GroupsPanel.tsx` takes three new optional
props (`shownCount`/`foldedCountries`/`shelvedCount`) so it still works
unchanged for any future caller that doesn't pass them. Verified: `tsc`/
`npm run validate`(120/120)/`npm run build` clean (bundle 1,498.00 kB, +1.14 kB);
a headless Playwright pass isolated Middle East (13 folded countries, 115
shelved reports — both numbers cross-checked against a standalone script over
the live corpus) and separately Bhutan (single-country phrasing: "Bhutan's
own reports are still folded... 2 reports here have no documented
cross-border ties"), confirming both the pill text and the note render
correctly and match the corpus.

**Two of Thomas's six 2026-08-26 data calls executed (items 2 and 6);
three surfaced back to him with new findings (items 3, 4, 5 — see Todo).**

*Item 2 — `br-scn`/`br-ibge-sistema-contas-nacionais` merged, per Thomas's
call to keep `br-ibge-sistema-contas-nacionais` canonical.* `br-scn`'s two
edges (`-> sna-2008`, and `br-cnt`'s inbound edge) retargeted onto
`br-ibge-sistema-contas-nacionais`; that node's description/url/cadence_note
upgraded with `br-scn`'s TIER-A-verified content (it was the thinner Grok
paraphrase, `br-scn` the raw-verified one); `br-scn` removed. Kept the more
heavily-wired id (19 edges vs. 2) as the survivor, so the merge also fixes
which node is actually the corpus's hub for this fact. Both `_dropped` flags
(`brics-g4-partial-2026-08-22.json`, `br-g2-pnadc-siconfi-scn.json`)
annotated RESOLVED rather than deleted.

*Item 6 — `bo-bop -> imf-bpm6` minted, per Thomas's explicit override
("assume it aught to say bpm6").* BCB's own methodology PDF names BPM5, not
BPM6, verbatim, and no `imf-bpm5` node exists to redirect to — this edge is
a directed assumption overriding the literal source text, not a raw-verified
citation, and the `basis` field says so plainly along with pointing at the
overridden quote in `andean-wiring-grok-2026-08.json`'s `_dropped` array.
Worth someone re-checking BCB's current manual edition someday.

*Items 3, 4, 5 — Thomas's stated calls turned out to rest on incomplete
framings once checked, so nothing was executed; see Todo for the surfaced
findings and the decisions actually needed now.* Item 3 in particular: his
"keep `cn-stats-law-impl-regs`" call was based on this session's own earlier
"same shape as item 2" framing, which turned out to be wrong —
`cn-stats-law-impl-regs` is a different document (2017 implementing
regulations), not a duplicate. Flagging that rather than executing it
blind seemed like the right call given what retiring the base law would
have meant.

Sandbox cycle: `npm run gen` (296 slices) → `npm run validate` (0 dangling
notes, clean) → `tsc --noEmit` clean → `npm run build` clean. Pushed to
device via an idempotent Python script (same one run in both places);
sha256 of all five touched files confirmed byte-identical
(`br-brazil-grok-2026-08.json`, `brics-g4-partial-2026-08-22.json`,
`br-g2-pnadc-siconfi-scn.json`, `bo-national-core.json`,
`andean-wiring-grok-2026-08.json`) — one mismatch found and fixed along the
way (a stray `why`/`note` key-name inconsistency introduced by a manual
sandbox patch, harmless to validate but worth keeping the two copies
identical anyway).

Four more of Thomas's 2026-08-26 data/design calls executed (Todo items
2-5 as they stood after the first batch): all four verified end-to-end in a
fresh sandbox (`npm run gen`/`validate`(120/120)/`tsc --noEmit`/`npm run
build` all clean, bundle 1,498.04 kB) and sha256-confirmed byte-identical
against the device copies they were made on directly.

*Item 2 - `cn-stats-law` retired, `cn-stats-law-impl-regs` kept separate.*
Thomas: keep `cn-stats-law-impl-regs` too, reaffirming his original call now
that the base-law/regulations distinction is on the table. `cn-stats-law`
removed from `cn-china-grok-2026-08.json` as a duplicate of the
already-verified `cn-statistics-law` (no edges to retarget - both nodes
were fully isolated). `cn-stats-law-impl-regs` untouched. Flag in
`brics-g4-2026-08-22.json`'s `_dropped` marked RESOLVED.

*Item 3 - `qc-perequation -> isq-vitalite-economique` held, not minted.*
Thomas: don't mint. `_dropped` entry in `qc-quebec-grok-2026-08.json`
changed from `deferred` to `note`, RESOLVED text prepended; the underlying
evidentiary gap (s.5.1 names the index, not ISQ by name) is unchanged, just
no longer being minted over.

*Item 4 - three Andean direction conflicts tossed.* Thomas: toss - kept
each existing corpus edge (`co-comercio-exterior -> co-bop`, `co-emmet ->
co-ipi`, `ec-comercio-exterior -> ec-bop`) as the live direction, rejected
the reversed challenger from `andean-domestic-wiring-batch2.json` in each
pair. In `andean-wiring-grok-2026-08.json`: the three existing-edge
`_dropped` entries flip `caveat` -> `resolved` (also corrects a
copy-paste error in their own original text, which wrongly claimed the
opposite direction "is independently verified... and minted instead" -
it never was, per the corresponding entries below); the three reversed-claim
entries flip `deferred` -> `wrong-direction`.

*Item 5 - "clusters pile toward the centre": force-centre killed, charge
repulsion boosted 33%.* Thomas: set force-centre to 0, and turn up the
inter-cluster push - first pass +10%, then a follow-up call to make it
+33% instead. In `InfluenceGraph.tsx`: `fg.d3Force('center')`
(three-forcegraph's default `d3-force-3d` forceCenter, strength 1,
previously never touched) now has its strength set to 0 - confirmed via
source (`d3-force-3d/src/center.js`) that this force does NOT pull
individual nodes toward the middle; each tick it rigidly translates EVERY
node by the same vector to keep the cloud's own mean position pinned at the
origin, so strength 0 makes that shift an exact no-op. Also answered
Thomas's question in code: a NEGATIVE strength here would not separate
clusters the way `charge` does - because the shift is referenced to the
cloud's own mean, going negative just runs the same uniform whole-graph
translation in reverse, and since a bigger shift makes the next tick's mean
even further off-target, it's an unstable runaway drift, not inter-cluster
repulsion. Left as a comment at the call site so the question doesn't need
re-asking. Separately, `charge` strength (the one force that actually does
separate different clusters - see 2026-08-26's design-discussion findings
below) went `-300 -> -330` (+10%), then on Thomas's follow-up `-330 ->
-399` (+33% over the original -300 baseline, not stacked on top of the
+10%). Both passes verified in a fresh sandbox (`tsc`/`npm run build`
clean each time, sha256-identical to device) with a headless Playwright
screenshot at the Everything tier: scene settles cleanly both times, no
console/page errors, no NaN/exploded layout, and the +33% pass reads
visibly more separated between sub-clusters than the +10% one did. The
centre is still visibly the densest area at +33% (expected: the
shared-hub-node mechanism `galaxyForce`/link-force pulling shared hubs
like sna-2008/imf-bpm6 toward the middle is untouched by a charge tune).
If it's still not enough in ordinary use, the bigger mirrored
inter-cluster force (option (c) below) is still on the table.

**Layout/clustering design discussion opened, nothing built yet
(2026-08-26).** Thomas: "the clusters cluster too much to the centre... it
gets everything jumbled," proposed an invisible keep-out sphere at the
origin (grows with node count, nodes excluded, edges may cross) and asked
separately whether the graph should just "lower the pull to the centre in
general." Grounded the discussion by reading `galaxyForce.ts` and the force
block in `InfluenceGraph.tsx` rather than guessing. Findings: (1)
`galaxyForce` only ever pulls a node toward its OWN family/country
centroid — there is no complementary force pushing DIFFERENT
clusters apart from each other; (2) generic `charge` repulsion is the only
thing separating clusters at all, and it has a hard `distanceMax` cutoff
(420 × spread) beyond which two nodes stop repelling entirely; (3) a
number of high-fan-in hub nodes (sna-2008, imf-bpm6, and the other
international standards) are linked from dozens of countries at once, so
ordinary link-force springs pull them toward the geometric middle and drag
their surrounding clusters in after them — this is the best-supported
mechanical explanation for "jumbled at the centre," not a single monolithic
pull. Separately confirmed `three-forcegraph`'s default `forceCenter()` is
unmodified and still registered — a real "pull toward the centre," but one
that recentres the whole cloud's average position rather than compressing
it, so probably a minor contributor at most. Assessed both of Thomas's
ideas against this and proposed a third: an inter-cluster repulsion force,
the direct mirror of what `galaxyForce` already does, as the most targeted
fix — see Todo for the open decision. No code changed this round; purely a
design conversation per Thomas's own framing ("let's consider... I would
like to hear them too").

**Distance haze/fog is gone (Thomas, 2026-08-26: "too hard on the eyes and
brain"), same treatment as glow — removed outright, not defaulted off.**
No `ViewSettings.fog`, no "Distance haze" slider in `ViewControls.tsx`, no
`scene.fog`/`fogRef`, no hand-rolled fog chunk in the link shader
(`linkVisuals.ts` — dropped `uFogNear`/`uFogFar`/`uFogColour`, the `vDepth`
varying, and the exported `setLinkFog`). The `cloud` ref in
`InfluenceGraph.tsx` existed only to feed fog's near/far planes and is gone
with it. `showHorizon` (the sky gradient) is untouched — Thomas explicitly
kept it ("the horizon is ok though").

**Continuous-database nodes now get the soft-edge treatment; the beam edge
turned out to already exist (old Todo item 3, `notes/node-surface-encoding-
2026-08-19.md`).** Thomas: "give the continuous nodes the beam and soft
edges, forget the bicolor and border treatments." Checking the beam side
first found it was already fully wired — `linkVisuals.ts`'s
`gradientLinkMaterial`/`tickLinkFlow` and `LinkDatum.continuousSource` in
`InfluenceGraph.tsx` were built and live from an earlier session, nothing
to do there. Soft edge was the real gap: `nodeVisuals.ts`'s `nodeMaterial()`
takes a new `soft` option — a second, independent fresnel term (fixed power
1.1, not radius-scaled like the rim's) that fades alpha toward 0 at the
silhouette instead of holding a hard edge, so a continuous source reads as
boundary-less rather than as a report with a border. Wired in
`InfluenceGraph.tsx` off `n.continuous === true`, same `!orb` guard as
`hollow` (and mutually exclusive with it by construction, not a runtime
guard: the validator requires `releases_per_year` on every continuous
report, so `isStandingInstrument` is never true for one). Bordered and
banded stay dropped, per Thomas's explicit call, not parked pending data.
Verified in a fresh sandbox: `tsc`/`npm run validate`(120/120)/`npm run
build` clean (1,497.15 kB — down from 1,498.00 kB, net of removed fog code
against the small soft-edge addition). All edits were made directly
on-device; the sandbox was a disposable build/test copy, not a push-back —
see `_to_delete/README.md`. Headless Playwright confirmed: zero console/page
errors across the run, the View controls panel shows Cluster spread/
Geo-affinity/Galaxy pull/Pulse rate/Horizon with no "Distance haze" entry,
and the scene renders and interacts cleanly (search, tier switching, node
selection, zoom) at multiple zoom levels with no fog-related artifacts. Did
**not** get a pixel-level close-up of one continuous leaf node's soft
silhouette specifically — opening a folded country via a blind 3D
double-click proved too unreliable to land in headless automation after
several tries (a general 3D-picking limitation, not something specific to
this change); the shader logic itself is a minimal, direct variant of the
already-proven rim fresnel technique in the same file, gated by a uniform
that's 0 (no-op) on every node except the ~35-39 continuous ones. Worth
Thomas eyeballing live since it's a subtle effect by design — flag here if
it should read stronger or weaker.

Full narrative for anything above (BRICS G.1–G.4, Canada tier, wiring tier,
prompt 18, new-countries tier) is in `archive/Previous Handoffs/` — this
section only needs to say where things stand now, not how they got here.

---

## 3. Todo (live items only)

### [Thomas] — only you can

1. **Watch for the render-consistency symptom during ordinary use; flag it
   here if it recurs.** Downgraded from "reproduce and confirm" — neither
   you nor this session could force-trigger either failure mode on demand,
   so that was never going to be a clearable bar. The fix is shipped and
   reasoned through against the traced library source; this is now a
   "does it actually recur" watch, not a pending confirmation. Details:
   `notes/render-consistency-repro-2026-08-25.md`.
2. **Did killing force-centre + the charge nudge actually help the
   "piles up at the centre" complaint?** Shipped 2026-08-26 as a cheap
   first pass (see Current State) — force-centre off, charge repulsion
   +33% (after an initial +10% pass, per Thomas's follow-up). The scene
   still visibly clusters at the middle in a headless
   check (expected: the shared-hub-node mechanism is untouched). If it's
   not enough in ordinary use, the bigger inter-cluster repulsion force
   (mirroring `galaxyForce.ts`, previously "option (c)") is still on the
   table — flag it here and it can get built.
3. **Look at the soft-edge treatment on a continuous node live and say if
   it reads right.** Shipped 2026-08-26 (see Current State) but not
   pixel-verified against a specific node — headless automation couldn't
   reliably open a folded country to get a close-up. The fresnel power is
   fixed at 1.1; flag here if it should fade harder or softer.

### [Agent] — next build rounds

3. **New Grok research round** — the 2026-08-22 queue is fully worked;
    next round needs scoping from scratch.
4. **Stale-URL research remainder** — 19 of the original 37 in
    `notes/stale-urls-2026-08-20.md` are still open: Japan (7 reports,
    several ministries — one duplicate URL worth checking whether
    `jp-vital-statistics`/`jp-vital-statistics-detailed` should even be two
    reports), Mexico (5 reports, 3 of which point at one generic landing
    page — worth finding the specific programme pages), and 6 one-offs.
    (The file's own header says "37... genuine 404s" but the itemized list
    only ever summed to 36 even before Singapore's 18 were fixed — flagging
    the count mismatch, not resolved.) `notes/_all-corpus-ids-*.txt`/
    `_all-corpus-edges-*.txt` are id/edge cross-check lists — regenerate
    fresh before the next mint, don't reuse. The two housekeeping items
    previously listed here (tombstoned `src/data/slices.generated.ts`,
    orphaned `.rig-sweep` CSS rule) turned out to already be gone — checked
    this session, nothing left to do on either.

---

## 4. How to hand off

1. Edit **Current state** and **Todo** above directly — overwrite, don't
   append. This file describes the present, not history.
2. Delete finished items from Todo; don't leave them as "DONE" entries —
   that's what `archive/Previous Handoffs/` is for.
3. New standing rule or trap discovered? Add it to `PLAYBOOK.md`, not here.
4. Only copy this file to `archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-
   <topic>.md` before a structural rewrite — not on routine turns, since
   there's no more narrative here to lose.
5. Write the project-memory entry; if memory is down, park it in `notes/`
   and say so here.

Only one `HANDOFF.md` at the top level, ever.
