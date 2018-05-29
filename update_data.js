const query_overpass = require("query-overpass");
const fs = require("fs")
const bbox = "46.51351558059737,4.2626953125,55.26659815231191,17.7978515625";

function mkdirSyncRecursive(directory) {
  var path = directory.replace(/\/$/, '').split('/');

  for (var i = 1; i <= path.length; i++) {
    var segment = path.slice(0, i).join('/');
    !fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
  }
}

function writeFileSync(path, data) {
  var filename=`${path}/details.json`
  fs.existsSync(filename) ? fs.appendFileSync(filename, data) : fs.writeFileSync(filename, data)
}

function getSimpleNode(node) {

  if ( node.properties )
        if (node.properties.shop === 'farm' && node.properties.amenity != 'vending_machine') {
            property = "farm"
        }
        else if (node.properties.amenity === 'marketplace') {
            property = "marketplace"
        }
        else if (node.properties.amenity === 'vending_machine') {
            property = "vending_machine"
        }
        else {
            property = "unknown"
        }
  else
     property = null
  geometry = node.geometry
  if (geometry && property )
    return simpleNode = {
        "type": "Feature",
        "properties": {
            "p": property,
            "id": node.id
        }, geometry
    }
  else
    return null
}

function removeDataDir(path) {
  if (!path || path === "/")
      return
  console.log(`Removing ${path}`)

  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        removeDataDir(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

removeDataDir("data/")

var today = new Date();
var hh = today.getHours();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0' + dd
} 
if(mm<10) {
    mm = '0' + mm
} 

lastUpdate ='Letzter Datenabgleich: ' + dd + '.' + mm + '.' + yyyy +' ungefähr um ' + hh +' Uhr.';

console.log(lastUpdate)
console.log('bbox: ' + bbox)

let query = ` 
  [out:json][timeout:250];
  // gather results
  (
  // query part for: “vending=milk”
  node["vending"="milk"](${bbox});
  way["vending"="milk"](${bbox});
  relation["vending"="milk"](${bbox});

  // query part for: “shop=farm”
  node["shop"="farm"](${bbox});
  way["shop"="farm"](${bbox});
  relation["shop"="farm"](${bbox});

  // query part for: “vending=food”
  node["vending"="food"](${bbox});
  way["vending"="food"](${bbox});
  relation["vending"="food"](${bbox});

  // query part for: “amenity=marketplace”
  node["amenity"="marketplace"](${bbox});
  way["amenity"="marketplace"](${bbox});
  relation["amenity"="marketplace"](${bbox});
  );

  // print results
  out center;
`;

// query overpass, write to folders by id
query_overpass(query, (error, data)  => {
  farmshopGeoJsonFeatures = []

    for (Item in data) {
      for (subItem in data[Item]) {
          node = data[Item][subItem]
          mkdirSyncRecursive(`data/${node.id}`)
          writeFileSync(`data/${node.id}`, JSON.stringify(node, null, 0))
          simpleNode = getSimpleNode(node)
          simpleNode ? farmshopGeoJsonFeatures.push(simpleNode) : null
      }
    }

  farmshopGeo = JSON.stringify({"type": "FeatureCollection","features": farmshopGeoJsonFeatures}, null, 0)
  fs.writeFileSync('data/farmshopGeoJson.js',  `var lastUpdate = "${lastUpdate}"; var farmshopGeoJson = ${farmshopGeo};`)

}, {flatProperties: true});
