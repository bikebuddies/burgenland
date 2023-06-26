// Zentrum Karte Objekt
let steinberg = {
    lat: 47.4744090679682,
    lng: 16.487984334978034,
}

// Karte initialisieren und Fullscreen Control 
let map = L.map("map", {
    fullscreenControl: true
}).setView([
    steinberg.lat, steinberg.lng
], 8.5);

// thematische Layer
let themaLayer = {
    rosalia: L.featureGroup(),
    festival: L.featureGroup(),
    ironCurtain: L.featureGroup(),
    paradies: L.featureGroup(),
    jubilaeum: L.featureGroup(),
    forecast: L.featureGroup(),
    badeseen: L.featureGroup(),
}



// Hintergrundlayer 
let eGrundkarteNiederoesterreich = L.control.layers({
    "Terrain": L.tileLayer.provider("Stamen.Terrain").addTo(map),
    "BasemapÖsterreich": L.tileLayer.provider("BasemapAT.grau"),
    "StamenB/W": L.tileLayer.provider("Stamen.TonerLite"),
    "CycleTrails": L.tileLayer.provider("CyclOSM"),
}, {
    "Rosalia-Radweg": themaLayer.rosalia.addTo(map),
    "Festival-Radweg": themaLayer.festival.addTo(map),
    "Iron-Curtain-Radweg": themaLayer.ironCurtain.addTo(map),
    "Paradies-Radweg": themaLayer.paradies.addTo(map),
    "Jubiläum-Radweg": themaLayer.jubilaeum.addTo(map),
    "Wettervorhersage MET Norwag": themaLayer.forecast,
    "Badeseen": themaLayer.badeseen,
}).addTo(map);

// Instanz Leaflet MiniMap
var miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("BasemapAT.basemap"), {
    toggleDisplay: true,
    minimized: true
}
).addTo(map);

//Geolocation
map.locate({
    setView: false,
    maxZoom: 16,
    watch: true,
});

let circle = L.circle([0, 0], 0).addTo(map);

map.on('locationfound', function (evt) {
    let radius = Math.round(evt.accuracy);
    L.circle(evt.latlng, radius).addTo(map);
    circle.setLatLng(evt.latlng);
    circle.setRadius(radius);
}
);

var errorDisplayed = false;

map.on('locationerror', function (evt) {
    if (!errorDisplayed) {
        alert(evt.message);
        errorDisplayed = true;
    }
});

// Wettervorhersage MET Norway
async function showForecast(url, latlng) {
    let response = await fetch(url);
    let jsondata = await response.json();

    let current = jsondata.properties.timeseries[0].data.instant.details;

    let timestamp = new Date(jsondata.properties.meta.updated_at).toLocaleString();

    let timeseries = jsondata.properties.timeseries;

    let markup = `
        <h4>Wetter für ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)} (${timestamp})</h4>
        <table>
            <tr><td>Lufttemperatur (C)</td><td>${current.air_temperature}</td></tr>
            <tr><td>Bewölkungsgrad (%)</td><td>${current.cloud_area_fraction}</td></tr>
            <tr><td>Luftfeuchtigkeit (%)</td><td>${current.relative_humidity}</td></tr>
            <tr><td>Windrichtung (°)</td><td>${current.wind_from_direction}</td></tr>
            <tr><td>Windgeschwindigkeit (m/s)</td><td>${current.wind_speed}</td></tr>
        </table>
    `;

    // Wettersymbole hinzufügen
    for (let i = 0; i <= 24; i += 3) {
        //console.log(timeseries[i]);
        let icon = timeseries[i].data.next_1_hours.summary.symbol_code;
        let img = `icons/${icon}.svg`;
        markup += `<img src="${img}" style="width:32px;" title="${timeseries[i].time.toLocaleString()}">`
        //console.log(icon, img);
    }
    L.popup().setLatLng(latlng).setContent(markup).openOn(themaLayer.forecast);
}

