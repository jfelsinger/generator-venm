module.exports = {
    options: {
    },

    dev: {
        options: {
            mangle: false,
            compress: false,
        },
        files: [{
            expand: true, 
            cwd: './<%%= yeoman.client %>/scripts',
            src: '**/*.js',
            dest: './<%%= yeoman.client %>/dist/scripts'
        }]
    },

    production: {
        files: [{
            expand: true, 
            cwd: './<%%= yeoman.client %>/scripts',
            src: '**/*.js',
            dest: './<%%= yeoman.dist %>/dist/scripts'
        }]
    }
}
