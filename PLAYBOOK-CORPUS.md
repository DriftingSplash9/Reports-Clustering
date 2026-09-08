# PLAYBOOK-CORPUS.md — the research lane

**Read this with `PLAYBOOK.md`, never instead of it.** The rules that bind
every task whatever it is — git, validate, the generated corpus file, no
deletes, measure before believing — are there, with the test for where a new
paragraph goes. This file is for finding, minting, wiring, quoting and
grading edges; the renderer's rules are in `PLAYBOOK-RENDER.md`.

**Rule numbers are global** (`PLAYBOOK.md` §1): this file holds 3, 10-16 and 19,
and the gaps are rules that live in one of the other two. Rule 17 was retired to
`notes/techniques-2026-09-04.md` on 2026-09-07 for being a recipe rather than a
rule; its number stays retired.

**When a line in this file turns out to be wrong, correct it in place and show
the old wording**, the way `PLAYBOOK-RENDER.md`'s 2026-09-06 review did. A doc
that quietly changes its mind is harder to trust than one that says what it got
wrong, and this file has no sweep of its own except `HANDOFF.md` §4 step 5b.

---

## 2. Standing rules — corpus lane

**3. A pointer is not a source.** WebFetch can fabricate content for a
dead URL — raw-verify before trusting any quote. This applies to a node's own
`description` as much as to a fetched page: a description naming a standard is a
lead to verify, not a citable basis.

**10. A `_dropped` entry describing an edge that DOES exist live must use
`reason: "caveat"` (or `"resolved"`), never any other reason** —
applies to every `DroppedReason`. Before finalizing any `_dropped`
entry, check its exact (source, target) against the WHOLE corpus's
live edges, not just this round's proposals.

**11. Build the id-collision and edge-collision checks from the whole
corpus, not just `src/data/research/*.json`** — some ids/edges live
only in the hand-written seed files (`src/data/reports.ts`,
`src/data/dependencies.ts`).

**And scan for the EVIDENCE URL, not only the (source, target) pair** (round 8).
A URL you are about to mint on may already back live edges from other slices —
six did — and every grader run rewrites that URL's `evidence-cache/` record to
hold only the edges THAT RUN selected. Find them all first and pass them
together to `--edges`, or you silently destroy another edge's windows. One
record was clobbered in round 8 before the collision was noticed.

**12. A dependency edge between a node and its `part_of` container is a
validator ERROR.** Before minting, cross-check every new edge's
(source, target) against the corpus-wide `part_of` map in both
directions; drop matches as a `note`.

**13. A fresh, well-verified finding that contradicts an already-live edge
isn't automatically right.** Caveat the existing edge, defer the new
claim — don't silently override.

**14. Rule 10's mirror image is the one that bites: also check this
round's new EDGES against every OTHER slice's existing `_dropped`
notes.** Minting an edge some earlier round recorded as `no-document`
makes that note a lie, and validate fails on it. Read the older note
before assuming your new edge wins — it may have the better evidence.

**15. A page title is not evidence, and neither is a node description.** Read
the body, not just the title/heading. Round 8's Argentina case is the clean
example: `sdds.indec.gob.ar/nsdp.htm` is 966 bytes of JavaScript shell whose only
mention of the standard is its `<title>`, and that is a `_dropped` lead, not an
A.

**16. Eurostat's national reference metadata is the highest-yield source
for "which standard / which source" questions on an EU/EEA country.** The
filename patterns, the `hi3`/`hi4` split, the §18.1.1 "Weights" section and the
LFS Y/N page all live in `notes/techniques-2026-09-04.md` — they are a recipe and
they rot (FI moved from `hi4` to `hi3` on 2026-09-05), and a stale filename in a
playbook gets trusted where a stale filename in techniques gets re-probed. What
belongs here is only the ranking: **go to Eurostat's national metadata before the
NSI's own site.** There is no government-finance equivalent; for deficit/debt go
to the NSI's own EDP release page.

**19. Stamp every `basis` with WHO IS SPEAKING** (Thomas, 2026-09-07). The first
token of a basis is one of three, followed by a colon:

- **`SELF-DECLARED:`** — the document is published or authored by the SOURCE's own
  statistical system, and says the source follows the target. The strongest kind of
  edge there is: specific to the release, and still true if the target's membership
  list changes. Judge by AUTHORSHIP, not by host — Uzbekistan's own NSDS hosted on
  `documents1.worldbank.org` and Togo's own data portal on `opendataforafrica.org`
  are both self-declared.
- **`REGISTER:`** — the document is published by the TARGET's own publisher and
  records the relationship: a membership table, an adherence page, a press release
  announcing a subscription, a staff report classifying the country. First-party and
  real, but it evidences a MEMBERSHIP, not a methodology.
- **`THIRD-PARTY:`** — neither end published it. Weakest, whatever the quote.

**Why this is not a fourth grade.** `evidence_grade` measures whether the document
was READ and whether it NAMES the artefact — a property of the citation. All three
tiers can and do grade A on the same rules, correctly. What the grade cannot express
is that a register saying "country X is a subscriber" and a national methodology note
saying "this index is compiled under X" are different claims, and only the second is
what `methodology_depends_on` asserts. One greppable token at the head of the basis
separates them for every future round without refetching a single document, and it
changes no schema and no grade.

