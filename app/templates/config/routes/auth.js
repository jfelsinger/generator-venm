/**
 * Auth
 * Routes that manage auth methods
 */

var async = require('async'),
    express = require('express'),
    config = require('../config');

module.exports = function(app, passport) {
    var router = express.Router();

    // Register routes for local authentication
    router.use('/register', passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }));

    router.use('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }));

    router.use('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // Register routes for google authentication
    router.use('/google', passport.authenticate('google'));
    router.use('/google/callback', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }));

    // Register routes for facebook authentication
    router.use('/facebook', passport.authenticate('facebook'));
    router.use('/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }));

    // Register routes for twitter authentication
    router.use('/twitter', passport.authenticate('twitter'));
    router.use('/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }));

    // Register routes for github authentication
    router.use('/github', passport.authenticate('github'));
    router.use('/github/callback', passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }));

    app.use('/auth', router);
};
