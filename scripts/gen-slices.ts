/**
 * Regenerates `public/corpus-data.json` from the contents of
 * `src/data/research/`. Run via `npm run gen` — and it runs automatically
 * before `dev`, `build` and `validate`, so **adding a research slice is
 * still just dropping the JSON file in the folder.** No import line, no
 * array entry, no manifest to update.
 *
 * **2026-08-21 (§6 item 4 of the full review) — rewritten from a TS-codegen
 * script into a JSON-codegen script.** This file used to write
 * `src/data/slices.generated.ts`, a list of one `import` statement per
 * research file, cast and exported as `sliceModules`. That put the whole
 * 8.2MB corpus into the browser's JS bundle as executable module code
 * (`dist/assets/index-*.js` measured 8,612 kB, ~95% of it this data),
 * parsed on the main thread before first paint and re-minified by every
 * `vite build` regardless of whether the data had changed. TS imports were
 * chosen originally (2026-08-12) specifically because `npm run validate`
 * runs the data layer under tsx/Node, where Vite's `import.meta.glob` does
 * not exist — but that constraint was about HOW the research files get
 * read, not about them needing to be TS modules. Plain JSON solves it too:
 * this script now reads and `JSON.parse`s every research file itself (the
 * same thing Node's module loader was doing under the hood for a `.json`
 * import) and writes ONE merged JSON file, which both the Node path
 * (`src/data/index.ts`, via `readFileSync`) and the browser path
 * (`src/data/browserCorpus.ts`, via `fetch`) read at their own time. See
 * those two files' comments for the rest of the reasoning.
 *
 * `src/data/slices.generated.ts` itself is left in place as a tombstone —
 * see that file — since this session cannot delete files on Thomas's
 * machine; it should be moved to `_to_delete/` next time an agent with
 * shell access touches this project.
 *
 * Slices are emitted in sorted filename order. That is safe where the old
 * hand-ordering was load-bearing: duplicate report ids and duplicate edges
 * both FAIL `npm run validate` outright now, so no data can silently depend
 * on which copy loads first — and the seed set stays explicitly first,
 * passed into `assembleCorpus()` ahead of these slices regardless of order.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const researchDir = join(here, '..', 'src', 'data', 'research')
const outPath = join(here, '..', 'public', 'corpus-data.json')

/**
 * On-disk research files deliberately NOT loaded into the corpus.
 *
 * Found 2026-08-12 during the loader rework: these ten sat in the folder but
 * were absent from the old hand-written import list — four of them entire
 * researched countries (BF, TG, GA, TD, the AF G.11/G.12 WAEMU/CEMAC batches)
 * whose palette entries exist while their reports never load. Whether that
 * was ever deliberate is not recorded anywhere. Listed here EXPLICITLY so the
 * auto-loader reproduces the exact corpus the old hand-written list produced,
 * until Thomas rules on wiring them (round-3 review doc, Q10). To wire one:
 * delete its line here and run `npm run validate`.
 */
const UNWIRED = new Set<string>([
  // Emptied 2026-08-12 — Thomas's Q10 answer to wiring the ten lost slices: "Of course".
  // The mechanism stays for any future deliberate exclusion.
])

const files = readdirSync(researchDir).filter((f) => f.endsWith('.json')).sort()
const wired = files.filter((f) => !UNWIRED.has(f))
const skipped = files.filter((f) => UNWIRED.has(f))
const missingExclusions = [...UNWIRED].filter((f) => !files.includes(f))

const slices = wired.map((f) => {
  const path = join(researchDir, f)
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch (err) {
    throw new Error(
      `gen-slices: ${f} is not valid JSON — ${err instanceof Error ? err.message : String(err)}`,
    )
  }
})

// No pretty-printing: this file is fetched over HTTP and JSON.parsed, never
// read by a person. Compact shaves real bytes off an 8MB+ payload.
const next = JSON.stringify(slices)

const publicDir = dirname(outPath)
if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true })

const prev = existsSync(outPath) ? readFileSync(outPath, 'utf8') : ''
if (prev !== next) {
  writeFileSync(outPath, next)
  console.log(
    `gen-slices: wrote ${wired.length} slices to public/corpus-data.json ` +
      `(${(next.length / 1e6).toFixed(1)}MB, ${skipped.length} unwired by rule)`,
  )
} else {
  console.log(`gen-slices: up to date — ${wired.length} slices (${skipped.length} unwired by rule)`)
}
if (missingExclusions.length) {
  console.warn(`gen-slices: UNWIRED names ${missingExclusions.length} file(s) that no longer exist: ${missingExclusions.join(', ')} — prune the list`)
}
