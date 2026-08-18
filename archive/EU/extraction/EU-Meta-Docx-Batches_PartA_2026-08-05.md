# EU Meta jsons.docx — unread batches, Part A extraction, 2026-08-05

Governing brief: `Research.1.md` v3.0. Scope: the seven staged batches inside
`EU/EU Meta jsons.docx` that were never copied into
`EU/slices/_staging/10-batch-with-records.ndjson` and so were never touched
by any prior `G.*` session: `SUT-IOT`, `FIGARO`, `GLOBAL-IO`,
`PEER-REVIEWS-3RD-ROUND`, `REC-2023-397`, `ESGAB-ANNUAL-REPORTS`,
`WP-SMP-ESAC`. Located by parsing `EU/EU Meta jsons.docx` with `python-docx`
and diffing its 16 `batch_id` markers against the staging ndjson's own
markers (9 overlap, already processed in `G.43.md`/`G.44.md`; 7 do not).

## What this session did

Read all seven batches in full. Live-verified the six strongest candidates
against primary sources before minting. One batch (`REC-2023-397`) correctly
yielded no node. `GLOBAL-IO` yielded one strong candidate (OECD ICIO) and
four names filed as unverified leads.

## Live verification performed

1. **`naio_10_n_esms.htm`** (Eurostat, SUIOT metadata) — matches staged
   quote; confirms the annual-core/five-yearly-supplement structure.
2. **`naio_10_fcp_esms.htm`** (Eurostat, FIGARO metadata) — matches staged
   quote verbatim: *"Since 2021, they are produced annually."*
3. **ESAC opinions page** — matches staged quote, and the live list is
   *more* precise than the staged summary: one dated Work Programme opinion
   per year, 2015 (`1 March 2016`, "Opinion on Work Programme 2017") through
   2026 (`13 July 2026`, "Opinion on the Draft 2027 Work Programme").
4. **Eurostat third-round peer-review page** — matches staged quote; confirms
   three rounds (2006–2008, 2013–2015, 2021–2023).
5. **`eur-lex.europa.eu` CELEX:32008D0235`** (ESGAB founding Decision) —
   Article 2(1) matches staged quote verbatim: the annual-report mandate.
6. **ESGAB annual-reports landing page** — one dated report per year,
   unbroken, 2009 through 2025 (17 years). Stronger evidence than the staged
   batch's own citation, which only asserted "16th"/"17th" edition counts
   from two individual reports' title pages.
7. **`oecd.org` ICIO dataset page** — reachable, confirms the dataset's
   identity; does not itself state a release cadence (the cadence evidence
   used is the staged PDF's "2025 edition... 1995 to 2022" language,
   cross-referenced against an earlier "2023 edition" citation in the same
   batch — a two-year gap between the only two data points in hand, not
   independently resolved to a firm annual claim).

Not independently re-verified live this session: the SMP financing decision
and Annual Work Programme PDFs (both are direct Commission-hosted document
links, not third-party mirrors, and their content — an edition-count
statement — is the kind of citation this branch treats as low-risk without a
second fetch); the `GLOBAL-IO` batch's named parallel databases (WIOD,
EXIOBASE, EORA, GTAP-MRIO, OECD TiVA), none of which were minted.

## Nodes minted (7)

- **`eurostat-suiot`** — Supply, Use and Input-Output Tables. Annual core
  tables (t+36 months) plus a five-yearly supplementary set, under the ESA
  2010 transmission programme.
- **`eurostat-figaro`** — FIGARO, the EU's inter-country SUIOT product,
  Eurostat + JRC, annual since 2021.
- **`oecd-icio`** — OECD Inter-Country Input-Output Tables. Minted with a
  flagged cadence uncertainty (`releases_per_year: 0.5`, not confidently
  annual) — see `_open_questions` in the slice.
- **`eurostat-annual-work-programme`** — Annex IV to the Commission's annual
  Single Market Programme financing decision; self-identifies as "the sixth
  one" (2026 edition).
- **`esac-opinion-work-programme`** — ESAC's annual opinion on the draft
  Work Programme, live-confirmed on ESAC's own listing.
- **`ess-peer-review-final-report`** — Eurostat's consolidated report to the
  European Parliament and Council on each ESS peer-review round. Round-based
  cadence (~once per 7–8 years), not annual — flagged, not silently forced
  to an annual figure.
- **`esgab-annual-report`** — ESGAB's mandated annual report on Code of
  Practice implementation. The cleanest cadence evidence any EU-branch node
  has had: a live, unbroken, dated 17-year release list (2009–2025).

## Edges added (4)

- `eurostat-suiot -> esa-2010` (`methodology_depends_on`)
- `eurostat-figaro -> eurostat-suiot` (`uses_data_from`)
- `eurostat-figaro -> esa-2010` (`methodology_depends_on`)
- `esac-opinion-work-programme -> eurostat-annual-work-programme` (`cites`,
  flagged as an imperfect fit — ESAC's opinion is advisory commentary on the
  Work Programme, not a citation in the ordinary sense; the same
  `RelationshipType` gap already logged for `ess-escb-mip-quality-report` in
  `eurosystem-ecb.json`)

`esa-2010` now has a second kind of incoming edge beyond national-office
citations and the EDP notification-tables edge from `G.43.md` — two more
EU-level statistical products naming it as their own methodological basis.

## Not minted, and why

- **Commission Recommendation (EU) 2023/397** (`REC-2023-397`) — a soft-law
  instrument, not a recurrently published document. Already recorded as
  context in `PartB_soft_connections_2026-08-04.md` (sc-02, sc-04, sc-05).
  No node.
- **WIOD, EXIOBASE, EORA, GTAP-MRIO, OECD TiVA** — named parallel global
  input-output databases in the `GLOBAL-IO` batch. None independently
  verified live. WIOD's own cited update ("recently updated to 2014", from a
  document written around 2019) reads as possibly discontinued rather than
  confirmed recurring. Filed as leads in the new slice's `_dropped`, not
  chased further.

## Corpus impact

**154 → 161 reports** (seven new), **222 → 226 dependencies** (four new).
`npm run validate` and `npm run check` both exit 0. Three of the seven new
nodes (`oecd-icio`, `ess-peer-review-final-report`, `esgab-annual-report`)
are isolated — kept and shelved per corpus convention, same treatment as
`ecb-eurosystem-annual-balance-sheet` and the other Eurosystem nodes when
they were first minted.
