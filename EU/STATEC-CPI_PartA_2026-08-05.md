# STATEC-CPI — Part A extraction record

Date: 2026-08-05
Read first-hand this session, via browser: STATEC's own methodology landing page
(`statistiques.public.lu`) and, at one remove from it, the primary legal
instrument establishing Luxembourg's consumer price indices on Legilux.

Task: `G.33.md` priority item 0.1 — establish Luxembourg's own CPI node
conditions from a primary source, the same way `G.32.md`/`G.33.md` did for
HICP from Eurostat's own metadata page.

---

### STATEC-01

```
URL:       http://legilux.public.lu/eli/etat/leg/rgd/1999/12/20/n3/jo
LOCATION:  Art. 1er
QUOTE:     "Le Service central de la statistique et des études économiques,
           dénommé ci-après STATEC, établit chaque mois un indice des prix à
           la consommation conformément aux dispositions du Règlement (CE)
           n° 2494/95 du Conseil du 23 octobre 1995 relatif aux indices des
           prix à la consommation harmonisés et des règlements du Conseil et
           de la Commission pris en son exécution. En complément à l'indice
           des prix à la consommation harmonisé (IPCH), le STATEC établit un
           indice des prix à la consommation national (IPCN), qui se
           conforme aux mêmes principes et concepts méthodologiques.
           Toutefois, la couverture géographique de l'IPCN se limite à la
           seule population résidante; elle exclut la consommation des
           non-résidants."
NAMES:     indice des prix à la consommation harmonisé (IPCH)
           indice des prix à la consommation national (IPCN)
TENSE:     PRESENT
NOTES:     Statutory, not a webpage — the strongest evidence class per
           Research.1 §7. Establishes both series in one article: IPCH
           (Luxembourg's national contribution to the EU-wide HICP, made
           "conformément" to Council Regulation (EC) No 2494/95, the same
           instrument governing eurostat-hicp) and IPCN (a national-only
           series covering resident population consumption only, methodology
           otherwise identical). "Chaque mois" gives cadence directly:
           monthly, 12/year, for both series.
```

### STATEC-02

```
URL:       http://legilux.public.lu/eli/etat/leg/rgd/1999/12/20/n3/jo
LOCATION:  Art. 4(1)
QUOTE:     "Pour les besoins de l'échelle mobile des salaires et traitements,
           l'indice national des prix à la consommation (IPCN), établi sur
           la base 100 en 1996, est raccordé à la base 100 au 1er janvier
           1948."
NAMES:     indice national des prix à la consommation (IPCN)
           échelle mobile des salaires et traitements
TENSE:     PRESENT
NOTES:     Names the IPCN as the input to Luxembourg's own wage/salary
           indexation mechanism ("échelle mobile des salaires et
           traitements") — specifically the IPCN, not the IPCH. This is
           Luxembourg's *national* wage-indexation scheme (private and
           public sector, per the preamble's citation of the loi du 27 mai
           1975 "portant généralisation de l'échelle mobile des salaires et
           traitements"), and is a **separate mechanism from the EU staff
           Joint Index** in Annex XI to the Staff Regulations (AXI-02,
           EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md). Do not conflate
           the two — see NOTES on STATEC-03.
```

### STATEC-03

```
URL:       http://legilux.public.lu/eli/etat/leg/rgd/1999/12/20/n3/jo
LOCATION:  Art. 4(2)
QUOTE:     "L'indice mensuel raccordé à la base 100 au 1er janvier 1948 et
           la moyenne semestrielle prévue à l'article 11, alinéa 3 de la loi
           modifiée du 22 juin 1963 fixant le régime des traitements des
           fonctionnaires de l'Etat, sont publiés chaque mois au Mémorial."
NAMES:     loi modifiée du 22 juin 1963 fixant le régime des traitements des
           fonctionnaires de l'Etat (Art. 11, al. 3)
TENSE:     PRESENT
NOTES:     Names a second, more specific dependent: the six-month average of
           the IPCN-derived index prescribed at Art. 11(3) of the 1963 law
           setting the salary regime of Luxembourg state civil servants
           ("fonctionnaires de l'Etat"). This is a documented dependent end
           (a statute, with a section number) but **not itself a node yet**
           in this corpus — same `no-node-yet` shape as the EU staff Joint
           Index in eurostat-hicp.json's `_dropped` block. Not read
           first-hand this session; flagged for a future fetch if the
           échelle-mobile mechanism is ever modelled.
```

---

## Bearing on the open AXI-02 question (not adjudicated here)

Annex XI to the Staff Regulations, Article 1(2) (quoted in full at AXI-02,
`EU/AnnexXI-StaffRegulations_PartA_2026-08-05.md`), states the EU staff Joint
Index weights *"national inflation (as measured by the Harmonised Indices of
Consumer Prices (HICP) in the case of Belgium and the Consumer Prices Index
(CPI) in the case of Luxembourg)."*

STATEC-01 establishes that Luxembourg's national statistical office produces
**two, distinctly named series** matching this exact HICP/CPI split: an IPCH
(the harmonised one, methodologically the Belgian-side counterpart) and an
IPCN (explicitly the national one). Annex XI's drafting — HICP for Belgium,
plain "CPI" for Luxembourg — reads as consistent with the IPCN being the
Luxembourg-side input to the Joint Index, not the IPCH. **This is a reading,
not a verified fact** — no document read this session states that Annex XI's
"CPI" *is* the IPCN by name. Per Research.1 §3, this is reported, not
adjudicated; the identification would need a document — ideally the annual
Commission decision applying Annex XI, or an EU-side methodological note —
that names "IPCN" or cites Luxembourg's RGD of 20 December 1999 directly.

## Not done this session

- STATEC's own quality report / metadata equivalent to Eurostat's ESMS page
  (the "Rapport qualité" tab on the methodology landing page) was not opened.
  Not needed for node conditions — the 1999 regulation is a stronger evidence
  class and already gives cadence and title — but would be the next read if
  more STATEC-side methodological detail is wanted.
- `IPC-description.pdf` and the CPI glossary (linked from the same landing
  page) were not opened.
- Art. 11 of the loi modifiée du 22 juin 1963 (STATEC-03's dependent end) was
  not read first-hand.
- The loi du 27 mai 1975 ("généralisation de l'échelle mobile") was not read
  first-hand — named only via the RGD 1999 preamble.
