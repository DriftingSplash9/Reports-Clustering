import { useEffect, type ReactNode } from 'react'
import startHereSource from '../../START-HERE.md?raw'

/**
 * Help — Phase 4 §6.
 *
 * **The text is `START-HERE.md`, imported raw at build time, not retyped.**
 * That file is deliberately the plain-language, jargon-free description Thomas
 * sends to other people, so it is already the right register for a Help
 * window; and importing it means the two can never disagree. Editing the
 * markdown edits this card. There is no second copy to keep in step — the same
 * rule the How-to menu follows by re-opening the onboarding card instead of
 * restating it.
 *
 * **What is cut, and why "nearly verbatim".** Everything from `## Running it`
 * onward is about the repository — how to start a dev server, what `HANDOFF.md`
 * is for, where the archive lives. Someone reading Help inside the running app
 * has already run it and is not looking at the file tree. The cut is made by
 * heading name at render time rather than by copying the first two thirds into
 * a string, so a renamed heading degrades to "shows slightly too much" instead
 * of to a stale duplicate.
 */
const CUT_AT = '## Running it'

/**
 * A deliberately small markdown subset: headings, paragraphs, bullets, rules,
 * and inline bold / code / links / italics.
 *
 * Not a markdown library, because the input is one known file in one known
 * dialect and a dependency would be several hundred kilobytes to render a page
 * that has no tables, no images, no footnotes and no HTML in it. The census
 * that justified this: 17 bold spans, 26 code spans, 1 link, 1 italic line,
 * and — in the part that is cut — one table. If a future edit to START-HERE.md
 * adds a construct this does not know, it renders as its own literal text
 * rather than disappearing, which is the failure mode to prefer.
 */
function renderInline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = []
  // One pass, one regex, alternation ordered so `**` is tried before `*`.
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const tok = m[0]
    const key = `${keyBase}-${i++}`
    if (tok.startsWith('**')) {
      out.push(
        <strong key={key} style={{ color: 'var(--ink-strong)', fontWeight: 600 }}>
          {tok.slice(2, -2)}
        </strong>,
      )
    } else if (tok.startsWith('`')) {
      out.push(
        <code
          key={key}
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '0.92em',
            color: 'var(--ink-gold)',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 3,
            padding: '0 3px',
          }}
        >
          {tok.slice(1, -1)}
        </code>,
      )
    } else if (tok.startsWith('[')) {
      const split = tok.indexOf('](')
      out.push(
        <a
          key={key}
          href={tok.slice(split + 2, -1)}
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--ink-gold)' }}
        >
          {tok.slice(1, split)}
        </a>,
      )
    } else {
      out.push(
        <em key={key} style={{ color: 'var(--ink-mute)' }}>
          {tok.slice(1, -1)}
        </em>,
      )
    }
    last = m.index + tok.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function renderMarkdown(src: string): ReactNode[] {
  const cut = src.indexOf(CUT_AT)
  const body = cut === -1 ? src : src.slice(0, cut)
  const lines = body.split(/\r?\n/)
  const out: ReactNode[] = []
  let para: string[] = []
  let bullets: string[] = []
  let k = 0

  const flushPara = () => {
    if (!para.length) return
    out.push(
      <p key={`p${k++}`} style={{ margin: '0 0 11px', lineHeight: 1.62, color: 'var(--ink-label)' }}>
        {renderInline(para.join(' '), `p${k}`)}
      </p>,
    )
    para = []
  }
  const flushBullets = () => {
    if (!bullets.length) return
    out.push(
      <ul key={`u${k++}`} style={{ margin: '0 0 12px', paddingLeft: 18, lineHeight: 1.6 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: 5, color: 'var(--ink-label)' }}>
            {renderInline(b, `u${k}-${i}`)}
          </li>
        ))}
      </ul>,
    )
    bullets = []
  }
  const flush = () => {
    flushPara()
    flushBullets()
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      flush()
      continue
    }
    if (line.startsWith('#')) {
      flush()
      const level = line.match(/^#+/)![0].length
      const text = line.replace(/^#+\s*/, '')
      out.push(
        <div
          key={`h${k++}`}
          style={{
            fontSize: level === 1 ? 17 : 12.5,
            fontWeight: 600,
            letterSpacing: level === 1 ? '0.01em' : '0.06em',
            textTransform: level === 1 ? 'none' : 'uppercase',
            color: level === 1 ? 'var(--ink-strong)' : 'var(--ink-label)',
            margin: level === 1 ? '0 0 10px' : '20px 0 9px',
          }}
        >
          {text}
        </div>,
      )
      continue
    }
    if (line.trim() === '---') {
      flush()
      out.push(
        <div key={`r${k++}`} style={{ height: 1, background: 'var(--line-faint)', margin: '16px 0' }} />,
      )
      continue
    }
    if (/^\s*[-*]\s+/.test(line)) {
      flushPara()
      bullets.push(line.replace(/^\s*[-*]\s+/, ''))
      continue
    }
    flushBullets()
    para.push(line.trim())
  }
  flush()
  return out
}

/** Parsed once at module load — the source is a build-time constant. */
const HELP_BODY = renderMarkdown(startHereSource)

export function HelpCard({ onClose }: { onClose: () => void }) {
  // Escape closes, matching the onboarding card. A modal over a 3D scene that
  // traps you is worse than no modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(2, 4, 9, 0.72)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 40,
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(760px, 100%)',
          maxHeight: '86vh',
          overflowY: 'auto',
          padding: '26px 30px 22px',
          background: 'var(--panel-bg-solid)',
          border: '1px solid var(--line)',
          borderRadius: 10,
          boxShadow: 'var(--panel-shadow)',
          fontSize: 12.5,
        }}
      >
        {HELP_BODY}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 18,
            paddingTop: 14,
            borderTop: '1px solid var(--line-faint)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '7px 18px',
              fontFamily: 'inherit',
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-strong)',
              background: 'var(--accent-active)',
              border: '1px solid var(--line)',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
