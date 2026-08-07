import type { Dependency, DroppedNote, Relation, Report } from '../lib/types'
import { reports as seedReports } from './reports'
import { dependencies as seedDependencies } from './dependencies'
import albertaMunicipal from './research/alberta-municipal.json'
import populationAndEducation from './research/population-and-education.json'
import internationalStandards from './research/international-standards.json'
import albertaProvincial from './research/alberta-provincial.json'
import grandePrairie from './research/grande-prairie.json'
import countyGrandePrairie from './research/county-grande-prairie.json'
import regionalEducation from './research/regional-education.json'
import usStatisticalInputs from './research/us-statistical-inputs.json'
import bankingSupervision from './research/banking-supervision.json'
import rateTransmission from './research/rate-transmission.json'
import provincialSocialPrograms from './research/provincial-social-programs.json'
import federalCanada from './research/federal-canada.json'
import internationalFrameworks from './research/international-frameworks.json'
import creditAndMortgages from './research/credit-and-mortgages.json'
import usFederalPolicy from './research/us-federal-policy.json'
import structuralBridges from './research/structural-bridges.json'
import albertaEnergy from './research/alberta-energy.json'
import healthFunding from './research/health-funding.json'
import statcanMacroAccounts from './research/statcan-macro-accounts.json'
import equalizationPayrollBase from './research/equalization-payroll-base.json'
import equalizationNamedProducts from './research/equalization-named-products.json'
import fedH15Disclosure from './research/fed-h15-disclosure.json'
import statcanSupplyUseTables from './research/statcan-supply-use-tables.json'
import statcanIppi from './research/statcan-ippi.json'
import ontarioOmpfMpac from './research/ontario-ompf-mpac.json'
import manufacturingAndClassifications from './research/manufacturing-and-classifications.json'
import euDraftBudget from './research/eu-draft-budget.json'
import esa2010 from './research/esa-2010.json'
import deDestatisNationalAccounts from './research/de-destatis-national-accounts.json'
import eurostatFarmStructureSurvey from './research/eurostat-farm-structure-survey.json'
import eurostatHicp from './research/eurostat-hicp.json'
import luStatecCpi from './research/lu-statec-cpi.json'
import eurostatRemunerationUpdateReport from './research/eurostat-remuneration-update-report.json'
import eurostatRemunerationSatelliteSeries from './research/eurostat-remuneration-satellite-series.json'
import eurostatRemunerationMissionExpensesReport from './research/eurostat-remuneration-mission-expenses-report.json'
import eurosystemEcb from './research/eurosystem-ecb.json'
import ecfinBusinessConsumerSurveys from './research/ecfin-business-consumer-surveys.json'
import eurostatEdpGfsEcbStatistics from './research/eurostat-edp-gfs-ecb-statistics.json'
import euMetaDocxBatches from './research/eu-meta-docx-batches.json'
import deBundesbankFinancialAccounts from './research/de-bundesbank-financial-accounts.json'
import deDestatisSourceSurveys from './research/de-destatis-source-surveys.json'
import grokR1 from './research/grok-r1-nordic-nato-fr-oecd.json'
import grokR4 from './research/grok-r4-italy-czechia.json'
import grokR6 from './research/grok-r6-mixed-categories.json'
import grokR7 from './research/grok-r7-eu27-completion.json'
import grokR8 from './research/grok-r8-accession-belt.json'
import grokR3nlpl from './research/grok-r3-netherlands-poland.json'
import nlMunicipalFinance from './research/nl-municipal-finance.json'
import ukLocalGovernmentFinance from './research/uk-local-government-finance.json'
import auGovernmentFinance from './research/au-government-finance.json'
import nzGovernmentFinance from './research/nz-government-finance.json'
import realmGovernmentFinance from './research/realm-government-finance.json'
import associatedStatesGovernmentFinance from './research/associated-states-government-finance.json'
import brFpmPopulation from './research/br-fpm-population.json'
import anzsicIndustryClassification from './research/anzsic-industry-classification.json'
import grokH1Equalization from './research/grok-h1-equalization-named-products.json'
import grokH1Calgary from './research/grok-h1-calgary-municipal.json'
import grokH1Classification from './research/grok-h1-classification-hubs.json'
import grokH1Housing from './research/grok-h1-housing-benefits.json'
import grokH1MunicipalOnQc from './research/grok-h1-municipal-ontario-quebec.json'
import grokH1International from './research/grok-h1-international-reports.json'
import gbUkspfSuccession from './research/gb-ukspf-succession.json'

