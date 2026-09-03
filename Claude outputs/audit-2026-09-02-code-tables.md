# Audit supporting tables (2026-09-02, read-only, /home/claude/repo)

## T1. Top-5 file measurements

| file | lines | bytes | comment lines | code lines | exports | useEffect/useLayoutEffect | useMemo | useRef | useState | useCallback | top-level fns | "never"/"deliberate"/"don't re-raise" | dated (YYYY-MM-DD) comments | "Thomas" mentions |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| src/components/InfluenceGraph.tsx | 3,572 | 179,507 | 2,197 (61%) | 1,209 | 5 | 19 (+1 useLayoutEffect) | 4 | 44 | 2 | 0 | 4 module fns + 14 closure fns | 79 | 69 | 42 |
| src/App.tsx | 3,494 | 146,296 | 1,128 (32%) | 2,190 | 1 (default App) | 9 (+1 layout) | 28 | 5 | 31 | 17 | 14 (+9 sub-components) | 37 | 58 | 21 |
| src/lib/palette.ts | 1,439 | 72,039 | 880 (61%) | 463 | 25 | – | – | – | – | – | 9 | 16 | 65 | 10 |
| src/lib/types.ts | 1,127 | 56,835 | 837 (74%) | 257 | 31 | – | – | – | – | – | 0 | 27 | 38 | 24 |
| src/lib/graph.ts | 1,278 | 56,104 | 523 (41%) | 708 | 21 | – | – | – | – | – | 16 | 14 | 22 | 1 |

Method: `wc -l/-c`; comment lines = lines starting with `//`, `*`, `/*`; grep counts on `useEffect(` etc.; "never" = `\bnever\b|don'?t re-?raise|deliberate` (case-insensitive).

## T2. InfluenceGraph.tsx responsibility map (line ranges)

| lines | responsibility |
|---|---|
| 70–202 | `LinkDatum` / `PositionedNode` data model (belongs in lib) |
| 203–431 | ~35 tuning constants with essays (halo px, hover, labels, tick gates, refit windows, orb breath) |
| 432–600 | pure sizing/pulse functions: `nodeScaleFor`, `baseLinkWidth`, `pulseSpeed`, `pulseCount` |
| 582 | module-scope `LINK_SCALE_APPLIERS` WeakMap |
| 626–700 | `fitSync` module singleton, `GraphBounds`, `FlyTo` |
| 785–1138 | 44 refs, prop→ref mirroring, `spreadApplied` debounce, `__rig` dev hook, label sprites |
| 1140–1970 | the `forceGraph` memo (830 lines): node seeding (1201–1260), link merge + stiffness model (1272–1455), material/particle factories (1459–1546), library accessors (1548–1737), scale applier (1747–1760), physics tuning: charge/center/link/collide/geoAffinity/galaxy/clusterRepulsion/intAnchor (1770–1965) |
| 1978–2068 | registry swap, layout effect, `onEngineStop` reheat policy |
| 2080–2160 | OrbitControls gesture ownership, visibility refit, reset |
| 2205–2600 | camera fit: `measureFit`, `runFit`, `cameraMovedOffFit`, `requestRefit` |
| 2644–2830 | 9 view-setting mutation effects (edges, geo, galaxy, repulsion, visible set) |
| 2832–2960 | lens/level recolour, `focusEmissive`, `applyFocus`, pulse/flow focus |
| 2972–3035 | search flight |
| 3037–3377 | `useFrame`: tick, position record, fit state machine, ready latch, flight, orb breath, hover ease, halos, label placement + collision, focus re-apply |
| 3388–3428 | screen-space edge picker |
| 3439–3548 | pointer handlers |
| 3550–3572 | JSX |

## T3. App.tsx responsibility map

