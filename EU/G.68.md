# G.68.md — EU galaxy hand-off

Date: 2026-08-09
Governing briefs: `Research.1.md` not reopened in full this session — §4 (node rule, one-off foundational instrument, cadence) applied from `G.65.md`–`G.67.md`'s own prior readings and this session's direct question to Thomas, not re-read fresh. `G.67.md` read in full; it is the whole input to this session. `G.67.md` closed item 10 (Brazil) and left Block B with exactly one scoped piece outstanding — item 11, the remaining 20-of-26 CIRCABC countries (plus one, Spain, not previously attempted by name). This session worked item 11 to completion.
Predecessor: `G.67.md` (2026-08-09)

## Orientation — if you are a new agent, start here

1. Do not run any git command against this repo. Not `git status`, not `git log`, not read-only. See `EU/G.54.md` / `Research.1.md` §2. Ask Thomas if you need git state. This session worked entirely over the device bridge and never touched `.git`.
2. `G.67.md` closed item 10 (Brazilian fiscal reporting) and left item 11 — the CIRCABC 26-country sweep, at 6/26 (BE, HR, BG, CY, CZ, EL minted) — as the sole remaining piece of Block B. **This session closed it.** All 21 remaining countries (`UK, SK, SI, PT, PL, NL, MT, LV, LU, FR, EE, DK, AT, IT, IE, LT, HU, SE, FI, RO, ES`) are now minted in `src/data/research/edp-inventory-regulation-479-2009.json`.
3. Each of the 21 had only ONE dated edition visible in CIRCABC's current top-level listing — under `Research.1.md` §4's ordinary node rule ("a single edition with no second one anywhere in sight is still not a node"), none would qualify. Asked directly (three options offered: mint anyway / require an external second source / document only and defer), **Thomas ruled to mint them anyway, as evergreen nodes** — no `releases_per_year`, no `cadence_note` — the same carve-out this corpus already gives one-off foundational statutes (`br-lc-101-2000`, `eu-reg-2016-2304`'s sibling treatment). This is a new applied precedent worth carrying forward: a document class known to recur (Article 9 compels every member state to keep its inventory updated) but observed only once, minted evergreen rather than left in `_dropped` indefinitely, when Thomas is asked and says yes. Do not generalise this to other single-edition documents without asking again — it was a direct ruling on this specific 21-country batch, not a standing rule change to `Research.1.md` itself.
4. Working method this session diverged partway through from prior CIRCABC sessions (`G.64.md`–`G.66.md`), and the reason matters for whoever does CIRCABC work next. The established method — click "Preview" from the shared 100-row folder listing, `Escape`, click the next country's Preview link — was used for the first several countries this session (via a mid-conversation compaction boundary; screenshots from that portion were later recovered from the raw transcript rather than re-described in prose, a first for this corpus's hand-off chain, noted in Secondary observations below). Partway through, a stale-viewer bug already flagged once in `G.66.md` ("PDF.js Preview viewer failed... on every attempt to open a non-current file-history version") turned out to have a second, worse variant: clicking a new country's Preview link without the PRIOR viewer's own `Escape`/close having fully registered can leave the PDF.js viewer showing the PREVIOUS country's content — same page count, same text — with no error at all, silently. This is more dangerous than the InvalidPDFException failures `G.66.md` documented, because it does not announce itself. **Fix adopted this session: navigate directly to each document's own CIRCABC `.../library/{uuid}/details` URL (a fresh page load) rather than clicking Preview from the shared folder listing.** This is slower (one extra navigation per country) but eliminates the staleness risk entirely, since each country starts from a clean page load rather than a reused viewer instance. Recommended as the default method for any future CIRCABC work in this project, not just a one-off workaround.
5. Two countries — Malta and Hungary — had been flagged earlier in this same session (via the old click-through method) as failing to render entirely ("stuck at Opening document... 100%", "0 of 0" pages). Both rendered cleanly on retry once navigated to directly by their own document URL. This resolves `G.66.md`'s open question about MT/HU as likely the SAME click-path-dependent issue as the CY/CZ/EL non-current-version failures, not a distinct structural PDF problem — worth re-testing if any future session hits an apparent CIRCABC render failure, before concluding a document is genuinely unreadable.
6. Mechanical facts, carried forward and re-confirmed: `device_stage_files`/`device_commit_files` cap at 50 files per call; `device_bash` gives read/write shell access to the mounted folder directly (`/sessions/<session>/mnt/Reports Clustering/` — quote the space). The actual JSON edit went through the established stage → build in `/tmp` with Python's `json` module → validate with `json.load` → `SendUserFile` → `device_commit_files` pipeline. A file-count check via `device_bash` after commit confirmed the edit landed cleanly on the actual file on Thomas's machine, not just the staged copy.
7. Sweep junk to `_to_delete/` on sight, log it in `notes/sweep-log.md`, never sweep Thomas's personal files. Unchanged; not exercised this session.

