/**
 * Static
 * Routes that manage static methods
 */

var express = require('express'),
    config = require('../config');

module.exports = function(app) {
    var staticFiles = config.staticFiles || 'client';

    // Static client scripts
    app.use('/', express.static(__dirname + '/../../' + staticFiles));
    app.use(express.static(__dirname + '/../../' + staticFiles));
};
