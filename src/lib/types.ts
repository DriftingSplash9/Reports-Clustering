/**
 * Core data model for the Economic Report Influence Graph.
 *
 * Two entities only: a Report (node) and a Dependency (edge).
 * Everything visual is derived from these plus the computed authority scores.
 * The system does not read report content — only identity, cadence, and citations.
 */

/**
 * Cadence is three quantities, not one, and they live in three places.
 *
 * "How often does this update" turned out to be three different questions:
 *
 * - **Publication rate** — how often the document appears. `releases_per_year`
 *   on the Report. The prime rate is published weekly.
 * - **Change rate** — how often the number actually moves. `changes_per_year`
 *   on the Report, and absent when it is the same as publication. The prime
 *   rate changes only when the Bank of Canada moves, so between zero and eight
 *   times a year.
 * - **Transmission rate** — how often a *dependent* actually reads it.
 *   `reference_period` on the Dependency. AISH reads the CPI once, over the 12
 *   months ending September 30, though the CPI publishes monthly.
 *
 * Transmission is a property of the **edge**, not of either node, which is the
 * part that took a while to see. The same CPI release reaches the Monetary
 * Policy Report every month and the Alberta escalator once a year. No field on
 * the CPI can express that, because it is not a fact about the CPI.
 *
 * There used to be an `update_frequency` enum here — daily / weekly / monthly /
 * quarterly / annual — as a coarse bucket for filtering. It was dropped in V0.6
 * because it had stopped describing the corpus. It disagreed with
 * `releases_per_year` on 15 of 104 researched nodes; 77 of them were filed as
 * "annual", a bucket doing duty for a decennial census (0.1 a year), a
 * generation-scale statistical standard (0.05), and a discretionary municipal
 * count with no cycle at all. More than half the nodes carried a `cadence_note`
 * explaining what the enum had got wrong. A filter dimension that has to be
 * corrected in prose on every second node is not a filter dimension.
 */

/**
 * When a dependent reads its source, where a document states it.
 *
 * This is the transmission rate, and it is what a pulse ought to represent — the
 * pulse stands for influence propagating, and influence propagates when the
 * dependent reads, not when the source publishes.
 *
 * Optional, and absent means unknown rather than continuous. Roughly one edge
 * in six has a documented period; asserting one for the rest would be exactly
 * the kind of plausible-but-unsourced claim the evidence standard exists to
 * keep out.
 */
export interface ReferencePeriod {
  /**
   * Readings per year — how often this edge actually carries anything.
   * 1 for an annual indexation, 12 for a monthly royalty calculation.
   */
  readings_per_year: number
  /**
   * Length of the window each reading averages over, in months.
   * 0 for a single observation at a point in time, such as the July 1
   * population estimate that drives the federal transfers.
   */
  window_months: number
  /**
   * Calendar anchor as `MM-DD` — the day the window closes, or the day the
   * point is observed. Null when a document states a length but no fixed date,
   * as with a rolling three-month average.
   */
  ends: string | null
  /**
   * What the document says, close to verbatim. Plays the same role here that
   * `basis` plays for the edge itself: it is what makes the structured fields
   * auditable instead of merely confident.
   */
  stated_as: string
}

/**
 * Who publishes a report, in terms of scope of authority.
 *
 * This drives colour and node style — never position.
 *
 * An earlier version laid these out as vertical strata, which was wrong on its
 * own terms. There is no real sense in which one release sits above another,
 * and the fiction actively misleads at the edges: international bodies like the
 * IMF and OECD *consume* national statistics, so they are downstream in
 * influence, yet any stack would place them on top — pointing the opposite way
 * to the flow the graph exists to show. Provinces and territories have the same
 * problem in reverse: thirteen peers forced into a rank they do not have.
 *
 * Position now encodes only what the dependency edges say.
 */
/**
 * `supranational` added 2026-08-04 for the EU branch, and it is not a synonym
 * for `international`.
 *
 * The distinction is legal force, and it is the whole reason the EU galaxy is
 * worth building. An `international` body publishes a standard that national
 * systems adopt by choice — SNA 2008, the IMF's BPM6, IPSAS. A `supranational`
 * body legislates: ESA 2010 is Regulation (EU) No 549/2013, and its Annex B
 * transmission programme obliges member states to send named tables by named
 * deadlines. Filing the EU as `international` would erase exactly the property
 * the Canada/US pair was measured to lack.
 */
export type JurisdictionLevel =
  | 'international'
  | 'supranational'
  | 'federal'
  | 'provincial'
  | 'municipal'
  | 'institutional'

