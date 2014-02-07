module.exports = {
    tests: {
        options: {
            run: true,
            urls: ['http://localhost:<%%= connect.options.port %>/index.html']
        }
    }
}
