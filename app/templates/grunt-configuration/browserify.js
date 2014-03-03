module.exports = {
    options: {
    },

    dev: {
        options: {
        },
        files: {
            '<%%= yeoman.client %>/dist/scripts/main.js': ['<%%= yeoman.client %>/scripts/main.js'],
        }
    },

    production: {
        files: {
            '<%%= yeoman.client %>/dist/scripts/main.js': ['<%%= yeoman.client %>/scripts/main.js'],
        }
    }
}
