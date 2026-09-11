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

### Node instancing and the tick burst — unmeasured on Thomas's hardware
*Demoted 2026-09-07 after riding five handoffs. First carried 2026-09-05.*
The three mirror instancers took headless draw calls from 7,371 to ~85 and the
physics levers took a tick from 123.9 to 65.9 ms, both measured in a sandbox. The
target on real hardware was 25.00 → 16.67 ms and **nobody has run the 15-second rAF
trace to confirm it**. Recipe in memory `renderer_perf_measured_2026-09-04`; the
revert is one line in `useFrame` if it turns out wrong. This is here rather than in
`HANDOFF.md` because it fell off that file three handoffs ago and survived only as a
pointer inside `PLAYBOOK-RENDER.md` §3 to a `HANDOFF.md` item that no longer existed
— which is the failure `HANDOFF.md` §4 step 5b now exists to catch.

### DSBB — 750 `no-source-node` leads, parked
*Demoted 2026-09-06 after 5 handoffs. First carried 2026-09-05.*
684 leaf nodes' worth of IMF Dissemination Standards Bulletin Board leads whose
source node does not exist in the corpus. Parked deliberately on 2026-09-05: the
work is minting 684 nodes, not wiring 750 edges, and that is a programme rather
than a round. Note that the 2026-09-06 IMF unblock (`notes/imf-elibrary-2026-09-06.md`)
does **not** touch this — DSBB is `dsbb.imf.org`, a different host from
`elibrary.imf.org`, and was never probed.

*Updated 2026-09-07: `dsbb.imf.org` is no longer the blocker.* Rounds 7 and 8 read it
freely — two country endpoints plus three rendered tier pages, recipes in
`notes/imf-dsbb-2026-09-06.md` — and round 8 minted 70 NSDP nodes from its own
`NSDPUrl` field. What remains is the 684 leaf nodes, which is still a programme
rather than a round.

*Updated 2026-09-09 (handoff-080 slow-layer sweep) — NO LONGER PARKED, and the shape of the
problem changed.* Thomas ruled **option E**: take only the pairs whose Summary of Methodology
NAMES the country's own publication, so the node is minted on a named publication and not on a
DSBB category label. All 684 SoMs were fetched and filtered
(`Claude outputs/dsbb-pilot-2026-09-09/`, worklist `e-slice-tier1.json`), and **E is worth ~20
strong pairs plus ~10 marginal, not the 70–135 a 60-pair sample had predicted** — the sample was
3x optimistic and the correction is in `notes/dsbb-som-750-scoping-2026-09-09.md`. Rounds 33 and
34 minted 5 of them (Dominica, Saint Vincent, Kyrgyzstan, Azerbaijan, Moldova) and dropped 4 for
HOST reasons rather than evidence ones (Grenada, St Kitts, Malaysia, Tanzania). **So this entry is
now a live worklist of ~15 remaining pairs, not a parked programme** — the 684-leaf-node framing
above describes option B, which was not the option taken. Kept here rather than promoted back into
`HANDOFF.md` because it is a queue to work through, not a decision awaiting anyone.

---

### FR — the France programme, four rounds in and paused
*Demoted from `HANDOFF.md` §2 by the handoff-085 five-handoff review: present verbatim in 081-085 and
not acted on in any of them.* 21 nodes from 9 across rounds 13, 14, 15 and 17. The GNI-inventory method
is exhausted for this edition; **the live method is a third document naming a target by title**
(`round15_fr_note_de_conjoncture_2026-09-07`), and the unspent stock is the Note de conjoncture's
employment, enterprise, prices and international articles, none of which has been read against it.
Also unresolved and separately recorded: DGDDI's monthly bulletin, refused across six candidate classes
and looking structural (`round16_fr_dgddi_monthly_still_refused_2026-09-07`).

### DE — finished as a programme, with one scope question left
*Demoted from `HANDOFF.md` §2 by the handoff-085 review for the same reason.* 13 nodes → 46 across
rounds 11, 12 and the two national-core rounds; **the programme is DONE and is not to be re-opened as
one**. What remains is a single scope question — Chapter 10.3 of the Statistisches Jahrbuch, never
scoped because rounds 11-12 took 10.1 and 10.2 and stopped. It needs a ruling from Thomas on whether
10.3 is in scope at all, not research. That is why it belongs here and not in a todo list.

### DSBB option E worklist — where the ~15 remaining pairs live
*The `HANDOFF.md` §2 line was a restatement of the section above and was deleted by the handoff-085
review; this is the pointer it should have been.* Worklist
`Claude outputs/dsbb-pilot-2026-09-09/e-slice-tier1.json`, with all 684 SoM texts cached beside it.
Each remaining pair needs its publisher's own page found: Bahamas' three trade products, Guatemala's
*Boletín Estadístico*, Sri Lanka's *CBSL Annual Report*, Zimbabwe's three RBZ/ZIMSTAT products,
Barbados' *Report of the Accountant General*, Tajikistan's national-accounts annual.

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
full. The validator printed **"✓ no dependency cites a bare homepage as its evidence"**
from that evening until 2026-09-07. *Superseded in part: round 8 minted two edges
whose evidence URL is a host root (`is-nsdp`, `mn-nsdp`), because Iceland's and
Mongolia's own NSDPs genuinely live at `data.sedlabanki.is/` and `nsdp.nso.mn/` and
there is no deeper path to cite. Both are graded C, which is what keeps the warning
from being an error. The check still fires; it is no longer clean, and that is
correct.* Three of the six came back with the evidence being weaker than the
citation looked, and those are a live-edge decision in `HANDOFF.md` §3.

*(When an item is fixed or ruled out, its line moves here with the date and the
reason, and is deleted at the following review.)*
