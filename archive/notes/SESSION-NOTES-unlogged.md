# Working notes — unlogged session, 2026-07-29 (after V0.8)

**This is not a session log.** V0.9 has not been written; you said to ask when you're
back. These are the notes it would be written from, left where they can't be lost.

Counts moved for the first time since V0.4: **120 reports / 192 dependencies**,
down from 121 / 195. Both drops are deliberate and are explained below.

---

## Headline: the strict standard now yields one component

V0.8 left the graph at **two components and two orphans** under
documented-plus-`evidence_url`. It is now **one component of 119 nodes and one
isolated node.**

That was V0.8's own prediction — "one URL — `boc-policy-rate -> statcan-cpi` —
reconnects the whole rate corridor" — and it held exactly. The document is the
2021 Joint Statement of the Government of Canada and the Bank of Canada, which
says the target "will continue to be defined in terms of the 12-month rate of
change in the total CPI." That is stronger than the seed basis claimed: the
target is not informed by the CPI, it is *denominated* in it, by agreement
between the Bank and the Minister of Finance.

The one remaining strict-standard isolate is `boc-mpr`, whose six edges are all
still unevidenced.

---

## The 21 unevidenced seed edges: 7 resolved, 14 untouched

I did not get through all 21, and **I deliberately did not close the gap by
demoting the remainder to `implied`.** That would have recorded a shortage of
research budget as a finding about the world, which is the exact confusion the
`no-document` / `deferred` split in the reason vocabulary exists to prevent. The
14 left are untouched and still fail the standard.

### Documented — 4

| Edge | Document |
|---|---|
| `boc-policy-rate -> statcan-cpi` | Joint Statement on the Monetary Policy Framework (2021) |
| `cpp-disability-amount -> statcan-cpi` | CPP Regulations s.75(1) |
| `cpp-disability-amount -> cpp-ympe` | CPP Regulations s.68.1(1) |
| `bea-gdp -> bea-pce` | NIPA Handbook Chapter 5 |

Two carry documented reference periods now, taking transmission coverage from
34/195 to 36/192. The CPP one is the 12-month window ending **October 31** that
REPORTS.md already lists — now structured rather than sitting in prose.

`cpp-disability-amount -> cpp-ympe` has a wrinkle worth keeping: the regulation
computes from the Maximum Pensionable Earnings *Average*, a five-year average of
the YMPE, not a single year's figure. The dependency is stated in regulation; the
arithmetic runs through an average of five of them. The basis says so.

`bea-gdp -> bea-pce` is the within-system identity REPORTS.md has open. I
recorded it as documented on the candidate answer already written there — a
release's own methodology handbook is the strongest available statement of its
own composition, not the weakest. **That is me acting on an open question rather
than settling it**, and you may want to take the decision properly.

### Deleted — 3, each with a `_dropped` note

- **`fed-h15 -> fed-fomc-statement`** — the premise was false, not merely
  unevidenced. H.15 carries **no target-range series at all**. Its only federal
  funds line is "Federal funds (effective)", and footnote 1 sources it to the
  **FR 2420** reporting form. Same shape as FR 2644 behind H.8.
- **`fed-fomc-statement -> bls-cpi`** — the basis hedged in its own wording, which
  V0.8 had already flagged. `fed-fomc-statement -> bea-pce` exists and is
  evidenced; nothing states the FOMC takes the CPI as an input.
- **`bea-gdp -> bls-cpi`** — a two-hop path recorded as one edge. With
  `bea-pce -> bls-cpi` documented and `bea-gdp -> bea-pce` now documented too, the
  relationship is fully represented as GDP → PCE → CPI. The direct edge
  double-counted the CPI's authority through the same mechanism.

### Consequence: fed-h15 drops out of the graph

That deletion was its only edge, so **`fed-h15` now joins LGFF Operating as a
node dropped on every build.** This is the standard working, on the LGFF
precedent — but it is the first time a *federal* release has fallen out, and it
deserves your eye rather than mine.

