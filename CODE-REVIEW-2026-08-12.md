# Code review — full read of the graph codebase, 2026-08-12

**Written by the Claude session of 2026-08-12 (evening), at Thomas's request:** read
everything, find improvements, suggest features, consolidate everything left into one
todo list, and be honest about what breaks on the way to thousands of nodes.

What was read: all of `src/` (App.tsx, all twelve components, all ten lib modules, the
data loaders and seed files), all four scripts, the configs, all seven handoffs, the
planning docs, REPORTS.md/START-HERE/README, and the project memory. What was run, in a
fresh sandbox install from today's tree: `tsc --noEmit` (clean), `npm run validate`
(exit 0, every invariant green), `npm run build` (clean), plus timing probes and two
targeted bug repros described below. Nothing in the repo was modified — this document is
the only new file.

**Measured state:** 728 reports · 811 dependencies · 17 relations · 85 isolated ·
539 dropped notes (102 leads) · 101 of 811 edges carry a `reference_period` (12%) ·
production bundle 4.36 MB in one chunk (1.18 MB gzipped), of which the research corpus
is ~3.5 MB.

---

## 1. Honest overall assessment

This is an unusually healthy codebase, and I want to be specific about why rather than
just say so. Three habits are doing most of the work. First, invariants are *checked*,
not asserted: the validator rebuilds the graph without commercial nodes, without termini,
without implied edges, and under per-node weight scaling, and demands bit-identical
scores each time — so the project's central promises (evidence-only ranking, toggles
that reshuffle nothing) are enforced by machinery, not by discipline. Second, decisions
carry their reasoning with them, in comments and handoffs, which is why this review could
distinguish "open" from "already decided" at all. Third, failures get converted into
guards — the cast-not-parsed runtime lists, the `cadence_note` check, the duplicate-edge
build failure all exist because something specific went wrong once.

The honest criticisms, before the praise gets comfortable. One: **there are no standing
tests.** Every regression so far was caught by ad-hoc harnesses, screenshots, or you
noticing — and the date-math landmine in §3.1 below is exactly the kind of thing a
30-line test file would have caught at writing time. The project has paid for this
repeatedly (the tautological retention check that could never fail, the green recovery
suite that passed while the far-plane bug was live). Two: **the narrative comments are a
real asset that is starting to drift.** The "instanced particle system" comment in
InfluenceGraph.tsx describes something the library does not do (§3.2); Environment.tsx
still positions the grid "clear of the platform slab" that was deleted sessions ago;
OPEN-THREADS still lists the domain filter as not-greenlit when it shipped on 08-10; and
MISSION-TODO-2 still tells agents to commit and push, which directly contradicts the
standing git-no-touch rule. Stale documentation in a project this documentation-driven
is a bug class, not a cosmetic issue — the Q20 reconciliation pass you approved is worth
actually scheduling. Three: **the two big files are at the edge of what one file should
hold.** App.tsx (1,860 lines) and InfluenceGraph.tsx (1,685) each contain several
components/concerns that could split out mechanically (Detail/Hud/TierBar/IsolatedShelf
are all in App.tsx). Not urgent, and the comments make them navigable — but every future
session pays a reading tax on them.

The architecture itself — data → validate → PageRank → disclosed graph → renderer, with
filtering as a view and collapsing as a second independent axis — is right, and notably,
**the tier system you specified is exactly the correct scaling mechanism.** The default
view at thousands of nodes will still be ~160 objects. That decision has already solved
the hardest part of your 1000s-of-nodes ambition.

---

## 2. Where it will actually hurt at 1000s of nodes

I timed the pipeline and read the renderer's internals so this section is measurement,
not vibes.

**The data pipeline is a non-problem.** At 728/811: `validate()` 9 ms, `buildGraph()`
including PageRank 30 ms, disclosure 1 ms, `buildDisclosedGraph` 2–3 ms. All of these
are linear-ish in nodes+edges; at 5,000 reports they stay comfortably under half a
second, once, at load. Stop worrying about this layer.

