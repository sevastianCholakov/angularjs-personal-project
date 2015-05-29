'use strict';

app.controller('userController',
    function ($scope, $location, $routeParams, $timeout, userService, authService, notifyService, pageSize) {
        var startPostId;
        $scope.posts = [];

        $scope.loadDataAboutMe = function () {
            if (authService.isLoggedIn()) {
                userService.getDataAboutMe(
                    function success(data) {
                        $scope.userData = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to get own data', err);
                    }
                    );
            }
        };

        $scope.loadUserFullData = function () {
            if (authService.isLoggedIn) {
                userService.getUserFullData($routeParams['username'],
                    function success(data) {
                        $scope.userFullData = data;
                        if (authService.getCurrentUser() !== data.username) {
                            if (data.isFriend) {
                                $scope.userFullData.status = 'friend';
                            } else if (data.hasPendingRequest) {
                                $scope.userFullData.status = 'pending';
                            } else {
                                $scope.userFullData.status = 'invite';
                            }
                        }

                        if ($scope.userFullData.isFriend && $location.path() === '/user/' + $routeParams['username'] + '/wall/') {
                            $scope.loadUserFriendsPreview();
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user', err);
                    }
                    );
            }
        };



        $scope.loadFriendsDetailedFriendsList = function () {
            if (authService.isLoggedIn()) {
                userService.getFriendsDetailedFriendsList($routeParams['username'],
                    function success(data) {
                        $scope.friends = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user\'s friends list', err);
                    }
                    );
            }
        };

        $scope.loadFriendsPreviewOfFriends = function () {
            if (authService.isLoggedIn()) {
                userService.getFriendsPreviewOfFriends($routeParams['username'],
                    function success(data) {
                        data.friendsUrl = '/user/' + $routeParams['username'] + '/friends/';
                        $scope.friendsPreview = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user\'s friends preview', err);
                    }
                    );
            }
        };


    }
    );