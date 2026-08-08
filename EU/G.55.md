# G.55.md — EU galaxy hand-off

Date: 2026-08-08
Governing brief: `Research.1.md` — §4 edited this session (a queued candidate
closed, and a correction to how it was framed). No rule change.
Predecessor: `G.54.md` (2026-08-08, same day — process-only, the git-lock
session). The last substantive predecessor is `G.53.md`.

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only, not "just to check". `G.54.md` exists entirely to
   explain why: git on this repo, reached over the device bridge, cannot
   delete its own `index.lock` when a command finishes, so *any* git command
   an agent runs leaves a fresh stale lock and blocks Thomas's next commit in
   GitHub Desktop. If you need to know what is staged, committed or pushed,
   **ask Thomas** — he sees it instantly in GitHub Desktop. This session ran
   none, and hit no lock problems.
2. This session did the single task `G.53.md` and the after-G.54 starting
   prompt both named as next: read `ess-quality-framework.json`'s `_dropped`
   array in full and check its named candidate against the node rule. It is
   now closed. One node minted, one edge, the bundled `_dropped` entry split
   into four, `Research.1.md` §4 corrected.
3. `G.53.md` is still the substantive predecessor for corpus context (five
   nodes, the first `_dropped` sweep). `G.52.md` is where the node rule
   changed. Read both before doing new work.
4. `EU-open-questions_2026-08-08.docx` is **still with Thomas** and still
   gates the three proposal files from `G.52.md`. Nothing about that changed.
   Ask before touching those files.

## What got done

**The candidate turned out to be three candidates, and the flag on it was
wrong.** `ess-quality-framework.json` carried one `_dropped` entry, reason
`no-node-yet`, bundling the ESS Quality and Performance Indicators (2014), the
ESS Quality Glossary and the DESAP checklist, all dropped together for being
"one dated publication with no second edition and no stated review interval
found". `Research.1.md` §4 listed the bundle among the exclusions **reopened
by `G.52.md`'s one-off-foundational-instrument ruling**. It was not a case for
that rule, and the three do not share a fate.

**Minted: `ess-qpi-guidelines`** — *ESS Guidelines for the Implementation of
the ESS Quality and Performance Indicators*, Version 1.4 (2014), Eurostat.
Qualifies on the **ordinary recurring shape**, not the one-off route: the
title page carries "Version 1.4" and page 1 states its own revision history —
"These indicators were reviewed by the Eurostat Expert Group on Quality
Indicators in 2010 and then slightly updated by the Task Force on Quality
Reporting in 2012-2013". `releases_per_year: 0.13`.

**One edge**: `ess-handbook-quality-metadata-reports -> ess-qpi-guidelines`,
`methodology_depends_on`, resting on one sentence in the EHQMR **body**,
s. 3.2.2 (p.25): "The definitions and compilation methods for the QPIs are
specified in the ESS Guidelines for the Implementation of the ESS Quality and
Performance Indicators."

**The other two stay dropped, on reasons the cadence rule never touched.**
The Quality Glossary was not short of editions at all (first published 2003;
the Publications Office's EU Vocabularies register carries a 2023 version) —
it stopped being a document. The EHQMR s. 2.5.2: it "was transferred to the
Concepts and Definitions Database (CODED), where it is now available as a
theme", and the version the Handbook uses is its own Supplementary Document A.
Both routes are `part_of` something else, the same call that keeps ESMS and
ESQRS out of this slice. DESAP (published 29 March 2004, Annex VII of a
project report, no version or revision statement anywhere) fails §4 point 1:
everything that mentions it describes what the tool does rather than claiming
to take anything from it, and it is a blank checklist that publishes nothing
of its own. Recorded `no-document`.

**One trap recorded as a `caveat` on the new edge, deliberately.** The EHQMR
also says "SIMS incorporates the 16 standard ESS Quality and Performance
Indicators (QPIs) within the sub-concepts…" and "The ESQRS includes all 16
standard QPIs as separate sub-concepts". Neither supports an edge. Both
describe the indicator **set** living inside SIMS — `part_of`, the ESMS/ESQRS
shape. **The set is part of SIMS; the document that defines the set is not.**
That distinction is the whole reason the node is `ess-qpi-guidelines` and not
`ess-qpi`, and it is the thing a future session is most likely to get wrong.

## The finding that outlives the node

`G.53.md` drew a useful distinction between `_dropped` entries *reopened by
the rule change* and entries *worth re-checking now that it is cheaper to
qualify*. This one is neither. It was **wrongly dropped in the first place, on
a search that was too narrow** — the original record says so in its own words:
"Strings searched on the quality-reporting page and in the EHQMR foreword". A
webpage and a *foreword*. The QPI document itself was never opened, and the
EHQMR body was never searched; both contained exactly what the entry said did
not exist.

**A keyword pass over `_dropped` text cannot detect this class**, because the
stated reason reads perfectly sound until you reopen the source. That matters
for the 391 entries `G.53.md` left unswept: they cannot be cleared by regex,
and "the reason looks fine" is not evidence. When an entry's blocker is
`NOT FOUND` or "no cadence stated", check *what was actually searched* before
accepting it — a foreword, a webpage and a PDF body are three different
searches. Recorded in `Research.1.md` §4 as a third category alongside
`G.53.md`'s two.

## Files changed

- `src/data/research/ess-quality-framework.json` — +1 report, +1 dependency,
  `_dropped` 8 → 12 entries (one bundled entry replaced by three, plus one new
  `caveat`), `_status` and `_open_questions` updated. Original reasoning
  preserved verbatim under each replacement, same convention as
  `esa2010-quality-reporting.json`'s 2016/2304 resolution.
- `EU/slices/eu-level/ess-quality-framework.json` — mirrored, byte-identical
  to the canonical copy (they were identical before this session too).
- `EU/ESSQPI_PartA_2026-08-08.md` — new. The Part A record: nine entries
  across the three candidates, every quote re-read at source this session.
- `Research.1.md` — §4's forward pointer rewritten (candidate closed, framing
  corrected, third sweep category added); §9's stale-registry flag now names
  `ess-qpi-guidelines` as a sixth id not folded into the list.

