'use strict';

describe('Service: Profile', function () {

    // load the service's module
    beforeEach(module('linkedoutApp'));

    // instantiate service
    var Profile;
    beforeEach(inject(function (_Profile_) {
        Profile = _Profile_;
    }));

    it('should do something', function () {
        expect(!!Profile).toBe(true);
    });

});
