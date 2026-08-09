# MISSION-TODO 2.0 — the consolidated list, rebuilt

Written 2026-08-07, end of the day the Victoria pass closed. **Supersedes
`planning/MISSION-TODO.md`** (1.0), which stays on disk with a pointer at its
top; the repo is under git, so 1.0's strikethrough history IS the record of
what got done — nothing completed is carried here. Sources consolidated:
MISSION-TODO 1.0's surviving items, `AU/G.3.md` (today's Victoria pass),
`NZ/G.4.md`, `EU/G.49.md`, `research-input/Grok-Research-Brief-XI.md` items
25/27/28, and the corpus itself.

**State of the corpus** — **372 reports / 436 dependencies / 3 relations,
measured 2026-08-08** by an actual validator run (Thomas, locally; full
output `validator-2026-08-08.txt`). Earlier figures for the record: 354/415
as this file was written, 363/429 after the NZ G.5 and EU G.50 sessions.
**`npm run validate` is GREEN as of 2026-08-08 — zero ✗, all eight
behavioural checks pass.** That closes the check that had been outstanding
since the 2026-08-08 schema change, which no agent session could run
(esbuild win32/linux mismatch through the device bridge — an environment
limit, not a code one; it must be run on Windows). A red validator FAILS
(exit 1) by design; never ignore one. The 25 warnings are all
"no edges in either direction" and are expected — see the note under P1
item 4a. The repo is a PUBLIC GitHub repo
(github.com/DriftingSplash9/Reports-Clustering — public for a while, Thomas
confirmed 2026-08-07); origin/main was in sync as of 1.0's publication entry,
Git policy is now standing (2026-08-07): sessions commit and push their own
work — see the method notes.

**How to use this file**: it is the mission's entry point, not the authority
on any branch — each branch's newest `G.*.md` (currently `EU/G.50.md`,
`NZ/G.5.md`, `AU/G.3.md`) governs its own frontier; this file indexes them.
When an item below is done, mark it here AND in whatever branch file owns
it. When starting a session, read this header, pick ONE item, read the
branch file it names, and go. Do not start two branches in one session.

---

## P0 — Decisions only Thomas can make (each is minutes of his time and
blocks concrete work; ask at the top of any session he is present for)

*A second batch was answered via `notes/EU-open-questions_2026-08-08.docx`,
returned 2026-08-08 — **all fourteen answers are recorded in
`notes/Decisions-2026-08-08_EU-open-questions.md`**, which is what to read;
the docx itself is the raw form. Consequences are folded into the items they
govern: the corpus-wide `_dropped` sweep is now P1 item 4a (D3), the four
UI/filter additions are P3 item 23a (D4, not greenlit), and the three new
domain tags are adopted-but-deferred (D1). **Note the loss recorded there:
the three proposal files those answers review no longer exist** — `G.52.md`
left them in a sandbox `/tmp`. Files A and B have to be re-researched to the
rulings; File C is held pending verification anyway.*

*All four below were answered via `planning/Decisions-2026-08-07.docx`
(returned same day). Three further decisions from that doc are folded into
the items they govern: NZ's second council is **Auckland** (P1 item 7), the
EU prose section runs **agent-alone with a review gate** (P1 item 5), and
the EU hand-off spec is **adopted wholesale** for all branches (now in
Research.1.md §2). Session git policy is also now standing — see the method
notes at the bottom.*

1. ~~Mint the Public Finance Act 1989 (NZ)?~~ — **DECIDED AND EXECUTED
   2026-08-07 (Thomas, decisions doc, option A; executed same day, `NZ/G.5.md`)**:
   minted `nz-public-finance-act-1989` with five verified edges (not one) —
   `nz-treasury-fsgnz`, `nz-treasury-befu` and `nz-oag-annual-report` each
   depend on it, and it turned out to cross-reference the Public Audit Act
   2001 bidirectionally (`nz-public-audit-act-2001 <-> nz-public-finance-act-1989`,
   each direction its own independent quote). Enters the corpus at weighted
   authority rank #4 overall. See `NZ/G.5.md` Finding 1 for the full quote
   trail.

2. ~~Mint an `au-federal-budget` node?~~ — **DECIDED AND DONE 2026-08-07
   (Thomas, decisions doc, option A; executed same day)**: one node for the
   Budget as a single annual publication (`au-federal-budget`,
   budget.gov.au, Treasury), the `eu-draft-budget` treatment. The VLGGC
   estimate edge is minted; the final-amount leg stays AGENCY ONLY by
   design and is preserved as a `caveat` on the new edge. Corpus 355/416.
   The decision is precedent for a future Canadian federal budget node.

3. ~~Flip the GitHub repo public~~ — DONE (Thomas, confirmed 2026-08-07:
   the repo has been public for a while). Kept numbered so P0 references
   elsewhere stay stable.

4. ~~Extend the `Domain` union with a construction value?~~ — **DECIDED AND
   DONE 2026-08-07 (Thomas, decisions doc, option A; executed same day)**:
   `'construction'` added to the union in `src/lib/types.ts`,
   `au-abs-building-approvals` retagged as its first customer (the
   `assessment` compromise retired), checks green. Domain surfaces derive
   from data, so nothing else needed touching. Future construction/housing
   releases (housing starts, NZ building consents) use it too.

