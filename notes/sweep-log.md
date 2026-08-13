# Sweep log — what went into `_to_delete/`, and why

**This file is the durable record. `_to_delete/` itself is not.** Thomas
empties that folder whenever he likes (he emptied it within minutes of the
first sweep, 2026-08-08), so anything written *inside* it — including a
README — is temporary by design. Log sweeps here instead.

Agents cannot delete files on this machine at all: the device bridge allows
write and move, not delete (`rm` fails with "Operation not permitted").
`_to_delete/` is the disposal route, it is gitignored, and moving a *tracked*
file into it registers as a deletion in git — which is the intended effect.

**Standing instruction (Thomas, 2026-08-08)**: sweep junk on sight, without
asking. "if you just make a habit of sweeping to the to delete folder I will
dump it now and then so you stop looking at that crap."

Rules that keep this safe:

- Verify duplicates by hash before sweeping one as a duplicate.
- **Relocate research material, never sweep it.** A source document in the
  wrong folder goes to the right folder.
- **Never sweep Thomas's personal files** without being told to.
- Grep for references before deciding a file is junk.
- Add a dated entry here for every sweep, including what was deliberately
  *not* swept — that is the part that stops the next session re-litigating it.

---

## 2026-08-08 (G.56)

Swept:

- `SEC05.pdf` (project root) — exact byte-for-byte duplicate (md5
  `b00b72ff75ec6d446f49c153332c6612`) of `EU/sources/SEC05.pdf`, where all
  eleven SEC PDFs live. The root copy was the stray.
- `session-2026-08-07-final.bundle`
- `session-2026-08-07-prose-and-cheap-checks.bundle` — git bundles from
  before the repo was published to GitHub, used to ferry commits across the
  device bridge. The repo is on `origin/main` now. Referenced by nothing.
- `notes/~$-open-questions_2026-08-08.docx` — a Word lock file left behind by
  Word having the questions doc open. `.gitignore`'s `~$*` meant it was never
  committed. **Still present after Thomas emptied the folder** — probably
  because Word still had a handle on it; it will go on the next pass.
- `index.lock-5` — a stale git lock an earlier session had moved aside.

Relocated rather than swept:

