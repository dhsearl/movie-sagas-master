import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Columns, Heading, Image, Icon } from 'react-bulma-components'
import DetailsEdit from '../DetailsEdit/DetailsEdit';
import DetailsDisplay from '../DetailsDisplay/DetailsDisplay'

class Details extends Component {

    componentDidMount() {
        this.props.dispatch({ type: "FETCH_MOVIE_DETAILS", payload: this.props.match.params.id })
        this.setState({displayMode:true})
    }

    
    render() {
        const movie = this.props.movieDetails[0];
        return (
            <>
            {movie && (this.props.detailsDisplayReducer ? <DetailsDisplay movie={movie} /> : <DetailsEdit movie={movie}/>)}
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Details));
