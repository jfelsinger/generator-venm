/**
 * lib.js
 *
 * Client function and values that can be used
 * note: global functions should be kept in the `lib` folder
 */

'use strict';
/* jslint browser: true */

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

module.exports.respond = require('../../lib/respond');
module.exports.parameters = parameters;
