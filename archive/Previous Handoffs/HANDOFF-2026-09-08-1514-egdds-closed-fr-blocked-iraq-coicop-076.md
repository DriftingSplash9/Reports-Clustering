# HANDOFF — working document

**One handoff file, top level, ever.** State only — what's live, blocked,
next. Rules and traps: `PLAYBOOK.md` (core) + `PLAYBOOK-CORPUS.md` or
`PLAYBOOK-RENDER.md`. Recipes: `notes/techniques-2026-09-04.md`.
Host reachability: `notes/routing-snapshot-2026-09-04.md` (dated, expected to
be wrong). Design of the current programme: `notes/Midvamp - Revamp.md`.
Finished-round narrative: project memory and `archive/Previous Handoffs/`.

**Keep §1–§3 to state and pointers; §4 is fixed and verbatim.** No changelog, no
round narrative. Finished items LEAVE (§4 step 4); the round's memory entry is their
record. *(This paragraph read "Keep the mutable part (§1–§3) under 10k characters"
until 2026-09-07. That cap was retired by Thomas in §1 on the same day this line was
written, and the two sat contradicting each other for three rounds. The gauge is the
read-cost percentage in §1, not a character count.)*

Last updated: 2026-09-08 ~05:20 UTC (still handoff 075 — §2/§3 edited in place for
rounds 9 through 24; not a new handoff under §4, no archive)

---

## 1. Read next

**The project's only read order — `PLAYBOOK.md` §1 and `REPORTS.md`'s 🛑 block
point here.** This file first, then `PLAYBOOK.md` in full — it is short and
routes you to one lane playbook. Then, **routed by what you are doing**:

| doing | read |
|---|---|
| anything | `PLAYBOOK.md` — short, binds every task, and its §1 hands you the one lane playbook (CORPUS or RENDER) |
| fetching / capturing / extracting | `notes/techniques-2026-09-04.md` — recipes, the Eurostat metadata filenames, host workarounds, and the dated routing snapshot it now carries. **Every host reading in it is a claim about one machine on one day: re-probe, never believe it.** |
| **anything touching the grader** | `notes/grader-rulings-round-2026-09-05.md`, then memory `esms_hicp_pass_2026-09-05` (acronym rule), `cjk_span_floor_2026-09-05`, `quote_guard_round_2026-09-05`, `round5_little_things_paused_2026-09-06` (product-number path) and `third_pdf_rendering_2026-09-06` (three renderings) · `round6_rulings_2026-09-06` |
| corpus scope or direction | `REPORTS.md` from "🛑 Agent: read this"; memory `regroup_rulings_2026-09-05` |
| the current programme | `notes/Midvamp - Revamp.md` (plan of record) |
| a research slice's `meta.note` from the August 2026 import | `notes/mint-2026-08-20.md` |
| Eurostat metadata / EU price-index / HBS chains | memory `layout_levers_and_hbs_2026-09-05`, `esms_hicp_pass_2026-09-05`, `eu_national_chains_2026-08-28` |
| anything IMF | `notes/imf-dsbb-2026-09-06.md` (dsbb REST API), `notes/imf-elibrary-2026-09-06.md` (books, flagships, and both 2026-09-06 addenda — the second corrects the first) |
| **anything in the renderer** | `PLAYBOOK-RENDER.md` §3–§4 first — it routes the lane. Then the round memory for your bit: `node_instancing_2026-09-05` / `link_batching_2026-09-05` (draw path), `layout_levers_and_hbs_2026-09-05` + `settle_time_tick_burst_2026-09-05` (forces), `fit_percentile_and_tier1_2026-09-06` (camera fit), `condensed_int_and_rulings_2026-09-05` (INT fold). Instruments: `scripts/measure-forces.ts`, `scripts/renderer/`. |
| "what is still broken that nobody is fixing?" | `notes/standing-issues.md` — items that outlived five handoffs; not on the mandatory read path |
| **editing any doc in the slow layer** | `notes/doc-audit-2026-09-07.md` — the first slow-layer audit: every root `.md` section by section, EDIT/DROP/KEEP/MOVE with the exact text. Read it before rewriting a playbook paragraph |
| regions · compare/path · schema | `src/lib/regions.ts`, `Compare.tsx`, `src/lib/types.ts` file comments |
| orientation for a human | `START-HERE.md` — rendered in-app as Help ▸ What this is; editing it edits the product |

Then `REPORTS.md` from *The one-line version* for scope, and project memory,
newest first. Project instructions and memory are summaries written outside the
repo: where either disagrees with a file, the file wins.

**Read cost, refreshed every handoff** (§4 step 6) — this is the bloat gauge:

| file | k | who reads it |
|---|---|---|
| `HANDOFF.md` | 27.3k | everyone, first |
| `CLAUDE.md` | 1.5k | a local Claude Code session, automatically |
| `PLAYBOOK.md` | 8.9k | everyone |
| `PLAYBOOK-CORPUS.md` | 44.4k | corpus lane — §7 splits 7a/7b/7c by question |
| `PLAYBOOK-RENDER.md` | 13.6k | renderer lane |
| `REPORTS.md` | 24.3k | scope/direction questions |
| `START-HERE.md` | 13.2k | humans, not agents |
| **a corpus round reads** | **82.1k** | HANDOFF + CLAUDE + core + CORPUS |
| **a renderer round reads** | **51.3k** | HANDOFF + CLAUDE + core + RENDER |

**THE NUMBER THOMAS ASKED FOR (refreshed 2026-09-07, round 14): before he types a
prompt, a corpus round is required to read 10.3% of its context, a renderer round 6.4%.**
That is the mandatory read above as tokens (chars ÷ 4) over a 200k-token window — 20.5k
and 12.8k tokens respectively. **Both moved DOWN this round** — 10.4% → 10.3% and
6.6% → 6.4% — the first drop since the table started: round 14's §2/§3 edit condensed
round 13's now-closed FR narrative (three left-open leads, all resolved or refined) rather
than appending to it, `HANDOFF.md` 28.5k → 27.3k. Neither playbook nor `REPORTS.md`
changed this round. **Refresh both percentages every handoff along with the
table**, and state the denominator, because the point of the number is the trend and not
the value.

**This measures attention, not budget.** A single `get_page_text` on one large page
cost more than this whole table in round 8. What the read buys or wastes is the
reader's attention before any work starts, and a paragraph nobody has acted on in
five rounds costs that whether or not the file is large.

