'use strict';
/**
 * i18n
 * Enable support for i18n
 */

var i18n = require('i18n'),
    hbs = require('hbs'),
    config = require('../config');

module.exports = function() {

    // Configure i18n
    var i18nConfiguration = config.i18n || {
        locales: ['en'],
        cookie: 'locale',
    };

    i18nConfiguration.objectNotation = true;
    i18nConfiguration.directory = __dirname + '/../i18n';
    i18n.configure(i18nConfiguration);

    // Register helper functions to hbs
    hbs.registerHelper('__', function() {
        return i18n.__.apply(this, arguments);
    });

    hbs.registerHelper('__n', function() {
        return i18n.__n.apply(this, arguments);
    });
};
