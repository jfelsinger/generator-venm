/**
 * task-runner.js
 * Configures and sets up the preferred generated task runner
 */

module.exports = function() {
    switch (this.taskRunner) {

        /* #grunt */
        case 'grunt':
            this.template('_Gruntfile.js', 'Gruntfile.js');
            this.directory('grunt-configuration');
            break;

        /* #gulp */
        case 'gulp':
            this.template('_gulpfile.js', 'gulpfile.js');
            // this.directory('gulp-configuration');
            break;

    }
}