5. **The two stuck commits (`8295de1`, `b41bee9`) — Thomas only.**
   Reported 2026-08-08 (open-questions D5): "the last 2 commits are giving
   me troubles. Idk what to do." **No agent may run a git command here**
   (Research.1.md §2 — git on this repo cannot unlink its own
   `index.lock`, so even `git status` leaves a fresh stale lock). The
   likely cause is on record: `G.53.md` counted 25+ `.git/*.lock.stale*`
   files accumulated across sessions, none deletable through the device
   bridge, plus a live `index.lock`. Fix is manual, in File Explorer and
   GitHub Desktop: delete everything matching `.git/*.lock.stale*` and any
   `.git/index.lock` / `.git/HEAD.lock`, with GitHub Desktop closed, then
   retry the commit. An agent can advise from what Thomas reports seeing;
   it cannot look. **2026-08-08: Thomas reports GitHub Desktop closed.**
   Still not verified committed/pushed — no agent can check (§2); ask him.

*A third batch, answered via `Open-Questions-2026-08-08.docx`, returned
2026-08-08 — folded straight into the items they govern (OPEN-THREADS 0.4,
0.5, 1.1, 1.10, 1.11, all marked closed there).*

6. ~~Decide: does `sdmx-glossary` belong on §9's EU id list?~~ — **DECIDED
   AND DONE 2026-08-08 (Thomas, option: add sdmx-glossary only)**: added to
   `Research.1.md` §9 (127 ids); the weaker four (`hs`, `imf-weo`,
   `imf-fiscal-monitor`, `oecd-economic-outlook`) stay out, decided case by
   case rather than as a standing rule.

7. ~~Decide: add an `insurance` Domain value?~~ — **DECIDED AND DONE
   2026-08-08 (Thomas, option: yes)**: added to the `Domain` union in
   `src/lib/types.ts` and to `Research.1.md` §6; both ECB nodes
   (`ecb-insurance-corporations-operations`,
   `ecb-insurance-corporations-assets-liabilities`) retagged from
   `financial-regulation`.

8. ~~Decide: sync or freeze the diverged `EU/slices` mirror?~~ — **DECIDED
   AND DONE 2026-08-08 (Thomas: "drop them in the archive folder")**:
   `EU/slices/eu-level/` and `EU/slices/cross-layer/` moved to
   `archive/EU-slices-mirror/`; `EU/slices/README.md` updated. **Not**
   archived: `EU/slices/_staging/` — Thomas's hunch that "the slices were
   meant to be parts of blob" turned out to be right about `_staging/`
   specifically (it's the literal staging-blob split behind item 4a/OPEN-
   THREADS 2.5, not a mirror of anything) — archiving it would have buried
   live backlog, not tidied a duplicate. `member-states/` (empty) also left
   in place.

9. ~~OK to archive the two superseded planning files?~~ — **DECIDED AND
   DONE 2026-08-08 (Thomas: yes)**: `MISSION-TODO.md` (1.0) and
   `rolling-todo.md` moved to `archive/planning/`.

10. ~~Renumber this file's ragged item numbers (`9z`/`23b`/`23a`)?~~ —
    **DECIDED 2026-08-08 (Thomas: leave as-is)**: not renumbering — it would
    touch every hand-off and index citing these numbers for a cosmetic fix.
    Stop appending new letters going forward.

---

## P1 — Branch frontiers (each is one good session; read the named G-file
first, in full)

