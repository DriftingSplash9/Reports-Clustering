# MISSION-TODO 2.0 — the consolidated list, rebuilt

Written 2026-08-07, end of the day the Victoria pass closed. **Supersedes
`planning/MISSION-TODO.md`** (1.0), which stays on disk with a pointer at its
top; the repo is under git, so 1.0's strikethrough history IS the record of
what got done — nothing completed is carried here. Sources consolidated:
MISSION-TODO 1.0's surviving items, `AU/G.3.md` (today's Victoria pass),
`NZ/G.4.md`, `EU/G.49.md`, `research-input/Grok-Research-Brief-XI.md` items
25/27/28, and the corpus itself.

**State of the corpus as this is written**: 354 reports / 415 dependencies /
3 relations — **updated 2026-08-07 after the NZ G.5 and EU G.50 sessions:
363 reports / 429 dependencies / 3 relations** (Niue and Tokelau `audits`, UKSPF `supersedes`). `npm run check`
and `npm run validate` both exit 0 — and a red validator now FAILS (exit 1)
by design; never ignore one. The repo is a PUBLIC GitHub repo
(github.com/DriftingSplash9/Reports-Clustering — public for a while, Thomas
confirmed 2026-08-07); origin/main was in sync as of 1.0's publication entry,
Git policy is now standing (2026-08-07): sessions commit and push their own
work — see the method notes.

**How to use this file**: it is the mission's entry point, not the authority
on any branch — each branch's newest `G.*.md` (currently `EU/G.50.md`,
`NZ/G.5.md`, `AU/G.3.md`) governs its own frontier; this file indexes them.
When an item below is done, mark it here AND in whatever branch file owns
it. When starting a session, read this header, pick ONE item, read the
branch file it names, and go. Do not start two branches in one session.

---

## P0 — Decisions only Thomas can make (each is minutes of his time and
blocks concrete work; ask at the top of any session he is present for)

*All four below were answered via `planning/Decisions-2026-08-07.docx`
(returned same day). Three further decisions from that doc are folded into
the items they govern: NZ's second council is **Auckland** (P1 item 7), the
EU prose section runs **agent-alone with a review gate** (P1 item 5), and
the EU hand-off spec is **adopted wholesale** for all branches (now in
Research.1.md §2). Session git policy is also now standing — see the method
notes at the bottom.*

1. ~~Mint the Public Finance Act 1989 (NZ)?~~ — **DECIDED AND EXECUTED
   2026-08-07 (Thomas, decisions doc, option A; executed same day, `NZ/G.5.md`)**:
   minted `nz-public-finance-act-1989` with five verified edges (not one) —
   `nz-treasury-fsgnz`, `nz-treasury-befu` and `nz-oag-annual-report` each
   depend on it, and it turned out to cross-reference the Public Audit Act
   2001 bidirectionally (`nz-public-audit-act-2001 <-> nz-public-finance-act-1989`,
   each direction its own independent quote). Enters the corpus at weighted
   authority rank #4 overall. See `NZ/G.5.md` Finding 1 for the full quote
   trail.

2. ~~Mint an `au-federal-budget` node?~~ — **DECIDED AND DONE 2026-08-07
   (Thomas, decisions doc, option A; executed same day)**: one node for the
   Budget as a single annual publication (`au-federal-budget`,
   budget.gov.au, Treasury), the `eu-draft-budget` treatment. The VLGGC
   estimate edge is minted; the final-amount leg stays AGENCY ONLY by
   design and is preserved as a `caveat` on the new edge. Corpus 355/416.
   The decision is precedent for a future Canadian federal budget node.

3. ~~Flip the GitHub repo public~~ — DONE (Thomas, confirmed 2026-08-07:
   the repo has been public for a while). Kept numbered so P0 references
   elsewhere stay stable.

4. ~~Extend the `Domain` union with a construction value?~~ — **DECIDED AND
   DONE 2026-08-07 (Thomas, decisions doc, option A; executed same day)**:
   `'construction'` added to the union in `src/lib/types.ts`,
   `au-abs-building-approvals` retagged as its first customer (the
   `assessment` compromise retired), checks green. Domain surfaces derive
   from data, so nothing else needed touching. Future construction/housing
   releases (housing starts, NZ building consents) use it too.

