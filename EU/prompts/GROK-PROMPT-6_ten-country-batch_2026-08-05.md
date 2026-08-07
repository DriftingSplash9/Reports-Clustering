# Prompt for Grok, round 6 — ten countries, four of them not EU members

**Paste this whole file as the first message. Then paste `Research.1.md`
(project root) immediately after it.** Continuation of rounds 1–5.

**This round is deliberately large — ten countries at once — specifically so
you have no reason to add an eleventh on your own initiative. The rule from
round 5 still stands (§1), but this time you have plenty of assigned room to
work in, not a thin ration.**

---

## 1. The scope rule, still in force

Same as round 5: `Research.1.md` is the evidence standard, not a task list.
Research exactly the ten countries in §3, nothing self-selected — including
anything the brief itself suggests. If you notice a promising lead outside
these ten while researching, name it in one line in `meta` under
`leads_not_researched` and stop there.

**One outstanding mechanical job first, then the batch.**

---

## 2. Job 0 — repackage Luxembourg (from round 4/5), if not already done

If you already delivered this in a prior response, skip it and say so in
`meta`. Otherwise: you found that Luxembourg's *Loi du 25 mars 2015*, Art. 3,
names STATEC's published consumer price index as the trigger for statutory
wage adjustments. Put it through the standard schema — separate `quote` /
`location` / `url` / `tense` fields, no bundling — and confirm whether Art. 3
cites the harmonised index (`lu-statec-ipch`) or the national one
(`lu-statec-ipcn`), since that wasn't clear before. Re-verify both URLs fresh;
prior copies had a stray character merged into them.

---

## 3. The ten countries — four different relationships to the EU, on purpose

Every country below gets the same core test from `Research.1.md` §3–4: does its
national statistics office state, in its own words, that it depends on or is
obliged by an EU instrument (ESA 2010 most likely, but note anything else it
names). **But the ten fall into four different categories, and the interesting
result this round is which category each one's language actually falls into —
not just whether an edge exists.**

### Category A — EU members, filling out coverage (5 countries)

Already confirmed for Germany, France, Netherlands, Poland, Italy, Czechia
(and Croatia, assigned last round — see note in §5). These five round out the
picture: two of the "big five" EU economies not yet tested, one state
structurally entangled with EU institutions by geography, and two Nordic/Baltic
states.

1. **Spain — INE** (Instituto Nacional de Estadística)
2. **Belgium — Statbel** — notable because Brussels hosts the EU institutions
   themselves and is the reference city in the EU staff salary mechanism
   (already in the corpus via Annex XI); worth noting if that proximity shows up
   in Statbel's own documentation at all.
3. **Austria — Statistik Austria**
4. **Sweden — Statistics Sweden (SCB)**
5. **Estonia — Statistics Estonia** — reputed for strong digital-government
   infrastructure; worth noting whether that correlates with documentation
   quality the way it did for the Netherlands.

Expect these to land in the same bucket as Germany/France/Netherlands/Italy/
Czechia: binding member-state obligation language ("shall," "must comply,"
"in accordance with," "legal basis").

### Category B — EEA/EFTA, bound without a vote (3 countries)

