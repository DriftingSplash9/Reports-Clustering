// Extract PDF text in pdf.js reading order — the same extraction Chrome does
// in-page, run locally so no capture has to cross the bridge.
const fs = require('fs');
const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');
(async () => {
  const data = new Uint8Array(fs.readFileSync(process.argv[2]));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true, verbosity: 0 }).promise;
  const out = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const pg = await doc.getPage(p);
    const tc = await pg.getTextContent();
    out.push(tc.items.map((it) => it.str).join(''));
  }
  fs.writeFileSync(process.argv[3], out.join('\n'), 'utf8');
  process.stderr.write(`pages=${doc.numPages} chars=${out.join('\n').length}\n`);
})();
