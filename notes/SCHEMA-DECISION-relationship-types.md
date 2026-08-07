# Schema decision: `audits` and `supersedes` — DECIDED

Written 2026-08-06 by the session that produced `NZ/G.3.md`. Item 3 of `NZ/G.2.md`'s
priority list.

> **DECIDED 2026-08-06. Thomas chose option C.** Implemented the same session, data layer
> and validator only — no rendering. `RelationType` and `Relation` are in
> `src/lib/types.ts`; `relations` is assembled and exported from `src/data/index.ts`; the
> validator has a `RELATIONS` section. Authority scores are byte-identical before and
> after across all 300 nodes, which is the point of the option.
>
> **One relation exists, and that is the result worth reading.** Of the seven documented
> instances this note was written to rescue, exactly one — Niue — could be minted. The rest
> are blocked on something the note did not identify: see *What implementing it actually
> found*, at the bottom. The original text is left unedited above that section, because a
> decision document that quietly rewrites its own premises is worth nothing.

The rest of this file is as it was written before the decision.

## The problem in one paragraph

`RelationshipType` has four values — `calculated_from`, `uses_data_from`,
`methodology_depends_on`, `cites`. Every one of them describes one document being a
computational or methodological **input** to another. Two well-evidenced relationships
found by the research have no home in that set, and both were recorded as `_dropped`
notes rather than force-fitted:

- **`audits`** — one body assures another body's report. Six documented instances, all
  from the 2026-08-06 Realm / associated-states pass.
- **`supersedes`** — one programme or document replaces another in time. One documented
  instance, from `EU/G.49.md` Finding 3, open since 2026-08-04.

## The evidence, so the decision doesn't have to go looking for it

### `audits` — six instances, three shapes

Recorded in full in `src/data/research/realm-government-finance.json` and
`associated-states-government-finance.json`, under `_dropped` reason `note`.

**Export of institution (2).** A foreign audit office personally signs.

- Niue. The Controller and Auditor-General of New Zealand signs the Government of Niue's
  accounts "in exercising functions and powers under Article 60 of the Constitution of
  Niue" — i.e. installed by *Niue's own* constitution, not New Zealand's.
- Tokelau. Tokelau Finance Rules 1998: "(1) There shall be an auditor of accounts for the
  Tokelau Administration. (2) The Auditor-General of New Zealand shall be the auditor of
  accounts which contain public money".

**Export of method only (3).** A private firm audits under a foreign country's standards
while the jurisdiction keeps its own audit office.

- Federated States of Micronesia, Marshall Islands, Palau. Ernst & Young entities in
  Kolonia, Majuro and Koror, auditing under US GAAS and Government Auditing Standards
  issued by the Comptroller General of the United States. The Marshall Islands' own audit
  office is constitutionally independent under Article VIII § 15.

**Neither (1).**

- Greenland. A private auditor under international auditing standards plus "de yderligere
  krav der er gældende i Grønland", against a Greenlandic statute.

### `supersedes` — one instance

- The UK Shared Prosperity Fund succeeding EU structural funds. `EU/G.49.md` Finding 3.
  Well-evidenced, no edge, recorded as a `note`.

## What makes this a real decision rather than an obvious yes

There is already a precedent in this codebase for **refusing** a new `RelationshipType`,
and the reasoning applies almost word for word. The long comment in `src/lib/types.ts`
around `part_of` says containment was made a field on `Report` and deliberately *not* a
`component_of` relationship type, because:

> `RelationshipType` is defined as *how one report depends on another* and every value of
> it feeds `RELATIONSHIP_WEIGHT`. Containment is not a dependency, and giving it a weight
> would convert a bounded 15.2% understatement into an unbounded overstatement.

`audits` fails the same test in the same way. Assurance is not an input. An auditor's
signature does not make the audited statements *derive from* anything the auditor
publishes, and the arrow arguably points the wrong way for authority flow: the audit
office gains standing from signing, the statements do not gain their content from the
audit office. Adding `audits` to `RelationshipType` would put a number in
`RELATIONSHIP_WEIGHT` for a relationship whose weight nobody can defend.

`supersedes` fails it differently and more cleanly: succession is a fact about time, not
about content, and a weight for it is meaningless in either direction.

## Four options

**A. Do nothing; keep recording these as `_dropped` notes.**
Cost: the single most interesting finding in the Realm pass — that New Zealand exports the
auditor while the United States exports the method — is invisible in the graph and lives
only in prose. Seven instances and counting. Benefit: no schema risk, no weight nobody can
defend, the `_dropped` arrays already carry the evidence and are read.

**B. Widen `RelationshipType` with `audits` and `supersedes`, weight 0.**
Cheapest change that makes them visible. But a zero-weight member of a type whose entire
purpose is to feed `RELATIONSHIP_WEIGHT` is a special case that every consumer of that
record has to know about, and the `part_of` comment is an argument against exactly this.

**C. Add a second, parallel edge list — `relations` alongside `dependencies` — with its
own type union and no weight at all.**
This is the `part_of` decision generalised: relationships that are real, documented and
non-derivational get represented, get rendered (hover card, search, maybe a different line
style), and never touch the maths. Most work; most likely to be right; and it gives a home
to the next gap, which on current evidence will arrive.

**D. Decide explicitly against, and write the reasons into `types.ts` next to the
`part_of` comment.**
This is a real outcome, not a non-outcome. The value of the `part_of` comment is that it
stops the question being re-litigated. Six instances deserve the same treatment even if
the answer is no.

## Recommendation, offered as one and not as a finding

