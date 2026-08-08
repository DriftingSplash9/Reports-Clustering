# Fresh-agent starting prompt — after G.55.md (2026-08-08)

Paste this as the first message of a new session to pick up the EU branch of
my Reports-Clustering project where G.55.md left off.

---

You're picking up the EU branch of my Reports-Clustering project. Before doing
anything else, and before touching any tool:

**Do not run any git command against this repo — not `git status`, not
`git log`, nothing, ever, even read-only, even just to check something.** This
repo's git (accessed over the device bridge) can't clean up its own lock file
after a command finishes, so any git command you run — including a
harmless-looking status check — leaves a stale lock behind and blocks my own
commits in GitHub Desktop. A previous session burned real time chasing this as
if it were an external bug before realizing the diagnostic checks themselves
were the cause. If you want to know what's staged, committed or pushed, ask me
— I can see it instantly in GitHub Desktop. Committing and pushing is always
something I do myself, not something you do or verify.

Now, orientation:

1. Read `Research.1.md` in full — the governing brief. §4 is what counts as a
   node (one-off foundational instruments admitted 2026-08-08; recasts read as
   recurring). The git rule above is stated near the top of §2.
2. Read `EU/G.55.md` — the most recent hand-off. Short: one node minted from a
   wrongly-dropped candidate, and a finding about why `_dropped` sweeps can't
   be done by keyword.
3. Read `EU/G.53.md` — the last big substantive session (five nodes, the first
   `_dropped` sweep, honest about its own scope).
4. Read `EU/G.52.md` if anything above references a decision you lack context
   for — that's the session that changed the node rule.
5. `EU/G.54.md` is process-only; read it if you want the full git-lock story.

Don't re-derive settled decisions: the one-off-instrument rule is settled
(G.52); the three proposal files' import status is my call via
`EU-open-questions_2026-08-08.docx` (ask whether I've returned it before
touching those files); the ESS Quality Framework candidate is closed (G.55) —
don't reopen the QPI / Quality Glossary / DESAP question.

**Most concrete next task, and it needs no research at all**: regenerate
`Research.1.md` §9's EU node-id registry. It's at least eleven ids stale and
has been flagged as stale twice without anyone doing it. One clean extraction
pass — every `"id"` from every report in `src/data/research/*.json` whose
`country` is `EU`, an EU-27 code, or one of the `XEU` codes, plus the
branch-minted `INT` ids (`oecd-icio`, `oecd-frascati-manual`,
`nordic-statistics-database`, `nato-defence-expenditure`) — cross-checked
against `src/data/index.ts`'s import list, replacing the block rather than
patching it. Do that first; it's cheap and it stops getting cheaper.

**Then the real research task**: the *Catalogue of ESS standards*. The ESS
Handbook describes itself as "included in the Catalogue of ESS standards, the
collection of non-legislative normative documents underpinning the ESS", and
`ess-quality-framework.json`'s `_dropped` array flags that none of the
catalogue's members other than the four already minted from that slice have
ever been looked at. A named collection of normative documents is exactly the
shape that produces nodes here. Scope it, then tell me what's in it before
minting anything.

Tell me what you find before making changes to the corpus data.
