module.exports = {
    dev: {
        script: 'server.js',
        options: {
            args: [],
            ignoredFiles: ['README.md', 'node_modules/**'],
            watchedExtensions: ['js'],
            watchedFolders: ['app', 'config'],
            debug: true,
            delayTime: 1,
            env: {
                PORT: 3000
            },
            cwd: __dirname + '/../'
        }
    }
}
