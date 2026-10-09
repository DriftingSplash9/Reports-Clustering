/**
 * Dry-run a node merge and measure what it does to the ranking. Writes nothing.
 *
 *   PLAN=path/to/plan.json npx tsx scripts/simulate-merge.ts
 *
 * Plan shape: `{ "merges": [{ "survivor": id, "retire": [id, ...] }] }`.
 * Every edge touching a retired id is re-pointed at its survivor. An edge that
 * then loops onto itself, duplicates a live (source, target) pair, or joins a
 * node to its `part_of` container (validator error, PLAYBOOK-CORPUS rule 12)
 * is reported and left out of the "after" graph — those are the edges a real
 * merge would move to `_dropped`.
 *
 * Built for the node-granularity pilot (ruling (a), Thomas 2026-10-05: one node
 * per document). Same idea as the V0.11 StatCan measurement in the `part_of`
 * comment in `types.ts`, made repeatable.
 */
import { readFileSync } from 'node:fs'
import { reports, dependencies } from '../src/data/index'
import { buildGraph } from '../src/lib/graph'

const plan: { merges: { survivor: string; retire: string[] }[] } = JSON.parse(
  readFileSync(process.env.PLAN!, 'utf8'),
)
const to = new Map<string, string>()
for (const m of plan.merges) for (const r of m.retire) to.set(r, m.survivor)
const map = (id: string) => to.get(id) ?? id

const partOf = new Map(reports.map((r) => [r.id, (r as { part_of?: string }).part_of]))
const live = new Set(dependencies.map((d) => `${d.source_report_id}|${d.target_report_id}`))
const kept: typeof dependencies = []
const seen = new Set<string>()
const rows: string[] = []
for (const d of dependencies) {
  const s = map(d.source_report_id), t = map(d.target_report_id)
  const moved = s !== d.source_report_id || t !== d.target_report_id
  const key = `${s}|${t}`
  let fate = moved ? 'REPOINT' : 'keep'
  if (s === t) fate = 'DROP self-loop'
  else if (partOf.get(s) === t || partOf.get(t) === s) fate = 'DROP part_of container (rule 12)'
  else if (seen.has(key) || (moved && live.has(key))) fate = 'DROP duplicate'
  if (moved || fate.startsWith('DROP'))
    rows.push(`${fate.padEnd(34)} ${d.source_report_id} -> ${d.target_report_id}  =>  ${s} -> ${t}  [${d.relationship_type} ${d.evidence_grade}]`)
  if (fate.startsWith('DROP')) continue
  seen.add(key)
  kept.push({ ...d, source_report_id: s, target_report_id: t })
}
const afterReports = reports.filter((r) => !to.has(r.id))

const rankOf = (g: ReturnType<typeof buildGraph>) => {
  const sorted = [...g.nodes].sort((a, b) => b.authority - a.authority)
  return new Map(sorted.map((n, i) => [n.id, { rank: i + 1, a: n.authority, n: sorted.length }]))
}
const before = rankOf(buildGraph(reports, dependencies))
const after = rankOf(buildGraph(afterReports, kept))

console.log(`EDGES — ${rows.length} touched`)
for (const r of rows) console.log('  ' + r)
console.log(`\nNODES — ${reports.length} -> ${afterReports.length}; edges ${dependencies.length} -> ${kept.length}`)
for (const m of plan.merges) {
  const b = before.get(m.survivor)!, a = after.get(m.survivor)!
  const parts = [m.survivor, ...m.retire].map((id) => before.get(id)!)
  const sum = parts.reduce((s, p) => s + p.a, 0)
  console.log(
    `\n${m.survivor}: rank ${b.rank} -> ${a.rank}   authority ${b.a.toFixed(5)} -> ${a.a.toFixed(5)}` +
      `   (sum of the ${parts.length} parts before: ${sum.toFixed(5)})`,
  )
  for (const id of m.retire) console.log(`   retired ${id.padEnd(36)} was rank ${before.get(id)!.rank}, authority ${before.get(id)!.a.toFixed(5)}`)
}
// Count AUTHORITY moves, not rank moves. Rank is a bad corpus-wide gauge here:
// dozens of nodes share an identical floor authority, and float noise of order
// 1e-14 reorders a tied block, so a node can "move 1,459 places" with its
// authority unchanged (gm-gbos-cpi, Mexico dry run 2026-10-05). The Brazil
// write's "63 nodes moved >11 places" was measured the old way and may carry
// the same noise.
let moved = 0, worst = 0, worstId = ''
for (const [id, a] of after) {
  const b = before.get(id)!
  const rel = Math.abs(a.a - b.a) / b.a
  if (rel > 0.01) moved++
  if (rel > worst) { worst = rel; worstId = id }
}
console.log(
  `\ncorpus-wide: ${moved} of ${after.size} surviving nodes change AUTHORITY by more than 1%; ` +
    `largest ${(worst * 100).toFixed(1)}% (${worstId})`,
)
const watch = (process.env.WATCH ?? '').split(',').filter(Boolean)
for (const id of watch) {
  const b = before.get(id), a = after.get(id)
  if (b && a) console.log(`  watch ${id.padEnd(36)} rank ${b.rank} -> ${a.rank}   authority ${b.a.toFixed(5)} -> ${a.a.toFixed(5)}`)
}
