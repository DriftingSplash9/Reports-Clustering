# Annex XI chain — Part A extraction record

**COM(2025) 736 final**, the Commission's report on the 2025 annual update of
remuneration and pensions. Extracted 2026-08-05 under `Research.1.md` §6.

This discharges **`G.21.md` cheap check 1** and scores the prediction logged at
G.21 finding 6. **The prediction splits: confirmed at the EU layer, refuted at
the national layer.** See *Scoring* at the end.

## Source and its limits — read before using any record below

```
URL:  https://www.parlament.gv.at/dokument/XXVIII/EU/47904/imfname_11549297.pdf
      (Austrian Parliament's EU-documents mirror; Council doc 16220/25 of
      1 December 2025, transmitting COM(2025) 736 final of 1.12.2025)
```

**This is not Annex XI.** It is a Commission report that applies Annex XI and
quotes its article numbers. Every statement below about what Annex XI *requires*
is therefore **reported at one remove**, and is marked as such. The distinction
matters: `Research.1.md` §2 wants the document that says it, and for the rules
themselves that document is the Staff Regulations, not this report.

**`eur-lex.europa.eu` could not be retrieved.** Four attempts at the consolidated
Staff Regulations (CELEX `01962R0031`, two dated versions, HTML endpoint)
returned **HTTP 202 with a zero-byte body** — an anti-bot gate, not a 404. Per
`Research.1.md` §7, a failed retrieval proves nothing about content: **I have not
read Annex XI and cannot say what its own text names.** In particular
**Article 1(4), which identifies the ten Member States in the Specific Indicator
sample, is unread** — and that is precisely the provision that would settle
whether national sources are named by title. See *What would close this*.

Why this mirror is nonetheless good evidence: it is a Council document register
copy of a numbered Commission report (`COM(2025) 736 final`), reproduced whole
with its own pagination and footnotes, and it is the operative document — it is
what actually carries the figures into the salary decision.

**Read this record against SEC05, not as a replacement for it.** SEC05 assumes
*+2,2 % from 1 July 2026* and *+2,3 % from 1 July 2027*; those are **forecasts**
supplied via Commission guidelines (`S05-03`, `AGENCY ONLY`). The document below
reports the **realised 2025 update of 3,0 %**. The two are different numbers of
different kinds and **must not be conflated** — SEC05's assumption is not derived
from this report.

---

## Part A records

### C736-01 — the update happens annually, by a named annex, and is published

```
URL:       (as above)
LOCATION:  s. 3.1 "Update of the remuneration and pensions of the officials and
           other servants of the EU (Article 65(1), 2nd paragraph of the SR)"
QUOTE:     "Article 65(1), 2nd paragraph of the SR provides that certain amounts
           referred therein which fix basic salaries, different allowances and
           coefficients, shall be updated annually in accordance with Annex XI.
           The Commission shall publish the updated amounts within two weeks
           after the update in the C series of the OJ of the EU for information
           purposes."
NAMES:     Staff Regulations of Officials of the European Union (Annex XI)
           Official Journal of the European Union, C series
TENSE:     PRESENT
NOTES:     Establishes cadence ("annually") and an output publication, which is
           what §4.2 wants. Reported at one remove — this is COM(2025) 736
           describing Article 65(1), not Article 65(1) itself.
           The same section adds: "Article 65a of the SR provides that the rules
           for implementing Article 64 and 65 of the SR are set out in Annex XI."
           That is the hinge SEC05 cites and stops at (S05-11).
```

### C736-02 — Annex XI Article 1 requires a Eurostat report

```
URL:       (as above)
LOCATION:  s. 4.1 "2025 Annual update of the remuneration and pensions of the
           officials and other servants of the EU (Article 65(1), 2nd paragraph
           of the SR)", first sentence
QUOTE:     "In accordance with Article 1 of Annex XI to the SR, Eurostat has
           drawn up a report on changes in the cost of living in Belgium and
           Luxembourg, changes in the purchasing power of remuneration in
           national civil services, and the economic parities from which the
           various weightings ('correction coefficients') derive"
NAMES:     Eurostat
TENSE:     PRESENT
NOTES:     **This is the sentence the whole chain turns on**, and on its own it
           is `AGENCY ONLY` — it names Eurostat and a report, without a title.
           The title arrives in footnote 3, recorded separately at C736-03,
           which is why the two are not bundled.
           Reported at one remove as to what Article 1 requires.
```

### C736-03 — the Eurostat report, named in full

