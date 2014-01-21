'use strict';

describe('Controller: ProfilectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('linkedoutApp'));

  var ProfilectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfilectrlCtrl = $controller('ProfilectrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
