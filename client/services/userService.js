define([
    'services/apiCore'
], function (apiCore) {

    'use strict';

    var UserService = function () {};

    UserService.prototype.loadUser = function (id) {
        return apiCore.get('/users/' + id);
    };

    UserService.prototype.saveUser = function (user) {
        user.age = Number(user.age);
        return apiCore.put('/users/' + user._id, user);
    };

    return new UserService();

});