/**
 * Run a cb if the response was a success
 * 
 * public void respond([func] cb)
 */
module.exports = function respond(cb) {
    return function(err, res) {
        if (err) return console.log(err);

        if (res.ok) {
            cb(err, res);
        } else {
            console.log(res);
        }
    };
}


/**
 * Return a cb that routes to the next handler if there was an error
 */
module.exports.errorNext =
module.exports.errNext =
function(cb, next, that) {
    return function(err) {
        if (err) {
            console.error(err);
            return next(err);
        }

        cb.apply(that, arguments);
    };
};