## Session conditions — read this first

A single-item session continuing directly from `G.67.md`'s own framing ("item 11... is now the only piece left in Block B"), not a punch-list or general sweep session. This session's own opening turn was interrupted by a context-window compaction partway through the CIRCABC browser work (after title-page verification for most of the 21 countries but before the JSON was built); the summary handed to the continuing turn flagged two specific mismatches (Poland, Netherlands) and two render failures (Malta, Hungary) but — critically — did **not** preserve the actual per-country title-page text, because that data had only ever existed as unlabelled browser screenshots, never written out as text. Rather than proceed on the summary's characterisation alone, this session recovered the raw screenshot images from the prior turn's own transcript file (`~/.claude/projects/.../*.jsonl`, read directly since transcripts are plain files) for the 14 countries captured that way, and re-verified the remaining 7 (UK, SK, SI, PT, PL, NL, MT, plus a clean re-check of HU) via fresh browser navigation this session, before writing anything to the corpus. This is worth recording as a general practice: **when a compaction summary describes visual/screenshot-based verification work, treat the summary's prose as a lead, not as the verified fact — the underlying images may still be recoverable from the transcript and should be checked before writing claims that assume the summary is complete.**

`npm run validate` was **not** run this session — same Windows-only esbuild/win32-linux mismatch through the device bridge noted in every recent hand-off back to `G.50.md`. A direct file-count on `edp-inventory-regulation-479-2009.json` alone, run via `device_bash` against the actual file on Thomas's machine after commit, gives **31 reports / 59 dependencies / 12 `_dropped` entries**, against 10/17/12 before this session's edit (`_dropped` count unchanged — entry 8 annotated in place, not added to). A corpus-wide file count across all `src/data/research/*.json` was not re-run this session (the single-file check was judged sufficient, since this session touched exactly one file); a future session doing a corpus-wide count should expect `G.67.md`'s 402/485/379 baseline plus this session's +21/+42/+0 delta: **423 reports / 527 dependencies / 379 `_dropped` entries**, unconfirmed directly.

The mint-anyway ruling (Orientation §3) is the one decision referred to Thomas this session, via a direct three-option question. He chose the first option, "Rule mint anyway (Recommended)".

## Headline result

Item 11 (the CIRCABC 26-country EDP-inventory sweep) is closed. All 21 remaining single-edition countries are now minted in `src/data/research/edp-inventory-regulation-479-2009.json` as evergreen nodes, per Thomas's direct ruling to mint single-edition documents of a known-recurring class anyway rather than withhold them pending a second observed edition. **Block B (the corpus-wide `_dropped` sweep) is now fully closed** — both item 10 (`G.67.md`) and item 11 (this session) are done, and no scoped piece of it remains outstanding.

## Findings

### 1. All 21 remaining countries carry exactly one dated CIRCABC edition, confirmed directly at source, not inferred from the folder listing alone

Title page (country + date) read directly for every one of the 21, via CIRCABC's in-page PDF.js Preview viewer: UK (United Kingdom / April 2015), SK (The Slovak Republic / 30.10.2020), SI (Slovenia / December 2022), PT (Portugal / June 2021), PL (Poland / December 2015, "Updated May 2018"), NL (Netherlands / 15 January 2020, "FINAL DRAFT"), MT (Malta / January 2022), LV (Latvia / June 2023), LU (Luxembourg / June 2021), FR (France / October 2016), EE (Estonia / November 2023), DK (Denmark / February 2023), AT (Austria / 19 December 2017), IT (Italy / July 2020), IE (Ireland / October 2018), LT (Lithuania / 2024, year only), HU (Hungary / June 2024), SE (Sweden / January 2024), FI (Finland / April 2025), RO (Romania / February 2025), ES (Spain / April 2025). Each minted as `{cc}-edp-inventory` with two `methodology_depends_on` edges (→ `eu-reg-479-2009`, → `esa-2010`), following the `cy-edp-inventory` template exactly, but with **no `releases_per_year`/`cadence_note`** per Thomas's ruling (Orientation §3) — these are evergreen nodes, not cadenced ones, the first time this corpus has applied the one-off-instrument treatment to a document class that is a *statistical inventory* rather than a statute or treaty.

