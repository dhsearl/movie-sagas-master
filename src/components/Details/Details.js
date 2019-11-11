import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Columns, Heading, Image, Icon } from 'react-bulma-components'
import DetailsEdit from '../DetailsEdit/DetailsEdit';
import DetailsDisplay from '../DetailsDisplay/DetailsDisplay'

class Details extends Component {
    state={
        displayMode:false,
    }

    componentDidMount() {
        const movie_id = this.props.match.params.id;
        this.props.dispatch({ type: "FETCH_GENRES" }) // for the dropdown
        this.props.dispatch({ type: "FETCH_MOVIE_DETAILS", payload: movie_id }) // for the page
        this.props.dispatch({ type: "FETCH_GENRES_OF", payload: movie_id}) // for the display of multiple genres
        this.setState({displayMode:true})
    }

    
    render() {
        const movie = {... this.props.movieDetails, ...this.props.detailsGenreReducer};
        return (
            <>
            <div className="page">
                <pre>movieDetails:{JSON.stringify(this.props.movieDetails,null,2)}</pre>
                
            {/* {movie && (movie.id ===Number(this.props.location.pathname.slice(1,)) && (this.props.detailsDisplayReducer ? <DetailsDisplay movie={movie} /> : <DetailsEdit movie={movie}/>))} */}
            {this.state.displayMode && 
            movie.id===Number(this.props.location.pathname.slice(1,)) && 
            (this.props.detailsDisplayReducer ? <DetailsDisplay movie={movie} /> : <DetailsEdit movie={movie}/>)}
            </div>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Details));
