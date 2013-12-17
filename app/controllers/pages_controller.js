var locomotive = require('locomotive');
var api = require('../modules/api');
var Controller = locomotive.Controller;
var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'LinkedIn JSON';
  this.profileUri = 'https://' + api.getUri.userPermission.hostname + api.getUri.userPermission.path({
    redirectUri: this.urlFor({
      controller: 'pages',
      action: 'profile'
    })
  });
  this.render();
};

PagesController.profile = function() {

  var self = this;
  var linkedInCode = self.param('code');
  var linkedInState = self.param('state');
  var accessToken;
  var accessTokenLifespan;

  function onProfile(err, data) {
    if (err) {
      self.title = 'Error fetching Profile';
      self.render();
    } else {
      self.title = 'Your LinkedIn Profile';
      self.json = data.json;
      self.jsonSrc = data.src;
      self.render();
    }
  }

  function onAccessToken(err, data) {
    if (err) {
      self.title = 'Error fetching accessToken';
      self.render();
    } else {
      accessToken = data.accessToken;
      accessTokenLifespan = data.expiresIn;
      api.getProfile({
        accessToken: accessToken,
        done: onProfile
      });
    }
  }

  console.log('code: ' + linkedInCode);
  console.log('state: ' + linkedInState);

  // Linked have redirected back with permission
  if (linkedInCode && linkedInState) {
    api.getAccessToken({
      authCode: linkedInCode,
      redirectUri: self.urlFor({
        controller: 'pages',
        action: 'profile'
      }),
      done: onAccessToken
    });
  }

};

module.exports = PagesController;
