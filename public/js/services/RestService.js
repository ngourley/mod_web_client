'use strict';

angular.module('web_client').factory('rest', function($window, $http, $q) {
    var service = {};

    service.sendRequest = function(method, url, getParams, postParams) {
        var deferred = $q.defer();

        if (method === undefined) {
            deferred.reject("'method' was undefined");
            return deferred.promise;
        }

        if (url === undefined) {
            deferred.reject("'url' was undefined");
            return deferred.promise;
        }

        var prepended = url.match(new RegExp('^(http|https):\/\/'));

        if (prepended === null) {
            url = 'http://' + url;
        }

        var message = {};
        message.method = method;
        message.url = url;
        message.getParams = getParams;
        message.postParams = postParams;

        $http({
            url: '/request',
            method: 'POST',
            data: JSON.stringify(message)
        }).
        success(function (data) {
            deferred.resolve(data);
        }).
        error(function (data, status, headers, config) {
            deferred.reject('There was an error');
        });

        return deferred.promise;
    };

    return service;
});