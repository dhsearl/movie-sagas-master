import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tile } from 'react-bulma-components'
class GalleryPosterCard extends Component {

    routeToMovieDetails = (id) => {
        // this.props.dispatch({ type: "FETCH_MOVIE_DETAILS", payload: id })
        this.props.history.push(`/details/${id}`)
    }


    render() {
        const movie = this.props.movieData;
        return (
            <div key={movie.id} className="movieCard" onClick={() => this.routeToMovieDetails(movie.id)}>
                <img src={movie.poster} alt={movie.title} />
                <h3>{movie.title}</h3>
                <em>{movie.name}</em>
            </div>
        )
    }
}

export default withRouter(connect()(GalleryPosterCard));

