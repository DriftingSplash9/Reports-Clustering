import { useMemo, useState } from 'react'
import type { Dependency, Graph, ScoredReport, SchedulePrecision } from '../lib/types'
import type { NodePredicate } from '../lib/filter'
import { colourForReport } from '../lib/palette'
import {
  calendarEvents,
  describeWindow,
  horizonWindow,
  HORIZONS,
  type CalendarEvent,
  type Horizon,
} from '../lib/schedule'

/**
 * What is coming, and what quietly consumes it.
 *
 * Sits along the bottom edge because it is a timeline and a timeline wants
 * width, and because the two side panels already own the vertical edges. Rolls
 * away behind a tab like they do.
 *
 * Two things are on it. **Releases** come from each report's `release_schedule`
 * and are what any publisher's own calendar would show. **Reads** come from the
 * *edges* — `reference_period` says when a dependent actually consumes its
 * source — and are the thing no publisher can tell you, because the fact does
 * not belong to either document alone. Turning reads off leaves an ordinary
 * release calendar, which is the useful comparison: the difference between the
 * two is the graph earning its keep.
 *
 * ### Fuzziness is drawn, not resolved
 *
 * An entry is a window, and windows of different widths are not the same claim.
 * "17 August" and "sometime in Q3" both have to appear, and the second must not
 * be quietly rendered as a point — a midpoint looks like a date, and a date
 * nobody stated is exactly the kind of invention the corpus refuses everywhere
 * else. So precision is drawn as width, and a fortnight-wide bar reads as a
 * fortnight-wide claim.
 *
 * ### It says what it cannot show
 *
 * The footer counts what did not make it: recurring reports carrying no
 * schedule yet, reports whose timing is honestly irregular, and edges that
 * state a reading with no anchor to hang it on. Without that line an empty
 * calendar and an unresearched one look identical, and the empty one is far
 * rarer than it would appear.
 */
