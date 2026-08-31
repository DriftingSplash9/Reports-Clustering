/**
 * Reproducible sweep of the layout forces against the real corpus.
 *
 * Exists because every constant in `clusterRepulsion.ts`, `galaxyForce.ts`
 * and `InfluenceGraph.tsx`'s `HUB_LINK_KNEE` was calibrated with a throwaway
 * script that was then deleted, which makes PLAYBOOK rule 8 ("measure before
 * believing") unsatisfiable for exactly the numbers that decide where every
 * node sits. It also hid a real error: the 2026-08-28 sweep recorded a
 * baseline inter/intra ratio of 4.29 that does not occur in any of six runs
 * here (measured 6.06-8.93), and that inflated baseline is what justified
 * raising the cluster-repulsion ceiling from 3 to 10 to 15.
 *
 * What it replicates, deliberately and explicitly — the production force set
 * from the `forceGraph` memo in `InfluenceGraph.tsx`:
 *   link      distance (40 + (1-weight)*28 + hubRoom) * m * 2, strength = stiffness
 *   charge    strength -399*m, distanceMax 420*m
 *   collide   radiusFor(size_score)*1.5 + 4 + 4*m, strength .85, iterations 2
 *   centre    strength 0 (a true no-op, as shipped)
 *   plus galaxyForce / countryAffinityForce / clusterRepulsionForce imported
 *   unmodified from src/lib
 *
 * What it does NOT replicate: three-forcegraph's node seeding and the
 * hierarchy fold. Every node in the corpus participates, at every tier. That
 * is fine for comparing strengths against each other — which is the only
 * thing this script is for — and wrong for predicting an absolute on-screen
 * radius. Do not quote its p95 as the app's cloud radius.
 *
 * The two rules that make it trustworthy, both learned the hard way:
 *   1. Fresh nodes, fresh links and a fresh simulation per run. State leaking
 *      between sweep steps is what made a negligible 1/d^2 effect look real
 *      in 2026-08-27.
 *   2. More than one seed. Run-to-run variance on this corpus is large enough
 *      to swamp the effect being measured — at spread 200% the on-screen
 *      separation ratio varies more between seeds at a fixed strength than it
 *      does across the whole 0-15 slider.
 *
 * Usage:
 *   npx tsx scripts/measure-forces.ts
 *   SPREAD=100 GEO=0 SEEDS=1,2,3 CRS=0,15 npx tsx scripts/measure-forces.ts
 *
 * Read `onscreen` (inter / p95), not `ratio`. The camera fits the 95th
 * percentile core radius, so `ratio` measures something the fit renormalises
 * away; `onscreen` is what a viewer actually sees change.
 */
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

import { reports, dependencies } from '../src/data/index'
import { buildGraph, RELATIONSHIP_WEIGHT, radiusFor } from '../src/lib/graph'
import { galaxyForce } from '../src/lib/galaxyForce'
import { countryAffinityForce } from '../src/lib/geoAffinity'
import { clusterRepulsionForce } from '../src/lib/clusterRepulsion'

/**
 * d3-force-3d ships no types and `src/types/d3-force-3d.d.ts` deliberately
 * declares only the two forces the app itself constructs. Rather than widen
 * that shared shim for a diagnostic script, this file carries its own local
 * declarations and loads the module through `createRequire` — so it is a
 * genuine drop-in: copy it into `scripts/`, run it, delete it, nothing else
 * in the repo changes and `tsc --noEmit` stays green either way.
 */
type Force = ((alpha: number) => void) & { initialize?: (nodes: unknown[]) => void }
interface Sim {
  force(name: string, f: unknown): Sim
  alphaDecay(n: number): Sim
  velocityDecay(n: number): Sim
  alpha(n: number): Sim
  stop(): Sim
  tick(n: number): Sim
}
interface D3Force3d {
  forceSimulation(nodes: unknown[], dims: number): Sim
  forceLink(links: unknown[]): {
    id(fn: (d: never) => string): ReturnType<D3Force3d['forceLink']>
    distance(fn: (l: never) => number): ReturnType<D3Force3d['forceLink']>
    strength(fn: (l: never) => number): ReturnType<D3Force3d['forceLink']>
  }
  forceManyBody(): { strength(n: number): { distanceMax(n: number): unknown } }
  forceCollide(r: (node: never) => number): {
    strength(n: number): { iterations(n: number): unknown }
  }
}
const { forceSimulation, forceLink, forceManyBody, forceCollide } =
  createRequire(import.meta.url)('d3-force-3d') as D3Force3d

