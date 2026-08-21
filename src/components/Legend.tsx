import { useEffect, useRef, useState } from 'react'
import { COUNTRY_FAMILY, FAMILY_INK, type ColourFamily } from '../lib/palette'

/**
 * The legend — item 7 of the 2026-08-20 todo list, built same day.
 *
 * Highest-value missing feature "by a distance" per the handoff: six live
 * encodings on screen (colour, fill darkness, hollow-vs-solid, size, line
 * colour, pulse rate) and, until this, the only place any of it was written
 * down was the onboarding card, which most people dismiss once and never see
 * again. This panel is a second, always-reachable copy of the same six facts
 * — not a live-rendered preview of the actual materials (that would mean
 * reaching into `nodeVisuals.ts`/`linkVisuals.ts`'s Three.js material
 * builders from a plain HTML panel, real work with no real benefit here),
 * but plain CSS approximations close enough to recognise against the scene:
 * a coloured dot for a node's fill, a hollow ring for a one-off instrument, a
 * small/large dot pair for the size encoding, a coloured line for an edge,
 * and a two-frame CSS animation for the pulse.
 *
 * Sat bottom-right, the exact spot `GroupsPanel` vacated the same day it
 * moved to bottom-centre, until 2026-08-20's later layout pass moved it
 * again — bottom-centre, just RIGHT of `GroupsPanel` this time (Thomas:
 * "on the right of the countries and regions button move the legend"). See
 * `wrap` below for the anchoring math, mirrored from `Compare.tsx`'s own
 * `wrap` comment on the opposite side. Same collapsed-pill-by-default
 * pattern every drop-up panel in this app uses.
 */
export function Legend() {
  const [collapsed, setCollapsed] = useState(true)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Same close-on-outside-click / Escape pattern as GroupsPanel/ChipBar.
  useEffect(() => {
    if (collapsed) return
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setCollapsed(true)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Closing this panel is the press's one action — the flag tells
        // App.tsx's Escape priority stack not to ALSO clear the selection
        // or isolate (2026-08-21, full-review item 3 — the exact repro was
        // "Legend open + UAE isolated, one Escape destroyed both").
        e.preventDefault()
        setCollapsed(true)
      }
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [collapsed])

  // One representative family per row would be arbitrary; showing all of
  // them is the point of a legend. `COUNTRY_FAMILY`'s values, deduplicated,
  // rather than a hand-kept list that could drift from the real family set.
  const families = Array.from(new Set(Object.values(COUNTRY_FAMILY))) as ColourFamily[]

  return (
    <div ref={wrapRef} style={wrap}>
      {/*
        The pulse demo's travel animation needs a @keyframes rule, which a
        React inline-style object cannot express. A scoped <style> tag here
        rather than adding to `uiTheme.ts`'s THEME_CSS — this animation has
        exactly one consumer and does not need to be a global theme constant.
      */}
      <style>{'@keyframes legend-pulse-travel { 0% { left: 0; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { left: 24px; opacity: 0; } }'}</style>
      {collapsed ? (
        <button type="button" onClick={() => setCollapsed(false)} style={pill}>
          Legend
        </button>
      ) : (
        <div style={panel}>
          <div style={header}>
            <span style={title}>Legend</span>
            <button type="button" onClick={() => setCollapsed(true)} style={clearButton}>
              Close
            </button>
          </div>

          <div style={list}>
            <Row
              label="Colour"
              desc="Country / bloc family — who publishes it."
              swatch={<FamilyDots families={families} />}
            />
            <Row
              label="Fill darkness"
              desc="Government tier within that family — federal is brightest, municipal and institutional step down from there."
              swatch={<TierRamp />}
            />
            <Row
              label="Hollow ring"
              desc="A one-off instrument — published once, will not recur. Solid fill means an ongoing report."
              swatch={<HollowPair />}
            />
            <Row
              label="Size"
              desc="Authority — how much else in the corpus depends on this report, directly or through a chain."
              swatch={<SizePair />}
            />
            <Row
              label="Line colour"
              desc="The source report's own family ink — same colours as the nodes, on every edge and pulse."
              swatch={<FamilyDots families={families.slice(0, 4)} line />}
            />
            <Row
              label="Pulse rate"
              desc="How often the source publishes — a pulse travels the edge once per release cycle; faster pulse, more frequent release."
              swatch={<PulseDemo />}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, desc, swatch }: { label: string; desc: string; swatch: React.ReactNode }) {
  return (
    <div style={row}>
      <div style={rowSwatch}>{swatch}</div>
      <div style={rowText}>
        <div style={rowLabel}>{label}</div>
        <div style={rowDesc}>{desc}</div>
      </div>
    </div>
  )
}

function FamilyDots({ families, line = false }: { families: ColourFamily[]; line?: boolean }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 46 }}>
      {families.map((f) =>
        line ? (
          <span
            key={f}
            title={f}
            style={{ width: 14, height: 2, background: FAMILY_INK[f], borderRadius: 1 }}
          />
        ) : (
          <span
            key={f}
            title={f}
            style={{
              width: 9,
              height: 9,
              borderRadius: 9,
              background: FAMILY_INK[f],
              flexShrink: 0,
            }}
          />
        ),
      )}
    </div>
  )
}

