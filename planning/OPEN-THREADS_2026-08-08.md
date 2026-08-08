# Open threads — complete inventory, 2026-08-08

Written because there are too many to hold in your head. This is a **flat
census of everything currently on the go**, one line to a few lines each,
grouped by who can do it and how big it is. It is not a replacement for
`planning/MISSION-TODO-2.md` — that file keeps the full reasoning behind
each item, and its numbering is referenced from branch hand-offs. This is
the index you read to decide what to pick up.

**Total: 51 threads, of which 2 were closed as this file was written**
(1.4 and 1.6 — see below). 5 are yours alone. 14 are housecleaning. The
rest is real work, and most of it is not urgent.

Format: `[size]` is rough — **XS** minutes, **S** under an hour, **M** part
of a session, **L** a whole session, **XL** more than one.

---

## 0. Yours alone — nothing else can be done by an agent

| # | Thread | Size | Blocks |
|---|---|---|---|
| 0.1 | **The two stuck commits (`8295de1`, `b41bee9`)** and the `.git/*.lock.stale*` pile-up (25+ files, none deletable through the bridge). Close GitHub Desktop, delete every `*.lock.stale*` plus any `index.lock`/`HEAD.lock` in `.git`, reopen, retry. | S | nothing downstream, but it's noise on every commit |
| 0.2 | **Empty `_to_delete/`.** The folder exists only because the device bridge can move files but cannot delete them. | XS | tidiness |
| 0.3 | **Delete `~$-open-questions_2026-08-08.docx`** — a Word lock file, committed by accident. | XS | tidiness |
| 0.4 | **Decide: does `sdmx-glossary` belong on §9's EU id list?** It is `country: "INT"` but was minted by an EU-branch slice, which is the same argument that puts `oecd-icio` there. Same question, weaker, for `hs`, `imf-weo`, `imf-fiscal-monitor`, `oecd-economic-outlook`. Answering it makes the next regeneration fully mechanical. | XS | §9 stays a judgement call otherwise |
| 0.5 | **Decide: add an `insurance` `Domain` value?** Two ECB nodes are tagged `financial-regulation` for want of it (`G.53.md`). Also standing: the three adopted-but-unadded tags `research-innovation` / `agriculture` / `external-action` go in with their first tagged node, not before. | XS | cosmetic until File C returns |

---

## 1. Housecleaning — the current focus

**Do these roughly in this order.** 1.1–1.4 are correctness; the rest is tidiness.

**1.1 — A mirror slice has silently diverged from its canonical copy.** `[S]`
`EU/slices/eu-level/esa2010-quality-reporting.json` is missing
`eu-reg-2016-2304` and one dependency that `src/data/research/esa2010-quality-reporting.json`
has. `G.53.md` edited the canonical copy and did not mirror it. Only
`src/data/research/` is loaded by `src/data/index.ts`, so the graph is
correct and the *mirror* is stale — but a future session reading the mirror
would draw the wrong conclusion. Audit result 2026-08-08: 4 mirror files,
2 identical, **1 diverged**, 1 (`_staging/01-manifest.json`) has no
canonical twin by design. **Decide the policy while you are in there**: are
`EU/slices/*` copies meant to stay in sync, or are they a historical staging
record that should stop being updated? Right now nothing enforces either
answer, which is why this happened.

**1.2 — `START-HERE.md` says the corpus holds "335 reports and 392
dependencies".** `[XS]` It is 372/436. This is the document written for
outside readers of a public GitHub repo, so it is the worst place for a
stale number. `REPORTS.md` also carries several 121/122/133-node figures,
but those are dated narrative about past states and are fine as history.

