const query_overpass = require("query-overpass");
const fs = require("fs")

let filename = "data/karlsruhe.js"
let bbox = "48.52388120259336,7.6519775390625,49.66407240384585,9.53887939453125";
console.log('starting query for ' +filename)
console.log('bbox: ' +bbox)
let query = ` 
  [out:json][timeout:25];
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
  out body;
  >;
  out skel qt;
`;

// query overpass, write result to file
query_overpass(query, (error, data)  => {
    data = JSON.stringify(data)
    fs.writeFile(filename, `var karlsruhe = ${data};` , ["utf-8"], (error, data) => {if (error) {console.log(error)}})
  }, {flatProperties: true}
)
