# Prompt for Grok, round 2 — continuation, and one thing to try to break

**Paste this whole file as the first message. Then paste `Research.1.md`
(project root) immediately after it**, same as round 1. This is a continuation,
not a restart — §2 below tells you what round 1 already established so you don't
re-do it.

---

## 1. Your round 1 results — reviewed, and mostly excellent

Round 1 came back as 5 candidate nodes, 7 candidate edges, 17 non-findings, 1
terminus. Reviewed against every quote:

- **The Norway/EEA finding is the best single result so far, from either
  researcher on this branch.** *"Norway is also legally committed through the
  EEA Agreement... to report national accounts data to Eurostat/EU"* is a
  documented obligation running from an EU instrument to a **non-member** state —
  a shape nobody had tested yet. Correctly sourced, correctly quoted.
- **NATO landed exactly on the pattern this branch keeps finding, and that is a
  strong result, not a weak one.** *"Each Ally's Ministry of Defence reports
  current and estimated future defence expenditure according to an agreed
  definition"* — an institution, not a titled publication. You correctly filed
  this `agency_only` rather than forcing an edge. **This means the asymmetry
  (binding obligation, no named national publication) now holds outside
  statistics** — defence spending shows the same shape as national accounts.
  That is the headline of this whole continuation; see §3.
- **The ESA/SNA "consistent with" trap was caught twice, correctly, including
  once in German** (*"SNA 2008 ist konsistent mit ESA 2010"*-shaped language) —
  filed as `non_dependency`, not an edge. Exactly right, and doing it in a
  non-English source is harder, not easier.
- **The France and Norway "in compliance with / according to the definitions of
  ESA 2010" edges are real** — same obligation language already confirmed for
  Germany and Luxembourg. Spot-checked the INSEE source directly: the quote sits
  in that series' own classification-system metadata, not a bundled general
  description. Good sourcing.

**One thing to fix, so it does not repeat: you re-researched a document already
assessed and deliberately not minted.** `de-destatis-gni-inventory` — "ESA 2010
methods and sources for the German GNI and its components" — was already pulled
in an earlier session. Its own colophon states **"Periodicity: non-recurring,"**
which fails this project's cadence test outright, while the same document names
its own 2021 predecessor, which contradicts that label. That conflict is
recorded and unresolved; the node was deliberately not created. Your quote is
correct and matches what was already on file, so nothing is lost — but it burned
research time. **§4 below is a new list, alongside the "don't duplicate these
ids" list, of documents already looked at with a stated reason. Check it before
opening a source.**

**One packaging note.** Send **exactly one JSON object, once, when you are truly
done for this round** — not a series of growing drafts through your response.
Thomas has to find the last one by hand right now. Precede it with the single
line `FINAL — round 2` so there's no ambiguity about which block is the one to
use.

---

## 2. What is now established — do not re-derive, build on it

> **A binding multinational obligation does not name the national publication it
> binds. The national publication does name the obligation.**

Four independent confirmations now, two different domains:

| Direction | Domain | Source → Target | Shape |
|---|---|---|---|
| National → EU | Statistics | Germany, Luxembourg, **Norway** (non-member) → ESA 2010 / HICP | Named, cited, titled |
| National → EU | Statistics | France → ESA 2010 | Named, cited, titled |
| EU → National | Statistics | ESA 2010 Annex B, Annex XI → member states | `agency_only` — institutions, not publications |
| International → National | **Defence** | NATO Defence Expenditure → Allied Ministries of Defence | `agency_only` — institutions, not publications |

This is no longer a statistics-specific finding. **Round 2's real job is to try
to break it** — find one clean counter-example where an international or
supranational body's own published document names a specific titled national
release as its input. One confirmed counter-example is worth more than ten more
confirmations of the pattern holding. See §5.

---

## 3. The falsification test — this is the actual point of round 2

For every body you check in §6, ask the same question in this order:

1. **Does the body's own document oblige member states/countries to report
   something?** (Usually yes — that's why it's on the list.)
2. **When it describes that obligation, does it name a specific titled national
   publication**, or does it say "member states shall report," "national
   authorities provide," "each country's designated agency" (`agency_only`)?

**If you find a body that does name specific national publications by title in
its own obliging document, that is the single most valuable thing you can send
back this round.** Flag it at the top of your response, not buried in the JSON.
If everything keeps coming back `agency_only`, that is also a real result — say
so plainly and keep counting.

---

## 4. Do not re-open these — already assessed, with a stated reason

| Document | Disposition |
|---|---|
| "ESA 2010 methods and sources for the German GNI and its components" (Destatis, the *inventory*, not the Fachserie 18 release) | **Not minted.** Colophon states "Periodicity: non-recurring," contradicted by the same document naming its 2021 predecessor. Documented conflict, unresolved. Quote it again only if you find something that resolves the conflict — a third edition, or an explicit statement of what "non-recurring" means in Destatis's own usage. |
| ESA 2010 Annex B (the transmission programme) | **Assessed and closed as `agency_only` at scale** — table numbers and deadlines, no publication column. Do not re-search this specific document; the finding is stable. |
| Annex XI to the EU Staff Regulations (the salary-update method) | Same disposition as Annex B — `agency_only`, closed. |
| ESA 2010 Annex A ¶1.05 ("is consistent with... SNA 2008") | Confirmed non-dependency, closed. If you find the *same claim* phrased differently elsewhere, that's fine to log once more as corroboration — just don't spend time re-opening this specific paragraph. |

