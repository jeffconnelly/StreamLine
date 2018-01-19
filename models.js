'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Movie schema
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

//Movies schema serialized
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

//Favorites schema serialized 
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

//Export movies and favorites schemas
const Movies = mongoose.model('Movies', movieSchema);
const Favorites = mongoose.model('Favorites', favoritesSchema);
module.exports = { Movies, Favorites };