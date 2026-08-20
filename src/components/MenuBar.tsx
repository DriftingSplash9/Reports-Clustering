import { useEffect, useRef, useState } from 'react'
import { MENU_BAR_HEIGHT } from '../lib/uiTheme'

/**
 * The menu bar — Phase 4 §6.
 *
 * Thomas circled seven HUD blocks and asked for them "hidden by default behind
 * Word-style dropdowns". Six of the seven are here. The seventh, the tier bar,
 * deliberately is NOT, and neither is its status line:
 *
 * - **The tier buttons are the primary navigation**, not a setting. Global →
 *   Nations → States → Everything is how the graph is meant to be read, and the
 *   onboarding card teaches it as the first thing anyone does. Behind a menu it
 *   becomes discoverable only by hunting.
 * - **The status line is the only feedback that a filter is on.** "136 shown ·
 *   1250 in this tier · filter hiding 1114" is what stops someone concluding
 *   the graph is broken when three quarters of it is missing — the exact
 *   confusion that produced the black-screen bug report. It stays visible
 *   because it is an alarm, not a readout.
 *
 * Both points were the pushback in the brief; they are honoured here rather
 * than argued again. If Thomas wants the tier bar hidden too, it is one entry
 * in `PANEL_ITEMS` away — but then the status line needs its own always-on
 * strip, and that is the part not to forget.
 *
 * **The bar toggles blocks where they live; it does not re-parent them.** A
 * dropdown that *contains* the Reports panel would mean stripping the fixed
 * positioning out of six components that each place themselves against a
 * specific screen edge, and those edges are load-bearing (the shelf sits
 * bottom-right because the fit deliberately leaves that corner empty; the
 * evidence card slides from the left because the selection card owns the
 * right). Toggling visibility is the Word behaviour anyway — View ▸ Ruler does
 * not put the ruler inside the menu.
 */

export type PanelKey = 'reports' | 'find' | 'calendar' | 'countries' | 'unlinked' | 'view'

export type PanelVisibility = Record<PanelKey, boolean>

/**
 * Hidden by default, as asked. The graph is the subject; every panel is an
 * annotation beside it, and the same "fit to the subject, not the scenery"
 * argument that deleted the platform slab applies to the chrome.
 */
export const PANELS_HIDDEN: PanelVisibility = {
  reports: false,
  find: false,
  calendar: false,
  countries: false,
  unlinked: false,
  view: false,
}

const PANEL_ITEMS: { key: PanelKey; label: string; hint: string }[] = [
  { key: 'reports', label: 'Reports', hint: 'Corpus totals, the most depended-upon reports, and the subject filters' },
  { key: 'find', label: 'Find a report', hint: 'Search by name — or just press /' },
  { key: 'calendar', label: 'Calendar', hint: 'What publishes when, banded by cadence' },
  { key: 'countries', label: 'Countries', hint: 'Show or hide whole countries and regions' },
  { key: 'unlinked', label: 'Unlinked reports', hint: 'The shelf of reports with no surviving edge in either direction' },
  { key: 'view', label: 'View controls', hint: 'Zoom, haze, glow, cluster spread, geo-affinity and the lens' },
]

