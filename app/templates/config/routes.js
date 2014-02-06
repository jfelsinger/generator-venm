var async = require('async');

module.exports = function(app) {

    // Home rouce
    var index = require('../app/controllers/index');
    app.get('/', index.render);
};
