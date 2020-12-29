//Popups
function popupcontent(feature, layer) {

    var popupcontent = [];
    for (var prop in feature.properties) {


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
        else if (prop == "email" || prop == "contact:email") {
            popupcontent.unshift("<tr><td><strong>"
                + prop.replace("email", "E-Mail").replace("contact:", "") + ":</strong> </td><td>" + "<a target='_blank' rel='noopener' link href='mailto:"
                + feature.properties[prop] + "' target='_blank' rel='noopener'>"
                + feature.properties[prop] + "</a></td></tr>");
            console.log(prop + " " + feature.properties[prop] + " als Link Formatiert");
        }
        else if (prop == "phone" || prop == "contact:phone") {
            popupcontent.unshift("<tr><td><strong>"
                + prop.replace("email", "E-Mail").replace("contact:", "") + ":</strong> </td><td>" + "<a target='_blank' rel='noopener' link href='tel:"
                + feature.properties[prop] + "' target='_blank' rel='noopener'>"
                + feature.properties[prop] + "</a></td></tr>");
            console.log(prop + " " + feature.properties[prop] + " als Link Formatiert");
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
                    .replace("covered", "Überdacht")
                    .replace("lastcheck", "Letze Überprüfung")
                    .replace("source", "Quelle")
                    .replace("lunch", "Mittagstisch")                
                    .replace("start_date", "Geöffnet seit")
                              
                + ":</strong> </td><td>"
                + feature.properties[prop]
                    .replace(";", ", ")
                    .replace("yes", "ja")
                    .replace("only", "nur")
                    .replace("vending_machine", "Verkaufsautomat")
                    .replace("raw_milk", "Rohmilch")
                    .replace("eggs", "Eier")
                    .replace("meat", "Fleisch")
                    .replace("sausages", "Wurst")
                    .replace("vegetables", "Gemüse")
                    .replace("milk", "Milch")
                    .replace("cheese", "Käse")
                    .replace("butter", "Butter")
                    .replace("marketplace", "Marktplatz")
                    .replace("bread", "Brot")
                    .replace("food", "Lebensmittel")
                    .replace("drinks", "Getränke")
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

    function oefnungszeiten() {
        if (feature.properties["opening_hours"]) {

            var offen = "";

            try {
            var oh = new opening_hours(feature.properties["opening_hours"]);
            console.log("oh = " +oh.getState());

            if (oh.getState()){
                offen = "<br> <strong><span id='offen'>Wahrscheinlich gerade geöffnet</span></strong> "
            }
            else {
                offen = "<br> <strong><span id='geschlossen'>Wahrscheinlich gerade geschlossen</span></strong>"
            }
            }
            catch (err) {
                console.log("Fehler beim Öffnungsstatus von " +feature.properties["opening_hours"] +" " +err.message)
            }
            var oefnungszeiten = "<strong>Öffnungszeiten:</strong><br>" + feature.properties["opening_hours"] +offen;

        }
        else {
            var oefnungszeiten = "<strong>Öffnungszeiten:</strong><br>Unbekannt <p></p>";
        }
        return oefnungszeiten;
    }

    function headline() {
        var headline;
        if (feature.properties.name != undefined) {
            headline = feature.properties.name;
            return headline;
        }
        else if (feature.properties.name == undefined && feature.properties.shop == 'farm') {
            headline = "Hofladen"
            return headline;
        }
        else if (feature.properties.name == undefined && feature.properties.craft == 'beekeeper') {
            headline = "Imker"
            return headline;
        }
        else if (feature.properties.name == undefined && feature.properties.amenity == 'vending_machine') {
            headline = "Verkaufsautomat"
            return headline
        }
        else if (feature.properties.name == undefined && feature.properties.amenity == 'marketplace') {
            headline = "Markt"
            return headline
        }
        else {
            headline = feature.properties.name;
            return headline;
        }
    }

    var innereTabelle = popupcontent.join("");
    var htmlInhalt = "<div id='headline'><h1>" + headline() + "</h1></div>"
        + "<div id='wrapper'><div id='adress'>"
        + adress()
        + "</div><div id='links'>"
        + "<strong>Dieser Ort auf</strong><br>"
        + "<a target='_blank' rel='noopener' href='http://openstreetmap.org/" + feature.id + "'>OpenStreetMap</a>"
        + "<br><a target='_blank' rel='noopener' href='https://maps.openrouteservice.org/directions?n1=" + linkLong + "&n2=" + linkLat + "&n3=14&a=null,null," + linkLong + "," + linkLat + "&b=0&c=0&k1=en-US&k2=km'>Open Routeservice</a>"
        + "<br><a target='_blank' rel='noopener' href='http://maps.google.de/?q=" + linkLong + "," + linkLat + "'>Google Maps</a>"

        + "</div><div id='times'>"
        + oefnungszeiten()
        + "</div><div id='table'>"
        + "<table>"
        + "<th colspan='2'>Weitere Daten:</th>"
        + innereTabelle
        + "</table></div> <br>"
        + "<a target='_blank' rel='noopener' href='http://openstreetmap.org/edit?editor=id&" + feature.id.replace("/","=") + "' target='_blank' rel='noopener' class='popupbutton'>Auf OSM bearbeiten</a>" 
        +"<br>Die Daten werden regelmäßig abgeglichen.</p></div>";


    return htmlInhalt
};
