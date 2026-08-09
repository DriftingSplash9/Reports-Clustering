# Open threads — complete inventory, 2026-08-08

Written because there are too many to hold in your head. This is a **flat
census of everything currently on the go**, one line to a few lines each,
grouped by who can do it and how big it is. It is not a replacement for
`planning/MISSION-TODO-2.md` — that file keeps the full reasoning behind
each item, and its numbering is referenced from branch hand-offs. This is
the index you read to decide what to pick up.

**Total: 51 threads, of which 18 were closed the day it was written or the
day after**: 1.4, 1.6, 1.9, 1.12 fully closed same day; 0.4, 0.5, 1.1, 1.10,
1.11 answered via `Open-Questions-2026-08-08.docx` (returned 2026-08-08);
and 1.2, 1.3, 1.5, 1.7, 1.8, 1.13, 1.14 closed in the housecleaning pass
that followed — see below. One (0.3) was absorbed into the standing sweep
habit. 5 are yours alone, unchanged (0.1 still needs you at the keyboard;
see its note). **All 14 housecleaning items are now done.** Everything
left open is either real research/frontier work (section 2), a cheap
single-lookup check (section 3), low-priority code/UI (section 4), or
verification debt (section 5) — none of it urgent, per your own priority
order the next thing up is block B, the corpus-wide `_dropped` sweep
(2.1).

Format: `[size]` is rough — **XS** minutes, **S** under an hour, **M** part
of a session, **L** a whole session, **XL** more than one.

---

## 0. Yours alone — nothing else can be done by an agent

| # | Thread | Size | Blocks |
|---|---|---|---|
| 0.1 | **The two stuck commits (`8295de1`, `b41bee9`)** and the `.git/*.lock.stale*` pile-up (25+ files, none deletable through the bridge). Close GitHub Desktop, delete every `*.lock.stale*` plus any `index.lock`/`HEAD.lock` in `.git`, reopen, retry. | S | nothing downstream, but it's noise on every commit |
| 0.2 | **Empty `_to_delete/` whenever you feel like it.** Standing, not a task: agents cannot delete on this machine, so junk lands there instead of being raised with you. You emptied it within minutes of the first sweep, so the durable record of what was swept and why lives in `notes/sweep-log.md`, not inside the folder. | XS | nothing |
| 0.3 | ~~Delete `~$-open-questions_2026-08-08.docx`~~ — **swept to `_to_delete/` 2026-08-08.** It was in `notes/`, not the root, and `.gitignore`'s `~$*` meant it was never committed. Nothing to do but empty the folder. | — | closed |
| 0.4 | ~~Decide: does `sdmx-glossary` belong on §9's EU id list?~~ — **DECIDED AND DONE 2026-08-08.** Added; the weaker four (`hs`, `imf-weo`, `imf-fiscal-monitor`, `oecd-economic-outlook`) stay out, decided case by case rather than as a rule (`Research.1.md` §9, now 127 ids). | — | closed |
| 0.5 | ~~Decide: add an `insurance` `Domain` value?~~ — **DECIDED AND DONE 2026-08-08.** Added to `src/lib/types.ts` and `Research.1.md` §6; both ECB nodes retagged from `financial-regulation`. The three adopted-but-unadded tags `research-innovation` / `agriculture` / `external-action` are unaffected. | — | closed |

---

## 1. Housecleaning — the current focus

**Do these roughly in this order.** 1.1–1.4 are correctness; the rest is tidiness.

