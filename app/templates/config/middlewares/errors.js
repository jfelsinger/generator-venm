/**
 * Errors
 * Handling for error responses
 */

'use strict';

module.exports = function(app) {

    // 500 Error
    app.use(function(err, req, res, next) {

        // If page not found continue to the
        // 404 handling middleware
        if (err.message.indexOf('not found')) return next();

        // log
        console.error(err.stack);

        // send response
        if (req.isApi)
            res.status(500).json({
                code: 500,
                error: err.stack
            });
        else
            res.status(500)
               .render('500.html', { layout: 'layouts/error' });

    });
    
    // Send 404 error
    app.use(function(req, res, next) {

        // send response
        if (req.isApi)
            res.status(404).json({ 
                code: 404,
                error: 'Not Found'
            });
        else
            res.status(404)
               .render('404.html', { layout: 'layouts/error' });

    });
};