There is a cheap way back, and I recorded it as a `no-node-yet` lead: H.15
footnotes 9 and 10 both read **"Source: U.S. Treasury"** for the constant
maturity series. That is a documented dependency by this project's standard. What
is missing is the node — the Treasury daily yield curve has never been
researched. Researching it reconnects H.15.

---

## The ranking moved again, and the top three are now nearly tied

```
1.000  Consumer Price Index (StatCan)      in 13
0.679  Census of Population                in  5
0.677  Consumer Price Index (BLS)          in  5
```

V0.8 had CPI 1.000, US CPI 0.730, Census 0.679. The US CPI lost two incoming
edges to the deletions above and fell behind the Census — **by 0.002.** I would
not report that as the Census outranking the US CPI. A gap that size is not a
finding, and the honest statement is that they are tied at second.

The Canadian CPI at the top is unchanged, and both scoring methods still agree
there, which is what V0.8's fix was for.

---

## Recommendation 4 in V0.8 was already done

`DEFAULT_VIEW` has held `fog: 0.35, glow: 0.55` since 11:53 on 2026-07-29 —
**hours before V0.8 was written at 18:14.** The hand-verification found the
*existing* defaults legible and the log wrote it up as a pending change.

Nothing needed changing. Worth noting because V0.8's own theme was documents
drifting from the data, and it shipped one more instance of exactly that.
BACKLOG.md never carried the item, so only the V0.8 recommendation is stale.

---

## Disclosure ratio: built, and sparser than expected

`disclosureByReport()` is in `graph.ts`, typed and typechecking. It returns
counts, not just a ratio — `documented`, `implied`, `undisclosed`,
`unpublishable`, `denied`, `leads` — because the reason vocabulary draws
distinctions a single number throws away, and the card can discard what it
doesn't want but cannot recover what the function already merged.

**The card layout is not built.** It needs eyes on a screen, which you have and
I don't.

One design trap found and avoided. The obvious rule — ratio is null when the
denominator is zero — gives **94 of 121 nodes a ratio, nearly all of them 100%**,
because a node with three documented edges and no dropped notes scores perfectly.
That makes a report nobody has examined present as the most transparent thing on
screen. The rule is now: **null unless something was searched for and not found**,
so a non-null ratio always means a search happened and came up short.

That takes it to **21 of 120 nodes**. Which answers V0.8's open question about
whether the denominator is useful as opposed to merely available: it is useful,
for about a sixth of the graph, and the answer for the rest is "nobody asked".

---

## `_dropped` spot-check: the boundary is as soft as V0.8 suspected

I checked all 10 `denied` entries for whether the prose actually describes a
document saying the relationship does *not* hold. Six do. Four read as failed
searches or as something else:

- **`ab-adult-health-benefit-income-levels -> ab-tbf-alberta-escalator`** — "carry
  no indexation rule anywhere I could find". That is a failed search. It should
  be `no-document`. This one is clear-cut.
- **`cpp-ympe -> cpp-actuarial-report`** — the why explains that s.18 makes the
  YMPE a mechanical function of the StatCan wage measure. That is a real
  dependency pointing somewhere else, so `wrong-target` fits better than `denied`.
- `ab-aadl-cost-share -> statcan-cpi` and `cdic-deposit-insurance-coverage-limit
  -> statcan-cpi` are defensible — a statute fixing a number is a document
  establishing no indexation — but they sit on the line.

**I did not change any of them**, because reclassifying moves nodes in and out of
the disclosure-ratio denominator and the call is yours. The first is unambiguous
enough that I'd change it if you say so.

---

## Verification performed

- `npx tsc --noEmit` clean under `strict` with `noUnusedLocals` /
  `noUnusedParameters`, in a scratch install outside the project tree.
- `npm run validate` — 120 reports, 192 dependencies, **no structural issues.**
- **All four invariants hold.** Commercial subtraction, implied-edge exclusion,
  no `_dropped` note describing a live edge, and all 87 disclosing reports
  retaining exactly 50.0% across an outgoing-weight span of 0.50–6.60.
