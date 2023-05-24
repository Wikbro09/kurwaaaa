# Korleis gjere ein nettside om til ein docker-container

1. Vær sikker at du har følgande ting på PC-en din:
    1. Docker hub
    2. Windows Subsystem for Linux
    3. Visual studio code, med Docker extention installert
2. Lage nettsida di
3. I same directory som du har index.html fila di, plasser ei fil som heiter dockerfile, utan nokken file-extentions
4. Lag to linjer i dockerfile:
    1. FROM nginx:versjon, denne linja velger eit image for å kjøre konteineren i, i ditta tilfellet blir det nginx, ein lokalserver. Du må ikkje ha det installert, sidan det vil bli installert for deg seinare.
    2. COPY . /usr/share/nginx/html, denne linja velger kva conteinaren skal inneholde. Om du skriv denne linja, vil det bruke det du har i samme directory. Sidan vi har nettida si kode i samme mappe som dockerfile, vil nettsida bli brukt.
5. Lagre dockerfile
6. I Visual Studio Code, høgreklikk dockerfile, og velg 'Build Image', så gi det eit namn. Dette vil laste ned nødvendige element, og sende imaget til Docker Hub.
7. I Docker Hub, vel 'Images', eit av knappane til venstre.
8. Under namnet til imaget du lagde finner du ID-en til imaget. Kopier det.
9. Kjør PowerShell som administrator.
10. Kjør denne kommandoen: docker run -d -t -p PORT --name NAMN ID
    - PORT er valfritt, men det er vanleg å velge porten 80:80
    - NAMN vil være namnet til konteineren du lager
    - ID er det du kopierte frå Docker Hub - Images
    - *Ved å kjøre denne kommandoen, vil ein ny konteiner oppstå i Docker Hub, og den vil automatisk starte*
11. For å opne den nye kontaineren, gå inn på 'Containers' i Docker Hub, og trykk på porten til kontaineren, dersom den er på vil du bli sendt til nettsida di.