/**
 * The same six values at runtime, so they can be checked rather than assumed.
 *
 * `JurisdictionLevel` is a closed union, so the compiler exhausts it everywhere
 * inside the app. But every report enters through a hand-written JSON slice
 * that is *cast*, not parsed, so the compiler never sees the string that was
 * actually typed. That gap let 29 reports carry `"national"` (27 EDP
 * inventories plus one ESS peer-review report) and one carry `"territorial"` —
 * neither a member of this union — sit undetected corpus-wide until
 * 2026-08-09 (`EU/G.73.md`), because nothing but `SCOPE_COLOUR`'s own lookup
 * ever tested the value and a miss there falls back silently to unclassified
 * grey rather than complaining.
 *
 * This is the same failure and the same fix as `isKnownCountry` in palette.ts,
 * whose own comment already says it out loud: opening a field to hand-written
 * strings costs you the compiler, and nothing but an explicit runtime rule
 * stops a typo reaching the renderer.
 */
export const JURISDICTION_LEVELS: readonly JurisdictionLevel[] = [
  'international',
  'supranational',
  'federal',
  'provincial',
  'municipal',
  'institutional',
]

/**
 * Whether a source is an official release or a published commercial one.
 *
 * The scope rule used to say "official reports", which quietly excluded two
 * quite different things. Published-but-not-official sources — J.D. Power,
 * which supplies every used-car and new-vehicle price in the CPI; ICE Brent and
 * Argus Mexico Maya, named verbatim in Alberta's bitumen valuation regulation —
 * recur, have owners, and are named by the documents that depend on them. They
 * are usually paywalled. Never-published sources — the FR 2644 form behind the
 * Fed's H.8, the CIRO repo feed behind CORRA — have no document, no cadence and
 * no url, and stay out entirely.
 *
 * This was never an evidence problem: the BLS Handbook of Methods states
 * plainly that used-car prices come from J.D. Power, which is better documented
 * than many edges already in the graph. The node rule was what failed, so the
 * node rule is what bends.
 *
 * `commercial` nodes are **excluded from the authority calculation** — see
 * buildGraph. A commercial provider is always a terminal sink here, because
 * what it rests on is proprietary, and a sink accruing rank is precisely the
 * shape that caused the sink-leak bug.
 *
 * Absent means `official`. The overwhelming majority of the corpus is official,
 * and a required field would be 118 edits asserting the same thing.
 */
export type SourceKind = 'official' | 'commercial'

/**
 * **The cast-not-parsed gap, and the runtime lists that close it.**
 *
 * Read this once; the five lists below and `JURISDICTION_LEVELS` /
 * `DROPPED_REASONS` elsewhere in this file all exist for the reason stated
 * here, and repeating it six times would be worse than pointing at it.
 *
 * Every closed union in this file looks like the compiler's problem. It is not.
 * Reports, dependencies, relations and dropped notes all enter through
 * hand-written JSON slices that `src/data/index.ts` **casts** — `as Report[]`,
 * not a parse — so the string that was actually typed is never checked against
 * the union it claims to belong to. `tsc --noEmit` passes on a slice full of
 * invented values. Twice now that gap has been measured rather than assumed,
 * and twice it was populated:
 *
 * - `Country`, opened deliberately on 2026-08-04, where the old closed union
 *   had defaulted nine international bodies to Canadian for five sessions;
 * - `JurisdictionLevel` and `DroppedReason` on 2026-08-09 (`EU/G.73.md`), where
 *   29 reports carried `"national"` or `"territorial"` and one dropped note
 *   carried `"duplicate"` — none of the three a member of anything.
 *
 * The remaining five unions were scanned corpus-wide on 2026-08-09
 * (`EU/G.74.md`) and four came back clean; `Domain` had one violation
 * (`"manufacturing"`, on `de-destatis-quarterly-production-survey`). They are
 * guarded anyway, and the reasoning is worth stating because "the scan was
 * clean, skip the guard" is the tempting move: the scan is the expensive half
 * and it only describes the corpus as it stood that afternoon. A guard is four
 * lines and describes it forever.
 *
 * Each union's exposure differs, and the differences are the argument for
 * guarding the quiet ones too:
 *
 * - `RelationshipType` is the loudest. `RELATIONSHIP_WEIGHT[d.relationship_type]`
 *   returns `undefined` on an off-union value, making that edge's weight `NaN`,
 *   and `NaN` propagates through the whole PageRank iteration — every authority
 *   score in the graph, not just that edge's. Silent and total.
 * - `SourceKind`, `TerminalReason` and `EvidenceKind` all decide **exclusion
 *   from the authority calculation**, and all three are read through helpers
 *   (`isOfficial`, `isTerminus`, `isDocumented`) written so that absent means
 *   the ordinary case. A typo therefore reads as "ordinary" and quietly puts a
 *   node or edge back into a ranking it was meant to sit outside — which is the
 *   sink-leak shape those exclusions exist to prevent.
 * - `Domain` is the quietest, and it is the one that turned out to be wrong. It
 *   is read by nothing outside this file — no filter, no legend, no colour — so
 *   an invented value has no consumer to fail at, not even a grey fallback.
 *   That is not a reason to leave it unchecked. It is the reason it was
 *   unchecked.
 * - `RelationType` is checked in `scripts/validate-data.ts` rather than in
 *   `validate()`, because relations deliberately never reach `buildGraph`, and
 *   `validate(reports, dependencies)` has no argument to hand them to. Keeping
 *   it that way is the point — see the `Relation` interface comment.
 */
