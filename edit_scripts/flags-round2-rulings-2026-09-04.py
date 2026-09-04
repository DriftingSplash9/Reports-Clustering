# -*- coding: utf-8 -*-
"""Thomas's rulings on the browser-pass-round-2 flags (2026-09-04).

  - mx-cscm -> mx-scnm      : re-evidenced in place (an mx-cscm -> sna-2008 edge
                              already exists, so the flag's "retarget to SNA 2008"
                              would have duplicated it).
  - br-lei-5534-1968 -> *   : both edges flipped (census/PNAD rest on the law).
  - id-democracy-index      : flipped to id-rpjmn -> id-democracy-index.
  - ndb-mou-brics-icm-2022  : basis corrected with a note; edge kept, stays C.
  - yt-budget-main-estimates: evidence retargeted to the companion Fiscal Outlook.
"""
import json, io, sys

R = "src/data/research/"

def load(f):
    with io.open(R+f, encoding="utf-8") as fh: return json.load(fh)

def save(f, d):
    with io.open(R+f, "w", encoding="utf-8") as fh:
        json.dump(d, fh, ensure_ascii=False, indent=2)
        fh.write("\n")

def find(d, s, t):
    for e in d["dependencies"]:
        if e.get("source_report_id")==s and e.get("target_report_id")==t: return e
    raise SystemExit("edge not found: %s -> %s" % (s,t))

RULING = ("Thomas's ruling on the browser-pass-round-2 flags, "
          "Claude outputs/browser-pass-round2-flags-2026-09-04.json.")

# ---------------------------------------------------------------- 1. Brazil
f = "br-brazil-grok-2026-08.json"; d = load(f)

e = find(d, "br-lei-5534-1968", "br-ibge-censo-demografico")
e["source_report_id"], e["target_report_id"] = "br-ibge-censo-demografico", "br-lei-5534-1968"
e["relationship_type"] = "legal_basis"
e["basis"] = ("The Censo Demografico rests on Lei 5.534/1968: the census's own "
    "enforcement-and-confidentiality page names the law as the instrument that makes "
    "the response obligatory and guarantees confidentiality. (Direction flipped and "
    "relationship_type methodology_depends_on -> legal_basis, 2026-09-04: the cited page, "
    "read in full in Chrome this round, says the census rests on the law, not the law on "
    "the census; the edge was minted the other way round. " + RULING + ")")
e["evidence_quote"] = ("By correctly answering the 2022 Census, the great winner is you. "
    "Law No. 5,534, of November 14, 1968, which establishes the mandatory provision of "
    "statistical information, ensures the confidentiality of the information collected")

e = find(d, "br-lei-5534-1968", "br-ibge-pnad-continua")
e["source_report_id"], e["target_report_id"] = "br-ibge-pnad-continua", "br-lei-5534-1968"
e["relationship_type"] = "legal_basis"
e["basis"] = ("PNAD Continua and IBGE's other household surveys operate under the "
    "mandatory-response and statistical-secrecy provisions of Lei 5.534/1968, which is the "
    "standing legal basis for information collection by IBGE. (Direction flipped and "
    "relationship_type methodology_depends_on -> legal_basis, 2026-09-04: its own basis text "
    "already described the survey resting on the law. Not itself flagged this round - flipped "
    "with its sibling br-ibge-censo-demografico edge because it is the same shape off the same "
    "law node, and leaving one of the two pointing the other way would have been incoherent.)")
save(f, d)

# --------------------------------------------------------------- 2. Indonesia
f = "id-unlinked-wiring-round2-2026-08-29.json"; d = load(f)
e = find(d, "id-democracy-index", "id-rpjmn")
e["source_report_id"], e["target_report_id"] = "id-rpjmn", "id-democracy-index"
e["basis"] = ("BPS (Jambi provincial office) states the IDI is the political-development "
    "measure used by government in the RPJMN 2010-2014, 2015-2019 and 2020-2024 periods - "
    "i.e. the RPJMN is the consumer of the index. Independently re-fetched and confirmed "
    "verbatim 2026-08-29. (Direction flipped 2026-09-04: the quote names id-rpjmn as the "
    "consumer of id-democracy-index; the edge was minted the other way round. " + RULING + ")")
