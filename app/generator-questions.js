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
            name: 'moduleFramework',
            message: 'How would you like to manage front-end modules?',
            default: 'browserify',
            choices: [
                {
                    name: 'Browserify',
                    value: 'browserify',
                },
                {
                    name: 'None',
                    value: 'none'
                }
            ],
        },
        {
            type: 'confirm',
            name: 'extrasConfirm',
            message: 'Would you like to go through and add-on any extras?',
            default: true
        },
        {
            type: 'confirm',
            name: 'include_i18n',
            message: 'i18n: include localization support?',
            when: function(props) {
                return props.extrasConfirm;
            },
            default: false
        },
        {
            type: 'confirm',
            name: 'include_swag',
            message: 'swag: include swag handlebar helpers?',
            when: function(props) {
                return props.extrasConfirm;
            },
            default: false
        },
        {
            type: 'confirm',
            name: 'include_moment',
            message: 'moment: include moment time library?',
            when: function(props) {
                return props.extrasConfirm;
            },
            default: false
        },
    ];

    this.prompt(prompts, function (props) {
        this.appName = props.appName;
        this.moduleFramework = props.moduleFramework;

        // Set values for included extra components
        this.includes = {};
        if (props.extrasConfirm) {
            this.includes.i18n = props.include_i18n;
            this.includes.swag = props.include_swag;
            this.includes.moment = props.include_moment;
        }

        cb();
    }.bind(this));
};
