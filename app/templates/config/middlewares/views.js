/**
 * Views
 * Setup the view engine
 */

var layout = require('express-layout'),
    hbs = require('hbs'),
    swag = require('swag');

module.exports = function(app) {
    hbs.registerPartials(__dirname + '/../../views/partials');
    swag.registerHelpers(hbs);

    app.use(layout());
    app.set('layouts', 'views/layouts');
    app.set('layout', 'main.html');
    app.set('view engine', 'html');
    app.engine('html', hbs.__express);
};
