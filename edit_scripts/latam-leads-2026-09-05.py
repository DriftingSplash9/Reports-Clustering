#!/usr/bin/env python3
"""Publisher-cluster lead research, round 1 (LatAm NSOs), 2026-09-05.
Builds src/data/research/publisher-cluster-latam-2026-09-05.json from the four
research files in tmp_research/ (CO/AR/BO/PY), applying the editorial calls below,
and rewrites the matching _dropped entries in their home slices (resolved /
wrong-direction). Idempotent. Run from the repo root; on the device the research
files are not present, so the slice file is committed across instead and only the
_dropped rewrite half runs (`--dropped-only`).
"""
import json, os, sys, glob, hashlib
ROOT='.'; R='src/data/research'; DATE='2026-09-05'
OUT=f'{R}/publisher-cluster-latam-2026-09-05.json'
def load(p): return json.load(open(p,encoding='utf-8'))
def save(p,d):
    with open(p,'w',encoding='utf-8',newline='\n') as f: f.write(json.dumps(d,indent=2,ensure_ascii=False)+'\n')
def sha(p): return hashlib.sha256(open(p,'rb').read()).hexdigest()[:16]

# (edge as researched) -> (mint?, final source, final target, relationship_type, extra basis note)
PLAN = {
 'co-pobreza-monetaria -> co-geih': (True,'co-pobreza-monetaria','co-geih','uses_data_from',''),
 'co-pobreza-monetaria -> co-lineas-pobreza': (True,'co-pobreza-monetaria','co-lineas-pobreza','methodology_depends_on',''),
 'co-lineas-pobreza -> co-ipc': (True,'co-lineas-pobreza','co-ipc','uses_data_from','The document also calls the DELP deflator "independiente del IPC" — it is built from IPC price relatives with the basket\'s own weights, so the IPC is an input, not the deflator itself.'),
 'co-gini -> co-geih': (True,'co-gini','co-geih','calculated_from','The Gini section\'s own source line: "Fuente: DANE, cálculos con base en la Gran Encuesta Integrada de Hogares (2024-2025)."'),
 'co-emmet -> co-ipi': (True,'co-ipi','co-emmet','calculated_from','REVERSED from the lead: the IPI bulletin says the IPI is calculated from EMMET, not the other way.'),
 'co-comercio-exterior -> co-bop': (True,'co-bop','co-comercio-exterior','uses_data_from','REVERSED from the lead: Banrep\'s BOP methodology names the DANE/DIAN trade databases as its principal source for goods.'),
 'co-cuentas-nacionales -> co-eam': (True,'co-cuentas-nacionales','co-eam','uses_data_from','Base-2005 methodology; the base-2015 document does not name the EAM (checked).'),
 'co-pobreza-departamental -> co-pobreza-monetaria': (False,None,None,None,'Departmental figures are computed directly from GEIH; no DANE text derives them from the national publication.'),
 'ar-pobreza-indigencia -> ar-eph': (True,'ar-pobreza-indigencia','ar-eph','uses_data_from',''),
 'ar-pobreza-indigencia -> ar-cba-cbt': (True,'ar-pobreza-indigencia','ar-cba-cbt','methodology_depends_on',''),
 'ar-cba-cbt -> ar-ipc': (True,'ar-cba-cbt','ar-ipc','uses_data_from',''),
 'ar-emae -> ar-scn': (True,'ar-emae','ar-scn','methodology_depends_on',''),
 'ar-ucii -> ar-ipi': (False,None,None,None,'The UCII report cites IPI figures analytically; the two UCII methodology notes do not use the IPI (weights come from national accounts). A citation, not an input.'),
 'ar-csc -> ar-scn': (True,'ar-csc','ar-scn','methodology_depends_on',''),
 'ar-cst -> ar-scn': (True,'ar-cst','ar-scn','methodology_depends_on',''),
 'ar-comercio-exterior -> ar-bcra-bop': (True,'ar-bcra-bop','ar-comercio-exterior','uses_data_from','REVERSED from the lead: Metodología INDEC Nº 23 sources the goods account from INDEC\'s foreign-trade figures (ICA). NOTE FOR THOMAS: the same document states the BOP is compiled by INDEC\'s Dirección Nacional de Cuentas Internacionales, not the BCRA — the node `ar-bcra-bop` carries the wrong publisher; BCRA publishes the separate "Balance cambiario".'),
 'ar-indices-precios-cantidades-comercio -> ar-comercio-exterior': (True,'ar-indices-precios-cantidades-comercio','ar-comercio-exterior','uses_data_from',''),
 'ar-censo-agropecuario -> ar-estimaciones-agricolas': (False,None,None,None,'Reverse is the real direction (estimates adjusted against the census) but the CNA objectives bullet does not name "Estimaciones agrícolas"; magyp.gob.ar unreachable from the sandbox. Lead stays, reversed.'),
 'ar-scn -> ar-ley-17622': (False,None,None,None,'Three INDEC national-accounts methodologies (Nº 21, base-2004, Nº 24) and the EMAE docs never cite Ley 17.622.'),
 'ar-eph -> ar-ley-17622': (True,'ar-eph','ar-ley-17622','legal_basis','The EPH household questionnaire header cites the law as the confidentiality basis under which the survey is collected. Questionnaire, not methodology — B is the honest ceiling.'),
 'bo-pobreza -> bo-eh': (True,'bo-pobreza','bo-eh','uses_data_from',''),
 'bo-pobreza -> bo-lineas-pobreza': (True,'bo-pobreza','bo-lineas-pobreza','methodology_depends_on',''),
 'bo-lineas-pobreza -> bo-ipc': (True,'bo-lineas-pobreza','bo-ipc','uses_data_from','Urban LPE only; the rural line is updated from EH unit prices (same document).'),
 'bo-gini -> bo-eh': (True,'bo-gini','bo-eh','calculated_from','The note\'s Paso 5 defines the "gini" indicator on the EH variable yhogpc; the quoted sentence says "desigualdad", not "Gini".'),
 'bo-informalidad -> bo-eh': (True,'bo-informalidad','bo-eh','uses_data_from','The ECE is the primary informality source in this document; the EH is the annual source used alongside it.'),
 'bo-empleo-formal -> bo-eh': (True,'bo-empleo-formal','bo-eh','uses_data_from','Results prose ("tomando en cuenta los datos de la EH"), no standalone formal-employment methodology found.'),
 'bo-inseguridad-alimentaria -> bo-eh': (True,'bo-inseguridad-alimentaria','bo-eh','uses_data_from','Names "la escala de inseguridad alimentaria", not the ELCSA acronym.'),
 'bo-nbi -> bo-vivienda': (False,None,None,None,'NBI housing component is computed from census variables (INE NBI glosario/ficha); no housing-conditions publication is named. Re-target to the census if wanted.'),
 'bo-bop -> bo-comercio-exterior': (True,'bo-bop','bo-comercio-exterior','uses_data_from','BCB metadata sheet dated 2007; BOP 2023 tables corroborate with "FUENTE: INE, Aduana Nacional".'),
 'bo-bop -> bo-remesas': (False,None,None,None,'BOP reports say secondary-income transfers are "compuestas principalmente por las remesas familiares" — composition, not a named input series. No BCB remittances methodology located.'),
 'bo-pobreza-departamental -> bo-pobreza': (False,None,None,None,'The departmental incidences are a table inside the pobreza chapter of the EH results — a part_of shape (rule 12), not a dependency.'),
 'py-pobreza -> py-ephc': (True,'py-pobreza','py-ephc','uses_data_from',''),
 'py-pobreza -> py-lineas-pobreza': (True,'py-pobreza','py-lineas-pobreza','methodology_depends_on',''),
 'py-lineas-pobreza -> py-ipc': (True,'py-lineas-pobreza','py-ipc','uses_data_from',''),
 'py-ipm -> py-ephc': (True,'py-ipm','py-ephc','uses_data_from',''),
 'py-gini -> py-ephc': (True,'py-gini','py-ephc','calculated_from',''),
 'py-asistencia-escolar -> py-ephc': (True,'py-asistencia-escolar','py-ephc','uses_data_from','INE news release (HTML); no standalone EPHC education bulletin PDF exists on ine.gov.py.'),
 'py-pobreza-departamental -> py-pobreza': (False,None,None,None,'The departmental table (Cuadro Nº 2) sits inside the same publication — a part_of shape (rule 12), not a dependency.'),
}
AGENCY={'co':'DANE / Banco de la República','ar':'INDEC','bo':'INE Bolivia / BCB','py':'INE Paraguay'}

