var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    config = require('./config');

module.exports = function(app) {
    app.set('showStackError', true);

    // No logger on test environment
    if (process.env.NODE_ENV !== 'test') {
        app.use(express.logger('dev'));
    }

    app.enable("jsonp callback");

    app.configure(function() {
        app.use(express.cookieParser());
        app.use(express.methodOverride());

        // express/mongo setup for 
        // storing session data
        app.use(express.session({
            secret: 'VENM',
            store: new mongoStore({
                url: config.db,
                collection: 'sessions'
            })
        }));

        // Continue to routing, 
        app.use(app.router);
    });

    // 500 Error
    app.use(function(err, req, res, next) {

        // If page not found continue to the
        // 404 handling middleware
        if (~err.message.indexOf('not found')) return next();

        // log
        console.error(err.stack);

        // send response
        res.status(500).json({
            code: 500,
            error: err.stack
        });

    });
    
    // Send 404 error
    app.use(function(req, res, next) {

        // send response
        res.status(404).json({ 
            code: 404,
            error: 'Not Found'
        });

    });
}
