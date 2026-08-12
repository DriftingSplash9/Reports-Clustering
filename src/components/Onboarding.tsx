import { useEffect, useState, type ReactNode } from 'react'
import { TIER_DESCRIPTION, TIER_LABEL } from '../lib/hierarchy'

/**
 * The opening card.
 *
 * Thomas, 2026-08-12: *"I want a popup if you can. one that pops up on load to
 * explain the double clicking. It should be elegant and spacey."*
 *
 * It now explains the **tier buttons** rather than the double-click, because
 * the buttons replaced the gesture as the way you move between levels later the
 * same day. The card survived that change rather than being deleted with the
 * gesture, and it is worth saying why: the buttons are discoverable in a way
 * the double-click never was, but they still do not explain *themselves*.
 * Nothing about a row reading "Global / Nations / States / Everything" tells
 * you that the graph opens showing only the first of them, that the orbs are
 * where the rest went, or that the levels are cumulative.
 *
 * It also carries the *shape* legend, which has no other home. The tier ladder
 * and the shape ladder are the same ladder, so the glyph row is simultaneously
 * "here is what you are about to walk down" and "here is what each rung looks
 * like once you get there". Split across two surfaces, one of them would go
 * unread.
 *
 * The glyphs are hand-drawn SVG silhouettes of the actual 3D geometry in
 * `TIER_GEOMETRY`, not screenshots or icons — a circle for the sphere, a
 * heptagon for the icosahedron, a square for the cube, and so on. They have to
 * be kept in step with that table by hand. That is a real maintenance cost and
 * it is accepted: the alternative is rendering six WebGL contexts inside a
 * modal to draw six shapes that are, at this size, six flat outlines anyway.
 */

const STORAGE_KEY = 'rig.onboarding.dismissed.v2'

/**
 * Silhouettes matching `TIER_GEOMETRY`, one per jurisdiction level.
 *
 * Labelled by *level*, not by tier, and deliberately not driven off
 * `TIER_LABEL`: there are six shapes and only four tiers, because tier 1 alone
 * contains three levels (international, supranational and commercial). Wiring
 * these captions to the tier names would mislabel half the row.
 */
const GLYPHS: { label: string; hint: string; draw: ReactNode }[] = [
  { label: 'International', hint: 'IMF, UN, WTO', draw: <circle cx="16" cy="16" r="10" /> },
  {
    label: 'Supranational',
    hint: 'EU, blocs',
    draw: <polygon points="16,6 24,10 26,19 20,26 12,26 6,19 8,10" />,
  },
  { label: 'National', hint: 'countries', draw: <rect x="7" y="7" width="18" height="18" rx="1.5" /> },
  { label: 'State', hint: 'and provinces', draw: <polygon points="16,4 27,16 16,28 5,16" /> },
  { label: 'Municipal', hint: 'cities, counties', draw: <polygon points="16,5 28,26 4,26" /> },
  { label: 'Commercial', hint: 'and other', draw: <rect x="10" y="5" width="12" height="22" rx="6" /> },
]

function Glyph({ label, hint, draw }: { label: string; hint: string; draw: ReactNode }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 0 }}>
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden>
        <g fill="rgba(120, 165, 235, 0.16)" stroke="#7fa6dd" strokeWidth="1.4">
          {draw}
        </g>
      </svg>
      <div
        style={{
          // Uppercase + letter-spacing at 9.5px made "INTERNATIONAL" and
          // "SUPRANATIONAL" wider than their share of the row, and because each
          // is a single unbreakable word it did not wrap — it spilled sideways
          // and collided with its neighbours. Thomas: "the lettering is
          // overlapping." Sentence case drops the tracking and roughly a fifth
          // of the width, and `overflowWrap` guarantees the labels break rather
          // than overlap whatever the card ends up being sized to.
          fontSize: 9.5,
          letterSpacing: '0.01em',
          color: '#8fa4c4',
          marginTop: 4,
          lineHeight: 1.25,
          overflowWrap: 'anywhere',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 8.5,
          color: '#54637d',
          lineHeight: 1.3,
          marginTop: 1,
          overflowWrap: 'anywhere',
        }}
      >
        {hint}
      </div>
    </div>
  )
}

