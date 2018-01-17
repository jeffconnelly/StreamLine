'use strict';


const serverbase = '//localhost:8080/';
const streamURL = serverbase + 'stream';
const boxOfficeURL = streamURL + '/favorites';


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
    <label>My Rating:</label>
      <input type="number" name="user-rating" id="user-rating">
    <label>Comments:</label>
      <input type="text" name="user-comments" id="user-comments">
    <ul class="stream-list">
    <lable>Streaming On:</label>
      <li>Amazon: ${item.amazon}</li> 
      <li> HBO: ${ item.hbo }</li> 
      <li> Netflix: ${ item.netflix } </li> 
      <li> Hulu: ${item.hulu } </li>
      </ul>
      <div class = "movie-item-controls" >
        <button class = "add-to-box-office" >
        <span class = "button-label" > Add to Box Office </span></button> 
        <button class = "update-movie" >
        <span class = "button-label" > Update </span> </button> 
        <button class = "clear-movie" >
        <span class = "button-label" > Clear </span> 
        </button > <
        /div> < /
    li > `;
}

function boxOfficeTemplate(item) {
  console.log('boxOfficeTemplate');
  return `<li class = "box-office" >
        <div class = "box-office-card" >
        <p><span class = "movie-title" >${item.title} </span></p>
        <div class = "id" style = "display:none;" >${item._id}</div> 
        <div class = "poster-path"> 
          <img src = "http://image.tmdb.org/t/p/w185//${item.poster_path}"></>
        </div>
        <div class = "release-date"> Release Date: ${item.release_date }</div> 
        <p class = "overview"> Overview:${item.overview}</p> 
        <p class = "vote-rating"> Rating:${item.vote_average}</p> 
        <label > My Rating:${item.user_rating}</label> 
          <input type = "number" name = "user-rating" id = "user-rating" >
        <label > Comments:${item.comment}</label> 
          <input type = "text" name = "user-comments" id = "user-comments" >
        <ul class = "stream-list" >
          <li> Amazon:${item.amazon}</li> 
          <li> HBO:${item.hbo}</li> 
          <li> Netflix:${item.netflix}</li> 
          <li> Hulu:${item.hulu}</li>
        </ul>
        <div class = "movie-item-controls" >
          <button class = "remove-movie" >
            <span class = "button-label" > Remove </span> 
          </button> 
        </div> 
        </div>
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
  $('.box-office-list').remove;
  $('#movie-list-form').append('<ul class="movie-list"></ul>');
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
  $('#movie-list-form').append('<ul class="movie-card-list"></ul>');
  const movie = movieCardTemplate(data);
  $('.movie-card-list').html(movie);

} //end displayMovieCard


function addToBoxOffice() {
  console.log('addToBoxOffice');

  $('#movie-list-form').on('click', '.add-to-box-office', event => {
    console.log('addToBoxOffice');
    event.preventDefault();
    let currentItem = event.currentTarget;
    let id = $(currentItem).closest('li').find('div.id');
    id = id[0].innerText;
    console.log(id);
    $.ajax({
      dataType: 'json',
      url: streamURL,
      data: JSON.stringify({ id }),
      success: function(data) {
        getBoxOfficeList(data);
      },
      contentType: 'application/json',
      type: 'POST'
    });
  });
} //end addToBoxOffice

function getBoxOfficeList() {
  console.log('getBoxOfficeList');

  $.ajax({
    url: boxOfficeURL,
    success: function(data) {
      displayBoxOffice(data);
    },
    dataType: 'json',
    contentType: 'application/json',
    type: 'GET'
  });
} //end getMovieList


function displayBoxOffice(data) {
  console.log(data);
  console.log('displayBoxOffice');
  $('.movie-list').remove();
  $('.movie-card-list').remove();
  $('#movie-list-form').append('<ul class="box-office-list"></ul>');

  const movie = data.map((item) => boxOfficeTemplate(item));
  $('.box-office-list').html(movie);
  // $(updateBoxOffice);
  // $(deleteFromBoxOffice);
} //end displayBoxOffice


function updateBoxOffice() {
  console.log('updateBoxOffice');
  $('#movie-list-form').on('click', '.update-movie', event => {
    event.preventDefault();
    let rating = $('#user-rating').val();
    console.log(rating);
    let comment = $('#user-comments').val();
    console.log(comment);
    let id = $(event.currentTarget).closest('li').find('div.id');
    id = id[0].innerText;
    console.log(rating, comment, id);

    $.ajax({
      dataType: 'json',
      url: streamURL + '/' + id,
      data: JSON.stringify({ user_rating: rating, comment: comment }),
      success: function(data) {
        console.log('UPDATE SUCCESS');
        getBoxOfficeList(data);
      },
      contentType: 'application/json',
      type: 'PUT'
    });
  });
} //end updateBoxOffice


function deleteFromBoxOffice() {
  console.log('deleteFromBoxOffice');
  $('#movie-list-form').on('click', '.remove-movie', event => {
    event.preventDefault();
    let id = $(event.currentTarget).closest('li').find('div.id');
    id = id[0].innerText;
    console.log(id);

    $.ajax({
      dataType: 'json',
      url: streamURL + '/' + id,
      success: function(data) {
        getBoxOfficeList(data);
      },
      contentType: 'application/json',
      type: 'DELETE'
    });
  });
} //deleteFromBoxOffice


$(getMovieList);
$(displayMovieList);
$(addToBoxOffice);
$(deleteFromBoxOffice);
$(updateBoxOffice);
$(getMovieCard);
// $(getBoxOfficeList);