import { ZOOM_MAX, ZOOM_MIN, type ViewSettings } from '../lib/view'

/**
 * View controls. Deliberately plain — this is instrumentation, not chrome, and
 * it should never draw attention away from the graph.
 */

const TOGGLES: { key: keyof ViewSettings; label: string; hint: string }[] = [
  { key: 'showPulses', label: 'Pulses', hint: 'Travelling teardrops, pointing the way influence moves. With arrows gone these are the only direction cue' },
  {
    key: 'showEdges',
    label: 'Edges',
    hint: 'The dependency lines. Pulses are independent — turn these off to see influence move with nothing else drawn',
  },
  { key: 'showHorizon', label: 'Horizon', hint: 'Sky gradient meeting the ground' },
  { key: 'showGroundGrid', label: 'Ground grid', hint: 'Infinite grid, fixed cell size — the scale ruler' },
  { key: 'showCube', label: 'Bounding box', hint: 'Wireframe extent of the network' },
  { key: 'autoRotate', label: 'Auto-orbit', hint: 'Slow automatic rotation' },
]

const SLIDERS: {
  key: 'fog' | 'glow' | 'spread'
  label: string
  hint: string
  /** Slider range; 0–1 when absent. Spread is a multiplier, so it runs 50%–250%. */
  min?: number
  max?: number
}[] = [
  {
    key: 'fog',
    label: 'Distance haze',
    hint: 'Fades the far side of the graph. The long lens deliberately suppresses depth, so at this many nodes this is most of what is left of it',
  },
  {
    key: 'glow',
    label: 'Glow',
    hint: 'Only the most depended-upon reports bleed light, so this reads as a second take on size rather than as atmosphere',
  },
  {
    key: 'spread',
    label: 'Cluster spread',
    hint: 'How much room the layout gives clusters, as a multiplier on the baseline. Rebuilds the layout when released, so it costs a beat; position still encodes nothing but the edges',
    min: 0.5,
    max: 2.5,
  },
]

/**
 * Kept in their own section because they do nothing until a node is selected,
 * and a toggle that appears inert is worse than one that is explained.
 */
const FOCUS_TOGGLES: { key: keyof ViewSettings; label: string; hint: string }[] = [
  {
    key: 'focusBuiltFrom',
    label: 'Built from',
    hint: 'Keep everything the selected report rests on, all the way down',
  },
  {
    key: 'focusFeedsInto',
    label: 'Feeds into',
    hint: 'Keep everything ultimately built on the selected report',
  },
]

/**
 * Which edges exist, by how well they are evidenced.
 *
 * A pair rather than a three-way choice, and shaped exactly like the focus
 * toggles above it, because the four states are all worth having:
 *
 *   documented only — the graph as the record supports it. The default, and
 *                     the view that honours the project's central rule.
 *   both            — what is probably true.
 *   implied only    — the research backlog, drawn. Every relationship someone
 *                     is confident about and nobody has found a source for.
 *   neither         — the nodes alone, which is the quickest way to see how
 *                     much of the picture is structure and how much is dots.
 */
const EVIDENCE_TOGGLES: {
  key: 'showDocumented' | 'showImplied'
  label: string
  hint: string
}[] = [
  {
    key: 'showDocumented',
    label: 'Documented',
    hint: 'Edges where a document explicitly states the dependency. Every one carries a link to it',
  },
  {
    key: 'showImplied',
    label: 'Implied',
    hint: 'Believed on strong grounds, with no document saying so. Drawn dashed, never pulsed, and excluded from the authority ranking — turning these on cannot change any size',
  },
]

