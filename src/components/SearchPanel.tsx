import { useEffect, useMemo, useRef, useState } from 'react'
import type { Graph, ScoredReport } from '../lib/types'
import type { NodePredicate } from '../lib/filter'
import type { RegionGroup } from '../lib/regions'
import { search, searchGroups } from '../lib/search'

/** Search always runs over the whole corpus — see the `outsideFilter` prop doc. */
const ALWAYS_VISIBLE: NodePredicate = () => true
import { colourForReport } from '../lib/palette'
import { HUD_TOP } from '../lib/uiTheme'

/**
 * One row of the merged result list — either a report (fly + select) or a
 * `RegionGroup` (isolate). See `searchGroups` in `lib/search.ts` for how the
 * two get scored on a comparable scale and `combined` below for how they're
 * merged into one ranked, keyboard-navigable list.
 */
type CombinedResult =
  | { kind: 'report'; report: ScoredReport; score: number }
  | { kind: 'group'; group: RegionGroup; score: number }

const GROUP_KIND_LABEL: Record<RegionGroup['kind'], string> = {
  continent: 'Region',
  bloc: 'Bloc / org',
  publisher: 'Publisher',
  country: 'Country',
}

/**
 * Find-by-name.
 *
 * Moved 2026-08-20 from dead-centre to left-of-centre (Thomas: "I just want
 * the search/find bar to the left") — `SEARCH_BAR_LEFT` below, not true left
 * (`left: 20`), because the Reports `PanelShell` already owns that corner
 * (`left: 20`, width 320, plus its collapse tab) and a search bar flush
 * against it would sit on top of it whenever Reports is open. It is still
 * the primary way into the graph, not an option about it — the view and
 * filter controls are instrumentation and live off to the side.
 *
 * **Minimizable, same update.** Collapses to the same kind of pill every
 * other drop-up panel in this app uses (`Compare`/`Legend`/`GroupsPanel`),
 * rather than the input staying permanently on screen. `/` still reopens it
 * from anywhere, same as before — see the two effects below: one restores
 * `minimized` to `false` on `/`, the other focuses the input, but only on a
 * transition INTO the expanded state, not on first mount, or the page would
 * steal focus into this box on every load before anyone asked for it.
 *
 * Choosing a result selects the report *and* flies the camera to it. Selection
 * alone was the version that did not work: it lit a cone somewhere off screen
 * and left the user no better off than before.
 *
 * **Broadened 2026-08-22 (HANDOFF §5 item 4).** This used to search reports
 * only — a query for "asia", "brics", or a country name came back "Nothing
 * matches" even though `GroupsPanel` one panel over could isolate exactly
 * that, from the same corpus, via `computeGroupFocus`. Now every query also
 * runs through `searchGroups` (continents, blocs/orgs, publishers, individual
 * countries — the same `RegionGroup` list `GroupsPanel` renders) and the two
 * result lists merge into one ranked, keyboard-navigable list. Choosing a
 * report still flies + selects, unchanged; choosing a group calls
 * `onChooseGroup`, the exact handler `GroupsPanel` rows already use, so
 * isolating "Asia" from the search bar and isolating it from the panel are
 * the same action reached two ways, not two behaviours that could drift
 * apart.
 */
