module.exports = {
    dist: {
        files: [{
            expand: true,
            cwd: '<%%= yeoman.client %>/images',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%%= yeoman.dist %>/images'
        }]
    }
}
