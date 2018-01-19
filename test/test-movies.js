'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const expect = chai.expect;

const { Movies}  = require('../models.js');
const {app, runServer, closeServer} = require('../server');
const { TEST_DATABASE_URL } = require('../config');

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
  return Movies.insertMany(seedData);
}


// function seedFavoritesPostData() {
//   console.info('seeding movies data');
//   const seedData = [];
//   for (let i = 1; i <= 10; i++) {
//     seedData.push({
//       title: faker.name.title(), 
//       release_date: faker.lorem.sentence(), 
//       poster_path: faker.lorem.sentence(), 
//       overview: faker.lorem.sentence(), 
//       vote_average: faker.random.number(), 
//       netflix: faker.lorem.sentence(),
//       amazon: faker.lorem.sentence(),
//       hbo: faker.lorem.sentence(),
//       hulu: faker.lorem.sentence()
//     });
//   }
//   return Favorites.insertMany(seedData);
// }

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

    it('should provide favorites list on GET', function() {

      return chai.request(app)
        .get('/stream')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
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

    //** Still working on POST test **/
    // let ObjectId = require('mongoose').Types.ObjectId;

    // it('should add a movie to Box Office', function() {

    //   const idData = {
    //     _id: ObjectId("5a60e2a01ac0adb9acea213f");
    //   };

    //   console.log();
    //   // let postResponse;
    //   return chai.request(app)
    //     .post('/stream')
    //     .send(idData)
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



