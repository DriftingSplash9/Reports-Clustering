# Node granularity — the Brazil pilot, 2026-10-05 (WRITTEN the same day)

**STATUS: WRITTEN 2026-10-05 on Thomas's approval** (*"write Brazil, drop the twin edge too"*). Answers to the
four questions below: (1) yes; (2) the twin is deferred, folded into its sibling's existing F-03 note;
(3) not answered — `br-ibge-pnad-educacao` left untouched; (4) the merge map went into the slice's
`meta.merged` as proposed. Retired records verbatim: `notes/retired-nodes-2026-10-05.json`; every
re-pointed live edge carries `_repointed_from`. `validate` after: exit 0, 128/128 logic, `tsc` clean,
**3,681 reports / 3,459 dependencies, 1,412 A · 1,435 B · 612 C, 964 zero-edge**; rule-14 hand check
against all three `_dropped` shapes: 0 hits; Brazil's url collisions 3 groups → 0 (corpus-wide now
113 / 322 on this script's normalisation). **Re-graded the same day.** The 10 re-pointed edges were the only live
edges on their 7 evidence URLs, so the selection was exactly those 10 (rule 11); the 7 `evidence-cache/` records
were backed up first. Network dry run: every host 200, 9 unchanged at B (8 `no-quoted-span`, 1
`artefact-named-elsewhere-in-document`), and `br-ce-ipece-pib -> br-ibge-pib-municipios` **B → A**
(`quote-found-artefact-named`, `title-run:5/5`). Spot-checked before writing: IPECE's own tables carry the source
line *"Fonte: Produto Interno Bruto dos Municípios/IBGE"* — the A exists BECAUSE of the merge, since no document
prints the retired title "PIB do Município de Fortaleza". Written with an improvement-only selection; the edge's
only change is `evidence_grade`. The refreshed cache records were kept: they label the live pairs, where the old ones
named retired ids (and `ipe.df.gov.br` is now a direct read, where the old record came via web.archive.org).
`validate` after: exit 0, **1,413 A · 1,434 B · 612 C**. The dry-run account follows, unchanged.

**Ruling (Thomas, 2026-10-05): option (a), ONE NODE PER DOCUMENT.** Where the August 2026 import
minted several topic nodes for one document, they merge into a single node for that document;
a topic that is not one document has its edges re-pointed at the documents their evidence names.
The alternatives on the table were (b) keep topic nodes and link them with `part_of`, and
(c) leave it. Why (a): the V0.11 measurement in `types.ts` (the `part_of` comment) — splitting a
document into several nodes understates it by more than the division, so the granularity defect
distorts the ranking, not just the url field. Background: `notes/bps-url-repair-probe-2026-09-15.md`.

**Pilot slice: `br-brazil-2026-08.json`. No data file was changed.** Instruments, both new and
both read-only: `scripts/measure-url-collisions.ts` (`SLICE=` env var; whole corpus, rule 11) and
`scripts/simulate-merge.ts` (`PLAN=` a merge plan; re-points edges in memory and re-ranks).
`npm run validate` before: exit 0, 3,692 / 3,461, 967 zero-edge.

## Headline: a shared url is NOT always a duplicate node

Brazil has **3 url groups, 17 nodes**. Only **11 of the 17 are merge cases**:

| node(s) | verdict | proposed action |
|---|---|---|
| `br-ibge-contas-regionais-estados` | **MERGE** into `br-ibge-contas-regionais` — both are IBGE's *Contas Regionais do Brasil* (the state-level product) | survivor's url → `.../contas-nacionais/9054-contas-regionais-do-brasil.html` |
| 10 × `br-ibge-pib-municipio-<city>` | **MERGE** into `br-ibge-pib-municipios` — each is one city's row of *Produto Interno Bruto dos Municípios*, not a document | survivor keeps `.../9088-produto-interno-bruto-dos-municipios.html` |
| `br-ibge-contas-regionais` | **URL WRONG**, not a duplicate — it held the PIB dos Municípios page | url → the 9054 page (as above) |
| `br-inep-censo-escolar` | **URL WRONG** — held the *Sinopse* page, which belongs to `br-inep-sinopse-educacao-basica` | url → `https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/censo-escolar` |
| `br-ibge-pense` | **URL WRONG** — held IBGE's education THEME index (`/estatisticas/sociais/educacao.html`) | url → `.../sociais/educacao/9134-pesquisa-nacional-de-saude-do-escolar.html` |
| `br-ibge-pnad-educacao` | **CHECK** — a module of PNAD Contínua; IBGE's page for it (`.../educacao/17270-pnad-continua.html`) is the PNAD annual-release page covering several modules | leave; a module-vs-document ruling, not a fetch |
| `br-inep-sinopse-educacao-basica` | correct as it stands | none |

