# Scout Brief VIII — reconnaissance across every other realm

**This is not an extraction brief. Do not quote anything.**

Briefs IV through VII asked you to open documents and copy passages out of
them. This one asks you to do something different and, done properly, harder:
**find out what exists**, across about twenty-five jurisdictions, and tell me
where the material is before anyone reads a word of it.

The extraction brief for this territory is already written and is sitting in
`research-input/` as a draft numbered IX. **What you return here decides what
goes into it.** Jurisdictions your recon says are barren get dropped; ones you
say are rich get the full five-question treatment.

---

## Why the format changed

The last brief asked for roughly 125 entries across twenty-five jurisdictions
and got eight. The eight were good — three of them established the central
finding on the first jurisdiction, which is a real result — but the coverage
was six per cent, and I do not think that is your failure. A twenty-five-way
matrix combined with "write as you go" invites going deep on the first thing
you find. There was no way for you to know that the Micronesia entries were
three of a hundred and twenty-five rather than three of eight.

So: **breadth is the deliverable this time.** Depth is explicitly not wanted.
An entry here should cost you a fraction of what an extraction entry costs,
and I want a hundred-plus of them.

This split is how this project has worked before. A previous round scouted
Switzerland, Norway and the UK deliberately light — characterise what exists,
extract nothing — and then deep-dived the one that looked best. The scouting
was not verification-grade and was never meant to be. Neither is this.

---

## The question, per jurisdiction

For each jurisdiction below, find out whether these five things exist, and
where:

1. **Audited government financial statements** or public accounts.
2. **An annual budget** or appropriation document.
3. **A national statistics output** — national accounts, CPI, or government
   finance statistics.
4. **A fiscal transfer instrument** from the metropolitan state — a statute,
   grant agreement, block grant provision, or compact.
5. **An audit institution** — who audits, and is it local or foreign.

You are not answering what these documents *say*. You are answering **whether
they exist, who publishes them, what they are called, how often, and whether I
will be able to fetch them.**

---

## Output format

Newline-delimited JSON, one object per document. Not per jurisdiction — a
jurisdiction with five documents gets five objects.

```json
{
  "item": "GL-2",
  "jurisdiction": "GL",
  "publisher": "Naalakkersuisut (Government of Greenland)",
  "exact_title": "Finanslov for 20XX",
  "url": "https://...",
  "doc_type": "budget",
  "cadence": "annual",
  "most_recent": "2026, published December 2025",
  "language": "da/kl",
  "fetch": {
    "status": "ok",
    "format": "pdf",
    "notes": "served to a plain request, text-layer PDF"
  },
  "names_sources": "unknown",
  "location_pointer": "Section 4 'Forudsætninger', around p.20",
  "characterisation": "Annual appropriation act. Appears to carry an economic assumptions section.",
  "access": "opened",
  "flags": []
}
```

### The fields that matter most

**`fetch`** — this is the single most valuable thing you can give me and no
previous brief has asked for it. Fetchability has been the binding constraint
on this project all week: New Zealand's legislation site returns HTTP 202 with
zero bytes to anything that is not a browser, PacLII returns 403, two of three
New Zealand councils return 403 and 406, and the Danish legal register is a
JavaScript app that returns nothing at all. Every one of those cost me time to
discover.

`status` is one of `"ok"`, `"403"`, `"js-rendered"`, `"login-required"`,
`"pdf-only"`, `"not-found"`, `"unknown"`. `format` is `"pdf"`, `"html"`,
`"scanned-pdf"` (i.e. images, no text layer), `"xlsx"`, `"unknown"`. Say in
`notes` what you actually tried. **A jurisdiction whose documents cannot be
retrieved is worth knowing about before I plan a week around it.**

**`names_sources`** — one of `"yes-titled"`, `"yes-agency-only"`, `"no"`,
`"unknown"`. Does the document appear to name its own data inputs, and if so
does it name them by publication title or only by agency? This is the leading
indicator of whether extraction will pay off. **`"unknown"` is a completely
acceptable answer** — do not open and read a document to fill this in. If you
can see it from a table of contents or a methodology heading, say so; if not,
say `"unknown"`.

**`location_pointer"`** — where in the document stage two should look. "Note 2,
Statement of Compliance", "§5 Data sources", "Independent Auditor's Report".
No quote, just the address. This is what makes the extraction round fast.

**`characterisation`** — one to three sentences, plain description. What kind of
document is this and what is notable about it.

**`access`** — unchanged from previous briefs and still required.
`"opened"`, `"search-snippet-only"`, `"memory"`, `"blocked"`.

### What not to do

- **No quotes.** Not one. If you find yourself wanting to quote something, put
  a `location_pointer` on it and move on — that is what tells me to send the
  extraction brief there.
