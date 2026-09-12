# Corpus — §7c what is and is not a node, and §7d parked/closed

**Split out of `PLAYBOOK-CORPUS.md` on 2026-09-09** (Thomas: *"reassess all the required
readings and split them down"*). **Nothing here was reworded, cut or renumbered** — the text is
byte-for-byte what it was inside that file, and its section headings are unchanged so every
existing cross-reference still resolves.

**Read this when:** you are MINTING a node, or about to re-open a question that may already be settled.
**This file owns what IS and IS NOT a node**; whether a document names one is `corpus-naming.md`.

**THE BOUNDARY, so nothing lands in the wrong file again** (stated 2026-09-11, after three entries had):
**`corpus-naming.md` is POLICY — what counts as a citation at all, and it would be true if the grader did not
exist.** **`corpus-evidence.md` is MECHANICS — how the grader and the matchers actually behave.**
**`corpus-route.md` is what the ROUTE the bytes came by does to the grade.** **`corpus-hosts.md` is what a
failed fetch does and does not prove.** **`corpus-nodes.md` is what is and is not a node.** If an entry would
still be true with no tooling at all, it is policy; if it explains why a tool did something, it is mechanics.

**You do not read this by default.** `PLAYBOOK-CORPUS.md` carries a one-line index of everything
below; it tells you a ruling exists and what it decides, and you come here for the reasoning only
when it binds the question in front of you. 

---

### 7c. What is and is not a node

**Treaty and agreement nodes: retired, do not re-import** (Thomas,
2026-08-29). 72 nodes removed — bilateral/plurilateral trade agreements,
investment-treaty and bloc-membership framings, multilateral conventions.
Full record and examples: `notes/retired-nodes-2026-08-29.json`. **The
reason is structural, not evidential**: a treaty isn't a publication with
a methodology dependency, no research round could ever wire one — they
were 7% of the corpus and 11% of its isolated nodes, all orphans, no edge
broken. **Closed 2026-08-31 (Thomas, ruling 2-A after the audit's D4):
that sweep removed orphans only, so 31 FTA-family nodes that had edges
survived it — retired the same day with `ar-mercosur`, records in
`notes/retired-nodes-2026-08-31.json`.** The class is now retired in
practice as well as principle. Still nothing in the validator stops a
new one — a title regex is too contaminated to trust (see the meta-node
paragraph below); the guard is this paragraph and the reviewer.

**A node's `publisher` is a body, not a derivation note** (Thomas,
2026-08-31, ruling 3-A after the audit's D7). "Derived from UNICEF and
education monitoring sources", "WHO / national sources", "Derived from
international compilations" name a topic with a figure attached, not a
recurring official release, and no document can ever name a topic as an
input — 62 such nodes retired (`notes/retired-nodes-2026-08-31.json`).
A lazy "X / related" or "X / Y related" string on a real release is a
field to fix, not a node to drop — 166 rewritten to the first-named body
(`notes/publisher-cleanup-2026-08-31.json`). The validator's PUBLISHERS
block prints any new one. Don't mint a node whose publisher you can't
name.

**The four orphaned NSO nodes are PARKED — ruled by Thomas 2026-09-09. Do not re-hunt them.**
`iq-cso`, `ye-cso`, `sy-cbs`, `sd-cbs` (the statistics offices of Iraq, Yemen, Syria and Sudan)
went isolated in round 7 when the null-ComplianceDate ruling took their e-GDDS edges out — a
membership is not a dependency. **They are NOT duplicates and are NOT to be retired**: an
institutional node and a country's publication nodes are designed to coexist, and `af-nsia` proves
the shape works the moment some OTHER report names the stats office as its source. The hunt has
already been run once — the 2026-09-08 pass read Iraq's, Yemen's and Sudan's own non-NSO reports
looking for a general sourcing statement and found none anywhere, only the narrow CPI-methodology
boilerplate `iq-cpi` already carries. So they are **legitimate-but-currently-unwireable**, and the
ruling is that they stop being picked up as a lead every time someone scans the orphan list. They
unpark themselves if a document ever turns up naming one as a source; nothing else reopens them.
*(`ir-sci` is unrelated — already covered by the null-ComplianceDate ruling itself. And `iq-cso`
carries a SEPARATE, still-open structural question: it may be an unrecognised duplicate of the
imported `iq-cpi` / `iq-national-accounts` / `iq-population` — same real agency, no `part_of` link,
minted in a different batch. That is a question about the August 2026 import, not about wiring, and
parking does not settle it.)* Narrative: memory `round_orphaned_nso_iq_coicop_2026-09-08`.

**A legal instrument stays a legitimate node when a statistical release
names it as its own legal/methodological basis** — Japan's Statistics
Act, Brazil's Lei 8.213, the EAEU statistical protocol, national social-
protection acts, the EDP inventories: whole rounds are built on that
family, untouched by the sweep above. The cut is "instrument nobody's
statistics depend on," not "instrument."

**Analytical meta-nodes: 5 retired, sweep deliberately stopped there**
(Thomas, 2026-08-29) — comparison-device/policy-frame nodes with no
publication behind them. **Do not extend this by keyword search: both
obvious signals are contaminated.** "framing" is a verbal tic of the August 2026 import that
also appears in real statistics-node titles ("Statistics and framing of
remittance inflows"). The corpus's own "meta-node" `_notes` phrasing
describes a node's ROLE IN THE GRAPH, not its nature — it lands on the
Okinawa Statistical Yearbook and Taiwan's Energy Statistics Handbook,
both genuine. A title-regex sweep caught 36 candidates, only 5 were real.

**Above all, never sweep the "— high/low-poverty contrast" nodes.** They
read like analytical framings and aren't — they're real subnational
jurisdictions (Ecuadorian/Peruvian/Uruguayan/Paraguayan/Bolivian/Chilean)
that the August 2026 import titled as a poverty-contrast set. They're the bulk of the
unresearched South America seam; deleting them destroys the next round
before it starts.

**A country may carry TWO tier edges, one REGISTER and one SELF-DECLARED** (Thomas,
2026-09-07, ruling on round 8's second question). Twenty-six countries in the NSDP
block have both: an older edge off an institutional node, where the IMF's own
register says the country adheres, and a new one off the country's National Summary
Data Page, where the country's statistical system says so itself. **Both stay.** They
are two different assertions with two different speakers (rule 19), separately
evidenced, and rule 13's don't-silently-override is the reason the second one did not
replace the first when it was minted. Do not open a pass to deduplicate them, and do
not treat a country that has one as already wired for the other.

### 7d. Parked and closed

**Parked.** `diary.csv` moved to `PLAYBOOK.md` (it binds any task, not just corpus
ones). Cadence: **read the share off `validate`'s CADENCE block — this file no longer states it.**
*(Stated a denominator until 2026-09-10 and rotted twice; `notes/doc-audit-2026-09-10.md` §4.)*

**`proposed:` domain tags: settled 2026-09-06, do not reopen.** 1,080 stripped, 6
promoted to approved `Domain` values, 43 mapped; the complete before/after record —
and the only way back, since there is no git safety net — is
`notes/proposed-tags-retired-2026-09-06.json`. `validate`'s DOMAINS block prints the
live count and has read **46 approved, 0 proposed** since. *(This paragraph described
the question as open, with 624 live tags and a pointer to a `HANDOFF.md` §3 decision,
until 2026-09-07 — three handoffs after it was answered. It is the find that produced
`HANDOFF.md` §4 step 5b.)*

**One-off scope calls, already decided — don't re-raise.** Iran's SNA vintage,
the generic MFSM citation (Vietnam, reversed to wired the next day), PH EBEIS
node-scope, the TW SIPRI direction mismatch and NACE Rev.2 (Türkiye). **Five of the
original six were verified 2026-09-06 to be recorded in the data's own `_dropped` and
live entries**, which this section's bar says is where a single-edge call belongs — so
the reasoning now lives only there, and this line exists to stop the questions being
re-opened. **The sixth, generic COICOP citations (Iran, Iraq, plus Morocco and Tunisia's
own CPI-social-protection rounds), is now closed too — ruled 2026-09-08.** Round 24
(2026-09-08) had wired Iraq's `iq-cpi -> un-coicop-2018` anyway, off a precedent set by
Morocco's and Tunisia's own edges, without flagging that it was reopening a call this
line already recorded as decided. Thomas ruled 2026-09-08: drop all three
(`iq-cpi`, `tn-ins-cpi`, `ma-hcp-ipc` -> `un-coicop-2018`) as `no-document`, matching the
IMTS-Revision-2 precedent — none of the three source documents names a COICOP edition,
and for Iraq and Tunisia the cited document's own divisional structure points to the
pre-2018 vintage rather than the one it was wired to. The "wire with a vintage caveat"
practice three separate rounds converged on independently did not actually satisfy the
corpus's own edition-inference standard; converging on a shape doesn't make it correct.
All three edges are now in their source files' own `_dropped` (reason `no-document`),
and `candidates-tier-wiring-2026-08-28.json`'s original Iraq entry (which had a stale
`resolved` note pointing at the since-dropped edge) was updated to match. See
`HANDOFF.md` §3 and memory `round_coicop_ruling_2026-09-08` for the full record. Do not
re-mint any of the three off the 2026-08-28/2026-09-06 precedent again — that precedent
is what this ruling overturned.

---

## Moved here 2026-09-11 from `PLAYBOOK-CORPUS.md`'s index

**Rounds 38-45 wrote full reasoning straight into the §6/§7 index lines**, which the 2026-09-09 split had
just emptied — seventeen entries across the two sections had grown back into essays and carried 37% of that
file. They are below, **byte-for-byte as they stood**, and the index now carries one line each pointing here.
*(Thomas, 2026-09-11, on being shown the measurement: "do it". Full account: `notes/doc-audit-2026-09-11.md`.)*

### A revising NOTICE does not mint an edition

- **A revising NOTICE does not mint an edition** (Thomas, 2026-09-10). 国统设管函〔2018〕74号 revised
  《三次产业划分规定（2012）》 onto GB/T 4754-2017 and NBS never retitled it: ONE node, the 2012 title, URL the 2012 text,
  the notice recorded in the description. A citation DATED to the revision reaches the node; a bare title does not,
  because it cannot say which state it means. Contrast GB/T 4754-2017, a real new edition with its own number.

### 7d. Parked and closed → `playbook/corpus-nodes.md`

### `RelationshipType` and the closed unions — the account

- **`RelationshipType` is a closed 5-value union** (`calculated_from` /
  `uses_data_from` / `methodology_depends_on` / `legal_basis` / `cites`).
  *(Corrected 2026-09-06 — this bullet said "4-value" and omitted `legal_basis`
  since the split; `types.ts` is the authority and ~10 live edges, the Japan
  Statistics Act family among them, already use it. An agent trusting the old
  count would have dropped a legitimate statutory edge.)* An off-union value →
  NaN edge weight → NaN PageRank corpus-wide, silent and total. `Relation` is
  only `audits`/`supersedes`. Same for `Domain` and every closed union: check
  `types.ts` before inventing a value, cast rather than parse.

