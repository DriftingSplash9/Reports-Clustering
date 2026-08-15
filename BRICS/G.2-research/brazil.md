# BRICS Round 2 (BRICS/G.2) — BRAZIL

Research date: 2026-08-13.

## ACCESS / METHODOLOGY NOTE (read first)

Egress conditions observed this round, verified by raw `curl`:

- **`www.planalto.gov.br`** — plain `curl -sL` with no headers returns `curl: (52) Empty reply from server` (`000 0`). Adding a normal browser `User-Agent` makes it return genuine **HTTP 200 with full bytes**. All Planalto extractions below are therefore **TIER A** (real government bytes, unmodified content), with the caveat that a UA header was required. I note this explicitly rather than hiding it.
- **`www.bcb.gov.br`**, **`siconfi.tesouro.gov.br`**, **`biblioteca.ibge.gov.br`**, **`agenciadenoticias.ibge.gov.br`**, **`apisidra.ibge.gov.br`**, **`servicodados.ibge.gov.br`**, **`www.in.gov.br`** — TIER A with UA header.
- **`www.ibge.gov.br`** (the main statistics portal) — **inconsistent**. Some paths return genuine 200 (e.g. `/estatisticas/economicas/contas-nacionais/...`), others return a genuine **403 with a ~5.8KB WAF body** (e.g. `/estatisticas/sociais/trabalho/17270-pnad-continua.html`). Where 403, I used `r.jina.ai` = **TIER B**.
- **`portal.tcu.gov.br`** — returns **HTTP 200 but the body is a JS/bot-challenge HTML page**, not the PDF (confirmed: `head -c 400` shows `<!DOCTYPE html> ... window["bobcmn"]`). This is exactly the failure mode the brief warns about — a 200 that is not the document. Used `r.jina.ai` = **TIER B**.
- **`*.stf.jus.br` (ALL hosts)** — hard egress failure, see item 3.
- `bibliotecadigital.gestao.gov.br` — genuine **403**.
- `www.gov.br/tesouronacional/.../siconfi` — genuine **401**, body text: *"Conteúdo Restrito É necessário autenticar para visualizar essa página."* Not a fetch failure; the page is genuinely access-restricted.

I did **not** rely on WebFetch for any extraction in this round. Every quote below came from bytes I downloaded with `curl` and parsed locally (`pdftotext -layout`, or regex tag-stripping of HTML).

---

# HALF 1 — OPEN LEADS FROM ROUND 1

## 1a. Lei nº 8.213/1991, art. 41-A — INPC's statutory downstream use — **VERIFIED**

Verification tier: **A**
URL: `https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm`
HTTP check:
```
$ curl -sS --max-time 40 -A "<browser UA>" -o p1.html -w '%{http_code} %{size_download}\n' -L "https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm"
200 753510
```
(without the UA header the same URL returns `curl: (52) Empty reply from server`)

Title (as published, in Portuguese): **Lei nº 8.213, de 24 de julho de 1991** — "Dispõe sobre os Planos de Benefícios da Previdência Social e dá outras providências." (texto compilado / consolidado)
Publisher: Presidência da República, Casa Civil, Subchefia para Assuntos Jurídicos (Portal da Legislação — Planalto)
Periodicity: n/a — this is a **standing statute defining a method**, which the project's node rules explicitly admit.

Verbatim quote (art. 41-A caput, included by Lei nº 11.430/2006):

> "Art. 41-A. O valor dos benefícios em manutenção será reajustado, anualmente, na mesma data do reajuste do salário mínimo, *pro rata*, de acordo com suas respectivas datas de início ou do último reajustamento, com base no Índice Nacional de Preços ao Consumidor - INPC, apurado pela Fundação Instituto Brasileiro de Geografia e Estatística - IBGE."

Also verbatim, art. 41-A § 4º:

> "§ 4º Para os benefícios que tenham sido majorados devido à elevação do salário mínimo, o referido aumento deverá ser compensado no momento da aplicação do disposto no *caput* deste artigo, de acordo com normas a serem baixadas pelo Ministério da Previdência Social."

**This closes round 1's open lead.** The statute names INPC *by name*, names IBGE *by name* as its producer, and specifies a real, live indexation purpose (annual readjustment of all RGPS benefits in maintenance). Present tense, in force.

Proposed node? **Yes** — `br-lei-8213` (standing statute defining a method), source_kind: statute.

Proposed EDGE(s):
- `br-lei-8213` -> `br-inpc`, relationship_type: **uses_index / names_as_input**.
  Citation from the dependent document's own text: *"...com base no Índice Nacional de Preços ao Consumidor - INPC, apurado pela Fundação Instituto Brasileiro de Geografia e Estatística - IBGE."*

---

## 1b. Portaria Interministerial MPS/MF nº 13, de 9 de janeiro de 2026 — the annual recurring instrument — **VERIFIED (with an important negative)**

Verification tier: **A**
URL (official Diário Oficial da União, Imprensa Nacional):
`https://www.in.gov.br/web/dou/-/portaria-interministerial-mps/mf-n-13-de-9-de-janeiro-de-2026-680382603`
HTTP check:
```
$ curl -sS --max-time 45 -A "<browser UA>" -o dou13.html -w '%{http_code} %{size_download}\n' -L "https://www.in.gov.br/web/dou/-/portaria-interministerial-mps/mf-n-13-de-9-de-janeiro-de-2026-680382603"
200 104885
```
How I found the exact URL: the in.gov.br search endpoint returns a JSON blob inside the HTML; I extracted `urlTitle":"portaria-interministerial-mps/mf-n-13-de-9-de-janeiro-de-2026-680382603"` from
`https://www.in.gov.br/consulta/-/buscar/dou?q=%22PORTARIA+INTERMINISTERIAL+MPS%2FMF+N%C2%BA+13%22&s=do1&exactDate=personalizado&publishFrom=09-01-2026&publishTo=15-01-2026` (`200 175249`).

