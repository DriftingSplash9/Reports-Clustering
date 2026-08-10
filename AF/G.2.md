# G.2.md — Africa galaxy hand-off

Date: 2026-08-10
Governing briefs: `Research.1.md` §2/§3/§4 (evidence standard, extract-don't-adjudicate, recurring-vs-one-off node shape), same as G.1. `AF/G.1.md` read in full and is this session's predecessor.
Predecessor: G.1.md (2026-08-10)

## Orientation — if you are a new agent, start here

1. This branch (`AF/`) follows the same `G.<n>.md` hand-off convention as `EU/`, `AU/`, `NZ/`, `CA/`. Priority lists are plain-numbered (AU/NZ convention), not EU's lettered A–G.
2. Do not run any git command against this repo, ever. Ask Thomas for git state.
3. Source material is still `country afrikans.docx` (repo root) — 48 raw Grok-research entries across seven countries plus continent-wide prose. Three countries are now done: South Africa (G.1), Egypt (this session), Kenya (this session). Four remain entirely unresearched as corpus nodes: Nigeria, Ethiopia, Tanzania, Ghana.
4. **New this session, and the single most important operating change**: Thomas has told the agent to trust a second AI assistant (Grok) directly. When this session's own tools (WebFetch, mostly) hit a wall — and they hit a *lot* of walls this session, on government sites in three different countries — the move is to write Grok a prompt that (a) explains the specific tooling limitation, (b) demands the same evidence standard the corpus already uses (verbatim quotes, exact URLs, explicit primary/secondary/could-not-find confidence tags), and (c) states plainly the answer needs to be actually true, not plausible. Once Grok answers in that format, mint it directly — no separate independent-refetch pass required, unless the claim itself reads as implausible or suspiciously over-specific, in which case push back and reprompt. Full rule recorded in Claude's own project memory (`feedback_grok-as-verification`), but it belongs in this hand-off too since it changes how every future session should work.
5. Also new this session: Thomas asked for Claude and Grok to work **in parallel, on different angles of the same problem**, rather than Claude researching then handing gaps to Grok sequentially. This session ends with exactly that split running for Ethiopia — see "What to pass at the start of next thread."
6. `AFR` remains the only staffed African palette family (`src/lib/palette.ts`), with `ZA`, `EG`, `KE` now all under it. Every new country still needs a `COUNTRY_FAMILY` entry in the same pass as its first node — not yet verified this session whether `EG` and `KE` actually got staffed, since none of this session's files have been imported into the live corpus yet (all still DRAFT, NOT IMPORTED, sitting in `src/data/research/`). **This is worth flagging loudly: nothing described in this hand-off is live in the graph yet.** Five draft JSON files sit un-imported in `src/data/research/`, described below.

## Session conditions — read this first

A verification-and-mint session across two countries (Egypt, Kenya) plus a substantial second pass over South Africa closing four open questions G.1 left behind. Unlike G.1 (a single pilot country, single pass), this session ran in repeated rounds per country: an initial pass with this session's own tools, then one or two Grok follow-up rounds targeting whatever those tools couldn't reach. Government websites were unusually hostile this session — cbe.org.eg (Egypt's central bank) blocked every fetch attempt outright; Egypt's State Information Service SSL-errored every time; Kenya's kenyalaw.org 403'd on every direct fetch; Kenya's KNBS site SSL-errored; the IMF's own DSBB metadata pages are JavaScript-rendered and returned no country-specific content for South Africa, Egypt, *or* Kenya, across every tool tried including Grok's. That last one is now a known, recorded limitation rather than something worth re-attempting per country — see Cheap checks.

No files were imported into the live corpus this session. Five DRAFT files sit in `src/data/research/`, all marked `DRAFT, NOT IMPORTED` in their own `_status` field, awaiting Thomas's review: `za-fiscal-federalism.json`, `za-national-accounts-labour.json`, `za-followup-gaps.json` (South Africa, three files, G.1 plus this session), `eg-cpi-social-insurance.json` (Egypt), `ke-social-protection.json` (Kenya).

## Headline result

The docx's own claim that Africa runs mostly on discretionary benefit-adjustment, with a handful of formula-linked exceptions, held up under independent, country-by-country verification — but the shape of the discretion is more varied and more interesting than "discretionary vs. automatic" suggests. This session found the same discretionary pattern recurring in places that don't look like grant systems at all: South Africa's central bank inflation target turns out not to be written into legislation either (a 2025 Minister/Governor agreement, not the Reserve Bank Act), and Kenya's disability cash-transfer programme just lost its old statutory basis to a repeal and gained a replacement that's optional and possibly not yet implementable. Meanwhile Egypt's pension law really is the clean exception the docx said it was — verified three separate ways this session — and a genuinely new structural finding turned up by accident: the East African Community has a binding, EU-style regulation (not a voluntary standard) requiring member states to compile a harmonised CPI, the first non-EU example of that legal shape in the whole corpus.

## Findings

### 1. South Africa: SARB's inflation target, ENE Vote 19, Schedule 4, and the corpus's first provincial-level node

Three follow-up files this session (`za-fiscal-federalism.json`, `za-national-accounts-labour.json`, `za-followup-gaps.json`) closed every open question G.1 left behind and added international-standard edges (`un-coicop-2018`, `imf-sdds`, `ilo-c102-social-security-minimum-standards`, `cpi-manual` edge) plus fiscal-federalism structure (Constitution Ch.13, Division of Revenue Act, municipal indigent framework). Most structurally important: **`za-western-cape-dsd-app`**, the Western Cape DSD's own Annual Performance Plan — the first node minted for South Africa (or anywhere in the AF branch) at `jurisdiction_level: provincial`. Every other South African node across four files was federal. This is the one that actually answers the "does it run top to bottom" question Thomas asked at the start of this thread, rather than leaving it as a constitutional listing with nothing to hang on.

Also confirmed, via a Grok round: SARB's 3% (±1pp) inflation target is **not** written into the South African Reserve Bank Act 90 of 1989 — it's a 2025 agreement between the Minister of Finance and the SARB Governor. This is now the third South African mechanism (after social grants and UIF benefits, both already in the graph via Gazette-notice powers) that reads like a fixed rule from outside but is actually a discretionary instrument underneath. Worth stating as a pattern in a future session's synthesis, not just three unconnected findings.

### 2. Egypt: pension law's CPI floor confirmed three ways; Takaful/Karama confirmed NOT CPI-linked; two COICOP vintages now in the graph

`eg-cpi-social-insurance.json`, 5 nodes / 4 deps. Headline, and the strongest CPI-to-benefit link in the branch so far: Law 148/2019 art.35 sets a genuine statutory pension-increase floor — "not less than the rate of inflation and not... more than 15%" — verified via (a) Andersen's official English translation of the Act, (b) the US Social Security Administration's independent international policy update describing it as automatic, and (c) this being the exact CAPMAS-CPI-to-pension link the Act's own definitions section states directly. Three independent confirmations of the same specific mechanism.

By contrast, Takaful and Karama (the cash-transfer programme covering disability, elderly, and child poverty) was checked for the same link **three separate times** across this session and Egypt's own — this session's ILO GIMI-profile read, a Daily News Egypt funding report with no inflation rationale, and a dedicated Grok search for a CPI-formula document — and came back negative every time. The contrast within one country (pensions formula-linked, cash transfers not) is itself the finding, not a gap.

Also: CAPMAS's own metadata for its *current* CPI series (independently fetched this session, not Grok-sourced) shows Egypt still runs COICOP-HBS 1999/2000, not the 2018 vintage South Africa and Nigeria use. New node `un-coicop-hbs-1999`, deliberately distinct from `un-coicop-2018` — different editions of the same UN standard, both currently governing a live national release. And the docx's "Law No. 12 of 2025" citation for Takaful/Karama's legal anchoring, unconfirmed as of the first Egypt pass, was independently confirmed via a second source (lawhub.info, quoting Articles 3 and 4 directly) — new node `eg-social-security-law-12-2025`.

### 3. Kenya: a weakened disability cash-transfer basis, and the branch's first non-EU supranational instrument

`ke-social-protection.json`, 7 nodes / 4 deps. The docx frames Kenya as "moving toward formal indexation" via its 2025 Social Protection Act. Independently checked, that Act's actual clause (s.39) is permissive only — "the Board **may**... periodically review... to accommodate changes in real value" — no duty, no formula, weaker than even South Africa's Gazette-notice power.

More significant, found via the Grok round: the Persons with Disabilities Act 2025, which repealed the 2003 Act on 27 May 2025, does not restate a fixed disability-benefit entitlement. Its s.57(2) makes the PWSD-CT-style cash transfer fully discretionary ("the Cabinet Secretary **may**... grant... such amount as may be prescribed"), cross-references an unidentified "Social Assistance Act" that could not be confirmed to exist, and is contingent on s.57(3) implementing regulations not confirmed to have been issued. NCPWD's own impact-assessment report (independently found this session) states plainly the inflation-erosion review "has never been done since the programme started." The PWSD-CT programme (KES 2,000/month, fixed since a 2015/16 scale-up) may currently be running on genuinely uncertain legal footing — its old hook is repealed, its new one is optional and possibly not yet operable. Recorded as an open question, not resolved either way.

Separately, and structurally the most interesting single find of the session: KNBS's own CPI rebasing report states the domestic CPI was aligned with "the COMESA and EAC HCPI regulations" — and the East African Community's own regulation for compiling a Harmonised CPI (March 2022) is binding and directly applicable across member states, not a voluntary standard. New node `eac-hcpi-regulations`, filed `jurisdiction_level: supranational` on exactly the reasoning the corpus already applies to the EU's ESA 2010 (a regional body legislating an obligation, not a standard adopted by choice) — the first non-EU example of that legal shape anywhere in the corpus. Also new: `imf-e-gdds`, since Kenya turned out to be on the IMF's weaker e-GDDS tier rather than the full SDDS South Africa and Egypt are both confirmed on — the graph can now actually distinguish IMF dissemination tiers instead of treating every country's status as equivalent.

### 4. The Grok-trust policy change, and what it resolved that pure WebFetch couldn't

Recorded in Claude's own project memory (`feedback_grok-as-verification`) as a standing rule, but worth stating here because it changed what this session could actually finish: cbe.org.eg, sis.gov.eg, kenyalaw.org, and KNBS's site were unreachable by this session's own tools for the entire session (WAF blocks, SSL errors, or 403s, in different combinations). Every one of Egypt's and Kenya's genuinely hard-to-reach facts — the Law 12/2025 citation, the IMF DQAF formula details, the Persons with Disabilities Act's actual cash-transfer clause, Constitution Article 54's verbatim text, the EAC regulation's binding status — came from a Grok round, not from this session's own fetches. The first Egypt round still got an independent second check on two of three items before Thomas's standing instruction landed; every round since has minted Grok's answer directly, with confidence tags carried through into the JSON descriptions.

## Secondary observations (logged, low priority)

* South Africa, Egypt and Kenya are now three separate confirmations that "the CPI feeds monetary policy or a formula somewhere" doesn't mean "the whole benefit system is automatic" — in every country checked so far, at most one or two specific mechanisms turn out to be genuinely formula-linked, and the rest remain discretionary even when the docx's summary made them sound uniform.
* Kenya's Constitution Article 54 (disability rights) was fetched and minted, and notably contains zero reference to cash assistance, social security, or benefit levels — the constitutional hook for disability rights in Kenya is dignity/access/political representation, not income support, which sits instead in ordinary legislation and administrative programmes with much weaker legal footing (see Finding 3).
* Two Grok-reported leads were deliberately NOT minted for lack of a verbatim quote: the NSSF Act's reference to KNBS's Economic Survey for contribution-ceiling calculations, and a pending Pensions (Amendment) Bill proposing CPI-linked cost-of-living adjustment. Real, worth a direct follow-up, not guessed into the graph without an actual clause in hand.

## Corrections to prior sessions

1. `AF/G.1.md`'s Cheap Check #3 (whether `za-sassa-annual-report` should carry a direct edge to `za-social-assistance-act-2004`) was not resolved this session — still open, not addressed by the follow-up files, which focused on new ground (fiscal federalism, national accounts, labour) rather than revisiting that specific slice.
2. No other prior claim was found wrong this session. Every South African finding from G.1 held up under the follow-up rounds; nothing needed retraction.

## Thomas's stated priority for the remaining work

1. Ethiopia — 6 raw docx entries (PSNP5, a federal-woreda programme, never colonised in the conventional sense bar a brief 1936-41 Italian occupation). **In progress as of this hand-off** — split into a parallel Claude/Grok pass, see below, specifically so the two research paths cover different ground and cross-connect rather than duplicating each other.
2. Tanzania — 4 raw entries (NBS CPI, National Social Protection Policy 2023). Not started.
3. Ghana — 2 raw entries, flagged by the docx's own regional overview as the one clear case of explicit automatic indexation (LEAP linked to GSS CPI). Not started; small entry count, potentially high research value, may be worth doing before Tanzania once Ethiopia closes.
4. Nigeria — 9 raw entries (CPI rebasing, PenCom pension reviews, National Social Safety Net Programme). Not started. Note: Nigeria's CPI already appears indirectly in the corpus's existing `international-frameworks.json` dropped-notes (the Canada/US COICOP precedent this session cited twice) — worth checking for any existing Nigeria-adjacent nodes before starting fresh.
5. Whether to model the docx's own regional-typology prose (North/Southern/East/West Africa, WAEMU Harmonised CPI, AFRISTAT) as anything in the corpus — raised in G.1, still not raised with Thomas, still open. Worth raising now that a real non-EU supranational instrument (EAC's HCPI regulation) has actually been minted — WAEMU may be a second example of the same pattern.
6. Import review: five DRAFT JSON files are sitting un-imported in `src/data/research/`. Not on Thomas to review, but worth surfacing explicitly rather than letting it slide — this branch now has real, verified, but entirely inert data.

## Cheap checks still outstanding

1. Constitution s.28 (South Africa, children's rights) — cited secondhand via the Western Cape DSD document this session, never independently fetched.
2. `za-sassa-annual-report` → `za-social-assistance-act-2004` direct edge (carried over from G.1, still unresolved).
3. The IMF's DSBB DQAF pages are JS-rendered and have now failed for South Africa, Egypt, and Kenya across every tool tried, Grok included. Stop re-attempting this per country going forward — it's a confirmed, recorded limitation, not a per-country gap. If a JS-capable browser tool becomes available, it's worth one batch re-check across all three countries at once rather than three separate attempts.
4. Whether `EG` and `KE` got `COUNTRY_FAMILY` palette entries alongside their (still-unimported) JSON files — not checked this session since nothing has been imported yet.

## What to pass at the start of next thread

1. This file, plus `AF/G.1.md` for full context (Orientation there still applies).
2. `country afrikans.docx` — Ethiopia's 6 entries, PSNP5 Design Document, next up.
3. The five DRAFT JSON files in `src/data/research/`, all still awaiting Thomas's review/import: `za-fiscal-federalism.json`, `za-national-accounts-labour.json`, `za-followup-gaps.json`, `eg-cpi-social-insurance.json`, `ke-social-protection.json`.
4. **The Ethiopia parallel-research split, started this session and not yet completed**: Thomas asked for Claude and Grok to work simultaneously on different angles of the same country, specifically so the two paths don't duplicate each other and ideally cross-connect. The split as scoped: Claude takes the PSNP5 core CPI-to-wage-rate mechanism (the docx already quotes this heavily — "the wage rate will be revised annually based on the consumer price index" — and capacity4dev.europa.eu, an EU-hosted site, is likely to actually be fetchable where many African government sites this session were not) plus Ethiopia's federal-woreda constitutional structure. Grok takes the PSNP5 donor/funding architecture (it's a multi-donor trust fund programme — World Bank and other international financiers are likely involved and likely to produce international-node edges the corpus doesn't have yet for this branch), any other Ethiopian benefit programmes beyond PSNP the docx's 6 entries don't cover, Ethiopia's IMF SDDS/e-GDDS tier and COICOP/CPI-Manual alignment for the Ethiopian Statistical Service (ESS), and whether Ethiopia's federal-woreda structure has any documented fiscal-transfer mechanism analogous to South Africa's equitable share. A Grok prompt for this exact split was written and sent in this same session — see the conversation, or reconstruct from this section if it's been lost.
5. `feedback_grok-as-verification` (Claude's project memory) — the standing rule that makes the parallel-research approach possible at all. A new agent needs to know Grok's answers are trusted directly, not re-verified, before it can usefully split work with Grok rather than just using Grok as a fallback.

# How to write the next hand-off

Adopted wholesale for this branch 2026-08-10 (G.1), following `AU`'s and `NZ`'s precedent of adopting the EU spec verbatim — copy this whole section into every successor, so the chain never depends on one file surviving. It is the spec, not an example.
When Thomas says "write the next handoff", "write the next G file", "wrap this thread up" or anything close, this is what he is asking for. Do not ask which format.
Mechanics

* Filename: `G.<n>.md`, where `<n>` is one higher than the highest-numbered `G.*` file in `AF/`. Take the highest number, not the count.
* Write it as `.md`, plain text, in `AF/`.
* Then write the JSON sidecar. Every hand-off has a machine-readable twin at `AF/G.<n>.json`. Do not hand-write it — run:

```
python3 scripts/handoff-to-json.py AF/G.<n>.md

```

The Markdown stays the document of record; the JSON is a structured index of it (date, predecessor, findings, corrections, priorities, cheap checks, and which required sections are missing). `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar across all branches (`BRANCHES` in the script now includes `"AF"`); `--check` reports which are stale without writing. If you are ever unsure whether the sidecar is current, just re-run it — it is idempotent.
* Never edit a predecessor. Corrections to earlier sessions go in this file's Corrections section, where they are dated and attributable. The one exception is this spec block, which is copied forward unchanged.
* This branch's priority lists are plain-numbered, not the EU's lettered A–G convention — following `AU`'s and `NZ`'s precedent. The sidecar script's priority parser falls back to numbered/bullet lists automatically when no lettered blocks are found.

Required structure, in this order

```
# G.<n>.md — Africa galaxy hand-off

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

Drop a section only if it would be empty, and say so in one line rather than leaving a heading with nothing under it. Corrections and Thomas's stated priority are never dropped: an empty Corrections section is itself a claim (nothing earlier was found wrong) and should say that explicitly.
What each section is for
Orientation — carried forward and updated, not rewritten each time. A new agent must be able to read this section alone and know what to read next.
Session conditions — what constrained the work: session type, what tooling was available, what did not arrive, what was left untouched by instruction. State plainly which sources you read in full, because everything downstream inherits that limit.
Headline result — the single most important thing established, and how strongly. If the session established nothing, say that; a session that only refutes is still a result.
Findings — numbered `###` subsections, one per finding. Each states what was checked, what was found, and what it rests on. Quote verbatim; `Research.1.md` §2/§3 apply here exactly as they do to research output.
Secondary observations — real but low-priority. Keep them short.
Corrections to prior sessions — numbered, each naming the file and the claim being corrected, and whether it is confirmed, refuted, overstated or resolved. A session that finds a predecessor wrong and does not record it here has actively damaged the corpus.
Thomas's stated priority for the remaining work — the numbered list carried forward from the predecessor, edited to reflect what moved. Mark items no longer needed explicitly and say why, rather than deleting them silently.
Cheap checks still outstanding — ordered by value per unit effort, each one a single lookup.
What to pass at the start of next thread — the packing list. If the next agent has filesystem access, say so and keep the list anyway; it doubles as an index of what matters.
Conventions that make these files worth reading

* Say what you did not do. Every one of these files carries an explicit not-read / not-verified statement.
* Distinguish inference from documented fact, and say which narrow respect is still inference.
* A refuted hypothesis is a good outcome. Report both sides of a conflict and pick neither; `Research.1.md` §3 is explicit that adjudication is not the research role.
* Do not pad. These files are dense because every line earns its place.
