# Corpus — §7c what is and is not a node, and §7d parked/closed

**Split out of `PLAYBOOK-CORPUS.md` on 2026-09-09** (Thomas: *"reassess all the required
readings and split them down"*). **Nothing here was reworded, cut or renumbered** — the text is
byte-for-byte what it was inside that file, and its section headings are unchanged so every
existing cross-reference still resolves.

**Read this when:** you are MINTING a node, or about to re-open a question that may already be settled.

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
ones). Cadence: 101 of 3,071 edges state when the reading happens; the validator's
CADENCE block is the live number, not this file.

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