**1.3 — `MISSION-TODO-2.md` contradicts itself about EUR-Lex, twice in the
same file, both dated 2026-08-07.** `[XS]` P1 item 5(d): "**EUR-Lex works
again** … both the legal-content and ELI forms return HTTP 200 with full
text." Standing method notes: "**EUR-Lex no longer works in a browser
either** … `curl` gets HTTP 202 with a zero-byte body and Chrome silently
redirects every legal-content and ELI form to `eur-lex.europa.eu/TodayOJ`."
One of these is wrong and a session will lose time to it. Resolve with one
fetch and delete the loser. (`Research.1.md` §7 sides with "reachable via a
real browser", for what that's worth.)

**1.4 — No JSON sidecars for `G.52`–`G.55`. — DONE 2026-08-08.** `[XS]`
`EU/` had `G.50.json` and `G.51.json` and then stopped. Rebuilt every
sidecar across EU, NZ and AU with `python3 scripts/handoff-to-json.py`
(idempotent, no arguments). **The run proved 1.6 rather than just fixing
1.4**: `G.52`–`G.55` each wrote a sidecar with *0 findings, 0 corrections,
0 priority blocks, 0 cheap checks*, and the script named the missing
sections outright. `G.56.json` writes 8 findings, 7 corrections, 7 priority
blocks, 11 cheap checks, no missing sections.

**1.5 — `scripts/handoff-to-json.py`'s priority-block parser is broken for
plain-numbered priority lists.** `[S]` It only recognises the EU's lettered
`**A — Label**` convention and silently emits `priorities: []` for AU and
NZ. Same file, second bug: no-argument mode only scans `EU/` (hardcoded
`BRANCHES`). (= MISSION-TODO-2 item 19.)

**1.6 — `G.52`–`G.55` drifted off the hand-off spec. — DRIFT STOPPED
2026-08-08; the four predecessors stay as they are.** `[S]` `G.51.md` was
the last conforming file: all nine required sections *and* the "How to write
the next hand-off" block that is meant to be copied forward verbatim.
G.52–G.55 used ad-hoc headings and dropped the spec block — precisely the
failure the spec's own rationale ("so the chain never depends on one file
surviving") was written against. **`G.56.md` restores both**, and its
sidecar reports no missing sections. Nothing is rewritten backwards, because
the rule is never edit a predecessor; the correction of record is in
`G.56.md`'s Corrections section. **One live bug this exposed**: the sidecar
script's priority-block regex only matches `**A — Label**`, so writing
`**Block A — …**` silently yields `priorities: []` — that is item 1.5, and
it bit this very file before being caught.

**1.7 — §9's AU and NZ id lists are still stale.** `[S]` The EU/Europe half
was regenerated 2026-08-08 (105 → 126 ids). AU shows 11 ids and 19 exist;
the NZ list predates the Stats NZ national-accounts pass and Norway. Same
one-pass extraction, `country`-matched. (= item 20 remainder.)

**1.8 — Institute `EU/proposals/` and write the rule down.** `[XS]`
`G.52.md`'s three proposal files were written to a sandbox `/tmp` and are
gone; fourteen of your answers now review artefacts that no longer exist.
The rule: **a draft not in the repo does not exist.** An unimported file in
the working tree costs nothing.

**1.9 — Root-directory clutter.** `[S]` Sitting in the project root:
`germany-national-inventory-report-nir-2026_…pdf` (**30 MB**), `SEC05.pdf`
(0.9 MB, while its siblings live properly in `EU/sources/`), two
`session-2026-08-07-*.bundle` files (git bundles from the pre-GitHub era —
the repo is published now, so they are dead weight), `diary.csv`,
`country afrikans.docx`. Decide per file: `EU/sources/`, `archive/`, or
gone. The 30 MB PDF in particular makes every clone slower for the outside
readers the repo was made public for.

**1.10 — Three superseded planning files still on disk.** `[XS]`
`planning/MISSION-TODO.md` (1.0, superseded), `planning/rolling-todo.md`
(superseded as entry point, keeps its Merged history), and now this file
alongside `MISSION-TODO-2.md`. Each has a pointer at its top, so nothing is
actually ambiguous — but consider moving 1.0 and `rolling-todo.md` into
`archive/` so `planning/` holds only live documents. `BACKLOG.md` is yours
and stays.

**1.11 — `MISSION-TODO-2.md`'s numbering has gone ragged.** `[XS]` It now
contains `4a`, `4b`, two consecutive items both numbered `9z`, and `23b`
printed before `23a`. Harmless to read, annoying to reference. Renumber
once, or accept it and stop appending letters.

**1.12 — Stale docx artefacts in `notes/`.** `[XS]` `notes/g.55.docx`,
`notes/Questions-for-Thomas.docx`, `notes/country.docx` — the first two look
like superseded working copies of things now in Markdown. Confirm and
archive.

**1.13 — Staging batches 53 and 54 are byte-identical duplicates.** `[XS]`
So `01-manifest.json`'s remaining count is one higher than the real one.
Note it in the manifest so nobody works the same batch twice.

**1.14 — `EU/legacy-handoffs/` G.00–G.13 exist only as `.docx`.** `[M]`
Convert to `.md` so the chain's early history is greppable. (= item 26.)

---

## 2. Research frontiers — real work, one session each

**2.1 — THE CORPUS-WIDE `_dropped` SWEEP.** `[XL]` **Your stated next
priority** (2026-08-08: "its worth a dedicated sweep next before going
further"). The validator scopes it: 391 dropped entries, **122 of which
"are research leads rather than answers"** — that 122 is the work-list, not
the 391. By reason: 87 `no-node-yet`, 72 `no-document`, 112 `note`, 35
`deferred`. Start with `no-node-yet` and `no-document`. **File-by-file, full
arrays, no keyword pass** — keyword passes are blind to the largest
remaining class (`Research.1.md` §4, third category). Re-run the validator
after: the two counts moving is the measure.

**2.2 — Rebuild proposal Files A and B to your rulings.** `[L]` File A:
German EDP inventory as **two dated nodes** (Dec 2015, Oct 2025), 'ESA 95'
inconsistency flagged only. File B: **Germany only**, Ireland held until
its 2018 PDF is actually opened. Both drafts are gone; the surviving
context is prose in `G.52.md` and the findings in
`EU/cheap-checks-9z-9a-9b_2026-08-07.md`.

**2.3 — File C (EU legal-instrument lineages): held pending a verification
pass.** `[XL]` Your ruling. Plus three follow-ups you approved: NDICI's other
absorbed 2014-generation instruments (verbatim repeal text), CAP's
second-order predecessors, and independent confirmation of
`eu-reg-2017-1601`'s title. FP6 behind FP7 is a **closed dead end** — do
not reopen.

**2.4 — The 8 unexamined Catalogue of ESS standards members.** `[L]` Scoped
2026-08-08, nothing minted: `EU/CatalogueOfESSStandards_scoping_2026-08-08.md`.
Best first: the EBS methodological manual for business registers; then the
seasonal-adjustment guidelines (confirmed 2015→2024, ≈0.11/yr); then
temporal disaggregation, the precision/variance handbook, data validation
2.0. GSBPM 5.1 and ISCED 2011 are `INT` classification hubs — research them
from the programmes coded to them, never by reading them. EDAMIS is a
system, not a publication.

**2.5 — EU staging blob: 47 of 73 batches remain (46 distinct).** `[XL]`
Read `01-manifest.json` by `scope` **and** by `batch_id`/`strand` — 47–62
look unlabelled and are not. **Batch 46 is genuinely unlabelled and the most
expensive thing in the backlog** (29 peer-review records with no url, no
location, no names — all need re-fetching from scratch). Do it last.

**2.6 — The prose-section verification results are sitting unimported.**
`[M]` `EU/prose-verification-RESULTS_2026-08-07.md`: 395/399 entries verified
word-for-word, 0 mismatches. It is a findings file only, gated on your
review, and has been waiting since 2026-08-07. **This is the largest block
of finished, verified, unused work in the project.**

**2.7 — AU: the second council, and the Victorian valuation chain.** `[L]`
Four NSW council Revenue Policies 403'd; two unlock tricks now proven.
Victoria needs the Valuation of Land Act 1960 + Valuer-General chain to
match NSW hop-for-hop.

**2.8 — Beyond-Europe briefs (Grok XI items 25, 27, 28).** `[XL]` Chile's SII
avalúo fiscal first (a fourth property-valuation tradition), then
Colombia/Chile-FCM/Peru, then item 27's nineteen jurisdictions (Crown
Dependencies first). Still `not_attempted` across three sessions.

**2.9 — Europe depth-pass leftovers.** `[M]` Norway's municipal
**årsregnskap**; the Netherlands and UK `_dropped` leads (the Dutch
Kadaster/BRK node is explicitly not-yet-minted).

---

## 3. Cheap checks — single lookups, raid when a session has capacity

3.1 Re-anchor `au-abs-seifa -> au-abs-census` to ABS's own SEIFA methodology page. `[XS]`
3.2 Tasmania methodology → `au-lgfa-act-1995`, one targeted quote. `[XS]`
3.3 OAG long-term-plan observations from `ao.parliament.nz`. `[S]`
3.4 NZSIOC → `anzsic` mint, one page. `[XS]`
3.5 Puerto Rico: Census SLGF mint, Planning Board forecasts, June-2026 revised fiscal plan. `[S]`
3.6 Tourism Research Australia — does the Visitor Survey have a clean cadence? `[XS]`
3.7 ARIA+ — does the remoteness structure have a citable published home? `[XS]`
3.8 NSW Grants Commission methodology manual — one determined attempt, then a proper `NOT FOUND` with search strings. `[S]`
3.9 NZ s 106(2C) current-consolidation **content** check (existence confirmed, content not). `[XS]`
3.10 Inbound edges for the four isolated ECB series `G.53.md` minted — they currently contribute nothing to the graph. `[S]`
3.11 A present-tense source for `ess-sims -> eu-reg-223-2009`. The Catalogue asserts `based_on` Regulation 223/2009, but that is the catalogue's metadata, not SIMS about itself; SIMS's own Article 12 claim is future-tense and unusable. `[S]`
3.12 **Dated, September 2026**: when the 2026-27 VLGGC edition appears, check whether the Vicmap road-data transition happened. `[XS]`

---

## 4. Code and UI — none urgent

4.1 **Isolated-node shelving inconsistency**, now with a second instance. The 3D view and the validator disagree about "isolated"; and `gb-ukspf-prospectus` / `eu-esif-common-provisions-regulation` are joined by the corpus's only `supersedes` relation yet both report "no edges in either direction". Correct by design (relations never reach `buildGraph`) but the two models disagree. `[M]`
4.2 Search during layout warmup silently does nothing (`flyTo` dropped) — queue it or grey the box. `[S]`
4.3 Rendering `relations` in the app — deferred by rule until there are five (currently 3). Agreed shape: hover card + search + distinct unweighted line style. `[M]`
4.4–4.7 **The four parked UI additions — NOT greenlit** (your 2026-08-08 call, "leave the idea for now"): a domain filter (`domains` is populated everywhere and completely unused in the UI); a `supersedes`/`audits` render path; an evergreen-node visual treatment for the one-off shape; relationship-type and cadence-range filters. Listed so they are not re-proposed as new ideas.

---

## 5. Verification debt

5.1 **NZ**: full re-extraction of LGA 2002 Schedule 10 — the one unverified thing left in the NZ slice. `[S]`
5.2 **AU**: `au-cgc-gst-relativities` and `au-abs-erp` rest on unverified subagent extraction, not direct primary source. Flagged in both nodes and on the edge that uses them. `[S]`
5.3 **AU**: the `au-abs-gfs` node-split question — the 2005 GFS Manual vs the annual release are one node for scope reasons. Split only if a session needs the manual as its own citable document. `[XS]`
5.4 **EU**: two documented conflicts opened and deliberately unresolved, per `Research.1.md` §3 — the German EDP inventory quoting its own Regulation in superseded "ESA 95" wording, and the Code of Practice "complementing" a Regulation that asserts authority over it. Both are correctly *not* adjudicated; listed so they are not mistaken for oversights. `[—]`

---

## What is NOT open, so nobody reopens it

- **`npm run validate`** — green as of 2026-08-08, first clean run since the schema change. Zero ✗, all eight behavioural checks pass. Must be run on Windows; the device bridge cannot (esbuild native-binary mismatch).
- **§9's EU/Europe id registry** — regenerated in full 2026-08-08, 126 ids, cross-checked against `index.ts`.
- **The ESS Quality Framework candidates** — QPI Guidelines minted; Quality Glossary and DESAP closed on rewritten reasons. Do not reopen (`G.55.md`).
- **FP6 behind FP7** — confirmed dead end, your call.
- **The one-off foundational instrument rule** — settled `G.52.md`.
- **Branch hand-off lettering, hand-off spec adoption, the `caveat` reason, the `supersedes` type, `au-federal-budget`, the NZ Public Finance Act, the GitHub repo going public** — all decided and executed.
