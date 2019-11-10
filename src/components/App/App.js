import React, { Component } from 'react';
// import { connect } from 'react-redux'
import './App.css'
import Navbar from '../Navbar/Navbar'
import Gallery from '../Gallery/Gallery'
import Details from '../Details/Details'
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Container } from 'react-bulma-components'
import RouteContainer from '../RouteContainer/RouteContainer';

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

