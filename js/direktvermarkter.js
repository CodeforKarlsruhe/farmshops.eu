var mappos = L.Permalink.getMapLocation();
var map = L.map('map', {
    center: mappos.center,
    zoom: mappos.zoom,
    minZoom:2,
    maxZoom: 18,
    zoomControl: false
});
L.Permalink.setup(map);

var tiles = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: "&copy; <a target='_blank' href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
		});


L.control.zoom({
    position:'bottomright'
}).addTo(map);


var greenMarker = L.ExtraMarkers.icon({
    icon: 'fa-number',
    markerColor: 'green-light',
    shape: 'circle',
    prefix: 'fa',
    number: 'H'
  });

  var blueMarker = L.ExtraMarkers.icon({
    icon: 'fa-number',
    markerColor: 'blue',
    shape: 'circle',
    prefix: 'fa',
    number: 'A'
  });

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


//Popups
function popupcontent (feature, layer) {

    var popupcontent = [];
    for (var prop in feature.properties) {


      if (prop == "id" || prop == "shop" || prop == "name"|| prop == "addr:city"|| prop == "addr:country"|| prop == "addr:housenumber"|| prop == "addr:postcode" || prop == "addr:suburb" || prop == "addr:street" || prop == "opening_hours" || prop == "image" ){
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
        console.log('Polygon should not exist');
    }
    else if (feature.geometry.type == 'Point') {
        console.log("Point for Links detected");
        var linkLat = feature.geometry.coordinates[0];
        var linkLong = feature.geometry.coordinates[1];

}

        function adress (){
            if (feature.properties["addr:street"]){
            var adresse = "<strong>Adresse:</strong><br>"
            +feature.properties["addr:street"] +" " +feature.properties["addr:housenumber"]
            +"<br>" +feature.properties["addr:postcode"] +" " +feature.properties["addr:city"];
            
        }
        else if (feature.properties["addr:place"]){
            var adresse = "<strong>Adresse:</strong><br>"
            +feature.properties["addr:street"] +" " +feature.properties["addr:housenumber"]
            +"<br>" +feature.properties["addr:postcode"] +" " +feature.properties["addr:city"]
            +"<br>" +feature.properties["addr:place"];
            
        }
        else {
            var adresse = "<strong>Adresse:</strong><br> Unbekannt";
        }
        return adresse;
        }

        function oefnungszeiten (){
            if (feature.properties["opening_hours"]){
            var oefnungszeiten ="<strong>Öffnungszeiten:</strong><br>" +feature.properties["opening_hours"];
            
        }
        else {
            var oefnungszeiten = "<strong>Öffnungszeiten:</strong><br>Unbekannt <p><a target='_blank' href='http://openstreetmap.org/" +feature.id  +"'>Auf OSM bearbeiten.</a></p>";
        }
        return oefnungszeiten;
        }

        function headline () {
            var headline;
            if (feature.properties.name != undefined && feature.properties.amenity != 'vending_machine' ){
                headline = feature.properties.name;
                return headline;
            }
            else if (feature.properties.name == undefined && feature.properties.amenity != 'vending_machine' ){
                headline = "Hofladen<br> (ohne Namen)"
                return headline;
            }
            else if (feature.properties.name == undefined && feature.properties.amenity == 'vending_machine' ){
                headline = "Verkaufsautomat<br> (ohne Namen)"
                return headline
            }
            else {
                headline = feature.properties.name;
                return headline;
            }
        }

    var innereTabelle = popupcontent.join("");
    var htmlInhalt = "<div id='headline'><h1>" +headline() +"</h1></div>"
        +"<div id='wrapper'><div id='adress'>"
        +adress()
        +"</div><div id='links'>"
        +"<strong>Dieser Ort auf</strong><br>"
        +"<a target='_blank' href='http://openstreetmap.org/" +feature.id  +"'>OpenStreetMap</a>"
        +"<br><a target='_blank' href='https://maps.openrouteservice.org/directions?n1=" +linkLong +"&n2=" +linkLat +"&n3=14&a=null,null," +linkLong +"," +linkLat +"&b=0&c=0&k1=en-US&k2=km'>Open Routeservice</a>"
        +"<br><a target='_blank' href='http://maps.google.de/?q=" +linkLong +"," +linkLat +"'>Google Maps</a>"
        
        +"</div><div id='times'>"
        +oefnungszeiten()
        +"</div><div id='table'>"
        +"<table>"
        +"<th colspan='2'>Weitere Daten:</th>"
        +innereTabelle
        + "</table></div>"
        +"<p class='popupText'>Fehlende oder falsche Angaben? Trage Daten für diesen Ort <a target='_blank' href='http://openstreetmap.org/" +feature.id  +"'> auf OpenStreetMap</a> ein! <br>Die Daten werden regelmäßig abgeglichen.</p></div>";



    return htmlInhalt
};

//Darstellung

//Marker 

var geojson1 = L.geoJson(farmshopGeoJson,{
    pointToLayer: function (feature, latlng) {
        if(feature.properties.amenity != 'vending_machine'){
            return L.marker(latlng, {icon: greenMarker});
        }
        else {
            return L.marker(latlng, {icon: blueMarker});    
        }
        
    },

    onEachFeature: function (feature, layer) {
        layer.once("click", function () {
            layer.bindPopup(popupcontent(feature, layer)).openPopup();
        });
         
    }
})
.addLayer(tiles);
                
var markers = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getAllChildMarkers();
        
        var html = '<div class="circle">' + markers.length + '</div>';
        return L.divIcon({ html: html, className: 'test', iconSize: L.point(62, 62) });
    },
    spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 11,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    removeOutsideVisibleBounds:true,
});

markers.addLayer(geojson1);
map.addLayer(markers);
console.log(lastUpdate);

var sidebar = L.control.sidebar('sidebar').addTo(map);

L.control.scale().addTo(map);


