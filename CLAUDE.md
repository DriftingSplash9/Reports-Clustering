# CLAUDE.md — a router, not a rulebook

This repo's instructions live in its files. This one exists for a single
reason: a **local Claude Code session opened in this folder loads it
automatically and gets nothing else** — no Cowork project instructions, no
project memory. Everything below is either a pointer or a rule that has to
bind before the agent has read anything.

**Read `HANDOFF.md` §1 — the project's only read order.** Live state, the
todo, and what to read next routed by task. It sends you to `PLAYBOOK.md`
(short, binds every task) plus ONE lane playbook: `PLAYBOOK-CORPUS.md` for
research, minting, wiring, evidence and grading, or `PLAYBOOK-RENDER.md` for
the renderer. `REPORTS.md` from its 🛑 heading is scope and direction.

Three rules that bind immediately:

1. **Never run git here — not even read-only `git status`.** It leaves a
   `.git/index.lock` that blocks Thomas's own commits in GitHub Desktop, and
   an agent cannot delete it. Never state git state in any document, and never
   tell Thomas to commit — that is his own routine.
2. **No document, no edge.** If nothing published says a dependency exists it
   does not go in the graph; unverifiable leads go to `_dropped` with a reason.
3. **Nothing is deleted.** `mv` into `_to_delete/` and say so.

`npm run validate` must pass before and after any data change.

**Nothing else belongs in this file.** It is a router; a second copy of any
rule here would go stale the week it was written. Keep it under 1.5k.