export default function ViewControls({
  view,
  onChange,
  evidence,
  onEvidenceChange,
  impliedCount,
  hasSelection,
  onReset,
}: {
  view: ViewSettings
  onChange: (next: ViewSettings) => void
  evidence: { showDocumented: boolean; showImplied: boolean }
  onEvidenceChange: (key: 'showDocumented' | 'showImplied') => void
  impliedCount: number
  /** Only affects how the focus section is captioned. */
  hasSelection: boolean
  /** `clearFilter` is true when the control was shift-clicked. See the button. */
  onReset: (clearFilter: boolean) => void
}) {
  const set = <K extends keyof ViewSettings>(key: K, value: ViewSettings[K]) =>
    onChange({ ...view, [key]: value })

  return (
    <div style={panel}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={heading}>View</div>
        {/*
          Reset, added 2026-08-10 (Thomas, Q3). Recorded as open since V0.7 and
          described in the notes as the single thing that most affects whether a
          legibility check can be done at all — after orbiting into a corner
          there was simply no way back to the opening frame.

          Two depths on one control: click returns the camera and clears the
          selection; shift-click also clears the filter. The filter is the one
          piece of state a user may have spent a minute building, so it does not
          get thrown away by the same gesture that undoes an accidental drag.
        */}
        <button
          type="button"
          onClick={(e) => onReset(e.shiftKey)}
          title="Back to the opening view and clear the selection. Shift-click also clears the filter."
          style={resetButton}
        >
          reset
        </button>
      </div>

      <label style={{ ...sliderRow, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: '#8fa3c0' }}>Zoom</span>
          <span style={{ fontSize: 11, color: '#5e6f8a' }}>
            {view.zoom < 0.97 ? 'in' : view.zoom > 1.03 ? 'out' : 'fit'}
          </span>
        </div>
        <input
          type="range"
          min={ZOOM_MIN}
          max={ZOOM_MAX}
          step={0.01}
          // Inverted so dragging right zooms in, which is what everyone expects.
          value={ZOOM_MIN + ZOOM_MAX - view.zoom}
          onChange={(e) =>
            set('zoom', ZOOM_MIN + ZOOM_MAX - Number(e.target.value))
          }
          style={slider}
        />
      </label>

      {TOGGLES.map(({ key, label, hint }) => (
        <label key={key} style={row} title={hint}>
          <input
            type="checkbox"
            checked={view[key] as boolean}
            onChange={(e) => set(key, e.target.checked as never)}
            style={checkbox}
          />
          <span style={{ color: view[key] ? '#c2cfe4' : '#5e6f8a' }}>{label}</span>
        </label>
      ))}

      {SLIDERS.map(({ key, label, hint, min, max }) => (
        <label key={key} style={{ ...sliderRow, marginTop: 8 }} title={hint}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: view[key] > 0 ? '#8fa3c0' : '#5e6f8a' }}>
              {label}
            </span>
            <span style={{ fontSize: 11, color: '#5e6f8a' }}>
              {(min ?? 0) === 0 && view[key] <= 0.005
                ? 'off'
                : Math.round(view[key] * 100) + '%'}
            </span>
          </div>
          <input
            type="range"
            min={min ?? 0}
            max={max ?? 1}
            step={0.01}
            value={view[key]}
            onChange={(e) => set(key, Number(e.target.value) as never)}
            style={slider}
          />
        </label>
      ))}

      <div style={{ ...heading, marginTop: 14 }}>Focus</div>
      {FOCUS_TOGGLES.map(({ key, label, hint }) => (
        <label key={key} style={row} title={hint}>
          <input
            type="checkbox"
            checked={view[key] as boolean}
            onChange={(e) => set(key, e.target.checked as never)}
            style={checkbox}
          />
          <span style={{ color: view[key] ? '#c2cfe4' : '#5e6f8a' }}>{label}</span>
        </label>
      ))}
      <div style={note}>
        {hasSelection
          ? 'Esc or click empty space to clear.'
          : 'Click a node to trace its chain.'}
      </div>

      <div style={{ ...heading, marginTop: 14 }}>Evidence</div>
      {EVIDENCE_TOGGLES.map(({ key, label, hint }) => (
        <label key={key} style={row} title={hint}>
          <input
            type="checkbox"
            checked={evidence[key]}
            onChange={() => onEvidenceChange(key)}
            style={checkbox}
          />
          <span style={{ color: evidence[key] ? '#c2cfe4' : '#5e6f8a' }}>
            {label}
            {key === 'showImplied' && (
              <span style={{ color: '#5e6f8a' }}> · {impliedCount}</span>
            )}
          </span>
        </label>
      ))}
      <div style={note}>
        {evidence.showImplied && !evidence.showDocumented
          ? 'The research backlog: believed, unsourced.'
          : evidence.showImplied
            ? 'Dashed edges have no document behind them. No size changes either way.'
            : 'Every edge shown has a source attached.'}
      </div>
    </div>
  )
}

// Positioning moved to PanelShell, which owns the roll-away. Width lives there
// too — the slide distance is computed from it, so two copies of the number is
// two chances for the panel to stop short of the edge.
const panel: React.CSSProperties = {
  padding: '14px 16px',
  background: 'rgba(10, 14, 24, 0.72)',
  border: '1px solid rgba(90, 115, 160, 0.22)',
  borderRadius: 10,
  backdropFilter: 'blur(8px)',
  userSelect: 'none',
}

const heading: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: '#556785',
  marginBottom: 10,
}

const row: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 12,
  lineHeight: 1.9,
  cursor: 'pointer',
}

const sliderRow: React.CSSProperties = {
  display: 'block',
  cursor: 'pointer',
}

const slider: React.CSSProperties = {
  width: '100%',
  marginTop: 4,
  accentColor: '#6ea8ff',
  cursor: 'ew-resize',
}

const note: React.CSSProperties = {
  fontSize: 10.5,
  color: '#4d5c74',
  lineHeight: 1.5,
  marginTop: 6,
}

const checkbox: React.CSSProperties = {
  accentColor: '#6ea8ff',
  cursor: 'pointer',
  margin: 0,
}

const resetButton: React.CSSProperties = {
  marginLeft: 'auto',
  fontFamily: 'inherit',
  fontSize: 9.5,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#5e6f8a',
  background: 'transparent',
  border: '1px solid rgba(90, 115, 160, 0.22)',
  borderRadius: 5,
  padding: '3px 7px',
  cursor: 'pointer',
  lineHeight: 1,
}
