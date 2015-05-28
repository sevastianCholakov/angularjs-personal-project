'use strict';

var app = angular.module('app', ['ngRoute', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net');
app.constant('pageSize', 5);

app.config(['$routeProvider',function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'AuthController'
    });

    $routeProvider.otherwise({ redirectTo: '/' });
}]);