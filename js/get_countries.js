const data = null, xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        const data = JSON.parse(this.responseText);
        let formulaire_code = "";
        data.forEach(post => {
            formulaire_code += `<option class="all_options" value="${post.name}">${post.name}</option>`;
        })
        document.getElementById("choix_pays").innerHTML = formulaire_code;
    }
});

xhr.open("GET", "https://covid-19-data.p.rapidapi.com/help/countries");
xhr.setRequestHeader("x-rapidapi-key", "29300cd29emsh7c67153e0b24c73p14f1b8jsn494dc27a69f0");
xhr.setRequestHeader("x-rapidapi-host", "covid-19-data.p.rapidapi.com");

xhr.send(data);
