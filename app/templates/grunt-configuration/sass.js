module.exports = {
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
}
