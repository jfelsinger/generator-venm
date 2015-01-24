'use strict';
/* jslint latedef:false */
/**
 * Controllers
 * Routes that manage controller methods
 */

var debug = require('debug')('venm:routes:controllers');

var async = require('async'),
    express = require('express'),
    fs = require('fs'),
    config = require('../config'),
    parallel = require(config.root + '/lib/parallel');

module.exports = function(app) {
    // Set opinionated defaults if the config has none for itself
    var defaultController = config.defaultController || 'index';
    var defaultMethod = config.defaultMethod || 'render';
    var router = express.Router();
    var auth = require('../auth');
    var dataLoaders = [
        require('../middlewares/data/page'),
    ];

    router.param(function(name, fn) {
        if (fn instanceof RegExp) {
            return function(req, res, next, val) {
                var captures = fn.exec(String(val));
                if (captures) {
                    req.params[name] = capture;
                    next();
                } else {
                    next('route');
                }
            };
        }
    });

    router.use(require('../middlewares/result-data'));

    router.param('id', /^\d+$/);
    router.param('method', /^[a-zA-Z_]$/);

    // Setup basic routes for requests that should be directed
    // to a particular controller & method.
    router.get('/:page/:method/:id?/:__x?', routeToController());
    router.get('/:page/:id?/:__x?', routeToController());
    router.get('/', routeToController());

    // catch-all to include any extra data that a controller
    // might be expecting.
    //
    // req.params[0] starts at the first of the wild-cart params
    function routeToController(appPath) {
        appPath = appPath || '';
        if (appPath.length && appPath[appPath.length - 1] !== '/')
            appPath += '/';

        return function(req, res, next) {
            var page = req.params.page || defaultController || '',
                method = req.params.id || req.params.method || '',
                controllerPath = config.root + '/app/controllers/' + appPath + page,
                controller = null;

            if (fs.existsSync(controllerPath + '.js')) {
                controller = require('../../app/controllers/' + page);
            } else {
                debug('1. Bad request: ' + page);
                return next();
            }

            // Check for valid controller and method
            if (controller) {

                // Run the given method, if there is one
                if (method)
                {

                    if (controller[method]) {
                        parallel(dataLoaders)(req, res, function() {
                            controller[method](req, res, next);
                        });
                    } else {
                        debug('2. Bad request: ' + page + '/' + method);
                        next();
                    }

                // if not try to run the default instead
                } else {

                    if (controller[defaultMethod]) {
                        parallel(dataLoaders)(req, res, function() {
                            controller[defaultMethod](req, res, next);
                        });
                    } else {
                        debug(
                            'Bad request: ' + page 
                            + ' doesn\' implement default method `' + defaultMethod 
                            + '`');
                        next(); // there is no  method, :(
                    }
                }
            } else {
                // it was all a lie
                debug('3. Bad request: ' + page);
                next();
            }
        };
    }

    // Register routes
    app.use('/', router);
};
