
let main = document.querySelector("main");
let imediat = document.getElementById("immediat");
let prevision = document.getElementById("prevision");
let joursPrevision = [];
let jourActuel = 0;


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
    vueImd.setAttribute("class", "row text-center text-bg-dark border border-info rounded-4 mb-5")
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

function creerPrevision() {
    let div = document.createElement("div");
    let tableau = document.createElement("table");
    let entete = document.createElement("thead");
    let structure = document.createElement("tr");
    let col1 = document.createElement("th");
    let col2 = document.createElement("th");
    let col3 = document.createElement("th");
    let col4 = document.createElement("th");
    let body = document.createElement("tbody");

    body.setAttribute("id", "body");

    //bootstrap
    div.setAttribute("class", "container text-center mt-5 ");
    tableau.setAttribute("class", "table table-dark table-striped table-bordered border-info ");

    col1.setAttribute("scope", "col");
    col2.setAttribute("scope", "col");
    col3.setAttribute("scope", "col");
    col4.setAttribute("scope", "col");

    col1.innerHTML = "Date";
    col2.innerHTML = "Température";
    col3.innerHTML = "Description";
    col4.innerHTML = "";

    //attribution html
    structure.appendChild(col1);
    structure.appendChild(col2);
    structure.appendChild(col3);
    structure.appendChild(col4);

    entete.appendChild(structure);
    tableau.appendChild(entete);
    tableau.appendChild(body);
    div.appendChild(tableau);
    main.appendChild(div);
}

function creerpagination() {
    let section = document.createElement("section");
    let nav = document.createElement("nav");
    let ul = document.createElement("ul");

    let liPrev = document.createElement("li");
    let liPage = document.createElement("li");
    let liNext = document.createElement("li");

    let buttonPrev = document.createElement("button");
    let buttonPage = document.createElement("button");
    let buttonNext = document.createElement("button");

    nav.setAttribute("aria-label", "Page navigation");

    ul.setAttribute("class", "pagination justify-content-center");

    liPrev.setAttribute("class", "page-item");
    liPage.setAttribute("class", "page-item");
    liNext.setAttribute("class", "page-item");

    buttonPrev.setAttribute("id", "prevButton");
    buttonPrev.setAttribute("class", "page-link");
    buttonPrev.textContent = "Précédent";

    buttonPage.setAttribute("id", "pageActuelle");
    buttonPage.setAttribute("class", "page-link");
    buttonPage.textContent = jourActuel + 1;

    buttonNext.setAttribute("id", "nextButton");
    buttonNext.setAttribute("class", "page-link");
    buttonNext.textContent = "Suivant";

    liPrev.appendChild(buttonPrev);
    liPage.appendChild(buttonPage);
    liNext.appendChild(buttonNext);

    ul.appendChild(liPrev);
    ul.appendChild(liPage);
    ul.appendChild(liNext);

    nav.appendChild(ul);
    section.appendChild(nav);
    main.appendChild(section);

    buttonPrev.addEventListener("click", jourPrecedent);
    buttonNext.addEventListener("click", jourSuivant);
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

async function getdataforecast() {
    const ville = document.getElementById("ville").value.trim();

    if (ville === "") {
        document.getElementById("city").innerHTML = "Ville : entre une ville";
        return;
    }

    const urlPrev = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=9d63106b0003583259d7d973d5addfa9&units=metric&lang=fr`;

    try {
        const reponse = await fetch(urlPrev);

        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }

        const resultat = await reponse.json();

        // On regroupe les prévisions par jour
        const groupes = {};

        resultat.list.forEach(prevision => {
            const jour = prevision.dt_txt.split(" ")[0];

            if (!groupes[jour]) {
                groupes[jour] = [];
            }

            groupes[jour].push(prevision);
        });

        joursPrevision = Object.values(groupes);
        jourActuel = 0;

        afficherJour();

    } catch (erreur) {
        console.error(erreur.message);
    }
}

function afficherJour() {
    const pageActuelle = document.getElementById("pageActuelle");

    if (pageActuelle) {
        pageActuelle.textContent = `${jourActuel + 1} / ${joursPrevision.length}`;
    }
    const body = document.getElementById("body");
    body.innerHTML = "";

    const previsionsDuJour = joursPrevision[jourActuel];

    previsionsDuJour.forEach(prevision => {
        const ligne = document.createElement("tr");

        const date = document.createElement("td");
        const temperature = document.createElement("td");
        const description = document.createElement("td");
        const icons = document.createElement("td");
        const img = document.createElement("img");

        date.textContent = prevision.dt_txt;
        temperature.textContent = prevision.main.temp + " °C";
        description.textContent = prevision.weather[0].description;

        img.src = `https://openweathermap.org/img/wn/${prevision.weather[0].icon}.png`;
        img.alt = prevision.weather[0].description;

        icons.appendChild(img);

        ligne.appendChild(date);
        ligne.appendChild(temperature);
        ligne.appendChild(description);
        ligne.appendChild(icons);

        body.appendChild(ligne);
    });
}

function jourSuivant() {
    if (jourActuel < joursPrevision.length - 1) {
        jourActuel++;
        afficherJour();
    }
}

function jourPrecedent() {
    if (jourActuel > 0) {
        jourActuel--;
        afficherJour();
    }
}

document.getElementById("recup").addEventListener("click", function () {
    main.innerHTML = "";
    creerImmediat();
    getData();
    creerpagination()
    creerPrevision();
    getdataforecast();
});
