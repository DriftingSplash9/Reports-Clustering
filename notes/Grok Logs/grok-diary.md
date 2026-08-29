# Grok diary — how to prompt Grok for this project

**Standing rule (Thomas, 2026-08-22): read this file BEFORE writing any
prompt for Grok, and append a dated lesson here after processing any Grok
reply. Every handoff must name this file's location
(`notes/grok-diary.md`).** This is the accumulated playbook; the prompts
themselves live beside it as `notes/grok-prompt-*.md`.

**This file is not what Grok reads.** It's Claude's own lessons-learned log
for writing good prompts — Grok never sees it, since (per §0 below) Grok
can't reach this project's files itself. The document that actually gets
pasted/attached to Grok every time is
`notes/grok-research-queue-2026-08-22/GROKREADME.md` — added 2026-08-22
alongside the numbered per-region prompts in that same folder, so the
relationship-type enum, the id-integrity rule, the honesty permission, the
coverage-is-data-driven principle, and the reply-JSON schema live in ONE
place instead of being retyped into every regional prompt. With 60+ more
countries still queued, that repetition was real: attach `GROKREADME.md` to
every prompt from now on, and when writing a NEW regional prompt, put only
the region-specific research question in it — everything generic belongs
in GROKREADME.md, not copy-pasted in again.

**2026-08-22, same day, follow-up fix:** the BC round (01) came back with
prose wrapped around the JSON, sometimes invalid JSON outright, and nothing
Thomas could just download — he had to hand-extract the data from a chat
reply. Partly self-inflicted: GROKREADME.md used to ask Grok to *confirm
what it received in prose before the JSON*, which invited exactly that
mixing. Fixed: GROKREADME.md now demands one fenced code block and nothing
else, with confirmations folded into a `_meta` field inside the JSON, plus
an explicit "stay in scope, don't narrate" rule. **Fix for future prompts:
never ask Grok to say anything in prose outside the code fence — if you
want it to confirm or report something, give it a JSON field to put that
in, not a sentence to write.**

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

## Coverage is data-driven, not density-driven (Thomas, 2026-08-22)

The graph represents the actual network of official reports and the
dependencies that can be evidenced from primary documents. For any
jurisdiction, research stops when additional primary sources stop adding
real, verifiable nodes or edges. Head-count targets, parity with other
countries or provinces, or "density" relative to already-closed layers are
not criteria. Artificial completeness targets are outside the model.

