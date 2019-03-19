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
        res.text.should.equal("success");
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
        res.text.should.equal("username already take");
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
        res.text.should.equal("success");
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
        res.text.should.equal("wrong username or password")
        testUser.username = "test"
        done();
      });
  });

  it('should not login a user with the wrong password', function(done) {
    testUser.username = "wrong"

    agent.post('/api/user/login')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("wrong username or password")
        testUser.password = "password"
        done();
      });
  });

  after((done) => {
    done();
  });
});
