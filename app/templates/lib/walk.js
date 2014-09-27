var fs = require('fs');

/**
 * Walks through all the files and sub-directories in a folder and performs a cb
 * on each of the files that are found inside
 *
 * @param {string} path - The path to the folder that should be walked through
 * @param {walkCB} cb - Function to be performed on every found file
 */
module.exports = function walk(path, cb) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file
            stat = fs.statSync(newPath);

        // Require model files
        if (stat.isFile()) {
            if (/.*\.(js|coffee)$/.test(file)) {
                cb(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath, cb);
        }
    });
}

/**
 * Callback used by walk function
 * @callback walkCB
 * @param {string} path - path to a found file
 */
