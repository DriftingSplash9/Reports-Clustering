import { useEffect, useMemo, useRef, useState } from 'react'
import { REGION_GROUPS, COUNTRY_GROUPS, type RegionGroup } from '../lib/regions'

/**
 * Two panels in one shell — Thomas, 2026-08-20: *"Breaking down the
 * international into one panel and countries in another... The other panel
 * can simply be a directory of nations."* Both sections share one predicate
 * (`matchesRegionGroup`, via `App.tsx`'s `handleChooseGroup`): clicking any
 * row here ISOLATES (hides everything not connected, keeps cross-border
 * ties) rather than filters — see the long comment atop `lib/regions.ts` for
 * why this is a different mechanism from the `ChipBar` "Countries" filter
 * panel, not a replacement for it.
 *
 * One shell, not two independent `PanelShell`s, is a scope call: `PanelShell`
 * hard-codes one slot per screen edge and both existing slots (left/Reports,
 * right/View) are taken. Two visually distinct, separately scrollable
 * sections inside one floating panel gets Thomas the "two panels" split he
 * asked for — Regions/Organizations vs a plain country directory — without a
 * `PanelShell` rewrite. Worth revisiting once he's seen it live.
 */
export function GroupsPanel({
  selectedGroupId,
  onChoose,
}: {
  selectedGroupId: string | null
  onChoose: (groupId: string) => void
}) {
  const [collapsed, setCollapsed] = useState(true)
  const [query, setQuery] = useState('')
  const wrapRef = useRef<HTMLDivElement>(null)

  // Same close-on-outside-click / Escape pattern as ChipBar (App.tsx) —
  // Thomas hit the "stuck open" trap once already; every drop-up panel in
  // this app closes the same two ways now.
  useEffect(() => {
    if (collapsed) return
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setCollapsed(true)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCollapsed(true)
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [collapsed])

  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COUNTRY_GROUPS
    return COUNTRY_GROUPS.filter((g) => g.label.toLowerCase().includes(q))
  }, [query])

  const selectedLabel =
    REGION_GROUPS.find((g) => g.id === selectedGroupId)?.label ??
    COUNTRY_GROUPS.find((g) => g.id === selectedGroupId)?.label ??
    null

  return (
    <div ref={wrapRef} style={wrap}>
      {collapsed ? (
        <button type="button" onClick={() => setCollapsed(false)} style={pill}>
          {selectedLabel ? `Isolated: ${selectedLabel}` : 'Regions & Countries'}
        </button>
      ) : (
        <div style={panel}>
          <div style={header}>
            <span style={title}>Regions & Organizations</span>
            {selectedGroupId && (
              <button
                type="button"
                onClick={() => onChoose(selectedGroupId)}
                title="Clear — back to whatever the filter/tier already shows"
                style={clearButton}
              >
                Clear
              </button>
            )}
          </div>
          <div style={list}>
            {REGION_GROUPS.map((g) => (
              <GroupRow key={g.id} group={g} selected={g.id === selectedGroupId} onChoose={onChoose} />
            ))}
          </div>

          <div style={{ ...header, marginTop: 10 }}>
            <span style={title}>Countries</span>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search countries…"
            style={searchInput}
          />
          <div style={{ ...list, maxHeight: '30vh' }}>
            {filteredCountries.map((g) => (
              <GroupRow key={g.id} group={g} selected={g.id === selectedGroupId} onChoose={onChoose} />
            ))}
            {filteredCountries.length === 0 && <div style={emptyRow}>No match</div>}
          </div>
        </div>
      )}
    </div>
  )
}

function GroupRow({
  group,
  selected,
  onChoose,
}: {
  group: RegionGroup
  selected: boolean
  onChoose: (groupId: string) => void
}) {
  return (
    <div
      onClick={() => onChoose(group.id)}
      title={
        selected
          ? `Click to stop isolating ${group.label}`
          : `Isolate ${group.label} — show it and everything it actually connects to, including internationally`
      }
      style={{ ...row, ...(selected ? rowSelected : null) }}
    >
      {group.label}
    </div>
  )
}

// Bottom-centre, not bottom-right — moved here 2026-08-20 (Thomas: "lets put
// the new Regions/Countries front and centre bottom of the graph"), taking
// over the exact slot the old ChipBar "Countries" filter pill used to sit in
// (see the ChipBar tombstone comment in App.tsx). Same `left: 50% +
// translateX(-50%)` centring trick ChipBar used, so this panel opens upward
// dead-centre under the graph the same way that one did.
const wrap: React.CSSProperties = {
  position: 'fixed',
  bottom: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 6,
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
  maxWidth: 260,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const panel: React.CSSProperties = {
  width: 260,
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
  marginBottom: 4,
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

const list: React.CSSProperties = {
  overflowY: 'auto',
  maxHeight: '22vh',
}

const row: React.CSSProperties = {
  fontSize: 11.5,
  lineHeight: 2.05,
  cursor: 'pointer',
  color: 'var(--ink-body)',
  opacity: 0.85,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const rowSelected: React.CSSProperties = {
  opacity: 1,
  color: 'var(--accent-line)',
  fontWeight: 600,
}

const searchInput: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 11.5,
  color: 'var(--ink-body)',
  background: 'var(--field-bg, transparent)',
  border: '1px solid var(--line-faint)',
  borderRadius: 6,
  padding: '4px 7px',
  margin: '2px 0 6px',
  outline: 'none',
}

const emptyRow: React.CSSProperties = {
  fontSize: 11,
  color: 'var(--ink-faint)',
  padding: '4px 0',
}
