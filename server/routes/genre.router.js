const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// This responds with the full list of available genres for the dropdown
//      This is used by the Fetch Genres Saga
//      This is connected to the Set Genres Reducer

router.get('/', (req, res) => {
    console.log('movie.router GET hit');
    const queryText = 
    `SELECT *
    FROM genres
    ORDER BY genres.id;`
    pool.query(queryText)
        .then((result) => {
            console.log('/genres GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in movie.router genre GET', error);
            res.sendStatus(500);
        })
})

// This responds with the list of genres currently in the collection
//      This is used by the Fetch Genres Present Saga
//      This is connected to the Set Genres Present Reducer


router.get('/present', (req, res) => {
    console.log('movie.router genres present GET hit');
    const queryText = 
    `SELECT ARRAY_AGG(DISTINCT genres.name)
    FROM genres
    JOIN movies_genres ON genres.id = movies_genres.genre_id
    JOIN movies ON movies_genres.movie_id = movies.id;`
    pool.query(queryText)
        .then((result) => {
            console.log('/genres/present GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in movie.router genre GET', error);
            res.sendStatus(500);
        })
})

module.exports = router;