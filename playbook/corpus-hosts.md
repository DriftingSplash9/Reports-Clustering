# Corpus — when a fetch fails, and other claims about your tools

**Split out of `PLAYBOOK-CORPUS.md` on 2026-09-09** (Thomas: *"reassess all the required
readings and split them down"*). **Nothing here was reworded, cut or renumbered** — the text is
byte-for-byte what it was inside that file, and its section headings are unchanged so every
existing cross-reference still resolves.

**Read this when:** a fetch failed, a host looks blocked, a URL looks dead, or you are about to record any of those as a fact about the world.

**You do not read this by default.** `PLAYBOOK-CORPUS.md` carries a one-line index of everything
below; it tells you a ruling exists and what it decides, and you come here for the reasoning only
when it binds the question in front of you. Every bullet here is a case where the repo recorded a broken reader as bad evidence.

---

### Claims about the world that are really claims about your tools

- **"The sandbox can't read it" and "the site is walled" are different claims,
  and this repo has been conflating them for months.** There are three networks
  and none is a superset of the others (see the routing snapshot). Before
  recording a host as walled, **say which machine you were on** — and re-test
  from the other one, which is a 20-second check.
- **A 404 from a single-page-app route is not link rot.** 58 EDP-inventory edges
  were dropped as DEAD-URL because CIRCABC's `/ui/.../details` pages 404 to curl —
  while Eurostat's own listing still linked every one of them and
  `https://s-circabc.europa.eu/rest/download/<id>` served each PDF (Round C,
  2026-09-05). Before recording a 404 as rot, check whether the host is an SPA
  (an Angular/React shell with the same byte count for every path) and whether a
  first-party page still links the URL; a REST/download endpoint usually exists.
  The Commission documents-register (`api/files/<ref>_0/<id>`) and DCC Tanzania
  (`/api/pages/slug/<slug>`) are the same shape.
- **A "ROBOTS_DISALLOWED" verdict is a statement about the FETCH TOOL, not the
  site.** WebFetch obeys robots.txt; curl with a browser UA does not, and
  neither does a browser. An entire Taiwanese cluster was written off this way
  while being wide open to curl the whole time. Treat every historical "robots"
  note in the corpus as untested.
- **A blocked verdict decays — re-probe before believing your own notes.**
  Routing changed three separate times inside 24 hours during the 2026-09-04
  rounds, in both directions. This is why host readings are in a dated file
  rather than here.
- **WebFetch cannot produce evidence-grade verbatim** — it caps quotes at ~125
  characters and refuses full reproduction. It can establish a negative or
  locate text; a mintable quote needs a real browser or another host carrying
  the same document.
- **A page's DECLARED CHARSET is now honoured, and before 2026-09-08 it was not** —
  the fetcher decoded every HTML body as UTF-8 whatever the document said. This did not
  corrupt a legacy-encoded page, it destroyed it: 537 of `sm14.htm`'s characters became
  U+FFFD, and the edge graded `quote-not-in-document`, **which looks exactly like a bad
  quote and is not one**. Guard is `decodeDeclared()` in `grade-evidence.ts`. The trap that
  survives the fix is the reading habit: **a `quote-not-in-document` on a non-English host
  is a claim about the reader until you have checked the decode**. NBS, DGBAS, e-Stat and
  KOSTAT all still serve gb2312/Big5/Shift_JIS/EUC-KR.

- **`namesTarget` strips ASCII parentheses BEFORE matching, so a non-Latin name that lives
  only inside them is invisible to EVERY door, including the CJK one** (found 2026-09-08).
  A node titled `Balance of Payments (国际收支平衡表)` has no reachable Chinese token at all —
  the CJK single-token path iterates the same parens-stripped string the run rule does. The
  corpus is full of nodes titled this way (`cn-statistical-yearbook`, `cn-labour-force-survey`,
  most of the CN/JP/KR import). The fix per node is a `title_aliases` entry carrying the
  native-language name; `cn-population-census` has carried one since long before anyone named
  the class. **So when a document plainly names a target in its own language and the edge
  still grades `agency-not-artefact`, check the target's title for parentheses before
  concluding anything about the document.** The class has NOT been swept.

- **A `HOST_INDEX_PREFIXES` entry is a PREFIX unless it says `exact: true`, and it will
  swallow real documents living beneath it** (found 2026-09-08). `stats.gov.cn` `/sj/ndsj/`
  was written for the yearbook's year-list page and also claimed every chapter page inside
  the yearbook, so ten edges citing a chapter's own 简要说明 failed validation as
  "index/listing page" the first time any round cited one. Narrowed to `exact: true` — the
  same fix `/english/pressrelease/` already carried, with the same reasoning in its comment.
  **Most of the other entries in that list are still prefixes**; if validate calls a URL an
  index page and the URL is plainly a document, look there before rewriting the edge.

- **The bulk-imported slices of August 2026 carry import habits worth knowing**:
  ids and enum values that were invented rather than read, one jurisdiction's exact
  quote and URL reused as evidence for another — the tell is a quote naming a
  specific *other* place — and the same region minted under different batch names.
  Grep against the FULL corpus (research files AND seed files) before trusting any of
  it. They are data like any other and are verified and graded on the same rules as
  everything else.


---

