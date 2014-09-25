module.exports = {
    options: {
        outputStyle: 'compressed'
        // sourcemap: true
    },

    dist: {
        options: {
            sassDir: '<%%= yeoman.client %>/styles',
            cssDir: '<%%= yeoman.client %>/styles',
            specify: ['*.scss', '*.sass'],
        },
    },

    server: {
        options: {
            sassDir: '<%%= yeoman.client %>/styles',
            outputStyle: 'expanded',
            cssDir: '<%%= yeoman.client %>/styles',
            specify: ['*.scss', '*.sass'],
        },
    }
}
