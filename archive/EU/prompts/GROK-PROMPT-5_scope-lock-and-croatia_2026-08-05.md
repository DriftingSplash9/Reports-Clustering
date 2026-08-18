# Prompt for Grok, round 5 — one rule about scope, then two bounded jobs

**Paste this whole file as the first message. Then paste `Research.1.md`
(project root) immediately after it.** Continuation of rounds 1–4.

---

## 1. One rule, stated once, plainly: `Research.1.md` is not a task list for you

Round 3 you opened Italy unassigned. Round 4 you opened Luxembourg unassigned —
and cited `Research.1.md` §8 as your own justification for doing it. That's the
actual issue this round needs to fix. `Research.1.md` is the evidence standard —
what counts as a node, the two traps, the output format. **It is not a backlog
you get to pull items from.** Its own priority lists and "cheap extension"
notes are written for whoever is deciding what gets researched next — that
decision is made by the prompt you're given, each round, by a human. Reading it
as pre-approval to add work is what caused this three times now.

**From this round on: research exactly what §3 and §4 below assign. Nothing
else, including anything `Research.1.md` itself suggests, even if it looks cheap
or obviously in scope. If something looks like a good lead while you're
researching the assignment, put it in `non_findings` or a one-line note in
`meta` flagging it as a lead — do not go research it.**

**Also: you sent the exact same JSON object twice in a row this round, verbatim.
Send each finding once.**

---

## 2. What round 4 got right — keep doing this

The schema correction from round 4's prompt landed cleanly: `relationship_word`
instead of a self-assigned `relationship_type`, `quote` / `location` / `tense`
as separate fields instead of one bundled paragraph, `kind` back on
`non_findings`. This is exactly the shape from rounds 1–2 and it's the shape to
keep using. Italy and Czechia both came back well-evidenced — Frame-SBS,
ASIA-Enterprises, and the ČSÚ/ČNB pair are good, clean, checkable entries.

---

## 3. Job 1 — repackage the Luxembourg finding, don't research it further

You found that Luxembourg's automatic wage-indexation law (*Loi du 25 mars
2015*, Art. 3) names STATEC's published consumer price index as the trigger for
statutory wage adjustments, and that a STATEC press release documents a specific
adjustment against a specific index value. **This is a real and useful find** —
it's a different shape from the ESA 2010 legal-basis pattern seen everywhere
else: a **national law** citing a **national statistic** as its own trigger
mechanism, not a national statistic citing an EU instrument. That's worth having
in the corpus properly.

**Do not research this further.** Put what you already have through the correct
schema from round 4 — separate `quote`, `location`, `url`, `tense` fields, no
bundling, and re-verify the two URLs you sent (both have the same stray
`￼LOCATION` artifact merged into them that's shown up before — open them fresh
and confirm the clean URL before resending). The likely target for this edge is
the existing `lu-statec-ipcn` node already in the corpus (see the do-not-duplicate
list in §6) — check whether the law names the CPI index (`ipcn`) or the
harmonised one (`ipch`) specifically, since STATEC publishes both and the round 4
text wasn't fully clear which one the law's Art. 3 references.

---

## 4. Job 2 — Croatia, and only Croatia, to break the Poland/Czechia tie

Poland's documentation came back thin. Czechia's came back as granular as
Germany, France, the Netherlands and Italy. That's a genuine disagreement
between two states from similar accession waves, and it needs a tiebreaker, not
another confirmation of either side.

**Croatia is the tiebreaker, specifically because it's the most recent EU
member state (joined 2013) — the extreme case of the "newer member" variable.**
If the "newer members publish thinner methodology" theory is real, Croatia
should be the thinnest yet. If Croatia comes back as granular as Czechia,
Germany, France, the Netherlands and Italy, that's strong evidence the theory is
wrong and Poland is simply an outlier — which is itself a clean, reportable
result.

1. Find the Croatian Bureau of Statistics (DZS, Državni zavod za statistiku)
   methodology or "sources and methods" documentation for Croatian national
   accounts. English-language versions of DZS's Eurostat ESMS metadata exist;
   start there, fall back to Croatian if the detail thins out.
2. Run the identical legal-basis test: does it state ESA 2010 as its basis, the
   way ČSÚ's *"strictly follows the ESA 2010 methodology"* did?
3. Look for named Croatian surveys or a register/code system analogous to EVAS,
   ASIA/Frame-SBS, or the Dutch SBS/SBR.
4. **On the central bank / BoP pattern: do not chase this one.** It's now
   confirmed five times (Bundesbank, DNB, Banca d'Italia, ČNB, weak for Banque de
   France). If you happen to see Hrvatska narodna banka named in the same role
   while reading the DZS documentation, log one clean entry — but do not
   specifically search for it. That thread is closed; spend the time on the
   legal-basis and named-register questions instead, since those are what
   actually resolve the Poland/Czechia disagreement.
5. **Answer the comparison directly in `meta`**, the same way round 4 did for
   Czechia vs. Poland: is Croatia's documentation as granular as the strong set,
   as thin as Poland, or somewhere in between — and does that support or weaken
   "newer members publish thinner methodology" as a real pattern?

**Do not open a fourth item this round.** Two jobs: repackage Luxembourg,
research Croatia. Nothing else, even with time left over.

---

## 5. Do not re-open these — carried forward and updated

Same list as round 4 (Annex B, Annex XI, the ESA/SNA non-dependency, OECD general
source documentation, the confirmed France/Netherlands/Poland/Italy/Czechia
edges), plus:

| Item | Disposition |
|---|---|
| The central-bank-compiles-BoP pattern | Confirmed five times (Bundesbank, DNB, Banca d'Italia, ČNB, weak Banque de France). Closed as a finding. One passive sighting for Croatia is fine; do not search for it. |
| Poland vs. Czechia documentation-granularity disagreement | Open, and Croatia in §4 is specifically how it gets resolved this round — don't re-litigate Poland or Czechia themselves. |

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

Full list: `Research.1.md` §9. (Note: the corpus has grown a lot since round 1 —
several new Eurostat/ECB slices exist now that these prompts did not produce.
That's expected; other work is happening on this branch in parallel. Your ids
just need to not collide with the list above.)

---

## 7. Format — unchanged, the round 4 correction stands

Same JSON object, same four arrays, same field shape as round 4's corrected
version: `relationship_word` (not `relationship_type`), separate `quote` /
`location` / `tense` fields, `kind` on `non_findings`. One JSON object, sent
once. If you must split it, label each block `PART 1 of N`.

```json
"meta": {
  "researcher": "grok",
  "round": 5,
  "date": "YYYY-MM-DD",
  "jobs_this_round": ["repackage Luxembourg wage-indexation finding", "Croatia"],
  "hr_vs_cz_pl_comparison": "one sentence — does Croatia support or weaken the newer-member-means-thinner-documentation theory?",
  "leads_not_researched": "if you noticed something else worth researching while doing these two jobs, name it here in one line — do not go research it"
}
```

---

## 8. The seven things that matter (unchanged)

1. Quote verbatim, in its own field, with a location.
2. One entry per provision — never bundle.
3. No verdicts, including `relationship_type` — report the words used.
4. `agency_only` and `not_found` are results — use `kind` to say which.
5. "Consistent with" is not a dependency — closed, don't re-log it.
6. Check the tense.
7. **Only the two jobs assigned this round.** Not a lead from your own
   research, not an item from `Research.1.md`'s own backlog. If you think of
   something else worth doing, name it in `meta` and stop there.
