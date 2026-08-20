# Handoff — Release-schedule pass complete, choosing the next priority

**Written 2026-08-11 (evening) by the Claude session that ran the release-schedule
backfill, for whoever picks this up next** — that could be Thomas directly, or a
fresh Claude session. If you're a fresh session: read this, then check the
project memory index (`MEMORY.md`) — `release-schedule-batch-12-final-2026-08-11`
is the detailed record this summarizes, and `usability-review-handoff` /
`coverage-roadmap-2026-08-10` are the two other live threads referenced in §4.

---

## 1. What this session did

Ran `src/data`'s recurring reports (every report carrying a `releases_per_year`
field) through an automated pass to backfill the `release_schedule` field —
started earlier in the day, this session picked it up at batch 9 and carried it
through to completion.

**Result: `rank-candidates.ts` now reports 0.** Every recurring report in the
corpus (roughly 550, once evergreen one-offs are excluded) has a documented
`release_schedule` — a `kind` (`published-calendar` / `stated-rule` /
`observed-pattern` / `irregular`), source-cited entries, and a note explaining
the reasoning. `npm run validate` and `tsc --noEmit` both pass clean as of the
last file pushed to your device.

**Method, if you need to run something similar again:** the Anthropic `Workflow`
tool, spawning up to 50 parallel research agents per batch, each one researching
a single report's actual publication schedule from the publisher's own site and
returning schema-validated JSON (forced via a JSON-schema `agent()` call, so
malformed output fails the tool call rather than silently corrupting the corpus).
Every batch went through the same pipeline: rank candidates by fan-in/authority
→ resolve each id's file location and independently verify it by grepping the
file's own `reports` array (never trust the agent's self-reported location) →
pre-check the schema for the validator's actual rules before touching any file
(date ordering, day-precision `from===to`, `irregular` kind requiring empty
entries) → apply via a generated Python script that preserves key order → run
the real validator and `tsc` → push changed files to your device → write a
memory record.

**Two real bugs found and fixed along the way, worth knowing about:**

