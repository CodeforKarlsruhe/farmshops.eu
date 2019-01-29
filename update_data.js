#!/usr/local/bin/node
const query_overpass = require("query-overpass");
const fs = require("fs");
const bbox = "46.51351558059737,4.2626953125,55.26659815231191,17.7978515625";

function mkdirSyncRecursive(directory) {
    const path = directory.replace(/\/$/, "").split("/");

    for (let i = 1; i <= path.length; i++) {
        const segment = path.slice(0, i).join("/");
        !fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
    }
}

function writeFileSync(path, data) {
    const filename=`${path}/details.json`;
    fs.existsSync(filename) ? fs.appendFileSync(filename, data) : fs.writeFileSync(filename, data);
}

function getSimpleNode(node) {

  if (node.properties)
        if (node.properties.shop === "farm" && node.properties.amenity != "vending_machine") {
            property = "farm";
            console.log("farm");
        }
        else if (node.properties.craft === "beekeeper" && node.properties.shop != "farm" && node.properties.amenity != "vending_machine") {
            property = "beekeeper";
            console.log("beekeeper");
        }
        else if (node.properties.amenity === "marketplace" && node.properties.shop != "farm" && node.properties.amenity != "vending_machine") {
            property = "marketplace";
            console.log("marketplace");
        }
        else if (node.properties.amenity === "vending_machine"&& node.properties.shop != "farm" && node.properties.amenity != "marketplace") {
            property = "vending_machine";
            console.log("vending_machine");
        }
        else if (node.properties.amenity === "vending_machine") {
            property = "vending_machine";
            console.log("vending_machine");
      }
        else {
            property = "unknown";
            console.log("unknown");
      }
        else
            property = null;
            geometry = node.geometry;
            if (geometry && property)
              return simpleNode = {
                "type": "Feature",
                "properties": {
                  "p": property,
                  "id": node.id
                }, geometry
              };
            else
            return null;
}

function removeDataDir(path) {
    if (!path || path === "/") {
        return console.log(`Removing ${path}`);
    }

    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = `${path}/${file}`;
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                removeDataDir(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

removeDataDir("data/");

const today = new Date();
const hh = today.getHours();
let dd = today.getDate();
let mm = today.getMonth() + 1; // January is 0!
const yyyy = today.getFullYear();

if (dd < 10) {
    dd = `0${dd}`;
}
if (mm < 10) {
    mm = `0${mm}`;
}

const lastUpdate = `Letzter Datenabgleich: ${dd}.${mm}.${yyyy} ungefähr um ${hh} Uhr.`;

console.log(lastUpdate);
console.log(`bbox: ${bbox}`);

const vendings = [
    "milk", "egg", "food", "tomato", "cheese",
    "sausage", "potato", "noodle", "meat",
    "honey", "fruit"
];

let query = `
    [out:json][timeout:742][bbox:${bbox}];
    (
      nwr[vending~"${vendings.join("|")}"][vending!=animal_food][operator!~"[Ss]electa"];

      nwr[amenity=marketplace];

      nwr[shop=farm];

      nwr[craft=beekeeper];
    );
    out center;
`;

// query overpass, write to folders by id
query_overpass(query, (error, data)  => {
    const farmshopGeoJsonFeatures = [];

      for (Item in data) {
          for (subItem in data[Item]) {
              const node = data[Item][subItem];
              mkdirSyncRecursive(`data/${node.id}`);
              writeFileSync(`data/${node.id}`, JSON.stringify(node, null, 0));
              const simpleNode = getSimpleNode(node);
              simpleNode ? farmshopGeoJsonFeatures.push(simpleNode) : null;
          }
      }

    const farmshopGeo = JSON.stringify({"type": "FeatureCollection","features": farmshopGeoJsonFeatures}, null, 0);
    fs.writeFileSync("data/farmshopGeoJson.js",  `var lastUpdate = "${lastUpdate}"; var farmshopGeoJson = ${farmshopGeo};`);

}, {flatProperties: true});
