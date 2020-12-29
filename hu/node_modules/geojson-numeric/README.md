geojson-numeric
===============

Makes properties of geojson features numeric

    … "properties": { "population": "265778" } …
         ↓     ↓    ↓    ↓    ↓    ↓    ↓    
    … "properties": { "population": 265778 } …

[![Build Status](https://secure.travis-ci.org/tyrasd/geojson-numeric.png)](https://travis-ci.org/tyrasd/geojson-numeric)

Usage
-----

* as a command line tool:
  
        $ npm install -g geojson-numeric
        $ geojson-numeric file.geojson > file_numeric.geojson
  
* as a nodejs library:
  
        $ npm install geojson-numeric
  
        var numerify = require('geojson-numeric');
        numerify(geojson_data);
  
