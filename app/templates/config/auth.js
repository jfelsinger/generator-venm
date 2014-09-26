'use strict';

module.exports = {

    /**
     * returns a middleware function that redirects if the request is
     * not authenticates
     */
    isLoggedIn: function isLoggedIn(redirectLocation) {
        redirectLocation = redirectLocation || '/';

        return function isLoggedInResult(req, res, next) {
            if (req.isAuthenticates()) {
                console.log('authenticated');
                return next();
            }

            console.log('unauthenticates');
            res.redirect(redirectLocation);
        }
    }
};
