'use strict';

app.controller('AuthController',
    function ($scope, $location, authService, notifyService) {

        $scope.isLoggedIn = function () {
            return authService.isLoggedIn();
        };

        $scope.login = function (userData) {
            if (authService.isLoggedIn()) {
                authService.login(userData,
                    function success() {
                        notifyService.showInfo("Login successful");
                        $location.path("/");
                    },
                    function error(err) {
                        notifyService.showError("Login failed", err);
                    }
                    );
            }
        };

        $scope.register = function (registerData) {
            if (!authService.isLoggedIn()) {
                authService.register(registerData,
                    function success() {
                        notifyService.showInfo('Register successful');
                        $location.path('/');
                    },
                    function error(err) {
                        notifyService.showError('Register failed', err);
                    }
                    );
            }
        };

        $scope.logout = function () {
            if (authService.isLoggedIn()) {
                authService.logout(
                    function success() {
                        notifyService.showInfo('Logout successful');
                        $location.path('/');
                    },
                    function error(err) {
                        notifyService.showError('Logout Failed', err);
                    }
                    );
            }
        };
    }
    );
    