(function () {

    'use strict';

    var util = require('util');
    var Repository = require('./Repository');
    var UserEntity = require('./entities/UserEntity');
    var path = require('path');
    var LowdbProvider = require('./providers/LowdbProvider');

    var UserRepository = function () {
        var provider = new LowdbProvider(UserRepository.DATA_FILE_NAME);
        UserRepository.super_.call(this, 'users', provider, UserEntity);
    };

    util.inherits(UserRepository, Repository);

    UserRepository.DATA_FILE_NAME = path.resolve(__dirname, '../../data/data.json');

    module.exports = new UserRepository();

}());