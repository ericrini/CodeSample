(function () {

    'use strict';

    var fs = require('fs');
    var JaySchema = require('jayschema');
    var _ = require('lodash');

    /**
     * An entity allows for model validation using a JSON schema (see /data/schemas).
     */
    var Entity = function (schema, properties) {
        var schema = fs.readFileSync(schema, 'utf8');
        this.schema = JSON.parse(schema);
        this.properties = properties;
    };

    Entity.prototype.validate = function () {
        var jayschema = new JaySchema();
        return jayschema.validate(this.properties, this.schema);
    };

    module.exports = Entity;

}());