// Wettervorhersage auf Kartenklick reagieren (Event via map.on)
map.on("click", function (evt) {
    console.log(evt);
    let url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${evt.latlng.lat}&lon=${evt.latlng.lng}`;
    showForecast(url, evt.latlng);
});


//Festival-Radweg
var gpx = './data/festival.gpx';
let festival = new L.GPX(gpx, {
    polyline_options: {
        color: '#8D021F',
        opacity: 0.75,
        weight: 3
    },
    marker_options: {
        startIconUrl: "icons/tab_cycle.png",
        endIconUrl: false,
        shadowUrl: false,
        wptIconUrls: false
    }
}).addTo(themaLayer.festival);

// GPX Track visualisieren aus https://raruto.github.io/leaflet-elevation/
festival.on("click", function (evt) {
    let controlElevation = L.control.elevation({
        time: false,
        elevationDiv: "#profile",
        height: 300,
        theme: "festival"
    }).addTo(map);
    // Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
    controlElevation.load("./data/festival.gpx")
});

//Iron-Curtain-Radweg
var gpx = './data/ironCurtain.gpx';
let ironCurtain = new L.GPX(gpx, {
    polyline_options: {
        color: '#CD5C5C',
        opacity: 0.75,
        weight: 3
    },
    marker_options: {
        startIconUrl: "icons/tab_cycle.png",
        endIconUrl: false,
        shadowUrl: false,
        wptIconUrls: false
    }
}).addTo(themaLayer.ironCurtain);
// GPX Track visualisieren aus https://raruto.github.io/leaflet-elevation/
ironCurtain.on("click", function (evt) {
    let controlElevation = L.control.elevation({
        time: false,
        elevationDiv: "#profile",
        height: 300,
        theme: "ironCurtain"
    }).addTo(map);
    // Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
    controlElevation.load("./data/ironCurtain.gpx")
});

//Jubiläum-Radweg
var gpx = './data/jubilaeum.gpx';
let jubilaeum = new L.GPX(gpx, {
    polyline_options: {
        color: '#E0115F',
        opacity: 0.75,
        weight: 3
    },
    marker_options: {
        startIconUrl: "icons/tab_cycle.png",
        endIconUrl: false,
        shadowUrl: false,
        wptIconUrls: false
    }
}).addTo(themaLayer.jubilaeum);
// GPX Track visualisieren aus https://raruto.github.io/leaflet-elevation/
jubilaeum.on("click", function (evt) {
    let controlElevation = L.control.elevation({
        time: false,
        elevationDiv: "#profile",
        height: 300,
        theme: "jubilaeum"
    }).addTo(map);
    // Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
    controlElevation.load("./data/jubilaeum.gpx")
});


//Rosalia-Radweg
var gpx = './data/rosalia.gpx';
let rosalia = new L.GPX(gpx, {
    polyline_options: {
        color: '#FF0800',
        opacity: 0.75,
        weight: 3
    },
    marker_options: {
        startIconUrl: "icons/tab_cycle.png",
        endIconUrl: false,
        shadowUrl: false,
        wptIconUrls: false
    }
}).addTo(themaLayer.rosalia);
// GPX Track visualisieren aus https://raruto.github.io/leaflet-elevation/
rosalia.on("click", function (evt) {
    let controlElevation = L.control.elevation({
        time: false,
        elevationDiv: "#profile",
        height: 300,
        theme: "rosalia"
    }).addTo(map);
    // Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
    controlElevation.load("./data/rosalia.gpx")
});

//Paradies-Radweg
var gpx = './data/paradies.gpx';
let paradies = new L.GPX(gpx, {
    polyline_options: {
        color: '#FF0800',
        opacity: 0.75,
        weight: 3
    },
    marker_options: {
        startIconUrl: "icons/tab_cycle.png",
        endIconUrl: false,
        shadowUrl: false,
        wptIconUrls: false
    }
}).addTo(themaLayer.paradies);
// GPX Track visualisieren aus https://raruto.github.io/leaflet-elevation/
paradies.on("click", function (evt) {
    let controlElevation = L.control.elevation({
        time: false,
        elevationDiv: "#profile",
        height: 300,
        theme: "paradies"
    }).addTo(map);
    // Load track from url (allowed data types: "*.geojson", "*.gpx", "*.tcx")
    controlElevation.load("./data/paradies.gpx")
});

// Marker der größten Städte
const STAEDTE = [
    {
        title: "Eisenstadt",
        lat: 47.84651920035177,
        lng: 16.52731717127831,
        wikipedia: "https://de.wikipedia.org/wiki/Eisenstadt"//Links raus oder anpassen?
    },
    {
        title: "Neusiedl am See",
        lat: 47.94831935218377,
        lng: 16.850801413360713,
        wikipedia: "https://de.wikipedia.org/wiki/Neusiedl_am_See" //Links raus oder anpassen?
    },
    {
        title: "Oberwart",
        lat: 47.29477213220548,
        lng: 16.200854006181853,
        wikipedia: "https://de.wikipedia.org/wiki/Oberwart"//Links raus oder anpassen?
    },
    {
        title: "Pinkafeld",
        lat: 47.374107766607914,
        lng: 16.123038801200657,
        wikipedia: "https://de.wikipedia.org/wiki/Pinkafeld"//Links raus oder anpassen?
    },
]

for (let stadt of STAEDTE) {
    //Marker für den Stopp
    let marker = L.marker([stadt.lat, stadt.lng])
        .addTo(map)
        .bindPopup(`${stadt.title} <br>
    <a href="${stop.wikipedia}">Wikipedia</a>
    `)
};

//Badeseen
const BADESEEN = [
    {
        title: "Neusiedler See",
        lat: 47.861670077756585,
        lng: 16.766234356776703
    },
    {
        title: "Römersee",
        lat: 47.76228947258584,
        lng: 16.346584741278356
    },
    {
        title: "Badeparadies Burg",
        lat: 47.21698496322752,
        lng: 16.41073338918724
    },
    {
        title: "Naturbadesee Königsdorf",
        lat: 47.00899491536701,
        lng: 16.16288813573165
    },
    {
        title: "Sonnensee Ritzing",
        lat: 47.63005232247246,
        lng: 16.470865861482007
    }
];

for (let badeseen of BADESEEN) {
    L.marker([badeseen.lat, badeseen.lng], {
        icon: L.icon({
            iconUrl: `icons/swimming.png`,
            popupAnchor: [0, -37],
            iconAnchor: [16, 37],
        })
    })
        .addTo(themaLayer.badeseen)
        .bindPopup(`<b>${badeseen.title}</b> <br>
    `)
};

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);



//Kommentare aus der start-Seite
/* Pulldownmenü Code
//Pulldown für Navigation
let pulldown = document.querySelector("#pulldown");
for (let etappe of ETAPPEN) {
    //console.log(etappe);
    let status = "";
    if (etappe.nr == "20") {
        status = "selected";
    }
    pulldown.innerHTML += `<option ${status} value="${etappe.user}">Etappe ${etappe.nr}: ${etappe.etappe}</option>`
}

// auf Änderungen im Pulldown reagieren
pulldown.onchange = function(evt) {
    //console.log(pulldown.value);
    let url = `https://${pulldown.value}.github.io/biketirol`;
    //console.log(url);
    window.location.href = url;
}
*/