import type {
  Dependency,
  DroppedNote,
  EvidenceKind,
  Graph,
  RelationshipType,
  Report,
  ScoredReport,
  SourceKind,
  TerminalReason,
} from './types'
// Same argument as the palette import below: the list of valid values lives
// with the type it belongs to, and is imported rather than restated here so
// the two cannot drift. See the cast-not-parsed note in types.ts for why the
// lists exist at all. `RELATION_TYPES` is deliberately absent — relations never
// reach this module, so that one is checked in scripts/validate-data.ts.
import {
  DOMAINS,
  EVIDENCE_KINDS,
  JURISDICTION_LEVELS,
  RELATIONSHIP_TYPES,
  SCHEDULE_KINDS,
  SCHEDULE_PRECISIONS,
  SOURCE_KINDS,
  TERMINAL_REASONS,
} from './types'
// Validation reaches into the palette deliberately. The rule being enforced is
// literally "this country has a hand-written palette entry", so the palette is
// the only honest source for it; asserting it against a second list here would
// just create two lists to keep in sync.
import { isKnownCountry } from './palette'
// Date realness lives with the calendar code that also needs it, rather than
// being restated here — same argument as the value lists above.
import { isRealDate } from './schedule'

/**
 * Edge weights by relationship type.
 *
 * A statutory calculation is a far stronger claim of dependence than a passing
 * reference, and the authority score should reflect that. These numbers are a
 * judgement call, not a measurement — they are here in one place precisely so
 * they can be argued with.
 */
export const RELATIONSHIP_WEIGHT: Record<RelationshipType, number> = {
  calculated_from: 1.0,
  uses_data_from: 0.8,
  methodology_depends_on: 0.5,
  cites: 0.25,
}

export interface ValidationIssue {
  severity: 'error' | 'warning'
  message: string
}

/**
 * Official unless it says otherwise. See SourceKind in types.ts.
 *
 * Read through this helper everywhere rather than comparing the field, so the
 * default lives in one place.
 */
export function isOfficial(report: { source_kind?: SourceKind }): boolean {
  return (report.source_kind ?? 'official') === 'official'
}

/**
 * A terminus — an input a document names that cannot be a publication. See
 * TerminalReason in types.ts.
 *
 * Read through this helper rather than testing the field, for the same reason
 * `isOfficial` exists: the definition of "counts toward authority" is assembled
 * from more than one field now, and it must be assembled in one place.
 */
export function isTerminus(report: { terminal_reason?: TerminalReason }): boolean {
  return report.terminal_reason !== undefined
}

/**
 * The nodes authority is computed over: official, and not a terminus.
 *
 * Both exclusions exist for the same reason — each of these node kinds is a sink
 * by construction, and a sink accruing rank is the sink-leak bug's shape.
 */
export function isRanked(report: {
  source_kind?: SourceKind
  terminal_reason?: TerminalReason
}): boolean {
  return isOfficial(report) && !isTerminus(report)
}

/**
 * Documented unless it says otherwise. See EvidenceKind in types.ts.
 *
 * Same shape as `isOfficial`, and used the same way: these two together define
 * the subgraph authority is computed over.
 */
export function isDocumented(edge: { evidence?: EvidenceKind }): boolean {
  return (edge.evidence ?? 'documented') === 'documented'
}

/**
 * Structural checks on the seed data. Runs before scoring, because a dangling
 * edge silently distorts every authority number downstream.
 */
