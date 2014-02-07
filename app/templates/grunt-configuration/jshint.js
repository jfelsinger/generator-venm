module.exports = {
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
}
