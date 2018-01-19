'use strict';

///////////const definitions/////////////
const serverbase = '/';
const streamURL = serverbase + 'stream';
const boxOfficeURL = streamURL + '/favorites';


///////////HTML Templates////////////////
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
    <span class="movie-title-card">${item.title}</span>
    <div class = "id" style="display:none;">${item.id}</div>
    <div class = "poster-path"><img src="http://image.tmdb.org/t/p/w185//${item.poster_path}"</></div>
    <p class="overview"><span class="bold-title">Overview:</span> ${item.overview}</p><p><span class="bold-title">Rating:</span> ${item.vote_average}</p>
    <ul class="stream-list">
    <label class="bold-title">Streaming:</label>
      <li>Amazon: ${item.amazon}</li> 
      <li> HBO: ${ item.hbo }</li> 
      <li> Hulu: ${item.hulu } </li>
      <li> Netflix: ${ item.netflix } </li> 
      </ul>
      <div class = "movie-item-controls" >
        <button class = "add-to-box-office" >
          <span class = "button-label" > Add to Box Office </span>
        </button>  
        <button class = "back-to-list" >
          <span class = "button-label" > Back to Movie List </span> 
        </button>
        <button class = "go-to-box-office-list" >
          <span class = "button-label" > Go To Box Office </span> 
        </button>
      </div> 
      </li> `;
}

function boxOfficeTemplate(item) {
  console.log('boxOfficeTemplate');
  let rating;
  let comment;

  if (item.user_rating) {
    console.log(`${item.rating}`);
    rating = item.user_rating;
  } else {
    rating = '';
  }
  if (item.comment) {
    comment = item.comment;
  } else {
    comment = '';
  }
  return `<li class = "box-office" >
        <div class = "box-office-card" >
        <p><span class = "movie-title-card" >${item.title} </span></p>
        <div class = "id" style = "display:none;" >${item._id}</div> 
        <div class = "poster-path"> 
          <img src = "http://image.tmdb.org/t/p/w185//${item.poster_path}"></>
        </div>
        <div class = "release-date"><span class="bold-title"> Release Date: </span>${item.release_date}</div> 
        <p class = "overview"><span class="bold-title"> Overview: </span>${item.overview}</p> 
        <p class = "vote-rating"><span class="bold-title">  Rating: </span>${item.vote_average}</p> 
        <label ><span class="bold-title"> My Rating: </span>${rating}</label><br> 
          <input type = "number" name = "user-rating" id = "user-rating" ></br></br>
        <label ><span class="bold-title">Comments: </span>${comment}</label><br> 
          <input type = "text" name = "user-comments" id = "user-comments" >
        <ul class = "stream-list" >
          <label><span class="bold-title">Streaming: </span></label>
          <li> Amazon: ${item.amazon}</li> 
          <li class='available-movie'> HBO: ${item.hbo}</li> 
          <li> Hulu: ${item.hulu}</li>
          <li> Netflix: ${item.netflix}</li> 
        </ul>
        <div class = "movie-item-controls" >
          <button class = "remove-movie" >
            <span class = "button-label" > Remove </span> 
          </button>
          <button class = "update-movie" >
            <span class = "button-label" > Update </span> </button>
          <button class = "back-to-list" >
            <span class = "button-label" > Back to Movie List </span> 
          </button>
        </div> 
        </div>
        </li>`;
}


/////////////////API Calls/////////////////////////
function getMovieList() {
  console.log('getMovieList');

  $.ajax({
    url: streamURL,
    data: {
      format: 'json' //GET Movie Collection
    },
    success: function(data) {
      displayMovieList(data);
    },
    dataType: 'json',
    contentType: 'application/json',
    type: 'GET'
  });
} //end getMovieList


function addToBoxOffice() {
  console.log('addToBoxOffice');

  $('#movie-list-form').on('click', '.add-to-box-office', event => {
    console.log('addToBoxOffice');
    event.preventDefault();
    let currentItem = event.currentTarget;
    let id = $(currentItem).closest('li').find('div.id');
    id = id[0].innerText;
    console.log(id);
    $.ajax({ //Add movie to Favorites collection
      dataType: 'json',
      url: streamURL,
      data: JSON.stringify({ id }),
      success: function(data) {
        changeButtonToAdded(data);
      },
      contentType: 'application/json',
      type: 'POST'
    });
  });
} //end addToBoxOffice

function getMovieCard() {
  console.log('getMovieCard');
  $('.movie-list').on('click', '.view-movie', event => {
    console.log('view click');
    event.preventDefault();
    let id = $(event.currentTarget).closest('li').find('div.id');
    let _id = id[0].innerHTML;

    $.ajax({
      url: streamURL + '/' + _id,
      data: { //GET/:id from Movie Collection
        format: 'json'
      },
      success: function(data) {
        displayMovieCard(data);
      },
      type: 'GET'
    });
  });
} //end getMovieCard

function getBoxOfficeList() {
  console.log('getBoxOfficeList');

  $.ajax({
    url: boxOfficeURL,
    success: function(data) {
      displayBoxOffice(data); //GET from Favorites collection
    },
    dataType: 'json',
    contentType: 'application/json',
    type: 'GET'
  });
} //end getMovieList



function updateBoxOffice() {
  console.log('updateBoxOffice');
  $('#movie-list-form').on('click', '.update-movie', event => {
    event.preventDefault();
    let rating = $(event.currentTarget).closest('li').find('#user-rating').val();
    console.log(rating);
    let comment = $(event.currentTarget).closest('li').find('#user-comments').val();
    console.log(comment);

    let id = $(event.currentTarget).closest('li').find('div.id');
    id = id[0].innerText;
    console.log(rating, comment, id);

    $.ajax({ //Update movie from Favorites Collection
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

    $.ajax({ //Delete movie from Favorites Collection
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

function backToMovieList() {
  $('#movie-list-form').on('click', '.back-to-list', event => {
    $.ajax({
      url: streamURL,
      data: {
        format: 'json' //GET movies from Movie Collection
      },
      success: function(data) {
        displayMovieList(data);
      },
      type: 'GET'
    });
  });
}


//////////////////Render DOM Methods////////////////////
function displayMovieList(data) {
  console.log('displayMovieList');
  $('.box-office-list').remove;
  $('#movie-list-form').append('<ul class="movie-list"></ul>');
  console.log(data);
  const movie = data.map((item) => movieListTemplate(item));
  $('.movie-list').html(movie);

} //end displayMovieList


function displayMovieCard(data) {
  console.log('displayMovieCard');
  $('.movie-list').remove();
  $('#movie-list-form').append('<ul class="movie-card-list"></ul>');
  const movie = movieCardTemplate(data);
  $('.movie-card-list').html(movie);

} //end displayMovieCard


function changeButtonToAdded() {
  $('.add-to-box-office').remove();
  $('.movie-item-controls').prepend(`<button class = "added" disabled= "">
<span class = "button" >Added</span>`);
}


function goToBoxOffice() {
  console.log('goToBoxOffice');

  $('#movie-list-form').on('click', '.go-to-box-office-list', event => {
    event.preventDefault();
    getBoxOfficeList();
  });
}


function displayBoxOffice(data) {
  console.log(data);
  console.log('displayBoxOffice');
  if (data.length !== 0) {
    $('.movie-list').remove();
    $('.movie-card-list').remove();
    $('.box-office-list').remove();
    $('#movie-list-form').append('<ul class="box-office-list"></ul>');

    const movie = data.map((item) => boxOfficeTemplate(item));
    $('.box-office-list').html(movie);
  } else {
    $('.movie-list').remove();
    $('.movie-card-list').remove();
    $('.box-office-list').remove();
    getMovieList();
  }
} //end displayBoxOffice


$(getMovieList);
$(updateBoxOffice);
$(displayMovieList);
$(addToBoxOffice);
$(deleteFromBoxOffice);
$(getMovieCard);
$(goToBoxOffice);
$(backToMovieList);