# Housing-policy tag — 2026-10-17 (WRITTEN the same day)

**STATUS: WRITTEN 2026-10-17** (Thomas: *"a, then run the write pass"* — general property taxes ARE tagged). `housing-policy`
added to the `Domain` union and `DOMAINS` in `src/lib/types.ts` (validate: **47 approved, 0 proposed**). **49 nodes tagged**
(the 24 + the 25 property-tax set), **`housing` added to 5** measurement nodes and **removed from 5** mis-tagged ones (each
keeps another domain), across 25 slices, each backed up first to `_to_delete/*.pre-housing-policy-2026-10-17.json`; change
log `Claude outputs/housing-policy-2026-10-17/write-log-2026-10-17.json`. `validate` exit 0, 128/128, `tsc` clean, counts and
grades unchanged; 49 carry `housing-policy`, `housing` stays at 50.
**Each tagged node's own document was fetched first:** 39 answered with a housing/property term in the text; **10 could not
be read from this machine** — `dof-insured-mortgage-qualifying-rules` and `ma-casablanca-taxe-habitation` (curl 000, with
and without `-k`), `on-portable-housing-benefit` and `on-education-tax-rates` (Ontario e-Laws, an empty JS shell),
`tx-lgc-231` (403), `ottawa-tax-policy` (an Incapsula bot wall), and **two dead urls: `ng-lagos-luc-law-2018` and
`edmonton-tax-rate-bylaw` answer 404**. Tagged anyway on the ruling; each result is in the write log.
**Re-grade of the two C edges changed nothing, for route reasons, not evidence:** `on-portable-housing-benefit ->
cmhc-rental-market-survey` (Ontario e-Laws, `empty:tiny-body`) and `la-city-rso-allowable-increase -> bls-cpi-los-angeles`
(the LA code library behind a Cloudflare challenge, 403). Both bases already carry the legal formula verbatim, so the route
to A is a browser read of each page and a reader-accepted `evidence_quote` (`playbook/corpus-route.md`: a browser read is a
direct read). The dry run's failed reads were overwritten back from backup in `evidence-cache/`. The dry-run account follows.

**Rulings (Thomas, 2026-10-17):** a new closed-union domain value **`housing-policy`** for anything that ACTS on the
housing, rental or mortgage market (not only price or rent controls); and the **tagging bar** — a node is tagged only
when its own document is about the housing, rental or mortgage market, i.e. that market is in the document's scope, not
merely a possible effect. General monetary policy, immigration targets and income tax stay untagged and show through
their edges. The existing `housing` domain keeps meaning MEASUREMENT of the market; an influence node carries
`housing-policy` plus its existing domain, so the channel is the intersection (`housing-policy` ∩ `taxation`, ∩
`financial-regulation`, ∩ `benefits` …) and the app's existing domain filter (`src/lib/filter.ts`) singles them out.

**Method.** `reports` whose title or description matches a housing-market term list (mortgage, rent/rental, tenancy,
property / land-transfer / vacancy tax, LTV/DTI, macroprudential, permits, zoning, social housing, home-buyer, plus
Spanish, French, German, Portuguese and Dutch equivalents): **283 candidates**, every one read and classified by hand.
Classification: `Claude outputs/housing-policy-2026-10-17/classification.json` (counts below are `tsx` over it).
**The classification read node titles and descriptions, which are leads, not evidence** (`PLAYBOOK-CORPUS.md` rule 15);
a tag creates no edge, so the risk is a wrong filter result, but the write pass should open each document behind a tag.

## Result

