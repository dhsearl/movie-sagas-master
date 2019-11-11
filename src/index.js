import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// CSS
import './index.scss'
import 'react-bulma-components/dist/react-bulma-components.min.css';
// Reducers and Sagas moved out to redux folder
import rootReducer from './redux/root.reducer'
import rootSaga from './redux/root.saga'


// Import saga middleware
import createSagaMiddleware from 'redux-saga';

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    rootReducer,
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
