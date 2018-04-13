//Karte

var map = L.map('map',{
    center: [48.99,8.4242],
    zoom: 11,
    minZoom:2,
    maxZoom: 18,
    zoomControl: false
});
L.control.scale().addTo(map);


L.control.zoom({
    position:'bottomright'
}).addTo(map);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "&copy; <a target='_blank' href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &#124; <a target='_blank' href='https://github.com/CodeforKarlsruhe/direktvermarkter'>GitHub</a> &#124; <a target='_blank' href='https://codefor.de/karlsruhe/'>OK Lab Karlsruhe</a>"
}).addTo(map);

var blueIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-blue.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var redIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-red.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-green.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var orangeIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-orange.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-yellow.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var violetIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-violet.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greyIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-grey.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var blackIcon = new L.Icon({
	iconUrl: 'img/marker-icon-2x-black.png',
	shadowUrl: 'img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});


//Daten
function popupcontent (feature, layer) {

    var popupcontent = [];
    for (var prop in feature.properties) {


      if (prop == "@id" || prop == "shop" || prop == "name"|| prop == "addr:city"|| prop == "addr:country"|| prop == "addr:housenumber"|| prop == "addr:postcode" || prop == "addr:suburb" || prop == "addr:street" || prop == "opening_hours"){
        console.log(prop +" "+feature.properties[prop] +" in Tabelle unsichtbar");
        //do nothing
        }
      else if (prop == "website" || prop == "contact:website" || prop == "url"){
          popupcontent.unshift("<tr><td><strong>"
          +prop.replace("website","Internetseite").replace("contact:","") + ":</strong> </td><td>" + "<a target='_blank' link href='"
          + feature.properties[prop] + "' target='_blank'>"
          + feature.properties[prop] +"</a></td></tr>");
          console.log(prop +" "+feature.properties[prop] +" als Link Formatiert");
        }
        else if (prop == "fixme"){
            popupcontent.push("<tr><td><strong>"
            +prop.replace("fixme","Unklare Daten") + ":</strong> </td><td>"
            + feature.properties[prop].replace("position estimated","Position geschätzt")
            +" <a target='_blank' href='http://openstreetmap.org/" +feature.id  +"'> Daten Verbessern</a>");
            console.log(prop +" "+feature.properties[prop] +" (fixme)");
            }

        else {
          popupcontent.push("<tr><td><strong>"
          + prop
          .replace(":", " ")
          .replace("addr ", "")
          .replace("name", "Name")
          .replace("opening_hours", "Öffnungszeiten")
          .replace("city", "Stadt")
          .replace("housenumber", "Hausnummer")
          .replace("phone", "Telefon")
          .replace("operator", "Betreiber")
          .replace("postcode", "Postleitzahl")
          .replace("street", "Straße")
          .replace("organic", "Biologisch")
          .replace("produce","Produzieren")
          .replace("product","Produkt(e)")
          .replace("contact","")
          .replace("suburb","Bezirk")
          .replace("description","Beschreibung")
          .replace("building","Gebäude")
          .replace("wheelchair","Rollstuhlgerecht")
          .replace("payment coins","Nimmt Münzen")
          .replace("payment notes","Nimmt Scheine")
          .replace("payment cash","Nimmt Bargeld")
          .replace("vending","Verkauft")
          .replace("amenity","Einrichtung ")
          .replace("country","Land")
          .replace("houseName","Hausname")
          .replace("milk", "Milch")
          .replace("covered", "Überdacht")
          .replace("lastcheck", "Letze Überprüfung")
          .replace("source", "Quelle")

          + ":</strong> </td><td>"
          + feature.properties[prop]
          .replace(";", ", ")
          .replace("yes", "ja")
          .replace("only", "nur")
          .replace("vending_machine","Verkaufsautomat")
          .replace("raw_milk", "Rohmilch")
          + "</td></tr>");
        }


    }

    var linkLat;
    var linkLong;

    if (feature.geometry.type == 'Polygon') {
        console.log('Polygon for Links detected');
        var centroid = turf.centroid(feature);
        var linkLat = centroid.geometry.coordinates[0];
        var linkLong = centroid.geometry.coordinates[1];
    }
    else if (feature.geometry.type == 'Point') {
        console.log("Point for Links detected");
        var linkLat = feature.geometry.coordinates[0];
        var linkLong = feature.geometry.coordinates[1];

}

    var innereTabelle = popupcontent.join("");
    var htmlInhalt = "<h1>" +feature.properties.name +"</h1>"
        +"<div id='wrapper'><div id='adress'>"
        +"<strong>Adresse:</strong><br>"
        +feature.properties["addr:street"] +" " +feature.properties["addr:housenumber"]
        +"<br>" +feature.properties["addr:postcode"] +" " +feature.properties["addr:city"]
        +"</div><div id='links'>"
        +"<strong>Dieser Ort auf</strong><br>"
        +"<a href='http://openstreetmap.org/" +feature.id  +"'>OpenStreetMap</a>"
        +"<br><a target='_blank' href='https://maps.openrouteservice.org/directions?n1=" +linkLong +"&n2=" +linkLat +"&n3=14&a=null,null," +linkLong +"," +linkLat +"&b=0&c=0&k1=en-US&k2=km'>Open Routeservice</a>"
        +"<br><a target='_blank' href='http://maps.google.de/?q=" +linkLong +"," +linkLat +"'>Google Maps</a>"
        
        +"</div></div><div id='times'>"
        +"<strong>Öffnungszeiten:</strong><br>" +feature.properties["opening_hours"]
        +"</div><div id='table'>"
        +"<strong>Weitere Daten:</strong>"
        +"<table>"
        +innereTabelle
        + "</table></div>"
        +"<p class='popupText'>Fehlende oder falsche Angaben? Trage Daten für diesen Ort <a target='_blank' href='http://openstreetmap.org/" +feature.id  +"'> auf OpenStreetMap</a> ein! <br>Die Daten werden regelmäßig abgeglichen.</p>";



    return htmlInhalt
};

//Darstellung

var geojson1 = L.geoJson(karlsruhe,{
    onEachFeature: function(feature,layer){
        if (feature.geometry.type == 'Polygon' && feature.properties.amenity == 'vending_machine') {
            console.log('Polygon detected');
            var centroid = turf.centroid(feature);
            var lon = centroid.geometry.coordinates[0];
            var lat = centroid.geometry.coordinates[1];
            L.marker([lat,lon],{icon: redIcon}).addTo(map).bindPopup(popupcontent(feature,layer));
        }
        else if (feature.geometry.type == 'Polygon' && feature.properties.amenity != 'vending_machine') {
            console.log('Polygon detected');
            var centroid = turf.centroid(feature);
            var lon = centroid.geometry.coordinates[0];
            var lat = centroid.geometry.coordinates[1];
            L.marker([lat,lon],{icon: greenIcon}).addTo(map).bindPopup(popupcontent(feature,layer));
        }
        else if (feature.geometry.type == 'Point' && feature.properties.amenity == 'vending_machine') {
            console.log("Point detected");
            var lon = feature.geometry.coordinates[0];
            var lat = feature.geometry.coordinates[1];
            L.marker([lat,lon],{icon: redIcon}).addTo(map).bindPopup(popupcontent(feature,layer));
        }
        else if (feature.geometry.type == 'Point' && feature.properties.amenity != 'vending_machine' ) {
            console.log("Point detected");
            var lon = feature.geometry.coordinates[0];
            var lat = feature.geometry.coordinates[1];
            L.marker([lat,lon],{icon: greenIcon}).addTo(map).bindPopup(popupcontent(feature,layer));
        }
}});

//geojson1.addTo(map);




