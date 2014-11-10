var express = require('express');
var mongoose = require('mongoose');
var stormpath = require('express-stormpath');

var DEFAULT_MONGO_URL = 'mongodb://localhost/skele';

/**
 * Initialize an Express application.
 *
 * @return {Object} - An Express application.
 */
module.exports.createApp = function() {
  var app = express();

  app.use(stormpath.init(app, {
    application:    process.env.STORMPATH_URL,
    secretKey:      process.env.STORMPATH_SECRET_KEY,
  }));

  return app;
};

/**
 * Connect this application to a Mongo database.
 *
 * @param {String} url - The MongoDB url to connect to -- if none is specified,
 *  we'll connect to 'mongodb://localhost/skele'.
 */
module.exports.connectDB = function(url) {
  mongoose.connect(url ? url : DEFAULT_MONGO_URL);
};
