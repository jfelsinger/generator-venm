/**
 * Views
 * Setup the view engine
 */

var <% if (includes.swag) { %>
    swag = require('swag'),<% } %>
    <% if (includes.moment) { %>
    moment = require('moment'),<% } %>
    hbs = require('hbs');

module.exports = function(app) {
    
    'use strict';

    hbs.registerPartials(__dirname + '/../../views/partials');

    // Helpers
    hbs.registerHelper('json', JSON.stringify);<% if (includes.swag) { %>
    swag.registerHelpers(hbs);<% } %><% if (includes.moment) { %>
    hbs.registerHelper('moment', function(format, value) {
        return moment(value).format(format);
    });<% } %>

    app.set('view engine', 'html');
    app.engine('html', hbs.__express);
};
