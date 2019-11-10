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
        this.props.dispatch({ type: "FETCH_MOVIE_DETAILS", payload: this.props.match.params.id })
        this.setState({displayMode:true})
    }

    
    render() {
        const movie = this.props.movieDetails[0];
        return (
            <>
            <div className="page">
            {/* {movie && (movie.id ===Number(this.props.location.pathname.slice(1,)) && (this.props.detailsDisplayReducer ? <DetailsDisplay movie={movie} /> : <DetailsEdit movie={movie}/>))} */}
            {this.state.displayMode && (this.props.detailsDisplayReducer ? <DetailsDisplay movie={movie} /> : <DetailsEdit movie={movie}/>)}
            </div>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Details));