4a. **THE CORPUS-WIDE `_dropped` SWEEP — CLOSED 2026-08-09.** Full outcome
    in project memory (`dropped-sweep-status.md`) and `EU/G.68.md`; the
    account below is kept as the historical run log. Original framing:** Thomas, 2026-08-08 (open-questions D3): "its worth a
    dedicated sweep next before going further." Scope: 416 `_dropped`
    entries across 66 files; **391 have never been individually read.**
    `G.53.md` did a keyword pass and read 25. **Do not repeat the keyword
    pass** — `G.55.md` proved it is blind to the largest remaining class:
    entries wrongly dropped on too narrow a search, whose stated reason
    reads perfectly sound until the source is reopened (Research.1.md §4,
    third category — the ESS QPI Guidelines were sitting behind "no second
    edition found" after a search confined to one webpage and a foreword).
    Method: go file-by-file over the ~15 files with the most `_dropped`
    entries and read each array in full. When an entry's blocker is
    NOT FOUND or "no cadence stated", check *what was actually searched*
    before accepting it — a foreword, a webpage and a PDF body are three
    different searches.
    **The validator already scopes this better than any prose estimate**
    (`validator-2026-08-08.txt`, DROPPED section): 391 dropped entries, of
    which **122 "are research leads rather than answers — evidence
    described as existing, node or pass missing"**. That 122 is the real
    work-list. By reason: 112 `note`, **87 `no-node-yet`**, **72
    `no-document`**, 35 `deferred`, 29 `unpublishable-source`, 24 `denied`,
    16 `wrong-target`, 10 `caveat`, 4 `wrong-direction`, 2
    `unreadable-source`. Start with `no-node-yet` (documented but one end
    wasn't a node — the category the loosened node rule most directly
    unblocks) and `no-document` (the category §4's third lesson says is
    least trustworthy on its stated reason). Re-run the validator after the
    sweep: the two counts moving is the measure of whether it worked. Two specific entries are already known-open:
    Commission Recommendation (EU) 2023/397 in `eu-meta-docx-batches.json`
    (soft law, deliberately deferred by Thomas, needs the
    foundational-instrument test on its own merits) and the 52 entries the
    broad-but-not-tight keyword pass caught and nobody read.

    **SCOPED 2026-08-08, CLOSED 2026-08-09**:
    `planning/dropped-sweep-scoping_2026-08-08.md`, archived to
    `archive/planning/dropped-sweep-scoping_2026-08-08.md` now the sweep it
    scoped is done — read it only for historical method, not as a to-do
    list. Ranks all 58 files with
    `_dropped` entries by count, previews every priority-reason entry in the
    top 19 (the "~15 files" this item asks for, plus ties at the cutoff),
    and gives a suggested execution order. **Correction to the paragraph
    above**: "122" is code-computed (`DROPPED_LEAD_REASONS` in
    `src/lib/types.ts`) as `no-node-yet` + `deferred`, not `no-node-yet` +
    `no-document` — `no-document` is a real, separate priority (checking
    whether a confirmed negative was actually exhaustively searched), just
    not part of the 122 itself. See the scoping doc's "clarification"
    section for the full reasoning; `Research.1.md` §4 carries the same
    correction.

    **First file pair done 2026-08-08**: `equalization-named-products.json`
    + `equalization-payroll-base.json`. Turned up a second correction on
    top of the one above — 8 of the 87 `no-node-yet` entries counted in
    that figure were already stale, closed a day earlier by a companion
    file (`grok-h1-equalization-named-products.json`, merged 2026-08-07)
    whose sibling file's `_dropped` block was never updated to match. The
    validator's own stale-note check can't catch this class, because it
    only checks notes whose source/target already resolve to a real edge,
    and these carried `target: null` by design — worth remembering for the
    rest of this sweep: a `no-node-yet` lead can be closed elsewhere in the
    corpus without the file that recorded it ever finding out. The other 7
    leads (all in `equalization-payroll-base.json`, all hanging off
    Territorial Formula Financing) were genuine and got built for real:
    TFF minted as a node — the fourth major federal transfer, previously
    missing from the graph entirely — plus three new StatCan nodes, seven
    edges, all citations re-verified against the consolidated regulation.
    Estimated effect on the corpus (you still need to run the validator to
    confirm): 87 `no-node-yet` → ~72, 122 leads → ~107, 372 reports → ~376,
    436 dependencies → ~443. Full account in
    `planning/OPEN-THREADS_2026-08-08.md` under 2.1.

    **Second and third file pairs, plus decision execution, all 2026-08-08**:
    `edp-inventory-regulation-479-2009.json` + `esa-2010.json`, then
    `nz-government-finance.json` + `au-government-finance.json`, then —
    same day, after Thomas returned `Open-Questions-2026-08-08-sweep.docx`
    answered — all four of that document's decisions executed: the
    System of Macroeconomic Accounts framework minted as a node (six edges
    across two files repointed or built), the German GNI/QNA methods
    inventories minted as regular nodes with an estimated cadence, New
    Zealand's Local Government Act 2002 minted following the Public
    Finance Act 1989 precedent, and a new `CA/` branch started with its own
    `G.1.md`. Full accounts of all of this in
    `planning/OPEN-THREADS_2026-08-08.md` under 2.1 (the fourth session
    entry) and in `EU/G.57.md`, `NZ/G.6.md`, `AU/G.4.md`, `CA/G.1.md`.
    Corpus estimate after all of it, still unconfirmed by the validator:
    roughly 384 reports / 453 dependencies against the 372/436 baseline.

    **CLOSED 2026-08-09.** The sweep ran to completion file-by-file over
    every `_dropped` array in the corpus (not just the ~15 highest-count
    files originally scoped), plus the CIRCABC 26-country single-edition
    review it surfaced along the way (21 countries minted evergreen per
    Thomas's ruling, closing item 11's outstanding tail). Full account:
    project memory `dropped-sweep-status.md`, closing hand-off `EU/G.68.md`.

4b. **Rebuild proposal Files A and B to the 2026-08-08 rulings.** The
    drafts are gone (see the P0 header note). File A (German EDP + GNI
    inventories, German public-debt statistics): rebuild with the EDP
    inventory as **two dated nodes**, Dec 2015 and Oct 2025, each with its
    own `releases_per_year` justification, and the 'ESA 95' wording
    inconsistency recorded as a `note` only. File B (DE/IE
    national-accounts quality reports): **Germany only** — Ireland is held
    until its 2018 PDF is actually opened, and the Ireland → `esa-2010`
    edge is approved in principle but still needs the Irish methodology
    section read. The Destatis → own-release edge is `cites` (settled).
    Worth re-deriving rather than trusting this summary: the original
    Wayback corroboration and the Luxembourg/Netherlands colophon finding
    (`Publications Office of the European Union` / `ISBN 978-92-` prefix =
    a hosted copy of Eurostat's report, not a national document) survive
    only as prose in `G.52.md`.

5. **EU — the blob's judgment half. STARTED 2026-08-07 (`EU/G.50.md`), two
   further passes the same day (S1 and S2): 26 of 73 batches built, 47 remain —
   and 46 distinct, because two are byte-identical duplicates.** The first pass
   took batches 16–26, 30–37, 44, 45 and 66 — which turned out to be one
   subject, the ESS quality-and-metadata standards stack — and produced
   `ess-quality-framework.json` (5 reports, 6 dependencies, 9 dropped). **S1**
   took 3, 4 and 64 → `cross-layer/edp-inventory-regulation-479-2009.json`
   (1 report, 1 dependency, 11 dropped), Part A at
   `EU/EDPInventory_PartA_2026-08-07.md`. **S2** took 67 →
   `eu-level/esa2010-quality-reporting.json` (2 reports, 4 dependencies,
   8 dropped), Part A at `EU/ESA2010QualityReports_PartA_2026-08-07.md`.
   Corpus **366 reports / 434 dependencies**, `validate` exit 0.
   **Six things the next batch session must know.**
   (a) Read `01-manifest.json` by its `scope` strings, **not** by batch number:
   the material is grouped by subject across scattered numbers, and working in
   numeric order would have produced five thin slices instead of one.
   (b) **CORRECTION to the (b) that stood here, and to `G.50.md`'s own
   recommendation.** This file previously said batches 46–62 "carry no scope
   strings at all and nobody has characterised it", and named that block as
   where to go next. Half of that is wrong and the rest is worse than stated.
   **Batches 47–62 are precisely characterised** — they carry `batch_id` and
   `strand` fields instead of `scope` (e.g. `FIGARO-2026-08-03-A1` / "Finances /
   Monetary & Price Statistics – FIGARO EU inter-country supply, use and
   input-output tables"); the manifest reader only surfaces `scope`, so they
   *look* blank and are not. **Batch 46 is the one genuinely unlabelled block,
   and it is the most expensive thing in the backlog, not the cheapest**: 29
   country peer-review records, every one carrying no `url`, no `location` and
   no `names` — e.g. `{"id": "pr-germany", "country": "Germany", "quote": "high
   level of compliance with the European Statistics Code of Practice"}`. Under
   §2 and §6 those are uncitable, so all 29 need their sources re-fetched from
   scratch. **Do it last, not first.**
   (c) **Staged quotes from badly-typeset PDFs need re-reading.** `G.50.md`
   Correction 2 found the staging pipeline's extraction clean across six ESS
   documents. S1 found **five of six records in batch 64 not verbatim** — two
   misquoted nouns, one two-passage weld with no ellipsis, one truncation that
   removed the only cadence sentence in its passage, one reversed sentence
   order. The failures cluster on one PDF with broken intra-word spacing. The
   operational rule is narrower than "staging is unreliable": re-read anything
   whose source is a poorly-extracted PDF before it becomes a `basis`.
   (d) **EUR-Lex works again.** `G.50.md` Finding 4 recorded it serving HTTP 202
   zero-byte bodies to `curl` and silently redirecting a real browser to
   TodayOJ. Retried 2026-08-07 and both the legal-content and ELI forms return
   HTTP 200 with full text. The outage was transient; keep the once-per-session
   retry rule. `G.50.md` Cheap check 3 is discharged: the Regulation 223/2009
   node was minted in S2 and **enters the graph at weighted authority rank #2
   overall**, behind only ESA 2010, because ESA 2010 passes rank through to it.
   (e) **THE STAGED BATCHES ARE ORGANISED AROUND INSTRUMENTS, AND THE
   INSTRUMENTS ARE USUALLY NOT THE NODES.** Both slices hit this from opposite
   directions. Batch 64 was a national document whose five named national
   statistics are not in staging. Batch 67 was an Implementing Regulation, and
   the eight-edition Eurostat publication that Regulation produces is not in the
   blob at all — it was found by asking what the instrument makes. In both cases
   the mintable material was one search away from the staged material, and in
   neither case would working the batch alone have found it. **Budget one
   "what does this instrument produce?" search per batch.**
   (f) **Two documented conflicts were opened and neither was resolved**, per
   §3. The German EDP inventory, titled "according to ESA2010", quotes
   Article 8.1 of its own Regulation in the superseded "ESA 95" wording. And the
   European Statistics Code of Practice describes itself as a "self-regulatory"
   framework that **"complements"** the legal framework based on Regulation
   223/2009 — §5a language — while Regulation 223/2009 Article 11 asserts
   authority over the Code. That second one settles `G.50.md`'s deferred
   CoP → Regulation edge, and settles it as *do not mint*, which is not what
   G.50 expected when it filed the item as a retrieval problem.
   Also unbuilt and coherent: the rest of batches 0–15 (ESA 2010 and the
   national-accounts methodology stack — 3 and 4 are now done) and 68–72
   (ECB/Eurosystem collateral and balance sheets, which is priority C's own
   material). Note batches 53 and 54 are **byte-identical duplicates** of each
   other, so the manifest's remaining count is one higher than the real one.
   The project's largest known backlog by
   volume. The mechanical split is done and waiting in
   `EU/slices/_staging/`: `01-manifest.json` lists **73 batches**; work them
   one at a time with `_staging/PROMPT-for-splitting-agent.md` as the
   governing prompt; the raw material is `00-blob-fulltext.txt` (1.3 MB)
   with pre-cut NDJSON views (`10-batch-with-records.ndjson`,
   `10-loose-record.ndjson`, `10-part-b-soft-connections.ndjson`). The rule
   that keeps this safe: **nothing is imported without a verbatim Part A
   quote** — the NDJSON is Part B material and per `Research.1.md` §6 can
   only re-arrange what Part A proved. Separately, the 399k-character prose
   section (`_staging/20-prose-sections.txt`) runs as its own session —
   **mode decided 2026-08-07 (Thomas, decisions doc, option B)**: an agent
   works it alone under the standing rules (verbatim Part A quote or it
   doesn't exist; conflicts reported, never resolved), producing a findings
   file Thomas reviews before anything is imported. Do not fold it into
   batch work. **Prompt written 2026-08-07: `EU/prompts/PROMPT-prose-section.md`
   — paste it into a fresh session.** The file was opened and characterised that
   day: **399 Part A entries in two batches**, not the "one ECB/Eurosystem batch"
   the slices README claimed. 23 are ECB General Documentation Guideline
   (Guideline (EU) 2015/510) entries citing one EUR-Lex consolidated text; 376
   are EU Draft Budget entries carrying a `FILE:` field naming an uploaded PDF
   (SEC00/01/02/03/07/09/10) with **no URL at all**. Verification list for an
   outside reader: `EU/prose-verification-list.md`. **UNBLOCKED AND RUN
   2026-08-07 — both blockers cleared and all 399 entries checked, awaiting
   Thomas's review before anything is imported.** EUR-Lex was serving again
   (confirmed), and the SEC PDFs turned out to already be present at
   `EU/sources/SEC00.pdf`–`SEC10.pdf` (11 files, real content, not the
   missing uploads this item assumed). Results: **395/399 verified
   word-for-word**, 4 had no independent quote to check (duplicates by the
   extractor's own note), 0 mismatches, 0 not-founds, 0 retrieval failures.
   One real error surfaced: Block A entry A19 cites Art. 6(6)(a) for a
   "business day" definition that is actually at Art. 2(6)(a) (the quoted
   text itself is accurate, only the location is wrong). Full record, entry
   by entry: `EU/prose-verification-RESULTS_2026-08-07.md`. This is a
   findings file only — per the standing review-gate decision, nothing from
   it has been imported into `src/data/research/*.json` or `EU/slices/*.json`
   yet; that is the next session's job once Thomas has looked at it. Branch
   authority: **`EU/G.50.md`** (read `G.49.md` behind it)
   (and `EU/slices/README.md` for the branch's central
   disclosure-runs-upward finding — which `G.50.md` narrows rather than
   refutes: where the EU binds by Regulation it names nobody, where it
   coordinates by agreement it names its sources freely).

6. **AU — the second council, and the Victorian valuation chain.** Branch
   authority: `AU/G.3.md` (read G.2 and G.1 behind it). Two sub-items, in
   order:
   (a) *Second council*: four NSW council Revenue Policy PDFs 403'd in G.1
   (Tamworth, Yass Valley, Federation, Wollongong). Two unlock tricks are
   now proven on this branch — the publisher-DOCX swap (G.2) and the
   in-browser ZIP-extraction relay for when the container itself is
   Cloudflare-blocked (G.3 Session conditions has the full recipe). The
   prize: a council's own document naming NSW Land Registry Services or the
   Valuer-General directly, closing the `_dropped` lead in
   `au-government-finance.json`.
   (b) *Victorian valuation chain*: G.3's own gap. The VLGGC report computes
   standardised rate revenue from a capital-improved-value base and thanks
   the Office of the Valuer-General, but names no titled valuation release.
   The NSW-parallel pass is the Valuation of Land Act 1960 (Vic) +
   Valuer-General Victoria's annual general valuation, ending with a
   Victorian council's own rates document. Would let Victoria match NSW
   hop-for-hop and give `au-vlggc-annual-allocation-report` its valuation
   input.

7. ~~NZ — the second exemplar council: Auckland.~~ — **DONE 2026-08-07
   (`NZ/G.5.md`)**: Auckland researched from its own Volume 3 financial
   statements. Result is genuinely mixed, not a clean confirmation —
   the accounting-standard chain (PBE IPSAS 1) and a new statutory layer
   Wellington cannot have (Local Government (Auckland Council) Act 2009,
   newly minted as `nz-lgaca-2009`, governing Watercare's CCO structure)
   both generalise, but the Public Audit Act 2001 and Rating Valuations Act
   1998 edges Wellington carries do **not** transfer — Auckland's own
   documents never name either by title, recorded `denied`. Same session
   also executed P0 item 1's PFA 1989 mint. See `NZ/G.5.md` Findings 2–3.
   Two new leads opened by this pass, not yet acted on: mint Watercare
   Services Limited as a node (`NZ/G.5.md` priority 6), and decide the
   Local Government Act 2002 the same way PFA 1989 was just decided
   (priority 7). A third exemplar council (Christchurch) remains possible
   but is no longer scoped as urgent — the generalisation question already
   has one real answer with both a yes and a no in it.

8. **Beyond-Europe briefs — Grok XI items 25, 27, 28.** Still assigned,
   still `not_attempted` across two NZ sessions; source:
   `research-input/Grok-Research-Brief-XI.md`. Order: **25c first** —
   Chile's SII avalúo fiscal, a fourth property-valuation legal tradition
   for the corpus (after the Dutch WOZ, NSW/Victoria, and NZ rating
   chains); then Colombia / Chile-FCM / Peru; then item 27's nineteen
   unscouted jurisdictions (**Crown Dependencies first** — likely to rhyme
   with the Realm/associated-states material and reuse its templates); then
   item 28's two small closures. Apply the Research.1.md §2 verification
   pass to anything an external researcher returns — this project has now
   caught a proxy reader *fabricating a plausible citation from true
   parts* (`AU/G.3.md` Corrections 2); components checking out is not the
   quote checking out.

9. **Europe follow-ups from the depth passes.** Three small pockets, none
   full sessions, groupable: Norway's remaining lead — the municipal
   **årsregnskap** node (`no-government-finance.json`, built 2026-08-07,
   flagged lovdata as robots-blocked; the ministry's own Veileder was the
   workaround); the Netherlands and UK `_dropped` leads
   (`nl-municipal-finance.json`, `uk-local-government-finance.json` — each
   array is its own worklist, e.g. the Dutch Kadaster/BRK node was
   explicitly noted as not-yet-minted).

---

## P2 — Cheap checks (single lookups, ordered by value per unit effort;
raid this list when a session has capacity left)

9z. **RESEARCHED 2026-08-07 — awaiting a mint decision, not yet minted.**
    Findings: `EU/cheap-checks-9z-9a-9b_2026-08-07.md`. Yes — Germany
    (Destatis) and Ireland (CSO) both voluntarily publish their own ESA 2010
    national-accounts quality report, each with multiple dated editions
    (so a cadence, and a node, is derivable for both). Two near-misses worth
    recording so nobody re-claims them: Luxembourg (STATEC) and the
    Netherlands (CBS) each have a page that *looks* like a national report
    but the PDF itself is a hosted copy of Eurostat's own report (ISBN /
    Publications-Office colophon, product code KS-FT-...) — not a national
    document. France (INSEE): nothing found. Original item text follows for
    context.
9z. **Does ANY Member State publish its own ESA 2010 quality report?** THE
    HIGHEST-VALUE ITEM ON THIS LIST, added 2026-08-07 (S2), and it is a search
    rather than a lookup. Implementing Regulation (EU) 2016/2304 compels every
    Member State to send Eurostat, by 31 May every year, a quality report
    containing — Annex 4.2, indicator 2 — a *"List of national publications on
    the data sources used and methodology applied containing the titles of these
    publications and links to them, if available"*. **Nothing in the instrument
    requires those reports to be published** (searched: "shall be made public",
    "publish", "publication", "public" across all 24,942 characters), and
    nothing forbids it either. **One such document, published voluntarily by one
    NSI, is a data-sources table in `Research.1.md` §7's strongest-evidence-class
    sense — national publications by title, with links, for one country,
    refreshed annually.** It would open the member-state layer by a route Annex
    B, Annex XI and Article 9 of Regulation 479/2009 all failed to open. A
    measured "none of the 27 publishes it" is worth nearly as much. Start with
    the NSIs whose transparency is already documented in this corpus — Destatis,
    CBS, STATEC, INSEE — and with the phrase "quality report" plus "national
    accounts" on each NSI's own site.
9a. **RESOLVED 2026-08-07 — a newer edition exists, awaiting a mint
    decision.** Findings: `EU/cheap-checks-9z-9a-9b_2026-08-07.md`. A
    "Germany, October 2025" edition (188pp, vs. 170pp for the known Dec 2015
    copy) was found and read in a real browser session — two dated editions
    now exist, so the cadence blocker is cleared. **Trap for the next
    session**: the exact CIRCABC URL on file resolves to a Denmark document,
    not Germany's — CIRCABC's node IDs are not stable per-country
    identifiers, so re-find Germany's entry by browsing the folder tree
    rather than reusing the URL below. Original item text follows for
    context.
9a. **Open Germany's EDP inventory on CIRCABC, in a real browser.** Added
    2026-08-07 (S1). Eurostat's EDP
    inventories page carries a live "Inventory" link for every member state,
    and Germany's points at
    `s-circabc.europa.eu/ui/group/ca7c9cc4-b473-4abc-8e95-263dcd57d79d/library/413ddad4-653f-4632-99d8-35475ddb23f8/details`.
    To `curl` that returns HTTP 404 with a 49,532-byte single-page-app shell,
    and the REST form returns an Alfresco 404 — a failure mode easily misread
    as "the document is gone". **What turns on it:** the copy Destatis serves
    is dated December 2015, and one observed edition is not an interval, so
    `de-destatis-edp-inventory` is currently `no-node-yet` on cadence alone.
    If CIRCABC holds a newer edition, two editions exist, an interval becomes
    derivable, and the node is mintable on the same observed-record basis
    Thomas approved for `sdmx-glossary` and
    `eurostat-remuneration-mission-expenses-report` — which in turn unblocks
    two documented edges (`→ eu-reg-479-2009`, `→ esa-2010`) and, in principle,
    26 more member states. Add CIRCABC to the branch's site-behaviour list.
9b. **PARTIALLY RESOLVED 2026-08-07 — 3 of 5 found, 2 look uncitable.**
    Findings: `EU/cheap-checks-9z-9a-9b_2026-08-07.md`. Live URLs found for
    Destatis's quarterly debt statistics, Destatis's annual debt statistics,
    and the Bundesbank's "Statistik über Wertpapierinvestments." The two
    Deutsche Finanzagentur items (Statistik der Bundesschuld, and the
    Schuldscheindarlehen-by-creditor-class report) do not exist under those
    titles anywhere on Finanzagentur's current site — confirmed by a
    full-text search of the Kreditaufnahmebericht PDF, where they appear to
    surface only as line items inside other public reports, not as their own
    citable publication. Original item text follows for context.
9b. **Find publication pages for the five German statistics named in the EDP
    inventory.** Added 2026-08-07 (S1), and logged as its own item rather than
    done inline because finding five publication pages is a research task, not
    a conversion task. All five are named by title with a publisher, and four
    with a stated quarterly cadence; all five lack only a `url`, which the
    `Report` interface requires. In descending order of promise: the quarterly
    debt statistics (QDS, "compiled by Destatis on a quarterly basis"); the
    Statistic of Federal Government Debt (SFGD / Statistik der Bundesschuld,
    German finance agency); the Report on Loan Notes by Creditors of Central
    Government (Meldung zu Schuldscheindarlehen nach Glaeubigerklassen, same
    publisher); the annual debt statistics (ADS); and the Bundesbank's
    Securities holdings statistics (Statistik über Wertpapierinvestments,
    formerly Depotstatistik) — which is *not* `de-bundesbank-financial-accounts`.
    Quotes are in `EU/EDPInventory_PartA_2026-08-07.md` C8–C10. **These five are
    what corrects `EU/AnnexB_assessment_2026-08-05.md` §4's "not one German
    publication is named"** — true of the transmission passage it read, not of
    the document.
10. **Re-anchor `au-abs-seifa -> au-abs-census`** to ABS's own SEIFA
    methodology page. One fetch. The edge currently rests on the CGC's and
    VLGGC's third-party statements and says so in its own `basis`
    (`au-government-finance.json`).
11. **Tasmania methodology → `au-lgfa-act-1995`.** One targeted quote from
    the Tas manual (treasury.tas.gov.au PDF, URL in the
    `au-tas-sgc-methodology` node) naming the Act — connects both state
    nodes to the branch's new statutory spine, and upgrading the Tas
    slice's middle-confidence tier can be done in the same read.
12. **OAG long-term-plan observations** — fetch from `ao.parliament.nz`
    directly; the Wayback-gzip dead end is obsolete now the live host is
    known (1.0 item 18). While in the neighbourhood: **NZSIOC → `anzsic`
    mint** (one page).
13. **Puerto Rico items** (1.0 item 18 tail): Census SLGF mint, Planning
    Board forecasts, and the June-2026 revised fiscal plan
    (`pr-fomb-fiscal-plan` is the anchor node,
    `associated-states-government-finance.json` the slice).
14. **Tourism Research Australia** — does the National/International
    Visitor Survey have a clean publication cadence? If yes, mint it; the
    4L citation and the unpublished-LGA-cut flag are pre-written in
    `au-government-finance.json`'s `_dropped`.
15. **ARIA+** — one search: does the remoteness structure have a citable
    published home (ABS republishes remoteness areas built on it)? Same
    slice, same pre-written entry.
16. **NSW Grants Commission methodology manual** — the G.1 search was not
    confirmed exhaustive; one more determined attempt, then record a proper
    `NOT FOUND` with search strings if it fails.
17. **NZ s 106(2C) current-consolidation content check** — existence was
    confirmed 2026-08-06, content was not (1.0 item 17 tail;
    `NZ/G.1.md` carries the context).
18. **September 2026, dated**: when the 2026-27 VLGGC edition appears,
    check whether the **Vicmap road-data transition** happened — the
    `deferred` entry in `au-government-finance.json` documents the
    announced future dependency and exactly what changes if it lands.

---

## P3 — Code and tooling (none urgent; each is self-contained)

19. ~~Fix `scripts/handoff-to-json.py`'s priority-block parser.~~ —
    **FIXED 2026-08-08 (OPEN-THREADS 1.5).** It only recognised the EU's
    lettered `**A — Label**` convention and silently emitted
    `priorities: []` for the plain-numbered lists that the 2026-08-07
    branch-numbering decision (Research.1.md §2) made standard for AU and
    NZ. Now falls back to `numbered_items`/`bullet_items` when no lettered
    blocks are found. Re-ran the script over every branch — AU/NZ
    G-files now carry a real priority block instead of an empty one; EU's
    lettered parsing unaffected (checked against `G.56.json`). **The
    second task described here — no-argument mode only scanning `EU/` —
    turned out to already be false**: `BRANCHES` already listed all three
    branches and `targets()` already scanned them; no code change needed
    there. Don't re-flag it.
20. ~~Backfill `Research.1.md` §9's id lists by re-extraction.~~ —
    **DONE 2026-08-08, both halves.** EU/Europe half done 2026-08-08
    (`G.56`) — regenerated in one pass, 105 → 126 ids (127 after
    `sdmx-glossary`, item 6 above), block replaced wholesale, cross-checked
    against `src/data/index.ts` (67 files, 67 imports, no duplicate ids).
    Two judgement calls surfaced there for Thomas rather than decided: two
    `country: "DK"` Greenland-chain ids land on the EU list by the
    mechanical filter, and `sdmx-glossary` (`INT`, minted by an EU slice)
    was decided case by case (item 6). **AU and NZ done 2026-08-08
    (OPEN-THREADS 1.7)**: AU 11 → 21 ids, NZ 18 → 30 ids (the Stats NZ
    national-accounts pass — 5 ids — plus six later additions). Same
    re-extraction method, same cross-check, no duplicates anywhere in the
    corpus.
21. **Isolated-node shelving inconsistency** (1.0 item 15): the 3D view
    treats implied-only nodes differently from the validator's definition
    of isolated — reconcile (`src/components/InfluenceGraph.tsx` vs
    `scripts/validate-data.ts`).
22. **Search during layout warmup silently does nothing** (1.0 item 16):
    `flyTo` during warmup is dropped — either queue the request or grey
    the search box until the layout settles (`src/lib/search.ts`,
    `src/components/SearchPanel.tsx`).
23. **Rendering `relations` in the app** — still deferred by rule until
    there are five (currently 3: Niue and Tokelau `audits`, UKSPF
    `supersedes`). The agreed shape when the threshold is hit: Option C's
    fuller form — hover card + search + a distinct unweighted line style
    (`NZ/G.3.md`–`G.4.md` have the discussion).

23b. **The 25 isolated-node warnings, and one real disagreement in them.**
    From `validator-2026-08-08.txt`. Most are simply nodes minted without
    edges yet — including all four ECB series `G.53.md` added, which
    currently contribute nothing to the graph and are cheap inbound-edge
    follow-ups. But two, `gb-ukspf-prospectus` and
    `eu-esif-common-provisions-regulation`, are joined to each other by the
    corpus's only `supersedes` relation and *still* report "no edges in
    either direction". That is the schema working as designed (relations
    never reach `buildGraph`, and the validator confirms it: "✓ relations
    never reach buildGraph"), but it means the shelving logic and the
    relation model disagree about what "connected" means. Fold into item 21
    rather than treating it as a new bug.

23a. **Four UI/filter additions — NOT greenlit, parked by decision.**
    Thomas, 2026-08-08 (open-questions D4): "leave the idea for now, just
    add to the to do list." Listed so they are not re-proposed as new
    ideas: (a) a **domain filter** — `domains` is populated on every node
    and completely unused in the UI (`src/lib/filter.ts`,
    `ViewControls.tsx`); (b) a **rendering path for `supersedes`/`audits`**
    in `InfluenceGraph.tsx`, which currently has none at all — overlaps
    item 23, which sets the five-relation threshold; (c) an
    **evergreen-node visual treatment** for the one-off foundational
    shape (`releases_per_year` absent — `App.tsx`'s `Detail` already says
    "once, as a standing instrument", the graph shows nothing); (d)
    **relationship-type and cadence-range filters**. Do not start any of
    these without Thomas saying so.

---

## P4 — Verification debt and housekeeping

24. **NZ carried verification debt**: full re-extraction of LGA 2002
    Schedule 10 — the one unverified thing left in the NZ slice
    (`NZ/G.1.md` carried items).
25. **Empty `_to_delete/`** — needs Thomas on Windows; the device bridge
    cannot delete files, only move them there, which is why the folder
    exists.
26. ~~EU legacy hand-offs G.00–G.13 exist only as .docx.~~ — **DONE
    2026-08-08 (OPEN-THREADS 1.14).** All 10 (`G.00`, `G.02`–`G.05`,
    `G.07`–`G.09`, `G.11`, `G.13`) converted with `pandoc -t markdown` to
    `.md` siblings in `EU/legacy-handoffs/`; originals kept alongside.
27. **The `au-abs-gfs` node-split question** (G.1 Secondary observations,
    carried through G.3): the 2005 "ABS GFS Manual" methodology publication
    vs the annual "Government Finance Statistics, Australia" release are
    one node for scope reasons, flagged in the AASB 1049 edge's basis.
    Split only if a session actually needs the manual as its own citable
    document.

---

## Standing method notes (read once, apply always)

* **The one rule**: if no document says it, the edge does not exist. Direct
  fetch + own-eyes text extraction for anything that becomes a quoted
  `basis`; re-read inherited quotes at source before minting. This corpus
  has now caught an AI-summarising reader fabricating a plausible citation
  from true parts (`AU/G.3.md` Corrections 2) — components checking out
  individually proves nothing about the quote.
* **Read the data appendix before recording AGENCY ONLY.** The VLGGC lesson
  (G.3 headline): when a report ships as methodology-prose + data-appendix
  parts, the disclosure lives in the appendix. Part 1 alone said "agencies
  only"; Part 2's Appendix 4L named everything to catalogue number and
  release date.
* **Two document-unlock tricks, both proven on the AU branch**: (a) when a
  government PDF won't render or script, check the same publisher's page
  for a DOCX of the same document (works on cgc.gov.au and
  localgovernment.vic.gov.au); (b) when the working container itself is
  blocked (Cloudflare) and binary relay is unavailable, fetch the file
  same-origin inside a real browser page, unzip `word/document.xml` in
  page-context JavaScript (`DecompressionStream('deflate-raw')`), walk
  paragraphs AND tables in document order, inject the text into the DOM and
  read it out ~50k characters at a time. Full recipe: `AU/G.3.md` Session
  conditions.
* **Check `len(document.tables)`** before trusting any paragraphs-only DOCX
  extraction (G.2's lesson — the VLGGC report's whole body lives in Word
  tables).
* **Known site behaviour**, so nobody rediscovers it: cgc.gov.au PDFs render
  only inside Chrome's unscriptable built-in viewer (use the DOCX);
  localgovernment.vic.gov.au Cloudflare-challenges non-browser clients;
  legislation.nsw.gov.au is Cloudflare-gated but passable with a real
  browser's rendered text; legislation.govt.nz blocks non-browser clients
  (PCO PDFs via Wayback `id_` worked); lovdata.no is robots-blocked (use
  the ministry's own mirrors, e.g. the Veileder); Stats NZ DataInfo+ is
  intermittently fetchable and archive.stats.govt.nz DNS is flaky. **EUR-Lex:
  this file previously carried two contradictory notes on the same date
  (2026-08-07) — this one claiming outage, and P1 item 5(d) above claiming
  it works. RESOLVED 2026-08-08 (OPEN-THREADS 1.3), by direct check**: plain
  `curl`, no browser UA, gets HTTP 200 with full text on both forms tested
  (`eli/reg/2009/479/oj/eng`, `legal-content/EN/TXT/?uri=CELEX:02009R0223-20241226`)
  — no 202, no zero-byte body, no redirect to TodayOJ. The outage this note
  described was transient, same conclusion P1 item 5(d) already recorded;
  this note was simply never corrected. EUR-Lex does **not** need the
  once-per-session-retry-then-mirror treatment; treat it as reliable and
  investigate afresh only if it actually fails again. (Several other EU
  agency sites still gate non-browser HTTP but pass in a real browser); many
  government sites lazy-load behind "Expand all".
* **Tense trap** (Research.1.md §5b) runs forwards too: an announced future
  dependency (Vicmap) is `deferred`, not an edge, until a document states
  it in the present tense.
* **`npm run validate` failing is a stop-the-line event** — it exits 1 on
  any ✗ by design.
* **Caveat-notes**: a `_dropped` entry with reason `caveat` annotates a real
  minted edge and must name it in `source`/`target`; the validator enforces
  both directions (Research.1.md §2 box).
* **Branch hand-off numbering**: plain numbers per branch; the EU's A–G
  lettering is its own history and does not spread (decided 2026-08-07).
* **Hand-off discipline**: never edit a predecessor G-file; corrections go
  in the successor's Corrections section; copy the spec block forward
  verbatim; sidecar via `python3 scripts/handoff-to-json.py <branch>/G.<n>.md`
  with the path passed explicitly.
* **Git policy (decided 2026-08-07, Thomas)**: every session ends by
  committing its own work with a descriptive message and pushing to
  origin/main. Can't push? Commit locally and say so in the hand-off.
  **Amended 2026-08-07 (`EU/G.50.md`): cloud sessions can do the commit half
  and not the push half.** The sandbox git proxy refuses to inject its
  `GITHUB_TOKEN` for this repo ("not in this session's authorized repository
  set", HTTP 403), and `device_bash` has no network. So commit, then **say in
  the reply that commits are waiting** — GitHub Desktop opens on whatever
  repository it last had selected, and on 2026-08-07 that was a different
  project, which is how three commits sat unpushed for two days. To move
  commits off the device without re-creating them: `git bundle create <f>
  origin/main..HEAD` there, stage the bundle, `git fetch <f> HEAD:<branch>` in
  the container. Never re-create the commits in the container and push those —
  it diverges from the device's history.