---

## 5. Do not duplicate these node ids — updated with round 1's confirmed nodes

```
esa-2010, eu-draft-budget, ec-statement-of-estimates, eurostat-hicp,
eurostat-farm-structure-survey, eurostat-remuneration-update-report,
de-destatis-national-accounts, lu-statec-ipch, lu-statec-ipcn,
sna-2008, imf-bpm6, imf-gfsm, ipsas, bis-basel-framework,
naics, un-census-principles, icls-work-statistics-resolution, cpi-manual,

nordic-statistics-database, nato-defence-expenditure, no-ssb-national-accounts,
fr-insee-national-accounts
```

(`de-destatis-gni-inventory` is deliberately left off this list — see §4, it is
not a node, don't propose it again unless the conflict resolves.)

Full list: `Research.1.md` §9.

---

## 6. Targets for this round, in priority order

### A. OECD — you flagged this yourself as next, and you were right

Statistical output, wide membership overlap with the EU, and it routinely cites
national sources. Run the exact §3 test on it. The OECD's own economic
indicators publications and its `.Stat` data warehouse documentation are good
starting points.

### B. Finish the EEA/EFTA set the Norway result opened

You found Norway. **Iceland and Liechtenstein are the same test, not opened
yet.** Switzerland is bound by bilateral treaties rather than the EEA Agreement
— structurally different, worth checking whether the *shape* of the obligation
language differs (treaty language vs. EEA Agreement language).

### C. The rest of the non-EU bodies list — apply §3 to each

In order: **WTO** (trade statistics harmonisation — check whether WTO
publications name specific national trade-statistics releases or just say
"reported by members"), **WHO** (the ICD as a coding standard — does a national
health statistics body cite ICD by title as its coding basis?), **FSB / IOSCO /
IAIS / FATF** (systemic risk, securities, insurance, AML — same obligation shape
as Basel, which is already a confirmed node; untested for these four), **ISO**
(does a national statistical office cite an ISO standard, e.g. ISO 3166 country
codes or ISO 4217 currency codes, as its own classification basis?), **IFRS
Foundation** (do national corporate-reporting rules cite IFRS by title as
adopted?).

**WEF last, and expect `cites` rather than a real dependency** — it publishes
recurrently and does reference national statistics, but it obliges no
government. If you find a clean citation, log it, but flag
`"notes": "non-official, cites-only, no obligation"`.

### D. Baltic Assembly / Visegrád — carried over from round 1, not reached

Look specifically for a shared statistical output (not just a political
communiqué) that names the member countries' own releases.

### E. Direct bilateral mirror/reconciled trade statistics — carried over, not reached

Two countries' trade statistics reconciled against each other, each naming the
other's release by title. This is the single strongest possible EU-internal
result if you find it — a documented direct country-to-country edge with no
international standard as intermediary, which the whole Canada/US comparison
says essentially never happens.

### F. One more national deep-dive

Germany is done at depth. France is started (3 edges) — worth one more pass at
INSEE's *sources et méthodes* documentation beyond the single ESMS-style page
already used, since that's where source-level detail (survey names, register
numbers) tends to live, the way it did for Destatis. If time remains after that,
pick **one** of Italy (ISTAT), Netherlands (CBS), Spain (INE), or Poland (GUS)
for the same depth — not all four thinly.

---

## 7. Format — same schema as round 1, one addition

Same JSON object, same four arrays (`candidate_nodes`, `candidate_edges`,
`non_findings`, `termini`), same field rules — verbatim quotes, one entry per
provision, no bundling, non-English sources quoted in the original with a
translation underneath, tense flagged.

**One addition to `meta`:**

```json
"meta": {
  "researcher": "grok",
  "round": 2,
  "date": "YYYY-MM-DD",
  "falsification_attempts": "for each body in §6 C, one sentence: did you find a body naming a specific national publication, or did it come back agency_only?",
  "targets_covered": [...],
  "targets_not_reached": [...]
}
```

**Send it once, at the true end, marked `FINAL — round 2` on the line before the
code block.** If you're running long, stop mid-target and send what you have
rather than trying to finish everything first — an unfinished JSON that arrives
is worth more than a complete one that doesn't.

---

## 8. The seven things that matter (unchanged from round 1)

1. Quote verbatim, with a location.
2. One entry per provision — never bundle.
3. No verdicts. Categorize and quote; do not conclude.
4. `agency_only` and `not_found` are results — the NATO one is the best example
   yet of why.
5. "Consistent with" is not a dependency — you're already good at this, keep it up.
6. Check the tense.
7. Send the JSON once, marked FINAL, when you're actually done.