| class | n | nodes |
|---|---|---|
| **TAG — credit & mortgage rules** | 5 | `osfi-b20`, `osfi-mqr-uninsured`, `cmhc-mortgage-loan-insurance`, `boc-mortgage-qualifying-rate`, `dof-insured-mortgage-qualifying-rules` |
| **TAG — housing-specific taxes** | 4 | `ma-casablanca-taxe-habitation`, `bc-additional-school-tax`, `toronto-mltt` (land transfer + non-resident speculation tax), `bc-residential-school-tax-rates-order` |
| **TAG — subsidies & rent supports** | 5 | `bc-housing-rental-assistance-program`, `on-portable-housing-benefit`, `mb-rent-assist`, `ns-cns-thb`, `qc-pslq` |
| **TAG — rent & tenancy regulation** | 3 | `la-city-rso-allowable-increase`, `la-county-rstpo-allowable-increase`, `qc-loyer-modique-regulation` |
| **TAG — supply & land use** | 3 | `ca-hcd-rhna-determination`, `scag-rhna-allocation-plan`, `tx-lgc-231` (county zoning authority) |
| **TAG — public & social housing** | 4 | `grande-spirit-requisition`, `gy-vivienda`, `on-hpp`, `la-county-homeless-housing-tax-fund-report` |
| **RULING — general property tax** | 25 | bylaws, rate orders and statutes taxing every property class, residential included (Calgary, Edmonton, Grande Prairie city and county, Regina ×2, Saskatoon, Ottawa, Mississauga, Guelph, Ontario education rates, Alberta education requisition, TransLink, PEI, LA County, Harris County, Houston revenue cap, California's Prop 13 inflation factor, Nijmegen OZB, Wet WOZ, Lagos LUC, Egypt, Ethiopia, and two low-income homeowner tax-relief programs) |
| **MEASUREMENT missing `housing`** | 5 | `cmhc-rental-market-survey`, `cmhc-residential-mortgage-industry-report`, `eurostat-remuneration-rent-survey`, `ae-dld-realestate`, `au-abs-building-approvals` |
| **`housing` tag looks WRONG** | 5 | `bc-non-residential-school-tax-rates-order` (non-residential by its own title), `tw-land-use-industrial` (industrial land), and three municipal finance documents (`metro-vancouver-financial-statements`, `-financial-plan`, `loyalist-financial-statements`) |

**24 nodes clear the bar outright; 25 more wait on one ruling.** Everything else among the 283 is a census, a
general CPI, a municipal finance document, a statistical-system instrument, or a false match ("Renta Dignidad" is a
pension).

**The general-property-tax question.** These documents set the tax every homeowner and landlord pays, so they act on
the market — but their scope is municipal revenue across all property classes, not the housing market. Under a strict
reading of the bar they are borderline. Options: (a) tag them `housing-policy` (the residential class rate is in the
document); (b) tag only the residential-specific ones, which is what the 4 housing-specific taxes above already are;
(c) leave all 25 untagged.

**Influence is already wired, in 9 edges** — an influence node to a housing measurement or a CPI:

| edge | rel | grade |
|---|---|---|
| `mb-rent-assist -> cmhc-rental-market-survey` | uses_data_from | B |
| `ns-cns-thb -> cmhc-rental-market-survey` | uses_data_from | B |
| `on-portable-housing-benefit -> cmhc-rental-market-survey` | calculated_from | C |
| `qc-loyer-modique-regulation -> statcan-cpi` | calculated_from | A |
| `la-city-rso-allowable-increase -> bls-cpi-los-angeles` | calculated_from | C |
| `la-county-rstpo-allowable-increase -> bls-cpi-los-angeles` | calculated_from | A |
| `ca-boe-inflation-factor-lta -> ca-dir-ccpi` | calculated_from | A |
| `houston-revenue-cap -> bls-cpi-houston` | calculated_from | A |
| `cmhc-residential-mortgage-industry-report -> osfi-b20` | cites | B |

The CMHC Rental Market Survey is already the hub three provincial rent supports are built on — and it is not tagged
`housing`. Two of the 9 are C and are the obvious first re-grades (`on-portable-housing-benefit`, the LA City RSO).

## Write pass, when approved

1. Add `'housing-policy'` to the `Domain` union and `DOMAINS` in `src/lib/types.ts` (dated comment, the 2026-08-18 shape);
   check whether `palette.ts` or any domain map needs an entry; `validate`.
2. Tag the 24 (+ the property-tax set if ruled in), opening each document behind a tag; add `housing` to the 5
   measurement nodes; remove it from the 5 mis-tagged.
3. Re-grade the two C edges above.
4. Then fill the thin channels by research — supply/land use and social housing have 3 and 4 nodes corpus-wide.
