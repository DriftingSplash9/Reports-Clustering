# G.53.md — EU galaxy hand-off

Date: 2026-08-08
Governing brief: `Research.1.md` §4 — two new nodes' worth of examples added
this session, no rule change (the rule itself is `G.52.md`'s, dated
2026-08-08 too).
Predecessor: `G.52.md` (2026-08-08, same day).

## Orientation — if you are a new agent, start here

1. Read `G.52.md` first if you haven't — it's the session that changed the
   node rule (one-off foundational instruments now admitted; recasts read as
   recurring; irregular cadence allowed via latest-observed-interval). This
   session (`G.53`) did no rule work. It did two things: ran a first
   `_dropped`-array sweep against the new rule, and minted five nodes the
   sweep surfaced.
2. **Nothing from `G.52.md`'s three proposal files is imported.** That
   decision track is untouched — Thomas has been reviewing
   `EU-open-questions_2026-08-08.docx` in parallel with this session's work,
   answered A/B/C/D through D4 with import/hold/change calls per section, and
   is expected to finish B3 (relationship_type for a Destatis quality-report
   self-citation edge — verbal answer already given in conversation: `cites`
   is correct, matches existing precedent in `ess-quality-framework.json`,
   not actually a new pattern for the corpus despite the drafter's framing)
   himself in the docx. **Do not re-derive A/B/C's import calls — read his
   answers when he hands the file back, same instruction `G.52.md` gave.**
3. This session's actual data changes are in two files, both under
   `src/data/research/`, both already the canonical copies (see item 5):
   `esa2010-quality-reporting.json` (+1 node, +1 edge) and
   `eurostat-edp-gfs-ecb-statistics.json` (+4 nodes). Full detail below.
4. **Everything is uncommitted.** Thomas commits through GitHub Desktop
   himself; this session did not run `git commit`/`git push`. If you are
   picking this up fresh, check `git status` before assuming the corpus file
   count below reflects what's on `origin/main` — it may still be sitting as
   working-tree changes.

## Session conditions

This was a sweep-and-mint session, not a drafting session — no proposal
files, no Grok involvement. Every claim below was checked directly this
session: the corpus's own schema and existing data (`src/lib/types.ts`,
`src/lib/graph.ts`, and grep across `src/data/research/*.json` for existing
`relationship_type`/domain usage), and live web sources for the five newly
minted nodes (EUR-Lex for 2016/2304, the ECB Data Portal's live
`data-information` pages for the four ECB series). Nothing here rests on a
prior session's unverified claim without saying so.

## What got minted

