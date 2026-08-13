# Norway KOSTRA chain — per-claim verdicts (2026-08-07)

Built per `EU/G.49.md` cheap check 5 / priority G(a), reproducing the shape of
`src/data/research/nl-municipal-finance.json` (and the UK chain) for Norway.
All fetching via WebFetch only. Norway filed as country `NO`,
`jurisdiction_level` `federal` for national releases / `institutional` for the
regulation — matching the existing `no-ssb-national-accounts` node (Norway is
in the corpus as a non-EU EEA country; no `supranational` claims made).

Pre-existing Norway id checked: `no-ssb-national-accounts` (grok-r1 slice,
already carries the ESA 2010 / EEA edge). Not touched, no near-duplicates
minted. New ids: `no-ssb-kostra`, `no-kostra-forskriften`,
`no-kdd-gront-hefte`, `no-ssb-general-government-finances` — none in
`merge-work/live-ids.txt`.

## Claim 1 — KOSTRA is a recurring official SSB release → VERIFIED (node `no-ssb-kostra`)

Fetched https://www.ssb.no/en/offentlig-sektor/statistikker/kostrahoved and
the preliminary-figures variant (`/aar-forelopige`):

> "KOSTRA is an abbreviation for municipality-state reporting. Through
> KOSTRA, all Norwegian municipalities and county authorities submit data
> from their service areas to Statistics Norway."

> "The key figures in KOSTRA provide information on most of the municipal and
> county municipal activities, including finance, schools, health, culture,
> the environment, social services, public housing, technical services and
> transport and communication."

Cadence: preliminary figures 15 March, audited figures 15 June; page live
(last updated 15 June 2026, next update 15 March 2027). Filed
`releases_per_year: 2` with a cadence_note.

Bilingual as the scout promised: English statistic pages fetch fine; the
detailed Om statistikken (About the statistics) archive pages fetched in
Norwegian (see Claim 2). The scout's "as strong as the Dutch Toelichting"
call holds up — the mandate, the deadlines, the input list and the
downstream grant use are all documented in fetchable official pages.

## Claim 2 — a regulation mandates municipal reporting into KOSTRA → VERIFIED with a caveat (node `no-kostra-forskriften`)

**lovdata.no is NOT fetchable**: every lovdata URL tried
(https://lovdata.no/dokument/SF/forskrift/2019-10-18-1412) returned
`ROBOTS_DISALLOWED` from WebFetch. Recorded honestly; the node's `url` points
to the canonical lovdata consolidation (found via search results that cite
exactly this document, title and number) but that URL was not fetch-verified.

The regulation's citation, hjemmel and operative duties were instead verified
from two fetched official sources:

1. SSB Om statistikken for KOSTRA
   (https://www.ssb.no/offentlig-sektor/statistikker/kostrahoved/aar-forelopige/2021-03-15?fane=om),
   hjemmel section:
   > "Lov om kommuner og fylkeskommuner (kommuneloven) av 22.06.2018 nr. 83,
   > § 16-1" ... "Lov om offisiell statistikk og Statistisk sentralbyrå
   > (statistikkloven) av 21. juni 2019 nr. 32 § 10 (1)"
   Data sources section: "Data fra kommuner og fylkeskommuner rapporteres
   elektronisk til SSB"; input list includes "Kommuneregnskap (KOSTRA,
   skjema 0A, 0B, 0I, 0J, 0M, 0N)".

2. The ministry's own Veileder til KOSTRA-forskriften (PDF fetched from
   https://www.regjeringen.no/contentassets/457fbe59592248e1a2b3b57ebe033e97/veileder-til-kostra-forskriften.pdf;
   landing page id2703425 also fetched):
   > "Forskrift 18. oktober 2019 nr. 1412 om rapportering fra kommuner og
   > fylkeskommuner mv." — supplements kommuneloven § 16-1 and IKS-loven § 42.
   > "all rapportering til KOSTRA skal foregå elektronisk til Statistisk
   > sentralbyrå (SSB)"
   > "fristen for å rapportere opplysninger om ressursbruk og tjenester er
   > 15. februar"
   > "fristen for å rapportere årsregnskapene er senest 22. februar i året
   > etter regnskapsåret"
   > "Forskriften trådte i kraft 1. januar 2020, og gjelder fra og med
   > rapporteringen for 2020 som foretas i 2021"

   Also regjeringen.no's "Regelverk om rapportering i KOSTRA" (id551597):
   > "Kommuner og fylkeskommuner plikter etter kommuneloven å gi
   > departementet løpende informasjon om ressursbruk og tjenesteyting"

**Judgement call for the integrator**: the minting rule says quote the
instrument itself; lovdata being robots-blocked, the node rests on the
ministry's guide reproducing the forskrift's citation and duties verbatim. I
minted it (the alternative — dropping the whole mandate leg of the chain over
a robots.txt rule while the issuing ministry's own guide quotes the rules —
seemed like the less honest representation), filed `institutional` like
`nl-bbv`, and flagged the caveat in the node's cadence_note and slice _note.
Demote to `_dropped` if you disagree.

Kommuneloven itself: NOT minted (`_dropped`, reason `unreadable-source`) —
statute text only on lovdata, quotes preserved in the dropped note.

## Claim 3 — the grant system (inntektssystemet / Grønt hefte) names KOSTRA as its data source → VERIFIED, the high-value edge (node `no-kdd-gront-hefte`)

Landing page (regjeringen.no id547024) fetched:
> "Beregningsteknisk dokumentasjon (Grønt hefte) viser fordelingen av
> rammetilskuddet for den enkelte kommune og fylkeskommune"
Published annually as an attachment to the state budget proposal (Prop. 1 S)
by Kommunal- og distriktsdepartementet.

The 2026 edition PDF (h-2570-n) fetched directly:
> "Utgiftsbehovet for 2026 er berekna med rekneskapstal for 2024 henta frå
> KOSTRA/SSB." [expenditure need for 2026 calculated with 2024 accounting
> figures taken from KOSTRA/SSB — county-authority expenditure equalization]
> Sector-weight table source: "Netto driftsutgifter ekskl. avskrivingar
> KOSTRA 2024" [municipal cost key]
> "Kriteriedata er baserte på statistikk frå mellom anna Statistisk
> sentralbyrå (SSB), Finansdepartementet, Helsedirektoratet (Hdir) og
> Utdanningsdirektoratet."