- **No `existing_ids`.** That field is retired for scouting. It has been
  misused twice now in ways that were adjudication rather than extraction —
  SNA 1968 tagged as `sna-2008`, and ANZSIC tagged as `naics`. Related is not
  the same, and deciding that is my job.
- **No verdicts.** `characterisation` describes; it does not rank.
- **Do not go deep.** If a jurisdiction is turning into a rabbit hole, log what
  you have and move to the next one. You can always be sent back.

---

## The jurisdictions

**Compact of Free Association with the United States**
`FM` Federated States of Micronesia · `MH` Marshall Islands · `PW` Palau

*Already partly done: FSM's FY2023 statements are located, use US GAAP and
GASB, and are audited by Ernst & Young under US Government Auditing Standards.
Do not redo FSM's financial statements. Do find FSM's budget, statistics and
Compact instrument, and do all five for Marshall Islands and Palau.*

**Kingdom of the Netherlands**
`AW` Aruba · `CW` Curaçao · `SX` Sint Maarten · Caribbean Netherlands
(Bonaire, Saba, Sint Eustatius)

*Specifically look for the* College financieel toezicht *(Cft) and whether it
publishes recurring supervisory reports. A supervisory body publishing about
budgets it supervises is a document type this corpus has no example of.*

**Danish Realm**
`GL` Greenland · `FO` Faroe Islands

*The Greenland block grant lead is live but unusable as it stands — it came
back sourced to an encyclopaedia article rather than the statute. What I need
from you is the primary text's location:* Lov om Grønlands Selvstyre *(2009)
§ 5, and whichever Faroese equivalent exists. `retsinformation.dk` is a
JavaScript application and returns nothing to ordinary retrieval — if you find
a route to the statute text that is not that site, that alone is worth the
entry.*

**United Kingdom — Crown Dependencies and Overseas Territories**
`JE` Jersey · `GG` Guernsey · `IM` Isle of Man · `GI` Gibraltar ·
`BM` Bermuda · `KY` Cayman Islands · `MS` Montserrat · `FK` Falkland Islands ·
`SH` St Helena

*The UK's own CIPFA Code is already in this corpus. The open question is
whether any of these use it, use IFRS, or use something of their own.
Montserrat and St Helena are the budgetary-aid cases where a transfer
instrument should exist.*

**France**
`NC` New Caledonia · `PF` French Polynesia · `WF` Wallis and Futuna ·
`YT` Mayotte · `RE` Réunion

*The overseas departments are inside the EU and the Pacific collectivities are
not, which makes this the one metropolitan state where the EU-alignment
question is testable internally. Look for the* Institut d'émission d'outre-mer
*and New Caledonia's ISEE.*

**Others**
`AX` Åland (Finland) · Azores and Madeira (Portugal) · Basque Country and
Navarre (Spain) · `PR` Puerto Rico (US)

*Puerto Rico is the outlier in this list and may be the richest single target
in it — the PROMESA Oversight Board publishes certified fiscal plans that are
formula-heavy and unusually explicit about data inputs.*

---

## Volume, stated plainly because last time I did not

Twenty-five jurisdictions, five document classes. **The shape of a complete
return is 100 to 150 objects.** If you are going to run short, go wide and
shallow rather than deep on a few — a `"unknown"` in every analytical field
with a good title and a working URL is still a useful entry, and a jurisdiction
you never touched is not.

**Required, as the last thing you send: a coverage ledger.** One object,
`item: "LEDGER"`, listing every jurisdiction from the list above under one of
three headings: `covered`, `partial`, `not_attempted`. I would rather know you
did not reach the Falklands than have to work it out from an absence.

---

## Priority, if you run short

1. **Marshall Islands and Palau** — completes the Compact set, which is the
   direct structural parallel to the work already done and the comparison I
   most want.
2. **Greenland and the Faroes** — the block grant and its indexation.
3. **Puerto Rico** — likeliest single richest target.
4. **Kingdom of the Netherlands** — the Cft question.
5. **Crown Dependencies.**
6. **France.**
7. Everything else.

---

## The failure modes, carried forward

1. **A confident entry for a document never opened.** The `access` field exists
   so you never choose between useful and accurate. `"memory"` costs nothing.
2. **Reporting only the strong findings.** A jurisdiction that publishes
   nothing, or publishes only scanned images with no text layer, is a result I
   will record and use. Log it.
3. **Smoothing.** Not relevant here, because you are not quoting. It becomes
   relevant again in the extraction round, and I will restate it then.

One genuinely new one for a scouting round: **do not infer a document into
existence.** If a jurisdiction plainly ought to publish audited accounts and
you cannot find them, the entry is `"status": "not-found"` with the searches
you ran — not a plausible-looking URL. A guessed URL costs me more than a blank
does, because I have to prove it wrong.
