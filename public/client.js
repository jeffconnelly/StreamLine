'use strict';


const serverbase = '//localhost:8080/';
const streamURL = serverbase + 'stream';





//movie list template
function movieListTemplate(item) {
  console.log('movieListTemplate');

  return `<li class = "movie-item">
    <p><span class="movie-title">${item.title}</span></p>
    <div class = "id" style="display:none;">${item._id}</div>
    <div class = "poster-path"><img src="http://image.tmdb.org/t/p/w185/${item.poster_path}"</></div>
    <div class = "release-date">Release Date:  ${item.release_date}</div>
    <div class="movie-item-controls">
    <button class="view-movie">
    <span class="button-label">View</span>
    </button>
    </div>
    </li>`;
}

function movieCardTemplate(item) {
  console.log('movieCardTemplate');
  console.log(item);
  return `<li class = "movie-card">
    <span class="movie-title">${item.title}</span>
    <div class = "id" style="display:none;">${item.id}</div>
    <div class = "poster-path"><img src="http://image.tmdb.org/t/p/w185//${item.poster_path}"</></div>
    <div class = "release-date">Release Date: ${item.release_date}</div>
    <p>Overview: ${item.overview}</p><p>Rating: ${item.vote_average}</p>
    <ul class="stream-list">
      <li>Amazon: ${item.amazon}</li>
      <li>HBO: ${item.hbo}</li>
      <li>Netflix: ${item.netflix}</li>
      <li>Hulu: ${item.hulu}</li></ul>
    <div class="movie-item-controls">
      <button class="add-to-box-office">
      <span class="button-label">Add to Box Office</span>
      </button></div>
      </li>`;
}

function boxOfficeTemplate(item) {
  console.log('boxOfficeTemplate');
  return `<li class = "box-office">
  <p><span class="movie-title">${item.title}</span></p>
  <div class = "id" style="display:none;">${item.id}</div>
  <div class = "poster-path"><img src="http://image.tmdb.org/t/p/w185//${item.poster_path}"</></div>
  <div class = "release-date">Release Date: ${item.release_date}</div>
  <p>class = "overview" Overview: ${item.overview}</p>
  <p>class="vote-rating" Rating: ${item.vote_average}</p>
  <p>class = "user-rating">My Rating:${item.user_rating}</p>
  <p>class = "comments">Comments:${item.comment}</p>
  <ul class="stream-list">
    <li>Amazon: ${item.amazon}</li>
    <li>HBO: ${item.hbo}</li>
    <li>Netflix: ${item.netflix}</li>
    <li>Hulu: ${item.hulu}</li></ul>
  <div class="movie-item-controls">
  <button class="update-movie">
    <span class="button-label">Update</span>
    </button>
  <button class="remove-movie">
    <span class="button-label">Remove</span>
    </button></div>
    </li>`;
}

function getMovieList() {
  console.log('getMovieList');

  $.ajax({
    url: streamURL,
    data: {
      format: 'json'
    },
    success: function(data) {
      displayMovieList(data);
    },
    dataType: 'json',
    contentType: 'application/json',
    type: 'GET'
  });
} //end getMovieList


function displayMovieList(data) {
  console.log('displayMovieList');
  console.log(data);
  const movie = data.map((item) => movieListTemplate(item));
  $('.movie-list').html(movie);

} //end displayMovieList


function getMovieCard() {
  console.log('getMovieCard');
  $('.movie-list').on('click', '.view-movie', event => {
    console.log('view click');
    event.preventDefault();
    let id = $(event.currentTarget).closest('li').find('div.id');
    let _id = id[0].innerHTML;

    $.ajax({
      url: streamURL + '/' + _id,
      data: {
        format: 'json'
      },
      success: function(data) {
        displayMovieCard(data);
      },
      type: 'GET'
    });

  });
} //end getMovieCard


function displayMovieCard(data) {
  console.log('displayMovieCard');
  $('.movie-list').remove();
  const movie = movieCardTemplate(data);
  $('#movie-list-form').html(movie);
  $(addToBoxOffice);
} //end displayMovieCard


function addToBoxOffice() {
  console.log('addToBoxOffice');

  $('.movie-card').on('click', '.add-to-box-office', event => {
    console.log('addToBoxOffice');
    event.preventDefault();
    let currentItem = event.currentTarget;
    let id = $(currentItem).closest('li').find('div.id');
    id = id[0].innerText;
    console.log(typeof id + id);


    $.ajax({
      dataType: 'json',
      url: streamURL,
      data: JSON.stringify({ id }),
      success: function(data) {
        displayBoxOffice(data);
      },
      contentType: 'application/json',
      type: 'POST'
    });
  });
} //end addToBoxOffice


function displayBoxOffice(data) {
  console.log('displayBoxOffice');
  $('.movie-card').remove();
  console.log('movieCardData = ' + data);

  const movie = data.map((item) => boxOfficeTemplate(item));
  $('.box-office').html(movie);

} //end displayBoxOffice


// function updateBoxOffice() {
//   console.log('updateBoxOffice');
//   $('.update-movie').on('click', event => {
//     let rating = $('.rating').val();
//     let comment = $('.comments').text();
//     let id = event.currentTarget().attr('id');

//     $.ajax({
//       url: streamURL + '/' + id,
//       data: {
//         format: 'json',
//         user_rating: rating,
//         comment: comment,
//       },
//       success: function(data) {
//         displayBoxOffice(data);
//       },
//       type: 'PUT'
//     });
//   });
// } //end updateBoxOffice


// function deleteFromBoxOffice() {
//   console.log('deleteFromBoxOffice');
//   $('.remove-movie').on('click', event => {
//     event.preventDefault();
//     let id = event.currentTarget().attr('id');
//     $.ajax({
//       url: streamURL + '/' + id,
//       data: {
//         format: 'json',
//       },
//       success: function(data) {
//         displayBoxOffice(data);
//       },
//       type: 'DELETE'
//     });
//   });
// } //deleteFromBoxOffice



$(getMovieList);
$(displayMovieList);
$(getMovieCard);
$(addToBoxOffice);
// $(deleteFromBoxOffice);
// $(updateBoxOffice);