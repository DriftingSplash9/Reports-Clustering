// Settle wall-clock at a given tier: node scripts/renderer/settle.mjs [tier] [runs]
// Prints, per run, ms and rAF frames from the first physics tick to
// `settledOnce` (three-forcegraph's onEngineStop on alpha decay), plus the
// tick count the layout needed. Same caveat as the rest of this folder:
// swiftshader frame TIMES are not Thomas's; the tick/frame ratio is the
// number that transfers (2026-09-05, tick burst measurement).
import { chromium } from 'playwright'
const [tierArg = '2', runsArg = '3'] = process.argv.slice(2)
const rig = { drilldown: Number(tierArg), openedCountries: [], view: {}, filter: {}, selectedId: null, selectedGroupId: null }
const encoded = Buffer.from(JSON.stringify(rig), 'utf8').toString('base64')
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
})
for (let run = 0; run < Number(runsArg); run++) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  page.on('pageerror', (e) => console.log('PAGEERROR', e.message))
  await page.addInitScript(() => { try { window.localStorage.setItem('rig.onboarding.dismissed.v3', '1') } catch {} })
  await page.goto(`http://localhost:5173/?rig=${encoded}`)
  await page.waitForFunction(() => window.__rig && window.__rig.fit().tickCount > 0, null, { timeout: 180000 })
  const result = await page.evaluate(() => new Promise((resolve) => {
    const t0 = performance.now()
    let frames = 0
    const loop = () => {
      frames += 1
      const f = window.__rig.fit()
      if (f.settledOnce) resolve({ ms: Math.round(performance.now() - t0), frames, ticks: f.tickCount, nodes: window.__rig.graph().nodes.length })
      else if (performance.now() - t0 > 170000) resolve({ timeout: true, frames, ticks: f.tickCount })
      else requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }))
  console.log(JSON.stringify({ run, tier: Number(tierArg), ...result }))
  await page.close()
}
await browser.close()
