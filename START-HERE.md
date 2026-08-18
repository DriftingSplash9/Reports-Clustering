# The Economic Report Influence Graph

*A map of where official numbers come from.*

---

## The idea in one paragraph

Every important number in public life — inflation, interest rates, disability
payments, how much money your city gets for road repair — is calculated from
some other number, which was calculated from another, and so on back to a
handful of foundational statistical releases. Almost nobody can see that
structure, including the people who depend on it. This project draws it: a 3D
graph where each sphere is a real published report, each line is a documented
dependency between two of them, and a report's size is how much everything else
rests on it.

Right now it holds **1,250 reports and 1,079 dependencies** (measured
2026-08-18 — run `npm run validate` for the live count, it moves most
sessions). It began with Canadian and American federal statistics, Alberta's
provincial finances and three Alberta municipalities in full detail, and has
since grown galaxies: the European Union and its member states, candidates and
neighbours; New Zealand and the three jurisdictions of its Realm plus the
Pacific states that borrow its institutions; Australia; the United Kingdom and
the Netherlands; the international bodies — IMF, OECD, BIS-adjacent — whose
reports consume everyone else's numbers; and, the largest branch by file count,
all 54 African states, with city/commune-level financial detail for about half
of them.

The BRICS branch opened in August 2026 and is the current active front: Brazil,
Russia, China and India all have real chains now, and South Africa arrived
earlier with the African push. It is deliberately a half-finished round — Brazil
and China have had less attention than Russia and India — and the branch's own
hand-off chain in `BRICS/` is the place to pick it up.

---

## What it looks like

A cloud of coloured spheres in empty dark space, connected by fine lines. (There
used to be a lit floor, a platform and a bounding box; all three were deleted in
August 2026 for competing with the data.)

Colour tells you **which system publishes** — one hue family per country or
bloc, with the shade inside that family telling you the tier: national, state or
provincial, municipal, institutional. Reds are Canada, blues the United States,
greens the European Union, violets Africa and the international bodies, and so
on. Grey is a private company, drawn off the palette entirely because it doesn't
sit anywhere on that axis.

**This is mid-revamp.** The colour system, the node and edge sizing, and the
selection glow are all being reworked — see `notes/visual-revamp-2026-08-18/`
for the current design and the measurements behind it.

Size is the whole point. A big sphere is a report that lots of other reports are
built on. A small one is an endpoint — something calculated *from* other things
that nothing else uses. The biggest sphere in the graph is the European System
of Accounts 2010 — the EU regulation every member state's statistics must
follow — and it leads by a distance: the next two, the European Statistics Code
of Practice and the Consumer Price Index, score about a quarter of it.

Little teardrops travel along the lines, moving outward from each report to
everything downstream of it, at the rate that report actually gets published.
Daily exchange rates stream; an annual budget crawls.

Hovering over a sphere tells you what it is, who publishes it, how often, what
it's built from and what's built on it. Clicking one lights up its entire
chain — everything it ultimately rests on and everything that ultimately rests
on it — and dims everything else. There's a search box for finding a report by
name, and the camera flies you to it.

---

## Why it's interesting

Some things it can already show that are genuinely hard to see any other way:

**A line of credit traces back to a UN standard.** Your bank's prime rate
follows the Bank of Canada's policy rate, which is set with reference to the
Consumer Price Index, the Labour Force Survey and the national accounts — all of
which are built to the UN's *System of National Accounts 2008*. Four hops from a
personal loan to an international treaty document.

**Alberta's disability benefit is set by a tax formula.** AISH payments rest on
27 other reports. In 2024 the province replaced the direct inflation link with a
single "Alberta escalator" defined in the *Personal Income Tax Act* — the lesser
of 2% or Alberta inflation. So the number that adjusts income tax brackets now
also sets disability payments, and the 2% cap has bound in both years since.

**Alberta's largest revenue line is set by a commodity exchange in New York.**
The oil sands royalty regulation writes the formula out explicitly in terms of
the NYMEX West Texas Intermediate settlement price, converted at the Bank of
Canada's exchange rate — with a clause for what happens if the Bank ever stops
publishing it.

**The census matters more than anyone expects, and indirectly.** Federal health
and social transfers don't use census counts. They use Statistics Canada's
population *estimate* for July 1, which is the census adjusted for undercount
plus births, deaths and migration. That extra step is invisible in every
description of how the money moves — and it's why the census sits so far up the
most-depended-upon ranking despite not being named in any of the transfer
formulas.

**A statute anticipates a statistics revision.** The Canada Pension Plan Act
contains a clause requiring the Minister, on the advice of the Chief
Statistician, to splice an earnings series back onto its old basis if Statistics
Canada ever changes the definition by more than 1%. Legislation written in
expectation that a number upstream might move under it.

**One private company sets part of US inflation.** Every used-car price in the
American Consumer Price Index comes from J.D. Power, a subscription data
provider. That's stated plainly in the government's own methodology handbook, and
almost nowhere else.

