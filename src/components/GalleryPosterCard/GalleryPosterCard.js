import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Content, Heading } from 'react-bulma-components'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
class GalleryPosterCard extends Component {

    routeToMovieDetails = (id) => {
        this.props.history.push(`/${id}`)
    }
    // Handles the text on the card
    makeShorter = (description) => {
        if (description.length > 144) return description.slice(0, 144) + "..."
        else return description
    }

    render() {
        const movie = this.props.movieData;
        const movieDescriptionShort = this.makeShorter(movie.description);
        return (
      
            <Card style={{ width: "185px", margin: '1rem'  }}>

                <Card.Header>
                    <Card.Header.Title backgroundColor="link">
                    <Rater total={5} rating={movie.rating} interactive={false} onRate={(click)=>this.handleRating(click)}/>
                    </Card.Header.Title>
                </Card.Header>
                <span onClick={() => this.routeToMovieDetails(movie.id)}>
                <Card.Image style={{ width: "185px", height: 'auto' }} src={movie.poster} />

                <Card.Content>
                    <Heading size={4}>{movie.title}</Heading>
                    <Content>
                        {movieDescriptionShort} <Content style={{ display: "inline" }} textColor="link">more.</Content>
                    </Content>
                </Card.Content></span>
            </Card>
        )
    }
}

export default withRouter(connect()(GalleryPosterCard));

