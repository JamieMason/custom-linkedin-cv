var Q = require('q');
var qRequest = require('q-request');
var linkedInApi = require('./linked-in-api');

module.exports = {

  tunnel: require('./tunnel'),

  /**
   * To begin with, we need to browse to this URI to login to LinkedIn. This gives permission to our
   * app to access our profile data.
   *
   * The redirectUri will be passed two GET params "code" and "state", which you'll need to keep.
   *
   * @param  {String} data.apiKey          In your "API Keys" at http://developer.linkedin.com
   * @param  {String} data.salt            A long unique string value of your choice that is hard to
   *                                       guess, passed back to you via state= to prevent CSRF.
   * @param  {String} data.redirectUri     http://example.com/path?code=TEMP_AUTH_CODE&state=SALT
   * @return {String}
   */
  getUserLoginUri: linkedInApi.getAuthCodeUri,

  /**
   * Once our user is logged in and our app has permission, we need to request an access token to be
   * able to make use of the priviledges we've been granted.
   *
   * @param  {String} options.authCode     After submitting the login at LinkedIn, this is passed to
   *                                       you via the "code" GET param.
   * @param  {String} options.secretKey    In your "API Keys" at http://developer.linkedin.com
   * @param  {String} options.apiKey       In your "API Keys" at http://developer.linkedin.com
   * @param  {String} options.redirectUri  LinkedIn requires that you pass the same redirectUri as
   *                                       you did to getUserLoginUri.
   * @return {Promise}
   */
  getAccessToken: function(options) {

    var deferred;
    var uri;

    if (!options || !('authCode' in options) || !('secretKey' in options) || !('apiKey' in options) || !('redirectUri' in options)) {
      throw new Error('Invalid call to .getAccessToken()');
    }

    deferred = Q.defer();

    // merge our params with the API URIs defined in config
    uri = linkedInApi.getAccessTokenUri({
      authCode: options.authCode,
      secretKey: options.secretKey,
      apiKey: options.apiKey,
      redirectUri: options.redirectUri
    });

    qRequest.post({
      secure: true,
      hostname: uri.hostname,
      path: uri.path,
      body: '\n'
    }).then(function(body) {

      try {
        body = JSON.parse(body);
      } catch(e) {
        deferred.reject(body);
      }

      deferred.resolve({
        expiresIn: body.expires_in,
        accessToken: body.access_token
      });

    }).fail(function (error) {
      deferred.reject(error);
    });

    return deferred.promise;

  },

  /**
   * By now we should have been granted privileges and have an access token. This request will give
   * us our LinkedIn profile as JSON.
   *
   * @param  {String} options.accessToken  Provided to you via {@see module.exports.getAccessToken}
   * @return {Promise}
   */
  getProfile: function(options) {

    var deferred;
    var uri;

    if (!options || !('accessToken' in options)) {
      throw new Error('Invalid call to .getProfile()');
    }

    deferred = Q.defer();

    // merge our params with the API URIs defined in config
    uri = linkedInApi.getProfileUri({
      accessToken: options.accessToken
    });

    qRequest.get({
      secure: true,
      hostname: uri.hostname,
      path: uri.path,
      headers: {
        'x-li-format': 'json'
      }
    }).then(function(body) {

      try {
        body = JSON.parse(body);
      } catch(e) {
        deferred.reject(body);
      }

      deferred.resolve(body);

    }).fail(function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

};
