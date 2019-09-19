var config = require('./config'),
    express = require('./express');

module.exports.start = function() {
  var app = express.init();
  var port = Number(process.env.PORT || config.port);
  app.listen(port, function() {
    console.log('App listening on port', port);
  });
};
