# SEC09/SEC10 reconciliation — `EU Meta jsons.docx` vs. the current corpus record

**The oldest item on this branch's backlog.** Flagged in every hand-off from
`G.29.md` through `G.44.md` (16 sessions) as "reconcile `EU Meta
jsons.docx`'s SEC09/SEC10 batches against `SEC08-SEC09-SEC10_PartA_2026-08-05.md`,"
never opened until this session.

## What this compares

- **`EU Meta jsons.docx`'s `SEC09-2026-08-04-A1` and `SEC10-2026-08-04-A1`
  batches** (dated 2026-08-04, one day before the current corpus record) —
  each states explicitly "nothing left unextracted." SEC09: ~35+ entries at
  table/Remarks/Legal-basis granularity. SEC10: 35 entries, "of which 8
  boilerplate entries cover 82 individual locations."
- **The current corpus's `EU/SEC08-SEC09-SEC10_PartA_2026-08-05.md`**, which
  covers SEC09 in 2 entries (S09-01, S09-02) and SEC10 in 3 (S10-01, S10-02,
  S10-03) — a single money-gap finding and a single headcount finding per
  section, plus SEC10's MFF-tag finding.

## Verdict: the two do not conflict, and the docx version is far richer

**No factual contradiction found.** Both records agree on the core
money-gap finding for both sections (narrative totals do not reproduce from
the expenditure tables) and the current record's SEC10 MFF-tag finding
(`DISC-07-03`, the `X` placeholder) is independently confirmed and *further
specified* by the docx's own close notes. **But the docx batches contain
roughly 15x the granularity**, and several of its findings are not
represented in the current record at all. One of the most striking claims
was independently spot-checked against `EU/SEC09.pdf` directly this session
(below) and held up.

## Verified this session

**The EDPB translation-agreement tension** (docx finding, `S09-004`/`S09-060`):
fetched `EU/SEC09.pdf` directly via `pypdf`. The introduction states: *"The
growth in Title 3 is mainly due to the European Commission's unilateral
termination of the SLA with the DGT, which had granted the EDPB access to
free translation services."* Item 3 0 4 1's own **Legal basis** block, a few
pages later, still reads: *"Agreement on administrative cooperation between
the European Data Protection Board and the institution providing the
service"* — present tense, no indication the underlying arrangement was
terminated. **Confirmed as a real tension**, not a docx transcription
artefact — though on close reading it is not necessarily the *same*
agreement (the Legal basis text is a generic administrative-cooperation
clause, not a named SLA), so the ambiguity itself is the finding, exactly as
the docx recorded it. This one spot-check gives real confidence in the rest
of the archived batch, the same logic `G.29.md` used for the SEC03 master
summary table.

## Findings not in the current record, carried forward from the docx (not independently re-verified beyond the one spot-check above)

- **32 of SEC09's expenditure-side assigned-revenue notes are `p.m.`** — the
  expenditure→revenue link is declared throughout the section and quantified
  nowhere (`BP-09-04`).
- **Cross-section citation divergence, several instances, same budget
  lines**: Regulation No 260/68 carries two different printed name forms
  across SEC09 and SEC10 (same OJ reference, same ELI); Item 3 0 1 2 has a
  Legal basis in SEC10 and none in SEC09; Item 3 0 1 1's pension-rights
  citation differs (SEC09: "Article 11(2) and (3)"; SEC10: "Articles 4 and
  11"); the mission-expenses Annex VII citation has three printed forms
  across the two sections. No document reconciles any of these — reported,
  not adjudicated, per `Research.1.md` §3.
- **The EDPB's own buildings line describes offices provided to the EDPS**
  — a structural anomaly in whose section which content sits under.
- **Eight-plus unnamed or under-cited legal instruments carrying material
  appropriations in SEC10** (an HR/VP Decision with no number, OJ or ELI
  sole basis for EUR 22,372,532; a VP/HR letter; "Rules governing
  designation..."; a Mandate and Service agreement; "Gender Action Plan
  III"; "the related Staff Working Document" naming an instrument only by
  its relation to another unnamed one) — strong `unpublishable`-terminus
  candidates, none chased to a source this session.
- **SEC10's MFF codes carry an unresolved literal placeholder** (`7.2.X11`,
  `7.2.X9PPPA`, `7.1.2X`) where SEC09's equivalents are fully resolved
  digits — the docx's own framing: *"The key is not derivable from this
  document. Highest-priority machine-readability issue found so far."* This
  specifies, rather than contradicts, the current record's `S10-03`/
  `DISC-07-03` finding.
- **The Article 21(3) assigned-revenue boilerplate has (at least) two
  standing wordings in one budget** — SEC09: "on the lines which bore";
  SEC10: mostly "in the headings which bore," but SEC10 uses SEC09's own
  wording at two of its own locations, so it is not even internally
  consistent.
- **SEC10 is "the first document in the corpus to state" quantified
  expenditure→revenue links** — 16 of them, of which only one (Article 3 3 2)
  is matched by a stated figure on the revenue side; the other fifteen have
  `p.m.` revenue-side lines. Not reflected anywhere in the current SEC10
  record.
- **SEC10's 2027 administrative revenue estimate (EUR 67,844,000) is an
  81.9% drop from the 2025 out-turn (EUR 374,946,558.94)**, because Chapters
  3 1, 3 2 and 3 3 are estimated at `p.m.` despite realising EUR
  311,470,410.82 between them in 2025 — `p.m.` doing duty over a large
  realised flow, not a dormant line.
- **The EEAS receives free translation from the Council Secretariat and the
  Commission** (Item 2 2 2 0, `p.m.` in all years) **while SEC09 states the
  EDPB just lost the equivalent arrangement** — the two documents do not
  connect the pattern, and neither did any prior session.
- **Council Directive 89/391/EEC** (1989 workers' health and safety) cited
  as legal basis for a SEC10 buildings fitting-out line — the same
  cross-subject citation pattern already logged for SEC03's HZ-004/005.
- **Structural findings, confirmed at a second/third section**: the
  introduction of every institutional section is institution-authored and
  Commission-adjusted, and the document says so explicitly — intro figures
  should not be trusted against tables anywhere in Sections I–X, including
  ones not yet extracted. Rows whose 2025 out-turn is `0,—` or whose current
  figure is `p.m.` carry a blank execution-ratio cell, not a zero (confirms
  a SEC03 finding at a second section). "Title 3" and "Chapter 3 0" exist on
  both the revenue and expenditure side of SEC09 with unrelated content —
  any future index must carry a revenue/expenditure discriminator.

## What this does not do

- **No node or edge is proposed**, same conclusion as the existing record —
  every finding above is a citation inconsistency, an internal document
  tension, a terminus candidate, or a structural observation, not a document
  naming another *publication* as an input.
- **Not a full re-verification of the docx's ~70 combined SEC09/SEC10
  entries** — one claim was spot-checked directly against `SEC09.pdf` and
  held up; the rest are carried forward flagged as sourced from the docx,
  not independently re-confirmed this session, the same treatment `G.39.md`
  gave the staged ECB batch before its own spot-checks.
- **Does not merge into `SEC08-SEC09-SEC10_PartA_2026-08-05.md`** — left as
  a separate reconciliation file rather than edited into the original, so
  the original stays a record of what that session actually did.
