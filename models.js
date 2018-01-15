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

const MovieList = mongoose.model('MovieList', movieSchema);

module.exports = {MovieList};
