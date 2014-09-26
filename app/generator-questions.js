/**
 * generator-questions.js
 * Set up function for the client ran configuration setup for the generator
 */

module.exports = function() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'appName',
            message: 'What is your application\'s name?'
        },
        {
            type: 'list',
            name: 'taskRunner',
            message: 'Which task runner do you want to use?',
            default: 'Gulp',
            choices: [
                {
                    name: 'Gulp',
                    value: 'gulp',
                },
                {
                    name: 'Grunt',
                    value: 'grunt',
                },
            ],
        },
        {
            type: 'list',
            name: 'moduleFramework',
            message: 'How would you like to manage front-end modules?',
            default: 'browserify',
            choices: [
                {
                    name: 'Browserify',
                    value: 'browserify',
                },
                {
                    name: 'RequireJS',
                    value: 'requirejs',
                },
                {
                    name: 'None',
                    value: 'none'
                }
            ],
        }
    ];

    this.prompt(prompts, function (props) {
        this.appName = props.appName;
        this.taskRunner = props.taskRunner;
        this.moduleFramework = props.moduleFramework;

        cb();
    }.bind(this));
};
