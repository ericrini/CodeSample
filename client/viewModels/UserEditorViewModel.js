define([
    'knockout',
    'knockout.mapping',
    'services/userService'
], function (ko, koMapping, userService) {

    'use strict';

    var UserEditorViewModel = function () {
        this.isVisible = ko.observable(false);
        this.isLoading = ko.observable(false);
        this.isSaving = ko.observable(false);
        this.userViewModel = ko.observable();
        this.eyeColors = ['brown', 'blue', 'green', 'gray'];
        this.isDisabled = ko.observable(true);
        this.status = ko.observable('Update My Info');

        // FIXME: Remove this.
        this.userData = ko.computed(function () {
            if (this.userViewModel()) {
                return JSON.stringify(koMapping.toJS(this.userViewModel()), null, 4);
            }
        }, this);
    };

    UserEditorViewModel.prototype.loadUser = function (userId) {
        this.isLoading(true);
        userService.loadUser(userId)
            .done(function (response) {
                var userViewModel = koMapping.fromJS(response);
                this.userViewModel(userViewModel);
                this.isLoading(false);
            }.bind(this));
    };

    UserEditorViewModel.prototype.save = function () {
        this.isSaving = ko.observable(true);
        var data = koMapping.toJS(this.userViewModel());
        return userService.saveUser(data)
            .done(function (response) {
                this.isSaving = ko.observable(false);
            }.bind(this));
    };

    UserEditorViewModel.prototype.edit = function () {
        var isDisabled = this.isDisabled();

        if (isDisabled) {
            this.status('Save Changes');
            this.isDisabled(false);
        }
        else {
            this.save()
                .then(function () {
                    this.status('Update My Info');
                    this.isDisabled(true);
                }.bind(this));
        }
    };

    return UserEditorViewModel;

});