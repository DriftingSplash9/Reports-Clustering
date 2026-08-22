import type { Country, Graph } from './types'
import { type ColourFamily, familyOf } from './palette'
import { type OrbNode, countryFromOrbId, isCountryOrbId } from './hierarchy'

/**
 * Auto-unfold: press the tier ladder and open every country orb for the
 * user, in an order chosen to look like the "clean clusters" Thomas gets by
 * hand — double-clicking one condensed node at a time instead of jumping the
 * tier slider straight to Everything.
 *
 * Added 2026-08-22, after Thomas noticed the manual, one-orb-at-a-time
 * habit looks better than the instant tier jump and asked whether that could
 * be scripted. It can — this file adds no new physics or state shape, it
 * only decides, given the graph as currently disclosed, what the NEXT single
 * `setDrilldown`/`toggleCountryOpen`-equivalent action should be. The caller
 * (App.tsx) applies that one action, waits for the resulting re-render, and
 * asks again — same as a person double-clicking, just on a timer instead of
 * a mouse.
 *
 * **Why batch by family, not by country, and not all at once.** A lone
 * country orb opening is cheap to watch settle; every orb on screen opening
 * in the same tick is the "cluster fuck" tier jump this feature exists to
 * avoid (see hierarchy.ts's 2026-08-20 note on `resolveId`). Family is the
 * batching unit because it is already the axis the seeding code in
 * InfluenceGraph.tsx groups by — country orbs within one family scattered
 * from the same shared parent position, so opening them together disturbs
 * one already-coherent region of the scene rather than several unrelated
 * ones at once.
 *
 * **Why largest first.** Whichever batch is going to cause the biggest
 * settle disturbance causes it regardless of when it opens — a 400-report
 * family repels the cloud just as hard on step 8 as on step 1. Opening it
 * first means every batch after it is calming down, not winding up further;
 * saving it for last would mean the sequence looks progressively *worse* as
 * it goes, which is the opposite of what "unfold gradually" is for.
 */

/** One step of country orbs to open together, plus the number this family still has folded. */
export interface AutoUnfoldBatch {
  family: ColourFamily
  countries: Country[]
  /** Total folded reports across every orb in this batch — the size used to rank batches. */
  size: number
}

/**
 * The next batch to open, or `null` when every country orb currently on
 * screen has already been individually opened (the caller should advance the
 * tier instead — see `nextAutoUnfoldStep`).
 *
 * Reads `disclosedGraph`, not `graph` — the set of country orbs that exist
 * right now depends on the current tier (`COUNTRY_FOLD_FROM_TIER` in
 * hierarchy.ts) and on which countries are already open, exactly the two
 * things that change between steps.
 */
export function nextAutoUnfoldBatch(disclosedGraph: Graph): AutoUnfoldBatch | null {
  const byFamily = new Map<ColourFamily, { countries: Country[]; size: number }>()

  for (const n of disclosedGraph.nodes) {
    if (!isCountryOrbId(n.id)) continue
    const country = countryFromOrbId(n.id)
    const family = familyOf(country)
    const size = (n as OrbNode).members.length
    const entry = byFamily.get(family)
    if (entry) {
      entry.countries.push(country)
      entry.size += size
    } else {
      byFamily.set(family, { countries: [country], size })
    }
  }

  let best: AutoUnfoldBatch | null = null
  for (const [family, { countries, size }] of byFamily) {
    if (!best || size > best.size) best = { family, countries, size }
  }
  return best
}

/**
 * How long a step stays on screen before the next one fires. Tuned to sit
 * comfortably above the seed-jitter separation the graph needs to read as a
 * deliberate "bloom" rather than a jump cut (see the `SEED_JITTER` comment
 * in InfluenceGraph.tsx), without stretching a ~139-country unfold out
 * past a couple of minutes.
 */
export const AUTO_UNFOLD_STEP_MS = 900
