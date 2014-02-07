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
            '{.tmp <%%= yeoman.client %>/styles/{,*/}*.css',
            '{.tmp <%%= yeoman.client %>/scripts/{,*/}*.js',
            '{.tmp <%%= yeoman.client %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
    }
}
