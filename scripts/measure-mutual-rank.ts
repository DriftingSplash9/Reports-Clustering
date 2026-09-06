/**
 * What the four `mutual: true` pairs are worth in the ranking.
 *
 * Exists because "mutual-pair rank leakage" sat in HANDOFF's parked-questions
 * list as a worry with no number attached, and PLAYBOOK rule 8 says a number
 * nobody ran anything to get is a guess. A mutual pair is a 2-cycle in the
 * PageRank graph: each half sends the other its rank, and the pair can pump
 * itself well above what its outside support would give it.
 *
 * Prints, for every node touched by a mutual pair, its rank and authority in
 * three corpora: as shipped; with ONE half of each pair removed (what the
 * corpus would look like if the reverse edge had never been minted); and with
 * BOTH halves removed (what excluding `mutual` edges from `rankedEdges` would
 * do, leaving them live on screen and in the graph).
 *
 *   npx tsx scripts/measure-mutual-rank.ts
 *
 * Neither cut is a recommendation. Removing one half also removes a real
 * documented dependency, so the drop it shows is an upper bound on the
 * leakage, not a measurement of it.
 */
import { reports, dependencies } from '../src/data/index'
import { buildGraph } from '../src/lib/graph'

const full = buildGraph(reports, dependencies)
const mutualEdges = dependencies.filter((d) => (d as { mutual?: boolean }).mutual)
const halves = new Set<string>()
const seen = new Set<string>()
for (const d of mutualEdges) {
  const key = [d.source_report_id, d.target_report_id].sort().join('|')
  if (seen.has(key)) halves.add(`${d.source_report_id}->${d.target_report_id}`)
  else seen.add(key)
}
const cut = buildGraph(
  reports,
  dependencies.filter((d) => !halves.has(`${d.source_report_id}->${d.target_report_id}`)),
)
const both = buildGraph(
  reports,
  dependencies.filter((d) => !(d as { mutual?: boolean }).mutual),
)

const rankOf = (g: ReturnType<typeof buildGraph>) => {
  const sorted = [...g.nodes].sort((a, b) => b.authority - a.authority)
  return new Map(sorted.map((n, i) => [n.id, { rank: i + 1, a: n.authority, s: n.size_score }]))
}
const rf = rankOf(full), rc = rankOf(cut), rb = rankOf(both)
const touched = new Set(mutualEdges.flatMap((d) => [d.source_report_id, d.target_report_id]))
console.log(`${seen.size} mutual pairs, ${touched.size} nodes touched`)
console.log('id                                 rank: shipped / one-half / both-halves   authority shipped -> both-halves')
for (const id of [...touched].sort()) {
  const a = rf.get(id)!, b = rc.get(id)!, c = rb.get(id)!
  console.log(
    `${id.padEnd(34)} ${String(a.rank).padStart(5)} / ${String(b.rank).padStart(5)} / ${String(c.rank).padStart(5)}   ` +
    `${a.a.toFixed(5)} -> ${c.a.toFixed(5)}   size ${a.s.toFixed(2)} -> ${c.s.toFixed(2)}`,
  )
}
let moved = 0, worst = 0, worstId = ''
for (const [id, a] of rf) {
  const b = rb.get(id)
  if (!b) continue
  const d = Math.abs(a.rank - b.rank)
  if (d > 0) moved++
  if (d > worst) { worst = d; worstId = id }
}
console.log(`\ncorpus-wide, both halves dropped: ${moved} of ${rf.size} nodes change rank; largest move ${worst} (${worstId})`)