**Two consequences to act on, not just to know.** Prefer a self-declared document
even when a register would grade the same. And when writing a quote, prefer a
sentence that states a DEPENDENCY over one that states a STATUS: "compiled in
accordance with X" over "is a participant in X" — the round-7 ruling that dropped
six e-GDDS edges turned on exactly that distinction (a membership is not a
dependency), and the tag is what would have made the class visible four rounds
earlier.

**Coverage, so an absent tag is not misread: 172 edges are stamped.** Round 7's 101
tier edges into `imf-e-gdds` / `imf-sdds` / `imf-sdds-plus` (61 REGISTER, 40
SELF-DECLARED, 0 THIRD-PARTY) and round 8's 71 NSDP edges (all SELF-DECLARED).
Everywhere else an unstamped basis means NOT YET CLASSIFIED, never "unknown tier".
Stamp what you touch; nobody should run a corpus-wide stamping pass as a job of its
own. **This number goes stale faster than anything else in the file** — it is the
paragraph §4 step 5b should check first, because "unstamped means not yet
classified" only holds if the reader knows what is stamped.

**What this replaced: nothing, and that is a considered answer** to §1's
say-what-you-would-remove rule. No existing rule covers who authored the evidence,
and the §6 bullets this sits beside are all live.


---


## 6. Known traps

**This section is for traps that change a decision on any corpus task.**
Recipes for a particular job live in `notes/techniques-2026-09-04.md`; which
hosts answered which machine on a given day lives in
`notes/routing-snapshot-2026-09-04.md`, and is expected to be wrong. The
verbatim pre-split §6 — every war story, every dated host reading — is at
`archive/playbook/PLAYBOOK-2026-09-04-1938-pre-split.md`.

**Admission bar, and it is now enforced: a bullet belongs here only if an
agent who never reads it will make a WRONG DECISION, on a task it was not
expecting.** A recipe goes to techniques. A host reading goes to the routing
snapshot. A trap now guarded in code gets one line naming the guard. An
unapplied finding lives in `HANDOFF.md` until Thomas rules on it, and moves
here only as a rule, once.

### Schema and closed unions

- **`RelationshipType` is a closed 5-value union** (`calculated_from` /
  `uses_data_from` / `methodology_depends_on` / `legal_basis` / `cites`).
  *(Corrected 2026-09-06 — this bullet said "4-value" and omitted `legal_basis`
  since the split; `types.ts` is the authority and ~10 live edges, the Japan
  Statistics Act family among them, already use it. An agent trusting the old
  count would have dropped a legitimate statutory edge.)* An off-union value →
  NaN edge weight → NaN PageRank corpus-wide, silent and total. `Relation` is
  only `audits`/`supersedes`. Same for `Domain` and every closed union: check
  `types.ts` before inventing a value, cast rather than parse.
- **`jurisdiction_level` has no "national" value.** The union is
  `international, supranational, federal, provincial, municipal,
  institutional` — a unitary country's national publisher is `"federal"`.
  Passes JSON parsing, fails only at `npm run validate`. Hit 4/4 times on the
  first pass of one round.
- **`reference_period` is a structured `{readings_per_year, window_months,
  ends}` object**, not free text. 11 edges failed validation for this in one
  round.
- **A `report_id`/`candidate_target`-shaped `_dropped` entry has no
  `source`/`target` fields at all** — rule 10 applies to `edge`-shaped entries
  only. Tagging one `"resolved"` makes the validator read `undefined ->
  undefined` and fail. They stay `reason: "note"` permanently; prepend
  "RESOLVED …" to the `note` instead.


### Evidence, quotes and grading

- **`public/corpus-data.json` STRIPS `evidence_quote`**, so an edge read out of
  the generated corpus always looks unquoted. Twelve edges were worked as
  unquoted in one round and already had a quote. Read the slice JSON in
  `src/data/research/` before concluding an edge has none — or before writing
  over one.
- **Take grade counts from `npm run validate`, never from
  `public/corpus-data.json`** — the generated file holds the 347 research
  slices and misses the ~10 edges in the hand-written seed files (rule 11), so
  mixing the two produces a grade line that does not sum to the corpus.
- **`evidence_quote` IS the span — never run it through `extractQuotedSpans`.**
  That helper pulls out DOUBLE-quoted text, which is right for free-text
  `basis` and wrong for a field whose whole content is the quote; for six weeks
  the grader could not read back its own output. Anything checking an edge
  against its document goes through `spansForEdge`.
- **Single quotes are not a span delimiter and most of this corpus quotes with
  them** — deliberately, because apostrophes are ambiguous. An edge whose
  `basis` quotes in single quotes reads as "no quoted span" and caps at B. 476
  live edges were in that state. Look at the `basis` yourself before concluding
  an edge has no checkable evidence.
- **A node's TITLE is a matcher input, not just a label.** `namesTarget` needs a
  contiguous run of ≥60% of the title's words, and the title-lead fallback needs
  ≥3 words before the first dash/comma/colon. A long descriptive title fails
  silently and looks like missing evidence — BIS's six-word page title would
  score 2/6, which is why the node is titled `Basel III`. This does not license
  inventing titles (§7 still holds); it means **check the run arithmetic when a
  publisher offers both a short name and a long one.**