**The 10k cap on §1-§3 is retired; the percentage above replaces it** (Thomas,
2026-09-07). A character cap could not see the rest of the read path and a round
would trim §2 while `PLAYBOOK-CORPUS.md` grew unwatched. Keep §1-§3 to state and
pointers — the narrative is in project memory — and let the two percentages be the
thing that gets defended.

---

## 2. Current state

Corpus **3,588 reports / 3,153 dependencies**. **1,141 A · 1,400 B · 612 C**, A-share
36.2%. **Domains: 46 approved, 0 proposed.** `validate` exits 0, **128/128 logic tests**,
`tsc --noEmit` clean, `vite build` ok,
`public/corpus-data.json` regenerated and copied back, current as of 2026-09-08
~05:20 UTC. **979 nodes still have zero edges** — down 1 this round (`iq-cpi` wired; see
below); the one relation-only node round 14 minted, expected by construction (relations
never reach `buildGraph`), not a defect.

**Round 24 (this round) picked up the standing "five orphaned NSO nodes" lead (round 7,
§3 below) and only partially closed it.** Wired `iq-cpi -> un-coicop-2018` (B):
Iraq's COSIT, in its own May 2018 CPI bulletin, names COICOP directly ("distributed on
12 divisions according to Classification Of Individual Consumption by Purpose briefly
COICOP") — quote raw-verified fresh via `pdftotext -layout` against a new download, not
carried over from the round that first found it. **This edge had already been found once
and left `_dropped` `deferred`** in `candidates-tier-wiring-2026-08-28.json` as a
"MODELLING QUESTION FOR THOMAS" (no COICOP revision stated, and a 2018 bulletin on a
2012 base is more likely pre-2018-vintage than the edition released that same year; Iran
has the identical unresolved question on `ir-national-accounts`, still open). **Nobody
ever ruled it, but two later rounds answered it in practice anyway** —
`ma-cpi-social-protection.json` and `tn-cpi-social-protection.json` both wired their own
generic-COICOP citations to `un-coicop-2018` with a vintage caveat and a capped grade
(C, B) rather than leave them parked. Applied that same precedent to Iraq. **If Thomas
disagrees with generalising it into a rule, Morocco/Tunisia/Iraq should be revisited
together, not Iraq alone.**

**`iq-cso` itself — the node round 7 actually named — is still isolated, and the reason
looks structural, not evidential.** `iq-cso` (minted in the round-7-era
`crossborder-standards-2026-08-22.json` batch as a generic institutional-core stub) and
`iq-cpi`/`iq-national-accounts`/`iq-population` (older, August-2026-import nodes) are
BOTH publisher-attributed to "Central Statistical Organization" — the same real agency,
under different node ids, with no `part_of` link between them. No document will ever
land on `iq-cso` specifically while COSIT's actual output already lives under those
other ids. This reads as an unrecognised duplicate between two import batches, not a
research gap — flagged in §3 [Thomas] rather than merged unilaterally. **Worth checking
whether the other four orphaned nodes (`sd-cbs`, `ye-cso`, `sy-cbs`, `ir-sci`) have the
same shape before researching each as a clean slate.** Sudan, Yemen and Syria got no
research attention this round; their own agency sites are flagged stale/compromised/
parked in their own node descriptions, so the DSBB DQAF country-page route
(`dsbb.imf.org/<tier>/dqaf-base/country/<ISO3>/category/<code>`, found this round via
web search off a Japan example, not yet fetched for any of these five) is probably
faster than their own domains. Full narrative: memory
`round_orphaned_nso_iq_coicop_2026-09-08`.

**FR: three rounds in (global rounds 13-15). Round 15 (FR round 3, this round) opened a
different shape of lead than rounds 13-14's GNI-inventory-chapter method:** it minted
**fr-insee-note-de-conjoncture** (INSEE's own quarterly economic-outlook report, not
previously in the corpus at all) and **fr-dgddi-chiffre-commerce-exterieur** (DGDDI/DSECE's
quarterly trade-analysis series, "Le chiffre du commerce extérieur"), wiring one
**A**-graded edge between them: INSEE's own December 2025 Note de conjoncture footnotes a
specific trade-deficit figure to DGDDI's Q3 2025 bulletin, and its own Bibliographie
resolves that citation to the artefact BY FULL TITLE — the exact bar rounds 13-14 could not
clear (both found only generic "customs data" statements). Graded via the caption/table-cell
disclosure ruling (PLAYBOOK-CORPUS.md §7a): a citation whose whole purpose is source
disclosure names the artefact, same as a chart caption. **This is a DIFFERENT DGDDI
artefact than the standing lead's target** — the quarterly analysis series, not the monthly
press release ("Résultats du commerce extérieur"). Graded and validated in a cloud sandbox:
128/128 logic, tsc clean, `validate` exit 0, counts moved by exactly +2 reports/+1
dependency/+1 A as expected. Full narrative: memory `round15_fr_note_de_conjoncture_2026-09-07`.

