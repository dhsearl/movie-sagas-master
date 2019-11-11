# Prime Movie Time
## MOVIES SAGA MASTER

Duration: Weekend Sprint

To see the fully functional site, please visit:   [DEPLOYED VERSION OF FEEDBACK LOOP](http://movies.searl.org/)

Need a movie gallery? Here's one. This application displays movies from a database querying the server for movie details, matching them to a genre table to display genres and allowing users to edit the information on the page.

## The hardest parts of the project were
### Learning a new styling framework
I started the project in Grommet, then moved to react-bulma-components and regret both :)  I will revamp the page in the future to either use regular Bulma or Material-ui for the few places I need styling.  

### Adding multiple genre functionality
I started the project with only one genre per movie - and I liked it that way. Adding this in changed how the genre edit worked and took some time to sort out. I'm happy with the product but the lesson I learned is not being attached to how cool one component looks/works if it doesn't solve the requirements.

## Usage
Main gallery lets you filter by rating or genre.
Movie details page lets you see description, genres and change ratings.
Movie edit page lets you edit title, description, add/remove genres, and update ratings.


## Screen Shots

#### Movie Gallery
![Main](/screenshots/main.png)

#### Sorting by Rating
![Star Ratings](/screenshots/star.png)

#### Edit Mode
![Adding a Genre](/screenshots/edit.png)

## Prerequisites

Node.js is required to run this on your machine.  To install all of the other dependencies run ` npm install ` and Node will take care of the rest.

Need Node?
- [Node.js](https://nodejs.org/en/)

## Installation

You can view the deployed version on Heroku  [Prime Movie Time](http://movies.searl.org) or

1. run `git clone http://...` to fork and clone from this repository
2. run `npm install` to install dependencies like Uppy and Material-ui - these are listed in the package.json file
3. use the `database.sql` file to create a postgreSQL database on your machine.  If you need to point this to a different folder look in the feedback.router.js.
  * database is called `saga_movies_weekend`
  * CREATE TABLE instructions included for `movies`,`genres`, and junction `movies_genres`
4. run `npm run server` to start the server
5. then run `npm run client` to start the client.  React will open up a browser when the project loads.

## Built With

React, Redux, Sagas, React Router, TransitionRouter, Bulma, React-Rater and Node.js


## Acknowledgement
Thanks to the Scytale cohort of  [Prime Digital Academy](www.primeacademy.io) in Minneapolis.
Thanks as well to these creators:

[React Rater](https://github.com/NdYAG/react-rater)


## Support
If you have suggestions or issues, please email me at [dhsearl@gmail.com](mailto:dhsearl@gmail.com)

---