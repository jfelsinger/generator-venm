var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    session = require('express-session'),
    parallel = require('../lib/parallel'),<% if (includes.i18n) { %>
    i18n = require('i18n'),<% } %>
    passport = require('passport');

var config = require('./config');

module.exports = function(app) {

    app.set('showStackError', true);

    // No logger on test environment
    if (process.env.NODE_ENV !== 'production') {
        app.use(morgan('dev'));
    }

    app.enable("jsonp callback");

    app.use(parallel([
        cookieParser(config.secret),
        session({
            secret: config.secret,
            resave: false,
            saveUninitialized: false
        })
    ]));


<% if (includes.i18n) { %>
    // i18n configuration after cookie-parser loaded
    require('./middlewares/i18n')(app);
<% } %>

    app.use(parallel([
        flash(),
        methodOverride(),<% if (includes.i18n) { %>
        i18n.init,<% } %>
    ]));

    // Setup view engine
    require('./middlewares/views')(app);

    // parse application/json requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Setup passport
    require('./middlewares/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());

    // Continue to routing, 
    require('./middlewares/routing')(app, passport);

    // Error handling
    require('./middlewares/errors')(app);
}