Both JSON copies parse (`json.load`). **`npm run validate` was not run** —
`G.53.md` records it as unrunnable from the device-bridge shell (esbuild
win32/linux native-binary mismatch, environment not code). Nobody has had a
clean validate run since the schema change three sessions ago. Still worth
Thomas running once locally; it is the only outstanding check on this work.

## Part B — soft connections

**None new.** The one relationship this session found is minted, in Part A
terms, in the slice. Nothing provisional was left over and no soft connection
was created or resolved, so `EU/PartB_soft_connections_2026-08-04.md` is
unchanged and still current as of its own date. The three genuinely open
questions in `ess-quality-framework.json` are unchanged and are not soft
connections in the §11 sense — they are recorded in the file's own
`_open_questions`: the CoP → peer-review reverse leg, the `cites` /
`methodology_depends_on` judgement on the EHQMR → CoP edge, and the
"Catalogue of ESS standards" as an unscoped node class.

## Priorities from here

1. **Regenerate `Research.1.md` §9's EU node-id registry in one pass.** It is
   now at least eleven ids stale (`G.47`–`G.52` era, `G.53`'s five, and this
   session's one) and has been flagged twice without being done. Mechanical,
   no research, no judgement: extract every `"id"` from every report in
   `src/data/research/*.json` whose `country` is `EU`, an EU-27 code or an
   `XEU` code, plus the branch-minted `INT` ids, and replace the block. It
   gets less pleasant every session it is deferred.
2. **The Catalogue of ESS standards.** Named in `ess-quality-framework.json`'s
   own `_dropped` array and still unscoped: the EHQMR describes itself as
   "included in the Catalogue of ESS standards, the collection of
   non-legislative normative documents underpinning the ESS". A named
   collection of normative documents is exactly the shape that produces nodes
   here, and **none of its members other than the four now minted from this
   slice has been looked at.** Bounded, high-probability, and sits directly on
   top of this session's work — the natural continuation.
3. **The rest of the `_dropped` sweep, but not by regex.** 391 entries were
   never individually read, and this session showed keyword matching is blind
   to the largest remaining class. Better: go file-by-file over the ~15 files
   with the most `_dropped` entries and read each array in full, rather than
   another string pass over all 66.
4. **Then `Research.1.md` §8 Items 5–7** — Eurostat's structural publications,
   the remuneration thread's three unfinished cheap checks, and France/Italy as
   the next NSIs.

**For Thomas specifically**, two things only he can do: return
`EU-open-questions_2026-08-08.docx` (it gates `G.52.md`'s three proposal files,
which have now been waiting three sessions), and run `npm run validate` once
locally.

## Repo state as of this session's end

Not checked, deliberately — see item 1 of the orientation. This session wrote
four files: the two `ess-quality-framework.json` copies, the new
`EU/ESSQPI_PartA_2026-08-08.md`, and `Research.1.md` (which already had
uncommitted changes from `G.53`/`G.54` before this session touched it). Whether
any of the earlier sessions' work is committed is unknown to this agent and
should be read off GitHub Desktop, not off a `git status`.