- **`normalizeForMatch` runs NFKD, so Unicode numeral and ligature forms fold to
  ASCII** — `Ⅲ` (U+2162) becomes `III`. Useful, and a trap: `바젤Ⅲ` normalizes to
  the single token `바젤iii`, and since Hangul and Latin are both `\p{L}` there
  is no split for the ≥2-word run rule to use.
- **Bytes that did not come from the cited URL on the live host cannot make an
  A**, however cleanly the edge clears every other bar — §7's archived-copy
  ruling, which every new fetch strategy inherits. A read in Thomas's own
  Chrome IS the cited URL and is not a second route (§7). Record WHICH route in
  the committed evidence record (`via:`).
- **An archived snapshot may rescue a WALL; it must never rescue a 404.** A
  wall says only that this machine could not read it. A 404 says the citation
  has rotted, which is exactly what the dead-URL debt list measures — grading it
  off an archived copy hides link rot behind a good grade.
- **`--write` has NO "improvements only" guard** (2026-09-05): it writes
  whatever the run returns, and §7's "a re-grade never writes a grade DOWN" is
  a process rule, not code. It wrote a B down to C the first time a matcher
  change was tried that day. Before any `--write` on already-graded edges, run
  the OLD code and the NEW code `--offline` on the same store and diff; put
  only the edges that went UP in the write selection.
- **Every grader run rewrites the `evidence-cache/` record of each URL it
  touches — dry run or not — and labels the windows with THAT run's grade, and
  the rewritten record holds ONLY the edges that run selected.** A dry run on a
  held edge leaves a committed record saying "[A …]" beside a slice that says
  B; grading one new edge on a URL that already backs three others leaves a
  record with one window where there were four. Select every live edge on the
  URL (2026-09-05), restore untouched records from the transport zip before
  committing, or run the write pass last.
- **`_dropped` entries come in two shapes**: `source_report_id`/
  `target_report_id`, and `source`/`target` (+ an `edge` string). A collision
  scan that reads only the first misses the second; validate then fails on a
  `no-document` note from an older round (rules 10/14). Read both.
- **A title's parenthetical only counts as its acronym if it abbreviates the
  title head** — `acronymFitsHead()` in `grade-evidence.ts` (2026-09-05).
  "(ESA 2010)" on the 31 "National accounts (ESA 2010)" nodes and "(2016)" on
  the MFSM manual used to name the release for any document that mentioned
  the standard. Foreign-language acronyms on English titles (RPJMN, EICV4) no
  longer count either — that is `title_aliases` territory.
- **The grader's A bar reads presence, not meaning** (found 2026-09-05): it
  awarded A on "Classifications … are *not in conformity* with … ISIC".
  `NEGATED_QUOTE_PATTERNS` (denies / diverges / defers / hedges) now caps such
  quotes at B and `--scan-quotes` lists them without network; but a new
  phrasing the guard has not seen still grades A. Read the quote, not the grade.
- **Your own basis prose can cap your edge.** `WEAK_BASIS_PATTERNS` matches
  anywhere in the basis — "the EH is the *complementary* annual source" turned
  an A into a B twice on 2026-09-05. Never write consistent / complementary /
  comparable / aligned / presumably in a basis, even descriptively.
*(Both bullets lived in `PLAYBOOK-RENDER.md` §6 until 2026-09-06 — filed where
the lane that needs them never reads. Moved, not copied.)*

- **An ASCII substitution for a typographic character makes a stored quote read as
  MISSING, not as a near miss** (found three times in one round, 2026-09-06). The
  Guinea SNDS quote used `'` where the PDF has U+2019; two SOR/2007-303 quotes wrote
  `(x 1,000)` where the regulation has `(× 1,000)`, U+00D7. All three had passed an
  earlier review. Nothing downstream can tell a non-matching quote from an absent
  one, so these look like unquoted edges forever. **When a quote "isn't in the
  document", diff it character by character before concluding anything** — and when
  writing one, copy the span out of the extracted text rather than retyping it.
  Candidates to sweep: any quote containing `(x 1,000)`, a straight apostrophe next
  to a letter, or straight double quotes.

  **The same failure arrives from the reader's side, and it is commoner** (round 8):
  **the grader's html extractor does not decode HTML entities.** A span copied out of
  a correctly rendered page reads `Fund’s` where the stored text holds
  `Fund&rsquo;s`, so the quote returns `partial-quote` at coverage 0.78-0.86 rather
  than absent — near enough to look like a bad quote, far enough to lose the A. Three
  round-8 edges (GE, HU, MA) were re-cut around the entity and all three then matched
  at 1.00. **So when writing a quote, prefer a span with no apostrophe, dash or quote
  mark in it at all** — ending the span before the punctuation is cheaper than
  diffing it afterwards. Watch for U+200B too: one sat invisibly inside Mauritius's
  sentence and would have done the same.

- **A `title_aliases` entry that is a bare product number only reaches the grader
  through the `product-number` path in `namesTarget`** (added 2026-09-06 evening,
  guarded by a selftest). Before it, a one-token alias could never fire — the run
  rule needs two words — and the three round-4b table-number A's were written by
  hand with no grader record. The path is aliases-only, ≥8 characters, ≥2
  hyphen-separated digit groups, word-bounded, and runs only after every other
  door has failed; it can only add matches.

