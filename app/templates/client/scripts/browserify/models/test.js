/**
 * test.js
 *
 * Functions for making api calls for test objects
 */

'use strict';
/* jslint browser: true */

var config = require('../config'),
    lib = require('../lib'),
    request = require('superagent');

// Test specific methods
module.exports = {

    getAll: function getAll(cb) {
        request
            .get(config.apiUrl + 'tests')
            .end(lib.respond(cb));
    }

};
