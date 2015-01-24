<% if (includes.i18n) { %>
var i18n = require('i18n');<% } %>

/**
 * Data/Page
 * Adds page data to the result
 */
module.exports = function(req, res, next) {
    'use strict';

    // Default page data
    res.data.page = {
        title: <% if (includes.i18n) { %>i18n.__('page.default.title'),
        <% } else { %>'page title',
        <% } %>
        description: <% if (includes.i18n) { %>i18n.__('page.default.description'),
        <% } else { %>'page description',
        <% } %>
        scripts: ['common'],
        styles: [],
    };

    /**
     * Include script(s) on the page
     */
    res.includeScript = function includeScript() {
        for (var i = 0; i < arguments.length; i++) {
            var script = arguments[i];

            // Trim the file extension
            if (/.js$/.test(script))
                script = script.slice(0,-3);

            res.data.page.scripts.push(script);
        }
    };

    /**
     * Include style(s) on the page
     */
    res.includeStyle = function includeStyle() {
        for (var i = 0; i < arguments.length; i++) {
            var style = arguments[i];

            // Trim the file extension
            if (/.css$/.test(style))
                style = style.slice(0,-4);

            res.data.page.styles.push(style);
        }
    };

    next();
};
