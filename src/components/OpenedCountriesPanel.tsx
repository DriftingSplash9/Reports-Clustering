import { useEffect, useRef, useState } from 'react'
import type { Country } from '../lib/types'
import { countryLabelFor } from '../lib/palette'

/**
 * The opened-countries pill — HANDOFF item 8, 2026-08-25 ("Re-fold /
 * 'N countries opened' affordance — currently only a full Reset re-folds an
 * opened country").
 *
 * Renders nothing when no country is individually expanded — this is an
 * ADDITIONAL affordance, not a replacement for Reset, so it should not
 * occupy dock space when there is nothing for it to do. Same
 * collapsed-pill-by-default, outside-click/Escape-closes pattern as every
 * other drop-up panel in the dock (`Legend`, `GroupsPanel`) — see either
 * for why: Thomas hit a "stuck open" trap once and every panel closes the
 * same two ways now.
 *
 * Per-row "Fold" calls `hierarchy.ts`'s `foldCountry` (via `onFold`) — see
 * that function's comment for why an explicit named-row button is a
 * different, safe kind of control from the graph's own double-click
 * gesture, which still only ever adds detail. "Fold all" is the same
 * `new Set()` Reset already uses, just without touching camera/selection/
 * filter/drilldown — narrower than Reset on purpose.
 */
export function OpenedCountriesPanel({
  openedCountries,
  onFold,
  onFoldAll,
}: {
  openedCountries: ReadonlySet<Country>
  onFold: (country: Country) => void
  onFoldAll: () => void
}) {
  const [collapsed, setCollapsed] = useState(true)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (collapsed) return
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setCollapsed(true)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Same priority-stack flag as Legend/GroupsPanel — closing this
        // panel is the press's one action, it must not also clear the
        // selection or isolate (2026-08-21, full-review item 3).
        e.preventDefault()
        setCollapsed(true)
      }
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [collapsed])

  if (openedCountries.size === 0) return null

  const countries = Array.from(openedCountries).sort((a, b) =>
    countryLabelFor(a).localeCompare(countryLabelFor(b)),
  )

  return (
    <div ref={wrapRef} style={wrap}>
      {collapsed ? (
        <button type="button" onClick={() => setCollapsed(false)} style={pill}>
          Opened — {countries.length}
        </button>
      ) : (
        <div style={panel}>
          <div style={header}>
            <span style={title}>Opened countries</span>
            <button type="button" onClick={() => setCollapsed(true)} style={clearButton}>
              Close
            </button>
          </div>

          <div style={list}>
            {countries.map((c) => (
              <div key={c} style={row}>
                <span style={rowLabel}>{countryLabelFor(c)}</span>
                <button type="button" onClick={() => onFold(c)} style={foldButton}>
                  Fold
                </button>
              </div>
            ))}
          </div>

          <div style={footer}>
            <button
              type="button"
              onClick={() => {
                onFoldAll()
                setCollapsed(true)
              }}
              style={foldAllButton}
            >
              Fold all
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Bottom-centre, alongside Compare/GroupsPanel/Legend — see `App.tsx`'s
// `bottomDockCentre` (a flex-wrap row, "a one-line dock-cell addition" per
// PLAYBOOK.md §6 on new bottom panels). `pointerEvents: 'auto'` because the
// dock container itself is 'none'.
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
  width: 236,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 12px',
  background: 'var(--panel-bg-solid)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
  userSelect: 'none',
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
  whiteSpace: 'nowrap',
}

const list: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  maxHeight: '52vh',
  overflowY: 'auto',
}

const row: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
}

const rowLabel: React.CSSProperties = {
  fontSize: 11.5,
  color: 'var(--ink-strong)',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const foldButton: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 9,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--ink-dim)',
  background: 'transparent',
  border: '1px solid var(--line)',
  borderRadius: 5,
  padding: '2px 7px',
  cursor: 'pointer',
  lineHeight: 1.4,
  flexShrink: 0,
}

// Below the list rather than in the header (2026-08-25) — the header
// couldn't fit "Opened countries" plus two buttons at this panel's width;
// a footer row means only ONE button ever has to share a line with the
// title (Close, same shape as Legend's header), and "Fold all" gets a
// full-width row of its own to sit flush right on.
const footer: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 6,
  marginTop: 6,
  borderTop: '1px solid var(--line-faint)',
}

const foldAllButton: React.CSSProperties = {
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
