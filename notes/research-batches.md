# Running research in batches

*Moved out of `REPORTS.md` on 2026-09-07 by the first slow-layer sweep
(`notes/doc-audit-2026-09-07.md`). It sat on the scope file's mandatory read path
while four rounds in five are single-agent. The rules are unchanged and still binding
for any round that fans out — the last one to do so was the publisher-cluster round
of 2026-09-05, which re-worked 51 quarantined leads through parallel agents.*

**Read this before scheduling a batch round.**

---

## Step one, every time: regenerate the node-id list

Rule 3 below depends on handing every agent the full list of existing node ids, and
that list rots fast. `notes/_all-corpus-ids-2026-08-25b.txt` was measured on
2026-09-07 against the live corpus: it holds 3,254 ids, **omits 446 nodes that exist
and lists 213 that do not**. An agent handed that file would attach new work to 213
dead ids, which is the exact failure rule 3 exists to prevent. **Never reuse a saved
list — generate it in the round that uses it**, from `src/data/research/*.json` plus
the two seed files, and let it go afterwards.

---

## The rules

Findings go to `src/data/research/*.json`, one file per slice. The rules below were
bought with roughly 900,000 tokens of lost work and are not optional:

1. **State the incremental-write rule first, with its reason.** Anything
   long-running writes as it confirms, never at the end. Five agents were once
   told to research everything and write one file at the finish; a session limit
   killed all five before any had written anything, and two were within a step
   of done.
2. **One file per agent, named in the prompt.** No coordination, no conflicts,
   no agent waiting on another.
3. **Put the full list of existing node ids in every prompt.** This is what
   stops a batch producing disconnected islands — agents attach to
   `statcan-cpi` instead of inventing their own version of it.
4. **State what an agent does *not* own, not just what it does.** Two agents
   once independently defined the same node. The loader caught it, but
   converging definitions are the signature of overlapping slice boundaries.
5. **Give agents explicit permission to report negatives.** Some of the most
   valuable results have been confirmations that a relationship does not exist
   in any public document.