### 2. Two filename-vs-title-page date mismatches found, reported and not adjudicated

United Kingdom: CIRCABC's filename dates the file `2015.12` (December 2015); the document's own title page reads "United Kingdom" / "April 2015" — an eight-month gap within the same calendar year. Netherlands: filename `2021.03` (March 2021); title page reads "Netherlands" / "15 January 2020 FINAL DRAFT" — over a year earlier, and the document is still self-labelled a draft despite the later filename date. Both flagged in the relevant node's `description` field per `Research.1.md` §3 (report contradictions, do not adjudicate), matching the convention already used elsewhere in this file for the Article 8.1 ESA95-vs-ESA2010 contradiction.

### 3. Two further countries show the filename tracking a secondary annotation line rather than the document's own primary date — a distinct pattern from a mismatch, worth naming separately

Poland: title page reads "Poland" / "December 2015" / "Updated May 2018" — the filename (`2018.05`) matches the "Updated" line, not the primary December 2015 date. Slovakia: title page reads "The Slovak Republic" / "30.10.2020" / "Sent to Eurostat on 31.08.2021" — the filename (`2021.08`) matches the transmission line, not the document's own compilation date. Neither is a contradiction (both dates on the page are consistent with each other, unlike UK/NL); it is a naming-convention finding, worth flagging because it means CIRCABC's filename-date convention — which this corpus previously established as reliably matching the title-page date in every checked case (DE, BE, HR, BG) — actually tracks *whichever dated line appears last on the page*, not necessarily the document's own primary compilation date. Future sessions relying on the filename-date shortcut for other CIRCABC documents should check the title page still says what the filename implies, not assume it.

### 4. Malta and Hungary's earlier apparent render failures do not reproduce when navigated to directly

Both flagged earlier in this session (before the direct-navigation method was adopted, see Orientation §4) as failing to open in CIRCABC's PDF.js Preview viewer. Both rendered cleanly (Malta: 151 pages; Hungary: 139 pages) on retry via direct navigation to each document's own `.../library/{uuid}/details` URL. This most plausibly resolves as the SAME click-path staleness/timing issue described in Orientation §4, not a distinct structural PDF problem — worth testing directly-by-URL before concluding any future CIRCABC document is genuinely unreadable, extending `G.66.md`'s InvalidPDFException finding (non-current file-history versions) with a second, related failure mode (stale/interrupted viewer state on the current version, from clicking through the shared listing too quickly).

### 5. `_dropped[8]` in `edp-inventory-regulation-479-2009.json` — the standing "26 further national EDP inventories" deferral — annotated closed

The entry (already carrying three prior UPDATE/FURTHER RESOLVED notes from `G.64.md`–`G.66.md`) was extended with a fourth note recording this session's full closure: all 21 remaining countries minted, the mint-anyway ruling, the two mismatches, the two annotation-line cases, and the two resolved render failures. Original text preserved beneath, per this corpus's stacked-annotation convention (never delete, always append and date).

## Secondary observations (logged, low priority)

