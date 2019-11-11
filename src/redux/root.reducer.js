import { combineReducers } from 'redux';
// Alphabetical Reducers

// Flips view between Display and Edit on the details page
const detailsDisplayReducer = (state = true, action) => {
    switch (action.type) {
        case "DISPLAY_MODE_FLIP":
            return !state;
        default:
            return state;
    }
}
// Used for sorting by one Genre on main page
const detailsGenreReducer = (state={}, action) =>{
    switch (action.type) {
        case "SET_GENRES_DETAILS":
            console.log(action.payload);
            return action.payload;
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
// Gets only genres used in the collection
const genresPresent = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES_PRESENT':
            return action.payload;
        default:
            return state;
    }
}
// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
// Stores details of the selected movie
const movieDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            console.log('Setting movie details in reducer', action.payload);
            return action.payload[0]
        default:
            return state;
    }
}
const reducers = combineReducers({
    detailsDisplayReducer,
    detailsGenreReducer, 
    genres,
    genresPresent,
    movies,
    movieDetails,
      
})
export default reducers;