| lines | responsibility |
|---|---|
| 44–130 | module-scope startup reads (`STARTUP_VIEW` via `loadViews()`, `DEEP_LINK`), group tables |
| 185–244 | empty corpus, issue logging |
| 245–420 | corpus fetch + 31 `useState` declarations |
| 427–680 | derived graph pipeline: disclosedGraph → predicate → focus indexes → visible set → focus (16 memos) |
| 682–870 | hover card placement, edge card, bounds/zoom handlers |
| 897–1110 | 14 handler callbacks (choose, toggle, tier, fold, reset...) |
| 1109–1230 | isolated shelf, legend colours, counts |
| 1233–1415 | compact layout, panels persistence, unlinked list, saved views, curtain |
| 1418–1875 | JSX: menubar, Canvas (lights, InfluenceGraph, OrbitControls, CameraZoom, EffectComposer, PngExport), HUD, cards, dock |
| 1887–2372 | `EdgeEvidence`, `HoverChip`, `Detail` (340 lines) |
| 2373–2555 | `DomainPanel`, `ListBlock` |
| 2556–2738 | `TierBar`, `IsolatedShelf` |
| 2739–3113 | `Hud` (300 lines), `LegendRow` |
| 3114–3494 | 30 CSSProperties style objects |

## T4. Module-scope / shared mutable state (B2)

Legend: SM = StrictMode double memo/effect; FR = Vite Fast Refresh re-evaluation; 2I = two ThreeForceGraph instances briefly.

| where | holds | writers | SM | FR | 2I | risk |
|---|---|---|---|---|---|---|
| InfluenceGraph.tsx:582 `LINK_SCALE_APPLIERS` WeakMap<fg,fn> | per-instance width applier | memo body | safe (keyed by instance) | safe | safe | none |
| InfluenceGraph.tsx:626 `fitSync` {distance,stamp,userOwnsCamera} | last fit distance for CameraZoom | `runFit` | safe (only mounted instance runs runFit) | stale until next fit | safe | COSMETIC |
| InfluenceGraph.tsx:1062 `meshes` ref → per-instance `__meshes` (1967/1979) | node meshes by id | `nodeThreeObject`, visible-effect `delete` (2799) | fixed 2026-09-01; 1-frame window between layout commit and passive effect where `runFit` can scale the old map | memo re-runs → new instance, effect re-points | orphan builds its own map, never read | fixed; residual COSMETIC |
| InfluenceGraph.tsx:1065 `linkMaterials` ref | ShaderMaterial per link key | `.clear()` + refill inside memo (1462–1504) | LAST (orphan) run wins; mounted instance's accessor reads orphan-run materials by key — works by accident of stable keys | same | same | BITES-IN-6-MONTHS (any per-instance field on the material breaks silently) |
| InfluenceGraph.tsx:1042 `linkDataRef` | LinkDatum[] for picker | memo body | orphan's array wins (dead code anyway, see B2-3) | same | same | see B2-3 |
| InfluenceGraph.tsx:816 `prevGraphForLayout` | last graph identity → `spreadOnlyChanged` | memo body (1202) | 2nd run sees `=== graph` → orphan unseeded; kept (1st) run correct | Refresh re-runs memo with same graph → mounted graph cold-starts, seeds skipped | – | COSMETIC (dev) |
| InfluenceGraph.tsx:1029 `hoveredLinkKeyRef` | hovered key | memo body nulls it | fine | fine | fine | none |
| InfluenceGraph.tsx:806 `lastPositions` Map | every id ever positioned | useFrame every frame (3060) | fine | survives | fine | grows to corpus size; allocs per frame (B3) |
| linkVisuals.ts:118 `flowMaterials` Set | beam materials to animate | `gradientLinkMaterial` adds, `resetLinkFlow` clears (memo 1467) | orphan run clears+refills → consistent with `linkMaterials` (both last-run) | module re-eval empties Set while old materials still mounted → beams freeze until next rebuild | – | COSMETIC (dev) / coupling smell |
| linkVisuals.ts:298 `teardropCache`, 332 `pulseMaterials`, 367 `blinkingPulseMaterials`; nodeVisuals.ts:419 `sphereCache` | permanent geometry/material caches keyed by size/colour | factories | safe (idempotent) | re-eval → duplicates GPU objects, old never disposed | safe | COSMETIC |
| linkVisuals.ts:227 `dim` | constant colours | none | safe | safe | safe | none |
| search.ts:132/231 WeakMap caches | normalised fields | `search` | safe | safe | safe | none |
| hierarchy.ts:239 `EMPTY_COUNTRIES` ReadonlySet | shared empty set | none | safe | safe | safe | none |
| geoAffinity.ts:207 `CONFLICT_KEYS`, regions.ts tables, palette tables, modes inks | constant | none | safe | safe | safe | none |
| App.tsx:60 `STARTUP_VIEW` (calls `loadViews()` → localStorage at import) / :77 `DEEP_LINK` (window.location) | startup state | module init | safe | re-eval re-reads; `DEEP_LINK` becomes null after `clearDeepLinkFromAddressBar` — state initialisers don't re-run anyway | – | COSMETIC (dev) |
| custom forces (`galaxyForce`, `clusterRepulsionForce`, `countryAffinityForce`, `intAnchorForce`) | `nodes` array via `initialize`, strength via ref | d3 | per-instance closures | fine | each instance owns one | none |

