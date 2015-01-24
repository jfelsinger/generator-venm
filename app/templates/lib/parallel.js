/**
 * Parallel
 *
 * Run functions asynchronously in parallel
 */

'use strict';
var async = require('async');

/** 
 * Run middleware in parallel 
 */
var parallel = function parallel(middlewares) {

    'use strict';

    return function(req, res, next) {
        async.each(middlewares, function(mw, cb) {
            mw(req, res, cb);
        }, next);
    };
};
parallel.middleware = parallel;


/** 
 * Run requests that take a cb in parallel
 */
parallel.requests = function parallelRequests(requests, cb, asyncCb) {

    async.each(requests, function(request, cb) {
        request(cb);
    }, !asyncCb ? cb : function(err) {
        if (err) return asyncCb(err);

        cb();
    });
};

module.exports = parallel;
