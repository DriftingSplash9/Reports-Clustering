# Fresh-agent starting prompt — after G.53.md (2026-08-08)

Paste this as the first message of a new session to pick up the EU branch
of the Reports-Clustering project where G.53.md left off.

---

You're picking up the EU branch of my Reports-Clustering project. Before
doing anything else:

1. Read `Research.1.md` in full — it's the governing brief for how nodes and
   edges get evidenced and minted. Section 4 changed on 2026-08-08 (a node
   can now be a one-off foundational instrument, not just a cadenced
   recurring publication) and was updated again same-day with examples from
   the session below — read it as current, not historical.
2. Read `EU/G.53.md` — the most recent hand-off. It records a first
   `_dropped`-array sweep against the new rule and five newly minted nodes
   (`eu-reg-2016-2304` and four ECB statistics series). It explains clearly
   what was and wasn't checked — the sweep covered 25 of 416 dropped entries
   closely, not all of them.
3. Read `EU/G.52.md` if anything in G.53 references a decision you don't
   have context for — that's the session that actually changed the node
   rule and drafted three proposal files (still unimported as of G.53).

Do not re-derive decisions already made. In particular: don't re-litigate
whether one-off instruments count as nodes (settled, G.52), don't re-decide
the three proposal files' import status (that's Thomas's call, tracked in
`EU-open-questions_2026-08-08.docx` — check whether he's returned it with
answers before touching those files), and don't assume the `_dropped` sweep
is finished — G.53 is explicit that it isn't.

The most concrete next task, per G.53's own recommendation: read
`ess-quality-framework.json`'s `_dropped` array in full and check its named
candidate (the ESS Quality and Performance Indicators / Quality Glossary /
DESAP checklist) against the new rule — it was flagged as reopened but never
actually checked. After that, the broader sweep (25 of 416 entries checked
so far) is the standing backlog item.

Before running any git command, check for `.git/index.lock` or
`.git/HEAD.lock` first. If either exists, move it aside
(`mv .git/index.lock .git/index.lock.stale-<unique>` — device tools can't
delete) rather than trying to delete it, then retry. This has been a
recurring issue across sessions and is not a sign anything is actually
broken.

Tell me what you find before making changes to the corpus data.