No module-scope `let` exists anywhere in src/ (grep `^(export )?let ` → 0 hits).

## T5. Per-frame work (steady state, layout settled, full "Everything" tier: 2,372 scene nodes, 2,748 links, ~3,048 photons)

| site | per-frame cost | allocations |
|---|---|---|
| three-forcegraph `tickFrame` → `updatePhotons` (dist mjs 950–1010) | per link: closure + `[].concat` of photons; per photon: interpolate + `lookAt` (matrix) | ~2,748 arrays + ~3,048 pos objects |
| InfluenceGraph.tsx:3058–3061 | loop all nodes, `lastPositions.set(id, {x,y,z})` | 2,372 objects/frame (~140k/s at 60 fps) |
| 3190–3206 orb/continuous breath | loop all meshes (map iteration), writes only orb/soft | 0 |
| 3331 label placement | `[...labelSprites].sort(...)` + `placed` array + rect objects | ~16 labels: small |
| 3376 `applyFocus` guard | size compare | 0 |
| during tracking window (12 s or until settled) 3105–3131 | `measureFit()` every 0.2 s: ≈5N `new Vector3` + 2 sorts of N + `onBounds` → App `setBounds` (App re-render) | ~12k Vector3 per call |
| `runFit` → `LINK_SCALE_APPLIERS` when scale moved >1% (2523–2527) | `fg.linkWidth(...)` re-assign → library `linkDataMapper.clear()` (dist 1199–1201): every link Mesh disposed and re-created, photons re-digested | full L rebuild, up to 5×/s while the cloud expands |
| drift watchdog (3136–3145) | `measureFit()` every 2 s forever while tracking owns the camera | ~12k Vector3 per 2 s |
| while engine running (`layoutTick`, dist 760–850) | per link: 2 `new Vector3`, `distanceTo`, `lookAt` | 5.5k Vector3/tick |
| d3 tick | charge (Barnes–Hut, N log N), link (L), collide ×2 iterations (octree), galaxy (2N + Maps), clusterRepulsion (2N + 2×C² with C=12 families/184 countries → 34k pair ops), geoAffinity (2N + 184² = 34k `affinityScore` calls), intAnchor (N) | Maps rebuilt per tick per force |

## T6. Test coverage map (scripts/test-logic.ts, 123 `ok()` checks)

Sections by check count: selection 38, filter 27, hierarchy 19, schedule 17, search 8, graph 6, galaxyForce 5, geoAffinity 3. (`validate` is also exercised inside the filter/hierarchy fixtures — 18 call sites overall; `buildGraph` 12.)

