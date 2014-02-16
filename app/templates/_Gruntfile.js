'use strict';
var LIVERELOAD_PORT = 4500;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
}

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // Configuration
    var yeomanConfig = {
        app: 'app',
        client: 'client',
        dist: 'dist'
    };

    
    var config = {
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json')
    };

    config.clean = require('./grunt-configuration/clean');
    config.sass = require('./grunt-configuration/sass');
    config.hint = require('./grunt-configuration/jshint');
    config.imagemin = require('./grunt-configuration/imagemin');
    config.svgmin = require('./grunt-configuration/svgmin');
    config.cssmin = require('./grunt-configuration/cssmin');
    config.htmlmin = require('./grunt-configuration/htmlmin');
    config.copy = require('./grunt-configuration/copy');
    config.bower = require('./grunt-configuration/bower');
    config.mocha = require('./grunt-configuration/mocha');
    config.nodemon = require('./grunt-configuration/nodemon');
    config.concurrent = require('./grunt-configuration/concurrent');<% if (useRequire) { %>
    config.requirejs = require('./grunt-configuration/requirejs');<% } else { %>
    config.uglify = require('./grunt-configuration/uglify');<% } %>

    config.connect = {
        options: {
            ports: 8005,
            hostname: 'localhost',
        },

        livereload: {
            options: {
                middleware: function(connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, '.tmp'),
                        mountFolder(connect, yeomanConfig.client)
                    ];
                }
            }
        },

        test: {
            options: {
                middleware: function(connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, '.tmp'),
                        mountFolder(connect, 'test')
                    ];
                }
            }
        },

        dist: {
            options: {
                middleware: function(connect) {
                    return [
                        mountFolder(connect, yeomanConfig.dist)
                    ];
                }
            }
        }
    }

    config.watch = {
        scripts: {
            files: [
                '<%%= yeoman.client %>/scripts/**',
                '<%%= yeoman.app %>/{,*/}*.js'
            ],
            tasks: ['jshint'],
        },<% if (useRequire) { %>

        require: {
            files: [
                '<%%= yeoman.client %>/scripts/**',
                '!<%%= yeoman.client %>/scripts/modules/**'
            ],
            tasks: ['requirejs:dev']
        },<% } else { %>

        uglify: {
            files: [
                '<%%= yeoman.client %>/scripts/**',
                '!<%%= yeoman.client %>/scripts/modules/**'
            ],
            tasks: ['uglify:dev']
        },<% } %>

        styles: {
            files: ['<%%= yeoman.client %>/styles/{,*/}*.{scss,sass}'],
            tasks: ['sass:server']
        },

        livereload: {
            options: {
                livereload: LIVERELOAD_PORT
            },
            files: [
                '<%%= yeoman.app %>/*.html',
                '{.tmp <%%= yeoman.app %>/styles/{,*/}*.css',
                '{.tmp <%%= yeoman.app %>/scripts/{,*/}*.js',
                '{.tmp <%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        }
    }


    grunt.initConfig(config);


    grunt.option('force', true);


    grunt.registerTask('buildClient', [
        'clean:dist',
        'concurrent:dist',
        'cssmin',
        'copy:dist'
    ])

    grunt.registerTask('default', [
        'bower',<% if (useRequire) { %>
        'requirejs:production',<% } else { %>
        'uglify:production',<% } %>
        'jshint:production',
        'buildClient'
    ]);

    grunt.registerTask('serve', [
        'clean:server',
        'concurrent:clientServer',<% if (useRequire) { %>
        'requirejs:dev',<% } else { %>
        'uglify:dev',<% } %>
        'connect:livereload',
        'concurrent:appServer',
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:clientTest',<% if (useRequire) { %>
        'requirejs:dev',<% } else { %>
        'uglify:dev',<% } %>
        'connect:test',
        'concurrent:appServer',
        'mocha'
    ]);
};