export function validate(
  reports: Report[],
  dependencies: Dependency[],
): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const ids = new Set<string>()

  for (const r of reports) {
    if (ids.has(r.id)) {
      issues.push({ severity: 'error', message: `Duplicate report id: ${r.id}` })
    }
    ids.add(r.id)
    // Absent is the one-off-foundational-instrument shape (Research.1.md §4,
    // 2026-08-08) and is valid; a present-but-non-positive value is not.
    if (r.releases_per_year !== undefined && r.releases_per_year <= 0) {
      issues.push({
        severity: 'error',
        message: `${r.id}: releases_per_year must be positive when present`,
      })
    }
    // An international body does not belong to a country. This exists because
    // the field was typed without an `INT` value and everything international
    // silently defaulted to Canadian — nine nodes, wrong for five sessions,
    // undetected because nothing rendered the field. Now that the rim does,
    // this stops it recurring.
    if (r.jurisdiction_level === 'international' && r.country !== 'INT') {
      issues.push({
        severity: 'error',
        message: `${r.id}: international-level publisher claims country ${r.country}`,
      })
    }
    // The same guard for the supranational layer, added 2026-08-04, widened
    // 2026-08-10. `EU` was the only supranational body modelled at first; a
    // member state publishing at that level is a mis-tag, and it is the
    // specific mis-tag the EU branch is most likely to make — a Destatis
    // release is 'DE' + 'federal', not 'EU' + anything. The AF branch then
    // added a second supranational body without its own pseudo-country code —
    // the EAC's binding HCPI regulation (`eac-hcpi-regulations`, ke-social-
    // protection.json) is filed `country: 'INT'` on the same reasoning already
    // applied to the IMF, the BIS and other bodies belonging to no single
    // country. `INT` is added to the whitelist rather than minting an `EAC`
    // pseudo-country, since unlike the EU (27 member states, its own colour
    // family) the corpus has no other EAC-scoped nodes that would need one.
    // The guard still catches the mistake it exists for: a member state
    // (`DE`, `KE`, anything real) is neither `EU` nor `INT`.
    if (
      r.jurisdiction_level === 'supranational' &&
      r.country !== 'EU' &&
      r.country !== 'INT'
    ) {
      issues.push({
        severity: 'error',
        message: `${r.id}: supranational-level publisher claims country ${r.country}`,
      })
    }
    // Replaces the exhaustiveness check the compiler used to give when `Country`
    // was a closed union. Opening it to arbitrary ISO codes on 2026-08-04 bought
    // 27 member states without a schema edit each, and cost this: nothing but
    // this rule now stops a typo'd or unmapped country reaching the renderer,
    // where it would be drawn in the flat grey of `UNCLASSIFIED_COLOUR`.
    if (!isKnownCountry(r.country)) {
      issues.push({
        severity: 'error',
        message:
          `${r.id}: country ${r.country} has no palette entry — ` +
          `add it to COUNTRY_FAMILY in src/lib/palette.ts`,
      })
    }
    // The same gap one field over, and it cost more: `jurisdiction_level` IS a
    // closed union, so this looks like the compiler's job — but the slices are
    // cast rather than parsed, so the compiler never sees the hand-typed
    // string. 29 reports carried `"national"` or `"territorial"` corpus-wide
    // and nothing complained, because the only consumer is `SCOPE_COLOUR`'s
    // own lookup and a miss there falls back silently. Added 2026-08-09,
    // EU/G.73.md.
    if (!JURISDICTION_LEVELS.includes(r.jurisdiction_level)) {
      issues.push({
        severity: 'error',
        message:
          `${r.id}: jurisdiction_level "${r.jurisdiction_level}" is not a ` +
          `JurisdictionLevel — one of ${JURISDICTION_LEVELS.join(', ')}`,
      })
    }
    // The other three report-level unions, added 2026-08-09 (EU/G.74.md) after
    // a corpus-wide scan found `Domain` populated with `"manufacturing"` and the
    // other two clean. All three are optional or plural, so `undefined` is not
    // an error and only a present-and-wrong value is.
    //
    // `source_kind` and `terminal_reason` both decide exclusion from the
    // authority calculation, and both are read through helpers that treat
    // absent as the ordinary case — so a typo does not fail loudly, it silently
    // reads as "official" or "not a terminus" and puts the node back into a
    // ranking it was meant to sit outside.
    if (r.source_kind !== undefined && !SOURCE_KINDS.includes(r.source_kind)) {
      issues.push({
        severity: 'error',
        message:
          `${r.id}: source_kind "${r.source_kind}" is not a SourceKind — ` +
          `one of ${SOURCE_KINDS.join(', ')} (or absent, meaning official)`,
      })
    }
    if (
      r.terminal_reason !== undefined &&
      !TERMINAL_REASONS.includes(r.terminal_reason)
    ) {
      issues.push({
        severity: 'error',
        message:
          `${r.id}: terminal_reason "${r.terminal_reason}" is not a ` +
          `TerminalReason — one of ${TERMINAL_REASONS.join(', ')}`,
      })
    }
    // `Domain` is read by nothing outside types.ts — no filter, no legend, no
    // colour — so an invented tag has no consumer to fail at. This rule is that
    // consumer, and it is the reason the field is checkable at all.
    for (const d of r.domains ?? []) {
      if (!DOMAINS.includes(d)) {
        issues.push({
          severity: 'error',
          message:
            `${r.id}: domain "${d}" is not a Domain — add it to Domain and ` +
            `DOMAINS in src/lib/types.ts, or use an existing tag`,
        })
      }
    }
    // changes_per_year presupposes a publication rate to differ from — it is
    // meaningless on the evergreen shape, so flag that combination too rather
    // than let it silently pass now that releases_per_year can be absent.
    if (r.changes_per_year !== undefined && r.releases_per_year === undefined) {
      issues.push({
        severity: 'error',
        message: `${r.id}: changes_per_year set but releases_per_year is absent (evergreen node) — remove one or the other`,
      })
    }
    // A number cannot move more often than it is published. If it looks like it
    // does, one of the two is wrong — usually the publication rate, which is
    // the easier of the pair to find.
    if (
      r.changes_per_year !== undefined &&
      r.releases_per_year !== undefined &&
      r.changes_per_year > r.releases_per_year
    ) {
      issues.push({
        severity: 'error',
        message: `${r.id}: changes_per_year (${r.changes_per_year}) exceeds releases_per_year (${r.releases_per_year})`,
      })
    }
    // `release_schedule`, added 2026-08-10 with the calendar view. Two more
    // closed unions cast rather than parsed, so the same treatment as the five
    // above — and the dates need checking too, because unlike every other field
    // in this file these are *rendered as claims about the future*. A malformed
    // date does not fail loudly here; it falls out of the calendar silently and
    // reads as "nothing is due", which is the one wrong answer a calendar can
    // give that nobody notices.
    const sched = r.release_schedule
    if (sched) {
      if (!SCHEDULE_KINDS.includes(sched.kind)) {
        issues.push({
          severity: 'error',
          message:
            `${r.id}: release_schedule.kind "${sched.kind}" is not a ` +
            `ScheduleKind — one of ${SCHEDULE_KINDS.join(', ')}`,
        })
      }
      // An empty schedule of any other kind is a research note wearing a data
      // structure — it renders as nothing and asserts nothing, while occupying
      // the field that would otherwise show the report has not been looked at.
      if (sched.kind !== 'irregular' && sched.entries.length === 0) {
        issues.push({
          severity: 'error',
          message: `${r.id}: release_schedule is "${sched.kind}" but carries no entries — use "irregular" with a note if the timing is genuinely unknown`,
        })
      }
      if (sched.kind === 'irregular' && sched.entries.length > 0) {
        issues.push({
          severity: 'error',
          message: `${r.id}: release_schedule is "irregular" but carries ${sched.entries.length} entr(ies) — if dates are known, it is not irregular`,
        })
      }
      // The rule is what makes generated dates auditable. Without it the entries
      // are indistinguishable from `observed-pattern`, but claim to be stronger.
      if (sched.kind === 'stated-rule' && !sched.rule) {
        issues.push({
          severity: 'error',
          message: `${r.id}: release_schedule is "stated-rule" but states no rule`,
        })
      }
      if (
        sched.kind === 'published-calendar' &&
        !sched.source_url &&
        !sched.entries.every((e) => e.evidence_url)
      ) {
        issues.push({
          severity: 'error',
          message: `${r.id}: release_schedule is "published-calendar" but cites no calendar — set source_url, or an evidence_url on every entry`,
        })
      }
      for (const e of sched.entries) {
        if (!SCHEDULE_PRECISIONS.includes(e.precision)) {
          issues.push({
            severity: 'error',
            message:
              `${r.id}: schedule entry precision "${e.precision}" is not a ` +
              `SchedulePrecision — one of ${SCHEDULE_PRECISIONS.join(', ')}`,
          })
        }
        // `YYYY-MM-DD` and nothing else. Date.parse accepts a great deal more
        // than that and normalises some of it wrong across time zones, so the
        // shape is checked by pattern first and only then for realness — a
        // '2026-02-31' passes the pattern and has to be caught separately.
        for (const [field, value] of [
          ['from', e.from],
          ['to', e.to],
        ] as const) {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            issues.push({
              severity: 'error',
              message: `${r.id}: schedule entry ${field} "${value}" is not YYYY-MM-DD`,
            })
          } else if (!isRealDate(value)) {
            issues.push({
              severity: 'error',
              message: `${r.id}: schedule entry ${field} "${value}" is not a real date`,
            })
          }
        }
        if (e.from > e.to) {
          issues.push({
            severity: 'error',
            message: `${r.id}: schedule entry ends before it starts (${e.from} → ${e.to})`,
          })
        }
        // A day-precision window is a contradiction: it claims the day is known
        // and then names several. This is the guard that keeps the rendering
        // honest, since the calendar draws precision as width.
        if (e.precision === 'day' && e.from !== e.to) {
          issues.push({
            severity: 'error',
            message: `${r.id}: schedule entry is "day" precision but spans ${e.from} → ${e.to}`,
          })
        }
        // Inference cannot be laundered into fact by the kind above it. An
        // `observed-pattern` schedule is inferred by definition, so an entry
        // under one that does not say so is mislabelled.
        if (sched.kind === 'observed-pattern' && e.evidence !== 'implied') {
          issues.push({
            severity: 'error',
            message: `${r.id}: schedule entry under "observed-pattern" must be marked implied — the pattern is the inference`,
          })
        }
      }
      // Soonest first, so the calendar and the hover card can take the head of
      // the list as "next" without re-sorting, and so a hand-edited slice that
      // appends a date to the end is caught here rather than rendering as a
      // next release that has already happened.
      for (let i = 1; i < sched.entries.length; i++) {
        if (sched.entries[i].from < sched.entries[i - 1].from) {
          issues.push({
            severity: 'error',
            message: `${r.id}: schedule entries are not in date order (${sched.entries[i - 1].from} then ${sched.entries[i].from})`,
          })
          break
        }
      }
    }
  }

  // Termini. See `terminal_reason` in types.ts. Two rules, and both were fired
  // against doctored data before being trusted — a rule nobody has watched fire
  // is a rule nobody knows works, and a rule that fires on correct data is worse
  // than no rule at all.
  const terminusIds = new Set(reports.filter(isTerminus).map((r) => r.id))
  for (const r of reports) {
    if (!isTerminus(r)) continue
    // A terminus is where the chain stops. If something sits behind it, it is a
    // publisher we have under-described, not a terminus.
    if (!isOfficial(r)) {
      issues.push({
        severity: 'error',
        message: `${r.id}: is both commercial and a terminus — a commercial publisher publishes something, so one of the two is wrong`,
      })
    }
  }
  for (const d of dependencies) {
    if (terminusIds.has(d.source_report_id)) {
      issues.push({
        severity: 'error',
        message: `${d.source_report_id} -> ${d.target_report_id}: a terminus cannot depend on anything — that is what makes it terminal`,
      })
    }
  }

  // Containment. See `part_of` in types.ts — the field is metadata and must
  // stay that way, so everything checkable about it is checked here.
  const container = new Map<string, string>()
  for (const r of reports) {
    if (!r.part_of) continue
    if (!ids.has(r.part_of)) {
      issues.push({
        severity: 'error',
        message: `${r.id}: part_of references unknown report ${r.part_of}`,
      })
      continue
    }
    if (r.part_of === r.id) {
      issues.push({ severity: 'error', message: `${r.id}: part_of points at itself` })
      continue
    }
    container.set(r.id, r.part_of)
  }
  // A containment cycle is not a mutual definitional partner — it is a data
  // error. Two releases cannot each be published inside the other, and the
  // mutual-pair decision explicitly does not extend here, because containment
  // carries no weight and so has no converging quantity to make it safe.
  for (const [id] of container) {
    const walked = new Set<string>([id])
    let cur = container.get(id)
    while (cur) {
      if (walked.has(cur)) {
        issues.push({
          severity: 'error',
          message: `Containment cycle through ${id} — a release cannot be published inside itself`,
        })
        break
      }
      walked.add(cur)
      cur = container.get(cur)
    }
  }

  const seen = new Set<string>()
  for (const d of dependencies) {
    const key = `${d.source_report_id}->${d.target_report_id}`
    // Constraint 3 on `part_of`: containment is not influence. An edge between
    // a node and the release it sits inside says one document is an input to
    // itself, and it is also the shape a `component_of` relationship_type would
    // have taken — which was rejected. Catching it here is what keeps the
    // rejection enforced rather than merely recorded.
    if (
      container.get(d.source_report_id) === d.target_report_id ||
      container.get(d.target_report_id) === d.source_report_id
    ) {
      issues.push({
        severity: 'error',
        message: `Edge ${key} runs between a report and its container — containment is not a dependency`,
      })
    }
    if (!ids.has(d.source_report_id)) {
      issues.push({
        severity: 'error',
        message: `Edge references unknown source: ${d.source_report_id}`,
      })
    }
    if (!ids.has(d.target_report_id)) {
      issues.push({
        severity: 'error',
        message: `Edge references unknown target: ${d.target_report_id}`,
      })
    }
    if (d.source_report_id === d.target_report_id) {
      issues.push({
        severity: 'error',
        message: `Self-referencing edge on ${d.source_report_id}`,
      })
    }
    if (seen.has(key)) {
      issues.push({ severity: 'error', message: `Duplicate edge: ${key}` })
    }
    seen.add(key)
    // The two edge-level unions, added 2026-08-09 (EU/G.74.md); both scanned
    // clean corpus-wide, and guarded anyway because the scan describes one
    // afternoon and the guard describes every afternoon after it.
    //
    // `relationship_type` is the most consequential unchecked value in the
    // schema. It is required, so absent is already a compile error at the call
    // sites that build edges by hand — but a hand-typed JSON slice reaches
    // RELATIONSHIP_WEIGHT unexamined, an off-union key yields `undefined`, the
    // weight becomes NaN, and NaN does not stay local: PageRank iterates over
    // the whole edge set, so one typo poisons every authority score in the
    // graph. Nothing downstream would report it as anything but a ranking that
    // looks odd.
    if (!RELATIONSHIP_TYPES.includes(d.relationship_type)) {
      issues.push({
        severity: 'error',
        message:
          `Edge ${key}: relationship_type "${d.relationship_type}" is not a ` +
          `RelationshipType — one of ${RELATIONSHIP_TYPES.join(', ')}. ` +
          `An unrecognised value has no RELATIONSHIP_WEIGHT entry and would ` +
          `make every authority score NaN`,
      })
    }
    // `evidence` absent means documented, so a typo reads as documented and
    // quietly readmits an edge to the ranking the evidence standard excluded it
    // from — the same silent-inclusion shape as source_kind above.
    if (d.evidence !== undefined && !EVIDENCE_KINDS.includes(d.evidence)) {
      issues.push({
        severity: 'error',
        message:
          `Edge ${key}: evidence "${d.evidence}" is not an EvidenceKind — ` +
          `one of ${EVIDENCE_KINDS.join(', ')} (or absent, meaning documented)`,
      })
    }
    // The implied-edge LAYER was retired on 2026-08-12 (Thomas, round-3 review
    // Q12: implied edges "do not belong here"). The fourteen that existed are
    // preserved as _dropped notes in research/retired-implied-edges.json. This
    // rule is what stops the layer silently regrowing: a belief without a
    // document goes in _dropped; a belief that finds its document gets minted
    // as an ordinary edge with an evidence_url. `EvidenceKind` itself lives on
    // for release_schedule entries, where 'implied' marks an inferred DATE —
    // a different and still-essential use.
    if (d.evidence === 'implied') {
      issues.push({
        severity: 'error',
        message:
          `Edge ${key} is marked implied — the implied-edge layer was retired ` +
          `2026-08-12. Record the belief as a _dropped note (reason ` +
          `'no-document'), or find the document and mint the edge with its ` +
          `evidence_url`,
      })
    }
    if (!d.basis?.trim()) {
      issues.push({
        severity: 'warning',
        message: `Edge ${key} has no stated basis`,
      })
    }
    // An implied edge with an evidence_url is a contradiction: if a document
    // establishes it, it is documented, and the field should say so. This
    // catches the likely drift — someone finds the source and updates the url
    // without updating the kind, leaving a proven edge outside the ranking.
    if (!isDocumented(d) && d.evidence_url) {
      issues.push({
        severity: 'error',
        message: `Edge ${key} is marked implied but carries an evidence_url — promote it to documented`,
      })
    }
    const p = d.reference_period
    if (p) {
      if (p.readings_per_year <= 0) {
        issues.push({
          severity: 'error',
          message: `Edge ${key}: readings_per_year must be positive`,
        })
      }
      if (p.window_months < 0) {
        issues.push({
          severity: 'error',
          message: `Edge ${key}: window_months cannot be negative`,
        })
      }
      if (p.ends !== null && !/^\d{2}-\d{2}$/.test(p.ends)) {
        issues.push({
          severity: 'error',
          message: `Edge ${key}: ends must be MM-DD or null, got "${p.ends}"`,
        })
      }
      // The field is only worth having if it stays traceable to a document.
      if (!p.stated_as?.trim()) {
        issues.push({
          severity: 'warning',
          message: `Edge ${key}: reference_period has no stated_as`,
        })
      }
    }
  }

  // Orphans are not fatal, but in a curated set they usually mean the node was
  // added without thinking about why it belongs.
  const connected = new Set<string>()
  for (const d of dependencies) {
    connected.add(d.source_report_id)
    connected.add(d.target_report_id)
  }
  for (const id of ids) {
    if (!connected.has(id)) {
      issues.push({
        severity: 'warning',
        message: `Report ${id} has no edges in either direction`,
      })
    }
  }

  return issues
}

