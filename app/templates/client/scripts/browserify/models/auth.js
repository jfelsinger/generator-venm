/**
 * auth.js
 *
 * Functions for making api calls for authentication
 */

'use strict';
/* jslint browser: true */

var config = require('../config'),
    lib = require('../lib'),
    request = require('superagent');
var url = 'http://localhost:3000/';

module.exports = {
    register: function register(data, cb) {
        request
            .post(url + 'auth/register')
            .send(data)
            .end(lib.respond(cb));
    },

    login: function register(data, cb) {
        request
            .post(url + 'auth/login')
            .send(data)
            .end(lib.respond(cb));
    },
};
