(function () {

    'use strict';

    var _ = require('lodash');

    /**
     * The Repository create a loose binding between an Entity and a Provider.
     */
    var Repository = function (name, provider, EntityConstructor) {
        this.name = name;
        this.provider = provider;
        this.EntityConstructor = EntityConstructor;
    };

    Repository.prototype.create = function (properties) {
        return new this.EntityConstructor(properties);
    };

    Repository.prototype.fetch = function (key) {
        var data = this.provider.fetch(this.name, key);
        if (data) {
            return this.create(data);
        }
        return null;
    };

    Repository.prototype.save = function (entity) {
        return this.provider.save(this.name, entity.properties);
    };

    Repository.prototype.remove = function (key) {
        return this.provider.remove(this.name, key);
    };

    Repository.prototype.query = function (criteria) {
        var data = this.provider.query(this.name, criteria);
        var entities = [];
        _.forEach(data, function (data) {
            entities.push(this.create(data));
        }.bind(this));
        return entities;
    };

    module.exports = Repository;

}());