(function () {

    'use strict';

    var util = require('util');
    var path = require('path');
    var Entity = require('./Entity');
    var crypto = require('crypto');

    var LoginEntity = function (properties) {
        LoginEntity.super_.call(this, LoginEntity.SCHEMA_FILE_PATH, properties);
    };

    util.inherits(LoginEntity, Entity);

    LoginEntity.SCHEMA_FILE_PATH = path.resolve(__dirname, '../../../data/schemas/login.json');

    LoginEntity.prototype.getHash = function (password, salt) {
        return crypto.createHash('sha256')
            .update(password + salt)
            .digest('base64');
    };

    // https://crackstation.net/hashing-security.htm
    LoginEntity.prototype.setPassword = function (password) {

        // In real life you would use a hash with a lot more bytes of entrophy. :)
        var salt = crypto.randomBytes(32).toString('base64');
        this.properties.salt = salt;
        this.properties.hash = LoginEntity.getHash(password, salt);
    };

    module.exports = LoginEntity;

}());