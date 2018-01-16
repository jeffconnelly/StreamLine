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
});

// describe('POST Movies/Add movie to Box Office', function() {
//   const item = {title: 'Inception'};
//   return chai.request(app)
//   .post('/')
//   .send(newItem)
// });
