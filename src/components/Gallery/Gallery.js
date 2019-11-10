import React, { Component } from 'react';
import { connect } from 'react-redux'
import GalleryPosterCard from '../GalleryPosterCard/GalleryPosterCard';
import { withRouter } from 'react-router-dom'


class Gallery extends Component {

    componentDidMount() {
        this.props.dispatch({ type: "FETCH_MOVIES" })

    }


    render() {

        return (
            
            <div className="gallery" >
            
            
                {this.props.movies.length > 0 &&
                    this.props.movies.map(eachObject =><GalleryPosterCard movieData={eachObject} key={eachObject.id}/>  
                )}
               
             </div>
            
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Gallery));

