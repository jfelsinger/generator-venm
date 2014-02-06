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



    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%% yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        sass: {
            options: {
                style: 'compressed'
                // sourcemap: true
            },

            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.client %>/styles',
                    src: ['*.scss', '*.sass'],
                    dest: '<%%= yeoman.client %>/styles',
                    ext: '.css'
                }]
            },

            server: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.client %>/styles',
                    src: ['*.scss', '*.sass'],
                    dest: '<%%= yeoman.client %>/styles',
                    ext: '.css'
                }]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                // reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/{,*/}*.js',
                '<%%= yeoman.config %>/{,*/}*.js',
                '<%%= yeoman.client %>/scripts/{,*/}*.js',
                '!<%%= yeoman.client %>/scripts/vendor/*',
                'test/{,*/}*.js'
            ]
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.client %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.client %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },

        cssmin: {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/main.css',
                        '<%%= yeoman.client %>/styles/main.css'
                    ]
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.client %>',
                    src: '*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%%= yeoman.client %>',
                        dest: '<%%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'images/{,*/}*.{webp,gif}',
                            'styles/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%%= yeoman.dist %>/images',
                        src: [
                            'generatred/*'
                        ]
                    }
                ]
            }
        },

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    cleanBowerDir: false
                }
            }
        },

        mocha: {
            tests: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%%= connect.options.port %>/index.html']
                }
            }
        },

        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        connect: {
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
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },

            appServer: [
                'nodemon',
                'watch'
            ],

            clientServer: [
                'bower',
                'sass:server',
            ],

            dist: [
                'sass:dist',
                'imagemin',
                'svgmin',
                'htmlmin'
            ],

        },
        
        watch: {
            scripts: {
                files: [
                    '<%%= yeoman.client %>/scripts/**',
                    '<%%= yeoman.app %>/{,*/}*.js'
                ],
                tasks: ['jshint'],
            },

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
    });


    grunt.option('force', true);


    grunt.registerTask('buildClient', [
        'clean:dist',
        'concurrent:dist',
        'cssmin',
        'copy:dist'
    ])

    grunt.registerTask('default', [
        'bower',
        'jshint',
        'buildClient'
    ]);

    grunt.registerTask('serve', [
        'clean:server',
        'concurrent:clientServer',
        'connect:livereload',
        'concurrent:appServer',
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:clientTest',
        'connect:test',
        'concurrent:appServer',
        'mocha'
    ]);
};
