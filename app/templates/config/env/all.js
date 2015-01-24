var path = require('path'),
    root = path.normalize(__dirname + '/../..');

module.exports = {
    defaultController: 'index',
    defaultControllerMethod: 'render',
    secret: 'yoursecret',
    root: root,
    port: process.env.PORT || 3000,
    domain: process.env.DOMAIN || 'localhost',
    db: process.env.MONGOHQ_URL,
    auth: {
        twitter: {
            consumerKey: ' ',
            consumerSecret: ' '
        },
        github: {
            clientId: ' ',
            clientSecret: ' '
        },
        google: {
        },
        facebook: {
            clientId: ' ',
            clientSecret: ' '
        },

    }
};
