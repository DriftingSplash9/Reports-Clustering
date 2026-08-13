# Decisions — EU open questions, 2026-08-08

Source: `notes/EU-open-questions_2026-08-08.docx`, drafted by `G.52.md`,
answered by Thomas and returned 2026-08-08 (`G.56`). This file is the
durable record; the docx stays on disk but **this** is what future sessions
read. Answers are quoted verbatim.

---

## The thing to read first

**All three proposal files the docx reviews are gone.** `G.52.md` wrote them
to `/tmp/eu-proposal/` on that session's sandbox and said so:
"they'll need to be re-delivered or re-created by whichever agent picks this
up next, since `/tmp` doesn't persist across sessions." They were never
committed, never copied into the repo, and are not on disk anywhere under
`Reports Clustering` (searched 2026-08-08). `GROK-PROMPT-9` and
`GROK-PROMPT-10`, also left in that `/tmp`, are likewise absent from
`EU/prompts/`.

So the answers below are **rulings without artefacts**. Nothing can be
"imported"; the work has to be redone, and these rulings are what it has to
be redone *to*. That is a smaller loss than it sounds for File C (held
pending verification anyway, and it was Grok-sourced) and a real loss for
Files A and B (Wayback-corroborated German cadence figures, the
Luxembourg/Netherlands colophon finding, the France miss).

**Lesson, worth a standing rule**: a proposal file that is not in the repo
does not exist. Write drafts to `EU/proposals/` on the device, not to the
sandbox's `/tmp`, even when they are unreviewed — an unimported file in the
working tree costs nothing and a lost one costs a session.

---

## A. German EDP inventory & debt statistics

**A1 — one node or two dated nodes?**
> "2 dated nodes is making most sense"

Settled: the EDP inventory becomes two nodes, Dec 2015 and Oct 2025, not one
node with both editions in its description. This is now the corpus's stated
preference for a document with two known dated editions and no series page.
Note the tension to watch: `G.52.md` derived cadence (≈0.1/yr) from the
*interval between* the two editions, which is a property of the pair — with
two separate nodes each one needs its own `releases_per_year` justification,
and "latest observed interval" (`Research.1.md` §4) is still the rule that
supplies it.

**A2 — the 'ESA 95' wording inconsistency?**
> "flag only"

No note on the dependency edge, no resolution. Record it in the file's
`_dropped` array as a `note` and leave it.

**A3 — overall?**
> "import with changes"

The changes are A1 (split into two nodes) and A2 (flag only). Cannot be
executed until the file is rebuilt.

## B. DE/IE national accounts quality reports

**B1 — Ireland's cadence on a search-result title?**
> "hold Ireland back until it is opened"

Ireland is not minted until the 2018 PDF is actually opened. Germany stands.

**B2 — Ireland → `esa-2010` edge?**
> "yes."

Approved *in principle*, but it is gated by B1 and by its own evidence: the
opened portion was the title page only, so the methodology section has to be
read before the edge exists. B2 does not license minting the edge on the
strength of Germany's parallel.

**B3 — `cites` or `methodology_depends_on` for Destatis's quality report →
its own national-accounts release?**
> *(left blank in the docx)*

**Answered verbally instead, and recorded by `G.53.md`**: `cites` is
correct, it matches existing precedent in `ess-quality-framework.json`, and
it is not actually a new pattern for the corpus despite the drafter's
framing. Treat B3 as closed on that basis; do not re-ask.

**B4 — overall?**
> "import with changes."

Changes = Germany only, Ireland held.

## C. EU legal-instrument lineages

**C1 — uniform MFF-cycle cadence across all generations in a chain?**
> "Acceptable modelling choice"

**C2 — NDICI's other absorbed 2014-generation instruments (DCI, ENI, EIDHR…)?**
> "follow-up research"

A dedicated round to get the verbatim repeal-article text.

**C3 — CAP's second-order predecessors (1698/2005 behind 1305/2013,
73/2009 behind 1307/2013)?**
> "follow up"

**C4 — the three NDICI-predecessor nodes whose titles come only from NDICI's
own text (Decision 466/2014/EU, Regulation 2017/1601, Regulation 480/2009)?**
> "hold them"

**C5 — `eu-reg-2017-1601`, title supplied from background knowledge?**
> "confirm first"

Independent confirmation before it exists at all. (Worth saying plainly: a
title supplied from a model's background knowledge rather than a source is
exactly what `Research.1.md` §3 was written against.)

**C6 — FP6 behind FP7 (Decision 1982/2006/EC), NOT FOUND?**
> "dead end"

Accepted as a genuine dead end. Do not spend another pass on it.

**C7 — overall?**
> "hold pending a verification pass"

The whole file waits on independent re-verification, not a subset import.

## D. Cross-cutting

**D1 — the three new domain tags (`research-innovation`, `agriculture`,
`external-action`)?**
> "name as is"

Adopted under those names. **Not executed yet, deliberately**: the tags have
no customers until File C is rebuilt and verified (C7), and adding unused
members to the `Domain` union in `src/lib/types.ts` ahead of that buys
nothing. Add them in the same commit as their first tagged node, and add
them to `Research.1.md` §6's `domains` list at the same time.

**D2 — one-to-many `supersedes` (CAP repealing two predecessors)?**
> "one to many is fine"

Settled shape: one source, two `supersedes` relations, no splitting.

**D3 — a dedicated `_dropped` sweep across the whole corpus before more
new-country research?**
> "its worth a dedicated sweep next before going further"

**This is the branch's next task**, ahead of new countries and ahead of the
Catalogue-of-ESS-standards candidates. Method matters: `G.53.md` did a
keyword pass (25 of 416 entries read), and `G.55.md` proved keyword passes
are blind to the largest remaining class — entries wrongly dropped on too
narrow a search, whose stated reason reads sound until the source is
reopened (`Research.1.md` §4, third category). Go file-by-file over the ~15
files with the most `_dropped` entries and read each array in full. 391
entries were never individually read.

**D4 — the four UI/filter additions?**
> "leave the idea for now, just add to the to do list."

Not greenlit. Added to `planning/MISSION-TODO-2.md` P3 as item 23a.

**D5 — the two commits (8295de1, b41bee9) pushed?**
> "the last 2 commits are giving me troubles. Idk what to do."

Open, and **not something an agent may touch** — `Research.1.md` §2 forbids
any git command against this repo, including read-only diagnostics, because
git here cannot unlink its own `index.lock`. This needs Thomas in GitHub
Desktop, with an agent advising only from what he reports seeing. Almost
certainly the accumulated `.git/*.lock.stale*` files `G.53.md` flagged
(25+ of them, none deletable through the device bridge) plus a live
`index.lock`. See `G.56.md` for the advice given.
