# Corpus — when a fetch fails, and other claims about your tools

**Split out of `PLAYBOOK-CORPUS.md` on 2026-09-09** (Thomas: *"reassess all the required
readings and split them down"*). **Nothing here was reworded, cut or renumbered** — the text is
byte-for-byte what it was inside that file, and its section headings are unchanged so every
existing cross-reference still resolves.

**Read this when:** a fetch failed, a host looks blocked, a URL looks dead, or you are about to record any of
those as a fact about the world. **This file owns what a failure does and does not PROVE**; what a successful
but unusual route does to the grade is `corpus-route.md`.

**THE BOUNDARY, so nothing lands in the wrong file again** (stated 2026-09-11, after three entries had):
**`corpus-naming.md` is POLICY — what counts as a citation at all, and it would be true if the grader did not
exist.** **`corpus-evidence.md` is MECHANICS — how the grader and the matchers actually behave.**
**`corpus-route.md` is what the ROUTE the bytes came by does to the grade.** **`corpus-hosts.md` is what a
failed fetch does and does not prove.** **`corpus-nodes.md` is what is and is not a node.** If an entry would
still be true with no tooling at all, it is policy; if it explains why a tool did something, it is mechanics.

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

---

## Moved here 2026-09-11 from `PLAYBOOK-CORPUS.md`'s index

**Rounds 38-45 wrote full reasoning straight into the §6/§7 index lines**, which the 2026-09-09 split had
just emptied — seventeen entries across the two sections had grown back into essays and carried 37% of that
file. They are below, **byte-for-byte as they stood**, and the index now carries one line each pointing here.
*(Thomas, 2026-09-11, on being shown the measurement: "do it". Full account: `notes/doc-audit-2026-09-11.md`.)*

### An instrument's PUBLISHER decides which site to search

- **An instrument's PUBLISHER decides which site to search, and getting it wrong hides the page for rounds.**
  Round 38 filed 《关于工资总额组成的规定》 among instruments needing "a NON-NBS publisher's own page found"; it is
  国家统计局令第1号 of 1990 and NBS publishes its full text. Two rounds passed with nobody searching stats.gov.cn.
  Check the issuing form — a 令, a 规定, a 通知, and who signed it — before concluding whose site to look on.

### A national instrument may be published on a provincial site

- **A first-party page for a NATIONAL instrument may live on a PROVINCIAL bureau's site**, and rule 19's
  authorship-not-host principle covers it: read the cover, not the domain. Two hubs named by four yearbooks across
  eleven rounds were minted 2026-09-09 (Thomas ruled) off Shanghai's printing of them, whose covers name NBS as the
  formulating body. Record the caveat on the node when the issuer's own page has never been found.

### A small body is a redirect

- **A SMALL BODY IS A REDIRECT — read it, never record the byte count as a verdict.** A 71-byte,
  625-byte or 954-byte 200 is a `window.location`, a `<p id="url">` in a hidden div, or a meta
  refresh, and the thing you were looking for is one `cat` away. Cost so far: one province recorded
  as an empty shell for a round, and NBS's whole 国家统计标准 listing missing from a tracker.
  *(Restated here 2026-09-09 when `notes/china-progress.md` was split — it binds every fetch, not
  just a Chinese one. Full account: `notes/china-method-2026-09-09.md`.)*

### An archive that extracts to nothing

- **An archive that extracts to nothing is not an empty archive.** `unzip` exits non-zero on a mere
  warning and that used to abort the grader's whole zip branch; a zip of `.docx` was invisible to it
  besides. Both fixed 2026-09-09 — recipe and diagnostics in `notes/techniques-cn-yearbooks-2026-09-08.md`.

### A partial body is resumed, whatever the extension

- **A TRANSFER THAT STOPPED WITH BYTES ON DISK IS RESUMED, whatever its extension** (2026-09-10). Round 42 gave
  archives a 600 s ceiling and three `curl -C -` retries; round 45 found the same failure on a 34.7 MB PDF that
  `TIMEOUT_S` cut at 30.2 MB every time. The condition that is actually true is neither "archive" nor "PDF": **a
  partial body means progress, and a dead host leaves none.** Consequence for a researcher: `network:curl-28` on a
  big first-party document is now worth one re-run before you believe it.

### Legacy binary `.doc`, and `.docx` under a `.doc` name

- **A LEGACY BINARY `.doc` IS READ SINCE 2026-09-10, and a `.docx` under a `.doc` NAME with it.** The
  fetcher converts a Compound-File body with `soffice --convert-to docx`, and asks an archive whether it
  holds `word/document.xml` rather than trusting the content-type. Each conversion gets its own
  `-env:UserInstallation` profile — without it concurrent edges lose the LibreOffice lock and record
  `empty:no-extractor` against a document that reads perfectly. Why it matters beyond China: an agency that
  attaches its instrument to an otherwise empty landing page is a shape, not an accident, and every such
  page graded `empty` before this.

---

