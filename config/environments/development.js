var express = require('express');

module.exports = function() {
  this.use(express.errorHandler());
  this.domain = 'http://localhost:5000';
};
