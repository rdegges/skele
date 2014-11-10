var express = require('express');
var stormpath = require('express-stormpath');

var helpers = require('./helpers');
var publicRoutes = require('./routes/public');
//var dashboardRoutes = require('./routes/dashboard');


// Initialize our MongoDB connection.
helpers.connectDB(process.env.MONGOHQ_URL);

// Initialize routes.
var router = express.Router();
router.use('/', publicRoutes);
//router.use('/dashboard', dashboardRoutes);

// Initialize our Express application.
var app = helpers.createApp();

// Initialize our middleware.
helpers.initMiddleware(app);

// Use our routes.
app.use('/', router);

// Start our server.
app.listen(process.env.PORT || 3000);
