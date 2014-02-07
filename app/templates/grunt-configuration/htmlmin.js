module.exports = {
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
}
