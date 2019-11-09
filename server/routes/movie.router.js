const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all movies
// get details of one movie
// put / update details of movies

router.get('/', (req, res) => {
    console.log('movie.router GET hit');
    const queryText = 
    `SELECT movies.id, movies.title, genres.name, movies.poster 
    FROM movies
    JOIN movies_genres ON movies.id = movies_genres.movie_id
    LEFT OUTER JOIN genres ON movies_genres.genre_id = genres.id
    ORDER BY movies.id;`
    pool.query(queryText)
        .then((result) => {
            console.log('/movies GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in movie.router GET', error);
            res.sendStatus(500);
        })
})

router.get('/:id', (req, res) => {
    console.log('movie.router by ID GET hit');
    const queryText = 
    `SELECT movies.id, movies.title, genres.name, movies.poster 
    FROM movies
    JOIN movies_genres ON movies.id = movies_genres.movie_id
    LEFT OUTER JOIN genres ON movies_genres.genre_id = genres.id
    WHERE genres.id = $1
    ORDER BY movies.id;`
    const queryArguments = [req.params.id]
    pool.query(queryText, queryArguments)
        .then((result) => {
            console.log('/movies/id GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in movie.router GET', error);
            res.sendStatus(500);
        })
})



module.exports = router;