/**
 * How much of its own authority a report keeps rather than passing upstream,
 * **as a multiple of its total outgoing weight.**
 *
 * Textbook PageRank transfers all of a node's rank along its outgoing edges. On
 * a citation web that is right. Here it produced a specific absurdity: a set of
 * Alberta ministerial guidelines outranked the US Consumer Price Index on two
 * incoming edges, because both assessment rolls that pointed at it had exactly
 * one outgoing edge each and therefore drained everything they had into it.
 *
 * The deeper problem is that out-degree here is a fact about *our research*,
 * not about the world. An assessment roll really rests on the assessment
 * regulations, the quality guidelines, market sales data and more; the graph
 * knows about one of those because one is what has been documented so far.
 * Full transfer lets whichever dependency was researched first inherit an
 * entire node's authority, so the least complete part of the graph produces the
 * loudest result.
 *
 * Retention is a lazy random walk: at each step some of the walk stays put.
 *
 * **Proportional, not fixed — and this changed in V0.8.** It was a fixed 1.0,
 * competing against a total outgoing weight that varies. That made the retained
 * fraction `1 / (1 + outWeight)`, so it was set by how many inputs a report
 * discloses and how strongly, and the consequence was perverse: authority peaked
 * at *exactly one* disclosed input and fell from there, while the weakest
 * available characterisation of that single input was worth 1.9x the strongest.
 * Three of the top four nodes were single-weak-edge reports keeping 66.7% of
 * their rank, against the Consumer Price Index keeping 30.3% for honestly
 * documenting three inputs — which is how the Census outranked it on five
 * incoming edges against thirteen.
 *
 * That was the original sink-leak bug's mirror image. Retention fixed the
 * *receiving* side, where a one-edge node drained everything into its target,
 * and left the *transmitting* side, where having one edge became the optimal
 * position for a node's own score. Both failures have the same cause, stated in
 * the paragraph above: out-degree is a fact about our research. A fixed
 * retention competing with variable outgoing weight reintroduces exactly the
 * dependency it was introduced to remove.
 *
 * Scaling retention *with* outgoing weight removes it. Every report with
 * outgoing edges keeps `SELF_RETENTION / (1 + SELF_RETENTION)` — a flat 50% at
 * 1.0 — no matter how many inputs it discloses or how strongly. Disclosure then
 * changes where a report's authority *goes* without changing how much it keeps,
 * which is the only version of this that does not reward vagueness.
 *
 * Applied only to reports that have outgoing edges, since it is defined as a
 * multiple of a weight they do not have. Giving a true sink a self-loop would
 * let it hoard: with damping at 0.85 a pure sink that keeps everything settles
 * at over five times its inflow, which is the original bug made worse rather
 * than fixed. Sinks keep the even redistribution below. This leaves one small
 * discontinuity at the zero-to-one-edge boundary, which is recorded as accepted
 * in REPORTS.md rather than papered over.
 */
