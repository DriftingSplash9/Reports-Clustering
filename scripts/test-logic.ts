/**
 * Standing pure-logic tests. Run with `npm run test`; also runs inside
 * `npm run validate`, so the checks fire every time the data does.
 *
 * Wired 2026-08-12 (Thomas: "Help me wire this up dude!"). Not a framework —
 * one file of assertions over the pure functions, covering the things that
 * have already bitten or nearly bitten: the fractional-month date bug this
 * file's schedule section would have caught at writing time, the fiscal-year
 * label edge, drilldown resolution, filter toggling, focus walking, search
 * ranking. Every assert states what broke-or-almost-broke to earn its place.
 *
 * Deliberately zero imports from src/data — these test logic, not the corpus,
 * so they stay instant and cannot be broken by a research slice.
 */
import { calendarEvents, cadenceBand, describeWindow, horizonWindow, isRealDate, nextRelease } from '../src/lib/schedule'
import { DEFAULT_DRILLDOWN, TIER_COUNT, buildDisclosedGraph, countryFromOrbId, countryOrbId, isCountryOrbId, isFamilyOrbId, isOrbId, orbId, resolveId, tierOf, toggleCountryOpen, toggleDrilldown } from '../src/lib/hierarchy'
import { NO_FILTER, applyFilter, compile, isFiltering, isolateFirstToggle } from '../src/lib/filter'
import { buildFocusIndex, computeFocus, computeGroupFocus } from '../src/lib/selection'
import { buildGraph, describeRate, isDocumented, isOfficial, radiusFor, validate } from '../src/lib/graph'
import { search } from '../src/lib/search'
import { affinityScore } from '../src/lib/geoAffinity'
import { galaxyForce, type GalaxyNode } from '../src/lib/galaxyForce'
import { continentOf, matchesRegionGroup, reportIdsForGroup, REGION_GROUPS, COUNTRY_GROUPS } from '../src/lib/regions'
import { COUNTRY_FAMILY } from '../src/lib/palette'
import type { Dependency, Report } from '../src/lib/types'

let failures = 0
let passes = 0
function ok(cond: boolean, name: string) {
  if (cond) passes++
  else {
    failures++
    console.error(`  ✗ ${name}`)
  }
}

// ---------------------------------------------------------------- schedule --
ok(isRealDate('2026-02-28') && !isRealDate('2026-02-31') && !isRealDate('2026-13-01'), 'isRealDate: Feb 31 and month 13 rejected')

