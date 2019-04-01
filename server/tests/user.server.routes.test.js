var should = require('should'),
    request = require('supertest'),
    express = require('../config/express');

// Global vars
var app, agent, testUser, testBio

describe('User API tests', function() {

  this.timeout(10000);

  before((done) => {
    app = express.init();
    agent = request.agent(app);
    testUser = {
        username: "usertesttestuser",
        email: "usertesttestuser@email.com",
        password: "password",
        id: ""
    };
    testBio = {
      firstName: "Test",
      lastName: "User",
      affiliation: "Individual",
      bio: "I am a simple test user",
    };

    done();
  });

  it('should create a user', function(done) {
    agent.post('/api/users/register')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object).and.have.properties({
          username: testUser.username,
          email: testUser.email
        });
        testUser.id = res.body.id
        done();
      })
  });

  it('should not create a user with a duplicate username', function(done) {
    agent.post('/api/users/register')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("That username is taken");
        done();
      })
  });

  it('should login a user', function(done) {
    agent.post('/api/users/login')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("User signed in successfully");
        done();
      });
  });

  it('should not login a user with the wrong username', function(done) {
    testUser.username = "wrong"

    agent.post('/api/users/login')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("That username does not exist");
        testUser.username = "test"
        done();
      });
  });

  it('should not login a user with the wrong password', function(done) {
    testUser.password = "wrong"

    agent.post('/api/users/login')
      .send(testUser)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("Incorrect password");
        testUser.password = "password"
        done();
      });
  });

  it('should get all of the users', function(done) {
    agent.get('/api/users')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Array);
        done();
      });
  });

  it('should get the current user', function(done) {
    agent.get('/api/users/user')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object).and.have.property('id', testUser.id);
        done();
      });
  });

  it('should get a user by id', function(done) {
    agent.get('/api/users/' + testUser.id)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object).and.have.property('id', testUser.id);
        done();
      });
  });

  it('should not get a user with an invalid id', function(done) {
    agent.get('/api/users/1')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("Invalid user id");
        done();
      });
  });

  it('should return empty when getting a user\'s bio that hasn\'t been set', function(done) {
    agent.get('/api/users/user/bio')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("Bio is empty");
        done();
      });
  });

  it('should set the current user\'s bio', function(done) {
    agent.post('/api/users/user/bio')
      .send(testBio)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object).and.have.property('bio', 'I am a simple test user');
        done();
      });
  });

  it('should not set the current user\'s bio if it is already set', function(done) {
    agent.post('/api/users/user/bio')
      .send(testBio)
      .expect(400)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("This user already has a bio");
        done();
      });
  });

  it('should update the current user\'s bio', function(done) {
    testBio.bio = 'changed';

    agent.put('/api/users/user/bio')
      .send(testBio)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object).and.have.property('bio', 'changed');
        done();
      });
  });

  it('should delete a user', function(done) {
    agent.delete('/api/users/' + testUser.id)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });

  it('should return not found when deleting an invalid user', function(done) {
    agent.delete('/api/users/' + testUser.id)
      .expect(404)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });

  after((done) => {
    done();
  });
});
