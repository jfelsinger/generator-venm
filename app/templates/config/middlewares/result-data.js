/**
 * Result Data
 * Adds data to be returned by the result object
 */
module.exports = function(req, res, next) {

    'use strict';

    if (!res.data) res.data = {};

    var render = res.render;
    res.render = function r(view, locals, cb) {
        if (locals)
            for (var prop in locals)
                res.data[prop] = locals[prop];

        return render.apply(res, [view, res.data, cb]);
    };

    // Defaults
    res.data.layout = 'layouts/main';

    // -
    // Feel free to place your own defaults here so they get 
    // included in your views
    // -

    next();
};

