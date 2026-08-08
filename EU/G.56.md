# G.56.md — EU galaxy hand-off

Date: 2026-08-08
Governing briefs: `Research.1.md` — **read in full this session, and edited**
(§1 corpus counts, §4 sweep scoping, §6 domains, §8 new Item 4a, §9 EU
registry replaced wholesale). `G.53.md`, `G.52.md` and `G.55.md` read in
full. `planning/MISSION-TODO-2.md` read in full.
Predecessor: `G.55.md` (2026-08-08, same day).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only, not "just to check". `G.54.md` exists entirely
   to explain why: git here, reached over the device bridge, cannot delete
   its own `index.lock` when a command finishes, so any git command an
   agent runs leaves a fresh stale lock and blocks Thomas's next commit in
   GitHub Desktop. If you need to know what is staged, committed or pushed,
   **ask Thomas** — he sees it instantly in GitHub Desktop. This session ran
   none and hit no lock problems. It is now also `Research.1.md` §2 and
   `planning/MISSION-TODO-2.md` P0 item 5.
2. **Read `planning/OPEN-THREADS_2026-08-08.md` before anything else.** New
   this session, written because the thread count outgrew what anyone could
   hold in their head: a flat census of **all 51 open threads**, grouped by
   who can do them and sized XS–XL, with a closing list of what is *not*
   open so nobody reopens it. `MISSION-TODO-2.md` keeps the full reasoning
   and the stable item numbers; OPEN-THREADS is the index you read to pick
   something up.
3. **Thomas's current focus is housecleaning** (his instruction, this
   session). That is block A below, and OPEN-THREADS §1 — fourteen items, of
   which the first four are correctness and the rest tidiness. Item 1.1 is a
   real data-integrity finding, not tidying.
4. **`npm run validate` is green** as of 2026-08-08 — the first clean run
   since the schema change three sessions ago. It cannot be run by an agent
   (esbuild win32/linux native-binary mismatch through the device bridge;
   environment, not code). Thomas runs it on Windows; the full output is
   committed as `validator-2026-08-08.txt`. Stop repeating the "nobody has
   had a clean validate" caveat — it is discharged.
5. **`EU-open-questions_2026-08-08.docx` came back.** All fourteen answers
   are recorded in `notes/Decisions-2026-08-08_EU-open-questions.md`, which
   is what to read; the docx is the raw form. **Do not re-derive any of
   them.** And read Finding 6 before acting on them — the three proposal
   files they review no longer exist.
6. **Sweep junk to `_to_delete/` on sight, without asking** — Thomas's
   standing instruction, 2026-08-08: "if you just make a habit of sweeping to
   the to delete folder I will dump it now and then so you stop looking at
   that crap." Agents cannot delete on this machine at all (the bridge allows
   write and move, not delete), which is why the folder exists. It is
   gitignored, so moving a *tracked* file there registers as a deletion in
   git — the intended effect. **Log every sweep with a dated entry in
   `notes/sweep-log.md`, including what you deliberately did not sweep and
   why** — not inside `_to_delete/`, which he empties (he emptied it within
   minutes of the first sweep, taking the log with it). Relocate research material to the right folder rather than sweeping
   it, and never sweep his personal files.
7. `G.55.md` is still the substantive predecessor for the ESS quality slice;
   `G.52.md` is where the node rule changed; `G.51.md` is the last
   spec-conforming hand-off and the source of the spec block at the end of
   this file.

## Session conditions — read this first

A **housekeeping, scoping and record-keeping session.** No new nodes, no new
edges, **no file under `src/data/` was touched at all.** The corpus is
byte-identical to what `G.55.md` left, and the validator run confirming it
green was made against exactly that state.

Read in full this session: `Research.1.md`, `EU/G.53.md`, `EU/G.52.md`,
`planning/MISSION-TODO-2.md`, `planning/MISSION-TODO.md`,
`src/data/research/ess-quality-framework.json`, `package.json`,
`run.bat`/`setup-and-run.bat`, `scripts/handoff-to-json.py`'s spec section,
`EU/G.51.md`'s spec block, `validator-2026-08-08.txt`, and
`notes/EU-open-questions_2026-08-08.docx`. `G.55.md` arrived in the starting
prompt. **Not read**: `REPORTS.md`, `BACKLOG.md`, `rolling-todo.md` beyond
head and tail, the staging blob, the prose-verification results file, any
branch file outside `EU/`.

