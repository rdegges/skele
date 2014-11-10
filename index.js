var express = require('express');
var stormpath = require('express-stormpath');

//var helpers = require('./helpers');
//var publicRoutes = require('./routes/public');
//var dashboardRoutes = require('./routes/dashboard');


// Initialize our MongoDB connection.
//helpers.connectDB(process.env.MONGOHQ_URL)

// Initialize routes.
var router = express.Router();
//router.use('/', publicRoutes);
//router.use('/dashboard', dashboardRoutes);

var app = express();

// Initialize Stormpath for authentication.
app.use(stormpath.init(app, {
  application:  process.env.STORMPATH_URL,
  secretKey:    process.env.STORMPATH_SECRET_KEY,
}));

app.use('/', routes);

// Start our server.
app.listen(process.env.PORT || 3000);
