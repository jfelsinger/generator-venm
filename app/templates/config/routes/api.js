'use strict';
/**
 * API
 * Routes that manage API methods
 */

var async = require('async'),
    express = require('express');

module.exports = function(app) {
    var router = express.Router();

    var tests = require('../../app/api/test');

    // Test routes
    // -----------------------------------------
    router.route('/tests')
        .get(tests.get);

    app.use('/api', router);
};
