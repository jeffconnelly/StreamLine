'use strict';

//Imports and initializations

const express = require('express');
const router = express.Router();
const { DATABASE_URL, PORT } = require('../config');
const { Movies }  = require('../models.js');

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
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

module.exports = router;
