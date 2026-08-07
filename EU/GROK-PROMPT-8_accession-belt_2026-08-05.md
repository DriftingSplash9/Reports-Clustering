# Prompt for Grok, round 8 — the accession belt, plus one deliberate dead end

**Paste this whole file as the first message. Then paste `Research.1.md`
(project root) immediately after it.** Continuation of rounds 1–7.

**All 27 EU member states are now covered — round 7 closed that out with zero
surprises across sixteen countries in one clean batch. This round pivots fully
away from the EU membership question and onto the belt of countries around it:
candidates, potential candidates, and one microstate included specifically to
test a `not_found` result on purpose.**

---

## 1. One correction from round 7 — not your error, mine

Round 7's schema example used `"jurisdiction_level": "national"`. That's not a
valid value in this project's type system — the actual options are
`international`, `supranational`, `federal`, `provincial`, `municipal`,
`institutional`. **Use `federal` for every national statistics office you
research, EU member or not** — that field describes the domestic administrative
tier (a country's own top-level statistics office), not EU membership status.
This applies to everything in this round.

---

## 2. Scope rule, unchanged

Same as rounds 5–7. Research exactly what's assigned below. Name anything else
in `meta`, don't chase it.

---

## 3. This round's actual question

Round 6 found that Serbia, an EU candidate, uses language distinctly different
from a member state's binding "shall" — *"harmonised with,"* *"on the way to
harmonization with."* That's one data point. **Is that Serbia specifically, or
is it what candidate-country language looks like generally?** This round tests
it across the rest of the accession belt.

There's also a specific instrument worth checking for directly: `Research.EU.md`
already names Eurostat's **Statistical Requirements Compendium** as a document
that *"serves as the framework for conducting compliance monitoring of the
enlargement countries (candidate countries and potential candidates)."* If any
of these countries' own statistics offices cite the SRC, or if you can find the
SRC's own text naming a specific candidate country's obligations, that's a
direct hit on an EU-side document naming a non-member by name — which would be
a different and stronger finding than anything found so far, since every
confirmed edge to date runs from the national office's own words, not from an
EU instrument naming the country back.

---

## 4. The ten

### Candidates and potential candidates — expect Serbia's shape (7 countries)

1. **Montenegro — MONSTAT** (Zavod za statistiku Crne Gore)
2. **North Macedonia — MAKStat** (Државен завод за статистика)
3. **Albania — INSTAT** (Instituti i Statistikave)
4. **Bosnia and Herzegovina — BHAS** (Agencija za statistiku BiH)
5. **Turkey — TurkStat** (Türkiye İstatistik Kurumu) — the longest-standing
   candidate by far (since 1999); worth noting if its language differs from the
   newer candidates given the much longer relationship.
6. **Ukraine — State Statistics Service of Ukraine** — candidate status granted
   2022; worth checking for any note about how the ongoing accession process
   has or hasn't affected published methodology, given the exceptional
   circumstances.
7. **Moldova — National Bureau of Statistics of Moldova** — candidate status
   granted 2022, alongside Ukraine.

### A genuinely uncertain case (1 country)

8. **Georgia — National Statistics Office of Georgia (Geostat)** — candidate
   status granted only in late 2023, the most recent of the group. If the
   process is too new to have produced published methodology referencing EU
   alignment yet, that's a real and useful `not_found` — don't stretch to find
   something that isn't there.

### Kosovo — flag the status question itself, don't resolve it (1 entry)

9. **Kosovo — Kosovo Agency of Statistics (KAS)** — Kosovo's status is contested
   (not recognised by all EU member states, potential-candidate rather than
   candidate). **Do not adjudicate this — just note in `notes` whatever KAS's
   own documents say about their relationship to EU statistical standards, and
   quote it as-is.** This is exactly the kind of judgment call that belongs to
   review, not to research.

### A deliberate dead end (1 country)

10. **San Marino** — a European microstate with no EU membership and no
    candidate status, included specifically to test whether it produces
    national accounts in any ESA-comparable form at all, or whether it's a
    clean `not_found`. **A `not_found` here is a good result, not a failure** —
    it's a useful contrast against Liechtenstein (round 6), which turned out to
    have distinct national accounts despite being similarly small.

---

## 5. Depth — same as round 7, breadth over depth

Ten items, core legal-basis-or-equivalent test for each, don't dig for named
registers or central-bank links unless they're sitting right there. The
central-bank-BoP thread is still closed.

---

## 6. Do not re-open these

Everything confirmed in rounds 1–7 — all 27 EU member states, Norway, Iceland,
Liechtenstein, Switzerland, Serbia, the UK, Luxembourg's wage-indexation law.
All closed, don't re-quote.

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
rs-sors-national-accounts, gb-ons-national-accounts,
be-nbb-national-accounts, bg-nsi-national-accounts, cy-cystat-national-accounts,
dk-dst-national-accounts, fi-statfin-national-accounts, gr-elstat-national-accounts,
hu-hcso-national-accounts, ie-cso-national-accounts, lt-stat-national-accounts,
lv-csp-national-accounts, mt-nso-national-accounts, pt-ine-national-accounts,
ro-ins-national-accounts, si-surs-national-accounts, sk-susr-national-accounts,
hr-dzs-national-accounts
```

Full list: `Research.1.md` §9. **New id prefixes:** `me-`, `mk-`, `al-`, `ba-`,
`tr-`, `ua-`, `md-`, `ge-`, `xk-`, `sm-`.

---

## 8. Format — unchanged, `jurisdiction_level: "federal"` per §1

```json
"meta": {
  "researcher": "grok",
  "round": 8,
  "date": "YYYY-MM-DD",
  "countries_covered": ["ME","MK","AL","BA","TR","UA","MD","GE","XK","SM"],
  "does_serbias_pattern_generalize": "one sentence — did the other candidates use the same aspirational/harmonising language, or was Serbia's wording specific to Serbia?",
  "src_direct_hit": "did you find the Statistical Requirements Compendium, or any other EU-side document, naming a specific candidate country by name? yes/no and where",
  "leads_not_researched": "anything noticed but not chased"
}
```

---

## 9. The seven things that matter (unchanged)

1. Quote verbatim, in its own field, with a location.
2. One entry per provision — never bundle.
3. No verdicts, including `relationship_type` — report the words used.
4. `agency_only` and `not_found` are results — Kosovo, Georgia and San Marino
   may all produce one and that's a fine outcome.
5. Check the tense.
6. Quote non-English sources in the original, translation underneath.
7. Only these ten. Name anything else in `meta`.
