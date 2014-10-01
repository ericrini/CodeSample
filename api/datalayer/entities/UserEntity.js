(function () {

    'use strict';

    var util = require('util');
    var path = require('path');
    var Entity = require('./Entity');

    var UserEntity = function (properties) {
        UserEntity.super_.call(this, UserEntity.SCHEMA_FILE_PATH, properties);
    };

    util.inherits(UserEntity, Entity);

    UserEntity.SCHEMA_FILE_PATH = path.resolve(__dirname, '../../../data/schemas/user.json');

    module.exports = UserEntity;

}());