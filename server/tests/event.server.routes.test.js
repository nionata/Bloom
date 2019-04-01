var should = require('should'),
    request = require('supertest'),
    express = require('../config/express');

// Global vars
var app, agent, testEvent,testUser

describe('Event API tests', function() {

  this.timeout(10000);

  before((done) => {
    app = express.init();
    agent = request.agent(app);
    testEvent = {
        eventtitle: "group meeting for software engineering project",
        eventcontent: "Donec varius sed tortor at blandit. Mauris dignissim finibus libero, vestibulum pellentesque eros fermentum vel. In suscipit risus ut dui convallis, eu sollicitudin nibh pharetra. Vivamus pharetra imperdiet quam, sed pellentesque erat rutrum vel. In libero velit, feugiat ut mauris vel, condimentum egestas sem. Aenean aliquet sapien vel bibendum hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare feugiat enim et lacinia.",
        userid: '6',
        eventstart: "2011-01-01T00:00:00.000Z",
        eventend: "2011-01-01T00:00:00.000Z",
        id:  "",
        approved:false
    };
       testUser = {
        username: "jake",
        email: "usertesttestuser@email.com",
        password: "jake",
        id: ""
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

  it('should create a event', function(done) {
    agent.post('/api/events/')
      .send(testEvent)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.should.be.an.instanceOf(Object).and.have.properties({
          eventtitle: testEvent.eventtitle,
          eventcontent: testEvent.eventcontent,
          userid: testEvent.userid,
          eventstart: testEvent.eventstart,
          eventend: testEvent.eventend,
          approved: testEvent.approved
        });
        testEvent.id = res.body.eventid
        done();
      })
  });
    
     it('should get all of the events', function(done) {
    agent.get('/api/events')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Array);
        done();
      });
  });
    
     it('should approve an event by id', function(done) {
    agent.put('/api/events/' + testEvent.id)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object).and.have.property('eventid');
        done();
      });
  });
    
    it('should get a event by id', function(done) {
    agent.get('/api/events/' + testEvent.id)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object).and.have.properties({
          approved: true
        });
        done();
      });
  });
     
    
  it('should not get a event with an invalid id', function(done) {
    agent.get('/api/events/0')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("Invalid event id");
        done();
      });
  });
    
    
    
    it('should delete a event', function(done) {
    agent.delete('/api/events/' + testEvent.id)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });
    
    it('should return not found when deleting an invalid user', function(done) {
    agent.delete('/api/event/' + testEvent.id)
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
