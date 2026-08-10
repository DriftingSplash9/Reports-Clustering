/**
 * Turning cadence into a calendar.
 *
 * Two kinds of thing land on a date, and the second is the reason this graph
 * can show a calendar nobody else can:
 *
 * - a **release**, when a report is published, from `release_schedule`;
 * - a **read**, when a *dependent* consumes a report, from the edge's
 *   `reference_period`.
 *
 * A publisher's own release calendar can only ever show you the first. This
 * corpus knows the second, because transmission was modelled on the edge rather
 * than the node — the same CPI release reaches the Monetary Policy Report every
 * month and the Alberta escalator once, in October, and only an edge can say
 * that. So "what happens next month" can answer with both what comes out and
 * what quietly consumes it, which is the question anyone watching a policy
 * chain actually has.
 *
 * **Nothing here invents a date.** Every function refuses rather than guesses,
 * and the refusals are counted and returned (`unplaceable`) instead of being
 * dropped, so the calendar can say how much it is not showing you. A calendar
 * that silently omits what it could not place looks identical to a calendar
 * with nothing due, and that is the one wrong answer that never gets noticed.
 */
import type {
  Dependency,
  EvidenceKind,
  Report,
  SchedulePrecision,
} from './types'

/** `YYYY-MM-DD` that is also a date that exists. February 31st passes a regex. */
export function isRealDate(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false
  const [y, m, d] = iso.split('-').map(Number)
  if (m < 1 || m > 12 || d < 1) return false
  // Day 0 of the next month is the last day of this one, and the Date
  // constructor's month argument is 0-based, so `m` is already "next month".
  return d <= new Date(Date.UTC(y, m, 0)).getUTCDate()
}

