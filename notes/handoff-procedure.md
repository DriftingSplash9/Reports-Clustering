# How to hand off

**Moved out of `HANDOFF.md` §4 on 2026-09-09** (Thomas: *"reassess all the required readings and
split them down"*). It is 8.4k that binds exactly one task — writing a handoff — and every
research round was reading it to do something else. **The text below is byte-for-byte what §4
said**, including its own line about being the only copy; that line is still true, this is now
where the copy lives. `HANDOFF.md` §4 is a pointer to this file.

**One thing the procedure now has to know about, added 2026-09-09 rather than silently changing
the text below: the corpus lane is five files plus an index.** Step 5b sweeps the SLOW layer, and
that layer is now `PLAYBOOK.md`, `PLAYBOOK-CORPUS.md` **and everything under `playbook/`**,
`PLAYBOOK-RENDER.md`, `REPORTS.md`, `README.md`, `START-HERE.md`,
`notes/standing-issues.md` — plus the two live worklists `notes/china-progress.md` and the
techniques notes. Step 6's read-cost table must count the always-read set only, and say so.

---

## 4. How to hand off

**This is the only copy of this procedure — `PLAYBOOK.md` points here rather
than restating it.** Editing a line of §2/§3 during a round is not a handoff
and needs no archive. Writing a new handoff — replacing the state prose
wholesale — always does, and the test is whether the prose being replaced
would be unrecoverable afterwards, not whether §1–§4 still exist.

**Thomas asks for a handoff; the agent does all of this, in this order:**

1. Read this file first — it carries these instructions, and the state
   it describes is what you are superseding.
2. Copy it, unchanged, to `archive/Previous Handoffs/handoffNNN.md` —
   **`NNN` is the handoff's number, zero-padded to three, one higher than the
   highest already in the folder**. Verify the copy (`sha256sum` both).
   *(Naming changed 2026-09-08 on Thomas's instruction — "save them as
   handoff80.md, then the next handoff would be 81". This step read
   `HANDOFF-YYYY-MM-DD-HHMM-<topic>-NNN.md` until then, with the number at the
   END so older references by date-and-topic still resolved. **He ruled NEW ONES
   ONLY**: the 76 files already carrying the long name KEEP it and are not
   retro-renamed, so both shapes live in the folder and every existing
   cross-reference in `notes/` still resolves. The first file under the new name
   is `handoff077.md`. Zero-padding is not decoration — it is what makes the
   folder sort in handoff order.)* The numbering was added 2026-09-07 (Thomas) so
   the review triggers in steps 5 and 5b are arithmetic anyone can check, and the
   count must now span both shapes:
   `ls -1 "archive/Previous Handoffs" | grep -cE '^(HANDOFF-.*-[0-9]{3}|handoff[0-9]{3})\.md$'`
   is the number you just stamped.
   **Archive first, then rewrite** — there is no git safety net (rule 1);
   an un-archived overwrite destroys the previous state. That was missed on
   2026-08-29/30: `HANDOFF.md` was overwritten three times in one session and
   archived only retrospectively, from a copy that happened to still be in
   the session's context.
3. Write the new `HANDOFF.md` at the top level, same name, overwriting.
   Edit **Current state** and **Todo** directly — overwrite, don't
   append. State only, present tense, no changelog, no "DONE" entries.
   **This file is the fast layer and is meant to turn over** — §2's
   weight follows whatever lane is actually being worked, so if the work
   moves to the renderer, the corpus paragraphs shrink to a pointer and
   the renderer ones expand, not the reverse (`PLAYBOOK.md` §1, second
   test). Keep this §4 verbatim so the next agent knows the procedure.
4. **Sweep what is finished out.** A todo that is done, a lever that is
   settled and already described in §2, a "Settled:" entry from an
   earlier round — all leave. The round's project-memory entry is their
   record, and this file is state, not history. Nothing accumulates here
   by default; if you would not act on it next session, it goes.
5. **Every fifth handoff, review the last five.** The trigger is
   arithmetic, not memory: if the number you stamped in step 2 is
   divisible by 5, run the review. (The count spans both filename shapes —
   step 2 has the command.) Read this file's §2/§3 and the four archived
   handoffs before it, and find the paragraphs that appear in all five
   unchanged. Each one is then exactly one of three things. **Finished**
   — delete it, memory is its record (step 4 already says so, and this
   is the pass that catches what step 4 missed). **A restatement of a
   playbook or a note** — delete it and let §1 route there instead; a
   second copy of a rule is how the two drift apart. **A real open item
   nobody has acted on in five handoffs** — it goes to
   `notes/standing-issues.md`, which carries the bar in both directions.
   That is a demotion, not a deletion: it was costing every agent a read
   and buying nothing. **Introduced by Thomas, 2026-09-06**, from a
   practice that worked on another project; the first review ran the same
   day, off-cycle at 67, because §1-§3 was already over its own cap, and
   what it removed is recorded in the §1 note. If a review finds nothing
   to cut, say so and move on — "nothing" is a real answer, and forcing a
   cut to justify the pass is how good state gets destroyed.

5b. **Every twentieth handoff, sweep the SLOW layer.** Same arithmetic, a
   different divisor: if the number you stamped in step 2 is divisible by
   20, check `PLAYBOOK.md`, both lane playbooks, `REPORTS.md`, `README.md`,
   `START-HERE.md` and `notes/standing-issues.md` **against what
   `npm run validate` and the code actually say** — every count, every
   closed union, every cross-reference, every "as of", every pointer into
   `notes/` or `archive/`. Step 5 sweeps the fast layer against itself;
   nothing swept these at all until 2026-09-07, and the first hand-run pass
   found **seven live false statements** in files nobody had touched in
   weeks — a settled question still described as open, two pointers to
   things that no longer existed, three stale counts and a duplicated
   procedure that had drifted from its own original. **Correct in place and
   show the old wording**, the way `PLAYBOOK-RENDER.md`'s 2026-09-06 review
   did: a doc that quietly changes its mind is harder to trust than one that
   says what it got wrong. Record the pass in `notes/` as
   `doc-audit-<date>.md`; the first is `notes/doc-audit-2026-09-07.md` and
   it is the worked example of the format — section by section, every one
   given EDIT / DROP / KEEP / MOVE with the exact replacement text.

   **Two questions to answer explicitly in every 5b pass, in the write-up:**

   - **Should this sweep happen more or less often than every 20?** Say what
     the evidence was. Count the defects found and how old the oldest one
     was: if the oldest defect predates the previous sweep by a long way, 20
     is too slack; if the pass finds one or two trivia, it is too tight.
   - **Does Thomas want a recap of the past sweeps across the last 100
     handoffs?** Ask him, in §3, on any 5b where the archive has crossed a
     new hundred. Five sweeps' worth of findings is enough to show whether
     the same section keeps rotting, and that pattern is worth more than any
     single sweep.

   **The junk test, sharpened by Thomas 2026-09-08:** a paragraph earns its
   place only if it helps a current or near-term task — not because writing it
   down once might save a future round from re-solving the same one-off problem
   later. An ever-growing pile of one-off tips and tricks (a host quirk, a
   corner-case fix, a workaround for something that broke once) costs every
   future round a read whether or not it is ever used again; letting a rare
   problem recur and get re-solved when it actually recurs is cheaper than
   carrying the note indefinitely just in case. On the 20's, cut this kind of
   entry unless it has actually recurred — "still technically true" is not
   the bar.

   Introduced by Thomas, 2026-09-07: *"the slow layer needs swept every 20
   handoffs. do it on the 20's."*
6. **Refresh the read-cost table in §1** and repeat those numbers to
   Thomas in the handoff message — it is how he sees bloat arriving:
   `wc -c HANDOFF.md CLAUDE.md PLAYBOOK.md PLAYBOOK-CORPUS.md
   PLAYBOOK-RENDER.md REPORTS.md START-HERE.md`. *(This step ended "If §1–§3 is over
   10k, trim before adding" until 2026-09-07; that cap is retired — §1 says so — and the
   two percentages below the table are what gets defended instead. Corrected in place
   rather than left to make a future round trim §2 for no reason.)*
7. A finished round's story goes to **project memory** (write it as you
   go; if memory is down, park a note in `notes/` and say so here). A new
   standing rule or trap goes to whichever playbook binds it (`PLAYBOOK.md`
   §1 has the test). A design change goes to `notes/Midvamp - Revamp.md`
   (or `REPORTS.md` if it changes direction).
8. Never state git status here. Never delete anything on your own judgement.
   An agent may ASK for delete permission on a named folder — the user
   approves it once and it holds for the session — but the decision to
   delete is never the agent's, and without that approval the move is into
   `_to_delete/` with a line in its README.

Only one `HANDOFF.md` at the top level, ever.
