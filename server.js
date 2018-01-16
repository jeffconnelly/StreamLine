'use strict';

//Initialize express, mongoose & middleware.
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const moviesRouter = require('./routers/movies.router');
const { PORT, DATABASE_URL } = require('./config');

const app = express();
app.use(morgan('common'));

//Send static files to client
app.use(express.static('public'));

//Re-route requests to our router
app.use('/stream', moviesRouter);

//Server functions
let server;
function runServer() {
  console.log('run server started');
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  console.log('close server start');
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};