save(f, d)

# ------------------------------------------------------------------- 3. NDB
f = "int-brics-international-layer-grok-2026-08.json"; d = load(f)
e = find(d, "ndb-mou-brics-icm-2022", "brics-icm-cooperation-framework-2011")
e["basis"] = ("BASIS CORRECTED 2026-09-04, edge retained pending re-evidence. All 16 pages of "
    "the MoU were OCR'd in the 2026-09-04 browser pass: it names exactly one predecessor "
    "instrument and dates it 2016, not 2011 - \"the first Memorandum of Understanding on "
    "General Cooperation signed by NDB and the Members of the BRICS Interbank Cooperation "
    "Mechanism on October 15, 2016\". The strings '2011' and 'Framework Agreement' do not "
    "appear anywhere in the document. The edge therefore stays C (uncited) until either the "
    "2011 ICM framework is evidenced from some other document or a node is minted for the "
    "2016 MoU and this edge re-pointed at it. " + RULING + " Original basis, kept for the "
    "record: \"The 2022 MoU between NDB and the ICM members builds on the earlier Framework "
    "Agreement on Financial Cooperation that established the Interbank Cooperation Mechanism "
    "among the national development banks of the founding BRICS members.\"")
save(f, d)

# ---------------------------------------------------------------- 4. Mexico
f = "mx-mexico-grok-2026-08.json"; d = load(f)
e = find(d, "mx-cscm", "mx-scnm")
e["basis"] = ("The CSCM is published as part of the SCNM and its own methodology volume says "
    "so: the volume's series line is \"INEGI. Sistema de Cuentas Nacionales de Mexico. Cuenta "
    "Satelite de la Cultura de Mexico. Fuentes y metodologias\", and its introduction states "
    "that INEGI's satellite-account programme \"constituye una parte importante del Sistema de "
    "Cuentas Nacionales de Mexico\". Read directly 2026-09-04. HONEST LIMIT: that sentence "
    "names the satellite-account programme, not the CSCM by name - it is the CSCM's own "
    "methodology volume saying it, which is why the edge stands, but it is programme-level "
    "wording. (Evidence retargeted 2026-09-04 from https://www.inegi.org.mx/programas/cultura/, "
    "which the browser pass read in full and which names SCN 2008, UNESCO's FCS and the "
    "Convenio Andres Bello but never the SCNM. The flag proposed re-pointing this edge at "
    "sna-2008 instead; not done, because mexico-wiring-grok-2026-08.json already carries an "
    "mx-cscm -> sna-2008 edge and that would have duplicated it. " + RULING + ")")
e["evidence_url"] = "https://www.inegi.org.mx/contenidos/programas/cultura/2008/doc/SCNM_Metodologia_21.pdf"
e["evidence_quote"] = ("el programa de cuentas satelite a cargo del Instituto, pues constituye "
    "una parte importante del Sistema de Cuentas Nacionales de Mexico")
save(f, d)

# ----------------------------------------------------------------- 5. Yukon
f = "territories-canada-grok-2026-08.json"; d = load(f)
e = find(d, "yt-budget-main-estimates", "territorial-formula-financing")
e["basis"] = ("The 2026-27 Budget's revenue tables carry the Grant from Canada (Territorial "
    "Formula Financing) as the largest single revenue line. EVIDENCE RETARGETED 2026-09-04: "
    "the previously cited URL, https://yukon.ca/en/2026-27-main-estimates-finance, is a "
    "download card for the 19-page Finance-department section of the Main Estimates and "
    "carries none of the revenue table - both it and the PDF behind it were read in full this "
    "round. The claim is evidenced in the companion volume of the same budget, the 2026-27 "
    "Fiscal Outlook, Table 4. Cross-publication within one budget: the source report here is "
    "the Main Estimates, the cited document is its companion volume. " + RULING + ")")
e["evidence_url"] = "https://yukon.ca/sites/default/files/fin-2026-27-fiscal-outlook.pdf"
e["evidence_quote"] = "Grant from Canada 1,454.2 1,454.2 1,578.9 1,706.1 1,812.2"
save(f, d)

print("ok")