| module | exported functions | tested (≥1 direct call) | untested | est. coverage |
|---|---|---|---|---|
| view.ts | 0 functions (constants + `ViewSettings`) — fit/measure logic lives as closures in InfluenceGraph.tsx 2205–2600 | – | `measureFit`, `runFit`, `cameraMovedOffFit`, `nodeScaleFor` are untestable where they sit | 0% |
| filter.ts | isFiltering, compile, applyFilter, isolateFirstToggle | all 4 | – | 100% |
| deepLink.ts | buildDeepLink, readDeepLink, clearDeepLinkFromAddressBar | none | all (round-trip encode/decode never asserted) | 0% |
| savedViews.ts | loadViews, persistViews, newViewId | none | all (`restoreOne` schema tolerance never asserted) | 0% |
| selection.ts | edgeKey, buildFocusIndex, computeFocus, computeNeighbourhoodFocus, shortestPath, computeGroupFocus | 5 (edgeKey only indirectly) | edgeKey (direct) | 83% |
| hierarchy.ts | tierOf, orbId, isFamilyOrbId, countryOrbId, isCountryOrbId, isOrbId, familyFromOrbId, countryFromOrbId, resolveId, buildDisclosedGraph, toggleDrilldown, toggleCountryOpen, foldCountry, standingLabels | 11 | familyFromOrbId, foldCountry, standingLabels | 79% |
| graph.ts | isOfficial, isTerminus, isRanked, isDocumented, isBareHost, isIndexPage, validate, pagerank, buildGraph, contains, rolledUpAuthority, describeRate, dependents, dependsOn, disclosureByReport, radiusFor | 6 (pagerank indirectly via buildGraph authority checks) | isTerminus, isRanked, isBareHost, isIndexPage, pagerank(direct), contains, rolledUpAuthority, dependents, dependsOn, disclosureByReport | 38% |
| regions.ts | continentOf, matchesRegionGroup, reportIdsForGroup | 3 | – | 100% |
| schedule.ts | isRealDate, todayIso, cadenceBand, horizonWindow, calendarEvents, readsTriggeredBy, nextRelease, describeWindow | 6 | todayIso, readsTriggeredBy | 75% |
| search.ts | normalise, search, searchGroups | 1 | normalise, searchGroups | 33% |
| geoAffinity.ts / galaxyForce.ts / clusterRepulsion.ts / intAnchor.ts | affinityScore, countryAffinityForce / galaxyForce / clusterRepulsionForce / intAnchorForce | affinityScore, galaxyForce | countryAffinityForce, clusterRepulsionForce, intAnchorForce | 40% |
| modes.ts, autoUnfold.ts | groupOf, lensColourFor / nextAutoUnfoldBatch | none | all | 0% |

## T7. Exports never imported outside their own file (candidates for `no-unused-exports`/knip)

autoUnfold: AutoUnfoldBatch · clusterRepulsion: ClusterRepulsionNode · geoAffinity: CONFLICT_PAIRS, GeoNode · graph: SELF_RETENTION · hierarchy: TIERS, familyFromOrbId · modes: ComparisonGroup, GROUP_OTHER_INK, GROUP_INK, ASIA_PACIFIC_INK, WORLD_INK · palette: SCOPE_LABEL, ALL_SCOPES, GLOW_REFERENCE_Y · regions: CONTINENTS, RegionGroupKind, GroupMatchable · schedule: todayIso, HORIZON_MONTHS, CadenceBand, Unplaceable, CalendarResult, readsTriggeredBy · search: normalise, SearchResult, GroupSearchResult · selection: PathRelation, GroupFocus · types: ReleaseSchedule · useCompactLayout: COMPACT_BREAKPOINT · linkVisuals: EDGE_SOFTEN.

## T8. Scene object counts (computed with tsx from the real corpus via src/data/index.ts, /tmp/audit-code/count.ts)

| view | scene nodes (deg>0 or orb) | links (parallel-merged) | continuous links (beam, 0 photons) | INT-tether links (beam, 0 photons) | photons when nothing is traced | ≈ draw calls (nodes+links+photons) |
|---|---|---|---|---|---|---|
| default tier 1 (everything folded) | 282 | 382 | 1 | 208 | 186 | ~850 |
| Everything (no orbs) | 2,372 | 2,748 | 19 | 575 | 3,048 | ~8,170 |

Corpus: 3,351 reports / 2,748 dependencies; 184 countries, 12 families.
