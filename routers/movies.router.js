'use strict';

//Imports and initializations

const express = require('express');
const router = express.Router();
const { DATABASE_URL, PORT } = require('../config');
const { Movies }  = require('../models.js');
const { Favorites } = require('../models.js');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

console.log('router works!');
router.use(morgan('common'));
router.use(bodyParser.json());


//Endpoints
router.get('/', (req, res) => {
  Movies
    .find()
    .then(movies => {
      console.log(movies);
      res.json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong' });
    });
});

router.get('/:id', (req, res) => {
  Movies
    .findById(req.params.id)
    .then(movie => res.json(movie.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong' });
    });
});

router.post('/', (req, res) => {
  const requiredFields = ['title', 'overview', 'poster_path', 'vote_average', 'netflix', 'amazon', 'hbo', 'hulu'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Favorites
    .create({
      title: req.body.title,
      poster_path: req.body.poster_path,
      overview: req.body.overview,
      vote_average: req.body.vote_average,
      netflix: req.body.netflix,
      amazon: req.body.amazon,
      hbo: req.body.hbo,
      hulu: req.body.hulu,
      comment: req.body.comment,
      user_rating: req.body.user_rating})
    .then(
      movies => res.status(201).json(movies.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.put('/:id', (req, res) => {
  //Need to update comments. Do we need a 
  //comments property, or other properties?
  //Create comments and star rating properties in DB. 
  const updateObj = {};
  const updateableFields = ['comment', 'user_rating'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  Favorites
    .findByIdAndUpdate(req.params.id, {$set: updateObj})
    .then(movies => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.delete('/:id', (req, res) => {
  Favorites
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});




module.exports = router;
