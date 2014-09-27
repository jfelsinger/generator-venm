/**
 * Mongo
 * Setup mongo store
 */

var session = require('express-session'),
    mongoStore = require('connect-mongo')(session);

var config = require('../config');

module.exports = function(app) {

    // express-session/mongo setup for 
    // storing session data
    app.use(session({
        secret: 'VENM',
        store: new mongoStore({
            url: config.db,
            collection: 'sessions'
        })
    }));
};
