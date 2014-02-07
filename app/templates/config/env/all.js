var path = require('path'),
    root = path.normalize(__dirname + '/../..');

module.exports = {
    defaultController: 'index',
    defaultControllerMethod: 'render',
    root: root,
    port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL
};
