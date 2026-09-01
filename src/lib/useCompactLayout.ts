import { useEffect, useState } from 'react'

/**
 * Compact layout — the top row folds into the Panels menu.
 *
 * Added 2026-08-31 (second independent audit, F-12; Thomas: "collapse the
 * panels into a single dropdown menu with submenus on smaller screen sizes").
 * The top row is the last hand-anchored strip in the app: Reports tab at
 * `left: 20`, search bar at `SEARCH_BAR_LEFT` (400) × 380, Calendar tab at
 * 788, View tab at `right: 20`. Below roughly 1000px those coordinates
 * collide — the dev-only overlap tripwire in App.tsx fires every 4 s at
 * ≤ ~900px — and no amount of re-measuring fixes a row that is simply wider
 * than the window. So below `COMPACT_BREAKPOINT` the four standalone
 * tabs/pills are not drawn at all; each of those panels is opened and closed
 * from a submenu under Panels ▾ instead, one at a time, and the open one
 * anchors at the window's left/right edge rather than its desktop offset.
 *
 * Why 1024 and not the ~900 where the collision starts: the Reports panel
 * expanded (320) + its tab + the search bar (380) + the Calendar tab need
 * ~980px before the View tab on the right; 1024 leaves a margin so the
 * desktop layout never renders in a state the tripwire would flag.
 */
export const COMPACT_BREAKPOINT = 1024

const QUERY = `(max-width: ${COMPACT_BREAKPOINT - 1}px)`

export function useCompactLayout(): boolean {
  const [compact, setCompact] = useState<boolean>(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(QUERY).matches
      : false,
  )
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(QUERY)
    const onChange = (e: MediaQueryListEvent) => setCompact(e.matches)
    setCompact(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return compact
}
