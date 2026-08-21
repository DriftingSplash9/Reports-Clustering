import { useEffect, useMemo, useRef, useState } from 'react'
import type { Graph, ScoredReport } from '../lib/types'
import type { NodePredicate } from '../lib/filter'
import { search } from '../lib/search'
import { colourForReport } from '../lib/palette'
import { HUD_TOP } from '../lib/uiTheme'

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
 */
export default function SearchPanel({
  graph,
  within,
  onChoose,
}: {
  graph: Graph
  /** The current filter, so search never offers a node that is not drawn. */
  within: NodePredicate
  onChoose: (report: ScoredReport) => void
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [minimized, setMinimized] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  // Skips the focus effect below on first mount — see that effect's comment.
  const firstRender = useRef(true)

  const results = useMemo(
    () => search(graph, query, within),
    [graph, query, within],
  )

  useEffect(() => setActive(0), [query])

  // "/" to search is the convention everywhere text is searched, and it costs
  // the user nothing to discover by accident. Ignored while already typing, or
  // the key would be swallowed by the field it just opened. Also un-minimizes
  // — "/" is the keyboard escape hatch out of the collapsed pill, same as a
  // click on it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        setMinimized(false)
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

  function choose(report: ScoredReport) {
    onChoose(report)
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
      choose(results[active].report)
    } else if (e.key === 'Escape') {
      // An empty box minimizes — same convention as every other drop-up
      // panel's Escape-closes behaviour — rather than falling through to the
      // window handler that clears the selection; a non-empty box just
      // clears first, same as before, so one key does the obvious thing at
      // each stage of backing out.
      if (query) {
        e.stopPropagation()
        setQuery('')
      } else {
        setMinimized(true)
      }
    }
  }

  if (minimized) {
    return (
      <div style={wrap}>
        <button
          type="button"
          onClick={() => setMinimized(false)}
          style={pill}
        >
          Find a report…  /
        </button>
      </div>
    )
  }

  return (
    <div style={wrap}>
      <div style={inputRow}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Find a report…  /"
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
              Nothing matches. Every word has to appear somewhere in the report.
            </div>
          )}
          {results.map(({ report }, i) => (
            <div
              key={report.id}
              onMouseDown={(e) => {
                // mousedown, not click: blurring the input on click would
                // unmount this list before the click ever landed.
                e.preventDefault()
                choose(report)
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
              <span style={{ color: 'var(--ink-faint)', fontSize: 10.5, marginTop: 2 }}>
                {report.in_degree} in
              </span>
            </div>
          ))}
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
