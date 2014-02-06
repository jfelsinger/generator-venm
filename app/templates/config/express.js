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

        //express/mongo session storage
        app.use(express.session({
            secret: 'VENM',
            store: new mongoStore({
                url: config.db,
                collection: 'sessions'
            })
        }));

        app.use(app.router);
    });

    app.use(function(err, req, res, next) {
        if (~err.message.indexOf('not found')) return next();

        // log
        console.error(err.stack);

        // response
        res.status(500).json({
            code: 500,
            error: err.stack
        });

    });
    
    app.use(function(req, res, next) {
        res.status(404).json({ 
            code: 404,
            error: 'Not Found'
        });
    });
}
