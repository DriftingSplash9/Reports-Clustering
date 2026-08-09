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
