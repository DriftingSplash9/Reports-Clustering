# Prompt — paste this into a fresh conversation

Copy everything below the line. It is written to be self-contained: it names
the files, states the standard, and says what the failure modes are, so the
agent does not have to be told the project's history first.

---

I'm working on the **Economic Report Influence Graph** at
`C:\Users\thoma\Desktop\My Files\Reports Clustering\`. It's a 3D graph where
each node is a real published government/statistical report and each edge is a
*documented* dependency — one report naming another as an input to itself. Node
size is a PageRank-style authority score.

**Read these three files first, in this order, before doing anything:**

1. `Research.1.md` (project root) — the standing research brief. It defines the
   evidence standard, the Part A record format, the slice JSON schema, the two
   traps ("comparable with" is not a dependency; a past-tense clause can
   describe a dead arrangement), and the existing node-id list. **The rules in
   it are not negotiable and not summarised accurately anywhere else.**
2. `EU\G.18.md` — the current state of the EU branch. Its *Orientation* section
   at the top tells you what changed most recently; *Thomas's stated priority
   for the remaining work* is the live to-do list.
3. `EU\slices\README.md` — the folder layout for this work, and a **blocker**
   about `src/lib/types.ts` you need to understand before proposing any
   `country` or `jurisdiction_level` value.

**You need filesystem access to this folder.** Everything below names paths
rather than attachments. If you cannot read the folder directly, stop and say
so — the material is far too large to paste.

## The task

`EU\EU Meta jsons.docx` is ~1.29M characters of accumulated EU research
(Eurostat, ESA 2010, ECB, Destatis, EU institutional budgets). It is a working
blob: batches of Part A extraction records, pasted in over several sessions,
in mixed shapes. **It stays where it is — it is the archive of record and will
be re-mined later. Never edit or delete it.**

A mechanical pre-split has already been run. In `EU\slices\_staging\`:

| File | What it is |
|---|---|
| `00-blob-fulltext.txt` | Lossless text extraction of the docx. The thing to grep. |
| `01-manifest.json` | Index: every batch, its scope, its record ids, char offsets. **Start here.** |
| `10-batch-with-records.ndjson` | 73 batch objects, 659 records total, one JSON object per line |
| `10-loose-record.ndjson` | 301 records that were not inside a batch |
| `10-batch-header.ndjson` | 8 batch headers (scope/session metadata, no records) |
| `10-part-b-soft-connections.ndjson` | 1 object — draft soft connections |
| `20-prose-sections.txt` | ~399k chars of Part A delivered as **prose, not JSON** — one ECB/Eurosystem batch dated 2026-08-03. Needs a human-supervised read; no script can do it. |

Coverage: 67.4% of the blob parsed as valid JSON. The rest is the prose section
plus array-separator noise.

**Your job is to turn that staging material into verified slice files** in
`EU\slices\eu-level\`, `member-states\` and `cross-layer\`, per that folder's
README.

## How I want to work

**One slice at a time.** Do not attempt the whole corpus in one pass — that is
the failure mode this project has already paid for twice (a 24-edge batch
where 2 survived; 14 good quotes discarded because they shared one heading and
none could be cited individually).

For each slice, in order:

1. Tell me which batch(es) from the manifest you're taking and why they group.
2. Show me the proposed slice — reports and dependencies — with, for **every**
   dependency, the verbatim quote and its location from the Part A record that
   supports it.
3. Flag separately, and do not silently resolve:
   - any edge whose quote doesn't actually state a dependency (the
     "comparable with" family — quote it anyway, as a documented
     *non*-dependency)
   - any past-tense relationship
   - any record where the direction is ambiguous (`source` depends on
     `target` — the dependent is the source)
   - any node id that might collide with one already in `Research.1.md` §9
   - anything that looks like a **terminus** (a named input that is a form, a
     tax record, a vendor feed, a confidential collection) — those are nodes
     now, not dead ends
4. Wait for my go-ahead before writing the file.

**Do not write any `evidence_url` you have not seen in a Part A record.** If a
field is missing, leave it out and say so — do not fill it in to make the JSON
validate. Part B never introduces anything Part A did not prove.

## What I also want you watching for

Beyond the mechanical conversion, I want to know about **structure**:

- **Does the EU actually produce the cross-layer edges the CA/US pair lacks?**
  The Canada–US finding is that there are zero standard-compliant direct
  official edges between the two national systems. ESA 2010 is a Regulation
  with a transmission programme in Annex B, which *should* be a documented
  obligation from the supranational layer to 27 national ones. If that holds,
  it is the most interesting thing in this branch and should shape which slice
  gets built first.
- **Whole categories of node I've missed.** If reading this material suggests a
  class of document that ought to be in the graph and isn't, say so. Don't
  scope it — just name it and why.
- **Anything in the blob that contradicts something else in the blob.** Two
  passages disagreeing is an ideal finding. Report both, pick neither.

Keep a running list of these in
`TODO LISTS\rolling-todo.md` under *Candidate categories* — that file is the
cross-session queue and is how I avoid losing threads.

## Constraints

- **There is no git repo in this folder.** Nothing is recoverable if you
  overwrite it. Write new files; do not modify existing ones without telling me.
- `npm run validate` is the check that matters after any data edit — but note
  EU slices **cannot be imported yet**, per the blocker in the slices README.
- Don't touch anything in `EU\` root (the `SEC*.pdf` files and `G.*` session
  logs) — another workflow expects those in place.

Start by reading the two files named above, then `01-manifest.json`, then tell
me how you'd group the 73 batches into slices and which one you'd do first.