function TierRamp() {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1, 0.72, 0.48, 0.28].map((op, i) => (
        <span
          key={i}
          style={{
            width: 9,
            height: 9,
            borderRadius: 9,
            background: 'var(--accent-line)',
            opacity: op,
          }}
        />
      ))}
    </div>
  )
}

function HollowPair() {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <span
        style={{
          width: 11,
          height: 11,
          borderRadius: 11,
          border: '1.5px solid var(--accent-line)',
          background: 'transparent',
        }}
      />
      <span
        style={{
          width: 11,
          height: 11,
          borderRadius: 11,
          background: 'var(--accent-line)',
        }}
      />
    </div>
  )
}

function SizePair() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 5, height: 5, borderRadius: 5, background: 'var(--accent-line)' }} />
      <span style={{ width: 13, height: 13, borderRadius: 13, background: 'var(--accent-line)' }} />
    </div>
  )
}

function PulseDemo() {
  return (
    <div style={pulseTrack}>
      <span style={pulseDot} />
    </div>
  )
}

// Bottom-centre, just RIGHT of `GroupsPanel` — since 2026-08-21 the LAST
// child of the bottom dock's centre cell (`bottomDock` in App.tsx; see
// `Compare.tsx`'s `wrap` comment for the full story of the move). The old
// fixed `calc(50% + 140px)` anchor let this panel, expanded, fully cover
// the Unlinked shelf at any window below ~1800px and overlap its pill below
// ~1350px — in the dock the two live in different grid cells and cannot
// touch. `pointerEvents: 'auto'` because the dock container is 'none'.
const wrap: React.CSSProperties = {
  position: 'relative',
  pointerEvents: 'auto',
}

const pill: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 10,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--ink-dim)',
  background: 'var(--panel-bg)',
  border: '1px solid var(--line)',
  borderRadius: 8,
  padding: '7px 12px',
  cursor: 'pointer',
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
}

const panel: React.CSSProperties = {
  width: 268,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 12px',
  background: 'var(--panel-bg-solid)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  boxShadow: 'var(--panel-shadow)',
  backdropFilter: 'var(--glass-filter)',
  userSelect: 'none',
}

const header: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  paddingBottom: 6,
  marginBottom: 6,
  borderBottom: '1px solid var(--line-faint)',
}

const title: React.CSSProperties = {
  flex: 1,
  fontSize: 10,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--ink-faint)',
}

const clearButton: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 9.5,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--ink-dim)',
  background: 'transparent',
  border: '1px solid var(--line)',
  borderRadius: 5,
  padding: '3px 9px',
  cursor: 'pointer',
  lineHeight: 1,
}

const list: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 9,
  maxHeight: '52vh',
  overflowY: 'auto',
}

const row: React.CSSProperties = {
  display: 'flex',
  gap: 10,
  alignItems: 'flex-start',
}

const rowSwatch: React.CSSProperties = {
  width: 34,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  minHeight: 16,
  paddingTop: 2,
}

const rowText: React.CSSProperties = {
  flex: 1,
}

const rowLabel: React.CSSProperties = {
  fontSize: 11,
  color: 'var(--ink-strong)',
  fontWeight: 600,
  marginBottom: 1,
}

const rowDesc: React.CSSProperties = {
  fontSize: 10.5,
  lineHeight: 1.4,
  color: 'var(--ink-dim)',
}

const pulseTrack: React.CSSProperties = {
  position: 'relative',
  width: 30,
  height: 2,
  background: 'var(--line-faint)',
  borderRadius: 1,
}

const pulseDot: React.CSSProperties = {
  position: 'absolute',
  top: -2,
  left: 0,
  width: 6,
  height: 6,
  borderRadius: 6,
  background: 'var(--accent-line)',
  animation: 'legend-pulse-travel 1.4s linear infinite',
}