export default function SearchPanel({
  graph,
  onChoose,
  onChooseGroup,
  groups,
  selectedGroupId,
  outsideIsolate,
  outsideFilter,
  compact = false,
  minimized: controlledMinimized,
  onMinimizedChange,
}: {
  graph: Graph
  onChoose: (report: ScoredReport) => void
  /** Isolate a region, bloc, publisher, or country — same handler `GroupsPanel` rows call. */
  onChooseGroup: (groupId: string) => void
  /** The full `RegionGroup` list to search — `REGION_GROUPS` + `COUNTRY_GROUPS`, App.tsx's job to combine. */
  groups: readonly RegionGroup[]
  /** The currently isolated group, if any — tags its row so re-choosing it visibly toggles off. */
  selectedGroupId?: string | null
  /**
   * Non-null while a group isolate is active: true for a report that
   * isolate currently hides. Those rows get an "outside isolate" tag —
   * choosing one deliberately leaves the isolate (see `handleChoose` in
   * App.tsx, 2026-08-21), and the tag is what makes that an informed exit
   * instead of the old silent state-loss.
   */
  outsideIsolate?: ((report: ScoredReport) => boolean) | null
  /**
   * Non-null while the Countries/Domains scope filter is active: true for a
   * report the filter currently hides. Added 2026-08-21 (review §3.5(b)/(c)):
   * search used to run `within={predicate}` — the SAME scope filter — which
   * silently dropped filtered-out reports from the results entirely, so a
   * report that plainly exists could report "Nothing matches" if it happened
   * to sit outside whatever the Countries filter was narrowed to. It also
   * disagreed with `Compare.tsx`, which has always searched the whole corpus
   * with `within={() => true}`. Search now does the same — always the whole
   * corpus — and tags a filtered-out row instead of hiding it, exactly the
   * pattern `outsideIsolate` already established one round earlier: one
   * feature (this one) copied onto a second kind of hidden-ness rather than
   * inventing a new one.
   */
  outsideFilter?: ((report: ScoredReport) => boolean) | null
  /**
   * Compact layout (2026-08-31, second audit F-12 — see
   * `lib/useCompactLayout.ts`): the parent owns `minimized`, the Panels ▾
   * submenu drives it, the collapsed pill is not drawn, and the open bar
   * anchors at the window's left edge (the Reports tab it used to dodge is
   * not drawn either) at whatever width fits. `/` still opens it.
   */
  compact?: boolean
  minimized?: boolean
  onMinimizedChange?: (minimized: boolean) => void
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  // Starts minimized (2026-08-22, item 5z) — `panels.find` mounting this
  // component is now the fresh-session default (`PANELS_DEFAULT` in
  // `MenuBar.tsx`), and every other collapsible panel already opens as a
  // pill/tab rather than sprawled wide; this one was the one holdout still
  // defaulting to `false` (expanded). `/` still un-minimizes it from
  // anywhere, unchanged.
  const [innerMinimized, setInnerMinimized] = useState(true)
  const minimized = controlledMinimized ?? innerMinimized
  const setMinimized = (m: boolean) => {
    if (onMinimizedChange) onMinimizedChange(m)
    if (controlledMinimized === undefined) setInnerMinimized(m)
  }
  const inputRef = useRef<HTMLInputElement>(null)
  // Skips the focus effect below on first mount — see that effect's comment.
  const firstRender = useRef(true)

  // Always the whole corpus (see the `outsideFilter` prop doc above) — never
  // narrowed by the scope filter or the isolate. Both are surfaced as row
  // tags instead, same shape, so search never says "Nothing matches" for a
  // report that plainly exists somewhere outside the current view.
  const reportResults = useMemo(
    () => search(graph, query, ALWAYS_VISIBLE),
    [graph, query],
  )

  const groupResults = useMemo(
    () => searchGroups(query, groups),
    [groups, query],
  )

  /**
   * Reports and groups merged into one ranked list. Both scorers share the
   * same 0-300ish scale (a whole-string match on the top-weighted field
   * scores `100 * 3`), so a plain score sort interleaves them sensibly rather
   * than one kind always burying the other — searching "canada" surfaces the
   * Canada country group first (a whole-label match) with Canadian reports
   * right behind it, which is the useful order, not an accident of list
   * concatenation order.
   */
  const results = useMemo<CombinedResult[]>(() => {
    const merged: CombinedResult[] = [
      ...reportResults.map((r) => ({ kind: 'report' as const, report: r.report, score: r.score })),
      ...groupResults.map((g) => ({ kind: 'group' as const, group: g.group, score: g.score })),
    ]
    return merged.sort((a, b) => b.score - a.score).slice(0, 8)
  }, [reportResults, groupResults])

  useEffect(() => setActive(0), [query])

  // "/" to search is the convention everywhere text is searched, and it costs
  // the user nothing to discover by accident. Ignored while already typing —
  // in ANY text field, not just this panel's own input (2026-08-21,
  // full-review item 3: typing "US/EU" into the Views ▸ "Name this view"
  // field lost everything after the slash and teleported focus here; the
  // GroupsPanel country box and the Compare pickers were bitten the same
  // way). Also un-minimizes — "/" is the keyboard escape hatch out of the
  // collapsed pill, same as a click on it.
  const setMinimizedRef = useRef(setMinimized)
  setMinimizedRef.current = setMinimized
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement as HTMLElement | null
      const typing =
        !!el &&
        (el.tagName === 'INPUT' ||
          el.tagName === 'TEXTAREA' ||
          el.tagName === 'SELECT' ||
          el.isContentEditable)
      if (e.key === '/' && !typing) {
        e.preventDefault()
        setMinimizedRef.current(false)
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Focuses the input whenever it actually re-expands — but not on first
  // mount, or the page would steal focus into this box before anyone asked
  // for it. The "/" handler above already focuses synchronously in the same
  // event when the input is already mounted; this effect exists for the
  // OTHER path, expanding from the collapsed pill, where the input has not
  // mounted yet at the moment `setMinimized(false)` runs.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (!minimized) inputRef.current?.focus()
  }, [minimized])

  function chooseResult(result: CombinedResult) {
    if (result.kind === 'report') {
      onChoose(result.report)
    } else {
      onChooseGroup(result.group.id)
    }
    setQuery('')
    inputRef.current?.blur()
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      chooseResult(results[active])
    } else if (e.key === 'Escape') {
      // An empty box minimizes — same convention as every other drop-up
      // panel's Escape-closes behaviour; a non-empty box just clears first,
      // so one key does the obvious thing at each stage of backing out.
      // BOTH branches stop propagation (2026-08-21, full-review item 3):
      // each is this press's one consumed action, and letting the minimize
      // branch fall through to the window handler meant Escape on an empty
      // box also destroyed an active isolate — the exact one-key-two-
      // destructions bug the Escape priority stack in App.tsx exists to
      // prevent.
      e.stopPropagation()
      if (query) {
        setQuery('')
      } else {
        setMinimized(true)
      }
    }
  }

  // Compact layout: no pill — the Panels ▾ submenu is the only handle, and
  // the open bar hugs the left edge at whatever width the window allows.
  const wrapStyle: React.CSSProperties = compact
    ? { ...wrap, left: 20, width: `min(${SEARCH_BAR_WIDTH}px, calc(100vw - 40px))` }
    : wrap

  if (minimized) {
    if (compact) return null
    return (
      <div style={wrap}>
        <button
          type="button"
          onClick={() => setMinimized(false)}
          style={pill}
        >
          Find anything…  /
        </button>
      </div>
    )
  }

  return (
    <div style={wrapStyle}>
      <div style={inputRow}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Find a report, region, bloc, or country…  /"
          spellCheck={false}
          style={input}
        />
        <button
          type="button"
          onClick={() => setMinimized(true)}
          title="Minimize"
          style={minimizeButton}
        >
          –
        </button>
      </div>

      {query && (
        <div style={list}>
          {results.length === 0 && (
            <div style={{ ...empty }}>
              Nothing matches. Every word has to appear somewhere in a report,
              region, bloc, publisher, or country name.
            </div>
          )}
          {results.map((result, i) => {
            if (result.kind === 'report') {
              const report = result.report
              return (
                <div
                  key={`r:${report.id}`}
                  onMouseDown={(e) => {
                    // mousedown, not click: blurring the input on click would
                    // unmount this list before the click ever landed.
                    e.preventDefault()
                    chooseResult(result)
                  }}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    ...resultRow,
                    background: i === active ? 'var(--accent-soft)' : 'transparent',
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 7,
                      flexShrink: 0,
                      marginTop: 5,
                      background: colourForReport(report),
                    }}
                  />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ color: 'var(--ink-strong)', fontSize: 12.5, lineHeight: 1.35 }}>
                      {report.title}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        color: 'var(--ink-mute)',
                        fontSize: 10.5,
                        marginTop: 2,
                      }}
                    >
                      {report.publisher} · {report.region}
                    </span>
                  </span>
                  {outsideIsolate?.(report) && (
                    <span
                      title="The active isolate hides this report. Choosing it leaves the isolate."
                      style={outsideTag}
                    >
                      outside isolate
                    </span>
                  )}
                  {outsideFilter?.(report) && (
                    <span
                      title="The Countries/Domains filter hides this report. Choosing it clears the filter."
                      style={outsideTag}
                    >
                      outside filter
                    </span>
                  )}
                  <span style={{ color: 'var(--ink-faint)', fontSize: 10.5, marginTop: 2 }}>
                    {report.in_degree} in
                  </span>
                </div>
              )
            }

            const group = result.group
            const isolated = !!selectedGroupId && group.id === selectedGroupId
            return (
              <div
                key={`g:${group.id}`}
                onMouseDown={(e) => {
                  e.preventDefault()
                  chooseResult(result)
                }}
                onMouseEnter={() => setActive(i)}
                title={
                  isolated
                    ? `Click to stop isolating ${group.label}`
                    : `Isolate ${group.label} — show it and everything it actually connects to, including internationally`
                }
                style={{
                  ...resultRow,
                  background: i === active ? 'var(--accent-soft)' : 'transparent',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 7,
                    flexShrink: 0,
                    marginTop: 5,
                    border: '1.5px solid var(--ink-mute)',
                    background: 'transparent',
                  }}
                />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ color: 'var(--ink-strong)', fontSize: 12.5, lineHeight: 1.35 }}>
                    {group.label}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      color: 'var(--ink-mute)',
                      fontSize: 10.5,
                      marginTop: 2,
                    }}
                  >
                    {GROUP_KIND_LABEL[group.kind]} · isolate
                  </span>
                </span>
                {isolated && (
                  <span title="Already isolated — choosing it again turns this off" style={outsideTag}>
                    isolated
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/**
 * The search bar's width, exported because the calendar tab in
 * CalendarPanel.tsx now sits immediately to its right (moved there
 * 2026-08-20, alongside the bar itself moving off-centre — see that file's
 * own comment) and has to know where that edge is. Duplicating the number in
 * both files is how the two silently drift apart the first time this
 * changes.
 */
export const SEARCH_BAR_WIDTH = 380

/**
 * The search bar's left edge, exported for the same reason as
 * `SEARCH_BAR_WIDTH` — `CalendarPanel.tsx`'s tab is anchored off this bar,
 * not centred independently. Hand-measured clear of the Reports `PanelShell`
 * (`left: 20`, `width: 320`) plus its collapse tab (which pokes out to
 * roughly `320 + 26` from that panel's own left edge when expanded) and a
 * visible gap — see the file-level comment above for why this bar moved off
 * dead-centre in the first place. Worth a live look on a narrow window,
 * same as every other hand-measured offset in this codebase.
 */
export const SEARCH_BAR_LEFT = 400

const wrap: React.CSSProperties = {
  position: 'fixed',
  top: HUD_TOP,
  left: SEARCH_BAR_LEFT,
  width: SEARCH_BAR_WIDTH,
  zIndex: 20,
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

const inputRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'stretch',
  gap: 6,
}

const input: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  padding: '9px 12px',
  fontSize: 12.5,
  fontFamily: 'inherit',
  color: 'var(--ink-strong)',
  background: 'var(--panel-bg)',
  border: '1px solid var(--line)',
  borderRadius: 8,
  outline: 'none',
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
  boxSizing: 'border-box',
}

const minimizeButton: React.CSSProperties = {
  flexShrink: 0,
  width: 30,
  fontFamily: 'inherit',
  fontSize: 13,
  color: 'var(--ink-dim)',
  background: 'var(--panel-bg)',
  border: '1px solid var(--line)',
  borderRadius: 8,
  cursor: 'pointer',
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
  lineHeight: 1,
}

const list: React.CSSProperties = {
  marginTop: 6,
  padding: 4,
  background: 'var(--panel-bg-solid)',
  border: '1px solid var(--line)',
  borderRadius: 8,
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
}

const resultRow: React.CSSProperties = {
  display: 'flex',
  gap: 9,
  alignItems: 'flex-start',
  padding: '7px 9px',
  borderRadius: 6,
  cursor: 'pointer',
}

const empty: React.CSSProperties = {
  padding: '8px 9px',
  fontSize: 11,
  color: 'var(--ink-dim)',
  lineHeight: 1.5,
}

// The "outside isolate" row tag — quiet, but present. It answers two
// questions at once: "why does search list things I cannot see" and "why
// did choosing this clear my isolate" (see the `outsideIsolate` prop). Reused
// (2026-08-22) for the group list's "isolated" tag — same quiet-badge shape,
// a different one-word label.
const outsideTag: React.CSSProperties = {
  flexShrink: 0,
  alignSelf: 'flex-start',
  marginTop: 3,
  padding: '1px 5px',
  fontSize: 9,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: 'var(--ink-dim)',
  border: '1px solid var(--line)',
  borderRadius: 4,
  whiteSpace: 'nowrap',
}
