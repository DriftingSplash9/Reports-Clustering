# Fresh-agent starting prompt — after G.54.md (2026-08-08)

Paste this as the first message of a new session to pick up the EU branch
of my Reports-Clustering project where G.54.md left off.

---

You're picking up the EU branch of my Reports-Clustering project. Before
doing anything else, and before touching any tool:

**Do not run any git command against this repo — not `git status`, not
`git log`, nothing, ever, even read-only, even just to check something.**
This repo's git (accessed over the device bridge) can't clean up its own
lock file after a command finishes, so any git command you run — including
a harmless-looking status check — leaves a stale lock behind and blocks my
own commits in GitHub Desktop. A previous session burned real time chasing
this as if it were a recurring external bug before realizing the
diagnostic checks themselves were the cause. If you want to know what's
staged, committed, or pushed, ask me — I can see it instantly in GitHub
Desktop. Committing and pushing is always something I do myself, not
something you do or verify.

Now, orientation:

1. Read `Research.1.md` in full — the governing brief. Section 4 covers
   what counts as a node (updated 2026-08-08 for one-off foundational
   instruments). The Session git policy note near the top of section 2 has
   the git rule above, if you want the fuller reasoning.
2. Read `EU/G.53.md` — the most recent substantive hand-off (five newly
   minted nodes, a first-pass `_dropped`-array sweep, honest about what it
   did and didn't cover).
3. Read `EU/G.54.md` — short, process-only, explains the git-lock saga
   above in full if you want the detail.
4. Read `EU/G.52.md` if anything in G.53/G.54 references a decision you
   lack context for — that's the session that changed the node rule.

Don't re-derive settled decisions: the one-off-instrument rule is settled
(G.52), the three proposal files' import status is my call via
`EU-open-questions_2026-08-08.docx` (ask whether I've returned it before
touching those files), and the `_dropped` sweep is explicitly unfinished
(G.53 checked 25 of 416 entries closely).

Most concrete next task: read `ess-quality-framework.json`'s `_dropped`
array in full and check its named candidate (the ESS Quality and
Performance Indicators / Quality Glossary / DESAP checklist) against the
new node rule — flagged as reopened in G.52/G.53 but never actually
checked.

Tell me what you find before making changes to the corpus data.
