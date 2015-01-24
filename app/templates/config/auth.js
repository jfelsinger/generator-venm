'use strict';

var debug = require('debug')('venm:routes:controllers');

module.exports = {

    /**
     * returns a middleware function that redirects if the request is
     * not authenticated
     */
    isLoggedIn: function isLoggedIn(redirectLocation) {
        redirectLocation = redirectLocation || '/';

        return function isLoggedInResult(req, res, next) {
            if (req.isAuthenticates()) {
                return next();
            }
            res.redirect(redirectLocation);
        }
    },

    /**
     * returns a middleware function that redirects if the request is
     * authenticated
     */
    isNotLoggedIn: function isNotLoggedIn(redirectLocation) {
        redirectLocation = redirectLocation || '/';

        return function isNotLoggedInResult(req, res, next) {
            if (!req.isAuthenticated()) {
                return next();
            }
            res.redirect(redirectLocation);
        };
    },
};
