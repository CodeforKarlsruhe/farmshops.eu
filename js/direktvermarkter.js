//Karte

var map = L.map('map',{
    center: [49,8],
    zoom: 9,
    minZoom:2,
    maxZoom: 18
});


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Daten

function jederPunkt (feature, layer){
 var popupcontent = [];
    for (var prop in feature.properties) {
        popupcontent.push("<tr><td>" +prop.replace(":", " ").replace("addr ", "").replace("name", "Name").replace("opening_hours", "Öffnungszeiten").replace("city", "Stadt").replace("housenumber", "Hausnummer").replace("phone", "Telefon").replace("operator", "Betreiber").replace("postcode", "Postleitzahl").replace("street", "Straße").replace("organic", "Biologisch") + ": </td><td>" + feature.properties[prop].replace(";", ", ").replace("yes", "ja").replace("only", "nur") + "</td></tr>");
    }

    var innereTabelle = popupcontent.join();
    
    layer.bindPopup(
        "<h1>" +feature.properties.name +"</h1>"
        +"<table>" +innereTabelle + "</table>"
        +"Fehlende oder falsche Angaben? Trag sie für diesen Ort direkt auf Openstreetmap ein: <br>  <a href='http://openstreetmap.org/" +feature.id  +"'>Opentreetmap</a> <br>Die Daten werden regelmäßig abgeglichen."
    );
};

L.geoJson(karlsruhe, {
    onEachFeature: jederPunkt
}).addTo(map);