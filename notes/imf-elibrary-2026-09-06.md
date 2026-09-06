# IMF documents — how to reach them, and the URLs

Written 2026-09-06 for Thomas, who found the way in. **He does not need to download
these by hand** — every URL below serves to a plain curl from the cloud sandbox. The
list is here because the corpus carries nine IMF nodes and none of them had a readable
primary source before today.

## The finding

`www.imf.org` returns **HTTP 403** (Akamai) to a browser-UA curl on every PDF path
tried, from both of this session's networks. Chrome navigates to the same PDF fine but
lands it in Chrome's PDF viewer, where `get_page_text` cannot reach it.

**`elibrary.imf.org` is a different host and is wide open.** Two things make it work:

- append **`?bot=bot`** to a browse, search or landing-page URL and it returns full
  server-rendered HTML instead of a JavaScript shell;
- **`https://www.elibrary.imf.org/downloadpdf/display/book/<isbn>/<isbn>.pdf`** serves
  the complete manual as a PDF to a plain curl — no token, no session, no referer.
  GFSM 2014 English is 5.4 MB and came down in one call.

Search: `https://www.elibrary.imf.org/search?q=<url-encoded+title>&bot=bot&pageSize=30`.
Landing page: `https://www.elibrary.imf.org/display/book/<isbn>/<isbn>.xml?bot=bot` —
its `Language:` and `Publication Date:` fields are how you tell the editions apart.

## Two traps

1. **Each manual has one ISBN per language and the search results do not say which is
   which.** For GFSM 2014 the five hits are English 9781498343763, Chinese
   9781484383391, French 9781484383483, Arabic 9781484383551, Russian 9781484383612 —
   in that order in the result list, with English *fifth*. Always check the landing
   page's `Language:` field before quoting.
2. **These manuals are two-column, so `pdftotext -layout` interleaves them** and no
   whitespace-insensitive matcher can reach a span that has the opposite column's words
   inside it. Plain `pdftotext` (reading order) is what produces quotable text — the
   same finding as `notes/techniques-2026-09-04.md` section 3 for bilingual PDFs, hitting
   for a different reason. The evidence verifier now extracts both ways and searches the
   concatenation.

## English editions, verified 2026-09-06

| corpus node | document | ISBN | PDF |
|---|---|---|---|
| `imf-gfsm` | Government Finance Statistics Manual 2014 (10 Mar 2015) | 9781498343763 | https://www.elibrary.imf.org/downloadpdf/display/book/9781498343763/9781498343763.pdf |
| `imf-bpm6` | Balance of Payments and International Investment Position Manual, Sixth Edition | 9781589068124 | https://www.elibrary.imf.org/downloadpdf/display/book/9781589068124/9781589068124.pdf |
| — | BPM6 Compilation Guide (08 Dec 2014) | 9781484312759 | https://www.elibrary.imf.org/downloadpdf/display/book/9781484312759/9781484312759.pdf |
| `imf-mfsmcg-2016` | Monetary and Financial Statistics Manual and Compilation Guide (09 Nov 2017) | 9781513579191 | https://www.elibrary.imf.org/downloadpdf/display/book/9781513579191/9781513579191.pdf |
| `imf-psds-guide` | Public Sector Debt Statistics: Guide for Compilers and Users (08 Dec 2011) | 9781616351564 | https://www.elibrary.imf.org/downloadpdf/display/book/9781616351564/9781616351564.pdf |
| — | External Debt Statistics: Guide for Compilers and Users (18 Jun 2014) | 9781484366622 | https://www.elibrary.imf.org/downloadpdf/display/book/9781484366622/9781484366622.pdf |
| — | External Debt Statistics: Guide for Compilers and Users (25 Jun 2003) | 9781589060609 | https://www.elibrary.imf.org/downloadpdf/display/book/9781589060609/9781589060609.pdf |
| — | Quarterly National Accounts Manual, 2017 edition (06 Nov 2018) | 9781475589870 | https://www.elibrary.imf.org/downloadpdf/display/book/9781475589870/9781475589870.pdf |
| — | Government Finance Statistics Manual 2001 (19 Dec 2001) | 9781589060616 | https://www.elibrary.imf.org/downloadpdf/display/book/9781589060616/9781589060616.pdf |

Each landing page is the same ISBN with `/display/book/<isbn>/<isbn>.xml`. **Cite the
PDF URL, not the landing page** — the PDF path is stable and unsigned, so it is the
cited URL the quote actually came from and grades normally (this is not the token-PDF
shape that caps at B).

## Not found on elibrary

`imf-dqaf` (Data Quality Assessment Framework), `imf-sdds`, `imf-sdds-plus` and
`imf-e-gdds` are dissemination-standard web resources rather than books, and live on
`dsbb.imf.org`, which this round did not probe. `imf-weo`, `imf-fiscal-monitor` and
`imf-gfsr` are periodicals with their own elibrary paths (`journalissue` type in the
browse facets) — a different URL shape from the book downloads above, not worked out here.

## What it bought immediately

Two A-grade edges minted the same day from GFSM 2014 chapter 6 and its introduction:
`imf-gfsm -> un-cofog-1999` ("COFOG is integral to the GFS presentation") and
`imf-gfsm -> sna-2008` ("the concepts and principles set out in the Manual are
harmonized with those of the System of National Accounts 2008"). The first is the
standard-to-standard tie that explains why COFOG appears in every government-finance
release in the corpus, and it had been parked as unreadable four hours earlier.
