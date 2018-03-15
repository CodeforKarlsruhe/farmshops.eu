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
   
    var popupcontent = [];
       for (var prop in feature.properties) {
         if (prop == "@id" || prop == "shop"){
           //do nothing
           }
         else if (prop == "website" || prop == "contact:website"){
             popupcontent.push("<tr><td>" +prop.replace("website","Internetseite").replace("contact:","") + ": </td><td>" + "<a link href='" + feature.properties[prop] + "' target='_blank'>" +feature.properties[prop] +"</a></td></tr>");
           }
   
           else {
             popupcontent.push("<tr><td>" +prop.replace(":", " ").replace("addr ", "").replace("name", "Name").replace("opening_hours", "Öffnungszeiten").replace("city", "Stadt").replace("housenumber", "Hausnummer").replace("phone", "Telefon").replace("operator", "Betreiber").replace("postcode", "Postleitzahl").replace("street", "Straße").replace("organic", "Biologisch") + ": </td><td>" + feature.properties[prop].replace(";", ", ").replace("yes", "ja").replace("only", "nur") + "</td></tr>");
           }
       }
   
   
       var innereTabelle = popupcontent.join("");
   
       layer.bindPopup(
           "<h1>" +feature.properties.name +"</h1>"
           +"<table>" +innereTabelle + "</table>"
           +"<p class='popupText'>Fehlende oder falsche Angaben? Trage Daten für diesen Ort <a href='http://openstreetmap.org/" +feature.id  +"'> auf Opentreetmap</a> ein! <br>Die Daten werden regelmäßig abgeglichen.</p>"
       );
   };

L.geoJson(karlsruhe, {
    onEachFeature: jederPunkt
}).addTo(map);

L.control.scale().addTo(map);