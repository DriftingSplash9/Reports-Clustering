# Prompt for Grok, round 3 — national depth only, three countries, no side quests

**Paste this whole file as the first message. Then paste `Research.1.md`
(project root) immediately after it.** Continuation of rounds 1 and 2.

**This round has a narrower job than the last two, on purpose.** No new
international bodies. No self-selected targets. **Three countries, done deep,
the way Germany was done.** If you finish early, go deeper on these three —
do not open a fourth country or a new body on your own initiative this round.

---

## 1. Round 2, briefly — what to keep doing and what to stop doing

**Keep doing this:** OECD came back almost entirely `agency_only` — *"the OECD
ICIO Tables primarily rely on detailed National Accounts tables submitted by
national statistical agencies"* — and you filed it correctly instead of forcing
an edge. The one borderline case, OECD naming Mexico's INEGI by institution and
table-year rather than by title, you flagged as limited rather than claiming a
clean win. That is exactly the right instinct — keep hedging honestly when a
finding is real but weak.

**Stop doing this:** two entries in your round 2 output re-opened items round
2's own prompt explicitly listed as closed — the ESA 2010 Annex B transmission
quote, and the ESA/SNA "consistent with" non-dependency. Both are the same
material already on file. **§3 below is the same list, and this time skip past
it without re-quoting it, even if you land on the source page again while
researching something else on it.**

**Also, packaging:** you sent four separate JSON objects again instead of one.
This round, if you cannot merge everything into a single object because you are
working across separate research passes, that is fine — but **label each one
`PART 1 of N`, `PART 2 of N`** etc. in the line before the code block, so it is
unambiguous which ones are new work and none get missed or double-counted.

---

## 2. This round's job — three countries, deep, using the method that worked

Round 1 and 2 covered breadth across bodies. This round is depth across
countries. The German work is the model: Destatis names its own inputs **by
title and by national statistical register number** (EVAS), not just by
institution. That is the level of detail to aim for in all three countries
below.

### France — finish what's started, don't restart it

You already have `fr-insee-national-accounts` (round 1, 3 edges) and
`fr-insee-base2020-methodo` (round 2, 2 edges, plus the R&D manual find). **Do
not re-quote either.** Instead:

1. **Resolve the relationship between those two documents.** Is
   `fr-insee-national-accounts` (the ESMS-style presentation page) and
   `fr-insee-base2020-methodo` (the "Documentation sur la méthodologie" PDF)
   documentation of the **same** underlying release, at two levels of detail —
   the way Destatis's Fachserie 18 release and its GNI inventory are two views
   of the same thing? Say plainly which you think it is, with a quote either way.