export default function CalendarPanel({
  graph,
  dependencies,
  within,
  onChoose,
}: {
  graph: Graph
  dependencies: Dependency[]
  /** The scope filter, so the calendar never lists a report the graph is hiding. */
  within: NodePredicate
  onChoose: (report: ScoredReport) => void
}) {
  const [collapsed, setCollapsed] = useState(true)
  const [horizon, setHorizon] = useState<Horizon>('month')
  const [showReads, setShowReads] = useState(true)

  const byId = useMemo(
    () => new Map(graph.nodes.map((n) => [n.id, n])),
    [graph],
  )

  const { events, unplaceable } = useMemo(() => {
    const w = horizonWindow(horizon)
    return calendarEvents(graph.nodes, dependencies, w)
  }, [graph, dependencies, horizon])

  // Filtering happens here rather than inside `calendarEvents` so the
  // unplaceable counts stay honest about the whole corpus: "nothing is due"
  // because of a filter and "nothing is due" because nothing is researched are
  // different answers and the footer has to keep saying the second one.
  const shown = useMemo(
    () =>
      events.filter((e) => {
        if (e.kind === 'read' && !showReads) return false
        // The horizon is a rhythm, not just a window — see `cadenceBand`. A
        // quarter view widened without this is three months of monthly releases
        // with the quarterlies lost inside them, which is what the panel looked
        // like on first sight. `all` is the escape hatch: same year-long window,
        // no band filter, for when the question really is "everything".
        if (horizon !== 'all' && e.band !== horizon) return false
        const r = byId.get(e.reportId)
        if (!r || !within(r)) return false
        if (e.readerId) {
          const reader = byId.get(e.readerId)
          // A read is an event about two reports. Hiding one of them hides the
          // event, or the calendar would show a consumer that is not on screen.
          if (!reader || !within(reader)) return false
        }
        return true
      }),
    [events, showReads, within, byId, horizon],
  )

  // Group by the window's own description, so a run of quarter-wide entries
  // collects under one "Q4 2026" heading instead of scattering across the days
  // they happen to start on.
  const groups = useMemo(() => {
    const out: { label: string; events: CalendarEvent[] }[] = []
    for (const e of shown) {
      const label = describeWindow(e.from, e.to, e.precision)
      const last = out[out.length - 1]
      if (last && last.label === label) last.events.push(e)
      else out.push({ label, events: [e] })
    }
    return out
  }, [shown])

  const missing =
    unplaceable.reportsWithoutSchedule.length +
    unplaceable.reportsIrregular.length +
    unplaceable.edgesWithoutAnchor.length

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          width: PANEL_WIDTH,
          marginLeft: -PANEL_WIDTH / 2,
          transform: `translateY(${collapsed ? PANEL_HEIGHT + 44 : 0}px)`,
          transition: 'transform 220ms cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: collapsed ? 'none' : 'auto',
          zIndex: 5,
        }}
      >
        <div style={shell}>
          <div style={header}>
            <span style={heading}>Calendar</span>
            <span style={{ display: 'flex', gap: 3 }}>
              {HORIZONS.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHorizon(h)}
                  style={{
                    ...chip,
                    color: h === horizon ? '#cfe0f8' : '#5e6f8a',
                    borderColor:
                      h === horizon
                        ? 'rgba(110, 168, 255, 0.45)'
                        : 'rgba(90, 115, 160, 0.22)',
                    background:
                      h === horizon ? 'rgba(110, 168, 255, 0.14)' : 'transparent',
                  }}
                >
                  {h}
                </button>
              ))}
            </span>
            <button
              type="button"
              onClick={() => setShowReads((s) => !s)}
              title={
                showReads
                  ? 'Hide the downstream reads and leave an ordinary release calendar'
                  : 'Show when dependents actually consume each release'
              }
              style={{
                ...chip,
                marginLeft: 'auto',
                color: showReads ? '#cfe0f8' : '#5e6f8a',
                borderColor: showReads
                  ? 'rgba(110, 168, 255, 0.45)'
                  : 'rgba(90, 115, 160, 0.22)',
                background: showReads ? 'rgba(110, 168, 255, 0.14)' : 'transparent',
              }}
            >
              reads
            </button>
          </div>

          <div style={body}>
            {groups.length === 0 && (
              <div style={empty}>
                Nothing on this rhythm in this window.
                {missing > 0 && ' Which is not the same as nothing happening — see below.'}
              </div>
            )}
            {groups.map((g) => (
              <div key={g.label + g.events[0].reportId} style={{ marginBottom: 10 }}>
                <div style={groupLabel}>{g.label}</div>
                {g.events.map((e, i) => {
                  const r = byId.get(e.reportId)
                  if (!r) return null
                  const reader = e.readerId ? byId.get(e.readerId) : undefined
                  return (
                    <div
                      key={`${e.kind}-${e.reportId}-${e.readerId ?? ''}-${e.from}-${i}`}
                      onClick={() => onChoose(reader ?? r)}
                      style={row}
                      title={e.detail}
                    >
                      <PrecisionMark
                        precision={e.precision}
                        colour={colourForReport(r)}
                        read={e.kind === 'read'}
                      />
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={title}>
                          {e.kind === 'read' ? (
                            <>
                              <span style={{ color: '#6f829e' }}>{r.title}</span>
                              <span style={{ color: '#4d5f7c' }}> read by </span>
                              {reader?.title ?? e.readerId}
                            </>
                          ) : (
                            r.title
                          )}
                        </span>
                        <span style={sub}>
                          {e.kind === 'read'
                            ? (reader?.publisher ?? '')
                            : r.publisher}
                          {e.detail ? ` · ${trim(e.detail)}` : ''}
                        </span>
                      </span>
                      {e.evidence === 'implied' && (
                        <span
                          style={impliedTag}
                          title={
                            e.kind === 'read'
                              ? 'The document gives a rate and one date; the rest of these readings are arithmetic'
                              : 'Inferred from past releases, not read off a published calendar'
                          }
                        >
                          implied
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {missing > 0 && (
            <div style={footer}>
              Not shown:{' '}
              {unplaceable.reportsWithoutSchedule.length > 0 && (
                <>
                  <b style={b}>{unplaceable.reportsWithoutSchedule.length}</b> recurring
                  reports with no schedule researched
                </>
              )}
              {unplaceable.reportsIrregular.length > 0 && (
                <>
                  {unplaceable.reportsWithoutSchedule.length > 0 && ', '}
                  <b style={b}>{unplaceable.reportsIrregular.length}</b> irregular
                </>
              )}
              {unplaceable.edgesWithoutAnchor.length > 0 && (
                <>
                  {', '}
                  <b style={b}>{unplaceable.edgesWithoutAnchor.length}</b> edges stating a
                  reading with no date
                </>
              )}
              .
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        title={collapsed ? 'Show Calendar' : 'Hide Calendar'}
        aria-expanded={!collapsed}
        style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          marginLeft: -PANEL_WIDTH / 2,
          transform: collapsed
            ? 'translateY(0)'
            : `translateY(-${PANEL_HEIGHT + 6}px)`,
          transition: 'transform 220ms cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '5px 9px',
          fontFamily: 'inherit',
          fontSize: 10,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#5e6f8a',
          background: 'rgba(10, 14, 24, 0.82)',
          border: '1px solid rgba(90, 115, 160, 0.22)',
          borderRadius: 6,
          backdropFilter: 'blur(8px)',
          cursor: 'pointer',
          zIndex: 6,
          lineHeight: 1,
        }}
      >
        {collapsed ? 'Calendar' : '⌄'}
      </button>
    </>
  )
}

/**
 * Precision as width.
 *
 * A known day is a dot; everything vaguer is a bar as wide as the claim. This
 * is the one piece of the panel that must not be tidied into uniformity — the
 * whole reason the schema keeps precision per entry is so that a Q3 estimate
 * cannot be mistaken for a date, and the mark is where that survives or dies.
 *
 * A read is drawn hollow. It is the same colour as the report being consumed,
 * because that is what the event is about, but it is not a publication and
 * should not read as one at a glance.
 */
function PrecisionMark({
  precision,
  colour,
  read,
}: {
  precision: SchedulePrecision
  colour: string
  read: boolean
}) {
  const width = MARK_WIDTH[precision]
  return (
    <span
      style={{
        width,
        minWidth: width,
        height: 7,
        borderRadius: 4,
        marginTop: 4,
        background: read ? 'transparent' : colour,
        border: read ? `1px solid ${colour}` : 'none',
        boxSizing: 'border-box',
      }}
    />
  )
}

const MARK_WIDTH: Record<SchedulePrecision, number> = {
  day: 7,
  week: 12,
  month: 20,
  quarter: 30,
  half: 42,
  year: 56,
}

/** Reference-period quotations run long; the full text is in the row's title. */
function trim(s: string): string {
  return s.length > 90 ? `${s.slice(0, 88)}…` : s
}

const PANEL_WIDTH = 560
const PANEL_HEIGHT = 300

const shell: React.CSSProperties = {
  background: 'rgba(10, 14, 24, 0.82)',
  border: '1px solid rgba(90, 115, 160, 0.28)',
  borderRadius: 10,
  backdropFilter: 'blur(8px)',
  padding: '10px 12px 8px',
  boxSizing: 'border-box',
  height: PANEL_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
}

const header: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 8,
}

const heading: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#5e6f8a',
}

const chip: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 10,
  letterSpacing: '0.04em',
  padding: '3px 7px',
  borderRadius: 5,
  border: '1px solid rgba(90, 115, 160, 0.22)',
  cursor: 'pointer',
  lineHeight: 1,
}

const body: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  marginRight: -6,
  paddingRight: 6,
}

const groupLabel: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#4d5f7c',
  marginBottom: 3,
}

const row: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  alignItems: 'flex-start',
  padding: '3px 4px',
  borderRadius: 5,
  cursor: 'pointer',
}

const title: React.CSSProperties = {
  color: '#dde5f2',
  fontSize: 12,
  lineHeight: 1.35,
  display: 'block',
}

const sub: React.CSSProperties = {
  display: 'block',
  color: '#6f829e',
  fontSize: 10.5,
  marginTop: 1,
}

const impliedTag: React.CSSProperties = {
  fontSize: 9,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#8a7ab5',
  marginTop: 4,
  flexShrink: 0,
}

const empty: React.CSSProperties = {
  color: '#6f829e',
  fontSize: 11.5,
  lineHeight: 1.5,
  padding: '6px 2px',
}

const footer: React.CSSProperties = {
  borderTop: '1px solid rgba(90, 115, 160, 0.18)',
  paddingTop: 6,
  marginTop: 6,
  color: '#5e6f8a',
  fontSize: 10.5,
  lineHeight: 1.45,
}

const b: React.CSSProperties = { color: '#8fa4c4', fontWeight: 600 }
