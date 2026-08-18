**G.04.md -- Handover Note for next agent** *(Session closed
2026-08-02)*

Markdown

**\# G.04 -- EU Galaxy Research Status & Handover**

**\*\*Date:\*\*** 2026-08-02

**\*\*Governing brief:\*\*** Research.2.md Version 2.0 (fixed)

**\*\*Project:\*\*** EU galaxy -- Research.EU.md Version 0.1

**\-\--**

**\## 1. Updated Stop Condition (active)**

\- No second Member-State NSI

\- No municipal layer

*\*("No full ECB galaxy" has been removed as of this handover.)\**

**\-\--**

**\## 2. Presentation Rules (mandatory for every extraction)**

Every substantive extraction must return **\*\*exactly one JSON
object\*\*** in this structure:

\`\`\`json

{

\"meta\": {

\"project\": \"EU galaxy -- Research.EU.md Version 0.1\",

\"governing_brief\": \"Research.2.md Version 2.0 (fixed 2026-08-02)\",

\"session_window\": \"YYYY-MM-DD\",

\"stop_condition_observed\": true,

\"scope_completed_this_batch\": \[\"\...\"\],

\"source_urls\": \[\"\...\"\],

\"notes\": \"\...\"

},

\"part_a_records\": \[

{

\"id\": \"unique-id\",

\"url\": \"\...\",

\"location\": \"precise location\",

\"quote\": \"verbatim quote only\",

\"names\": \[\"named documents / bodies / series\"\],

\"tense\": \"PRESENT \| PAST \| FUTURE \| MIXED\",

\"notes\": \"factual flags only (e.g. non-dependency language)\"

}

\]

}

-   One provision per entry.

-   Verbatim quotes with precise locations only.

-   Do **not** produce Part B JSON unless every claim is already proven
    by a Part A quote.

-   Do not summarise. Do not adjudicate. Do not invent nodes or edges.

-   AGENCY ONLY and NOT FOUND are valid results.

-   Flag "comparable with / consistent with / harmonised with" language
    as non-dependencies.

**3. Work Completed in this Session (high-level)**

Major EU-level architecture extracted:

-   ESA 2010 (key articles, Annex A classification rules, 50 %
    threshold, accrual basis + exceptions, NACE, CPA)

-   Council Regulation 479/2009 (EDP)

-   Manual on Government Deficit and Debt -- 2022 edition (MGDD)

-   Regulation (EC) No 223/2009 (full key articles including Art. 5a,
    ESS Committee, quality obligations, European statistical programme
    framework)

-   European Statistics Code of Practice 2017 (document-level + all 16
    principles with official short definitions)

-   ESS Quality Assurance Framework (QAF 2019)

-   ESS Quality and Performance Indicators (2014) + SIMS / quality
    reporting tools

-   European Statistical Programme legal framework (Arts. 13--14 of Reg.
    223/2009) and its current embedding in the Single Market Programme
    (Reg. 2021/690)

-   Eurostat data portal / dissemination layer (Data Browser, bulk
    download, access methods)

All delivered as Part A JSON objects.

**4. Recommended Next Targets (priority order)**

1.  **Third-round ESS Peer Reviews** (Commission Staff Working
    Document + individual final reports) -- primary compliance mechanism
    for the Code of Practice.

2.  **Commission Recommendation 2023/397** on reference metadata and
    quality reports for the European Statistical System.

3.  **ESGAB annual reports** (European Statistical Governance Advisory
    Board) -- independent monitoring of the Code of Practice.

4.  Current annual statistical work programmes under the Single Market
    Programme (if further programming detail is required).

5.  ESAC (European Statistical Advisory Committee) opinions -- if
    user/needs side becomes relevant.

**5. Rolling List of Edge Cases**

*(This list must be carried forward and appended to every subsequent
G.*.md)\*

  --------------------------------------------------------------------------------------
  **\#**   **Edge Case**     **Observation**                                **First
                                                                            noted**
  -------- ----------------- ---------------------------------------------- ------------
  1        Cash vs Accrual   ESA 2010 is accrual by default. Cash appears   2026-08-02
                             only as source data that must be               
                             time-adjusted, or as a limited explicit        
                             relaxation for certain government flows        
                             (especially taxes).                            

  2        "Consistent with  Repeatedly appears in classification and       2026-08-02
           / harmonised with methodological texts. Always flag as           
           / comparable      **non-dependency**.                            
           with"                                                            

  3        European          Pure standalone multiannual programme (last    2026-08-02
           Statistical       2013--2020) was repealed. Current programming  
           Programme         and financing sit inside the Single Market     
                             Programme (Reg. 2021/690) + annual work        
                             programmes.                                    

  4        CPA--NACE         Structural (one-to-one by design). Official    2026-08-02
           relationship      CPA correspondence tables page currently lists 
                             only version-to-version and CPA--CN tables --- 
                             no dedicated CPA--NACE table.                  

  5        Quality reports   Legal basis in Art. 12 of Reg. 223/2009.       2026-08-02
                             Detailed modalities, structure and periodicity 
                             are set by implementing acts under sectoral    
                             legislation.                                   

  6        Article 5a (Reg.  Inserted by Regulation (EU) 2015/759. Creates  2026-08-02
           223/2009)         explicit professional independence powers and  
                             duties for heads of NSIs.                      

  7        Stop condition    "No full ECB galaxy" restriction removed as of 2026-08-02
           change            G.04 (2026-08-02).                             
  --------------------------------------------------------------------------------------

**6. Part B -- Provisional Dependency Notes (for next agent)**

**Important:** These are **not** adjudicated edges. They are provisional
observations of language that may later support edges once more Part A
material is collected. Treat as research pointers only.

-   Regulation 223/2009 Art. 11 → Code of Practice (explicit further
    elaboration of statistical principles)

-   Regulation 223/2009 Art. 12 → quality reports (Member States shall
    provide; Commission shall publish)

-   Regulation 223/2009 Art. 13 → European statistical programme
    (framework document)

-   Code of Practice → ESS Quality Assurance Framework (QAF described as
    complementary guidance)

-   ESS Quality and Performance Indicators (2014) → incorporated into
    SIMS

-   ESA 2010 → MGDD (MGDD complements / interprets ESA 2010 rules for
    deficit and debt)

-   Regulation 479/2009 → EDP Notification Tables and inventories

-   ESA 2010 50 % criterion → sector classification of public producers
    (market vs non-market)

Next agent should continue collecting Part A only. Part B remains
provisional until the user requests formal edge construction.

**7. Instruction to Next Agent**

1.  Observe the updated stop condition.

2.  Begin with the highest remaining priority (third-round ESS Peer
    Reviews) unless directed otherwise.

3.  Deliver every extraction as a single Part A JSON.

4.  Carry this entire G.04 structure forward, updating the rolling
    edge-case list and recommended targets as new material appears.

5.  Keep Part B provisional and clearly separated.

End of G.04.
