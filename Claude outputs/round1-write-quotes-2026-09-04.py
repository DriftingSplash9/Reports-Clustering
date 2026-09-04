#!/usr/bin/env python3
"""Write evidence_quote for the 17 BPS edges — machine-checked before written.

Every quote is checked against the landed .evidence-fulltext extraction under
the grader's own normalisation (NFKD, drop combining marks, fold quote forms,
lower) plus locateQuote's whitespace-insensitive second pass. A quote that does
not appear is NOT written; it is reported and left alone.
"""
import json, re, sys, gzip, hashlib, os, unicodedata, glob

ROOT = os.path.expanduser('~/rc-scratch')
REPO = os.path.expanduser('~/mnt/Reports Clustering')

def norm(s):
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = unicodedata.normalize('NFKC', s)
    for a in '’‘‚‛′': s = s.replace(a, "'")
    for a in '“”„': s = s.replace(a, '"')
    return s.lower()

def ws(s): return re.sub(r'\s+', '', norm(s))

def fulltext(url):
    key = hashlib.sha256(url.encode()).hexdigest()
    raw = gzip.decompress(open(f'{ROOT}/.evidence-fulltext/{key}.txt.gz','rb').read()).decode('utf-8')
    return raw.split('\n---\n', 1)[1]

U = {
 'cpi':     "https://www.bps.go.id/id/publication/2026/04/09/2e884b5204a3dbf5ddfca921/indeks-harga-konsumen-38-provinsi-di-indonesia-2025-2022-100-.html",
 'energy':  "https://www.bps.go.id/en/publication/2023/12/21/a4822df8ddc9b338be718e58/neraca-energi-indonesia-2018-2022-.html",
 'migas':   "https://www.bps.go.id/en/publication/2025/01/31/455db7c47d02471e6c05fa5f/statistik-pertambangan-minyak-dan-gas-bumi-2019-2023.html",
 'listrik': "https://www.bps.go.id/id/publication/2025/12/31/c4f7aade5d4801236ec79b81/statistik-listrik-2020-2024.html",
 'ghg':     "https://www.bps.go.id/en/publication/2024/06/21/87d30b44adc5c5eed7581f4b/neraca-arus-energi-dan-neraca-emisi-gas-rumah-kaca-indonesia-2018-2022.html",
}

ENERGY = ("Sumber data yang digunakan untuk penyusunan neraca energi ini berasal dari berbagai "
          "publikasi yang diterbitkan oleh Badan Pusat Statistik, Kementerian Energi dan Sumber "
          "Daya Mineral, PT PLN (Persero), PT PGN (Persero), BPH Migas, PT KAI (Persero).")
GHG14  = ("Sumber data utama adalah Neraca Energi yang dipublikasikan oleh BPS RI serta Inventori "
          "GRK dari Kementerian Lingkungan Hidup dan Kehutanan (KLHK).")
GHGSUP = ("Selain itu, juga terdapat data-data pendukung lainnya seperti TPP dari BPS, Neraca "
          "Pembayaran dari Bank Indonesia, Statistik Energi dari Kementerian Energi dan Sumber "
          "Daya Mineral (ESDM), faktor emisi dari Kementerian ESDM dan Panduan Panel "
          "Antarpemerintah tentang Perubahan Iklim 2006")

QUOTES = [
 ('cpi','id-cpi-provincial','un-coicop-2018',
  "Barang/jasa tersebut dikelompokkan dalam 11 kelompok pengeluaran dan 43 subkelompok pengeluaran "
  "berdasarkan adaptasi dari Classification of Individual Consumption According to Puspose (COICOP) 2018."),
 ('cpi','id-cpi-provincial','id-sbh-2022',
  "Jumlah barang/jasa pada paket komoditas dan bobotnya di setiap provinsi/kabupaten/kota bervariasi "
  "menyesuaikan hasil Survei Biaya Hidup 2022 (SBH 2022) di wilayah masing-masing."),
 ('energy','id-energy-balances','id-esdm', ENERGY),
 ('energy','id-energy-balances','id-pln-statistics', ENERGY),
 ('energy','id-energy-balances','id-pgn', ENERGY),
 ('energy','id-energy-balances','id-bph-migas', ENERGY),
 ('energy','id-energy-balances','id-kai', ENERGY),
 ('migas','id-oil-production','id-ditjen-migas', "Sumber/Source: Dirjen Migas ESDM 2023"),
 ('migas','id-gas-production','id-ditjen-migas', "Sumber/Source: Dirjen Migas ESDM 2023"),
 ('listrik','id-electricity-mix','id-pln-statistics', "PT PLN (Persero). 2025. Statistics PLN 2024."),
 ('listrik','id-geothermal','id-pln-statistics', "PT PLN (Persero). 2025. Statistics PLN 2024."),
 ('ghg','id-ghg-inventory','id-energy-balances', GHG14),
 ('ghg','id-ghg-inventory','id-klhk-ghg-inventory',
  "Kementerian Lingkungan Hidup dan Kehutanan. 2024. Laporan Inventarisasi Gas Rumah Kaca (GRK) dan "
  "Monitoring, Pelaporan, Verifikasi (MPV) 2023."),
 ('ghg','id-ghg-inventory','id-bop', GHGSUP),
 ('ghg','id-ghg-inventory','id-national-accounts', GHGSUP),
 ('ghg','id-ghg-inventory','id-esdm', GHGSUP),
 ('ghg','id-ghg-inventory','ipcc-ghg-guidelines',
  "IPCC. 2006. 2006 IPCC Guidelines for National Greenhouse Gas Inventories."),
]

texts = {k: fulltext(u) for k, u in U.items()}
checked, refused = [], []
for k, s, t, q in QUOTES:
    body = texts[k]
    exact = norm(q) in norm(body)
    wsok  = ws(q) in ws(body)
    (checked if wsok else refused).append((k, s, t, q, 'exact' if exact else 'whitespace-insensitive'))
print(f'checked OK: {len(checked)}   refused: {len(refused)}')
for r in refused: print('  REFUSED', r[1], '->', r[2], '|', r[3][:70])
if refused: sys.exit(1)

want = {(s, t): q for _, s, t, q, _ in checked}
written = 0
for f in glob.glob(f'{REPO}/src/data/research/*.json'):
    d = json.load(open(f, encoding='utf-8'))
    dirty = False
    for dep in (d.get('dependencies') or []):
        key = (dep.get('source_report_id'), dep.get('target_report_id'))
        if key in want and 'bps.go.id' in (dep.get('evidence_url') or ''):
            if dep.get('evidence_quote') != want[key]:
                dep['evidence_quote'] = want[key]; dirty = True; written += 1
    if dirty:
        json.dump(d, open(f, 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
        open(f, 'a', encoding='utf-8').write('\n')
        print('  wrote', os.path.basename(f))
print(f'evidence_quote written on {written} edges')
for k, s, t, q, how in checked: print(f'  {how:24} {s} -> {t}')