---

## P1 — Branch frontiers (each is one good session; read the named G-file
first, in full)

5. **EU — the blob's judgment half. STARTED 2026-08-07 (`EU/G.50.md`): 22 of
   73 batches built, 51 remain.** The first pass took batches 16–26, 30–37, 44,
   45 and 66 — which turned out to be one subject, the ESS quality-and-metadata
   standards stack — and produced `ess-quality-framework.json` (5 reports, 6
   dependencies, 9 dropped). **Two things the next batch session must know.**
   (a) Read `01-manifest.json` by its `scope` strings, **not** by batch number:
   the material is grouped by subject across scattered numbers, and working in
   numeric order would have produced five thin slices instead of one. (b) The
   unlabelled middle block, batches 46–62, carries **no scope strings at all**
   and nobody has characterised it — it is the only part of the backlog whose
   size cannot currently be estimated, which is why `G.50.md` names it as where
   to go next. Also unbuilt and coherent: batches 0–15 (ESA 2010 and the
   national-accounts methodology stack) and 68–72 (ECB/Eurosystem collateral and
   balance sheets, which is priority C's own material).
   The project's largest known backlog by
   volume. The mechanical split is done and waiting in
   `EU/slices/_staging/`: `01-manifest.json` lists **73 batches**; work them
   one at a time with `_staging/PROMPT-for-splitting-agent.md` as the
   governing prompt; the raw material is `00-blob-fulltext.txt` (1.3 MB)
   with pre-cut NDJSON views (`10-batch-with-records.ndjson`,
   `10-loose-record.ndjson`, `10-part-b-soft-connections.ndjson`). The rule
   that keeps this safe: **nothing is imported without a verbatim Part A
   quote** — the NDJSON is Part B material and per `Research.1.md` §6 can
   only re-arrange what Part A proved. Separately, the 399k-character prose
   section (`_staging/20-prose-sections.txt`) runs as its own session —
   **mode decided 2026-08-07 (Thomas, decisions doc, option B)**: an agent
   works it alone under the standing rules (verbatim Part A quote or it
   doesn't exist; conflicts reported, never resolved), producing a findings
   file Thomas reviews before anything is imported. Do not fold it into
   batch work. **Prompt written 2026-08-07: `EU/prompts/PROMPT-prose-section.md`
   — paste it into a fresh session.** The file was opened and characterised that
   day: **399 Part A entries in two batches**, not the "one ECB/Eurosystem batch"
   the slices README claimed. 23 are ECB General Documentation Guideline
   (Guideline (EU) 2015/510) entries citing one EUR-Lex consolidated text; 376
   are EU Draft Budget entries carrying a `FILE:` field naming an uploaded PDF
   (SEC00/01/02/03/07/09/10) with **no URL at all**. Verification list for an
   outside reader: `EU/prose-verification-list.md`. **Blocked on one of two
   things**: EUR-Lex serving again (for the 23), and the SEC PDFs being
   re-uploaded (for the 376) — without them the session can catalogue but not
   mint. Branch authority: **`EU/G.50.md`** (read `G.49.md` behind it)
   (and `EU/slices/README.md` for the branch's central
   disclosure-runs-upward finding — which `G.50.md` narrows rather than
   refutes: where the EU binds by Regulation it names nobody, where it
   coordinates by agreement it names its sources freely).

6. **AU — the second council, and the Victorian valuation chain.** Branch
   authority: `AU/G.3.md` (read G.2 and G.1 behind it). Two sub-items, in
   order:
   (a) *Second council*: four NSW council Revenue Policy PDFs 403'd in G.1
   (Tamworth, Yass Valley, Federation, Wollongong). Two unlock tricks are
   now proven on this branch — the publisher-DOCX swap (G.2) and the
   in-browser ZIP-extraction relay for when the container itself is
   Cloudflare-blocked (G.3 Session conditions has the full recipe). The
   prize: a council's own document naming NSW Land Registry Services or the
   Valuer-General directly, closing the `_dropped` lead in
   `au-government-finance.json`.
   (b) *Victorian valuation chain*: G.3's own gap. The VLGGC report computes
   standardised rate revenue from a capital-improved-value base and thanks
   the Office of the Valuer-General, but names no titled valuation release.
   The NSW-parallel pass is the Valuation of Land Act 1960 (Vic) +
   Valuer-General Victoria's annual general valuation, ending with a
   Victorian council's own rates document. Would let Victoria match NSW
   hop-for-hop and give `au-vlggc-annual-allocation-report` its valuation
   input.

7. ~~NZ — the second exemplar council: Auckland.~~ — **DONE 2026-08-07
   (`NZ/G.5.md`)**: Auckland researched from its own Volume 3 financial
   statements. Result is genuinely mixed, not a clean confirmation —
   the accounting-standard chain (PBE IPSAS 1) and a new statutory layer
   Wellington cannot have (Local Government (Auckland Council) Act 2009,
   newly minted as `nz-lgaca-2009`, governing Watercare's CCO structure)
   both generalise, but the Public Audit Act 2001 and Rating Valuations Act
   1998 edges Wellington carries do **not** transfer — Auckland's own
   documents never name either by title, recorded `denied`. Same session
   also executed P0 item 1's PFA 1989 mint. See `NZ/G.5.md` Findings 2–3.
   Two new leads opened by this pass, not yet acted on: mint Watercare
   Services Limited as a node (`NZ/G.5.md` priority 6), and decide the
   Local Government Act 2002 the same way PFA 1989 was just decided
   (priority 7). A third exemplar council (Christchurch) remains possible
   but is no longer scoped as urgent — the generalisation question already
   has one real answer with both a yes and a no in it.

8. **Beyond-Europe briefs — Grok XI items 25, 27, 28.** Still assigned,
   still `not_attempted` across two NZ sessions; source:
   `research-input/Grok-Research-Brief-XI.md`. Order: **25c first** —
   Chile's SII avalúo fiscal, a fourth property-valuation legal tradition
   for the corpus (after the Dutch WOZ, NSW/Victoria, and NZ rating
   chains); then Colombia / Chile-FCM / Peru; then item 27's nineteen
   unscouted jurisdictions (**Crown Dependencies first** — likely to rhyme
   with the Realm/associated-states material and reuse its templates); then
   item 28's two small closures. Apply the Research.1.md §2 verification
   pass to anything an external researcher returns — this project has now
   caught a proxy reader *fabricating a plausible citation from true
   parts* (`AU/G.3.md` Corrections 2); components checking out is not the
   quote checking out.

9. **Europe follow-ups from the depth passes.** Three small pockets, none
   full sessions, groupable: Norway's remaining lead — the municipal
   **årsregnskap** node (`no-government-finance.json`, built 2026-08-07,
   flagged lovdata as robots-blocked; the ministry's own Veileder was the
   workaround); the Netherlands and UK `_dropped` leads
   (`nl-municipal-finance.json`, `uk-local-government-finance.json` — each
   array is its own worklist, e.g. the Dutch Kadaster/BRK node was
   explicitly noted as not-yet-minted).

---

## P2 — Cheap checks (single lookups, ordered by value per unit effort;
raid this list when a session has capacity left)

10. **Re-anchor `au-abs-seifa -> au-abs-census`** to ABS's own SEIFA
    methodology page. One fetch. The edge currently rests on the CGC's and
    VLGGC's third-party statements and says so in its own `basis`
    (`au-government-finance.json`).
11. **Tasmania methodology → `au-lgfa-act-1995`.** One targeted quote from
    the Tas manual (treasury.tas.gov.au PDF, URL in the
    `au-tas-sgc-methodology` node) naming the Act — connects both state
    nodes to the branch's new statutory spine, and upgrading the Tas
    slice's middle-confidence tier can be done in the same read.
12. **OAG long-term-plan observations** — fetch from `ao.parliament.nz`
    directly; the Wayback-gzip dead end is obsolete now the live host is
    known (1.0 item 18). While in the neighbourhood: **NZSIOC → `anzsic`
    mint** (one page).
13. **Puerto Rico items** (1.0 item 18 tail): Census SLGF mint, Planning
    Board forecasts, and the June-2026 revised fiscal plan
    (`pr-fomb-fiscal-plan` is the anchor node,
    `associated-states-government-finance.json` the slice).
14. **Tourism Research Australia** — does the National/International
    Visitor Survey have a clean publication cadence? If yes, mint it; the
    4L citation and the unpublished-LGA-cut flag are pre-written in
    `au-government-finance.json`'s `_dropped`.
15. **ARIA+** — one search: does the remoteness structure have a citable
    published home (ABS republishes remoteness areas built on it)? Same
    slice, same pre-written entry.
16. **NSW Grants Commission methodology manual** — the G.1 search was not
    confirmed exhaustive; one more determined attempt, then record a proper
    `NOT FOUND` with search strings if it fails.
17. **NZ s 106(2C) current-consolidation content check** — existence was
    confirmed 2026-08-06, content was not (1.0 item 17 tail;
    `NZ/G.1.md` carries the context).
18. **September 2026, dated**: when the 2026-27 VLGGC edition appears,
    check whether the **Vicmap road-data transition** happened — the
    `deferred` entry in `au-government-finance.json` documents the
    announced future dependency and exactly what changes if it lands.

---

## P3 — Code and tooling (none urgent; each is self-contained)

19. **Fix `scripts/handoff-to-json.py`'s priority-block parser.** It only
    recognises the EU's lettered `**A — Label**` convention and silently
    emits `priorities: []` for the plain-numbered lists that the 2026-08-07
    branch-numbering decision (Research.1.md §2) made standard for AU and
    NZ. Confirmed against `AU/G.1.json`–`G.3.json`. After fixing, re-run
    the script over `AU/G.*.md` and `NZ/G.*.md` to regenerate sidecars.
    Same file, second task: its no-argument mode only scans `EU/`
    (hardcoded `BRANCHES`) — add AU and NZ, and remember to add any new
    branch folder when a new galaxy opens.
20. **Backfill `Research.1.md` §9's id lists by re-extraction.** The AU
    list is stale (11 ids on file; 19 exist after the Victoria pass), and
    the NZ list predates the Stats NZ national-accounts pass (+5 nodes)
    and Norway. §9's own instruction: re-run the extraction (report
    objects by `country` across `src/data/research/*.json`), never append
    by hand.
21. **Isolated-node shelving inconsistency** (1.0 item 15): the 3D view
    treats implied-only nodes differently from the validator's definition
    of isolated — reconcile (`src/components/InfluenceGraph.tsx` vs
    `scripts/validate-data.ts`).
22. **Search during layout warmup silently does nothing** (1.0 item 16):
    `flyTo` during warmup is dropped — either queue the request or grey
    the search box until the layout settles (`src/lib/search.ts`,
    `src/components/SearchPanel.tsx`).
23. **Rendering `relations` in the app** — still deferred by rule until
    there are five (currently 3: Niue and Tokelau `audits`, UKSPF
    `supersedes`). The agreed shape when the threshold is hit: Option C's
    fuller form — hover card + search + a distinct unweighted line style
    (`NZ/G.3.md`–`G.4.md` have the discussion).

---

## P4 — Verification debt and housekeeping

24. **NZ carried verification debt**: full re-extraction of LGA 2002
    Schedule 10 — the one unverified thing left in the NZ slice
    (`NZ/G.1.md` carried items).
25. **Empty `_to_delete/`** — needs Thomas on Windows; the device bridge
    cannot delete files, only move them there, which is why the folder
    exists.
26. **EU legacy hand-offs G.00–G.13** exist only as .docx in
    `EU/legacy-handoffs/` — convert to .md someday so the chain's early
    history is greppable.
27. **The `au-abs-gfs` node-split question** (G.1 Secondary observations,
    carried through G.3): the 2005 "ABS GFS Manual" methodology publication
    vs the annual "Government Finance Statistics, Australia" release are
    one node for scope reasons, flagged in the AASB 1049 edge's basis.
    Split only if a session actually needs the manual as its own citable
    document.

---

## Standing method notes (read once, apply always)

* **The one rule**: if no document says it, the edge does not exist. Direct
  fetch + own-eyes text extraction for anything that becomes a quoted
  `basis`; re-read inherited quotes at source before minting. This corpus
  has now caught an AI-summarising reader fabricating a plausible citation
  from true parts (`AU/G.3.md` Corrections 2) — components checking out
  individually proves nothing about the quote.
* **Read the data appendix before recording AGENCY ONLY.** The VLGGC lesson
  (G.3 headline): when a report ships as methodology-prose + data-appendix
  parts, the disclosure lives in the appendix. Part 1 alone said "agencies
  only"; Part 2's Appendix 4L named everything to catalogue number and
  release date.
* **Two document-unlock tricks, both proven on the AU branch**: (a) when a
  government PDF won't render or script, check the same publisher's page
  for a DOCX of the same document (works on cgc.gov.au and
  localgovernment.vic.gov.au); (b) when the working container itself is
  blocked (Cloudflare) and binary relay is unavailable, fetch the file
  same-origin inside a real browser page, unzip `word/document.xml` in
  page-context JavaScript (`DecompressionStream('deflate-raw')`), walk
  paragraphs AND tables in document order, inject the text into the DOM and
  read it out ~50k characters at a time. Full recipe: `AU/G.3.md` Session
  conditions.
* **Check `len(document.tables)`** before trusting any paragraphs-only DOCX
  extraction (G.2's lesson — the VLGGC report's whole body lives in Word
  tables).
* **Known site behaviour**, so nobody rediscovers it: cgc.gov.au PDFs render
  only inside Chrome's unscriptable built-in viewer (use the DOCX);
  localgovernment.vic.gov.au Cloudflare-challenges non-browser clients;
  legislation.nsw.gov.au is Cloudflare-gated but passable with a real
  browser's rendered text; legislation.govt.nz blocks non-browser clients
  (PCO PDFs via Wayback `id_` worked); lovdata.no is robots-blocked (use
  the ministry's own mirrors, e.g. the Veileder); Stats NZ DataInfo+ is
  intermittently fetchable and archive.stats.govt.nz DNS is flaky; **EUR-Lex
  no longer works in a browser either — corrected 2026-08-07, `EU/G.50.md`
  Findings 4: `curl` gets HTTP 202 with a zero-byte body and Chrome silently
  redirects every legal-content and ELI form to `eur-lex.europa.eu/TodayOJ`,
  ignoring the CELEX id; retry once per session, then find a mirror** (several
  other EU agency sites still gate non-browser HTTP but pass in a real
  browser); many government sites lazy-load behind "Expand all".
* **Tense trap** (Research.1.md §5b) runs forwards too: an announced future
  dependency (Vicmap) is `deferred`, not an edge, until a document states
  it in the present tense.
* **`npm run validate` failing is a stop-the-line event** — it exits 1 on
  any ✗ by design.
* **Caveat-notes**: a `_dropped` entry with reason `caveat` annotates a real
  minted edge and must name it in `source`/`target`; the validator enforces
  both directions (Research.1.md §2 box).
* **Branch hand-off numbering**: plain numbers per branch; the EU's A–G
  lettering is its own history and does not spread (decided 2026-08-07).
* **Hand-off discipline**: never edit a predecessor G-file; corrections go
  in the successor's Corrections section; copy the spec block forward
  verbatim; sidecar via `python3 scripts/handoff-to-json.py <branch>/G.<n>.md`
  with the path passed explicitly.
* **Git policy (decided 2026-08-07, Thomas)**: every session ends by
  committing its own work with a descriptive message and pushing to
  origin/main. Can't push? Commit locally and say so in the hand-off.
  **Amended 2026-08-07 (`EU/G.50.md`): cloud sessions can do the commit half
  and not the push half.** The sandbox git proxy refuses to inject its
  `GITHUB_TOKEN` for this repo ("not in this session's authorized repository
  set", HTTP 403), and `device_bash` has no network. So commit, then **say in
  the reply that commits are waiting** — GitHub Desktop opens on whatever
  repository it last had selected, and on 2026-08-07 that was a different
  project, which is how three commits sat unpushed for two days. To move
  commits off the device without re-creating them: `git bundle create <f>
  origin/main..HEAD` there, stage the bundle, `git fetch <f> HEAD:<branch>` in
  the container. Never re-create the commits in the container and push those —
  it diverges from the device's history.
