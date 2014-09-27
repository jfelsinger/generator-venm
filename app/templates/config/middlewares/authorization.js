/**
 * Authorization
 *
 * Methods to handle registration and authorization of users through different
 * services, a.k.a. goodle, facebook, etc.
 */
'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Registers a new local user
 */
module.exports.localRegister = function(req, email, password, done) {
    User.findOne({ 'email': email }, function(err, user) {
        if (err) return done(err);

        if (user) {
            return done(
                null, 
                false, 
                { message: 'A user with that email already exists.' }
            );
        } else {
            var newUser = new User();

            newUser.username = req.body.username;
            newUser.email = email;
            newUser.password = password;

            newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
            });
        }
    });
};

/**
 * Authenticates a user locally, or creates a new user if one doesn't exist
 */
module.exports.localLogin = function(req, email, password, done) {
    User.findOne({ 'email': email }, function(err, user) {
        if (err) return done(err);

        if (!user || !user.authenticate(password)) {
            return done(null, false, { message: 'Wrong email or password.' });
        }

        return done(null, user);
    });
};

/**
 *  
 * Autenticates a twitter user, or creates a new user if one doesn't exist
 */
module.exports.twitter = function(token, secret, profile, done) {
    findAuthenticatedUser('twitter', profile, function(newUser) {
        newUser.twitter.token = token;
    }, done);
};

/**
 *  
 * Autenticates a facebook user, or creates a new user if one doesn't exist
 */
module.exports.facebook = function(accessToken, refreshToken, profile, done) {
    findAuthenticatedUser('facebook', profile, function(newUser) {
        newUser.facebook.token = accessToken;
        newUser.facebook.refreshToken = refreshToken;
    }, done);
};

/**
 *  
 * Autenticates a google user, or creates a new user if one doesn't exist
 */
module.exports.google = function(identifier, profile, done) {
    findAutenticatedUser('google', profile, function(newUser) {
        newUser.google.token = identifier;
    }, done);
};

/**
 * Autenticates a github user, or creates a new user if one doesn't exist
 */
module.exports.github = function(accessToken, refreshToken, profile, done) {
    findAutenticatedUser('github', profile, function(newUser) {
        newUser.github.token = accessToken;
        newUser.github.refreshToken = refreshToken;
    }, done);
};

/**
 * Tries to find a user given a profile and a provider
 */
function findAuthenticatedUser(provider, profile, cb, done) {
    var search = {};
    search[provider + '.id'] = profile.id;

    User.findOne(search, function(err, user) {

        if (err) return done(err);

        if (user) {
        } else { 
            // User doesn't exist, create it.
            var newUser = new User();

            newUser.provider = provider;
            newUser[provider] = profile;

            cb(newUser);

            newUser.save(function(err) {
                if (err) throw err;
                done(null, newUser);
            });
        }
    });
};
