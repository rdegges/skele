'use strict';

/**
 * Private routes, which are only accessible to logged-in users.
 */

var express = require('express');
var stormpath = require('express-stormpath');

var router = express.Router();

// Force all private routes to require a logged-in user.
router.use(stormpath.loginRequired);

/**
 * The dashboard page.
 */
router.get('/dashboard', function(req, res) {
  res.send('You are logged in!');
});

module.exports = router;
