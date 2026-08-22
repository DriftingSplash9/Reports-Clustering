# Memory pending — 2026-08-22

Project memory went DOWN mid-session (it was UP earlier the same session —
the crossborder-verification entry was written successfully). Per the
standing parking pattern, this file holds the owed entry until a session
with working memory processes it into a real memory file (then move this
file to `_to_delete/`).

## Owed entry: crossborder-mint-2026-08-22.md (type: project)

Item 5s, 2026-08-22. The cross-border mint landed:
`src/data/research/crossborder-standards-2026-08-22.json` — 10 nodes (3
international: imf-sdds-plus, asean-acss, apec-stats; 7 institutional:
sd-cbs, mu-statsmauritius, sl-statssl, af-nsia, ye-cso, sy-cbs, iq-cso), 44
edges, every basis carrying its raw-verified quote. Corpus 3,091/2,070 →
**3,101 reports / 2,114 dependencies**; 120/120 checks, tsc/build clean
(sandbox); unlinked 1,285 → 1,264. **All 19 zero-cross-border-edge countries
now have ≥1 cross-border edge** (ID 5, TW/PH/TH 4, JP/VN/SG/MM 3,
IL/KR/SA/MU 2, rest 1). Thomas's decisions applied: no schema change
(standards → methodology_depends_on, membership → cites, observance nodes
dropped); institutional nodes minted incl. iq-cso. URL hazards recorded in
node descriptions: cbs.gov.sd DNS-dead (kept, flagged); **cbssyr.sy HIJACKED
— redirects to spam, never link**; cso-yemen.org parked (real host
cso-ye.org). Held out: MU SNA-2008 edge, AF CR 06/251 quote — round-3
targets, plus substantive edges for the seven countries whose only tie is a
dated e-GDDS row.

Why: closes the mint phase of the crossborder-verification-2026-08-22 memory
entry — that entry's "NOTHING MINTED YET" line is superseded by this one
(update it in place when processing).

How to apply: don't re-mint any of the 10 ids; re-run `npm run validate` on
Thomas's machine once (sandbox-built, standard practice); next round is
research, not code.

Also update MEMORY.md: the top index line for crossborder-verification
should note the mint has since landed (5s).

## Owed entry 2: grok-diary (type: reference)

`notes/grok-diary.md` created 2026-08-22 at Thomas's instruction — the
standing Grok playbook (what works, dated failure modes, prompt shape,
round log). MUST be read before writing any Grok prompt and appended to
after processing any Grok reply; every handoff names its location (now
HANDOFF.md §8, with the how-to-hand-off section moved to §9). Round-3
prompt queued at `notes/grok-prompt-cross-border-round3-2026-08-22.md`.
