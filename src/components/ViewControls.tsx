import { NEIGHBOURHOOD_HOPS_MAX, ZOOM_MAX, ZOOM_MIN, type ViewSettings } from '../lib/view'
import type { LensMode } from '../lib/modes'

/**
 * View controls. Deliberately plain — this is instrumentation, not chrome, and
 * it should never draw attention away from the graph.
 */

// Blueprint (the paper theme) led this list from 2026-08-12 until Thomas
// deleted the mode outright on 2026-08-19 (Phase 4 item 1).
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
  key: 'fog' | 'glow' | 'spread' | 'geoAffinity' | 'galaxy'
  label: string
  hint: string
  /** Slider range; 0–1 when absent. Spread is a multiplier, so it runs 200%–1000%. */
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
    // Rebased 2026-08-19 (Thomas: "far too dense at 100%... best to start at
    // the current 200%. It should be from there as a minimum up to a 1000x
    // max"). Was 0.25–3.75, itself a 50%-widening of the original 0.5–2.5 on
    // 2026-08-12. The floor deliberately sits ABOVE the old default of 1 —
    // the dense end is the complaint, so the slider no longer offers it. See
    // `spread` in lib/view.ts for why that is a judgement about this corpus
    // size rather than about the layout.
    //
    // **Ceiling 10 → 100 on 2026-08-20 (Thomas: "I almost wonder if we could
    // go to 10000x instead of 1000x").** Granted, but measure before
    // believing it does what it looks like it does: rendered at both ends,
    // the core radius goes 6,429 → 17,217 (2.7×, not 10×) and the median
    // nearest-neighbour gap — as a fraction of the two nodes' drawn radii —
    // goes 0.84 → 1.05. **Ten times the spread buys about a quarter more
    // air.** Spread saturates, because past a point the layout is held apart
    // by the collision radius (fixed world units, deliberately) rather than
    // by link rest length, and only this second term scales.
    //
    // Raising this REQUIRED raising `nodeScaleFor`'s cap in step — see the
    // long note there. Cold-starting at 10000% asks for a node scale of 922;
    // the cap was 200 and would have reproduced the "nodes and edges are
    // nearly invisible" bug reported that morning. **Never move this ceiling
    // without re-deriving that cap.**
    min: 2,
    max: 100,
  },
  {
    key: 'geoAffinity',
    label: 'Geo-affinity',
    hint: 'Pulls a country toward the ones it shares a trade/political bloc with, and away from the short list it is in an active dispute with. Starts at 150%; drag to 0 to ablate it entirely — see lib/geoAffinity.ts for the model',
    // Ceiling 1.5 → 5 on 2026-08-19 (Thomas: "turn geo affinity up to 500%"),
    // and the default moved 0 → 1.5 in the same pass because he had been
    // running pinned at the old ceiling. Floor stays 0 — "off" — and there is
    // nothing below off. The force was modelled for 0–1; settling at 5 was
    // verified before shipping this range.
    max: 5,
  },
  {
    key: 'galaxy',
    label: 'Galaxy pull',
    hint: 'Pulls every report toward its own family and its own country’s centre — countries cluster inside their family’s region of space, like separate star clusters inside one galaxy. Starts at 100%; drag to 0 to ablate it entirely — see lib/galaxyForce.ts for the model',
    max: 3,
  },
]

/**
 * The lens row. Radio behaviour, not toggles — exactly one lens is ever on,
 * and STANDARD is a lens like the others rather than an absence, so there is
 * always a pressed button telling you which question the colours answer.
 */