Title (as published, in Portuguese): **PORTARIA INTERMINISTERIAL MPS/MF Nº 13, DE 9 DE JANEIRO DE 2026**
Publisher: Ministério da Previdência Social / Gabinete do Ministro (jointly with Ministério da Fazenda)
Publication metadata, verbatim: *"Publicado em: 12/01/2026 | Edição: 7 | Seção: 1 | Página: 58"*
Periodicity: **Annual** — established by the recurring series (one Portaria Interministerial per year, published each January, fixing that year's readjustment). Periodicity is not stated verbatim inside the instrument itself; it is implied by art. 41-A's *"será reajustado, anualmente"* which this Portaria executes. **Flagging that this is an inference about periodicity, not a verbatim periodicity statement.**

Verbatim quote — ementa:
> "Dispõe sobre o reajuste dos benefícios pagos pelo Instituto Nacional do Seguro Social - INSS e demais valores constantes do Regulamento da Previdência Social - RPS e dos valores previstos nos incisos II a VIII do § 1º do art. 11 da Emenda Constitucional nº 103, de 12 de novembro de 2019..."

Verbatim quote — preamble (**this is the edge evidence**):
> "OS MINISTROS DE ESTADO DA PREVIDÊNCIA SOCIAL E DA FAZENDA, no uso da atribuição que lhes confere o inciso II do parágrafo único do art. 87 da Constituição, e tendo em vista o disposto na Emenda Constitucional nº 20, de 15 de dezembro de 1998; na Emenda Constitucional nº 41, de 19 de dezembro de 2003; na Emenda Constitucional nº 103, de 12 de novembro de 2019; na Lei nº 8.212, de 24 de julho de 1991; **no art. 41-A da Lei nº 8.213, de 24 de julho de 1991**; **na Lei nº 14.663, de 28 de agosto de 2023**; no Decreto nº 12.797, de 23 de dezembro de 2025; e no Regulamento da Previdência Social - RPS, aprovado pelo Decreto nº 3.048, de 6 de maio de 1999, resolvem:"

Verbatim quote — art. 1º:
> "Art. 1º Os benefícios pagos pelo Instituto Nacional do Seguro Social - INSS serão reajustados, a partir de 1º de janeiro de 2026, em 3,90% (três inteiros e noventa centésimos por cento)."

**IMPORTANT NEGATIVE — reported honestly.** I searched the full DOU text of this Portaria: `INPC` occurs **0 times**, and `Índice` occurs **0 times** as a named index. The Portaria states the *result* (3,90%) but does **not** itself name INPC. The INPC naming lives one hop upstream, in art. 41-A of Lei 8.213, which the Portaria's preamble cites explicitly. So the correct edge structure is a two-hop chain, not a direct Portaria→INPC edge. Anyone drawing `portaria -> br-inpc` directly would be overstating the evidence.

Proposed node? **Yes** — `br-portaria-reajuste-inss` (recurrently published, annual, titled, government-authored).

Proposed EDGE(s):
- `br-portaria-reajuste-inss` -> `br-lei-8213`, relationship_type: **mandated_by / names_as_legal_basis**.
  Citation: *"...tendo em vista o disposto ... no art. 41-A da Lei nº 8.213, de 24 de julho de 1991..."*
- `br-portaria-reajuste-inss` -> `br-lei-14663`, relationship_type: **mandated_by / names_as_legal_basis**.
  Citation: *"...tendo em vista o disposto ... na Lei nº 14.663, de 28 de agosto de 2023..."*
- `br-portaria-reajuste-inss` -> `br-decreto-salario-minimo`, relationship_type: **names_as_input**.
  Citation: *"...e no Decreto nº 12.797, de 23 de dezembro de 2025..."*
- (INDIRECT, do not assert as a direct edge) `br-portaria-reajuste-inss` → ... → `br-inpc` via `br-lei-8213`.

**Failed attempts worth recording:** the Ministry's own PDF of this Portaria at
`https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf`
returns `200 1452589` but is a **scanned image PDF** — `pdftotext -layout` yields a 4-byte file, and `pdfimages -list` confirms every page is a JPEG raster. Only `eng` and `osd` tesseract language packs are installed (no `por`), so OCR was not a reliable option. The `bibliotecadigital.gestao.gov.br` mirror of the DOU page returned `403 4549`. The in.gov.br DOU HTML was the working route.

---

## 1c. FGTS — INPC — **NOT FOUND**

I did not locate a primary instrument naming INPC for FGTS indexation. FGTS accounts are constitutionally/statutorily remunerated by TR + 3% a.a. (Lei 8.036/1990), not by INPC, so the round-1 hypothesis appears to be simply incorrect rather than merely unverified. I did not spend further budget here because item 1a already closed the lead decisively with a stronger instrument. **Reason: hypothesis likely false; superseded by a better-evidenced finding.**

---

## 2. Resolução CMN nº 2.615, de 30 de junho de 1999 — **VERIFIED — the number is CORRECT**

Verification tier: **A**
URL: `https://www.bcb.gov.br/pre/normativos/res/1999/pdf/res_2615_v2_L.pdf`
HTTP check:
```
$ curl -sS --max-time 35 -A "<browser UA>" -o res2615.html -w '%{http_code} %{size_download}\n' -L "https://www.bcb.gov.br/pre/normativos/res/1999/pdf/res_2615_v2_L.pdf"
200 18544
```
Extracted with `pdftotext -layout` — a genuine text PDF, extracted cleanly.

Title (as published, in Portuguese): **RESOLUÇÃO Nº 2.615** — ementa: *"Fixa as metas para a inflação e seus respectivos intervalos de tolerância, bem como o índice de preços a que se aplicam, para os anos 2001, 2000 e 1999."*
Publisher: Banco Central do Brasil / Conselho Monetário Nacional (CMN)
Periodicity: n/a — a one-off normative instrument (though the CMN inflation-target resolution *series* is annual and recurring; `br-resolucao-cmn-5141` from round 1 is the modern member of that series).

Verbatim quote — preamble:
> "O BANCO CENTRAL DO BRASIL, na forma do art. 9º da Lei nº 4.595, de 31 de dezembro de 1964, torna público que o CONSELHO MONETÁRIO NACIONAL, em sessão realizada em 30 de junho de 1999, tendo em vista o disposto no Decreto nº 3.088, de 21 de junho de 1999, RESOLVEU:"

Verbatim quote — **Art. 1º** (the requested text):
> "Art. 1º Determinar que o índice de preços relacionado às metas para a inflação, referido no art. 1º, parágrafo 1º, do Decreto nº 3.088, de 21 de junho de 1999, é o Índice de Preços ao Consumidor Amplo (IPCA), calculado pelo Instituto Brasileiro de Geografia e Estatística (IBGE)."

Verbatim quote — parágrafo único:
> "Parágrafo único. O Conselho Monetário Nacional, mediante proposta do Ministro de Estado da Fazenda, determinará índice substituto eventual, na impossibilidade de se aferir o índice de que trata o 'caput' deste artigo."

Signed: *"Brasília, 30 de junho de 1999 / Arminio Fraga Neto / Presidente"*

**CRITICAL STATUS FLAG — verbatim, from the face of the BCB's own PDF:**
> "Documento normativo revogado pela Resolução nº 4.367, de 11/9/2014."

I independently verified the revocation. `https://www.bcb.gov.br/pre/normativos/res/2014/pdf/res_4367_v1_O.pdf` → `200 19020`, and its Art. 1º reads verbatim:
> "Art. 1º Ficam revogadas as Resoluções ns. 38, de 15 de outubro de 1966; 103, de 10 de dezembro de 1968; ... 2.189, de 17 de agosto de 1995; **2.615, de 30 de junho de 1999**; 2.776, de 3 de outubro de 2000; ..."
Ementa of Res. 4.367: *"Revoga resoluções sem função por decurso de prazo ou por regulamentação superveniente."*

**Assessment.** The number the project was given (2.615) is **correct**, and this resolution genuinely is the instrument that **first named IPCA as the inflation-target index**. But it is **revoked** (2014) and its parent Decreto 3.088/1999 is also revoked. This is therefore a **historical/originating instrument, not a live dependency**. The tense issue the brief warns about applies here in its strongest form: this is a **past** arrangement. The live equivalent is round 1's `br-resolucao-cmn-5141`.

Proposed node? **Qualified yes** — as a historical/superseded instrument only, e.g. `br-resolucao-cmn-2615`, with an explicit `status: revoked` / `superseded_by` field. Do **not** model it as a live edge into `br-ipca`.

Proposed EDGE(s) (all to be marked HISTORICAL / not-live):
- `br-resolucao-cmn-2615` -> `br-ipca`, relationship_type: **uses_index (HISTORICAL, originating)**.
  Citation: *"...o índice de preços relacionado às metas para a inflação ... é o Índice de Preços ao Consumidor Amplo (IPCA), calculado pelo Instituto Brasileiro de Geografia e Estatística (IBGE)."*
- `br-resolucao-cmn-2615` -> `br-decreto-3088` (revoked), relationship_type: **mandated_by (HISTORICAL)**.
  Citation: *"...tendo em vista o disposto no Decreto nº 3.088, de 21 de junho de 1999..."*
- `br-resolucao-cmn-4367` -> `br-resolucao-cmn-2615`, relationship_type: **revokes**.
  Citation: *"Art. 1º Ficam revogadas as Resoluções ns. ... 2.615, de 30 de junho de 1999..."*

---

## 3. STF ADI 875 — **NOT FOUND (hard egress/WAF block, fully characterised)**

Verification tier: **none reached**
Periodicity / title / verbatim quote: **none obtained. I am not going to reconstruct any of it from memory or secondary sources.**

Exactly what I tried, and exactly what each returned:

| URL | Result |
|---|---|
| `https://portal.stf.jus.br/processos/detalhe.asp?incidente=2211835` | `000 0` (connection failure) |
| `https://redir.stf.jus.br/paginadorpub/paginador.jsp?docTP=AC&docID=610250` | `000 0` |
| `https://jurisprudencia.stf.jus.br/pages/search?classeNumeroIncidente=%22ADI%20875%22` | `000 0` |
| `https://www.stf.jus.br/portal/geral/verPdfPaginado.asp?id=610250&tipo=AC&descricao=...` | `000 0` |
| `https://portal.stf.jus.br/` (bare root) | `000` |
| `https://jurisprudencia.stf.jus.br/` (bare root) | `000` |
| `https://www.stf.jus.br/arquivo/informativo/documento/informativo576.htm` | `000` |
| `https://portal.stf.jus.br/processos/downloadPeca.asp?id=15339260516&ext=.pdf` | `000 0` |
| **TIER B attempt:** `https://r.jina.ai/https://portal.stf.jus.br/processos/detalhe.asp?incidente=2211835` | `200 184`, body = `Title: 403 Forbidden ... Warning: Target URL returned error 403: Forbidden` |
| **TIER B attempt:** `https://r.jina.ai/https://www.stf.jus.br/arquivo/informativo/documento/informativo576.htm` | `200 190`, body = `403 Forbidden` |
| **DOU fallback:** `https://www.in.gov.br/consulta/-/buscar/dou?q=%22ADI+875%22&s=todos` | `200 144629`, but the extracted `urlTitle` result set was **empty** — no DOU match |

**Specific reason:** two independent, stacked failures. (i) Every `*.stf.jus.br` host produces a bare-socket failure from this environment (`000`, zero bytes) — this is an **egress-side block**, not a JS-rendering problem, since even the bare domain roots fail. (ii) The r.jina.ai rendering proxy *does* reach STF but STF's own WAF returns a genuine **403** to it — so the accepted Tier-B workaround is also closed. STF is not reachable at all this round. (iii) ADI 875 is old enough (2010) that its acórdão is not in the in.gov.br DOU search index.

**Separate, and answerable without STF access — the node-qualification question the brief asked me to settle honestly:**

An ADI ruling is a **one-off adjudication of a specific case**. It is not a recurrently published document, and it is not a standing statute or instrument that defines a method. On the project's own stated node rule ("Only RECURRENTLY PUBLISHED documents (or standing statutes/instruments that define a method) qualify as nodes"), **ADI 875 does not qualify as a node.** Its causal role — forcing Congress to enact LC 143/2013 — is real but is *historical provenance*, better captured as a note on `br-lc-62-1989` than as a graph node.

Corroborating this from a source I *could* reach: Planalto's own consolidated text of LC 62/1989 carries editorial annotations of the form *"(Vide ADI nº 5069)"* against the LC 143/2013-inserted provisions. I searched the full Planalto LC 62 text and it annotates **ADI 5069**, not ADI 875 — consistent with ADI 875 having exhausted its effect on the *pre-2013* Anexo Único, which the consolidated text no longer carries.

On the secondary question — does STF publish a recurring statistical/jurisprudence series that *would* qualify? Plausibly yes (e.g. "Informativo do STF", "STF em Números"), and that would be a legitimately different question with a different answer. **I could not test it, because the entire domain is unreachable.** Flagging as an open lead for a round with different egress.

---

# HALF 2 — SECOND LAYER OF BRAZILIAN BUILDING BLOCKS

## 4. PNAD Contínua — is it TCU's `rdpc` source? — **PARTIAL: PNADC verified as a node; the edge to TCU is NOT FOUND**

This was the brief's strongest lead. The honest answer is: **PNADC is solidly documented as a node, but the specific edge round 1 was hunting — a document connecting TCU's `rdpc` column to PNADC by name — does not exist in any primary text I could reach.** I confirmed the gap rather than closing it, and I confirmed it at three separate levels of the chain.

### 4a. The TCU side — re-read carefully, as instructed

Verification tier: **B** (portal.tcu.gov.br served an HTTP 200 that was a **bot-challenge HTML page, not the PDF** — verified by inspecting the bytes; used r.jina.ai)
URL: `https://portal.tcu.gov.br/data/files/B5/A4/C1/EC/E034E8103A4A64C8F18818A8/FPE-2025%20DNT2024_209.pdf`
HTTP check:
```
$ curl -sS --max-time 40 -A "<browser UA>" -o fpe2025.pdf -w '%{http_code} %{size_download}\n' -L "https://portal.tcu.gov.br/data/files/.../FPE-2025%20DNT2024_209.pdf"
200 50640
$ head -c 400 fpe2025.pdf
<!DOCTYPE html> <html><head> ... <script type="text/javascript">(function(){window["bobcmn"] = "1011101010101020000000...
$ curl -sS --max-time 90 -o j_fpe.txt -w '%{http_code} %{size_download}\n' -L "https://r.jina.ai/https://portal.tcu.gov.br/data/files/.../FPE-2025%20DNT2024_209.pdf"
200 13052
```
**This is a textbook instance of the warning in the brief: HTTP 200, 50KB, and it is not the document.**

Title (as published, in Portuguese): **DECISÃO NORMATIVA - TCU Nº 209, DE 13 DE MARÇO DE 2024** — ementa: *"Aprova, para o exercício de 2025, os coeficientes individuais de participação dos estados e do Distrito Federal nos recursos previstos no art. 159, inciso I, alínea 'a', da Constituição Federal (FPE)."*
Publisher: Tribunal de Contas da União, Plenário. Signed *"TCU, Sala das Sessões, em 13 de março de 2024. BRUNO DANTAS, Presidente"*.
Periodicity: **Annual** (one DN per exercício; this is the FPE-2025 edition, and round 1 already holds `br-fpe-dn-tcu`).

Verbatim — the DN's own legal-basis preamble:
> "O TRIBUNAL DE CONTAS DA UNIÃO, no uso da atribuição que lhe confere o art. 161, parágrafo único, da Constituição Federal e o art. 1º, inciso VI, da Lei 8.443, de 16 de julho de 1992 (Lei Orgânica do Tribunal de Contas da União), e ainda o constante no art. 159, inciso I, alínea 'a', da Constituição Federal; no art. 92 da Lei 5.172, de 25 de outubro de 1966 (Código Tributário Nacional), alterado pela Lei Complementar 143, de 17 de julho de 2013; e na Lei Complementar 62, de 28 de dezembro de 1989, alterada pela Lei Complementar 143, de 17 de julho de 2013..."

Verbatim — **Anexo, column notes** (the decisive text):
> "Coluna B: população da UF fornecida pela Fundação Instituto Brasileiro de Geografia e Estatística (IBGE) com data de referência em 31/7/2022 e malha territorial de 30/4/2023 (art. 102, inciso I, da Lei 8.443, de 16/7/1992);"

> "**Coluna F: renda domiciliar per capita (rdpc) da UF fornecida pelo IBGE, relativa ao exercício de 2023;**"

> "Coluna K: ... Na observação, apresenta-se o valor da rdpcn, também fornecido pelo IBGE (R$ 1.892,75), a partir do qual se calcula o valor de referência (72% da rdpcn = R$ 1.362,78) (art. 2º, § 1º, inciso III, da LC 62/1989);"

Table-header text, verbatim:
> "Renda domiciliar per capita (rdpc) (fonte: IBGE, ref. 2023)"
> "População (fonte: IBGE, ref. 31/07/2022)"

**Finding: round 1's characterisation was exactly right and remains unchanged.** For *population*, TCU cites a statutory hook (art. 102, I, of Lei 8.443) — which is why `br-fpe-dn-tcu -> br-ibge-estimativas-populacao` was defensible. For *rdpc*, TCU cites **only the agency ("fornecida pelo IBGE") and a reference year — no titled release, no survey name, no statutory hook.** PNAD Contínua is **not named anywhere in the DN**.

### 4b. The statute side — checked as an alternative route to the edge

Verification tier: **A**
URL: `https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp62.htm`
HTTP check: `200 34151` (with UA)

LC 62/1989 art. 2º, § 3º (redação dada pela LC 143/2013), verbatim:
> "§ 3º Para efeito do disposto neste artigo, serão considerados os valores censitários ou as estimativas mais recentes da população e da **renda domiciliar per capita publicados pela entidade federal competente**."

**The statute stops at "entidade federal competente" — it does not even name IBGE, let alone PNADC.** So the chain terminates at *agency* level in the DN and at *generic-agency* level in the statute. There is no statutory or normative text anywhere that names a titled release for `rdpc`. **This route is closed.**

(Contrast art. 3º of the same LC, which *does* name the agency: *"...com base no resultado do Censo de 1991, realizado pela Fundação IBGE."*)

### 4c. The IBGE side — PNAD Contínua as a node

Verification tier: **B** for the product page (www.ibge.gov.br returned a genuine `403 5824` on this path, twice, with UA); **A** for the library catalogue record and the release PDF.

URL (product page): `https://www.ibge.gov.br/estatisticas/sociais/trabalho/17270-pnad-continua.html`
HTTP check:
```
$ curl ... -o pnadc.html -w '%{http_code} %{size_download}\n' -L "https://www.ibge.gov.br/estatisticas/sociais/trabalho/17270-pnad-continua.html"
403 5824          # WAF block, retried after a delay -> 403 5824 again
$ curl -sS --max-time 90 -o j_pnadc.txt -w '%{http_code} %{size_download}\n' -L "https://r.jina.ai/https://www.ibge.gov.br/estatisticas/sociais/trabalho/17270-pnad-continua.html"
200 105977
```

Title (as published, in Portuguese): **Pesquisa Nacional por Amostra de Domicílios Contínua - PNAD Contínua**
Publisher: Instituto Brasileiro de Geografia e Estatística (IBGE)

Periodicity (**verbatim quote**, from IBGE's own "O que é" block):
> "**Periodicidade de divulgação das informações:**
> - Mensal - Conjunto restrito de indicadores relacionados à força de trabalho e somente para o nível geográfico de Brasil;
> - Trimestral - Conjunto de indicadores relacionados à força de trabalho para todos os níveis de divulgação da pesquisa;
> - Anual - Demais temas permanentes da pesquisa e indicadores complementares à força de trabalho; e
> - Variável - Outros temas ou tópicos dos temas permanentes a serem pesquisados com maior periodicidade ou ocasionalmente."

Verbatim, scope/purpose:
> "Visa acompanhar as flutuações trimestrais e a evolução, no curto, médio e longo prazos, da força de trabalho, e outras informações necessárias para o estudo do desenvolvimento socioeconômico do País. Para atender a tais objetivos, a pesquisa foi planejada para produzir indicadores trimestrais sobre a força de trabalho e indicadores anuais sobre temas suplementares permanentes ... Tem como unidade de investigação o domicílio."

**The specific annual release ("Rendimento de todas as fontes") — TIER A, via IBGE's library catalogue:**
URL: `https://biblioteca.ibge.gov.br/index.php/biblioteca-catalogo?view=detalhes&id=2102079`
HTTP check: `200 18795`

Verbatim catalogue record:
> "Título: **Rendimento de todas as fontes : 2023 / IBGE, Coordenação de Pesquisas por Amostra de Domicílios**
> Local: Rio de Janeiro | Editor: IBGE | Ano: 2024 | Descrição física: 15, 129 p.
> Notas: Disponível somente em meio digital.
> **Outro título: Pesquisa nacional por amostra de domicílios contínua.**"

The release PDF itself: `https://biblioteca.ibge.gov.br/visualizacao/livros/liv102079_informativo.pdf` → `200 2403812`, extracted cleanly with `pdftotext -layout`. It has a dedicated section headed *"Rendimento domiciliar per capita"*.

### 4d. The corroboration test I ran — and it came back NEGATIVE

Since no document names PNADC as TCU's source, I tried to corroborate numerically: does the rdpcn value TCU used (**R$ 1.892,75**, ref. 2023) appear in PNADC's 2023 "Rendimento de todas as fontes" release?

**It does not.** The release's own headline figure, verbatim:
> "...ainda maior (11,5%), alcançando o valor de R$ 1 848, o maior da..."
(i.e. rendimento médio mensal **real** domiciliar per capita 2023 = **R$ 1 848**)

R$ 1 848 ≠ R$ 1 892,75. The published headline is a *real* (deflated) series, whereas TCU appears to use a nominal or otherwise differently-based figure, likely a bespoke extraction supplied directly to TCU rather than a published headline. I also queried IBGE's SIDRA/`servicodados` aggregate metadata API (`https://servicodados.ibge.gov.br/api/v3/agregados?pesquisa=PD`, `200`) and found **no PNADC aggregate publishing a national mean `rendimento domiciliar per capita`** — the PNADC tables expose rdpc only as *classes/faixas*, not as a national mean level.

**Conclusion, stated plainly: I could not verify that PNAD Contínua is the source behind TCU's `rdpc` column, and the numeric evidence actively fails to match. Do not mint this edge.** The most likely real-world mechanism is a direct, unpublished data supply from IBGE to TCU — which, if true, means **there is no document node behind that column at all**, and round 1's "gap" is not a research failure but a genuine structural feature of the Brazilian FPE process. That is itself a finding worth recording.

Proposed node? **Yes, on its own merits** — `br-pnad-continua` (recurrent, titled, IBGE-authored), and optionally a child node `br-pnadc-rendimento` for the annual "Rendimento de todas as fontes" release.
Proposed EDGE(s): **NONE to `br-fpe-dn-tcu`.** Not supported by any primary text. Recording the negative.

---

## 5. SICONFI / FINBRA — **VERIFIED — strongest new edge cluster this round**

Verification tier: **A**
URL (FINBRA official STN document): `https://siconfi.tesouro.gov.br/siconfi/pages/public/arquivo/conteudo/Cartilha_do_Finbra_2023.pdf`
HTTP check:
```
$ curl -sS --max-time 40 -A "<browser UA>" -o finbra_cart.pdf -w '%{http_code} %{size_download}\n' -L "https://siconfi.tesouro.gov.br/siconfi/pages/public/arquivo/conteudo/Cartilha_do_Finbra_2023.pdf"
200 952735
```
Extracted with `pdftotext -layout` — genuine text PDF.
Companion URLs also verified reachable: `https://siconfi.tesouro.gov.br/siconfi/pages/public/conteudo/conteudo.jsf?id=20303` (`200 159215`), `https://www.gov.br/tesouronacional/pt-br/estados-e-municipios/dados-consolidados/finbra-financas-municipais` (`200 628054`), `https://siconfi.tesouro.gov.br/siconfi/index.jsf` (`200 174011`).

Title (as published, in Portuguese): **FINBRA/SICONFI — Cartilha para extração de dados**
Publisher: Secretaria do Tesouro Nacional (STN), Ministério da Fazenda — masthead names *"Secretário do Tesouro Nacional / Regério Ceron de Oliveira"*, *"Subsecretário de Contabilidade Pública / Heriberto Henrique Vilela do Nascimento"*, *"Coordenador-Geral de Normas de Contabilidade Aplicadas à Federação / Alex Fabiane Teixeira"*.
Periodicity (verbatim, re the FINBRA series itself):
> "O Finbra nasceu como uma série de volumes **publicados anualmente** pelo Tesouro Nacional, intitulada **'Finanças do Brasil – Dados Contábeis dos Municípios'**. Cada volume continha os dados consolidados da execução orçamentária de quase 5.500 municípios brasileiros, referentes ao exercício financeiro anterior."

**Yes — "Finanças do Brasil – Dados Contábeis dos Municípios" is confirmed as a titled recurring (annual) release, verbatim from STN's own text.** Note the tense: *"nasceu como"* — the paper-volume series is historical; the live form is a continuously-updated CSV consultation. Flagging the tense shift explicitly, since the brief asks for it:
> "Em 2014, com a criação do Siconfi ... o novo Finbra passou a ser disponibilizado em formato CSV, atualizado de maneira automática e online, sem a necessidade de processamentos adicionais. É uma consulta pública e que fica disponível para qualquer usuário que tenha acesso à internet."

Verbatim — **the legal-basis / dependency statement (this is the edge evidence):**
> "O Finbra é o nome do banco de dados formado pelas informações das declarações recebidas pelo Tesouro Nacional **por determinação da Lei Complementar 101/2000, a Lei de Responsabilidade Fiscal – LRF**. Tal banco de dados contém um conjunto de informações contábeis e fiscais enviadas pelos entes da Federação sobre a sua execução orçamentária e financeira."

Verbatim — **the RREO/RGF ingestion statement:**
> "Com o aumento da quantidade de relatórios recebidos no Siconfi em 2015, o Finbra foi consequentemente aprimorado para trazer, além de todos os dados da Contas Anuais, também os dados do **Relatório Resumido de Execução Orçamentária – RREO** e do **Relatório de Gestão Fiscal – RGF**."

> "Para consultar o Finbra do Siconfi ... A tela mostrará três opções de consultas de acordo com os relatórios recebidos: **Contas Anuais, RGF e RREO**."

Verbatim — RREO and RGF definitions, each naming its LRF article:
> "O Relatório Resumido de Execução Orçamentária – RREO, **conforme definido no art. 53 da LRF**, deve ser publicado bimestralmente pelo Poder Executivo ... É exigido pela Constituição Federal de 1988, em seu artigo 165, parágrafo 3º. O Siconfi passou a receber o RREO em 2015..."

> "O Relatório de Gestão Fiscal – RGF, **conforme definido no art. 55 da LRF**, deve ser publicado pelos titulares de Poderes e órgãos ao final de cada quadrimestre ou semestre..."

Verbatim — **a further node revealed (MDF):**
> "O RREO deve ser elaborado seguindo as regras contidas no **Manual de Demonstrativos Fiscais – MDF**. O MDF estabelece regras de harmonização a serem observadas, de forma permanente, pela Administração Pública para a elaboração do Anexo de Riscos Fiscais (ARF), do Anexo de Metas Fiscais (AMF), do Relatório Resumido da Execução Orçamentária (RREO) e do Relatório de Gestão Fiscal (RGF), e define orientações metodológicas, consoante os parâmetros definidos pela LRF."
> "O MDF é constantemente atualizado, e a observância da edição vigente deve ser dada seguindo o exercício financeiro..."

**SICONFI's statutory hook — verified independently at TIER A** from LC 101/2000 itself (`https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm`, `200 254717`):

art. 48, § 2º (incluído pela LC 156/2016), verbatim:
> "§ 2º A União, os Estados, o Distrito Federal e os Municípios disponibilizarão suas informações e dados contábeis, orçamentários e fiscais **conforme periodicidade, formato e sistema estabelecidos pelo órgão central de contabilidade da União**, os quais deverão ser divulgados em meio eletrônico de amplo acesso público."

art. 51, caput and § 1º, verbatim:
> "Art. 51. O Poder Executivo da União promoverá, até o dia trinta de junho, a consolidação, nacional e por esfera de governo, das contas dos entes da Federação relativas ao exercício anterior, e a sua divulgação, inclusive por meio eletrônico de acesso público."
> "§ 1º Os Estados e os Municípios encaminharão suas contas ao Poder Executivo da União até 30 de abril. (Redação dada pela Lei Complementar nº 178, de 2021)"

Proposed node? **Yes** — `br-finbra` ("Finanças do Brasil – Dados Contábeis dos Municípios" / FINBRA-SICONFI, STN, annual/continuous). Also **`br-mdf`** (Manual de Demonstrativos Fiscais, STN, recurrently reissued per exercício) as a bonus node — it is a standing instrument that defines a method, and it is the direct methodological parent of both existing nodes `br-rreo` and `br-rgf`.

Proposed EDGE(s):
- `br-finbra` -> `br-lc-101-2000`, relationship_type: **mandated_by**.
  Citation: *"O Finbra é o nome do banco de dados formado pelas informações das declarações recebidas pelo Tesouro Nacional por determinação da Lei Complementar 101/2000, a Lei de Responsabilidade Fiscal – LRF."*
- `br-finbra` -> `br-rreo`, relationship_type: **names_as_input / aggregates**.
  Citation: *"...o Finbra foi consequentemente aprimorado para trazer, além de todos os dados da Contas Anuais, também os dados do Relatório Resumido de Execução Orçamentária – RREO e do Relatório de Gestão Fiscal – RGF."*
- `br-finbra` -> `br-rgf`, relationship_type: **names_as_input / aggregates**. Same citation as above.
- `br-mdf` -> `br-lc-101-2000`, relationship_type: **mandated_by**.
  Citation: *"...define orientações metodológicas, consoante os parâmetros definidos pela LRF."*
- `br-rreo` -> `br-mdf`, relationship_type: **follows_methodology**.
  Citation (from STN's own text describing RREO's obligation): *"O RREO deve ser elaborado seguindo as regras contidas no Manual de Demonstrativos Fiscais – MDF."*
- `br-rgf` -> `br-mdf`, relationship_type: **follows_methodology**.
  Citation: *"O RGF deve ser elaborado seguindo as regras contidas no Manual de Demonstrativos Fiscais – MDF."*
- `br-rreo` -> `br-lc-101-2000`, relationship_type: **mandated_by**.
  Citation: *"O Relatório Resumido de Execução Orçamentária – RREO, conforme definido no art. 53 da LRF..."*
- `br-rgf` -> `br-lc-101-2000`, relationship_type: **mandated_by**.
  Citation: *"O Relatório de Gestão Fiscal – RGF, conforme definido no art. 55 da LRF..."*

**Caveat on the last two:** these citations come from STN's Cartilha describing RREO/RGF, not from an RREO or RGF document's own text. Strictly, the project's rule requires the *dependent* document's own text. These edges are well-supported by the system operator's own normative description, but a purist should re-source them from an actual RREO/RGF instance or from the MDF itself. Flagging rather than glossing.

**Access note:** the `gov.br/tesouronacional/pt-br/contabilidade-e-custos/siconfi` page the brief suggested returns a genuine **401** with the body *"Conteúdo Restrito É necessário autenticar para visualizar essa página."* — it is genuinely restricted, not blocked. The public route is `siconfi.tesouro.gov.br`, which works at Tier A.

---

## 6. Sistema de Contas Nacionais (SCN) & Contas Nacionais Trimestrais (CNT) — **VERIFIED — SNA 2008 edge obtained**

### 6a. SCN Anual

Verification tier: **A**
URL: `https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9052-sistema-de-contas-nacionais-brasil.html`
HTTP check:
```
$ curl -sS --max-time 35 -A "<browser UA>" -o scn_meta.html -w '%{http_code} %{size_download}\n' -L "https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9052-sistema-de-contas-nacionais-brasil.html"
200 132905
```
(Note: this `www.ibge.gov.br` path served genuine 200 bytes, unlike the PNADC path which 403'd — the WAF is path-inconsistent.)

Title (as published, in Portuguese): **Sistema de Contas Nacionais: Brasil**
Publisher: Instituto Brasileiro de Geografia e Estatística (IBGE)
Periodicity (**verbatim quote**):
> "Tipo de operação estatística: Sistema de contas nacionais | Tipo de dados: Dados agregados | **Periodicidade de divulgação: Anual**"

Verbatim — **the supranational-influence quote (this is the SNA 2008 edge evidence):**
> "As informações da série do Sistema de Contas Nacionais - referência 2010, cabe ressaltar, são apresentadas segundo uma classificação de produtos e atividades integrada com a Classificação Nacional de Atividades Econômicas - CNAE 2.0 e estão **em conformidade com o System of national accounts 2008, SNA 2008, manual preparado sob os auspícios da Organização das Nações Unidas - ONU, da Comissão Europeia - Eurostat, do Fundo Monetário Internacional - FMI, da Organização de Cooperação e Desenvolvimento Econômico - OCDE e do Banco Mundial**, o que reflete o compromisso do IBGE com a sistemática de revisões periódicas de suas práticas, conforme preconizam as recomendações internacionais."

Verbatim — **SCN names its own domestic inputs (more edges):**
> "O Sistema de Contas Nacionais Anuais - SCN, como sistema síntese, reúne informações de várias pesquisas do IBGE tais como a **Pesquisa Industrial Anual - Empresa - PIA-Empresa**, a **Pesquisa Anual da Indústria da Construção - PAIC**, a **Pesquisa Anual de Comércio - PAC** e a **Pesquisa Anual de Serviços - PAS**. Reúne ainda informações econômicas de registros fiscais e administrativos como a **Escrituração Contábil Fiscal - ECF** e dados de agências reguladoras."

Verbatim — a live methodological caveat worth recording (in-progress rebasing):
> "Observação importante: Devido ao trabalho adicional de reformulação do SCN, cujo ano de referência passará de 2010 para 2021, os resultados desta edição do estudo estão apresentados em um formato excepcional, sem comentários analíticos. ... a divulgação da série mais detalhada é suspensa temporariamente."

### 6b. Contas Nacionais Trimestrais (CNT)

Verification tier: **A**
URL: `https://www.ibge.gov.br/estatisticas/economicas/contas-nacionais/9300-contas-nacionais-trimestrais.html`
HTTP check: `200 151398`

Title: **Contas Nacionais Trimestrais** (page shows current edition *"Tabelas - 1º trimestre 2026"*)
Publisher: IBGE
Periodicity (**verbatim quote**):
> "Tipo de operação estatística: Sistema de contas nacionais | Tipo de dados: Outro tipo de dados | **Periodicidade de divulgação: Trimestral**"

Verbatim — **SNA 2008 edge:**
> "As estimativas das CNT **seguem as recomendações internacionais reunidas no mais recente manual das Nações Unidas - Sistema de Contas Nacionais (SNA 2008)**. Todas as transações definidas no SNA para a produção (transações mercantis e não mercantis) são registradas em regime de competência, exceto as receitas do governo, que são registradas em regime de caixa."

Verbatim — **CNT names SCN Anual as its own input (internal edge):**
> "Os dados trimestrais são **ajustados para os totais anuais (Sistema de Contas Nacionais Anuais - SCN)**, usando o procedimento estatístico de *benchmarking* (Denton)."

Proposed node? **Yes** — `br-scn` (Sistema de Contas Nacionais: Brasil, IBGE, anual) and `br-cnt` (Contas Nacionais Trimestrais, IBGE, trimestral).

Proposed EDGE(s):
- `br-scn` -> `sna-2008`, relationship_type: **follows_methodology / supranational_standard**.
  Citation: *"...estão em conformidade com o System of national accounts 2008, SNA 2008, manual preparado sob os auspícios da Organização das Nações Unidas - ONU, da Comissão Europeia - Eurostat, do Fundo Monetário Internacional - FMI, da Organização de Cooperação e Desenvolvimento Econômico - OCDE e do Banco Mundial..."*
- `br-cnt` -> `sna-2008`, relationship_type: **follows_methodology / supranational_standard**.
  Citation: *"As estimativas das CNT seguem as recomendações internacionais reunidas no mais recente manual das Nações Unidas - Sistema de Contas Nacionais (SNA 2008)."*
- `br-cnt` -> `br-scn`, relationship_type: **names_as_input**.
  Citation: *"Os dados trimestrais são ajustados para os totais anuais (Sistema de Contas Nacionais Anuais - SCN), usando o procedimento estatístico de benchmarking (Denton)."*
- `br-scn` -> `br-pia-empresa` / `br-paic` / `br-pac` / `br-pas` (all new, unminted), relationship_type: **names_as_input**.
  Citation: *"...reúne informações de várias pesquisas do IBGE tais como a Pesquisa Industrial Anual - Empresa - PIA-Empresa, a Pesquisa Anual da Indústria da Construção - PAIC, a Pesquisa Anual de Comércio - PAC e a Pesquisa Anual de Serviços - PAS."*

**Note on the `sna-2008` node id:** the brief said an existing corpus node `sna-2008` should be checked. I could not enumerate the corpus from this environment (no repo access — the working directory `/home/claude` is not the project repo and contains none of the referenced JSON files). **The exact id must be confirmed by the caller before these edges are written.** I am flagging this rather than assuming.

### 6c. BONUS — the FPE → GDP and FPE → IPCA edges the brief anticipated

Verification tier: **A**, from LC 62/1989 as amended by LC 143/2013 (`https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp62.htm`, `200 34151`).

art. 2º, inciso II, verbatim:
> "II - a partir de 1º de janeiro de 2016, cada entidade beneficiária receberá valor igual ao que foi distribuído no correspondente decêndio do exercício de 2015, **corrigido pela variação acumulada do Índice Nacional de Preços ao Consumidor Amplo (IPCA) ou outro que vier a substituí-lo** e pelo percentual equivalente a **75% (setenta e cinco por cento) da variação real do Produto Interno Bruto nacional** do ano anterior ao ano considerado para base de cálculo;"

art. 2º, inciso III, alínea b, verbatim:
> "b) o fator representativo do inverso da renda domiciliar *per capita* corresponderá à participação relativa do inverso da renda domiciliar *per capita* da entidade beneficiária na soma dos inversos da renda domiciliar *per capita* de todas as entidades."

Proposed EDGE(s):
- `br-lc-62-1989` -> `br-ipca`, relationship_type: **uses_index**.
  Citation: *"...corrigido pela variação acumulada do Índice Nacional de Preços ao Consumidor Amplo (IPCA) ou outro que vier a substituí-lo..."*
- `br-lc-62-1989` -> **national GDP** (i.e. `br-scn` / `br-cnt`), relationship_type: **uses_indicator — WEAK, FLAGGED**.
  Citation: *"...e pelo percentual equivalente a 75% (setenta e cinco por cento) da variação real do Produto Interno Bruto nacional do ano anterior..."*
  **Caveat, stated honestly:** LC 62 names the *concept* "Produto Interno Bruto nacional" but names **neither IBGE nor any titled release** as its producer. This is the same structural gap as the `rdpc` column in item 4. It is an indicator reference, not a documented document-to-document dependency. **I recommend recording it as a flagged/weak edge or as a note, not as a firm edge.** Do not upgrade it on the basis that "everyone knows IBGE produces the PIB" — that is precisely the inference the evidence standard forbids.

---

## 7. Salário mínimo — **VERIFIED — gives a clean, live INPC edge**

### 7a. Lei nº 14.663, de 28 de agosto de 2023 (the valorisation policy)

Verification tier: **A**
URL: `https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14663.htm`
HTTP check:
```
$ curl -sS --max-time 35 -A "<browser UA>" -o l14663.html -w '%{http_code} %{size_download}\n' -L "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14663.htm"
200 36354
```

Title: **Lei nº 14.663, de 28 de agosto de 2023**
Publisher: Presidência da República / Planalto
Periodicity: n/a — standing statute defining a method.

Verbatim, art. 1º:
> "Art. 1º Esta Lei define o valor do salário mínimo a partir de 1º de maio de 2023, estabelece a política de valorização permanente do salário mínimo a vigorar a partir de 1º de janeiro de 2024, e altera os valores da tabela mensal do Imposto sobre a Renda da Pessoa Física (IRPF)..."

Verbatim, art. 3º caput:
> "Art. 3º Ficam estabelecidas as diretrizes para a política de valorização do salário mínimo a vigorar a partir de 2024, inclusive, a serem aplicadas em 1º de janeiro do respectivo ano, considerado que o valor decorrerá da soma do índice de medida da inflação do ano anterior, para a preservação do poder aquisitivo, com o índice correspondente ao crescimento real do Produto Interno Bruto (PIB) de 2 (dois) anos anteriores, para fins de aumento real, conforme apuração nos termos deste artigo."

Verbatim, art. 3º **§ 1º — the INPC edge:**
> "§ 1º Os reajustes para a preservação do poder aquisitivo do salário mínimo corresponderão à variação do **Índice Nacional de Preços ao Consumidor (INPC), calculado e divulgado pela Fundação Instituto Brasileiro de Geografia e Estatística (IBGE)**, acumulada nos 12 (doze) meses encerrados em novembro do exercício anterior ao do reajuste."

Verbatim, art. 3º **§ 4º — the GDP edge, and note it DOES name IBGE (unlike LC 62):**
> "§ 4º Para fins de aumento real, será aplicado, a partir de 2024, o percentual equivalente à taxa de crescimento real do **PIB do segundo ano anterior ao da fixação do valor do salário mínimo, apurada pelo IBGE** até o último dia útil do ano e divulgada no ano anterior ao de aplicação do aumento real."

Verbatim, art. 3º §§ 2º–3º and 5º (fallback rules — useful for method fidelity):
> "§ 2º Na hipótese de não divulgação do INPC referente a um ou mais meses compreendidos no período do cálculo até o último dia útil imediatamente anterior à vigência do reajuste, o Poder Executivo federal estimará os índices dos meses não disponíveis."
> "§ 3º Verificada a hipótese de que trata o § 2º deste artigo, os índices estimados permanecerão válidos para os fins do disposto nesta Lei, sem qualquer revisão, e os eventuais resíduos serão compensados no reajuste subsequente, sem retroatividade."
> "§ 5º Em caso de taxa de crescimento real negativa do PIB, o salário mínimo será reajustado apena[s]..." *(truncated in extraction)*

### 7b. Decreto nº 12.797, de 23 de dezembro de 2025 (the annual recurring instrument)

Verification tier: **A**
URL: `https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12797.htm`
HTTP check: `200 10327`

Title: **DECRETO Nº 12.797, DE 23 DE DEZEMBRO DE 2025** — ementa: *"Dispõe sobre o valor do salário mínimo a vigorar a partir de 1º de janeiro de 2026."*
Publisher: Presidência da República
Periodicity: **Annual** — one decree per year fixing the following year's minimum wage. (Again: series-level periodicity, not stated verbatim inside the instrument. Flagged.)

Verbatim, preamble (**edge evidence**):
> "O PRESIDENTE DA REPÚBLICA, no uso da atribuição que lhe confere o art. 84, *caput*, inciso IV, da Constituição, e **tendo em vista o disposto na Lei nº 14.663, de 28 de agosto de 2023**, e na Lei nº 15.077, de 27 de dezembro de 2024, DECRETA:"

Verbatim, art. 1º:
> "Art. 1º A partir de 1º de janeiro de 2026, o valor do salário mínimo será de R$ 1.621,00 (mil seiscentos e vinte e um reais)."
> "Parágrafo único. Em decorrência do disposto no *caput*, o valor diário do salário mínimo corresponderá a R$ 54,04 (cinquenta e quatro reais e quatro centavos) e o valor horário, a R$ 7,37 (sete reais e trinta e sete centavos)."

Publication note, verbatim: *"Este texto não substitui o publicado no DOU de 24.12.2025."*

**Cross-check that closes the loop:** the R$ 1.621,00 figure in this Decreto is the same figure that appears verbatim in art. 2º of Portaria Interministerial MPS/MF nº 13/2026 (item 1b) — *"não poderão ser inferiores a R$ 1.621,00 (mil seiscentos e vinte e um reais)"* — independently confirming the Decreto→Portaria dependency from two separate documents.

Proposed node? **Yes** — `br-lei-14663` (standing statute) and `br-decreto-salario-minimo` (annual recurring decree).

Proposed EDGE(s):
- `br-lei-14663` -> `br-inpc`, relationship_type: **uses_index**. **This is a strong, live, unambiguous INPC edge.**
  Citation: *"Os reajustes para a preservação do poder aquisitivo do salário mínimo corresponderão à variação do Índice Nacional de Preços ao Consumidor (INPC), calculado e divulgado pela Fundação Instituto Brasileiro de Geografia e Estatística (IBGE), acumulada nos 12 (doze) meses encerrados em novembro do exercício anterior ao do reajuste."*
- `br-lei-14663` -> `br-scn` (IBGE PIB), relationship_type: **uses_indicator — MEDIUM confidence**.
  Citation: *"...o percentual equivalente à taxa de crescimento real do PIB do segundo ano anterior ao da fixação do valor do salário mínimo, apurada pelo IBGE..."*
  Stronger than the LC 62 GDP edge because **IBGE is named**; still weaker than ideal because no *titled release* is named. Recommend recording as agency-level, medium confidence.
- `br-decreto-salario-minimo` -> `br-lei-14663`, relationship_type: **mandated_by**.
  Citation: *"...tendo em vista o disposto na Lei nº 14.663, de 28 de agosto de 2023..."*

---

## 8. IGP-M/FGV, Relatório Mensal da Dívida / RTN, Boletim Focus — **NOT ATTEMPTED / PARTIAL**

- **Boletim Focus (BCB):** `https://www.bcb.gov.br/publicacoes/focus` returns `200 2871` — a small body, consistent with a JS-rendered shell rather than a WAF block. **Not investigated further; no claims made.** BCB is reachable at Tier A for PDF normativos, so this is a tractable lead for a future round.
- **IGP-M/FGV** and **Relatório Mensal da Dívida / RTN:** not attempted. Research budget was consumed by items 1–7, which were higher-priority per the brief's own ranking. **No claims made.**

---

# SUMMARY TABLE OF PROPOSED EDGES

| Source | Target | Type | Confidence | Evidence quality |
|---|---|---|---|---|
| `br-lei-8213` | `br-inpc` | uses_index | **HIGH** | Statute names INPC + IBGE verbatim, Tier A |
| `br-lei-14663` | `br-inpc` | uses_index | **HIGH** | Statute names INPC + IBGE verbatim, Tier A |
| `br-finbra` | `br-lc-101-2000` | mandated_by | **HIGH** | STN's own text, Tier A |
| `br-finbra` | `br-rreo` | names_as_input | **HIGH** | STN's own text, Tier A |
| `br-finbra` | `br-rgf` | names_as_input | **HIGH** | STN's own text, Tier A |
| `br-scn` | `sna-2008` | follows_methodology | **HIGH** | IBGE's own text, Tier A |
| `br-cnt` | `sna-2008` | follows_methodology | **HIGH** | IBGE's own text, Tier A |
| `br-cnt` | `br-scn` | names_as_input | **HIGH** | IBGE's own text, Tier A |
| `br-lc-62-1989` | `br-ipca` | uses_index | **HIGH** | Statute names IPCA verbatim, Tier A |
| `br-portaria-reajuste-inss` | `br-lei-8213` | mandated_by | **HIGH** | DOU preamble verbatim, Tier A |
| `br-portaria-reajuste-inss` | `br-lei-14663` | mandated_by | **HIGH** | DOU preamble verbatim, Tier A |
| `br-portaria-reajuste-inss` | `br-decreto-salario-minimo` | names_as_input | **HIGH** | DOU preamble verbatim, Tier A |
| `br-decreto-salario-minimo` | `br-lei-14663` | mandated_by | **HIGH** | Decree preamble verbatim, Tier A |
| `br-rreo` / `br-rgf` | `br-mdf` | follows_methodology | **MEDIUM** | Sourced from STN Cartilha, not from RREO/RGF's own text |
| `br-scn` | `br-pia-empresa`/`br-paic`/`br-pac`/`br-pas` | names_as_input | **MEDIUM** | IBGE names surveys; targets unminted |
| `br-lei-14663` | `br-scn` (PIB) | uses_indicator | **MEDIUM** | IBGE named, no titled release |
| `br-lc-62-1989` | GDP | uses_indicator | **WEAK — flag** | Concept only; no agency, no release named |
| `br-resolucao-cmn-2615` | `br-ipca` | uses_index | **HISTORICAL — revoked 2014** | Verbatim, but past-tense/dead |
| `br-fpe-dn-tcu` | `br-pnad-continua` | — | **REJECTED** | No document names it; numbers do not match |

# PROPOSED NEW NODES

`br-lei-8213`, `br-portaria-reajuste-inss`, `br-lei-14663`, `br-decreto-salario-minimo`, `br-finbra`, `br-mdf`, `br-scn`, `br-cnt`, `br-pnad-continua` (+ optional `br-pnadc-rendimento`), `br-resolucao-cmn-2615` (historical/revoked), `br-resolucao-cmn-4367` (optional, revoking instrument).
Deferred/unminted but named in evidence: `br-pia-empresa`, `br-paic`, `br-pac`, `br-pas`.

# EXPLICIT NEGATIVES (do not let these get quietly filled in later)

1. **Portaria Interministerial MPS/MF nº 13/2026 does NOT name INPC.** 0 occurrences. The INPC naming is one hop upstream in Lei 8.213 art. 41-A.
2. **TCU's FPE Decisão Normativa does NOT name PNAD Contínua**, or any titled release, for the `rdpc` column — only *"fornecida pelo IBGE"*.
3. **LC 62/1989 § 3º does not even name IBGE** for rdpc — only *"entidade federal competente"*.
4. **PNADC's published 2023 rdpc headline (R$ 1 848) does not match TCU's rdpcn (R$ 1.892,75).** The numeric corroboration test failed.
5. **Resolução CMN 2.615/1999 is revoked** (by Res. 4.367/2014) and its parent Decreto 3.088/1999 is revoked. Past-tense, not a live dependency.
6. **STF is completely unreachable** from this environment — all hosts `000`, jina proxy `403`. Nothing about ADI 875's text, date, or any congressional deadline was verified, and nothing is asserted.
7. **FGTS/INPC hypothesis appears false**, not merely unverified.
