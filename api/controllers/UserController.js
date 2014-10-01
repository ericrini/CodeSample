(function () {

    'use strict';

    var userRepository = require('../datalayer/userRepository');
    var UserEntity = require('../datalayer/entities/UserEntity');

    var UserController = function () {};

    UserController.prototype.URI = '/api/v1/users/:id';

    UserController.prototype.read = function (request, response) {
        var userId = request.params.id;

        if (userId !== request.session.userId) {
            response.status(403).send();    // User can only view their own profile.
            return;
        }

        var user = userRepository.fetch(userId);

        if (user) {
            response.status(200).json(user.properties);  // Success
            return;
        }

        response.status(404).send();    // Does not exist.
    };

    UserController.prototype.update = function (request, response) {
        var body = request.body;

        if (!body) {
            response.status(400).send();    // Cannot parse body.
            return
        }

        if (body._id !== request.session.userId) {
            response.status(403).send();    // User can only update their own profile.
            return;
        }

        var user = userRepository.create(body);
        var errors = user.validate();

        if (errors.length > 0) {
            response.status(400).json(errors).send();   // Properties don't validate.
            return;
        }

        try {
            userRepository.save(user);
            response.status(200).json(user.properties);  // Success
        }
        catch (error) {
            response.status(500).send();    // Database failure.
        }
    };

    module.exports = UserController

}());