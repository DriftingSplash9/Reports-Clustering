# Cloud session 2026-10-25 — the `kind: instrument` re-sort

Thomas: "lets deal with the 490 nodes marked wrongly". The handoff's "~490" was a title-regex count from 2026-10-24.

- Recount: 931 nodes carry `kind: instrument`. Code check first: `kind` is read only by the validator (publication needs
  `releases_per_year`, instrument must not have one, the instrument→instrument `legal_basis` rule); the renderer reads the
  ABSENCE of `releases_per_year` (`isStandingInstrument`, hollow node), not `kind`. So instrument → standard changes no
  drawing; instrument → publication needs a rate and stops the node drawing hollow.
- Title-rule sort (`instrument-kind-review-2026-10-25.json` in the 10-24 folder): 289 legal, 89 one-off, 78 methodology,
  325 recurring-looking, 95 non-document, 55 unsorted.
- Thomas's three rulings (AskUserQuestion): switch the methodology documents to `standard` after a per-node check;
  research rates from publishers' own pages, edges first; list the non-documents, change nothing.
- Standard: 69 of the 78 after the check (excluded: eu-reg-2020-1148, eu-reg-2024-3159, eu-reg-2023-1470,
  uemoa-reg-2024-base2023, ru-resolution-670-equalization-methodology, ru-rosstat-cpi-methodology-915,
  ru-rosstat-osm-233-household-accounts, sd-mofep-budget-2026, cn-mee-hazardous-waste-list-2016). Then China's 18
  报表制度/监测制度/调查方案, the same NBS 统计制度 family as the approved 调查制度 (stats.gov.cn/sj/tjzd/ lists only the
  2025年统计年报和2026年定期统计报表 set, dated 2026-04-02, so no rate), and `imf-mfs-compilation-guide-2008`,
  `statcan-cpi-reference-paper`.
- Publication with a sourced rate: 29 ESS peer-review documents at 0.13 (Eurostat third-round page, HTTP 200: "A first
  round of peer reviews was carried out in 2006-2008 and a second round in 2013-2015. The third round of peer reviews is
  taking place in 2021-2023."); cz/fr/it/ee/dk-govfin at 2 (Reg. 479/2009 Art. 3(1) from CELLAR; each national page read,
  HTTP 200; Estonia's states "before 1 April and 1 October each year"; Denmark's gives "Næste udgivelse: 26. oktober 2026"
  after a 27 April 2026 release). es/nl/lt-govfin are different products (BdE: quarterly plus monthly) and wait.
- Not documents: 71 from the non-document class after hand checks (24 of the 95 were documents: 11 laws, 13 one-off
  reports), plus 55 statistics offices and similar bodies found inside the recurring class. All 126 listed in
  `notes/standing-issues.md`, kinds unchanged.
- Worklist left: 201 nodes, 105 with edges, `rate-worklist-2026-10-25.json`. A first probe of the 24 most-connected own
  pages: 6 gave no response (vn, in-fc15, kr ×2, ru-vpn-results, id-rpjmn), lt-govfin and sica answered 403, the IMF
  e-library 202 empty; most landing pages that answered state no frequency.
- Every moved node carries `_kind_original: "instrument"`; slices backed up to `_to_delete/*.bak-2026-10-25b/c/d`.
- validate exit 0 before and after each step; final KIND 2,758 publication · 155 standard · 808 instrument; reports,
  edges and grades unchanged (3,721 / 3,501; 1,491 A · 1,425 B · 585 C); tsc clean.
