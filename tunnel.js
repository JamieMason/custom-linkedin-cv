var LocalTunnel = require('localtunnel-wrapper');
var Q = require('q');
var tunnel = null;

module.exports = {

  /**
   * Open a tunnel to our server at portNumber, eg http://localhost:3000
   * @param  {Number} portNumber
   * @return {Promise}
   */
  open: function(portNumber) {

    var deferred = Q.defer();

    tunnel = new LocalTunnel(portNumber);

    tunnel.start(function(error, hostname) {
      if (error) {
        deferred.reject(error);
      } else {
        // pass the tunnel details to our caller
        deferred.resolve({
          protocol: 'http',
          hostname: hostname
        });
      }
    });

    return deferred.promise;

  },

  /**
   * Close a previously opened tunnel
   * @return {Promise}
   */
  close: function() {

    var deferred = Q.defer();

    if (tunnel) {
      tunnel.stop(function() {
        tunnel = null;
        deferred.resolve();
      });
    } else {
      deferred.promise.delay(100).thenReject(new Error('No tunnel is open'));
    }

    return deferred.promise;

  }
};

// we should close our tunnel if the parent node process quits
process.on('exit', module.exports.close);
