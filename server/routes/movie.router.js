const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET request of ALL movies
router.get('/', (req, res) => {
    console.log('movie.router GET hit');
    const queryText =
        `SELECT movies.id, movies.title, movies.poster, movies.description 
    FROM movies
    ORDER BY movies.id;`
    pool.query(queryText)
        .then((result) => {
            console.log('/movies GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in movie.router GET', error);
            res.sendStatus(500);
        })// END 
})
// Get request for Movie Details (without Genres)
router.get('/:id', (req, res) => {
    console.log('movie.router GET hit');
    const queryText =
        `SELECT movies.id, movies.title, movies.poster, movies.description
    FROM movies
    WHERE movies.id = $1;`
    const queryArguments = [req.params.id];
    pool.query(queryText, queryArguments)
        .then((result) => {
            console.log('/movies/details/id GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in movie.router details GET', error);
            res.sendStatus(500);
        })
})// END 
// Put request to update title and description
router.put('/', (req, res) => {
    console.log('movie.router PUT hit');
    console.log(req.body);
    const queryText = `
    UPDATE movies 
    SET title=$1, description=$2 
    WHERE id=$3`;
    const queryArguments = [req.body.title, req.body.description, req.body.id]
    pool.query(queryText, queryArguments)
    .then(() => {
        console.log('Finished Updating movie details');
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error updating movie details - step one of one', error);
    })
}) // END

module.exports = router;