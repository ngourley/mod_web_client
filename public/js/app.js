'use strict';

// Declare app level module which depends on filters, and services
angular.module('web_client', [
    'ngRoute',
    'web_client.filters',
    'web_client.services',
    'web_client.directives',
    'web_client.controllers',
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl:'partials/main',
        controller: 'MainController',
    });
    $routeProvider.otherwise({redirectTo: '/main'});
}]).run(function($rootScope) {
    $rootScope.$on('$viewContentLoaded', function() {
        $(document).foundation();
    });
});

angular.module('web_client.filters', []);

angular.module('web_client.controllers', []);

angular.module('web_client.directives', []);

angular.module('web_client.services', []);