export const SOURCE_KINDS: readonly SourceKind[] = ['official', 'commercial']

/**
 * Why a dependency chain stops here.
 *
 * Decided in V0.12, and the argument for it is the argument that admitted
 * commercial sources in V0.4: **the node rule was excluding real facts about
 * fragility.** The graph exists to answer "what would break if this changed",
 * and for a whole class of inputs it was answering nothing at all, because the
 * input had no representation. Roughly forty `_dropped` notes recorded inputs
 * that are named, real, load-bearing, and impossible to point at.
 *
 * A node carrying this field is a **terminus**: something a document names as an
 * input, which cannot itself be a node under the ordinary rule, recorded so that
 * the chain visibly ends rather than invisibly stopping.
 *
 * It changes nothing about the evidence standard. A terminus still needs a
 * document naming it, in the source's own words, exactly like an edge. What it
 * relaxes is the *publication* requirement, and the four values are the four
 * distinct reasons that requirement fails:
 *
 * - `unpublishable` — real, named, and not a publication. A remittance form or a
 *   tax record: the CRA PD7 accounts behind SEPH, the GST files behind the
 *   Monthly Survey of Manufacturing, the T1/T2/T3010/T5013 data behind the
 *   annual manufacturing survey, the FR 2644 form behind the Fed's H.8.
 * - `unidentified` — the document names a *slot*, and something outside the
 *   document fills it. Alberta's Bitumen Valuation Methodology Regulation sets
 *   the WCS index from "the commodity brokers specified" in a list the Minister
 *   sets by order. The regulation is precise; the occupant is discretionary, and
 *   that discretion is the finding.
 * - `redistributed` — reached through an intermediary that publishes nothing of
 *   its own. The Bank of Canada reaches BEA data via Haver Analytics. **Prefer
 *   not to use this one yet**: a redistributor is better modelled as a property
 *   of the edge than as a node, and there is exactly one known instance, so the
 *   value exists to be counted rather than to be reached for.
 * - `confidential` — collected and deliberately never released. The CIRO repo
 *   feed behind CORRA, the W-2 records behind the US average wage index.
 *
 * **Excluded from the authority calculation by subtraction**, exactly as
 * commercial nodes are, and for the same reason: a terminus is a sink by
 * definition — nothing published sits behind it — and a sink accruing rank is
 * the shape that caused the sink-leak bug. `npm run validate` asserts the
 * official scores are identical with and without them.
 */
export type TerminalReason =
  | 'unpublishable'
  | 'unidentified'
  | 'redistributed'
  | 'confidential'

/** See the cast-not-parsed note under `SOURCE_KINDS`. */
export const TERMINAL_REASONS: readonly TerminalReason[] = [
  'unpublishable',
  'unidentified',
  'redistributed',
  'confidential',
]

/**
 * National origin of the publisher, as an ISO-3166 alpha-2 code. `INT` covers
 * bodies belonging to no country; `EU` covers the supranational layer itself.
 *
 * Drives the node's rim colour, which is a second channel alongside the fill —
 * fill says publisher scope, rim says whose system it belongs to. Kept separate
 * from `jurisdiction_level` because they answer different questions and
 * genuinely cross: an `international`-level standard is `INT`, but a `federal`
 * release can be either national one, and as the graph grows past Alberta the
 * country axis is what makes the level axis comparable.
 */
export type Country = 'CA' | 'US' | 'INT' | 'EU' | (string & {})

/**
 * **Opened from a closed union to an ISO-3166 alpha-2 code on 2026-08-04**, on
 * Thomas's decision, because the EU branch is the moment the old comment named:
 *
 * > If the corpus ever grows a real third national system, split this then.
 *
 * It grew twenty-eight at once — a supranational layer plus 27 member states —
 * so the union is retired rather than extended. `'CA' | 'US' | 'INT' | 'EU'`
 * survives as a hint list: the `(string & {})` arm keeps editor autocomplete on
 * the four values that carry hand-written palette entries while accepting
 * `'DE'`, `'FR'`, `'IT'` and the rest without a type edit per country. Adding
 * Germany is now a data change, not a schema change, which is the property the
 * China galaxy will need too.
 *
 * **What this costs, stated plainly, because it is a real loss.** The compiler
 * no longer checks that a country has a colour. That check was load-bearing
 * once: the field was typed `'CA' | 'US'` with `'CA'` as the fallback, so every
 * international body in the graph was recorded as Canadian for five sessions and
 * nothing caught it, because nothing rendered the field. The replacement guard
 * is not the type system — it is a `validate-data` rule that errors on any
 * country with no palette entry, backed by `colourForReport` and `rimColourFor`
 * both falling to a flat grey rather than to a family. **If you add a country to
 * the data, add it to `COUNTRY_FAMILY` in palette.ts in the same commit**; the
 * validator will fail the build if you forget, and the node renders as
 * unclassified grey until you do.
 *
 * `INT` keeps its old meaning and is now genuinely narrower: multilateral bodies
 * belonging to no country (the IMF, the BIS, the ILO) and third-country
 * publishers feeding the graph from outside it (ICE Futures Europe, Argus
 * Media). It is no longer the dumping ground for "not North American" — a German
 * release is `'DE'`, and filing it as `INT` is now a bug rather than a shrug.
 */

