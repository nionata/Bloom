var path = require('path'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    userRouter = require('../routes/user.server.routes');
    eventsRouter = require('../routes/events.server.routes');
    announcementsRouter = require('../routes/announcements.server.routes');
    adminRouter = require('../routes/admin.server.routes');

module.exports.init = function() {

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //add tools
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser()); //allows access to browser cookers
  app.use(session({ //initialize express-session to allow us track the logged-in user across sessions
      key: 'user_sid',
      secret: 'somerandonstuffs',
      resave: false,
      saveUninitialized: false,
      cookie: {
          expires: 600000
      }
  }));

  //serves static files from the angular app
  app.use(express.static('client'));

  //applies different routers for all api calls
  app.use('/api/user', userRouter);
  app.use('/api/events', eventsRouter);
  app.use('/api/announcements', announcementsRouter);
  app.use('/api/admin', adminRouter);

  /*
      middleware
  */

  // Check if user's cookie is still saved in browser and user is not set, then automatically log the user out
  app.use((req, res, next) => {
      if (req.cookies.user_sid && !req.session.user) {
          res.clearCookie('user_sid');
      }
      next();
  });

  // check for logged-in users and if not route to login
  var sessionChecker = (req, res, next) => {
      if (req.session.user && req.cookies.user_sid) {
          next();
      } else {
           res.redirect('/login');
      }
  };

  //route to home page
  app.get('/', function(req, res) {
    res.sendFile('/client/index.html', { root: '.'});
  });

     //route to login page
    app.get('/login', function(req, res) {
    res.sendFile('/client/login.html', { root: '.'});
  });

    //check if login in and route to dash board
    app.get('/dashboard', sessionChecker, function (req, res) {
        res.sendFile('/client/dashboard.html', { root: '.'});
});

  return app;
};
