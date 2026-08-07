import { useEffect, useMemo, useRef, useState } from 'react'
import type { Graph, ScoredReport } from '../lib/types'
import type { NodePredicate } from '../lib/filter'
import { search } from '../lib/search'
import { colourForReport } from '../lib/palette'

/**
 * Find-by-name.
 *
 * Sits top-centre because it is the primary way into the graph, not an option
 * about it — the view and filter controls are instrumentation and live off to
 * the side. Collapsed to a single line until it is used, so it costs almost
 * nothing when it is not.
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
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(
    () => search(graph, query, within),
    [graph, query, within],
  )

  useEffect(() => setActive(0), [query])

  // "/" to search is the convention everywhere text is searched, and it costs
  // the user nothing to discover by accident. Ignored while already typing, or
  // the key would be swallowed by the field it just opened.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
      // Only clears the box. Escape with an empty box falls through to the
      // window handler that clears the selection, so one key does the obvious
      // thing at each stage of backing out.
      if (query) {
        e.stopPropagation()
        setQuery('')
      } else {
        inputRef.current?.blur()
      }
    }
  }

  return (
    <div style={wrap}>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Find a report…  /"
        spellCheck={false}
        style={input}
      />

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
                background: i === active ? 'rgba(110, 168, 255, 0.12)' : 'transparent',
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
                <span style={{ color: '#dde5f2', fontSize: 12.5, lineHeight: 1.35 }}>
                  {report.title}
                </span>
                <span
                  style={{
                    display: 'block',
                    color: '#6f829e',
                    fontSize: 10.5,
                    marginTop: 2,
                  }}
                >
                  {report.publisher} · {report.region}
                </span>
              </span>
              <span style={{ color: '#556785', fontSize: 10.5, marginTop: 2 }}>
                {report.in_degree} in
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const wrap: React.CSSProperties = {
  position: 'fixed',
  top: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 380,
  zIndex: 20,
}

const input: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  fontSize: 12.5,
  fontFamily: 'inherit',
  color: '#dde5f2',
  background: 'rgba(10, 14, 24, 0.82)',
  border: '1px solid rgba(90, 115, 160, 0.28)',
  borderRadius: 8,
  outline: 'none',
  backdropFilter: 'blur(8px)',
  boxSizing: 'border-box',
}

const list: React.CSSProperties = {
  marginTop: 6,
  padding: 4,
  background: 'rgba(8, 12, 21, 0.93)',
  border: '1px solid rgba(90, 115, 160, 0.28)',
  borderRadius: 8,
  backdropFilter: 'blur(10px)',
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
  color: '#5e6f8a',
  lineHeight: 1.5,
}
