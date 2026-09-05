// Headless screenshot at a given tier. node scripts/renderer/shot.mjs <out.png> [tier] [wait ms]
import { chromium } from 'playwright'
const [out = '/tmp/shot.png', tierArg = '2', waitArg = '25000'] = process.argv.slice(2)
const rig = { drilldown: Number(tierArg), openedCountries: [], view: {}, filter: {}, selectedId: process.env.SELECT ?? null, selectedGroupId: null }
const encoded = Buffer.from(JSON.stringify(rig), 'utf8').toString('base64')
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
})
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
page.on('pageerror', (e) => console.log('PAGEERROR', e.message))
await page.addInitScript(() => { try { window.localStorage.setItem('rig.onboarding.dismissed.v3', '1') } catch {} })
await page.goto(`http://localhost:5173/?rig=${encoded}`)
await page.waitForFunction(() => window.__rig && window.__rig.graph() && window.__rig.graph().nodes.length > 0, null, { timeout: 120000 })
await page.waitForFunction(() => window.__rig.fit().everFitted, null, { timeout: 180000 }).catch(() => console.log('never fitted'))
await page.waitForFunction(() => !document.querySelector('[aria-live="polite"]') || !document.body.innerText.includes('Settling'), null, { timeout: 180000 }).catch(() => console.log('curtain stuck'))
await page.waitForTimeout(Number(waitArg))
const stats = await page.evaluate(() => ({ photons: window.__rig.photons?.(), links: window.__rig.links?.(), nodes: window.__rig.graph().nodes.length }))
console.log(JSON.stringify(stats))
await page.screenshot({ path: out })
await browser.close()