```
URL:       (as above)
LOCATION:  footnote 3, attached to s. 4.1
QUOTE:     "In particular, the following Eurostat reports are referred to:
           1. Eurostat Report of 31 October 2025 on the 2025 annual update of
           remuneration and pensions of EU officials in accordance with Articles
           64 and 65 and Annexes XI to the Staff Regulations, applicable to
           officials and other servants of the European Union, adjusting with
           effect from 1 July 2025 the remuneration of active staff and the
           pensions of retired staff, and updating with effect from 1 July 2025
           the correction coefficients applied to the remuneration of active
           staff serving in Intra-EU and Extra-EU duty stations, to the pensions
           of retired staff according to their country of residence, and for
           pension transfers."
NAMES:     Eurostat Report of 31 October 2025 on the annual update of
           remuneration and pensions of EU officials
TENSE:     PRESENT
NOTES:     **A titled, dated, recurrent Eurostat publication — all three §4
           conditions met from this quote alone.** Cadence is annual and the
           date is fixed by the instrument: `Research.1.md` §7's "a document that
           names its own inputs" pattern, arriving as a footnote.
           This is the node SEC05's €182m of staff chapters actually rests on,
           three documents away. Proposed id: `eurostat-remuneration-update-report`.
           `releases_per_year`: 1. **The publication's own URL is not given
           here** and has not been retrieved — the title is established, the
           location is not. Do not mint the node until it is.
           Note the title is stated as at the *reporting* date; whether Eurostat
           publishes it under exactly this title each year is **not established
           from this document** — it is described, not cited to a URL.
```

### C736-04 — a second, more frequent Eurostat series

```
URL:       (as above)
LOCATION:  footnote 3, item 2
QUOTE:     "2. Eurostat Reports of 3 June 2025 and 31 October 2025 on the interim
           update of weightings (correction coefficients) applicable to the
           remuneration of officials, temporary staff and contract staff of the
           European Union serving in Extra-EU Delegations in accordance with
           Article 64 and Annex X and Annex XI of the Staff Regulations
           applicable to officials and other servants of the European Union."
NAMES:     Eurostat Reports on the interim update of weightings (correction
           coefficients) for Extra-EU Delegations
TENSE:     PRESENT
NOTES:     A distinct series from C736-03 — twice in 2025 (3 June, 31 October),
           so `releases_per_year` 2, and it rests on Annex X as well as Annex XI.
           Separate record because it is a separate publication, per §6's
           one-entry-per-provision rule.
```

### C736-05 — the arithmetic, stated as arithmetic

```
URL:       (as above)
LOCATION:  s. 4.1, paragraph following the Specific Indicator discussion
QUOTE:     "According to Article 3(2) of Annex XI to the SR, the amount of the
           update is obtained by multiplying together the Specific Indicator and
           the Joint Index calculated by Eurostat. The calculated update of the
           remuneration and pensions in Belgium and Luxembourg is therefore
           3.0%."
NAMES:     Specific Indicator
           Joint Index
TENSE:     PRESENT
NOTES:     **`calculated_from` in the strict sense** — the document states the
           operation ("multiplying together") and shows the result. This is the
           strongest relationship type in `Research.1.md` §6's table and it is
           rare to get it stated this plainly. Compare `boc-bank-rate`, which
           earned `calculated_from` on the same grounds.
           Arithmetic check from the surrounding text: Specific Indicator 0,5 %
           and Joint Index 2,5 % → 1,005 × 1,025 = 1,0301, i.e. 3,0 %.
           Consistent as printed.
           Neither the Specific Indicator nor the Joint Index is a *publication*
           — both are quantities defined in Annex XI and computed by Eurostat.
           They are properly attributes of the report at C736-03, not nodes.
```

### C736-06 — the Joint Index, and where its inputs come from

```
URL:       (as above)
LOCATION:  s. 4.1, definition paragraph
QUOTE:     "The Joint Index measures changes in the cost of living in Belgium and
           Luxembourg for EU officials according to the distribution of staff
           serving in these two Member States. Eurostat calculates this index on
           the basis of price information provided by the Belgian and
           Luxembourgish authorities and staff numbers information from internal
           databases of the EU institutions."
NAMES:     AGENCY ONLY
TENSE:     PRESENT
NOTES:     **The record that refutes half the prediction.** Two inputs, and
           neither is a publication:
           — "price information provided by the Belgian and Luxembourgish
             authorities" — `AGENCY ONLY`. No Belgian or Luxembourgish index is
             named. Not "the Belgian CPI", not a title, not a series code.
           — "staff numbers information from internal databases of the EU
             institutions" — **terminus, kind `unpublishable`**. An
             administrative record, real and load-bearing, that is not published.
           This is the exact `AGENCY ONLY`-at-the-national-boundary pattern the
           Canada/US side was measured to have. See *Scoring*.
```

