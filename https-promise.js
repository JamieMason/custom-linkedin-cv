var https = require('https');
var Q = require('q');

/**
 * Promise wrapper for http://nodejs.org/api/https.html#https_https_request_options_callback
 * @param  {Object} options
 * @return {Promise}
 */

function makeRequest(options) {

  var deferred = Q.defer();
  var chunks = [];
  var request;

  request = https.request(options, function(response) {

    // this project is only concerned with utf8
    response.setEncoding('utf8');

    // collect the data as it comes in then resolve promise once we have it all
    response.on('data', chunks.push.bind(chunks)).on('end', function() {
      deferred.resolve(chunks.join(''));
    });

  });

  // set POST body
  if (options.body) {
    request.write(options.body);
  }

  request.on('error', function(error) {
    deferred.reject(error);
  });

  // make the request
  request.end();

  return deferred.promise;
}

module.exports = {

  /**
   * Promise wrapper for http://nodejs.org/api/https.html#https_https_request_options_callback
   * @param  {Object} options
   * @return {Promise}
   */
  post: function(options) {
    options.method = 'POST';
    return makeRequest(options);
  },

  /**
   * Promise wrapper for http://nodejs.org/api/https.html#https_https_request_options_callback
   * @param  {Object} options
   * @return {Promise}
   */
  get: function(options) {
    options.method = 'GET';
    return makeRequest(options);
  }

};
