'use strict';

var app = angular.module('app', ['ngRoute', 'ui.bootstrap.pagination']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'AuthController'
    });

    $routeProvider.when('/profile', {
        templateUrl: 'templates/edit-profile.html'
    });

    $routeProvider.when('/profile/password', {
        templateUrl: 'templates/change-password.html',
    });

    $routeProvider.when('/pendingFriendRequests', {
        templateUrl: 'templates/friend-requests.html',
    });

    $routeProvider.when('/myfriends', {
        templateUrl: 'templates/friends.html',
    });

    $routeProvider.when('/users/:username/friends', {
        templateUrl: 'templates/friends-of-friends.html',
    });

    $routeProvider.when('/users/:username', {
        templateUrl: 'templates/user-profile.html',
    });

    $routeProvider.otherwise({ redirectTo: '/' });
}]);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net');

app.constant('pageSize', 5);

app.constant('defaultProfilePic', 'data:image/jpeg;base64,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');

app.constant('defaultCoverPic', 'data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTY0Q0IxRjk1QzQyMTFFMkI0NDdEQzA2MUI0RUFGREQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTY0Q0IxRkE1QzQyMTFFMkI0NDdEQzA2MUI0RUFGREQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NjRDQjFGNzVDNDIxMUUyQjQ0N0RDMDYxQjRFQUZERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NjRDQjFGODVDNDIxMUUyQjQ0N0RDMDYxQjRFQUZERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/iDFhJQ0NfUFJPRklMRQABAQAADEhMaW5vAhAAAG1udHJSR0Ig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AAAAAUCUBQAAIBQIAABQJQAAAFAgAJIIAAAAAAAAAAAAAAAAAAAAAAAAAACwCgAAUCgAAUCgAAtAUCgAUC0AAC0BQFAAAAAAAAAUBQJQAAFAlAAAlAgAAFAgAAAICSCAAAAAAAAAAAAAAAAAAAAAAAAAAAsAoALQAAALQAAKBQKAC0AAC0AACgUBQFAUCgAAAlAUBQFAAgFAUCAAlAAAlAgAAIAACAkggAAAAAAAAAAAAAAAAAAAAAAAAAALAKCgAAAoAALQKABQKBQLQALQFAoFAUC0BQAAAAAAFAlAUACUBQIABQIACUACUACAAUCAgAICAAAAAAAAAAAAAAAAAAAAAAAAAAsAsAoAAKAAC0CgUCgAtAAtAAoLQAFAtAUAACgUBQAIABQFAlAUCUACUBQIBQIBQIACUCAASDIAJIIAAAAAAAAAAAAAAAAAAAAAAAAACgsAoAKAACgoFAoLQALQKBQLQFAtAAtAUC0ABQFAUBQFAUBQJQFAUCAUCAUCAlAgAIACSACUCASDMgAkggAAAAAAAAAAAAAAAAAAAAAAAALAKBAKCgAoKACgAoALQKCgUC0C0BQLQFAtAUC0BQFAUBQFAUBQJQFAlAAlAgFAgJQAJQIBQICUACTAJIICSCSCAAAAAAAAAAAAAAAAAAAAAAAAAsAoEA0AACgoKACgoKBQKC0C0BQLQLQLQFAtAUBQLQFAUBQFAUCUBQJQFAlAUCUCUCAUCAgJMAgFAgJMAAzIICSCSCAAAAAAAAAAAAAAAAAAAAAAAAAsAoLAKACgoKACgsQCgtARAKC0C0CxALQLQFAtAUC0C0BQFAUBQFAUCUBQJQFAlAgFAlAkwCUCAgJQICASCAkwCSCSDMgAyAAAAAAAAAAAAAAAAAAAAAAAACwCgoKCwCgsAAoLAKCgsQCgtAtAtAoFAtAtAtAUC0BQLQFAUBQFAUCUBQJQFAlAkwCUCUCUCUCUCAgJMAgIBMAgMyCSDMgAyAAAAAAAAAAAAAAAAAAAAAAAACwDUAA1AKBEAoLAKCgoLEAtAoLQLQLQLQLEAtAtAtAUC0C0BQFAUBQFAUCUBQJQJQFAlAlAkwCAlAzMAgICAkggIBIMyDMggIDIAAAAAAAAAAAAAAAAAAAAAAAALANQADUAoKCwADQLALEAoKCgoLEAtA1QLQLEAtAtAUC0BQLQFAUBQFAu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llhPOJno4g89ggJYICAkggIDIEgzPMGZBAQGQAAAAAAAAAAAAAAAAAAAAAAAAWAWAUFBoAFBYABYBQUFBYkFsFsFBbBbBYkFsFsCwWwLAsFsCwLAsEsCwSwLBLAsEsEsEsEsEsEmQQEsEBASwQEBJBmQZkAGQAAAAAAAAAAAAAAAAAAAAAAAAWAUFBQUFABQWJABYBbBQWwWwUFsFsCwWwWwWwLBbAsFsCwLAsCwSwLAsEsEsCwSwSwSwSwSwQCwQEBJBAQAGZBJBmQAZAAAAAAAAAAAAAAAAAAAAAAAABYBQIBoAFgFABQWwAWJBQUFsAFsFsFsFsCwWwLBbAsCwWwLAsCwSwLAsEsCwSwSwSwLBLBAQEsAEsEBAAQEkGQSQSQQAAAAAAAAAAAAAAAAAAAAAAAAFgFAgGoAABYBQLBQWwAWwUCwUFsFAsFsCwWwWwLAsFsCwLAsCwLBLAsCwSwSwASwQCwQEsEABAQCwQEBJBASQSQQAAAAAAAAAAAAAAAAAAAAAAAAAGgIBQWAAAWwUAFABQUCwUFsCwWwAWwLBbAsCwWwLAsCwLAsEsCwLBLAsEAsEBLABLBALBALBAQAEkEBASQQAAAAAAAAAAAAAAAAAAAAAAAAAFgFgFABbAABbBQAWwAWwAWwAUFsAFsCwAUCwLAsCwLAsCwLBAALBLABLABLABASwASwAQEAAkGZABJBAAAAAAAAAAAAAAAAAAAAAAAAAAWAUFAAAsFABQLBQLBQAWwAWwLBQLBbAAAsFsCwLAsCwLBLAAsEsCwQCwQACwQCwQAEsEAAsEBAASQQAAAAAAAAAAAAAAAAAAAAAAAAAFgFAgFAAABQAAWwUACwUAFsAAFsCwLBQALAsCwLAsCwAASwLABAALBAASwAQCwQAAEABAQEAAAAAAAAAAAAAAAAAAAAAAAAAABYBQAAUAAAFgAAFAsFAAsFAAsFsAAAFAsCwLAsCwLBAAALAsEAAsEsAAEsEAABLAAABASQQAAAAAAAAAAAAAAAAAAAAAAAAAAFgFAAABQAAAAUAAFsCwUACwLBQAALAsFsCwLAsCwLBLAAAAsEsAAEAsEAAAsEAAABAASQQAAAAAAAAAAAAAAAAAAAAAAAAAAFgFAAAAAsFAAAAsFAAABbAsFAAAsCwLAsFsCwLAsEsCwLAAABALAsEAAABAAAAAQAAEkEAAAAAAAAAAAAAAAAAAAAAAAAAABYBQAAAAAAWwAAAALBQAAAAWwLAsCwAUAAAAAAEsCwLBAAAAALBAAAAASwAAAASQQAAAAAAAAAAAAAAAAAAAAAAAAAAFABQAAAAAAAWwAAAAAWwAAAAAAAAAAAAAAAAAAALBLAAAAABLAAAAAABJBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWwUAAAAAAAAFsAAAAAACwWwLAAAAAAAAAAsCwLBAAAAAAASwAAAAAAAASQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBQAAAAAAAAOIKAAAAAAAAAAAAAAAAAAAAAAACcQAAAAAAAAASQQAAAAAAAAAAAAAAH/9k=');