export const SELF_RETENTION = 1.0

/**
 * The fraction of its own rank every report with outgoing edges keeps.
 *
 * Constant by construction now that retention is proportional. Exported so the
 * validator can assert it holds for every such report — the property is the
 * whole point of the change, and a property nothing checks is a property that
 * quietly stops being true.
 */
export const RETAINED_FRACTION = SELF_RETENTION / (1 + SELF_RETENTION)

/**
 * Weighted authority via PageRank over the dependency graph.
 *
 * Edge direction is already correct for this: an edge points from the dependent
 * report to the one it depends on, so rank flows toward the reports that others
 * are built from. A citation from an already-authoritative report therefore
 * carries more weight than one from a peripheral report, which is the whole
 * point of using this rather than a raw count.
 *
 * Dangling nodes (reports that depend on nothing) have their mass redistributed
 * evenly rather than leaked, so the scores stay comparable.
 */
export function pagerank(
  reports: Report[],
  dependencies: Dependency[],
  {
    damping = 0.85,
    iterations = 100,
    tolerance = 1e-9,
    retention = SELF_RETENTION,
  } = {},
): Map<string, number> {
  const n = reports.length
  const ids = reports.map((r) => r.id)
  const index = new Map(ids.map((id, i) => [id, i]))

  // Outgoing weight per node, and the weighted adjacency we iterate over.
  const outWeight = new Array<number>(n).fill(0)
  const incoming: Array<Array<{ from: number; weight: number }>> = Array.from(
    { length: n },
    () => [],
  )

  const hasOutgoing = new Array<boolean>(n).fill(false)

  for (const d of dependencies) {
    const s = index.get(d.source_report_id)
    const t = index.get(d.target_report_id)
    if (s === undefined || t === undefined) continue
    const w = d.strength ?? RELATIONSHIP_WEIGHT[d.relationship_type]
    outWeight[s] += w
    hasOutgoing[s] = true
    incoming[t].push({ from: s, weight: w })
  }

  // Retention scales with each node's outgoing weight rather than being a fixed
  // quantity competing with it, so the retained fraction is the same for every
  // node that discloses anything at all. A fixed retention made the fraction
  // depend on out-degree, which is a fact about our research — see
  // SELF_RETENTION for what that cost.
  const retentionWeight = new Array<number>(n).fill(0)
  for (let i = 0; i < n; i++) {
    if (!hasOutgoing[i]) continue
    retentionWeight[i] = retention * outWeight[i]
    outWeight[i] += retentionWeight[i]
  }

  let rank = new Array<number>(n).fill(1 / n)

  for (let iter = 0; iter < iterations; iter++) {
    const next = new Array<number>(n).fill(0)

    // Mass held by nodes with no outgoing edges, spread evenly.
    let dangling = 0
    for (let i = 0; i < n; i++) {
      if (!hasOutgoing[i]) dangling += rank[i]
    }

    for (let t = 0; t < n; t++) {
      let sum = 0
      for (const { from, weight } of incoming[t]) {
        sum += (rank[from] * weight) / outWeight[from]
      }
      // The share that stayed where it was. Uses the node's own retention
      // weight, which is proportional to its outgoing weight, so this resolves
      // to RETAINED_FRACTION for every node with outgoing edges.
      if (hasOutgoing[t]) sum += (rank[t] * retentionWeight[t]) / outWeight[t]
      next[t] = (1 - damping) / n + damping * (sum + dangling / n)
    }

    let delta = 0
    for (let i = 0; i < n; i++) delta += Math.abs(next[i] - rank[i])
    rank = next
    if (delta < tolerance) break
  }

  return new Map(ids.map((id, i) => [id, rank[i]]))
}