**One retrieval route was new and needed the user's browser.** The Catalogue
of ESS standards is only published as a SKOS dataset in ShowVoc, whose API
rejects GET on every data service, so it was read by running SPARQL POSTs
from inside a real browser session on `showvoc.op.europa.eu`. Full recipe in
Finding 2. One tab, opened and closed.

**Two counts in this file come from Thomas's own machine, not from an agent**:
the validator output, and the fact that the work is committed. Both are
stated as his report, not as an agent's observation.

## Headline result

**The branch's bookkeeping was further out of date than any single file
admitted, and one instance of it was a data-integrity problem rather than
tidying.** §9's EU registry was 21 ids stale after being flagged twice
without action; `Research.1.md` §1 was quoting a corpus 60% of its real
size; `MISSION-TODO-2.md` was 9 nodes behind and **contradicts itself about
EUR-Lex twice in the same file on the same date**; and
`EU/slices/eu-level/esa2010-quality-reporting.json` has silently diverged
from its canonical twin, missing a node and an edge that `G.53.md` added to
one copy only. All are now either fixed or listed with a named owner.

Set against that: the validator is **green**, for the first time since the
schema change — so the corpus itself is sound and it was only the paperwork
that had rotted.

## Findings

### 1. §9's EU/Europe id registry regenerated in one pass: 105 → 126 ids

Replaced wholesale, not patched, per §9's own instruction. Method unchanged
from the 2026-08-05 pass: every `"id"` from every report object in
`src/data/research/*.json` whose `country` is `EU`, an EU-27 code, or an
`XEU` code, plus the four branch-minted `INT` ids. **21 were missing; none
of the 105 was wrong or retired**, so the change is purely additive.
Cross-check: 67 research files on disk, 67 imported in `src/data/index.ts`,
nothing missing either way, no duplicate id across files.

Two judgement calls were **surfaced rather than decided**, which is the
whole reason this list keeps drifting:

- `dk-pris-og-loenforudsaetninger` and `gl-selvstyrelov` are `country: "DK"`
  and belong to the Greenland block-grant chain in the associated-states
  slice — SAO-galaxy work that the country filter catches anyway. Left in,
  because the filter *is* the definition and hand-exceptions are how the
  list drifted the first time.
- `sdmx-glossary` is `country: "INT"` and was minted by an EU-branch slice,
  which is the argument that puts `oecd-icio` on the list. **Not added.**
  Extending a hand-written list of four is a judgement, not an extraction.
  Same question, weaker, for `hs`, `imf-weo`, `imf-fiscal-monitor` and
  `oecd-economic-outlook` in the `grok-h1-*` files. Answering it once makes
  every future regeneration mechanical.

### 2. The Catalogue of ESS standards: scoped, 12 members, nothing minted

Full record: `EU/CatalogueOfESSStandards_scoping_2026-08-08.md`.

**It is not a document and not a webpage list.** CROS says only that "The
Catalogue of ESS Standards is currently hosted on ShowVoc" and links out.
ShowVoc is a JavaScript app over a SKOS dataset whose Semantic Turkey API
answers GET with `HttpRequestMethodNotSupportedException: Request method
'GET' is not supported` on every data service — so no plain HTTP client can
read it. Read instead by POSTing SPARQL from inside a browser page:

```
fetch('/semanticturkey/it.uniroma2.art.semanticturkey/st-core-services/SPARQL/evaluateQuery',
  {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'},
   body:new URLSearchParams({ctx_project:'ESTAT_Catalogue_of_ESS_Standards', query:'<SPARQL>'}),
   credentials:'include'})
```

`Projects/listProjects` and `Projects/getProjectInfo` *are* GET-able and are
how you find the project name and base URI (`http://data.europa.eu/9jo/statmanuals/`).
**This belongs in `Research.1.md` §7's list of EU retrieval findings**,
alongside EUR-Lex's browser-gating and the "Expand all" lazy-loading note:
*a named EU collection may exist only as a SKOS dataset behind a POST-only
API.*

