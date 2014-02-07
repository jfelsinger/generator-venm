module.exports = {
    dist: {
        files: {
            '<%%= yeoman.dist %>/styles/main.css': [
                '.tmp/styles/main.css',
                '<%%= yeoman.client %>/styles/main.css'
            ]
        }
    }
}