* This session's screenshot-recovery-from-transcript step (Session conditions, above) is itself worth flagging as a technique for future sessions that resume after a compaction: raw conversation transcripts (JSONL) persist on disk independently of what a compaction summary chooses to describe, and tool results — including images — can be re-extracted directly (base64-decoded from the transcript's own tool_result blocks) rather than re-fetched from the live source, when the live source is still available anyway (as CIRCABC was here) but re-verification is cheaper than re-derivation. This is not a substitute for direct re-verification where it's feasible (this session did re-verify UK/SK/SI/PT/PL/NL/MT/HU fresh rather than relying on recovered images for those seven), but it correctly recovered LV/LU/FR/EE/DK/AT/IT/IE/LT/SE/FI/RO/ES without re-spending browser round-trips.
* Two title-page design templates were observed across the 21: a plain black-serif template (most countries) and a distinct coloured/graphic template (Ireland only, among this batch) — both are the same document class by title and content, the visual difference is cosmetic, not a different document family.
* Nine of the 21 had their exact "Inventory... according to ESA 2010" title line re-confirmed directly this session (UK, NL, MT, EE, DK, IT, HU, SE, ES) with the spacing variant noted (`ESA2010` vs `ESA 2010`, both attested, cosmetically inconsistent, never previously resolved and not resolved here either); the other 12 (SK, SI, PT, PL, LV, LU, FR, AT, IE, LT, FI, RO) had the country/date line confirmed but not the title line specifically, since screenshots in those cases scrolled past it — flagged in each affected node's own `description` field rather than silently assumed, per `Research.1.md`'s no-guessing rule.
* The Article 9 background-section boilerplate ("Compilation and publishing of the Inventory... is foreseen by Council Regulation 479/2009, as amended...") was reread directly this session for only one of the 21 (Ireland, which also surfaced the same Article 8.1 ESA95-quoting contradiction already logged for Germany and Cyprus). For the other 20, the `eu-reg-479-2009` dependency edge's `basis` field relies on this boilerplate's already-established presence across eight other national copies in this same file (DE/BE/HR/BG/CY/CZ/EL/IE) rather than a fresh page-2 read — flagged explicitly in each edge's own `basis` text, not left implicit. A future session with capacity could spend it rereading page 2 for the remaining 20 to fully close this gap, though the marginal value is low given how consistently this exact boilerplate has held everywhere it's been checked.

## Corrections to prior sessions

None. `G.66.md`'s and `G.67.md`'s framing of item 11 as needing its own scoped session, rather than a quick pass, held up — this session took a full working session to close it. `G.66.md`'s MT/HU render-failure note is extended rather than corrected (Finding 4): the failures were real as observed, and this session's finding is about their cause, not a refutation that they occurred.

## Thomas's stated priority for the remaining work

Lettered blocks carried forward from `G.61.md`–`G.67.md`.

* **B — the corpus-wide `_dropped` sweep. Now fully closed.** Both item 10 (`G.67.md`) and item 11 (this session) are done. No scoped piece of Block B remains. If Thomas wants a new `_dropped` sweep in future, it would need to be scoped as a fresh, later re-read of the corpus (which keeps growing), not a continuation of this one — `G.63.md`'s "read-complete as of 2026-08-09" claim is now fully worked through, not just read.
* A, C, D, E, F, G — untouched this session. See `G.56.md`–`G.62.md` for their current state.

Worth putting to Thomas when he next picks this up: with Block B fully closed, there is no longer a standing "next obvious item" the way item 10/11 were for the last several sessions. Whoever picks this up next will need either a fresh direction from Thomas or to survey blocks A/C–G for what's next, rather than continuing a punch list that no longer has open items.

## Cheap checks still outstanding

One, surfaced by Secondary observations above: reread page 2 (the Article 9 background section) directly for the 20 CIRCABC countries this session did not individually reread it for (all but Ireland), to fully close the flagged gap in each `eu-reg-479-2009` edge's `basis` field. Low value — the boilerplate has matched everywhere it's been checked across eight prior countries — but cheap, since the documents and their URLs are all already in hand in this file.

## What to pass at the start of next thread

1. This file's Headline result and Orientation §2–5, especially the direct-navigation method (§4) and the mint-anyway ruling (§3) — both are new working conventions this session established that should carry forward into any future CIRCABC or single-edition-document work.
2. `G.67.md`, then `G.66.md`, `G.65.md`, `G.64.md`, `G.63.md` for the sweep's full history, if a new sweep is ever scoped.
3. `Research.1.md` §4 (node rule) — the mint-anyway ruling in this session is a direct exception Thomas granted for this specific 21-country batch, not a rewrite of §4 itself; do not apply it to other single-edition documents without asking again.
4. The one file changed this session: `src/data/research/edp-inventory-regulation-479-2009.json` (21 new reports, 42 new edges, `_dropped[8]` annotated in place, everything else unchanged).
5. Block B (the corpus-wide `_dropped` sweep) is fully closed. The next session needs a fresh direction from Thomas, not a continuation of this punch list.

