import { reports as seedReports } from './reports'
import { dependencies as seedDependencies } from './dependencies'
import { assembleCorpus, type AssembledCorpus, type ResearchSlice } from './assembleCorpus'

export type { AssembledCorpus } from './assembleCorpus'

/**
 * Fetches the merged research corpus and assembles it — the browser-side
 * counterpart to `index.ts` (Node-only, used by `scripts/validate-data.ts`).
 * Both call the same `assembleCorpus()`; this one gets its raw slices over
 * HTTP instead of off disk.
 *
 * **2026-08-21, §6 item 4 of the full review.** Before this, `App.tsx`
 * imported `reports`/`dependencies` straight from `./data`, which pulled in
 * `slices.generated.ts` — a codegen'd list of one `import` statement per
 * research JSON file (200+ of them). Every one of those files was therefore
 * compiled into the production JS bundle as executable module code:
 * `dist/assets/index-*.js` measured 8,612 kB, ~95% of it the corpus, parsed
 * and evaluated on the main thread before the app could render a single
 * frame, and re-minified by `vite build` on every source change regardless
 * of whether the data had changed at all.
 *
 * `public/corpus-data.json` (written by `npm run gen`'s rewritten
 * `scripts/gen-slices.ts`, same predev/prebuild/validate hooks as before) is
 * a static asset instead — Vite copies it into `dist/` unmodified, the JS
 * bundle no longer references it at all, and this function fetches it once
 * at startup and JSON.parses it off the module-eval path. The parse cost is
 * the same total work; what changes is that it now happens after the (now
 * tiny) JS bundle has already parsed and the loading curtain is already on
 * screen, not before either.
 *
 * Cached as a module-level promise rather than re-fetched: `App.tsx` may
 * call this from a `useEffect` that could in principle re-run (React
 * StrictMode double-invokes effects in dev), and there is exactly one
 * corpus for the life of the tab.
 */
let cached: Promise<AssembledCorpus> | null = null

export function loadCorpusData(): Promise<AssembledCorpus> {
  if (!cached) {
    cached = fetch('/corpus-data.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`corpus-data.json: HTTP ${res.status} ${res.statusText}`)
        }
        return res.json() as Promise<ResearchSlice[]>
      })
      .then((slices) => assembleCorpus(seedReports, seedDependencies, slices))
      .catch((err) => {
        // Allow a retry (e.g. the caller re-mounts, or a future "Retry"
        // affordance) rather than pinning the whole tab on one failed fetch.
        cached = null
        throw err
      })
  }
  return cached
}
