import type { Country } from '../lib/types'
import { countryLabelFor, isKnownCountry } from '../lib/palette'

/**
 * A small country mark for the hover card.
 *
 * **Inline SVG rather than emoji, and that is not a style preference.** The first
 * version used 🇨🇦 / 🇺🇸, which are regional-indicator pairs: rendering them as
 * flags is a font feature, and Windows does not have it — Segoe UI Emoji ships no
 * flag glyphs, so the pair falls back to the bare letters "CA" and "US". The
 * headless browser used to check this had no emoji font at all and drew two empty
 * boxes, which is how it was caught. A glyph that depends on the reader's font
 * stack is a glyph that is sometimes absent.
 *
 * **The geometry is the official geometry, not a drawing of one.** The second
 * attempt hand-rolled an eleven-point leaf as a short polygon and it looked
 * exactly as approximate as it was. These are the paths from the public-domain
 * flag files, at their published proportions — 9600×4800 for Canada, so the
 * pale-and-band construction and the leaf's stem curves are correct rather than
 * suggested. A flag is a specified object; there is no reason to invent one when
 * the specification is a fetch away.
 *
 * The leaf is a hole in the white field rather than a red shape on top of it,
 * which is how the source file does it and why the path needs no fill-rule: the
 * subpath winds the opposite way to the square that contains it.
 */

/** Flag of Canada, 9600 × 4800. Two paths: the red bands, then the white pale. */
const CA_RED =
  'm0 0h2400l99 99h4602l99-99h2400v4800h-2400l-99-99h-4602l-99 99H0z'
const CA_WHITE =
  'm2400 0h4800v4800h-4800zm2490 4430-45-863a95 95 0 0 1 111-98l859 151-116-320a65 65 0 0 1 20-73l941-762-212-99a65 65 0 0 1-34-79l186-572-542 115a65 65 0 0 1-73-38l-105-247-423 454a65 65 0 0 1-111-57l204-1052-327 189a65 65 0 0 1-91-27l-332-652-332 652a65 65 0 0 1-91 27l-327-189 204 1052a65 65 0 0 1-111 57l-423-454-105 247a65 65 0 0 1-73 38l-542-115 186 572a65 65 0 0 1-34 79l-212 99 941 762a65 65 0 0 1 20 73l-116 320 859-151a95 95 0 0 1 111 98l-45 863z'

export function Flag({ country, size = 16 }: { country: Country; size?: number }) {
  const common = {
    height: Math.round(size / 2),
    role: 'img' as const,
    style: { display: 'block', flexShrink: 0 },
  }

  if (country === 'CA') {
    return (
      <svg {...common} width={size} viewBox="0 0 9600 4800" aria-label="Canada">
        <path fill="#d52b1e" d={CA_RED} />
        <path fill="#fff" d={CA_WHITE} />
      </svg>
    )
  }

  if (country === 'US') {
    // 19 × 10 union jack on a 1235 × 650 field, per the published specification.
    // The stars are drawn as dots rather than five-pointed stars: at 16px wide a
    // star is three pixels across and reads as noise, while the 9×11 grid still
    // reads as a canton. This is the one place the flags are deliberately
    // simplified, and it is simplified in the direction of legibility.
    const stripes = Array.from({ length: 7 }, (_, i) => i * 100)
    const stars: { x: number; y: number }[] = []
    for (let row = 0; row < 9; row++) {
      const odd = row % 2 === 1
      for (let col = 0; col < (odd ? 5 : 6); col++) {
        stars.push({ x: 41 + col * 82 + (odd ? 41 : 0), y: 42 + row * 35 })
      }
    }
    return (
      <svg {...common} width={size} viewBox="0 0 1235 650" aria-label="United States">
        <rect width="1235" height="650" fill="#fff" />
        {stripes.map((y) => (
          <rect key={y} y={y} width="1235" height="50" fill="#b31942" />
        ))}
        <rect width="494" height="350" fill="#0a3161" />
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r="14" fill="#fff" />
        ))}
      </svg>
    )
  }

  if (country === 'EU') {
    /*
     * Twelve stars on a 3:2 field, at the specified geometry: the circle's
     * radius is one third of the hoist and the stars sit at clock positions.
     * Drawn as dots for the same reason the US canton is — at 16px a
     * five-pointed star is noise — and the count is fixed at twelve, which is
     * not the number of member states and never was.
     *
     * This flag covers the supranational layer only. A member state gets its
     * own country code and falls through to the globe below until someone
     * draws its flag, which is honest: an unmarked German release is better
     * than a German release wearing the EU's flag.
     */
    const stars = Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 30 - 90) * (Math.PI / 180)
      return { x: 16 + 5.33 * Math.cos(angle), y: 8 + 5.33 * Math.sin(angle) }
    })
    return (
      <svg {...common} width={size} viewBox="0 0 32 16" aria-label="European Union">
        <rect width="32" height="16" fill="#003399" />
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r="1.05" fill="#ffcc00" />
        ))}
      </svg>
    )
  }

  /*
   * A globe, not a flag — for INT and for anything unmapped. An international
   * body has no flag, and borrowing one — the UN's, say — would assert a
   * membership the data does not record: SNA 2008 is joint UN/OECD/IMF/World
   * Bank/European Commission work, and IPSAS comes from a private standards
   * board.
   */
  if (country === 'INT' || !isKnownCountry(country)) {
    return (
      <svg {...common} width={size} viewBox="0 0 32 16" aria-label="International">
        <rect width="32" height="16" fill="#2b2f45" />
        <g stroke="#9db4dd" strokeWidth="1.3" fill="none">
          <circle cx="16" cy="8" r="5.4" />
          <ellipse cx="16" cy="8" rx="2.3" ry="5.4" />
          <line x1="10.6" y1="8" x2="21.4" y2="8" />
        </g>
      </svg>
    )
  }

  /*
   * A real country with no drawn flag yet: an honest code chip, labelled with
   * the country's actual name. Until 2026-08-12 these fell through to the
   * globe above, so a Ugandan CPI hover card carried a mark whose
   * accessibility label literally said "International" — for thirty-five
   * countries. The chip is deliberately not a flag: a wrong flag is worse
   * than no flag, and 35 hand-drawn flags is a project nobody has asked for.
   * `countryLabelFor` (which this is the first real consumer of) carries the
   * full name to screen readers and the hover title; the two-letter code is
   * what fits legibly in 32×16.
   */
  return (
    <svg {...common} width={size} viewBox="0 0 32 16" aria-label={countryLabelFor(country)}>
      <title>{countryLabelFor(country)}</title>
      <rect width="32" height="16" rx="2.5" fill="#2b2f45" stroke="#5a739f" strokeWidth="1" />
      <text
        x="16"
        y="11.6"
        textAnchor="middle"
        fontSize="10"
        fontFamily="inherit"
        letterSpacing="0.5"
        fill="#c7d5ec"
      >
        {country}
      </text>
    </svg>
  )
}
