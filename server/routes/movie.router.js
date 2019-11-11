const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

const verbose = false; // for console.log()s

// GET request of ALL movies
router.get('/', (req, res) => {
    if(verbose)console.log('movie.router GET hit');
    const queryText =
        `SELECT movies.id, movies.title, movies.poster, movies.description, movies.rating 
    FROM movies
    ORDER BY movies.id;`
    pool.query(queryText)
        .then((result) => {
            if(verbose)console.log('/movies GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            if(verbose)console.log('Error in movie.router GET', error);
            res.sendStatus(500);
        })// END 
})
// Get request for Movie Details (without Genres)
router.get('/:id', (req, res) => {
    if(verbose)console.log('movie.router GET hit');
    const queryText =
        `SELECT movies.id, movies.title, movies.poster, movies.description, movies.rating
    FROM movies
    WHERE movies.id = $1;`
    const queryArguments = [req.params.id];
    pool.query(queryText, queryArguments)
        .then((result) => {
            if(verbose)console.log('/movies/details/id GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            if(verbose)console.log('Error in movie.router details GET', error);
            res.sendStatus(500);
        })
})// END 
router.get('/star/:rating', (req, res) => {
    if(verbose)console.log('movie.router by Rating GET hit', req.params.rating);
    const queryText = 
    `SELECT movies.id, movies.title, movies.poster, movies.description, movies.rating
    FROM movies
    WHERE movies.rating = $1
    ORDER BY movies.rating DESC, movies.id ASC;`
    const queryArguments = [req.params.rating]
    pool.query(queryText, queryArguments)
        .then((result) => {
            if(verbose)console.log('/movies/id GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            if(verbose)console.log('Error in movie.router GET', error);
            res.sendStatus(500);
        })
}) // END
// Put request to update title and description
router.put('/', (req, res) => {
    if(verbose)console.log('movie.router PUT hit');
    if(verbose)console.log(req.body);
    const queryText = `
    UPDATE movies 
    SET title=$1, description=$2 
    WHERE id=$3`;
    const queryArguments = [req.body.title, req.body.description, req.body.id]
    pool.query(queryText, queryArguments)
    .then(() => {
        if(verbose)console.log('Finished Updating movie details');
        res.sendStatus(200);
    })
    .catch((error) => {
        if(verbose)console.log('Error updating movie details - step one of one', error);
    })
}) // END

router.put(`/:id/:rating`, (req,res)=>{
    const queryText = `
    UPDATE movies
    SET rating = $1
    WHERE id= $2`
    const queryArguments =[req.params.rating,req.params.id];
    pool.query(queryText,queryArguments)
    .then(()=>{
        res.sendStatus(200)
    })
    .catch((error)=>{
        if(verbose)console.log("Error PUT route for Ratings", error);
        res.sendStatus(500)
    })
})
module.exports = router;