/**
 * Assemble the scored graph. This is the single source of truth for node size:
 * nothing downstream should compute authority itself.
 *
 * **Authority is computed over the documented, official subgraph only.**
 * Commercial sources and every edge incident to one are removed before ranking,
 * as is every implied edge; then the commercial nodes are appended at
 * authority 0.
 *
 * Doing it by subtraction rather than by zeroing them mid-iteration buys a
 * property worth having: the scores are bit-for-bit what they would be if the
 * commercial nodes and implied edges had never been added. So the view toggles
 * that hide them provably reshuffle nothing — no size changes, no rank changes,
 * no re-layout — and the difference between the views is purely what is drawn.
 * That is the whole reason those toggles are safe to offer.
 *
 * For implied edges the property is doing more work than that. If an
 * undocumented edge could move a score, then the ranking would depend on what
 * somebody found plausible, and the evidence standard — the most important rule
 * in the project — would quietly stop being load-bearing. Keeping them out of
 * the maths is what lets them be drawn at all.
 *
 * Degrees are counted over **documented** edges, commercial included. Commercial
 * nodes count because that is a raw fact about the corpus and in_degree is where
 * you read that the entire US used-car CPI hangs off one company. Implied edges
 * do not count, because in_degree sits directly beside `authority` in the hover
 * card and two adjacent numbers computed over different edge sets would be a
 * trap. A node whose only edges are implied honestly reads 0.
 */
