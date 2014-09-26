/**
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore');

exports.render = function(req, res) {
    'use strict';

    var data = {
        vm: 'index',
        user: req.user
    };
    
    res.render('index.html', data);

    res.json([
        { username: 'uName1' },
        { username: 'uName2' },
        { username: 'uName3' }
    ]);
}