The scheme's own `dct:description`, verbatim:

> "The Catalogue of ESS Standards is a collection of normative documents
> (referred to as “standards”), established by consensus among ESS members
> and approved by the ESSC according to the procedure of ESS
> standardisation. The Standards listed in the catalogue are not legally
> binding but merely intended to provide rules, guidelines, or
> characteristics for the development, production, and dissemination of
> European Statistics for common and repeated use by several actors in the
> ESS."

`versionInfo` **2022**, `modified` 2026-01-19. **Exactly 12 members, and it
has been 12 for at least four years** — EFGS 2022: "It currently contains 12
standards", and the live dataset returns 12 `skos:Concept`s in August 2026.
A small near-static register, not a growing series.

**The catalogue itself should not be a node**, on the reasoning already
applied to the ESS Quality Glossary: a SKOS dataset in a vocabulary register
with a `versionInfo` is not a standalone document. It is a finding aid for
nodes.

Ten of the twelve are unexamined. Best candidates, in order: the **European
business statistics methodological manual for business registers (2021)** —
sits directly on the unread EBS Regulation thread; **ESS guidelines on
seasonal adjustment**, where the catalogue is itself out of date (a 2024
edition exists, `ks-gq-24-012`, 13 June 2024, giving a confirmed 2015→2024
interval and `releases_per_year` ≈0.11 on the irregular-cadence rule — a
2009 first edition is plausible and was **not** verified, do not assert it);
**temporal disaggregation guidelines**; the **precision/variance handbook**
(note: issued 2013, ESSC-approved 2017, only one edition found); **Methodology
for data validation 2.0**. Then `INT` territory: **GSBPM 5.1** (UNECE) and
**ISCED 2011** (UNESCO), both classification hubs and therefore subject to
§7's counter-intuitive rule — research them from the programmes coded to
them, never by reading them. **EDAMIS** is a transmission system, not a
publication: the same call already made for the ESS Metadata Handler.

### 3. The branch believed it had covered four catalogue members. It has covered two.

`ess-quality-framework.json` holds six nodes, and its own `_dropped` entry
says "none of the catalogue's members other than the [three] minted here
have ever been looked at". **Only two of the six are catalogue members** —
`ess-handbook-quality-metadata-reports` and `ess-sims`. The **European
Statistics Code of Practice**, the **ESS Quality Assurance Framework**, the
**ESS QPI Guidelines** and the **SDMX Glossary** are *not* in the Catalogue
of ESS standards. So the EHQMR's "included in the Catalogue of ESS
standards" line points at a set the branch has barely touched: 10 of 12
unexamined, not 8 or 9.

### 4. The catalogue asserts one usable-shaped relationship, and it is the wrong speaker

