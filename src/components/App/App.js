import React, { Component } from 'react';
// import { connect } from 'react-redux'
import './App.css'
import Navbar from '../Navbar/Navbar'
import Gallery from '../Gallery/Gallery'
import Details from '../Details/Details'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {

    render() {

        return (
            <Router >
                <Navbar />
                {/* <Gallery /> */}
            <Route path="/" exact component={Gallery} />

            <Switch>
                <Route path="/details/:id" children={Details} />
            </Switch>
            
            </Router>
        )
    }
}


// const mapReduxStateToProps = (reduxState) => {
//     return reduxState
// }
// export default connect(mapReduxStateToProps)(App);
export default App;

