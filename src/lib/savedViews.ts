import { DEFAULT_VIEW, type ViewSettings } from './view'
import { NO_FILTER, type FilterState } from './filter'
import { DEFAULT_DRILLDOWN, type Drilldown } from './hierarchy'
import type { Country } from './types'
import type { PanelVisibility } from '../components/MenuBar'
import { PANELS_HIDDEN } from '../components/MenuBar'

/**
 * Saved views — Phase 4 §7.1.
 *
 * Thomas: *"It could be annoying to always open to the basic graph and then
 * have to adjust all these settings the way you like."* That sentence is the
 * whole specification, and it is worth reading twice: the complaint is about
 * **opening**, not about switching. So this feature is not really "saved
 * views" — it is "stop making me rebuild my setup every session", and the part
 * that answers it is `openOnLoad` at the bottom of this file. Saving several
 * and switching between them is the pleasant extra.
 *
 * **Not tabs.** A genuinely live tab is a second `<Canvas>`, a second set of
 * ~1,250 meshes and a second d3-force simulation ticking every frame. The
 * brief costed it and the answer was no. One canvas, N saved states: switching
 * `view` or `filter` is instant (the `forceGraph` memo does not rebuild —
 * the accessors read refs and re-digest), while switching `drilldown` or
 * `view.spread` rebuilds and costs the same visible beat the tier buttons
 * already cost. That is a good trade, and it is worth being plain about which
 * half you are getting.
 *
 * **Never put the active view in the `forceGraph` memo's dependency array** —
 * the same standing rule as the lenses. Swap the state and let the existing
 * deps notice what actually changed.
 */

/**
 * **Versioned from day one, because the shape has never stopped moving.**
 * `ViewSettings` gained `geoAffinity`, `spread`, `fog`, `glow` and `lens` in
 * successive rounds, and lost `blueprint` outright on 2026-08-19. A view saved
 * last week must not break next week's build.
 *
 * Bump this only for a change no merge can absorb. Adding a field does not
 * need a bump — `restore()` merges into the current defaults, so an old save
 * simply picks up the new field's default.
 */
const SCHEMA = 1
const STORAGE_KEY = 'rig.views.v1'

export interface SavedView {
  id: string
  name: string
  savedAt: string
  drilldown: Drilldown
  /**
   * Countries individually expanded past their per-country fold — see
   * hierarchy.ts's 2026-08-20 note. Added the same day; `restoreOne` defaults
   * a save from before that to `[]`, which is exactly what it should mean —
   * an old save never had any country individually opened.
   */
  openedCountries: readonly Country[]
  view: ViewSettings
  filter: FilterState
  /** The traced node, if one was selected when the view was saved. */
  selectedId: string | null
  /** Which HUD panels were showing. Part of "the way you like it". */
  panels: PanelVisibility
}

interface Stored {
  schema: number
  views: SavedView[]
  /** `id` of the view to apply on load, or null for the plain graph. */
  openOnLoad: string | null
}

const EMPTY: Stored = { schema: SCHEMA, views: [], openOnLoad: null }

/**
 * Merge a saved fragment over the current defaults, never the other way round.
 *
 * This is the line that makes an old save degrade instead of breaking: an
 * unknown-shaped or partial blob contributes whatever fields it does have and
 * the rest come from today's defaults. Replacing wholesale would hand the app
 * a `ViewSettings` missing a field every consumer assumes is present.
 */
function restoreOne(raw: Partial<SavedView> & { id?: string }): SavedView | null {
  if (!raw || typeof raw !== 'object' || !raw.id) return null
  return {
    id: String(raw.id),
    name: typeof raw.name === 'string' && raw.name.trim() ? raw.name : 'Untitled view',
    savedAt: typeof raw.savedAt === 'string' ? raw.savedAt : '',
    drilldown: typeof raw.drilldown === 'number' ? raw.drilldown : DEFAULT_DRILLDOWN,
    openedCountries: Array.isArray(raw.openedCountries)
      ? raw.openedCountries.filter((c): c is Country => typeof c === 'string')
      : [],
    view: { ...DEFAULT_VIEW, ...(raw.view ?? {}) },
    filter: { ...NO_FILTER, ...(raw.filter ?? {}) },
    selectedId: typeof raw.selectedId === 'string' ? raw.selectedId : null,
    panels: { ...PANELS_HIDDEN, ...(raw.panels ?? {}) },
  }
}

export function loadViews(): Stored {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<Stored>
    // A future schema is not readable by this build. Ignoring it is right:
    // the alternative is guessing at a shape written by code that does not
    // exist yet, and the cost of ignoring is one rebuilt view.
    if (typeof parsed.schema === 'number' && parsed.schema > SCHEMA) return EMPTY
    const views = Array.isArray(parsed.views)
      ? parsed.views.map(restoreOne).filter((v): v is SavedView => v !== null)
      : []
    const openOnLoad =
      typeof parsed.openOnLoad === 'string' && views.some((v) => v.id === parsed.openOnLoad)
        ? parsed.openOnLoad
        : null
    return { schema: SCHEMA, views, openOnLoad }
  } catch {
    // Corrupt JSON, disabled storage, private browsing. Losing saved views is
    // a disappointment; failing to start is a bug.
    return EMPTY
  }
}

export function persistViews(state: Stored): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, schema: SCHEMA }))
  } catch {
    // Quota or disabled storage — the session keeps working, the save is lost.
  }
}

/**
 * Ids are derived from the clock rather than from the name, so renaming later
 * (if that ever arrives) cannot orphan `openOnLoad`, and two views may share a
 * name without colliding.
 */
export function newViewId(): string {
  return `v${Date.now().toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`
}

export type { Stored as SavedViewStore }
