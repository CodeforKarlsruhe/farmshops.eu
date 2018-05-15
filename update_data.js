const query_overpass = require("query-overpass");
const turf = require ("turf");
const fs = require("fs")
let test
let filename = "data/karlsruhe.js"
let bbox = "46.51351558059737,4.2626953125,55.26659815231191,17.7978515625";
console.log('starting query for ' +filename)
console.log('bbox: ' +bbox)
let query = ` 
  [out:json][timeout:205];
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
  );
  // print results
  out center;
`;

// query overpass, write result to file
query_overpass(query, (error, data)  => {
    data = JSON.stringify(data , null, 0)
    console.log(data)
   fs.writeFile(filename, `var karlsruhe = ${data};` , ["utf-8"], (error, data) => {if (error) {console.log(error)}})
 }, {flatProperties: true}
)

