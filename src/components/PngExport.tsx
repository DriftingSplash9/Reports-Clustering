import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector2 } from 'three'
import type { EffectComposer as EffectComposerImpl } from 'postprocessing'

/**
 * Item 12 of the 2026-08-20 todo list — "export a PNG at 2× without the
 * HUD." Thomas's own framing for why it earns its place: "Thomas has been
 * screenshotting with the Windows tool all session; a visualisation you
 * cannot share is doing half its job."
 *
 * "Without the HUD" turns out to need no work at all: the HUD (every panel,
 * the menu bar, the cards) is ordinary DOM, painted on top of the canvas by
 * the browser's own compositor — it was never IN the canvas's pixels to
 * begin with. Reading `gl.domElement` — the WebGL canvas react-three-fiber
 * owns — already excludes it. The only real work is the "2×."
 *
 * **Why this is its own no-render component sitting inside `<Canvas>`,
 * rather than a function App.tsx calls directly**: raising resolution here
 * means raising `gl`'s pixel ratio AND the `EffectComposer`'s buffers to
 * match — bloom's own render targets are sized from the CSS viewport size
 * once, in a `useEffect` inside `@react-three/postprocessing` itself, and do
 * NOT react to a pixel-ratio-only change (their dependency array is `[size]`,
 * the CSS dimensions, not the ratio) — so a naive "just call
 * `gl.setPixelRatio(x2)`" would render the base scene at the new resolution
 * into a bloom pass still sized for the old one, and the composite would be
 * wrong. The fix is one manual call to `composer.setSize(width, height)`
 * AFTER bumping the ratio: unchanged CSS width/height means it skips calling
 * `renderer.setSize` again, but the `postprocessing` library's own
 * `EffectComposer.setSize` always re-reads `renderer.getDrawingBufferSize()`
 * (verified straight from `node_modules/postprocessing/build/postprocessing.js`,
 * not assumed) and resizes every buffer and pass to whatever that now is —
 * exactly the "resize the composer to match the new pixel ratio" call this
 * needs, with no dedicated API for it. That is also why this needs the
 * composer INSTANCE (via `EffectComposer`'s own forwarded ref, wired up in
 * `App.tsx`) rather than just `useThree()`'s `gl`/`scene`/`camera` — those
 * alone are not enough to keep bloom in sync.
 *
 * **Why the capture waits for a `useFrame` at priority 2, not the next tick
 * or a `requestAnimationFrame`**: `@react-three/postprocessing`'s
 * `EffectComposer` renders the actual frame — including bloom — from ITS
 * OWN `useFrame` at priority 1 (also read from the same source file), which
 * is also why r3f stops auto-rendering the scene once EffectComposer mounts
 * (any `useFrame` with priority > 0 takes over rendering). A priority-2
 * subscriber is therefore guaranteed to run immediately after that frame's
 * composited render, on the very next animation frame after the resize
 * effect commits — reading `gl.domElement` at that exact moment reliably
 * gets the freshly drawn, bloom-included, 2×-resolution pixels, with no race
 * against a rAF registered from outside the render loop.
 */
/**
 * A GPU's drawing-buffer dimension limit — 8192px is the practical floor
 * across desktop and mobile WebGL implementations (some go higher; none
 * reliably go lower). Doubling DPR on a large, high-density monitor can cross
 * it, and the capture silently comes back black rather than erroring — see
 * the file-level comment on the re-entry guard below for the sibling bug this
 * was found alongside.
 */
const MAX_CAPTURE_DIMENSION = 8192

export function PngExport({
  request,
  composerRef,
}: {
  /** Bumped by the export button. Zero is the mount value, not a request. */
  request: number
  composerRef: React.RefObject<EffectComposerImpl | null>
}) {
  const { gl } = useThree()
  const pending = useRef(false)
  const restore = useRef<{ ratio: number; width: number; height: number } | null>(null)

  useEffect(() => {
    if (!request) return
    // **Re-entry guard, 2026-08-21 (review §2, "two rapid clicks permanently
    // double the render resolution").** This effect used to snapshot
    // `restore.current` from `gl.getPixelRatio()` unconditionally on every
    // `request` bump. `toBlob` below is async, so a second click before the
    // first export's callback landed would snapshot the ratio the FIRST
    // click had already doubled, then double it again — and when both
    // callbacks eventually ran, `finish()` would restore to that already-
    // doubled snapshot instead of the true original, leaving the on-screen
    // renderer permanently at 2x DPR (half the framerate, silently). A
    // non-null `restore.current` means an export is already in flight, so a
    // second request while one is pending is simply ignored — one export
    // still happens (whichever click's `useFrame` fires next), it just
    // cannot corrupt the ratio it will restore to.
    if (restore.current) return
    const composer = composerRef.current
    if (!composer) return
    const size = gl.getSize(new Vector2())
    const currentRatio = gl.getPixelRatio()
    // Doubling the CURRENT ratio, not setting a flat 2 — a viewer already on
    // a 2x-DPR display gets a 4x-device-pixel export, which is what "2x"
    // should mean: twice as sharp as what they are actually looking at, not
    // twice a number that may already be below their screen's own density.
    //
    // **Clamped to `MAX_CAPTURE_DIMENSION`, 2026-08-21 (review §2).** A large
    // window on a high-DPR display doubled again can ask the GPU for a
    // drawing buffer past its own limit — the review's own example, 2x DPR
    // on a large window, can exceed 8192px — and when that happens the
    // capture comes back black with no error, which reads as "the feature is
    // broken" rather than "the resolution was too high to ask for". Clamping
    // the ratio (not just the request) keeps the composite in sync with
    // whatever ratio the renderer actually ends up at.
    const longestSide = Math.max(size.width, size.height)
    const maxRatio = longestSide > 0 ? MAX_CAPTURE_DIMENSION / longestSide : currentRatio * 2
    const targetRatio = Math.min(currentRatio * 2, maxRatio)
    restore.current = { ratio: currentRatio, width: size.width, height: size.height }
    gl.setPixelRatio(targetRatio)
    // CSS size unchanged on purpose — the on-screen canvas must not visibly
    // resize or flash. See the file-level comment for why this call is still
    // required even though the width/height it's passed haven't changed.
    composer.setSize(size.width, size.height)
    pending.current = true
  }, [request, gl, composerRef])

  useFrame(() => {
    if (!pending.current) return
    pending.current = false
    const canvas = gl.domElement
    const finish = () => {
      const r = restore.current
      if (r) {
        gl.setPixelRatio(r.ratio)
        composerRef.current?.setSize(r.width, r.height)
        restore.current = null
      }
    }
    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob)
        finish()
      }, 'image/png')
    } else {
      // toBlob is missing only in environments with no real canvas backing
      // (never a real browser) — toDataURL is the documented fallback.
      downloadDataUrl(canvas.toDataURL('image/png'))
      finish()
    }
    // Priority 2: after the composer's own priority-1 render this same
    // frame. See the file-level comment for why this specific number.
  }, 2)

  return null
}

function downloadBlob(blob: Blob) {
  const url = URL.createObjectURL(blob)
  triggerDownload(url)
  // The object URL only needs to outlive the synchronous click; a short
  // delay rather than an immediate revoke avoids a Safari race where the
  // download can start after the URL is already gone.
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

function downloadDataUrl(dataUrl: string) {
  triggerDownload(dataUrl)
}

function triggerDownload(href: string) {
  const a = document.createElement('a')
  a.href = href
  a.download = `report-influence-graph-${stamp()}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/** `YYYYMMDD-HHmmss`, local time — sortable and readable in a downloads folder. */
function stamp(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-` +
    `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  )
}
