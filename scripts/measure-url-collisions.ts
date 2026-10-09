/**
 * Which nodes share a non-bare `url` with another node — the August 2026
 * import's granularity defect (HANDOFF §3 [Thomas] item 1, ruled (a) "one node
 * per document" by Thomas 2026-10-05).
 *
 *   SLICE=br-brazil-2026-08 npx tsx scripts/measure-url-collisions.ts
 *
 * Reads the WHOLE assembled corpus (seed files included, PLAYBOOK-CORPUS rule
 * 11), so a collision with a node in another slice is seen. Restricts the
 * printout to url groups that touch at least one node of SLICE (all groups if
 * SLICE is unset). Writes nothing; prints JSON to stdout.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { reports, dependencies } from '../src/data/index'
import { isBareHost } from '../src/lib/graph'

const slice = process.env.SLICE
const sliceIds = new Set<string>()
if (slice) {
  const raw = JSON.parse(readFileSync(join('src/data/research', `${slice}.json`), 'utf8'))
  for (const r of raw.reports ?? []) sliceIds.add(r.id)
}

const norm = (u: string) => u.trim().replace(/#.*$/, '').replace(/\/+$/, '').toLowerCase()
const byUrl = new Map<string, typeof reports>()
for (const r of reports) {
  if (!r.url || isBareHost(r.url)) continue
  const k = norm(r.url)
  byUrl.set(k, [...(byUrl.get(k) ?? []), r])
}

const edgesOf = (id: string) => ({
  out: dependencies
    .filter((d) => d.source_report_id === id)
    .map((d) => `${d.target_report_id} [${d.relationship_type} ${d.evidence_grade ?? '-'}]`),
  in: dependencies
    .filter((d) => d.target_report_id === id)
    .map((d) => `${d.source_report_id} [${d.relationship_type} ${d.evidence_grade ?? '-'}]`),
})

const groups = [...byUrl]
  .filter(([, rs]) => rs.length > 1)
  .filter(([, rs]) => !slice || rs.some((r) => sliceIds.has(r.id)))
  .sort((a, b) => b[1].length - a[1].length)
  .map(([url, rs]) => ({
    url,
    n: rs.length,
    nodes: rs.map((r) => ({
      id: r.id,
      title: r.title,
      kind: r.kind,
      publisher: r.publisher,
      part_of: (r as { part_of?: string }).part_of,
      in_slice: sliceIds.has(r.id),
      description: r.description,
      ...edgesOf(r.id),
    })),
  }))

console.log(JSON.stringify({ slice: slice ?? null, groups: groups.length, nodes: groups.reduce((s, g) => s + g.n, 0), detail: groups }, null, 1))