/**
 * Assembles the graph data from the hand-written seed set plus every research
 * slice.
 *
 * Research arrives incrementally, one JSON file per slice, and slices
 * legitimately reference reports owned by slices that do not exist yet — a
 * municipal budget points at a provincial grant programme researched later.
 * So this loader tolerates dangling edges by dropping them and logging what it
 * dropped, rather than letting one unresolved reference break the render.
 *
 * To add a slice: drop the JSON in `research/`, import it, add it to `slices`.
 */

interface ResearchSlice {
  reports: Report[]
  dependencies: Dependency[]
  /**
   * Dependencies that were looked for and are not here, with the reasoning.
   * Optional because the seed set has none and a slice may legitimately drop
   * nothing. Read rather than ignored as of V0.8 — see `DroppedNote`.
   */
  _dropped?: DroppedNote[]
  /**
   * Documented relationships that are not dependencies — see `Relation`.
   *
   * Optional, and most slices will never have any. Deliberately a separate key
   * from `dependencies` rather than a discriminated member of it, so that no
   * future refactor can accidentally hand one to `buildGraph`.
   */
  relations?: Relation[]
}

const slices: ResearchSlice[] = [
  albertaMunicipal as unknown as ResearchSlice,
  populationAndEducation as unknown as ResearchSlice,
  internationalStandards as unknown as ResearchSlice,
  albertaProvincial as unknown as ResearchSlice,
  grandePrairie as unknown as ResearchSlice,
  countyGrandePrairie as unknown as ResearchSlice,
  regionalEducation as unknown as ResearchSlice,
  usStatisticalInputs as unknown as ResearchSlice,
  bankingSupervision as unknown as ResearchSlice,
  rateTransmission as unknown as ResearchSlice,
  provincialSocialPrograms as unknown as ResearchSlice,
  federalCanada as unknown as ResearchSlice,
  internationalFrameworks as unknown as ResearchSlice,
  creditAndMortgages as unknown as ResearchSlice,
  usFederalPolicy as unknown as ResearchSlice,
  structuralBridges as unknown as ResearchSlice,
  albertaEnergy as unknown as ResearchSlice,
  healthFunding as unknown as ResearchSlice,
  statcanMacroAccounts as unknown as ResearchSlice,
  equalizationPayrollBase as unknown as ResearchSlice,
  equalizationNamedProducts as unknown as ResearchSlice,
  fedH15Disclosure as unknown as ResearchSlice,
  statcanSupplyUseTables as unknown as ResearchSlice,
  statcanIppi as unknown as ResearchSlice,
  ontarioOmpfMpac as unknown as ResearchSlice,
  manufacturingAndClassifications as unknown as ResearchSlice,
  euDraftBudget as unknown as ResearchSlice,
  esa2010 as unknown as ResearchSlice,
  deDestatisNationalAccounts as unknown as ResearchSlice,
  eurostatFarmStructureSurvey as unknown as ResearchSlice,
  eurostatHicp as unknown as ResearchSlice,
  luStatecCpi as unknown as ResearchSlice,
  eurostatRemunerationUpdateReport as unknown as ResearchSlice,
  eurostatRemunerationSatelliteSeries as unknown as ResearchSlice,
  eurostatRemunerationMissionExpensesReport as unknown as ResearchSlice,
  eurosystemEcb as unknown as ResearchSlice,
  ecfinBusinessConsumerSurveys as unknown as ResearchSlice,
  eurostatEdpGfsEcbStatistics as unknown as ResearchSlice,
  euMetaDocxBatches as unknown as ResearchSlice,
  deBundesbankFinancialAccounts as unknown as ResearchSlice,
  deDestatisSourceSurveys as unknown as ResearchSlice,
  grokR1 as unknown as ResearchSlice,
  grokR4 as unknown as ResearchSlice,
  grokR6 as unknown as ResearchSlice,
  grokR7 as unknown as ResearchSlice,
  grokR8 as unknown as ResearchSlice,
  grokR3nlpl as unknown as ResearchSlice,
  nlMunicipalFinance as unknown as ResearchSlice,
  ukLocalGovernmentFinance as unknown as ResearchSlice,
  auGovernmentFinance as unknown as ResearchSlice,
  nzGovernmentFinance as unknown as ResearchSlice,
  realmGovernmentFinance as unknown as ResearchSlice,
  associatedStatesGovernmentFinance as unknown as ResearchSlice,
  brFpmPopulation as unknown as ResearchSlice,
  anzsicIndustryClassification as unknown as ResearchSlice,
  grokH1Equalization as unknown as ResearchSlice,
  grokH1Calgary as unknown as ResearchSlice,
  grokH1Classification as unknown as ResearchSlice,
  grokH1Housing as unknown as ResearchSlice,
  grokH1MunicipalOnQc as unknown as ResearchSlice,
  grokH1International as unknown as ResearchSlice,
  gbUkspfSuccession as unknown as ResearchSlice,
]

