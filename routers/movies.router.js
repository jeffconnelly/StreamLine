'use strict';

//Imports and initializations

const express = require('express');
const router = express.Router();
const { DATABASE_URL, PORT } = require('../config');
const { Movies, Favorites } = require('../models.js');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

router.use(morgan('common'));
router.use(bodyParser.json());

//Endpoints
router.get('/', (req, res) => {
  Movies
    .find()
    .then(movies => {
      res.json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong' });
    });
});

router.get('/favorites', (req, res) => {
  console.log('enter GET:Favorites');
  Favorites
    .find()
    .then(favorites => {
      res.json(favorites);
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
  let obj;
  Movies
    .findById(req.body.id)
    .then(movies => {
      obj = movies;
      return Favorites
        .create({
          title: obj.title,
          release_date: obj.release_date,
          overview: obj.overview,
          poster_path: obj.poster_path,
          vote_average: obj.vote_average,
          netflix: obj.netflix,
          amazon: obj.amazon,
          hbo: obj.hbo,
          hulu: obj.hulu
        });
    })
    .then(
      favorites => res.status(201).json(favorites.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.put('/:id', (req, res) => {
  const updateObj = {};
  const updateableFields = ['comment', 'user_rating'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  Favorites
    .findByIdAndUpdate(req.params.id, { $set: updateObj })
    .then(favorites => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.delete('/:id', (req, res) => {
  console.log('DELETE:', req.param.id);
  Favorites
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

module.exports = router;