const g = buildGraph(reports, dependencies)
const SPREAD = Number(process.env.SPREAD ?? 2)
const GEO = Number(process.env.GEO ?? 1.5)
const GALAXY = Number(process.env.GALAXY ?? 1)
const TICKS = Number(process.env.TICKS ?? 400)
const SEEDS = (process.env.SEEDS ?? '1,2').split(',').map(Number)
const CRS = (process.env.CRS ?? '0,1,3,6,10,15,30').split(',').map(Number)
const OUT = process.env.OUT ?? ''

/** Seeded PRNG so two runs at different strengths start from identical positions. */
function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// --- link data, built exactly as the forceGraph memo builds it -------------
const degree = new Map<string, number>()
for (const e of g.edges) {
  degree.set(e.source_report_id, (degree.get(e.source_report_id) ?? 0) + 1)
  degree.set(e.target_report_id, (degree.get(e.target_report_id) ?? 0) + 1)
}
const countrySpan = new Map<string, Set<string>>()
for (const e of g.edges) {
  for (const [self, other] of [
    [e.source_report_id, e.target_report_id],
    [e.target_report_id, e.source_report_id],
  ] as const) {
    const c = g.byId.get(other)?.country
    if (!c) continue
    const s = countrySpan.get(self)
    if (s) s.add(c)
    else countrySpan.set(self, new Set([c]))
  }
}
const HUB_SPAN_GATE = 10
const HUB_LINK_KNEE = 4
type L = { source: string; target: string; weight: number; hubRoom: number; stiffness: number }
const linkMap = new Map<string, L>()
for (const e of g.edges) {
  const key = `${e.target_report_id}|${e.source_report_id}`
  const weight = e.strength ?? RELATIONSHIP_WEIGHT[e.relationship_type]
  const existing = linkMap.get(key)
  if (existing) { existing.weight = Math.max(existing.weight, weight); continue }
  const ds = degree.get(e.source_report_id) ?? 1
  const dt = degree.get(e.target_report_id) ?? 1
  const base = 1 / Math.max(1, Math.min(ds, dt))
  const busier = ds >= dt ? e.source_report_id : e.target_report_id
  const span = countrySpan.get(busier)?.size ?? 0
  linkMap.set(key, {
    source: e.target_report_id,
    target: e.source_report_id,
    weight,
    hubRoom: 3.5 * (Math.sqrt(ds) + Math.sqrt(dt)),
    stiffness: span < HUB_SPAN_GATE ? base : base * Math.min(1, HUB_LINK_KNEE / Math.max(ds, dt)),
  })
}
const baseLinks = [...linkMap.values()]

