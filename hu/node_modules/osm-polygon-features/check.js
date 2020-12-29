#!/usr/bin/env node

var jsonschema = require('jsonschema'),
    data = require('./polygon-features.json'),
    schema = require('./schema.json')


function validate(instance, schema) {
    var result = jsonschema.validate(instance, schema).errors
    if (result.length) {
        result.forEach(function(error) {
            if (error.property) {
                console.error(error.property + ' ' + error.message)
            } else {
                console.error(error)
            }
        })
        process.exit(1)
    }
}

validate(data, schema)

