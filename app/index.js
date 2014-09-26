'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var VenmStackGenerator = module.exports = function VenmStackGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(VenmStackGenerator, yeoman.generators.Base);

VenmStackGenerator.prototype.askFor = require('./generator-questions');
VenmStackGenerator.prototype.fileStructure = require('./file-structure');
VenmStackGenerator.prototype.taskrunner = require('./task-runner');
VenmStackGenerator.prototype.configfiles = require('./config-files');

VenmStackGenerator.prototype.humans = function humans() {
    this.copy('client/humans.txt');
};

VenmStackGenerator.prototype.robots = function robots() {
    this.copy('client/robots.txt');
};

VenmStackGenerator.prototype.server = function server() {
    this.copy('server.js');
};
