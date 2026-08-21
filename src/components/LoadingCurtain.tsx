import { useEffect, useState } from 'react'

/**
 * The loading curtain.
 *
 * Thomas, 2026-08-20: *"can we have a basic loading screen so the graph has
 * time to settle and come to rest before being visible? I think when we triple
 * the size of this the settling will take even longer as all that math needs
 * ran."*
 *
 * He is describing something real and already measurable. The layout is a
 * force simulation: `runFit` pays a synchronous 400-tick warmup at load, and
 * after that the cloud keeps expanding for seconds — measured at up to an
 * order of magnitude of growth while the camera chases it. What the user sees
 * in that window is a knot flinging itself apart and a camera lurching after
 * it, which reads as the app being broken rather than as physics converging.
 * Tripling the corpus makes the window longer, not shorter.
 *
 * **The curtain is opaque, not translucent.** A translucent one would show the
 * thrashing through it, which is the thing being hidden.
 *
 * **The safety timeout is the important part of this component.** The reveal
 * is driven by a signal from the renderer (`onReady`: engine stopped AND a fit
 * has run). If that signal ever fails to arrive — a layout that never
 * converges, an exception in the frame loop, a `settledOnce` that stays false
 * because `onEngineStop` did not fire — the user is left staring at a curtain
 * forever, with a perfectly good graph behind it. That failure is strictly
 * worse than no loading screen at all, so the timeout lifts it regardless.
 * A curtain that lifts too early is a cosmetic problem; one that never lifts
 * is a broken app.
 *
 * **`error`, added 2026-08-21 (§6 item 4).** Now that the corpus is fetched
 * at startup (`browserCorpus.ts`) instead of bundled in, there is a new way
 * for "nothing ever arrives" to happen: the fetch itself can fail (offline,
 * a bad deploy missing `public/corpus-data.json`, a dev server not yet
 * restarted after this change). That failure must NOT behave like the
 * timeout above — lifting the curtain on a fetch failure would reveal a
 * permanently empty scene with no explanation, which is exactly the
 * "reads as broken" outcome this component exists to prevent. So when
 * `error` is set, the curtain ignores `ready`/the safety timeout entirely
 * and stays up, showing the message instead of the settling copy — the
 * honest state here really is "nothing loaded and nothing will," and saying
 * so beats a blank near-black scene that looks like every other loading
 * frame.
 */

/** Longest the curtain may ever stay up, signal or no signal. */
const SAFETY_MS = 25000
/** Long enough to read as a fade, short enough not to feel like a wait. */
const FADE_MS = 450

export function LoadingCurtain({
  ready,
  reportCount,
  error = null,
}: {
  ready: boolean
  reportCount: number
  error?: string | null
}) {
  const [hiding, setHiding] = useState(false)
  const [gone, setGone] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), SAFETY_MS)
    return () => clearTimeout(t)
  }, [])

  const lift = !error && (ready || timedOut)

  useEffect(() => {
    if (!lift) return
    setHiding(true)
    // Unmounted on a timer rather than on `transitionend`. Under software
    // rendering at full scene load these transitions can wedge at their start
    // value and never fire the event — a known trap in this project, and one
    // that would pin the curtain open-but-visible forever. The timer does not
    // care whether the fade actually ran.
    const t = setTimeout(() => setGone(true), FADE_MS + 250)
    return () => clearTimeout(t)
  }, [lift])

  if (gone) return null

  return (
    <div
      aria-live="polite"
      style={{
        position: 'fixed',
        inset: 0,
        // Matches the scene background exactly, so the reveal is the graph
        // arriving rather than the backdrop changing colour underneath it.
        background: '#010204',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        zIndex: 45,
        opacity: hiding ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: hiding ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          fontSize: 13,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-label)',
          fontWeight: 600,
        }}
      >
        Economic Report Influence Graph
      </div>

      {error ? (
        <div style={{ fontSize: 12, color: 'var(--ink-mute)', textAlign: 'center', lineHeight: 1.6, maxWidth: 360, padding: '0 24px' }}>
          Couldn't load the report corpus.
          <br />
          <span style={{ color: 'var(--ink-dim)' }}>{error}</span>
          <br />
          <span style={{ color: 'var(--ink-dim)' }}>Reload the page to try again.</span>
        </div>
      ) : (
        <div style={{ fontSize: 12, color: 'var(--ink-mute)', textAlign: 'center', lineHeight: 1.6 }}>
          Settling {reportCount.toLocaleString()} reports into place.
          <br />
          <span style={{ color: 'var(--ink-dim)' }}>
            Every position is decided by the edges, so this takes a moment.
          </span>
        </div>
      )}

      {/*
        Indeterminate rather than a percentage. A force simulation has no
        meaningful completion fraction — it converges when it converges — and a
        fake bar that sits at 90% is a worse lie than an honest sweep. Hidden
        on the error path — nothing is in progress, so a sweeping bar would
        be a second lie stacked on top of the first.
      */}
      {!error && (
        <div
          style={{
            width: 220,
            height: 2,
            background: 'var(--line-faint)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '38%',
              height: '100%',
              background: 'var(--line-strong)',
              borderRadius: 2,
              animation: 'rig-curtain-sweep 1.25s ease-in-out infinite',
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes rig-curtain-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(363%); }
        }
      `}</style>
    </div>
  )
}
