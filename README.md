# Tricia-Jeff-Node-Capstone   


## Pitch
Streamline your streaming process!  StreamLine is the definitive directory for finding where you can watch movies and TV shows across multiple streaming services. 

## Link to Deployed Version

https://streamline-capstone.herokuapp.com/

## Tech Stack

* Node.js
* Express.js
* Mocha and Chai
* Mongoose and MongoDB
* Travis CI & Heroku for CICD
* Front End: HTML, CSS, JavaScript & jQuery

## REST API

Our REST API is providing data on movie titles and streaming services in an organized manner so users can quickly see which streaming service is available for their chosen title.   
Database: Database can store ~50 static movies on first iteration.  This database schema will include the movie, a few streaming services that it is or isn’t available on, etc. 4 Examples: Netflix, HBO, Amazon, Hulu.

## CRUD Operations

CRUD Operations are based around the idea that users can save their movies they want to store in a Favorites list.  
Create - Click that you want to save the movie, and it will save in your Favorites.  
Read - Generates a list of popular movies on site load. 
Search individual items.  
Update - Can make comments on a Favorited movie, or give it a personal rating.   
Delete - Delete the movie from their Favorites.  

## API to retrieve data from:

API to get data from: We used https://www.themoviedb.org/ to grab data and then model our database based on their information.

## Screenshots 

- Header 

![Header](screenshots/streamline-header.png "Landing Page Header")

- Movie Card View 

![Movie Card View](screenshots/streamline-movie-card.png "Movie Card View")

- Favorites View

![Favorites View](screenshots/streamline-box-office.png "Favorites View")



## MVP User Stories

* As a user, I want to read a title and description of what this app does.
* As a user, I want to see a list of 50 movies when I load the site.
* As a user, I want to see if a movie can be streamed from Netflix, HBO, Amazon Video, Hulu.
* As a user, when I click on a movie a 'card' is presented and includes the following information:
  - A thumbnail picture of the movie.  <br>
  - Movie title.
  - Movie release year.
  - Movie rating.
  - Movie description.
  - I can add the movie to my Box Office.
  - Where it can be streamed. 
* As a user, I want to review my Box Office. (Our name for Favorites list).
* As a user, I want to update my Box Office.
* As a user, I want to delete from my Box Office.
* As a user, I can save a movie to my Box Office.

## Extra Features User Stories
* As a user, I want to filter by streaming service.
* As a user, I want to search by movie genre.
* As a user, I want to search by movie title.
* As a user, I want to be able to login to the app.
* As a user, I want to give someone access to my Box Office.
* As a user, I want to be able to view someone else's Box Office.
* As a user, I want to use real API data to determine streaming location and movie title.

## Endpoints

Get / Read
* Get all movies - '/' 

Post / Create
* Create a new movie in Box Office - '/'  

Put / Update
* Update a Box Office item - '/:id'  

Delete / Delete
* Delete a Box Office item - '/:id'  

## Where the components live

* Front end files live in the public folder.
* Main router lives in the routers folder, redirected from our server.js file.
* JSON static data lives in the json folder.
* Database configuration lives in config.js
* Mocha/Chai tests live in the test folder.

## How it can be used

We are currently at a phase where you can view available streaming services with static data, so someone could use it to check our list of static movies and where to view them.  We plan to implement live API calls on the server side and we also plan to implement user usability.


