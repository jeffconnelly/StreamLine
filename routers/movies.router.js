'use strict';

//Imports and initializations
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// const { DATABASE_URL, PORT } = require('./config');
const { MovieList } = require('../models.js');

console.log(MovieList);

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());


//Endpoints
app.get('/', (req, res) => {
  MovieList 
    .find()
    .then(movies => {
      console.log(movies);
      res.json(movies.map(movie => movie.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

module.exports = router ;