// The fractional-spacing bug, pinned forever: an anchored edge whose rate does
// not divide 12 (the Bank of Canada shape — 8 readings/year) must emit only
// real, well-formed dates. Before 2026-08-12 this produced "2026-11.5-30".
{
  const reports: Report[] = [
    { id: 'up', title: 'Up', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', releases_per_year: 12, last_updated: null, url: '', domains: [] },
    { id: 'down', title: 'Down', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', releases_per_year: 1, last_updated: null, url: '', domains: [] },
  ]
  const deps: Dependency[] = [{
    source_report_id: 'down', target_report_id: 'up', relationship_type: 'uses_data_from', basis: 'test',
    reference_period: { readings_per_year: 8, window_months: 12, ends: '10-31', stated_as: 'test' },
  }]
  const { events } = calendarEvents(reports, deps, { from: '2026-01-01', to: '2026-12-31' })
  const reads = events.filter((e) => e.kind === 'read')
  ok(reads.length > 0, 'fractional spacing: reads are emitted at all')
  ok(reads.every((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.from) && isRealDate(e.from)), 'fractional spacing: every emitted date is a real YYYY-MM-DD (the 2026-11.5-30 bug)')
  // Integer spacing keeps exact month-stepped anchors (quarterly on the 15th).
  const qdeps: Dependency[] = [{
    source_report_id: 'down', target_report_id: 'up', relationship_type: 'uses_data_from', basis: 'test',
    reference_period: { readings_per_year: 4, window_months: 3, ends: '01-15', stated_as: 'test' },
  }]
  const q = calendarEvents(reports, qdeps, { from: '2026-01-01', to: '2026-12-31' }).events.filter((e) => e.kind === 'read')
  ok(q.map((e) => e.from).join(',') === '2026-01-15,2026-04-15,2026-07-15,2026-10-15', 'integer spacing: quarterly anchor steps by exact months')
  // No anchor → unplaceable, never guessed.
  const na = calendarEvents(reports, [{ ...deps[0], reference_period: { readings_per_year: 8, window_months: 12, ends: null, stated_as: 't' } }], { from: '2026-01-01', to: '2026-12-31' })
  ok(na.events.filter((e) => e.kind === 'read').length === 0 && na.unplaceable.edgesWithoutAnchor.length === 1, 'no anchor: counted unplaceable, nothing invented')
}
ok(describeWindow('2026-04-01', '2027-03-31', 'year') === '2026-27', 'describeWindow: fiscal year straddling December is not called "2026"')
ok(describeWindow('2026-07-01', '2026-09-30', 'quarter') === 'Q3 2026', 'describeWindow: quarter names the quarter')
ok(cadenceBand(undefined) === 'year' && cadenceBand(8) === 'quarter' && cadenceBand(52) === 'week', 'cadenceBand: evergreen→year, BoC 8/yr→quarter, weekly→week')
ok(horizonWindow('week', '2026-08-12').to === '2026-08-19', 'horizonWindow: a week is seven days')
{
  const r: Report = { id: 'x', title: 'x', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', releases_per_year: 12, last_updated: null, url: '', domains: [], release_schedule: { kind: 'published-calendar', entries: [ { from: '2026-08-01', to: '2026-08-01', precision: 'day' }, { from: '2026-09-01', to: '2026-09-01', precision: 'day' } ] } }
  ok(nextRelease(r, '2026-08-12')?.from === '2026-09-01', 'nextRelease: first entry not yet finished wins')
}

// --------------------------------------------------------------- hierarchy --
ok(tierOf('international') === 1 && tierOf('federal') === 2 && tierOf('provincial') === 3 && tierOf('municipal') === 4, 'tierOf: the four rungs')
ok(toggleDrilldown(1, orbId('CA')) === 2 && toggleDrilldown(TIER_COUNT, orbId('CA')) === TIER_COUNT, 'toggleDrilldown: a family orb opens a tier, caps at the deepest')
ok(toggleDrilldown(3, 'statcan-cpi') === 3, 'toggleDrilldown: a real node folds NOTHING (the deleted-every-national-report bug)')
ok(toggleDrilldown(2, countryOrbId('CA')) === 2, "toggleDrilldown: a country orb does NOT also advance the tier — opening one country must not dump every OTHER country's next tier onto the screen")
ok(isOrbId(orbId('EU')) && !isOrbId('eu-something'), 'orb ids namespaced')
ok(isCountryOrbId(countryOrbId('CA')) && !isCountryOrbId(orbId('CA')) && !isFamilyOrbId(countryOrbId('CA')), 'family and country orb ids are namespaced apart, not just both "an orb"')
ok(countryFromOrbId(countryOrbId('MX')) === 'MX', 'countryOrbId / countryFromOrbId round-trip')
{
  const opened = toggleCountryOpen(new Set(), countryOrbId('CA'))
  ok(opened.has('CA') && opened.size === 1, 'toggleCountryOpen: opens the clicked country')
  ok(toggleCountryOpen(opened, 'statcan-cpi') === opened, 'toggleCountryOpen: a real node id is a no-op (same reference back)')
  ok(toggleCountryOpen(opened, orbId('CA')) === opened, 'toggleCountryOpen: a family orb id is a no-op too')
}
{
  // Two families, two tiers; an edge inside a family must vanish (self-loop),
  // one across families must survive remapped to the orbs.
  const reports: Report[] = [
    { id: 'ca-fed', title: 'a', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', last_updated: null, url: '', domains: [] },
    { id: 'ca-mun', title: 'b', publisher: 'p', country: 'CA', jurisdiction_level: 'municipal', region: 'r', description: '', last_updated: null, url: '', domains: [] },
    { id: 'us-fed', title: 'c', publisher: 'p', country: 'US', jurisdiction_level: 'federal', region: 'r', description: '', last_updated: null, url: '', domains: [] },
  ]
  const deps: Dependency[] = [
    { source_report_id: 'ca-mun', target_report_id: 'ca-fed', relationship_type: 'cites', basis: 't' },
    { source_report_id: 'ca-fed', target_report_id: 'us-fed', relationship_type: 'cites', basis: 't' },
  ]
  const g = buildGraph(reports, deps)
  const d1 = buildDisclosedGraph(g, 1)
  ok(d1.nodes.every((n) => isOrbId(n.id)) && d1.nodes.length === 2, 'disclosed@1: everything folded into two family orbs')
  ok(d1.edges.length === 1 && isOrbId(d1.edges[0].source_report_id), 'disclosed@1: within-family edge dropped as self-loop, cross-family edge remapped')
  ok(resolveId(1, reports[0]) === orbId('CA'), 'resolveId: tier not open at all still folds to the family orb, same as before the country fold existed')

  // Tier 2 open, nobody expanded yet: this is the 2026-08-20 fix itself.
  // Before it, every report at an open tier showed as itself — fine at a
  // couple dozen countries, but 139 countries turned that into the "95% of
  // nodes crowded in there" complaint. Now an open-but-unexpanded tier folds
  // by country instead of showing real nodes.
  const d2 = buildDisclosedGraph(g, 2)
  ok(d2.nodes.length === 3, 'disclosed@2, nobody opened: ca-mun still folds to its family orb (its own tier is not open yet); ca-fed and us-fed each fold to their own country orb (open tier, country not expanded)')
  ok(resolveId(2, reports[0]) === countryOrbId('CA'), 'resolveId: tier open but country not expanded folds to the COUNTRY orb, not the real id')

  // Opening CA reveals just ca-fed — us-fed, still unopened, stays folded.
  // This is the per-branch behaviour Thomas explicitly declined on
  // 2026-08-12 for FAMILIES and just as explicitly asked for, for
  // COUNTRIES, on 2026-08-20 once the corpus made a single global "Nations"
  // rung unnavigable.
  const d2ca = buildDisclosedGraph(g, 2, new Set(['CA']))
  ok(d2ca.nodes.some((n) => n.id === 'ca-fed') && d2ca.nodes.some((n) => n.id === countryOrbId('US')), 'disclosed@2, CA opened: ca-fed is real; us-fed stays folded because opening one country must not open any other')
  ok(resolveId(2, reports[0], new Set(['CA'])) === 'ca-fed', 'resolveId: tier open AND country opened resolves to the real id')

  // The old "open the deepest tier and get every real report back" guarantee
  // still holds — it just now also requires every country to be opened,
  // which is the whole point.
  const d4 = buildDisclosedGraph(g, 4, new Set(['CA', 'US']))
  ok(d4.nodes.length === 3 && d4.edges.length === 2, 'disclosed@4, every country opened: everything real again')
}
ok(DEFAULT_DRILLDOWN === 1, 'default drilldown is the top tier')

// ------------------------------------------------------------------ filter --
ok(!isFiltering(NO_FILTER) && isFiltering({ ...NO_FILTER, scopes: [] }), 'isFiltering: null means everything, [] means the user turned it all off')
// Thomas's isolate-first click model, pinned exactly as he described it.
ok(isolateFirstToggle(null, ['a', 'b', 'c'], ['b'])?.join(',') === 'b', 'isolate-first: from all-on, one click isolates ("the one I want isolated I click and it happens")')
ok(isolateFirstToggle(['b'], ['a', 'b', 'c'], ['c'])?.join(',') === 'b,c', 'isolate-first: second click builds the combo')
ok(isolateFirstToggle(['b', 'c'], ['a', 'b', 'c'], ['c'])?.join(',') === 'b', 'isolate-first: clicking a selected unit removes it')
ok(isolateFirstToggle(['b'], ['a', 'b', 'c'], ['b']) === null, 'isolate-first: switching the last one off returns to all, not to nothing')
ok(isolateFirstToggle(['b'], ['a', 'b', 'c'], ['a', 'c']) === null, 'isolate-first: completing the set collapses to null so isFiltering stays honest')
ok(isolateFirstToggle(null, ['a', 'b'], ['a', 'b']) === null, 'isolate-first: isolating everything is not a filter')
{
  const reports: Report[] = [
    { id: 'n1', title: 'a', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', last_updated: null, url: '', domains: ['inflation'] },
    { id: 'n2', title: 'b', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', last_updated: null, url: '', domains: ['labour'], source_kind: 'commercial' },
  ]
  const deps: Dependency[] = [
    { source_report_id: 'n1', target_report_id: 'n2', relationship_type: 'cites', basis: 't' },
  ]
  const g = buildGraph(reports, deps)
  const v = applyFilter(g, compile({ ...NO_FILTER, showCommercial: false }))
  ok(v.nodes.has('n1') && !v.nodes.has('n2') && v.edges.size === 0, 'applyFilter: hiding a node takes its edges with it')
  const v2 = applyFilter(g, compile({ ...NO_FILTER, domains: ['inflation'] }))
  ok(v2.nodes.has('n1') && !v2.nodes.has('n2'), 'domain filter: ANY-match on the carried tags')
  // The implied-edge layer is retired (2026-08-12): the validator must refuse
  // any dependency that tries to carry it back in.
  const issues = validate(reports, [{ source_report_id: 'n1', target_report_id: 'n2', relationship_type: 'cites', basis: 't', evidence: 'implied' }])
  ok(issues.some((i) => i.severity === 'error' && i.message.includes('retired')), 'validate: an implied dependency is an error, pointing at the retirement')
}

// --------------------------------------------------------------- selection --
{
  // a -> b -> c chain plus a cycle c -> a: both cones, cycle-safe.
  const reports: Report[] = ['a', 'b', 'c'].map((id) => ({ id, title: id, publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', last_updated: null, url: '', domains: [] }))
  const deps: Dependency[] = [
    { source_report_id: 'a', target_report_id: 'b', relationship_type: 'cites', basis: 't' },
    { source_report_id: 'b', target_report_id: 'c', relationship_type: 'cites', basis: 't' },
    { source_report_id: 'c', target_report_id: 'a', relationship_type: 'cites', basis: 't' },
  ]
  const g = buildGraph(reports, deps)
  const f = computeFocus(buildFocusIndex(g), 'a', { builtFrom: true, feedsInto: true })
  ok(f.builtFrom.has('b') && f.builtFrom.has('c') && f.feedsInto.has('c'), 'computeFocus: transitive in both directions, cycle does not hang')
  const only = computeFocus(buildFocusIndex(g), 'a', { builtFrom: false, feedsInto: false })
  ok(only.nodes.size === 1 && only.nodes.has('a'), 'computeFocus: both cones off leaves the selection alone in the light')
}
{
  // The exact motivating case for App.tsx's `isolateFocus` (2026-08-20,
  // Thomas: "show just Israel and international connections to and from
  // it"): an Israel-family report cites a Paraguay-family one (the real
  // corpus has this — a MERCOSUR-Israel trade agreement). A scope filter
  // isolated to Israel's family would, correctly for a FILTER, drop that
  // edge — both endpoints must be visible, and Paraguay is not. Isolate is
  // built differently on purpose: it walks `buildFocusIndex(graph, null)`,
  // the UNFILTERED index, so the cross-family edge survives. This pins that
  // difference so nobody "fixes" isolateFocus into reusing the filtered
  // index and quietly reintroduces the bug it exists to avoid.
  const reports: Report[] = [
    { id: 'il-report', title: 'Israel report', publisher: 'p', country: 'IL', jurisdiction_level: 'federal', region: 'Israel', description: '', last_updated: null, url: '', domains: [] },
    { id: 'py-mercosur-israel', title: 'MERCOSUR-Israel', publisher: 'p', country: 'PY', jurisdiction_level: 'international', region: 'r', description: '', last_updated: null, url: '', domains: [] },
  ]
  const deps: Dependency[] = [
    { source_report_id: 'il-report', target_report_id: 'py-mercosur-israel', relationship_type: 'cites', basis: 't' },
  ]
  const g = buildGraph(reports, deps)

  // A scope filter isolated to IL's family drops the cross-border edge —
  // correct FILTER behaviour, and the reason isolateFocus can't just reuse it.
  const ilOnly = applyFilter(g, compile({ ...NO_FILTER, scopes: ['ASIA:federal'] }))
  ok(!ilOnly.nodes.has('py-mercosur-israel'), 'applyFilter: a family-scoped filter drops the cross-border report, as filters should')

  // isolateFocus's own approach — unfiltered index — keeps it.
  const unfilteredIndex = buildFocusIndex(g, null)
  const isolated = computeFocus(unfilteredIndex, 'il-report', { builtFrom: true, feedsInto: true })
  ok(isolated.nodes.has('py-mercosur-israel'), 'isolateFocus model: walking the UNFILTERED index reaches the cross-border report the scope filter would have dropped')
}
{
  // computeGroupFocus: the multi-seed generalisation regions.ts's group
  // isolate is built on (2026-08-20, Thomas: "north america, south america,
  // asia, europe, middle east... IMF, eu, brics"). Three reports: two in the
  // "group" (a synthetic bloc), citing each other, plus one outside the group
  // that one of them also cites.
  const reports: Report[] = [
    { id: 'g1', title: 'g1', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', last_updated: null, url: '', domains: [] },
    { id: 'g2', title: 'g2', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', last_updated: null, url: '', domains: [] },
    { id: 'outside', title: 'outside', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', last_updated: null, url: '', domains: [] },
  ]
  const deps: Dependency[] = [
    { source_report_id: 'g1', target_report_id: 'g2', relationship_type: 'cites', basis: 't' },
    { source_report_id: 'g1', target_report_id: 'outside', relationship_type: 'cites', basis: 't' },
  ]
  const g = buildGraph(reports, deps)
  const index = buildFocusIndex(g, null)
  const focus = computeGroupFocus(index, ['g1', 'g2'], { builtFrom: true, feedsInto: true })
  ok(focus.nodes.has('g1') && focus.nodes.has('g2'), 'computeGroupFocus: both seeds present even with no edges walked to reach them')
  ok(focus.edges.has('g1->g2'), 'computeGroupFocus: the edge BETWEEN two seeds is collected — not just edges leaving the group')
  ok(focus.nodes.has('outside') && focus.edges.has('g1->outside'), 'computeGroupFocus: still walks OUT of the group to whatever it actually connects to, same as single-node isolate')
  const noWalk = computeGroupFocus(index, ['g1', 'g2'], { builtFrom: false, feedsInto: false })
  ok(!noWalk.nodes.has('outside') && noWalk.nodes.size === 2, 'computeGroupFocus: both cones off leaves exactly the seed set, no walking')
}
{
  // regions.ts: every country CONTINENT_OF has an opinion on for continent
  // grouping should agree with COUNTRY_FAMILY on which codes are known
  // countries at all — the two tables are maintained separately (continents
  // are new; families predate this session) and must not silently drift apart.
  const knownFamilies = Object.keys(COUNTRY_FAMILY).filter((c) => c !== 'INT')
  const uncovered = knownFamilies.filter((c) => continentOf(c) === 'International')
  ok(uncovered.length === 0, `continentOf: every known country maps to a real continent, not the INT fallback (missing: ${uncovered.join(',') || 'none'})`)

  // matchesRegionGroup — one representative of each kind, structural only
  // (no src/data import — this file stays a pure-logic suite by rule).
  const caReal = { id: 'r1', country: 'CA', publisher: 'Statistics Canada' }
  const deReal = { id: 'r2', country: 'DE', publisher: 'Destatis' }
  const imfReal = { id: 'r3', country: 'INT', publisher: 'International Monetary Fund' }
  const naOrb = { id: 'corb:CA', country: 'CA', publisher: '3 folded reports', members: [{ publisher: 'Statistics Canada' }] }
  const imfOrb = { id: 'corb:INT', country: 'INT', publisher: '2 folded reports', members: [{ publisher: 'World Bank' }, { publisher: 'International Monetary Fund' }] }

  const naContinent = REGION_GROUPS.find((g) => g.id === 'continent:North America')!
  ok(matchesRegionGroup(caReal, naContinent) && !matchesRegionGroup(deReal, naContinent), 'matchesRegionGroup: continent kind matches by continentOf(country)')
  ok(matchesRegionGroup(naOrb, naContinent), 'matchesRegionGroup: a country ORB matches by its own .country field, same as a real report')

  const euBloc = REGION_GROUPS.find((g) => g.id === 'bloc:EU')!
  ok(matchesRegionGroup(deReal, euBloc) && !matchesRegionGroup(caReal, euBloc), 'matchesRegionGroup: bloc kind reads straight off COUNTRY_BLOCS, no duplicated membership list')

  const imfPublisher = REGION_GROUPS.find((g) => g.id === 'publisher:imf')!
  ok(matchesRegionGroup(imfReal, imfPublisher), 'matchesRegionGroup: publisher kind matches a real report by publisher substring')
  ok(!matchesRegionGroup(caReal, imfPublisher), 'matchesRegionGroup: publisher kind does not match an unrelated publisher')
  ok(matchesRegionGroup(imfOrb, imfPublisher), 'matchesRegionGroup: publisher kind reaches INTO a folded orb’s .members — an orb with one IMF report inside still counts, even though the orb’s own synthetic .publisher string does not')

  const caCountry = COUNTRY_GROUPS.find((g) => g.country === 'CA')!
  ok(matchesRegionGroup(caReal, caCountry) && matchesRegionGroup(naOrb, caCountry), 'matchesRegionGroup: country kind matches both a real report and its folded orb')

  const ids = reportIdsForGroup([caReal, deReal, imfReal, naOrb, imfOrb], naContinent)
  ok(ids.has('r1') && ids.has('corb:CA') && !ids.has('r2'), 'reportIdsForGroup: seed set is exactly the matching node ids')
}

// ------------------------------------------------------------------- graph --
ok(describeRate(252) === 'every business day' && describeRate(0.05) === 'about every 20 years', 'describeRate: extremes phrased as facts')
ok(radiusFor(0) === 3.4 && radiusFor(1) === 8, 'radiusFor: the documented 3.4–8 range')
ok(isOfficial({}) && !isOfficial({ source_kind: 'commercial' }), 'isOfficial: absent means official')
ok(isDocumented({}) && !isDocumented({ evidence: 'implied' }), 'isDocumented: absent means documented')
{
  // The sink-exclusion property, in miniature: a commercial node's presence
  // must not move an official score.
  const reports: Report[] = [
    { id: 'o1', title: 'a', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', last_updated: null, url: '', domains: [] },
    { id: 'o2', title: 'b', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'r', description: '', last_updated: null, url: '', domains: [] },
    { id: 'com', title: 'c', publisher: 'p', country: 'CA', jurisdiction_level: 'institutional', region: 'r', description: '', last_updated: null, url: '', domains: [], source_kind: 'commercial' },
  ]
  const deps: Dependency[] = [
    { source_report_id: 'o1', target_report_id: 'o2', relationship_type: 'calculated_from', basis: 't' },
    { source_report_id: 'o1', target_report_id: 'com', relationship_type: 'uses_data_from', basis: 't' },
  ]
  const withCom = buildGraph(reports, deps)
  const without = buildGraph(reports.filter(isOfficial), deps.filter((d) => d.target_report_id !== 'com'))
  const drift = Math.abs((withCom.byId.get('o2')?.authority ?? 0) - (without.byId.get('o2')?.authority ?? 0))
  ok(drift < 1e-12 && withCom.byId.get('com')?.authority === 0, 'buildGraph: commercial nodes outside the ranking, by subtraction')
  ok(withCom.byId.get('com')?.in_degree === 1, 'buildGraph: …but their in_degree still counts, because it is a raw fact')
}

// ------------------------------------------------------------------ search --
{
  const reports: Report[] = [
    { id: 'statcan-cpi', title: 'Consumer Price Index', publisher: 'Statistics Canada', country: 'CA', jurisdiction_level: 'federal', region: 'Canada', description: 'prices', last_updated: null, url: '', domains: [] },
    { id: 'corporate-thing', title: 'Corporate Rates Digest', publisher: 'p', country: 'CA', jurisdiction_level: 'federal', region: 'Canada', description: 'corporate', last_updated: null, url: '', domains: [] },
  ]
  const g = buildGraph(reports, [])
  ok(search(g, 'cpi', () => true)[0]?.report.id === 'statcan-cpi', 'search: id acronym found at full weight')
  const rate = search(g, 'rate', () => true)
  ok(rate[0]?.report.id === 'corporate-thing', 'search: mid-word match still matches (corporate contains rate)')
  ok(search(g, 'cpi corporate', () => true).length === 0, 'search: every token must match — adding a word narrows')
  ok(search(g, 'cpi', (r) => r.id !== 'statcan-cpi').length === 0, 'search: respects the filter predicate')
}

// ------------------------------------------------------------ geoAffinity --
ok(affinityScore('CA', 'US') > 0 && affinityScore('CA', 'US') === affinityScore('US', 'CA'), 'affinityScore: shared blocs attract, symmetric')
ok(affinityScore('MA', 'DZ') < 0, 'affinityScore: the one documented conflict pair repels')
ok(affinityScore('CA', 'INT') === 0 && affinityScore('CA', 'CA') === 0, 'affinityScore: stateless and self are zero')

// ------------------------------------------------------------- galaxyForce --
{
  // BR and AR share the SA colour family (both extended into it 2026-08-20,
  // see palette.ts); AU is its own single-country family. Two BR nodes and
  // two AR nodes start on opposite sides of the origin — same test shape as
  // the file-level note's "countries visibly clumping inside their family's
  // region" claim — plus one distant AU node that has no partner and no
  // shared family with either. Running the force repeatedly should pull
  // BR/AR toward a shared region (family pull) while each tightens toward
  // its own country's centroid (the stronger, inner pull) — and AU, alone
  // in its own family with nothing to average against, is left untouched by
  // the family term (a lone member's "centroid" is itself).
  const mk = (_id: string, country: string, x: number, y: number, z: number, fx?: number): GalaxyNode => ({
    x, y, z, country, ...(fx !== undefined ? { fx } : {}),
  })
  const nodes: GalaxyNode[] = [
    mk('br1', 'BR', -50, 0, 0),
    mk('br2', 'BR', -40, 5, 0),
    mk('ar1', 'AR', 40, 0, 0),
    mk('ar2', 'AR', 50, -5, 0),
    mk('au1', 'AU', 500, 500, 500),
  ]
  const strength = { current: 1 }
  const force = galaxyForce(strength)
  force.initialize(nodes as unknown[])
  const startBrArGap = Math.hypot(nodes[0].x - nodes[2].x, nodes[0].y - nodes[2].y, nodes[0].z - nodes[2].z)
  // Mimics d3-force-3d's own tick loop, which this force never sees directly
  // in production (three-forcegraph drives it) — apply velocity to position,
  // then decay velocity the way `d3VelocityDecay`'s default (0.4) does.
  // Without the decay step, velocity accumulates every tick with nothing
  // ever bleeding it off, which oscillates instead of converging — a bug in
  // a hand-rolled test loop, not evidence the real force is unstable.
  for (let i = 0; i < 200; i++) {
    force(0.3)
    for (const n of nodes) {
      n.x += n.vx ?? 0
      n.y += n.vy ?? 0
      n.z += n.vz ?? 0
      n.vx = (n.vx ?? 0) * 0.6
      n.vy = (n.vy ?? 0) * 0.6
      n.vz = (n.vz ?? 0) * 0.6
    }
  }
  const endBrArGap = Math.hypot(nodes[0].x - nodes[2].x, nodes[0].y - nodes[2].y, nodes[0].z - nodes[2].z)
  ok(nodes.every((n) => Number.isFinite(n.x) && Number.isFinite(n.y) && Number.isFinite(n.z)), 'galaxyForce: no NaN after repeated ticks')
  ok(endBrArGap < startBrArGap, "galaxyForce: two different countries sharing SA's family end up nearer each other, not just tighter within themselves")
  ok(Math.hypot(nodes[0].x - nodes[1].x, nodes[0].y - nodes[1].y, nodes[0].z - nodes[1].z) < 10, 'galaxyForce: the two BR nodes tighten toward their own country centroid')

  // Strength 0 must be a true no-op — the "off" position on the slider.
  const still = [mk('a', 'BR', 1, 2, 3), mk('b', 'AR', 100, 100, 100)]
  const offForce = galaxyForce({ current: 0 })
  offForce.initialize(still as unknown[])
  offForce(1)
  ok(still[0].vx === undefined && still[1].vx === undefined, 'galaxyForce: strength 0 adds no velocity at all')

  // A pinned node (`fx` set, the isolated shelf's marker) must never be nudged.
  const pinned = [mk('p', 'BR', 0, 0, 0, 999), mk('p2', 'BR', 900, 900, 900)]
  const pinForce = galaxyForce({ current: 1 })
  pinForce.initialize(pinned as unknown[])
  pinForce(1)
  ok(pinned[0].vx === undefined, 'galaxyForce: a pinned node (fx set) is never nudged')
}

// --------------------------------------------------------------------------
if (failures) {
  console.error(`\n${failures} of ${passes + failures} logic checks FAILED`)
  process.exit(1)
}
console.log(`logic: all ${passes} checks pass`)
