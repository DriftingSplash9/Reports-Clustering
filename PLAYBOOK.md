# PLAYBOOK.md — the core rules, and which playbook comes next

**Reference material, not state.** How the repo works and what bites people.
Current corpus numbers and the live todo list belong in `HANDOFF.md`.

**Three playbooks, and a session reads two of them: this one, then the one
for what you are doing.** This file is short on purpose — everything in it
binds every task, whatever the task is. (Why it was split three ways on
2026-09-06: memory `doc_consolidation_2026-09-06`. That is round narrative,
not a rule, which is why it is no longer here.)

---

## 1. Read these, routed by task

The read order for the session as a whole is `HANDOFF.md` §1, not here. Once
you know what you are doing, it is this file plus ONE of these:

| doing | read after this file |
|---|---|
| research, minting, wiring, evidence, quotes, grading, schema | `PLAYBOOK-CORPUS.md` |
| renderer, layout, forces, camera, panels, performance | `PLAYBOOK-RENDER.md` |
| a recipe for one kind of fetch, capture or extraction job | `notes/techniques-2026-09-04.md` |
| "can I reach host X?" | `notes/routing-snapshot-2026-09-04.md` — stale on arrival, re-probe |

**Rule numbers are global and permanent.** They are cited from code comments
and from `notes/`, so each playbook's list has GAPS where a rule lives in one
of the others: this file has 1, 2, 4, 5, 6, 8, 9; `PLAYBOOK-CORPUS.md` has 3,
10-17 and 19; `PLAYBOOK-RENDER.md` has 7 and 18. Never renumber, never reuse a
number, and add a new rule as 19, 20, ... in whichever playbook binds it. An
older reference to "PLAYBOOK §6" (known traps) or "§7" (standing decisions)
resolves to that section of CORPUS, or of RENDER where its subject is the
renderer; both files keep those section numbers.

**Two questions decide where a new paragraph goes, and the second one is the one
that gets skipped.** First: would an agent who never reads it make a WRONG
DECISION, and on what task?

- **here** — only if that agent could have been doing ANY task;
- **`PLAYBOOK-CORPUS.md` / `PLAYBOOK-RENDER.md`** — if it binds one lane;
- **`notes/techniques-<date>.md`** — a recipe for one kind of job, read when
  doing that job;
- **`notes/routing-snapshot-<date>.md`** — anything about which host answered
  which machine, which is stale on arrival.

Second: **how fast does it stop being true?** (Thomas, 2026-09-06.) The doc set
is two layers moving at different speeds. **`HANDOFF.md` is the fast layer** — it
answers "what are we working on right now" and is *supposed* to turn over: if the
work switches from corpus research to the renderer, §2 and §3 should look
different within a handoff or two, and §2's weight follows the active lane.
**Everything else is the slow layer** — the playbooks, `REPORTS.md` and
`START-HERE.md` carry the big picture and every part of the project, and they do
evolve, but over weeks rather than sessions.

So a paragraph that will be wrong in a week goes in `HANDOFF.md` even if it binds
every task, and a rule that will still be right in a month goes in a playbook even
if only today's round needed it. **The failure this prevents is specific: nothing
sweeps a playbook.** `HANDOFF.md` §4 sweeps the fast layer and has no counterpart
here, so live counts, "currently blocked" and "the next round should" rot in place
if they land in this file.

An unapplied finding awaiting a ruling lives in `HANDOFF.md`, not in a
playbook, and arrives as a rule only once Thomas has ruled. A trap now
guarded in code gets one line naming the guard, not the story. **When you add
to any playbook, say what you would remove** — the three months before the
first split added and never removed.

**House habit: the code is the design doc.** `palette.ts`, `nodeVisuals.ts`,
`linkVisuals.ts`, `view.ts`, `modes.ts`, `savedViews.ts`, `hierarchy.ts`,
`InfluenceGraph.tsx` carry dated comments explaining every constant. Read
the comment before changing the number — several say "do not raise this"
and mean it.

---

## 2. Standing rules

