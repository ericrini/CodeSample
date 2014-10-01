define([
    'knockout',
    'services/loginService'
], function (ko, loginService) {

    'use strict';

    var LoginViewModel = function () {
        this.isVisible = ko.observable(false);
        this.username = ko.observable('eric.rini@gmail.com');
        this.password = ko.observable('test1234');
    };

    LoginViewModel.prototype.login = function () {
        loginService.login(this.username(), this.password());
    };

    return LoginViewModel;

});