import { combineReducers } from 'redux';

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const movieDetails = (state={}, action) =>{
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            console.log('Setting movie details in reducer', action.payload);
            return action.payload
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}


const reducers = combineReducers({ 
    movies,
    genres,
    movieDetails,
 })

export default reducers;