# Direktvermarkter Karte
Übersichtskarte von Hofläden, Milchautomaten und anderen Direktvermarktern aus der Region. Die Karte erhält alle ihre Daten von Openstreetmap, bereitet sie optisch auf und unterstützt die Pflege der Daten indem sie fehlende Werte sichtbar macht und direkt auf den entsprechenden Ort auf OSM zurück verlinkt.

Webseite: https://codeforkarlsruhe.github.io/direktvermarkter/

Mirrow: http://stefang.cepheus.uberspace.de/farmshops/

![Map example](https://raw.githubusercontent.com/codeforkarlsruhe/direktvermarkter/master/img/direktvermarkter.png)

Features:
- Zeigt alle Punkte aus der Region Karlsruhe mit dem Wert shop:farm aus einem GeoJson export von Openstreetmap an (von overpass-turbo.eu)
- Bereitet Daten auf, macht Links klickbar und Übersetzt die häufigsten Begriffe
- Verlinkt von jedem Punkt auf die identischen Koordinaten auf openstreetmap.org, OpenRouteService und Google Maps
- Zeigt Punkte und Polygone gleichermaßen an. Polygone erhalten einen Pin in ihrem Zentrum.

ToDo (siehe auch Issues):
- mehr Glitzer / Design (schönere Pins, Anzeige der Daten, Fonts,...)
- Impressum, Infos, Links auf codefor und GitHub usw. 
- Script für automatischen Datenabgleich zwischen OSM und Webseite schreiben
- Suchfunktion
- Auswahlmöglichkeit für verschiedene Regionen
- dynamische Zentrierung der Karte


<h2>Forks:</h2>
<b>Metropolregion Nürnberg</b>

- https://markus-bb.github.io/direktvermarkter/
- https://github.com/markus-bb/direktvermarkter