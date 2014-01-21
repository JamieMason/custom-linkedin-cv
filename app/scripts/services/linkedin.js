'use strict';

angular.module('linkedoutApp').factory('LinkedIn', [

  '$q',
  '$window',

  function(

    $q,
    $window

  ) {

    var doc = $window.document;
    var script = doc.createElement('script');
    var deferred = $q.defer();

    script.src = 'http://platform.linkedin.com/in.js';

    script.innerHTML = [
      'api_key: zxqfbiusbj96',
      'authorize: true',
      'lang: en_GB',
      'onLoad: onLinkedInApiLoad',
      'scope: r_basicprofile r_emailaddress r_fullprofile r_network rw_groups'
    ].join('\n');

    $window.onLinkedInApiLoad = function() {
      deferred.resolve($window.IN);
    };

    doc.body.appendChild(script);

    return deferred.promise;

  }
]);
