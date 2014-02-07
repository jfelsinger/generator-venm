module.exports = {
    options: {
        useStrict: true,
        wrap: true,
        baseUrl: './',
        appDir: './<%%= yeoman.client %>/scripts',
        dir: './<%%= yeoman.client %>/dist/scripts',
        findNestedDependencies: true,

        modules: [
            {
                name: 'bootstrap',
                include: [
                    'jquery', 
                    'json3',
                    'es5-shim',
                    'vue',
                ]
            }, {
                name: 'view-models/home/index',
                exclude: ['bootstrap']
            }
        ],

        paths: {
            'jquery': 'empty:',
            'json3': 'empty:',
            'es5-shim': 'empty:',
            'vue': 'empty:'
        }
    },

    dev: {
        options: {
            optimize: 'none'
        }
    },

    production: {}
}
