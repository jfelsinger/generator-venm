/**
 * auth.js
 *
 * Functions for making api calls for authentication
 */

'use strict';
/* jslint browser: true */

var lib = require('../lib'),     // I have no idea why this shouldn't be '../lib'
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
