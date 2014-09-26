/**
 * config-files.js
 * Sets up the config files templates for the generator
 */
module.exports = function() {
    this.template('_package.json', 'package.json');

    /* #bower */
    this.template('_bower.json', 'bower.json');
    this.copy('bowerrc', '.bowerrc');

    /* #travis */
    this.copy('travis.yml', '.travis.yml');

    /* #jshint */
    this.copy('jshintrc', '.jshintrc');

    /* #git */
    this.copy('gitignore', '.gitignore');

    /* #editor */
    this.copy('editorconfig', '.editorconfig');
}
