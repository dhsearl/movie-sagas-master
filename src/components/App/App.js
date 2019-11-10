import React, { Component } from 'react';
// import { connect } from 'react-redux'
import './App.css'
import Navbar from '../Navbar/Navbar'

import RouteContainer from '../RouteContainer/RouteContainer'
import { HashRouter as Router} from 'react-router-dom'

class App extends Component {

    render() {

        return (
            
            <Router >
                <Navbar />
                <RouteContainer />
            </Router>
            
        )
    }
}

export default App;

