/**
 * URL liveness sweep. Run with `npm run check-urls`.
 *
 * **Why this exists.** The standing rule in `REPORTS.md` is that a pointer is not
 * a source: an agent's `WebFetch` can return plausible content for a URL that no
 * longer resolves, so a quote confirmed only through a fetching tool is confirmed
 * by the same layer that could have invented it. Content-matching catches a
 * *wrong* page well and a *fabricated* one badly. This script closes that gap the
 * only way it can be closed — by asking the network directly, outside any model,
 * and reporting the status code.
 *
 * It was written on 2026-08-18 alongside the Grok archive import, where 1 972
 * staged nodes carry a URL that had been verified by content but never by status.
 *
 * **What it does not do.** It does not check that a page still *says* what the
 * corpus claims it says — link rot and content drift are different problems and
 * only the first is mechanical. A 200 here means the door opens, not that the
 * room is unchanged.
 *
 * Usage:
 *   npm run check-urls                 — the live corpus (src/data)
 *   npm run check-urls -- --dir <path> — a folder of slice JSONs, e.g. a staged
 *                                        import you have not minted yet
 *   npm run check-urls -- --json out.json   — also write the full result set
 *
 * Exit code is 1 if any URL is dead, so it can gate a mint.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

type Row = { id: string; url: string; source: string }

const args = process.argv.slice(2)
const dirFlag = args.indexOf('--dir')
const jsonFlag = args.indexOf('--json')
const dir = dirFlag >= 0 ? args[dirFlag + 1] : null
const jsonOut = jsonFlag >= 0 ? args[jsonFlag + 1] : null

/** Concurrency. Deliberately modest: this hits other people's servers. */
const CONCURRENCY = 8
/** Per-request ceiling. Government statistics sites are often slow, not dead. */
const TIMEOUT_MS = 20_000

async function collect(): Promise<Row[]> {
  if (dir) {
    const rows: Row[] = []
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.json') && !f.startsWith('_'))) {
      let parsed: unknown
      try {
        parsed = JSON.parse(readFileSync(join(dir, f), 'utf8'))
      } catch {
        console.log(`  ! ${f} is not valid JSON — skipped`)
        continue
      }
      const reports = (parsed as { reports?: { id: string; url?: string | null }[] }).reports ?? []
      for (const r of reports) if (r.url) rows.push({ id: r.id, url: r.url, source: f })
    }
    return rows
  }
  const { reports } = (await import('../src/data')) as {
    reports: { id: string; url?: string | null }[]
  }
  return reports.filter((r) => r.url).map((r) => ({ id: r.id, url: r.url as string, source: 'live corpus' }))
}

type Result = Row & { status: number | null; ok: boolean; note: string }

async function head(url: string): Promise<{ status: number | null; note: string }> {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS)
  try {
    // HEAD first — cheapest, and most static-file hosts answer it. A surprising
    // number of government sites 405 a HEAD and serve the GET perfectly well,
    // which is why the fallback is not optional.
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctl.signal })
    if (res.status === 405 || res.status === 501 || res.status === 403) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctl.signal })
    }
    return { status: res.status, note: res.redirected ? `redirected to ${res.url}` : '' }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { status: null, note: /abort/i.test(msg) ? `timeout after ${TIMEOUT_MS / 1000}s` : msg }
  } finally {
    clearTimeout(timer)
  }
}

const rows = await collect()
console.log(`Checking ${rows.length} URLs from ${dir ?? 'the live corpus'}, ${CONCURRENCY} at a time.\n`)

const results: Result[] = []
let cursor = 0
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < rows.length) {
      const row = rows[cursor++]
      const { status, note } = await head(row.url)
      const ok = status !== null && status >= 200 && status < 400
      results.push({ ...row, status, ok, note })
      if (results.length % 50 === 0) console.log(`  … ${results.length}/${rows.length}`)
    }
  }),
)

const dead = results.filter((r) => !r.ok)
const byStatus = new Map<string, number>()
for (const r of results) {
  const key = r.status === null ? 'unreachable' : String(r.status)
  byStatus.set(key, (byStatus.get(key) ?? 0) + 1)
}

console.log(`\nURL SWEEP — ${results.length} checked`)
for (const [status, count] of [...byStatus].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(4)}  ${status}`)
}
console.log(
  dead.length === 0
    ? '  ✓ every URL answered'
    : `  ✗ ${dead.length} URL(s) did not answer:`,
)
for (const d of dead.sort((a, b) => a.source.localeCompare(b.source))) {
  console.log(`      ${d.source}  ${d.id}`)
  console.log(`        ${d.url}`)
  console.log(`        ${d.status ?? 'no response'}${d.note ? ` — ${d.note}` : ''}`)
}

// A redirect is not a failure, but a permanent one usually means the corpus is
// holding a stale URL that will rot properly later. Worth seeing, not worth
// failing on.
const redirected = results.filter((r) => r.ok && r.note.startsWith('redirected'))
if (redirected.length) {
  console.log(`\n  ${redirected.length} URL(s) answered via a redirect — the stored URL is not the live one:`)
  for (const r of redirected.slice(0, 30)) console.log(`      ${r.id}\n        ${r.url}\n        → ${r.note.replace('redirected to ', '')}`)
  if (redirected.length > 30) console.log(`      … and ${redirected.length - 30} more`)
}

if (jsonOut) {
  writeFileSync(jsonOut, JSON.stringify({ checked: results.length, dead: dead.length, results }, null, 2))
  console.log(`\nFull results written to ${jsonOut}`)
}

console.log()
process.exit(dead.length ? 1 : 0)
