'use strict';

describe('Controller: ProfileCtrl', function () {

    // load the controller's module
    beforeEach(module('linkedoutApp'));

    var ProfileCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ProfileCtrl = $controller('ProfileCtrl', {
            $scope: scope
        });
    }));

    it('should set "me" to null', function () {
        expect(scope.me).toBe(null);
    });
});