Edge `no-kdd-gront-hefte -> no-ssb-kostra` filed as `calculated_from`
(statutory-formula grant documentation computing expenditure need from KOSTRA
accounting figures — same typing logic as the Dutch and Ontario chains).

## Claim 4 — edge to national accounts / international standard → VERIFIED via one intermediate node (`no-ssb-general-government-finances`)

KOSTRA itself has **no** direct international obligation — SSB's own Om
statistikken answers international reporting with "Ikke relevant". The
scouted ESA link therefore does NOT attach to KOSTRA directly; direct
`no-ssb-kostra -> esa-2010` filed to `_dropped` (reason `no-document`).

The documented bridge is SSB's General government revenue and expenditure
(offinnut). English landing page fetched — live, quarterly + annual, next
release 7 September 2026. Its Om statistikken
(https://www.ssb.no/offentlig-sektor/statistikker/offinnut/aar/2015-02-26?fane=om)
gives both edges:

KOSTRA as input:
> "Kommunene, fylkeskommunene, de kommunale og fylkeskommunale foretakene, de
> interkommunale samarbeidene og kirkelige fellesrådene rapporterer uttrekk
> fra sine regnskaper direkte til SSB gjennom KOSTRAs rapporteringsportal."

ESA 2010 as framework (existing corpus id `esa-2010`):
> "Statistikken er basert på internasjonale standarder for nasjonalregnskap
> og statistikk om offentlige finanser. Disse er først og fremst FNs System
> of National Accounts 2008 (SNA2008) og EUs European System of Accounts
> 2010 (ESA2010)."
Plus Eurostat/OECD/IMF reporting under **EEA** commitments — kept the
EEA-not-EU framing explicit in the basis, consistent with
`no-ssb-national-accounts`.

Note: this Om page is a 2015 archive snapshot (SSB keeps Om statistikken
under dated archive URLs); the statistic itself is live per the current
landing page. If a fresher Om snapshot is wanted, the ?fane=om archive list
is at the statistic page.

## Dropped summary

| claim | verdict | reason |
|---|---|---|
| kommuneloven § 16-1 as a node | DROPPED | `unreadable-source` — lovdata robots-blocked; quotes preserved |
| KOSTRA <- municipal årsregnskap (municipal-level node) | DROPPED | `no-node-yet` — the nl-iv3-rapportage analogue; quotes and deadline preserved for a later pass |
| KOSTRA -> esa-2010 direct | DROPPED | `no-document` — SSB says "Ikke relevant"; bridge runs through offinnut instead |

## For the next session

- Promote the municipal `årsregnskap` node (kommuneloven ch. 14) to complete
  the municipal-level leg, mirroring `nl-iv3-rapportage`.
- If lovdata ever becomes fetchable (or an official English translation of
  kommuneloven surfaces on regjeringen.no), harden `no-kostra-forskriften`
  and mint kommuneloven.
- Possible extra edge, not attempted: `no-ssb-national-accounts` ->
  `no-ssb-kostra` (the annual national accounts almost certainly consume
  KOSTRA via the general-government accounts, but no document was fetched
  saying so; offinnut was the page that says it explicitly).
- Failed URLs for the record (all 404, old SSB URL scheme):
  ssb.no/en/offentlig-sektor/kommunale-finanser-og-regnskaper/statistikk/kostra-nokkeltall,
  .../statistikk/kommuneregnskap, ssb.no/en/offentlig-sektor/kommunale-finanser-og-regnskaper,
  ssb.no/innrapportering/offentlig-sektor/kostra-rapportering, and the
  English kostrahoved `?fane=om` variant. The working pattern is
  `ssb.no/offentlig-sektor/statistikker/kostrahoved/...` (no `/en/` for Om
  archive pages).
