'use strict';

var gulp = require('gulp'),
    bower = require('gulp-bower'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    rimraf = require('gulp-rimraf'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha');


// Configuration Directories
var dir = {
    app: 'app',
    client: 'client',
    dist: 'dist'
};

gulp.task('rimraf', function() {
    return gulp.src(dir.dist, {read: false})
        .pipe(rimraf());
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(dir.client + '/scripts/vendor'));
});

gulp.task('bower-styles', function() {
    return bower({
        cwd: './client/styles'
    });
});

gulp.task('styles-sass', ['bower-styles'], function() {
    return gulp.src(dir.client + '/styles/*.{scss,sass}')
        .pipe(compass({
            style: 'expanded',
            css: dir.client + '/css',
            sass: dir.client + '/styles',
            require: []
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(dir.dist + '/css'));
});

gulp.task('styles', ['styles-sass'], function() {
    return gulp.src(dir.client + '/css/**')
        .pipe(minifycss())
        .pipe(gulp.dest(dir.dist + '/css'));
});

gulp.task('scripts-browserify', function() {
    return gulp.src([
            dir.client + '/scripts/**/*.js',
            '!' + dir.client + '/scripts/models/**',
            '!' + dir.client + '/scripts/view-models/**',
            '!' + dir.client + '/scripts/lib/**',
            '!' + dir.client + '/scripts/vendor/**',
            '!' + dir.client + '/scripts/templates/**',
            '!' + dir.client + '/scripts/modules/**',
        ])
        .pipe(browserify())
        .pipe(gulp.dest(dir.client + '/js'));
});

gulp.task('clientScripts', ['clientLint', 'scripts-browserify'], function() {
    return gulp.src(dir.client + '/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(dir.dist + '/js'));
});

gulp.task('images', function() {
    return gulp.src(dir.client + '/images/**/*.{png,jpg,jpeg}')
        .pipe(
            imagemin({ 
                optimizationLevel: 3, 
                progressive: true, 
                interlaced: true 
            }))
        .pipe(gulp.dest(dir.dist + '/images/'));
});

gulp.task('svg', function() {
    return gulp.src(dir.client + '/images/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(dir.dist + '/images/'));
});

gulp.task('fonts', function() {
    return gulp.src(dir.client + '/fonts/**')
        .pipe(gulp.dest(dir.dist + '/fonts/'));
});

gulp.task('watch', ['app', 'client'], function() {

    // Watch client scripts
    gulp.watch(dir.client + '/scripts/**/*.js', ['clientScripts']);

    // Watch image files
    gulp.watch(dir.client + '/images/**/*.{png,jpg,jpeg}', ['images']);

    // Watch svg files
    gulp.watch(dir.client + '/images/**/*.svg', ['svg']);

    // Watch svg files
    gulp.watch(dir.client + '/fonts/**', ['fonts']);

    // Watch styles
    gulp.watch(dir.client + '/sass/**/*.{sass,scss}', ['styles']);
});

gulp.task('mocha', function() {
    gulp.src('./test/**/*.js')
        .pipe(mocha({ reporter: 'list' }));
});

gulp.task('lint', function() {
    return gulp.src([
            'gulpfile.js',
            '<%%= yeoman.app %>/**/*.js',
            '<%%= yeoman.config %>/**/*.js',
            'test/**/*.js'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('clientLint', function() {
    return gulp.src([
            dir.client + '/scripts/**/*.js',
            '!' + dir.client + '/scripts/vendor/**',
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('client', ['rimraf', 'bower'], function() {
    gulp.start('styles', 'clientScripts', 'images', 'svg', 'fonts');
});

gulp.task('test', ['lint', 'mocha']);

gulp.task('app', function() {
    return nodemon({
            script: 'server.js',
            ignore: [
                'README.md', 
                'node_modules/**',
                dir.client,
                dir.dist
            ],
            watchedExtensions: ['js', 'json', 'html'],
            watchedFolders: [dir.app, 'config', 'views'],
            debug: true,
            delayTime: 1,
            env: {
                NODE_ENV: 'local',
                PORT: 3000
            },
        })
        .on('restart', ['test']);
});

// Restart the app server
gulp.task('app-restart', function() {
    nodemon.emit('restart');
});

/** Build it all up and serve it */
gulp.task('default', ['app', 'watch']);
