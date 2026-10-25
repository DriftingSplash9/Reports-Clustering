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

# The naming fixes (Thomas: "go with your recommendations")

- Aliases: `gb-voa-rating-lists` lost "non-domestic rating list"; `cpa` gained "Classification of Products by Activity"
  (PKWiU 2015, Dz.U. 2015 poz. 1676, annex §4.2); `cmhc-rental-market-survey` gained "Rental Market Survey" (O. Reg. 367/11).
  Live dry run of all seven edges into the three nodes: PKWiU → CPA B → A (alias1 5/5), Ontario → CMHC B → A (alias1 3/3),
  Stevenage A (alias1 is now "local rating list", 3/3); Manitoba and Nova Scotia → CMHC stay B (not named); PRODCOM → CPA
  stays B; ESA 2010 → CPA unread (EUR-Lex 202), stays B.
- Rule 11 slip and repair: the first run graded one edge per shared url and rewrote the PKWiU (4 edges) and prom_esms
  (3 edges) evidence records with one window each, and replaced EUR-Lex's 200 record with a 202. All three restored from
  git; then every edge on the two shared urls was re-graded together, leaving 4 and 3 windows. A later VLGGC 403 record
  was restored the same way.
- Comma fix: measured BEFORE on the cached window of each of the 2,924 live edges that has one, then after. 6 newly named,
  0 un-named, 29 `how` labels changed. Live re-grade with all url neighbours: four B → A (uz-unemployment → ICLS, flat 9/10;
  uz-national-accounts → uz-coicop; zw-auditor-general → Urban Councils Act, flat 6/7; gl-selvstyrelov → Danish price
  assumptions); the VLGGC pair answered a Cloudflare challenge. Two A's needed `evidence_quote`, filled from the grader's
  own matched span (coverage 1.00; the Danish one cut to its first two whole sentences, since the span is truncated at 300).
- Ruling recorded: a publisher's own number for a member of a set names the set; Basel → IFRS A by hand.
- Guards (not shipped): A 27 (26 A), narrow A 7 (6 A), B 39 (36 A). Lists in `naming-guards-2026-10-25.json`.
- validate exit 0: 1,498 A · 1,418 B · 585 C; 3,721 / 3,501; 990 zero-edge. selftest 78/78. tsc clean.
