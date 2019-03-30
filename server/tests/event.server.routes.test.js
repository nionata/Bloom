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
        adminid: "7",
        userid: '6',
        eventstart: "2019-03-30T18:30:00.000Z",
        eventend: "2019-03-30T20:30:00.000Z",
        id:  ""
    };
       testUser = {
        username: "usertesttestuser",
        email: "usertesttestuser@email.com",
        password: "password",
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
          adminid: testEvent.adminid,
          userid: testEvent.userid,
          eventstart: testEvent.eventstart,
          eventend: testEvent.eventend,
          approved: testEvent.approved
        });
        testEvent.id = res.body.id
        done();
      })
  });


  after((done) => {
    done();
  });
});
