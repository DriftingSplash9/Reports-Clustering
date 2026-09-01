import { useState, type ReactNode } from 'react'
import { HUD_TOP } from '../lib/uiTheme'

/**
 * A fixed-position panel that can be rolled off the edge of the screen,
 * leaving a tab behind.
 *
 * Why this exists as a shared component rather than a boolean in each panel:
 * there are two panels, they sit on opposite edges, and the thing that has to
 * be right is the *direction* each one slides. Written twice, that is two
 * chances to slide a panel the wrong way and have it cover the graph it was
 * meant to uncover. Written once, the side is a parameter.
 *
 * The panel slides rather than unmounting. Unmounting would reset any internal
 * state the panel holds and would make the transition impossible, and the graph
 * behind it is the reason someone is collapsing it — they want it out of the
 * way, not thrown away.
 *
 * `pointerEvents` is set to `none` while collapsed. Without it the panel is
 * still off-screen but its bounding box can sit over the canvas on a narrow
 * window and swallow orbit drags, which reads as the graph being broken.
 */
export function PanelShell({
  side,
  label,
  width,
  children,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  hideTab = false,
}: {
  side: 'left' | 'right'
  /** Shown on the tab when collapsed, and as the tab's title always. */
  label: string
  /** Must match the panel's own width, or the slide stops short of the edge. */
  width: number
  children: ReactNode
  defaultCollapsed?: boolean
  /**
   * Controlled mode (2026-08-31, compact layout — see `useCompactLayout.ts`):
   * when given, the parent owns the collapsed state and the Panels ▾ submenu
   * drives it. Uncontrolled (the desktop default) keeps the tab-click
   * behaviour below exactly as it was.
   */
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  /** Compact layout: the tab is not drawn — the menu is the only handle. */
  hideTab?: boolean
}) {
  const [innerCollapsed, setInnerCollapsed] = useState(defaultCollapsed)
  const collapsed = controlledCollapsed ?? innerCollapsed
  const setCollapsed = (next: boolean | ((c: boolean) => boolean)) => {
    const value = typeof next === 'function' ? next(collapsed) : next
    if (onCollapsedChange) onCollapsedChange(value)
    if (controlledCollapsed === undefined) setInnerCollapsed(value)
  }

  // Slide by the panel's full width plus its 20px offset from the edge, so it
  // clears the viewport rather than leaving a sliver behind. The extra 24 is
  // the border, padding and blur bleed; a sliver of a blurred panel at the
  // screen edge reads as a rendering fault.
  const shift = width + 44
  const off = side === 'left' ? -shift : shift

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: HUD_TOP,
          [side]: 20,
          width,
          transform: `translateX(${collapsed ? off : 0}px)`,
          transition: 'transform 220ms cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: collapsed ? 'none' : 'auto',
          zIndex: 5,
        }}
      >
        {children}
      </div>

      {/*
        The tab is a sibling rather than a child of the sliding element, so it
        stays put while the panel moves. As a child it would slide off with the
        panel and there would be nothing left to click to bring it back — which
        is the one failure mode that makes this feature worse than not having
        it.
      */}
      {!hideTab && (
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        title={collapsed ? `Show ${label}` : `Hide ${label}`}
        aria-expanded={!collapsed}
        style={{
          position: 'fixed',
          top: HUD_TOP,
          [side]: 20,
          // While expanded the tab sits just *inside* the panel's far edge, not
          // outside it. Outside was the first attempt and both tabs ended up half
          // off-screen — at `left: 20` translated -22px the button starts at -2 —
          // which the screenshot caught and nothing else would have.
          //
          // Moved with `transform`, not by animating `left`/`right`. Animating an
          // offset property relayouts the page on every frame, and the second
          // attempt here did that and then measured wrong: the inline style read
          // `left: 20px` while the computed value stayed at 346px, the transition
          // having never advanced. `transform` composites instead of relayouting,
          // and it is the property the panel itself already slides on.
          transform: collapsed
            ? 'translateX(0)'
            : `translateX(${side === 'left' ? width + 6 : -(width + 6)}px)`,
          transition: 'transform 220ms cubic-bezier(0.4, 0, 0.2, 1)',
          padding: collapsed ? '5px 9px' : '5px 6px',
          fontFamily: 'inherit',
          fontSize: 10,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ink-dim)',
          background: 'var(--panel-bg)',
          border: '1px solid var(--line)',
          borderRadius: 6,
          boxShadow: 'var(--panel-shadow)',
          backdropFilter: 'var(--glass-filter)',
          cursor: 'pointer',
          zIndex: 6,
          lineHeight: 1,
        }}
      >
        {collapsed ? label : side === 'left' ? '‹' : '›'}
      </button>
      )}
    </>
  )
}
