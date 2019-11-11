import { takeEvery, put } from 'redux-saga/effects';
import axios from "axios";

// Alphabetical Saga List


// This will set GENRES to ALL possible genres 
//  This is used in the Navbar dropdown
//  Found in the table genres
function* addGenreSaga(action) {
    try {
        
        yield axios.put('/genres/add', action.payload)
        yield put({type: "FETCH_GENRES_OF", payload: action.payload.id})
    } catch(error) {
        console.log('Add Genre Saga Error', error);
    }
} // END

function* fetchGenresSaga() {
    try {
        const genres = yield axios.get('/genres');
        yield put({ type: 'SET_GENRES', payload: genres.data })
    } catch (error) {
        console.log('fetchGenresSaga had an error', error);
    }
}  // END

// This will get all distinct Genres 
//  This is use in the Section below the Navbar
//  Found in the movie table joined to their genre name
function* fetchGenresPresent() {
    try {
        const genres = yield axios.get('/genres/present')
        yield put({ type: 'SET_GENRES_PRESENT', payload: genres.data[0].genres })
    } catch (error) {
        console.log('Error in Set Genres Present Saga', error);
    }
} // END

function* fetchGenresOf(action) {
    try {
        const genres = yield axios.get(`/genres/of/${action.payload}`);
        yield put({ type: 'SET_GENRES_DETAILS', payload: genres.data[0]})
    } catch (error) {
        console.log(`Error in Set Genres Details Saga`, error);
    }
} // END

// This is used as the main display of the gallery
//  Gets then sets them all
function* fetchMovieSaga() {
    try {
        const movies = yield axios.get('/movies');
        yield put({ type: 'SET_MOVIES', payload: movies.data })
    } catch (error) {
        console.log('Error in fetchMovieSaga', error)
    }
} // END

// This is used in Navbar.
//  The payload is a string of genre name.
//  There is a server route for the genre ID build but is depreciated
function* fetchMovieByGenreSaga(action) {
    try {
        console.log('IN FETCH MOVIES SAGA');
        const moviesBy = yield axios.get(`/genres/by/${action.payload}`);
        yield put({ type: 'SET_MOVIES', payload: moviesBy.data })
    } catch (error) {
        console.log('Error in fetchMovieByGenreSaga', error)
    }
} // END
function* fetchMovieByRatingSaga(action) {
    try {
        console.log('IN FETCH MOVIES BY RATING SAGA');
        const moviesBy = yield axios.get(`/movies/star/${action.payload}`);
        yield put({ type: 'SET_MOVIES', payload: moviesBy.data })
    } catch (error) {
        console.log('Error in fetchMovieByGenreSaga', error)
    }
} // END
// This is used in Details 
//   This sets the current reducer with the details we need.
function* fetchMovieDetails(action) {
    try {
        console.log('IN FETCH MOVIE DETAILS SAGA');
        const movieDetails = yield axios.get(`/movies/${action.payload}`);
        console.log(movieDetails.data);
        yield put({ type: 'SET_MOVIE_DETAILS', payload: movieDetails.data });
    } catch (error) {
        console.log('ERROR in FETCH MOVIE DETAILS SAGA', error);
    }
} // END
function* removeGenreFrom(action){
    try {
        console.log("in delete saga", action.payload);
        
        yield axios.delete(`/genres/${action.payload.id}/${action.payload.genre}`);
        yield put({type: "FETCH_GENRES_OF", payload: action.payload.id})
    } catch (error) {
        console.log('Error in removeGenreFrom Saga',error);
    }
} // END
function* updateMovieDetails(action) {
    try {
        console.log('IN UPDATE MOVIE DETAILS SAGA');
        yield axios.put(`/movies`, action.payload)
        yield put({ type: 'FETCH_MOVIE_DETAILS', payload: action.payload.id });
    } catch (error) {
        console.log('Error IN UPDATE MOVIE DETAILS SAGA', error);
    }
} // END
function* updateMovieRating(action) {
    try {
        console.log('IN UPDATE MOVIE rating SAGA');
        yield axios.put(`/movies/${action.payload.id}/${action.payload.rating}`)
        yield put({ type: 'FETCH_MOVIE_DETAILS', payload: action.payload.id });
    } catch (error) {
        console.log('Error IN UPDATE MOVIE RATINGS SAGA', error);
    }
} // END

function* rootSaga() {
    yield takeEvery("ADD_GENRE", addGenreSaga);
    yield takeEvery("FETCH_GENRES", fetchGenresSaga);
    yield takeEvery("FETCH_GENRES_PRESENT", fetchGenresPresent);
    yield takeEvery("FETCH_GENRES_OF", fetchGenresOf);
    yield takeEvery("FETCH_MOVIES", fetchMovieSaga);
    yield takeEvery("FETCH_MOVIES_BY_GENRE", fetchMovieByGenreSaga);
    yield takeEvery("FETCH_MOVIES_BY_RATING", fetchMovieByRatingSaga);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('REMOVE_GENRE_FROM', removeGenreFrom);
    yield takeEvery('UPDATE_MOVIE_DETAILS', updateMovieDetails);
    yield takeEvery('UPDATE_MOVIE_RATING', updateMovieRating);
}  // END

export default rootSaga;