export function buildGraph(
  reports: Report[],
  dependencies: Dependency[],
): Graph {
  const inDegree = new Map<string, number>()
  const outDegree = new Map<string, number>()
  for (const r of reports) {
    inDegree.set(r.id, 0)
    outDegree.set(r.id, 0)
  }
  for (const d of dependencies) {
    if (!isDocumented(d)) continue
    inDegree.set(d.target_report_id, (inDegree.get(d.target_report_id) ?? 0) + 1)
    outDegree.set(d.source_report_id, (outDegree.get(d.source_report_id) ?? 0) + 1)
  }

  // `official` is now "official and not a terminus" — see isRanked. The variable
  // keeps its name because every comment and invariant downstream refers to it,
  // and renaming it would make the diff look like a change in the maths when the
  // subtraction is identical in shape: a second node kind joins commercial
  // sources outside the ranking, for the same sink-leak reason.
  const official = reports.filter(isRanked)
  const officialIds = new Set(official.map((r) => r.id))
  const rankedEdges = dependencies.filter(
    (d) =>
      isDocumented(d) &&
      officialIds.has(d.source_report_id) &&
      officialIds.has(d.target_report_id),
  )

  const raw = pagerank(official, rankedEdges)
  const max = Math.max(...raw.values(), Number.EPSILON)
  const authorities = new Map(
    official.map((r) => [r.id, (raw.get(r.id) ?? 0) / max]),
  )

  // Rescale across the observed range — see size_score in types.ts. The range
  // is taken over official nodes only, so a commercial node parked at 0 cannot
  // stretch the scale and shrink everything else.
  const values = [...authorities.values()]
  const lo = Math.min(...values)
  const hi = Math.max(...values)
  const span = hi - lo

  const nodes: ScoredReport[] = reports.map((r) => {
    const authority = authorities.get(r.id)
    return {
      ...r,
      in_degree: inDegree.get(r.id) ?? 0,
      out_degree: outDegree.get(r.id) ?? 0,
      authority: authority ?? 0,
      size_score:
        authority === undefined
          ? 0
          : span > Number.EPSILON
            ? (authority - lo) / span
            : 0.5,
    }
  })

  return {
    nodes,
    edges: dependencies,
    byId: new Map(nodes.map((n) => [n.id, n])),
  }
}

