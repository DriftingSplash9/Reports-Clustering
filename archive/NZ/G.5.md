# G.5.md — New Zealand/SAO galaxy hand-off

Date: 2026-08-07
Governing briefs: `Research.1.md` read in full this session (not amended). `MISSION-TODO 2.0` (`planning/MISSION-TODO-2.md`) read as the mission's entry point and used to select this session's work (P0 item 1 and P1 item 7). `planning/Decisions-2026-08-07.docx` not opened directly — its two relevant decisions (mint the Public Finance Act 1989 with no cap on same-session edges; Auckland as the second exemplar council) were read as already transcribed into MISSION-TODO 2.0 and NZ/G.4.md, and this session did not re-open the .docx itself. Flagged so a successor can decide whether that is good enough.
Predecessor: `G.4.md` (2026-08-06, three threads back).

## Orientation — if you are a new agent, start here

This is a Cowork cloud session, not a local Claude Code session: the working repo lives on Thomas's machine (`C:\Users\thoma\Desktop\My Files\Reports Clustering`) and was reached through the remote-devices file bridge, with research done through both a cloud-side `WebFetch`/`curl`+`pypdf` pipeline (network-enabled) and the `claude-in-chrome` browser extension for sites that gate non-browser clients. Everything downstream of this file inherits that split; see Session conditions.

The project draws a 3D graph in which every node is a recurrently published official report and every edge is a documented statement that one report uses another as an input. One rule: if no document says it, the edge does not exist.

Read, in this order:

