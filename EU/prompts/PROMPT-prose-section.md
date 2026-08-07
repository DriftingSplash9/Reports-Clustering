# Prompt — the EU prose-section pass

Written 2026-08-07 (`EU/G.50.md` session). Paste everything below the line into a
fresh session. It is written to stand alone: it names the files, states the
standard, and says where the traps are, so the agent does not need the project's
history first.

This replaces the vaguer instruction in `MISSION-TODO-2.md` P1 item 5 ("the 399k
prose section runs as its own session"). The mode was decided by Thomas on
2026-08-07: **the agent works alone under the standing rules and produces a
findings file; nothing is imported until Thomas has read it.**

---

I'm working on the **Economic Report Influence Graph** at
`C:\Users\thoma\Desktop\My Files\Reports Clustering\`. It is a 3D graph in which
every node is a recurrently published official report and every edge is a
*documented* statement that one report uses another as an input. Everything rests
on one rule: **if no document says it, the edge does not exist.**

**Read these first, in this order, before doing anything:**

1. `Research.1.md` (project root) — the standing brief. §2 (the one rule), §4
   (what counts as a node, and termini), §5a ("comparable with" is not a
   dependency), §5b (tense), §6 (Part A format, the slice schema, and the
   `relations` array). The rules in it are not negotiable and are not summarised
   accurately anywhere else, including here.
2. `EU/G.50.md` — the branch's current state, in full.
3. `EU/prose-verification-list.md` — what an outside reader was asked to check
   and what came back. **Read this before you plan the session**; it determines
   how much of the material is mintable at all.

## The task

`EU/slices/_staging/20-prose-sections.txt` is 399,388 characters — the part of
the blob (`EU/EU Meta jsons.docx`) that the mechanical split could not parse,
because it was written as prose rather than as JSON records. **Nobody has ever
read it.** It holds **399 Part A entries** in two batches, both dated
2026-08-03:

- **The ECB batch, 23 entries.** Guideline (EU) 2015/510, the Eurosystem's
  General Documentation Guideline — standing facilities, the marginal lending
  facility, the deposit facility, the minimum-reserve framework, TARGET and
  settlement, and a set of climate-factor provisions its own extractor flagged
  as *"candidate, flagged not confirmed"*. All 23 cite one consolidated EUR-Lex
  text.
- **The budget batch, 376 entries.** Sections of the EU Draft General Budget —
  SEC00 (4), SEC01 (4), SEC02 (4), SEC03 (194), SEC07 (61), SEC09 (70),
  SEC10 (39). These carry a `FILE:` field naming an uploaded PDF, **not a URL**.

The blob itself stays where it is. It is the archive of record and will be
re-mined. Never edit or delete it, and do not edit `20-prose-sections.txt`
either — write new files.

## What the session produces

**A findings file, not a slice.** `EU/ProseSection_Findings_<date>.md`. Thomas
reads it and decides what gets built. Do not write to `src/data/research/`, do
not touch `src/data/index.ts`, and do not run an import. If you finish early,
the right thing to do is read more of the file, not start minting.

The findings file needs, for every candidate node and every candidate edge:

- the verbatim quote and its location, copied from the prose file **without
  tidying** — and a note saying whether that quote has been confirmed at source,
  by whom, and how (see *The verification problem* below);
- the direction, stated as `source depends on target`, with the reasoning;
- the proposed `relationship_type` — and if you are unsure between two, **say so
  rather than picking**;
- anything that trips §5a or §5b, quoted anyway as a documented *non*-dependency;
- anything that looks like a terminus (§4) — a form, a facility, a settlement
  system, a confidential collection. Those are nodes, not dead ends;
- any id that might collide with one already in `Research.1.md` §9.

Group the findings by which of the two batches they came from. The batches have
different evidence quality and mixing them hides that.

## The verification problem — read before planning

**This is the constraint that shapes the whole session.**

EUR-Lex broke on 2026-08-07 and the failure is documented in `EU/G.50.md`
Findings 4: direct fetches return HTTP 202 with a zero-byte body, and a real
browser is silently redirected to that day's Official Journal with the requested
CELEX id ignored. If that is still true when you run, **you cannot re-read the
ECB Guideline at source**, and this project's standing method note requires
inherited quotes to be re-read before minting. Try once — one fetch, one browser
attempt — and record the result either way. Do not spend the session on it.

The 376 budget entries are worse and in a different way: their source is a PDF
that was uploaded to a session that no longer exists. There is no URL to fail.
`EU/prose-verification-list.md` Block C sets out the two routes (re-upload the
PDFs, or substitute the published Draft Budget and re-locate every quote) and
why the second is a research task rather than a check.

So the honest range of outcomes is:

- **If the PDFs come back and EUR-Lex works**: this is a large, ordinary
  extraction session and you should expect real nodes and edges.
- **If neither**: this is a *cataloguing* session. Everything you produce is
  marked read-but-unverified, and its value is that the next session knows what
  is in the file and what it would be worth verifying. That is a real result —
  say so plainly in the findings file rather than padding it into something that
  looks like more.

**Under no circumstances mint from an inherited quote you could not re-read.**
The corpus has already caught one fabricated-but-plausible citation
(`AU/G.3.md` Corrections 2), and the fact that a quote's components each check
out proves nothing about the quote.

## Things to watch for, beyond the mechanical conversion

- **Does the ECB batch produce nodes at all?** Its own extractor recorded
  `AGENCY ONLY` on the very first entry, and a monetary-policy *facility* is not
  a published report. The interesting question is whether anything in it names a
  titled recurrent publication — and if the answer is no across all 23, that is
  a clean, citable result for priority C, which has been open for twenty
  hand-offs.
- **SEC03 was only partly read.** Its own batch header says Title 1 (Own
  Resources) was taken in full and *"everything else NOT YET EXTRACTED"* out of
  1,114 pages — yet 194 entries came from it. Work out which is true before
  relying on either statement, and report the discrepancy rather than resolving
  it.
- **SEC07, SEC09 and SEC10 are new to this branch.** Prior sessions sampled
  SEC03, SEC05 and SEC08 and concluded that ten of eleven Titles tested return
  nothing on the statistics watchlist. These three were never sampled. If they
  behave the same way, that finding gets stronger; if one of them doesn't, that
  is the most interesting thing in the file.
- **Contradictions inside the material are ideal findings.** Two passages
  disagreeing is a result. Report both and pick neither — `Research.1.md` §3 is
  explicit that adjudication is not the research role.

## When you finish

Write `EU/G.51.md` per the spec block carried at the bottom of `EU/G.50.md`,
copy that spec block forward verbatim, then run
`python3 scripts/handoff-to-json.py EU/G.51.md`. Commit with a descriptive
message. **You will probably not be able to push** — see the git-policy
amendment in `planning/MISSION-TODO-2.md`; if so, say so in the reply so Thomas
knows commits are waiting.
