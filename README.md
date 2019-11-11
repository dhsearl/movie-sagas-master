# Prime Movie Time
## MOVIES SAGA MASTER

Duration: Weekend Sprint

To see the fully functional site, please visit:   [DEPLOYED VERSION OF FEEDBACK LOOP](http://movies.searl.org/)




### The coolest features of this application are


## Notes on a few of these

### Redux State


### Input Sliders
  


### Material Table



## Screen Shots

#### Input
![Input Sliders](/screenshots/stepper.png)

#### Mobile Responsive
![Input Sliders](/screenshots/mobile.png)

#### User Review
![Review Page](/screenshots/review.png)

#### Administrator View
![Administrator View](/screenshots/admin.png)

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

## Usage
Main gallery lets you filter by rating or genre.
Movie details page lets you see description, genres and change ratings.
Movie edit page lets you edit title, description, add/remove genres, and update ratings.

## Built With

React, Redux, Sagas, React Router, TransitionRouter, Bulma, React-Rater and Node.js


## Acknowledgement
Thanks to the Scytale cohort of  [Prime Digital Academy](www.primeacademy.io) in Minneapolis.
Thanks as well to these creators:

[React Rater](https://github.com/NdYAG/react-rater)


## Support
If you have suggestions or issues, please email me at [dhsearl@gmail.com](mailto:dhsearl@gmail.com)

---