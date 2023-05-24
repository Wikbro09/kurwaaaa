// Globale variablar
var linjer = [], felt = [];
var csv, csvTimer = [];
var datoListe = [], ukedagar = [0, 0, 0, 0, 0, 0, 0], ukedagar2 = ['Søndagar', 'Mandagar', 'Tirsdagar', 'Onsdagar', 'Torsdagar', 'Fredagar', 'Laurdagar'], ukedagTimar = [0, 0, 0, 0, 0, 0, 0];
var inntektUkedagar = [];
var chart1 = null, chart2 = null, diagram11 = null, diagram12 = null;

// Onload
window.onload = startTing;
function startTing() {
    gel("getFile").onclick = getFile;
}

// Hjelpefunksjonar
function gel(id){
	return document.getElementById(id);
}
function cLog(log){
    return console.log(log);
}
function lastInn(fil) {
    return fetch(fil).then((response) => response.text() );
}

// Kode som gjer ting
async function getFile() {
    var fileName = gel("filename").value;
    cLog(fileName)
    var temp = [];
    temp = fileName.split("\\");
    csv = await lastInn("./data/"+temp[2]);
    ukedagar = [0, 0, 0, 0, 0, 0, 0];
    ukedagTimar = [0, 0, 0, 0, 0, 0, 0]
    inntektUkedagar = [];
    datoListe = [];
    csvTimer = [];
    adjustFile();
}
function adjustFile() {
    var dayNum
    linjer = csv.split("\n")
    // Denne loopen gjer masse ting
    for (i=2; i < linjer.length; i++)
    {
        felt = linjer[i].split(";");
        var temp = parseFloat(felt[2]);
        csvTimer.push(temp);
        dayNum = new Date(felt[0]).getDay();
        ukedagar[dayNum]++;
        ukedagTimar[dayNum] = ukedagTimar[dayNum] + csvTimer[i-2];
    }
    // Denne loopen lager info for inntekt
    for (i=0;i<ukedagTimar.length;i++)
    {
        if (i==0 || i==5 || i==6)
        {
            var temp = ukedagTimar[i] * 220;
            inntektUkedagar.push(temp)
        }
        else
        {
            var temp = ukedagTimar[i] * 145;
            inntektUkedagar.push(temp)
        }
    }
    //cLog(csvTimer)
    displayTable();
    displayDiagrams();
}
function displayTable() {
    cLog("Preparing table");
    gel("tabell1").innerHTML = "<tr><th>Ukedag</th>\n<th>Inntekter</th>\n<th>Timer</th></tr>";
    for (i=0;i<ukedagar.length;i++)
    {
        gel("tabell1").innerHTML += "<tr><td>"+ukedagar2[i]+"</td>\n<td>"+inntektUkedagar[i]+" Kr</td>\n<td>"+ukedagTimar[i]+"</td></tr>";
    }
}
function displayDiagrams() {
    cLog("Preparing diagrams");
    if (diagram11 != null)
    {
        diagram11.destroy();
        diagram12.destroy();
    }
    chart1 = gel('diagramm1').getContext('2d');
    diagram11 = new Chart(chart1, {    
        type: 'bar',
        data: {
            labels: ['Søndagar', 'Mandagar', 'Tirsdagar', 'Onsdagar', 'Torsdagar', 'Fredagar', 'Laurdagar'],
            datasets: [{
                label: 'Kr tjent denne ukedagen',
                data: [inntektUkedagar[0], inntektUkedagar[1], inntektUkedagar[2], inntektUkedagar[3], inntektUkedagar[4], inntektUkedagar[5], inntektUkedagar[6]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Inntekt per ukedag denne månaden"
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    chart2 = gel('diagramm2').getContext('2d');
    diagram12 = new Chart(chart2, {    
        type: 'bar',
        data: {
            labels: ['Søndagar', 'Mandagar', 'Tirsdagar', 'Onsdagar', 'Torsdagar', 'Fredagar', 'Laurdagar'],
            datasets: [{
                label: 'Timer utleid denne ukedagen',
                data: [ukedagTimar[0], ukedagTimar[1], ukedagTimar[2], ukedagTimar[3], ukedagTimar[4], ukedagTimar[5], ukedagTimar[6]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Timer utleid kvar ukedag denne månaden"
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}