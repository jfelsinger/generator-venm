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

