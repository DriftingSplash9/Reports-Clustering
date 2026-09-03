import { NEIGHBOURHOOD_HOPS_MAX, ZOOM_MAX, ZOOM_MIN, type ViewSettings } from '../lib/view'
import type { LensMode } from '../lib/modes'
import { HUD_TOP } from '../lib/uiTheme'

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
  {
    key: 'rankByLegalBasis',
    label: 'Rank by legal basis',
    hint: 'On (default): a statute cited as the legal basis of a country\'s statistics counts toward its size and ranking, same weight as a methodology dependency. Off: see the data-only ranking, legal_basis edges excluded — Midvamp round 2, Q4',
  },
]

const SLIDERS: {
  key: 'spread' | 'geoAffinity' | 'galaxy' | 'clusterRepulsion' | 'pulseRate'
  label: string
  hint: string
  /** Slider range; 0–1 when absent. Spread is a multiplier, so it runs 50%–1200%. */
  min?: number
  max?: number
}[] = [
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
    //
    // **Range re-cut 100 (10000%) -> 12 (1200%), floor 2 (200%) -> 0.5 (50%),
    // 2026-09-03, round 0 (Q13).** `clusterRepulsion` (2026-08-27) now does
    // real cluster-vs-cluster separation on its own, so spread no longer has
    // to carry that job alone at the low end, and the old ceiling was buying
    // almost nothing (see the "ten times the spread buys a quarter more air"
    // measurement above) — nobody was running it that far out in practice.
    // `nodeScaleFor`'s cap re-derived for the new ceiling in
    // `InfluenceGraph.tsx` per the same rule.
    min: 0.5,
    max: 12,
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
  {
    key: 'clusterRepulsion',
    label: 'Cluster repulsion',
    hint: 'Pushes DIFFERENT clusters’ centres apart from each other — the mirror of Galaxy pull above, which only ever pulls a report toward its own cluster. Starts at 100%; drag to 0 to ablate it entirely — see lib/clusterRepulsion.ts for the model',
    // First pass, 2026-08-27, shipped at max 3 — Thomas's call to try
    // "option (c)" from the 2026-08-26 layout design discussion. Seen live
    // 2026-08-28: "weak and ineffective" even at the ceiling. The force
    // itself wasn't the problem — a full-system re-measurement (real charge
    // + link forces this time, not the isolated galaxy/geo/cluster-only
    // rig the first pass used) found the old 0-3 range was simply too
    // narrow to reach a felt effect: inter-country separation ratio
    // 4.29 (off) -> 7.04 (1) -> 8.62 (3) -> 11.44 (6) -> 15.08 (10),
    // own-cluster cohesion essentially flat throughout (intraSpread
    // 340-395 across the whole sweep) — no NaN, no runaway, confirmed
    // stable to 30. Raised the ceiling to 10 on 2026-08-28; default left
    // at 1 so nothing changes until the slider is touched. Drag well past
    // the old max-3 mark this time. `scripts/_tmp-cluster-repulsion-*`
    // sweep scripts, throwaway, run in a cloud sandbox (device_bash can't
    // run this repo's node_modules — win32 esbuild binary vs the bridge's
    // Linux VM, same class of issue as `npm run validate`).
    //
    // Raised again 10 -> 15 on 2026-08-29 (Thomas: "it is better, can it go
    // up to 15?" after trying the 0-10 range live).
    //
    // **The 2026-08-28 sweep figures above do not reproduce** — see the
    // header of `scripts/measure-forces.ts` (committed 2026-08-31): its
    // baseline of 4.29 came from state leaking between sweep steps, and a
    // fresh-simulation, two-seed run puts the off-baseline at 13.5–15.2, not
    // 4.29. What the 2026-08-31 re-measurement does support: the force is
    // real in world units (inter/intra 13.5–15.2 at 0 → 23.0–25.1 at 15) and
    // stable at the ceiling (no NaN); but after the camera's p95 refit the
    // whole 0→15 range moves on-screen separation by only +2% to +15%
    // depending on seed — seed variance is the same size as the slider's
    // whole range. The ceiling is kept at 15 because it is harmless, not
    // because the old numbers justified it; the lever that actually opened
    // the clusters was `INT_LINK_STIFFNESS = 0` (HANDOFF, 2026-08-31).
    max: 15,
  },
  {
    key: 'pulseRate',
    label: 'Pulse rate',
    hint: 'How fast everything that pulses moves — the orb breath, the cross-border blink, the beam flow, the travelling teardrops — all together. Starts at 100% (the rate everything was tuned at); drag to 0 to freeze them in place without hiding them (see the Pulses toggle above for that)',
    // No layout consequence at all — unlike spread/geoAffinity/galaxy this
    // is pure playback speed, read live off a ref, same as geoAffinity/galaxy
    // are for their forces. 4x tops out well past where the motion stops
    // reading as individual pulses and starts reading as a blur.
    max: 4,
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

const GRADES: { key: ViewSettings['minGrade']; label: string; hint: string }[] = [
  {
    key: 'A',
    label: 'A only',
    hint: 'Show and rank only raw-fetched, verified edges. Every edge is C until round 3\'s grader runs, so this hides everything today',
  },
  {
    key: 'B',
    label: 'A + B',
    hint: 'Widen to loosely-supported edges too (drawn brighter, as a flag to review) — still hides ungraded C leads',
  },
  {
    key: 'C',
    label: 'Everything',
    hint: 'Show every edge, including ungraded leads and confirmed-weak (C) ones, drawn faint — the default until grading exists',
  },
]

// The Focus section (Built from / Feeds into / Isolate checkboxes) lived
// here until round 0, 2026-09-03 (Q15/HANDOFF "Focus panel removed").
// Click-to-trace now always traces both directions and always dims rather
// than hides — see `TRACE_BOTH_DIRECTIONS` in `App.tsx`. The Groups panel's
// own isolate (continent/bloc/publisher/country) is unrelated and unaffected.
// The Neighbourhood slider just below is a separate feature and stays.

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
  tier,
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
  /**
   * The current global tier (`drilldown`), 2026-08-21 (review §1, §6 item 6).
   * A lens is a pure recolour pass over the REAL nodes on screen, and at
   * tier 1 (Global) the real nodes are mostly INT — white in every lens — so
   * GROUP_COMPARISON/WORLD_OVERVIEW visibly do almost nothing there (the
   * review's own A/B screenshots at tier 1 were "near-identical"). Orbs stay
   * out of lens recolour by design (`lib/modes.ts`'s file comment), so
   * recolouring orbs too was the other option the review offered; greying
   * the buttons out was picked as the cheaper fix for this pass — it costs
   * one prop and a title, not a new orb-recolour code path.
   */
  tier: number
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
        {LENSES.map(({ key, label, hint }) => {
          // A lens with nothing to recolour at this tier — see the `tier`
          // prop's doc comment. STANDARD is never disabled: it is the
          // always-correct baseline, tier notwithstanding.
          const inert = tier === 1 && key !== 'STANDARD'
          return (
            <button
              key={key}
              type="button"
              disabled={inert}
              title={
                inert
                  ? `${hint} — mostly a no-op at the Global tier: the real nodes shown here are mostly international (white in every lens). Open a tier to see this lens do something`
                  : hint
              }
              onClick={() => set('lens', key)}
              style={{
                ...lensButton,
                ...(view.lens === key ? lensButtonActive : null),
                ...(inert ? lensButtonInert : null),
              }}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div style={{ ...heading, marginTop: 14 }}>Evidence</div>
      {/*
        Midvamp round 2 (2026-09-03) — the floor of evidence quality a line
        draws under, see `minGrade` in lib/view.ts for the full model.
        Same button-row shape as Lens above, three states rather than a
        checkbox because "how permissive" is the actual question, the same
        reasoning the Neighbourhood-hops slider below uses for why it isn't
        a toggle either.
      */}
      <div style={lensRow}>
        {GRADES.map(({ key, label, hint }) => (
          <button
            key={key}
            type="button"
            title={hint}
            onClick={() => set('minGrade', key)}
            style={{
              ...lensButton,
              ...(view.minGrade === key ? lensButtonActive : null),
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ ...heading, marginTop: 14 }}>Focus</div>
      {/*
        Item 8, 2026-08-20 — "show this node and everything within N hops."
        A slider rather than a checkbox, like `spread`/`geoAffinity`/`galaxy`
        above, because "how many hops" is the actual question, not "on or
        off" — 0 IS off (the field's own contract, see `lib/view.ts`), so no
        separate toggle is needed. This was one of three controls under the
        "Focus" heading; the other two (Built from / Feeds into) and the
        checkbox-based Isolate went with the rest of the Focus panel in
        round 0, 2026-09-03 (Q15) — this one stays, a HANDOFF-named
        exception, because it answers a different question ("how far", not
        "hide or dim") that the panel removal didn't touch.
      */}
      <label style={{ ...sliderRow, marginTop: 8 }} title="Hide everything more than N hops from the selection — attacks a dense neighbourhood directly, without turning off the ordinary click-to-trace dim">
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
// How far above the viewport's bottom edge this panel's content must stop.
// Nothing else lives under the View column (the Unlinked shelf's right edge
// stays 214px in from the viewport edge — `bottomDockRight` in App.tsx), so
// this only needs the panel's own 20px bottom margin plus a real gap.
const VIEW_PANEL_BOTTOM_CLEARANCE = 28

const panel: React.CSSProperties = {
  padding: '14px 16px',
  background: 'var(--panel-bg)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
  userSelect: 'none',
  // 2026-08-21, full-review item 2 (same bug class as 5i's Reports-panel
  // fix, which was never applied to this sibling): the content here
  // measures ~697px tall, and `PanelShell` starts it at `HUD_TOP` (44px) —
  // at a 720-tall window the bottom ~21px (the Neighbourhood slider's tail
  // and notes) sat off-viewport with NO scrollbar, unreachable. Anchor the
  // height to where the panel actually starts and let the panel's own
  // scrollbar be the thing that stops the content, same as the Reports
  // panel. A content `maxHeight` is a coordinate too — §7's trap bullet.
  maxHeight: `calc(100vh - ${HUD_TOP}px - ${VIEW_PANEL_BOTTOM_CLEARANCE}px)`,
  overflowY: 'auto',
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

const lensButtonInert: React.CSSProperties = {
  color: 'var(--ink-faint)',
  borderColor: 'var(--line)',
  opacity: 0.5,
  cursor: 'not-allowed',
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