**1.1 — A mirror slice has silently diverged from its canonical copy. —
DECIDED AND DONE 2026-08-08.** `[S]` `EU/slices/eu-level/esa2010-quality-reporting.json`
was missing `eu-reg-2016-2304` and one dependency that
`src/data/research/esa2010-quality-reporting.json` has. `G.53.md` edited the
canonical copy and did not mirror it. Only `src/data/research/` is loaded by
`src/data/index.ts`, so the graph was always correct — the *mirror* was
stale. **Your call: don't sync it, archive it.** `EU/slices/eu-level/` and
`EU/slices/cross-layer/` (the 3 files that were kept-after-import as
verification snapshots, not a live mirror) moved to
`archive/EU-slices-mirror/`. `EU/slices/README.md` updated to say so.
**One thing this surfaced, worth knowing**: `EU/slices/_staging/` is a
different thing entirely — it's the raw output of the staging-blob split
(the source material for 2.5's 47 remaining batches), not a mirror of
anything, and it was **not** touched. Your instinct that "the slices were
meant to be parts of blob" was right for `_staging/`, just not for
`eu-level/`/`cross-layer/`, which really were stale verification copies.

**1.2 — `START-HERE.md` says the corpus holds "335 reports and 392
dependencies". — DONE 2026-08-08.** `[XS]` Fixed to 372/436. `REPORTS.md`
also carries several 121/122/133-node figures, but those are dated
narrative about past states and are fine as history — left alone.

**1.3 — `MISSION-TODO-2.md` contradicts itself about EUR-Lex, twice in the
same file, both dated 2026-08-07. — RESOLVED 2026-08-08.** `[XS]` Settled
by direct check: plain `curl`, no browser UA, gets HTTP 200 with full text
on both the ELI and legal-content forms — no 202, no zero-byte body, no
redirect to TodayOJ. The "**EUR-Lex works again**" note (P1 item 5(d)) was
right; the "**no longer works**" standing method note described a
transient outage that was never corrected — now fixed in place in
`MISSION-TODO-2.md`, and `Research.1.md` §7's parallel note updated too.
EUR-Lex is reliable; don't re-flag it without a fresh failure.

**1.4 — No JSON sidecars for `G.52`–`G.55`. — DONE 2026-08-08.** `[XS]`
`EU/` had `G.50.json` and `G.51.json` and then stopped. Rebuilt every
sidecar across EU, NZ and AU with `python3 scripts/handoff-to-json.py`
(idempotent, no arguments). **The run proved 1.6 rather than just fixing
1.4**: `G.52`–`G.55` each wrote a sidecar with *0 findings, 0 corrections,
0 priority blocks, 0 cheap checks*, and the script named the missing
sections outright. `G.56.json` writes 8 findings, 7 corrections, 7 priority
blocks, 11 cheap checks, no missing sections.

**1.5 — `scripts/handoff-to-json.py`'s priority-block parser is broken for
plain-numbered priority lists. — FIXED 2026-08-08.** `[S]` It only
recognised the EU's lettered `**A — Label**` convention and silently
emitted `priorities: []` for AU and NZ, which use a plain numbered list
instead. Fixed: falls back to `numbered_items`/`bullet_items` when no
lettered blocks are found, same as every other section. All sidecars
regenerated (`python3 scripts/handoff-to-json.py`, no args) — AU/NZ
G-files now carry 1 priority block each instead of 0; EU's lettered
parsing unaffected (checked against `G.56.json`). **The second bug
described here — no-argument mode only scanning `EU/` — was already not
true**: `BRANCHES = ["EU", "NZ", "AU"]` and `targets()` already iterates
all three; confirmed by the regeneration run picking up AU/NZ files
without any code change to that part. Stale claim, not a live bug — don't
re-flag it. (= MISSION-TODO-2 item 19.)

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

**1.7 — §9's AU and NZ id lists are still stale. — DONE 2026-08-08.** `[S]`
Both regenerated wholesale, same method as the EU/Europe pass. AU: 11 → 21
ids. NZ: 18 → 30 ids (predated the Stats NZ national-accounts pass — 5
ids — and several later additions: `nz-oag-annual-report`,
`nz-public-audit-act-2001`, `nz-public-finance-act-1989`, `nz-lgaca-2009`,
`nz-auckland-annual-report`, `nz-statsnz-aes`). Cross-checked: no
duplicate ids anywhere in the corpus, all 67 research files imported.
`Research.1.md` §9 updated. (= item 20 remainder, now closed.)

**1.8 — Institute `EU/proposals/` and write the rule down. — DONE
2026-08-08.** `[XS]` `EU/proposals/README.md` created, stating the rule:
**a draft not in the repo does not exist.** Empty otherwise — first
expected occupants are proposal Files A and B (2.2).

**1.9 — Root-directory clutter. — DONE 2026-08-08.** `[S]` Swept to
`_to_delete/`: `SEC05.pdf` (verified byte-identical to `EU/sources/SEC05.pdf`
by md5 — the root copy was the stray) and both
`session-2026-08-07-*.bundle` files (git bundles from before the repo was
published; referenced by nothing). **Relocated, not swept**: the 30 MB
`germany-national-inventory-report-nir-2026…pdf` → `EU/sources/germany-national-inventory-report-nir-2026.pdf`
— it is a UNFCCC greenhouse-gas National Inventory Report and plausible
future material for the emissions chain in its EU form, so it keeps its
place as a source document, just not in the root. That also removes the
clone-size penalty for outside readers. **Left alone, deliberately**:
`diary.csv` and `country afrikans.docx` look like your own files, unrelated
to the project — say the word and they go too.

**1.10 — Three superseded planning files still on disk. — DECIDED AND DONE
2026-08-08.** `[XS]` `planning/MISSION-TODO.md` (1.0) and
`planning/rolling-todo.md` moved to `archive/planning/`, your call ("move
them to an archive folder"). `OPEN-THREADS_2026-08-08.md` (this file) and
`MISSION-TODO-2.md` stay where they are — they're current, not superseded.
`BACKLOG.md` is yours and stays.

**1.11 — `MISSION-TODO-2.md`'s numbering has gone ragged. — DECIDED
2026-08-08: leave it.** `[XS]` It still contains `4a`, `4b`, two items both
numbered `9z`, and `23b` printed before `23a`. Harmless to read, annoying to
reference, but not worth a renumbering pass that would touch every hand-off
and index that cites these numbers. Just stop appending new letters going
forward.

**1.12 — Stale docx artefacts in `notes/`. — DONE 2026-08-08.** `[XS]` The
Word lock file is swept. `notes/g.55.docx` and
`notes/Questions-for-Thomas.docx` — your word arrived ("yes, sweep both") —
moved to `_to_delete/`, logged in `notes/sweep-log.md`.
`notes/country.docx` is yours and stays.

**1.13 — Staging batches 53 and 54 are byte-identical duplicates. — NOTED
2026-08-08.** `[XS]` Confirmed: `batches[53]` and `batches[54]` (0-indexed)
share batch_id, strand, `n_records` and `record_ids` — only `char_offset`
differs. `_known_duplicate_batches` added to `01-manifest.json` recording
it, so nobody works batch 54 as if it were distinct from 53 when picking up
2.5. Not fixed at the source (the manifest is mechanical output of
`split_blob.py` and would need re-running to actually dedupe) — the note
is the cheap fix; re-splitting isn't.

**1.14 — `EU/legacy-handoffs/` G.00–G.13 exist only as `.docx`. — DONE
2026-08-08.** `[M]` All 10 on disk (`G.00`, `G.02`–`G.05`, `G.07`–`G.09`,
`G.11`, `G.13` — the numbering gaps are real, not a conversion miss)
converted with `pandoc -t markdown`. Originals left in place; `.md`
siblings added alongside. Spot-checked for completeness (word counts,
tail content) rather than diffed line-by-line — the source docs had
literal `**`/`-` characters typed as text rather than real Word
formatting, so pandoc escapes them (`\*\*`, `\-\--`); that's a faithful,
if slightly ugly, rendering of what was actually in the docx, not a
conversion bug. (= item 26.)

---

## 2. Research frontiers — real work, one session each

**2.1 — THE CORPUS-WIDE `_dropped` SWEEP. — IN PROGRESS, equalization pair
done 2026-08-08.** `[XL]` **Your stated next priority** (2026-08-08: "its
worth a dedicated sweep next before going further"). Scoping document:
`planning/dropped-sweep-scoping_2026-08-08.md` — ranks all 58 files with
`_dropped` entries, previews every priority-reason entry in the top 19,
gives a suggested execution order. **Also corrects an imprecision**: the
"122 research leads" figure is code-computed as `no-node-yet` (87) +
`deferred` (35), not `no-node-yet` + `no-document` as the prose elsewhere
implies — `no-document` (72) is a real, separate priority (checking
whether a confirmed negative held up), just not part of that 122. Full
reasoning in the scoping doc and in `Research.1.md` §4. **File-by-file,
full arrays, no keyword pass** — keyword passes are blind to the largest
remaining class (`Research.1.md` §4, third category). Re-run the validator
after each block, not just at the end: the two counts moving is the
measure.

**First session done 2026-08-08 — `equalization-named-products.json` +
`equalization-payroll-base.json`.** Two findings, not one. First, 8 of the
9 `no-node-yet` entries in `equalization-named-products.json` were already
stale before this session touched them: a companion file,
`grok-h1-equalization-named-products.json`, had closed them on 2026-08-07
(a Grok research handoff, merged and verified against SOR/2007-303), but
the original file's `_dropped` block was never updated to match, so the
scoping pass — and the 122-leads figure — counted 8 leads that were
already answered. Caught, not fixed by luck: the validator's stale-note
check can't see this class of staleness, because it only fires when a
note's own source/target resolve to a real edge, and these entries carried
`target: null` by design (see the consolidated note now in that file).
Second, the actual remaining work — the 7 Territorial Formula Financing
leads in `equalization-payroll-base.json` — got done for real: minted
`territorial-formula-financing` as a node (the fourth major federal
transfer, previously absent from the graph entirely) plus three new
StatCan nodes (Census of Agriculture, Gasoline and Other Petroleum Fuels
Sold, Report on Energy Supply and Demand in Canada), wired all 7 edges,
re-verified every citation against the consolidated regulation at
laws-lois.justice.gc.ca. **Net effect on the corpus, by my count — you
still need to run the validator to confirm**: reports 372 → ~376,
dependencies 436 → ~443, `no-node-yet` 87 → ~72 (8 stale + 7 resolved),
total leads 122 → ~107. The System of Macroeconomic Accounts entry in
`equalization-named-products.json` stays open — it's a framework, not a
release, and still blocked on the same node-rule question the scoping doc
flagged. **Next in the suggested order**: `edp-inventory-regulation-479-2009.json`
+ `esa-2010.json`.

**Second session done 2026-08-08 — same pair.** Same stale-cross-file
pattern found a third time, smaller: `esa-2010.json` had a `deferred`
entry for the German quarterly-GDP-release → esa-2010 edge that
`de-destatis-national-accounts.json` had already built the same day
(2026-08-05) under a different node id — fixed, with pointer notes added
to two adjacent still-genuinely-open entries (the GNI and QNA methods
inventories, which stay blocked on a real "non-recurring" vs.
demonstrated-predecessor-edition conflict — not adjudicated, still yours
to rule on if you want to). Then worked the `edp-inventory-regulation-479-2009.json`
"five named German statistics" lead: found and minted two (Destatis's
annual and quarterly public-sector debt statistics, EVAS 71321 family,
the quarterly one live-verified against a chain of dated press releases).
They're isolated nodes for now, same shape as `fed-h15` — the edge they
belong on runs from the German EDP inventory document itself, which still
isn't a node (blocked on cadence, unchanged). The other three: the debt-
level statistic (SFGD) turned up three different Finanzagentur
publications with three different rhythms and no clean match to what the
inventory claims — a genuine discrepancy, not a missing lookup. The
Bundesbank securities-holdings statistic turned out, on its own English
page, to be a bank-to-Bundesbank regulatory reporting system rather than
a public release — closer to the terminus candidates already in this file
than to an ordinary node. The loan-notes report: searched, not found,
plausibly non-public. CIRCABC and the 26-further-inventories lead
untouched — still blocked on the same non-browser-client 404. Full
detail in both files' `_dropped` blocks.

**Third session done 2026-08-08 — `nz-government-finance.json` +
`au-government-finance.json`.** Softer pair, more judgment calls, fewer
clean mints. Minted two NZ nodes: the Auditor-General's per-LTP-cycle
observations report (title varies release to release — 'Matters arising
from our audits of the 2021-31 long-term plans' in 2022, 'Observations
from our audits of councils' 2024-34 long-term plans' in 2025 — both
independently confirmed live, which also resolved a stale access block:
oag.parliament.nz now redirects to ao.parliament.nz, so the 403 a prior
session hit was against a retired domain) and Watercare's annual report
(clean, confirmed 2010–2025 run). Both sit isolated, `fed-h15`-style: the
edges they were found for need a source or target that still isn't a
node (councils' long-term plans in one case; the German-EDP-style problem
of the citing document itself not being a node in the other — for
Watercare, I also found the specific edge as originally framed,
`nz-lgaca-2009 -> Watercare's annual report`, isn't actually quotable —
LGACA 2009 establishes the entity and the financial split, it doesn't
name the annual report itself, so I left it unwired rather than force it).
**Flagging rather than deciding**: `nz-lgaca-2009 -> Local Government Act
2002` is still open, and the file itself says LGA 2002 "would sit under a
very large fraction of the New Zealand slice at once... and deserves its
own decision" — same shape as the Public Finance Act 1989 call you made
2026-08-07. Worth a similar explicit ruling whenever you want to make it;
I didn't mint it unasked. On the AU side, no new mints, but one important
correction: the file's TRA-visitor-survey lead assumed the National
Visitor Survey was still a live release "mintable by a future session" —
it was retired end of 2024, replaced by TRA's Domestic Tourism Statistics
(DoTS) collection. Caught before it became a wrong node, not after.
ARIA+ checked again and still open; the specific URL found this session
is now dead too.

**Fourth session done 2026-08-08 — the four Open-Questions-2026-08-08-sweep.docx
decisions executed, same day they came back answered.** Q1 (System of
Macroeconomic Accounts): minted `statcan-system-macroeconomic-accounts` in
`statcan-macro-accounts.json` as an evergreen framework node (no
`releases_per_year`), and repointed the `fiscal-equalization-program` and
`territorial-formula-financing` edges at it — removing the inference that
previously mapped the statute's named framework onto a specific StatCan
release. The arrow-toggle idea from the same answer is logged, not built —
see §4.8. Q2 (German GNI/QNA inventories): minted
`de-destatis-gni-inventory` and `de-destatis-qna-inventory` in
`esa-2010.json` as regular nodes, both `releases_per_year: 0.25` —
estimated, not stated, from the GNI inventory's demonstrated 2021-to-2025
interval; the QNA inventory's own estimate is weaker, carried over rather
than independently evidenced, flagged as such on the node. Both wired
`methodology_depends_on -> esa-2010`. Q3 (NZ Local Government Act 2002):
minted `nz-lga-2002` in `nz-government-finance.json`, following the Public
Finance Act 1989 precedent — four edges in the same pass
(`nz-la-annual-reports`, `nz-wellington-annual-report`,
`nz-auckland-annual-report`, `nz-lgaca-2009`, all `methodology_depends_on`),
built from quotes already extracted by documents that cite the Act, not
from a fresh read of the Act's own text — legislation.govt.nz's plain-text
extractor still returns nothing outside a browser session (NZ/G.4.md,
reconfirmed) and one wasn't available this turn, so the reverse-cross-
reference sweep that produced PFA 1989's best edge (NZ/G.5.md Finding 1)
was not attempted here and is flagged as a follow-up, not assumed done. Q4
(Canada/federal branch): `CA/` created, `CA/G.1.md` written — see that file
for the branch's own orientation and priority list. **Net effect on the
corpus, by my count — still needs a validator run**: reports +4 (the
framework node, two German inventories, `nz-lga-2002`), dependencies +6
(2 German, 4 NZ) plus 2 existing edges repointed rather than added. Validator
run against this and the earlier three sessions combined is now the single
most valuable five
minutes anyone can spend on this corpus.

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
4.8 **Edge-direction arrows, toggleable — parked, not greenlit** (your 2026-08-08 answer to Open-Questions Q1). Framework/legislation nodes without their own cadence (`statcan-system-macroeconomic-accounts`, and the pattern generally) make direction ambiguous without an arrowhead; arrows were tried before and found confusing layered on top of the pulse animation, so the idea is a toggle — off by default, on when wanted — not a permanent addition. Explicitly deferred to a future UI pass; not to be implemented on the strength of this note alone.

---

## 5. Verification debt

5.1 **NZ**: full re-extraction of LGA 2002 Schedule 10 — the one unverified thing left in the NZ slice. `[S]`
5.2 **AU**: `au-cgc-gst-relativities` and `au-abs-erp` rest on unverified subagent extraction, not direct primary source. Flagged in both nodes and on the edge that uses them. `[S]`
5.3 **AU**: the `au-abs-gfs` node-split question — the 2005 GFS Manual vs the annual release are one node for scope reasons. Split only if a session needs the manual as its own citable document. `[XS]`
5.4 **EU**: two documented conflicts opened and deliberately unresolved, per `Research.1.md` §3 — the German EDP inventory quoting its own Regulation in superseded "ESA 95" wording, and the Code of Practice "complementing" a Regulation that asserts authority over it. Both are correctly *not* adjudicated; listed so they are not mistaken for oversights. `[—]`

---

## Standing habits, not tasks

- **Junk goes to `_to_delete/` on sight, without asking** (your instruction,
  2026-08-08). Duplicates verified by hash, Word lock files, dead bundles,
  stale locks, superseded generated artefacts. Every sweep gets a dated entry in
  `notes/sweep-log.md` — **not** inside `_to_delete/`, which gets emptied —
  including what was *not* swept and why. Research material gets **relocated** to the right folder, never
  swept. Your personal files are never swept without being told.
- **Agents cannot delete on this machine at all** — the device bridge allows
  write and move, not delete. That is the whole reason `_to_delete/` exists,
  and also why the `.git` lock files piled up.

## What is NOT open, so nobody reopens it

- **`npm run validate`** — green as of 2026-08-08, first clean run since the schema change. Zero ✗, all eight behavioural checks pass. Must be run on Windows; the device bridge cannot (esbuild native-binary mismatch). **Not yet re-run against today's edits** (id registries, insurance domain, the archive moves, the sidecar regeneration) — worth a fresh run before trusting counts again; none of today's edits touched `src/data/`, so a red run would mean something else broke.
- **§9's EU/Europe id registry** — regenerated in full 2026-08-08, then `sdmx-glossary` added same day, 127 ids, cross-checked against `index.ts`.
- **§9's AU and NZ id registries** — regenerated in full 2026-08-08, AU 11→21, NZ 18→30, same cross-check.
- **The `insurance` Domain value** — added 2026-08-08, both ECB nodes retagged.
- **`EU/slices/eu-level/` and `cross-layer/`** — archived 2026-08-08 to `archive/EU-slices-mirror/`, not kept in sync. `_staging/` is unaffected and still live (it's 2.5's backlog, not a mirror).
- **The three superseded planning files** — `MISSION-TODO.md` and `rolling-todo.md` archived 2026-08-08 to `archive/planning/`.
- **`MISSION-TODO-2.md`'s ragged numbering** — leaving it as-is, your call 2026-08-08. Don't propose renumbering again.
- **`scripts/handoff-to-json.py`'s priority-block parser** — fixed 2026-08-08, all sidecars regenerated. The "no-argument mode only scans EU/" half of that bug report was already false when checked; don't re-flag it.
- **The EUR-Lex "does it work" contradiction** — resolved 2026-08-08 by direct check: it works, plain `curl` included. Both `MISSION-TODO-2.md` and `Research.1.md` §7 corrected.
- **`START-HERE.md`'s stale corpus count** — fixed to 372/436, 2026-08-08.
- **`EU/proposals/` and its rule** — instituted 2026-08-08.
- **Staging batches 53/54 being duplicates** — noted in `01-manifest.json`, 2026-08-08. Not re-split.
- **`EU/legacy-handoffs/` G.00–G.13 as `.md`** — converted from `.docx` 2026-08-08, originals kept alongside.
- **The ESS Quality Framework candidates** — QPI Guidelines minted; Quality Glossary and DESAP closed on rewritten reasons. Do not reopen (`G.55.md`).
- **FP6 behind FP7** — confirmed dead end, your call.
- **The one-off foundational instrument rule** — settled `G.52.md`.
- **Branch hand-off lettering, hand-off spec adoption, the `caveat` reason, the `supersedes` type, `au-federal-budget`, the NZ Public Finance Act, the GitHub repo going public** — all decided and executed.
- **The four Open-Questions-2026-08-08-sweep.docx decisions** — all answered and executed same day, 2026-08-08. System of Macroeconomic Accounts: node minted, no cadence, framework/legislation nodes generally get a node going forward on the same logic. German GNI/QNA inventories: minted as regular nodes, cadence estimated for the pulses. NZ Local Government Act 2002: minted, following the Public Finance Act 1989 precedent. Canada/federal branch: started — see `CA/G.1.md`. Don't re-ask any of these four.
