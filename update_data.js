const query_overpass = require("query-overpass");
const fs = require("fs")
var today = new Date();
var hh = today.getHours();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd = '0'+dd
} 
if(mm<10) {
    mm = '0'+mm
} 
lastUpdate ='Letzter Datenabgleich: ' +dd + '.' + mm + '.' + yyyy +' ungefähr um ' +hh +' Uhr.';
console.log(lastUpdate)
let filename = "data/farmshopGeoJson.js"
let bbox = "46.51351558059737,4.2626953125,55.26659815231191,17.7978515625";
console.log('starting query for ' +filename)
console.log('bbox: ' +bbox)
let query = ` 
  [out:json][timeout:350];
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

// query overpass, write result to file
query_overpass(query, (error, data)  => {
    data = JSON.stringify(data , null, 0)
    console.log(data)
   fs.writeFile(filename, `var lastUpdate = "${lastUpdate}"; 
var farmshopGeoJson = ${data};` , ["utf-8"], (error, data) => {if (error) {console.log(error)}})
 }, {flatProperties: true}
)