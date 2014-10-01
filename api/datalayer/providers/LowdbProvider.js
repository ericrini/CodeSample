(function () {

    'use strict';

    var util = require('util');
    var low = require('lowdb');
    var uuid = require('uuid');

    var LowdbProvider = function (filename) {
        this.db = low(filename);
    };

    LowdbProvider.prototype.fetch = function (collection, id) {
        return this.db(collection)
            .find({ _id: id })
            .value();
    };

    LowdbProvider.prototype.save = function (collection, entity) {
        if (entity._id) {
            this.db(collection)
                .find({ _id: entity._id })
                .assign(entity);
        }
        else {
            entity._id = uuid.v4();
            this.db(collection).push(entity);
        }
    };

    LowdbProvider.prototype.remove = function (collection, id) {
        this.db(collection).remove({ _id: id });
    };

    LowdbProvider.prototype.query = function (collection, criteria) {
        return this.db(collection)
            .where(criteria)
            .value();
    };

    module.exports = LowdbProvider;

}());