'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const movieSchema = mongoose.Schema({
  title: String,
  release_date: String,
  poster_path: String,
  overview: String,
  vote_average: Number,
  netflix: Boolean,
  amazon: Boolean,
  hbo: Boolean,
  hulu: Boolean
});

//Create schema for Box Office
const favoritesSchema = mongoose.Schema({
  title: String,
  release_date: String,
  poster_path: String,
  overview: String,
  vote_average: Number,
  netflix: Boolean,
  amazon: Boolean,
  hbo: Boolean,
  hulu: Boolean,
  comment: String,
  user_rating: Number,
});

movieSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    poster_path: this.poster_path,
    overview: this.overview,
    vote_average: this.vote_average,
    netflix: this.netflix,
    amazon: this.amazon,
    hbo: this.hbo,
    hulu: this.hulu
  };
};

favoritesSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    poster_path: this.poster_path,
    overview: this.overview,
    vote_average: this.vote_average,
    netflix: this.netflix,
    amazon: this.amazon,
    hbo: this.hbo,
    hulu: this.hulu
  };
};

const Movies = mongoose.model('Movies', movieSchema);

const Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = {Movies};
module.exports = {Favorites};

