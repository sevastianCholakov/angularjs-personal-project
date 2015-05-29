'use strict';

app.factory('userService',
    function ($http, baseServiceUrl, authService) {
        return {
            getDataAboutMe: function (success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/me',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getUserFullData: function (user, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + user,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getUserPreviewData: function (user, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + user + '/preview',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            editProfile: function (data, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/me',
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            },

            changePassword: function (data, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/me/changepassword',
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            },
            //  Friends part
            sendFriendRequest: function (user, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/me/requests/' + user,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            approveFriendRequest: function (requestId, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/me/requests/' + requestId + '?status=approved',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            rejectFriendRequest: function (requestId, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/me/requests/' + requestId + '?status=rejected',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            }
        };
    }
    );
