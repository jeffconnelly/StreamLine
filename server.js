'use strict';

//Initialize express, mongoose & middleware.
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const app = express();

//Send static files to client
app.use(express.static('public'));


//Port functions, can replace with runServer/closeServer functions
app.listen(process.env.PORT || 8080);

module.exports = app; // this if for testing