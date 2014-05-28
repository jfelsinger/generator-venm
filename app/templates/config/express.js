var express = require('express'),
    morgan = require('morgan'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    mongoStore = require('connect-mongo')(session);

var config = require('./config');

module.exports = function(app) {
    app.set('showStackError', true);

    // No logger on test environment
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));
    }

    app.enable("jsonp callback");

    app.use(cookieParser());
    app.use(methodOverride());

    // express-session/mongo setup for 
    // storing session data
    app.use(session({
        secret: 'VENM',
        store: new mongoStore({
            url: config.db,
            collection: 'sessions'
        })
    }));

    // Continue to routing, 
    require('./routes')(app);

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