- **A PDF is read THREE ways and the best reading wins** (2026-09-06, Thomas's
  ruling on round 5's matcher finding; guard is `Fetched.alt2Text` and the
  rendering loop at the foot of `gradeEdge`). `pdftotext -layout`, pdf.js, and
  plain `pdftotext` — the last is the only one that rejoins a word the typesetter
  broke across a line with a hyphen, which is why a two-column book's own sentence
  used to grade `partial-quote`. Two things it changes for a round: a PDF's
  committed `evidence-cache/` header now carries `alt2-extractor` /
  `alt2-text-chars`, and **a CACHED `.evidence-fulltext/` record has no third
  rendering at all** — an offline re-grade of the old store sees none of this, so
  `--refetch` is what gets it. Additive by construction: it can only add matches.

- **`namesTarget`'s acronym branch cannot see a mixed-case parenthetical** (found
  round 8, not fixed — it is a matcher change and Thomas's call). The test is
  `/^[\p{Lu}\p{N}][\p{Lu}\p{N}.\- ]*$/`, so `(SDDS)` fires and `(SDDS Plus)` never
  can: the lower-case "lus" disqualifies it. For any node whose acronym carries a
  lower-case word the only door left is a run of ≥60% of the title's words. Twelve
  round-8 edges sit at B on `agency-not-artefact` because the country's page prints
  "SDDS Plus" in its own heading and never writes the words out. **Do not read that
  grade as thin evidence** — check whether this is the cause before spending a round
  re-reading the document.

- **Never edit a `basis` or a quote to move a grade.** If an evidence record is
  graded down by a matcher defect, fix or report the matcher. Trimming the
  record is grade-motivated editing and it hides the defect from everyone after
  you.


### Claims about the world that are really claims about your tools

- **"The sandbox can't read it" and "the site is walled" are different claims,
  and this repo has been conflating them for months.** There are three networks
  and none is a superset of the others (see the routing snapshot). Before
  recording a host as walled, **say which machine you were on** — and re-test
  from the other one, which is a 20-second check.
- **A 404 from a single-page-app route is not link rot.** 58 EDP-inventory edges
  were dropped as DEAD-URL because CIRCABC's `/ui/.../details` pages 404 to curl —
  while Eurostat's own listing still linked every one of them and
  `https://s-circabc.europa.eu/rest/download/<id>` served each PDF (Round C,
  2026-09-05). Before recording a 404 as rot, check whether the host is an SPA
  (an Angular/React shell with the same byte count for every path) and whether a
  first-party page still links the URL; a REST/download endpoint usually exists.
  The Commission documents-register (`api/files/<ref>_0/<id>`) and DCC Tanzania
  (`/api/pages/slug/<slug>`) are the same shape.
- **A "ROBOTS_DISALLOWED" verdict is a statement about the FETCH TOOL, not the
  site.** WebFetch obeys robots.txt; curl with a browser UA does not, and
  neither does a browser. An entire Taiwanese cluster was written off this way
  while being wide open to curl the whole time. Treat every historical "robots"
  note in the corpus as untested.
- **A blocked verdict decays — re-probe before believing your own notes.**
  Routing changed three separate times inside 24 hours during the 2026-09-04
  rounds, in both directions. This is why host readings are in a dated file
  rather than here.
- **WebFetch cannot produce evidence-grade verbatim** — it caps quotes at ~125
  characters and refuses full reproduction. It can establish a negative or
  locate text; a mintable quote needs a real browser or another host carrying
  the same document.
- **The bulk-imported slices of August 2026 carry import habits worth knowing**:
  ids and enum values that were invented rather than read, one jurisdiction's exact
  quote and URL reused as evidence for another — the tell is a quote naming a
  specific *other* place — and the same region minted under different batch names.
  Grep against the FULL corpus (research files AND seed files) before trusting any of
  it. They are data like any other and are verified and graded on the same rules as
  everything else.


---

## 7. Standing decisions — do not re-raise


**Bar for adding to this section: a rule that will change how a FUTURE
round decides something, not a record of one specific edge's fate — the
data's own `_dropped`/live entry is that record.** A one-off single-
node/single-edge call belongs there, not here as its own paragraph.

**Reorganised 2026-09-06** into the three questions the rulings actually
answer, so a round reads the third of this section that binds its question
instead of all of it. Nothing was reworded; four passages were cut where this
section's own bar puts the record in the data, and they are named where they
were removed.

### 7a. What counts as naming the artefact

