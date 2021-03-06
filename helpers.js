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

  // Disable powered by express header (for security).
  app.set('x-powered-by', false);

  // In development mode, output pretty HTML.
  if (app.get('env') === 'development') {
    app.locals.pretty = true;
  }

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
    redirectUrl:    '/dashboard',
  }));

  // In development mode, serve static assets.
  if (app.get('env') === 'development') {
    console.log('hi', __dirname + '/assets');
    app.use('/assets', express.static(__dirname + '/assets'));
  }
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
