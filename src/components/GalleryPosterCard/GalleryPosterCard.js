import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Content, Heading } from 'react-bulma-components'
class GalleryPosterCard extends Component {

    routeToMovieDetails = (id) => {
        // this.props.dispatch({ type: "FETCH_MOVIE_DETAILS", payload: id })
        this.props.history.push(`/details/${id}`)
    }

    makeShorter = (description) =>{
        if (description.length > 144) return description.slice(0,144) + "..."
        else return description
    }

    render() {
        const movie = this.props.movieData;
        const movieDescriptionShort = this.makeShorter(movie.description);
        return (
            // <div key={movie.id} className="movieCard" onClick={() => this.routeToMovieDetails(movie.id)}>
            //     <img src={movie.poster} alt={movie.title} />
            //     <h3>{movie.title}</h3>
            //     <em>{movie.name}</em>
            // </div>
    <Card style={{width:"185px", margin:'1rem'}} onClick={() => this.routeToMovieDetails(movie.id)}>
        <Card.Header>
            <Card.Header.Title backgroundColor="link">
            {movie.name}
            </Card.Header.Title>
        </Card.Header>
      <Card.Image style={{width:"185px", height:'auto'}} src={movie.poster} />
      <Card.Content>
              <Heading size={4}>{movie.title}</Heading>
        <Content>
          {movieDescriptionShort} <Content style={{display:"inline"}} textColor="link">more.</Content>
         </Content>
      </Card.Content>
    </Card>
        )
    }
}

export default withRouter(connect()(GalleryPosterCard));

