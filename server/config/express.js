var path = require('path'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    pageRouter = require('../routes/page.server.routes'),
    userRouter = require('../routes/user.server.routes'),
    eventsRouter = require('../routes/events.server.routes'),
    announcementsRouter = require('../routes/announcements.server.routes'),
    googleurl =require('./google-util'),
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

  // middleware
  app.use((req, res, next) => {
      // check if user's cookie is still saved in browser and user is not set, then automatically log the user out
      if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
      }

      // check if a user is logged-in, if not, make sure they can't access the api
      if (!req.session.user || !req.cookies.user_sid) {
        if(req.originalUrl.includes("/api") && !req.originalUrl.includes("/api/user")) {
          res.send("Missing authentication")
        }
      } else {
        console.log(req.session.user);
      }

      next();
  });

  //applies page router
  app.use('/', pageRouter);
  app.use('/api/users', userRouter);
  app.use('/api/events', eventsRouter);
  app.use('/api/announcements', announcementsRouter);
  app.use('/api/admin', adminRouter);

  return app;
};
