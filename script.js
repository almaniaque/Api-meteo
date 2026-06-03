
let main = document.querySelector("main");
let imediat = document.getElementById("immediat");
let prevision = document.getElementById("prevision");

function creerImmediat() {

    let vueImd = document.createElement("section");
    let infos = document.createElement("article")
    let infos1 = document.createElement("article")
    let Ville = document.createElement("h1");
    let Temp = document.createElement("h2");
    let Hum = document.createElement("h2");
    let Vent = document.createElement("h2");
    let Nuage = document.createElement("h2");
    let description = document.createElement("h2");
    let ics = document.createElement("article")
    let icon = document.createElement("img");


    vueImd.setAttribute("id", "immediat");
    Ville.setAttribute("id", "city");
    Temp.setAttribute("id", "temp");
    Hum.setAttribute("id", "humidity");
    Vent.setAttribute("id", "wind");
    Nuage.setAttribute("id", "clouds");
    description.setAttribute("id", "desc");
    icon.setAttribute("id", "icon");

    //bootstrap
    vueImd.setAttribute("class", "row container text-center text-bg-dark border border-info rounded-4")
    Ville.setAttribute("class", "col-12 p-4")
    infos.setAttribute("class", "col-9")
    infos1.setAttribute("class", "row border border-info rounded-4 mb-5")
    Temp.setAttribute("class", "col-6 p-5")
    Hum.setAttribute("class", "col-6 p-5")
    Vent.setAttribute("class", "col-6 p-5")
    Nuage.setAttribute("class", "col-6 p-5")
    description.setAttribute("class", "col-12 p-5")
    ics.setAttribute("class", "col-3 mb-5 border text-center border-info rounded-4")
    icon.setAttribute("class", "col-12 mt-5 p-5 ")


    //attribution html
    vueImd.appendChild(Ville);
    infos1.appendChild(Temp);
    infos1.appendChild(Hum);
    infos1.appendChild(Vent);
    infos1.appendChild(Nuage);
    infos1.appendChild(description);
    infos.appendChild(infos1);

    ics.appendChild(icon);
    vueImd.appendChild(ics);
    vueImd.appendChild(infos)
    main.appendChild(vueImd);
}

async function getData() {
    const ville = document.getElementById("ville").value.trim();


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=9d63106b0003583259d7d973d5addfa9&units=metric&lang=fr`;
    try {
        const reponse = await fetch(url);
        if (!reponse.ok) {
            document.getElementById("city").innerHTML = "Ville : ville non trouvée";
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }

        const resultat = await reponse.json();

        document.getElementById("city").innerHTML = "Ville : " + resultat.name;
        document.getElementById("temp").innerHTML = "Température : " + resultat.main.temp;
        document.getElementById("humidity").innerHTML = "Taux d'humidité : " + resultat.main.humidity;
        document.getElementById("wind").innerHTML = "Vitesse du vent : " + resultat.wind.speed;
        document.getElementById("clouds").innerHTML = "Densité des Nuages : " + resultat.clouds.all;
        document.getElementById("desc").innerHTML = "Description du temps : " + resultat.weather[0].description;
        document.getElementById("icon").src = `https://openweathermap.org/payload/api/media/file/${resultat.weather[0].icon}.png`;

    } catch (erreur) {
        console.error(erreur.message);
    }


}


function creerPrevision() {
    let div = document.createElement("div")
    let tableau = document.createElement("table");
    let entete = document.createElement("thead");
    let structure = document.createElement("tr");
    let structure1 = document.createElement("tr");
    let col1 = document.createElement("th");
    let col2 = document.createElement("th");
    let col3 = document.createElement("th");
    let col4 = document.createElement("th");
    let body = document.createElement("tbody");
    let struct1 = document.createElement("td");
    let struct2 = document.createElement("td");
    let struct3 = document.createElement("td");
    let struct4 = document.createElement("td");


    entete.setAttribute("id", "head")
    structure.setAttribute("id", "structure")
    structure1.setAttribute("id", "structure")
    col1.setAttribute("id", "date")
    col2.setAttribute("id", "temperature")
    col3.setAttribute("id", "description")
    col4.setAttribute("id", "icons")
    body.setAttribute("id", "body")
    struct1.setAttribute("id", "struct1")
    struct2.setAttribute("id", "struct2")
    struct3.setAttribute("id", "struct3")
    struct4.setAttribute("id", "struct4")

    //bootstrap
    div.setAttribute("class", "container")
    tableau.setAttribute("class", "table table-dark table-striped");
    structure.setAttribute("scope", "row")
    structure1.setAttribute("scope", "row")
    col1.setAttribute("scope", "col");
    col2.setAttribute("scope", "col");
    col3.setAttribute("scope", "col");
    col4.setAttribute("scope", "col");
    struct1.setAttribute("scope", "col");
    struct2.setAttribute("scope", "col");
    struct3.setAttribute("scope", "col");
    struct4.setAttribute("scope", "col");

    //attribution a la page

    structure.appendChild(col1);
    structure.appendChild(col2);
    structure.appendChild(col3);
    structure.appendChild(col4);
    entete.appendChild(structure);
    tableau.appendChild(entete);
    structure1.appendChild(struct1);
    structure1.appendChild(struct2);
    structure1.appendChild(struct3);
    structure1.appendChild(struct4);
    body.appendChild(structure1);
    tableau.appendChild(body);
    div.appendChild(tableau);
    main.appendChild(div);
};
/*
async function getdataforecast() {
    const ville = document.getElementById("ville").value.trim();

    if (ville === "") {
        document.getElementById("city").innerHTML = "Ville : entre une ville";
        return;
    }

    const urlPrev = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=9d63106b0003583259d7d973d5addfa9&units=metric&lang=fr&cnt=3`;

    try {
        const reponse = await fetch(url);
        if (!reponse.ok) {
        }
        throw new Error(`Statut de réponse : ${reponse.status}`);

        const resultat = await reponse.json();
    }
}
*/
document.getElementById("recup").addEventListener("click", function () {
    creerImmediat();
    getData();
    creerPrevision();
});