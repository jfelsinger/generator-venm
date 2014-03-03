require.config({
    baseUrl: '/scripts',
    waitSeconds: 200,

    paths: {
        'vue': '/dist/scripts/vendor/vue/vue.min',
        'jquery': '/dist/scripts/vendor/jquery/jquery.min',
        'json3': '/dist/scripts/vendor/json3/json3.min',
        'es5-shim': '/dist/scripts/vendor/es5-shim/es5-shim.min',
    },

    shim: {
        'vue': {
            exports: 'Vue'
        }
    }


});
