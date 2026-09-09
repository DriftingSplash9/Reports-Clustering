# The 750 DSBB SoM rows — scoping the corpus-expansion call (2026-09-09)

Measured for `HANDOFF.md` §3 [Thomas] 6, which had been carried three handoffs as
"say how thin a node may be and roughly what scale" with none of the numbers attached.
**Nothing here is a decision. It is the shape of the decision, measured, so the call can
be made without re-research.** Source: `Claude outputs/dsbb-som-import-2026-09-05-review.json`
(819 rows; 750 carry `status: no-source-node`).

## 1. Scale — 750 rows are 684 nodes, not 750

A row is one country + one DSBB category + one standard named in that category's Summary
of Methodologies. A NODE is one country + category, so rows collapse:

| | |
|---|---|
| rows (`no-source-node`) | 750 |
| distinct country+category = **nodes to mint** | **684** |
| nodes carrying exactly 1 edge | **620** |
| carrying 2 | 62 |
| carrying 3 | 2 |

Against a corpus of 3,600 nodes / 3,188 dependencies that is **+19% nodes for +23.5%
edges**, and 91% of the new nodes arrive as leaves. The corpus already has 974 zero-edge
nodes; this adds 684 one-edge nodes.

Categories: MET00 113 · NAG00 112 · IIP00 72 · BOP00 69 · IND00 63 · EXD00 59 · ILV00 46 ·
CGO00 29 · AAB00 20 · CGD00 18 · GGO00 16 · AAC00 16 · GGO10 13 · GGD00 11 · CPI00 11 ·
GGO11 7 · OFS00 5 · ILV01 2 · MET01 1 · CGD01 1.

## 2. How thin, exactly — what the source gives and what it does not

`https://dsbb.imf.org/api/report/getBaseSummaryofMethodologies?countryCode=<ISO3>&categoryCode=<CAT>`
returns the DQAF-structured methodology prose and nothing else. Five sampled fresh
2026-09-09 (MKD/NAG00, NAM/MET00, CRI/IIP00, UKR/IND00, MUS/EXD00, plus ABW/BOP00):
**6.5k–21.2k characters of prose each.** It frequently names the compiling agency in
running text ("The NSA is the custodian…", "The Central Bank of Aruba compiles…").

It **never** carries:

- a publication title — only the DSBB category label (`BOP00`, "Balance of payments")
- a landing-page URL for the actual release
- a cadence, a release calendar, or a `last_updated`
- a publisher as a field (only, sometimes, in prose)

`Report` (`src/lib/types.ts`) requires `id`, `title`, `publisher`, `country`,
`jurisdiction_level`, `region`, `description`, `releases_per_year`, `url`, `domains`,
`kind`. **So a thin mint's `title` would be an IMF category label rather than the
publication's own name, and its `url` would be the IMF API endpoint** — every one of the
684 would cite the IMF as the authority for the existence of somebody else's publication.
That is the specific way this is thinner than the rest of the corpus, which mints off the
artefact's own primary page.

Other DSBB per-category metadata (periodicity, timeliness, advance release calendar for
SDDS subscribers) is displayed by the SPA and is presumably behind a sibling endpoint.
**Not found in this pass** — `reportService` is not at the guessed path and `app-conf.min.js`
exposes only `staticcontent`, `country` and `client/log`. Worth an hour before anyone
concludes the cadence is unavailable; do not record it as unavailable on this note's say-so.

## 3. Who these countries are — mostly NOT new territory

180 countries appear. Corpus coverage of them today:

| that country's existing corpus nodes | pairs |
|---|---|
| 20+ | 131 |
| 5–19 | 306 |
| 1–4 | 224 |
| **none at all** | **23** |

Only **6 countries have no node of any kind**: ABW, DMA, GRD, KNA, MAC, VCT (Aruba,
Dominica, Grenada, St Kitts and Nevis, Macao, St Vincent and the Grenadines). So this is
overwhelmingly **filling category gaps in countries already researched** — Ukraine's
industrial production index, North Macedonia's national accounts — not opening a frontier.
That cuts both ways: the neighbourhoods are already sourced, and the gaps are the releases
nobody bothered to research when the country was done.

## 4. What it does to the picture

