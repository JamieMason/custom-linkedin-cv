var _ = require('lodash');
var qRequest = require('q-request');
var self;

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}

self = module.exports = {

  getUri: {

    /**
     * 1) Redirect to this uri on linkedin to get the user's permission to access their data.
     * @param  {String} options.redirectUri
     *   http://example.com/path?code={{authCode}}&state={{salt}}
     * @return {String}
     */
    userPermission: {
      hostname: 'www.linkedin.com',
      path: _.template('/uas/oauth2/authorization?response_type=code&client_id=' + process.env.API_KEY + '&scope=' + [
        'r_contactinfo',
        'r_emailaddress',
        'r_fullprofile',
        'r_network',
        'rw_groups'
      ].join('%20') + '&state=' + process.env.SALT + '&redirect_uri=<%= redirectUri %>')
    },

    /**
     * 2)
     * @param  {String} options.authCode
     * @param  {String} options.redirectUri
     * @return {String}
     */
    accessToken: {
      hostname: 'www.linkedin.com',
      path: _.template('/uas/oauth2/accessToken?grant_type=authorization_code&code=<%= authCode %>&redirect_uri=<%= redirectUri %>&client_id=' + process.env.API_KEY + '&client_secret=' + process.env.SECRET_KEY)
    },

    /**
     * 3)
     * @param  {String} options.accessToken
     * @return {String}
     */
    profile: {
      hostname: 'api.linkedin.com',
      path: _.template('/v1/people/~:(' + [
        'associations',
        'certifications',
        'courses',
        'date-of-birth',
        'educations',
        'following',
        'honors',
        'interests',
        'job-bookmarks',
        'languages',
        'last-modified-timestamp',
        'member-url-resources',
        'mfeed-rss-url',
        'num-recommenders',
        'patents',
        'proposal-comments',
        'publications',
        'recommendations-received',
        'related-profile-views',
        'skills',
        'suggestions',
        'three-current-positions',
        'three-past-positions',
        'volunteer'
      ].join(',') + ')?oauth2_access_token=<%= accessToken %>')
    }

  },

  getAccessToken: function(options) {

    var hostname = self.getUri.accessToken.hostname;
    var path = self.getUri.accessToken.path({
      authCode: options.authCode,
      redirectUri: options.redirectUri
    });

    console.log('getAccessToken hostname: ' + hostname);
    console.log('getAccessToken path: ' + path);

    qRequest.post({
      secure: true,
      hostname: hostname,
      path: path,
      body: '\n'
    }).then(function(body) {

      body = parseJson(body);

      if (!body) {
        options.done('getAccessToken could not parse:\n\n' + body);
        return;
      }

      options.done(null, {
        expiresIn: body.expires_in,
        accessToken: body.access_token
      });

    }).fail(function(error) {
      options.done('getAccessToken error:\n\n' + error);
    });

  },

  getProfile: function(options) {

    var hostname = self.getUri.profile.hostname;
    var path = self.getUri.profile.path({
      accessToken: options.accessToken
    });

    console.log('getProfile hostname: ' + hostname);
    console.log('getProfile path: ' + path);

    qRequest.get({
      secure: true,
      hostname: hostname,
      path: path,
      headers: {
        'x-li-format': 'json'
      }
    }).then(function(body) {

      var src = body;

      body = parseJson(body);

      if (!body) {
        options.done('getProfile could not parse:\n\n' + body);
        return;
      }

      options.done(null, {
        json: body,
        src: src
      });

    }).fail(function(error) {
      options.done('getProfile error:\n\n' + error);
    });

  }

};
