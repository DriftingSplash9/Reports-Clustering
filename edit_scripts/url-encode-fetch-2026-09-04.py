#!/usr/bin/env python3
"""
Grader fix (2026-09-04): percent-encode the request URL before handing it to
curl, and add a selftest for it.

`sd-cbos-statistical-review-q4-2024 -> sd-cbs-cpi` sat in the browser-pass debt
list as `network:curl-3 URL using bad/illegal format or missing URL`, which
reads like a dead or malformed citation. It is neither. The `evidence_url` is
the human-readable Arabic filename Sudan's central bank actually serves:

  https://cbos.gov.sd/sites/default/files/العرض الاقتصادي والمالي الربع الرابع 2024 .pdf

curl refuses a URL containing raw spaces and non-ASCII bytes. Percent-encoded,
the same URL returns 200 and 1,972,408 bytes of PDF. So the failure was in the
REQUEST, not the host — the class `network:curl-3` is a false negative.

Neither `encodeURI` nor `encodeURIComponent` is safe here. **`encodeURI`
escapes `%` itself**, so an already-encoded URL comes back double-encoded
(`a%20b` -> `a%2520b`) and every fetch of it 404s — caught by the selftest this
script adds, which is why that test exists. The encoder written here escapes
only what curl actually refuses: the space character and any byte outside
printable ASCII. Everything else, `%` included, passes through untouched, so an
already-encoded URL is a no-op. Two corpus URLs are affected today (the Sudanese one above and
`br-resolucao-cmn-5141 -> br-ibge-ipca`, already A via another route), but the
fix belongs in the fetcher rather than in the corpus: the readable form is what
a human checking the citation wants to see.

Note the cache key is unaffected — `urlKey` still hashes the corpus URL, so no
existing `.evidence-fulltext/` or `evidence-cache/` record is orphaned.

Idempotent: refuses to run twice.
"""
import io, os, sys

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
PATH = os.path.join(ROOT, 'scripts', 'grade-evidence.ts')

s = io.open(PATH, encoding='utf-8').read()

if 'encodeForCurl' in s:
    print('already applied — nothing to do')
    sys.exit(0)

# ---- 1. the helper, exported so --selftest can assert on it -------------
anchor = """/**
 * Raw fetch with curl. Deliberately curl and not `fetch()`: this needs a"""
helper = """/**
 * Percent-encode a URL for curl.
 *
 * curl rejects a URL carrying raw spaces or non-ASCII bytes with exit code 3
 * ("URL using bad/illegal format"), which the fetcher then records as
 * `network:curl-3` — indistinguishable in a debt list from a host that is
 * genuinely gone. Sudan's central bank serves its quarterly review under an
 * Arabic filename with spaces in it; encoded, the same URL is a 200.
 *
 * Escapes ONLY what curl refuses — the space and anything outside printable
 * ASCII — and passes `%` through untouched, so an already-encoded URL is a
 * no-op. `encodeURI` cannot be used for this: it escapes `%` too, turning
 * `a%20b` into `a%2520b`. The cache key is still computed from the CORPUS url,
 * so nothing already stored is orphaned by this.
 */
export function encodeForCurl(url: string): string {
  let out = ''
  for (const ch of url) {
    const code = ch.codePointAt(0) ?? 0
    if (code > 0x20 && code < 0x7f) {
      out += ch
      continue
    }
    for (const byte of new TextEncoder().encode(ch)) {
      out += `%${byte.toString(16).toUpperCase().padStart(2, '0')}`
    }
  }
  return out
}

/**
 * Raw fetch with curl. Deliberately curl and not `fetch()`: this needs a"""
assert s.count(anchor) == 1, 'fetchRaw doc-comment anchor'
s = s.replace(anchor, helper)

# ---- 2. use it at the call site ----------------------------------------
old = "await execFileAsync('curl', [...base, ...extra, url], { maxBuffer: 8 << 20 })"
new = "await execFileAsync('curl', [...base, ...extra, encodeForCurl(url)], { maxBuffer: 8 << 20 })"
assert s.count(old) == 1, 'curl call-site anchor'
s = s.replace(old, new)

# ---- 3. selftest --------------------------------------------------------
old_t = """  t('curl -w status is split off the body, not left in it',"""
new_t = """  t('a url with spaces and non-ascii is percent-encoded for curl',
    encodeForCurl('https://cbos.gov.sd/files/\\u0627\\u0644\\u0639\\u0631\\u0636 2024 .pdf') ===
      'https://cbos.gov.sd/files/%D8%A7%D9%84%D8%B9%D8%B1%D8%B6%202024%20.pdf')
  t('an already-encoded url is not double-encoded, and delimiters survive',
    encodeForCurl('https://x.test/a%20b.pdf?q=1&r=2#f') === 'https://x.test/a%20b.pdf?q=1&r=2#f')
  t('curl -w status is split off the body, not left in it',"""
assert s.count(old_t) == 1, 'selftest anchor'
s = s.replace(old_t, new_t)

io.open(PATH, 'w', encoding='utf-8', newline='\n').write(s)
print('applied: encodeForCurl + call site + 2 selftests')
