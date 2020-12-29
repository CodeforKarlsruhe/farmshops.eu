function numeric( geojson, recursive ) {
  
  function isNumeric(n) {
    return !Array.isArray(n) && !isNaN(parseFloat(n)) && isFinite(n);
  }

  var features;
  if (geojson.type === "FeatureCollection")
    features = geojson.features;
  else if (geojson.type === "Feature")
    features = [geojson];
  else
    features = [{type:"Feature", properties: {}, geometry: geojson}];

  function toNumeric(obj) {
    for (var key in obj) {
      if (isNumeric(obj[key]))
        obj[key] = parseFloat(obj[key]);
      else if (recursive && typeof obj[key] === "object")
        toNumeric(obj[key]);
    }
  }
  features.forEach(function mapFeature(f) {
    toNumeric(f.properties);
  });

  return geojson;
};

module.exports = numeric;
