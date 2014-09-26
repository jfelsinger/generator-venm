/**
 * lib.js
 *
 * Global function and values that can be used throughout the application
 */

'use strict'
/* jslint browser: true */

var config = require('./config'),
    request = require('superagent');

var parameters = window.location.pathname.split('/').slice(1);

/**
 * public string getQueryValue([string] name)
 *
 * Returns the value of the query parameter given
 */
module.exports.getQueryValue = function getQueryValue(name) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] == name) return pair[1];
    }
};

/**
 * public void respond([func] cb)
 *
 * Run a cb if the response was a success
 */
module.exports.respond(cb) {
    return function(err, res) {
        if (err) return console.log(err);

        if (res.ok) {
            cb(err, res);
        } else {
            console.log(res);
        }
    };
}

module.exports.parameters = parameters