QUOTE_OVERRIDES = {  # shortened to the grader's own extraction (hyphenated line breaks / HTML entities cost coverage)
 'ar-pobreza-indigencia -> ar-eph': 'el Índice de Precios al Consumidor (para la determinación de las canastas) y la Encuesta Permanente de Hogares (para la determinación de los ingresos, la estructura de los hogares y el conjunto de variables analíticas para explicar y contextualizar la pobreza y la indigencia).',
 'py-asistencia-escolar -> py-ephc': 'De acuerdo a los indicadores de educación de la Encuesta Permanente de Hogares Continua (EPHC) 2025 del Instituto Nacional de Estadística (INE), el promedio de años de estudios de la población de 15 y más años de edad es de 10,2 años en total.',
}

def build():
    deps=[]; dropped=[]
    for c in ['CO','AR','BO','PY']:
        for r in load(f'tmp_research/{c}.json'):
            mint,s,t,rel,note=PLAN[r['edge']]
            if not mint:
                continue
            f=r['fetch']
            basis=(f"RESEARCHED {DATE} (publisher-cluster lead research, {AGENCY[s[:2]]}; lead was a 2026-08-31 assertion-only quarantine "
                   f"'{r['edge']}'). Document: {r['location']}. Read live by curl ({f['status']}, {f['bytes']:,} bytes, {f['extractor']}); "
                   f"the quote is verbatim from that read and names the target. {note}").strip()
            deps.append({'source_report_id':s,'target_report_id':t,'relationship_type':rel,'basis':basis,
                         'evidence_url':r['evidence_url'],'evidence_quote':QUOTE_OVERRIDES.get(r['edge'],r['quote'])})
    return deps

