module.exports = {
    options: {
        logConcurrentOutput: true
    },

    appServer: [
        'nodemon',
        'watch'
    ],

    clientServer: [
        'bower',
        'sass:server',
    ],

    dist: [
        'sass:dist',
        'imagemin',
        'svgmin',
        'htmlmin'
    ],
}