export function MenuBar({
  panels,
  onToggle,
  onShowAll,
  onHideAll,
  onHowTo,
  onHelp,
}: {
  panels: PanelVisibility
  onToggle: (key: PanelKey) => void
  onShowAll: () => void
  onHideAll: () => void
  onHowTo: () => void
  onHelp: () => void
}) {
  const [open, setOpen] = useState<null | 'panels' | 'help'>(null)
  const barRef = useRef<HTMLDivElement | null>(null)

  /**
   * Close on any pointer down outside the bar, and on Escape.
   *
   * `pointerdown` rather than `click`: the canvas behind swallows clicks into
   * an orbit drag, so a `click` listener never fires for exactly the gesture
   * most likely to follow "I opened a menu by mistake" — dragging the graph.
   */
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpen(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const shownCount = PANEL_ITEMS.filter((p) => panels[p.key]).length

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: MENU_BAR_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '0 10px',
        background: 'var(--panel-bg-solid)',
        borderBottom: '1px solid var(--line-faint)',
        // Above every panel (they run 5–30) and above the selection cards, so a
        // menu is never opened underneath the thing it is meant to reveal.
        // Still below the onboarding dialog at 40, which is modal.
        zIndex: 35,
        fontSize: 11,
        letterSpacing: '0.04em',
        userSelect: 'none',
      }}
    >
      {/*
        The wordmark. It is here because the title used to live at the top of
        the Reports panel, and that panel is now hidden by default — without
        this the app opens with nothing anywhere saying what it is.
      */}
      <div
        style={{
          color: 'var(--ink-label)',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontSize: 10,
          marginRight: 14,
          whiteSpace: 'nowrap',
        }}
      >
        Economic Report Influence Graph
      </div>

      <MenuButton
        label="Panels"
        badge={shownCount ? String(shownCount) : undefined}
        isOpen={open === 'panels'}
        onClick={() => setOpen((o) => (o === 'panels' ? null : 'panels'))}
      >
        {PANEL_ITEMS.map((item) => (
          <MenuItem
            key={item.key}
            label={item.label}
            hint={item.hint}
            checked={panels[item.key]}
            onClick={() => onToggle(item.key)}
          />
        ))}
        <MenuSeparator />
        <MenuItem label="Show all" onClick={onShowAll} />
        <MenuItem label="Hide all" onClick={onHideAll} />
      </MenuButton>

      <MenuButton
        label="Help"
        isOpen={open === 'help'}
        onClick={() => setOpen((o) => (o === 'help' ? null : 'help'))}
      >
        {/*
          How-to RE-OPENS the onboarding card rather than restating it. A second
          copy of "double-click an orb, click to trace, drag to orbit" would
          drift out of step with the real one the first time a gesture changes,
          and this project has already paid for that twice (the shape legend
          outlived the shapes; the drilldown prose outlived the double-click).
        */}
        <MenuItem
          label="How to use this"
          hint="Re-opens the card the graph shows on first load"
          onClick={() => {
            onHowTo()
            setOpen(null)
          }}
        />
        <MenuItem
          label="What this is"
          hint="The plain-language description, straight out of START-HERE.md"
          onClick={() => {
            onHelp()
            setOpen(null)
          }}
        />
      </MenuButton>
    </div>
  )
}

function MenuButton({
  label,
  badge,
  isOpen,
  onClick,
  children,
}: {
  label: string
  badge?: string
  isOpen: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        style={{
          padding: '5px 10px',
          fontFamily: 'inherit',
          fontSize: 11,
          letterSpacing: '0.06em',
          color: isOpen ? 'var(--ink-strong)' : 'var(--ink-label)',
          background: isOpen ? 'var(--accent-active)' : 'transparent',
          border: '1px solid ' + (isOpen ? 'var(--line)' : 'transparent'),
          borderRadius: 5,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {label}
        {badge && (
          <span
            style={{
              fontSize: 9,
              color: 'var(--ink-dim)',
              border: '1px solid var(--line-faint)',
              borderRadius: 999,
              padding: '0 4px',
              lineHeight: '13px',
            }}
          >
            {badge}
          </span>
        )}
        <span style={{ fontSize: 8, color: 'var(--ink-dim)' }}>▾</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 5,
            minWidth: 260,
            padding: 5,
            background: 'var(--panel-bg-solid)',
            border: '1px solid var(--line)',
            borderRadius: 7,
            boxShadow: 'var(--panel-shadow)',
            zIndex: 36,
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

function MenuSeparator() {
  return <div style={{ height: 1, background: 'var(--line-faint)', margin: '4px 6px' }} />
}

function MenuItem({
  label,
  hint,
  checked,
  onClick,
}: {
  label: string
  hint?: string
  /** Omit entirely for a plain command; pass a boolean for a checkable item. */
  checked?: boolean
  onClick: () => void
}) {
  const [hover, setHover] = useState(false)
  const checkable = checked !== undefined
  return (
    <button
      type="button"
      role={checkable ? 'menuitemcheckbox' : 'menuitem'}
      aria-checked={checkable ? checked : undefined}
      onClick={onClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      title={hint}
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 8,
        width: '100%',
        textAlign: 'left',
        padding: '6px 8px',
        fontFamily: 'inherit',
        fontSize: 11,
        color: checked ? 'var(--ink-strong)' : 'var(--ink-label)',
        background: hover ? 'var(--accent-active)' : 'transparent',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
      }}
    >
      {/*
        A fixed-width gutter for the tick, so the labels line up whether or not
        an item is checkable and whether or not it is currently checked. Without
        it the list jitters horizontally every time something is toggled.
      */}
      <span style={{ width: 10, flex: '0 0 10px', color: 'var(--ink-gold)' }}>
        {checked ? '✓' : ''}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
    </button>
  )
}
