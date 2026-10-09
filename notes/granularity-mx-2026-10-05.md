# Node granularity — Mexico, 2026-10-05 (WRITTEN the same day)

**STATUS: WRITTEN 2026-10-05 on Thomas's approval** (*"write Mexico, leave the judicial nodes"*). Four slices touched
(`mx-mexico-2026-08`, `mx-browser-unblock-2026-08-29`, `mx-unlinked-wiring-2026-08-28`,
`mx-unlinked-wiring-round2-2026-08-29`), all backed up to `_to_delete/` first. Collision guard on the four new urls:
0 hits. 3 live edges re-pointed (`_repointed_from`); the 2 duplicates removed — `mx-igae-actividades -> sna-2008`
folded into the existing `resolved` note for `mx-igae -> sna-2008`, `-> mx-enoe` given a new `resolved` note (the
pair is live on `mx-igae`, so rule 10 requires `resolved`); the two containment `note`s kept their original endpoints
with "RESOLVED by the merge" prepended, as planned. **One write-script miss, caught by its own count check before
anything was written:** the duplicate test first read only the four touched slices, and `mx-igae`'s own edges live
in a fifth (`mexico-wiring-2026-08.json`) — rule 11 again; fixed to read every slice. Records verbatim:
`notes/retired-nodes-2026-10-05-mx.json`. `validate` after: exit 0, 128/128, **3,675 / 3,456, 1,413 A · 1,432 B ·
611 C, 962 zero-edge**; no warning names a retired id. Mexico url collisions 16 nodes → 5 (the judicial pair with
CNIJE, and `mx-registro-civil`); corpus-wide 109 groups / 299 nodes. **Re-grade:** all 4 live edges on the 3 evidence
urls, every host 200, **no grade changed** (`mx-igae -> naics` B, `-> mx-scnm` A; the two `-> mx-cngmd` edges C
`empty:tiny-body`, because they cite INEGI's JavaScript-shell programme page). The dry-run account follows, unchanged.

Third country under ruling (a), one node per document (Thomas, 2026-10-05). Method and instruments:
`notes/granularity-pilot-br-2026-10-05.md`. Artefacts: `Claude outputs/granularity-mx-2026-10-05/`.
**No data file was changed.**

## Headline: three real merges, small rank effect

`measure-url-collisions.ts`: **6 url groups, 16 nodes**. Unlike Uruguay, the urls are INEGI programme
pages, not homepages, and **4 nodes are true merges** — but the merged-away nodes carried few edges, two
of them duplicates, so the ranking barely moves.

**Host behaviour, 2026-10-05.** `www.inegi.org.mx/programas/<x>/` answers curl 200 with a 300-400-byte
JavaScript shell (no title), and **a wrong slug ALSO answers 200**, with the title *"Página no
encontrada"* — `programas/isflsh` and `programas/scnm` both did. **A 200 from INEGI is not proof a page
exists**; read the title. All urls below were confirmed in the built-in browser pane, where each programme
page redirects to its latest edition (`/programas/cnijf/` → `/programas/cnijf/2026/`).

| class | nodes | evidence | action proposed |
|---|---|---|---|
| **MERGE** | `mx-enigh-salud`, `mx-enigh-transferencias` → `mx-enigh` | the 2026-08-29 round's own `_dropped` notes: *"ENIGH 2024's own results report tabulates household health-care spending as a line item of the same survey"*, and the same for transfer income | merge; both have zero live edges |
| **MERGE** | `mx-igae-actividades` → `mx-igae` | all three of its edges were minted off INEGI's monthly IGAE boletín, which IS `mx-igae`'s document (2026-08-29 `resolved` notes) | merge |
| **MERGE** | `mx-cdmx-cngmd-alcaldias` → `mx-cngmd` | the census's own title is *"…Gobiernos Municipales y Demarcaciones Territoriales de la Ciudad de México"* — the alcaldías are inside it | merge |
| **URL REPAIR** | `mx-cnijf` | held the CNIJE (state) page | → `https://www.inegi.org.mx/programas/cnijf/` (*Censo Nacional de Impartición de Justicia Federal (CNIJF)*) |
| **URL REPAIR** | `mx-scnm-sectores-institucionales` | held the SCNM page | → `https://www.inegi.org.mx/programas/si/` (*Cuentas por Sectores Institucionales Anuales (CSI)*) |
| **URL REPAIR** | `mx-scnm-cou` | held the SCNM page | → `https://www.inegi.org.mx/programas/cou/` (*Cuadros de Oferta y Utilización (COU)*) |
| **URL REPAIR** | `mx-cuenta-isfl` | held the SCNM page | → `https://www.inegi.org.mx/programas/isfl/` (*Cuenta Satélite de las Instituciones sin Fines de Lucro de México (CSISFLM)*) |
| **CHECK — institution nodes** | `mx-guerrero-judicial`, `mx-oaxaca-judicial` | titled *"Poder Judicial / Fiscalía del Estado de X — statistical presence"*: institutions, not documents, carrying the CNIJE page as url | leave; not reached by ruling (a). The institution-as-a-node question is the same one `uy-ssc`/`iq-cso` raise |
| **CHECK — instrument** | `mx-registro-civil` (in another slice) | the civil-registration system, holding INEGI's birth-statistics page | leave; no candidate url for a federated registry |
| correct as is | `mx-enigh`, `mx-igae`, `mx-cngmd`, `mx-cnije`, `mx-edos-nacimientos` | | none |

`mx-scnm-sectores-institucionales` keeps its `part_of mx-scnm` — the CSI is a separate INEGI product
inside the national-accounts system, which is what `part_of` is for. It is not a merge.

## What the merges do

`simulate-merge.ts` against `mx-plan.json` (three merges, 4 nodes retired): reports 3,679 → 3,675,
edges 3,458 → 3,456.

- **3 live edges re-point**: `mx-igae -> naics` (B), `mx-igae -> mx-scnm` (A), and
  `mx-alcaldia-iztapalapa -> mx-cngmd` (C).
- **2 live edges are DUPLICATES and go to `_dropped`**: `mx-igae-actividades -> sna-2008` (B) and
  `-> mx-enoe` (B) become pairs `mx-igae` already holds (`-> sna-2008` B, `-> mx-enoe` A). Same document,
  same claim, counted twice.
- **5 `_dropped` notes name a retired id**, all in the two 2026-08 wiring slices: `mx-enigh-salud -> null`
  (`no-document`, COICOP lead — re-points cleanly to `mx-enigh`), the two `note`s
  `mx-enigh-salud/-transferencias -> mx-enigh` (**become self-referencing after the merge** — the write should
  prepend "RESOLVED by the 2026-10-05 merge" and keep their original endpoints rather than re-point them),
  and two `resolved` notes `mx-igae-actividades -> sna-2008 / naics` (re-point; both pairs are live on
  `mx-igae`, which `resolved` allows under rule 10).

| | before | after |
|---|---|---|
| `mx-cngmd` | rank 1,736, authority 0.01391 | rank 644, 0.01687 (+21%) |
| `mx-enigh` | rank 110 | rank 110 |
| `mx-igae` | rank 455 | rank 455 |
| `mx-enoe` | rank 136, 0.04155 | rank 160, 0.03733 (−10%) |

**`mx-enoe` falls because a double-count is removed**: it was receiving the same IGAE-boletín citation twice.
**8 of 3,675 nodes change authority by more than 1%.**

**The gauge was changed during this run.** The first simulation reported a node moving 1,459 places
(`gm-gbos-cpi`) with its authority unchanged to 14 decimal places — it shares that floor value with 65 other
nodes, and float noise reshuffles a tied block. `scripts/simulate-merge.ts` now counts authority moves above 1%
instead of rank moves; the Brazil note's rank-based figure carries a correction marker.

## Questions for Thomas

1. **Write the three merges, the two duplicate drops and the four url repairs?**
2. The two judicial "statistical presence" nodes are institution-as-a-node scaffolding, like `uy-ssc` — a
   corpus-wide question (§3), not one to settle here. Leave them?
