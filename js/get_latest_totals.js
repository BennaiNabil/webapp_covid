const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        const data = JSON.parse(xhr.responseText)[0];
        let text_data = "";
        data["Cas confirmés"] = data["confirmed"].toLocaleString();
        data["Cas remis"] = data["recovered"].toLocaleString();
        data["Cas en état critique"] = data["critical"].toLocaleString();
        data["Morts"] = data["deaths"].toLocaleString();
        data["Dernière modification"] = (new Date(data["lastChange"])).toLocaleString();
        data["Derniere actualisation"] = (new Date(data["lastUpdate"])).toLocaleString();

        delete data.confirmed;
        delete data.recovered;
        delete data.critical;
        delete data.deaths;
        delete data.lastChange;
        delete data.lastUpdate;
        for (const [key, value] of Object.entries(data)) {
            text_data += (`${key}: ${value}\n`);
        }
        document.getElementById("latest-totals").innerText = text_data;
        document.getElementById("latest-totals").classList.add("modif_carte");

    }
});

xhr.open("GET", "https://covid-19-data.p.rapidapi.com/totals?format=json");
xhr.setRequestHeader("x-rapidapi-key", "d30bfcc9d9msh9017ddb0dc94de0p16a542jsn57f2be62f2fc");
xhr.setRequestHeader("x-rapidapi-host", "covid-19-data.p.rapidapi.com");

xhr.send(data);