**1. Never run git from an agent session — not even read-only.** Any git
command leaves a `.git/index.lock` that blocks Thomas's own commits in
GitHub Desktop until he clears it by hand, and an agent cannot delete it
(rule 6). Never state git status in any doc; ask Thomas or read a
screenshot, and delete any git-status claim you find. **And never tell Thomas to
commit** (Thomas, 2026-09-06: "you need to stop reminding me to
commit"). No "uncommitted since ..." inventory in `HANDOFF.md`, no
"then commit" todo item, no closing line about committing. Committing
is his routine and he does not need it tracked for him; a list of
changed files is also a git-status claim in disguise, which rule 1
already forbids. Say what changed on disk if a round needs it stated;
stop there.

**2. No document, no edge.** If nothing published says the dependency
exists, it doesn't go in the graph.

**4. `npm run validate` before and after any data change** — generator,
logic tests, then the data checks; the live count of each is in
`HANDOFF.md` §2 and nowhere else. It can't run through the device
bridge. Recipe: stage `src/ scripts/ package.json tsconfig.json
index.html vite.config.ts START-HERE.md` (full `src/data/research/`
corpus included) into a Linux sandbox, `npm install`, `npm run gen`, then tsc/validate/build. Fastest way to
move 270+ research JSONs across the bridge: zip `src/data/research/`
on-device into `_to_delete/`, stage that one file, unzip in the
sandbox — but **`zip` on the device mount cannot rename its temp file onto
the target**: you get a 0-byte zip plus a random-named complete one, so `cp`
the temp file. (That trap sat in `PLAYBOOK-RENDER.md` §6 until 2026-09-06,
where a corpus round staging 270 JSONs would never have seen it.) Reuse a
live sandbox with `node_modules` already installed across rounds in the same
session. Any `tsx`/`vite`-driven script fails
via `device_bash` (Windows `node_modules` vs. the bridge's Linux shell
needing `@esbuild/linux-x64`) — same recipe fixes it. Plain
`tsc --noEmit` is unaffected and runs fine directly via `device_bash`.

**5. `public/corpus-data.json` is generated** (`npm run gen` /
`scripts/gen-slices.ts`) — never hand-edit it. Fresh sandbox → run
`npm run gen` first.

**5b. `diary.csv` is Thomas's personal file — leave it alone.** Not a
   corpus artefact, not generated, not yours to tidy. (Was parked in
   `PLAYBOOK-CORPUS.md` §7 until 2026-09-06, where a renderer round
   would never have seen it. Numbered 5b rather than 19 because it is a
   footnote to the don't-touch-generated-files rule, and rule numbers
   are permanent.)

**6. Agents cannot delete device files** — `mv` into `_to_delete/`, log it
in `_to_delete/README.md`. Emptying it is Thomas's job.

**8. Measure before believing.** A number nobody ran anything to get is a
guess. For the layout forces the instrument is committed:
`npx tsx scripts/measure-forces.ts` (sandbox, ~1.5 min per run; `SPREAD=`,
`SEEDS=`, `CRS=` env vars). Every earlier force calibration used a
throwaway script that was deleted, and one of them (the 2026-08-28
cluster-repulsion sweep) turned out not to reproduce — read `onscreen`,
run more than one seed, never let simulation state leak between runs.

**9.** *(Retired 2026-09-05 — it governed prompts relayed to Grok, and Grok is
no longer used in this project. Number kept so cross-references hold.)*

**Process rule.** `HANDOFF.md` stays short — edit its Current State/Todo
directly (overwrite, don't append) each turn. **The handoff procedure itself
is `HANDOFF.md` §4 and is not repeated here.** It is archive-first because
there is no git safety net (rule 1), and it was missed on 2026-08-29/30:
HANDOFF.md was overwritten three times in one session and archived only
retrospectively, from a copy that happened to still be in the session's
context. A new standing rule or trap goes here, not `HANDOFF.md`. Hand off rather than
push on when you re-derive something already settled, contradict an
earlier answer, retry a tool past its documented once-only policy, or the
session has been through a compaction. Project memory: write entries as
you go; if it refuses, park a note in `notes/` and flag it in
`HANDOFF.md`.

---
