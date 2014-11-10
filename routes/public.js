'use strict';

var express = require('express');

var router = express.Router();

/**
 * Home page.
 */
router.get('/', function(req, res) {
  res.send('welcome to the main page!');
});

module.exports = router;
