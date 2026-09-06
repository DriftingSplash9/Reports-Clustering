// Everything tier, EVERY country unfolded, screenshot once the layout has
// settled. `shot.mjs` shoots a tier with nothing opened (289 nodes at tier 4);
// this is the 2,385-node case, which is the only one where a force change is
// visible. Requires `npm run dev` on :5173 (window.__rig is DEV-only) and
// `npm i --no-save playwright`. Added 2026-09-05 for the collide/theta
// before-and-after pair.
// Usage: node scripts/renderer/shot-all.mjs <out.png> [settle budget ms]
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
const out = process.argv[2] ?? '/tmp/shot-all.png'
const wait = Number(process.argv[3] ?? 60000)
const corpus = JSON.parse(readFileSync('public/corpus-data.json', 'utf8'))
const countries = [...new Set(corpus.flatMap((s) => (s.reports ?? []).map((r) => r.country)))]
const rig = { drilldown: 4, openedCountries: countries, view: {}, filter: {}, selectedId: null, selectedGroupId: null }
const encoded = Buffer.from(JSON.stringify(rig), 'utf8').toString('base64')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
page.on('pageerror', (e) => console.log('PAGEERROR', e.message))
await page.addInitScript(() => { try { window.localStorage.setItem('rig.onboarding.dismissed.v3', '1') } catch {} })
await page.goto(`http://localhost:5173/?rig=${encoded}`)
await page.waitForFunction(() => window.__rig && window.__rig.graph() && window.__rig.graph().nodes.length > 0, null, { timeout: 180000 })
await page.waitForFunction(() => window.__rig.fit().settledOnce, null, { timeout: wait }).catch(() => console.log('NOT SETTLED within budget'))
await page.waitForTimeout(8000)
const stats = await page.evaluate(() => {
  const ns = window.__rig.graph().nodes
  const pos = window.__rig.fit ? window.__rig.fit() : null
  return { nodes: ns.length, fit: pos }
})
console.log(JSON.stringify(stats).slice(0, 400))
await page.screenshot({ path: out })
await browser.close()
