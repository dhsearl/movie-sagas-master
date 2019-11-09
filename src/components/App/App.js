import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css'
import Navbar from '../Navbar/Navbar'


class App extends Component {

    componentDidMount() {
        this.props.dispatch({ type: "FETCH_MOVIES" })

    }


    render() {

        return (
            <>
            <Navbar />
            <div className="gallery" onClick={()=>this.handleMovieClick}>
                {this.props.movies.length > 0 &&

                this.props.movies.map(each =>
                    <div key={each.id} className="movieCard">
                        <img src={each.poster} alt={each.title}/>
                        <h3>{each.title}</h3>
                        <em>{each.name}</em>
                    </div>

                )}
            </div>

            {/* // <pre>{JSON.stringify(this.props,null,2)}</pre> */}
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(App);

