'use strict';

angular.module('linkedoutApp')
    .controller('ProfileCtrl', [

        '$scope', 'Profile', 'COMMON',

        function ($scope, Profile, COMMON) {

            $scope.me = null;
            $scope.hasProfile = false;
            $scope.profileError = false;

            function convertBreaks(object, memberName) {
                object[memberName] = (object[memberName] || '').split('\n').join('<br>');
            }

            function convertAllBreaks(list, memberName) {
                if (list._total > 0) {
                    list.values.forEach(function (el) {
                        convertBreaks(el, memberName);
                    });
                }
            }

            var months = COMMON.months;

            $scope.formatDate = function (obj, fallback) {
                var str = '';
                if (!obj) {
                    return fallback || str;
                }
                if ('day' in obj) {
                    str += obj.day + ' ';
                }
                if ('month' in obj) {
                    str += months[obj.month] + ' ';
                }
                return str + obj.year;
            };

            function transformProfileData(profileData) {
                if (profileData.lastModifiedTimestamp) {
                    profileData.lastModifiedTimestamp = new Date(profileData.lastModifiedTimestamp);
                }
                convertBreaks(profileData, 'summary');
                convertAllBreaks(profileData.recommendationsReceived, 'recommendationText');
                convertAllBreaks(profileData.positions, 'summary');
                return profileData;
            }

            Profile.then(function (profile) {
                profile.get().then(function (profileData) {
                    $scope.me = transformProfileData(profileData);
                    $scope.hasProfile = true;
                }, function (err) {
                    $scope.profileError = true;
                });
            });

        }
    ]);
