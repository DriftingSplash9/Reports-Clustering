# Economic Report Influence Graph

A 3D graph of official economic and statistical releases, where node size shows
how much everything else depends on that report.

**New here, or sending this to someone?** `START-HERE.md` explains what the
project is and why, in plain language and without assuming you'll run it.

See `REPORTS.md` for the design rules and the standing rules for anyone (human
or AI) working on this repo. Current state is `HANDOFF.md`, one file, top
level, always — read it first. The older regime (a numbered hand-off thread
per branch — `AF/`, `EU/`, `NZ/`, `AU/`, `CA/` — and the `sessions/V0.*.md`
log before that) is retired; that history is in `archive/`, not something a
new session needs to reconstruct.

## Running it

You need [Node.js](https://nodejs.org) 20 or newer.

In a terminal in this folder:

```
npm install
npm run dev
```

That opens the graph at http://localhost:5173. On Windows, `run.bat` does the
same thing with a double-click. Use `setup-and-run.bat` instead if you have just
moved this folder between machines — that one wipes and reinstalls, which is
slow and only needed after a move.

`node_modules` holds platform-specific binaries (esbuild, rollup). If you copy
this folder between Windows, macOS, Linux or WSL, delete `node_modules` and run
`npm install` again on the new machine — otherwise the build fails with an
"installed esbuild for another platform" error.

### Running the checks from a Linux sandbox

**The procedure lives in `PLAYBOOK.md` rule 4 and only there.** It carries the
current staging set and two traps this file did not know about — how to zip across
the device bridge without losing the archive, and why `tsx`/`vite` scripts fail in a
sandbox. A second copy used to sit here and the two had already drifted apart by
2026-09-07, which is why there is now one.

The one thing worth repeating, because it is about your own machine rather than the
sandbox: **edit the data files in place in the real folder and re-copy; do not edit
in the scratch copy, or the work is lost.** This cost four consecutive sessions the
same five minutes before it was written down.

## Other commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the graph with live reload |
| `npm run validate` | Check the seed data and print both authority rankings |
| `npm run check` | Type-check without building |
| `npm run build` | Production build into `dist/` |

`npm run validate` is the one worth running after any data edit — it catches
dangling references, shows whether weighted authority and raw citation counts
still agree, and checks that commercial sources are still outside the authority
calculation.

## Finding your way around the graph

| | |
|---|---|
| `/` or the top box | Find a report by name. Enter or click flies the camera to it |
| Click a node | Trace its chain — everything it rests on and everything resting on it |
| Esc | Clear the selection |
| Legend rows (left) | Click to filter that publisher scope in or out |
| Commercial (unranked) | Click to hide published-but-private sources. Nothing moves or resizes when you do — they sit outside the ranking |
| Drag / scroll | Orbit and zoom |

The app has grown a menu bar (Panels / Views / Help), saved views and deep links, a
Groups panel, isolate-and-neighbourhood, a tier ladder with folding orbs, PNG export
and a release calendar since this table was written. **Help ▸ What this is, in the
app, is the current tour** — it renders `START-HERE.md`. The table above is only the
keyboard-and-mouse basics.

## Where things live

**The code** — everything the app actually loads:

```
src/data/index.ts          the loader — merges the seed set with every research slice
src/data/reports.ts        hand-written seed reports (nodes)
src/data/dependencies.ts   hand-written seed edges
src/data/research/*.json   research slices, one file per topic area
src/lib/types.ts           the data model — start here, it is heavily commented
src/lib/graph.ts           validation, authority scoring, sizing
src/lib/                   23 more modules; the maintained map is PLAYBOOK-RENDER.md §4
src/components/            the 3D graph, panels, cards and the three instancers
scripts/validate-data.ts   what `npm run validate` runs
```

**The documents** — cleaned up 2026-08-13 (old handoffs, closed decisions and
the retired session-log thread moved into `archive/`, subfoldered by what they
were); the seven files at root are the ones worth opening first, everything
else is filed by what it *is*:

```
HANDOFF.md                 current state and the live todo — read this first
REPORTS.md                 the design rules and direction; standing rules are PLAYBOOK.md
PLAYBOOK.md                the core standing rules — short, binds every task
PLAYBOOK-CORPUS.md         research lane: the rules that bind every data change, plus
                            an INDEX of every trap and ruling (split 2026-09-09)
PLAYBOOK-RENDER.md         renderer lane: what the app is, architecture crib, invariants

playbook/                  the corpus lane's reasoning, read ON DEMAND when the
                            question arrives, never by default — corpus-naming.md
                            (§7a, does the document name the target), corpus-evidence.md
                            (§6, quotes and grading), corpus-nodes.md (§7c/§7d, minting),
                            corpus-route.md (§7b), corpus-hosts.md (§6, failed fetches).
                            Moved verbatim out of PLAYBOOK-CORPUS.md; its index names
                            every one of them.
START-HERE.md              plain-language explanation, for sending to people
README.md                  this file

notes/                     working notes read by task — `HANDOFF.md` §1 says
                            which, and `notes/README.md` indexes every file in
                            there, one line each. That index is the only list;
                            this entry deliberately does not repeat it.
                            Round narratives live in project memory, not here.
archive/                   every closed-out branch (AF/ EU/ NZ/ AU/ CA/) and
                            planning document, moved here whole once done, not
                            file by file — kept for reference, not deleted;
                            subfoldered by region or topic
_to_delete/                junk moved here on sight, never deleted by an agent —
                            the device bridge can move files but not delete them;
                            Thomas empties this by hand whenever he likes
```

## Adding data

New research goes in a **slice**, not in the seed files. Drop a JSON file into
`src/data/research/` with `reports` and `dependencies` arrays, import it in
`src/data/index.ts`, add it to the `slices` array, then run `npm run validate`.

The loader is deliberately forgiving so slices can arrive in any order: an edge
pointing at a report nobody has researched yet is **dropped and logged**, not
treated as an error, and a report that ends up with no surviving edge is kept
and shelved. Two things are *not* forgiven, and fail `npm run validate`: a
report id defined in two slices (first definition wins, the later copy is
dropped and the run fails), and an edge defined twice (the later definition
wins in the loader, but the run fails so the two copies get merged by hand —
see `assembleCorpus.ts`). If something you added does not appear in the graph,
the validate output tells you which happened.

Every dependency needs an `evidence_url` — a document that explicitly names the
relationship. No document, no edge. See `REPORTS.md`.

Cadence (`releases_per_year`, `changes_per_year`, `reference_period`) and
non-official sources (`source_kind: "commercial"`, and unpublished sources
noted rather than nodes) both carry real rules — see `REPORTS.md`'s Data
model and Decisions sections rather than duplicating them here, since a
second copy is exactly what goes stale.