### C736-07 — the Specific Indicator, and the ten-Member-State sample

```
URL:       (as above)
LOCATION:  s. 4.1, definition paragraph
QUOTE:     "The Specific Indicator measures changes in the net remuneration,
           after taking national inflation into account, of national civil
           servants in Member States' central governments. Eurostat calculates
           this indicator on the basis of information supplied by the ten Member
           States referred to in Article 1(4) of Annex XI."
NAMES:     AGENCY ONLY
TENSE:     PRESENT
NOTES:     `AGENCY ONLY` again, and the more consequential of the two. The
           Specific Indicator is the channel through which **member-state civil
           service pay** enters the EU budget, and the supplying states are
           identified only by cross-reference — "the ten Member States referred
           to in Article 1(4) of Annex XI". **They are not listed in this
           document, and Article 1(4) has not been read** (see Source).
           The same paragraph records that the sample changed: "the UK is no
           longer included in the core sample of Member States under Article 1(4)
           of Annex XI for Specific Indicator calculation purposes (the remaining
           sample of ten Member States continues…)". So the ten is post-Brexit
           and the provision has a history — §5b territory, though stated here in
           the present tense about the current state.
```

### C736-08 — the moderation clause, a cap worth comparing

```
URL:       (as above)
LOCATION:  s. 4.1, paragraph beginning "Furthermore, Article 10 of Annex XI"
QUOTE:     "Furthermore, Article 10 of Annex XI to the SR sets a moderation
           clause i.e. the value of the Specific Indicator shall be subject to an
           upper limit of +2 % and a lower limit of -2 %. If the value of the
           Specific Indicator exceeds this limit, then the value of the limit
           shall instead be used to establish the annual update. The limit will
           then apply with effect from 1 July and the remainder of the annual
           update shall be applied with effect from 1 April of the following
           year."
NAMES:     AGENCY ONLY
TENSE:     PRESENT
NOTES:     Reported at one remove (this is COM(2025) 736 on Article 10, not
           Article 10).
           **Flagged for the comparative question `Research.1.md` §8 item 1a
           exists to answer.** Alberta's income-tax escalator is capped at 2 %;
           the EU Specific Indicator is capped at ±2 % with an explicit
           carry-forward of the excess to 1 April of the following year. That is
           a cap *and* a deferral mechanism, which the Alberta provision does not
           have. Two jurisdictions, same number, different machinery — exactly
           the kind of comparison the brief says the corpus cannot currently
           make. **Not adjudicated**; recorded so someone can.
```

### C736-09 — the parities, agreed with national statistical bodies

```
URL:       (as above)
LOCATION:  s. 4.2.1 "Weightings ('correction coefficients') for staff outside
           Belgium and Luxembourg"
QUOTE:     "Eurostat has calculated, in agreement with the national statistical
           bodies the economic parities which establish the purchasing power
           equivalence of the remuneration paid in Brussels with that paid in the
           other places of employment"
NAMES:     AGENCY ONLY
TENSE:     PRESENT
NOTES:     Third `AGENCY ONLY` at the national boundary, and the phrasing is
           worth keeping: "in agreement with" is a governance statement, not a
           data-input statement. It sits close to `Research.1.md` §5a's watchlist
           without being on it — it describes *how* the number was settled, not
           what fed it.
           A near-identical sentence appears at s. 4.2.2 for pensions
           ("in agreement with the national statistical bodies, the economic
           parities which establish the purchasing power equivalence of the
           pension paid in Belgium…"). Two provisions, same shape; recorded once
           with the second noted, because the finding is that it repeats.
```

### C736-10 — the whole calculation, sourced to Eurostat and the national offices

```
URL:       (as above)
LOCATION:  s. 4 chapeau, sentence introducing points 4.1 to 4.4
QUOTE:     "as described in detail in points 4.1 to 4.4 of this chapter of the
           report, are based on statistical data prepared by the Statistical
           Office of the EU (Eurostat) in agreement with the national statistical
           offices of the Member States that reflects the situation as at 1 July
           2025"
NAMES:     AGENCY ONLY
TENSE:     PRESENT
NOTES:     The summary statement of the whole mechanism, and it names two bodies
           and zero publications. "based on statistical data prepared by" is a
           genuine input claim — this is not §5a language — which makes the
           absence of a title more informative, not less.
           Also fixes the reference date: "the situation as at 1 July 2025".
           `Research.1.md` §8 item 1a treats reference periods as worth their own
           line, and this is one.
```

### C736-11 — an output publication with a citation

