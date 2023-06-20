/* Code von Burgenland mobile Beispiel */

// Zentrum Karte Objekt
let stpolten = {
    lat: 48.33001133291213,
    lng: 16.060959034595086,
    title: "St. Pölten, Niederösterreich"
}

// Karte initialisieren und Fullscreen Control 
let map = L.map("map", {
    fullscreenControl: true
}).setView([
    stpolten.lat, stpolten.lng
], 7.5);

// thematische Layer
let themaLayer = {
    kampThayaMarch: L.featureGroup(),
    piestingtal: L.featureGroup(),
    thayarunde: L.featureGroup(),
    traisental: L.featureGroup(),
    triestingGoelsental: L.featureGroup(),
    triestingau: L.featureGroup(),
    ybbstal: L.featureGroup(),
    eurovelo6: L.featureGroup(),
    eurovelo9: L.featureGroup(),
    eurovelo13: L.featureGroup(),
}

// Hintergrundlayer 
//noch den schöneren von der Hauptkarte einfügen, wenn wir das geschafft haben 
let eGrundkarteNiederoesterreich = L.control.layers({
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.DE").addTo(map),
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap"),
    "CycleTrails": L.tileLayer.provider("CyclOSM"),
}, {
    "Kamp-Thaya-March-Radweg": themaLayer.kampThayaMarch.addTo(map),
    "Piestingtal-Radweg": themaLayer.piestingtal.addTo(map),
    "Thayarunde": themaLayer.thayarunde.addTo(map),
    "Traisental-Radweg": themaLayer.traisental.addTo(map),
    "Triesting-Gölsental-Radweg": themaLayer.triestingGoelsental.addTo(map),
    "Triestingau-Radweg": themaLayer.triestingau.addTo(map),
    "Ybbstal-Radweg": themaLayer.ybbstal.addTo(map),
    "Eurovelo-Radweg Nr. 6": themaLayer.eurovelo6.addTo(map),
    "Eurovelo-Radweg Nr. 9": themaLayer.eurovelo9.addTo(map),
    "Eurovelo-Radweg Nr. 13": themaLayer.eurovelo13.addTo(map),
}).addTo(map);


var gpx = './data/niederoesterreich/kamp_thaya_march.gpx';
new L.GPX(gpx, { async: true }, {
    //Polylinien stylen funktioniert noch nicht, marker ausschalten auch nicht
    polyline_options: [{
        color: `#76eec6`,
        opacity: 0.75,
        weight: 3
    }, {
        color: `#76eec6`,
        opacity: 0.75,
        weight: 3
    }]
}, {
    marker_options: {
        startIconUrl: false,
        endIconUrl: false,
        shadowUrl: false
    }
}).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.kampThayaMarch);

var gpx = './data/niederoesterreich/piestingtal.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.piestingtal);

var gpx = './data/niederoesterreich/thayarunde.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.thayarunde);

var gpx = './data/niederoesterreich/traisentalweg.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.traisental);

var gpx = './data/niederoesterreich/triesting_goelsental.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.triestingGoelsental);

var gpx = './data/niederoesterreich/triestingau.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.triestingau);

var gpx = './data/niederoesterreich/ybbstalradweg.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.ybbstal);

var gpx = './data/eurovelo6.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.eurovelo6);

var gpx = './data/eurovelo9.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.eurovelo9);

var gpx = './data/eurovelo13.gpx';
new L.GPX(gpx, { async: true }).on('loaded', function (e) {
    //   map.fitBounds(e.target.getBounds());
}).addTo(themaLayer.eurovelo13);

//Eurovelos erscheinen noch nicht

// Marker der größten Städte
const STAEDTE = [
    {
        title: "St. Pölten, Niederösterreich",
        lat: 48.18735,
        lng: 15.64139,
        wikipedia: "https://de.wikipedia.org/wiki/St._P%C3%B6lten"//Links raus oder anpassen?
    },
    {
        title: "Tulln",
        lat: 48.33001133291213,
        lng: 16.060959034595086,
        wikipedia: "https://de.wikipedia.org/wiki/Wien" //Links raus oder anpassen?
    },
    {
        title: "Krems a.d. Donau",
        lat: 48.41022698533108,
        lng: 15.60382006192799,
        wikipedia: "https://de.wikipedia.org/wiki/Eisenstadt"//Links raus oder anpassen?
    },
    {
        title: "Baden bei Wien",
        lat: 48.0024595018188,
        lng: 16.230795040395048,
        wikipedia: "https://de.wikipedia.org/wiki/Eisenstadt"//Links raus oder anpassen?
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

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

// Instanz Leaflet MiniMap
var miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("BasemapAT.basemap"), {
    toggleDisplay: true,
    minimized: true
}
).addTo(map);


// Erstelle eine Basiskarten-Layer (z.B. OpenStreetMap)
var osm2 = new L.TileLayer(osmUrl, {
    minZoom: 0,
    maxZoom: 13,
    attribution: osmAttrib
  });
  
  // Füge die Basiskarte zur Karte hinzu
  osm2.addTo(map);
  
  // Erstelle eine Instanz der Minimap
  var miniMap = new L.Control.MiniMap(osm2, {
    position: 'bottomright', // Positioniere die Minimap unten rechts
    width: '150px',
    height: '150px',
    toggleDisplay: true,
    zoomLevelOffset: -5
  });
  
  // Füge die Minimap zur Karte hinzu
  miniMap.addTo(map);
  









// //GPX-Track visualisieren -> Höhenprofile (es sind noch nicht alle)
// let controlElevation = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation.load("data/niederoesterreich/piestingtal.gpx");

// //GPX-Track visualisieren
// let controlElevation1 = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation1.load("data/niederoesterreich/kamp_thaya_march.gpx")

// //GPX-Track visualisieren
// let controlElevation2 = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation2.load("data/niederoesterreich/thayarunde.gpx")

// //GPX-Track visualisieren
// let controlElevation3 = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation3.load("data/niederoesterreich/traisentalweg.gpx")

// //GPX-Track visualisieren
// let controlElevation4 = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation4.load("triesting_goelsental.gpx")

// //GPX-Track visualisieren
// let controlElevation5 = L.control.elevation({
//     time: false,
//     elevationDiv: "#profile",
//     height: 300,
//     theme: "Radtouren Niederösterreich"
// }).addTo(themaLayer.route);
// controlElevation5.load("data/niederoesterreich/traisentalweg.gpx")

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

/* Geolocation würd ich auf der Übersichtskarte weglassen, damit es wirklich nur eine Übersicht wird.
map.locate({
    setView: true,
    watch: true, 
    maxZoom: 16
});

let circle = L.circle([0, 0], 0).addTo(map);
let marker = L.marker([0, 0], 0).addTo(map);

map.on('locationfound', function onLocationFound(evt) {
    console.log(evt);
    let radius = Math.round(evt.accuracy);
    marker.setLatLng(evt.latlng);
    marker.bindTooltip(`You are within ${radius} meters from this point`).openTooltip();
    circle.setLatLng(evt.latlng);
    circle.setRadius(radius);
});

map.on('locationerror', function onLocationError(evt) {
    alert(evt.message);
});
*/