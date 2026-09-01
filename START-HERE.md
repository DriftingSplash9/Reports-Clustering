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

Its current size lives in `HANDOFF.md`, not `README.md` or here — the corpus
grows most sessions, and a count pinned in more than one file is never in
sync and never needs to be. Run `npm run validate` for the live number. It
began with Canadian and American federal statistics, Alberta's
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
follow — and it leads by a distance: the UN's System of National Accounts 2008
sits second at a little over half of it, and nothing else reaches a third. (The
exact figures move as the corpus does; `npm run validate` prints the live
ranking, and this sentence is kept vague on purpose so it can stay true.)

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

**Not working well:** two things, both measured rather than guessed, by an
independent audit on 2026-08-30.

First, the rule above slipped during the bulk import rounds of August 2026. The
branches researched by hand — Canada, the US, the EU, Africa — hold up: every
sampled quote that could be checked was found in the document it cites, and
none was refuted. But roughly one edge in five
from the August imports cited either a publisher's homepage or nothing at all,
and *stated* the relationship instead of quoting a document that does. Nothing
in the software was checking for that. It is now, and on 31 August those edges
were moved out of the graph into the "looked for, not found" notes until
someone finds the document; a second audit the same evening caught two more
shapes of the same problem — a publications index cited as if it were a source,
and "these two series are consistent" offered as if it were a dependency — and
another seventy-odd edges went the same way. The count of unlinked reports rose
accordingly. That is the rule working, same as the Alberta grant programme.

Second, the "cluster repulsion" control barely changes what you see. The force
really does push country clusters apart, but the camera then refits to the
larger cloud and cancels most of it on screen — the whole slider range moves the
picture by around 15%, and by almost nothing at high spread settings. What that
control should be *for* is an open design question.

The drawing-size problems that used to sit in this paragraph (nodes at 7 pixels,
edges a tenth of a pixel wide) were fixed on 2026-08-19.

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

## The other files here

This is the plain-language one — for how it's actually built and where
things live, `README.md` has the file map, and `HANDOFF.md` is current
state. Not repeated here, since a second copy is how these two drift apart.
