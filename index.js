var helpers = require('./helpers');
//var publicRoutes = require('./routes/public');
//var dashboardRoutes = require('./routes/dashboard');


// Initialize our MongoDB connection.
helpers.connectDB(process.env.MONGOHQ_URL)

// Initialize routes.
//var router = express.Router();
//router.use('/', publicRoutes);
//router.use('/dashboard', dashboardRoutes);

var app = express();

// Initialize Stormpath for authentication.
app.use(stormpath.init(app, {
  apiKeyId:     process.env.STORMPATH_API_KEY_ID,
  apiKeySecret: process.env.STORMPATH_API_KEY_SECRET,
  application:  process.env.STORMPATH_URL,
}));

//app.use(routes);

// Start our server.
app.listen(process.env.PORT || 3000);
