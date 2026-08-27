import { useEffect, useRef, useState } from 'react'
import type { SavedView } from '../lib/savedViews'
import { MENU_BAR_HEIGHT } from '../lib/uiTheme'

/**
 * The menu bar — Phase 4 §6.
 *
 * Thomas circled seven HUD blocks and asked for them "hidden by default behind
 * Word-style dropdowns". Six of the seven are here. The seventh, the tier bar,
 * deliberately is NOT, and neither is its status line:
 *
 * **Superseded 2026-08-22 (item 5z): "hidden by default" became "on by
 * default, minimized"** — see `PANELS_DEFAULT` below, which now seeds a
 * fresh session instead of `PANELS_HIDDEN`. Thomas's own working layout (a
 * screenshot with all eight panels present as collapsed pills/tabs, none
 * fully absent) was the brief. The Panels menu, the toggle mechanism, and
 * `PANELS_HIDDEN` itself (still used by "Hide all" and as a safety fallback)
 * are unchanged — only which state a session with no saved `rig.panels.v1`
 * starts from.
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

export type PanelKey =
  | 'reports'
  | 'find'
  | 'calendar'
  | 'groups'
  | 'unlinked'
  | 'view'
  | 'legend'
  | 'compare'

export type PanelVisibility = Record<PanelKey, boolean>

/**
 * Every panel OFF. No longer the fresh-session default (see `PANELS_DEFAULT`
 * below, 2026-08-22) — this is now purely the "Hide all" state and the
 * corrupted-storage safety fallback. Kept as its own constant rather than
 * inlined at both call sites so "Hide all" and "something went wrong reading
 * localStorage" stay obviously the same state, not two literals that could
 * drift apart.
 *
 * `countries` (the old ChipBar family/level filter) was removed from this
 * key set entirely 2026-08-20, not just hidden — see the tombstone comment
 * in `App.tsx` where `ChipBar` used to be defined. `GroupsPanel` ("groups"
 * below) now sits in the bottom-centre slot it used to occupy. A stale
 * `countries: true` left over in someone's persisted `rig.panels.v1` from
 * before this change is harmless — it is just an unread extra key now.
 */
export const PANELS_HIDDEN: PanelVisibility = {
  reports: false,
  find: false,
  calendar: false,
  groups: false,
  unlinked: false,
  view: false,
  legend: false,
  compare: false,
}

/**
 * Every panel ON — the fresh-session default as of 2026-08-22 (item 5z),
 * replacing `PANELS_HIDDEN` in that role. Thomas: "why not have the graph
 * open with the menus like i have here? they don't need hidden, just
 * minimized," alongside a screenshot of his own session with all eight
 * panels present as collapsed pills/tabs rather than absent. This constant
 * only decides whether each panel's outer slot renders at all
 * (`App.tsx`'s `{panels.x && <X />}`); every one of the eight components
 * already opens in its OWN collapsed/minimized inner state by default
 * (`GroupsPanel`, `Legend`, `Compare`, `CalendarPanel` all already had
 * `useState(true)` for their own `collapsed`; `SearchPanel`'s `minimized`
 * and both `PanelShell` calls — Reports, View — needed the same treatment
 * alongside this change, see those files' own 2026-08-22 notes). The two
 * layers together are what actually produces "on screen as a pill, not
 * hidden, not sprawled open" — this constant alone would just open every
 * panel wide on every fresh visit.
 */
export const PANELS_DEFAULT: PanelVisibility = {
  reports: true,
  find: true,
  calendar: true,
  groups: true,
  unlinked: true,
  view: true,
  legend: true,
  compare: true,
}