**Naming the agency is not naming the artefact** (Thomas, 2026-08-31,
ruling on the second audit's F-05). A document that says the figure comes
from "the Department of Commerce", "ISQ", "FCSC" or "the central bank" —
without naming the release — does not clear the evidence bar for an edge to
that agency's *specific* publication. It is a lead: the release still has
to be found by title. Six such edges went to `_dropped` `no-document` that
day and are listed there — this section's own bar says the data is that
record. And REPORTS.md's own
"disclosure stops one level short of a title" note is the reason this is
the normal case, not the rare one. Nothing in the validator can catch it —
the guard is this paragraph and the reviewer.

**Naming an organisation does not name the instrument that created it** (Thomas,
2026-09-05, ruling on the promotion refused in the grader round). The ≥4-character
acronym rule cannot tell the two apart: `gq-inege-anuario-2024` graded A against
`afristat-founding-treaty-1993` on a budget-table row reading "Contribuciones del
Gobierno a AFRISTAT ─ ─ ─ 380", which names the ORGANISATION that the 1993 founding
TREATY brought into being — a membership subscription, not a citation of the treaty
text. The promotion was refused and the edge stays at B. This is the acronym-rule
sibling of "naming the agency is not naming the artefact" and it decides the same
way: a body and the document constituting it are two artefacts, and a document that
names the body has not named the instrument. Nothing in the matcher can catch it —
the acronym is genuinely in the target's own title — so the guard is this paragraph
and the reviewer.

**"Consistent with" is a claim about numbers, not a citation** (Thomas,
2026-08-31, ruling on the second audit's F-03). A basis that says two series
are consistent, aligned or comparable — and quotes no passage — describes
agreement between figures, not a document naming one as the other's input.
38 such edges (28 of them in the Russian regional slices) were moved to
`_dropped` `deferred` as leads, originals preserved in `why`. The shape to
watch for in any bulk import: "X data in national compilations are consistent
with the Y yearbook" — that is the tell.

**An index page is a bare homepage with a path** (Thomas, 2026-08-31,
ruling on the second audit's F-01/F-02). `brics.ibge.gov.br/publicacao.html`
stood behind 23 edges and names no data source; `inegi.org.mx/temas/...`,
Rosstat `folder/<n>` listings are the same class. All 23 went to `_dropped`
`no-document`; `isIndexPage()` in graph.ts now warns on the class (45 more
edges on the day it landed, listed in the validator's EVIDENCE block beside
the bare-homepage count, plus an informational "URLs behind 10+ edges" list —
one URL rubber-stamping dozens of edges is the tell). Same promotion gate as
the other two evidence warnings.

**Assertion-only edges are `_dropped`, never live** (Thomas, 2026-08-31,
ruling 1-A after the audit's D1). An edge whose evidence is a publisher
homepage or nothing, and whose basis quotes no document, is a belief —
463 of them went to `_dropped` `no-document` that day with their
original basis preserved, and the validator's EVIDENCE block counts any
new one. "Probably true" is the reason they were dangerous, not a
defence: on screen they were indistinguishable from verified edges. Three nodes look treaty-shaped but deliberately survived:
`ve-ofac-sanciones` (a `part_of` container — removing it orphans two
other nodes), `tr-eu-trade` (named like a treaty, actually merchandise
trade statistics), `sdmx-standard`/`sna-2025` (statistical standards, not
agreements).

**Chart/figure-caption sourcing clears the evidence bar** (Thomas,
2026-08-30) — a figure-source line under a chart is a citation, same
standing as body-text prose. General ruling for every future round, not
just the edge that prompted it. **Confirmed and made explicit 2026-09-06:
this means grade A, not B.** A round found this paragraph and the
table-cell one below saying different things, graded two edges B on the
later wording, and asked; Thomas: *"i think the caption sourcing is ok and
both can be A's. we need to fix that line for consistency."* His caveat is
the operative half — *"a chart doesn't always mean anything official. i can
make whatever chart I want but it should be sourced to be credible"* — so
what carries the citation is the **source line**, not the chart, and an
unsourced or self-made chart carries nothing. Read the attribution before
grading on it.

**A methodology table cell that names a source is caption-equivalent** (Thomas,
2026-09-06, extending the chart-caption ruling above). A table whose purpose is to
disclose sources discloses them: a cell reading "Scottish share is estimated using the
Living Costs and Food Survey (LCF)" is a citation, and grades **A**, the same as a
figure caption. *(This clause read "grades **B**" until 2026-09-06 evening, which
contradicted the chart-caption ruling it says it extends. Thomas resolved it that day
in favour of A — see that paragraph. "Caption-equivalent" means equivalent, so the two
now move together; if a caption is ever regraded, this moves with it. The correction
lifted 14 live edges from B to A: the 13 SDDS/SDDS Plus methodology-table edges in
`int-imf-dsbb-2026-09-06.json` and `sct-gers -> gb-ons-lcf`.)* This reopened exactly one edge on the day it was ruled
(`sct-gers -> gb-ons-lcf`, where all six LCF mentions in the GERS revenue methodology
are in table cells and none in prose), and a corpus-wide sweep of `_dropped` entries
refused on that shape found only one other candidate, blocked for an unrelated reason.
**It does not reopen agency-only table entries.** The cell has to name the ARTEFACT:
`on-ompf`'s Appendix F attributes five measures to "Statistics Canada" with no
publication named, in a table whose entire purpose is to disclose sources, and that
stays refused. The two rules compose; the weaker one does not dissolve the stronger.

**A statistical agency's own product NUMBER names the artefact** (Thomas,
2026-09-06). A Statistics Canada table number — `36-10-0222-01`, or the legacy
CANSIM form `405-0004` — is not the target's title, so `namesTarget` cannot see
it and the A bar refuses it; but it is a precise, checkable identifier of one
specific release, which is strictly MORE specific than the title and is the exact
thing the agency-not-artefact rule was asking for. Ruled to name the artefact.
Three conditions, and they are what keep this from becoming "any number counts":

1. **The number must be verified against the agency's own product page**, in the
   round that uses it, and the page's title must be the target node's artefact.
   `36-10-0222-01` was checked at `www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3610022201`
   and returns "Gross domestic product, expenditure-based, provincial and
   territorial, annual". A number nobody resolved is a guess.
2. **The mechanism is `title_aliases`**, so the grader can see what the reader
   can. A table number is neither an acronym nor an agency name, so it clears
   that field's rule 3; it is the name the citing documents actually use, so it
   clears rule 2.
3. **A legacy number that the modern table page does not itself acknowledge does
   NOT qualify.** SOR/2007-303 cites "CANSIM table 405-0004, Road motor vehicles,
   registrations"; the current `23-10-0308-01` page shows no former-number
   mapping, so `fiscal-equalization-program -> statcan-vehicle-registrations`
   stays at B. Equating the two would be the researcher's own knowledge, not the
   document's.

Generalises beyond Canada to any agency that numbers its releases and is cited by
number — but each agency's numbering wants its own check against condition 1.

**A nomenclature the document says is BASED ON the target standard names the target**
(Thomas, 2026-09-06, ruling on the `Sistema Armonizado` alias). A methodology that says
its classification rests on a national or bloc nomenclature — Argentina's NCM, Colombia's
NANDINA, Chile's tariff codes — and says in the same breath that the nomenclature is based
on the standard, is citing the standard. The intermediate nomenclature does not break the
chain, and a source line in a glossary or a footnote is a citation like any other source
line (§7a's caption ruling, which this one leans on). Four Spanish-language edges moved on
it: `co-comercio-exterior -> hs`, `co-comercio-exterior -> un-imts-2010`,
`ar-comercio-exterior -> hs` (B to A) and `cl-comercio-exterior -> hs` (C to A, read in
Thomas's Chrome because bcentral.cl is a JS shell to both machines).

**The guard, and it is the whole rule: the DOCUMENT has to state the derivation.** "The
statistics use the NCM" plus the researcher's own knowledge that the NCM derives from the
HS is an inference, and it is refused — that is the agency-not-artefact bar arriving from
a different direction. What moved these four is that each methodology says *basada en el
Sistema Armonizado* / *está basado en el Sistema Armonizado* / *del Sistema Armonizado
vigente* in its own words. Nothing else changes: the standard still has to be NAMED, by
title or by a sourced `title_aliases` entry, and a bare tariff-code reference still names
no artefact.

**A document that names the target artefact IN ANOTHER LANGUAGE names it**
(Thomas, 2026-09-04). `namesTarget()` matches a run of the target's own title
words and every title in this corpus is English, so a French Règlement that
prescribes the HICP by its French name, a Bank of Korea appendix on 바젤Ⅲ, an
NHC yearbook on 国际疾病分类 and Banco Central del Paraguay on the "Sistema de
Cuentas Nacionales del 2008" were all capped at B for the corpus's own
monolingualism. The mechanism is `Report.title_aliases` — read that field's
doc comment before adding one; the three rules there (same artefact not a
related one, sourced from a document actually read, never an acronym or an
agency name) are what stop it becoming a synonym bag. The field earns its
place on the dozen international standards the whole corpus cites in a dozen
languages, not on national releases only ever cited at home.

**A parenthetical acronym from the target's own title names the artefact when
it is four characters or more AND glosses the WHOLE title** (Thomas,
2026-09-04, narrowing the blanket exclusion the dry run wrote). The blanket
exclusion existed for a real reason — `(EDP)` and `(NSW)` matched documents
that named neither artefact — and both of those are THREE characters and both
gloss a component rather than the title, which is what the two conditions are
for. The rule was measured before adoption and it caught its own false
positive on the first run: `pspp-cola-methodology` is "Public Service Pension
Plan (PSPP) Cost-of-Living Adjustment (COLA) Methodology", and an Ontario
release naming the PSPP names the PLAN, not the COLA methodology — the
whole-title condition is what puts that edge back at B where it belongs.

**A node carries the publisher's own title for the artefact, not ours**
(Thomas, 2026-09-04). Six Bolivian department edges sat at B on
`agency-not-artefact` while citing INE's own anuario table, because the node
was titled "Pobreza monetaria por departamento" and INE heads the table
"BOLIVIA: INCIDENCIA DE POBREZA, SEGÚN DEPARTAMENTO". The document WAS the
artefact and the grader could not see it. Retitled to
"Incidencia de pobreza, según departamento (INE)"; all six went to A. When an
edge grades `agency-not-artefact` against a document that is plainly the
target itself, check the node's title against the publisher's before
concluding anything about the evidence.

**The ICLS class is closed: stop re-deriving it** (Thomas, 2026-09-06). Four rounds
have independently found and refused the same edge — a national labour force survey to
`icls-work-statistics-resolution` — because the survey's own documentation says some
version of "in accordance with International Labour Organisation concepts and
definitions" and never names the resolution by title. The UK (2026-09-06), Ireland,
Australia and Northern Ireland (all 2026-09-06) each cost a research pass to reach the
same answer; Australia's is the closest and still generic ("aligns closely with the
standards and guidelines set out in Resolutions of International Conferences of Labour
Statisticians" — plural, no resolution named). **Do not open this again per country.**
If the class is ever to be wired, it is by finding ONE document that names the
resolution and applying the finding as a pattern, not by re-testing the next NSO's LFS
page. The refusals already in the data are the record; adding a fifth is waste. This is
a scope decision, not a new evidence rule: the agency-not-artefact bar is unchanged and
is what refuses them.

**DGDDI's monthly bulletin is closed: ruled dead, do not attempt a fifth round**
(Thomas, 2026-09-08). Four rounds (1, 2, 15's adjacent search, 16) checked six
candidate document classes for something naming DGDDI's monthly "Résultats du
commerce extérieur" bulletin BY TITLE alongside a usage statement — Trésor's own
same-titled annual commentary, Banque de France's annual balance-of-payments report,
two INSEE Note/Point de conjoncture editions, INSEE's Comptes de la Nation chapter and
TEF page, and INSEE's own Note de conjoncture bibliography (which named a DIFFERENT
DGDDI product instead — see round 15's `fr-dgddi-chiffre-commerce-exterieur`, wired
fine). Every one of the six cites the agency ("Douanes / DSECE"), never the titled
monthly release. Same shape as the ICLS ruling above: the refusals already in the data
are the record, and a fifth round is waste. Detail: memory
`round16_fr_dgddi_monthly_still_refused_2026-09-07`.

### 7b. What the route does to the grade

**A backfilled `evidence_quote` needs a reader's acceptance, and the reader
records a reason for every refusal** (Thomas ruled "an agent reviews by slice",
2026-09-03; executed the same day). The grader proposes; it never accepts its
own proposal, because an A that rests on "this script found a sentence it liked,
twice" is not evidence. The accept test is one question — *does this sentence,
in this document, say the source depends on the target?* — and a rejection is
written down with its reason, because the rejections are where the research debt
is measured. Round 4: 213 read, 106 accepted, 107 refused with reasons
(`Claude outputs/quote-backfill-review-2026-09-03.json`). Round 5: 476 read,
370 accepted, 106 refused (`quote-backfill-sq-review-2026-09-03.json`).

**A document read in Thomas's own Chrome grades as the direct read it is; only
an archived snapshot caps at B** (Thomas, 2026-09-04, ruling on the browser
pass). A snapshot says "this quote was in this document on <timestamp>" — a
copy, on a past date. A Chrome read is the cited URL, fetched live over
Thomas's own network, and the only reason the grader could not take it itself
is a JavaScript challenge curl cannot answer: a fact about the fetcher, not
about the document. The rule lives in `routeCapsGrade()` in
`scripts/grade-evidence.ts`, `via` is recorded either way, and the committed
`evidence-cache/` header carries the route, so a reader can always see where
the bytes came from.

**A document read from an archived copy caps at B** (Thomas, 2026-09-03,
ruling on round 3d's fetch strategies). An archived read supports "this quote
was in this document on `<timestamp>`", which is a weaker claim than "this quote
is in this document" — and once a grade is written the difference is invisible
on screen. One `A` must not mean two things. **General rule for every future
fetch strategy, not just the Wayback one**: bytes that did not come from the
cited URL on the live host cannot produce an A, however cleanly the edge clears
every other bar. 15 edges were capped the day it was ruled; the guard sits
after the A bar in `gradeEdge` with its own reason string
(`quote-found-artefact-named-via-snapshot`) so the class stays greppable if the
host ever becomes readable again. Consequence worth knowing: `writeGrades` only
writes `evidence_quote` on an A, so **a machine-written `evidence_quote` in this
corpus always means "found in the live document"**.

**A quote lifted from a PDF that a landing page serves only through a signed,
expiring token is cited to the LANDING PAGE and recorded as
`via: token-pdf <date>`, which caps the grade at B** (Thomas, 2026-09-04,
ruling on the 17 deferred BPS edges). Citing the token cites a URL that is
dead tomorrow; citing the landing page and quoting the PDF puts citation and
quote one step apart. Naming the route is what makes the pair honest, and the
B cap is the same treatment `wayback` gets for the same reason. General rule
for every agency that publishes this way, not just BPS.

**On a NEW edge the grader outranks the hand grade, and the basis says so**
(round 8). Writing a block by hand and then grading it is the normal shape for a
large mint, and the two will disagree: round 8's hand grades were 60 A / 5 B and
`grade-evidence.ts --slice` returned 45 A / 23 B / 3 C over the same 65 edges.
**Take the grader's verdict**, name its reason string in the basis so the downgrade
is auditable, and record a reader's ruling ONLY where its own fetcher failed —
never where it read the document and disagreed with you. The rule below protects an
EARNED grade from a bad network day; this one stops a hand grade being an opinion
that outranks a measurement.

**A re-grade never writes a grade DOWN on a bad network day.** Selecting an
already-graded edge and writing whatever comes back lets one DNS failure or one
Akamai mood destroy a grade earned from a good read. A re-grade pass writes only
improvements; regressions go to a dated JSON for a human, with the host and the
reason (round 4: 33 of them, none written). One refinement from round 5: when
the regression is `quote-not-in-document` on a document the grader **read in
full today**, the network is not the excuse — the quote written that round is
reverted (the field must mean "this span is in the cited document") and the
grade is left as it was. 29 reverted in round 5, listed with the reason.

### 7c. What is and is not a node

**Treaty and agreement nodes: retired, do not re-import** (Thomas,
2026-08-29). 72 nodes removed — bilateral/plurilateral trade agreements,
investment-treaty and bloc-membership framings, multilateral conventions.
Full record and examples: `notes/retired-nodes-2026-08-29.json`. **The
reason is structural, not evidential**: a treaty isn't a publication with
a methodology dependency, no research round could ever wire one — they
were 7% of the corpus and 11% of its isolated nodes, all orphans, no edge
broken. **Closed 2026-08-31 (Thomas, ruling 2-A after the audit's D4):
that sweep removed orphans only, so 31 FTA-family nodes that had edges
survived it — retired the same day with `ar-mercosur`, records in
`notes/retired-nodes-2026-08-31.json`.** The class is now retired in
practice as well as principle. Still nothing in the validator stops a
new one — a title regex is too contaminated to trust (see the meta-node
paragraph below); the guard is this paragraph and the reviewer.

**A node's `publisher` is a body, not a derivation note** (Thomas,
2026-08-31, ruling 3-A after the audit's D7). "Derived from UNICEF and
education monitoring sources", "WHO / national sources", "Derived from
international compilations" name a topic with a figure attached, not a
recurring official release, and no document can ever name a topic as an
input — 62 such nodes retired (`notes/retired-nodes-2026-08-31.json`).
A lazy "X / related" or "X / Y related" string on a real release is a
field to fix, not a node to drop — 166 rewritten to the first-named body
(`notes/publisher-cleanup-2026-08-31.json`). The validator's PUBLISHERS
block prints any new one. Don't mint a node whose publisher you can't
name.

**A legal instrument stays a legitimate node when a statistical release
names it as its own legal/methodological basis** — Japan's Statistics
Act, Brazil's Lei 8.213, the EAEU statistical protocol, national social-
protection acts, the EDP inventories: whole rounds are built on that
family, untouched by the sweep above. The cut is "instrument nobody's
statistics depend on," not "instrument."

**Analytical meta-nodes: 5 retired, sweep deliberately stopped there**
(Thomas, 2026-08-29) — comparison-device/policy-frame nodes with no
publication behind them. **Do not extend this by keyword search: both
obvious signals are contaminated.** "framing" is a verbal tic of the August 2026 import that
also appears in real statistics-node titles ("Statistics and framing of
remittance inflows"). The corpus's own "meta-node" `_notes` phrasing
describes a node's ROLE IN THE GRAPH, not its nature — it lands on the
Okinawa Statistical Yearbook and Taiwan's Energy Statistics Handbook,
both genuine. A title-regex sweep caught 36 candidates, only 5 were real.

**Above all, never sweep the "— high/low-poverty contrast" nodes.** They
read like analytical framings and aren't — they're real subnational
jurisdictions (Ecuadorian/Peruvian/Uruguayan/Paraguayan/Bolivian/Chilean)
that the August 2026 import titled as a poverty-contrast set. They're the bulk of the
unresearched South America seam; deleting them destroys the next round
before it starts.

**A country may carry TWO tier edges, one REGISTER and one SELF-DECLARED** (Thomas,
2026-09-07, ruling on round 8's second question). Twenty-six countries in the NSDP
block have both: an older edge off an institutional node, where the IMF's own
register says the country adheres, and a new one off the country's National Summary
Data Page, where the country's statistical system says so itself. **Both stay.** They
are two different assertions with two different speakers (rule 19), separately
evidenced, and rule 13's don't-silently-override is the reason the second one did not
replace the first when it was minted. Do not open a pass to deduplicate them, and do
not treat a country that has one as already wired for the other.

### 7d. Parked and closed

**Parked.** `diary.csv` moved to `PLAYBOOK.md` (it binds any task, not just corpus
ones). Cadence: 101 of 3,071 edges state when the reading happens; the validator's
CADENCE block is the live number, not this file.

**`proposed:` domain tags: settled 2026-09-06, do not reopen.** 1,080 stripped, 6
promoted to approved `Domain` values, 43 mapped; the complete before/after record —
and the only way back, since there is no git safety net — is
`notes/proposed-tags-retired-2026-09-06.json`. `validate`'s DOMAINS block prints the
live count and has read **46 approved, 0 proposed** since. *(This paragraph described
the question as open, with 624 live tags and a pointer to a `HANDOFF.md` §3 decision,
until 2026-09-07 — three handoffs after it was answered. It is the find that produced
`HANDOFF.md` §4 step 5b.)*

**One-off scope calls, already decided — don't re-raise.** Iran's SNA vintage,
the generic MFSM citation (Vietnam, reversed to wired the next day), PH EBEIS
node-scope, the TW SIPRI direction mismatch and NACE Rev.2 (Türkiye). **Five of the
original six were verified 2026-09-06 to be recorded in the data's own `_dropped` and
live entries**, which this section's bar says is where a single-edge call belongs — so
the reasoning now lives only there, and this line exists to stop the questions being
re-opened. **The sixth, generic COICOP citations (Iran, Iraq), did NOT stay closed.**
Round 24 (2026-09-08) wired Iraq's `iq-cpi -> un-coicop-2018` anyway, off a precedent
set by Morocco's and Tunisia's own CPI-social-protection rounds, without flagging that
it was reopening a call this line already recorded as decided. Reopened, pending a
ruling — Thomas said "revisit" rather than generalise on 2026-09-08; see `HANDOFF.md`
§3 for the live thread. Whoever resolves it should update this line to match the
outcome, not leave both this entry and the live edge disagreeing with each other.