const LENSES: { key: LensMode; label: string; hint: string }[] = [
  {
    key: 'STANDARD',
    label: 'Country',
    hint: 'The full palette — every country family its own colour',
  },
  {
    key: 'GROUP_COMPARISON',
    label: 'Groups',
    hint: 'Five inks: US red, BRICS yellow, EU green, international white, everything else grey. Same layout — only the colours change',
  },
  {
    key: 'WORLD_OVERVIEW',
    label: 'World',
    hint: 'Seven continental inks: US, Canada, Europe, Africa, South America, Asia-Pacific, International. The full palette comes back when you filter',
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
  {
    key: 'isolateFocus',
    label: 'Isolate',
    hint: 'HIDE everything outside the traced chain instead of dimming it — select a report or a country, turn this on, and only it plus what actually connects to it stays on screen. Overrides the Countries/Domains filter while it is on',
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
  onExportPng,
}: {
  view: ViewSettings
  onChange: (next: ViewSettings) => void
  /** Only affects how the focus section is captioned. */
  hasSelection: boolean
  /** `clearFilter` is true when the control was shift-clicked. See the button. */
  onReset: (clearFilter: boolean) => void
  /**
   * Item 12, 2026-08-20 — "export a PNG at 2x without the HUD." Fire-and-
   * forget: the actual capture lives in `PngExport.tsx`, mounted inside the
   * Canvas where it has the renderer and the bloom composer. This is just
   * the button.
   */
  onExportPng: () => void
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
        <button
          type="button"
          onClick={onExportPng}
          title="Save a PNG of exactly what the canvas shows, at 2x resolution, with no panels or menu drawn over it"
          style={resetButton}
        >
          png
        </button>
      </div>

      <label style={{ ...sliderRow, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: 'var(--ink-label)' }}>Zoom</span>
          <span style={{ fontSize: 11, color: 'var(--ink-dim)' }}>
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
          <span style={{ color: view[key] ? 'var(--ink-body)' : 'var(--ink-dim)' }}>{label}</span>
        </label>
      ))}

      {SLIDERS.map(({ key, label, hint, min, max }) => (
        <label key={key} style={{ ...sliderRow, marginTop: 8 }} title={hint}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: view[key] > 0 ? 'var(--ink-label)' : 'var(--ink-dim)' }}>
              {label}
            </span>
            <span style={{ fontSize: 11, color: 'var(--ink-dim)' }}>
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

      <div style={{ ...heading, marginTop: 14 }}>Lens</div>
      <div style={lensRow}>
        {LENSES.map(({ key, label, hint }) => (
          <button
            key={key}
            type="button"
            title={hint}
            onClick={() => set('lens', key)}
            style={{
              ...lensButton,
              ...(view.lens === key ? lensButtonActive : null),
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ ...heading, marginTop: 14 }}>Focus</div>
      {FOCUS_TOGGLES.map(({ key, label, hint }) => (
        <label key={key} style={row} title={hint}>
          <input
            type="checkbox"
            checked={view[key] as boolean}
            onChange={(e) => set(key, e.target.checked as never)}
            style={checkbox}
          />
          <span style={{ color: view[key] ? 'var(--ink-body)' : 'var(--ink-dim)' }}>{label}</span>
        </label>
      ))}
      {/*
        Item 8, 2026-08-20 — "show this node and everything within N hops."
        A slider rather than a checkbox, like `spread`/`geoAffinity`/`galaxy`
        above, because "how many hops" is the actual question, not "on or
        off" — 0 IS off (the field's own contract, see `lib/view.ts`), so no
        separate toggle is needed. Kept in the Focus section, not with the
        percentage SLIDERS above, because it shares nothing with them: an
        integer hop count, not a 0–1 strength, and it does nothing without a
        selection either, same as the two checkboxes just above it.
      */}
      <label style={{ ...sliderRow, marginTop: 8 }} title="Hide everything more than N hops from the selection — a bounded version of Isolate that attacks a dense neighbourhood directly">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: view.neighbourhoodHops > 0 ? 'var(--ink-label)' : 'var(--ink-dim)' }}>
            Neighbourhood
          </span>
          <span style={{ fontSize: 11, color: 'var(--ink-dim)' }}>
            {view.neighbourhoodHops === 0
              ? 'off'
              : `${view.neighbourhoodHops} hop${view.neighbourhoodHops === 1 ? '' : 's'}`}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={NEIGHBOURHOOD_HOPS_MAX}
          step={1}
          value={view.neighbourhoodHops}
          onChange={(e) => set('neighbourhoodHops', Number(e.target.value))}
          style={slider}
        />
      </label>

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
  background: 'var(--panel-bg)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
  userSelect: 'none',
}

const heading: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--ink-faint)',
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
  accentColor: 'var(--accent)',
  cursor: 'ew-resize',
}

const note: React.CSSProperties = {
  fontSize: 10.5,
  color: 'var(--ink-faint)',
  lineHeight: 1.5,
  marginTop: 6,
}

const checkbox: React.CSSProperties = {
  accentColor: 'var(--accent)',
  cursor: 'pointer',
  margin: 0,
}

const lensRow: React.CSSProperties = {
  display: 'flex',
  gap: 4,
}

const lensButton: React.CSSProperties = {
  flex: 1,
  fontFamily: 'inherit',
  fontSize: 9.5,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--ink-dim)',
  background: 'transparent',
  border: '1px solid var(--line)',
  borderRadius: 5,
  padding: '4px 0',
  cursor: 'pointer',
  lineHeight: 1,
}

const lensButtonActive: React.CSSProperties = {
  color: 'var(--ink-body)',
  borderColor: 'var(--accent)',
}

const resetButton: React.CSSProperties = {
  marginLeft: 'auto',
  fontFamily: 'inherit',
  fontSize: 9.5,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--ink-dim)',
  background: 'transparent',
  border: '1px solid var(--line)',
  borderRadius: 5,
  padding: '3px 7px',
  cursor: 'pointer',
  lineHeight: 1,
}
