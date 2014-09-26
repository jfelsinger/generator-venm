var mongoose = require('mongoose'),
    _ = require('underscore'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    authTypes = ['github', 'facebook', 'twitter'];

var UserSchema = new Schema({
    username: String,
    email: String,
    name: String,
    provider: String,
    hashed_password: String,
    salt: String,
    facebook: {},
    google: {},
    twitter: {},
    github: {}
});

UserSchema
    .virtual('password')
    .set(function(password) {
        // this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptedPassword(password);
    })
    .get(function() { return this._password; });

var validatePresenceOf = function(value) {
    return value && value.length;
};

UserSchema.path('username').validate(function(username) {
    if (authTypes.indexOf(this.provider) !== -1) return true;

    return username.length;
}, 'Username cannot be blank');

UserSchema.path('email').validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;

    return email.length;
}, 'Email cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
    if (authTypes.indexOf(this.provider) !== -1) return true;

    return hashed_password.length;
}, 'Password cannot be blank');

UserSchema.pre('save', function(next) {
    if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
        next(new Error('Invalid Password'));
    else
        next();
});

UserSchema.methods = {
    /**
     * Checks to see if a given plaintext password matches the users saved
     * password hash
     * @param {string} plainText - the password to test
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Returns a randomely generated string to be used as a salt
     */
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Returns a hashed value representative of the password
     * @param {string} password - the password to encrypt
     */
    encryptPassword: function(password) {
        if (!password) return '';
        return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
    }
}

mongoose.model('User', UserSchema);