/**
 * Economic domain tags. Used for filters and the legend, not for node colour.
 *
 * **Correction, 2026-08-09 (`EU/G.74.md`):** the sentence above describes an
 * intention, not the code. `Domain` is imported by nothing — not `filter.ts`,
 * not any legend, not `palette.ts` — so as of this date the field is written
 * on 473 reports and read by no one. Left as written rather than deleted
 * because the intention is presumably still live and the tags are the work
 * already done towards it; recorded here because a field nothing reads is a
 * field nobody checks, which is the sentence `country` earned the hard way and
 * this field then proved a second time. `"manufacturing"` sat on
 * `de-destatis-quarterly-production-survey` undetected until the corpus-wide
 * scan, because there was no consumer for it to fail at — not even the flat
 * grey an unmapped country falls back to. `DOMAINS` below is now that consumer.
 */
export type Domain =
  | 'inflation'
  | 'labour'
  | 'monetary-policy'
  | 'national-accounts'
  | 'benefits'
  | 'interest-rates'
  | 'municipal-finance'
  | 'education'
  | 'post-secondary'
  | 'health'
  | 'fiscal-transfers'
  | 'population'
  | 'taxation'
  | 'assessment'
  | 'energy-royalties'
  | 'banking'
  | 'financial-regulation'
  | 'construction'          // added 2026-08-07 (Thomas): building/construction releases; first customer au-abs-building-approvals
  | 'insurance'             // added 2026-08-08 (Thomas, OPEN-THREADS 0.5): splits off financial-regulation for insurance-specific series; first customers ecb-insurance-corporations-operations, ecb-insurance-corporations-assets-liabilities

/** See the cast-not-parsed note under `SOURCE_KINDS`. */
export const DOMAINS: readonly Domain[] = [
  'inflation',
  'labour',
  'monetary-policy',
  'national-accounts',
  'benefits',
  'interest-rates',
  'municipal-finance',
  'education',
  'post-secondary',
  'health',
  'fiscal-transfers',
  'population',
  'taxation',
  'assessment',
  'energy-royalties',
  'banking',
  'financial-regulation',
  'construction',
  'insurance',
]

/**
 * How one report depends on another.
 * Ordered here from strongest to weakest; see RELATIONSHIP_WEIGHT in graph.ts.
 */
export type RelationshipType =
  | 'calculated_from'        // output is mechanically derived from the target
  | 'uses_data_from'         // target's figures are a direct input
  | 'methodology_depends_on' // target defines a method/deflator the source relies on
  | 'cites'                  // referenced as context, not as a computational input

/**
 * See the cast-not-parsed note under `SOURCE_KINDS`. This is the one of the six
 * whose failure mode is arithmetic rather than cosmetic: an off-union value
 * makes `RELATIONSHIP_WEIGHT[...]` `undefined`, the edge weight `NaN`, and
 * `NaN` spreads through the PageRank iteration to every score in the graph.
 *
 * Deliberately a second list rather than `Object.keys(RELATIONSHIP_WEIGHT)`,
 * which would be shorter and would check nothing: the weights map is typed
 * `Record<RelationshipType, number>`, so deriving the valid set from it makes
 * the guard agree with whatever the map happens to contain instead of with the
 * union. Two lists in one file that `tsc` cross-checks beats one list that is
 * its own authority.
 */
export const RELATIONSHIP_TYPES: readonly RelationshipType[] = [
  'calculated_from',
  'uses_data_from',
  'methodology_depends_on',
  'cites',
]

