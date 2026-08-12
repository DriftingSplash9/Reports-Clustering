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
  { key: 'showHorizon', label: 'Horizon', hint: 'Sky gradient meeting the dark' },
  { key: 'autoRotate', label: 'Auto-orbit', hint: 'Slow automatic rotation' },
]

const SLIDERS: {
  key: 'fog' | 'glow' | 'spread' | 'geoAffinity'
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
    // Both extremes widened 50% on 2026-08-12 (Thomas: "you read that
    // correctly. Go to the lower extremes by 50% too") — was 0.5–2.5.
    min: 0.25,
    max: 3.75,
  },
  {
    key: 'geoAffinity',
    label: 'Geo-affinity',
    hint: 'Pulls a country toward the ones it shares a trade/political bloc with, and away from the short list it is in an active dispute with. Off by default — see lib/geoAffinity.ts for the model',
    // Ceiling raised 50% with the spread extremes, same request. Floor is 0 —
    // "off" — and there is nothing below off to halve.
    max: 1.5,
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

// The Evidence section (Documented / Implied toggles) lived here until
// 2026-08-12, when the implied-edge layer was retired (Thomas, round-3 Q12).
// Every edge on screen now carries a document by validator rule, so the
// section had nothing left to switch.

export default function ViewControls({
  view,
  onChange,
  hasSelection,
  onReset,
}: {
  view: ViewSettings
  onChange: (next: ViewSettings) => void
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

      <div style={note}>Every edge shown has a source attached.</div>
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
