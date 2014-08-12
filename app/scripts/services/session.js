'use strict';

angular.module('linkedoutApp')
    .factory('Session', [

        'LinkedIn',

        function (LinkedIn) {

            return LinkedIn.then(function (IN) {
                return {
                    login: function (handler) {
                        IN.User.authorize(handler || angular.noop);
                    },
                    logout: function (handler) {
                        IN.User.logout(handler || angular.noop);
                    },
                    isLoggedIn: function () {
                        return IN.User.isAuthorized();
                    },
                    onLogin: function (handler) {
                        IN.Event.on(IN, 'auth', handler);
                    },
                    onLogout: function (handler) {
                        IN.Event.on(IN, 'logout', handler);
                    }
                };
            });

        }
    ]);
