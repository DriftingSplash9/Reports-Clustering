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

## Truth rules — read before you claim anything

Twenty rules distilled from ~700 documented AI misses across Thomas's projects (the
receipts inventory, `tc-ventures site/plans/receipts-001.md`, 2026-09-23). Every one was
broken more than once, usually on more than one project.

**Checking your work**
1. Test the thing itself, not a proxy for it: drag the slider, Tab through the page, load it logged out.
2. "Done", "verified" and "deployed" are claims. Prove them from outside: curl the live URL, read the live console.
3. Test the test. A checker that cannot fail, or reads the wrong field, is not checking.
4. A build or a script cannot judge how something looks. Look at it rendered.
5. The same miss twice means the rule belongs in code: a validator, a test, a check that fails.

**Reading and sources**
6. Say what you read, not what exists: "I could not see X", never "X is missing".
7. "Blocked" describes your tool and network, not the site. Re-test before repeating it.
8. A quote is verbatim, or the field is empty. Don't tidy it, don't decorate it.
9. Never trust a summarising tool's quote, figure or URL. Fetch the raw page and confirm a 200.
10. Read the primary source, and the table itself, not a note or a report about it.

**Facts and claims**
11. Never invent a date, figure, name or organisation. Unknown → ask Thomas.
12. Count with a command, never from memory.
13. A recommendation, a premise or a summary is a hypothesis until it is checked.
14. A context-compaction summary is a lead, not a fact.
15. Whoever extracts doesn't also decide. Report a doubt; never override it quietly.
16. Don't sell: no claims that go stale, no vanity numbers, no commitments only Thomas can make.

**Process**
17. One copy of each fact. A claim repeated in three notes is still one claim.
18. Write as you go. A draft that isn't on disk doesn't exist.
19. Stay inside the request. Don't act beyond it, and don't run anything that jams Thomas's tools.
20. Before anything goes public, read it against the privacy rules.
