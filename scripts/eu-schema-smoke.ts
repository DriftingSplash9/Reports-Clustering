/**
 * Smoke test for the 2026-08-04 EU schema change — throwaway, safe to delete.
 *
 * Exercises the paths that opening `Country` created and that no existing data
 * reaches yet, because the corpus has no EU node in it: a member-state code, a
 * supranational EU node, and an unmapped country. The point is to confirm the
 * new guards fire before any EU slice is written against them.
 */
import {
  colourForReport,
  familyOf,
  isKnownCountry,
  inkFor,
  scopeOf,
  countryLabelFor,
  UNCLASSIFIED_COLOUR,
} from '../src/lib/palette'
import { validate } from '../src/lib/graph'
import type { Report } from '../src/lib/types'

let failures = 0
function check(label: string, actual: unknown, expected: unknown) {
  const ok = actual === expected
  if (!ok) failures++
  console.log(`${ok ? '  ok  ' : ' FAIL '} ${label}: ${actual}${ok ? '' : ` (expected ${expected})`}`)
}

console.log('\n--- family resolution ---')
check('familyOf(DE)', familyOf('DE'), 'EU')
check('familyOf(CA)', familyOf('CA'), 'CA')
check('familyOf(EU)', familyOf('EU'), 'EU')
check('isKnownCountry(DE)', isKnownCountry('DE'), true)
check('isKnownCountry(XX)', isKnownCountry('XX'), false)

console.log('\n--- scope + colour ---')
const destatis = { country: 'DE', jurisdiction_level: 'federal' } as const
const eurostat = { country: 'EU', jurisdiction_level: 'supranational' } as const
const bogus = { country: 'XX', jurisdiction_level: 'federal' } as const

check('scopeOf(Destatis)', scopeOf(destatis), 'EU:federal')
check('scopeOf(Eurostat)', scopeOf(eurostat), 'EU:supranational')
check('colour(Destatis)', colourForReport(destatis), '#279860')
check('colour(Eurostat)', colourForReport(eurostat), '#0c924f')
check('colour(unmapped)', colourForReport(bogus), UNCLASSIFIED_COLOUR)
check('ink(DE)', inkFor('DE'), '#0c924f')
check('ink(EU)', inkFor('EU'), '#0c924f')
check('ink(unmapped)', inkFor('XX'), UNCLASSIFIED_COLOUR)
check('label(DE)', countryLabelFor('DE'), 'Germany')
check('label(ZZ, unlisted)', countryLabelFor('ZZ'), 'ZZ')

console.log('\n--- validator guards ---')
const base = {
  title: 'T',
  publisher: 'P',
  region: 'R',
  description: 'D',
  releases_per_year: 1,
  last_updated: null,
  url: 'https://example.org',
  domains: ['national-accounts'],
} as unknown as Report

function errorsFor(r: Partial<Report>): string[] {
  const report = { ...base, ...r } as Report
  return validate([report], [])
    .filter((i) => i.severity === 'error')
    .map((i) => i.message)
}

const unmapped = errorsFor({ id: 'x-1', country: 'XX', jurisdiction_level: 'federal' })
check(
  'unmapped country errors',
  unmapped.some((m) => m.includes('no palette entry')),
  true,
)

const memberStateAsSupra = errorsFor({
  id: 'x-2',
  country: 'DE',
  jurisdiction_level: 'supranational',
})
check(
  'DE at supranational errors',
  memberStateAsSupra.some((m) => m.includes('supranational-level publisher')),
  true,
)

const goodEu = errorsFor({ id: 'x-3', country: 'EU', jurisdiction_level: 'supranational' })
check('EU supranational clean', goodEu.length, 0)

const goodDe = errorsFor({ id: 'x-4', country: 'DE', jurisdiction_level: 'federal' })
check('DE federal clean', goodDe.length, 0)

const euAsInternational = errorsFor({
  id: 'x-5',
  country: 'EU',
  jurisdiction_level: 'international',
})
check(
  'EU at international still errors',
  euAsInternational.some((m) => m.includes('international-level publisher')),
  true,
)

console.log(failures === 0 ? '\nall passed\n' : `\n${failures} FAILED\n`)
process.exit(failures === 0 ? 0 : 1)