/**
 * The reports published inside this one, one level down. See `part_of`.
 *
 * One level rather than transitively, because the hover card is answering
 * "what else is in this release", and a flattened list would silently merge
 * two different containment depths. Callers that want the full tree can
 * recurse; nothing does yet.
 */
export function contains(graph: Graph, id: string): ScoredReport[] {
  return graph.nodes.filter((r) => r.part_of === id)
}

/**
 * A report's own authority plus that of everything published inside it.
 *
 * **This is a reading aid, not a score, and nothing sizes a node by it.**
 * `authority` stays the node's own throughout, because the moment a rolled-up
 * figure could move a sphere, a curation choice about how finely to split a
 * release would be moving the ranking — which is the same failure as a
 * hand-tuned `strength`.
 *
 * What it is for is that the split is real and invisible. Measured on the one
 * pair in the corpus, the containing release reads 0.4604 against 0.8412
 * merged; a reader with no way to see the containment reads the lower number as
 * the programme's weight and is wrong by nearly half. The sum here is not that
 * 0.8412 either — it is 0.7305, because a true merge also compounds through the
 * upstreams and a sum cannot. So this understates a merge while overstating a
 * bare reading, and it is offered as neither: it is the answer to "how much sits
 * under this masthead", which is a question the graph can answer honestly.
 */
export function rolledUpAuthority(graph: Graph, id: string): number {
  const own = graph.byId.get(id)?.authority ?? 0
  return (
    own + contains(graph, id).reduce((t, c) => t + rolledUpAuthority(graph, c.id), 0)
  )
}

/**
 * Plain-English cadence for a rate expressed as events per year.
 *
 * Has to cope with a range of five thousand to one — a daily exchange rate at
 * 252 and SNA 2008 at 0.05 — which is why the sub-annual end is phrased in
 * years rather than fractions. "0.05× a year" is arithmetic; "about every 20
 * years" is the fact.
 */
export function describeRate(perYear: number): string {
  if (perYear >= 200) return 'every business day'
  if (perYear >= 45) return 'weekly'
  if (perYear >= 11) return 'monthly'
  if (perYear >= 3) return `${Math.round(perYear)}× a year`
  if (perYear >= 1.5) return 'twice a year'
  if (perYear >= 0.9) return 'once a year'
  if (perYear <= 0) return 'irregularly'
  const years = Math.round(1 / perYear)
  return `about every ${years} years`
}

/** Reports that depend on this one. The "who breaks if this changes" list. */
export function dependents(graph: Graph, id: string): ScoredReport[] {
  return graph.edges
    .filter((e) => e.target_report_id === id)
    .map((e) => graph.byId.get(e.source_report_id))
    .filter((r): r is ScoredReport => r !== undefined)
}

/** Reports this one is built from. */
export function dependsOn(graph: Graph, id: string): ScoredReport[] {
  return graph.edges
    .filter((e) => e.source_report_id === id)
    .map((e) => graph.byId.get(e.target_report_id))
    .filter((r): r is ScoredReport => r !== undefined)
}

/**
 * What is known about a report's inputs, beyond the edges that survived.
 *
 * The point of this is to separate two things the graph has always conflated: a
 * node with few inputs because its publisher does not say what it uses, and a
 * node with few inputs because nobody has researched it yet. Both look like a
 * short list. Only one is a fact about the world.
 *
 * The counts are deliberately not collapsed into a single number here. The
 * reason vocabulary in `_dropped` draws distinctions that a lone ratio would
 * throw away, and the card can decide what to show — but it cannot recover a
 * distinction this function has already discarded.
 */
