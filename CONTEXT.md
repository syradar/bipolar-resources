# Bipolar Resources

En fristående resursbank som samlar externa stöd- och informationskällor om bipolär sjukdom för personer med diagnosen och deras närstående. Kontexten handlar om hur resurser beskrivs, grupperas och presenteras på ett neutralt och tillgängligt sätt.

## Language

**Resource**:
Den grundläggande innehållsenheten i sajten: en extern källa, plats eller referens med beskrivande metadata. En resurs kan ha en URL, men är inte per definition en länk.
_Avoid_: Article, post, link

**Resource Format**:
Det kontrollerade medieslag eller åtkomstsätt en resurs har, till exempel webbplats, bok, video, podd eller plats.
_Avoid_: Type, medium

**Website Resource**:
En resurs som primärt nås via en URL. Saknat format i äldre innehåll tolkas som webbplats under migrationen.
_Avoid_: Link-only resource

**Resource Creator**:
En eller flera personer eller organisationer som är krediterade skapare av resursen, till exempel författare, föreläsare, programledare eller producent. Fältet bör vara flertal även när bara en skapare anges.
_Avoid_: Author

**Resource Source**:
Den valfria organisation, plattform, webbplats eller utgivare där resursen kommer från eller publiceras.
_Avoid_: Creator, author

**Linked Resource Title**:
En resurstitel som leder till en extern URL och därför ska ha tydlig länkmarkering.
_Avoid_: Clickable card

**Unlinked Resource Title**:
En resurstitel utan extern URL. Den ska ha samma typografiska vikt som en länkad titel men sakna länkmarkering.
_Avoid_: Disabled link

**Video Resource**:
En resurs i föreläsnings-, webinar-, samtals- eller presentationsformat. Den behöver inte vara del av en serie.
_Avoid_: Podcast episode

**Podcast Resource**:
En resurs i poddformat, oavsett om distributionen är ljud eller video. Det viktiga är att den hör till ett återkommande podd-/programformat.
_Avoid_: Talk, webinar

**Audience**:
Den primära målgrupp en resurs är avsedd för.
_Avoid_: User type, segment

**Person With Bipolar Disorder**:
En målgruppsmarkering för resurser som i första hand riktar sig till personer som själva lever med diagnosen.
_Avoid_: Patient

**Relative**:
En målgruppsmarkering för resurser som i första hand riktar sig till anhöriga eller andra närstående.
_Avoid_: Caregiver, supporter

**Shared Audience**:
En målgruppsmarkering för resurser som är relevanta både för personer med diagnosen och för relativa/närstående.
_Avoid_: Everyone, general

**Category**:
Det kontrollerade tema en resurs tillhör i den fasta V1-taxonomin.
_Avoid_: Topic, section

**Audience Value**:
Ett kontrollerat metadatavärde som anger om en resurs riktar sig till personer med egen diagnos, anhöriga eller båda.
_Avoid_: Segment label

**Locale**:
Ett språkligt innehållsspår för sajten, med egna översättningar, URL:er och framtida innehållsmängder.
_Avoid_: Language setting, translation mode

**Swedish Locale**:
Den primära lokalen i V1 och den som får egna prefixade URL:er under `/sv/`.
_Avoid_: Default language

**Search Index**:
En statiskt genererad söksnapshot byggd vid build-tillfället från resursinnehåll och laddad på klientsidan bara för resurssök.
_Avoid_: Live search service, crawler index

## V1 Taxonomy

**Krisstöd**:
Resurser för akuta eller tydligt pressade situationer där snabb vägledning eller kontaktväg är viktig.
_Avoid_: Emergency category

**Vård Och Rättigheter**:
Resurser om vårdkontakter, behandling, patientroller och relaterade rättigheter.
_Avoid_: System info

**Om Bipolaritet**:
Resurser som förklarar bipolär sjukdom, symtom, diagnos och grundläggande begrepp.
_Avoid_: Education bucket

**Vardag Och Återhämtning**:
Resurser om rutiner, egenvård, stabilitet och vardagsliv över tid.
_Avoid_: Lifestyle

**Relationer Och Anhörigskap**:
Resurser om närståenderoller, relationer och stöd i det mellanmänskliga sammanhanget.
_Avoid_: Family category

**Föreningar Och Gemenskap**:
Resurser som samlar föreningar, mötesplatser och andra sammanhang för gemenskap eller organiserat stöd.
_Avoid_: Community links
