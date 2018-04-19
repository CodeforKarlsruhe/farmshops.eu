const query_overpass = require("query-overpass");
const fs = require("fs")

let filename = "data/karlsruhe.js"

let query = ` 
  [out:json][timeout:25];
  // gather results
  (
  // query part for: “vending=milk”
  node["vending"="milk"](48.52388120259336,7.6519775390625,49.66407240384585,9.53887939453125);
  way["vending"="milk"](48.52388120259336,7.6519775390625,49.66407240384585,9.53887939453125);
  relation["vending"="milk"](48.52388120259336,7.6519775390625,49.66407240384585,9.53887939453125);
  // query part for: “shop=farm”
  node["shop"="farm"](48.52388120259336,7.6519775390625,49.66407240384585,9.53887939453125);
  way["shop"="farm"](48.52388120259336,7.6519775390625,49.66407240384585,9.53887939453125);
  relation["shop"="farm"](48.52388120259336,7.6519775390625,49.66407240384585,9.53887939453125);
  // query part for: “vending=food”
  node["vending"="food"](48.52388120259336,7.6519775390625,49.66407240384585,9.53887939453125);
  way["vending"="food"](48.52388120259336,7.6519775390625,49.66407240384585,9.53887939453125);
  relation["vending"="food"](48.52388120259336,7.6519775390625,49.66407240384585,9.53887939453125);
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
