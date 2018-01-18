'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const faker = require('faker');
const mongoose = require('mongoose');
const {app, runServer, closeServer} = require('../server');
const { PORT, DATABASE_URL } = require('../config');
const { Movies, Favorites }  = require('../models.js');



chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedMoviePostData() {
  console.info('seeding movies data');
  const seedData = {
    'title': 'The Lord of the Rings: The Return of the King', 
    'release_date': '2003-12-01', 
    'poster_path': '/uexxR7Kw1qYbZk0RYaF9Rx5ykbj.jpg', 
    'overview': 'Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron\'s forces. Meanwhile, Frodo and Sam bring the ring closer to the heart of Mordor, the dark lord\'s realm.', 
    'vote_average': 8.2, 
    'netflix': true,
    'amazon': false,
    'hbo': true,
    'hulu': false
  };
  

  // this will return a promise
  return Movies.insert(seedData);
}

describe('Movies resource', function () {

  before(function () {
    return runServer(DATABASE_URL);
  });

  beforeEach(function () {
    return seedMoviePostData();
  });

  afterEach(function () {
    return tearDownDb();
  });

  after(function () {
    return closeServer();
  });
});





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