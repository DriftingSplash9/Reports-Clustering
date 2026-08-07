# Prompt for Grok, round 7 — the rest of the EU, one batch

**Paste this whole file as the first message. Then paste `Research.1.md`
(project root) immediately after it.** Continuation of rounds 1–6.

**Round 6 was the best round so far — the four-category framing worked
cleanly, and when Statbel didn't make the statement you were looking for, you
flagged the National Bank of Belgium as a lead instead of going and researching
it yourself. That is exactly the right instinct; keep doing it.**

This round closes out EU membership coverage entirely: **fourteen countries**,
plus two loose ends from round 6. After this round, every EU member state will
have been tested at least once. Round 8 (separate, later) moves fully to the
non-EU European neighborhood — candidates, EFTA leftovers, and the rest.

---

## 1. Scope rule, unchanged, working well

Same as rounds 5–6: research exactly what's assigned below. If you notice a
lead outside this list, name it in `meta` and stop — don't chase it. This
worked well last round; no changes needed.

---

## 2. One schema fix — restore the fuller node shape

Round 6's `candidate_nodes` only had `id` / `title` / `publisher` / `country` /
`url`. Round 4 had more, and it's more useful — go back to that shape:

```json
{
  "id": "...",
  "title": "...",
  "publisher": "...",
  "country": "XX",
  "jurisdiction_level": "national",
  "region": "the country name",
  "description": "one or two sentences — what this release is and what it covers",
  "releases_per_year": 1,
  "url": "...",
  "domains": ["national-accounts"]
}
```

Everything else about the schema — `relationship_word`, separate `quote` /
`location` / `tense`, `kind` on `non_findings` — worked correctly last round.
Keep it exactly as is.

---

## 3. Two loose ends from round 6

1. **Belgium — go straight to the National Bank of Belgium's Institut des
   comptes nationaux**, which you correctly identified as the actual compiler.
   Find its own methodology documentation and run the same test there instead of
   on Statbel.
2. **Croatia** — assigned in round 5, never confirmed as delivered. If you
   already have it from an earlier response, say so in `meta` and don't redo it.
   If not, it's item 15 below.

---

## 4. The fourteen — plus Croatia, fifteen total

Same core test as every round: does each country's national statistics office
state, in its own words, that it depends on or is obliged by ESA 2010 (or
whatever it actually names)? Quote it exactly. All fourteen are EU members, so
expect binding language (**"shall," "must," "in compliance with," "applies as
law"**) — the same bucket as Germany, France, Spain, Sweden, etc. **If any of
these fourteen surprises you with weaker or different language than that, flag
it clearly — that would be a genuinely unexpected result worth its own note in
`meta`, since EU membership should mean the same binding shape every time.**

1. **Bulgaria — NSI (Национален статистически институт)**
2. **Cyprus — CyStat (Στατιστική Υπηρεσία)**
3. **Denmark — Statistics Denmark (Danmarks Statistik)**
4. **Finland — Statistics Finland (Tilastokeskus)**
5. **Greece — ELSTAT (ΕΛΣΤΑΤ)**
6. **Hungary — HCSO (KSH)**
7. **Ireland — CSO (An Phríomh-Oifig Staidrimh)**
8. **Lithuania — Statistics Lithuania**
9. **Latvia — Central Statistical Bureau of Latvia**
10. **Malta — NSO Malta**
11. **Portugal — INE Portugal**
12. **Romania — INS (Institutul Național de Statistică)**
13. **Slovenia — SURS (Statistični urad)**
14. **Slovakia — Štatistický úrad SR**
15. **Croatia — DZS (Državni zavod za statistiku)** — from round 5, do only if not already delivered.

---

## 5. Depth — the core test only, for all fifteen

Fifteen items in one round is more than round 6's ten. **Prioritize the
legal-basis quote for every single one over depth on any of them.** Do not dig
for named registers or central-bank links this round unless one is sitting
directly in the same source you're already reading for the legal-basis quote —
this round is about finishing coverage, not going deep. Depth passes on
individual countries can come later if any of these turn out to have unusually
rich public documentation.

**The central-bank-compiles-BoP pattern is still closed** (six confirmations
now including Switzerland's structure). Don't search for it.

---

## 6. Do not re-open these

Everything confirmed in rounds 1–6 — Germany, France, Netherlands, Poland,
Italy, Czechia, Norway, Spain, Austria, Sweden, Estonia, Iceland, Liechtenstein,
Switzerland, Serbia, the UK, and Luxembourg's wage-indexation law. All closed,
don't re-quote.

---

## 7. Do not duplicate these node ids

```
esa-2010, eu-draft-budget, ec-statement-of-estimates, eurostat-hicp,
eurostat-farm-structure-survey, eurostat-remuneration-update-report,
eurostat-remuneration-satellite-series, eurostat-remuneration-mission-expenses-report,
eurosystem-ecb, ecfin-business-consumer-surveys, eurostat-edp-gfs-ecb-statistics,
de-destatis-national-accounts, lu-statec-ipch, lu-statec-ipcn,
sna-2008, imf-bpm6, imf-gfsm, ipsas, bis-basel-framework,
naics, un-census-principles, icls-work-statistics-resolution, cpi-manual,

nordic-statistics-database, nato-defence-expenditure, no-ssb-national-accounts,
fr-insee-national-accounts, oecd-icio, fr-insee-base2020-methodo,
eu-manual-rd-esa2010, fr-insee-esane, oecd-frascati-manual,
nl-cbs-gni-inventory-2010, nl-cbs-sbs, nl-dnb-bop, nl-cbs-sbr,
pl-gus-national-accounts, it-istat-national-accounts, it-istat-asia-enterprises,
it-istat-frame-sbs, it-bdi-bop, cz-csu-national-accounts, cz-cnb-bop,
es-ine-national-accounts, at-statistik-austria-national-accounts,
se-scb-national-accounts, ee-statistics-estonia-national-accounts,
is-hagstofa-national-accounts, li-amt-statistik-vgr, ch-bfs-national-accounts,
rs-sors-national-accounts, gb-ons-national-accounts
```

Full list: `Research.1.md` §9. **New id prefixes this round:** `bg-`, `cy-`,
`dk-`, `fi-`, `gr-`, `hu-`, `ie-`, `lt-`, `lv-`, `mt-`, `pt-`, `ro-`, `si-`,
`sk-`, `hr-`, and `be-` for the NBB redirect.

---

## 8. Format

Unchanged from round 6, with the node-shape fix from §2. One JSON object, or
clearly labeled parts if you split it. Send each finding once — no repeated
identical blocks.

```json
"meta": {
  "researcher": "grok",
  "round": 7,
  "date": "YYYY-MM-DD",
  "countries_covered": ["BG","CY","DK","FI","GR","HU","IE","LT","LV","MT","PT","RO","SI","SK","HR?","BE-redo"],
  "surprises": "any country whose language wasn't the expected binding-member shape — name it, otherwise say 'none, all fifteen used binding language'",
  "leads_not_researched": "anything noticed but not chased"
}
```

---

## 9. The seven things that matter (unchanged)

1. Quote verbatim, in its own field, with a location.
2. One entry per provision — never bundle.
3. No verdicts, including `relationship_type` — report the words used.
4. `agency_only` and `not_found` are results.
5. Check the tense.
6. Quote non-English sources in the original, translation underneath.
7. Only these fifteen (plus the Belgium redirect). Name anything else in `meta`.
