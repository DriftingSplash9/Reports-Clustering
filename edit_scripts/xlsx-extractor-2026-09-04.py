#!/usr/bin/env python3
"""
Agent item 1 (HANDOFF 2026-09-04): teach `getDoc` to read OOXML spreadsheets.

Eight browser-pass edges carried `empty:no-extractor` against readable .xlsx
documents. The cause is not that the format was unsupported in principle — it
is that the DOCX branch's test (`/officedocument|docx/i`) matches an xlsx
content-type too (`...openxmlformats-officedocument.spreadsheetml.sheet`), so
every spreadsheet was handed to `unzip -p body word/document.xml`, which throws,
and the catch sets `extractor = 'none'`. This inserts a specific xlsx branch
BEFORE it and leaves the docx test untouched, so nothing that reads today
changes route.

Idempotent: refuses to run twice.
"""
import io, sys, os

PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'scripts', 'grade-evidence.ts')
PATH = os.path.normpath(PATH)
s = io.open(PATH, encoding='utf-8').read()
orig = s

if "extractXlsx" in s:
    print("already applied — nothing to do")
    sys.exit(0)

# ---- 1. widen the Fetched.extractor union -------------------------------
old = "  extractor: 'pdftotext' | 'html' | 'docx' | 'text' | 'none'"
new = "  extractor: 'pdftotext' | 'html' | 'docx' | 'xlsx' | 'text' | 'none'"
assert s.count(old) == 1, "extractor union anchor"
s = s.replace(old, new)

# ---- 2. factor the entity table out of stripHtml ------------------------
old = """function stripHtml(html: string): string {
  return html
    .replace(/<!--[\\s\\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg)\\b[\\s\\S]*?<\\/\\1>/gi, ' ')
    .replace(/<br\\s*\\/?>|<\\/(p|div|li|tr|h[1-6])>/gi, '\\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#(\\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/[ \\t\u00a0]+/g, ' ')
    .replace(/\\n{3,}/g, '\\n\\n')
    .trim()
}"""
new = """/**
 * The entity table, shared by `stripHtml` and the spreadsheet reader. The
 * ORDER is load-bearing and is the order `stripHtml` has always used: `&amp;`
 * before the numeric forms, so `&amp;lt;` decodes to the literal `&lt;` and
 * not to `<`.
 */
function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#(\\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
}

function stripHtml(html: string): string {
  return decodeEntities(
    html
      .replace(/<!--[\\s\\S]*?-->/g, ' ')
      .replace(/<(script|style|noscript|svg)\\b[\\s\\S]*?<\\/\\1>/gi, ' ')
      .replace(/<br\\s*\\/?>|<\\/(p|div|li|tr|h[1-6])>/gi, '\\n')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/[ \\t\u00a0]+/g, ' ')
    .replace(/\\n{3,}/g, '\\n\\n')
    .trim()
}

/**
 * Every `<t>` inside one `<si>` (shared string) or `<is>` (inline string),
 * concatenated with NOTHING between the runs — that is Excel's own rule, and
 * it is why this cannot go through `stripHtml`, which puts a space where each
 * tag was and would turn the rich-text cell `Incidencia de pobreza (FGT` + `0`
 * + `)` into `... (FGT 0 )`, breaking any quote lifted from the real sheet.
 */
function ooxmlRuns(fragment: string): string {
  return decodeEntities(
    (fragment.match(/<t[^>]*>[\\s\\S]*?<\\/t>/g) ?? [])
      .map((t) => t.replace(/^<t[^>]*>/, '').replace(/<\\/t>$/, ''))
      .join(''),
  )
}

/**
 * An OOXML spreadsheet as text: every non-empty row on its own line, cells
 * tab-separated, sheets in file order. Kept pure and separate from the unzip
 * so the selftest can exercise it on literal XML.
 *
 * Deliberately reads `<v>` and not the displayed value: `xl/styles.xml` is
 * where the number formats live (3.2 MB of it in the Bolivian anuario alone)
 * and applying them would mean reimplementing Excel's formatter. `<v>` is the
 * stored double, so a cell shown as `633,364.2` reads here as
 * `633364.19999999995` — which is exactly what a reader copying a figure out
 * of the sheet in a browser also gets, so quotes match. The cost is that date
 * cells read as serial numbers.
 */
function xlsxText(sharedStringsXml: string | null, sheetXmls: string[]): string {
  const shared = sharedStringsXml
    ? (sharedStringsXml.match(/<si>[\\s\\S]*?<\\/si>|<si\\s*\\/>/g) ?? []).map(ooxmlRuns)
    : []
  const lines: string[] = []
  for (const xml of sheetXmls) {
    for (const row of xml.match(/<row[^>]*>[\\s\\S]*?<\\/row>/g) ?? []) {
      const cells: string[] = []
      // The self-closing alternative MUST come first. `<c[^>]*>` happily
      // matches `<c r="B1" s="2"/>` as an opening tag, and the paired branch
      // would then run `[\\s\\S]*?` on to the NEXT `</c>` and swallow the
      // following cell whole.
      for (const c of row.match(/<c[^>]*\\/>|<c[^>]*>[\\s\\S]*?<\\/c>/g) ?? []) {
        const type = /\\st="([^"]+)"/.exec(c)?.[1]
        if (type === 'inlineStr') {
          const inline = ooxmlRuns(c)
          if (inline) cells.push(inline)
          continue
        }
        const v = /<v[^>]*>([\\s\\S]*?)<\\/v>/.exec(c)?.[1]
        if (v === undefined) continue
        cells.push(type === 's' ? (shared[Number(v)] ?? '') : decodeEntities(v))
      }
      const line = cells.join('\\t').trim()
      if (line) lines.push(line)
    }
  }
  return lines.join('\\n')
}

/** `xlsxText` over a real workbook on disk, via `unzip` like the docx branch. */
async function extractXlsx(bodyPath: string): Promise<string> {
  const listed = await execFileAsync('unzip', ['-Z1', bodyPath], { maxBuffer: 8 << 20 })
  const names = listed.stdout.split('\\n').map((n) => n.trim()).filter(Boolean)
  const read = async (name: string) =>
    (await execFileAsync('unzip', ['-p', bodyPath, name], { maxBuffer: 64 << 20 })).stdout
  const sharedXml = names.includes('xl/sharedStrings.xml') ? await read('xl/sharedStrings.xml') : null
  const sheetNames = names
    .filter((n) => /^xl\\/worksheets\\/sheet\\d+\\.xml$/.test(n))
    .sort((a, b) => Number(/\\d+/.exec(a)?.[0] ?? 0) - Number(/\\d+/.exec(b)?.[0] ?? 0))
  const sheets: string[] = []
  for (const n of sheetNames) sheets.push(await read(n))
  return xlsxText(sharedXml, sheets)
}"""
assert s.count(old) == 1, "stripHtml anchor"
s = s.replace(old, new)

