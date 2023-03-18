#!/usr/local/bin/node
const query_overpass = require("query-overpass");
const fs = require("fs");

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
    // ...
}

function removeDataDir(path) {
    // ...
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

const vendings = [
    "milk", "egg", "food", "tomato", "cheese",
    "sausage", "potato", "noodle", "meat",
    "honey", "fruit"
];

let query = `
[out:json][timeout:742];
area["ISO3166-1"="DE"]->.germany;
area["ISO3166-1"="AT"]->.austria;
area["ISO3166-1"="CH"]->.switzerland;
(
  nwr[vending~"${vendings.join("|")}"][vending!=animal_food][operator!~"[Ss]electa"](area.germany);
  nwr[amenity=marketplace](area.germany);
  nwr[shop=farm](area.germany);
  nwr[craft=beekeeper](area.germany);

  nwr[vending~"${vendings.join("|")}"][vending!=animal_food][operator!~"[Ss]electa"](area.austria);
  nwr[amenity=marketplace](area.austria);
  nwr[shop=farm](area.austria);
  nwr[craft=beekeeper](area.austria);

  nwr[vending~"${vendings.join("|")}"][vending!=animal_food][operator!~"[Ss]electa"](area.switzerland);
  nwr[amenity=marketplace](area.switzerland);
  nwr[shop=farm](area.switzerland);
  nwr[craft=beekeeper](area.switzerland);
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