PageRank is over documented edges and node size is PageRank, so 750 edges landing on
twelve international hubs is a visual change, not just a count. Inbound degree today → if
all 750 wired:

| hub | now | after | × |
|---|---|---|---|
| `imf-bpm6` | 75 | **328** | 4.4 |
| `isic` | 72 | 200 | 2.8 |
| `sna-2008` | 122 | 164 | 1.3 |
| `esa-2010` | 115 | 149 | 1.3 |
| `hs` | 25 | 136 | 5.4 |
| `imf-gfsm` | 24 | 115 | 4.8 |
| `imf-mfsmcg-2016` | 9 | 50 | 5.6 |
| `sna-1993` | 19 | 39 | 2.1 |
| `imf-psds-guide` | 7 | 17 | 2.4 |
| `cpi-manual` | 27 | 35 | 1.3 |
| `sna-1968` | 5 | 11 | 2.2 |
| `un-coicop-2018` | 35 | 41 | 1.2 |

Today's top of the graph is `sna-2008` 122 · `esa-2010` 115 · `imf-sdds` 95 · `imf-e-gdds`
80 · `imf-bpm6` 75. **After, BPM6 is first with roughly twice the runner-up**, and the
four biggest movers are all IMF manuals. The centre of the graph moves to the IMF, bought
with the thinnest evidence in the corpus.

## 5. Known evidence quality of this source