Norway is already confirmed (*"legally committed through the EEA
Agreement... to report national accounts data to Eurostat/EU"*). These three
complete the set and test whether the obligation language holds at different
scales.

6. **Iceland — Statistics Iceland (Hagstofa Íslands)** — same EEA mechanism as
   Norway; check whether the obligation is stated in the same terms.
7. **Liechtenstein — Amt für Statistik** — the interesting open question here is
   whether Liechtenstein even compiles distinct national accounts of its own, or
   whether its statistics are produced jointly with or by Switzerland given the
   customs and currency union between them. **If you can't find a distinct
   Liechtenstein national-accounts publication, say so plainly as a `not_found`
   — that is itself the answer, not a failure to search hard enough.**
8. **Switzerland — Federal Statistical Office (BFS/OFS/UST)** — structurally
   different from the other two: Switzerland is bound by roughly 120 bilateral
   treaties with the EU, not the EEA Agreement. Check specifically whether the
   obligation language differs from Norway's and Iceland's EEA-Agreement
   phrasing, or reads the same in substance.

### Category C — EU candidate, voluntary alignment (1 country)

9. **Serbia — Statistical Office of the Republic of Serbia (RZS/SORS)** — an EU
   candidate country since 2012, subject to Eurostat's pre-accession compliance
   monitoring (the Statistical Requirements Compendium exists partly for this).
   **The expected relationship language here is different in kind from
   Categories A and B** — not "shall" or "legally committed," but something
   closer to "in the process of aligning with," "in preparation for accession,"
   or "adopting the methodology of." If you find that language, quote it exactly
   as written — the distinction between binding and aspirational language is the
   actual finding here, not just whether an edge exists.

### Category D — Former member, the historical case (1 country)

10. **United Kingdom — Office for National Statistics (ONS)** — bound by ESA
    2010 as an EU member until 2020, now independent. **This is a direct test of
    trap 4b (tense).** Look for whether ONS's current national accounts
    methodology still references ESA 2010 at all, and if so, in what tense and
    for what stated reason:
    - **Past tense, historical** ("until 2020, UK national accounts were
      compiled under ESA 2010") — a dead arrangement, log it as such.
    - **Present tense, voluntary continuity** ("continues to align with ESA 2010
      for international comparability") — a live but now-optional relationship,
      structurally different from binding membership.
    - **No reference to ESA 2010 at all**, UK-specific framework only — also a
      real and useful result; say so.

---

## 4. Depth — the core test for all ten, deeper only where it's cheap

With ten countries in one round, **prioritize getting the legal-basis /
obligation-language test done cleanly for all ten** over exhaustively naming
every survey for two or three of them. If a country's documentation makes a
named register or central-bank link obvious and cheap to grab (the way EVAS was
for Germany), take it — but don't dig for it if it's not sitting right there.

**On the central-bank-compiles-BoP pattern specifically: still closed, per
round 5.** Log one entry only if you land on it naturally; do not search for it
across all ten.

---

## 5. Do not re-open these

Same list as round 5, plus:

| Item | Disposition |
|---|---|
| Croatia (assigned round 5) | If you already delivered it, don't redo it — just confirm in `meta` whether it's included in this batch or was already sent. If round 5 was never run, treat Croatia as an eleventh country this round and note that explicitly. |
| Germany, France, Netherlands, Poland, Italy, Czechia, Norway — all confirmed edges | Closed, don't re-quote. |
| The central-bank-compiles-BoP pattern | Confirmed five times, closed as a finding (see §4). |

---

## 6. Do not duplicate these node ids

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
it-istat-frame-sbs, it-bdi-bop, cz-csu-national-accounts, cz-cnb-bop
```

Full list: `Research.1.md` §9. The corpus has grown from other work happening on
this branch in parallel — just make sure your new ids don't collide with the
list above.

**New id prefixes for this round:** `es-`, `be-`, `at-`, `se-`, `ee-`, `is-`,
`li-`, `ch-`, `rs-`, `gb-`.

---

## 7. Format — unchanged from round 4/5

Same JSON object, same four arrays (`candidate_nodes`, `candidate_edges`,
`non_findings`, `termini`), same corrected field shape — `relationship_word`
(never `relationship_type`), separate `quote` / `location` / `tense` fields,
`kind` on `non_findings`. One JSON object per country is fine if that's easier
to manage at this scale — label each clearly with the country in a comment line
or in an id prefix, and send them together or in clearly labeled parts
(`PART 1 of N`).

```json
"meta": {
  "researcher": "grok",
  "round": 6,
  "date": "YYYY-MM-DD",
  "countries_covered": ["ES","BE","AT","SE","EE","IS","LI","CH","RS","GB"],
  "categorization": {
    "binding_member": ["which of the ten used binding obligation language"],
    "eea_bilateral_bound": ["which used EEA/treaty language, and whether it differed between EEA and bilateral"],
    "candidate_voluntary": ["what Serbia's actual language was"],
    "former_member": ["what the UK's ONS actually says, and in what tense"]
  },
  "leads_not_researched": "anything you noticed but did not chase, one line each"
}
```

---

## 8. The seven things that matter (unchanged)

1. Quote verbatim, in its own field, with a location.
2. One entry per provision — never bundle.
3. No verdicts, including `relationship_type` — report the words used.
4. `agency_only` and `not_found` are results — use `kind` to say which.
   Liechtenstein and the UK may both produce `not_found` results and that's a
   fine outcome, not a gap to fill by searching harder.
5. Check the tense — Category D (the UK) is built specifically to test this.
6. Quote non-English sources in the original, translation underneath.
7. Only these ten (plus Job 0). Name anything else in `meta`, don't research it.
