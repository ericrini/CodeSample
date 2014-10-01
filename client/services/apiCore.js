define([
    'jquery'
], function ($) {

    var buildUri = function (uri, query) {
        return 'http://localhost:8080/api/v1' + uri;
    };

    var doAjax = function (method, uri, data) {

        // In real life, I would use a separate promises A+ spec manager like bluebird and not propagate JQuery promises.
        return $.ajax(uri, {
                type: method,
                contentType: 'application/json',
                data: JSON.stringify(data)
            });
    };

    var ApiCore = function () {};

    ApiCore.prototype.get = function (uri) {
        return doAjax('get', buildUri(uri));
    };

    ApiCore.prototype.post = function (uri, data) {
        return doAjax('post', buildUri(uri), data);
    };

    ApiCore.prototype.put = function (uri, data) {
        return doAjax('put', buildUri(uri), data);
    };

    ApiCore.prototype.remove = function (uri) {
        return doAjax('delete', buildUri(uri));
    };

    return new ApiCore();

});