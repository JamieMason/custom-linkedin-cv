var apiConfig = require('./api-config.json');

/**
 * Merge a string containing {{tokens}} with values from an Object whose keys match those tokens
 *
 * @param  {String} string
 * @param  {Object} data
 * @return {String}
 */
function interpolate (string, data) {
  Object.keys(data).forEach(function(key) {
    string = string.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'g'), data[key]);
  });
  return string;
}

/**
 * Apply the supplied values to an API Endpoint's URI.
 *
 * @param  {String} endpointName
 * @param  {Object} data
 * @return {Object}
 */
function applyApiConfig(endpointName, data) {
  var api = apiConfig[endpointName];
  return {
    protocol: api.protocol,
    hostname: api.hostname,
    path: interpolate(api.path, data),
    toString: function () {
      return this.protocol + '://' + this.hostname + this.path;
    }
  };
}

module.exports = {

  /**
   * Using the required parameters, get the URI a user should visit to login to LinkedIn and
   * authorise your app to access their profile data.
   *
   * @param  {String} data.apiKey
   * @param  {String} data.salt
   * @param  {String} data.redirectUri
   * @return {Object}
   */
  getAuthCodeUri: applyApiConfig.bind(null, 'authCodeApi'),

  /**
   * Using the required parameters, get the URI for exchanging the user's authorisation code for an
   * access token we can use to retrieve a user's profile data.
   *
   * @param  {String} data.authCode
   * @param  {String} data.redirectUri
   * @param  {String} data.apiKey
   * @param  {String} data.secretKey
   * @return {Object}
   */
  getAccessTokenUri: applyApiConfig.bind(null, 'accessTokenApi'),

  /**
   * Using the required parameters, get the URI to retrieve a user's profile data.
   *
   * @param  {String} data.accessToken
   * @return {Object}
   */
  getProfileUri: applyApiConfig.bind(null, 'profileApi')

};
