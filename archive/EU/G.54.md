# G.54.md — EU galaxy hand-off (short)

Date: 2026-08-08
Governing brief: `Research.1.md` — one new standing rule added this session
(agents do not touch git on this repo, see below). No node-rule change.
Predecessor: `G.53.md` (2026-08-08, same day).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not a read-only check "just to see." This is the one thing
   this hand-off exists to make sure you know before you do anything else.
   See "What happened" below for why, and see `Research.1.md`'s Session git
   policy section for the rule as adopted. If you think you need to know
   what's staged, committed, or pushed, ask Thomas — he can see it directly
   in GitHub Desktop in half a second, and you asking costs nothing, while
   you checking yourself has a real, demonstrated cost (see below).
2. This session did no corpus or research work. `G.53.md` (same day, just
   before this one) has the actual substance — five newly minted nodes, a
   `_dropped`-array sweep, an updated `Research.1.md` §4. Read that one for
   content. This one is purely a process correction.
3. Thomas still has `EU-open-questions_2026-08-08.docx` (from `G.52.md`) in
   progress — nothing about that changed either.

## What happened

Across `G.53.md` and the session immediately following it, Thomas hit a
"Commit failed — a lock file already exists" error in GitHub Desktop
repeatedly, even after the agent (in both sessions) moved the stale
`.git/index.lock` out of the way each time. The lock kept coming back
almost immediately. Two wrong theories were tried and discarded in order:

1. **Leftover locks from earlier interrupted sessions** — real, and part of
   why `.git/` had ~25 `*.lock.stale*` files piled up (Thomas cleaned these
   out by hand in File Explorer, see his own screenshot in this session).
   But this didn't explain the lock regenerating *immediately* after being
   cleared.
2. **GitHub Desktop's background auto-fetch** — looked plausible because a
   freshly-created `index.lock` once shared an exact timestamp with a
   freshly-written `FETCH_HEAD`. Thomas fully exited GitHub Desktop to test
   this. The lock came back anyway, with `FETCH_HEAD` untouched — ruling
   this out.

**The actual cause: the agent's own `git status` calls.** This
environment's git, run over the device bridge against this repo, cannot
delete its own lock file when a command finishes — every git command run
this session printed `warning: unable to unlink
'.../.git/index.lock': Operation not permitted` in its output, whether or
not a lock was already present going in. `git status` normally takes a
brief internal lock to refresh the index's cached file-stat info, then
releases it. Here, it takes the lock, does its work, and then fails
silently (well — not silently, it warns, but the warning was being treated
as routine noise rather than read as "this command just broke something")
to release it. So the agent's diagnostic loop was: clear the lock → run
`git status` to confirm it's clear → that status call leaves a brand new
lock → Thomas tries to commit → fails → reports back → repeat. The agent
was the recurring cause of the problem it kept being asked to fix.

## What changed

`Research.1.md`'s Session git policy section (§2) now has a rule: **agents
do not run git commands against this repo at all**, diagnostic or
otherwise. The corpus work itself — editing JSON, writing hand-offs — never
needed git; committing and pushing was always Thomas's own action through
GitHub Desktop, not something an agent did or checked on his behalf. See
the brief for the rule as written; the short version is *if you want to
know git state, ask, don't check*.

## Repo state as of this session's end

Unknown to this agent, deliberately — see above. Thomas confirmed the
working tree had three modified files and two new untracked files as of
`G.53.md`'s end (`Research.1.md`, `esa2010-quality-reporting.json`,
`eurostat-edp-gfs-ecb-statistics.json`, plus `EU/G.53.md` and
`EU/prompts/AGENT-PROMPT_after-G53_2026-08-08.md`). This session added a
further edit to `Research.1.md` (the git-policy addition above) and this
file. None of it has been confirmed committed by this agent, on purpose.
Check with Thomas, or look yourself in GitHub Desktop if you're a human
reading this — an agent should not run `git status` to find out.

**On lock files, if Thomas asks you to clear one for him**: `mv` it into
the repo's `_to_delete/` folder at the root (not a `.stale` rename in
place) — that's his stated preference as of this session, so he can bulk-
delete the folder himself from File Explorer whenever he wants, rather than
picking through renamed files scattered across `.git/`.