1. `Research.1.md` (project root) — the full governing brief, §2's caveat-note and hand-off-spec-adoption addenda in particular, since those postdate `G.4.md`.
2. `planning/MISSION-TODO-2.md` — the mission's current entry point. P0 item 1 (mint the Public Finance Act 1989) and P1 item 7 (Auckland as the second NZ exemplar council) are what this session executed; P0 item 1 is now fully closed and should be struck there.
3. `G.1.md` through `G.4.md`, in full — the New Zealand slice, the method, the Realm and associated-states comparison, the schema decision, and the Tokelau/Public Audit Act 2001 work.
4. This file, in full.
5. The slice: `src/data/research/nz-government-finance.json` (changed this session — read the `_note` field's newest ADDENDUM first, then the `_dropped` array, which now carries six new entries this session added and one it closed in place).
6. `research-input/Grok-Research-Brief-XI.md`. Items 25, 27 and 28 are still `not_attempted` and are still not this session's work — see Thomas's stated priority.

Where things are, as of end of session 2026-08-07 (fourth NZ thread):

* The corpus grew from 355 reports / 416 dependencies (MISSION-TODO 2.0's count at the start of this session) to **358 reports / 423 dependencies**. `npm run check` exits 0. `npm run validate` exits 0 with no `✗` anywhere in the output — the Montenegro note this branch tracked through three sessions is confirmed gone (not investigated further; likely closed by an EU or AU session between `G.4.md` and this one, since no NZ session touched it).
* Three new nodes, all `NZ`: `nz-public-finance-act-1989`, `nz-lgaca-2009` (Local Government (Auckland Council) Act 2009 — new to this branch, not in `G.4.md`'s plan), `nz-auckland-annual-report`.
* Seven new dependencies (five into/around the Public Finance Act 1989, two for Auckland). No new relations.
* `Public Finance Act 1989` enters the corpus at weighted authority rank **#4 overall** (0.549, behind only ESA 2010, the CPI and the Public Audit Act 2001, which itself moved to rank #3) — the four documented inbound edges this session minted are not a marginal addition to the ranking, they are now among the most-cited nodes in the entire graph.
* No schema change. `src/lib/types.ts` untouched.

## Session conditions — read this first

**Tooling split, stated plainly because it differs from every predecessor in this branch.** This session ran as a Cowork cloud session with two research channels rather than `G.4.md`'s single browser: (1) a cloud sandbox with real outbound network access, used for direct `curl` + `pypdf` extraction of PDFs (treasury.govt.nz, ao.parliament.nz, aucklandcouncil.govt.nz all served raw bytes to `curl` with a standard desktop User-Agent header — none of the three needed a browser this session, which is itself worth recording since `G.1.md`–`G.3.md` reported some of these as blocked); (2) the `claude-in-chrome` browser extension, used exclusively for `legislation.govt.nz`, on the DOM-extraction-against-`div.prov` route `G.4.md` established (its text extractor still returns nothing; this was re-confirmed, not rediscovered blind). No subagents were used for any extraction in this file — every quote below was fetched and read first-hand by this session.

**`npm run check`/`npm run validate` were run from a fresh scratch copy in the cloud sandbox, not from `device_bash`'s local Linux VM**, which is a variant on the README's documented workaround worth recording: `device_bash` on Thomas's machine has no outbound network at all (confirmed this session by a failed `git push`, HTTP 403 from a proxy), so `npm install` cannot run there even after excluding `node_modules`. The cloud sandbox has network but started with no copy of the repo. Resolution: staged the full `src/` tree, root config files and `scripts/validate-data.ts`/`eu-schema-smoke.ts` into the cloud sandbox via the file bridge (three `device_stage_files` calls, the 50-file-per-call cap requiring a split), built `/tmp/rc-check` from that plus this session's edited `nz-government-finance.json`, ran `npm install` there (162 packages, 0 vulnerabilities), then `npm run check` and `npm run validate`. Both clean. **The edited data file itself was authored directly against the real path under the file bridge** (`/mnt/user-data/uploads/Reports Clustering/src/data/research/nz-government-finance.json`, which round-trips to the real folder via `device_commit_files`), not against the scratch copy — so this session did not repeat the mistake the README warns four prior sessions made.

**Git.** The local repo was one commit ahead of `origin/main` at the start of this session (`0dbaa33`, the AU Victoria-pass commit, committed but not pushed by the predecessor). `git push` from `device_bash` fails with `HTTP 403 from proxy` — no network, as above. The cloud sandbox has network and a GitHub credential, but it is scoped to a different, Anthropic-managed repository allowlist and returned `"GitHub access to this repository is not enabled for this session"` when tried against `DriftingSplash9/Reports-Clustering`, with no tool available in this Cowork session to request access to an arbitrary repo (that mechanism exists in Claude Code's GitHub Actions integration, not here). **Net effect: this session, like the one before it, can commit locally but cannot push from either available shell.** Both this session's commit and the predecessor's are sitting on `origin/main`'s local ahead-count when this file is written. Flagged plainly per the standing git policy (`Research.1.md`) rather than silently left for the next session to rediscover — **someone needs to either push from a machine with real GitHub credentials, or tell a future session how to get push access from this environment.**

## Headline result

**The "does the chain shape generalise?" question `G.4.md` posed for the second exemplar council has a real, two-part answer, and it runs in different directions on different edges.** Auckland Council — New Zealand's only unitary "super city," chosen for exactly that reason — confirms the accounting-standard chain (PBE IPSAS 1 named by exact title, in the same "changes to accounting standards" note structure as Wellington) and adds a genuinely new statutory layer Wellington cannot have (the Local Government (Auckland Council) Act 2009, governing the substantive-CCO structure and, as of 1 July 2025, Watercare's financial separation from the Council). But it **refutes** generalisation on two other edges Wellington carried cleanly: Auckland's own reporting-entity text never names the Public Audit Act 2001 (only the independent auditor's own report does) and never names the Rating Valuations Act 1998 in any document checked this session (only "the Valuer-General," a role the Act creates, appears). Both are recorded as `denied`, not `deferred` — the documents were read and the naming is genuinely absent, which is the finding.

Separately, and higher-confidence: the Public Finance Act 1989 mint (Thomas's decision, no cap on same-session edges) found a clean, bidirectional statutory relationship with the Public Audit Act 2001 that no prior session had reason to look for — each Act defines a term the other Act's own scope provisions rely on (PFA defines "Auditor-General" by cross-reference to PAA s 4; PAA defines "Crown entity," "department" and "office of Parliament" by cross-reference to PFA s 2(1)) — and PFA's own s 2(1) independently corroborates the Auditor-General's self-description in its annual report ("Office of Parliament means ... the Auditor-General").

## Findings

### 1. The Public Finance Act 1989 was minted with five edges, not one, and two of them run in the direction nobody had reason to check

*What this rests on: legislation.govt.nz (PFA 1989, PAA 2001, both current consolidations) via DOM extraction against `div.prov`; treasury.govt.nz PDFs (FSGNZ 2025, BEFU 2025) via direct `curl` and `pypdf`; ao.parliament.nz's Notes to the Financial Statements page via direct `curl`. All first-hand, this session.*

`MISSION-TODO 2.0` P0 item 1 recorded the decision and one piece of evidence — the OAG's own compliance statement hanging NZ GAAP on the Public Finance Act rather than the Public Audit Act — and instructed the minting session to add every verifiable edge, no cap. Five were found:

* `nz-treasury-fsgnz -> nz-public-finance-act-1989`. FSGNZ's own Note 1: "These financial statements have been prepared in accordance with the Public Finance Act 1989 and with New Zealand Generally Accepted Accounting Practice (NZ GAAP) as defined in the Financial Reporting Act 2013." The Act's own s 2(1): "annual financial statements of the Government means the annual consolidated financial statements for the Government reporting entity prepared under section 27" — FSGNZ is, by the Act's own definitional clause, defined into existence by section 27.
* `nz-treasury-befu -> nz-public-finance-act-1989`. BEFU's own introduction: "the Public Finance Act 1989 requires the Treasury to produce a range of stewardship documents: ... twice-yearly Economic and Fiscal Updates, and monthly and annual Financial Statements of the Government" — the same sentence names both this edge and the FSGNZ edge above. NAMING CAVEAT recorded in the edge basis: the Act's own term is the broader "economic and fiscal update" (s 26O); "Budget Economic and Fiscal Update" is Treasury's own document title for the Budget-day instance.
* `nz-oag-annual-report -> nz-public-finance-act-1989`. Fresh first-hand quote (not the one already in the corpus from `G.4.md`'s session, which came from a different page): the Notes to the Financial Statements page, Note 1: "The Controller and Auditor-General is a corporation sole established by section 10(1) of the Public Audit Act 2001, is an Office of Parliament for the purposes of the Public Finance Act 1989, and is domiciled and operates in New Zealand." Corroborated from the Act's own side: PFA s 2(1), "Office of Parliament means the Parliamentary Commissioner for the Environment (and that Commissioner's office), the Office of Ombudsmen, and the Auditor-General" — the self-classification matches the Act's own closed list of three.
* `nz-public-audit-act-2001 -> nz-public-finance-act-1989`. PAA's own s 5 interpretation imports three terms wholesale: "Crown entity has the same meaning as in section 2(1) of the Public Finance Act 1989," and likewise for "department" and "office of Parliament." Plus the s 37(1)/s 43 routing already known from `G.4.md`, now independently confirmed against PFA's own s 43 text this session ("Departments must prepare annual reports").
* `nz-public-finance-act-1989 -> nz-public-audit-act-2001` — **the reverse edge, found only because this session read PFA 1989's own text rather than stopping once the PAA-side citation was confirmed.** PFA s 2(1): "Auditor-General has the meaning given to it by section 4 of the Public Audit Act 2001." PFA s 29B: "the Government reporting entity is a public entity as defined in section 4 of the Public Audit Act 2001 and, in accordance with that Act, the Auditor-General is its auditor." The Government's own audit arrangement is assigned by PFA through a term PAA supplies, not defined afresh — a genuine mutual dependency, each direction independently quoted.

The pre-existing `_dropped` entry that named this lead (`G.4.md`'s "THREE LEADS OPENED..." note) was edited in place per this branch's retain-don't-delete convention: `reason` changed from `deferred` to `note`, original text preserved below a closure statement naming what resolved each of the three sub-items.

### 2. Auckland Council's own financial statements name a fourth New Zealand statute this corpus had never seen

*What this rests on: `volume-3-financial-statements-2024-2025.pdf`, fetched directly from aucklandcouncil.govt.nz with `curl`, 152 pages, `pypdf`-extracted, this session; corroborated against `Local Government (Auckland Council) Act 2009`'s own text on legislation.govt.nz, DOM extraction, this session.*

Auckland's own Reporting entity clause: "Auckland Council is a local authority domiciled in New Zealand and governed by the following legislation: Local Government Act 2002 (LGA 2002); Local Government (Auckland Council) Act 2009 (LGACA 2009); and Local Government (Rating) Act 2002." LGA 2002 and the Rating Act were already load-bearing in this slice; **the LGACA 2009 was not, and is New Zealand's amalgamation statute — it exists because Auckland is not an ordinary territorial authority.**

Minted `nz-lgaca-2009` and one edge, `nz-auckland-annual-report -> nz-lgaca-2009`, on more than the reporting-entity boilerplate: the Act shapes the accounts substantively. Auckland's own footnote: "Section 4(1) of the LGACA 2009 defines substantive CCOs as a CCO that is either wholly owned or wholly controlled by Auckland Council and either is responsible for the delivery of a significant service or activity on behalf of Auckland Council or owns or manages assets with a value of more than $10 million" — independently confirmed against the Act's own s 4(1), word for word. And, on Watercare specifically: "Pursuant to section 57A of the LGACA 2009, the Auckland water organisation must repay all outstanding debt owed to the council" — confirmed against the Act, which also revealed s 57A is five months old: "Section 57A: inserted, on 1 July 2025, by section 110 of the Local Government (Water Services Preliminary Arrangements) Act 2024 (2024 No 31)." Auckland's water services separated financially from the Council during the reporting period this annual report covers — a live legislative event, not settled background law.

Also minted: `nz-auckland-annual-report -> nz-pbe-ipsas-1`, on the same structural footing as Wellington's edge into the same target (see Corrections 1 for why this is a confirmation rather than a new pattern).

### 3. Two edges Wellington carried do not transfer to Auckland, and the negative is the finding

*What this rests on: the same 152-page Volume 3 extraction, full-text grepped for "Public Audit Act," "XRB A1," "Rating Valuations Act" and "Valuer-General"; aucklandcouncil.govt.nz's "About property revaluations" page, fetched this session.*

Wellington's Note 1 self-classifies: "As a defined public entity under the Public Audit Act 2001, the Council is audited by the Office of the Auditor General." Auckland's equivalent Reporting entity clause (quoted in Finding 2) names three statutes and the Public Audit Act 2001 is not among them. The only two "Public Audit Act 2001" occurrences in Auckland's Volume 3 are in the **Audit Office's own** independent auditor's report ("in exercising our functions and powers under the Public Audit Act 2001, we have no relationship with or interests in Auckland Council and Group"), not in a self-classifying statement by the Council. Recorded `denied`, on the precedent `G.4.md` set for the OAG's own accounts naming only generic "Tier 1 PBE Standards": the document was read and the self-classification is genuinely absent.

Same shape for the rating-valuation chain. Auckland's property-revaluation help page describes the same statutory mechanism the Wellington edge documents — a three-year cycle, Valuer-General oversight ("Independent property valuers work with the council to set property values. The Valuer-General checks these values to make sure they are correct.") — but never names the Rating Valuations Act 1998, where Wellington's equivalent page does ("governed by the Rating Valuation Act 1998"). Volume 3 itself has zero occurrences of "Rating Valuations Act" or "Valuer-General" anywhere in 152 pages. Recorded `denied` with `target: "nz-rva1998"`; no node proposed for the Auckland page itself, since a live objections-process help page does not obviously clear this corpus's own node bar (§4: titled, cadence, named by another document) the way Wellington's static rates-explainer arguably does.

One structural difference recorded alongside, unevidenced as an explanation: Auckland's 2024 general revaluation was completed by two independent providers jointly ("Independent valuation providers QV and Opteon completed the 2024 valuation process"), where Wellington names Quotable Value alone. Auckland's 628,819 rating units (Volume 3's own count) against Wellington's much smaller roll is offered as a plausible reason in the `_dropped` note, explicitly flagged as not confirmed by any document.

Together, Findings 2 and 3 are this session's actual answer to `G.4.md`'s framing question: the chain's *statutory skeleton* generalises (both councils sit on LGA 2002, PBE accounting standards, three-yearly Valuer-General-audited revaluations), but *disclosure precision* does not — which document names which Act by title varies council to council, exactly the kind of thing a second exemplar exists to test rather than assume.

## Secondary observations (logged, low priority)

* Three PDFs that prior sessions in this branch, or the AU branch's own notes, might lead someone to expect trouble with — `fsgnz-2025.pdf`, `befu25-v2.pdf`, `volume-3-financial-statements-2024-2025.pdf` — all served cleanly to a plain `curl` with a standard desktop User-Agent header from this session's cloud sandbox. `treasury.govt.nz`'s HTML landing pages return HTTP 403 to the same `curl` (confirmed for the BEFU landing page); the direct PDF links under `/sites/default/files/` do not. Worth knowing before a future session assumes a browser is required for Treasury material generally — it is required for the landing pages, not the PDFs, and the PDF links have to be located some other way (this session used `claude-in-chrome` once, to read the BEFU landing page's rendered `<a href$=".pdf">` links, then fetched the PDF itself with `curl`).
* `nz-oag-annual-report`'s front page (`ao.parliament.nz/2025/annual-report/`) is a lightweight navigation page, not the "About us" body text `G.4.md` quoted from — that text lives on a different sub-page this session did not need and did not fetch. Recorded so a successor does not spend time on the same page this session found thin.
* The Independent Māori Statutory Board (LGACA 2009 Schedule 2, identified via the s 4(1) "selection body" definition) has its own clause making its members personally responsible for the board's Public Finance Act 1989 obligations, and separately defining the board as a Public Audit Act 2001 public entity. Not minted — a personal-liability clause about individual members is not a statement about LGACA 2009 as a whole, and the Board itself publishes no recurring titled release found this session — but recorded as a third documented instance (after the OAG and Auckland Council) of a New Zealand public body's Public Finance Act 1989 obligations reaching outside central government.
* The corpus's `npm run validate` output lists dozens of report titles prefixed with `?` in what appears to be a ranking-adjacent section this session did not fully trace to source in `scripts/validate-data.ts`. Not a warning or an error — exit code 0, zero `✗`, and the same run's explicit WARNINGS section (isolated nodes) is separate and complete — but flagged because it was not immediately obvious from the CLI output alone what the `?` prefix means, and a future session should not assume it is benign without checking the script.

## Corrections to prior sessions

Nothing in `G.1.md` through `G.4.md` was found wrong this session. This is stated explicitly per this branch's own convention rather than left as an empty section. The Public Finance Act 1989 deferral (`G.2.md`/`G.4.md`) was a correct call, not a gap — `G.4.md`'s own framing ("probably the right next statute to mint") is confirmed by this session's ranking result (Finding 1). `G.4.md`'s Wellington/PBE IPSAS 1 edge is confirmed to generalise (Finding 2) rather than corrected.

## Thomas's stated priority for the remaining work

Carried forward from `G.4.md`, marked against what moved. No lettered list for this branch; plain numbers per the 2026-08-07 branch-numbering decision (`Research.1.md`).

1. ~~A Stats NZ national-accounts pass.~~ **Done before this session** (commit `3c97564`, per MISSION-TODO 2.0) — struck here since `G.4.md` still listed it as open.
2. ~~A second exemplar council for New Zealand.~~ **Done this session.** Auckland chosen and researched; see Findings 2–3. A third council (Christchurch was the other one `G.3.md`/`G.4.md` named as browser-only) would test whether Auckland's negative findings are Auckland-specific or typical of non-Wellington councils generally — genuinely useful, but the marginal case for a third data point is weaker now that the "does it generalise" question has one real answer with both a yes and a no in it. Not scoped as urgent.
3. `Grok-Research-Brief-XI.md` item 25c — Chile's SII avalúo fiscal. Unchanged from `G.4.md` item 3. Still not attempted by this branch.
4. Item 27 — the nineteen unscouted jurisdictions, Crown Dependencies first. Unchanged from `G.4.md` item 4.
5. ~~Decide the Public Finance Act 1989.~~ **Done this session.** See Finding 1.

New, opened by this session's own work:

6. **Mint Watercare Services Limited as a node.** LGACA 2009 ss 4(1), 56A, 57A/57B and Auckland's own Volume 3 all point at it, and New Zealand's water-sector reform (Local Government (Water Services Preliminary Arrangements) Act 2024) is a live, dated story — s 57A/57B are self-repealing five years after commencement. Watercare publishes its own annual report; this is a second-document task, deliberately not started this session. See the `_dropped` `no-node-yet` entry for the full evidence trail.
7. **Decide the Local Government Act 2002.** Cited well over a hundred times across this slice's own documents (128 occurrences inside LGACA 2009 alone) and never itself a node — every existing edge cites a specific section as basis for some *other* node's dependency. Same shape of decision the Public Finance Act 1989 just was: not whether, but how many edges it should collect on arrival, and it would sit under a very large fraction of this slice at once. Flagged as a lead (`_dropped`, `no-node-yet`) rather than minted as a side effect of the LGACA 2009 edge.

## Cheap checks still outstanding

Carried from `G.4.md`, status updated:

1. ~~Mint the XRB A1 and Wellington edges to `nz-public-audit-act-2001`.~~ Done (commit `6135a36`, "NZ cheap checks 1-2," before this session).
2. ~~Re-read the back half of the Auditor-General's annual report.~~ Done (same commit, per the `_dropped` entry this session read).
3. ~~Fix or reclassify the Montenegro note.~~ Confirmed closed — `npm run validate` printed zero `✗` this session. Not investigated which session or branch closed it.
4. Open NZSIOC's defining document and mint it between `nz-statsnz-aes` and `anzsic`. Still outstanding.
5. Add a `reason` value for caveat-notes. **Done** — `Research.1.md` §2 and `src/lib/types.ts`'s `DroppedReason` both document `caveat` as of 2026-08-07 (this session used it nowhere, but confirmed it exists and is validator-enforced).
6. Re-fetch the two inherited quotes flagged in `G.3.md` Findings 1 (Stats NZ DataInfo+ GFSM block, PBE IPSAS 1 "Comparison with IPSAS 1" appendix). Not attempted this session.
7. Mint the Census Annual Survey of State and Local Government Finance (Puerto Rico). Not attempted this session — out of this branch's SAO/NZ scope proper, tracked in MISSION-TODO 2.0 P2 item 13.
8. Locate the Puerto Rico Planning Board forecasts. Same as above.
9. Find the June 2026 revised Puerto Rico fiscal plan. Same as above.
10. Decode the OAG's New Zealand long-term-plan observations report, now known reachable directly at `ao.parliament.nz` rather than via Wayback. Not attempted this session — MISSION-TODO 2.0 P2 item 12.

Carried from `G.1.md`, untouched: the full re-extraction of LGA 2002 Schedule 10, and the current-consolidation content check on s 106(2C) (existence confirmed 2026-08-06, content still unread).

## What to pass at the start of next thread

If the next agent can read the folder, pass nothing — point it at this file.

1. This file (`NZ/G.5.md`) — paste as text, do not attach.
2. `G.4.md`, `G.3.md`, `G.2.md`, `G.1.md` — the frontier, the two-thread PFA/PAA/Tokelau work, the Realm comparison, and the original method.
3. `Research.1.md` — read in full; it is shorter than the accumulated branch files and changes underneath them.
4. `planning/MISSION-TODO-2.md` — the mission's entry point; mark item 7 (this session) and confirm P0 item 1 is struck.
5. `src/data/research/nz-government-finance.json` — read the `_note` field's ADDENDUMs in order, then `_dropped`, which is now the richest part of this slice.
6. `research-input/Grok-Research-Brief-XI.md` — items 25, 27, 28 still open.
7. **A browser** (`claude-in-chrome`), for `legislation.govt.nz` specifically. Everything else this session touched (`treasury.govt.nz`, `ao.parliament.nz`, `aucklandcouncil.govt.nz`) served plain `curl` directly — do not assume a browser is needed for Treasury or council PDFs generally on the strength of `G.1.md`–`G.3.md`'s older reports; check first.
8. **Push access, or a plan for getting it.** Two sessions in a row now cannot push from the tools available to them. This is the single most consequential unresolved item in this file — everything else is research debt, this is standing infrastructure debt against the git policy `Research.1.md` itself states.
9. The verification rule, unchanged: prefer direct fetch over any summarising tool for anything that becomes a quoted `basis`, re-read every inherited quote before minting, and — this session's own addition — **read a statute in both directions when two Acts cross-reference each other.** The PFA-1989-to-PAA-2001 reverse edge (Finding 1) was found only because this session did not stop at confirming the citation everyone already expected.

# How to write the next hand-off

Adopted 2026-08-06 from the `EU/G.*.md` series (originally added there
2026-08-04), via `AU/G.1.md`. Copy this whole section verbatim into every
successor, so the chain never depends on one file surviving. It is the spec, not
an example.

When Thomas says "write the next handoff", "write the next G file", "wrap this
thread up" or anything close, this is what he is asking for. Do not ask which
format.

Mechanics

* Filename: `G.<n>.md`, where `<n>` is one higher than the highest-numbered `G.*`
  file in `NZ/`. This file is `G.3.md`.
* Write it as `.md`, plain text, in `NZ/`.
* Then write the JSON sidecar. Run:

```
python3 scripts/handoff-to-json.py NZ/G.<n>.md
```

The script's default "convert every file with no argument" mode only scans `EU/`
(hardcoded) — always pass the `NZ/G.<n>.md` path explicitly when working in this
branch; the underlying parser and JSON structure are not EU-specific despite the
script's own docstring describing only the EU case. The Markdown stays the
document of record; the JSON is a structured index of it.

* Never edit a predecessor. Corrections to earlier sessions go in this file's
  Corrections section, where they are dated and attributable. The one exception is
  this spec block, which is copied forward unchanged.

Required structure, in this order

```
# G.<n>.md — New Zealand/SAO galaxy hand-off

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
leaving a heading with nothing under it. Corrections and Thomas's stated priority
are never dropped: an empty Corrections section is itself a claim (nothing earlier
was found wrong) and should say that explicitly.

What each section is for

**Orientation** — carried forward and updated, not rewritten each time. A new
agent must be able to read this section alone and know what to read next. If the
folder layout or the tooling changed, that goes here.

**Session conditions** — what constrained the work. Session type (extraction vs
verification vs planning), what tooling was available, what did not arrive, what
was left untouched by instruction. State plainly which sources you read in full,
because everything downstream inherits that limit.

**Headline result** — the single most important thing established, and how
strongly. If the session established nothing, say that; a session that only
refutes is still a result.

**Findings** — numbered `###` subsections, one per finding. Each states what was
checked, what was found, and what it rests on. Mark any claim that depends on a
predecessor's reading rather than your own. Quote verbatim; `Research.1.md` §2
applies here exactly as it does to research output.

**Secondary observations** — real but low-priority. Section fingerprints,
oddities worth not rediscovering. Keep them short.

**Corrections to prior sessions** — numbered, each naming the file and the claim
being corrected, and whether it is confirmed, refuted, overstated or resolved.
This section is the reason the chain is trustworthy. A session that finds a
predecessor wrong and does not record it here has actively damaged the corpus.

**Thomas's stated priority for the remaining work** — lettered blocks carried
forward from the predecessor, edited to reflect what moved. Mark items no longer
needed explicitly and say why, rather than deleting them silently. This section is
what a new agent reads to answer "what is next".

**Cheap checks still outstanding** — ordered by value per unit effort, each one a
single lookup. This is the list that gets raided when a session has capacity left.

**What to pass at the start of next thread** — the packing list, for the case
where the next agent has no filesystem access. If it does have access, say so and
keep the list anyway; it doubles as an index of what matters.

Conventions that make these files worth reading

* **Say what you did not do.** Every one of these files carries an explicit
  not-read / not-verified statement. That is what makes the positive claims
  usable.
* **Predictions are logged and then scored.** Say explicitly whether a prediction
  landed, in later files too.
* **Distinguish inference from documented fact**, and say which narrow respect is
  still inference.
* **A refuted hypothesis is a good outcome.** Report both sides of a conflict and
  pick neither; `Research.1.md` §3 is explicit that adjudication is not the
  research role.
* **Do not pad.** These files are dense because every line earns its place.
