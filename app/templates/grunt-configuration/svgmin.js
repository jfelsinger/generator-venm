module.exports = {
    dist: {
        files: [{
            expand: true,
            cwd: '<%%= yeoman.client %>/images',
            src: '{,*/}*.svg',
            dest: '<%%= yeoman.dist %>/images'
        }]
    }
}
