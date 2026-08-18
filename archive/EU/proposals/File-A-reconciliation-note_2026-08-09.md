# File A (German EDP inventory + debt statistics) — reconciliation note, 2026-08-09

**File A does not need rebuilding. It is already in the corpus, done independently and unaware of this thread.**

`G.52.md`'s File A (`de-edp-inventory-and-debt-statistics.json`) was lost with the rest of the
proposal files (see `notes/Decisions-2026-08-08_EU-open-questions.md`). Checking the live corpus
before re-researching it found that all of its content already exists, minted by the later
dropped-sweep pass without cross-referencing this thread:

- **German EDP inventory** — `de-edp-inventory` in `src/data/research/edp-inventory-regulation-479-2009.json`.
  Both editions confirmed at source (December 2015 Destatis copy, October 2025 CIRCABC copy),
  `releases_per_year: 0.1` from the 9.83-year interval between them, dependencies to
  `eu-reg-479-2009`, `esa-2010`, `de-destatis-debt-annual` and `de-destatis-debt-quarterly`.
  Resolved 2026-08-09 per that file's own `_status` field.
- **German GNI inventory** — `de-destatis-gni-inventory` in `src/data/research/esa-2010.json`,
  `releases_per_year: 0.25`, minted 2026-08-08 per the same Q2 ruling this proposal was going to
  apply.
- **German debt statistics** (the two dependency targets File A wanted) — `de-destatis-debt-annual`
  and `de-destatis-debt-quarterly`, both already nodes in `edp-inventory-regulation-479-2009.json`.

**One real discrepancy, worth a decision rather than a silent override: A1 was ruled "2 dated
nodes," and the corpus instead has "one node, cadence estimated from the observed interval
between editions."** That is the same shape used for the GNI inventory and is now the corpus's
general pattern for a document with two known dated editions and no series page — splitting
`de-edp-inventory` into two nodes now would break that consistency and touch dependency edges
that already point at the single id. Recommendation: let A1's ruling stand superseded by the
pattern that actually got built, rather than re-splitting this one node to match an August 8th
call made before the pattern existed. Flagging rather than deciding, per this project's own rule
that adjudication is not the research role.

**A2 (the "ESA 95" wording inconsistency, ruled "flag only")** — not confirmed present in the
current `de-edp-inventory` entry's text this session; worth a quick read of the current node's
full description if this still matters, otherwise treat as unresolved but low-value (it was
already the lowest-stakes item on the file).

No file written to `EU/proposals/` for File A — there is nothing to promote; the content already
lives in `src/data/`.
