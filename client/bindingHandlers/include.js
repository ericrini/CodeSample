define([
    'knockout',
    'jquery'
], function (ko, $) {

    'use strict';

    // Basically we want to use the path to the template as it's script id, but we need to make sure that invalid chars
    // are removed, and the delegated call to template is passed the right tag id.
    var getValueAccessor = function (valueAccessor) {
        var value = valueAccessor();
        if (value.name) {
            value.name = value.name.replace('/', '_');
        }
        return ko.observable(value);
    };

    /**
     * If a template doesn't exist in the document, retrieve it with AJAX and insert it. Then delegate to the
     * Knockout template function.
     */
    ko.bindingHandlers.include = {
        'init': function(element, valueAccessor) {
            var templatePath = valueAccessor().name;
            var delegateValueAccessor = getValueAccessor(valueAccessor);
            var scriptId = delegateValueAccessor().name;
            var script = $('#' + scriptId)[0];

            if (script) {
                ko.bindingHandlers.template.init(element, delegateValueAccessor);
            }
            else {
                var promise = $.ajax({
                        url: window.location.origin + window.location.pathname + '/' + templatePath + '.html'
                    })
                    .done(function (templateContent) {
                        var script = $('<script type="text/html">')
                            .attr('id', scriptId)
                            .html(templateContent);
                        script.appendTo(document.body);
                        ko.bindingHandlers.template.init(element, delegateValueAccessor);
                    })
                    .fail(function () {
                        console.error('Failed to retrieve the template', templatePath);
                    });
                ko.utils.domData.set(element, 'promise', promise);
            }
        },
        'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var delegateValueAccessor = getValueAccessor(valueAccessor);
            var promise = ko.utils.domData.get(element, 'promise', promise);

            if (promise) {
                promise.done(function () {
                    ko.bindingHandlers.template.update(element, delegateValueAccessor, allBindings, viewModel, bindingContext);
                });
            }
            else {
                ko.bindingHandlers.template.update(element, delegateValueAccessor, allBindings, viewModel, bindingContext);
            }
        }
    };

    ko.virtualElements.allowedBindings.include = true;

});