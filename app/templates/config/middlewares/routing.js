/**
 * Routing
 * Setup request routing
 */

module.exports = function(app, passport) {

    // Routes handling authorization
    require('../routes/auth')(app, passport);

    // Routes handling application controllers
    require('../routes/controllers')(app);

    // Routes handling api requests
    require('../routes/api')(app);

    // Routes handling static assets
    require('../routes/static')(app);

};
