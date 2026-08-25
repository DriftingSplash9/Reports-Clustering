# Grok research queue — 2026-08-22

Built while Thomas is near his weekly Claude limit, to give him and Grok
3-4 days of self-directed work. Everything here follows the standing rules
in `notes/grok-diary.md` (closed relationship_type union, honest nulls,
primary sources only, no invented ids) and the §0 lesson that cost round 3
a wasted reply: **the attachment list for each prompt is repeated below in
one table, separate from the prompt text itself**, because that's the
channel that actually reaches Thomas.

**2026-08-22 restructure: the rules Grok needs are now in `GROKREADME.md`,
not repeated inside each numbered prompt.** Every prompt used to restate the
same relationship-type enum, id-integrity rule, honesty permission, and reply
schema, over and over — real repetition with 60+ more countries still to go.
Now `GROKREADME.md` (right here, in this same folder) carries all of that
once, and every numbered prompt below is just its region-specific research
question. **Attach `GROKREADME.md` to every single prompt, in addition to
whatever the table below lists for that row** — it's not repeated per-row
below to keep the table itself skimmable. `notes/grok-diary.md` is a
different document, one level up: that's Claude's own lessons-learned log
for writing these prompts well, not
something pasted to Grok.

**Same-day follow-up fix: Grok wasn't replying in clean JSON.** The BC
results (01) came back with prose wrapped around the JSON, sometimes not
valid JSON at all, and nothing Thomas could just download — he had to
manually pick the data out of a chat reply. Root cause was partly
`GROKREADME.md` itself: it used to ask Grok to *confirm what it received in
prose before the JSON*, which invited exactly that mixing. `GROKREADME.md`
now says the reply must be **one fenced code block and nothing else** —
confirmations go inside the JSON as a `_meta` field instead of as chat text
— plus an explicit "stay in scope, don't narrate" rule. If a future reply
still wanders, save it anyway (as instructed below) and flag it — the fix
can be sharpened further next round.

**This queue exists as its own case study of that lesson** — round 3
(2026-08-22) came back with all 9 attached files marked "not received"
because the attachment sentence lived only inside the pasteable prompt
block. Every prompt in this folder repeats its attachment list here too,
in this one table, so a skim of just this page is enough to get every
attachment right.

## How to work through this (3-4 days, no rush)

Work top to bottom by number prefix — that's priority order, not
alphabetical. Each file is fully self-contained: paste everything below its
own `---` line into Grok, attach what the table below says, done. Whatever
Grok sends back, just save the raw reply as its own file next to the
prompt (e.g. `10-wiring-indonesia-REPLY.md` or `.json`) — do **not** try to
parse-check, raw-verify, or mint anything yourself. That's mint-time work
for a Claude session with the full validate pipeline; your job right now is
just to run the prompts and collect the replies. When Claude's back, hand
over this whole folder (prompts + replies) and it picks up from there.

## Priority order and why

