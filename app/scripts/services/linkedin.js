'use strict';

angular.module('linkedoutApp').factory('LinkedIn', [

    '$q', '$window', 'LinkedInConfig',

    function ($q, $window) {

        var doc = $window.document;
        var script = doc.createElement('script');
        var deferred = $q.defer();

        script.src = 'http://platform.linkedin.com/in.js';

        script.innerHTML = [
            'api_key: ' + LinkedInConfig.apiKey,
            'authorize: ' + LinkedInConfig.authorize,
            'lang: ' + LinkedInConfig.lang,
            'onLoad: onLinkedInApiLoad',
            'scope: ' + LinkedInConfig.scope
        ].join('\n');

        $window.onLinkedInApiLoad = function () {
            deferred.resolve($window.IN);
        };

        doc.body.appendChild(script);

        return deferred.promise;

    }
]);
