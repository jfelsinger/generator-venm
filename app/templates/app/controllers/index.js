/**
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore');

exports.render = function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.json([
        { username: 'uName1' },
        { username: 'uName2' },
        { username: 'uName3' }
    ]);
}
