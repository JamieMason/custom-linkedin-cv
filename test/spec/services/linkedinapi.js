'use strict';

describe('Service: LinkedIn', function () {

    // load the service's module
    beforeEach(module('linkedoutApp'));

    // instantiate service
    var LinkedIn;
    beforeEach(inject(function (_LinkedIn_) {
        LinkedIn = _LinkedIn_;
    }));

    it('should do something', function () {
        expect(!!LinkedIn).toBe(true);
    });

});