# ---- 3. route spreadsheets before the docx branch ------------------------
old = """    } else if (isZip && /officedocument|docx/i.test(meta.ctype + url)) {"""
new = """    } else if (isZip && (/spreadsheetml/i.test(meta.ctype) || /\\.xls[xm](\\?|#|$)/i.test(url))) {
      // Ahead of the docx branch on purpose. An xlsx content-type is
      // `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,
      // which contains `officedocument`, so the broader test below used to
      // claim every spreadsheet, fail on `word/document.xml`, and record
      // `empty:no-extractor` — the eight browser-pass edges this branch is for.
      text = await extractXlsx(bodyPath)
      extractor = 'xlsx'
    } else if (isZip && /officedocument|docx/i.test(meta.ctype + url)) {"""
assert s.count(old) == 1, "docx branch anchor"
s = s.replace(old, new)

# ---- 4. selftest coverage ------------------------------------------------
old = """  t('does not treat apostrophes as quotes',"""
new = """  t('xlsx resolves a shared-string cell and keeps a numeric cell verbatim',
    xlsxText(
      '<sst><si><t>Poblacion total</t></si></sst>',
      ['<row><c r="A1" t="s"><v>0</v></c><c r="B1"><v>633364.19999999995</v></c></row>'],
    ) === 'Poblacion total\\t633364.19999999995')
  t('xlsx joins rich-text runs with nothing between them',
    xlsxText(
      '<sst><si><r><t>Incidencia de pobreza (FGT</t></r><r><t>0</t></r><r><t>)</t></r></si></sst>',
      ['<row><c r="A1" t="s"><v>0</v></c></row>'],
    ) === 'Incidencia de pobreza (FGT0)')
  t('xlsx drops empty rows and does not let a self-closing cell swallow the next one',
    xlsxText(
      '<sst><si><t>kept</t></si></sst>',
      ['<row><c r="A1" s="2"/><c r="B1" s="2"/></row><row><c r="A2" s="2"/><c r="B2" t="s"><v>0</v></c></row>'],
    ) === 'kept')
  t('xlsx reads an inline string and concatenates sheets in order',
    xlsxText(null, [
      '<row><c r="A1" t="inlineStr"><is><t>one</t></is></c></row>',
      '<row><c r="A1" t="inlineStr"><is><t>two</t></is></c></row>',
    ]) === 'one\\ntwo')
  t('does not treat apostrophes as quotes',"""
assert s.count(old) == 1, "selftest anchor"
s = s.replace(old, new)

assert s != orig
io.open(PATH, 'w', encoding='utf-8', newline='').write(s)
print("patched", PATH)
