/**
 * Routing
 * Setup request routing
 */

module.exports = function(app, passport) {

    'use strict';

    // Allow all domains
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });


    // ==== Process Routes ====

    // Routes handling static assets
    require('../routes/static')(app);

    // Routes handling authorization
    require('../routes/auth')(app, passport);

    // Routes handling api requests
    require('../routes/api')(app);

    // Routes handling application controllers
    require('../routes/controllers')(app);

};
