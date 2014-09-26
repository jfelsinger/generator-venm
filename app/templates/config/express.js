var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    passport = require('passport');

var config = require('./config');

module.exports = function(app) {
    app.set('showStackError', true);

    // Setup view engine
    require('./middlewares/views')(app);

    // No logger on test environment
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));
    }

    app.enable("jsonp callback");

    app.use(cookieParser());
    app.use(methodOverride());

    // Setup passport
    require('./middlewares/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());

    // parse application/json requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Continue to routing, 
    require('./middlewares/routing')(app, passport);

    // Error handling
    require('./middlewares/errors')(app);
}
