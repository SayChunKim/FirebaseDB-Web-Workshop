// APP CONFIG FILE (INIT, ROUTING)
var app = angular.module("Fireball", ['firebase','ngRoute']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
            templateUrl: '../views/home.html',
            controller: 'HomeCtrl'
        })
        .when("/login/", {
            templateUrl: '../views/login.html',
            controller: 'LoginCtrl'
        })
        .when("/register/", {
            templateUrl: '../views/register.html',
            controller: 'RegisterCtrl'
        })
        .when("/member/:member_id/", {
            templateUrl: '../views/member.html',
            controller: 'MemberCtrl'
        })
        .when("/error/", {
            templateUrl: '../views/error.html',
        })
        .otherwise({
            redirectTo: '/'
        });
    // $locationProvider.html5Mode(true);
});
app.controller('routeController', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };
});