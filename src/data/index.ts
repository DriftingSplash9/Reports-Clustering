import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { reports as seedReports } from './reports'
import { dependencies as seedDependencies } from './dependencies'
import { assembleCorpus, type ResearchSlice } from './assembleCorpus'

/**
 * Node-only entry point for the assembled corpus. `scripts/validate-data.ts`
 * is the only thing that imports this file — it is never reachable from
 * `App.tsx` or anything else Vite bundles for the browser.
 *
 * **Do not import this from browser code.** It reads `node:fs` at module
 * scope, which does not exist in a browser and would either fail the Vite
 * build or (worse) get silently externalised and crash at runtime. The
 * browser path is `browserCorpus.ts`, which fetches the exact same
 * `public/corpus-data.json` this file reads off disk, and hands it to the
 * same `assembleCorpus()` — one assembly rule, read two different ways.
 *
 * 2026-08-21 (§6 item 4): this used to import `slices.generated.ts`, a
 * codegen'd list of 200+ `import` statements — one per research JSON file —
 * which is how the whole 8.2MB corpus ended up compiled into the browser's
 * JS bundle as executable module code. That mechanism is retired (see the
 * tombstone left in `slices.generated.ts` and the rewritten
 * `scripts/gen-slices.ts`, which now emits `public/corpus-data.json`
 * instead of a TS import list). Reading that same JSON file directly off
 * disk here, rather than re-importing 200+ files as TS modules, is also why
 * this file no longer needs `import.meta.glob` or any Vite-only API — plain
 * `node:fs`, which was always the actual constraint driving the codegen
 * approach in the first place (see the retired comment in `gen-slices.ts`'s
 * git history / the old `slices.generated.ts` tombstone).
 */
const here = dirname(fileURLToPath(import.meta.url))
const corpusPath = join(here, '..', '..', 'public', 'corpus-data.json')

let rawSlices: ResearchSlice[]
try {
  rawSlices = JSON.parse(readFileSync(corpusPath, 'utf8'))
} catch (err) {
  throw new Error(
    `Could not read ${corpusPath} — run \`npm run gen\` first (the ` +
      `validate/build/dev scripts all do this automatically via their ` +
      `pre* hooks; this direct script did not). Original error: ${
        err instanceof Error ? err.message : String(err)
      }`,
  )
}

const assembled = assembleCorpus(seedReports, seedDependencies, rawSlices)

export const reports = assembled.reports
export const dependencies = assembled.dependencies
export const relations = assembled.relations
export const loadIssues = assembled.loadIssues
export const droppedNotes = assembled.droppedNotes
