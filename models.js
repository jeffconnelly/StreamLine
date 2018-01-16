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
  netflix: Boolean,
  amazon: Boolean,
  hbo: Boolean,
  hulu: Boolean
});

//Favorites schema hard coded
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
  user_rating: Number
});


//Reference method for Favorites schema

//Refer to movies for favorites movieId
const movieReference = mongoose.model('movieReference', movieSchema);

//Favorites schema with reference
// const favoritesSchema = mongoose.Schema({
//   movieId:  {type: mongoose.Schema.Types.ObjectId, 
//     ref: 'MovieReference'},
//   comment: String,
//   user_rating: Number,
// });


// //Users schema shell
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'favorites' }]
// });

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

// //Favorite schema serialize w/ reference method
// favoritesSchema.methods.serialize = function() {
//   return {
//     movieId:  movieReference.id,
//     comment: this.comment,
//     user_rating: this.user_rating
//   };
// };


//favorites schema hard coded
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

module.exports = {Movies, Favorites};


