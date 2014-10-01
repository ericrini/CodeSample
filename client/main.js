define([
    'jquery',
    'knockout',
    'viewModels/AppViewModel',

    // Knockout Binding Handlers
    'bindingHandlers/include'
], function ($, ko, AppViewModel) {

    'use strict';

    var appViewModel = new AppViewModel();
    ko.applyBindings(appViewModel, $('#appViewModel')[0]);

});