- `germany-national-inventory-report-nir-2026_7545b54fee6ff8d888390df59f4b2ed5.pdf`
  → `EU/sources/germany-national-inventory-report-nir-2026.pdf`. 30 MB, a
  UNFCCC greenhouse-gas National Inventory Report, mentioned in
  `EU/cheap-checks-9z-9a-9b_2026-08-07.md` as confirmed-unrelated to that
  task. Plausible future material for the emissions chain in its EU form
  (`Research.1.md` §8 Item 3's NIR → IPCC Guidelines shape), so it keeps its
  place as a source document — just not in the project root, where its size
  was slowing every clone for the outside readers the repo was made public
  for.

Left alone, deliberately:

- `diary.csv`, `country afrikans.docx` (root), `notes/country.docx` —
  Thomas's own files, unrelated to the project.

## 2026-08-08 (thread closure — OPEN-THREADS 1.12)

Swept:

- `notes/g.55.docx`, `notes/Questions-for-Thomas.docx` — Thomas's word
  arrived (OPEN-THREADS 1.12: "yes, sweep both"). Superseded working copies
  of content that now exists as Markdown (`EU/G.55.md` and the decisions/
  open-questions files respectively).

## 2026-08-09 (G.58)

Swept:

- `EU/sources/SEC05_copy_for_read.pdf` — a working copy this session made
  of `EU/sources/SEC05.pdf` (byte-identical, not independently verified by
  hash but created by direct `cp` this same session) solely to break a
  hardlink (`nlink > 1`) that was blocking the file-staging tool from
  reading the original. Junk from the moment it was created; never
  referenced by anything. The original `EU/sources/SEC05.pdf` is untouched.

Not swept, `~$-open-questions_2026-08-08.docx` still present:

- Same Word-lock file `G.56`'s entry above already flagged as "probably
  still open because Word has a handle on it" — still there as of this
  session. Not re-attempted; a lock file held open by a running
  application isn't something a file-move can fix.

- G.69 session (2026-08-09): `tmp_work/ess_governance_records.json` — a scratch
  file this session created under the repo root to transfer staged batch
  records from the device bridge into the cloud workspace for reading, then
  never cleaned up. Moved to `_to_delete/ess_governance_records_scratch.json`.
  Not part of the corpus schema; safe to delete.

## 2026-08-09 (post-import cleanup)
Moved to `_to_delete/`: `de-ie-national-accounts-quality-reports.json`, `eu-legal-instrument-lineages.json`, `ess-catalogue-standards.json` (all three promoted from `EU/proposals/` into `src/data/research/` and registered in `src/data/index.ts` -- duplicates, safe to delete), `validate-bundle.tar.gz` (scratch tarball used to run `npm run validate` in the cloud sandbox, no longer needed).

## 2026-08-09 (AU session, `AU/G.5.md`)
Moved to `_to_delete/`: `validate-bundle_2026-08-09-au.tar.gz` (a second scratch tarball, same purpose as the one above, built fresh for this session's validator run rather than reusing the already-swept one since it was already gone from the working tree by the time this session started). Safe to delete.

## 2026-08-10 (AF session, `AF/G.1.md`)
Moved to `_to_delete/`: `validate-bundle_2026-08-10-af.tar.gz` (same scratch-tarball pattern as above, this session's validator run). Safe to delete.

## 2026-08-13 (root/folder cleanup, at Thomas's request, before the BRICS pivot)

Thomas asked for a full cleanup pass before starting the Russia/China/India/Brazil branch:
junk to `_to_delete/`, old handovers and decided questions archived, and the entry-point
docs (README/REPORTS/START-HERE) streamlined back down after drifting from the early,
simple versions. Full detail of what moved where is in `README.md`'s "Where things live"
table and `REPORTS.md`'s rewritten protocol section — this entry is the dated log line.

Archived (moved into `archive/`, not deleted — nothing here is gone, just filed):
- `archive/handoffs/` — all 8 root `HANDOFF-2026-08-1*.md` files (one-off renderer/feature
  work, done and superseded, not part of any branch's numbered chain).
- `archive/code-review-2026-08-12/` — `CODE-REVIEW-2026-08-12.md`, `Code review.docx`, and
  the 9 `CODE-REVIEW-2026-08-12-round*.docx` Q&A rounds. Note for whoever reads this next:
  memory from the review process says Q9-Q12 were still open as of the last round — check
  round10.docx before assuming everything in here is closed.
- `archive/decisions/` — `Open-Decisions-2026-08-10.docx`, both `Open-Questions-2026-08-08*.docx`,
  and `planning/Decisions-2026-08-07.docx` (all answered; the last one's git-policy
  recommendation is superseded by the current git-no-touch rule — see REPORTS.md).
- `archive/notes/` — `G.5.5.md` (resolved UI note, its fixes already shipped),
  `notes/REORG-2026-08-07.md`, `SCHEMA-DECISION-relationship-types.md` (decided),
  `SESSION-NOTES-unlogged.md` (folded into V0.9 long ago), `Decisions-2026-08-08_EU-open-questions.md`
  + its source `EU-open-questions_2026-08-08.docx`, and `FORCE-LAYOUT-PROPOSAL.md` (the
  cluster-spacing idea Thomas declined — see project memory `cluster-spacing-declined`).
- `archive/planning/` — `MISSION-TODO-2.md`, `OPEN-THREADS_2026-08-08.md`, `EXPANSION-V1.md`
  (joining the already-archived `MISSION-TODO.md`/`rolling-todo.md`/`dropped-sweep-scoping`).
  `planning/BACKLOG.md` was deliberately left in place — it's Thomas's own strategic list,
  not mine to judge stale, though a lot has shipped since its 2026-07-29 write date and it
  may be worth his own refresh pass.
- `archive/sessions/` — the entire `sessions/` folder (`V0.1`–`V0.12`, `V1.5`, `V2.10`).
  Retired: nothing was added to this thread since `V0.12`, but `REPORTS.md` kept pointing
  agents at it as "current state" long after that stopped being true. See REPORTS.md's
  rewritten protocol section for the full reasoning.
- `archive/research-input/` — the whole `research-input/` folder (Grok/GPT scout briefs I
  through XI plus the 2026-07-31 handoff bundle), all pre-dating the AF/EU/NZ/AU/CA branch
  structure and already fully merged per `rolling-todo.md`'s own record. Kept rather than
  swept because `GPT-Scout-Brief-I.md` ("Scout Brief I — South America") may be a reusable
  template when the Brazil/BRICS work starts.
- `archive/logs/` — `validator-2026-08-08.txt`, an old full validator dump superseded by
  many later runs (cited by name in a couple of hand-offs as a historical measurement point,
  kept rather than swept for that reason).

Swept to `_to_delete/`: `tmp_work/b9_changed.tar.gz` and this session's own scratch
validate tarball (`rc-validate-cleanup-2026-08-13.tar.gz`) — both scratch, safe to delete,
same pattern as every prior tarball entry in this log. `sessions/` and `tmp_work/` are now
empty directories the device bridge can't remove; harmless, delete by hand if it bothers you.

Left alone, deliberately (same as every prior pass): `diary.csv`, `country afrikans.docx`
(root), `notes/country.docx` — Thomas's own files, unrelated to the project. Also left in
place: `AF/G.1.md`–`G.21.md` and every other branch's `G.*.md` chain — per this project's
own 2026-08-07 reorg precedent, the numbered hand-off chains stay where they are; they're
the active record, not clutter, even when there are dozens of them.

Ran `npm run validate` (tar+stage route) as a final check after all moves — clean except
the same 2 pre-existing Rwanda/Uganda notes every hand-off since before this cleanup has
flagged as out of scope. Corpus measured at 948 reports / 923 dependencies / 17 relations
this pass — recorded in `START-HERE.md` now, dated, so the next person knows to re-measure
rather than trust it forever.

## 2026-08-13, correction (same day, later) — `country afrikans.docx` was mis-filed

Thomas asked directly whether this file had been processed. It had NOT actually been
verified before being classified "personal, leave alone" in the very first entry of this
log (2026-08-08) — that entry grouped it with `diary.csv` and `notes/country.docx` by
filename/vibe, apparently without opening it, and every cleanup pass since (including this
session's own root sweep, earlier today) carried that classification forward unverified.

Opened it this time: it's a 712-paragraph Grok/GPT-style research dump — a structured,
sourced-and-quoted section covering 7 countries (South Africa, Nigeria, Egypt, Kenya,
Ethiopia, Tanzania, Ghana; 48 entries total) plus an unsourced qualitative synthesis for
the rest of the continent's CPI/social-protection indexation landscape. Checked specific
claims against the corpus and confirmed all 7 sourced countries fed real, more-verified
corpus files: Nigeria's "934 product varieties" COICOP-2018 rebasing figure is in
`ng-cpi-pension-safety-net.json`; Ghana's LEAP/GSS-CPI lead became `gh-leap-cpi-indexation.json`;
Ethiopia's PSNP lead became `et-psnp-cpi-federalism.json`; Tanzania's Zanzibar/OCGS material
is in `tz-zanzibar-union.json`/`tz-cpi-social-protection.json`; Egypt's CAPMAS material is in
`eg-cpi-social-insurance.json`; South Africa's Budget Review material is in
`za-cpi-social-grants.json`. Kenya is the clean proof: `ke-social-protection.json` has a note
explicitly naming and correcting "the docx's own framing of Kenya as a country 'moving toward
formal indexation'" — a direct citation of this file, refined per the branch's standard
practice of not trusting an unverified lead at face value.

Moved to `archive/research-input/country-afrikans-cpi-social-protection-leads.docx` —
processed source material, same category as the other old Grok/GPT briefs already there, not
personal. Renamed on the way in (original name was the actual cause of the two-cleanup-pass
error) — flagged here in case anything elsewhere still cites the old filename verbatim.

**Lesson for future sweeps**: a file's presence in an old sweep-log entry is not itself
verification. Open anything genuinely ambiguous before re-asserting a classification,
even one already on record — "personal, unrelated" should mean someone actually looked once.

## 2026-08-13, second correction (Thomas caught it) — `notes/country.docx` also mis-filed, and still UNPROCESSED

Thomas: "notes/country is afrika too!" — right again. Opened it: 301 paragraphs, sourced
poverty-line and minimum-wage data for 7 countries (South Africa — 11 of 30 entries — plus
Tanzania, Ethiopia, Egypt, Nigeria, Kenya, Ghana). South Africa's entries are specific and
citable: the three national poverty lines (Food R855 / Lower-bound R1,415 / Upper-bound
R2,846, StatsSA P0310.1), the 2026 minimum wage (R30.23/hour, Government Gazette 54075).

Traced the actual origin of the "personal" mislabel this time: `EU/G.52.md` first flagged
this file as untracked, and `EU/G.56.md` is where it got classified "Thomas's own files, left
alone" — apparently without opening it, early in the EU branch's work, well before the Africa
branch existed to recognize what it actually was. Every sweep since (including both of
today's) just carried that forward.

**Different from `country afrikans.docx`: this one was NEVER merged.** Grepped every
distinctive figure (R30.23, R855, R1 415, R2 846, "National Minimum Wage Amendment 2026",
NLSS/MPI numbers, IES 2022) against the full corpus, specifically every South Africa file
(`za-cpi-social-grants.json`, `za-fiscal-federalism.json`, `za-followup-gaps.json`,
`za-national-accounts-labour.json`) — zero hits anywhere. This is live, unused research
material, not a closed lead.

Moved to `archive/research-input/UNPROCESSED-country-poverty-minimum-wage-leads.docx` —
named and filed to be findable as still-actionable, not lumped in with the already-processed
briefs next to it. Whoever next works the AF branch (poverty-line/minimum-wage angle doesn't
have a `Domain` entry yet — closest fit is probably folding into the existing
`*-cpi-social-protection.json` family for these 7 countries under `benefits`, same as
minimum-wage mentions already there for other countries) should read this before assuming the
AF branch's CPI/social-protection layer is as complete as it looks.

**Same lesson as the entry above, reinforced**: two mis-filings from the same root cause
(an ambiguous filename, classified once without opening it, never re-checked) found in one
conversation. Worth a standing habit: when a "personal, leave alone" file's actual name is
even slightly project-adjacent (a country name, a topic word), open it once before trusting
the label again, no matter how old or how many times it's been carried forward.
