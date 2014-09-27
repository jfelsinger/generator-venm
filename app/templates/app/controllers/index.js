/* Module Dependencies */

exports.render = function(req, res) {
    'use strict';

    var data = {
        vm: 'index',
    };
    
    res.render('index.html', data);
}