- Components recomputed independently, not read from the validator: strict
  standard 1 component + 1 isolate; all-documented 1 component.
- `evidence_url` coverage 170 of 184 documented edges. The 14 without one are the
  untouched seed edges — arithmetic checks out at 21 − 4 − 3 = 14.

### Not verified

- **Nothing was looked at in a browser.** No renderer source was edited, so the
  risk is low, but the ranking change and the two dropped nodes are live in the
  UI and nobody has seen them.
- **`vite build` still not run** — same scratch-install limitation V0.8 recorded.
- **The 14 remaining unevidenced seed edges got no research at all.** They are
  not "searched and not found"; they are "not searched". Don't let a later pass
  read them as the former.
- The `determination` field is still decided and not built. I did not touch it.

---

## Second round: external assistant (Grok), 4 of 7 claims survived checking

Thomas ran the brief through a second AI. It returned **seven DOCUMENTED
verdicts**. Every quote was checked against the URL it was offered with. **Four
held, one was refuted by its own evidence, two are unverified.**

This is the reason the brief said quotes would be checked. Two of the four that
held are finds a search would not have produced quickly.

### Held, and applied

- **`boc-mpr -> statcan-lfs`** — footnote 4 of the July 2026 MPR: *"LFS-Micro is a
  measure of underlying wage growth derived from the Labour Force Survey (LFS)
  microdata."* Verified in the PDF. The Report names the release and says what it
  does with it.
- **`boc-mpr -> statcan-cpi`** — the Report names the index in text and names
  CPI-trim and CPI-median. Verified.
- **`boc-mpr -> bea-gdp`** — *"Sources: US Bureau of Economic Analysis via Haver
  Analytics and Bank of Canada calculations, estimates and projections."*
  Verified. **This is the first standard-compliant direct official CA↔US edge the
  graph has ever had.** V0.8 measured that count at zero and observed the only
  compliant cross-border link was a futures price.
- **`boc-mpr -> fed-fomc-statement`** was correctly returned as NOT-FOUND, which I
  confirmed: the only Federal Reserve mention in the whole Report is its 2%
  target, not the policy path.

### Refuted by its own quote

**`boc-mpr -> statcan-national-accounts` was returned DOCUMENTED**, with the
supporting quote *"Sources: Statistics Canada and Bank of Canada calculations and
estimates"* — the agency-level attribution the brief specifically warned fails,
and which the same reply had elsewhere said it was treating as a failure.

Checked against the PDF: **the phrase "national accounts" does not appear in the
July 2026 MPR once.** Neither does "by industry". Filed as `no-document` with the
refutation recorded, so nobody re-runs it.

Worth keeping as a general result rather than a complaint about one tool: **the
failure mode the standard exists to catch is the one that actually occurred**, it
occurred in the item where the near-miss was most tempting, and it was caught only
because the quote was checked rather than trusted. The brief's insistence on
verbatim quotes is what made it a five-minute check instead of a permanent silent
error.

### Not yet verified — do not apply

Items 1 and 2 (`statcan-national-accounts` → `statcan-gdp-monthly` and →
`statcan-cpi`) were returned DOCUMENTED with plausible quotes from StatCan guides,
**but I ran out of budget before opening either document.** Leave them until
checked.

Item 1 also has a direction problem the assistant flagged and then overrode: its
own quote says *"the final step in the production of the **monthly** real GDP by
industry estimates is their ongoing reconciliation with the **quarterly**
estimates"* — which describes the monthly depending on the quarterly, the reverse
of the edge as recorded. Likely `wrong-direction`, possibly mutual. Needs the
document read, not the quote re-read.

### New finding: a commercial redistributor between two official agencies

The BEA attribution runs *"via Haver Analytics"*. Haver is a commercial
redistributor that publishes no release of its own, so it cannot become a node
even under the V0.5 rule that admits J.D. Power and ICE Brent — those publish
something; Haver republishes. Filed as `unpublishable-source`. First time the
corpus has caught an intermediary sitting between two official statistical
agencies, and worth knowing about before the cross-border cluster is built out.

---

