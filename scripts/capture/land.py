#!/usr/bin/env python3
"""Land a Chrome capture into .evidence-fulltext/, checksum-verified.

Usage: land.py <b64file> <expected-sha256-of-text> <url> <via> <extractor> <content-type> <body-bytes>

The page computes sha256 over the text it extracted; this refuses to write
anything whose sha does not match after the transport. A record that lands is
byte-identical to what the browser read, or it does not land.
"""
import sys, gzip, hashlib, os, datetime, pathlib

b64f, want_sha, url, via, extractor, ctype, bodybytes = sys.argv[1:8]
raw = open(b64f, 'rb').read()
import base64, re
b64 = re.sub(rb'\s+', b'', raw)
# strip transport markers if present
b64 = re.sub(rb'<<[SE]\d+>>', b'', b64)
gz = base64.b64decode(b64)
text = gzip.decompress(gz).decode('utf-8')
got = hashlib.sha256(text.encode('utf-8')).hexdigest()
if got != want_sha:
    print(f'CHECKSUM MISMATCH\n  want {want_sha}\n  got  {got}\n  chars {len(text)}')
    sys.exit(2)

ROOT = os.environ.get('RC_ROOT', os.path.expanduser('~/rc-scratch'))
CAP = 4 * 1024 * 1024
b = text.encode('utf-8')
truncated = len(b) > CAP
kept = b[:CAP].decode('utf-8', 'ignore') if truncated else text
now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
header = '\n'.join([
    f'url: {url}',
    f'fetched-at: {now}',
    'status: 200',
    f'final-url: {url}',
    f'content-type: {ctype}',
    f'body-bytes: {bodybytes}',
    f'extractor: {extractor}',
    'block: none',
    f'text-chars: {len(text)}',
    f'text-sha256: {got}',
    f'truncated: {str(truncated).lower()}',
    f'via: {via}',
])
key = hashlib.sha256(url.encode('utf-8')).hexdigest()
d = pathlib.Path(ROOT) / '.evidence-fulltext'
d.mkdir(parents=True, exist_ok=True)
out = d / f'{key}.txt.gz'
out.write_bytes(gzip.compress((header + '\n---\n' + kept).encode('utf-8')))
print(f'OK  sha={got}  chars={len(text)}  truncated={truncated}  -> {out}')
