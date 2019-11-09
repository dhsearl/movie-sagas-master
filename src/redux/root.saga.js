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
function* fetchGenresSaga() {
    try {
        const genres = yield axios.get('/genres');
        yield put({ type: 'SET_GENRES', payload: genres.data })
    } catch (error) {
        console.log('fetchGenresSaga had an error', error);
    }
}
function* fetchMovieByGenreSaga(action) {
    try {
        console.log('IN FETCH MOVIES SAGA');
        
        const moviesBy = yield axios.get(`/movies/${action.payload}`);
        yield put({ type: 'SET_MOVIES', payload: moviesBy.data })
    } catch (error) {
        console.log('Error in fetchMovieByGenreSaga', error)
    }
}



function* selectPlantSaga(action) {
    try {
        const plants = yield axios.get(`/api/plant/details/${action.payload}`);
        yield put({ type: "SET_UNIQUE_PLANT", payload: plants.data[0] });
    } catch (error) {
        console.log('Error in selectPlantSaga', error);
    }
}

function* rootSaga() {
    yield takeEvery("FETCH_MOVIES", fetchMovieSaga);
    yield takeEvery("FETCH_GENRES", fetchGenresSaga);
    yield takeEvery("FETCH_MOVIES_BY_GENRE", fetchMovieByGenreSaga);
    yield takeEvery('SELECT_PLANT', selectPlantSaga);
}



export default rootSaga;