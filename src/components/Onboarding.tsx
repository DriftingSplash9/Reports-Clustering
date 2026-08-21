import { useEffect, useState } from 'react'
import { TIER_DESCRIPTION, TIER_LABEL } from '../lib/hierarchy'

/**
 * The opening card.
 *
 * Thomas, 2026-08-12: *"I want a popup if you can. one that pops up on load to
 * explain the double clicking. It should be elegant and spacey."*
 *
 * It explains the **tier buttons** (which replaced the double-click gesture
 * the same day it was born) and, since round 5, the **family-ink system**:
 * every node is a sphere, the ring and the lines wear the family's ink, and
 * the fill runs dark→light down the government ladder. The shape legend that
 * used to live here went down with the tier shapes — the fresnel rims that
 * carry family identity only ring cleanly on smooth spheres, so the shapes
 * retired and the glyph row retired with them.
 */

const STORAGE_KEY = 'rig.onboarding.dismissed.v3'

export default function Onboarding({ openRequest = 0 }: { openRequest?: number }) {
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

  /**
   * Re-open on request from the Help ▸ How to use menu (Phase 4 §6).
   *
   * A counter rather than a boolean, so asking twice works: with a boolean the
   * caller would have to set it true, wait for this to notice, and set it back
   * to false, and the "set it back" step is the one that gets forgotten — after
   * which the card can never be dismissed. Bumping a number is idempotent from
   * the caller's side and unambiguous from this one.
   *
   * It deliberately does NOT clear the dismissed flag in storage: asking to see
   * the card once is not the same as asking to see it on every load again.
   */
  useEffect(() => {
    if (openRequest > 0) setOpen(true)
  }, [openRequest])

  // Escape closes it, because a modal over a 3D scene that traps you is worse
  // than no modal. Bound on window rather than the card so it works before the
  // card has taken focus.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Closing the card is the press's one action — the flag tells
        // App.tsx's Escape priority stack not to ALSO clear the selection
        // or isolate (2026-08-21, full-review item 3).
        e.preventDefault()
        setOpen(false)
      }
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
          One ink per region · size = how much rests on it
        </div>

        <p style={{ margin: '0 0 22px', color: '#9fb2ce', fontSize: 12, lineHeight: 1.7 }}>
          Every node wears its region&rsquo;s ring — Canada pink, the US red on
          blue, the EU lime, Africa lavender — and the lines between reports are
          drawn in the same inks, so a chain that crosses a border changes
          colour mid-line. Fills run darker at the national level and lighter
          toward the local one. Hover any node for the full story.
        </p>

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
