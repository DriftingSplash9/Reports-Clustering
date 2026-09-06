// What a fit percentile costs, at one spread value: the fit radius, the camera
// distance and the share of rendered nodes that falls outside the frame, for a
// range of percentiles. Built 2026-09-06 to answer whether `CORE_PERCENTILE`
// should fall as `spread` rises (it now does — `fitPercentileFor` in
// InfluenceGraph.tsx, whose comment carries the table this produced).
//
// It re-implements the fit's own arithmetic (two-pass centre, percentile
// radius, distance = radius / sin(min(vHalf, hHalf)) x 1.18) against the LIVE
// settled positions, so one page load answers every percentile at once rather
// than needing a rebuild each. Frame test is the opening pose, camera on +z.
//
// Requires `npm run dev` on :5173 (window.__rig is DEV-only) and
// `npm i --no-save playwright`.
// Usage: node scripts/renderer/fit-probe.mjs [spread] [tier] [all]
//   node scripts/renderer/fit-probe.mjs 12 4 all
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
const spread = Number(process.argv[2] ?? 1)
const tier = Number(process.argv[3] ?? 2)
const all = process.argv[4] === 'all'
const corpus = JSON.parse(readFileSync('public/corpus-data.json', 'utf8'))
const countries = all ? [...new Set(corpus.flatMap((s) => (s.reports ?? []).map((r) => r.country)))] : []
const rig = { drilldown: tier, openedCountries: countries, view: { spread }, filter: {}, selectedId: null, selectedGroupId: null }
const encoded = Buffer.from(JSON.stringify(rig), 'utf8').toString('base64')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
page.on('pageerror', (e) => console.log('PAGEERROR', e.message))
await page.addInitScript(() => { try { window.localStorage.setItem('rig.onboarding.dismissed.v3', '1') } catch {} })
await page.goto(`http://localhost:5173/?rig=${encoded}`)
await page.waitForFunction(() => window.__rig && window.__rig.graph() && window.__rig.graph().nodes.length > 0, null, { timeout: 180000 })
await page.waitForFunction(() => window.__rig.fit().settledOnce, null, { timeout: 600000 }).catch(() => console.log('NOT SETTLED'))
await page.waitForTimeout(4000)
const out = await page.evaluate(() => {
  const FOV = 24, MARGIN = 1.18, ASPECT = 1280 / 800
  const ns = window.__rig.graph().nodes.filter((n) => Number.isFinite(n.x))
  const vHalf = (FOV * Math.PI) / 360
  const hHalf = Math.atan(Math.tan(vHalf) * ASPECT)
  // the app's own two-pass centre
  const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length
  let c = [mean(ns.map((n) => n.x)), mean(ns.map((n) => n.y)), mean(ns.map((n) => n.z))]
  const dist = (p) => ns.map((n) => Math.hypot(n.x - p[0], n.y - p[1], n.z - p[2]))
  const pct = (sorted, f) => sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor(f * (sorted.length - 1))))]
  const rows = []
  for (const P of [0.95, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3]) {
    let centre = c
    const d0 = dist(centre).slice().sort((a, b) => a - b)
    const first = pct(d0, P)
    const inner = ns.filter((n) => Math.hypot(n.x - centre[0], n.y - centre[1], n.z - centre[2]) <= first)
    if (inner.length) centre = [mean(inner.map((n) => n.x)), mean(inner.map((n) => n.y)), mean(inner.map((n) => n.z))]
    const d = dist(centre).slice().sort((a, b) => a - b)
    const nodeRadius = Math.max(1, pct(d, P))
    const camDist = (nodeRadius / Math.sin(Math.min(vHalf, hHalf))) * MARGIN
    // camera looks along -z from centre + (0,0,camDist) in the rig's opening pose
    let off = 0
    for (const n of ns) {
      const dx = n.x - centre[0], dy = n.y - centre[1], dz = n.z - centre[2]
      const depth = camDist - dz
      if (depth <= 1) { off++; continue }
      if (Math.abs(dy) / depth > Math.tan(vHalf) || Math.abs(dx) / depth > Math.tan(hHalf)) off++
    }
    rows.push({ P, nodeRadius: Math.round(nodeRadius), camDist: Math.round(camDist), offPct: +(100 * off / ns.length).toFixed(1) })
  }
  return { nodes: ns.length, p50: Math.round(pct(dist(c).slice().sort((a, b) => a - b), 0.5)), rows }
})
console.log(`spread=${spread} tier=${tier}${all ? ' all-unfolded' : ''} nodes=${out.nodes} medianRadius=${out.p50}`)
for (const r of out.rows) console.log(`  P=${r.P.toFixed(2)}  fitRadius=${String(r.nodeRadius).padStart(6)}  camDist=${String(r.camDist).padStart(6)}  off-frame ${String(r.offPct).padStart(5)}%`)
await browser.close()
