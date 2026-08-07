/**
 * Which log is next, and whether a rollup rides with it. Run with `npm run logs`.
 *
 * Deliberately not wired into `npm run validate`. A check that fires every time
 * you touch data is a check you stop reading, and the point here is not to nag —
 * the enforcement is that a rollup is written in the same pass as the fifth
 * session log, so nobody has to decide whether to do it. This just answers the
 * question when it is asked.
 */
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')

const sessions = readdirSync(root)
  .map((f) => /^V0\.(\d+)\.md$/.exec(f))
  .filter((m): m is RegExpExecArray => m !== null)
  .map((m) => Number(m[1]))
  .sort((a, b) => a - b)

const rollups = readdirSync(root)
  .map((f) => /^V(\d+)\.(\d+)\.md$/.exec(f))
  .filter((m): m is RegExpExecArray => m !== null && m[1] !== '0')
  .map((m) => ({ number: Number(m[1]), covers: Number(m[2]) }))
  .sort((a, b) => a.number - b.number)

const latest = sessions.at(-1) ?? 0
const next = latest + 1

console.log(
  `\nSession logs: ${sessions.length ? sessions.map((n) => `V0.${n}`).join(', ') : 'none'}`,
)
console.log(
  `Rollups:      ${rollups.length ? rollups.map((r) => `V${r.number}.${r.covers}`).join(', ') : 'none'}`,
)

// Rollup n covers V0.(5n-4) through V0.(5n), and is written with V0.(5n).
// The windows overlap at the seam on purpose — see REPORTS.md.
const dueWith = (session: number) => (session % 5 === 0 ? session / 5 : null)

const rollupNumber = dueWith(next)
console.log(`\nNext log:     V0.${next}`)
if (rollupNumber !== null) {
  // Windows overlap at the seam on purpose: rollup 2 starts at V0.5, the last
  // file rollup 1 covered. Without the overlap a decision made in V0.5 and
  // revised in V0.6 would fall into the crack between two windows and be
  // described by neither. Only the first rollup has no predecessor to share
  // a boundary with, so only it starts where it does.
  const from = rollupNumber === 1 ? 1 : next - 5
  console.log(
    `Rides with:   V${rollupNumber}.${next}.md — rollup ${rollupNumber}, covering V0.${from} through V0.${next}`,
  )
  console.log(
    '\n  Write both in the same pass. The rollup is not a separate task and\n' +
      '  does not need to be asked for separately.',
  )
} else {
  const until = next + ((5 - (next % 5)) % 5)
  console.log(`Rides with:   nothing — next rollup is due with V0.${until}`)
}

// A rollup that should already exist and does not. Should not happen under the
// current protocol, but the protocol is one session old and this is cheap.
const owed = sessions
  .map(dueWith)
  .filter((n): n is number => n !== null)
  .filter((n) => !rollups.some((r) => r.number === n))

if (owed.length) {
  console.log(
    `\n  ! Overdue: rollup${owed.length === 1 ? '' : 's'} ${owed.map((n) => `V${n}.${n * 5}`).join(', ')} ${owed.length === 1 ? 'was' : 'were'} due and ${owed.length === 1 ? 'has' : 'have'} not been written.`,
  )
}
console.log()
