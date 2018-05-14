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


L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: "&copy; <a target='_blank' href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> &#124; <a target='_blank' href='https://github.com/CodeforKarlsruhe/direktvermarkter'>GitHub</a> &#124; <a target='_blank' href='https://codefor.de/karlsruhe/'>OK Lab Karlsruhe</a>"
}).addTo(map);

//Dropdown
var legend = L.control({position: 'topright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'dropdown-wrapper');
    div.innerHTML = '<span id="choose">Wähle deine Region: </span>'
    +'<select> <optgroup label="Baden Württemberg">'
    +'<option value="Karlsruhe" selected="selected">Regierungsbezirk Karlsruhe</option>'
    +'<option value="Freiburg">Regierungsbezirk Freiburg</option>'
    +'<option value="Stuttgart">Regierungsbezirk Stuttgart</option>'
    +'<option value="Tübingen">Regierungsbezirk Tübingen</option>'
    +'</optgroup></select>';
    div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    return div;
};
legend.addTo(map);

$('select').change(function(){
    if ($(this).val() == "Freiburg"){

        map.setView([47.9929,7.8365], 9);
     }   
     else if ($(this).val() == "Stuttgart"){
        map.setView([48.7790,9.1801], 9);
     }  
     else if ($(this).val() == "Karlsruhe"){
        map.setView([48.99,8.4242], 9);
     }  
     else if ($(this).val() == "Tübingen"){
        map.setView([48.12706,9.43461], 9);
        map.removeLayer(marker)
     } 
});

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


      if (prop == "id" || prop == "shop" || prop == "name"|| prop == "addr:city"|| prop == "addr:country"|| prop == "addr:housenumber"|| prop == "addr:postcode" || prop == "addr:suburb" || prop == "addr:street" || prop == "opening_hours"){
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

        function adress (){
            if (feature.properties["addr:street"]){
            var adresse = "<strong>Adresse:</strong><br>"
            +feature.properties["addr:street"] +" " +feature.properties["addr:housenumber"]
            +"<br>" +feature.properties["addr:postcode"] +" " +feature.properties["addr:city"];
            
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

    var innereTabelle = popupcontent.join("");
    var htmlInhalt = "<div id='headline'><h1>" +feature.properties.name +"</h1></div>"
        +"<div id='wrapper'><div id='adress'>"
        +adress()
        +"</div><div id='links'>"
        +"<strong>Dieser Ort auf</strong><br>"
        +"<a href='http://openstreetmap.org/" +feature.id  +"'>OpenStreetMap</a>"
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

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		});

var geojson1 = L.geoJson(karlsruhe,{
    pointToLayer: function (feature, latlng) {
        if(feature.properties.amenity != 'vending_machine'){
            return L.marker(latlng, {icon: greenMarker});
            console.log("grüner Hofladen Marker erstellt");
        }
        else {
            return L.marker(latlng, {icon: blueMarker});
            console.log("blauer Automaten-Marker erstellt");
            
        }
        
    },

    onEachFeature: function (feature, layer) {
        layer.once("click", ()=>{
            layer.bindPopup(popupcontent(feature,layer)).openPopup();
          });
         
    }
})
.addLayer(tiles);
                
var markers = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        var markers = cluster.getAllChildMarkers();
        
        var html = '<div class="circle">' + markers.length + '</div>';
        return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(42, 42) });
    },
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    removeOutsideVisibleBounds:true,
});

		markers.addLayer(geojson1);
		map.addLayer(markers);






