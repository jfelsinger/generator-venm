'use strict';
/* jslint browser: true */

var Vue = require('vue'),
    testApi = require('../models/test');

// Create simple view model
module.exports = new Vue({
    el: '.js-test-list',

    data: {
        rows: []
    },

    created: function() {
        this.fetchData();
    },

    methods: {
        fetchData: function fetchData() {
            var self = this;

            testApi.getAll(function(err, res) {
                self.rows = res.body;
            });
        },
    }
});
