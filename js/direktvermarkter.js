console.log("        @ @ @\n       []___\n      /    /\\____\n(~)  /_/\\_//____/\\ \n |   | || |||__|||\n     farmshops.eu \n Interesse am Code, Bug gefunden oder eine Verbesserungsidee? Schau vorbei auf GitHub! \n https://github.com/CodeforKarlsruhe/direktvermarkter");
var mappos = L.Permalink.getMapLocation();
var map = L.map('map', {
    center: mappos.center,
    zoom: mappos.zoom,
    minZoom: 2,
    maxZoom: 18,
    zoomControl: false
});
L.Permalink.setup(map);

var tiles = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: "&copy; <a target='_blank' href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
});

L.control.scale({position: 'topright'}).addTo(map);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);


L.control.locate({
    position: 'bottomright',
    drawMarker: false,
    drawCircle: false,
    flyTo: true,
    keepCurrentZoomLevel: false,
    strings: {
        title: "Karte auf meine aktuelle Position zentrieren!"
    },
    locateOptions: {
        maxZoom: 12
    },
    clickBehavior: {
        inView: 'setView', 
        outOfView: 'setView'
    }
}
).addTo(map);



var greenMarker = L.ExtraMarkers.icon({
    icon: 'fa-number',
    markerColor: 'green-light',
    shape: 'circle',
    number: 'H'
});

var blueMarker = L.ExtraMarkers.icon({
    icon: 'fa-number',
    markerColor: 'blue',
    shape: 'circle',
    number: 'A'
});

var yellowMarker = L.ExtraMarkers.icon({
    icon: 'fa-number',
    markerColor: 'orange-dark',
    shape: 'round',
    number: 'M'
});

var blackMarker = L.ExtraMarkers.icon({
    icon: 'fa-number',
    markerColor: 'black',
    shape: 'circle',
    number: '?'
});


//Darstellung

//Marker 

var geojson1 = L.geoJson(farmshopGeoJson, {
    pointToLayer: function (feature, latlng) {
        if (feature.properties.shop === 'farm' && feature.properties.amenity != 'vending_machine') {
            return L.marker(latlng, { icon: greenMarker })
        }
        else if (feature.properties.amenity === 'marketplace') {
            return L.marker(latlng, { icon: yellowMarker })
        }
        else if (feature.properties.amenity === 'vending_machine') {
            return L.marker(latlng, { icon: blueMarker })
        }
        else {
            console.log("nicht bekannte Daten verwendet")
            return L.marker(latlng, { icon: blackMarker })
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

        function markerTypen (markers){
            var returnWert = markers.length;
            //console.log(markers[0].feature.id)
            return returnWert;
        }

        var html = '<div class="circle">' +markerTypen(markers) + '</div>';
        return L.divIcon({ html: html, className: 'test', iconSize: L.point(62, 62) });
    },
    spiderfyOnMaxZoom: false,
    maxClusterRadius: 80,
    disableClusteringAtZoom: 11,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    removeOutsideVisibleBounds: true,
});

markers.addLayer(geojson1);
map.addLayer(markers);
console.log(lastUpdate);

var sidebar = L.control.sidebar('sidebar').addTo(map);