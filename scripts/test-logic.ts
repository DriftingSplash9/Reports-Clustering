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
import { DEFAULT_DRILLDOWN, TIER_COUNT, buildDisclosedGraph, isOrbId, orbId, resolveId, tierOf, toggleDrilldown } from '../src/lib/hierarchy'
import { NO_FILTER, applyFilter, compile, isFiltering, toggleIn } from '../src/lib/filter'
import { buildFocusIndex, computeFocus } from '../src/lib/selection'
import { buildGraph, describeRate, isDocumented, isOfficial, radiusFor, validate } from '../src/lib/graph'
import { search } from '../src/lib/search'
import { affinityScore } from '../src/lib/geoAffinity'
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
ok(toggleDrilldown(1, orbId('CA')) === 2 && toggleDrilldown(TIER_COUNT, orbId('CA')) === TIER_COUNT, 'toggleDrilldown: orb opens a tier, caps at the deepest')
ok(toggleDrilldown(3, 'statcan-cpi') === 3, 'toggleDrilldown: a real node folds NOTHING (the deleted-every-national-report bug)')
ok(isOrbId(orbId('EU')) && !isOrbId('eu-something'), 'orb ids namespaced')
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
  ok(resolveId(1, reports[0]) === orbId('CA') && resolveId(2, reports[0]) === 'ca-fed', 'resolveId: folded vs open')
  const d4 = buildDisclosedGraph(g, 4)
  ok(d4.nodes.length === 3 && d4.edges.length === 2, 'disclosed@4: everything real again')
}
ok(DEFAULT_DRILLDOWN === 1, 'default drilldown is the top tier')

// ------------------------------------------------------------------ filter --
ok(!isFiltering(NO_FILTER) && isFiltering({ ...NO_FILTER, scopes: [] }), 'isFiltering: null means everything, [] means the user turned it all off')
ok(toggleIn(null, ['a', 'b', 'c'], 'b')?.join(',') === 'a,c', 'toggleIn from null: first click removes one, not leaves one')
ok(toggleIn(['a', 'c'], ['a', 'b', 'c'], 'b') === null, 'toggleIn: completing the set returns to null, not a full list')
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

// ------------------------------------------------------------------- graph --
ok(describeRate(252) === 'every business day' && describeRate(0.05) === 'about every 20 years', 'describeRate: extremes phrased as facts')
ok(radiusFor(0) === 2.2 && radiusFor(1) === 8, 'radiusFor: the documented 2.2–8 range')
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

// --------------------------------------------------------------------------
if (failures) {
  console.error(`\n${failures} of ${passes + failures} logic checks FAILED`)
  process.exit(1)
}
console.log(`logic: all ${passes} checks pass`)
