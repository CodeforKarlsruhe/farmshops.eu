# Farmshops Map / Direktvermarkter Karte
Data viewer for  markets, farmshops, milk and food vending machines and other direct marketers on openstreetmap.

Using:
- [leaflet.js](https://github.com/Leaflet/Leaflet)
- [leaflet extra markers](https://github.com/coryasilva/Leaflet.ExtraMarkers)
- [leaflet marker clusterer](https://github.com/Leaflet/Leaflet.markercluster)
- [leaflet permalinks](https://github.com/MarcChasse/leaflet.Permalink)
- The node module query-overpass for importing OSM data from http://overpass-turbo.eu/
- [leaflet sidebar v2](https://github.com/Turbo87/sidebar-v2)
- [leaflet locatecontrol](https://github.com/domoritz/leaflet-locatecontrol)
- [opening_hours.js](https://github.com/opening-hours/opening_hours.js)
- [The noun Project Icons](https://thenounproject.com/)

Planned for future versions:
- [tags2names](https://github.com/ENT8R/tags2names) for internationalisation

## Documentation in German

Übersichtskarte von Hofläden, Milchautomaten und anderen Direktvermarktern aus der DACH-Region (Deutschland, Österreich, Schweiz). Die Karte erhält alle ihre Daten von OpenstreetMap, bereitet sie optisch auf und unterstützt die Pflege der Daten indem sie fehlende Werte sichtbar macht und direkt auf den entsprechenden Ort auf OSM zurück verlinkt.

Webseite: https://codeforkarlsruhe.github.io/direktvermarkter/

Mirror: http://stefang.cepheus.uberspace.de/farmshops/

![Map example](https://raw.githubusercontent.com/codeforkarlsruhe/direktvermarkter/master/img/direktvermarkter.png)

Features:
- Zeigt alle Punkte aus der DACH-Region mit verschiedenen Tags für Hofläden, Verkaufsautomaten und Märkten aus einem GeoJson export von OpenstreetMap an (über overpass-turbo.eu)
- Unterscheidet Automaten, Hofläden und Märkte durch unterschiedliche Marker
- Bereitet Daten auf, macht Links klickbar und übersetzt die häufigsten Begriffe
- Verlinkt von jedem Punkt auf die identischen Koordinaten auf openstreetmap.org, OpenRouteService und Google Maps
- Zeigt Punkte und Polygone gleichermaßen an. Polygone erhalten einen Pin in ihrem Zentrum.
- Permalinks in denen Ort und Zoomlevel weitergegeben werden können

## Popups
Die Anzeige der Daten im Popup wird in popupcontent.js definiert. Dort findet auch eine einfache Übersetzung einzelner Begriffe statt. 

## Datenabgleich
Die Daten stammen aus OSM und werden vom script update_data.js aktualisiert. Siehe dazu auch #6
Es ist ein node script, dass nach installation des Packets "query-overpass" mit "node update_data.js" ausgeführt werden kann.

Für ein konfortables Update mit automatischen Commit gibt es das shell script update.sh, das auf lange Sicht auch regelmäßig automatisch ausgeführt werden soll.

Das Script verwendet http://overpass-turbo.eu/ um diese Tags von OpenstreetMap zu ziehen:

- https://wiki.openstreetmap.org/wiki/DE:Tag:shop=farm
- https://wiki.openstreetmap.org/wiki/DE:Tag:amenity%3Dvending_machine
- https://wiki.openstreetmap.org/wiki/DE:Tag:amenity=marketplace

 Wobei vending machines indirekt über die Tags vending:milk und vending:food gezogen werden.

## ToDo (siehe auch Issues):
- Anzeige nur von gewünschten Datentypen
- Jetzt gerade offen-Funktion
- Suchfunktion
- Auswahlmöglichkeit für verschiedene Regionen
- Howto Datenpflege verbessern
- Möglichkeit neue Orte direkt eintragen zu können.