export interface Report {
  id: string
  title: string
  publisher: string
  /**
   * Where the publisher sits, nationally.
   *
   * `INT` is for bodies that are not any country's — the IMF, the BIS, the ILO,
   * the UN — and for standards published jointly by several of them.
   *
   * That value did not exist until V0.7, and the field was typed `'CA' | 'US'`
   * with `'CA'` used as the fallback, so every international body in the graph
   * was recorded as Canadian. Nine nodes, wrong for five sessions, and
   * invisible the whole time because nothing rendered the field. An attribute
   * nothing reads is an attribute nobody checks.
   */
  country: Country
  /** Scope of publishing authority. Drives node colour and style — never position. */
  jurisdiction_level: JurisdictionLevel
  /**
   * Official release or published commercial source. Absent means official.
   * Commercial sources are outside the authority calculation — see SourceKind.
   */
  source_kind?: SourceKind
  /** Human-readable area, e.g. "Alberta", "Grande Prairie, Alberta", "Canada". */
  region: string
  description: string
  /**
   * **Publication rate** — how often the document appears, per year.
   *
   * Fractional below annual, and deliberately so: the decennial US census is
   * 0.1, SNA 2008 is 0.05, a discretionary municipal census is 0.25. A number
   * can say "once a generation"; a bucket cannot.
   *
   * Optional as of 2026-08-08 (Research.1.md §4). A node is one of two shapes:
   * a recurring publication, which carries this field, or a one-off
   * foundational instrument — a treaty, a trade deal, a piece of government
   * policy or regulation adopted once and never revisited in that form again
   * — which does not. Absent means evergreen, not unknown; do not fill in a
   * guessed rate to satisfy this field. A recast or successor instrument
   * (one that repeals/replaces a named predecessor, which itself had a
   * predecessor) is the recurring shape, not this one — see §4 for how its
   * cadence is derived from the interval between generations.
   */
  releases_per_year?: number
  /**
   * **Change rate** — how often the published number actually moves, per year,
   * where that differs from how often it is published.
   *
   * Absent means the two are the same, which is the ordinary case: the CPI
   * publishes monthly and moves monthly. The prime rate is the case that forced
   * the field — published weekly, changed only when the Bank of Canada moves,
   * so between zero and eight times a year. Fifty-two of those fifty-two
   * publications carry no news.
   */
  changes_per_year?: number
  /** Free text where the numbers still lose something. */
  cadence_note?: string
  /**
   * The id of the release this one is published *inside*, where that is a
   * documented fact and both are legitimately nodes.
   *
   * Decided in V0.11, and decided by measurement rather than argument, because
   * the open question had the sign wrong. REPORTS.md recorded the worry as
   * *double-counting*: `statcan-hfce` is a series inside IMDB record 1901 and
   * `statcan-national-accounts` is that record, so authority accruing to each
   * was thought to inflate one programme's weight.
   *
   * It deflates it. Merging the two and re-ranking gives the combined node
   * **0.8412**, against a split parent of **0.4604** and an arithmetic sum of
   * the parts of **0.7305** — so the release reads at 55% of its rolled-up
   * weight, at rank #6 instead of #2. Splitting divides, and then loses a
   * further 15.2% on top of the division, because rank compounds: a merged node
   * passes more of it upstream and receives more of it back. The upstreams say
   * the same thing from the other side — under the merge `statcan-sut` gains
   * 34.7% and `sna-2008` 16.5%.
   *
   * So the third recorded option, *leave containment implicit and accept the
   * double-count*, was accepting an error whose direction had never been
   * checked, and it is the largest single distortion in the ranking.
   *
   * **`part_of` is metadata and never touches the maths.** It does not affect
   * `authority`, `size_score`, the degree counts, or position. That is the whole
   * reason it is a field on the Report rather than a `component_of`
   * `relationship_type`: `RelationshipType` is defined as *how one report
   * depends on another* and every value of it feeds `RELATIONSHIP_WEIGHT`.
   * Containment is not a dependency, and giving it a weight would convert a
   * bounded 15.2% understatement into an unbounded overstatement — the sink-leak
   * shape again, arriving from a third direction.
   *
   * Three constraints, which are what answer the original objection that this
   * field "invites a hierarchy the position rule forbids rendering":
   *
   * 1. It may group in the hover card and in search. It may never drive
   *    position, size, or authority. The position rule survives intact, because
   *    that rule is about jurisdiction strata being a fiction — containment
   *    between two named releases is not a fiction, it is in the documents.
   * 2. It carries the same evidence burden as an edge. Here both nodes cite
   *    IMDB record 1901 and the child is a series published inside the parent.
   *    A guess about what is "part of" what is as inadmissible as a guessed edge.
   * 3. **A dependency edge between a node and its container is an error**, and
   *    the validator rejects it. One release cannot be an input to itself. That
   *    rule is what stops `component_of` creeping back in wearing a new hat.
   *
   * The rolled-up figure is reported by the validator and shown in the hover
   * card, so the split stays visible rather than becoming a silent correction.
   * A field nothing renders is a field nobody checks: `country` was wrong on
   * nine nodes for five sessions for precisely that reason.
   */
  part_of?: string
  /**
   * Set only on termini — inputs that are named by a document and cannot be a
   * publication. See TerminalReason for the four kinds and the argument.
   *
   * A node carrying this must have no outgoing dependencies: a terminus is
   * where the chain stops, so an input to a terminus is a contradiction, and
   * the validator rejects it. It must also not be `commercial` — the two answer
   * different questions and a node that is both is almost certainly a
   * mis-classified commercial publisher.
   */
  terminal_reason?: TerminalReason
  /**
   * Date of the most recent release. Null across the seed set — not yet wired
   * to any source, and inventing dates would poison the cadence simulation.
   */
  last_updated: string | null
  url: string
  domains: Domain[]
}