/** Today, in the local calendar sense, as `YYYY-MM-DD`. */
export function todayIso(now: Date = new Date()): string {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function addDaysIso(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const t = new Date(Date.UTC(y, m - 1, d + days))
  return t.toISOString().slice(0, 10)
}

function addMonthsIso(iso: string, months: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  // Clamp rather than roll over: adding a month to January 31 gives February
  // 28, not March 3. Rolling over would silently move an event into the wrong
  // month, which on a calendar is the whole error.
  const targetY = y + Math.floor((m - 1 + months) / 12)
  const targetM = ((((m - 1 + months) % 12) + 12) % 12) + 1
  const lastDay = new Date(Date.UTC(targetY, targetM, 0)).getUTCDate()
  const day = String(Math.min(d, lastDay)).padStart(2, '0')
  return `${targetY}-${String(targetM).padStart(2, '0')}-${day}`
}

/**
 * How far ahead to look. These are the units people ask in — "what's coming
 * next week", "what's due this quarter" — rather than a day count, because the
 * unit is also what the rendering groups by.
 */
export type Horizon = 'week' | 'month' | 'quarter' | 'half' | 'year' | 'all'

export const HORIZONS: readonly Horizon[] = [
  'week',
  'month',
  'quarter',
  'half',
  'year',
  'all',
]

export const HORIZON_MONTHS: Record<Horizon, number> = {
  week: 0,
  month: 1,
  quarter: 3,
  half: 6,
  year: 12,
  all: 12,
}

/**
 * Which horizon a thing *belongs* to, by how often it happens.
 *
 * A horizon is two filters, not one, and this is the second. Widening the
 * window alone does not work: the monthly releases recur inside every longer
 * window, so a quarter view is three months of monthlies with the quarterlies
 * buried in them, and a year view is twelve. The frequent items drown the
 * infrequent ones precisely as the question moves from "this week" to "this
 * year" — which is when the infrequent ones are the entire point.
 *
 * So each horizon shows only what recurs on roughly its own rhythm. The
 * quarterly view is the quarterly releases. The annual view is the annual ones,
 * and the vaguer-than-annual ones with them, which is also where an entry known
 * only as "February" naturally lands.
 *
 * Boundaries are at the obvious places and the band is named for its floor:
 * 52+ a year is weekly or faster, 12 to 51 is monthly, 4 to 11 is quarterly
 * (which catches the Bank of Canada's eight-a-year, roughly six-weekly, and
 * quarterly is the closest true thing to say about it), 2 to 3 is half-yearly,
 * and anything under 2 a year is annual or rarer — the decennial census included.
 *
 * Absent rate means the evergreen one-off shape, which lands in `year`. That is
 * not a claim it recurs annually; it is that if such a thing has a date at all,
 * a reader looking a year out is the one who wants to see it.
 */
export type CadenceBand = 'week' | 'month' | 'quarter' | 'half' | 'year'

export function cadenceBand(perYear: number | undefined): CadenceBand {
  if (perYear === undefined) return 'year'
  if (perYear >= 52) return 'week'
  if (perYear >= 12) return 'month'
  if (perYear >= 4) return 'quarter'
  if (perYear >= 2) return 'half'
  return 'year'
}

/** The window a horizon covers, starting today. Half-open at neither end. */
export function horizonWindow(
  horizon: Horizon,
  from: string = todayIso(),
): { from: string; to: string } {
  const to =
    horizon === 'week'
      ? addDaysIso(from, 7)
      : addMonthsIso(from, HORIZON_MONTHS[horizon])
  return { from, to }
}

/**
 * One dated thing on the calendar.
 *
 * `from`/`to` are a window in every case, including the exact ones, where they
 * are equal — see ScheduledRelease for why the window is the general shape.
 * `precision` is carried through so the rendering can draw the fuzziness rather
 * than flattening a quarter to its midpoint, which would put a mark on a day
 * nobody claimed.
 */
export interface CalendarEvent {
  kind: 'release' | 'read'
  from: string
  to: string
  precision: SchedulePrecision
  /** Absent means documented, as everywhere else in the corpus. */
  evidence?: EvidenceKind
  /** The report published (release) or consumed (read). */
  reportId: string
  /** The dependent doing the reading. Set on reads only. */
  readerId?: string
  /**
   * The rhythm this event recurs on — see `cadenceBand`. For a release that is
   * the report's own publication rate; for a read it is the *edge's*
   * `readings_per_year`, because a monthly index read once a year is an annual
   * event however often it is published.
   */
  band: CadenceBand
  /** What the release covers, or what the document says about the reading. */
  detail?: string
  sourceUrl?: string
}

/** What could not be placed, so the view can say so out loud. */
export interface Unplaceable {
  /** Recurring reports carrying no schedule at all. */
  reportsWithoutSchedule: string[]
  /** Reports whose schedule is honestly `irregular`. */
  reportsIrregular: string[]
  /** Edges that state a reading but no calendar anchor for it. */
  edgesWithoutAnchor: string[]
}

export interface CalendarResult {
  events: CalendarEvent[]
  unplaceable: Unplaceable
}

/**
 * Every release and read falling in a window.
 *
 * Reads are derived, and the derivation is deliberately timid. `ReferencePeriod`
 * gives a rate (`readings_per_year`) and at most one anchor (`ends`, as
 * `MM-DD`), so:
 *
 * - no anchor → nothing is emitted, and the edge is counted in `unplaceable`.
 *   A yearly reading somewhere in an unnamed month is not a calendar entry.
 * - one reading a year with an anchor → one dated read, documented, because
 *   `stated_as` is a quotation from the instrument that says so.
 * - several readings a year with an anchor → they are spaced evenly from the
 *   anchor and marked **implied**, because the document gave a rate and one
 *   date, and the rest are this module's arithmetic rather than anybody's
 *   claim.
 */
export function calendarEvents(
  reports: Report[],
  dependencies: Dependency[],
  window: { from: string; to: string },
): CalendarResult {
  const events: CalendarEvent[] = []
  const unplaceable: Unplaceable = {
    reportsWithoutSchedule: [],
    reportsIrregular: [],
    edgesWithoutAnchor: [],
  }
  const byId = new Map(reports.map((r) => [r.id, r]))

  for (const r of reports) {
    const s = r.release_schedule
    if (!s) {
      // Only a recurring report is missing anything. The one-off foundational
      // instruments omit `releases_per_year` too, and they are not late — they
      // are finished.
      if (r.releases_per_year !== undefined) unplaceable.reportsWithoutSchedule.push(r.id)
      continue
    }
    if (s.kind === 'irregular') {
      unplaceable.reportsIrregular.push(r.id)
      continue
    }
    for (const e of s.entries) {
      // Overlap, not containment: a Q3 window straddling the edge of the view
      // is still something happening in that view, and dropping it would hide
      // exactly the vaguest entries the horizon is least able to spare.
      if (e.to < window.from || e.from > window.to) continue
      events.push({
        kind: 'release',
        from: e.from,
        to: e.to,
        precision: e.precision,
        evidence: e.evidence,
        reportId: r.id,
        band: cadenceBand(r.releases_per_year),
        detail: e.covers,
        sourceUrl: e.evidence_url ?? s.source_url,
      })
    }
  }

  for (const d of dependencies) {
    const rp = d.reference_period
    if (!rp) continue
    if (!byId.has(d.source_report_id) || !byId.has(d.target_report_id)) continue
    const label = `${d.source_report_id} -> ${d.target_report_id}`
    if (!rp.ends) {
      unplaceable.edgesWithoutAnchor.push(label)
      continue
    }
    const [mm, dd] = rp.ends.split('-').map(Number)
    if (!mm || !dd) {
      unplaceable.edgesWithoutAnchor.push(label)
      continue
    }
    const spacing = rp.readings_per_year > 0 ? 12 / rp.readings_per_year : 12
    // Walk the years the window touches, then step the anchor by the spacing.
    // Both ends of the window are scanned because a window can straddle a year
    // boundary, and the anchor for the following year has to be reachable.
    const startYear = Number(window.from.slice(0, 4))
    const endYear = Number(window.to.slice(0, 4))
    for (let y = startYear; y <= endYear; y++) {
      const anchor = `${y}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`
      if (!isRealDate(anchor)) continue
      const count = Math.max(1, Math.round(rp.readings_per_year))
      for (let i = 0; i < count; i++) {
        const at = spacing >= 1 ? addMonthsIso(anchor, i * spacing) : anchor
        if (at < window.from || at > window.to) continue
        events.push({
          kind: 'read',
          from: at,
          to: at,
          precision: 'day',
          // One reading a year on a stated date is the document's own claim.
          // Anything else here is this function's arithmetic.
          evidence: rp.readings_per_year === 1 ? undefined : 'implied',
          reportId: d.target_report_id,
          readerId: d.source_report_id,
          // The edge's rate, not the source's. A monthly index consumed once a
          // year by a statutory escalator is an annual event, and filing it
          // under "monthly" because the CPI is monthly would put it in the one
          // view where it is guaranteed to be drowned.
          band: cadenceBand(rp.readings_per_year),
          detail: rp.stated_as,
          sourceUrl: d.evidence_url,
        })
        if (spacing < 1) break
      }
    }
  }

  // Soonest first, and within a day the sharper claim first — an exact release
  // should sit above a quarter-wide window that happens to overlap it.
  const order: Record<SchedulePrecision, number> = {
    day: 0,
    week: 1,
    month: 2,
    quarter: 3,
    half: 4,
    year: 5,
  }
  events.sort(
    (a, b) =>
      a.from.localeCompare(b.from) ||
      order[a.precision] - order[b.precision] ||
      a.reportId.localeCompare(b.reportId),
  )
  return { events, unplaceable }
}

/**
 * The reads a given release triggers, for expanding one row of the calendar.
 *
 * Deliberately not filtered to the same window as the release. The point of
 * showing these at all is that a release and its consequences are routinely
 * months apart — the July population estimate reaching a transfer formula the
 * following spring is the standard shape, not the exception.
 */
export function readsTriggeredBy(
  reportId: string,
  dependencies: Dependency[],
): { readerId: string; statedAs: string; ends: string | null; readingsPerYear: number }[] {
  return dependencies
    .filter((d) => d.target_report_id === reportId && d.reference_period)
    .map((d) => ({
      readerId: d.source_report_id,
      statedAs: d.reference_period!.stated_as,
      ends: d.reference_period!.ends,
      readingsPerYear: d.reference_period!.readings_per_year,
    }))
}

/** The next expected release, for a hover card. Null when nothing is scheduled. */
export function nextRelease(
  report: Report,
  from: string = todayIso(),
): { from: string; to: string; precision: SchedulePrecision; evidence?: EvidenceKind } | null {
  const s = report.release_schedule
  if (!s || s.kind === 'irregular') return null
  // Entries are date-ordered by validator rule, so the first one that has not
  // finished is the next one.
  const next = s.entries.find((e) => e.to >= from)
  return next
    ? { from: next.from, to: next.to, precision: next.precision, evidence: next.evidence }
    : null
}

/**
 * How a window should read in a sentence. A day is a date; anything wider is
 * the period it covers, named the way the publisher would name it.
 */
export function describeWindow(
  from: string,
  to: string,
  precision: SchedulePrecision,
): string {
  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  const [y, m, d] = from.split('-').map(Number)
  switch (precision) {
    case 'day':
      return `${MONTHS[m - 1]} ${d}, ${y}`
    case 'week':
      return `week of ${MONTHS[m - 1]} ${d}, ${y}`
    case 'month':
      return `${MONTHS[m - 1]} ${y}`
    case 'quarter':
      return `Q${Math.floor((m - 1) / 3) + 1} ${y}`
    case 'half':
      return `H${m <= 6 ? 1 : 2} ${y}`
    case 'year':
      // A fiscal year stated as a window that crosses a December is not the
      // calendar year it starts in, and saying "2026" for April 2026 to March
      // 2027 would be wrong in the direction nobody checks.
      return to.slice(0, 4) !== from.slice(0, 4) ? `${y}-${to.slice(2, 4)}` : `${y}`
  }
}
