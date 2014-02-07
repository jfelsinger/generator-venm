/**
 * Module Dependencies
 */
var express = require('express'),
    fs = require('fs');

// Load configurations
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev',
    config = require('./config/config'),
    mongoose = require('mongoose');

// Connect to database
var db = mongoose.connect(config.db);

// Load models
var models_path = __dirname + '/app/models';
walk(models_path);

var app = express();

// Configuration
require('./config/express')(app);
require('./config/routes')(app);

// Start the application
var port = config.port;
app.listen(port);
console.log('Express application started on port ' + port);

// Show yourself
exports = module.exports = app;

function walk(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file
            stat = fs.statSync(newPath);

        // Require model files
        if (stat.isFile()) {
            if (/(.*\.(js|coffee)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
}
