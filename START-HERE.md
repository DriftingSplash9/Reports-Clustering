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

Right now it holds **124 reports and 205 dependencies**, all real, all sourced,
covering Canadian and American federal statistics, Alberta's provincial finances,
two Alberta municipalities in full detail, and a first foothold in Ontario.

---

## What it looks like

A dark room with a lit floor, and a cloud of coloured spheres floating above it
connected by fine lines. Colour tells you who publishes: blue for federal, green
for provincial, orange for municipal, pink for international bodies, purple for
institutions, grey for private companies.

Size is the whole point. A big sphere is a report that lots of other reports are
built on. A small one is an endpoint — something calculated *from* other things
that nothing else uses. The biggest sphere in the graph is the Census of
Population.

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
description of how the money moves — and it's why the census comes out as the
single most depended-upon document in the graph.

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

**Not working well:** it looks wrong when you first open it. The camera frames
the room rather than the graph, so everything starts small and far away; and
zoomed in far enough to read, the middle is a solid ball you can't see into. Both
are known and neither is hard, they just haven't been done.

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
| `REPORTS.md` | The design rules and the reasoning behind them. The document that matters most. |
| `planning/BACKLOG.md` | What to add next and why, in priority order. |
| `README.md` | How to run it and where the code lives. |
| `sessions/` | The running log — one `V0.*.md` per working session, newest is the current state and to-do list, plus the `V1.5`/`V2.10` rollups. |
| `EU/`, `NZ/`, `AU/` | The research branches — each with its own `G.*.md` session logs; the EU's source PDFs now live in `EU/sources/`. |

The `V0.*` files are a running log, one per working session; the `V1.5`/`V2.10`
files consolidate every five of them so the reading never gets longer. If you're
picking this up, `REPORTS.md` plus the newest of each is the whole briefing.
