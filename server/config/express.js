var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    routerName = require('../routes/name.server.routes');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri); //Replace w sql possibly

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());

  //serves static files from the angular app
  app.use(express.static('client'));

  //uses the listing router for all api calls
  app.use('/api/name', routerName); //Replace name with name of router

  //for all other calls routes to the homepage
  app.get('*', function(req, res) {
    res.sendFile('/client/index.html', { root: '.'});
  });

  return app;
};
