import { DEFAULT_VIEW, type ViewSettings } from './view'
import { NO_FILTER, type FilterState } from './filter'
import { DEFAULT_DRILLDOWN, type Drilldown } from './hierarchy'
import type { Country } from './types'

/**
 * Item 13 of the 2026-08-20 todo list — shareable deep links.
 *
 * Thomas's own framing: "Nearly the same serialisation `savedViews.ts`
 * already does, but shareable, where saved views are local to one browser."
 * That is exactly the design here — the field set below is `SavedView`
 * minus `id`/`name`/`savedAt` (bookkeeping for a LIST of views, meaningless
 * for a single link) and minus `panels` (which HUD panels are open is a
 * personal layout preference, not part of "what to look at" — a link is
 * for sharing a VIEW OF THE DATA, not for rearranging someone else's
 * screen). `selectedGroupId` is new here, not in `SavedView`: it postdates
 * saved views (`GroupsPanel`, same day) and a link that reproduces an
 * Isolate-by-region view needs it just as much as `selectedId` does for a
 * single-node one.
 *
 * **Encoding**: the fragment is JSON, then base64 (`btoa`), then put in the
 * URL as `?rig=...`. Every field here is a structural id, a country code, a
 * number, or a boolean — no free text ever passes through this (report
 * titles and descriptions are never part of `SavedView` either) — so `btoa`
 * is safe outright; nothing here can contain a character outside Latin1.
 * Query string over the hash: a hash survives a page reload identically but
 * some link-preview bots and messaging apps strip everything after `#`
 * before fetching a preview, which would silently turn a shared link back
 * into the plain graph. `?rig=` is inert to those.
 *
 * **Reading it back**: `readDeepLink()` is called once, at module load, the
 * same way `STARTUP_VIEW` in `App.tsx` reads `loadViews()`'s `openOnLoad` —
 * see that constant's own comment for why this has to happen at module
 * scope rather than inside a hook. A deep link wins over a starred saved
 * view when both are present: opening someone else's link is a more
 * specific, more recent intent than "the view I usually open to." Whatever
 * a fragment is missing merges over `DEFAULT_VIEW`/`NO_FILTER`/etc — the
 * exact tolerant-merge shape `restoreOne` uses in `savedViews.ts` — so a
 * link built by an older or newer build still opens to something sane
 * rather than throwing.
 */

export interface DeepLinkState {
  drilldown: Drilldown
  openedCountries: readonly Country[]
  view: ViewSettings
  filter: FilterState
  selectedId: string | null
  selectedGroupId: string | null
}

const PARAM = 'rig'

/** Builds the full shareable URL for the CURRENT page, fragment encoded in `?rig=`. */
export function buildDeepLink(state: DeepLinkState): string {
  const json = JSON.stringify(state)
  const encoded = btoa(unescape(encodeURIComponent(json)))
  const url = new URL(window.location.href)
  url.search = ''
  url.hash = ''
  url.searchParams.set(PARAM, encoded)
  return url.toString()
}

/**
 * Reads `?rig=` off the CURRENT page's URL, if present. Null on anything
 * that does not parse — a malformed or hand-edited link should open the
 * plain graph, not a blank page.
 */
export function readDeepLink(): DeepLinkState | null {
  try {
    const encoded = new URLSearchParams(window.location.search).get(PARAM)
    if (!encoded) return null
    const json = decodeURIComponent(escape(atob(encoded)))
    const raw = JSON.parse(json) as Partial<DeepLinkState>
    if (!raw || typeof raw !== 'object') return null
    return {
      drilldown: typeof raw.drilldown === 'number' ? raw.drilldown : DEFAULT_DRILLDOWN,
      openedCountries: Array.isArray(raw.openedCountries)
        ? raw.openedCountries.filter((c): c is Country => typeof c === 'string')
        : [],
      view: { ...DEFAULT_VIEW, ...(raw.view ?? {}) },
      filter: { ...NO_FILTER, ...(raw.filter ?? {}) },
      selectedId: typeof raw.selectedId === 'string' ? raw.selectedId : null,
      selectedGroupId: typeof raw.selectedGroupId === 'string' ? raw.selectedGroupId : null,
    }
  } catch {
    // Hand-edited, truncated by a chat client, or from a build old/new
    // enough that the shape does not parse. Same rule as a corrupt saved
    // view in `savedViews.ts`: failing to start would be the actual bug.
    return null
  }
}

/**
 * Strips `?rig=` from the visible URL without a navigation/reload, once the
 * link has been read and applied. Otherwise the address bar keeps
 * advertising a snapshot of the moment the link was opened — the tier bar
 * already shows what changed since then, and a stale URL sitting in the
 * bar is exactly the kind of thing someone copies and re-shares by
 * accident, propagating an out-of-date view under a "look at this" that no
 * longer matches. `replaceState`, not a navigation: this must not add a
 * back-button entry for a URL rewrite the user did not ask for.
 */
export function clearDeepLinkFromAddressBar(): void {
  const url = new URL(window.location.href)
  if (!url.searchParams.has(PARAM)) return
  url.searchParams.delete(PARAM)
  window.history.replaceState(null, '', url.toString())
}
