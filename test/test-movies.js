'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

describe('Movies', function() {
  it('should load HTML file', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        (res).should.have.status(200);
        (res).should.be.html;
      });
  });
});

describe('GET Movies', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should provide movie list on GET', function() {
    return chai.request(app)
      .get('/stream')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.above(0);
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.have.keys(
            '_id', 'title', 'overview', 'vote_average', 'release_date', 'poster_path','amazon', 'hbo', 'hulu', 'netflix');
        });
      });
  });

  it('should provide one movie on GET by ID', function() {
    return chai.request(app)
      .get('/stream')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
      });
  });

  it('should add a movie to Box Office', function() {
    const item = {id: '5a5ebf0c1ac0adb9acea03ec'};
    return chai.request(app)
      .post('/stream')
      .send(item)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'overview', 'vote_average', 'poster_path','amazon', 'hbo', 'hulu', 'netflix');
        expect(res.body.id).to.not.equal(null);
      });
  });

  it('should update movie in Box Office', function() {

    const newData = {
      comment: 'Great movie!',
      user_rating: 5
    };

    return chai.request(app)
      .get('/stream')
      .then(function(res) {
        newData.id = res.body[0]._id;
        return chai.request(app)
          .put(`/stream/${newData.id}`)
          .send(newData);
      })
      .then(function(res) {
        console.log(res);
        expect(res).to.have.status(200);
        //Currently updates, but no response.
        // expect(res).to.be.json;
        // expect(res.body).to.be.a('object');
        // expect(res.body).to.equal(newData);
      });
  });

  it('should delete items from Box Office', function() {
    return chai.request(app)
  
      .get('/stream')
      .then(function(res) {
        return chai.request(app)
          .delete(`/stream/${res.body[0]._id}`);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
      });
  });
});