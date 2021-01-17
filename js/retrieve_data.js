function afficher() {
    let pays = document.querySelector("#choix_pays").value;

    let data = null;

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {

        if (this.readyState === this.DONE) {
            let obj = JSON.parse(xhr.responseText)[0];
            let codePays = obj["code"];

            obj["Pays"] = obj["country"];
            obj["Code pays"] = obj["code"];
            obj["Cas confirmés"] = obj["confirmed"];
            obj["Cas remis"] = obj["recovered"];
            obj["Cas en état critique"] = obj["critical"];
            obj["Morts"] = obj["deaths"];
            obj["Dernière modification"] = (new Date(obj["lastChange"])).toLocaleString();
            obj["Derniere actualisation"] = (new Date(obj["lastUpdate"])).toLocaleString();

            delete obj.confirmed;
            delete obj.country;
            delete obj.code;
            delete obj.recovered;
            delete obj.critical;
            delete obj.deaths;
            delete obj.lastChange;
            delete obj.lastUpdate;
            delete obj.latitude;
            delete obj.longitude;


            let message = "";

            for (const [key, value] of Object.entries(obj)) {
                message += (`${key}: ${value}` + "<br>");
            }

            console.log(codePays);
            let cheminDrapeau = `../resources/flags/${codePays.toLowerCase()}.png`;
            let baliseDrapeau = `<img src="${cheminDrapeau}" alt="DRAPEAU" width="50" height="60">`;

            let output = baliseDrapeau + "<br>" + message;

            document.getElementById("data").innerHTML = output;
            return output;
        }
    });


    xhr.open(
        "GET",
        "https://covid-19-data.p.rapidapi.com/country?format=json&name=" + pays
    );

    xhr.setRequestHeader("x-rapidapi-host", "covid-19-data.p.rapidapi.com");

    xhr.setRequestHeader(
        "x-rapidapi-key",
        "d30bfcc9d9msh9017ddb0dc94de0p16a542jsn57f2be62f2fc"
    );

    xhr.send(data);

    document.getElementById("data").style.display = "block";

}

