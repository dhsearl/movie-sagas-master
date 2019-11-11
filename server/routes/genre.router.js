const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.delete('/:id/:genre', (req,res)=>{
    console.log("in delete", req.params.id, req.params.genre);
    const queryText = `
    DELETE FROM movies_genres 
    WHERE movie_id = $1 
    AND genre_id = 
        (SELECT genres.id 
        FROM genres WHERE genres.name = $2);`;
    const queryArguments = [req.params.id, req.params.genre];
    console.log("query args are", queryArguments)
    pool.query(queryText, queryArguments)
    .then(()=>{
        console.log('DELETE Success');
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log('Error in Delete Query', error);
        res.sendStatus(500);
    })
})

router.get('/', (req, res) => {
    // This responds with the full list of available genres for the dropdown
    //      This is used by the Fetch Genres Saga
    //      This is connected to the Set Genres Reducer
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

router.get('/by/:genre', (req, res) => {
    console.log('movie.router by Genre Name GET hit', req.params.genre);
    const queryText = 
    `SELECT movies.id, movies.title, genres.name, movies.poster, movies.description 
    FROM movies
    JOIN movies_genres ON movies.id = movies_genres.movie_id
    LEFT OUTER JOIN genres ON movies_genres.genre_id = genres.id
    WHERE genres.name = $1
    ORDER BY movies.title;`
    const queryArguments = [req.params.genre]
    pool.query(queryText, queryArguments)
        .then((result) => {
            console.log('/movies/id GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in movie.router GET', error);
            res.sendStatus(500);
        })
}) // END
router.get('/of/:title', (req, res) => {
    console.log('GET GENRES OF MOVIE hit', req.params.title);
    const queryText = 
    `SELECT ARRAY_AGG(genres.name) as genres 
    FROM movies
    JOIN movies_genres ON movies.id = movies_genres.movie_id
    LEFT OUTER JOIN genres ON movies_genres.genre_id = genres.id
    WHERE movies.id=$1;`
    const queryArguments = [req.params.title]
    pool.query(queryText, queryArguments)
        .then((result) => {
            console.log('/genres/of GET success', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in movie.router GET', error);
            res.sendStatus(500);
        })
}) // END
router.get('/present', (req, res) => {
    // This responds with the list of genres currently in the collection
//      This is used by the Fetch Genres Present Saga
//      This is connected to the Set Genres Present Reducer
    console.log('movie.router genres present GET hit');
    const queryText = 
    `SELECT ARRAY_AGG(DISTINCT genres.name) as genres
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
}) // END
router.put('/add', (req,res)=>{
    // This adds a movie and genre pair to the junction table
    //   
    console.log('IN GENRE/ADD route');
    const queryText = `
    INSERT INTO movies_genres ("movie_id","genre_id")
    VALUES($1, 
        (SELECT genres.id 
        FROM genres 
        WHERE genres.name = $2));
    `
    const movieId = req.body.id; // $1
    const genreString = req.body.newGenre; // $2
    const queryArguments =[movieId,genreString]
    pool.query(queryText, queryArguments)
    .then(()=>{
        console.log('Genre inserted');
        res.sendStatus(200);        
    })
    .catch((error)=>{
        console.log('Error inserting genre', error);
        res.sendStatus(500);
    })
})// END



module.exports = router;