function assemble() {
  const reportById = new Map<string, Report>()
  const duplicateIds: string[] = []

  for (const r of seedReports) reportById.set(r.id, r)

  for (const slice of slices) {
    for (const r of slice.reports) {
      if (reportById.has(r.id)) {
        duplicateIds.push(r.id)
        continue // First definition wins; the seed set is authoritative.
      }
      reportById.set(r.id, r)
    }
  }

  const seen = new Set<string>()
  const dependencies: Dependency[] = []
  const dangling: string[] = []
  const duplicateEdges: string[] = []

  // **Later definition wins for edges — the opposite of the rule for reports.**
  //
  // Decided in V0.8 after measuring it. The rule used to be first-wins here too,
  // by analogy with reports, and the analogy was wrong. For reports "first wins,
  // the seed set is authoritative" is a deliberate choice about curation. For
  // edges it was an accident with the wrong sign: the seed edges were written
  // first and are uniformly worse evidenced, so first-wins systematically
  // discarded the better copy.
  //
  // All six duplicates in the corpus resolved the same way — in every one, the
  // losing research copy carried an `evidence_url` and the winning seed copy did
  // not, and three of the seed copies therefore should not have existed at all by
  // this project's own evidence standard. One pair also disagreed on
  // `relationship_type` (`bea-pce -> bls-cpi`, `uses_data_from` in the seed and
  // `calculated_from` in research), so the rule was affecting authority and not
  // only metadata.
  //
  // Reversing it is close to free, which is the argument for doing it rather
  // than deferring it again: it moves 3 of 117 rank positions and leaves the top
  // four untouched. What it buys is structural — under documented-plus-
  // evidence_url only, the graph goes from three components to two and from six
  // orphaned nodes to two.
  //
  // Iterating in reverse and keeping the first hit seen is what makes the last
  // definition win, while `duplicateEdges` still reports the key exactly once
  // per superseded copy.
  const allDependencies = [...seedDependencies, ...slices.flatMap((s) => s.dependencies)]
  for (let i = allDependencies.length - 1; i >= 0; i--) {
    const d = allDependencies[i]
    const key = `${d.source_report_id}->${d.target_report_id}`
    if (seen.has(key)) {
      duplicateEdges.push(key)
      continue
    }
    if (!reportById.has(d.source_report_id) || !reportById.has(d.target_report_id)) {
      dangling.push(key)
      continue
    }
    seen.add(key)
    dependencies.push(d)
  }
  // Restore declaration order so the edge list does not depend on how it was
  // deduplicated. Nothing downstream should care, but a stable order keeps
  // diffs readable and keeps any future ordering bug from being ours.
  dependencies.reverse()

  // **Isolated reports are kept, as of V0.12.** They used to be dropped here,
  // on the reasoning that "a disconnected node carries no information in a
  // dependency graph and only adds clutter". That was wrong, and the cost of it
  // was specific: `fed-h15` is one of the most thoroughly researched nodes in
  // the corpus — every source it names is a reporting form, private transaction
  // data, unnamed banks or a bare agency — and V2.10 calls it the worked example
  // the whole disclosure decision was waiting for. It has never once appeared on
  // screen. Three logs described dropping it as "the evidence standard working".
  // The evidence standard working would be showing it and showing why it is
  // alone.
  //
  // An isolated node is not an absence of information. It is the statement *this
  // programme exists and nothing published names its inputs*, which is exactly
  // the kind of fact this project exists to make visible.
  //
  // Note what did NOT change: dangling edges are still dropped, above. An edge
  // pointing at an id that does not exist is a data error, not an island, and
  // tolerating those is what lets research slices arrive in any order.
  //
  // `isolated` is still reported, because it is a number worth watching — a
  // sweep that adds fifty islands has added territory in the most literal sense.
  const connected = new Set<string>()
  for (const d of dependencies) {
    connected.add(d.source_report_id)
    connected.add(d.target_report_id)
  }
  const orphans: string[] = []
  const reports: Report[] = []
  for (const r of reportById.values()) {
    reports.push(r)
    if (!connected.has(r.id)) orphans.push(r.id)
  }

  // **Relations — non-dependency relationships. See `Relation` in types.ts.**
  //
  // Assembled here rather than in `buildGraph` on purpose: `buildGraph` takes
  // `(reports, dependencies)` and relations are never passed to it, so there is
  // no path from this array to `authority`, `size_score`, degree counts or
  // position. That structural isolation is the whole reason this is a separate
  // list rather than a fifth `RelationshipType`.
  //
  // Same dangling rule as dependencies, and for the same reason: a relation
  // pointing at an id that does not exist is a data error, not an island. It is
  // a strict rule here and it bites — most of the documented `audits` instances
  // in the corpus name an auditor that has no node, and they stay in `_dropped`
  // as `no-node-yet` leads until one is researched.
  //
  // No dedup by `source->target`, unlike dependencies. A pair can legitimately
  // hold both a dependency and a relation — the Niue case is exactly that, where
  // the Auditor-General's report both *uses data from* and *audits* the same
  // financial statements — and two relations of different `relation_type` over
  // the same pair would also be meaningful. Exact duplicates are reported rather
  // than silently dropped.
  const relations: Relation[] = []
  const danglingRelations: string[] = []
  const duplicateRelations: string[] = []
  const seenRelations = new Set<string>()
  for (const slice of slices) {
    for (const rel of slice.relations ?? []) {
      const key = `${rel.source_report_id}-[${rel.relation_type}]->${rel.target_report_id}`
      if (
        !reportById.has(rel.source_report_id) ||
        !reportById.has(rel.target_report_id)
      ) {
        danglingRelations.push(key)
        continue
      }
      if (seenRelations.has(key)) {
        duplicateRelations.push(key)
        continue
      }
      seenRelations.add(key)
      relations.push(rel)
    }
  }

  return {
    reports,
    dependencies,
    relations,
    dangling,
    duplicateIds,
    duplicateEdges,
    orphans,
    danglingRelations,
    duplicateRelations,
  }
}