const PANEL_ITEMS: { key: PanelKey; label: string; hint: string }[] = [
  { key: 'reports', label: 'Reports', hint: 'Corpus totals, the most depended-upon reports, and the subject filters' },
  { key: 'find', label: 'Find a report', hint: 'Search by name — or just press /' },
  { key: 'calendar', label: 'Calendar', hint: 'What publishes when, banded by cadence' },
  { key: 'groups', label: 'Regions, orgs & countries (isolate)', hint: 'Pick a continent, treaty bloc, publisher or single country to see just it plus everything it actually connects to, including across borders' },
  { key: 'unlinked', label: 'Unlinked reports', hint: 'The shelf of reports with no surviving edge in either direction' },
  { key: 'view', label: 'View controls', hint: 'Zoom, cluster spread, geo-affinity and the lens' },
  { key: 'legend', label: 'Legend', hint: 'What colour, size, fill, hollow rings, line colour and pulse rate each mean' },
  { key: 'compare', label: 'Compare two reports', hint: 'Pick any two reports and see everything they both rest on — or both feed into' },
]

export function MenuBar({
  panels,
  onToggle,
  onShowAll,
  onHideAll,
  onHowTo,
  onHelp,
  views,
  openOnLoad,
  onSaveView,
  onApplyView,
  onDeleteView,
  onSetOpenOnLoad,
  onCopyLink,
}: {
  panels: PanelVisibility
  onToggle: (key: PanelKey) => void
  onShowAll: () => void
  onHideAll: () => void
  onHowTo: () => void
  onHelp: () => void
  views: SavedView[]
  openOnLoad: string | null
  onSaveView: (name: string) => void
  onApplyView: (id: string) => void
  onDeleteView: (id: string) => void
  onSetOpenOnLoad: (id: string | null) => void
  /**
   * Item 13, 2026-08-20 — shareable deep links. Synchronous: App.tsx builds
   * the URL from whatever `drilldown`/`view`/`filter`/`selectedId`/
   * `selectedGroupId` are RIGHT NOW and hands back a string; this component
   * only owns writing it to the clipboard and the "Copied" feedback, the
   * same division of labour `onSaveView` already has (App owns the data,
   * MenuBar owns the interaction).
   */
  onCopyLink: () => string
}) {
  const [open, setOpen] = useState<null | 'panels' | 'help' | 'views'>(null)
  const [draftName, setDraftName] = useState('')
  const [linkCopied, setLinkCopied] = useState(false)
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
      if (e.key === 'Escape') {
        // Closing the open menu is the press's one action — the flag tells
        // App.tsx's Escape priority stack not to ALSO clear the selection
        // or isolate (2026-08-21, full-review item 3).
        e.preventDefault()
        setOpen(null)
      }
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

      {/*
        Views. Third menu rather than a section inside Panels: a panel toggle
        is a momentary preference, a saved view is a document, and putting a
        destructive Delete in the same list as a checkbox invites the wrong
        click.
      */}
      <MenuButton
        label="Views"
        badge={views.length ? String(views.length) : undefined}
        isOpen={open === 'views'}
        onClick={() => setOpen((o) => (o === 'views' ? null : 'views'))}
      >
        {/*
          An inline field, not `window.prompt`. A native prompt blocks the
          whole page — including the render loop behind it — and this project
          has a standing note that modal browser dialogs wedge automation and
          anything else waiting on a frame.
        */}
        <div style={{ display: 'flex', gap: 5, padding: '4px 6px 8px' }}>
          <input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && draftName.trim()) {
                onSaveView(draftName.trim())
                setDraftName('')
              }
              // Escape must not reach the window handler, which would close
              // the menu out from under a half-typed name.
              if (e.key === 'Escape') e.stopPropagation()
            }}
            placeholder="Name this view…"
            style={{
              flex: 1,
              minWidth: 0,
              padding: '5px 7px',
              fontFamily: 'inherit',
              fontSize: 11,
              color: 'var(--ink-strong)',
              background: 'var(--btn-bg)',
              border: '1px solid var(--line-faint)',
              borderRadius: 5,
              outline: 'none',
            }}
          />
          <button
            type="button"
            disabled={!draftName.trim()}
            onClick={() => {
              onSaveView(draftName.trim())
              setDraftName('')
            }}
            style={{
              padding: '5px 10px',
              fontFamily: 'inherit',
              fontSize: 10.5,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: draftName.trim() ? 'var(--ink-strong)' : 'var(--ink-dim)',
              background: draftName.trim() ? 'var(--accent-active)' : 'transparent',
              border: '1px solid var(--line-faint)',
              borderRadius: 5,
              cursor: draftName.trim() ? 'pointer' : 'default',
            }}
          >
            Save
          </button>
        </div>

        {/*
          Copy link — item 13. Distinct from Save just above: Save writes to
          THIS browser's storage for the person sitting here; this builds a
          URL anyone can open to land on the exact same tier, filters and
          selection, with no account and no storage involved on either end.
          `document.execCommand` fallback because Clipboard API can be
          unavailable outside a secure context — unlikely on this app's own
          localhost dev server, but cheap insurance for whatever it ends up
          deployed behind.
        */}
        <div style={{ padding: '0 6px 8px' }}>
          <button
            type="button"
            onClick={async () => {
              const url = onCopyLink()
              try {
                await navigator.clipboard.writeText(url)
              } catch {
                const input = document.createElement('input')
                input.value = url
                input.style.position = 'fixed'
                input.style.opacity = '0'
                document.body.appendChild(input)
                input.select()
                document.execCommand('copy')
                document.body.removeChild(input)
              }
              setLinkCopied(true)
              setTimeout(() => setLinkCopied(false), 1500)
            }}
            title="Copy a URL that opens straight to this tier, filter and selection — for someone else, or for later"
            style={{
              width: '100%',
              padding: '6px 8px',
              fontFamily: 'inherit',
              fontSize: 10.5,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: linkCopied ? 'var(--ink-gold)' : 'var(--ink-label)',
              background: 'transparent',
              border: '1px solid var(--line-faint)',
              borderRadius: 5,
              cursor: 'pointer',
            }}
          >
            {linkCopied ? 'Link copied' : 'Copy link to this view'}
          </button>
        </div>

        {views.length === 0 ? (
          <div style={{ padding: '4px 8px 8px', fontSize: 10.5, color: 'var(--ink-dim)', lineHeight: 1.5 }}>
            Saves the tier, every slider, the filters, the traced node and which
            panels are open.
          </div>
        ) : (
          <>
            <MenuSeparator />
            {views.map((v) => (
              <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => onApplyView(v.id)}
                  title={v.savedAt ? `Saved ${v.savedAt}` : undefined}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    textAlign: 'left',
                    padding: '6px 8px',
                    fontFamily: 'inherit',
                    fontSize: 11,
                    color: 'var(--ink-label)',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 5,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {v.name}
                </button>
                {/*
                  The star is the feature Thomas actually asked for — "annoying
                  to always open to the basic graph". Clicking it again clears
                  it, so there is always a way back to the plain graph.
                */}
                <button
                  type="button"
                  aria-pressed={openOnLoad === v.id}
                  title={
                    openOnLoad === v.id
                      ? 'Opens on load — click to stop'
                      : 'Open this view on load'
                  }
                  onClick={() => onSetOpenOnLoad(openOnLoad === v.id ? null : v.id)}
                  style={{
                    padding: '4px 6px',
                    fontFamily: 'inherit',
                    fontSize: 11,
                    color: openOnLoad === v.id ? 'var(--ink-gold)' : 'var(--ink-dim)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {openOnLoad === v.id ? '★' : '☆'}
                </button>
                <button
                  type="button"
                  title={`Delete "${v.name}"`}
                  onClick={() => onDeleteView(v.id)}
                  style={{
                    padding: '4px 8px 4px 4px',
                    fontFamily: 'inherit',
                    fontSize: 12,
                    color: 'var(--ink-dim)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </>
        )}
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
