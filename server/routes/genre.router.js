const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log('movie.router GET hit');
    const queryText = 
    `SELECT *
    FROM genres
    ORDER BY genres.id;`
    pool.query(queryText)
        .then((result) => {
            console.log('/movies/genres GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in movie.router genre GET', error);
            res.sendStatus(500);
        })
})

module.exports = router;