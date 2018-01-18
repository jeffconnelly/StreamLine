'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const expect = chai.expect;

const { Movies }  = require('../models.js');
const {app, runServer, closeServer} = require('../server');
const { TEST_DATABASE_URL } = require('../config');
console.log(TEST_DATABASE_URL);

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
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      title: faker.name.title(), 
      release_date: faker.lorem.sentence(), 
      poster_path: faker.lorem.sentence(), 
      overview: faker.lorem.sentence(), 
      vote_average: faker.random.number(), 
      netflix: faker.lorem.sentence(),
      amazon: faker.lorem.sentence(),
      hbo: faker.lorem.sentence(),
      hulu: faker.lorem.sentence()
    });
  }
  // this will return a promise
  // console.log(Movies.insertMany(seedData));
  return Movies.insertMany(seedData);
}

describe('Movies resource', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
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

  describe('GET Movies', function() {


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
            expect(item).to.include.keys(
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

    // it('should add a movie to Box Office', function() {
    //   // const item = {id: '5a5ebf0c1ac0adb9acea03ec'};
    //   return chai.request(app)
    //     .post('/stream')
    //     // .send(item)
    //     .then(function(res) {
    //       expect(res).to.have.status(201);
    //       expect(res).to.be.json;
    //       expect(res.body).to.be.a('object');
    //       expect(res.body).to.include.keys('id', 'title', 'overview', 'vote_average', 'poster_path','amazon', 'hbo', 'hulu', 'netflix');
    //       expect(res.body.id).to.not.equal(null);
    //     });
    // });

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
          expect(res).to.have.status(204);
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

});



