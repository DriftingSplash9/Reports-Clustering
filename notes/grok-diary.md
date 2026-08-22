# Grok diary — how to prompt Grok for this project

**Standing rule (Thomas, 2026-08-22): read this file BEFORE writing any
prompt for Grok, and append a dated lesson here after processing any Grok
reply. Every handoff must name this file's location
(`notes/grok-diary.md`).** This is the accumulated playbook; the prompts
themselves live beside it as `notes/grok-prompt-*.md`.

## §0 — Attachments: tell Thomas separately, every time (Thomas, 2026-08-22)

Grok cannot reach this project's files itself. Thomas physically attaches
whatever files Grok needs, in the browser, by hand — and he does **not**
carefully read the prompt text I write; he skims it or skips it entirely
("I trust you enough for this"). Round 3 came back with every listed file
marked not received, most likely because the attachment list lived only as
a line buried inside the pasteable prompt block.

**Fix, standing from now on: whenever I hand Thomas a Grok prompt, I must
also say — outside and separate from the prompt block itself, in my own
reply to him — exactly which files to attach, by filename.** Do not rely on
an in-prompt sentence ("Attach these files: ...") to do this job; that's
the thing that just failed. The prompt file on disk can still list the
attachments for the record, but the message that actually reaches Thomas
needs its own short, explicit "attach these N files" line he'll see even on
a skim.

## What Grok is for, and the ground rules that never change

Grok is the research scout for leads and sources this project's own agents
can't find. Its output is a LEAD, never a source: §2 rule 2 (no document, no
edge) and rule 3 (raw-verify every quote before trusting it) apply in full
to everything it returns, every time. Nothing Grok says gets minted until an
agent has opened the URL and confirmed the quote — the 2026-08-22
cross-border rounds verified 59/62 entries and the three failures were all
caught this way.

## What Grok is genuinely good at (don't over-constrain it)

- **Sourcing.** The cross-border rounds came back with real IMF DSBB pages,
  real press releases, real national-agency statements — zero fabricated
  documents, zero dead links, quotes overwhelmingly verbatim. Trust it to
  find; verify before you mint.
- **Honesty when asked for it.** Round 1 declined Iran/Afghanistan/Yemen/
  Syria rather than invent shaky claims — because the prompt explicitly said
  "null with an honest reason is a correct answer." ALWAYS include that
  permission; it's what keeps the output clean.
- **Responding to specific criticism.** Round 2 fixed all four named
  round-1 problems (third-party ODIN source, one recycled generic quote
  across five countries, two mis-aimed Japan quotes, Singapore's conflated
  dates) when each was called out concretely with what good looks like
  (Vietnam's own-country quote was named as the model). Vague "be more
  careful" asks do nothing; named failures with a named model work.

## Failure modes, with dates — prompt against ALL of these every time

1. **Invented ids (2026-08-22, round 2).** Every one of round 2's 15
   `source_report_id`s was invented (`SD-CBS`, `MU-Statistics-Mauritius`…)
   because the prompt never gave it the real ids. Round 1, which had the
   country files attached, used real ids throughout. **Fix: paste the exact
   corpus ids it may use, per country, into the prompt, and say invented
   ids fail our build. If an edge belongs to a report we don't have, it
   must propose a full new node (title/publisher/url/description), not an
   id.**
2. **Invented enum values (2026-08-22, both rounds).** Ten
   relationship_types, nine off our closed union — would NaN the whole
   PageRank if pasted through. It has also invented domains
   (`data-standards`) and, in earlier eras, off-union `reason:` values.
   **Fix: state the legal values verbatim in the prompt (relationship_type
   is exactly: `calculated_from`, `uses_data_from`,
   `methodology_depends_on`, `cites`) and give one line on how to choose.**
3. **Skips what isn't attached, silently-ish (2026-08-21, round 1).**
   SD/MU/SL were never processed because their country files weren't
   attached; only a buried note said so. **Fix: name the attachment list in
   the prompt itself and ask it to confirm per country what it received.**
4. **One generic quote recycled across countries (round 1).** Five
   countries shared one ASEAN sentence naming none of them. **Fix: demand a
   quote that names the country (or the agency), per edge.**
5. **Quote real, claim unsupported (round 1, Japan ×2).** The quote existed
   verbatim but was about something else. **Fix: say the quote must state
   the specific claim the edge makes, and that we check.**
6. **Third-party scorecards presented as sources (round 1, Iraq/ODIN).**
   **Fix: primary documents only — the government, the IMF, the treaty
   body; aggregator/scorecard sites are leads to chase, not citations.**
7. **Unverifiable citations (round 2, the UN p.826 PDF).** A real document
   cited at a location nothing can retrieve (page 826 of a giant PDF) is
   unusable. **Fix: ask for sources an ordinary fetch or browser can open
   and check — and page numbers when the document is long.**
8. **Grok's JSON is not reliably JSON (standing trap, §7).** Parse-check
   before reading anything from it.
9. **Paraphrase drift (2026-08-13, AF/G.17).** Its summaries of real
   documents contained errors its own quotes didn't — mint from the quote
   and the document, never from its paraphrase.
10. **Attachment list buried in-prompt, never actually attached (2026-08-22,
    round 3).** All 9 listed files came back marked not received. The prompt
    named them, but only as a sentence inside the pasteable block — Thomas
    doesn't read that closely (see the section above). **Fix: always surface
    the attachment list to Thomas separately, outside the prompt block,
    every round — not just once inside the prompt text.**

## The prompt shape that works (used rounds 2–3)

Conversational, appreciative where earned, then: numbered asks, each
concrete; named corrections with a named model of what good looks like; the
legal-values block (ids + relationship_type + existing target ids to reuse);
the honesty permission; a "How to reply" section fixing the JSON schema; the
attachment list. End by saying what we will do with the reply (raw-verify
everything) — it measurably improves citation discipline.

## Round log

- **Round 1** (received 2026-08-21, reviewed in 5q): 38 edges, 12 countries,
  8 proposed nodes. Good sourcing, four named problems, 3 id collisions with
  existing nodes, SD/MU/SL skipped (files not attached).
- **Round 2** (received 2026-08-22, verified in 5r): fixed all four
  problems, covered SD/MU/SL + the four thin countries. New failures: all 15
  source ids invented; relationship types still off-union. 59/62 combined
  evidence entries raw-verified; minted as 5s
  (`crossborder-standards-2026-08-22.json`, 10 nodes / 44 edges).
- **Round 3** (received 2026-08-22): came back thin and mostly off-target —
  `files_received` all false for the 9 listed source files, so it worked
  from the prompt text's Rule A id list alone rather than the actual
  country research files. Still produced usable methodology_depends_on/cites
  edges for MU/SL/IQ/SD/IR/AF/YE/SY with real, checkable sources (not yet
  raw-verified as of this writing) and 5 proposed nodes (mu national-accounts
  release, sna-1968, sna-1993, imf-bpm6, un-coicop, comesa-stats). Root
  cause: the attachment list was only named inside the prompt block, and
  Thomas doesn't read prompts closely before pasting them — see the
  standing fix at the top of this file. Next round's attachment list must
  be relayed to Thomas separately and explicitly.
