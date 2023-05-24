# ***Arbeidsplan*** for utvikling av nettsida

1. Lage ei .html, .css og .js fil, så kople dem saman
2. Legge inn typisk informasjon om kva nettsida er på toppen av sida
3. Lage ein input med type="file" for å velje kva fil skal bli presentert
4. Lage to canvas-element for diagrammer frå chart.js-biblioteket, og ei tabell
5. Dekorere nettsida med CSS
6. I JS fila, kople saman input-elementet med ei funksjon som laster inn csv-filer frå data-mappa, og resetter globale variablar slik at fleire filer kan bli presentert utan å restarte nettsida.
7. Legge til ein funksjon som bearbeidar og gjer klar informasjon frå fila som blir lasta opp, som skal skjøre rett etter funksjonen som lastar inn fila.
    1. Først, dele opp csv-fila i linjer
    2. Så, lage ein for-løkke som kjører så mange gongar som det var linjer i csv-fila, minus 2.
        1. I løkka: Dele kvar linje opp i felt
        2. Konvertere feltet som sier kvor mange timar ein tur tok til flyttal, og pushe det tallet til ein array
        3. Gjere feltet som sier kva dato ein tur skjedde om til eit Date-objekt
        4. Bruke .getDay() til å finne datoen til Date-objektet, og bruke nummeret eg får til å pushe antal timar til korrekt felt i ein array
    3. Lage ein for-løkke som går gjennom kvar ukedag, og gongar alle timane i langhelg-dagane med 220, og resten av dagane med 145, og pushar det til ein anna array for ein av tabellane. 
8. Lage 2 funksjonar som kjører rett etter den forrige, og lager diagrammar og ein tabell
    - For å lage ein tabell
        1. Lage / resette verdien til ein tabell sine overskrifter
        2. Lage ein loop som lagar innhold for kvar linje, der kvar linje representerar ein ukedag
    - For å lage diagramma
        1. Lage ein if-setning som sjekkar om diagramma finnst, og vil slette dem dersom dei finnst. Det gjer eg for å gjere det mogleg å gjenbruke canvas-elementa i HTML-fila
        2. Lage diagramma ved å bruke chart.js biblioteket, og vise informasjon frå arrayane brukt i steg 7.3