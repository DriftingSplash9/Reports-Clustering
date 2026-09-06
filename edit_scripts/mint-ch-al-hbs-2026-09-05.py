"""
Mints the two household-budget-survey nodes left as leads by the
2026-09-05 price-index round (HANDOFF §3 [Agent] item 2), and the two
weight-source edges that made them leads.

Sources read live 2026-09-05 from the sandbox, HTTP 200, quotes verbatim:
  - FSO Steckbrief "Haushaltsbudgeterhebung" (PDF, the FSO's own survey
    fact sheet; its HTML pages are JavaScript shells)
  - INSTAT "Household Budget Survey" theme page (EN and SQ)
  - Eurostat prc_hicp_esmshi3_ch.htm 18.1.1 / 18.1.1.1
  - Eurostat prc_hicp_esmshi3_al.htm 18.1.1

Idempotent: refuses to run twice.
"""
import json, io, sys, os

P = 'src/data/research/eu-hbs-and-price-index-gaps-2026-09-05.json'

CH = {
    "id": "ch-bfs-hbs",
    "title": "Haushaltsbudgeterhebung (HABE) — Household Budget Survey",
    "publisher": "Bundesamt für Statistik (BFS) / Federal Statistical Office (FSO)",
    "country": "CH",
    "jurisdiction_level": "federal",
    "region": "Switzerland",
    "description": "The Swiss household budget survey. The FSO's own fact sheet: \"Die Haushaltsbudgeterhebung (HABE) ist eine Haushaltsbefragung, die seit 2000 jedes Jahr bei rund 3000 Privathaushalten in der Schweiz durchgeführt wird. Das Hauptziel ist die Erfassung der Einkommen und Ausgaben der privaten Haushalte.\" The same sheet states what the survey feeds: \"Die jährliche Durchführung der HABE ermöglicht: die jährliche Anpassung des Warenkorbes des LIK (Landesindex der Konsumentenpreise) an das aktuelle Konsumverhalten\". The FSO's HTML pages are JavaScript shells to a text fetcher, so the node cites the fact-sheet PDF.",
    "releases_per_year": 1,
    "cadence_note": "Annual for all households together; three-year pooled samples for household subgroups (FSO fact sheet: \"Für sämtliche Haushalte zusammen: Jährliche Veröffentlichung / Nach Haushaltsgruppen getrennt: Dreijährliche Veröffentlichung\").",
    "last_updated": None,
    "url": "https://www.bfs.admin.ch/bfsstatic/dam/assets/36697947/master",
    "domains": ["inflation"],
    "kind": "publication",
    "title_aliases": ["Household Budget Survey"],
}

AL = {
    "id": "al-instat-hbs",
    "title": "Anketa e Buxhetit të Njësive Ekonomike Familjare — Household Budget Survey",
    "publisher": "Instituti i Statistikave (INSTAT)",
    "country": "AL",
    "jurisdiction_level": "federal",
    "region": "Albania",
    "description": "INSTAT's household budget survey, continuous since 2014. Its own theme page: \"The Household Budget Survey is a statistical survey which is carried out at the household level and gives an overview of the socio-economic situation of the Albanian households. The results of this survey are also used to update the Consumer Price Index and Final Consumption calculation households as an important aggregate of GDP by the expenditure method.\" Same page on coverage: \"From 2006-2007 the survey is spread in the whole Albanian territory including urban and rural areas and also representative in prefecture level.\"",
    "releases_per_year": 1,
    "cadence_note": "Annual results published each October (INSTAT's release calendar lists \"Household Budget Survey, 2024\" on 06-10-2025 and \"Household Budget Survey, 2025\" on 06-10-2026); collection continuous since 2014.",
    "last_updated": None,
    "url": "https://www.instat.gov.al/en/themes/social-condition/household-budget-survey/",
    "domains": ["inflation"],
    "kind": "publication",
    "title_aliases": ["Household Budget Survey"],
}

EDGES = [
    {
        "source_report_id": "ch-bfs-lik",
        "target_report_id": "ch-bfs-hbs",
        "relationship_type": "uses_data_from",
        "basis": "RESEARCHED 2026-09-05. Eurostat's Switzerland HICP national reference metadata (prc_hicp_esmshi3_ch.htm, 18.1.1.1) names the household budget survey as the source that distributes the national-accounts weights to the 5th digit; 18.1.1 says the same at length. The FSO's own HABE fact sheet states the survey allows the annual update of the LIK basket. Read live (200), quote verbatim.",
        "evidence_url": "https://ec.europa.eu/eurostat/cache/metadata/EN/prc_hicp_esmshi3_ch.htm",
        "evidence_quote": "The weights are updated each year and produced up to the fifth digit. The main sources are the national accounts (4th digit) and the household budget survey to allocate these expenditures to 5th digit.",
        "evidence_grade": "A",
    },
    {
        "source_report_id": "al-instat-cpi-hicp",
        "target_report_id": "al-instat-hbs",
        "relationship_type": "uses_data_from",
        "basis": "RESEARCHED 2026-09-05. Eurostat's Albania HICP national reference metadata (prc_hicp_esmshi3_al.htm, 18.1.1) names the Household Budget Survey as the weight source below the highest aggregation levels; INSTAT's own HBS theme page says the survey's results are used to update the Consumer Price Index. Read live (200), quote verbatim.",
        "evidence_url": "https://ec.europa.eu/eurostat/cache/metadata/EN/prc_hicp_esmshi3_al.htm",
        "evidence_quote": "For lower levels of aggregation, Household Budget Survey (HBS) data is used.",
        "evidence_grade": "A",
    },
]

RESOLVED = {
    "ch-bfs-hbs": "RESOLVED 2026-09-05 — minted as `ch-bfs-hbs` from the FSO's own Haushaltsbudgeterhebung fact sheet (PDF, dam/assets/36697947/master), with the weight-source edge `ch-bfs-lik -> ch-bfs-hbs`. ",
    "al-instat-hbs": "RESOLVED 2026-09-05 — minted as `al-instat-hbs` from INSTAT's own Household Budget Survey theme page, with the weight-source edge `al-instat-cpi-hicp -> al-instat-hbs`. ",
}

d = json.load(io.open(P, encoding='utf-8'))
have = {r['id'] for r in d['reports']}
if 'ch-bfs-hbs' in have or 'al-instat-hbs' in have:
    sys.exit('already minted — nothing to do')

d['reports'].extend([CH, AL])
d['dependencies'].extend(EDGES)
for dr in d['_dropped']:
    rid = dr.get('report_id')
    if rid in RESOLVED and not dr['note'].startswith('RESOLVED'):
        dr['note'] = RESOLVED[rid] + dr['note']
d['_note'] = d['_note'] + " Round 2 (2026-09-05, same day): the two leads this slice left open — the Swiss and Albanian household budget surveys — minted, and the two weight-source edges wired. The Swiss node cites the FSO's own HABE fact-sheet PDF for the reason the CPI node cites a PDF; the Albanian node cites INSTAT's own theme page. Both _dropped leads carry a RESOLVED prefix and stay reason 'note'."

io.open(P, 'w', encoding='utf-8').write(json.dumps(d, indent=1, ensure_ascii=False) + "\n")
print('minted 2 reports, 2 dependencies, 2 _dropped notes marked RESOLVED')