**Draw calls are the real wall.** Every node is its own Mesh with its own material and
its own geometry; every link is its own cylinder with its own ShaderMaterial; and — I
read three-forcegraph's source to confirm — each pulse photon is its own mesh too
(sharing your teardrop geometry/material, but not instanced; the comment claiming "one
instanced particle system" is wrong). At tier 4 today that is roughly 643 node meshes +
811 link meshes + ~1,500–2,000 photons ≈ **3,000+ draw calls**, plus bloom. Real GPUs
tolerate this at current scale; at 3,000 nodes / 4,000 edges fully unfolded you'd be
near 12,000 draw calls and it will chug on ordinary hardware. Mitigations in cost order:
(a) rely on the tiers — already built, already the answer for the *default* view;
(b) share six unit geometries (one per tier shape) and bake radius into `mesh.scale`
instead of into per-node geometry — cheap, kills ~700 geometry allocations, touches only
`nodeGeometry`/`nodeThreeObject`; (c) true instancing per shape with per-instance
colour/dim attributes — the eventual answer for tier-4-at-5k, but a genuine rewrite of
nodeVisuals and the focus path, so not worth it until (a)+(b) visibly stop being enough.

**The force simulation will slow before it breaks.** d3-force-3d is Barnes-Hut
(n log n) per tick, but ticks run on the main thread inside `useFrame`, and the
progressive-settle design means slow machines just settle longer (the wall-clock refit
window already handles this correctly). The standard escape once tier-4 settling gets
painful — think 2,000+ simultaneously simulated nodes — is moving the simulation to a
Web Worker and streaming positions back. That is a big, invasive change (it bypasses
three-forcegraph's own engine), so treat it as a "when tick rate at tier 4 drops below
~15–20/s on your machine" decision, not a now decision. A tiny FPS/tick-rate readout
behind a debug flag would tell you when that day arrives instead of letting it surprise
you.

**The bundle grows linearly with research.** The corpus is statically imported, so all
3.5 MB of JSON ships in one 4.36 MB chunk parsed before first paint. At triple the
corpus you're at a ~10 MB chunk on every load. Two cheap moves: `manualChunks` to split
vendor (three.js/react) from data, and loading the corpus with a dynamic `import()` so
the shell paints while data streams in — which also gives you a natural place for a
loading indicator. Neither changes any data format.

**Two small O(n) habits worth pre-empting, not fixing today:** search re-normalises
every field of every node on every keystroke (fine at 769, noticeable at 5,000 — a
prebuilt normalised index is a 20-line change), and `runFit` allocates fresh Vector3s
per node per tracking fit (GC churn during settle windows; hoist two scratch vectors).

---

## 3. Specific findings from this read

**3.1 A latent date-math bug in schedule.ts that will fire as reference_period coverage
grows.** `calendarEvents` spaces multi-reading edges by `12 / readings_per_year` months
and hands the *fractional* result to `addMonthsIso`, which does integer month
arithmetic. I tested it: `addMonthsIso('2026-10-31', 1.5)` returns the string
`"2026-11.5-30"` — a malformed date that then flows into sorting, window comparison,
and `describeWindow` (where `MONTHS[10.5]` is `undefined`). Today **zero** edges trigger
it, because every anchored edge happens to have a readings_per_year that divides 12 —
but your single most important edge shape (Bank of Canada, 8 readings/year) triggers it
the moment anyone adds an `ends` anchor to one. Fix is small (either round the running
total in days, or step `i * spacing` from the anchor and round to a real date), and it
should land *before* the reference_period expansion pass, with a regression test.

**3.2 The "instanced particle system" comment is wrong.** three-forcegraph builds one
mesh per photon (`particleGeometry = customObj.geometry` — shared geometry, individual
meshes). Geometry/material sharing means it's not as bad as naive, but the comment
promises a performance property the code doesn't have. Fix the comment so a future
scale investigation doesn't rule out the true culprit.

**3.3 Dead code and a stale table: 34 of 80 countries have no COUNTRY_LABEL entry**
(AU, NZ, BR, ZA, every African country, the Realm and Compact states, GL, PR) — and it
turns out `countryLabelFor`, `colourFor`, and `countBy` are imported by *nothing*, so
the table's gaps are invisible. Meanwhile the `Flag` component falls back to the globe
mark with `aria-label="International"` for all of them — so a Ugandan CPI hover card
carries a mark that literally says International. The palette file's own rule ("add a
name when the country gets its first node") stopped being followed the day the corpus
outran Europe. Either wire `countryLabelFor` into the hover card and backfill the 34
names in one sitting, or delete the dead exports; and give Flag's fallback an honest
label (the country code) instead of "International".

**3.4 Relations crossed their own rendering threshold.** The rule on file
(OPEN-THREADS 4.3) deferred rendering `relations` until there were five. There are now
**17** — including the corpus's first `supersedes` chains and the NZ/US audit-export
finding the schema was built to hold — and they are still invisible everywhere except
the validator printout. The agreed shape already exists in the notes: hover card +
search + a distinct unweighted line style. This is now the largest documented feature
whose own precondition has been met.

**3.5 Search-during-settle still drops the flight.** The `flyTo` effect returns early
when `!fitted.current` and never retries (OPEN-THREADS 4.2). The progressive-paint
rework shrank the window to ~30 ticks, so it's rarer now — but a search fired
immediately on load still selects without flying. Queue the request (a one-ref change:
stash and replay on first fit) or ignore as too rare; just decide, since the note has
carried three sessions.

**3.6 Two "isolated" definitions have quietly diverged.** The shelf/scene define
isolated as no *dependency* edges; nodes carrying only a `relation` (e.g. the UKSPF pair
joined by `supersedes`) therefore sit on the unlinked shelf even though the corpus
records a documented relationship. Correct by construction, misleading on screen —
worth resolving as part of 3.4, since drawing relations is what makes the distinction
visible.

**3.7 Small hygiene, batched:** Environment.tsx's grid comment references the deleted
platform slab; `isolatedShelfWrap` sets `pointerEvents: 'none'` on a container whose
scrollbar can't be grabbed once the shelf actually overflows (fine at 85 dots in 4 rows,
wrong at a few hundred); CalendarPanel rebuilds a `byId` map that `graph.byId` already
provides. None matter today; all are one-line fixes when passing through.

**What I looked for and did not find:** memory leaks in the mesh maps (the
prune/recreate cycle against three-forcegraph's digest is sound — I checked the
library's create/visibility path), stale-closure bugs (the ref discipline is
consistent), edge-key collisions in the orb remapping (multiple edges sharing an
orb-pair key collapse to one material entry, which is harmless because the colours are
identical by construction), and any way for relations, `part_of`, or implied edges to
reach the ranking (the structural isolation holds everywhere I traced it).

---

## 4. Feature suggestions

Ordered by value-per-effort, and filtered against your standing decisions — nothing
below contradicts a ruling; two items explicitly need your yes/no first.

**Global "by level" filter row** — flagged in three consecutive handoffs, described by
you in your own words ("if i want to cut the municipal noise out across the world"),
and still eight clicks instead of one. A single row of level toggles that flips every
`*:municipal` (etc.) scope at once. Smallest high-value item on the board; pairs
naturally with the tier bar (tiers answer "how deep", this answers "which rungs").

**Draw the relations** (§3.4). Seventeen documented, zero rendered.

**Aspect-ratio-aware fit.** `runFit` fits the vertical FOV only; a narrow window crops
horizontally. Known, cheap, uncontroversial.

**The upstream/downstream channel** — the project's core interactive claim ("what rests
on this" vs "what this rests on") still renders as one undifferentiated lit set. The
measurement on file says dimming has nothing left to give, so the channel must be on the
lit side. Cheap candidate consistent with existing machinery: tint the *rim* of focused
nodes by direction (warm = feeds into, cool = built from — rim is already a per-material
uniform), and/or bias pulse visibility to the downstream cone. This is a design
decision you set as planning-only, so: options to discuss, not code to expect.

**Ship the calendar's data somewhere you actually live.** The release-schedule pass
finished — every recurring report has a sourced schedule, which is a dataset almost
nobody else has. Two small features would cash it in: an .ics export ("subscribe to
everything this filter shows" — your phone then knows the CPI drops on the 17th), and a
"this week" strip on the calendar tab showing count-due-soon without opening the panel.

**Shareable view state.** Encode drilldown + filter + selection (and optionally camera)
in the URL hash, restore on load. The stated goal of the current phase is a graph
legible *to someone other than you* — being able to send someone a link that opens on
tier 2, Canada-only, CPI traced, is the cheapest possible version of that goal. Also
makes your own bug reports one link instead of a repro recipe.

**A pure-logic test file wired into `npm run validate`.** Not a testing framework —
one `tsx` script asserting the things that have already bitten or nearly bitten:
schedule date arithmetic (§3.1), `resolveId`/`toggleDrilldown`, `toggleIn`, search
ranking, `describeWindow` fiscal-year edge. Maybe forty assertions. The project's own
history (validator invariants catching real drift repeatedly) is the argument that this
pays for itself.

**Perf telemetry behind a debug flag** — FPS, sim tick rate, draw-call count, rendered
node/link counts. Ten lines with `renderer.info`. This is the instrument that tells you
*when* the §2 escalations (instancing, worker) stop being theoretical.

**Loader ergonomics for the grind ahead:** `import.meta.glob('./research/*.json',
{ eager: true })` replaces the 106-line hand-maintained import list and the
three-places-to-edit checklist per slice. Safe now that duplicate edges fail the build
(ordering no longer decides winners silently); keep the seed imports explicit so
first-wins stays meaningful. Worth doing before the next 50-slice branch, not after.

Deliberately **not** suggested: community detection (declined, Q11), any layout force
beyond the geo-affinity you already redesigned (position rule; "lets not fuck with it"
stands), per-branch drilldown (declined 08-12), fold-on-node-double-click (never again),
transmission-driven pulses *now* (held at Q9 until coverage — see todo).

---

## 5. Consolidated todo — everything left, one list

Deduped across all seven handoffs, OPEN-THREADS, REPORTS.md, project memory, and this
review. Sources in brackets. Items marked ⚖ need a decision from you before anyone
codes.

### Blocked on you (quick calls)

1. ⚖ `ng-nbs-cpi-rebasing` — nominal `releases_per_year` for an irregular-rebasing
   one-off (your Q2 convention; needs your number). [release-schedule handoff]
2. ⚖ `nz-mbie-tif` — discontinued programme: keep `releases_per_year` as history or
   remove? Sets the corpus-wide convention for dead programmes. [same]
3. ⚖ `tea-foundation-school-program` — evidence says ~4–6 updates/yr vs 1 on file; no
   clean number in the source. [same]
4. ⚖ Four held-back URL suggestions (2× ECB, `ladwp-rate-adjustment-factors`,
   `nato-defence-expenditure`) — apply, adapt, or drop. [batch 12]
5. ⚖ Pick the next branch: US subnational / Africa hubs (AFRISTAT — approved Q17,
   smallest, best payoff) / RU+CN greenfield / non-EU-Europe depth / usability-review
   continuation. [five-priority menu]
6. ⚖ Ground grid: default-on stays? And is P0.2's bounding-box ask "delete" or
   "already fine (off by default)"? [HANDOFF-2026-08-11 §8.4]

### Graph view — known, unblocked

7. Global "by level" filter row. [3 handoffs; §4]
8. `runFit` aspect-ratio fix. [polish handoff §5.3]
9. Render relations (17 ≥ threshold of 5) — hover card, search, distinct line. [§3.4]
10. Upstream/downstream focus encoding — design options first (planning-only). [§4]
11. Extend `focusPalette` into the 3D scene (today sidebar-only). [HANDOFF-08-11 §8.6]
12. Verify domain filter under combined scope+domain filtering. [HANDOFF-08-11 §2]
13. Re-check calendar assumptions now schedule coverage is total, not sparse
    (five-minute look). [release-schedule handoff §3]
14. Queue-or-drop decision on search-during-settle flyTo. [§3.5; OPEN-THREADS 4.2]
15. EU vs XEU distinguishability (P0.4) — hue is exhausted; shape/fill are the free
    channels. [HANDOFF-08-11 §8.5]
16. Soften authority→radius exponent — still open from P3.4; scale half already fixed.
17. Watch: the unreproduced runaway zoom. Capture protocol documented (camDist /
    fitSync.distance over time; does it pin at 2.6?). [polish handoff §3]
18. Test the untested zoom-loop openers: auto-orbit, node drag, spread/geo-affinity
    extremes, window resize. [polish handoff §3]

### Data debt

19. The 8 seed edges with no `evidence_url` (BoC/Fed cluster) — per-edge: find the
    document, delete, or demote to implied. Completeness now, not connectivity.
    [REPORTS.md "Still genuinely open"]
20. `reference_period` expansion — 101/811 (12%). This is the gate on Q9's pulse
    retarget *and* the calendar's read events; the highest-leverage research seam in
    the corpus. [Q9; §2]
21. Batch-12's ~44 candidate dependency-edge leads — the detail file was
    session-local; re-derive from the memory record if wanted. [batch 12]
22. Verification debt: NZ LGA 2002 Sch. 10 re-extraction; AU `cgc-gst-relativities` /
    `abs-erp` unverified extraction; AU GFS manual/release node-split (only if needed).
    [OPEN-THREADS §5]
23. COUNTRY_LABEL backfill (34 countries) + Flag fallback label + wire-or-delete the
    dead helpers. [§3.3]
24. Mutual pairs: two instances, opposite signs — keep watching, don't manage yet.
    [REPORTS.md]

### Code health / scale preparation

25. Fix the fractional-month date bug **before** the reference_period pass, with a
    test. [§3.1]
26. Standing pure-logic test script in `npm run validate`. [§4]
27. Bundle: vendor/data chunk split + async corpus import with load progress. [§2]
28. Shared unit geometries per tier shape (radius via scale). [§2]
29. Perf debug HUD (fps / tick rate / draw calls). [§4]
30. `import.meta.glob` for research slices. [§4]
31. Comment/doc drift pass: instanced-particles comment, Environment slab reference,
    OPEN-THREADS 4.4 (domain filter shipped), MISSION-TODO-2's git-policy line vs the
    standing git-no-touch rule — this is the approved-but-unrun Q20 reconciliation.
    [§1; §3.2]
32. Apply-script gap: `CADENCE_NOTE_OVERRIDE`-style overrides can't *insert* a missing
    field — fix the pattern before the next structured-field pass. [batch 12]
33. Isolated-shelf scroll + definition mismatch, alongside item 9. [§3.6, §3.7]
34. Someday, by instrument not by calendar: instancing (when tiers+shared geometry stop
    being enough) and worker-side simulation (when tier-4 tick rate drops below
    ~15–20/s on your machine). [§2]

### Watching / deliberately parked (so nobody re-proposes them)

Evergreen nominal-rate convention (settled; check `cadence_note` before flagging);
continental repulsion (declined — geo-affinity is the replacement, default off);
community detection (declined); per-branch drilldown (declined); edge arrows (parked as
a future toggle, 4.8); the two deliberately-unadjudicated EU documentation conflicts;
re-layout policy when data is added and cadence-in-layout (both genuinely open questions
in REPORTS.md with no forcing event yet).

---

## 6. Conclusion

You asked for honesty, so, plainly: the foundations are better than most professional
codebases I read — the evidence rule, the invariant-checked validator, and the
decision-history habit compound with the corpus, and the tier architecture has already
answered the scariest scaling question. Nothing here needs rescuing.

The real risks are specific and none of them are the data model. Rendering cost is the
wall at thousands of nodes (draw calls first, simulation second, bundle third), and the
right response is the boring one: keep the tiers as the default experience, take the
two cheap wins (shared geometries, bundle split), add the little perf readout, and
don't buy instancing or a worker until the instrument says so. The date-math landmine
(§3.1) is the one thing I'd fix this week, because the reference_period expansion —
which is also your highest-leverage research seam — walks straight into it. And the
absence of tests plus the beginnings of comment drift are the two habits to correct
while the codebase is still small enough that correcting them is cheap.

On features: the three that most serve "legible to someone other than Thomas" are the
by-level filter row, rendered relations, and the shareable link — and the calendar
export is the one that turns your just-completed schedule pass into something no other
tool can do. The upstream/downstream channel remains the most important unsolved design
problem, and it's yours to decide before anyone builds it.

Growing to thousands of nodes will hurt in places, but they're now mapped, instrumented
or instrumentable, and none of them are architectural. Keep going.
