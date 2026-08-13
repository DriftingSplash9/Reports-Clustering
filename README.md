# Economic Report Influence Graph

A 3D graph of official economic and statistical releases, where node size shows
how much everything else depends on that report.

**New here, or sending this to someone?** `START-HERE.md` explains what the
project is and why, in plain language and without assuming you'll run it.

See `REPORTS.md` for the design rules and the standing rules for anyone (human
or AI) working on this repo. There is no single "current state" file any more —
current state is whatever the newest hand-off says in the branch you're about
to touch (`AF/`, `EU/`, `NZ/`, `AU/`, `CA/`, each numbered independently) plus
whatever your own project memory carries forward. The old `sessions/V0.*.md`
running log is retired and archived; see `REPORTS.md` if you're wondering why
it's gone.

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

The committed `node_modules` is a Windows build, so an agent working in a Linux
sandbox cannot run `npm run check` or `npm run validate` in place — both fail
instantly with the esbuild platform error above, and deleting `node_modules`
is not an option because it belongs to the Windows install. Copy the tree out,
excluding `node_modules`, and install there:

```
rm -rf /tmp/rc && mkdir -p /tmp/rc
tar --exclude=node_modules --exclude=.git -cf - . | (cd /tmp/rc && tar xf -)
cd /tmp/rc && npm install && npm run check && npm run validate
```

Edit the data files **in place** in the real folder and re-copy; do not edit in
the scratch copy, or the work is lost. This cost four consecutive sessions the
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

## Where things live

**The code** — everything the app actually loads:

```
src/data/index.ts          the loader — merges the seed set with every research slice
src/data/reports.ts        hand-written seed reports (nodes)
src/data/dependencies.ts   hand-written seed edges
src/data/research/*.json   research slices, one file per topic area
src/lib/types.ts           the data model
src/lib/graph.ts           validation, authority scoring, sizing
src/lib/filter.ts          which nodes are drawn — a view, never a recalculation
src/lib/search.ts          find-by-name ranking
src/lib/selection.ts       click-to-focus cones
src/lib/palette.ts         colour by jurisdiction level
src/lib/view.ts            renderer settings behind the view panel
src/components/            the 3D graph, room, search box, and controls
scripts/validate-data.ts   what `npm run validate` runs
```

**The documents** — cleaned up 2026-08-13 (old handoffs, closed decisions and
the retired session-log thread moved into `archive/`, subfoldered by what they
were); the four files at root are the ones worth opening first, everything
else is filed by what it *is*:

```
REPORTS.md                 the design rules + standing rules. The document that matters most
START-HERE.md              plain-language explanation, for sending to people
Research.1.md              standing brief pasted into every research thread
README.md                  this file

AF/  EU/  NZ/  AU/  CA/    research branches: G.*.md hand-offs, one independent
                            numbering per branch — the newest file in a branch
                            is that branch's current frontier
  EU/slices/               EU staging area cited by slice provenance (do not move)
  EU/sources/               source PDFs (SEC00-10) and .docx source material
  EU/extraction/            Part A/B extraction notes, superseded Research drafts
  EU/prompts/                prompts sent to the external researcher
  EU/legacy-handoffs/        early EU hand-offs that exist only as .docx
  AF/AF-municipal-tier-protocol.md   reusable dispatch protocol for the AF branch's
                                      municipal-tier research rounds
planning/                  BACKLOG.md — Thomas's own tier-ranked priority list
notes/                     scratch — sweep-log.md (durable record of what got
                            swept to _to_delete/ and why) plus Thomas's own
                            unrelated personal files, left alone
archive/                   closed-out material kept for reference, not deleted:
                            handoffs/, code-review-2026-08-12/, decisions/,
                            notes/, planning/, sessions/ (the old V0.*/rollup
                            log thread), research-input/ (old Grok/GPT briefs),
                            logs/, plus whatever was already there
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
treated as an error. Same for a report that ends up with no surviving edge, and
for an edge that is defined in two places — the first definition wins and the
second is logged. If something you added does not appear in the graph, the
validate output tells you which of the three happened.

Every dependency needs an `evidence_url` — a document that explicitly names the
relationship. No document, no edge. See `REPORTS.md`.

Cadence is three numbers. `releases_per_year` on the report is how often it is
published — fractional below annual, so a standard revised once a generation is
`0.05`. `changes_per_year` is how often the number actually moves, and is only
worth setting when it differs. `reference_period` on the *dependency* is when
the dependent actually reads its source, which is a property of the pair rather
than of either report: the same CPI release reaches one report monthly and
another once a year. Fill it in only where a document states the period.

A source that is published but not official — a commercial price feed named by
the document that uses it — gets `"source_kind": "commercial"` on the node. Those
are drawn grey and left out of the authority ranking, so adding one cannot change
any existing report's size. Sources that are never published at all stay out of
the graph entirely and get recorded as a note on the report that uses them.