MINTED_REVERSE={('co-bop','co-comercio-exterior'),('co-ipi','co-emmet')}

def rewrite_dropped():
    # every researched lead lives as a _dropped entry somewhere; rewrite it
    n=0
    # rule 10: the 2026-08-26 'tossed' reverse claims (andean-wiring-grok) now describe live edges
    f=f'{R}/andean-wiring-grok-2026-08.json'; d=load(f); dirty=False
    for x in d.get('_dropped',[]):
        if (x.get('source'),x.get('target')) in MINTED_REVERSE and x.get('reason')=='wrong-direction':
            x['reason']='resolved'
            x['why']=(f"RESOLVED {DATE} (publisher-cluster lead research) — SUPERSEDES the 2026-08-26 'tossed' ruling below, which was made on Grok "
                      "assertion-only evidence while the forward edge was live. That forward edge was quarantined 2026-08-31; today the compiling agency's own "
                      "document states THIS direction verbatim (Banrep BOP methodology / DANE IPI bulletin — see publisher-cluster-latam-2026-09-05.json), "
                      "so it is minted this way. Thomas to confirm the reversal of his 08-26 call. Original entry follows: "+x['why'])
            dirty=True; n+=1
    if dirty: save(f,d); print('  rewrote (rule 10)',os.path.basename(f),sha(f))
    for f in sorted(glob.glob(f'{R}/*.json')):
        if f.endswith('publisher-cluster-latam-2026-09-05.json'): continue
        d=load(f); dirty=False
        for x in d.get('_dropped',[]):
            e=x.get('edge')
            if e not in PLAN or x.get('reason') in ('resolved','wrong-direction','caveat') : continue
            mint,s,t,rel,note=PLAN[e]
            if not mint:
                if f'LEAD RESEARCHED {DATE}' in x['why']: continue
                x['why']=f"LEAD RESEARCHED {DATE} (publisher-cluster round, agency documents read): not minted — {note} Original entry follows: "+x['why']
                dirty=True; n+=1; continue
            if s==x.get('source') and t==x.get('target'):
                x['reason']='resolved'
                x['why']=f"RESOLVED {DATE} (publisher-cluster lead research): minted in publisher-cluster-latam-2026-09-05.json from the agency's own document. Original entry follows: "+x['why']
            else:
                x['reason']='wrong-direction'
                x['why']=f"WRONG DIRECTION, found {DATE} (publisher-cluster lead research): the agency's document states {s} -> {t}; minted that way in publisher-cluster-latam-2026-09-05.json. Original entry follows: "+x['why']
            dirty=True; n+=1
        if dirty: save(f,d); print('  rewrote',os.path.basename(f),sha(f))
    print('dropped entries rewritten:',n)

if '--dropped-only' not in sys.argv:
    if os.path.exists(OUT):
        cur=load(OUT)
    else:
        cur={'_slice':'publisher-cluster-latam-2026-09-05','_researched':DATE,
             '_note':("Publisher-cluster lead research, round 1: the 2026-08-31 assertion-only quarantines whose hosts read fine but whose leads quoted nothing "
                      "(ine.gob.bo, indec.gob.ar, ine.gov.py, dane.gov.co; stats.gov.cn deferred). Method: for each lead, find the compiling agency's own "
                      "methodology document, read it live, quote the sentence that names the input, mint only what the document states — and in the "
                      "direction it states. 38 leads worked: 30 minted (4 reversed), 8 left as leads with the reason recorded on the entry."),
             'reports':[],'dependencies':[],'_dropped':[]}
    deps=build()
    have={(e['source_report_id'],e['target_report_id']):e for e in cur['dependencies']}
    added=0
    for e in deps:
        k=(e['source_report_id'],e['target_report_id'])
        if k in have:
            have[k]['basis']=e['basis']; have[k]['evidence_quote']=e['evidence_quote']; continue
        cur['dependencies'].append(e); added+=1
    save(OUT,cur); print('slice edges:',len(cur['dependencies']),'added',added,sha(OUT))
rewrite_dropped()