## Third round: Equalization statutory extraction — the format change worked

Brief II removed the verdict field from most rounds. **The behaviour change is
visible and large.** Round A came back with `AGENCY ONLY` used correctly four
times, no adjudication attempted anywhere, and no repeat of the agency-vs-release
error. Pointing him at extraction and keeping the judgement elsewhere is the right
division of labour and should be kept.

### Confirmed verbatim in the Regulations

Read directly from SOR/2007-303 s.3.1 (Division 1, Interpretation). The
Equalization revenue-base definitions pin themselves to **named Statistics Canada
products**, repeatedly and explicitly:

- *"household final consumption expenditures as determined by Statistics Canada
  for the purpose of its **Provincial and Territorial Economic Accounts**, net of
  any taxes on products"*
- *"the gross fixed capital formation in machinery and equipment, as determined by
  Statistics Canada on the basis of data for or from its **System of Macroeconomic
  Accounts**"*
- *"any of the commodities as defined by Statistics Canada for the purpose of its
  **Provincial Supply and Use Tables**' summary level final demand matrix"*

Counts in the retrieved text: System of Macroeconomic Accounts **11**, Provincial
and Territorial Economic Accounts **11**, Provincial Supply and Use Tables
throughout s.3.1. Also confirmed present: *Gasoline and Other Petroleum Fuels
Sold* (5), *Census of Agriculture* (1), CANSIM 405-0004 (2), table 23-10-0066-01 (2).

**This is the Tier 2 thesis confirmed from the primary source.** The Equalization
formula does name specific statistical products, not just the agency, so the
cluster is buildable to the evidence standard. It is a bigger prize than expected:
these are *definitions*, so every province's revenue base runs through the same
handful of named StatCan products.

### Two defects in his output, neither fatal

**1. Section attributions are wrong.** He filed these under "s. 1(1) and s. 8".
They are in **s.3.1**. The table of contents confirms s.8 is the *Nova Scotia*
revenue base, a different division. The quotes are real; the citations are not.
Every provision needs re-citing before use.

**2. He returned an "illustrative cluster".** Fourteen quotes bundled under one
PROVISION heading, explicitly labelled illustrative. That is unciteable as given —
FORMAT S asks one provision per entry precisely so each quote carries its own
section number. This is the one instruction he did not follow, and it is the thing
to re-emphasise next round.

### Unverified — do not treat as found

Beyond my retrieval limit (the fetch truncated mid-s.8, and ss.11–12 sit on a
later page):

- **Survey of Employment, Payrolls and Hours** — claimed as a named source for a
  payroll revenue base. **Would be a new documented edge to `statcan-seph`, an
  existing node currently ranked 6th.** High value if real. Not found in what I
  retrieved, but I did not retrieve the sections where it would sit.
- CANSIM 127-0007, 183-0024, 002-0020 — same status.
- s.11 population (June 1 → July 1, per SOR/2023-230) and s.12 certificate. The
  sections exist and are correctly named in the table of contents; the quotes are
  unchecked. Note s.11 would *corroborate* what V1.5 already records about the
  July 1 estimate, which is mild independent support.

**Nothing from Round A has been added to the graph.** The material is strong enough
to be worth a proper pass, and that pass needs the regulation read page by page
rather than trusted.

---

## Where Tier 0 now stands

**BACKLOG.md's stated completion check for Tier 0 is met on connectivity.** It
reads: *"under documented-plus-`evidence_url` only, the graph is one component
with no orphans."*

| | V0.8 | now |
|---|---|---|
| strict components | 3 → 2 | **1** |
| strict orphans | 6 → 2 | **0** |
| `evidence_url` coverage | 160 → 166 | **173 of 184** |
| seed edges with no document | 21 | **11** |

Eleven edges still lack a document, so Tier 0 is not finished — but the structural
half of it is, and expansion is no longer gated on connectivity.

---

## If you want a next step

The Treasury yield curve node is the standout — it is one research pass, it
reconnects a federal release that just fell out of the graph, and the evidence is
already sitting in the H.15 footnotes waiting to be used.
