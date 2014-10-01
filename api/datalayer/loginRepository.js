(function () {

    'use strict';

    var util = require('util');
    var Repository = require('./Repository');
    var LoginEntity = require('./entities/LoginEntity');
    var path = require('path');
    var LowdbProvider = require('./providers/LowdbProvider');
    var crypto = require('crypto');

    var LoginRepository = function () {
        var provider = new LowdbProvider(LoginRepository.DATA_FILE_NAME);
        LoginRepository.super_.call(this, 'logins', provider, LoginEntity);
    };

    util.inherits(LoginRepository, Repository);

    LoginRepository.DATA_FILE_NAME = path.resolve(__dirname, '../../data/data.json');

    LoginRepository.prototype.loadByCredentials = function (username, password) {
        var data = this.query({
            username: username
        });

        if (data.length === 1) {
            var login = this.create(data[0].properties);
            var hash = login.getHash(password, login.properties.salt);
            if (hash === login.properties.hash) {
                return login;
            }

            return null;
        }

        return null;
    };

    module.exports = new LoginRepository();

}());