# How to write the next hand-off

Added 2026-08-04. Copy this whole section verbatim into every successor, so the chain never depends on one file surviving. It is the spec, not an example — the file you are reading is the worked example. When Thomas says "write the next handoff", "write the next G file", "wrap this thread up" or anything close, this is what he is asking for. Do not ask which format.

Mechanics

* Filename: `G.<n>.md`, where `<n>` is one higher than the highest-numbered `G.*` file in `EU/`. Check the folder — the sequence has gaps (there is no G.01, G.06, G.10, G.12, G.14, G.16, G.17 as `.md`) and some predecessors are `.docx`. Take the highest number, not the count.
* Write it as `.md`, plain text, in `EU/`. Earlier files are `.docx`; that was the chat workflow's doing, not a preference.
* Then write the JSON sidecar. Every hand-off has a machine-readable twin at `EU/G.<n>.json`. Do not hand-write it — run:

```
python3 scripts/handoff-to-json.py EU/G.<n>.md
```

The Markdown stays the document of record; the JSON is a structured index of it (date, predecessor, findings, corrections, priorities, cheap checks, and which required sections are missing). It exists so branch state can be read without parsing prose, and so a future session can diff two hand-offs. `python3 scripts/handoff-to-json.py` with no arguments rebuilds every sidecar; `--check` reports which are stale without writing. If you are ever unsure whether the sidecar is current, just re-run it — it is idempotent.

* Never edit a predecessor. Corrections to earlier sessions go in this file's Corrections section, where they are dated and attributable. The one exception is this spec block, which is copied forward unchanged.

Required structure, in this order

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

Drop a section only if it would be empty, and say so in one line rather than leaving a heading with nothing under it. Corrections and Thomas's stated priority are never dropped: an empty Corrections section is itself a claim (nothing earlier was found wrong) and should say that explicitly.

What each section is for

Orientation — carried forward and updated, not rewritten each time. A new agent must be able to read this section alone and know what to read next. If the folder layout or the tooling changed, that goes here.

Session conditions — what constrained the work. Session type (extraction vs verification vs planning), what tooling was available, what did not arrive, what was left untouched by instruction. This is where "the sandbox failed" and "the governing briefs still did not arrive" belong. State plainly which sources you read in full, because everything downstream inherits that limit.

Headline result — the single most important thing established, and how strongly. If the session established nothing, say that; a session that only refutes is still a result.

Findings — numbered `###` subsections, one per finding. Each states what was checked, what was found, and what it rests on. Mark any claim that depends on a predecessor's reading rather than your own — the house convention is (SEC04 per G.17). Quote verbatim; `Research.1.md` §2 applies here exactly as it does to research output.

Secondary observations — real but low-priority. Section fingerprints, oddities worth not rediscovering. Keep them short.

Corrections to prior sessions — numbered, each naming the file and the claim being corrected, and whether it is confirmed, refuted, overstated or resolved. This section is the reason the chain is trustworthy. A session that finds a predecessor wrong and does not record it here has actively damaged the corpus.

Thomas's stated priority for the remaining work — lettered blocks (A, B, C, D) carried forward from the predecessor, edited to reflect what moved. Mark items no longer needed explicitly and say why, rather than deleting them silently. This section is what a new agent reads to answer "what is next".

Cheap checks still outstanding — ordered by value per unit effort, each one a single lookup. This is the list that gets raided when a session has capacity left.

What to pass at the start of next thread — the packing list, for the case where the next agent has no filesystem access. If it does have access, say so and keep the list anyway; it doubles as an index of what matters.

Conventions that make these files worth reading

* Say what you did not do. Every one of these files carries an explicit not-read / not-verified statement. That is what makes the positive claims usable.
* Predictions are logged and then scored. G.17 predicted a code pattern; G.18 recorded that it "landed". Make falsifiable calls and settle them.
* Distinguish inference from documented fact, and say which narrow respect is still inference. G.18's headline rule is very well evidenced and still not printed in any document — it says so.
* A refuted hypothesis is a good outcome. Report both sides of a conflict and pick neither; `Research.1.md` §3 is explicit that adjudication is not the research role.
* Do not pad. These files are dense because every line earns its place.