```
URL:       (as above)
LOCATION:  s. 4.3, with footnote 8
QUOTE:     "on 27 June 2025, the Commission published in the C series of the OJ
           six monthly tables showing which countries are affected, respective
           weightings ('correction coefficients') and the applicable dates"
           Footnote 8: "OJ C 2025/3592, 27 June 2025."
NAMES:     Official Journal of the European Union, C series
TENSE:     PAST
NOTES:     **TENSE: PAST**, and flagged under §5b. The sentence describes a
           completed 2025 publication, not a standing arrangement — though
           C736-01's "shall publish… within two weeks" is the present-tense
           standing rule behind it. Both quoted so the pair is visible.
           The OJ citation is the only fully-cited *output* location in the
           document. The OJ C series is a publication but not on a cadence in the
           §4.2 sense — it is a continuous gazette — so it is likelier a
           `redistributed`-flavoured carrier than a node. Not adjudicated.
```

### C736-12 — a named forecast enters the file

```
URL:       (as above)
LOCATION:  footnote 5
QUOTE:     "The Spring European Economic Forecast issued by DG ECFIN on 19 May
           2025 estimated that GDP for the EU as a whole in real terms will
           increase by +1.1% for 2025, and growth of +1.5% is foreseen for 2026."
NAMES:     Spring European Economic Forecast (DG ECFIN)
TENSE:     PRESENT
NOTES:     A titled, dated, recurrent publication (the Commission issues Spring
           and Autumn forecasts, so `releases_per_year` 2 — **though this
           document states only the Spring edition and does not state a
           cadence**, so 2 is not established here).
           Its role is contextual rather than computational: it appears in a
           footnote, and nothing in the quoted text says the forecast feeds the
           update arithmetic, which C736-05 shows is Specific Indicator × Joint
           Index. On this evidence the relationship is `cites`, **not**
           `uses_data_from`. Recorded because it is one of only three titled
           publications in the whole document.
           Proposed id if minted: `ecfin-european-economic-forecast`.
```

---

## Scoring the G.21 finding 6 prediction

G.21 predicted: *"Annex XI's own text names its inputs — national price and pay
indices, and a joint index compiled by Eurostat — and does so by title, because
it is a method annex and method annexes have to. If so it is a supranational
instrument naming member-state statistical releases as inputs, which is the exact
edge shape the Canada/US pair was measured to lack."*

**Split. Confirmed at the EU layer, refuted at the national layer.**

| Limb of the prediction | Outcome |
|---|---|
| A joint index compiled by Eurostat exists and is named | **Confirmed** — C736-05, C736-06 |
| Eurostat publications are named by title | **Confirmed, and better than predicted** — two distinct titled report series with dates, C736-03 and C736-04 |
| National price and pay indices are named **by title** | **Refuted** — three separate `AGENCY ONLY`s: "the Belgian and Luxembourgish authorities" (C736-06), "the ten Member States referred to in Article 1(4)" (C736-07), "the national statistical bodies" (C736-09) |
| Therefore a supranational→named-national-release edge | **Not produced** |

**The caveat that keeps this open, and it is a real one:** I did not read Annex XI.
`eur-lex.europa.eu` returned HTTP 202 with an empty body on every attempt. The
refutation above is a refutation *of COM(2025) 736*, which is a report applying
Annex XI, not of Annex XI itself. **Article 1(4) is exactly where a list of named
national sources would live if one exists**, and it is unread. Per §7, the failed
retrieval proves nothing.

So the honest statement is: **the operative document that carries these figures
into the EU budget names no member-state publication, and whether the underlying
annex does is still open.**

**Why this matters beyond the ledger.** `EU/slices/README.md` frames the EU as
the natural test of whether the Canada/US result — zero standard-compliant direct
official cross-border edges — is a fact about those two countries or about
national statistical systems generally. This chain was a good candidate for the
opposite case, and on the evidence retrieved so far **it behaves the same way
Canada/US does**: the supranational layer names its own outputs precisely and its
national inputs only by institution. One chain is not the answer to that question
— ESA 2010's Annex B is still the better test and is still unread — but a second
independent instrument now points the same way, and that is worth more than a
confirmation would have been.

## What would close this

1. **Retrieve Annex XI itself**, specifically Article 1(4). EUR-Lex is gated to
   this client; try a national mirror (the parliament document registers work),
   the Commission's HR pages, or an official PDF endpoint.
2. **Retrieve the Eurostat Report of 31 October** and establish its URL and
   whether the title recurs annually. That converts C736-03 from a described
   publication into a mintable node.
3. **Do not mint any node from this file yet.** Three titled publications are
   established by title only, with no retrieved URL — and `Research.1.md` §2
   requires the URL.
