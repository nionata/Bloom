var should = require('should'),
    request = require('supertest'),
    express = require('../config/express');

/* Global vars */
var app, agent, testUser

describe('User API tests', function() {

  this.timeout(10000);

  before((done) => {
    app = express.init();
    agent = request.agent(app);
    testUser = {
        username: "test",
        email: "test@email.com",
        password: "password"
    }

    done();
  });

  it('should create a user', function(done) {
    agent.post('/api/user/register')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.message.should.equal("User created successfully");
        done();
      })
  });

  it('should not create a user with a duplicate username', function(done) {
    agent.post('/api/user/register')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.message.should.equal("That username is taken");
        done();
      })
  });

  it('should login a user', function(done) {
    agent.post('/api/user/login')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.message.should.equal("User signed in successfully");
        done();
      });
  });

  it('should not login a user with the wrong username', function(done) {
    testUser.username = "wrong"

    agent.post('/api/user/login')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.message.should.equal("That username does not exist");
        testUser.username = "test"
        done();
      });
  });

  it('should not login a user with the wrong password', function(done) {
    testUser.password = "wrong"

    agent.post('/api/user/login')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.message.should.equal("Incorrect password");
        testUser.password = "password"
        done();
      });
  });

  it('should delete a user', function(done) {
    agent.post('/api/user/delete')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.message.should.equal("User deleted successfully");
        done();
      });
  });

  after((done) => {
    done();
  });
});
