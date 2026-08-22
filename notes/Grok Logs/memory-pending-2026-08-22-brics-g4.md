# Memory-pending: BRICS/G.4 full dispatch (item 6b), 2026-08-22

Project memory (mcp__remote-devices__project_memory_write) returned
"Project memory is not available in this session" when this session tried
to write the entry below. Parked here per REPORTS.md convention — a future
session with working memory access should write this as
`brics-g4-full-dispatch-2026-08-22.md` (type: project) and add one index
line to MEMORY.md, then this file can move to `_to_delete/`.

---

---
name: brics-g4-full-dispatch-2026-08-22
description: BRICS G.4 full research dispatch (Brazil + China), item 6b, 2026-08-22 -- CURRENT BRICS state
type: project
---

# BRICS G.4 -- full dispatch, Brazil + China, 2026-08-22 (item 6b)

Thomas said "read the handoff, do BRICS/G.4." HANDOFF Sec.5 item 9 had been
partially closed by item 6a (a grep-first low-hanging-fruit pass, 4 edges)
but explicitly left "a genuine BRICS G.4 dispatch round ... beyond the
already-quoted low-hanging fruit" open. This session did that dispatch.

## Measure first

Re-ran the component/bridge measurement from BRICS/G.3's technique before
touching anything, because item 6a's "19 unwired"/"7 unwired" counts were
stale -- the 2026-08-20 Grok archive mint had grown Brazil to 99 nodes and
China to 66 in the meantime. Actual starting state: 86 of Brazil's 99
nodes and 48 of China's 66 had no edge to any international-standard node.

## Method

Staged the full repo into a Linux sandbox (tar on-device -> stage ->
extract -> npm install -> npm run gen/validate/build), per the standing
npm-validate-procedure. Dispatched 8 parallel research agents -- 4 Brazil
batches (industrial/business, household/social, agriculture/environment/
tourism, fiscal/monetary) and 4 China batches (fiscal law, labour/R&D/
education/health, environment/resources, national-accounts/CPI/monetary)
-- each instructed to raw-verify every claim against a LIVE primary
source, never trust an existing node description (including this corpus's
own), and report honest drops rather than force an edge. The orchestrating
session then personally built the schema-compliant JSON slice from their
structured findings rather than trusting agent-authored JSON.

## Result

New slice src/data/research/brics-g4-2026-08-22.json: 8 new international-
standard nodes, 26 new dependency edges (22 Brazil, 4 China), 26 _dropped
entries. Corpus: 3,102/2,124 -> 3,110/2,150. npm run validate 120/120 exit
0, tsc --noEmit clean, npm run build clean at 1,488 kB (unchanged).
Structural result: main component 978 -> 1154; Brazil in main component
58/99 -> 73/99, wired-to-international 13/99 -> 33/99; China in main
component 54/66 -> 55/66, wired-to-international 18/66 -> 22/66.

New nodes: oecd-oslo-manual, who-rose-angina-questionnaire, who-gshs,
un-wpp-methodology, fao-world-programme-census-agriculture, un-seea,
imf-mfsmcg-2016, who-icd-10.