`Claude outputs/dsbb-som-source-review-2026-09-05.md` reviewed the **136 rows that DID have
a source node** and found 10 of them mis-graded A — the grader awards A on the mere presence
of a standard's name and cannot see negation, futurity or partial adoption ("not in
conformity with … ISIC", "plans to", "final steps to migrate to", "partly implemented").
Sample rows in the 750 have the same shape (ABW/BOP00: *"The transition to conform with the
guidelines in BPM6 is foreseen in 2017."* — a 2017 intention, still on the page in 2026).
**That guard already exists and was already applied — checked 2026-09-09, do not rebuild it.**
`NEGATED_QUOTE_PATTERNS` and `quoteGuardFlags` live in `scripts/grade-evidence.ts` (added
2026-09-05 off that review, four label families, `--scan-quotes` runs it corpus-wide with no
network). All ten flagged rows are fixed in `dsbb-som-import-2026-09-05.json`: eight capped to B,
`mm-national-accounts -> isic` gone (the negation), `-> sna-2008` retargeted to `sna-1968` at B,
and `py-comercio-exterior -> imf-bpm6` deliberately left at A as the review advised. So the gate on
this class is closed, not open — but a wiring pass should still run `--scan-quotes` after, because
the guard caps at B rather than refusing, and a B built on "foreseen in 2017" is still a lead
rather than a dependency.

## 5b. The SoM sometimes names the actual PUBLICATION — measured 2026-09-09

§2 says the endpoint never gives a publication title. **That is wrong as stated, and the
correction matters more than the error.** The DQAF prose has a dissemination passage, and in some
countries it names the product by title: Dominica's *"the annual national accounts of Dominica are
disseminated in the "National Accounts Report" of the Central Statistical Office (CSO) and in the
Eastern Caribbean Central Bank's (ECCB) "Annual National Account Digest""*; Grenada's *Grenada
Economic Review*; St Kitts' *Digest of Statistics*; St Vincent's *Digest of Statistics*. **Where
that sentence exists, the node is not thin at all** — it is minted on a named publication and a
named publisher, and only the URL and cadence still have to be researched.

**How often, measured on a random 60 of the 684** (seed 20260909, all 60 fetched
2026-09-09, cached in `Claude outputs/dsbb-pilot-2026-09-09/sample/`):

| | pairs | share |
|---|---|---|
| names a titled publication in a dissemination sentence | 12 | 20% |
| names only a compiling agency | 39 | 65% |
| neither | 9 | 15% |

**SUPERSEDED BY THE FULL SWEEP — read the correction at the end of this section before using any
number above.** All 684 SoMs were fetched and filtered later the same day; the sample was 3x too
optimistic. Numbers kept because the method is reusable, not because the estimate held.

**Discount that 20%.** The matcher takes any Title-Case product-ish phrase, and hand-checking the
12 hits, roughly half are generic — "Official Statistics" (MDA), "National Statistics" (AGO),
"External Statistics" (DEU) are descriptions, not product names, while *Statistical Abstract*
(SYC), *External Merchandise Trade Statistics* (MUS), *Structural Business Survey* (EST) and
Dominica's two are real. **Call the usable rate ~10%, and 20% the ceiling.** The four Eastern
Caribbean countries in the pilot are unusually rich because the ECCB names its own products; do
not generalise from them.

So this does not rescue a wholesale mint — 65% of pairs still give an agency and nothing else —
but it does mean the set is **separable**, and that separation is a better bound than any of §6's
three (see option E).

### 5c. The full 684-SoM sweep — what option E is actually worth (2026-09-09)

All 684 fetched and cached in `Claude outputs/dsbb-pilot-2026-09-09/all-som/`; filter output in
`e-slice.json`, hand-checked shortlist in `e-slice-tier1.json`.

| stage | pairs |
|---|---|
| a quoted title inside a dissemination sentence (raw matcher) | 56 |
| after excluding the standards' own manual names (BPM6, GFSM, IMTS…) | 39 |
| **after reading all 39 — a real product of the country's own agency** | **~20 strong, ~10 marginal** |
| Title-Case candidate only, no quotes (tier 2, mostly noise) | 39 |
| neither | 589 |

**So E is worth roughly 20–30 pairs of 684, about 4%, not the 70–135 the sample predicted.** The
error was in the sample: a 60-pair draw put four unusually rich Eastern Caribbean entries in a small
denominator, and the Title-Case matcher counted descriptions as products. Discards found by reading:
`Times New Roman` (a font, out of a leaked CSS rule in Poland's CPI page), Jamaica's SITC section
headings, Rwanda's ISIC activity name, Nigeria's citation of the UN IMTS standard.

The strong list is genuinely good, though — Bahamas' three trade products, Dominica's and St Kitts'
CSO/ECCB digests, Grenada's *National Accounts Statistics Digest*, Guatemala's *Boletín Estadístico*,
Kyrgyzstan's and Tajikistan's and Azerbaijan's and Moldova's national-accounts annuals, Malaysia's
*Index of Industrial Production*, Sri Lanka's *CBSL Annual Report*, Zimbabwe's three RBZ/ZIMSTAT
products. Each still needs its own URL and cadence researched before it mints.

**Two side-findings.** Several hits are statistical LAWS, not releases — Uzbekistan's *On Official
Statistics*, Kyrgyzstan's *On the National Bank of the Kyrgyz Republic*. This corpus already mints
legal instruments and grades them well, so that is a real and better-evidenced side yield rather than
noise. And Colombia's ILV00 names a publication whose title carries an unsubstituted template
placeholder — *"Comportamiento de la Balanza de Pagos de Colombia Periodo -----"* — the same defect
class round 23 found in the e-GDDS pages, and a reminder to quote what the page prints.

## 6. The options, stated so one can be picked

- **A — leave it.** The file stays a lead list; when a country is researched for another
  reason, its rows are picked up as targets. Costs nothing, gains nothing, and the file
  has already sat four days.
- **B — thin-mint all 684.** One pass, mostly mechanical. Buys +19% nodes / +23.5% edges
  and §4's re-centring, at the price in §2. Needs a written thinness standard, a
  `provenance: dsbb-category-label` marker or equivalent so the thin nodes are separable
  later, and §5's guard.
- **C — mint properly from the leads.** Each row researched to the actual publication and
  its own page, as the rest of the corpus is. 684 of those at the demonstrated rate
  (round 31: 6 edges) is years.
- **D — a bounded slice of B.** e.g. only the 6 uncovered countries (23 pairs, fills real
  holes), or only MET00+NAG00 (225 pairs), or only countries with 20+ nodes already
  (131 pairs, where the neighbourhood is best sourced). Keeps the option to stop.
- **E — the slice that is not thin at all, found by §5b.** Fetch all 684 SoMs (~6 minutes,
  polite rate, no token cost) and keep only the pairs whose dissemination passage names a
  publication by title. On the sampled rate that is roughly **70 pairs, ceiling ~135**. Those
  mint like the rest of the corpus — named publication, named publisher, only the URL and cadence
  left to research — and the remainder stays a lead list. **This is the bound to prefer over D's
  three if the thinness is what you actually object to**, because it removes the thinness rather
  than rationing it.

