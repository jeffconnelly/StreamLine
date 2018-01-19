'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Define movie list schema
const movieSchema = mongoose.Schema({
  title: String,
  release_date: String,
  poster_path: String,
  overview: String,
  vote_average: Number,
  netflix: String,
  amazon: String,
  hbo: String,
  hulu: String
});

//Favorites schema
const favoritesSchema = mongoose.Schema({
  title: String,
  release_date: String,
  poster_path: String,
  overview: String,
  vote_average: Number,
  netflix: String,
  amazon: String,
  hbo: String,
  hulu: String,
  comment: String,
  user_rating: Number
});

//Movies schema 
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
    hulu: this.hulu,
  };
};

//favorites schema 
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
    hulu: this.hulu,
    comment: this.comment,
    user_rating: this.user_rating,
  };
};

const Movies = mongoose.model('Movies', movieSchema);
const Favorites = mongoose.model('Favorites', favoritesSchema);
module.exports = { Movies, Favorites };