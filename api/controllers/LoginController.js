(function () {

    'use strict';

    var loginRepository = require('../datalayer/loginRepository');

    var LoginController = function () {};

    LoginController.prototype.URI = '/api/v1/login';

    LoginController.prototype.read = function (request, response) {
        if (!request.session.userId) {
            response.status(401).send();    // Not logged in.
            return;
        }

        response.status(200).json({ userId: request.session.userId });    // Logged in.
    };

    // The POST is not strictly RESTful, but it's a common compromise.
    LoginController.prototype.create = function (request, response) {
        var body = request.body;

        if (!body) {
            response.status(400).send();    // Cannot parse body.
            return
        }

        var login = loginRepository.loadByCredentials(body.username, body.password);

        if (login) {
            request.session.userId = login.properties.userId;
            response.status(200).json({ userId: login.properties.userId });  // Success
        }
        else {
            response.status(401).send();    // Invalid credentials.
        }
    };

    LoginController.prototype.remove = function (request, response) {
        delete request.session.userId;
        response.status(200).send();    // Always succeeds.
    };

    module.exports = LoginController

}());