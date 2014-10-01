define([
    'knockout',
    'services/apiCore'
], function (ko, apiCore) {

    'use strict';

    var LoginService = function () {
        this.userId = ko.observable();
        this.checkLogin();
    };

    LoginService.BASE_URI = '/login';

    LoginService.prototype.checkLogin = function () {
        return apiCore.get(LoginService.BASE_URI)
            .then(function (response) {
                this.userId(response.userId);
            }.bind(this));
    };

    LoginService.prototype.login = function (username, password) {
        return apiCore.post(LoginService.BASE_URI, {
                username: username,
                password: password
            })
            .then(function (response) {
                this.userId(response.userId);
            }.bind(this));
    };

    LoginService.prototype.logout = function () {
        return apiCore.remove(LoginService.BASE_URI)
            .then(function () {
                this.userId(undefined);
            }.bind(this))
    };

    return new LoginService();

});