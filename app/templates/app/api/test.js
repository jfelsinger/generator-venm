exports.get = function(req, res) {
    res.json([
        { name: 'test 1' },
        { name: 'test 2' },
        { name: 'test 3' }
    ]);
};
