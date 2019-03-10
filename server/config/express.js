var path = require('path'),
    express = require('express'),
    name = require('../controllers/auth.server.controller.js'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    routerName = require('../routes/name.server.routes');


module.exports.init = function() {

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

//serves static files from the angular app
  app.use(express.static('client'));

  //uses the listing router for all api calls
  app.use('/api/name', routerName); //Replace name with name of router
    
        // initialize cookie-parser to allow us access the cookies stored in the browser. 
    app.use(cookieParser());

    // initialize express-session to allow us track the logged-in user across sessions.
    app.use(session({
        key: 'user_sid',
        secret: 'somerandonstuffs',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000
        }
    }));
    
    // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});
    
    // middleware function to check for logged-in users and if not route to login
var sessionChecker = (req, res, next) => {
   
    if (req.session.user && req.cookies.user_sid) {
        next();
    }else {
         res.redirect('/login');
    }    
};
    
    // calls lgin function and write response weather it was successful
    app.post('/login',name.login,function(req,res){
        if(res.locals.log== true)
        {
           req.session.user = req.body.username;
           res.writeHead(200, {'Content-Type': 'text/plain'});
           res.end('success');
        }else
        {
           res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('wrong username or password');
        }
        
    });
    
    // calss create user and write response weather it was successful
    app.post('/reg',name.create,function(req,res){
        if(res.locals.success == true)
        {
           res.writeHead(200, {'Content-Type': 'text/plain'});
           res.end('success');
        }else
        {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('username already take');
        }
      
    });

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