**C if the schema is going to be touched at all; otherwise D.** What should not happen is
another two sessions of A by default, because A is currently being chosen by nobody — it
is just what happens when the question is left open, and the note in
`associated-states-government-finance.json` is now the sixth place the same paragraph has
been written.

The one thing this document will not do is decide it. `Research.1.md` §3 is explicit that
adjudication is not the research role, and a data-modelling change to the type that drives
the authority ranking is further outside it than most.

## If the answer is B or C, here is the checklist

1. `src/lib/types.ts` — the type union, and a comment next to `part_of` explaining why
   this case was decided differently from that one.
2. `src/lib/graph.ts` — `RELATIONSHIP_WEIGHT` is a `Record<RelationshipType, number>` and
   will not compile until every new member has a number. That is the forcing function, and
   it is the reason option C (a separate list) avoids the problem rather than solving it.
3. `scripts/validate-data.ts` — the drop-reason and edge-type tallies.
4. The six `_dropped` notes named above, which become edges and should be converted rather
   than duplicated. They are in two files.
5. `Research.1.md` §9, and its header version, which is still unresolved — see
   `NZ/G.3.md` Corrections.

---

# What implementing it actually found

Added 2026-08-06, after option C was chosen and built. This section post-dates the
decision and corrects the analysis above.

## The ontology gap was real, and it was not the binding constraint

Seven documented instances went into this note. One came out as a `Relation`:

```
nu-ag-report-assembly -[audits]-> nu-government-financial-statements
```

The other six could not be minted, and the reason is the same in every case and has
nothing to do with `RelationshipType`. **There is no node for the auditor.**

- **Tokelau.** The Tokelau Finance Rules 1998 install the Auditor-General of New Zealand,
  and the quote is unambiguous. But no Tokelau audit opinion, and no recurring publication
  of the New Zealand Auditor-General, is a node. Reclassified from `note` to `no-node-yet`.
- **FSM, Marshall Islands, Palau.** The auditors are Ernst & Young entities in Kolonia,
  Majuro and Koror. A private firm whose opinion is bound into the audited statements is
  not a recurrently published official report, so it fails `Research.1.md` §4.2 — the same
  disqualifier that keeps J.D. Power, ICE Brent and Darroch Limited out of the corpus.
  **This will never be mintable.** Reclassified from `note` to `unpublishable-source`.
- **Greenland.** Same shape as the Compact three.
- **UK Shared Prosperity Fund.** Neither end is a node — there is no `gb-ukspf-prospectus`
  and no node for the EU structural funds — so a `supersedes` relation would dangle at both
  ends. Reclassified from `note` to `no-node-yet`.

So the corrected finding is: **the constraint on representing assurance in this corpus is
the node inventory, not the type union.** A node must be a recurrently published official
report; auditors mostly are not. Where a public audit office publishes recurrently — the
Controller and Auditor-General of New Zealand does, which is the only reason
`nu-ag-report-assembly` exists — the relation is mintable. Where the auditor is a private
firm, it never will be, and the honest representation stays what it already was: the three
`-> us-gao-yellow-book` dependencies, which record that the statements depend on the
American auditing standard rather than that a named firm audits them.

That is a structural fact about public-sector assurance and is worth more as a finding than
the six edges would have been.

## Was the change worth making anyway

Yes, on three grounds, none of which is the instance count.

1. **It closes the question.** Two hand-off chains had carried it for three sessions, and
   the cost of an open schema question is that every pass rediscovers it and writes the
   same paragraph again. That paragraph had been written six times.
2. **It converted a blanket `note` into precise leads.** The two governing `_dropped`
   entries now say exactly which node is missing and what unblocks each case. The Tokelau
   one is a single lookup with a single dependent finding, which is the best kind of
   backlog item.
3. **The one relation minted is the informative one.** Niue's is the case where the
   appointment runs the unexpected way — a New Zealand statutory officer auditing under
   *Niue's own* Constitution — and it also demonstrates that a dependency and a relation
   over the same pair are different claims, since `nu-ag-report-assembly` both
   `uses_data_from` and `audits` the same statements. The validator prints that overlap
   deliberately.

## What was built, exactly

- `src/lib/types.ts` — `RelationType` (`audits`, `supersedes`) and `Relation`. `basis` and
  `evidence_url` are both **required**, stricter than `Dependency`, because a relation buys
  none of the authority maths and the only thing justifying it is that a document says so.
  There is no `implied` relation and there should not be one.
- `src/data/index.ts` — `relations?` on `ResearchSlice`; assembled with the same dangling
  rule as dependencies and **no** `source->target` dedup, since a pair may legitimately
  hold both a dependency and a relation. `loadIssues.danglingRelations` and
  `.duplicateRelations` added.
- `scripts/validate-data.ts` — a `RELATIONS` section: counts by type, the relations
  themselves, an evidence check, dangling and duplicate reporting, and the
  dependency-overlap count.
- **Nothing in `src/lib/graph.ts`.** `buildGraph(reports, dependencies)` is unchanged and
  has no overload that accepts relations. The isolation is structural, not conventional —
  stronger than the `implied` mechanism, which keeps unweighted edges in the same array and
  filters them at four separate call sites.

## Still not done

Rendering. Option C's fuller form put relations in the hover card, in search, and in the
scene as a distinct unweighted line style following the `implied` precedent. None of that
was built, deliberately — with one relation in the corpus there is nothing to look at, and
the session had no way to see the render. Revisit when the Tokelau and UKSPF nodes exist
and the count is above one.
