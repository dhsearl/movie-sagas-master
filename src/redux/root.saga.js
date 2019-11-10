import { takeEvery, put } from 'redux-saga/effects';
import axios from "axios";

function* fetchMovieSaga() {
    try {
        const movies = yield axios.get('/movies');
        yield put({ type: 'SET_MOVIES', payload: movies.data })
    } catch (error) {
        console.log('Error in fetchMovieSaga', error)
    }
}
// This will set GENRES to ALL possible genres 
//  This is used in the Navbar dropdown
//  Found in the table genres
function* fetchGenresSaga() {
    try {
        const genres = yield axios.get('/genres');
        yield put({ type: 'SET_GENRES', payload: genres.data })
    } catch (error) {
        console.log('fetchGenresSaga had an error', error);
    }
}
// This will get all distinct Genres 
//  This is use in the Section below the Navbar
//  Found in the movie table joined to their genre name
function* fetchGenresPresent() {
    try {
        const genres = yield axios.get('/genres/present')
        yield put({ type: 'SET_GENRES_PRESENT', payload: genres.data })
    } catch (error) {
        console.log('Error in Set Genres Present Saga', error);
    }
}

// This is used in Navbar.
//  The payload is a string of genre name.
//  There is a server route for the genre ID build but is depreciated
function* fetchMovieByGenreSaga(action) {
    try {
        console.log('IN FETCH MOVIES SAGA');
        const moviesBy = yield axios.get(`/movies/${action.payload}`);
        yield put({ type: 'SET_MOVIES', payload: moviesBy.data })
    } catch (error) {
        console.log('Error in fetchMovieByGenreSaga', error)
    }
}

// This is used in Details 
//   This sets the current reducer with the details we need.
function* fetchMovieDetails(action) {
    try {
        console.log('IN FETCH MOVIE DETAILS SAGA' );
        const movieDetails = yield axios.get(`/movies/details/${action.payload}`);
        console.log(movieDetails.data);
        yield put({ type: 'SET_MOVIE_DETAILS', payload: movieDetails.data });
    } catch (error) {
        console.log('ERROR in FETCH MOVIE DETAILS SAGA', error);
    }
}
function* updateMovieDetails(action) {
    try{
        console.log('IN UPDATE MOVIE DETAILS SAGA' );
        yield axios.put(`/movies/details`, action.payload)
        yield put({type:'FETCH_MOVIE_DETAILS', payload: action.payload.id});
    } catch (error){
        console.log('Error IN UPDATE MOVIE DETAILS SAGA', error);
    }
}


function* rootSaga() {
    yield takeEvery("FETCH_MOVIES", fetchMovieSaga);
    yield takeEvery("FETCH_GENRES", fetchGenresSaga);
    yield takeEvery("FETCH_GENRES_PRESENT", fetchGenresPresent);
    yield takeEvery("FETCH_MOVIES_BY_GENRE", fetchMovieByGenreSaga);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('UPDATE_MOVIE_DETAILS', updateMovieDetails);
}



export default rootSaga;