export interface Disclosure {
  /** Outgoing edges the graph can show: documented, with evidence. */
  documented: number
  /**
   * Believed on strong grounds, stated by no document. Outside authority, and
   * counted apart from `documented` because that is what `implied` means.
   */
  implied: number
  /**
   * Inputs searched for where **no document names them**. This is the number
   * that makes a short input list readable as opacity rather than as a research
   * gap — it is the publisher declining to say, recorded.
   */
  undisclosed: number
  /**
   * Real inputs, frequently named outright, that cannot become nodes: the FR
   * 2644 form, W-2 records, an annual report published only through a
   * page-flipping viewer.
   *
   * Kept separate from `undisclosed` because it is the opposite finding. The
   * publisher *did* disclose; the graph is what cannot hold it. Merging the two
   * would blame a source for a limitation on this end.
   */
  unpublishable: number
  /**
   * Relationships a document explicitly denies. Not missing inputs — findings,
   * and among the most valuable in the corpus. Excluded from `ratio` for that
   * reason: a confirmed absence is not a gap.
   */
  denied: number
  /**
   * `no-node-yet` and `deferred` — the two reasons that are leads rather than
   * answers. This is our backlog, not the publisher's opacity, and it is the
   * one count here that says nothing about the source.
   */
  leads: number
  /**
   * `documented / (documented + undisclosed + unpublishable)` — of the inputs
   * known to exist, the share the graph can actually show.
   *
   * **Null unless something was searched for and not found**, which is stricter
   * than "null when the denominator is zero" and is the whole subtlety of the
   * field. Under the looser rule a node with three documented edges and no
   * dropped notes scores 100%, indistinguishable from a node searched hard and
   * found completely forthcoming — so the reading inverts, and a report nobody
   * has examined presents as the most transparent thing on screen.
   *
   * With this rule a non-null ratio always means a search happened and came up
   * short, and the number says by how much. Null means *not asked*. Those are
   * different enough that the card must not render them the same way, and 94 of
   * 121 nodes were on the wrong side of the distinction before it was drawn.
   */
  ratio: number | null
}

/**
 * Disclosure counts for every report, keyed by id.
 *
 * Takes `droppedNotes` as an argument rather than importing the data, keeping
 * this module a pure function of its inputs like `buildGraph` above.
 *
 * Notes whose `source` is null are skipped: they describe something that is not
 * a node, so there is no report whose disclosure they could be about.
 */
export function disclosureByReport(
  reports: Report[],
  dependencies: Dependency[],
  droppedNotes: DroppedNote[],
): Map<string, Disclosure> {
  const out = new Map<string, Disclosure>()
  for (const r of reports) {
    out.set(r.id, {
      documented: 0,
      implied: 0,
      undisclosed: 0,
      unpublishable: 0,
      denied: 0,
      leads: 0,
      ratio: null,
    })
  }

  for (const e of dependencies) {
    const d = out.get(e.source_report_id)
    if (!d) continue
    if (isDocumented(e)) d.documented += 1
    else d.implied += 1
  }

  for (const n of droppedNotes) {
    if (n.source === null) continue
    const d = out.get(n.source)
    if (!d) continue
    switch (n.reason) {
      case 'no-document':
        d.undisclosed += 1
        break
      case 'unpublishable-source':
      case 'unreadable-source':
        d.unpublishable += 1
        break
      case 'denied':
        d.denied += 1
        break
      case 'no-node-yet':
      case 'deferred':
        d.leads += 1
        break
      // `wrong-target` and `wrong-direction` describe an edge that exists
      // elsewhere in the graph, so the input is not missing — it is filed under
      // a different pair. `note` is an observation about the corpus, not an
      // input at all. Neither belongs in any count here.
      case 'wrong-target':
      case 'wrong-direction':
      case 'note':
        break
    }
  }

  for (const d of out.values()) {
    const missing = d.undisclosed + d.unpublishable
    d.ratio = missing === 0 ? null : d.documented / (d.documented + missing)
  }

  return out
}

/**
 * Visual radius from `size_score` (not raw authority — see types.ts).
 *
 * Square root, so a node with four times the score reads as twice the radius
 * rather than four times: area is what the eye actually compares, and linear
 * scaling makes the top node swamp everything.
 *
 * **Floor raised 2.2 → 3.4 on 2026-08-19**, which lifts the smallest node from
 * 27% of the largest to 42%. That is a deliberate loss of resolution in the
 * authority encoding, and it is worth it: authority is *also* carried by glow
 * and by the ordering in the side panel, while the 90% of the corpus that sits
 * near the floor has nothing but its own size. At the sizes this scene
 * actually renders at (see `TARGET_LARGEST_FRACTION` in InfluenceGraph) the
 * old floor put the median node under two pixels across, where a size channel
 * cannot carry anything at all. `max` is unchanged, so the top of the ramp —
 * the part the encoding is really about — is untouched.
 */
export function radiusFor(sizeScore: number, min = 3.4, max = 8): number {
  return min + Math.sqrt(Math.max(0, sizeScore)) * (max - min)
}
