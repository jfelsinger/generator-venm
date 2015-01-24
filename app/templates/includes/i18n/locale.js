/**
 * Locale
 *
 * Set the locale from the request
 */

var config = require('../config');

module.exports = function localeResponse(req, res, next) {

    'use strict';

    var locale = req.params.locale;

    if (locale && config.i18n && config.i18n.locales && 
        config.i18n.locales.indexOf(locale) !== -1)

        req.setLocale(locale);

    next();
};

