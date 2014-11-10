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

  // Enable case sensitive routing.
  app.set('case sensitive', true);

  // Enable strict routing.
  app.set('strict routing', true);

  // Use Jade for rendering templates.
  app.set('view engine', 'jade');

  // Use a cool x-powered-by header >:D
  app.set('x-powered-by', 'skele/1.0.0');

  return app;
};

/**
 * Initialize all middleware on an Express application.
 *
 * @param {Object} app - An Express application.
 */
module.exports.initMiddleware = function(app) {
  app.use(stormpath.init(app, {
    application:    process.env.STORMPATH_URL,
    secretKey:      process.env.STORMPATH_SECRET_KEY,
  }));
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