/**
 * How well an edge is evidenced.
 *
 * The project rule is documented citations only: if no document says the
 * dependency exists, the edge does not exist. That rule has always been right
 * and has always thrown away real information — the reasoning for every
 * rejected edge went into a `_dropped` block and stayed there as prose,
 * unqueryable and invisible in the graph.
 *
 * `implied` is that information brought back in, quarantined. It means: the
 * relationship is believed on strong grounds, and **no document states it**.
 * Not a guess about mechanism, not a plausible-sounding connection — the
 * standing example is a city's financial statements and the tax rate bylaw
 * that produced the levy they report, where by statute no levy can exist
 * without the bylaw and the statements simply never name it.
 *
 * Implied edges are **excluded from the authority calculation**, exactly like
 * commercial nodes and for the same reason: if they could move a score, then
 * showing them would reshuffle the graph, and the evidence standard would stop
 * being the load-bearing thing it is. They are drawn dashed and default to
 * hidden.
 *
 * The point of having them at all is that the difference between the two views
 * is worth seeing. Documented-only is what the record supports. Both is what is
 * probably true. Implied-only is a map of the research backlog.
 *
 * Absent means `documented`.
 */
export type EvidenceKind = 'documented' | 'implied'

/** See the cast-not-parsed note under `SOURCE_KINDS`. */
export const EVIDENCE_KINDS: readonly EvidenceKind[] = ['documented', 'implied']

export interface Dependency {
  /** The report doing the referencing. */
  source_report_id: string
  /** The report being referenced or depended upon. Authority accrues here. */
  target_report_id: string
  relationship_type: RelationshipType
  /**
   * Documented or implied. Absent means documented — see EvidenceKind.
   * An implied edge carries no `evidence_url`, because there is none. That is
   * what makes it implied.
   */
  evidence?: EvidenceKind
  /** Optional manual override of the weight implied by relationship_type. */
  strength?: number
  /** Why this edge is believed to exist. Keeps the set auditable. */
  basis: string
  /**
   * **Transmission rate** — when the source report actually reads the target,
   * where a document states it. See ReferencePeriod.
   *
   * Backfilled in V0.6 from periods already stated in `basis` prose. Absent
   * means no document read so far says when the reading happens, not that the
   * dependency is continuous.
   */
  reference_period?: ReferencePeriod
  /**
   * URL of the document that establishes the dependency — a statute, funding
   * formula, methodology annex, or a report stating its own inputs.
   *
   * The project standard is documented links only: if no document says the
   * dependency exists, the edge does not get created. This field is what makes
   * that standard checkable rather than a promise.
   */
  evidence_url?: string
}

/**
 * **A documented relationship between two reports that is not a dependency.**
 *
 * Added 2026-08-06, deciding a question `EU/G.49.md` opened on 2026-08-04 and
 * `NZ/G.2.md` reopened with six more instances. The full argument, the evidence
 * and the four options costed are in
 * `notes/SCHEMA-DECISION-relationship-types.md`; this is the option that was
 * chosen and the reasoning worth having inline is below.
 *
 * **Why this is not a fifth `RelationshipType`.** The same reason `part_of` is a
 * field on `Report` rather than a `component_of` relationship type, and the
 * argument is worth restating because it is the second time it has decided a
 * schema question. `RelationshipType` is defined as *how one report depends on
 * another*, and every value of it feeds `RELATIONSHIP_WEIGHT`. Assurance is not
 * a dependency: an auditor's signature does not make the audited statements
 * derive from anything the auditor publishes, and the arrow arguably points the
 * wrong way for authority flow, since the audit office gains standing from
 * signing while the statements gain no content from the audit office.
 * Succession is not a dependency either — it is a fact about time, not content.
 * Adding either to `RelationshipType` would require putting a number in
 * `RELATIONSHIP_WEIGHT` that nobody can defend, and `Record<RelationshipType,
 * number>` makes that unavoidable rather than optional. A parallel list has no
 * weight to invent.
 *
 * **The isolation is structural, not a convention.** `buildGraph()` takes
 * `(reports, dependencies)`. Relations are never passed to it, so they cannot
 * reach `pagerank`, `authority`, `size_score`, `in_degree`, `out_degree` or
 * position. This is stronger than the `implied` edge mechanism, which keeps
 * unweighted edges in the same array and filters them out at four separate call
 * sites; here there is no call site to forget.
 *
 * **What a relation is for.** Six documented instances arrived from one research
 * pass and could not be recorded, and the most valuable single finding of that
 * pass — that New Zealand exports *the auditor* to two Realm jurisdictions while
 * the United States exports *the method* to three Compact states — existed only
 * as prose in a `_dropped` note. That is the failure this fixes: a relationship
 * that is documented, verbatim-quotable and structurally interesting had nowhere
 * to live except a field whose name means "we looked for an edge and there
 * isn't one".
 */