1. **Canada (01-06)** — you asked to work this yourself; these six give
   Grok a properly-scoped research brief per region rather than one giant
   vague "do Canada" ask. Do these in any order — they don't depend on each
   other. Biggest single gap: British Columbia has zero nodes; Edmonton
   (Alberta's own capital!) has none either despite Alberta being our
   deepest province.
2. **Domestic wiring (10-20)** — this is the fastest way to shrink the
   1,264-node unlinked count, because these countries already HAVE the
   nodes (real candidate reports Grok found in earlier rounds) — they just
   were never connected to each other. Ordered by how many unlinked nodes
   each recovers: Indonesia (113) and Taiwan (91) first, then the rest.
3. **New countries (30-37)** — 62 countries with zero corpus presence at
   all. Ordered roughly by how well-resourced/checkable each region's
   statistics is likely to be — Central Asia/Caucasus and South Asia first
   (real, large, findable), Pacific microstates (37) last/optional since
   the likely yield per hour spent is lowest.

## Attachment manifest — check this before every paste

**Every row below also needs `GROKREADME.md` attached — it's the standing
rules, not repeated per-row here. If you attach nothing else, attach that.**

| # | Prompt | Also attach (from `src/data/research/`) |
|---|---|---|
| 01 | Canada — British Columbia | `alberta-provincial.json`, `alberta-municipal.json`, `federal-canada.json`, `equalization-named-products.json` |
| 02 | Canada — Ontario deepen | `ontario-ompf-mpac.json`, `alberta-provincial.json`, `federal-canada.json` |
| 03 | Canada — Quebec deepen | `alberta-provincial.json`, `federal-canada.json` |
| 04 | Canada — Prairies (SK/MB + Edmonton/Winnipeg/Regina-Saskatoon) | `alberta-provincial.json`, `alberta-municipal.json`, `grande-prairie.json`, `federal-canada.json` |
| 05 | Canada — Atlantic (NB/PE/NL + NS deepen) | `alberta-provincial.json`, `federal-canada.json`, `equalization-named-products.json` |
| 06 | Canada — Territories (YT/NT/NU) | `federal-canada.json`, `equalization-named-products.json` |
| 10 | Wiring — Indonesia | `id-indonesia-grok-2026-08.json` |
| 11 | Wiring — Taiwan | `tw-taiwan-grok-2026-08.json` |
| 12 | Wiring — Philippines/Vietnam/Thailand/Myanmar | `ph-philippines-grok-2026-08.json`, `vn-vietnam-grok-2026-08.json`, `th-thailand-grok-2026-08.json`, `mm-myanmar-grok-2026-08.json` |
| 13 | Wiring — Mexico | `mx-mexico-grok-2026-08.json` |
| 14 | Wiring — Japan/South Korea | `jp-japan-grok-2026-08.json`, `kr-south-korea-grok-2026-08.json` |
| 15 | Wiring — Iran/Iraq/Türkiye/Syria | `ir-iran-grok-2026-08.json`, `iq-iraq-grok-2026-08.json`, `tr-turkey-grok-2026-08.json`, `sy-syria-grok-2026-08.json` |
| 16 | Wiring — Argentina/Chile | `ar-argentina-grok-2026-08.json`, `ar-national-core.json`, `cl-chile-grok-2026-08.json` |
| 17 | Wiring — Ecuador/Peru/Venezuela/Bolivia/Colombia | `ec-ecuador-grok-2026-08.json`, `pe-peru-grok-2026-08.json`, `ve-venezuela-grok-2026-08.json`, `bo-bolivia-grok-2026-08.json`, `bo-national-core.json`, `co-colombia-grok-2026-08.json` |
| 18 | Wiring — Uruguay/Paraguay/Guyana/Suriname | `uy-uruguay-grok-2026-08.json`, `py-paraguay-grok-2026-08.json`, `gy-guyana-grok-2026-08.json`, `sr-suriname-grok-2026-08.json` |
| 19 | Wiring — UAE/Saudi Arabia | `ae-national-core.json`, `ae-united-arab-emirates-grok-2026-08.json`, `sa-saudi-arabia-grok-2026-08.json` |
| 20 | Wiring — Afghanistan/Yemen/Sudan/Somalia | `af-afghanistan-grok-2026-08.json`, `ye-yemen-grok-2026-08.json`, `af-sudan.json`, `sd-g22-audit-chamber-fiscal.json`, `sd-leadchase-nac-audits.json`, `af-somalia-deepen.json`, `so-g22-puntland-benadir-mof.json` |
| 30 | New — Central Asia/Caucasus/Mongolia | none — `GROKREADME.md` only (from-scratch) |
| 31 | New — South Asia | none — `GROKREADME.md` only |
| 32 | New — Gulf/Levant | none — `GROKREADME.md` only |
| 33 | New — SE Asia remainder | none — `GROKREADME.md` only |
| 34 | New — Central America | none — `GROKREADME.md` only |
| 35 | New — Caribbean | none — `GROKREADME.md` only |
| 36 | New — Belarus/North Korea | none — `GROKREADME.md` only |
| 37 | New — Pacific microstates | none — `GROKREADME.md` only |

## Two things worth knowing before you start

**Prompts 15 and 20 overlap in country (Iran, Iraq, Syria, Afghanistan,
Yemen) with the cross-border round-3 prompt already queued
(`notes/grok-prompt-cross-border-round3-2026-08-22.md`) — that's
deliberate, not a duplicate.** Round 3 asks Grok to find edges reaching OUT
to international standards bodies for those countries; prompts 15/20 here
ask for edges WITHIN each country (domestic wiring). Run round 3 first if
you haven't already (it was queued before this folder existed) — the two
won't conflict either way.

**None of this needs `npm run validate` or a mint to be useful right now.**
Grok's replies are leads, not sources — every one gets raw-verified before
anything touches the actual graph, same as every round before this. Your
job for these 3-4 days is just running prompts and saving replies; the
verify-and-mint pass happens once Claude's back.
