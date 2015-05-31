'use strict';

app.controller('UserController',
    function ($scope, $location, $routeParams, $timeout, userService, authService, notifyService, pageSize, defaultProfilePic, defaultCoverPic) {
        var startPostId;
        $scope.posts = [];
        $scope.showFriendRequest = false;
        $scope.isOwnNewsFeed = $location.path() === '/';
        if (authService.isLoggedIn()) {
            $scope.isOwnWall = authService.getCurrentUser().userName === $routeParams['username'];
        }

        $scope.defaultProfilePic = defaultProfilePic;
        $scope.defaultCoverPic = defaultCoverPic;

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

                        if ($scope.userFullData.isFriend && $location.path() === '/user/' + $routeParams['username']) {
                            $scope.loadUserFriendsPreview();
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user', err);
                    }
                    );
            }
        };

        $scope.loadUserPreviewData = function (username) {
            $scope.previewData = {};
            if (authService.isLoggedIn()) {
                userService.getUserPreviewData(username,
                    function success(data) {
                        $scope.previewData = {
                            image: data.profileImageData ? data.profileImageData : $scope.defaultProfileImage,
                            name: data.name,
                            username: data.username,
                            status: false
                        };

                        if (authService.getCurrentUser().userName !== data.username) {
                            if (data.isFriend) {
                                $scope.previewData.status = 'friend';
                            } else if (data.hasPendingRequest) {
                                $scope.previewData.status = 'pending';
                            } else {
                                $scope.previewData.status = 'invite';
                            }
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to show user preview', err);
                    }
                    );
            }
        };

        $scope.editProfile = function (userData) {
            if (authService.isLoggedIn()) {
                userService.editProfile(userData,
                    function success() {
                        notifyService.showInfo('Profile successfully edited');
                        $location.path('/');
                    },
                    function error(err) {
                        notifyService.showError('Failed to edit profile', err);
                    }
                    );
            }
        };

        $scope.changePassword = function (userData) {
            if (authService.isLoggedIn()) {
                userService.changePassword(userData,
                    function success() {
                        notifyService.showInfo('Password successfully changed');
                        $location.path('/');
                    },
                    function error(err) {
                        notifyService.showError('Failed to change password', err);
                    }
                    );
            }
        };
        //  Friend Request Part
        $scope.sendFriendRequest = function (previewData) {
            if (authService.isLoggedIn()) {
                userService.sendFriendRequest(previewData.username,
                    function success() {
                        notifyService.showInfo('Friend request successfully sent to ' + previewData.username);
                        previewData.status = 'pending';
                    },
                    function error(err) {
                        notifyService.showError('Failed to sent friend request', err);
                    }
                    );
            }
        };

        $scope.approveFriendRequest = function (request) {
            if (authService.isLoggedIn()) {
                userService.approveFriendRequest(request.id,
                    function success() {
                        var index = $scope.friendRequests.indexOf(request);
                        $scope.friendRequests.splice(index, 1);
                        notifyService.showInfo('Friend request approved');
                    },
                    function error(err) {
                        notifyService.showError('Failed to approve friend request', err);
                    }
                    );
            }
        };

        $scope.rejectFriendRequest = function (request) {
            if (authService.isLoggedIn()) {
                userService.rejectFriendRequest(request.id,
                    function success() {
                        var index = $scope.friendRequests.indexOf(request);
                        $scope.friendRequests.splice(index, 1);
                        notifyService.showInfo('Friend request rejected');
                    },
                    function error(err) {
                        notifyService.showError('Failed to reject friend request', err);
                    }
                    );
            }
        };

        $scope.getFriendRequests = function () {
            if (authService.isLoggedIn()) {
                userService.getFriendRequests(
                    function success(data) {
                        $scope.friendRequests = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to show friends requests', err);
                    }
                    );
            }
        }; //  End Of Friend Request Part
       
        //  Load Friends stuff part
        $scope.loadOwnFriends = function () {
            if (authService.isLoggedIn()) {
                userService.getOwnFriends(
                    function success(data) {
                        $scope.friendsList = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load friends list', err);
                    }
                    );
            }
        };

        $scope.loadOwnFriendsPreview = function () {
            if (authService.isLoggedIn()) {
                userService.getOwnFriendsPreview(
                    function success(data) {
                        data.friendsUrl = '/#/users/' + authService.getCurrentUser().userName + '/friends';
                        $scope.friendsPreview = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load friends preview', err);
                    }
                    );
            }
        };

        $scope.loadFriendsPreviewOfFriends = function () {
            if (authService.isLoggedIn()) {
                userService.getFriendsPreviewOfFriends($routeParams['username'],
                    function success(data) {
                        data.friendsUrl = '/users/' + $routeParams['username'] + '/friends/';
                        $scope.friendsPreview = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user\'s friends preview', err);
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

        $scope.loadNewsFeedPages = function () {
            if ($scope.busy) return;
            $scope.busy = true;

            if (authService.isLoggedIn()) {
                userService.getNewsFeedPages(pageSize, startPostId,
                    function success(data) {
                        $scope.posts = $scope.posts.concat(data);
                        if ($scope.posts.length > 0) {
                            startPostId = $scope.posts[$scope.posts.length - 1].id;
                            $scope.busy = false;
                        } else {
                            $scope.busy = true;
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to load News Feed', err);
                    }
                    );
            }
        };

        $scope.loadUserWallByPages = function () {
            if (authService.isLoggedIn()) {
                userService.getFriendWallByPages($routeParams['username'], pageSize, startPostId,
                    function success(data) {
                        $scope.posts = $scope.posts.concat(data);
                        if ($scope.posts.length > 0) {
                            startPostId = $scope.posts[$scope.posts.length - 1].id;
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user\'s wall', err);
                    }
                    );
            }
        };    

        // Search
        $scope.search = function (searchTerm) {
            if (authService.isLoggedIn()) {
                userService.searchUserByName(searchTerm,
                    function success(data) {
                        $scope.searchResults = data;
                    },
                    function error(err) {

                    }
                    );
            } else {
                $scope.searchResults = undefined;
            }
        };

        $scope.showHideResults = function () {
            $timeout(function () {
                $scope.showSearchResults = !$scope.showSearchResults;
            }, 500);
        };
        
        // Profile and cover pic change
        $scope.selectProfilePic = function (fileInputField) {
            delete $scope.userData.profileImageData;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.userData.profileImageData = reader.result;
                    $(".profile-image").attr("src", reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                $(".profile-image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.selectCoverPic = function (fileInputField) {
            delete $scope.userData.coverImageData;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.userData.coverImageData = reader.result;
                    $(".cover-image").attr("src", reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                $(".cover-image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.removeProfileImage = function () {
            delete $scope.userData.profileImageData;
            $(".profile-image").attr("src", defaultProfilePic);
            $scope.userData.profileImageData = defaultProfilePic;
        };

        $scope.removeCoverImage = function () {
            delete $scope.userData.coverImageData;
            $(".cover-image").attr("src", defaultCoverPic);
            $scope.userData.coverImageData = defaultCoverPic;
        };
    }
    );