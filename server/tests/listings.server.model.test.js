var should = require('should'),
    mongoose = require('mongoose'),
    modelName = require('../models/name.server.model'),
    config = require('../config/config');

describe('', function() {

  before(function(done) {
    mongoose.connect(config.db.uri);
    done();
  });

  describe('', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('', function(done){
    });
  });

  afterEach(function(done) {
  });
});
