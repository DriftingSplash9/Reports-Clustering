# G.60.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` read in full at the start of this overall
working session; §2 (git prohibition), §3 (extract-don't-adjudicate), §4
(node rule and sweep scoping), §6 (output format) all applied this session.
`planning/OPEN-THREADS_2026-08-08.md` and `planning/dropped-sweep-scoping_2026-08-08.md`
both read in full earlier this session. `G.59.md` is the hand-off template
followed here.
Predecessor: `G.59.md` (2026-08-09).

## Orientation — if you are a new agent, start here

1. **Do not run any git command against this repo.** Not `git status`, not
   `git log`, not read-only. See `G.54.md` / `Research.1.md` §2. If you need
   to know what is committed or pushed, ask Thomas.
2. **Read `planning/OPEN-THREADS_2026-08-08.md` first**, specifically thread
   2.1 (the corpus-wide `_dropped` sweep) and `planning/dropped-sweep-scoping_2026-08-08.md`'s
   suggested execution order. This file is the sweep's Tier-2 item #13 —
   `nl-municipal-finance.json` is treated as an EU-branch file per
   `Research.1.md` §9's id-list convention, even though the scoping doc
   lists it generically. **Next in the suggested order**:
   `statcan-ippi.json` (#14, Canada/US, non-branch), `statcan-macro-accounts.json`
   (#15, explicitly in CA branch's own stated scope — should get a
   `CA/G.2.md`, not an `EU/G.*.md`).
3. **`G.56.md`–`G.59.md` are the substantive predecessors for the rest of
   this branch** — the id registry, the ESS quality slice, ECB staging
   batches. This file covers exactly one file: `nl-municipal-finance.json`,
   originally created 2026-08-05 (per `G.47.md`'s G1/G9 tracks) and not
   otherwise touched by any hand-off until now.
4. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`,
   never sweep Thomas's personal files. Unchanged.

## Session conditions — read this first

**A `_dropped`-sweep session, corpus-wide thread 2.1, Tier-2 item #13.** One
file touched: `nl-municipal-finance.json` — five nodes minted, four new
edges wired, all five of the file's `_dropped` entries resolved (none left
open).

**Read in full this session**: the current `nl-municipal-finance.json`
(before and after editing). **Not read this session**: any other `EU/`
research JSON, `REPORTS.md`, `BACKLOG.md`.

**This file's own `_note` states a verification standard from its
2026-08-05 origin session** — that AI-summarized `WebFetch` quotes are not
reliably verbatim, so every load-bearing quote must be independently
re-verified against primary text, not trusted from a subagent's report.
This session inherited and applied that standard to its two most consequential
findings (Findings 4 and 5 below): both of the file's remaining
subagent-sourced `deferred` leads (Noord-Brabant's Begroting, Waalwijk's
Jaarrekening) were re-fetched directly rather than promoted on the earlier
summary alone, and one of the two turned up exactly the kind of paraphrase
drift the standard exists to catch (see Finding 4). All other retrieval this
session (Kadaster, CBS population table, Staat van de WOZ) was done via
`WebSearch` + `WebFetch` directly against primary sources, with no
intervening subagent.

## Headline result

**All five of this file's `_dropped` entries closed in one session — three
on straightforward publication-fact lookups the original session had
already substantially researched, and two by independently re-verifying a
predecessor subagent's unverified quotes, one of which did not survive
re-verification word-for-word even though its substance held.** No stale
cross-file targets were found this time (a first among this session's four
sweep files); the blockers here were all "real lead, missing publication
facts" rather than "already resolved elsewhere and not updated."

## Findings

### 1. `nl-kadaster-brk` minted as a terminus, same category as Ontario's SDI

*What this rests on*: Kadaster's own catalogus and public-facing pages
(`catalogus.kadaster.nl`, `kadaster.nl`).

The Waarderingsinstructie names Kadaster as the source of WOZ
sales-transaction data ("Alle verkoopgegevens worden aangeleverd door het
Kadaster."), but the original entry withheld a node for want of a category
decision — is a national cadastral base registry a node under this corpus's
rule? Kadaster's own materials confirm the BRK is a continuously-maintained
authentic register with no stated publication cadence or edition
structure — the same shape as Ontario's Spatial Data Infrastructure
terminus (`G.` sweep, `ontario-ompf-mpac.json`). **Minted `nl-kadaster-brk`,
terminal_reason `unpublishable`** (not `confidential` — the BRK is a public
register, openly described, just not "published" in discrete editions;
`unpublishable` better matches the "administrative system with no
publication to point at" family than `confidential`'s "collected and
deliberately never released"). Wired `nl-waarderingskamer-waarderingsinstructie
-> nl-kadaster-brk`, `uses_data_from`, on the entry's own already-verified
quote.

### 2. `nl-cbs-population-statistics` minted, closing a lead the file's own prior session had already fully evidenced

*What this rests on*: CBS's own StatLine table detail page (`cbs.nl/nl-nl/cijfers/detail/03759ned`).

The 2024 Toelichting's "Maatstaf Inwoners sociaal" card names the specific
titled table "Bevolking op 1 januari en gemiddelde; geslacht, leeftijd en
regio" as its Bron — a citation the file's own 2026-08-05 session had
already verified directly (line 452 of its pypdf extraction), leaving only
the node's own publication facts (cadence) unconfirmed. This session found
those facts directly on the table's own page: "In het tweede kwartaal van
2027 worden de cijfers van 1 januari 2027 en de gemiddelde cijfers over
2026 in deze publicatie opgenomen" — an annual update. **Minted
`nl-cbs-population-statistics`**, wired `nl-bzk-toelichting-gemeentefonds ->
nl-cbs-population-statistics`, `uses_data_from`.

### 3. `nl-waarderingskamer-staat-van-de-woz` minted, isolated, after actually opening the document a predecessor only surfaced

*What this rests on*: a direct `WebFetch` of the 2025 edition PDF itself.

The original entry explicitly withheld this mint because "Research.1.md's
rule against inventing facts extends to inventing a description of a
document nobody has actually read" — a subagent had found the URL but never
opened it. This session opened it: the 2025 edition states "In deze Staat
van de WOZ 2025 gaan we achtereenvolgens in op de actuele stand van zaken
van de WOZ-uitvoering" and references its own 2024 predecessor by name
("In de Staat van de WOZ 2024 schreven wij over de lopende evaluatie"),
confirming a genuine annual series. **Minted
`nl-waarderingskamer-staat-van-de-woz`, isolated (`fed-h15`-style)** — no
document read so far names it as an input to, or output of, anything else
in this file's material, so no edge is wired. A documented isolated mint,
not an ungrounded one: the node itself is independently well-evidenced even
without a connection.

### 4. `nl-noord-brabant-begroting` minted, but the re-verification changed the quote, not the finding

*What this rests on*: a direct `WebFetch` of `begroting.brabant.nl`'s 2024
edition.

This entry's earlier subagent report gave two quotes: the amount
("Uitkering provinciefonds: 372.166") and a basis-of-estimate sentence
("De begrotingsbedragen 2024 zijn gebaseerd op de meicirculaire 2023").
Re-fetched directly this session: **the amount matches exactly** (€372,166
thousand), **but the basis-of-estimate sentence does not match word for
word** — the live page reads "De raming van de algemene uitkering is
gebaseerd op de meicirculaire 2023," not the subagent's wording. Same
substance (the 2024 estimate rests on the May 2023 circular), different
exact sentence — precisely the kind of paraphrase drift this file's own
`_note` flagged as a known failure mode of AI-summarized `WebFetch` quotes,
now demonstrated on its own material rather than only on the earlier
`grok-r3-netherlands-poland.json` spot-check that originally motivated the
standard. **Minted `nl-noord-brabant-begroting`, wired
`nl-noord-brabant-begroting -> nl-provinciefonds`, `uses_data_from`, on the
directly-verified quote, not the subagent's.**

### 5. `nl-waalwijk-jaarrekening` minted; the subagent's quote survived this time, verbatim

*What this rests on*: a direct `WebFetch` of `waalwijk.begrotingsapp.nl`'s
2021 jaarrekening.

Unlike Finding 4, this one held up exactly: "De jaarrekening is opgemaakt
met inachtneming van de voorschriften die het Besluit begroting en
verantwoording provincies en gemeenten daarvoor geeft" was confirmed
word-for-word against the live page. **Minted `nl-waalwijk-jaarrekening`,
wired `nl-waalwijk-jaarrekening -> nl-bbv`, `methodology_depends_on`**, as
corroboration of the already-independently-verified
`nl-cbs-iv3-gemeenten -> nl-bbv` edge — not load-bearing on its own, but now
resting on a directly-confirmed rather than subagent-only quote.

## Secondary observations (logged, low priority)

- **A genuine mixed result on subagent reliability, worth keeping as a data
  point rather than a rule.** Two subagent-sourced quotes were checked this
  session; one reproduced its primary source exactly, one did not. This
  doesn't resolve which failure rate to expect from subagent `WebFetch`
  summaries generally — it is one more data point alongside
  `grok-r3-netherlands-poland.json`'s spot-check and `AU/G.3.md`'s
  fabricated-citation catch, all pointing the same direction (verify before
  promoting), none large enough to quantify a rate.
- No stale cross-file target was found in this file, unlike `G.56.md`,
  `G.57.md`, `G.58.md` and `NZ/G.6.md` each catching one. Worth noting only
  because it is the first sweep file this session where that specific
  failure shape did not recur — not a claim that the pattern has stopped.
- Corpus-count estimate not attempted this session, same reasoning as
  `G.58.md`/`G.59.md`.

## Corrections to prior sessions

1. **`nl-municipal-finance.json`'s Noord-Brabant `_dropped` entry —
   quote CORRECTED**, from the subagent's "De begrotingsbedragen 2024 zijn
   gebaseerd op de meicirculaire 2023" to the primary source's actual "De
   raming van de algemene uitkering is gebaseerd op de meicirculaire 2023."
   Not a claim that the earlier session was wrong to flag this as
   deferred — it explicitly declined to promote the subagent's quote
   without direct verification, which is exactly the caution that caught
   the drift. See Finding 4.
2. **No claim in `G.56.md`–`G.59.md` is disputed.** This session did not
   re-touch any of their files.

## Thomas's stated priority for the remaining work

Unchanged from `G.59.md`'s lettered blocks; this session's work is entirely
inside **B — the corpus-wide `_dropped` sweep**, Tier-2 item #13. No new
decision is waiting on Thomas from this session — all five entries reached
a resolved state without a modelling question left open.

**Blocks A, C, D, E, F, G untouched this session** — see `G.56.md`–`G.59.md`
for their current state.

## Cheap checks still outstanding

Carried from `G.59.md`, unchanged, plus:

1–7. All items from `G.59.md`'s list, unchanged — not attempted this
   session (out of this file's scope).
8. **New, this session**: `nl-waarderingskamer-staat-van-de-woz` is
   isolated except for no edges at all — worth a look for any document
   naming it as an input to, or output of, something else, the same shape
   as `G.53.md`'s and `G.58.md`'s isolated-node cheap checks.
9. **New, this session**: `nl-noord-brabant-begroting`'s Begroting 2022
   BBV-citation (reported by the original subagent alongside the Begroting
   2024 figures) was not independently re-checked this session — only the
   2024 figures were. Worth a direct fetch if that specific quote is ever
   load-bearing.

## What to pass at the start of next thread

1. **`planning/OPEN-THREADS_2026-08-08.md`** — read first, thread 2.1.
   Like `G.58.md`/`G.59.md`, this file's session (2026-08-09) has not yet
   been folded into OPEN-THREADS.
2. **This file**, then `G.59.md`, `G.58.md`, `G.57.md`, `G.56.md` for
   everything else in the branch.
3. **`Research.1.md`** §2 (git), §3 (extract, don't adjudicate), §4 (node
   rule and sweep scoping), §6 (output format).
4. **`src/data/research/nl-municipal-finance.json`** — every `_dropped`
   entry this session touched carries its resolution inline, original text
   preserved below each one.
5. **`planning/dropped-sweep-scoping_2026-08-08.md`** — for the remaining
   Tier-2 files (`statcan-ippi.json`, `statcan-macro-accounts.json`).

---

# How to write the next hand-off

**Added 2026-08-04. Copy this whole section verbatim into every successor**, so
the chain never depends on one file surviving. It is the spec, not an example —
the file you are reading is the worked example.

When Thomas says *"write the next handoff"*, *"write the next G file"*, *"wrap
this thread up"* or anything close, this is what he is asking for. Do not ask
which format.

## Mechanics

- **Filename:** `G.<n>.md`, where `<n>` is one higher than the highest-numbered
  `G.*` file in `EU/`. Check the folder — the sequence has gaps (there is no
  G.01, G.06, G.10, G.12, G.14, G.16, G.17 as `.md`) and some predecessors are
  `.docx`. **Take the highest number, not the count.**
- **Write it as `.md`**, plain text, in `EU/`. Earlier files are `.docx`; that
  was the chat workflow's doing, not a preference.
- **Then write the JSON sidecar.** Every hand-off has a machine-readable twin at
  `EU/G.<n>.json`. Do not hand-write it — run:

  ```
  python3 scripts/handoff-to-json.py EU/G.<n>.md
  ```

  The Markdown stays the document of record; the JSON is a structured index of
  it (date, predecessor, findings, corrections, priorities, cheap checks, and
  which required sections are missing). It exists so branch state can be read
  without parsing prose, and so a future session can diff two hand-offs.
  `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar;
  `--check` reports which are stale without writing. **If you are ever unsure
  whether the sidecar is current, just re-run it — it is idempotent.**
- **Never edit a predecessor.** Corrections to earlier sessions go in this
  file's *Corrections* section, where they are dated and attributable. The one
  exception is this spec block, which is copied forward unchanged.

## Required structure, in this order

```
# G.<n>.md — EU galaxy hand-off

Date: YYYY-MM-DD
Governing briefs: <which, and whether you actually saw them>
Predecessor: G.<n-1>.md (date)

## Orientation — if you are a new agent, start here
## Session conditions — read this first
## Headline result
## Findings
## Secondary observations (logged, low priority)
## Corrections to prior sessions
## Thomas's stated priority for the remaining work
## Cheap checks still outstanding
## What to pass at the start of next thread

# How to write the next hand-off        ← this spec, copied verbatim
```

Drop a section only if it would be empty, and say so in one line rather than
leaving a heading with nothing under it. *Corrections* and *Thomas's stated
priority* are **never** dropped: an empty Corrections section is itself a claim
(nothing earlier was found wrong) and should say that explicitly.

## What each section is for

**Orientation** — carried forward and updated, not rewritten each time. A new
agent must be able to read this section alone and know what to read next. If
the folder layout or the tooling changed, that goes here.

**Session conditions** — what constrained the work. Session type (extraction vs
verification vs planning), what tooling was available, what did not arrive, what
was left untouched by instruction. This is where "the sandbox failed" and "the
governing briefs still did not arrive" belong. **State plainly which sources you
read in full**, because everything downstream inherits that limit.

**Headline result** — the single most important thing established, and how
strongly. If the session established nothing, say that; a session that only
refutes is still a result.

**Findings** — numbered `###` subsections, one per finding. Each states what was
checked, what was found, and **what it rests on**. Mark any claim that depends on
a predecessor's reading rather than your own — the house convention is
*(SEC04 per G.17)*. Quote verbatim; `Research.1.md` §2 applies here exactly as
it does to research output.

**Secondary observations** — real but low-priority. Section fingerprints, oddities
worth not rediscovering. Keep them short.

**Corrections to prior sessions** — numbered, each naming the file and the claim
being corrected, and whether it is *confirmed*, *refuted*, *overstated* or
*resolved*. This section is the reason the chain is trustworthy. A session that
finds a predecessor wrong and does not record it here has actively damaged the
corpus.

**Thomas's stated priority for the remaining work** — lettered blocks (A, B, C,
D) carried forward from the predecessor, edited to reflect what moved. Mark items
**no longer needed** explicitly and say why, rather than deleting them silently.
This section is what a new agent reads to answer "what is next".

**Cheap checks still outstanding** — ordered by value per unit effort, each one a
single lookup. This is the list that gets raided when a session has capacity left.

**What to pass at the start of next thread** — the packing list, for the case
where the next agent has no filesystem access. If it does have access, say so and
keep the list anyway; it doubles as an index of what matters.

## Conventions that make these files worth reading

- **Say what you did not do.** Every one of these files carries an explicit
  not-read / not-verified statement. That is what makes the positive claims
  usable.
- **Predictions are logged and then scored.** G.17 predicted a code pattern;
  G.18 recorded that it "landed". Make falsifiable calls and settle them.
- **Distinguish inference from documented fact,** and say which narrow respect is
  still inference. G.18's headline rule is very well evidenced and still not
  printed in any document — it says so.
- **A refuted hypothesis is a good outcome.** Report both sides of a conflict and
  pick neither; `Research.1.md` §3 is explicit that adjudication is not the
  research role.
- **Do not pad.** These files are dense because every line earns its place.