const assembled = assemble()

export const reports = assembled.reports
export const dependencies = assembled.dependencies

/**
 * Documented relationships that are not dependencies — see `Relation`.
 *
 * Exported separately from `dependencies` and never merged with it. Anything
 * that consumes this must not feed it to `buildGraph`; there is nothing to
 * stop you except that the signature does not accept it, which is the point.
 */
export const relations = assembled.relations

/** What the loader had to discard. Surfaced so it never fails silently. */
export const loadIssues = {
  dangling: assembled.dangling,
  duplicateIds: assembled.duplicateIds,
  /**
   * Edges defined more than once. Not an error — the later definition wins and
   * is normally the better-evidenced one — but worth seeing, because a pair that
   * disagrees on `relationship_type` is changing authority and not just prose.
   */
  duplicateEdges: assembled.duplicateEdges,
  orphans: assembled.orphans,
  /**
   * Relations dropped because one end is not a node. Watch this number: unlike
   * `dangling`, a non-zero value here is not necessarily a typo. The corpus has
   * more documented `audits` instances than it has auditor nodes, and this is
   * where an over-eager conversion of a `_dropped` note would show up.
   */
  danglingRelations: assembled.danglingRelations,
  /** Exact `source-[type]->target` repeats. Reported, not tolerated silently. */
  duplicateRelations: assembled.duplicateRelations,
}

/**
 * Every `_dropped` note across every slice, flattened.
 *
 * Exported so the reasoning stops being write-only. Two documents recommended
 * work that was already done because nothing read this block, and one note
 * contradicted a live edge for several sessions without anything noticing.
 */
export const droppedNotes: DroppedNote[] = slices.flatMap((s) => s._dropped ?? [])
