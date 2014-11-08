var helpers = require('./helpers');
//var publicRoutes = require('./routes/public');
//var dashboardRoutes = require('./routes/dashboard');


// Initialize our MongoDB connection.
helpers.connectDB(process.env.MONGOHQ_URL)

// Initialize routes.
//var router = express.Router();
//router.use('/', publicRoutes);
//router.use('/dashboard', dashboardRoutes);

// Start our server.
var app = helpers.createApp();
//app.use(routes);
app.listen(process.env.PORT || 3000);