**`eu-reg-2016-2304`** (`src/data/research/esa2010-quality-reporting.json`).
Commission Implementing Regulation (EU) 2016/2304 — the instrument that
structures the annual national-accounts quality reports Member States submit
under ESA 2010. Previously excluded by the file's own `_dropped` array under
the *exact* clause `G.52.md`'s rule replaced ("something published once is
not a node"). Re-checked against EUR-Lex this session: still no
consolidated/amended version, still a genuine one-off (no predecessor named
anywhere), so it qualifies cleanly as a one-off foundational instrument.
`releases_per_year` is absent (evergreen, not guessed). Added a
`methodology_depends_on` edge from `eurostat-national-accounts-quality-report`
to it — that node's own `description` already named 2016/2304 as what
structures it; the edge had been sitting implicit for want of a target. The
original `_dropped` entry is kept, converted to a resolution note with the
original reasoning preserved underneath (same convention as
`gb-ukspf-succession.json`'s resolution record and the AU CGC entry) —
nothing is deleted from the research trail.

**Four ECB series** (`src/data/research/eurostat-edp-gfs-ecb-statistics.json`),
all previously filed as `_dropped` leads for lacking a checked cadence
statement, not for failing the old cadence rule outright — none of these
needed `G.52.md`'s rule change at all, they just hadn't been looked at live:

- `ecb-supervisory-banking-statistics` (SUP) — quarterly, `releases_per_year: 4`.
  ECB Data Portal, live: "The supervisory banking dataset is updated on a
  quarterly basis." Flagged (not adjudicated) the same shape of loose end the
  sibling `ecb-consolidated-banking-data` node already carries: some
  general-government exposure breakdowns are collected semi-annually rather
  than quarterly.
- `ecb-insurance-corporations-operations` (ICO) — annual, `releases_per_year: 1`.
  ECB Data Portal, live: "Time period: Annual", "Frequency of data
  collection: Annual." The original `_dropped` entry bundled ICO with ICB
  under one heading; only ICO was resolved in the first pass.
- `ecb-investment-funds-balance-sheet-statistics` (IVF) — monthly headline
  series, `releases_per_year: 12`. ECB Data Portal, live: "Time period:
  Monthly, except for certain detailed breakdowns which are collected
  quarterly." The quarterly sub-breakdowns are treated as a secondary tier of
  the same series, not a second node.
- `ecb-insurance-corporations-assets-liabilities` (ICB) — quarterly,
  `releases_per_year: 4`. ECB Data Portal, live: "Quarterly data are reported
  by close of business on the 40th working day... following the end of the
  quarter." Completes the ICB/ICO pair; both halves of the original bundled
  `_dropped` entry are now minted, nothing left open on that specific entry.

One deliberate non-domain: `ecb-insurance-corporations-operations` and
`ecb-insurance-corporations-assets-liabilities` are both tagged
`financial-regulation` for lack of a better fit — **the corpus has no
`insurance` `Domain` value**, and this is the first pair of nodes that would
actually want one. Flagged in each node's own `cadence_note` as a judgement
call, not resolved by adding a new tag unilaterally (same posture `G.52.md`
took toward the three new domain tags in its unimported File C — a tag
addition is cheap to do but easy to get wrong by doing it alone, so it's
surfaced rather than decided here).

Both edited files pass `python3 -c "import json; json.load(...)"` (valid
JSON) and `npx tsc --noEmit` (clean, zero errors) as of this session's end.
`npm run validate` still cannot run cleanly from the device-bridge shell —
same esbuild win32/linux native-binary mismatch `G.52.md` already flagged,
environment not code. **Still nobody has gotten a clean `npm run validate`
run since the schema change two sessions ago — genuinely worth Thomas running
it once locally**, not just a repeated caveat to note and move past.

`Research.1.md` §4 was updated to record the above (2016/2304's resolution,
the four ECB mints, and which two `_dropped` candidates are still open — the
ESS Quality Framework file's own reopened candidate, never checked this
session, and Commission Recommendation 2023/397, deliberately deferred by
Thomas rather than adjudicated here since soft law is a step below what the
rule names). §9's EU node-id registry got a flag, not a rewrite — it was
already stale before this session (missing ids from `G.47.md` on) and this
session's five new ids are noted as *not* folded into the list rather than
patched in by hand. A full regeneration is one clean extraction pass
(`"id"` field from every `country`-matching report in
`src/data/research/*.json`) and is worth doing in one go rather than
incrementally — flagged, not done, since it touches nothing this session
actually changed.

## The `_dropped` sweep — method and honest scope

`G.52.md`'s open question D3 asked whether the whole corpus's `_dropped`
arrays were worth sweeping against the loosened cadence rule before more
new-country research starts. Thomas's answer: yes, and make it the next
agent's first task. This session did a first pass, not a complete one:

- 66 of the corpus's ~107 JSON files carry a `_dropped` array; 416 dropped
  entries total across them.
- A broad keyword regex (cadence/periodic/irregular/recurring/one-off/
  frequency/non-recurring/etc., anywhere in the entry) matched 77.
- A tighter regex targeting phrases that are actually the *stated blocking
  reason* (`blocked on cadence`, `no cadence`, `Periodicity: non-recurring`,
  `single edition`, `one-off`, `cadence alone`, etc.) narrowed that to 25,
  and those 25 were read in full, by hand, this session.
- Of those 25: one was the clean 2016/2304 hit (minted); several were the
  German EDP/GNI inventory dependency edges already covered by `G.52.md`'s
  unimported proposal File A (not new findings — they'll need promoting once
  File A is imported, not before); three ECB stats leads turned out to be
  cadence-checkable now, not cadence-*blocked* (minted, see above); the rest
  were checked and correctly stay excluded — IMF Article IV / OECD Economic
  Survey single-edition citations (the recurring *series* is the nodeable
  unit, not one edition, and that didn't change), a Commission Recommendation
  (soft law, deliberately deferred, see above), and a handful of genuinely
  unpublishable sources (a private valuer's 1998 valuation, CRA tax-form
  inputs, OTC quote composites) unrelated to cadence at all.

**The other 391 dropped entries, and the 52 entries the broad-but-not-tight
keyword pass caught (77 minus 25), were not individually read this
session.** Nor were the 41 files with `_dropped` arrays that returned zero
keyword hits at all — a keyword-only pass can miss an entry that's cadence-
blocked in substance but doesn't happen to use any of the searched words. If
"sweep the corpus" was meant as *every* entry checked by hand, that work is
still ahead, not done. What's true is: the highest-probability candidates
(anything using cadence-adjacent language) got a real, cited, checked-not-
assumed pass, and the corpus is not sitting on an obvious backlog of missed
one-off instruments the way it was before `G.52.md`.

**One specific file worth a dedicated look next**: `ess-quality-framework.json`
— named directly in `Research.1.md` §4's own text (before this session
touched it) as carrying a second reopened candidate (the ESS Quality and
Performance Indicators / Quality Glossary / DESAP checklist) that this
session's regex passes did not independently confirm or check. Worth being
the first thing the next sweep pass reads in full, rather than trusting the
brief's own forward pointer without verifying it.

## Repo state as of this session's end

Working tree has three changes, none committed: `Research.1.md`,
`src/data/research/esa2010-quality-reporting.json`,
`src/data/research/eurostat-edp-gfs-ecb-statistics.json`. `notes/country.docx`
is still untracked and still Thomas's own file, unrelated to this branch's
work — left alone, same as `G.52.md` noted.

**The `.git/*.lock` situation is worse, not better.** `G.52.md` described it
as recurring-but-expected friction; this session hit a *fresh* `index.lock`
three separate times (once mid-session, once after the ECB mints, once
visible in Thomas's own GitHub Desktop "Commit failed" screenshot with an
attempted commit message of "icb/ucb"). Each time, `mv`-ing it aside (device
tools can't delete) cleared it and the next GitHub Desktop commit attempt
should succeed — but the `.git/` directory now has on the order of 25+
`*.lock.stale*` files accumulated across sessions, purely because nothing
running through the device bridge can delete them. **This is worth Thomas
doing a manual cleanup pass in File Explorer** (delete anything matching
`.git/*.lock.stale*`) — cosmetic, not a functional problem, but it's not
self-resolving and it's not small anymore.

If you are a fresh agent picking this up: before doing anything with git,
run `git status` and check for `.git/index.lock` or `.git/HEAD.lock` first —
if either exists, `mv` it to `<name>.lock.stale-<something-unique>` rather
than trying to delete it, and only then run the git command you actually
wanted.
