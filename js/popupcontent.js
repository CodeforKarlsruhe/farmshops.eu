//Popups
function popupcontent(feature, layer) {

  feature["opening_state"] = "unknown";

  if (feature.opening_hours !== "Unbekannt") {

<<<<<<< HEAD
    // Input node/123457890
    // Capitalize first letter and concat digits
    // Result osm_type+osm_id = N12345789
    var osm_ids = feature.id.split('/');
    var osm_type = osm_ids[0][0].toUpperCase();
    var osm_id = osm_ids[1];
=======
        if (prop == "id" || prop == "shop" || prop == "name" || prop == "addr:city" || prop == "addr:country" || prop == "addr:housenumber" || prop == "addr:postcode" || prop == "addr:suburb" || prop == "addr:street" || prop == "opening_hours" || prop == "image") {
            console.log(prop + " " + feature.properties[prop] + " in Tabelle unsichtbar");
            //do nothing
        }
        else if (prop == "website" || prop == "contact:website" || prop == "url" || prop == "contact:facebook" || prop == "contact:youtube" || prop == "contact:twitter") {
            popupcontent.unshift("<tr><td><strong>"
                + prop.replace("website", "Internetseite").replace("contact:", "") + ":</strong> </td><td>" + "<a target='_blank' rel='noopener' link href='"
                + feature.properties[prop] + "' target='_blank' rel='noopener'>"
                + feature.properties[prop] + "</a></td></tr>");
            console.log(prop + " " + feature.properties[prop] + " als Link Formatiert");
        }
        else if (prop == "fixme") {
            popupcontent.push("<tr><td><strong>"
                + prop.replace("fixme", "Unklare Daten") + ":</strong> </td><td>"
                + feature.properties[prop].replace("position estimated", "Position geschätzt")
                + " <a target='_blank' rel='noopener' href='http://openstreetmap.org/" + feature.id + "'> Daten Verbessern</a>");
            console.log(prop + " " + feature.properties[prop] + " (fixme)");
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
                    .replace("produce", "Produzieren")
                    .replace("product", "Produkt(e)")
                    .replace("contact", "")
                    .replace("suburb", "Bezirk")
                    .replace("description", "Beschreibung")
                    .replace("building", "Gebäude")
                    .replace("wheelchair", "Rollstuhlgerecht")
                    .replace("payment coins", "Nimmt Münzen")
                    .replace("payment notes", "Nimmt Scheine")
                    .replace("payment cash", "Nimmt Bargeld")
                    .replace("vending", "Verkauft")
                    .replace("amenity", "Einrichtung ")
                    .replace("country", "Land")
                    .replace("houseName", "Hausname")
                    .replace("milk", "Milch")
                    .replace("covered", "Überdacht")
                    .replace("lastcheck", "Letze Überprüfung")
                    .replace("source", "Quelle")

                + ":</strong> </td><td>"
                + feature.properties[prop]
                    .replace(";", ", ")
                    .replace("yes", "ja")
                    .replace("only", "nur")
                    .replace("vending_machine", "Verkaufsautomat")
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

    function giveWhenExist (x){
        var y ="";
        if (x!=undefined){
            return x;
        }
        else {
            return y;
        }
    }

    function adress() {
            var adresse = "<strong>Adresse:</strong><br>"
                + giveWhenExist(feature.properties["addr:street"]) + " " + giveWhenExist(feature.properties["addr:housenumber"])
                + "<br>" + giveWhenExist(feature.properties["addr:postcode"]) + " " + giveWhenExist(feature.properties["addr:city"])
                + "<br>" + giveWhenExist(feature.properties["addr:place"]);
                console.log(adresse)

        if (adresse==="<strong>Adresse:</strong><br> <br> <br>"){
            adresse = "<strong>Adresse:</strong><br>Unbekannt <br> <br>"
        };
        return adresse;
    }
>>>>>>> e8678e7c3ee013da311017303c70b8aa6c6329db

    $.ajax({
        url: `https://nominatim.openstreetmap.org/lookup?format=json&osm_ids=${osm_type}${osm_id}`,
        dataType: 'json',
        async: false,
        success: function(data) {
            var oh = new opening_hours(feature.opening_hours, data);
            console.log("oh = " + oh.getState());

            try {

              if ( oh.getState() ) {
                feature["opening_state"] = "open";
              } else {
                feature["opening_state"] = "closed";
              }

            } catch (err) {
              console.log("Fehler beim Öffnungsstatus von " + err.message);
            }
        }
    });

  }

  var popupcontenttmpl = $.templates("#popupcontenttmpl");
  return popupcontenttmpl.render(feature);
};
