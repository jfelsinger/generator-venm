module.exports = {
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
