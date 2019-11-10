const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// put / update details of movies

router.get('/', (req, res) => {
    console.log('movie.router GET hit');
    const queryText = 
    `SELECT movies.id, movies.title, genres.name, movies.poster, movies.description 
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
    console.log('movie.router GET hit');
    const queryText = 
    `SELECT movies.id, movies.title, genres.name as genre, movies.poster, movies.description
    FROM movies
    JOIN movies_genres ON movies.id = movies_genres.movie_id
    LEFT OUTER JOIN genres ON movies_genres.genre_id = genres.id
    WHERE movies.id = $1;`
    const queryArguments = [req.params.id];
    pool.query(queryText,queryArguments)
        .then((result) => {
            console.log('/movies/details/id GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in movie.router details GET', error);
            res.sendStatus(500);
        })
})

router.put('/', (req,res)=>{
    console.log('movie.router PUT hit');
    console.log(req.body);
    const queryText = `
    UPDATE movies 
    SET title=$1, description=$2 
    WHERE id=$3`;
    const queryArguments=[req.body.title, req.body.description,req.body.id]
    pool.query(queryText,queryArguments)
    .then(()=>{
        const queryTwo = `
        UPDATE movies_genres 
        SET genre_id = (SELECT id from genres WHERE name = $1)
        WHERE movie_id=$2`;
        const queryArgumentsTwo = [req.body.genre, req.body.id];
        pool.query(queryTwo, queryArgumentsTwo)
        .then(()=>{
            console.log('Finished Updating movie details and Genre in junction table');
            res.sendStatus(200);
        })
        .catch((error)=>{
            console.log('Error setting genre in junction table - step two of two', error);
        })
    })
    .catch((error)=>{
        console.log('Error updating movie details - step one of two', error);
    })
}) // END of PUT request

// router.get('/:genre', (req, res) => {
//     console.log('movie.router by Genre Name GET hit', req.params.genre);
    
//     const queryText = 
//     `SELECT movies.id, movies.title, genres.name, movies.poster, movies.description 
//     FROM movies
//     JOIN movies_genres ON movies.id = movies_genres.movie_id
//     LEFT OUTER JOIN genres ON movies_genres.genre_id = genres.id
//     WHERE genres.name = $1
//     ORDER BY movies.title;`
//     const queryArguments = [req.params.genre]
//     pool.query(queryText, queryArguments)
//         .then((result) => {
//             console.log('/movies/id GET success', result.rows);
//             res.send(result.rows);
//         })
//         .catch((error) => {
//             console.log('Error in movie.router GET', error);
//             res.sendStatus(500);
//         })
// })

// Depreciated so the array of used genres is more intuitively laid out in the nav bar
//
// router.get('/:id', (req, res) => {
//     console.log('movie.router by ID GET hit');
//     const queryText = 
//     `SELECT movies.id, movies.title, genres.name, movies.poster 
//     FROM movies
//     JOIN movies_genres ON movies.id = movies_genres.movie_id
//     LEFT OUTER JOIN genres ON movies_genres.genre_id = genres.id
//     WHERE genres.id = $1
//     ORDER BY movies.id;`
//     const queryArguments = [req.params.id]
//     pool.query(queryText, queryArguments)
//         .then((result) => {
//             console.log('/movies/id GET success', result.rows);
//             res.send(result.rows);
//         })
//         .catch((error) => {
//             console.log('Error in movie.router GET', error);
//             res.sendStatus(500);
//         })
// })



module.exports = router;