This was made explicit on 2026-08-22 during the British Columbia
domestic-layer work (see failure mode 12 below), and it applies to every
jurisdiction, not just BC. Put it in every prompt, and don't accept a reply
that justifies itself by pointing at another region's coverage.

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
11. **A specific claim repeated across rounds without new evidence
    (2026-08-22, round 3 redo).** Grok re-supplied the same two Afghanistan
    CR 06/251 GDDS quotes in round 3 that round 1/2 already couldn't verify
    (that edge's basis has carried a "quote could not be independently
    retrieved" caveat since round 1/2). This time the actual document was
    read in full and the quotes genuinely aren't in it — not a retrieval
    failure, a real miss. **Fix: when a prior round already flagged a claim
    as unverified, say so explicitly in the next prompt and ask Grok to
    either find a *different* corroborating document or drop the claim —
    don't let it re-assert the same unverified quote a third time.**
12. **Benchmarking coverage against other regions instead of against primary
    sources (2026-08-22, British Columbia).** While researching BC's
    domestic layer from scratch, Grok kept describing its own output as
    "good" or "on par" by comparing BC's node count/density to Alberta's or
    Ontario's already-built layers, rather than by whether more primary
    sources actually existed to check. That's backwards: see the standing
    rule above — coverage is data-driven, not density-driven. **Fix: state
    that rule explicitly in every prompt, and reject any reply that argues
    completeness by pointing at another jurisdiction's coverage instead of
    at exhausted primary sources.**
13. **gy-caricom is a Guyana-specific membership record, not a generic
    CARICOM node (2026-08-25, Caribbean/OECS new-countries round).** Grok
    proposed `cites -> gy-caricom` for seven other CARICOM members (JM, TT,
    BS, BB, HT, AG, LC), each evidenced with that country's OWN CARICOM
    profile page — but wired to a node whose actual title/description is
    scoped to Guyana ("Guyana's principal formal integration framework").
    The underlying claim (each of those countries is a real CARICOM member)
    was fine; the target was wrong. Caught on the verification pass, not by
    Grok itself. **Fix: when a proposed edge's evidence is generic to a
    bloc/institution but the only existing node for that bloc is filed
    under one specific member country's id, don't reuse it — flag for a
    dedicated node (e.g. `int-caricom`) instead of wiring everyone through
    one country's membership record.**
14. **`basis_quote`/`basis_verbatim_note` as separate JSON keys instead of
    inline in `basis` (2026-08-25, Belarus/NK new-countries round).** One
    verification agent split the quote into its own field rather than
    folding it into the single `basis` string the schema asks for, and
    flagged the deviation itself rather than silently shipping it. **Fix:
    restate the exact `basis` shape (one string, ending in a verbatim quote)
    in the schema doc every time — evidently "ending with a verbatim quote"
    reads ambiguously enough that a careful agent still reaches for a
    separate field instead.**

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
- **Round 3, first attempt** (received 2026-08-22): came back thin and
  mostly off-target — `files_received` all false for the 9 listed source
  files, so it worked from the prompt text's Rule A id list alone rather
  than the actual country research files. Root cause: the attachment list
  was only named inside the prompt block, and Thomas doesn't read prompts
  closely before pasting them — see the standing fix at the top of this
  file (§0).
- **Round 3, redo** (received 2026-08-22, same day, after the §0 fix):
  `files_received: true`, 10/10 files, and the content demonstrably used
  the actual attached country files (real existing ids like `af-nsia`,
  `mu-statsmauritius-cpi` that only appear in those files, not just the
  prompt's own id list) — the fix worked. Delivered: the Mauritius
  SNA-2008 edge done properly this time (new `mu-national-accounts` node +
  quote), two additional Mauritius SDDS-Plus series-level edges, and three
  new standards facts for AF/IQ/IR. Raw-verified and minted as 5w
  (`crossborder-round3-2026-08-22.json`, 1 node / 5 edges). One repeat
  failure: the Afghanistan CR 06/251 GDDS quotes it re-supplied (same two
  sentences as round 1/2, which also couldn't verify them) failed
  verification again — the actual 89-page PDF was read in full this time
  (Google Docs Viewer proxy workaround, see HANDOFF.md §7) and neither
  quote, nor "GDDS"/"General Data Dissemination"/"imminently" in any form,
  appears anywhere in the document. Two rounds straight on the same claim;
  don't ask Grok for it a third time — tell it the claim doesn't check out
  and let it move on.
- **Prompt 18 (wiring, South America Atlantic coast — UY/PY/GY/SR domestic
  layer)** (received/processed 2026-08-25): 5 proposed edges, raw-verified
  4/5. Minted `sa-atlantic-wiring-grok-2026-08.json` (4 deps: PY national
  accounts -> SNA 2008, SR CPI -> CPI Manual, SR GDP -> e-GDDS, UY foreign
  trade -> HS). One drop: SR CPI -> COICOP, edition-ambiguous (source names
  "COICOP" with no year, and the corpus carries both `un-coicop-hbs-1999`
  and `un-coicop-2018` as separate nodes) — dropped `wrong-target` per the
  edition-matching rule rather than guessed from the survey's vintage.
- **Prompts 30-37 ("new countries" tier, 62 countries, zero prior corpus
  presence)** (received/processed 2026-08-25): 8 parallel verification
  agents, one per region (Caucasus/Central Asia/Mongolia, South Asia,
  Gulf/Levant, Southeast Asia, Central America, Caribbean/OECS,
  Belarus/North Korea, Pacific microstates), each independently raw-
  verifying against live primary sources with a shared reference package
  (id/edge cross-check lists, schema doc, example nodes). Combined result:
  130 reports, 109 dependencies minted across 51 countries (11 countries —
  including North Korea, and several OECS microstates deferred as
  low-priority per their prompt's own instruction — returned zero nodes,
  an honest null rather than a stretch); 74 honest drops. Cross-checked all
  8 groups against each other and against the live corpus before minting:
  zero id collisions, zero duplicate edges, zero dangling references.
  Needed two post-hoc fixes the agents' own corpus-slice reference
  couldn't catch: a `_dropped`/`note` entry (`bn-national-accounts ->
  sna-2008`) that actually matched a live edge minted from a stronger
  source in the same file — reclassified `caveat` (the reason that's
  explicitly allowed to match a live edge) rather than `note`; and the
  gy-caricom scoping problem (lesson 13, above) — 7 Caribbean edges moved
  from `dependencies` to `_dropped`/`wrong-target`. Also required 51 new
  `COUNTRY_FAMILY` (palette.ts), `CONTINENT_OF` (regions.ts) and
  `COUNTRY_LABEL` (palette.ts) entries — `npm run validate` catches missing
  ones as hard errors, not warnings, and none of the per-region agents were
  scoped to touch those files. Final combined corpus: 3,384 reports / 2,589
  dependencies, `npm run validate` 120/120, `tsc --noEmit` clean, `npm run
  build` clean.
- **`int-caricom` node added, 2026-08-25 (Thomas: "add the dedicated node")**
  — closed lesson 13/HANDOFF §5 item 5b same day it was flagged. Verified
  CARICOM's own site live (`caricom.org/who-we-are/`: established 4 July
  1973, Treaty of Chaguaramas, 15 members + 8 associate members) before
  minting the node, then retargeted the 7 held-out `cites` edges from
  `gy-caricom` to `int-caricom` — no new research needed, their basis/
  evidence_url were already verified and preserved verbatim in the
  `_dropped` entries. `gy-caricom` left untouched (Guyana's own membership
  record, still zero edges — a separate rescope question, not this pass's
  call). Corpus 3,385/2,596, validate 120/120, tsc/build clean.
- **Prompt sent 2026-08-28, processed same day** (`notes/grok-prompt-unlinked-2026-08-28.md`
  → reply `unlinkednodefollowup20260828.json`) — 3 of 4 leads closed, all
  raw-verified before minting per rule 3 (a pointer is not a source). Taiwan
  ISIC (`tw-business-demography -> isic`): confirmed verbatim via direct curl
  fetch of two ws.dgbas.gov.tw PDFs (an Executive Yuan directive + DGBAS's own
  draft explanation), TLS verification disabled to reach the domain — its
  certificate chain is genuinely broken (independently confirmed, not a proxy
  artifact); content came over unmodified and matches independently-indexed
  search snippets. Philippines MFSMCG (`ph-financial-system ->
  imf-mfsmcg-2016`): confirmed verbatim via two BSP primer PDFs (CBSandDCS.pdf,
  OFCS.pdf), with an exact byte-size match (64,739 / 66,316 bytes) as extra
  corroboration; one PDF needed a retry after a transient connection reset.
  Taiwan COICOP-2018-CPI lead did NOT hold — DGBAS's own CPI metadata
  confirms the basket is still the traditional 7-division structure — but it
  surfaced a real adjacent find Grok itself flagged in `notes_not_proposed`:
  `tw-national-accounts -> un-coicop-2018` (Taiwan's Nov-2024 five-year
  national-accounts revision adopted COICOP 2018 for the private-consumption
  component specifically, not the CPI), verified via a DGBAS staff article PDF
  and minted. Mexico's 3 Benito Juárez edges (census/economic-census/DENUE)
  did NOT verify: 6 independent attempts (direct curl x4 with retries, Wayback
  Machine availability API + fetch, WebFetch on the Wayback copy) all failed
  to reach the IPDP CDMX PDF Grok cited. Not minted — Grok's exact quotes
  preserved in the slice's `_dropped` entries (reason `deferred`) for a future
  session with a working browser tool to close in one fetch. Net: +3 edges,
  corpus 3,468/2,807, validate/tsc/build clean. Lesson: Grok's
  byte-identical-size claim for a PDF it couldn't quote directly (OFCS.pdf)
  was still useful corroboration once we fetched the file ourselves and
  matched the size — a cheap secondary check worth asking for whenever a
  primary quote match is uncertain.
