/**
 * file-structure.js
 * Sets up and generates the basic file structure
 */

module.exports = function() {
    this.directory('app');
    this.mkdir('app/api');

    /* #views */
    this.directory('views');

    /* #lib */
    this.directory('lib');

    /* #client */
    this.mkdir('client');
    this.mkdir('client/styles');
    this.mkdir('client/dist');
    this.mkdir('client/scripts');
    this.mkdir('client/scripts/vendor');

    this.template('client/index.html');
    this.directory('styles-default', 'client/styles');

    if (this.moduleFramework != 'none')
        this.directory('client/scripts/' + this.moduleFramework, 'client/scripts');
    else
        this.copy('client/main.js', 'client/scripts/main.js');

    /* #config */
    this.directory('config');

    if (this.includes) {
        if (this.includes.i18n) {
            this.copy('includes/i18n/i18n.js', 'config/middlewares/i18n.js');
            this.copy('includes/i18n/locale.js', 'config/middlewares/locale.js');
        }
    }
}
