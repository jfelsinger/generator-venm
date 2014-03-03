'use strict';

require('./vendor/es5-shim/es5-shim.min');

// jquery = require('/dist/scripts/vendor/jquery/jquery.min');
// json3 = require('/dist/scripts/vendor/json3/json3.min');

// any general code to execute on
// all pages can be placed here

// Load view model
var vm = require('./view-models/home/index');
vm();