export type RelationType =
  /**
   * The source report's figures are assured by the target body's published
   * opinion, or the target instrument installs the auditor.
   *
   * Two shapes worth distinguishing in `basis` rather than in the type, because
   * the distinction is the finding and a type cannot carry it: *export of
   * institution*, where a foreign audit office personally signs (Niue, Tokelau),
   * and *export of method only*, where a private firm audits under a foreign
   * country's standards while the jurisdiction keeps its own audit office (FSM,
   * Marshall Islands, Palau).
   */
  | 'audits'
  /**
   * The source replaces the target in time — a programme, fund or framework
   * succeeding another. The UK Shared Prosperity Fund succeeding EU structural
   * funds is the case that raised it.
   */
  | 'supersedes'

/**
 * See the cast-not-parsed note under `SOURCE_KINDS`. Checked in
 * `scripts/validate-data.ts` rather than in `validate()`: relations never reach
 * `buildGraph`, so `validate(reports, dependencies)` has nowhere to receive
 * them, and adding a third parameter to let it would weaken the structural
 * isolation this type's own comment argues for.
 */
export const RELATION_TYPES: readonly RelationType[] = ['audits', 'supersedes']

/**
 * A non-dependency relationship. Same shape as `Dependency` minus everything
 * that exists to serve the ranking: no `strength`, no `evidence`, no
 * `reference_period`.
 *
 * `evidence_url` and `basis` are both required and neither is optional, which is
 * deliberate and stricter than `Dependency`. A relation buys none of the
 * project's authority maths, so the only thing justifying its presence in the
 * corpus is that a document says it. There is no `implied` relation and there
 * should not be one.
 */
export interface Relation {
  /** The report the relationship is asserted *about*. */
  source_report_id: string
  /** The body or report at the other end. */
  target_report_id: string
  relation_type: RelationType
  /** Why this relation is believed to exist. Quote the instrument verbatim. */
  basis: string
  /** The document that establishes it. Required — see the interface comment. */
  evidence_url: string
}

/** A report with its computed scores attached. Produced by buildGraph(). */
export interface ScoredReport extends Report {
  /** Raw count of incoming edges. Kept as a sanity check against `authority`. */
  in_degree: number
  /** Raw count of outgoing edges. Never affects size. */
  out_degree: number
  /**
   * Weighted authority (PageRank over the dependency graph, edge weights from
   * relationship_type). Normalised so the highest-authority node scores 1.
   * This is the number shown to the user.
   *
   * Exactly 0 for commercial sources, which sit outside the calculation. That
   * is a statement that the question was not asked of them, not a claim that
   * nothing depends on them — J.D. Power has the entire US used-car CPI
   * hanging off it. `in_degree` is where you read that.
   */
  authority: number
  /**
   * Authority rescaled across the observed range so the least authoritative
   * node sits at 0 and the most at 1. This is what drives node size.
   *
   * PageRank has a floor — every node gets a baseline share regardless of
   * whether anything depends on it — so raw authority only spanned 0.20 to
   * 1.00 on the seed set, which is a radius ratio of under 2×. Far too subtle
   * to read at a glance. Rescaling spends the whole visual range on the part
   * that varies.
   */
  size_score: number
}

export interface Graph {
  nodes: ScoredReport[]
  edges: Dependency[]
  byId: Map<string, ScoredReport>
}

/**
 * Why a dependency that was looked for is not in the graph.
 *
 * Every research slice carries a `_dropped` block, and until V0.8 it was prose
 * in a JSON array that nothing read. That had a cost: entries were never removed
 * when the edge was later built, so `BACKLOG.md` and V0.7 both recommended
 * researching an edge that already existed, and one entry rejected an edge on
 * evidence grounds while that same edge sat in the graph marked documented.
 *
 * Structuring it is what makes the *disclosure ratio* computable — how many of a
 * report's inputs are documented against how many were searched for and not
 * found. That ratio is the honest answer to "is this node under-researched or is
 * its publisher simply opaque", and the denominator has been sitting here in
 * prose the whole time.
 *
 * A `_dropped` entry is not a scrap heap entry. Documented non-dependencies are
 * worth as much as edges — BLS stating that the CPI item structure does *not*
 * correspond to NAICS is a finding, and recording it is what stops the same
 * plausible-but-unsourced edge being proposed every few sessions.
 */
