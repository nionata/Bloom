var should = require('should'),
    request = require('supertest'),
    express = require('../config/express');

// Global vars
var app, agent, testAnnouncement, testUser

describe('Announcements API tests', function() {

  this.timeout(10000);

  before((done) => {
    app = express.init();
    agent = request.agent(app);
    testAnnouncement = {
      title: "Test Announcement",
      content: "This is my test announcement"
    };
    testUser = {
        username: "nionata",
        password: "1",
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

  it('should create an announcement', function(done) {
    agent.post('/api/announcements/create')
      .send(testAnnouncement)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object).and.have.properties({
          title: testAnnouncement.title,
          content: testAnnouncement.content
        });
        testAnnouncement.id = res.body.id
        done();
      })
  });

  it('should get all of the announcements', function(done) {
    agent.get('/api/announcements')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Array);
        done();
      });
  });

  it('should get all of the approved announcements', function(done) {
    agent.get('/api/announcements/?approved=true')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Array);
        var approved = true;
        res.body.forEach((announcement) => {
          if(announcement.approved === "false") {
            approved = false;
          }
        });
        approved.should.equal(true)
        done();
      });
  });

  it('should get an announcement by id', function(done) {
    agent.get('/api/announcements/' + testAnnouncement.id)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.be.an.instanceOf(Object).and.have.property('id', testAnnouncement.id);
        done();
      });
  });

  it('should not get an announcement with an invalid id', function(done) {
    agent.get('/api/announcements/1')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("Invalid announcement id");
        done();
      });
  });

  it('should like an announcement', function(done) {
    agent.put('/api/announcements/' + testAnnouncement.id + '/like')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.have.property('likes', 1);
        done();
      });
  });

  it('should not like an announcement with an invalid id', function(done) {
    agent.put('/api/announcements/1/like')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("Invalid announcement id");
        done();
      });
  });

  it('should approve an announcement', function(done) {
    agent.put('/api/announcements/' + testAnnouncement.id + '/review')
      .send({"review": true})
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.body.should.have.property('approved', true);
        done();
      });
  });

  it('should delete an announcement if it gets denied', function(done) {
    const tempAnnouncement = {
      title: "Pending Announcement",
      content: "This will get deleted",
    };

    agent.post('/api/announcements/create')
      .send(tempAnnouncement)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        const id = res.body.id;

        agent.put('/api/announcements/' + id + '/review')
          .send({"review": false})
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.text.should.equal("Invalid announcement id");
            done();
          });
      });
  });

  it('should not review an announcement with an invalid id', function(done) {
    agent.put('/api/announcements/1/review')
      .send({"review": true})
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.text.should.equal("Invalid announcement id");
        done();
      });
  });

  it('should delete an announcement', function(done) {
    agent.delete('/api/announcements/' + testAnnouncement.id)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });

  it('should return not found when deleting an invalid announcement', function(done) {
    agent.delete('/api/announcements/' + testAnnouncement.id)
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