2. **Push into INSEE's full *sources et méthodes* library** beyond the two
   documents already found. Look specifically for named French surveys and
   register-style codes, the way EVAS numbers work for Germany — INSEE's own
   business register is **SIRENE**; the business-statistics survey system is
   **ESANE**, already glimpsed in round 2 (*"la comptabilité nationale s'appuie
   sur... Esane"*). Follow that thread to a specific named survey, not just the
   system name.
3. **Look for Banque de France** named as a source, the way Deutsche Bundesbank
   was named for Germany's financial accounts by sector. Same shape, different
   country — confirm or find it's absent.
4. **Chase the Frascati Manual.** The R&D manual you found cites it as the
   standard behind national R&D surveys. Find where INSEE's own R&D statistics
   (DIRDE/DIRDA, which you already have a quote naming) cite the Frascati Manual
   directly, by title, as their basis. If you can establish the Frascati
   Manual's publisher (OECD) and edition history, propose it as a candidate node
   in its own right — it would sit in this graph next to SNA 2008, BPM6, GFSM,
   IPSAS as a fifth international standard with a real national citation behind
   it, and that is a genuinely valuable node to add.

### Netherlands — CBS, opened fresh

Statistics Netherlands (CBS) publishes unusually thorough English-language
methodology documentation — start there rather than requiring translation, but
switch to Dutch sources if the English documentation thins out on any specific
point; the Dutch original is often more precise, the way it was for Germany.

1. Find CBS's own methodology or "sources and methods" page for Dutch national
   accounts, and run the same test as Germany: does it state ESA 2010 as its
   **legal basis**, in the same structured way Destatis's quality report did
   (*"Legal bases: Regulation (EC) No 549/2013..."*)? Quote whatever the Dutch
   equivalent of that block says.
2. Look for named Dutch surveys and any register/survey code system CBS uses
   internally, the way EVAS works for Germany. CBS is known for publishing very
   granular source lists — push for that granularity.
3. Look for **De Nederlandsche Bank** named as a source for financial accounts
   or balance-of-payments components, the same shape as the German Bundesbank
   link.
4. If CBS's own documentation cites any Eurostat manual by title the way INSEE
   cited the R&D manual, record it — that would be a second, independent sighting
   of the same edge pattern (national office → named Eurostat manual, not just
   → ESA 2010 itself), which strengthens the case that these manuals are a real
   category of node this project has been missing.

### Poland — GUS, opened fresh, and the interesting test

Germany, France and the Netherlands are all founding-era Western European
member states. Poland joined in 2004 and has a different statistical
tradition — this is the test of whether the citation pattern (national office
names EU instrument as its own legal basis, in detail) is a Western-European
habit or a genuinely EU-wide one.

1. Find GUS's (Główny Urząd Statystyczny) own methodology documentation for
   Polish national accounts — English-language versions exist for most GUS
   headline publications; use those first, fall back to Polish where needed.
2. Run the same legal-basis test as Germany and the Netherlands.
3. Look for named Polish surveys and any register/classification code system
   GUS uses, and for **Narodowy Bank Polski** (the National Bank of Poland)
   named as a source.
4. **State plainly if the pattern is thinner or absent for Poland** — that is a
   real and useful result either way, not a failure to find something. If GUS's
   documentation is systematically less detailed than Germany's or the
   Netherlands', that difference is itself worth a `note` in your findings.

---

## 3. Do not re-open these — updated with round 2's closed items

| Document | Disposition |
|---|---|
| "ESA 2010 methods and sources for the German GNI and its components" (Destatis inventory, not the Fachserie 18 release) | Not minted — documented periodicity conflict, unresolved. Closed. |
| ESA 2010 Annex B (transmission programme) | `agency_only` at scale, closed. **Do not re-quote the "Member States shall transmit... within the time limits specified" passage again — it is now on file twice.** |
| Annex XI to the EU Staff Regulations | `agency_only`, closed. |
| ESA 2010 Annex A ¶1.05 / the general "ESA 2010 is consistent with SNA 2008" claim | Confirmed non-dependency, closed. **This has now been logged three times across two rounds — please treat it as fully closed, in any language, in any document that repeats it.** |
| OECD ICIO / Economic Outlook general source documentation | Assessed this round — predominantly `agency_only`, the INEGI/CAS naming is the one partial exception, already logged. Do not re-run general OECD source-documentation searches this round; the France/Netherlands/Poland work above is the priority. |

---

## 4. Do not duplicate these node ids

```
esa-2010, eu-draft-budget, ec-statement-of-estimates, eurostat-hicp,
eurostat-farm-structure-survey, eurostat-remuneration-update-report,
de-destatis-national-accounts, lu-statec-ipch, lu-statec-ipcn,
sna-2008, imf-bpm6, imf-gfsm, ipsas, bis-basel-framework,
naics, un-census-principles, icls-work-statistics-resolution, cpi-manual,

nordic-statistics-database, nato-defence-expenditure, no-ssb-national-accounts,
fr-insee-national-accounts, oecd-icio,

fr-insee-base2020-methodo, eu-manual-rd-esa2010
```

Full list: `Research.1.md` §9.

---

## 5. Format — unchanged

Same JSON schema as rounds 1 and 2: `candidate_nodes`, `candidate_edges`,
`non_findings`, `termini`, same field rules — verbatim quotes, one entry per
provision, original-language quotes with translation underneath, tense flagged.

```json
"meta": {
  "researcher": "grok",
  "round": 3,
  "date": "YYYY-MM-DD",
  "countries_covered": ["FR", "NL", "PL"],
  "pattern_holds_for_all_three": "one sentence — did the legal-basis citation pattern show up as strongly in NL and PL as it did in DE and FR, or did it thin out anywhere?"
}
```

If you send more than one JSON block, mark each `PART 1 of N` etc. on the line
before it. Do not restart research on a fourth country or a new body this round
even if you finish these three early — go deeper on France, Netherlands or
Poland instead.

---

## 6. The seven things that matter (unchanged)

1. Quote verbatim, with a location.
2. One entry per provision — never bundle.
3. No verdicts. Categorize and quote; do not conclude.
4. `agency_only` and `not_found` are results.
5. "Consistent with" is not a dependency — and this one is now closed, don't re-log it.
6. Check the tense.
7. Label your JSON blocks clearly if you send more than one.
