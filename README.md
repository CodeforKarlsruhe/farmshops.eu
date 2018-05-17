# Farmshops Map / Hofaden Karte
Data viewer for farmshops, milk and food vending machines and other direct marketers on openstreetmap.

Using:
- [leaflet.js](https://github.com/Leaflet/Leaflet)
- [leaflet extra markers](https://github.com/coryasilva/Leaflet.ExtraMarkers)
- [leaflet marker clusterer](https://github.com/Leaflet/Leaflet.markercluster)
- [leaflet permalinks](https://github.com/MarcChasse/leaflet.Permalink)
- jquery
- The node module query-overpass for importing OSM data from http://overpass-turbo.eu/
- [leaflet sidebar v2](https://github.com/Turbo87/sidebar-v2) (in future versions)

## Documentation in German

Übersichtskarte von Hofläden, Milchautomaten und anderen Direktvermarktern aus der Region. Die Karte erhält alle ihre Daten von OpenstreetMap, bereitet sie optisch auf und unterstützt die Pflege der Daten indem sie fehlende Werte sichtbar macht und direkt auf den entsprechenden Ort auf OSM zurück verlinkt.

Webseite: https://codeforkarlsruhe.github.io/direktvermarkter/

Mirror: http://stefang.cepheus.uberspace.de/farmshops/

![Map example](https://raw.githubusercontent.com/codeforkarlsruhe/direktvermarkter/master/img/direktvermarkter.png)

Features:
- Zeigt alle Punkte aus der Region Karlsruhe mit dem Wert shop:farm aus einem GeoJson export von OpenstreetMap an (von overpass-turbo.eu)
- Unterscheidet Automaten und Hofläden durch grüne und blaue Marker
- Bereitet Daten auf, macht Links klickbar und übersetzt die häufigsten Begriffe
- Verlinkt von jedem Punkt auf die identischen Koordinaten auf openstreetmap.org, OpenRouteService und Google Maps
- Zeigt Punkte und Polygone gleichermaßen an. Polygone erhalten einen Pin in ihrem Zentrum.
- Permalinks in denen Ort und Zoomlevel weitergegeben werden können

## Datenabgleich
Die Daten stammen aus OSM und werden vom script update_data.js aktualisiert. Siehe dazu auch #6
Es ist ein node script, dass nach installation des Packets "query-overpass" mit "node update_data.js" ausgeführt werden kann.

Hier ein Einzeiler zum Updaten und Veröffentlichen der Daten:

> cd [PFAD]/direktvermarkter/ && node update_data.js && git add . && git commit -m "autom. Datenupdate" && git push origin master

Das Script verwendet http://overpass-turbo.eu/ um diese Tags von OpenstreetMap zu ziehen:

- https://wiki.openstreetmap.org/wiki/DE:Tag:shop=farm
- https://wiki.openstreetmap.org/wiki/DE:Tag:amenity%3Dvending_machine
 Wobei vending machines indirekt über die Tags vending:milk und vending:food gezogen werden.

ToDo (siehe auch Issues):
- Impressum, Infos, Links auf codefor und GitHub usw. 
- Suchfunktion
- Auswahlmöglichkeit für verschiedene Regionen
- Howto Datenpflege
