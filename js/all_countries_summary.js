function creerTable(tabObjets) {
    let indice;
    let codeHTMLTable = '<table class="table table-dark">';
    codeHTMLTable += '<tr>';
    for (indice in tabObjets[0]) {
        codeHTMLTable += '<th scope="col">' + indice + '</th>';
    }
    codeHTMLTable += '</tr>';
    codeHTMLTable += '<tbody>';
    for (let i = 0; i < tabObjets.length; i++) {
        codeHTMLTable += (i % 2 === 0) ? '<tr class="alt">' : '<tr>';
        for (indice in tabObjets[i]) {
            codeHTMLTable += `<td>${tabObjets[i][indice]}</td>`;
        }
        codeHTMLTable += '</tr>';
    }
    codeHTMLTable += '</tbody>'
    codeHTMLTable += '</table>';
    return codeHTMLTable;
}

let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        const reponse = JSON.parse(this.responseText);
        const dataPays = reponse["Countries"];
        dataPays.forEach(
            function (ligne) {
                ligne["Cas confirmés"] = ligne["TotalConfirmed"].toLocaleString();
                ligne["Total morts"] = ligne["TotalDeaths"].toLocaleString();

                delete ligne["ID"];
                delete ligne["CountryCode"];
                delete ligne["Slug"];
                delete ligne["NewDeaths"];
                delete ligne["NewRecovered"];
                delete ligne["Premium"];
                delete ligne["Date"];
                delete ligne["TotalRecovered"];
                delete ligne["TotalConfirmed"];
                delete ligne["TotalDeaths"];
                delete ligne["NewConfirmed"];
            }
        )
        document.getElementById("data").innerHTML = creerTable(dataPays);
    }
});

xhr.open("GET", "https://api.covid19api.com/summary");

xhr.send();