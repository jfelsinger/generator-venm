/**
 * Controllers
 * Routes that manage controller methods
 */

var async = require('async'),
    express = require('express'),
    config = require('../config');

module.exports = function(app) {
    // Set opinionated defaults if the config has none for itself
    var defaultController = config.defaultController || 'index';
    var defaultMethod = config.defaultMethod || 'render';
    var router = express.Router();

    // Setup basic routes for requests that should be directed
    // to a particular controller & method.
    router.get('/', routeToController);
    router.get('/:page', routeToController);
    router.get('/:page/:id', routeToController);
    router.get('/:page/:method/:id', routeToController);

    // catch-all to include any extra data that a controller
    // might be expecting.
    //
    // req.params[0] starts at the first of the wild-cart params
    function routeToController(req, res, next) {
        var page = req.params.page || defaultController || '',
            method = req.params.id || req.params.method || '';

        try {
            var controller = require('../../app/controllers/' + page);
        } catch(e) {
            console.log('Bad request: ' + page);
            return next();
        }

        // Check for valid controller and method
        if (controller) {

            // Run the given method, if there is one
            if (method)
            {

                if (controller[method]) {
                    controller[method](req, res);
                } else {
                    console.log('Bad request: ' + page + '/' + method);
                    next();
                }

            // if not try to run the default instead
            } else {

                if (controller[defaultMethod]) {
                    controller[defaultMethod](req, res);
                } else {
                    console.log(
                        'Bad request: ' + page 
                        + ' doesn\' implement default method `' + defaultMethod 
                        + '`');
                    next(); // there is no  method, :(
                }
            }
        } else {
            // it was all a lie
            console.log('Bad request: ' + page);
            next();
        }
    }

    // Register routes
    app.use('/', router);
};
