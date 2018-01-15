'use strict';

//Imports and initializations
const express = require('express');

const { DATABASE_URL, PORT } = require('../config');
const  { Movies }  = require('../models.js');

const router = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



console.log('router works!');
// console.log(Movies);

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());


//Endpoints
app.get('/', (req, res) => {
  console.log('hello');
  Movies
    .find()
    .then(movies => {
      console.log(movies);
      res.status(204);
      res.json(movies.get());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});

module.exports = router;
