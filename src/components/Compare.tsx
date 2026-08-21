import { useMemo, useState } from 'react'
import type { Graph, ScoredReport, Country } from '../lib/types'
import type { Drilldown } from '../lib/hierarchy'
import { resolveId, isOrbId } from '../lib/hierarchy'
import { computeFocus, shortestPath, type FocusIndex, type PathStep } from '../lib/selection'
import { search } from '../lib/search'
import { colourForReport } from '../lib/palette'

/**
 * Item 14 of the 2026-08-20 todo list — "Compare two nodes: 'what do these
 * both rest on?'. The data is there; nothing in the UI asks it." — and item
 * 15, "path finder", added into the SAME panel rather than a fifth floating
 * corner: both start from "pick two reports", and every screen edge that
 * would host a new panel is already spoken for (see the file comment's own
 * bottom-left reasoning below). "What do they share" and "how do they
 * connect" are two answers to one act of picking two reports, not two
 * separate features that happen to need the same inputs.
 *
 * Deliberately its own floating panel rather than a mode of the existing
 * single-selection machinery (`selectedId`, `Detail`, `isolateFocus`,
 * `neighbourhoodFocus`...). `Detail` only ever receives one report and has
 * no access to the app's broader selection state, and every one of those
 * existing pieces is built around ONE selection, not two held side by side
 * for comparison — bolting a second selection onto that chain risked
 * entangling the very isolate/neighbourhood/group precedence order that was
 * just built for items 5f/8 the same day. Two independent search boxes and
 * a read-only answer underneath is the whole feature; it does not select,
 * isolate, or fly the camera anywhere; it just answers the question.
 *
 * **Position, moved 2026-08-20**: from a stack above the tier bar to
 * bottom-centre, just left of `GroupsPanel` (Thomas: "set it just left of
 * the regions and countries button") — see the `wrap` comment below for the
 * anchoring math.
 *
 * **Why two `builtFrom` sets intersected, not a fresh walk**: `computeFocus`
 * already answers "everything A rests on, transitively" as `.builtFrom` —
 * exactly the per-node half of this question. Running it twice (once per
 * pick) and intersecting is simpler and cheaper than a bespoke two-seed
 * walk, and it reuses the exact same unfiltered adjacency
 * (`unfilteredFocusIndex` in `App.tsx`) that Isolate and Neighbourhood
 * already trust for "what does this actually rest on, full stop" — see that
 * memo's own comment for why UNFILTERED is the right graph to answer this
 * on. `.feedsInto` is intersected the same way for the mirror question,
 * "what do both of these feed into" — offered as a second, collapsed
 * section since "what do these rest on" was the one Thomas actually asked
 * for and the other direction is free once the first exists.
 *
 * **Search over the full corpus (`graph`), not the disclosed one**: picking
 * *which* two reports to compare is a search-by-name problem, same as
 * `SearchPanel`, and folded orbs are not nameable individually. Each pick is
 * then run through `resolveId` (`drilldown`/`openedCountries`, same as
 * `App.tsx`'s own `handleChoose`) to land on whatever id is actually live in
 * the disclosed graph — occasionally an orb, if the picked report is folded
 * away right now — before it is looked up in `focusIndex`, which only knows
 * disclosed-graph ids.
 *
 * **Path finder (item 15)**: `shortestPath` (in `lib/selection.ts`) does its
 * own breadth-first walk rather than reusing the two `computeFocus` cones —
 * see that function's own comment for why: two siblings built from the same
 * upstream release have no cone-intersection answer at all (their
 * `builtFrom` sets DO intersect, at the shared ancestor, but that is a
 * different question — "what do they share", not "how do you get from one
 * to the other in the fewest hops," and the fewest-hops path there is one
 * step up, one step down, which only a walk that can change direction
 * mid-route ever finds). Rendered as a plain vertical chain with a small
 * relation label between each pair, reusing `PathStep.relation` verbatim —
 * "rests on" / "feeds into" are the same two words the rest of the app
 * already uses for `focusBuiltFrom`/`focusFeedsInto`, so this does not
 * introduce a third vocabulary for the same two directions.
 */