**Read on 2026-10-05:** the three IBGE product pages (9054, 9088, 9134) and the 17270 page were read
in the desktop app's built-in browser, which cleared IBGE's Cloudflare challenge. curl from this
machine got a 403 interstitial on every `www.ibge.gov.br` path, and so did an in-page `fetch()`. INEP's
Censo Escolar page answered curl 200 with title *"Censo Escolar — Instituto Nacional de Estudos e
Pesquisas Educacionais Anísio Teixeira | Inep"*.

**So the repair pass needs a classify step before it merges.** Every collision group is one of:
true duplicates (merge), distinct documents given a shared index or wrong page (url repair),
or module/topic questions (CHECK). Merging on url alone would have fused PeNSE with a PNAD
module and the school census with its own synopsis.

## What the two merges do to the edges

`simulate-merge.ts` against `br-plan.json` (two merges, 11 nodes retired):

- **10 live edges re-point** cleanly: 3 out of `-estados` (→ `br-rs-dee-pib`, `br-pr-ipardes-pib`,
  `br-df-ipedf-pib`) and 7 into city nodes (from RS, MG, DF, CE, SC, PR, RJ state institutes).
- **1 live edge must go to `_dropped`**: `-estados -> br-ibge-pib-municipios` becomes
  `br-ibge-contas-regionais -> br-ibge-pib-municipios`, and `pib-municipios` is `part_of`
  `contas-regionais` — a rule-12 validator error.
- **11 `_dropped` notes name a retired id** (8 `no-document`, 2 `deferred`, 1 `wrong-target`, across
  `br-brazil-2026-08.json` and `br-in-ca-wiring-round-2026-08-30.json`); each needs its endpoint
  re-pointed so rules 10 and 14 still see it.
- **One of those is a rule-10 conflict the merge exposes.** `br-ibge-sistema-contas-nacionais ->
  br-ibge-contas-regionais-estados` was moved to `_dropped` as `deferred` by the 2026-08-31 audit (F-03:
  a "consistent with" basis is a lead, not evidence). Its twin `br-ibge-sistema-contas-nacionais ->
  br-ibge-contas-regionais` is LIVE at B on the same kind of basis (*"compiled consistently with the
  national Sistema de Contas Nacionais"*). After the merge they are one pair, so the audit's own
  ruling says the live one should be deferred too — **a ruling for Thomas**, not something to settle
  inside a merge.
- **Every re-pointed edge needs a re-grade**: the grader matches against the TARGET's title, and
  the targets' titles change. Not run — every grader run rewrites `evidence-cache/` records.

## What the merges do to the ranking

| | before | after |
|---|---|---|
| `br-ibge-pib-municipios` | rank 659, authority 0.01648 | **rank 39, 0.10205** |
| `br-ibge-contas-regionais` | rank 93, 0.05197 | rank 94, 0.05197 |
| `br-sp-seade-pib` | rank 732 | rank 95 |
| `br-rs-dee-pib` / `-pr-ipardes-` / `-df-ipedf-` | ~659 | ~377 |

Reports 3,692 → 3,681; edges 3,461 → 3,460. *(Correction, 2026-10-05, Mexico dry run: the figure that follows counts RANK moves, and rank is noisy here — dozens of nodes share one floor authority and float noise reorders a tied block, so part of the 63 may be ties reshuffling, not authority moving. `simulate-merge.ts` now counts authority moves >1% instead. The figure stands as written, unverified:)* **63 surviving nodes move more than 11 places** (11 is
the shift explained by removing the retired nodes themselves); the large risers are the Brazilian
regional-accounts chain above, the fallers are nodes in the dense mid-ranks (#300-#330) displaced by
about 40 places. The V0.11 direction holds: the merged node gains far more than its parts
held separately.

## Open for Thomas before anything is written

1. **Approve writing this plan** — two merges, three url repairs, the dropped-note re-points.
2. **The F-03 twin**: defer the live `br-ibge-sistema-contas-nacionais -> br-ibge-contas-regionais`
   to match its dropped sibling, or keep it.
3. **`br-ibge-pnad-educacao`**: is a survey MODULE a document? Same question will recur
   (the BPS probe's subsector volumes are its cousin).
4. **The retired ids' record**: proposed as a merge map in this slice's `meta`, old id → survivor,
   with the old title — NOT as `title_aliases`, which must be names the document is printed under.

## Corpus-wide count, for the record

`measure-url-collisions.ts` with no `SLICE` gives **116 groups / 339 nodes**, against §3's
114 / 335. The script normalises case, a trailing slash and a `#fragment`; the 2026-10-05 recount
in `HANDOFF.md` did not say how it normalised. Neither figure is a merge count — on Brazil's
evidence most groups need classifying first.