**Round 16 (this round) tried the monthly bulletin again and it is STILL refused — no data
changed, counts unchanged from round 15.** Four more candidate document classes checked
(Trésor's own same-titled annual commentary, Banque de France's annual BoP report, two more
INSEE Note/Point de conjoncture editions, INSEE's Comptes de la Nation chapter and TEF page)
and every one attributes trade-in-goods figures to the AGENCY ("Douanes / DSECE") in a chart
caption, never to the specific monthly release by title — same wall as rounds 1-2, now hit
from six candidate-document angles across four rounds. **This looks structural rather than
under-searched**: nobody found this specific title cited anywhere except DGDDI's own pages.
Flagged in [Thomas] below rather than re-run a fifth time. Full narrative: memory
`round16_fr_dgddi_monthly_still_refused_2026-09-07`.

**Round 17 (this round, no data changed) executed and CLOSED the standing "stale-cache B
sweep" todo** (opened round 11): only three live edges corpus-wide carried the flagged grade
reasons, all in the NSDP block (`sv-nsdp`, `kg-nsdp`, `mx-nsdp -> imf-sdds`), and a fresh
`--refetch` in a clean sandbox reproduced B on all three exactly — the pages genuinely name
the DSBB, not SDDS, within reach of the self-declaration quote. Nothing written. See §3 for
the todo item removed and memory `round17_stale_cache_b_sweep_2026-09-07`.

**Round 18 (this round) closed the standing "India's NSDP, from a new direction" todo**
(open since round 9): `dea.gov.in`'s NSDP URL is confirmed dead again, from a fifth and
sixth network, in a genuinely different failure mode than earlier rounds (connection
reset / connection refused, not a cert or bot-wall problem) — WebFetch alone returned
content for it, raw-verification failed on both available networks, and the returned text
named neither the IMF nor SDDS anyway, so the URL was correctly abandoned rather than
retried again. India's NSDP is wired instead off RBI's own current pages: `in-nsdp`
(RBI's `BS_NSDPDisplay.aspx`, live data dated September 2026) `-> imf-sdds`, evidenced off
the companion `SDDSview.aspx` page, deliberately choosing its two-sentence self-declaration
over the NSDP page's own table headings to avoid repeating round 17's B-grade trap (target
name too far from the declaration). Graded **A `quote-found-artefact-named` at coverage
1.00** on the first attempt. Validated in a cloud sandbox: 128/128 logic, tsc clean,
`validate` exit 0, counts moved by exactly +1 report/+1 dependency/+1 A as expected. Full
narrative: memory `round18_india_nsdp_2026-09-07`.

**Round 19 (this round) advanced the e-GDDS tier finding: Botswana wired, Tanzania still
open.** `int-imf-tier-sweep-2026-09-07.json`'s _dropped named Botswana and Tanzania as the
two most valuable of 34 e-GDDS participants with a real NSDP and no institutional node
(no `NSDPUrl` exists for e-GDDS rows on the IMF endpoint, unlike SDDS/SDDS Plus). Minted
**bw-nsdp** off the Bank of Botswana's own NSDP page — a single self-contained page that
both explains the NSDP and states directly it is implemented under the IMF's e-GDDS,
naming Botswana as the first country to adopt the enhanced format — wired
`bw-nsdp -> imf-e-gdds`, graded **A `quote-found-artefact-named` at coverage 1.00** on
the first attempt. This is additive to the existing `bw-statsbots-cpi-technical-report-2018
-> imf-sdds` edge (round 7, grade B, correctly left alone — a 2018 CPI-methodology claim,
not a subscription claim). **Tanzania NOT wired**: NBS Tanzania's own site labels its NSDP
link "e-GDDS" in its main nav, but that's a bare label with no declarative sentence: too
thin to grade. Four IMF DSBB routes for a fallback REGISTER-tier citation all returned
the known Angular-shell chrome (PLAYBOOK-CORPUS.md §6) or a bare 400; the IMF's 2016 press
release announcing Tanzania's e-GDDS status is Akamai-blocked (403) on two user agents.
Left open with a documented lead (an unopened 2013 NSDP prototype PDF, probably too dated
to use) in this round's own `_dropped`. Validated in a cloud sandbox: 128/128 logic, tsc
clean, `validate` exit 0, counts moved by exactly +1 report/+1 dependency/+1 A as expected.
Full narrative: memory `round19_bw_nsdp_2026-09-07`.

**Round 20 (this round) closed BOTH of the two remaining leads flagged by round 19 — Tanzania wired, and Côte d'Ivoire wired too (a lead round 19 didn't even try).** For Tanzania: the IMF's own 2016 press release (imf.org/en/news/articles/2016/11/23/pr16524-...), which 403'd Akamai to curl in round 19, reads cleanly in Thomas's Chrome and names Tanzania's NSDP directly — but the page it links to has moved; the CURRENT NSDP page (nso-tanzania.opendataforafrica.org/yolzjif/national-summary-data-page-nsdp) is also Cloudflare-walled to curl (same class as bw-nsdp's linked opendataforafrica.org page) but reads cleanly in Chrome, and its own text — self-declared on NBS Tanzania's behalf — states Tanzania participates in the enhanced GDDS. Preferred over the IMF press release per rule 19 (self-declared beats register when both would grade the same). The 2013 prototype PDF round 19 flagged as an unopened lead was opened and confirmed a dead end exactly as suspected: no mention of e-GDDS, Enhanced, or dissemination anywhere in it. **Wired `tz-nsdp -> imf-e-gdds`, graded A on the first attempt.** For Côte d'Ivoire: a web search for the same opendataforafrica.org platform found nso-cotedivoire.opendataforafrica.org directly — same publisher (ANStat) already in the corpus for `ci-anstat-ihpc`, same wall class (403 to curl, clean in Chrome), same self-declaration template naming Côte d'Ivoire and e-GDDS by name. **Wired `ci-nsdp -> imf-e-gdds`, graded A on the first attempt.** **Generalizable finding for future rounds: the opendataforafrica.org NSDP template ("Data linked from this page correspond to data described in the International Monetary Fund's DSBB...") is shared across countries on the platform** — Botswana's own site used a different page instead because its opendataforafrica.org page was actually 403'd everywhere including Chrome, but Tanzania's and Côte d'Ivoire's were not. **Try each remaining unwired e-GDDS country's own `<nso-slug>.opendataforafrica.org` NSDP page in Chrome BEFORE spending a round on IMF press releases or DSBB routes** — a plain web search for "<country> opendataforafrica NSDP" finds the slug fast. Validated in a cloud sandbox: 128/128 logic, tsc clean, `validate` exit 0, grader selftest 76/76, `vite build` ok, counts moved by exactly +2 reports/+2 dependencies/+2 A as expected. Full narrative: memory `round20_tz_ci_nsdp_2026-09-08`.

**Round 21 (this round) generalised the e-GDDS/opendataforafrica.org method across the whole remaining list at once, instead of one country per round: 18 of the 31 still-open countries wired in a single pass.** Ran `<country> opendataforafrica NSDP` via WebSearch for all 31, then read each hit in Chrome. Wired at A (SELF-DECLARED, `quote-found-artefact-named`, coverage 1.00): Benin, Madagascar, Zambia, Zimbabwe, Lesotho, Mozambique, Malawi, Cameroon, Angola, Cabo Verde, Gambia, Equatorial Guinea, DR Congo, Eswatini, Guinea-Bissau, Mauritania, São Tomé and Príncipe, Somalia — all `<cc>-nsdp -> imf-e-gdds`, all off the identical platform boilerplate ("Data linked from this page correspond to data described in the International Monetary Fund's DSBB... the enhanced General Data Dissemination System in which <Country> participates") that rounds 19-20 established. Every quote was read via the browser's accessibility tree (`read_page`), not transcribed from a screenshot, specifically against the ASCII-vs-typographic-apostrophe trap (PLAYBOOK-CORPUS.md Known Traps) — confirmed U+2019 in "Fund's" on one page and trusted the identical template elsewhere. Publisher attribution: 13 of the 18 confirmed directly (7 name the agency in the page's own title — same shape as bw-nsdp/tz-nsdp/ci-nsdp; 6 more confirmed via the portal's own footer link to the NSO's site, e.g. Madagascar→instat.mg, Angola→ine.gov.ao). The remaining 3 (Guinea-Bissau, Mauritania, Somalia) carry only generic AfDB/Knoema footer links — publisher field follows the NSO name already established elsewhere in-corpus for that country but was **not** independently re-confirmed on the NSDP page itself; flagged in each report's own description, does not affect the grade (rule 19's Togo precedent — a country's own branded data portal on opendataforafrica.org is self-declared regardless of which footer logo appears). Four countries checked and found to have **no live NSDP page on this platform**: Burundi, Djibouti, Guinea (nav has no NSDP tab on any of the three), Central African Republic (no opendataforafrica.org portal exists at all) — recorded in `_dropped`, open leads via a different route. Seven not checked this round (Andorra, Albania, Micronesia, Montenegro, Palau, San Marino, Kosovo) — opendataforafrica.org looks Africa-only on this round's evidence (34/34 countries tried so far have been African), so these are deprioritized for the same platform and would need IMF press release / DSBB instead. All 18 new ids and evidence URLs checked for collision against the whole corpus before writing — none found. Data: `src/data/research/int-imf-egdds-oda-round21-2026-09-08.json`. Also ran the automated grader against all 18 (`--refetch`, live and `--offline`): the cloud sandbox cannot reach any of the 18 URLs either (`wall:cloudflare-challenge` on all 18, same class as bw-nsdp/tz-nsdp/ci-nsdp) — confirms these needed the Chrome route rather than disagreeing with it, per PLAYBOOK-CORPUS.md §7b's exception (grader ruling only overrides where its fetcher succeeds and disagrees, not where it can't fetch at all). The 18 evidence-cache/ wall records from that run are committed. Validated in a cloud sandbox: 128/128 logic, tsc clean, `validate` exit 0, counts moved by exactly +18 reports/+18 dependencies/+18 A as expected, no evidence-quality warning on any of the 18 new URLs. Full narrative: memory `round21_egdds_oda_sweep_2026-09-08`.

**Round 22 (this round) closed all four of round 21's e-GDDS "group 1" leads: Burundi, Djibouti, Guinea and Central African Republic all wired.** Round 21 recorded these four as having no live NSDP page reachable from their opendataforafrica.org portal's own navigation (and, for CAR, no portal at all under the slug it tried, `centrafrique.opendataforafrica.org`). The fix was the same for all four: the IMF's own press release announcing each country's e-GDDS implementation (found via WebSearch, read in Chrome since `www.imf.org` 403s to curl per `notes/imf-dsbb-2026-09-06.md`) links directly to the country's real NSDP page, which exists at a URL the portal's nav does not surface — Burundi at a random slug, Djibouti and Guinea at a short `/nsdp` path, and CAR under the slug `car` rather than `centrafrique`. All four NSDP pages carry the identical self-declared boilerplate rounds 19-21 established ("Data linked from this page correspond to data described in the International Monetary Fund's DSBB..."), all four graded **A** on the first attempt: `bi-nsdp -> imf-e-gdds`, `dj-nsdp -> imf-e-gdds`, `gn-nsdp -> imf-e-gdds`, `cf-nsdp -> imf-e-gdds`. Publisher confirmed directly on the page for Djibouti (INSTAD, footer copyright line) and Guinea (footer links to stat-guinee.org/mef.gov.gn/bcrg-guinee.org, matching the IMF press release's own list of data producers); for Burundi and CAR the publisher follows the IMF press release rather than the NSDP page's own footer (Burundi: ISTEEBU, now rebranded INSBU per the corpus's own bi-insbu-cpi node; CAR: ICASEES) — same treatment as round 21's Guinea-Bissau/Mauritania/Somalia, does not affect the grade. **Generalisable finding: when a country's opendataforafrica.org portal has no visible NSDP tab, check the IMF's own e-GDDS launch press release before concluding no page exists — it typically links straight to it.** Data: `src/data/research/int-imf-egdds-oda-group1-2026-09-08.json`; round 21's own `_dropped` entry for these four countries rewritten in place as four resolved entries in `int-imf-egdds-oda-round21-2026-09-08.json`. **Also found while reconciling the count: round 21's own group-1/group-2 write-up named only 11 of the 13 countries it said remained (4 + 7) — Guyana and Serbia are on the original 34-country list (`int-imf-tier-sweep-2026-09-07.json`'s `_dropped`) but appear in neither group.** Not investigated this round; folded into the remaining-count below rather than silently carried forward. Validated in a cloud sandbox: 128/128 logic, tsc clean, `validate` exit 0, `vite build` ok, counts moved by exactly +4 reports/+4 dependencies/+4 A as expected, no evidence-quality warning on any of the four new URLs. Full narrative: memory `round22_egdds_group1_2026-09-08`.

**Round 23 (this round) closed the e-GDDS wiring todo entirely: the remaining 9 countries all wired** (round 21's 7-country "not checked this round" bundle — Andorra, Albania, Micronesia, Montenegro, Palau, San Marino, Kosovo — plus Guyana and Serbia, the 2 round 21 miscounted and never listed at all). Method changed from round 22's per-country press-release search: the IMF's own DSBB e-GDDS country-category page (`dsbb.imf.org/e-gdds/country/<ISO3>/category`), rendered in Chrome, carries a hidden global country-to-NSDP-URL link list — found by querying all outbound `<a>` tags via `javascript_tool` rather than reading the page's visible text (which only shows the active country's own category rows) — and it gave a registered NSDP URL for all 9 countries from one page load. 7 of the 9 registered destinations were live, self-declared pages on the country's own domain, graded **A**: `al-nsdp`, `me-nsdp`, `pw-nsdp`, `rs-nsdp`, `sm-nsdp`, `xk-nsdp`, `gy-nsdp -> imf-e-gdds`. The other 2 (Andorra, Micronesia) have registered destinations that are unreadable for different reasons — Andorra's (an ArcGIS Hub SPA) renders to nav+contact only with zero "gdds" hits anywhere in the 442KB rendered DOM; Micronesia's has an expired TLS certificate (confirmed via WebFetch's own robots.txt probe), and its press-release-given alternate URL also fails to load — so both wired instead as **REGISTER**-tier edges off the IMF's own press release for that country (PLAYBOOK-CORPUS.md rule 19: a document published by the TARGET's own publisher recording the relationship is REGISTER, not THIRD-PARTY, and grades on the same A/B/C rules — both grade **A** here, full press release read, target named by verbatim quote): `ad-nsdp`, `fm-nsdp -> imf-e-gdds`. Two character-level findings across the 7 self-declared pages: the shared NSDP template has an unsubstituted-placeholder bug — "...in which Country participates", literally — present on San Marino/Montenegro/Albania/Serbia's own copies (4 of 7, so a platform-wide defect, confirmed independently of round 21's opendataforafrica.org boilerplate, which does not share this bug); Serbia's page additionally bakes a Unicode replacement character (U+FFFD) into the apostrophe position in its raw HTML, and San Marino's uses a plain ASCII apostrophe where every other page in the batch uses the typographic one — every quote was cut or transcribed to avoid or exactly match its own page's defect, never silently "fixed". Two of the nine country codes (AD, SM) had no existing corpus node at all and were missing `COUNTRY_FAMILY`/`COUNTRY_LABEL` (`palette.ts`) and `CONTINENT_OF` (`regions.ts`) entries — both added this round (`XEU` family, Europe continent, alongside LI/CH's non-EU-European-microstate precedent); the other 7 already had live nodes and needed no classification changes. Data: `src/data/research/int-imf-egdds-oda-group2-2026-09-08.json`; round 21's own bundled 7-country `_dropped` entry rewritten in place as 7 resolved entries in `int-imf-egdds-oda-round21-2026-09-08.json`. No id or evidence-URL collision against the whole corpus for any of the 9 new nodes or URLs (checked before writing). Validated in a cloud sandbox: 128/128 logic, tsc clean, `validate` exit 0, `vite build` ok, counts moved by exactly +9 reports/+9 dependencies/+9 A as expected, no evidence-quality warning on any of the nine new URLs. **This closes the e-GDDS wiring todo — all 34 of round 21's original list are now wired** (25 round 21 itself + 4 round 22 + 9 round 23: 32 self-declared, 2 register). Full narrative: memory `round23_egdds_remaining9_2026-09-08`.

Round 13 (first FR round) wired 9 nodes/9 edges off France's own GNI inventory
(INSEE, "Gross National Income Inventory 2010, France - ESA 2010", March 2020, 438pp),
Chapter 10 "MAIN DATA SOURCES USED" plus General Government data-sources (3.5.1.1), all
`fr-insee-national-accounts -> X uses_data_from`, all A. FR now has **20 nodes**, from 9 at
the start of round 13. Full narrative: memory `round13_fr_national_core_2026-09-07` and
`round14_fr_national_core_round2_2026-09-07`.

**Round 14 (this round) closed two of the three leads and refined the third.** BTS
minted and wired to DADS by a `supersedes` **relation** (not a dependency edge — the
2010-benchmark inventory cannot name a 2017-vintage source, and inventing one anyway would
be exactly the no-document-no-edge violation the corpus polices), direction confirmed
against every other live `supersedes` pair in the corpus (newer → older). The second SIES
R&D survey (associations/GIP) wired at A, off a Chapter 10.1.4 table row round 13 had only
paraphrased — round 14 downloaded the actual inventory PDF fresh (`curl` + `pdftotext
-layout` on the device; **WebFetch truncates this 438pp PDF well before page 404 and
cannot reach Chapter 10 at all**, three tries, none got there) and read the row verbatim.
**DGDDI's foreign-trade bulletin is still refused, agency-not-artefact** — two new
self-declared candidate documents found (DSECE's own "missions" page, INSEE's Courrier des
statistiques article) both state usage but neither names the bulletin by title; both
candidate classes are now spent, recorded in the round-14 slice's `_dropped` so a third
round doesn't retread them. Chapters 3.4.1/5.8.2/5.11.2, flagged "worth a skim" by round
13, read in full this round and confirmed empty (Regafi register + agency-level mentions;
Nielsen/GfK private panels, out of scope; Esane/DGFiP repeats) — closed for good barring a
newer inventory edition. **The GNI inventory PDF now backs 10 edges** (rule 11: any live
grader run on it must select all ten at once).

**THE GERMAN GNI INVENTORY IS SPENT, and that is the state to carry forward.** Chapters
10.1 and 10.2 are both closed. Round 11 wired 21 of Chapter 10.1's 37 open rows; Thomas
ruled the remaining 16 are not worth pursuing and they are closed, not open. Round 12 read
Chapter 10.2's full 16-row table and closed it: **5 wired, 3 already settled, 8 refused
with reasons** in `de-national-core-round5-2026-09-07.json`'s `_dropped`. Every one of the
26 edges the two rounds minted graded **A `quote-found-artefact-named` at coverage 1.00**.
DE now has **46 nodes**, from 13 at the start of the session. **Only Chapter 10.3 (7
non-government sources) is untouched**, and it is a scope question before an evidence one
— several members are private bodies.

**The Chapter 10.2 finding, which is a process lesson and not a German one:**
`de-destatis-source-surveys.json`'s 10.2 note has been the worklist since 2026-08-05. It
named nine of the sixteen rows and called the rest "mostly named by institution rather
than by a titled recurring publication" — fair, and it hid the two best rows in the
chapter. Row 15 (the annual report of the gambling supervisory authorities of the federal
states) and row 16 (the Federal Ministry of Finance's **AfA depreciation tables**, named
four separate times in the body) are the cleanest artefact citations in Chapter 10.2 and
neither appeared in the note. Rounds 10 and 11 both treated that note as the worklist
without opening the table. **Read the source table, not the note about it** — round 10
reached the same conclusion by a different route.

**The refusals are the other half of round 12's output and they are recorded in full.**
The BaFin rows are the strongest refusal available: ¶3.369 says what the accounts use is
the regulatory forms insurers file under BerVersV/BerPensV, "made available to the Federal
Statistical Office by the Federal Financial Supervisory Authority (BaFin) as so-called
internal accounting documents" — not a publication, so rule 2 refuses it however good the
usage evidence is. KBA, Bundesnetzagentur and the Pfandkreditgewerbe go on
agency-not-artefact; Bundesbank rows 8/10/11 are table-only and closed under Thomas's
ruling. **KBA is the one worth reopening some day**, and the note says how: mint KBA's own
Neuzulassungen and Besitzumschreibungen from KBA's pages FIRST, then wire the inventory to
them — not by inventing an English title to satisfy the run rule.

**A B that was never the document's fault:
`de-destatis-national-accounts -> de-bundesbank-balance-of-payments` moved B → A** in
round 11, under `PLAYBOOK-CORPUS.md` §7b's improvements-only rule, with nothing changed in
the matcher. Round 2 graded it B `artefact-named-elsewhere-in-document` earlier the same
day; re-graded from a FRESH fetch it returns A at coverage 1.00, because the occurrence the
fresh run anchored on sits beside a bulleted source list printing "Balance of payments
statistics" UNHYPHENATED. Round 2's store carried no `pdftotext-flow` third rendering
(`PLAYBOOK-CORPUS.md` §6), so it never had that span. **Nothing distinguishes it from any
other B graded off a pre-2026-09-06 store** — see §3, [Agent].

**The GNI inventory PDF now stands behind 35 edges**, and validate's "URLs behind 10+
edges" list names it first. It names all thirty-five and is not an index — but rule 11's
evidence-URL clause bites hard: **any grader run touching that URL must select all
thirty-five at once**, or it destroys the other edges' committed windows. The selection is
kept, current, at `Claude outputs/grade-de-gni-2026-09-07.json#gni_inventory_all`. Round 11
found the Bundesbank re-grade above only because selecting the whole URL surfaces other
rounds' mistakes for free.

**The NSDP block is done: 72 nodes, 73 edges** —
`src/data/research/int-imf-nsdp-2026-09-07.json`, narrative in memory
`round8_nsdp_block_2026-09-07` and `round9_todo_cleared_2026-09-07`. **India is still dark
and it was never a permissions problem**: dea.gov.in timed out from Thomas's own Chrome, a
fourth network and a fourth failure mode, so the lead is finding India's NSDP off
mospi.gov.in or rbi.org.in rather than retrying that URL. Seven of the 81 remain unwired,
all refused on evidence or host, with reasons in the block's own `_dropped`.

**The first slow-layer sweep is done and executed** — all 25 items from
`notes/doc-audit-2026-09-07.md` landed (7 edits, 4 moves, 3 drops, 4 additions).
Handoffs are numbered from that same round (74 archived files stamped `-001` to `-074`);
this file archives as **075** when it is next replaced wholesale, and §2/§3 have now been
edited in place for rounds 9 through 14 without an archive, which §4 permits.

---

## 3. Todo (live items only)

### [Thomas]

**1. Was every-20 right for the slow sweep?** The first pass found seven defects and
the oldest had been wrong for about three weeks. That is the only data point there
is; step 5b asks the question again at handoff 100 and the answer should get better
with a second reading.

**2. Is the DGDDI monthly bulletin lead worth a fifth round?** Four rounds (1, 2, 16, plus
round 15's adjacent search) have now checked six different candidate document classes for
something naming DGDDI's monthly "Résultats du commerce extérieur" bulletin BY TITLE
alongside a usage statement, and every one — including Trésor's own confusingly-same-titled
annual commentary and Banque de France's annual balance-of-payments report — cites the
AGENCY ("Douanes / DSECE") rather than the specific release. This may just be how French
official documents cite customs data (title only appears on DGDDI's own pages). One class
is untried (a press article quoting the release by name) if it's worth a fifth round;
otherwise this is a candidate for a permanent refusal alongside PLAYBOOK-CORPUS.md §7's
other agency-not-artefact rulings. Detail: memory `round16_fr_dgddi_monthly_still_refused_2026-09-07`.

**3. Is `iq-cso` a duplicate of `iq-cpi`/`iq-national-accounts`/`iq-population`, and if so,
which id survives?** Round 24 found these four nodes all publisher-attributed to "Central
Statistical Organization" (Iraq's real statistical agency, COSIT) with no `part_of` link
between them — `iq-cso` from the round-7-era institutional-core batch
(`crossborder-standards-2026-08-22.json`), the other three from the older August-2026
country import. No document will ever land ON `iq-cso` specifically while COSIT's actual
output already lives under the other three ids; it looks structurally orphaned rather than
under-researched. Retiring or merging a node is a ruling (§7c), not a research call —
flagged rather than merged unilaterally. **If this shape is real, it may also explain some
or all of the other four orphaned NSO nodes** (`sd-cbs`, `ye-cso`, `sy-cbs`, `ir-sci`) —
worth checking each against its country's other existing nodes before spending a round
researching it as a clean slate. Detail: memory `round_orphaned_nso_iq_coicop_2026-09-08`.

**4. Generalise the COICOP-with-no-stated-revision precedent into a rule, or reconsider
it?** `ma-hcp-ipc`, `tn-ins-cpi` and now `iq-cpi` all cite bare "COICOP" with no revision
year and are wired to `un-coicop-2018` anyway, with a vintage caveat and a capped grade —
a practice three separate rounds converged on without Thomas ever ruling on it (it was
raised and explicitly left as a "modelling question" in `candidates-tier-wiring-2026-08-28.json`,
for both Iraq and Iran, and nobody answered it before rounds wired around it). If this is
right, it should go in `PLAYBOOK-CORPUS.md` §7a as a named rule rather than live only as
three data points a future round has to notice and infer from. If it is wrong, Morocco,
Tunisia and Iraq's edges should be revisited together.

### [Agent]

**Continue FR.** Rounds 13-14 wired FR's Chapter 10 "MAIN DATA SOURCES USED", the General
Government data-sources section (3.5.1.1), the second SIES R&D survey and a BTS/DADS
succession relation — 11 nodes, 10 edges + 1 relation, all A. Round 15 (FR round 3) tried a
different shape entirely — not the GNI-inventory chapter method, but searching for an
INSEE/Banque de France document whose OWN bibliography names a DGDDI product by title —
and it worked: `fr-insee-note-de-conjoncture -> fr-dgddi-chiffre-commerce-exterieur`, A,
off INSEE's December 2025 Note de conjoncture. Method in memory
`round13_fr_national_core_2026-09-07`, `round14_fr_national_core_round2_2026-09-07` and
`round15_fr_note_de_conjoncture_2026-09-07`, and for the GNI-chapter shape that worked seven
times running (DE x5, FR x2), `round11_de_chapter10_2026-09-07`: find the country's own GNI
or national-accounts inventory, read its source chapter's BODY for sentences that name a
source by title and say what the accounts do with it, simulate `namesTarget` before
choosing node titles, verify each title against the publisher's own page, then grade the
whole evidence URL at once.
**Left in FR for the next round:** (a) DGDDI's own MONTHLY foreign-trade bulletin
("Résultats du commerce extérieur") — still refused after FOUR rounds now (round 16 spent
four more candidate classes: Trésor's own same-titled annual commentary, Banque de France's
annual BoP report, two more INSEE conjoncture editions, INSEE's Comptes de la Nation chapter
and TEF page — every one names the AGENCY, "Douanes / DSECE", never the titled release).
**Six candidate document classes are now spent across rounds 1, 2 and 16** — see memory
`round16_fr_dgddi_monthly_still_refused_2026-09-07` for the full list, and do not re-read
any of them. One class genuinely untried: a press article (Les Echos/La Tribune/Le Monde)
quoting the monthly release by name when reporting a month's trade figures — worth one more
round only if Thomas wants this pursued past what §3 [Thomas] flags below. (b) chapters
3.4/5.8/5.11 confirmed empty round 14, do not re-read them barring a newer inventory
edition. **Round 7's five orphaned NSO nodes (Sudan, Yemen, Syria, Iraq, Iran): round 24
(§2 above) partially advanced this — Iraq's `iq-cpi` wired, but `iq-cso` itself is still
isolated and looks like a duplicate-node question, not a research gap (see §3 [Thomas]
below); Sudan/Yemen/Syria/Iran untouched.** DE remains finished as a programme (5
rounds, 13 → 46 nodes); the only German thing left is Chapter 10.3's seven non-government
sources — private bodies for the most part, so a scope question first.

**DONE — the stale-cache B sweep (round 17), do not re-run.** Round 11 found one by
accident (§2, the Bundesbank edge, already A). Round 17 grepped the WHOLE corpus for the two
reason strings this todo named and found only three other live candidates, all in
`int-imf-nsdp-2026-09-07.json` (`sv-nsdp`, `kg-nsdp`, `mx-nsdp`, none sharing a URL with any
other live edge). Re-graded all three with `--refetch` in a fresh sandbox — all three
reproduced B `artefact-named-elsewhere-in-document` exactly, at coverage 1.00. **Not a
stale-PDF issue** (all three documents are HTML, the third-rendering fix doesn't apply) —
each page's self-declaration sentence names the DSBB, never "SDDS" itself, and "SDDS" sits
outside the grader's window everywhere it appears on the page. Nothing written; nothing to
write. A fourth candidate (`ma-nsdp`) is an intentional B whose own basis says so and was not
touched. Detail: memory `round17_stale_cache_b_sweep_2026-09-07`. **A future B carrying one
of these two reasons is a NEW candidate for a future sweep, not a reason to redo this one.**

**DONE — India's NSDP (round 18), do not re-run.** `dea.gov.in`'s NSDP URL is dead from six
networks across two failure modes now — stop retrying it, barring a report the host's
routing changed. Wired instead off RBI's own current pages (`in-nsdp -> imf-sdds`, A,
coverage 1.00) in `src/data/research/in-nsdp-2026-09-07.json`. Detail: memory
`round18_india_nsdp_2026-09-07`.

**DONE — the e-GDDS tier finding, closed round 23.** All 34 of the original list wired: Botswana (round 19), Tanzania and Côte d'Ivoire (round 20), 18 more in round 21, Burundi/Djibouti/Guinea/Central African Republic in round 22, and the remaining 9 (Andorra, Albania, Micronesia, Montenegro, Palau, San Marino, Kosovo, Guyana, Serbia) in round 23 — 32 self-declared, 2 register (Andorra, Micronesia, off the IMF's own press release; their registered self-declared destinations are unreadable — a content-free ArcGIS Hub SPA and an expired TLS certificate, respectively). Publisher note, does not affect grade: three of round 21's 18 (Guinea-Bissau, Mauritania, Somalia), two of round 22's 4 (Burundi, Central African Republic) and Palau (round 23) have their publisher field set from the NSO name used elsewhere in-corpus, the IMF's own press release, or the URL path — NOT independently confirmed on the NSDP page's own footer. Detail: memory `round19_bw_nsdp_2026-09-07`, `round20_tz_ci_nsdp_2026-09-08`, `round21_egdds_oda_sweep_2026-09-08`, `round22_egdds_group1_2026-09-08`, `round23_egdds_remaining9_2026-09-08`.

**A non-ASCII-hyphen sweep, opened round 6 and STILL NOT DONE.** Any pass looking for
product numbers, section numbers or dates in an extracted document must search the hyphen
CLASS (`-`, U+2010, U+2011, en dash), never ASCII `-`; cover diacritics and HTML entities
too. Round 11 hit it again and handled it by construction rather than by luck: EVAS
71717's own title carries U+2013 in the second "double–entry" and an ASCII hyphen in the
first, so its title and quote were copied out of the extracted text programmatically
rather than retyped. **That is the technique the sweep should generalise** — never retype
a span you can copy.

**The UEMOA NCOA retarget pass, opened round 6 and deliberately not done.** Thirteen
UEMOA/CEMAC CPI edges point at `afristat-ihpc-guide-2014` or `uemoa-ihpc-note-2023`
because `afristat-ncoa-ihpc` did not exist. **Read the vintage split first** (SN, NE, CI
on NCOA 2018, correctly wired to `un-coicop-2018`); lead in the slice's `_dropped`.

**The rest of the IMF pool:** the per-country metadata seam, and the GFSR
(`notes/imf-elibrary-2026-09-06.md` has the ISBN recipe).

**Settled, do not re-raise:** **a Chapter 10 table row on its own is NOT enough to wire an
edge** — Thomas ruled 2026-09-07, closing the 16 remaining Chapter 10.1 rows and Chapter
10.2's rows 8, 10 and 11; the reasons are in the data and the class is closed, not
deferred. The three project-memory files whose FILENAMES carry the retired source's name
(`grok_archive_state`, `grok_canada_round_2026-08-25`, `grok_wiring_round_2026-08-25`) —
Thomas ruled 2026-09-07, **leave them**. A country carrying BOTH a REGISTER and a
SELF-DECLARED tier edge — both stay, ruled 2026-09-07, now in `PLAYBOOK-CORPUS.md` §7, no
dedupe pass; the `(SDDS Plus)` acronym case, fixed and measured, 12 edges moved and
nothing else can; Korea's NSDP, read in full and refused because the page never writes
"SDDS" at all; the null-ComplianceDate class; round 7's tier confirmations (Taiwan,
Mauritius); round 5's little things 1-3; the Euro Area row (not a country, placeholder
dates, refused twice); wiring a tier edge onto a single ordinary publication (the NSDP is
the exception, reason in the block's note); Estonia's NSDP, read in full and refused
because "SDDS" appears only in its URL path; the DE round-2 EVS refusal (Income and
Consumption Sample Survey — "for comparison, not calculation"); the Bundesbank Monthly and
Annual Report, investigated in DE rounds 2 and 3 and refused on the agency-not-artefact
bar; the BaFin insurance and pension rows, refused round 5 because what the accounts use is
regulatory returns held as internal accounting documents, not a publication. Older calls:
`PLAYBOOK-CORPUS.md` §7 / `PLAYBOOK-RENDER.md` §7.

---

## 4. How to hand off

**This is the only copy of this procedure — `PLAYBOOK.md` points here rather
than restating it.** Editing a line of §2/§3 during a round is not a handoff
and needs no archive. Writing a new handoff — replacing the state prose
wholesale — always does, and the test is whether the prose being replaced
would be unrecoverable afterwards, not whether §1–§4 still exist.

**Thomas asks for a handoff; the agent does all of this, in this order:**

1. Read this file first — it carries these instructions, and the state
   it describes is what you are superseding.
2. Copy it, unchanged, to `archive/Previous Handoffs/HANDOFF-YYYY-MM-DD-
   HHMM-<topic>-NNN.md` — UTC date and time, topic = what the superseded
   state was about, and **`NNN` is the handoff's number, zero-padded to
   three, one higher than the highest already in the folder**. Verify the
   copy (`sha256sum` both). The numbering was added 2026-09-07 (Thomas) so
   the review triggers in steps 5 and 5b are arithmetic anyone can check:
   `ls -1 "archive/Previous Handoffs"/HANDOFF-*-[0-9][0-9][0-9].md | wc -l`
   is the number you just stamped. The number goes at the END of the name so
   that every older reference by date-and-topic still resolves.
   **Archive first, then rewrite** — there is no git safety net (rule 1);
   an un-archived overwrite destroys the previous state. That was missed on
   2026-08-29/30: `HANDOFF.md` was overwritten three times in one session and
   archived only retrospectively, from a copy that happened to still be in
   the session's context.
3. Write the new `HANDOFF.md` at the top level, same name, overwriting.
   Edit **Current state** and **Todo** directly — overwrite, don't
   append. State only, present tense, no changelog, no "DONE" entries.
   **This file is the fast layer and is meant to turn over** — §2's
   weight follows whatever lane is actually being worked, so if the work
   moves to the renderer, the corpus paragraphs shrink to a pointer and
   the renderer ones expand, not the reverse (`PLAYBOOK.md` §1, second
   test). Keep this §4 verbatim so the next agent knows the procedure.
4. **Sweep what is finished out.** A todo that is done, a lever that is
   settled and already described in §2, a "Settled:" entry from an
   earlier round — all leave. The round's project-memory entry is their
   record, and this file is state, not history. Nothing accumulates here
   by default; if you would not act on it next session, it goes.
5. **Every fifth handoff, review the last five.** The trigger is
   arithmetic, not memory: if the number you stamped in step 2 is
   divisible by 5, run the review. Read this file's §2/§3 and the four archived
   handoffs before it, and find the paragraphs that appear in all five
   unchanged. Each one is then exactly one of three things. **Finished**
   — delete it, memory is its record (step 4 already says so, and this
   is the pass that catches what step 4 missed). **A restatement of a
   playbook or a note** — delete it and let §1 route there instead; a
   second copy of a rule is how the two drift apart. **A real open item
   nobody has acted on in five handoffs** — it goes to
   `notes/standing-issues.md`, which carries the bar in both directions.
   That is a demotion, not a deletion: it was costing every agent a read
   and buying nothing. **Introduced by Thomas, 2026-09-06**, from a
   practice that worked on another project; the first review ran the same
   day, off-cycle at 67, because §1-§3 was already over its own cap, and
   what it removed is recorded in the §1 note. If a review finds nothing
   to cut, say so and move on — "nothing" is a real answer, and forcing a
   cut to justify the pass is how good state gets destroyed.

5b. **Every twentieth handoff, sweep the SLOW layer.** Same arithmetic, a
   different divisor: if the number you stamped in step 2 is divisible by
   20, check `PLAYBOOK.md`, both lane playbooks, `REPORTS.md`, `README.md`,
   `START-HERE.md` and `notes/standing-issues.md` **against what
   `npm run validate` and the code actually say** — every count, every
   closed union, every cross-reference, every "as of", every pointer into
   `notes/` or `archive/`. Step 5 sweeps the fast layer against itself;
   nothing swept these at all until 2026-09-07, and the first hand-run pass
   found **seven live false statements** in files nobody had touched in
   weeks — a settled question still described as open, two pointers to
   things that no longer existed, three stale counts and a duplicated
   procedure that had drifted from its own original. **Correct in place and
   show the old wording**, the way `PLAYBOOK-RENDER.md`'s 2026-09-06 review
   did: a doc that quietly changes its mind is harder to trust than one that
   says what it got wrong. Record the pass in `notes/` as
   `doc-audit-<date>.md`; the first is `notes/doc-audit-2026-09-07.md` and
   it is the worked example of the format — section by section, every one
   given EDIT / DROP / KEEP / MOVE with the exact replacement text.

   **Two questions to answer explicitly in every 5b pass, in the write-up:**

   - **Should this sweep happen more or less often than every 20?** Say what
     the evidence was. Count the defects found and how old the oldest one
     was: if the oldest defect predates the previous sweep by a long way, 20
     is too slack; if the pass finds one or two trivia, it is too tight.
   - **Does Thomas want a recap of the past sweeps across the last 100
     handoffs?** Ask him, in §3, on any 5b where the archive has crossed a
     new hundred. Five sweeps' worth of findings is enough to show whether
     the same section keeps rotting, and that pattern is worth more than any
     single sweep.

   Introduced by Thomas, 2026-09-07: *"the slow layer needs swept every 20
   handoffs. do it on the 20's."*
6. **Refresh the read-cost table in §1** and repeat those numbers to
   Thomas in the handoff message — it is how he sees bloat arriving:
   `wc -c HANDOFF.md CLAUDE.md PLAYBOOK.md PLAYBOOK-CORPUS.md
   PLAYBOOK-RENDER.md REPORTS.md START-HERE.md`. *(This step ended "If §1–§3 is over
   10k, trim before adding" until 2026-09-07; that cap is retired — §1 says so — and the
   two percentages below the table are what gets defended instead. Corrected in place
   rather than left to make a future round trim §2 for no reason.)*
7. A finished round's story goes to **project memory** (write it as you
   go; if memory is down, park a note in `notes/` and say so here). A new
   standing rule or trap goes to whichever playbook binds it (`PLAYBOOK.md`
   §1 has the test). A design change goes to `notes/Midvamp - Revamp.md`
   (or `REPORTS.md` if it changes direction).
8. Never state git status here. Never delete anything on your own judgement.
   An agent may ASK for delete permission on a named folder — the user
   approves it once and it holds for the session — but the decision to
   delete is never the agent's, and without that approval the move is into
   `_to_delete/` with a line in its README.

Only one `HANDOFF.md` at the top level, ever.
