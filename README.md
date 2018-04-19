# Direktvermarkter Karte
Übersichtskarte von Hofläden, Milchautomaten und anderen Direktvermarktern aus der Region. Die Karte erhält alle ihre Daten von Openstreetmap, bereitet sie optisch auf und unterstützt die Pflege der Daten indem sie fehlende Werte sichtbar macht und direkt auf den entsprechenden Ort auf OSM zurück verlinkt.

Webseite: https://codeforkarlsruhe.github.io/direktvermarkter/

Mirrow: http://stefang.cepheus.uberspace.de/farmshops/

![Map example](https://raw.githubusercontent.com/codeforkarlsruhe/direktvermarkter/master/img/direktvermarkter.png)

Features:
- Zeigt alle Punkte aus der Region Karlsruhe mit dem Wert shop:farm aus einem GeoJson export von Openstreetmap an (von overpass-turbo.eu)
- Unterscheidet Automaten und Hofläden durch grüne und blaue Marker
- Bereitet Daten auf, macht Links klickbar und Übersetzt die häufigsten Begriffe
- Verlinkt von jedem Punkt auf die identischen Koordinaten auf openstreetmap.org, OpenRouteService und Google Maps
- Zeigt Punkte und Polygone gleichermaßen an. Polygone erhalten einen Pin in ihrem Zentrum.

## Datenabgleich
Die Daten stammen aus OSM und werden vom script update_data.js aktualisiert. Siehe dazu auch #6
Es ist ein node script, dass nach instalation des Packets "query-overpass" mit "node update_data.js" ausgeführt werden kann.

Hier ein Einzeiler zum Updaten und Veröffentlichen der Daten:

> cde [PFAD]/direktvermarkter/ && node update_data.js && git add . && git commit -m "autom. Datenupdate" && git push origin master

Das Script verwendet http://overpass-turbo.eu/ um diese Tags von Openstreetmap zu ziehen:

- https://wiki.openstreetmap.org/wiki/DE:Tag:shop=farm
- https://wiki.openstreetmap.org/wiki/DE:Tag:amenity%3Dvending_machine
 Wobei vending machines indirekt über die Tags vending:milk und vending:food gezogen werden.

ToDo (siehe auch Issues):
- Impressum, Infos, Links auf codefor und GitHub usw. 
- Suchfunktion
- Auswahlmöglichkeit für verschiedene Regionen
- dynamische Zentrierung der Karte


<h2>Forks:</h2>
<b>Metropolregion Nürnberg</b>

- https://markus-bb.github.io/direktvermarkter/
- https://github.com/markus-bb/direktvermarkter