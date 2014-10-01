define([
    'knockout',
    'viewModels/LoginViewModel',
    'viewModels/UserEditorViewModel',
    'services/loginService'
], function (ko, LoginViewModel, UserEditorViewModel, loginService) {

    'use strict';

    // In real life, there would be a base ViewModel that would serve as a factory for some things that can close over
    // extremely large numbers of objects (like ko.computed) and create long term memory management issues if not
    // explicitly disposed.
    var AppViewModel = function () {
        this.loginView = new LoginViewModel(this);
        this.userEditorView = new UserEditorViewModel(this);

        ko.computed(function () {
            if (loginService.userId()) {
                this.loginView.isVisible(false);
                this.userEditorView.isVisible(true);
                this.userEditorView.loadUser(loginService.userId());
            }
            else {
                this.loginView.isVisible(true);
                this.userEditorView.isVisible(false);
            }
        }.bind(this));
    };

    AppViewModel.prototype.logout = function () {
        loginService.logout();
    };

    return AppViewModel;

});