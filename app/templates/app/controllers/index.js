'use strict';

exports.render = function(req, res) {
    res.data.vm = 'index';
    res.render('index.html');
}