export default function Onboarding() {
  // Read once, lazily, rather than in an effect: an effect would paint the card
  // for one frame before hiding it again, which is a flash on every load for
  // exactly the people who already said they did not want to see it.
  const [open, setOpen] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) !== '1'
    } catch {
      // Private-browsing / disabled storage. Showing the card is the safe
      // failure — it is dismissible, and the alternative is a graph nobody can
      // work out how to open.
      return true
    }
  })
  const [remember, setRemember] = useState(false)

  const close = () => {
    if (remember) {
      try {
        window.localStorage.setItem(STORAGE_KEY, '1')
      } catch {
        // Nothing to do; the card simply returns next load.
      }
    }
    setOpen(false)
  }

  // Escape closes it, because a modal over a 3D scene that traps you is worse
  // than no modal. Bound on window rather than the card so it works before the
  // card has taken focus.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="How to explore the graph"
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        display: 'grid',
        placeItems: 'center',
        // Dark rather than blurred. A backdrop blur over a WebGL canvas forces
        // the compositor to read back the drawing buffer every frame, which on
        // the 728-node scene is a measurable cost paid for the entire time the
        // card is open — and the card is opaque enough that nothing behind it
        // needed softening anyway.
        background: 'radial-gradient(circle at 50% 45%, rgba(9,13,22,0.72), rgba(4,6,12,0.93))',
        animation: 'rigFade 420ms ease-out',
      }}
    >
      <style>{`
        @keyframes rigFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes rigRise {
          from { opacity: 0; transform: translateY(14px) scale(0.985) }
          to   { opacity: 1; transform: none }
        }
        @keyframes rigBreathe { 0%,100% { opacity: 0.35 } 50% { opacity: 0.9 } }
      `}</style>

      <div
        // Stop the veil's dismiss-on-click from firing for clicks on the card.
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(620px, calc(100vw - 48px))',
          padding: '30px 34px 24px',
          background: 'rgba(10, 14, 24, 0.92)',
          border: '1px solid rgba(90, 115, 160, 0.26)',
          borderRadius: 12,
          boxShadow: '0 24px 70px rgba(0,0,0,0.6), 0 0 70px rgba(60,110,190,0.10) inset',
          color: '#c6d4e8',
          fontSize: 13,
          lineHeight: 1.62,
          animation: 'rigRise 520ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#5e6f8a',
            marginBottom: 10,
          }}
        >
          Economic Report Influence Graph
        </div>

        <h2
          style={{
            margin: '0 0 14px',
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: '0.01em',
            color: '#e6eefc',
          }}
        >
          The graph opens folded.
        </h2>

        <p style={{ margin: '0 0 18px', color: '#9fb2ce' }}>
          You are looking at tier 1 — the international, supranational and commercial reports.
          Everything below them is packed into the glowing orbs, one per region.
        </p>

        <div
          style={{
            padding: '14px 16px',
            marginBottom: 18,
            background: 'rgba(60, 110, 190, 0.07)',
            border: '1px solid rgba(90, 130, 190, 0.18)',
            borderRadius: 8,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <strong style={{ color: '#e6eefc', fontWeight: 500 }}>
              Use the four tier buttons along the bottom.
            </strong>{' '}
            Each one adds a level of government to the whole world at once.
          </div>
          <ol
            style={{
              margin: 0,
              paddingLeft: 20,
              color: '#9fb2ce',
              fontSize: 12,
              lineHeight: 1.75,
            }}
          >
            {TIER_DESCRIPTION.map((d, i) => (
              <li key={d}>
                <span style={{ color: '#c6d4e8' }}>{TIER_LABEL[i]}</span> — {d}
              </li>
            ))}
          </ol>
          <div style={{ marginTop: 10, fontSize: 12, color: '#7c8ca7' }}>
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: 9,
                height: 9,
                marginRight: 7,
                borderRadius: '50%',
                background: '#7fa6dd',
                boxShadow: '0 0 12px 3px rgba(127,166,221,0.5)',
                animation: 'rigBreathe 2.6s ease-in-out infinite',
              }}
            />
            Double-clicking a pulsing orb does the same as pressing the next button up.
          </div>
        </div>

        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#5e6f8a',
            marginBottom: 10,
          }}
        >
          Shape tells you the level · colour tells you the region
        </div>

        {/*
          A six-column grid, not a flex row. `flex: 1 1 0` sizes each column
          from its *content*, so the two long labels claimed more than a sixth
          each and pushed the rest into overlapping. Equal fixed fractions give
          every glyph exactly the same width no matter how long its caption is.
        */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
            gap: 8,
            marginBottom: 22,
          }}
        >
          {GLYPHS.map((g) => (
            <Glyph key={g.label} {...g} />
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            paddingTop: 16,
            borderTop: '1px solid rgba(90, 115, 160, 0.16)',
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 11,
              color: '#7c8ca7',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{ accentColor: '#5b86c9', cursor: 'pointer' }}
            />
            Don&rsquo;t show this again
          </label>

          <button
            type="button"
            onClick={close}
            autoFocus
            style={{
              padding: '8px 22px',
              fontFamily: 'inherit',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#dce7f8',
              background: 'rgba(70, 115, 190, 0.22)',
              border: '1px solid rgba(120, 160, 220, 0.4)',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  )
}
