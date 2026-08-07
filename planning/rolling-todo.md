# Rolling todo — maintained by Claude Code

> **2026-08-07: superseded as the entry point by `planning/MISSION-TODO.md`**,
> the consolidated cross-branch list. This file keeps its Merged history and
> its Candidate categories; start reading over there.

Started 2026-08-04. This is the working queue: specific, concrete next actions,
added to and checked off across sessions. It is **not** `BACKLOG.md` — that's
Thomas's own tier-ranked strategic plan and stays his. This file tracks the
mechanics of getting Grok/research output verified and merged, plus candidate
directions worth exploring that haven't been scoped into BACKLOG.md yet.

Sections: **Now** (next up) · **Merged** (done, for the record) · **Parked**
(Thomas said drop it, with why — so it doesn't get resurrected by accident) ·
**Candidate categories** (possible gaps, unconfirmed, need a real look before
they're real work items).

---

## Now

1. ~~**Verify + merge `research-input/grok-research-handoff-2026-07-31/grok-research/`**~~ **DONE 2026-08-07 — see Merged.** Original scoping kept below for the record.
   — 9 files, produced 2026-07-30/31, never wired into `src/data/index.ts`.
   Split into two groups:
   - **7 look like finished, mergeable slices** (standard-ish `reports`/
     `dependencies` shape, though metadata keys vary file to file —
     `_layer`/`_status` vs `_slice`/`_researched` vs `slice`/`version`, so the
     loader's `ResearchSlice` type won't accept them unmodified as-is):
     `calgary-municipal-template.json` (6 reports/5 deps),
     `classification-hubs-slice.json` (10/7),
     `equalization-named-products-closed.json` (9/9),
     `financing-international-orgs.json` (8/13),
     `housing-portable-benefits-slice.json` (10/8),
     `municipal-ontario-quebec-slice.json` (6/6, has its own `_dropped`),
     `soft-power-and-isolated-orgs.json` (23/25).
     **≈72 reports / ≈73 dependencies total, unverified, sitting outside the
     live graph.**
   - **2 are scoping templates, not mergeable as data**:
     `alberta-municipal-expansion-and-oddballs.json` and
     `municipal-capitals-template.json` — both are "which cities/documents to
     research next" target lists (a `cities` array naming candidate keystone
     documents, no actual quotes or verified edges yet). Treat as research
     *targets*, fold into Candidate categories below or back into BACKLOG,
     not into the graph.
   - Verification checklist per `Research.1.md`: does every dependency's
     `basis`/`evidence_url` trace to an actual quotable document (these Grok
     files don't carry Part-A-style verbatim quotes inline — need to open the
     `evidence_url` for each and confirm it says what the edge claims);
     check tense; check "comparable with" traps; check `relationship_type`
     direction (source depends on target); check every `id` against
     Research.1.md §9's existing-id list before minting a new one; check
     `programme_id`-style collisions against the two already-caught
     StatCan cases in `BACKLOG.md` −1a.
   - Also carries two `V0.9.md`/`V0.10.md` session logs and a
     `Grok-Research-Session-1-2026-07-30.md` — read these first, they're
     probably the actual handoff notes explaining what's safe to trust.

2. **Verify + slice the EU blob** — mechanical pre-split is **done**
   (2026-08-04, see Merged). What remains is the judgment half, and it needs a
   dedicated conversation: `EU\slices\_staging\PROMPT-for-splitting-agent.md`
   is the prompt to paste into it. Work one slice at a time out of
   `01-manifest.json`'s 73 batches; nothing gets written without a verbatim
   Part A quote behind it.
   - **Blocked on a schema decision before anything can be imported** — see
     next item.
   - The 399k-char prose section (`20-prose-sections.txt`, an ECB/Eurosystem
     batch from 2026-08-03) is the one part no script could touch. It needs a
     supervised read and should probably be its own session.

3. ~~**DECISION NEEDED — `Country` type can't express an EU node.**~~
   **DECIDED AND SHIPPED 2026-08-04** — `country` is now an open ISO-3166 code,
   `JurisdictionLevel` gained `supranational`, colour is keyed to a hue *family*
   so the 27 member states share one green family, and `validate` gained three
   rules to replace the compiler exhaustiveness the closed union used to give.
   Recorded in `REPORTS.md` under *Decisions*; the `EU/slices/README.md` blocker
   is marked resolved with the original text kept in a `<details>` block.
   `npm run check` and `npm run validate` both pass, corpus unchanged at
   133 reports / 213 dependencies, and `scripts/eu-schema-smoke.ts` fires the new
   guards against doctored data (20 checks, all passing) because the real corpus
   has no EU node to exercise them yet. **EU slices are no longer blocked from
   import.** Original text below for the record:

   ~~**DECISION NEEDED — `Country` type can't express an EU node.**~~
   `src/lib/types.ts` has `export type Country = 'CA' | 'US' | 'INT'`, and its
   own comment says *"If the corpus ever grows a real third national system,
   split this then."* The EU branch is that moment, and it's two axes at once:
   a supranational layer with binding legal authority (unlike the IMF, which
   is what `INT` means), plus 27 national systems beneath it. `JurisdictionLevel`
   has the matching problem — a member-state NSI is `federal` in its own system
   but sits under the EU in a way no Canadian federal body sits under anything.
   **Do not default everything to `INT`** — that is exactly the bug the comment
   describes (nine international bodies were `CA` for five sessions because the
   type had no room for them, invisible because nothing rendered the field), and
   at 27 member states it would also be wrong in the rim-colour channel.
   Options are laid out in `EU\slices\README.md`; the call is Thomas's and
   belongs in `REPORTS.md` as a direction change.

4. **No git repo here** (`git status` fails — `.gitignore` exists but `git
   init` was never run). Flagging before any bulk merge: right now there's no
   undo path if a merge goes wrong beyond hand-editing it back out. Suggest
   `git init` + first commit of current state before Phase 1, purely as a
   safety net — Thomas's call whether/when. **This got more urgent** now that
   two agents in separate conversations will be writing files here.

5. **The Part B Output Rule has never been honoured.** `Research.2.md` carries a
   standing rule added 2026-08-02 that no `G.*` log mentions and no session has
   followed: *"Whenever a research batch or session window is closed, or whenever
   a G.*.md handover note is requested, the agent **must** also produce a
   standalone, savable list of all current Part B soft connections and
   provisional observations"* — JSON or clean Markdown, with id / from / to /
   nature / strength / evidence pointer / notes, saved as its own
   `PartB_soft_connections_YYYY-MM-DD.md`. It was missed because it sits *after*
   §10's "eight things that matter" summary, past where the brief looks finished,
   and because the briefs went unread for four sessions. The material for it
   exists — `Soft Connections.docx` (sc-1…sc-46) plus
   `_staging/10-part-b-soft-connections.ndjson`. **This is owed at the next
   hand-off**, and G.19's spec should probably absorb it so the two documents
   stop disagreeing.

6. **Reconcile the two priority queues before the next research session.**
   Research.EU.md §10 and Thomas's A–E list in G.19 are not the same order and
   have been running in parallel without either document noticing:
   | | Research.EU.md §10 | G.19 "Thomas's stated priority" |
   |---|---|---|
   | 1 | Statistical Requirements Compendium | SEC05 (Court of Auditors) |
   | 2 | ESA 2010 transmission programme | SEC06, SEC07 |
   | 3 | One high-authority NSI methodology page | SEC01, SEC02 |
   | 4 | **"Stop and report"** before a 2nd member state | SEC00 |
   The A-list (institutional SEC00–SEC10) is Thomas's, stated most recently, and
   should still win. But the queues need explicitly reconciling rather than
   silently coexisting, because the second one has already been executed once.

7. **G.19's "surprise" Eurostat strand is not a surprise — it is Research.EU.md
   §10 being carried out.** Checked, not assumed. Every item in that queue is
   already in the blob: SRC 2026 (47 records, the largest single batch) = item 1;
   the ESA 2010 / Annex B material = item 2; **Destatis 159 mentions against
   INSEE 8, ISTAT 3, Statistics Austria 4, Statistics Finland 3, Statistics
   Netherlands 3, Statistics Poland 1, Statistics Sweden 0** = item 3, one
   high-authority NSI and no second one. That distribution is item 4's "stop and
   report before expanding to a second member state" being obeyed exactly.
   So the strand is a completed, instruction-following work programme that lost
   its provenance when the briefs stopped being read — **not** an orphan.
   Corrects G.19's framing ("an entirely separate Eurostat programme that no
   `G.*` log discusses at all"): true as stated, but it reads as accidental
   accumulation and it was not. Caveat: agency-name counts are raw string
   matches, not records read for meaning.

## Merged

- **2026-08-07 — the 2026-07-31 Grok handoff, verified and merged.** Six
  parallel verification agents, one per slice; every edge checked against a
  fetched primary source before minting. +33 reports / +34 dependencies →
  corpus 335/392; ~60 handoff claims preserved in `_dropped` rather than
  discarded. The org-heavy slices (financing-international-orgs,
  soft-power) were correctly almost entirely off-model — 3 new report
  nodes (IMF WEO, IMF Fiscal Monitor, OECD Economic Outlook) and 4 edges
  survived from 31 nodes / 38 edges proposed. Was item #1 under Now.


- **2026-08-05 (Grok consolidation + continent palette redesign) —
  `G.47.md` written. Corpus 165 → 218 reports, 231 → 283 dependencies.**
  Two unrelated deliverables, both requested directly:
  - **Every EU member state (27/27) and 14 non-EU European countries
    (EEA/EFTA, UK, accession belt) now have a documented ESA 2010 edge** —
    eight rounds of external Grok research, consolidated into six schema
    slices. Zero surprises across all 27 members (binding language
    throughout); three distinct relationship-language categories confirmed
    and held apart (binding member, binding-but-not-member via EEA/bilateral,
    aspirational candidate — Turkey, candidate since 1999, still uses the
    softer language after 25 years). NATO's defence-expenditure reporting
    shows the branch's core asymmetry finding generalises past statistics
    entirely.
  - **Caught and fixed a real gap**: Netherlands and Poland were researched
    and reviewed in an earlier turn of this session but never actually
    converted into a slice — surfaced only while backfilling country labels.
    Fixed in `grok-r3-netherlands-poland.json`, flagged for a spot-check
    since it was reconstructed from this session's own prior transcription.
  - **`src/lib/palette.ts` `ColourFamily` rewritten twice in one day** —
    first a fifth family (`XEU`, tan-brown) for non-EU Europe, then
    superseded hours later by a full continent redesign (Thomas: "Canada was
    hogging too much spectrum"). Nine families now: `CA`/`US` pulled into a
    shared North America brown neighbourhood (freeing US's old blue for a
    new `AFR` family), `XEU` recoloured from brown to a low-saturation
    green matching `EU`, plus three more reserved-but-unstaffed continents
    (`ASIA`, `SAO`, `SA`). One real collision caught during the work: a
    first draft of `SA`'s grey was visually identical to
    `COMMERCIAL_COLOUR`; moved to a genuinely free hue gap. Full reasoning
    in `REPORTS.md` → Decisions and `palette.ts` itself.
  - **`Research.1.md` §9 backfilled 33 → 85 EU/Europe ids**, re-run from the
    corpus rather than appended by hand, per the file's own stated
    convention.
  - **New priority block G** in `G.47.md`: breadth across Europe is now
    complete at one-edge-per-country; the next work is depth (a second
    document per country, following Germany's 69-row EVAS model) and
    domains this sweep never touched (labour, trade, GFS, farm structure —
    tested at the EU level, never per-country).
  - `check`/`validate` clean. Sidecar written and verified against the
    "copy the spec block verbatim" rule after an initial paraphrase was
    caught and fixed.

- **2026-08-05 (twenty-fourth session, same-day continuation) — the
  Research.2/Research.EU merge, the branch's longest-standing open
  housekeeping item (flagged unchanged since `G.19.md`-era hand-offs, at
  least twenty sessions), drafted; `G.40.md` written.** No JSON change.
  `EU/Research.2-merged-DRAFT_2026-08-05.md` written — **a draft, not an
  adopted governing brief**, since `Research.1.md` itself reserves that
  decision to Thomas ("the other end of the process"), not to a session.
  - **All three real differences between `Research.2.md.docx` and
    `Research.1.md` resolved**: §8 (missing from Research.2) rebuilt as a
    two-galaxy priority list combining Research.1's original Canada/US
    items with Research.EU's own EU priority queue — this is what "the E5
    priority-queue reconciliation," referenced unchanged since `G.21.md`
    without ever being defined, turns out to mean. §9's empty id-list
    codeblock resolved by pointing at `Research.1.md` §9 as the sole
    authoritative copy, per the first "known input" every hand-off since
    `G.24.md` listed. The Part B Output Rule carried forward verbatim,
    confirmed already in active use.
  - **One rule question flagged for Thomas rather than silently decided**:
    Research.eu.docx's own §2 relaxes the URL requirement to allow "or
    Official Journal reference" alone. The draft narrows this to "URL, or
    an OJ reference paired with its ELI URL" — codifying what the corpus
    has actually done in practice across 40+ EU sessions, not either the
    stricter or the looser reading. Not adopted without his sign-off.
  - **A quieter finding underneath the editorial work**: the merge was
    never blocked on the reasons given across roughly twenty consecutive
    hand-offs. It was blocked on both source files being cited under
    filenames that do not exist at the project root — they are `.docx`
    files inside `EU/`. No session between whenever that became true and
    this one re-checked the path before repeating the claim.
  - `G.40.json` written (`--check` clean).

- **2026-08-05 (twenty-third session, same-day continuation, Thomas's
  three-part direction: "sample sec03 more, then redirect to the
  eurosystem/ecb, then... the merge") — SEC03 Title 07 sampled (one bonus
  find in Title 06); priority item C (ECB/Eurosystem) opened after
  nineteen hand-offs unchanged; `G.39.md` written.** Corpus **146 → 150
  reports**, 220 dependencies unchanged, 163 → **165 dropped notes**.
  Two new slices: `eurosystem-ecb.json` (3 reports, 0 dependencies, 2
  `_dropped`) and `ecfin-business-consumer-surveys.json` (1 report, 0
  dependencies, 0 `_dropped`). Both validated (`npm run validate` +
  `npm run check` both exit 0), registered.
  - **SEC03 Title 07 (EUR 20.6bn, third-largest Title) sampled rather than
    exhaustively read** — restores the statistics-absence pattern again
    (ESF+ repeats Title 05's GDP-per-capita threshold verbatim, still
    `AGENCY ONLY`), and funds a second recurring EU survey (Eurobarometer,
    named but not minted — flagged as the next cheap lead).
  - **One genuine node found one page short of Title 07, in Title 06's own
    text**: the Joint Harmonised EU Programme of Business and Consumer
    Surveys (DG ECFIN), initiated 1961, confirmed live as a monthly
    release with a dated press-release schedule and its own flash-estimate
    pattern (matching `eurostat-hicp`'s).
  - **ECB/Eurosystem: verified and promoted a previously-staged batch**
    (`EU/slices/_staging/10-batch-with-records.ndjson`, index 68, never
    checked against primary sources before this session) — the Eurosystem's
    annual consolidated balance sheet (27 years unbroken, 1999–2025) and
    weekly financial statement (52/year, the branch's fastest-cadence
    node), both governed by Guideline (EU) 2024/2941 (ECB/2024/31),
    cross-checked word-for-word against a fresh EUR-Lex fetch.
  - **A third ECB-adjacent node minted from fresh research, not staging**:
    the joint ESS-ESCB Quality Assessment Report on Statistics Underlying
    the MIP — "This 12th joint annual quality report," read first-hand
    from a saved PDF, correcting the staged batch's own title ordering
    ("ESS-ESCB" per the document vs. "ESCB-ESS" in staging).
  - **No edges minted** — none of the four new nodes state a documented
    dependency on an existing corpus node; all four ship isolated, and two
    genuine leads (an MFI-statistics soft link, a second joint
    ECB-Eurostat "BOP-NA ROW consistency report") are recorded `_dropped`
    rather than forced.
  - Several Eurosystem-heavy staging batches surveyed but not opened in
    full this session: batches 47, 51–56 (dense accounting content, no
    meta provenance) and 69–72 (collateral/haircut/margin operational
    rules) — flagged for a future pass.
  - `G.39.json` written (`--check` clean).

- **2026-08-05 (twenty-second session, same-day continuation) — SEC03
  Title 05 (Regional Development and Cohesion, EUR 44.0bn CA) extracted in
  full; `G.38.md` written.** No JSON change — pure research, no node or
  edge proposed. `EU/SEC03_Title05_PartA_2026-08-05.md` written, six
  records (S03-17 through S03-21), covering all five chapters (05 01, 05
  02 ERDF, 05 03 Cohesion Fund, 05 04 Turkish Cypriot community, 05 20
  pilot projects), read first-hand from `EU/SEC03.pdf` printed pp. 202–222.
  - **Confirms the EUR 44.0bn figure** the branch has carried since
    `G.15.md`: 44,007,643,447 CA exactly, at chapter-table level.
  - **Restores the corpus-wide statistics-absence pattern Title 08 was the
    single exception to.** ERDF's three-tier regional GDP-per-capita
    classification and the Cohesion Fund's GNI-per-capita threshold are
    both stated as bare percentage-of-EU-average formulas — `AGENCY ONLY`,
    no Eurostat, no NUTS, no ESA 2010, anywhere in the budget document's
    own text, despite the entire Title being organised around regional
    statistical categories.
  - **A weaker, second-priority lead**: the underlying regulations (2021/1058
    ERDF/CF, 2021/1060 CPR) were not opened this session and are the
    natural next step if the classification lead is worth following — but
    flagged as lower-value than Title 08's still-unfollowed FSDN lead
    (S03-12), which already has a named data network.
  - **Confirms two Title-08 structural patterns generalise**: the
    inter-fund transfer mechanism (here ERDF → InvestEU/BMVI/EMFAF) and the
    dense legacy legal-basis stack (1999 Structural Funds regulation
    forward). **One documented contrast**: unlike Title 08, no chapter in
    Title 05 carries a `30 02 02` reserve.
  - `G.38.json` written (`--check` clean).

- **2026-08-05 (twenty-first session, same-day continuation) — the
  ten-vs-eleven Member States discrepancy resolved (`G.32.md` finding 2,
  open since that session).** Not a JSON-graph change — a cheap check
  closed. `EU/AnnexXI-TenElevenDiscrepancy_PartA_2026-08-05.md` written.
  Primary source: COM(2022) 180 final, *Report from the Commission... on
  the application of Annex XI to the Staff Regulations*, read first-hand
  via WebFetch, cross-checked against a fresh direct EUR-Lex fetch of
  Article 1(4)(a) itself.
  - **Resolution, stated plainly**: the consolidated Staff Regulations text
    is not stale and Eurostat's "ten" is not an undocumented shortcut. Both
    are correct simultaneously. Article 1(4)(a) names eleven Member States
    (including the UK) as a base list, but also gives the European
    Parliament and Council a standing power to adopt a replacement sample
    "which represents at least 75% of the Union gross domestic product."
    The UK's Brexit exit removed it from the sample automatically (it
    simply stopped being "a Member State"), and the remaining ten still
    clear the 75% GDP bar on their own — so no Article 336 TFEU
    replacement-sample regulation was ever legislated, and the eleven-name
    base list was never textually amended, because nothing required it to
    be.
  - **A second, independent document (COM(2022) 180, s. 3.3) corroborates
    AXI-02's Joint Index / HICP-Belgium / CPI-Luxembourg finding
    word-for-word**, without adding a name for Luxembourg's "CPI" — the
    `_dropped` entry in `eurostat-remuneration-update-report.json` stays
    open.
  - Secondary, not chased: COM(2022) 180 is itself a statutory periodic
    report under Article 15(2) of Annex XI, with a named predecessor
    (COM(2018) 830) — a possible third recurring Eurostat/Commission
    series, cadence unclear, flagged but not researched.

- **2026-08-05 (twentieth session, same-day continuation) — the mission-expenses
  report minted, closing out the Eurostat Publications page's six
  categories entirely; `G.37.md` written.** Corpus **145 → 146 reports**,
  219 → **220 dependencies**, 162 → **163 dropped notes**.
  `src/data/research/eurostat-remuneration-mission-expenses-report.json`
  (1 report, 1 dependency, 1 `_dropped`) staged, validated (`npm run
  validate` + `npm run check` both exit 0), registered.
  - **The branch's first EU node cadenced by counting an irregular
    publication record rather than from a stated rate.** Five reports
    across an eleven-year span (2015, 2019, 2021, 2024, 2026), no document
    stating a fixed periodicity — "regularly reviewed" (Methodology page)
    is present-tense but not numeric. `releases_per_year` recorded as an
    approximation (5 ÷ 11 ≈ 0.45) and flagged as such in its own
    `cadence_note`, not smoothed into a false regularity.
  - **Carries a documented edge into `eurostat-hicp`** — same "uses
    information already established, including... the harmonised index of
    consumer prices" pattern the rent survey edge used last session.
  - The UN ICSC reference for Extra-EU mission destinations stays
    `AGENCY ONLY`, recorded `_dropped`/`no-document`.
  - `G.37.json` written (`--check` clean).

- **2026-08-05 (nineteenth session, same-day continuation, Thomas's own
  request) — the other Eurostat civil-servants-remuneration series minted:
  Intra-EU interim report, Extra-EU interim report, and the Estate Agency
  Rent Surveys (EARS); `G.36.md` written.** Corpus **142 → 145 reports**,
  218 → **219 dependencies**, 161 → **162 dropped notes**.
  `src/data/research/eurostat-remuneration-satellite-series.json` (3
  reports, 1 dependency, 1 `_dropped`) staged, validated (`npm run
  validate` + `npm run check` both exit 0), registered.
  - **EARS carries a documented edge into the already-minted annual
    report** — `eurostat-remuneration-update-report → eurostat-remuneration-rent-survey`
    (`uses_data_from`), on the Methodology page's "Rent parities are based
    on market rents obtained from special surveys of estate agencies."
  - **The Intra-EU and Extra-EU interim reports ship isolated** — no
    data-input quote found this session tying either specifically to an
    existing node, same shape most EU nodes debut in.
  - **The two remaining candidates Thomas named (A64 Annex 3, A65 Annex 2
    "detailed reports") turned out not to be a separate series at all** —
    their own file names identify them as Appendix 3 and Appendix 2 of the
    same annual report already minted. Investigated and deliberately not
    minted, on the corpus's own measured `part_of`/double-counting finding
    (`src/lib/types.ts`) — recorded as a `note`-reason `_dropped` entry,
    not silently skipped.
  - **A secondary finding bears favourably on the still-open Luxembourg CPI
    identification question**: Eurostat's own methodology page pairs
    "Belgium HICP (national concept)" with "Luxembourg CPI (domestic
    concept)" — "domestic concept" reads as consistent with STATEC's own
    description of the IPCN. Still not a documented identification;
    `eurostat-remuneration-update-report.json`'s existing `_dropped` entry
    updated with the corroboration, reason unchanged (`no-document`).
  - The mission-expenses report (the sixth Publications-page category, not
    named by Thomas) remains unresearched.
  - `G.36.json` written (`--check` clean).

- **2026-08-05 (eighteenth session) — the EU staff salary/pension update
  mechanism minted as a node, closing `G.33.md`/`G.34.md`'s flagged item
  0.2; `G.35.md` written.** Corpus **141 → 142 reports**, 216 → **218
  dependencies**, 160 → **161 dropped notes**.
  `src/data/research/eurostat-remuneration-update-report.json` (1 report, 2
  dependencies, 2 `_dropped`) staged, validated (`npm run validate` +
  `npm run check` both exit 0), registered.
  - **The "real design decision" flagged in `G.33.md`/`G.34.md` turned out
    to already be answered by a predecessor session**: C736-03
    (`EU/AnnexXI_PartA_2026-08-05.md`) had already established the report's
    recurring title and proposed the id `eurostat-remuneration-update-report`,
    withholding only for want of a retrievable URL. Found Eurostat's own
    "Civil servants remuneration" web section
    (`ec.europa.eu/eurostat/web/civil-servants-remuneration/`) and supplied
    it — 22 consecutive years of linked annual reports (2004–2025), cadence
    stated in Eurostat's own words ("typically released in late October").
  - **Resolves the branch's oldest open cross-layer lead**:
    `eurostat-remuneration-update-report → eurostat-hicp` (`uses_data_from`,
    on AXI-02) is now a real edge. `eurostat-hicp`'s own `no-node-yet`
    `_dropped` entry, open since the node was minted two sessions ago, is
    removed.
  - **A second edge, not previously flagged as buildable, landed alongside
    it**: `→ esa-2010` (`methodology_depends_on`), on AXI-04's GDP-weighting
    quote — a lead a predecessor session had already extracted but never
    attached to anything, for the same missing-node reason.
  - **The Luxembourg-side identification stays open** — whether Annex XI's
    "CPI... in the case of Luxembourg" is `lu-statec-ipcn` or
    `lu-statec-ipch` is still undocumented anywhere read, recorded as a
    fresh `no-document` `_dropped` entry rather than guessed.
  - **Bears favourably, but does not close, `G.32.md`'s ten-vs-eleven
    Member States discrepancy** — Eurostat's own Quality page uses "the
    sample of 10" and lists the UK separately, consistent with the
    consolidated Annex XI text's eleven-country list being stale, not the
    reverse. Not adjudicated; the cheap check stays open.
  - `G.35.json` written (`--check` clean).

- **2026-08-05 (seventeenth session) — Luxembourg's own CPI minted as the
  branch's first member-state node besides Germany; `G.34.md` written.**
  Corpus **139 → 141 reports**, 215 → **216 dependencies**, 158 → **160
  dropped notes**. `src/data/research/lu-statec-cpi.json` (2 reports —
  `lu-statec-ipch`, `lu-statec-ipcn` — 1 dependency, 2 `_dropped`) staged,
  validated (`npm run validate` + `npm run check` both exit 0), registered.
  Follows directly on `G.33.md`'s priority item 0.1.
  - Read first-hand this session, via browser: Règlement grand-ducal du 20
    décembre 1999 (Legilux), the statute establishing both of STATEC's
    consumer price indices. Statutory evidence, stronger class than a
    webpage — gives cadence ("établit chaque mois"), titles and an internal
    HICP/CPI split in one article.
  - **Second `methodology_depends_on` member-state → EU edge in the branch,
    same shape as `de-destatis-national-accounts → esa-2010`**:
    `lu-statec-ipch → eurostat-hicp`, on Art. 1er's "conformément aux
    dispositions du Règlement (CE) n° 2494/95... relatif aux indices des
    prix à la consommation harmonisés". Not extended to `lu-statec-ipcn` —
    its own "conforms to the same methodological principles" language is a
    Research.1 §5a trap, not a documented dependency.
  - `lu-statec-ipcn` is separately named (Art. 4(1)) as the input to
    Luxembourg's own national wage/salary indexation ("échelle mobile des
    salaires et traitements") — recorded `no-node-yet`, same shape as the
    EU staff Joint Index lead in `eurostat-hicp.json`. **Flagged explicitly
    as a different mechanism from Annex XI's EU staff Joint Index** — do
    not conflate the two later.
  - **Bears on, but does not resolve, the open AXI-02 question**: Annex XI
    Art. 1(2) names "HICP... in the case of Belgium and... CPI... in the
    case of Luxembourg" — wording that lines up with STATEC's own IPCH/IPCN
    split, suggesting Annex XI's "CPI" is `lu-statec-ipcn` specifically.
    Reported as a reading, not adjudicated — no document read states the
    identification by name.
  - `G.34.json` written (`--check` clean).

- **2026-08-05 (sixteenth session, short) — HICP minted as a sixth EU
  slice; `G.33.md` written; session handed to a fresh agent for
  context-budget reasons.** Corpus **138 → 139 reports**, 215 dependencies
  unchanged, 157 → **158 dropped notes**.
  `src/data/research/eurostat-hicp.json` (1 report, 0 dependencies, 1
  `_dropped`) staged, validated (`npm run validate` + `npm run check` both
  exit 0), registered. Fastest-cadence EU node in the branch (monthly).
  - Directly follows up `G.32.md`'s finding that Annex XI names HICP by
    title. Eurostat's own metadata page confirms all three node conditions
    cleanly (named, monthly cadence stated explicitly, titled).
  - **The HICP→Annex XI edge itself is still not mintable** — not an
    evidence gap, a modelling one: the EU-side dependent (the annual
    Commission decision applying Annex XI, e.g. COM(2025) 736) isn't
    modelled as a node, since its document number changes every year.
    Recorded as `no-node-yet` rather than invented. **Flagged as a real
    design decision for Thomas or a future session**, not a lookup.
  - Luxembourg's own CPI (STATEC) was not chased this session — time-boxed
    deliberately since the session was being wrapped up for a fresh-agent
    handoff. Cheapest next step on the list.
  - `G.33.json` written (2 findings, 0 corrections, 6 priority blocks, 13
    cheap checks; `--check` clean).

- **2026-08-05 (fifteenth session) — FSS slice minted and imported; Annex
  XI's primary text read for the first time and corrects a standing
  finding; `G.32.md` written.** Corpus **137 → 138 reports**, 215
  dependencies unchanged, 154 → **157 dropped notes**.
  `src/data/research/eurostat-farm-structure-survey.json` (1 report, 0
  dependencies, 3 `_dropped`) staged, validated (`npm run validate` +
  `npm run check` both exit 0), registered in `src/data/index.ts`.
  Currently isolated, same documented pattern `esa-2010` sat in before its
  own cross-layer edge landed.
  - **THE BIG ONE: Annex XI's own text — never read first-hand in this
    branch before, always gated — names HICP (Belgium) and Luxembourg's
    national CPI directly** as the components of the "Joint Index" behind
    EU staff salary updates. This **corrects `G.22.md`**, which (working
    only from COM(2025) 736 at one remove) reported this as `AGENCY ONLY`
    ("price information provided by the Belgian and Luxembourgish
    authorities"). The primary source discloses more than the secondary
    report did. **This is the branch's strongest cross-layer edge lead to
    date** — the first time the supranational→national chain, followed to
    its primary source, has produced a *named* release instead of stopping
    at AGENCY ONLY. Does not overturn the broader asymmetry finding
    (institutional-budget material and the ESA 2010/Annex B chain both
    still hold as measured) — it's one real counter-example inside the very
    instrument that produced one of the two central negatives.
  - **Also resolved: "the Eurostat Report of 31 October"** was never a
    separate document to chase — Annex XI Article 1(1) is itself the
    provision that creates it annually ("before the end of October"), no
    title beyond that. Cheap check discharged by explanation.
  - **New discrepancy found, not resolved**: COM(2025) 736 says "the ten
    Member States"; the consolidated Staff Regulations (dated 01.01.2024)
    still lists **eleven**, including the United Kingdom (which left the EU
    in 2020). Flagged, not adjudicated.
  - **Browser-fetch technique confirmed at much larger scale**: the full
    consolidated Staff Regulations (561,936 characters, all 13 annexes) came
    through the Claude_Browser tool with no gating — the largest document
    fetched this way so far, after G.31 established the technique on
    individual Regulations.
  - `G.32.json` written (4 findings, 2 corrections, 6 priority blocks, 14
    cheap checks; `--check` clean).
  - **Next priority: chase HICP / Luxembourg CPI to a mintable edge** — now
    ranked above the FADN/FSS lead from the prior session (which still needs
    FADN's own unreachable site) and above further SEC03 extraction.

- **2026-08-05 (fourteenth session) — FSDN/FSS lead chased with a browser;
  a ready-to-mint node found; `G.31.md` written.**
  `EU/FSDN_FSS_PartA_2026-08-05.md`: four documents fetched and read in
  full via the Claude_Browser tool (Reg. (EU) 2018/1091, Council Reg. (EC)
  1217/2009, Reg. (EU) 2023/2674, and Eurostat's own "Farm structure (ef)"
  metadata page). Corpus unchanged at 137/215/154 — extracted, not yet
  minted.
  - **`eurostat-farm-structure-survey` (FSS) is now a ready-to-mint node** —
    named, cadenced ("disseminated 2 years after the reference year",
    ~every 2-3 years on a 10-year census cycle since 1966), titled, all
    from Eurostat's own authoritative metadata page. **The strongest node
    candidate this branch has produced.**
  - **A genuine EU-internal statistics-to-statistics dependency, documented
    by Eurostat itself**: "[FSS surveys are] providing a basis for
    extrapolating Farm Accountancy Data Network (FADN) data" — FADN's
    ~105,000-holding sample needs FSS's structural framework to extrapolate
    to the whole population. Proposed `methodology_depends_on`, FADN→FSS.
    Not minted — FADN's own title/cadence/URL from its own authoritative
    site wasn't independently confirmed this session (see below).
  - **A documented legal change, not just found but scored**: the original
    2009 FADN regulation required the Commission to submit **annual**
    reports to Parliament and Council on farm incomes; the 2023 FSDN
    conversion (Reg. 2023/2674) replaced that article wholesale with a
    "publicly available" data duty that has **no stated cadence**. Flagged
    as a real change, not adjudicated.
  - **BIG PROCESS FINDING: `eur-lex.europa.eu`'s anti-bot gate does not
    block browser-driven fetches.** Three separate CELEX documents loaded
    normally through the Claude_Browser tool, full text, no HTTP 202/empty
    -body gating — the pattern every prior session hit was specific to
    non-browser HTTP clients. **This likely unblocks Annex XI Article
    1(4), the Eurostat Report of 31 October, and EBS Regulation 2019/2152**
    — all previously filed as "needs a browser," now cheap.
  - `agridata.ec.europa.eu` and `agriculture.ec.europa.eu` (FADN's own
    likely home) were denied by the browser tool this session — cause
    unclear, worth retrying.
  - No slice written yet. `G.31.json` written (3 findings, 0 corrections,
    6 priority blocks, 13 cheap checks; `--check` clean).
  - **Next priority, ahead of further SEC03 extraction: draft and validate
    the FSS slice** (`EU/slices/eu-level/eurostat-farm-structure-survey.json`),
    then retry the newly-cheap EUR-Lex checks with the same browser
    technique.

- **2026-08-05 (thirteenth session) — SEC03 Title 08 extracted; the
  statistics absence breaks for the first time; `G.30.md` written.**
  `EU/SEC03_Title08_PartA_2026-08-05.md`: Title 08 (Agriculture and Maritime
  Policy) in full, all seven chapters, EUR 54.98bn CA — the **largest Title
  in the entire Draft Budget**, bigger than every institutional section
  extracted so far combined. Corpus unchanged at 137/215/154.
  - **THE HEADLINE: after ten sections/Titles returning zero on the
    statistics watchlist, one breaks it.** Item 08 02 06 03 (EAGF
    operational technical assistance) states funding covers *"a one-off
    financial support to Member States to upgrade to the Farm
    Sustainability Data Network, for the collection, processing, analysis,
    publication and dissemination of farm accountancy and sustainability
    data"* and *"contributions to financing statistical surveys [...]
    including the Eurofarm database"* — with the FSDN's and integrated-farm
    -statistics' founding regulations cited in full (Reg. (EC) 1217/2009 as
    converted by Reg. (EU) 2023/2674; Reg. (EU) 2018/1091). **This is the
    closest the branch has come to a real statistics-funded node** — not
    minted yet, since no publication title/cadence/URL was established for
    what the FSDN/Eurofarm actually release. **Now the branch's #1 priority
    cheap check**, ahead of any further SEC03 extraction.
  - Confirms the absence still holds for actual commodity-market mechanisms
    though: zero hits for `reference price`/`market price`/standalone
    `index` despite fruit-and-vegetables/wine/olive-oil market-intervention
    articles being exactly where you'd expect one.
  - `DAG`/`PPPA` tags recur in a third MFF code-position family (`3.2.1DAG`,
    `3.2.1PPPA`), and a clean arithmetic reconciliation was found (European
    Fisheries Control Agency: Total contribution − recovered surplus =
    amount entered, verified exact).
  - No slice written. `G.30.json` written (3 findings, 0 corrections, 6
    priority blocks, 13 cheap checks; `--check` clean).
  - **Two SEC03 Titles now done (01, 08); ~950 pages remain.** Next
    extraction target if the FSDN lead isn't chased first: **Title 05**
    (Regional Development and Cohesion, EUR 44.0bn, now the largest
    remaining).

- **2026-08-05 (twelfth session) — SEC03 opened for the first time; `G.29.md`
  written.** `EU/SEC03_Title01_PartA_2026-08-05.md`: the 20-Title expenditure
  master summary plus Title 01 (Research and Innovation, EUR 13.8bn CA) in
  full — all four chapters (01 01 Support admin, 01 02 Horizon Europe, 01 03
  Euratom, 01 04 ITER, 01 20 Pilot projects). Corpus unchanged at 137/215/154.
  - **Big find: `EU/EU Meta jsons.docx` (12,447 paragraphs, 1.26M chars) is a
    real, unread asset.** A chat-era session (2026-08-03) had already fully
    extracted the master summary + Chapter 01 01, but it was never converted
    to the current file-based Part A convention and nobody had opened it
    with `python-docx` since. Re-extracted the master summary independently
    from the live PDF this session — **every figure matches the archived
    batch exactly**, so it's ported with confidence (Chapter 01 01's prose
    is ported but not independently re-verified line by line — flagged).
    **Same docx also appears to hold complete SEC09/SEC10 batches, not
    reconciled against this branch's own fresh SEC09/SEC10 extraction from
    the eleventh session — a loose end for `D — Housekeeping`.**
  - **The Eurostat/HICP/consumer-price absence extends to *operational*
    Commission spending, not just administrative budgets.** First time
    tested against programme funding (Horizon Europe, Euratom, ITER, a dozen
    Joint Undertakings, EUR 13.8bn) rather than salaries/buildings — holds
    exactly the same.
  - **A fourth non-standard MFF tag, `OTH`**, found in Chapter 01 20 —
    different code position than `SPEC`/`DAG`/`PPPA` though (`1.0.1OTH` vs
    `7.2.<n>9<TAG>`), so flagged as possibly a distinct convention.
  - **Densest legal-basis block in the corpus**: one wind-down `p.m.` line
    (Item 01 02 99 01) cites 25 instruments spanning 2005–2018. Corpus's
    earliest-dated citation found (Council Decision 84/1/Euratom, 1983) is
    in the same chapter.
  - No slice written — every record is a legal-basis citation or figures
    quote, none proposing a node/edge. `G.29.json` written (3 findings, 0
    corrections, 6 priority blocks, 12 cheap checks; `--check` clean).
  - **~1,000 of SEC03's 1,114 pages remain untouched** — Titles 02–30
    expenditure, all revenue Titles, Annexes. **Next targets: Title 08
    (Agriculture, EUR 54.9bn, largest in the document) or Title 05 (Regional
    Development, EUR 44.0bn, second largest)** — check `EU Meta jsons.docx`
    first in case either is already sitting there unread, the way Title 01
    was.

- **2026-08-05 (eleventh session) — SEC08 + SEC09 + SEC10 extracted; priority
  A fully closed; `G.28.md` written.**
  `EU/SEC08-SEC09-SEC10_PartA_2026-08-05.md`, 8 records across all three
  sections (29 + 31 + 38 pp, all read in full). Corpus unchanged at
  137/215/154.
  - **The money-total gap is now 7 of 8 sections, with SEC09 the first sign
    flip in the branch:** narrative "increase of 5.65%" to €32.535m against a
    table that actually **decreases** 1.73% to €30.26m — every sub-title
    diverges too (Title 2 advertised as −5.02%, table gives −16.43%, more
    than 3× the stated rate). SEC10 (EEAS) posts the largest percentage-point
    gap yet, 2.83 pp. Parliament (SEC01) remains the sole clean match.
  - **The headcount gap has (at least) two distinct causes, not one.** SEC10's
    "15 additional posts" are 10 Seconded National Experts + 5 contract
    agents — categories the establishment-plan STAFF table structurally never
    counts, so the flat table is not a timing artefact (SEC02/SEC07's shape)
    but a category mismatch. **Caution for reading the whole series: a flat
    table alone doesn't prove nothing changed.**
  - **`G.23.md`'s advance prediction about SEC10 confirmed exactly**: only
    section using literal `X` as its MFF digit (`7.2.X11` etc.), only section
    with a `PPPA` tag.
  - **SEC08 carries an internal abatement-rate conflict**: narrative says 3%,
    the largest line item's own remark says 2% — first case in the branch
    where an institution's two statements of the same figure disagree with
    each other (not just unpublished, actually contradictory).
  - **Eurostat/HICP/consumer price/standalone-index still zero**, now across
    all eight extracted sections without exception.
  - No slice written — same ratio as every institutional section so far.
    `G.28.json` written (4 findings, 0 corrections, 6 priority blocks, 11
    cheap checks; `--check` clean).
  - **Priority A is fully closed.** All eight sections G.20's list ever named
    now have Part A extractions. Next natural extraction target is SEC03
    (1,114 pp, priority B) or hash-verifying the 7 pattern-constructed URLs
    now queued behind SEC05's.

- **2026-08-05 (tenth session) — SEC01 + SEC02 extracted; priority A2 closed;
  `G.27.md` written.** `EU/SEC01-SEC02_PartA_2026-08-05.md`, 8 records across
  both sections (53 pp + 38 pp, both read in full). Corpus unchanged at
  137/215/154 — this session extracted, did not slice or import.
  - **Cheap check 6 discharged.** The money-total request-vs-table gap
    (`G.23.md` finding 2) now stands at 3 of 4 sections tested: SEC05
    (0.24 pp), SEC06 (2.52 pp), SEC02 (0.32 pp) diverge; **SEC01 — the
    largest section by appropriation in the whole Draft Budget — matches its
    own table exactly, to two decimal places.** The headcount gap (G.18) is
    confirmed at a second institution: SEC02's "five additional AD posts …
    to be recruited in the course of 2027" sits against a Grand Total flat at
    3,030 in both years, the same timing/inclusion shape as SEC07's 498/497.
    SEC01 is clean here too (6,823 both years, matching its own "no
    additional posts" claim).
  - **Two new strings for the absence register:** `GNI`, named once as a
    deflator variable with no publication attached (a visitor-programme
    appropriation "increased every year using a deflator that takes into
    account movements in GNI and prices") — first sighting of that string in
    the branch. `index-linking`, an unnamed property/construction-cost index
    referenced three times across two buildings articles — the salary-
    indexation absence's counterpart on the buildings side, found for the
    first time.
  - **Eurostat/HICP/consumer price/standalone-index all still return zero**,
    now across five sections including the two largest in the Draft Budget.
  - No slice written — records are almost entirely `AGENCY ONLY` or termini,
    same ratio as SEC05/SEC06/SEC07. `G.27.json` written (5 findings, 0
    corrections, 6 priority blocks, 11 cheap checks; `--check` clean).
  - **Next recommended targets: SEC08 (Ombudsman), SEC09 (EDPS), SEC10
    (EEAS)** — all on disk, none opened yet.

- **2026-08-05 (ninth session) — FIRST CROSS-LAYER EDGE. Corpus 136 → 137.**
  `de-destatis-national-accounts.json`: 1 report, **1 dependency**, 4 `_dropped`.
  Now **137 reports / 215 dependencies / 154 dropped notes**. First member-state
  node, and the filename matches `EU/slices/README.md`'s own worked example.
  - **The edge:** `de-destatis-national-accounts → esa-2010`,
    `methodology_depends_on`, on Destatis's own quality-report metadata —
    *"Legal bases: Regulation (EC) No 549/2013, European System of National and
    Regional Accounts (ESA) 2010, and supplementary and amending regulations …
    Periodicity: quarterly, annual"*. Title, cadence and legal basis in one
    structured block. Corroborated independently by both inventories
    (*"in compliance with"*, *"based on"*).
  - **How the cadence blocker was got around.** The *methodology documents* are a
    dead end — the GNI inventory says *"Periodicity: non-recurring"* while naming
    its own 2021 predecessor. The **published release** states its periodicity
    plainly, so routing the edge through the release instead of the inventory
    sidesteps the conflict entirely. **General lesson worth reusing:** when a
    member-state dependency looks blocked on cadence, check whether the *release*
    states what the *methodology document* does not.
  - **`esa-2010` is no longer isolated** — it has an in-edge and drops off
    `validate`'s ISOLATED list, leaving only `fed-h15` there.
  - **First slice extracted from sources read directly this session**, not from
    staged records: the Destatis Quality Report (19 pp), GNI inventory (372 pp)
    and QNA inventory (54 pp), all fetched from destatis.de.
  - **The folder rule in `EU/slices/README.md` is revised, not just annotated.**
    `cross-layer/` was defined for obligation-shaped edges named for the
    instrument. The edge found is a member-state publication naming an EU
    instrument as *its own legal basis* — a property of the German statistic, so
    it lives in Germany's file. `cross-layer/` stays right for an
    obligation-shaped edge if one ever appears; **two searches have now failed**,
    and the German slice carries a `wrong-direction` entry recording the exact
    edge the branch expected and did not find.
  - **Next two leads, both documented and named in the slice's `_dropped`:**
    (1) **Deutsche Bundesbank financial accounts by sector** — named twice,
    "responsible for compiling", same shape as the Bank of Canada material;
    (2) **the German source statistics**, named by title *and* by EVAS register
    number (Microcensus, EVAS 47410, EVAS 31211, EVAS 13111, VAT statistics…) —
    `Research.1.md` §7's strongest evidence class, and a whole German sub-graph.

- **2026-08-05 (eighth session) — Destatis cadence question closed. The answer is
  "no", and it is a documented conflict.** The two cross-layer leads do **not**
  mint. 150 dropped notes now (was 149).
  - **The GNI inventory's own colophon says `Periodicity: non-recurring`**
    (Statistisches Bundesamt, published March 2026). That is `Research.1.md`
    §4.2's exact disqualifier — *"something published once is not a node"*.
  - **But the same document names its own predecessor.** Its §1.2 is headed
    *"Revisions policy and major revisions since the 2021 inventory"*, and the
    Destatis landing page carries an *"Older editions"* heading. A 2021 edition
    and a 2025 edition demonstrably exist, **four years apart**, consistent with
    the Eurostat GNI verification cycle already in the corpus.
  - **Reported both ways and not adjudicated**, per §3. The likely reading is
    that "non-recurring" is a per-publication metadata label meaning "not a
    scheduled series release" rather than a claim that no further inventory will
    appear — but that is an inference about what the publisher meant, and §6 says
    don't guess a cadence to make the JSON validate. If the other end reads it as
    a metadata artefact, **`releases_per_year` 0.25** is what the observed
    2021→2025 interval supports.
  - **The QNA inventory is weaker, not stronger:** checked, and it carries **no
    periodicity statement at all** and names no predecessor edition.
  - **NEW LEAD, and better than either inventory.** The inventories are
    *methodology* documents with contested cadence; the *release* they describe
    has a stated timetable — *"First quarterly results of GDP … published as press
    release 30 days after the end of a reporting quarter. The more detailed
    figures are published around 55 days after…"*. That is a documented quarterly
    cadence, and the transmission record ties it to the EU instrument. Missing
    only an exact published **title** (records call it "the German QNA", a
    category not a title — §4.3) and its **own URL**, distinct from the inventory
    PDF. One Destatis lookup. **This is the most likely first cross-layer edge.**
  - Destatis is fetchable from this environment (unlike EUR-Lex) — both PDFs were
    retrieved and read directly, 372 pp and 54 pp.

- **2026-08-05 (seventh session) — second slice imported; the predicted bridge
  failed and a better one appeared. Corpus 135 → 136.**
  `esa-2010.json`: 1 report, **0 dependencies**, 4 `_dropped`. Now
  136 reports / 214 dependencies / **149 dropped notes**.
  - **THE PREDICTED EDGE WAS REFUTED, by the exact trap the brief exists for.**
    I said `esa-2010 → sna-2008` was the near-certain first bridge. ESA 2010's own
    text: *"The ESA 2010 is consistent with the worldwide guidelines on national
    accounting set out in the System of National Accounts 2008 (2008 SNA)"*
    (Annex A, ch. 1, ¶1.05). **"Consistent with" is verbatim on `Research.1.md`
    §5a's watchlist** — agreement between frameworks, not derivation. Two more
    records say it the same way and the original extractor had already flagged
    all three. §5a says record these precisely because the link keeps getting
    re-proposed; it was re-proposed by me this session.
  - **THE REAL FINDING — disclosure runs UPWARD, not downward.** EU instruments
    name no member-state publication (Annex XI, Annex B — both `AGENCY ONLY`).
    But **member-state documents DO name the EU instrument**: two German
    inventories each state they compile GDP/GNI *"in compliance with"* ESA 2010,
    and one adds *"based on the European System of Accounts (ESA) 2010"*. That is
    obligation/derivation language, **not** §5a agreement language — real
    `methodology_depends_on` edges running **member state → EU**.
  - **So the first cross-layer edges will land in `member-states/`, not
    `cross-layer/`**, which is the opposite of what the folder layout
    anticipated. Both are `no-node-yet` leads, blocked on ONE thing: **neither
    Destatis inventory states its publication cadence**, so §4.2 is unmet.
    Deliberately not guessed — ISSAI 300/400 were refused on the same ground last
    session and consistency matters more than one extra node. Evidence for a
    5-year cycle exists (HERP benchmark revisions at reference years ending 0/5;
    "most recent major revision took place in 2024, and the next is scheduled for
    2029"; "Eurostat GNI verification cycle 2020 to 2024") but that is the
    *revision* cycle, and the two inventories in hand are Edition 2025 and
    Edition 2024 — one year apart, which the 5-year reading does not explain.
  - **`esa-2010` imported with zero edges**, which the loader supports on purpose
    (*"Isolated reports are kept, as of V0.12"*). It shows under `validate`'s
    ISOLATED section — the right shelf until the cadence question is answered.
  - **NEXT, and it's cheap:** establish the Destatis inventory cadence. One
    lookup mints the branch's first cross-layer edges.

- **`G.26.md` WRITTEN — the debt is cleared.** Covers six working sessions in one
  file rather than one per session, which was the point: G.21–G.25 were five
  hand-offs in a day against a branch that had imported nothing. All six owed
  items are carried — the G.25 domain-gap correction, the ~3× staging-count
  correction, three slices imported (133 → 137), the domain-filter removal, the
  §5a refutation and the upward-disclosure asymmetry, and the provenance status.
  6 findings, 7 corrections, 6 priority blocks, 10 cheap checks; `--check` clean,
  all required sections present, spec block verified **byte-identical across
  G.21–G.26**.
  - **Part B discharged with it**, as the Output Rule requires — `sc-74`…`sc-78`.
    Note the shift in kind: several are candidate **non-edges**, including a
    documented non-dependency (`sc-77`, the ESA→SNA §5a case) and a documented
    conflict (`sc-76`, the Destatis periodicity contradiction). §5a says these
    are worth as much as edges because they stop a plausible link being
    re-proposed — and `sc-77` had already been re-proposed once, by the session
    that then refuted it.
  - **New priority block F — the German sub-graph**, both leads documented and
    named, neither needing new research to find.
  - **`scripts/eu-schema-smoke.ts` can now be deleted** — its stated condition
    ("no EU node exists to exercise the new schema paths") has lapsed: four do,
    including a `supranational` node and a `DE` member-state node, and `validate`
    passes. Seventh session of carrying it; now cheap check 4.

- **2026-08-05 (sixth session) — FIRST EU DATA IMPORTED. Corpus 133 → 135.**
  `eu-draft-budget.json` moved from `EU/slices/eu-level/` to
  `src/data/research/`, registered in `src/data/index.ts`. **135 reports, 214
  dependencies, 145 dropped notes** (was 133/213/134). `npm run check` and
  `npm run validate` both pass. After twenty-five hand-offs, the EU branch has
  data in the graph.
  - **Both remaining import questions resolved, and the answers are reusable.**
    *URL granularity*: node points at Section V — the document actually opened,
    per `Research.1.md` §6, and every other node in the corpus points at a
    specific document. *Series vs edition*: series, with the edition in the
    description — **verified against the corpus, 72 of 74 annuals carry no year
    in the title**, while versioned standards (SNA 2008, GFSM 2014, BPM6) do.
  - **Provenance strengthened without needing ten fetches.** PDF metadata shows
    **ten of the eleven `SEC*.pdf` were produced 2026-07-08 inside a 50-minute
    window, in section order, all at UTC+02:00** — one publisher's production
    run. With SEC05 already hash-verified against the URL pattern and all eleven
    pulled locally in one 3-minute batch, the pattern is well-supported for the
    set. Recorded in the slice's new `_provenance` field as **inference, not
    verification**. One fetch of any other section upgrades it — `SEC06.pdf` is
    the one to do, since it carries live records.
  - **The EU nodes are a disconnected component** — one edge between them, zero
    to the other 133 reports. Expected, not a defect: the branch exists to find
    out whether a link is documented. **Likeliest first bridge is ESA 2010 →
    `sna-2008`**, since `sna-2008` is already a node and ESA 2010 is the European
    implementation of it. Worth making the next slice's target.
  - Slice `_status`/`_note` corrected (they still said "NOT imported"), and
    `EU/slices/README.md` updated — `eu-level/` is empty again and the folder's
    write → validate → check → move → register workflow is now proven end to end.

- **2026-08-05 (fifth session) — domain filter removed; open question 1 closed.**
  Investigating the EU slice's missing-domain problem turned up that **the domain
  filter was dead code**: `FilterState.domains` was declared, defaulted to
  `null`, counted in `isFiltering` and compiled into a node predicate — and
  **nothing anywhere ever set it.** No UI control populated the field, so the
  predicate short-circuited on `null` every time and had never hidden a node.
  `DOMAIN_LABEL` in `palette.ts` was exported and imported nowhere. The file's
  own docstring shows why: it was scaffolded ahead of a UI ("domain and
  jurisdiction filters are the next") and only the jurisdiction half got built.
  - **Removed** from `src/lib/filter.ts`: the `domains` field, its `NO_FILTER`
    default, its `isFiltering` clause, the compile-time Set and the predicate,
    plus the now-false docstring line and the unused `Domain` import.
  - **`DOMAIN_LABEL` removed too**, in the same pass, along with `palette.ts`'s
    now-unused `Domain` import — an exported constant with no importer anywhere.
  - **Kept:** the `Domain` type and `Report.domains` — real research metadata
    required by `Research.1.md` §6 and populated on all 133 reports. `Domain`
    now has exactly one consumer in the codebase: the `Report.domains` field.
  - **One guardrail went knowingly.** `DOMAIN_LABEL` was `Record<Domain,string>`,
    so adding a `Domain` value used to fail `npm run check` until a label was
    supplied. Nothing enforces that now. Right trade while nothing renders a
    domain — but if a domain view is ever built, restore the label map *before*
    adding values or the union and labels drift apart silently. `COUNTRY_FAMILY`
    still works this way for `Country` and is the pattern to copy.
  - **Recorded in `REPORTS.md`** under *Decisions*, matching where the G.20
    schema decision went, and milestone 6's row updated — it claimed "domain and
    cadence filters not built, but the layer is there", which is now half wrong.
  - **G.25 finding 1 needs correcting in the next hand-off.** It called the
    domain gap "the one that matters — every future EU institutional node hits
    it". That was written believing `domains` drove a live filter. It does not
    and never did, so the gap is **data hygiene only** and does not block import.
    The slice's `_open_questions` entry is already downgraded in place; the G
    file cannot be edited (predecessor rule) so the correction belongs in G.26.
  - `npm run check` and `npm run validate` both pass; corpus unchanged at
    133/213. Two of the three import blockers remain (URL granularity,
    series-vs-edition).

- **2026-08-05 (fourth session) — URLs backfilled; FIRST SLICE WRITTEN;
  `G.25.md`.** After twenty-five hand-offs and no imported data, the branch has a
  file in the corpus schema: `EU/slices/eu-level/eu-draft-budget.json`.
  - **2 reports, 1 dependency, 11 `_dropped`.** Nodes `eu-draft-budget` and
    `ec-statement-of-estimates`, both `country: EU` /
    `jurisdiction_level: supranational` — first use of the level added in G.20.
    The single edge is `eu-draft-budget uses_data_from ec-statement-of-estimates`
    on Article 314(1) TFEU. Direction checked against §6: the Draft Budget is the
    dependent, authority accrues at the estimates.
  - **The `_dropped` list is five times longer than the slice, and that's the
    honest result.** Of everything read across four sessions, exactly two things
    clear all three §4 conditions *and* have a retrievable URL. Both central
    negatives (Annex XI, Annex B) now live in the graph's own dropped-edge record
    with `reason: "no-document"`, not just in prose.
  - **Validated, not assumed:** schema conformance, `supranational ⇒ EU`, palette
    membership, domain/relationship/dropped-reason unions, dangling refs, and
    **id collisions against all 133 corpus ids** — zero. Note the seed set is in
    `src/data/reports.ts` (18 of the 133), so globbing JSON alone finds only 115
    and would miss a clash.
  - **Three things block import, all Thomas's call, listed in the slice's own
    `_open_questions`:** (1) **there is no domain for this material** —
    `Research.1.md` §6's `Domain` union has no `public-finance`/`budget` value,
    both nodes carry `fiscal-transfers` as least-wrong, and §6 says the list can
    only be extended "at the other end". This one hits every future EU
    institutional node. (2) URL granularity — Section V vs the DB directory.
    (3) series-vs-edition modelling for annuals.
  - **URLs backfilled across 28 Part A records** in `SEC05_PartA` and
    `SEC06-SEC07_PartA`; zero local paths remain. **Verification is uneven and
    both files now say so:** SEC05 is hash-verified, SEC(2026) 250 was retrieved
    independently, and **SEC04/06/07 are constructed by pattern and never
    fetched.** That's the live risk — 28 records assert URLs, one is checked.
    Ten browser fetches close it.
  - `EU/slices/README.md` updated with a current-contents table and a section on
    **why `cross-layer/` is still empty** — two binding instruments followed to
    the national boundary, both stopping at `AGENCY ONLY`.
  - `G.25.json` written (2 findings, 4 corrections, 5 priority blocks, 10 cheap
    checks; `--check` clean). Corpus unchanged at 133/213 — the slice is **staged,
    not imported**, per the README's own workflow.

- **2026-08-05 (third session) — A8 closed, cheap check 1 scored, both briefs
  read; `G.24.md` written.** Three branch-state changes in one session.
  - **PRIORITY A8 IS CLOSED.** Thomas fetched
    `https://eur-lex.europa.eu/budget/data/DB/2027/en/SEC05.pdf` and it is
    **byte-identical** to `EU/SEC05.pdf` — `sha256 585c28fc…`, 894 024 bytes,
    not a size match but the same file. The pattern
    `budget/data/DB/<year>/en/SEC<nn>.pdf` is established for the whole set.
    **43 Part A records across four files stop being un-importable.** Caveat:
    only SEC05 is hash-verified; the other ten URLs are constructed by pattern
    and should be fetched before import, not assumed.
  - **Cheap check 1 discharged — and G.19 finding 6 is REFUTED.** ESA 2010's
    Annex B names table numbers, subjects and deadlines, **not publications**.
    The Regulation says so itself: *"a programme (Annex B) setting out the time
    limits by which Member States shall transmit…"*. The programme's table
    overview has four columns — number, subject, deadline, period — and no column
    for a publication. Cleanest test: **Destatis, describing its own transmission,
    names ten ESA table numbers and not one German publication.**
    G.20 finding 5 predicted this exact failure mode and was right.
  - **That's the second independent chain to stop at `AGENCY ONLY`**, after the
    Annex XI salary chain. Two binding EU instruments, chosen independently, both
    landing the same way. `EU/slices/README.md` framed the EU as the test of
    whether the Canada/US result is a fact about those two countries or about
    national statistical systems generally — **two chains now point at the
    second answer.** Not proof: both were assessed at one remove. Third test
    would be EBS Regulation 2019/2152, untouched.
  - **The counterweight, and it's where the first real edges are:** the *2025
    List of main statistics* names Eurostat products with stable codes (NAMA,
    NAMQ, NASA…), stated cadences and a named legal basis — three of §4's
    conditions in one table. But they're Eurostat's **own** products, so it
    points the same way rather than rescuing the prediction. **The record bundles
    nine products under one heading** — the exact failure §6 describes — and must
    be split into nine before anything is built on it.
  - **Both governing briefs read first-hand** (`EU/Research.2.md.docx`,
    `EU/Research.eu.docx`), closing the three-session second-hand chain flagged
    in G.23. **G.20 finding 1 confirmed in every particular**: §8 gone, §9 heading
    with no list under it, Part B Output Rule sitting after §10. Two details no
    G file had: the rule's own closing line says the Part B list should be passed
    with the initial files (so it's required, not conventional), and it says to
    update incrementally — which is what the single-file append practice does.
  - **Two corpus defects found, both feeding E4:** `esa-reg-article1` and
    `esa2010-art1-2` are **byte-identical quotes at the same location under two
    ids** — two naming schemes for the same instrument, which is §9's duplicate-id
    failure one level up. And **14 of 43 matched records carry no id at all.**
  - **Suggested first slice has changed.** G.20–G.23 all suggested the ESA
    transmission-programme material because it was the test of finding 6. That
    test is now run and negative, so start instead with `list-main-stats-2025-na`
    split into its nine products.
  - `G.24.json` written (4 findings, 5 corrections, 5 priority blocks, 10 cheap
    checks; `--check` clean). Part B `sc-69`…`sc-73`. Corpus unchanged at 133/213.

- **2026-08-05 (second session) — SEC06 + SEC07 extracted; `G.23.md` written.**
  Priority A2 discharged after two sessions of not moving.
  `EU/SEC06-SEC07_PartA_2026-08-05.md`, 9 records across both committees (one
  file, because the central finding is an asymmetry *between* them).
  - **G.18's joint-services asymmetry confirmed — and it doesn't generalise.**
    SEC07 (CoR) prints the Title 2 joint-services split *for both committees*;
    SEC06 (EESC) has **no Remarks block there at all** and zero occurrences of
    "joint service(s)" in 39 pages. Verified mechanically: "Title 2 — Total" is
    followed by "Remarks" in SEC07 and by "CHAPTER" in SEC06. **But the direction
    flips by subject** — SEC06 cites the Cybersecurity Regulation 2023/2841 four
    times and SEC07 never mentions it, despite being the other party to the joint
    approach. So "the CoR discloses more" holds for Title 2 only.
  - **The bigger find is arithmetic: the advertised increase is not the granted
    increase.** SEC06's narrative headline is "a total increase of 4.47%"; its own
    expenditure table gives **+1,95 %**. SEC05: +2,98 % advertised, +2,74 %
    granted. Request-vs-table gaps of EUR 498 000 (SEC05) and **EUR 4 529 195**
    (SEC06). The boilerplate at the head of every section explains the mechanism
    and the documents never reconcile the two figures at the point of use.
    Same shape as `sc-46` but **inside a single document**. Anyone quoting an
    institution's "2027 increase" has to say which number they mean.
  - **Best instrument-to-budget-line link found in any section so far:**
    Regulation (EU, Euratom) 2023/2841 sets "a long-term indicative target of at
    least 10% of the total ICT budget", and SEC06 records its own performance
    against it — 3.95 %. Named act + quantified target + measured shortfall in one
    provision. `relationship_type` deliberately not picked.
  - **A documented *absence* of a formula**, which `Research.1.md` §8 item 1b
    explicitly asks for: EESC members' EUR 367 daily allowance was frozen 11 years
    then adjusted once by 26,55 % via Council Decision (EU) 2024/1809. No index
    named anywhere. Pairs with `sc-62` (Annex XI's ±2 % cap vs Alberta's 2 % cap)
    to give two EU indexation data points of opposite kinds.
  - **SEC07's "36% less budget than the EESC" does not reproduce** from the two
    sections' own tables — 2027 totals give **24,23 %**. Not flagged as a
    contradiction: the claim says "under the current MFF" (2021-2027) and only
    2027 figures are in hand. Both numbers recorded, neither picked.
  - **Three sections, three times no statistical release.** `Eurostat` 0, `HICP`
    0, standalone `index` 0 in SEC06 and SEC07 as in SEC05. G.21 left open whether
    this was a Court of Auditors quirk — **it isn't.**
  - **Part B**: `sc-63`…`sc-68` added, and **`sc-63`/`sc-64` finally clear G.18's
    two candidates**, outstanding since G.18 and carried by G.21 and G.22.
    `G.23.json` written (6 findings, 6 corrections, 5 priority blocks, 10 cheap
    checks; `--check` clean). Corpus unchanged at 133/213.
  - **Flagged as a process defect, not a finding:** `Research.2.md` and
    `Research.EU.md` are now **three consecutive hand-offs deep at one remove** —
    G.21, G.22 and G.23 all rely on G.20's account without re-opening them. Next
    session should open both before relying on any claim about them. This is the
    same failure mode G.20's own headline described.

- **2026-08-05 — Annex XI chain traced; `G.22.md` written.** First session in the
  branch to fetch primary sources off the open web rather than work from disk.
  Two new Part A records: `EU/AnnexXI_PartA_2026-08-05.md` (12 records from
  `COM(2025) 736 final`) and `EU/SEC250_PartA_2026-08-05.md` (3 records from
  SEC(2026) 250).
  - **The headline is a refutation, and it's the good kind.** G.21 predicted the
    salary-update chain would be a supranational instrument naming member-state
    statistical releases by title — the edge shape Canada/US was measured to
    lack. **It splits.** Eurostat's *own* publications are named in full (two
    titled, dated report series), and the arithmetic is stated as arithmetic
    ("obtained by multiplying together the Specific Indicator and the Joint
    Index" → `calculated_from`). But every **national** input is `AGENCY ONLY`:
    "the Belgian and Luxembourgish authorities", "the ten Member States referred
    to in Article 1(4) of Annex XI", "the national statistical bodies". **No
    member-state publication is named anywhere.** That is the same shape as the
    Canada/US result the EU was supposed to be the counterexample to.
  - **Caveat that keeps it open:** `eur-lex.europa.eu` is anti-bot gated to every
    client here (HTTP 202, zero-byte body — *not* a 404, so it proves nothing).
    **Annex XI itself was never read**, so the refutation is of the operative
    document, not the rule. Article 1(4) is the provision that would settle it.
  - **DISC-07-03 finally has a printed anchor, and it's partial.** Three sessions
    hunted a key inside the section PDFs; it was never going to be there.
    SEC(2026) 250 documents that MFF heading 7 is "European Public
    Administration" and splits into "Administrative expenditure of the
    institutions" and (Title 21) "pensions … and the contributions to the
    European Schools" — which matches the observed `7.2.*` / `7.1.*` families
    exactly. **The document never connects the words to the digits.** So the
    semantic content of the first two levels is documented; the encoding is still
    inference and the third level is entirely undocumented. Don't report it
    closed.
  - **`SEC*.pdf` URL pattern found:**
    `eur-lex.europa.eu/budget/data/DB/<year>/en/SEC<nn>.pdf` — the 2026 siblings
    are indexed and the filename convention matches our local files exactly.
    **Unverified**, because the gate blocks retrieval. **One browser fetch closes
    priority A8 and unblocks import of all fifteen Part A records now in hand** —
    it's the highest-value action available and not one an agent here can do.
  - **First EU document in the branch with a verified working URL:** SEC(2026)
    250, retrieved and checked (HTTP 200, 8.88 MB, 539 pp). It's the document
    `sc-46` referenced without one. Note the `_v2` suffix is load-bearing and the
    host rate-limits — a second request within seconds returns 429.
  - **Part B**: `sc-58`…`sc-62` added. `sc-47`…`sc-50` still reserved.
    `G.22.json` written (4 findings, 6 corrections, 5 priority blocks, 9 cheap
    checks; `--check` clean). Corpus unchanged at 133 reports / 213 dependencies.
  - **Did not move:** SEC06/SEC07 extraction (priority A2), the blob, the D-item
    merge. The session spent itself on G.21's top two cheap checks, which were
    correctly ranked and paid off.

- **2026-08-04 (second session) — SEC05 extracted; `G.21.md` written.** The EU
  branch's **first Part A extraction** in the `Research.1.md` §6 format:
  `EU/SEC05_PartA_2026-08-04.md`, 19 records from all 40 pages of `SEC05.pdf`.
  Ten of the nineteen are `AGENCY ONLY` or terminus candidates, and the section
  names **no statistical release at all** — `Eurostat`, `HICP`, `consumer price`
  and `index`-as-a-word return zero hits while `indexation` returns ten.
  Priority A1 discharged, first movement on block A in four sessions.
  - **DISC-07-03 went from one section to ten.** All eleven `SEC*.pdf` extracted
    to text and searched. `7.1.2<section>` confirmed in seven sections and
    **every hit is a European Schools line**, with the section's own numeral last
    (`X` for Section X); the three sections without such a line have no such
    code. Independent second confirmation in SEC03's `7.1.12<section>`
    former-Members pension series (1=EP … 5=ECA, 8=Ombudsman, 9=EDPS). New
    sub-rule found: `7.2.<section>9<TAG>` marks non-standard lines, tags `SPEC`,
    `DAG`, `PPPA`. **Still no printed key anywhere — still inference in exactly
    the one narrow respect G.18 named.**
  - **Four cheap checks closed, two of them against their own framing.** Check 1:
    SEC00 has *no MFF codes at all* (general introduction, not a budget section)
    — premise refuted. Check 3: the SEC05/SEC06 item 3 0 1 1 form is a plurality
    at 3 of 10, **not** a majority; eight distinct forms exist for one identical
    line. Check 4: the housing allowance is a **real conflict** — SEC04 says its
    legal basis has not been adopted, SEC05 books it as payable. Check 5:
    SEC04 item 1 6 5 6 and SEC06 item 1 6 4 0 are the same instrument class,
    different heading scope.
  - **Part B Output Rule honoured for the second time** — seven entries added,
    `sc-51`…`sc-57`, in `PartB_soft_connections_2026-08-04.md` and its `.json`.
    First Part B entries whose `evidence` is a **Part A record id** rather than a
    document pointer. **`sc-47`…`sc-50` deliberately left empty** and reserved
    for G.16's missing entries, so the two sets cannot collide.
  - `G.21.json` written via `scripts/handoff-to-json.py` (6 findings,
    7 corrections, 5 priority blocks, 9 cheap checks; `--check` clean, no missing
    sections). Spec block copied forward verbatim.
  - **Correction recorded:** G.20's "SEC08 (Ombudsman) — still not held" is
    wrong. `EU/SEC08.pdf` is on disk, 29 pages. All eleven sections are present
    and readable; the claim was inherited from the chat era and never re-checked
    after filesystem access appeared.
  - **New blocker, and it is cheap:** **no retrieval URL is recorded for any
    `SEC*.pdf`** — not in `EU/`, not in any `G.*` log, not in
    `_staging/01-manifest.json`, and `SEC05.pdf` carries no OJ/COM/SEC number or
    ELI of its own. Every new Part A record therefore has a local path where
    `Research.1.md` §6 wants a URL, which **blocks import of all priority-A work
    including what is already done.** One web fetch or one answer from Thomas
    fixes it. Now priority A8.
  - **Highest-value open lead:** Annex XI to the Staff Regulations, the
    salary-update method behind the "+2,2 % / +2,3 %" that three chapters of
    SEC05 rest on. SEC05 cites it and stops. If Annex XI names its indices by
    title it is a **second** supranational→national instrument alongside ESA
    2010's Annex B — a logged, falsifiable prediction, one grep to score, and a
    refutation is worth as much. `G.21.md` cheap check 1.

- **2026-08-04 — `G.20.md` written**, plus its JSON sidecar via
  `scripts/handoff-to-json.py` (5 findings, 6 corrections, 5 priority blocks,
  12 cheap checks; all 9 required sections present, `--check` clean). Records the
  schema decision, the four corrections to G.19's framing, and cheap check #9.
  The hand-off spec block was copied forward verbatim per the house rule.
  **G.19 was not edited** — every correction lives in G.20's *Corrections*
  section, which is the convention that makes the chain trustworthy.

- **2026-08-04 — the Part B Output Rule honoured for the first time.**
  `EU/PartB_soft_connections_2026-08-04.md` + `.json`, generated rather than
  transcribed. 46 distinct soft connections, sc-1…sc-46, **no gaps**, extracted
  from `Soft Connections.docx` and deduped against
  `_staging/10-part-b-soft-connections.ndjson` (which proved to be a subset
  duplicate of sc-01…sc-10, not new material). Three ids differ between their
  two copies and all three differences are cosmetic; the richer copy was kept.
  One source block is **not valid JSON** — sc-03's `notes` is unterminated —
  but every record in it survives in a clean duplicate, so nothing was lost.
  **It is a transcription, not a verification**: no entry was checked against a
  Part A quote, and the `evidence` column is a pointer rather than a quote.

- **2026-08-04 — the governing briefs were finally read. D item closed after
  four sessions.** `Research.2.md.docx` and `Research.eu.docx` were converted
  from `.docx` and read in full. Three results, all in the Now list above as
  items 5–7: Research.2 v2.1 is Research.1 with §8 and §9's id block removed
  plus **one genuinely new standing rule** (the Part B Output Rule, added
  2026-08-02, never honoured); Research.EU.md v0.1 §10 turns out to be the
  origin of the "surprise" Eurostat strand; and the two briefs' priority queues
  do not agree with each other. **The merge itself (D) is still to do** — what
  closed is the four-session blocker on *seeing* them.

- **2026-08-04 — cheap check #9 done (G.19's list).** Grepped
  `00-blob-fulltext.txt` for `Annex B` / `transmission programme`: **82 hits.**
  G.19 finding 6's prediction has real material behind it — Art. 3 of Reg.
  549/2013 is quoted verbatim in the blob ("The Member States shall transmit to
  the Commission (Eurostat) the accounts and tables set out in Annex B within
  the time limits specified therein for each table"), along with the transmission
  programme's own presentation document and a full overview table of it. Not yet
  scored either way: whether Annex B's *tables* satisfy Research.1.md §4's
  "it has a title" test, or whether this is `AGENCY ONLY` at scale, needs the
  records read for meaning. That read is the test, and it is now cheap.

- **2026-08-04 — folder reorganised.** Root went from 36 loose files to 6 docs
  + the app's own files. New: `sessions/` (14 session logs + rollups),
  `research-input/` (5 Grok briefs + the handoff folder and zip), `notes/`
  (unlogged notes, open questions). Left deliberately in place: the Vite app
  (`src/`, `scripts/`, configs, `run.bat`), the six root-level entry-point docs
  (`REPORTS.md`, `START-HERE.md`, `BACKLOG.md`, `EXPANSION-V1.md`,
  `Research.1.md`, `README.md`), and **`EU/` untouched** — `G.18.md` says the
  section PDFs are expected in the workspace folder as-is, so tidying its
  internals risks breaking whatever tool runs those threads. Cross-references
  updated in `REPORTS.md` (the read-these-first list), `README.md` (new
  "documents" map added under *Where things live*) and `START-HERE.md` (its
  file table, which was also stale — pointed at `V0.11.md` as newest when
  `V0.12.md` exists). Prose citations like "decided in V0.8" were left alone:
  they cite a log, not a path.

- **2026-08-04 — `G.19.md` written**, plus its JSON sidecar, plus
  `scripts/handoff-to-json.py` (the converter; `--check` reports stale sidecars,
  `--hook` mode exists for automation but the settings.json hook was **not**
  installed — blocked by the permission classifier, JSON given to Thomas to
  paste). G.19 records the split, the schema blocker, and the two-strand
  finding below. The hand-off format spec now lives in G.18 and G.19 and
  copies itself forward.

- **2026-08-04 — EU blob mechanically pre-split.** `EU\slices\` created with
  `eu-level/`, `member-states/`, `cross-layer/`, `_staging/` and a README
  covering naming and the schema blocker. `EU Meta jsons.docx` **left in place
  and unmodified** — it stays the archive of record for future mining.
  `_staging/` holds a lossless text extraction plus every syntactically valid
  JSON object found in it, classified: **73 batches carrying 659 Part A
  records, 301 loose records, 8 batch headers, 1 part-B soft-connections
  object** — 67.4% of the blob by character. The remainder is one ~399k-char
  ECB/Eurosystem batch delivered as prose rather than JSON, split out to
  `20-prose-sections.txt`. `split_blob.py` is kept alongside so the extraction
  is reproducible; it deliberately does no grouping, judging, or id-minting.

## Parked

*(nothing yet — Thomas says "forget that path" here, with the date and why,
so a future session doesn't propose it again)*

## Candidate categories — possible gaps, unconfirmed

Seeded from a first pass, not a real audit yet — BACKLOG.md's own clusters
A–L are already a thorough gap analysis and should be checked first before
assuming any of these are actually missing. Flagging only what looked absent
skimming the existing 26 slices + `Research.1.md` §9's id list:

- **Immigration/citizenship formulas** — Express Entry CRS scoring, Provincial
  Nominee allocation numbers. `EXPANSION-V1.md` already names this (★★★
  outlook) but it doesn't look built yet — confirm against the live id list
  once Phase 1 lands, don't just trust the doc.
- **Retirement/pension beyond CPP** — OAS/GIS are partly in (`esdc-oas-
    indexation` exists), but provincial public-sector pension plans (Alberta's
    LAPP, Ontario Teachers', etc.) don't appear in the id list. Unconfirmed
    whether they'd even qualify (need a document naming a formula input).
- **Judicial/sentencing guidelines** — mentioned once in BACKLOG.md cluster J
  as low-value (★, mostly process). Not re-flagging as a priority, just
  noting it's the one subject area explicitly considered and rejected, so it
  shouldn't get re-proposed without new evidence.
- **EU statistical governance** — found 2026-08-04 in the blob, not a guess:
  ~57 records across the Code of Practice 2017, ESGAB annual reports, ESSC
  legal basis and rules of procedure, peer-review compliance (SWD(2024) 136,
  44 records on its own). No `G.*` log discusses any of it. Whether governance
  documents produce *derivation* edges or only *obligation* edges is an open
  question worth settling early — it may be a whole node class the Canada/US
  side has no equivalent for, or it may be out of scope entirely.
- **The CA↔US-vs-EU comparison itself** — see G.19 finding 6. The Canada/US
  corpus measured **zero** standard-compliant direct official cross-border
  edges; ESA 2010 is a Regulation with a binding transmission programme, so
  the EU should be the opposite case. That prediction is logged and testable
  from material already in staging. If it holds it's the branch's headline
  result; if it fails, that's worth as much.

This section is meant to grow from an actual post-merge gap scan (comparing
what Research.1.md defines as in-scope against what nodes/domains actually
exist), not from guessing — treat the three bullets above as placeholders,
not findings.

### Added 2026-08-07 (EU slice S1 session; `EU/EDPInventory_PartA_2026-08-07.md`)

**Not guesses.** Each was found while reading staging material for the EDP
inventory slice, and each names the batch it came out of. Not scoped, per the
instruction that produced them.

Two of the placeholders above can also be updated. **"The CA↔US-vs-EU
comparison"** has now had a third instrument put through it — Council
Regulation (EC) No 479/2009 — and the answer is a new shape rather than a
yes or no: the EU layer *creates* a published national document class rather
than *naming* an existing publication, and the edge direction is still
national → EU. **"EU statistical governance"** is largely built as of
`EU/G.50.md`.

- **NACE and CPA.** Neither is a node. `naics`, `isic` and `anzsic` all are,
  and `isic` was minted precisely because the parent of a national
  classification was missing. NACE is the EU's NAICS and is named by nearly
  every EU business statistic; Regulation (EC) No 451/2008 defines CPA by its
  structural relationship to NACE. Staging batches 6–9, 33 records, unused.
  Probably the largest single hole on this list.
- **EU methodological manuals as a document class.** The Manual on Government
  Deficit and Debt (2022 ed.), the Eurostat Manual of Supply, Use and
  Input-Output Tables, the Handbook on Quarterly National Accounts, the Manual
  on MFI Balance Sheet Statistics, the Balance of Payments Vademecum, and the
  Manual on Quarterly Non-financial Accounts for General Government — whose
  2006 and 2011 editions are named side by side in one staged record, which is
  cadence evidence on a plate. Re-editioned on a cycle and named by name as the
  method other releases follow. The corpus has exactly one
  (`eu-manual-rd-esa2010`).
- **The 27 national EDP inventories.** Compelled by Article 9 of Council
  Regulation (EC) No 479/2009, published under Article 9(4), revised under
  Article 9(3), one per member state, all 27 linked from Eurostat's own page.
  Germany's names five German statistics by title. Only Germany is in staging.
  See `EU/slices/cross-layer/edp-inventory-regulation-479-2009.json`.
- **The 27 national ESA 2010 quality reports.** ~~A second compelled national
  document class, under Commission Implementing Regulation (EU) 2016/2304, and
  a stronger candidate than the inventories because the Regulation states the
  interval.~~ **CORRECTED SAME DAY by slice S2, which read the instrument in
  full.** The interval is real — *"Member States shall provide the quality
  report on an annual basis"* — but **2016/2304 contains no publication
  requirement at all** (searched "shall be made public", "publish",
  "publication", "public" across all 24,942 characters; the only hits are
  Eurostat's own standards and the Regulation's entry into force). So this is
  *not* a candidate node class as written. **The two instruments are
  complementary failures**: Regulation 479/2009 Article 9(4) compels a
  *published* national document but states no interval, and 2016/2304 states the
  interval and compels no publication. Neither supplies both, which is why two
  slices covering 54 potential national documents produced zero member-state
  nodes. What survives as a lead is narrower and better: Annex 4.2 indicator 2
  requires each report to carry a *"List of national publications on the data
  sources used and methodology applied containing the titles of these
  publications and links to them"*, so **if any NSI publishes its quality report
  voluntarily, that one document is a data-sources table**. Now `MISSION-TODO-2`
  P2 item 9z. Distinct from `eurostat-edp-gfs-quality-report`, which is the
  Article 8(3) report Eurostat itself writes — do not conflate; and note
  Eurostat's *own* consolidated version of the report is now a node,
  `eurostat-national-accounts-quality-report`.
- **NACE and CPA — upgraded from "probably the largest hole" to evidenced.**
  S2 found Eurostat stating it directly, in the *Quality report on national and
  regional accounts* §3.2, under the heading "Classifications used in ESA 2010":
  *"Statistical Classification of Economic Activities in the European Community
  (NACE), Rev. 2 (2008) • Statistical Classification of Products by Activity,
  Version 2.1 (CPA) • Classification of Individual Consumption by Purpose
  (COICOP), COICOP 2018 • Classifications of functions of government (COFOG) •
  Nomenclature of territorial units for statistics (NUTS), 2024 version"*. Five
  classifications used by a node this corpus already holds, and not one of them
  is a node. Build them from the programmes coded to them, per `Research.1.md`
  §7 — not from this list.
- **The European Banking Authority.** EBA Risk Dashboard, EBA Risk Assessment
  Report, the Implementing Technical Standards on supervisory reporting. A
  whole EU agency with recurrent titled publications, entirely absent from the
  corpus. Staging batches 52–54 and 62.
- **The Alert Mechanism Report / MIP scoreboard.** `ess-escb-mip-quality-report`
  is a node; the annual AMR the scoreboard feeds is not. Staging batch 63 lists
  all 23 auxiliary indicators for the 2026 AMR with their named source
  institutions (Eurostat, DG ECFIN, OECD, ECB, IMF) — a data-sources table,
  which `Research.1.md` §7 calls the strongest evidence class there is.
- **National debt-management-agency statistics.** SFGD and the Report on Loan
  Notes by Creditors of Central Government are published by the German finance
  agency (Bundesrepublik Deutschland Finanzagentur GmbH), not by Destatis — a
  publisher type this corpus has no instance of. Every member state has a debt
  agency.