`SIMS 2.0` carries `eli:based_on http://data.europa.eu/eli/reg/2009/223/oj` —
Regulation (EC) No 223/2009, **already a node** (`eu-reg-223-2009`, and at
weighted authority rank #2 overall). Right shape for
`ess-sims -> eu-reg-223-2009`. **Not proposed**, because the statement is
made by the catalogue's metadata, not by SIMS about itself, and the slice
already records SIMS's own Article 12 claim as future-tense and unusable
(`Research.1.md` §5b running forwards). A present-tense statement in SIMS
2.0 itself, or on Eurostat's live quality-reporting page, would settle it —
that is the exact route that already worked once for this pair of documents.
The only other relation in the dataset is `coos:informs`, which points at
GSBPM *phases*, not documents. No edges there.

### 5. The validator is green, and it scopes the sweep better than any hand-off has

Run by Thomas on Windows, 2026-08-08, output committed as
`validator-2026-08-08.txt`. **Zero `✗`. All eight behavioural checks pass**:
commercial sources and termini provably move no rank; showing implied edges
reshuffles nothing; every `caveat` names an edge that exists and no `note`
describes an edge that now exists; every relation carries both `basis` and
`evidence_url`; relations provably never reach `buildGraph`; and the
retention check holds at exactly 50%.

**Real corpus size: 372 reports / 436 dependencies / 3 relations.**
`MISSION-TODO-2.md` claimed 363/429 and `Research.1.md` §1 still quoted
150/220. Both corrected.

**The DROPPED section is the sweep's actual work-list**: 391 dropped
entries, of which **122 "are research leads rather than answers — evidence
described as existing, node or pass missing."** By reason: 112 `note`, 87
`no-node-yet`, 72 `no-document`, 35 `deferred`, 29 `unpublishable-source`,
24 `denied`, 16 `wrong-target`, 10 `caveat`, 4 `wrong-direction`, 2
`unreadable-source`. Start on `no-node-yet` (the category the loosened node
rule most directly unblocks) and `no-document` (the category §4's third
lesson says is least trustworthy on its stated reason). **Re-running the
validator after the sweep is the measure of whether it worked.** Folded into
`Research.1.md` §4 and MISSION-TODO-2 item 4a.

Also: **all 25 warnings are "no edges in either direction"** — see Finding 8.

### 6. `G.52.md`'s three proposal files no longer exist. Fourteen answers now review nothing.

`G.52.md` wrote them to that session's `/tmp/eu-proposal/` and said plainly
they would need re-creating "since `/tmp` doesn't persist across sessions."
They were never committed and are not on disk anywhere under the project
(searched 2026-08-08). `GROK-PROMPT-9` and `GROK-PROMPT-10` are likewise
absent from `EU/prompts/`.

So Thomas's answers are **rulings without artefacts**. Smaller loss than it
sounds for File C, which he held pending verification anyway and which was
entirely Grok-sourced. A real loss for Files A and B: the Wayback-corroborated
German cadence figures and the Luxembourg/Netherlands colophon finding
(`Publications Office of the European Union` / `ISBN 978-92-` prefix = a
hosted copy of Eurostat's report, not a national document) survive only as
prose in `G.52.md` and in
`EU/cheap-checks-9z-9a-9b_2026-08-07.md`.

**Standing rule this earns: a draft that is not in the repo does not exist.**
Write proposals to `EU/proposals/` on the device, even unreviewed. An
unimported file in the working tree costs nothing; a lost one costs a
session.

Two of his answers also needed narrowing rather than executing, and both are
recorded in the decisions file:
- **A1** ("2 dated nodes") quietly conflicts with how the cadence was
  derived — ≈0.1/yr was the *interval between* the two editions, a property
  of the pair. Split into two nodes and each needs its own
  `releases_per_year` justification.
- **B2** ("yes" to the Ireland → `esa-2010` edge) is approved in principle
  but gated by B1 and by its own evidence: only Ireland's title page was
  ever opened, so the methodology section must be read first. "Yes" is not a
  licence to mint on Germany's parallel.
- **B3** was left blank in the docx, but `G.53.md` records the verbal
  answer: `cites` is correct, matching existing precedent. Treated as
  closed; do not re-ask.

### 7. A mirror slice has silently diverged from its canonical copy

`EU/slices/eu-level/esa2010-quality-reporting.json` is missing
`eu-reg-2016-2304` and one dependency that
`src/data/research/esa2010-quality-reporting.json` has. `G.53.md` edited the
canonical copy and did not mirror it — and `G.55.md`, which *did* mirror its
own edit and said so, gave no reason to suspect the sibling file had not
been.

Audited all four mirror files: **2 identical, 1 diverged, 1**
(`_staging/01-manifest.json`) **has no canonical twin by design.** Only
`src/data/research/` is loaded by `src/data/index.ts`, so **the graph is
correct and the validator is right to be green** — the mirror is what is
stale. But a future session reading `EU/slices/` would draw a wrong
conclusion about the corpus.

**The underlying problem is that no policy says which copy is authoritative
and nothing enforces either answer.** That is a decision, not a fix: either
`EU/slices/*` is a live mirror that must be kept in sync (and then the
validator or a script should check it), or it is a historical staging record
that should stop being updated and say so at the top of each file.

### 8. The isolated-node warnings contain one real model disagreement

Of the 25, most are simply nodes minted without edges yet — including **all
four ECB series `G.53.md` added**, which currently contribute nothing to the
graph and are cheap inbound-edge follow-ups. But `gb-ukspf-prospectus` and
`eu-esif-common-provisions-regulation` are joined to each other by the
corpus's only `supersedes` relation and *still* report "no edges in either
direction" — while the same run separately confirms "✓ relations never reach
buildGraph".

Both statements are correct and both are by design (`Research.1.md` §6:
relations buy no authority maths). But the shelving logic and the relation
model disagree about what "connected" means, and that is now the **second**
instance of MISSION-TODO-2 item 21 rather than a new bug. Folded in as item
23b.

## Secondary observations (logged, low priority)

- **`G.52`–`G.55` have no JSON sidecars.** `EU/` has `G.50.json` and
  `G.51.json` and then stops. `python3 scripts/handoff-to-json.py` with no
  arguments rebuilds everything and is idempotent — but item 19's parser bug
  means the output needs checking rather than assuming.
- **`G.52`–`G.55` also drifted off the hand-off spec**, dropping both the
  nine required section headings and the "copy this whole section verbatim
  into every successor" spec block — which is precisely the failure the
  spec's own rationale ("so the chain never depends on one file surviving")
  was written against. `G.51.md` is the last conforming file. This file
  restores the block. Nothing gets rewritten backwards; the rule is never
  edit a predecessor.
- **The validator's 350 `?` lines are not warnings.** They are "Rank
  disagreements of 4+ places (inspect these edges)" — informational, and a
  genuinely interesting reading list about where weighted authority and raw
  in-degree part company.
- **A numeric coincidence worth disarming**: `G.53.md` said 391 dropped
  entries had never been read (416 total minus 25 read). The 2026-08-08
  validator reports 391 dropped entries *in total*. The two 391s are
  unrelated. Anyone comparing them will conclude the two sources agree when
  they do not.
- Root-directory clutter — **found and cleared the same session.** Swept to
  `_to_delete/`: `SEC05.pdf` (verified byte-identical to
  `EU/sources/SEC05.pdf` by md5; the root copy was the stray) and both
  `session-2026-08-07-*.bundle` git bundles from before the repo was
  published, referenced by nothing. The Word lock file
  `~$-open-questions_2026-08-08.docx` was in `notes/`, not the root, and
  `.gitignore`'s `~$*` meant it had never been committed. **Relocated rather
  than swept**: the 30 MB `germany-national-inventory-report-nir-2026…pdf`
  → `EU/sources/`, because it is a UNFCCC greenhouse-gas National Inventory
  Report and plausible future material for the emissions chain in its EU
  form. That also removes the clone-size penalty for the outside readers the
  repo was made public for. `diary.csv`, `country afrikans.docx` and
  `notes/country.docx` are Thomas's own files and were left alone.
- `MISSION-TODO-2.md`'s numbering now runs `4a, 4b, … 9z, 9z, … 23b, 23a`.
  Harmless to read, annoying to cite.

## Corrections to prior sessions

1. **`ess-quality-framework.json`'s own `_dropped` entry, and the
   after-`G.55` starting prompt — OVERSTATED.** Both say the catalogue's
   members "other than the [three/four] minted here" are unexamined,
   implying most of the slice's nodes are catalogue members. Only **two of
   six** are. Corrected in Finding 3; the `_dropped` entry itself was **not**
   edited, because no `src/data/` file was touched this session — the next
   session to open that file should fix the wording.
2. **`planning/MISSION-TODO-2.md` — SELF-CONTRADICTORY, unresolved.** P1
   item 5(d): "**EUR-Lex works again** … both the legal-content and ELI
   forms return HTTP 200 with full text." Standing method notes, same file,
   same date: "**EUR-Lex no longer works in a browser either** … Chrome
   silently redirects every legal-content and ELI form to
   `eur-lex.europa.eu/TodayOJ`." One is wrong and a session will lose time
   to it. **Not resolved here** — it needs one fetch, and this session had
   no EUR-Lex work to hang it on. Logged as OPEN-THREADS 1.3.
   (`Research.1.md` §7 sides with "reachable via a real browser".)
3. **`planning/MISSION-TODO-2.md` corpus counts — STALE, now fixed.** Said
   363/429; actual 372/436/3.
4. **`Research.1.md` §1 corpus counts — STALE, now fixed.** Said 150/220 as
   of `G.39.md`; rewritten to give the measured 2026-08-08 figure and keep
   the 150/220 sentence as dated history.
5. **`START-HERE.md` — STALE, not fixed.** Says "335 reports and 392
   dependencies". It is the document written for outside readers of a public
   repo, so it is the worst place for a stale number. Left for the
   housecleaning block rather than edited mid-session. `REPORTS.md`'s
   121/122/133-node figures are dated narrative about past states and are
   fine as history.
6. **`G.53.md`'s closing advice — NOW FORBIDDEN.** It tells a fresh agent to
   "run `git status` and check for `.git/index.lock` … first". `G.54.md`
   established that doing so *creates* the problem, and `Research.1.md` §2
   now forbids it outright. The predecessor is not edited; this is the
   correction of record.
7. **`EU/slices/eu-level/esa2010-quality-reporting.json` — DIVERGED.** See
   Finding 7. Not repaired this session, deliberately: repairing it without
   first deciding whether the mirror is authoritative would just re-create
   the same ambiguity.

## Thomas's stated priority for the remaining work

**A — Housecleaning.** His explicit instruction this session, and the
reason `planning/OPEN-THREADS_2026-08-08.md` exists: "there is begining to be
so many threads to work on that i am losing track." Fourteen items in
OPEN-THREADS §1. **1.1–1.4 are correctness, do them first**: the diverged
mirror slice (with the policy decision behind it), `START-HERE.md`'s stale
public-facing count, the EUR-Lex self-contradiction, and the four missing
sidecars. The rest is tidiness: the sidecar-script parser bug, the spec
drift, §9's AU/NZ halves, `EU/proposals/`, root clutter, superseded planning
files, ragged numbering, stale `notes/*.docx`, the duplicate staging batches,
and the legacy `.docx` hand-offs.

**B — The corpus-wide `_dropped` sweep.** His 2026-08-08 ruling: "its
worth a dedicated sweep next before going further" — ahead of new countries
and ahead of block E. 122 real leads out of 391 entries. File-by-file, full
arrays, **no keyword pass**. Scoping in `Research.1.md` §4 and MISSION-TODO-2
item 4a.

**C — Rebuild proposal Files A and B** to the rulings in
`notes/Decisions-2026-08-08_EU-open-questions.md`. File A: EDP inventory as
two dated nodes, 'ESA 95' flagged only. File B: Germany only. Both drafts
are gone (Finding 6). File C stays **held pending a verification pass**, with
three approved follow-ups (NDICI's other absorbed instruments, CAP's
second-order predecessors, `eu-reg-2017-1601`'s title) and one closed dead
end (FP6 — do not reopen).

**D — The prose-section verification results, unimported since 2026-08-07.** `EU/prose-verification-RESULTS_2026-08-07.md`: 395 of 399
entries verified word-for-word, 0 mismatches, gated on Thomas's review by the
standing review-gate decision. **This is the largest block of finished,
verified, unused work in the project**, and it has now waited two days
without being mentioned in a hand-off's priority list. Naming it here so it
stops being invisible.

**E — The eight unexamined Catalogue of ESS standards members.**
Scoped this session, nothing minted; order and traps in Finding 2 and in
`EU/CatalogueOfESSStandards_scoping_2026-08-08.md`. Explicitly **after**
block B, per his sweep-first ruling.

**F — The staging blob's remaining 47 batches (46 distinct).** Read
the manifest by `scope` *and* by `batch_id`/`strand`; 47–62 look unlabelled
and are not. **Batch 46 is the genuinely unlabelled one and the most
expensive item in the backlog** — 29 peer-review records with no url, no
location, no names, all needing re-fetching. Do it last.

**G — The other branches and beyond-Europe.** AU's second council and
the Victorian valuation chain; Grok XI items 25/27/28 (Chile's SII avalúo
fiscal first, Crown Dependencies first within item 27), still
`not_attempted` across three sessions; Europe's depth-pass leftovers
(Norway's municipal årsregnskap, the Dutch Kadaster/BRK node, the UK
`_dropped` leads).

**No longer needed:** the "nobody has had a clean `npm run validate`" item,
discharged 2026-08-08 (Finding 5). The §9 EU-registry backfill, done
(Finding 1). The ESS QPI / Quality Glossary / DESAP candidate, closed by
`G.55.md`. FP6 behind FP7, closed by Thomas.

## Cheap checks still outstanding

Ordered by value per unit effort. Full list with sizes in OPEN-THREADS §3.

1. **Inbound edges for the four isolated ECB series** `G.53.md` minted. They
   are nodes contributing nothing to the graph; the ECB Data Portal pages
   were already open once.
2. **A present-tense source for `ess-sims -> eu-reg-223-2009`.** Finding 4
   has the exact shape and the exact reason the catalogue's own assertion is
   not enough.
3. **One EUR-Lex fetch** to settle Correction 2. Cheapest correctness win on
   the list.
4. Re-anchor `au-abs-seifa -> au-abs-census` to ABS's own SEIFA methodology
   page (one fetch).
5. Tasmania methodology → `au-lgfa-act-1995` (one targeted quote).
6. NZSIOC → `anzsic` mint (one page).
7. NZ s 106(2C) current-consolidation **content** check.
8. OAG long-term-plan observations from `ao.parliament.nz`.
9. Puerto Rico: Census SLGF mint, Planning Board forecasts, June-2026
   revised fiscal plan.
10. Tourism Research Australia cadence; ARIA+ citable home; NSW Grants
    Commission manual (then a proper `NOT FOUND` with search strings).
11. **Dated, September 2026**: when the 2026-27 VLGGC edition appears, check
    whether the Vicmap road-data transition happened.

## What to pass at the start of next thread

The next agent has filesystem access via the device bridge, so this is an
index of what matters rather than a packing list.

1. **`planning/OPEN-THREADS_2026-08-08.md`** — read first. All 51 threads,
   sized, with owners, and a closing list of what is settled.
2. **This file**, then `G.55.md`, then `G.52.md` if a rule question comes up.
   `G.51.md` only if the hand-off spec itself is in question.
3. **`Research.1.md`** — §2 for the git prohibition, §4 for the node rule
   and the sweep scoping, §6 for the schema and the domain-tag state, §9 for
   the regenerated id registry.
4. **`notes/Decisions-2026-08-08_EU-open-questions.md`** — the fourteen
   answers and what each now blocks. Never re-derive these.
5. **`validator-2026-08-08.txt`** — the green run, and the only trustworthy
   source for corpus counts and for the `_dropped` breakdown.
6. **`EU/CatalogueOfESSStandards_scoping_2026-08-08.md`** — if picking up
   block E.
7. **`planning/MISSION-TODO-2.md`** — the reasoning and the stable item
   numbers behind everything in OPEN-THREADS.
8. Two things only Thomas can do: the stuck commits / `.git` lock cleanup,
   and running `npm run validate` (which he now has a `validate.bat` for).
   **Ask him; never look.**

---

# How to write the next hand-off

**Added 2026-08-04. Copy this whole section verbatim into every successor**, so
the chain never depends on one file surviving. It is the spec, not an example —
the file you are reading is the worked example.

When Thomas says *"write the next handoff"*, *"write the next G file"*, *"wrap
this thread up"* or anything close, this is what he is asking for. Do not ask
which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the highest-numbered
  `G.*` file in `EU/`. Check the folder — the sequence has gaps (there is no
  G.01, G.06, G.10, G.12, G.14, G.16, G.17 as `.md`) and some predecessors are
  `.docx`. **Take the highest number, not the count.**
- **Write it as `.md`**, plain text, in `EU/`. Earlier files are `.docx`; that
  was the chat workflow's doing, not a preference.
- **Then write the JSON sidecar.** Every hand-off has a machine-readable twin at
  `EU/G.<n>.json`. Do not hand-write it — run:

  ```
  python3 scripts/handoff-to-json.py EU/G.<n>.md
  ```

  The Markdown stays the document of record; the JSON is a structured index of
  it (date, predecessor, findings, corrections, priorities, cheap checks, and
  which required sections are missing). It exists so branch state can be read
  without parsing prose, and so a future session can diff two hand-offs.
  `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar;
  `--check` reports which are stale without writing. **If you are ever unsure
  whether the sidecar is current, just re-run it — it is idempotent.**
- **Never edit a predecessor.** Corrections to earlier sessions go in this
  file's *Corrections* section, where they are dated and attributable. The one
  exception is this spec block, which is copied forward unchanged.

## Required structure, in this order

```
# G.<n>.md — EU galaxy hand-off

Date: YYYY-MM-DD
Governing briefs: <which, and whether you actually saw them>
Predecessor: G.<n-1>.md (date)

## Orientation — if you are a new agent, start here
## Session conditions — read this first
## Headline result
## Findings
## Secondary observations (logged, low priority)
## Corrections to prior sessions
## Thomas's stated priority for the remaining work
## Cheap checks still outstanding
## What to pass at the start of next thread

# How to write the next hand-off        ← this spec, copied verbatim
```

Drop a section only if it would be empty, and say so in one line rather than
leaving a heading with nothing under it. *Corrections* and *Thomas's stated
priority* are **never** dropped: an empty Corrections section is itself a claim
(nothing earlier was found wrong) and should say that explicitly.

## What each section is for

**Orientation** — carried forward and updated, not rewritten each time. A new
agent must be able to read this section alone and know what to read next. If
the folder layout or the tooling changed, that goes here.

**Session conditions** — what constrained the work. Session type (extraction vs
verification vs planning), what tooling was available, what did not arrive, what
was left untouched by instruction. This is where "the sandbox failed" and "the
governing briefs still did not arrive" belong. **State plainly which sources you
read in full**, because everything downstream inherits that limit.

**Headline result** — the single most important thing established, and how
strongly. If the session established nothing, say that; a session that only
refutes is still a result.

**Findings** — numbered `###` subsections, one per finding. Each states what was
checked, what was found, and **what it rests on**. Mark any claim that depends on
a predecessor's reading rather than your own — the house convention is
*(SEC04 per G.17)*. Quote verbatim; `Research.1.md` §2 applies here exactly as
it does to research output.

**Secondary observations** — real but low-priority. Section fingerprints, oddities
worth not rediscovering. Keep them short.

**Corrections to prior sessions** — numbered, each naming the file and the claim
being corrected, and whether it is *confirmed*, *refuted*, *overstated* or
*resolved*. This section is the reason the chain is trustworthy. A session that
finds a predecessor wrong and does not record it here has actively damaged the
corpus.

**Thomas's stated priority for the remaining work** — lettered blocks (A, B, C,
D) carried forward from the predecessor, edited to reflect what moved. Mark items
**no longer needed** explicitly and say why, rather than deleting them silently.
This section is what a new agent reads to answer "what is next".

**Cheap checks still outstanding** — ordered by value per unit effort, each one a
single lookup. This is the list that gets raided when a session has capacity left.

**What to pass at the start of next thread** — the packing list, for the case
where the next agent has no filesystem access. If it does have access, say so and
keep the list anyway; it doubles as an index of what matters.

## Conventions that make these files worth reading

- **Say what you did not do.** Every one of these files carries an explicit
  not-read / not-verified statement. That is what makes the positive claims
  usable.
- **Predictions are logged and then scored.** G.17 predicted a code pattern;
  G.18 recorded that it "landed". Make falsifiable calls and settle them.
- **Distinguish inference from documented fact,** and say which narrow respect is
  still inference. G.18's headline rule is very well evidenced and still not
  printed in any document — it says so.
- **A refuted hypothesis is a good outcome.** Report both sides of a conflict and
  pick neither; `Research.1.md` §3 is explicit that adjudication is not the
  research role.
- **Do not pad.** These files are dense because every line earns its place.