- **The evergreen-vs-recurring false-positive pattern (resolved earlier today,
  before this session's batches).** Batches 2-7 kept flagging ~34 nodes
  (statutes, treaties, accounting standards) as "shouldn't have a fixed
  `releases_per_year`" — because the research agents were never shown the
  `cadence_note` field, which already explained *why* those nodes carry a
  deliberate nominal rate (your Q2 convention, modeled on `sna-2008`). You
  confirmed: leave all 34 as-is. Fixed by adding `cadence_note` to what agents
  see and telling them not to re-flag it — confirmed working from batch 9
  onward (zero false positives in batches 9-12).
- **A safety-classifier block in batch 9**: all 50 agents got blocked with
  "output schema too large to classify safely" on first launch, because the
  JSON-schema description text for one field had grown past ~4700 characters.
  Fixed by trimming the description; the actual threshold that broke it sits
  somewhere between ~4480 and ~4776 characters, if you ever hit this again.

---

## 2. Three open decisions carried forward — genuine judgment calls, not busywork

Each of these already has a working `release_schedule` applied — nothing is
broken or missing. The open question in each case is a single `releases_per_year`
number I didn't want to pick without your say-so, because the evidence didn't
give a clean substitute value.

- **`ng-nbs-cpi-rebasing`** (Nigeria NBS, currently `releases_per_year: 12`) —
  this specific report looks like it inherited the cadence of NBS's separate
  monthly CPI series by mistake. It's actually a one-off-per-rebasing special
  report (most recent: Feb 2025), and Nigeria's rebasing history is irregular —
  9 to 20 year gaps between rebasings. This is the exact shape of your existing
  nominal-rate + `cadence_note` convention (modeled on `sna-2008`), but I didn't
  want to pick the actual nominal number myself.
- **`nz-mbie-tif`** (NZ Tourism Infrastructure Fund, currently
  `releases_per_year: 1`) — confirmed discontinued, no further rounds planned.
  Open question: should a discontinued recurring program's `releases_per_year`
  stay as a historical record, or be removed to signal "no longer produced"?
  That's a modeling-convention question for the corpus generally, not just this
  one node.
- **`tea-foundation-school-program`** (Texas Education Agency, currently
  `releases_per_year: 1`) — TEA's own timeline document shows this is actually
  updated on a multi-stage cycle roughly 4-6 times per year, not once. No clean
  single number in the source to substitute.

Full detail on all three, plus the four URL-correction suggestions this session
held back as self-flagged non-replacements, is in the
`release-schedule-batch-12-final-2026-08-11` memory file.

---

## 3. What this unlocks

The Calendar panel (built 2026-08-10, mentioned in
`usability-review-handoff`/`HANDOFF-2026-08-11.md` as already shipped) was built
against partial `release_schedule` coverage. It now has real schedule data
behind essentially the whole recurring corpus instead of a fraction of it. Worth
a look at whether the calendar view's assumptions — what it shows when a report
has no schedule, how it bands by cadence — still make sense now that coverage is
total rather than sparse. This wasn't tested as part of this session; it's a
five-minute check, not a project.

---

## 4. The next-priority menu

This session was a pre-existing backlog item that ran to completion; it wasn't
chosen over anything else. The real open question — the one this handoff exists
to set up — is what to work on next. Everything below is already documented
elsewhere; nothing here is new. It's collected in one place so the choice is
easy to make, not so it makes itself.

**A. US subnational coverage.** Your stated Q16 priority ("US goes first").
Currently 33 US reports total, 28 of them federal — zero state, zero county,
zero municipal. The most lopsided major country in the corpus by a wide margin
(compare Canada: 136 total, spread across all four levels). Entry point is the
Census Bureau's Census of Governments + Annual Survey of State and Local
Government Finances, playing the same hub role StatCan's nodes play for Canada.
Full numbers in `coverage-roadmap-2026-08-10`.

**B. Africa: AFRISTAT + Charter hub nodes.** Already approved (Q17), not yet
built. Small, well-scoped: adding AFRISTAT and the African Charter on Statistics
as 3-4 hub nodes would give structure to ~70 existing African nodes that
currently look like seven disconnected islands (each country sits in a
different regional bloc with no shared methodological parent). Best
effort-to-payoff ratio of anything on this list.

**C. Russia and China — greenfield.** Zero reports today. Stated priority
("we will test this as we look to russian and chinese regions"), tied to a
component-measurement check: RU and CN are expected to land as their own
weakly-connected components, which is the case where the graph should show
visual separation on its own with no artificial layout force needed — worth
confirming once real data exists.

**D. Non-EU-institution European depth.** 226 European reports, but 75 are EU
institutions and ~25 member states sit at exactly 3 reports each (the ESA 2010 /
EDP compliance skeleton and nothing else). The accession belt (RS, ME, MK, AL,
BA, TR, UA, MD, XK) is 1 report each.

**E. The usability/legibility review.** Already has its own dedicated handoff —
`HANDOFF-2026-08-11.md` at the repo root, `usability-review-handoff` in memory.
Different in kind from A-D: it's about making the existing ~800-node graph
readable rather than adding more to it, and it's **blocked on one thing that
needs your direct input before any code gets written** — Phase 2 of the plan
(continental repulsion) directly contradicts a decision you made on 2026-08-10
("lets not fuck with it"), and the next session working on it needs to put that
contradiction to you rather than quietly building around it. If you want to
unblock that thread, the fastest path is answering that one question.

**How to use this:** these are priorities you've stated at various points, not
ranked against each other — nobody has weighed A against B against E. If you
want to just pick one and go, B (Africa hubs) is the smallest, cleanest unit of
work on the list. If you want the review moving again, the unblock is a single
yes/no on Phase 2. A and C are the largest asks — each is genuinely a branch's
worth of work, not an afternoon.

---

## 5. Conventions and gotchas from this session, for whoever does the next
   structured-field pass

- **Pushing files back to your device**: `SendUserFile` (all files in one call,
  it accepts an array) + `device_commit_files` (also one call, up to 50 files)
  works cleanly. A tarball-plus-`tar -xzf`-on-device shortcut does **not** work
  — `device_bash` can't overwrite existing files on your mounted folder (same
  restriction as the documented `rm`/`rmdir` block), so `tar` fails with
  "Cannot open: File exists" on every file that already exists. Don't bother
  trying that shortcut again.
- **Apply-script pattern gap**: the Python apply scripts used this pass can
  overwrite an existing field (like `cadence_note`) but silently no-op if the
  field doesn't exist yet on that report — they only iterate over keys already
  present. Caught this once (a `cadence_note` insertion silently dropped) by
  spot-checking applied files before push. If a future correction needs to
  *add* a field that isn't there yet, that needs a small addition to the
  pattern, not just an override dict.
- **Day-precision entries need `from === to`** per the validator — a handful of
  batches had agents return honest multi-day windows (e.g. "released sometime
  in the first ten days of the month") tagged as day precision. Fixed
  case-by-case by either narrowing to the single most-likely date or
  reclassifying to `week`/`month` precision, whichever the underlying evidence
  actually supported. Not a modeling error, just needs a human pass before
  applying.
