'use strict';
var LIVERELOAD_PORT = 4500;

var gulp = require('gulp'),
    bower = require('gulp-bower'),
    browserify = require('gulp-browserify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    nodemon = require('gulp-nodemon'),
    open = require('gulp-open'),
    mocha = require('gulp-mocha'),
    livereload = require('gulp-livereload');


// Configuration Directories
var dir = {
    app: 'app',
    client: 'client',
    dist: 'dist'
};

gulp.task('connect', connect.server({
    root: [dir.client],
    livereload: true,
    port: 8005,
    open: {
        file: 'index.html',
    }
}));

gulp.task('clean', function() {
    return gulp.src(dir.dist, {read: false})
        .pipe(clean());
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(dir.client + '/scripts/vendor'));
});

gulp.task('styles', function() {
    return gulp.src(dir.client + '/styles/*.{scss,sass}')
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest(dir.client + '/styles'))

        .pipe(minifycss())
        .pipe(gulp.dest(dir.dist + '/styles'))

        .pipe(connect.reload())
        .pipe(notify({message: 'Styles task complete' }));
});

gulp.task('clientScripts', function() {
    return gulp.src([
            dir.client + '/scripts/{,*/}*.js',
            '!' + dir.client + '/scripts/vendor/*',
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(browserify())
        .pipe(gulp.dest(dir.client + '/dist/scripts'))

        .pipe(uglify())
        .pipe(gulp.dest(dir.dist + '/scripts'))

        .pipe(connect.reload())
        .pipe(notify({ message: 'Client scripts task complete' }));
});

gulp.task('images', function() {
    return gulp.src(dir.client + '/images/{,*/}*.{png,jpg,jpeg}')
        .pipe(cache(
            imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
        ))
        .pipe(gulp.dest(dir.dist + '/images/'))

        .pipe(connect.reload())
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('svg', function() {
    return gulp.src(dir.client + '/images/{,*/}*.svg')
        .pipe(cache(
            svgmin()
        ))
        .pipe(gulp.dest(dir.dist + '/images/'))

        .pipe(connect.reload())
        .pipe(notify({ message: 'SVG task complete' }));
});

gulp.task('html', function() {
    return gulp.src(dir.client + '/{,*/}*.{html,htm}')
        .pipe(cache(
            htmlmin()
        ))
        .pipe(gulp.dest(dir.dist))

        .pipe(connect.reload())
        .pipe(notify({ message: 'HTML task complete' }));
});

gulp.task('watch', function() {

    // Watch styles
    gulp.watch(dir.client + '/styles/{,*/}*.{sass,scss}', ['styles']);

    // Watch client scripts
    gulp.watch(dir.client + '/scripts/{,*/}*.js', ['clientScripts']);

    // Watch server scripts
    gulp.watch(dir.app + '/{,*/}*.js', ['app']);

    // Watch image files
    gulp.watch(dir.client + '/images/{,*/}*.{png,jpg,jpeg}', ['images']);

    // Watch svg files
    gulp.watch(dir.client + '/images/{,*/}*.svg', ['svg']);

    // Watch html files
    gulp.watch(dir.client + '/{,*/}*.{html,htm}', ['html']);

});

gulp.task('client', ['clean', 'bower'], function() {
    gulp.start('styles', 'clientScripts', 'images', 'svg', 'html');
});

gulp.task('lint', function() {
    return gulp.src([
            'Gruntfile.js',
            '<%%= yeoman.app %>/{,*/}*.js',
            '<%%= yeoman.config %>/{,*/}*.js',
            'test/{,*/}*.js'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'Linting task complete' }));
});


gulp.task('app', function() {
    return nodemon({
            script: 'server.js',
            ignoredFiles: ['README.md', 'node_modules/**'],
            watchedExtensions: ['js'],
            watchedFolders: ['app', 'config'],
            debug: true,
            delayTime: 1,
            env: {
                PORT: 3000
            },
        })
        .on('restart', ['lint']);
});

gulp.task('buildClient', function() {
});

/** Build production ready into distributable folder */
gulp.task('default', ['connect', 'app', 'client', 'watch']);

/** Build dev ready and serve it */
gulp.task('serve', function() {
});

gulp.task('test', function() {
});