**The famous inflation number is not the one the accounts run on.** Converting
Canadian GDP from dollars into real growth means dividing out price change, and
the index that does most of that work is the Industrial Product Price Index — a
factory-gate measure almost nobody outside the field has heard of. Statistics
Canada's own industry-by-industry source table names it in 64 rows against the
Consumer Price Index's 27. The two are siblings from the same division, and the
CPI is the one that gets reported.

---

## The one rule that makes it worth anything

**If no document says a dependency exists, it doesn't go in the graph.**

Every single line carries a link to a document — a statute, a regulation, a
methodology annex, a report naming its own sources — that explicitly states the
relationship. Not "these two are obviously related." Not "everyone knows the
budget uses that forecast." A document, saying so, in words.

This is expensive and it hurts. There's a real Alberta grant programme handing
out $60 million a year that gets thrown out of the graph on every build, because
no published document says what its inputs are. That's the rule working, not a
bug. A graph of plausible-looking guesses would be worse than no graph, because
it would look exactly the same.

The whole project is basically an argument that this constraint is worth the
cost.

---

## What it's for

The question it's built to answer is: **if this number changed, what else would
have to change?**

That's useful in a few different directions — understanding how public money
actually flows, spotting which single points of failure the whole system leans
on, seeing which chains are long and fragile, and noticing where a documented
public number quietly rests on something private or unpublished.

It's a personal project, built for curiosity rather than for anyone in
particular. There's no company behind it and nothing is being sold.

---

## Where it's up to

**Working:** the data model, the influence scoring, the 3D rendering, click-to-
trace, hover detail, search, and filters. Enough real data to show structure
rather than examples.

**Half-built:** the timing model. Reports were recently taught to distinguish
three different things that all sound like "how often does this update" — how
often it's published, how often the number actually moves, and how often anything
downstream actually reads it. Those are genuinely different. The prime rate is
published weekly but only changes a handful of times a year. Alberta's benefit
escalator reads twelve months of inflation data once, in September, even though
inflation publishes monthly. The data now records all three; the animation
doesn't use them yet.

**Not working well:** everything is drawn too small, and as of 2026-08-18 the
cause is measured rather than guessed. A handful of stray two-node components
scattered far from the main cloud are setting the bounding radius the camera
fits to, which pins the node-scaling function at its safety cap — so the largest
sphere renders at about 7 pixels instead of the 12 the design intends. Worse,
edge width and pulse size are in fixed world units and were never scaled
alongside the nodes, so while nodes grew six times over as the corpus went from
120 reports to 1,250, the edges grew not at all: an ordinary line is now about a
*tenth of a pixel* wide. Fixing the fit and tying edge and pulse size to the node
scale is the first job of the revamp. See `notes/visual-revamp-2026-08-18/`.

**The obvious next thing:** more data. Alberta alone has around 330
municipalities, 60 school authorities and 26 post-secondary institutions, and the
method for adding a municipality is now proven on two of them. It's a grind
rather than a puzzle.

---

## If you want to help

Useful without touching any code:

- **Find a document that names its sources.** Any statute, regulation, budget or
  methodology page that says "this figure is calculated from that one" is
  directly usable. Regulations are the best — they tend to quote their inputs by
  name.
- **Break a claim.** If a chain in the graph looks wrong, it might be. Every edge
  has its source attached specifically so it can be checked.
- **Say what's confusing.** It's a picture whose entire job is to be legible, and
  it has mostly been looked at by the person who built it.

Useful if you do write code: it's TypeScript, React and Three.js, no backend,
no database. `README.md` covers running it.

---

## Running it

You need [Node.js](https://nodejs.org) — take the "LTS" version and accept the
defaults.

Then, in this folder: double-click **`run.bat`** on Windows, or run `npm install`
followed by `npm run dev` in a terminal. It opens at http://localhost:5173.

Drag to orbit, scroll to zoom, hover for detail, click a sphere to trace its
chain, Escape to clear, `/` to search.

---

## The other files here

This is the plain-language one. The rest are working documents:

| File | What it is |
|---|---|
| `HANDOFF.md` | The working hand-off — what's being worked on right now and what's next. Superseded ones go to `Previous Handoffs/`. |
| `REPORTS.md` | The design rules and the reasoning behind them. The document that matters most. |
| `README.md` | How to run it and where the code lives. |
| `BRICS/` | The only live research branch, with its own independently-numbered `G.*.md` hand-off chain. The newest file is the branch's current state. |
| `notes/` | Working notes that aren't a research branch — including `visual-revamp-2026-08-18/`, the current design record for the rendering rework. |
| `archive/` | Everything closed out: the finished research branches (`AF/`, `EU/`, `NZ/`, `AU/`, `CA/`, each still carrying its full hand-off chain), the old `planning/` backlog, decided questions, and the project's original session-log system (retired 2026-08-13; see `REPORTS.md` for why). |

There's no single running log across the whole project any more — that was
tried early on (`sessions/V0.*.md`, now archived) and stopped scaling once the
work split into branches. If you're picking this up, `REPORTS.md` plus the
newest hand-off in whichever branch you're about to work on is the whole
briefing.
