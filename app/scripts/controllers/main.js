'use strict';

angular.module('linkedoutApp')
  .controller('MainCtrl', [

    '$scope',
    'Session',

    function(

      $scope,
      Session

    ) {

      $scope.isLoggedIn = false;

      Session.then(function(session) {

        function updateLoginState(methodName, isLoggedIn) {
          session[methodName](function() {
            $scope.$apply(function() {
              $scope.isLoggedIn = isLoggedIn;
            });
          });
        }

        $scope.login = session.login;

        updateLoginState('onLogin', true);
        updateLoginState('onLogout', false);

      });

    }
  ]);