export function Compare({
  graph,
  disclosedGraph,
  drilldown,
  openedCountries,
  focusIndex,
}: {
  /** Full corpus, for search only — see file comment. */
  graph: Graph
  /** Disclosed graph, for titles/lookups of the (possibly folded) resolved ids. */
  disclosedGraph: Graph
  drilldown: Drilldown
  openedCountries: ReadonlySet<Country>
  /** `unfilteredFocusIndex` from `App.tsx` — the whole corpus, no scope filter. */
  focusIndex: FocusIndex
}) {
  const [collapsed, setCollapsed] = useState(true)
  const [pickA, setPickA] = useState<Picked | null>(null)
  const [pickB, setPickB] = useState<Picked | null>(null)

  const resolvedA = pickA ? resolveId(drilldown, pickA.report, openedCountries) : null
  const resolvedB = pickB ? resolveId(drilldown, pickB.report, openedCountries) : null

  const result = useMemo(() => {
    if (!resolvedA || !resolvedB) return null
    if (resolvedA === resolvedB) return 'same' as const
    const focusA = computeFocus(focusIndex, resolvedA, { builtFrom: true, feedsInto: true })
    const focusB = computeFocus(focusIndex, resolvedB, { builtFrom: true, feedsInto: true })
    const restOn = [...focusA.builtFrom].filter((id) => focusB.builtFrom.has(id))
    const feedInto = [...focusA.feedsInto].filter((id) => focusB.feedsInto.has(id))
    return { restOn, feedInto }
  }, [resolvedA, resolvedB, focusIndex])

  const path = useMemo(() => {
    if (!resolvedA || !resolvedB || resolvedA === resolvedB) return null
    return shortestPath(focusIndex, resolvedA, resolvedB)
  }, [resolvedA, resolvedB, focusIndex])

  return (
    <div style={wrap}>
      {collapsed ? (
        <button type="button" onClick={() => setCollapsed(false)} style={pill}>
          Compare
        </button>
      ) : (
        <div style={panel}>
          <div style={header}>
            <span style={title}>Compare two reports</span>
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              title="Close"
              style={clearButton}
            >
              Close
            </button>
          </div>

          <Picker graph={graph} label="A" picked={pickA} onPick={setPickA} onClear={() => setPickA(null)} />
          <Picker graph={graph} label="B" picked={pickB} onPick={setPickB} onClear={() => setPickB(null)} />

          {result === 'same' && (
            <div style={emptyRow}>That is the same report picked twice.</div>
          )}

          {result && result !== 'same' && (
            <>
              <Section
                label={`What both rest on (${result.restOn.length})`}
                ids={result.restOn}
                graph={disclosedGraph}
                emptyText="Nothing in common — no shared dependency, direct or indirect."
              />
              <Section
                label={`What both feed into (${result.feedInto.length})`}
                ids={result.feedInto}
                graph={disclosedGraph}
                emptyText="Nothing in common downstream either."
                collapsedByDefault
              />
              <PathSection path={path} graph={disclosedGraph} />
            </>
          )}

          {(!pickA || !pickB) && !result && (
            <div style={emptyRow}>Pick two reports to see what they share and how they connect.</div>
          )}
        </div>
      )}
    </div>
  )
}

interface Picked {
  report: ScoredReport
}

