# MISSION-TODO — the consolidated list

Written 2026-08-07 by the first session to have the whole repo in view at
once. Sources consolidated: `NZ/G.4.md` (and its carried G.1–G.3 items),
`AU/G.1.md`, `EU/G.49.md` (and its carried G.47/G.48 items),
`planning/rolling-todo.md`, `planning/BACKLOG.md` (clusters, stale counts),
`research-input/Grok-Research-Brief-XI.md` items 25/27/28,
`notes/REORG-2026-08-07.md` (the code-review findings), and the state of the
corpus itself (302 reports / 358 dependencies / 2 relations; `npm run check`
and `npm run validate` both fully green as of 2026-08-07).

This file is the mission's entry point. `rolling-todo.md` keeps its Merged
history; branch `G.*.md` files remain the authority on their own frontier —
this file indexes them, it does not replace them. When an item below is done,
mark it here AND in whatever branch file owns it.

---

## P0 — Unblock the mission (do these before more corpus growth)

1. **Merge the 2026-07-31 Grok handoff.** ~72 reports / ~73 dependencies in
   7 finished-looking slices sitting in
   `research-input/grok-research-handoff-2026-07-31/grok-research/`, never
   verified, never wired into `src/data/index.ts`. This is the largest
   single block of researched-but-dead material in the project — a fifth of
   the live corpus's size. Needs the full Research.1.md §2 verification pass
   (open every `evidence_url`, confirm the quote, check tense/direction/id
   collisions); the two scoping-template files in the same folder are
   research *targets*, not data. Read the bundled session logs first.
   (Source: rolling-todo Now #1.)
2. **Settle the `Research.1.md` version string.** Header says v3.0; four
   branch files describe v3.3/v3.4. Carried by five sessions and counting.
   One edit by Thomas (fix it or delete the version line). Two minutes.
   (Source: NZ/G.4 Corrections 1.)
3. **Publish the repo to GitHub.** Thomas's stated goal is outside use and
   input; the hidden page at thomascheesman.ca/reports-graph is live but the
   source isn't shareable. GitHub Desktop is installed and working. Before
   flipping it public: refresh `START-HERE.md` (still says 124/205; corpus
   is 302/358) since it's the document written for exactly this audience.
   Decide public-vs-private-with-invites; nothing in the repo looks secret,
   but Thomas should confirm.

## P1 — Branch frontiers (each is one good session)

4. **NZ — the G.4 list, in its own order.** (a) Stats NZ national-accounts
   pass from `nz-statsnz-aes` — five downstream products named in DataInfo+,
   none in the corpus, domain reliably fetchable. (b) Cheap checks first if
   short on time: mint the XRB A1 and Wellington edges to
   `nz-public-audit-act-2001` (two fetches, connects the branch's newest
   node to its two most-cited); re-read the back half (pp. ~60–108) of the
   Auditor-General's annual report for a possible `nz-pbe-ipsas-1` edge.
   (c) Second exemplar council (Auckland/Christchurch — browser required,
   now known to work). (Source: NZ/G.4 priorities 1–2, cheap checks 1–2.)
5. **EU — the blob's judgment half.** The mechanical split is done; 73
   batches wait in `EU/slices/_staging/01-manifest.json`, worked one at a
   time with `PROMPT-for-splitting-agent.md`, nothing imported without a
   verbatim Part A quote. The 399k-char prose section
   (`20-prose-sections.txt`) needs its own supervised session. This is the
   project's largest known backlog by volume. (Source: rolling-todo Now #2.)
6. **AU — get past the CGC wall, then a second state.** Re-fetch the CGC
   GST Revenue Sharing Relativities (Australia's most important fiscal
   document; every fetch method failed in AU/G.1 — try the browser, which
   NZ/G.4 proved changes everything). Then Victoria (VLGGC found, not
   verified) or NSW. (Source: AU/G.1 priorities 1–2, cheap checks 1–3, 5.)
7. **EU wide — Norway's KOSTRA.** The scouts' own top pick: bilingual,
   "as strong as the Dutch Toelichting", likely the fastest un-built
   country. Alternative: close the Netherlands/UK `_dropped` leads instead.
   (Source: EU/G.49 priority G, cheap check 5.)
8. **Beyond-Europe briefs — XI items 25, 27, 28.** 25c first (Chile's SII
   avalúo fiscal — a fourth property-valuation legal tradition), then
   Colombia/Chile-FCM/Peru; item 27's nineteen unscouted jurisdictions,
   Crown Dependencies first; item 28's two small closures. Still assigned,
   still `not_attempted` across two NZ sessions. (Source: XI; NZ/G.4
   priorities 3–4.)

## P2 — Decisions only Thomas can make (each blocks something concrete)

9. **A `supersedes` relationship type?** The UKSPF/EU-structural-funds case
   is ready to build the moment this is decided, and the Orkney/NE-Lincs
   ERDF citations are blocked on it. Same decision style as the `audits`
   one already made. (Source: EU/G.49 Finding 3, cheap checks 3–4.)
10. **Mint the Public Finance Act 1989 — and decide its edge policy.** It
    plausibly sits under a large fraction of NZ fiscal nodes; the question
    is how many edges it collects on arrival, not whether it exists.
    (Source: NZ/G.4 priority 5.)
11. **Branch hand-off lettering.** Does EU's A–G lettered-priorities
    convention carry to NZ/AU or do branches letter their own? Carried
    unanswered by five sessions; costs a paragraph of every hand-off.
    (Source: AU/G.1 priority 4; NZ/G.4.)
12. **A `reason` value for caveat-notes.** `_dropped` entries that annotate
    a real edge must fake null endpoints to pass the validator (Montenegro
    was converted this way 2026-08-07 and the pattern will recur). Add a
    proper `caveat` reason to the schema + validator, or bless the null
    convention in Research.1.md §2. (Source: NZ/G.4 cheap check 5.)

## P3 — Code and data hygiene (from the 2026-08-07 review; none urgent)

13. The RETENTION "invariant" in `validate-data.ts` is a tautology — it
    recomputes the same expression on both sides and can never fail.
    Rewrite it to measure retained rank from the built graph, or drop it.
14. The Alberta edge `ab-education-property-tax-requisition →
    ab-municipalaffairs-equalized-assessment` is defined in two slices with
    different documented bases; import order silently picks the winner.
    Pick the better basis, delete the other, and let the (now-printed)
    duplicate-edge report stay empty.
15. Isolated-node shelving in the 3D view treats implied-only nodes
    inconsistently with the validator's definition — reconcile.
16. Searching during layout warmup silently does nothing (flyTo during
    warmup) — either queue it or grey the search box until settled.
17. NZ carried verification debt: full re-extraction of LGA 2002
    Schedule 10 (the one unverified thing left in the NZ slice), and the
    s 106(2C) current-consolidation check (existence confirmed 2026-08-06,
    content not). (Source: NZ/G.1 carried items.)
18. The OAG long-term-plan observations: fetch from `ao.parliament.nz`
    directly — the Wayback-gzip dead end is obsolete now the live host is
    known. Also NZSIOC → `anzsic` mint; Puerto Rico items (Census SLGF
    mint, Planning Board forecasts, June-2026 revised fiscal plan).
    (Source: NZ/G.4 cheap checks 4, 7–10.)
19. Rendering `relations` in the app: deferred until there are five
    (currently two — Niue and Tokelau `audits`). Option C's fuller form
    (hover card + search + distinct unweighted line style) is the agreed
    shape. (Source: NZ/G.3–G.4.)
20. Housekeeping: empty `_to_delete/`; EU hand-offs G.00–G.13 exist only as
    .docx in `EU/legacy-handoffs/` — worth converting to .md someday so the
    chain's early history is greppable.

## Standing method notes (read once, apply always)

- Verification rule: direct fetch + own-eyes text extraction for anything
  that becomes a quoted `basis`; re-read inherited quotes at source before
  minting; check whether a "blocked" domain actually moved (three sessions
  lost to oag→ao.parliament.nz).
- `npm run validate` now fails (exit 1) on any ✗ — a red validator is no
  longer ignorable, by design.
- `scripts/handoff-to-json.py` covers EU, NZ and AU; add new branch folders
  to its `BRANCHES` list when a new galaxy opens.
