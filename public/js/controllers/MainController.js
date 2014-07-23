'use strict';

angular.module('web_client').controller('MainController',
    ['$scope', 'rest', function ($scope, rest) {

        $scope.urlParams = {};
        $scope.bodyParams = {};
        $scope.method = 'GET';
        $scope.url;

        $scope.submit = function () {
            var icon = $('#submit-icon');
            icon.removeClass().addClass('fa fa-circle-o-notch fa-spin');
            rest.sendRequest(
                $scope.method,
                $scope.url,
                $scope.urlParams,
                $scope.bodyParams
            ).then(function(data) {
                $scope.response = data.response;
                $scope.statusCode = data.statusCode;
                $scope.statusMessage = data.statusMessage;
                icon.removeClass().addClass('fa fa-paper-plane');
            }, function(err) {
                console.error(err);
            });
        };

        $scope.$watch('urlParams', function(newVale) {
            console.log(newVale)
        },true)

        $scope.addUrlParam = function () {
            if ($scope.urlKey === undefined) {
                return;
            }
            $scope.urlParams[$scope.urlKey] = $scope.urlValue;
            $scope.urlKey = $scope.urlValue = undefined;
        };

        $scope.removeUrlParam = function (key) {
            delete $scope.urlParams[key];
        };

        $scope.addBodyParam = function () {
            if ($scope.bodyKey === undefined) {
                return;
            }
            $scope.bodyParams[$scope.bodyKey] = $scope.bodyValue;
            $scope.bodyKey = $scope.bodyValue = undefined;
        };

        $scope.removeBodyParam = function (key) {
            delete $scope.bodyParams[key];
        };
}]);