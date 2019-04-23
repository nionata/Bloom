var should = require('should'),
    request = require('supertest'),
    express = require('../config/express');

// Global vars
var app, agent, testAnnouncement, testUser

describe('Resources API tests', function() {

  this.timeout(10000);

  before((done) => {
    app = express.init();
    agent = request.agent(app);
    testResource = {
      "title": "Test",
      "category": "Finance",
      "link": "https://www.youtube.com/watch?v=WEDIj9JBTC8",
      "description": "This is a great video for a crash course on finance!"
    };
    testUser = {
        username: "nionata",
        password: "1",
    };
    testAdmin = {
        username: "Cale",
        password: "Test"
    };

    done();
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

  it('should not create a resource if the user is not an admin', function(done) {
    agent.post('/api/resources/create')
      .send(testResource)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("The current user is not an admin");
        done();
      })
  });

  it('should not delete a resource if the user is not an admin', function(done) {
    agent.delete('/api/resources/' + 1)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("The current user is not an admin");
        done();
      });
  });

  it('should login an admin', function(done) {
    agent.post('/api/users/login')
      .send(testAdmin)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("User signed in successfully");
        done();
      });
  });

  it('should create a resource', function(done) {
    agent.post('/api/resources/create')
      .send(testResource)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object).and.have.properties(testResource);
        testResource.id = res.body.id
        done();
      })
  });

  it('should get all of the resources', function(done) {
    agent.get('/api/resources')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Array);
        done();
      });
  });

  it('should get a resource by id', function(done) {
    agent.get('/api/resources/' + testResource.id)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object).and.have.property('id', testResource.id);
        done();
      });
  });

  it('should not get a resource with an invalid id', function(done) {
    agent.get('/api/resources/1')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("Invalid resource id");
        done();
      });
  });

  it('should delete a resource', function(done) {
    agent.delete('/api/resources/' + testResource.id)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });

  it('should return not found when deleting an invalid resource', function(done) {
    agent.delete('/api/resources/' + testResource.id)
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
