// Headless scene census — draw calls per frame at Everything tier, all
// countries unfolded. Requires `npm run dev` (uses window.__rig, DEV-only).
// Usage: node scripts/renderer/census.mjs [url]
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'

const url = process.argv[2] ?? 'http://localhost:5173/'
// Every country code in the corpus, straight off the generated corpus json.
const corpus = JSON.parse(readFileSync('public/corpus-data.json', 'utf8'))
const countries = [...new Set(corpus.flatMap((slice) => (slice.reports ?? []).map((r) => r.country)))]
const rig = { drilldown: 4, openedCountries: countries, view: {}, filter: {}, selectedId: null, selectedGroupId: null }
const encoded = Buffer.from(JSON.stringify(rig), 'utf8').toString('base64')

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
})
const page = await browser.newPage({ viewport: { width: 800, height: 600 } })
page.on('pageerror', (e) => console.log('PAGEERROR', e.message))
await page.goto(`${url}?rig=${encoded}`)
await page.waitForFunction(() => window.__rig && window.__rig.graph() && window.__rig.graph().nodes.length > 0, null, { timeout: 120000 })
// let the layout settle a bit
await page.waitForTimeout(20000)

const result = await page.evaluate(async () => {
  const gl = window.__rig.gl
  const g = window.__rig.graph()
  const orig = gl.render.bind(gl)
  const ticks = []
  let cur = null
  gl.render = (scene, camera) => {
    gl.info.reset()
    orig(scene, camera)
    if (cur) cur.push({ calls: gl.info.render.calls, tris: gl.info.render.triangles, scene: scene.type, children: scene.children?.length })
  }
  for (let i = 0; i < 20; i++) {
    cur = []
    await new Promise((r) => requestAnimationFrame(r))
    ticks.push(cur)
  }
  gl.render = orig
  // census of drawables in the main scene
  const scene = window.__rig.scene
  const fam = {}
  let instanced = 0, instancedInstances = 0
  scene.traverse((o) => {
    if (!o.visible) return
    if (o.isInstancedMesh) { instanced++; instancedInstances += o.count; return }
    if (!(o.isMesh || o.isSprite || o.isLine || o.isPoints)) return
    const k = `${o.type}:${o.geometry?.type}`
    fam[k] = (fam[k] ?? 0) + 1
  })
  // invisible photons still present as objects?
  let hiddenPhotons = 0
  scene.traverse((o) => { if (o.isMesh && !o.visible && o.geometry?.type === 'LatheGeometry') hiddenPhotons++ })
  const syncMs = []
  for (let i = 0; i < 30; i++) { await new Promise((r) => requestAnimationFrame(r)); syncMs.push(window.__rig.photons().lastSyncMs + window.__rig.links().lastSyncMs + (window.__rig.nodes ? window.__rig.nodes().lastSyncMs : 0)) }
  const tot = (t) => t.reduce((a, r) => a + r.calls, 0)
  const per = ticks.map(tot)
  return { nodes: g.nodes.length, links: g.links.length, per, tris: ticks.map((t) => t.reduce((a, r) => a + r.tris, 0)), rendersPerTick: ticks.map((t) => t.length), fam, instanced, instancedInstances, hiddenPhotons, photons: window.__rig.photons(), links: window.__rig.links(), nodesInst: window.__rig.nodes ? window.__rig.nodes() : null, syncMs: syncMs.sort((a,b)=>a-b) }
})
console.log(JSON.stringify(result, null, 1))
await browser.close()