export interface DroppedNote {
  /** Human-readable original, e.g. `bls-cpi -> naics`. Never parsed. */
  edge: string
  /**
   * The dependent report, where it exists as a node. `null` means the thing that
   * would depend on the target is not itself a published release in the graph —
   * variable-rate mortgage pricing being the standing example.
   */
  source: string | null
  /**
   * The report that would be depended upon, where it exists as a node. `null`
   * means there is nothing to point at: either not researched yet, or not a
   * publishable release at all.
   */
  target: string | null
  reason: DroppedReason
  /** The reasoning. This is the valuable part and is never abbreviated. */
  why: string
}

/**
 * Ordered roughly from "the world says no" to "we have not looked yet", which is
 * also roughly from most to least valuable as a finding.
 *
 * The distinction that matters most is between the first six and the last two.
 * `no-node-yet` and `deferred` are **research leads** — the evidence is described
 * as existing and something is simply missing. The rest are answers.
 */
export type DroppedReason =
  /** A document explicitly states the relationship does not hold. */
  | 'denied'
  /** Searched; no document states it. The evidence standard doing its job. */
  | 'no-document'
  /** Real dependency, but on a different release than the one proposed. */
  | 'wrong-target'
  /** Real relationship, running the opposite way. */
  | 'wrong-direction'
  /**
   * The input is real and often named by name, but is not a published recurring
   * release, so no node can exist for it. The FR 2644 form behind the Fed's H.8,
   * the CIRO repo feed behind CORRA, the W-2 records behind the US wage index.
   */
  | 'unpublishable-source'
  /**
   * Published but not machine-readable — the Issuu case, where annual reports
   * exist publicly with no text-extractable copy anywhere. Public and unreadable
   * at once, and a corpus fact rather than bad luck.
   */
  | 'unreadable-source'
  /** Documented, but one endpoint has not been researched as a node. A lead. */
  | 'no-node-yet'
  /** Deliberately out of a slice's scope, and described as real. A lead. */
  | 'deferred'
  /** Not a dropped edge at all — an observation about the corpus. */
  | 'note'
  /**
   * Also not a dropped edge: an annotation ON a minted edge — an unresolved
   * discrepancy, a supersession story, a remap explanation. Decided
   * 2026-08-07 (was NZ/G.4 cheap check 5). Unlike every other reason, a
   * caveat's source/target MUST name a real edge; the validator checks that
   * the edge exists, where for a plain `note` an existing edge is an error.
   * Before this existed, caveats faked null endpoints to pass validation,
   * which lost the one thing that made them findable.
   */
  | 'caveat'
  /**
   * A lead that was later worked and closed, kept rather than deleted so the
   * slice's own history survives. Decided 2026-08-09 (`EU/G.73.md`), on
   * exactly the precedent `caveat` set two days earlier, and for the same
   * reason: the corpus already had the shape and was faking a different reason
   * to carry it.
   *
   * The Block B `_dropped` sweep (closed `EU/G.68.md`) did not delete the
   * entries it resolved. It rewrote each one in place — a `RESOLVED <date>`
   * preamble naming the node minted and the edge wired, then `Original entry
   * follows` and the untouched original text — because, in one entry's own
   * words, that is "recorded as resolved rather than deleted so this file's
   * own history is complete". That convention is right and worth keeping: the
   * original blocker is the most useful thing in a resolved lead, since it
   * says what a future session would otherwise re-derive.
   *
   * It also left 20 notes whose `source`/`target` now name a live edge, which
   * is an error for every reason except `caveat` — so the sweep's own output
   * failed the validator from `G.72.md`'s first successful run onward, with
   * neither of the two remedies the validator offers ("resolve or delete")
   * being the right one. Overloading `caveat` would have worked mechanically
   * and lied semantically: a caveat is an *unresolved* discrepancy on a minted
   * edge, and these are the exact opposite.
   *
   * Like `caveat`, and unlike every other reason: a `resolved` note's
   * source/target MUST name a real edge. That is what makes it checkable — if
   * the edge it claims to have wired is not there, the claim is false.
   */
  | 'resolved'

/**
 * Every reason at runtime, for the same reason `JURISDICTION_LEVELS` exists:
 * the union is closed but the slices are cast, so nothing checked the string
 * that was actually typed. One `_dropped` entry sat on `"duplicate"` — a value
 * this union has never had — and the validator counted it happily under its own
 * per-reason tally, printing `1  duplicate` as though it were a category
 * (found and fixed 2026-08-09, `EU/G.73.md`).
 */
export const DROPPED_REASONS: readonly DroppedReason[] = [
  'denied',
  'no-document',
  'wrong-target',
  'wrong-direction',
  'unpublishable-source',
  'unreadable-source',
  'no-node-yet',
  'deferred',
  'note',
  'caveat',
  'resolved',
]

/** The reasons that are research leads rather than answers. */
export const DROPPED_LEAD_REASONS: readonly DroppedReason[] = ['no-node-yet', 'deferred']
