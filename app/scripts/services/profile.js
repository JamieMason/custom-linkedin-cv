'use strict';

angular.module('linkedoutApp')
  .factory('Profile', [

    '$q',
    'LinkedIn',
    'Session',

    function(

      $q,
      LinkedIn,
      Session

    ) {

      return $q.all([LinkedIn, Session]).then(function(services) {

        var IN = services[0];
        var session = services[1];
        var fields = [

          // BASIC

          // 'current-share',
          'distance',
          'first-name',
          'formatted-name',
          'formatted-phonetic-name',
          'headline',
          'id',
          'industry',
          'last-name',
          'location',
          'maiden-name',
          'num-connections',
          'num-connections-capped',
          'phonetic-first-name',
          'phonetic-last-name',
          'picture-url',
          'positions',
          'public-profile-url',
          'site-standard-profile-request',
          'specialties',
          'summary',

          // EMAIL

          'email-address',

          // CONTACT

          'bound-account-types',
          'im-accounts',
          'main-address',
          'phone-numbers',
          'primary-twitter-account',
          'twitter-accounts',

          // FULL

          'associations',
          'certifications',
          'courses',
          'date-of-birth',
          'educations',
          // 'following',
          'honors-awards',
          'interests',
          // 'job-bookmarks',
          'languages',
          'last-modified-timestamp',
          'member-url-resources',
          'mfeed-rss-url',
          'num-recommenders',
          'patents',
          'proposal-comments',
          'publications',
          'recommendations-received',
          // 'related-profile-views',
          'skills',
          // 'suggestions',
          // 'three-current-positions',
          // 'three-past-positions',
          'volunteer'
        ];

        return {

          get: function() {

            var deferred = $q.defer();
            var endpoint = '/people/~:(' + fields.join(',') + ')';

            if (!IN.User.isAuthorized()) {
              deferred.reject(new Error('current user is not authorised'));
            } else {
              IN.API.Raw(endpoint).result(function(data) {
                if (data) {
                  deferred.resolve(data);
                }
              }).error(function(err) {
                deferred.reject(err);
              });
            }

            return deferred.promise;

          }

        };

      });

    }
  ]);
