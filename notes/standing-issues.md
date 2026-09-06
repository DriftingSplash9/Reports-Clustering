# Standing issues — things that have outlived five handoffs

**This is a demotion, not a parking lot.** An item arrives here only because the
five-handoff review (`HANDOFF.md` section 4, step 5) found it riding along in
`HANDOFF.md` unchanged across five consecutive handoffs with nobody acting on it.
Carrying it in the state file was costing every agent a read and buying nothing;
carrying it here costs only the agent who is deciding what to work on next.

**Not on the mandatory read path.** `HANDOFF.md` section 1 points here for one
question — "what is still broken that nobody is fixing?" — and that is the only
reason to open it.

## The bar, both directions

**In:** five consecutive handoffs, unchanged, unacted-on. Not "unfinished" —
unfinished work in progress belongs in `HANDOFF.md` section 3 where it will be
picked up. These are the ones that will not be, until someone chooses them.

**Out:** an item leaves when it is fixed, or when Thomas rules it out of scope.
Either way the exit is written on the line, with the date, and then the line goes
at the next review. An item does not leave because it got stale or because a
review found it inconvenient.

**Never:** a settled decision (that is `PLAYBOOK-CORPUS.md` / `PLAYBOOK-RENDER.md`
section 7), a trap that changes how a task is done (section 6 of the same),
round narrative (project memory), or a finished item (nothing — finished items
are deleted; memory is their record).

---

## Open

### Egypt IPI compiler unverified
*Demoted 2026-09-06 after 5 handoffs. First carried 2026-09-04.*
The compiling institution behind Egypt's industrial production index was never
read from a first-party document. `sis.gov.eg` and `capmas.gov.eg` are both dead
or empty-bodied to every route tried (the CAPMAS static pages return HTTP 200 with
47 bytes of text). This is blocked on reachability, not on effort, and will stay
here until either host answers or someone finds a third-party first-party
republication.

### `naics` and `icd-10-ca` deliberately stay `kind: standard`
*Demoted 2026-09-06 after 5 handoffs. First carried 2026-09-04.*
Both are classification instruments and both were deliberately left as `standard`
rather than `instrument` when the `kind` field landed. This is not a defect and
does not need fixing — it is recorded because it looks like one, and an agent
tidying `kind` values will otherwise "correct" it. **Flip only if Thomas says so.**
(`icls-work-statistics-resolution` was in this group until 2026-09-06, when the
ICLS class was closed; it is now covered by the section 7 ruling instead.)

### Two parked design questions — layout re-run on data add, cadence in layout
*Demoted 2026-09-06 after 5 handoffs. First carried 2026-09-04.*
Whether the force layout should re-run when the corpus grows, and whether a
node's release cadence should influence its position. Both have been carried
since 2026-09-04 with **no numbers behind either and no round that needed them**.
`PLAYBOOK.md` rule 8 says a number nobody ran anything to get is a guess, and
neither question has one. They are here rather than in `HANDOFF.md` because the
honest status is "nobody has wanted this yet", and that is worth knowing before
someone spends a round on it.

### DSBB — 750 `no-source-node` leads, parked
*Demoted 2026-09-06 after 5 handoffs. First carried 2026-09-05.*
684 leaf nodes' worth of IMF Dissemination Standards Bulletin Board leads whose
source node does not exist in the corpus. Parked deliberately on 2026-09-05: the
work is minting 684 nodes, not wiring 750 edges, and that is a programme rather
than a round. Note that the 2026-09-06 IMF unblock (`notes/imf-elibrary-2026-09-06.md`)
does **not** touch this — DSBB is `dsbb.imf.org`, a different host from
`elibrary.imf.org`, and was never probed.

---

## Closed

### Research debt — 5 bare-homepage edges → FIXED 2026-09-06
Demoted here in the morning after riding five handoffs; closed the same evening,
which is the demotion working rather than a sign it should not have been demoted
— it needed someone to choose it, and being on this list is what got it chosen.
All five quotes turned out to be real and sitting in the `basis` prose with the
`evidence_url` pointing at a homepage: a citation fault, not missing evidence.
Every one was re-pointed at the document its quote actually came from, verified
by substring match against the live document. `nz-lgfa-annual-report ->
nz-la-annual-reports` C→A (LGFA Annual Report 2025 PDF, exactly the 77-page
document the basis had named all along) and `mg-loi-organique-2014-018 ->
mg-constitution-ctd` C→A (full text of the organic law on dgfag.mg). Two dead
hosts had live first-party alternatives nobody had looked for: `ine.gov.mz`
(HTTP 000) → the SADC Secretariat's own bulletin on `sadc.int`, and
`ins.gov.gn` (HTTP 000) → `stat-guinee.org`, which hosts the Guinea SNDS in
full. The validator now prints **"✓ no dependency cites a bare homepage as its
evidence"**. Three of the six came back with the evidence being weaker than the
citation looked, and those are a live-edge decision in `HANDOFF.md` §3.

*(When an item is fixed or ruled out, its line moves here with the date and the
reason, and is deleted at the following review.)*
