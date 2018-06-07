//Popups
function popupcontent(feature, layer) {

  var popupcontenttmpl = $.templates("#popupcontenttmpl");

  feature["open"] = "unkown"
  if (feature.opening_hours !== "Unbekannt") {
    var nom = { "address" : feature.address }
    var oh = new opening_hours(feature.opening_hours, nom);

    console.log("oh = " +oh.getState());

    try {
      if (oh.getState()){
        feature["open"] = "open"
      } else {
        feature["open"] = "closed"
      }
    } catch (err) {
      console.log("Fehler beim Öffnungsstatus von " +feature.properties["opening_hours"] +" " +err.message)
    }
  }

  return popupcontenttmpl.render(feature);
};