Brazil headline: the whole industrial/business survey family (PIM-PF,
PIA-Empresa, PIA-Produto, PAS, PAC, PAIC, PMC, PIMES, PINTEC) connects to
isic via IBGE/Concla's own CNAE-to-ISIC concordance documents (PIMES
uniquely on ISIC Rev. 3, discontinued 2016 before the Rev.-4 migration).
PINTEC additionally names the Oslo Manual (3rd ed. 2005,
methodology_depends_on) and cites Frascati Manual 2015. Censo Demografico
names the UN census principles by exact edition (Rev. 3, 2017); population
projections name four distinct UN Population Division methods; Censo
Agropecuario names FAO's World Programme for the Census of Agriculture;
the environmental-economic accounts node independently re-confirms (via a
fresh live fetch, not trusting the pre-existing Grok-imported description)
a UN SEEA dependency. br-bcb-nota-fiscal-abaixo-linha -> GFSM 2014 is the
single strongest citation of the round. Structural finding: Brazil runs
two non-interoperable fiscal statistical tracks -- a domestic LRF/PCASP
track (LC 101/2000 -> MDF -> RREO/RGF, and STN's legacy RTN, whose own
manual admits it still runs on the superseded MEFP 1986) with no GFSM
citation, versus a separate GFSM-2014-aligned track (BCB's "abaixo da
linha" manual) that cites GFSM 2014 explicitly.

China headline: only 4 edges against 24 researched candidates (reinforcing
the "least internationally-connected BRICS country" pattern from G.1-G.3),
but each exact and edition-named: 19th-ICLS unemployment-statistics
resolution, Frascati Manual 7th ed. for R&D expenditure, WHO ICD-10 for
the Health Statistical Yearbook (with its own 2002 ICD-9->ICD-10
switchover date documented), and -- closing a gap earlier rounds left open
-- NBS's CPI methodology naming COICOP 2018 explicitly, on a dedicated
methodology page separate from the monthly release (which never names it).

Two documented denials, correctly NOT minted: Brazil's own COICOP
concordance page states POF/SNIPC expenditure classifications are "ainda
nao harmonizadas" (not yet harmonized) with COICOP. China's own Mineral
Resources Report affirmatively cites domestic GB/T 17766/19492 standards,
not UNFC.

A second duplicate-node pair found (same shape as item 6a's
br-ibge-sistema-contas-nacionais/br-scn): cn-stats-law and
cn-stats-law-impl-regs (Grok-imported, isolated) look like duplicates of
the already-researched cn-statistics-law (also isolated despite its
research quality). Flagged in HANDOFF Sec.5 item 3c for Thomas; nothing
wired pending his call.

## Method lessons for next time

- Every agent independently caught and discarded at least one WebFetch
  fabrication this round. ibge.gov.br's main site sits behind a
  Cloudflare JS challenge that silently 403s WebFetch -- confirmed by
  direct curl, worked around via a real browser session or by fetching
  directly from ftp.ibge.gov.br/biblioteca.ibge.gov.br/concla.ibge.gov.br,
  none of which sit behind the same challenge. This is a NEW trap,
  distinct from the DSBB JS-wall and the imf.org PDF 403.
- mnr.gov.cn (China's Ministry of Natural Resources) was entirely
  unreachable from this sandbox -- DNS/proxy failure on every attempt, a
  different failure shape from the DSBB JS-wall. Worked around via
  mirrors (creva.org.cn, fdi.mofcom.gov.cn) this round.
- dsbb.imf.org reconfirmed JS-walled. China's SDDS/NSDP metadata (needed
  to properly source a cn-budget-law/imf-sdds-style edge) sits behind it
  -- real-browser fetch is the only known fix.
- A denial found by an agent is not automatically a mint -- one agent
  proposed minting br-ibge-pof -> un-coicop-hbs-1999 off a quote that
  actually DENIES harmonization ("ainda nao harmonizadas"). Caught and
  corrected during synthesis, not by the agent itself -- always read a
  proposed MINT's own quote for what it actually asserts before trusting
  the agent's classification.
- A citation found in the wrong document needs redirecting, not
  discarding. An agent found the ILO/IMF/OECD/etc. "CPI Manual" cited in
  IBGE's IPCA/INPC calculation-methods manual, but proposed attaching it
  to br-ibge-pof (whose results feed that manual) rather than to
  br-ipca/br-inpc (the manual's actual subject). Redirected to the correct
  source nodes during synthesis.
- Leads carried forward, not closed: cn-budget-law -> imf-sdds (real at
  the country level, not sourced to the Budget Law's own text); a CAEP
  GEP-accounting guideline citing SEEA-EEA 2012 (different document from
  the candidate Eco-Environment Yearbook, needs its own node); the
  MNR-UNECE UNFC bridging document (real per UNECE's own site, PDF
  403'd this session); br-mtur-anuario-turismo's sibling product
  "Economia do Turismo" (does cite UNWTO/OMT, unlike the Anuario
  candidate itself).

See brics-g4-partial-2026-08-22 (memory file) for the preceding item-6a
round and brics-g3-international-bridges-2026-08-17 for the G.3 round this
one continues.
