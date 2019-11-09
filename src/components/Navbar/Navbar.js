import React, { Component } from 'react';
import { connect } from 'react-redux'



class Navbar extends Component {

    componentDidMount() {
        this.props.dispatch({type: "FETCH_GENRES"})
    }

    handleGenreSelect = (event) =>{
        console.log('In Handle Genre Select');
        
        console.log(event.target.value);
        if (event.target.value !=='default'){
            this.props.dispatch({ type: "FETCH_MOVIES_BY_GENRE", payload: event.target.value })
        } else {
            this.props.dispatch({ type: "FETCH_MOVIES" })
        }
    }

    render() {

        return (
            <>
            <div className="navBar">
                <div className="navElement">
            Home 
            </div>
            <div className="navElement">

            <select onChange={this.handleGenreSelect}>
            <option value="default" defaultValue>Sort by genre</option>

                {this.props.genres.map(each =>
                    <option value={each.id}  key={each.id}>
                        {each.name}
                    </option> 
                )}
                </select>
                </div>

            </div>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(Navbar);