function Picker({
  graph,
  label,
  picked,
  onPick,
  onClear,
}: {
  graph: Graph
  label: string
  picked: Picked | null
  onPick: (p: Picked) => void
  onClear: () => void
}) {
  const [query, setQuery] = useState('')

  const results = useMemo(
    () => (query.trim() ? search(graph, query, () => true, 6) : []),
    [graph, query],
  )

  return (
    <div style={pickerWrap}>
      <div style={pickerLabel}>{label}</div>
      {picked ? (
        <div style={pickedRow}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 7,
              flexShrink: 0,
              background: colourForReport(picked.report),
            }}
          />
          <span style={pickedTitle}>{picked.report.title}</span>
          <button type="button" onClick={onClear} title="Clear this pick" style={pickedClear}>
            ×
          </button>
        </div>
      ) : (
        <>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            style={searchInput}
          />
          {query && (
            <div style={list}>
              {results.length === 0 && <div style={emptyRow}>No match</div>}
              {results.map(({ report }) => (
                <div
                  key={report.id}
                  onMouseDown={(e) => {
                    // mousedown, not click — same reason as SearchPanel: a
                    // click's blur would unmount this list before it landed.
                    e.preventDefault()
                    onPick({ report })
                    setQuery('')
                  }}
                  style={resultRow}
                >
                  {report.title}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function Section({
  label,
  ids,
  graph,
  emptyText,
  collapsedByDefault,
}: {
  label: string
  ids: string[]
  graph: Graph
  emptyText: string
  collapsedByDefault?: boolean
}) {
  const [open, setOpen] = useState(!collapsedByDefault)
  return (
    <div style={{ marginTop: 8 }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={sectionHeader}>
        {open ? '▾' : '▸'} {label}
      </button>
      {open && (
        <div style={{ ...list, marginTop: 4, maxHeight: '20vh' }}>
          {ids.length === 0 && <div style={emptyRow}>{emptyText}</div>}
          {ids.map((id) => {
            const report = graph.byId.get(id)
            return (
              <div key={id} style={resultRow}>
                {report ? report.title : id}
                {report && isOrbId(id) && <span style={orbTag}> (folded)</span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/**
 * Item 15 — the shortest chain of edges between the two picks, in either
 * direction at each hop. `path === null` means "not yet computable" (fewer
 * than two picks, or `shortestPath` itself returned null because the two
 * are simply not connected — both rendered the same way as the other
 * sections' empty states, not as an error).
 */
function PathSection({ path, graph }: { path: PathStep[] | null; graph: Graph }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ marginTop: 8 }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={sectionHeader}>
        {open ? '▾' : '▸'} Shortest path{path ? ` (${path.length - 1} hop${path.length - 1 === 1 ? '' : 's'})` : ''}
      </button>
      {open && (
        <div style={{ marginTop: 4 }}>
          {path === null && (
            <div style={emptyRow}>No connection — not reachable in either direction, direct or indirect.</div>
          )}
          {path && path.length === 1 && (
            <div style={emptyRow}>That is the same report picked twice.</div>
          )}
          {path && path.length > 1 && (
            <div style={{ ...list, padding: '4px 7px', maxHeight: '24vh', overflowY: 'auto' }}>
              {path.map((step, i) => {
                const report = graph.byId.get(step.id)
                return (
                  <div key={`${step.id}-${i}`}>
                    {step.relation && (
                      <div style={relationLabel}>
                        {step.relation === 'restsOn' ? '↓ rests on' : '↑ feeds into'}
                      </div>
                    )}
                    <div style={{ ...resultRow, whiteSpace: 'normal', cursor: 'default' }}>
                      {report ? report.title : step.id}
                      {report && isOrbId(step.id) && <span style={orbTag}> (folded)</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Bottom-centre, just LEFT of `GroupsPanel` ("Regions & Countries") — moved
// here 2026-08-20 from a stack above the tier bar (Thomas: "set it just left
// of the regions and countries button").
//
// 2026-08-21: no longer `position: fixed` with the old `calc(50% + 140px)`
// anchoring math — that arithmetic guaranteed the gap to `GroupsPanel` but
// nothing else, and the full review caught the tier bar's opaque wrap
// painting over this panel's collapsed pill at ≤~1400px windows (both
// zIndex 6, TierBar later in the DOM — the pill was flatly unclickable).
// This is now the FIRST child of the bottom dock's centre cell
// (`bottomDock` in App.tsx): the dock's grid centres the cell and its flex
// `gap` provides the spacing the old calc used to fake, at every window
// width, with overlap structurally impossible. `pointerEvents: 'auto'`
// because the dock container is 'none' (drag-through between panels).
const wrap: React.CSSProperties = {
  position: 'relative',
  pointerEvents: 'auto',
}

const pill: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 10,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--ink-dim)',
  background: 'var(--panel-bg)',
  border: '1px solid var(--line)',
  borderRadius: 8,
  padding: '7px 12px',
  cursor: 'pointer',
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
}

const panel: React.CSSProperties = {
  width: 280,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 12px',
  background: 'var(--panel-bg-solid)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
}

const header: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  paddingBottom: 6,
  marginBottom: 6,
  borderBottom: '1px solid var(--line-faint)',
}

const title: React.CSSProperties = {
  flex: 1,
  fontSize: 10,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--ink-faint)',
}

const clearButton: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 9.5,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--ink-dim)',
  background: 'transparent',
  border: '1px solid var(--line)',
  borderRadius: 5,
  padding: '3px 9px',
  cursor: 'pointer',
  lineHeight: 1,
}

const pickerWrap: React.CSSProperties = {
  marginTop: 6,
}

const pickerLabel: React.CSSProperties = {
  fontSize: 9.5,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--ink-faint)',
  marginBottom: 3,
}

const pickedRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 11.5,
  color: 'var(--ink-body)',
  border: '1px solid var(--line-faint)',
  borderRadius: 6,
  padding: '5px 7px',
}

const pickedTitle: React.CSSProperties = {
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const pickedClear: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 13,
  color: 'var(--ink-dim)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  lineHeight: 1,
  padding: '0 2px',
}

const searchInput: React.CSSProperties = {
  width: '100%',
  fontFamily: 'inherit',
  fontSize: 11.5,
  color: 'var(--ink-body)',
  background: 'var(--field-bg, transparent)',
  border: '1px solid var(--line-faint)',
  borderRadius: 6,
  padding: '4px 7px',
  outline: 'none',
  boxSizing: 'border-box',
}

const list: React.CSSProperties = {
  overflowY: 'auto',
  border: '1px solid var(--line-faint)',
  borderRadius: 6,
  marginTop: 2,
}

const resultRow: React.CSSProperties = {
  fontSize: 11.5,
  lineHeight: 1.7,
  padding: '2px 7px',
  cursor: 'pointer',
  color: 'var(--ink-body)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const emptyRow: React.CSSProperties = {
  fontSize: 11,
  color: 'var(--ink-faint)',
  padding: '4px 7px',
  lineHeight: 1.4,
}

const sectionHeader: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 10.5,
  letterSpacing: '0.03em',
  color: 'var(--ink-dim)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  textAlign: 'left',
  width: '100%',
}

const orbTag: React.CSSProperties = {
  color: 'var(--ink-faint)',
}

const relationLabel: React.CSSProperties = {
  fontSize: 10,
  color: 'var(--ink-faint)',
  padding: '2px 7px',
  fontStyle: 'italic',
}