function run(clusterRep: number, seed: number) {
  const rnd = mulberry32(seed)
  const nodes = g.nodes.map((n) => ({
    id: n.id, country: n.country as string, size_score: n.size_score,
    x: (rnd() - 0.5) * 20, y: (rnd() - 0.5) * 20, z: (rnd() - 0.5) * 20, vx: 0, vy: 0, vz: 0,
  }))
  const links = baseLinks.map((l) => ({ ...l }))
  const m = SPREAD
  const LINK_LENGTH_SCALE = 2
  const sim = forceSimulation(nodes, 3).alphaDecay(0).velocityDecay(0.4).stop()
  sim.force('link', forceLink(links)
    .id(((d: { id: string }) => d.id) as never)
    .distance(((l: L) => (40 + (1 - l.weight) * 28 + l.hubRoom) * m * LINK_LENGTH_SCALE) as never)
    .strength(((l: L) => l.stiffness) as never))
  sim.force('charge', forceManyBody().strength(-399 * m).distanceMax(420 * m))
  sim.force('collide', forceCollide(((n: { size_score: number }) =>
    radiusFor(n.size_score) * 1.5 + 4 + 4 * m) as never).strength(0.85).iterations(2))
  sim.force('geoAffinity', countryAffinityForce({ current: GEO }) as unknown as Force)
  sim.force('galaxy', galaxyForce({ current: GALAXY }) as unknown as Force)
  sim.force('clusterRepulsion', clusterRepulsionForce({ current: clusterRep }) as unknown as Force)

  // d3's own alpha schedule, stepped explicitly so every strength gets an
  // identical number of ticks at identical alphas.
  const alphaMin = 0.001
  const decay = 1 - Math.pow(alphaMin, 1 / TICKS)
  let alpha = 1
  for (let i = 0; i < TICKS; i++) {
    alpha += (0 - alpha) * decay
    sim.alpha(alpha)
    sim.tick(1)
  }

  const nan = nodes.filter((n) => !Number.isFinite(n.x) || !Number.isFinite(n.y) || !Number.isFinite(n.z)).length
  const byC = new Map<string, typeof nodes>()
  for (const n of nodes) { const a = byC.get(n.country); if (a) a.push(n); else byC.set(n.country, [n]) }
  const cents: [number, number, number][] = []
  let intra = 0, intraN = 0
  for (const [, ns] of byC) {
    if (ns.length < 3) continue // a one- or two-node country has no meaningful spread
    const c: [number, number, number] = [
      ns.reduce((s, n) => s + n.x, 0) / ns.length,
      ns.reduce((s, n) => s + n.y, 0) / ns.length,
      ns.reduce((s, n) => s + n.z, 0) / ns.length,
    ]
    cents.push(c)
    for (const n of ns) { intra += Math.hypot(n.x - c[0], n.y - c[1], n.z - c[2]); intraN++ }
  }
  let inter = 0, pairs = 0
  for (let i = 0; i < cents.length; i++)
    for (let j = i + 1; j < cents.length; j++) {
      inter += Math.hypot(cents[i][0] - cents[j][0], cents[i][1] - cents[j][1], cents[i][2] - cents[j][2])
      pairs++
    }
  const interMean = inter / pairs, intraMean = intra / intraN
  const gc: [number, number, number] = [
    nodes.reduce((s, n) => s + n.x, 0) / nodes.length,
    nodes.reduce((s, n) => s + n.y, 0) / nodes.length,
    nodes.reduce((s, n) => s + n.z, 0) / nodes.length,
  ]
  const d = nodes.map((n) => Math.hypot(n.x - gc[0], n.y - gc[1], n.z - gc[2])).sort((a, b) => a - b)
  const p95 = d[Math.floor(d.length * 0.95)]
  const max = d[d.length - 1]
  // What nodeScaleFor() would be asked for at this cloud radius. The cap is
  // 2000; if this ever approaches it, the cap is binding and node and edge
  // sizes are being silently clipped (PLAYBOOK §6).
  const wantedScale = (p95 * 0.026) / 8
  return {
    spread: SPREAD, geo: GEO, galaxy: GALAXY, clusterRep, seed, nan,
    ratio: interMean / intraMean,
    onscreen: interMean / p95,
    intraOnscreen: intraMean / p95,
    interMean, intraMean, p95, strayRatio: max / p95,
    wantedScale, capBinding: wantedScale > 2000,
  }
}

const rows: ReturnType<typeof run>[] = []
console.log(`corpus ${g.nodes.length} nodes / ${g.edges.length} edges · spread=${SPREAD} geo=${GEO} galaxy=${GALAXY} ticks=${TICKS}`)
for (const s of SEEDS) {
  for (const cr of CRS) {
    const r = run(cr, s)
    rows.push(r)
    console.log(
      `seed=${s} cr=${String(cr).padStart(2)}` +
      `  onscreen=${r.onscreen.toFixed(4)}` +
      `  ratio=${r.ratio.toFixed(2)}` +
      `  inter=${r.interMean.toFixed(0)} intra=${r.intraMean.toFixed(0)} p95=${r.p95.toFixed(0)}` +
      `  nodeScaleWanted=${r.wantedScale.toFixed(1)}${r.capBinding ? ' CAP BINDING' : ''}` +
      `  nan=${r.nan}`,
    )
  }
}
if (OUT) { writeFileSync(OUT, JSON.stringify(rows, null, 1)); console.log(`wrote ${OUT}`) }
